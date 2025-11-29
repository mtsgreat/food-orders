
import { insertNewProduct } from "../lib/productsRepository.js"
import { productSchema } from "../lib/validations.js"


export const create = async (request, reply) => {
  const parsed = productSchema.safeParse(request.body)

  if (!parsed.success) {
    return reply.status(400).send({
      errors: parsed.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message,
      }))
    })
  }

  const { name, price, description } = request.body
 
  const product = await insertNewProduct({ name, price, description})

  if (!product) {
    return reply.code(401).send({ message: 'Invalid product' })
  }

  

  return reply.code(200).send({status: "sucess"})
}