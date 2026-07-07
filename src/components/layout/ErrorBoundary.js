import { Component } from 'react';

/** Catches render errors so a single broken page never blanks the site. */
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Unhandled render error:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="page section" style={{ flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
        <h1 className="page-header">Something went wrong</h1>
        <p style={{ margin: 0, color: 'var(--color-ink-soft)' }}>
          An unexpected error occurred. Reloading usually fixes it.
        </p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
