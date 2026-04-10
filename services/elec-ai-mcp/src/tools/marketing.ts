/**
 * Marketing Coach — marketing plan, social media, reviews, win-back, seasonal campaigns
 */

import type { UserContext } from '../auth.js';

// ─── Marketing Plan ───────────────────────────────────────────────────────

export async function getMarketingPlan(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const now = new Date();
  const threeMonthsAgo = new Date(now);
  threeMonthsAgo.setMonth(now.getMonth() - 3);
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 6);

  const [clientsRes, invoicesRes, certsRes, recentJobsRes, quotesRes] = await Promise.all([
    supabase.from('customers').select('id, type, created_at'),
    supabase
      .from('invoices')
      .select('total, line_items, client_data, paid_at, status')
      .eq('status', 'paid')
      .gte('paid_at', sixMonthsAgo.toISOString()),
    supabase
      .from('reports')
      .select('report_type, expiry_date, customer_id')
      .not('expiry_date', 'is', null)
      .gte('expiry_date', now.toISOString())
      .lte('expiry_date', new Date(now.getTime() + 90 * 86400000).toISOString()),
    supabase
      .from('invoices')
      .select('client_data, total, paid_at')
      .eq('status', 'paid')
      .gte('paid_at', new Date(now.getTime() - 30 * 86400000).toISOString()),
    supabase
      .from('quotes')
      .select('status, created_at')
      .gte('created_at', threeMonthsAgo.toISOString()),
  ]);

  const clients = clientsRes.data || [];
  const invoices = invoicesRes.data || [];
  const expiringCerts = certsRes.data || [];
  const recentJobs = recentJobsRes.data || [];
  const quotes = quotesRes.data || [];

  const clientMix = { residential: 0, commercial: 0, landlord: 0, other: 0 };
  for (const c of clients) {
    const t = ((c.type as string) || 'other').toLowerCase();
    if (t in clientMix) (clientMix as Record<string, number>)[t]++;
    else clientMix.other++;
  }

  const monthlyRevAvg =
    invoices.length > 0 ? invoices.reduce((s, i) => s + Number(i.total || 0), 0) / 6 : 0;
  const quotesSent = quotes.filter((q) => q.status !== 'draft').length;
  const quotesAccepted = quotes.filter(
    (q) => q.status === 'accepted' || q.status === 'approved'
  ).length;
  const convRate = quotesSent > 0 ? (quotesAccepted / quotesSent) * 100 : 0;

  // Dormant clients (no invoice in 6+ months)
  const activeClientNames = new Set(
    invoices.map((i) =>
      (((i.client_data as Record<string, unknown>)?.name as string) || '').toLowerCase()
    )
  );
  const dormantClients = clients.filter(
    (c) => !activeClientNames.has(((c.id as string) || '').toLowerCase())
  );

  const actions: Array<{
    priority: string;
    category: string;
    action: string;
    why: string;
    estimated_revenue: string | null;
    how: string;
  }> = [];

  if (expiringCerts.length > 0) {
    const estRev =
      expiringCerts.length *
      (monthlyRevAvg > 0 ? Math.round(monthlyRevAvg / (invoices.length / 6 || 1)) : 250);
    actions.push({
      priority: 'high',
      category: 'renewals',
      action: `Send renewal reminders to ${expiringCerts.length} clients with certs expiring this quarter`,
      why: 'These are warm leads — they already trust you and need the work done by law',
      estimated_revenue: `~£${Math.round(estRev)}`,
      how: 'Use get_client_win_back or draft_message to send personalised reminders',
    });
  }

  if (recentJobs.length >= 3) {
    actions.push({
      priority: 'high',
      category: 'reviews',
      action: `Ask your last ${Math.min(recentJobs.length, 5)} completed jobs for a Google review`,
      why: 'Reviews are the #1 way electricians get found online — 90% of people check before calling',
      estimated_revenue: null,
      how: 'Use get_google_review_request with each client_id',
    });
  }

  if (dormantClients.length >= 5) {
    actions.push({
      priority: 'medium',
      category: 'outreach',
      action: `Re-engage ${dormantClients.length} dormant clients with a check-in message`,
      why: 'Cheaper to win back an old client than find a new one',
      estimated_revenue: `~£${Math.round(dormantClients.length * 200)}`,
      how: 'Use get_client_win_back to get personalised drafts',
    });
  }

  if (convRate < 60 && quotesSent > 3) {
    actions.push({
      priority: 'high',
      category: 'pipeline',
      action: `Follow up ${quotesSent - quotesAccepted} pending quotes within 48 hours`,
      why: `Your conversion rate is ${convRate.toFixed(0)}% — following up fast can push it above 60%`,
      estimated_revenue: null,
      how: 'Use read_quotes status=sent then draft_message for follow-ups',
    });
  }

  if (clientMix.landlord >= 3) {
    actions.push({
      priority: 'medium',
      category: 'outreach',
      action: `Offer landlord EICR packages — bundle 3+ properties for 10% discount`,
      why: `You have ${clientMix.landlord} landlord clients — multi-property deals lock in recurring revenue`,
      estimated_revenue: `~£${clientMix.landlord * 250}`,
      how: 'Draft a bulk offer using draft_message',
    });
  }

  actions.push({
    priority: 'low',
    category: 'social_media',
    action: 'Post a before/after of your latest job on Facebook and Instagram',
    why: 'Visual proof of your work builds trust faster than any advert',
    estimated_revenue: null,
    how: 'Use get_social_media_post to get a ready-to-copy post',
  });

  if (clients.length > 10) {
    actions.push({
      priority: 'low',
      category: 'referrals',
      action: 'Ask your top 3 clients for referrals — offer a small thank-you gesture',
      why: 'Word of mouth is still the best marketing for trades',
      estimated_revenue: '1-3 new clients',
      how: 'Use get_client_insights to find your best clients, then draft_message',
    });
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return {
    success: true,
    business_profile: {
      total_clients: clients.length,
      client_mix: clientMix,
      monthly_revenue_avg: Math.round(monthlyRevAvg),
    },
    marketing_plan: { month: months[now.getMonth()], actions },
    currency: 'GBP',
  };
}

