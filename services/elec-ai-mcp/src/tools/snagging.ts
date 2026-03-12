/**
 * Snagging tools (4) — create_snag, read_snags, resolve_snag, generate_snagging_list
 * Photo-aware snagging with project integration, plus
 * certificate completeness checker that validates all required sections.
 */

import type { UserContext } from '../auth.js';
import { analysePhoto } from './vision.js';

interface SnagItem {
  section: string;
  field: string;
  issue: 'Missing' | 'Incomplete' | 'Empty';
  priority: 'high' | 'normal';
  suggestion: string;
}

/**
 * Check if a JSONB section is empty or missing.
 */
function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value as Record<string, unknown>).length === 0;
  return false;
}

/**
 * Check a required string field in the data object.
 */
function checkField(
  data: Record<string, unknown>,
  section: string,
  field: string,
  suggestion: string,
  priority: 'high' | 'normal' = 'normal'
): SnagItem | null {
  const value = data[field];
  if (isEmpty(value)) {
    return { section, field, issue: 'Missing', priority, suggestion };
  }
  return null;
}

/**
 * Check a nested section object.
 */
function checkSection(
  data: Record<string, unknown>,
  sectionKey: string,
  displayName: string,
  suggestion: string,
  priority: 'high' | 'normal' = 'normal'
): SnagItem | null {
  const value = data[sectionKey];
  if (isEmpty(value)) {
    return { section: displayName, field: sectionKey, issue: 'Empty', priority, suggestion };
  }
  return null;
}

/**
 * Validate EICR certificate data.
 */
function validateEicr(data: Record<string, unknown>): SnagItem[] {
  const snags: SnagItem[] = [];

  const checks: Array<SnagItem | null> = [
    checkField(data, 'Client', 'client_name', 'Add the client name', 'high'),
    checkField(data, 'Installation', 'installation_address', 'Add the installation address', 'high'),
    checkSection(data, 'supply', 'Supply', 'Complete supply characteristics (type, Ze, Zs)', 'high'),
    checkSection(data, 'earthing', 'Earthing', 'Specify earthing arrangement (TN-S, TN-C-S, TT)', 'high'),
    checkSection(data, 'boards', 'Boards', 'Add at least one distribution board', 'high'),
    checkSection(data, 'inspection', 'Inspection', 'Complete inspection items', 'high'),
    checkSection(data, 'testing', 'Testing', 'Add schedule of test results', 'high'),
    checkSection(data, 'defects', 'Defects', 'Review and record any defects found'),
  ];

  // Check inspector
  const inspector = data.inspector as Record<string, unknown> | undefined;
  if (!inspector || isEmpty(inspector) || !inspector.name) {
    snags.push({
      section: 'Inspector',
      field: 'inspector.name',
      issue: 'Missing',
      priority: 'high',
      suggestion: 'Add the inspector/engineer name',
    });
  }

  // Check company
  const company = data.company as Record<string, unknown> | undefined;
  if (!company || isEmpty(company) || !company.name) {
    snags.push({
      section: 'Company',
      field: 'company.name',
      issue: 'Missing',
      priority: 'normal',
      suggestion: 'Add the company/contractor details',
    });
  }

  // Check for specific supply fields
  const supply = data.supply as Record<string, unknown> | undefined;
  if (supply && !isEmpty(supply)) {
    if (isEmpty(supply.type_of_supply)) {
      snags.push({
        section: 'Supply',
        field: 'supply.type_of_supply',
        issue: 'Missing',
        priority: 'high',
        suggestion: 'Specify the type of supply (single-phase, three-phase)',
      });
    }
    if (isEmpty(supply.Ze)) {
      snags.push({
        section: 'Supply',
        field: 'supply.Ze',
        issue: 'Missing',
        priority: 'high',
        suggestion: 'Record the external earth fault loop impedance (Ze)',
      });
    }
  }

  for (const check of checks) {
    if (check) snags.push(check);
  }

  return snags;
}

/**
 * Validate EIC certificate data.
 */
