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

const Dashboard = ({ onNavigate }: { onNavigate: (section: string, reportId?: string, reportType?: string) => void }) => {
  const navigate = useNavigate();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const { customers, isLoading } = useCustomers();

  const handleNavigate = (section: string, reportId?: string, reportType?: string) => {
    onNavigate(section, reportId, reportType);
  };

  const handleBack = () => {
    navigate('/electrician');
  };

  return (
    <>
      <div className="min-h-screen bg-sidebar text-foreground">
        {/* Compact Header */}
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/80">
          <div className="px-3 sm:px-4">
            <div className="flex h-12 items-center justify-between">
              {/* Left - Back */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>

              {/* Center - Title */}
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-elec-yellow" />
                <span className="font-semibold">Inspection & Testing</span>
              </div>

              {/* Right - Help only */}
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

        {/* Main Content - Minimal padding */}
        <main className="px-3 sm:px-4 py-4 space-y-4 pb-20 sm:pb-6">
          {/* Certificate Type Grid with AI Scanner */}
          <CertificateTypeGrid onNavigate={handleNavigate} />

          {/* Designed Circuits from Circuit Designer */}
          <DesignedCircuitsCard onNavigate={handleNavigate} />

          {/* Customer Stats - always show so users can add customers */}
          {isLoading ? (
            <Card className="bg-card border-border">
              <CardHeader className="p-4">
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
