import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
const QsReviewBenchSection = lazy(() => import('@/components/inspection/QsReviewBenchSection'));

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
    } else if (reportType && reportType.startsWith('fire-alarm')) {
      // Covers fire-alarm AND all four variants (design / commissioning /
      // inspection / modification). Each has its own React Router route.
      // Without this, variants fell through to the default EICR branch
      // below — losing the user's data into the wrong form.
      navigate(`/electrician/inspection-testing/${reportType}/${reportId}`);
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
    } else if (reportType === 'disconnection') {
      navigate(`/electrician/inspection-testing/disconnection/${reportId}`);
      return;
    } else if (reportType === 'visual-condition') {
      // Without this a saved Visual Condition Report fell through to the
      // default EICR branch below and opened as a blank EICR — the same way
      // the fire-alarm variants used to lose a user's data.
      navigate(`/electrician/inspection-testing/visual-condition/${reportId}`);
      return;
    } else if (reportType === 'routine-inspection') {
      // Same trap as the visual condition report: without an explicit branch a
      // saved routine inspection falls through to the default EICR case below
      // and opens as a blank EICR, losing the visit.
      navigate(`/electrician/inspection-testing/routine-inspection/${reportId}`);
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
    // Cert types with dedicated routes — navigate directly. Includes the
    // four fire-alarm variants explicitly so they don't fall back to EICR.
    const dedicatedRouteTypes = [
      'ev-charging',
      'fire-alarm',
      'fire-alarm-design',
      'fire-alarm-commissioning',
      'fire-alarm-inspection',
      'fire-alarm-modification',
      'emergency-lighting',
      'pat-testing',
      'solar-pv',
      'testing-only',
      'disconnection',
      'visual-condition',
      'routine-inspection',
    ];
    const effectiveType = reportType || section;
    if (dedicatedRouteTypes.includes(effectiveType) && reportId) {
      navigate(`/electrician/inspection-testing/${effectiveType}/${reportId}`);
      return;
    }
    // Types that go straight to /new (no hub page)
    const directToNewTypes = ['testing-only', 'bess', 'lightning-protection', 'g98-commissioning', 'g99-commissioning', 'smoke-co-alarm', 'disconnection', 'visual-condition', 'routine-inspection'];
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
      case 'qs-reviews':
        return <QsReviewBenchSection onBack={() => handleNavigate('dashboard')} />;
      case 'notifications':
        return (
          <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
            {/* Page header */}
            <div className="px-4 pt-3 pb-1 lg:px-8">
              <div className="mx-auto lg:max-w-[1600px]">
                <button
                  onClick={() => handleNavigate('dashboard')}
                  className="h-11 pr-2 text-[13px] font-semibold text-white/70 transition-colors hover:text-white touch-manipulation"
                >
                  Back
                </button>
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-[28px]">
                  Part P Notifications
                </h1>
                <p className="mt-1 text-[13px] text-white/50">
                  Notifiable work and the 30-day Building Regs clock — submit, track, done.
                </p>
              </div>
            </div>

            {/* Main Content — motion stagger like Business Hub */}
            <motion.main
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mx-auto space-y-5 px-4 py-4 lg:max-w-[1600px] lg:px-8"
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
