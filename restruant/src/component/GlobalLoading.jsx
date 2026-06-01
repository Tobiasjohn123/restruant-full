import React from 'react';
import { useLoading } from './loadingContent.jsx';

export default function GlobalLoading() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
}