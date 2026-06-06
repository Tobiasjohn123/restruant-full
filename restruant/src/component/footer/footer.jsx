import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

// ── Icons ─────────────────────────────────────────────────────────────────────

const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const IconFacebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const IconTwitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5.4 4.4 9 4.4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const IconTikTok = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.01a8.16 8.16 0 0 0 4.77 1.52V7.1a4.85 4.85 0 0 1-1-.41z"/>
  </svg>
);

const IconPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
  </svg>
);

const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

// ── Logo SVG mark ─────────────────────────────────────────────────────────────

const LogoMark = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    {/* Outer circle */}
    <circle cx="26" cy="26" r="24" stroke="rgba(200,169,106,0.3)" strokeWidth="1"/>
    {/* Flame shape */}
    <path
      d="M26 10 C26 10 32 18 32 24 C32 27.3 30.2 30.2 27.5 31.8 C28.5 29.5 28 27 26 25.5 C24 27 23.5 29.5 24.5 31.8 C21.8 30.2 20 27.3 20 24 C20 18 26 10 26 10Z"
      fill="url(#flameGrad)"
      opacity="0.9"
    />
    {/* Inner ember dot */}
    <circle cx="26" cy="30" r="2.5" fill="rgba(200,169,106,0.6)"/>
    {/* Grain line */}
    <path d="M18 38 Q22 36 26 38 Q30 40 34 38" stroke="rgba(200,169,106,0.5)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <defs>
      <linearGradient id="flameGrad" x1="26" y1="10" x2="26" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E8D5A3"/>
        <stop offset="60%" stopColor="#C8A96A"/>
        <stop offset="100%" stopColor="#B85C2C"/>
      </linearGradient>
    </defs>
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Our Story',     to: '/about'        },
  { label: 'The Menu',      to: '/menu'         },
  { label: 'Reservations',  to: '/reserve'      },
  { label: 'Private Events',to: '/events'       },
  { label: 'Testimonials',  to: '/testimonials' },
  { label: 'Admin',         to: '/admin'        },
];

const EXPERIENCE_LINKS = [
  { label: "Chef's Table",      to: '/about#chef'    },
  { label: 'Wine & Pairings',   to: '/menu#pairings' },
  { label: 'Seasonal Menu',     to: '/menu#seasonal' },
  { label: 'Live Fire Kitchen', to: '/about#kitchen' },
  { label: 'Gift Cards',        to: '/gifts'         },
];

const HOURS_PREVIEW = [
  { day: 'Mon – Thu', time: '5:00 – 10:30 PM' },
  { day: 'Fri – Sat', time: '12:00 – 11:00 PM' },
  { day: 'Sunday',    time: '11:00 – 9:00 PM'  },
];

const MARQUEE_ITEMS = [
  'Est. 2018',
  'James Beard Award 2023',
  'Where Fire Meets Artistry',
  'San Francisco, CA',
  'Farm to Table',
  'Live Fire Kitchen',
  'Michelin Recognised',
  'Private Dining Available',
];

