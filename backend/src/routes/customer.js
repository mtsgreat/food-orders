import * as customerController from '../controllers/customerController.js'


export default async function orderRoutes(fastify, options) {
    fastify.post('/create', customerController.create)
}