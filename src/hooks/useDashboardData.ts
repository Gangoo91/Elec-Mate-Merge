/**
 * useDashboardData
 *
 * Unified hook that aggregates all user-specific data for the dashboard.
 * Pulls from multiple hooks and provides a single source of truth.
 */

import { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useQuoteStorage } from '@/hooks/useQuoteStorage';
import { useInvoiceStorage } from '@/hooks/useInvoiceStorage';
import { useActiveJobs } from '@/hooks/useJobs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { differenceInDays, isPast } from 'date-fns';

export interface DashboardUserData {
  name: string;
  firstName: string;
  avatarUrl: string | null;
  email: string | null;
  isSubscribed: boolean;
  trialDaysLeft: number | null;
}

export interface DashboardLearningData {
  currentStreak: number;
  longestStreak: number;
  studiedToday: boolean;
  totalSessions: number;
  totalCardsReviewed: number;
}

export interface DashboardBusinessData {
  activeQuotes: number;
  pendingQuotes: number;
  quoteValue: number;
  formattedQuoteValue: string;
  totalInvoices: number;
  unpaidInvoices: number;
  overdueInvoices: number;
  overdueValue: number;
  activeJobs: number;
}

export interface DashboardCertificateData {
  total: number;
  expiringSoon: number; // Within 30 days
  expired: number;
}

export interface DashboardActionItem {
  id: string;
  type: 'urgent' | 'warning' | 'info';
  title: string;
  description: string;
  action: string;
  path: string;
  metadata?: Record<string, any>;
}

export interface DashboardData {
  user: DashboardUserData;
  learning: DashboardLearningData;
  business: DashboardBusinessData;
  certificates: DashboardCertificateData;
  actions: DashboardActionItem[];
  isLoading: boolean;
  errors: string[];
}

