/**
 * Job Intake tool — create_job_intake
 * ELE-209: Turns a parsed job enquiry into a full project with trade-specific tasks.
 *
 * Flow: agent parses the enquiry → calls create_job_intake → gets back a project
 * with auto-generated tasks based on job type (from practical_work_intelligence RAG).
 *
 * The agent presents this to the electrician for approval before proceeding
 * with quoting, calendar booking, etc.
 */

import type { UserContext } from '../auth.js';

/**
 * Standard task sequences for common job types.
 * Used as a fallback when RAG doesn't return results for a given job type,
 * and as a template that RAG results enhance.
 */
const DEFAULT_TASK_SEQUENCES: Record<string, Array<{ title: string; details: string }>> = {
  'consumer unit upgrade': [
    { title: 'Isolate supply', details: 'Confirm isolation with voltage indicator' },
    {
      title: 'Test existing circuits',
      details: 'Zs, R1+R2, insulation resistance on all circuits',
    },
    { title: 'Remove old board', details: 'Document existing circuit arrangement before removal' },
    {
      title: 'Install new consumer unit + SPD',
      details: 'Mount, connect main switch, MCBs, RCBOs as required',
    },
    {
      title: 'Label all circuits',
      details: 'Clear circuit chart with descriptions matching regulation 514.9',
    },
    { title: 'Test all circuits', details: 'Full dead and live testing per BS 7671' },
    { title: 'Generate EIC', details: 'Electrical Installation Certificate for new installation' },
    {
      title: 'Submit Part P notification',
      details: 'Building control notification within 30 days',
    },
  ],
  eicr: [
    { title: 'Visual inspection', details: 'Check for damage, deterioration, non-compliance' },
    {
      title: 'Dead testing',
      details: 'Insulation resistance, continuity, polarity on all circuits',
    },
    { title: 'Live testing', details: 'Zs, Ze, PFC, RCD trip times on all circuits' },
    {
      title: 'Photograph defects',
      details: 'Photo evidence of any C1, C2, C3, or FI observations',
    },
    { title: 'Generate EICR', details: 'Complete Electrical Installation Condition Report' },
    {
      title: 'Deliver report to client',
      details: 'Send completed EICR with observations explained',
    },
  ],
  rewire: [
    {
      title: 'Survey and plan circuit layout',
      details: 'Document existing installation and plan new circuit arrangement',
    },
    { title: 'First fix wiring', details: 'Run all cables, mount back boxes, install containment' },
    { title: 'Install consumer unit', details: 'New CU with SPD, MCBs/RCBOs as designed' },
    { title: 'Second fix', details: 'Fit sockets, switches, light fittings, accessories' },
    { title: 'Testing', details: 'Full dead and live testing of all circuits per BS 7671' },
    { title: 'Generate EIC', details: 'Electrical Installation Certificate' },
    {
      title: 'Submit Part P notification',
      details: 'Building control notification within 30 days',
    },
    { title: 'Client handover', details: 'Walk-through with client, handover documentation' },
  ],
  'ev charger': [
    { title: 'Site survey', details: 'Assess supply capacity, cable route, mounting position' },
    { title: 'DNO notification', details: 'Notify DNO if required (>3.68kW single phase)' },
    {
      title: 'Install cable and containment',
      details: 'Run SWA or equivalent from CU to charger location',
    },
    {
      title: 'Mount and connect charger',
      details: 'Install charger unit, connect supply and earth',
    },
    { title: 'Testing', details: 'Full testing including earth fault loop, RCD, insulation' },
    { title: 'Generate EIC', details: 'Electrical Installation Certificate for EV charging point' },
    { title: 'Submit Part P notification', details: 'Building control notification' },
    { title: 'Register with OZEV', details: 'Complete grant paperwork if applicable' },
  ],
  'fire alarm': [
    { title: 'Survey and design', details: 'Zone plan, detector placement per BS 5839' },
    {
      title: 'First fix',
      details: 'Run cables, mount back boxes for detectors, sounders, call points',
    },
    { title: 'Second fix', details: 'Install detectors, sounders, call points, panel' },
    { title: 'Commission system', details: 'Programme panel, test all zones, verify sound levels' },
    { title: 'Generate fire alarm certificate', details: 'BS 5839 commissioning certificate' },
    {
      title: 'Client handover',
      details: 'Demonstrate system, hand over log book and documentation',
    },
  ],
  'lighting installation': [
    {
      title: 'Agree lighting plan',
      details: 'Confirm fixture positions, switch locations, dimming requirements',
    },
    { title: 'First fix', details: 'Run cables, mount ceiling roses or recessed housings' },
    { title: 'Second fix', details: 'Install fittings, switches, dimmers' },
    { title: 'Testing', details: 'Circuit testing per BS 7671' },
    {
      title: 'Generate minor works certificate',
      details: 'Minor Electrical Installation Works Certificate',
    },
  ],
  'fault finding': [
    { title: 'Initial assessment', details: 'Discuss symptoms, check obvious causes' },
    { title: 'Testing and diagnosis', details: 'Systematic testing to locate fault' },
    { title: 'Repair', details: 'Fix identified fault' },
    { title: 'Verification testing', details: 'Confirm repair, test affected circuits' },
    {
      title: 'Generate minor works certificate',
      details: 'If applicable — minor works cert for the repair',
    },
  ],
  'socket installation': [
    {
      title: 'Plan circuit extension',
      details: 'Confirm socket position, cable route, circuit capacity',
    },
    {
      title: 'Install cable and back box',
      details: 'Run cable from existing circuit or new way in CU',
    },
    { title: 'Fit socket and connect', details: 'Wire socket, secure to back box' },
    { title: 'Testing', details: 'Continuity, insulation, Zs, polarity, RCD' },
    {
      title: 'Generate minor works certificate',
      details: 'Minor Electrical Installation Works Certificate',
    },
  ],
};

