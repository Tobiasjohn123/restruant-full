import React, { useState, useEffect } from 'react';
import MenuCard from './menucard';
import { menuData, categories } from './data/foods';
import { useCart } from './cartcontext.jsx';
import { useLoading } from './loadingContent.jsx';
import LoadingSkeleton from './LoadingSkeleton';

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [animationReady, setAnimationReady] = useState(false);
  const { addToCart } = useCart();
  const { showLoading, hideLoading } = useLoading();

  // Load menu data
  useEffect(() => {
    showLoading();
    setTimeout(() => {
      setFilteredItems(menuData);
      setLoading(false);
      hideLoading();
      // Enable animations after loading is complete
      setTimeout(() => {
        setAnimationReady(true);
      }, 100);
    }, 1500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(menuData);
    } else {
      setFilteredItems(menuData.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory]);

  const handleViewDetails = (item) => {
    setModalLoading(true);
    setSelectedItem(item);
    setTimeout(() => {
      setModalLoading(false);
    }, 500);
  };

  const handleOrderFromModal = (item) => {
    addToCart(item);
    setSelectedItem(null);
  };

  const handleBookFromModal = (item) => {
    alert(`📅 Booking table for ${item.name}. We'll contact you shortly!`);
    setSelectedItem(null);
  };

  const handleOrder = (item) => {
    addToCart(item);
  };

  const handleBook = (item) => {
    alert(`📅 Booking table for ${item.name}. We'll contact you shortly!`);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalLoading(false);
  };

  // Show loading skeleton (no animations during loading)
  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <section className="menu-section" id="menu">
      <div 
        className="menu-3d-bg"
        style={{
          transform: `translateY(${scrollY * 0.1}px) scale(${1 + scrollY * 0.0005})`,
          opacity: 1 - scrollY * 0.002
        }}
      />
      
      <div className="menu-container">
        <div className="menu-header">
          <span className="menu-label">Our Culinary Art</span>
          <h2 className="menu-title">Discover Our Menu</h2>
          <p className="menu-subtitle">
            Crafted with passion, served with love. Each dish tells a story.
          </p>
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredItems.map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              index={index}
              onViewDetails={handleViewDetails}
              onOrder={handleOrder}
              onBook={handleBook}
              animationReady={animationReady}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="glass-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            
            {modalLoading ? (
              <div className="modal-loading">
                <div className="modal-skeleton-image"></div>
                <div className="modal-skeleton-content">
                  <div className="skeleton-line large"></div>
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line short"></div>
                  <div className="skeleton-button-row"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="modal-image">
                  <img src={selectedItem.image} alt={selectedItem.name} />
                  <div className="modal-badge">{selectedItem.category}</div>
                </div>
                
                <div className="modal-body">
                  <h2>{selectedItem.name}</h2>
                  <div className="modal-meta">
                    <span>🔥 {selectedItem.calories}</span>
                    <span>⏱️ {selectedItem.prepTime}</span>
                    {selectedItem.isSpicy && <span>🌶️ Spicy</span>}
                  </div>
                  
                  <p className="modal-description">{selectedItem.fullDescription || selectedItem.description}</p>
                  
                  <div className="modal-ingredients">
                    <h4>Ingredients</h4>
                    <ul>
                      {selectedItem.ingredients?.map((ing, idx) => (
                        <li key={idx}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="modal-footer">
                    <span className="modal-price">${selectedItem.price}</span>
                    <div className="modal-buttons">
                      <button 
                        className="btn-order-large" 
                        onClick={() => handleOrderFromModal(selectedItem)}
                      >
                        🍽️ Order Now
                      </button>
                      <button 
                        className="btn-book-large" 
                        onClick={() => handleBookFromModal(selectedItem)}
                      >
                        📅 Book a Table
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}