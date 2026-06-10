import { supabase } from '@/integrations/supabase/client';

export interface ApprovedQsReview {
  reviewer_name: string;
  qs_signature: string;
  qs_position: string;
  reviewed_at: string;
}

/**
 * The QS countersignature to render on a certificate PDF, or null.
 *
 * Served by the get_qs_countersignature_for_pdf RPC, which only returns the
 * signature when: the caller owns the report, the LATEST review is approved,
 * and the report content hash still matches what the QS actually approved
 * (an edit after approval invalidates the countersignature).
 */
export async function getLatestApprovedQsReview(
  reportId: string | undefined
): Promise<ApprovedQsReview | null> {
  if (!reportId) return null;

  try {
    const { data, error } = await supabase.rpc('get_qs_countersignature_for_pdf', {
      p_report_id: reportId,
    });

    if (error || !data) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const review = data as any;
    if (!review.qs_signature || !review.reviewer_name) return null;

    return {
      reviewer_name: review.reviewer_name,
      qs_signature: review.qs_signature,
      qs_position: review.qs_position || 'Qualifying Supervisor',
      reviewed_at: review.reviewed_at || '',
    };
  } catch (err) {
    console.error('[QS review] PDF countersignature lookup failed:', err);
    return null;
  }
}

/** dd/mm/yyyy for PDF date fields. */
export function formatQsReviewDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB');
}
