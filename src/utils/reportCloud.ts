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
  status: 'draft' | 'in-progress' | 'completed';
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
   */
  getUserReports: async (
    userId: string, 
    options?: { page?: number; pageSize?: number; limit?: number }
  ): Promise<ReportsResponse> => {
    try {
      const page = options?.page || 1;
      const pageSize = options?.pageSize || 20;
      const offset = (page - 1) * pageSize;
      
      // Get total count
      const { count, error: countError } = await supabase
        .from('reports')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .is('deleted_at', null);
      
      if (countError) throw countError;
      
      // Get paginated data
      let query = supabase
        .from('reports')
        .select('*')
        .eq('user_id', userId)
        .is('deleted_at', null)
        .order('updated_at', { ascending: false });
      
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
   */
  createReport: async (userId: string, reportType: 'eicr' | 'eic' | 'minor-works', data: any, customerId?: string): Promise<{ success: boolean; reportId?: string; error?: any }> => {
    try {
      const reportData = {
        user_id: userId,
        report_type: reportType,
        certificate_number: data.certificateNumber || `${reportType.toUpperCase()}-${Date.now()}`,
        report_id: `${reportType.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        status: data.status === 'completed' ? 'completed' :
                data.certificateGenerated ? 'completed' :
                data.satisfactoryForContinuedUse && data.inspectorSignature ? 'completed' :
                (data.clientName || data.inspectionDate || data.workDate) ? 'in-progress' : 'draft',
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
          console.log('[reportCloud] Duplicate certificate detected, finding existing report...');
          
          // Find existing report by certificate number
          const existingReport = await reportCloud.findReportByCertificateNumber(
            userId, 
            reportData.certificate_number
          );
          
          if (existingReport) {
            console.log('[reportCloud] Updating existing report instead:', existingReport.report_id);
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
      
      console.log('[reportCloud] Report created:', newReport.report_id);
      return { success: true, reportId: newReport.report_id };
    } catch (error) {
      console.error('[reportCloud] Failed to create report:', error);
      return { success: false, error };
    }
  },

  /**
   * Update an existing report
   */
  updateReport: async (reportId: string, userId: string, data: any, customerId?: string): Promise<{ success: boolean; error?: any }> => {
    try {
      const updateData: any = {
        status: data.status === 'completed' ? 'completed' :
                data.certificateGenerated ? 'completed' :
                data.satisfactoryForContinuedUse && data.inspectorSignature ? 'completed' :
                (data.clientName || data.inspectionDate || data.workDate) ? 'in-progress' : 'draft',
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
      
      console.log('[reportCloud] Report updated:', reportId);
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
   * Soft delete a report using secure RPC function
   */
  softDeleteReport: async (reportId: string, userId: string): Promise<{ success: boolean; error?: any }> => {
    try {
      console.log('[reportCloud] Soft deleting report:', reportId, 'for user:', userId);
      
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
      
      console.log('[reportCloud] Report deleted successfully:', reportId, result.message);
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
   */
  updateReportWithVersionCheck: async (
    reportId: string,
    userId: string,
    data: any,
    expectedVersion: number,
    customerId?: string
  ): Promise<{ success: boolean; conflict?: VersionConflict; error?: any }> => {
    try {
      // First check for conflicts
      const conflict = await reportCloud.checkVersionConflict(reportId, userId, expectedVersion);

      if (conflict.hasConflict) {
        console.log('[reportCloud] Version conflict detected:', conflict);
        return { success: false, conflict };
      }

      // No conflict, proceed with update
      const updateData: any = {
        status: data.status === 'completed' ? 'completed' :
                data.certificateGenerated ? 'completed' :
                data.satisfactoryForContinuedUse && data.inspectorSignature ? 'completed' :
                (data.clientName || data.inspectionDate || data.workDate) ? 'in-progress' : 'draft',
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

      console.log('[reportCloud] Report updated with version check:', reportId);
      return { success: true };
    } catch (error) {
      console.error('[reportCloud] Failed to update report with version check:', error);
      return { success: false, error };
    }
  },
};
