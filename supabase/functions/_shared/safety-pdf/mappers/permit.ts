import type { Mapper, Section, Signature, Tone } from '../contract.ts';
import { fmtDate, fmtDateTime, humanise, list, paras, refFrom, rows, signature, str, type Row } from '../common.ts';
import { evenFacts, isPast, labelOf, mergePhotos, plural } from './_helpers.ts';

const TYPE_LABEL: Record<string, string> = {
  'hot-work': 'Hot work permit',
  'confined-space': 'Confined space entry permit',
  'electrical-isolation': 'Electrical isolation permit',
  'working-at-height': 'Working at height permit',
  excavation: 'Excavation permit',
};

const STATUS: Record<string, { label: string; tone: Tone }> = {
  active: { label: 'Active', tone: 'live' },
  expired: { label: 'Expired', tone: 'bad' },
  closed: { label: 'Closed', tone: 'ok' },
  cancelled: { label: 'Cancelled', tone: 'neutral' },
  draft: { label: 'Draft', tone: 'neutral' },
};

const ACCEPTANCE: Record<string, string> = {
  accepted: 'Accepted by the receiver',
  awaiting_receiver: 'Awaiting the receiver’s signature',
};

const APPROVAL: Record<string, string> = {
  not_required: 'Not required',
  pending: 'Awaiting approval',
  approved: 'Approved',
  rejected: 'Rejected',
};

/**
 * Permit to work. Prints the permit as issued: validity window, hazards and the
 * controls written against each, precautions, PPE, the issuer and receiver
 * signatures (a receiver who accepted through the remote link is labelled as
 * such) and the close-out. It does not add regulations the permit did not cite.
 */
