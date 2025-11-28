import supabase from './supabase.js'

export async function insertNewOrder({ customerName, orderPassword }) {
  
    const { data, error } = await supabase
    .from('orders')
    .insert([{ customer_name: customerName, order_password: orderPassword }])
    .select()

  if (error) throw new Error(error.message)
  return data[0]
}



export function generateOrderPassword() {
  const n = Math.floor(1000 + Math.random() * 9000); // 4 dígitos
  return `ORD-${n}`;
}
