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
      <div className="min-h-screen">
        {/* Minimal Sticky Header */}
        <header className="sticky top-0 z-40 glass-dark">
          <div className="flex items-center justify-between h-14 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-elec-yellow/15 icon-glow-yellow">
                <Zap className="h-5 w-5 text-elec-yellow" />
              </div>
              <span className="font-semibold text-white">I&T</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsHelpOpen(true)}
                className="h-9 w-9 rounded-full hover:bg-white/10 text-white/70 hover:text-white"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
              <Link to="/electrician">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 px-3 rounded-full hover:bg-white/10 text-white/70 hover:text-white"
                >
                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 pb-24 sm:pb-12 max-w-7xl mx-auto pt-5 sm:pt-6">

          {/* Quick Stats Row - Hidden on mobile for cleaner look */}
          {!reportsLoading && (recentDrafts > 0 || pendingReview > 0 || completedThisMonth > 0) && (
            <div className="hidden sm:grid grid-cols-3 gap-3 sm:gap-4">
              <div className="stat-card-unified rounded-xl p-3 sm:p-4 flex items-center gap-3 transition-all duration-200">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">{recentDrafts}</p>
                  <p className="text-xs text-white/50">Drafts</p>
                </div>
              </div>
              <div className="stat-card-unified rounded-xl p-3 sm:p-4 flex items-center gap-3 transition-all duration-200">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">{pendingReview}</p>
                  <p className="text-xs text-white/50">Pending</p>
                </div>
              </div>
              <div className="stat-card-unified rounded-xl p-3 sm:p-4 flex items-center gap-3 transition-all duration-200">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">{completedThisMonth}</p>
                  <p className="text-xs text-white/50">This Month</p>
                </div>
              </div>
            </div>
          )}

          {/* Featured AI Scanner Card */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5 px-1">
              <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow"></div>
              <h2 className="text-lg sm:text-xl font-bold text-white">AI-Powered Tools</h2>
            </div>
            <button
              onClick={featuredCard.action}
              className="block w-full focus:outline-none group touch-manipulation text-left"
            >
              <div className="card-premium-yellow rounded-2xl glow-yellow-lg active:scale-[0.98] transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-5 sm:p-6">
                  <div className="p-4 rounded-2xl bg-elec-yellow/15 group-hover:bg-elec-yellow/25 transition-colors duration-300 icon-glow-yellow">
                    <Camera className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                      {featuredCard.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {featuredCard.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-elec-yellow text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                    <span className="hidden sm:inline">Start Scanning</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Certificate Types Grid */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5 px-1">
              <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow"></div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Certificates</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 card-stagger">
              {mainCertificates.map((cert, index) => (
                <button
                  key={cert.id}
                  onClick={cert.onClick}
                  className="block w-full focus:outline-none group touch-manipulation text-left animate-card-entrance"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="card-premium-yellow rounded-xl h-full min-h-[130px] sm:min-h-[140px] hover:border-elec-yellow/40 active:scale-[0.97] transition-all duration-300">
                    <div className="p-3.5 sm:p-5 h-full flex flex-col">
                      <div className="p-2 sm:p-2.5 rounded-xl bg-elec-yellow/15 w-fit mb-3 group-hover:bg-elec-yellow/25 transition-colors duration-300">
                        <cert.icon className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm sm:text-base font-semibold text-white mb-1 group-hover:text-elec-yellow transition-colors duration-200">
                          {cert.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/50 leading-relaxed line-clamp-2">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5 px-1">
              <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow"></div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Quick Access</h2>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {/* Recent Certificates */}
              <button
                onClick={() => navigate('/electrician/inspection-testing/certificates')}
                className="block focus:outline-none group touch-manipulation"
              >
                <div className="bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-elec-yellow/30 active:scale-[0.96] h-full min-h-[80px] sm:min-h-[100px] transition-all duration-200">
                  <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 h-full">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-elec-yellow/10 mb-2 group-hover:bg-elec-yellow/20 transition-colors duration-200">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-white/80 leading-tight">
                      Recent
                    </span>
                  </div>
                </div>
              </button>

              {/* Customers */}
              <button
                onClick={() => navigate('/customers')}
                className="block focus:outline-none group touch-manipulation"
              >
                <div className="bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-elec-yellow/30 active:scale-[0.96] h-full min-h-[80px] sm:min-h-[100px] transition-all duration-200">
                  <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 h-full">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-elec-yellow/10 mb-2 group-hover:bg-elec-yellow/20 transition-colors duration-200">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-white/80 leading-tight">
                      Clients
                    </span>
                  </div>
                </div>
              </button>

              {/* Expiring */}
              <button
                onClick={() => navigate('/electrician/inspection-testing/expiring')}
                className="block focus:outline-none group touch-manipulation"
              >
                <div className="bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-elec-yellow/30 active:scale-[0.96] h-full min-h-[80px] sm:min-h-[100px] transition-all duration-200">
                  <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 h-full">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-elec-yellow/10 mb-2 group-hover:bg-elec-yellow/20 transition-colors duration-200">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-white/80 leading-tight">
                      Expiring
                    </span>
                  </div>
                </div>
              </button>

              {/* Templates */}
              <button
                onClick={() => navigate('/electrician/inspection-testing/templates')}
                className="block focus:outline-none group touch-manipulation"
              >
                <div className="bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-elec-yellow/30 active:scale-[0.96] h-full min-h-[80px] sm:min-h-[100px] transition-all duration-200">
                  <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 h-full">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-elec-yellow/10 mb-2 group-hover:bg-elec-yellow/20 transition-colors duration-200">
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-white/80 leading-tight">
                      Templates
                    </span>
                  </div>
                </div>
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
