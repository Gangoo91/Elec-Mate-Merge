import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { PortfolioHubNav, NavSection } from './PortfolioHubNav';
import { QuickCaptureButton } from './QuickCaptureButton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FolderOpen, Plus } from 'lucide-react';

interface PortfolioHubShellProps {
  children: ReactNode;
  activeSection: NavSection;
  onSectionChange: (section: NavSection) => void;
  showQuickCapture?: boolean;
  onQuickCapture?: () => void;
}

/**
 * PortfolioHubShell - Main layout container for the unified Portfolio & OJT Hub
 *
 * Mobile: Bottom navigation bar with floating capture button
 * Desktop: Sidebar navigation with inline capture button
 */
export function PortfolioHubShell({
  children,
  activeSection,
  onSectionChange,
  showQuickCapture = true,
}: PortfolioHubShellProps) {
  const [isQuickCaptureOpen, setIsQuickCaptureOpen] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/apprentice');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Mobile Header - Hidden on desktop */}
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
              <FolderOpen className="h-4 w-4 text-elec-yellow" />
            </div>
            <span className="font-semibold text-sm text-foreground">Portfolio Hub</span>
          </div>
          <div className="w-16" /> {/* Spacer for balance */}
        </div>
      </header>

      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 xl:w-72 border-r border-border bg-card/50 sticky top-0 h-screen">
        {/* Desktop Back Button */}
        <div className="p-3 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="gap-2 text-muted-foreground hover:text-foreground w-full justify-start"
          >
            <ArrowLeft className="h-4 w-4" />
            Apprentice Hub
          </Button>
        </div>
        <div className="p-4 border-b border-border">
          <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-elec-yellow flex items-center justify-center">
              <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </span>
            Portfolio Hub
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Capture, Track, Showcase</p>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          <DesktopNavItem
            icon="home"
            label="Overview"
            active={activeSection === 'home'}
            onClick={() => onSectionChange('home')}
          />
          <DesktopNavItem
            icon="camera"
            label="My Evidence"
            active={activeSection === 'evidence'}
            onClick={() => onSectionChange('evidence')}
          />
          <DesktopNavItem
            icon="chart"
            label="Progress"
            active={activeSection === 'progress'}
            onClick={() => onSectionChange('progress')}
          />
          <DesktopNavItem
            icon="chat"
            label="Tutor Hub"
            active={activeSection === 'tutor'}
            onClick={() => onSectionChange('tutor')}
            badge={3} // Example: unread messages
          />
          <DesktopNavItem
            icon="export"
            label="Export"
            active={activeSection === 'export'}
            onClick={() => onSectionChange('export')}
          />
        </nav>

        {/* Desktop Quick Stats */}
        <div className="p-4 border-t border-border space-y-3">
          <QuickStatItem label="Portfolio" value="67%" color="text-green-500" />
          <QuickStatItem label="OTJ Hours" value="340h" color="text-purple-500" />
          <QuickStatItem label="Reviews" value="12" color="text-blue-500" />
        </div>

        {/* Desktop Capture Button */}
        {showQuickCapture && (
          <div className="p-4 border-t border-border">
            <button
              onClick={() => setIsQuickCaptureOpen(true)}
              className="w-full py-3 px-4 bg-elec-yellow text-black font-semibold rounded-xl hover:bg-elec-yellow/90 transition-colors flex items-center justify-center gap-2 touch-manipulation active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Quick Capture
            </button>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation - Hidden on desktop */}
      <PortfolioHubNav
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        className="lg:hidden"
      />

      {/* Mobile Floating Action Button */}
      {showQuickCapture && (
        <QuickCaptureButton
          isOpen={isQuickCaptureOpen}
          onOpenChange={setIsQuickCaptureOpen}
          className="lg:hidden"
        />
      )}
    </div>
  );
}

// Desktop Navigation Item
interface DesktopNavItemProps {
  icon: 'home' | 'camera' | 'chart' | 'chat' | 'export';
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}

function DesktopNavItem({ icon, label, active, onClick, badge }: DesktopNavItemProps) {
  const icons = {
    home: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    camera: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    chart: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    chat: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    export: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative touch-manipulation",
        active
          ? "bg-elec-yellow/10 text-elec-yellow"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {icons[icon]}
      <span>{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="absolute right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 min-w-[20px] flex items-center justify-center px-1">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  );
}

// Quick Stat Item for sidebar
function QuickStatItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={cn("text-sm font-semibold", color)}>{value}</span>
    </div>
  );
}

export default PortfolioHubShell;
