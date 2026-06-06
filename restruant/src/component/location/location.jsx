import React, { useMemo } from 'react';
import './location.css';

// ── Icons ────────────────────────────────────────────────────────────────────

const IconPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
  </svg>
);

const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const IconCar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="1" y="3" width="15" height="13" rx="2"/>
    <path d="M16 8h4l3 4v5h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

// ── Hours data ────────────────────────────────────────────────────────────────

const HOURS = [
  { day: 'Monday',    lunch: null,              dinner: '5:00 PM – 10:00 PM' },
  { day: 'Tuesday',   lunch: null,              dinner: '5:00 PM – 10:00 PM' },
  { day: 'Wednesday', lunch: null,              dinner: '5:00 PM – 10:30 PM' },
  { day: 'Thursday',  lunch: null,              dinner: '5:00 PM – 10:30 PM' },
  { day: 'Friday',    lunch: '12:00 – 2:30 PM', dinner: '5:00 PM – 11:00 PM' },
  { day: 'Saturday',  lunch: '11:30 – 3:00 PM', dinner: '5:00 PM – 11:00 PM' },
  { day: 'Sunday',    lunch: '11:00 – 3:30 PM', dinner: '5:00 PM – 9:00 PM'  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getTodayName() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' });
}

function isOpenNow(dayHours) {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;
  // Simple check: open if current time falls in lunch or dinner window
  const parsedRanges = [dayHours.lunch, dayHours.dinner]
    .filter(Boolean)
    .map(range => {
      const [start, end] = range.split('–').map(t => t.trim());
      const toH = str => {
        const [time, period] = str.split(' ');
        let [h, m] = time.split(':').map(Number);
        if (period === 'PM' && h !== 12) h += 12;
        if (period === 'AM' && h === 12) h = 0;
        return h + m / 60;
      };
      return { start: toH(start), end: toH(end) };
    });
  return parsedRanges.some(r => hour >= r.start && hour <= r.end);
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function LocationHours() {
  const today = useMemo(() => getTodayName(), []);
  const todayHours = HOURS.find(h => h.day === today);
  const openNow = todayHours ? isOpenNow(todayHours) : false;

  return (
    <section className="loc-section" id="location">

      {/* Ambient */}
      <div className="loc-orb loc-orb--1" />
      <div className="loc-orb loc-orb--2" />
      <div className="loc-grain" />

      <div className="loc-container">

        {/* ── Header ── */}
        <header className="loc-header">
          <div className="loc-eyebrow">
            <span className="loc-eyebrow-rule" />
            <span className="loc-label">Find Us</span>
            <span className="loc-eyebrow-rule loc-eyebrow-rule--right" />
          </div>
          <h2 className="loc-title">
            Come Find Us
            <em>We're Ready for You</em>
          </h2>
          <p className="loc-lead">
            Nestled in the heart of the city — where every visit feels like coming home.
          </p>
        </header>

        {/* ── Main Grid: Map + Hours ── */}
        <div className="loc-grid">

          {/* Map card */}
          <div className="loc-card loc-map-card">
            <div className="loc-corner loc-corner--tl" />
            <div className="loc-corner loc-corner--tr" />
            <div className="loc-corner loc-corner--bl" />
            <div className="loc-corner loc-corner--br" />

            <div className="loc-map-embed">
              {/*
                Replace the src below with your actual Google Maps embed URL.
                Go to Google Maps → Share → Embed a map → copy the src value.
              */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086510413634!2d-122.41941548468158!3d37.77492957975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4233%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1614870776590!5m2!1sen!2sus"
                title="Ember & Grain location"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="loc-map-info">
              <h3 className="loc-map-name">Ember & Grain</h3>
              <p className="loc-map-address">
                742 Evergreen Terrace, Suite 1<br />
                San Francisco, CA 94103
              </p>
              <div className="loc-map-actions">
                <a
                  href="https://maps.google.com/?q=742+Evergreen+Terrace+San+Francisco+CA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="loc-btn loc-btn--primary"
                >
                  <IconPin />
                  Get Directions
                </a>
                <a href="/reserve" className="loc-btn loc-btn--ghost">
                  Reserve a Table
                </a>
              </div>
            </div>
          </div>

          {/* Hours card */}
          <div className="loc-card loc-hours-card">
            <div className="loc-corner loc-corner--tl" />
            <div className="loc-corner loc-corner--br" />

            <span className="loc-card-label">Hours of Service</span>
            <h3 className="loc-card-title">When We're<br />Open for You</h3>

            {/* Live status */}
            <div
              className={`loc-status ${openNow ? 'loc-status--open' : 'loc-status--closed'}`}
              style={{ marginBottom: '1.4rem' }}
            >
              <span className="loc-status-dot" />
              {openNow ? 'Open now — Kitchen is live' : 'Currently closed'}
            </div>

            <div className="loc-hours-list">
              {HOURS.map((h) => {
                const isToday = h.day === today;
                const isClosed = !h.lunch && !h.dinner;
                const timeStr = isClosed
                  ? 'Closed'
                  : [h.lunch, h.dinner].filter(Boolean).join('  ·  ');

                return (
                  <div
                    key={h.day}
                    className={`loc-hours-row ${isToday ? 'is-today' : ''} ${isClosed ? 'is-closed' : ''}`}
                  >
                    <span className="loc-hours-day">
                      {h.day}
                      {isToday && <span className="loc-today-badge">Today</span>}
                    </span>
                    <span className="loc-hours-time">{timeStr}</span>
                  </div>
                );
              })}
            </div>

            <p className="loc-hours-note">
              Last seating 45 minutes before closing. Kitchen closes on time.
              Holiday hours may vary — call ahead to confirm.
            </p>
          </div>
        </div>

        {/* ── Bottom Info Row ── */}
        <div className="loc-row">

          {/* Phone */}
          <div className="loc-card loc-info-card">
            <div className="loc-corner loc-corner--tl" />
            <div className="loc-corner loc-corner--br" />
            <div className="loc-info-icon"><IconPhone /></div>
            <h4 className="loc-info-title">Reservations</h4>
            <p className="loc-info-body">
              Prefer to call? Our team is available Monday to Sunday,
              10:00 AM – 9:00 PM to assist with bookings and enquiries.
            </p>
            <a href="tel:+15551234567" className="loc-info-link">
              (555) 123-4567 <IconArrow />
            </a>
          </div>

          {/* Email */}
          <div className="loc-card loc-info-card">
            <div className="loc-corner loc-corner--tl" />
            <div className="loc-corner loc-corner--br" />
            <div className="loc-info-icon"><IconMail /></div>
            <h4 className="loc-info-title">Private Events</h4>
            <p className="loc-info-body">
              Planning something special? Reach out to our events team
              for private dining, chef's table experiences, and corporate bookings.
            </p>
            <a href="mailto:events@emberandgrain.com" className="loc-info-link">
              events@emberandgrain.com <IconArrow />
            </a>
          </div>

          {/* Parking */}
          <div className="loc-card loc-info-card">
            <div className="loc-corner loc-corner--tl" />
            <div className="loc-corner loc-corner--br" />
            <div className="loc-info-icon"><IconCar /></div>
            <h4 className="loc-info-title">Getting Here</h4>
            <p className="loc-info-body">
              Valet parking available Thursday to Sunday from 5:00 PM.
              Street parking and a public garage are one block north on Maple Ave.
            </p>
            <a
              href="https://maps.google.com/?q=742+Evergreen+Terrace+San+Francisco+CA"
              target="_blank"
              rel="noopener noreferrer"
              className="loc-info-link"
            >
              View parking map <IconArrow />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}