// Voice Tools Registry - Complete list of all tools for ElevenLabs configuration
// Each tool is formatted exactly as ElevenLabs requires

export interface ToolParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array';
  required: boolean;
  description: string;
  enumValues?: string[];
}

export interface VoiceTool {
  name: string;
  description: string;
  category: string;
  parameters: ToolParameter[];
  waitForResponse: boolean;
  disableInterruptions: boolean;
  executionMode: 'immediate' | 'wait';
}

// ============================================
// WORLD-CLASS SYSTEM PROMPT
// ============================================

export const ELEC_MATE_SYSTEM_PROMPT = `## IDENTITY

You are ELEC-MATE, the operations manager for a UK electrical contracting business. You're not just a voice assistant - you're the always-on ops manager who knows every job, every worker, every deadline. Think of yourself as that brilliant office manager who's been with the company 15 years and knows everything.

Respond to "Mate", "ELEC-MATE", or just being addressed directly. You are part of the team.

## PERSONALITY

- **Sharp and efficient** - Busy sparks don't have time for waffle. Get to the point.
- **Proactive** - Spot problems before they're asked about. Offer the next logical step.
- **Trustworthy** - Handle sensitive financial and HR matters with discretion.
- **Trade-savvy** - Speak the language of electricians. Know your first fix from your second fix.
- **Slightly warm** - Not robotic, but not overly chatty. Professional with a human touch.
- **British** - Use UK spelling, terms, and idioms naturally. "Cheers", "sorted", "no worries".

## AUTHORITY LEVELS

### Act immediately (no confirmation needed):
- Navigation, viewing data, queries
- Sending standard messages and notifications
- Approving routine timesheets under 40 hours
- Updating job progress
- Assigning workers to jobs
- Adding notes and comments
- Refreshing data

### Confirm before acting:
- Creating quotes over £5,000
- Approving expenses over £500
- Rejecting anything (give the reason)
- Sending documents to clients
- Deleting or archiving items

### Always confirm and repeat back:
- Sending invoices (money involved)
- Posting vacancies (public-facing)
- Reporting incidents (legal implications)
- Creating new employees

## RESPONSE STYLE

### Length Guidelines:
- **Confirmations**: 5-10 words
  - "Done. Mike's on the Smith job now."
  - "Sorted. Quote sent to John."
  - "Approved. Sarah's timesheet is done."

- **Data answers**: 10-30 words with key numbers
  - "3 invoices overdue totalling £4,200. Jones Building is the big one at £2,800."
  - "Mike's at the Smith rewire, been on site since 8:15. Sarah's en route to Acme."

- **Suggestions**: Include the action
  - "Want me to send a reminder?"
  - "Shall I assign Mike to that?"
  - "I can create a quote for that if you like."

### Voice Patterns:
- Use natural pauses with "..." when thinking
- Confirm values by repeating them: "£450, got it."
- Use acknowledgements: "Right", "Got it", "Okay", "Sure thing"
- End conversations helpfully: "Anything else while I'm here?"

## PROACTIVE BEHAVIOURS

### When asked about jobs:
- Mention if any have overdue tasks
- Flag if certifications are needed for workers
- Note upcoming deadlines

### When asked about employees:
- Note if they have pending timesheets
- Mention expiring certifications within 30 days
- Flag if they're already assigned elsewhere

### When asked about quotes:
- Suggest converting to job if accepted
- Flag if follow-up is overdue (>7 days)

### Time-of-day awareness:
**Morning (before 10am):**
- Offer a daily briefing
- Highlight urgent items first
- "Good morning. 3 things need your attention today..."

**End of day (after 4pm):**
- Remind about unsubmitted timesheets
- Suggest tomorrow's priorities
- "Before you go, Mike and Sarah haven't submitted timesheets yet."

## MULTI-STEP WORKFLOWS

### "Get Mike on the Smith job":
1. Use assign_to_job to assign Mike
2. Report: "Done, Mike's on the Smith job."
3. Offer: "Want me to send him the job pack too?"

### "Send that quote":
1. Use send_quote to email the document
2. Report: "Sent to john@smithelectrical.co.uk."
3. Offer: "Shall I set a follow-up reminder for 3 days?"

### "How are we doing" / "Give me an overview":
1. Use get_dashboard_summary
2. Use get_pending_approvals
3. Use get_overdue_invoices
4. Synthesise into one concise briefing:
   "You've got 5 active jobs, 3 quotes pending. 2 timesheets need approving, and there's an overdue invoice for £1,200 from ABC Ltd."

### Creating a quote conversationally:
1. Open the quote dialog
2. Ask for client name and job type first
3. **Assess job complexity** - Ask: "Is this a complex job where you'd like some estimating guidance, or a standard job you quote all the time?"

   **Standard jobs (skip suggestions, just collect items quickly):**
   - Domestic rewires
   - Consumer unit replacements/upgrades
   - Socket/light additions
   - EICR inspections
   - Minor works, fault finding
   - Garden lighting, EV charger installs
   
   **Complex jobs (offer AI estimating guidance):**
   - Office/commercial fit outs
   - Industrial installations
   - New build projects
   - Multi-dwelling developments
   - Specialist installations (data centres, medical, hazardous areas)
   - Jobs involving multiple trades/coordination
   - Unusual or unfamiliar work

4. **For complex jobs only**: Call get_quote_suggestions and proactively advise:
   - "For an office fit out this size, you'll want planning time - usually 10-15% of the job"
   - "Commercial work needs emergency lighting to BS 5266-1"
   - "Don't forget testing and certification - easily 4-8 hours on a job this size"
   - Reference regulations naturally: "Under Reg 522.8 you'll need cable protection in those walls"
   
5. **For standard jobs**: Skip suggestions and proceed directly - "Consumer unit upgrade - straightforward. What's the client name?"
6. Collect line items, confirm total, offer to send

## ERROR HANDLING

**Never say:**
- "I can't do that"
- "Error"
- "I don't understand"

**Instead:**
- "I couldn't find a job called 'Smith' - did you mean the Smith Electrical rewire or Smith House extension?"
- "I'll need the client's email to send that. What's their email?"
- "That didn't go through - might be a connection issue. Want me to try again?"
- "I'm not sure which Mike you mean - Mike Thompson the sparky or Mike Davies the apprentice?"

## ELECTRICAL TRADE KNOWLEDGE

### Certifications:
- 18th Edition (BS 7671) - Current wiring regulations
- Part P - Domestic electrical work regulations
- ECS cards - Electrotechnical Certification Scheme
- NICEIC, NAPIT, ELECSA - Competent person schemes
- JIB grading - Electrician, Approved, Technician

### Test types:
- Insulation resistance (IR)
- Continuity testing
- RCD trip times
- Earth fault loop impedance (Zs)
- Prospective fault current (PFC)
- Polarity checks

### Trade terminology:
- First fix / Second fix
- Containment, tray, trunking, conduit
- Consumer unit, DB, MCB, RCD, RCBO
- SWA cable, twin and earth
- Chasing, back boxes, pattress
- PIR, PIU, emergency lighting
- Fire alarm zones, call points

### Commercial awareness:
- Day rates typically £180-£350
- Hourly rates £25-£55
- Material mark-up 15-30%
- Call-out charges £50-£100
- Variations and daywork

## CONVERSATION EXAMPLES

**User:** "How's the Smith job going?"
**ELEC-MATE:** "Smith rewire is 65% complete. Mike and Dave are on site. They finished the first fix yesterday, second fix starts Monday. Only snag is the consumer unit delivery is delayed until Thursday."

**User:** "Approve Mike's timesheet"
**ELEC-MATE:** "Done. Mike's 38 hours approved for this week. That's £1,140 at his rate."

**User:** "What needs doing?"
**ELEC-MATE:** "3 things: Sarah's timesheet from Monday needs approving, there's an expense claim for £85 from Dave, and the Jones invoice has been overdue 14 days now - want me to send a reminder?"

**User:** "Send a quote to ABC Ltd"
**ELEC-MATE:** "Which quote? You've got two for ABC - the £2,400 socket upgrade or the £8,500 DB replacement?"

**User:** "Create a new quote"
**ELEC-MATE:** "Opening the quote form. What's the client name?"

**User:** "Where's everyone?"
**ELEC-MATE:** "Mike and Sarah are on site at Smith rewire since 8am. Dave's at the Henderson job. Tom called in sick this morning. Pete's on annual leave until Thursday."

## VOICE INTERACTION TIPS

- Keep a steady pace - not too fast for tradespeople on noisy sites
- Use clear enunciation for numbers and names
- Repeat back important values for confirmation
- Don't interrupt when user is giving multiple items
- Handle background noise gracefully

## TOOL USAGE

You have access to 300+ tools organised by category. Use them proactively:

**Navigation tools** - Move around the app
**Query tools** - Get information
**Approval tools** - Approve/reject items
**Creation tools** - Create new records
**Update tools** - Modify existing data
**Communication tools** - Send emails, messages
**AI tools** - Generate documents, expand descriptions

Always use the most specific tool available. Prefer single-purpose tools over general ones.

## FINAL NOTES

- You are ELEC-MATE - act like you own the place
- Be the ops manager they can rely on
- Anticipate needs, don't just react
- Keep the business running smoothly
- Sound like a colleague, not a computer
`;

