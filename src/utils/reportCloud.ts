import { supabase } from '@/integrations/supabase/client';

// All supported certificate types
export type ReportType =
  | 'eicr'
  | 'eic'
  | 'minor-works'
  | 'ev-charging'
  | 'fire-alarm'
  | 'fire-alarm-design'
  | 'fire-alarm-commissioning'
  | 'fire-alarm-inspection'
  | 'fire-alarm-modification'
  | 'emergency-lighting'
  | 'pat-testing'
  | 'solar-pv'
  | 'danger-notice'
  | 'isolation-cert'
  | 'permit-to-work'
  | 'warning-labels'
  | 'safe-isolation'
  | 'limitation-notice'
  | 'non-compliance-notice'
  | 'completion-notice'
  | 'bess'
  | 'lightning-protection'
  | 'g98-commissioning'
  | 'g99-commissioning'
  | 'smoke-co-alarm'
  | 'testing-only';

export interface CloudReport {
  id: string;
  report_id: string;
  report_type: ReportType;
  certificate_number?: string;
  client_name: string;
  installation_address: string;
  inspector_name?: string;
  inspection_date?: string;
  status: 'auto-draft' | 'draft' | 'in-progress' | 'completed';
  updated_at: string;
  data: Record<string, unknown>;
  pdf_url?: string;
  pdf_generated_at?: string;
  version?: number;
  edit_version?: number;
}

export interface VersionConflict {
  hasConflict: boolean;
  localVersion: number;
  serverVersion: number;
  serverData?: Record<string, unknown>;
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
   *
   * ELE-946 — DO NOT switch this back to `select('*')`. The full `data` JSONB
   * column can be 300KB+ per row when signatures or photos are saved as
   * base64 data URIs inline (legacy save path). Pulling 7 such rows produces
   * a ~1.3MB response that silently fails on flaky / corporate networks,
   * leaving the user looking at "No certificates yet" while the count tabs
   * (which use a slim `getReportCounts`) correctly show 7. Only pluck the
   * specific `data` keys the list / dashboard actually renders. Editors and
   * PDF generation already fetch the full `data` separately via
   * `getReportData` / `getReportByReportId`.
   */
  getUserReports: async (
    userId: string,
    options?: {
      page?: number;
      pageSize?: number;
      limit?: number;
      includeAutoDrafts?: boolean;
      // ELE-NEW — server-side filters so the active tab paginates over its
      // own subset of the user's library, not just whatever happened to be
      // in the first 20 rows. Pass `'all'` (or omit) to disable a filter.
      reportType?: string;
      status?: string;
    }
  ): Promise<ReportsResponse> => {
    // Slim SELECT (ELE-946): explicit columns + only the JSONB sub-keys the
    // list/dashboard read (`getTypeLabel` reads systemCategory, MyReports
    // reads inspectionDate / dateOfInspection / satisfactoryForContinuedUse).
    const LIST_SELECT =
      'id, report_id, report_type, certificate_number, client_name, ' +
      'installation_address, inspector_name, inspection_date, status, ' +
      'updated_at, customer_id, edit_version, pdf_url, pdf_generated_at, ' +
      'data_inspectionDate:data->inspectionDate, ' +
      'data_dateOfInspection:data->dateOfInspection, ' +
      'data_satisfactoryForContinuedUse:data->satisfactoryForContinuedUse, ' +
      'data_systemCategory:data->systemCategory';

    try {
      const page = options?.page || 1;
      const pageSize = options?.pageSize || 20;
      const offset = (page - 1) * pageSize;
      const includeAutoDrafts = options?.includeAutoDrafts ?? false;
      const reportTypeFilter =
        options?.reportType && options.reportType !== 'all' ? options.reportType : null;
      const statusFilter = options?.status && options.status !== 'all' ? options.status : null;

      // Get total count (excluding auto-drafts by default)
      let countQuery = supabase
        .from('reports')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .is('deleted_at', null);

      if (!includeAutoDrafts) {
        countQuery = countQuery.neq('status', 'auto-draft');
      }
      if (reportTypeFilter) countQuery = countQuery.eq('report_type', reportTypeFilter);
      if (statusFilter) countQuery = countQuery.eq('status', statusFilter);

      const { count, error: countError } = await countQuery;

      if (countError) throw countError;

      // Get paginated data (excluding auto-drafts by default) — slim columns only
      let query = supabase
        .from('reports')
        .select(LIST_SELECT)
        .eq('user_id', userId)
        .is('deleted_at', null)
        .order('updated_at', { ascending: false });

      if (!includeAutoDrafts) {
        query = query.neq('status', 'auto-draft');
      }
      if (reportTypeFilter) query = query.eq('report_type', reportTypeFilter);
      if (statusFilter) query = query.eq('status', statusFilter);

      // Apply pagination or limit
      if (options?.limit) {
        query = query.limit(options.limit);
      } else {
        query = query.range(offset, offset + pageSize - 1);
      }

      const { data, error } = await query;

      if (error) throw error;

      const totalCount = count || 0;
      // Re-shape rows so consumers can keep reading `report.data?.<key>` —
      // the slim SELECT returns plucked JSONB values as flat top-level
      // aliases (`data_inspectionDate`, etc.) which we fold back under `data`.
      type SlimRow = Record<string, unknown> & {
        data_inspectionDate?: unknown;
        data_dateOfInspection?: unknown;
        data_satisfactoryForContinuedUse?: unknown;
        data_systemCategory?: unknown;
      };
      const reports = ((data || []) as SlimRow[]).map((row) => {
        const {
          data_inspectionDate,
          data_dateOfInspection,
          data_satisfactoryForContinuedUse,
          data_systemCategory,
          ...rest
        } = row;
        return {
          ...rest,
          data: {
            inspectionDate: data_inspectionDate,
            dateOfInspection: data_dateOfInspection,
            satisfactoryForContinuedUse: data_satisfactoryForContinuedUse,
            systemCategory: data_systemCategory,
          },
        } as CloudReport;
      });
      const hasMore = offset + reports.length < totalCount;

      return { reports, totalCount, hasMore };
    } catch (error) {
      console.error('[reportCloud] Failed to fetch user reports:', error);
      return { reports: [], totalCount: 0, hasMore: false };
    }
  },