/**
 * Normalise a job type string to match our default sequences.
 * e.g. "CU change" → "consumer unit upgrade", "full rewire" → "rewire"
 */
function normaliseJobType(input: string): string {
  const lower = input.toLowerCase().trim();

  // CU variants
  if (/\b(cu|consumer\s*unit|fuse\s*board|fuse\s*box|db|distribution\s*board)\b/.test(lower)) {
    return 'consumer unit upgrade';
  }
  // EICR variants
  if (/\b(eicr|condition\s*report|periodic\s*inspection|pir)\b/.test(lower)) {
    return 'eicr';
  }
  // Rewire variants
  if (/\b(rewire|re-wire|full\s*rewire)\b/.test(lower)) {
    return 'rewire';
  }
  // EV variants
  if (
    /\b(ev\s*charg|electric\s*vehicle|car\s*charg|wallbox|wall\s*box|zappi|pod\s*point)\b/.test(
      lower
    )
  ) {
    return 'ev charger';
  }
  // Fire alarm
  if (/\b(fire\s*alarm|smoke\s*detect|fire\s*detect)\b/.test(lower)) {
    return 'fire alarm';
  }
  // Lighting
  if (/\b(light|lighting|downlight|spot\s*light|led)\b/.test(lower)) {
    return 'lighting installation';
  }
  // Fault finding
  if (/\b(fault|tripping|no\s*power|lost\s*power|keeps\s*tripping)\b/.test(lower)) {
    return 'fault finding';
  }
  // Socket
  if (/\b(socket|plug|outlet|spur)\b/.test(lower)) {
    return 'socket installation';
  }

  return lower;
}

