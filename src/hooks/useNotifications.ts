import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { QUERY_KEYS } from '@/lib/queryConfig';
import { recordBuildingRegsOnCertificate, TRACKER_DATA_KEYS } from '@/utils/notificationHelper';
import { readEdgeFunctionError } from '@/lib/edgeFunctionError';

export type NotificationStatus =
  | 'pending'
  | 'in-progress'
  | 'submitted'
  | 'overdue'
  | 'cancelled'
  | 'not_required';

export interface Notification {
  id: string;
  user_id: string;
  report_id: string;
  work_type: string;
  notification_status: NotificationStatus;
  building_control_authority: string | null;
  submission_deadline: string | null;
  napit_submitted: boolean;
  niceic_submitted: boolean;
  local_authority_submitted: boolean;
  created_at: string;
  submitted_at: string | null;
  /*
   * ELE-1616 — the certificate the SCHEME returns after submission (the PDF
   * NAPIT hands back). Nullable: most rows will never have one, and it is
   * attached long after the notification row is created.
   */
  scheme_certificate_url: string | null;
  scheme_certificate_name: string | null;
  scheme_certificate_ref: string | null;
  scheme_certificate_uploaded_at: string | null;
  /** The one-line "notified to Building Control" email to the client, if sent. */
  client_notified_at: string | null;
  client_notified_to: string | null;
  reports?: {
    id: string;
    report_id: string;
    certificate_number: string;
    client_name: string | null;
    installation_address: string | null;
    report_type: string;
    status: string;
    pdf_url?: string | null;
    pdf_generated_at?: string | null;
    data: {
      clientEmail?: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    } | null;
  };
}

/** How the electrician told Building Control. */
export type SubmissionRoute =
  | { via: 'napit' | 'niceic' | 'scheme'; reference?: string }
  | { via: 'direct'; reference?: string; authority?: string | null };

