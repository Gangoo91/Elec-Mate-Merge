/**
 * The off-the-job quality check before an entry goes to the tutor (ELE-2052).
 *
 * useOtjQualityCheck().gate(entry) runs the rules (src/lib/otj/otjQualityCheck.ts,
 * funding rules 2026/27 paras 82 to 88) against the entry, the learner's other
 * entries that day and the units of their qualification. No flags: it lets the
 * entry through. Flags: it holds the send, OtjQualityPanel explains each one in
 * plain words, and the learner either fixes the entry (any edit re-runs the
 * check) or sends it with a short note. The fixed wording shows at once; the
 * otj-quality-explain function may reword it for this entry (marked as AI).
 */
import { useCallback, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { UsesAi } from '@/components/college/ui/UsesAi';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { textareaCn } from '@/components/forms/fieldStyles';
import {
  checkOtjEntry,
  qualityRecord,
  type OtjEntryInput,
  type OtjFlag,
  type OtjQualityRecord,
} from '@/lib/otj/otjQualityCheck';

interface HeldCheck {
  key: string;
  flags: OtjFlag[];
  /** AI rewording per flag code, when it came back. */
  worded: Record<string, string>;
}

export function useOtjQualityCheck() {
  const [held, setHeld] = useState<HeldCheck | null>(null);
  const [note, setNote] = useState('');
  const [checking, setChecking] = useState(false);
  const unitsRef = useRef<string[] | null | undefined>(undefined);
  /** The off-the-job lines of the training plan in force (ELE-2039), loaded once. */
  const planRef = useRef<string[] | null | undefined>(undefined);

  const reset = useCallback(() => {
    setHeld(null);
    setNote('');
    unitsRef.current = undefined;
  }, []);

  const word = useCallback(async (key: string, flags: OtjFlag[], entry: OtjEntryInput) => {
    try {
      const { data } = await supabase.functions.invoke('otj-quality-explain', {
        body: { flags: flags.map((f) => ({ code: f.code, explanation: f.explanation })), entry },
      });
      const list =
        (data as { explanations?: Array<{ code: string; text: string }> } | null)?.explanations ??
        [];
      if (!list.length) return;
      setHeld((h) =>
        h && h.key === key
          ? { ...h, worded: Object.fromEntries(list.map((x) => [x.code, x.text])) }
          : h
      );
    } catch {
      /* the fixed wording stays */
    }
  }, []);

  /**
   * ok: send it, with this record on the entry. Not ok: the panel is showing
   * flags (or a note is still needed).
   */
  const gate = useCallback(
    async (
      entry: OtjEntryInput
    ): Promise<{ ok: boolean; record?: OtjQualityRecord; reason?: string }> => {
      const key = JSON.stringify(entry);
      if (held && held.key === key) {
        if (held.flags.length && note.trim().length < 10)
          return {
            ok: false,
            reason: 'Fix the entry, or say in a sentence why it is right as it is.',
          };
        return { ok: true, record: qualityRecord(held.flags, held.flags.length ? note : null) };
      }
      setChecking(true);
      try {
        const { data: u } = await supabase.auth.getUser();
        const uid = u.user?.id;
        let sameDay: OtjEntryInputContext['sameDay'] = [];
        if (uid && entry.activity_date) {
          const { data } = await supabase
            .from('college_otj_entries')
            .select('id, title, duration_minutes, activity_type, verification_status')
            .eq('student_id', uid)
            .eq('activity_date', entry.activity_date);
          sameDay = (
            (data ?? []) as Array<
              OtjEntryInputContext['sameDay'][number] & { verification_status: string | null }
            >
          )
            .filter((r) => r.verification_status !== 'rejected')
            .map((r) => ({
              id: r.id,
              title: r.title ?? '',
              duration_minutes: r.duration_minutes ?? 0,
              activity_type: r.activity_type,
            }));
        }
        if (unitsRef.current === undefined) {
          const { data: acs, error } = await supabase.rpc('get_portfolio_ac_state' as never);
          unitsRef.current = error
            ? null
            : [
                ...new Set(((acs ?? []) as Array<{ unit_code: string }>).map((a) => a.unit_code)),
              ].filter(Boolean);
          if (unitsRef.current && unitsRef.current.length === 0) unitsRef.current = null;
        }
        if (planRef.current === undefined) {
          // RLS returns only this apprentice's own plans.
          const { data: plans, error } = await supabase
            .from('college_training_plans' as never)
            .select('content')
            .eq('status', 'in_force')
            .order('version', { ascending: false })
            .limit(1);
          const rows = ((plans as Array<{
            content: {
              occupational_training?: Array<{
                content?: string;
                activity?: string;
                in_otj?: boolean | null;
              }>;
            } | null;
          }> | null) ?? [])[0]?.content?.occupational_training;
          planRef.current = error
            ? null
            : (rows ?? [])
                .filter((r) => r.in_otj !== false)
                .map((r) => [r.content, r.activity].filter(Boolean).join(' · '))
                .filter(Boolean);
          if (planRef.current && planRef.current.length === 0) planRef.current = null;
        }
        const flags = checkOtjEntry(entry, {
          sameDay,
          qualificationUnits: unitsRef.current ?? null,
          planActivities: planRef.current ?? null,
        });
        setHeld({ key, flags, worded: {} });
        if (!flags.length) return { ok: true, record: qualityRecord([], null) };
        setNote('');
        void word(key, flags, entry);
        return { ok: false };
      } finally {
        setChecking(false);
      }
    },
    [held, note, word]
  );

  return { held, note, setNote, checking, gate, reset };
}

type OtjEntryInputContext = Parameters<typeof checkOtjEntry>[1];
export type OtjQualityCheck = ReturnType<typeof useOtjQualityCheck>;

/** Shown while a check holds the send. `current` = the form as it is now. */
export function OtjQualityPanel({
  qc,
  current,
  onFix,
}: {
  qc: OtjQualityCheck;
  current: OtjEntryInput;
  onFix: (field: OtjFlag['field']) => void;
}) {
  const h = qc.held;
  if (!h || !h.flags.length) return null;
  const stale = h.key !== JSON.stringify(current);
  return (
    <div
      className={cn('space-y-4 rounded-2xl border border-white/[0.18] p-4', CARD_SURFACE)}
      data-testid="otj-quality-panel"
      role="region"
      aria-label="Check before you send"
    >
      <div>
        <p className="text-[15px] font-semibold text-white">Check before you send</p>
        <p className="mt-1 text-[13px] leading-snug text-white">
          {stale
            ? 'You changed the entry. Tap Send again and it will be checked again.'
            : `${h.flags.length === 1 ? 'One thing' : `${h.flags.length} things`} your tutor would question, from the funding rules for off-the-job training. Fix ${h.flags.length === 1 ? 'it' : 'them'}, or send it with a note.`}
        </p>
      </div>
      <ul className="divide-y divide-white/[0.1]">
        {h.flags.map((f) => {
          const worded = h.worded[f.code];
          return (
            <li
              key={f.code}
              className="space-y-1.5 py-3 first:pt-0"
              data-testid={`otj-flag-${f.code}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-[14px] font-semibold text-white">{f.title}</p>
                <span
                  className={cn(
                    'rounded-full border px-2 py-0.5 text-[13px] font-semibold',
                    f.severity === 'likely'
                      ? 'border-orange-400 text-orange-300'
                      : 'border-white/[0.3] text-white'
                  )}
                >
                  {f.severity === 'likely' ? 'Probably not counted' : 'Check'}
                </span>
              </div>
              <p
                className="text-[13px] leading-snug text-white"
                data-testid={`otj-flag-why-${f.code}`}
              >
                {worded ?? f.explanation}
              </p>
              {worded && <UsesAi className="mr-1" />}
              <p className="text-[12.5px] leading-snug text-white">
                <span className="font-semibold">To fix: </span>
                {f.fix}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[12px] text-white">Funding rules 2026/27, para {f.para}</span>
                {f.field && (
                  <button
                    type="button"
                    onClick={() => onFix(f.field)}
                    className="h-11 touch-manipulation px-1 text-[13px] font-semibold text-elec-yellow"
                  >
                    Fix it
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {!stale && (
        <div>
          <label htmlFor="otj-qc-note" className="mb-1 block text-[12px] font-medium text-white">
            Or send it as it is, with a note for your tutor
          </label>
          <textarea
            id="otj-qc-note"
            rows={2}
            value={qc.note}
            onChange={(e) => qc.setNote(e.target.value)}
            placeholder="e.g. It was revision for the test, not the test itself."
            className={cn(textareaCn, 'w-full resize-none')}
            data-testid="otj-qc-note"
          />
          <p className="mt-1 text-[12px] text-white">Your tutor sees these checks and your note.</p>
        </div>
      )}
    </div>
  );
}
