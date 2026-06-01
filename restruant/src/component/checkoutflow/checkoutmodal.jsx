import React, { useState, useEffect } from 'react';
import './checkout.css';
import { useCart } from '../cartcontext.jsx';

// ==========================================
// PREMIUM INLINE SVG ICONS (Vector Graphics)
// ==========================================
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const DeliveryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

const PickupIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const DineInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const CardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="2" y1="10" x2="22" y2="10"></line>
  </svg>
);

// ==========================================
// MAIN CHECKOUT MODAL COMPONENT
// ==========================================
export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cart = [], 
  getTotal = () => 0, 
  getItemCount = () => 0, 
  clearCart = () => {} 
}) {
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState('delivery');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    tip: 0,
    tipType: '15',
    customTip: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  });
  
  const [isCvvFocused, setIsCvvFocused] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cardType, setCardType] = useState('unknown');

  // Body Scroll Lock & Escape Key handler
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // ✅ SCROLL TO TOP WHEN STEP CHANGES
  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => {
      const modalContainer = document.querySelector('.checkout-modal-container');
      const modalMain = document.querySelector('.checkout-main-content');
      const modalSidebar = document.querySelector('.checkout-sidebar-summary');
      
      if (modalContainer) modalContainer.scrollTop = 0;
      if (modalMain) modalMain.scrollTop = 0;
      if (modalSidebar) modalSidebar.scrollTop = 0;
    }, 50);
  }, [step, isOpen]);

  // ✅ SCROLL TO TOP WHEN SUCCESS SCREEN APPEARS
  useEffect(() => {
    if (isComplete) {
      setTimeout(() => {
        const modalContainer = document.querySelector('.checkout-modal-container');
        if (modalContainer) modalContainer.scrollTop = 0;
      }, 50);
    }
  }, [isComplete]);

  // Card Brand Detection
  useEffect(() => {
    const number = formData.cardNumber.replace(/\D/g, '');
    if (number.startsWith('4')) {
      setCardType('visa');
    } else if (/^5[1-5]/.test(number)) {
      setCardType('mastercard');
    } else if (/^3[47]/.test(number)) {
      setCardType('amex');
    } else {
      setCardType('unknown');
    }
  }, [formData.cardNumber]);

  if (!isOpen) return null;

  // Formatting & Masking input fields
  const handleFormattedChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;

    if (name === 'phone') {
      const nums = value.replace(/\D/g, '').slice(0, 10);
      if (nums.length <= 3) formatted = nums;
      else if (nums.length <= 6) formatted = `(${nums.slice(0, 3)}) ${nums.slice(3)}`;
      else formatted = `(${nums.slice(0, 3)}) ${nums.slice(3, 6)}-${nums.slice(6)}`;
    } else if (name === 'cardNumber') {
      const nums = value.replace(/\D/g, '').slice(0, 16);
      formatted = nums.match(/.{1,4}/g)?.join(' ') || nums;
    } else if (name === 'cardExpiry') {
      const nums = value.replace(/\D/g, '').slice(0, 4);
      formatted = nums.length > 2 ? `${nums.slice(0, 2)}/${nums.slice(2)}` : nums;
    } else if (name === 'cardCvv') {
      formatted = value.replace(/\D/g, '').slice(0, 4);
    } else if (name === 'customTip') {
      formatted = value.replace(/[^\d.]/g, '');
    }

    setFormData((prev) => {
      const nextData = { ...prev, [name]: formatted };
      if (name === 'customTip') {
        nextData.tip = parseFloat(formatted) || 0;
      }
      return nextData;
    });
  };

  const handleTipSelect = (type, percentage = 0) => {
    let tipAmount = 0;
    const subtotal = getTotal();

    if (type === 'custom') {
      tipAmount = parseFloat(formData.customTip) || 0;
    } else if (type === 'none') {
      tipAmount = 0;
    } else {
      tipAmount = (subtotal * percentage) / 100;
    }

    setFormData((prev) => ({
      ...prev,
      tipType: type,
      tip: tipAmount
    }));
  };

