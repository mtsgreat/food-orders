
import bcrypt from 'bcrypt'
let users = []
let nextId = 1

import { insertUser, isEmailExists } from '../lib/userRepository.js'
import { userSchema } from '../lib/validations.js'

const SALT_ROUNDS = 12

export const createUser = async (request, reply) => {
    
  try {

    const parsed = userSchema.safeParse(request.body)

    if (!parsed.success) {
      return reply.status(400).send({
        errors: parsed.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
        }))
      })
    }

    const { name, email, password } = request.body

    const emailAlreadyRegistered = await isEmailExists(email)
    
    if(emailAlreadyRegistered) {
      return reply.status(400).send({ error: 'email already exists' })
    }


    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await insertUser({ name, email, password: hash })

    return reply.code(201).send(user)
  } catch (err) {
    return reply.code(500).send({ error: err.message })
  }
}


export const getUsers = async (request, reply) => {
  reply.send(users)
}

export const getUserById = async (request, reply) => {
  const user = users.find(u => u.id === parseInt(request.params.id))
  if (!user) return reply.code(404).send({ error: 'User not found' })
  reply.send(user)
}

export const updateUser = async (request, reply) => {
  const user = users.find(u => u.id === parseInt(request.params.id))
  if (!user) return reply.code(404).send({ error: 'User not found' })

  const { name, email } = request.body
  if (name) user.name = name
  if (email) user.email = email

  reply.send(user)
}

export const deleteUser = async (request, reply) => {
  const index = users.findIndex(u => u.id === parseInt(request.params.id))
  if (index === -1) return reply.code(404).send({ error: 'User not found' })

  const deleted = users.splice(index, 1)
  reply.send(deleted[0])
}


export const getTeste = async (request, reply) => {
  reply.send({ message: 'Rota de teste funcionando!' })
}