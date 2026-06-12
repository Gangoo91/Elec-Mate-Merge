import { supabase } from '@/integrations/supabase/client';

/**
 * Persist a generated PDF into a job pack durably. PDFMonkey download URLs
 * are time-limited — we pull the blob, store it in OUR private bucket, and
 * save a year-long signed URL so workers' sign-off links keep working.
 */
export async function persistPackDocument(input: {
  jobPackId: string;
  title: string;
  documentType: string;
  transientUrl: string;
}): Promise<boolean> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;

    const res = await fetch(input.transientUrl);
    if (!res.ok) return false;
    const blob = await res.blob();

    const path = `${user.id}/${input.jobPackId}/${input.documentType}-${Date.now()}.pdf`;
    const { error: uploadError } = await supabase.storage
      .from('pack-documents')
      .upload(path, blob, { contentType: 'application/pdf' });
    if (uploadError) return false;

    const { data: signed } = await supabase.storage
      .from('pack-documents')
      .createSignedUrl(path, 60 * 60 * 24 * 365);
    if (!signed?.signedUrl) return false;

    const { error: insertError } = await supabase.from('employer_job_pack_documents').insert({
      job_pack_id: input.jobPackId,
      title: input.title,
      document_type: input.documentType,
      file_url: signed.signedUrl,
      is_required: true,
    });
    return !insertError;
  } catch {
    return false;
  }
}
