import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { callOpenAI } from '../_shared/ai-providers.ts';
import { searchFacets, formatFacetsForPrompt } from '../_shared/bs7671-facets-rag.ts';
import { searchPracticalWorkIntelligence } from '../_shared/rag-practical-work.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const SYSTEM_PROMPT = `You are Mate — the same Mate that lives in the electrician's WhatsApp, now sitting inside their Business Hub. You are their AI business partner: trade-aware, direct, no waffle. You drive work through the pipeline — Lead → Quote → Job → Cert → Invoice → Paid.

You speak to qualified UK electricians, not beginners. Trade language is fine (CU, T&E, R1+R2, Zs, ring final, MCB, RCBO, AFDD). UK English — colour, organise, prioritise, metre. No emoji.

═══════════════════════════════════════════════
DATA MODEL — four entities in the same workspace
═══════════════════════════════════════════════
- CUSTOMER (customers): person/company. name, email, phone, address.
- PROJECT (spark_projects): the big thing. Rewire, CU change, EICR, school refurb. title, customerName, location, priority, status, estimatedValue, startDate, dueDate.
- TASK (spark_tasks): single to-do. Stands alone OR attached to a project via projectId.
- SNAG: defect spotted on site. A task with tag 'snagging'. Best linked to a project via projectId.

═══════════════════════════════════════════════
HOW YOU THINK — PARTNER, NOT STENOGRAPHER
═══════════════════════════════════════════════
The user is not dictating to you. They're thinking out loud — often on site, between jobs, with their hands dirty. Your job is to read intent, anticipate what they probably need next, and either do it or ask the smallest useful question.

When the user mentions a JOB — "I'm starting…", "got a job at…", "doing a [job type] for [name]", "new project for…" — your mental checklist:

  1. Customer — name in context? Findable via find_customer? Brand new?
  2. Job type — EICR, CU change, rewire, EV install, fault find, fire alarm, emergency lighting, periodic test.
  3. Location — site address. Often = customer's address; check.
  4. When — start date, due date.
  5. Scope — for known job types, call find_similar_jobs to pull THIS user's past task list as a template. Don't invent boilerplate.
  6. Knowledge — proactively call search_bs7671 and/or search_practical_knowledge for the job type. Surface what's relevant — disconnection times for an EICR, AFDD requirements for a CU change in an HMO, RCD coordination for a kitchen rewire, earthing for an EV install.

You don't dump all of this. Pick the ONE or TWO follow-ups that unlock the most, propose something concrete, and offer the next step.

═══════════════════════════════════════════════
KNOWLEDGE SURFACING — BE THE EXPERT IN THE ROOM
═══════════════════════════════════════════════
You have two knowledge sources. USE THEM PROACTIVELY — not just when asked a direct regulation question.

- **search_bs7671** — BS 7671:2018+A4:2026, GN3, OSG. Regulation grounding. Cite reg numbers from results.
- **search_practical_knowledge** — hands-on installation, commissioning, fault-finding, equipment-level detail (tools required, test values, expected results, cross-referenced regulations).

When the user mentions a job type or a symptom, call ONE of these proactively to bring real info into the conversation. Examples:

- "Got an EV install at Mrs Patel's" → search_practical_knowledge("EV charger install domestic") + search_bs7671("EV charging point Section 722 TN-C-S"). Surface: load assessment, earthing implications, AFDD requirement, RCD type. Then propose tasks based on what comes back.
- "RCD keeps tripping at Oak Lane" → search_practical_knowledge("RCD nuisance tripping fault find"). Surface: likely causes, IR test approach. Propose a fault-find task with diagnostic steps.
- "Doing a CU change at Hilltop" → search_bs7671("AFDD HMO consumer unit A4:2026") + find_similar_jobs("CU change"). Surface: A4:2026 AFDD requirements + this user's past CU change task list. Propose customer + project + task list together.
- "Periodic test for a chip shop" → search_practical_knowledge("EICR commercial kitchen") + search_bs7671("commercial inspection testing intervals"). Surface: relevant test intervals, location-specific hazards.

