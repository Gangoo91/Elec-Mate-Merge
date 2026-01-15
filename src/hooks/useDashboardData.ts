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
import { useCertificates } from '@/hooks/certificates/useCertificates';
import { useActiveJobs } from '@/hooks/useJobs';
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
  const { certificates, loading: certificatesLoading } = useCertificates();
  const { data: activeJobsData, isLoading: jobsLoading } = useActiveJobs();

  // Aggregate loading state
  const isLoading = authLoading || streakLoading || quotesLoading || invoicesLoading || certificatesLoading || jobsLoading;

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

    // Calculate total quote value
    const quoteValue = activeQuotes.reduce((sum, q) => sum + (q.total || 0), 0);
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

  // Certificate data
  const certificateData = useMemo((): DashboardCertificateData => {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    let expiringSoon = 0;
    let expired = 0;

    certificates?.forEach(cert => {
      if (cert.expiryDate) {
        const expiryDate = new Date(cert.expiryDate);
        if (isPast(expiryDate)) {
          expired++;
        } else if (expiryDate <= thirtyDaysFromNow) {
          expiringSoon++;
        }
      }
    });

    return {
      total: certificates?.length || 0,
      expiringSoon,
      expired,
    };
  }, [certificates]);

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

    // Info: Expiring certificates
    const expiringCerts = certificates?.filter(cert => {
      if (!cert.expiryDate) return false;
      const expiryDate = new Date(cert.expiryDate);
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      return !isPast(expiryDate) && expiryDate <= thirtyDaysFromNow;
    }) || [];

    expiringCerts.slice(0, 2).forEach(cert => {
      const daysUntilExpiry = differenceInDays(new Date(cert.expiryDate!), new Date());
      items.push({
        id: `cert-${cert.id}`,
        type: 'info',
        title: cert.name || 'Certificate',
        description: `Expires in ${daysUntilExpiry} days`,
        action: 'View',
        path: '/profile?tab=certificates',
        metadata: { daysUntilExpiry },
      });
    });

    return items;
  }, [invoices, savedQuotes, certificates]);

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