const SOCIALS = [
  { icon: <IconInstagram />, href: '#', label: 'Instagram' },
  { icon: <IconFacebook  />, href: '#', label: 'Facebook'  },
  { icon: <IconTwitter   />, href: '#', label: 'Twitter'   },
  { icon: <IconTikTok    />, href: '#', label: 'TikTok'    },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const todayName = useMemo(() => new Date().toLocaleDateString('en-US', { weekday: 'long' }), []);

  const todaySlot = HOURS_PREVIEW.find(h => {
    if (todayName === 'Sunday') return h.day === 'Sunday';
    if (['Friday', 'Saturday'].includes(todayName)) return h.day === 'Fri – Sat';
    return h.day === 'Mon – Thu';
  });

  // Double marquee items for seamless loop
  const marqueeDouble = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <footer className="ft-footer" id="footer">

      {/* ── Animated background ── */}
      <div className="ft-bg-canvas">
        <div className="ft-orb ft-orb--1" />
        <div className="ft-orb ft-orb--2" />
        <div className="ft-orb ft-orb--3" />
        <div className="ft-grain" />
      </div>

      {/* ── CTA Band ── */}
      <div className="ft-cta-band">
        <div className="ft-cta-eyebrow">
          <span className="ft-cta-rule ft-cta-rule--left" />
          <span className="ft-cta-label">Your Table Awaits</span>
          <span className="ft-cta-rule ft-cta-rule--right" />
        </div>
        <h2 className="ft-cta-title">
          An Evening Worth <em>Remembering</em>
        </h2>
        <p className="ft-cta-sub">
          Reserve your table and let us take care of the rest.
        </p>
        <div className="ft-cta-actions">
          <Link to="/reserve" className="ft-btn ft-btn--primary">
            Reserve a Table
          </Link>
          <Link to="/menu" className="ft-btn ft-btn--ghost">
            Explore the Menu
          </Link>
        </div>
      </div>

      {/* ── Main Body ── */}
      <div className="ft-body">
        <div className="ft-body-inner">

          {/* Brand column */}
          <div className="ft-brand">
            <Link to="/" className="ft-logo-wrap">
              <div className="ft-logo-mark">
                <LogoMark />
                <div className="ft-logo-ring" />
              </div>
              <div className="ft-logo-text-wrap">
                <span className="ft-logo-name">Ember & Grain</span>
                <span className="ft-logo-tagline">Fine Dining · San Francisco</span>
              </div>
            </Link>

            <p className="ft-brand-desc">
              A sanctuary where fire, smoke, and seasonal craft converge.
              Every dish is a conversation between technique and soul —
              crafted to be remembered long after the last bite.
            </p>

            <div className="ft-socials">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className="ft-social-btn"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="ft-est-badge">
              <span className="ft-est-line" />
              <span className="ft-est-text">Est. 2018 · San Francisco</span>
              <span className="ft-est-line" />
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <p className="ft-col-label">Navigate</p>
            <ul className="ft-nav-list">
              {NAV_LINKS.map(l => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience column */}
          <div>
            <p className="ft-col-label">Experiences</p>
            <ul className="ft-nav-list">
              {EXPERIENCE_LINKS.map(l => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <p className="ft-col-label">Find Us</p>
            <div className="ft-contact-list">
              <div className="ft-contact-item">
                <div className="ft-contact-icon"><IconPin /></div>
                <div className="ft-contact-text">
                  <span>742 Evergreen Terrace, Suite 1</span>
                  <span>San Francisco, CA 94103</span>
                </div>
              </div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon"><IconPhone /></div>
                <div className="ft-contact-text">
                  <span><a href="tel:+15551234567">(555) 123-4567</a></span>
                  <span style={{ fontSize: '0.72rem', opacity: 0.6 }}>Mon–Sun · 10 AM – 9 PM</span>
                </div>
              </div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon"><IconMail /></div>
                <div className="ft-contact-text">
                  <span><a href="mailto:hello@emberandgrain.com">hello@emberandgrain.com</a></span>
                  <span><a href="mailto:events@emberandgrain.com">events@emberandgrain.com</a></span>
                </div>
              </div>
            </div>

            {/* Hours mini-preview */}
            <div className="ft-hours-preview">
              <p className="ft-hours-preview-title">Hours</p>
              {HOURS_PREVIEW.map(h => (
                <div
                  key={h.day}
                  className={`ft-hours-preview-row ${h === todaySlot ? 'is-today' : ''}`}
                >
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Marquee band ── */}
      <div className="ft-marquee-band" aria-hidden="true">
        <div className="ft-marquee-track">
          {marqueeDouble.map((item, i) => (
            <span className="ft-marquee-item" key={i}>
              {item}
              <span className="ft-marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <div className="ft-bottom-inner">
          <p className="ft-copyright">
            © {year} <span>Ember & Grain</span>. All rights reserved.
          </p>
          <div className="ft-legal-links">
            <a href="/privacy">Privacy Policy</a>
            <span className="ft-legal-sep" />
            <a href="/terms">Terms of Use</a>
            <span className="ft-legal-sep" />
            <a href="/accessibility">Accessibility</a>
          </div>
          <div className="ft-signature">
            Crafted with <span className="ft-flame">🔥</span> in San Francisco
          </div>
        </div>
      </div>

    </footer>
  );
}