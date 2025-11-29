import supabase from './supabase.js'

export async function insertNewOrder({ customer_id, orderPassword, status, total }) {
  
    const { data, error } = await supabase
    .from('orders')
    .insert([{ customer_id, order_password: orderPassword, status , total  }])
    .select()

  if (error) throw new Error(error.message)
  return data[0]
}



export function generateOrderPassword() {
  const n = Math.floor(1000 + Math.random() * 9000); // 4 dígitos
  return `ORD-${n}`;
}


export async function getProductById(product_id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", product_id)
    .single()

  if (error) {
    console.error("Error fetching product:", error.message)
    return null
  }

  return data
}





export async function insertOrderItems({ order_id, product_id, quantity }) {
  const { error } = await supabase
    .from("order_items")
    .insert({
      order_id,
      product_id,
      quantity
    })

  if (error) {
    console.error("Error inserting order item:", error)
    return false
  }

  return true
}

