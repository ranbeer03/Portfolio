/**
 * Site-wide configuration. Change contact details or shop economics here,
 * not in individual components.
 *
 * Note: once Stripe checkout is live, DELIVERY_FEE must match the value the
 * create-checkout edge function reads from the database — the server is the
 * source of truth for money, this constant only drives UI display.
 */
export const CONTACT_EMAIL = 'ranbeerchaudhary03@gmail.com';

export const CURRENCY_SYMBOL = '£';
export const CURRENCY_CODE = 'GBP';
export const DELIVERY_FEE = 10;

/**
 * 'invoice' — orders are saved and Ranbeer emails payment details (current).
 * 'stripe'  — checkout redirects to Stripe (flip after the edge functions
 *             in supabase/functions are deployed and secrets are set).
 */
export const CHECKOUT_MODE = 'invoice';
