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

import { withSentry } from '../_shared/sentry.ts';
import { parsePageContext, buildPageGuide, buildPageState, RECORD_KINDS, type RecordKind } from './page-knowledge.ts';
import { fetchPageRecord, fetchPendingApprovals } from './page-records.ts';
import { ACTION_TOOLS, ACTION_NAMES, previewAction, executeAction, undoAction, claimNonce, type ActionCtx, type ConfirmCard, type ResultCard } from './mate-actions.ts';
import { verifyAction, verifyErrorText } from './mate-token.ts';

/** Cards travel inside the text stream between two RS characters; the client strips them. */
const CARD_MARK = '\u001e';
const cardChunk = (c: ConfirmCard | ResultCard) => `${CARD_MARK}${JSON.stringify(c)}${CARD_MARK}`;
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

ACTIONS — you can SET UP and RUN the firm directly. Tools: add team members, suppliers, price-book items and jobs; create quotes, invoices, job packs and vacancies; raise purchase orders (drafts — the owner sends them). When asked to do something, DO it, then report exactly what you created (e.g. "Raised invoice INV-2026-003 to Dave for £450"). When asked to order materials or "raise a PO" for a job, use create_purchase_order — price items from the firm price book (get_material_prices for anything not in it), link the job so the cost commits to it, and tell the owner to review and send it.

ONBOARDING PEOPLE — when you add a team member, get their EMAIL and their PAY: salaried roles (QS, Project Manager, Supervisor) take an annual_salary, hands-on roles (Operative, Apprentice) an hourly_rate — ask if it's missing rather than assume. If you have an email, adding them automatically emails them their sign-in details: they open the invite (or sign in with that email) and tap Join — nobody is added to a firm without agreeing, and there's no password handover from you. Each linked team member is a £9.99/month seat on the firm's subscription, charged only once they actually link. Tell the owner what you did in those terms, and if there's no email, tell them to share the team invite code instead. For a large batch, confirm the count first. You only ever INSERT — never overwrite or delete; the user edits in the hub. Setting up from scratch, work in order: team → suppliers → price book → jobs → quotes/invoices. For anything you don't yet have a tool for (producing PDFs, hiring an applicant), give the precise manual steps.

BE PROACTIVE — never just execute silently. After any action, add a short, business-aware observation: what it means for the firm and the obvious next step, drawn from your live oversight (e.g. "Added CEF — but you've still no price book, so you can't cost a job properly yet; want me to add your common rates?"; "Raised that invoice — your overdue total is now £X across N invoices; I'd chase the oldest two first"). Surface risks and opportunities unprompted: cashflow exposure, a compliance gap, an unfilled vacancy on a job starting soon. You are a partner who thinks, not a form-filler.

ESTIMATING & PLANNING — when asked to plan, quote, price or "set up" a job, orchestrate the WHOLE thing from a one-line brief, in the right register for the sector: (1) break the work into the real trade tasks (a domestic rewire = first fix, plaster liaison, second fix, test, certify; a commercial/industrial job = containment install, cable pulling/glanding, board/sub-main termination, motor/plant connections, testing, commissioning, certification) — use get_task_guidance to make the breakdown concrete (steps, tools); (2) check search_bs7671 for any reg that drives the spec (e.g. AFDDs/RCBOs now required, RCD protection, special-location requirements) — it changes what you must fit and therefore the cost; (3) cost LABOUR using THE FIRM'S RATES below × your honest hour/day estimate per task; (4) price MATERIALS by calling get_material_prices for the key items — these are LIVE supplier prices refreshed daily, so USE them, never guess a material price; (5) add the firm's materials markup + overhead + profit; (6) give a realistic timeline (labour hours → working days). Present a clear breakdown — tasks, materials (with the live prices + supplier), labour, and the total — and ground the method via search_employer_knowledge (NRM1, daywork, markup) where it sharpens it. Then offer to build it for real: create_job, add_task for each task, assign people from list_team, and create_quote. If the firm's rates aren't set, ask once or state your assumption.

CONFIRM & UNDO — anything YOU suggest or offer ("I can raise that for you") waits for a clear yes before you write it. For anything financial or hard to reverse (raising an invoice, posting a public vacancy) or any large batch, briefly propose it and wait for a "yes" before doing it — UNLESS the user already clearly told you to. Quick low-risk setup (adding a supplier, a price-book line) just do. Every action is logged. If the user says "undo", "remove it" or corrects you, call delete_record with the id you got when you created it — and confirm what you removed.

OFFICE JOBS YOU CAN DO (confirmed actions): approve_timesheets, send_back_timesheet, decide_leave, decide_expense, mark_expenses_paid (owner or admin only), chase_team_invite, book_person_on_job, send_team_message and chase_signature. These never run straight away: calling one puts a confirmation card on the user's screen with the exact changes, and only their Confirm (or a yes to the card) does it. So: when the page or the question fits, offer the action in one line ("Dan has 3 clean entries. Want me to approve them?"); when they say yes or ask for it directly, call the tool; then tell them to check the card and tap Confirm. NEVER say a confirmed action is done until you see "[Done: ...]" in the conversation. Get ids from get_pending_approvals, get_page_record or the open records. Sending back a timesheet, declining leave and rejecting an expense need the user's own reason: ask, never invent one. Never put a flagged timesheet in include_flagged_ids unless the user named that entry. If a tool says "Not offered", explain why in plain words.

SAFETY — you can READ the firm's safety position (read-only; Site Safety owns the records and you never change them): get_safety_overview for the whole picture, list_safety_incidents for open reports and RIDDOR deadlines ("any incidents this week" = since_days 7), who_has_not_signed for job packs and RAMS sign-off by job or site ("who hasn't signed the RAMS for Orchard Close"), list_overdue_safety_actions, and list_expiring_tickets. Call them whenever safety, RIDDOR, sign-offs, RAMS, briefings or tickets come up, and before advising that someone can go to site. Lead with anything that has a legal clock: an unreported RIDDOR incident and its HSE deadline comes first. Name people and dates from the tool result; never guess who has or hasn't signed. Point to where it is fixed in the hub (Incidents, Job Packs, RAMS, Credentials).

