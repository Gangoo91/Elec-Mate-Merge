/**
 * business-analytics edge function
 * Returns aggregated business intelligence data:
 * - Certificates by type (with period comparison)
 * - Defect breakdown (C1/C2/C3/FI from EICR observations)
 * - Monthly revenue (certs + quotes + invoices)
 * - Expiry forecast (upcoming revenue from expiring certificates)
 * - Client metrics (total, repeat rate, top clients)
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorisation header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Verify user
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { days = 30 } = await req.json();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffISO = cutoffDate.toISOString();

    // Previous period for comparison
    const prevCutoff = new Date();
    prevCutoff.setDate(prevCutoff.getDate() - (days * 2));
    const prevCutoffISO = prevCutoff.toISOString();

    // 1. Certificates by type (current period)
    const { data: currentCerts } = await supabase
      .from('reports')
      .select('id, report_type, created_at, form_data')
      .eq('user_id', user.id)
      .is('deleted_at', null)
      .gte('created_at', cutoffISO);

    // Previous period certs for comparison
    const { data: prevCerts } = await supabase
      .from('reports')
      .select('id, report_type')
      .eq('user_id', user.id)
      .is('deleted_at', null)
      .gte('created_at', prevCutoffISO)
      .lt('created_at', cutoffISO);

    const typeLabels: Record<string, string> = {
      eicr: 'EICR',
      eic: 'EIC',
      'minor-works': 'Minor Works',
      'fire-alarm': 'Fire Alarm',
      'emergency-lighting': 'Emergency Lighting',
      'pat-testing': 'PAT Testing',
      'ev-charging': 'EV Charging',
      'solar-pv': 'Solar PV',
    };

    // Count by type
    const typeCounts = new Map<string, number>();
    const prevTypeCounts = new Map<string, number>();

    (currentCerts || []).forEach(c => {
      const type = c.report_type || 'eicr';
      typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
    });

    (prevCerts || []).forEach(c => {
      const type = c.report_type || 'eicr';
      prevTypeCounts.set(type, (prevTypeCounts.get(type) || 0) + 1);
    });

    const certificatesByType = Object.entries(typeLabels).map(([type, label]) => ({
      type,
      label,
      count: typeCounts.get(type) || 0,
      prevCount: prevTypeCounts.get(type) || 0,
    })).filter(c => c.count > 0 || c.prevCount > 0);

    // 2. Defect breakdown from EICR observations
    const defectCodes: Record<string, { label: string; count: number }> = {
      C1: { label: 'Danger present', count: 0 },
      C2: { label: 'Potentially dangerous', count: 0 },
      C3: { label: 'Improvement recommended', count: 0 },
      FI: { label: 'Further investigation', count: 0 },
    };

    (currentCerts || []).forEach(cert => {
      if (cert.report_type !== 'eicr') return;
      const formData = cert.form_data as any;
      const observations = formData?.defectObservations || formData?.observations || [];
      if (Array.isArray(observations)) {
        observations.forEach((obs: any) => {
          const code = (obs.code || obs.classification || '').toUpperCase().trim();
          if (defectCodes[code]) {
            defectCodes[code].count++;
          }
        });
      }
    });

    const totalDefects = Object.values(defectCodes).reduce((s, d) => s + d.count, 0);
    const defectBreakdown = Object.entries(defectCodes).map(([code, data]) => ({
      code,
      label: data.label,
      count: data.count,
      percentage: totalDefects > 0 ? Math.round((data.count / totalDefects) * 100) : 0,
    }));

    // 3. Monthly revenue (certificates + quotes + invoices)
    const monthsBack = Math.max(Math.ceil(days / 30), 3);
    const monthCutoff = new Date();
    monthCutoff.setMonth(monthCutoff.getMonth() - monthsBack);

    // All user certs in the broader window
    const { data: allCerts } = await supabase
      .from('reports')
      .select('id, created_at, report_type')
      .eq('user_id', user.id)
      .is('deleted_at', null)
      .gte('created_at', monthCutoff.toISOString());

    // Quotes (approved)
    const { data: quotes } = await supabase
      .from('quotes')
      .select('id, created_at, total, status')
      .eq('user_id', user.id)
      .eq('status', 'approved')
      .gte('created_at', monthCutoff.toISOString());

    // Invoices (paid)
    const { data: invoices } = await supabase
      .from('quotes')
      .select('id, created_at, total, status')
      .eq('user_id', user.id)
      .eq('status', 'paid')
      .gte('created_at', monthCutoff.toISOString());

    // Build monthly data
    const monthlyMap = new Map<string, { certificates: number; quotes: number; invoices: number; total: number }>();

    const getMonthKey = (dateStr: string) => {
      const d = new Date(dateStr);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    };

    const getMonthLabel = (key: string) => {
      const [year, month] = key.split('-');
      const d = new Date(parseInt(year), parseInt(month) - 1);
      return d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
    };

    (allCerts || []).forEach(c => {
      const key = getMonthKey(c.created_at);
      if (!monthlyMap.has(key)) monthlyMap.set(key, { certificates: 0, quotes: 0, invoices: 0, total: 0 });
      monthlyMap.get(key)!.certificates++;
    });

    (quotes || []).forEach(q => {
      const key = getMonthKey(q.created_at);
      if (!monthlyMap.has(key)) monthlyMap.set(key, { certificates: 0, quotes: 0, invoices: 0, total: 0 });
      monthlyMap.get(key)!.quotes++;
      monthlyMap.get(key)!.total += q.total || 0;
    });

    (invoices || []).forEach(inv => {
      const key = getMonthKey(inv.created_at);
      if (!monthlyMap.has(key)) monthlyMap.set(key, { certificates: 0, quotes: 0, invoices: 0, total: 0 });
      monthlyMap.get(key)!.invoices++;
      monthlyMap.get(key)!.total += inv.total || 0;
    });

    const monthlyRevenue = Array.from(monthlyMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, data]) => ({
        month: getMonthLabel(key),
        ...data,
      }));

    // 4. Expiry forecast
    const { data: expiringCerts } = await supabase
      .from('certificate_expiry_reminders')
      .select('id, expiry_date, report_id, reminder_status')
      .eq('user_id', user.id)
      .neq('reminder_status', 'completed')
      .neq('reminder_status', 'cancelled')
      .gte('expiry_date', new Date().toISOString());

    const avgFees: Record<string, number> = {
      eicr: 250, eic: 350, 'fire-alarm': 200, 'emergency-lighting': 150,
      'pat-testing': 100, 'minor-works': 150, 'ev-charging': 200, 'solar-pv': 300,
    };

    const forecast = [
      { period: '30 days', days: 30 },
      { period: '60 days', days: 60 },
      { period: '90 days', days: 90 },
    ].map(({ period, days: d }) => {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() + d);
      const matching = (expiringCerts || []).filter(c => new Date(c.expiry_date) <= cutoff);
      const estimatedRevenue = matching.reduce((total, c) => {
        const reportType = c.report_id?.replace(/-[^-]+$/, '') || 'eicr';
        return total + (avgFees[reportType] || 250);
      }, 0);
      return { period, count: matching.length, estimatedRevenue };
    });

    // 5. Client metrics
    const { data: allUserCerts } = await supabase
      .from('reports')
      .select('id, client_name')
      .eq('user_id', user.id)
      .is('deleted_at', null);

    const clientCounts = new Map<string, number>();
    (allUserCerts || []).forEach(c => {
      const name = (c.client_name || 'Unnamed').trim().toLowerCase();
      clientCounts.set(name, (clientCounts.get(name) || 0) + 1);
    });

    const totalClients = clientCounts.size;
    const repeatClients = Array.from(clientCounts.values()).filter(c => c > 1).length;
    const totalCertsForAvg = (allUserCerts || []).length;

    const topClients = Array.from(clientCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({
        name: name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        certificateCount: count,
        totalValue: count * 250,
      }));

    const clientMetrics: any = {
      totalClients,
      repeatRate: totalClients > 0 ? Math.round((repeatClients / totalClients) * 100) : 0,
      avgCertsPerClient: totalClients > 0 ? Math.round((totalCertsForAvg / totalClients) * 10) / 10 : 0,
      topClients,
    };

    // Total revenue from paid invoices
    const totalRevenue = (invoices || []).reduce((sum, inv) => sum + (inv.total || 0), 0)
      + (quotes || []).reduce((sum, q) => sum + (q.total || 0), 0);

    const result = {
      certificatesByType,
      defectBreakdown,
      monthlyRevenue,
      expiryForecast: forecast,
      clientMetrics,
      totalCertificates: (currentCerts || []).length,
      totalRevenue,
      periodLabel: `${days}d`,
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Business analytics error:', err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
