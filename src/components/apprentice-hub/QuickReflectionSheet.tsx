import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

/* ==========================================================================
   QuickReflectionSheet — 30-second capture sheet for a daily reflection.
   Inserts to portfolio_items (category='reflection') AND optionally to
   college_otj_entries when the apprentice ticks "this counts as OTJ"
   (the canonical compliance flywheel — every reflection becomes a
   verified hour candidate).
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSaved?: () => void;
}

const PROMPTS = [
  'What did you do today?',
  'What did you learn that surprised you?',
  'What got you stuck — and how did you solve it?',
  'Who did you work with and what did they teach you?',
];

const DURATION_PRESETS = [15, 30, 60, 90, 120];

export function QuickReflectionSheet({ open, onOpenChange, onSaved }: Props) {
  const [text, setText] = useState('');
  const [countAsOtj, setCountAsOtj] = useState(true);
  const [duration, setDuration] = useState<number>(30);
  const [saving, setSaving] = useState(false);
  const [savedTick, setSavedTick] = useState(false);
  const [promptIdx] = useState(() => Math.floor(Math.random() * PROMPTS.length));
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setText('');
      setCountAsOtj(true);
      setDuration(30);
      setSavedTick(false);
    }
  }, [open]);

  const valid = text.trim().length >= 12 && (!countAsOtj || duration > 0);
  const charCount = text.trim().length;

  const handleSubmit = async () => {
    if (!valid || saving) return;
    setSaving(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id;
      if (!uid) throw new Error('Not signed in');

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', uid)
        .maybeSingle();
      const recordedByName = (profile?.full_name as string | null) ?? null;

      const { data: cs } = await supabase
        .from('college_students')
        .select('college_id')
        .eq('user_id', uid)
        .maybeSingle();
      const collegeId = (cs?.college_id as string | null) ?? null;

      const trimmed = text.trim();
      const headline = trimmed.split('\n')[0].slice(0, 80);
      const today = new Date().toISOString().slice(0, 10);

      // 1. Portfolio reflection — always inserted. Uses the canonical
      // category name so it appears in the existing portfolio UI alongside
      // any other reflections the apprentice has captured.
      const { error: pErr } = await supabase.from('portfolio_items').insert({
        user_id: uid,
        title: `Reflection · ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`,
        description: headline,
        category: 'Reflection & Learning',
        reflection_notes: trimmed,
        date_completed: today,
      });
      if (pErr) throw pErr;

      // 2. OTJ entry — optional, gated by the toggle.
      if (countAsOtj) {
        const { error: oErr } = await supabase.from('college_otj_entries').insert({
          college_id: collegeId,
          student_id: uid,
          recorded_by: uid,
          recorded_by_name_snapshot: recordedByName,
          activity_date: today,
          activity_type: 'theory',
          title: `Reflection · ${headline}`,
          description: trimmed,
          duration_minutes: duration,
          source: 'apprentice',
          source_kind: 'apprentice_submitted',
          verification_status: 'pending',
        });
        if (oErr) throw oErr;
      }

      setSavedTick(true);
      toast({
        title: countAsOtj ? 'Reflection saved · OTJ pending' : 'Reflection saved',
        description: countAsOtj
          ? `${duration}m sent to your tutor for verification.`
          : 'Added to your portfolio.',
      });
      onSaved?.();
      setTimeout(() => {
        setSavedTick(false);
        onOpenChange(false);
      }, 800);
    } catch (e) {
      toast({
        title: 'Could not save',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[80vh] sm:max-w-2xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10 bg-[hsl(0_0%_8%)]"
      >
        <SheetTitle className="sr-only">Capture daily reflection</SheetTitle>
        <div className="flex h-full flex-col">
          <header className="px-4 sm:px-5 pt-5 pb-4 border-b border-white/[0.06]">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-300/85">
              Daily reflection
            </div>
            <h2 className="mt-1 text-[18px] sm:text-[20px] font-semibold text-white leading-tight">
              {PROMPTS[promptIdx]}
            </h2>
            <p className="mt-1 text-[12.5px] text-white/85 leading-snug">
              Two minutes now saves your tutor an hour later. Goes straight into your portfolio and
              — if you tick — counts toward your verified hours.
            </p>
          </header>

          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4">
            <textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              placeholder="A few sentences. The job, the people, what you learned, where you got stuck…"
              className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14px] text-white placeholder:text-white/50 leading-relaxed focus:outline-none focus:border-white/[0.06] focus:ring-1 focus:ring-white/10 touch-manipulation resize-none"
            />
            <div className="flex items-baseline justify-between gap-3">
              <span
                className={cn('text-[10.5px] tabular-nums',
                  charCount >= 12 ? 'text-white/85' : 'text-white/95'
                )}
              >
                {charCount} chars · 12 minimum
              </span>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={countAsOtj}
                  onChange={(e) => setCountAsOtj(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border border-white/30 bg-white/[0.05] checked:bg-elec-yellow checked:border-elec-yellow touch-manipulation"
                />
                <div className="flex-1">
                  <div className="text-[13px] font-medium text-white">
                    Count this as off-the-job training
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-white/85 leading-snug">
                    Sends to your tutor for verification. Adds to your ESFA-verified hours once they
                    sign off.
                  </div>
                </div>
              </label>

              {countAsOtj && (
                <div className="mt-3 ml-6">
                  <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-white/85">
                    Duration
                  </div>
                  <div className="mt-1.5 flex items-center flex-wrap gap-1.5">
                    {DURATION_PRESETS.map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setDuration(p)}
                        className={cn('h-8 px-3 rounded-full border text-[11.5px] font-medium tabular-nums touch-manipulation transition-colors',
                          duration === p
                            ? 'border-white/[0.06] bg-white/[0.02] text-white/85'
                            : 'border-white/[0.10] bg-white/[0.02] text-white/95 hover:text-white hover:border-white/[0.22]'
                        )}
                      >
                        {p < 60 ? `${p}m` : `${p / 60}h`}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <footer className="border-t border-white/[0.06] px-4 sm:px-5 py-3 flex items-center gap-2 bg-[hsl(0_0%_6%)]">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={saving}
              className="flex-1 h-11 rounded-lg border border-white/[0.10] bg-white/[0.02] text-[13px] font-medium text-white/80 hover:text-white hover:border-white/[0.22] transition-colors touch-manipulation disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!valid || saving}
              className={cn('flex-1 h-11 rounded-lg text-[13px] font-semibold transition-colors touch-manipulation',
                valid && !saving
                  ? 'bg-white/[0.02] text-black hover:bg-white/[0.02]'
                  : 'bg-white/[0.05] text-white/40'
              )}
            >
              {savedTick ? 'Saved ✓' : saving ? 'Saving…' : 'Save reflection'}
            </button>
          </footer>
        </div>
      </SheetContent>
    </Sheet>
  );
}
