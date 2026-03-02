/**
 * Master tool registry.
 * Registers all 59 core tools + 21 apprentice tools onto the MCP server.
 * Tools are role-filtered: electricians get core tools, apprentices get learning tools.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { UserContext } from '../auth.js';
import { getHandler } from './router.js';
import { enforceRateLimits, RateLimitError } from '../middleware/rate-limiter.js';
import { logToolCall } from '../middleware/audit-logger.js';

/**
 * Register all tools onto the MCP server, filtered by user role.
 */
export function registerAllTools(server: McpServer, user: UserContext): void {
  // Core tools available to all roles
  registerKnowledgeTools(server, user);
  registerAgentInternalTools(server, user);
  registerDocumentTools(server, user);

  // Business pipeline tools — available to all roles
  registerClientTools(server, user);
  registerQuotingTools(server, user);
  registerProjectTools(server, user);
  registerCertificateTools(server, user);
  registerInvoicingTools(server, user);
  registerRamsTools(server, user);
  registerCalendarTools(server, user);
  registerMessagingTools(server, user);
  registerExpenseTools(server, user);
  registerElecIdTools(server, user);
  registerEmailTools(server, user);
  registerTaskTools(server, user);

  // Apprentice/learning tools — available to all roles
  // (a founder can also be learning, an apprentice might run a side business)
  registerApprenticeTools(server, user);
}

// ─── Helper to wrap handler calls with rate limiting + audit logging ────

function callTool(toolName: string, user: UserContext) {
  return async (args: Record<string, unknown>) => {
    const startTime = Date.now();

    // ── Rate limiting (SECURITY.md §8) ──────────────────────────────
    try {
      enforceRateLimits(user.userId, toolName);
    } catch (err) {
      if (err instanceof RateLimitError) {
        // Log rate limit hits as security events
        logToolCall(user, toolName, args, {
          success: false,
          error: err.message,
          durationMs: Date.now() - startTime,
        });
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({ error: err.message, rate_limited: true }),
            },
          ],
        };
      }
      throw err;
    }

    // ── Execute tool ────────────────────────────────────────────────
    const handler = getHandler(toolName);
    if (!handler) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ error: `Unknown tool: ${toolName}` }),
          },
        ],
      };
    }

    try {
      const result = await handler(args, user);
      const durationMs = Date.now() - startTime;

      // ── Audit log (SECURITY.md §9 — every tool call logged) ─────
      logToolCall(user, toolName, args, { success: true, durationMs });

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(result),
          },
        ],
      };
    } catch (err) {
      const durationMs = Date.now() - startTime;
      const message = err instanceof Error ? err.message : String(err);

      // Log failures too
      logToolCall(user, toolName, args, {
        success: false,
        error: message,
        durationMs,
      });

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ error: message }),
          },
        ],
      };
    }
  };
}

// ─── Client Tools (4) ───────────────────────────────────────────────────

function registerClientTools(server: McpServer, user: UserContext): void {
  server.tool(
    'read_clients',
    "Read the electrician's client list. Supports search, type filter, and pagination.",
    {
      search: z.string().optional().describe('Search by name, email, phone, or address'),
      type: z
        .enum(['residential', 'commercial', 'landlord'])
        .optional()
        .describe('Filter by client type'),
      limit: z.number().optional().describe('Max results to return (default 50)'),
    },
    callTool('read_clients', user)
  );

  server.tool(
    'create_client',
    'Add a new client. Returns the new client ID.',
    {
      name: z.string().describe('Client full name'),
      email: z.string().optional().describe('Client email address'),
      phone: z.string().optional().describe('Client phone number'),
      address: z.string().optional().describe('Client address'),
      type: z.string().optional().describe('Client type: residential, commercial, or landlord'),
      notes: z.string().optional().describe('Additional notes about the client'),
    },
    callTool('create_client', user)
  );

  server.tool(
    'update_client',
    'Update client details or notes.',
    {
      client_id: z.string().describe('Client UUID'),
      name: z.string().optional().describe('Updated name'),
      email: z.string().optional().describe('Updated email'),
      phone: z.string().optional().describe('Updated phone'),
      address: z.string().optional().describe('Updated address'),
      type: z.string().optional().describe('Updated type'),
      notes: z.string().optional().describe('Updated notes'),
    },
    callTool('update_client', user)
  );

  server.tool(
    'generate_client_portal_link',
    'Generate a tokenised client portal link for viewing certs, invoices, and quotes.',
    {
      client_id: z.string().describe('Client UUID'),
      include_certs: z.boolean().optional().describe('Include certificates in portal'),
      include_invoices: z.boolean().optional().describe('Include invoices in portal'),
      include_quotes: z.boolean().optional().describe('Include quotes in portal'),
    },
    callTool('generate_client_portal_link', user)
  );
}

// ─── Quoting Tools (6) ─────────────────────────────────────────────────

