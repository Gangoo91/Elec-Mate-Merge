/**
 * usePlugInSolarSmartForm — ELE-1660
 *
 * The smart layer over the plug-in solar assessment: prefills, suggestions and
 * live validation of the readings.
 *
 * Two rules it keeps to, both learned elsewhere in this codebase:
 *
 *  1. **Suggest, never overwrite.** Everything here returns a suggestion the
 *     electrician can take or ignore. Nothing silently replaces a value they
 *     typed — a form that argues with its user gets abandoned.
 *  2. **Validate against the published limit, not a remembered one.** Zs comes
 *     from `src/data/zsLimits.ts`, the same table the other certificates use.
 *     No second copy of a number that BS 7671 owns.
 */

import { useCallback, useMemo } from 'react';
import { dnoForPostcode } from '@/data/dnoByPostcode';
import {
  checkZsCompliance,
  getMcbZsLimit,
  type DisconnectionTime,
  type MCBCurve,
} from '@/data/zsLimits';
import type { PlugInSolarData } from '@/types/plug-in-solar';

// ---------------------------------------------------------------------------
// Option sets — the things that should be a choice, not free text
// ---------------------------------------------------------------------------

export const PROPERTY_TYPE_OPTIONS = [
  { value: 'Flat', label: 'Flat' },
  { value: 'Maisonette', label: 'Maisonette' },
  { value: 'Terraced house', label: 'Terraced house' },
  { value: 'Semi-detached house', label: 'Semi-detached house' },
  { value: 'Detached house', label: 'Detached house' },
  { value: 'Bungalow', label: 'Bungalow' },
  { value: 'Park home', label: 'Park home' },
  { value: 'Other', label: 'Other' },
];

/** Common domestic final-circuit ratings. */
export const DEVICE_RATING_OPTIONS = [
  { value: '6 A', label: '6 A' },
  { value: '10 A', label: '10 A' },
  { value: '16 A', label: '16 A' },
  { value: '20 A', label: '20 A' },
  { value: '25 A', label: '25 A' },
  { value: '32 A', label: '32 A' },
  { value: '40 A', label: '40 A' },
];

export const MCB_CURVE_OPTIONS = [
  { value: 'typeB', label: 'Type B', description: 'Usual for domestic final circuits.' },
  { value: 'typeC', label: 'Type C', description: '' },
  { value: 'typeD', label: 'Type D', description: '' },
];

/**
 * BS 1362 fuse ratings found in a 13 A plug. The specification caps the
 * plug-in solar device at 5 A, so 13 A is offered only so the electrician can
 * record what is actually fitted — the assessment then flags it.
 */
export const PLUG_FUSE_OPTIONS = [
  { value: '3', label: '3 A' },
  { value: '5', label: '5 A', description: 'The maximum this route permits.' },
  { value: '13', label: '13 A', description: 'Above the permitted rating.' },
];

/** Ordered to lead with the spec's own examples (§3.8: balcony, ground, wall, fence). */
export const MOUNTING_ARRANGEMENT_OPTIONS = [
  { value: 'Balcony railing', label: 'Balcony railing' },
  { value: 'Ground-mounted frame', label: 'Ground-mounted frame' },
  { value: 'Wall-mounted', label: 'Wall-mounted' },
  { value: 'Fence-mounted', label: 'Fence-mounted' },
  { value: 'Flat roof ballasted', label: 'Flat roof ballasted' },
  { value: 'Pitched roof', label: 'Pitched roof' },
];

/** Spec §4.2.2 — how much of the DC side the consumer assembles. */
export const DEVICE_TYPE_OPTIONS = [
  {
    value: 'one-component',
    label: 'One-component',
    description: 'Single module with integrated inverter; DC side already made off.',
  },
  {
    value: 'two-component',
    label: 'Two-component',
    description: 'Module plus inverter; the user makes the DC connection.',
  },
  {
    value: 'multi-component',
    label: 'Multi-component',
    description: 'Up to four modules to one inverter; user-made DC connections.',
  },
  { value: 'unknown', label: 'Not established', description: '' },
];

/** Spec §4.2.3 — inside or outside the premises. */
export const LOCATION_OPTIONS = [
  { value: 'internal', label: 'Inside' },
  { value: 'external', label: 'Outside' },
  { value: 'unknown', label: 'Not established' },
];

/** Common outdoor accessory ratings. IP55 is the minimum where both are outside. */
export const SOCKET_IP_OPTIONS = [
  { value: '', label: 'Not marked / indoor socket', description: '' },
  { value: 'IP44', label: 'IP44', description: 'Below the outdoor minimum.' },
  { value: 'IP55', label: 'IP55', description: 'The minimum where both are outside.' },
  { value: 'IP65', label: 'IP65', description: '' },
  { value: 'IP66', label: 'IP66', description: '' },
];

export const RCD_RATING_OPTIONS = [
  { value: '30', label: '30 mA', description: 'Additional protection.' },
  { value: '100', label: '100 mA' },
  { value: '300', label: '300 mA' },
];

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export type CheckStatus = 'pass' | 'fail' | 'warning' | 'unknown';