  /**
   * Get per-type and per-status counts across the user's ENTIRE library.
   * Used by the certificates list to show accurate tab counts (e.g. "EIC (12)")
   * regardless of pagination. Without this, tab counts only reflect whatever
   * was in the first paginated page — which is misleading for users with
   * 100+ certs.
   */
  getReportCounts: async (
    userId: string,
    options?: { includeAutoDrafts?: boolean }
  ): Promise<{
    total: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
  }> => {
    try {
      const includeAutoDrafts = options?.includeAutoDrafts ?? false;
      let query = supabase
        .from('reports')
        .select('report_type, status')
        .eq('user_id', userId)
        .is('deleted_at', null);

      if (!includeAutoDrafts) {
        query = query.neq('status', 'auto-draft');
      }

      const { data, error } = await query;
      if (error) throw error;

      const byType: Record<string, number> = {};
      const byStatus: Record<string, number> = {};
      (data || []).forEach((row) => {
        const t = (row as { report_type?: string }).report_type || 'unknown';
        const s = (row as { status?: string }).status || 'unknown';
        byType[t] = (byType[t] || 0) + 1;
        byStatus[s] = (byStatus[s] || 0) + 1;
      });
      return { total: (data || []).length, byType, byStatus };
    } catch (error) {
      console.error('[reportCloud] Failed to fetch report counts:', error);
      return { total: 0, byType: {}, byStatus: {} };
    }
  },

  /**
   * Find the user's most recent completed cert at a given installation address.
   * Powers the "Use details from last cert at this address?" prompt — keeps
   * supply / earthing / BS amendment data flowing forward without re-typing.
   * Returns null if nothing matches or address is empty.
   */
  getLastCertificateAtAddress: async (
    userId: string,
    address: string,
    certType: ReportType,
    excludeReportId?: string
  ): Promise<CloudReport | null> => {
    const trimmed = (address || '').trim();
    if (!trimmed) return null;

    try {
      let query = supabase
        .from('reports')
        .select(
          'id, report_id, report_type, certificate_number, client_name, installation_address, inspector_name, inspection_date, status, updated_at, data, customer_id, edit_version'
        )
        .eq('user_id', userId)
        .eq('report_type', certType)
        .is('deleted_at', null)
        .neq('status', 'auto-draft')
        .ilike('installation_address', `%${trimmed}%`)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (excludeReportId) {
        query = query.neq('report_id', excludeReportId);
      }

      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return (data as CloudReport) || null;
    } catch (error) {
      console.warn('[reportCloud] getLastCertificateAtAddress failed:', error);
      return null;
    }
  },

