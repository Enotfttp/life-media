const db = require('../../db');
const {
    v4: uuidv4,
} = require('uuid');
const {promises: fs} = require("fs");

class OrderController {
    async getOrders(req, res) {
        try {
            const {id: userId} = req.params
            const {rows} = await db.query(`SELECT 
                    orders.id,
                    order_statuses.name_status,
                    products.name_product,
                    products.cost,
                    orders.count
                  FROM orders
                  LEFT JOIN products ON orders.product_id = products.id
                  LEFT JOIN order_statuses ON orders.order_statuses_id = order_statuses.id
                  LEFT JOIN photos ON products.id = photos.product_id
                 WHERE user_id=$1`, [userId]);

            const newRows = await Promise.all(rows.map(async (elem) => {
                if(!elem.photo_link){
                    return ({...elem, photo_link: null})
                }
                const fileBuffer = await fs.readFile((process.cwd() + elem.photo_link));
                const base64String = fileBuffer.toString('base64');
                return ({...elem, photo_link: base64String})
            }))

            return res.json(newRows);
        } catch (e) {
            console.error('Ошибка во время получения данных о товаре из корзины:', e);
            return res.status(400).json({error: e.message});
        }
    }


    async getOrder(req, res) {
        try {
            const {userId, productId} = req.query
            const {rows: curOrder} = await db.query(`SELECT * FROM orders WHERE user_id=$1`,[userId]);
            if(!curOrder.length) return res.json(null)

            const {rows} = await db.query(`SELECT 
                    orders.id,
                    order_statuses.name_status,
                    products.name_product,
                    products.cost,
                    orders.count
                  FROM orders
                  LEFT JOIN products ON orders.product_id = products.id
                  LEFT JOIN order_statuses ON orders.order_statuses_id = order_statuses.id
                  LEFT JOIN photos ON products.id = photos.product_id
                  WHERE user_id = $1 AND orders.product_id = $2 `, [userId, productId]);
            if (rows[0]?.photo_link) {
                const fileBuffer = await fs.readFile((process.cwd() + rows[0]?.photo_link));
                const base64String = fileBuffer.toString('base64');

                return res.json({...rows[0], photo_link: base64String});
            }
            return res.json(rows[0]);
        } catch (e) {
            console.error('Ошибка во время получения данных о товаре из корзины:', e);
            return res.status(400).json({error: e.message});
        }
    }
// Добавление нового товара
    async updateOrder(req, res) {
        try {
            const {userId, productId, type} = req.body;
            const {rows: allProductsOrder} = await db.query(`SELECT * FROM orders WHERE user_id=$1 `,[userId]);

            if(!allProductsOrder.length){
              const uuid = uuidv4();
              const {rows} =  await db.query(`INSERT INTO orders (id, order_statuses_id, product_id, user_id, count) values($1,$2, $3, $4, $5) RETURNING *`, [uuid, '1', productId, userId, 1]);
              return res.json(rows[0]);
            }
            const {rows: currentProduct} =  await db.query(`SELECT * FROM orders WHERE user_id = $1 AND product_id = $2`, [userId, productId]);

            if(!currentProduct?.length) {
                const uuid = uuidv4();
                const {rows} =  await db.query(`INSERT INTO orders (id, order_statuses_id, product_id, user_id, count) values($1,$2, $3, $4, $5) RETURNING *`, [uuid, '1', productId, userId, 1]);
                return res.json(rows[0]);
            }
            const {rows: selectProduct} = await db.query(`SELECT * FROM products WHERE id=$1 `, [productId]);
            let rowsOrder;
            if(type === 'minus'){
                if(selectProduct[0].count < 1){
                    throw new Error('Нельзя заказать больше числа товаров на складе')
                }
                rowsOrder = await db.query(`UPDATE orders set count = count - 1 WHERE user_id=$1 AND product_id = $2 RETURNING *`, [userId, productId]);
            }else{
                rowsOrder = await db.query(`UPDATE orders set count = count + 1 WHERE user_id=$1 AND product_id = $2 RETURNING *`, [userId, productId]);
            }
            // Удаление orders и добавление элеменета обратно в продукт
            if(currentProduct[0].count === 1 && type === 'minus' ) {
                await db.query(`DELETE FROM orders WHERE user_id = $1 AND product_id = $2`, [userId, productId]);
            }

            if(type === 'minus'){
                await db.query(`UPDATE products set count = count + 1  WHERE id = $1`, [productId]);
            }else{
                await db.query(`UPDATE products set count = count - 1  WHERE id = $1`, [productId]);
            }

            return res.json(rowsOrder.rows[0]);
        } catch (e) {
            console.error('Ошибка во время обновления данных о товаре из корзины:', e);
            return res.status(400).json({error: e.message});
        }
    }
// Удаление нового товара и тут должно быть удаление order в главной таблице, чтобы подчистить ненужное
    async deleteOrder(req, res) {
        try {
            const id = req.params.id
            const {rows} = await db.query(`DELETE FROM orders WHERE order_id = $1`, [id]);

            res.json(rows[0]);
        } catch (e) {
            console.error('Ошибка во время удаления пользователя:', e);
            return res.status(400).json({error: e.message});
        }
    }

}

module.exports = OrderController;
