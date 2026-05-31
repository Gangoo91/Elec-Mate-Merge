import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DailyAITipsTab from '@/components/apprentice/ojt/enhanced/DailyAITipsTab';
import HelpBotTab from '@/components/apprentice/ojt/enhanced/HelpBotTab';
import { cn } from '@/lib/utils';

type View = 'dave' | 'tips';

/**
 * Ask Dave — a full-height chat that lives inside the normal app shell (the
 * global sidebar + header stay put, like every other page). It breaks out of
 * the Layout's content padding to run edge-to-edge across the content area and
 * sizes itself to exactly one viewport (below the fixed header), so the
 * messages scroll internally and the input bar stays pinned to the bottom —
 * no page scroll, no boxed-in column.
 */
export default function AdvancedHelp() {
  const navigate = useNavigate();
  // Daily Tips routes here with ?prompt= for the "Ask Dave" handoff; HelpBotTab
  // reads the param and auto-sends, so we default to the chat view.
  const [view, setView] = useState<View>('dave');

  return (
    <div
      className={cn(
        // Cancel the Layout content padding → edge-to-edge in the content area.
        '-mx-3 -mb-4 flex flex-col overflow-hidden bg-background sm:-mx-4 md:-mx-6 lg:-mx-8',
        // Exactly one viewport tall: full height minus the fixed header and the
        // content area's top padding (pt-1 / sm:pt-3 / md:pt-6).
        'h-[calc(100dvh-var(--header-height,56px)-0.25rem)]',
        'sm:h-[calc(100dvh-var(--header-height,56px)-0.75rem)]',
        'md:h-[calc(100dvh-var(--header-height,56px)-1.5rem)]'
      )}
    >
      {/* Slim page bar — identity + Chat/Daily-tips toggle */}
      <header className="shrink-0 border-b border-white/[0.06] bg-background/85 backdrop-blur-xl">
        <div className="flex h-12 w-full items-center gap-3 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate('/apprentice')}
            aria-label="Back"
            className="-ml-2 inline-flex h-9 shrink-0 items-center gap-1.5 px-2 text-[13px] font-medium text-white/70 transition-colors hover:text-elec-yellow touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="min-w-0">
            <div className="truncate text-[14px] font-semibold leading-none text-white">Ask Dave</div>
            <div className="mt-0.5 truncate text-[9px] uppercase tracking-[0.16em] text-white/40">
              Master sparky · BS 7671 A4:2026
            </div>
          </div>

          <div className="ml-auto inline-flex shrink-0 items-center gap-0.5 rounded-full border border-white/[0.08] bg-white/[0.04] p-0.5">
            <SegBtn active={view === 'dave'} onClick={() => setView('dave')} label="Chat" />
            <SegBtn active={view === 'tips'} onClick={() => setView('tips')} label="Daily tips" />
          </div>
        </div>
      </header>

      {/* Body — fills the rest of the viewport */}
      <main className="min-h-0 flex-1">
        {view === 'dave' ? (
          <HelpBotTab />
        ) : (
          <div className="h-full overflow-y-auto">
            <div className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
              <DailyAITipsTab />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function SegBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-8 rounded-full px-3.5 text-[12px] font-semibold transition-colors touch-manipulation',
        active ? 'bg-elec-yellow text-black' : 'text-white/70 hover:text-white'
      )}
    >
      {label}
    </button>
  );
}