  /**
   * Create a new report
   * @param isAutoSync - If true, creates with 'auto-draft' status (won't show in Recent Certs until manually saved)
   */
  createReport: async (
    userId: string,
    reportType: ReportType,
    data: Record<string, unknown>,
    customerId?: string,
    isAutoSync: boolean = false
  ): Promise<{ success: boolean; reportId?: string; error?: unknown }> => {
    try {
      // Calculate status based on form data - handles all report types
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
        // EV Charging specific: check for installer signature
        if (reportType === 'ev-charging' && data.installerSignature && data.installationDate)
          return 'completed';
        // Fire Alarm specific
        if (reportType === 'fire-alarm' && data.installerSignature && data.commissioningDate)
          return 'completed';
        // Fire Alarm Design (G1)
        if (reportType === 'fire-alarm-design' && data.designerSignature && data.designerDate)
          return 'completed';
        // Fire Alarm Commissioning (G3)
        if (
          reportType === 'fire-alarm-commissioning' &&
          data.commissionerSignature &&
          data.commissioningDate
        )
          return 'completed';
        // Fire Alarm Inspection (G6)
        if (
          reportType === 'fire-alarm-inspection' &&
          data.inspectorSignature &&
          data.inspectionDate
        )
          return 'completed';
        // Fire Alarm Modification (G7)
        if (
          reportType === 'fire-alarm-modification' &&
          data.modifierSignature &&
          data.modificationDate
        )
          return 'completed';
        // Emergency Lighting specific
        if (reportType === 'emergency-lighting' && data.engineerSignature && data.testDate)
          return 'completed';
        // PAT Testing specific
        if (reportType === 'pat-testing' && data.testerSignature && data.testDate)
          return 'completed';
        // BESS specific
        if (reportType === 'bess' && data.installerSignature && data.commissioningDate)
          return 'completed';
        // Lightning Protection specific
        if (reportType === 'lightning-protection' && data.inspectorSignature && data.overallResult)
          return 'completed';
        // G98/G99 commissioning
        if (
          (reportType === 'g98-commissioning' || reportType === 'g99-commissioning') &&
          data.installerSignature
        )
          return 'completed';
        // Smoke & CO Alarm
        if (reportType === 'smoke-co-alarm' && data.installerSignature) return 'completed';
        // Testing Only
        if (reportType === 'testing-only' && data.testerSignature) return 'completed';
        // Labels & Warnings types
        if (reportType === 'danger-notice' && data.contractorSignature) return 'completed';
        if (reportType === 'isolation-cert' && data.personIsolatingSignature) return 'completed';
        if (reportType === 'permit-to-work' && data.authorisedBySignature) return 'completed';
        if (reportType === 'safe-isolation' && data.personSignature) return 'completed';
        if (reportType === 'warning-labels') return 'completed';
        // Check for any meaningful data entry (works for all report types)
        const hasContent =
          data.clientName ||
          data.inspectionDate ||
          data.workDate || // Minor Works date field
          data.dateOfInspection || // EICR date field
          data.installationDate || // EV Charging date field
          data.testDate || // Fire/Emergency/PAT date field
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
        installation_address:
          data.installationAddress || data.propertyAddress || data.premisesAddress || null,
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
  updateReport: async (
    reportId: string,
    userId: string,
    data: Record<string, unknown>,
    customerId?: string,
    isAutoSync: boolean = false
  ): Promise<{ success: boolean; error?: unknown }> => {
    try {
      // Determine report type from reportId prefix
      const lc = reportId.toLowerCase();
      const reportType = lc.startsWith('fire-alarm-modification')
        ? 'fire-alarm-modification'
        : lc.startsWith('fire-alarm-inspection')
          ? 'fire-alarm-inspection'
          : lc.startsWith('fire-alarm-commissioning')
            ? 'fire-alarm-commissioning'
            : lc.startsWith('fire-alarm-design')
              ? 'fire-alarm-design'
              : lc.startsWith('fire-alarm')
                ? 'fire-alarm'
                : lc.startsWith('emergency-lighting')
                  ? 'emergency-lighting'
                  : lc.startsWith('ev-charging')
                    ? 'ev-charging'
                    : lc.startsWith('bess')
                      ? 'bess'
                      : lc.startsWith('pat-testing')
                        ? 'pat-testing'
                        : lc.startsWith('lightning-protection')
                          ? 'lightning-protection'
                          : lc.startsWith('g98')
                            ? 'g98-commissioning'
                            : lc.startsWith('g99')
                              ? 'g99-commissioning'
                              : lc.startsWith('smoke-co')
                                ? 'smoke-co-alarm'
                                : lc.startsWith('testing-only')
                                  ? 'testing-only'
                                  : lc.startsWith('danger-notice')
                                    ? 'danger-notice'
                                    : lc.startsWith('isolation-cert')
                                      ? 'isolation-cert'
                                      : lc.startsWith('permit-to-work')
                                        ? 'permit-to-work'
                                        : lc.startsWith('safe-isolation')
                                          ? 'safe-isolation'
                                          : lc.startsWith('warning-labels')
                                            ? 'warning-labels'
                                            : lc.startsWith('minor-works')
                                              ? 'minor-works'
                                              : lc.startsWith('eic-')
                                                ? 'eic'
                                                : 'eicr';

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
        if (reportType === 'testing-only' && data.testerSignature) return 'completed';
        const hasContent =
          data.clientName ||
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

      const updateData: Record<string, unknown> = {
        status,
        client_name: data.clientName || null,
        installation_address:
          data.installationAddress || data.propertyAddress || data.premisesAddress || null,
        inspection_date: data.inspectionDate || data.workDate || null,
        inspector_name: data.inspectorName || data.contractorName || null,
        data: data,
        pdf_payload: null, // Clear stale formatted data — will be re-populated on next PDF generation
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
  getReportData: async (
    reportId: string,
    userId: string
  ): Promise<Record<string, unknown> | null> => {
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
  getReportDataWithId: async (
    reportId: string,
    userId: string
  ): Promise<{
    data: Record<string, unknown>;
    databaseId: string;
    updatedAt?: string;
    lastSyncedAt?: string;
  } | null> => {
    try {
      const { data: report, error } = await supabase
        .from('reports')
        .select('id, data, updated_at, last_synced_at')
        .eq('report_id', reportId)
        .eq('user_id', userId)
        .is('deleted_at', null)
        .maybeSingle();

      if (error) throw error;
      if (!report) return null;

      return {
        data: report.data || {},
        databaseId: report.id,
        updatedAt: report.updated_at,
        lastSyncedAt: report.last_synced_at,
      };
    } catch (error) {
      console.error('[reportCloud] Failed to fetch report data with ID:', error);
      return null;
    }
  },

  /**
   * Soft delete a report using secure RPC function
   */
  softDeleteReport: async (
    reportId: string,
    userId: string
  ): Promise<{ success: boolean; error?: unknown }> => {
    try {
      // Call the secure RPC function that bypasses RLS "returning" issues
      const { data, error } = await supabase.rpc('soft_delete_report', {
        p_user_id: userId,
        p_report_id: reportId,
      });

      if (error) {
        console.error('[reportCloud] RPC error:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
        return {
          success: false,
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint,
          },
        };
      }

      // Parse the JSONB response from the RPC function
      const result = data as {
        success: boolean;
        error?: string;
        message: string;
        already_deleted?: boolean;
      };

      if (!result.success) {
        console.error('[reportCloud] RPC returned error:', result);
        return {
          success: false,
          error: {
            message: result.message,
            code: result.error,
          },
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
  findReportByCertificateNumber: async (
    userId: string,
    certificateNumber: string
  ): Promise<CloudReport | null> => {
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
  getEditVersion: async (
    reportId: string,
    userId: string
  ): Promise<{ version: number; updatedAt: string } | null> => {
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
        updatedAt: data?.updated_at,
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
    data: Record<string, unknown>,
    expectedVersion: number,
    customerId?: string,
    isAutoSync: boolean = false
  ): Promise<{ success: boolean; conflict?: VersionConflict; error?: unknown }> => {
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
        return data.clientName || data.inspectionDate || data.workDate ? 'in-progress' : 'draft';
      };

      // No conflict, proceed with update
      const updateData: Record<string, unknown> = {
        status: calculateStatus(),
        client_name: data.clientName || null,
        installation_address:
          data.installationAddress || data.propertyAddress || data.premisesAddress || null,
        inspection_date: data.inspectionDate || data.workDate || null,
        inspector_name: data.inspectorName || data.contractorName || null,
        data: data,
        pdf_payload: null, // Clear stale formatted data — will be re-populated on next PDF generation
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
