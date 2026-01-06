import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import {
  Zap,
  FileText,
  Settings,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Sparkles,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Camera,
} from 'lucide-react';
import { useCustomers } from '@/hooks/useCustomers';
import { useEICRReports } from '@/hooks/useEICRReports';
import HelpPanel from './HelpPanel';

interface DashboardProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const navigate = useNavigate();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const { customers, isLoading: customersLoading } = useCustomers();
  const { reports, isLoading: reportsLoading } = useEICRReports();

  // Featured AI Scanner card
  const featuredCard = {
    title: "AI Board Scanner",
    description: "Snap a photo of any distribution board and let AI detect all circuits, ratings, and device types automatically",
    icon: Camera,
    action: () => onNavigate('eicr') // Will open board scan flow
  };

  // Main 2x2 grid - Core certificate types
  const mainCertificates = [
    {
      id: 'eicr',
      title: "EICR",
      description: "Electrical Installation Condition Report - Periodic inspection and testing",
      icon: FileText,
      onClick: () => onNavigate('eicr')
    },
    {
      id: 'minor-works',
      title: "Minor Works",
      description: "Minor Electrical Installation Works - Additions and alterations",
      icon: Settings,
      onClick: () => onNavigate('minor-works')
    },
    {
      id: 'eic',
      title: "EIC",
      description: "Electrical Installation Certificate - New installation certification",
      icon: Zap,
      onClick: () => onNavigate('eic')
    },
    {
      id: 'learning-hub',
      title: "Learning Hub",
      description: "BS7671 guidance, testing procedures and safety resources",
      icon: BookOpen,
      onClick: () => onNavigate('learning-hub')
    }
  ];

  // Quick stats
  const recentDrafts = reports?.filter(r => r.status === 'draft').length || 0;
  const pendingReview = reports?.filter(r => r.status === 'pending').length || 0;
  const completedThisMonth = reports?.filter(r => {
    if (r.status !== 'completed') return false;
    const date = new Date(r.updated_at);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length || 0;

  return (
    <>
      <div className="min-h-screen mobile-safe-area">
        <div className="space-y-8 md:space-y-10 animate-fade-in px-4 sm:px-6 pb-8 md:pb-12">
          {/* Header */}
          <div className="flex flex-col gap-4 pt-4 md:pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Inspection & Testing
                </h1>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsHelpOpen(true)}
                  className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border-blue-500/50 hover:from-blue-500/30 hover:to-cyan-500/20"
                >
                  <HelpCircle className="h-5 w-5 text-blue-400" />
                </Button>
                <Link to="/electrician" className="flex-1 sm:flex-none">
                  <Button variant="outline" className="w-full sm:w-auto h-10">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                </Link>
              </div>
            </div>
            <p className="text-base text-muted-foreground max-w-2xl">
              BS7671 compliant electrical certification management
            </p>
          </div>

          {/* Quick Stats Row */}
          {!reportsLoading && (recentDrafts > 0 || pendingReview > 0 || completedThisMonth > 0) && (
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <Card className="bg-amber-500/10 border-amber-500/30">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-2xl font-bold text-amber-500">{recentDrafts}</p>
                    <p className="text-xs text-muted-foreground">Drafts</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-blue-500/10 border-blue-500/30">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-blue-500 shrink-0" />
                  <div>
                    <p className="text-2xl font-bold text-blue-500">{pendingReview}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-green-500/10 border-green-500/30">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <div>
                    <p className="text-2xl font-bold text-green-500">{completedThisMonth}</p>
                    <p className="text-xs text-muted-foreground">This Month</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Featured AI Scanner Card */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <div className="h-1 w-1 rounded-full bg-elec-yellow"></div>
              <h2 className="text-xl sm:text-2xl font-bold">AI-Powered Tools</h2>
            </div>
            <button
              onClick={featuredCard.action}
              className="block w-full focus:outline-none group touch-manipulation text-left"
            >
              <Card className="border-elec-yellow/30 hover:border-elec-yellow/50 active:scale-[0.98] relative transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <CardHeader className="flex flex-col items-center justify-center text-center py-6 px-4 relative">
                  <div className="p-3 rounded-2xl bg-elec-yellow/10 mb-3 group-hover:bg-elec-yellow/20 transition-colors duration-300">
                    <Camera className="h-10 w-10 text-elec-yellow" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold mb-2">
                    {featuredCard.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                    {featuredCard.description}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-elec-yellow text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                    <span>Start Scanning</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </CardHeader>
              </Card>
            </button>
          </div>

          {/* Certificate Types Grid */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 px-1">
              <div className="h-1 w-1 rounded-full bg-elec-yellow"></div>
              <h2 className="text-xl sm:text-2xl font-bold">Certificates</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {mainCertificates.map((cert) => (
                <button
                  key={cert.id}
                  onClick={cert.onClick}
                  className="block w-full focus:outline-none group touch-manipulation text-left"
                >
                  <Card className="hover:bg-[#222222] hover:border-elec-yellow/40 active:scale-[0.97] h-full min-h-[140px] transition-all duration-300">
                    <CardHeader className="flex flex-row items-start gap-4 py-5 sm:py-6 px-4 sm:px-5">
                      <div className="p-2.5 rounded-lg bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors duration-300 flex-shrink-0">
                        <cert.icon className="h-7 w-7 sm:h-8 sm:w-8 text-elec-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg font-semibold leading-tight mb-1.5">
                          {cert.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-elec-yellow group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
                    </CardHeader>
                  </Card>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity & Customers */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 px-1">
              <div className="h-1 w-1 rounded-full bg-elec-yellow"></div>
              <h2 className="text-xl sm:text-2xl font-bold">Quick Access</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {/* Recent Certificates */}
              <button
                onClick={() => navigate('/electrician/inspection-testing/certificates')}
                className="block focus:outline-none group touch-manipulation"
              >
                <Card className="hover:bg-[#222222] hover:border-elec-yellow/40 active:scale-[0.97] h-full min-h-[120px] sm:min-h-[130px] transition-all duration-300">
                  <CardHeader className="flex flex-col items-center justify-center text-center py-4 sm:py-5 px-3">
                    <div className="p-2 rounded-lg bg-elec-yellow/10 mb-2 group-hover:bg-elec-yellow/20 transition-colors duration-300">
                      <FileText className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
                    </div>
                    <CardTitle className="text-sm sm:text-base font-semibold leading-tight mb-1">
                      Recent Certs
                    </CardTitle>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      View all certificates
                    </p>
                  </CardHeader>
                </Card>
              </button>

              {/* Customers */}
              <button
                onClick={() => navigate('/customers')}
                className="block focus:outline-none group touch-manipulation"
              >
                <Card className="hover:bg-[#222222] hover:border-elec-yellow/40 active:scale-[0.97] h-full min-h-[120px] sm:min-h-[130px] transition-all duration-300">
                  <CardHeader className="flex flex-col items-center justify-center text-center py-4 sm:py-5 px-3">
                    <div className="p-2 rounded-lg bg-elec-yellow/10 mb-2 group-hover:bg-elec-yellow/20 transition-colors duration-300">
                      <Users className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
                    </div>
                    <CardTitle className="text-sm sm:text-base font-semibold leading-tight mb-1">
                      Customers
                    </CardTitle>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      {customersLoading ? '...' : `${customers.length} saved`}
                    </p>
                  </CardHeader>
                </Card>
              </button>

              {/* Expiring */}
              <button
                onClick={() => navigate('/electrician/inspection-testing/expiring')}
                className="block focus:outline-none group touch-manipulation"
              >
                <Card className="hover:bg-[#222222] hover:border-elec-yellow/40 active:scale-[0.97] h-full min-h-[120px] sm:min-h-[130px] transition-all duration-300">
                  <CardHeader className="flex flex-col items-center justify-center text-center py-4 sm:py-5 px-3">
                    <div className="p-2 rounded-lg bg-elec-yellow/10 mb-2 group-hover:bg-elec-yellow/20 transition-colors duration-300">
                      <Clock className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
                    </div>
                    <CardTitle className="text-sm sm:text-base font-semibold leading-tight mb-1">
                      Expiring
                    </CardTitle>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      Due for renewal
                    </p>
                  </CardHeader>
                </Card>
              </button>

              {/* Templates */}
              <button
                onClick={() => navigate('/electrician/inspection-testing/templates')}
                className="block focus:outline-none group touch-manipulation"
              >
                <Card className="hover:bg-[#222222] hover:border-elec-yellow/40 active:scale-[0.97] h-full min-h-[120px] sm:min-h-[130px] transition-all duration-300">
                  <CardHeader className="flex flex-col items-center justify-center text-center py-4 sm:py-5 px-3">
                    <div className="p-2 rounded-lg bg-elec-yellow/10 mb-2 group-hover:bg-elec-yellow/20 transition-colors duration-300">
                      <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
                    </div>
                    <CardTitle className="text-sm sm:text-base font-semibold leading-tight mb-1">
                      Templates
                    </CardTitle>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      Quick start
                    </p>
                  </CardHeader>
                </Card>
              </button>
            </div>
          </div>
        </div>
      </div>

      <HelpPanel open={isHelpOpen} onOpenChange={setIsHelpOpen} />
    </>
  );
};

export default Dashboard;
