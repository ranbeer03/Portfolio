import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import usePageTitle from '../hooks/usePageTitle';
import './LoginPage.css';

/**
 * Landing page for the Supabase password-recovery link. The link signs the
 * visitor in with a temporary session; this page lets them set a new password.
 */
const ResetPasswordPage = () => {
  usePageTitle('Reset password — Ranbeer Chaudhary');
  const { user, loading, updatePassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    if (password !== confirm) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setStatus('sending');
    try {
      const { error } = await updatePassword(password);
      if (error) throw error;
      navigate('/account');
    } catch (error) {
      setErrorMessage(error.message ?? 'Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  if (loading) return <div className="page" />;

  if (!user) {
    return (
      <div className="page login-page">
        <div className="auth-card">
          <i className="fa-solid fa-link-slash auth-icon" aria-hidden="true" />
          <h1 className="secondary-header">Link expired</h1>
          <p>
            This password reset link is invalid or has expired. Request a new
            one from the sign-in page.
          </p>
          <Link to="/login" className="btn btn-outline">
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page login-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div>
          <p className="eyebrow">Reset password</p>
          <h1 className="secondary-header">Choose a new password</h1>
        </div>

        <div className="field">
          <label htmlFor="reset-password">New password</label>
          <input
            id="reset-password"
            type="password"
            className="input"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="reset-confirm">Confirm new password</label>
          <input
            id="reset-confirm"
            type="password"
            className="input"
            autoComplete="new-password"
            required
            minLength={8}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        {errorMessage && (
          <p className="error-text" role="alert">
            <i className="fa-solid fa-circle-exclamation" /> {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Please wait…' : 'Set New Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
