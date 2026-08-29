import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { QUERY_PRESETS, QUERY_KEYS } from '@/lib/queryConfig';

export type NotificationStatus = 'pending' | 'in-progress' | 'submitted' | 'overdue' | 'cancelled';

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
  reports?: {
    id: string;
    report_id: string;
    certificate_number: string;
    client_name: string | null;
    installation_address: string | null;
    report_type: string;
    status: string;
    data: {
      clientEmail?: string;
      [key: string]: any;
    } | null;
  };
}

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

      // Get notifications
      const { data: notificationsData, error: notificationsError } = await supabase
        .from('part_p_notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('submission_deadline', { ascending: true });

      if (notificationsError) throw notificationsError;

      // Get related reports for all notifications
      const reportIds = notificationsData?.map((n) => n.report_id).filter(Boolean) || [];

      let reportsMap: Record<string, any> = {};
      if (reportIds.length > 0) {
        const { data: reportsData } = await supabase
          .from('reports')
          .select(
            'id, report_id, certificate_number, client_name, installation_address, report_type, status, pdf_url, pdf_generated_at, data'
          )
          .in('report_id', reportIds)
          .is('deleted_at', null);

        if (reportsData) {
          reportsMap = Object.fromEntries(reportsData.map((r) => [r.report_id, r]));
        }
      }

      // Combine notifications with their reports
      /*
       * ⚠️ `as unknown as` — the generated `types.ts` predates the ELE-1616
       * `scheme_certificate_*` columns, so the row type no longer overlaps
       * `Notification`. Regenerating types.ts wholesale would drag in unrelated
       * schema drift, which is the same call made for the numbering RPC. The
       * columns are real; the query is `select('*')` and returns them.
       */
      return (notificationsData || []).map((notification) => ({
        ...notification,
        reports: reportsMap[notification.report_id] || undefined,
      })) as unknown as Notification[];
    },
  });

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

      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast({
        title: 'Updated',
        description: 'Notification updated successfully',
      });
      return data;
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase.from('part_p_notifications').delete().eq('id', id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast({
        title: 'Deleted',
        description: 'Notification deleted successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    notifications: notifications || [],
    isLoading,
    updateNotification,
    deleteNotification,
  };
};