function validateEic(data: Record<string, unknown>): SnagItem[] {
  const snags: SnagItem[] = [];

  const checks: Array<SnagItem | null> = [
    checkField(data, 'Client', 'client_name', 'Add the client name', 'high'),
    checkField(data, 'Installation', 'installation_address', 'Add the installation address', 'high'),
    checkSection(data, 'design', 'Design', 'Complete the design section', 'high'),
    checkSection(data, 'construction', 'Construction', 'Complete the construction section', 'high'),
    checkSection(data, 'inspection', 'Inspection', 'Complete the inspection section', 'high'),
    checkSection(data, 'testing', 'Testing', 'Complete the testing section', 'high'),
  ];

  // Schedule of circuits
  const circuits = data.schedule_of_circuits;
  if (!Array.isArray(circuits) || circuits.length === 0) {
    snags.push({
      section: 'Circuits',
      field: 'schedule_of_circuits',
      issue: 'Empty',
      priority: 'high',
      suggestion: 'Add at least one circuit to the schedule of circuits',
    });
  }

  // Inspector
  const inspector = data.inspector as Record<string, unknown> | undefined;
  if (!inspector || isEmpty(inspector) || !inspector.name) {
    snags.push({
      section: 'Inspector',
      field: 'inspector.name',
      issue: 'Missing',
      priority: 'high',
      suggestion: 'Add the designer/installer/inspector name',
    });
  }

  // Company
  const company = data.company as Record<string, unknown> | undefined;
  if (!company || isEmpty(company) || !company.name) {
    snags.push({
      section: 'Company',
      field: 'company.name',
      issue: 'Missing',
      priority: 'normal',
      suggestion: 'Add the company/contractor details',
    });
  }

  for (const check of checks) {
    if (check) snags.push(check);
  }

  return snags;
}

/**
 * Validate Minor Works certificate data.
 */
function validateMinorWorks(data: Record<string, unknown>): SnagItem[] {
  const snags: SnagItem[] = [];

  const checks: Array<SnagItem | null> = [
    checkField(data, 'Client', 'client_name', 'Add the client name', 'high'),
    checkField(data, 'Installation', 'installation_address', 'Add the installation address', 'high'),
    checkField(data, 'Description', 'description_of_work', 'Add a description of the work carried out', 'high'),
    checkSection(data, 'part_1_description', 'Part 1 — Description', 'Complete Part 1: Description of minor works', 'high'),
    checkSection(data, 'part_2_installation', 'Part 2 — Installation', 'Complete Part 2: Installation details', 'high'),
    checkSection(data, 'part_3_essential_tests', 'Part 3 — Essential Tests', 'Complete Part 3: Essential test results', 'high'),
    checkSection(data, 'part_4_declaration', 'Part 4 — Declaration', 'Complete Part 4: Declaration', 'high'),
  ];

  // Inspector
  const inspector = data.inspector as Record<string, unknown> | undefined;
  if (!inspector || isEmpty(inspector) || !inspector.name) {
    snags.push({
      section: 'Inspector',
      field: 'inspector.name',
      issue: 'Missing',
      priority: 'high',
      suggestion: 'Add the responsible person name',
    });
  }

  for (const check of checks) {
    if (check) snags.push(check);
  }

  return snags;
}

// ─── Severity → spark_tasks priority mapping ──────────────────────────
const SEVERITY_TO_PRIORITY: Record<string, string> = {
  low: 'low',
  normal: 'normal',
  high: 'high',
  critical: 'urgent',
};

/**
 * Infer severity from photo observations (C1/C2 → critical/high).
 */
function inferSeverityFromObservations(
  observations: Array<{ severity?: string }> | undefined
): string | null {
  if (!observations || observations.length === 0) return null;
  const hasC1 = observations.some((o) => o.severity === 'C1');
  if (hasC1) return 'critical';
  const hasC2 = observations.some((o) => o.severity === 'C2');
  if (hasC2) return 'high';
  return null;
}

/**
 * Create a snagging task on a project, optionally from a photo.
 */
