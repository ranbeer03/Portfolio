-- Make the remaining imaged artworks purchasable.
-- These five artworks have images but no `prices` row yet, so their product
-- pages show "Request Price & Availability" instead of Add to Cart.
-- EDIT THE PRICES below, then run in the Supabase SQL Editor.

insert into public.prices
  (artwork_id, original, original_framed,
   a5_print, a5_print_framed, a4_print, a4_print_framed,
   a3_print, a3_print_framed, a2_print, a2_print_framed,
   default_currency, original_stock, a5_print_stock, a4_stock, a3_stock, a2_print_stock)
values
  (116, 200, 240, 15, 25, 25, 35, 50, 70, 50, 70, 'GBP', 1, 30, 20, 15, 10), -- cash never waits
  (117, 200, 240, 15, 25, 25, 35, 50, 70, 50, 70, 'GBP', 1, 30, 20, 15, 10), -- take the chance
  (130, 200, 240, 15, 25, 25, 35, 50, 70, 50, 70, 'GBP', 1, 30, 20, 15, 10), -- tiger
  (137, 200, 240, 15, 25, 25, 35, 50, 70, 50, 70, 'GBP', 1, 30, 20, 15, 10), -- whale
  (139, 200, 240, 15, 25, 25, 35, 50, 70, 50, 70, 'GBP', 1, 30, 20, 15, 10); -- abstract fishes

-- Tip: set an edition's price to 0 (or its stock to 0) to hide that edition.
