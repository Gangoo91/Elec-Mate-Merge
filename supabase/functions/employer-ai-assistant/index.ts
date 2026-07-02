/**
 * employer-ai-assistant — "Employer Mate", the firm owner's AI business partner.
 *
 * Mirrors the Business Hub assistant pattern (soul + live snapshot + tool-calling),
 * scoped to the EMPLOYER. Every advisory answer is grounded in the authoritative
 * employer_knowledge RAG (search_employer_knowledge) — never invented.
 *
 * Streams the final answer (text/plain) for speed: tool resolution runs first
 * (non-streamed), then the grounded answer streams token-by-token.
 * Self-contained (no _shared imports) so it deploys via the management API.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};
const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
const streamHeaders = {
  ...corsHeaders,
  'Content-Type': 'text/plain; charset=utf-8',
  'Cache-Control': 'no-cache',
};

const CHAT_MODEL = 'gpt-5.4-mini-2026-03-17';
const EMBED_MODEL = 'text-embedding-3-large';
const OPENAI_CHAT = 'https://api.openai.com/v1/chat/completions';

const SOUL = `You are Mate — the electrician's AI, now sitting inside the Employer Hub as the firm owner's business partner. You advise the person who RUNS a UK electrical contracting business: hiring, bidding, costing, cashflow, compliance, contracts, and running jobs and people.

SECTOR — think across DOMESTIC, COMMERCIAL and INDUSTRIAL, not just domestic. A firm's work spans houses and landlords; offices, retail, schools and healthcare; and industrial sites, plant and factories. So reason in the right register for the job: three-phase and single-phase, sub-mains and distribution boards, containment (tray, basket, trunking, conduit), SWA and fire-rated cable, motor/HVAC/process supplies, emergency lighting and fire alarm interfaces, plus the commercial/industrial contracting reality — main contractors, JCT/NEC and term contracts, retentions, applications for payment and CVR, prelims, programme and phasing. Ask which sector if a brief is ambiguous and it changes the answer.

VOICE: a sharp, experienced operations & commercial director. Direct, trade-aware, UK English (colour, organise, labour, metre). No emoji, no waffle — but give real depth when advising. Lead with the recommendation, then the why, the grounded facts WITH their source, the practical steps, and the trade-offs. Match length to the weight of the question: a quick fact gets a tight answer; a hiring, bidding or cashflow decision gets a proper, structured one (headed points are fine).

GROUNDING — non-negotiable, two knowledge bases, never invent: (1) for any BUSINESS/COMMERCIAL question (costing, estimating, tendering, contracts, retentions, payment terms, CIS, VAT, employment law, apprenticeships, project management) you MUST call search_employer_knowledge first and cite the source inline (e.g. "per the JIB National Working Rules", "under the Construction Act 1996", "RICS NRM1", "ACAS"); (2) for any TECHNICAL/REGULATORY point — what BS 7671 actually requires (RCD/RCBO, AFDDs, disconnection times, cable sizing, special locations, certification, notifiable work) — you MUST call search_bs7671 and cite the regulation number it returns. Both ground job-planning and estimating too: the Regs often drive the spec (and therefore the materials and cost). Never invent rates, figures, legal positions or regulation requirements from memory. If a knowledge base doesn't cover it, say so plainly rather than guess.

THE FIRM — you have OVERSIGHT of the whole business. Each turn you receive a live snapshot across the entire hub: team, jobs and job packs, money (invoices, overdue, quotes, material orders, expenses to approve), hiring (vacancies, applicants), safety & ops (open incidents, open/overdue tasks), and resources (suppliers, price book). Use it: answer about any corner of the firm, make advice specific to their real numbers, and join the dots across areas (e.g. an overdue invoice that threatens cashflow on a job starting next week; a compliance gap on a worker assigned to a live job).

ACTIONS — you can SET UP and RUN the firm directly. Tools: add team members, suppliers, price-book items and jobs; create quotes, invoices, job packs and vacancies. When asked to do something, DO it, then report exactly what you created (e.g. "Raised invoice INV-0003 to Dave for £450").

ONBOARDING PEOPLE — when you add a team member, get their EMAIL and their PAY: salaried roles (QS, Project Manager, Supervisor) take an annual_salary, hands-on roles (Operative, Apprentice) an hourly_rate — ask if it's missing rather than assume. If you have an email, adding them automatically emails them their sign-in details: they sign in with that email and link to the firm on their own, no password handover from you. Each linked team member is a £9.99/month seat on the firm's subscription, charged only once they actually link. Tell the owner what you did in those terms, and if there's no email, tell them to share the team invite code instead. For a large batch, confirm the count first. You only ever INSERT — never overwrite or delete; the user edits in the hub. Setting up from scratch, work in order: team → suppliers → price book → jobs → quotes/invoices. For anything you don't yet have a tool for (producing PDFs, hiring an applicant), give the precise manual steps.

BE PROACTIVE — never just execute silently. After any action, add a short, business-aware observation: what it means for the firm and the obvious next step, drawn from your live oversight (e.g. "Added CEF — but you've still no price book, so you can't cost a job properly yet; want me to add your common rates?"; "Raised that invoice — your overdue total is now £X across N invoices; I'd chase the oldest two first"). Surface risks and opportunities unprompted: cashflow exposure, a compliance gap, an unfilled vacancy on a job starting soon. You are a partner who thinks, not a form-filler.

ESTIMATING & PLANNING — when asked to plan, quote, price or "set up" a job, orchestrate the WHOLE thing from a one-line brief, in the right register for the sector: (1) break the work into the real trade tasks (a domestic rewire = first fix, plaster liaison, second fix, test, certify; a commercial/industrial job = containment install, cable pulling/glanding, board/sub-main termination, motor/plant connections, testing, commissioning, certification) — use get_task_guidance to make the breakdown concrete (steps, tools); (2) check search_bs7671 for any reg that drives the spec (e.g. AFDDs/RCBOs now required, RCD protection, special-location requirements) — it changes what you must fit and therefore the cost; (3) cost LABOUR using THE FIRM'S RATES below × your honest hour/day estimate per task; (4) price MATERIALS by calling get_material_prices for the key items — these are LIVE supplier prices refreshed daily, so USE them, never guess a material price; (5) add the firm's materials markup + overhead + profit; (6) give a realistic timeline (labour hours → working days). Present a clear breakdown — tasks, materials (with the live prices + supplier), labour, and the total — and ground the method via search_employer_knowledge (NRM1, daywork, markup) where it sharpens it. Then offer to build it for real: create_job, add_task for each task, assign people from list_team, and create_quote. If the firm's rates aren't set, ask once or state your assumption.

CONFIRM & UNDO — for anything financial or hard to reverse (raising an invoice, posting a public vacancy) or any large batch, briefly propose it and wait for a "yes" before doing it — UNLESS the user already clearly told you to. Quick low-risk setup (adding a supplier, a price-book line) just do. Every action is logged. If the user says "undo", "remove it" or corrects you, call delete_record with the id you got when you created it — and confirm what you removed.

SAFEGUARDS: you advise, but flag when something high-stakes warrants an accountant or solicitor rather than relying on you. Stay strictly within this employer's own data.`;

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'search_employer_knowledge',
      description:
        'Search the authoritative business knowledge base (costing, estimating, tendering, contracts, CIS, VAT, employment law, apprenticeships, project management — sourced from RICS, JIB, ACAS, HSE, gov.uk playbooks). Call this for ANY question needing factual grounding before answering.',
      parameters: {
        type: 'object',
        properties: { query: { type: 'string', description: 'The specific question or topic to look up.' } },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'add_team_member',
      description: 'Add a person to the team/roster — the owner themselves, staff or a subbie. Only name is required.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          role: { type: 'string', description: 'e.g. Electrician, Apprentice, Owner, Office, Labourer' },
          team_role: { type: 'string' },
          pay_type: { type: 'string', enum: ['hourly', 'salary'] },
          hourly_rate: { type: 'number' },
          annual_salary: { type: 'number' },
          email: { type: 'string' },
          phone: { type: 'string' },
        },
        required: ['name'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'add_supplier',
      description: 'Add a materials supplier / merchant (e.g. CEF, Edmundson, Screwfix, TLC, Rexel).',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          category: { type: 'string' },
          contact_name: { type: 'string' },
          phone: { type: 'string' },
          email: { type: 'string' },
          account_number: { type: 'string' },
          address: { type: 'string' },
          delivery_days: { type: 'number' },
        },
        required: ['name'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'add_price_book_item',
      description: 'Add an item to the price book. sell_price is what the firm charges; buy_price is the optional trade cost.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          category: { type: 'string' },
          sell_price: { type: 'number' },
          buy_price: { type: 'number' },
          unit: { type: 'string', description: 'e.g. each, m, hour, day' },
          sku: { type: 'string' },
        },
        required: ['name'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_job',
      description: 'Create a job / project in the hub.',
      parameters: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          client: { type: 'string' },
          location: { type: 'string' },
          value: { type: 'number' },
          start_date: { type: 'string', description: 'YYYY-MM-DD' },
          description: { type: 'string' },
          client_phone: { type: 'string' },
          client_email: { type: 'string' },
        },
        required: ['title'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_quote',
      description: 'Create a draft quote for a client. A quote number is generated automatically.',
      parameters: {
        type: 'object',
        properties: {
          client: { type: 'string' },
          description: { type: 'string' },
          value: { type: 'number', description: 'Total quote value in GBP.' },
          job_title: { type: 'string' },
          valid_until: { type: 'string', description: 'YYYY-MM-DD' },
          client_email: { type: 'string' },
          client_phone: { type: 'string' },
        },
        required: ['client'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_invoice',
      description: 'Create a draft invoice for a client. An invoice number is generated automatically. Does NOT send it.',
      parameters: {
        type: 'object',
        properties: {
          client: { type: 'string' },
          amount: { type: 'number', description: 'Total invoice amount in GBP.' },
          project: { type: 'string' },
          due_date: { type: 'string', description: 'YYYY-MM-DD' },
          notes: { type: 'string' },
          client_email: { type: 'string' },
        },
        required: ['client'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_job_pack',
      description: 'Create a job pack (the on-site brief: scope, hazards, who).',
      parameters: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          client: { type: 'string' },
          location: { type: 'string' },
          scope: { type: 'string' },
          start_date: { type: 'string', description: 'YYYY-MM-DD' },
          estimated_value: { type: 'number' },
        },
        required: ['title', 'client', 'location'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_vacancy',
      description: 'Post a job vacancy to hire an electrician/worker.',
      parameters: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          location: { type: 'string' },
          type: { type: 'string', description: 'e.g. Full-time, Contract' },
          salary_min: { type: 'number' },
          salary_max: { type: 'number' },
          salary_period: { type: 'string', description: 'e.g. year, day, hour' },
          description: { type: 'string' },
        },
        required: ['title', 'location'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_material_prices',
      description: 'Look up LIVE supplier prices for a material (cable, consumer unit, sockets, EV charger, etc.) from the daily-refreshed price feed. Call this to price materials for an estimate — never guess.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'The item to price, e.g. "6242Y 2.5mm twin and earth 100m" or "Hager 10-way consumer unit".' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'list_team',
      description: 'List the team members with their ids — use before assigning anyone to a task.',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_bs7671',
      description:
        'Search BS 7671:2018+A4:2026 (the Wiring Regulations) for the authoritative regulation text on a technical or compliance point — RCD/RCBO requirements, disconnection times, cable sizing, special locations, AFDDs, certification, notifiable work. Call this whenever an estimate, job plan or answer turns on what the Regs actually require, and cite the regulation number it returns. Never state a BS 7671 requirement from memory.',
      parameters: {
        type: 'object',
        properties: { query: { type: 'string', description: 'The technical/regulatory point to look up, e.g. "RCD protection for socket outlets in a domestic install".' } },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_task_guidance',
      description:
        'Look up the real trade task breakdown for a piece of electrical work — the steps, tools and equipment involved — to make an estimate or job plan concrete and credible. Use when planning/quoting a job to ground the task list (NOT for labour hours, which remain your estimate × the firm rate).',
      parameters: {
        type: 'object',
        properties: { query: { type: 'string', description: 'The work to break down, e.g. "consumer unit replacement" or "EV charger installation".' } },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'add_task',
      description: 'Add a task to a job. job_id is the id returned by create_job. Optionally assign a team member (assignee_employee_id from list_team).',
      parameters: {
        type: 'object',
        properties: {
          job_id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          priority: { type: 'string', enum: ['low', 'medium', 'high'] },
          due_date: { type: 'string', description: 'YYYY-MM-DD' },
          assignee_employee_id: { type: 'string' },
        },
        required: ['job_id', 'title'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'delete_record',
      description: 'Undo — delete a record you just created (use the id from when you created it). Use when the user says "undo that", "remove it", or corrects you.',
      parameters: {
        type: 'object',
        properties: {
          entity: { type: 'string', enum: ['team', 'supplier', 'price_book_item', 'job', 'quote', 'invoice', 'job_pack', 'vacancy', 'task'] },
          id: { type: 'string', description: 'The id of the record to delete.' },
        },
        required: ['entity', 'id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_team_member',
      description: "Get a single worker's full picture (their \"Worker 360\") — profile plus their recent timesheets, expenses and leave, each with a pending-approval count. Use when the user asks about one worker by name, e.g. \"how many hours has Dave done?\", \"has Sam got expenses to approve?\", \"is Jordan off next week?\", or \"tell me about Jordan\". Pass the employee_id from list_team (call list_team first if you don't have it).",
      parameters: {
        type: 'object',
        properties: {
          employee_id: { type: 'string', description: 'The worker id from list_team.' },
        },
        required: ['employee_id'],
      },
    },
  },
];

async function embed(text: string, key: string): Promise<string> {
  const r = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: EMBED_MODEL, input: text }),
  });
  const d = await r.json();
  return '[' + d.data[0].embedding.join(',') + ']';
}

function initials(name: string): string {
  const p = String(name || '').trim().split(/\s+/);
  return ((p[0]?.[0] ?? '') + (p[1]?.[0] ?? '')).toUpperCase() || 'NW';
}

// Geocode a job address → map coordinates via the shared geocode-location fn
// (Google, UK-biased), so a job Mate creates pins on the live map exactly like
// one made in the UI. Best-effort: a miss just leaves the job un-pinned.
async function geocodeJob(location: string): Promise<{ lat: number; lng: number } | null> {
  if (!location || !location.trim()) return null;
  try {
    const anon = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const r = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/geocode-location`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${anon}`, apikey: anon },
      body: JSON.stringify({ location }),
    });
    if (!r.ok) return null;
    const d = await r.json();
    const loc = d?.location;
    if (loc && typeof loc.lat === 'number' && typeof loc.lng === 'number') {
      return { lat: loc.lat, lng: loc.lng };
    }
    return null;
  } catch {
    return null;
  }
}

// Invoke another edge function as the EMPLOYER (their JWT) — used so Mate can
// trigger the onboarding email + seat-sync exactly as the manual add does.
// Non-fatal: a failed side-effect never blocks the roster insert.
async function invokeFn(name: string, body: unknown, authHeader: string): Promise<void> {
  try {
    await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/${name}`, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        apikey: Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body ?? {}),
    });
  } catch { /* non-fatal */ }
}

