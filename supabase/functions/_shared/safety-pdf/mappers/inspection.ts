import type { Mapper, Result, Section, Signature, Tone } from '../contract.ts';
import { fmtDate, fmtDateTime, humanise, paras, refFrom, rows, signature, str, type Row } from '../common.ts';
import { evenFacts, mergePhotos } from './_helpers.ts';

const RES: Record<string, { result: Result; label: string }> = {
  pass: { result: 'pass', label: 'Pass' },
  fail: { result: 'fail', label: 'Fail' },
  na: { result: 'na', label: 'N/A' },
  'n/a': { result: 'na', label: 'N/A' },
};
const CLASS: Record<string, string> = {
  critical: 'Critical — stop work',
  major: 'Major — rectify within 24 hours',
  minor: 'Minor — rectify when practical',
};

/**
 * Workplace inspection. Every item with the inspector's result, notes and any
 * remedial action, assignee and due date. Counts come from the items
 * themselves, and the overall stamp never reads "Pass" when nothing passed.
 */
export const inspectionMapper: Mapper = (r: Row, ctx) => {
  const secs: Row[] = Array.isArray(r.sections) ? r.sections : [];
  const all: Row[] = secs.flatMap((s) => (Array.isArray(s.items) ? s.items : []));
  const count = (k: string) => all.filter((i) => str(i.result).toLowerCase() === k || (k === 'na' && str(i.result) === 'n/a')).length;
  const pass = count('pass');
  const fail = count('fail');
  const na = count('na');
  const unanswered = all.length - pass - fail - na;
  const overall = str(r.overall_result).toLowerCase();

  let status: { label: string; tone: Tone };
  if (overall === 'fail' || (fail > 0 && overall !== 'advisory' && overall !== 'pass')) status = { label: 'Fail', tone: 'bad' };
  else if (overall === 'advisory') status = { label: 'Advisory', tone: 'warn' };
  else if (overall === 'pass' && pass === 0) status = { label: 'No items passed', tone: 'warn' };
  else if (overall === 'pass' && fail > 0) status = { label: 'Pass with failed items', tone: 'warn' };
  else if (overall === 'pass') status = { label: 'Pass', tone: 'ok' };
  else status = { label: humanise(overall) || 'Recorded', tone: 'neutral' };

  const itemNote = (i: Row): string =>
    [
      str(i.notes),
      i.classification ? CLASS[str(i.classification)] ?? humanise(i.classification) : '',
      str(i.remedial_action) ? `Action: ${str(i.remedial_action)}` : '',
    ]
      .filter(Boolean)
      .join(' · ');

  const sections: Section[] = [
    {
      heading: 'Inspection',
      kind: 'kv',
      rows: rows([
        ['Checklist', r.template_title],
        ['Location', r.location],
        ['Date', fmtDate(r.date)],
        ['Inspector', r.inspector_name],
        ['Re-inspection due', fmtDate(r.re_inspection_date), r.re_inspection_reason],
      ]),
    },
  ];
  for (const s of secs) {
    const items: Row[] = Array.isArray(s.items) ? s.items : [];
    if (!items.length) continue;
    sections.push({
      heading: str(s.title) || 'Checklist',
      kind: 'checklist',
      items: items.map((i) => {
        const res = RES[str(i.result).toLowerCase()];
        return {
          label: str(i.text || i.label) || 'Item',
          result: res?.result ?? 'open',
          result_label: res?.label ?? 'Not answered',
          note: itemNote(i),
        };
      }),
    });
  }
  const actions = all
    .filter((i) => str(i.result).toLowerCase() === 'fail' && (str(i.remedial_action) || str(i.assigned_to) || str(i.due_date)))
    .map((i) => [
      str(i.text || i.label) || 'Item',
      str(i.remedial_action) || 'Not recorded',
      str(i.assigned_to) || 'Not assigned',
      fmtDate(i.due_date) || 'No date',
      humanise(i.nc_status) || 'Open',
    ]);
  if (actions.length)
    sections.push({ heading: 'Remedial actions', kind: 'table', columns: ['Item', 'Action', 'Assigned to', 'Due', 'Status'], rows: actions });

  const sig: Signature | null = signature('Inspector', r.inspector_signature_name || r.inspector_name, r.inspector_signature, r.created_at);
  // Item photos carry the item text as a caption.
  const itemPhotos: [unknown, string][] = all.filter((i) => str(i.photo)).map((i) => [[str(i.photo)], str(i.text || i.label)]);

  return {
    meta: {
      kind: 'Workplace inspection',
      title: str(r.template_title) || 'Inspection',
      subtitle: 'A walk-round inspection, item by item, as recorded by the inspector.',
      reference: refFrom('INSP', r.id),
      issued: fmtDate(r.date || r.created_at),
    },
    status,
    job: { site: str(r.location) || ctx.job.site },
    prepared_by: str(r.inspector_name) || ctx.preparedBy,
    cover_facts: evenFacts([
      { label: 'Items', value: String(all.length) },
      { label: 'Remedial actions', value: String(actions.length) },
      { label: 'Re-inspection due', value: fmtDate(r.re_inspection_date) },
      { label: 'Sections', value: String(secs.length) },
    ]),
    headline: [
      { label: 'Passed', value: String(pass), ...(pass ? { verdict: 'pass', verdict_label: 'Pass' } : {}) },
      { label: 'Failed', value: String(fail), verdict: fail ? 'fail' : 'neutral', verdict_label: fail ? 'Fail' : 'None' },
      { label: unanswered ? 'N/A or not answered' : 'Not applicable', value: String(na + unanswered) },
    ],
    alert: fail
      ? { tone: 'bad', title: `${fail} item${fail === 1 ? '' : 's'} failed.`, text: actions.length ? 'Remedial actions are listed below.' : 'No remedial action is recorded against the failed items.' }
      : unanswered
        ? { tone: 'warn', title: 'Incomplete.', text: `${unanswered} item${unanswered === 1 ? ' was' : 's were'} not answered.` }
        : undefined,
    sections,
    signatures: sig ? [sig] : [],
    photos: mergePhotos(ctx.photoUrl, [r.photos], [r.photo_urls], ...itemPhotos),
    audit: [
      { event: 'Inspection recorded', at: fmtDateTime(r.created_at) },
      ...(r.updated_at && r.updated_at !== r.created_at ? [{ event: 'Last updated', at: fmtDateTime(r.updated_at) }] : []),
    ],
    notes: paras(r.additional_notes).length ? paras(r.additional_notes) : undefined,
    disclaimer: 'An inspection as recorded by the inspector named, reflecting conditions seen at the time.',
  };
};
