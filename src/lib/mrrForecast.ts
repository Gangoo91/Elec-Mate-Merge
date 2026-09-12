/**
 * How long to the next MRR milestone, at the rate we are actually growing.
 *
 * Deliberately linear, and deliberately a RANGE.
 *
 * The tempting version is compound: MRR went £3,656 → £4,459 in thirty days,
 * which is 22% a month, and 22% a month compounded says £10k arrives in
 * January. Nothing sustains 22% a month for seven months, and a date built on
 * that assumption is a wish with a calendar next to it. Two straight lines —
 * the trailing 30-day rate and the trailing 90-day rate — bracket the answer
 * with arithmetic anyone can check, and when the two dates are far apart that
 * spread is itself the honest signal about how uncertain the far milestones
 * are.
 *
 * Everything here is pure so it can be exercised without a browser.
 */

export interface MrrSample {
  day: string;
  total: number;
}

export interface Pace {
  /** £ added per day. */
  perDay: number;
  /** Days the rate was measured over. */
  window: number;
  /** £ added across the window. */
  added: number;
}

export interface MilestoneForecast {
  target: number;
  /** Already there. */
  reached: boolean;
  /** £ still to find. */
  toGo: number;
  /** Extra paying subscribers at today's ARPU. Null when ARPU is unknown. */
  subscribersNeeded: number | null;
  /** Soonest credible arrival (faster of the two paces). Null if not growing. */
  soonest: Date | null;
  /** Latest of the two paces. Null if not growing. */
  latest: Date | null;
  /** Days to `soonest`. */
  soonestDays: number | null;
}

/** £ per day between the sample `window` days back and the latest one. */
export function paceOver(points: MrrSample[], window: number): Pace | null {
  if (points.length < 2) return null;
  const last = points[points.length - 1];
  const idx = points.length - 1 - window;
  // Not enough history for this window — fall back to the oldest sample we
  // have rather than inventing one, and report the real span it covers.
  const start = idx >= 0 ? points[idx] : points[0];
  const span = idx >= 0 ? window : points.length - 1;
  if (span <= 0) return null;
  const added = last.total - start.total;
  return { perDay: added / span, window: span, added };
}

const addDays = (n: number): Date => new Date(Date.now() + n * 86_400_000);

/**
 * Where the next milestones land.
 *
 * A pace of zero or less yields null dates rather than Infinity — "never at
 * this rate" is a real answer and the UI says so, where a blank or a silly
 * number would not.
 */
export function forecastMilestone(
  currentMrr: number,
  targets: number[],
  paces: Array<Pace | null>,
  arpu: number | null
): MilestoneForecast[] {
  const rates = paces.filter((p): p is Pace => !!p && p.perDay > 0).map((p) => p.perDay);
  return targets.map((target) => {
    const toGo = Math.max(target - currentMrr, 0);
    const reached = currentMrr >= target;
    if (reached || rates.length === 0) {
      return {
        target,
        reached,
        toGo,
        subscribersNeeded: reached || !arpu ? (reached ? 0 : null) : Math.ceil(toGo / arpu),
        soonest: null,
        latest: null,
        soonestDays: null,
      };
    }
    const dayCounts = rates.map((r) => toGo / r);
    const fastest = Math.min(...dayCounts);
    const slowest = Math.max(...dayCounts);
    return {
      target,
      reached: false,
      toGo,
      subscribersNeeded: arpu && arpu > 0 ? Math.ceil(toGo / arpu) : null,
      soonest: addDays(fastest),
      latest: addDays(slowest),
      soonestDays: Math.ceil(fastest),
    };
  });
}

/** The first milestone not yet reached — what the panel leads with. */
export function nextMilestone(list: MilestoneForecast[]): MilestoneForecast | null {
  return list.find((m) => !m.reached) ?? null;
}

/** "20 days" / "4 months" — a horizon, not a stopwatch. */
export function horizonLabel(days: number | null): string {
  if (days == null) return '—';
  if (days <= 0) return 'today';
  if (days === 1) return '1 day';
  if (days < 21) return `${days} days`;
  if (days < 60) return `${Math.round(days / 7)} weeks`;
  return `${Math.round(days / 30)} months`;
}

/**
 * What each NEW subscriber is worth, not what the average existing one is.
 *
 * "How many more do I need" is a question about the next subscriber, so
 * dividing the gap by the blended all-time ARPU is the wrong denominator —
 * it assumes the next person looks like the average of everyone who ever
 * joined, including whatever they were charged years ago. On 12 Sep 2026 the
 * blended figure was £9.78 and the last thirty days actually arrived at
 * £10.29. Small here; it will not stay small once the 50% college codes start
 * landing at half price.
 *
 * Falls back to blended when the window added no subscribers, because a
 * marginal ARPU off a zero denominator is meaningless rather than merely
 * imprecise.
 */
export function marginalArpu(
  mrrAdded: number,
  subscribersAdded: number,
  blended: number | null
): { value: number | null; basis: 'marginal' | 'blended' } {
  if (subscribersAdded > 0 && mrrAdded > 0) {
    return { value: mrrAdded / subscribersAdded, basis: 'marginal' };
  }
  return { value: blended, basis: 'blended' };
}

export type PaceShape = 'stepped' | 'accelerating' | 'slowing' | 'steady' | 'unknown';

/**
 * Is the rate itself moving?
 *
 * The 30-day and 90-day lines disagree, and WHY they disagree changes what you
 * should believe. On 12 Sep 2026 the three consecutive 30-day paces were
 * £9.89, £25.83 and £26.77 a day: growth did not accelerate steadily, it
 * stepped up once around mid-July and has held flat for two months. That makes
 * the 90-day line slow for a bad reason — it is still dragged by a period the
 * business has left behind — and the honest read is the recent one, not the
 * midpoint.
 */
