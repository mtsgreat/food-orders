import * as productsController from '../controllers/productsController.js'


export default async function orderRoutes(fastify, options) {
    fastify.post('/create', productsController.create)
}