function registerQuotingTools(server: McpServer, user: UserContext): void {
  server.tool(
    'read_quotes',
    "Read the electrician's quotes. Filter by status or client.",
    {
      status: z
        .enum(['draft', 'sent', 'accepted', 'declined', 'expired'])
        .optional()
        .describe('Filter by quote status'),
      client_id: z.string().optional().describe('Filter by client UUID'),
    },
    callTool('read_quotes', user)
  );

  server.tool(
    'generate_quote',
    'Create a quote and save it to the database. The agent composes the items/pricing from the conversation. Returns quote_id for PDF generation.',
    {
      client_data: z
        .object({
          name: z.string().describe('Client name'),
          email: z.string().optional().describe('Client email'),
          phone: z.string().optional().describe('Client phone'),
          address: z.string().optional().describe('Job/client address'),
          postcode: z.string().optional().describe('Postcode'),
        })
        .describe('Client details'),
      job_details: z
        .object({
          title: z.string().describe('Short job title, e.g. "Lighting Replacement"'),
          description: z.string().optional().describe('Full job description'),
          estimatedDuration: z.string().optional().describe('e.g. "2 days"'),
        })
        .describe('Job details'),
      items: z
        .array(
          z.object({
            description: z.string().describe('Item description'),
            category: z
              .enum(['labour', 'materials', 'equipment'])
              .describe('Item category'),
            quantity: z.number().describe('Quantity'),
            unitPrice: z.number().describe('Price per unit in GBP'),
            unit: z.string().optional().describe('Unit type: each, metre, hours, etc.'),
            notes: z.string().optional().describe('Optional notes'),
          })
        )
        .describe('Line items — materials, labour, and equipment'),
      vat_registered: z.boolean().optional().describe('Whether to apply VAT (default false)'),
      vat_rate: z.number().optional().describe('VAT rate percentage (default 20)'),
      notes: z.string().optional().describe('Quote notes'),
    },
    callTool('generate_quote', user)
  );

  server.tool(
    'update_quote',
    'Update an existing quote — change client details, items, notes, expiry date, or status. Recalculates totals if items change.',
    {
      quote_id: z.string().describe('Quote UUID to update'),
      client_data: z
        .object({
          name: z.string().optional(),
          email: z.string().optional(),
          phone: z.string().optional(),
          address: z.string().optional(),
        })
        .optional()
        .describe('Client details to update (merged with existing)'),
      job_details: z
        .record(z.unknown())
        .optional()
        .describe('Job details to update (merged with existing)'),
      items: z
        .array(
          z.object({
            description: z.string(),
            category: z.string().optional(),
            quantity: z.number(),
            unitPrice: z.number(),
            unit: z.string().optional(),
            notes: z.string().optional(),
          })
        )
        .optional()
        .describe('Replacement line items (replaces all items, recalculates totals)'),
      vat_registered: z.boolean().optional().describe('VAT registered'),
      vat_rate: z.number().optional().describe('VAT rate'),
      notes: z.string().optional().describe('Quote notes'),
      expiry_date: z.string().optional().describe('New expiry date (ISO-8601)'),
      status: z.enum(['draft', 'sent', 'approved', 'rejected']).optional().describe('Quote status'),
    },
    callTool('update_quote', user)
  );

  server.tool(
    'generate_quote_pdf',
    'Generate a branded PDF of a quote. Returns downloadUrl. To send as WhatsApp document, include MEDIA:<downloadUrl> on its own line.',
    {
      quote_id: z.string().describe('Quote UUID'),
    },
    callTool('generate_quote_pdf', user)
  );

  server.tool(
    'send_quote',
    'Send a quote to a client via WhatsApp or email with accept/decline options.',
    {
      quote_id: z.string().describe('Quote UUID'),
      client_id: z.string().describe('Client UUID'),
      channel: z.enum(['whatsapp', 'email']).describe('Delivery channel'),
      message: z.string().optional().describe('Custom message to accompany the quote'),
    },
    callTool('send_quote', user)
  );

  server.tool(
    'set_quote_auto_followup',
    'Configure automated follow-up for a sent quote.',
    {
      quote_id: z.string().describe('Quote UUID'),
      followup_days: z.number().describe('Days after sending to follow up'),
      max_followups: z.number().optional().describe('Maximum number of follow-ups (default 3)'),
    },
    callTool('set_quote_auto_followup', user)
  );

  server.tool(
    'track_quote_email',
    'Track email open/click events for a sent quote.',
    {
      quote_id: z.string().describe('Quote UUID'),
    },
    callTool('track_quote_email', user)
  );
}

// ─── Project Tools (4) ──────────────────────────────────────────────────

function registerProjectTools(server: McpServer, user: UserContext): void {
  server.tool(
    'read_projects',
    "Read the electrician's projects. Each project groups related tasks. Returns task counts and progress.",
    {
      status: z
        .enum(['open', 'active', 'completed', 'cancelled'])
        .optional()
        .describe('Filter by project status'),
      priority: z
        .enum(['low', 'normal', 'high', 'urgent'])
        .optional()
        .describe('Filter by priority'),
      customer_id: z.string().optional().describe('Filter by customer UUID'),
      search: z.string().optional().describe('Search by project title'),
      limit: z.number().optional().describe('Max results (default 50)'),
    },
    callTool('read_projects', user)
  );

  server.tool(
    'create_project',
    'Create a project with ordered tasks. ALWAYS use this (not create_task) when creating multiple related tasks for a job — it groups them under one project and auto-assigns sequential due dates so they appear in the correct order in the app. List tasks in the order they should be done.',
    {
      title: z.string().describe('Project title (e.g. "Full House Rewire - 14 Oak Avenue")'),
      description: z.string().optional().describe('Project description'),
      priority: z
        .enum(['low', 'normal', 'high', 'urgent'])
        .optional()
        .describe('Priority (default normal)'),
      location: z.string().optional().describe('Project location/address'),
      customer_id: z.string().optional().describe('Customer UUID'),
      estimated_value: z.number().optional().describe('Estimated project value in GBP'),
      start_date: z
        .string()
        .optional()
        .describe(
          'Start date (ISO-8601) — tasks without due_at will be spaced 1 day apart starting from this date'
        ),
      due_date: z.string().optional().describe('Project due date (ISO-8601)'),
      tags: z.array(z.string()).optional().describe('Tags for categorisation'),
      tasks: z
        .array(
          z.object({
            title: z
              .string()
              .describe('Task title — list tasks in the order they should be completed'),
            details: z.string().optional().describe('Task details/description'),
            priority: z
              .enum(['low', 'normal', 'high', 'urgent'])
              .optional()
              .describe('Task priority (inherits project priority if not set)'),
            due_at: z
              .string()
              .optional()
              .describe(
                'Specific due date (ISO-8601). If omitted, auto-assigned sequentially from start_date'
              ),
            tags: z.array(z.string()).optional().describe('Task tags'),
          })
        )
        .optional()
        .describe(
          'Ordered list of tasks to create. Tasks are auto-assigned sequential due dates so they appear in order.'
        ),
    },
    callTool('create_project', user)
  );

  server.tool(
    'update_project',
    "Update a project's details or status.",
    {
      project_id: z.string().describe('Project UUID'),
      title: z.string().optional().describe('New title'),
      description: z.string().optional().describe('New description'),
      status: z
        .enum(['open', 'active', 'completed', 'cancelled'])
        .optional()
        .describe('New status'),
      priority: z.enum(['low', 'normal', 'high', 'urgent']).optional().describe('New priority'),
      location: z.string().optional().describe('New location'),
      customer_id: z.string().optional().describe('New customer UUID (or null to remove)'),
      estimated_value: z.number().optional().describe('New estimated value'),
      start_date: z.string().optional().describe('New start date (ISO-8601)'),
      due_date: z.string().optional().describe('New due date (ISO-8601)'),
      tags: z.array(z.string()).optional().describe('New tags'),
    },
    callTool('update_project', user)
  );

  server.tool(
    'complete_project',
    'Mark a project as completed. Optionally complete all remaining open tasks.',
    {
      project_id: z.string().describe('Project UUID'),
      complete_tasks: z
        .boolean()
        .optional()
        .describe('Also complete all open tasks in this project (default false)'),
    },
    callTool('complete_project', user)
  );
}

