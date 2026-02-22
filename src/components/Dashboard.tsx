import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CertificateTypeGrid from './dashboard/CertificateTypeGrid';
import RecoverUnsavedWork from './dashboard/RecoverUnsavedWork';
import RecentCertificatesCard from './dashboard/RecentCertificatesCard';
import { PendingNotificationsCard } from './dashboard/PendingNotificationsCard';
import { ExpiringCertificatesCard } from './dashboard/ExpiringCertificatesCard';
import { DesignedCircuitsCard } from './dashboard/DesignedCircuitsCard';
import DashboardStatsBar from './dashboard/DashboardStatsBar';
import HeroCTA from './dashboard/HeroCTA';
import HelpPanel from './HelpPanel';
import { useNotifications } from '@/hooks/useNotifications';
import { useExpiryReminders } from '@/hooks/useExpiryReminders';
import { filterByTimeRange } from '@/utils/expiryHelper';
import { getDaysUntilDeadline } from '@/utils/notificationHelper';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { reportCloud } from '@/utils/reportCloud';

const Dashboard = ({
  onNavigate,
}: {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}) => {
  const navigate = useNavigate();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  // Stats data — react-query deduplicates these with child component queries
  const { notifications = [] } = useNotifications();
  const { reminders = [] } = useExpiryReminders();

  const { data: reportsData } = useQuery({
    queryKey: ['recent-certificates', user?.id],
    queryFn: async () => {
      if (!user) return { reports: [], totalCount: 0, hasMore: false };
      return await reportCloud.getUserReports(user.id, { limit: 5 });
    },
    enabled: !!user,
    staleTime: 10 * 1000,
  });

  const inProgressCount =
    reportsData?.reports?.filter((r) => r.status === 'in-progress' || r.status === 'draft')
      .length ?? 0;

  const partPPending = notifications.filter(
    (n) => n.notification_status !== 'submitted' && n.notification_status !== 'cancelled'
  );
  const partPDueCount = partPPending.length;
  const overduePartP = partPPending.some(
    (n) => n.submission_deadline && getDaysUntilDeadline(n.submission_deadline) < 0
  );

  const expiringCount = filterByTimeRange(reminders, '90').length;

  const handleNavigate = (section: string, reportId?: string, reportType?: string) => {
    onNavigate(section, reportId, reportType);
  };

  const handleStatClick = (stat: 'in-progress' | 'part-p' | 'expiring') => {
    switch (stat) {
      case 'in-progress':
        onNavigate('my-reports');
        break;
      case 'part-p':
        onNavigate('notifications');
        break;
      case 'expiring':
        navigate('/certificate-expiry');
        break;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-background/95 backdrop-blur">
          <div className="px-4 sm:px-6 max-w-6xl mx-auto">
            <div className="flex h-14 items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/electrician')}
                className="text-white hover:text-foreground -ml-2 mr-3 h-11 w-11 p-0 touch-manipulation"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-xl bg-elec-yellow/12">
                  <Zap className="h-5 w-5 text-elec-yellow" />
                </div>
                <h1 className="font-bold text-white text-lg">Inspection & Testing</h1>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsHelpOpen(true)}
                className="h-11 w-11 text-white hover:text-foreground touch-manipulation"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 py-6 pb-24 sm:pb-8 max-w-6xl mx-auto space-y-6">
          {/* Stats Bar */}
          <DashboardStatsBar
            inProgressCount={inProgressCount}
            partPDueCount={partPDueCount}
            expiringCount={expiringCount}
            overduePartP={overduePartP}
            onStatClick={handleStatClick}
          />

          {/* Hero CTA */}
          <HeroCTA />

          {/* Recover Unsaved Work */}
          <RecoverUnsavedWork onNavigate={handleNavigate} />

          {/* Certificate Types */}
          <CertificateTypeGrid onNavigate={handleNavigate} />

          {/* Divider */}
          <div className="h-px bg-white/[0.06]" />

          {/* Desktop 2-column layout / Mobile single column */}
          <div className="lg:grid lg:grid-cols-5 lg:gap-8 space-y-6 lg:space-y-0">
            {/* Left column (3/5) */}
            <div className="lg:col-span-3 space-y-8">
              <RecentCertificatesCard onNavigate={handleNavigate} />
              <DesignedCircuitsCard onNavigate={handleNavigate} />
            </div>

            {/* Right column (2/5) */}
            <div className="lg:col-span-2 space-y-8">
              <PendingNotificationsCard onNavigate={onNavigate} />
              <ExpiringCertificatesCard />
            </div>
          </div>
        </main>
      </div>

      <HelpPanel open={isHelpOpen} onOpenChange={setIsHelpOpen} />
    </>
  );
};

export default Dashboard;
