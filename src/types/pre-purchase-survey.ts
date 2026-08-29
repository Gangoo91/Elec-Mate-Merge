/**
 * Pre-purchase electrical survey (ELE-1634).
 *
 * Alex: *"Survayance work for a client looking to buy a house… photo of a
 * rewireable fuseboard then AI can see the photo, offer advice on it and what
 * it actually is."*
 *
 * ── WHAT THIS IS ──────────────────────────────────────────────────────────
 * An advisory, photo-led account of what an electrician could see, written for
 * a house-buyer. It runs on the Visual Condition Report chassis (ELE-1262) —
 * the same PDF template and edge function — because it is the same idea with a
 * different centre of gravity: the VCR leads with a schedule of items, this
 * leads with photographs.
 *
 * ── 🔴 WHAT IT IS NOT ─────────────────────────────────────────────────────
 * Not an EICR. Not a BS 7671 inspection. No testing, no C1/C2/C3 codes, and no
 * satisfactory/unsatisfactory verdict — those belong to a condition report, and
 * borrowing their vocabulary is precisely how a buyer ends up believing they
 * hold one. The severity words here are chosen to sound like advice, because
 * that is what they are.
 *
 * ── 🔴 EVERY AI NOTE IS A DRAFT ───────────────────────────────────────────
 * `aiAnalysis` is what the model suggested. `identifiedAs` / `note` are what
 * the ELECTRICIAN settled on, and only those reach the PDF. A finding that has
 * not been accepted is not published — see `acceptedFindings()`.
 */

/** Advice-shaped, deliberately not the EICR code set. See the header. */
export type SurveySeverity = 'urgent' | 'attention' | 'ageing' | 'acceptable' | 'unclear';

/**
 * One word, for the severity control and the PDF's priority column.
 *
 * Short on purpose: five long labels wrap into an unreadable stack on a phone,
 * and the column on the printed report is narrow. The full meaning is carried
 * by SEVERITY_LABEL beneath the control and by the key under the PDF table.
 */
export const SEVERITY_SHORT: Record<SurveySeverity, string> = {
  urgent: 'Urgent',
  attention: 'Attention',
  ageing: 'Ageing',
  acceptable: 'Fine',
  unclear: 'Unclear',
};

export const SEVERITY_LABEL: Record<SurveySeverity, string> = {
  urgent: 'Needs attention now — before or on moving in',
  attention: 'Should be put right, and will cost money',
  ageing: 'Working but dated — plan for replacement',
  acceptable: 'Nothing of concern was visible',
  unclear: 'Could not be judged from what was visible',
};

/** Ordered worst-first — drives both the report ordering and the summary. */
export const SEVERITY_ORDER: SurveySeverity[] = [
  'urgent',
  'attention',
  'ageing',
  'acceptable',
  'unclear',
];

/** Exactly what `analyse-survey-photo` returns. Never rendered unedited. */
export interface SurveyAiAnalysis {
  isElectrical: boolean;
  identifiedAs: string;
  era: string;
  condition: string;
  advice: string;
  severity: SurveySeverity;
  confidence: number;
  needsCloserLook: string;
}

export interface SurveyFinding {
  id: string;
  /** Storage URL. Photographs are the substance of this report. */
  photoUrl: string;
  /** Where in the property — the electrician's words. */
  location: string;

  /* ── What the electrician settled on. Only these are published. ──────── */
  identifiedAs: string;
  note: string;
  severity: SurveySeverity;

  /* ── Provenance ──────────────────────────────────────────────────────── */
  /** The model's draft, kept so "what did the AI say?" is answerable later. */
  aiAnalysis?: SurveyAiAnalysis;
  /**
   * 🔴 The gate. False until the electrician has read this finding and kept or
   * corrected it. Unaccepted findings are excluded from the PDF entirely —
   * an unreviewed AI claim must never reach a client.
   */
  accepted: boolean;
  /** True when the text differs from what the model proposed. Printed as provenance. */
  edited?: boolean;
  status?: 'analysing' | 'ready' | 'failed';
}

export interface PrePurchaseSurveyFormData {
  certificateNumber: string;
  _clientCertId: string;

