import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CertificateTypeGrid from './dashboard/CertificateTypeGrid';
import RecoverUnsavedWork from './dashboard/RecoverUnsavedWork';
import RecentCertificatesCard from './dashboard/RecentCertificatesCard';
import { PendingNotificationsCard } from './dashboard/PendingNotificationsCard';
import { ExpiringCertificatesCard } from './dashboard/ExpiringCertificatesCard';
import { DesignedCircuitsCard } from './dashboard/DesignedCircuitsCard';
import HelpPanel from './HelpPanel';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const Dashboard = ({ onNavigate }: { onNavigate: (section: string, reportId?: string, reportType?: string) => void }) => {
  const navigate = useNavigate();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleNavigate = (section: string, reportId?: string, reportType?: string) => {
    onNavigate(section, reportId, reportType);
  };

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-elec-yellow/20 bg-background/95 backdrop-blur">
          <div className="px-4 sm:px-6">
            <div className="flex h-14 items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/electrician')}
                className="text-muted-foreground hover:text-foreground -ml-2 mr-3 h-9 w-9 p-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-xl bg-elec-yellow/15">
                  <Zap className="h-5 w-5 text-elec-yellow" />
                </div>
                <h1 className="font-bold text-foreground text-base">Inspection & Testing</h1>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsHelpOpen(true)}
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 py-5 pb-24 sm:pb-8 space-y-6">

          {/* Create Certificate */}
          <CertificateTypeGrid onNavigate={handleNavigate} />

          {/* Recover Unsaved Work */}
          <RecoverUnsavedWork onNavigate={handleNavigate} />

          {/* Designed Circuits */}
          <DesignedCircuitsCard onNavigate={handleNavigate} />

          {/* Recent & Notifications */}
          <div className={cn(
            "grid gap-4",
            isMobile ? "grid-cols-1" : "lg:grid-cols-2"
          )}>
            <RecentCertificatesCard onNavigate={handleNavigate} />
            <PendingNotificationsCard onNavigate={onNavigate} />
          </div>

          {/* Expiring */}
          <ExpiringCertificatesCard />
        </main>
      </div>

      <HelpPanel open={isHelpOpen} onOpenChange={setIsHelpOpen} />
    </>
  );
};

export default Dashboard;
