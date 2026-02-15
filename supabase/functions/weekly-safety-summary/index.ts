import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

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
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const weekAgoISO = weekAgo.toISOString();
    const twoWeeksAgoISO = twoWeeksAgo.toISOString();
    const nowISO = now.toISOString();

    // Run all queries in parallel for both current and previous week
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
    ] = await Promise.all([
      // Near misses — current week
      userSupabase
        .from('near_miss_reports')
        .select('id, follow_up_completed, status')
        .gte('created_at', weekAgoISO),
      // Near misses — previous week
      userSupabase
        .from('near_miss_reports')
        .select('id')
        .gte('created_at', twoWeeksAgoISO)
        .lt('created_at', weekAgoISO),
      // Inspections — current week
      userSupabase.from('inspection_checklists').select('id, status').gte('created_at', weekAgoISO),
      // Inspections — previous week
      userSupabase
        .from('inspection_checklists')
        .select('id')
        .gte('created_at', twoWeeksAgoISO)
        .lt('created_at', weekAgoISO),
      // Accidents — current week
      userSupabase
        .from('accident_records')
        .select('id, is_riddor_reportable')
        .gte('created_at', weekAgoISO),
      // Accidents — previous week
      userSupabase
        .from('accident_records')
        .select('id')
        .gte('created_at', twoWeeksAgoISO)
        .lt('created_at', weekAgoISO),
      // Equipment — overdue and due soon (by next_service_date)
      userSupabase.from('equipment_records').select('id, next_service_date'),
      // COSHH — review dates
      userSupabase.from('coshh_assessments').select('id, review_date'),
      // Permits — active and expired
      userSupabase.from('permits_to_work').select('id, status, valid_until'),
      // Observations — current week
      userSupabase
        .from('safety_observations')
        .select('id, observation_type')
        .gte('created_at', weekAgoISO),
      // Observations — previous week
      userSupabase
        .from('safety_observations')
        .select('id')
        .gte('created_at', twoWeeksAgoISO)
        .lt('created_at', weekAgoISO),
    ]);

    // Near misses
    const nearMisses = nearMissRes.data ?? [];
    const nmTotal = nearMisses.length;
    const nmFollowedUp = nearMisses.filter(
      (r) => r.follow_up_completed === true || r.status === 'closed'
    ).length;
    const nmOpen = nmTotal - nmFollowedUp;

    // Inspections
    const inspections = inspectionRes.data ?? [];
    const inspTotal = inspections.length;
    const inspPassed = inspections.filter(
      (r) => r.status === 'passed' || r.status === 'completed'
    ).length;
    const inspFailed = inspections.filter((r) => r.status === 'failed').length;
    const inspPassRate = inspTotal > 0 ? Math.round((inspPassed / inspTotal) * 100) : 100;

    // Accidents
    const accidents = accidentRes.data ?? [];
    const accTotal = accidents.length;
    const accRiddor = accidents.filter((r) => r.is_riddor_reportable === true).length;

    // Equipment
    const equipment = equipmentRes.data ?? [];
    const today = now.toISOString().slice(0, 10);
    const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const eqOverdue = equipment.filter(
      (r) => r.next_service_date && r.next_service_date < today
    ).length;
    const eqDueSoon = equipment.filter(
      (r) => r.next_service_date && r.next_service_date >= today && r.next_service_date <= in30Days
    ).length;

    // COSHH
    const coshh = coshhRes.data ?? [];
    const coshhOverdue = coshh.filter((r) => r.review_date && r.review_date < today).length;
    const coshhUpcoming = coshh.filter(
      (r) => r.review_date && r.review_date >= today && r.review_date <= in30Days
    ).length;

    // Permits
    const permits = permitRes.data ?? [];
    const permActive = permits.filter(
      (r) => r.status === 'active' || r.status === 'approved'
    ).length;
    const permExpired = permits.filter(
      (r) => r.status === 'expired' || (r.valid_until && r.valid_until < today)
    ).length;

    // Observations
    const observations = observationRes.data ?? [];
    const obsTotal = observations.length;
    const obsPositive = observations.filter(
      (r) => r.observation_type === 'positive' || r.observation_type === 'good_practice'
    ).length;

    // Safety score (0–100) — weighted calculation
    // Weights: inspections 25, near-miss follow-up 20, zero accidents 20,
    // equipment compliance 15, COSHH compliance 10, observations 10
    let score = 0;

    // Inspections: pass rate contributes 25 points
    score += (inspPassRate / 100) * 25;

    // Near miss follow-up: ratio contributes 20 points
    const nmFollowRate = nmTotal > 0 ? nmFollowedUp / nmTotal : 1;
    score += nmFollowRate * 20;

    // Accidents: 0 = full 20, each accident -5
    score += Math.max(0, 20 - accTotal * 5);

    // Equipment: compliance ratio contributes 15 points
    const eqTotal = equipment.length;
    const eqCompliant = eqTotal > 0 ? (eqTotal - eqOverdue) / eqTotal : 1;
    score += eqCompliant * 15;

    // COSHH: compliance ratio contributes 10 points
    const coshhTotal = coshh.length;
    const coshhCompliant = coshhTotal > 0 ? (coshhTotal - coshhOverdue) / coshhTotal : 1;
    score += coshhCompliant * 10;

    // Observations: having any contributes up to 10 points
    score += Math.min(obsTotal, 5) * 2;

    const safetyScore = Math.round(Math.min(100, Math.max(0, score)));

    // Trend: compare incident counts current vs previous week
    const currentWeekIncidents = nmTotal + accTotal + inspFailed;
    const prevNM = nearMissPrevRes.data?.length ?? 0;
    const prevAcc = accidentPrevRes.data?.length ?? 0;
    const prevInspFailed = (inspectionPrevRes.data ?? []).filter(
      (r: { status?: string }) => r.status === 'failed'
    ).length;
    const prevWeekIncidents = prevNM + prevAcc + prevInspFailed;

    let trend: 'improving' | 'declining' | 'stable' = 'stable';
    if (currentWeekIncidents < prevWeekIncidents) trend = 'improving';
    else if (currentWeekIncidents > prevWeekIncidents) trend = 'declining';

    // Generate highlights
    const highlights: string[] = [];
    if (inspPassRate >= 90 && inspTotal > 0) {
      highlights.push(`${inspPassRate}% inspection pass rate this week`);
    }
    if (accTotal === 0) {
      highlights.push('Zero accidents recorded this week');
    }
    if (obsPositive > 0) {
      highlights.push(
        `${obsPositive} positive safety observation${obsPositive > 1 ? 's' : ''} logged`
      );
    }
    if (nmFollowRate >= 0.8 && nmTotal > 0) {
      highlights.push(`${Math.round(nmFollowRate * 100)}% near-miss follow-up rate`);
    }
    if (eqOverdue === 0 && eqTotal > 0) {
      highlights.push('All equipment inspections up to date');
    }

    // Generate action items
    const actionItems: string[] = [];
    if (nmOpen > 0) {
      actionItems.push(`${nmOpen} near-miss report${nmOpen > 1 ? 's' : ''} awaiting follow-up`);
    }
    if (accRiddor > 0) {
      actionItems.push(
        `${accRiddor} RIDDOR-reportable accident${accRiddor > 1 ? 's' : ''} — ensure HSE notification`
      );
    }
    if (eqOverdue > 0) {
      actionItems.push(
        `${eqOverdue} equipment item${eqOverdue > 1 ? 's' : ''} overdue for inspection`
      );
    }
    if (coshhOverdue > 0) {
      actionItems.push(
        `${coshhOverdue} COSHH assessment${coshhOverdue > 1 ? 's' : ''} overdue for review`
      );
    }
    if (permExpired > 0) {
      actionItems.push(
        `${permExpired} expired permit${permExpired > 1 ? 's' : ''} to work — review and renew`
      );
    }
    if (inspFailed > 0) {
      actionItems.push(
        `${inspFailed} failed inspection${inspFailed > 1 ? 's' : ''} require corrective action`
      );
    }

    const result = {
      period: {
        start: weekAgo.toISOString(),
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
      safetyScore,
      trend,
      highlights,
      actionItems,
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
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
