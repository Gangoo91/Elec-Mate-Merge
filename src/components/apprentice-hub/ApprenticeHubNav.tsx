/**
 * ApprenticeHubNav
 *
 * Editorial top nav for the apprentice portfolio workspace.
 *
 * Design notes:
 *   • Back arrow + minimal label (eyebrow style) — calm, modern
 *   • Tabs use a thin underline indicator on the active tab — no shouty
 *     yellow pill. Inactive tabs are muted, active is white with a yellow
 *     hairline beneath it.
 *   • The yellow accent reserved for the primary action (Add evidence).
 *   • OJT/hours intentionally NOT a tab here — OJT has its own surface
 *     at /apprentice/ojt-hub.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ApprenticeHubTab = 'home' | 'work' | 'progress' | 'me';

const navItems: { id: ApprenticeHubTab; label: string }[] = [
  { id: 'home', label: 'Portfolio' },
  { id: 'work', label: 'My work' },
  { id: 'progress', label: 'Progress' },
  { id: 'me', label: 'Me' },
];

interface ApprenticeHubNavProps {
  activeTab: ApprenticeHubTab;
  onTabChange: (tab: ApprenticeHubTab) => void;
  onCapture: () => void;
}

export function ApprenticeHubNav({ activeTab, onTabChange, onCapture }: ApprenticeHubNavProps) {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/85 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-5 h-14">
          {/* Back */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation flex-shrink-0 h-11 -ml-1"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <span aria-hidden className="hidden sm:block h-5 w-px bg-white/10" />

          {/* Tabs — editorial: text only, hairline underline on active */}
          <div className="flex-1 flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    'relative flex items-center h-14 px-2.5 sm:px-3.5 text-[13px] sm:text-[13.5px] font-medium tracking-tight whitespace-nowrap touch-manipulation transition-colors',
                    isActive
                      ? 'text-white'
                      : 'text-white/55 hover:text-white/85'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      'absolute left-2.5 right-2.5 sm:left-3.5 sm:right-3.5 bottom-0 h-px transition-all',
                      isActive ? 'bg-elec-yellow' : 'bg-transparent'
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* Primary action */}
          <button
            onClick={onCapture}
            className="inline-flex items-center gap-1.5 h-9 px-3 sm:px-4 rounded-md bg-elec-yellow text-black text-[12.5px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.97] transition-all touch-manipulation flex-shrink-0"
            aria-label="Add evidence"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">Add evidence</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default ApprenticeHubNav;
