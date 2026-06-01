import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './cartcontext.jsx';
import { useLoading } from './loadingContent.jsx';
import CheckoutModal from './checkoutflow/checkoutmodal.jsx';
import './cart/cart.css';
export default function Cart() {
  const { 
    cart, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    getTotal,
    getItemCount,
    clearCart
  } = useCart();
  
  const [cartLoading, setCartLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const { showLoading, hideLoading } = useLoading();

  // Simulate cart loading
  useEffect(() => {
    showLoading();
    setTimeout(() => {
      setCartLoading(false);
      hideLoading();
    }, 1000);
  }, []);

  // Handle checkout - Open modal
  const handleCheckout = () => {
    setShowCheckout(true);
   
  };

  // Close modal
  const closeCheckout = () => {
    setShowCheckout(false);
  };

  // Show loading skeleton
  if (cartLoading) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="skeleton-cart-title"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-cart-item">
              <div className="skeleton-cart-img"></div>
              <div className="skeleton-cart-details">
                <div className="skeleton-cart-title-line"></div>
                <div className="skeleton-cart-subtitle"></div>
              </div>
              <div className="skeleton-cart-price"></div>
            </div>
          ))}
          <div className="skeleton-cart-summary"></div>
        </div>
      </div>
    );
  }

  // Empty Cart View
  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some delicious dishes to get started!</p>
        <Link to="/" className="hero-cta">Browse Menu</Link>
      </div>
    );
  }

  return (
    <>
      <div className="cart-page">
        <div className="cart-container">
          <h1 className="cart-title">Your Order</h1>
          
          {/* Cart Items List */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <span>🔥 {item.calories}</span>
                </div>
                
                {/* Quantity Controls */}
                <div className="cart-item-quantity">
                  <button 
                    className="qty-btn qty-decrease"
                    onClick={() => decreaseQuantity(item.id, item.name)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="qty-number">{item.quantity}</span>
                  <button 
                    className="qty-btn qty-increase"
                    onClick={() => increaseQuantity(item.id, item.name)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                
                {/* Price and Remove Button */}
                <div className="cart-item-price">
                  <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
                  <button 
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item.id, item.name)}
                    aria-label="Remove item"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="cart-total">
              <h3>Total Items: {getItemCount()}</h3>
              <h2>Total: ${getTotal().toFixed(2)}</h2>
            </div>
            
            <div className="cart-actions">
              <Link to="/menu" className="btn-continue">
                ← Continue Shopping
              </Link>
              <button 
                className="btn-checkout"
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? (
                  <>
                    <span className="checkout-spinner"></span>
                    Processing...
                  </>
                ) : (
                  'Proceed to Checkout →'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={showCheckout}
        onClose={closeCheckout}
        cart={cart}
        getTotal={getTotal}
        getItemCount={getItemCount}
        clearCart={clearCart}
      />
    </>
  );
}