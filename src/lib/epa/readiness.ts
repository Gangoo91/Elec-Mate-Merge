/**
 * EPA readiness — ONE model, seen by the apprentice and their tutor alike.
 *
 * 6 Oct 2026. Four models disagreed before: a portfolio/evidence-quality/
 * discussion/knowledge blend (evidence quality had never had a row, so nobody
 * could score above ~75), a grade predictor with invented 50/65/80 bands, the
 * tutor's verdict gauge, and the cohort page. None of them looked at AM2
 * practice, though for these routes the end assessment IS a NET AM2.
 *
 * The learner's qualification (the one their portfolio is on) decides the
 * route — which NET assessment ends it, and whether that is an EPA. Then
 * readiness is the three things that stand between them and it:
 *   1. AM2 practice (50) — the five sections the simulator covers (A1–E), each
 *      "ready" after two Assessment runs in a row at the bar (useAM2Sections):
 *      an equal share each when ready, a third of it while practising.
 *   2. Portfolio (25) — their own qualification's ACs, keyed unit + AC, with
 *      evidence. Signed-off ACs count in full, evidenced-but-unsigned half.
 *   3. Gateway (25) — the route's sign-off items (epa_gateway_checklist).
 * It's an estimate — the employer and provider decide gateway — and the copy
 * says so. Never "Ready for EPA".
 */
import type { AM2SectionsData, AM2SectionKey } from '@/hooks/am2/useAM2Sections';

/* ── Routes ─────────────────────────────────────────────────────────── */

/**
 * Which NET assessment a qualification leads to. From NET's own pages
 * (netservices.org.uk, read 6 Oct 2026):
 *   AM2  — "should be taken by those following the Level 3 NVQ (C&G 2357 or
 *          EAL 1605)… the final unit within the NVQ".
 *   AM2S — apprentices on the Installation & Maintenance Electrician standard
 *          (ST0152); AM2S v1 for those enrolled from September 2023.
 *   AM2E — the Experienced Worker Assessment, after the Experienced Worker
 *          Qualification.
 *   AM2D — "the End Point Assessment for apprentices enrolled on the Domestic
 *          Electrician apprenticeship standard": a 19-hour practical and a
 *          90-minute knowledge test.
 * Codes as in the qualifications table.
 */
export type EpaRouteKind = 'am2s' | 'am2' | 'am2e' | 'am2d' | 'none';

export interface EpaRoute {
  kind: EpaRouteKind;
  /** The NET assessment, e.g. "AM2S". */
  assessment: string;
  /** Is it the apprenticeship's end-point assessment? (AM2 and AM2E aren't.) */
  isEpa: boolean;
  /** Pass/Merit/Distinction at 70/80/90 — sourced for ST0152 only. */
  graded: boolean;
  summary: string;
}

const ROUTES: Record<EpaRouteKind, EpaRoute> = {
  am2s: {
    kind: 'am2s',
    assessment: 'AM2S',
    isEpa: true,
    graded: true,
    summary:
      'Your end-point assessment is the AM2S (AM2S v1 if you started from September 2023), graded Pass, Merit or Distinction.',
  },
  am2: {
    kind: 'am2',
    assessment: 'AM2',
    isEpa: false,
    graded: false,
    summary:
      'The AM2 is the final unit of your NVQ — NET says take it once every other unit is complete.',
  },
  am2e: {
    kind: 'am2e',
    assessment: 'AM2E',
    isEpa: false,
    graded: false,
    summary:
      'The AM2E is the last step of the Experienced Worker Assessment, once you hold the Experienced Worker Qualification.',
  },
  am2d: {
    kind: 'am2d',
    assessment: 'AM2D',
    isEpa: true,
    graded: false,
    summary:
      'Your end-point assessment is the AM2D: a 19-hour practical and a 90-minute knowledge test.',
  },
  none: {
    kind: 'none',
    assessment: '',
    isEpa: false,
    graded: false,
    summary: 'Your qualification doesn’t end in an AM2 or an end-point assessment.',
  },
};

