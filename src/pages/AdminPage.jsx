import { useState, useEffect, useContext, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  getIsAdmin,
  listAllOrders,
  updateOrder,
  listInquiries,
} from '../services/adminService';
import usePageTitle from '../hooks/usePageTitle';
import './AdminPage.css';

const ORDER_STATUSES = [
  'new',
  'confirmed',
  'pending_payment',
  'paid',
  'shipped',
  'cancelled',
  'needs_attention',
];

const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const OrderRow = ({ order, onSaved }) => {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [tracking, setTracking] = useState(order.tracking_number ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const dirty =
    status !== order.status || tracking !== (order.tracking_number ?? '');

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await updateOrder(order.id, {
        status,
        tracking_number: tracking.trim() || null,
      });
      onSaved(order.id, { status, tracking_number: tracking.trim() || null });
    } catch (saveError) {
      console.error('Order update failed:', saveError);
      setError('Save failed — are you still signed in as an admin?');
    } finally {
      setSaving(false);
    }
  };

  return (
    <li className="admin-order">
      <button
        type="button"
        className="admin-order-summary"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
      >
        <span className="admin-order-id">#{order.id}</span>
        <span className="admin-order-customer">
          {order.customer_name}
          <small>{order.email}</small>
        </span>
        <span className="admin-order-total">
          £{order.total}
          <small>{formatDate(order.created_at)}</small>
        </span>
        <span className={`admin-badge admin-badge-${order.status}`}>
          {order.status.replaceAll('_', ' ')}
        </span>
      </button>

      {expanded && (
        <div className="admin-order-detail">
          <table className="admin-items">
            <thead>
              <tr>
                <th>Item</th>
                <th>Edition</th>
                <th>Qty</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.artwork_name}</td>
                  <td>{item.edition}</td>
                  <td>{item.quantity}</td>
                  <td>£{item.unit_price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <dl className="admin-order-meta">
            <div>
              <dt>Shipping address</dt>
              <dd>{order.shipping_address}</dd>
            </div>
            {order.phone && (
              <div>
                <dt>Phone</dt>
                <dd>{order.phone}</dd>
              </div>
            )}
            {order.note && (
              <div>
                <dt>Note</dt>
                <dd>{order.note}</dd>
              </div>
            )}
            <div>
              <dt>Totals</dt>
              <dd>
                £{order.subtotal} + £{order.delivery_fee} delivery = £
                {order.total}
              </dd>
            </div>
          </dl>

          <div className="admin-order-actions">
            <label>
              Status
              <select
                className="input"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                {ORDER_STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {value.replaceAll('_', ' ')}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Tracking number
              <input
                className="input"
                type="text"
                value={tracking}
                placeholder="e.g. RM123456789GB"
                onChange={(event) => setTracking(event.target.value)}
              />
            </label>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!dirty || saving}
              onClick={handleSave}
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
          {error && (
            <p className="error-text" role="alert">
              {error}
            </p>
          )}
        </div>
      )}
    </li>
  );
};

const AdminPage = () => {
  usePageTitle('Admin — Ranbeer Chaudhary');
  const { user, loading } = useContext(AuthContext);

  const [isAdmin, setIsAdmin] = useState(null); // null = checking
  const [tab, setTab] = useState('orders'); // orders | inquiries
  const [orders, setOrders] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (loading || !user) return;
    let cancelled = false;

    const load = async () => {
      const admin = await getIsAdmin();
      if (cancelled) return;
      setIsAdmin(admin);
      if (!admin) return;
      try {
        const [orderRows, inquiryRows] = await Promise.all([
          listAllOrders(),
          listInquiries(),
        ]);
        if (cancelled) return;
        setOrders(orderRows);
        setInquiries(inquiryRows);
      } catch (error) {
        console.error('Admin data load failed:', error);
        if (!cancelled) setLoadError('Could not load data. Try reloading.');
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [loading, user]);

  const applyLocalUpdate = (orderId, changes) => {
    setOrders((previous) =>
      previous.map((order) =>
        order.id === orderId ? { ...order, ...changes } : order
      )
    );
  };

  const visibleOrders = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return orders.filter((order) => {
      if (statusFilter !== 'all' && order.status !== statusFilter) return false;
      if (!needle) return true;
      return (
        String(order.id) === needle ||
        order.customer_name.toLowerCase().includes(needle) ||
        order.email.toLowerCase().includes(needle)
      );
    });
  }, [orders, statusFilter, search]);

  if (!loading && !user) return <Navigate to="/login" replace />;
  if (loading || isAdmin === null)
    return <div className="page admin-page">Checking access…</div>;
  if (!isAdmin) {
    return (
      <div className="page admin-page">
        <h1 className="page-header">Not authorized</h1>
        <p>This area is for the site owner.</p>
      </div>
    );
  }

  return (
    <div className="page admin-page">
      <h1 className="page-header">Admin</h1>

      <div className="admin-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'orders'}
          className={tab === 'orders' ? 'admin-tab active' : 'admin-tab'}
          onClick={() => setTab('orders')}
        >
          Orders ({orders.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'inquiries'}
          className={tab === 'inquiries' ? 'admin-tab active' : 'admin-tab'}
          onClick={() => setTab('inquiries')}
        >
          Inquiries ({inquiries.length})
        </button>
      </div>

      {loadError && (
        <p className="error-text" role="alert">
          {loadError}
        </p>
      )}

      {tab === 'orders' ? (
        <>
          <div className="admin-toolbar">
            <select
              className="input"
              aria-label="Filter by status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">All statuses</option>
              {ORDER_STATUSES.map((value) => (
                <option key={value} value={value}>
                  {value.replaceAll('_', ' ')}
                </option>
              ))}
            </select>
            <input
              className="input"
              type="search"
              placeholder="Search name, email, or order #"
              aria-label="Search orders"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          {visibleOrders.length === 0 ? (
            <p className="admin-empty">No orders match.</p>
          ) : (
            <ul className="admin-orders">
              {visibleOrders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onSaved={applyLocalUpdate}
                />
              ))}
            </ul>
          )}
        </>
      ) : inquiries.length === 0 ? (
        <p className="admin-empty">No inquiries yet.</p>
      ) : (
        <ul className="admin-inquiries">
          {inquiries.map((inquiry) => (
            <li key={inquiry.id} className="admin-inquiry">
              <div className="admin-inquiry-head">
                <strong>
                  {inquiry.first_name} {inquiry.last_name}
                </strong>
                <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>
                <span>{formatDate(inquiry.created_at)}</span>
              </div>
              <p>{inquiry.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPage;
