import { supabase } from '@/integrations/supabase/client';

export interface VersionInfo {
  id: string; // DB uuid
  report_id: string; // string id used by the form router
  version: number;
  certificate_number: string;
  created_at: string;
  locked_at: string | null;
  is_latest_version: boolean;
}

// The root of a version chain is the original report. Every later version
// points its parent_report_id at that root, so the whole chain is
// `id == root OR parent_report_id == root`.
const rootIdOf = (report: { id: string; parent_report_id?: string | null }) =>
  report.parent_report_id || report.id;

/**
 * Create a new version of a (locked) report.
 *
 * - Links the new row to the chain root via parent_report_id.
 * - Copies the data into a fresh editable draft (status 'draft', unlocked).
 * - Marks the original superseded_by the new row and ensures it stays locked.
 *
 * @param originalReportId DB uuid of the report being amended
 * @returns the new draft's DB uuid and its report_id string (for routing)
 */
export const createNewVersion = async (
  originalReportId: string,
  userId: string
): Promise<{ success: boolean; reportId?: string; newReportIdString?: string; version?: number; error?: unknown }> => {
  try {
    const { data: originalReport, error: fetchError } = await supabase
      .from('reports')
      .select('*')
      .eq('id', originalReportId)
      .single();

    if (fetchError) throw fetchError;

    const rootId = rootIdOf(originalReport);

    // Next version number = how many rows already exist in this chain + 1.
    const { count } = await supabase
      .from('reports')
      .select('id', { count: 'exact', head: true })
      .or(`id.eq.${rootId},parent_report_id.eq.${rootId}`)
      .is('deleted_at', null);
    const nextVersion = (count || 1) + 1;

    const baseCertNumber = (originalReport.certificate_number || '').split('-V')[0];
    const newCertNumber = `${baseCertNumber}-V${nextVersion}`;
    const baseReportId = (originalReport.report_id || '').replace(/-V\d+$/, '');
    const newReportId = `${baseReportId}-V${nextVersion}`;

    // Carry the data forward but stamp the new version's certificate number so
    // the form and PDF show "…-V2" rather than the original's number.
    const copiedData = {
      ...(originalReport.data || {}),
      certificateNumber: newCertNumber,
    };

    const { data: newReport, error: createError } = await supabase
      .from('reports')
      .insert({
        user_id: userId,
        customer_id: originalReport.customer_id,
        report_type: originalReport.report_type,
        certificate_number: newCertNumber,
        report_id: newReportId,
        data: copiedData,
        status: 'draft',
        edit_version: 1, // fresh optimistic-concurrency counter
        parent_report_id: rootId,
        inspection_date: originalReport.inspection_date,
        client_name: originalReport.client_name,
        installation_address: originalReport.installation_address,
        inspector_name: originalReport.inspector_name,
        property_type: originalReport.property_type,
      })
      .select()
      .single();

    if (createError) throw createError;

    // Supersede EVERY still-current version in the chain (the root + all prior
    // children), not just the row that was amended. The new version's
    // parent_report_id points at the chain root, so amending the root twice —
    // or amending from any non-tip version — otherwise leaves an orphaned
    // middle version with superseded_by = null, which then shows as a second
    // "current" cert in the list (verified live: Rob Such had V2 AND V3 both
    // visible). After this, exactly one row — the new tip — is current.
    await supabase
      .from('reports')
      .update({ superseded_by: newReport.id })
      .or(`id.eq.${rootId},parent_report_id.eq.${rootId}`)
      .neq('id', newReport.id)
      .is('superseded_by', null);

    // Ensure the amended-from version is locked/immutable (it may still have
    // been an unlocked draft tip).
    if (!originalReport.locked_at) {
      await supabase
        .from('reports')
        .update({ locked_at: new Date().toISOString() })
        .eq('id', originalReportId);
    }

    return {
      success: true,
      reportId: newReport.id,
      newReportIdString: newReportId,
      version: nextVersion,
    };
  } catch (error) {
    console.error('Error creating new version:', error);
    return { success: false, error };
  }
};

/**
 * Full version timeline for a report's chain, oldest → newest.
 * @param reportDbId DB uuid of any report in the chain
 */
export const getVersionHistory = async (reportDbId: string): Promise<VersionInfo[]> => {
  try {
    const { data: report, error } = await supabase
      .from('reports')
      .select('id, parent_report_id')
      .eq('id', reportDbId)
      .single();

    if (error) throw error;
    const rootId = report.parent_report_id || report.id;

    const { data: rows, error: rowsError } = await supabase
      .from('reports')
      .select('id, report_id, certificate_number, created_at, locked_at, parent_report_id')
      .or(`id.eq.${rootId},parent_report_id.eq.${rootId}`)
      .is('deleted_at', null)
      .order('created_at', { ascending: true });

    if (rowsError) throw rowsError;

    const list = rows || [];
    return list.map((r, i) => ({
      id: r.id,
      report_id: r.report_id,
      version: i + 1,
      certificate_number: r.certificate_number,
      created_at: r.created_at,
      locked_at: r.locked_at,
      is_latest_version: i === list.length - 1,
    }));
  } catch (error) {
    console.error('Error fetching version history:', error);
    return [];
  }
};

/**
 * Get version number for a report within its chain (1-based).
 */
export const getVersionNumber = async (reportDbId: string): Promise<number> => {
  const history = await getVersionHistory(reportDbId);
  const match = history.find((v) => v.id === reportDbId);
  return match?.version || 1;
};
