import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { NotificationsManager } from '@/components/notifications/NotificationsManager';

// Lazy-loaded components for code splitting
const Dashboard = lazy(() => import('@/components/Dashboard'));
const EICRForm = lazy(() => import('@/components/EICRForm'));
const EICForm = lazy(() => import('@/components/EICForm'));
const MinorWorksForm = lazy(() => import('@/components/MinorWorksForm'));
const MyReports = lazy(() => import('@/components/MyReports'));
const LearningHub = lazy(() => import('@/components/LearningHub'));

// Loading spinner for lazy components
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20 bg-background">
    <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
  </div>
);

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
    if (reportType === 'eic') {
      setCurrentSection('eic');
    } else if (reportType === 'minor-works') {
      setCurrentSection('minor-works');
    } else {
      setCurrentSection('eicr');
    }
  };

  const handleNavigate = (section: string, reportId?: string, reportType?: string) => {
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
                onBack={() => handleNavigate('dashboard')}
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
                onBack={() => handleNavigate('dashboard')}
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
              <MinorWorksForm onBack={() => handleNavigate('dashboard')} initialReportId={currentReportId} />
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
      case 'learning-hub':
        return <LearningHub onBack={() => handleNavigate('dashboard')} />;
      case 'notifications':
        return (
          <div className="bg-background text-foreground">
            <div className="sticky top-0 z-50 w-full border-b border-border/50 bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/80">
              <div className="px-3 sm:px-4">
                <div className="flex h-12 items-center justify-between">
                  <button
                    onClick={() => handleNavigate('dashboard')}
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground -ml-2 px-2 py-1 rounded"
                  >
                    <span className="text-sm">Back</span>
                  </button>
                  <span className="font-semibold">Part P Notifications</span>
                  <div className="w-16" />
                </div>
              </div>
            </div>
            <main className="px-3 sm:px-4 py-4 pb-20 sm:pb-6">
              <NotificationsManager onNavigate={handleNavigate} />
            </main>
          </div>
        );
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="bg-background">
      <Suspense fallback={<SectionLoader />}>
        {renderCurrentSection()}
      </Suspense>
    </div>
  );
};

export default InspectionIndex;
