// src/Services/ProductService.ts
import { supabase } from "./SupaBaseClient";
import type { Product } from "../types/product";

// List
export async function listProducts(
  params?: { limit?: number; search?: string }
): Promise<Product[]> {
  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (params?.limit) query = query.limit(params.limit);
  if (params?.search) query = query.ilike("title", `%${params.search}%`);

  const { data, error } = await query;
  if (error) throw error;
  // Supabase returns `Product[] | null` – normalize to [] for convenience
  return data ?? [];
}

// Get by ID
export async function getProductById(id: string): Promise<Product> {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Product not found");
  return data;
}

// Create
export async function createProduct(
  payload: Omit<Product, "id" | "created_at">
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  if (!data) throw new Error("Failed to create product");
  return data;
}
