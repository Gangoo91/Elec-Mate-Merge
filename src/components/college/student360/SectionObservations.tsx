import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  useCollegeObservations,
  type CollegeObservation,
  type ObservationOutcome,
} from '@/hooks/useCollegeObservations';

/* ==========================================================================
   SectionObservations — assessor evidence timeline on the Student 360 page.

   Hub language: heading + quiet volt text action, ONE card of divided rows
   that expand in place. Outcome is a chip: passed emerald, referred red,
   partial volt text, not-yet neutral. Every button is 44px.

   `data` lets a parent that already runs `useCollegeObservations` share the
   instance (the dashboard's Student 360 needs follow-ups for its "Needs
   you" list); when supplied, the section's own hook is given a null id.
   ========================================================================== */

const OUTCOME_LABEL: Record<ObservationOutcome, string> = {
  passed: 'Passed',
  partial: 'Partial',
  referred: 'Referred',
  not_yet: 'Not yet',
};

const CHIP =
  'inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-semibold tabular-nums';
const CHIP_NEUTRAL = 'border-white/[0.14] bg-white/[0.06] text-white';
const CHIP_RED = 'border-red-400/30 bg-red-500/[0.08] text-red-300';
const CHIP_GOOD = 'border-emerald-400/30 bg-emerald-500/[0.08] text-emerald-300';
const CHIP_VOLT = 'border-elec-yellow/35 text-elec-yellow';

const OUTCOME_CHIP: Record<ObservationOutcome, string> = {
  passed: CHIP_GOOD,
  partial: CHIP_VOLT,
  referred: CHIP_RED,
  not_yet: CHIP_NEUTRAL,
};

const ACTION_BTN =
  '-my-2 flex h-11 shrink-0 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation';

const TEXT_BTN =
  'flex h-11 items-center px-2 text-[12px] font-semibold text-white transition-colors touch-manipulation';

