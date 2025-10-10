import supabase from './supabase.js'

export async function insertUser({ name, email, password }) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, password }])
    .select()

  if (error) throw new Error(error.message)
  return data[0]
}


export async function isEmailExists(email) {
  const { data } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle()

    console.log("resultado", !!data)

  return !!data
}