export const permitMapper: Mapper = (r: Row, ctx) => {
  const key = str(r.status) || 'draft';
  const base = STATUS[key] ?? { label: humanise(key) || 'Recorded', tone: 'neutral' as Tone };
  const overran = key === 'active' && isPast(r.end_time);
  const status = overran ? { label: 'Past end time', tone: 'warn' as Tone } : base;
  const typeLabel = TYPE_LABEL[str(r.type)] || (str(r.type) ? `${humanise(r.type)} permit` : 'Permit to work');
  const awaitingReceiver = str(r.acceptance_status) === 'awaiting_receiver';

  const hazards: Row[] = Array.isArray(r.hazards) ? r.hazards : [];
  const hazardRows = hazards
    .map((h, i) => {
      const name = str(typeof h === 'string' ? h : h?.description || h?.hazard || h?.name);
      const controls = typeof h === 'string' ? '' : str(h?.controls || h?.control);
      return name ? [String(i + 1), name, controls || 'None written'] : null;
    })
    .filter(Boolean) as string[][];
  const precautions = list(r.precautions);
  const ppe = list(r.ppe_required);
  const version = Number(r.version) || 1;

  const sections: Section[] = [
    {
      heading: 'Permit details',
      kind: 'kv',
      rows: rows([
        ['Permit type', typeLabel],
        ['Location', r.location],
        ['Valid from', fmtDateTime(r.start_time)],
        ['Valid until', fmtDateTime(r.end_time)],
        ['Duration', r.duration_hours ? plural(Number(r.duration_hours), 'hour') : ''],
        ['Version', version > 1 ? `Version ${version} (amended)` : 'Version 1'],
        ['Receiver acceptance', ACCEPTANCE[str(r.acceptance_status)] ?? humanise(r.acceptance_status)],
        ['Supervisor approval', r.requires_approval ? APPROVAL[str(r.approval_status)] ?? humanise(r.approval_status) : ''],
        ['Fire watch after work', r.auto_fire_watch === true ? 'Set to start when the permit closes' : ''],
      ]),
    },
  ];
  if (str(r.linked_rams_title))
    sections.push({
      heading: 'Controlling risk assessment',
      intro: 'The permit was linked to this risk assessment and method statement when it was issued.',
      kind: 'items',
      items: [str(r.linked_rams_title)],
    });
  const desc = paras(r.description);
  if (desc.length) sections.push({ heading: 'Description of work', kind: 'text', paragraphs: desc });
  if (hazardRows.length)
    sections.push({ heading: 'Hazards and controls', kind: 'table', columns: ['#', 'Hazard', 'Controls written on the permit'], rows: hazardRows });
  if (precautions.length) sections.push({ heading: 'Precautions', kind: 'items', items: precautions });
  if (ppe.length) sections.push({ heading: 'PPE required', kind: 'items', items: ppe });
  const emergency = paras(r.emergency_procedures);
  if (emergency.length) sections.push({ heading: 'Emergency procedures', kind: 'text', paragraphs: emergency });
  if (str(r.approval_comments))
    sections.push({ heading: 'Approval comments', kind: 'text', paragraphs: paras(r.approval_comments) });
  if (r.closed_at || key === 'closed')
    sections.push({
      heading: 'Close-out',
      kind: 'kv',
      rows: rows([
        ['Closed', fmtDateTime(r.closed_at) || 'Time not recorded'],
        ['Closed by', str(r.closed_by) || 'Not recorded'],
      ]),
    });

  // Receiver: a remote-link signature (sign_permit_by_token sets receiver_signed_at;
  // a signature taken on the issuer's device leaves it null).
  const remote = ctx.remote['receiver'];
  const receiverSig: Signature | null = remote
    ? signature('Permit receiver', remote.name, remote.image, remote.signedAt, 'link')
    : r.receiver_signed_at
      ? signature('Permit receiver', r.receiver_name, r.receiver_signature, r.receiver_signed_at, 'link')
      : signature('Permit receiver', r.receiver_name, r.receiver_signature, r.created_at);
  const signatures = [
    signature('Permit issuer', r.issuer_name, r.issuer_signature, r.created_at),
    receiverSig ??
      (awaitingReceiver
        ? { role: 'Permit receiver', name: str(r.receiver_name) || 'Not yet signed', image: '', when: '', method: 'Awaiting signature by link' }
        : null),
    r.approved_by || r.approval_signature
      ? signature('Approved by', r.approved_by, r.approval_signature, r.approved_at)
      : null,
  ].filter(Boolean) as Signature[];

  const audit = [
    { event: 'Permit issued', at: fmtDateTime(r.created_at) },
    r.receiver_signed_at ? { event: 'Receiver accepted by link', at: fmtDateTime(r.receiver_signed_at) } : null,
    r.approved_at ? { event: `Approved${str(r.approved_by) ? ` by ${str(r.approved_by)}` : ''}`, at: fmtDateTime(r.approved_at) } : null,
    version > 1 && r.updated_at ? { event: `Amended (now version ${version})`, at: fmtDateTime(r.updated_at) } : null,
    r.closed_at ? { event: `Closed${str(r.closed_by) ? ` by ${str(r.closed_by)}` : ''}`, at: fmtDateTime(r.closed_at) } : null,
  ].filter(Boolean) as { event: string; at: string }[];

  const notes = paras(r.additional_notes);

  return {
    meta: {
      kind: typeLabel,
      title: str(r.title) || typeLabel,
      subtitle: 'The conditions under which this work was authorised, as issued and signed.',
      reference: refFrom('PTW', r.id),
      issued: fmtDate(r.created_at),
      version: String(version),
    },
    status,
    job: { site: str(r.location) || ctx.job.site },
    prepared_by: str(r.issuer_name) || ctx.preparedBy,
    cover_facts: evenFacts([
      { label: 'Valid from', value: fmtDateTime(r.start_time) },
      { label: 'Valid until', value: fmtDateTime(r.end_time) },
      { label: 'Receiver', value: str(r.receiver_name) || (awaitingReceiver ? 'Awaiting signature' : '') },
      { label: 'Duration', value: r.duration_hours ? plural(Number(r.duration_hours), 'hour') : '' },
    ]),
    headline: [
      { label: 'Hazards listed', value: String(hazardRows.length) },
      { label: 'Precautions', value: String(precautions.length) },
      ...(ppe.length ? [{ label: 'PPE items', value: String(ppe.length) }] : []),
    ],
    alert: awaitingReceiver && key === 'active'
      ? { tone: 'warn', title: 'Receiver has not signed.', text: 'The permit was sent to the receiver by link and their acceptance is not yet recorded.' }
      : overran
        ? { tone: 'warn', title: 'Validity window has ended.', text: `The permit ran until ${fmtDateTime(r.end_time)} and has not been recorded as closed.` }
        : key === 'active'
          ? { tone: 'live', title: 'Permit active.', text: `Valid from ${fmtDateTime(r.start_time)} to ${fmtDateTime(r.end_time)}. Keep it at the work location until it is closed.` }
          : key === 'expired'
            ? { tone: 'bad', title: 'Permit expired.', text: 'Work under this permit should not continue. A new permit is needed.' }
            : undefined,
    sections,
    signatures,
    photos: mergePhotos(ctx.photoUrl, [r.photos]),
    audit,
    notes: notes.length ? notes : undefined,
    disclaimer:
      'A record of a permit to work as issued and signed by the people named. The app records the permit; it does not inspect the work area or confirm that the precautions were in place.',
  };
};
