import { Link } from 'react-router-dom';
import './Footer.css';
import { CONTACT_EMAIL } from '../../config';

const EXPLORE_LINKS = [
  { to: '/', label: 'My Work' },
  { to: '/shop', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-wordmark">Ranbeer Chaudhary</p>
          <p className="footer-tagline">
            Original paintings and limited-edition prints — bold colors, modern
            form, and stories from heritage.
          </p>
        </div>

        <nav className="footer-col" aria-label="Footer">
          <p className="footer-heading">Explore</p>
          {EXPLORE_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className="link-underline footer-link">
              {label}
            </Link>
          ))}
        </nav>

        <div className="footer-col">
          <p className="footer-heading">Get in touch</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="link-underline footer-link"
          >
            {CONTACT_EMAIL}
          </a>
          <a href="tel:+447513368891" className="link-underline footer-link">
            +44 7513 368891
          </a>
          <p className="footer-location">Geneva, Switzerland</p>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/ranbeer.art/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              href="https://wa.me/+447513368891"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <i className="fab fa-whatsapp" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© 2026 Ranbeer Chaudhary. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/legal/privacy">Privacy</Link>
            <Link to="/legal/terms">Terms of Sale</Link>
            <Link to="/legal/shipping-returns">Shipping &amp; Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