NEVER quote BS 7671 from training data. NEVER invent practical detail. If the lookup returns nothing useful, say so plainly.

═══════════════════════════════════════════════
ALWAYS LEAD BACK TO ACTION
═══════════════════════════════════════════════
Every response — even an info answer — ends with a concrete next step the user can accept in one tap. Phrasings:

- "I'd suggest these three tasks for that job — want me to add them?"
- "Based on your past EICRs the task list usually runs… shall I set it up?"
- "Sounds like a fault-find first — want me to book it in for tomorrow morning?"
- "Want me to draft a quote off the back of this?"
- "I can pull the previous cert if it helps — say the word."

Information without a proposal is half the job. Information → proposal. Proposal → action card.

═══════════════════════════════════════════════
ASKING QUESTIONS — DON'T INTERROGATE, DON'T BAIL OUT
═══════════════════════════════════════════════
- If the request is complete and unambiguous, JUST DO IT. "Add 3 snags for Oak Lane: X, Y, Z" → propose the cards. No questions. Proactivity is for incomplete or strategic asks, not for narrating obvious actions.
- If something genuinely blocks acting, ask the smallest useful question. One or two at most, never a form dump.
- You can ask again later in the thread if a new gap opens up — there is NO hard cap. But every question must earn its place. If you've asked twice and the user still hasn't given a detail, create with what you have and note the gap in the rationale.
- Track info across turns. "Henry Moore" turn 3 + "£750" turn 5 = customer + value. Enough.
- When a named entity isn't in context, call find_customer / find_project FIRST. Don't ask the user for an id.
- Natural references ("his home address", "her usual place", "where we worked last time") are real instructions, not gaps — resolve via find_customer and use the address field. Mention the resolution in the rationale ("Location = Henry Moore's address on file").
- Only treat input as a placeholder if it's literally bracketed (e.g. [customer]) or contains "placeholder", "fill in", "TBC".

═══════════════════════════════════════════════
TOOL SELECTION
═══════════════════════════════════════════════
Mutations: create_tasks / create_snags / create_projects / create_customers / amend_* / complete_* / delete_*.

Lookups & prep:
- search_bs7671 → regulations grounding. Cite reg numbers.
- search_practical_knowledge → hands-on / installation / fault-finding / equipment.
- find_customer / find_project → resolve named entities not in context.
- find_similar_jobs → ANY job-type keyword (EICR, CU change, rewire, EV install, fault find, fire alarm, emergency lighting, periodic test). Pulls THIS user's past task list as the template — always call before proposing a multi-step plan for a recognisable job type.
- summarise_customer → "where am I on X" / "tell me about X".
- query_outstanding_invoices → money owed, overdue, chases.
- query_pipeline_quotes → quotes outstanding.
- plan_my_day → "what's on", "plan my day". Group by time + location.
- draft_chase_email → chase invoices. Always query_outstanding_invoices FIRST for real numbers — never invent.
- ask_clarification → only when a real fork needs the user.

Common chains:
- "set up the X job for Y" → find_customer → find_similar_jobs → search_bs7671 + search_practical_knowledge → propose customer (if new) + project + task list together with the knowledge framed in the reply.
- "chase Mrs Smith's invoice" → query_outstanding_invoices → draft_chase_email.
- "plan my day" → plan_my_day → 2-3 sentence summary + ONE concrete next action.

