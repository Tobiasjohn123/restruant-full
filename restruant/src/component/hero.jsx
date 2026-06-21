import React, { useEffect, useRef, useState } from 'react';
import Newimage from '/src/assets/res-img-w.png';
import { useLoading } from './loadingContent.jsx';

// SVG Icon Components
const FireIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const LightningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const DotIcon = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
    <circle cx="3" cy="3" r="3" />
  </svg>
);

export default function Hero() {
  const [heroLoading, setHeroLoading] = useState(true);
  const [animationReady, setAnimationReady] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const copyRef = useRef(null);
  const galleryRef = useRef(null);

  // Handle loading and animation timing
  useEffect(() => {
    showLoading();
    const timer = setTimeout(() => {
      setHeroLoading(false);
      hideLoading();
      setTimeout(() => {
        setAnimationReady(true);
      }, 100);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // 3D Tilt Effect
  useEffect(() => {
    if (heroLoading) return;

    const section = sectionRef.current;
    const grid = gridRef.current;
    const copy = copyRef.current;
    const gallery = galleryRef.current;

    if (!section || !grid) return;

    let tiltX = 0, tiltY = 0, targetX = 0, targetY = 0;
    let rafId;

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetX = ((e.clientY - cy) / rect.height) * 8;
      targetY = ((e.clientX - cx) / rect.width) * -8;
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      tiltX += (targetX - tiltX) * 0.06;
      tiltY += (targetY - tiltY) * 0.06;
      if (grid) grid.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      if (copy) copy.style.transform = `translateZ(40px)`;
      if (gallery) gallery.style.transform = `translateZ(60px)`;
      rafId = requestAnimationFrame(animate);
    };

    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);
    animate();

    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [heroLoading]);

  // Loading skeleton
  if (heroLoading) {
    return (
      <div className="hero-skeleton">
        <div className="hero-skeleton-grid">
          <div className="hero-skeleton-copy">
            <div className="skeleton-label"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-subtitle"></div>
            <div className="skeleton-tags">
              <div className="skeleton-tag"></div>
              <div className="skeleton-tag"></div>
              <div className="skeleton-tag"></div>
            </div>
            <div className="skeleton-button"></div>
          </div>
          <div className="hero-skeleton-image"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="section" ref={sectionRef}>
      <div className="hero-grid" ref={gridRef}>
        <div className="hero-copy" ref={copyRef}>
          <span className={`hero-label ${animationReady ? 'animate' : ''}`}>
            Ember & Grain
          </span>
          <h1 className={`hero-t ${animationReady ? 'animate' : ''}`}>
            A warm dining experience fueled by craft and comfort.
          </h1>
          <p className={`hero-subtitle ${animationReady ? 'animate' : ''}`}>
            Discover dishes built from rich ingredients, smoky flavors, and thoughtful presentation. The perfect meal begins and ends here.
          </p>

          <a href="#menu" className={`hero-cta ${animationReady ? 'animate' : ''}`}>
            Explore Our Menu
          </a>
        </div>

        <div className="hero-gallery" ref={galleryRef}>
          <div className={`gallery-badge badge-top ${animationReady ? 'animate' : ''}`}>
            <DotIcon />
            Craft Kitchen
          </div>
          <img 
            src={Newimage} 
            alt="Featured dish" 
            className={`hero-image ${animationReady ? 'animate' : ''}`} 
          />
          <div className={`gallery-badge badge-bottom ${animationReady ? 'animate' : ''}`}>
            <FireIcon />
            Chef's Special
          </div>
          <div className={`gallery-badge badge-cal ${animationReady ? 'animate' : ''}`}>
            <LightningIcon />
            680 kcal
          </div>
        </div>
      </div>
    </section>
  );
}