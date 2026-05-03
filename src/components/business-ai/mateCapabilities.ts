/**
 * Single source of truth for what Mate can actually do — surfaced on both the
 * sales page (BusinessAISalesView) and the dashboard (BusinessAIDashboardView).
 *
 * Every prompt below is grounded in a real, registered MCP tool. Cert tools
 * and outbound-messaging tools are deliberately excluded (Mate is not yet
 * authorised to send things to clients on the user's behalf).
 *
 * If you add a new tool to `services/elec-ai-mcp/src/tools/registry.ts`, add a
 * row to `toolMetaMap` so the activity feed can render it nicely and link back
 * into the relevant section of the Elec-Mate app.
 */

// ─── Capability groups (used on Sales + Dashboard "What to ask Mate") ──────
export interface CapabilityPrompt {
  text: string;
  /** Show a small yellow flag next to this prompt — for headline features. */
  featured?: boolean;
}

export interface CapabilityGroup {
  id: string;
  title: string;
  /** One-line strapline for the sales page. */
  strapline: string;
  prompts: CapabilityPrompt[];
}

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: 'plan-day',
    title: 'Plan the day',
    strapline: 'Calendar, traffic, weather and ETAs — Mate plans the run before you turn the key.',
    prompts: [
      { text: 'Plan my day' },
      { text: "What's on tomorrow?" },
      { text: 'When am I free Thursday afternoon?' },
      { text: "Best route between today's jobs" },
      { text: 'Weather for the Walsh job' },
      { text: 'End-of-day summary' },
      { text: 'Predict my workload next month' },
    ],
  },
  {
    id: 'money',
    title: 'Money in, money out',
    strapline: 'See what you are owed, what is coming, and where the slippage is — in seconds.',
    prompts: [
      { text: "Who hasn't paid?" },
      { text: 'Revenue this month' },
      { text: 'Top 5 clients this year' },
      { text: 'Cash flow forecast next 90 days' },
      { text: 'Profit on the Walsh job' },
      { text: 'Tax estimate this quarter' },
      { text: 'Spot any missed revenue' },
      { text: 'At-risk alerts' },
    ],
  },
  {
    id: 'quotes',
    title: 'Quotes & pricing',
    strapline: 'Photo of a CU becomes a quote. Materials, labour, the lot — drafted in your tone.',
    prompts: [
      { text: 'Photo of this CU — quote it', featured: true },
      { text: 'Draft a quote for a full rewire in Chorlton' },
      { text: 'Status of the Henderson quote' },
      { text: 'Suggested price for a 9.5kW shower install' },
      { text: 'Compare prices on Hager 12-way CUs' },
      { text: 'Live deals from wholesalers' },
      { text: 'Materials list for a kitchen rewire' },
    ],
  },
  {
    id: 'rams-safety',
    title: 'RAMS, safety & site',
    strapline:
      'Full RAMS in three minutes. Method statements, safe isolation, snag lists, site diary.',
    prompts: [
      { text: 'Create RAMS for a tenanted EICR', featured: true },
      { text: 'Method statement for a CU change' },
      { text: 'Safety templates for working at height' },
      { text: 'Log safe isolation on the Chen job' },
      { text: 'Site diary entry for today' },
      { text: 'Snag list for the Walsh project' },
      { text: 'Add a snag — broken socket lounge' },
    ],
  },
  {
    id: 'regs-onsite',
    title: 'Regs & on-site lookups',
    strapline: 'BS 7671 A4:2026 end-to-end, plus design guidance, labour timing and live pricing.',
    prompts: [
      { text: 'Max Zs for a B32 on TN-C-S?' },
      { text: 'Cable size for a 9.5kW shower?' },
      { text: "What's Reg 411.4.4?" },
      { text: 'How long should an EICR take?' },
      { text: 'Health & safety for live working' },
      { text: 'Solar potential for SK14 5BX' },
      { text: 'Generate a map for tomorrow\u2019s jobs' },
    ],
  },
  {
    id: 'tasks-admin',
    title: 'Tasks, expenses, admin',
    strapline: 'Voice-note a task. Photo a receipt. Mate logs it, categorises, syncs to Xero.',
    prompts: [
      { text: 'Add task: order MCBs for Friday' },
      { text: "What's overdue?" },
      { text: 'Mark the Chen job done' },
      { text: 'Photo of receipt — log it' },
      { text: 'Mileage 47 miles to Manchester' },
      { text: 'Sync expenses to Xero' },
      { text: 'Total expenses last month' },
    ],
  },
  {
    id: 'grow',
    title: 'Grow the business',
    strapline:
      'Health score, weekly summary, win-backs, marketing copy — the side of the business no-one teaches.',
    prompts: [
      { text: 'Business health score' },
      { text: 'Weekly summary' },
      { text: 'Win back inactive clients' },
      { text: 'Marketing plan for spring' },
      { text: 'Social media post about an EV install' },
      { text: 'Google review request for Mrs Walsh' },
      { text: 'Repeat customer milestones' },
    ],
  },
];