const ROUTE_CODES: Array<[EpaRouteKind, string[]]> = [
  ['am2s', ['5357', '601/7345/2', '603/3895/8', '603/3928/7', 'st0152']],
  ['am2', ['2357', '1605', 'eal-netp3']],
  ['am2e', ['2346', '603/5982/1', 'elec-exp-worker']],
  ['am2d', ['5393', '610/1335/3']],
];

export function epaRouteFor(code: string | null | undefined): EpaRoute {
  const c = (code ?? '').trim().toLowerCase();
  if (!c) return ROUTES.none;
  for (const [kind, codes] of ROUTE_CODES)
    if (codes.some((k) => c === k || c.startsWith(`${k}-`) || c.startsWith(`${k} `)))
      return ROUTES[kind];
  return ROUTES.none;
}

/** Does this qualification end in an AM2-family assessment worth tracking? */
export function hasEpa(code: string | null | undefined): boolean {
  return epaRouteFor(code).kind !== 'none';
}

/* ── Inputs ─────────────────────────────────────────────────────────── */

export interface GatewayRowLike {
  portfolio_signed_off?: boolean | null;
  ojt_hours_verified?: boolean | null;
  ojt_hours_completed?: number | null;
  ojt_hours_required?: number | null;
  english_level2_achieved?: boolean | null;
  maths_level2_achieved?: boolean | null;
  /** Employer decided English and maths aren't needed (19+ at the start). */
  english_maths_not_required?: boolean | null;
  employer_satisfied?: boolean | null;
  provider_satisfied?: boolean | null;
  gateway_passed?: boolean | null;
  gateway_passed_at?: string | null;
  epa_booking_date?: string | null;
}

/** The learner's portfolio against their own qualification's ACs. */
export interface PortfolioCoverage {
  totalACs: number;
  /** ACs with evidence (any state past "not started"). */
  evidenced: number;
  /** ACs an assessor has signed off (or IQA confirmed). */
  signedOff: number;
  /** Units with the fewest covered ACs, for "what next". */
  weakestUnits?: Array<{ unitCode: string; unitTitle: string; covered: number; total: number }>;
}

/* ── Output ─────────────────────────────────────────────────────────── */

export type GatewayItemKey =
  'qualification' | 'otj' | 'english' | 'maths' | 'employer' | 'provider';

export interface GatewayItem {
  key: GatewayItemKey;
  label: string;
  done: boolean;
  detail: string;
}

export type EpaReadinessStatus =
  'starting' | 'building' | 'am2_ready' | 'gateway_ready' | 'gateway_passed';

export interface EpaReadinessModel {
  route: EpaRoute;
  score: number;
  status: EpaReadinessStatus;
  headline: string;
  am2: {
    score: number;
    ready: number;
    of: number;
    sections: Array<{
      key: AM2SectionKey;
      title: string;
      status: 'not_tried' | 'practising' | 'ready';
      last: number | null;
      bar: number;
    }>;
    lastMock: AM2SectionsData['lastMock'];
  };
  portfolio: {
    score: number;
    known: boolean;
    totalACs: number;
    evidenced: number;
    signedOff: number;
    pct: number;
    weakestUnits: NonNullable<PortfolioCoverage['weakestUnits']>;
  };
  gateway: {
    score: number;
    recorded: boolean;
    done: number;
    of: number;
    items: GatewayItem[];
    passed: boolean;
    bookingDate: string | null;
  };
  /** In order: what to do next. */
  next: Array<{
    label: string;
    kind: 'am2' | 'portfolio' | 'gateway';
    section?: AM2SectionKey;
    unitCode?: string;
  }>;
}

export const AM2_WEIGHT = 50;
export const PORTFOLIO_WEIGHT = 25;
export const GATEWAY_WEIGHT = 25;

/** Share of a section's points: full when ready, a third while practising.
 *  Shared out over however many sections there are (A1–E: five). */
const SECTION_SHARE = { ready: 1, practising: 1 / 3, not_tried: 0 } as const;

