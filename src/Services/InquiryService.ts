import { supabase } from "./SupaBaseClient";

export type Inquiry = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  message: string;
  created_at?: string;
};

// Insert a new inquiry (form submission)
export async function createInquiry(inquiry: Omit<Inquiry, "id" | "created_at">): Promise<Inquiry> {
  const { data, error } = await supabase
    .from("inquiries")
    .insert(inquiry)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Optional: get all inquiries (for admin)
export async function listInquiries(): Promise<Inquiry[]> {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
