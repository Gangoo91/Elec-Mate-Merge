import { useCallback, useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { QuickReflectionSheet } from './QuickReflectionSheet';

/* ==========================================================================
   MyReflectionCard — primary CTA "Capture today's reflection". Surfaces:
     - current streak (consecutive days with at least one reflection)
     - the last 3 reflections (date + headline) tappable to open a viewer
     - "Show all" expansion to see up to ~20 entries

   Reads `portfolio_items` filtered to category='Reflection & Learning'
   so it shares storage with the existing portfolio view.
   ========================================================================== */

interface ReflectionRow {
  id: string;
  title: string | null;
  description: string | null;
  reflection_notes: string | null;
  date_completed: string | null;
  created_at: string | null;
}

function dayKey(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10);
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function previousKey(key: string, daysBack: number): string {
  const d = new Date(`${key}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - daysBack);
  return d.toISOString().slice(0, 10);
}

function fmtDate(iso: string | null): string {
  if (!iso) return '';
  const t = new Date(iso).getTime();
  const days = Math.round((Date.now() - t) / 86_400_000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function MyReflectionCard() {
  const [rows, setRows] = useState<ReflectionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [captureOpen, setCaptureOpen] = useState(false);
  const [viewing, setViewing] = useState<ReflectionRow | null>(null);
  const [showAll, setShowAll] = useState(false);

  const fetchAll = useCallback(async () => {
    const { data: u } = await supabase.auth.getUser();
    const uid = u.user?.id;
    if (!uid) {
      setLoading(false);
      return;
    }
    // 60-day window so the streak stays accurate even after a few skipped
    // days, and there's a reasonable history list to scroll.
    const since = new Date();
    since.setDate(since.getDate() - 60);
    const { data } = await supabase
      .from('portfolio_items')
      .select('id, title, description, reflection_notes, date_completed, created_at')
      .eq('user_id', uid)
      .eq('category', 'Reflection & Learning')
      .gte('created_at', since.toISOString())
      .order('created_at', { ascending: false })
      .limit(50);
    setRows((data ?? []) as ReflectionRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const { streak, reflectedToday } = useMemo(() => {
    const days = new Set<string>();
    for (const r of rows) {
      const iso = r.date_completed ?? r.created_at;
      if (iso) days.add(dayKey(iso));
    }
    let s = 0;
    const today = todayKey();
    let cursor = days.has(today) ? today : previousKey(today, 1);
    while (days.has(cursor)) {
      s += 1;
      cursor = previousKey(cursor, 1);
    }
    return { streak: s, reflectedToday: days.has(today) };
  }, [rows]);

  const visible = showAll ? rows.slice(0, 20) : rows.slice(0, 3);

  return (
    <>
      <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
        <div className="px-4 sm:px-5 py-4 sm:py-5">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-cyan-300/85">
              Reflection
            </div>
            {!loading && streak > 0 && (
              <span className="text-[10.5px] tabular-nums text-white/85">{streak}-day streak</span>
            )}
          </div>

          <p className="mt-3 text-[12.5px] sm:text-[13px] text-white leading-snug">
            {reflectedToday
              ? 'Captured today. Keep the streak alive tomorrow.'
              : streak > 0
                ? `${streak} days in a row. Don't break the chain — capture today's reflection.`
                : 'Two minutes today. Goes into your portfolio and — if you tick — counts toward your verified hours.'}
          </p>

          <button
            type="button"
            onClick={() => setCaptureOpen(true)}
            className="mt-4 w-full h-11 rounded-lg bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
          >
            {reflectedToday ? 'Add another reflection' : 'Capture today'}
          </button>

          {/* Past reflections */}
          {!loading && rows.length > 0 && (
            <div className="mt-5 -mx-1">
              <div className="px-1 text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/95">
                Past reflections
              </div>
              <ul className="mt-2 divide-y divide-white/[0.05]">
                {visible.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => setViewing(r)}
                      className="w-full px-1 py-2.5 flex items-baseline justify-between gap-3 text-left hover:bg-white/[0.02] transition-colors touch-manipulation"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-medium text-white leading-snug truncate">
                          {r.title ?? 'Reflection'}
                        </div>
                        {r.description && (
                          <div className="mt-0.5 text-[11.5px] text-white/85 leading-snug line-clamp-2">
                            {r.description}
                          </div>
                        )}
                      </div>
                      <span className="shrink-0 text-[10.5px] text-white/95 tabular-nums whitespace-nowrap">
                        {fmtDate(r.date_completed ?? r.created_at)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              {rows.length > 3 && (
                <button
                  type="button"
                  onClick={() => setShowAll((v) => !v)}
                  className="mt-2 px-1 text-[11.5px] font-medium text-white/85 hover:text-white/85 transition-colors touch-manipulation"
                >
                  {showAll ? 'Show less' : `Show ${Math.min(17, rows.length - 3)} more`}
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <QuickReflectionSheet
        open={captureOpen}
        onOpenChange={setCaptureOpen}
        onSaved={() => fetchAll()}
      />

      <ReflectionViewerSheet row={viewing} onClose={() => setViewing(null)} />
    </>
  );
}

function ReflectionViewerSheet({
  row,
  onClose,
}: {
  row: ReflectionRow | null;
  onClose: () => void;
}) {
  return (
    <Sheet open={Boolean(row)} onOpenChange={(v) => (!v ? onClose() : undefined)}>
      <SheetContent
        side="bottom"
        className="h-[80vh] sm:max-w-2xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10 bg-[hsl(0_0%_8%)]"
      >
        <SheetTitle className="sr-only">Past reflection</SheetTitle>
        {row && (
          <div className="flex h-full flex-col">
            <header className="px-4 sm:px-5 pt-5 pb-4 border-b border-white/[0.06]">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-300/85">
                Reflection
              </div>
              <h2 className="mt-1 text-[18px] sm:text-[20px] font-semibold text-white leading-tight">
                {row.title ?? 'Reflection'}
              </h2>
              <p className="mt-1 text-[11.5px] text-white/85">
                {fmtDate(row.date_completed ?? row.created_at)}
                {row.created_at && (
                  <>
                    {' · '}
                    <span className="tabular-nums">
                      {new Date(row.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </>
                )}
              </p>
            </header>

            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4">
              {row.reflection_notes ? (
                <div className="text-[13.5px] text-white leading-relaxed whitespace-pre-wrap">
                  {row.reflection_notes}
                </div>
              ) : row.description ? (
                <div className="text-[13.5px] text-white leading-relaxed whitespace-pre-wrap">
                  {row.description}
                </div>
              ) : (
                <p className="text-[12.5px] text-white/85">No content recorded.</p>
              )}
            </div>

            <footer className="border-t border-white/[0.06] px-4 sm:px-5 py-3 bg-[hsl(0_0%_6%)]">
              <button
                type="button"
                onClick={onClose}
                className="w-full h-11 rounded-lg border border-white/[0.10] bg-white/[0.02] text-[13px] font-medium text-white/80 hover:text-white hover:border-white/[0.22] transition-colors touch-manipulation"
              >
                Close
              </button>
            </footer>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
