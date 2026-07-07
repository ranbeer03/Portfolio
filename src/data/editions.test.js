import { describe, it, expect } from 'vitest';
import { getAvailableEditions, getLowestPrice } from './editions';

const priceRow = {
  original: 200,
  original_framed: 240,
  a5_print: 15,
  a5_print_framed: 25,
  a4_print: 25,
  a4_print_framed: 35,
  a3_print: 50,
  a3_print_framed: 70,
  a2_print: 50,
  a2_print_framed: 70,
  original_stock: 1,
  a5_print_stock: 30,
  a4_stock: 20,
  a3_stock: 15,
  a2_print_stock: 10,
};

describe('getAvailableEditions', () => {
  it('returns every priced, in-stock edition', () => {
    expect(getAvailableEditions(priceRow)).toHaveLength(10);
  });

  it('returns [] without a price row', () => {
    expect(getAvailableEditions(null)).toEqual([]);
    expect(getAvailableEditions(undefined)).toEqual([]);
  });

  it('hides editions priced at 0 or with no stock', () => {
    const editions = getAvailableEditions({
      ...priceRow,
      a5_print: 0,
      a4_stock: 0,
    });
    const keys = editions.map((edition) => edition.key);
    expect(keys).not.toContain('a5_print');
    expect(keys).not.toContain('a4_print'); // stock 0 hides both a4 variants
    expect(keys).not.toContain('a4_print_framed');
    expect(keys).toContain('a5_print_framed'); // its own price still > 0
  });

  it('caps originals at quantity 1 regardless of stock', () => {
    const editions = getAvailableEditions({ ...priceRow, original_stock: 5 });
    const original = editions.find((edition) => edition.key === 'original');
    const framed = editions.find(
      (edition) => edition.key === 'original_framed'
    );
    expect(original.maxQuantity).toBe(1);
    expect(framed.maxQuantity).toBe(1);
  });

  it('caps prints at their stock count', () => {
    const a2 = getAvailableEditions(priceRow).find(
      (edition) => edition.key === 'a2_print'
    );
    expect(a2.maxQuantity).toBe(10);
  });

  it('treats missing stock columns as available', () => {
    const { original_stock: _unused, ...rowWithoutStock } = priceRow;
    const keys = getAvailableEditions(rowWithoutStock).map(
      (edition) => edition.key
    );
    expect(keys).toContain('original');
  });
});

describe('getLowestPrice', () => {
  it('returns the cheapest available edition price', () => {
    expect(getLowestPrice(priceRow)).toBe(15);
  });

  it('ignores out-of-stock editions when finding the lowest price', () => {
    expect(getLowestPrice({ ...priceRow, a5_print_stock: 0 })).toBe(25);
  });

  it('returns null when nothing is purchasable', () => {
    expect(getLowestPrice(null)).toBeNull();
    expect(
      getLowestPrice({ original: 0, a5_print: 0 })
    ).toBeNull();
  });
});
