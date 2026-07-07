import { describe, it, expect } from 'vitest';
import { getItemCount, getSubtotal, getOrderTotal } from './cartTotals';

const items = [
  { unitPrice: 200, quantity: 1 }, // original
  { unitPrice: 15, quantity: 3 }, // A5 prints
  { unitPrice: 70, quantity: 2 }, // framed A3 prints
];

describe('cart totals', () => {
  it('counts units across lines', () => {
    expect(getItemCount(items)).toBe(6);
  });

  it('sums price × quantity per line', () => {
    expect(getSubtotal(items)).toBe(200 + 45 + 140);
  });

  it('adds the delivery fee to the order total', () => {
    expect(getOrderTotal(items, 10)).toBe(395);
  });

  it('handles an empty cart', () => {
    expect(getItemCount([])).toBe(0);
    expect(getSubtotal([])).toBe(0);
    expect(getOrderTotal([], 10)).toBe(10);
  });
});
