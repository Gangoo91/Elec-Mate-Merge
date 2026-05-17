import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { callOpenAI } from '../_shared/ai-providers.ts';
import { searchFacets, formatFacetsForPrompt } from '../_shared/bs7671-facets-rag.ts';
import { searchPracticalWorkIntelligence } from '../_shared/rag-practical-work.ts';
import {
  findDocuments,
  sendDocument,
  createQuote,
  createInvoice,
} from '../_shared/mate-documents.ts';
import {
  getBusinessSnapshot,
  formatSnapshotForPrompt,
  findPastPricing,
} from '../_shared/mate-business-brain.ts';
import { captureException } from '../_shared/sentry.ts';
import { BUSINESS_HUB_SOUL } from '../_shared/business-hub-soul.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const SYSTEM_PROMPT = BUSINESS_HUB_SOUL;

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

    // Cash brain — always-on awareness of outstanding, overdue, win rate.
    // Fetched per turn so Mate reasons WITH the live state of the books.
    const businessSnapshot = await getBusinessSnapshot(supabase, userId);
    const snapshotBlock = formatSnapshotForPrompt(businessSnapshot);

    const contextMsg = `Now: ${new Date().toISOString()}
Recent customer names: ${(userContext.recentCustomers || []).slice(0, 12).join(', ') || 'none yet'}
Recent locations: ${(userContext.recentLocations || []).slice(0, 12).join(', ') || 'none yet'}

Current customers (id, name, phone, email, address):
${customerSummary || 'no customers yet'}

Current projects (id, status, due, title):
${projectSummary || 'no projects yet'}

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

    const conversation: any[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'system', content: enrichedContext },
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
      'find_documents',
      'find_past_pricing',
      'send_document',
      'create_quote',
      'create_invoice',
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
        authHeader,
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

          for (let round = 0; round < 8; round++) {
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
  // NOTE: reasoning_effort is NOT supported by gpt-5.5 + function tools on
  // /v1/chat/completions — OpenAI requires /v1/responses for that combo.
  // We keep Chat Completions for now (streaming + tool-loop shape is built
  // around it). Migrating to Responses API is tracked as a separate piece
  // of work — it would unlock reasoning_effort: 'high'.
  const body = {
    model: 'gpt-5.5',
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
    { messages: conversation, tools: TOOLS, model: 'gpt-5.5' },
    openAiKey,
    60000
  );
  for (let round = 0; round < 8; round++) {
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
      }
      conversation.push({
        role: 'tool',
        tool_call_id: call.id,
        content: toolOutput,
      });
    }
    aiResp = await callOpenAI(
      { messages: conversation, tools: TOOLS, model: 'gpt-5.5' },
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
