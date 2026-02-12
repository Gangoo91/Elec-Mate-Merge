import { QueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Prefetch functions for admin pages
export const prefetchAdminUsers = (qc: QueryClient) => {
  qc.prefetchQuery({
    queryKey: ['admin-users-base'],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('admin-get-users');
      return data?.users || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const prefetchAdminConversations = (qc: QueryClient) => {
  qc.prefetchQuery({
    queryKey: ['admin-chat-messages', '', 'all'],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('admin-manage-conversations', {
        body: { action: 'list', category: 'all', limit: 100 },
      });
      return data?.messages || [];
    },
    staleTime: 60000,
  });
};

export const prefetchAdminSubscriptions = (qc: QueryClient) => {
  qc.prefetchQuery({
    queryKey: ['admin-subscription-stats'],
    queryFn: async () => {
      const [profilesRes, offersRes] = await Promise.all([
        supabase.from('profiles').select('role, subscribed', { count: 'exact' }),
        supabase.from('promo_offers').select('redemptions, price'),
      ]);
      const profiles = profilesRes.data || [];
      const total = profilesRes.count || 0;
      const subscribed = profiles.filter((p) => p.subscribed);
      let estimatedMRR = 0;
      offersRes.data?.forEach((offer: { redemptions: number; price: number }) => {
        estimatedMRR += (offer.redemptions || 0) * (offer.price || 0);
      });
      return {
        total,
        subscribed: subscribed.length,
        apprentice: subscribed.filter((p) => p.role === 'apprentice').length,
        electrician: subscribed.filter((p) => p.role === 'electrician').length,
        employer: subscribed.filter((p) => p.role === 'employer').length,
        estimatedMRR,
        conversionRate: total ? ((subscribed.length / total) * 100).toFixed(1) : '0',
      };
    },
    staleTime: 120000,
  });
};

export const prefetchAdminAuditLogs = (qc: QueryClient) => {
  qc.prefetchQuery({
    queryKey: ['admin-audit-logs', '', 'all'],
    queryFn: async () => {
      const { data } = await supabase
        .from('admin_audit_logs')
        .select(`*, profiles:user_id (full_name, username)`)
        .order('created_at', { ascending: false })
        .limit(200);
      return data || [];
    },
    staleTime: 60000,
  });
};

export const prefetchAdminEmailLogs = (qc: QueryClient) => {
  qc.prefetchQuery({
    queryKey: ['admin-email-logs', '', 'all'],
    queryFn: async () => {
      const { data } = await supabase
        .from('email_logs')
        .select(`*`)
        .order('created_at', { ascending: false })
        .limit(200);
      return data || [];
    },
    staleTime: 60000,
  });
};

export const prefetchAdminElecIds = (qc: QueryClient) => {
  qc.prefetchQuery({
    queryKey: ['admin-elec-ids', '', 'all'],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('admin-verify-elecid', {
        body: { action: 'list' },
      });
      return data?.profiles || [];
    },
    staleTime: 60000,
  });
};

export const prefetchAdminVerification = (qc: QueryClient) => {
  qc.prefetchQuery({
    queryKey: ['admin-verification-queue', 'pending'],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('admin-verify-elecid', {
        body: { action: 'list', reason: 'pending' },
      });
      return data?.profiles || [];
    },
    staleTime: 60000,
  });
};

// Map of paths to prefetch functions
export const ADMIN_PREFETCH_MAP: Record<string, (qc: QueryClient) => void> = {
  '/admin/users': prefetchAdminUsers,
  '/admin/conversations': prefetchAdminConversations,
  '/admin/subscriptions': prefetchAdminSubscriptions,
  '/admin/audit': prefetchAdminAuditLogs,
  '/admin/emails': prefetchAdminEmailLogs,
  '/admin/elec-ids': prefetchAdminElecIds,
  '/admin/verification': prefetchAdminVerification,
  '/admin/apprentice-campaigns': (qc: QueryClient) => {
    qc.prefetchQuery({
      queryKey: ['apprentice-campaign-stats', 'feature_spotlight'],
      queryFn: async () => {
        const { data } = await supabase.functions.invoke('send-apprentice-campaign', {
          body: { action: 'get_stats', campaignType: 'feature_spotlight' },
        });
        return data;
      },
      staleTime: 30000,
    });
  },
};

// Hook to get prefetch handler
export const useAdminPrefetch = (queryClient: QueryClient) => {
  const handlePrefetch = (path: string) => {
    const prefetchFn = ADMIN_PREFETCH_MAP[path];
    if (prefetchFn) {
      prefetchFn(queryClient);
    }
  };

  return { handlePrefetch };
};
