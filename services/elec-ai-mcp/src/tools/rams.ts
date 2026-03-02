/**
 * RAMS & Compliance tools — create_rams, generate_rams_pdf, generate_method_statement,
 *                           submit_part_p_notification
 *
 * createRams: calls health-safety-v3 DIRECTLY (sync), saves to rams_documents table
 * generateRamsPdf: fetches from DB, maps to edge function format, calls generate-rams-pdf
 * generateMethodStatement: calls health-safety-v3 directly for method statement content
 */

import type { UserContext } from '../auth.js';
import { callEdgeFunction } from '../lib/edge-function.js';

export async function createRams(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.job_description !== 'string' || args.job_description.trim().length === 0) {
    throw new Error('job_description is required');
  }
  if (typeof args.job_type !== 'string' || args.job_type.trim().length === 0) {
    throw new Error('job_type is required');
  }
  if (typeof args.address !== 'string' || args.address.trim().length === 0) {
    throw new Error('address is required');
  }

  const supabase = user.supabase;

  // 1. Call health-safety-v3 DIRECTLY (sync) — 150s timeout
  // health-safety-v3 expects: query (required), workType, location, hazards
  const aiResult = await callEdgeFunction(
    'health-safety-v3',
    user.jwt,
    {
      query: args.job_description,
      workType: args.job_type,
      location: args.address,
      hazards: Array.isArray(args.hazards) ? args.hazards : undefined,
    },
    { timeoutMs: 150_000 }
  );

  if (aiResult.error) throw new Error(aiResult.error);

  const aiData = aiResult.data as Record<string, unknown> | null;
  if (!aiData) throw new Error('No response from health & safety AI');

  // 2. Extract hazards, PPE, emergency procedures from AI response
  const risks = extractRisks(aiData);
  const ppeDetails = extractPpe(aiData);
  const emergencyContacts = extractEmergencyContacts(aiData);

  // 3. Fetch user's name for assessor field
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.userId)
    .single();

  const assessorName = profile?.full_name || 'Not specified';

  // 4. Save to rams_documents table
  const { data: ramsDoc, error: insertError } = await supabase
    .from('rams_documents')
    .insert({
      user_id: user.userId,
      project_name: `${args.job_type} - ${args.address}`,
      location: args.address,
      date: new Date().toISOString().split('T')[0],
      assessor: assessorName,
      risks,
      ppe_details: ppeDetails,
      status: 'generated',
      ai_generation_metadata: {
        source: 'health-safety-v3',
        generatedAt: new Date().toISOString(),
        jobDescription: args.job_description,
        jobType: args.job_type,
        emergencyContacts,
        rawResponse: aiData,
      },
    })
    .select('id')
    .single();

  if (insertError) throw new Error(`Failed to save RAMS: ${insertError.message}`);

  // 5. Return structured result for agent
  const topRisks = risks
    .slice(0, 5)
    .map((r: Record<string, unknown>) =>
      typeof r.hazard === 'string' ? r.hazard : 'Unknown hazard'
    );
  const ppeRequired = Array.isArray(ppeDetails)
    ? ppeDetails.map((p: Record<string, unknown>) =>
        typeof p === 'string'
          ? p
          : ((p.item ?? p.name ?? p.equipment ?? JSON.stringify(p)) as string)
      )
    : [];

  return {
    rams_id: ramsDoc.id,
    hazard_count: risks.length,
    top_risks: topRisks,
    ppe_required: ppeRequired,
    status: 'generated',
    message: `RAMS generated with ${risks.length} hazards identified. Call generate_rams_pdf to create the PDF.`,
  };
}

