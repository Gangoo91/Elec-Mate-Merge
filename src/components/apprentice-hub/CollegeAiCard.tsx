import { useNavigate } from 'react-router-dom';

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
      className="group w-full text-left rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-cyan-500/[0.10] via-cyan-500/[0.04] to-transparent hover:border-cyan-400/45 hover:from-cyan-500/[0.14] transition-colors overflow-hidden touch-manipulation"
    >
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-cyan-300/85">
            College AI
          </div>
          <span className="text-[10.5px] tabular-nums text-cyan-200">grounded in your data</span>
        </div>
        <h3 className="mt-2 text-[18px] sm:text-[20px] font-semibold text-white leading-tight tracking-tight">
          Ask your AI study mentor anything
        </h3>
        <p className="mt-1 text-[12.5px] sm:text-[13px] text-white/95 leading-snug max-w-xl">
          Knows your ACs, quiz history, OTJ hours, and EPA verdicts. Cites real evidence. Never
          makes things up.
        </p>
        <ul className="mt-3 flex items-center flex-wrap gap-1.5">
          {STARTERS.map((s) => (
            <li
              key={s}
              className="inline-flex items-center h-6 px-2 rounded-full border border-white/[0.10] bg-white/[0.03] text-[10.5px] font-medium text-white/95"
            >
              "{s}"
            </li>
          ))}
        </ul>
        <div className="mt-4 inline-flex items-center h-10 px-4 rounded-lg bg-cyan-500 text-black text-[13px] font-semibold group-hover:bg-cyan-400 transition-colors">
          Open College AI →
        </div>
      </div>
    </button>
  );
}