export function useDashboardData(): DashboardData {
  const { user, profile, isLoading: authLoading } = useAuth();
  const { streak, loading: streakLoading, getStreakDisplay } = useStudyStreak();
  const { savedQuotes, loading: quotesLoading } = useQuoteStorage();
  const { invoices, isLoading: invoicesLoading } = useInvoiceStorage();
  const { data: activeJobsData, isLoading: jobsLoading } = useActiveJobs();

  // Fetch electrical certificates (EIC/EICR/Minor Works from reports table)
  const { data: reportsData, isLoading: reportsLoading } = useQuery({
    queryKey: ['dashboard-reports', user?.id],
    queryFn: async () => {
      if (!user?.id) return { total: 0, completed: 0 };

      const { count, error } = await supabase
        .from('reports')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .is('deleted_at', null);

      if (error) {
        console.error('Error fetching reports count:', error);
        return { total: 0, completed: 0 };
      }

      // Also get completed count
      const { count: completedCount } = await supabase
        .from('reports')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .is('deleted_at', null);

      return {
        total: count || 0,
        completed: completedCount || 0
      };
    },
    enabled: !!user?.id,
    staleTime: 30000, // Cache for 30 seconds
  });

  // Aggregate loading state
  const isLoading = authLoading || streakLoading || quotesLoading || invoicesLoading || reportsLoading || jobsLoading;

  // User data
  const userData = useMemo((): DashboardUserData => {
    const fullName = profile?.full_name || user?.user_metadata?.full_name || 'User';
    const firstName = fullName.split(' ')[0] || 'there';

    // Calculate trial days if applicable
    let trialDaysLeft: number | null = null;
    if (profile?.trial_ends_at) {
      const trialEnd = new Date(profile.trial_ends_at);
      const daysLeft = differenceInDays(trialEnd, new Date());
      trialDaysLeft = daysLeft > 0 ? daysLeft : null;
    }

    return {
      name: fullName,
      firstName,
      avatarUrl: profile?.avatar_url || null,
      email: user?.email || null,
      isSubscribed: profile?.subscription_status === 'active',
      trialDaysLeft,
    };
  }, [user, profile]);

  // Learning data from study streak
  const learningData = useMemo((): DashboardLearningData => {
    const streakDisplay = getStreakDisplay();
    return {
      currentStreak: streakDisplay.currentStreak,
      longestStreak: streakDisplay.longestStreak,
      studiedToday: streakDisplay.studiedToday,
      totalSessions: streakDisplay.totalSessions,
      totalCardsReviewed: streakDisplay.totalCardsReviewed,
    };
  }, [getStreakDisplay]);

  // Business data from quotes and invoices
  const businessData = useMemo((): DashboardBusinessData => {
    // Filter active/pending quotes
    const activeQuotes = savedQuotes?.filter(q =>
      q.status === 'sent' || q.status === 'pending' || q.status === 'draft'
    ) || [];

    const pendingQuotes = savedQuotes?.filter(q =>
      q.status === 'sent' && q.acceptance_status === 'pending'
    ) || [];

    // Calculate total pipeline value (ALL quotes - matches QuotesPage)
    const quoteValue = savedQuotes?.reduce((sum, q) => sum + (q.total || 0), 0) || 0;
    const formattedQuoteValue = quoteValue >= 1000
      ? `£${(quoteValue / 1000).toFixed(1)}k`
      : `£${quoteValue.toLocaleString()}`;

    // Invoice calculations
    const unpaidInvoices = invoices?.filter(i =>
      i.invoice_status !== 'paid'
    ) || [];

    const overdueInvoices = unpaidInvoices.filter(i => {
      if (!i.invoice_due_date) return false;
      return isPast(new Date(i.invoice_due_date));
    });

    const overdueValue = overdueInvoices.reduce((sum, i) => sum + (i.total || 0), 0);

    return {
      activeQuotes: activeQuotes.length,
      pendingQuotes: pendingQuotes.length,
      quoteValue,
      formattedQuoteValue,
      totalInvoices: invoices?.length || 0,
      unpaidInvoices: unpaidInvoices.length,
      overdueInvoices: overdueInvoices.length,
      overdueValue,
      activeJobs: activeJobsData?.length || 0,
    };
  }, [savedQuotes, invoices, activeJobsData]);

  // Certificate data - now uses reports (EIC/EICR/Minor Works) instead of training certificates
  const certificateData = useMemo((): DashboardCertificateData => {
    // Reports don't have expiry dates, so we show total and completed counts
    // "expiringSoon" repurposed to show drafts/in-progress (certs needing attention)
    const total = reportsData?.total || 0;
    const completed = reportsData?.completed || 0;
    const inProgress = total - completed;

    return {
      total,
      expiringSoon: inProgress, // Repurposed: certs needing completion
      expired: 0, // Not applicable for reports
    };
  }, [reportsData]);

  // Generate action items (prioritized)
  const actions = useMemo((): DashboardActionItem[] => {
    const items: DashboardActionItem[] = [];

    // Urgent: Overdue invoices
    const overdueInvoicesList = invoices?.filter(i => {
      if (!i.invoice_due_date || i.invoice_status === 'paid') return false;
      return isPast(new Date(i.invoice_due_date));
    }) || [];

    overdueInvoicesList.slice(0, 2).forEach(inv => {
      const daysOverdue = differenceInDays(new Date(), new Date(inv.invoice_due_date!));
      items.push({
        id: `invoice-${inv.id}`,
        type: 'urgent',
        title: `Invoice #${inv.invoice_number || inv.id?.slice(0, 6)}`,
        description: `${daysOverdue}d overdue · ${inv.client?.name || 'Client'}`,
        action: 'View',
        path: `/electrician/invoices/${inv.id}/view`,
        metadata: { daysOverdue, amount: inv.total },
      });
    });

    // Warning: Pending quotes awaiting response
    const pendingQuotesList = savedQuotes?.filter(q =>
      q.status === 'sent' && q.acceptance_status === 'pending'
    ) || [];

    pendingQuotesList.slice(0, 2).forEach(quote => {
      items.push({
        id: `quote-${quote.id}`,
        type: 'warning',
        title: `Quote #${quote.quoteNumber || quote.id?.slice(0, 6)}`,
        description: `£${quote.total?.toLocaleString() || 0} · ${quote.client?.name || 'Client'}`,
        action: 'Follow Up',
        path: `/electrician/quotes/view/${quote.id}`,
        metadata: { amount: quote.total },
      });
    });

    // Info: Incomplete certificates (drafts/in-progress)
    const inProgressCount = (reportsData?.total || 0) - (reportsData?.completed || 0);
    if (inProgressCount > 0) {
      items.push({
        id: 'incomplete-certs',
        type: 'info',
        title: `${inProgressCount} Incomplete Certificate${inProgressCount > 1 ? 's' : ''}`,
        description: 'Drafts or in-progress reports',
        action: 'View',
        path: '/electrician/inspection-testing?section=reports',
        metadata: { count: inProgressCount },
      });
    }

    return items;
  }, [invoices, savedQuotes, reportsData]);

  // Collect any errors
  const errors: string[] = [];

  return {
    user: userData,
    learning: learningData,
    business: businessData,
    certificates: certificateData,
    actions,
    isLoading,
    errors,
  };
}

export default useDashboardData;
