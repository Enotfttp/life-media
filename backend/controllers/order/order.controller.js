const db = require('../../db');
const {
    v4: uuidv4,
} = require('uuid');
const {promises: fs} = require("fs");

class OrderController {
    async getFirstStatusOrders(req, res) {
        try {
            const {id: userId} = req.params
            const {rows} = await db.query(`SELECT 
                    orders.id,
                    orders.count,
                    order_statuses.name_status,
                    products.name_product,
                    products.cost,
                    products.id as product_id,
                    products.count as product_count,
                    products.cost as product_cost,
                    descriptions.description,
                    photos.photo_link
                  FROM orders
                  LEFT JOIN products ON orders.product_id = products.id
                  LEFT JOIN descriptions ON descriptions.product_id = products.id
                  LEFT JOIN order_statuses ON orders.order_statuses_id = order_statuses.id
                  LEFT JOIN photos ON products.id = photos.product_id
                 WHERE user_id=$1  AND orders.order_statuses_id = '1'
                 ORDER BY orders.id
                 `, [userId]);

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


    async getOrders(req, res) {
        try {
            const {id: userId} = req.params
            const {rows: userRows} = await db.query(`SELECT * from users WHERE id = $1`,[userId]);
            let resRows;
            console.log('userRows[0] = ',userRows)
            // user = 1
            if(userRows[0].role_id === '1'){
                const {rows} = await db.query(`SELECT 
                    orders.id,
                    orders.count,
                    orders.order_statuses_id,
                    order_statuses.name_status,
                    products.name_product,
                    products.cost,
                    products.id as product_id,
                    products.count as product_count,
                    products.cost as product_cost,
                    descriptions.description,
                    photos.photo_link
                  FROM orders
                  LEFT JOIN products ON orders.product_id = products.id
                  LEFT JOIN descriptions ON descriptions.product_id = products.id
                  LEFT JOIN order_statuses ON orders.order_statuses_id = order_statuses.id
                  LEFT JOIN photos ON products.id = photos.product_id
                 WHERE user_id=$1 AND orders.order_statuses_id != '1'
                 ORDER BY orders.id
                 `, [userId]);
                resRows = rows;
            } else{

            const {rows} = await db.query(`SELECT 
                    orders.id,
                    orders.count,
                    orders.user_id,
                    orders.order_statuses_id,
                    order_statuses.name_status,
                    products.name_product,
                    products.cost,
                    products.id as product_id,
                    products.count as product_count,
                    products.cost as product_cost,
                    descriptions.description,
                    users.firstName, 
                    users.patronymic, 
                    users.lastName,
                    photos.photo_link
                  FROM orders
                  LEFT JOIN products ON orders.product_id = products.id
                  LEFT JOIN descriptions ON descriptions.product_id = products.id
                  LEFT JOIN order_statuses ON orders.order_statuses_id = order_statuses.id
                  LEFT JOIN photos ON products.id = photos.product_id
                  LEFT JOIN users ON users.id = orders.user_id
                  WHERE orders.order_statuses_id != '1'
                 ORDER BY orders.id
                 `);
                resRows = rows;
            }

            const newRows = await Promise.all(resRows.map(async (elem) => {
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
                  WHERE user_id = $1 AND orders.product_id = $2 AND orders.order_statuses_id = '1'`, [userId, productId]);
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
              const uuid = uuidv4();

            if(!allProductsOrder.length){
                console.log('test')
              const {rows} =  await db.query(`INSERT INTO orders (id, order_statuses_id, product_id, user_id, count) values($1,$2, $3, $4, $5) RETURNING *`, [uuid, '1', productId, userId, 1]);
              await db.query(`UPDATE orders set count = count - 1 WHERE user_id=$1 AND product_id = $2 RETURNING *`, [userId, productId]);
              return res.json(rows[0]);
            }
            const {rows: currentProduct} =  await db.query(`SELECT * FROM orders WHERE user_id = $1 AND product_id = $2`, [userId, productId]);

            if(!currentProduct?.length) {
                const uuid = uuidv4();
                const {rows} =  await db.query(`INSERT INTO orders (id, order_statuses_id, product_id, user_id, count) values($1,$2, $3, $4, $5) RETURNING *`, [uuid, '1', productId, userId, 1]);
                await db.query(`UPDATE orders set count = count - 1 WHERE user_id=$1 AND product_id = $2 RETURNING *`, [userId, productId]);
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
                if(!allProductsOrder.some((elem)=> elem.order_statuses_id === '1')){
                    rowsOrder = await db.query(`INSERT INTO orders (id, order_statuses_id, product_id, user_id, count) values($1,$2, $3, $4, $5) RETURNING *`, [uuid, '1', productId, userId, 1])
                }else{
                    rowsOrder = await db.query(`UPDATE orders set count = count + 1 WHERE user_id=$1 AND product_id = $2 RETURNING *`, [userId, productId]);
                }
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

    async updateStatusOrderBasket(req, res) {
        try {
            const id = req.params.id
            const {rows} =  await db.query(`UPDATE orders set order_statuses_id ='2' WHERE user_id=$1 AND order_statuses_id != '2' AND order_statuses_id != '3'  AND order_statuses_id != '4' RETURNING *`, [id]);

            return res.json(rows);
        } catch (e) {
            console.error('Ошибка во время удаления пользователя:', e);
            return res.status(400).json({error: e.message});
        }
    }
    async updateStatusOrder(req, res) {
        try {
            const {userId, statusId, orderId} = req.body;
            const {rows} =  await db.query(`UPDATE orders set order_statuses_id = $1 WHERE user_id=$2 AND id = $3 RETURNING *`, [statusId, userId, orderId]);

            return res.json(rows);
        } catch (e) {
            console.error('Ошибка во время удаления пользователя:', e);
            return res.status(400).json({error: e.message});
        }
    }

}

module.exports = OrderController;
