import { supabase } from "./supabaseClient";
import type { Artwork } from "../types/artwork";
import type { ArtworkImage } from "../types/artworkImage";

/** Fetch a single artwork by its id. Throws if it does not exist. */
export async function getArtworkById(id: number | string): Promise<Artwork> {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) throw new Error(`Artwork ${id} not found`);
  return data;
}

/** Fetch all images for an artwork, optionally restricted to certain tags. */
export async function getArtworkImages(
  artworkId: number | string,
  tags?: string[]
): Promise<ArtworkImage[]> {
  let query = supabase
    .from("images")
    .select("*")
    .eq("artwork_id", artworkId)
    .order("tag", { ascending: true });

  if (tags?.length) query = query.in("tag", tags);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

/**
 * URL of the artwork's main image (tagged "original"), falling back to the
 * first available image. Returns null when the artwork has no images.
 */
export async function getPrimaryImageUrl(
  artworkId: number | string
): Promise<string | null> {
  const originals = await getArtworkImages(artworkId, ["original"]);
  if (originals.length > 0) return originals[0].url;

  const all = await getArtworkImages(artworkId);
  return all[0]?.url ?? null;
}
