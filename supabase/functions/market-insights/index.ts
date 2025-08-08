import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface UnifiedJob {
  title: string;
  company: string;
  location: string;
  salary: string | null;
  type: string;
  description: string;
  posted_date: string;
}

const parseAdzuna = (json: any): UnifiedJob[] => {
  if (!json?.results) return [];
  return json.results.map((r: any) => {
    const min = r.salary_min ? Math.round(r.salary_min) : null;
    const max = r.salary_max ? Math.round(r.salary_max) : null;
    const salary = min && max ? `£${min.toLocaleString()} - £${max.toLocaleString()}` : (min ? `£${min.toLocaleString()}` : null);
    return {
      title: r.title || "",
      company: r.company?.display_name || "",
      location: r.location?.display_name || "",
      salary,
      type: (r.contract_type || r.contract_time || "").toString(),
      description: r.description || "",
      posted_date: r.created || new Date().toISOString(),
    } as UnifiedJob;
  });
};

const parseReed = (json: any): UnifiedJob[] => {
  if (!json?.results) return [];
  return json.results.map((r: any) => {
    const min = r.minimumSalary ? Math.round(r.minimumSalary) : null;
    const max = r.maximumSalary ? Math.round(r.maximumSalary) : null;
    const salary = min && max ? `£${min.toLocaleString()} - £${max.toLocaleString()}` : (min ? `£${min.toLocaleString()}` : null);
    return {
      title: r.jobTitle || "",
      company: r.employerName || "",
      location: r.locationName || "",
      salary,
      type: (r.jobType || "").toString(),
      description: r.jobDescription || "",
      posted_date: r.date || new Date().toISOString(),
    } as UnifiedJob;
  });
};