// Navigation section enum values
const NAVIGATION_SECTIONS = [
  'overview', 'dashboard', 'home',
  'peoplehub', 'people-hub',
  'financehub', 'finance-hub', 'finance',
  'jobshub', 'jobs-hub',
  'safetyhub', 'safety-hub', 'safety',
  'employees', 'team', 'workers', 'staff',
  'elecid', 'elec-id', 'credentials',
  'timesheets', 'leave',
  'comms', 'communications', 'messages',
  'talentpool', 'talent-pool', 'candidates',
  'vacancies', 'job-vacancies', 'recruitment',
  'quotes', 'invoices', 'quotes-invoices', 'billing',
  'tenders', 'bids',
  'expenses', 'receipts',
  'procurement', 'materials', 'purchasing',
  'financials', 'job-financials',
  'reports', 'analytics',
  'signatures', 'sign-offs',
  'pricebook', 'price-book', 'pricing',
  'jobpacks', 'job-packs', 'documentation',
  'jobs', 'projects', 'sites',
  'jobboard', 'job-board',
  'timeline', 'job-timeline', 'schedule',
  'tracking', 'worker-tracking', 'location', 'gps',
  'progresslogs', 'progress-logs', 'progress', 'diary',
  'issues', 'job-issues', 'problems',
  'testing', 'testing-workflow', 'inspections',
  'quality', 'snags', 'defects',
  'clientportal', 'client-portal',
  'fleet', 'vehicles', 'vans', 'transport',
  'photogallery', 'photo-gallery', 'photos', 'gallery',
  'rams', 'risk-assessments', 'method-statements',
  'incidents', 'accidents', 'near-misses',
  'policies', 'procedures',
  'contracts', 'agreements',
  'training', 'training-records', 'certifications', 'certs',
  'briefings', 'toolbox-talks',
  'compliance', 'regulations', 'audits',
  'settings', 'preferences', 'configuration'
];

const DIALOG_TYPES = [
  'quote', 'createquote',
  'job', 'addjob', 'newjob',
  'employee', 'addemployee', 'worker',
  'invoice', 'createinvoice',
  'expense', 'createexpense',
  'timeentry', 'manualtimeentry',
  'certification', 'addcertification',
  'order', 'createorder',
  'supplier', 'createsupplier',
  'vacancy', 'postvacancy',
  'jobpack', 'addjobpack',
  'rams', 'createrams',
  'tender', 'createtender',
  'incident', 'reportincident',
  'training', 'addtraining',
  'briefing', 'createbriefing',
  'skill', 'addskill',
  'note', 'addnote',
  'workhistory', 'addworkhistory'
];

const VIEW_MODES = ['list', 'grid', 'kanban', 'map', 'calendar', 'timeline'];

const JOB_STATUSES = ['Active', 'Pending', 'Completed', 'On Hold', 'Cancelled', 'Quote Sent', 'Won', 'Lost'];

const INCIDENT_SEVERITIES = ['Low', 'Medium', 'High', 'Critical'];

const LEAVE_TYPES = ['annual', 'sick', 'unpaid', 'compassionate', 'training', 'bank_holiday'];

const EXPENSE_CATEGORIES = ['materials', 'tools', 'fuel', 'travel', 'accommodation', 'subsistence', 'ppe', 'training', 'other'];

const DOCUMENT_TYPES = ['rams', 'method_statement', 'briefing', 'permit', 'drawing', 'specification', 'certificate', 'photo'];

const VEHICLE_TYPES = ['van', 'truck', 'car', 'pickup', 'trailer'];

// ============================================
// COMPLETE TOOL REGISTRY - 300+ TOOLS
// ============================================

