import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import { createOrder } from '../services/ordersService';
import usePageTitle from '../hooks/usePageTitle';
import './CartPage.css';
import { CONTACT_EMAIL, CURRENCY_CODE } from '../config';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CartPage = () => {
  usePageTitle('Cart — Ranbeer Chaudhary');
  const { items, subtotal, removeItem, setQuantity, clearCart } =
    useContext(CartContext);
  const { currency, deliveryFee } = useContext(ShopContext);
  const { user } = useContext(AuthContext);

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [placedOrderId, setPlacedOrderId] = useState(null);

  const total = subtotal + deliveryFee;

  /* Prefill contact details for signed-in customers. */
  useEffect(() => {
    if (!user) return;
    setCustomerName((current) => current || user.user_metadata?.full_name || '');
    setEmail((current) => current || user.email || '');
  }, [user]);

  const validate = () => {
    const newErrors = {};
    if (!customerName.trim()) newErrors.customerName = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!EMAIL_REGEX.test(email)) newErrors.email = 'Invalid email address';
    if (!shippingAddress.trim())
      newErrors.shippingAddress = 'Shipping address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    try {
      const order = await createOrder({
        user_id: user?.id ?? null,
        customer_name: customerName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        shipping_address: shippingAddress.trim(),
        note: note.trim() || undefined,
        items: items.map((line) => ({
          artwork_id: line.artworkId,
          artwork_name: line.name,
          edition: line.editionLabel,
          unit_price: line.unitPrice,
          quantity: line.quantity,
        })),
        subtotal,
        delivery_fee: deliveryFee,
        total,
        currency: CURRENCY_CODE,
      });
      setPlacedOrderId(order.id);
      setStatus('success');
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="page cart-page">
        <div className="cart-success">
          <i className="fa-solid fa-circle-check" aria-hidden="true" />
          <h1 className="page-header">Thank you for your order</h1>
          <p>
            Order <strong>#{placedOrderId}</strong> has been received. You won't
            be charged yet — I'll confirm availability and send secure payment
            details to your email within 24 hours.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Back to the Gallery
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="page cart-page">
        <div className="cart-empty">
          <h1 className="page-header">Your cart is empty</h1>
          <p>Browse the gallery to find a piece that speaks to you.</p>
          <Link to="/shop" className="btn btn-primary">
            Explore the Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <h1 className="page-header cart-title">Your Cart</h1>

      <div className="cart-layout">
        <ul className="cart-items">
          {items.map((line) => (
            <li key={`${line.artworkId}-${line.editionKey}`} className="cart-item">
              {line.imageUrl && (
                <img
                  src={line.imageUrl}
                  alt={line.name}
                  loading="lazy"
                  decoding="async"
                  className="cart-item-image"
                />
              )}
              <div className="cart-item-info">
                <Link to={`/product/${line.artworkId}`} className="cart-item-name">
                  {line.name}
                </Link>
                <p className="cart-item-edition">{line.editionLabel}</p>
                {line.maxQuantity > 1 ? (
                  <div className="quantity-stepper" aria-label="Quantity">
                    <button
                      onClick={() =>
                        setQuantity(line.artworkId, line.editionKey, line.quantity - 1)
                      }
                      disabled={line.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{line.quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity(line.artworkId, line.editionKey, line.quantity + 1)
                      }
                      disabled={line.quantity >= line.maxQuantity}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p className="cart-item-unique">Unique piece</p>
                )}
              </div>
              <div className="cart-item-side">
                <p className="cart-item-price">
                  {currency}
                  {line.unitPrice * line.quantity}
                </p>
                <button
                  className="cart-item-remove"
                  onClick={() => removeItem(line.artworkId, line.editionKey)}
                  aria-label={`Remove ${line.name} from cart`}
                >
                  <i className="fa-solid fa-xmark" /> Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="cart-side">
          <div className="cart-summary">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>
                {currency}
                {subtotal}
              </span>
            </div>
            <div className="cart-summary-row">
              <span>Delivery</span>
              <span>
                {currency}
                {deliveryFee}
              </span>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>
                {currency}
                {total}
              </span>
            </div>
          </div>

          <form className="cart-checkout" onSubmit={handlePlaceOrder} noValidate>
            <div className="field">
              <label htmlFor="order-name">Full name *</label>
              <input
                id="order-name"
                type="text"
                className="input"
                autoComplete="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              {errors.customerName && (
                <span className="error-text">{errors.customerName}</span>
              )}
            </div>
            <div className="field">
              <label htmlFor="order-email">Email *</label>
              <input
                id="order-email"
                type="email"
                className="input"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div className="field">
              <label htmlFor="order-phone">Phone</label>
              <input
                id="order-phone"
                type="tel"
                className="input"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="order-address">Shipping address *</label>
              <textarea
                id="order-address"
                className="input"
                autoComplete="street-address"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
              {errors.shippingAddress && (
                <span className="error-text">{errors.shippingAddress}</span>
              )}
            </div>
            <div className="field">
              <label htmlFor="order-note">Note (optional)</label>
              <input
                id="order-note"
                type="text"
                className="input"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary cart-place-order"
              disabled={status === 'sending'}
            >
              {status === 'sending'
                ? 'Placing order…'
                : `Place Order — ${currency}${total}`}
            </button>
            {status === 'error' && (
              <p className="error-text" role="alert">
                Something went wrong placing your order. Please try again or
                email {CONTACT_EMAIL}.
              </p>
            )}
            <p className="cart-disclaimer">
              You won't be charged online. Ranbeer will confirm availability and
              send secure payment details to your email within 24 hours.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
