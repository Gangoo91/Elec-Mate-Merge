/**
 * Gap #10: one source for insurance and prequal.
 *
 * The public liability policy and the competent person scheme (NICEIC,
 * NAPIT...) live in ONE place, the firm's Settings record (company_profiles),
 * because certificates, quotes and the quote page already read them there.
 * The compliance register shows that record and edits it in place; its
 * certificate file is a register row marked certificate_for. Every other
 * cover (employers' liability, professional indemnity...) and every prequal
 * accreditation (CHAS, SafeContractor, Constructionline...) lives on the
 * register. get_firm_credentials returns both; this file turns the Settings
 * rows into register-shaped documents so every reader (Insurance panel,
 * readiness, assessment pack, Send our pack, tender answers) uses one list.
 */
import type { ComplianceDocument, InsuranceKind } from '@/hooks/useComplianceDocuments';

export interface FirmCredential {
  source: 'register' | 'settings';
  /** Register row id; for a Settings row, the row holding its certificate. */
  document_id: string | null;
  area: 'insurance' | 'accreditation';
  kind: string;
  title: string | null;
  provider: string | null;
  reference: string | null;
  cover_amount: number | null;
  cover_text: string | null;
  expiry: string | null;
  has_file: boolean;
  file_url: string | null;
  status: string | null;
  updated_at: string | null;
}

export const SETTINGS_INSURANCE_ID = 'settings:insurance';
export const SETTINGS_SCHEME_ID = 'settings:scheme';

export const isSettingsDoc = (d?: Pick<ComplianceDocument, 'id'> | null) =>
  !!d && d.id.startsWith('settings:');

/** Competent person schemes: the list Settings' scheme picker offers. */
export const CPS_ACCREDITATIONS: { value: string; label: string }[] = [
  { value: 'niceic', label: 'NICEIC' },
  { value: 'napit', label: 'NAPIT' },
  { value: 'elecsa', label: 'ELECSA' },
  { value: 'stroma', label: 'Stroma' },
  { value: 'oftec', label: 'OFTEC' },
  { value: 'besca', label: 'BESCA' },
  { value: 'bre', label: 'BRE' },
  { value: 'other_scheme', label: 'Another competent person scheme' },
];

/** What main contractors and tender portals ask for. */
export const PREQUAL_ACCREDITATIONS: { value: string; label: string; hint: string }[] = [
  { value: 'chas', label: 'CHAS', hint: 'SSIP member scheme' },
  { value: 'safecontractor', label: 'SafeContractor', hint: 'SSIP member scheme' },
  { value: 'constructionline', label: 'Constructionline', hint: 'Silver, Gold or Platinum' },
  { value: 'smas', label: 'SMAS Worksafe', hint: 'SSIP member scheme' },
  { value: 'acclaim', label: 'Acclaim', hint: 'SSIP member scheme' },
  { value: 'iso9001', label: 'ISO 9001', hint: 'Quality management' },
  { value: 'iso45001', label: 'ISO 45001', hint: 'Health and safety management' },
  { value: 'other', label: 'Other accreditation', hint: '' },
];

export const isCps = (a?: string | null) => !!a && CPS_ACCREDITATIONS.some((x) => x.value === a);

export const accreditationLabel = (a?: string | null) =>
  [...CPS_ACCREDITATIONS, ...PREQUAL_ACCREDITATIONS].find((x) => x.value === a)?.label ??
  'Accreditation';

/** Settings' scheme value (NICEIC, napit, other...) to the register's. */
export function schemeAccreditation(scheme?: string | null): string | null {
  const s = (scheme ?? '').trim().toUpperCase();
  if (!s || s === 'NONE') return null;
  const hit = CPS_ACCREDITATIONS.find(
    (x) => x.label.toUpperCase() === s || x.value === s.toLowerCase()
  );
  return hit ? hit.value : 'other_scheme';
}

/** The Settings rows as register-shaped documents. */
export function settingsDocuments(creds: FirmCredential[], firmId: string): ComplianceDocument[] {
  return creds
    .filter((c) => c.source === 'settings')
    .map((c) => {
      const ins = c.area === 'insurance';
      const stamp = c.updated_at ?? new Date(0).toISOString();
      return {
        id: ins ? SETTINGS_INSURANCE_ID : SETTINGS_SCHEME_ID,
        user_id: firmId,
        title: ins
          ? 'Public liability insurance'
          : `${c.kind === 'other_scheme' ? 'Scheme' : (c.provider ?? 'Scheme')} registration`,
        document_type: 'Certificate',
        category: ins ? 'Insurance' : 'Accreditation',
        status: 'Current',
        expiry_date: c.expiry ?? undefined,
        signatures_required: 0,
        signatures_collected: 0,
        file_url: c.file_url ?? undefined,
        insurance_kind: ins ? ('public_liability' as InsuranceKind) : null,
        accreditation: ins ? null : c.kind,
        insurer: c.provider,
        policy_number: c.reference,
        cover_amount: c.cover_amount,
        cover_text: c.cover_text,
        source: 'settings',
        certificate_id: c.document_id,
        created_at: stamp,
        updated_at: stamp,
      } satisfies ComplianceDocument;
    });
}

/** The register (without certificate-only rows) plus the Settings record:
 *  the one list every insurance and prequal reader works from. */
export function mergeCredentials(
  register: ComplianceDocument[],
  creds: FirmCredential[] | undefined,
  firmId: string
): ComplianceDocument[] {
  return [...settingsDocuments(creds ?? [], firmId), ...register.filter((d) => !d.certificate_for)];
}

/** "£2,000,000" for Settings' coverage field from a typed limit. */
export const coverText = (n: number | null) =>
  n == null ? null : `£${Math.round(n).toLocaleString('en-GB')}`;
