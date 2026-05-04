/**
 * Cost Engineer — description-led input shape.
 *
 * The wizard is gone. Users brief the engineer with a free-form description,
 * upload supporting files (floor plans, PDFs, photos), and optionally fill a
 * small inline details panel. The backend extracts attachment content and
 * feeds it to the AI alongside the description.
 *
 * The edge function still receives `{ query, region, projectContext,
 * businessSettings }`. `query` is the description verbatim (with details
 * appended). Attachments are passed through `projectContext.attachments`
 * so the worker can fetch + parse them.
 */

export type ProjectType = 'domestic' | 'commercial' | 'industrial';

/**
 * Region keys MUST match `REGIONAL_MULTIPLIERS` in
 * `supabase/functions/_shared/cost-engineer-core.ts` exactly. The backend
 * looks them up directly; mismatched keys silently fall back to ×1.00.
 */
export type Region =
  | 'london'
  | 'southeast'
  | 'southwest'
  | 'eastMidlands'
  | 'westMidlands'
  | 'yorkshire'
  | 'northwest'
  | 'northeast'
  | 'scotland'
  | 'wales'
  | 'northernIreland'
  | 'other';

export interface CostAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  storagePath: string;
  /** Brief client-side categorisation so the AI knows what each file is. */
  kind: 'floor-plan' | 'specification' | 'photo' | 'other';
  uploadedAt: string;
}

export interface CostEstimateInputs {
  /** The brief — free text from the user. Required. */
  description: string;

  // Optional inline details
  projectType: ProjectType;
  projectName: string;
  clientName: string;
  clientContact?: string;
  customerId?: string;
  location: string;
  region: Region;

  markupPercent: number;
  contingencyPercent: number;

  /** Anything else that didn't fit elsewhere. Free text. */
  notes?: string;

  attachments: CostAttachment[];
}

export const DEFAULT_COST_ESTIMATE_INPUTS: CostEstimateInputs = {
  description: '',
  projectType: 'domestic',
  projectName: '',
  clientName: '',
  location: '',
  region: 'other',
  markupPercent: 25,
  contingencyPercent: 5,
  attachments: [],
};

/** Multipliers must mirror backend REGIONAL_MULTIPLIERS exactly. */
export const REGION_OPTIONS: { value: Region; label: string; multiplier: number }[] = [
  { value: 'london', label: 'London', multiplier: 1.25 },
  { value: 'southeast', label: 'South East', multiplier: 1.15 },
  { value: 'southwest', label: 'South West', multiplier: 1.05 },
  { value: 'eastMidlands', label: 'East Midlands', multiplier: 1.0 },
  { value: 'westMidlands', label: 'West Midlands', multiplier: 1.0 },
  { value: 'yorkshire', label: 'Yorkshire', multiplier: 1.02 },
  { value: 'northwest', label: 'North West', multiplier: 1.02 },
  { value: 'northeast', label: 'North East', multiplier: 0.95 },
  { value: 'scotland', label: 'Scotland', multiplier: 1.08 },
  { value: 'wales', label: 'Wales', multiplier: 0.98 },
  { value: 'northernIreland', label: 'Northern Ireland', multiplier: 0.92 },
  { value: 'other', label: 'UK average', multiplier: 1.0 },
];

const PROJECT_TYPE_LABEL: Record<ProjectType, string> = {
  domestic: 'Domestic',
  commercial: 'Commercial',
  industrial: 'Industrial',
};

/**
 * Compose the `query` string the existing edge function expects. The
 * description is the spine; details are appended as a short context block
 * the AI can lean on without parsing prose.
 */
export function composeQueryFromInputs(inputs: CostEstimateInputs): string {
  const lines: string[] = [];
  lines.push(inputs.description.trim());

  const detailLines: string[] = [];
  if (inputs.projectName) detailLines.push(`Project: ${inputs.projectName}`);
  detailLines.push(`Type: ${PROJECT_TYPE_LABEL[inputs.projectType]}`);
  if (inputs.location) detailLines.push(`Location: ${inputs.location}`);
  detailLines.push(`Region: ${inputs.region}`);
  detailLines.push(`Markup: ${inputs.markupPercent}%`);
  detailLines.push(`Contingency: ${inputs.contingencyPercent}%`);
  if (inputs.clientName) {
    detailLines.push(
      `Client: ${inputs.clientName}${inputs.clientContact ? ` (${inputs.clientContact})` : ''}`
    );
  }

  if (detailLines.length > 0) {
    lines.push('');
    lines.push('Details:');
    detailLines.forEach((d) => lines.push(`- ${d}`));
  }

  if (inputs.notes?.trim()) {
    lines.push('');
    lines.push('Notes:');
    lines.push(inputs.notes.trim());
  }

  if (inputs.attachments.length > 0) {
    lines.push('');
    lines.push(`Attachments provided: ${inputs.attachments.length}`);
    inputs.attachments.forEach((a, i) => {
      lines.push(`  ${i + 1}. ${a.fileName} (${a.kind})`);
    });
  }

  return lines.join('\n');
}
