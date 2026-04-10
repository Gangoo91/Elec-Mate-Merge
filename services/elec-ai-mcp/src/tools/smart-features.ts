/**
 * Smart features — job completion workflow, pricing suggestions, project templates
 *
 * Tools:
 *  - get_completion_checklist  → what's missing after job completion (invoice, cert, etc.)
 *  - get_pricing_suggestions   → historical + RAG pricing for a job type
 *  - create_project_from_template → pre-built project with tasks for common job types
 */

import type { UserContext } from '../auth.js';

// ─── Job Completion Checklist ──────────────────────────────────────────────

/** Map job description keywords to likely certificate types */
const JOB_CERT_MAP: Record<string, string[]> = {
  rewire: ['eicr', 'eic'],
  'consumer unit': ['eicr', 'minor-works'],
  'cu change': ['eicr', 'minor-works'],
  eicr: ['eicr'],
  'periodic inspection': ['eicr'],
  'ev charger': ['ev-charging', 'minor-works'],
  'ev charge': ['ev-charging', 'minor-works'],
  solar: ['solar-pv', 'eic'],
  'solar pv': ['solar-pv', 'eic'],
  'fire alarm': ['fire-alarm'],
  'smoke alarm': ['fire-alarm'],
  'emergency lighting': ['emergency-lighting'],
  'pat test': ['pat-testing'],
  'pat testing': ['pat-testing'],
  'minor works': ['minor-works'],
  'new circuit': ['minor-works'],
  'additional circuit': ['minor-works'],
  socket: ['minor-works'],
  lighting: ['minor-works'],
  shower: ['minor-works', 'eic'],
  kitchen: ['eic', 'minor-works'],
  bathroom: ['minor-works'],
  garden: ['minor-works'],
  outdoor: ['minor-works'],
};

function suggestCertTypes(title: string, description?: string): string[] {
  const text = `${title} ${description || ''}`.toLowerCase();
  const suggested = new Set<string>();
  for (const [keyword, certs] of Object.entries(JOB_CERT_MAP)) {
    if (text.includes(keyword)) {
      for (const c of certs) suggested.add(c);
    }
  }
  return [...suggested];
}

/**
 * Get a completion checklist for a job or project.
 * Shows what's done and what's missing: invoice, certificates, snags.
 */
export async function getCompletionChecklist(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const jobId = args.job_id as string;
  const projectId = args.project_id as string;

  if (!jobId && !projectId) return { error: 'job_id or project_id is required' };

  let jobTitle = '';
  let jobDescription = '';
  let clientName = '';
  let location = '';

  // Get job/project details
  if (jobId) {
    const { data: job } = await supabase
      .from('employer_jobs')
      .select('id, title, description, client, location, status, value')
      .eq('id', jobId)
      .single();
    if (!job) return { error: 'Job not found' };
    jobTitle = (job.title as string) || '';
    jobDescription = (job.description as string) || '';
    clientName = (job.client as string) || '';
    location = (job.location as string) || '';
  } else {
    const { data: project } = await supabase
      .from('spark_projects')
      .select('id, title, description, customer_id, location, status, customers(name)')
      .eq('id', projectId)
      .single();
    if (!project) return { error: 'Project not found' };
    jobTitle = (project.title as string) || '';
    jobDescription = (project.description as string) || '';
    clientName = ((project.customers as unknown as Record<string, unknown>)?.name as string) || '';
    location = (project.location as string) || '';
  }

  // Check for existing invoice (by client name, last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [invoiceResult, certResult, snagResult] = await Promise.all([
    // Invoices
    clientName
      ? supabase
          .from('invoices')
          .select('id, invoice_number, total, status')
          .eq('client_data->>name', clientName)
          .gte('created_at', thirtyDaysAgo.toISOString())
          .limit(5)
      : Promise.resolve({ data: [] }),

    // Certificates at this location
    location
      ? supabase
          .from('reports')
          .select('id, report_type, status, created_at')
          .ilike('installation_address', `%${location.slice(0, 20)}%`)
          .gte('created_at', thirtyDaysAgo.toISOString())
          .limit(10)
      : Promise.resolve({ data: [] }),

    // Open snags
    projectId
      ? supabase
          .from('spark_tasks')
          .select('id, title, status')
          .eq('project_id', projectId)
          .in('status', ['open', 'in_progress'])
          .limit(20)
      : Promise.resolve({ data: [] }),
  ]);

  const invoices = invoiceResult.data || [];
  const certs = certResult.data || [];
  const openSnags = snagResult.data || [];
  const suggestedCerts = suggestCertTypes(jobTitle, jobDescription);
  const existingCertTypes = certs.map((c) => (c as Record<string, unknown>).report_type as string);
  const missingCerts = suggestedCerts.filter((t) => !existingCertTypes.includes(t));

  const nextActions: string[] = [];
  if (invoices.length === 0) nextActions.push('Create and send invoice');
  if (missingCerts.length > 0) nextActions.push(`Create certificates: ${missingCerts.join(', ')}`);
  if (openSnags.length > 0) nextActions.push(`Resolve ${openSnags.length} open snag(s)`);
  if (
    invoices.length > 0 &&
    invoices.every((i) => (i as Record<string, unknown>).status !== 'paid')
  ) {
    nextActions.push('Chase unpaid invoice');
  }
  if (nextActions.length === 0) nextActions.push('All done — job fully closed out');

  return {
    success: true,
    job_title: jobTitle,
    client_name: clientName,
    location,
    invoice: {
      exists: invoices.length > 0,
      invoices: invoices.map((i) => ({
        id: (i as Record<string, unknown>).id,
        number: (i as Record<string, unknown>).invoice_number,
        total: (i as Record<string, unknown>).total,
        status: (i as Record<string, unknown>).status,
      })),
    },
    certificates: {
      existing: certs.map((c) => ({
        type: (c as Record<string, unknown>).report_type,
        status: (c as Record<string, unknown>).status,
      })),
      suggested: suggestedCerts,
      missing: missingCerts,
    },
    open_snags: openSnags.length,
    next_actions: nextActions,
  };
}

