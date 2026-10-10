/**
 * Am2ExposureCard — how often the apprentice does the three things the AM2S
 * tests hardest, on site: safe isolation, inspection and testing, fault
 * finding (ELE-2049). Shown to the learner (EPA page, under the AM2 task list)
 * and their tutor (Student 360), from get_am2_exposure, so both see the same.
 *
 * Why: NET's survey of about 1,200 candidates who failed the AM2 first time
 * (Electrical Times, 23 Jan 2026): 54% did not feel fully prepared, 44% lacked
 * confidence in fault finding, 36% in inspection and testing, and 25% had no
 * regular inspection and testing on site.
 *
 * Counts come from tags on evidence and site diary days. The app suggests
 * tags from the words already written; nothing counts until someone taps it.
 * Each area maps to the NET tasks it feeds (A1 and C, B, D), next to the
 * simulator practice in Am2TaskReadiness (ELE-1907).
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { LC_FRAME, lcChip } from '@/components/apprentice-hub/college-hub/learnerUi';
import { COLLEGE_BTN, COLLEGE_LINK } from '@/components/college/ui/CollegeUi';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  EXPOSURE_AREAS,
  setExposureTag,
  useAm2Exposure,
  type ExposureArea,
  type ExposureSource,
} from '@/hooks/epa/useElectricalEpa';

export const NET_SURVEY_URL =
  'https://www.electricaltimes.co.uk/net-survey-gives-insights-into-am2-readiness/';

const fmt = (iso: string | null | undefined) =>
  iso
    ? new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      })
    : '';

const label = (a: ExposureArea) => EXPOSURE_AREAS.find((x) => x.key === a)?.label ?? a;

function areaChip(on: boolean) {
  return cn(
    'h-11 rounded-full border px-3.5 text-[12.5px] font-semibold transition-colors touch-manipulation',
    on
      ? 'border-elec-yellow bg-elec-yellow text-black'
      : 'border-white/[0.16] text-white hover:border-white/[0.32]'
  );
}

export function Am2ExposureCard({
  learnerId,
  audience,
  name,
}: {
  learnerId: string;
  audience: 'learner' | 'tutor';
  name?: string;
}) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data, loading, error, reload } = useAm2Exposure(learnerId);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  const suggestions = useMemo(
    () => (data?.sources ?? []).filter((s) => s.suggested.length > 0).slice(0, 3),
    [data]
  );

  const act = async (
    s: ExposureSource,
    area: ExposureArea,
    state: 'tagged' | 'dismissed' | 'none'
  ) => {
    const key = `${s.id}:${area}`;
    setBusy(key);
    try {
      await setExposureTag(s.kind, s.id, area, state);
      await reload();
    } catch (e) {
      toast({ title: 'Not saved', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setBusy(null);
    }
  };

  if (loading && !data) {
    return (
      <section
        className={cn(LC_FRAME, 'items-center justify-center p-6')}
        data-testid="am2-exposure"
      >
        <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
      </section>
    );
  }
  if (error || !data) {
    return (
      <section className={cn(LC_FRAME, 'p-4 sm:p-5')} data-testid="am2-exposure">
        <p className="text-[14px] text-white">On-site practice could not be loaded. {error}</p>
      </section>
    );
  }

  const who = audience === 'learner' ? 'you' : name || 'they';
  const overdue = data.areas.filter((a) => a.overdue);
  const headline =
    overdue.length > 0
      ? `${overdue.map((a) => a.label).join(', ')}: none on site in ${data.weeks} weeks.`
      : `Last 12 weeks on site: ${data.areas.map((a) => `${a.count_12w} ${a.label.toLowerCase()}`).join(', ')}.`;
  const lastAlert = data.alerts[0];

  return (
    <section className={LC_FRAME} data-testid="am2-exposure" aria-label="AM2 practice on site">
      <div className="px-4 pb-3 pt-4 sm:px-5">
        <p className="text-[13px] font-medium text-white">AM2 practice on site</p>
        <h3
          className="mt-1 text-[15px] font-semibold leading-snug text-white"
          data-testid="am2-exposure-headline"
        >
          {headline}
        </h3>
        <p className="mt-1 text-[12.5px] leading-snug text-white">
          In NET&apos;s survey of first-time AM2 fails, 44% lacked confidence in fault finding and
          36% in inspection and testing; 25% had no regular inspection and testing on site.{' '}
          <a
            href={NET_SURVEY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-elec-yellow underline underline-offset-2"
          >
            Source
          </a>
        </p>
      </div>

      <ul className="divide-y divide-white/[0.07] border-t border-white/[0.08]">
        {data.areas.map((a) => (
          <li
            key={a.area}
            className="flex min-h-[56px] items-center gap-3 px-4 py-3 sm:px-5"
            data-area={a.area}
          >
            <span className="flex h-9 min-w-[44px] shrink-0 items-center justify-center rounded-lg border border-white/[0.22] px-1.5 font-mono text-[14px] font-bold tabular-nums text-white">
              {a.count}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-semibold leading-snug text-white">{a.label}</p>
              <p className="text-[12px] text-white">
                NET task{a.net_tasks.includes('and') ? 's' : ''} {a.net_tasks} · {a.count_12w} in 12
                weeks
                {a.last_done ? ` · last ${fmt(a.last_done)}` : ''}
              </p>
            </div>
            {a.overdue ? (
              <span className={lcChip('action')}>None in {data.weeks} weeks</span>
            ) : a.last_done ? (
              <span className={lcChip('done')}>
                {a.days_since === 0 ? 'Today' : `${a.days_since}d ago`}
              </span>
            ) : (
              <span className={lcChip('neutral')}>None yet</span>
            )}
          </li>
        ))}
      </ul>

      {suggestions.length > 0 && (
        <div
          className="border-t border-white/[0.08] px-4 py-3.5 sm:px-5"
          data-testid="am2-exposure-suggestions"
        >
          <p className="text-[12px] font-semibold text-white">
            From what {who === 'you' ? 'you have' : `${who} has`} written, these look like they
            count. Tap to tag.
          </p>
          <ul className="mt-2 space-y-3">
            {suggestions.map((s) => (
              <li key={`${s.kind}:${s.id}`} data-source={s.id}>
                <p className="text-[13px] text-white">
                  {s.title}{' '}
                  <span className="whitespace-nowrap">
                    · {s.kind === 'diary' ? 'Diary' : 'Evidence'} {fmt(s.date)}
                  </span>
                </p>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {s.suggested.map((area) => (
                    <span key={area} className="inline-flex gap-1">
                      <button
                        type="button"
                        disabled={busy === `${s.id}:${area}`}
                        onClick={() => act(s, area, 'tagged')}
                        className={areaChip(false)}
                      >
                        Tag {label(area).toLowerCase()}
                      </button>
                      <button
                        type="button"
                        aria-label={`Not ${label(area).toLowerCase()}`}
                        disabled={busy === `${s.id}:${area}`}
                        onClick={() => act(s, area, 'dismissed')}
                        className="h-11 rounded-full border border-white/[0.16] px-3 text-[12.5px] font-medium text-white touch-manipulation hover:border-white/[0.32]"
                      >
                        Not this
                      </button>
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-2 border-t border-white/[0.08] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-[12px] text-white">
          {lastAlert
            ? `Tutor${lastAlert.employer_emailed ? ' and employer' : ''} told on ${fmt(lastAlert.alerted_at)} (${label(lastAlert.area).toLowerCase()}).`
            : `Tutor and employer are told after ${data.weeks} weeks with none.`}
        </p>
        <div className="flex flex-wrap gap-2">
          {audience === 'tutor' && (
            <button
              type="button"
              onClick={() => navigate('/college/am2-exposure')}
              className={COLLEGE_LINK}
            >
              All learners
            </button>
          )}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={COLLEGE_BTN}
            data-testid="am2-exposure-open"
          >
            Tag evidence or diary days
          </button>
        </div>
      </div>

      <FormSheet
        open={open}
        onOpenChange={setOpen}
        width="wide"
        eyebrow="AM2 practice on site"
        title="Tag evidence and diary days"
        description={`The last 120 days. Tap each thing ${who === 'you' ? 'you' : who} did on that job. ${
          audience === 'tutor' ? 'Diary days show only when shared with the college.' : ''
        }`}
      >
        {data.sources.length === 0 ? (
          <p className="text-[14px] text-white">
            No evidence or site diary days in the last 120 days. Log a diary day or capture evidence
            first.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-x-8 lg:grid-cols-2" data-testid="am2-exposure-sheet">
            {data.sources.map((s) => (
              <li
                key={`${s.kind}:${s.id}`}
                className="border-b border-white/[0.08] py-3"
                data-source={s.id}
              >
                <p className="text-[14px] font-semibold leading-snug text-white">{s.title}</p>
                <p className="text-[12px] text-white">
                  {s.kind === 'diary' ? 'Site diary' : 'Evidence'} · {fmt(s.date)}
                  {s.suggested.length > 0
                    ? ` · suggested: ${s.suggested.map((a) => label(a).toLowerCase()).join(', ')}`
                    : ''}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {EXPOSURE_AREAS.map((a) => {
                    const on = s.tagged.includes(a.key);
                    return (
                      <button
                        key={a.key}
                        type="button"
                        aria-pressed={on}
                        disabled={busy === `${s.id}:${a.key}`}
                        onClick={() => act(s, a.key, on ? 'none' : 'tagged')}
                        className={areaChip(on)}
                      >
                        {a.label}
                      </button>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        )}
      </FormSheet>
    </section>
  );
}

export default Am2ExposureCard;
