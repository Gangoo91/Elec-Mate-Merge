import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PortfolioHubShell } from '@/components/portfolio-hub/PortfolioHubShell';
import { PortfolioOverview } from '@/components/portfolio-hub/PortfolioOverview';
import { NavSection } from '@/components/portfolio-hub/PortfolioHubNav';
import { useAuth } from '@/contexts/AuthContext';
import { useUltraFastPortfolio } from '@/hooks/portfolio/useUltraFastPortfolio';
import { useComplianceTracking } from '@/hooks/time-tracking/useComplianceTracking';
import { useStudentQualification } from '@/hooks/useStudentQualification';

// Placeholder components for other sections (to be built in Phase 2-5)
import { EvidenceSection } from './sections/EvidenceSection';
import { ProgressSection } from './sections/ProgressSection';
import { TutorSection } from './sections/TutorSection';
import { ExportSection } from './sections/ExportSection';

/**
 * PortfolioHub - Main unified page for Portfolio & OJT management
 *
 * Routes:
 * - /apprentice/portfolio-hub (default: overview)
 * - /apprentice/portfolio-hub?section=evidence
 * - /apprentice/portfolio-hub?section=progress
 * - /apprentice/portfolio-hub?section=tutor
 * - /apprentice/portfolio-hub?section=export
 */
export default function PortfolioHub() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, profile } = useAuth();

  // Get section from URL or default to 'home'
  const sectionParam = searchParams.get('section') as NavSection | null;
  const [activeSection, setActiveSection] = useState<NavSection>(sectionParam || 'home');

  // Quick capture state
  const [isQuickCaptureOpen, setIsQuickCaptureOpen] = useState(false);

  // Data hooks
  const {
    entries,
    categories,
    analytics,
    isLoading: portfolioLoading,
  } = useUltraFastPortfolio();

  const {
    otjGoal,
    isLoading: complianceLoading,
  } = useComplianceTracking();

  const {
    qualificationName,
    requirementCode,
  } = useStudentQualification();

  // Sync URL with active section - use replace: false to create history entries for back button
  useEffect(() => {
    if (activeSection === 'home') {
      searchParams.delete('section');
    } else {
      searchParams.set('section', activeSection);
    }
    setSearchParams(searchParams, { replace: false });
  }, [activeSection]);

  // Sync active section with URL on mount
  useEffect(() => {
    if (sectionParam && ['home', 'evidence', 'progress', 'tutor', 'export'].includes(sectionParam)) {
      setActiveSection(sectionParam);
    }
  }, []);

  const handleSectionChange = (section: NavSection) => {
    setActiveSection(section);
  };

  const handleQuickCapture = () => {
    setIsQuickCaptureOpen(true);
  };

  // Calculate progress data
  const portfolioProgress = {
    current: analytics?.completedEntries || 0,
    target: categories.reduce((sum, cat) => sum + (cat.requiredEntries || 0), 0) || 20,
  };

  const otjProgress = {
    current: Math.round(otjGoal?.current_hours || 0),
    target: otjGoal?.target_hours || 400,
  };

  // Calculate pending reviews from actual entry data
  const pendingReviews = entries.filter(e => e.status === 'pending_review').length;

  // Mock recent activity (will be replaced with real data)
  const recentActivity = entries.slice(0, 5).map((entry) => ({
    id: entry.id,
    type: 'evidence_added' as const,
    title: entry.title,
    description: entry.category?.name || 'Portfolio Entry',
    timestamp: new Date(entry.dateCreated),
  }));

  // Smart next action
  const nextAction = getNextAction(portfolioProgress, otjProgress, entries.length);

  // Get user display name
  const userName = profile?.full_name
    ? profile.full_name
    : user?.email?.split('@')[0] || 'Apprentice';

  // Render active section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <PortfolioOverview
            userName={userName}
            portfolioProgress={portfolioProgress}
            otjProgress={otjProgress}
            pendingReviews={pendingReviews}
            recentActivity={recentActivity}
            nextAction={nextAction}
            onNavigate={handleSectionChange}
            onQuickCapture={handleQuickCapture}
            requirementCode={requirementCode}
            qualificationName={qualificationName}
          />
        );
      case 'evidence':
        return <EvidenceSection onQuickCapture={handleQuickCapture} />;
      case 'progress':
        return <ProgressSection />;
      case 'tutor':
        return <TutorSection />;
      case 'export':
        return <ExportSection />;
      default:
        return null;
    }
  };

  return (
    <PortfolioHubShell
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
      showQuickCapture={activeSection !== 'export'}
    >
      {renderSectionContent()}
    </PortfolioHubShell>
  );
}

// Helper: Determine smart next action
function getNextAction(
  portfolio: { current: number; target: number },
  otj: { current: number; target: number },
  totalEntries: number
): { type: 'capture' | 'review' | 'hours' | 'ksb'; title: string; description: string; priority: 'high' | 'medium' | 'low' } | undefined {
  const portfolioPercent = portfolio.target > 0 ? (portfolio.current / portfolio.target) * 100 : 0;
  const otjPercent = otj.target > 0 ? (otj.current / otj.target) * 100 : 0;

  // No entries yet - prompt to start
  if (totalEntries === 0) {
    return {
      type: 'capture',
      title: 'Start Your Portfolio',
      description: 'Capture your first piece of evidence to begin building your portfolio',
      priority: 'high',
    };
  }

  // Behind on OTJ hours (less than expected progress through year)
  const expectedOtjPercent = getExpectedProgressPercent();
  if (otjPercent < expectedOtjPercent - 10) {
    return {
      type: 'hours',
      title: 'Log Your Training Hours',
      description: `You're ${Math.round(expectedOtjPercent - otjPercent)}% behind on your 20% OTJ target`,
      priority: 'high',
    };
  }

  // Portfolio needs work
  if (portfolioPercent < 50) {
    return {
      type: 'capture',
      title: 'Add Portfolio Evidence',
      description: `You've completed ${Math.round(portfolioPercent)}% - keep building!`,
      priority: 'medium',
    };
  }

  // Default: encourage continued progress
  return {
    type: 'capture',
    title: 'Keep Building',
    description: 'Add more evidence to strengthen your portfolio',
    priority: 'low',
  };
}

// Helper: Calculate expected progress based on time through year
function getExpectedProgressPercent(): number {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 8, 1); // September start
  if (now < startOfYear) {
    startOfYear.setFullYear(startOfYear.getFullYear() - 1);
  }
  const endOfYear = new Date(startOfYear.getFullYear() + 1, 7, 31); // August end

  const totalDays = (endOfYear.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
  const daysPassed = (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);

  return Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);
}
