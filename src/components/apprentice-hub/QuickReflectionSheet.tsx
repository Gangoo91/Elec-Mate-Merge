import { useEffect, useRef, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  checkLineCn,
  checkboxCn,
  chipBase,
  infoPanelCn,
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
import { PRESETS } from '@/lib/portfolio/capturePresets';
import { enqueueCapture, sendOutboxItemNow, type OutboxOtj } from '@/lib/portfolio/captureOutbox';
import { createPortfolioItem } from '@/hooks/portfolio/portfolioWrites';
import type { PortfolioEntry } from '@/types/portfolio';

/* ==========================================================================
   QuickReflectionSheet — 30-second capture sheet for a daily reflection.
   Files one portfolio reflection and, when the apprentice ticks "this
   counts as OTJ", the off-the-job hours that go with it.

   ELE-1916: it no longer writes portfolio_items itself. The reflection is
   created by the one create path (createPortfolioItem, preset 'reflection',
   source 'reflection'), and both rows go through the capture outbox
   (ELE-1894) with ids made on the phone, so a retry after a lost reply can
   never file the reflection or the hours twice, and a reflection written
   with no signal is kept and sent later.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSaved?: () => void;
}

const PROMPTS = [
  'What did you do today?',
  'What did you learn that surprised you?',
  'What got you stuck, and how did you solve it?',
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
      // The local session, not getUser(): this sheet must open with no signal.
      const { data: sess } = await supabase.auth.getSession();
      const uid = sess.session?.user?.id;
      if (!uid) {
        if (!cancelled) setCollegeId(null);
        return;
      }
      if (!cancelled) setUid(uid);
      const cacheKey = `reflection:college:${uid}`;
      let id: string | null = null;
      const { data: cs, error } = await supabase
        .from('college_students')
        .select('college_id')
        .eq('user_id', uid)
        .maybeSingle();
      if (error) {
        // Offline: the college we last saw, so OTJ can still be queued.
        try {
          id = window.localStorage.getItem(cacheKey) || null;
        } catch {
          id = null;
        }
      } else {
        id = (cs?.college_id as string | null) ?? null;
        try {
          if (id) window.localStorage.setItem(cacheKey, id);
          else window.localStorage.removeItem(cacheKey);
        } catch {
          /* storage blocked */
        }
      }
      if (cancelled) return;
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
      const { data: sess } = await supabase.auth.getSession();
      const uid = sess.session?.user?.id;
      if (!uid) throw new Error('Not signed in');

      let recordedByName: string | null = null;
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', uid)
          .maybeSingle();
        recordedByName = (profile?.full_name as string | null) ?? null;
      } catch {
        /* offline: the hours are still recorded by the learner */
      }

      const trimmed = text.trim();
      const headline = trimmed.split('\n')[0].slice(0, 80);
      const today = new Date().toISOString().slice(0, 10);
      const cat = PRESETS.reflection.category;
      const entry: Omit<PortfolioEntry, 'id' | 'dateCreated' | 'evidenceFiles'> = {
        title: `Reflection · ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`,
        description: headline,
        category: {
          ...cat,
          description: '',
          icon: 'folder',
          color: 'gray',
          requiredEntries: 0,
          completedEntries: 0,
        },
        skills: [],
        reflection: trimmed,
        assessmentCriteria: [],
        status: 'draft',
        tags: [],
        learningOutcomes: [],
        selfAssessment: 0,
        timeSpent: countAsOtj ? duration : 0,
        awardingBodyStandards: [],
        metadata: { workDate: today, evidenceType: 'reflective-account' },
      };

      // OTJ hours: optional, gated by the toggle AND a college to verify them.
      const logOtj = countAsOtj && Boolean(collegeId);
      const otj: OutboxOtj | null = logOtj
        ? {
            id: crypto.randomUUID(),
            college_id: collegeId as string,
            activity_date: today,
            duration_minutes: duration,
            activity_type: 'theory',
            title: `Reflection · ${headline}`,
            description: trimmed,
            recorded_by_name_snapshot: recordedByName,
          }
        : null;

      const itemId = crypto.randomUUID();
      const queued = await enqueueCapture({
        id: itemId,
        uid,
        entry,
        source: 'reflection',
        dateCompleted: today,
        claimed: [],
        suggested: [],
        files: [],
        otj,
      });
      let waiting = false;
      if (queued) {
        const res = await sendOutboxItemNow(uid, itemId);
        waiting = !res.ok;
      } else {
        // No IndexedDB here (private browsing): write directly, same ids.
        const res = await createPortfolioItem(
          uid,
          { ...entry, evidenceFiles: [] },
          { id: itemId, source: 'reflection', dateCompleted: today }
        );
        if (!res.ok) throw new Error(res.error);
        if (otj) {
          const { error: oErr } = await supabase.from('college_otj_entries').insert({
            id: otj.id,
            college_id: otj.college_id,
            student_id: uid,
            recorded_by: uid,
            recorded_by_name_snapshot: otj.recorded_by_name_snapshot,
            activity_date: otj.activity_date,
            activity_type: otj.activity_type,
            title: otj.title,
            description: otj.description,
            duration_minutes: otj.duration_minutes,
            source: 'apprentice',
            source_kind: 'apprentice_submitted',
            verification_status: 'pending',
          } as never);
          if (oErr && oErr.code !== '23505') throw oErr;
        }
      }

      draft.clear();
      setSavedTick(true);
      toast(
        waiting
          ? {
              title: 'Reflection saved on this phone',
              description: 'No signal right now. It is waiting to sync and sends by itself.',
            }
          : {
              title: logOtj ? 'Reflection saved · OTJ pending' : 'Reflection saved',
              description: logOtj
                ? `${duration}m sent to your tutor for verification.`
                : 'Added to your portfolio.',
            }
      );
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
      width="wide"
      bodyClassName="space-y-5 lg:grid lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start lg:gap-10 lg:space-y-0"
      headerTrailing={
        draft.savedAt && text.trim() ? (
          <span className="mr-8 text-[12.5px] font-medium text-green-400">Draft saved</span>
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
      <div className="space-y-5">
        {draft.hasDraft && draft.draft && !text && (
          <div className="space-y-3 rounded-2xl border border-elec-yellow/35 bg-white/[0.05] p-4">
            <p className="text-[13px] leading-snug text-white">
              <span className="font-semibold">Unfinished reflection:</span> pick up where you left
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
            rows={8}
            autoFocus
            placeholder="What happened, what you learned, what you would do differently…"
            className={cn(textareaCn, 'w-full resize-none')}
          />
          <div className="mt-1 text-right text-[12px] tabular-nums text-white">
            {charCount < 12
              ? `${12 - charCount} more character${12 - charCount === 1 ? '' : 's'} to go`
              : 'Long enough to save'}
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
                <span className="mt-0.5 block text-[12px] leading-snug text-white">
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
      </div>

      <aside className="space-y-4" aria-label="Help with your reflection">
        <div className={infoPanelCn}>
          <p className="text-[13px] font-semibold text-white">Stuck for words? Try one of these</p>
          <ul className="mt-2 space-y-1.5">
            {PROMPTS.map((p) => (
              <li key={p} className="text-[13px] leading-snug text-white">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className={infoPanelCn}>
          <p className="text-[13px] font-semibold text-white">A good reflection says</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-4 text-[13px] leading-snug text-white">
            <li>What the job or task was, and where</li>
            <li>What you did yourself, not just what you watched</li>
            <li>One thing you learned or would do differently</li>
          </ul>
        </div>
        <div className={infoPanelCn}>
          <p className="text-[13px] font-semibold text-white">What happens when you save</p>
          <p className="mt-2 text-[13px] leading-snug text-white">
            It goes into your portfolio straight away.
            {canLogOtj && countAsOtj
              ? ` The ${duration < 60 ? `${duration} minutes` : `${duration / 60} hour${duration === 60 ? '' : 's'}`} go to your tutor to sign off, then count towards your off-the-job hours.`
              : ' Nothing is sent to your tutor unless you tick off-the-job training.'}
          </p>
        </div>
      </aside>
    </FormSheet>
  );
}
