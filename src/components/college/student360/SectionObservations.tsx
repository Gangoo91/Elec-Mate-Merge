import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Pill, type Tone } from '@/components/college/primitives';
import {
  useCollegeObservations,
  type CollegeObservation,
  type ObservationOutcome,
} from '@/hooks/useCollegeObservations';

/* ==========================================================================
   SectionObservations — assessor evidence timeline on the Student 360 page.
   ========================================================================== */

const OUTCOME_TONE: Record<ObservationOutcome, Tone> = {
  passed: 'green',
  partial: 'amber',
  referred: 'red',
  not_yet: 'blue',
};

const OUTCOME_LABEL: Record<ObservationOutcome, string> = {
  passed: 'Passed',
  partial: 'Partial',
  referred: 'Referred',
  not_yet: 'Not yet',
};

const OUTCOME_ACCENT: Record<ObservationOutcome, string> = {
  passed: 'bg-emerald-400/80',
  partial: 'bg-amber-400/80',
  referred: 'bg-red-400/80',
  not_yet: 'bg-blue-400/80',
};

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function SectionObservations({
  id,
  studentId,
  onAdd,
}: {
  id: string;
  studentId: string;
  onAdd: () => void;
}) {
  const { observations, loading, remove } = useCollegeObservations(studentId);
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
    <section id={id} className="scroll-mt-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Assessment evidence
          </div>
          <h2 className="mt-1.5 text-xl sm:text-[26px] font-semibold text-white tracking-tight leading-tight">
            Observations
          </h2>
        </div>
        <button
          onClick={onAdd}
          className="text-[12px] font-medium text-elec-yellow/85 hover:text-elec-yellow transition-colors touch-manipulation no-print"
        >
          Record observation →
        </button>
      </div>

      <div className="mt-5">
        {loading && observations.length === 0 ? (
          <Skeleton />
        ) : observations.length === 0 ? (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-8 text-center">
            <p className="text-[12.5px] text-white/65 max-w-md mx-auto leading-relaxed">
              No observations yet. Record your first to start building this learner's assessment
              evidence trail.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {observations.map((o) => (
              <ObservationCard
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
          </div>
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

function ObservationCard({
  obs,
  onView,
  onDelete,
}: {
  obs: CollegeObservation;
  onView: (path: string) => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const tone = OUTCOME_TONE[obs.outcome];
  const accent = OUTCOME_ACCENT[obs.outcome];

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

  return (
    <div className="relative bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
      <span
        aria-hidden
        className={cn('absolute left-0 top-3 bottom-3 w-[3px] rounded-full', accent)}
      />
      <div className="px-5 sm:px-6 py-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Pill tone={tone}>{OUTCOME_LABEL[obs.outcome]}</Pill>
              {obs.grade && (
                <span className="text-[11px] font-medium text-elec-yellow/85 tabular-nums">
                  {obs.grade}
                </span>
              )}
              {obs.assessor_signed && (
                <span className="inline-flex items-center gap-1 text-[10.5px] text-emerald-300/85">
                  <span
                    aria-hidden
                    className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold leading-none"
                  >
                    ✓
                  </span>
                  Signed
                </span>
              )}
              {obs.follow_up_required && (
                <span className="inline-flex items-center h-5 px-1.5 rounded-md bg-amber-500/[0.1] border border-amber-500/30 text-[10px] font-semibold tracking-[0.06em] uppercase text-amber-200">
                  Follow-up{obs.follow_up_date ? ` · ${formatDate(obs.follow_up_date)}` : ''}
                </span>
              )}
            </div>
            <h3 className="mt-1.5 text-[14.5px] font-semibold text-white leading-tight">
              {obs.activity_title}
            </h3>
            <div className="mt-1 flex items-center flex-wrap gap-x-2.5 gap-y-0.5 text-[11px] text-white/65 tabular-nums">
              <span>{formatDateTime(obs.observed_at)}</span>
              {obs.observed_time && (
                <>
                  <span className="text-white/25">·</span>
                  <span>{obs.observed_time.slice(0, 5)}</span>
                </>
              )}
              {obs.duration_minutes && (
                <>
                  <span className="text-white/25">·</span>
                  <span>{obs.duration_minutes}m</span>
                </>
              )}
              {settingLabel && (
                <>
                  <span className="text-white/25">·</span>
                  <span className="capitalize">{settingLabel}</span>
                </>
              )}
              {obs.location && (
                <>
                  <span className="text-white/25">·</span>
                  <span className="truncate max-w-[180px]">{obs.location}</span>
                </>
              )}
            </div>
            {obs.assessor_name_snapshot && (
              <div className="mt-1 text-[11px] text-white/55">
                by <span className="text-white/85">{obs.assessor_name_snapshot}</span>
              </div>
            )}
          </div>
        </div>

        {/* AC chips — most compact summary */}
        {acsCount > 0 && (
          <div className="mt-3 flex items-center flex-wrap gap-1">
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/55 mr-1">
              ACs evidenced
            </span>
            {obs.acs_evidenced.slice(0, expanded ? undefined : 8).map((ac) => (
              <span
                key={ac}
                className="inline-flex items-center h-5 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10.5px] font-mono tabular-nums text-white/85"
              >
                {ac}
              </span>
            ))}
            {!expanded && acsCount > 8 && (
              <span className="text-[10.5px] text-white/55 tabular-nums">+{acsCount - 8} more</span>
            )}
          </div>
        )}

        {/* Activity summary (line-clamped when collapsed) */}
        {obs.activity_summary && (
          <p
            className={cn(
              'mt-3 text-[12.5px] text-white/80 leading-relaxed whitespace-pre-line',
              !expanded && 'line-clamp-2'
            )}
          >
            {obs.activity_summary}
          </p>
        )}

        {/* Expanded detail */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-4">
            {obs.feedback_strengths && (
              <FeedbackBlock label="Strengths" tone="emerald" text={obs.feedback_strengths} />
            )}
            {obs.feedback_areas && (
              <FeedbackBlock label="Areas for development" tone="amber" text={obs.feedback_areas} />
            )}
            {obs.action_points.length > 0 && (
              <div>
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-1.5">
                  Action points
                </div>
                <ul className="space-y-1">
                  {obs.action_points.map((ap, i) => (
                    <li key={i} className="text-[12.5px] text-white/85 leading-snug pl-4 relative">
                      <span
                        aria-hidden
                        className="absolute left-0 top-[7px] inline-block h-1.5 w-1.5 rounded-full bg-elec-yellow/85"
                      />
                      {ap}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {obs.ksbs_observed.length > 0 && (
              <div className="text-[11px] text-white/65">
                <span className="text-white/45">KSBs: </span>
                <span className="font-mono tabular-nums text-white/85">
                  {obs.ksbs_observed.join(', ')}
                </span>
              </div>
            )}
            {(obs.qualification_code || obs.unit_code) && (
              <div className="text-[11px] text-white/65">
                {obs.qualification_code && (
                  <span>
                    <span className="text-white/45">Qual: </span>
                    <span className="font-mono text-white/85">{obs.qualification_code}</span>
                  </span>
                )}
                {obs.qualification_code && obs.unit_code && (
                  <span className="text-white/25"> · </span>
                )}
                {obs.unit_code && (
                  <span>
                    <span className="text-white/45">Unit: </span>
                    <span className="font-mono text-white/85">{obs.unit_code}</span>
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-[11.5px] font-medium text-white/65 hover:text-white transition-colors touch-manipulation"
          >
            {expanded ? 'Show less' : 'Show more →'}
          </button>
          <div className="flex items-center gap-2">
            {obs.evidence_path && (
              <button
                type="button"
                onClick={() => obs.evidence_path && onView(obs.evidence_path)}
                className="h-7 px-2.5 rounded-full bg-[hsl(0_0%_14%)] border border-white/[0.08] text-[11px] font-medium text-white/80 hover:text-white hover:border-white/[0.18] transition-colors touch-manipulation"
              >
                View evidence
              </button>
            )}
            <button
              type="button"
              onClick={onDelete}
              className="h-7 px-2.5 rounded-full text-[11px] font-medium text-white/55 hover:text-red-300 hover:bg-red-500/[0.06] transition-colors touch-manipulation"
              aria-label="Delete observation"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function FeedbackBlock({
  label,
  tone,
  text,
}: {
  label: string;
  tone: 'emerald' | 'amber';
  text: string;
}) {
  return (
    <div>
      <div
        className={cn(
          'text-[10px] font-medium uppercase tracking-[0.18em] mb-1',
          tone === 'emerald' ? 'text-emerald-300/85' : 'text-amber-300/85'
        )}
      >
        {label}
      </div>
      <p className="text-[12.5px] text-white/85 leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function Skeleton() {
  return (
    <div className="space-y-2.5 animate-pulse">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-5 w-16 rounded-full bg-white/[0.06]" />
            <div className="h-5 w-20 rounded-full bg-white/[0.04]" />
          </div>
          <div className="h-3 w-2/3 rounded bg-white/[0.06]" />
          <div className="mt-2 h-2 w-1/2 rounded bg-white/[0.04]" />
          <div className="mt-3 h-2 w-full rounded bg-white/[0.04]" />
        </div>
      ))}
    </div>
  );
}
