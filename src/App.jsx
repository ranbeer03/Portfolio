import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollAnimations from './animations/ScrollAnimations';
import ErrorBoundary from './components/layout/ErrorBoundary';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';

/* Route-level code splitting: MUI (shop filters) and the image carousel
   (product page) stay out of the main bundle until visited. */
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const CheckoutSuccessPage = lazy(() => import('./pages/CheckoutSuccessPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollAnimations />
        <Navbar />
        <main className="main-content">
          <ErrorBoundary>
            <Suspense fallback={<div className="page" />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/legal/:slug" element={<LegalPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
