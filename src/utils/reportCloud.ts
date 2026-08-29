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
  | 'disconnection'
  | 'bess'
  | 'lightning-protection'
  | 'g98-commissioning'
  | 'g99-commissioning'
  | 'smoke-co-alarm'
  | 'heat-pump'
  | 'testing-only'
  /*
   * A visual condition report (ELE-1262). Visual inspection only, no testing —
   * requested because a Minor Works Certificate is the wrong document for work
   * that is neither an addition nor an alteration.
   *
   * 🔴 It is NOT a BS 7671 model form and the app must never imply it is.
   */
  | 'visual-condition'
  /*
   * A routine maintenance visit record, with an optional thermographic survey
   * (ELE-1110). For the yearly service-contract work electricians sell.
   *
   * 🔴 Also NOT a BS 7671 model form — nothing in BS 7671 governs thermography
   * at all. Its standing is Regulation 4(2) of the Electricity at Work
   * Regulations 1989.
   */
  | 'routine-inspection'
  /*
   * An advisory, photo-led survey for someone BUYING a house (ELE-1634). Runs
   * on the visual condition chassis with an AI drafting a note against each
   * photograph, which the electrician then edits and accepts.
   *
   * 🔴 Also not a BS 7671 model form, and the one type whose reader is not a
   * tradesperson — a buyer has no way to tell a visual survey from a condition
   * report unless the document says so, so it says so on every copy.
   */
  | 'pre-purchase-survey'
  // A board schedule is issued to a client, kept on file and emailed exactly
  // like a certificate, so it is a report row rather than a parallel mechanism
  // (ELE-1615). It is the record of a board's layout, not a declaration of
  // condition — see the completion rule below.
  | 'board-schedule'
  // An Annex H log book export is a certificate in every way that matters:
  // it is generated, saved, downloaded and emailed the same way, so it is a
  // report row rather than a parallel mechanism (ELE-1483).
  | 'fire-alarm-log-book';

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
  // Lock + versioning (ELE-1037)
  locked_at?: string | null;
  parent_report_id?: string | null;
  superseded_by?: string | null;
  // ELE-1421 — team attribution. Only ever set on rows from the company library
  // (get_my_certificate_library); the personal path leaves these undefined.
  /** Owner of the cert. Differs from the signed-in user only on team rows. */
  owner_id?: string;
  /** Display name of the team member whose cert this is. Null on own certs. */
  owner_name?: string | null;
  /** True when this cert belongs to a team member, not the signed-in user. */
  is_team_cert?: boolean;
  qs_review_status?: 'pending' | 'approved' | 'returned' | 'cancelled' | null;
  qs_reviewer_name?: string | null;
}

/** Which slice of the company library to load. */
export type LibraryScope = 'all' | 'mine' | 'team';

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

// Reports we've already pinged the originator about this session (a QS editing a
// team member's cert). Keeps the "your cert was edited" notification to once per
// report per session — the RPC also dedupes server-side (6h) as a backstop.
const qsEditNotified = new Set<string>();

type ReportStatus = 'auto-draft' | 'draft' | 'in-progress' | 'completed';

/**
 * The library columns (My Certificates, dashboard, customer tabs) read
 * reports.inspection_date and reports.inspector_name. The old chains only knew
 * the EIC/EICR/Minor-Works key names, so every specialist certificate wrote
 * NULL to both and showed as an undated, unattributed row. These chains keep
 * the original keys FIRST — existing behaviour is unchanged — and fall back to
 * the specialist certs' own key names.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reportInspectionDate = (data: Record<string, any>): string | null =>
  data.inspectionDate ||
  data.workDate ||
  data.dateOfInspection ||
  data.testDate ||            // emergency lighting, PAT, testing-only
  data.commissioningDate ||   // BESS, fire alarm, heat pump
  data.installationDate ||    // EV charging, smoke/CO
  data.designerDate ||        // fire alarm G1
  data.modificationDate ||    // fire alarm G7
  data.notificationDate ||    // G98 / G99
  null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reportInspectorName = (data: Record<string, any>): string | null =>
  data.inspectorName ||
  data.contractorName ||
  data.testerName ||          // emergency lighting, PAT, testing-only, lightning
  data.installerName ||       // G98/G99, BESS, fire alarm, smoke/CO
  data.engineerName ||
  data.commissionerName ||    // fire alarm G3
  data.designerName ||        // fire alarm G1
  null;

/**
 * reportId prefix -> report type. Extracted from updateReport so
 * updateReportWithVersionCheck can derive the same value: that function never
 * had `reportType` in scope, which is why the per-type completion rules could
 * not live there.
 */