// Full-hub oversight. Defensive: a missing table/column returns [] (no crash).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getSnapshot(admin: any, uid: string): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safe = (b: any): Promise<any[]> => b.then((r: { data: unknown }) => (Array.isArray(r?.data) ? r.data : []));
  const lc = (s: unknown) => String(s ?? '').toLowerCase();
  const now = Date.now();

  const [employees, jobs, packs, invoices, quotes, vacancies, incidents, tasks, materials, expenses, suppliers, priceBook] =
    await Promise.all([
      safe(admin.from('employer_employees').select('name, role, status').eq('employer_id', uid)),
      safe(admin.from('employer_jobs').select('title, status, start_date').eq('user_id', uid)),
      safe(admin.from('employer_job_packs').select('status').eq('employer_id', uid)),
      safe(admin.from('employer_invoices').select('amount, status, due_date').eq('employer_id', uid)),
      safe(admin.from('employer_quotes').select('status').eq('employer_id', uid)),
      safe(admin.from('employer_vacancies').select('id, title, status').eq('employer_id', uid)),
      safe(admin.from('employer_incidents').select('severity, status').eq('employer_id', uid)),
      safe(admin.from('employer_job_tasks').select('status, due_date').eq('employer_id', uid)),
      safe(admin.from('employer_material_orders').select('total, status').eq('employer_id', uid)),
      safe(admin.from('employer_expense_claims').select('amount, status').eq('employer_id', uid)),
      safe(admin.from('employer_suppliers').select('id').eq('employer_id', uid)),
      safe(admin.from('employer_price_book').select('id').eq('employer_id', uid)),
    ]);

  let apps: Array<{ status: string }> = [];
  const vacIds = vacancies.map((v) => v.id).filter(Boolean);
  if (vacIds.length) apps = await safe(admin.from('employer_vacancy_applications').select('status').in('vacancy_id', vacIds));

  const done = (s: unknown) => ['completed', 'complete', 'cancelled', 'archived', 'closed', 'done'].includes(lc(s));
  const sum = (xs: Array<{ amount?: number; total?: number }>) =>
    xs.reduce((a, i) => a + Number(i.amount ?? i.total ?? 0), 0);

  const activeJobs = jobs.filter((j) => !done(j.status));
  const startingSoon = jobs.filter(
    (j) => j.start_date && new Date(j.start_date).getTime() > now && new Date(j.start_date).getTime() < now + 7 * 864e5
  );
  const openPacks = packs.filter((p) => !done(p.status));
  const unpaid = invoices.filter((i) => !lc(i.status).includes('paid'));
  const overdue = unpaid.filter((i) => i.due_date && new Date(i.due_date).getTime() < now);
  const liveQuotes = quotes.filter((q) => !['accepted', 'declined', 'rejected', 'expired', 'converted'].includes(lc(q.status)));
  const openVac = vacancies.filter((v) => !lc(v.status).includes('closed'));
  const pendingApps = apps.filter((a) => !['hired', 'rejected'].includes(lc(a.status)));
  const openIncidents = incidents.filter((i) => !['closed', 'resolved'].includes(lc(i.status)));
  const openTasks = tasks.filter((t) => !done(t.status));
  const overdueTasks = openTasks.filter((t) => t.due_date && new Date(t.due_date).getTime() < now);
  const pendingMaterials = materials.filter((m) => !['delivered', 'received', 'complete', 'completed', 'cancelled'].includes(lc(m.status)));
  const pendingExpenses = expenses.filter((e) => ['pending', 'submitted', 'awaiting'].some((s) => lc(e.status).includes(s)));

  const lines = [
    `TEAM: ${employees.length} on the books${employees.length ? ' — ' + employees.slice(0, 8).map((e) => `${e.name} (${e.role})`).join('; ') : ''}.`,
    `JOBS: ${activeJobs.length} active${startingSoon.length ? `, ${startingSoon.length} starting within 7 days` : ''}. Job packs: ${openPacks.length} open.`,
    `MONEY: ${unpaid.length} unpaid invoices £${sum(unpaid).toLocaleString()} (${overdue.length} OVERDUE £${sum(overdue).toLocaleString()}); ${liveQuotes.length} live quotes; ${pendingMaterials.length} material orders pending; ${pendingExpenses.length} expense claims to approve.`,
    `HIRING: ${openVac.length} vacancies open; ${pendingApps.length} applicants awaiting a decision.`,
    `SAFETY & OPS: ${openIncidents.length} open incidents; ${openTasks.length} open tasks (${overdueTasks.length} overdue).`,
    `RESOURCES: ${suppliers.length} suppliers, ${priceBook.length} price-book items.`,
  ];
  return 'LIVE BUSINESS SNAPSHOT (this firm, right now — your full oversight of the hub):\n' + lines.join('\n');
}

