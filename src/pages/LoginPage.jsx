import { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import usePageTitle from '../hooks/usePageTitle';
import './LoginPage.css';

const LoginPage = () => {
  usePageTitle('Sign in — Ranbeer Chaudhary');
  const { user, signIn, signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const [mode, setMode] = useState('signin'); // signin | signup
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | confirm-email
  const [errorMessage, setErrorMessage] = useState(null);

  if (user) return <Navigate to="/account" replace />;

  const isSignup = mode === 'signup';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    setStatus('sending');

    try {
      if (isSignup) {
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
          <p className="eyebrow">{isSignup ? 'Create account' : 'Welcome back'}</p>
          <h1 className="secondary-header">
            {isSignup ? 'Join the collectors' : 'Sign in'}
          </h1>
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
        <div className="field">
          <label htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            type="password"
            className="input"
            autoComplete={isSignup ? 'new-password' : 'current-password'}
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {status === 'sending'
            ? 'Please wait…'
            : isSignup
              ? 'Create Account'
              : 'Sign In'}
        </button>

        <p className="auth-switch">
          {isSignup ? 'Already have an account?' : 'New here?'}{' '}
          <button
            type="button"
            className="auth-switch-link"
            onClick={() => {
              setMode(isSignup ? 'signin' : 'signup');
              setErrorMessage(null);
            }}
          >
            {isSignup ? 'Sign in' : 'Create an account'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
