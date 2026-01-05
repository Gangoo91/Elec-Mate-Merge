import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Dashboard from '@/components/Dashboard';
import EICRForm from '@/components/EICRForm';
import EICForm from '@/components/EICForm';
import MinorWorksForm from '@/components/MinorWorksForm';
import MyReports from '@/components/MyReports';
import LearningHub from '@/components/LearningHub';
import ErrorBoundary from '@/components/ErrorBoundary';

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

  // Update section when navigation state changes (from customer page)
  useEffect(() => {
    if (location.state?.section) {
      setCurrentSection(location.state.section);
    }
  }, [location.state?.section]);

  // Update section, reportId, and reportType when URL parameters change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    const reportId = params.get('reportId');
    const reportType = params.get('reportType');

    if (section && section !== currentSection) {
      setCurrentSection(section);
    }
    if (reportId !== currentReportId) {
      setCurrentReportId(reportId);
    }
    if (reportType !== currentReportType) {
      setCurrentReportType(reportType);
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
          <div className="min-h-screen bg-background text-foreground">
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
          <div className="min-h-screen bg-background text-foreground">
            <ErrorBoundary>
              <EICForm
                onBack={() => handleNavigate('dashboard')}
                initialReportId={currentReportId}
              />
            </ErrorBoundary>
          </div>
        );
      case 'minor-works':
        return (
          <div className="min-h-screen bg-background text-foreground">
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
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentSection()}
    </div>
  );
};

export default InspectionIndex;
