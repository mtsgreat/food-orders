// src/lib/validations.js
import { email, z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})


export const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1,"Password is required")
})



export const orderSchema = z.object({
  customer_id: z.int().min(1, "Customer id  is required"),
});


export const customerSchema = z.object({
  name: z.string().min(1, "name is required"),
});


export const productSchema = z.object({
  name: z.string().min(1, "name is required"),
  price: z.number().min(1, "price is required"),
  description: z.string().min(1, "description is required"),
});




