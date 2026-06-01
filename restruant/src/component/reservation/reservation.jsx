import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../reservation/reservation.css';
// ==========================================
// SVG ICONS
// ==========================================
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="22" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ==========================================
// MAIN RESERVATION PAGE
// ==========================================
export default function ReservationPage() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [guests, setGuests] = useState(2);
  const [selectedZone, setSelectedZone] = useState('dining');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    specialRequests: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [animateStep, setAnimateStep] = useState(true);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Scroll to top when success screen appears
  useEffect(() => {
    if (isComplete) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isComplete]);

  // Generate next 7 days
  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        fullDate: date.toISOString().split('T')[0],
        isToday: i === 0
      });
    }
    return days;
  };

  const days = getNext7Days();
  const lunchSlots = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'];
  const dinnerSlots = ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'];

  const zones = [
    { id: 'patio', name: 'Outdoor Patio', icon: '🌿', desc: 'Under the stars' },
    { id: 'dining', name: 'Main Dining Room', icon: '🍷', desc: 'Vibrant atmosphere' },
    { id: 'chef', name: 'Chef\'s Counter', icon: '🍣', desc: 'Kitchen view' }
  ];

  const handleNextStep = () => {
    setAnimateStep(false);
    setTimeout(() => {
      setStep(step + 1);
      setAnimateStep(true);
    }, 200);
  };

  const handlePrevStep = () => {
    setAnimateStep(false);
    setTimeout(() => {
      setStep(step - 1);
      setAnimateStep(true);
    }, 200);
  };

  const handleGuestChange = (delta) => {
    const newGuests = guests + delta;
    if (newGuests >= 1 && newGuests <= 12) {
      setGuests(newGuests);
    }
  };

  const getTableSizeDesc = () => {
    if (guests <= 2) return 'Cozy Table for 2';
    if (guests <= 4) return 'Standard Table for 4';
    if (guests <= 6) return 'Booth for 6';
    return 'Large Table for 8+';
  };

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newBookingId = 'RES-' + Math.random().toString(36).substr(2, 8).toUpperCase();
      setBookingId(newBookingId);
      setIsProcessing(false);
      setIsComplete(true);
    }, 1500);
  };

  if (isComplete) {
    return (
      <div className="reservation-page">
        <div className="reservation-bg-glow-1"></div>
        <div className="reservation-bg-glow-2"></div>
        <div className="reservation-bg-glow-3"></div>
        
        <div className="reservation-container">
          <div className="reservation-success-container">
            <div className="success-animation">
              <div className="checkmark-circle">
                <CheckIcon />
              </div>
            </div>
            
            <h2 className="success-title">Reservation Confirmed!</h2>
            <p className="success-message">We can't wait to welcome you</p>

            <div className="booking-ticket">
              <div className="ticket-header">
                <span className="ticket-icon">🍽️</span>
                <span className="ticket-brand">Ember & Grain</span>
              </div>
              
              <div className="ticket-details">
                <div className="ticket-row">
                  <span className="label">Booking ID</span>
                  <span className="value">{bookingId}</span>
                </div>
                <div className="ticket-row">
                  <span className="label">Date & Time</span>
                  <span className="value">{selectedDate?.dayName}, {selectedDate?.month} {selectedDate?.dayNum} at {selectedTime}</span>
                </div>
                <div className="ticket-row">
                  <span className="label">Guests</span>
                  <span className="value">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                <div className="ticket-row">
                  <span className="label">Seating</span>
                  <span className="value">{zones.find(z => z.id === selectedZone)?.name}</span>
                </div>
                <div className="ticket-row">
                  <span className="label">Table</span>
                  <span className="value">{getTableSizeDesc()}</span>
                </div>
              </div>

              <div className="ticket-barcode">
                <div className="barcode"></div>
                <span className="barcode-text">{bookingId}</span>
              </div>

              <div className="ticket-footer">
                <p>📞 Need changes? Call us at (555) 123-4567</p>
                <p className="policy">Please arrive 10 minutes before your reservation time</p>
              </div>
            </div>

            <div className="success-actions">
              <Link to="/" className="btn-primary">Return to Home</Link>
              <Link to="/menu" className="btn-secondary">Browse Menu</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-page">
      <div className="reservation-bg-glow-1"></div>
      <div className="reservation-bg-glow-2"></div>
      <div className="reservation-bg-glow-3"></div>
      
      <div className="reservation-container">
        <div className="reservation-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span className="step-label">Date & Time</span>
          </div>
          <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span className="step-label">Your Details</span>
          </div>
          <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span className="step-label">Confirm</span>
          </div>
        </div>

        <div className={`reservation-content ${animateStep ? 'animate-in' : 'animate-out'}`}>
          {/* STEP 1: Date & Time */}
          {step === 1 && (
            <div className="reservation-step">
              <h1 className="step-title">When would you like to dine?</h1>
              <p className="step-subtitle">Select your preferred date, time, and party size</p>

              <div className="date-section">
                <div className="section-header">
                  <CalendarIcon />
                  <span>Select Date</span>
                </div>
                <div className="date-grid">
                  {days.map((day, idx) => (
                    <button
                      key={idx}
                      className={`date-card ${selectedDate?.fullDate === day.fullDate ? 'active' : ''} ${day.isToday ? 'today' : ''}`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <span className="day-name">{day.dayName}</span>
                      <span className="day-num">{day.dayNum}</span>
                      <span className="month">{day.month}</span>
                      {day.isToday && <span className="today-badge">Today</span>}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div className="time-section">
                  <div className="section-header">
                    <ClockIcon />
                    <span>Select Time</span>
                  </div>
                  
                  <div className="time-category">
                    <h4>🌅 Lunch</h4>
                    <div className="time-grid">
                      {lunchSlots.map(time => (
                        <button
                          key={time}
                          className={`time-slot ${selectedTime === time ? 'active' : ''}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="time-category">
                    <h4>🌙 Dinner</h4>
                    <div className="time-grid">
                      {dinnerSlots.map(time => (
                        <button
                          key={time}
                          className={`time-slot ${selectedTime === time ? 'active' : ''}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="guest-section">
                <div className="section-header">
                  <UsersIcon />
                  <span>Number of Guests</span>
                </div>
                <div className="guest-selector">
                  <button className="guest-btn" onClick={() => handleGuestChange(-1)} disabled={guests <= 1}>−</button>
                  <div className="guest-info">
                    <span className="guest-count">{guests}</span>
                    <span className="guest-desc">{getTableSizeDesc()}</span>
                  </div>
                  <button className="guest-btn" onClick={() => handleGuestChange(1)} disabled={guests >= 12}>+</button>
                </div>
              </div>

              <div className="step-actions">
                <button 
                  className="btn-primary btn-next" 
                  disabled={!selectedDate || !selectedTime}
                  onClick={handleNextStep}
                >
                  Continue to Details →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Your Details */}
          {step === 2 && (
            <div className="reservation-step">
              <h1 className="step-title">Tell us about yourself</h1>
              <p className="step-subtitle">We'll use this information to confirm your reservation</p>

              <div className="zone-section">
                <div className="section-header">
                  <span>🏠</span>
                  <span>Seating Preference</span>
                </div>
                <div className="zone-grid">
                  {zones.map(zone => (
                    <button
                      key={zone.id}
                      className={`zone-card ${selectedZone === zone.id ? 'active' : ''}`}
                      onClick={() => setSelectedZone(zone.id)}
                    >
                      <span className="zone-icon">{zone.icon}</span>
                      <div className="zone-info">
                        <span className="zone-name">{zone.name}</span>
                        <span className="zone-desc">{zone.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Special Requests (Optional)</label>
                  <textarea
                    placeholder="Dietary restrictions, allergies, special occasion..."
                    rows="3"
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  />
                </div>
              </div>

              <div className="booking-summary">
                <h4>Reservation Summary</h4>
                <div className="summary-items">
                  <div className="summary-item">
                    <span>📅 Date</span>
                    <span>{selectedDate?.dayName}, {selectedDate?.month} {selectedDate?.dayNum}</span>
                  </div>
                  <div className="summary-item">
                    <span>⏰ Time</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="summary-item">
                    <span>👥 Guests</span>
                    <span>{guests} {guests === 1 ? 'person' : 'people'}</span>
                  </div>
                  <div className="summary-item">
                    <span>🏠 Seating</span>
                    <span>{zones.find(z => z.id === selectedZone)?.name}</span>
                  </div>
                </div>
              </div>

              <div className="step-actions">
                <button className="btn-secondary" onClick={handlePrevStep}>
                  ← Back
                </button>
                <button 
                  className="btn-primary" 
                  disabled={!formData.name || !formData.phone}
                  onClick={handleNextStep}
                >
                  Review Order →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Confirm */}
          {step === 3 && (
            <div className="reservation-step">
              <h1 className="step-title">Confirm Your Reservation</h1>
              <p className="step-subtitle">Please verify all details before confirming</p>

              <div className="confirm-details">
                <div className="confirm-card">
                  <h4>📅 Date & Time</h4>
                  <p>{selectedDate?.dayName}, {selectedDate?.month} {selectedDate?.dayNum} at {selectedTime}</p>
                </div>
                <div className="confirm-card">
                  <h4>👥 Guests</h4>
                  <p>{guests} {guests === 1 ? 'Guest' : 'Guests'} • {getTableSizeDesc()}</p>
                </div>
                <div className="confirm-card">
                  <h4>🏠 Seating</h4>
                  <p>{zones.find(z => z.id === selectedZone)?.name} — {zones.find(z => z.id === selectedZone)?.desc}</p>
                </div>
                <div className="confirm-card">
                  <h4>📞 Contact</h4>
                  <p>{formData.name}<br/>{formData.phone}<br/>{formData.email || 'No email provided'}</p>
                </div>
                {formData.specialRequests && (
                  <div className="confirm-card">
                    <h4>📝 Special Requests</h4>
                    <p>{formData.specialRequests}</p>
                  </div>
                )}
              </div>

              <div className="step-actions">
                <button className="btn-secondary" onClick={handlePrevStep}>
                  ← Edit Details
                </button>
                <button 
                  className="btn-primary btn-confirm" 
                  onClick={handleConfirmBooking}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="spinner"></span>
                  ) : (
                    'Confirm Reservation →'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}