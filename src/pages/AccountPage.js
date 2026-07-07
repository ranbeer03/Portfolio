import { useState, useEffect, useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { listMyOrders } from '../services/ordersService.ts';
import usePageTitle from '../hooks/usePageTitle';
import './AccountPage.css';

const formatOrderDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

const AccountPage = () => {
  usePageTitle('My Account — Ranbeer Chaudhary');
  const { user, loading, signOut } = useContext(AuthContext);
  const [orders, setOrders] = useState(null); // null = loading, [] = none

  useEffect(() => {
    if (!user) return;
    listMyOrders()
      .then(setOrders)
      .catch((error) => {
        console.error('Error loading orders:', error);
        setOrders([]);
      });
  }, [user]);

  if (loading) return <div className="page" />;
  if (!user) return <Navigate to="/login" replace />;

  const displayName = user.user_metadata?.full_name || user.email;

  return (
    <div className="page account-page">
      <div className="account-header">
        <div>
          <p className="eyebrow">My account</p>
          <h1 className="page-header">{displayName}</h1>
          <p className="account-email">{user.email}</p>
        </div>
        <button className="btn btn-outline" onClick={signOut}>
          Sign Out
        </button>
      </div>

      <section className="account-orders">
        <h2 className="secondary-header">Order history</h2>
        {orders === null && <p className="account-note">Loading orders…</p>}
        {orders?.length === 0 && (
          <p className="account-note">
            No orders yet —{' '}
            <Link to="/shop" className="account-link">
              explore the gallery
            </Link>
            . Orders placed while signed in appear here.
          </p>
        )}
        {orders?.length > 0 && (
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order.id} className="order-card">
                <div className="order-card-header">
                  <p className="order-id">Order #{order.id}</p>
                  <span className={`order-status order-status-${order.status}`}>
                    {order.status}
                  </span>
                </div>
                <p className="order-date">{formatOrderDate(order.created_at)}</p>
                <ul className="order-items">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.quantity} × {item.artwork_name} — {item.edition}
                    </li>
                  ))}
                </ul>
                <p className="order-total">
                  Total: £{order.total}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AccountPage;
