/**
 * Maintenance Specialist input types.
 *
 * Description-led shape, mirrors `installation-method-inputs.ts`. The
 * editorial briefing collects: a free-text description of the asset and
 * what needs maintaining, optional attachments (asset register PDFs,
 * photos of nameplates, schematic markups), an installation type, and a
 * few optional asset / interval fields.
 */

import type { InstallationAttachment } from './installation-method-inputs';

export type MaintenanceInstallationType = 'domestic' | 'commercial' | 'industrial';
export type MaintenanceCriticality = 'low' | 'standard' | 'high' | 'mission-critical';
export type MaintenanceFrequency =
  | 'monthly'
  | 'quarterly'
  | 'six-monthly'
  | 'annual'
  | 'bi-annual'
  | 'five-yearly'
  | 'as-required';

export type MaintenanceAttachment = InstallationAttachment;

export interface MaintenanceMethodInputs {
  /** Free-text brief describing the asset + what's being maintained. */
  description: string;
  /** Domestic / commercial / industrial — informs RAG facet weighting. */
  installationType: MaintenanceInstallationType;
  /** Asset / project name shown on the printed cover. */
  projectName: string;
  /** Equipment type — "Consumer unit", "Fire alarm panel", "EV charger" etc. */
  equipmentType: string;
  /** Asset / equipment manufacturer or model — used as RAG hint. */
  equipmentMakeModel: string;
  /** Site address. */
  location: string;
  /** Client / building owner name. */
  clientName: string;
  clientContact?: string;
  customerId?: string;
  /** Approximate age of the installation, e.g. "12 years" — affects EICR cadence. */
  ageYears?: string;
  /** Optional planned maintenance frequency for this visit. */
  frequency: MaintenanceFrequency | '';
  /** Operational criticality — affects risk weighting + recommended cadence. */
  criticality: MaintenanceCriticality | '';
  /** Optional notes — access, isolation arrangements, anything else. */
  additionalNotes?: string;
  /** Drawings, photos, asset register PDFs, etc. */
  attachments: MaintenanceAttachment[];
}

export const MAINTENANCE_INSTALLATION_OPTIONS: {
  value: MaintenanceInstallationType;
  label: string;
  blurb: string;
}[] = [
  { value: 'domestic', label: 'Domestic', blurb: 'Homes & flats' },
  { value: 'commercial', label: 'Commercial', blurb: 'Shops & offices' },
  { value: 'industrial', label: 'Industrial', blurb: 'Factories & sites' },
];

export const MAINTENANCE_FREQUENCY_OPTIONS: {
  value: MaintenanceFrequency;
  label: string;
}[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'six-monthly', label: '6-monthly' },
  { value: 'annual', label: 'Annual' },
  { value: 'bi-annual', label: '2-yearly' },
  { value: 'five-yearly', label: '5-yearly' },
  { value: 'as-required', label: 'As required' },
];

export const MAINTENANCE_CRITICALITY_OPTIONS: {
  value: MaintenanceCriticality;
  label: string;
  blurb: string;
}[] = [
  { value: 'low', label: 'Low', blurb: 'Non-critical, manual back-up exists' },
  { value: 'standard', label: 'Standard', blurb: 'Routine business operation' },
  { value: 'high', label: 'High', blurb: 'Significant downtime impact' },
  { value: 'mission-critical', label: 'Mission-critical', blurb: 'Life-safety / 24/7 ops' },
];

export const emptyMaintenanceInputs = (): MaintenanceMethodInputs => ({
  description: '',
  installationType: 'commercial',
  projectName: '',
  equipmentType: '',
  equipmentMakeModel: '',
  location: '',
  clientName: '',
  clientContact: '',
  customerId: undefined,
  ageYears: '',
  frequency: '',
  criticality: '',
  additionalNotes: '',
  attachments: [],
});

/** Synthesise a single-string brief for the edge function payload. */
export const composeMaintenanceBriefing = (i: MaintenanceMethodInputs): string => {
  const lines: string[] = [];
  if (i.projectName?.trim()) lines.push(`Asset / project: ${i.projectName}`);
  if (i.equipmentType?.trim()) lines.push(`Equipment: ${i.equipmentType}`);
  if (i.equipmentMakeModel?.trim()) lines.push(`Make / model: ${i.equipmentMakeModel}`);
  if (i.location?.trim()) lines.push(`Site: ${i.location}`);
  lines.push(`Type: ${i.installationType}`);
  if (i.clientName?.trim()) lines.push(`Client: ${i.clientName}`);
  if (i.ageYears?.trim()) lines.push(`Approx age: ${i.ageYears}`);
  if (i.frequency) lines.push(`Planned frequency: ${i.frequency}`);
  if (i.criticality) lines.push(`Criticality: ${i.criticality}`);
  lines.push('');
  lines.push(i.description.trim());
  if (i.additionalNotes?.trim()) {
    lines.push('');
    lines.push(`Notes: ${i.additionalNotes.trim()}`);
  }
  return lines.join('\n');
};