// ─── Certificate Tools (5) ──────────────────────────────────────────────

function registerCertificateTools(server: McpServer, user: UserContext): void {
  server.tool(
    'read_certificates',
    "Read the electrician's certificates. Supports 8 types: EIC, EICR, Minor Works, EV Charging, Fire Alarm, Emergency Lighting, PAT, Solar PV.",
    {
      type: z.string().optional().describe('Certificate type filter'),
      client_id: z.string().optional().describe('Filter by client UUID'),
      address: z.string().optional().describe('Filter by address'),
      status: z.string().optional().describe('Filter by status'),
      expiry_before: z
        .string()
        .optional()
        .describe('Find certs expiring before this date (ISO-8601)'),
    },
    callTool('read_certificates', user)
  );

  server.tool(
    'generate_certificate_pdf',
    'Generate a PDF for any supported certificate type. Returns downloadUrl. To send as WhatsApp document, include MEDIA:<downloadUrl> on its own line.',
    {
      certificate_id: z.string().describe('Certificate UUID'),
      certificate_type: z
        .string()
        .describe(
          'Certificate type (eic, eicr, minor_works, ev_charging, fire_alarm, emergency_lighting, pat, solar_pv)'
        ),
    },
    callTool('generate_certificate_pdf', user)
  );

  server.tool(
    'send_certificate',
    'Send a completed certificate to a client via WhatsApp or email.',
    {
      certificate_id: z.string().describe('Certificate UUID'),
      client_id: z.string().describe('Client UUID'),
      channel: z.enum(['whatsapp', 'email']).describe('Delivery channel'),
      message: z.string().optional().describe('Custom message to accompany the certificate'),
    },
    callTool('send_certificate', user)
  );

  server.tool(
    'get_expiring_certificates',
    'Find certificates approaching their expiry date.',
    {
      days_ahead: z.number().describe('Number of days to look ahead'),
    },
    callTool('get_expiring_certificates', user)
  );

  server.tool(
    'send_client_expiry_reminders',
    'Batch send certificate expiry reminders to clients.',
    {
      days_ahead: z.number().describe('Days until expiry threshold'),
      certificate_types: z.array(z.string()).optional().describe('Filter by cert types'),
    },
    callTool('send_client_expiry_reminders', user)
  );
}

// ─── Invoicing Tools (4) ────────────────────────────────────────────────

