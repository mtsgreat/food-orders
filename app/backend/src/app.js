import fastify from 'fastify'
import userRoutes from './routes/users.js'
import loginRoutes from './routes/login.js'
import orderRoutes from './routes/orders.js'
import customerRoutes from './routes/customer.js'
import productRoutes from './routes/product.js'
import fastifyJwt from '@fastify/jwt'

const app = fastify({ logger: true })

// ✅ registra o plugin JWT na instância correta
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'supersecret'
})

app.register(userRoutes, { prefix: '/users' })
app.register(loginRoutes, { prefix: '/login' })
app.register(orderRoutes, { prefix: '/order' })
app.register(customerRoutes, { prefix: '/customer' })
app.register(productRoutes, { prefix: '/product' })

await app.listen({ port: 3000 })
console.log('🚀 API rodando em http://localhost:3000')
