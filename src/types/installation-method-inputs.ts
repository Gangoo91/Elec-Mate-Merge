/**
 * Installation Specialist input types.
 *
 * Description-led shape (mirrors `cost-estimate-inputs.ts`). The new
 * editorial briefing collects: a free-text description, optional
 * attachments (drawings, photos, datasheets), an installation type
 * (domestic / commercial / industrial) and a few optional project
 * fields. Everything else is inferred by the AI.
 */

export type InstallationType = 'domestic' | 'commercial' | 'industrial';

export interface InstallationAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  storagePath: string;
  kind: 'drawing' | 'photo' | 'datasheet' | 'specification' | 'other';
  uploadedAt: string;
}

export interface InstallationMethodInputs {
  /** Free-text brief — the spine of the prompt. */
  description: string;
  /** Domestic / commercial / industrial — informs RAG facet weighting. */
  installationType: InstallationType;
  /** Project + client fields — optional, surfaced on the printed method. */
  projectName: string;
  location: string;
  clientName: string;
  clientContact?: string;
  customerId?: string;
  /** Optional date so the method statement can name a planned start. */
  expectedStartDate?: string;
  /** Optional notes — access constraints, deadlines, etc. */
  additionalNotes?: string;
  /** Drawings, photos, datasheets, etc. */
  attachments: InstallationAttachment[];
}

export const INSTALLATION_TYPE_OPTIONS: {
  value: InstallationType;
  label: string;
  blurb: string;
}[] = [
  { value: 'domestic', label: 'Domestic', blurb: 'Homes & flats' },
  { value: 'commercial', label: 'Commercial', blurb: 'Shops & offices' },
  { value: 'industrial', label: 'Industrial', blurb: 'Factories & sites' },
];

export const emptyInstallationInputs = (): InstallationMethodInputs => ({
  description: '',
  installationType: 'domestic',
  projectName: '',
  location: '',
  clientName: '',
  clientContact: '',
  customerId: undefined,
  expectedStartDate: '',
  additionalNotes: '',
  attachments: [],
});

/** Synthesise a single-string brief for the edge function payload. */
export const composeInstallationBriefing = (i: InstallationMethodInputs): string => {
  const lines: string[] = [];
  if (i.projectName?.trim()) lines.push(`Project: ${i.projectName}`);
  if (i.location?.trim()) lines.push(`Site: ${i.location}`);
  lines.push(`Type: ${i.installationType}`);
  if (i.clientName?.trim()) lines.push(`Client: ${i.clientName}`);
  if (i.expectedStartDate?.trim()) lines.push(`Start: ${i.expectedStartDate}`);
  lines.push('');
  lines.push(i.description.trim());
  if (i.additionalNotes?.trim()) {
    lines.push('');
    lines.push(`Notes: ${i.additionalNotes.trim()}`);
  }
  return lines.join('\n');
};
