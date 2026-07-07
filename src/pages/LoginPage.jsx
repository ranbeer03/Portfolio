import { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import usePageTitle from '../hooks/usePageTitle';
import './LoginPage.css';

const LoginPage = () => {
  usePageTitle('Sign in — Ranbeer Chaudhary');
  const { user, signIn, signUp, requestPasswordReset } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [mode, setMode] = useState('signin'); // signin | signup | reset
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | confirm-email | reset-sent
  const [errorMessage, setErrorMessage] = useState(null);

  if (user) return <Navigate to="/account" replace />;

  const isSignup = mode === 'signup';
  const isReset = mode === 'reset';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    setStatus('sending');

    try {
      if (isReset) {
        const { error } = await requestPasswordReset(email);
        if (error) throw error;
        setStatus('reset-sent');
      } else if (isSignup) {
        const { data, error } = await signUp(email, password, fullName);
        if (error) throw error;
        if (data.session) navigate('/account');
        else setStatus('confirm-email'); // email confirmation is enabled
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        navigate('/account');
      }
    } catch (error) {
      setErrorMessage(error.message ?? 'Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  if (status === 'reset-sent') {
    return (
      <div className="page login-page">
        <div className="auth-card">
          <i className="fa-solid fa-envelope-circle-check auth-icon" aria-hidden="true" />
          <h1 className="secondary-header">Check your email</h1>
          <p>
            If an account exists for <strong>{email}</strong>, we sent a link to
            reset your password.
          </p>
          <button
            className="btn btn-outline"
            onClick={() => {
              setMode('signin');
              setStatus('idle');
            }}
          >
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  if (status === 'confirm-email') {
    return (
      <div className="page login-page">
        <div className="auth-card">
          <i className="fa-solid fa-envelope-circle-check auth-icon" aria-hidden="true" />
          <h1 className="secondary-header">Check your email</h1>
          <p>
            We sent a confirmation link to <strong>{email}</strong>. Click it to
            activate your account, then sign in.
          </p>
          <button
            className="btn btn-outline"
            onClick={() => {
              setMode('signin');
              setStatus('idle');
            }}
          >
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page login-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div>
          <p className="eyebrow">
            {isReset ? 'Reset password' : isSignup ? 'Create account' : 'Welcome back'}
          </p>
          <h1 className="secondary-header">
            {isReset ? 'Forgot your password?' : isSignup ? 'Join the collectors' : 'Sign in'}
          </h1>
          {isReset && (
            <p className="auth-hint">
              Enter your email and we'll send you a reset link.
            </p>
          )}
        </div>

        {isSignup && (
          <div className="field">
            <label htmlFor="auth-name">Full name</label>
            <input
              id="auth-name"
              type="text"
              className="input"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        )}
        <div className="field">
          <label htmlFor="auth-email">Email</label>
          <input
            id="auth-email"
            type="email"
            className="input"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {!isReset && (
          <div className="field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              className="input"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              required
              minLength={isSignup ? 8 : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isSignup && (
              <button
                type="button"
                className="auth-switch-link auth-forgot"
                onClick={() => {
                  setMode('reset');
                  setErrorMessage(null);
                }}
              >
                Forgot password?
              </button>
            )}
          </div>
        )}

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
          {status === 'sending'
            ? 'Please wait…'
            : isReset
              ? 'Send Reset Link'
              : isSignup
                ? 'Create Account'
                : 'Sign In'}
        </button>

        <p className="auth-switch">
          {isReset
            ? 'Remembered it?'
            : isSignup
              ? 'Already have an account?'
              : 'New here?'}{' '}
          <button
            type="button"
            className="auth-switch-link"
            onClick={() => {
              setMode(isReset || isSignup ? 'signin' : 'signup');
              setErrorMessage(null);
            }}
          >
            {isReset || isSignup ? 'Sign in' : 'Create an account'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