function registerInvoicingTools(server: McpServer, user: UserContext): void {
  server.tool(
    'read_invoices',
    "Read the electrician's invoices. Filter by status, client, or date.",
    {
      status: z
        .enum(['draft', 'sent', 'paid', 'overdue'])
        .optional()
        .describe('Filter by invoice status'),
      client_id: z.string().optional().describe('Filter by client UUID'),
      date_from: z.string().optional().describe('Start date (ISO-8601)'),
      limit: z.number().optional().describe('Max results (default 50)'),
    },
    callTool('read_invoices', user)
  );

  server.tool(
    'create_invoice',
    'Create a standalone draft invoice with line items. Provide client_data (name, email, phone, address) or client_id if a customer record exists.',
    {
      client_id: z.string().optional().describe('Customer UUID (if exists in customers table)'),
      client_data: z
        .object({
          name: z.string().describe('Client name'),
          email: z.string().optional().describe('Client email'),
          phone: z.string().optional().describe('Client phone'),
          address: z.string().optional().describe('Client address'),
        })
        .optional()
        .describe('Client details for standalone invoices'),
      job_id: z.string().optional().describe('Linked job UUID'),
      line_items: z
        .array(
          z.object({
            description: z.string(),
            quantity: z.number(),
            unit_price: z.number(),
          })
        )
        .describe('Invoice line items'),
      vat_rate: z.number().optional().describe('VAT rate (default 20)'),
      due_days: z.number().optional().describe('Payment terms in days (default 30)'),
      notes: z.string().optional().describe('Invoice notes'),
    },
    callTool('create_invoice', user)
  );

  server.tool(
    'update_invoice',
    'Update an existing invoice — change client details, line items, notes, due date, or status. Cannot edit paid invoices. Recalculates totals if line items change.',
    {
      invoice_id: z.string().describe('Invoice UUID to update'),
      client_data: z
        .object({
          name: z.string().optional(),
          email: z.string().optional(),
          phone: z.string().optional(),
          address: z.string().optional(),
        })
        .optional()
        .describe('Client details to update (merged with existing)'),
      line_items: z
        .array(
          z.object({
            description: z.string(),
            quantity: z.number(),
            unit_price: z.number(),
          })
        )
        .optional()
        .describe('Replacement line items (replaces all items, recalculates totals)'),
      vat_rate: z.number().optional().describe('VAT rate for recalculation'),
      notes: z.string().optional().describe('Invoice notes'),
      due_date: z.string().optional().describe('New due date (ISO-8601)'),
      status: z.enum(['draft', 'sent']).optional().describe('Invoice status'),
    },
    callTool('update_invoice', user)
  );

  server.tool(
    'generate_invoice_pdf',
    'Generate a branded PDF of an invoice using the PDFMonkey template. Returns downloadUrl. To send as WhatsApp document, include MEDIA:<downloadUrl> on its own line.',
    {
      invoice_id: z.string().describe('Invoice UUID (same as quote UUID with invoice_raised=true)'),
    },
    callTool('generate_invoice_pdf', user)
  );

  server.tool(
    'send_invoice',
    'Send an invoice with a Stripe payment link.',
    {
      invoice_id: z.string().describe('Invoice UUID'),
      channel: z.enum(['whatsapp', 'email']).describe('Delivery channel'),
      message: z.string().optional().describe('Custom message'),
    },
    callTool('send_invoice', user)
  );

  server.tool(
    'get_overdue_invoices',
    'Find invoices past their due date.',
    {
      min_days_overdue: z.number().optional().describe('Minimum days overdue (default 1)'),
    },
    callTool('get_overdue_invoices', user)
  );
}

// ─── RAMS & Compliance Tools (4) ────────────────────────────────────────

function registerRamsTools(server: McpServer, user: UserContext): void {
  server.tool(
    'create_rams',
    'Generate a full RAMS (Risk Assessment & Method Statement) for a job using the full pipeline — runs H&S Agent + Install Planner in parallel with RAG-enhanced content and caching. May take up to 3 minutes. Returns rams_job_id, hazard count, method step count, top risks, and PPE list. Then call generate_rams_pdf with the rams_job_id to create the PDF.',
    {
      job_description: z
        .string()
        .describe(
          'Description of the electrical work (be specific — e.g. "Full consumer unit change, 10 way board, existing TN-S system")'
        ),
      job_type: z
        .string()
        .describe('Type of work (e.g. consumer_unit_change, rewire, eicr, ev_charger, fire_alarm)'),
      location: z.string().describe('Job site address'),
      project_name: z
        .string()
        .optional()
        .describe('Project name (defaults to job_type - location)'),
      contractor: z.string().optional().describe('Contractor name'),
      supervisor: z.string().optional().describe('Supervisor name'),
      job_scale: z
        .enum(['domestic', 'commercial', 'industrial'])
        .optional()
        .describe('Job scale (default domestic)'),
    },
    callTool('create_rams', user)
  );

  server.tool(
    'generate_rams_pdf',
    'Generate a professional Combined RAMS PDF (risk assessment + method statement) from a completed RAMS job using the PDFMonkey template. Call create_rams first to get the rams_job_id. Returns a downloadUrl for the professionally formatted PDF. To send the PDF as a WhatsApp document attachment, include MEDIA:<downloadUrl> on its own line in your reply.',
    {
      rams_job_id: z.string().describe('RAMS job UUID from create_rams result'),
    },
    callTool('generate_rams_pdf', user)
  );

  server.tool(
    'generate_method_statement',
    'Generate a standalone method statement using AI. May take up to 2 minutes.',
    {
      task_description: z.string().describe('Detailed description of the task to be performed'),
      location: z.string().describe('Work location/address'),
      equipment: z.array(z.string()).optional().describe('Equipment to be used'),
      sequence_of_works: z
        .array(z.string())
        .optional()
        .describe('Step-by-step work sequence (AI will generate if not provided)'),
    },
    callTool('generate_method_statement', user)
  );

  server.tool(
    'submit_part_p_notification',
    'Submit a Part P Building Control notification for notifiable electrical work.',
    {
      certificate_id: z.string().describe('Certificate UUID'),
      work_type: z.string().describe('Type of notifiable work'),
      property_address: z.string().describe('Property address'),
      work_description: z.string().describe('Description of work carried out'),
      completion_date: z.string().describe('Completion date (ISO-8601)'),
    },
    callTool('submit_part_p_notification', user)
  );
}

// ─── Calendar Tools (3) ─────────────────────────────────────────────────

function registerCalendarTools(server: McpServer, user: UserContext): void {
  server.tool(
    'read_calendar',
    'Read calendar events for a date range.',
    {
      date_from: z.string().optional().describe('Start date (ISO-8601)'),
      date_to: z.string().optional().describe('End date (ISO-8601)'),
      limit: z.number().optional().describe('Max results (default 20)'),
    },
    callTool('read_calendar', user)
  );

  server.tool(
    'create_calendar_event',
    'Create a calendar event. Automatically calculates end time from duration.',
    {
      title: z.string().describe('Event title'),
      date: z.string().describe('Event date (ISO-8601, e.g. 2026-03-03)'),
      time: z.string().describe('Event time (HH:mm, e.g. 14:00)'),
      duration_minutes: z.number().describe('Duration in minutes'),
      address: z.string().optional().describe('Event location/address'),
      event_type: z
        .enum(['job', 'site_visit', 'inspection', 'meeting', 'personal', 'general'])
        .optional()
        .describe('Event type (default general)'),
      client_id: z.string().optional().describe('Linked client UUID'),
      job_id: z.string().optional().describe('Linked job UUID'),
      notes: z.string().optional().describe('Event notes'),
    },
    callTool('create_calendar_event', user)
  );

  server.tool(
    'get_availability',
    'Check available time slots in a date range.',
    {
      date_from: z.string().describe('Start date (ISO-8601)'),
      date_to: z.string().describe('End date (ISO-8601)'),
      duration_minutes: z.number().describe('Required slot duration in minutes'),
    },
    callTool('get_availability', user)
  );
}

