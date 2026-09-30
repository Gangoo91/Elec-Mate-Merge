import { useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { reportCloud, type CloudReport, type ReportType } from '@/utils/reportCloud';
import type { TestResult } from '@/types/testResult';
import { normaliseEarthingArrangement } from '@/utils/earthingArrangement';

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
  /*
   * A board schedule prefills nothing from a previous certificate. It has its
   * own, far better mechanism — "Import from certificate" pulls the actual
   * circuits, devices, cable sizes and Zs from a chosen cert rather than
   * copying a handful of supply fields forward (ELE-1615).
   */
  'board-schedule': [],
  /*
   * A visual condition report DOES benefit from prefill: the supply and
   * earthing particulars are properties of the premises, not of the visit,
   * and copying them forward saves reading them off the board again.
   */
  'visual-condition': ['earthingArrangement', 'mainSwitchRating', 'boardLocation', 'boardMake', 'supplyType'],
  /*
   * 🔴 Deliberately empty (ELE-1634).
   *
   * A pre-purchase survey records no supply or board particulars at all —
   * nothing is opened, isolated or measured, and the PDF prints those fields
   * blank on purpose. Copying an earthing arrangement forward from an earlier
   * certificate would put a characteristic on the survey that the surveyor
   * never established, which is the one thing this document must not do.
   */
  'pre-purchase-survey': [],
  /*
   * Premises particulars only. Nothing about the visit itself carries over —
   * the whole value of a maintenance report is that it records THIS visit, and
   * a copied thermal finding or torque setting would be a fabrication.
   */
  'routine-inspection': ['premisesType', 'supplyType', 'boardsCovered'],
  /*
   * ⚠️ These two were MISSING, which made `Record<ReportType, string[]>` a
   * standing type error rather than the exhaustive map it is declared to be —
   * so the compiler had stopped policing this list at all. Empty arrays keep
   * the existing behaviour (no prefill) while restoring the check.
   */
  'heat-pump': [],
  'fire-alarm-log-book': [],
};

/**
 * What each copied key is called on the prompt. Several keys describe one
 * thing (type + size + custom size of a conductor), so labels repeat and the
 * card de-duplicates them: "fills premises type and bonding conductor".
 */
const LAST_CERT_FIELD_LABELS: Record<string, string> = {
  supplyVoltage: 'supply voltage',
  supplyFrequency: 'frequency',
  phases: 'phases',
  supplyPhases: 'phases',
  earthingArrangement: 'earthing arrangement',
  Ze: 'Ze',
  zdb: 'Zdb',
  prospectiveFaultCurrent: 'PFC',
  pfc: 'PFC',
  bsAmendment: 'BS 7671 edition',
  bsAmendmentDate: 'BS 7671 edition',
  mainProtectiveDevice: 'main protective device',
  mainSwitchRating: 'main switch rating',
  propertyType: 'property type',
  numberOfBedrooms: 'bedrooms',
  estimatedAge: 'installation age',
  ageUnit: 'installation age',
  description: 'premises type',
  mainEarthingConductorType: 'earthing conductor',
  mainEarthingConductorSize: 'earthing conductor',
  mainEarthingConductorSizeCustom: 'earthing conductor',
  earthingConductorPresent: 'earthing conductor',
  earthingConductorSize: 'earthing conductor',
  mainBondingConductorType: 'bonding conductor',
  mainBondingSize: 'bonding conductor',
  mainBondingSizeCustom: 'bonding conductor',
  mainBondingLocations: 'bonding locations',
  distributionBoards: 'distribution boards',
  premisesType: 'premises type',
  supplyType: 'supply type',
  boardsCovered: 'boards covered',
  boardLocation: 'board location',
  boardMake: 'board make',
};

/** De-duplicated, in field order — what the prompt will fill on this cert. */
export const describeLastCertFields = (fields: Record<string, unknown>): string[] => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const key of Object.keys(fields)) {
    const label = LAST_CERT_FIELD_LABELS[key] ?? key.replace(/([A-Z])/g, ' $1').toLowerCase().trim();
    if (seen.has(label)) continue;
    seen.add(label);
    out.push(label);
  }
  return out;
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
  /** Hides the prompt for this certificate — remembered across reloads. */
  dismiss: () => void;
}

export interface UseCertPrefillOptions {
  excludeReportId?: string;
  enabled?: boolean;
  /**
   * The certificate being filled in. When supplied, only fields that are still
   * blank on it are offered — a cert that already has its supply and earthing
   * recorded gets no prompt at all, and "Copy details" never overwrites a
   * value the user has typed.
   */
  currentData?: Record<string, unknown>;
  /**
   * Values a brand-new certificate starts with (e.g. the EICR seeds 230 V /
   * 50 Hz / 1 phase / TN-C-S). A field still holding its seed counts as blank,
   * so a previous TT supply is still offered over the seeded TN-C-S.
   */
  untouchedValues?: Record<string, unknown>;
  /**
   * Saved report id — keys the remembered dismissal. Before the first save the
   * dismissal is keyed by address + cert type instead, and both keys are
   * checked, so "No thanks" survives the cert acquiring an id.
   */
  reportId?: string;
}

