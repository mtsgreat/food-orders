import bcrypt from 'bcrypt'
import supabase from './supabase.js'

// lib/loginRepository.js
export async function authentication({ email, password }) {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !user) return null

  const isMatch = await bcrypt.compare(password, user.password)
  return isMatch ? user : null
}
