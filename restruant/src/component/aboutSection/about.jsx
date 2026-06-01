import React, { useEffect, useRef, useState } from 'react';
import './About.css';

// Import your images (update paths as needed)
// import chefImage from '../assets/chef.jpg';
// import restaurantImage from '../assets/restaurant.jpg';
// import ingredient1 from '../assets/ingredient1.jpg';
// import ingredient2 from '../assets/ingredient2.jpg';
// import ingredient3 from '../assets/ingredient3.jpg';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="about-section" ref={sectionRef} id="about">
      <div className="about-container">
        
        {/* Story Section */}
        <div className={`about-story ${isVisible ? 'animate' : ''}`}>
          <div className="about-story-content">
            <span className="about-label">Our Story</span>
            <h2 className="about-title">Where Passion Meets the Plate</h2>
            <p className="about-description">
              Ember & Grain was born from a simple idea: create a space where exceptional food, 
              warm hospitality, and memorable experiences come together. What started as a 
              small pop-up kitchen has grown into a beloved dining destination, but our 
              commitment to quality and authenticity has never wavered.
            </p>
            <p className="about-description">
              Every dish tells a story of craftsmanship, from our signature smoked meats 
              to our handcrafted cocktails. We believe in using locally-sourced, seasonal 
              ingredients that honor both tradition and innovation.
            </p>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">8+</span>
                <span className="stat-label">Years of Excellence</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Signature Dishes</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Locally Sourced</span>
              </div>
            </div>
          </div>
          <div className="about-story-image">
            <div className="image-wrapper">
              <div className="image-glow"></div>
              {/* <img src={restaurantImage} alt="Restaurant interior" /> */}
              <div className="image-placeholder">🍽️</div>
            </div>
          </div>
        </div>

        {/* Chef Section */}
        <div className={`about-chef ${isVisible ? 'animate' : ''}`}>
          <div className="about-chef-image">
            <div className="image-wrapper">
              <div className="image-glow"></div>
              {/* <img src={chefImage} alt="Executive Chef" /> */}
              <div className="image-placeholder">👨‍🍳</div>
            </div>
          </div>
          <div className="about-chef-content">
            <span className="about-label">Meet the Chef</span>
            <h2 className="about-title">Chef Michael Chen</h2>
            <p className="about-description">
              With over 15 years of experience in Michelin-starred kitchens across the globe, 
              Chef Michael brings a unique perspective to Ember & Grain. His philosophy is simple: 
              respect the ingredients, master the techniques, and always cook with intention.
            </p>
            <p className="about-description">
              "Food is more than sustenance—it's connection, memory, and love. Every dish that 
              leaves our kitchen carries a piece of our heart, and we pour that passion into 
              every plate we serve."
            </p>
            <div className="chef-signature">
              <span className="signature-line">— Chef Michael Chen</span>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className={`about-philosophy ${isVisible ? 'animate' : ''}`}>
          <h2 className="philosophy-title">Our Philosophy</h2>
          <div className="philosophy-grid">
            <div className="philosophy-card">
              <div className="philosophy-icon">🌿</div>
              <h3>Farm to Table</h3>
              <p>We partner with local farmers and artisans to bring you the freshest, most sustainable ingredients.</p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-icon">🔥</div>
              <h3>Fire & Smoke</h3>
              <p>Our open-fire cooking technique brings out natural flavors and creates unforgettable depth.</p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-icon">🤝</div>
              <h3>Community First</h3>
              <p>We believe in giving back to the community that has embraced us with open arms.</p>
            </div>
            <div className="philosophy-card">
              <div className="philosophy-icon">✨</div>
              <h3>Uncompromising Quality</h3>
              <p>From sourcing to plating, we never compromise on the quality that defines us.</p>
            </div>
          </div>
        </div>

        {/* Ingredients Showcase */}
        <div className={`about-ingredients ${isVisible ? 'animate' : ''}`}>
          <div className="ingredients-header">
            <span className="about-label">Farm to Fork</span>
            <h2 className="ingredients-title">Sourced with Care</h2>
            <p className="ingredients-subtitle">
              We work directly with local farmers, ranchers, and artisans who share our commitment to quality.
            </p>
          </div>
          <div className="ingredients-grid">
            <div className="ingredient-card">
              <div className="ingredient-icon">🥩</div>
              <h4>Premium Meats</h4>
              <p>Grass-fed, humanely raised from local ranches</p>
            </div>
            <div className="ingredient-card">
              <div className="ingredient-icon">🌱</div>
              <h4>Organic Produce</h4>
              <p>Seasonal vegetables from family farms</p>
            </div>
            <div className="ingredient-card">
              <div className="ingredient-icon">🐟</div>
              <h4>Sustainable Seafood</h4>
              <p>Responsibly sourced from local waters</p>
            </div>
            <div className="ingredient-card">
              <div className="ingredient-icon">🧀</div>
              <h4>Artisanal Cheeses</h4>
              <p>Small-batch from local creameries</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`about-cta ${isVisible ? 'animate' : ''}`}>
          <div className="cta-content">
            <h2>Experience Ember & Grain</h2>
            <p>Join us for an unforgettable dining experience</p>
            <div className="cta-buttons">
              <a href="/reserve" className="cta-primary">Reserve a Table</a>
              <a href="/menu" className="cta-secondary">View Our Menu</a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}