const DISMISS_PREFIX = 'elec-mate:cert-prefill:dismissed:';
/**
 * The address-keyed dismissal is only a bridge for a cert that has not been
 * saved yet (no id). It lapses after a day so a NEW cert at the same address
 * next week is offered the prompt again; the report-keyed one is for life.
 */
const ADDRESS_DISMISS_TTL_MS = 24 * 60 * 60 * 1000;

const dismissKeys = (certType: string, address: string, reportId?: string): string[] => {
  const keys = [`${DISMISS_PREFIX}${certType}:${address.trim().toLowerCase()}`];
  if (reportId) keys.unshift(`${DISMISS_PREFIX}${reportId}`);
  return keys;
};

const isReportKey = (key: string) => !/^elec-mate:cert-prefill:dismissed:[a-z-]+:/.test(key);

const readDismissed = (keys: string[]): boolean => {
  try {
    return keys.some((k) => {
      const raw = window.localStorage.getItem(k);
      if (!raw) return false;
      if (isReportKey(k)) return true;
      const at = Number(raw);
      return Number.isFinite(at) && Date.now() - at < ADDRESS_DISMISS_TTL_MS;
    });
  } catch {
    return false;
  }
};

const writeDismissed = (keys: string[]) => {
  try {
    keys.forEach((k) => window.localStorage.setItem(k, String(Date.now())));
  } catch {
    /* private mode / quota — the in-memory flag still hides it for this visit */
  }
};

const isBlank = (v: unknown): boolean =>
  v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);

/**
 * "Same value" per key. Earthing is stored in several spellings ("TN-C-S",
 * "TN-C-S (PME)", "tncs"), and offering one spelling over another would be
 * an empty gesture — the form canonicalises on read anyway.
 */
const sameValue = (key: string, a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (key === 'earthingArrangement' && typeof a === 'string' && typeof b === 'string') {
    return normaliseEarthingArrangement(a) === normaliseEarthingArrangement(b);
  }
  return false;
};

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
      (clone as unknown as Record<string, unknown>)[key] = '';
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
  options?: UseCertPrefillOptions
): UseCertPrefillResult {
  // The previous cert's fields as found — filtered against the current cert
  // below, so a keystroke on the form never triggers another lookup.
  const [found, setFound] = useState<LastCertSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const keys = dismissKeys(certType, address || '', options?.reportId);
  const keysSignature = keys.join('|');
  // Dismissals made this visit, by key — the fallback when storage is
  // unavailable, and the reason a dismissal never leaks from one cert to the
  // next when the form stays mounted and simply loads a different report.
  const dismissedThisVisit = useRef(new Set<string>());
  const [dismissed, setDismissed] = useState(() => readDismissed(keys));

  // Re-read whenever the cert changes identity: acquires an id on first save,
  // gets an address, or the form loads another report.
  useEffect(() => {
    setDismissed(readDismissed(keys) || dismissedThisVisit.current.has(keysSignature));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keysSignature]);

  useEffect(() => {
    const enabled = options?.enabled !== false;
    if (!enabled || dismissed || !address || address.trim().length < 6) {
      setFound(null);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          if (!cancelled) setFound(null);
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
          setFound(null);
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
          setFound(null);
          return;
        }

        setFound({
          reportId: cert.report_id,
          certNumber: cert.certificate_number,
          date: cert.inspection_date || cert.updated_at,
          certType: cert.report_type,
          fields,
          scheduleOfTests,
        });
      } catch (error) {
        console.warn('[useCertPrefill] lookup failed:', error);
        if (!cancelled) setFound(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [address, certType, options?.excludeReportId, options?.enabled, dismissed]);

  // Offer only what the current cert has not got. A value still equal to its
  // new-cert seed counts as not got; a value equal to the previous cert's is
  // nothing to copy. No current data supplied → offer everything found.
  const currentData = options?.currentData;
  const untouched = options?.untouchedValues;
  const suggestion = useMemo<LastCertSuggestion | null>(() => {
    if (!found) return null;
    if (!currentData) return found;
    const fields: Record<string, unknown> = {};
    for (const [key, prev] of Object.entries(found.fields)) {
      const cur = currentData[key];
      // Boards carry ids the schedule rows point at. Offer them only to a
      // cert with no schedule at all — copying two boards onto a cert whose
      // eight circuits already sit on its own board left it showing three
      // (seen on the test cert, 30 Sep 2026).
      if (key === 'distributionBoards' && !isBlank(currentData.scheduleOfTests)) continue;
      const untouchedHere =
        isBlank(cur) || (untouched !== undefined && key in untouched && sameValue(key, cur, untouched[key]));
      if (!untouchedHere) continue;
      if (sameValue(key, cur, prev)) continue;
      fields[key] = prev;
    }
    if (Object.keys(fields).length === 0) return null;
    return { ...found, fields };
  }, [found, currentData, untouched]);

  return {
    suggestion,
    isLoading,
    // Deep-clone so array/object fields (e.g. distributionBoards) never share
    // references between the suggestion state and the live form state.
    buildPatch: () => (suggestion?.fields ? structuredClone(suggestion.fields) : {}),
    buildCircuitSkeleton: () => (suggestion?.scheduleOfTests || []).map(toCircuitSkeleton),
    dismiss: () => {
      dismissedThisVisit.current.add(keysSignature);
      writeDismissed(keys);
      setDismissed(true);
    },
  };
}
