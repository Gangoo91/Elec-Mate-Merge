import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Timer } from 'lucide-react';
import { OJTHubNav, OJTNavSection } from './OJTHubNav';

interface OJTHubShellProps {
  children: ReactNode;
  activeSection: OJTNavSection;
  onSectionChange: (section: OJTNavSection) => void;
  showQuickLog?: boolean;
  onQuickLog?: () => void;
}

/**
 * OJTHubShell - Main shell/layout for OJT Hub
 *
 * Provides:
 * - Mobile-first responsive layout
 * - iOS-style bottom navigation
 * - Desktop sidebar navigation
 * - Floating action button for quick time logging
 * - Back navigation to apprentice hub
 */
export function OJTHubShell({
  children,
  activeSection,
  onSectionChange,
  showQuickLog = true,
  onQuickLog,
}: OJTHubShellProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/apprentice');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Navigation */}
      <OJTHubNav
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 lg:hidden bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-4 h-14">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-1.5 -ml-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
                <Timer className="h-4 w-4 text-elec-yellow" />
              </div>
              <span className="font-semibold text-sm text-foreground">OJT Hub</span>
            </div>
            <div className="w-16" /> {/* Spacer for balance */}
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:flex sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-6 h-16 w-full">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Apprentice Hub
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-lg font-semibold text-foreground">
                20% Off-the-Job Training
              </h1>
            </div>
            {showQuickLog && onQuickLog && (
              <Button
                onClick={onQuickLog}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2"
              >
                <Plus className="h-4 w-4" />
                Log Time
              </Button>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto pb-24 lg:pb-6">
          {children}
        </div>
      </main>

      {/* Mobile Quick Log FAB */}
      {showQuickLog && onQuickLog && (
        <div className="fixed bottom-20 right-4 z-40 lg:hidden">
          <Button
            size="lg"
            onClick={onQuickLog}
            className="h-14 w-14 rounded-full bg-elec-yellow text-black shadow-lg shadow-elec-yellow/25 hover:bg-elec-yellow/90 touch-manipulation active:scale-95"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default OJTHubShell;