// ─── Messaging Tools (2) ────────────────────────────────────────────────

function registerMessagingTools(server: McpServer, user: UserContext): void {
  server.tool(
    'draft_message',
    'Draft a message for the electrician to review. Does NOT send.',
    {
      client_id: z.string().describe('Client UUID'),
      channel: z.enum(['whatsapp', 'email']).describe('Message channel'),
      subject: z.string().optional().describe('Email subject (email only)'),
      body: z.string().describe('Message body text'),
      purpose: z.string().describe('Purpose of the message (e.g. quote follow-up, invoice chase)'),
    },
    callTool('draft_message', user)
  );

  server.tool(
    'send_approved_message',
    'Send a previously approved message to a client. ALWAYS requires electrician approval.',
    {
      draft_id: z.string().optional().describe('Draft message UUID'),
      client_id: z.string().optional().describe('Client UUID (for direct send)'),
      channel: z.string().optional().describe('Channel (for direct send)'),
      body: z.string().optional().describe('Message body (for direct send)'),
    },
    callTool('send_approved_message', user)
  );
}

// ─── Expense Tools (3) ──────────────────────────────────────────────────

function registerExpenseTools(server: McpServer, user: UserContext): void {
  server.tool(
    'create_expense',
    'Log an expense manually or from OCR receipt scan.',
    {
      amount: z.number().describe('Expense amount in GBP'),
      category: z
        .enum(['materials', 'tools', 'fuel', 'mileage', 'insurance', 'training', 'other'])
        .describe('Expense category'),
      description: z.string().describe('Expense description'),
      supplier: z.string().optional().describe('Supplier name'),
      date: z.string().describe('Expense date (ISO-8601)'),
      receipt_photo_url: z.string().optional().describe('URL of receipt photo'),
      job_id: z.string().optional().describe('Linked job UUID'),
    },
    callTool('create_expense', user)
  );

  server.tool(
    'log_mileage',
    'Log a mileage claim.',
    {
      from_address: z.string().describe('Starting address'),
      to_address: z.string().describe('Destination address'),
      miles: z.number().describe('Miles travelled'),
      date: z.string().describe('Date of travel (ISO-8601)'),
      job_id: z.string().optional().describe('Linked job UUID'),
      rate_per_mile: z.number().optional().describe('Rate per mile in GBP (default HMRC rate)'),
    },
    callTool('log_mileage', user)
  );

  server.tool(
    'sync_expense_to_accounting',
    'Push an expense to connected accounting software (Xero/QuickBooks).',
    {
      expense_id: z.string().describe('Expense UUID'),
    },
    callTool('sync_expense_to_accounting', user)
  );
}

// ─── RAG Knowledge Tools (6) ────────────────────────────────────────────

function registerKnowledgeTools(server: McpServer, user: UserContext): void {
  server.tool(
    'lookup_regulation',
    'Search BS 7671 regulations and amendments. Uses verified RAG data, not AI knowledge.',
    {
      query: z.string().describe('Search query (e.g. "RCD protection bathrooms" or "Reg 411.3.3")'),
      match_threshold: z.number().optional().describe('Similarity threshold 0-1 (default 0.7)'),
      match_count: z.number().optional().describe('Max results (default 5)'),
    },
    callTool('lookup_regulation', user)
  );

  server.tool(
    'lookup_practical_method',
    'Search practical work methods, labour timing, and trade knowledge.',
    {
      query: z
        .string()
        .describe('Search query (e.g. "consumer unit change time" or "first fix wiring method")'),
      category: z.string().optional().describe('Category filter'),
    },
    callTool('lookup_practical_method', user)
  );

  server.tool(
    'lookup_health_safety',
    'Search health & safety guidance, hazards, and controls.',
    {
      query: z
        .string()
        .describe('Search query (e.g. "working at height controls" or "asbestos precautions")'),
    },
    callTool('lookup_health_safety', user)
  );

  server.tool(
    'lookup_pricing_guidance',
    'Search material costs, supplier data, and regional pricing.',
    {
      query: z
        .string()
        .describe('Search query (e.g. "consumer unit 10 way price" or "cable costs per metre")'),
      region: z.string().optional().describe('UK region for regional pricing'),
    },
    callTool('lookup_pricing_guidance', user)
  );

  server.tool(
    'lookup_design_guidance',
    'Search circuit design patterns and standard board layouts.',
    {
      query: z
        .string()
        .describe('Search query (e.g. "3-bed house board layout" or "commercial lighting design")'),
    },
    callTool('lookup_design_guidance', user)
  );

  server.tool(
    'lookup_training_content',
    'Search study content and training materials.',
    {
      query: z.string().describe('Search query'),
      level: z.enum(['level2', 'level3', 'qualified']).optional().describe('Training level filter'),
    },
    callTool('lookup_training_content', user)
  );
}

// ─── Elec-ID Tools (2) ─────────────────────────────────────────────────

function registerElecIdTools(server: McpServer, user: UserContext): void {
  server.tool(
    'read_elec_id',
    "Read the electrician's Elec-ID professional profile.",
    {},
    callTool('read_elec_id', user)
  );

  server.tool(
    'share_elec_id',
    'Generate a shareable Elec-ID link with QR code.',
    {
      expires_in_days: z.number().optional().describe('Link expiry in days (default 30)'),
    },
    callTool('share_elec_id', user)
  );
}

