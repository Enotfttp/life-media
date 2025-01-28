const db = require('../../db');


class OrderStatusController {
    async getStatus(req, res) {
        try {
            const {rows} = await db.query(`SELECT * FROM order_statuses`);
            return res.json(rows);
        } catch (e) {
            console.error('Ошибка во время получения данных о товаре из корзины:', e);
            return res.status(400).json({error: e.message});
        }
    }




}

module.exports = OrderStatusController;