const handleNextStep = (nextStep) => {
  console.log('handleNextStep called, going to step:', nextStep);
  
  // Validation for Step 1
  if (step === 1) {
    if (!formData.name.trim() || !formData.phone.trim()) {
      console.log('Validation failed: missing name or phone');
      return;
    }
    if (orderType === 'delivery' && (!formData.address.trim() || !formData.city.trim())) {
      console.log('Validation failed: missing delivery info');
      return;
    }
  }
  
  // For Step 2 to Step 3, no validation needed
  console.log('Setting step to:', nextStep);
  setStep(nextStep);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
     
      setIsProcessing(false);
      setIsComplete(true);
    }, 1800);
  };

  const handleCompleteClose = () => {
    clearCart();
    onClose();
    setTimeout(() => {
      setIsComplete(false);
      setStep(1);
      setOrderType('delivery');
      setCardType('unknown');
      setFormData({
        name: '',
        phone: '',
        address: '',
        city: '',
        tip: 0,
        tipType: '15',
        customTip: '',
        paymentMethod: 'card',
        cardNumber: '',
        cardName: '',
        cardExpiry: '',
        cardCvv: ''
      });
    }, 400);
  };

  const subtotal = getTotal();
  const deliveryFee = orderType === 'delivery' ? 5.99 : 0;
  const serviceCharge = 1.99;
  const tipAmount = formData.tip;
  const total = subtotal + deliveryFee + serviceCharge + tipAmount;

  return (
    <div className="checkout-overlay active" role="dialog" aria-modal="true" onClick={onClose}>
      <div className={`checkout-modal-container ${isComplete ? 'success-view' : ''}`} onClick={(e) => e.stopPropagation()}>
        
        <div className="decor-blur-1" aria-hidden="true"></div>
        <div className="decor-blur-2" aria-hidden="true"></div>

        <button className="checkout-close-btn" onClick={onClose} aria-label="Close Checkout">
          <CloseIcon />
        </button>

        {!isComplete ? (
          <>
            {/* LEFT SIDEBAR: Order Item Review Panel */}
            <aside className="checkout-sidebar-summary">
              <div className="sidebar-header">
                <h3>Order Review</h3>
                <span className="badge">{getItemCount()} items</span>
              </div>
              <div className="sidebar-scrollable-items">
                {cart.map((item) => (
                  <div key={item.id} className="sidebar-item-row">
                    <div className="item-details">
                      <span className="item-qty">{item.quantity}x</span>
                      <span className="item-name">{item.name}</span>
                    </div>
                    <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="sidebar-receipt-details">
                <div className="receipt-line">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="receipt-line">
                  <span>Hospitality Fee</span>
                  <span>${serviceCharge.toFixed(2)}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="receipt-line">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                {tipAmount > 0 && (
                  <div className="receipt-line highlight-tip">
                    <span>Gratuity</span>
                    <span>${tipAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="receipt-divider"></div>
                <div className="receipt-line grand-total">
                  <span>Total Amount</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </aside>

            {/* RIGHT PANEL: Form Steps Flow */}
            <main className="checkout-main-content">
              <header className="checkout-flow-header">
                <h2>Secure Checkout</h2>
                <nav className="checkout-progress-bar" aria-label="Progress Stepper">
                  <div className={`progress-indicator ${step >= 1 ? 'completed' : ''} ${step === 1 ? 'current' : ''}`}>
                    <div className="circle">1</div>
                    <span className="label">Details</span>
                  </div>
                  <div className={`progress-line ${step >= 2 ? 'completed' : ''}`}></div>
                  <div className={`progress-indicator ${step >= 2 ? 'completed' : ''} ${step === 2 ? 'current' : ''}`}>
                    <div className="circle">2</div>
                    <span className="label">Payment</span>
                  </div>
                  <div className={`progress-line ${step >= 3 ? 'completed' : ''}`}></div>
                  <div className={`progress-indicator ${step >= 3 ? 'completed' : ''} ${step === 3 ? 'current' : ''}`}>
                    <div className="circle">3</div>
                    <span className="label">Confirm</span>
                  </div>
                </nav>
              </header>

              <form onSubmit={handleSubmit} className="checkout-step-form">
                {/* STEP 1: Delivery Details */}
                {step === 1 && (
                  <section className="checkout-step-panel fade-in">
                    <div className="form-section-title">
                      <h3>1. Dining Preference</h3>
                      <p>Select your preference and provide drop-off details.</p>
                    </div>

                    <div className="order-type-tabs">
                      <div className="order-type-container">
                        <button 
                          type="button" 
                          className={`order-type-tab ${orderType === 'delivery' ? 'active' : ''}`}
                          onClick={() => setOrderType('delivery')}
                        >
                          <DeliveryIcon />
                          <span>Delivery</span>
                        </button>
                        <button 
                          type="button" 
                          className={`order-type-tab ${orderType === 'pickup' ? 'active' : ''}`}
                          onClick={() => setOrderType('pickup')}
                        >
                          <PickupIcon />
                          <span>Pickup</span>
                        </button>
                        <button 
                          type="button" 
                          className={`order-type-tab ${orderType === 'dinein' ? 'active' : ''}`}
                          onClick={() => setOrderType('dinein')}
                        >
                          <DineInIcon />
                          <span>Dine In</span>
                        </button>
                        <span className={`sliding-pill-indicator slide-${orderType}`} aria-hidden="true"></span>
                      </div>
                    </div>

                    <div className="form-grid">
                      <div className="form-input-container half-width">
                        <label htmlFor="chk-name">Your Full Name</label>
                        <div className="input-with-icon">
                          <span className="input-icon"><UserIcon /></span>
                          <input
                            id="chk-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleFormattedChange}
                            required
                            placeholder="Alex Morgan"
                          />
                        </div>
                      </div>

                      <div className="form-input-container half-width">
                        <label htmlFor="chk-phone">Contact Number</label>
                        <div className="input-with-icon">
                          <span className="input-icon"><PhoneIcon /></span>
                          <input
                            id="chk-phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormattedChange}
                            required
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>

                      {orderType === 'delivery' && (
                        <>
                          <div className="form-input-container full-width">
                            <label htmlFor="chk-address">Street Address</label>
                            <div className="input-with-icon">
                              <span className="input-icon"><MapIcon /></span>
                              <input
                                id="chk-address"
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleFormattedChange}
                                required
                                placeholder="123 Gastronomy Boulevard, Suite A"
                              />
                            </div>
                          </div>
                          <div className="form-input-container full-width">
                            <label htmlFor="chk-city">City & State</label>
                            <div className="input-with-icon">
                              <span className="input-icon"><MapIcon /></span>
                              <input
                                id="chk-city"
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleFormattedChange}
                                required
                                placeholder="New York, NY"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="checkout-step-actions">
                      <div></div>
                      <button 
                        type="button" 
                        className="btn-primary" 
                        disabled={!formData.name.trim() || !formData.phone.trim() || (orderType === 'delivery' && (!formData.address.trim() || !formData.city.trim()))}
                        onClick={() => handleNextStep(2)}
                      >
                        Continue to Payment <span className="arrow">→</span>
                      </button>
                    </div>
                  </section>
                )}

                {/* STEP 2: Payment & Culinary Tip */}
                {step === 2 && (
                  <section className="checkout-step-panel fade-in">
                    <div className="form-section-title">
                      <h3>2. Billing & Gratuity</h3>
                      <p>Support our culinary team and select your transaction method.</p>
                    </div>

                    <div className="premium-tip-container">
                      <span className="section-label">Support our kitchen staff with a tip</span>
                      <div className="tip-chips-grid">
                        {[
                          { pct: '10', label: '10%' },
                          { pct: '15', label: '15%' },
                          { pct: '18', label: '18%' },
                          { pct: '20', label: '20%' }
                        ].map(({ pct, label }) => (
                          <button
                            key={pct}
                            type="button"
                            className={`tip-chip-btn ${formData.tipType === pct ? 'active' : ''}`}
                            onClick={() => handleTipSelect(pct, parseInt(pct))}
                          >
                            <span className="percentage">{label}</span>
                            <span className="amount">${((subtotal * parseInt(pct)) / 100).toFixed(2)}</span>
                          </button>
                        ))}
                        <button
                          type="button"
                          className={`tip-chip-btn ${formData.tipType === 'custom' ? 'active' : ''}`}
                          onClick={() => handleTipSelect('custom')}
                        >
                          <span className="percentage">Custom</span>
                          <span className="amount">Flexible</span>
                        </button>
                        <button
                          type="button"
                          className={`tip-chip-btn ${formData.tipType === 'none' ? 'active' : ''}`}
                          onClick={() => handleTipSelect('none')}
                        >
                          <span className="percentage">No Tip</span>
                          <span className="amount">$0.00</span>
                        </button>
                      </div>

                      {formData.tipType === 'custom' && (
                        <div className="custom-tip-field fade-in">
                          <span className="currency-symbol">$</span>
                          <input
                            type="text"
                            name="customTip"
                            value={formData.customTip}
                            onChange={handleFormattedChange}
                            placeholder="0.00"
                            aria-label="Enter Custom Tip Amount"
                          />
                        </div>
                      )}
                    </div>

                    <div className="payment-options-row">
                      <span className="section-label">Select Payment Method</span>
                      <div className="payment-pills">
                        <button 
                          type="button"
                          className={`payment-pill ${formData.paymentMethod === 'card' ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                        >
                          <CardIcon /> <span>Credit Card</span>
                        </button>
                        <button 
                          type="button"
                          className={`payment-pill ${formData.paymentMethod === 'paypal' ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                        >
                          💸 <span>PayPal</span>
                        </button>
                        <button 
                          type="button"
                          className={`payment-pill ${formData.paymentMethod === 'cash' ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                        >
                          💵 <span>{orderType === 'delivery' ? 'Cash/Card on Delivery' : 'Pay at Counter'}</span>
                        </button>
                      </div>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="card-payment-form fade-in">
                        <div className={`live-credit-card ${isCvvFocused ? 'flipped' : ''} brand-${cardType}`} aria-hidden="true">
                          <div className="card-face card-front">
                            <div className="card-glow"></div>
                            <div className="card-header">
                              <div className="card-chip"></div>
                              <div className="card-brand-logo">
                                {cardType === 'visa' && <span className="logo-text visa">VISA</span>}
                                {cardType === 'mastercard' && <span className="logo-text mastercard">Mastercard</span>}
                                {cardType === 'amex' && <span className="logo-text amex">AMEX</span>}
                                {cardType === 'unknown' && <span className="logo-text logo-icon">💳</span>}
                              </div>
                            </div>
                            <div className="card-number-display">
                              {formData.cardNumber || '•••• •••• •••• ••••'}
                            </div>
                            <div className="card-footer-info">
                              <div className="card-holder">
                                <span className="label">Card Holder</span>
                                <span className="value">{formData.cardName.toUpperCase() || 'YOUR NAME'}</span>
                              </div>
                              <div className="card-expiry">
                                <span className="label">Expires</span>
                                <span className="value">{formData.cardExpiry || 'MM/YY'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="card-face card-back">
                            <div className="card-black-stripe"></div>
                            <div className="card-signature-area">
                              <div className="signature-lines"></div>
                              <div className="card-cvv-box">{formData.cardCvv || '•••'}</div>
                            </div>
                            <p className="card-disclaimer">Authorized signature required. Secure Dynamic tokenization enabled.</p>
                          </div>
                        </div>

                        <div className="card-input-grid">
                          <div className="form-input-container">
                            <label htmlFor="card-name">Cardholder Name</label>
                            <input
                              id="card-name"
                              type="text"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleFormattedChange}
                              required={formData.paymentMethod === 'card'}
                              placeholder="Alex Morgan"
                            />
                          </div>

                          <div className="form-input-container">
                            <label htmlFor="card-number">Card Number</label>
                            <input
                              id="card-number"
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleFormattedChange}
                              required={formData.paymentMethod === 'card'}
                              placeholder="4111 2222 3333 4444"
                            />
                          </div>

                          <div className="expiry-cvv-row">
                            <div className="form-input-container">
                              <label htmlFor="card-expiry">Expiration Date</label>
                              <input
                                id="card-expiry"
                                type="text"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleFormattedChange}
                                required={formData.paymentMethod === 'card'}
                                placeholder="MM/YY"
                              />
                            </div>

                            <div className="form-input-container">
                              <label htmlFor="card-cvv">CVV</label>
                              <input
                                id="card-cvv"
                                type="password"
                                name="cardCvv"
                                value={formData.cardCvv}
                                onChange={handleFormattedChange}
                                onFocus={() => setIsCvvFocused(true)}
                                onBlur={() => setIsCvvFocused(false)}
                                required={formData.paymentMethod === 'card'}
                                placeholder="•••"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="checkout-step-actions">
                      <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                        ← Back
                      </button>
                      <button 
                        type="button" 
                        className="btn-primary" 
                        disabled={formData.paymentMethod === 'card' && (!formData.cardName.trim() || !formData.cardNumber.trim() || !formData.cardExpiry.trim() || !formData.cardCvv.trim())}
                        onClick={() => handleNextStep(3)}
                      >
                        Review Order <span className="arrow">→</span>
                      </button>
                    </div>
                  </section>
                )}

                {/* STEP 3: Order Confirmation */}
                {step === 3 && (
                  <section className="checkout-step-panel fade-in">
                    <div className="form-section-title">
                      <h3>3. Confirm Your Order</h3>
                      <p>Verify all details are correct. All sales are final once authorized.</p>
                    </div>

                    <div className="checkout-final-review-grid">
                      <div className="review-card">
                        <div className="review-card-header">
                          <span className="icon"><UserIcon /></span>
                          <h4>Customer Details</h4>
                        </div>
                        <div className="review-card-body">
                          <p><strong>Name:</strong> {formData.name}</p>
                          <p><strong>Phone:</strong> {formData.phone}</p>
                          <p><strong>Method:</strong> <span className="capitalize">{orderType}</span></p>
                        </div>
                      </div>

                      <div className="review-card">
                        <div className="review-card-header">
                          <span className="icon"><MapIcon /></span>
                          <h4>Delivery Destination</h4>
                        </div>
                        <div className="review-card-body">
                          {orderType === 'delivery' ? (
                            <>
                              <p><strong>Street:</strong> {formData.address}</p>
                              <p><strong>City:</strong> {formData.city}</p>
                            </>
                          ) : (
                            <p><strong>Location:</strong> Counter Self-Pickup</p>
                          )}
                        </div>
                      </div>

                      <div className="review-card">
                        <div className="review-card-header">
                          <span className="icon"><CardIcon /></span>
                          <h4>Payment Profile</h4>
                        </div>
                        <div className="review-card-body">
                          <p><strong>Option:</strong> <span className="capitalize">{formData.paymentMethod === 'card' ? `Credit Card (${cardType.toUpperCase()})` : formData.paymentMethod}</span></p>
                          {formData.paymentMethod === 'card' && (
                            <p><strong>Card:</strong> •••• {formData.cardNumber.slice(-4) || '4444'}</p>
                          )}
                          <p><strong>Gratuity:</strong> ${tipAmount.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="checkout-assurance-banner">
                      <span className="shield-icon"><ShieldIcon /></span>
                      <p>This is a 256-bit SSL secured transaction. Payment tokens are securely managed.</p>
                    </div>

                    <div className="checkout-step-actions">
                      <button type="button" className="btn-secondary" onClick={() => setStep(2)}>
                        ← Edit Details
                      </button>
                      <button type="submit" className="btn-primary btn-submit-order" disabled={isProcessing}>
                        {isProcessing ? (
                          <span className="loading-spinner-container">
                            <span className="spinner"></span> Confirming...
                          </span>
                        ) : (
                          `Place Order • $${total.toFixed(2)}`
                        )}
                      </button>
                    </div>
                  </section>
                )}
              </form>
            </main>
          </>
        ) : (
          <section className="checkout-success-view-container fade-in">
            <div className="success-lottie-mock">
              <div className="sparkle sparkles-1"></div>
              <div className="sparkle sparkles-2"></div>
              <div className="checkmark-ring">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                  <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>
            </div>

            <h2>Order Confirmed!</h2>
            <p className="success-lead-text">Thank you for dining with us, <strong>{formData.name}</strong>!</p>
            <p className="success-sub-text">Your order has been received by our kitchen staff and is already being crafted with fresh ingredients.</p>

            <div className="order-preparation-tracker">
              <div className="tracker-steps">
                <div className="tracker-step completed">
                  <div className="node">✓</div>
                  <span className="label">Placed</span>
                </div>
                <div className="tracker-line completed"></div>
                <div className="tracker-step active-pulse">
                  <div className="node">🍳</div>
                  <span className="label">Kitchen</span>
                </div>
                <div className="tracker-line"></div>
                <div className="tracker-step">
                  <div className="node">🛵</div>
                  <span className="label">{orderType === 'delivery' ? 'On Way' : 'Ready'}</span>
                </div>
                <div className="tracker-line"></div>
                <div className="tracker-step">
                  <div className="node">🎉</div>
                  <span className="label">Enjoy</span>
                </div>
              </div>
            </div>

            <div className="success-delivery-card">
              <div className="row">
                <div className="col">
                  <span className="title">ESTIMATED ARRIVAL</span>
                  <span className="value">25 - 35 mins</span>
                </div>
                <div className="col border-left">
                  <span className="title">ORDER TYPE</span>
                  <span className="value capitalize">{orderType}</span>
                </div>
              </div>
            </div>

            <button className="btn-primary btn-success-done" onClick={handleCompleteClose}>
              Return to Menu
            </button>
          </section>
        )}
      </div>
    </div>
  );
}