// ─── Social Media Post ────────────────────────────────────────────────────

const POST_TEMPLATES: Record<string, Record<string, string>> = {
  rewire: {
    instagram:
      'Full rewire completed ⚡ Old wiring out, new circuits in. Safe, compliant, and looking clean.',
    facebook:
      'Just finished a full rewire today. Always satisfying seeing old dangerous wiring replaced with something safe and modern. If your house was built before the 90s, it might be time for a check.',
    linkedin:
      'Completed a full domestic rewire this week — 18th Edition compliant with RCBO protection throughout. If you manage properties, regular electrical assessments protect both your tenants and your liability.',
    tiktok: 'POV: You open a consumer unit from 1985 vs the new one we just put in 👀⚡',
  },
  eicr: {
    instagram: 'EICR completed ✅ Keeping homes safe, one inspection at a time.',
    facebook:
      'Another EICR done and dusted today. Remember — landlords, you need one every 5 years by law. If yours is due, give us a shout.',
    linkedin:
      'Electrical Installation Condition Report completed — BS 7671 compliant. Landlords: EICR compliance is a legal requirement under the Electrical Safety Standards Regulations 2020.',
    tiktok: 'Things we find during EICRs that keep us up at night 😱⚡',
  },
  'consumer unit': {
    instagram:
      'Consumer unit upgrade done ⚡ Old fuse board → modern RCBO protection. Safety first.',
    facebook:
      'Swapped out an old fuse board for a new RCBO consumer unit today. If your board still has wire fuses or no RCD protection, it might be time for an upgrade.',
    linkedin:
      'Consumer unit replacement completed — full RCBO board with individual circuit protection. The standard continues to evolve with Amendment 2 requirements for arc fault detection.',
    tiktok: 'The satisfaction of a perfectly labelled consumer unit 🤌⚡',
  },
  'ev charger': {
    instagram: 'EV charger installed 🔌⚡ Future-proofing homes one charger at a time.',
    facebook:
      'Another EV charger installed today! More and more people making the switch. If you are thinking about it, we handle everything — survey, install, cert, and OZEV grant paperwork.',
    linkedin:
      'EV charging installation completed — 7kW Type 2 with load balancing. The UK EV market continues to grow, and proper installation by qualified electricians is essential for safety and insurance compliance.',
    tiktok: 'Installing an EV charger in under 4 hours ⚡🚗',
  },
  general: {
    instagram: 'Another job done ⚡ Quality work, every time.',
    facebook:
      'Good day on the tools today. If you need any electrical work done, drop us a message!',
    linkedin:
      'Completed another successful installation this week. Quality workmanship and compliance remain at the core of everything we do.',
    tiktok: 'Day in the life of a sparky ⚡🔧',
  },
};