export const voiceToolsRegistry: VoiceTool[] = [
  // ============================================
  // NAVIGATION & UI (14 tools)
  // ============================================
  {
    name: 'navigate_to',
    description: 'Navigate to any section of the ELEC-MATE app. Use when the user wants to go to a different page, view, or section.',
    category: 'Navigation & UI',
    parameters: [{
      name: 'section',
      type: 'string',
      required: true,
      description: 'The section to navigate to',
      enumValues: NAVIGATION_SECTIONS
    }],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'go_back',
    description: 'Go back to the previous section or page. Use when user says "go back", "previous page", or "return".',
    category: 'Navigation & UI',
    parameters: [],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'go_home',
    description: 'Return to the main dashboard/overview. Use when user says "go home", "main page", or "dashboard".',
    category: 'Navigation & UI',
    parameters: [],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'open_dialog',
    description: 'Open a form dialog or modal. Use when user wants to create, add, or open a specific form.',
    category: 'Navigation & UI',
    parameters: [{
      name: 'dialog',
      type: 'string',
      required: true,
      description: 'The dialog/form to open',
      enumValues: DIALOG_TYPES
    }],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'close_dialog',
    description: 'Close the currently open dialog or form. Use when user says "close", "cancel", or "exit".',
    category: 'Navigation & UI',
    parameters: [],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'scroll_up',
    description: 'Scroll the page upward. Use when user says "scroll up", "go up", or "top".',
    category: 'Navigation & UI',
    parameters: [],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'scroll_down',
    description: 'Scroll the page downward. Use when user says "scroll down", "go down", or "more".',
    category: 'Navigation & UI',
    parameters: [],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'refresh_data',
    description: 'Refresh all data in the current view. Use when user says "refresh", "reload", or "update".',
    category: 'Navigation & UI',
    parameters: [],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'toggle_view',
    description: 'Switch between different view modes (list, grid, kanban, etc). Use when user wants to change how data is displayed.',
    category: 'Navigation & UI',
    parameters: [{
      name: 'mode',
      type: 'string',
      required: true,
      description: 'The view mode to switch to',
      enumValues: VIEW_MODES
    }],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'filter_by',
    description: 'Apply a filter to the current view. Use when user wants to filter by status, type, date, etc.',
    category: 'Navigation & UI',
    parameters: [{
      name: 'filter',
      type: 'string',
      required: true,
      description: 'The filter value or criteria to apply'
    }],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'clear_filters',
    description: 'Remove all active filters. Use when user says "clear filters", "show all", or "reset".',
    category: 'Navigation & UI',
    parameters: [],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'search_for',
    description: 'Search for items in the current section. Use when user wants to find something specific.',
    category: 'Navigation & UI',
    parameters: [{
      name: 'query',
      type: 'string',
      required: true,
      description: 'The search query or term'
    }],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'show_help',
    description: 'Show help information or available commands. Use when user asks for help or what they can do.',
    category: 'Navigation & UI',
    parameters: [],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'toggle_sidebar',
    description: 'Open or close the sidebar navigation. Use when user says "open menu", "close menu", or "sidebar".',
    category: 'Navigation & UI',
    parameters: [],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },

  // ============================================
  // FORM INTERACTION (12 tools)
  // ============================================
  {
    name: 'fill_field',
    description: 'Fill a specific field in the current form. Use when user provides a value for a form field.',
    category: 'Form Interaction',
    parameters: [
      { name: 'field', type: 'string', required: true, description: 'The field name or label to fill' },
      { name: 'value', type: 'string', required: true, description: 'The value to set in the field' }
    ],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'add_labour_item',
    description: 'Add a labour line item to a quote or invoice. Use when user describes work hours to add.',
    category: 'Form Interaction',
    parameters: [
      { name: 'description', type: 'string', required: true, description: 'Description of the labour work' },
      { name: 'hours', type: 'number', required: true, description: 'Number of hours' },
      { name: 'rate', type: 'number', required: true, description: 'Hourly rate in pounds' }
    ],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'add_material_item',
    description: 'Add a material line item to a quote or invoice. Use when user describes materials to add.',
    category: 'Form Interaction',
    parameters: [
      { name: 'description', type: 'string', required: true, description: 'Description of the material' },
      { name: 'quantity', type: 'number', required: true, description: 'Quantity of items' },
      { name: 'unitPrice', type: 'number', required: true, description: 'Price per unit in pounds' }
    ],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'add_line_item',
    description: 'Add a generic line item to a quote or invoice. Use for any priced item.',
    category: 'Form Interaction',
    parameters: [
      { name: 'description', type: 'string', required: true, description: 'Description of the item' },
      { name: 'quantity', type: 'number', required: true, description: 'Quantity' },
      { name: 'unitPrice', type: 'number', required: true, description: 'Price per unit in pounds' },
      { name: 'unit', type: 'string', required: false, description: 'Unit of measurement (each, metre, hour, etc)' }
    ],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'remove_last_item',
    description: 'Remove the last added line item from the current form. Use when user says "remove last", "delete that", or "undo".',
    category: 'Form Interaction',
    parameters: [],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'next_step',
    description: 'Move to the next step in a multi-step form. Use when user says "next", "continue", or "proceed".',
    category: 'Form Interaction',
    parameters: [],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'previous_step',
    description: 'Go back to the previous step in a multi-step form. Use when user says "back", "previous step".',
    category: 'Form Interaction',
    parameters: [],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'submit_form',
    description: 'Submit the current form. Use when user says "submit", "save", "done", or "create it".',
    category: 'Form Interaction',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'clear_form',
    description: 'Clear all fields in the current form. Use when user says "clear", "start over", or "reset form".',
    category: 'Form Interaction',
    parameters: [],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'cancel_form',
    description: 'Cancel and close the current form without saving. Use when user says "cancel", "never mind", or "forget it".',
    category: 'Form Interaction',
    parameters: [],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'get_form_status',
    description: 'Get the current status of the form - what fields are filled and what is remaining.',
    category: 'Form Interaction',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'preview_form',
    description: 'Preview the form before submitting. Use when user says "preview", "let me see", or "show me".',
    category: 'Form Interaction',
    parameters: [],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },

  // ============================================
  // QUERY - DASHBOARD (6 tools)
  // ============================================
  {
    name: 'get_dashboard_summary',
    description: 'Get an overview of the business - jobs, employees, pending items, revenue. Use when user asks for a summary or overview.',
    category: 'Query - Dashboard',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_todays_schedule',
    description: 'Get today\'s work schedule - who is working where. Use when user asks about today\'s schedule or who is on site.',
    category: 'Query - Dashboard',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_pending_approvals',
    description: 'Get all items awaiting approval - timesheets, leave, expenses. Use when user asks what needs approving.',
    category: 'Query - Dashboard',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_urgent_items',
    description: 'Get urgent items needing attention - overdue invoices, expiring certs, incidents. Use when user asks what needs attention.',
    category: 'Query - Dashboard',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_weekly_summary',
    description: 'Get a summary of the past week - completed jobs, revenue, hours worked.',
    category: 'Query - Dashboard',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_monthly_summary',
    description: 'Get a summary of the current month - revenue, jobs, performance metrics.',
    category: 'Query - Dashboard',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // QUERY - EMPLOYEES (18 tools)
  // ============================================
  {
    name: 'get_employee_info',
    description: 'Get information about an employee by name. Use when user asks about a specific person.',
    category: 'Query - Employees',
    parameters: [
      { name: 'name', type: 'string', required: false, description: 'Employee name to search for. If not provided, lists all employees.' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_employee_phone',
    description: 'Get an employee\'s phone number. Use when user wants to call or contact someone.',
    category: 'Query - Employees',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_employee_email',
    description: 'Get an employee\'s email address.',
    category: 'Query - Employees',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_employee_certifications',
    description: 'Get all certifications for an employee. Use when user asks about someone\'s qualifications.',
    category: 'Query - Employees',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_employee_hours',
    description: 'Get hours worked by an employee in a period. Use when user asks how many hours someone has worked.',
    category: 'Query - Employees',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' },
      { name: 'days', type: 'number', required: false, description: 'Number of days to look back (default 7)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_employee_jobs',
    description: 'Get jobs an employee is currently assigned to.',
    category: 'Query - Employees',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_employee_leave_balance',
    description: 'Get remaining holiday allowance for an employee.',
    category: 'Query - Employees',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_active_employees',
    description: 'List all active employees. Use when user asks who works here or for a team list.',
    category: 'Query - Employees',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_employees_by_role',
    description: 'Get employees filtered by role (electrician, apprentice, supervisor, etc).',
    category: 'Query - Employees',
    parameters: [
      { name: 'role', type: 'string', required: true, description: 'Role to filter by' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_available_workers',
    description: 'Get workers who are available (not assigned to jobs today). Use for last-minute job assignments.',
    category: 'Query - Employees',
    parameters: [
      { name: 'date', type: 'string', required: false, description: 'Date to check (default today)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_employees_on_leave',
    description: 'Get employees currently on leave or with upcoming leave.',
    category: 'Query - Employees',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days ahead to check (default 7)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_pending_timesheets',
    description: 'Get timesheets awaiting approval. Use when user asks about timesheet approvals.',
    category: 'Query - Employees',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_pending_leave',
    description: 'Get leave requests awaiting approval. Use when user asks about holiday requests.',
    category: 'Query - Employees',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_expiring_certifications',
    description: 'Get certifications expiring soon across all employees.',
    category: 'Query - Employees',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days ahead to check (default 30)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_employee_training_status',
    description: 'Get training completion status for an employee.',
    category: 'Query - Employees',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_employee_expenses',
    description: 'Get expense claims submitted by an employee.',
    category: 'Query - Employees',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' },
      { name: 'status', type: 'string', required: false, description: 'Filter by status (pending, approved, rejected)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_employee_elecid',
    description: 'Get ElecID profile and credentials for an employee.',
    category: 'Query - Employees',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'search_employees',
    description: 'Search employees by name, skill, or certification.',
    category: 'Query - Employees',
    parameters: [
      { name: 'query', type: 'string', required: true, description: 'Search term' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // QUERY - JOBS (22 tools)
  // ============================================
  {
    name: 'get_job_info',
    description: 'Get information about a job by title or client. Use when user asks about a specific job.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'title', type: 'string', required: false, description: 'Job title to search for' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_workers',
    description: 'Get workers assigned to a specific job.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_progress',
    description: 'Get progress status and checklist completion for a job.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_client_info',
    description: 'Get client contact details for a job.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_financials',
    description: 'Get financial summary for a job - budget, spent, profit margin.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_photos',
    description: 'Get photo count and recent photos for a job.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_issues',
    description: 'Get open issues or snags for a job.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_documents',
    description: 'Get documents associated with a job (RAMS, permits, drawings).',
    category: 'Query - Jobs',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_active_jobs',
    description: 'List all currently active jobs.',
    category: 'Query - Jobs',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_jobs_by_client',
    description: 'Get all jobs for a specific client.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'client', type: 'string', required: true, description: 'Client name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_jobs_by_status',
    description: 'Get jobs filtered by status.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'status', type: 'string', required: true, description: 'Job status', enumValues: JOB_STATUSES }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_upcoming_deadlines',
    description: 'Get jobs with deadlines coming up soon.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days ahead to check (default 14)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_overdue_jobs',
    description: 'Get jobs that are past their deadline.',
    category: 'Query - Jobs',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_jobs_starting_soon',
    description: 'Get jobs scheduled to start soon.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days ahead to check (default 7)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_pack_status',
    description: 'Check if a job has a complete job pack with all required documents.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_jobs_without_rams',
    description: 'Get jobs that don\'t have RAMS documents.',
    category: 'Query - Jobs',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_jobs_by_location',
    description: 'Get jobs in a specific area or location.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'location', type: 'string', required: true, description: 'Location or area to search' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_timeline',
    description: 'Get the activity timeline for a job.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_checklist',
    description: 'Get the checklist items for a job.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_archived_jobs',
    description: 'Get archived/completed jobs.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'limit', type: 'number', required: false, description: 'Number of jobs to return (default 10)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'search_jobs',
    description: 'Search jobs by title, client, or location.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'query', type: 'string', required: true, description: 'Search term' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_value',
    description: 'Get the value/worth of a job.',
    category: 'Query - Jobs',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // QUERY - WORKER LOCATIONS (8 tools)
  // ============================================
  {
    name: 'get_worker_locations',
    description: 'Get all workers\' current locations. Use when user asks where everyone is.',
    category: 'Query - Location',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_worker_location',
    description: 'Get a specific worker\'s current location.',
    category: 'Query - Location',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_nearest_worker',
    description: 'Find the nearest available worker to a job or location. Use for urgent call-outs.',
    category: 'Query - Location',
    parameters: [
      { name: 'jobTitle', type: 'string', required: false, description: 'Job title to check distance from' },
      { name: 'location', type: 'string', required: false, description: 'Location to check distance from' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_workers_on_site',
    description: 'Get workers currently on site at jobs.',
    category: 'Query - Location',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_workers_en_route',
    description: 'Get workers currently travelling to jobs.',
    category: 'Query - Location',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_workers_at_office',
    description: 'Get workers currently at the office.',
    category: 'Query - Location',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_worker_check_in_time',
    description: 'Get when a worker checked in at their current location.',
    category: 'Query - Location',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_workers_at_job',
    description: 'Get workers currently at a specific job site.',
    category: 'Query - Location',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // QUERY - FINANCE (20 tools)
  // ============================================
  {
    name: 'get_quote_info',
    description: 'Get information about quotes.',
    category: 'Query - Finance',
    parameters: [
      { name: 'client', type: 'string', required: false, description: 'Client name to filter' },
      { name: 'status', type: 'string', required: false, description: 'Status to filter (draft, sent, accepted, rejected)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_invoice_info',
    description: 'Get information about invoices.',
    category: 'Query - Finance',
    parameters: [
      { name: 'client', type: 'string', required: false, description: 'Client name to filter' },
      { name: 'status', type: 'string', required: false, description: 'Status to filter (draft, sent, paid, overdue)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_overdue_invoices',
    description: 'Get invoices that are overdue for payment.',
    category: 'Query - Finance',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_pending_expenses',
    description: 'Get expense claims awaiting approval.',
    category: 'Query - Finance',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_supplier_info',
    description: 'Get information about suppliers.',
    category: 'Query - Finance',
    parameters: [
      { name: 'name', type: 'string', required: false, description: 'Supplier name to search' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_revenue_summary',
    description: 'Get revenue collected in a period.',
    category: 'Query - Finance',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days to look back (default 30)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_outstanding_amount',
    description: 'Get total amount outstanding across all invoices.',
    category: 'Query - Finance',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_quotes_pending',
    description: 'Get quotes awaiting client response.',
    category: 'Query - Finance',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_quotes_expiring',
    description: 'Get quotes expiring soon.',
    category: 'Query - Finance',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days ahead to check (default 7)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_quote_conversion_rate',
    description: 'Get quote to job conversion rate.',
    category: 'Query - Finance',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_invoices_due_today',
    description: 'Get invoices with payment due today.',
    category: 'Query - Finance',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_client_balance',
    description: 'Get outstanding balance for a client.',
    category: 'Query - Finance',
    parameters: [
      { name: 'client', type: 'string', required: true, description: 'Client name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_supplier_balance',
    description: 'Get balance owed to a supplier.',
    category: 'Query - Finance',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Supplier name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_pending_orders',
    description: 'Get material orders awaiting delivery.',
    category: 'Query - Finance',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_expense_total',
    description: 'Get total expenses for a period.',
    category: 'Query - Finance',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days to look back (default 30)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_price_book_item',
    description: 'Get price for an item from the price book.',
    category: 'Query - Finance',
    parameters: [
      { name: 'item', type: 'string', required: true, description: 'Item name or SKU' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_labour_rates',
    description: 'Get current labour charge-out rates.',
    category: 'Query - Finance',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_cash_flow_forecast',
    description: 'Get expected cash flow based on invoices and expenses.',
    category: 'Query - Finance',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days ahead to forecast (default 30)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_profit_by_job',
    description: 'Get profit margin for a job.',
    category: 'Query - Finance',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'search_quotes',
    description: 'Search quotes by client, number, or description.',
    category: 'Query - Finance',
    parameters: [
      { name: 'query', type: 'string', required: true, description: 'Search term' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // QUERY - TENDERS (14 tools)
  // ============================================
  {
    name: 'get_open_tenders',
    description: 'Get tenders that are currently open for submission.',
    category: 'Query - Tenders',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_tender_info',
    description: 'Get detailed information about a specific tender.',
    category: 'Query - Tenders',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Tender title or reference' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_tender_deadlines',
    description: 'Get tenders with upcoming submission deadlines.',
    category: 'Query - Tenders',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days ahead to check (default 14)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_tender_value',
    description: 'Get the estimated value of a tender.',
    category: 'Query - Tenders',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Tender title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_tender_documents',
    description: 'Get documents attached to a tender.',
    category: 'Query - Tenders',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Tender title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_won_tenders',
    description: 'Get tenders that have been won.',
    category: 'Query - Tenders',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days to look back (default 90)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_lost_tenders',
    description: 'Get tenders that were lost.',
    category: 'Query - Tenders',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days to look back (default 90)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_tender_win_rate',
    description: 'Get tender success rate.',
    category: 'Query - Tenders',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_tender_pipeline',
    description: 'Get total value of pending tenders.',
    category: 'Query - Tenders',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_tenders_by_client',
    description: 'Get tenders for a specific client.',
    category: 'Query - Tenders',
    parameters: [
      { name: 'client', type: 'string', required: true, description: 'Client name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_tender_status',
    description: 'Get the current status of a tender.',
    category: 'Query - Tenders',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Tender title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_submitted_tenders',
    description: 'Get tenders that have been submitted.',
    category: 'Query - Tenders',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_draft_tenders',
    description: 'Get tenders in draft status.',
    category: 'Query - Tenders',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'compare_tenders',
    description: 'Compare values and details of multiple tenders.',
    category: 'Query - Tenders',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // QUERY - SAFETY (16 tools)
  // ============================================
  {
    name: 'get_open_incidents',
    description: 'Get open safety incidents.',
    category: 'Query - Safety',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_incident_info',
    description: 'Get details about a specific incident.',
    category: 'Query - Safety',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Incident title or reference' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_rams_status',
    description: 'Get RAMS document status.',
    category: 'Query - Safety',
    parameters: [
      { name: 'title', type: 'string', required: false, description: 'RAMS or job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_pending_rams',
    description: 'Get RAMS documents awaiting approval.',
    category: 'Query - Safety',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_rams_expiring',
    description: 'Get RAMS documents expiring soon.',
    category: 'Query - Safety',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days ahead to check (default 30)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_rams',
    description: 'Get RAMS for a specific job.',
    category: 'Query - Safety',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_training_due',
    description: 'Get training records expiring soon.',
    category: 'Query - Safety',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days ahead to check (default 30)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_briefings_due',
    description: 'Get workers with overdue briefings.',
    category: 'Query - Safety',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_compliance_status',
    description: 'Get overall compliance status.',
    category: 'Query - Safety',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_incidents_by_job',
    description: 'Get incidents for a specific job.',
    category: 'Query - Safety',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_incidents_by_severity',
    description: 'Get incidents filtered by severity.',
    category: 'Query - Safety',
    parameters: [
      { name: 'severity', type: 'string', required: true, description: 'Severity level', enumValues: INCIDENT_SEVERITIES }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_incident_count',
    description: 'Get incident count for a period.',
    category: 'Query - Safety',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days to look back (default 30)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_policy_status',
    description: 'Get policy acknowledgement status.',
    category: 'Query - Safety',
    parameters: [
      { name: 'policy', type: 'string', required: false, description: 'Policy name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_workers_missing_briefing',
    description: 'Get workers who haven\'t completed required briefings.',
    category: 'Query - Safety',
    parameters: [
      { name: 'briefing', type: 'string', required: false, description: 'Briefing type' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_near_misses',
    description: 'Get recent near-miss reports.',
    category: 'Query - Safety',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days to look back (default 30)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_safety_stats',
    description: 'Get safety statistics and KPIs.',
    category: 'Query - Safety',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // QUERY - JOB PACKS (12 tools)
  // ============================================
  {
    name: 'get_job_pack_info',
    description: 'Get job pack details and document list.',
    category: 'Query - Job Packs',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job pack or job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_incomplete_job_packs',
    description: 'Get job packs with missing documents.',
    category: 'Query - Job Packs',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_pack_documents',
    description: 'List all documents in a job pack.',
    category: 'Query - Job Packs',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job pack title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_pack_acknowledgements',
    description: 'Get worker acknowledgements for a job pack.',
    category: 'Query - Job Packs',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job pack title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_worker_job_packs',
    description: 'Get job packs assigned to a worker.',
    category: 'Query - Job Packs',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Worker name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_packs_not_sent',
    description: 'Get job packs that haven\'t been sent to workers.',
    category: 'Query - Job Packs',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_packs_awaiting_ack',
    description: 'Get job packs awaiting worker acknowledgement.',
    category: 'Query - Job Packs',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_pack_missing_docs',
    description: 'Get which documents are missing from a job pack.',
    category: 'Query - Job Packs',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job pack title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_jobs_awaiting_pack',
    description: 'Get jobs that don\'t have job packs created.',
    category: 'Query - Job Packs',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_job_pack_status',
    description: 'Get the status of a job pack (draft, complete, sent).',
    category: 'Query - Job Packs',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job pack title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_recent_job_packs',
    description: 'Get recently created or updated job packs.',
    category: 'Query - Job Packs',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days to look back (default 7)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'search_job_packs',
    description: 'Search job packs by title, client, or content.',
    category: 'Query - Job Packs',
    parameters: [
      { name: 'query', type: 'string', required: true, description: 'Search term' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // QUERY - FLEET (12 tools)
  // ============================================
  {
    name: 'get_vehicles',
    description: 'Get all vehicles in the fleet.',
    category: 'Query - Fleet',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_vehicle_info',
    description: 'Get details about a specific vehicle.',
    category: 'Query - Fleet',
    parameters: [
      { name: 'registration', type: 'string', required: true, description: 'Vehicle registration or name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_vehicle_location',
    description: 'Get current location of a vehicle.',
    category: 'Query - Fleet',
    parameters: [
      { name: 'registration', type: 'string', required: true, description: 'Vehicle registration' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_mot_due',
    description: 'Get vehicles with MOT due soon.',
    category: 'Query - Fleet',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days ahead to check (default 30)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_service_due',
    description: 'Get vehicles due for service.',
    category: 'Query - Fleet',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days ahead to check (default 30)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_fuel_costs',
    description: 'Get fuel spending summary.',
    category: 'Query - Fleet',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days to look back (default 30)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_vehicle_assigned_to',
    description: 'Get who is assigned to a vehicle.',
    category: 'Query - Fleet',
    parameters: [
      { name: 'registration', type: 'string', required: true, description: 'Vehicle registration' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_vehicle_issues',
    description: 'Get open issues reported for vehicles.',
    category: 'Query - Fleet',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_vehicle_history',
    description: 'Get service and usage history for a vehicle.',
    category: 'Query - Fleet',
    parameters: [
      { name: 'registration', type: 'string', required: true, description: 'Vehicle registration' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_vehicle_documents',
    description: 'Get documents for a vehicle (insurance, MOT, etc).',
    category: 'Query - Fleet',
    parameters: [
      { name: 'registration', type: 'string', required: true, description: 'Vehicle registration' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_available_vehicles',
    description: 'Get vehicles not currently in use.',
    category: 'Query - Fleet',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_fleet_summary',
    description: 'Get overall fleet status summary.',
    category: 'Query - Fleet',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // QUERY - QUALITY/SNAGS (10 tools)
  // ============================================
  {
    name: 'get_open_snags',
    description: 'Get unresolved quality issues/snags.',
    category: 'Query - Quality',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_snags_by_job',
    description: 'Get snags for a specific job.',
    category: 'Query - Quality',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_snag_info',
    description: 'Get details about a specific snag.',
    category: 'Query - Quality',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Snag ID or description' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_snag_count',
    description: 'Get snag count by status.',
    category: 'Query - Quality',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_snag_history',
    description: 'Get snag resolution history.',
    category: 'Query - Quality',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days to look back (default 30)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_worker_snags',
    description: 'Get snags assigned to a worker.',
    category: 'Query - Quality',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Worker name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_urgent_snags',
    description: 'Get escalated/urgent snags.',
    category: 'Query - Quality',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_snag_photos',
    description: 'Get photos attached to snags.',
    category: 'Query - Quality',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Snag ID' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_recent_snags',
    description: 'Get recently logged snags.',
    category: 'Query - Quality',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days to look back (default 7)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_snag_resolution_time',
    description: 'Get average snag resolution time.',
    category: 'Query - Quality',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // QUERY - TESTING (10 tools)
  // ============================================
  {
    name: 'get_pending_tests',
    description: 'Get tests awaiting completion.',
    category: 'Query - Testing',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_tests_by_job',
    description: 'Get tests for a specific job.',
    category: 'Query - Testing',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_test_certificates',
    description: 'Get test certificates generated.',
    category: 'Query - Testing',
    parameters: [
      { name: 'jobTitle', type: 'string', required: false, description: 'Filter by job' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_failed_tests',
    description: 'Get tests that failed.',
    category: 'Query - Testing',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_test_summary',
    description: 'Get testing overview and pass rates.',
    category: 'Query - Testing',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_qualified_testers',
    description: 'Get employees qualified to perform tests.',
    category: 'Query - Testing',
    parameters: [
      { name: 'testType', type: 'string', required: false, description: 'Type of test' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_retests_due',
    description: 'Get tests needing retesting.',
    category: 'Query - Testing',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_test_types',
    description: 'Get available test types.',
    category: 'Query - Testing',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_tester_workload',
    description: 'Get testing workload by employee.',
    category: 'Query - Testing',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_test_schedule',
    description: 'Get scheduled tests.',
    category: 'Query - Testing',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days ahead to show (default 7)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // QUERY - PHOTOS (8 tools)
  // ============================================
  {
    name: 'get_job_photos',
    description: 'Get photos for a job.',
    category: 'Query - Photos',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_recent_photos',
    description: 'Get recently uploaded photos.',
    category: 'Query - Photos',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days to look back (default 7)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_photo_count',
    description: 'Get photo count for a job.',
    category: 'Query - Photos',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_photos_by_worker',
    description: 'Get photos uploaded by a worker.',
    category: 'Query - Photos',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Worker name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_photos_by_type',
    description: 'Get photos filtered by type (before, after, progress, issue).',
    category: 'Query - Photos',
    parameters: [
      { name: 'type', type: 'string', required: true, description: 'Photo type' },
      { name: 'jobTitle', type: 'string', required: false, description: 'Filter by job' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_photo_timeline',
    description: 'Get chronological photo timeline for a job.',
    category: 'Query - Photos',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_before_after_photos',
    description: 'Get before and after comparison photos.',
    category: 'Query - Photos',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_jobs_without_photos',
    description: 'Get jobs that don\'t have any photos.',
    category: 'Query - Photos',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // QUERY - PROGRESS LOGS (8 tools)
  // ============================================
  {
    name: 'get_progress_logs',
    description: 'Get progress logs for a job.',
    category: 'Query - Progress',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_todays_logs',
    description: 'Get progress logs entered today.',
    category: 'Query - Progress',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_worker_logs',
    description: 'Get progress logs by a worker.',
    category: 'Query - Progress',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Worker name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_recent_progress',
    description: 'Get recent progress across all jobs.',
    category: 'Query - Progress',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days to look back (default 3)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_progress_summary',
    description: 'Get AI-generated progress summary for a job.',
    category: 'Query - Progress',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_jobs_without_updates',
    description: 'Get jobs that haven\'t had progress updates recently.',
    category: 'Query - Progress',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days without updates (default 3)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_delays_reported',
    description: 'Get reported delays.',
    category: 'Query - Progress',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_progress_by_date',
    description: 'Get progress logs for a specific date.',
    category: 'Query - Progress',
    parameters: [
      { name: 'date', type: 'string', required: true, description: 'Date (YYYY-MM-DD)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // QUERY - CLIENT PORTAL (8 tools)
  // ============================================
  {
    name: 'get_client_portal_status',
    description: 'Get client portal access status for a job.',
    category: 'Query - Client Portal',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_client_messages',
    description: 'Get messages from clients.',
    category: 'Query - Client Portal',
    parameters: [
      { name: 'jobTitle', type: 'string', required: false, description: 'Filter by job' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_pending_signoffs',
    description: 'Get client signoffs awaiting response.',
    category: 'Query - Client Portal',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_client_signoffs',
    description: 'Get signoffs for a job.',
    category: 'Query - Client Portal',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_client_feedback',
    description: 'Get feedback received from clients.',
    category: 'Query - Client Portal',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days to look back (default 30)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_unread_client_messages',
    description: 'Get unread messages from clients.',
    category: 'Query - Client Portal',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_active_portal_invites',
    description: 'Get active client portal invitations.',
    category: 'Query - Client Portal',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_client_portal_activity',
    description: 'Get recent client portal activity.',
    category: 'Query - Client Portal',
    parameters: [
      { name: 'title', type: 'string', required: false, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // QUERY - ELEC ID (8 tools)
  // ============================================
  {
    name: 'get_elecid_info',
    description: 'Get ElecID details for an employee.',
    category: 'Query - ElecID',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'verify_elecid',
    description: 'Verify an ElecID number is valid.',
    category: 'Query - ElecID',
    parameters: [
      { name: 'elecidNumber', type: 'string', required: true, description: 'ElecID number' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_elecid_credentials',
    description: 'Get verified credentials from an ElecID.',
    category: 'Query - ElecID',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_elecids_expiring',
    description: 'Get ElecIDs with certifications expiring soon.',
    category: 'Query - ElecID',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days ahead to check (default 30)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_employees_without_elecid',
    description: 'Get employees who don\'t have an ElecID.',
    category: 'Query - ElecID',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_elecid_verification_history',
    description: 'Get verification history for an ElecID.',
    category: 'Query - ElecID',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_unverified_elecids',
    description: 'Get ElecIDs pending verification.',
    category: 'Query - ElecID',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_elecid_scan_log',
    description: 'Get recent ElecID scans.',
    category: 'Query - ElecID',
    parameters: [
      { name: 'days', type: 'number', required: false, description: 'Days to look back (default 7)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // APPROVALS (12 tools)
  // ============================================
  {
    name: 'approve_timesheet',
    description: 'Approve timesheets for an employee.',
    category: 'Approvals',
    parameters: [
      { name: 'employeeName', type: 'string', required: false, description: 'Employee name. If not provided, approves all pending.' },
      { name: 'approveAll', type: 'boolean', required: false, description: 'Approve all pending timesheets' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'reject_timesheet',
    description: 'Reject timesheets for an employee.',
    category: 'Approvals',
    parameters: [
      { name: 'employeeName', type: 'string', required: true, description: 'Employee name' },
      { name: 'reason', type: 'string', required: false, description: 'Rejection reason' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'approve_leave',
    description: 'Approve a leave request.',
    category: 'Approvals',
    parameters: [
      { name: 'employeeName', type: 'string', required: true, description: 'Employee name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'reject_leave',
    description: 'Reject a leave request.',
    category: 'Approvals',
    parameters: [
      { name: 'employeeName', type: 'string', required: true, description: 'Employee name' },
      { name: 'reason', type: 'string', required: false, description: 'Rejection reason' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'approve_expense',
    description: 'Approve expense claims.',
    category: 'Approvals',
    parameters: [
      { name: 'employeeName', type: 'string', required: false, description: 'Employee name' },
      { name: 'approveAll', type: 'boolean', required: false, description: 'Approve all pending' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'reject_expense',
    description: 'Reject an expense claim.',
    category: 'Approvals',
    parameters: [
      { name: 'employeeName', type: 'string', required: true, description: 'Employee name' },
      { name: 'reason', type: 'string', required: false, description: 'Rejection reason' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'approve_rams',
    description: 'Approve a RAMS document.',
    category: 'Approvals',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'RAMS title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'reject_rams',
    description: 'Reject a RAMS document.',
    category: 'Approvals',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'RAMS title' },
      { name: 'reason', type: 'string', required: true, description: 'Rejection reason' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'approve_all_pending',
    description: 'Approve all pending items (timesheets, leave, expenses).',
    category: 'Approvals',
    parameters: [
      { name: 'type', type: 'string', required: true, description: 'Type to approve', enumValues: ['timesheets', 'leave', 'expenses', 'all'] }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'approve_quote',
    description: 'Mark a quote as approved internally.',
    category: 'Approvals',
    parameters: [
      { name: 'quoteNumber', type: 'string', required: true, description: 'Quote number' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'approve_order',
    description: 'Approve a material order.',
    category: 'Approvals',
    parameters: [
      { name: 'orderNumber', type: 'string', required: true, description: 'Order number' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'approve_job_pack',
    description: 'Approve a job pack as complete.',
    category: 'Approvals',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job pack title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // CREATION (30 tools)
  // ============================================
  {
    name: 'create_quote',
    description: 'Create a simple quote with basic details. For comprehensive quotes with full client info, labour, and materials, use create_and_send_quote instead.',
    category: 'Creation',
    parameters: [
      { name: 'client', type: 'string', required: true, description: 'Client name' },
      { name: 'description', type: 'string', required: false, description: 'Quote description' },
      { name: 'value', type: 'number', required: false, description: 'Quote value in pounds' },
      { name: 'email', type: 'string', required: false, description: 'Client email' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_and_send_quote',
    description: 'Create a comprehensive quote with full client details, labour, materials, and optionally send it immediately via email. This is the preferred tool for voice-driven quote creation. Example: "Create a quote for John Smith at 45 Oak Lane, London, email john@example.com. Kitchen rewire, 8 hours at £45 per hour plus £180 materials. Send it now."',
    category: 'Creation',
    parameters: [
      { name: 'client', type: 'string', required: true, description: 'Client full name' },
      { name: 'clientAddress', type: 'string', required: true, description: 'Client address including postcode' },
      { name: 'clientEmail', type: 'string', required: true, description: 'Client email for sending the quote' },
      { name: 'clientPhone', type: 'string', required: false, description: 'Client phone number' },
      { name: 'jobTitle', type: 'string', required: true, description: 'Short job title e.g. "Kitchen Rewire", "Consumer Unit Upgrade"' },
      { name: 'description', type: 'string', required: false, description: 'Detailed scope of work description' },
      { name: 'labourHours', type: 'number', required: false, description: 'Total labour hours' },
      { name: 'labourRate', type: 'number', required: false, description: 'Hourly rate in pounds (default £45)' },
      { name: 'labourDescription', type: 'string', required: false, description: 'Labour description (default "Labour")' },
      { name: 'materialsTotal', type: 'number', required: false, description: 'Total materials cost in pounds' },
      { name: 'materialsDescription', type: 'string', required: false, description: 'Materials description (default "Materials")' },
      { name: 'includeVat', type: 'boolean', required: false, description: 'Include 20% VAT (default true)' },
      { name: 'validDays', type: 'number', required: false, description: 'Days until quote expires (default 30)' },
      { name: 'sendNow', type: 'boolean', required: false, description: 'Send immediately via email (default true)' },
      { name: 'notes', type: 'string', required: false, description: 'Additional notes for the quote' }
    ],
    waitForResponse: true,
    disableInterruptions: true,
    executionMode: 'wait'
  },
  {
    name: 'create_job',
    description: 'Create a new job.',
    category: 'Creation',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' },
      { name: 'client', type: 'string', required: true, description: 'Client name' },
      { name: 'location', type: 'string', required: true, description: 'Job location/address' },
      { name: 'description', type: 'string', required: false, description: 'Job description' },
      { name: 'value', type: 'number', required: false, description: 'Job value in pounds' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_employee',
    description: 'Add a new employee.',
    category: 'Creation',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' },
      { name: 'role', type: 'string', required: false, description: 'Job role' },
      { name: 'email', type: 'string', required: false, description: 'Email address' },
      { name: 'phone', type: 'string', required: false, description: 'Phone number' },
      { name: 'hourlyRate', type: 'number', required: false, description: 'Hourly rate in pounds' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_invoice',
    description: 'Create a new invoice.',
    category: 'Creation',
    parameters: [
      { name: 'client', type: 'string', required: true, description: 'Client name' },
      { name: 'amount', type: 'number', required: false, description: 'Invoice amount' },
      { name: 'project', type: 'string', required: false, description: 'Related job/project' },
      { name: 'quoteId', type: 'string', required: false, description: 'Quote to convert' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_expense',
    description: 'Submit an expense claim.',
    category: 'Creation',
    parameters: [
      { name: 'employeeName', type: 'string', required: true, description: 'Employee name' },
      { name: 'amount', type: 'number', required: true, description: 'Expense amount' },
      { name: 'category', type: 'string', required: false, description: 'Expense category', enumValues: EXPENSE_CATEGORIES },
      { name: 'description', type: 'string', required: false, description: 'Description' },
      { name: 'jobTitle', type: 'string', required: false, description: 'Related job' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_time_entry',
    description: 'Log time for an employee.',
    category: 'Creation',
    parameters: [
      { name: 'employeeName', type: 'string', required: true, description: 'Employee name' },
      { name: 'hours', type: 'number', required: true, description: 'Hours worked' },
      { name: 'jobTitle', type: 'string', required: false, description: 'Job worked on' },
      { name: 'date', type: 'string', required: false, description: 'Date (YYYY-MM-DD)' },
      { name: 'notes', type: 'string', required: false, description: 'Work notes' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_incident',
    description: 'Report a safety incident.',
    category: 'Creation',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Incident title' },
      { name: 'description', type: 'string', required: false, description: 'What happened' },
      { name: 'severity', type: 'string', required: false, description: 'Severity level', enumValues: INCIDENT_SEVERITIES },
      { name: 'location', type: 'string', required: false, description: 'Where it happened' },
      { name: 'jobTitle', type: 'string', required: false, description: 'Related job' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'post_vacancy',
    description: 'Post a job vacancy.',
    category: 'Creation',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Vacancy title' },
      { name: 'location', type: 'string', required: true, description: 'Work location' },
      { name: 'salaryMin', type: 'number', required: false, description: 'Minimum salary' },
      { name: 'salaryMax', type: 'number', required: false, description: 'Maximum salary' },
      { name: 'type', type: 'string', required: false, description: 'Employment type' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_rams',
    description: 'Create a RAMS document.',
    category: 'Creation',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'RAMS title' },
      { name: 'jobTitle', type: 'string', required: false, description: 'Related job' },
      { name: 'scope', type: 'string', required: false, description: 'Scope of work' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'generate_rams_ai',
    description: 'AI-generate RAMS from job description.',
    category: 'Creation',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job to generate RAMS for' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_job_pack',
    description: 'Create a job pack.',
    category: 'Creation',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job to create pack for' },
      { name: 'includeRams', type: 'boolean', required: false, description: 'Include RAMS' },
      { name: 'includeBriefing', type: 'boolean', required: false, description: 'Include briefing' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_tender',
    description: 'Create a new tender submission.',
    category: 'Creation',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Tender title' },
      { name: 'client', type: 'string', required: true, description: 'Client name' },
      { name: 'value', type: 'number', required: false, description: 'Estimated value' },
      { name: 'deadline', type: 'string', required: false, description: 'Submission deadline' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_order',
    description: 'Create a material order.',
    category: 'Creation',
    parameters: [
      { name: 'supplier', type: 'string', required: true, description: 'Supplier name' },
      { name: 'jobTitle', type: 'string', required: false, description: 'Job for order' },
      { name: 'items', type: 'string', required: false, description: 'Items to order' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_supplier',
    description: 'Add a new supplier.',
    category: 'Creation',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Supplier name' },
      { name: 'email', type: 'string', required: false, description: 'Email address' },
      { name: 'phone', type: 'string', required: false, description: 'Phone number' },
      { name: 'category', type: 'string', required: false, description: 'Supplier category' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_training_record',
    description: 'Add a training record for an employee.',
    category: 'Creation',
    parameters: [
      { name: 'employeeName', type: 'string', required: true, description: 'Employee name' },
      { name: 'trainingName', type: 'string', required: true, description: 'Training/course name' },
      { name: 'completedDate', type: 'string', required: false, description: 'Completion date' },
      { name: 'expiryDate', type: 'string', required: false, description: 'Expiry date' },
      { name: 'provider', type: 'string', required: false, description: 'Training provider' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_briefing',
    description: 'Create a briefing or toolbox talk.',
    category: 'Creation',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Briefing title' },
      { name: 'jobTitle', type: 'string', required: false, description: 'Related job' },
      { name: 'content', type: 'string', required: false, description: 'Briefing content' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_certification',
    description: 'Add a certification for an employee.',
    category: 'Creation',
    parameters: [
      { name: 'employeeName', type: 'string', required: true, description: 'Employee name' },
      { name: 'certName', type: 'string', required: true, description: 'Certification name' },
      { name: 'issueDate', type: 'string', required: false, description: 'Issue date' },
      { name: 'expiryDate', type: 'string', required: false, description: 'Expiry date' },
      { name: 'certificateNumber', type: 'string', required: false, description: 'Certificate number' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_elecid',
    description: 'Create an ElecID for an employee.',
    category: 'Creation',
    parameters: [
      { name: 'employeeName', type: 'string', required: true, description: 'Employee name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'log_snag',
    description: 'Log a quality issue or snag.',
    category: 'Creation',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job the snag is on' },
      { name: 'description', type: 'string', required: true, description: 'Description of issue' },
      { name: 'severity', type: 'string', required: false, description: 'Severity level' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_test',
    description: 'Create a test record.',
    category: 'Creation',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job to test' },
      { name: 'testType', type: 'string', required: true, description: 'Type of test' },
      { name: 'tester', type: 'string', required: false, description: 'Tester name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'log_progress',
    description: 'Log a progress entry.',
    category: 'Creation',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job title' },
      { name: 'notes', type: 'string', required: true, description: 'Progress notes' },
      { name: 'workerName', type: 'string', required: false, description: 'Worker logging' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'log_fuel',
    description: 'Log a fuel purchase.',
    category: 'Creation',
    parameters: [
      { name: 'vehicle', type: 'string', required: true, description: 'Vehicle registration' },
      { name: 'amount', type: 'number', required: true, description: 'Cost in pounds' },
      { name: 'litres', type: 'number', required: false, description: 'Litres purchased' },
      { name: 'mileage', type: 'number', required: false, description: 'Current mileage' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'report_vehicle_issue',
    description: 'Report a vehicle problem.',
    category: 'Creation',
    parameters: [
      { name: 'vehicle', type: 'string', required: true, description: 'Vehicle registration' },
      { name: 'issue', type: 'string', required: true, description: 'Description of issue' },
      { name: 'severity', type: 'string', required: false, description: 'Severity level' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_leave_request',
    description: 'Submit a leave request.',
    category: 'Creation',
    parameters: [
      { name: 'employeeName', type: 'string', required: true, description: 'Employee name' },
      { name: 'type', type: 'string', required: true, description: 'Leave type', enumValues: LEAVE_TYPES },
      { name: 'startDate', type: 'string', required: true, description: 'Start date' },
      { name: 'endDate', type: 'string', required: true, description: 'End date' },
      { name: 'reason', type: 'string', required: false, description: 'Reason for leave' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'add_price_book_item',
    description: 'Add an item to the price book.',
    category: 'Creation',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Item name' },
      { name: 'category', type: 'string', required: true, description: 'Category' },
      { name: 'buyPrice', type: 'number', required: true, description: 'Buy price' },
      { name: 'sellPrice', type: 'number', required: true, description: 'Sell price' },
      { name: 'unit', type: 'string', required: false, description: 'Unit of measurement' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'add_vehicle',
    description: 'Add a vehicle to the fleet.',
    category: 'Creation',
    parameters: [
      { name: 'registration', type: 'string', required: true, description: 'Registration number' },
      { name: 'type', type: 'string', required: true, description: 'Vehicle type', enumValues: VEHICLE_TYPES },
      { name: 'make', type: 'string', required: false, description: 'Make/manufacturer' },
      { name: 'model', type: 'string', required: false, description: 'Model' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'schedule_interview',
    description: 'Schedule an interview with a candidate.',
    category: 'Creation',
    parameters: [
      { name: 'candidateName', type: 'string', required: true, description: 'Candidate name' },
      { name: 'date', type: 'string', required: true, description: 'Interview date' },
      { name: 'time', type: 'string', required: true, description: 'Interview time' },
      { name: 'vacancyTitle', type: 'string', required: false, description: 'Vacancy applying for' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'create_contract',
    description: 'Create a contract document.',
    category: 'Creation',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Contract title' },
      { name: 'client', type: 'string', required: true, description: 'Client name' },
      { name: 'value', type: 'number', required: false, description: 'Contract value' },
      { name: 'startDate', type: 'string', required: false, description: 'Start date' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'request_client_signoff',
    description: 'Request a client signoff.',
    category: 'Creation',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job title' },
      { name: 'stage', type: 'string', required: true, description: 'Stage to sign off' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // UPDATES (24 tools)
  // ============================================
  {
    name: 'update_job_status',
    description: 'Update the status of a job.',
    category: 'Updates',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' },
      { name: 'status', type: 'string', required: true, description: 'New status', enumValues: JOB_STATUSES }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'update_job_progress',
    description: 'Update job progress percentage.',
    category: 'Updates',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' },
      { name: 'progress', type: 'number', required: true, description: 'Progress percentage (0-100)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'assign_worker_to_job',
    description: 'Assign a worker to a job.',
    category: 'Updates',
    parameters: [
      { name: 'workerName', type: 'string', required: true, description: 'Worker name' },
      { name: 'jobTitle', type: 'string', required: true, description: 'Job title' },
      { name: 'startDate', type: 'string', required: false, description: 'Start date' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'remove_worker_from_job',
    description: 'Remove a worker from a job.',
    category: 'Updates',
    parameters: [
      { name: 'workerName', type: 'string', required: true, description: 'Worker name' },
      { name: 'jobTitle', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'update_quote_status',
    description: 'Update quote status.',
    category: 'Updates',
    parameters: [
      { name: 'quoteNumber', type: 'string', required: true, description: 'Quote number' },
      { name: 'status', type: 'string', required: true, description: 'New status', enumValues: ['draft', 'sent', 'accepted', 'rejected', 'expired'] }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'mark_invoice_paid',
    description: 'Mark an invoice as paid.',
    category: 'Updates',
    parameters: [
      { name: 'invoiceNumber', type: 'string', required: true, description: 'Invoice number' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'update_tender_status',
    description: 'Update tender status (won/lost/submitted).',
    category: 'Updates',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Tender title' },
      { name: 'status', type: 'string', required: true, description: 'New status', enumValues: ['draft', 'submitted', 'won', 'lost', 'withdrawn'] }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'resolve_snag',
    description: 'Mark a snag as resolved.',
    category: 'Updates',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Snag ID or description' },
      { name: 'resolution', type: 'string', required: false, description: 'How it was resolved' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'escalate_snag',
    description: 'Escalate a snag to urgent.',
    category: 'Updates',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Snag ID' },
      { name: 'reason', type: 'string', required: false, description: 'Escalation reason' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'close_incident',
    description: 'Close a safety incident.',
    category: 'Updates',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Incident title' },
      { name: 'resolution', type: 'string', required: false, description: 'Resolution notes' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'record_test_result',
    description: 'Record a test result.',
    category: 'Updates',
    parameters: [
      { name: 'testId', type: 'string', required: true, description: 'Test ID' },
      { name: 'result', type: 'string', required: true, description: 'Pass or Fail', enumValues: ['pass', 'fail'] },
      { name: 'notes', type: 'string', required: false, description: 'Result notes' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'complete_checklist_item',
    description: 'Mark a job checklist item complete.',
    category: 'Updates',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job title' },
      { name: 'item', type: 'string', required: true, description: 'Checklist item' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'assign_vehicle',
    description: 'Assign a vehicle to an employee.',
    category: 'Updates',
    parameters: [
      { name: 'registration', type: 'string', required: true, description: 'Vehicle registration' },
      { name: 'employeeName', type: 'string', required: true, description: 'Employee name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'update_mileage',
    description: 'Update vehicle mileage.',
    category: 'Updates',
    parameters: [
      { name: 'registration', type: 'string', required: true, description: 'Vehicle registration' },
      { name: 'mileage', type: 'number', required: true, description: 'Current mileage' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'mark_order_received',
    description: 'Mark a material order as received.',
    category: 'Updates',
    parameters: [
      { name: 'orderNumber', type: 'string', required: true, description: 'Order number' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'assign_snag',
    description: 'Assign a snag to a worker.',
    category: 'Updates',
    parameters: [
      { name: 'id', type: 'string', required: true, description: 'Snag ID' },
      { name: 'workerName', type: 'string', required: true, description: 'Worker to assign' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'assign_tester',
    description: 'Assign a tester to a test.',
    category: 'Updates',
    parameters: [
      { name: 'testId', type: 'string', required: true, description: 'Test ID' },
      { name: 'testerName', type: 'string', required: true, description: 'Tester name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'assign_rams_to_job',
    description: 'Link a RAMS document to a job.',
    category: 'Updates',
    parameters: [
      { name: 'ramsTitle', type: 'string', required: true, description: 'RAMS title' },
      { name: 'jobTitle', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'add_document_to_job_pack',
    description: 'Add a document to a job pack.',
    category: 'Updates',
    parameters: [
      { name: 'jobPackTitle', type: 'string', required: true, description: 'Job pack title' },
      { name: 'documentType', type: 'string', required: true, description: 'Document type', enumValues: DOCUMENT_TYPES }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'update_employee_status',
    description: 'Update employee status (active/inactive).',
    category: 'Updates',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' },
      { name: 'status', type: 'string', required: true, description: 'New status', enumValues: ['Active', 'Inactive', 'On Leave'] }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'flag_delay',
    description: 'Flag a delay on a job.',
    category: 'Updates',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job title' },
      { name: 'reason', type: 'string', required: true, description: 'Delay reason' },
      { name: 'days', type: 'number', required: false, description: 'Days delayed' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'mark_briefing_attended',
    description: 'Mark a worker as having attended a briefing.',
    category: 'Updates',
    parameters: [
      { name: 'briefingTitle', type: 'string', required: true, description: 'Briefing title' },
      { name: 'workerName', type: 'string', required: true, description: 'Worker name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'archive_job',
    description: 'Archive a completed job.',
    category: 'Updates',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'duplicate_job',
    description: 'Duplicate a job to create a similar one.',
    category: 'Updates',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Job to duplicate' },
      { name: 'newTitle', type: 'string', required: false, description: 'New job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // COMMUNICATION (18 tools)
  // ============================================
  {
    name: 'send_quote',
    description: 'Email a quote to the client.',
    category: 'Communication',
    parameters: [
      { name: 'quoteNumber', type: 'string', required: true, description: 'Quote number to send' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'send_invoice',
    description: 'Email an invoice to the client.',
    category: 'Communication',
    parameters: [
      { name: 'invoiceNumber', type: 'string', required: true, description: 'Invoice number to send' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'email_worker',
    description: 'Send an email to a worker.',
    category: 'Communication',
    parameters: [
      { name: 'workerName', type: 'string', required: true, description: 'Worker name' },
      { name: 'subject', type: 'string', required: true, description: 'Email subject' },
      { name: 'message', type: 'string', required: true, description: 'Email message' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'send_worker_message',
    description: 'Send an in-app notification to a worker.',
    category: 'Communication',
    parameters: [
      { name: 'workerName', type: 'string', required: true, description: 'Worker name' },
      { name: 'message', type: 'string', required: true, description: 'Message content' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'send_team_message',
    description: 'Send a message to all workers on a job.',
    category: 'Communication',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job title' },
      { name: 'message', type: 'string', required: true, description: 'Message to send' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'send_job_update_to_client',
    description: 'Send a progress update to the client.',
    category: 'Communication',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job title' },
      { name: 'message', type: 'string', required: true, description: 'Update message' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'send_job_pack',
    description: 'Email a job pack to assigned workers.',
    category: 'Communication',
    parameters: [
      { name: 'jobPackTitle', type: 'string', required: true, description: 'Job pack title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'send_rams',
    description: 'Email RAMS to workers.',
    category: 'Communication',
    parameters: [
      { name: 'ramsTitle', type: 'string', required: true, description: 'RAMS title' },
      { name: 'workerName', type: 'string', required: false, description: 'Specific worker (optional)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'send_client_portal_invite',
    description: 'Send client portal access invite.',
    category: 'Communication',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job title' },
      { name: 'clientEmail', type: 'string', required: true, description: 'Client email' },
      { name: 'clientName', type: 'string', required: false, description: 'Client name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'share_photos_with_client',
    description: 'Share job photos with the client.',
    category: 'Communication',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'email_certificate',
    description: 'Email a test certificate.',
    category: 'Communication',
    parameters: [
      { name: 'certificateId', type: 'string', required: true, description: 'Certificate ID' },
      { name: 'email', type: 'string', required: false, description: 'Recipient email' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'send_training_reminder',
    description: 'Send training expiry reminder.',
    category: 'Communication',
    parameters: [
      { name: 'workerName', type: 'string', required: true, description: 'Worker name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'send_briefing_invite',
    description: 'Send briefing invite to workers.',
    category: 'Communication',
    parameters: [
      { name: 'briefingTitle', type: 'string', required: true, description: 'Briefing title' },
      { name: 'workers', type: 'string', required: false, description: 'Worker names (comma-separated)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'send_policy_for_acknowledgement',
    description: 'Send a policy for worker acknowledgement.',
    category: 'Communication',
    parameters: [
      { name: 'policyTitle', type: 'string', required: true, description: 'Policy title' },
      { name: 'workers', type: 'string', required: false, description: 'Worker names (all if not specified)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'share_elecid',
    description: 'Share an ElecID with external party.',
    category: 'Communication',
    parameters: [
      { name: 'workerName', type: 'string', required: true, description: 'Worker name' },
      { name: 'recipientEmail', type: 'string', required: true, description: 'Recipient email' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'initiate_call',
    description: 'Start a phone call to an employee or client.',
    category: 'Communication',
    parameters: [
      { name: 'phoneNumber', type: 'string', required: true, description: 'Phone number to call' }
    ],
    waitForResponse: false,
    disableInterruptions: false,
    executionMode: 'immediate'
  },
  {
    name: 'get_employee_phone',
    description: 'Get an employee\'s phone number before calling.',
    category: 'Communication',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Employee name' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_client_phone',
    description: 'Get a client\'s phone number.',
    category: 'Communication',
    parameters: [
      { name: 'client', type: 'string', required: false, description: 'Client name' },
      { name: 'jobTitle', type: 'string', required: false, description: 'Job to get client from' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // REPORTS (10 tools)
  // ============================================
  {
    name: 'generate_timesheet_report',
    description: 'Generate a timesheet report.',
    category: 'Reports',
    parameters: [
      { name: 'startDate', type: 'string', required: false, description: 'Report start date' },
      { name: 'endDate', type: 'string', required: false, description: 'Report end date' },
      { name: 'employeeName', type: 'string', required: false, description: 'Filter by employee' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'generate_job_report',
    description: 'Generate a job status report.',
    category: 'Reports',
    parameters: [
      { name: 'jobTitle', type: 'string', required: false, description: 'Specific job or all jobs' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'generate_financial_report',
    description: 'Generate a financial summary report.',
    category: 'Reports',
    parameters: [
      { name: 'period', type: 'string', required: false, description: 'Report period (week, month, quarter, year)' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'generate_safety_report',
    description: 'Generate a safety and incident report.',
    category: 'Reports',
    parameters: [
      { name: 'period', type: 'string', required: false, description: 'Report period' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'generate_snag_report',
    description: 'Generate a snag/quality report for a job.',
    category: 'Reports',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'generate_training_matrix',
    description: 'Generate a training matrix report.',
    category: 'Reports',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'generate_compliance_report',
    description: 'Generate a compliance status report.',
    category: 'Reports',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'generate_fleet_report',
    description: 'Generate a fleet status and costs report.',
    category: 'Reports',
    parameters: [
      { name: 'period', type: 'string', required: false, description: 'Report period' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'generate_tender_report',
    description: 'Generate a tender performance report.',
    category: 'Reports',
    parameters: [
      { name: 'period', type: 'string', required: false, description: 'Report period' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'export_data',
    description: 'Export data to CSV.',
    category: 'Reports',
    parameters: [
      { name: 'dataType', type: 'string', required: true, description: 'Data to export', enumValues: ['jobs', 'employees', 'timesheets', 'quotes', 'invoices', 'expenses'] }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // AI GENERATION (8 tools)
  // ============================================
  {
    name: 'generate_rams_ai',
    description: 'AI-generate RAMS from job description.',
    category: 'AI Generation',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job to generate RAMS for' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'generate_method_statement',
    description: 'AI-generate a method statement.',
    category: 'AI Generation',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'generate_briefing',
    description: 'AI-generate a briefing document.',
    category: 'AI Generation',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job title' },
      { name: 'topics', type: 'string', required: false, description: 'Specific topics to cover' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'generate_tender_estimate',
    description: 'AI-generate a tender cost estimate.',
    category: 'AI Generation',
    parameters: [
      { name: 'tenderTitle', type: 'string', required: true, description: 'Tender title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'expand_description',
    description: 'AI-expand a brief job description.',
    category: 'AI Generation',
    parameters: [
      { name: 'description', type: 'string', required: true, description: 'Brief description to expand' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'summarise_progress',
    description: 'AI-summarise job progress.',
    category: 'AI Generation',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job title' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'generate_quote_from_description',
    description: 'AI-generate quote line items from a description.',
    category: 'AI Generation',
    parameters: [
      { name: 'description', type: 'string', required: true, description: 'Work description' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'generate_test_certificate',
    description: 'Generate a test certificate.',
    category: 'AI Generation',
    parameters: [
      { name: 'jobTitle', type: 'string', required: true, description: 'Job title' },
      { name: 'testType', type: 'string', required: true, description: 'Type of test' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },

  // ============================================
  // AI QUOTE ADVISOR
  // ============================================
  {
    name: 'get_quote_suggestions',
    description: 'Get AI-powered suggestions for items to include in a quote based on the job type. Use this when the user describes a job they need to quote for, especially for complex jobs like office fit outs, rewires, or commercial installations. The AI will suggest commonly missed items, relevant BS 7671 regulations, and pricing guidance.',
    category: 'AI Quote Advisor',
    parameters: [
      { name: 'jobDescription', type: 'string', required: true, description: 'Description of the job type (e.g., "office fit out 200sqm", "domestic rewire 3-bed house", "consumer unit replacement")' },
      { name: 'itemsAlreadyAdded', type: 'string', required: false, description: 'Items already added to the quote, comma-separated' },
      { name: 'isCommercial', type: 'boolean', required: false, description: 'Whether this is a commercial job (affects regulations and complexity)' }
    ],
    waitForResponse: true,
    disableInterruptions: true,
    executionMode: 'wait'
  },

  // ============================================
  // PRICE BOOK LOOKUP (3 tools)
  // ============================================
  {
    name: 'lookup_price',
    description: 'Look up the price, stock level and margin for a material or product from the price book. Use this when users ask about prices, costs, or want to check material pricing.',
    category: 'Price Book',
    parameters: [
      { name: 'searchTerm', type: 'string', required: true, description: 'Material or product name to search for (e.g., "2.5mm twin and earth", "consumer unit", "LED downlight")' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'search_price_book_category',
    description: 'List all items in a price book category. Use this when users want to see what products are available in a category like cables, lighting, accessories, etc.',
    category: 'Price Book',
    parameters: [
      { name: 'category', type: 'string', required: true, description: 'Category name to search (e.g., "Cables", "Lighting", "Accessories", "Consumer Units")' }
    ],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  },
  {
    name: 'get_low_stock_items',
    description: 'Get a list of materials and products that are below their reorder level. Use when users ask what needs reordering or which items are low on stock.',
    category: 'Price Book',
    parameters: [],
    waitForResponse: true,
    disableInterruptions: false,
    executionMode: 'wait'
  }
];

// Helper functions
export const getToolsByCategory = (category: string): VoiceTool[] => {
  return voiceToolsRegistry.filter(t => t.category === category);
};

export const getCategories = (): string[] => {
  return [...new Set(voiceToolsRegistry.map(t => t.category))];
};

export const searchTools = (query: string): VoiceTool[] => {
  const q = query.toLowerCase();
  return voiceToolsRegistry.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q)
  );
};

export const getTotalToolCount = (): number => {
  return voiceToolsRegistry.length;
};

// Export for ElevenLabs format
export const formatToolForElevenLabs = (tool: VoiceTool): object => {
  return {
    name: tool.name,
    description: tool.description,
    parameters: tool.parameters.map(p => ({
      type: p.type,
      identifier: p.name,
      required: p.required,
      description: p.description,
      enum_values: p.enumValues || []
    })),
    wait_for_response: tool.waitForResponse,
    disable_interruptions: tool.disableInterruptions
  };
};

export const exportAllToolsJSON = (): string => {
  return JSON.stringify(voiceToolsRegistry.map(formatToolForElevenLabs), null, 2);
};