// ─── Smart Pricing Suggestions ─────────────────────────────────────────────

/**
 * Get pricing suggestions for a job type based on historical data + RAG.
 */
export async function getPricingSuggestions(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const jobType = args.job_type as string;

  if (!jobType)
    return { error: 'job_type is required (e.g. "consumer unit change", "full rewire", "EICR")' };

  const searchTerm = jobType.toLowerCase();

  // Get user's own historical quotes and invoices with similar descriptions
  const [quotesResult, invoicesResult, ragResult] = await Promise.all([
    supabase
      .from('quotes')
      .select('total, items, created_at, status')
      .or(`items::text.ilike.%${searchTerm}%,notes.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })
      .limit(20),

    supabase
      .from('invoices')
      .select('total, line_items, created_at, status')
      .or(`line_items::text.ilike.%${searchTerm}%,notes.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })
      .limit(20),

    // RAG pricing data
    supabase
      .from('pricing_embeddings')
      .select('content, metadata')
      .textSearch('content', searchTerm.replace(/\s+/g, ' & '))
      .limit(5),
  ]);

  const quotes = quotesResult.data || [];
  const invoices = invoicesResult.data || [];

  // Extract totals from both
  const totals: number[] = [];
  for (const q of quotes) {
    const t = Number((q as Record<string, unknown>).total);
    if (t > 0) totals.push(t);
  }
  for (const inv of invoices) {
    const t = Number((inv as Record<string, unknown>).total);
    if (t > 0) totals.push(t);
  }

  const history: Record<string, unknown> = {};
  if (totals.length > 0) {
    const sorted = [...totals].sort((a, b) => a - b);
    history.sample_size = totals.length;
    history.min = Math.round(sorted[0]);
    history.max = Math.round(sorted[sorted.length - 1]);
    history.avg = Math.round(totals.reduce((s, v) => s + v, 0) / totals.length);
    history.median = Math.round(
      sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)]
    );
  }

  // Extract RAG benchmark
  const ragPricing = (ragResult.data || []).map((r) => ({
    content: (((r as Record<string, unknown>).content as string) || '').slice(0, 200),
    metadata: (r as Record<string, unknown>).metadata,
  }));

  // Suggest price
  let suggestedPrice: number | null = null;
  let confidence: string = 'low';

  if (totals.length >= 5) {
    suggestedPrice = history.median as number;
    confidence = 'high';
  } else if (totals.length >= 2) {
    suggestedPrice = history.avg as number;
    confidence = 'medium';
  } else if (totals.length === 1) {
    suggestedPrice = totals[0];
    confidence = 'low';
  }

  return {
    success: true,
    job_type: jobType,
    your_history: totals.length > 0 ? history : null,
    industry_benchmark: ragPricing.length > 0 ? ragPricing : null,
    suggested_price: suggestedPrice,
    confidence,
    currency: 'GBP',
    note:
      totals.length === 0
        ? 'No historical data for this job type. Try a broader description.'
        : `Based on ${totals.length} previous ${totals.length === 1 ? 'job' : 'jobs'}.`,
  };
}

// ─── Project Templates ─────────────────────────────────────────────────────

interface TaskTemplate {
  title: string;
  description: string;
  est_hours?: number;
}

interface ProjectTemplate {
  title_pattern: string;
  tasks: TaskTemplate[];
  certs_needed: string[];
  typical_value_range: { min: number; max: number };
}