// ─── Agent Internal Tools (5) ───────────────────────────────────────────

function registerAgentInternalTools(server: McpServer, user: UserContext): void {
  server.tool(
    'read_memory',
    'Read stored preferences and learned facts about the electrician.',
    {
      key: z.string().optional().describe('Specific preference key to read'),
    },
    callTool('read_memory', user)
  );

  server.tool(
    'write_memory',
    'Store a preference or learned fact.',
    {
      key: z.string().describe('Preference key'),
      value: z.string().describe('Preference value'),
      source: z.enum(['user_stated', 'agent_learned']).describe('How this was learned'),
    },
    callTool('write_memory', user)
  );

  server.tool(
    'delete_memory',
    'Remove a stored preference ("forget that").',
    {
      key: z.string().optional().describe('Specific key to delete'),
      all: z.boolean().optional().describe('Delete all memories'),
    },
    callTool('delete_memory', user)
  );

  server.tool(
    'log_activity',
    'Log an action to the audit trail.',
    {
      action_type: z
        .string()
        .describe('Action type (tool_call, draft, send, approval, security_flag)'),
      action_detail: z.record(z.unknown()).describe('Full context of the action'),
      tool_name: z.string().optional().describe('MCP tool that was called'),
      client_id: z.string().optional().describe('Related client UUID'),
      approved: z.boolean().optional().describe('Whether the action was approved'),
    },
    callTool('log_activity', user)
  );

  server.tool(
    'read_activity_log',
    'Read recent agent activity ("what did you do today?").',
    {
      date_from: z.string().optional().describe('Start date (ISO-8601)'),
      action_type: z.string().optional().describe('Filter by action type'),
      limit: z.number().optional().describe('Max results (default 50)'),
    },
    callTool('read_activity_log', user)
  );
}

// ─── Document Tools (2) ─────────────────────────────────────────────────

function registerDocumentTools(server: McpServer, user: UserContext): void {
  server.tool(
    'generate_briefing_pdf',
    'Generate a branded PDF of a team briefing / toolbox talk using the PDFMonkey template. Returns downloadUrl. To send as WhatsApp document, include MEDIA:<downloadUrl> on its own line.',
    {
      briefing_id: z.string().describe('Team briefing UUID from team_briefings table'),
    },
    callTool('generate_briefing_pdf', user)
  );

  server.tool(
    'generate_shareable_link',
    'Create a 7-day signed URL for any PDF document (cert, quote, or invoice).',
    {
      document_id: z.string().describe('Document UUID'),
      document_type: z.enum(['certificate', 'quote', 'invoice']).describe('Document type'),
    },
    callTool('generate_shareable_link', user)
  );
}

// ─── Email Tools (5) ────────────────────────────────────────────────────

function registerEmailTools(server: McpServer, user: UserContext): void {
  server.tool(
    'connect_email',
    "Connect the electrician's email account via OAuth. Requires approval.",
    {
      provider: z.enum(['gmail', 'outlook']).describe('Email provider'),
    },
    callTool('connect_email', user)
  );

  server.tool(
    'read_inbox',
    'Read recent emails from the connected inbox, filtered for enquiries.',
    {
      unread_only: z.boolean().optional().describe('Only show unread emails'),
      category: z
        .enum(['enquiry', 'quote_response', 'all'])
        .optional()
        .describe('Filter by category'),
      limit: z.number().optional().describe('Max results (default 20)'),
    },
    callTool('read_inbox', user)
  );

  server.tool(
    'categorise_enquiry',
    'AI-classify an inbound email as a lead, existing client, spam, or general.',
    {
      email_id: z.string().describe('Email UUID'),
    },
    callTool('categorise_enquiry', user)
  );

  server.tool(
    'draft_email_reply',
    'Draft a reply to an email for the electrician to review.',
    {
      email_id: z.string().describe('Email UUID'),
      intent: z
        .enum(['acknowledge', 'request_details', 'send_quote', 'decline', 'custom'])
        .describe('Reply intent'),
      custom_message: z.string().optional().describe('Custom message (when intent is custom)'),
    },
    callTool('draft_email_reply', user)
  );

  server.tool(
    'send_email_reply',
    'Send an approved email reply.',
    {
      draft_id: z.string().describe('Draft UUID'),
    },
    callTool('send_email_reply', user)
  );
}

// ─── Task Tools (6) ─────────────────────────────────────────────────────