// Audit trail — record every write Mate makes (non-fatal if it fails).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function logAudit(admin: any, uid: string, action: string, entity: string, entityId: string | null, detail: Record<string, unknown>): Promise<void> {
  try {
    await admin.from('employer_audit_log').insert({ employer_id: uid, actor_id: uid, action, entity, entity_id: entityId, detail });
  } catch { /* non-fatal */ }
}

// Entities Mate can create — and therefore delete (undo). Maps to table + owner column.
const ENTITY_MAP: Record<string, { table: string; owner: string }> = {
  team: { table: 'employer_employees', owner: 'employer_id' },
  team_member: { table: 'employer_employees', owner: 'employer_id' },
  supplier: { table: 'employer_suppliers', owner: 'employer_id' },
  price_book_item: { table: 'employer_price_book', owner: 'employer_id' },
  price: { table: 'employer_price_book', owner: 'employer_id' },
  job: { table: 'employer_jobs', owner: 'user_id' },
  quote: { table: 'employer_quotes', owner: 'employer_id' },
  invoice: { table: 'employer_invoices', owner: 'employer_id' },
  job_pack: { table: 'employer_job_packs', owner: 'employer_id' },
  vacancy: { table: 'employer_vacancies', owner: 'employer_id' },
  task: { table: 'employer_job_tasks', owner: 'employer_id' },
};

