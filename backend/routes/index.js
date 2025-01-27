const userRoutes = require('./user/user.routes')
const roleRoutes = require('./user/role.routes')
const productRoutes = require('./product/product.routes')
const orderRoutes = require('./order/order.routes')
const chatRoutes = require('./chat/chat.routes')

module.exports = {
    userRoutes,
    roleRoutes,
    productRoutes,
    orderRoutes,
    chatRoutes
}