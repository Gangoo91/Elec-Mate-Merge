/**
 * ApprenticeHubShell
 *
 * Main shell layout for the unified Apprentice Hub.
 * NO headers or sidebars - native app feel with top tab bar.
 * Full-screen content with sticky top navigation.
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ApprenticeHubNav, ApprenticeHubTab } from './ApprenticeHubNav';

interface ApprenticeHubShellProps {
  children: ReactNode;
  activeTab: ApprenticeHubTab;
  onTabChange: (tab: ApprenticeHubTab) => void;
  onCapture: () => void;
}

export function ApprenticeHubShell({
  children,
  activeTab,
  onTabChange,
  onCapture,
}: ApprenticeHubShellProps) {
  // The media grid (My work) and the dashboard (Progress) breathe better on a
  // wider canvas — match the nav's max-w-7xl. Reading-width tabs stay narrower.
  const wide = activeTab === 'work' || activeTab === 'progress';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation - Sticky */}
      <ApprenticeHubNav activeTab={activeTab} onTabChange={onTabChange} onCapture={onCapture} />

      {/* Main Content Area - Full screen below nav */}
      <main className="flex-1">
        <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', wide ? 'max-w-7xl' : 'max-w-6xl')}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default ApprenticeHubShell;
