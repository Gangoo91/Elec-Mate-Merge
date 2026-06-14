/**
 * UK National Minimum Wage / National Living Wage — single source of truth.
 *
 * Pay figures are the most time-sensitive content in the funding guide.
 * Pin every surface that quotes a statutory hourly rate to these constants
 * and update them once each April (when the Low Pay Commission uplift takes
 * effect) so every page moves together.
 *
 * Source: gov.uk National Minimum Wage rates + Low Pay Commission 2026
 * uprating report. Government accepted the LPC recommendations in full.
 * Effective 1 April 2026.
 */

export const NMW_EFFECTIVE_FROM = '1 April 2026';
export const NMW_EFFECTIVE_LABEL = 'April 2026';

export const NMW_RATES = {
  /** Apprentice rate — first year of any apprenticeship, or any apprentice aged under 19. */
  apprentice: '£8.00',
  /** Development rate — workers aged 18 to 20. */
  age18to20: '£10.85',
  /** National Living Wage — workers aged 21 and over. */
  age21Plus: '£12.71',
} as const;
