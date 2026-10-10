/**
 * ELE-1941: an issued firm RAMS goes into its job's pack by itself, for crew
 * sign-off, without an "attach" step. Employer Hub only (the caller checks the
 * firm scope); the Electrical Hub never calls this.
 *
 * Best-effort and idempotent: the same version is never attached twice, and a
 * failure only means the office attaches it from the RAMS page.
 */
import { supabase } from '@/integrations/supabase/client';
import { persistPackDocument } from '@/utils/persistPackDocument';

export type PackAttachResult = 'attached' | 'already' | 'no-job' | 'no-pack' | 'failed';

export async function attachIssuedRamsToPack(
  generationJobId: string,
  employerId: string
): Promise<PackAttachResult> {
  try {
    const { data: gen } = await supabase
      .from('rams_generation_jobs')
      .select('employer_job_id')
      .eq('id', generationJobId)
      .maybeSingle();
    const jobId = (gen as { employer_job_id?: string | null } | null)?.employer_job_id;
    if (!jobId) return 'no-job';

    const { data: doc } = await supabase
      .from('rams_documents')
      .select('pdf_url, version, project_name')
      .eq('employer_id' as never, employerId as never)
      .eq('ai_generation_metadata->>generation_job_id', generationJobId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    const filed = doc as {
      pdf_url: string | null;
      version: number | null;
      project_name: string;
    } | null;
    if (!filed?.pdf_url) return 'failed';

    const { data: pack } = await supabase
      .from('employer_job_packs')
      .select('id')
      .eq('job_id', jobId)
      .eq('employer_id', employerId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!pack) return 'no-pack';

    const title = `RAMS and method statement v${filed.version ?? 1}: ${filed.project_name}`;
    const { data: existing } = await supabase
      .from('employer_job_pack_documents')
      .select('id')
      .eq('job_pack_id', pack.id)
      .eq('title', title)
      .limit(1);
    if (existing?.length) return 'already';

    // rams-pdfs is a public bucket: the stored path reads back for any manager.
    const url = supabase.storage.from('rams-pdfs').getPublicUrl(filed.pdf_url).data.publicUrl;
    const ok = await persistPackDocument({
      jobPackId: pack.id,
      title,
      documentType: 'rams',
      transientUrl: url,
    });
    if (!ok) return 'failed';
    await supabase
      .from('employer_job_packs')
      .update({ rams_generated: true, method_statement_generated: true })
      .eq('id', pack.id);
    return 'attached';
  } catch {
    return 'failed';
  }
}
