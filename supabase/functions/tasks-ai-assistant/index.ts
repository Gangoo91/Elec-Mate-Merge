import { identifyCaller, deny } from '../_shared/caller.ts';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { callOpenAI, generateLargeEmbedding } from '../_shared/ai-providers.ts';
import { searchFacets, formatFacetsForPrompt } from '../_shared/bs7671-facets-rag.ts';
import { tableA2ForPrompt } from '../_shared/osg-table-a2.ts';
import { searchAppHelp, ACCOUNT_FACTS } from '../_shared/mate-app-help.ts';
import { searchPracticalWorkIntelligence } from '../_shared/rag-practical-work.ts';
import {
  findDocuments,
  sendDocument,
  createQuote,
  createInvoice,
  amendQuote,
  amendInvoice,
} from '../_shared/mate-documents.ts';
import {
  getBusinessSnapshot,
  formatSnapshotForPrompt,
  findPastPricing,
} from '../_shared/mate-business-brain.ts';
import { captureException } from '../_shared/sentry.ts';
import { BUSINESS_HUB_SOUL } from '../_shared/business-hub-soul.ts';
import { setAiLogFn } from '../_shared/ai-log.ts';
setAiLogFn('tasks-ai-assistant');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const SYSTEM_PROMPT = BUSINESS_HUB_SOUL;

const ENQUIRY_ASK =
  /\b(new enquir(y|ies)|(create|log|add|make) (an |a new |this |the )?enquir(y|ies)|quote request|website form|enquiry source|new lead)\b/i;
/** A clear ask for an enquiry, or a pasted form ("Name: …" lines) that mentions one. */
function looksLikeEnquiry(text: string): boolean {
  if (ENQUIRY_ASK.test(text)) return true;
  const fieldLines = (text.match(/^\s*[A-Za-z][A-Za-z ]{1,30}:\s*\S/gm) ?? []).length;
  return fieldLines >= 3 && /enquir/i.test(text);
}
const UK_POSTCODE = /\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b/i;

/**
 * The model sometimes proposes only the customer for a pasted enquiry (Isaac
 * Stafford, 10 Oct: "sometimes it just tells me to create a new customer"), or
 * a project instead of the enquiry. When the user's message is plainly an
 * enquiry, make sure one is proposed: built from the customer card and the
 * pasted text, and replacing a project the model made for it.
 */
function ensureEnquiry(actions: any[], userText: string, canEnquire: boolean): any[] {
  if (!looksLikeEnquiry(userText)) return actions;
  const isEnquiry = (a: any) =>
    a?.type === 'create-enquiry' ||
    (a?.type === 'create-task' && Array.isArray(a.payload?.tags) && a.payload.tags.includes('enquiry'));
  if (actions.some(isEnquiry)) return actions;
  const cust = actions.find((a) => a?.type === 'create-customer')?.payload;
  const proj = actions.find((a) => a?.type === 'create-project');
  const name = cust?.name || proj?.payload?.customerName;
  if (!name) return actions;
  const addr: string = cust?.address || proj?.payload?.location || '';
  const pc = addr.match(UK_POSTCODE)?.[0];
  const lines = userText.split('\n');
  const firstIsAsk = /^\s*(please\s+)?(create|log|add|make|new)\b.*\benquir/i.test(lines[0] ?? '');
  const details = (firstIsAsk ? lines.slice(1) : lines).join('\n').trim().slice(0, 1500);
  const enquiry = enquiryAction(
    {
      name,
      phone: cust?.phone,
      email: cust?.email,
      address: pc ? addr.replace(pc, '').replace(/[,\s]+$/, '').trim() : addr || undefined,
      postcode: pc?.toUpperCase(),
      jobType: userText.match(/type of work:\s*(.+)/i)?.[1]?.trim(),
      details: details || undefined,
      source: /website/i.test(userText) ? 'website' : undefined,
    },
    'New enquiry from your message',
    canEnquire
  );
  // Only the project the model made FOR this enquiry is replaced.
  const sameName = (a: any) =>
    String(a?.payload?.customerName ?? '').trim().toLowerCase() === String(name).trim().toLowerCase();
  return [...actions.filter((a) => !(a?.type === 'create-project' && sameName(a))), enquiry];
}

/**
 * The model proposes "New customer" even when that person is already on file
 * (tested 10 Oct: an existing customer's own email, 3/3 duplicates). Drop the
 * card when they are: same email, or same name with the same phone or no
 * contact details to tell them apart. Two different John Smiths stay two.
 * Their enquiry / task then links to the existing record by name.
 */
async function dropExistingCustomers(
  actions: any[],
  supabase: any,
  userId: string | null
): Promise<any[]> {
  if (!userId || !actions.some((a) => a?.type === 'create-customer')) return actions;
  const digits = (v: unknown) => String(v ?? '').replace(/\D/g, '').slice(-10);
  const q = (v: string) => `"${v.replace(/"/g, '')}"`;
  const out: any[] = [];
  const existingByName = new Map<string, string>();
  for (const a of actions) {
    if (a?.type !== 'create-customer') {
      out.push(a);
      continue;
    }
    const p = a.payload ?? {};
    const email = String(p.email ?? '').trim().toLowerCase();
    const name = String(p.name ?? '').trim();
    const phone = digits(p.phone);
    const ors = [email && `email.ilike.${q(email)}`, name && `name.ilike.${q(name)}`].filter(Boolean);
    if (ors.length === 0) {
      out.push(a);
      continue;
    }
    const { data } = await supabase
      .from('customers')
      .select('id, name, email, phone')
      .eq('user_id', userId)
      .or(ors.join(','))
      .limit(10);
    const hit = (data ?? []).find((c: any) => {
      const cEmail = String(c.email ?? '').trim().toLowerCase();
      if (email && cEmail === email) return true;
      if (!name || String(c.name ?? '').trim().toLowerCase() !== name.toLowerCase()) return false;
      const cPhone = digits(c.phone);
      if (phone && cPhone) return phone === cPhone;
      return !(email && cEmail); // nothing on one side to tell them apart
    });
    if (hit) existingByName.set(name.toLowerCase(), hit.name);
    else out.push(a);
  }
  if (existingByName.size === 0) return out;
  return out.map((a) => {
    const n = String(a?.payload?.name ?? a?.payload?.customerName ?? '').toLowerCase();
    const existing = existingByName.get(n);
    if (!existing || !(a?.type === 'create-enquiry' || a?.type === 'create-task')) return a;
    return { ...a, rationale: `Existing customer: ${existing}` };
  });
}

/** The source a facet is cited as — never "Reg" for the OSG, GN3 or BS 5839-1. */
function citeRef(f: { documentType?: string; regNumber?: string | null }): string | null {
  if (!f.regNumber) return null;
  if (f.documentType === 'osg') return `OSG ${f.regNumber}`;
  if (f.documentType === 'gn3') return `GN3 ${f.regNumber}`;
  if (f.documentType === 'bs5839') return `BS 5839-1 cl ${f.regNumber}`;
  if (f.documentType === 'bs7671') return `Reg ${f.regNumber}`;
  return null;
}

/*
 * Technical questions are grounded BEFORE the model answers. Left to choose,
 * it searched for 19% of technical questions over six weeks (101 of 536) and
 * answered the rest from memory — "socket diversity is 10 A + 40%", "a ring
 * has no floor-area limit", "Table 4A1 for voltage drop" (all wrong). The
 * user's own words retrieve the right facets (probed 10 Oct: the OSG 100 m²
 * ring facts came back top 5 for "What floor area can a 32A ring final serve?").
 */
const TECHNICAL_Q =
  /\b(regs?|regulations?|bs ?7671|osg|on.?site guide|gn ?3|zs|ze|r1|r2|rcds?|rcbos?|mcbs?|afdds?|spds?|cables?|csa|mm²|mm2|earth(ing)?|bond(ing)?|cpcs?|circuits?|eicr|eic|socket|sockets|volt(age|s)?|amps?|kw|zones?|isolat\w*|insulation( resistance)?|continuity|loop impedance|polarity|test (results?|sheets?|readings?|instruments?|voltage)|readings?|diversity|max(imum)? demand|disconnection times?|ring final|radials?|fuses?|consumer unit|fire alarm|5839|emergency light\w*|smoke|inspection|bathroom|shower|ev charg\w*|solar|pv|swa|t&e|twin and earth|lux|ip\d\d|ipx\d)\b/i;
/** Business chat — no regs search unless it also asks about regs or sizing. */
const BUSINESS_Q =
  /\b(paid|pay|invoice\w*|quote\w*|charge|price\w*|cost\w*|chase|order(ing)?|customers?|clients?|tasks?|remind\w*|book(ed|ing)?|diary|sent)\b/i;
const ASKS_TECHNICAL = /\b(regs?|regulations?|bs ?7671|zs|size|sized|sizing|rating|rated|minimum|maximum|allowed|comply|compliant)\b/i;
/** Words that make it a question about the app, whatever else it mentions. */
const APP_NOUN =
  /\b(stripe|subscription|my plan|account|password|log ?in|sign ?in|settings|price book|xero|quickbooks|support|elec-?mate|the app|template|enquir\w*|portal|team members?|workers?|staff|seats?|notifications?|dashboard|export|upload|download|print)\b/i;
