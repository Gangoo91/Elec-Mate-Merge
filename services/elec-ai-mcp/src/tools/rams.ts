/**
 * RAMS & Compliance tools — create_rams, generate_rams_pdf, generate_method_statement,
 *                           submit_part_p_notification
 *
 * createRams: triggers the full app pipeline (create-rams-job → generate-rams orchestrator)
 *             with both H&S Agent + Install Planner running in parallel, all caching layers
 * generateRamsPdf: calls generate-combined-rams-pdf edge function (PDFMonkey template 5EE6A088)
 * generateMethodStatement: calls health-safety-v3 directly for method statement content
 */

import type { UserContext } from '../auth.js';
import { callEdgeFunction } from '../lib/edge-function.js';

/** Poll interval and timeout for RAMS job completion */
const POLL_INTERVAL_MS = 5_000;
const POLL_TIMEOUT_MS = 180_000;

export async function readRams(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  let query = supabase
    .from('rams_generation_jobs')
    .select('id, status, progress, project_info, error_message, created_at, updated_at')
    .eq('user_id', user.userId);

  if (typeof args.status === 'string' && args.status.length > 0) {
    query = query.eq('status', args.status);
  }
  if (typeof args.date_from === 'string') {
    query = query.gte('created_at', args.date_from);
  }
  if (typeof args.date_to === 'string') {
    query = query.lte('created_at', args.date_to);
  }
  if (typeof args.search === 'string' && args.search.length > 0) {
    const term = args.search.replace(/[,.()"'\\]/g, '');
    query = query.ilike('project_info->>projectName', `%${term}%`);
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 50) : 50;

  const { data, error } = await query.order('created_at', { ascending: false }).limit(limit);

  if (error) throw new Error(`Failed to read RAMS: ${error.message}`);

  return { items: data || [], count: (data || []).length };
}

export async function createRams(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.job_description !== 'string' || args.job_description.trim().length === 0) {
    throw new Error('job_description is required');
  }
  if (typeof args.job_type !== 'string' || args.job_type.trim().length === 0) {
    throw new Error('job_type is required');
  }
  if (typeof args.location !== 'string' || args.location.trim().length === 0) {
    throw new Error('location is required');
  }

  const supabase = user.supabase;

  // 1. Fetch user's name for assessor field
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.userId)
    .single();

  const assessorName = profile?.full_name || 'Not specified';

  // 2. Build projectInfo from args (matching create-rams-job expected input)
  const projectInfo: Record<string, unknown> = {
    projectName:
      typeof args.project_name === 'string'
        ? args.project_name
        : `${args.job_type} - ${args.location}`,
    location: args.location,
    assessor: assessorName,
    contractor: typeof args.contractor === 'string' ? args.contractor : assessorName,
    supervisor: typeof args.supervisor === 'string' ? args.supervisor : undefined,
  };

  const jobScale =
    typeof args.job_scale === 'string' &&
    ['domestic', 'commercial', 'industrial'].includes(args.job_scale)
      ? args.job_scale
      : 'domestic';

  // 3. Call create-rams-job edge function → creates job + fires generate-rams in background
  const createResult = await callEdgeFunction(
    'create-rams-job',
    user.jwt,
    {
      jobDescription: args.job_description,
      projectInfo,
      jobScale,
    },
    { timeoutMs: 30_000 }
  );

  if (createResult.error) throw new Error(createResult.error);

  const createData = createResult.data as Record<string, unknown> | null;
  const jobId = createData?.jobId as string | undefined;
  if (!jobId) throw new Error('Failed to create RAMS job — no jobId returned');

  // 4. Poll rams_generation_jobs table until complete/partial/failed
  const startTime = Date.now();

  while (Date.now() - startTime < POLL_TIMEOUT_MS) {
    await sleep(POLL_INTERVAL_MS);

    const { data: job, error: pollError } = await supabase
      .from('rams_generation_jobs')
      .select(
        'status, progress, hs_agent_progress, installer_agent_progress, rams_data, method_data, error_message'
      )
      .eq('id', jobId)
      .single();

    if (pollError) {
      throw new Error(`Failed to poll RAMS job: ${pollError.message}`);
    }

    if (!job) throw new Error('RAMS job not found');

    const status = job.status as string;

    if (status === 'complete' || status === 'partial') {
      // Extract summary data from the completed job
      const ramsData = (job.rams_data as Record<string, unknown>) || {};
      const methodData = (job.method_data as Record<string, unknown>) || {};

      const risks = Array.isArray(ramsData.risks) ? ramsData.risks : [];
      const steps = Array.isArray(methodData.steps) ? methodData.steps : [];

      const topRisks = risks
        .slice(0, 5)
        .map((r: Record<string, unknown>) =>
          typeof r.hazard === 'string' ? r.hazard : 'Unknown hazard'
        );

      const ppeItems = Array.isArray(ramsData.ppeDetails) ? ramsData.ppeDetails : [];
      const ppeRequired = ppeItems.map((p: Record<string, unknown>) =>
        typeof p === 'string' ? p : ((p.ppeType ?? p.item ?? p.name ?? JSON.stringify(p)) as string)
      );

      const statusNote =
        status === 'partial'
          ? ' (partial — one agent may have failed, but usable data was generated)'
          : '';

      return {
        rams_job_id: jobId,
        status,
        hazard_count: risks.length,
        top_risks: topRisks,
        method_step_count: steps.length,
        ppe_required: ppeRequired,
        message: `RAMS generated with ${risks.length} hazards and ${steps.length} method steps${statusNote}. Call generate_rams_pdf to create the PDF.`,
      };
    }

    if (status === 'failed') {
      const errorMsg = (job.error_message as string) || 'Unknown error';
      throw new Error(`RAMS generation failed: ${errorMsg}`);
    }

    // Still processing — continue polling
  }

  // Timeout reached
  throw new Error(
    `RAMS generation timed out after ${POLL_TIMEOUT_MS / 1000}s. The job (${jobId}) may still be processing — try again in a minute.`
  );
}