const HASHTAGS: Record<string, string[]> = {
  instagram: [
    '#electrician',
    '#sparky',
    '#electrical',
    '#electricalwork',
    '#wiringlife',
    '#18thedition',
    '#bs7671',
    '#ukelectrician',
    '#tradelife',
    '#tradesofinstagram',
    '#electricianlife',
    '#domesticelectrician',
    '#electricalsafety',
    '#qualifiedelectrician',
  ],
  facebook: ['#electrician', '#localelectrician', '#electricalsafety'],
  linkedin: ['#electrician', '#construction', '#electricalengineering', '#safety', '#compliance'],
  tiktok: ['#electrician', '#sparky', '#tradelife', '#fyp', '#electrical', '#satisfying'],
};

export async function getSocialMediaPost(args: Record<string, unknown>, user: UserContext) {
  const platform = (args.platform as string) || 'facebook';
  const jobId = args.job_id as string;
  const topic = (args.topic as string) || 'general';

  let jobType = 'general';
  let location = '';

  if (jobId) {
    const supabase = user.supabase;
    const { data: project } = await supabase
      .from('spark_projects')
      .select('title, description, location')
      .eq('id', jobId)
      .single();
    if (project) {
      const title = ((project.title as string) || '').toLowerCase();
      for (const key of Object.keys(POST_TEMPLATES)) {
        if (title.includes(key)) {
          jobType = key;
          break;
        }
      }
      location = (project.location as string) || '';
      // Strip house number for privacy
      location = location.replace(/^\d+\s*/, '').replace(/,.*$/, '');
    }
  } else {
    for (const key of Object.keys(POST_TEMPLATES)) {
      if (topic.toLowerCase().includes(key)) {
        jobType = key;
        break;
      }
    }
  }

  const templates = POST_TEMPLATES[jobType] || POST_TEMPLATES.general;
  let caption = templates[platform] || templates.facebook;
  if (location) caption += `\n📍 ${location} area`;

  const platformHashtags = HASHTAGS[platform] || HASHTAGS.facebook;
  const bestTimes: Record<string, string> = {
    instagram: 'Tuesday or Thursday, 7-8am or 6-7pm',
    facebook: 'Wednesday or Friday, 12-1pm',
    linkedin: 'Tuesday or Wednesday, 8-9am',
    tiktok: 'Tuesday or Thursday, 7-9pm',
  };

  return {
    success: true,
    platform,
    caption,
    hashtags: platformHashtags,
    best_time_to_post: bestTimes[platform] || 'Weekday mornings',
    photo_suggestion:
      jobType === 'rewire'
        ? 'Before/after of the consumer unit or a clean first fix'
        : jobType === 'eicr'
          ? 'Photo of the test equipment or completed report'
          : jobType === 'ev charger'
            ? 'Charger mounted on wall with car plugged in'
            : 'Clean, completed work — good lighting, tidy finish',
    tips: [
      'Always get client permission before posting photos of their property',
      'Reply to every comment — it boosts your reach',
      platform === 'instagram'
        ? 'Use Reels for 3x more reach than static posts'
        : platform === 'tiktok'
          ? 'First 3 seconds are everything — start with the hook'
          : 'Tag your location for local visibility',
    ],
  };
}

// ─── Google Review Request ────────────────────────────────────────────────

