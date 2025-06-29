import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import LoadingPage from './components/LoadingPage';
import QuotePage from './components/QuotePage';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import PerformanceOptimizer from './components/PerformanceOptimizer';
import PWAInstaller from './components/PWAInstaller';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

type AppState = 'loading' | 'quote' | 'landing' | 'app';

function App() {
  const [appState, setAppState] = useState<AppState>('loading');

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisitedStyleHub');
    
    if (hasVisited) {
      // Skip landing page for returning users, but still show quote
      setAppState('loading');
    }
  }, []);

  const handleLoadingComplete = () => {
    setAppState('quote');
  };

  const handleQuoteComplete = () => {
    const hasVisited = localStorage.getItem('hasVisitedStyleHub');
    
    if (hasVisited) {
      setAppState('app');
    } else {
      setAppState('landing');
    }
  };

  const handleEnterApp = () => {
    // Mark user as visited
    localStorage.setItem('hasVisitedStyleHub', 'true');
    setAppState('app');
  };

  if (appState === 'loading') {
    return <LoadingPage onLoadingComplete={handleLoadingComplete} />;
  }

  if (appState === 'quote') {
    return <QuotePage onComplete={handleQuoteComplete} duration={4000} />;
  }

  if (appState === 'landing') {
    return <LandingPage onEnterApp={handleEnterApp} />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <PerformanceOptimizer />
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
              <Footer />
              <BackToTop />
              <PWAInstaller />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;