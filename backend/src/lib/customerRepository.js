import supabase from './supabase.js'

export async function insertNewCustomer({ name }) {
  
    const { data, error } = await supabase
    .from('customers')
    .insert([{ name }])
    .select()

  if (error) throw new Error(error.message)
  return data[0]
}