const CARD = cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE);

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function SectionObservations({
  id,
  studentId,
  onAdd,
  data: shared,
}: {
  id: string;
  studentId: string;
  onAdd: () => void;
  data?: ReturnType<typeof useCollegeObservations>;
}) {
  const own = useCollegeObservations(shared ? null : studentId);
  const { observations, loading, remove } = shared ?? own;
  const { toast } = useToast();

  const onView = async (path: string) => {
    const { data, error } = await supabase.storage
      .from('compliance-evidence')
      .createSignedUrl(path, 60);
    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
    } else if (error) {
      toast({
        title: 'Could not open evidence',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <section id={id} className="scroll-mt-20 space-y-3">
      <div className="flex items-end justify-between gap-4">
        <HubSectionHeading>Observations</HubSectionHeading>
        <button type="button" onClick={onAdd} className={cn(ACTION_BTN, 'no-print')}>
          Record observation
        </button>
      </div>

      {loading && observations.length === 0 ? (
        <Skeleton />
      ) : observations.length === 0 ? (
        <div className={cn(CARD, 'px-4 py-5 sm:px-5')}>
          <p className="text-[12.5px] leading-relaxed text-white">
            No observations yet. Record the first to start this learner's assessment evidence
            trail.
          </p>
        </div>
      ) : (
        <div className={CARD}>
          <ul className="divide-y divide-white/[0.10]">
            {observations.map((o) => (
              <ObservationRow
                key={o.id}
                obs={o}
                onView={onView}
                onDelete={async () => {
                  const ok = window.confirm(
                    `Delete the observation "${o.activity_title}"? Logged in audit trail.`
                  );
                  if (!ok) return;
                  try {
                    await remove(o.id, o.evidence_path);
                    toast({ title: 'Observation removed' });
                  } catch (e) {
                    toast({
                      title: 'Delete failed',
                      description: (e as Error).message ?? 'Try again.',
                      variant: 'destructive',
                    });
                  }
                }}
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

function ObservationRow({
  obs,
  onView,
  onDelete,
}: {
  obs: CollegeObservation;
  onView: (path: string) => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const settingLabel =
    obs.location_type === 'classroom'
      ? 'Classroom'
      : obs.location_type === 'workshop'
        ? 'Workshop'
        : obs.location_type === 'employer_site'
          ? 'Employer site'
          : obs.location_type === 'remote'
            ? 'Remote'
            : obs.location_type === 'other'
              ? 'Other'
              : null;

  const acsCount = obs.acs_evidenced.length;
  const followUpOverdue =
    obs.follow_up_required && !!obs.follow_up_date && new Date(obs.follow_up_date).getTime() < Date.now();

  return (
    <li className="px-4 py-3.5 sm:px-5">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className={cn(CHIP, OUTCOME_CHIP[obs.outcome])}>{OUTCOME_LABEL[obs.outcome]}</span>
        {obs.grade && (
          <span className="text-[11px] font-semibold tabular-nums text-white">{obs.grade}</span>
        )}
        {obs.assessor_signed && (
          <span className="text-[11px] font-semibold text-emerald-300">Signed</span>
        )}
        {obs.follow_up_required && (
          <span
            className={cn(
              'text-[11px] font-semibold tabular-nums',
              followUpOverdue ? 'text-red-300' : 'text-elec-yellow'
            )}
          >
            Follow-up{obs.follow_up_date ? ` · ${formatDate(obs.follow_up_date)}` : ''}
            {followUpOverdue ? ' · overdue' : ''}
          </span>
        )}
      </div>
      <h3 className="mt-1.5 text-[14px] font-semibold leading-tight text-white">
        {obs.activity_title}
      </h3>
      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] tabular-nums text-white">
        <span>{formatDate(obs.observed_at)}</span>
        {obs.observed_time && <span>{obs.observed_time.slice(0, 5)}</span>}
        {obs.duration_minutes && <span>{obs.duration_minutes}m</span>}
        {settingLabel && <span>{settingLabel}</span>}
        {obs.location && <span className="max-w-[180px] truncate">{obs.location}</span>}
        {obs.assessor_name_snapshot && <span>by {obs.assessor_name_snapshot}</span>}
      </div>

      {acsCount > 0 && (
        <div className="mt-2.5 flex flex-wrap items-center gap-1">
          <span className="mr-1 text-[11px] font-medium text-white">ACs evidenced</span>
          {obs.acs_evidenced.slice(0, expanded ? undefined : 8).map((ac) => (
            <span
              key={ac}
              className="inline-flex items-center rounded-md border border-white/[0.14] bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10.5px] tabular-nums text-white"
            >
              {ac}
            </span>
          ))}
          {!expanded && acsCount > 8 && (
            <span className="text-[11px] tabular-nums text-white">+{acsCount - 8} more</span>
          )}
        </div>
      )}

      {obs.activity_summary && (
        <p
          className={cn(
            'mt-2.5 whitespace-pre-line text-[12.5px] leading-relaxed text-white',
            !expanded && 'line-clamp-2'
          )}
        >
          {obs.activity_summary}
        </p>
      )}

      {expanded && (
        <div className="mt-3 space-y-3.5 border-t border-white/[0.10] pt-3">
          {obs.feedback_strengths && <FeedbackBlock label="Strengths" text={obs.feedback_strengths} />}
          {obs.feedback_areas && (
            <FeedbackBlock label="Areas for development" text={obs.feedback_areas} />
          )}
          {obs.action_points.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-elec-yellow">Action points</div>
              <ul className="mt-1 space-y-1">
                {obs.action_points.map((ap, i) => (
                  <li key={i} className="relative pl-4 text-[12.5px] leading-snug text-white">
                    <span
                      aria-hidden
                      className="absolute left-0 top-[7px] inline-block h-1.5 w-1.5 rounded-full bg-elec-yellow"
                    />
                    {ap}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {obs.ksbs_observed.length > 0 && (
            <div className="text-[11.5px] text-white">
              KSBs:{' '}
              <span className="font-mono tabular-nums">{obs.ksbs_observed.join(', ')}</span>
            </div>
          )}
          {(obs.qualification_code || obs.unit_code) && (
            <div className="text-[11.5px] text-white">
              {obs.qualification_code && (
                <span>
                  Qualification <span className="font-mono">{obs.qualification_code}</span>
                </span>
              )}
              {obs.qualification_code && obs.unit_code && <span> · </span>}
              {obs.unit_code && (
                <span>
                  Unit <span className="font-mono">{obs.unit_code}</span>
                </span>
              )}
            </div>
          )}
        </div>
      )}

      <div className="-mb-2 mt-1.5 flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={cn(TEXT_BTN, '-ml-2 text-elec-yellow')}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
        <div className="-mr-2 flex items-center gap-1">
          {obs.evidence_path && (
            <button
              type="button"
              onClick={() => obs.evidence_path && onView(obs.evidence_path)}
              className={TEXT_BTN}
            >
              View evidence
            </button>
          )}
          <button
            type="button"
            onClick={onDelete}
            className={cn(TEXT_BTN, 'hover:text-red-300')}
            aria-label="Delete observation"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

/* ──────────────────────────────────────────────────────── */

function FeedbackBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="text-[11px] font-semibold text-elec-yellow">{label}</div>
      <p className="mt-0.5 whitespace-pre-line text-[12.5px] leading-relaxed text-white">{text}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function Skeleton() {
  return (
    <div className={cn(CARD, 'space-y-4 px-4 py-4 animate-pulse sm:px-5')}>
      {[0, 1].map((i) => (
        <div key={i}>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-5 w-16 rounded-full bg-white/[0.08]" />
            <div className="h-5 w-20 rounded-full bg-white/[0.05]" />
          </div>
          <div className="h-3 w-2/3 rounded bg-white/[0.08]" />
          <div className="mt-2 h-2 w-1/2 rounded bg-white/[0.05]" />
        </div>
      ))}
    </div>
  );
}