const APP_ASK = /\b(how (do|can|would) (i|we|you)|how to|where('s| do| can| is| are)|can i|is there a way)\b/i;
const AFFIRM = /^\s*(yes|yeah|yep|ok|okay|thanks|thank you|cheers|do it|go on|go ahead|sure|nice|great|perfect)\b/i;
function isInstruction(t: string): boolean {
  return (
    /^\s*(please\s+)?(remind|add|create|make|book|schedule|put|log|send|chase|invoice|quote|move|mark|delete|cancel|set up|order|new task|new job)\b/i.test(t) ||
    /\b(can|could|would) you (please )?(add|create|make|book|schedule|put|log|send|chase|order|remind|set up)\b/i.test(t)
  );
}
type Route = 'technical' | 'app' | 'none';
/**
 * One route per turn: the regs, the app guides, or neither — never both (an
 * app answer drowned in disconnection times, a bathroom-RCD answer in
 * Right-to-work guides: review, 10 Oct). A short follow-up borrows the
 * previous question, unless that was an instruction.
 */
function routeTurn(last: string, prev: string): { route: Route; query: string } {
  if (!last.trim() || AFFIRM.test(last) || isInstruction(last) || looksLikeEnquiry(last))
    return { route: 'none', query: last };
  const query = last.length < 60 && prev && !isInstruction(prev) && !AFFIRM.test(prev) ? `${prev}\n${last}` : last;
  if (APP_NOUN.test(last)) return { route: 'app', query: last };
  if (TECHNICAL_Q.test(query)) {
    if (BUSINESS_Q.test(last) && !ASKS_TECHNICAL.test(last)) return { route: 'none', query };
    return { route: 'technical', query };
  }
  if (APP_ASK.test(last)) return { route: 'app', query: last };
  return { route: 'none', query };
}

/*
 * Topic boosts: a question about one of these topics also searches that
 * topic's key facts, in the books' own words. The general search on the
 * user's words misses them when the question leads elsewhere — "HO7 flex for
 * emergency bulkheads" came back about mechanical damage and never said the
 * cable must survive a fire (560.8.1); "how many sockets on a ring" never
 * said 100 m² (held-out real questions, 10 Oct). Each query was checked to
 * return the right facets. At most two run, in parallel with the main search.
 */
const TOPIC_BOOSTS: Array<{ when: RegExp; query: string; docs: string[] }> = [
  {
    when: /\b(emergency light\w*|safety services?|sprinkler)\b/i,
    query: 'safety services wiring systems fire-resistant cables operate in fire conditions emergency lighting',
    docs: ['bs7671'],
  },
  {
    // BS 5839-1 governs the fire alarm itself: its supply, RCDs, cables.
    when: /\b(fire alarm|smoke (alarm|detect\w*)|sounder|call point|fire panel|cie)\b/i,
    query: 'fire detection and fire alarm system supply RCD fire-resisting cables',
    docs: ['bs5839'],
  },
  {
    when: /\bring( final| circuit|s)?\b/i,
    query: 'ring circuit may serve a floor area of up to 100 m2 socket-outlets',
    docs: ['osg'],
  },
  {
    when: /\b(ev|car charg\w*|charge ?point|electric vehicle)\b/i,
    query: 'electric vehicle charging point RCD type A RDC-DD type B DC fault current protection',
    docs: ['bs7671'],
  },
  {
    when: /\b(bath\w*|shower|zone [0-2]|wet room)\b/i,
    query: 'location containing a bath or shower additional protection RCD 30 mA zones',
    docs: ['bs7671'],
  },
  {
    when: /\b(main bonding|bonding conductor|bond(ed|ing)? to (gas|water)|extraneous)\b/i,
    query: 'main protective bonding conductor minimum cross-sectional area PME',
    docs: ['bs7671', 'osg'],
  },
  {
    when: /\balumin(ium|um)\b/i,
    query: 'aluminium conductors minimum cross-sectional area terminations',
    docs: ['bs7671'],
  },
];

const DIVERSITY_Q = /\b(diversit\w*|max(imum)? demand|after diversity|load assessment)\b/i;

/**
 * Every "Reg 123.4.5" in an answer is checked against the 1,781 regulation
 * numbers in BS 7671 (bs7671_known_reg_numbers). One that isn't there gets a
 * plain note, so a mistyped or invented number is never passed off as real.
 */
async function regCheckNote(supabase: any, text: string): Promise<string | null> {
  // Every regulation-shaped number with "Reg" in the 25 characters before it,
  // so "Regs 411.3.3 and 411.3.4" checks both.
  const cited = [
    ...new Set(
      [...text.matchAll(/\b(\d{3}(?:\.\d{1,3}){1,4})\b/g)]
        .filter((m) => /\breg/i.test(text.slice(Math.max(0, (m.index ?? 0) - 25), m.index)))
        .map((m) => m[1])
    ),
  ];
  if (!cited.length) return null;
  try {
    // Four-part leaves are under-enumerated in the list (559.10.3.1 is real
    // and missing) — accept one whose three-part parent is known.
    const parents = cited.filter((n) => n.split('.').length > 3).map((n) => n.split('.').slice(0, 3).join('.'));
    const { data, error } = await supabase
      .from('bs7671_known_reg_numbers')
      .select('reg_number')
      .in('reg_number', [...new Set([...cited, ...parents])]);
    if (error) return null;
    const known = new Set((data ?? []).map((r: any) => r.reg_number));
    const missing = cited.filter(
      (n) => !known.has(n) && !(n.split('.').length > 3 && known.has(n.split('.').slice(0, 3).join('.')))
    );
    if (!missing.length) return null;
    const list = missing.map((n) => `Reg ${n}`).join(', ');
    return `Check before relying on it: I can't find ${list} in BS 7671 — that number may be wrong.`;
  } catch {
    return null;
  }
}

/*
 * The model sometimes writes its whole answer twice — 39 of 1,760 replies in
 * six weeks were an exact X+X, the copy starting at the halfway mark. Where
 * the text starts repeating its own opening, cut it.
 */
const REPEAT_PROBE = 40;
/** How much of the opening must repeat before it counts as a restart. A
 * phrase an answer legitimately reuses ("Kitchen ring final: 32 A RCBO…")
 * diverges well before this (review, 10 Oct). */
const REPEAT_CONFIRM = 160;
/** Streaming holds back this much, so a restart is cut before it shows. */
const REPEAT_HOLD = 200;
/** Index where `text` begins repeating its own opening, or -1. */
function repeatStart(text: string): number {
  if (text.length < REPEAT_PROBE * 3) return -1;
  const head = text.slice(0, REPEAT_PROBE);
  let k = text.indexOf(head, REPEAT_PROBE * 2);
  while (k > 0) {
    const need = Math.min(k, REPEAT_CONFIRM);
    const tail = text.slice(k);
    if (tail.length >= need && text.startsWith(tail.slice(0, need))) return k;
    k = text.indexOf(head, k + 1);
  }
  return -1;
}
function undouble(text: string): string {
  const k = repeatStart(text);
  return k > 0 ? text.slice(0, k).trimEnd() : text;
}

const FORM_TIP =
  'Tip: your website form can send enquiries straight into Enquiries, no copying — Enquiries → Set up → Website form.';

/** The tip, once, when a website enquiry was pasted in and Mate is logging it. */
function formTip(actions: any[], userText: string): string | null {
  if (!/website/i.test(userText) || !looksLikeEnquiry(userText)) return null;
  const logged = actions.some(
    (a) =>
      a?.type === 'create-enquiry' ||
      (a?.type === 'create-task' && Array.isArray(a.payload?.tags) && a.payload.tags.includes('enquiry'))
  );
  return logged ? FORM_TIP : null;
}

/**
 * create_enquiries → the action the caller's app can apply. App builds from
 * 10 Oct 2026 send userContext.capabilities ['create-enquiry']; older iOS
 * builds don't know that action (blank card, Apply does nothing), so they get
 * the enquiry as a task carrying every detail, which they can apply anywhere.
 */
function enquiryAction(
  e: Record<string, unknown>,
  rationale: unknown,
  canEnquire: boolean
): Record<string, unknown> {
  if (canEnquire) {
    return { type: 'create-enquiry', tempId: crypto.randomUUID(), payload: e, rationale };
  }
  const s = (k: string) => (typeof e[k] === 'string' && (e[k] as string).trim()) || '';
  const contact = [s('phone'), s('email'), [s('address'), s('postcode')].filter(Boolean).join(', ')]
    .filter(Boolean)
    .join(' · ');
  return {
    type: 'create-task',
    tempId: crypto.randomUUID(),
    payload: {
      title: `Enquiry: ${[s('jobType'), s('name')].filter(Boolean).join(' — ') || 'new enquiry'}`,
      details: [contact, s('details')].filter(Boolean).join('\n\n'),
      priority: 'normal',
      customerName: s('name') || undefined,
      location: [s('address'), s('postcode')].filter(Boolean).join(', ') || undefined,
      tags: ['enquiry'],
    },
    rationale,
  };
}

const TOOLS: any[] = [
  {
    type: 'function',
    function: {
      name: 'create_tasks',
      description:
        'Create one or more new tasks. Use this for both single tasks and lists/batches.',
      parameters: {
        type: 'object',
        properties: {
          tasks: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string', description: 'Short imperative title' },
                details: { type: 'string', description: 'Optional longer description' },
                priority: {
                  type: 'string',
                  enum: ['low', 'normal', 'high', 'urgent'],
                },
                dueAt: {
                  type: 'string',
                  description: 'ISO 8601 date-time. Omit if not stated.',
                },
                customerName: { type: 'string' },
                location: { type: 'string' },
                tags: {
                  type: 'array',
                  items: {
                    type: 'string',
                    enum: [
                      'snagging',
                      'quote',
                      'follow-up',
                      'booking',
                      'urgent',
                      'inspection',
                      'testing',
                    ],
                  },
                },
                rationale: {
                  type: 'string',
                  description:
                    'One short sentence (≤80 chars) explaining your key inference for this task — priority, date, project link, etc.',
                },
              },
              required: ['title'],
            },
          },
        },
        required: ['tasks'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'amend_task',
      description: 'Patch one or more fields on an existing task',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Existing task id' },
          patch: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              details: { type: 'string' },
              priority: {
                type: 'string',
                enum: ['low', 'normal', 'high', 'urgent'],
              },
              dueAt: { type: 'string' },
              customerName: { type: 'string' },
              location: { type: 'string' },
              tags: { type: 'array', items: { type: 'string' } },
            },
          },
          rationale: {
            type: 'string',
            description: 'One short sentence (≤80 chars) explaining the change',
          },
        },
        required: ['id', 'patch'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'complete_task',
      description: 'Mark an existing task as done',
      parameters: {
        type: 'object',
        properties: { id: { type: 'string' } },
        required: ['id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'delete_task',
      description: 'Delete an existing task',
      parameters: {
        type: 'object',
        properties: { id: { type: 'string' } },
        required: ['id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_snags',
      description:
        "Create one or more snags (site defects/issues). Always tagged 'snagging' implicitly — do not add it to tags. Link to a project via projectId when an obvious match exists in the context.",
      parameters: {
        type: 'object',
        properties: {
          snags: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string', description: 'Short imperative description of the defect' },
                details: { type: 'string' },
                priority: {
                  type: 'string',
                  enum: ['low', 'normal', 'high', 'urgent'],
                },
                location: { type: 'string', description: 'Room/area where snag was spotted' },
                projectId: {
                  type: 'string',
                  description: 'Existing project id from the context — never invent',
                },
                tags: {
                  type: 'array',
                  items: {
                    type: 'string',
                    enum: ['urgent', 'inspection', 'testing'],
                  },
                  description: "Optional extra tags. Don't include 'snagging' — it's implicit.",
                },
                rationale: {
                  type: 'string',
                  description:
                    'One short sentence (≤80 chars) explaining the inference for this snag.',
                },
              },
              required: ['title'],
            },
          },
        },
        required: ['snags'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_projects',
      description:
        'Create one or more new projects (top-level jobs that are going ahead). NOT for a new enquiry or quote request — use create_enquiries for those.',
      parameters: {
        type: 'object',
        properties: {
          projects: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                projectType: {
                  type: 'string',
                  description:
                    'Optional type: rewire, cu-change, eicr, new-build, refurb, fault-find, install',
                },
                priority: { type: 'string', enum: ['low', 'normal', 'high', 'urgent'] },
                customerName: { type: 'string' },
                location: { type: 'string' },
                estimatedValue: { type: 'number', description: 'Quote/contract value in GBP' },
                startDate: { type: 'string', description: 'ISO 8601 date' },
                dueDate: { type: 'string', description: 'ISO 8601 date' },
                tags: { type: 'array', items: { type: 'string' } },
                rationale: {
                  type: 'string',
                  description:
                    'One short sentence (≤80 chars) explaining the inference for this project.',
                },
              },
              required: ['title'],
            },
          },
        },
        required: ['projects'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'amend_project',
      description: 'Patch fields on an existing project',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          patch: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              projectType: { type: 'string' },
              priority: { type: 'string', enum: ['low', 'normal', 'high', 'urgent'] },
              customerName: { type: 'string' },
              location: { type: 'string' },
              estimatedValue: { type: 'number' },
              startDate: { type: 'string' },
              dueDate: { type: 'string' },
              tags: { type: 'array', items: { type: 'string' } },
            },
          },
          rationale: {
            type: 'string',
            description: 'One short sentence (≤80 chars) explaining the change',
          },
        },
        required: ['id', 'patch'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'complete_project',
      description: 'Mark a project as completed',
      parameters: {
        type: 'object',
        properties: { id: { type: 'string' } },
        required: ['id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'delete_project',
      description: 'Delete a project',
      parameters: {
        type: 'object',
        properties: { id: { type: 'string' } },
        required: ['id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_customers',
      description: 'Create one or more new customers',
      parameters: {
        type: 'object',
        properties: {
          customers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' },
                address: { type: 'string' },
                notes: { type: 'string' },
                rationale: {
                  type: 'string',
                  description: 'One short sentence (≤80 chars) explaining the inference',
                },
              },
              required: ['name'],
            },
          },
        },
        required: ['customers'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_enquiries',
      description:
        "Add one or more new enquiries to the user's Enquiries inbox: a request for work not yet priced, from a website form, an email, a phone call or word of mouth. Use when the user pastes a website quote request or forwarded email, or asks to create/log an enquiry. Pair with create_customers for a new person. Never use create_projects for an enquiry.",
      parameters: {
        type: 'object',
        properties: {
          enquiries: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string', description: "Customer's name" },
                phone: { type: 'string' },
                email: { type: 'string' },
                address: { type: 'string', description: 'Site address, without the postcode if given separately' },
                postcode: { type: 'string' },
                jobType: {
                  type: 'string',
                  description: 'Short type of work, e.g. "EICR", "Consumer unit change", "Rewire", "EV charger"',
                },
                details: {
                  type: 'string',
                  description:
                    "Everything else that helps price and book it, in plain lines: reason, property size, last tested, availability, and the customer's own words.",
                },
                source: {
                  type: 'string',
                  enum: ['website', 'email', 'phone', 'other'],
                  description: 'Where it came from',
                },
                rationale: {
                  type: 'string',
                  description: 'One short sentence (≤80 chars) explaining the inference',
                },
              },
              required: ['name'],
            },
          },
        },
        required: ['enquiries'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'amend_customer',
      description: 'Patch fields on an existing customer (look up id from context by name)',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          patch: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
              address: { type: 'string' },
              notes: { type: 'string' },
            },
          },
          rationale: {
            type: 'string',
            description: 'One short sentence (≤80 chars) explaining the change',
          },
        },
        required: ['id', 'patch'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'delete_customer',
      description: 'Delete an existing customer',
      parameters: {
        type: 'object',
        properties: { id: { type: 'string' } },
        required: ['id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_bs7671',
      description:
        'Search the BS 7671 facets corpus for regulation grounding. Use when the user asks regulation/compliance questions, when verifying a claim, OR proactively when the user mentions a job type that has regulatory implications (EV install → Section 722; CU change in HMO → AFDD A4:2026; bathroom → zones; commercial kitchen → periodic test intervals; etc).',
      parameters: {
        type: 'object',
        properties: { query: { type: 'string' } },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_practical_knowledge',
      description:
        "Search the Practical Work Intelligence corpus for hands-on installation, commissioning, fault-finding and equipment guidance — real practical detail (tools required, expected test results, common faults, cross-referenced regulations). Use PROACTIVELY when the user mentions a job type or a symptom (e.g. 'RCD keeps tripping', 'EV install', 'CU change', 'EICR for a chip shop') to surface relevant practical detail before proposing tasks. Complements search_bs7671 — call both when both are useful.",
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'The job, symptom, or equipment to look up.' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_business_knowledge',
      description:
        "Search the Employer Knowledge corpus — the business side of running an electrical firm. Covers JIB 2026 national working rules and rates, CIS/VAT and tax (ACCA), CDM 2015 and HSE guidance (L153, HSG85), ACAS employment/discipline/grievance, tendering and the Construction Playbook, adjudication and construction commercial practice, and apprenticeship routes. Use whenever the user asks something commercial, contractual, employment-related or health-and-safety-duty related — 'what should I pay an approved electrician', 'do I need to notify CDM', 'can I let someone go in their probation', 'how does CIS reverse charge work'. Complements search_bs7671, which covers the technical standards rather than the business.",
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'The business, commercial, employment or H&S duty question.' },
          domain: {
            type: 'string',
            enum: ['costing', 'hr-employment', 'health-safety', 'business-ops', 'tendering', 'construction-commercial', 'project-mgmt', 'apprenticeships', 'electrical-business'],
            description: 'Optional. Narrow to one domain when the question clearly belongs to it — improves precision.',
          },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'find_documents',
      description:
        "Find the user's existing quotes, invoices and certificates. Use when the user asks to send/resend/look-up something they already have (e.g. 'send Mrs Smith her EICR', 'send the quote for Oak Lane again', 'list my draft invoices'). Returns one line per match with the id, reference, customer, total and status. You MUST call this BEFORE send_document so you have the real id and customer email. Never guess document ids.",
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Customer name to match (case-insensitive). Optional — omit to list recent.',
          },
          kind: {
            type: 'string',
            enum: ['quote', 'invoice', 'cert', 'all'],
            description: "Filter by document kind. Default 'all'.",
          },
          status: {
            type: 'string',
            description:
              "Filter by status (e.g. 'draft', 'sent', 'overdue', 'complete'). Optional.",
          },
          limit: { type: 'number', description: 'Max results per kind, default 8.' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'send_document',
      description:
        "Actually send an existing quote / invoice / certificate to the recorded client, with the real PDF attached. This DOES real work — an email goes out. NEVER call this unless: (a) you have a valid doc_id (from find_documents or a fresh create_quote/create_invoice — never invent one), AND (b) the user has explicitly confirmed they want to send (a 'yes', 'send', 'go', 'fire it'). Show the user the document reference + recipient + the email subject + body draft BEFORE calling, and wait for confirmation. custom_message overrides the default email body paragraph — pass the user-approved wording here so the recipient sees exactly what you showed in chat. custom_subject overrides the default subject line (quote/invoice). After a successful call say 'Sent — PDF was attached'. If the call fails, say so plainly.",
      parameters: {
        type: 'object',
        properties: {
          doc_type: {
            type: 'string',
            enum: ['quote', 'invoice', 'cert'],
            description: 'Which kind of document — must match the source.',
          },
          doc_id: {
            type: 'string',
            description: 'The UUID from find_documents / create_quote / create_invoice. Never guess.',
          },
          recipient_email: {
            type: 'string',
            description:
              'Optional override of the recipient email. CERT ONLY — quote/invoice use the client_data on the row.',
          },
          custom_subject: {
            type: 'string',
            description:
              'Optional override of the email subject line. Quote + invoice only. Cert subject is template-driven.',
          },
          custom_message: {
            type: 'string',
            description:
              'Optional body paragraph that REPLACES the default. Supported on quote, invoice and cert. Pass the wording the user approved in chat verbatim.',
          },
        },
        required: ['doc_type', 'doc_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'find_past_pricing',
      description:
        "Pricing brain. Look up THIS user's past quotes for a given job type and return the median + range per line item description. ALWAYS call this BEFORE create_quote or create_invoice for any recognisable job type (EICR, CU change, rewire, EV install, fault find, fire alarm, periodic test, board change, first fix, second fix, etc.) so the proposed line items anchor on the user's REAL historical rates rather than invented numbers. If the result shows no past quotes, be transparent with the user that you're starting fresh.",
      parameters: {
        type: 'object',
        properties: {
          job_type: {
            type: 'string',
            description:
              "Job keyword to search (matches against quote job_details title/description). E.g. 'EICR', 'CU change', 'board install', 'rewire'.",
          },
          limit: {
            type: 'number',
            description: 'Max past quotes to scan, default 12.',
          },
        },
        required: ['job_type'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_quote',
      description:
        "Create a real draft quote with line items. The quote row is inserted in the user's account in 'draft' status — NOT sent. After this returns, you can call send_document with doc_type='quote' and the returned doc_id to actually email it with the PDF attached. Use this when the user wants a NEW quote for a job. Gather customer + job + line items first; if line items are unclear, propose a sensible draft (qty + rate per line) and confirm with the user BEFORE calling. Always use real customer details (resolve via find_customer first). Currency: GBP. Default VAT 20% unless user says otherwise.",
      parameters: {
        type: 'object',
        properties: {
          client_name: { type: 'string', description: 'Customer full name.' },
          client_email: { type: 'string', description: 'Customer email — needed for sending later.' },
          client_phone: { type: 'string' },
          client_address: { type: 'string' },
          client_postcode: { type: 'string' },
          job_title: {
            type: 'string',
            description: "Short title, e.g. 'New board install and first fix'.",
          },
          job_description: {
            type: 'string',
            description: 'Optional longer description of scope (will appear on PDF).',
          },
          line_items: {
            type: 'array',
            description:
              'Each line: description + quantity + unitPrice (GBP). Subtotal/VAT/total computed server-side.',
            items: {
              type: 'object',
              properties: {
                description: { type: 'string' },
                quantity: { type: 'number' },
                unitPrice: { type: 'number' },
                inventory_item_id: { type: 'string', description: 'Optional stock item id (the stock_item_id from list_price_book, or an id from check_stock). On an invoice line this makes stock decrement when the invoice is created. Only set it if you actually looked it up — never guess.' },
              },
              required: ['description', 'quantity', 'unitPrice'],
            },
            minItems: 1,
          },
          vat_rate: {
            type: 'number',
            description: 'VAT % (default 20). Pass 0 if user is not VAT-registered.',
          },
          expiry_days: {
            type: 'number',
            description: 'Quote validity in days from today (default 30).',
          },
          notes: { type: 'string', description: 'Optional notes on the quote.' },
        },
        required: ['client_name', 'job_title', 'line_items'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_invoice',
      description:
        "Create a real draft invoice with line items. Inserted in 'draft' status — NOT sent. After this returns, call send_document with doc_type='invoice' and the returned doc_id to email it with PDF + payment link. Use when the user wants to bill a customer for completed work. Default payment terms 30 days. Default VAT 20%.",
      parameters: {
        type: 'object',
        properties: {
          client_name: { type: 'string' },
          client_email: { type: 'string' },
          client_phone: { type: 'string' },
          client_address: { type: 'string' },
          client_postcode: { type: 'string' },
          job_title: { type: 'string' },
          job_description: { type: 'string' },
          line_items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                description: { type: 'string' },
                quantity: { type: 'number' },
                unitPrice: { type: 'number' },
                inventory_item_id: { type: 'string', description: 'Optional stock item id (the stock_item_id from list_price_book, or an id from check_stock). On an invoice line this makes stock decrement when the invoice is created. Only set it if you actually looked it up — never guess.' },
              },
              required: ['description', 'quantity', 'unitPrice'],
            },
            minItems: 1,
          },
          vat_rate: { type: 'number' },
          payment_days: {
            type: 'number',
            description: 'Days until due (default 30).',
          },
          notes: { type: 'string' },
        },
        required: ['client_name', 'job_title', 'line_items'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'add_materials',
      description:
        "Propose adding materials to a job's materials list (the Job Sheet list that feeds stock picking and invoicing). Use when the user asks to put parts on a job ('add 3 twin sockets to the Henderson job') or after planning work that needs parts. Resolve the job id from the jobs list or find_project first — never guess it. Each material becomes an approval card; nothing is written until the user applies it.",
      parameters: {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            description: 'The job (project) id from the current jobs list or find_project.',
          },
          materials: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              properties: {
                name: { type: 'string', description: "e.g. '2.5mm² T&E 100m drum'." },
                quantity: { type: 'number', description: 'Default 1.' },
                unit: {
                  type: 'string',
                  description: "e.g. 'm', 'box', 'roll' — omit for each-type items.",
                },
                unit_price: {
                  type: 'number',
                  description:
                    'Optional £ ex-VAT, ONLY if known from list_price_book / check_stock / the user — never invent a price.',
                },
                rationale: { type: 'string' },
              },
              required: ['name'],
            },
          },
          rationale: { type: 'string', description: 'Why these materials, one short line.' },
        },
        required: ['project_id', 'materials'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'draft_invoice',
      description:
        "Propose opening the invoice composer for a job, pre-filled with that job's unbilled logged time and materials. This is the RIGHT way to bill a job (especially stage bill_it) because it pulls real logged hours + materials and marks them billed — prefer it over create_invoice whenever the work lives on a job. Use create_invoice only for one-off invoices not tied to a job. Nothing is created until the user reviews and generates in the composer.",
      parameters: {
        type: 'object',
        properties: {
          project_id: { type: 'string', description: 'The job (project) id.' },
          rationale: { type: 'string' },
        },
        required: ['project_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'amend_quote',
      description:
        "Patch fields on an existing quote. Use for: fixing client details, changing line items, adjusting VAT, extending expiry, editing notes, or changing status (draft / sent / accepted / expired / cancelled). Items + totals are auto-recomputed if line_items is supplied. REFUSED on quotes that are already accepted or have an invoice raised — issue a variation or credit instead.",
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Quote id (uuid). Get from find_documents or summarise_customer — never invent.' },
          patch: {
            type: 'object',
            properties: {
              client_name: { type: 'string' },
              client_email: { type: 'string' },
              client_phone: { type: 'string' },
              client_address: { type: 'string' },
              client_postcode: { type: 'string' },
              job_title: { type: 'string' },
              job_description: { type: 'string' },
              line_items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    description: { type: 'string' },
                    quantity: { type: 'number' },
                    unitPrice: { type: 'number' },
                  },
                  required: ['description', 'quantity', 'unitPrice'],
                },
                description: 'Full replacement set of line items. Subtotal/VAT/total auto-recomputed.',
              },
              vat_rate: { type: 'number', description: 'Percent. 20 = standard.' },
              expiry_days: { type: 'number', description: 'New expiry as days from today.' },
              notes: { type: 'string' },
              status: {
                type: 'string',
                enum: ['draft', 'sent', 'accepted', 'expired', 'cancelled'],
              },
            },
          },
        },
        required: ['id', 'patch'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'amend_invoice',
      description:
        "Patch fields on an existing invoice. Editable on draft. On sent/overdue invoices: status / due_date / notes / payment_method / payment_reference / client info only — NOT items or totals (issue a credit note + replacement invoice instead). Paid invoices accept ONLY notes / payment_method / payment_reference. Marking status='paid' auto-stamps paid_at.",
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Invoice id (uuid). Get from find_documents or summarise_customer — never invent.' },
          patch: {
            type: 'object',
            properties: {
              client_name: { type: 'string' },
              client_email: { type: 'string' },
              client_phone: { type: 'string' },
              client_address: { type: 'string' },
              client_postcode: { type: 'string' },
              job_title: { type: 'string' },
              job_description: { type: 'string' },
              line_items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    description: { type: 'string' },
                    quantity: { type: 'number' },
                    unitPrice: { type: 'number' },
                  },
                  required: ['description', 'quantity', 'unitPrice'],
                },
                description: 'Full replacement set. Draft only.',
              },
              vat_rate: { type: 'number', description: 'Percent. Draft only.' },
              due_days: { type: 'number', description: 'New due date as days from today.' },
              notes: { type: 'string' },
              status: {
                type: 'string',
                enum: ['draft', 'sent', 'paid', 'overdue', 'cancelled'],
              },
              payment_method: { type: 'string', description: 'e.g. bank_transfer, card, cash, stripe.' },
              payment_reference: { type: 'string' },
            },
          },
        },
        required: ['id', 'patch'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'query_outstanding_invoices',
      description:
        "Pull the user's unpaid invoices. Use when the user asks about money owed, overdue, chases, cash flow, who hasn't paid. Returns invoice id, number, customer, total, due_date, days_overdue.",
      parameters: {
        type: 'object',
        properties: {
          overdueOnly: {
            type: 'boolean',
            description: 'If true, only invoices past their due_date. Default false (all unpaid).',
          },
          limit: { type: 'number', description: 'Max results, default 20.' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'query_pipeline_quotes',
      description:
        "Pull the user's quotes that are out for response (status='sent') and haven't been converted to an invoice yet. Use for pipeline questions: 'what's outstanding', 'who haven't I heard back from'.",
      parameters: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Max results, default 20.' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'summarise_customer',
      description:
        "Full 360 of a customer: contact details, open projects, open tasks, open snags, unpaid invoices, recent quotes. Use when the user asks 'where am I on Mrs Patel?', 'tell me about this customer', or before drafting a chase email so the model knows the full context.",
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Customer name or id. Will fuzzy-match on name.',
          },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'find_similar_jobs',
      description:
        "Find the user's past completed/active projects that match a job type or keyword (e.g. 'EICR', 'CU change', 'rewire'). Returns each project with its task list — used as templates for the new job. Always call this BEFORE proposing a multi-step plan for a recognisable job type, so the suggested tasks reflect how this user actually works rather than generic boilerplate.",
      parameters: {
        type: 'object',
        properties: {
          jobType: {
            type: 'string',
            description:
              "Keyword/phrase describing the job: e.g. 'EICR', 'CU change', 'rewire', 'EV charger', 'fault find'.",
          },
          limit: { type: 'number', description: 'Max projects to return, default 3.' },
        },
        required: ['jobType'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'plan_my_day',
      description:
        "Pull tasks + projects due on a specific date with location info, for day-planning. Use when the user asks 'plan my day', 'what's on tomorrow', 'where am I working Thursday'.",
      parameters: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            description: "ISO date (YYYY-MM-DD). Default: tomorrow.",
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'draft_chase_email',
      description:
        "Draft a chase or follow-up email for an invoice/quote/customer. EMITS a proposed message (NOT sent automatically). The user previews and copies or sends. Use polite, UK-English, professional but firm tone. Always reference the invoice number, original amount, and how many days overdue when chasing.",
      parameters: {
        type: 'object',
        properties: {
          to: { type: 'string', description: 'Recipient email address' },
          toName: { type: 'string', description: 'Recipient name (for greeting)' },
          subject: { type: 'string' },
          body: {
            type: 'string',
            description: 'Full email body, plain text. Include greeting, body, sign-off.',
          },
          invoiceId: { type: 'string', description: 'Linked invoice id if any' },
          quoteId: { type: 'string', description: 'Linked quote id if any' },
          customerId: { type: 'string', description: 'Linked customer id if any' },
          purpose: {
            type: 'string',
            enum: ['chase-invoice', 'follow-up-quote', 'appointment', 'general'],
          },
          rationale: {
            type: 'string',
            description: 'One short sentence explaining why this email — tone, urgency.',
          },
        },
        required: ['toName', 'subject', 'body'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'find_customer',
      description:
        "Fuzzy-search the user's full customer list when the name they mentioned isn't in the context. Returns matching id+name+contact details. Use BEFORE proposing amend_customer / delete_customer / linking a task to a customer when the customer isn't already in the context snapshot.",
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Substring of the customer name to search for (case-insensitive)',
          },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'find_project',
      description:
        "Fuzzy-search the user's full projects when the project they mentioned isn't in the context. Returns matching id+title+status+customer+location. Use BEFORE linking a snag/task to a project or before amend_project / complete_project / delete_project when the project isn't already in the context snapshot.",
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Substring of the project title/location to search for (case-insensitive)',
          },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'ask_clarification',
      description:
        "Ask the user a structured clarifying question BEFORE proposing actions. Use when there's ambiguity that can't be resolved from context — multiple plausible matches, missing critical info (priority/date/customer), or uncertain intent (delete vs amend). Provide 2-5 quick-reply options so the user can tap one. Do NOT also propose mutations in the same response — wait for the answer first. NOT for a direct instruction where only a link is missing (\"remind me to order the CU for the Hughes job\" and there is no Hughes job): propose the task unlinked and say so in its rationale — every card waits for Apply anyway.",
      parameters: {
        type: 'object',
        properties: {
          question: {
            type: 'string',
            description:
              'The clarifying question. One sentence, plain language, no jargon. e.g. "Which Smith did you mean?"',
          },
          context: {
            type: 'string',
            description:
              'Optional one-line context explaining why you\'re asking. e.g. "Found two customers with that surname."',
          },
          options: {
            type: 'array',
            description:
              'Quick-reply options the user can tap. Each becomes a button that sends that text as their reply.',
            items: {
              type: 'object',
              properties: {
                label: {
                  type: 'string',
                  description: 'Short label shown on the chip (≤32 chars)',
                },
                value: {
                  type: 'string',
                  description:
                    'The text sent back as the user\'s reply if they tap this option. Make it natural language, not an ID.',
                },
              },
              required: ['label', 'value'],
            },
            minItems: 2,
            maxItems: 5,
          },
          allowFreeText: {
            type: 'boolean',
            description:
              'Whether the user can also type a freeform reply. Default true. Set false only if the options are truly exhaustive.',
          },
        },
        required: ['question', 'options'],
      },
    },
  },
  // ─── Stock Inventory + Price Book (ELE-1013/1017) ───────────────────
  {
    type: 'function',
    function: {
      name: 'check_stock',
      description:
        "Read the electrician's stock inventory. Use to answer 'what do I have in stock', 'how many X left', or to check availability for a job. Returns each item's id, quantity, unit, location and low-stock flag.",
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Optional name/supplier search, e.g. "downlight" or "2.5mm cable". Omit to list everything.' },
          lowOnly: { type: 'boolean', description: 'Only return items at or below their low-stock threshold.' },
          limit: { type: 'number', description: 'Max items (default 25).' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'upsert_stock_item',
      description:
        'Add a new stock item, or amend an existing one. To AMEND pass its id (from check_stock) plus only the fields to change. To ADD omit id and pass at least name. Confirm with the user before amending an existing item.',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Stock item id — present = amend, absent = add new.' },
          name: { type: 'string' },
          quantity: { type: 'number', description: 'Absolute quantity on hand. For relative "used 5"/"got 10", use adjust_stock instead.' },
          unit: { type: 'string', description: 'e.g. each, metres, boxes, rolls.' },
          location: { type: 'string', enum: ['van', 'garage', 'site', 'wholesaler', 'other'] },
          unit_cost: { type: 'number', description: 'Cost per unit in £.' },
          supplier: { type: 'string' },
          low_stock_threshold: { type: 'number' },
          category: { type: 'string', enum: ['cable', 'accessories', 'fixings', 'consumer_units', 'mcbs_rcds', 'tools', 'ppe', 'other'] },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'adjust_stock',
      description:
        "Change a stock item's quantity by a relative amount — e.g. 'used 5 cable reels' → delta -5, 'took a delivery of 10' → delta +10. Identify the item by id (preferred) or name.",
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Stock item id (preferred).' },
          name: { type: 'string', description: 'Item name if id unknown; must match exactly one item.' },
          delta: { type: 'number', description: 'Signed change. Negative = used/removed, positive = restocked.' },
        },
        required: ['delta'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'delete_stock_item',
      description: 'Permanently delete a stock item by id. Always confirm with the user first.',
      parameters: {
        type: 'object',
        properties: { id: { type: 'string' } },
        required: ['id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'list_price_book',
      description:
        "Read the electrician's price book (saved materials with sell/cost prices). Use for 'what's my price for X'. Returns each item's name, sell price, cost, markup, unit, supplier, whether it's stock-linked, plus item_id and list_id.",
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Optional item-name search. Omit to list items.' },
          limit: { type: 'number', description: 'Max items (default 30).' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'upsert_price_book_item',
      description:
        'Add a new price-book item, or amend one. To AMEND pass item_id + list_id (from list_price_book) and only changed fields. To ADD omit them and pass name plus a price. Give either sell_price, or cost_price (with optional markup_percent) and the sell price is computed. Confirm before amending.',
      parameters: {
        type: 'object',
        properties: {
          item_id: { type: 'string', description: 'Present (with list_id) = amend.' },
          list_id: { type: 'string', description: 'Which list the item is in / should go to. Defaults to the "Price Book" list.' },
          name: { type: 'string' },
          sell_price: { type: 'number', description: 'Final price charged on quotes (£).' },
          cost_price: { type: 'number', description: 'Trade/cost price (£).' },
          markup_percent: { type: 'number', description: 'Markup % applied to cost when sell_price is not given.' },
          unit: { type: 'string' },
          supplier: { type: 'string' },
          stock_item_id: { type: 'string', description: 'Optionally link to a stock item id (from check_stock) so quotes show availability and stock decrements on invoice. Pass "" to unlink.' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'delete_price_book_item',
      description: 'Delete a price-book item by item_id + list_id (from list_price_book). Always confirm first.',
      parameters: {
        type: 'object',
        properties: {
          item_id: { type: 'string' },
          list_id: { type: 'string' },
        },
        required: ['item_id', 'list_id'],
      },
    },
  },
];

interface Citation {
  ref: string;
  topic: string;
}

const SSE_HEADERS = {
  ...corsHeaders,
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache, no-transform',
  Connection: 'keep-alive',
  'X-Accel-Buffering': 'no',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Capture the user's Authorization header — forwarded to send-*-resend
  // edge functions when Mate sends a real document.
  const authHeader = req.headers.get('Authorization');

  try {
    const {
      messages,
      currentTasks = [],
      currentProjects = [],
      currentCustomers = [],
      userContext = {},
      userId: bodyUserId = null,
      conversationId: incomingConvId = null,
      stream: wantsStream = true,
    } = await req.json();

    // Who is asking decides whose business data Mate reads and changes. The
    // body's userId was trusted until 7 Oct 2026 — any visitor could read and
    // amend any user's quotes, invoices, customers and stock by naming them.
    const caller = await identifyCaller(req);
    if (!caller) return deny(corsHeaders);
    const userId: string | null = caller.kind === 'user' ? caller.userId : bodyUserId;
    const canEnquire =
      Array.isArray(userContext?.capabilities) && userContext.capabilities.includes('create-enquiry');
    const lastUserText: string = (() => {
      const turns = (messages ?? []).filter((m: any) => m?.role === 'user');
      const last = String(turns[turns.length - 1]?.content ?? '');
      const prev = String(turns[turns.length - 2]?.content ?? '');
      // "yes, log it" after a pasted enquiry: the enquiry is the paste.
      return last.length < 60 && looksLikeEnquiry(prev) && !looksLikeEnquiry(last) ? prev : last;
    })();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    const openAiKey = Deno.env.get('OPENAI_API_KEY')!;

    const taskSummary = (currentTasks as any[])
      .slice(0, 25)
      .map(
        (t) =>
          `${t.id} [${t.status}, ${t.priority}${t.dueAt ? `, due ${t.dueAt.split('T')[0]}` : ''}] ${t.title}${t.customerName ? ` (${t.customerName})` : ''}${t.location ? ` @ ${t.location}` : ''}${Array.isArray(t.tags) && t.tags.length ? ` #${t.tags.join(' #')}` : ''}`
      )
      .join('\n');

    const projectSummary = (currentProjects as any[])
      .slice(0, 25)
      .map((p) => {
        const stage = p.stage || p.status;
        const money =
          p.estimatedValue != null && Number(p.estimatedValue) > 0
            ? ` £${Number(p.estimatedValue).toLocaleString('en-GB')}`
            : '';
        const docs = [
          p.quoteCount ? `${p.quoteCount} quote${p.quoteCount > 1 ? 's' : ''}` : null,
          p.invoiceCount
            ? `${p.invoiceCount} invoice${p.invoiceCount > 1 ? 's' : ''}${p.unpaidInvoiceCount ? ` (${p.unpaidInvoiceCount} unpaid)` : ''}`
            : null,
          p.certCount ? `${p.certCount} cert${p.certCount > 1 ? 's' : ''}` : null,
          p.totalTasks ? `tasks ${p.completedTasks || 0}/${p.totalTasks}` : null,
        ]
          .filter(Boolean)
          .join(', ');
        return `${p.id} [${stage}${p.priority ? `, ${p.priority}` : ''}${p.startDate ? `, starts ${String(p.startDate).split('T')[0]}` : ''}${p.dueDate ? `, due ${String(p.dueDate).split('T')[0]}` : ''}]${money} ${p.title}${p.customerName ? ` (${p.customerName})` : ''}${p.location ? ` @ ${p.location}` : ''}${docs ? ` — ${docs}` : ''}`;
      })
      .join('\n');

    const customerSummary = (currentCustomers as any[])
      .slice(0, 50)
      .map(
        (c) =>
          `${c.id} ${c.name}${c.phone ? ` · ${c.phone}` : ''}${c.email ? ` · ${c.email}` : ''}${c.address ? ` · ${c.address}` : ''}`
      )
      .join('\n');

    // Cash brain — always-on awareness of outstanding, overdue, win rate.
    // Fetched per turn so Mate reasons WITH the live state of the books.
    const businessSnapshot = await getBusinessSnapshot(supabase, userId);
    const snapshotBlock = formatSnapshotForPrompt(businessSnapshot);

    const contextMsg = `Now: ${new Date().toISOString()}
Recent customer names: ${(userContext.recentCustomers || []).slice(0, 12).join(', ') || 'none yet'}
Recent locations: ${(userContext.recentLocations || []).slice(0, 12).join(', ') || 'none yet'}

Current customers (id, name, phone, email, address):
${customerSummary || 'no customers yet'}

Current jobs (id, [stage, priority, dates] £value, title, customer, address — linked docs):
${projectSummary || 'no jobs yet'}

Job stage meanings (derived automatically from linked data — the user calls projects "jobs"):
enquiry = nothing priced yet · quoted = quote out, unanswered · won = quote accepted, NEEDS BOOKING IN · booked = date in the diary · in_progress = on the tools · bill_it = work finished, NEEDS INVOICING · awaiting_payment = invoice out unpaid · paid = money in.
When asked "where am I on <job>" (or anything about a job's state), answer like a sharp foreman from the data above: the stage in plain words, the money position (value, unpaid invoices), what's booked, task progress — and ALWAYS finish with the single next action (book it / invoice it / chase it / crack on). Keep it to a few tight lines.
To ACT on a job, not just report: add_materials puts parts on its materials list (price from list_price_book/check_stock if available — never invented); draft_invoice opens the invoice composer pre-filled with the job's unbilled time + materials — always prefer it over create_invoice when billing job work.

Current open tasks (id, status, priority, due, title) — items with #snagging are snags:
${taskSummary || 'no open tasks'}

${snapshotBlock}`;

    // Pre-flight: if the user named a customer in their last message,
    // load that customer's full summary into context so the model lands
    // already informed instead of asking "let me look that up".
    let enrichedContext = contextMsg;
    if (userId) {
      const lastUserMsg = [...messages].reverse().find((m: any) => m.role === 'user');
      const text = String(lastUserMsg?.content || '').toLowerCase();
      if (text.length > 0) {
        const matchedCustomer = (currentCustomers as any[]).find((c) => {
          const name = String(c.name || '').toLowerCase().trim();
          if (name.length < 4) return false;
          const parts = name.split(/\s+/).filter((p: string) => p.length >= 4);
          return parts.some((p: string) => text.includes(p));
        });
        if (matchedCustomer) {
          try {
            const summary = await summariseCustomer(supabase, userId, matchedCustomer.name);
            enrichedContext += `\n\n[PRE-FLIGHT — user mentioned ${matchedCustomer.name}, pre-loading full summary so you don't need to look it up]\n${summary}`;
          } catch (e) {
            console.warn('[preflight] summariseCustomer failed', e);
          }
        }
      }
    }

    const userTurnsAll = messages.filter((m: any) => m?.role === 'user');
    const turnRoute = routeTurn(
      String(userTurnsAll[userTurnsAll.length - 1]?.content ?? ''),
      String(userTurnsAll[userTurnsAll.length - 2]?.content ?? '')
    );

    // Pre-flight grounding for technical questions (see TECHNICAL_Q). A short
    // follow-up ("what about a ring?") carries the previous question with it.
    const groundingCitations: Citation[] = [];
    {
      if (turnRoute.route === 'technical') {
        const query = turnRoute.query;
        try {
          // Naming the regs: also search BS 7671 alone, so the regulation itself
          // isn't crowded out by guidance about it (voltage drop came back as
          // GN3 2.36, not Reg 525.202 / Appendix 4 §6.4).
          const namesRegs = /\b(bs ?7671|the regs|wiring regs|regulations?|regs?)\b/i.test(query);
          const boosts = TOPIC_BOOSTS.filter((b) => b.when.test(query)).slice(0, 2);
          // One embedding for the user's words, shared by both searches on
          // them; the boost queries are in the books' own words, which the
          // keyword half finds on its own (checked), so they skip the call.
          const q = query.slice(0, 600);
          const embedding = await generateLargeEmbedding(q, openAiKey).catch(() => null);
          const [general, regsOnly, ...boosted] = await Promise.all([
            searchFacets(supabase, { query: q, matchCount: 6, embedding, skipEmbedding: !embedding }),
            namesRegs
              ? searchFacets(supabase, {
                  query: q,
                  matchCount: 3,
                  documentTypes: ['bs7671'],
                  embedding,
                  skipEmbedding: !embedding,
                })
              : Promise.resolve([]),
            ...boosts.map((b) =>
              searchFacets(supabase, {
                query: b.query,
                matchCount: 2,
                documentTypes: b.docs,
                skipEmbedding: true,
              }).catch(() => [])
            ),
          ]);
          const seenContent = new Set<string>();
          const facets = [...boosted.flat(), ...regsOnly, ...general]
            .filter((f) => {
              const k = String(f.content ?? '').slice(0, 120);
              if (seenContent.has(k)) return false;
              seenContent.add(k);
              return true;
            })
            .slice(0, 10);
          if (facets.length) {
            enrichedContext +=
              `\n\n[GROUNDING — retrieved for this question from BS 7671, the On-Site Guide, GN3 and BS 5839-1. ` +
              `Base the technical answer on these. Cite only references that appear here (or in a search you run). ` +
              `If they don't settle the point, say what to check rather than giving a figure from memory.]\n` +
              formatFacetsForPrompt(facets);
            for (const f of facets) {
              const ref = citeRef(f);
              if (ref) groundingCitations.push({ ref, topic: f.primaryTopic || '' });
            }
          }
        } catch (e) {
          console.warn('[grounding] search failed', e);
        }
        if (DIVERSITY_Q.test(query)) {
          enrichedContext += `\n\n[VERIFIED TABLE]\n${tableA2ForPrompt()}`;
          groundingCitations.push({ ref: 'OSG Table A2', topic: 'Allowances for diversity' });
        }
      }
    }

    // How to use the app: the page guides and page index, plus account facts.
    {
      if (turnRoute.route === 'app') {
        const help = searchAppHelp(turnRoute.query);
        enrichedContext +=
          `\n\n[APP HELP — how Elec-Mate itself works, from the app's own page guides. ` +
          `For questions about using the app, answer from this: name the page and the real buttons in order. ` +
          `Never invent a button, setting or feature. If it isn't covered, say so and give info@elec-mate.com.]\n` +
          ACCOUNT_FACTS +
          (help ? `\n${help}` : '');
      }
    }

    const conversation: any[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'system', content: enrichedContext },
      ...messages,
    ];

    const citations: Citation[] = [...groundingCitations];

    // Conversation persistence — create on first turn, append on each.
    let conversationId: string | null = incomingConvId;
    if (userId) {
      if (!conversationId) {
        const firstUserMsg = messages.find((m: any) => m.role === 'user');
        const title =
          firstUserMsg?.content?.slice(0, 80).replace(/\s+/g, ' ').trim() || 'New chat';
        const { data: convRow } = await supabase
          .from('assistant_conversations')
          .insert({ user_id: userId, title })
          .select('id')
          .single();
        conversationId = convRow?.id ?? null;
      } else {
        await supabase
          .from('assistant_conversations')
          .update({ last_message_at: new Date().toISOString() })
          .eq('id', conversationId)
          .eq('user_id', userId);
      }

      // Persist just the last user message (others were saved on prior turns).
      const lastUser = [...messages].reverse().find((m: any) => m.role === 'user');
      if (lastUser && conversationId) {
        await supabase.from('assistant_messages').insert({
          conversation_id: conversationId,
          user_id: userId,
          role: 'user',
          content: lastUser.content || '',
        });
      }
    }

    // Search/lookup tools that DON'T mutate — model can call multiple rounds
    // before settling on action proposals. Mutation/clarification calls
    // terminate the loop.
    const LOOKUP_TOOLS = new Set([
      'search_bs7671',
      'search_practical_knowledge',
      'search_business_knowledge',
      'find_customer',
      'find_project',
      'find_documents',
      'find_past_pricing',
      'send_document',
      'create_quote',
      'create_invoice',
      'amend_quote',
      'amend_invoice',
      'query_outstanding_invoices',
      'query_pipeline_quotes',
      'summarise_customer',
      'plan_my_day',
      'find_similar_jobs',
      'check_stock',
      'upsert_stock_item',
      'adjust_stock',
      'delete_stock_item',
      'list_price_book',
      'upsert_price_book_item',
      'delete_price_book_item',
    ]);

    // ─── Streaming pipeline ───────────────────────────────────────────
    if (!wantsStream) {
      // Non-streaming fallback path (kept for legacy callers).
      const finalResp = await runToolLoopBuffered({
        conversation,
        openAiKey,
        supabase,
        userId,
        citations,
        LOOKUP_TOOLS,
        authHeader,
      });
      return await packageResponse(
        finalResp,
        citations,
        supabase,
        userId,
        conversationId,
        canEnquire,
        lastUserText
      );
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const send = (event: Record<string, unknown>) => {
          try {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
            );
          } catch {
            /* client disconnected — swallow */
          }
        };

        try {
          // Announce conversation id early so the client can store it.
          send({ type: 'conversation', conversationId });

          let assistantText = '';
          const collectedActions: any[] = [];
          let collectedClarification: any = null;
          // Tokens go to the client REPEAT_HOLD characters behind the model, so
          // an answer that starts over (see repeatStart) is cut before it shows.
          let shown = 0;
          let cutAt = -1;
          const forward = (final: boolean) => {
            if (cutAt < 0) {
              const k = repeatStart(assistantText);
              if (k > 0) cutAt = k;
            }
            const upto = cutAt > 0 ? cutAt : final ? assistantText.length : assistantText.length - REPEAT_HOLD;
            if (upto > shown) {
              send({ type: 'token', delta: assistantText.slice(shown, upto) });
              shown = upto;
            }
          };

          for (let round = 0; round < 5; round++) {
            const result = await callOpenAIStreaming({
              conversation,
              tools: TOOLS,
              openAiKey,
              onToken: (delta) => {
                assistantText += delta;
                forward(false);
              },
              onLookupStarted: (toolName) => {
                send({ type: 'lookup_started', tool: toolName });
              },
            });

            forward(true);
            if (cutAt > 0) assistantText = assistantText.slice(0, cutAt).trimEnd();
            shown = Math.min(shown, assistantText.length);

            // No tool calls → final text response, all tokens already streamed.
            if (!result.toolCalls.length) break;

            const lookupCalls = result.toolCalls.filter((c) =>
              LOOKUP_TOOLS.has(c.name)
            );
            const terminalCalls = result.toolCalls.filter(
              (c) => !LOOKUP_TOOLS.has(c.name)
            );

            // Mutation / clarification — emit and break.
            if (terminalCalls.length > 0) {
              const packaged = packageTerminalCalls(terminalCalls, canEnquire);
              packaged.actions = await dropExistingCustomers(
                ensureEnquiry(packaged.actions, lastUserText, canEnquire),
                supabase,
                userId
              );
              for (const action of packaged.actions) {
                send({ type: 'action', action });
                collectedActions.push(action);
              }
              if (packaged.clarification) {
                send({ type: 'clarification', clarification: packaged.clarification });
                collectedClarification = packaged.clarification;
              }
              if (!assistantText && (packaged.actions.length > 0 || packaged.clarification)) {
                // Synthesise a short framing line so the message isn't empty.
                assistantText = synthesiseFraming(packaged);
                send({ type: 'framing', text: assistantText });
              }
              {
                const tip = formTip(packaged.actions, lastUserText);
                if (tip && !assistantText.includes('Website form')) {
                  // As a token so every app build shows it (older ones too).
                  send({ type: 'token', delta: `\n\n${tip}` });
                  assistantText += `\n\n${tip}`;
                }
              }
              break;
            }

            // Lookup tools — execute, push results back, loop.
            conversation.push({
              role: 'assistant',
              content: null,
              tool_calls: result.toolCalls.map((c) => ({
                id: c.id,
                type: 'function',
                function: { name: c.name, arguments: c.args },
              })),
            });

            for (const call of lookupCalls) {
              send({ type: 'lookup_started', tool: call.name });
              const args = safeParse(call.args);
              let toolOutput = '';
              if (call.name === 'search_bs7671') {
                const facets = await searchFacets(supabase, {
                  query: args.query || '',
                  matchCount: 5,
                });
                for (const f of facets) {
                  const ref = citeRef(f);
                  if (ref) {
                    citations.push({
                      ref,
                      topic: f.primaryTopic || '',
                    });
                  }
                }
                toolOutput = formatFacetsForPrompt(facets);
              } else if (call.name === 'search_practical_knowledge') {
                toolOutput = await runPracticalKnowledgeSearch(supabase, args.query || '');
              } else if (call.name === 'find_documents') {
                toolOutput = await findDocuments(supabase, userId, {
                  query: args.query,
                  kind: args.kind,
                  status: args.status,
                  limit: args.limit,
                });
              } else if (call.name === 'send_document') {
                toolOutput = await sendDocument(authHeader, {
                  doc_type: args.doc_type,
                  doc_id: args.doc_id,
                  recipient_email: args.recipient_email,
                  custom_message: args.custom_message,
                  custom_subject: args.custom_subject,
                });
              } else if (call.name === 'create_quote') {
                toolOutput = await createQuote(supabase, userId, args);
              } else if (call.name === 'create_invoice') {
                toolOutput = await createInvoice(supabase, userId, args, authHeader);
              } else if (call.name === 'amend_quote') {
                toolOutput = await amendQuote(supabase, userId, args);
              } else if (call.name === 'amend_invoice') {
                toolOutput = await amendInvoice(supabase, userId, args);
              } else if (call.name === 'find_past_pricing') {
                toolOutput = await findPastPricing(supabase, userId, {
                  job_type: args.job_type || '',
                  limit: args.limit,
                });
              } else if (call.name === 'find_customer') {
                toolOutput = await searchCustomers(supabase, userId, args.query || '');
              } else if (call.name === 'find_project') {
                toolOutput = await searchProjects(supabase, userId, args.query || '');
              } else if (call.name === 'query_outstanding_invoices') {
                toolOutput = await queryOutstandingInvoices(
                  supabase,
                  userId,
                  args.overdueOnly === true,
                  args.limit || 20
                );
              } else if (call.name === 'query_pipeline_quotes') {
                toolOutput = await queryPipelineQuotes(supabase, userId, args.limit || 20);
              } else if (call.name === 'summarise_customer') {
                toolOutput = await summariseCustomer(supabase, userId, args.query || '');
              } else if (call.name === 'plan_my_day') {
                toolOutput = await planMyDay(supabase, userId, args.date || null);
              } else if (call.name === 'find_similar_jobs') {
                toolOutput = await findSimilarJobs(
                  supabase,
                  userId,
                  args.jobType || '',
                  args.limit || 3
                );
              } else if (call.name === 'check_stock') {
                toolOutput = await checkStock(supabase, userId, args);
              } else if (call.name === 'upsert_stock_item') {
                toolOutput = await upsertStockItem(supabase, userId, args);
              } else if (call.name === 'adjust_stock') {
                toolOutput = await adjustStock(supabase, userId, args);
              } else if (call.name === 'delete_stock_item') {
                toolOutput = await deleteStockItem(supabase, userId, args);
              } else if (call.name === 'list_price_book') {
                toolOutput = await listPriceBook(supabase, userId, args);
              } else if (call.name === 'upsert_price_book_item') {
                toolOutput = await upsertPriceBookItem(supabase, userId, args);
              } else if (call.name === 'delete_price_book_item') {
                toolOutput = await deletePriceBookItem(supabase, userId, args);
              }
              conversation.push({
                role: 'tool',
                tool_call_id: call.id,
                content: toolOutput,
              });
              send({ type: 'lookup_done', tool: call.name });
            }
          }

          // Dedupe + emit citations once.
          const seen = new Set<string>();
          const uniqCitations = citations.filter((c) => {
            if (seen.has(c.ref)) return false;
            seen.add(c.ref);
            return true;
          });
          if (uniqCitations.length > 0) {
            send({ type: 'citations', citations: uniqCitations });
          }

          {
            const note = await regCheckNote(supabase, assistantText);
            if (note) {
              send({ type: 'token', delta: `\n\n${note}` });
              assistantText += `\n\n${note}`;
            }
          }

          // Persist assistant reply on the conversation.
          if (userId && conversationId) {
            await supabase.from('assistant_messages').insert({
              conversation_id: conversationId,
              user_id: userId,
              role: 'assistant',
              content: assistantText,
              citations: uniqCitations.length > 0 ? uniqCitations : null,
              actions: collectedActions.length > 0 ? collectedActions : null,
              clarification: collectedClarification,
            });
          }

          send({
            type: 'done',
            conversationId,
            assistantMessage: assistantText,
          });
        } catch (err) {
          console.error('[tasks-ai-assistant] stream error', err);
          await captureException(err, { functionName: 'tasks-ai-assistant' });
          send({
            type: 'error',
            message: err instanceof Error ? err.message : 'unknown',
          });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, { headers: SSE_HEADERS });
  } catch (err) {
    console.error('[tasks-ai-assistant] setup error', err);
    await captureException(err, { functionName: 'tasks-ai-assistant' });
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : 'unknown',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

interface StreamedToolCall {
  id: string;
  name: string;
  args: string;
}

/**
 * Streaming call to OpenAI. Forwards text tokens via onToken as they arrive.
 * Tool calls accumulate (they stream as deltas) and are returned when the
 * stream completes. The caller decides whether to execute them and loop or
 * package them as terminal actions.
 */
async function callOpenAIStreaming({
  conversation,
  tools,
  openAiKey,
  onToken,
  onLookupStarted: _onLookupStarted,
}: {
  conversation: any[];
  tools: any[];
  openAiKey: string;
  onToken: (delta: string) => void;
  onLookupStarted?: (toolName: string) => void;
}): Promise<{ textContent: string; toolCalls: StreamedToolCall[] }> {
  // NOTE: reasoning_effort is NOT supported by gpt-5.5 + function tools on
  // /v1/chat/completions — OpenAI requires /v1/responses for that combo.
  // We keep Chat Completions for now (streaming + tool-loop shape is built
  // around it). Migrating to Responses API is tracked as a separate piece
  // of work — it would unlock reasoning_effort: 'high'.
  const body = {
    model: 'gpt-5.4-mini-2026-03-17',
    messages: conversation,
    tools,
    stream: true,
    // Trimmed from 24000 — chat replies don't need a huge generation budget,
    // and the smaller cap cuts per-round latency that was timing out quotes. (ELE-1014)
    max_completion_tokens: 8000,
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openAiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok || !response.body) {
    const errText = await response.text();
    throw new Error(`OpenAI ${response.status}: ${errText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let textContent = '';
  const toolCallsByIndex = new Map<number, StreamedToolCall>();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line.startsWith('data:')) continue;
      const payload = line.slice(5).trim();
      if (payload === '[DONE]') continue;
      let event: any;
      try {
        event = JSON.parse(payload);
      } catch {
        continue;
      }
      const delta = event.choices?.[0]?.delta;
      if (!delta) continue;

      if (typeof delta.content === 'string' && delta.content.length > 0) {
        textContent += delta.content;
        onToken(delta.content);
      }
      if (Array.isArray(delta.tool_calls)) {
        for (const tc of delta.tool_calls) {
          const idx = tc.index ?? 0;
          if (!toolCallsByIndex.has(idx)) {
            toolCallsByIndex.set(idx, { id: '', name: '', args: '' });
          }
          const entry = toolCallsByIndex.get(idx)!;
          if (tc.id) entry.id = tc.id;
          if (tc.function?.name) entry.name = tc.function.name;
          if (tc.function?.arguments) entry.args += tc.function.arguments;
        }
      }
    }
  }

  return {
    textContent,
    toolCalls: Array.from(toolCallsByIndex.values()).filter((c) => c.name),
  };
}

/**
 * Convert terminal (mutating / clarifying) tool calls into proposed actions
 * + clarification object. Mirrors the synchronous packageResponse mapping.
 */
function packageTerminalCalls(
  calls: StreamedToolCall[],
  canEnquire = false
): { actions: any[]; clarification: any | null } {
  const actions: any[] = [];
  let clarification: any = null;

  for (const call of calls) {
    const args = safeParse(call.args);
    const name = call.name;

    if (name === 'ask_clarification') {
      clarification = {
        question: args.question || '',
        context: args.context || null,
        options: Array.isArray(args.options) ? args.options : [],
        allowFreeText: args.allowFreeText !== false,
      };
    } else if (name === 'create_tasks') {
      for (const t of args.tasks || []) {
        const { rationale, ...rest } = t || {};
        actions.push({
          type: 'create-task',
          tempId: crypto.randomUUID(),
          payload: rest,
          rationale,
        });
      }
    } else if (name === 'create_snags') {
      for (const s of args.snags || []) {
        const { rationale, ...rest } = s || {};
        const tags = Array.isArray(rest.tags)
          ? Array.from(new Set([...(rest.tags as string[]), 'snagging']))
          : ['snagging'];
        actions.push({
          type: 'create-snag',
          tempId: crypto.randomUUID(),
          payload: { ...rest, tags },
          rationale,
        });
      }
    } else if (name === 'create_projects') {
      for (const p of args.projects || []) {
        const { rationale, ...rest } = p || {};
        actions.push({
          type: 'create-project',
          tempId: crypto.randomUUID(),
          payload: rest,
          rationale,
        });
      }
    } else if (name === 'create_customers') {
      for (const c of args.customers || []) {
        const { rationale, ...rest } = c || {};
        actions.push({
          type: 'create-customer',
          tempId: crypto.randomUUID(),
          payload: rest,
          rationale,
        });
      }
    } else if (name === 'create_enquiries') {
      for (const e of args.enquiries || []) {
        const { rationale, ...rest } = e || {};
        actions.push(enquiryAction(rest, rationale, canEnquire));
      }
    } else if (name === 'amend_task') {
      actions.push({
        type: 'amend-task',
        id: args.id,
        patch: args.patch || {},
        rationale: args.rationale,
      });
    } else if (name === 'amend_project') {
      actions.push({
        type: 'amend-project',
        id: args.id,
        patch: args.patch || {},
        rationale: args.rationale,
      });
    } else if (name === 'amend_customer') {
      actions.push({
        type: 'amend-customer',
        id: args.id,
        patch: args.patch || {},
        rationale: args.rationale,
      });
    } else if (name === 'complete_task') {
      actions.push({ type: 'complete-task', id: args.id });
    } else if (name === 'complete_project') {
      actions.push({ type: 'complete-project', id: args.id });
    } else if (name === 'delete_task') {
      actions.push({ type: 'delete-task', id: args.id });
    } else if (name === 'delete_project') {
      actions.push({ type: 'delete-project', id: args.id });
    } else if (name === 'delete_customer') {
      actions.push({ type: 'delete-customer', id: args.id });
    } else if (name === 'add_materials') {
      for (const m of args.materials || []) {
        if (!m?.name) continue;
        actions.push({
          type: 'add-material',
          tempId: crypto.randomUUID(),
          payload: {
            projectId: args.project_id,
            name: m.name,
            quantity: m.quantity,
            unit: m.unit,
            unitPrice: m.unit_price,
          },
          rationale: m.rationale || args.rationale,
        });
      }
    } else if (name === 'draft_invoice') {
      actions.push({
        type: 'draft-invoice',
        tempId: crypto.randomUUID(),
        payload: { projectId: args.project_id },
        rationale: args.rationale,
      });
    } else if (name === 'draft_chase_email') {
      actions.push({
        type: 'draft-message',
        tempId: crypto.randomUUID(),
        payload: {
          to: args.to,
          toName: args.toName,
          subject: args.subject,
          body: args.body,
          invoiceId: args.invoiceId,
          quoteId: args.quoteId,
          customerId: args.customerId,
          purpose: args.purpose || 'general',
        },
        rationale: args.rationale,
      });
    }
  }

  return { actions, clarification };
}

function synthesiseFraming({
  actions,
  clarification,
}: {
  actions: any[];
  clarification: any | null;
}): string {
  if (clarification) {
    return clarification.context || 'Quick question first.';
  }
  const counts: Record<string, number> = {};
  for (const a of actions) counts[a.type] = (counts[a.type] || 0) + 1;
  const bits: string[] = [];
  if (counts['create-task'])
    bits.push(`${counts['create-task']} task${counts['create-task'] > 1 ? 's' : ''}`);
  if (counts['create-snag'])
    bits.push(`${counts['create-snag']} snag${counts['create-snag'] > 1 ? 's' : ''}`);
  if (counts['create-project'])
    bits.push(`${counts['create-project']} project${counts['create-project'] > 1 ? 's' : ''}`);
  if (counts['create-customer'])
    bits.push(
      `${counts['create-customer']} customer${counts['create-customer'] > 1 ? 's' : ''}`
    );
  if (counts['create-enquiry'])
    bits.push(`${counts['create-enquiry']} enquir${counts['create-enquiry'] > 1 ? 'ies' : 'y'}`);
  if (counts['add-material'])
    bits.push(`${counts['add-material']} material${counts['add-material'] > 1 ? 's' : ''}`);
  if (counts['draft-invoice']) bits.push('invoice to draft');
  if (counts['draft-message']) bits.push('draft email');
  const amends =
    (counts['amend-task'] || 0) +
    (counts['amend-project'] || 0) +
    (counts['amend-customer'] || 0);
  if (amends) bits.push(`${amends} update${amends > 1 ? 's' : ''}`);
  const completes = (counts['complete-task'] || 0) + (counts['complete-project'] || 0);
  if (completes) bits.push(`${completes} to mark done`);
  const deletes =
    (counts['delete-task'] || 0) +
    (counts['delete-project'] || 0) +
    (counts['delete-customer'] || 0);
  if (deletes) bits.push(`${deletes} to delete`);
  return bits.length > 0
    ? `Proposing ${bits.join(' · ')}. Review and apply below.`
    : 'Done.';
}

/** Legacy buffered tool loop — kept for non-streaming callers. */
async function runToolLoopBuffered({
  conversation,
  openAiKey,
  supabase,
  userId,
  citations,
  LOOKUP_TOOLS,
  authHeader,
}: {
  conversation: any[];
  openAiKey: string;
  supabase: any;
  userId: string | null;
  citations: Citation[];
  LOOKUP_TOOLS: Set<string>;
  authHeader: string | null;
}): Promise<{ content: string; toolCalls: any[] }> {
  let aiResp = await callOpenAI(
    { messages: conversation, tools: TOOLS, model: 'gpt-5.4-mini-2026-03-17' },
    openAiKey,
    60000
  );
  for (let round = 0; round < 5; round++) {
    if (!aiResp.toolCalls?.length) break;
    const lookupCalls = aiResp.toolCalls.filter((c: any) =>
      LOOKUP_TOOLS.has(c.function.name)
    );
    const terminalCalls = aiResp.toolCalls.filter(
      (c: any) => !LOOKUP_TOOLS.has(c.function.name)
    );
    if (terminalCalls.length > 0) return aiResp;
    conversation.push({
      role: 'assistant',
      content: null,
      tool_calls: aiResp.toolCalls,
    });
    for (const call of lookupCalls) {
      const args = safeParse(call.function.arguments);
      const toolName = call.function.name;
      let toolOutput = '';
      if (toolName === 'search_bs7671') {
        const facets = await searchFacets(supabase, {
          query: args.query || '',
          matchCount: 5,
        });
        for (const f of facets) {
          const ref = citeRef(f);
          if (ref) citations.push({ ref, topic: f.primaryTopic || '' });
        }
        toolOutput = formatFacetsForPrompt(facets);
      } else if (toolName === 'search_practical_knowledge') {
        toolOutput = await runPracticalKnowledgeSearch(supabase, args.query || '');
      } else if (toolName === 'search_business_knowledge') {
        toolOutput = await runBusinessKnowledgeSearch(supabase, args.query || '', args.domain);
      } else if (toolName === 'find_documents') {
        toolOutput = await findDocuments(supabase, userId, {
          query: args.query,
          kind: args.kind,
          status: args.status,
          limit: args.limit,
        });
      } else if (toolName === 'send_document') {
        toolOutput = await sendDocument(authHeader, {
          doc_type: args.doc_type,
          doc_id: args.doc_id,
          recipient_email: args.recipient_email,
          custom_message: args.custom_message,
          custom_subject: args.custom_subject,
        });
      } else if (toolName === 'create_quote') {
        toolOutput = await createQuote(supabase, userId, args);
      } else if (toolName === 'create_invoice') {
        toolOutput = await createInvoice(supabase, userId, args, authHeader);
      } else if (toolName === 'amend_quote') {
        toolOutput = await amendQuote(supabase, userId, args);
      } else if (toolName === 'amend_invoice') {
        toolOutput = await amendInvoice(supabase, userId, args);
      } else if (toolName === 'find_past_pricing') {
        toolOutput = await findPastPricing(supabase, userId, {
          job_type: args.job_type || '',
          limit: args.limit,
        });
      } else if (toolName === 'find_customer') {
        toolOutput = await searchCustomers(supabase, userId, args.query || '');
      } else if (toolName === 'find_project') {
        toolOutput = await searchProjects(supabase, userId, args.query || '');
      } else if (toolName === 'query_outstanding_invoices') {
        toolOutput = await queryOutstandingInvoices(
          supabase,
          userId,
          args.overdueOnly === true,
          args.limit || 20
        );
      } else if (toolName === 'query_pipeline_quotes') {
        toolOutput = await queryPipelineQuotes(supabase, userId, args.limit || 20);
      } else if (toolName === 'summarise_customer') {
        toolOutput = await summariseCustomer(supabase, userId, args.query || '');
      } else if (toolName === 'plan_my_day') {
        toolOutput = await planMyDay(supabase, userId, args.date || null);
      } else if (toolName === 'find_similar_jobs') {
        toolOutput = await findSimilarJobs(
          supabase,
          userId,
          args.jobType || '',
          args.limit || 3
        );
      } else if (toolName === 'check_stock') {
        toolOutput = await checkStock(supabase, userId, args);
      } else if (toolName === 'upsert_stock_item') {
        toolOutput = await upsertStockItem(supabase, userId, args);
      } else if (toolName === 'adjust_stock') {
        toolOutput = await adjustStock(supabase, userId, args);
      } else if (toolName === 'delete_stock_item') {
        toolOutput = await deleteStockItem(supabase, userId, args);
      } else if (toolName === 'list_price_book') {
        toolOutput = await listPriceBook(supabase, userId, args);
      } else if (toolName === 'upsert_price_book_item') {
        toolOutput = await upsertPriceBookItem(supabase, userId, args);
      } else if (toolName === 'delete_price_book_item') {
        toolOutput = await deletePriceBookItem(supabase, userId, args);
      }
      conversation.push({
        role: 'tool',
        tool_call_id: call.id,
        content: toolOutput,
      });
    }
    aiResp = await callOpenAI(
      { messages: conversation, tools: TOOLS, model: 'gpt-5.4-mini-2026-03-17' },
      openAiKey,
      60000
    );
  }
  return aiResp;
}

function safeParse(s: string): any {
  try {
    return JSON.parse(s || '{}');
  } catch {
    return {};
  }
}

/**
 * Employer Knowledge search — the business side of running an electrical firm.
 *
 * The corpus (2,896 rows) already backed the Employer Hub assistant, but the
 * Electrical Hub's Business Mate had no route to it, so a sole trader asking
 * about JIB rates, CIS reverse charge or CDM duties got an ungrounded answer
 * while an employer asking the same question got a sourced one.
 *
 * Domains: costing (JIB 2026 working rules), hr-employment (ACAS),
 * health-safety (HSE L153 CDM 2015, HSG85), business-ops (CIS/VAT),
 * tendering (Construction Playbook), construction-commercial (adjudication),
 * project-mgmt (APM BoK), apprenticeships, electrical-business.
 *
 * Unlike the task planner — which filters to health-safety so an EV install
 * does not attract ACAS grievance procedure — the whole corpus is in scope
 * here, because commercial and employment questions are this assistant's job.
 */
async function runBusinessKnowledgeSearch(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  query: string,
  domain?: string
): Promise<string> {
  if (!query.trim()) return 'No query supplied.';
  try {
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) return 'Business knowledge search unavailable.';
    // search_employer_knowledge requires an embedding — there is no keyword-only
    // path, so a failed embedding means no grounding rather than weak grounding.
    const embedding = await generateLargeEmbedding(query, apiKey);
    const { data, error } = await supabase.rpc('search_employer_knowledge', {
      query_embedding: embedding,
      query_text: query,
      match_count: 6,
      filter_domain: domain ?? null,
    });
    if (error) {
      console.error('[search_business_knowledge] rpc error', error);
      return 'Business knowledge search failed.';
    }
    if (!data?.length) return 'No business guidance matched that query.';
    return (data as { topic?: string; domain?: string; content?: string }[])
      .map((r, i) => {
        const head = [r.topic, r.domain].filter(Boolean).join(' · ') || 'Business guidance';
        return `[${i + 1}] ${head}\n${(r.content ?? '').replace(/\s+/g, ' ').slice(0, 900)}`;
      })
      .join('\n\n');
  } catch (err) {
    console.error('[search_business_knowledge] error', err);
    return 'Business knowledge search failed.';
  }
}

async function runPracticalKnowledgeSearch(
  supabase: any,
  query: string
): Promise<string> {
  if (!query.trim()) return 'No query supplied.';
  try {
    const result = await searchPracticalWorkIntelligence(supabase, {
      query,
      matchCount: 6,
    });
    if (!result.results.length) {
      return 'No practical-work guidance matched that query.';
    }
    return result.results
      .map((r, i) => {
        const lines: string[] = [];
        lines.push(`[${i + 1}] ${r.primary_topic || 'Practical guidance'}`);
        if (r.equipment_category) lines.push(`Equipment: ${r.equipment_category}`);
        if (r.tools_required?.length) lines.push(`Tools: ${r.tools_required.join(', ')}`);
        if (r.cable_sizes?.length) lines.push(`Cable sizes: ${r.cable_sizes.join(', ')}`);
        if (r.power_ratings?.length) lines.push(`Power: ${r.power_ratings.join(', ')}`);
        if (r.location_types?.length) lines.push(`Locations: ${r.location_types.join(', ')}`);
        if (r.bs7671_regulations?.length)
          lines.push(`BS 7671 refs: ${r.bs7671_regulations.join(', ')}`);
        if (r.expected_results) lines.push(`Expected: ${r.expected_results}`);
        lines.push(r.content);
        return lines.join('\n');
      })
      .join('\n\n');
  } catch (err) {
    console.error('[search_practical_knowledge] error', err);
    return 'Practical knowledge lookup failed — proceed without it and tell the user honestly.';
  }
}

async function searchCustomers(
  supabase: any,
  userId: string | null,
  query: string
): Promise<string> {
  if (!userId || !query?.trim()) return '[no userId or query]';
  const { data, error } = await supabase
    .from('customers')
    .select('id, name, email, phone, address')
    .eq('user_id', userId)
    .or(`name.ilike.%${query}%,email.ilike.%${query}%`)
    .limit(8);
  if (error) {
    console.error('[find_customer] error', error);
    return '[search failed]';
  }
  if (!data || data.length === 0) return `[no customers matching "${query}"]`;
  return data
    .map(
      (c: any, i: number) =>
        `${i + 1}. id=${c.id} · ${c.name}${c.phone ? ` · ${c.phone}` : ''}${c.email ? ` · ${c.email}` : ''}${c.address ? ` · ${c.address}` : ''}`
    )
    .join('\n');
}

// ─── Stock Inventory + Price Book handlers (ELE-1013/1017) ──────────────────

async function checkStock(supabase: any, userId: string | null, args: any): Promise<string> {
  if (!userId) return '[no userId]';
  let q = supabase
    .from('personal_inventory')
    .select('id, name, quantity, unit, location, low_stock_threshold, unit_cost, supplier')
    .eq('user_id', userId)
    .order('name', { ascending: true })
    .limit(Number(args?.limit) || 25);
  if (args?.query?.trim()) q = q.or(`name.ilike.%${args.query}%,supplier.ilike.%${args.query}%`);
  const { data, error } = await q;
  if (error) {
    console.error('[check_stock]', error);
    return '[lookup failed]';
  }
  let rows = data || [];
  if (args?.lowOnly) {
    rows = rows.filter(
      (r: any) => r.low_stock_threshold != null && Number(r.quantity) <= Number(r.low_stock_threshold)
    );
  }
  if (!rows.length) return args?.query ? `[no stock items matching "${args.query}"]` : '[no stock items]';
  return rows
    .map((r: any, i: number) => {
      const low = r.low_stock_threshold != null && Number(r.quantity) <= Number(r.low_stock_threshold);
      return `${i + 1}. id=${r.id} · ${r.name} · ${r.quantity} ${r.unit} in ${r.location}${low ? ' · LOW STOCK' : ''}${r.unit_cost != null ? ` · £${r.unit_cost}/unit` : ''}${r.supplier ? ` · ${r.supplier}` : ''}`;
    })
    .join('\n');
}

async function upsertStockItem(supabase: any, userId: string | null, args: any): Promise<string> {
  if (!userId) return '[no userId]';
  const fields: any = {};
  if (args?.name != null) fields.name = String(args.name).trim();
  if (args?.quantity != null) fields.quantity = Number(args.quantity);
  if (args?.unit != null) fields.unit = String(args.unit);
  if (args?.location != null) fields.location = String(args.location);
  if (args?.unit_cost != null) fields.unit_cost = Number(args.unit_cost);
  if (args?.supplier != null) fields.supplier = String(args.supplier);
  if (args?.low_stock_threshold != null) fields.low_stock_threshold = Number(args.low_stock_threshold);
  if (args?.category != null) fields.category = String(args.category);

  if (args?.id) {
    if (Object.keys(fields).length === 0) return '[nothing to update]';
    const { data, error } = await supabase
      .from('personal_inventory')
      .update(fields)
      .eq('id', args.id)
      .eq('user_id', userId)
      .select('id, name, quantity, unit')
      .maybeSingle();
    if (error) {
      console.error('[upsert_stock_item:update]', error);
      return '[update failed]';
    }
    if (!data) return `[no stock item with id ${args.id}]`;
    return `Updated stock: ${data.name} → ${data.quantity} ${data.unit}`;
  }

  if (!fields.name) return '[name required to add a new stock item]';
  const { data, error } = await supabase
    .from('personal_inventory')
    .insert({ user_id: userId, ...fields })
    .select('id, name, quantity, unit')
    .single();
  if (error) {
    console.error('[upsert_stock_item:insert]', error);
    return '[add failed]';
  }
  return `Added to stock: ${data.name} · ${data.quantity} ${data.unit} (id=${data.id})`;
}

async function adjustStock(supabase: any, userId: string | null, args: any): Promise<string> {
  if (!userId) return '[no userId]';
  const d = Number(args?.delta);
  if (!Number.isFinite(d) || d === 0) return '[delta must be a non-zero number]';

  let item: any = null;
  if (args?.id) {
    const { data } = await supabase
      .from('personal_inventory')
      .select('id, name, quantity, unit')
      .eq('id', args.id)
      .eq('user_id', userId)
      .maybeSingle();
    item = data;
  } else if (args?.name?.trim()) {
    const { data } = await supabase
      .from('personal_inventory')
      .select('id, name, quantity, unit')
      .eq('user_id', userId)
      .ilike('name', `%${args.name}%`)
      .limit(3);
    if (data && data.length > 1) {
      return `[multiple stock items match "${args.name}" — specify id: ${data.map((x: any) => `${x.name}(${x.id})`).join(', ')}]`;
    }
    item = data?.[0] || null;
  }
  if (!item) return '[stock item not found]';

  const newQty = Math.max(0, Number(item.quantity) + d);
  const update: any = { quantity: newQty };
  if (d < 0) update.last_used_date = new Date().toISOString().slice(0, 10);
  const { error } = await supabase
    .from('personal_inventory')
    .update(update)
    .eq('id', item.id)
    .eq('user_id', userId);
  if (error) {
    console.error('[adjust_stock]', error);
    return '[adjust failed]';
  }
  return `${item.name}: ${item.quantity} → ${newQty} ${item.unit} (${d > 0 ? '+' : ''}${d})`;
}

async function deleteStockItem(supabase: any, userId: string | null, args: any): Promise<string> {
  if (!userId || !args?.id) return '[id required]';
  const { data, error } = await supabase
    .from('personal_inventory')
    .delete()
    .eq('id', args.id)
    .eq('user_id', userId)
    .select('name')
    .maybeSingle();
  if (error) {
    console.error('[delete_stock_item]', error);
    return '[delete failed]';
  }
  if (!data) return `[no stock item with id ${args.id}]`;
  return `Deleted from stock: ${data.name}`;
}

async function listPriceBook(supabase: any, userId: string | null, args: any): Promise<string> {
  if (!userId) return '[no userId]';
  const { data, error } = await supabase
    .from('materials_lists')
    .select('id, name, items')
    .eq('user_id', userId);
  if (error) {
    console.error('[list_price_book]', error);
    return '[lookup failed]';
  }
  const query = (args?.query || '').toLowerCase().trim();
  const limit = Number(args?.limit) || 30;
  const out: string[] = [];
  for (const list of data || []) {
    for (const it of list.items || []) {
      if (query && !String(it.name || '').toLowerCase().includes(query)) continue;
      out.push(
        `${it.name} · sell £${it.estimated_price ?? '?'}${it.cost_price != null ? ` · cost £${it.cost_price}` : ''}${it.markup_percent != null ? ` · ${it.markup_percent}%` : ''} · ${it.unit || 'each'}${it.supplier ? ` · ${it.supplier}` : ''}${it.personal_inventory_id ? ` · stock_item_id=${it.personal_inventory_id}` : ''} · list="${list.name}" · item_id=${it.id} · list_id=${list.id}`
      );
      if (out.length >= limit) break;
    }
    if (out.length >= limit) break;
  }
  if (!out.length) return query ? `[no price-book items matching "${args.query}"]` : '[price book is empty]';
  return out.map((l, i) => `${i + 1}. ${l}`).join('\n');
}

async function upsertPriceBookItem(supabase: any, userId: string | null, args: any): Promise<string> {
  if (!userId) return '[no userId]';
  const name = args?.name != null ? String(args.name).trim() : undefined;
  const cost = args?.cost_price != null ? Number(args.cost_price) : undefined;
  const markup = args?.markup_percent != null ? Number(args.markup_percent) : undefined;
  let sell = args?.sell_price != null ? Number(args.sell_price) : undefined;
  if (sell == null && cost != null) sell = Math.round(cost * (1 + (markup ?? 0) / 100) * 100) / 100;

  // AMEND existing item
  if (args?.item_id && args?.list_id) {
    const { data: list } = await supabase
      .from('materials_lists')
      .select('id, items')
      .eq('id', args.list_id)
      .eq('user_id', userId)
      .maybeSingle();
    if (!list) return `[no list with id ${args.list_id}]`;
    const items = list.items || [];
    const idx = items.findIndex((x: any) => x.id === args.item_id);
    if (idx < 0) return `[no item ${args.item_id} in that list]`;
    items[idx] = {
      ...items[idx],
      ...(name != null ? { name } : {}),
      ...(args.unit != null ? { unit: String(args.unit) } : {}),
      ...(args.supplier != null ? { supplier: String(args.supplier) } : {}),
      ...(cost != null ? { cost_price: cost } : {}),
      ...(markup != null ? { markup_percent: markup } : {}),
      ...(sell != null ? { estimated_price: sell } : {}),
      ...(args.stock_item_id !== undefined
        ? { personal_inventory_id: args.stock_item_id ? String(args.stock_item_id) : undefined }
        : {}),
      price_updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('materials_lists').update({ items }).eq('id', list.id).eq('user_id', userId);
    if (error) {
      console.error('[upsert_price_book_item:amend]', error);
      return '[update failed]';
    }
    return `Updated price-book item: ${items[idx].name} → sell £${items[idx].estimated_price ?? '?'}`;
  }

  // ADD new item
  if (!name) return '[name required to add a price-book item]';
  if (sell == null) return '[provide sell_price, or cost_price (with optional markup_percent)]';
  const { data: lists } = await supabase
    .from('materials_lists')
    .select('id, name, items')
    .eq('user_id', userId);
  let target =
    (lists || []).find((l: any) => l.id === args?.list_id) ||
    (lists || []).find((l: any) => String(l.name).toLowerCase() === 'price book') ||
    (lists || [])[0];
  if (!target) {
    const { data: created, error: ce } = await supabase
      .from('materials_lists')
      .insert({ user_id: userId, name: 'Price Book', items: [] })
      .select('id, name, items')
      .single();
    if (ce) {
      console.error('[upsert_price_book_item:createlist]', ce);
      return '[could not create a price-book list]';
    }
    target = created;
  }
  const newItem: any = {
    id: crypto.randomUUID(),
    name,
    quantity: 1,
    unit: args?.unit ? String(args.unit) : 'each',
    estimated_price: sell,
    ...(cost != null ? { cost_price: cost } : {}),
    ...(markup != null ? { markup_percent: markup } : {}),
    ...(args?.supplier != null ? { supplier: String(args.supplier) } : {}),
    ...(args?.stock_item_id ? { personal_inventory_id: String(args.stock_item_id) } : {}),
    matched: false,
    added_at: new Date().toISOString(),
    price_updated_at: new Date().toISOString(),
  };
  const items = [...(target.items || []), newItem];
  const { error } = await supabase.from('materials_lists').update({ items }).eq('id', target.id).eq('user_id', userId);
  if (error) {
    console.error('[upsert_price_book_item:add]', error);
    return '[add failed]';
  }
  return `Added to price book ("${target.name}"): ${name} · sell £${sell} (item_id=${newItem.id}, list_id=${target.id})`;
}

async function deletePriceBookItem(supabase: any, userId: string | null, args: any): Promise<string> {
  if (!userId || !args?.item_id || !args?.list_id) return '[item_id and list_id required]';
  const { data: list } = await supabase
    .from('materials_lists')
    .select('id, items')
    .eq('id', args.list_id)
    .eq('user_id', userId)
    .maybeSingle();
  if (!list) return `[no list with id ${args.list_id}]`;
  const items = list.items || [];
  const item = items.find((x: any) => x.id === args.item_id);
  if (!item) return `[no item ${args.item_id} in that list]`;
  const next = items.filter((x: any) => x.id !== args.item_id);
  const { error } = await supabase.from('materials_lists').update({ items: next }).eq('id', list.id).eq('user_id', userId);
  if (error) {
    console.error('[delete_price_book_item]', error);
    return '[delete failed]';
  }
  return `Deleted price-book item: ${item.name}`;
}

async function queryOutstandingInvoices(
  supabase: any,
  userId: string | null,
  overdueOnly: boolean,
  limit: number
): Promise<string> {
  if (!userId) return '[no userId]';
  const today = new Date().toISOString().split('T')[0];
  // Invoice truth: real invoices are QUOTES rows with invoice_raised=true —
  // the `invoices` table is mostly deposit invoices. Query both (same union
  // as get_jobs_overview / the FE), and report the outstanding BALANCE where
  // partial payments have been recorded, never just the total.
  let q = supabase
    .from('quotes')
    .select(
      'id, invoice_number, client_data, total, total_paid, partial_payments, invoice_due_date, invoice_status'
    )
    .eq('user_id', userId)
    .eq('invoice_raised', true)
    .not('invoice_status', 'in', '("paid","cancelled")')
    .is('deleted_at', null)
    .order('invoice_due_date', { ascending: true, nullsFirst: false })
    .limit(limit);
  if (overdueOnly) q = q.lt('invoice_due_date', today);
  const { data, error } = await q;
  if (error) {
    console.error('[query_outstanding_invoices]', error);
    return '[query failed]';
  }
  let depositRows: any[] = [];
  {
    let dq = supabase
      .from('invoices')
      .select('id, invoice_number, client_data, total, due_date, status, paid_at, quote_id, deposit_for_quote')
      .eq('user_id', userId)
      .is('paid_at', null)
      .not('status', 'in', '("paid","Paid","cancelled","Cancelled")')
      .order('due_date', { ascending: true })
      .limit(limit);
    if (overdueOnly) dq = dq.lt('due_date', today);
    const { data: deposits } = await dq;
    // Keep only rows that aren't shadows of a quote-invoice (deposits etc.).
    depositRows = (deposits || []).filter((r: any) => r.deposit_for_quote || !r.quote_id);
  }
  const rows = [
    ...(data || []).map((inv: any) => {
      const paidSum = Array.isArray(inv.partial_payments)
        ? inv.partial_payments.reduce((s: number, pp: any) => s + (Number(pp?.amount) || 0), 0)
        : 0;
      const paid = Math.max(Number(inv.total_paid) || 0, paidSum);
      return {
        id: inv.id,
        number: inv.invoice_number,
        client: inv.client_data,
        total: Number(inv.total) || 0,
        paid,
        due: inv.invoice_due_date,
        status: inv.invoice_status || 'sent',
      };
    }),
    ...depositRows.map((inv: any) => ({
      id: inv.id,
      number: inv.invoice_number,
      client: inv.client_data,
      total: Number(inv.total) || 0,
      paid: 0,
      due: inv.due_date,
      status: `${inv.status || 'unpaid'}${inv.deposit_for_quote ? ' (deposit)' : ''}`,
    })),
  ].filter((r) => r.total - r.paid > 0.005 || r.total === 0);
  if (rows.length === 0) return '[no unpaid invoices]';
  return rows
    .slice(0, limit)
    .map((inv, i) => {
      const clientName = inv.client?.name || inv.client?.clientName || 'Unknown';
      const clientEmail = inv.client?.email || '';
      const due = inv.due ? String(inv.due).split('T')[0] : 'no due date';
      const daysOverdue = inv.due
        ? Math.floor((Date.now() - new Date(inv.due).getTime()) / 86400000)
        : null;
      const overdueTag = daysOverdue && daysOverdue > 0 ? ` · ${daysOverdue}d OVERDUE` : '';
      const outstanding = Math.max(0, inv.total - inv.paid);
      const moneyBit =
        inv.paid > 0
          ? `£${outstanding.toFixed(2)} outstanding of £${inv.total} (£${inv.paid.toFixed(2)} paid)`
          : `£${inv.total}`;
      return `${i + 1}. id=${inv.id} · #${inv.number} · ${clientName}${clientEmail ? ` <${clientEmail}>` : ''} · ${moneyBit} · due ${due}${overdueTag} · status=${inv.status}`;
    })
    .join('\n');
}

async function queryPipelineQuotes(
  supabase: any,
  userId: string | null,
  limit: number
): Promise<string> {
  if (!userId) return '[no userId]';
  const { data, error } = await supabase
    .from('quotes')
    .select('id, quote_number, client_data, total, status, expiry_date, created_at')
    .eq('user_id', userId)
    .eq('status', 'sent')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.error('[query_pipeline_quotes]', error);
    return '[query failed]';
  }
  if (!data || data.length === 0) return '[no quotes out for response]';
  return data
    .map((q: any, i: number) => {
      const clientName = q.client_data?.name || q.client_data?.clientName || 'Unknown';
      const clientEmail = q.client_data?.email || '';
      const sentDate = String(q.created_at).split('T')[0];
      const daysOut = Math.floor((Date.now() - new Date(q.created_at).getTime()) / 86400000);
      const expires = q.expiry_date ? ` · expires ${String(q.expiry_date).split('T')[0]}` : '';
      return `${i + 1}. id=${q.id} · #${q.quote_number} · ${clientName}${clientEmail ? ` <${clientEmail}>` : ''} · £${q.total} · sent ${sentDate} (${daysOut}d ago)${expires}`;
    })
    .join('\n');
}

async function summariseCustomer(
  supabase: any,
  userId: string | null,
  query: string
): Promise<string> {
  if (!userId || !query?.trim()) return '[no userId or query]';

  // 1. Resolve the customer
  const { data: matches } = await supabase
    .from('customers')
    .select('id, name, email, phone, address, notes')
    .eq('user_id', userId)
    .ilike('name', `%${query}%`)
    .limit(3);

  if (!matches || matches.length === 0) {
    return `[no customer found matching "${query}"]`;
  }
  if (matches.length > 1) {
    return (
      `[multiple customers matched "${query}" — disambiguate]\n` +
      matches
        .map((c: any, i: number) => `${i + 1}. id=${c.id} · ${c.name}${c.phone ? ` · ${c.phone}` : ''}`)
        .join('\n')
    );
  }

  const customer = matches[0];

  // 2. Parallel: open projects, open tasks, unpaid invoices, recent quotes
  const [projectsRes, tasksRes, invoicesRes, quotesRes] = await Promise.all([
    supabase
      .from('spark_projects')
      .select('id, title, status, due_date, location')
      .eq('user_id', userId)
      .eq('customer_id', customer.id)
      .not('status', 'in', '("completed","cancelled")')
      .limit(10),
    supabase
      .from('spark_tasks')
      .select('id, title, status, priority, due_at, tags')
      .eq('user_id', userId)
      .eq('customer_id', customer.id)
      .eq('status', 'open')
      .limit(10),
    supabase
      .from('invoices')
      .select('id, invoice_number, total, due_date, status, paid_at')
      .eq('user_id', userId)
      .ilike('client_data->>name', `%${customer.name}%`)
      .is('paid_at', null)
      .not('status', 'in', '("paid","Paid","cancelled","Cancelled")')
      .limit(10),
    supabase
      .from('quotes')
      .select('id, quote_number, total, status, created_at')
      .eq('user_id', userId)
      .ilike('client_data->>name', `%${customer.name}%`)
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  const projects = projectsRes.data || [];
  const tasks = tasksRes.data || [];
  const invoices = invoicesRes.data || [];
  const quotes = quotesRes.data || [];

  const openSnags = tasks.filter((t: any) => (t.tags || []).includes('snagging'));
  const otherTasks = tasks.filter((t: any) => !(t.tags || []).includes('snagging'));
  const outstandingTotal = invoices.reduce((sum: number, inv: any) => sum + Number(inv.total || 0), 0);

  return [
    `CUSTOMER: id=${customer.id} · ${customer.name}`,
    `  ${customer.phone ? `phone ${customer.phone}` : ''}${customer.email ? `  email ${customer.email}` : ''}${customer.address ? `  address ${customer.address}` : ''}`,
    `  ${customer.notes ? `notes: ${customer.notes}` : ''}`,
    ``,
    `OPEN PROJECTS (${projects.length}):`,
    ...projects.map(
      (p: any) =>
        `  - id=${p.id} · ${p.title} · status=${p.status}${p.due_date ? ` · due ${String(p.due_date).split('T')[0]}` : ''}${p.location ? ` @ ${p.location}` : ''}`
    ),
    ``,
    `OPEN TASKS (${otherTasks.length}):`,
    ...otherTasks.map(
      (t: any) =>
        `  - id=${t.id} · [${t.priority}${t.due_at ? `, due ${String(t.due_at).split('T')[0]}` : ''}] ${t.title}`
    ),
    ``,
    `OPEN SNAGS (${openSnags.length}):`,
    ...openSnags.map(
      (t: any) => `  - id=${t.id} · [${t.priority}] ${t.title}`
    ),
    ``,
    `UNPAID INVOICES (${invoices.length}) · total £${outstandingTotal.toFixed(2)}:`,
    ...invoices.map((inv: any) => {
      const daysOverdue = inv.due_date
        ? Math.floor((Date.now() - new Date(inv.due_date).getTime()) / 86400000)
        : null;
      return `  - id=${inv.id} · #${inv.invoice_number} · £${inv.total} · status=${inv.status}${daysOverdue && daysOverdue > 0 ? ` · ${daysOverdue}d OVERDUE` : ''}`;
    }),
    ``,
    `RECENT QUOTES (${quotes.length}):`,
    ...quotes.map(
      (q: any) =>
        `  - id=${q.id} · #${q.quote_number} · £${q.total} · status=${q.status} · ${String(q.created_at).split('T')[0]}`
    ),
  ]
    .filter((line) => line !== undefined && line !== '')
    .join('\n');
}

async function planMyDay(
  supabase: any,
  userId: string | null,
  dateStr: string | null
): Promise<string> {
  if (!userId) return '[no userId]';
  const target = dateStr ? new Date(dateStr) : new Date(Date.now() + 86400000);
  const dayStart = new Date(target);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(target);
  dayEnd.setHours(23, 59, 59, 999);

  const [tasksRes, projectsRes] = await Promise.all([
    supabase
      .from('spark_tasks')
      .select(
        'id, title, status, priority, due_at, location, customer_id, customers(name), project_id, tags'
      )
      .eq('user_id', userId)
      .eq('status', 'open')
      .gte('due_at', dayStart.toISOString())
      .lte('due_at', dayEnd.toISOString())
      .order('due_at', { ascending: true })
      .limit(30),
    supabase
      .from('spark_projects')
      .select('id, title, status, due_date, location, customer_id, customers(name)')
      .eq('user_id', userId)
      .eq('due_date', dayStart.toISOString().split('T')[0])
      .limit(10),
  ]);

  const tasks = tasksRes.data || [];
  const projects = projectsRes.data || [];

  if (tasks.length === 0 && projects.length === 0) {
    return `[nothing scheduled for ${dayStart.toISOString().split('T')[0]}]`;
  }

  return [
    `DATE: ${dayStart.toISOString().split('T')[0]}`,
    ``,
    `TASKS DUE (${tasks.length}) — ordered by time:`,
    ...tasks.map((t: any) => {
      const time = t.due_at ? new Date(t.due_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '';
      const customer = t.customers?.name;
      const loc = t.location;
      return `  - ${time || '—'} · [${t.priority}] ${t.title}${customer ? ` · ${customer}` : ''}${loc ? ` @ ${loc}` : ''}`;
    }),
    ``,
    `PROJECTS DUE (${projects.length}):`,
    ...projects.map((p: any) => {
      const customer = p.customers?.name;
      return `  - ${p.title}${customer ? ` · ${customer}` : ''}${p.location ? ` @ ${p.location}` : ''}`;
    }),
  ].join('\n');
}

async function findSimilarJobs(
  supabase: any,
  userId: string | null,
  jobType: string,
  limit: number
): Promise<string> {
  if (!userId || !jobType?.trim()) return '[no userId or jobType]';

  const { data: projects } = await supabase
    .from('spark_projects')
    .select(
      'id, title, status, project_type, location, estimated_value, due_date, created_at'
    )
    .eq('user_id', userId)
    .or(`title.ilike.%${jobType}%,project_type.ilike.%${jobType}%`)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (!projects || projects.length === 0) {
    return `[no past projects matching "${jobType}" — use general electrical knowledge to draft the task list]`;
  }

  // Pull tasks for each project
  const projectIds = projects.map((p: any) => p.id);
  const { data: allTasks } = await supabase
    .from('spark_tasks')
    .select('project_id, title, priority, tags')
    .eq('user_id', userId)
    .in('project_id', projectIds)
    .order('created_at', { ascending: true });

  const tasksByProject: Record<string, any[]> = {};
  for (const t of allTasks || []) {
    if (!tasksByProject[t.project_id]) tasksByProject[t.project_id] = [];
    tasksByProject[t.project_id].push(t);
  }

  return projects
    .map((p: any) => {
      const tasks = tasksByProject[p.id] || [];
      return [
        `PROJECT: ${p.title} · status=${p.status}${p.project_type ? ` · type=${p.project_type}` : ''}${p.estimated_value ? ` · £${p.estimated_value}` : ''}`,
        `  TASKS (${tasks.length}):`,
        ...tasks.map((t: any) => {
          const tagStr = Array.isArray(t.tags) && t.tags.length ? ` #${t.tags.join(' #')}` : '';
          return `    - [${t.priority}] ${t.title}${tagStr}`;
        }),
      ].join('\n');
    })
    .join('\n\n');
}

async function searchProjects(
  supabase: any,
  userId: string | null,
  query: string
): Promise<string> {
  if (!userId || !query?.trim()) return '[no userId or query]';
  const { data, error } = await supabase
    .from('spark_projects')
    .select(
      'id, title, status, priority, location, due_date, customers(name)'
    )
    .eq('user_id', userId)
    .or(`title.ilike.%${query}%,location.ilike.%${query}%`)
    .limit(8);
  if (error) {
    console.error('[find_project] error', error);
    return '[search failed]';
  }
  if (!data || data.length === 0) return `[no projects matching "${query}"]`;
  return data
    .map((p: any, i: number) => {
      const customerName = p.customers?.name;
      return `${i + 1}. id=${p.id} · [${p.status}${p.priority ? `, ${p.priority}` : ''}${p.due_date ? `, due ${String(p.due_date).split('T')[0]}` : ''}] ${p.title}${customerName ? ` (${customerName})` : ''}${p.location ? ` @ ${p.location}` : ''}`;
    })
    .join('\n');
}

async function packageResponse(
  aiResp: any,
  citations: Citation[],
  supabase: any,
  userId: string | null,
  conversationId: string | null,
  canEnquire = false,
  lastUserText = ''
): Promise<Response> {
  const proposedActions: any[] = [];
  let clarification: any = null;
  let assistantMessage = '';

  // callOpenAI returns toolCalls separately. When tools fire, content holds the
  // first tool's args (per the helper) — not assistant prose. So we synthesise.
  if (!aiResp.toolCalls?.length) {
    assistantMessage = undouble(aiResp.content || '');
  }

  if (aiResp.toolCalls?.length) {
    for (const call of aiResp.toolCalls) {
      const args = safeParse(call.function.arguments);
      const name = call.function.name;

      if (name === 'ask_clarification') {
        clarification = {
          question: args.question || '',
          context: args.context || null,
          options: Array.isArray(args.options) ? args.options : [],
          allowFreeText: args.allowFreeText !== false,
        };
        continue;
      }

      // Helper to strip a per-item rationale into a top-level action field.
      const splitRationale = (item: any): { rationale?: string; rest: any } => {
        if (!item || typeof item !== 'object') return { rest: item };
        const { rationale, ...rest } = item;
        return { rationale, rest };
      };

      if (name === 'create_tasks') {
        for (const t of args.tasks || []) {
          const { rationale, rest } = splitRationale(t);
          proposedActions.push({
            type: 'create-task',
            tempId: crypto.randomUUID(),
            payload: rest,
            rationale,
          });
        }
      } else if (name === 'create_snags') {
        for (const s of args.snags || []) {
          const { rationale, rest } = splitRationale(s);
          // Force the snagging tag (model is instructed not to add it).
          const tags = Array.isArray(rest.tags)
            ? Array.from(new Set([...(rest.tags as string[]), 'snagging']))
            : ['snagging'];
          proposedActions.push({
            type: 'create-snag',
            tempId: crypto.randomUUID(),
            payload: { ...rest, tags },
            rationale,
          });
        }
      } else if (name === 'create_projects') {
        for (const p of args.projects || []) {
          const { rationale, rest } = splitRationale(p);
          proposedActions.push({
            type: 'create-project',
            tempId: crypto.randomUUID(),
            payload: rest,
            rationale,
          });
        }
      } else if (name === 'amend_task') {
        proposedActions.push({
          type: 'amend-task',
          id: args.id,
          patch: args.patch || {},
          rationale: args.rationale,
        });
      } else if (name === 'amend_project') {
        proposedActions.push({
          type: 'amend-project',
          id: args.id,
          patch: args.patch || {},
          rationale: args.rationale,
        });
      } else if (name === 'complete_task') {
        proposedActions.push({ type: 'complete-task', id: args.id });
      } else if (name === 'complete_project') {
        proposedActions.push({ type: 'complete-project', id: args.id });
      } else if (name === 'delete_task') {
        proposedActions.push({ type: 'delete-task', id: args.id });
      } else if (name === 'delete_project') {
        proposedActions.push({ type: 'delete-project', id: args.id });
      } else if (name === 'create_customers') {
        for (const c of args.customers || []) {
          const { rationale, rest } = splitRationale(c);
          proposedActions.push({
            type: 'create-customer',
            tempId: crypto.randomUUID(),
            payload: rest,
            rationale,
          });
        }
      } else if (name === 'create_enquiries') {
        for (const e of args.enquiries || []) {
          const { rationale, rest } = splitRationale(e);
          proposedActions.push(enquiryAction(rest, rationale, canEnquire));
        }
      } else if (name === 'amend_customer') {
        proposedActions.push({
          type: 'amend-customer',
          id: args.id,
          patch: args.patch || {},
          rationale: args.rationale,
        });
      } else if (name === 'delete_customer') {
        proposedActions.push({ type: 'delete-customer', id: args.id });
      } else if (name === 'add_materials') {
        for (const m of args.materials || []) {
          if (!m?.name) continue;
          proposedActions.push({
            type: 'add-material',
            tempId: crypto.randomUUID(),
            payload: {
              projectId: args.project_id,
              name: m.name,
              quantity: m.quantity,
              unit: m.unit,
              unitPrice: m.unit_price,
            },
            rationale: m.rationale || args.rationale,
          });
        }
      } else if (name === 'draft_invoice') {
        proposedActions.push({
          type: 'draft-invoice',
          tempId: crypto.randomUUID(),
          payload: { projectId: args.project_id },
          rationale: args.rationale,
        });
      } else if (name === 'draft_chase_email') {
        proposedActions.push({
          type: 'draft-message',
          tempId: crypto.randomUUID(),
          payload: {
            to: args.to,
            toName: args.toName,
            subject: args.subject,
            body: args.body,
            invoiceId: args.invoiceId,
            quoteId: args.quoteId,
            customerId: args.customerId,
            purpose: args.purpose || 'general',
          },
          rationale: args.rationale,
        });
      }
    }

    {
      const fixed = await dropExistingCustomers(
        ensureEnquiry(proposedActions, lastUserText, canEnquire),
        supabase,
        userId
      );
      proposedActions.splice(0, proposedActions.length, ...fixed);
    }

    if (!assistantMessage && clarification) {
      // The clarification UI carries the question itself — just frame it.
      assistantMessage = clarification.context || 'Quick question first.';
    }

    if (!assistantMessage) {
      const counts: Record<string, number> = {};
      proposedActions.forEach((a) => {
        counts[a.type] = (counts[a.type] || 0) + 1;
      });
      const bits: string[] = [];
      if (counts['create-task']) bits.push(`${counts['create-task']} task${counts['create-task'] > 1 ? 's' : ''}`);
      if (counts['create-snag']) bits.push(`${counts['create-snag']} snag${counts['create-snag'] > 1 ? 's' : ''}`);
      if (counts['create-project']) bits.push(`${counts['create-project']} project${counts['create-project'] > 1 ? 's' : ''}`);
      if (counts['create-customer'])
        bits.push(`${counts['create-customer']} customer${counts['create-customer'] > 1 ? 's' : ''}`);
      if (counts['create-enquiry'])
        bits.push(`${counts['create-enquiry']} enquir${counts['create-enquiry'] > 1 ? 'ies' : 'y'}`);
      if (counts['add-material'])
        bits.push(`${counts['add-material']} material${counts['add-material'] > 1 ? 's' : ''}`);
      if (counts['draft-invoice']) bits.push('invoice to draft');
      const amends =
        (counts['amend-task'] || 0) +
        (counts['amend-project'] || 0) +
        (counts['amend-customer'] || 0);
      if (amends) bits.push(`${amends} update${amends > 1 ? 's' : ''}`);
      const completes = (counts['complete-task'] || 0) + (counts['complete-project'] || 0);
      if (completes) bits.push(`${completes} to mark done`);
      const deletes =
        (counts['delete-task'] || 0) +
        (counts['delete-project'] || 0) +
        (counts['delete-customer'] || 0);
      if (deletes) bits.push(`${deletes} to delete`);
      assistantMessage =
        bits.length > 0
          ? `Proposing ${bits.join(' · ')}. Review and apply below.`
          : 'Done — nothing to apply.';
    }
  }

  // Dedupe citations by ref
  const seen = new Set<string>();
  const uniqCitations = citations.filter((c) => {
    if (seen.has(c.ref)) return false;
    seen.add(c.ref);
    return true;
  });

  {
    const tip = formTip(proposedActions, lastUserText);
    if (tip && !assistantMessage.includes('Website form')) assistantMessage += `\n\n${tip}`;
    const note = await regCheckNote(supabase, assistantMessage);
    if (note) assistantMessage += `\n\n${note}`;
  }

  // Persist assistant reply.
  if (userId && conversationId) {
    await supabase.from('assistant_messages').insert({
      conversation_id: conversationId,
      user_id: userId,
      role: 'assistant',
      content: assistantMessage,
      citations: uniqCitations.length > 0 ? uniqCitations : null,
      actions: proposedActions.length > 0 ? proposedActions : null,
      clarification,
    });
  }

  return new Response(
    JSON.stringify({
      assistantMessage,
      proposedActions,
      citations: uniqCitations,
      clarification,
      conversationId,
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}