  /* ── Who it is for ───────────────────────────────────────────────────── */
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  /** Usually a buyer's solicitor or agent. Free text. */
  clientAddress: string;
  installationAddress: string;
  surveyDate: string;

  /* ── Scope ───────────────────────────────────────────────────────────── */
  purpose: string;
  extent: string;
  limitations: string;
  propertyType: '' | 'house' | 'flat' | 'bungalow' | 'commercial' | 'other';
  approximateAge: string;

  /* ── The survey ──────────────────────────────────────────────────────── */
  findings: SurveyFinding[];

  /* ── Summary ─────────────────────────────────────────────────────────── */
  /** Written by the electrician. The AI never drafts the overall conclusion. */
  summary: string;
  recommendations: string;

  /* ── Declaration ─────────────────────────────────────────────────────── */
  surveyorName: string;
  surveyorPosition: string;
  surveyorSignature: string;
  companyName: string;

  completedSections: Record<string, boolean>;
}

/**
 * 🔴 THE PUBLICATION GATE.
 *
 * Only accepted findings with something actually written on them are published.
 * A photograph the electrician never looked at carries a model's guess, and a
 * guess on a document a family relies on when buying a house is the one outcome
 * this feature must not produce.
 */
export function acceptedFindings(findings: SurveyFinding[]): SurveyFinding[] {
  return (findings ?? []).filter(
    (f) => f.accepted && !!f.photoUrl && (f.identifiedAs?.trim() || f.note?.trim())
  );
}

/** Worst-first, so a buyer reads the things that matter at the top. */
export function sortFindings(findings: SurveyFinding[]): SurveyFinding[] {
  return [...(findings ?? [])].sort(
    (a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity)
  );
}

export function severityCounts(findings: SurveyFinding[]): Record<SurveySeverity, number> {
  const out = { urgent: 0, attention: 0, ageing: 0, acceptable: 0, unclear: 0 };
  for (const f of findings) out[f.severity] = (out[f.severity] ?? 0) + 1;
  return out;
}

const today = () => new Date().toISOString().slice(0, 10);

export function getDefaultPrePurchaseSurveyFormData(): PrePurchaseSurveyFormData {
  return {
    certificateNumber: '',
    _clientCertId: crypto.randomUUID(),
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    installationAddress: '',
    surveyDate: today(),
    purpose: 'Pre-purchase advisory survey of the electrical installation',
    extent: '',
    limitations: '',
    propertyType: '',
    approximateAge: '',
    findings: [],
    summary: '',
    recommendations: '',
    surveyorName: '',
    surveyorPosition: '',
    surveyorSignature: '',
    companyName: '',
    completedSections: {},
  };
}

/**
 * 🔴 Prints on every copy, and must not be softened or removed.
 *
 * The reader is a house-buyer, not an electrician. They have no way to know
 * that a visual survey and a condition report are different things unless the
 * document tells them plainly, and they may be making a six-figure decision on
 * the strength of it.
 */
export const SURVEY_LIMITATIONS =
  'This is an advisory visual survey of the electrical installation, carried out to help you ' +
  'understand its likely condition before purchase. ' +
  'It is NOT an Electrical Installation Condition Report (EICR) and it is not an inspection to ' +
  'BS 7671. No electrical testing was carried out, nothing was dismantled, and no part of the ' +
  'installation has been proven safe by measurement. ' +
  'Only what was visible and reasonably accessible on the day has been looked at — concealed ' +
  'wiring, and anything behind fixtures, under floors or within the fabric of the building, has ' +
  'not been inspected. ' +
  'Where this report identifies something of concern, that is the surveyor’s opinion from what ' +
  'could be seen, not a measured finding. Before relying on the condition of the installation, ' +
  'or before any work is carried out, you should commission a full Electrical Installation ' +
  'Condition Report from a qualified person.';

/**
 * 🔴 Also prints, whenever any finding came from an AI draft.
 *
 * The buyer is entitled to know a machine was involved and that a person
 * checked it. Saying so plainly is what makes the assistance honest rather than
 * something concealed.
 */
export const AI_ASSISTANCE_NOTE =
  'Some observations in this report were drafted with the assistance of image analysis software ' +
  'and then reviewed, corrected where necessary and accepted by the surveyor named below. ' +
  'Nothing appears in this report that the surveyor has not confirmed.';
