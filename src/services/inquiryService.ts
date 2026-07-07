import { supabase } from "./supabaseClient";

export type Inquiry = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  message: string;
  created_at?: string;
};

/** Store a contact-form submission in the `inquiries` table. */
export async function createInquiry(
  inquiry: Omit<Inquiry, "id" | "created_at">
): Promise<Inquiry> {
  const { data, error } = await supabase
    .from("inquiries")
    .insert(inquiry)
    .select()
    .single();

  if (error) throw error;
  return data;
}
