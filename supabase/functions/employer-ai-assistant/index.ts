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

VOICE: a sharp, experienced operations & commercial director. Direct, trade-aware, UK English (colour, organise, labour, metre). No emoji, no waffle — but give real depth when advising. Lead with the recommendation, then the why, the grounded facts WITH their source, the practical steps, and the trade-offs. Match length to the weight of the question: a quick fact gets a tight answer; a hiring, bidding or cashflow decision gets a proper, structured one (headed points are fine).

GROUNDING — non-negotiable: for ANY factual or advisory question (costing, estimating, tendering, contracts, retentions, payment terms, CIS, VAT, employment law, apprenticeships, project management), you MUST call search_employer_knowledge first and base your answer on what it returns, citing the source inline (e.g. "per the JIB National Working Rules", "under the Construction Act 1996", "RICS NRM1", "ACAS"). Never invent rates, figures, legal positions or rules from memory. If the knowledge base doesn't cover it, say so plainly rather than guess.

THE FIRM — you have OVERSIGHT of the whole business. Each turn you receive a live snapshot across the entire hub: team, jobs and job packs, money (invoices, overdue, quotes, material orders, expenses to approve), hiring (vacancies, applicants), safety & ops (open incidents, open/overdue tasks), and resources (suppliers, price book). Use it: answer about any corner of the firm, make advice specific to their real numbers, and join the dots across areas (e.g. an overdue invoice that threatens cashflow on a job starting next week; a compliance gap on a worker assigned to a live job).

ACTIONS — you can SET UP and RUN the firm directly. Tools: add team members, suppliers, price-book items and jobs; create quotes, invoices, job packs and vacancies. When asked to do something, DO it, then report exactly what you created (e.g. "Raised invoice INV-0003 to Dave for £450"). For a large batch, confirm the count first. You only ever INSERT — never overwrite or delete; the user edits in the hub. Setting up from scratch, work in order: team → suppliers → price book → jobs → quotes/invoices. For anything you don't yet have a tool for (producing PDFs, hiring an applicant), give the precise manual steps.

BE PROACTIVE — never just execute silently. After any action, add a short, business-aware observation: what it means for the firm and the obvious next step, drawn from your live oversight (e.g. "Added CEF — but you've still no price book, so you can't cost a job properly yet; want me to add your common rates?"; "Raised that invoice — your overdue total is now £X across N invoices; I'd chase the oldest two first"). Surface risks and opportunities unprompted: cashflow exposure, a compliance gap, an unfilled vacancy on a job starting soon. You are a partner who thinks, not a form-filler.

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

