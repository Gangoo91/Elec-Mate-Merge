import type { Mapper, Section } from '../contract.ts';
import { fmtDate, fmtDateTime, paras, refFrom, rows, signature, str, type Row } from '../common.ts';
import { clock, evenFacts, mergePhotos, plural } from './_helpers.ts';

/**
 * Site diary entry: one day on site in the recorder's words — conditions,
 * hours, people, work done, problems, materials. Linked RAMS and permits are
 * counted, not expanded.
 */
export const siteDiaryMapper: Mapper = (r: Row, ctx) => {
  const start = clock(r.start_time);
  const end = clock(r.end_time);
  const rams = Array.isArray(r.rams_ids) ? r.rams_ids.length : 0;
  const permits = Array.isArray(r.permit_ids) ? r.permit_ids.length : 0;
  const people = r.personnel_count != null && r.personnel_count !== '' ? Number(r.personnel_count) : null;

  const sections: Section[] = [
    {
      heading: 'Day on site',
      kind: 'kv',
      rows: rows([
        ['Date', fmtDate(r.entry_date)],
        ['Site', r.site_name],
        ['Address', r.site_address],
        ['Weather', r.weather],
        ['Hours', start || end ? `${start || '—'} to ${end || '—'}` : ''],
        ['People on site', people != null ? String(people) : ''],
        ['Linked RAMS', rams ? plural(rams, 'document') : ''],
        ['Linked permits', permits ? plural(permits, 'permit') : ''],
      ]),
    },
  ];
  const add = (heading: string, v: unknown) => {
    const p = paras(v);
    if (p.length) sections.push({ heading, kind: 'text', paragraphs: p });
  };
  add('Work completed', r.work_completed);
  add('Issues', r.issues);
  add('Delays', r.delays);
  add('Materials used or delivered', r.materials_used);
  add('Notes', r.notes);

  const sig = signature('Recorded by', r.recorder_name, r.recorder_signature, r.created_at);
  return {
    meta: {
      kind: 'Site diary',
      title: str(r.site_name) || fmtDate(r.entry_date) || 'Site diary entry',
      subtitle: 'A day’s record of work, conditions and events on site.',
      reference: refFrom('DIARY', r.id),
      issued: fmtDate(r.entry_date || r.created_at),
    },
    status: { label: 'Recorded', tone: 'neutral' },
    job: { site: str(r.site_address) || str(r.site_name) || ctx.job.site },
    prepared_by: str(r.recorder_name) || ctx.preparedBy,
    cover_facts: evenFacts([
      { label: 'Weather', value: str(r.weather) },
      { label: 'Hours', value: start || end ? `${start || '—'} to ${end || '—'}` : '' },
    ]),
    headline: [
      ...(people != null ? [{ label: 'People on site', value: String(people) }] : []),
      ...(str(r.issues) || str(r.delays) ? [{ label: 'Issues or delays', value: 'Yes', verdict: 'warn', verdict_label: 'See below' }] : []),
    ],
    sections,
    signatures: sig ? [sig] : [],
    photos: mergePhotos(ctx.photoUrl, [r.photos]),
    audit: [
      { event: 'Entry created', at: fmtDateTime(r.created_at) },
      ...(r.updated_at && r.updated_at !== r.created_at ? [{ event: 'Last edited', at: fmtDateTime(r.updated_at) }] : []),
    ],
    disclaimer: 'A site diary entry as written by the person named.',
  };
};