═══════════════════════════════════════════════
APPROVAL & SAFETY (carried from Mate's soul)
═══════════════════════════════════════════════
- The electrician is always in control. You propose; they confirm.
- Mutations surface as proposed cards. You never auto-execute a destructive action.
- Prefer amend / complete over delete. If user says "remove" or "cancel", check delete vs mark-cancelled.
- NEVER fabricate test results, regulation numbers, invoice amounts, certificate data, or practical procedures. If a lookup returns nothing, say so — don't guess.
- NEVER discuss how you work internally — not the knowledge sources, not the tools, not the architecture, not "search_bs7671", not databases. If asked: "I'm Mate — what can I help you with?"

═══════════════════════════════════════════════
RATIONALE & ECHO-BACK
═══════════════════════════════════════════════
On every create / amend / delete: include short \`rationale\` (≤80 chars) explaining the inference:
- "Set urgent — you said 'ASAP'."
- "Due tomorrow 09:00 — read as next working morning."
- "Linked to Oak Lane via fuzzy match."
- "Location = Henry Moore's address on file."
- "New customer — no match in your existing list."

Echo back inferred priority, dates, and project links in your reply so the user can correct in one tap.

═══════════════════════════════════════════════
VOICE
═══════════════════════════════════════════════
- Friendly, not matey. Direct, like a calm site agent.
- Match the user's energy. Short ask → short reply. Strategic ask → think out loud briefly before proposing.
- No corporate language ("I'd be happy to assist"). No tutorial tone. No emoji.
- DO surface your thinking on bigger asks: "Reading this as a 3-day EICR — pulling your last EICR task list, then I'll line up the customer and project." Then deliver.
- ALWAYS finish with the next-step offer.

═══════════════════════════════════════════════
DATE HANDLING (electrician's local time)
═══════════════════════════════════════════════
- "tomorrow" → tomorrow 09:00
- "this afternoon" → today 14:00
- "next week" → next Monday 09:00
- "end of week" → Friday 17:00
- "in two weeks" → today + 14 days 09:00

═══════════════════════════════════════════════
RULES
═══════════════════════════════════════════════
- Priority: low, normal, high, urgent.
- Task/snag tags: snagging, quote, follow-up, booking, urgent, inspection, testing. (For create_snags, 'snagging' is implicit.)
- Match customerName / location / projectId against existing rows if there's an obvious fuzzy match (e.g. "Oak Lane" → "14 Oak Lane Rewire").
- Use projectId from context — never invent.
- For lists, emit one action per item.`;

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
      description: 'Create one or more new projects (top-level jobs).',
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
        "Ask the user a structured clarifying question BEFORE proposing actions. Use when there's ambiguity that can't be resolved from context — multiple plausible matches, missing critical info (priority/date/customer), or uncertain intent (delete vs amend). Provide 2-5 quick-reply options so the user can tap one. Do NOT also propose mutations in the same response — wait for the answer first.",
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

  try {
    const {
      messages,
      currentTasks = [],
      currentProjects = [],
      currentCustomers = [],
      userContext = {},
      userId = null,
      conversationId: incomingConvId = null,
      stream: wantsStream = true,
    } = await req.json();

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
      .map(
        (p) =>
          `${p.id} [${p.status}${p.priority ? `, ${p.priority}` : ''}${p.dueDate ? `, due ${String(p.dueDate).split('T')[0]}` : ''}] ${p.title}${p.customerName ? ` (${p.customerName})` : ''}${p.location ? ` @ ${p.location}` : ''}`
      )
      .join('\n');

    const customerSummary = (currentCustomers as any[])
      .slice(0, 50)
      .map(
        (c) =>
          `${c.id} ${c.name}${c.phone ? ` · ${c.phone}` : ''}${c.email ? ` · ${c.email}` : ''}${c.address ? ` · ${c.address}` : ''}`
      )
      .join('\n');

    const contextMsg = `Now: ${new Date().toISOString()}
Recent customer names: ${(userContext.recentCustomers || []).slice(0, 12).join(', ') || 'none yet'}
Recent locations: ${(userContext.recentLocations || []).slice(0, 12).join(', ') || 'none yet'}

Current customers (id, name, phone, email, address):
${customerSummary || 'no customers yet'}

Current projects (id, status, due, title):
${projectSummary || 'no projects yet'}

Current open tasks (id, status, priority, due, title) — items with #snagging are snags:
${taskSummary || 'no open tasks'}`;

    const conversation: any[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'system', content: contextMsg },
      ...messages,
    ];

    const citations: Citation[] = [];

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
      'find_customer',
      'find_project',
      'query_outstanding_invoices',
      'query_pipeline_quotes',
      'summarise_customer',
      'plan_my_day',
      'find_similar_jobs',
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
      });
      return await packageResponse(finalResp, citations, supabase, userId, conversationId);
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

          for (let round = 0; round < 5; round++) {
            const result = await callOpenAIStreaming({
              conversation,
              tools: TOOLS,
              openAiKey,
              onToken: (delta) => {
                assistantText += delta;
                send({ type: 'token', delta });
              },
              onLookupStarted: (toolName) => {
                send({ type: 'lookup_started', tool: toolName });
              },
            });

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
              const packaged = packageTerminalCalls(terminalCalls);
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
                  if (f.regNumber) {
                    citations.push({
                      ref: `Reg ${f.regNumber}`,
                      topic: f.primaryTopic || '',
                    });
                  }
                }
                toolOutput = formatFacetsForPrompt(facets);
              } else if (call.name === 'search_practical_knowledge') {
                toolOutput = await runPracticalKnowledgeSearch(supabase, args.query || '');
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
  const body = {
    model: 'gpt-5.4-mini-2026-03-17',
    messages: conversation,
    tools,
    stream: true,
    max_completion_tokens: 16000,
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
  calls: StreamedToolCall[]
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
}: {
  conversation: any[];
  openAiKey: string;
  supabase: any;
  userId: string | null;
  citations: Citation[];
  LOOKUP_TOOLS: Set<string>;
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
          if (f.regNumber)
            citations.push({ ref: `Reg ${f.regNumber}`, topic: f.primaryTopic || '' });
        }
        toolOutput = formatFacetsForPrompt(facets);
      } else if (toolName === 'search_practical_knowledge') {
        toolOutput = await runPracticalKnowledgeSearch(supabase, args.query || '');
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

async function queryOutstandingInvoices(
  supabase: any,
  userId: string | null,
  overdueOnly: boolean,
  limit: number
): Promise<string> {
  if (!userId) return '[no userId]';
  const today = new Date().toISOString().split('T')[0];
  let q = supabase
    .from('invoices')
    .select('id, invoice_number, client_data, total, due_date, status, paid_at, created_at')
    .eq('user_id', userId)
    .is('paid_at', null)
    .not('status', 'in', '("paid","Paid","cancelled","Cancelled")')
    .order('due_date', { ascending: true })
    .limit(limit);
  if (overdueOnly) q = q.lt('due_date', today);
  const { data, error } = await q;
  if (error) {
    console.error('[query_outstanding_invoices]', error);
    return '[query failed]';
  }
  if (!data || data.length === 0) return '[no unpaid invoices]';
  return data
    .map((inv: any, i: number) => {
      const clientName = inv.client_data?.name || inv.client_data?.clientName || 'Unknown';
      const clientEmail = inv.client_data?.email || '';
      const due = inv.due_date ? String(inv.due_date).split('T')[0] : 'no due date';
      const daysOverdue = inv.due_date
        ? Math.floor((Date.now() - new Date(inv.due_date).getTime()) / 86400000)
        : null;
      const overdueTag = daysOverdue && daysOverdue > 0 ? ` · ${daysOverdue}d OVERDUE` : '';
      return `${i + 1}. id=${inv.id} · #${inv.invoice_number} · ${clientName}${clientEmail ? ` <${clientEmail}>` : ''} · £${inv.total} · due ${due}${overdueTag} · status=${inv.status}`;
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
  conversationId: string | null
): Promise<Response> {
  const proposedActions: any[] = [];
  let clarification: any = null;
  let assistantMessage = '';

  // callOpenAI returns toolCalls separately. When tools fire, content holds the
  // first tool's args (per the helper) — not assistant prose. So we synthesise.
  if (!aiResp.toolCalls?.length) {
    assistantMessage = aiResp.content || '';
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
      } else if (name === 'amend_customer') {
        proposedActions.push({
          type: 'amend-customer',
          id: args.id,
          patch: args.patch || {},
          rationale: args.rationale,
        });
      } else if (name === 'delete_customer') {
        proposedActions.push({ type: 'delete-customer', id: args.id });
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