const EM_DETAIL = 'Needed if you were under 19 when you started; from 19 your employer decides.';
const EM_WAIVED =
  'Not required — your employer’s decision, as you were 19 or over when you started.';

export function gatewayItems(g: GatewayRowLike | null, route: EpaRoute): GatewayItem[] {
  const hrs = g?.ojt_hours_completed ?? null;
  const req = g?.ojt_hours_required ?? null;
  const qualification: GatewayItem = {
    key: 'qualification',
    label:
      route.kind === 'am2'
        ? 'Every other NVQ unit complete'
        : route.kind === 'am2e'
          ? 'Experienced Worker Qualification gained'
          : 'Level 3 qualification and portfolio signed off',
    done: !!g?.portfolio_signed_off,
    detail:
      route.kind === 'am2'
        ? 'NET: the AM2 is the final unit — take it once the rest of the NVQ is done.'
        : route.kind === 'am2e'
          ? 'NET asks for proof of the qualification before you can book the AM2E.'
          : 'Your assessor signs off the portfolio for your Level 3 qualification.',
  };
  const employer: GatewayItem = {
    key: 'employer',
    label: 'Employer sign-off',
    done: !!g?.employer_satisfied,
    detail: `Your employer confirms you are ready for the ${route.assessment || 'assessment'}.`,
  };
  const provider: GatewayItem = {
    key: 'provider',
    label: 'Training provider sign-off',
    done: !!g?.provider_satisfied,
    detail: `Your college or provider confirms you are ready for the ${route.assessment || 'assessment'}.`,
  };
  // Off-the-job hours and English/maths belong to apprenticeship standards.
  if (!route.isEpa) return [qualification, employer, provider];
  return [
    qualification,
    {
      key: 'otj',
      label: 'Off-the-job hours verified',
      done: !!g?.ojt_hours_verified,
      detail:
        hrs != null && req
          ? `${Math.round(hrs)} of ${Math.round(req)} planned hours recorded.`
          : 'Your provider checks your hours against your training plan.',
    },
    {
      key: 'english',
      label: 'Level 2 English',
      done: !!g?.english_level2_achieved || !!g?.english_maths_not_required,
      detail: g?.english_maths_not_required && !g?.english_level2_achieved ? EM_WAIVED : EM_DETAIL,
    },
    {
      key: 'maths',
      label: 'Level 2 maths',
      done: !!g?.maths_level2_achieved || !!g?.english_maths_not_required,
      detail: g?.english_maths_not_required && !g?.maths_level2_achieved ? EM_WAIVED : EM_DETAIL,
    },
    employer,
    provider,
  ];
}

