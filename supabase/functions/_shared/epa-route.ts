// Which NET assessment a learner's qualification leads to — the edge-function
// copy of src/lib/epa/readiness.ts `epaRouteFor` (functions can't import from
// src/). KEEP THE TWO IN STEP. Sources: NET's AM2 / AM2S / AM2E / AM2D pages
// and the ST0152 assessment plan (May 2018) — see src/lib/epa/facts.ts.
//
// Pass the code the learner is ENROLLED on (the college course code), not the
// requirement code it maps to: 603/5982/1 maps to the 601/7345/2 AC rows but
// is an AM2E, not an AM2S.

export type EpaRouteKind = 'am2s' | 'am2' | 'am2e' | 'am2d' | 'none';

const ROUTE_CODES: Array<[EpaRouteKind, string[]]> = [
  ['am2s', ['5357', '601/7345/2', '603/3895/8', '603/3928/7', 'st0152']],
  ['am2', ['2357', '1605', 'eal-netp3']],
  ['am2e', ['2346', '603/5982/1', 'elec-exp-worker']],
  ['am2d', ['5393', '610/1335/3']],
];

export function epaRouteFor(code: string | null | undefined): EpaRouteKind {
  const c = (code ?? '').trim().toLowerCase();
  if (!c) return 'none';
  for (const [kind, codes] of ROUTE_CODES)
    if (codes.some((k) => c === k || c.startsWith(`${k}-`) || c.startsWith(`${k} `))) return kind;
  return 'none';
}

/** Pass/Merit/Distinction is sourced for ST0152 (the AM2S) only. */
export const routeIsGraded = (r: EpaRouteKind) => r === 'am2s';

/** The facts block for an AI prompt — never contradicted by the model. */
export function routeFactsBlock(r: EpaRouteKind): string {
  switch (r) {
    case 'am2s':
      return `HOW THE EPA WORKS (Installation/Maintenance Electrician, ST0152 assessment plan — do not contradict this):
- The end-point assessment IS the AM2S (AM2S v1 for apprentices registered from September 2023), set by NET. It is synoptic and practical.
- There is NO professional discussion and no separate interview. Never recommend preparing for one.
- Graded Pass / Merit / Distinction at 70% / 80% / 90%. A retake can only be graded Pass. The overall apprenticeship grade comes from the AM2S grade alone.
- Gateway: Level 3 electrotechnical qualification, Level 2 English and maths (if under 19 at the start; from 19 the employer decides), off-the-job training, and employer + provider sign-off.
- AM2 practice results (sections A1 and B–E) in the data are the closest evidence of AM2S performance; weigh them above portfolio volume.`;
    case 'am2':
      return `HOW IT ENDS (C&G 2357 / EAL Level 3 NVQ — do not contradict this):
- The AM2 is the final unit of the NVQ, taken once every other unit is complete (NET). It is not an apprenticeship-standard EPA.
- Do NOT predict Merit or Distinction — no grade boundaries are sourced for this route. Use predicted_grade 'pass' for on track, 'fail' for not yet.
- There is no professional discussion. Weigh AM2 practice and portfolio completion (every other unit signed off).`;
    case 'am2e':
      return `HOW IT ENDS (Experienced Worker Assessment — do not contradict this):
- The AM2E is the last step of the Experienced Worker Assessment, taken once the Experienced Worker Qualification is gained (NET). It is not an apprenticeship EPA.
- Do NOT predict Merit or Distinction. Use predicted_grade 'pass' for on track, 'fail' for not yet.`;
    case 'am2d':
      return `HOW THE EPA WORKS (Domestic Electrician standard — do not contradict this):
- The end-point assessment is the AM2D (NET): a 19-hour practical and a 90-minute knowledge test.
- Do NOT predict Merit or Distinction — no grade boundaries are sourced here. Use predicted_grade 'pass' for on track, 'fail' for not yet.`;
    default:
      return `This learner's qualification does not end in an AM2-family assessment or an end-point assessment. Do not describe an EPA for it; judge readiness for completing the qualification, and use predicted_grade 'pass' (on track) or 'fail' (not yet) only.`;
  }
}