const TEMPLATES: Record<string, ProjectTemplate> = {
  rewire: {
    title_pattern: 'Full Rewire - {location}',
    tasks: [
      {
        title: 'Site survey & assessment',
        description: 'Assess existing installation, note circuit layout, identify hazards',
        est_hours: 2,
      },
      {
        title: 'Quote & materials order',
        description: 'Finalise quote, order cable, accessories, consumer unit',
        est_hours: 1,
      },
      {
        title: 'Isolate & strip out',
        description: 'Safe isolation, remove old wiring and accessories',
        est_hours: 8,
      },
      {
        title: 'First fix — route cables',
        description: 'Run all new cables, install back boxes, containment',
        est_hours: 16,
      },
      {
        title: 'Consumer unit install',
        description: 'Fit new consumer unit, terminate circuits, label',
        est_hours: 4,
      },
      {
        title: 'Second fix — accessories',
        description: 'Fit sockets, switches, lights, connect circuits',
        est_hours: 8,
      },
      {
        title: 'Dead testing',
        description: 'Continuity, insulation resistance, polarity checks',
        est_hours: 3,
      },
      {
        title: 'Live testing',
        description: 'Zs, Ze, RCD trip times, earth fault loop',
        est_hours: 2,
      },
      {
        title: 'EICR / EIC certificate',
        description: 'Complete test certificate, schedule of results',
        est_hours: 2,
      },
      {
        title: 'Client handover',
        description: 'Walk through, demo, hand over certs, get sign-off',
        est_hours: 1,
      },
      {
        title: 'Part P notification',
        description: 'Submit Building Regulations notification if required',
        est_hours: 0.5,
      },
    ],
    certs_needed: ['eicr', 'eic'],
    typical_value_range: { min: 3000, max: 8000 },
  },
  eicr: {
    title_pattern: 'EICR Inspection - {location}',
    tasks: [
      {
        title: 'Pre-inspection paperwork',
        description: 'Previous EICR review, agree scope with client',
        est_hours: 0.5,
      },
      {
        title: 'Visual inspection',
        description: 'Check consumer unit, accessories, cable routes, containment',
        est_hours: 1,
      },
      {
        title: 'Dead testing',
        description: 'Continuity of ring finals, CPC, insulation resistance',
        est_hours: 2,
      },
      {
        title: 'Live testing',
        description: 'Zs, Ze, PFC, RCD tests, earth electrode (if TT)',
        est_hours: 2,
      },
      {
        title: 'Complete EICR report',
        description: 'Fill in observations, C1/C2/C3/FI codes, schedule of results',
        est_hours: 1,
      },
      {
        title: 'Discuss findings with client',
        description: 'Explain observations, recommend remedial work',
        est_hours: 0.5,
      },
      {
        title: 'Remedial works (if needed)',
        description: 'Fix C1/C2 items, re-test affected circuits',
        est_hours: 2,
      },
      {
        title: 'Issue final certificate',
        description: 'Generate PDF, send to client, file copy',
        est_hours: 0.5,
      },
    ],
    certs_needed: ['eicr'],
    typical_value_range: { min: 150, max: 400 },
  },
  consumer_unit: {
    title_pattern: 'Consumer Unit Change - {location}',
    tasks: [
      {
        title: 'Survey existing board',
        description: 'Record circuit layout, breaker types, cable sizes',
        est_hours: 1,
      },
      {
        title: 'Quote & order CU',
        description: 'Select RCBO board or dual RCD, order components',
        est_hours: 0.5,
      },
      {
        title: 'Safe isolation',
        description: 'Isolate supply, confirm dead, lock off',
        est_hours: 0.5,
      },
      {
        title: 'Remove old consumer unit',
        description: 'Disconnect circuits, remove old board',
        est_hours: 1,
      },
      {
        title: 'Install new consumer unit',
        description: 'Mount board, terminate circuits, label',
        est_hours: 3,
      },
      { title: 'Testing', description: 'Full dead and live tests on all circuits', est_hours: 2 },
      {
        title: 'Certification',
        description: 'Complete EICR or Minor Works as appropriate',
        est_hours: 1,
      },
      {
        title: 'Client handover',
        description: 'Explain new board, hand over certs',
        est_hours: 0.5,
      },
      {
        title: 'Part P notification',
        description: 'Submit notification to Building Control',
        est_hours: 0.5,
      },
    ],
    certs_needed: ['eicr', 'minor-works'],
    typical_value_range: { min: 400, max: 900 },
  },
  solar: {
    title_pattern: 'Solar PV Installation - {location}',
    tasks: [
      {
        title: 'Site survey & roof assessment',
        description: 'Check roof orientation, shading, structural capacity',
        est_hours: 2,
      },
      {
        title: 'System design',
        description: 'Panel layout, inverter sizing, cable calculations',
        est_hours: 2,
      },
      {
        title: 'DNO G99 application',
        description: 'Submit grid connection application to DNO',
        est_hours: 1,
      },
      {
        title: 'Scaffolding & access',
        description: 'Arrange scaffolding or roof ladder',
        est_hours: 1,
      },
      {
        title: 'Mount rails & panels',
        description: 'Install mounting system, fix solar panels',
        est_hours: 8,
      },
      {
        title: 'DC wiring',
        description: 'String wiring, DC isolator, cable management',
        est_hours: 4,
      },
      {
        title: 'Inverter installation',
        description: 'Mount inverter, connect DC and AC',
        est_hours: 2,
      },
      {
        title: 'AC connection',
        description: 'Connect to consumer unit, install generation meter',
        est_hours: 2,
      },
      {
        title: 'Commissioning',
        description: 'Power on, verify output, configure monitoring',
        est_hours: 2,
      },
      {
        title: 'Testing & certification',
        description: 'Full testing, EIC, Solar PV cert',
        est_hours: 2,
      },
      {
        title: 'MCS registration',
        description: 'Register with MCS, apply for export tariff',
        est_hours: 1,
      },
      {
        title: 'Client handover',
        description: 'Demonstrate monitoring app, hand over certs',
        est_hours: 1,
      },
    ],
    certs_needed: ['solar-pv', 'eic'],
    typical_value_range: { min: 5000, max: 12000 },
  },
  ev_charger: {
    title_pattern: 'EV Charger Installation - {location}',
    tasks: [
      {
        title: 'Site survey',
        description: 'Assess supply capacity, cable route, charger position',
        est_hours: 1,
      },
      {
        title: 'DNO check',
        description: 'Check if supply upgrade needed, submit notification if >3.6kW',
        est_hours: 0.5,
      },
      {
        title: 'Order equipment',
        description: 'Order charger unit, cable, isolator, earthing',
        est_hours: 0.5,
      },
      {
        title: 'Install cable route',
        description: 'Run SWA or armoured cable from CU to charger position',
        est_hours: 3,
      },
      {
        title: 'Mount charger unit',
        description: 'Fix charger to wall, connect supply',
        est_hours: 2,
      },
      {
        title: 'Earthing & bonding',
        description: 'Install earth rod if TT, verify PME considerations',
        est_hours: 1,
      },
      { title: 'Testing', description: 'Dead and live tests, RCD/RCBO verification', est_hours: 1 },
      {
        title: 'Commissioning & setup',
        description: 'Power on, configure app, test charge cycle',
        est_hours: 0.5,
      },
      {
        title: 'Certification',
        description: 'Complete EV charging cert + Minor Works',
        est_hours: 1,
      },
      {
        title: 'OZEV notification',
        description: 'Submit OZEV grant claim if applicable',
        est_hours: 0.5,
      },
    ],
    certs_needed: ['ev-charging', 'minor-works'],
    typical_value_range: { min: 800, max: 1500 },
  },
};

