/**
 * React Query Configuration
 *
 * Centralized cache settings for different data types.
 * Import these presets in hooks for consistent caching.
 *
 * TUNING GUIDE:
 * - staleTime: How long data is considered "fresh" (won't refetch)
 * - gcTime: How long to keep data in cache after component unmounts
 */

// Time constants (milliseconds)
const SECONDS = 1000;
const MINUTES = 60 * SECONDS;

/**
 * Query presets for different data types
 */
export const QUERY_PRESETS = {
  /**
   * Real-time data that changes frequently
   * Dashboard stats, notifications, presence
   */
  REALTIME: {
    staleTime: 30 * SECONDS,
    gcTime: 2 * MINUTES,
  },

  /**
   * User-owned data that updates occasionally
   * Jobs, quotes, invoices, certificates
   */
  USER_DATA: {
    staleTime: 5 * MINUTES,
    gcTime: 10 * MINUTES,
  },

  /**
   * Reference data that rarely changes
   * User profile, company settings, pricing data
   */
  REFERENCE: {
    staleTime: 15 * MINUTES,
    gcTime: 30 * MINUTES,
  },

  /**
   * Static data that almost never changes
   * Materials list, course content, templates
   */
  STATIC: {
    staleTime: 30 * MINUTES,
    gcTime: 60 * MINUTES,
  },

  /**
   * Infinite scroll / paginated lists
   * Search results, activity logs
   */
  PAGINATED: {
    staleTime: 2 * MINUTES,
    gcTime: 5 * MINUTES,
  },
} as const;

/**
 * Default query options (applied globally in queryClient.ts)
 */
export const DEFAULT_QUERY_OPTIONS = {
  staleTime: QUERY_PRESETS.USER_DATA.staleTime,
  gcTime: QUERY_PRESETS.USER_DATA.gcTime,
  retry: 2,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  refetchOnMount: 'always' as const, // Always check if stale on mount
};

/**
 * Default mutation options
 */
export const DEFAULT_MUTATION_OPTIONS = {
  retry: 1,
};

/**
 * Specific query keys (for consistent invalidation)
 */
export const QUERY_KEYS = {
  // User & Auth
  USER_PROFILE: ['user-profile'] as const,
  SUBSCRIPTION: ['subscription'] as const,

  // Business
  JOBS: ['employer-jobs'] as const,
  QUOTES: ['quotes'] as const,
  INVOICES: ['invoices'] as const,

  // Certificates
  REPORTS: ['reports'] as const,
  CERTIFICATES: ['certificates'] as const,

  // Dashboard
  DASHBOARD: ['dashboard'] as const,
  NOTIFICATIONS: ['notifications'] as const,

  // Team
  EMPLOYEES: ['employees'] as const,
  BRIEFINGS: ['briefings'] as const,

  // Learning
  STUDY_STREAK: ['study-streak'] as const,
  COURSES: ['courses'] as const,
} as const;

/**
 * Helper to create query options with a preset
 */
export function withPreset<T extends keyof typeof QUERY_PRESETS>(
  preset: T,
  overrides?: Partial<typeof QUERY_PRESETS[T]>
) {
  return {
    ...QUERY_PRESETS[preset],
    ...overrides,
  };
}