export async function getGoogleReviewRequest(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const clientId = args.client_id as string;
  const googlePlaceId = args.google_place_id as string;

  if (!clientId) return { error: 'client_id is required' };

  const { data: client } = await supabase
    .from('customers')
    .select('id, name, phone, email')
    .eq('id', clientId)
    .single();
  if (!client) return { error: 'Client not found' };

  // Find their most recent paid job
  const { data: recentInvoices } = await supabase
    .from('invoices')
    .select('total, paid_at, line_items, client_data')
    .eq('status', 'paid')
    .order('paid_at', { ascending: false })
    .limit(10);

  const clientInvoice = (recentInvoices || []).find((i) => {
    const cd = i.client_data as Record<string, unknown>;
    return (
      (cd?.id as string) === clientId ||
      (cd?.name as string)?.toLowerCase() === (client.name as string).toLowerCase()
    );
  });

  const daysSince = clientInvoice?.paid_at
    ? Math.round((Date.now() - new Date(clientInvoice.paid_at as string).getTime()) / 86400000)
    : null;
  const timing =
    daysSince === null ? 'unknown' : daysSince < 7 ? 'perfect' : daysSince < 30 ? 'good' : 'late';

  const reviewLink = googlePlaceId
    ? `https://search.google.com/local/writereview?placeid=${googlePlaceId}`
    : null;

  const name = (client.name as string).split(' ')[0]; // First name
  let draft = `Hi ${name}, thanks for choosing us`;
  if (clientInvoice) draft += ` for the recent work`;
  draft += `. If you were happy with the service, a quick Google review would really help us out`;
  if (reviewLink) draft += ` — you can leave one here: ${reviewLink}`;
  draft += `. Thanks a million!`;

  return {
    success: true,
    client_name: client.name,
    client_phone: client.phone,
    last_job: clientInvoice
      ? { value: Number(clientInvoice.total), completed: clientInvoice.paid_at }
      : null,
    days_since_completion: daysSince,
    timing_verdict: timing,
    draft_message: draft,
    review_link: reviewLink,
    channel: client.phone ? 'whatsapp' : 'email',
    note: 'Use draft_message or send_approved_message to send. Best within 7 days of job completion.',
  };
}

// ─── Client Win-Back ──────────────────────────────────────────────────────

