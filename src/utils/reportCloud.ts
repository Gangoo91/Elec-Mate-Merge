import { supabase } from '@/integrations/supabase/client';

export interface CloudReport {
  id: string;
  report_id: string;
  report_type: 'eicr' | 'eic' | 'minor-works';
  certificate_number?: string;
  client_name: string;
  installation_address: string;
  inspector_name?: string;
  inspection_date?: string;
  status: 'auto-draft' | 'draft' | 'in-progress' | 'completed';
  updated_at: string;
  data: any;
  pdf_url?: string;
  pdf_generated_at?: string;
  version?: number;
  edit_version?: number;
}

export interface VersionConflict {
  hasConflict: boolean;
  localVersion: number;
  serverVersion: number;
  serverData?: any;
  serverUpdatedAt?: string;
}

export interface ReportsResponse {
  reports: CloudReport[];
  totalCount: number;
  hasMore: boolean;
}

export const reportCloud = {
  /**
   * Get all reports for a user with pagination
   * By default, filters out 'auto-draft' reports (auto-saved but never manually saved)
   */
  getUserReports: async (
    userId: string,
    options?: { page?: number; pageSize?: number; limit?: number; includeAutoDrafts?: boolean }
  ): Promise<ReportsResponse> => {
    try {
      const page = options?.page || 1;
      const pageSize = options?.pageSize || 20;
      const offset = (page - 1) * pageSize;
      const includeAutoDrafts = options?.includeAutoDrafts ?? false;

      // Get total count (excluding auto-drafts by default)
      let countQuery = supabase
        .from('reports')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .is('deleted_at', null);

      if (!includeAutoDrafts) {
        countQuery = countQuery.neq('status', 'auto-draft');
      }

      const { count, error: countError } = await countQuery;

      if (countError) throw countError;

      // Get paginated data (excluding auto-drafts by default)
      let query = supabase
        .from('reports')
        .select('*')
        .eq('user_id', userId)
        .is('deleted_at', null)
        .order('updated_at', { ascending: false });

      if (!includeAutoDrafts) {
        query = query.neq('status', 'auto-draft');
      }

      // Apply pagination or limit
      if (options?.limit) {
        query = query.limit(options.limit);
      } else {
        query = query.range(offset, offset + pageSize - 1);
      }

      const { data, error } = await query;

      if (error) throw error;

      const totalCount = count || 0;
      const reports = (data || []) as CloudReport[];
      const hasMore = offset + reports.length < totalCount;

      return { reports, totalCount, hasMore };
    } catch (error) {
      console.error('[reportCloud] Failed to fetch user reports:', error);
      return { reports: [], totalCount: 0, hasMore: false };
    }
  },

  /**
   * Create a new report
   * @param isAutoSync - If true, creates with 'auto-draft' status (won't show in Recent Certs until manually saved)
   */
  createReport: async (userId: string, reportType: 'eicr' | 'eic' | 'minor-works', data: any, customerId?: string, isAutoSync: boolean = false): Promise<{ success: boolean; reportId?: string; error?: any }> => {
    try {
      // Calculate status based on form data - handles all report types including Minor Works
      const calculateStatus = (): 'auto-draft' | 'draft' | 'in-progress' | 'completed' => {
        // Auto-sync creates 'auto-draft' - won't appear in Recent Certs until manually saved
        if (isAutoSync) return 'auto-draft';
        // Explicit status takes precedence
        if (data.status === 'completed') return 'completed';
        // Certificate generated means completed
        if (data.certificateGenerated) return 'completed';
        // EICR specific completion check
        if (data.satisfactoryForContinuedUse && data.inspectorSignature) return 'completed';
        // Minor Works specific: check for signature and work completion
        if (reportType === 'minor-works' && data.signature && data.workDate) return 'completed';
        // Check for any meaningful data entry (works for all report types)
        const hasContent = data.clientName ||
                          data.inspectionDate ||
                          data.workDate ||  // Minor Works date field
                          data.dateOfInspection ||  // EICR date field
                          data.installationAddress ||
                          data.propertyAddress;
        return hasContent ? 'in-progress' : 'draft';
      };

      const status = calculateStatus();

      console.log('[reportCloud] Creating report:', {
        type: reportType,
        calculatedStatus: status,
        hasClientName: !!data.clientName,
        hasInspectionDate: !!data.inspectionDate,
        hasWorkDate: !!data.workDate,
      });

      const reportData = {
        user_id: userId,
        report_type: reportType,
        certificate_number: data.certificateNumber || `${reportType.toUpperCase()}-${Date.now()}`,
        report_id: `${reportType.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        status,
        customer_id: customerId || null,
        client_name: data.clientName || null,
        installation_address: data.installationAddress || data.propertyAddress || null,
        inspection_date: data.inspectionDate || data.workDate || null,
        inspector_name: data.inspectorName || data.contractorName || null,
        data: data,
        last_synced_at: new Date().toISOString(),
      };

      const { data: newReport, error } = await supabase
        .from('reports')
        .insert(reportData)
        .select('report_id')
        .single();

      if (error) {
        // Handle duplicate certificate number (unique constraint violation)
        if (error.code === '23505' && error.message.includes('uniq_reports_user_cert_active')) {
          // Find existing report by certificate number
          const existingReport = await reportCloud.findReportByCertificateNumber(
            userId, 
            reportData.certificate_number
          );
          
          if (existingReport) {
            // Update the existing report
            const updateResult = await reportCloud.updateReport(
              existingReport.report_id,
              userId,
              data,
              customerId
            );
            
            if (updateResult.success) {
              return { success: true, reportId: existingReport.report_id };
            }
          }
        }
        
        throw error;
      }

      return { success: true, reportId: newReport.report_id };
    } catch (error) {
      console.error('[reportCloud] Failed to create report:', error);
      return { success: false, error };
    }
  },

  /**
   * Update an existing report
   * @param isAutoSync - If true, keeps 'auto-draft' status; if false (manual save), promotes to proper status
   */
  updateReport: async (reportId: string, userId: string, data: any, customerId?: string, isAutoSync: boolean = false): Promise<{ success: boolean; error?: any }> => {
    try {
      // Determine report type from reportId prefix
      const reportType = reportId.toLowerCase().startsWith('minor-works') ? 'minor-works' :
                        reportId.toLowerCase().startsWith('eic-') ? 'eic' : 'eicr';

      // Get current status to check if it's an auto-draft
      const { data: currentReport } = await supabase
        .from('reports')
        .select('status')
        .eq('report_id', reportId)
        .eq('user_id', userId)
        .single();

      const currentStatus = currentReport?.status;

      // Calculate status - same logic as createReport
      const calculateStatus = (): 'auto-draft' | 'draft' | 'in-progress' | 'completed' => {
        // If it's an auto-sync AND currently auto-draft, keep it as auto-draft
        if (isAutoSync && currentStatus === 'auto-draft') return 'auto-draft';
        // Manual save promotes auto-draft to proper status
        if (data.status === 'completed') return 'completed';
        if (data.certificateGenerated) return 'completed';
        if (data.satisfactoryForContinuedUse && data.inspectorSignature) return 'completed';
        if (reportType === 'minor-works' && data.signature && data.workDate) return 'completed';
        const hasContent = data.clientName ||
                          data.inspectionDate ||
                          data.workDate ||
                          data.dateOfInspection ||
                          data.installationAddress ||
                          data.propertyAddress;
        return hasContent ? 'in-progress' : 'draft';
      };

      const status = calculateStatus();

      console.log('[reportCloud] Updating report:', {
        reportId,
        reportType,
        currentStatus,
        calculatedStatus: status,
        isAutoSync,
      });

      const updateData: any = {
        status,
        client_name: data.clientName || null,
        installation_address: data.installationAddress || data.propertyAddress || null,
        inspection_date: data.inspectionDate || data.workDate || null,
        inspector_name: data.inspectorName || data.contractorName || null,
        data: data,
        last_synced_at: new Date().toISOString(),
      };

      // Set customer_id if provided
      if (customerId !== undefined) {
        updateData.customer_id = customerId;
      }

      const { error } = await supabase
        .from('reports')
        .update(updateData)
        .eq('report_id', reportId)
        .eq('user_id', userId);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('[reportCloud] Failed to update report:', error);
      return { success: false, error };
    }
  },

  /**
   * Get full report data by report ID
   */
  getReportData: async (reportId: string, userId: string): Promise<any | null> => {
    try {
      const { data: report, error } = await supabase
        .from('reports')
        .select('data')
        .eq('report_id', reportId)
        .eq('user_id', userId)
        .is('deleted_at', null)
        .maybeSingle();

      if (error) throw error;
      return report?.data || null;
    } catch (error) {
      console.error('[reportCloud] Failed to fetch report data:', error);
      return null;
    }
  },

  /**
   * Get report data along with the database UUID
   * Returns both the form data and the database ID needed for related queries
   */
  getReportDataWithId: async (reportId: string, userId: string): Promise<{ data: any; databaseId: string } | null> => {
    try {
      const { data: report, error } = await supabase
        .from('reports')
        .select('id, data')
        .eq('report_id', reportId)
        .eq('user_id', userId)
        .is('deleted_at', null)
        .maybeSingle();

      if (error) throw error;
      if (!report) return null;

      return {
        data: report.data || {},
        databaseId: report.id,
      };
    } catch (error) {
      console.error('[reportCloud] Failed to fetch report data with ID:', error);
      return null;
    }
  },

  /**
   * Soft delete a report using secure RPC function
   */
  softDeleteReport: async (reportId: string, userId: string): Promise<{ success: boolean; error?: any }> => {
    try {
      // Call the secure RPC function that bypasses RLS "returning" issues
      const { data, error } = await supabase
        .rpc('soft_delete_report', {
          p_user_id: userId,
          p_report_id: reportId
        });
      
      if (error) {
        console.error('[reportCloud] RPC error:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        return { 
          success: false, 
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
          }
        };
      }
      
      // Parse the JSONB response from the RPC function
      const result = data as { success: boolean; error?: string; message: string; already_deleted?: boolean };
      
      if (!result.success) {
        console.error('[reportCloud] RPC returned error:', result);
        return { 
          success: false, 
          error: {
            message: result.message,
            code: result.error
          }
        };
      }
      
      return { success: true };
    } catch (error) {
      console.error('[reportCloud] Failed to soft delete report:', error);
      return { success: false, error };
    }
  },

  /**
   * Find report by certificate number
   */
  findReportByCertificateNumber: async (userId: string, certificateNumber: string): Promise<CloudReport | null> => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', userId)
        .eq('certificate_number', certificateNumber)
        .is('deleted_at', null)
        .maybeSingle();
      
      if (error) throw error;
      return data as CloudReport | null;
    } catch (error) {
      console.error('[reportCloud] Failed to find report by certificate number:', error);
      return null;
    }
  },

  /**
   * Get report by report_id (legacy compatibility)
   */
  getReportByReportId: async (reportId: string, userId: string): Promise<CloudReport | null> => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('report_id', reportId)
        .eq('user_id', userId)
        .is('deleted_at', null)
        .single();

      if (error) throw error;
      return data as CloudReport;
    } catch (error) {
      console.error('[reportCloud] Failed to fetch report:', error);
      return null;
    }
  },

  /**
   * Get current edit version of a report
   */
  getEditVersion: async (reportId: string, userId: string): Promise<{ version: number; updatedAt: string } | null> => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('edit_version, updated_at')
        .eq('report_id', reportId)
        .eq('user_id', userId)
        .is('deleted_at', null)
        .single();

      if (error) throw error;
      return {
        version: data?.edit_version || 1,
        updatedAt: data?.updated_at
      };
    } catch (error) {
      console.error('[reportCloud] Failed to get edit version:', error);
      return null;
    }
  },

  /**
   * Check for version conflict before update
   */
  checkVersionConflict: async (
    reportId: string,
    userId: string,
    expectedVersion: number
  ): Promise<VersionConflict> => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('edit_version, updated_at, data')
        .eq('report_id', reportId)
        .eq('user_id', userId)
        .is('deleted_at', null)
        .single();

      if (error) throw error;

      const serverVersion = data?.edit_version || 1;
      const hasConflict = serverVersion > expectedVersion;

      return {
        hasConflict,
        localVersion: expectedVersion,
        serverVersion,
        serverData: hasConflict ? data?.data : undefined,
        serverUpdatedAt: hasConflict ? data?.updated_at : undefined,
      };
    } catch (error) {
      console.error('[reportCloud] Failed to check version conflict:', error);
      // If we can't check, assume no conflict to avoid blocking saves
      return {
        hasConflict: false,
        localVersion: expectedVersion,
        serverVersion: expectedVersion,
      };
    }
  },

  /**
   * Update with version check (optimistic locking)
   * @param isAutoSync - If true, keeps 'auto-draft' status; if false, promotes to proper status
   */
  updateReportWithVersionCheck: async (
    reportId: string,
    userId: string,
    data: any,
    expectedVersion: number,
    customerId?: string,
    isAutoSync: boolean = false
  ): Promise<{ success: boolean; conflict?: VersionConflict; error?: any }> => {
    try {
      // First check for conflicts
      const conflict = await reportCloud.checkVersionConflict(reportId, userId, expectedVersion);

      if (conflict.hasConflict) {
        return { success: false, conflict };
      }

      // Get current status to check if it's an auto-draft
      const { data: currentReport } = await supabase
        .from('reports')
        .select('status')
        .eq('report_id', reportId)
        .eq('user_id', userId)
        .single();

      const currentStatus = currentReport?.status;

      // Calculate status - keep auto-draft if auto-sync and currently auto-draft
      const calculateStatus = () => {
        if (isAutoSync && currentStatus === 'auto-draft') return 'auto-draft';
        if (data.status === 'completed') return 'completed';
        if (data.certificateGenerated) return 'completed';
        if (data.satisfactoryForContinuedUse && data.inspectorSignature) return 'completed';
        return (data.clientName || data.inspectionDate || data.workDate) ? 'in-progress' : 'draft';
      };

      // No conflict, proceed with update
      const updateData: any = {
        status: calculateStatus(),
        client_name: data.clientName || null,
        installation_address: data.installationAddress || data.propertyAddress || null,
        inspection_date: data.inspectionDate || data.workDate || null,
        inspector_name: data.inspectorName || data.contractorName || null,
        data: data,
        last_synced_at: new Date().toISOString(),
      };

      if (customerId !== undefined) {
        updateData.customer_id = customerId;
      }

      const { error } = await supabase
        .from('reports')
        .update(updateData)
        .eq('report_id', reportId)
        .eq('user_id', userId);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('[reportCloud] Failed to update report with version check:', error);
      return { success: false, error };
    }
  },
};
