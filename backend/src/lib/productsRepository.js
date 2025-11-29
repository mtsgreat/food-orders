import supabase from './supabase.js'

export async function insertNewProduct({ name, price, description }) {
  
    const { data, error } = await supabase
    .from('products')
    .insert([{ name, price, description  }])
    .select()

  if (error) throw new Error(error.message)
  return data[0]
}



