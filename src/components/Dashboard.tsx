import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CertificateTypeGrid from './dashboard/CertificateTypeGrid';
import RecentCertificatesCard from './dashboard/RecentCertificatesCard';
import { PendingNotificationsCard } from './dashboard/PendingNotificationsCard';
import { ExpiringCertificatesCard } from './dashboard/ExpiringCertificatesCard';
import { DesignedCircuitsCard } from './dashboard/DesignedCircuitsCard';
import { CustomerStats } from './customers/CustomerStats';
import { useCustomers } from '@/hooks/useCustomers';
import HelpPanel from './HelpPanel';
import { Card, CardHeader } from '@/components/ui/card';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const Dashboard = ({ onNavigate }: { onNavigate: (section: string, reportId?: string, reportType?: string) => void }) => {
  const navigate = useNavigate();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const { customers, isLoading } = useCustomers();
  const isMobile = useIsMobile();

  const handleNavigate = (section: string, reportId?: string, reportType?: string) => {
    onNavigate(section, reportId, reportType);
  };

  const handleBack = () => {
    navigate('/electrician');
  };

  return (
    <>
      <div className="min-h-screen bg-sidebar text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-elec-yellow/20 bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/80">
          <div className="px-3">
            <div className="flex h-14 items-center">
              {/* Back */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2 mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>

              {/* Title - Left aligned */}
              <div className="flex items-center gap-2 flex-1">
                <div className="p-1.5 rounded-lg bg-elec-yellow/15">
                  <Zap className="h-4 w-4 text-elec-yellow" />
                </div>
                <span className="font-semibold text-foreground text-sm">Inspection & Testing</span>
              </div>

              {/* Help */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsHelpOpen(true)}
                className="h-8 w-8 text-muted-foreground hover:text-foreground -mr-2"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className={cn(
          "px-3 py-3 space-y-3 pb-20",
          !isMobile && "sm:px-4 sm:py-4 sm:space-y-4 sm:pb-6"
        )}>
          {/* Certificate Type Grid */}
          <CertificateTypeGrid onNavigate={handleNavigate} />

          {/* Designed Circuits */}
          <DesignedCircuitsCard onNavigate={handleNavigate} />

          {/* Customer Stats */}
          {isLoading ? (
            <Card className="bg-card border-elec-yellow/20">
              <CardHeader className="p-3">
                <LoadingSkeleton type="card" count={1} />
              </CardHeader>
            </Card>
          ) : (
            <CustomerStats
              customers={customers}
              onNavigateToCustomers={() => navigate('/customers')}
            />
          )}

          {/* Recent & Pending */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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