/**
 * Create a project with pre-built tasks from a template.
 */
export async function createProjectFromTemplate(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const templateName = args.template as string;
  const clientId = args.client_id as string;
  const location = (args.location as string) || '';
  const startDate = args.start_date as string;

  if (!templateName) {
    return {
      error: `template is required. Available: ${Object.keys(TEMPLATES).join(', ')}`,
    };
  }

  const template = TEMPLATES[templateName.toLowerCase().replace(/[\s-]/g, '_')];
  if (!template) {
    return {
      error: `Unknown template "${templateName}". Available: ${Object.keys(TEMPLATES).join(', ')}`,
    };
  }

  const title = template.title_pattern.replace('{location}', location || 'TBC');

  // Create the project
  const { data: project, error: projError } = await supabase
    .from('spark_projects')
    .insert({
      user_id: user.userId,
      title,
      description: `Created from ${templateName} template`,
      status: 'open',
      priority: 'normal',
      location: location || null,
      customer_id: clientId || null,
      estimated_value: template.typical_value_range.min,
      start_date: startDate || null,
    })
    .select('id, title')
    .single();

  if (projError) throw new Error(`Failed to create project: ${projError.message}`);

  // Create tasks
  const taskInserts = template.tasks.map((t, i) => ({
    user_id: user.userId,
    project_id: project.id,
    title: t.title,
    description: t.description,
    status: 'open',
    priority: 'normal',
    position: i + 1,
  }));

  const { error: tasksError } = await supabase.from('spark_tasks').insert(taskInserts);

  if (tasksError) {
    console.error(`[templates] Tasks creation failed: ${tasksError.message}`);
  }

  return {
    success: true,
    project_id: project.id,
    project_title: project.title,
    tasks_created: template.tasks.length,
    certs_needed: template.certs_needed,
    typical_value: `£${template.typical_value_range.min} - £${template.typical_value_range.max}`,
    note: `Project created with ${template.tasks.length} tasks. Use link_to_project to attach quotes, invoices, or certificates.`,
  };
}