export async function generateRamsPdf(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.rams_id !== 'string') {
    throw new Error('rams_id is required');
  }

  const supabase = user.supabase;

  // 1. Fetch rams_documents row by ID
  const { data: ramsDoc, error: fetchError } = await supabase
    .from('rams_documents')
    .select('*')
    .eq('id', args.rams_id)
    .single();

  if (fetchError || !ramsDoc) {
    throw new Error('RAMS document not found');
  }

  // 2. Map DB fields to edge function format
  const risks = Array.isArray(ramsDoc.risks) ? ramsDoc.risks : [];
  const metadata = (ramsDoc.ai_generation_metadata as Record<string, unknown>) || {};
  const emergencyContacts = (metadata.emergencyContacts as Record<string, unknown>) || {};

  const ramsData = {
    projectName: ramsDoc.project_name || 'Untitled Project',
    location: ramsDoc.location || '',
    date: ramsDoc.date || new Date().toISOString().split('T')[0],
    assessor: ramsDoc.assessor || 'Not specified',
    risks: risks.map((r: Record<string, unknown>) => ({
      hazard: r.hazard || r.description || 'Unknown',
      likelihood: r.likelihood || 'Medium',
      severity: r.severity || 'Medium',
      riskRating: r.riskRating || r.risk_rating || 'Medium',
      controls: r.controls || r.control_measures || 'Standard controls apply',
      residualRisk: r.residualRisk || r.residual_risk || 'Low',
    })),
    siteManagerName: (emergencyContacts.siteManagerName as string) || 'Site Manager',
    siteManagerPhone: (emergencyContacts.siteManagerPhone as string) || 'N/A',
    emergencyServices: '999',
    nearestHospital: (emergencyContacts.nearestHospital as string) || 'Nearest A&E',
    assemblyPoint: (emergencyContacts.assemblyPoint as string) || 'Front of building',
  };

  // 3. Call generate-rams-pdf — 90s timeout (PDFMonkey polls until ready)
  const result = await callEdgeFunction(
    'generate-rams-pdf',
    user.jwt,
    {
      ramsData,
      userId: user.userId,
    },
    { timeoutMs: 90_000 }
  );

  if (result.error) throw new Error(result.error);

  const pdfData = result.data as Record<string, unknown> | null;
  const pdfMonkeyUrl = pdfData?.downloadUrl ?? pdfData?.download_url;

  if (!pdfMonkeyUrl || typeof pdfMonkeyUrl !== 'string') {
    throw new Error('PDF generation failed — no download URL returned');
  }

  // 4. Download PDF from PDFMonkey and upload to Supabase Storage
  //    PDFMonkey presigned URLs break with special chars — store in our own bucket
  const pdfResponse = await fetch(pdfMonkeyUrl);
  if (!pdfResponse.ok) {
    throw new Error(`Failed to download PDF from generator (${pdfResponse.status})`);
  }
  const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer());

  const safeName = (ramsDoc.project_name || 'rams')
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .slice(0, 80);
  const storagePath = `${user.userId}/${args.rams_id}_${safeName}.pdf`;

  const { error: uploadError } = await supabase.storage
    .from('rams-pdfs')
    .upload(storagePath, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Failed to store PDF: ${uploadError.message}`);
  }

  // 5. Get the public URL from Supabase Storage
  const { data: urlData } = supabase.storage.from('rams-pdfs').getPublicUrl(storagePath);

  const stableUrl = urlData.publicUrl;

  // 6. Store stable URL back to rams_documents
  await supabase.from('rams_documents').update({ pdf_url: stableUrl }).eq('id', args.rams_id);

  return {
    downloadUrl: stableUrl,
    documentId: args.rams_id,
    message: `RAMS PDF generated and stored. Share this link or use MEDIA:${stableUrl} to send as a document.`,
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

/** Extract risk items from the AI response (handles multiple response shapes) */
function extractRisks(aiData: Record<string, unknown>): Record<string, unknown>[] {
  // Try common response shapes from health-safety-v3
  const candidates = [
    aiData.risks,
    aiData.hazards,
    aiData.riskAssessment,
    (aiData.data as Record<string, unknown>)?.risks,
    (aiData.data as Record<string, unknown>)?.hazards,
    (aiData.response as Record<string, unknown>)?.risks,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate) && candidate.length > 0) {
      return candidate as Record<string, unknown>[];
    }
  }

  // If the response has a text/content field, it might be unstructured — wrap it
  if (typeof aiData.content === 'string' || typeof aiData.response === 'string') {
    return [
      {
        hazard: 'See full RAMS document for detailed risk assessment',
        likelihood: 'Medium',
        severity: 'Medium',
        riskRating: 'Medium',
        controls: 'See detailed controls in full document',
        residualRisk: 'Low',
      },
    ];
  }

  return [];
}

/** Extract PPE requirements from the AI response */
function extractPpe(aiData: Record<string, unknown>): Record<string, unknown>[] {
  const candidates = [
    aiData.ppe,
    aiData.ppeRequired,
    aiData.ppe_details,
    (aiData.data as Record<string, unknown>)?.ppe,
    (aiData.data as Record<string, unknown>)?.ppeRequired,
    (aiData.response as Record<string, unknown>)?.ppe,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate) && candidate.length > 0) {
      return candidate as Record<string, unknown>[];
    }
  }

  // Default PPE for electrical work
  return [
    { item: 'Safety boots', required: true },
    { item: 'Hard hat', required: true },
    { item: 'Hi-vis vest', required: true },
    { item: 'Safety glasses', required: true },
    { item: 'Insulated gloves', required: true },
  ];
}

/** Extract emergency contact info from the AI response */
function extractEmergencyContacts(aiData: Record<string, unknown>): Record<string, unknown> {
  const candidates = [
    aiData.emergencyContacts,
    aiData.emergency_contacts,
    (aiData.data as Record<string, unknown>)?.emergencyContacts,
    (aiData.response as Record<string, unknown>)?.emergencyContacts,
  ];

  for (const candidate of candidates) {
    if (candidate && typeof candidate === 'object') {
      return candidate as Record<string, unknown>;
    }
  }

  return {};
}
