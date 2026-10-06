import type { Mapper, Section } from '../contract.ts';
import { fmtDate, fmtDateTime, fmtTime, humanise, refFrom, rows, photoList, signature, str, type Row } from '../common.ts';

const PAIRS: Record<string, string> = {
  ln: 'Line – Neutral', le: 'Line – Earth', ne: 'Neutral – Earth',
  l1l2: 'L1 – L2', l1l3: 'L1 – L3', l2l3: 'L2 – L3',
  l1n: 'L1 – Neutral', l2n: 'L2 – Neutral', l3n: 'L3 – Neutral',
  l1e: 'L1 – Earth', l2e: 'L2 – Earth', l3e: 'L3 – Earth',
};
const SINGLE = ['ln', 'le', 'ne'];
const THREE = ['l1l2', 'l1l3', 'l2l3', 'l1n', 'l2n', 'l3n', 'l1e', 'l2e', 'l3e', 'ne'];
const DEAD_V = 50;

const STATUS: Record<string, { label: string; tone: 'live' | 'ok' | 'warn' | 'neutral' }> = {
  isolated: { label: 'Isolated', tone: 'live' },
  re_energised: { label: 'Re-energised', tone: 'ok' },
  in_progress: { label: 'In progress', tone: 'warn' },
  cancelled: { label: 'Cancelled', tone: 'neutral' },
};

/**
 * Safe isolation record. Prints exactly what the electrician recorded at each
 * step — including their own "tester proved" answers and every prove-dead
 * reading for the phase count — and says plainly that the app records the
 * isolation; it does not perform or prove it.
 */
