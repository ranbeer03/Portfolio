import { supabase } from "./supabaseClient";

export type CheckoutLine = {
  artworkId: number;
  editionKey: string;
  quantity: number;
};

/**
 * Ask the create-checkout edge function for a Stripe Checkout URL.
 * Prices are recomputed server-side; the cart only names what to buy.
 */
export async function startStripeCheckout(
  lines: CheckoutLine[]
): Promise<string> {
  const { data, error } = await supabase.functions.invoke("create-checkout", {
    body: { lines },
  });

  if (error) throw error;
  if (!data?.url) throw new Error(data?.error ?? "Checkout could not start");
  return data.url;
}
