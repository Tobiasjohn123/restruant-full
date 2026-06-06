// About.jsx - Fixed version with no touch blocking
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './about.css';

/* ─── Image bank ─── */
const IMGS = {
  hero: [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80',
    'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=900&q=80',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=900&q=80',
  ],
  strip: [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=75',
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=75',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=75',
    'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=600&q=75',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=75',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=75',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=75',
    'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&q=75',
  ],
  story: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&q=85',
  triptych: [
    { src: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80', label: 'The Kitchen', tall: true },
    { src: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&q=80', label: 'Artful Plating' },
    { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80', label: 'The Bar' },
    { src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80', label: 'Detail Work' },
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', label: 'Seasonal Ingredients' },
  ],
  chef: [
    'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=900&q=85',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85',
    'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=900&q=85',
  ],
  bento: [
    { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80', label: 'The Dining Room' },
    { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80', label: 'Craft Cocktails' },
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80', label: 'Signature Dish' },
    { src: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=700&q=80', label: 'The Pantry' },
    { src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=700&q=80', label: 'Live Fire' },
    { src: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=700&q=80', label: 'Plating Art' },
    { src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=700&q=80', label: 'Private Dining' },
    { src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=900&q=80', label: 'Morning Prep' },
  ],
  experiences: [
    {
      img: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=700&q=80',
      title: 'Open Kitchen Theatre', subtitle: 'Live Fire Experience',
      body: 'Watch our chefs work their magic at the live fire station — a front-row seat to pure culinary artistry.'
    },
    {
      img: 'https://images.unsplash.com/photo-1577094889411-83beaa5c2e8b?w=700&q=80',
      title: 'Curated Pairings', subtitle: 'Sommelier Selection',
      body: 'Our sommelier selects bespoke wine and cocktail pairings to elevate every course.'
    },
    {
      img: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=700&q=80',
      title: 'Private Dining', subtitle: 'Exclusive Events',
      body: "Intimate chef's table experiences for special occasions and exclusive corporate events."
    },
    {
      img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80',
      title: "Chef's Table", subtitle: 'Premium Experience',
      body: 'Exclusive multi-course tasting menu with live commentary from Chef Michael.'
    },
    {
      img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=700&q=80',
      title: 'Seasonal Tastings', subtitle: 'Farm to Table',
      body: 'Ever-changing menu highlighting the freshest ingredients of each season.'
    },
    {
      img: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=700&q=80',
      title: 'Breakfast Ritual', subtitle: 'Morning Offering',
      body: 'Begin your day with a slow, intentional breakfast crafted from the morning\'s freshest haul.'
    },
  ],
  gallery: [
    { src: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=700&q=80', caption: 'The Open Kitchen' },
    { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80', caption: 'Elegant Dining' },
    { src: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=700&q=80', caption: 'Artful Plating' },
    { src: 'https://images.unsplash.com/photo-1577094889411-83beaa5c2e8b?w=700&q=80', caption: 'Craft Cocktails' },
    { src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=700&q=80', caption: 'Live Fire Station' },
    { src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=700&q=80', caption: 'Plating Details' },
    { src: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=700&q=80', caption: 'Harvest Ingredients' },
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80', caption: 'Signature Dish' },
  ],
  cta: [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=70',
    'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=70',
  ],
};

export default function About() {
  const sectionRef = useRef(null);
  const floatingCardsRef = useRef([]);

  // Refs for custom navigation buttons
  const expPrevRef = useRef(null);
  const expNextRef = useRef(null);
  const galleryPrevRef = useRef(null);
  const galleryNextRef = useRef(null);

  /* ── Section reveal observer ── */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('section-visible');
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal-section').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ── 3D tilt for desktop ONLY ── */
  useEffect(() => {
    // Check if device is mobile/touch - if yes, completely skip the effect
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Also check for touch support
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return; // Exit on any touch device
    }
    
    const cleanup = [];
    
    floatingCardsRef.current.forEach(card => {
      if (!card) return;
      
      let rafId = null;
      
      const applyTilt = (x, y) => {
        if (rafId) cancelAnimationFrame(rafId);
        
        rafId = requestAnimationFrame(() => {
          const rotateY = x * 13;
          const rotateX = y * -9;
          card.style.transform = `perspective(1200px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-10px)`;
        });
      };
      
      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transition = 'none';
        applyTilt(x, y);
      };
      
      const onMouseLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transition = 'transform 0.7s cubic-bezier(0.22,1,0.36,1)';
        card.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateY(0)';
      };
      
      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
      
      cleanup.push(() => {
        card.removeEventListener('mousemove', onMouseMove);
        card.removeEventListener('mouseleave', onMouseLeave);
        if (rafId) cancelAnimationFrame(rafId);
      });
    });
    
    return () => cleanup.forEach(fn => fn());
  }, []);

  const setTiltRef = i => el => { floatingCardsRef.current[i] = el; };

  return (
    <section className="about-section" ref={sectionRef} id="about">
      {/* Background */}
      <div className="bg-orb bg-orb--1" />
      <div className="bg-orb bg-orb--2" />
      <div className="bg-orb bg-orb--3" />
      <div className="bg-grain" />

      {/* ══════════════════════════════════════
          HERO — fullscreen cinematic mosaic
      ══════════════════════════════════════ */}
      <div className="about-hero">
        <div className="hero-bg-mosaic">
          {IMGS.hero.map((src, i) => (
            <div className="hero-bg-mosaic__cell" key={i}>
              <img src={src} alt="" aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-rule" />
            <span className="eyebrow-text">Est. 2018 · Fine Dining</span>
            <span className="eyebrow-rule" />
          </div>

          <h1 className="hero-title">
            Where Fire<br />
            <em>Meets Artistry</em>
          </h1>

          <p className="hero-lead">
            A sanctuary for those who appreciate the craft of fine dining —
            where smoke, flame, and passion create unforgettable moments.
          </p>

          <div className="hero-actions">
            <a href="/reserve" className="btn btn--primary">Reserve a Table</a>
            <a href="/menu" className="btn btn--ghost">Explore Our Menu</a>
          </div>
        </div>

        <div className="hero-scroll-cue">
          <span className="scroll-text">Scroll</span>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SCROLLING IMAGE STRIP
      ══════════════════════════════════════ */}
      <div className="image-strip" aria-hidden="true">
        <div className="image-strip__track">
          {[...IMGS.strip, ...IMGS.strip].map((src, i) => (
            <div className="image-strip__item" key={i}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      </div>

      <div className="about-container">

        {/* ══════════════════════════════════════
            STORY
        ══════════════════════════════════════ */}
        <div className="story-section reveal-section" style={{ marginBottom: '130px' }}>
          <div className="story-grid">
            <div className="story-content">
              <p className="label-tag reveal-child">Our Story</p>
              <h2 className="section-title reveal-child">
                Built Through Fire,<br /><em>Crafted Through Passion</em>
              </h2>
              <div className="prose-block reveal-child">
                <p>Ember & Grain began with a simple belief — dining should be more than a meal. It should feel immersive, emotional, and unforgettable.</p>
                <p>What started as an experimental fire-driven kitchen quickly evolved into a destination where craftsmanship, hospitality, and culinary artistry converge.</p>
                <p>Every ingredient is carefully selected, every dish refined through countless iterations, every detail considered to create an experience guests carry long after leaving.</p>
                <p>Today, Ember & Grain stands as a celebration of smoke, fire, texture, and human connection — where modern technique meets timeless tradition.</p>
              </div>
              
              {/* TIMELINE - Glass Container Block */}
              <div className="timeline-container reveal-child">
                <div className="timeline-glass-block">
                  <div className="timeline-header">
                    <span className="timeline-badge">Our Journey</span>
                    <h3 className="timeline-heading">Milestones</h3>
                  </div>
                  
                  <div className="timeline-cards">
                    <div className="timeline-card">
                      <div className="timeline-card__glow" />
                      <div className="timeline-card__content">
                        <span className="timeline-year">2018</span>
                        <span className="timeline-label">First Concept</span>
                        <p className="timeline-desc">The vision of Ember & Grain was born in a small experimental kitchen.</p>
                      </div>
                    </div>
                    
                    <div className="timeline-card">
                      <div className="timeline-card__glow" />
                      <div className="timeline-card__content">
                        <span className="timeline-year">2021</span>
                        <span className="timeline-label">Grand Opening</span>
                        <p className="timeline-desc">Doors opened to the public, receiving immediate acclaim.</p>
                      </div>
                    </div>
                    
                    <div className="timeline-card">
                      <div className="timeline-card__glow" />
                      <div className="timeline-card__content">
                        <span className="timeline-year">2023</span>
                        <span className="timeline-label">James Beard Award</span>
                        <p className="timeline-desc">Recognized for culinary excellence and innovation.</p>
                      </div>
                    </div>
                    
                    <div className="timeline-card">
                      <div className="timeline-card__glow" />
                      <div className="timeline-card__content">
                        <span className="timeline-year">2024</span>
                        <span className="timeline-label">Premium Experience</span>
                        <p className="timeline-desc">Launched the exclusive Chef's Table journey.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="story-media reveal-child">
              <div className="floating-frame" ref={setTiltRef(0)}>
                <img src={IMGS.story} alt="The dining room at Ember & Grain" />
                <div className="deco-border" />
                <div className="deco-corner deco-corner--tl" />
                <div className="deco-corner deco-corner--tr" />
                <div className="deco-corner deco-corner--bl" />
                <div className="deco-corner deco-corner--br" />
              </div>
              <p className="frame-cap">The Dining Room</p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            TRIPTYCH
        ══════════════════════════════════════ */}
        <div className="triptych reveal-section" style={{ marginBottom: '130px' }}>
          {IMGS.triptych.map((cell, i) => (
            <div className={`triptych__cell${cell.tall ? ' triptych__cell--tall' : ''}`} key={i}>
              <img src={cell.src} alt={cell.label} />
              <div className="triptych__cell-overlay">
                <span className="triptych__cell-label">{cell.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════
            PHILOSOPHY
        ══════════════════════════════════════ */}
        <div className="philosophy-section reveal-section">
          <div className="section-header">
            <p className="label-tag">Our Philosophy</p>
            <h2 className="section-title">The Four Pillars</h2>
            <p className="section-lead">Guiding principles that define every aspect of the Ember & Grain experience.</p>
          </div>
          <div className="pillars-grid">
            {[
              { icon: '🔥', num: '01', title: 'Fire & Smoke', body: 'We embrace the primal art of cooking with fire, unlocking depths of flavour that cannot be replicated.' },
              { icon: '🌿', num: '02', title: 'Farm to Table', body: 'Partnership with local farmers ensures peak freshness and sustains the community we call home.' },
              { icon: '🎨', num: '03', title: 'Artful Plating', body: 'Every plate is a canvas, meticulously composed to delight both the eye and the palate.' },
              { icon: '🤝', num: '04', title: 'Community First', body: 'We believe in warmth, inclusion, and giving back to the people and land that nourish us.' },
            ].map(({ icon, num, title, body }) => (
              <div className="pillar-card" key={title}>
                <div className="pillar-number">{num}</div>
                <span className="pillar-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <div className="pillar-shine" />
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            CHEF
        ══════════════════════════════════════ */}
        <div className="chef-section reveal-section">
          <div className="chef-grid">
            <div className="chef-media">
              <div className="chef-images">
                {IMGS.chef.map((src, i) => (
                  <div className="floating-frame" key={i} ref={setTiltRef(i + 1)}>
                    <img src={src} alt={i === 0 ? 'Executive Chef Michael Chen' : 'Chef at work'} />
                    <div className="deco-border" />
                    {i === 0 && (
                      <>
                        <div className="deco-corner deco-corner--tl" />
                        <div className="deco-corner deco-corner--br" />
                      </>
                    )}
                  </div>
                ))}
              </div>
              <p className="frame-cap" style={{ marginTop: '1rem' }}>Executive Chef</p>
            </div>

            <div className="chef-content">
              <p className="label-tag reveal-child">Meet the Chef</p>
              <h2 className="section-title reveal-child">Chef Michael<br /><em>Chen</em></h2>
              <div className="prose-block reveal-child">
                <p>With over 18 years in Michelin-starred kitchens across Paris, Tokyo, and New York, Chef Michael brings a rare global perspective to Ember & Grain.</p>
                <p>His philosophy is simple: honour the ingredient, master the fire, let the smoke tell the story.</p>
              </div>
              <div className="awards-row reveal-child">
                {[
                  { medal: '🏆', title: 'James Beard Award Winner', sub: 'Best Chef · 2023' },
                  { medal: '⭐', title: 'Michelin Star Recognition', sub: 'Fine Dining · 2022' },
                  { medal: '🌿', title: 'Sustainability Champion', sub: 'Green Table Award · 2024' },
                ].map(({ medal, title, sub }) => (
                  <div className="award-badge" key={title}>
                    <div className="award-medal">{medal}</div>
                    <div>
                      <strong>{title}</strong>
                      <span>{sub}</span>
                    </div>
                  </div>
                ))}
              </div>
              <blockquote className="chef-quote reveal-child">
                "Cooking is love made visible — and fire is its most honest translator."
              </blockquote>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            STATS
        ══════════════════════════════════════ */}
        <div className="stats-section reveal-section">
          <div className="stats-inner">
            {[
              { n: '8+', l: 'Years of Excellence' },
              { n: '50+', l: 'Signature Dishes' },
              { n: '100%', l: 'Locally Sourced' },
              { n: '15k+', l: 'Happy Guests' },
            ].map(({ n, l }) => (
              <div className="stat-item" key={l}>
                <span className="stat-num">{n}</span>
                <span className="stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            BENTO GALLERY
        ══════════════════════════════════════ */}
        <div className="bento-section reveal-section">
          <div className="section-header">
            <p className="label-tag">The Space</p>
            <h2 className="section-title">Every Corner,<br /><em>A Story</em></h2>
            <p className="section-lead">Explore the textures, light, and craft that make Ember & Grain unmistakably itself.</p>
          </div>
          <div className="bento-grid">
            {IMGS.bento.map((cell, i) => (
              <div className="bento-cell" key={i}>
                <img src={cell.src} alt={cell.label} />
                <div className="bento-overlay">
                  <span className="bento-caption">{cell.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            EXPERIENCE CAROUSEL
        ══════════════════════════════════════ */}
        <div className="experience-section reveal-section">
          <div className="section-header">
            <p className="label-tag">The Experience</p>
            <h2 className="section-title">A Multi-Sensory Journey</h2>
          </div>
          <div className="carousel-glass-container" style={{ position: 'relative' }}>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={22}
              slidesPerView={1}
              navigation={{
                prevEl: expPrevRef.current,
                nextEl: expNextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = expPrevRef.current;
                swiper.params.navigation.nextEl = expNextRef.current;
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop
              breakpoints={{
                480:  { slidesPerView: 1, spaceBetween: 18 },
                768:  { slidesPerView: 2, spaceBetween: 22 },
                1024: { slidesPerView: 3, spaceBetween: 22 },
              }}
              className="swiper-experience"
            >
              {IMGS.experiences.map((exp, i) => (
                <SwiperSlide key={i}>
                  <div className="exp-card">
                    <div className="exp-img-wrap">
                      <img src={exp.img} alt={exp.title} />
                      <div className="exp-img-overlay" />
                    </div>
                    <div className="exp-details-visible">
                      <span className="exp-subtitle">{exp.subtitle}</span>
                      <h3>{exp.title}</h3>
                      <p>{exp.body}</p>
                      <span className="exp-arrow">Discover →</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom navigation buttons for Experience */}
            <button className="custom-nav custom-nav--prev" ref={expPrevRef}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="custom-nav custom-nav--next" ref={expNextRef}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════
            GALLERY CAROUSEL
        ══════════════════════════════════════ */}
        <div className="gallery-section reveal-section">
          <div className="section-header">
            <p className="label-tag">Visual Journey</p>
            <h2 className="section-title">Behind the Scenes</h2>
          </div>
          <div className="carousel-glass-container" style={{ position: 'relative' }}>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={14}
              slidesPerView={1}
              navigation={{
                prevEl: galleryPrevRef.current,
                nextEl: galleryNextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = galleryPrevRef.current;
                swiper.params.navigation.nextEl = galleryNextRef.current;
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3800, disableOnInteraction: false }}
              loop
              breakpoints={{
                480:  { slidesPerView: 1, spaceBetween: 14 },
                768:  { slidesPerView: 2, spaceBetween: 14 },
                1024: { slidesPerView: 3, spaceBetween: 14 },
              }}
              className="swiper-gallery"
            >
              {IMGS.gallery.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="gallery-card">
                    <img src={img.src} alt={img.caption} />
                    <div className="gallery-overlay">
                      <span className="gallery-caption">{img.caption}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom navigation buttons for Gallery */}
            <button className="custom-nav custom-nav--prev" ref={galleryPrevRef}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="custom-nav custom-nav--next" ref={galleryNextRef}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════
            CTA
        ══════════════════════════════════════ */}
        <div className="cta-section reveal-section">
          <div className="cta-bg">
            {IMGS.cta.map((src, i) => <img key={i} src={src} alt="" aria-hidden="true" />)}
          </div>
          <div className="cta-inner">
            <p className="label-tag">Begin Your Journey</p>
            <h2 className="cta-title">Ready to Experience<br /><em>Ember & Grain</em>?</h2>
            <p className="cta-lead">Reserve your table and embark on a culinary journey unlike any other.</p>
            <div className="cta-actions">
              <a href="/reserve" className="btn btn--primary">Reserve a Table</a>
              <a href="/menu" className="btn btn--ghost">Explore Our Menu</a>
            </div>
          </div>
        </div>

      </div>{/* /about-container */}
    </section>
  );
}