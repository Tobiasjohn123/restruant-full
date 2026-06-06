import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import AdminLogin from './adminlogin';
import './admin.css';

// ─── ICONS ────────────────────────────────────────────────────────────────────
const CheckIcon    = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>;
const CrossIcon    = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const ArchiveIcon  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>;
const SearchIcon   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const ClearIcon    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
const RefreshIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>;
const CalendarIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const LogoutIcon   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;

// ─── STATUS CONFIG ─────────────────────────────────────────────────────────────
const STATUS = {
  pending:   { label: 'Pending',   color: '#f59e0b' },
  confirmed: { label: 'Confirmed', color: '#10b981' },
  cancelled: { label: 'Cancelled', color: '#ef4444' },
  archived:  { label: 'Completed', color: '#6366f1' },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// ─── CONFIRM MODAL ────────────────────────────────────────────────────────────
function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop">
      <div className="confirm-modal">
        <div className="confirm-icon"><ClearIcon /></div>
        <h3>Are you sure?</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="confirm-cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="confirm-ok-btn"     onClick={onConfirm}>Yes, proceed</button>
        </div>
      </div>
    </div>
  );
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  const icons = { success: '✓', error: '✗', info: '🔔', warning: '⚠' };
  return (
    <div className={`admin-toast toast-${toast.type}`}>
      <span className="toast-icon">{icons[toast.type]}</span>
      <span className="toast-message">{toast.message}</span>
    </div>
  );
}

