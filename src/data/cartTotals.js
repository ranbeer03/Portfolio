/**
 * Pure cart math, shared by CartContext (live totals) and the checkout
 * payload. Kept dependency-free so it can be unit-tested directly.
 */

/** Total number of units across all cart lines. */
export const getItemCount = (items) =>
  items.reduce((sum, line) => sum + line.quantity, 0);

/** Sum of unitPrice × quantity across all cart lines. */
export const getSubtotal = (items) =>
  items.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);

/** Order total: subtotal plus the flat delivery fee. */
export const getOrderTotal = (items, deliveryFee) =>
  getSubtotal(items) + deliveryFee;
