
import { insertNewCustomer } from "../lib/customerRepository.js"
import { customerSchema } from "../lib/validations.js"


export const create = async (request, reply) => {
  const parsed = customerSchema.safeParse(request.body)

  if (!parsed.success) {
    return reply.status(400).send({
      errors: parsed.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message,
      }))
    })
  }

  const { name } = request.body
 
  const customer = await insertNewCustomer({ name})

  if (!customer) {
    return reply.code(401).send({ message: 'Invalid customer' })
  }

  

  return reply.code(200).send({status: "sucess"})
}