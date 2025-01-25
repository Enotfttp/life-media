const db = require('../../db');
const {
    v4: uuidv4,
} = require('uuid');
const {promises: fs} = require("fs");

class OrderController {
    async getOrders(req, res) {
        try {
            const {id: userId} = req.params
            const {rows: rowsUser} = await db.query(`SELECT * FROM users WHERE id=$1`,[userId]);
            if(!rowsUser[0]?.order_id) return res.json(null)

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
                  WHERE orders.id = $1 `, [rowsUser[0].order_id]);

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
            const {rows:rowsUser} = await db.query(`SELECT * FROM users WHERE id=$1`,[userId]);
            if(!rowsUser[0]?.order_id) return res.json(null)

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
                  WHERE orders.id = $1 AND orders.product_id = $2 `, [rowsUser[0].order_id, productId]);
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
            const {rows:rowsUser} = await db.query(`SELECT * FROM users WHERE id=$1 `,[userId]);

            if(!rowsUser[0]?.order_id){
              const uuid = uuidv4();
              const {rows} =  await db.query(`INSERT INTO orders (id, order_statuses_id, product_id, count) values($1,$2, $3, $4) RETURNING *`, [uuid, '1', productId, 1]);
              await db.query(`UPDATE users set order_id = $1 WHERE id=$2 RETURNING *`, [uuid, userId]);
              return res.json(rows[0]);
            }
            let rowsOrder;
            if(type === 'minus'){
                rowsOrder = await db.query(`UPDATE orders set count = count - 1, product_id = $1 WHERE id=$2 RETURNING *`, [productId, rowsUser[0]?.order_id]);
            }else{
                rowsOrder = await db.query(`UPDATE orders set count = count + 1, product_id = $1 WHERE id=$2 RETURNING *`, [productId, rowsUser[0]?.order_id]);
            }
            // Удаление orders и добавление элеменета обратно в продукт
            if(rowsOrder.rows[0]?.count === 0) {
                await db.query(`UPDATE users set order_id = null  WHERE id = $1`, [userId]);
                await db.query(`DELETE FROM orders WHERE id = $1`, [rowsUser[0].order_id]);
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
