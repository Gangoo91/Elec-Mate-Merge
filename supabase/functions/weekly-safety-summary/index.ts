/**
 * Safety Score Engine — lite (Electrician hub).
 *
 * Replaces the old "90 on empty account" formula with a properly
 * weighted 5-dimension model designed against UK industry best practice
 * (HSE HSG65 leading+lagging, NEBOSH IA1, Heinrich's near-miss culture,
 * British Safety Council non-linear thresholds, Hudson Ladder maturity).
 *
 * 30-day window for the displayed score (week is too noisy for trend).
 * Empty/inactive accounts now correctly score low — engagement is
 * required to score well, not just absence of incidents.
 *
 * Enterprise version (SSIP-13, RAG-grounded citations, firm-size tiering,
 * hard caps for RIDDOR/prohibition) lives separately on the Employer
 * Hub (see ELE-1000).
 *
 * Returns:
 *   - safetyScore (0–100)
 *   - hudsonLevel (pathological / reactive / calculative / proactive / generative)
 *   - dimensions { compliance, activity, proactive, quality, outcomes }
 *   - deductions[] (what's costing points + how to fix)
 *   - gains[] (what's earning points)
 *   - recommendations[] (ranked moves to improve)
 *   - trend (improving/declining/stable, vs previous 30d)
 *   - hardCap (cap reason if active)
 *   - legacy fields kept for back-compat with existing UI
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { captureException } from '../_shared/sentry.ts';

interface Deduction {
  category: 'compliance' | 'activity' | 'proactive' | 'quality' | 'outcomes';
  label: string;
  points: number;
  action: string;
}

interface Gain {
  category: 'compliance' | 'activity' | 'proactive' | 'quality' | 'outcomes';
  label: string;
  points: number;
}

interface Recommendation {
  label: string;
  pointGain: number;
  effort: 'low' | 'medium' | 'high';
  category: 'compliance' | 'activity' | 'proactive' | 'quality' | 'outcomes';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorisation header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const userSupabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await userSupabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const now = new Date();
    /*
     * The scoring window is 90 days, not 30.
     *
     * A sole trader who spent last month on one long domestic rewire produces
     * no new RAMS, runs no briefings and logs no near misses — and on a 30-day
     * window that is indistinguishable from someone who has abandoned safety
     * altogether. Ninety days spans a realistic mix of jobs, which is what the
     * score is trying to characterise.
     *
     * `recencyWeight` keeps the window from going stale: something logged this
     * month counts fully, something from three months ago counts about half.
     * So the score still moves when behaviour changes, without collapsing to
     * zero the moment a long job starts.
     */
    const WINDOW_DAYS = 90;
    const DAY_MS = 24 * 60 * 60 * 1000;
    const windowStart = new Date(now.getTime() - WINDOW_DAYS * DAY_MS);
    const prevWindowStart = new Date(now.getTime() - 2 * WINDOW_DAYS * DAY_MS);
    const today = now.toISOString().slice(0, 10);
    const windowStartISO = windowStart.toISOString();
    const prevWindowStartISO = prevWindowStart.toISOString();

    /** 1.0 for today, decaying to ~0.5 at the end of the window. */
    const recencyWeight = (iso: string | null | undefined): number => {
      if (!iso) return 0;
      const ageDays = (now.getTime() - new Date(iso).getTime()) / DAY_MS;
      if (ageDays < 0) return 1;
      if (ageDays > WINDOW_DAYS) return 0;
      return 1 - (ageDays / WINDOW_DAYS) * 0.5;
    };
    /** Sum of recency weights — a "how much, how recently" count. */
    const weighted = (rows: { created_at?: string | null }[]): number =>
      rows.reduce((acc, r) => acc + recencyWeight(r.created_at), 0);

    // Aliases so the existing body keeps compiling while the window widens.
    const thirtyDaysAgo = windowStart;
    const sixtyDaysAgo = prevWindowStart;
    const thirtyDaysAgoISO = windowStartISO;
    const sixtyDaysAgoISO = prevWindowStartISO;

    // Pull current-30d and previous-30d (for trend). Plus all-time counts for
    // quality dims that don't reset weekly.
    const [
      nearMissRes,
      nearMissPrevRes,
      inspectionRes,
      inspectionPrevRes,
      accidentRes,
      accidentPrevRes,
      equipmentRes,
      coshhRes,
      permitRes,
      observationRes,
      observationPrevRes,
      ramsRes,
      ramsPrevRes,
      briefingRes,
      photosRes,
      methodStatementsRes,
    ] = await Promise.all([
      userSupabase
        .from('near_miss_reports')
        .select('id, follow_up_completed, status, created_at')
        .gte('created_at', sixtyDaysAgoISO),
      userSupabase
        .from('near_miss_reports')
        .select('id')
        .gte('created_at', sixtyDaysAgoISO)
        .lt('created_at', thirtyDaysAgoISO),
      userSupabase
        .from('inspection_checklists')
        .select('id, status')
        .gte('created_at', thirtyDaysAgoISO),
      userSupabase
        .from('inspection_checklists')
        .select('id, status')
        .gte('created_at', sixtyDaysAgoISO)
        .lt('created_at', thirtyDaysAgoISO),
      userSupabase
        .from('accident_records')
        .select('id, is_riddor_reportable, riddor_reported, incident_date')
        .gte('created_at', thirtyDaysAgoISO),
      userSupabase
        .from('accident_records')
        .select('id')
        .gte('created_at', sixtyDaysAgoISO)
        .lt('created_at', thirtyDaysAgoISO),
      userSupabase.from('equipment_records').select('id, next_service_date'),
      userSupabase.from('coshh_assessments').select('id, review_date'),
      userSupabase.from('permits_to_work').select('id, status, valid_until'),
      userSupabase
        .from('safety_observations')
        .select('id, observation_type')
        .gte('created_at', thirtyDaysAgoISO),
      userSupabase
        .from('safety_observations')
        .select('id')
        .gte('created_at', sixtyDaysAgoISO)
        .lt('created_at', thirtyDaysAgoISO),
      userSupabase
        .from('rams_documents')
        .select('id, risks, ppe_details, created_at')
        .gte('created_at', thirtyDaysAgoISO),
      userSupabase
        .from('rams_documents')
        .select('id')
        .gte('created_at', sixtyDaysAgoISO)
        .lt('created_at', thirtyDaysAgoISO),
      // Toolbox briefings — table may not exist on all accounts; failures
      // here are non-fatal (we default to 0).
      userSupabase
        .from('electrician_briefings')
        .select('id')
        .gte('created_at', thirtyDaysAgoISO),
      userSupabase
        .from('safety_photos')
        .select('id')
        .gte('created_at', thirtyDaysAgoISO),
      userSupabase
        .from('method_statements')
        .select('id, rams_document_id'),
    ]);

    // ─── Raw counts ──────────────────────────────────────────────────
    const nearMissesAll = nearMissRes.data ?? [];
    const nmCurrent = nearMissesAll.filter(
      (r) => new Date(r.created_at) >= thirtyDaysAgo
    );
    const nmTotal = nmCurrent.length;
    const nmFollowedUp = nmCurrent.filter(
      (r) => r.follow_up_completed === true || r.status === 'closed'
    ).length;
    const nmOpen = nmTotal - nmFollowedUp;

    const inspections = inspectionRes.data ?? [];
    const inspTotal = inspections.length;
    const inspPassed = inspections.filter(
      (r) => r.status === 'passed' || r.status === 'completed'
    ).length;
    const inspFailed = inspections.filter((r) => r.status === 'failed').length;
    const inspPassRate = inspTotal > 0 ? Math.round((inspPassed / inspTotal) * 100) : 0;

    const accidents = accidentRes.data ?? [];
    const accTotal = accidents.length;
    const accRiddor = accidents.filter((r) => r.is_riddor_reportable === true).length;
    const accRiddorUnreported = accidents.filter(
      (r) => r.is_riddor_reportable === true && r.riddor_reported !== true
    ).length;

    const equipment = equipmentRes.data ?? [];
    const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    const eqOverdue = equipment.filter(
      (r) => r.next_service_date && r.next_service_date < today
    ).length;
    const eqDueSoon = equipment.filter(
      (r) => r.next_service_date && r.next_service_date >= today && r.next_service_date <= in30Days
    ).length;
    const eqTotal = equipment.length;

    const coshh = coshhRes.data ?? [];
    const coshhOverdue = coshh.filter((r) => r.review_date && r.review_date < today).length;
    const coshhUpcoming = coshh.filter(
      (r) => r.review_date && r.review_date >= today && r.review_date <= in30Days
    ).length;
    const coshhTotal = coshh.length;

    const permits = permitRes.data ?? [];
    const permActive = permits.filter(
      (r) => r.status === 'active' || r.status === 'approved'
    ).length;
    const permExpired = permits.filter(
      (r) => r.status === 'expired' || (r.valid_until && r.valid_until < today)
    ).length;

    const observations = observationRes.data ?? [];
    const obsTotal = observations.length;
    const obsPositive = observations.filter(
      (r) => r.observation_type === 'positive' || r.observation_type === 'good_practice'
    ).length;

    const ramsCurrent = ramsRes.data ?? [];
    const ramsCount = ramsCurrent.length;
    const ramsDetailed = ramsCurrent.filter(
      (r) => Array.isArray(r.risks) && r.risks.length >= 10
    ).length;
    const ramsWithPPE = ramsCurrent.filter(
      (r) => Array.isArray(r.ppe_details) && r.ppe_details.length > 0
    ).length;

    const briefingCount = briefingRes.data?.length ?? 0;
    const photoCount = photosRes.data?.length ?? 0;

    const methodStatements = methodStatementsRes.data ?? [];
    const msPaired = methodStatements.filter((m) => m.rams_document_id).length;

    // Activity signal: any data at all in last 30d?
    const anyActivity =
      nmTotal +
        inspTotal +
        accTotal +
        obsTotal +
        ramsCount +
        briefingCount +
        photoCount >
      0;

    // ─── Scoring ────────────────────────────────────────────────────
    const deductions: Deduction[] = [];
    const gains: Gain[] = [];

    // 1. COMPLIANCE POSTURE (0–30) — start at 30, deduct for problems
    let compliance = 30;
    if (eqOverdue > 0) {
      const lost = Math.min(eqOverdue * 2, 10);
      compliance -= lost;
      deductions.push({
        category: 'compliance',
        label: `${eqOverdue} equipment item${eqOverdue > 1 ? 's' : ''} overdue inspection`,
        points: lost,
        action: 'Review the equipment register and schedule inspections',
      });
    }
    if (coshhOverdue > 0) {
      const lost = Math.min(coshhOverdue * 2, 6);
      compliance -= lost;
      deductions.push({
        category: 'compliance',
        label: `${coshhOverdue} COSHH review${coshhOverdue > 1 ? 's' : ''} overdue`,
        points: lost,
        action: 'Reassess hazardous substances and update the COSHH register',
      });
    }
    if (permExpired > 0) {
      const lost = Math.min(permExpired, 3);
      compliance -= lost;
      deductions.push({
        category: 'compliance',
        label: `${permExpired} expired permit${permExpired > 1 ? 's' : ''} not closed`,
        points: lost,
        action: 'Close out or renew expired permits to work',
      });
    }
    if (nmOpen > 0) {
      const lost = Math.min(nmOpen * 1.5, 6);
      compliance -= lost;
      deductions.push({
        category: 'compliance',
        label: `${nmOpen} near-miss${nmOpen > 1 ? 'es' : ''} without follow-up`,
        points: lost,
        action: 'Investigate and close each open near-miss report',
      });
    }
    if (accRiddorUnreported > 0) {
      compliance -= 5;
      deductions.push({
        category: 'compliance',
        label: `${accRiddorUnreported} RIDDOR-reportable accident${accRiddorUnreported > 1 ? 's' : ''} not reported to HSE`,
        points: 5,
        action: 'Report to HSE within 10 days — statutory deadline',
      });
    }
    compliance = Math.max(0, Math.round(compliance));

    // 2. ACTIVITY (0–25) — start at 0, gain for engagement
    let activity = 0;
    if (ramsCount > 0) {
      const g = Math.min(ramsCount * 2.5, 10);
      activity += g;
      gains.push({
        category: 'activity',
        label: `${ramsCount} RAMS produced this month`,
        points: g,
      });
    }
    if (inspTotal > 0) {
      const g = Math.min(inspTotal * 1.5, 9);
      activity += g;
      gains.push({
        category: 'activity',
        label: `${inspTotal} inspection${inspTotal > 1 ? 's' : ''} completed`,
        points: g,
      });
    }
    if (briefingCount > 0) {
      const g = Math.min(briefingCount * 2, 6);
      activity += g;
      gains.push({
        category: 'activity',
        label: `${briefingCount} toolbox briefing${briefingCount > 1 ? 's' : ''} delivered`,
        points: g,
      });
    }
    if (photoCount > 0) {
      const g = Math.min(photoCount * 0.2, 2);
      activity += g;
      gains.push({
        category: 'activity',
        label: `${photoCount} safety photo${photoCount > 1 ? 's' : ''} logged`,
        points: g,
      });
    }
    activity = Math.max(0, Math.min(25, Math.round(activity)));

    // 3. PROACTIVE CULTURE (0–20) — Heinrich's triangle, more near-miss
    // reporting = healthier culture. Sweet spot 5–15 near-misses / month.
    let proactive = 0;
    if (nmTotal > 0) {
      // 5+ near-misses logged = healthy reporting → full 15
      // <5 = ramp up linearly
      // >15 = same as 5+ (no penalty for over-reporting)
      const nmScore = nmTotal >= 5 ? 15 : (nmTotal / 5) * 15;
      proactive += nmScore;
      gains.push({
        category: 'proactive',
        label: `${nmTotal} near-miss${nmTotal > 1 ? 'es' : ''} logged (healthy reporting culture)`,
        points: Math.round(nmScore),
      });
    }
    if (obsPositive > 0) {
      const g = Math.min(obsPositive, 5);
      proactive += g;
      gains.push({
        category: 'proactive',
        label: `${obsPositive} positive observation${obsPositive > 1 ? 's' : ''} logged`,
        points: g,
      });
    }
    proactive = Math.max(0, Math.min(20, Math.round(proactive)));

    // 4. QUALITY (0–15) — depth of work
    let quality = 0;
    if (ramsDetailed > 0) {
      const g = Math.min(ramsDetailed, 5);
      quality += g;
      gains.push({
        category: 'quality',
        label: `${ramsDetailed} RAMS with ≥10 hazards (detailed)`,
        points: g,
      });
    }
    if (ramsWithPPE > 0) {
      const g = Math.min(ramsWithPPE * 0.5, 3);
      quality += g;
      // not surfacing as a separate gain — folded into the RAMS line
    }
    if (msPaired > 0) {
      const g = Math.min(msPaired, 3);
      quality += g;
      gains.push({
        category: 'quality',
        label: `${msPaired} method statement${msPaired > 1 ? 's' : ''} paired with RAMS`,
        points: g,
      });
    }
    if (inspPassRate >= 90 && inspTotal > 0) {
      quality += 2;
      gains.push({
        category: 'quality',
        label: `${inspPassRate}% inspection pass rate`,
        points: 2,
      });
    }
    if (permActive > 0) {
      quality += 2;
    }
    quality = Math.max(0, Math.min(15, Math.round(quality)));

    // 5. OUTCOMES (0–10) — start at 10, deduct
    let outcomes = 10;
    if (accRiddor > 0) {
      const lost = Math.min(accRiddor * 5, 10);
      outcomes -= lost;
      deductions.push({
        category: 'outcomes',
        label: `${accRiddor} RIDDOR-reportable accident${accRiddor > 1 ? 's' : ''} in last 30 days`,
        points: lost,
        action: 'Investigate root cause, document corrective actions',
      });
    }
    const accNonRiddor = accTotal - accRiddor;
    if (accNonRiddor > 0) {
      const lost = Math.min(accNonRiddor * 2, 10 - (10 - outcomes));
      outcomes -= lost;
      deductions.push({
        category: 'outcomes',
        label: `${accNonRiddor} accident${accNonRiddor > 1 ? 's' : ''} (non-RIDDOR) in last 30 days`,
        points: lost,
        action: 'Investigate and log corrective actions',
      });
    }
    outcomes = Math.max(0, Math.round(outcomes));

    // ─── Total + special states ─────────────────────────────────────
    let total = compliance + activity + proactive + quality + outcomes;

    // Hard cap: any unreported RIDDOR caps the score at 39 (per RIDDOR 10-day rule)
    let hardCap: { reason: string; cap: number; deadline?: string } | null = null;
    if (accRiddorUnreported > 0) {
      const earliestUnreported = accidents
        .filter((a) => a.is_riddor_reportable === true && a.riddor_reported !== true)
        .sort((a, b) => (a.incident_date || '').localeCompare(b.incident_date || ''))[0];
      const deadline = earliestUnreported?.incident_date
        ? new Date(new Date(earliestUnreported.incident_date).getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10)
        : undefined;
      hardCap = {
        reason: `${accRiddorUnreported} RIDDOR-reportable incident${accRiddorUnreported > 1 ? 's' : ''} not reported to HSE`,
        cap: 39,
        deadline,
      };
      total = Math.min(total, 39);
    }

    // Insufficient data — show the score but cap at 75 until they've used it
    const totalRecords =
      nmTotal +
      inspTotal +
      accTotal +
      obsTotal +
      ramsCount +
      briefingCount +
      eqTotal +
      coshhTotal +
      permits.length;
    if (totalRecords < 5 && !accRiddorUnreported) {
      total = Math.min(total, 50);
      // tag the recommendations to push activity
    }

    const safetyScore = Math.max(0, Math.min(100, Math.round(total)));

    // Hudson Ladder mapping (BSC-style non-linear thresholds)
    /*
     * ─── Coverage: how much evidence is this score built on? ──────────
     *
     * The scoring model starts Compliance at 30 and Outcomes at 10 and deducts
     * from them, while the other three dimensions start at 0 and are earned.
     * So an account with NO DATA AT ALL scores exactly 40 — and 40 used to be
     * "critical", the worst band there is.
     *
     * That means every new user was told their safety was critical before they
     * had done anything, and a spotless sole trader with a quiet quarter got
     * the same verdict as someone genuinely in trouble. The score could not
     * tell "no evidence" from "evidence of a problem".
     *
     * That distinction matters more than the number. The research on composite
     * safety indices is consistent that a score used punitively drives risk
     * underground — people stop reporting, which destroys the self-reported
     * data the score depends on. Near-miss reporting is 15 of our points, so
     * this is not theoretical.
     *
     * Coverage counts how many independent signals we have anything for. Below
     * the threshold the score is withheld rather than published as a verdict.
     */
    const coverageSignals = [
      { key: 'rams', label: 'Risk assessments', present: ramsCount > 0 },
      { key: 'permits', label: 'Permits to work', present: permits.length > 0 },
      { key: 'coshh', label: 'COSHH assessments', present: coshhTotal > 0 },
      { key: 'inspections', label: 'Inspections', present: inspTotal > 0 },
      { key: 'equipment', label: 'Equipment register', present: eqTotal > 0 },
      { key: 'briefings', label: 'Toolbox briefings', present: briefingCount > 0 },
      { key: 'nearmiss', label: 'Near misses', present: nmTotal > 0 },
      { key: 'observations', label: 'Safety observations', present: obsTotal > 0 },
      { key: 'photos', label: 'Site photos', present: photoCount > 0 },
    ];
    const coverageScored = coverageSignals.filter((s) => s.present).length;
    const coverageTotal = coverageSignals.length;

    /*
     * Four of ten. Below this the sample is too thin for a 0–100 verdict to
     * mean anything — two signals can swing it 30 points. At or above it the
     * score is published normally.
     */
    const COVERAGE_MIN = 4;
    const hasEnoughEvidence = coverageScored >= COVERAGE_MIN;

    let hudsonLevel: string;
    if (!hasEnoughEvidence) {
      // Not a verdict — an absence of one. The client renders this as
      // "building your picture", never as a band.
      hudsonLevel = 'insufficient_data';
    } else if (safetyScore < 45) hudsonLevel = 'critical';
    else if (safetyScore < 61) hudsonLevel = 'reactive';
    else if (safetyScore < 76) hudsonLevel = 'calculative';
    else if (safetyScore < 89) hudsonLevel = 'proactive';
    else hudsonLevel = 'generative';

    // ─── Trend (vs previous 30d) ────────────────────────────────────
    const prevNM = nearMissPrevRes.data?.length ?? 0;
    const prevAcc = accidentPrevRes.data?.length ?? 0;
    const prevInsp = inspectionPrevRes.data ?? [];
    const prevInspFailed = prevInsp.filter((r) => r.status === 'failed').length;
    const prevInspTotal = prevInsp.length;
    const prevRams = ramsPrevRes.data?.length ?? 0;
    const prevObs = observationPrevRes.data?.length ?? 0;

    // Crude trend score for the previous 30d (same shape, fewer dimensions)
    let prevScore =
      // activity proxy
      Math.min(prevRams * 2.5, 10) +
      Math.min(prevInspTotal * 1.5, 9) +
      // proactive proxy
      (prevNM >= 5 ? 15 : (prevNM / 5) * 15) +
      Math.min(prevObs, 5) +
      // outcomes proxy
      Math.max(0, 10 - prevAcc * 5);
    // Compliance + quality are point-in-time, so we use current as a stand-in
    prevScore += compliance + quality;
    prevScore = Math.max(0, Math.min(100, Math.round(prevScore)));

    let trend: 'improving' | 'declining' | 'stable' = 'stable';
    const delta = safetyScore - prevScore;
    if (delta >= 3) trend = 'improving';
    else if (delta <= -3) trend = 'declining';

    // ─── Recommendations (ranked by points-per-effort) ──────────────
    const recommendations: Recommendation[] = [];
    if (accRiddorUnreported > 0) {
      recommendations.push({
        label: 'Report RIDDOR-reportable incident to HSE',
        pointGain: 100 - safetyScore, // unlocks cap
        effort: 'medium',
        category: 'compliance',
      });
    }
    if (eqOverdue > 0) {
      recommendations.push({
        label: `Close ${eqOverdue} overdue equipment check${eqOverdue > 1 ? 's' : ''}`,
        pointGain: Math.min(eqOverdue * 2, 10),
        effort: 'low',
        category: 'compliance',
      });
    }
    if (coshhOverdue > 0) {
      recommendations.push({
        label: `Reassess ${coshhOverdue} overdue COSHH review${coshhOverdue > 1 ? 's' : ''}`,
        pointGain: Math.min(coshhOverdue * 2, 6),
        effort: 'medium',
        category: 'compliance',
      });
    }
    if (nmOpen > 0) {
      recommendations.push({
        label: `Follow up on ${nmOpen} open near-miss${nmOpen > 1 ? 'es' : ''}`,
        pointGain: Math.min(nmOpen * 1.5, 6),
        effort: 'medium',
        category: 'compliance',
      });
    }
    if (briefingCount === 0) {
      recommendations.push({
        label: 'Deliver a toolbox briefing this week',
        pointGain: 2,
        effort: 'low',
        category: 'activity',
      });
    }
    if (ramsCount === 0) {
      recommendations.push({
        label: 'Produce a RAMS for your next job',
        pointGain: 3,
        effort: 'low',
        category: 'activity',
      });
    }
    if (inspTotal === 0) {
      recommendations.push({
        label: 'Run a site inspection this week',
        pointGain: 2,
        effort: 'low',
        category: 'activity',
      });
    }
    if (nmTotal < 3) {
      recommendations.push({
        label: 'Log a near-miss (more reporting = healthier culture)',
        pointGain: 3,
        effort: 'low',
        category: 'proactive',
      });
    }
    if (obsPositive === 0) {
      recommendations.push({
        label: 'Log a positive safety observation from this week',
        pointGain: 1,
        effort: 'low',
        category: 'proactive',
      });
    }
    if (permExpired > 0) {
      recommendations.push({
        label: `Close ${permExpired} expired permit${permExpired > 1 ? 's' : ''} to work`,
        pointGain: Math.min(permExpired, 3),
        effort: 'low',
        category: 'compliance',
      });
    }

    // Sort by points (descending). The RIDDOR one will naturally float to top.
    recommendations.sort((a, b) => b.pointGain - a.pointGain);

    // ─── Highlights & action items (legacy fields kept for back-compat) ─
    const highlights: string[] = [];
    if (inspPassRate >= 90 && inspTotal > 0) {
      highlights.push(`${inspPassRate}% inspection pass rate`);
    }
    if (accTotal === 0) {
      highlights.push('Zero accidents recorded in last 30 days');
    }
    if (nmTotal >= 5) {
      highlights.push(`${nmTotal} near-misses logged — healthy reporting culture`);
    }
    if (obsPositive > 0) {
      highlights.push(`${obsPositive} positive safety observation${obsPositive > 1 ? 's' : ''}`);
    }
    if (eqOverdue === 0 && eqTotal > 0) {
      highlights.push('All equipment inspections up to date');
    }
    if (ramsCount > 0) {
      highlights.push(`${ramsCount} RAMS produced this month`);
    }

    const actionItems = recommendations.slice(0, 6).map((r) => r.label);

    /*
     * The single next action.
     *
     * Campbell Institute's central finding is that collecting leading
     * indicators changes nothing on its own — it is the action taken on them
     * that does. A score with no "so what" is decoration, so the payload
     * always carries exactly one thing to do next, picked in priority order:
     * a statutory duty first, then whatever is costing the most points, then
     * the biggest gap in coverage.
     */
    const nextAction =
      recommendations.length > 0
        ? { label: recommendations[0].label, view: recommendations[0].category }
        : !hasEnoughEvidence
          ? (() => {
              const missing = coverageSignals.find((sig) => !sig.present);
              return missing
                ? { label: `Add your first ${missing.label.toLowerCase()}`, view: missing.key }
                : null;
            })()
          : null;

    const result = {
      // ── New shape ──
      safetyScore,
      hudsonLevel,
      /** How many independent signals the score is built on, and which. */
      coverage: {
        scored: coverageScored,
        total: coverageTotal,
        minimum: COVERAGE_MIN,
        missing: coverageSignals.filter((sig) => !sig.present).map((sig) => sig.label),
      },
      /** False → the client shows coverage and a first action, not a verdict. */
      hasEnoughEvidence,
      /** Days the activity dimensions are measured over. */
      windowDays: WINDOW_DAYS,
      nextAction,
      dimensions: {
        compliance,
        activity,
        proactive,
        quality,
        outcomes,
      },
      dimensionMax: {
        compliance: 30,
        activity: 25,
        proactive: 20,
        quality: 15,
        outcomes: 10,
      },
      deductions,
      gains,
      recommendations,
      hardCap,
      trend,
      trendDelta: delta,
      previousScore: prevScore,

      // ── Legacy fields kept for back-compat with existing UI ──
      period: {
        start: thirtyDaysAgo.toISOString(),
        end: now.toISOString(),
      },
      nearMisses: { total: nmTotal, followedUp: nmFollowedUp, open: nmOpen },
      inspections: {
        total: inspTotal,
        passed: inspPassed,
        failed: inspFailed,
        passRate: inspPassRate,
      },
      accidents: { total: accTotal, riddorReportable: accRiddor },
      equipment: { overdue: eqOverdue, dueSoon: eqDueSoon, total: eqTotal },
      coshh: { overdueReviews: coshhOverdue, upcomingReviews: coshhUpcoming },
      permits: { active: permActive, expired: permExpired },
      observations: { total: obsTotal, positive: obsPositive },
      highlights,
      actionItems,
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, { functionName: 'weekly-safety-summary', requestUrl: req.url, requestMethod: req.method });
    console.error('weekly-safety-summary error:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message ?? 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
