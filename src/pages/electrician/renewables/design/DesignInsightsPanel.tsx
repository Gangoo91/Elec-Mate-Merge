/**
 * Handover insights panel — what BS 7671 says for this technology, and what
 * the install looks like on the tools (timings, tests, defects to avoid).
 * Rendered on every designer's handover step.
 */

import { useEffect, useState } from 'react';
import { BookOpenCheck, Hammer, Loader2 } from 'lucide-react';
import { fetchDesignInsights, type DesignInsights } from '@/utils/renewables/designInsights';
import type { DesignTechnology } from '@/utils/renewables/designIntake';

export default function DesignInsightsPanel({ tech }: { tech: DesignTechnology }) {
  const [insights, setInsights] = useState<DesignInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setFailed(false);
    fetchDesignInsights(tech)
      .then((d) => alive && setInsights(d))
      .catch(() => {
        if (alive) {
          setInsights(null);
          setFailed(true);
        }
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [tech, attempt]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/[0.1] bg-white/[0.025] p-5 flex items-center gap-3">
        <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
        <p className="text-[13px] text-white/75">
          Pulling the regulations and install intelligence…
        </p>
      </div>
    );
  }
  if (failed) {
    return (
      <div className="rounded-2xl border border-white/[0.1] bg-white/[0.025] p-5 flex items-center justify-between gap-3">
        <p className="text-[13px] text-white/75">
          Couldn't load the regulations and install intelligence — check your connection.
        </p>
        <button
          type="button"
          onClick={() => setAttempt((a) => a + 1)}
          className="shrink-0 h-11 px-4 rounded-xl text-[12.5px] font-semibold text-elec-yellow bg-elec-yellow/[0.08] border border-elec-yellow/30 touch-manipulation"
        >
          Retry
        </button>
      </div>
    );
  }
  if (!insights || (insights.regs.length === 0 && insights.tasks.length === 0)) return null;

  return (
    <div className="space-y-3.5">
      {insights.regs.length > 0 && (
        <div className="rounded-2xl border border-white/[0.1] bg-white/[0.025] p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <BookOpenCheck className="h-3.5 w-3.5 text-elec-yellow" />
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              What BS 7671 says
            </p>
          </div>
          <div className="mt-3 space-y-3">
            {insights.regs.map((r, i) => (
              <div key={i} className="border-l-2 border-elec-yellow/40 pl-3">
                <p className="text-[12.5px] font-semibold text-white leading-snug">{r.topic}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-white/80 line-clamp-4">
                  {r.content}
                </p>
                {r.ref && <p className="mt-1 text-[10px] text-white/50 truncate">{r.ref}</p>}
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-white/60">BS 7671:2018+A4:2026</p>
        </div>
      )}

      {insights.tasks.length > 0 && (
        <div className="rounded-2xl border border-white/[0.1] bg-white/[0.025] p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <Hammer className="h-3.5 w-3.5 text-elec-yellow" />
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              On the tools
            </p>
          </div>
          <div className="mt-3 space-y-2">
            {insights.tasks.map((t, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <p className="text-[12.5px] text-white leading-snug min-w-0">{t.topic}</p>
                <p className="text-[12px] font-semibold text-elec-yellow tabular-nums shrink-0">
                  {t.minutes ? `~${t.minutes} min` : ''}
                  {t.team && t.team > 1 ? ` · ${t.team} crew` : ''}
                </p>
              </div>
            ))}
          </div>

          {insights.tests.length > 0 && (
            <>
              <p className="mt-4 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/70">
                Tests to record
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {insights.tests.map((t, i) => (
                  <span
                    key={i}
                    className="text-[11px] text-white/85 bg-white/[0.06] border border-white/[0.1] rounded-md px-2 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          )}

          {insights.defects.length > 0 && (
            <>
              <p className="mt-4 text-[10.5px] font-bold uppercase tracking-[0.16em] text-amber-200/90">
                Watch for
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {insights.defects.map((d, i) => (
                  <span
                    key={i}
                    className="text-[11px] text-amber-100 bg-amber-500/[0.07] border border-amber-500/25 rounded-md px-2 py-1"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </>
          )}
          <p className="mt-3 text-[10px] text-white/60">Elec-Mate install intelligence</p>
        </div>
      )}
    </div>
  );
}