export function buildEpaReadiness(
  am2: AM2SectionsData | null,
  gateway: GatewayRowLike | null,
  qualificationCode?: string | null,
  portfolio?: PortfolioCoverage | null,
  /** The qualification as ENROLLED (before mapping to its requirement code).
   *  The route comes from this: 603/5982/1 (experienced worker) maps to the
   *  601/7345/2 AC rows but is an AM2E, not an AM2S. */
  routeCode?: string | null
): EpaReadinessModel {
  // No code given: the AM2 practice still means something, so assume the
  // standard (ST0152) — the route nearly every AM2 user is on.
  const code = routeCode ?? qualificationCode;
  const route = code === undefined ? ROUTES.am2s : epaRouteFor(code);

  const sections = (am2?.sections ?? []).map((s) => ({
    key: s.key,
    title: s.title,
    status: s.status,
    last: s.recent[0]?.score ?? null,
    bar: s.bar,
  }));
  const am2Score = sections.length
    ? (sections.reduce((n, s) => n + SECTION_SHARE[s.status], 0) / sections.length) * AM2_WEIGHT
    : 0;
  const ready = sections.filter((s) => s.status === 'ready').length;

  const total = portfolio?.totalACs ?? 0;
  const signed = Math.min(total, portfolio?.signedOff ?? 0);
  const evidenced = Math.min(total, Math.max(signed, portfolio?.evidenced ?? 0));
  const coverage = total > 0 ? (signed + (evidenced - signed) * 0.5) / total : 0;
  const pfScore = Math.round(coverage * PORTFOLIO_WEIGHT);

  const items = gatewayItems(gateway, route);
  const done = items.filter((i) => i.done).length;
  const gwScore = Math.round((done / items.length) * GATEWAY_WEIGHT);
  const passed = !!gateway?.gateway_passed;

  const score = Math.min(100, Math.round(am2Score + pfScore + gwScore));
  const allAm2 = sections.length > 0 && ready === sections.length;
  const allGw = done === items.length;
  const what = route.assessment || 'AM2';

  const status: EpaReadinessStatus = passed
    ? 'gateway_passed'
    : allAm2 && allGw
      ? 'gateway_ready'
      : allAm2
        ? 'am2_ready'
        : score > 0
          ? 'building'
          : 'starting';

  const headline = {
    starting: `Start with ${what} practice — Section C is the shortest.`,
    building: `${ready} of ${sections.length || 4} ${what} sections at the practice bar · ${total ? `${Math.round(coverage * 100)}% of your ACs covered · ` : ''}${done} of ${items.length} sign-off items done.`,
    am2_ready: `Every ${what} section is at the practice bar. ${items.length - done} sign-off item${items.length - done === 1 ? '' : 's'} still open.`,
    gateway_ready: `${what} practice and every sign-off item are done. Your employer and provider decide when you go through.`,
    gateway_passed: `Gateway passed — keep your ${what} practice sharp until the day.`,
  }[status];

  const next: EpaReadinessModel['next'] = [];
  const notReady = sections.filter((s) => s.status !== 'ready');
  for (const s of [
    ...notReady.filter((s) => s.status === 'not_tried'),
    ...notReady.filter((s) => s.status === 'practising'),
  ].slice(0, 2)) {
    next.push({
      kind: 'am2',
      section: s.key,
      label:
        s.status === 'not_tried'
          ? `Try ${s.title} in Assessment mode`
          : `Two ${s.title} Assessment runs in a row at ${s.bar}%`,
    });
  }
  const weakest = (portfolio?.weakestUnits ?? []).filter((u) => u.covered < u.total);
  if (weakest[0])
    next.push({
      kind: 'portfolio',
      unitCode: weakest[0].unitCode,
      label: `Evidence for unit ${weakest[0].unitCode}: ${weakest[0].covered} of ${weakest[0].total} ACs covered`,
    });
  for (const i of items.filter((i) => !i.done).slice(0, 2))
    next.push({ kind: 'gateway', label: i.label });

  return {
    route,
    score,
    status,
    headline,
    am2: {
      score: Math.round(am2Score),
      ready,
      of: sections.length,
      sections,
      lastMock: am2?.lastMock ?? null,
    },
    portfolio: {
      score: pfScore,
      known: total > 0,
      totalACs: total,
      evidenced,
      signedOff: signed,
      pct: Math.round(coverage * 100),
      weakestUnits: weakest.slice(0, 3),
    },
    gateway: {
      score: gwScore,
      recorded: !!gateway,
      done,
      of: items.length,
      items,
      passed,
      bookingDate: gateway?.epa_booking_date ?? null,
    },
    next,
  };
}

/** Status → short label, for chips and cohort rows. Never "Ready for EPA". */
export const EPA_STATUS_LABEL: Record<EpaReadinessStatus, string> = {
  starting: 'Not started',
  building: 'Building',
  am2_ready: 'AM2 practice ready',
  gateway_ready: 'Sign-offs done',
  gateway_passed: 'Gateway passed',
};

/**
 * Portfolio coverage from the qualification's AC list and the learner's
 * student_ac_coverage / sign-off rows — matched on unit + AC. (Matching on the
 * bare AC code, as before, let evidence for 1.1 in one unit clear 1.1 in all.)
 */