// ─── Activity-feed tool metadata ────────────────────────────────────────────
export interface ToolMeta {
  /** Short caps tag rendered in the activity row. */
  tag: string;
  /** Human description that replaces the raw snake_case tool name. */
  label: string;
  /** App route to link to when an electrician taps the row, or null if there is no in-app target (e.g. regs lookups). */
  route: string | null;
  /** Estimated minutes saved per call vs. doing it the old way — used for the "time saved this week" strip. */
  minutesSaved: number;
}

const fallbackMeta: ToolMeta = {
  tag: 'Action',
  label: 'Action',
  route: null,
  minutesSaved: 2,
};

/**
 * Strip "(failed)" suffix that the audit logger appends on tool errors.
 */
export function extractToolName(description: string | null | undefined): string {
  if (!description) return '';
  return description.replace(/\s*\(failed\)\s*$/i, '').trim();
}

/**
 * Look up rendering metadata for a tool. Falls back to a title-cased version
 * of the tool name if it is not in the map yet (so newly added tools never
 * crash the dashboard, they just look slightly less polished).
 */
export function getToolMeta(toolName: string): ToolMeta {
  if (!toolName) return fallbackMeta;
  const meta = toolMetaMap[toolName];
  if (meta) return meta;
  const humanised = toolName.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return { ...fallbackMeta, label: humanised };
}

/**
 * Sum minutes saved across an array of agent actions, using the tool name in
 * each action's `description` field. Unknown tools fall back to the
 * fallbackMeta minutes (2 min per call).
 */
export function estimateMinutesSaved(
  actions: Array<{ description: string | null; outcome: string | null }>
): number {
  let total = 0;
  for (const a of actions) {
    if (a.outcome && a.outcome !== 'success') continue;
    const tool = extractToolName(a.description);
    const meta = getToolMeta(tool);
    total += meta.minutesSaved;
  }
  return total;
}

/**
 * Format minutes as "Xh Ym" (or "Xm" when under an hour, "Xh" when whole hours).
 */
