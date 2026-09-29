import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ErrorBoundary from '@/components/ErrorBoundary';
import { NotificationsManager } from '@/components/notifications/NotificationsManager';
import { SectionSkeleton } from '@/components/ui/page-skeleton';
import { certificateRoute, certificateHref, certificateNewHref } from '@/utils/certificate-href';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

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

  /**
   * Open a SAVED report in the form that owns it.
   *
   * This used to be an if/else chain naming 8 of the 29 path-routed types, with
   * a final `else` that opened the EICR form. Every type the chain did not name
   * — Smoke & CO alarm, BESS, G98/G99, lightning protection, plug-in solar,
   * heat pump, solar PV, and all seven notices — therefore opened as an EICR
   * pointed at that certificate's own row, and the EICR form merged its blank
   * field set into it on autosave. Three separate fixes had each added one
   * missing branch; the chain is gone rather than extended.
   *
   * `certificateRoute` is the single source of truth, shared with every other
   * surface that links to a certificate.
   */
  const handleEditReport = (reportId: string, reportType?: string) => {
    const route = certificateRoute(reportType || '');

    if (route.kind === 'unknown') {
      // Never guess. Opening the wrong form points a live editor at another
      // certificate's row, which is how this bug destroyed data before.
      console.error('[InspectionIndex] No route for report type', { reportType, reportId });
      toast({
        title: 'Cannot open this certificate',
        description: `"${reportType || 'unknown'}" has no editor in this version of the app. Nothing has been changed — please report it to support.`,
        variant: 'destructive',
      });
      return;
    }

    setCurrentReportId(reportId);
    setCurrentReportType(reportType || null);
    navigate(certificateHref(reportType || '', reportId));
  };

  const handleNavigate = (section: string, reportId?: string, reportType?: string) => {
    // Same single source of truth as handleEditReport. The two lists this
    // replaced (`dedicatedRouteTypes` and `directToNewTypes`) had drifted
    // apart from each other and from the router: `dedicatedRouteTypes` was
    // missing smoke-co-alarm, bess, plug-in-solar, lightning-protection, the
    // G98/G99 pair, heat-pump and every notice, while `directToNewTypes` sent
    // visual-condition and routine-inspection to a `/new` route that does not
    // exist for them.
    const effectiveType = reportType || section;
    const route = certificateRoute(effectiveType);
    if (route.kind === 'path') {
      navigate(reportId ? certificateHref(effectiveType, reportId) : certificateNewHref(effectiveType));
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
                <p className="mt-1 text-[13px] text-white">
                  Notifiable work, and the 30 days you have to tell Building Control.
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
