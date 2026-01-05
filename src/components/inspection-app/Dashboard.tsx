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
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard = ({ onNavigate }: { onNavigate: (section: string, reportId?: string, reportType?: string) => void }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [showCustomerStats, setShowCustomerStats] = useState(false);
  const { customers, isLoading } = useCustomers();

  const handleNavigate = (section: string, reportId?: string, reportType?: string) => {
    if (section === 'settings') {
      navigate('/settings');
    } else {
      onNavigate(section, reportId, reportType);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background text-foreground p-3 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8 pb-20 sm:pb-6">
        <div className="md:max-w-7xl mx-auto md:px-6 lg:px-10 xl:px-14">
          <DashboardHeader 
            onSettingsClick={() => navigate('/settings')}
            onHelpClick={() => setIsHelpOpen(true)}
          />
        </div>
        
        <div className="md:px-6 lg:px-10 xl:px-14 space-y-4 md:space-y-6 lg:space-y-8">
          <CertificateTypeGrid onNavigate={handleNavigate} />
          
          {isLoading ? (
            <Card className="bg-card border border-border">
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <RecentCertificatesCard onNavigate={handleNavigate} />
            <PendingNotificationsCard onNavigate={onNavigate} />
          </div>

          {/* Certificate Expiry Management */}
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8">
            <ExpiringCertificatesCard />
          </div>
        </div>
      </div>
      
      <HelpPanel open={isHelpOpen} onOpenChange={setIsHelpOpen} />
    </>
  );
};

export default Dashboard;
