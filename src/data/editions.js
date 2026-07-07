/**
 * Purchase editions map onto columns of the Supabase `prices` table:
 * one row per artwork with a price and stock count per edition.
 */
const EDITIONS = [
  { key: 'original', label: 'Original', priceField: 'original', stockField: 'original_stock' },
  { key: 'original_framed', label: 'Original — Framed', priceField: 'original_framed', stockField: 'original_stock' },
  { key: 'a5_print', label: 'A5 Print', priceField: 'a5_print', stockField: 'a5_print_stock' },
  { key: 'a5_print_framed', label: 'A5 Print — Framed', priceField: 'a5_print_framed', stockField: 'a5_print_stock' },
  { key: 'a4_print', label: 'A4 Print', priceField: 'a4_print', stockField: 'a4_stock' },
  { key: 'a4_print_framed', label: 'A4 Print — Framed', priceField: 'a4_print_framed', stockField: 'a4_stock' },
  { key: 'a3_print', label: 'A3 Print', priceField: 'a3_print', stockField: 'a3_stock' },
  { key: 'a3_print_framed', label: 'A3 Print — Framed', priceField: 'a3_print_framed', stockField: 'a3_stock' },
  { key: 'a2_print', label: 'A2 Print', priceField: 'a2_print', stockField: 'a2_print_stock' },
  { key: 'a2_print_framed', label: 'A2 Print — Framed', priceField: 'a2_print_framed', stockField: 'a2_print_stock' },
];

/** Editions of an artwork that are priced and in stock. */
export const getAvailableEditions = (priceRow) => {
  if (!priceRow) return [];
  return EDITIONS.filter(
    (edition) =>
      priceRow[edition.priceField] > 0 && (priceRow[edition.stockField] ?? 1) > 0
  ).map((edition) => ({
    key: edition.key,
    label: edition.label,
    price: priceRow[edition.priceField],
    // Originals are unique; prints are capped by their stock.
    maxQuantity: edition.key.startsWith('original')
      ? 1
      : priceRow[edition.stockField] ?? 10,
  }));
};

/** Lowest available price for an artwork ("From £15"), or null. */
export const getLowestPrice = (priceRow) => {
  const editions = getAvailableEditions(priceRow);
  if (editions.length === 0) return null;
  return Math.min(...editions.map((edition) => edition.price));
};
