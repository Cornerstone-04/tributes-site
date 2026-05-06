/**
 * Admin Dashboard Configuration
 * Centralized constants and configuration for admin functionality
 */

// ===== SESSION CONFIGURATION =====
export const ADMIN_CONFIG = {
  SESSION_COOKIE_NAME: "admin_session",
  SESSION_VALUE: "authorized",
  
  // Password requirements
  PASSWORD_MIN_LENGTH: 8,
  
  // Session timeout (in minutes)
  SESSION_TIMEOUT_MINUTES: 60,
} as const;

// ===== TRIBUTE MODERATION STATES =====
export const TRIBUTE_STATES = {
  PENDING: "pending",
  APPROVED: "approved",
} as const;

// ===== DISPLAY CONFIGURATION =====
export const ADMIN_DISPLAY = {
  TRIBUTES_PER_PAGE: 20,
  SUMMARY_LENGTH: 100, // Characters for preview
} as const;

// Type exports for strict typing
export type AdminSessionCookie = typeof ADMIN_CONFIG.SESSION_COOKIE_NAME;
export type TributeStateValue = typeof TRIBUTE_STATES[keyof typeof TRIBUTE_STATES];