export async function createSnag(args: Record<string, unknown>, user: UserContext) {
  const title = typeof args.title === 'string' ? args.title.trim() : '';
  if (!title) throw new Error('title is required');

  const supabase = user.supabase;
  const description = typeof args.description === 'string' ? args.description : '';
  const severity = typeof args.severity === 'string' ? args.severity : 'normal';
  const location = typeof args.location === 'string' ? args.location : null;
  const imageUrl = typeof args.image_url === 'string' ? args.image_url : null;
  const dueDate = typeof args.due_date === 'string' ? args.due_date : null;
  const customerId = typeof args.customer_id === 'string' ? args.customer_id : null;
  let projectId = typeof args.project_id === 'string' ? args.project_id : null;
  let photoAnalysisId =
    typeof args.photo_analysis_id === 'string' ? args.photo_analysis_id : null;

  // ── Photo analysis (if image provided without existing analysis) ────
  let enrichedDescription = description;
  let effectiveSeverity = severity;

  if (imageUrl && !photoAnalysisId) {
    const analysis = await analysePhoto(
      { image_url: imageUrl, context: `Snagging issue: ${title}`, tags: ['snagging'] },
      user
    );
    photoAnalysisId = analysis.photo_analysis_id || null;

    // Enrich description with AI summary
    if (analysis.summary) {
      enrichedDescription = enrichedDescription
        ? `${enrichedDescription}\n\nAI Analysis: ${analysis.summary}`
        : `AI Analysis: ${analysis.summary}`;
    }

    // Infer severity from observations if not explicitly set
    if (severity === 'normal') {
      const inferred = inferSeverityFromObservations(analysis.observations);
      if (inferred) effectiveSeverity = inferred;
    }
  }

  // ── Auto-create project if none provided ────────────────────────────
  if (!projectId) {
    const projectTitle = `Snagging — ${location || 'General'}`;
    const { data: newProject, error: projError } = await supabase
      .from('spark_projects')
      .insert({
        user_id: user.userId,
        title: projectTitle,
        status: 'open',
        priority: effectiveSeverity === 'critical' ? 'urgent' : 'normal',
        tags: ['snagging'],
      })
      .select('id')
      .single();

    if (projError) throw new Error(`Failed to create snagging project: ${projError.message}`);
    projectId = newProject.id;
  }

  // ── Create the snag task ────────────────────────────────────────────
  const priority = SEVERITY_TO_PRIORITY[effectiveSeverity] || 'normal';
  const taskPayload: Record<string, unknown> = {
    user_id: user.userId,
    project_id: projectId,
    title,
    details: enrichedDescription || null,
    priority,
    status: 'open',
    tags: ['snagging'],
  };
  if (location) taskPayload.location = location;
  if (dueDate) taskPayload.due_at = dueDate;
  if (customerId) taskPayload.customer_id = customerId;

  const { data: task, error: taskError } = await supabase
    .from('spark_tasks')
    .insert(taskPayload)
    .select('id')
    .single();

  if (taskError) throw new Error(`Failed to create snag task: ${taskError.message}`);

  // ── Link photo to project ──────────────────────────────────────────
  if (photoAnalysisId && projectId) {
    await supabase
      .from('photo_analyses')
      .update({ linked_project_id: projectId })
      .eq('id', photoAnalysisId);
  }

  return {
    snag_id: task.id,
    project_id: projectId,
    title,
    priority,
    photo_analysis_id: photoAnalysisId,
  };
}

/**
 * Read snagging items for a project (or all user snags).
 */
export async function readSnags(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const projectId = typeof args.project_id === 'string' ? args.project_id : null;
  const status = typeof args.status === 'string' ? args.status : null;
  const includePhotos = args.include_photos === true;

  // ── Query snag tasks ────────────────────────────────────────────────
  let query = supabase
    .from('spark_tasks')
    .select('id, title, details, priority, status, location, project_id, created_at, completed_at')
    .eq('user_id', user.userId)
    .contains('tags', ['snagging'])
    .order('created_at', { ascending: false });

  if (projectId) query = query.eq('project_id', projectId);
  if (status === 'open') query = query.neq('status', 'done');
  if (status === 'done') query = query.eq('status', 'done');

  const { data: tasks, error: taskError } = await query;
  if (taskError) throw new Error(`Failed to read snags: ${taskError.message}`);
  const snags = tasks || [];

  // ── Fetch photos per project (if requested) ─────────────────────────
  let photosByProject: Record<string, Array<Record<string, unknown>>> = {};
  if (includePhotos && snags.length > 0) {
    const projectIds = [...new Set(snags.map((t) => t.project_id).filter(Boolean))];
    if (projectIds.length > 0) {
      const { data: photos } = await supabase
        .from('photo_analyses')
        .select('id, image_url, ai_description, observations, tags, linked_project_id, created_at')
        .in('linked_project_id', projectIds)
        .eq('user_id', user.userId)
        .order('created_at', { ascending: false });

      for (const photo of photos || []) {
        const pid = photo.linked_project_id as string;
        if (!photosByProject[pid]) photosByProject[pid] = [];
        photosByProject[pid].push(photo);
      }
    }
  }

  // ── Build response ──────────────────────────────────────────────────
  const items = snags.map((t) => ({
    id: t.id,
    title: t.title,
    details: t.details,
    priority: t.priority,
    status: t.status,
    location: t.location || null,
    project_id: t.project_id,
    created_at: t.created_at,
    completed_at: t.completed_at,
    photos: includePhotos ? photosByProject[t.project_id] || [] : undefined,
  }));

  const total = snags.length;
  const open = snags.filter((t) => t.status !== 'done').length;
  const resolved = snags.filter((t) => t.status === 'done').length;
  const criticalCount = snags.filter(
    (t) => t.status !== 'done' && (t.priority === 'urgent' || t.priority === 'high')
  ).length;

  return {
    snags: items,
    summary: { total, open, resolved, critical_count: criticalCount },
  };
}

