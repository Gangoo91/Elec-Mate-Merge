import type { Mapper, Section, Tone } from '../contract.ts';
import { fmtDate, fmtDateTime, fmtTime, humanise, paras, refFrom, rows, signature, str, yesNo, type Row } from '../common.ts';
import { evenFacts, isPast, linkRef, mergePhotos, plural } from './_helpers.ts';

const STATUS: Record<string, { label: string; tone: Tone }> = {
  active: { label: 'Watch in progress', tone: 'live' },
  extended: { label: 'Extended', tone: 'live' },
  awaiting_follow_up: { label: 'Follow-up due', tone: 'warn' },
  completed: { label: 'Completed', tone: 'ok' },
};

const minutes = (n: number): string => {
  if (!n) return '';
  const h = Math.floor(n / 60);
  const m = n % 60;
  return [h ? plural(h, 'hour') : '', m ? plural(m, 'minute') : ''].filter(Boolean).join(' ');
};

/**
 * Fire watch after hot work: the watch period, each check-in as it was logged,
 * the closing checklist, and the later follow-up check.
 */
export const fireWatchMapper: Mapper = (r: Row, ctx) => {
  const key = str(r.status);
  const status = STATUS[key] ?? { label: humanise(key) || 'Recorded', tone: 'neutral' as Tone };
  const checks: Row[] = Array.isArray(r.checklist) ? r.checklist : [];
  const ticked = checks.filter((c) => c.checked === true || c.result === 'pass').length;
  const ins: Row[] = Array.isArray(r.check_ins) ? r.check_ins : [];
  const issues = ins.filter((c) => c.allClear === false).length;
  const dur = Number(r.duration_minutes) || 0;
  const followDone = !!r.follow_up_completed_at;
  const followOverdue = key === 'awaiting_follow_up' && !followDone && isPast(r.follow_up_due_at);

  const sections: Section[] = [
    {
      heading: 'Watch',
      kind: 'kv',
      rows: rows([
        ['Location', r.location],
        ['Started', fmtDateTime(r.start_time)],
        ['Ended', fmtDateTime(r.end_time) || (key === 'active' || key === 'extended' ? 'Still running' : '')],
        ['Watch length', minutes(dur)],
        ['Check-in interval', r.check_in_interval_minutes ? `Every ${minutes(Number(r.check_in_interval_minutes))}` : ''],
        ['Linked permit', linkRef('PTW', r.permit_id)],
        ['Wind', r.wind_conditions],
        ['Surface temperature', r.surface_temperature],
        ['Extended', r.extended_at ? fmtDateTime(r.extended_at) : '', r.extension_reason],
        ['GPS position', r.gps_latitude != null && r.gps_longitude != null ? `${Number(r.gps_latitude).toFixed(5)}, ${Number(r.gps_longitude).toFixed(5)}` : ''],
      ]),
    },
  ];
  if (ins.length)
    sections.push({
      heading: 'Check-ins',
      intro: 'Logged by the fire watch person during the watch.',
      kind: 'table',
      columns: ['#', 'Time', 'Result', 'Notes'],
      rows: ins.map((c, i) => [String(i + 1), fmtTime(c.timestamp), c.allClear === false ? 'Issue found' : 'All clear', str(c.notes)]),
    });
  if (checks.length)
    sections.push({
      heading: 'Closing checklist',
      kind: 'checklist',
      items: checks.map((c) => {
        const ok = c.checked === true || c.result === 'pass';
        return { label: str(c.label || c.item) || 'Check', result: ok ? 'done' : 'open', result_label: ok ? 'Ticked' : 'Not ticked' };
      }),
    });
  if (r.follow_up_due_at || followDone)
    sections.push({
      heading: 'Follow-up check',
      kind: 'kv',
      rows: rows([
        ['Due', fmtDateTime(r.follow_up_due_at)],
        ['Done', followDone ? fmtDateTime(r.follow_up_completed_at) : 'Not yet recorded'],
        ['By', r.follow_up_by],
        ['All clear', followDone ? yesNo(r.follow_up_all_clear, 'Yes', 'No — see notes') : ''],
        ['Notes', paras(r.follow_up_notes).join(' ')],
      ]),
    });

  const sig = signature('Fire watch completed by', r.completed_by, r.completed_signature, r.end_time || r.created_at);
  const followSig = followDone && str(r.follow_up_by) ? signature('Follow-up check by', r.follow_up_by, '', r.follow_up_completed_at, 'typed') : null;

  return {
    meta: {
      kind: 'Fire watch record',
      title: str(r.location) || 'Fire watch',
      subtitle: 'The watch kept over a hot work area after the work stopped.',
      reference: refFrom('FW', r.id),
      issued: fmtDate(r.start_time || r.created_at),
    },
    status: followOverdue ? { label: 'Follow-up overdue', tone: 'bad' } : status,
    job: { site: str(r.location) || ctx.job.site },
    prepared_by: str(r.completed_by) || ctx.preparedBy,
    cover_facts: evenFacts([
      { label: 'Started', value: fmtDateTime(r.start_time) },
      { label: 'Ended', value: fmtDateTime(r.end_time) || 'Still running' },
      { label: 'Linked permit', value: linkRef('PTW', r.permit_id) },
      { label: 'Completed by', value: str(r.completed_by) },
    ]),
    headline: [
      { label: 'Watch length', value: dur ? String(dur) : '0', unit: 'min' },
      { label: 'Check-ins', value: String(ins.length), verdict: issues ? 'fail' : ins.length ? 'pass' : 'neutral', verdict_label: issues ? `${issues} with an issue` : ins.length ? 'All clear' : 'None logged' },
      ...(checks.length ? [{ label: 'Checklist', value: `${ticked}/${checks.length}`, verdict: ticked === checks.length ? 'done' : 'open', verdict_label: ticked === checks.length ? 'All ticked' : 'Not all ticked' }] : []),
    ],
    alert:
      key === 'awaiting_follow_up' && !followDone
        ? {
            tone: followOverdue ? 'bad' : 'warn',
            title: followOverdue ? 'Follow-up check overdue.' : 'Follow-up check not yet done.',
            text: r.follow_up_due_at ? `The follow-up check of the area was due ${fmtDateTime(r.follow_up_due_at)}.` : 'The follow-up check of the area is not yet recorded.',
          }
        : key === 'active' || key === 'extended'
          ? { tone: 'live', title: 'Watch still running.', text: 'The area is to be watched continuously until the watch is completed.' }
          : r.follow_up_all_clear === false
            ? { tone: 'bad', title: 'Follow-up found an issue.', text: 'The follow-up check was not recorded as all clear — see the notes.' }
            : undefined,
    sections,
    signatures: [sig, followSig].filter(Boolean) as NonNullable<typeof sig>[],
    photos: mergePhotos(ctx.photoUrl, [r.photos]),
    audit: [
      { event: 'Watch started', at: fmtDateTime(r.start_time || r.created_at) },
      ...(r.extended_at ? [{ event: 'Watch extended', at: fmtDateTime(r.extended_at) }] : []),
      ...(r.end_time ? [{ event: 'Watch ended', at: fmtDateTime(r.end_time) }] : []),
      ...(followDone ? [{ event: 'Follow-up check recorded', at: fmtDateTime(r.follow_up_completed_at) }] : []),
    ],
    disclaimer: 'A fire watch as logged by the people named. The app records the watch and its check-ins; it does not detect fire or heat.',
  };
};
