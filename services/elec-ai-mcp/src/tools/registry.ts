/**
 * Master tool registry.
 * Registers all 95 core tools + 21 apprentice tools onto the MCP server (116 total).
 * Tools are role-filtered: electricians get core tools, apprentices get learning tools.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { UserContext } from '../auth.js';
import { getHandler } from './router.js';
import { enforceRateLimits, RateLimitError } from '../middleware/rate-limiter.js';
import { logToolCall } from '../middleware/audit-logger.js';
import { sanitiseError } from '../lib/error-sanitiser.js';
import { recordToolUsage, recordRateLimitHit } from '../middleware/usage-tracker.js';

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

  // Study tools — quiz result tracking (new, available to all roles)
  registerStudyExtras(server, user);

  // Analytics — business intelligence
  registerAnalyticsTools(server, user);

  // Project linking
  registerProjectLinkTools(server, user);

  // Marketplace
  registerMarketplaceTools(server, user);

  // Safety
  registerSafetyTools(server, user);

  // Vision (photo analysis)
  registerVisionTools(server, user);

  // Routing
  registerRoutingTools(server, user);

  // Job Intake (ELE-209)
  registerJobIntakeTools(server, user);

  // Day Planner
  registerDayPlannerTools(server, user);

  // Job Profit
  registerJobProfitTools(server, user);

  // Snagging
  registerSnaggingTools(server, user);

  // Photo Estimate
  registerPhotoEstimateTools(server, user);

  // Google APIs (Solar, Geocoding, Address Validation, Maps, YouTube, Weather)
  registerGoogleApiTools(server, user);

  // Automation (proactive business intelligence)
  registerAutomationTools(server, user);

  // Integrations (ElevenLabs, Perplexity, PDF)
  registerIntegrationTools(server, user);

  // Smart Features (completion workflow, pricing, templates)
  registerSmartFeatureTools(server, user);
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
        // Track rate limit hit in Supabase
        recordRateLimitHit(user.userId);
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

      // ── Usage tracking (ELE-140/207 — fire-and-forget) ───────
      recordToolUsage(user.userId, toolName);

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
      const rawMessage = err instanceof Error ? err.message : String(err);

      // Log raw error internally for debugging
      logToolCall(user, toolName, args, {
        success: false,
        error: rawMessage,
        durationMs,
      });

      // Return sanitised error to agent (ELE-249)
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ error: sanitiseError(rawMessage) }),
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
    'create_quote',
    'Create a quote with manual line items — exactly like the app. Each line item MUST have a price — if the user has not provided prices, ask them before calling this tool. Creates a QTE- prefixed quote record. NEVER use create_invoice for quotes.',
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
        .optional()
        .describe('Job details'),
      items: z
        .array(
          z.object({
            description: z.string().describe('Item description'),
            category: z
              .enum(['labour', 'materials', 'equipment'])
              .optional()
              .describe('Item category (defaults to materials)'),
            quantity: z.number().positive().describe('Quantity — must be greater than zero'),
            unitPrice: z
              .number()
              .nonnegative()
              .describe('Price per unit in GBP — REQUIRED. Use this or unit_price.'),
            unit_price: z
              .number()
              .nonnegative()
              .optional()
              .describe('Price per unit in GBP (alias for unitPrice — use either, not both)'),
            unit: z.string().optional().describe('Unit type: each, metre, hours, etc.'),
            notes: z.string().optional().describe('Optional notes'),
          })
        )
        .min(1, 'At least one line item is required')
        .describe(
          'Line items — every item MUST include a unitPrice greater than or equal to zero. If the user has not specified prices, ask them first.'
        ),
      vat_registered: z.boolean().optional().describe('Whether to apply VAT (default false)'),
      vat_rate: z.number().optional().describe('VAT rate percentage (default 20)'),
      notes: z.string().optional().describe('Quote notes'),
    },
    callTool('create_quote', user)
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
    'create_quote_pdf',
    'Generate a branded PDF of a quote. Returns downloadUrl. To send as WhatsApp document, include MEDIA:<downloadUrl> on its own line.',
    {
      quote_id: z.string().describe('Quote UUID'),
    },
    callTool('create_quote_pdf', user)
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

  server.tool(
    'add_receipt_to_quote',
    'Add receipt items to an existing quote. Call analyse_photo on the receipt first, then pass photo_analysis_id + quote_id. Appends materials line items and recalculates totals.',
    {
      photo_analysis_id: z
        .string()
        .describe('Photo analysis UUID from analyse_photo (must be analysis_type=receipt)'),
      quote_id: z.string().describe('Quote UUID to add items to'),
    },
    callTool('add_receipt_to_quote', user)
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

// ─── Certificate Tools (14) ─────────────────────────────────────────────

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

  server.tool(
    'create_eicr',
    'Create a new EICR (Electrical Installation Condition Report) as a draft. Returns eicr_id, certificate_number, and report_id. Use update_eicr to fill in sections.',
    {
      client_name: z.string().describe('Client full name'),
      installation_address: z.string().describe('Full installation address'),
      inspection_date: z.string().optional().describe('Inspection date (ISO-8601, default today)'),
      property_type: z
        .enum(['domestic', 'commercial'])
        .optional()
        .describe(
          'Property type (default domestic). Affects expiry: 5yr domestic, 3yr commercial.'
        ),
      inspector_name: z.string().optional().describe('Inspector name'),
      customer_id: z.string().optional().describe('Customer UUID from customers table'),
      purpose_of_inspection: z
        .string()
        .optional()
        .describe('Purpose of inspection (e.g. "Periodic inspection", "Change of occupancy")'),
    },
    callTool('create_eicr', user)
  );

  server.tool(
    'update_eicr',
    'Update an EICR section. Uses optimistic concurrency — pass edit_version from the last read. Merges new data into existing JSONB. Sections: client, installation, supply, earthing, boards, inspection, testing, defects, inspector, company.',
    {
      eicr_id: z.string().describe('EICR UUID'),
      edit_version: z
        .number()
        .describe('Current edit_version from read_eicr. Prevents concurrent edit conflicts.'),
      data: z
        .record(z.unknown())
        .describe(
          'Data object to deep merge into the EICR. Keys match sections: supply, earthing, boards, inspection, testing, defects, inspector, company, etc.'
        ),
      section: z
        .enum([
          'client',
          'installation',
          'supply',
          'earthing',
          'boards',
          'inspection',
          'testing',
          'defects',
          'inspector',
          'company',
        ])
        .optional()
        .describe('Section being updated (for audit logging)'),
      status: z
        .enum(['draft', 'in_progress', 'completed'])
        .optional()
        .describe('Update EICR status'),
    },
    callTool('update_eicr', user)
  );

  server.tool(
    'read_eicr',
    'Read an EICR with all data. Optionally include full inspection items, defects, circuits, and photos.',
    {
      eicr_id: z.string().describe('EICR UUID'),
      include: z
        .array(z.enum(['inspection_items', 'defects', 'circuits', 'photos', 'all']))
        .optional()
        .describe(
          'Include full arrays: inspection_items, defects, circuits, photos, or "all" for everything.'
        ),
    },
    callTool('read_eicr', user)
  );

  // ── EIC Tools ──────────────────────────────────────────────────────────

  server.tool(
    'create_eic',
    'Create a new EIC (Electrical Installation Certificate) as a draft. Returns eic_id, certificate_number, and report_id. Use update_eic to fill in sections.',
    {
      client_name: z.string().describe('Client full name'),
      installation_address: z.string().describe('Full installation address'),
      inspection_date: z.string().optional().describe('Inspection date (ISO-8601, default today)'),
      property_type: z
        .enum(['domestic', 'commercial'])
        .optional()
        .describe(
          'Property type (default domestic). Affects expiry: 5yr domestic, 3yr commercial.'
        ),
      inspector_name: z.string().optional().describe('Inspector/designer name'),
      customer_id: z.string().optional().describe('Customer UUID from customers table'),
      description_of_installation: z
        .string()
        .optional()
        .describe('Description of the installation'),
    },
    callTool('create_eic', user)
  );

  server.tool(
    'update_eic',
    'Update an EIC section. Uses optimistic concurrency — pass edit_version from the last read. Merges new data into existing JSONB. Sections: client, installation, design, construction, inspection, testing, schedule_of_circuits, inspector, company.',
    {
      eic_id: z.string().describe('EIC UUID'),
      edit_version: z
        .number()
        .describe('Current edit_version from read_eic. Prevents concurrent edit conflicts.'),
      data: z
        .record(z.unknown())
        .describe(
          'Data object to deep merge into the EIC. Keys match sections: design, construction, inspection, testing, schedule_of_circuits, inspector, company, etc.'
        ),
      section: z
        .enum([
          'client',
          'installation',
          'design',
          'construction',
          'inspection',
          'testing',
          'schedule_of_circuits',
          'inspector',
          'company',
        ])
        .optional()
        .describe('Section being updated (for audit logging)'),
      status: z
        .enum(['draft', 'in_progress', 'completed'])
        .optional()
        .describe('Update EIC status'),
    },
    callTool('update_eic', user)
  );

  server.tool(
    'read_eic',
    'Read an EIC with all data. Optionally include full circuit schedule and photos.',
    {
      eic_id: z.string().describe('EIC UUID'),
      include: z
        .array(z.enum(['circuits', 'photos', 'all']))
        .optional()
        .describe('Include full arrays: circuits, photos, or "all" for everything.'),
    },
    callTool('read_eic', user)
  );

  // ── Minor Works Tools ──────────────────────────────────────────────────

  server.tool(
    'create_minor_works',
    'Create a new Minor Works Certificate as a draft. Returns minor_works_id, certificate_number, and report_id. Use update_minor_works to fill in sections.',
    {
      client_name: z.string().describe('Client full name'),
      installation_address: z.string().describe('Full installation address'),
      inspection_date: z.string().optional().describe('Inspection date (ISO-8601, default today)'),
      inspector_name: z.string().optional().describe('Inspector/responsible person name'),
      customer_id: z.string().optional().describe('Customer UUID from customers table'),
      description_of_work: z
        .string()
        .optional()
        .describe('Description of the minor works carried out'),
    },
    callTool('create_minor_works', user)
  );

  server.tool(
    'update_minor_works',
    'Update a Minor Works Certificate section. Uses optimistic concurrency — pass edit_version from the last read. Sections: description, installation, essential_tests, declaration, inspector, company.',
    {
      minor_works_id: z.string().describe('Minor Works UUID'),
      edit_version: z
        .number()
        .describe(
          'Current edit_version from read_minor_works. Prevents concurrent edit conflicts.'
        ),
      data: z
        .record(z.unknown())
        .describe(
          'Data object to deep merge. Keys match sections: part_1_description, part_2_installation, part_3_essential_tests, part_4_declaration, inspector, company.'
        ),
      section: z
        .enum([
          'description',
          'installation',
          'essential_tests',
          'declaration',
          'inspector',
          'company',
        ])
        .optional()
        .describe('Section being updated (for audit logging)'),
      status: z
        .enum(['draft', 'in_progress', 'completed'])
        .optional()
        .describe('Update Minor Works status'),
    },
    callTool('update_minor_works', user)
  );

  server.tool(
    'read_minor_works',
    'Read a Minor Works Certificate with all data. Optionally include photos.',
    {
      minor_works_id: z.string().describe('Minor Works UUID'),
      include: z
        .array(z.enum(['photos', 'all']))
        .optional()
        .describe('Include photos, or "all" for everything.'),
    },
    callTool('read_minor_works', user)
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
    'Create a draft INVOICE (INV- prefix) with line items. Use ONLY when the user explicitly asks for an invoice — NOT for quotes. For quotes always use create_quote instead.',
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
      confirmed: z
        .boolean()
        .optional()
        .describe(
          'Set to true to override safety checks (e.g. amount >2x average, possible duplicate). Only pass this after the user explicitly confirms.'
        ),
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
      invoice_id: z.string().describe('Invoice UUID from the invoices table'),
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

  server.tool(
    'add_receipt_to_invoice',
    'Add receipt items to an existing invoice. Call analyse_photo on the receipt first, then pass photo_analysis_id + invoice_id. Appends materials line items and recalculates totals including VAT.',
    {
      photo_analysis_id: z
        .string()
        .describe('Photo analysis UUID from analyse_photo (must be analysis_type=receipt)'),
      invoice_id: z.string().describe('Invoice UUID to add items to'),
    },
    callTool('add_receipt_to_invoice', user)
  );
}

// ─── RAMS & Compliance Tools (4) ────────────────────────────────────────

function registerRamsTools(server: McpServer, user: UserContext): void {
  server.tool(
    'read_rams',
    'Read RAMS generation job history. Returns status, progress, project info for each job.',
    {
      status: z
        .string()
        .optional()
        .describe('Filter by status (e.g. complete, partial, failed, processing)'),
      date_from: z.string().optional().describe('Start date (ISO-8601)'),
      date_to: z.string().optional().describe('End date (ISO-8601)'),
      search: z.string().optional().describe('Search project name'),
      limit: z.number().optional().describe('Max results (default 50)'),
    },
    callTool('read_rams', user)
  );

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

// ─── Calendar Tools (5) ─────────────────────────────────────────────────

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
    'update_calendar_event',
    'Update an existing calendar event. Supports partial updates — only provide fields you want to change. Date/time changes are merged with existing values (e.g. change just the time without changing the date).',
    {
      event_id: z.string().describe('Calendar event UUID'),
      title: z.string().optional().describe('New event title'),
      date: z.string().optional().describe('New date (ISO-8601, e.g. 2026-03-05)'),
      time: z.string().optional().describe('New time (HH:mm, e.g. 16:00)'),
      duration_minutes: z.number().optional().describe('New duration in minutes'),
      address: z.string().optional().describe('New location/address'),
      event_type: z
        .enum(['job', 'site_visit', 'inspection', 'meeting', 'personal', 'general'])
        .optional()
        .describe('New event type'),
      client_id: z.string().optional().describe('New linked client UUID'),
      job_id: z.string().optional().describe('New linked job UUID'),
      notes: z.string().optional().describe('New event notes'),
      description: z.string().optional().describe('New event description'),
    },
    callTool('update_calendar_event', user)
  );

  server.tool(
    'delete_calendar_event',
    'Delete a calendar event. Returns details of the deleted event for confirmation.',
    {
      event_id: z.string().describe('Calendar event UUID to delete'),
    },
    callTool('delete_calendar_event', user)
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

  server.tool(
    'share_booking_link',
    'Get a shareable booking link for clients to book a time slot. Include the URL in a WhatsApp message to let clients self-serve.',
    {
      message: z.string().optional().describe('Custom message to include when sharing the link'),
    },
    callTool('share_booking_link', user)
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
    'read_expenses',
    'Read expense history with optional filters. Returns items, count, and total amount.',
    {
      date_from: z.string().optional().describe('Start date (ISO-8601)'),
      date_to: z.string().optional().describe('End date (ISO-8601)'),
      category: z
        .enum([
          'materials',
          'tools',
          'fuel',
          'mileage',
          'ppe',
          'hotels',
          'training',
          'vehicle',
          'insurance',
          'subscriptions',
          'meals',
          'other',
        ])
        .optional()
        .describe('Filter by category'),
      min_amount: z.number().optional().describe('Minimum amount (GBP)'),
      max_amount: z.number().optional().describe('Maximum amount (GBP)'),
      limit: z.number().optional().describe('Max results (default 50)'),
    },
    callTool('read_expenses', user)
  );

  server.tool(
    'create_expense',
    'Log an expense manually or from OCR receipt scan.',
    {
      amount: z.number().describe('Expense amount in GBP'),
      category: z
        .enum([
          'materials',
          'tools',
          'fuel',
          'mileage',
          'ppe',
          'hotels',
          'training',
          'vehicle',
          'insurance',
          'subscriptions',
          'meals',
          'other',
        ])
        .describe('Expense category'),
      description: z.string().describe('Expense description'),
      vendor: z.string().optional().describe('Vendor/supplier name'),
      date: z.string().describe('Expense date (ISO-8601)'),
      receipt_url: z.string().optional().describe('URL of receipt photo'),
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
      rate_per_mile: z.number().optional().describe('Rate per mile in GBP (default HMRC 0.45)'),
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

  server.tool(
    'add_receipt_to_expense',
    'Create an expense from a receipt photo analysis. Call analyse_photo first, then pass the photo_analysis_id.',
    {
      photo_analysis_id: z
        .string()
        .describe('Photo analysis UUID from analyse_photo (must be analysis_type=receipt)'),
    },
    callTool('add_receipt_to_expense', user)
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

  server.tool(
    'get_usage_summary',
    'Get usage stats for this user — tool calls, messages sent, knowledge lookups. Use when the user asks about their usage or activity.',
    {
      days: z.number().optional().describe('Number of days to look back (default 7, max 90)'),
    },
    callTool('get_usage_summary', user)
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
    'create_evidence_from_photo',
    'Turn a photo analysis into portfolio evidence. Auto-extracts skills, matches ACs/LOs from qualifications, creates a portfolio_items entry with photo linked. Ideal for apprentices who send site photos.',
    {
      photo_analysis_id: z.string().describe('Photo analysis UUID from analyse_photo'),
      title: z
        .string()
        .optional()
        .describe('Evidence title (auto-generated from photo if not provided)'),
      category: z
        .string()
        .optional()
        .describe(
          'Category (e.g. Installation Practice, Testing & Inspection). Auto-detected if not provided.'
        ),
      reflection: z.string().optional().describe('Reflection notes — what was learned'),
      skills: z
        .array(z.string())
        .optional()
        .describe('Additional skills to tag (auto-extracted from photo analysis + these)'),
    },
    callTool('create_evidence_from_photo', user)
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

// ─── Study Extras (2) — quiz result tracking ────────────────────────────

function registerStudyExtras(server: McpServer, user: UserContext): void {
  server.tool(
    'save_quiz_result',
    'Save the result of a quiz session. Tracks topic, score, and category breakdown for trend analysis.',
    {
      topic: z.string().describe('Quiz topic (e.g. "Safe Isolation", "RCD Protection")'),
      score: z.number().describe('Score as a percentage (0-100)'),
      total_questions: z.number().describe('Total number of questions in the quiz'),
      correct_answers: z.number().describe('Number of correct answers'),
      category_breakdown: z
        .record(z.number())
        .optional()
        .describe('Score breakdown by category (e.g. {"theory": 80, "practical": 60})'),
      difficulty: z.enum(['easy', 'medium', 'hard']).optional().describe('Quiz difficulty'),
      source: z.string().optional().describe('Source of quiz (default: whatsapp_quiz)'),
    },
    callTool('save_quiz_result', user)
  );

  server.tool(
    'get_quiz_history',
    'Get past quiz results with trend analysis and weak area identification. Shows improving/declining topics.',
    {
      topic: z.string().optional().describe('Filter by topic'),
      limit: z.number().optional().describe('Max results (default 20)'),
    },
    callTool('get_quiz_history', user)
  );
}

// ─── Analytics Tools (13) ───────────────────────────────────────────────

function registerAnalyticsTools(server: McpServer, user: UserContext): void {
  server.tool(
    'get_revenue_summary',
    'Get revenue summary for a period — total revenue, invoice count, average job value, growth vs previous period.',
    {
      period: z
        .enum(['week', 'month', 'quarter', 'year'])
        .optional()
        .describe('Time period (default: month)'),
    },
    callTool('get_revenue_summary', user)
  );

  server.tool(
    'get_outstanding_payments',
    'Get total outstanding payments with aging breakdown (7/14/30/60+ days overdue).',
    {},
    callTool('get_outstanding_payments', user)
  );

  server.tool(
    'get_business_snapshot',
    "Get a full business snapshot — open tasks, pending quotes, overdue invoices, expiring certs, today's schedule. Perfect for morning briefings.",
    {},
    callTool('get_business_snapshot', user)
  );

  server.tool(
    'get_top_clients',
    'Get top clients ranked by revenue in a period.',
    {
      period: z
        .enum(['month', 'quarter', 'year'])
        .optional()
        .describe('Time period (default: year)'),
      limit: z.number().optional().describe('Max clients (default 10)'),
    },
    callTool('get_top_clients', user)
  );

  server.tool(
    'get_inactive_clients',
    'Get clients with no activity (quotes, invoices, certificates) in the last N months. Useful for "fill my diary" outreach.',
    {
      months_inactive: z
        .number()
        .optional()
        .describe('Months of inactivity threshold (default: 6)'),
      limit: z.number().optional().describe('Max clients to return (default: 10)'),
    },
    callTool('get_inactive_clients', user)
  );

  server.tool(
    'get_quote_analytics',
    'Quote conversion analytics — conversion rate, rejection rate, pipeline value, time to convert, and conversion by price range.',
    {
      period: z
        .enum(['month', 'quarter', 'year'])
        .optional()
        .describe('Time period (default: quarter)'),
    },
    callTool('get_quote_analytics', user)
  );

  server.tool(
    'get_pricing_analysis',
    'Pricing analysis — average quote/invoice values, monthly trends, VAT recovery summary.',
    {
      period: z
        .enum(['month', 'quarter', 'year'])
        .optional()
        .describe('Time period (default: year)'),
    },
    callTool('get_pricing_analysis', user)
  );

  server.tool(
    'get_revenue_forecast',
    'Revenue forecast — monthly trend, predicted next month, pipeline forecast weighted by conversion rate, cash expected from sent invoices.',
    {},
    callTool('get_revenue_forecast', user)
  );

  server.tool(
    'get_seasonal_trends',
    'Seasonal business trends — monthly revenue breakdown, busiest/quietest months, year-on-year comparison.',
    {},
    callTool('get_seasonal_trends', user)
  );

  server.tool(
    'get_client_lifetime_value',
    'Client lifetime value analysis — top clients by total revenue, average order value, repeat rate, acquisition timeline.',
    {
      limit: z.number().optional().describe('Max clients to return (default: 10)'),
    },
    callTool('get_client_lifetime_value', user)
  );

  server.tool(
    'get_profitability_analysis',
    'Profitability analysis — gross revenue, expenses by category, net profit, margin percentage, month-on-month profit trend.',
    {
      period: z
        .enum(['week', 'month', 'quarter', 'year'])
        .optional()
        .describe('Time period (default: month)'),
    },
    callTool('get_profitability_analysis', user)
  );

  server.tool(
    'get_cash_flow_forecast',
    'Cash flow forecast — days sales outstanding (DSO), expected inflows (30/60/90 days), average weekly outflow, at-risk overdue invoices.',
    {},
    callTool('get_cash_flow_forecast', user)
  );

  server.tool(
    'get_at_risk_alerts',
    'Business risk alerts — overdue invoices, expiring quotes, VIP clients gone quiet, expiring certificates, negative cash flow warning. Sorted by severity.',
    {},
    callTool('get_at_risk_alerts', user)
  );
}

// ─── Project Link Tools (3) ─────────────────────────────────────────────

function registerProjectLinkTools(server: McpServer, user: UserContext): void {
  server.tool(
    'link_to_project',
    'Link any entity (task, quote, invoice, certificate, RAMS, circuit design, site visit) to a project.',
    {
      project_id: z.string().describe('Project UUID'),
      entity_type: z
        .enum(['task', 'quote', 'invoice', 'certificate', 'rams', 'circuit_design', 'site_visit'])
        .describe('Type of entity to link'),
      entity_id: z.string().describe('Entity UUID'),
    },
    callTool('link_to_project', user)
  );

  server.tool(
    'unlink_from_project',
    'Remove an entity from a project. The entity continues to exist independently.',
    {
      entity_type: z
        .enum(['task', 'quote', 'invoice', 'certificate', 'rams', 'circuit_design', 'site_visit'])
        .describe('Type of entity to unlink'),
      entity_id: z.string().describe('Entity UUID'),
    },
    callTool('unlink_from_project', user)
  );

  server.tool(
    'get_project_summary',
    'Get a complete project summary — all linked tasks, quotes, invoices, certificates, RAMS, designs with progress and totals.',
    {
      project_id: z.string().describe('Project UUID'),
    },
    callTool('get_project_summary', user)
  );
}

// ─── Marketplace Tools (4) ──────────────────────────────────────────────

function registerMarketplaceTools(server: McpServer, user: UserContext): void {
  server.tool(
    'search_products',
    'Search electrical products by name, category, or supplier. Returns product details including image_url (send to user via MEDIA:<image_url> to show product photos), current_price, product_url, and supplier name.',
    {
      query: z.string().describe('Product search query'),
      category: z.string().optional().describe('Product category filter'),
      supplier: z.string().optional().describe('Supplier filter (e.g. CEF, Screwfix, TLC)'),
      limit: z.number().optional().describe('Max results (default 20)'),
    },
    callTool('search_products', user)
  );

  server.tool(
    'compare_prices',
    'Compare prices for a product across multiple suppliers. Returns products grouped by supplier with image_url (send via MEDIA:<image_url>), current_price, product_url, and cheapest option highlighted.',
    {
      product_name: z.string().describe('Product name to compare'),
    },
    callTool('compare_prices', user)
  );

  server.tool(
    'price_materials_for_job',
    'Price up materials for a job. Describe the job and the tool will extract material keywords, look up prices across suppliers, and return an itemised price list with the cheapest option per item including image_url and product_url. Useful for quick cost estimates.',
    {
      job_description: z
        .string()
        .describe(
          'Job description with materials needed (e.g. "consumer unit change, 10 ways, 30m 2.5mm T&E, 15m 6mm, 6x RCBOs")'
        ),
      preferred_supplier: z
        .string()
        .optional()
        .describe(
          'Preferred supplier (e.g. "CEF", "Screwfix"). If set, only prices from this supplier.'
        ),
      budget_limit: z
        .number()
        .optional()
        .describe('Budget limit in GBP. Returns whether total is within budget.'),
    },
    callTool('price_materials_for_job', user)
  );

  server.tool(
    'get_deals',
    'Get current deals from electrical suppliers. Returns deal details with discount_percentage, deal_price, original_price, supplier name, and product image_url.',
    {
      supplier: z.string().optional().describe('Filter by supplier name (e.g. CEF, Screwfix, TLC)'),
      limit: z.number().optional().describe('Max deals (default 10)'),
    },
    callTool('get_deals', user)
  );
}

// ─── Safety Tools (3) ───────────────────────────────────────────────────

function registerSafetyTools(server: McpServer, user: UserContext): void {
  server.tool(
    'get_safety_templates',
    'Browse safety document templates (risk assessments, method statements, toolbox talks).',
    {
      category: z.string().optional().describe('Template category'),
      template_type: z.string().optional().describe('Template type'),
      search: z.string().optional().describe('Search by title or description'),
      limit: z.number().optional().describe('Max results (default 20)'),
    },
    callTool('get_safety_templates', user)
  );

  server.tool(
    'create_safe_isolation_record',
    'Log a safe isolation procedure (GS38 compliant). Records voltage readings, lock-off, proving unit use.',
    {
      location: z.string().describe('Job site location'),
      circuit_description: z.string().describe('Circuit being isolated'),
      supply_type: z.string().optional().describe('Supply type (e.g. TN-S, TN-C-S, TT)'),
      isolation_point: z.string().optional().describe('Where isolation was applied'),
      voltage_before: z.number().optional().describe('Voltage reading before isolation (V)'),
      voltage_after: z.number().optional().describe('Voltage reading after isolation (V)'),
      proving_unit_used: z.boolean().optional().describe('Was a proving unit used?'),
      lock_off_applied: z.boolean().optional().describe('Was lock-off applied?'),
      caution_notice_posted: z.boolean().optional().describe('Was a caution notice posted?'),
      gs38_compliant: z.boolean().optional().describe('Was the procedure GS38 compliant?'),
      notes: z.string().optional().describe('Additional notes'),
      date: z.string().optional().describe('Date of isolation (ISO-8601, default today)'),
      customer_id: z.string().optional().describe('Linked customer UUID'),
      job_id: z.string().optional().describe('Linked job UUID'),
    },
    callTool('create_safe_isolation_record', user)
  );

  server.tool(
    'log_site_diary_entry',
    'Log a daily site diary entry — work done, issues, materials, hours.',
    {
      date: z.string().describe('Date (ISO-8601)'),
      summary: z.string().describe('Brief summary of the day'),
      location: z.string().optional().describe('Site location'),
      work_completed: z.string().optional().describe('Detailed work completed'),
      issues_encountered: z.string().optional().describe('Any issues or problems'),
      materials_used: z.string().optional().describe('Materials used'),
      weather_conditions: z.string().optional().describe('Weather conditions'),
      hours_worked: z.number().optional().describe('Hours worked'),
      customer_id: z.string().optional().describe('Linked customer UUID'),
      project_id: z.string().optional().describe('Linked project UUID'),
      photos: z.array(z.string()).optional().describe('Photo URLs'),
    },
    callTool('log_site_diary_entry', user)
  );

  server.tool(
    'read_site_diary',
    'Read site diary entries with optional filters. Returns diary entries with summaries, locations, and work details.',
    {
      date_from: z.string().optional().describe('Start date (ISO-8601)'),
      date_to: z.string().optional().describe('End date (ISO-8601)'),
      location: z.string().optional().describe('Filter by location (partial match)'),
      project_id: z.string().optional().describe('Filter by project UUID'),
      limit: z.number().optional().describe('Max results (default 50)'),
    },
    callTool('read_site_diary', user)
  );

  server.tool(
    'read_safe_isolation_records',
    'Read safe isolation records. Returns GS38 procedure records with voltage readings, lock-off status, and compliance details.',
    {
      date_from: z.string().optional().describe('Start date (ISO-8601)'),
      date_to: z.string().optional().describe('End date (ISO-8601)'),
      location: z.string().optional().describe('Filter by location (partial match)'),
      gs38_compliant: z.boolean().optional().describe('Filter by GS38 compliance status'),
      limit: z.number().optional().describe('Max results (default 50)'),
    },
    callTool('read_safe_isolation_records', user)
  );
}

// ─── Vision Tools (3) ───────────────────────────────────────────────────

function registerVisionTools(server: McpServer, user: UserContext): void {
  server.tool(
    'analyse_photo',
    'Analyse a photo of a consumer unit, electrical installation, or receipt using AI vision. Returns structured observations, compliance issues, details, and a photo_analysis_id for linking.',
    {
      image_url: z
        .string()
        .describe('URL of the image to analyse (from WhatsApp or Supabase storage)'),
      context: z
        .string()
        .optional()
        .describe(
          'Additional context from the electrician (e.g. "This is the board at 14 Oak Street")'
        ),
      property_address: z.string().optional().describe('Property address to link the analysis to'),
      tags: z
        .array(z.string())
        .optional()
        .describe('Tags to attach to the photo (e.g. ["first fix", "kitchen"])'),
    },
    callTool('analyse_photo', user)
  );

  server.tool(
    'attach_photo_to_entity',
    'Attach a photo to a job, certificate, site diary, portfolio, project, quote, or invoice. Runs AI analysis automatically and links the photo to the entity.',
    {
      image_url: z.string().describe('URL of the image'),
      entity_type: z
        .enum(['job', 'certificate', 'site_diary', 'portfolio', 'project', 'quote', 'invoice'])
        .describe('Type of entity to attach the photo to'),
      entity_id: z.string().describe('Entity UUID'),
      description: z
        .string()
        .optional()
        .describe('Manual description (AI generates one if not provided)'),
      property_address: z.string().optional().describe('Property address'),
      tags: z.array(z.string()).optional().describe('Tags for categorisation'),
    },
    callTool('attach_photo_to_entity', user)
  );

  server.tool(
    'get_entity_photos',
    'Retrieve all photos linked to an entity (job, project, quote, invoice, portfolio, site diary).',
    {
      entity_type: z
        .enum(['job', 'certificate', 'site_diary', 'portfolio', 'project', 'quote', 'invoice'])
        .describe('Type of entity'),
      entity_id: z.string().describe('Entity UUID'),
    },
    callTool('get_entity_photos', user)
  );
}

// ─── Routing Tools (1) ──────────────────────────────────────────────────

function registerRoutingTools(server: McpServer, user: UserContext): void {
  server.tool(
    'get_route_to_job',
    "Get driving directions to a job site with real-time traffic estimates. Uses Google Maps Directions API. Returns route options with duration, distance, and traffic-adjusted times. Defaults to the user's business address as origin.",
    {
      destination: z
        .string()
        .describe('Destination address (e.g. "42 High Street, Birmingham B1 1AA")'),
      origin: z
        .string()
        .optional()
        .describe('Starting address (defaults to business address from company profile)'),
      departure_time: z.string().optional().describe('Departure time (ISO-8601, defaults to now)'),
    },
    callTool('get_route_to_job', user)
  );
}

// ─── Job Intake Tools (1) — ELE-209 ─────────────────────────────────────

function registerJobIntakeTools(server: McpServer, user: UserContext): void {
  server.tool(
    'create_job_intake',
    'Turn a job enquiry into a full project with trade-specific tasks. Use this when the electrician receives a job request (WhatsApp forward, phone call, email). Automatically generates a task checklist based on the job type using RAG trade knowledge. The electrician MUST approve the plan before you proceed with quoting or scheduling.',
    {
      job_type: z
        .string()
        .describe(
          'Type of electrical work (e.g. "consumer unit upgrade", "EICR", "rewire", "EV charger", "fire alarm", "lighting", "fault finding", "socket installation")'
        ),
      title: z
        .string()
        .optional()
        .describe('Custom project title. If omitted, auto-generated from job type + address.'),
      description: z
        .string()
        .optional()
        .describe('Job description / scope of work from the enquiry'),
      address: z.string().optional().describe('Property address'),
      customer_id: z
        .string()
        .optional()
        .describe('Customer UUID (if existing client — use read_clients to find)'),
      urgency: z.enum(['normal', 'urgent']).optional().describe('Job urgency (default normal)'),
      estimated_value: z.number().optional().describe('Estimated job value in GBP'),
      start_date: z
        .string()
        .optional()
        .describe('Planned start date (ISO-8601). Tasks are spaced 1 day apart from this date.'),
      due_date: z.string().optional().describe('Job deadline (ISO-8601)'),
      source: z
        .enum(['whatsapp_forward', 'app', 'email', 'phone'])
        .optional()
        .describe('How the enquiry came in (default whatsapp_forward)'),
      site_visit_date: z
        .string()
        .optional()
        .describe('Date for site visit (ISO-8601 date, e.g. 2026-03-10)'),
      site_visit_time: z.string().optional().describe('Time for site visit (HH:mm, e.g. 09:00)'),
      site_visit_duration: z
        .number()
        .optional()
        .describe('Site visit duration in minutes (default 60)'),
    },
    callTool('create_job_intake', user)
  );
}

// ─── Day Planner Tools (1) ──────────────────────────────────────────────

function registerDayPlannerTools(server: McpServer, user: UserContext): void {
  server.tool(
    'plan_my_day',
    "Optimise today's schedule by finding the best driving route between calendar events. Fetches events with addresses, calls Google Maps Distance Matrix API, and solves the Travelling Salesman Problem to minimise total driving time. Returns optimised route order with travel times and minutes saved.",
    {
      date: z.string().optional().describe('Date to plan (ISO-8601, default today)'),
      start_address: z
        .string()
        .optional()
        .describe('Home/start address (defaults to business address from company profile)'),
    },
    callTool('plan_my_day', user)
  );
}

// ─── Job Profit Tools (1) ───────────────────────────────────────────────

function registerJobProfitTools(server: McpServer, user: UserContext): void {
  server.tool(
    'calculate_job_profit',
    'Calculate the profit/loss on a project. Aggregates revenue from linked invoices, matches expenses by description/location/date overlap, and calculates materials cost from quote line items. Returns gross profit, margin percentage, and matched expense breakdown.',
    {
      job_id: z.string().describe('Project UUID from spark_projects'),
      include_estimates: z
        .boolean()
        .optional()
        .describe('Include RAG-based labour cost estimates for gaps (default false)'),
    },
    callTool('calculate_job_profit', user)
  );
}

// ─── Snagging Tools (1) ─────────────────────────────────────────────────

function registerSnaggingTools(server: McpServer, user: UserContext): void {
  server.tool(
    'create_snag',
    'Create a snagging item on a project. Optionally analyse a photo to enrich the description and auto-detect severity (C1 → critical, C2 → high). If no project_id is given, a new snagging project is created automatically.',
    {
      title: z.string().describe('Short title for the snag (e.g. "Exposed cable behind CU")'),
      project_id: z
        .string()
        .optional()
        .describe('Link snag to an existing spark_project. If omitted, a new project is created.'),
      description: z.string().optional().describe('Detailed description of the issue'),
      severity: z
        .enum(['low', 'normal', 'high', 'critical'])
        .optional()
        .describe(
          'Severity — maps to task priority. If a photo is provided and severity is normal, AI may upgrade it based on observations.'
        ),
      location: z
        .string()
        .optional()
        .describe('Location on site (e.g. "Kitchen", "First floor landing")'),
      image_url: z
        .string()
        .optional()
        .describe(
          'URL of a photo showing the issue. Will be analysed by AI if no photo_analysis_id is provided.'
        ),
      photo_analysis_id: z
        .string()
        .optional()
        .describe(
          'Existing photo_analyses UUID — skips re-analysis if the photo was already analysed'
        ),
      due_date: z
        .string()
        .optional()
        .describe('ISO date string for when this snag should be resolved'),
      customer_id: z.string().optional().describe('Client UUID to associate the snag with'),
    },
    callTool('create_snag', user)
  );

  server.tool(
    'read_snags',
    'Read snagging items for a project, or all snags for the user. Optionally filter by status and include linked photos. Returns items with summary counts (total, open, resolved, critical).',
    {
      project_id: z
        .string()
        .optional()
        .describe('Filter snags to a specific project. If omitted, returns all user snags.'),
      status: z
        .enum(['open', 'done'])
        .optional()
        .describe('Filter by status — open (not done) or done'),
      include_photos: z
        .boolean()
        .optional()
        .describe('Include linked photo_analyses for each snag (default false)'),
    },
    callTool('read_snags', user)
  );

  server.tool(
    'resolve_snag',
    'Mark a snagging item as done. Optionally attach a completion photo and add resolution notes. Validates the task has a snagging tag before resolving.',
    {
      snag_id: z.string().describe('spark_tasks UUID of the snag to resolve'),
      resolution_notes: z
        .string()
        .optional()
        .describe('Notes on how the issue was resolved — appended to the task details'),
      image_url: z
        .string()
        .optional()
        .describe('URL of a completion photo showing the resolved issue'),
    },
    callTool('resolve_snag', user)
  );

  server.tool(
    'generate_snagging_list',
    'Check a certificate for completeness and/or list existing project snags. If certificate_id is provided, validates all required sections for EICR, EIC, or Minor Works and optionally creates tasks. If project_id is provided, returns existing snagging tasks on that project. Both can be combined for a unified view.',
    {
      certificate_id: z
        .string()
        .optional()
        .describe('Report UUID from the reports table. Required if no project_id is given.'),
      project_id: z
        .string()
        .optional()
        .describe(
          'spark_projects UUID. If given alone, returns existing snags without cert validation. If given with certificate_id, merges cert gaps with project snags.'
        ),
      create_tasks: z
        .boolean()
        .optional()
        .describe(
          'Create a snagging project with tasks for each missing item (default true). Only applies when certificate_id is provided.'
        ),
    },
    callTool('generate_snagging_list', user)
  );
}

// ─── Photo Estimate Tools (1) ───────────────────────────────────────────

function registerPhotoEstimateTools(server: McpServer, user: UserContext): void {
  server.tool(
    'estimate_from_photo',
    'Generate a cost estimate from a photo. Analyses the photo using AI vision, extracts material keywords, looks up pricing from RAG, and optionally creates a quote. Use when an electrician sends a photo asking "how much would this cost?" or "price this up".',
    {
      image_url: z
        .string()
        .describe('URL of the image to estimate from (WhatsApp or Supabase storage)'),
      context: z
        .string()
        .optional()
        .describe('Additional context (e.g. "consumer unit change", "full rewire")'),
      job_description: z
        .string()
        .optional()
        .describe('Detailed job description to improve material extraction'),
      client_data: z
        .object({
          name: z.string().describe('Client name'),
          email: z.string().optional().describe('Client email'),
          phone: z.string().optional().describe('Client phone'),
          address: z.string().optional().describe('Client/job address'),
        })
        .optional()
        .describe('Client details — if provided, a quote is automatically created'),
    },
    callTool('estimate_from_photo', user)
  );
}

// ─── Google API Tools (6) ────────────────────────────────────────────────

function registerGoogleApiTools(server: McpServer, user: UserContext): void {
  server.tool(
    'analyse_solar_roof',
    'Analyse a roof for solar panel potential using Google Solar API. Geocodes the address, returns max panel count, array area, yearly energy estimate, roof segment details, and carbon offset. Useful when a customer asks about solar installations or EV charger pairing.',
    {
      address: z
        .string()
        .describe('Property address to analyse (e.g. "42 High Street, Birmingham B1 1AA")'),
      panel_capacity_watts: z
        .number()
        .optional()
        .describe('Panel wattage to use for calculations (default 400W)'),
    },
    callTool('analyse_solar_roof', user)
  );

  server.tool(
    'geocode_address',
    'Convert an address to lat/lng (forward geocode) or lat/lng to an address (reverse geocode). Returns formatted address, postcode, locality, country, and place_id. Use this when you need coordinates for another tool or to verify an address.',
    {
      address: z
        .string()
        .optional()
        .describe('Address to geocode (forward). Omit if using lat+lng for reverse.'),
      lat: z.number().optional().describe('Latitude for reverse geocoding'),
      lng: z.number().optional().describe('Longitude for reverse geocoding'),
    },
    callTool('geocode_address', user)
  );

  server.tool(
    'validate_address',
    'Validate and standardise a UK address using Google Address Validation API. Returns the corrected/standardised address, postcode, coordinates, and whether the address is valid. Use when creating client records or before sending post.',
    {
      address: z.string().describe('Address to validate (e.g. "42 high st birmingham")'),
    },
    callTool('validate_address', user)
  );

  server.tool(
    'generate_map_image',
    'Generate a static map image with labelled markers for one or more addresses. Returns a direct image URL that can be sent via MEDIA:<url>. Useful for showing job locations, route overviews, or multi-site plans.',
    {
      locations: z
        .array(
          z.object({
            label: z
              .string()
              .optional()
              .describe(
                'Single-character label for the marker (A, B, C...). Auto-assigned if omitted.'
              ),
            address: z.string().describe('Address to plot on the map'),
          })
        )
        .describe('Array of locations to plot on the map'),
      size: z.string().optional().describe('Map image size as "WIDTHxHEIGHT" (default "600x400")'),
      zoom: z
        .number()
        .optional()
        .describe('Zoom level (auto-fit if omitted). 1=world, 10=city, 15=street, 20=building.'),
    },
    callTool('generate_map_image', user)
  );

  server.tool(
    'search_youtube_videos',
    'Search YouTube for trade-relevant videos. Auto-prepends "electrical" to queries that don\'t mention it. Returns video titles, descriptions, thumbnails, and watch URLs. Great for finding how-to guides, training content, or product reviews.',
    {
      query: z.string().describe('Search query (e.g. "consumer unit wiring", "RCBO testing")'),
      max_results: z
        .number()
        .optional()
        .describe('Number of results to return (default 5, max 10)'),
    },
    callTool('search_youtube_videos', user)
  );

  server.tool(
    'get_weather',
    'Get current weather and 3-day forecast for a location using Google Weather API. Returns temperature, conditions, wind speed, precipitation, humidity, UV index, and rain chance. Useful for planning outdoor work, site visits, or advising on weather-sensitive installations.',
    {
      address: z.string().optional().describe('Address to get weather for. Omit if using lat+lng.'),
      lat: z.number().optional().describe('Latitude'),
      lng: z.number().optional().describe('Longitude'),
    },
    callTool('get_weather', user)
  );
}

// ─── Automation Tools ──────────────────────────────────────────────────

function registerAutomationTools(server: McpServer, user: UserContext): void {
  server.tool(
    'send_payment_reminder',
    'Draft a friendly pre-due payment reminder for an invoice (before it becomes overdue). Different tone from invoice chasing — this is a courtesy heads-up 3 days before due date. Returns a draft message for approval.',
    {
      invoice_id: z.string().describe('Invoice ID to send reminder for'),
    },
    callTool('send_payment_reminder', user)
  );

  server.tool(
    'get_job_weather',
    'Get weather forecast for a job location. Returns temperature, rain chance, wind, sunrise/sunset. Use in morning briefs and pre-job reminders so the spark knows what to expect on site.',
    {
      postcode: z.string().describe('UK postcode for weather lookup (e.g. "B1 1AA")'),
      date: z.string().optional().describe('Date for forecast (ISO format). Defaults to today.'),
    },
    callTool('get_job_weather', user)
  );

  server.tool(
    'suggest_upsell',
    "Analyse a client's certificate and invoice history to suggest upsell opportunities. Detects: annual contract candidates (3+ certs), cross-sell (EICR without PAT), EV charger opportunities, referral requests. Returns prioritised suggestions with estimated values.",
    {
      client_id: z.string().describe('Customer ID to analyse'),
    },
    callTool('suggest_upsell', user)
  );

  server.tool(
    'transcribe_voice_note',
    'Transcribe a WhatsApp voice note to text using OpenAI Whisper. Use when the user sends an audio message — transcribe it, then respond to the content as if they typed it. Accepts local file paths (from OpenClaw inbound media), URLs, or base64.',
    {
      audio_url: z
        .string()
        .optional()
        .describe('URL to the audio file (also accepts local file paths starting with /)'),
      audio_path: z
        .string()
        .optional()
        .describe(
          'Local file path to the audio file (e.g. /home/openclaw/.openclaw/media/inbound/xxx.ogg)'
        ),
      audio_base64: z.string().optional().describe('Base64-encoded audio data'),
    },
    callTool('transcribe_voice_note', user)
  );

  server.tool(
    'delete_client',
    'Delete a customer from the database. Requires the client name typed exactly to confirm (safety gate). If the client has quotes or invoices, warns before proceeding. TIER 4 — requires explicit confirmation.',
    {
      client_id: z.string().describe('Customer ID to delete'),
      confirm_name: z.string().describe('Type the exact client name to confirm deletion'),
    },
    callTool('delete_client', user)
  );
}

// ─── Integration Tools (ElevenLabs, Perplexity, PDF) ─────────────────────

function registerIntegrationTools(server: McpServer, user: UserContext): void {
  server.tool(
    'speak_response',
    'Convert text to a voice note using ElevenLabs TTS (British male voice — Daniel). Returns an audio URL that can be sent as a voice note via MEDIA:<url>. Use for morning briefs, important alerts, or when the user explicitly asks for a voice reply. Max 2500 characters.',
    {
      text: z.string().describe('Text to convert to speech (max 2500 characters)'),
      voice_id: z
        .string()
        .optional()
        .describe(
          'ElevenLabs voice ID. Defaults to Daniel (British male). Leave blank for default.'
        ),
    },
    callTool('speak_response', user)
  );

  server.tool(
    'web_search',
    'Search the live web via Perplexity Sonar AI. Returns a grounded answer with citations from real web pages — not AI knowledge. Use for: current material prices, regulation updates, product specs, news, anything that may have changed recently. Much more accurate than relying on training data.',
    {
      query: z
        .string()
        .describe(
          'Search query (e.g. "current price of 6mm T&E cable UK", "BS 7671 2024 amendment changes")'
        ),
      focus: z
        .enum(['web', 'news'])
        .optional()
        .describe('"web" for general search (default), "news" to filter to recent news only'),
    },
    callTool('web_search', user)
  );

  server.tool(
    'read_pdf',
    'Extract text from a PDF document — either from a URL or base64 data. Use when a client sends a spec sheet, planning document, compliance report, or any PDF file. Returns the extracted text, page count, and file size. For scanned (image-based) PDFs, use analyse_photo instead.',
    {
      pdf_url: z.string().optional().describe('URL to the PDF file to read'),
      pdf_base64: z
        .string()
        .optional()
        .describe('Base64-encoded PDF data (with or without data: prefix)'),
    },
    callTool('read_pdf', user)
  );
}

// ─── Smart Feature Tools (completion, pricing, templates) ────────────────

function registerSmartFeatureTools(server: McpServer, user: UserContext): void {
  server.tool(
    'get_completion_checklist',
    'Get a completion checklist for a finished job or project. Shows what is done and what is missing: invoice raised? Certificates created? Open snags? Returns suggested next actions. Use when a job is marked as completed to prompt the user through the close-out process.',
    {
      job_id: z.string().optional().describe('Job UUID (employer_jobs table)'),
      project_id: z.string().optional().describe('Project UUID (spark_projects table)'),
    },
    callTool('get_completion_checklist', user)
  );

  server.tool(
    'get_pricing_suggestions',
    "Get pricing suggestions for a job type based on the electrician's own history and industry benchmarks. Returns their average, min, max, median prices for similar work, plus RAG pricing data. Use when creating a quote to suggest a competitive price.",
    {
      job_type: z
        .string()
        .describe(
          'Job type description (e.g. "consumer unit change", "full rewire", "EICR", "EV charger install")'
        ),
    },
    callTool('get_pricing_suggestions', user)
  );

  server.tool(
    'create_project_from_template',
    'Create a project with pre-built tasks from a template. Templates: rewire (11 tasks), eicr (8 tasks), consumer_unit (9 tasks), solar (12 tasks), ev_charger (10 tasks). Each includes task descriptions, estimated hours, and suggested certificates. Use when a user starts a common job type.',
    {
      template: z
        .string()
        .describe('Template name: rewire, eicr, consumer_unit, solar, ev_charger'),
      client_id: z.string().optional().describe('Customer UUID to link to the project'),
      location: z.string().optional().describe('Job location/address'),
      start_date: z.string().optional().describe('Planned start date (ISO-8601)'),
    },
    callTool('create_project_from_template', user)
  );
}
