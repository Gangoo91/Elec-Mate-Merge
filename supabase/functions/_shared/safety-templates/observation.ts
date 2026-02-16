import { renderPage, sectionHeader, kvGrid, textBox, signatureBlock, paragraph, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-GB') : 'N/A';
const TYPE_MAP: Record<string, StatusColour> = { positive: 'success', improvement: 'warning' };
// deno-lint-ignore no-explicit-any
export function observationTemplate(record: any, branding: Branding): string {
  const obsType = (record.observation_type || '').toLowerCase();
  const statusColour: StatusColour = TYPE_MAP[obsType] || 'info';
  const accentColour = obsType === 'positive' ? '#22c55e' : obsType === 'improvement' ? '#f59e0b' : '#3b82f6';
  let body = '';
  body += sectionHeader('Observation Details');
  body += kvGrid([
    { label: 'Type', value: record.observation_type ? record.observation_type.charAt(0).toUpperCase() + record.observation_type.slice(1) : 'N/A' },
    { label: 'Category', value: record.category || 'N/A' },
    { label: 'Location', value: record.location || 'N/A' },
    { label: 'Person Observed', value: record.person_observed || 'N/A' },
    { label: 'Date', value: fmtDate(record.created_at) },
  ]);
  body += sectionHeader('Description');
  body += textBox(record.description || 'Not provided', accentColour);
  if (record.photo_url) { body += sectionHeader('Photo Reference'); body += paragraph(`Photo: ${record.photo_url}`); }
  if (record.observer_signature) {
    body += sectionHeader('Signatures');
    body += signatureBlock([{ role: 'Observer', name: record.observer_name || 'Signed', date: fmtDate(record.created_at), signatureDataUrl: record.observer_signature || undefined }]);
  }
  return renderPage({ title: 'Safety Observation', refId: record.id, statusLabel: record.observation_type || 'Observation', statusColour, branding, bodyHtml: body, footerNote: 'Safety observations are a key part of the behavioural safety programme. Both positive and improvement observations should be recorded.' });
}
