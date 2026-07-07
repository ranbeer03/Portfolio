/** A row from the Supabase `images` table. */
export type ArtworkImage = {
  id: number;
  url: string;
  type: string | null;
  artwork_id: number;
  tag: string | null;
  framed: boolean | null;
};
