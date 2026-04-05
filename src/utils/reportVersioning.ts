import { supabase } from '@/integrations/supabase/client';

interface VersionInfo {
  id: string;
  version: number;
  certificate_number: string;
  created_at: string;
  is_latest_version: boolean;
}

/**
 * Create a new version of a report.
 * Note: The reports table uses `edit_version` (not `version`) and has no
 * `parent_report_id` or `is_latest_version` columns. Versioning is tracked
 * by certificate_number suffix (-V2, -V3 etc) and edit_version integer.
 */
export const createNewVersion = async (
  originalReportId: string,
  userId: string
): Promise<{ success: boolean; reportId?: string; error?: any }> => {
  try {
    const { data: originalReport, error: fetchError } = await supabase
      .from('reports')
      .select('*')
      .eq('id', originalReportId)
      .single();

    if (fetchError) throw fetchError;

    const newVersion = (originalReport.edit_version || 1) + 1;
    const baseCertNumber = originalReport.certificate_number.split('-V')[0];
    const newCertNumber = `${baseCertNumber}-V${newVersion}`;
    const baseReportId = originalReport.report_id?.replace(/-V\d+$/, '') || originalReport.report_id;
    const newReportId = `${baseReportId}-V${newVersion}`;

    const { data: newReport, error: createError } = await supabase
      .from('reports')
      .insert({
        user_id: userId,
        customer_id: originalReport.customer_id,
        report_type: originalReport.report_type,
        certificate_number: newCertNumber,
        report_id: newReportId,
        data: originalReport.data,
        status: 'draft',
        edit_version: newVersion,
        inspection_date: originalReport.inspection_date,
        client_name: originalReport.client_name,
        installation_address: originalReport.installation_address,
        inspector_name: originalReport.inspector_name,
        property_type: originalReport.property_type,
      })
      .select()
      .single();

    if (createError) throw createError;

    return {
      success: true,
      reportId: newReport.id,
    };
  } catch (error) {
    console.error('Error creating new version:', error);
    return {
      success: false,
      error,
    };
  }
};

/**
 * Get all versions of a report — returns just the current report
 * since there are no parent_report_id links in the DB.
 */
export const getVersionHistory = async (reportId: string): Promise<VersionInfo[]> => {
  try {
    const { data: report, error } = await supabase
      .from('reports')
      .select('id, edit_version, certificate_number, created_at')
      .eq('id', reportId)
      .single();

    if (error) throw error;

    return [{
      id: report.id,
      version: report.edit_version || 1,
      certificate_number: report.certificate_number,
      created_at: report.created_at,
      is_latest_version: true,
    }];
  } catch (error) {
    console.error('Error fetching version history:', error);
    return [];
  }
};

/**
 * Get the latest version of a report — returns the report itself
 */
export const getLatestVersion = async (reportId: string): Promise<string | null> => {
  return reportId;
};

/**
 * Get version number for a report
 */
export const getVersionNumber = async (reportId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('edit_version')
      .eq('id', reportId)
      .single();

    if (error) throw error;

    return data?.edit_version || 1;
  } catch (error) {
    console.error('Error fetching version number:', error);
    return 1;
  }
};

/**
 * Check if report is the latest version — always true since no version chains
 */
export const isLatestVersion = async (_reportId: string): Promise<boolean> => {
  return true;
};
