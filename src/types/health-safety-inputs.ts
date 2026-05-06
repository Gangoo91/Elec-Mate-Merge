/**
 * Health & Safety Specialist input types.
 *
 * Description-led shape, mirrors maintenance/installation. The
 * editorial briefing collects: a description of the work + site,
 * optional attachments (RAMS PDFs, hazard photos, asset register),
 * a work type, scope-of-works fields, and a few risk-relevant fields.
 */

import type { InstallationAttachment } from './installation-method-inputs';

export type HealthSafetyWorkType = 'domestic' | 'commercial' | 'industrial';
export type HealthSafetyAttachment = InstallationAttachment;

export interface HealthSafetyInputs {
  /** Free-text brief describing the work + site + known hazards. */
  description: string;
  /** Domestic / commercial / industrial — primary RAG bucket. */
  workType: HealthSafetyWorkType;
  /** Project / RAMS title shown on the printed cover. */
  projectName: string;
  /** Site address. */
  location: string;
  /** Client / duty-holder name. */
  clientName: string;
  clientContact?: string;
  customerId?: string;
  /** Scope of works one-liner that the AI should hold front-of-mind. */
  scopeOfWorks: string;
  /** Approximate scale: "1 day", "2 weeks", "8-week project". */
  duration?: string;
  /** Headcount — affects coordination + welfare requirements. */
  headcount?: string;
  /** Optional notes — known hazards, occupant constraints, etc. */
  additionalNotes?: string;
  attachments: HealthSafetyAttachment[];
}

export const HEALTH_SAFETY_WORK_OPTIONS: {
  value: HealthSafetyWorkType;
  label: string;
  blurb: string;
}[] = [
  { value: 'domestic', label: 'Domestic', blurb: 'Homes & flats' },
  { value: 'commercial', label: 'Commercial', blurb: 'Shops & offices' },
  { value: 'industrial', label: 'Industrial', blurb: 'Factories & sites' },
];

export const emptyHealthSafetyInputs = (): HealthSafetyInputs => ({
  description: '',
  workType: 'commercial',
  projectName: '',
  location: '',
  clientName: '',
  clientContact: '',
  customerId: undefined,
  scopeOfWorks: '',
  duration: '',
  headcount: '',
  additionalNotes: '',
  attachments: [],
});

/** Synthesise a single-string brief for the edge function payload. */
export const composeHealthSafetyBriefing = (i: HealthSafetyInputs): string => {
  const lines: string[] = [];
  if (i.projectName?.trim()) lines.push(`Project: ${i.projectName}`);
  if (i.scopeOfWorks?.trim()) lines.push(`Scope of works: ${i.scopeOfWorks}`);
  if (i.location?.trim()) lines.push(`Site: ${i.location}`);
  lines.push(`Type: ${i.workType}`);
  if (i.clientName?.trim()) lines.push(`Client: ${i.clientName}`);
  if (i.duration?.trim()) lines.push(`Duration: ${i.duration}`);
  if (i.headcount?.trim()) lines.push(`Headcount: ${i.headcount}`);
  lines.push('');
  lines.push(i.description.trim());
  if (i.additionalNotes?.trim()) {
    lines.push('');
    lines.push(`Notes: ${i.additionalNotes.trim()}`);
  }
  return lines.join('\n');
};
