import * as loginController from '../controllers/loginController.js'

export default async function loginRoutes(fastify, options) {
    fastify.post('/authentication', loginController.login)
}