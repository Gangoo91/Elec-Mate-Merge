/**
 * Document tools — generate_shareable_link, generate_briefing_pdf
 * Maps to: Supabase storage signed URLs via edge function, PDFMonkey briefing template
 */

import type { UserContext } from '../auth.js';
import { callEdgeFunction } from '../lib/edge-function.js';

export async function generateBriefingPdf(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.briefing_id !== 'string') {
    throw new Error('briefing_id is required');
  }

  const supabase = user.supabase;

  // Fetch briefing + company profile
  const [briefingRes, profileRes] = await Promise.all([
    supabase.from('team_briefings').select('*').eq('id', args.briefing_id).single(),
    supabase.from('company_profiles').select('*').eq('user_id', user.userId).single(),
  ]);

  if (briefingRes.error || !briefingRes.data) {
    throw new Error('Briefing not found');
  }

  // generate-pdf-monkey with briefing_mode uses template F59624CA
  const result = await callEdgeFunction(
    'generate-pdf-monkey',
    user.jwt,
    {
      briefing: briefingRes.data,
      companyProfile: profileRes.data ?? undefined,
      briefing_mode: true,
    },
    { timeoutMs: 90_000 }
  );

  if (result.error) throw new Error(result.error);

  const data = result.data as Record<string, unknown> | null;
  const downloadUrl = (data?.downloadUrl ?? data?.download_url) as string | undefined;

  if (!downloadUrl) {
    throw new Error('PDF generation failed — no download URL returned');
  }

  // Save PDF URL back to the briefing record
  await supabase
    .from('team_briefings')
    .update({
      pdf_url: downloadUrl,
      pdf_document_id: data?.documentId,
      pdf_generated_at: new Date().toISOString(),
    })
    .eq('id', args.briefing_id);

  return {
    documentId: data?.documentId ?? data?.document_id,
    downloadUrl,
    previewUrl: data?.previewUrl ?? data?.preview_url,
    briefing_id: args.briefing_id,
    message: `Briefing PDF generated. To send as a WhatsApp document, use MEDIA:${downloadUrl}`,
  };
}

export async function generateShareableLink(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.document_id !== 'string') {
    throw new Error('document_id is required');
  }
  if (
    args.document_type !== 'certificate' &&
    args.document_type !== 'quote' &&
    args.document_type !== 'invoice'
  ) {
    throw new Error('document_type must be "certificate", "quote", or "invoice"');
  }

  const result = await callEdgeFunction('generate-temporary-pdf-link', user.jwt, {
    document_id: args.document_id,
    document_type: args.document_type,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}
