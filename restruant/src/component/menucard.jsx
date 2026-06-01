import React, { useRef, useEffect, useState } from 'react';
import { useCart } from './cartcontext.jsx';

export default function MenuCard({ item, onViewDetails, onBook, index = 0, animationReady = false }) {
  const { addToCart } = useCart();
  const cardRef = useRef(null);
  const innerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Scroll reveal animation
  useEffect(() => {
    if (!animationReady) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('card-visible');
            }, index * 50);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [animationReady, index]);

  // Handle mouse move (desktop) - REDUCED TILT
  const handleMouseMove = (e) => {
    const card = innerRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Reduced from 10 to 4 degrees (more subtle)
    const rotateY = ((x - centerX) / centerX) * -4;
    const rotateX = ((y - centerY) / centerY) * 4;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  // Handle touch move (mobile) - REDUCED TILT
  const handleTouchMove = (e) => {
    e.preventDefault();
    const card = innerRef.current;
    if (!card || !e.touches[0]) return;
    
    const rect = card.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Reduced from 10 to 4 degrees
    const rotateY = ((x - centerX) / centerX) * -4;
    const rotateX = ((y - centerY) / centerY) * 4;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleTouchEnd = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="menu-card" ref={cardRef}>
      <div 
        className="menu-card-inner" 
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        <div className="menu-card-image">
          <img src={item.image} alt={item.name} />
          {item.isPopular && <span className="popular-badge">🔥 Popular</span>}
          <div className="category-badge">{item.category}</div>
        </div>
        
        <div className="menu-card-content">
          <h3>{item.name}</h3>
          <p className="description">{item.description}</p>
          
          <div className="card-meta">
            <span>🔥 {item.calories}</span>
            <span>⏱️ {item.prepTime}</span>
            {item.isSpicy && <span>🌶️ Spicy</span>}
          </div>
          
          <div className="card-footer">
            <span className="price">${item.price}</span>
            <div className="card-buttons">
              <button 
                className="btn-details"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(item);
                }}
              >
                View Details
              </button>
              <button 
                className="btn-order"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
              >
                Order
              </button>
            </div>
          </div>
          
          <button 
            className="btn-book"
            onClick={(e) => {
              e.stopPropagation();
              onBook(item);
            }}
          >
            📅 Book a Table
          </button>
        </div>
      </div>
    </div>
  );
}