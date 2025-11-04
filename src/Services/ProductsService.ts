import { supabase } from "./SupaBaseClient";
import type { Artwork } from "../Types/artwork";
import type { ArtworkImage } from "../Types/artworkImage";

export async function listProducts(
  params?: { limit?: number; search?: string }
): Promise<Artwork[]> {
  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (params?.limit) query = query.limit(params.limit);
  if (params?.search) query = query.ilike("title", `%${params.search}%`);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

// Get by ID
export async function getProductInfoById(id: string): Promise<Artwork> {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Product not found");
  return data;
}

// Get all images for an artwork
export async function getArtworkImages(
  artworkId: string,
  opts?: {tags?: string[]}
): Promise<ArtworkImage[]> {
  let q = supabase
    .from("images")
    .select("*")
    .eq("artwork_id", artworkId)
    .order("tag", { ascending: true });
  if (opts?.tags?.length) q = q.in("tag", opts.tags);

  const { data, error } = await q;
  if (error) throw error;
  return data ?? [];
}

// Get one thumbnail image by artwork ID and tag
export async function getThumbnailImage(
  artworkId: string,
  tag: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from("images")
    .select("url")
    .eq("artwork_id", artworkId)
    .eq("tag", tag)
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data?.url ?? null;
}

