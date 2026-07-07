import { supabase } from "./supabaseClient";
import type { Order } from "./ordersService";
import type { Inquiry } from "./inquiryService";

/**
 * Whether the signed-in user is an admin. RLS only ever exposes the
 * caller's own row, so this returns false for everyone else.
 */
export async function getIsAdmin(): Promise<boolean> {
  const { data, error } = await supabase
    .from("admins")
    .select("user_id")
    .maybeSingle();
  if (error) return false;
  return Boolean(data);
}

/** All orders, newest first (admin-only under RLS). */
export async function listAllOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function updateOrder(
  id: number,
  changes: { status?: string; tracking_number?: string | null }
): Promise<void> {
  const { error } = await supabase.from("orders").update(changes).eq("id", id);
  if (error) throw error;
}

/** All contact-form inquiries, newest first (admin-only under RLS). */
export async function listInquiries(): Promise<Inquiry[]> {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
