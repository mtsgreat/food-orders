import fastify from 'fastify'
import userRoutes from './routes/users.js'
import loginRoutes from './routes/login.js'
import fastifyJwt from '@fastify/jwt'

const app = fastify({ logger: true })

// ✅ registra o plugin JWT na instância correta
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'supersecret'
})

app.register(userRoutes, { prefix: '/users' })
app.register(loginRoutes, { prefix: '/login' })

await app.listen({ port: 3000 })
console.log('🚀 API rodando em http://localhost:3000')
