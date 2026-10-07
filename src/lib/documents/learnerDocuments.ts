/**
 * learnerDocuments — download an apprentice or college document rendered in
 * PDFMonkey by the `learner-document-pdf` edge function (ELE-2017).
 *
 * The function checks who is asking (the apprentice, staff who can assess
 * them, college staff, or a token link), files the PDF in the private
 * portfolio-exports bucket and returns a one-hour signed link. The file is
 * then saved (web) or shared (iOS/Android) through saveOrShareFile.
 *
 * Token pages (/view/:token, /otj-statement/:token, /review/:token) pass
 * their own anon client so no session is needed.
 */
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { saveOrShareFile } from '@/utils/save-or-share-file';

export type LearnerDocumentRequest =
  | { kind: 'shared_portfolio'; token: string }
  | { kind: 'otj_statement'; statementId: string }
  | { kind: 'otj_statement'; token: string }
  | { kind: 'otj_log'; learnerId?: string | null }
  | { kind: 'review_record'; reviewId: string }
  | { kind: 'review_record'; token: string }
  | { kind: 'witness_statement'; statementId: string }
  | { kind: 'funding_pack'; studentId: string }
  | { kind: 'transfer_pack'; learnerId?: string | null }
  | { kind: 'audit_pack' }
  | { kind: 'iqa_report' }
  | { kind: 'quality_report' }
  | { kind: 'college_value'; month?: string | null }
  | { kind: 'ofsted_lens' }
  | { kind: 'epa_brief'; briefId: string }
  | { kind: 'epa_brief'; studentId: string }
  | { kind: 'lesson_plan'; lessonPlanId: string };

export async function downloadLearnerDocument(
  request: LearnerDocumentRequest,
  client: SupabaseClient = supabase as unknown as SupabaseClient
): Promise<void> {
  const { data, error } = await client.functions.invoke('learner-document-pdf', { body: request });
  if (error) {
    let msg = 'The document could not be made. Try again.';
    try {
      const ctx = (error as { context?: Response }).context;
      if (ctx && typeof ctx.json === 'function') msg = ((await ctx.json()) as { error?: string }).error ?? msg;
    } catch {
      /* keep the generic message */
    }
    throw new Error(msg);
  }
  const res = data as { url?: string; filename?: string; error?: string } | null;
  if (!res?.url) throw new Error(res?.error ?? 'The document could not be made. Try again.');
  await saveOrShareFile(res.url, res.filename ?? 'document.pdf');
}
