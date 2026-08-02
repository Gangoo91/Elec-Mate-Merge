import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { reportCloud, type CloudReport, type ReportType } from '@/utils/reportCloud';
import type { TestResult } from '@/types/testResult';

/**
 * Fields copied forward from a previous cert at the same installation address.
 * Per cert type — keeps the copy targeted (no signatures, no client/personal
 * data — only supply + earthing + property particulars that are truly
 * per-property). EICR additionally offers a circuit skeleton (schedule of
 * tests with every reading stripped) as a separate, opt-in action.
 */
const LAST_CERT_FIELDS: Record<ReportType, string[]> = {
  eic: [
    'supplyVoltage',
    'supplyFrequency',
    'phases',
    'supplyPhases',
    'earthingArrangement',
    'Ze',
    'prospectiveFaultCurrent',
    'pfc',
    'bsAmendment',
    'mainProtectiveDevice',
    'mainSwitchRating',
  ],
  eicr: [
    'supplyVoltage',
    'supplyFrequency',
    'phases',
    'supplyPhases',
    'earthingArrangement',
    'Ze',
    'prospectiveFaultCurrent',
    'pfc',
    'bsAmendment',
    'mainProtectiveDevice',
    'mainSwitchRating',
    // Property particulars — stable across periodic re-inspections
    'propertyType',
    'numberOfBedrooms',
    'estimatedAge',
    'ageUnit',
    'description',
    // Earthing & bonding conductors — material/CSA/locations are property facts
    'mainEarthingConductorType',
    'mainEarthingConductorSize',
    'mainEarthingConductorSizeCustom',
    'mainBondingConductorType',
    'mainBondingSize',
    'mainBondingSizeCustom',
    'mainBondingLocations',
    // Distribution boards — make/location/ways/main switch are property facts
    'distributionBoards',
  ],
  'minor-works': [
    'supplyVoltage',
    'supplyPhases',
    'earthingArrangement',
    'zdb',
    'bsAmendmentDate',
    'earthingConductorPresent',
    'earthingConductorSize',
  ],
  // Other cert types not yet wired for last-cert prefill
  'ev-charging': [],
  'fire-alarm': [],
  'fire-alarm-design': [],
  'fire-alarm-commissioning': [],
  'fire-alarm-inspection': [],
  'fire-alarm-modification': [],
  'emergency-lighting': [],
  'pat-testing': [],
  'solar-pv': [],
  'danger-notice': [],
  'isolation-cert': [],
  'permit-to-work': [],
  'warning-labels': [],
  'safe-isolation': [],
  'limitation-notice': [],
  'non-compliance-notice': [],
  'completion-notice': [],
  disconnection: [],
  bess: [],
  'lightning-protection': [],
  'g98-commissioning': [],
  'g99-commissioning': [],
  'smoke-co-alarm': [],
  'testing-only': [],
};

export interface LastCertSuggestion {
  reportId: string;
  certNumber?: string;
  date: string;
  certType: ReportType;
  fields: Record<string, unknown>;
  /**
   * EICR only — the previous cert's schedule of tests, offered as an opt-in
   * circuit skeleton (structure kept, readings stripped on apply).
   */
  scheduleOfTests?: TestResult[];
}

export interface UseCertPrefillResult {
  suggestion: LastCertSuggestion | null;
  isLoading: boolean;
  /** Returns the field patch the caller should merge into form state. */
  buildPatch: () => Record<string, unknown>;
  /**
   * EICR only — returns the previous cert's schedule of tests with every
   * reading/test-outcome field stripped and fresh row ids. Structure survives:
   * descriptions, device BS/type/rating, cable sizes, wiring type, reference
   * method, maxZs, board association. Empty array when nothing to copy.
   */
  buildCircuitSkeleton: () => TestResult[];
  /** Hides the prompt until the user navigates away + back. */
  dismiss: () => void;
}

/**
 * Reading / per-visit test-outcome fields blanked when copying a circuit
 * skeleton forward. Everything NOT listed here is circuit structure and
 * survives the copy.
 */
