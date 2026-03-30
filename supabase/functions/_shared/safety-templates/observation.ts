import { renderPage, sectionHeader, kvGrid, statBoxes, textBox, signatureBlock, paragraph, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A';
const TYPE_MAP: Record<string, StatusColour> = { positive: 'success', improvement: 'warning' };
// deno-lint-ignore no-explicit-any
export function observationTemplate(record: any, branding: Branding): string {
  const obsType = (record.observation_type || '').toLowerCase();
  const statusColour: StatusColour = TYPE_MAP[obsType] || 'info';
  const accent = obsType === 'positive' ? '#22c55e' : obsType === 'improvement' ? '#f59e0b' : '#3b82f6';
  let body = '';
  body += sectionHeader('Observation Overview');
  body += statBoxes([
    { label: 'Type', value: obsType === 'positive' ? 'POSITIVE' : obsType === 'improvement' ? 'IMPROVEMENT' : (record.observation_type || 'N/A').toUpperCase(), colour: statusColour },
    { label: 'Category', value: record.category || 'N/A', colour: 'info' },
  ]);
  body += sectionHeader('Observation Details');
  body += kvGrid([
    { label: 'Type', value: record.observation_type ? record.observation_type.charAt(0).toUpperCase() + record.observation_type.slice(1) : 'N/A' },
    { label: 'Category', value: record.category || 'N/A' },
    { label: 'Location', value: record.location || 'N/A' },
    { label: 'Person Observed', value: record.person_observed || 'N/A' },
    { label: 'Date', value: fmtDate(record.created_at) },
  ]);
  body += sectionHeader('Description');
  body += textBox(record.description || 'Not provided', accent);
  if (record.corrective_action) { body += sectionHeader('Corrective Action Required'); body += textBox(record.corrective_action, '#3b82f6'); }
  body += sectionHeader('Applicable Standards');
  body += paragraph('HSG65 \u2014 Successful Health and Safety Management. ISO 45001 \u2014 Occupational Health and Safety Management Systems. Behavioural safety observations should be recorded, tracked, and used to identify trends and improve workplace safety culture.');
  body += sectionHeader('Declaration & Signature');
  body += paragraph('I confirm this observation is an accurate record of the behaviour or condition observed. ' + (obsType === 'positive' ? 'Positive observations reinforce safe behaviours and should be shared with the team.' : 'Improvement observations identify opportunities to enhance safety and should be actioned promptly.'));
  body += signatureBlock([{ role: 'Observer', name: record.observer_name || undefined, date: fmtDate(record.created_at), signatureDataUrl: record.observer_signature || undefined }]);
  return renderPage({ title: 'Safety Observation', refId: record.id, statusLabel: record.observation_type || 'Observation', statusColour, branding, bodyHtml: body, footerNote: 'HSG65 / ISO 45001 \u2014 Safety observations are a key element of proactive safety management. Both positive and improvement observations should be recorded and trended.' });
}