export function formatMinutes(total: number): string {
  if (total <= 0) return '0m';
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

// ─── The map ────────────────────────────────────────────────────────────────
// Routes verified against `src/config/searchablePages.ts`. Tools without an
// in-app target (regs lookups, weather, voice transcription, etc.) get
// `route: null` and render as non-clickable rows.
export const toolMetaMap: Record<string, ToolMeta> = {
  // Quotes
  create_quote: {
    tag: 'Quote',
    label: 'Drafted a quote',
    route: '/electrician/quotes',
    minutesSaved: 15,
  },
  read_quotes: {
    tag: 'Quote',
    label: 'Looked up quotes',
    route: '/electrician/quotes',
    minutesSaved: 2,
  },
  update_quote: {
    tag: 'Quote',
    label: 'Updated a quote',
    route: '/electrician/quotes',
    minutesSaved: 5,
  },
  create_quote_pdf: {
    tag: 'Quote',
    label: 'Generated a quote PDF',
    route: '/electrician/quotes',
    minutesSaved: 5,
  },
  set_quote_auto_followup: {
    tag: 'Quote',
    label: 'Scheduled a follow-up',
    route: '/electrician/quotes',
    minutesSaved: 3,
  },
  track_quote_email: {
    tag: 'Quote',
    label: 'Tracked quote opens',
    route: '/electrician/quotes',
    minutesSaved: 2,
  },
  add_receipt_to_quote: {
    tag: 'Quote',
    label: 'Attached a receipt',
    route: '/electrician/quotes',
    minutesSaved: 3,
  },
  estimate_from_photo: {
    tag: 'Photo→Quote',
    label: 'Quoted from a photo',
    route: '/electrician/quotes',
    minutesSaved: 20,
  },
  get_quote_analytics: {
    tag: 'Quote',
    label: 'Quote analytics',
    route: '/electrician/quotes',
    minutesSaved: 5,
  },

  // Invoices / money
  create_invoice: {
    tag: 'Invoice',
    label: 'Drafted an invoice',
    route: '/electrician/invoices',
    minutesSaved: 10,
  },
  read_invoices: {
    tag: 'Invoice',
    label: 'Checked invoices',
    route: '/electrician/invoices',
    minutesSaved: 2,
  },
  update_invoice: {
    tag: 'Invoice',
    label: 'Updated an invoice',
    route: '/electrician/invoices',
    minutesSaved: 5,
  },
  generate_invoice_pdf: {
    tag: 'Invoice',
    label: 'Generated an invoice PDF',
    route: '/electrician/invoices',
    minutesSaved: 4,
  },
  add_receipt_to_invoice: {
    tag: 'Invoice',
    label: 'Attached a receipt',
    route: '/electrician/invoices',
    minutesSaved: 3,
  },
  get_outstanding_payments: {
    tag: 'Money',
    label: 'Checked outstanding payments',
    route: '/electrician/invoices',
    minutesSaved: 5,
  },
  get_overdue_invoices: {
    tag: 'Money',
    label: 'Found overdue invoices',
    route: '/electrician/invoices',
    minutesSaved: 5,
  },

  // Tasks
  create_task: { tag: 'Task', label: 'Added a task', route: '/electrician/tasks', minutesSaved: 1 },
  read_tasks: { tag: 'Task', label: 'Checked tasks', route: '/electrician/tasks', minutesSaved: 1 },
  update_task: {
    tag: 'Task',
    label: 'Updated a task',
    route: '/electrician/tasks',
    minutesSaved: 1,
  },
  complete_task: {
    tag: 'Task',
    label: 'Completed a task',
    route: '/electrician/tasks',
    minutesSaved: 1,
  },
  snooze_task: {
    tag: 'Task',
    label: 'Snoozed a task',
    route: '/electrician/tasks',
    minutesSaved: 1,
  },
  delete_task: {
    tag: 'Task',
    label: 'Deleted a task',
    route: '/electrician/tasks',
    minutesSaved: 1,
  },

  // Calendar
  read_calendar: {
    tag: 'Calendar',
    label: 'Checked the calendar',
    route: '/electrician/business/calendar',
    minutesSaved: 2,
  },
  create_calendar_event: {
    tag: 'Calendar',
    label: 'Created a booking',
    route: '/electrician/business/calendar',
    minutesSaved: 4,
  },
  update_calendar_event: {
    tag: 'Calendar',
    label: 'Updated a booking',
    route: '/electrician/business/calendar',
    minutesSaved: 3,
  },
  delete_calendar_event: {
    tag: 'Calendar',
    label: 'Cancelled a booking',
    route: '/electrician/business/calendar',
    minutesSaved: 2,
  },
  get_availability: {
    tag: 'Calendar',
    label: 'Checked availability',
    route: '/electrician/business/calendar',
    minutesSaved: 3,
  },

  // Day planner / routing
  plan_my_day: {
    tag: 'Day plan',
    label: 'Planned the day',
    route: '/electrician/install-planner',
    minutesSaved: 30,
  },
  get_route_to_job: {
    tag: 'Routing',
    label: 'Routed to a job',
    route: '/electrician/business/calendar',
    minutesSaved: 5,
  },
  schedule_jobs: {
    tag: 'Day plan',
    label: 'Scheduled jobs',
    route: '/electrician/business/calendar',
    minutesSaved: 15,
  },
  get_end_of_day_summary: {
    tag: 'Day plan',
    label: 'End-of-day summary',
    route: '/electrician/business',
    minutesSaved: 10,
  },
  get_predicted_workload: {
    tag: 'Day plan',
    label: 'Workload forecast',
    route: '/electrician/business',
    minutesSaved: 5,
  },

  // RAG / lookups (no app target)
  lookup_regulation: {
    tag: 'Regs',
    label: 'Looked up a BS 7671 regulation',
    route: null,
    minutesSaved: 5,
  },
  lookup_design_guidance: {
    tag: 'Design',
    label: 'Looked up design guidance',
    route: null,
    minutesSaved: 8,
  },
  lookup_practical_method: {
    tag: 'Practical',
    label: 'Looked up practical method',
    route: null,
    minutesSaved: 5,
  },
  lookup_pricing_guidance: {
    tag: 'Pricing',
    label: 'Looked up pricing guidance',
    route: '/electrician/live-pricing',
    minutesSaved: 10,
  },
  lookup_health_safety: {
    tag: 'H&S',
    label: 'Looked up health & safety',
    route: null,
    minutesSaved: 5,
  },
  lookup_training_content: {
    tag: 'Training',
    label: 'Looked up training content',
    route: null,
    minutesSaved: 3,
  },

  // Expenses
  create_expense: {
    tag: 'Expense',
    label: 'Logged an expense',
    route: '/electrician/expenses',
    minutesSaved: 4,
  },
  read_expenses: {
    tag: 'Expense',
    label: 'Checked expenses',
    route: '/electrician/expenses',
    minutesSaved: 2,
  },
  log_mileage: {
    tag: 'Expense',
    label: 'Logged mileage',
    route: '/electrician/expenses',
    minutesSaved: 2,
  },
  sync_expense_to_accounting: {
    tag: 'Expense',
    label: 'Synced expenses to accounts',
    route: '/electrician/expenses',
    minutesSaved: 5,
  },
  add_receipt_to_expense: {
    tag: 'Expense',
    label: 'Attached a receipt',
    route: '/electrician/expenses',
    minutesSaved: 3,
  },

  // RAMS & method statements
  create_rams: {
    tag: 'RAMS',
    label: 'Created a RAMS',
    route: '/electrician/health-safety',
    minutesSaved: 60,
  },
  read_rams: {
    tag: 'RAMS',
    label: 'Read a RAMS',
    route: '/electrician/health-safety',
    minutesSaved: 2,
  },
  generate_rams_pdf: {
    tag: 'RAMS',
    label: 'Generated a RAMS PDF',
    route: '/electrician/health-safety',
    minutesSaved: 5,
  },
  generate_method_statement: {
    tag: 'Method',
    label: 'Generated a method statement',
    route: '/electrician/health-safety',
    minutesSaved: 30,
  },
  submit_part_p_notification: {
    tag: 'Compliance',
    label: 'Submitted Part P notification',
    route: '/electrician/health-safety',
    minutesSaved: 15,
  },

  // Photos / vision
  analyse_photo: {
    tag: 'Photo',
    label: 'Analysed a photo',
    route: '/electrician/photo-docs',
    minutesSaved: 5,
  },
  attach_photo_to_entity: {
    tag: 'Photo',
    label: 'Attached a photo',
    route: '/electrician/photo-docs',
    minutesSaved: 1,
  },
  get_entity_photos: {
    tag: 'Photo',
    label: 'Looked up photos',
    route: '/electrician/photo-docs',
    minutesSaved: 2,
  },
  analyse_spec_sheet: {
    tag: 'Photo',
    label: 'Analysed a spec sheet',
    route: null,
    minutesSaved: 10,
  },

  // Projects / clients
  create_project: {
    tag: 'Project',
    label: 'Started a project',
    route: '/electrician/projects',
    minutesSaved: 10,
  },
  read_projects: {
    tag: 'Project',
    label: 'Checked projects',
    route: '/electrician/projects',
    minutesSaved: 2,
  },
  update_project: {
    tag: 'Project',
    label: 'Updated a project',
    route: '/electrician/projects',
    minutesSaved: 3,
  },
  complete_project: {
    tag: 'Project',
    label: 'Completed a project',
    route: '/electrician/projects',
    minutesSaved: 3,
  },
  link_to_project: {
    tag: 'Project',
    label: 'Linked to a project',
    route: '/electrician/projects',
    minutesSaved: 1,
  },
  unlink_from_project: {
    tag: 'Project',
    label: 'Unlinked from a project',
    route: '/electrician/projects',
    minutesSaved: 1,
  },
  get_project_summary: {
    tag: 'Project',
    label: 'Project summary',
    route: '/electrician/projects',
    minutesSaved: 3,
  },
  read_clients: { tag: 'Client', label: 'Looked up clients', route: '/customers', minutesSaved: 2 },
  create_client: { tag: 'Client', label: 'Added a client', route: '/customers', minutesSaved: 4 },
  update_client: { tag: 'Client', label: 'Updated a client', route: '/customers', minutesSaved: 2 },
  delete_client: { tag: 'Client', label: 'Removed a client', route: '/customers', minutesSaved: 2 },
  generate_client_portal_link: {
    tag: 'Client',
    label: 'Made a portal link',
    route: '/customers',
    minutesSaved: 2,
  },

  // Marketplace / pricing
  search_products: {
    tag: 'Pricing',
    label: 'Searched products',
    route: '/electrician/live-pricing',
    minutesSaved: 8,
  },
  compare_prices: {
    tag: 'Pricing',
    label: 'Compared prices',
    route: '/electrician/live-pricing',
    minutesSaved: 10,
  },
  get_deals: {
    tag: 'Pricing',
    label: 'Found deals',
    route: '/electrician/live-pricing',
    minutesSaved: 5,
  },
  price_materials_for_job: {
    tag: 'Pricing',
    label: 'Priced materials',
    route: '/electrician/live-pricing',
    minutesSaved: 15,
  },
  get_pricing_suggestions: {
    tag: 'Pricing',
    label: 'Pricing suggestions',
    route: '/electrician/live-pricing',
    minutesSaved: 8,
  },
  get_my_pricing: {
    tag: 'Pricing',
    label: 'Checked own pricing',
    route: '/electrician/live-pricing',
    minutesSaved: 3,
  },
  get_pricing_analysis: {
    tag: 'Pricing',
    label: 'Pricing analysis',
    route: '/electrician/live-pricing',
    minutesSaved: 8,
  },
  get_competitor_pricing: {
    tag: 'Pricing',
    label: 'Competitor pricing',
    route: '/electrician/live-pricing',
    minutesSaved: 15,
  },

  // Snagging
  create_snag: {
    tag: 'Snag',
    label: 'Logged a snag',
    route: '/electrician/site-visits',
    minutesSaved: 3,
  },
  read_snags: {
    tag: 'Snag',
    label: 'Checked snags',
    route: '/electrician/site-visits',
    minutesSaved: 2,
  },
  resolve_snag: {
    tag: 'Snag',
    label: 'Resolved a snag',
    route: '/electrician/site-visits',
    minutesSaved: 2,
  },
  generate_snagging_list: {
    tag: 'Snag',
    label: 'Generated snag list',
    route: '/electrician/site-visits',
    minutesSaved: 8,
  },

  // Site / safety
  create_safe_isolation_record: {
    tag: 'Safety',
    label: 'Logged safe isolation',
    route: '/electrician/site-visits',
    minutesSaved: 5,
  },
  read_safe_isolation_records: {
    tag: 'Safety',
    label: 'Checked isolations',
    route: '/electrician/site-visits',
    minutesSaved: 2,
  },
  log_site_diary_entry: {
    tag: 'Diary',
    label: 'Site diary entry',
    route: '/electrician/site-visits',
    minutesSaved: 4,
  },
  read_site_diary: {
    tag: 'Diary',
    label: 'Read site diary',
    route: '/electrician/site-visits',
    minutesSaved: 2,
  },
  get_safety_templates: {
    tag: 'Safety',
    label: 'Got safety templates',
    route: '/electrician/health-safety',
    minutesSaved: 10,
  },

  // Analytics / business
  get_revenue_summary: {
    tag: 'Money',
    label: 'Checked revenue',
    route: '/electrician/business',
    minutesSaved: 5,
  },
  get_business_snapshot: {
    tag: 'Health',
    label: 'Business snapshot',
    route: '/electrician/business',
    minutesSaved: 3,
  },
  get_top_clients: {
    tag: 'Money',
    label: 'Top clients report',
    route: '/customers',
    minutesSaved: 5,
  },
  get_inactive_clients: {
    tag: 'Clients',
    label: 'Inactive clients report',
    route: '/customers',
    minutesSaved: 5,
  },
  get_revenue_forecast: {
    tag: 'Money',
    label: 'Revenue forecast',
    route: '/electrician/business',
    minutesSaved: 8,
  },
  get_seasonal_trends: {
    tag: 'Money',
    label: 'Seasonal trends',
    route: '/electrician/business',
    minutesSaved: 5,
  },
  get_client_lifetime_value: {
    tag: 'Clients',
    label: 'Client LTV',
    route: '/customers',
    minutesSaved: 5,
  },
  get_profitability_analysis: {
    tag: 'Money',
    label: 'Profitability analysis',
    route: '/electrician/business',
    minutesSaved: 8,
  },
  get_cash_flow_forecast: {
    tag: 'Money',
    label: 'Cash flow forecast',
    route: '/electrician/business',
    minutesSaved: 10,
  },
  get_at_risk_alerts: {
    tag: 'Money',
    label: 'At-risk alerts',
    route: '/electrician/business',
    minutesSaved: 5,
  },
  spot_missed_revenue: {
    tag: 'Money',
    label: 'Found missed revenue',
    route: '/electrician/business',
    minutesSaved: 10,
  },
  get_business_health_score: {
    tag: 'Health',
    label: 'Business health check',
    route: '/electrician/business',
    minutesSaved: 5,
  },
  get_weekly_summary: {
    tag: 'Health',
    label: 'Weekly summary',
    route: '/electrician/business',
    minutesSaved: 8,
  },
  get_tax_estimate: {
    tag: 'Money',
    label: 'Tax estimate',
    route: '/electrician/business',
    minutesSaved: 10,
  },
  calculate_job_profit: {
    tag: 'Money',
    label: 'Calculated job profit',
    route: '/electrician/business',
    minutesSaved: 8,
  },

  // Marketing / growth
  get_marketing_plan: {
    tag: 'Growth',
    label: 'Marketing plan',
    route: '/electrician/business',
    minutesSaved: 30,
  },
  get_social_media_post: {
    tag: 'Growth',
    label: 'Social media post',
    route: '/electrician/business',
    minutesSaved: 15,
  },
  get_google_review_request: {
    tag: 'Growth',
    label: 'Review request draft',
    route: '/customers',
    minutesSaved: 5,
  },
  get_client_milestones: {
    tag: 'Growth',
    label: 'Client milestones',
    route: '/customers',
    minutesSaved: 5,
  },
  get_client_win_back: {
    tag: 'Growth',
    label: 'Win-back ideas',
    route: '/customers',
    minutesSaved: 10,
  },
  get_client_insights: {
    tag: 'Growth',
    label: 'Client insights',
    route: '/customers',
    minutesSaved: 5,
  },
  get_seasonal_campaigns: {
    tag: 'Growth',
    label: 'Seasonal campaigns',
    route: '/electrician/business',
    minutesSaved: 10,
  },
  suggest_upsell: {
    tag: 'Growth',
    label: 'Suggested upsell',
    route: '/customers',
    minutesSaved: 5,
  },
  create_portfolio_page: {
    tag: 'Growth',
    label: 'Built portfolio page',
    route: '/electrician/business',
    minutesSaved: 20,
  },

  // Google APIs / weather / address
  analyse_solar_roof: {
    tag: 'Solar',
    label: 'Analysed a solar roof',
    route: null,
    minutesSaved: 20,
  },
  geocode_address: { tag: 'Address', label: 'Geocoded an address', route: null, minutesSaved: 1 },
  validate_address: { tag: 'Address', label: 'Validated an address', route: null, minutesSaved: 1 },
  generate_map_image: { tag: 'Map', label: 'Generated a map', route: null, minutesSaved: 2 },
  search_youtube_videos: { tag: 'Videos', label: 'Searched videos', route: null, minutesSaved: 3 },
  get_weather: { tag: 'Weather', label: 'Got weather', route: null, minutesSaved: 1 },
  get_job_weather: { tag: 'Weather', label: 'Job weather', route: null, minutesSaved: 1 },

  // Job intake
  create_job_intake: {
    tag: 'Job',
    label: 'Created a job intake',
    route: '/electrician/projects',
    minutesSaved: 15,
  },

  // Drafts (no send — review only)
  draft_message: { tag: 'Draft', label: 'Drafted a message', route: null, minutesSaved: 5 },
  draft_email_reply: {
    tag: 'Draft',
    label: 'Drafted an email reply',
    route: null,
    minutesSaved: 5,
  },

  // Voice / docs / search
  transcribe_voice_note: {
    tag: 'Voice',
    label: 'Transcribed a voice note',
    route: null,
    minutesSaved: 2,
  },
  speak_response: { tag: 'Voice', label: 'Spoke a response', route: null, minutesSaved: 0 },
  read_pdf: { tag: 'Doc', label: 'Read a PDF', route: null, minutesSaved: 3 },
  web_search: { tag: 'Search', label: 'Web search', route: null, minutesSaved: 3 },
  generate_briefing_pdf: {
    tag: 'Doc',
    label: 'Generated a briefing',
    route: null,
    minutesSaved: 10,
  },
  generate_shareable_link: {
    tag: 'Doc',
    label: 'Made a shareable link',
    route: null,
    minutesSaved: 1,
  },

  // Elec ID
  read_elec_id: { tag: 'Elec ID', label: 'Read Elec ID', route: '/elec-id', minutesSaved: 1 },
  share_elec_id: { tag: 'Elec ID', label: 'Shared Elec ID', route: '/elec-id', minutesSaved: 1 },

  // Smart features
  get_completion_checklist: {
    tag: 'Workflow',
    label: 'Got completion checklist',
    route: '/electrician/projects',
    minutesSaved: 5,
  },
  create_project_from_template: {
    tag: 'Project',
    label: 'Created project from template',
    route: '/electrician/projects',
    minutesSaved: 15,
  },
  send_payment_reminder: {
    tag: 'Money',
    label: 'Drafted a payment reminder',
    route: '/electrician/invoices',
    minutesSaved: 4,
  },

  // Internal / system (zero-or-near-zero minutes saved, no route)
  read_memory: { tag: 'System', label: 'Read memory', route: null, minutesSaved: 0 },
  write_memory: { tag: 'System', label: 'Updated memory', route: null, minutesSaved: 0 },
  delete_memory: { tag: 'System', label: 'Cleared memory', route: null, minutesSaved: 0 },
  log_activity: { tag: 'System', label: 'Logged activity', route: null, minutesSaved: 0 },
  read_activity_log: { tag: 'System', label: 'Read activity log', route: null, minutesSaved: 0 },
  get_usage_summary: { tag: 'System', label: 'Usage summary', route: null, minutesSaved: 0 },
};
