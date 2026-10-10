/**
 * GoldCardRoad — after the AM2S: MyECS, the ECS Health, Safety and
 * Environmental Assessment, the Gold Card application and JIB grading
 * (ELE-2055). The apprentice ticks each step; their tutor sees the same list,
 * read-only. Every step links to the official page it comes from
 * (src/data/goldCardRoad.ts); nothing here is a rule of Elec-Mate's.
 *
 * `compact` shows the headline and the next step only (the learner's EPA page).
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { LC_FRAME, lcChip } from '@/components/apprentice-hub/college-hub/learnerUi';
import { COLLEGE_BTN } from '@/components/college/ui/CollegeUi';
import { GOLD_CARD_STEPS, SCOTLAND_NOTE, type GoldCardStepKey } from '@/data/goldCardRoad';
import { setGoldCardStep, useGoldCardRoad } from '@/hooks/epa/useElectricalEpa';

const fmt = (iso: string | null | undefined) =>
  iso
    ? new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

const PASSES = ['pass', 'merit', 'distinction'];

export function GoldCardRoad({
  learnerId,
  audience,
  name,
  compact = false,
}: {
  learnerId: string;
  audience: 'learner' | 'tutor';
  name?: string;
  compact?: boolean;
}) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data, loading, error, reload } = useGoldCardRoad(learnerId);
  const [busy, setBusy] = useState<GoldCardStepKey | null>(null);

  if (loading && !data) {
    return (
      <section className={cn(LC_FRAME, 'items-center p-6')} data-testid="gold-card-road">
        <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
      </section>
    );
  }
  if (error || !data) {
    return (
      <section className={cn(LC_FRAME, 'p-4 sm:p-5')} data-testid="gold-card-road">
        <p className="text-[14px] text-white">The road to Gold Card could not be loaded. {error}</p>
      </section>
    );
  }

  const collegePass =
    data.college_epa && PASSES.includes(data.college_epa.result.toLowerCase())
      ? data.college_epa
      : null;
  const isDone = (k: GoldCardStepKey) => !!data.steps[k] || (k === 'am2s_passed' && !!collegePass);
  const done = GOLD_CARD_STEPS.filter((s) => isDone(s.key)).length;
  const next = GOLD_CARD_STEPS.find((s) => !isDone(s.key));
  const scotland = (data.nation ?? '').toLowerCase() === 'scotland';
  const england = !data.nation || data.nation.toLowerCase() === 'england';
  const who = audience === 'learner' ? 'You have' : `${name || 'They'} ${name ? 'has' : 'have'}`;
  const learner = audience === 'learner';

  const toggle = async (key: GoldCardStepKey, on: boolean, date?: string) => {
    setBusy(key);
    try {
      await setGoldCardStep(key, on, date ?? null);
      await reload();
    } catch (e) {
      toast({ title: 'Not saved', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className={LC_FRAME} data-testid="gold-card-road" aria-label="Road to Gold Card">
      <div className="px-4 pb-3 pt-4 sm:px-5">
        <p className="text-[13px] font-medium text-white">After your AM2S: road to Gold Card</p>
        <h3
          className="mt-1 text-[15px] font-semibold leading-snug text-white"
          data-testid="gold-card-headline"
        >
          {`${who} done ${done} of ${GOLD_CARD_STEPS.length} steps.`}
          {next ? ` Next: ${next.title}.` : ' Every step is done.'}
        </h3>
        <p className="mt-1 text-[12.5px] leading-snug text-white">
          From the ECS and NET pages each step links to. ECS and the JIB decide; check their page
          before you act.
          {scotland ? ` ${SCOTLAND_NOTE}` : ''}
        </p>
      </div>

      {compact ? (
        <div className="flex flex-col gap-2 border-t border-white/[0.08] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-[13px] text-white">
            {next ? next.body.split('. ')[0] + '.' : 'All done.'}
          </p>
          {learner && (
            <button
              type="button"
              onClick={() => navigate('/apprentice/gold-card')}
              className={cn(COLLEGE_BTN, 'shrink-0')}
              data-testid="gold-card-open"
            >
              Open the steps
            </button>
          )}
        </div>
      ) : (
        <ol className="divide-y divide-white/[0.07] border-t border-white/[0.08]">
          {GOLD_CARD_STEPS.map((s, i) => {
            const own = data.steps[s.key];
            const viaCollege = s.key === 'am2s_passed' && !own && collegePass;
            const on = isDone(s.key);
            return (
              <li key={s.key} className="px-4 py-4 sm:px-5" data-step={s.key}>
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[13px] font-bold',
                      on ? 'border-emerald-400 text-emerald-300' : 'border-white/[0.22] text-white'
                    )}
                  >
                    {on ? '✓' : i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[14px] font-semibold leading-snug text-white">{s.title}</p>
                      {on && (
                        <span className={lcChip('done')}>
                          {viaCollege
                            ? `${collegePass!.result} recorded by college${collegePass!.epa_date ? ` ${fmt(collegePass!.epa_date)}` : ''}`
                            : `Done ${fmt(own?.done_on)}`}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-white">{s.body}</p>
                    {s.englandNote && england && (
                      <p className="mt-1.5 text-[13px] leading-relaxed text-white">
                        {s.englandNote}{' '}
                        <a
                          href="https://electricalcontractingnews.com/safety-and-training/apprenticeships/ecs-net-integration-speeds-apprentice-gold-card-applications/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-elec-yellow underline underline-offset-2"
                        >
                          Report
                        </a>
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <a
                        href={s.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center text-[12.5px] font-semibold text-elec-yellow underline underline-offset-2 touch-manipulation"
                      >
                        Source: {s.source.label}
                      </a>
                      {s.action && learner && (
                        <a
                          href={s.action.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center text-[12.5px] font-semibold text-white underline underline-offset-2 touch-manipulation"
                        >
                          {s.action.label}
                        </a>
                      )}
                    </div>
                    {learner && !viaCollege && (
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        {own ? (
                          <>
                            <label className="sr-only" htmlFor={`gc-${s.key}`}>
                              Date done
                            </label>
                            <input
                              id={`gc-${s.key}`}
                              type="date"
                              max={new Date().toISOString().slice(0, 10)}
                              defaultValue={own.done_on}
                              onChange={(e) =>
                                e.target.value && toggle(s.key, true, e.target.value)
                              }
                              className="h-11 rounded-lg border border-white/[0.16] bg-transparent px-3 text-[13px] text-white [color-scheme:dark] touch-manipulation"
                            />
                            <button
                              type="button"
                              disabled={busy === s.key}
                              onClick={() => toggle(s.key, false)}
                              className={COLLEGE_BTN}
                            >
                              Not done
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            disabled={busy === s.key}
                            onClick={() => toggle(s.key, true)}
                            className={COLLEGE_BTN}
                          >
                            {busy === s.key ? 'Saving…' : 'Mark as done'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

export default GoldCardRoad;
