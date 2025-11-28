import * as orderController from '../controllers/orderController.js'


export default async function orderRoutes(fastify, options) {
    fastify.post('/create', orderController.order)
}