export interface ReadingCheck {
  status: CheckStatus;
  message: string;
  /** The published limit the reading was judged against, where one applies. */
  limit?: string;
}

const parseRating = (v: string): number | null => {
  const n = parseFloat(String(v).replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) && n > 0 ? n : null;
};

export interface UsePlugInSolarSmartFormReturn {
  suggestedDno: { name: string; region: string } | null;
  /** True when the suggestion differs from what is recorded — offer, don't force. */
  dnoSuggestionAvailable: boolean;
  zsCheck: ReadingCheck;
  rcdTripCheck: ReadingCheck;
  plugFuseCheck: ReadingCheck;
}

export const usePlugInSolarSmartForm = (
  data: PlugInSolarData,
  curve: MCBCurve = 'typeB',
  disconnectionTime: DisconnectionTime = '0.4s',
): UsePlugInSolarSmartFormReturn => {
  const suggestedDno = useMemo(
    () => dnoForPostcode(data.installationPostcode),
    [data.installationPostcode],
  );

  /**
   * Zs at the socket-outlet against the maximum for the protective device.
   *
   * Judged on the BS 7671 tabulated value. Note this is the published limit,
   * not the 0.8 rule-of-thumb: the correction factor belongs to the person
   * interpreting the reading, and baking it in here would silently fail
   * circuits that comply.
   */
  const zsCheck = useMemo<ReadingCheck>(() => {
    const measured = parseRating(data.zsAtSocket);
    const rating = parseRating(data.protectiveDeviceRating);
    if (measured === null || rating === null) {
      return { status: 'unknown', message: 'Enter Zs and the device rating to check it.' };
    }
    const lookup = getMcbZsLimit(curve, rating, disconnectionTime);
    if (!lookup) {
      return {
        status: 'unknown',
        message: `No tabulated limit for a ${rating} A ${curve.replace('type', 'Type ')} device.`,
      };
    }
    const { compliant, marginPercent } = checkZsCompliance(measured, lookup.maxZs);
    const limit = `${lookup.maxZs} Ω max (${curve.replace('type', 'Type ')} ${rating} A, ${disconnectionTime})`;
    if (!compliant) {
      return { status: 'fail', message: `Above the maximum for this device.`, limit };
    }
    if (marginPercent < 20) {
      return { status: 'warning', message: 'Compliant, but with little margin.', limit };
    }
    return { status: 'pass', message: 'Within the maximum for this device.', limit };
  }, [data.zsAtSocket, data.protectiveDeviceRating, curve, disconnectionTime]);

  /**
   * RCD operating time at IΔn.
   *
   * BS 7671 Table 3A gives 300 ms as the maximum for a general-type RCD at
   * rated residual current; 40 ms applies at 5 IΔn, which is a different test
   * and is not what this field records.
   */
  const rcdTripCheck = useMemo<ReadingCheck>(() => {
    const ms = parseRating(data.rcdTripTimeMs);
    if (ms === null) return { status: 'unknown', message: '' };
    if (data.rcdType === 'none') {
      return { status: 'warning', message: 'No RCD recorded on this circuit.' };
    }
    if (ms > 300) {
      return {
        status: 'fail',
        message: 'Longer than the maximum operating time at IΔn.',
        limit: '300 ms max at IΔn',
      };
    }
    if (ms > 200) {
      return {
        status: 'warning',
        message: 'Within limits but slow for a modern device.',
        limit: '300 ms max at IΔn',
      };
    }
    return { status: 'pass', message: 'Satisfactory.', limit: '300 ms max at IΔn' };
  }, [data.rcdTripTimeMs, data.rcdType]);

  /** The plug fuse, against the 5 A the specification allows. */
  const plugFuseCheck = useMemo<ReadingCheck>(() => {
    const a = parseRating(data.plugFuseRatingA);
    if (a === null) return { status: 'unknown', message: '' };
    if (a > 5) {
      return {
        status: 'fail',
        message: 'Above the rating this route permits.',
        limit: '5 A max, BS 1362',
      };
    }
    return { status: 'pass', message: 'Within the permitted rating.', limit: '5 A max, BS 1362' };
  }, [data.plugFuseRatingA]);

  const dnoSuggestionAvailable = Boolean(
    suggestedDno && suggestedDno.name !== data.dnoName,
  );

  return { suggestedDno, dnoSuggestionAvailable, zsCheck, rcdTripCheck, plugFuseCheck };
};

/** Shared helper so the check styling is identical wherever it is rendered. */
export const checkTone = (status: CheckStatus): string => {
  switch (status) {
    case 'pass':
      return 'border-l-emerald-400';
    case 'warning':
      return 'border-l-elec-yellow';
    case 'fail':
      return 'border-l-red-500';
    default:
      return 'border-l-white/25';
  }
};

export const useDnoSuggestion = () => useCallback(dnoForPostcode, []);