function registerTaskTools(server: McpServer, user: UserContext): void {
  server.tool(
    'read_tasks',
    "Read the electrician's to-do list. Filter by status, priority, customer, project, or overdue.",
    {
      status: z
        .enum(['open', 'done', 'snoozed', 'cancelled'])
        .optional()
        .describe('Filter by task status'),
      priority: z
        .enum(['low', 'normal', 'high', 'urgent'])
        .optional()
        .describe('Filter by priority'),
      customer_id: z.string().optional().describe('Filter by customer UUID'),
      project_id: z
        .string()
        .optional()
        .describe('Filter by project UUID — get all tasks in a project'),
      due_before: z.string().optional().describe('Find tasks due before this date (ISO-8601)'),
      overdue: z.boolean().optional().describe('Only show overdue tasks'),
      limit: z.number().optional().describe('Max results (default 50)'),
    },
    callTool('read_tasks', user)
  );

  server.tool(
    'create_task',
    'Create a SINGLE standalone task. For multiple related tasks (e.g. steps for a job), use create_project with inline tasks instead — it groups them under one project and orders them correctly. Always set due_at so the task appears in the right place.',
    {
      title: z.string().describe('Task title'),
      details: z.string().optional().describe('Detailed description'),
      priority: z
        .enum(['low', 'normal', 'high', 'urgent'])
        .optional()
        .describe('Priority level (default normal)'),
      due_at: z
        .string()
        .optional()
        .describe('Due date/time (ISO-8601) — ALWAYS set this so the task is ordered correctly'),
      customer_id: z.string().optional().describe('Linked customer UUID'),
      project_id: z
        .string()
        .optional()
        .describe('Linked project UUID — use create_project for new projects with tasks'),
      location: z.string().optional().describe('Task location'),
      tags: z.array(z.string()).optional().describe('Tags for categorisation'),
    },
    callTool('create_task', user)
  );

  server.tool(
    'update_task',
    "Update an existing task's details.",
    {
      task_id: z.string().describe('Task UUID'),
      title: z.string().optional().describe('New title'),
      details: z.string().optional().describe('New details'),
      priority: z.enum(['low', 'normal', 'high', 'urgent']).optional().describe('New priority'),
      due_at: z.string().optional().describe('New due date (ISO-8601), or null to remove'),
      customer_id: z.string().optional().describe('New customer UUID, or null to remove'),
      project_id: z.string().optional().describe('Move task to a project UUID, or null to unlink'),
      location: z.string().optional().describe('New location'),
      tags: z.array(z.string()).optional().describe('New tags'),
    },
    callTool('update_task', user)
  );

  server.tool(
    'complete_task',
    'Mark a task as done.',
    {
      task_id: z.string().describe('Task UUID'),
    },
    callTool('complete_task', user)
  );

  server.tool(
    'snooze_task',
    'Snooze a task until a specified date/time.',
    {
      task_id: z.string().describe('Task UUID'),
      snooze_until: z.string().describe('Snooze until this date/time (ISO-8601)'),
    },
    callTool('snooze_task', user)
  );

  server.tool(
    'delete_task',
    'Delete (cancel) a task.',
    {
      task_id: z.string().describe('Task UUID'),
    },
    callTool('delete_task', user)
  );
}

// ─── Apprentice Tools (24) ──────────────────────────────────────────────

