/**
 * ApprenticeHubShell
 *
 * Main shell layout for the unified Apprentice Hub.
 * NO headers or sidebars - native app feel with top tab bar.
 * Full-screen content with sticky top navigation.
 */

import { ReactNode } from 'react';
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
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation - Sticky */}
      <ApprenticeHubNav
        activeTab={activeTab}
        onTabChange={onTabChange}
        onCapture={onCapture}
      />

      {/* Main Content Area - Full screen below nav */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default ApprenticeHubShell;
