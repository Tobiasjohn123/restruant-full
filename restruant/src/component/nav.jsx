import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Navigation items array
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Reservation', path: '/reserve' },
    { name: 'Contact', path: '/contact' },
    { name: 'Cart 🛒', path: '/cart' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-bar">
          {/* Logo with animation */}
          <Link to="/" className="nav-logo animate-logo">
            Ember & Grain
          </Link>

          {/* Desktop Menu Links */}
          <ul className="nav-links nav-links-desktop">
            {navItems.map((item, idx) => (
              <li 
                key={item.name}
                className="nav-item animate-nav-item"
                style={{ animationDelay: `${idx * 0.05}s` }}
                onMouseEnter={() => setHoveredLink(item.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link to={item.path}>
                  <span className="nav-text">{item.name}</span>
                  {hoveredLink === item.name && <span className="nav-glow" />}
                </Link>
              </li>
            ))}
          </ul>

          {/* Reserve Button */}
          <Link to="/reserve" className="nav-cta animate-cta">
            <span className="text">Book a Table</span>
            <span className="cta-ripple" />
          </Link>

          {/* Hamburger Button */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <ul className="mobile-nav-links">
          {navItems.map((item, idx) => (
            <li 
              key={item.name}
              className="animate-mobile-item"
              style={{ animationDelay: `${idx * 0.07}s` }}
            >
              <Link 
                to={item.path} 
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link 
          to="/reserve" 
          className="mobile-nav-cta animate-mobile-cta" 
          onClick={() => setMenuOpen(false)}
        >
          Book a Table
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="mobile-overlay animate-fade-in" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}