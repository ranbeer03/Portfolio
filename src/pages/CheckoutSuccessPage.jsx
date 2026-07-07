import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import usePageTitle from '../hooks/usePageTitle';
import './CartPage.css';

/** Landing page for Stripe's success_url. Payment is confirmed by webhook. */
const CheckoutSuccessPage = () => {
  usePageTitle('Order complete — Ranbeer Chaudhary');
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();
    // clearCart is stable in practice; run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page cart-page">
      <div className="cart-success">
        <i className="fa-solid fa-circle-check" aria-hidden="true" />
        <h1 className="page-header">Thank you for your order</h1>
        <p>
          Your payment was received. A receipt is on its way to your email,
          and I'll be in touch with dispatch details shortly.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Back to the Gallery
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
