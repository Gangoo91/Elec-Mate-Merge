import {
  acceptedFindings,
  sortFindings,
  severityCounts,
  SURVEY_LIMITATIONS,
  AI_ASSISTANCE_NOTE,
  type PrePurchaseSurveyFormData,
  type SurveySeverity,
} from '@/types/pre-purchase-survey';

/**
 * Builds the PDFMonkey payload for the pre-purchase survey (ELE-1634).
 *
 * Feeds the SAME template as the Visual Condition Report
 * (`744570cf-cc77-4c94-8660-a2d2a1f0c506`), which was patched to render either
 * document from the flags below. The template is the source of truth for this
 * contract and there is no repo copy — fetch it before changing anything here.
 *
 * ── 🔴 `outcome.is_survey` IS A SAFETY FLAG, NOT A STYLE SWITCH ───────────
 * It suppresses the SATISFACTORY / UNSATISFACTORY badge, the C1/C2/C3/FI
 * counts and the EICR code key. Those belong to a condition report, and a
 * buyer who sees "SATISFACTORY" at the top of a document will believe the
 * installation has been passed by someone. Nothing was tested. If this flag
 * ever stops being sent, the survey silently starts printing an EICR verdict —
 * so it is set unconditionally, from a literal, and never from form state.
 *
 * ── 🔴 ONLY ACCEPTED FINDINGS ARE PUBLISHED ──────────────────────────────
 * `acceptedFindings()` is applied here as well as in the UI. This is the last
 * gate before a document reaches a client, and it is deliberately duplicated:
 * an unreviewed AI note must not be printable by any path.
 */

interface CompanyProfileLike {
  company_name?: string | null;
  company_address?: string | null;
  company_postcode?: string | null;
  company_phone?: string | null;
  company_email?: string | null;
  company_website?: string | null;
  logo_url?: string | null;
  logo_data_url?: string | null;
  primary_color?: string | null;
  accent_color?: string | null;
  registration_scheme?: string | null;
  registration_number?: string | null;
  registration_scheme_logo?: string | null;
  scheme_logo_data_url?: string | null;
}

const s = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

/**
 * Short labels for the narrow code column. The full sentence is in the key
 * printed beneath the table — see the `codekey` patch on the template.
 */
const SEVERITY_CODE: Record<SurveySeverity, string> = {
  urgent: 'Urgent',
  attention: 'Attention',
  ageing: 'Ageing',
  acceptable: 'Noted',
  unclear: 'Unclear',
};

/*
 * Inline, because the template's SCSS has classes for k-c1..k-fi only and the
 * audit function cannot patch SCSS. Kept legible in print: white on the two
 * dark fills, black on the two light ones.
 */
const SEVERITY_STYLE: Record<SurveySeverity, string> = {
  urgent: 'background:#B3261E;color:#fff;',
  attention: 'background:#E06C00;color:#fff;',
  ageing: 'background:#F5C400;color:#111;',
  acceptable: 'background:#1E7A46;color:#fff;',
  unclear: 'background:#5A6472;color:#fff;',
};

const PROPERTY_LABEL: Record<string, string> = {
  house: 'House',
  flat: 'Flat',
  bungalow: 'Bungalow',
  commercial: 'Commercial',
  other: 'Other',
};