export async function generateRamsPdf(args: Record<string, unknown>, user: UserContext) {
  const jobId = args.rams_job_id;
  if (typeof jobId !== 'string' || jobId.trim().length === 0) {
    throw new Error('rams_job_id is required (from create_rams result)');
  }

  const supabase = user.supabase;

  // 1. Fetch the completed RAMS job data
  const { data: job, error: fetchError } = await supabase
    .from('rams_generation_jobs')
    .select('rams_data, method_data, project_info, user_id, status')
    .eq('id', jobId)
    .single();

  if (fetchError) throw new Error(`Failed to fetch RAMS job: ${fetchError.message}`);
  if (!job) throw new Error('RAMS job not found');
  if (job.status !== 'complete' && job.status !== 'partial') {
    throw new Error(`RAMS job is not complete (status: ${job.status}). Run create_rams first.`);
  }

  const ramsRaw = (job.rams_data as Record<string, unknown>) || {};
  const methodRaw = (job.method_data as Record<string, unknown>) || {};
  const projectInfo = (job.project_info as Record<string, unknown>) || {};

  // 2. Map to the format generate-combined-rams-pdf (PDFMonkey) expects
  //    The edge function expects { ramsData, methodData } matching the app's data shape
  const ramsData = {
    projectName: projectInfo.projectName || ramsRaw.projectName || 'Untitled Project',
    location: projectInfo.location || ramsRaw.location || '',
    date: ramsRaw.date || new Date().toISOString().split('T')[0],
    assessor: projectInfo.assessor || ramsRaw.assessor || '',
    contractor: projectInfo.contractor || ramsRaw.contractor || '',
    supervisor: projectInfo.supervisor || ramsRaw.supervisor || '',
    risks: Array.isArray(ramsRaw.risks) ? ramsRaw.risks : [],
    requiredPPE: Array.isArray(ramsRaw.requiredPPE) ? ramsRaw.requiredPPE : [],
    ppeDetails: Array.isArray(ramsRaw.ppeDetails) ? ramsRaw.ppeDetails : [],
    emergencyProcedures: Array.isArray(ramsRaw.emergencyProcedures)
      ? ramsRaw.emergencyProcedures
      : [],
    siteManagerName: ramsRaw.siteManagerName || '',
    siteManagerPhone: ramsRaw.siteManagerPhone || '',
    firstAiderName: ramsRaw.firstAiderName || '',
    firstAiderPhone: ramsRaw.firstAiderPhone || '',
    safetyOfficerName: ramsRaw.safetyOfficerName || '',
    safetyOfficerPhone: ramsRaw.safetyOfficerPhone || '',
    assemblyPoint: ramsRaw.assemblyPoint || '',
  };

  const methodData = {
    jobTitle: methodRaw.jobTitle || ramsData.projectName,
    location: methodRaw.location || ramsData.location,
    contractor: methodRaw.contractor || ramsData.contractor,
    supervisor: methodRaw.supervisor || ramsData.supervisor,
    workType: methodRaw.workType || '',
    duration: methodRaw.duration || '',
    teamSize: methodRaw.teamSize || '',
    description: methodRaw.description || '',
    overallRiskLevel: methodRaw.overallRiskLevel || 'medium',
    reviewDate: methodRaw.reviewDate || '',
    steps: Array.isArray(methodRaw.steps) ? methodRaw.steps : [],
    practicalTips: Array.isArray(methodRaw.practicalTips) ? methodRaw.practicalTips : [],
    commonMistakes: Array.isArray(methodRaw.commonMistakes) ? methodRaw.commonMistakes : [],
    toolsRequired: Array.isArray(methodRaw.toolsRequired) ? methodRaw.toolsRequired : [],
    materialsRequired: Array.isArray(methodRaw.materialsRequired)
      ? methodRaw.materialsRequired
      : [],
    totalEstimatedTime: methodRaw.totalEstimatedTime || '',
    difficultyLevel: methodRaw.difficultyLevel || '',
    complianceRegulations: Array.isArray(methodRaw.complianceRegulations)
      ? methodRaw.complianceRegulations
      : [],
    complianceWarnings: Array.isArray(methodRaw.complianceWarnings)
      ? methodRaw.complianceWarnings
      : [],
    requiredQualifications: Array.isArray(methodRaw.requiredQualifications)
      ? methodRaw.requiredQualifications
      : [],
    // Emergency contacts can also come from method data
    siteManagerName: methodRaw.siteManagerName || '',
    siteManagerPhone: methodRaw.siteManagerPhone || '',
    firstAiderName: methodRaw.firstAiderName || '',
    firstAiderPhone: methodRaw.firstAiderPhone || '',
    safetyOfficerName: methodRaw.safetyOfficerName || '',
    safetyOfficerPhone: methodRaw.safetyOfficerPhone || '',
    assemblyPoint: methodRaw.assemblyPoint || '',
  };

  // 3. Call generate-combined-rams-pdf (PDFMonkey template 5EE6A088)
  const result = await callEdgeFunction(
    'generate-combined-rams-pdf',
    user.jwt,
    { ramsData, methodData },
    { timeoutMs: 90_000 }
  );

  if (result.error) throw new Error(result.error);

  const pdfData = result.data as Record<string, unknown> | null;

  // PDFMonkey edge function returns { success, downloadUrl, documentId, status }
  // or { success: false, useFallback: true, message }
  if (pdfData?.useFallback) {
    throw new Error(`PDF generation unavailable: ${pdfData.message || 'PDFMonkey not configured'}`);
  }

  const downloadUrl = pdfData?.downloadUrl as string | undefined;
  if (!downloadUrl) {
    throw new Error('PDF generation failed — no download URL returned');
  }

  const projectName = String(ramsData.projectName || 'Document').replace(/[^a-z0-9]/gi, '_');

  return {
    downloadUrl,
    fileName: `Combined_RAMS_${projectName}.pdf`,
    rams_job_id: jobId,
    message: `Combined RAMS PDF generated. Share this link or use MEDIA:${downloadUrl} to send as a document.`,
  };
}

