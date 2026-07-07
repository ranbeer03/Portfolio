import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

const NotFoundPage = () => {
  usePageTitle('Page not found — Ranbeer Chaudhary');

  return (
    <div className="page section" style={{ alignItems: 'flex-start', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <p className="eyebrow">404</p>
      <h1 className="page-header">This wall is empty</h1>
      <p style={{ margin: 0, color: 'var(--color-ink-soft)' }}>
        The page you're looking for doesn't exist — but the gallery is full.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to My Work
      </Link>
    </div>
  );
};

export default NotFoundPage;
