import { useEffect, useRef, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  checkLineCn,
  checkboxCn,
  chipBase,
  chipOff,
  chipOn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { Checkbox } from '@/components/ui/checkbox';
import { useSheetDraft } from '@/hooks/useSheetDraft';
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
  // Set once the user touches the toggle, so the college lookup below can't override their choice.
  const otjTouched = useRef(false);
  const [duration, setDuration] = useState<number>(30);
  const [saving, setSaving] = useState(false);
  const [savedTick, setSavedTick] = useState(false);
  const [promptIdx] = useState(() => Math.floor(Math.random() * PROMPTS.length));
  // undefined = not looked up yet, null = no college on record. An OTJ entry
  // needs a college to verify it; without one the row would sit "pending"
  // with nobody to sign it, while the toast claimed it had gone to a tutor.
  const [collegeId, setCollegeId] = useState<string | null | undefined>(undefined);
  const { toast } = useToast();
  const canLogOtj = Boolean(collegeId);
  const [uid, setUid] = useState<string | null>(null);

  // Free prose is exactly what gets lost when the phone goes back in a pocket.
  const draft = useSheetDraft<string>(uid ? `reflection:${uid}` : null, text, {
    enabled: open && !saving,
    isEmpty: (t) => t.trim().length === 0,
  });

  useEffect(() => {
    if (!open) return;
    setText('');
    setDuration(30);
    setSavedTick(false);
    setCountAsOtj(false);
    otjTouched.current = false;
    let cancelled = false;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id;
      if (!uid) {
        if (!cancelled) setCollegeId(null);
        return;
      }
      if (!cancelled) setUid(uid);
      const { data: cs } = await supabase
        .from('college_students')
        .select('college_id')
        .eq('user_id', uid)
        .maybeSingle();
      if (cancelled) return;
      const id = (cs?.college_id as string | null) ?? null;
      setCollegeId(id);
      if (!otjTouched.current) setCountAsOtj(Boolean(id));
    })();
    return () => {
      cancelled = true;
    };
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

      // 2. OTJ entry — optional, gated by the toggle AND a college to verify it.
      const logOtj = countAsOtj && Boolean(collegeId);
      if (logOtj) {
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

      draft.clear();
      setSavedTick(true);
      toast({
        title: logOtj ? 'Reflection saved · OTJ pending' : 'Reflection saved',
        description: logOtj
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
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Daily reflection"
      title={PROMPTS[promptIdx]}
      description="Thirty seconds, in your own words. It goes into your portfolio as a reflection."
      headerTrailing={
        draft.savedAt && text.trim() ? (
          <span className="text-[12px] font-medium text-green-400">Draft saved</span>
        ) : undefined
      }
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={saving}
            className={buttonSecondaryCn}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!valid || saving}
            className={buttonPrimaryCn}
          >
            {savedTick ? 'Saved ✓' : saving ? 'Saving…' : 'Save reflection'}
          </button>
        </div>
      }
    >
      {draft.hasDraft && draft.draft && !text && (
        <div className="space-y-3 rounded-2xl border border-elec-yellow/35 bg-white/[0.05] p-4">
          <p className="text-[13px] leading-snug text-white">
            <span className="font-semibold">Unfinished reflection</span> — pick up where you left
            off?
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={draft.clear} className={cn(buttonSecondaryCn, 'h-11')}>
              Discard
            </button>
            <button
              type="button"
              onClick={() => {
                if (draft.draft) setText(draft.draft);
                draft.dismiss();
              }}
              className={cn(buttonPrimaryCn, 'h-11')}
            >
              Resume
            </button>
          </div>
        </div>
      )}

      <div>
        <label className={labelCn} htmlFor="reflection-text">
          Your reflection
        </label>
        <textarea
          id="reflection-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          autoFocus
          placeholder="What happened, what you learned, what you would do differently…"
          className={cn(textareaCn, 'w-full resize-none')}
        />
        <div className="mt-1 text-right text-[11px] tabular-nums text-white">
          {charCount} chars · 12 minimum
        </div>
      </div>

      {canLogOtj ? (
        <div className="space-y-3 rounded-2xl border border-white/[0.14] bg-white/[0.05] p-4">
          <label className={checkLineCn}>
            <Checkbox
              checked={countAsOtj}
              onCheckedChange={(v) => {
                otjTouched.current = true;
                setCountAsOtj(v === true);
              }}
              className={checkboxCn}
            />
            <span>
              <span className="block text-[13px] font-medium text-white">
                Count this as off-the-job training
              </span>
              <span className="mt-0.5 block text-[11.5px] leading-snug text-white">
                Sends to your tutor for verification. Counts towards your off-the-job hours once
                they sign it off.
              </span>
            </span>
          </label>

          {countAsOtj && (
            <div>
              <span className={labelCn}>Duration</span>
              <div className="flex flex-wrap gap-2">
                {DURATION_PRESETS.map((p) => (
                  <button
                    type="button"
                    key={p}
                    aria-pressed={duration === p}
                    onClick={() => setDuration(p)}
                    className={cn(
                      chipBase,
                      'px-3.5 tabular-nums',
                      duration === p ? chipOn : chipOff
                    )}
                  >
                    {p < 60 ? `${p}m` : `${p / 60}h`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : collegeId === null ? (
        <p className="text-[12px] leading-snug text-white">
          Saved to your portfolio. Link your college in Settings to log reflections as off-the-job
          training for your tutor to verify.
        </p>
      ) : null}
    </FormSheet>
  );
}