const reportTypeFromId = (reportId: string): string => {
  const lc = reportId.toLowerCase();
  return lc.startsWith('pre-purchase-survey')
    ? 'pre-purchase-survey'
    : lc.startsWith('visual-condition')
    ? 'visual-condition'
    : lc.startsWith('routine-inspection')
    ? 'routine-inspection'
    : lc.startsWith('board-schedule')
    ? 'board-schedule'
    : lc.startsWith('fire-alarm-modification')
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
                              : lc.startsWith('disconnection')
                              ? 'disconnection'
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
                                        : lc.startsWith('fa-logbook')
                                          ? 'fire-alarm-log-book'
                                          : lc.startsWith('minor-works')
                                          ? 'minor-works'
                                          : lc.startsWith('eic-')
                                            ? 'eic'
                                            : 'eicr';
};

/**
 * THE status rule for every report, used by createReport, updateReport and
 * updateReportWithVersionCheck alike.
 *
 * These three had drifted into three different rule sets: createReport carried
 * all 22 per-type completion rules, updateReport carried 4, and
 * updateReportWithVersionCheck — the path every autosave actually writes
 * through (useReportSync) — carried none. The effect on live data was that a
 * signed specialist certificate could never reach 'completed' after its first
 * autosave, and one that had been marked completed on the row was demoted on
 * the next save. Keep this function as the single source of truth; do not
 * re-inline it.
 *
 * `currentStatus` is undefined on create and the stored status on update, which
 * is what distinguishes "a new auto-sync row starts as auto-draft" from "an
 * auto-sync over an existing auto-draft leaves it alone".
 */
