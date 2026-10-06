import type { Mapper, Section, Signature } from '../contract.ts';
import { fmtDate, fmtDateTime, humanise, list, paras, refFrom, rows, str, type Row } from '../common.ts';

/**
 * Team briefing / toolbox talk (team_briefings).
 *
 * The attendance register is the point of this document. It prints each
 * person's NAME and how and when they acknowledged — never the IP address or
 * device recorded with a link signature (that stays in the database). A
 * signature acknowledges the briefing was given and understood; the wording
 * never presents it as approval of a RAMS or proof of competence.
 */
const key = (n: unknown) => str(n).toLowerCase();

export const briefingMapper: Mapper = (r: Row, ctx) => {
  const listed: Row[] = Array.isArray(r.attendees) ? r.attendees : [];
  const signs: Row[] = Array.isArray(r.attendee_signatures) ? r.attendee_signatures : [];
  const byName = new Map<string, Row>();
  for (const s of signs) if (key(s?.name) && !byName.has(key(s.name))) byName.set(key(s.name), s);

  const how = (s?: Row, listedSig?: unknown) =>
    s ? (s.signed_via === 'in_person' ? 'Marked present' : 'Signed by link') : listedSig ? 'Signed in the app' : 'Not signed';

  const seen = new Set<string>();
  const register: string[][] = listed.map((a) => {
    const s = byName.get(key(a?.name));
    if (s) seen.add(key(a.name));
    return [str(a?.name), str(a?.role || s?.company), how(s, a?.signature), fmtDateTime(s?.signed_at || s?.timestamp || a?.timestamp)];
  });
  for (const s of signs) {
    const k = key(s?.name);
    if (!k || seen.has(k) || byName.get(k) !== s) continue;
    register.push([str(s.name), str(s.company) || 'Not on the list', how(s), fmtDateTime(s.signed_at || s.timestamp)]);
  }
  const signed = register.filter((x) => x[2] !== 'Not signed').length;

  const sections: Section[] = [];
  const df: Row = r.dynamic_fields ?? {};
  if (df.source === 'rams' && df.rams_title)
    sections.push({
      heading: 'Covers',
      kind: 'kv',
      rows: rows([
        ['RAMS', str(df.rams_title)],
        ['Version briefed', df.rams_version ? `Version ${df.rams_version}` : 'Drafted before the RAMS was issued'],
      ]),
    });
  const body = paras(r.briefing_description);
  if (body.length) sections.push({ heading: 'The briefing', kind: 'text', paragraphs: body });
  // The wizard can store the same text as both content and scope — print it once.
  const scope = str(r.work_scope);
  const bodyText = body.join('\n\n');
  const dup = scope && (bodyText.includes(scope.slice(0, 120)) || scope.includes(bodyText.slice(0, 120)));
  if (scope && !dup) sections.push({ heading: 'Work scope', kind: 'text', paragraphs: [scope] });
  const hazards = list(r.identified_hazards);
  if (hazards.length) sections.push({ heading: 'Hazards covered', kind: 'items', items: hazards });
  const keyPts = list(r.key_points);
  if (keyPts.length) sections.push({ heading: 'Key points', kind: 'items', items: keyPts });
  const safety = list(r.safety_points);
  if (safety.length) sections.push({ heading: 'Safety points', kind: 'items', items: safety });
  const kit = list(r.equipment_required);
  if (kit.length) sections.push({ heading: 'Equipment and PPE', kind: 'items', items: kit });
  if (str(r.safety_warning)) sections.push({ heading: 'Warning', kind: 'text', paragraphs: [str(r.safety_warning)] });

  sections.push(
    register.length
      ? {
          heading: `Attendance · ${signed} of ${register.length} acknowledged`,
          intro: 'Names as entered. A link signature records the name typed by whoever opened the link; identity is not verified.',
          kind: 'table',
          columns: ['Name', 'Company or role', 'How', 'When'],
          rows: register,
          widths: ['', '', '30mm', '40mm'],
        }
      : { heading: 'Attendance', kind: 'text', paragraphs: ['No one has been recorded as attending this briefing.'] }
  );
  if (str(r.notes)) sections.push({ heading: 'Notes from the briefing', kind: 'text', paragraphs: paras(r.notes) });

  // Drawn signatures from the link, as evidence — at most twelve.
  const signatures: Signature[] = signs
    .filter((s) => str(s?.signature).startsWith('data:image'))
    .slice(0, 12)
    .map((s) => ({
      role: 'Acknowledged by',
      name: str(s.name),
      when: fmtDateTime(s.signed_at || s.timestamp),
      method: 'Signed by link — name as typed; identity not verified',
      image: str(s.signature),
    }));

  const delivered = r.status === 'completed' || r.completed === true;
  const date = fmtDate(r.briefing_date);
  const time = str(r.briefing_time).slice(0, 5);

  return {
    meta: {
      kind: r.briefing_type === 'toolbox-talk' ? 'Toolbox talk' : humanise(r.briefing_type) ? `${humanise(r.briefing_type)} briefing` : 'Team briefing',
      title: str(r.briefing_name) || 'Team briefing',
      subtitle: 'What the team was told before work, and who acknowledged it.',
      reference: refFrom('BRF', r.id),
      issued: date,
    },
    status:
      r.status === 'cancelled'
        ? { label: 'Cancelled', tone: 'neutral' }
        : delivered
          ? { label: 'Delivered', tone: 'ok' }
          : { label: 'Scheduled', tone: 'warn' },
    job: { site: str(r.location) || ctx.job.site },
    prepared_by: str(r.conductor_name) || str(r.created_by_name) || ctx.preparedBy,
    prepared_by_label: 'Given by',
    cover_facts: [
      { label: 'When', value: [date, time].filter(Boolean).join(', ') },
      { label: 'Risk level', value: humanise(r.risk_level) },
    ].filter((f) => f.value),
    headline: [
      { label: 'Acknowledged', value: `${signed}/${register.length}`, verdict: register.length && signed === register.length ? 'pass' : 'warn', verdict_label: register.length && signed === register.length ? 'Everyone' : `${register.length - signed} outstanding` },
      ...(r.duration_minutes ? [{ label: 'Duration', value: String(r.duration_minutes), unit: 'min' }] : []),
    ],
    alert:
      register.length && signed < register.length && r.status !== 'cancelled'
        ? { tone: 'warn', title: `${register.length - signed} not yet acknowledged.`, text: 'Share the signing link or QR with anyone who has not signed.' }
        : undefined,
    sections,
    signatures,
    photos: (Array.isArray(r.photos) ? r.photos : [])
      .map((p: Row) => ({ url: str(typeof p === 'string' ? p : p?.url), caption: str(p?.caption) }))
      .filter((p: { url: string }) => /^(https?:|data:)/.test(p.url)),
    audit: [
      { event: 'Briefing created', at: fmtDateTime(r.created_at) },
      ...(r.presentation_started_at ? [{ event: 'Briefing started', at: fmtDateTime(r.presentation_started_at) }] : []),
      ...(r.presentation_ended_at ? [{ event: 'Briefing completed', at: fmtDateTime(r.presentation_ended_at) }] : []),
    ],
    disclaimer:
      'Attendance and acknowledgements as recorded. Signing confirms the person was briefed and understood it; it is not approval of the RAMS and does not show competence.',
  };
};
