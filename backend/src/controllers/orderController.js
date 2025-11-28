
import { insertNewOrder, generateOrderPassword } from "../lib/orderRepository.js"
import { orderSchema } from "../lib/validations.js"


export const order = async (request, reply) => {
  const parsed = orderSchema.safeParse(request.body)

  if (!parsed.success) {
    return reply.status(400).send({
      errors: parsed.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message,
      }))
    })
  }

  const { customerName } = request.body
  // generate orderPassword ramdom number
  const order = await insertNewOrder({ customerName, orderPassword: generateOrderPassword() })

  if (!order) {
    return reply.code(401).send({ message: 'Invalid order' })
  }

  

  return reply.code(200).send({status: "sucess"})
}
