import type { Mapper, Section, Tone } from '../contract.ts';
import { fmtDate, fmtDateTime, humanise, paras, refFrom, rows, signature, str, type Row } from '../common.ts';
import { evenFacts, mergePhotos } from './_helpers.ts';

const TYPE: Record<string, { label: string; tone: Tone }> = {
  positive: { label: 'Positive', tone: 'ok' },
  improvement_needed: { label: 'Improvement needed', tone: 'warn' },
  improvement: { label: 'Improvement needed', tone: 'warn' },
};
const SEV_VERDICT: Record<string, string> = { low: 'ok', medium: 'warn', high: 'bad' };

/**
 * Safety observation: a positive or improvement-needed note on behaviour or
 * conditions. An anonymous observation prints no observer name or signature.
 */
export const observationMapper: Mapper = (r: Row, ctx) => {
  const t = TYPE[str(r.observation_type)] ?? { label: humanise(r.observation_type) || 'Observation', tone: 'neutral' as Tone };
  const sev = str(r.severity).toLowerCase();
  const anon = r.is_anonymous === true;
  const observer = anon ? 'Not named (logged anonymously)' : str(r.observer_name);

  const sections: Section[] = [
    {
      heading: 'Observation',
      kind: 'kv',
      rows: rows([
        ['Type', t.label],
        ['Category', r.category],
        ['Severity', str(r.observation_type) === 'positive' ? '' : humanise(sev)],
        ['Location', r.location],
        ['Person observed', r.person_observed],
        ['Observed by', observer],
        ['Date', fmtDate(r.created_at)],
      ]),
    },
  ];
  const d = paras(r.description);
  if (d.length) sections.push({ heading: 'What was observed', kind: 'text', paragraphs: d });

  const sig = anon ? null : signature('Observed by', r.observer_name, r.observer_signature, r.created_at);
  return {
    meta: {
      kind: 'Safety observation',
      title: str(r.category) || t.label,
      subtitle: t.tone === 'ok' ? 'Safe behaviour or conditions worth recognising.' : 'Behaviour or conditions that need to improve.',
      reference: refFrom('OBS', r.id),
      issued: fmtDate(r.created_at),
    },
    status: { label: t.label, tone: t.tone },
    job: { site: str(r.location) || ctx.job.site },
    prepared_by: anon ? ctx.preparedBy : str(r.observer_name) || ctx.preparedBy,
    cover_facts: evenFacts([
      { label: 'Person observed', value: str(r.person_observed) },
      { label: 'Observed by', value: observer },
    ]),
    headline: sev && str(r.observation_type) !== 'positive'
      ? [{ label: 'Severity', value: humanise(sev), verdict: SEV_VERDICT[sev] ?? 'neutral', verdict_label: 'As rated' }]
      : undefined,
    sections,
    signatures: sig ? [sig] : [],
    photos: mergePhotos(ctx.photoUrl, [r.photo_url], [r.photos]),
    audit: [{ event: 'Observation logged', at: fmtDateTime(r.created_at) }],
  };
};
