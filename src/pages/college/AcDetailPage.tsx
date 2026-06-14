import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO from '@/hooks/useSEO';
import { useAcDetail } from '@/hooks/useAcDetail';
import {
  PageFrame,
  PageHero,
  Pill,
  SecondaryButton,
  ListCard,
  ListRow,
  FormCard,
  EmptyState,
  LoadingState,
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

      {loading && <LoadingState />}

      {error && (
        <div className="mx-4 rounded-2xl border border-red-500/30 bg-red-500/[0.06] px-5 py-4 text-[13px] text-red-300">
          {error}
        </div>
      )}

      {!loading && meta && (
        <div className="px-4 pb-16 space-y-6">
          {/* LO context */}
          {meta.lo_text && (
            <motion.section variants={itemVariants} initial="hidden" animate="visible">
              <FormCard eyebrow={`Learning Outcome ${meta.lo_number ?? ''}`}>
                <p className="text-[14px] text-white leading-relaxed">{meta.lo_text}</p>
                {meta.unit_title && (
                  <div className="text-[12px] text-white/70">{meta.unit_title}</div>
                )}
              </FormCard>
            </motion.section>
          )}

          {/* Learner progress strip */}
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <h2 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
              Learner progress
            </h2>
            <div className="grid grid-cols-3 gap-3 text-center">
              <ProgressTile label="Signed off / assessed" value={learnerStats.done} tone="emerald" />
              <ProgressTile label="In progress" value={learnerStats.partial} tone="amber" />
              <ProgressTile label="Not started" value={learnerStats.notStarted} tone="red" />
            </div>

            {learners.length > 0 && (
              <ListCard>
                {learners.slice(0, 20).map((l) => (
                  <ListRow
                    key={l.student_id}
                    onClick={() => navigate(`/college/students/${l.student_id}`)}
                    title={l.student_name}
                    subtitle={`${l.evidence_count} evidence`}
                    trailing={
                      <Pill tone={STATUS_TONE[l.status] || 'blue'}>
                        {l.status.replace(/_/g, ' ')}
                      </Pill>
                    }
                  />
                ))}
              </ListCard>
            )}
          </motion.section>

          {/* Resources */}
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <h2 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
              Tagged resources
            </h2>
            {resources.length === 0 ? (
              <EmptyState
                title="No resources tagged yet"
                description="Tag resources to this AC from the Teaching Resources library."
              />
            ) : (
              <div className="space-y-2">
                {resources.map((r) => (
                  <FormCard key={r.id}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="text-[14px] font-medium text-white">{r.title}</div>
                        {r.description && (
                          <p className="text-[12px] text-white/70 leading-relaxed">{r.description}</p>
                        )}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {r.resource_type && <Pill tone="blue">{r.resource_type}</Pill>}
                          {!r.is_student_visible && <Pill tone="amber">Staff-only</Pill>}
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
                          className="shrink-0 inline-flex h-11 items-center rounded-full border border-elec-yellow/40 bg-elec-yellow/10 px-4 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                        >
                          Open →
                        </a>
                      )}
                    </div>
                  </FormCard>
                ))}
              </div>
            )}
          </motion.section>

          {/* Lessons that cover this AC */}
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <h2 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
              Lessons covering this AC
            </h2>
            {lessons.length === 0 ? (
              <EmptyState title="No lessons mapped yet" description="No lessons are mapped to this AC yet." />
            ) : (
              <ListCard>
                {lessons.map((l) => (
                  <ListRow
                    key={l.lesson_plan_id}
                    onClick={() => navigate(`/college/lessons/${l.lesson_plan_id}`)}
                    title={l.title}
                    subtitle={
                      l.scheduled_date
                        ? new Date(l.scheduled_date).toLocaleDateString('en-GB')
                        : undefined
                    }
                    trailing={
                      l.status ? (
                        <Pill tone={STATUS_TONE[l.status] || 'blue'}>
                          {l.status.replace(/_/g, ' ')}
                        </Pill>
                      ) : undefined
                    }
                  />
                ))}
              </ListCard>
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
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-3 py-4">
      <div className="text-2xl font-semibold text-white tabular-nums">{value}</div>
      <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-white/70">
        <span className={cn('inline-block h-1.5 w-1.5 rounded-full', toneDot[tone])} />
        {label}
      </div>
    </div>
  );
}