export async function getClientWinBack(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const monthsInactive = typeof args.months_inactive === 'number' ? args.months_inactive : 6;
  const limit = typeof args.limit === 'number' ? Math.min(args.limit, 20) : 5;
  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setMonth(now.getMonth() - monthsInactive);

  // Get all clients
  const { data: allClients } = await supabase
    .from('customers')
    .select('id, name, phone, email, created_at');

  // Get recent invoices (after cutoff)
  const { data: recentInvoices } = await supabase
    .from('invoices')
    .select('client_data, total, paid_at')
    .eq('status', 'paid')
    .gte('paid_at', cutoff.toISOString());

  // Get all-time invoices for LTV
  const { data: allInvoices } = await supabase
    .from('invoices')
    .select('client_data, total')
    .eq('status', 'paid');

  // Get expiring certs
  const { data: expiringCerts } = await supabase
    .from('reports')
    .select('customer_id, report_type, expiry_date, installation_address')
    .not('expiry_date', 'is', null)
    .gte('expiry_date', now.toISOString())
    .lte('expiry_date', new Date(now.getTime() + 180 * 86400000).toISOString());

  const activeIds = new Set(
    (recentInvoices || []).map(
      (i) => ((i.client_data as Record<string, unknown>)?.id as string) || ''
    )
  );

  // Build LTV map
  const ltvMap: Record<string, number> = {};
  for (const inv of allInvoices || []) {
    const cid = (inv.client_data as Record<string, unknown>)?.id as string;
    if (cid) ltvMap[cid] = (ltvMap[cid] || 0) + Number(inv.total || 0);
  }

  // Build cert expiry map
  const certMap: Record<string, { type: string; expiry: string; address: string }> = {};
  for (const c of expiringCerts || []) {
    const cid = c.customer_id as string;
    if (cid && !certMap[cid])
      certMap[cid] = {
        type: c.report_type as string,
        expiry: c.expiry_date as string,
        address: c.installation_address as string,
      };
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const quarter = Math.floor(now.getMonth() / 3);
  const seasonalHooks: Record<number, string> = {
    0: 'New year is a great time to get your electrics checked',
    1: 'Spring is perfect for outdoor lighting or garden sockets',
    2: 'Thinking about a home upgrade before autumn?',
    3: 'Winter is coming — worth checking your emergency lighting and heating',
  };

  const dormant = (allClients || [])
    .filter((c) => !activeIds.has(c.id as string))
    .map((c) => {
      const ltv = ltvMap[c.id as string] || 0;
      const cert = certMap[c.id as string];
      const firstName = (c.name as string).split(' ')[0];

      let reason = 'general_checkup';
      let draft = '';

      if (cert) {
        reason = 'cert_renewal';
        const expDate = new Date(cert.expiry).toLocaleDateString('en-GB', {
          month: 'long',
          year: 'numeric',
        });
        draft = `Hi ${firstName}, hope you're well! Your ${cert.type.toUpperCase()} at ${cert.address} is due for renewal in ${expDate}. Want to get it booked in before it expires? We can sort it quickly.`;
      } else {
        reason = 'seasonal';
        draft = `Hi ${firstName}, just checking in! ${seasonalHooks[quarter]}. If you need any electrical work, we're just a message away. Cheers!`;
      }

      return {
        client_id: c.id,
        client_name: c.name,
        client_phone: c.phone,
        ltv: Math.round(ltv),
        cert_expiry: cert || null,
        reason,
        draft_message: draft,
      };
    })
    .sort((a, b) => b.ltv - a.ltv)
    .slice(0, limit);

  const estRevenue = dormant.reduce((s, d) => s + (d.ltv > 0 ? Math.round(d.ltv * 0.3) : 200), 0);

  return {
    success: true,
    dormant_clients: dormant,
    total_dormant: (allClients || []).filter((c) => !activeIds.has(c.id as string)).length,
    estimated_revenue_if_reactivated: estRevenue,
    note: 'Use draft_message with the client_id and message body to queue these for sending.',
    currency: 'GBP',
  };
}

// ─── Seasonal Campaigns ──────────────────────────────────────────────────

const CAMPAIGNS: Record<
  string,
  Array<{
    name: string;
    tagline: string;
    segment: string;
    services: string[];
    msg: string;
    value_per_job: number;
  }>
> = {
  Q1: [
    {
      name: 'New Year Rewire Campaign',
      tagline: 'New year, safe wiring',
      segment: 'residential',
      services: ['rewire', 'consumer unit'],
      msg: 'New year is the perfect time to get your electrics checked. Old wiring? Dodgy sockets? Let us make your home safe for {year}.',
      value_per_job: 2500,
    },
    {
      name: 'Landlord EICR Compliance',
      tagline: 'Stay legal in {year}',
      segment: 'landlord',
      services: ['eicr'],
      msg: 'Landlords — are your EICRs up to date? It is a legal requirement. We can check all your properties quickly. Bundle discount available.',
      value_per_job: 250,
    },
    {
      name: 'Commercial PAT Testing',
      tagline: 'Start the year compliant',
      segment: 'commercial',
      services: ['pat-testing'],
      msg: 'Is your PAT testing up to date for {year}? We offer fast, reliable testing for offices, shops, and commercial properties.',
      value_per_job: 300,
    },
  ],
  Q2: [
    {
      name: 'Garden & Outdoor Lighting',
      tagline: 'Light up your garden',
      segment: 'residential',
      services: ['outdoor', 'lighting'],
      msg: 'Summer is coming — garden lights, outdoor sockets, and BBQ area power. Transform your outdoor space.',
      value_per_job: 400,
    },
    {
      name: 'EV Charger Spring Push',
      tagline: 'Charge at home',
      segment: 'residential',
      services: ['ev charger'],
      msg: 'Thinking about an EV? Get your home charger installed this spring. We handle survey, install, and grant paperwork.',
      value_per_job: 1200,
    },
    {
      name: 'Holiday Let EICRs',
      tagline: 'Ready for summer guests',
      segment: 'landlord',
      services: ['eicr'],
      msg: 'Holiday let season is starting — make sure your property passes inspection before guests arrive.',
      value_per_job: 250,
    },
  ],
  Q3: [
    {
      name: 'Back-to-School Landlord Push',
      tagline: 'Students moving in?',
      segment: 'landlord',
      services: ['eicr', 'pat-testing'],
      msg: 'New tenants moving in for September? Make sure your EICR and PAT testing are sorted before they arrive.',
      value_per_job: 300,
    },
    {
      name: 'Solar PV Autumn Campaign',
      tagline: 'Generate your own power',
      segment: 'residential',
      services: ['solar'],
      msg: 'Energy prices going up? Lock in savings with solar panels. We design, install, and certify — MCS registered.',
      value_per_job: 7000,
    },
    {
      name: 'Smoke & CO Alarm Checks',
      tagline: 'Protect your family',
      segment: 'residential',
      services: ['fire-alarm'],
      msg: 'When did you last check your smoke alarms? We can upgrade to interconnected alarms for full home coverage.',
      value_per_job: 200,
    },
  ],
  Q4: [
    {
      name: 'Winter Prep Campaign',
      tagline: 'Stay safe this winter',
      segment: 'residential',
      services: ['emergency-lighting', 'consumer unit'],
      msg: 'Dark evenings ahead — is your emergency lighting working? Now is the time to check your electrics before winter.',
      value_per_job: 350,
    },
    {
      name: 'Christmas Outdoor Lighting',
      tagline: 'Light up Christmas',
      segment: 'residential',
      services: ['outdoor', 'lighting'],
      msg: 'Want outdoor Christmas lights without the extension lead chaos? We install weatherproof outdoor sockets properly.',
      value_per_job: 250,
    },
    {
      name: 'Year-End Compliance',
      tagline: 'Start next year clean',
      segment: 'landlord',
      services: ['eicr', 'fire-alarm', 'emergency-lighting'],
      msg: 'End the year compliant — get your EICR, fire alarm, and emergency lighting all checked before {next_year}.',
      value_per_job: 500,
    },
  ],
};

export async function getSeasonalCampaigns(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const now = new Date();
  const currentQ = Math.floor(now.getMonth() / 3);
  const quarter = (args.quarter as string) || `Q${currentQ + 1}`;
  const year = now.getFullYear();

  const [clientsRes, invoicesRes] = await Promise.all([
    supabase.from('customers').select('id, type'),
    supabase.from('invoices').select('total, line_items, paid_at').eq('status', 'paid'),
  ]);

  const clients = clientsRes.data || [];
  const invoices = invoicesRes.data || [];

  const segmentCounts: Record<string, number> = {};
  for (const c of clients) {
    const t = ((c.type as string) || 'residential').toLowerCase();
    segmentCounts[t] = (segmentCounts[t] || 0) + 1;
  }

  // Last year same quarter revenue
  const qStart = new Date(year - 1, currentQ * 3, 1);
  const qEnd = new Date(year - 1, (currentQ + 1) * 3, 0);
  const lastYearQRevenue = invoices
    .filter((i) => {
      const d = new Date(i.paid_at as string);
      return d >= qStart && d <= qEnd;
    })
    .reduce((s, i) => s + Number(i.total || 0), 0);

  const campaigns = (CAMPAIGNS[quarter] || CAMPAIGNS.Q1).map((c) => {
    const targetCount = segmentCounts[c.segment] || 0;
    return {
      name: c.name,
      tagline: c.tagline.replace('{year}', String(year)),
      target_segment: c.segment,
      target_clients_count: targetCount,
      services: c.services,
      suggested_message: c.msg
        .replace('{year}', String(year))
        .replace('{next_year}', String(year + 1)),
      estimated_revenue: targetCount * c.value_per_job,
    };
  });

  return {
    success: true,
    quarter,
    campaigns,
    total_estimated_potential: campaigns.reduce((s, c) => s + c.estimated_revenue, 0),
    last_year_same_quarter: Math.round(lastYearQRevenue),
    currency: 'GBP',
  };
}