export async function createJobIntake(args: Record<string, unknown>, user: UserContext) {
  // ── Validate inputs ──────────────────────────────────────────────────
  if (typeof args.job_type !== 'string' || args.job_type.trim().length === 0) {
    throw new Error(
      'job_type is required (e.g. "consumer unit upgrade", "EICR", "rewire", "EV charger")'
    );
  }

  const supabase = user.supabase;
  const rawJobType = args.job_type.trim();
  const normalisedType = normaliseJobType(rawJobType);

  // ── Step 1: Query RAG for trade-specific task sequence ────────────────
  let ragTasks: Array<{ title: string; details: string }> = [];
  try {
    const { data, error } = await supabase.rpc('search_practical_work_fast', {
      search_query: `${rawJobType} installation steps procedure`,
      result_limit: 3,
      category_filter: null,
    });

    if (!error && data && data.length > 0) {
      // Extract step-by-step procedures from RAG results
      for (const result of data) {
        const content = (result.content || result.text || '') as string;
        // Look for numbered steps or bullet points
        const steps = content
          .split(/\n/)
          .filter((line: string) => /^\s*[\d•\-*]/.test(line))
          .map((line: string) => line.replace(/^\s*[\d•\-*.)]+\s*/, '').trim())
          .filter((line: string) => line.length > 5 && line.length < 200);

        if (steps.length > 0) {
          ragTasks = steps.map((step: string) => ({ title: step, details: '' }));
          break;
        }
      }
    }
  } catch {
    // RAG lookup failed — fall through to defaults
  }

  // ── Step 2: Build task list (RAG or defaults) ────────────────────────
  const defaultTasks = DEFAULT_TASK_SEQUENCES[normalisedType];
  const tasks = ragTasks.length >= 3 ? ragTasks : defaultTasks || [];

  // If we still have no tasks, create a generic sequence
  const finalTasks =
    tasks.length > 0
      ? tasks
      : [
          { title: 'Site survey and assessment', details: 'Assess scope, access, requirements' },
          { title: 'Prepare materials', details: 'Source and collect required materials' },
          { title: 'Carry out work', details: rawJobType },
          { title: 'Testing and verification', details: 'Test completed work per BS 7671' },
          { title: 'Generate certificate', details: 'Appropriate certificate for the work done' },
          { title: 'Client handover', details: 'Present certificate and explain work completed' },
        ];

  // ── Step 3: Create the project ────────────────────────────────────────
  const projectTitle =
    typeof args.title === 'string' && args.title.trim().length > 0
      ? args.title.trim()
      : `${rawJobType.charAt(0).toUpperCase() + rawJobType.slice(1)}${typeof args.address === 'string' ? ` — ${args.address.trim()}` : ''}`;

  const startDate = typeof args.start_date === 'string' ? args.start_date : null;
  const source =
    typeof args.source === 'string' &&
    ['whatsapp_forward', 'app', 'email', 'phone'].includes(args.source)
      ? args.source
      : 'whatsapp_forward';

  const { data: project, error: projectError } = await supabase
    .from('spark_projects')
    .insert({
      user_id: user.userId,
      title: projectTitle,
      description:
        typeof args.description === 'string'
          ? args.description.trim()
          : `Job intake: ${rawJobType}`,
      priority: typeof args.urgency === 'string' && args.urgency === 'urgent' ? 'urgent' : 'normal',
      status: 'open',
      location: typeof args.address === 'string' ? args.address.trim() : null,
      customer_id: typeof args.customer_id === 'string' ? args.customer_id : null,
      estimated_value:
        typeof args.estimated_value === 'number' && args.estimated_value >= 0
          ? args.estimated_value
          : null,
      start_date: startDate,
      due_date: typeof args.due_date === 'string' ? args.due_date : null,
      source,
      tags: ['job-intake', normalisedType.replace(/\s+/g, '-')],
    })
    .select('id, title, status, priority')
    .single();

  if (projectError) throw new Error(`Failed to create project: ${projectError.message}`);

  // ── Step 4: Create tasks linked to the project ────────────────────────
  const baseDate = startDate ? new Date(startDate) : new Date();
  baseDate.setHours(8, 0, 0, 0);

  const taskRows = finalTasks.map((t, index) => {
    const taskDate = new Date(baseDate.getTime());
    taskDate.setDate(taskDate.getDate() + index);

    return {
      user_id: user.userId,
      project_id: project.id,
      title: t.title,
      details: t.details || null,
      priority: 'normal',
      status: 'open',
      due_at: taskDate.toISOString(),
      location: typeof args.address === 'string' ? args.address.trim() : null,
      customer_id: typeof args.customer_id === 'string' ? args.customer_id : null,
      tags: [normalisedType.replace(/\s+/g, '-')],
    };
  });

  const { error: taskError } = await supabase.from('spark_tasks').insert(taskRows);
  if (taskError)
    throw new Error(`Project created but failed to create tasks: ${taskError.message}`);

  // ── Step 5: Create site visit calendar event (if date provided) ───────
  let calendarEvent = null;
  if (typeof args.site_visit_date === 'string' && typeof args.site_visit_time === 'string') {
    const visitStart = new Date(`${args.site_visit_date}T${args.site_visit_time}:00`);
    if (!isNaN(visitStart.getTime())) {
      const durationMinutes =
        typeof args.site_visit_duration === 'number' && args.site_visit_duration > 0
          ? args.site_visit_duration
          : 60;
      const visitEnd = new Date(visitStart.getTime() + durationMinutes * 60 * 1000);

      const { data: event, error: eventError } = await supabase
        .from('calendar_events')
        .insert({
          user_id: user.userId,
          title: `Site visit: ${projectTitle}`,
          description: `Job intake — ${rawJobType}`,
          start_at: visitStart.toISOString(),
          end_at: visitEnd.toISOString(),
          all_day: false,
          location: typeof args.address === 'string' ? args.address.trim() : null,
          client_id: typeof args.customer_id === 'string' ? args.customer_id : null,
          event_type: 'site_visit',
          colour: '#10B981',
          sync_status: 'local_only',
          reminder_minutes: 30,
        })
        .select('id, title, start_at, end_at, location')
        .single();

      if (!eventError && event) {
        calendarEvent = event;
      }
    }
  }

  // ── Build response ────────────────────────────────────────────────────
  return {
    project_id: project.id,
    project_title: project.title,
    job_type: rawJobType,
    normalised_type: normalisedType,
    source,
    tasks_created: taskRows.length,
    task_list: finalTasks.map((t, i) => ({
      step: i + 1,
      title: t.title,
      details: t.details,
    })),
    calendar_event: calendarEvent
      ? {
          event_id: calendarEvent.id,
          title: calendarEvent.title,
          start_at: calendarEvent.start_at,
          end_at: calendarEvent.end_at,
          location: calendarEvent.location,
        }
      : null,
    rag_enhanced: ragTasks.length >= 3,
    next_steps: [
      'Present task list to electrician for approval',
      'Generate quote if pricing discussed',
      'Schedule site visit if not already booked',
      'Link quote and certificate to this project once created',
    ],
  };
}
