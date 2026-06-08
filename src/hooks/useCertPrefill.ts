import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { reportCloud, type CloudReport, type ReportType } from '@/utils/reportCloud';

/**
 * Fields copied forward from a previous cert at the same installation address.
 * Per cert type — keeps the copy targeted (no schedule of tests, no signatures,
 * no client/personal data — only supply + earthing + BS amendment that's
 * truly per-property).
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
}

export interface UseCertPrefillResult {
  suggestion: LastCertSuggestion | null;
  isLoading: boolean;
  /** Returns the field patch the caller should merge into form state. */
  buildPatch: () => Record<string, unknown>;
  /** Hides the prompt until the user navigates away + back. */
  dismiss: () => void;
}

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
          if (v !== undefined && v !== null && v !== '') {
            fields[key] = v;
          }
        }

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
    buildPatch: () => suggestion?.fields || {},
    dismiss: () => setDismissed(true),
  };
}