PAGE AWARENESS: you are told which hub page the user is on, its tab, what is on screen and any record they have open. Read "this", "here" and "these" as that page. Answer "how do I..." with the exact steps for that page. get_pending_approvals lists timesheets, expenses and leave waiting for approval (clean vs flagged), and get_page_record reads a job, worker, client, quote, invoice (with its accounting sync state), lead, incident, expense, signature request or thread by id. You can approve, decide, book, message and chase through the confirmed actions above; you cannot send quotes or invoices, or sync to accounting: give the taps for those.

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
          job: {
            type: 'string',
            description:
              "Existing job title to LINK the quote to (feeds the job's money view). Use when the quote belongs to a job you created or found.",
          },
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
          job: {
            type: 'string',
            description:
              "Existing job title to LINK the invoice to (feeds the job's money view and P&L).",
          },
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
      name: 'create_purchase_order',
      description:
        'Raise a DRAFT purchase order to a supplier for materials, optionally against a job (so its cost is committed to that job). A PO number is generated. Prices are BUY/cost prices. Does NOT send it — the owner reviews and sends. Use the firm price book for costs where you can.',
      parameters: {
        type: 'object',
        properties: {
          supplier: { type: 'string', description: 'Supplier name — must already exist in the firm (add it first if not).' },
          job: { type: 'string', description: 'Optional job title to link the PO to (commits the cost to that job).' },
          items: {
            type: 'array',
            description: 'Line items to order.',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                qty: { type: 'number' },
                unit_cost: { type: 'number', description: 'BUY/cost price per unit in GBP.' },
                unit: { type: 'string' },
              },
              required: ['name', 'qty', 'unit_cost'],
            },
          },
          notes: { type: 'string' },
        },
        required: ['supplier', 'items'],
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
          id: { type: 'string', description: 'The id you got when you created it, or its number/name (e.g. quote "2026/004", invoice number, supplier name).' },
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
  {
    type: 'function',
    function: {
      name: 'get_safety_overview',
      description:
        "Read-only. The firm's safety position right now: open incidents (unopened ones, unreported RIDDOR and the HSE deadline), overdue safety actions, job packs with signatures missing, RAMS awaiting sign-off, and team tickets expired or expiring in 30 days. Use for 'anything on safety I need to know?', a morning check, or before saying a crew is good to go.",
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'list_safety_incidents',
      description:
        "Read-only. Open safety reports (incidents, near misses), newest first, with severity, the job, whether anyone has opened it, and any RIDDOR report still owed with its HSE deadline. since_days narrows to recent reports ('this week' = 7). search narrows to a job, site or title.",
      parameters: {
        type: 'object',
        properties: {
          since_days: { type: 'number', description: 'Only reports from the last N days.' },
          search: { type: 'string', description: 'Job, site or title to match, e.g. "Orchard Close".' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'who_has_not_signed',
      description:
        "Read-only. Job packs sent to the crew that are still missing signatures, with the names of who has NOT signed, plus RAMS awaiting sign-off. search narrows to a job, site, client or title, e.g. 'who hasn't signed the RAMS for Orchard Close' → search 'Orchard Close'.",
      parameters: {
        type: 'object',
        properties: { search: { type: 'string', description: 'Job, site, client or pack title to match.' } },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'list_overdue_safety_actions',
      description:
        'Read-only. Safety fixes promised after an incident or site inspection that are past their due date, with who owns each one.',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'list_expiring_tickets',
      description:
        "Read-only. Team credentials (ECS/CSCS cards, IPAF, PASMA, first aid, 18th Edition and similar) that have expired or expire within the window, with whose they are.",
      parameters: {
        type: 'object',
        properties: { days: { type: 'number', description: 'Window in days, default 30, max 365.' } },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_pending_approvals',
      description:
        "Read-only. Everything waiting for approval across the firm, by person: timesheet entries (with how many are clean vs flagged and why), expense claims and leave requests. Use for 'who has entries waiting', 'can I approve the week', 'what's pending'. Gives the ids the confirmed actions need (approve_timesheets, decide_leave, decide_expense).",
      parameters: {
        type: 'object',
        properties: {
          kind: { type: 'string', enum: ['all', 'timesheets', 'expenses', 'leave'], description: 'Default all.' },
          person: { type: 'string', description: 'Optional worker name to narrow to, e.g. "Dan".' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_page_record',
      description:
        'Read-only. Look up one record by id: a job, team member, client, quote, invoice (including its accounting sync state), lead, incident, expense, signature request or message thread. Use the ids under "Open records" in the page context, or ids from other tool results.',
      parameters: {
        type: 'object',
        properties: {
          kind: { type: 'string', enum: ['job', 'member', 'client', 'quote', 'invoice', 'lead', 'incident', 'expense', 'request', 'thread'] },
          id: { type: 'string' },
        },
        required: ['kind', 'id'],
      },
    },
  },
  ...ACTION_TOOLS,
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
async function getSnapshot(admin: any, uid: string, showMoney = true): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safe = (b: any): Promise<any[]> => b.then((r: { data: unknown }) => (Array.isArray(r?.data) ? r.data : []));
  const lc = (s: unknown) => String(s ?? '').toLowerCase();
  const now = Date.now();

  // employer_expense_claims has no employer_id column — it links via employee_id,
  // so resolve the firm's employee ids first, then filter expenses by them.
  const employees = await safe(admin.from('employer_employees').select('id, name, role, status').eq('employer_id', uid));
  const employeeIds = employees.map((e) => e.id).filter(Boolean);

  const [jobs, packs, invoices, quotes, vacancies, incidents, tasks, materials, expenses, suppliers, priceBook] =
    await Promise.all([
      safe(admin.from('employer_jobs').select('title, status, start_date').eq('user_id', uid)),
      safe(admin.from('employer_job_packs').select('status').eq('employer_id', uid)),
      // Quotes and invoices live in the shared `quotes` table (employer_quotes /
      // employer_invoices are retired, 6 Oct). Shaped to what the summary reads.
      safe(admin.from('quotes').select('total, invoice_status, invoice_due_date').eq('user_id', uid).eq('invoice_raised', true).is('deleted_at', null))
        // deno-lint-ignore no-explicit-any
        .then((rows: any[]) => rows.map((r) => ({ amount: Number(r.total ?? 0), status: String(r.invoice_status ?? 'draft'), due_date: (r.invoice_due_date as string | null) ?? null }))),
      safe(admin.from('quotes').select('status, acceptance_status').eq('user_id', uid).eq('invoice_raised', false).is('deleted_at', null))
        // deno-lint-ignore no-explicit-any
        .then((rows: any[]) => rows.map((r) => ({ status: String(r.acceptance_status === 'accepted' ? 'accepted' : r.acceptance_status === 'rejected' ? 'rejected' : r.status ?? 'draft') }))),
      safe(admin.from('employer_vacancies').select('id, title, status').eq('employer_id', uid)),
      safe(admin.from('employer_incidents').select('severity, status').eq('employer_id', uid)),
      safe(admin.from('employer_job_tasks').select('status, due_date').eq('employer_id', uid)),
      safe(admin.from('employer_material_orders').select('total, status').eq('employer_id', uid)),
      employeeIds.length
        ? safe(admin.from('employer_expense_claims').select('amount, status').in('employee_id', employeeIds))
        : Promise.resolve([]),
      safe(admin.from('employer_suppliers').select('id').eq('employer_id', uid)),
      // The firm price book IS the owner's Electrical Hub materials_lists (ELE-1991).
      safe(admin.from('materials_lists').select('items').eq('user_id', uid))
        // deno-lint-ignore no-explicit-any
        .then((rows: any[]) => rows.flatMap((r) => (Array.isArray(r.items) ? r.items : []))),
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
  // Drafts aren't owed money — counting them as unpaid/OVERDUE misleads Mate's advice.
  const unpaid = invoices.filter((i) => !lc(i.status).includes('paid') && lc(i.status) !== 'draft');
  const overdue = unpaid.filter((i) => i.due_date && new Date(i.due_date).getTime() < now);
  const draftInvoices = invoices.filter((i) => lc(i.status) === 'draft');
  const liveQuotes = quotes.filter((q) => !['accepted', 'declined', 'rejected', 'expired', 'converted'].includes(lc(q.status)));
  const openVac = vacancies.filter((v) => !lc(v.status).includes('closed'));
  const pendingApps = apps.filter((a) => !['hired', 'rejected'].includes(lc(a.status)));
  const openIncidents = incidents.filter((i) => !['closed', 'resolved'].includes(lc(i.status)));
  const openTasks = tasks.filter((t) => !done(t.status));
  const overdueTasks = openTasks.filter((t) => t.due_date && new Date(t.due_date).getTime() < now);
  const pendingMaterials = materials.filter((m) => !['delivered', 'received', 'complete', 'completed', 'cancelled'].includes(lc(m.status)));
  const pendingExpenses = expenses.filter((e) => ['pending', 'submitted', 'awaiting'].some((s) => lc(e.status).includes(s)));

  const lines = [
    `TEAM: ${employees.filter((e) => lc(e.status ?? 'active') !== 'archived').length} active${employees.length ? ' — ' + employees.filter((e) => lc(e.status ?? 'active') !== 'archived').slice(0, 8).map((e) => `${e.name} (${e.role})`).join('; ') : ''}.`,
    `JOBS: ${activeJobs.length} active${startingSoon.length ? `, ${startingSoon.length} starting within 7 days` : ''}. Job packs: ${openPacks.length} open.`,
    showMoney ? `MONEY: ${unpaid.length} unpaid invoices £${sum(unpaid).toLocaleString()} (${overdue.length} OVERDUE £${sum(overdue).toLocaleString()})${draftInvoices.length ? `; ${draftInvoices.length} draft invoices not yet sent` : ''}; ${liveQuotes.length} live quotes; ${pendingMaterials.length} material orders pending; ${pendingExpenses.length} expense claims to approve.` : `MONEY: not shown. This person does not see the firm's money (invoice, quote, profit or pay figures); ${pendingExpenses.length} expense claims are waiting for approval.`,
    `HIRING: ${openVac.length} vacancies open; ${pendingApps.length} applicants awaiting a decision.`,
    `SAFETY & OPS: ${openIncidents.length} open incidents; ${openTasks.length} open tasks (${overdueTasks.length} overdue).`,
    `RESOURCES: ${suppliers.length} suppliers, ${priceBook.length} price-book items.`,
  ];
  return 'LIVE BUSINESS SNAPSHOT (this firm, right now — your full oversight of the hub):\n' + lines.join('\n');
}

// ── Safety (read-only, ELE-1939) ───────────────────────────────────────────
interface SafetyBrief {
  today: string;
  search: string | null;
  incidents: {
    open: number;
    unseen: number;
    riddor_outstanding: number;
    items: Array<{
      title: string; severity: string | null; status: string | null; type: string | null;
      job: string | null; location: string | null; reported: string; opened: boolean;
      riddor: boolean; riddor_category: string | null; riddor_due: string | null;
    }>;
  };
  actions: { open: number; overdue: number; items: Array<{ action: string | null; source: string | null; owner: string | null; due: string }> };
  packs: {
    unsigned: number;
    signatures_missing: number;
    items: Array<{ title: string; job: string | null; location: string | null; sent: string; signed: number; not_signed: string[] }>;
  };
  rams: { awaiting_signoff: number; items: Array<{ project: string | null; location: string | null; status: string; date: string | null }> };
  tickets: { window_days: number; expiring: number; expired: number; items: Array<{ name: string; ticket: string; expires: string; expired: boolean }> };
}

function formatSafety(tool: string, b: SafetyBrief): string {
  const scope = b.search ? ` matching "${b.search}"` : '';
  const inc = () => {
    const i = b.incidents;
    if (!i.items.length) return `INCIDENTS${scope}: none open.`;
    const rows = i.items.map((x) =>
      `- ${x.title}${x.severity ? ` [${x.severity}]` : ''}${x.job ? ` on ${x.job}` : x.location ? ` at ${x.location}` : ''}, reported ${x.reported}` +
      `${x.opened ? '' : ', NOT YET OPENED'}` +
      `${x.riddor ? `, RIDDOR NOT REPORTED (${x.riddor_category ?? 'reportable'})${x.riddor_due ? `, HSE deadline ${x.riddor_due}` : ', report on diagnosis'}` : ''}`);
    return `INCIDENTS${scope}: ${i.open} open, ${i.unseen} not opened, ${i.riddor_outstanding} RIDDOR still to report.\n${rows.join('\n')}`;
  };
  const acts = () => {
    const a = b.actions;
    if (!a.overdue) return `SAFETY ACTIONS: ${a.open} open, none overdue.`;
    return `SAFETY ACTIONS: ${a.overdue} overdue of ${a.open} open.\n` +
      a.items.map((x) => `- ${x.action ?? 'Action'} (from ${x.source ?? 'a report'})${x.owner ? `, owner ${x.owner}` : ', no owner'}, due ${x.due}`).join('\n');
  };
  const packs = () => {
    const p = b.packs;
    const head = p.unsigned
      ? `JOB PACKS${scope}: ${p.unsigned} sent with ${p.signatures_missing} signatures missing.\n` +
        p.items.map((x) => `- ${x.title}${x.job && x.job !== x.title ? ` (${x.job})` : ''}${x.location ? `, ${x.location}` : ''}: sent ${x.sent}, ${x.signed} signed; NOT signed: ${x.not_signed.join(', ') || 'nobody'}`).join('\n')
      : `JOB PACKS${scope}: every pack sent to the crew is signed.`;
    const r = b.rams;
    const rams = r.awaiting_signoff
      ? `RAMS${scope} awaiting sign-off: ${r.awaiting_signoff}.\n` +
        r.items.map((x) => `- ${x.project ?? 'Untitled'}${x.location ? `, ${x.location}` : ''} (${x.status}${x.date ? `, ${x.date}` : ''})`).join('\n')
      : `RAMS${scope}: none awaiting sign-off.`;
    return `${head}\n${rams}`;
  };
  const tickets = () => {
    const t = b.tickets;
    if (!t.expiring) return `TICKETS: none expired or expiring in ${t.window_days} days.`;
    return `TICKETS: ${t.expiring} expired or expiring in ${t.window_days} days (${t.expired} already expired).\n` +
      t.items.map((x) => `- ${x.name}: ${x.ticket} ${x.expired ? 'EXPIRED' : 'expires'} ${x.expires}`).join('\n');
  };
  const head = `Safety records as of ${b.today} (read-only).`;
  if (tool === 'list_safety_incidents') return `${head}\n${inc()}`;
  if (tool === 'who_has_not_signed') return `${head}\n${packs()}`;
  if (tool === 'list_overdue_safety_actions') return `${head}\n${acts()}`;
  if (tool === 'list_expiring_tickets') return `${head}\n${tickets()}`;
  return [head, inc(), acts(), packs(), tickets()].join('\n\n');
}

// Audit trail — record every write Mate makes (non-fatal if it fails).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function logAudit(admin: any, uid: string, action: string, entity: string, entityId: string | null, detail: Record<string, unknown>, actorId?: string): Promise<void> {
  try {
    await admin.from('employer_audit_log').insert({ employer_id: uid, actor_id: actorId ?? uid, action, entity, entity_id: entityId, detail });
  } catch { /* non-fatal */ }
}

// Entities Mate can create — and therefore delete (undo). Maps to table + owner column.
// `label` is the column a person would name it by ("undo the Bob Smith one").
const ENTITY_MAP: Record<string, { table: string; owner: string; label: string }> = {
  team: { table: 'employer_employees', owner: 'employer_id', label: 'name' },
  team_member: { table: 'employer_employees', owner: 'employer_id', label: 'name' },
  supplier: { table: 'employer_suppliers', owner: 'employer_id', label: 'name' },
  job: { table: 'employer_jobs', owner: 'user_id', label: 'title' },
  quote: { table: 'quotes', owner: 'user_id', label: 'quote_number' },
  invoice: { table: 'quotes', owner: 'user_id', label: 'invoice_number' },
  purchase_order: { table: 'employer_material_orders', owner: 'employer_id', label: 'order_number' },
  job_pack: { table: 'employer_job_packs', owner: 'employer_id', label: 'title' },
  vacancy: { table: 'employer_vacancies', owner: 'employer_id', label: 'title' },
  task: { table: 'employer_job_tasks', owner: 'employer_id', label: 'title' },
};
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// ilike treats % and _ as wildcards; a name containing them must match literally.
const likeEscape = (v: string) => v.replace(/[%_\\]/g, (c) => '\\' + c);

// Execute one tool call and return a short result string for the model.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// uid = the FIRM (the owner's id, also for a manager); actorId = who is typing.
async function runTool(admin: any, uid: string, actorId: string, openAiKey: string, authHeader: string, name: string, argsJson: string, canSeeMoney = false): Promise<string> {
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
    if (!error && data?.id) await logAudit(admin, uid, 'create', entity, data.id, { name: row.name ?? row.title ?? row.client ?? null, via: 'mate' }, actorId);
    return { id: data?.id as string | undefined, error };
  };
  // Find-or-create a client record so Mate-created quotes/invoices/jobs populate
  // the CRM automatically (mirrors the frontend linkRecordToClient path).
  const findOrCreateClientId = async (clientName?: string): Promise<string | null> => {
    const nm = (clientName ?? '').trim();
    if (!nm) return null;
    // The one customer book shared with the Electrical Hub (employer_clients is retired).
    const { data: existing } = await admin
      .from('customers').select('id').eq('user_id', uid).ilike('name', nm).limit(1).maybeSingle();
    if (existing?.id) return existing.id as string;
    const { data: created } = await admin
      .from('customers').insert({ user_id: uid, name: nm, last_activity_at: new Date().toISOString() }).select('id').single();
    return (created?.id as string) ?? null;
  };
  // VAT the way the firm has set it: 20% on top when VAT-registered.
  // `settings` is stored on the row so the Electrical Hub, the PDF and
  // Duplicate all read the same VAT the total was built with (an empty
  // settings object made them assume 20%).
  const vatFor = async (net: number): Promise<{ vat: number; label: string; settings: Record<string, unknown> }> => {
    const { data: cp } = await admin
      .from('company_profiles').select('default_vat_registered').eq('user_id', uid).maybeSingle();
    if (cp?.default_vat_registered) {
      const vat = Math.round(net * 0.2 * 100) / 100;
      return { vat, label: `+ £${vat.toFixed(2)} VAT at 20%`, settings: { vatRegistered: true, vatRate: 20 } };
    }
    return {
      vat: 0,
      label: 'no VAT (the firm is not set as VAT registered)',
      settings: { vatRegistered: false, vatRate: 0 },
    };
  };
  // A job named in chat: exact title first, else a unique partial match. Two
  // or more partial matches link nothing rather than guess.
  const findJobId = async (title?: string): Promise<string | null> => {
    const t = String(title ?? '').trim();
    if (!t) return null;
    const { data: exact } = await admin
      .from('employer_jobs').select('id').eq('user_id', uid).ilike('title', likeEscape(t)).limit(1).maybeSingle();
    if (exact?.id) return exact.id as string;
    const like = `%${likeEscape(t)}%`;
    const { data: partial } = await admin
      .from('employer_jobs').select('id').eq('user_id', uid).ilike('title', like).limit(2);
    return partial?.length === 1 ? (partial[0].id as string) : null;
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
        ? `Added ${args.name} to the team (id: ${id}) and emailed ${args.email} their sign-in details — they join your firm when they open it, or tap Join the next time they sign in with that address. Their seat (£9.99/mo) starts when they link.`
        : `Added ${args.name} to the team (id: ${id}). No email given, so send them your team invite code to link — they won't get an automatic sign-in email without one.`;
    } else if (name === 'add_supplier') {
      const { id, error } = await ins('employer_suppliers', {
        employer_id: uid, name: args.name, category: args.category ?? null, contact_name: args.contact_name ?? null,
        phone: args.phone ?? null, email: args.email ?? null, account_number: args.account_number ?? null,
        address: args.address ?? null, delivery_days: args.delivery_days ?? null,
      }, 'supplier');
      return error ? `Failed to add supplier ${args.name}: ${error.message}` : `Added supplier ${args.name} (id: ${id}).`;
    } else if (name === 'add_price_book_item') {
      // One price book (ELE-1991): the owner's materials_lists, written through
      // save_firm_price_book_item AS THE CALLER, so an office manager's buy
      // price is ignored exactly as it is in the hub.
      const caller = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
        global: { headers: { Authorization: authHeader } },
      });
      const num = (v: unknown) => (v == null || v === '' || Number.isNaN(Number(v)) ? null : Number(v));
      const { data: itemId, error } = await caller.rpc('save_firm_price_book_item', {
        p_firm: uid,
        p_item_id: null,
        p_name: String(args.name ?? '').trim(),
        p_unit: args.unit ?? 'each',
        p_category: args.category ?? null,
        p_sell: num(args.sell_price),
        p_buy: num(args.buy_price),
        p_markup: null,
        p_supplier: null,
        p_supplier_id: null,
      });
      if (error) return `Failed to add ${args.name}: ${error.message}`;
      await logAudit(admin, uid, 'create', 'price_book_item', String(itemId), { name: args.name ?? null, via: 'mate' }, actorId);
      return `Added price-book item: ${args.name} (id: ${itemId}). It is in the owner's price book, shared with the Electrical Hub.`;
    } else if (name === 'create_job') {
      const coords = args.location ? await geocodeJob(args.location) : null;
      const clientId = await findOrCreateClientId(args.client);
      const { id, error } = await ins('employer_jobs', {
        user_id: uid, status: 'Active', title: args.title, client: args.client ?? '', location: args.location ?? '',
        customer_id: clientId, // the shared customer book (client_id points at retired employer_clients)
        value: args.value ?? null, start_date: args.start_date ?? null, description: args.description ?? null,
        client_phone: args.client_phone ?? null, client_email: args.client_email ?? null,
        ...(coords ?? {}),
      }, 'job');
      return error ? `Failed to create job: ${error.message}` : `Created job: ${args.title} (job_id: ${id}).`;
    } else if (name === 'create_quote') {
      const quoteJobId = await findJobId(args.job);
      // Written to the shared `quotes` table, exactly like the hub and the
      // Electrical Hub: the number comes from assign_document_numbers (per
      // owner), so Mate can never collide with a quote raised elsewhere.
      const quoteClientId = await findOrCreateClientId(args.client);
      const value = Number(args.value ?? 0) || 0;
      const quoteVat = await vatFor(value);
      const validUntil = args.valid_until ? new Date(args.valid_until) : new Date(Date.now() + 30 * 864e5);
      const { id, error } = await ins('quotes', {
        user_id: uid,
        customer_id: quoteClientId,
        employer_job_id: quoteJobId,
        client_data: { name: args.client ?? 'Client', email: args.client_email ?? null, phone: args.client_phone ?? null },
        job_details: { title: args.job_title ?? args.description ?? null, description: args.description ?? null },
        items: value ? [{ description: args.job_title ?? args.description ?? 'Work', quantity: 1, unitPrice: value, total: value }] : [],
        settings: quoteVat.settings,
        subtotal: value,
        vat_amount: quoteVat.vat,
        total: value + quoteVat.vat,
        status: 'draft',
        acceptance_status: 'pending',
        expiry_date: validUntil.toISOString(),
        invoice_raised: false,
      }, 'quote');
      if (error) return `Failed to create quote: ${error.message}`;
      const { data: q } = await admin.from('quotes').select('quote_number').eq('id', id).maybeSingle();
      return `Created draft quote ${q?.quote_number ?? ''} for ${args.client} (£${value.toFixed(2)} ${quoteVat.label} — check before sending)${quoteJobId ? ` linked to job "${args.job}"` : args.job ? ` (no job named "${args.job}" found — not linked)` : ''} (id: ${id}).`;
    } else if (name === 'create_invoice') {
      const invoiceJobId = await findJobId(args.job);
      const invoiceClientId = await findOrCreateClientId(args.client);
      const amount = Number(args.amount ?? 0) || 0;
      const invoiceVat = await vatFor(amount);
      const { id, error } = await ins('quotes', {
        user_id: uid,
        customer_id: invoiceClientId,
        employer_job_id: invoiceJobId,
        client_data: { name: args.client ?? 'Client', email: args.client_email ?? null },
        job_details: { title: args.project ?? null },
        items: amount ? [{ description: args.project ?? 'Work', quantity: 1, unitPrice: amount, total: amount }] : [],
        settings: invoiceVat.settings,
        subtotal: amount,
        vat_amount: invoiceVat.vat,
        total: amount + invoiceVat.vat,
        status: 'approved',
        acceptance_status: 'accepted',
        expiry_date: new Date(Date.now() + 30 * 864e5).toISOString(),
        invoice_raised: true,
        invoice_status: 'draft',
        invoice_date: new Date().toISOString(),
        invoice_due_date: args.due_date ? new Date(args.due_date).toISOString() : new Date(Date.now() + 30 * 864e5).toISOString(),
        invoice_notes: args.notes ?? null,
      }, 'invoice');
      if (error) return `Failed to create invoice: ${error.message}`;
      const { data: inv } = await admin.from('quotes').select('invoice_number').eq('id', id).maybeSingle();
      return `Created draft invoice ${inv?.invoice_number ?? ''} for ${args.client} (£${amount.toFixed(2)} ${invoiceVat.label} — check before sending)${invoiceJobId ? ` linked to job "${args.job}"` : args.job ? ` (no job named "${args.job}" found — not linked)` : ''} (id: ${id}).`;
    } else if (name === 'create_purchase_order') {
      const { data: sup } = await admin
        .from('employer_suppliers').select('id, name').eq('employer_id', uid).ilike('name', args.supplier).limit(1).maybeSingle();
      if (!sup?.id) return `No supplier named "${args.supplier}" yet — add the supplier first, then raise the PO.`;
      const poJobId = await findJobId(args.job);
      // SAME format as financeService: PO-YYYY-NNNN, numeric max (string-sort
      // LIMIT 1 broke past 9999 and on mixed-width rows).
      const year = new Date().getFullYear();
      const { data: poRows } = await admin
        .from('employer_material_orders').select('order_number').eq('employer_id', uid)
        .like('order_number', `PO-${year}-%`).order('created_at', { ascending: false }).limit(1000);
      const lastNum = (poRows ?? []).reduce((max: number, r: { order_number: string | null }) => {
        const n = parseInt(String(r.order_number ?? '').slice(`PO-${year}-`.length), 10);
        return Number.isFinite(n) && n > max ? n : max;
      }, 0);
      const poNum = `PO-${year}-${String(lastNum + 1).padStart(4, '0')}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const items = (args.items ?? []).map((it: any) => ({
        name: String(it.name), qty: Number(it.qty) || 1, unit_cost: Number(it.unit_cost) || 0,
        unit: it.unit ?? null, received_qty: 0,
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const subtotal = items.reduce((s: number, it: any) => s + it.qty * it.unit_cost, 0);
      const vat = subtotal * 0.2;
      const { id, error } = await ins('employer_material_orders', {
        employer_id: uid, order_number: poNum, supplier_id: sup.id, job_id: poJobId, items,
        subtotal, vat_rate: 20, vat_amount: vat, total: subtotal + vat, status: 'Draft',
        delivery_mode: 'Deliver to site', order_date: new Date().toISOString().split('T')[0],
        ordered_by: 'Mate', notes: args.notes ?? null,
      }, 'purchase_order');
      return error
        ? `Failed to raise the PO: ${error.message}`
        : `Drafted ${poNum} to ${sup.name} for £${(subtotal + vat).toFixed(2)}${poJobId ? ' (linked to the job — commits to its cost when you send it)' : ''} (id: ${id}) — review and send it in Purchasing.`;
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
      const entityKey = String(args.entity ?? '').toLowerCase();
      if (entityKey === 'price_book_item' || entityKey === 'price') {
        // Price-book lines live inside materials_lists (ELE-1991): undo by id only.
        const ref = String(args.id ?? '').trim();
        if (!UUID_RE.test(ref)) return 'I need the id I gave you when I added that price-book item.';
        const { data: madeByMate } = await admin.from('employer_audit_log').select('id')
          .eq('employer_id', uid).eq('action', 'create').eq('entity_id', ref).eq('detail->>via', 'mate').limit(1);
        if (!madeByMate?.length) return 'I only undo things I created in this chat. Remove that item in the Price book if you\'re sure.';
        const caller = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
          global: { headers: { Authorization: authHeader } },
        });
        const { data: removed, error } = await caller.rpc('delete_firm_price_book_item', { p_firm: uid, p_item_id: ref });
        if (error) return `Couldn't remove it: ${error.message}`;
        if (!removed) return 'That item is no longer in the price book.';
        await logAudit(admin, uid, 'delete', 'price_book_item', ref, { via: 'mate' }, actorId);
        return 'Removed that price-book item.';
      }
      const m = ENTITY_MAP[entityKey];
      if (!m) return `I can't delete a "${args.entity}".`;
      if (!args.id) return 'I need the record id to delete it.';
      // Earlier turns only carry Mate's words, not the ids its tools returned,
      // so accept the number or name too — but only an exact, unique match.
      const ref = String(args.id).trim();
      let targetId = ref;
      if (!UUID_RE.test(ref)) {
        let q = admin.from(m.table).select('id').eq(m.owner, uid).ilike(m.label, likeEscape(ref));
        if (m.table === 'quotes') q = q.is('deleted_at', null);
        const { data: hits } = await q.limit(2);
        if (!hits?.length) return `I can't find a ${args.entity} called "${ref}" on your account.`;
        if (hits.length > 1) return `More than one ${args.entity} matches "${ref}" — tell me which one, or remove it in the hub.`;
        targetId = hits[0].id as string;
      }
      // Undo is for what Mate made. Anything else is the user's to delete in the hub.
      const { data: madeByMate } = await admin.from('employer_audit_log').select('id')
        .eq('employer_id', uid).eq('action', 'create').eq('entity_id', targetId).eq('detail->>via', 'mate').limit(1);
      if (!madeByMate?.length) {
        return `I only undo things I created in this chat. Remove that ${args.entity} in the hub if you're sure.`;
      }
      args.id = targetId;
      if (m.table === 'quotes') {
        // Quotes and invoices share `quotes` with the Electrical Hub and carry
        // a numbered sequence, so never hard-delete: soft-delete a draft only.
        // Anything a customer has seen, accepted or paid stays on the books.
        const { data: doc } = await admin.from('quotes')
          .select('id, first_sent_at, invoice_sent_at, accepted_at, invoice_paid_at, total_paid, deleted_at, invoice_raised')
          .eq('id', args.id).eq('user_id', uid).maybeSingle();
        if (!doc || doc.deleted_at) return `I can't find that ${args.entity} on your account.`;
        // A quote that has since been raised as an invoice is not the quote any more.
        const isInvoice = !!doc.invoice_raised;
        if (isInvoice !== (String(args.entity).toLowerCase() === 'invoice')) {
          return isInvoice
            ? "That quote has been turned into an invoice since, so I won't remove it. Void it in Quotes & Invoices if it's wrong."
            : "That's a quote, not an invoice — tell me which you mean.";
        }
        if (doc.first_sent_at || doc.invoice_sent_at || doc.accepted_at || doc.invoice_paid_at || Number(doc.total_paid ?? 0) > 0) {
          return `That ${args.entity} has already gone to the customer, so I won't delete it. Open it in Quotes & Invoices to void or credit it instead.`;
        }
        const { error: delErr } = await admin.from('quotes')
          .update({ deleted_at: new Date().toISOString() }).eq('id', args.id).eq('user_id', uid);
        if (delErr) return `Failed to delete: ${delErr.message}`;
        await logAudit(admin, uid, 'delete', String(args.entity).toLowerCase(), args.id, { via: 'mate', soft: true }, actorId);
        return `Deleted that draft ${args.entity}.`;
      }
      const { data: gone, error } = await admin.from(m.table).delete().eq('id', args.id).eq(m.owner, uid).select('id');
      if (error) return `Failed to delete: ${error.message}`;
      if (!gone?.length) return `I can't find that ${args.entity} on your account.`;
      await logAudit(admin, uid, 'delete', String(args.entity).toLowerCase(), args.id, { via: 'mate' }, actorId);
      return `Deleted that ${args.entity}.`;
    } else if (name === 'add_task') {
      const { id, error } = await ins('employer_job_tasks', {
        employer_id: uid, job_id: args.job_id, title: args.title, description: args.description ?? null,
        priority: args.priority ?? null, due_date: args.due_date ?? null, assignee_employee_id: args.assignee_employee_id ?? null,
      }, 'task');
      return error ? `Failed to add task: ${error.message}` : `Added task: ${args.title} (id: ${id}).`;
    } else if (name === 'get_material_prices') {
      const { data: prods } = await admin.from('marketplace_products')
        .select('name, brand, current_price, currency, stock_status, supplier:marketplace_suppliers(name)')
        .textSearch('search_vector', args.query, { type: 'websearch' }).limit(6);
      return (prods ?? [])
        .map((p: { name: string; brand: string; current_price: number; stock_status: string; supplier: { name: string } | null }) =>
          `${p.name}${p.brand ? ' (' + p.brand + ')' : ''} — £${p.current_price}${p.supplier?.name ? ' @ ' + p.supplier.name : ''}${p.stock_status ? ' [' + p.stock_status + ']' : ''}`)
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
      // employer_leave_requests is the live leave table (employee_leave_requests is the old one).
      const { data: lv } = await admin.from('employer_leave_requests')
        .select('start_date, end_date, leave_type:type, total_days, status').eq('employee_id', emp.id).order('start_date', { ascending: false }).limit(10);
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
    } else if (
      name === 'get_safety_overview' ||
      name === 'list_safety_incidents' ||
      name === 'who_has_not_signed' ||
      name === 'list_overdue_safety_actions' ||
      name === 'list_expiring_tickets'
    ) {
      // Read with the CALLER's JWT so get_employer_safety_brief's own guard
      // (p_firm in my_employer_scope) decides access, not the service role.
      const caller = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
        global: { headers: { Authorization: authHeader } },
      });
      const num = (v: unknown) => (Number.isFinite(Number(v)) && v !== null && v !== '' ? Math.round(Number(v)) : null);
      const { data, error } = await caller.rpc('get_employer_safety_brief', {
        p_firm: uid,
        p_search: typeof args.search === 'string' ? args.search : null,
        p_days: num(args.days) ?? 30,
        p_since_days: num(args.since_days),
      });
      if (error) return "Couldn't read the safety records: " + error.message;
      return formatSafety(name, data as SafetyBrief);
    } else if (name === 'get_pending_approvals' || name === 'get_page_record') {
      // As the CALLER: row-level security decides what they see, as in the hub.
      const caller = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
        global: { headers: { Authorization: authHeader } },
      });
      if (name === 'get_pending_approvals') {
        return await fetchPendingApprovals(caller, uid, String(args.kind ?? 'all'), typeof args.person === 'string' ? args.person : null, canSeeMoney);
      }
      const kind = String(args.kind ?? '') as RecordKind;
      const id = String(args.id ?? '');
      if (!(RECORD_KINDS as readonly string[]).includes(kind) || !UUID_RE.test(id)) return 'Give a record kind and its id (a uuid).';
      if (kind === 'member') {
        return await runTool(admin, uid, actorId, openAiKey, authHeader, 'get_team_member', JSON.stringify({ employee_id: id }), canSeeMoney);
      }
      return await fetchPageRecord(caller, uid, kind, id, canSeeMoney);
    }
    return 'Unknown tool.';
  } catch (e) {
    return 'Tool error: ' + (e instanceof Error ? e.message : 'unknown');
  }
}

