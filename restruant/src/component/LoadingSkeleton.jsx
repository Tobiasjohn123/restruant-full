import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="loading-skeleton">
      <div className="skeleton-navbar"></div>
      <div className="skeleton-hero"></div>
      <div className="skeleton-menu">
        <div className="skeleton-header"></div>
        <div className="skeleton-filters"></div>
        <div className="skeleton-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
              <div className="skeleton-button"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}