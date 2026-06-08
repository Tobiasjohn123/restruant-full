import React from 'react';
import { useCart } from './cartcontext.jsx';

export default function Notification() {
  const { notification } = useCart();

  // Debug log to check if notification exists
 
  if (!notification) return null;

  return (
    <div className={`glass-notification ${notification.type}`}>
      <div className="notification-content">
        <span className="notification-icon">
          {notification.type === 'success' ? '✓' : '✗'}
        </span>
        <span className="notification-message">{notification.message}</span>
      </div>
    </div>
  );
}