/**
 * Elec-Mate Theme Styles
 *
 * Centralized theme constants for consistent styling across the application.
 * Use these instead of hardcoded Tailwind classes for maintainability.
 */

// ============================================================================
// CARD STYLES
// ============================================================================

export const card = {
  /** Standard card with subtle background */
  base: "bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg",

  /** Card with hover interaction */
  interactive: "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.98] rounded-lg",

  /** Highlighted/featured card */
  featured: "bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/20 rounded-lg",

  /** Success state card */
  success: "bg-green-500/10 border border-green-500/30 rounded-lg",

  /** Warning state card */
  warning: "bg-amber-500/10 border border-amber-500/30 rounded-lg",

  /** Error/danger state card */
  danger: "bg-red-500/10 border border-red-500/30 rounded-lg",

  /** Info state card */
  info: "bg-blue-500/10 border border-blue-500/30 rounded-lg",
} as const;

// ============================================================================
// TEXT STYLES
// ============================================================================

export const text = {
  /** Primary text - highest contrast */
  primary: "text-white",

  /** Secondary text - slightly muted */
  secondary: "text-white/80",

  /** Tertiary text - more muted */
  tertiary: "text-white/70",

  /** Subtle text - lowest contrast */
  subtle: "text-white/60",

  /** Accent text - brand color */
  accent: "text-elec-yellow",

  /** Success text */
  success: "text-green-400",

  /** Warning text */
  warning: "text-amber-400",

  /** Error text */
  error: "text-red-400",

  /** Info text */
  info: "text-blue-400",
} as const;

// ============================================================================
// BACKGROUND STYLES
// ============================================================================

export const bg = {
  /** Subtle background */
  subtle: "bg-white/5",

  /** Light background */
  light: "bg-white/10",

  /** Medium background */
  medium: "bg-white/15",

  /** Strong background */
  strong: "bg-white/20",

  /** Highlight background */
  highlight: "bg-elec-yellow/10",
} as const;

// ============================================================================
// BORDER STYLES
// ============================================================================

export const border = {
  /** Subtle border */
  subtle: "border-white/10",

  /** Default border */
  default: "border-white/15",

  /** Strong border */
  strong: "border-white/20",

  /** Accent border */
  accent: "border-elec-yellow/30",
} as const;

// ============================================================================
// BUTTON STYLES
// ============================================================================

export const button = {
  /** Primary action button */
  primary: "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium",

  /** Secondary action button */
  secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20",

  /** Ghost/subtle button */
  ghost: "hover:bg-white/10 text-white/80 hover:text-white",

  /** Danger action button */
  danger: "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30",
} as const;

// ============================================================================
// MOBILE STYLES
// ============================================================================

export const mobile = {
  /** Minimum touch target size (44px) */
  touchTarget: "min-h-[44px] min-w-[44px]",

  /** Touch-friendly padding */
  touchPadding: "p-3 sm:p-4",

  /** Touch manipulation for better scrolling */
  touchAction: "touch-manipulation",
} as const;

// ============================================================================
// ANIMATION STYLES
// ============================================================================

export const animation = {
  /** Standard transition */
  transition: "transition-all duration-200",

  /** Fast transition */
  fast: "transition-all duration-150",

  /** Slow transition */
  slow: "transition-all duration-300",

  /** Scale on press */
  press: "active:scale-[0.98]",
} as const;

// ============================================================================
// INPUT STYLES
// ============================================================================

export const input = {
  /** Standard input field */
  base: "bg-white/5 border border-white/20 text-white placeholder:text-white/50 focus:border-elec-yellow/50 focus:ring-1 focus:ring-elec-yellow/30",

  /** Search input */
  search: "bg-white/5 border border-white/15 text-white placeholder:text-white/50 pl-10",
} as const;

// ============================================================================
// BADGE STYLES
// ============================================================================

export const badge = {
  /** Default badge */
  default: "bg-white/10 text-white/80 border border-white/20",

  /** Success badge */
  success: "bg-green-500/20 text-green-400 border border-green-500/30",

  /** Warning badge */
  warning: "bg-amber-500/20 text-amber-400 border border-amber-500/30",

  /** Error badge */
  error: "bg-red-500/20 text-red-400 border border-red-500/30",

  /** Info badge */
  info: "bg-blue-500/20 text-blue-400 border border-blue-500/30",

  /** Accent badge */
  accent: "bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30",
} as const;

// ============================================================================
// COMPOSITE STYLES
// ============================================================================

/** Pre-composed style combinations for common patterns */
export const composed = {
  /** Section container with standard spacing */
  section: "space-y-6 p-4 sm:p-6",

  /** Grid layout for cards */
  cardGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",

  /** Two-column grid */
  twoColumn: "grid grid-cols-1 md:grid-cols-2 gap-4",

  /** List with dividers */
  dividedList: "divide-y divide-white/10",

  /** Sticky header */
  stickyHeader: "sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10",
} as const;

// ============================================================================
// GN3 VERIFICATION STATUS STYLES
// ============================================================================

export const verification = {
  /** Verified content */
  verified: "bg-green-500/10 border-green-500/30 text-green-400",

  /** Unverified content */
  unverified: "bg-amber-500/10 border-amber-500/30 text-amber-400",

  /** Pending verification */
  pending: "bg-white/5 border-white/20 text-white/60",
} as const;

// ============================================================================
// EXPORT ALL
// ============================================================================

export const theme = {
  card,
  text,
  bg,
  border,
  button,
  mobile,
  animation,
  input,
  badge,
  composed,
  verification,
} as const;

export default theme;
