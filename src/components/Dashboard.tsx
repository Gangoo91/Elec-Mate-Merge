import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './dashboard/DashboardHeader';
import CertificateTypeGrid from './dashboard/CertificateTypeGrid';
import RecentCertificatesCard from './dashboard/RecentCertificatesCard';
import { PendingNotificationsCard } from './dashboard/PendingNotificationsCard';
import { ExpiringCertificatesCard } from './dashboard/ExpiringCertificatesCard';
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
    if (section === 'settings') {
      navigate('/settings');
    } else {
      onNavigate(section, reportId, reportType);
    }
  };

  const handleBack = () => {
    navigate('/electrician');
  };

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-20 sm:pb-8">
          <DashboardHeader
            onBackClick={handleBack}
            onSettingsClick={() => navigate('/settings')}
            onHelpClick={() => setIsHelpOpen(true)}
          />

          <CertificateTypeGrid onNavigate={handleNavigate} />

          {isLoading ? (
            <Card className="bg-card border-border">
              <CardHeader>
                <LoadingSkeleton type="card" count={1} />
              </CardHeader>
            </Card>
          ) : customers.length > 0 && (
            <CustomerStats
              customers={customers}
              onNavigateToCustomers={() => navigate('/customers')}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <RecentCertificatesCard onNavigate={handleNavigate} />
            <PendingNotificationsCard onNavigate={onNavigate} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <ExpiringCertificatesCard />
          </div>
        </div>
      </div>

      <HelpPanel open={isHelpOpen} onOpenChange={setIsHelpOpen} />
    </>
  );
};

export default Dashboard;
