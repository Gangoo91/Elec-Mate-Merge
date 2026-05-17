import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO from '@/hooks/useSEO';
import { useAcDetail } from '@/hooks/useAcDetail';
import {
  PageFrame,
  PageHero,
  Pill,
  SecondaryButton,
  itemVariants,
  toneDot,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { recordResourceEvent } from '@/hooks/useResourceAnalytics';

/* ==========================================================================
   AcDetailPage — /college/curriculum/ac/:qualCode/:unitCode/:acCode
   ELE-896 (B1). One page showing the AC's text, the resources tagged to
   it, the lessons that cover it, and learner progress against it.
   ========================================================================== */

const STATUS_TONE: Record<string, Tone> = {
  not_started: 'red',
  partial: 'amber',
  collecting: 'amber',
  ready_for_assessment: 'cyan',
  assessed: 'emerald',
  signed_off: 'emerald',
};

export default function AcDetailPage() {
  const { qualificationCode, unitCode, acCode } = useParams<{
    qualificationCode: string;
    unitCode: string;
    acCode: string;
  }>();
  const navigate = useNavigate();
  const { meta, resources, lessons, learners, loading, error } = useAcDetail(
    qualificationCode ?? null,
    unitCode ?? null,
    acCode ?? null
  );

  useSEO({
    title: `AC ${acCode ?? ''} · ${unitCode ?? ''} — College Hub`,
    description: 'Resources, lessons and learner progress against this Assessment Criterion.',
    noindex: true,
  });

  const learnerStats = learners.reduce(
    (acc, l) => {
      if (l.status === 'signed_off' || l.status === 'assessed') acc.done++;
      else if (l.status === 'partial' || l.status === 'collecting') acc.partial++;
      else acc.notStarted++;
      return acc;
    },
    { done: 0, partial: 0, notStarted: 0 }
  );

  return (
    <PageFrame>
      <PageHero
        eyebrow={`${qualificationCode ?? ''} · ${unitCode ?? ''}`}
        title={acCode ? `AC ${acCode}` : 'Assessment Criterion'}
        description={meta?.ac_text ?? (loading ? 'Loading…' : 'AC details')}
        actions={
          <SecondaryButton onClick={() => navigate(-1)}>← Back</SecondaryButton>
        }
      />

      {loading && <div className="px-4 pb-12 text-sm text-white/60">Loading…</div>}

      {error && (
        <div className="mx-4 mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {!loading && meta && (
        <div className="px-4 pb-16 space-y-5">
          {/* LO context */}
          {meta.lo_text && (
            <motion.section
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
                Learning Outcome {meta.lo_number ?? ''}
              </div>
              <p className="mt-2 text-sm text-white/85 leading-relaxed">{meta.lo_text}</p>
              {meta.unit_title && (
                <div className="mt-3 text-xs text-white/50">{meta.unit_title}</div>
              )}
            </motion.section>
          )}

          {/* Learner progress strip */}
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Learner progress
            </h2>
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              <ProgressTile label="Signed off / assessed" value={learnerStats.done} tone="emerald" />
              <ProgressTile label="In progress" value={learnerStats.partial} tone="amber" />
              <ProgressTile label="Not started" value={learnerStats.notStarted} tone="red" />
            </div>

            {learners.length > 0 && (
              <ul className="mt-4 divide-y divide-white/5">
                {learners.slice(0, 20).map((l) => (
                  <li
                    key={l.student_id}
                    className="flex items-center justify-between gap-3 py-2"
                  >
                    <button
                      type="button"
                      onClick={() => navigate(`/college/students/${l.student_id}`)}
                      className="text-sm text-white hover:text-elec-yellow text-left touch-manipulation"
                    >
                      {l.student_name}
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-white/50">
                        {l.evidence_count} evidence
                      </span>
                      <Pill tone={STATUS_TONE[l.status] || 'blue'}>
                        {l.status.replace(/_/g, ' ')}
                      </Pill>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.section>

          {/* Resources */}
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Tagged resources
            </h2>
            {resources.length === 0 ? (
              <div className="mt-3 rounded-lg border border-dashed border-white/10 px-3 py-4 text-center text-xs text-white/40">
                No resources tagged to this AC yet. Tag from the Teaching Resources library.
              </div>
            ) : (
              <ul className="mt-3 space-y-2">
                {resources.map((r) => (
                  <li
                    key={r.id}
                    className="rounded-xl border border-white/10 bg-black/20 p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-white">{r.title}</div>
                        {r.description && (
                          <p className="mt-1 text-xs text-white/70">{r.description}</p>
                        )}
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {r.resource_type && (
                            <Pill tone="blue">{r.resource_type}</Pill>
                          )}
                          {!r.is_student_visible && (
                            <Pill tone="amber">Staff-only</Pill>
                          )}
                        </div>
                      </div>
                      {r.external_url && (
                        <a
                          href={r.external_url}
                          target="_blank"
                          rel="noreferrer noopener"
                          onClick={() =>
                            void recordResourceEvent({
                              resourceId: r.id,
                              eventKind: 'open_link',
                              context: 'ac_page',
                            })
                          }
                          className="rounded-lg border border-elec-yellow/40 bg-elec-yellow/10 px-3 py-1.5 text-xs font-semibold text-elec-yellow touch-manipulation"
                        >
                          Open →
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.section>

          {/* Lessons that cover this AC */}
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Lessons covering this AC
            </h2>
            {lessons.length === 0 ? (
              <div className="mt-3 rounded-lg border border-dashed border-white/10 px-3 py-4 text-center text-xs text-white/40">
                No lessons mapped to this AC yet.
              </div>
            ) : (
              <ul className="mt-3 divide-y divide-white/5">
                {lessons.map((l) => (
                  <li
                    key={l.lesson_plan_id}
                    className="flex items-center justify-between gap-3 py-2"
                  >
                    <button
                      type="button"
                      onClick={() => navigate(`/college/lessons/${l.lesson_plan_id}`)}
                      className="min-w-0 text-left touch-manipulation"
                    >
                      <div className="text-sm text-white truncate">{l.title}</div>
                      {l.scheduled_date && (
                        <div className="text-[11px] text-white/50">
                          {new Date(l.scheduled_date).toLocaleDateString('en-GB')}
                        </div>
                      )}
                    </button>
                    {l.status && <Pill tone="blue">{l.status}</Pill>}
                  </li>
                ))}
              </ul>
            )}
          </motion.section>
        </div>
      )}
    </PageFrame>
  );
}

function ProgressTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: Tone;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-3">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider text-white/50">
        <span className={cn('inline-block h-1.5 w-1.5 rounded-full', toneDot[tone])} />
        {label}
      </div>
    </div>
  );
}