function registerApprenticeTools(server: McpServer, user: UserContext): void {
  // ── Portfolio Tools ──────────────────────────────────────────────────

  server.tool(
    'get_portfolio_status',
    'Get portfolio overview: total entries, ACs/LOs met, approval status, KSB progress.',
    {},
    callTool('get_portfolio_status', user)
  );

  server.tool(
    'read_portfolio_evidence',
    'Read portfolio evidence entries with ACs, LOs, photos, and grades.',
    {
      category: z
        .string()
        .optional()
        .describe('Filter by category (e.g. Health & Safety, Installation Practice)'),
      status: z.string().optional().describe('Filter by status (draft, submitted, approved)'),
      limit: z.number().optional().describe('Max results (default 20)'),
    },
    callTool('read_portfolio_evidence', user)
  );

  server.tool(
    'add_portfolio_evidence',
    'Add a new portfolio evidence entry. Links ACs, LOs, photos, and skills demonstrated.',
    {
      title: z
        .string()
        .describe('Evidence title (e.g. "Three-phase socket install with containment")'),
      category: z
        .string()
        .describe(
          'Category (e.g. Health & Safety, Electrical Theory, Installation Practice, Testing & Inspection)'
        ),
      description: z.string().optional().describe('Detailed description of the work done'),
      skills: z
        .array(z.string())
        .optional()
        .describe('Skills demonstrated (e.g. ["glanding", "earthing", "containment"])'),
      learning_outcomes: z
        .array(z.string())
        .optional()
        .describe('Learning outcomes met (LO text strings)'),
      assessment_criteria: z
        .array(z.string())
        .optional()
        .describe('Assessment criteria met (AC text strings)'),
      reflection: z
        .string()
        .optional()
        .describe('Reflection notes — what was learned, what would be done differently'),
      photo_urls: z.array(z.string()).optional().describe('Photo URLs from WhatsApp or storage'),
      tags: z.array(z.string()).optional().describe('Tags for categorisation'),
      date_completed: z.string().optional().describe('Date work was completed (ISO-8601)'),
      time_spent_minutes: z.number().optional().describe('Time spent on this work in minutes'),
    },
    callTool('add_portfolio_evidence', user)
  );

  server.tool(
    'search_qualification_requirements',
    'Search ACs and LOs from C&G/EAL qualifications (2365, 2357, 5357, etc). Use this to find matching ACs for portfolio evidence.',
    {
      query: z
        .string()
        .describe(
          'Search query (e.g. "three phase installation", "containment earthing", "PPE selection")'
        ),
      qualification_code: z
        .string()
        .optional()
        .describe('Filter by qualification (e.g. 2365-03, 2357, 5357)'),
      unit_code: z.string().optional().describe('Filter by unit code'),
    },
    callTool('search_qualification_requirements', user)
  );

  server.tool(
    'submit_portfolio_for_review',
    'Submit a portfolio entry for tutor/assessor review.',
    {
      evidence_id: z.string().describe('Portfolio evidence UUID'),
    },
    callTool('submit_portfolio_for_review', user)
  );

  server.tool(
    'validate_evidence',
    'Check evidence quality — are ACs linked, is reflection written, are photos attached?',
    {
      evidence_id: z.string().describe('Portfolio evidence UUID'),
    },
    callTool('validate_evidence', user)
  );

  // ── Study Tools ──────────────────────────────────────────────────────

  server.tool(
    'search_study_content',
    'Search 46 courses and 200+ modules of study content.',
    {
      query: z.string().describe('Search query'),
      course: z.string().optional().describe('Filter by course name'),
      level: z.enum(['level2', 'level3']).optional().describe('Filter by level'),
    },
    callTool('search_study_content', user)
  );

  server.tool(
    'generate_practice_questions',
    'Generate practice questions from the 2,000+ question bank.',
    {
      topic: z.string().optional().describe('Topic to focus on'),
      count: z.number().optional().describe('Number of questions (default 10)'),
      difficulty: z.enum(['easy', 'medium', 'hard']).optional().describe('Difficulty level'),
    },
    callTool('generate_practice_questions', user)
  );

  server.tool(
    'get_flashcards',
    'Get spaced repetition flashcards for study.',
    {
      topic: z.string().optional().describe('Topic to study'),
      due_only: z.boolean().optional().describe('Only return cards due for review'),
      limit: z.number().optional().describe('Max cards (default 20)'),
    },
    callTool('get_flashcards', user)
  );

  server.tool(
    'get_learning_progress',
    'Get course completion tracking and progress stats.',
    {
      course: z.string().optional().describe('Specific course name'),
    },
    callTool('get_learning_progress', user)
  );

  server.tool(
    'get_exam_results',
    'Get mock exam history and scores.',
    {
      exam_type: z.string().optional().describe('Filter by exam type'),
      limit: z.number().optional().describe('Max results (default 10)'),
    },
    callTool('get_exam_results', user)
  );

  server.tool(
    'log_ojt_hours',
    'Log off-the-job training hours.',
    {
      date: z.string().describe('Date of training (ISO-8601)'),
      hours: z.number().describe('Hours of training'),
      activity: z.string().describe('Description of training activity'),
      evidence_url: z.string().optional().describe('Evidence photo/document URL'),
    },
    callTool('log_ojt_hours', user)
  );

  server.tool(
    'log_site_diary',
    'Log a daily site diary entry.',
    {
      date: z.string().describe('Date (ISO-8601)'),
      tasks_completed: z.string().describe('Tasks completed today'),
      skills_practised: z.string().optional().describe('Skills practised'),
      observations: z.string().optional().describe('Observations and learning points'),
      photos: z.array(z.string()).optional().describe('Photo URLs'),
    },
    callTool('log_site_diary', user)
  );

  server.tool(
    'get_site_diary_coaching',
    'Get AI feedback on a site diary entry.',
    {
      diary_entry_id: z.string().describe('Site diary entry UUID'),
    },
    callTool('get_site_diary_coaching', user)
  );

  server.tool(
    'run_epa_simulator',
    "Run EPA practice session. Professional discussion reads the user's ACTUAL portfolio entries, matches them to qualification ACs/LOs, and generates questions against their evidence. Returns 6-8 questions with grade descriptors. CLEARLY MARKED AS PRACTICE.",
    {
      mode: z.enum(['knowledge_test', 'professional_discussion']).describe('Simulation mode'),
      topic: z.string().optional().describe('Focus topic'),
      qualification_code: z
        .string()
        .optional()
        .describe('Qualification code (e.g. EL2, EL3). Default: EL2'),
    },
    callTool('run_epa_simulator', user)
  );

  server.tool(
    'score_epa_response',
    "Score an apprentice's answer to an EPA professional discussion question. Returns 0-100 score with 5 subscores (technical, practical, communication, reflection, problem-solving), grade (fail/pass/distinction), feedback, and areas to improve.",
    {
      question: z
        .record(z.unknown())
        .describe('The full question object from run_epa_simulator results'),
      response: z.string().describe("The apprentice's answer text"),
      qualification_code: z.string().optional().describe('Qualification code (default: EL2)'),
    },
    callTool('score_epa_response', user)
  );

  server.tool(
    'run_am2_simulator',
    'Run AM2 practical assessment practice. CLEARLY MARKED AS PRACTICE.',
    {
      section: z.string().optional().describe('AM2 section to practise'),
    },
    callTool('run_am2_simulator', user)
  );

  server.tool(
    'log_mood_checkin',
    'Log a mood check-in (highest sensitivity — encrypted, never shared).',
    {
      mood: z.number().min(1).max(10).describe('Mood rating 1-10'),
      notes: z.string().optional().describe('Optional notes'),
    },
    callTool('log_mood_checkin', user)
  );

  server.tool(
    'get_wellbeing_resources',
    'Get mental health resources and crisis contacts.',
    {
      category: z.string().optional().describe('Resource category'),
    },
    callTool('get_wellbeing_resources', user)
  );

  server.tool(
    'get_safety_scenarios',
    'Get interactive safety case studies for training.',
    {
      topic: z.string().optional().describe('Safety topic'),
    },
    callTool('get_safety_scenarios', user)
  );

  server.tool(
    'get_career_pathways',
    'Get career progression and salary data for the electrical trade.',
    {
      current_level: z.string().optional().describe('Current qualification level'),
    },
    callTool('get_career_pathways', user)
  );

  server.tool(
    'get_apprentice_rights',
    'Get apprentice wages, rights, and support contacts.',
    {
      topic: z.string().optional().describe('Specific topic (wages, rights, support)'),
    },
    callTool('get_apprentice_rights', user)
  );

  server.tool(
    'get_toolbox_guides',
    'Get comprehensive study guides from the 28-guide toolbox.',
    {
      guide_name: z.string().optional().describe('Specific guide name'),
      topic: z.string().optional().describe('Topic to search'),
    },
    callTool('get_toolbox_guides', user)
  );

  server.tool(
    'search_learning_videos',
    'Search the curated video library.',
    {
      query: z.string().describe('Search query'),
      topic: z.string().optional().describe('Topic filter'),
    },
    callTool('search_learning_videos', user)
  );

  server.tool(
    'search_training_providers',
    'Find training providers nearby.',
    {
      postcode: z.string().optional().describe('Postcode for location search'),
      course_type: z.string().optional().describe('Type of course'),
      radius_miles: z.number().optional().describe('Search radius in miles'),
    },
    callTool('search_training_providers', user)
  );
}