/**
 * Mark a snag as done, optionally with a completion photo.
 */
export async function resolveSnag(args: Record<string, unknown>, user: UserContext) {
  const snagId = typeof args.snag_id === 'string' ? args.snag_id : '';
  if (!snagId) throw new Error('snag_id is required');

  const supabase = user.supabase;
  const resolutionNotes = typeof args.resolution_notes === 'string' ? args.resolution_notes : null;
  const imageUrl = typeof args.image_url === 'string' ? args.image_url : null;

  // ── Validate it's a snagging task ──────────────────────────────────
  const { data: task, error: fetchError } = await supabase
    .from('spark_tasks')
    .select('id, tags, details, project_id')
    .eq('id', snagId)
    .eq('user_id', user.userId)
    .single();

  if (fetchError || !task) throw new Error('Snag not found');
  const tags = Array.isArray(task.tags) ? task.tags : [];
  if (!tags.includes('snagging')) throw new Error('Task is not a snagging item');

  // ── Append resolution notes ────────────────────────────────────────
  let updatedDetails = (task.details as string) || '';
  if (resolutionNotes) {
    updatedDetails += `\n\n--- Resolved ---\n${resolutionNotes}`;
  }

  const now = new Date().toISOString();
  const { error: updateError } = await supabase
    .from('spark_tasks')
    .update({ status: 'done', completed_at: now, details: updatedDetails })
    .eq('id', snagId);

  if (updateError) throw new Error(`Failed to resolve snag: ${updateError.message}`);

  // ── Completion photo ──────────────────────────────────────────────
  let completionPhotoId: string | null = null;
  if (imageUrl) {
    const analysis = await analysePhoto(
      {
        image_url: imageUrl,
        context: 'Completion photo — snag resolved',
        tags: ['snagging', 'completion'],
        linked_project_id: task.project_id || undefined,
      },
      user
    );
    completionPhotoId = analysis.photo_analysis_id || null;
  }

  return {
    snag_id: snagId,
    status: 'done',
    resolved_at: now,
    completion_photo_id: completionPhotoId,
  };
}

