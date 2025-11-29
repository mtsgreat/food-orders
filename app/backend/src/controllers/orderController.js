
import { insertNewOrder, generateOrderPassword, getProductById, insertOrderItems} from "../lib/orderRepository.js"
import { orderSchema } from "../lib/validations.js"


export const create = async (request, reply) => {
  const parsed = orderSchema.safeParse(request.body)

  if (!parsed.success) {
    return reply.status(400).send({
      errors: parsed.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message,
      }))
    })
  }

  const { customer_id, items } = request.body

    // 1. Calcular total baseado nos produtos
  let total = 0

  for (const item of items) {
    const product = await getProductById(item.product_id)
    if (!product) {
      return reply.status(404).send({ message: `Product ${item.product_id} not found` })
    }

    total += product.price * item.quantity
  }
 
  // ccria order
  const order = await insertNewOrder({ customer_id, orderPassword: generateOrderPassword(), status: "payed", total})

  if (!order) {
    return reply.code(401).send({ message: 'Invalid order' })
  }


    // 3. Criar os order_items usando o ID da order
  const order_id = order.id // supabase retorna array

  for (const item of items) {
    await insertOrderItems({
      order_id,
      product_id: item.product_id,
      quantity: item.quantity
    })
  }
  

   return reply.code(200).send({
    status: "success",
    order_id,
    total
  })
}