function chunkStream(text: string): ReadableStream {
  const enc = new TextEncoder();
  return new ReadableStream({
    start(c) {
      for (let i = 0; i < text.length; i += 40) c.enqueue(enc.encode(text.slice(i, i + 40)));
      c.close();
    },
  });
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
    const system = SOUL + '\n\n' + snapshot + (page_context ? `\n\nThe user is currently viewing: ${page_context}.` : '');

    const convo: Array<Record<string, unknown>> = [
      { role: 'system', content: system },
      ...messages.map((m: { role: string; content: string }) => ({ role: m.role, content: m.content })),
    ];
    const oaHeaders = { Authorization: `Bearer ${openAiKey}`, 'Content-Type': 'application/json' };

    // --- Phase 1: tool resolution (non-streamed) ---
    const first = await fetch(OPENAI_CHAT, {
      method: 'POST',
      headers: oaHeaders,
      body: JSON.stringify({ model: CHAT_MODEL, messages: convo, tools: TOOLS, tool_choice: 'auto', max_completion_tokens: 1400 }),
    });
    if (!first.ok) return json({ error: 'llm_failed', detail: await first.text() }, 502);
    const fmsg = (await first.json()).choices?.[0]?.message;
    if (!fmsg) return json({ error: 'no_response' }, 502);

    const calls = fmsg.tool_calls ?? [];
    if (!calls.length) {
      // Answered directly — stream the already-complete text in chunks.
      return new Response(chunkStream(fmsg.content ?? ''), { headers: streamHeaders });
    }

    convo.push(fmsg);
    for (const call of calls) {
      let result = '';
      try {
        const args = JSON.parse(call.function.arguments || '{}');
        if (call.function.name === 'search_employer_knowledge') {
          const qEmb = await embed(args.query, openAiKey);
          const { data: hits } = await admin.rpc('search_employer_knowledge', {
            query_embedding: qEmb,
            query_text: args.query,
            match_count: 6,
          });
          result =
            (hits ?? [])
              .map((h: { source: string; topic: string; content: string }) => `[${h.source} — ${h.topic}]\n${h.content}`)
              .join('\n\n---\n\n') || 'No matching knowledge found.';
        } else if (call.function.name === 'add_team_member') {
          const { error } = await admin.from('employer_employees').insert({
            employer_id: user.id, status: 'active', name: args.name,
            role: args.role ?? 'Electrician', team_role: args.team_role ?? 'Operative',
            pay_type: args.pay_type ?? null, hourly_rate: args.hourly_rate ?? null,
            annual_salary: args.annual_salary ?? null, email: args.email ?? null,
            phone: args.phone ?? null, avatar_initials: initials(args.name),
          });
          result = error ? `Failed to add ${args.name}: ${error.message}` : `Added ${args.name} to the team.`;
        } else if (call.function.name === 'add_supplier') {
          const { error } = await admin.from('employer_suppliers').insert({
            employer_id: user.id, name: args.name, category: args.category ?? null,
            contact_name: args.contact_name ?? null, phone: args.phone ?? null, email: args.email ?? null,
            account_number: args.account_number ?? null, address: args.address ?? null,
            delivery_days: args.delivery_days ?? null,
          });
          result = error ? `Failed to add supplier ${args.name}: ${error.message}` : `Added supplier ${args.name}.`;
        } else if (call.function.name === 'add_price_book_item') {
          const buy = args.buy_price ?? null;
          const sell = args.sell_price ?? null;
          const markup = buy && sell ? Math.round(((sell - buy) / buy) * 100) : null;
          const { error } = await admin.from('employer_price_book').insert({
            employer_id: user.id, name: args.name, category: args.category ?? 'General',
            buy_price: buy, sell_price: sell, markup, unit: args.unit ?? 'each', sku: args.sku ?? null,
          });
          result = error ? `Failed to add ${args.name}: ${error.message}` : `Added price-book item: ${args.name}.`;
        } else if (call.function.name === 'create_job') {
          const { error } = await admin.from('employer_jobs').insert({
            user_id: user.id, status: 'active', title: args.title, client: args.client ?? '',
            location: args.location ?? '', value: args.value ?? null, start_date: args.start_date ?? null,
            description: args.description ?? null, client_phone: args.client_phone ?? null,
            client_email: args.client_email ?? null,
          });
          result = error ? `Failed to create job: ${error.message}` : `Created job: ${args.title}.`;
        } else if (call.function.name === 'create_quote') {
          const { count } = await admin.from('employer_quotes').select('id', { count: 'exact', head: true }).eq('employer_id', user.id);
          const num = `QTE-${String((count ?? 0) + 1).padStart(4, '0')}`;
          const { error } = await admin.from('employer_quotes').insert({
            employer_id: user.id, quote_number: num, client: args.client, status: 'Draft',
            description: args.description ?? null, value: args.value ?? null, job_title: args.job_title ?? null,
            valid_until: args.valid_until ?? null, client_email: args.client_email ?? null, client_phone: args.client_phone ?? null,
          });
          result = error ? `Failed to create quote: ${error.message}` : `Created quote ${num} for ${args.client}.`;
        } else if (call.function.name === 'create_invoice') {
          const { count } = await admin.from('employer_invoices').select('id', { count: 'exact', head: true }).eq('employer_id', user.id);
          const num = `INV-${String((count ?? 0) + 1).padStart(4, '0')}`;
          const { error } = await admin.from('employer_invoices').insert({
            employer_id: user.id, invoice_number: num, client: args.client, status: 'Draft',
            amount: args.amount ?? null, project: args.project ?? null, due_date: args.due_date ?? null,
            notes: args.notes ?? null, client_email: args.client_email ?? null,
          });
          result = error ? `Failed to create invoice: ${error.message}` : `Created draft invoice ${num} for ${args.client}.`;
        } else if (call.function.name === 'create_job_pack') {
          const { error } = await admin.from('employer_job_packs').insert({
            employer_id: user.id, title: args.title, client: args.client, location: args.location,
            scope: args.scope ?? null, status: 'draft', start_date: args.start_date ?? null,
            estimated_value: args.estimated_value ?? null,
          });
          result = error ? `Failed to create job pack: ${error.message}` : `Created job pack: ${args.title}.`;
        } else if (call.function.name === 'create_vacancy') {
          const { error } = await admin.from('employer_vacancies').insert({
            employer_id: user.id, title: args.title, location: args.location, type: args.type ?? 'Full-time',
            status: 'open', salary_min: args.salary_min ?? null, salary_max: args.salary_max ?? null,
            salary_period: args.salary_period ?? 'year', description: args.description ?? null,
          });
          result = error ? `Failed to post vacancy: ${error.message}` : `Posted vacancy: ${args.title}.`;
        } else {
          result = 'Unknown tool.';
        }
      } catch (e) {
        result = 'Tool error: ' + (e instanceof Error ? e.message : 'unknown');
      }
      convo.push({ role: 'tool', tool_call_id: call.id, content: result });
    }

    // --- Phase 2: stream the grounded answer (no further tools) ---
    const streamResp = await fetch(OPENAI_CHAT, {
      method: 'POST',
      headers: oaHeaders,
      body: JSON.stringify({ model: CHAT_MODEL, messages: convo, stream: true, max_completion_tokens: 1400 }),
    });
    if (!streamResp.ok || !streamResp.body) {
      // Fallback: non-streamed final answer, chunked out, so the user always gets a reply.
      const fb = await fetch(OPENAI_CHAT, {
        method: 'POST',
        headers: oaHeaders,
        body: JSON.stringify({ model: CHAT_MODEL, messages: convo, max_completion_tokens: 1400 }),
      });
      const fbContent = (await fb.json())?.choices?.[0]?.message?.content ?? 'Sorry — I couldn\'t generate that. Try again.';
      return new Response(chunkStream(fbContent), { headers: streamHeaders });
    }

    const enc = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = streamResp.body!.getReader();
        const decoder = new TextDecoder();
        let buf = '';
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buf += decoder.decode(value, { stream: true });
            const lines = buf.split('\n');
            buf = lines.pop() ?? '';
            for (const line of lines) {
              const l = line.trim();
              if (!l.startsWith('data:')) continue;
              const d = l.slice(5).trim();
              if (d === '[DONE]') { controller.close(); return; }
              try {
                const delta = JSON.parse(d).choices?.[0]?.delta?.content;
                if (delta) controller.enqueue(enc.encode(delta));
              } catch { /* skip keep-alive / partial */ }
            }
          }
        } catch { /* upstream closed */ }
        controller.close();
      },
    });
    return new Response(stream, { headers: streamHeaders });
  } catch (e) {
    console.error('employer-ai-assistant error:', e);
    return json({ error: e instanceof Error ? e.message : 'unknown' }, 500);
  }
});
