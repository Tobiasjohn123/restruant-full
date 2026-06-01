import React, { useEffect } from 'react';

export default function MenuDetails({ item, onClose, onOrder, onBook }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-image">
          <img src={item.image} alt={item.name} />
          <div className="modal-badge">{item.category}</div>
        </div>
        
        <div className="modal-body">
          <h2>{item.name}</h2>
          <div className="modal-meta">
            <span>🔥 {item.calories}</span>
            <span>⏱️ {item.prepTime}</span>
            {item.isSpicy && <span>🌶️ Spicy</span>}
          </div>
          
          <p className="modal-description">{item.fullDescription || item.description}</p>
          
          <div className="modal-ingredients">
            <h4>Ingredients</h4>
            <ul>
              {item.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>
          
          <div className="modal-footer">
            <span className="modal-price">${item.price}</span>
            <div className="modal-buttons">
              <button className="btn-order-large" onClick={() => onOrder(item)}>
                🍽️ Order Now
              </button>
              <button className="btn-book-large" onClick={() => onBook(item)}>
                📅 Book a Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}