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