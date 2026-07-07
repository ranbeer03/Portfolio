/**
 * Edition → prices-table column mapping. MUST stay in sync with
 * src/data/editions.js (the client-side copy that drives the UI).
 */
export type EditionKey =
  | 'original'
  | 'original_framed'
  | 'a5_print'
  | 'a5_print_framed'
  | 'a4_print'
  | 'a4_print_framed'
  | 'a3_print'
  | 'a3_print_framed'
  | 'a2_print'
  | 'a2_print_framed';

export const EDITIONS: Record<
  EditionKey,
  { label: string; priceField: string; stockField: string; unique: boolean }
> = {
  original: { label: 'Original', priceField: 'original', stockField: 'original_stock', unique: true },
  original_framed: { label: 'Original — Framed', priceField: 'original_framed', stockField: 'original_stock', unique: true },
  a5_print: { label: 'A5 Print', priceField: 'a5_print', stockField: 'a5_print_stock', unique: false },
  a5_print_framed: { label: 'A5 Print — Framed', priceField: 'a5_print_framed', stockField: 'a5_print_stock', unique: false },
  a4_print: { label: 'A4 Print', priceField: 'a4_print', stockField: 'a4_stock', unique: false },
  a4_print_framed: { label: 'A4 Print — Framed', priceField: 'a4_print_framed', stockField: 'a4_stock', unique: false },
  a3_print: { label: 'A3 Print', priceField: 'a3_print', stockField: 'a3_stock', unique: false },
  a3_print_framed: { label: 'A3 Print — Framed', priceField: 'a3_print_framed', stockField: 'a3_stock', unique: false },
  a2_print: { label: 'A2 Print', priceField: 'a2_print', stockField: 'a2_print_stock', unique: false },
  a2_print_framed: { label: 'A2 Print — Framed', priceField: 'a2_print_framed', stockField: 'a2_print_stock', unique: false },
};

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};
