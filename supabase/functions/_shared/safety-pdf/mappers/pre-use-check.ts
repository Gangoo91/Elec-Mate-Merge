import type { Mapper, Result, Section, Signature, Tone } from '../contract.ts';
import { fmtDate, fmtDateTime, humanise, paras, refFrom, rows, signature, str, type Row } from '../common.ts';
import { evenFacts, labelOf, mergePhotos } from './_helpers.ts';

const TYPE: Record<string, string> = {
  ladder: 'Ladder',
  scaffold: 'Scaffold',
  power_tool: 'Power tool',
  test_instrument: 'Test instrument',
  access_equipment: 'Access equipment',
  harness: 'Harness and lanyard',
  extension_lead: 'Extension lead or cable reel',
  portable_rcd: 'Portable RCD',
  generator: 'Generator',
  fire_extinguisher: 'Fire extinguisher',
  first_aid_kit: 'First aid kit',
  ppe: 'PPE',
  mewp: 'MEWP',
};
const RES: Record<string, { result: Result; label: string }> = {
  pass: { result: 'pass', label: 'Pass' },
  fail: { result: 'fail', label: 'Fail' },
  na: { result: 'na', label: 'N/A' },
  'n/a': { result: 'na', label: 'N/A' },
};
const APPROVAL: Record<string, string> = { not_required: '', pending: 'Awaiting approval', approved: 'Approved', rejected: 'Rejected' };

/**
 * Pre-use equipment check. Items by section with the checker's result and
 * notes; failed items' notes repeated as the defects list; a "do not use"
 * banner when the overall result is fail.
 */
export const preUseCheckMapper: Mapper = (r: Row, ctx) => {
  const items: Row[] = Array.isArray(r.items) ? r.items : [];
  const res = (i: Row) => str(i.result).toLowerCase();
  const pass = items.filter((i) => res(i) === 'pass').length;
  const failed = items.filter((i) => res(i) === 'fail');
  const na = items.filter((i) => res(i) === 'na' || res(i) === 'n/a').length;
  const overall = str(r.overall_result).toLowerCase();
  const type = labelOf(TYPE, r.equipment_type);

  const status: { label: string; tone: Tone } =
    overall === 'fail'
      ? { label: 'Fail', tone: 'bad' }
      : overall === 'pass' && pass === 0
        ? { label: 'No items passed', tone: 'warn' }
        : overall === 'pass'
          ? { label: 'Pass', tone: 'ok' }
          : { label: humanise(overall) || 'Recorded', tone: 'neutral' };

  const order: string[] = [];
  const bySec = new Map<string, Row[]>();
  for (const i of items) {
    const s = str(i.section) || 'Checks';
    if (!bySec.has(s)) {
      bySec.set(s, []);
      order.push(s);
    }
    bySec.get(s)!.push(i);
  }

  const sections: Section[] = [
    {
      heading: 'Equipment',
      kind: 'kv',
      rows: rows([
        ['Type', type],
        ['Description or serial', r.equipment_description],
        ['Site', r.site_address],
        ['Checked on', fmtDate(r.check_date || r.created_at)],
        ['Checked by', r.checked_by],
        ['Approval', r.requires_approval ? APPROVAL[str(r.approval_status)] ?? humanise(r.approval_status) : '', r.approval_comments],
      ]),
    },
    ...order.map((s): Section => ({
      heading: s,
      kind: 'checklist',
      items: bySec.get(s)!.map((i) => {
        const x = RES[res(i)];
        return { label: str(i.label || i.name) || 'Check', result: x?.result ?? 'open', result_label: x?.label ?? 'Not answered', note: str(i.notes) };
      }),
    })),
  ];
  if (failed.length)
    sections.push({
      heading: 'Defects recorded',
      kind: 'items',
      items: failed.map((i) => `${str(i.label || i.name) || 'Check'}${str(i.notes) ? ` — ${str(i.notes)}` : ' — no note recorded'}`),
    });
  const act = paras(r.actions_required);
  if (act.length) sections.push({ heading: 'Action required', kind: 'text', paragraphs: act });

  const signatures = [
    signature('Checked by', r.checked_by, r.signature, r.created_at),
    r.approved_by || r.approval_signature ? signature('Approved by', r.approved_by, r.approval_signature, r.approved_at) : null,
  ].filter(Boolean) as Signature[];

  return {
    meta: {
      kind: 'Pre-use check',
      title: str(r.equipment_description) || type || 'Equipment',
      subtitle: `${type || 'Equipment'} checked before use, item by item.`,
      reference: refFrom('PUC', r.id),
      issued: fmtDate(r.check_date || r.created_at),
    },
    status,
    job: { site: str(r.site_address) || ctx.job.site },
    prepared_by: str(r.checked_by) || ctx.preparedBy,
    cover_facts: evenFacts([
      { label: 'Equipment', value: type },
      { label: 'Items checked', value: String(items.length) },
    ]),
    headline: [
      { label: 'Passed', value: String(pass), ...(pass ? { verdict: 'pass', verdict_label: 'Pass' } : {}) },
      { label: 'Failed', value: String(failed.length), verdict: failed.length ? 'fail' : 'neutral', verdict_label: failed.length ? 'Fail' : 'None' },
      { label: 'Not applicable', value: String(na) },
    ],
    alert:
      overall === 'fail'
        ? { tone: 'bad', title: 'Do not use until repaired or replaced.', text: failed.length ? `${failed.length} check${failed.length === 1 ? '' : 's'} failed — see the defects recorded.` : 'The check was recorded as failed.' }
        : undefined,
    sections,
    signatures,
    photos: mergePhotos(ctx.photoUrl, [r.photos]),
    audit: [
      { event: 'Check recorded', at: fmtDateTime(r.created_at) },
      ...(r.approved_at ? [{ event: 'Approved', at: fmtDateTime(r.approved_at) }] : []),
    ],
    disclaimer: 'A pre-use check as recorded by the person named, reflecting the condition of the equipment when it was checked.',
  };
};
