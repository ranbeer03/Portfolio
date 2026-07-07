/** A row from the Supabase `artworks` table. */
export type Artwork = {
  id: number;
  name: string;
  description: string | null;
  size_inches: string | null;
  size_cm: string | null;
  medium: string | null;
  genre: string | null;
  collection: string | null;
  format: string | null;
  created_at: string | null;
};