// Execute one tool call and return a short result string for the model.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function runTool(admin: any, uid: string, openAiKey: string, authHeader: string, name: string, argsJson: string): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let args: Record<string, any>;
  try {
    args = JSON.parse(argsJson || '{}');
  } catch {
    return 'Could not parse the tool arguments.';
  }
  // Insert a row, audit-log it, and return its new id.
  const ins = async (table: string, row: Record<string, unknown>, entity: string) => {
    const { data, error } = await admin.from(table).insert(row).select('id').single();
    if (!error && data?.id) await logAudit(admin, uid, 'create', entity, data.id, { name: row.name ?? row.title ?? row.client ?? null });
    return { id: data?.id as string | undefined, error };
  };
  try {
    if (name === 'search_employer_knowledge') {
      const qEmb = await embed(args.query, openAiKey);
      const { data: hits } = await admin.rpc('search_employer_knowledge', { query_embedding: qEmb, query_text: args.query, match_count: 6 });
      return (hits ?? [])
        .map((h: { source: string; topic: string; content: string }) => `[${h.source} — ${h.topic}]\n${h.content}`)
        .join('\n\n---\n\n') || 'No matching knowledge found.';
    } else if (name === 'add_team_member') {
      const { id, error } = await ins('employer_employees', {
        employer_id: uid, status: 'active', name: args.name, role: args.role ?? 'Electrician', team_role: args.team_role ?? 'Operative',
        // pay_type/hourly_rate are NOT NULL with DB defaults — omit when absent so the defaults apply
        ...(args.pay_type != null ? { pay_type: args.pay_type } : {}),
        ...(args.hourly_rate != null ? { hourly_rate: args.hourly_rate } : {}),
        annual_salary: args.annual_salary ?? null,
        email: args.email ?? null, phone: args.phone ?? null, avatar_initials: initials(args.name),
      }, 'team');
      if (error) return `Failed to add ${args.name}: ${error.message}`;
      // Fire the same onboarding side-effects as the manual add: the welcome /
      // login email (so they sign in and link) + seat-sync. Both run as the
      // employer, both non-fatal.
      if (id && args.email) {
        await invokeFn('send-team-welcome', { employeeId: id }, authHeader);
        await invokeFn('manage-employer-seats', {}, authHeader);
      }
      return args.email
        ? `Added ${args.name} to the team (id: ${id}) and emailed ${args.email} their sign-in details — they link to your firm automatically the first time they sign in with that address. Their seat (£9.99/mo) starts when they link.`
        : `Added ${args.name} to the team (id: ${id}). No email given, so send them your team invite code to link — they won't get an automatic sign-in email without one.`;
    } else if (name === 'add_supplier') {
      const { id, error } = await ins('employer_suppliers', {
        employer_id: uid, name: args.name, category: args.category ?? null, contact_name: args.contact_name ?? null,
        phone: args.phone ?? null, email: args.email ?? null, account_number: args.account_number ?? null,
        address: args.address ?? null, delivery_days: args.delivery_days ?? null,
      }, 'supplier');
      return error ? `Failed to add supplier ${args.name}: ${error.message}` : `Added supplier ${args.name} (id: ${id}).`;
    } else if (name === 'add_price_book_item') {
      const buy = args.buy_price ?? 0;
      const sell = args.sell_price ?? 0;
      const markup = buy > 0 && sell > 0 ? Math.round(((sell - buy) / buy) * 100) : null;
      const { id, error } = await ins('employer_price_book', {
        employer_id: uid, name: args.name, category: args.category ?? 'General', buy_price: buy, sell_price: sell, markup,
        unit: args.unit ?? 'each', sku: args.sku ?? null,
      }, 'price_book_item');
      return error ? `Failed to add ${args.name}: ${error.message}` : `Added price-book item: ${args.name} (id: ${id}).`;
    } else if (name === 'create_job') {
      const coords = args.location ? await geocodeJob(args.location) : null;
      const { id, error } = await ins('employer_jobs', {
        user_id: uid, status: 'Active', title: args.title, client: args.client ?? '', location: args.location ?? '',
        value: args.value ?? null, start_date: args.start_date ?? null, description: args.description ?? null,
        client_phone: args.client_phone ?? null, client_email: args.client_email ?? null,
        ...(coords ?? {}),
      }, 'job');
      return error ? `Failed to create job: ${error.message}` : `Created job: ${args.title} (job_id: ${id}).`;
    } else if (name === 'create_quote') {
      const { count } = await admin.from('employer_quotes').select('id', { count: 'exact', head: true }).eq('employer_id', uid);
      const num = `QTE-${String((count ?? 0) + 1).padStart(4, '0')}`;
      const { id, error } = await ins('employer_quotes', {
        employer_id: uid, quote_number: num, client: args.client, status: 'Draft', description: args.description ?? null,
        value: args.value ?? 0, job_title: args.job_title ?? null, valid_until: args.valid_until ?? null,
        client_email: args.client_email ?? null, client_phone: args.client_phone ?? null,
      }, 'quote');
      return error ? `Failed to create quote: ${error.message}` : `Created quote ${num} for ${args.client} (id: ${id}).`;
    } else if (name === 'create_invoice') {
      const { count } = await admin.from('employer_invoices').select('id', { count: 'exact', head: true }).eq('employer_id', uid);
      const num = `INV-${String((count ?? 0) + 1).padStart(4, '0')}`;
      const { id, error } = await ins('employer_invoices', {
        employer_id: uid, invoice_number: num, client: args.client, status: 'Draft', amount: args.amount ?? 0,
        project: args.project ?? null, due_date: args.due_date ?? null, notes: args.notes ?? null, client_email: args.client_email ?? null,
      }, 'invoice');
      return error ? `Failed to create invoice: ${error.message}` : `Created draft invoice ${num} for ${args.client} (id: ${id}).`;
    } else if (name === 'create_job_pack') {
      const { id, error } = await ins('employer_job_packs', {
        employer_id: uid, title: args.title, client: args.client, location: args.location, scope: args.scope ?? null,
        status: 'Draft', start_date: args.start_date ?? null, estimated_value: args.estimated_value ?? null,
      }, 'job_pack');
      return error ? `Failed to create job pack: ${error.message}` : `Created job pack: ${args.title} (id: ${id}).`;
    } else if (name === 'create_vacancy') {
      const { id, error } = await ins('employer_vacancies', {
        employer_id: uid, title: args.title, location: args.location, type: args.type ?? 'Full-time', status: 'Open',
        salary_min: args.salary_min ?? null, salary_max: args.salary_max ?? null, salary_period: args.salary_period ?? 'year',
        description: args.description ?? null,
      }, 'vacancy');
      return error ? `Failed to post vacancy: ${error.message}` : `Posted vacancy: ${args.title} (id: ${id}).`;
    } else if (name === 'delete_record') {
      const m = ENTITY_MAP[String(args.entity ?? '').toLowerCase()];
      if (!m) return `I can't delete a "${args.entity}".`;
      if (!args.id) return 'I need the record id to delete it.';
      const { error } = await admin.from(m.table).delete().eq('id', args.id).eq(m.owner, uid);
      if (error) return `Failed to delete: ${error.message}`;
      await logAudit(admin, uid, 'delete', String(args.entity).toLowerCase(), args.id, { via: 'mate' });
      return `Deleted that ${args.entity}.`;
    } else if (name === 'add_task') {
      const { id, error } = await ins('employer_job_tasks', {
        employer_id: uid, job_id: args.job_id, title: args.title, description: args.description ?? null,
        priority: args.priority ?? null, due_date: args.due_date ?? null, assignee_employee_id: args.assignee_employee_id ?? null,
      }, 'task');
      return error ? `Failed to add task: ${error.message}` : `Added task: ${args.title} (id: ${id}).`;
    } else if (name === 'get_material_prices') {
      const { data: prods } = await admin.from('marketplace_products')
        .select('name, brand, current_price, currency, stock_status')
        .textSearch('search_vector', args.query, { type: 'websearch' }).limit(6);
      return (prods ?? [])
        .map((p: { name: string; brand: string; current_price: number; stock_status: string }) =>
          `${p.name}${p.brand ? ' (' + p.brand + ')' : ''} — £${p.current_price}${p.stock_status ? ' [' + p.stock_status + ']' : ''}`)
        .join('\n') || 'No live prices found for that — estimate it or ask the user.';
    } else if (name === 'list_team') {
      const { data: tm } = await admin.from('employer_employees').select('id, name, role').eq('employer_id', uid);
      return (tm ?? []).map((e: { id: string; name: string; role: string }) => `${e.name} (${e.role}) — id ${e.id}`).join('\n') || 'No team members yet.';
    } else if (name === 'get_team_member') {
      // Worker 360 for Mate — scope to THIS employer so one firm can't read another's people.
      const { data: emp } = await admin.from('employer_employees')
        .select('id, name, role, team_role, status').eq('id', args.employee_id).eq('employer_id', uid).maybeSingle();
      if (!emp) return 'No team member with that id belongs to your firm — call list_team to get a valid id.';
      const { data: ts } = await admin.from('employer_timesheets')
        .select('date, total_hours, status').eq('employee_id', emp.id).order('date', { ascending: false }).limit(10);
      const rows = ts ?? [];
      const pending = rows.filter((t: { status: string }) => (t.status || '').toLowerCase() === 'pending').length;
      const recent = rows
        .map((t: { date: string; total_hours: number | null; status: string }) =>
          `  ${t.date}: ${t.total_hours != null ? t.total_hours + 'h' : '—'} [${t.status || 'pending'}]`)
        .join('\n') || '  (no timesheets logged)';
      const { data: ex } = await admin.from('employer_expense_claims')
        .select('submitted_date, amount, category, status').eq('employee_id', emp.id).order('submitted_date', { ascending: false }).limit(10);
      const exRows = ex ?? [];
      const exPending = exRows.filter((e: { status: string }) => (e.status || '').toLowerCase() === 'pending');
      const exPendingTotal = exPending.reduce((s: number, e: { amount: number | null }) => s + (Number(e.amount) || 0), 0);
      const exRecent = exRows
        .map((e: { submitted_date: string; amount: number | null; category: string; status: string }) =>
          `  ${e.submitted_date}: £${(Number(e.amount) || 0).toFixed(2)} ${e.category || ''} [${e.status || 'pending'}]`)
        .join('\n') || '  (no expenses claimed)';
      const { data: lv } = await admin.from('employee_leave_requests')
        .select('start_date, end_date, leave_type, total_days, status').eq('employee_id', emp.id).order('start_date', { ascending: false }).limit(10);
      const lvRows = lv ?? [];
      const lvPending = lvRows.filter((l: { status: string }) => (l.status || '').toLowerCase() === 'pending').length;
      const lvRecent = lvRows
        .map((l: { start_date: string; end_date: string; leave_type: string; total_days: number | null; status: string }) =>
          `  ${l.start_date}${l.end_date && l.end_date !== l.start_date ? '–' + l.end_date : ''}: ${l.leave_type || 'leave'} ${l.total_days != null ? '(' + l.total_days + 'd)' : ''} [${l.status || 'pending'}]`)
        .join('\n') || '  (no leave requests)';
      // Live on-site presence — clock-in derived (latest location row).
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: loc } = await admin.from('employer_worker_locations')
        .select('status, checked_in_at, last_updated, employer_jobs(title)')
        .eq('employee_id', emp.id).order('last_updated', { ascending: false }).limit(1).maybeSingle();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const locAny = loc as any;
      const presenceLine = locAny
        ? `${locAny.status || 'unknown'}${locAny.employer_jobs?.title ? ' at ' + locAny.employer_jobs.title : ''}`
          + `${locAny.checked_in_at ? ' (since ' + locAny.checked_in_at + ')' : ''}`
        : 'no check-in recorded';
      return `${emp.name} — ${emp.team_role || emp.role || 'Operative'} (status: ${emp.status || 'active'})\n`
        + `On-site now: ${presenceLine}\n`
        + `Timesheets pending approval: ${pending}\n`
        + `Recent timesheets:\n${recent}\n`
        + `Expenses pending approval: ${exPending.length} (£${exPendingTotal.toFixed(2)})\n`
        + `Recent expenses:\n${exRecent}\n`
        + `Leave pending approval: ${lvPending}\n`
        + `Recent leave:\n${lvRecent}`;
    } else if (name === 'search_bs7671') {
      const { data: regs } = await admin.rpc('match_bs7671_for_text', { q_text: args.query, doc_type: null, max_results: 5 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (regs ?? [])
        .map((r: any) =>
          `Reg ${r.reg_number}${r.reg_title ? ' — ' + r.reg_title : ''}${r.is_a4_change ? ' [A4:2026 change]' : ''}\n${r.content}`)
        .join('\n\n---\n\n') || 'No BS 7671 regulation found for that — say so rather than guess.';
    } else if (name === 'get_task_guidance') {
      const { data: rows } = await admin.rpc('search_practical_work_fast', { query_text: args.query, match_count: 4 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (rows ?? [])
        .map((r: any) => {
          const tools = Array.isArray(r.tools_required) ? r.tools_required.slice(0, 5).join(', ') : '';
          const steps = Array.isArray(r.test_procedures)
            ? r.test_procedures.map((t: { task?: string }) => t.task).filter(Boolean).slice(0, 4).join('; ')
            : '';
          return `• ${r.primary_topic}${tools ? `\n  tools: ${tools}` : ''}${steps ? `\n  steps: ${steps}` : ''}`;
        })
        .join('\n') || 'No task guidance found.';
    }
    return 'Unknown tool.';
  } catch (e) {
    return 'Tool error: ' + (e instanceof Error ? e.message : 'unknown');
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAiKey = Deno.env.get('OPENAI_API_KEY')!;

    const authHeader = req.headers.get('Authorization') ?? '';
    const caller = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
    const { data: { user }, error: authErr } = await caller.auth.getUser();
    if (authErr || !user) return json({ error: 'Not authenticated' }, 401);

    const { messages = [], page_context = null } = await req.json();
    const admin = createClient(supabaseUrl, serviceKey);
    const snapshot = await getSnapshot(admin, user.id);
    const { data: rp } = await admin
      .from('company_profiles')
      .select('day_rate, hourly_rate, markup, overhead_percentage, profit_margin')
      .eq('user_id', user.id)
      .maybeSingle();
    const rates = rp
      ? `\n\nFIRM RATES (use for labour & estimates): day rate £${rp.day_rate ?? '?'}, hourly £${rp.hourly_rate ?? '?'}, materials markup ${rp.markup ?? '?'}%, overhead ${rp.overhead_percentage ?? '?'}%, profit ${rp.profit_margin ?? '?'}%.`
      : '\n\nFIRM RATES: not set yet — ask the user their day rate / markup, or state your assumption when estimating.';
    const system =
      SOUL + '\n\n' + snapshot + rates + (page_context ? `\n\nThe user is currently viewing: ${page_context}.` : '');

    const convo: Array<Record<string, unknown>> = [
      { role: 'system', content: system },
      ...messages.map((m: { role: string; content: string }) => ({ role: m.role, content: m.content })),
    ];
    const oaHeaders = { Authorization: `Bearer ${openAiKey}`, 'Content-Type': 'application/json' };

    // --- Multi-round agentic loop: stream the answer live, run tools across
    // rounds until the model stops calling them (so it can chain create_job ->
    // add_task -> create_quote, etc.). ---
    const enc = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for (let round = 0; round < 8; round++) {
            const resp = await fetch(OPENAI_CHAT, {
              method: 'POST',
              headers: oaHeaders,
              body: JSON.stringify({ model: CHAT_MODEL, messages: convo, tools: TOOLS, tool_choice: 'auto', stream: true, max_completion_tokens: 1400 }),
            });
            if (!resp.ok || !resp.body) {
              controller.enqueue(enc.encode('Sorry — I hit a problem reaching the model. Try again.'));
              break;
            }
            const reader = resp.body.getReader();
            const decoder = new TextDecoder();
            let buf = '';
            // Accumulate streamed tool-call fragments by index.
            const acc: Record<number, { id: string; name: string; arguments: string }> = {};
            let contentAcc = '';
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              buf += decoder.decode(value, { stream: true });
              const parts = buf.split('\n');
              buf = parts.pop() ?? '';
              for (const line of parts) {
                const l = line.trim();
                if (!l.startsWith('data:')) continue;
                const d = l.slice(5).trim();
                if (d === '[DONE]') continue;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let j: any;
                try { j = JSON.parse(d); } catch { continue; }
                const delta = j.choices?.[0]?.delta;
                if (delta?.content) { contentAcc += delta.content; controller.enqueue(enc.encode(delta.content)); }
                if (delta?.tool_calls) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  for (const tc of delta.tool_calls as any[]) {
                    const i = tc.index ?? 0;
                    if (!acc[i]) acc[i] = { id: '', name: '', arguments: '' };
                    if (tc.id) acc[i].id = tc.id;
                    if (tc.function?.name) acc[i].name = tc.function.name;
                    if (tc.function?.arguments) acc[i].arguments += tc.function.arguments;
                  }
                }
              }
            }
            const toolCalls = Object.values(acc);
            if (!toolCalls.length) break; // model produced its final answer (already streamed)
            convo.push({
              role: 'assistant',
              content: contentAcc || null,
              tool_calls: toolCalls.map((t) => ({ id: t.id, type: 'function', function: { name: t.name, arguments: t.arguments } })),
            });
            for (const t of toolCalls) {
              const result = await runTool(admin, user.id, openAiKey, authHeader, t.name, t.arguments);
              convo.push({ role: 'tool', tool_call_id: t.id, content: result });
            }
          }
        } catch {
          try { controller.enqueue(enc.encode('\n\n[Mate hit an error completing that — try again.]')); } catch { /* ignore */ }
        }
        controller.close();
      },
    });
    return new Response(stream, { headers: streamHeaders });
  } catch (e) {
    console.error('employer-ai-assistant error:', e);
    return json({ error: e instanceof Error ? e.message : 'unknown' }, 500);
  }
});
