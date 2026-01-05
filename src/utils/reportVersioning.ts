import { supabase } from '@/integrations/supabase/client';

interface VersionInfo {
  id: string;
  version: number;
  certificate_number: string;
  created_at: string;
  is_latest_version: boolean;
}

/**
 * Create a new version of a report
 */
export const createNewVersion = async (
  originalReportId: string,
  userId: string
): Promise<{ success: boolean; reportId?: string; error?: any }> => {
  try {
    // Fetch original report
    const { data: originalReport, error: fetchError } = await supabase
      .from('reports')
      .select('*')
      .eq('id', originalReportId)
      .single();

    if (fetchError) throw fetchError;

    // Calculate new version number
    const newVersion = (originalReport.version || 1) + 1;
    
    // Generate new certificate number with version suffix
    const baseCertNumber = originalReport.certificate_number.split('-V')[0];
    const newCertNumber = `${baseCertNumber}-V${newVersion}`;

    // Create new report version
    const { data: newReport, error: createError } = await supabase
      .from('reports')
      .insert({
        user_id: userId,
        customer_id: originalReport.customer_id,
        report_type: originalReport.report_type,
        certificate_number: newCertNumber,
        report_id: originalReport.report_id,
        data: originalReport.data,
        status: 'draft',
        version: newVersion,
        parent_report_id: originalReport.parent_report_id || originalReport.id,
        is_latest_version: true,
        inspection_date: originalReport.inspection_date,
        client_name: originalReport.client_name,
        installation_address: originalReport.installation_address,
        inspector_name: originalReport.inspector_name,
        property_type: originalReport.property_type,
      })
      .select()
      .single();

    if (createError) throw createError;

    // Mark all previous versions as not latest
    const parentId = originalReport.parent_report_id || originalReport.id;
    await supabase
      .from('reports')
      .update({ is_latest_version: false })
      .or(`id.eq.${parentId},parent_report_id.eq.${parentId}`)
      .neq('id', newReport.id);

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
 * Get all versions of a report
 */
export const getVersionHistory = async (
  reportId: string
): Promise<VersionInfo[]> => {
  try {
    // Get the report to find parent
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .select('id, parent_report_id')
      .eq('id', reportId)
      .single();

    if (reportError) throw reportError;

    // Fetch all versions (including parent and siblings)
    const parentId = report.parent_report_id || report.id;
    const { data: versions, error: versionsError } = await supabase
      .from('reports')
      .select('id, version, certificate_number, created_at, is_latest_version')
      .or(`id.eq.${parentId},parent_report_id.eq.${parentId}`)
      .order('version', { ascending: true });

    if (versionsError) throw versionsError;

    return versions || [];
  } catch (error) {
    console.error('Error fetching version history:', error);
    return [];
  }
};

/**
 * Get the latest version of a report
 */
export const getLatestVersion = async (
  reportId: string
): Promise<string | null> => {
  try {
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .select('id, parent_report_id')
      .eq('id', reportId)
      .single();

    if (reportError) throw reportError;

    const parentId = report.parent_report_id || report.id;
    
    const { data: latestVersion, error: versionError } = await supabase
      .from('reports')
      .select('id')
      .or(`id.eq.${parentId},parent_report_id.eq.${parentId}`)
      .eq('is_latest_version', true)
      .single();

    if (versionError) throw versionError;

    return latestVersion?.id || null;
  } catch (error) {
    console.error('Error fetching latest version:', error);
    return null;
  }
};

/**
 * Get version number for a report
 */
export const getVersionNumber = async (reportId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('version')
      .eq('id', reportId)
      .single();

    if (error) throw error;

    return data?.version || 1;
  } catch (error) {
    console.error('Error fetching version number:', error);
    return 1;
  }
};

/**
 * Check if report is the latest version
 */
export const isLatestVersion = async (reportId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('is_latest_version')
      .eq('id', reportId)
      .single();

    if (error) throw error;

    return data?.is_latest_version ?? true;
  } catch (error) {
    console.error('Error checking version status:', error);
    return true;
  }
};