const CIRCUIT_READING_FIELDS: (keyof TestResult)[] = [
  // Continuity
  'r1r2',
  'r2',
  'ringContinuityLive',
  'ringContinuityNeutral',
  'ringR1',
  'ringRn',
  'ringR2',
  // Insulation resistance
  'insulationTestVoltage',
  'insulationLiveNeutral',
  'insulationLiveEarth',
  'insulationResistance',
  'insulationNeutralEarth',
  // Polarity / loop impedance
  'polarity',
  'zs',
  // RCD tests
  'rcdOneX',
  'rcdHalfX',
  'rcdFiveX',
  'rcdTestButton',
  'afddTest',
  // Prospective fault current
  'pfc',
  'pfcLiveNeutral',
  'pfcLiveEarth',
  // Functional / three-phase measurements
  'functionalTesting',
  'phaseRotation',
  'phaseBalanceL1',
  'phaseBalanceL2',
  'phaseBalanceL3',
  'lineToLineVoltage',
  // Per-visit remarks
  'notes',
];

/** Strip readings from a copied schedule row and give it a fresh id. */
const toCircuitSkeleton = (row: TestResult, index: number): TestResult => {
  const clone = structuredClone(row);
  for (const key of CIRCUIT_READING_FIELDS) {
    if (clone[key] !== undefined) {
      // All reading fields are string-typed on TestResult.
      (clone as Record<string, unknown>)[key] = '';
    }
  }
  clone.id = `circuit-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`;
  clone.autoFilled = false;
  return clone;
};

/**
 * useCertPrefill — looks up the user's most recent completed cert at the same
 * installation address and exposes a soft-apply patch.
 *
 * Soft-apply contract: the caller decides when (and whether) to merge. We never
 * write to form state from inside the hook. The prompt UI is the user's
 * consent gate.
 */
export function useCertPrefill(
  address: string | undefined,
  certType: ReportType,
  options?: { excludeReportId?: string; enabled?: boolean }
): UseCertPrefillResult {
  const [suggestion, setSuggestion] = useState<LastCertSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const enabled = options?.enabled !== false;
    if (!enabled || dismissed || !address || address.trim().length < 6) {
      setSuggestion(null);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          if (!cancelled) setSuggestion(null);
          return;
        }

        const cert: CloudReport | null = await reportCloud.getLastCertificateAtAddress(
          user.id,
          address,
          certType,
          options?.excludeReportId
        );

        if (cancelled) return;

        if (!cert) {
          setSuggestion(null);
          return;
        }

        const relevantKeys = LAST_CERT_FIELDS[certType] || [];
        const fields: Record<string, unknown> = {};
        for (const key of relevantKeys) {
          const v = (cert.data as Record<string, unknown>)[key];
          if (v === undefined || v === null || v === '') continue;
          if (Array.isArray(v) && v.length === 0) continue;
          fields[key] = v;
        }

        // EICR — carry the previous schedule of tests so the form can offer a
        // circuit-skeleton copy (readings stripped on apply, never here).
        const prevSchedule =
          certType === 'eicr' ? (cert.data as Record<string, unknown>).scheduleOfTests : undefined;
        const scheduleOfTests =
          Array.isArray(prevSchedule) && prevSchedule.length > 0
            ? (prevSchedule as TestResult[])
            : undefined;

        if (Object.keys(fields).length === 0) {
          setSuggestion(null);
          return;
        }

        setSuggestion({
          reportId: cert.report_id,
          certNumber: cert.certificate_number,
          date: cert.inspection_date || cert.updated_at,
          certType: cert.report_type,
          fields,
          scheduleOfTests,
        });
      } catch (error) {
        console.warn('[useCertPrefill] lookup failed:', error);
        if (!cancelled) setSuggestion(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [address, certType, options?.excludeReportId, options?.enabled, dismissed]);

  return {
    suggestion,
    isLoading,
    // Deep-clone so array/object fields (e.g. distributionBoards) never share
    // references between the suggestion state and the live form state.
    buildPatch: () => (suggestion?.fields ? structuredClone(suggestion.fields) : {}),
    buildCircuitSkeleton: () => (suggestion?.scheduleOfTests || []).map(toCircuitSkeleton),
    dismiss: () => setDismissed(true),
  };
}