export function portfolioCoverage(
  acs: Array<{ unit_code: string; unit_title?: string | null; ac_code: string }>,
  rows: Array<{
    unit_code: string | null;
    ac_code: string | null;
    state: 'evidenced' | 'signed_off';
  }>
): PortfolioCoverage {
  const key = (u: string | null | undefined, a: string | null | undefined) =>
    `${(u ?? '').trim().toLowerCase()}:${(a ?? '').trim().toLowerCase()}`;
  const state = new Map<string, 'evidenced' | 'signed_off'>();
  for (const r of rows) {
    const k = key(r.unit_code, r.ac_code);
    if (state.get(k) !== 'signed_off') state.set(k, r.state);
  }
  const units = new Map<string, { unitTitle: string; covered: number; total: number }>();
  const seen = new Set<string>();
  let evidenced = 0;
  let signedOff = 0;
  for (const ac of acs) {
    const k = key(ac.unit_code, ac.ac_code);
    if (seen.has(k)) continue;
    seen.add(k);
    const u = units.get(ac.unit_code) ?? { unitTitle: ac.unit_title ?? '', covered: 0, total: 0 };
    u.total++;
    const s = state.get(k);
    if (s) {
      evidenced++;
      u.covered++;
      if (s === 'signed_off') signedOff++;
    }
    units.set(ac.unit_code, u);
  }
  return {
    totalACs: seen.size,
    evidenced,
    signedOff,
    weakestUnits: [...units.entries()]
      .map(([unitCode, u]) => ({ unitCode, ...u }))
      .sort((a, b) => a.covered / a.total - b.covered / b.total),
  };
}

/**
 * A portfolio item's AC reference → { unit_code, ac_code } on THIS
 * qualification, or null. Live refs come as "204 AC 6.2: Test…",
 * "ELTP06 (Unit 317) AC 2.2", "ELTP04 (315) AC 6.5", "NETP3-07 AC 1.1" — and
 * bare "1.1", which names no unit and so can't be placed (counting it against
 * every unit's 1.1 is what inflated coverage before).
 */
export function parsePortfolioAcRef(
  ref: string,
  unitCodes: string[]
): { unit_code: string; ac_code: string } | null {
  const m = ref.match(/^(.*?)\bAC\s*([0-9]+(?:\.[0-9]+)+)/i);
  if (!m) return null;
  const before = m[1];
  const ac = m[2];
  const tokens = before.match(/[A-Za-z0-9]+(?:-[A-Za-z0-9]+)?/g) ?? [];
  const lower = unitCodes.map((u) => ({ u, parts: u.toLowerCase().split('/') }));
  // Prefer a token in brackets ("(Unit 317)") — it's the unit; the code before it is a module id.
  const bracket = before.match(/\((?:unit\s*)?([A-Za-z0-9-]+)\)/i)?.[1];
  for (const t of [bracket, ...tokens].filter(Boolean) as string[]) {
    const hit = lower.find((x) => x.parts.includes(t.toLowerCase()));
    if (hit) return { unit_code: hit.u, ac_code: ac };
  }
  return null;
}

/**
 * One AC's state from the college's coverage and sign-off rows — the same rule
 * for the learner's screen and the tutor's (it lived only on the tutor side,
 * so a "referred" AC still counted half for the learner). An IQA confirmation
 * or an assessor "passed" is signed off; "referred"/"not yet" counts as
 * neither; otherwise evidenced/assessed status, or any evidence, is evidenced.
 */
export function acState(
  c: { status?: string | null; evidence_count?: number | null } | undefined,
  so: { assessor_verdict?: string | null; iqa_verdict?: string | null } | undefined
): 'evidenced' | 'signed_off' | null {
  if (so?.iqa_verdict === 'confirmed') return 'signed_off';
  if (so?.assessor_verdict === 'referred' || so?.assessor_verdict === 'not_yet') return null;
  if (so?.assessor_verdict === 'passed') return 'signed_off';
  if (c?.status === 'confirmed') return 'signed_off';
  if (c?.status === 'evidenced' || c?.status === 'assessed') return 'evidenced';
  if ((c?.evidence_count ?? 0) > 0) return 'evidenced';
  return null;
}