export function paceShape(
  latest: Pace | null,
  previous: Pace | null,
  earlier: Pace | null
): { shape: PaceShape; changePct: number | null } {
  if (!latest || !previous || previous.perDay <= 0) return { shape: 'unknown', changePct: null };
  const changePct = ((latest.perDay - previous.perDay) / previous.perDay) * 100;
  const steadyNow = Math.abs(changePct) < 15;
  if (earlier && earlier.perDay > 0) {
    const priorJump = ((previous.perDay - earlier.perDay) / earlier.perDay) * 100;
    // A big old jump that has since levelled off is a step, not a trend.
    if (priorJump > 50 && steadyNow) return { shape: 'stepped', changePct };
  }
  if (steadyNow) return { shape: 'steady', changePct };
  return { shape: changePct > 0 ? 'accelerating' : 'slowing', changePct };
}

/** A window of `Pace` ending `offset` days before the latest sample. */
export function paceWindow(points: MrrSample[], window: number, offset: number): Pace | null {
  if (points.length < 2) return null;
  const endIdx = points.length - 1 - offset;
  const startIdx = endIdx - window;
  if (startIdx < 0 || endIdx <= startIdx) return null;
  const added = points[endIdx].total - points[startIdx].total;
  return { perDay: added / window, window, added };
}

export interface Flow {
  /** Subscribers who joined across the window. */
  grossNew: number;
  /** Paying subscribers lost across the window. */
  churned: number;
  /** grossNew - churned. */
  net: number;
  /** Churned as a share of the base at the START of the window, per month. */
  monthlyChurnPct: number | null;
}

/**
 * Gross in, gross out — because the net number hides which one is moving.
 *
 * "+78 subscribers this month" is the same net figure whether you won 80 and
 * lost 2 or won 128 and lost 50. On 12 Sep 2026 it was the second: 128 in,
 * 50 out, a 39% leak. Those are different businesses and they need different
 * work, and the panel could not tell them apart.
 */
export function flowOver(
  netChange: number,
  churned: number,
  baseAtStart: number | null,
  windowDays: number
): Flow {
  const months = windowDays / 30;
  return {
    grossNew: netChange + churned,
    churned,
    net: netChange,
    monthlyChurnPct:
      baseAtStart && baseAtStart > 0 ? ((churned / months) / baseAtStart) * 100 : null,
  };
}

/**
 * 🔴 Where this stops.
 *
 * A linear MRR projection quietly assumes churn stays a fixed number of people
 * a month. It does not — it is a fixed PERCENTAGE, so as the base grows the
 * losses grow with it, and growth flattens into a ceiling at the point where
 * the leak equals the intake. At 128 joining and 13.2% a month leaving, that
 * ceiling is about 970 subscribers — roughly £9,980 of MRR.
 *
 * Which means the straight lines above are honest about the NEXT milestone and
 * fiction about the far ones: £20k and £50k are not late at this rate, they are
 * unreachable. Saying "Apr 2028" for a number the current model never gets to
 * is worse than saying nothing.
 */
export function steadyState(
  grossNewPerMonth: number,
  monthlyChurnPct: number | null,
  arpu: number | null
): { subscribers: number; mrr: number } | null {
  if (!monthlyChurnPct || monthlyChurnPct <= 0 || grossNewPerMonth <= 0 || !arpu) return null;
  const subscribers = grossNewPerMonth / (monthlyChurnPct / 100);
  return { subscribers, mrr: subscribers * arpu };
}

export interface Requirement {
  /** Subscribers the target needs at today's ARPU. */
  subscribers: number;
  /** Joining per month to HOLD that base at today's churn. */
  intakePerMonth: number;
  /** How much more intake than today, e.g. 2.0 = double. */
  intakeMultiple: number | null;
  /** Churn rate that would sustain the target on today's intake, as a %. */
  churnPct: number | null;
  /** True when today's intake and churn already sustain it. */
  withinCurrentSettings: boolean;
}

/**
 * What each goal needs, rather than whether it is "possible".
 *
 * The first version of this marked anything above the steady state as "past
 * the ceiling" in red. That was bad in two ways. It reads as a permanent
 * verdict when the ceiling is only a description of today's two dial settings,
 * and it turns a page someone uses to set goals into a page that tells them
 * their goals are out of reach — which is both dispiriting and, more to the
 * point, not what the arithmetic says.
 *
 * A target is never unreachable. It needs a specific intake, or a specific
 * churn rate, or some blend. Stating that is honest AND useful: "£20k needs
 * 257 joining a month, or churn down to 6.6%" is a plan. "Past the ceiling" is
 * a wall.
 */
export function requirementFor(
  target: number,
  arpu: number | null,
  monthlyChurnPct: number | null,
  currentIntakePerMonth: number
): Requirement | null {
  if (!arpu || arpu <= 0 || !monthlyChurnPct || monthlyChurnPct <= 0) return null;
  const subscribers = target / arpu;
  const intakePerMonth = subscribers * (monthlyChurnPct / 100);
  return {
    subscribers,
    intakePerMonth,
    intakeMultiple: currentIntakePerMonth > 0 ? intakePerMonth / currentIntakePerMonth : null,
    churnPct: subscribers > 0 ? (currentIntakePerMonth / subscribers) * 100 : null,
    withinCurrentSettings: intakePerMonth <= currentIntakePerMonth,
  };
}