Deno.serve(withSentry('employer-ai-assistant', async (req) => {
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

    // The firm this person works for: the owner's id for an active manager
    // (employer_admins), else their own. Everything Mate reads or writes is
    // the firm's — a manager's work must never land on their own account.
    const { data: firmData } = await caller.rpc('my_default_employer_id');
    const firmId: string = (firmData as string | null) ?? user.id;
    // Mate is part of the Employer Hub: an employer account, or its manager.
    const { data: isEmployer } = await caller.rpc('is_employer_account', { p_user: firmId });
    if (!isEmployer) return json({ error: 'Mate comes with an Employer plan.' }, 403);

    const reqBody = await req.json();
    const { messages = [], page_context = null } = reqBody;
    const admin = createClient(supabaseUrl, serviceKey);
    // Role-aware (ELE-1831/1939): an office manager runs the office but never
    // sees the firm's money. Asked of the database as the caller.
    const [{ data: roleData }, { data: moneyData }] = await Promise.all([
      caller.rpc('my_employer_role', { p_firm: firmId }),
      caller.rpc('can_see_firm_money', { p_firm: firmId }),
    ]);
    const role = (roleData as string | null) ?? 'team member';
    const canSeeMoney = moneyData === true;

    // Confirmed actions (7 Oct): the writes run as the CALLER, so the
    // database's own rules decide; the service role only writes the audit row.
    const actionCtx: ActionCtx = {
      caller, admin, firmId, userId: user.id, userEmail: user.email ?? null, role, canSeeMoney, authHeader,
      secret: `mate-action-v1:${Deno.env.get('MATE_ACTION_SECRET') ?? serviceKey}`,
      supabaseUrl, anonKey,
    };
    // The user's own Confirm or Undo: a separate request carrying the signed
    // token. The model is not involved and cannot reach this path.
    if (reqBody?.action === 'confirm' || reqBody?.action === 'undo') {
      const kind = reqBody.action as 'confirm' | 'undo';
      const v = await verifyAction(actionCtx.secret, reqBody.token, { kind, userId: user.id, firmId });
      if (!v.ok) return json({ card: { card: 'result', ok: false, action: 'unknown', title: verifyErrorText(v.error), lines: [], links: [] } });
      if (!(await claimNonce(actionCtx, v.payload.n, `${kind}:${v.payload.t}`))) {
        return json({ card: { card: 'result', ok: false, action: v.payload.t, title: 'That was already done.', lines: [], links: [] } });
      }
      const card = kind === 'confirm' ? await executeAction(actionCtx, v.payload) : await undoAction(actionCtx, v.payload);
      return json({ card });
    }
    const snapshot = await getSnapshot(admin, firmId, canSeeMoney);
    const { data: rp } = await admin
      .from('company_profiles')
      .select('day_rate, hourly_rate, markup, overhead_percentage, profit_margin')
      .eq('user_id', firmId)
      .maybeSingle();
    const rates = rp
      ? `\n\nFIRM RATES (use for labour & estimates): day rate £${rp.day_rate ?? '?'}, hourly £${rp.hourly_rate ?? '?'}, materials markup ${rp.markup ?? '?'}%, overhead ${rp.overhead_percentage ?? '?'}%, profit ${rp.profit_margin ?? '?'}%.`
      : '\n\nFIRM RATES: not set yet — ask the user their day rate / markup, or state your assumption when estimating.';
    const roleNote = canSeeMoney
      ? ''
      : `\n\nWHO YOU ARE TALKING TO: the firm's ${role === 'office' ? 'office manager' : role}. They do not see the firm's money: never state invoice, quote, profit, margin, cashflow or pay figures, and say the owner or an admin can see them if asked. Safety, people, jobs and diary are all fine to discuss.`;
    // Page awareness (7 Oct): the page guide is the same text for everyone on
    // that page, so it sits straight after SOUL; the provider caches the
    // longest unchanged prefix. Per-user and per-turn parts come after.
    const pageCtx = parsePageContext(page_context);
    const pageGuide = buildPageGuide(pageCtx);
    const pageState = buildPageState(pageCtx);
    // The record open on screen, read once here (no extra model round) as the
    // caller, so "this job" or "this invoice" is answered from real data.
    let pageRecord = '';
    if (pageCtx && Object.keys(pageCtx.records).length) {
      const [kind, id] = Object.entries(pageCtx.records)[0] as [RecordKind, string];
      if (kind !== 'review' && kind !== 'entry') {
        pageRecord = await runTool(
          admin, firmId, user.id, openAiKey, authHeader, 'get_page_record', JSON.stringify({ kind, id }), canSeeMoney
        );
        pageRecord = `THE ${kind.toUpperCase()} OPEN ON SCREEN (live, read as this user):\n${pageRecord}`;
      }
    }
    const system = [
      SOUL,
      pageGuide,
      roleNote.trim(),
      canSeeMoney ? rates.trim() : '',
      snapshot,
      pageState,
      pageRecord,
    ].filter(Boolean).join('\n\n');

    const convo: Array<Record<string, unknown>> = [
      { role: 'system', content: system },
      ...messages
        .filter((m: { role: string }) => m && (m.role === 'user' || m.role === 'assistant'))
        .map((m: { role: string; content: string }) => ({ role: m.role, content: String(m.content ?? '').split(CARD_MARK).join('') })),
    ];
    const oaHeaders = { Authorization: `Bearer ${openAiKey}`, 'Content-Type': 'application/json' };

    // --- Multi-round agentic loop: stream the answer live, run tools across
    // rounds until the model stops calling them (so it can chain create_job ->
    // add_task -> create_quote, etc.). ---
    const enc = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let answered = false;
          let cardsShown = 0;
          for (let round = 0; round < 8; round++) {
            const resp = await fetch(OPENAI_CHAT, {
              method: 'POST',
              headers: oaHeaders,
              body: JSON.stringify({ model: CHAT_MODEL, messages: convo, tools: TOOLS, tool_choice: 'auto', stream: true, max_completion_tokens: 1400 }),
            });
            if (!resp.ok || !resp.body) {
              controller.enqueue(enc.encode('Sorry — I hit a problem reaching the model. Try again.'));
              answered = true; // terminal message already streamed — don't append the ran-out-of-steps note
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
                if (delta?.content) {
                  // The card marker belongs to the server alone.
                  const text = String(delta.content).split(CARD_MARK).join('');
                  contentAcc += text;
                  controller.enqueue(enc.encode(text));
                }
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
            if (!toolCalls.length) { answered = true; break; } // model produced its final answer (already streamed)
            convo.push({
              role: 'assistant',
              content: contentAcc || null,
              tool_calls: toolCalls.map((t) => ({ id: t.id, type: 'function', function: { name: t.name, arguments: t.arguments } })),
            });
            for (const t of toolCalls) {
              let result: string;
              if (ACTION_NAMES.has(t.name)) {
                // Preview only: a confirmation card for the user, a note for the model.
                let args: Record<string, unknown> = {};
                try { args = JSON.parse(t.arguments || '{}'); } catch { /* empty */ }
                if (cardsShown >= 3) {
                  result = 'Not offered: three confirmation cards are already showing this turn. Ask the user to deal with those first.';
                } else {
                  const out = await previewAction(actionCtx, t.name, args);
                  if (out.card) {
                    cardsShown += 1;
                    controller.enqueue(enc.encode(`\n\n${cardChunk(out.card)}\n\n`));
                  }
                  result = out.note;
                }
              } else {
                result = await runTool(admin, firmId, user.id, openAiKey, authHeader, t.name, t.arguments, canSeeMoney);
              }
              convo.push({ role: 'tool', tool_call_id: t.id, content: result });
            }
          }
          // Honest exhaustion: the loop ran out of rounds mid-task rather than
          // finishing — the actions already ran, so say so instead of going silent.
          if (!answered) {
            controller.enqueue(
              enc.encode(
                '\n\nThat took more steps than I can run in one go — everything above has been done. Say "continue" and I\'ll pick up where I left off.'
              )
            );
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
}));
