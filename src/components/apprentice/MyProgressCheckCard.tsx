import { useMyProgressCheck } from '@/hooks/useMyProgressCheck';

/**
 * Apprentice-facing "where to focus next" card — the supportive end of the
 * college → apprentice loop. Shows only learning-focus nudges (the RPC strips
 * anything pastoral/safeguarding and we never show a risk level), so it reads as
 * help, not a warning. Renders nothing when there's nothing to nudge.
 */
export function MyProgressCheckCard() {
  const { focus, loading } = useMyProgressCheck();

  if (loading || focus.length === 0) return null;

  return (
    <div className="rounded-2xl border border-elec-yellow/25 bg-elec-yellow/[0.06] p-4 sm:p-5 space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
        <h3 className="text-base font-semibold text-foreground">Where to focus next</h3>
      </div>
      <p className="text-[12.5px] text-white/55 leading-snug">
        A few things that&apos;ll keep your apprenticeship on track. Small steps now save a scramble
        later.
      </p>
      <ul className="space-y-2">
        {focus.slice(0, 4).map((f, i) => (
          <li
            key={f.key ?? i}
            className="rounded-xl border border-white/[0.08] bg-black/20 px-3.5 py-2.5"
          >
            <div className="text-[13px] font-medium text-foreground leading-snug">{f.label}</div>
            {f.detail && (
              <div className="mt-0.5 text-[11.5px] text-white/50 leading-snug">{f.detail}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
