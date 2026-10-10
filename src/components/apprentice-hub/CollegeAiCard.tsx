import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { UsesAi } from '@/components/college/ui/UsesAi';
import { LC_TILE, LC_TOP_LINE } from '@/components/apprentice-hub/college-hub/learnerUi';

/* ==========================================================================
   CollegeAiCard — apprentice-side hero tile linking to /apprentice/college-ai.
   Same prominence the Elec-AI tile gets in the electrician hub. Editorial:
   single panel, white headline, soft eyebrow + cta line, no decorative icons.
   ========================================================================== */

const STARTERS = [
  'What should I focus on this week?',
  'Explain my last quiz mistake',
  'Draft a reflection from my last OTJ',
];

export function CollegeAiCard() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate('/apprentice/college-ai')}
      className={cn(
        LC_TILE,
        '-mx-4 w-[calc(100%+2rem)] rounded-none border-x-0 sm:mx-0 sm:w-full sm:rounded-2xl sm:border-x'
      )}
    >
      <span className={LC_TOP_LINE} aria-hidden />
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[13px] font-semibold text-white">College AI</span>
          <UsesAi />
        </div>
        <h3 className="mt-1.5 text-[17px] font-semibold leading-tight tracking-tight text-white">
          Ask your study mentor
        </h3>
        <p className="mt-1 max-w-xl text-[13px] leading-snug text-white">
          It reads your criteria, quiz results, off-the-job hours and EPA mocks, and points to the
          evidence it used. Check anything important with your tutor.
        </p>
        {/* Example questions read as text, not as chips that look tappable. */}
        <p className="mt-3 text-[13px] font-medium text-white">Try asking</p>
        <ul className="mt-1 space-y-0.5">
          {STARTERS.map((s) => (
            <li key={s} className="text-[13.5px] leading-snug text-white">
              “{s}”
            </li>
          ))}
        </ul>
        <div className="mt-4 flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.14] px-4 text-[13.5px] font-semibold text-white transition-colors group-hover:border-elec-yellow sm:inline-flex sm:w-auto">
          Open College AI
        </div>
      </div>
    </button>
  );
}
