// About.jsx - With scroll-triggered animations that replay every time
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
      body: "Begin your day with a slow, intentional breakfast crafted from the morning's freshest haul."
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

  const expPrevRef = useRef(null);
  const expNextRef = useRef(null);
  const galleryPrevRef = useRef(null);
  const galleryNextRef = useRef(null);

  /* ── Scroll-triggered animations that REPLAY every time ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const section = entry.target;

          if (entry.isIntersecting) {
            // Section entering viewport — remove class, force reflow, re-add to restart animations
            section.classList.remove('is-visible');
            void section.offsetHeight; // force reflow
            section.classList.add('is-visible');

            // Also replay all animatable children
            const animChildren = section.querySelectorAll('.anim-child');
            animChildren.forEach(el => {
              el.classList.remove('anim-child--played');
              void el.offsetHeight;
              el.classList.add('anim-child--played');
            });
          } else {
            // Section leaving viewport — strip class so next entry replays
            section.classList.remove('is-visible');
            section.querySelectorAll('.anim-child').forEach(el => {
              el.classList.remove('anim-child--played');
            });
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.scroll-section').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* ── 3D tilt — desktop/mouse only ── */
  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const cleanup = [];

    floatingCardsRef.current.forEach(card => {
      if (!card) return;
      let rafId = null;

      const onMouseMove = (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transition = 'none';
          card.style.transform = `perspective(1200px) rotateY(${x * 13}deg) rotateX(${y * -9}deg) translateY(-10px)`;
        });
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
          HERO
      ══════════════════════════════════════ */}
      <div className="about-hero scroll-section">
        <div className="hero-bg-mosaic">
          {IMGS.hero.map((src, i) => (
            <div className="hero-bg-mosaic__cell" key={i}>
              <img src={src} alt="" aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-eyebrow anim-child anim-child--fade-up" style={{ '--delay': '0.05s' }}>
            <span className="eyebrow-rule" />
            <span className="eyebrow-text">Est. 2018 · Fine Dining</span>
            <span className="eyebrow-rule" />
          </div>

          <h1 className="hero-title anim-child anim-child--fade-up" style={{ '--delay': '0.2s' }}>
            Where Fire<br />
            <em>Meets Artistry</em>
          </h1>

          <p className="hero-lead anim-child anim-child--fade-up" style={{ '--delay': '0.38s' }}>
            A sanctuary for those who appreciate the craft of fine dining —
            where smoke, flame, and passion create unforgettable moments.
          </p>

          <div className="hero-actions anim-child anim-child--fade-up" style={{ '--delay': '0.52s' }}>
            <a href="/reserve" className="btn btn--primary">Reserve a Table</a>
            <a href="/menu" className="btn btn--ghost">Explore Our Menu</a>
          </div>
        </div>

        <div className="hero-scroll-cue anim-child anim-child--fade-up" style={{ '--delay': '0.7s' }}>
          <span className="scroll-text">Scroll</span>
        </div>
      </div>

      {/* ══════════════════════════════════════
          IMAGE STRIP
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
        <div className="story-section scroll-section" style={{ marginBottom: '130px' }}>
          <div className="story-grid">
            <div className="story-content">
              <p className="label-tag anim-child anim-child--fade-up" style={{ '--delay': '0s' }}>Our Story</p>
              <h2 className="section-title anim-child anim-child--fade-up" style={{ '--delay': '0.1s' }}>
                Built Through Fire,<br /><em>Crafted Through Passion</em>
              </h2>
              <div className="prose-block">
                <p className="anim-child anim-child--fade-right" style={{ '--delay': '0.15s' }}>Ember & Grain began with a simple belief — dining should be more than a meal. It should feel immersive, emotional, and unforgettable.</p>
                <p className="anim-child anim-child--fade-right" style={{ '--delay': '0.22s' }}>What started as an experimental fire-driven kitchen quickly evolved into a destination where craftsmanship, hospitality, and culinary artistry converge.</p>
                <p className="anim-child anim-child--fade-right" style={{ '--delay': '0.29s' }}>Every ingredient is carefully selected, every dish refined through countless iterations, every detail considered to create an experience guests carry long after leaving.</p>
                <p className="anim-child anim-child--fade-right" style={{ '--delay': '0.36s' }}>Today, Ember & Grain stands as a celebration of smoke, fire, texture, and human connection — where modern technique meets timeless tradition.</p>
              </div>

              {/* TIMELINE */}
              <div className="timeline-container anim-child anim-child--fade-up" style={{ '--delay': '0.4s' }}>
                <div className="timeline-glass-block">
                  <div className="timeline-header">
                    <span className="timeline-badge anim-child anim-child--fade-up" style={{ '--delay': '0.38s' }}>Our Journey</span>
                    <h3 className="timeline-heading anim-child anim-child--fade-up" style={{ '--delay': '0.44s' }}>Milestones</h3>
                  </div>
                  <div className="timeline-cards">
                    {[
                      { year: '2018', label: 'First Concept', desc: 'The vision of Ember & Grain was born in a small experimental kitchen.' },
                      { year: '2021', label: 'Grand Opening', desc: 'Doors opened to the public, receiving immediate acclaim.' },
                      { year: '2023', label: 'James Beard Award', desc: 'Recognized for culinary excellence and innovation.' },
                      { year: '2024', label: 'Premium Experience', desc: "Launched the exclusive Chef's Table journey." },
                    ].map(({ year, label, desc }, i) => (
                      <div className={`timeline-card anim-child anim-child--scale-in`} style={{ '--delay': `${0.45 + i * 0.08}s` }} key={year}>
                        <div className="timeline-card__glow" />
                        <div className="timeline-card__content">
                          <span className="timeline-year">{year}</span>
                          <span className="timeline-label">{label}</span>
                          <p className="timeline-desc">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="story-media">
              <div className="floating-frame anim-child anim-child--image-reveal" style={{ '--delay': '0.2s' }} ref={setTiltRef(0)}>
                <img src={IMGS.story} alt="The dining room at Ember & Grain" />
                <div className="deco-border" />
                <div className="deco-corner deco-corner--tl" />
                <div className="deco-corner deco-corner--tr" />
                <div className="deco-corner deco-corner--bl" />
                <div className="deco-corner deco-corner--br" />
              </div>
              <p className="frame-cap anim-child anim-child--fade-up" style={{ '--delay': '0.5s' }}>The Dining Room</p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            TRIPTYCH
        ══════════════════════════════════════ */}
        <div className="triptych scroll-section" style={{ marginBottom: '130px' }}>
          {IMGS.triptych.map((cell, i) => (
            <div
              className={`triptych__cell${cell.tall ? ' triptych__cell--tall' : ''} anim-child anim-child--image-reveal`}
              style={{ '--delay': `${i * 0.1}s` }}
              key={i}
            >
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
        <div className="philosophy-section scroll-section">
          <div className="section-header">
            <p className="label-tag anim-child anim-child--fade-up" style={{ '--delay': '0s' }}>Our Philosophy</p>
            <h2 className="section-title anim-child anim-child--fade-up" style={{ '--delay': '0.1s' }}>The Four Pillars</h2>
            <p className="section-lead anim-child anim-child--fade-up" style={{ '--delay': '0.2s' }}>Guiding principles that define every aspect of the Ember & Grain experience.</p>
          </div>
          <div className="pillars-grid">
            {[
              { icon: '🔥', num: '01', title: 'Fire & Smoke', body: 'We embrace the primal art of cooking with fire, unlocking depths of flavour that cannot be replicated.' },
              { icon: '🌿', num: '02', title: 'Farm to Table', body: 'Partnership with local farmers ensures peak freshness and sustains the community we call home.' },
              { icon: '🎨', num: '03', title: 'Artful Plating', body: 'Every plate is a canvas, meticulously composed to delight both the eye and the palate.' },
              { icon: '🤝', num: '04', title: 'Community First', body: 'We believe in warmth, inclusion, and giving back to the people and land that nourish us.' },
            ].map(({ icon, num, title, body }, i) => (
              <div className="pillar-card anim-child anim-child--scale-in" style={{ '--delay': `${0.05 + i * 0.08}s` }} key={title}>
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
        <div className="chef-section scroll-section">
          <div className="chef-grid">
            <div className="chef-media">
              <div className="chef-images">
                {IMGS.chef.map((src, i) => (
                  <div
                    className="floating-frame anim-child anim-child--image-reveal"
                    style={{ '--delay': `${i * 0.12}s` }}
                    key={i}
                    ref={setTiltRef(i + 1)}
                  >
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
              <p className="frame-cap anim-child anim-child--fade-up" style={{ '--delay': '0.4s', marginTop: '1rem' }}>Executive Chef</p>
            </div>

            <div className="chef-content">
              <p className="label-tag anim-child anim-child--fade-up" style={{ '--delay': '0s' }}>Meet the Chef</p>
              <h2 className="section-title anim-child anim-child--fade-up" style={{ '--delay': '0.1s' }}>
                Chef Michael<br /><em>Chen</em>
              </h2>
              <div className="prose-block">
                <p className="anim-child anim-child--fade-right" style={{ '--delay': '0.18s' }}>With over 18 years in Michelin-starred kitchens across Paris, Tokyo, and New York, Chef Michael brings a rare global perspective to Ember & Grain.</p>
                <p className="anim-child anim-child--fade-right" style={{ '--delay': '0.25s' }}>His philosophy is simple: honour the ingredient, master the fire, let the smoke tell the story.</p>
              </div>
              <div className="awards-row">
                {[
                  { medal: '🏆', title: 'James Beard Award Winner', sub: 'Best Chef · 2023' },
                  { medal: '⭐', title: 'Michelin Star Recognition', sub: 'Fine Dining · 2022' },
                  { medal: '🌿', title: 'Sustainability Champion', sub: 'Green Table Award · 2024' },
                ].map(({ medal, title, sub }, i) => (
                  <div className="award-badge anim-child anim-child--fade-left" style={{ '--delay': `${0.3 + i * 0.1}s` }} key={title}>
                    <div className="award-medal">{medal}</div>
                    <div>
                      <strong>{title}</strong>
                      <span>{sub}</span>
                    </div>
                  </div>
                ))}
              </div>
              <blockquote className="chef-quote anim-child anim-child--fade-up" style={{ '--delay': '0.6s' }}>
                "Cooking is love made visible — and fire is its most honest translator."
              </blockquote>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            STATS
        ══════════════════════════════════════ */}
        <div className="stats-section scroll-section">
          <div className="stats-inner">
            {[
              { n: '8+', l: 'Years of Excellence' },
              { n: '50+', l: 'Signature Dishes' },
              { n: '100%', l: 'Locally Sourced' },
              { n: '15k+', l: 'Happy Guests' },
            ].map(({ n, l }, i) => (
              <div className="stat-item anim-child anim-child--fade-up" style={{ '--delay': `${i * 0.1}s` }} key={l}>
                <span className="stat-num">{n}</span>
                <span className="stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            BENTO GALLERY
        ══════════════════════════════════════ */}
        <div className="bento-section scroll-section">
          <div className="section-header">
            <p className="label-tag anim-child anim-child--fade-up" style={{ '--delay': '0s' }}>The Space</p>
            <h2 className="section-title anim-child anim-child--fade-up" style={{ '--delay': '0.1s' }}>
              Every Corner,<br /><em>A Story</em>
            </h2>
            <p className="section-lead anim-child anim-child--fade-up" style={{ '--delay': '0.2s' }}>
              Explore the textures, light, and craft that make Ember & Grain unmistakably itself.
            </p>
          </div>
          <div className="bento-grid">
            {IMGS.bento.map((cell, i) => (
              <div
                className="bento-cell anim-child anim-child--scale-in"
                style={{ '--delay': `${0.05 + i * 0.06}s` }}
                key={i}
              >
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
        <div className="experience-section scroll-section">
          <div className="section-header">
            <p className="label-tag anim-child anim-child--fade-up" style={{ '--delay': '0s' }}>The Experience</p>
            <h2 className="section-title anim-child anim-child--fade-up" style={{ '--delay': '0.1s' }}>A Multi-Sensory Journey</h2>
          </div>
          <div className="carousel-glass-container anim-child anim-child--fade-up" style={{ '--delay': '0.25s', position: 'relative' }}>
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
            <button className="custom-nav custom-nav--prev" ref={expPrevRef}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="custom-nav custom-nav--next" ref={expNextRef}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════
            GALLERY CAROUSEL
        ══════════════════════════════════════ */}
        <div className="gallery-section scroll-section">
          <div className="section-header">
            <p className="label-tag anim-child anim-child--fade-up" style={{ '--delay': '0s' }}>Visual Journey</p>
            <h2 className="section-title anim-child anim-child--fade-up" style={{ '--delay': '0.1s' }}>Behind the Scenes</h2>
          </div>
          <div className="carousel-glass-container anim-child anim-child--fade-up" style={{ '--delay': '0.25s', position: 'relative' }}>
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
            <button className="custom-nav custom-nav--prev" ref={galleryPrevRef}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="custom-nav custom-nav--next" ref={galleryNextRef}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════
            CTA
        ══════════════════════════════════════ */}
        <div className="cta-section scroll-section">
          <div className="cta-bg">
            {IMGS.cta.map((src, i) => <img key={i} src={src} alt="" aria-hidden="true" />)}
          </div>
          <div className="cta-inner">
            <p className="label-tag anim-child anim-child--fade-up" style={{ '--delay': '0s' }}>Begin Your Journey</p>
            <h2 className="cta-title anim-child anim-child--fade-up" style={{ '--delay': '0.1s' }}>
              Ready to Experience<br /><em>Ember & Grain</em>?
            </h2>
            <p className="cta-lead anim-child anim-child--fade-up" style={{ '--delay': '0.2s' }}>
              Reserve your table and embark on a culinary journey unlike any other.
            </p>
            <div className="cta-actions anim-child anim-child--fade-up" style={{ '--delay': '0.3s' }}>
              <a href="/reserve" className="btn btn--primary">Reserve a Table</a>
              <a href="/menu" className="btn btn--ghost">Explore Our Menu</a>
            </div>
          </div>
        </div>

      </div>{/* /about-container */}
    </section>
  );
}