export async function generateMethodStatement(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.task_description !== 'string' || args.task_description.trim().length === 0) {
    throw new Error('task_description is required');
  }
  if (typeof args.location !== 'string' || args.location.trim().length === 0) {
    throw new Error('location is required');
  }

  // Call health-safety-v3 directly for method statement content — 150s timeout
  const result = await callEdgeFunction(
    'health-safety-v3',
    user.jwt,
    {
      query: args.task_description,
      workType: 'method_statement',
      location: args.location,
      equipment: Array.isArray(args.equipment) ? args.equipment : undefined,
      sequenceOfWorks: Array.isArray(args.sequence_of_works) ? args.sequence_of_works : undefined,
    },
    { timeoutMs: 150_000 }
  );

  if (result.error) throw new Error(result.error);
  return result.data;
}

export async function submitPartPNotification(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.certificate_id !== 'string') {
    throw new Error('certificate_id is required');
  }
  if (typeof args.work_type !== 'string') {
    throw new Error('work_type is required');
  }
  if (typeof args.property_address !== 'string') {
    throw new Error('property_address is required');
  }
  if (typeof args.work_description !== 'string') {
    throw new Error('work_description is required');
  }
  if (typeof args.completion_date !== 'string') {
    throw new Error('completion_date is required');
  }

  const result = await callEdgeFunction('submit-part-p-notification', user.jwt, {
    certificate_id: args.certificate_id,
    work_type: args.work_type,
    property_address: args.property_address,
    work_description: args.work_description,
    completion_date: args.completion_date,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}

// ─── Helpers ─────────────────────────────────────────────────────────────

/** Simple sleep helper for polling */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
