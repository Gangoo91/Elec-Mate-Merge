#!/usr/bin/env node
/**
 * Assign essential tools to ElevenLabs agents (under 200 limit)
 * Prioritizes quote/invoice, navigation, and core query tools
 */

const API_KEY = 'sk_a88cf76a8e4f26859699dd0a6c50539ce7e0a31d0a1fe9e5';
const ELECTRICIAN_AGENT_ID = 'agent_9901ke9rd48cf6jva60jd90sgx1y';
const EMPLOYER_AGENT_ID = 'agent_7301kdxbnshce7vv8mtah970y3g1';
const API_BASE = 'https://api.elevenlabs.io/v1';

// Essential tools for electricians (prioritized)
const ESSENTIAL_TOOL_NAMES = [
  // Navigation (8)
  'navigate_to', 'go_back', 'go_home', 'open_dialog', 'close_dialog',
  'refresh_data', 'toggle_view', 'filter_by',

  // Form filling (5)
  'fill_field', 'add_labour_item', 'add_material_item', 'add_line_item', 'get_form_status',

  // Dashboard & Summary (6)
  'get_dashboard_summary', 'get_pending_approvals', 'get_urgent_items',
  'get_weekly_summary', 'get_monthly_summary', 'search_for',

  // Quote & Invoice - CRITICAL (12)
  'create_and_send_quote', 'create_quote', 'get_quote_info', 'search_quotes',
  'get_quotes_pending', 'get_quotes_expiring', 'get_quote_conversion_rate',
  'send_quote', 'update_quote_status', 'approve_quote',
  'create_invoice', 'get_invoice_info', 'get_overdue_invoices',
  'get_invoices_due_today', 'send_invoice', 'mark_invoice_paid',

  // Pricing (4)
  'lookup_price', 'get_price_book_item', 'search_price_book_category', 'get_labour_rates',

  // Jobs (20)
  'get_job_info', 'get_active_jobs', 'get_job_progress', 'get_job_workers',
  'get_job_financials', 'get_jobs_by_status', 'get_upcoming_deadlines',
  'get_overdue_jobs', 'get_jobs_starting_soon', 'search_jobs',
  'create_job', 'update_job_status', 'update_job_progress',
  'assign_worker_to_job', 'remove_worker_from_job', 'archive_job',
  'get_job_photos', 'get_job_documents', 'get_job_timeline', 'get_job_checklist',

  // Certificates (8)
  'get_cert_info', 'get_recent_certificates', 'get_test_certificates',
  'email_certificate', 'generate_test_certificate',
  'add_circuit', 'set_circuit_field', 'get_circuits_status',

  // Employees (15)
  'get_employee_info', 'get_active_employees', 'get_available_workers',
  'get_employee_hours', 'get_employee_jobs', 'search_employees',
  'get_pending_timesheets', 'approve_timesheet', 'reject_timesheet',
  'create_time_entry', 'get_expiring_certifications',
  'email_worker', 'send_worker_message', 'send_team_message',
  'create_employee',

  // Expenses (5)
  'get_pending_expenses', 'approve_expense', 'reject_expense',
  'create_expense', 'get_expense_total',

  // Safety (10)
  'get_open_incidents', 'get_incident_info', 'create_incident', 'close_incident',
  'get_rams_status', 'get_pending_rams', 'create_rams', 'approve_rams',
  'generate_rams_ai', 'send_rams',

  // Client (6)
  'get_client_portal_status', 'send_client_portal_invite',
  'send_job_update_to_client', 'share_photos_with_client',
  'request_client_signoff', 'get_pending_signoffs',

  // Snags & Quality (6)
  'get_open_snags', 'get_snags_by_job', 'log_snag', 'resolve_snag',
  'get_urgent_snags', 'assign_snag',

  // Progress (4)
  'get_progress_logs', 'log_progress', 'flag_delay', 'summarise_progress',

  // Financials (5)
  'get_revenue_summary', 'get_outstanding_amount', 'get_client_balance',
  'get_profit_by_job', 'get_cash_flow_forecast',

  // Reports (5)
  'generate_job_report', 'generate_financial_report', 'generate_safety_report',
  'export_data', 'expand_description',

  // AI Quote Helpers (3)
  'get_quote_suggestions', 'generate_quote_from_description', 'generate_tender_estimate'
];

async function getExistingTools() {
  const response = await fetch(`${API_BASE}/convai/tools`, {
    headers: { 'xi-api-key': API_KEY }
  });
  const data = await response.json();
  return new Map(data.tools.map(t => [t.tool_config.name, t.id]));
}

async function updateAgentTools(agentId, toolIds, agentName) {
  console.log(`Updating ${agentName} agent with ${toolIds.length} tools...`);

  const response = await fetch(`${API_BASE}/convai/agents/${agentId}`, {
    method: 'PATCH',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      conversation_config: {
        agent: {
          prompt: {
            tool_ids: toolIds
          }
        }
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update ${agentName}: ${error}`);
  }

  console.log(`✓ ${agentName} agent updated successfully`);
  return await response.json();
}

async function main() {
  console.log('=== Assign Essential Tools to ElevenLabs Agents ===\n');

  // Get all existing tools
  console.log('Fetching existing tools...');
  const toolsMap = await getExistingTools();
  console.log(`Found ${toolsMap.size} tools in ElevenLabs\n`);

  // Get IDs for essential tools
  const essentialToolIds = [];
  const missingTools = [];

  for (const name of ESSENTIAL_TOOL_NAMES) {
    const id = toolsMap.get(name);
    if (id) {
      essentialToolIds.push(id);
    } else {
      missingTools.push(name);
    }
  }

  console.log(`Essential tools found: ${essentialToolIds.length}/${ESSENTIAL_TOOL_NAMES.length}`);

  if (missingTools.length > 0) {
    console.log(`Missing tools (will be skipped):`);
    missingTools.forEach(t => console.log(`  - ${t}`));
  }

  console.log(`\nTool count: ${essentialToolIds.length} (limit: 200)\n`);

  if (essentialToolIds.length > 200) {
    console.error('ERROR: Still too many tools. Please reduce the ESSENTIAL_TOOL_NAMES list.');
    process.exit(1);
  }

  // Update both agents
  try {
    await updateAgentTools(ELECTRICIAN_AGENT_ID, essentialToolIds, 'Electrician');
  } catch (error) {
    console.error(`✗ Electrician: ${error.message}`);
  }

  try {
    await updateAgentTools(EMPLOYER_AGENT_ID, essentialToolIds, 'Employer');
  } catch (error) {
    console.error(`✗ Employer: ${error.message}`);
  }

  console.log('\n=== Done ===');
}

main().catch(console.error);
