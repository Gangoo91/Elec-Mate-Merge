import { useState } from 'react';
import { HubMasthead } from '@/components/hub/HubPrimitives';
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
      {/* The shared masthead, with the Chat / Daily-tips toggle in its trailing slot */}
      <HubMasthead
        section="Apprentice"
        title="Ask Dave · BS 7671 A4:2026"
        backTo="/apprentice"
        trailing={
          <div className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-white/[0.10] bg-white/[0.04] p-0.5">
            <SegBtn active={view === 'dave'} onClick={() => setView('dave')} label="Chat" />
            <SegBtn active={view === 'tips'} onClick={() => setView('tips')} label="Daily tips" />
          </div>
        }
      />

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

function SegBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-10 rounded-full px-3.5 text-[12px] font-semibold transition-colors touch-manipulation',
        active ? 'bg-elec-yellow text-black' : 'text-white'
      )}
    >
      {label}
    </button>
  );
}
