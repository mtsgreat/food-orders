// import named
import * as userController from '../controllers/userController.js'

// ou import default
// import usersController from '../controllers/usersController.js'

export default async function userRoutes(fastify, options) {
  fastify.post('/create', userController.createUser)
  fastify.get('/', userController.getUsers)
  fastify.get('/teste', userController.getTeste)
  fastify.get('/:id', userController.getUserById)
  fastify.put('/:id', userController.updateUser)
  fastify.delete('/:id', userController.deleteUser)
}