export const useNotifications = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: QUERY_KEYS.NOTIFICATIONS,
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: notificationsData, error: notificationsError } = await supabase
        .from('part_p_notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('submission_deadline', { ascending: true });

      if (notificationsError) throw notificationsError;

      const reportIds = notificationsData?.map((n) => n.report_id).filter(Boolean) || [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let reportsMap: Record<string, any> = {};
      if (reportIds.length > 0) {
        // Only the handful of certificate keys the page reads — never the
        // whole `data` blob (schedules of tests run to hundreds of KB).
        // `->>` returns text, which every reader here accepts ("true" counts).
        const dataCols = TRACKER_DATA_KEYS.map((k) => `d_${k}:data->>${k}`).join(', ');
        const { data: reportsData, error: reportsError } = await supabase
          .from('reports')
          .select(
            `id, report_id, certificate_number, client_name, installation_address, report_type, status, pdf_url, pdf_generated_at, ${dataCols}`
          )
          .in('report_id', reportIds)
          .is('deleted_at', null);
        if (reportsError) throw reportsError;

        if (reportsData) {
          reportsMap = Object.fromEntries(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (reportsData as any[]).map((row) => {
              const data: Record<string, unknown> = {};
              for (const k of TRACKER_DATA_KEYS) {
                const v = row[`d_${k}`];
                if (v !== null && v !== undefined) data[k] = v;
                delete row[`d_${k}`];
              }
              return [row.report_id, { ...row, data }];
            })
          );
        }
      }

      /*
       * ⚠️ `as unknown as` — the generated `types.ts` predates the ELE-1616
       * `scheme_certificate_*` columns and the `not_required` status, so the
       * row type no longer overlaps `Notification`. The columns are real; the
       * query is `select('*')` and returns them.
       *
       * A row whose certificate has been deleted is dropped here: there is
       * nothing to submit for a certificate that no longer exists, and it
       * used to render as a blank "Electrical Work" card that counted as
       * overdue.
       */
      return (notificationsData || [])
        .map((notification) => ({
          ...notification,
          reports: reportsMap[notification.report_id] || undefined,
        }))
        .filter((n) => !!n.reports) as unknown as Notification[];
    },
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  };

  /** Plain row update. Silent on success — the caller says what happened. */
  const updateNotification = async (id: string, updates: Partial<Notification>) => {
    try {
      const { data, error } = await supabase
        .from('part_p_notifications')
        // Same reason as the cast above — the generated row type is behind.
        .update(updates as never)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      invalidate();
      return data;
    } catch (error) {
      toast({
        title: 'Could not update',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  /**
   * Submitted — closes the tracker row AND records the route and reference on
   * the certificate, so the printed Part P section says the same thing.
   */
  const markSubmitted = async (n: Notification, route: SubmissionRoute) => {
    const reference = route.reference?.trim() || null;
    await updateNotification(n.id, {
      notification_status: 'submitted',
      submitted_at: new Date().toISOString(),
      napit_submitted: route.via === 'napit',
      niceic_submitted: route.via === 'niceic',
      local_authority_submitted: route.via === 'direct',
      building_control_authority:
        route.via === 'direct' && route.authority ? route.authority : n.building_control_authority,
      // The typed reference is the row's reference — unless the scheme's
      // returned PDF is attached, in which case that file owns it.
      ...(reference || !n.scheme_certificate_url ? { scheme_certificate_ref: reference } : {}),
    });
    const wb = await recordBuildingRegsOnCertificate(n.report_id, {
      required: true,
      viaScheme: route.via !== 'direct',
      direct: route.via === 'direct',
      reference,
    });
    if (!wb.ok) {
      toast({
        title: 'Tracker updated, certificate not',
        description: `The notification is marked submitted, but the certificate could not be updated: ${wb.error}`,
        variant: 'destructive',
      });
    }
    invalidate();
  };

  /** The work turned out not to be notifiable — close the row and say so on the certificate. */
  const markNotRequired = async (n: Notification) => {
    await updateNotification(n.id, { notification_status: 'not_required' });
    const wb = await recordBuildingRegsOnCertificate(n.report_id, { required: false });
    if (!wb.ok) {
      toast({
        title: 'Tracker updated, certificate not',
        description: `Marked not required here, but the certificate could not be updated: ${wb.error}`,
        variant: 'destructive',
      });
    }
    invalidate();
  };

  /**
   * Undo — back to "to submit". The certificate goes back to notifiable, not
   * yet notified. A typed reference goes with it unless the scheme's returned
   * PDF is attached, in which case the reference belongs to that file.
   */
  const reopen = async (n: Notification) => {
    await updateNotification(n.id, {
      notification_status: 'pending',
      submitted_at: null,
      napit_submitted: false,
      niceic_submitted: false,
      local_authority_submitted: false,
      ...(n.scheme_certificate_url ? {} : { scheme_certificate_ref: null }),
    });
    await recordBuildingRegsOnCertificate(n.report_id, {
      required: true,
      viaScheme: false,
      direct: false,
      reference: null,
    });
    invalidate();
  };

  /**
   * The reference arrives after the portal visit. Saving it here records it on
   * the row AND the certificate (it prints on the EIC and the Minor Works).
   */
  const saveReference = async (n: Notification, reference: string) => {
    const ref = reference.trim();
    await updateNotification(n.id, { scheme_certificate_ref: ref || null });
    const wb = await recordBuildingRegsOnCertificate(n.report_id, {
      required: true,
      viaScheme: !n.local_authority_submitted,
      direct: n.local_authority_submitted,
      reference: ref || null,
    });
    if (!wb.ok) {
      toast({
        title: 'Saved here, not on the certificate',
        description: wb.error,
        variant: 'destructive',
      });
    }
    invalidate();
  };

  /** Email the client that the work has been notified (server builds and sends it). */
  const notifyClient = async (n: Notification, recipientEmail?: string) => {
    const { data, error } = await supabase.functions.invoke('send-part-p-client-notice', {
      body: { notificationId: n.id, recipientEmail },
    });
    if (error) {
      // A 4xx from the function carries the reason ("no client email address");
      // the client's generic "non-2xx" message would hide it.
      const failure = await readEdgeFunctionError(error);
      throw new Error(failure?.error || failure?.message || error.message || 'Could not send the email');
    }
    if (data?.error) throw new Error(String(data.error));
    invalidate();
    return data as { ok: true; to: string };
  };

  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase.from('part_p_notifications').delete().eq('id', id);
      if (error) throw error;
      invalidate();
      toast({ title: 'Removed', description: 'The notification has been removed from the tracker.' });
    } catch (error) {
      toast({
        title: 'Could not remove',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    notifications: notifications || [],
    isLoading,
    updateNotification,
    markSubmitted,
    markNotRequired,
    reopen,
    saveReference,
    notifyClient,
    deleteNotification,
  };
};