export async function generateSnaggingList(args: Record<string, unknown>, user: UserContext) {
  const certificateId = typeof args.certificate_id === 'string' ? args.certificate_id : null;
  const projectIdArg = typeof args.project_id === 'string' ? args.project_id : null;

  if (!certificateId && !projectIdArg) {
    throw new Error('At least one of certificate_id or project_id is required');
  }

  const supabase = user.supabase;
  const createTasks = args.create_tasks !== false; // default true

  // ── Fetch existing project snags (if project_id provided) ──────────
  let existingSnags: Array<Record<string, unknown>> = [];
  if (projectIdArg) {
    const { data: projectTasks } = await supabase
      .from('spark_tasks')
      .select('id, title, details, priority, status, location, created_at, completed_at')
      .eq('project_id', projectIdArg)
      .eq('user_id', user.userId)
      .contains('tags', ['snagging'])
      .order('created_at', { ascending: false });

    existingSnags = projectTasks || [];
  }

  // ── Project-only mode: return existing snags without cert validation ─
  if (!certificateId) {
    const open = existingSnags.filter((s) => s.status !== 'done').length;
    const resolved = existingSnags.filter((s) => s.status === 'done').length;
    const criticalCount = existingSnags.filter(
      (s) => s.status !== 'done' && (s.priority === 'urgent' || s.priority === 'high')
    ).length;

    return {
      certificate_id: null,
      certificate_number: null,
      report_type: null,
      status: null,
      total_snags: existingSnags.length,
      high_priority_count: criticalCount,
      snags: [],
      existing_snags: existingSnags,
      project_id: projectIdArg,
      tasks_created_count: 0,
      completeness_percentage: null,
      summary: { total: existingSnags.length, open, resolved, critical_count: criticalCount },
    };
  }

  // ── Certificate validation mode ────────────────────────────────────
  let projectId = projectIdArg;

  // 1. Fetch the report
  const { data: report, error: reportError } = await supabase
    .from('reports')
    .select('id, report_id, report_type, certificate_number, data, status, client_name, installation_address')
    .eq('id', certificateId)
    .single();

  if (reportError || !report) {
    throw new Error('Certificate not found');
  }

  const reportType = report.report_type as string;
  if (!['eicr', 'eic', 'minor-works'].includes(reportType)) {
    throw new Error(
      `Snagging list only supports eicr, eic, and minor-works. Got: ${reportType}`
    );
  }

  const data = (report.data as Record<string, unknown>) || {};

  // 2. Validate sections based on report type
  let snags: SnagItem[];
  switch (reportType) {
    case 'eicr':
      snags = validateEicr(data);
      break;
    case 'eic':
      snags = validateEic(data);
      break;
    case 'minor-works':
      snags = validateMinorWorks(data);
      break;
    default:
      snags = [];
  }

  // 3. Check for unresolved defects (EICR-specific)
  if (reportType === 'eicr') {
    const defectObservations = Array.isArray(data.defect_observations)
      ? data.defect_observations
      : [];

    for (const defect of defectObservations) {
      if (typeof defect !== 'object' || defect === null) continue;
      const d = defect as Record<string, unknown>;
      const severity = d.severity || d.code;
      const hasRemedial = !isEmpty(d.remedial_action) || !isEmpty(d.recommendation);

      if ((severity === 'C1' || severity === 'C2') && !hasRemedial) {
        snags.push({
          section: 'Defects',
          field: `defect_${d.id || 'unknown'}`,
          issue: 'Incomplete',
          priority: 'high',
          suggestion: `${severity} defect "${d.description || 'unnamed'}" has no remedial action recorded`,
        });
      }
    }
  }

  // Sort: high priority first
  snags.sort((a, b) => {
    if (a.priority === 'high' && b.priority !== 'high') return -1;
    if (a.priority !== 'high' && b.priority === 'high') return 1;
    return 0;
  });

  const highPriorityCount = snags.filter((s) => s.priority === 'high').length;

  // Calculate completeness (rough estimate based on required sections)
  const totalSections = reportType === 'eicr' ? 10 : reportType === 'eic' ? 9 : 8;
  const completeSections = totalSections - snags.length;
  const completenessPercentage = Math.max(
    0,
    Math.round((completeSections / totalSections) * 100)
  );

  // 4. Create tasks if requested
  let snaggingProjectId: string | null = projectId;
  let tasksCreatedCount = 0;

  if (createTasks && snags.length > 0) {
    // Create or use existing project
    if (!snaggingProjectId) {
      const certNumber = report.certificate_number || 'Unknown';
      const address = report.installation_address || 'Unknown address';

      const { data: newProject, error: projError } = await supabase
        .from('spark_projects')
        .insert({
          user_id: user.userId,
          title: `Snagging: ${certNumber} — ${address}`,
          status: 'open',
          priority: highPriorityCount > 0 ? 'high' : 'normal',
          tags: ['snagging', reportType],
        })
        .select('id')
        .single();

      if (projError) {
        console.error('Failed to create snagging project:', projError.message);
      } else {
        snaggingProjectId = newProject.id;
      }
    }

    if (snaggingProjectId) {
      // Create tasks for each snag
      const now = new Date();
      const tasksToInsert = snags.map((snag, index) => {
        const dueDate = new Date(now);
        dueDate.setDate(dueDate.getDate() + index + 1);

        return {
          user_id: user.userId,
          project_id: snaggingProjectId,
          title: `${snag.section}: ${snag.suggestion}`,
          details: `${snag.issue} — ${snag.field}\nCertificate: ${report.certificate_number}\nPriority: ${snag.priority}`,
          priority: snag.priority === 'high' ? 'high' : 'normal',
          status: 'open',
          due_at: dueDate.toISOString(),
          tags: ['snagging', reportType],
        };
      });

      const { error: taskError } = await supabase
        .from('spark_tasks')
        .insert(tasksToInsert);

      if (taskError) {
        console.error('Failed to create snagging tasks:', taskError.message);
      } else {
        tasksCreatedCount = tasksToInsert.length;
      }
    }
  }

  return {
    certificate_id: report.id,
    certificate_number: report.certificate_number,
    report_type: reportType,
    status: report.status,
    total_snags: snags.length,
    high_priority_count: highPriorityCount,
    snags,
    existing_snags: existingSnags,
    project_id: snaggingProjectId,
    tasks_created_count: tasksCreatedCount,
    completeness_percentage: completenessPercentage,
  };
}
