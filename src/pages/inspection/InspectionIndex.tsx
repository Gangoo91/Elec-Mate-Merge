import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ErrorBoundary from '@/components/ErrorBoundary';
import { NotificationsManager } from '@/components/notifications/NotificationsManager';
import { SectionSkeleton } from '@/components/ui/page-skeleton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

// Lazy-loaded components for code splitting
const Dashboard = lazy(() => import('@/components/Dashboard'));
const EICRForm = lazy(() => import('@/components/EICRForm'));
const EICForm = lazy(() => import('@/components/EICForm'));
const MinorWorksForm = lazy(() => import('@/components/MinorWorksForm'));
const MyReports = lazy(() => import('@/components/MyReports'));
const LearningHub = lazy(() => import('@/components/LearningHub'));
const CertificatesSection = lazy(() => import('@/components/dashboard/CertificatesSection'));
const SpecialistSection = lazy(() => import('@/components/dashboard/SpecialistSection'));
const LabelsWarningsSection = lazy(() => import('@/components/dashboard/LabelsWarningsSection'));

// Skeleton loader for lazy components
const SectionLoader = SectionSkeleton;

const InspectionIndex = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Base path for inspection routes
  const basePath = '/electrician/inspection-testing';

  const [currentSection, setCurrentSection] = useState(() => {
    // Check navigation state first, then URL parameters
    const stateSection = location.state?.section;
    if (stateSection) return stateSection;

    const params = new URLSearchParams(window.location.search);
    return params.get('section') || 'dashboard';
  });
  const [currentReportId, setCurrentReportId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('reportId');
  });
  const [currentReportType, setCurrentReportType] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('reportType');
  });
  const [currentDesignId, setCurrentDesignId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('designId');
  });

  // Update section when navigation state changes (from customer page)
  useEffect(() => {
    if (location.state?.section) {
      setCurrentSection(location.state.section);
    }
  }, [location.state?.section]);

  // Update section, reportId, reportType, and designId when URL parameters change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    const reportId = params.get('reportId');
    const reportType = params.get('reportType');
    const designId = params.get('designId');

    if (section && section !== currentSection) {
      setCurrentSection(section);
    }
    if (reportId !== currentReportId) {
      setCurrentReportId(reportId);
    }
    if (reportType !== currentReportType) {
      setCurrentReportType(reportType);
    }
    if (designId !== currentDesignId) {
      setCurrentDesignId(designId);
    }
  }, [location.search]);

  const handleNavigateToEICR = (reportId?: string) => {
    setCurrentReportId(reportId || null);
    setCurrentSection('eicr');
  };

  const handleEditReport = (reportId: string, reportType?: string) => {
    setCurrentReportId(reportId);
    setCurrentReportType(reportType || null);

    // Route to correct form based on report type
    // New certificate types use dedicated routes (React Router)
    if (reportType === 'ev-charging') {
      navigate(`/electrician/inspection-testing/ev-charging/${reportId}`);
      return;
    } else if (reportType === 'fire-alarm') {
      navigate(`/electrician/inspection-testing/fire-alarm/${reportId}`);
      return;
    } else if (reportType === 'emergency-lighting') {
      navigate(`/electrician/inspection-testing/emergency-lighting/${reportId}`);
      return;
    } else if (reportType === 'pat-testing') {
      navigate(`/electrician/inspection-testing/pat-testing/${reportId}`);
      return;
    } else if (reportType === 'testing-only') {
      navigate(`/electrician/inspection-testing/testing-only/${reportId}`);
      return;
    }

    // Legacy certificate types use section-based routing
    if (reportType === 'eic') {
      setCurrentSection('eic');
    } else if (reportType === 'minor-works') {
      setCurrentSection('minor-works');
    } else {
      setCurrentSection('eicr');
    }
  };

  const handleNavigate = (section: string, reportId?: string, reportType?: string) => {
    // Cert types with dedicated routes — navigate directly
    const dedicatedRouteTypes = ['ev-charging', 'fire-alarm', 'emergency-lighting', 'pat-testing', 'solar-pv', 'testing-only'];
    const effectiveType = reportType || section;
    if (dedicatedRouteTypes.includes(effectiveType) && reportId) {
      navigate(`/electrician/inspection-testing/${effectiveType}/${reportId}`);
      return;
    }
    // Types that go straight to /new (no hub page)
    const directToNewTypes = ['testing-only', 'bess', 'lightning-protection', 'g98-commissioning', 'g99-commissioning', 'smoke-co-alarm'];
    if (dedicatedRouteTypes.includes(effectiveType) && !reportId) {
      if (directToNewTypes.includes(effectiveType)) {
        navigate(`/electrician/inspection-testing/${effectiveType}/new`);
      } else {
        navigate(`/electrician/inspection-testing/${effectiveType}`);
      }
      return;
    }

    setCurrentReportId(reportId || null);
    setCurrentReportType(reportType || null);
    setCurrentSection(section);

    // Update URL via React Router for consistency
    const params = new URLSearchParams();
    params.set('section', section);
    if (reportId) params.set('reportId', reportId);
    if (reportType) params.set('reportType', reportType);
    navigate(`${basePath}?${params.toString()}`);
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'eicr':
        return (
          <div className="bg-background text-foreground">
            <ErrorBoundary>
              <EICRForm
                onBack={() => handleNavigate('certificates')}
                initialReportId={currentReportId}
              />
            </ErrorBoundary>
          </div>
        );
      case 'eic':
        return (
          <div className="bg-background text-foreground">
            <ErrorBoundary>
              <EICForm
                onBack={() => handleNavigate('certificates')}
                initialReportId={currentReportId}
                designId={currentDesignId}
              />
            </ErrorBoundary>
          </div>
        );
      case 'minor-works':
        return (
          <div className="bg-background text-foreground">
            <ErrorBoundary>
              <MinorWorksForm
                onBack={() => handleNavigate('certificates')}
                initialReportId={currentReportId}
              />
            </ErrorBoundary>
          </div>
        );
      case 'my-reports':
        return (
          <MyReports
            onBack={() => handleNavigate('dashboard')}
            onNavigate={handleNavigate}
            onEditReport={handleEditReport}
          />
        );
      case 'certificates':
        return (
          <CertificatesSection
            onNavigate={handleNavigate}
            onBack={() => handleNavigate('dashboard')}
          />
        );
      case 'specialist':
        return (
          <SpecialistSection
            onBack={() => handleNavigate('dashboard')}
          />
        );
      case 'labels-warnings':
        return (
          <LabelsWarningsSection
            onBack={() => handleNavigate('dashboard')}
          />
        );
      case 'learning-hub':
        return <LearningHub onBack={() => handleNavigate('dashboard')} />;
      case 'notifications':
        return (
          <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
            {/* Sticky Header — matches Business Hub */}
            <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
              <div className="px-4 py-2">
                <div className="flex items-center gap-3 h-11">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleNavigate('dashboard')}
                    className="text-white hover:text-white hover:bg-white/10 rounded-lg w-9 h-9 flex-shrink-0 touch-manipulation active:scale-[0.98]"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <h1 className="text-sm font-bold text-white tracking-wide uppercase">Part P Notifications</h1>
                </div>
              </div>
              <div className="h-[2px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
            </div>

            {/* Main Content — motion stagger like Business Hub */}
            <motion.main
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="px-4 py-4 space-y-5"
            >
              <NotificationsManager onNavigate={handleNavigate} partPOnly itemVariants={itemVariants} />
            </motion.main>
          </div>
        );
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="bg-background">
      <Suspense fallback={<SectionLoader />}>{renderCurrentSection()}</Suspense>
    </div>
  );
};

export default InspectionIndex;
