// src/types/product.ts
export type Product = {
  id: string;               // uuid
  title: string;
  description?: string | null;
  price_cents: number;
  currency: 'USD' | 'GBP' | 'EUR';
  stock?: number | null;
  image_url?: string | null;
  created_at: string;       // timestamp
};
