import { supabase } from "./supabaseClient";

export type OrderItem = {
  artwork_id: number;
  artwork_name: string;
  edition: string;
  unit_price: number;
  quantity: number;
};

export type Order = {
  id?: number;
  created_at?: string;
  status?: string;
  user_id?: string | null;
  customer_name: string;
  email: string;
  phone?: string;
  shipping_address: string;
  note?: string;
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  currency: string;
};

/** Store a placed order in the `orders` table (see supabase/orders.sql). */
export async function createOrder(
  order: Omit<Order, "id" | "created_at" | "status">
): Promise<Order> {
  const { data, error } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** Orders of the signed-in user (row-level security scopes the query). */
export async function listMyOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
