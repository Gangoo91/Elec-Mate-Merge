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
  // Always wide on desktop (Andrew, 6 Oct): every tab uses the width with
  // real multi-column layouts, capped at 1600px so lines stay readable on a
  // very large screen. Phone stays a single column.

  return (
    <div className="min-h-screen bg-elec-dark flex flex-col">
      {/* Top Navigation - Sticky */}
      <ApprenticeHubNav activeTab={activeTab} onTabChange={onTabChange} onCapture={onCapture} />

      {/* Main Content Area - Full screen below nav */}
      <main className="flex-1">
        <div className={cn('mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8')}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default ApprenticeHubShell;
