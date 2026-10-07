import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import CartDrawer from './components/CartDrawer';
import WishlistPage from './components/WishlistPage';
import ProductDetailModal from './components/ProductDetailModal';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import ToastContainer from './components/ToastContainer';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  // 1. Theme State (Dark / Light)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('aura_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aura_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // 2. Routing State ('products', 'cart', 'wishlist')
  const [activeTab, setActiveTabState] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    if (['products', 'cart', 'wishlist'].includes(hash)) {
      return hash;
    }
    return 'products';
  });

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    window.location.hash = `#${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['products', 'cart', 'wishlist'].includes(hash)) {
        setActiveTabState(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 3. Search Keyword State
  const [searchTerm, setSearchTerm] = useState('');

  // 4. Cart State (Stores selected products & quantities)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_cart');
      return saved ? JSON.parse(saved) : [
        // Pre-populate with 1 sample item so user immediately sees a populated cart if they open it
        {
          id: 1,
          title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
          price: 349.99,
          originalPrice: 399.99,
          category: "electronics",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to sync cart to localStorage", e);
    }
  }, [cartItems]);

  // 5. Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to sync wishlist to localStorage", e);
    }
  }, [wishlist]);

  // 6. User Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('aura_user', JSON.stringify(user));
    addToast(`Welcome back, ${user.name}!`, 'sparkle');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('aura_user');
    addToast('You have been signed out.', 'info');
  };

  // 7. Modals & Drawers States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  // 8. Promo / Discount State
  const [appliedPromo, setAppliedPromo] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // 9. Toast Notification System
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart Operations (passed as props down to child components)
  const addToCart = (product, qtyToAdd = 1) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: qtyToAdd }];
    });
    addToast(`Added "${product.title.slice(0, 32)}..." to your bag!`, 'success');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cartItems.find(i => i.id === productId);
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    if (itemToRemove) {
      addToast(`Removed "${itemToRemove.title.slice(0, 24)}..." from cart`, 'info');
    }
  };

  const clearCart = () => {
    setCartItems([]);
    addToast('Your cart has been cleared.', 'info');
  };

  // Wishlist Operations
  const toggleWishlist = (product) => {
    setWishlist(prevList => {
      const exists = prevList.some(item => item.id === product.id);
      if (exists) {
        addToast(`Removed from Wishlist`, 'info');
        return prevList.filter(item => item.id !== product.id);
      } else {
        addToast(`Added "${product.title.slice(0, 24)}..." to Wishlist ❤️`, 'sparkle');
        return [...prevList, product];
      }
    });
  };

  // Promo handling
  const handleApplyPromo = (code, percent) => {
    setAppliedPromo(code);
    setDiscountPercent(percent);
    addToast(`Coupon "${code}" applied: ${percent}% OFF!`, 'sparkle');
  };

  const handleRemovePromo = () => {
    setAppliedPromo('');
    setDiscountPercent(0);
    addToast('Coupon removed.', 'info');
  };

  const handleCopyPromo = (code) => {
    navigator.clipboard?.writeText(code);
    handleApplyPromo(code, 20);
  };

  // Checkout flow
  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      addToast('Your cart is empty!', 'warning');
      return;
    }
    setIsCheckoutModalOpen(true);
  };

  const handleBuyNow = (product, quantity = 1) => {
    addToCart(product, quantity);
    setIsCheckoutModalOpen(true);
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
    setAppliedPromo('');
    setDiscountPercent(0);
    addToast('Order successfully confirmed! 🎉', 'sparkle');
  };

  // Total cart calculation
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const tax = (subtotal - discountAmount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping + tax);

  return (
    <div className="app-root">
      {/* 1. Navbar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        theme={theme}
        toggleTheme={toggleTheme}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenCartDrawer={() => setIsCartDrawerOpen(true)}
        onLogout={handleLogout}
      />

      {/* 2. Main Content Routing */}
      <main className="main-content">
        {/* Products Page (Catalog + Hero Banner) */}
        {activeTab === 'products' && (
          <>
            <HeroBanner
              onExploreClick={() => {
                const el = document.getElementById('products-catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onCopyPromo={handleCopyPromo}
              promoCode="SAVE20"
            />

            <ProductList
              searchTerm={searchTerm}
              addToCart={addToCart}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onQuickView={(prod) => setSelectedProductForModal(prod)}
            />
          </>
        )}

        {/* Dedicated Cart Page */}
        {activeTab === 'cart' && (
          <CartPage
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            onNavigateHome={() => setActiveTab('products')}
            onProceedToCheckout={handleProceedToCheckout}
            discountPercent={discountPercent}
            appliedPromo={appliedPromo}
            onApplyPromo={handleApplyPromo}
            onRemovePromo={handleRemovePromo}
          />
        )}

        {/* Dedicated Wishlist Page */}
        {activeTab === 'wishlist' && (
          <WishlistPage
            wishlist={wishlist}
            addToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            onQuickView={(prod) => setSelectedProductForModal(prod)}
            onNavigateHome={() => setActiveTab('products')}
          />
        )}
      </main>

      {/* 3. Footer */}
      <Footer 
        onCategorySelect={(_cat) => {
          setActiveTab('products');
        }}
        onNewsletterSubscribe={() => {
          addToast("Thank you for subscribing to AURA Luxe newsletter!", "sparkle");
        }}
      />

      {/* 4. Quick Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onNavigateToCartPage={() => setActiveTab('cart')}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* 5. Product Quick View Modal */}
      {selectedProductForModal && (
        <ProductDetailModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          addToCart={addToCart}
          isWishlisted={wishlist.some(item => item.id === selectedProductForModal.id)}
          onToggleWishlist={toggleWishlist}
          onBuyNow={handleBuyNow}
        />
      )}

      {/* 6. Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 7. Checkout & Confirmation Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cartItems={cartItems}
        grandTotal={grandTotal}
        currentUser={currentUser}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* 8. Floating Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