export const safeIsolationMapper: Mapper = (r: Row, ctx) => {
  const status = STATUS[str(r.status)] ?? { label: humanise(r.status) || 'Recorded', tone: 'neutral' as const };
  const steps: Row[] = Array.isArray(r.steps) ? r.steps : [];
  const done = steps.filter((s) => s.completed).length;
  const proveDead = steps.find((s) => s.stepNumber === 6);
  const v: Row = proveDead?.voltageReadings ?? {};
  const keys = (v.phases === 3 ? THREE : SINGLE).filter((k) => v[k] !== undefined);
  const readings = keys.map((k) => {
    const n = typeof v[k] === 'number' ? v[k] : null;
    return [PAIRS[k] ?? k, n === null ? 'Not recorded' : `${n} V`, `< ${DEAD_V} V`, n === null ? '—' : n < DEAD_V ? 'Dead' : 'LIVE'];
  });
  const maxV = keys.reduce((m, k) => (typeof v[k] === 'number' && v[k] > m ? v[k] : m), -1);
  const anyLive = maxV >= DEAD_V;

  const stepExtra = (s: Row): string => {
    const bits: string[] = [];
    if (s.stepNumber === 3 || s.stepNumber === 7) {
      if (s.testerProvedOk === true) bits.push('Tester indicated correctly: Yes');
      else if (s.completed) bits.push('Tester check: not recorded');
      if (s.instrumentModel || s.instrumentSerial)
        bits.push([str(s.instrumentModel), s.instrumentSerial ? `SN ${str(s.instrumentSerial)}` : ''].filter(Boolean).join(' '));
      if (s.provingUnitSerial) bits.push(`Proving unit ${str(s.provingUnitSerial)}`);
    }
    if (s.stepNumber === 5 && s.lockOffNumber) bits.push(`Lock-off ${str(s.lockOffNumber)}`);
    if (s.stepNumber === 6 && keys.length) bits.push(anyLive ? 'A reading was 50 V or more — see readings' : `All ${keys.length} readings below ${DEAD_V} V`);
    if (s.notes) bits.push(str(s.notes));
    return bits.join(' · ');
  };

  const sections: Section[] = [
    {
      heading: 'Circuit and equipment',
      kind: 'kv',
      rows: rows([
        ['Site', r.site_address],
        ['Circuit', r.circuit_description],
        ['Distribution board', r.distribution_board],
        ['Isolation device', r.isolation_device],
        ['Method', humanise(r.isolation_method)],
        ['Lock-off', r.lock_off_number],
        ['Voltage indicator', r.voltage_detector_serial],
        ['Indicator calibration', fmtDate(r.voltage_detector_calibration_date)],
        ['Proving unit used', r.proving_unit_used === true ? 'Yes' : r.proving_unit_used === false ? 'Not recorded' : ''],
      ]),
    },
  ];
  if (readings.length)
    sections.push({ heading: 'Prove dead readings', kind: 'table', columns: ['Conductors', 'Reading', 'Threshold', 'Result'], rows: readings });
  if (steps.length)
    sections.push({
      heading: 'Isolation steps',
      intro: 'Each step was ticked by the person carrying out the isolation as they did it. The app records the steps; it does not perform or prove the isolation.',
      kind: 'steps',
      steps: steps.map((s) => ({
        n: str(s.stepNumber),
        title: str(s.title),
        detail: str(s.description),
        extra: stepExtra(s),
        done: !!s.completed,
        when: fmtTime(s.completedAt),
      })),
    });
  const extra: string[] = Array.isArray(r.additional_circuits) ? r.additional_circuits.map((c: unknown) => str(typeof c === 'string' ? c : (c as Row)?.description ?? (c as Row)?.name)).filter(Boolean) : [];
  if (extra.length) sections.push({ heading: 'Additional circuits isolated', kind: 'items', items: extra });
  if (r.status === 're_energised')
    sections.push({ heading: 'Re-energisation', kind: 'kv', rows: rows([['Re-energised', fmtDateTime(r.re_energisation_at)], ['By', r.re_energisation_by]]) });

  const remoteVerifier = ctx.remote['verifier'];
  const signatures = [
    signature('Isolated by', r.isolator_name, r.isolator_signature, r.isolation_completed_at),
    remoteVerifier
      ? signature('Verified by', remoteVerifier.name, remoteVerifier.image, remoteVerifier.signedAt, 'link')
      : signature('Verified by', r.verifier_name, r.verifier_signature, r.isolation_completed_at),
    r.approved_by ? signature('Approved by', r.approved_by, r.approval_signature, r.approved_at) : null,
  ].filter(Boolean) as NonNullable<ReturnType<typeof signature>>[];

  const audit = [
    { event: 'Record created', at: fmtDateTime(r.created_at) },
    r.isolation_completed_at ? { event: 'Isolation completed', at: fmtDateTime(r.isolation_completed_at) } : null,
    remoteVerifier ? { event: 'Verifier signed by link', at: fmtDateTime(remoteVerifier.signedAt) } : null,
    r.re_energisation_at ? { event: 'Re-energised', at: fmtDateTime(r.re_energisation_at) } : null,
  ].filter(Boolean) as { event: string; at: string }[];

  return {
    meta: {
      kind: 'Safe isolation record',
      title: str(r.circuit_description) || 'Safe isolation',
      subtitle: 'Isolation, lock-off and prove-dead recorded step by step as they were carried out.',
      reference: refFrom('ISO', r.id),
      issued: fmtDate(r.isolation_completed_at || r.created_at),
    },
    status,
    job: { site: str(r.site_address) || ctx.job.site },
    prepared_by: str(r.isolator_name) || ctx.preparedBy,
    cover_facts: [
      { label: 'Circuit', value: str(r.circuit_description) },
      { label: 'Board', value: str(r.distribution_board) },
      { label: 'Lock-off', value: str(r.lock_off_number) || 'Not recorded' },
      { label: 'Isolated at', value: fmtDateTime(r.isolation_completed_at) || 'Not completed' },
    ].filter((f) => f.value),
    headline: [
      { label: 'Steps completed', value: `${done}/${steps.length || 8}`, verdict: done === steps.length && steps.length ? 'pass' : 'warn', verdict_label: done === steps.length && steps.length ? 'Complete' : 'Incomplete' },
      ...(keys.length ? [{ label: 'Highest reading', value: String(Math.max(maxV, 0)), unit: 'V', verdict: anyLive ? 'fail' : 'pass', verdict_label: anyLive ? '50 V or more' : `Below ${DEAD_V} V` }] : []),
    ],
    alert:
      r.status === 'isolated'
        ? { tone: 'live', title: 'Circuit still isolated.', text: 'Do not re-energise without authorisation. Lock-off devices stay in place until re-energisation is recorded.' }
        : anyLive
          ? { tone: 'bad', title: 'Prove dead failed.', text: 'A reading of 50 V or more was recorded. The circuit was not recorded as dead.' }
          : undefined,
    sections,
    signatures,
    photos: photoList(r.photos, ctx.photoUrl),
    audit,
    disclaimer:
      'A record of a safe isolation as entered by the people named. It does not itself prove a circuit is dead. GS38 is HSE guidance on test equipment; the legal duty to work dead sits in the Electricity at Work Regulations 1989 (regulations 12–14).',
  };
};