const calculateReportStatus = ({
  data,
  reportType,
  isAutoSync,
  currentStatus,
}: {
  data: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  reportType: string;
  isAutoSync: boolean;
  currentStatus?: string;
}): ReportStatus => {
  // New auto-sync rows start as auto-draft; an auto-sync over an existing
  // auto-draft keeps it. Both preserved exactly as the three callers had them.
  if (isAutoSync && (currentStatus === undefined || currentStatus === 'auto-draft')) {
    return 'auto-draft';
  }
  // Never demote an already-completed report.
  if (currentStatus === 'completed') return 'completed';

  if (data.status === 'completed') return 'completed';
  if (data.certificateGenerated) return 'completed';
  // EICR
  if (data.satisfactoryForContinuedUse && data.inspectorSignature) return 'completed';
  if (reportType === 'minor-works' && data.signature && data.workDate) return 'completed';
  if (reportType === 'ev-charging' && data.installerSignature && data.installationDate)
    return 'completed';
  if (reportType === 'fire-alarm' && data.installerSignature && data.commissioningDate)
    return 'completed';
  if (reportType === 'fire-alarm-design' && data.designerSignature && data.designerDate)
    return 'completed';
  if (
    reportType === 'fire-alarm-commissioning' &&
    data.commissionerSignature &&
    data.commissioningDate
  )
    return 'completed';
  if (reportType === 'fire-alarm-inspection' && data.inspectorSignature && data.inspectionDate)
    return 'completed';
  if (reportType === 'fire-alarm-modification' && data.modifierSignature && data.modificationDate)
    return 'completed';
  if (reportType === 'emergency-lighting' && data.engineerSignature && data.testDate)
    return 'completed';
  if (reportType === 'pat-testing' && data.testerSignature && data.testDate) return 'completed';
  if (reportType === 'bess' && data.installerSignature && data.commissioningDate)
    return 'completed';
  if (reportType === 'lightning-protection' && data.inspectorSignature && data.overallResult)
    return 'completed';
  if (
    (reportType === 'g98-commissioning' || reportType === 'g99-commissioning') &&
    data.installerSignature
  )
    return 'completed';
  if (reportType === 'smoke-co-alarm' && data.installerSignature) return 'completed';
  if (reportType === 'heat-pump' && data.engineerSignature && data.commissioningDate)
    return 'completed';
  // Needs someone to have identified WHO the results belong to, not just a
  // signature. `testerSignature` alone flipped a cert to 'completed' as soon as
  // signature autofill populated it, which happens without the user finishing
  // anything: 33 of 36 'completed' testing-only certs carry neither a client
  // name nor an address, and 31 have no PDF.
  //
  // testDate and testerName are deliberately NOT the second condition even
  // though pat-testing pairs on testDate — both are present on all 36,
  // hollow and genuine alike, so neither discriminates. Client name or address
  // is what actually separates the three real certificates from the rest.
  if (
    reportType === 'testing-only' &&
    data.testerSignature &&
    (data.clientName || data.installationAddress)
  )
    return 'completed';
  // A log book export is not a form someone fills in over time — it is a
  // snapshot of a record that already exists, generated complete or not at all.
  // So it completes on having a premises to identify it, with no signature
  // condition: the countersignatures on the document are optional, and gating
  // on one would leave every unsigned export sat as a draft forever.
  if (reportType === 'fire-alarm-log-book' && (data.premises_name || data.building_name))
    return 'completed';
  /*
   * A board schedule carries NO signature field and never will: it records the
   * arrangement of a board, it is not a declaration that the installation is
   * safe, and the document says so in as many words. Gating completion on a
   * signature would leave every schedule ever produced sitting as a draft.
   *
   * It is complete when it identifies a board and describes at least one
   * circuit — the same test the page applies before it will render a PDF.
   */
  if (
    reportType === 'board-schedule' &&
    data.boardRef &&
    Array.isArray(data.circuits) &&
    data.circuits.some((c: { description?: string }) => c?.description)
  )
    return 'completed';
  /*
   * A visual condition report completes on being SIGNED after the walk round —
   * both, deliberately. A signature with no inspection is a signed blank form,
   * and a completed schedule nobody put their name to is not issued work.
   */
  if (
    reportType === 'visual-condition' &&
    data.inspectorSignature &&
    Array.isArray(data.inspectionItems) &&
    data.inspectionItems.some((i: { outcome?: string }) => i?.outcome)
  )
    return 'completed';
  /*
   * A routine inspection completes on the same two-part test: SIGNED after the
   * visit actually happened. A signature with no schedule is a signed blank
   * form; a walked schedule nobody put their name to is not issued work.
   *
   * The thermal survey is deliberately NOT part of this. Most visits will not
   * include one, and requiring it would leave the majority of genuinely
   * finished reports stuck as drafts.
   */
  if (
    reportType === 'routine-inspection' &&
    data.inspectorSignature &&
    Array.isArray(data.inspectionItems) &&
    data.inspectionItems.some((i: { outcome?: string }) => i?.outcome)
  )
    return 'completed';
  /*
   * A pre-purchase survey completes on being SIGNED with at least one finding
   * the surveyor has ACCEPTED.
   *
   * 🔴 `accepted` is the point, not `findings.length`. A report can hold twenty
   * photographs carrying nothing but an AI's unreviewed guesses, and counting
   * those as a finished report is exactly the outcome this feature must not
   * produce — the buyer would be relying on something no electrician read.
   * Mirrors `acceptedFindings()` in types/pre-purchase-survey.ts.
   */
  if (
    reportType === 'pre-purchase-survey' &&
    data.surveyorSignature &&
    Array.isArray(data.findings) &&
    data.findings.some((f: { accepted?: boolean }) => f?.accepted)
  )
    return 'completed';
  if (reportType === 'disconnection' && data.inspectorSignature && data.workDate)
    return 'completed';
  if (reportType === 'danger-notice' && data.contractorSignature) return 'completed';
  if (reportType === 'isolation-cert' && data.personIsolatingSignature) return 'completed';
  if (reportType === 'permit-to-work' && data.authorisedBySignature) return 'completed';
  if (reportType === 'safe-isolation' && data.personSignature) return 'completed';
  if (reportType === 'warning-labels') return 'completed';

  const hasContent =
    data.clientName ||
    data.inspectionDate ||
    data.workDate ||
    data.dateOfInspection ||
    data.installationDate ||
    data.testDate ||
    data.installationAddress ||
    data.propertyAddress;
  return hasContent ? 'in-progress' : 'draft';
};

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
      // ELE-1236 — server-side date-range filter on updated_at (ISO strings),
      // for NAPIT/NICEIC assessments ("every cert in the last 12 months").
      dateFrom?: string;
      dateTo?: string;
    }
  ): Promise<ReportsResponse> => {
    // Slim SELECT (ELE-946): explicit columns + only the JSONB sub-keys the
    // list/dashboard read (`getTypeLabel` reads systemCategory, MyReports
    // reads inspectionDate / dateOfInspection / satisfactoryForContinuedUse).
    const LIST_SELECT =
      'id, report_id, report_type, certificate_number, client_name, ' +
      'installation_address, inspector_name, inspection_date, status, ' +
      'updated_at, customer_id, edit_version, pdf_url, pdf_generated_at, locked_at, ' +
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
        .is('deleted_at', null)
        // Hide superseded originals: Amending a locked cert marks the old
        // version superseded_by the new one. Showing both puts an identical-
        // looking old V1 next to its V2 — a real "sent the wrong one" hazard.
        // The current version always has superseded_by = null.
        .is('superseded_by', null);

      // ELE-1305 — 'draft' means both manual drafts and auto-saves: a filter
      // tab literally named "Drafts" showing 0 while 12 auto-saved forms exist
      // reads as "my certificates disappeared".
      const draftFilter = statusFilter === 'draft';
      if (!includeAutoDrafts && !draftFilter) {
        countQuery = countQuery.neq('status', 'auto-draft');
      }
      if (reportTypeFilter) countQuery = countQuery.eq('report_type', reportTypeFilter);
      if (statusFilter) {
        countQuery = draftFilter
          ? countQuery.in('status', ['draft', 'auto-draft'])
          : countQuery.eq('status', statusFilter);
      }
      if (options?.dateFrom) countQuery = countQuery.gte('updated_at', options.dateFrom);
      if (options?.dateTo) countQuery = countQuery.lte('updated_at', options.dateTo);

      const { count, error: countError } = await countQuery;

      if (countError) throw countError;

      // Get paginated data (excluding auto-drafts by default) — slim columns only
      let query = supabase
        .from('reports')
        .select(LIST_SELECT)
        .eq('user_id', userId)
        .is('deleted_at', null)
        .is('superseded_by', null) // current version only (see count query above)
        .order('updated_at', { ascending: false });

      if (!includeAutoDrafts && !draftFilter) {
        query = query.neq('status', 'auto-draft');
      }
      if (reportTypeFilter) query = query.eq('report_type', reportTypeFilter);
      if (statusFilter) {
        query = draftFilter
          ? query.in('status', ['draft', 'auto-draft'])
          : query.eq('status', statusFilter);
      }
      if (options?.dateFrom) query = query.gte('updated_at', options.dateFrom);
      if (options?.dateTo) query = query.lte('updated_at', options.dateTo);

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
        .is('deleted_at', null)
        // Match the list query, which hides superseded originals. Without this
        // the tabs counted V1 *and* V2 of every amended cert, so a tab read
        // "EICR 14" over a list of 12 and the numbers looked broken.
        .is('superseded_by', null);

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
   * ELE-1421 — the COMPANY certificate library: the caller's own certs plus
   * finished work by their team, in one server-paged query.
   *
   * This is the library path for EVERY account, not just company ones: for a
   * sole trader the RPC resolves no team and returns exactly the rows
   * getUserReports() would, so the library can't behave differently depending on
   * who is looking. getUserReports() remains as the caller's fallback.
   *
   * A team row is another person's record, so callers must treat `is_team_cert`
   * as read-only — see MyReports, which drops bulk mode and delete for them.
   *
   * Throws on failure rather than returning an empty page. An empty library and
   * a failed fetch look identical on screen, and "you have no certificates" is
   * the single most alarming lie this app can tell a user.
   */
  getCertificateLibrary: async (
    options?: {
      page?: number;
      pageSize?: number;
      reportType?: string;
      status?: string;
      dateFrom?: string;
      dateTo?: string;
      includeAutoDrafts?: boolean;
      scope?: LibraryScope;
    }
  ): Promise<ReportsResponse> => {
    const page = options?.page || 1;
    const pageSize = options?.pageSize || 20;
    const offset = (page - 1) * pageSize;
    const reportType =
      options?.reportType && options.reportType !== 'all' ? options.reportType : null;
    const status = options?.status && options.status !== 'all' ? options.status : null;

    // Called loosely — the RPC isn't in the generated Supabase types yet.
    const rpc = (supabase.rpc.bind(supabase) as unknown) as (
      fn: string,
      args: Record<string, unknown>
    ) => Promise<{ data: unknown; error: { message?: string } | null }>;

    const { data, error } = await rpc('get_my_certificate_library', {
      p_limit: pageSize,
      p_offset: offset,
      p_report_type: reportType,
      p_status: status,
      p_date_from: options?.dateFrom ?? null,
      p_date_to: options?.dateTo ?? null,
      p_include_auto_drafts: options?.includeAutoDrafts ?? false,
      p_scope: options?.scope ?? 'all',
    });

    if (error) {
      console.error('[reportCloud] Company library fetch failed:', error);
      throw new Error(error.message || 'Failed to load your certificates');
    }

    type LibraryRow = {
      total_count?: number;
      data_inspection_date?: unknown;
      data_date_of_inspection?: unknown;
      data_satisfactory_for_continued_use?: unknown;
      data_system_category?: unknown;
    } & Record<string, unknown>;

    const rows = (data ?? []) as LibraryRow[];
    // total_count is a window count — identical on every row, absent when empty.
    const totalCount = rows.length > 0 ? Number(rows[0].total_count ?? 0) : 0;

    const reports = rows.map((row) => {
      const {
        total_count: _total,
        data_inspection_date,
        data_date_of_inspection,
        data_satisfactory_for_continued_use,
        data_system_category,
        ...rest
      } = row;
      return {
        ...rest,
        data: {
          inspectionDate: data_inspection_date,
          dateOfInspection: data_date_of_inspection,
          satisfactoryForContinuedUse: data_satisfactory_for_continued_use,
          systemCategory: data_system_category,
        },
      } as CloudReport;
    });

    return { reports, totalCount, hasMore: offset + reports.length < totalCount };
  },

  /**
   * ELE-1421 — whole-library tab counts for getCertificateLibrary, spanning
   * every page so a tab never reads "EIC (0)" while page 3 holds twelve.
   */
  getCertificateLibraryCounts: async (options?: {
    includeAutoDrafts?: boolean;
    scope?: LibraryScope;
  }): Promise<{
    /** Whole visible library, ignoring scope — drives the Everyone/Mine/team chips. */
    total: number;
    mine: number;
    team: number;
    /** Count within the ACTIVE scope — drives the status row's "All" tab. */
    scopedTotal: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
  }> => {
    const empty = { total: 0, mine: 0, team: 0, scopedTotal: 0, byType: {}, byStatus: {} };
    try {
      // Called loosely — the RPC isn't in the generated Supabase types yet.
      const rpc = (supabase.rpc.bind(supabase) as unknown) as (
        fn: string,
        args: Record<string, unknown>
      ) => Promise<{ data: unknown; error: { message?: string } | null }>;

      const { data, error } = await rpc('get_my_certificate_library_counts', {
        p_include_auto_drafts: options?.includeAutoDrafts ?? false,
        p_scope: options?.scope ?? 'all',
      });
      if (error) throw error;
      return { ...empty, ...((data ?? {}) as Record<string, never>) };
    } catch (error) {
      // Counts only decorate the filter tabs — a failure here degrades the
      // numbers, it must not blank the list the way a thrown error would.
      console.error('[reportCloud] Library counts failed:', error);
      return empty;
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
    isAutoSync: boolean = false,
    /**
     * ELE-1592 — idempotency key. Supply the SAME `report_id` when retrying a
     * create that may already have landed, and this becomes safe to call twice.
     *
     * `report_id` is uniquely indexed (`reports_report_id_key`), so a repeat
     * insert is rejected by the database rather than producing a second row.
     * When omitted, one is generated as before.
     */
    presetReportId?: string
  ): Promise<{ success: boolean; reportId?: string; error?: unknown }> => {
    try {
      /*
       * ELE-1592 — strip the queue's idempotency marker unconditionally.
       *
       * `useReportSync` already removes it before calling, so this is a second
       * line of defence: it guarantees `__createReportId` can never be written
       * into a certificate's stored data no matter which caller passes it, and
       * means a future caller cannot leak it by forgetting.
       */
      if (
        Object.prototype.hasOwnProperty.call(data, '__createReportId') ||
        Object.prototype.hasOwnProperty.call(data, '_clientCertId')
      ) {
        const {
          __createReportId: _ignoredKey,
          _clientCertId: _ignoredIdentity,
          ...cleaned
        } = data as Record<string, unknown>;
        data = cleaned;
      }

      // Calculate status based on form data - handles all report types
      const status = calculateReportStatus({ data, reportType, isAutoSync });

      console.log('[reportCloud] Creating report:', {
        type: reportType,
        calculatedStatus: status,
        hasClientName: !!data.clientName,
        hasInspectionDate: !!data.inspectionDate,
        hasWorkDate: !!data.workDate,
      });

      /*
       * Allocate the certificate number here — this is the moment the report
       * first exists, and the only point at which a number is certainly wanted.
       *
       * The old fallback stamped `EICR-1786391571379` (a raw timestamp) whenever
       * the form had not produced a number yet, which is neither the house
       * format nor traceable. Generating on demand keeps every certificate on
       * the proper sequence.
       *
       * ELE-1542 — there is no longer a set of types "the RPC cannot serve":
       * `next_certificate_number` takes a prefix rather than a report type, so
       * every certificate type is numbered by the same per-account counter.
       * The random-id fallback now only fires when the round-trip itself fails.
       */
      let certificateNumber = (data.certificateNumber as string | undefined) || '';
      if (!certificateNumber) {
        const { generateCertificateNumber } = await import('@/utils/certificateNumbering');
        certificateNumber = await generateCertificateNumber(reportType);
        // Keep the payload consistent with the row we are about to write.
        data = { ...data, certificateNumber };
      }

      const reportData = {
        user_id: userId,
        report_type: reportType,
        certificate_number: certificateNumber,
        report_id:
          presetReportId ||
          `${reportType.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        status,
        customer_id: customerId || null,
        client_name: data.clientName || null,
        installation_address:
          data.installationAddress || data.propertyAddress || data.premisesAddress || null,
        inspection_date: reportInspectionDate(data),
        inspector_name: reportInspectorName(data),
        data: data,
        last_synced_at: new Date().toISOString(),
      };

      const { data: newReport, error } = await supabase
        .from('reports')
        .insert(reportData)
        .select('report_id')
        .single();

      if (error) {
        /*
         * ELE-1592 — the create already landed; this is a retry.
         *
         * `report_id` is uniquely indexed, so when the caller supplied one as
         * an idempotency key a repeat insert lands here instead of creating a
         * second row. Adopt the existing row and report success: the work is
         * already saved, and the caller only needs its id.
         *
         * ⚠️ Deliberately does NOT write `data` over the existing row. The
         * retry payload and the stored row are the same certificate by
         * definition — the id proves it — so there is nothing to merge, and
         * an update here would risk overwriting a newer autosave with the
         * stale snapshot that was queued at the moment of failure.
         *
         * Checked BEFORE the certificate-number branch below, because this is
         * the safe, provable case: identity by id, not by a number that two
         * different certificates can share.
         */
        if (
          error.code === '23505' &&
          presetReportId &&
          (error.message.includes('reports_report_id_key') ||
            error.message.includes('unique_user_report_id'))
        ) {
          console.log(
            '[reportCloud] Create retry — report already exists, adopting:',
            presetReportId
          );
          return { success: true, reportId: presetReportId };
        }

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
      const reportType = reportTypeFromId(reportId);

      // Get current status to check if it's an auto-draft.
      // No user_id filter (report_id is unique): a QS editing a team
      // member's cert must hit the OWNER's row — RLS decides access, and the
      // report_edit_log trigger attributes the change (Team Certificates).
      const { data: currentReport } = await supabase
        .from('reports')
        .select('status')
        .eq('report_id', reportId)
        .single();

      const currentStatus = currentReport?.status;

      // Calculate status - same logic as createReport
      const status = calculateReportStatus({ data, reportType, isAutoSync, currentStatus });

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
        inspection_date: reportInspectionDate(data),
        inspector_name: reportInspectorName(data),
        data: data,
        pdf_payload: null, // Clear stale formatted data — will be re-populated on next PDF generation
        last_synced_at: new Date().toISOString(),
      };

      // Set customer_id if provided
      if (customerId !== undefined) {
        updateData.customer_id = customerId;
      }

      /*
       * ELE-1598 — verify the update actually MATCHED a row.
       *
       * PostgREST does not error when an update matches zero rows; it returns
       * 204. Checking only `error` therefore reported a save that wrote
       * nothing as a success — the badge said "Saved" and the work was gone.
       *
       * Proven against a non-existent report_id: no error, HTTP 204,
       * `{ success: true }`. The same call with `.select()` returns 0 rows,
       * which is the signal that was there all along and unused.
       *
       * Reachable when the report was deleted on another device, after a
       * failed create left a stale id, or — worst — when RLS stops matching
       * mid-session (a team member's seat removed): the row still exists, is
       * simply invisible to this user, and every later save silently no-ops.
       *
       * ⚠️ `.select()` is safe here, checked against the live policies: for an
       * owner the SELECT policy (own AND deleted_at IS NULL) matches the
       * UPDATE USING clause exactly, and for a QS both additionally require
       * status <> 'auto-draft'. No update in this file sets `deleted_at`, and
       * a status change to 'auto-draft' only happens for the owner, whose
       * SELECT does not test status — so the row can never hide from its own
       * update.
       */
      const { data: updatedRows, error } = await supabase
        .from('reports')
        .update(updateData)
        .eq('report_id', reportId)
        .select('report_id');

      if (error) throw error;
      if (!updatedRows || updatedRows.length === 0) {
        throw new Error(
          `Update matched no rows for ${reportId} — the report is missing, deleted, or not visible to this user.`
        );
      }

      // If a QS/team member (not the owner) just edited this cert, tell the
      // originator. Fire-and-forget, once per report per session; the RPC no-ops
      // for own certs and for non-QS callers, and dedupes server-side. Called
      // loosely — the RPC isn't in the generated Supabase types yet.
      if (!qsEditNotified.has(reportId)) {
        qsEditNotified.add(reportId);
        (
          (supabase.rpc.bind(supabase) as unknown) as (
            fn: string,
            args: Record<string, unknown>
          ) => Promise<{ error: unknown }>
        )('notify_report_owner_of_qs_edit', { p_report_id: reportId }).then(({ error: rpcError }) => {
          if (rpcError) qsEditNotified.delete(reportId); // allow a retry next save
        });
      }

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
        .eq('report_id', reportId) // no user filter — RLS grants owner + team QS (Team Certificates)
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
      // No user_id filter — RLS grants the owner AND their team QS
      // (Team Certificates: the QS opens the member's cert in the editor).
      const { data: report, error } = await supabase
        .from('reports')
        .select('id, data, updated_at, last_synced_at')
        .eq('report_id', reportId)
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
        .eq('report_id', reportId) // no user filter — RLS grants owner + team QS (Team Certificates)
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
        .eq('report_id', reportId) // no user filter — RLS grants owner + team QS (Team Certificates)
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
   * Lock a report ("Issue & Lock"). Sets locked_at = now() so the cert becomes
   * read-only — autosave is gated off (see EICRFormProvider) and any change
   * requires a new version. Idempotent: re-locking leaves locked_at unchanged.
   */
  lockReport: async (
    reportId: string,
    userId: string
  ): Promise<{ success: boolean; lockedAt?: string; error?: unknown }> => {
    try {
      const { data: existing } = await supabase
        .from('reports')
        .select('locked_at')
        .eq('report_id', reportId) // no user filter — RLS grants owner + team QS (Team Certificates)
        .is('deleted_at', null)
        .single();

      if (existing?.locked_at) {
        return { success: true, lockedAt: existing.locked_at };
      }

      const lockedAt = new Date().toISOString();
      const { error } = await supabase
        .from('reports')
        .update({ locked_at: lockedAt })
        .eq('report_id', reportId) // no user filter — RLS grants owner + team QS (Team Certificates)
        .is('deleted_at', null);

      if (error) throw error;
      return { success: true, lockedAt };
    } catch (error) {
      console.error('[reportCloud] Failed to lock report:', error);
      return { success: false, error };
    }
  },

  /**
   * Read lock + version metadata for a report (keyed by report_id string).
   */
  getLockMeta: async (
    reportId: string,
    userId: string
  ): Promise<{
    id: string;
    lockedAt: string | null;
    parentReportId: string | null;
    supersededBy: string | null;
    editVersion: number;
    certificateNumber: string | null;
  } | null> => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('id, locked_at, parent_report_id, superseded_by, edit_version, certificate_number')
        .eq('report_id', reportId) // no user filter — RLS grants owner + team QS (Team Certificates)
        .is('deleted_at', null)
        .single();

      if (error) throw error;
      return {
        id: data?.id,
        lockedAt: data?.locked_at ?? null,
        parentReportId: data?.parent_report_id ?? null,
        supersededBy: data?.superseded_by ?? null,
        editVersion: data?.edit_version || 1,
        certificateNumber: data?.certificate_number ?? null,
      };
    } catch (error) {
      console.error('[reportCloud] Failed to get lock meta:', error);
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
        .eq('report_id', reportId) // no user filter — RLS grants owner + team QS (Team Certificates)
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

      // Get current status to check if it's an auto-draft.
      // No user_id filter (report_id is unique): a QS editing a team
      // member's cert must hit the OWNER's row — RLS decides access, and the
      // report_edit_log trigger attributes the change (Team Certificates).
      const { data: currentReport } = await supabase
        .from('reports')
        .select('status')
        .eq('report_id', reportId)
        .single();

      const currentStatus = currentReport?.status;

      // Calculate status - keep auto-draft if auto-sync and currently auto-draft
      // Single source of truth — see calculateReportStatus at the top of this file.
      // reportType is NOT a parameter of this function, so derive it the same
      // way updateReport does before the per-type rules can be applied.
      const reportType = reportTypeFromId(reportId);

      // No conflict, proceed with update
      const updateData: Record<string, unknown> = {
        status: calculateReportStatus({ data, reportType, isAutoSync, currentStatus }),
        client_name: data.clientName || null,
        installation_address:
          data.installationAddress || data.propertyAddress || data.premisesAddress || null,
        inspection_date: reportInspectionDate(data),
        inspector_name: reportInspectorName(data),
        data: data,
        pdf_payload: null, // Clear stale formatted data — will be re-populated on next PDF generation
        last_synced_at: new Date().toISOString(),
      };

      if (customerId !== undefined) {
        updateData.customer_id = customerId;
      }

      /*
       * ELE-1598 — verify the update actually MATCHED a row.
       *
       * PostgREST does not error when an update matches zero rows; it returns
       * 204. Checking only `error` therefore reported a save that wrote
       * nothing as a success — the badge said "Saved" and the work was gone.
       *
       * Proven against a non-existent report_id: no error, HTTP 204,
       * `{ success: true }`. The same call with `.select()` returns 0 rows,
       * which is the signal that was there all along and unused.
       *
       * Reachable when the report was deleted on another device, after a
       * failed create left a stale id, or — worst — when RLS stops matching
       * mid-session (a team member's seat removed): the row still exists, is
       * simply invisible to this user, and every later save silently no-ops.
       *
       * ⚠️ `.select()` is safe here, checked against the live policies: for an
       * owner the SELECT policy (own AND deleted_at IS NULL) matches the
       * UPDATE USING clause exactly, and for a QS both additionally require
       * status <> 'auto-draft'. No update in this file sets `deleted_at`, and
       * a status change to 'auto-draft' only happens for the owner, whose
       * SELECT does not test status — so the row can never hide from its own
       * update.
       */
      const { data: updatedRows, error } = await supabase
        .from('reports')
        .update(updateData)
        // no user filter — RLS grants owner + team QS (Team Certificates)
        .eq('report_id', reportId)
        .select('report_id');

      if (error) throw error;
      if (!updatedRows || updatedRows.length === 0) {
        throw new Error(
          `Update matched no rows for ${reportId} — the report is missing, deleted, or not visible to this user.`
        );
      }

      return { success: true };
    } catch (error) {
      console.error('[reportCloud] Failed to update report with version check:', error);
      return { success: false, error };
    }
  },
};