// ─── STAT PILL ────────────────────────────────────────────────────────────────
function StatPill({ value, label, accent }) {
  return (
    <div className="stat-pill" style={{ '--accent': accent }}>
      <span className="pill-value">{value}</span>
      <span className="pill-label">{label}</span>
    </div>
  );
}

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = STATUS[status] || { label: status, color: '#9ca3af' };
  return (
    <span className="status-badge" style={{ '--c': cfg.color }}>
      {cfg.label}
    </span>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings,     setBookings]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [activeTab,    setActiveTab]    = useState('active');
  const [activeFilter, setActiveFilter] = useState('all');
  const [historyFilter,setHistoryFilter]= useState('all');
  const [search,       setSearch]       = useState('');
  const [dateFrom,     setDateFrom]     = useState('');
  const [dateTo,       setDateTo]       = useState('');
  const [toast,        setToast]        = useState(null);
  const [confirm,      setConfirm]      = useState(null);
  const [actionTaken,  setActionTaken]  = useState({});

  // Verify Supabase Auth Session on Load & Subscribe to auth state events
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setLoading(false);
        }
      } catch (err) {
        console.error('Session check failed:', err);
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsAuthenticated(false);
      showToast('🔒 Logged out successfully', 'info');
    } catch (err) {
      console.error('Logout error:', err);
      showToast('❌ Logout failed', 'error');
    }
  };

  // ── Toast helper ────────────────────────────────────────────────────────────
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // ── Fetch ────────────────────────────────────────────────────────────────────
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('booking_date', { ascending: false })
      .order('booking_time', { ascending: false });

    if (!error && data) {
      setBookings(data);
      setActionTaken({});
    } else {
      console.error('Fetch error:', error);
      showToast('❌ Failed to fetch bookings. Check your RLS policies.', 'error');
    }
    setLoading(false);
  }, [showToast]);

  // ── Realtime subscription ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated) return;
    
    fetchBookings();

    const channel = supabase
      .channel('admin-bookings')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'bookings' },
        ({ new: row }) => {
          if (row.status === 'pending') {
            setBookings(prev => {
              const alreadyExists = prev.some(b => b.booking_id === row.booking_id);
              if (alreadyExists) return prev;
              return [row, ...prev];
            });
            showToast(`🆕 New booking from ${row.customer_name}!`, 'info');
          }
        })
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'bookings' },
        ({ new: row }) => {
          setBookings(prev => prev.map(b => b.booking_id === row.booking_id ? row : b));
        })
      .subscribe();

    return () => channel.unsubscribe();
  }, [fetchBookings, showToast, isAuthenticated]);

  // ── Update status ────────────────────────────────────────────────────────────
  const updateStatus = async (id, newStatus) => {
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;

    setActionTaken(prev => ({ ...prev, [id]: newStatus }));
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));

    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      showToast('❌ Update failed — reverting', 'error');
      setActionTaken(prev => { const n = { ...prev }; delete n[id]; return n; });
      fetchBookings();
    } else {
      const label = STATUS[newStatus]?.label ?? newStatus;
      showToast(`✅ ${booking.customer_name} marked as ${label}`, 'success');
    }
  };

  // ── Clear dashboard → push ALL to history ────────────────────────────────────
  const handleClearDashboard = () => {
    const activeIds = bookings
      .filter(b => b.status === 'pending' || b.status === 'confirmed')
      .map(b => b.id);

    if (activeIds.length === 0) {
      showToast('Dashboard is already clean!', 'info');
      return;
    }

    setConfirm({
      message: `This will move all ${activeIds.length} active booking(s) to History. This cannot be undone.`,
      onConfirm: async () => {
        setConfirm(null);
        setBookings(prev =>
          prev.map(b => activeIds.includes(b.id) ? { ...b, status: 'archived' } : b)
        );

        const { error } = await supabase
          .from('bookings')
          .update({ status: 'archived' })
          .in('id', activeIds);

        if (error) {
          showToast('❌ Clear failed — reverting', 'error');
          fetchBookings();
        } else {
          showToast(`📦 ${activeIds.length} booking(s) moved to History`, 'info');
          setActiveTab('history');
        }
      },
    });
  };

  // ── Derived data ─────────────────────────────────────────────────────────────
  const active  = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed');
  const history = bookings.filter(b => b.status === 'cancelled' || b.status === 'archived');

  const stats = {
    active:     active.length,
    pending:    active.filter(b => b.status === 'pending').length,
    confirmed:  active.filter(b => b.status === 'confirmed').length,
    history:    history.length,
    hCancelled: history.filter(b => b.status === 'cancelled').length,
    completed:  history.filter(b => b.status === 'archived').length,
  };

  const filteredActive = active.filter(b => {
    if (activeFilter === 'pending')   return b.status === 'pending';
    if (activeFilter === 'confirmed') return b.status === 'confirmed';
    if (activeFilter === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  const filteredHistory = history.filter(b => {
    if (historyFilter === 'cancelled' && b.status !== 'cancelled') return false;
    if (historyFilter === 'archived'  && b.status !== 'archived')  return false;

    if (search) {
      const q = search.toLowerCase();
      const matches =
        b.customer_name.toLowerCase().includes(q) ||
        b.booking_id.toLowerCase().includes(q) ||
        (b.customer_email || '').toLowerCase().includes(q);
      if (!matches) return false;
    }

    if (dateFrom && b.booking_date < dateFrom) return false;
    if (dateTo   && b.booking_date > dateTo)   return false;

    return true;
  });

  const displayBookings = activeTab === 'active' ? filteredActive : filteredHistory;

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (loading && bookings.length === 0) {
    return (
      <div className="admin-loading">
        <div className="loading-ring" />
        <span>Loading reservations…</span>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <Toast toast={toast} />
      {confirm && (
        <ConfirmModal
          message={confirm.message}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      <header className="admin-header">
        <div className="header-left">
          <span className="header-eyebrow">Ember &amp; Grain</span>
          <h1>Reservation Management</h1>
          <p>Manage and track all table bookings in real-time</p>
        </div>
        <div className="header-right">
          <button className="icon-btn" onClick={fetchBookings} title="Refresh">
            <RefreshIcon /> Refresh
          </button>
          <button className="clear-btn" onClick={handleClearDashboard} title="Clear Dashboard">
            <ClearIcon /> Clear Dashboard
          </button>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <LogoutIcon /> Logout
          </button>
        </div>
      </header>

      <div className="tab-row">
        <button
          className={`tab-pill ${activeTab === 'active' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active
          <span className="tab-count">{stats.active}</span>
        </button>
        <button
          className={`tab-pill ${activeTab === 'history' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
          <span className="tab-count">{stats.history}</span>
        </button>
      </div>

      <div className="stats-row">
        {activeTab === 'active' ? (
          <>
            <StatPill value={stats.active}    label="Active"    accent="#f5c842" />
            <StatPill value={stats.pending}   label="Pending"   accent="#f59e0b" />
            <StatPill value={stats.confirmed} label="Confirmed" accent="#10b981" />
          </>
        ) : (
          <>
            <StatPill value={stats.history}    label="Total"     accent="#f5c842" />
            <StatPill value={stats.completed}  label="Completed" accent="#6366f1" />
            <StatPill value={stats.hCancelled} label="Cancelled" accent="#ef4444" />
          </>
        )}
      </div>

      <div className="filter-bar">
        {activeTab === 'active' ? (
          <div className="filter-chips">
            {[
              { key: 'all',       label: 'All'       },
              { key: 'pending',   label: 'Pending'   },
              { key: 'confirmed', label: 'Confirmed' },
              { key: 'cancelled', label: 'Cancelled' },
            ].map(f => (
              <button
                key={f.key}
                className={`chip ${activeFilter === f.key ? 'chip-active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="history-filter-row">
            <div className="filter-chips">
              {[
                { key: 'all',       label: 'All'       },
                { key: 'archived',  label: 'Completed' },
                { key: 'cancelled', label: 'Cancelled' },
              ].map(f => (
                <button
                  key={f.key}
                  className={`chip ${historyFilter === f.key ? 'chip-active' : ''}`}
                  onClick={() => setHistoryFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="history-search-row">
              <div className="search-box">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search name, ID, email…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button className="clear-search" onClick={() => setSearch('')}>✕</button>
                )}
              </div>

              <div className="date-range">
                <CalendarIcon />
                <input
                  type="date"
                  value={dateFrom}
                  onChange={e => setDateFrom(e.target.value)}
                  title="From date"
                />
                <span className="date-sep">→</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={e => setDateTo(e.target.value)}
                  title="To date"
                />
                {(dateFrom || dateTo) && (
                  <button className="clear-search" onClick={() => { setDateFrom(''); setDateTo(''); }}>✕</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Seating</th>
                <th>Requests</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayBookings.length === 0 ? (
                <tr>
                  <td colSpan="9">
                    <div className="empty-state">
                      <span className="empty-icon">📋</span>
                      <span>{activeTab === 'active' ? 'No active bookings' : 'No history found'}</span>
                    </div>
                  </td>
                </tr>
              ) : (
                displayBookings.map(booking => {
                  const taken = actionTaken[booking.id];

                  return (
                    <tr key={booking.id}>
                      <td>
                        <span className="mono">{booking.booking_id}</span>
                      </td>
                      <td>
                        <div className="customer-cell">
                          <span className="cust-name">{booking.customer_name}</span>
                          <span className="cust-phone">{booking.customer_phone}</span>
                          {booking.customer_email && (
                            <span className="cust-email">{booking.customer_email}</span>
                          )}
                        </div>
                      </td>
                      <td>{fmt(booking.booking_date)}</td>
                      <td>{booking.booking_time}</td>
                      <td>{booking.guests}</td>
                      <td>{booking.seating_zone}</td>
                      <td className="requests-cell">{booking.special_requests || '—'}</td>
                      <td><StatusBadge status={booking.status} /></td>
                      <td>
                        <div className="actions-cell">
                          {activeTab === 'active' && (
                            <>
                              {booking.status === 'pending' && (
                                <>
                                  {taken !== 'cancelled' && (
                                    <button
                                      className="act-btn act-confirm"
                                      onClick={() => updateStatus(booking.id, 'confirmed')}
                                      disabled={taken === 'confirmed'}
                                    >
                                      <CheckIcon />
                                      {taken === 'confirmed' ? 'Confirmed' : 'Confirm'}
                                    </button>
                                  )}

                                  {taken !== 'confirmed' && (
                                    <button
                                      className="act-btn act-cancel"
                                      onClick={() => updateStatus(booking.id, 'cancelled')}
                                      disabled={taken === 'cancelled'}
                                    >
                                      <CrossIcon />
                                      {taken === 'cancelled' ? 'Cancelled' : 'Cancel'}
                                    </button>
                                  )}
                                </>
                              )}

                              {booking.status === 'confirmed' && (
                                <button
                                  className="act-btn act-complete"
                                  onClick={() => updateStatus(booking.id, 'archived')}
                                  disabled={taken === 'archived'}
                                >
                                  <CheckIcon />
                                  {taken === 'archived' ? 'Done' : 'Complete'}
                                </button>
                              )}
                            </>
                          )}

                          {activeTab === 'history' && (
                            <span className="read-only-label">Archived</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
           </table>
        </div>

        <div className="table-footer">
          Showing <strong>{displayBookings.length}</strong> of <strong>{activeTab === 'active' ? active.length : history.length}</strong> bookings
        </div>
      </div>
    </div>
  );
}
