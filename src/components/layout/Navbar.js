import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'My Work' },
  { to: '/shop', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const navLinkClass = ({ isActive }) =>
  isActive ? 'link-underline active' : 'link-underline';

const Navbar = () => {
  const logoUrl = process.env.PUBLIC_URL + '/images/rc-logo.png';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useContext(CartContext);

  return (
    <nav className="nav-container">
      <div className="nav">
        <NavLink to="/" className="nav-brand">
          <img src={logoUrl} alt="Ranbeer Chaudhary logo" className="nav-logo" />
        </NavLink>

        <div className="links-container">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} className={navLinkClass} to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          <NavLink to="/account" className="nav-cart" aria-label="Account">
            <i className="fa-regular fa-user" />
          </NavLink>
          <NavLink to="/cart" className="nav-cart" aria-label="Cart">
            <i className="fa-solid fa-bag-shopping" />
            {itemCount > 0 && <span className="nav-cart-badge">{itemCount}</span>}
          </NavLink>
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <i className="fa-solid fa-bars" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-sidebar">
          <button
            className="sidebar-close"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark" />
          </button>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              onClick={() => setIsMenuOpen(false)}
              className="link-underline"
              to={to}
              end={to === '/'}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
