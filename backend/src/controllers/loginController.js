
import { authentication } from "../lib/loginRepository.js"
import { loginSchema } from "../lib/validations.js"


export const login = async (request, reply) => {
  const parsed = loginSchema.safeParse(request.body)

  if (!parsed.success) {
    return reply.status(400).send({
      errors: parsed.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message,
      }))
    })
  }

  const { email, password } = request.body
  const user = await authentication({ email, password })

  if (!user) {
    return reply.code(401).send({ message: 'Invalid credentials' })
  }

  const token = await reply.jwtSign({ id: user.id, email: user.email })

  return { token }
}