const ukDate = (iso: string): string => {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

export function formatPrePurchaseSurveyJson(
  form: PrePurchaseSurveyFormData,
  company?: CompanyProfileLike | null
) {
  const logo = s(company?.logo_data_url) || s(company?.logo_url);
  const schemeLogo = s(company?.scheme_logo_data_url) || s(company?.registration_scheme_logo);

  /* 🔴 The gate, then worst-first so a buyer reads what matters at the top. */
  const published = sortFindings(acceptedFindings(form.findings));

  const observations = published.map((f, idx) => ({
    number: String(idx + 1),
    location: s(f.location),
    /*
     * "What it is" leads, then what it means. The photograph is directly
     * beneath, so the reader sees the thing and the explanation together.
     */
    description: [s(f.identifiedAs), s(f.note)].filter(Boolean).join(' — '),
    code: SEVERITY_CODE[f.severity] ?? '',
    code_style: SEVERITY_STYLE[f.severity] ?? '',
    photos: f.photoUrl ? [{ src: f.photoUrl }] : [],
    has_photos: !!f.photoUrl,
    photo_count: f.photoUrl ? 1 : 0,
  }));

  /* Only the severities actually present — a row of zeroes tells nobody anything. */
  const counts = severityCounts(published);
  const severity_counts = (
    ['urgent', 'attention', 'ageing', 'acceptable', 'unclear'] as SurveySeverity[]
  )
    .filter((k) => counts[k] > 0)
    .map((k) => ({
      label: SEVERITY_CODE[k],
      count: counts[k],
      style: SEVERITY_STYLE[k],
    }));

  /*
   * The disclosure prints only when the AI was actually involved — claiming
   * software assistance on a report written entirely by hand would be as
   * inaccurate as concealing it on one that was not.
   */
  const usedAi = published.some((f) => !!f.aiAnalysis);

  return {
    company: {
      name: s(company?.company_name),
      logo_url: logo,
      address: s(company?.company_address),
      postcode: s(company?.company_postcode),
      phone: s(company?.company_phone),
      email: s(company?.company_email),
      website: s(company?.company_website),
      primary_color: s(company?.primary_color) || '#0C1B2A',
      accent_color: s(company?.accent_color) || s(company?.primary_color) || '#0C1B2A',
      registration_scheme: s(company?.registration_scheme),
      registration_number: s(company?.registration_number),
      scheme_logo_url: schemeLogo,
    },
    metadata: {
      certificate_number: s(form.certificateNumber),
      inspection_date: ukDate(form.surveyDate),
      generated_date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      /* ── Template label overrides. VCR sends none of these. ───────────── */
      doc_title: 'Pre-Purchase Electrical Survey',
      doc_subtitle: 'Advisory visual survey — not an EICR',
      observations_title: 'What was seen',
      observation_label: 'Finding',
      code_label: 'Priority',
      condition_label: 'Summary',
      date_label: 'Surveyed',
      signed_label: 'Surveyed by',
    },
    client: {
      name: s(form.clientName),
      address: s(form.clientAddress),
      phone: s(form.clientPhone),
      email: s(form.clientEmail),
      occupier: '',
    },
    installation: {
      address: s(form.installationAddress),
      premises_type: PROPERTY_LABEL[s(form.propertyType)] ?? s(form.propertyType),
      /*
       * 🔴 Every supply and board field is EMPTY, deliberately.
       *
       * Nothing was opened, isolated or measured. Printing an earthing
       * arrangement or a main switch rating would state a characteristic of the
       * installation that nobody established — on a document whose whole point
       * is that it is limited to what could be seen. `approximate_age` is the
       * one exception, because it is the buyer's own information.
       */
      premises_age: s(form.approximateAge),
      supply_type: '',
      main_switch_rating: '',
      earthing_arrangement: '',
      board_location: '',
      board_make: '',
      number_of_ways: '',
      rcd_protection: '',
    },
    scope: {
      purpose: s(form.purpose),
      extent: s(form.extent),
      limitations: s(form.limitations),
      /* 🔴 Always sent, never user-editable. See SURVEY_LIMITATIONS. */
      standard_limitations: SURVEY_LIMITATIONS,
      /* 🔴 Prints beneath the limitations whenever the AI drafted anything. */
      ai_note: usedAi ? AI_ASSISTANCE_NOTE : '',
      not_seen: [],
      has_not_seen: false,
    },
    /*
     * 🔴 EMPTY, and that is what suppresses the 23-item schedule — the template
     * wraps that section in `{% if inspection != blank %}`. A survey has no
     * schedule of inspection; it has photographs.
     */
    inspection: [],
    observations,
    has_observations: observations.length > 0,
    outcome: {
      /* 🔴 See the header. Suppresses the verdict, the counts and the code key. */
      is_survey: true,
      severity_counts,
      /*
       * Sent but never rendered on a survey — the template reads them only
       * inside `{% unless outcome.is_survey %}`. Present so the shape of the
       * payload stays the same for both documents.
       */
      assessment: '',
      is_satisfactory: false,
      counts: { c1: 0, c2: 0, c3: 0, fi: 0 },
      general_condition: s(form.summary),
      recommendations: s(form.recommendations),
      next_inspection_date: '',
    },
    inspector: {
      name: s(form.surveyorName),
      position: s(form.surveyorPosition),
      signature: s(form.surveyorSignature),
      date: ukDate(form.surveyDate),
      company: s(form.companyName) || s(company?.company_name),
    },
  };
}

export default formatPrePurchaseSurveyJson;
