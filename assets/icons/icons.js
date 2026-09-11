/* =============================================
   SAFE2BITE — ICON SYSTEM  (icons.js)
   Consistent professional SVG icon library.
   All icons: 24×24 viewBox, stroke-based,
   stroke-linecap/linejoin=round, fill=none.
   Usage:  icon('name')            → 24px SVG string
           icon('name', 20)        → 20px
           icon('name', 20, '#00a5bb') → teal
   ============================================= */

const S2B_ICONS = {

  // ── BOTTOM NAVIGATION ────────────────────────
  today: `
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <rect x="7.5" y="13.5" width="3" height="3" rx="0.75" fill="currentColor" stroke="none"/>`,

  treatment: `
    <path d="M10.5 20.5L3.5 13.5a5 5 0 1 1 7.07-7.07l7 7a5 5 0 0 1-7.07 7.07z"/>
    <line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/>`,

  progress: `
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>`,

  care: `
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>`,

  profile: `
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>`,

  dashboard: `
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>`,

  patients: `
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,

  alerts: `
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>`,

  messages: `
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,

  more: `
    <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none"/>`,

  // ── ROLE ICONS ───────────────────────────────
  'role-patient': `
    <circle cx="12" cy="8" r="4"/>
    <path d="M4.5 20.5c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5"/>`,

  'role-caregiver': `
    <circle cx="8.5" cy="7" r="3.5"/>
    <path d="M2 21c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"/>
    <circle cx="18.5" cy="9.5" r="2.5"/>
    <path d="M15.5 21c0-2.5 1.3-4.5 3-4.5s3 2 3 4.5"/>`,

  'role-doctor': `
    <circle cx="9" cy="7.5" r="3.5"/>
    <path d="M2.5 21c0-3.5 2.9-6.5 6.5-7"/>
    <rect x="12.5" y="12.5" width="9" height="9" rx="1.5"/>
    <line x1="17" y1="15" x2="17" y2="19"/>
    <line x1="15" y1="17" x2="19" y2="17"/>`,

  // ── STATUS / ALERT ICONS ─────────────────────
  'check-circle': `
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>`,

  clipboard: `
    <path d="M16 4H18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1"/>
    <line x1="9" y1="12" x2="15" y2="12"/>
    <line x1="9" y1="16" x2="13" y2="16"/>`,

  warning: `
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>`,

  'alert-circle': `
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>`,

  'x-circle': `
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>`,

  info: `
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>`,

  // ── SECURITY / UTILITY ICONS ─────────────────
  'shield-check': `
    <path d="M12 2.5L4.5 6v5.5c0 5.25 3.5 9.45 7.5 10.5 4-1.05 7.5-5.25 7.5-10.5V6L12 2.5z"/>
    <polyline points="8.5 12 10.75 14.5 15.5 9.5"/>`,

  lock: `
    <rect x="5" y="11" width="14" height="11" rx="2"/>
    <path d="M8 11V7a4 4 0 0 1 8 0v4"/>`,

  search: `
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>`,

  biometric: `
    <path d="M12 12c-1.1 0-2-.9-2-2V8a2 2 0 0 1 4 0v2c0 1.1-.9 2-2 2z"/>
    <path d="M6 10a6 6 0 0 0 12 0"/>
    <path d="M3 10a9 9 0 0 0 18 0"/>
    <line x1="12" y1="16" x2="12" y2="21"/>`,

  // ── FEATURE ICONS ────────────────────────────
  bell: `
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>`,

  calendar: `
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>`,

  'calendar-check': `
    <polyline points="9 11 12 14 22 4"/>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>`,

  food: `
    <line x1="9" y1="2" x2="9" y2="22"/>
    <path d="M6 2v5a3 3 0 0 0 6 0V2"/>
    <line x1="15" y1="2" x2="15" y2="22"/>`,

  activity: `
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,

  reaction: `
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 15s1.5-2 4-2 4 2 4 2"/>
    <path d="M9.5 9.5c0-.83.67-1.5 1.5-1.5"/>
    <path d="M14.5 9.5c0-.83-.67-1.5-1.5-1.5"/>`,

  illness: `
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 15s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/>
    <line x1="15" y1="9" x2="15.01" y2="9"/>`,

  settings: `
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,

  emergency: `
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <circle cx="12" cy="17.5" r="0.75" fill="currentColor" stroke="none"/>`,

  book: `
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>`,

  'help-circle': `
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>`,

  award: `
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>`,

  phone: `
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>`,

  'medical-cross': `
    <path d="M9 2h6v7h7v6h-7v7H9v-7H2v-6h7z"/>`,

  note: `
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>`,

  timeline: `
    <line x1="12" y1="3" x2="12" y2="21" stroke-width="1.25"/>
    <circle cx="12" cy="6" r="2.5" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="18" r="2.5" fill="currentColor" stroke="none"/>
    <line x1="7" y1="6" x2="9.5" y2="6"/>
    <line x1="7" y1="12" x2="9.5" y2="12"/>
    <line x1="7" y1="18" x2="9.5" y2="18"/>`,

  chevron: `
    <polyline points="9 18 15 12 9 6"/>`,

  user: `
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>`,

  'user-check': `
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <polyline points="16 11 18 13 22 9"/>`,

  'message-circle': `
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>`,

  'trending-up': `
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>`,

  'chart-bar': `
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="3" y1="20" x2="21" y2="20"/>`,

  eye: `
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>`,

  'arrow-right': `
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>`,

  dose: `
    <path d="M10.5 20.5L3.5 13.5a5 5 0 1 1 7.07-7.07l7 7a5 5 0 0 1-7.07 7.07z"/>
    <line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/>`,

  assessment: `
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/>
    <polyline points="9 12 11 14 15 10"/>`,

  privacy: `
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,

  'sign-out': `
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>`,

  filter: `
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>`,

  milestone: `
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>`,

  // ── PASS 2 — AUTHENTICATION & ONBOARDING ICONS ──

  mail: `
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>`,

  'eye-off': `
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>`,

  'arrow-left': `
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>`,

  'user-plus': `
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <line x1="19" y1="8" x2="19" y2="14"/>
    <line x1="16" y1="11" x2="22" y2="11"/>`,

  'check-badge': `
    <path d="M12 2l2.4 4.8 5.6.8-4 3.9.9 5.5L12 14.5l-4.9 2.5.9-5.5-4-3.9 5.6-.8z"/>
    <polyline points="9 12 11 14 15 10"/>`,

  refresh: `
    <polyline points="23 4 23 10 17 10"/>
    <polyline points="1 20 1 14 7 14"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>`,

  send: `
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>`,

  key: `
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>`,

  x: `
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>`,

  edit: `
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>`,

  'home-heart': `
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <path d="M12 22V12"/>
    <path d="M9.5 14.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 2.5-2.5 4-2.5 4s-2.5-1.5-2.5-4z" fill="currentColor" stroke="none" opacity="0.4"/>
    <path d="M9.5 14.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 2.5-2.5 4-2.5 4s-2.5-1.5-2.5-4z"/>`,

  'notification-bell': `
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    <circle cx="18" cy="5" r="3" fill="currentColor" stroke="none" opacity="0.7"/>`,

  'phone-check': `
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    <polyline points="16 2 18 4 22 0"/>`,

  identity: `
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <circle cx="8" cy="11" r="2.5"/>
    <path d="M4 19c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
    <line x1="14" y1="9" x2="20" y2="9"/>
    <line x1="14" y1="13" x2="18" y2="13"/>`,

  consent: `
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="9" y1="13" x2="15" y2="13"/>
    <line x1="9" y1="17" x2="15" y2="17"/>
    <polyline points="9 11 10 12 12 9"/>`,

  'setup-done': `
    <circle cx="12" cy="12" r="10"/>
    <polyline points="8 12 10.5 14.5 16 9"/>`,

  'wifi-off': `
    <line x1="1" y1="1" x2="23" y2="23"/>
    <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
    <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
    <path d="M10.71 5.05A16 16 0 0 1 22.56 9"/>
    <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
    <line x1="12" y1="20" x2="12.01" y2="20"/>`,

  'date-of-birth': `
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <circle cx="12" cy="16" r="2" fill="currentColor" stroke="none" opacity="0.5"/>`,

  relationship: `
    <circle cx="9" cy="6" r="3"/>
    <circle cx="18" cy="6" r="3"/>
    <path d="M3 20c0-3.31 2.69-6 6-6s6 2.69 6 6"/>
    <path d="M15 14c1.66 0 3 1.34 3 3v3"/>
    <line x1="12.5" y1="9" x2="14.5" y2="9"/>`,

  // ── PASS 3 — TODAY DASHBOARD ICONS ──────────

  'heart-pulse': `
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    <polyline points="7 12 9.5 9 12 13 14.5 10 17 12"/>`,

  food: `
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>`,

  reaction: `
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 15s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/>
    <line x1="15" y1="9" x2="15.01" y2="9"/>
    <path d="M9 9a1 1 0 1 0 0-.01"/>
    <path d="M15 9a1 1 0 1 0 0-.01"/>`,

  clock: `
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>`,

  emergency: `
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>`,

  'check-circle-filled': `
    <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" opacity="0.15"/>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="8 12 10.5 14.5 16 9"/>`,

};


// ─────────────────────────────────────────────
// ICON HELPER FUNCTION
// Returns a complete SVG string for use in HTML templates.
//   name        — key from S2B_ICONS
//   size        — px value for width & height (default 24)
//   color       — CSS color or 'currentColor' (default)
//   strokeWidth — line weight (default 1.75)
// ─────────────────────────────────────────────
function icon(name, size = 24, color = 'currentColor', strokeWidth = 1.75) {
  const paths = S2B_ICONS[name];
  if (!paths) {
    console.warn(`[S2B Icons] Unknown icon: "${name}"`);
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;
}

// ─────────────────────────────────────────────
// ICON BUTTON HELPER
// Wraps an icon in a tappable container div.
// ─────────────────────────────────────────────
function iconBtn(name, size = 40, bgColor = 'var(--s2b-blue-light)', iconColor = 'var(--s2b-blue)', sw = 1.75) {
  return `<div style="width:${size}px; height:${size}px; background:${bgColor}; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; flex-shrink:0;">${icon(name, Math.round(size * 0.48), iconColor, sw)}</div>`;
}