const computeMetrics = (jobs: UnifiedJob[]) => {
  const lowerText = (j: UnifiedJob) => `${j.title} ${j.description}`.toLowerCase();

  // Salaries
  const baseSalaries = jobs
    .filter(j => j.salary)
    .map(j => {
      const clean = (j.salary || "").replace(/[£$,]/g, "");
      const nums = clean.match(/\d+/g);
      if (!nums) return 0;
      if (nums.length >= 2) return Math.round((parseInt(nums[0]) + parseInt(nums[1])) / 2);
      return parseInt(nums[0]);
    })
    .filter(v => v > 0);

  let salaryStats = { median: 0, q1: 0, q3: 0, min: 0, max: 0, count: 0 };
  let salaryBuckets: { label: string; count: number }[] = [];
  if (baseSalaries.length > 0) {
    const s = [...baseSalaries].sort((a, b) => a - b);
    const n = s.length;
    salaryStats = {
      median: s[Math.floor(n / 2)],
      q1: s[Math.floor(n * 0.25)],
      q3: s[Math.floor(n * 0.75)],
      min: s[0],
      max: s[n - 1],
      count: n,
    };
    const ranges = [
      { label: "Up to £25k", min: 0, max: 25000 },
      { label: "£25k–£35k", min: 25000, max: 35000 },
      { label: "£35k–£45k", min: 35000, max: 45000 },
      { label: "£45k–£60k", min: 45000, max: 60000 },
      { label: "£60k+", min: 60000, max: Infinity },
    ];
    salaryBuckets = ranges.map(r => ({ label: r.label, count: s.filter(v => v >= r.min && v < r.max).length }));
  }

  // Type mix
  const typeCounts: Record<string, number> = {};
  jobs.forEach(j => {
    const t = (j.type || 'Unspecified').toString();
    typeCounts[t] = (typeCounts[t] || 0) + 1;
  });
  const jobTypeMix = Object.entries(typeCounts).map(([label, count]) => ({ label, count }));

  // Experience mix (heuristic)
  const expCounters: Record<string, number> = { 'Apprentice/Trainee': 0, 'Entry': 0, 'Mid': 0, 'Senior': 0, 'Unspecified': 0 };
  jobs.forEach(j => {
    const t = lowerText(j);
    if (/(apprentice|trainee)/.test(t)) expCounters['Apprentice/Trainee'] += 1;
    else if (/(senior|lead|manager)/.test(t)) expCounters['Senior'] += 1;
    else if (/(mid|intermediate)/.test(t)) expCounters['Mid'] += 1;
    else if (/(junior|entry)/.test(t)) expCounters['Entry'] += 1;
    else expCounters['Unspecified'] += 1;
  });
  const experienceMix = Object.entries(expCounters).map(([label, count]) => ({ label, count }));

  // Working pattern
  const workCounters: Record<string, number> = { 'Remote': 0, 'Hybrid': 0, 'On-site': 0 };
  jobs.forEach(j => {
    const t = lowerText(j);
    if (/remote/.test(t)) workCounters['Remote'] += 1;
    else if (/hybrid/.test(t)) workCounters['Hybrid'] += 1;
    else workCounters['On-site'] += 1;
  });
  const workingPattern = Object.entries(workCounters).map(([label, count]) => ({ label, count }));

  // Freshness
  const now = new Date();
  const ages = jobs.map(j => {
    const d = new Date(j.posted_date);
    return Math.max(0, Math.round((now.getTime() - d.getTime()) / (1000 * 3600 * 24)));
  }).sort((a, b) => a - b);
  const medianDays = ages[Math.floor(ages.length / 2)] || 0;
  const last48h = jobs.filter(j => (now.getTime() - new Date(j.posted_date).getTime()) <= 48 * 3600 * 1000).length;
  const last7d = jobs.filter(j => (now.getTime() - new Date(j.posted_date).getTime()) <= 7 * 24 * 3600 * 1000).length;
  const freshness = { last48hPct: Math.round((last48h / Math.max(1, jobs.length)) * 100), recent7dPct: Math.round((last7d / Math.max(1, jobs.length)) * 100), medianDays };

  // Top companies
  const companyCounts: Record<string, number> = {};
  jobs.forEach(j => { companyCounts[j.company] = (companyCounts[j.company] || 0) + 1; });
  const topCompanies = Object.entries(companyCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name, count }));

  // Skills / certs
  const skillKeywords = ['testing','installation','maintenance','commissioning','solar','led','commercial','domestic','industrial','eicr','fault finding','controls'];
  const certKeywordsMap: Record<string,string> = {
    'bs 7671': 'BS 7671 (18th Edition)',
    '18th edition': '18th Edition',
    '2391': '2391 Testing & Inspection',
    'ecs': 'ECS',
    'cscs': 'CSCS',
    'niceic': 'NICEIC',
    'napit': 'NAPIT',
    'ev': 'EV Charging',
    'solar': 'Solar',
  };
  const skillCounts: Record<string, number> = {};
  skillKeywords.forEach(k => {
    const c = jobs.filter(j => lowerText(j).includes(k)).length;
    if (c > 0) skillCounts[k] = c;
  });
  const certCounts: Record<string, number> = {};
  Object.keys(certKeywordsMap).forEach(k => {
    const c = jobs.filter(j => lowerText(j).includes(k)).length;
    if (c > 0) certCounts[k] = c;
  });
  const topSkills = Object.entries(skillCounts).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([name,count])=>({ name: name.charAt(0).toUpperCase()+name.slice(1), count }));
  const topCerts = Object.entries(certCounts).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([key,count])=>({ name: certKeywordsMap[key], count }));

  return { salaryStats, salaryBuckets, jobTypeMix, experienceMix, workingPattern, freshness, topCompanies, topSkills, topCerts, jobsCount: jobs.length };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keywords = 'electrician', location = 'UK' } = await req.json();

    const adzunaId = Deno.env.get('ADZUNA_APP_ID');
    const adzunaKey = Deno.env.get('ADZUNA_APP_KEY');
    const reedKey = Deno.env.get('REED_API_KEY');

    console.log('market-insights: keys present', {
      adzunaId: !!adzunaId, adzunaKey: !!adzunaKey, reedKey: !!reedKey
    });

    if (!adzunaId || !adzunaKey) {
      console.error('Missing Adzuna credentials');
    }

    const adzunaUrl = adzunaId && adzunaKey 
      ? `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${adzunaId}&app_key=${adzunaKey}&results_per_page=50&what=${encodeURIComponent(keywords)}&where=${encodeURIComponent(location)}`
      : '';

    const adzunaPromise = adzunaUrl
      ? fetch(adzunaUrl).then(r => r.json()).then((j)=>{ console.log('Adzuna ok'); return parseAdzuna(j); }).catch((e) => { console.error('Adzuna fetch error', e); return []; })
      : Promise.resolve([] as UnifiedJob[]);

    const reedPromise = (async () => {
      if (!reedKey) return [] as UnifiedJob[];
      try {
        const url = `https://www.reed.co.uk/api/1.0/search?keywords=${encodeURIComponent(keywords)}&locationName=${encodeURIComponent(location)}`;
        const auth = btoa(`${reedKey}:`);
        const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
        if (!res.ok) { console.error('Reed non-200', res.status); return [] as UnifiedJob[]; }
        const json = await res.json();
        console.log('Reed ok');
        return parseReed(json);
      } catch (e) {
        console.error('Reed fetch error', e);
        return [] as UnifiedJob[];
      }
    })();

    const [adzuna, reed] = await Promise.all([adzunaPromise, reedPromise]);
    const jobs = [...adzuna, ...reed];
    console.log('market-insights: job counts', { adzuna: adzuna.length, reed: reed.length, total: jobs.length });

    if (jobs.length === 0) {
      return new Response(JSON.stringify({ error: 'No jobs returned from providers. Check API keys/quotas.' }), { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }


    const metrics = computeMetrics(jobs);

    return new Response(JSON.stringify(metrics), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error('market-insights error:', e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
