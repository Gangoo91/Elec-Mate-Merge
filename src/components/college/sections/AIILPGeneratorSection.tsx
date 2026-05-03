/**
 * AIILPGeneratorSection — picks a learner, then opens the real AI-streamed
 * ILP generator (IlpGenerateSheet wrapping ai-generate-ilp edge function).
 *
 * Was 700+ lines of client-side template generation that LOOKED like AI
 * but never called any model. The real AI flow already exists in
 * IlpGenerateSheet — this section now just surfaces it with a curated
 * student picker that prioritises risk + overdue-review learners.
 */

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useStudentIlp } from '@/hooks/useStudentIlp';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { IlpGenerateSheet } from '@/components/college/sheets/IlpGenerateSheet';
import {
  PageFrame,
  PageHero,
  FilterBar,
  ListCard,
  PeopleListRow,
  Pill,
  EmptyState,
  StatStrip,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';

interface AIILPGeneratorSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

const RISK_TONE: Record<string, Tone> = {
  high: 'red',
  medium: 'amber',
  low: 'emerald',
};

interface PickedStudent {
  id: string;
  name: string;
}

export function AIILPGeneratorSection({ onNavigate: _onNavigate }: AIILPGeneratorSectionProps) {
  void _onNavigate;
  const { students, attendance, ilps, isLoading } = useCollegeSupabase();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [picked, setPicked] = useState<PickedStudent | null>(null);

  // Derive per-student summary used to sort + flag the picker list.
  const studentSummaries = useMemo(() => {
    return students.map((s) => {
      const sessions = attendance.filter((a) => a.student_id === s.id);
      const present = sessions.filter(
        (a) => a.status === 'Present' || a.status === 'Late'
      ).length;
      const attendanceRate = sessions.length > 0 ? Math.round((present / sessions.length) * 100) : null;

      const studentIlps = ilps.filter((i) => i.student_id === s.id);
      const latestIlp = studentIlps[0] ?? null;
      const reviewDueAt = latestIlp?.review_date ? new Date(latestIlp.review_date) : null;
      const reviewOverdue = !!reviewDueAt && reviewDueAt < new Date();
      const hasNoIlp = studentIlps.length === 0;

      return {
        id: s.id,
        name: s.name,
        photo: s.photo_url ?? undefined,
        cohort: s.cohort_id,
        riskLevel: s.risk_level ?? 'low',
        attendanceRate,
        hasNoIlp,
        reviewOverdue,
      };
    });
  }, [students, attendance, ilps]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return studentSummaries
      .filter((s) => {
        const matchesSearch = !q || s.name.toLowerCase().includes(q);
        const matchesRisk = filterRisk === 'all' || s.riskLevel === filterRisk;
        return matchesSearch && matchesRisk;
      })
      .sort((a, b) => {
        // Push priorities to the top: no ILP, then overdue review, then high risk
        const score = (s: typeof a) =>
          (s.hasNoIlp ? 100 : 0) +
          (s.reviewOverdue ? 50 : 0) +
          (s.riskLevel === 'high' ? 25 : s.riskLevel === 'medium' ? 10 : 0);
        return score(b) - score(a);
      });
  }, [studentSummaries, searchQuery, filterRisk]);

  const stats = useMemo(() => {
    const noIlp = studentSummaries.filter((s) => s.hasNoIlp).length;
    const overdue = studentSummaries.filter((s) => !s.hasNoIlp && s.reviewOverdue).length;
    const highRisk = studentSummaries.filter((s) => s.riskLevel === 'high').length;
    return { noIlp, overdue, highRisk, total: studentSummaries.length };
  }, [studentSummaries]);

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Tools · AI ILP Generator"
          title="AI ILP generator"
          description="Pick a learner — the AI drafts a full ILP from their attendance, AC coverage, observations, OTJ, EPA verdicts and prior plans. Review and save in one tap."
          tone="yellow"
          actions={<Pill tone="yellow">AI</Pill>}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatStrip
          columns={4}
          stats={[
            {
              value: stats.noIlp,
              label: 'No ILP yet',
              sub: 'Should be drafted',
              tone: 'red',
              accent: stats.noIlp > 0,
            },
            {
              value: stats.overdue,
              label: 'Review overdue',
              sub: 'Past review date',
              tone: 'amber',
              accent: stats.overdue > 0,
            },
            {
              value: stats.highRisk,
              label: 'High risk',
              sub: 'Priority focus',
              tone: 'red',
            },
            { value: stats.total, label: 'Learners', sub: 'On roll' },
          ]}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={[
            { value: 'all', label: 'All', count: studentSummaries.length },
            {
              value: 'high',
              label: 'High risk',
              count: studentSummaries.filter((s) => s.riskLevel === 'high').length,
            },
            {
              value: 'medium',
              label: 'Medium risk',
              count: studentSummaries.filter((s) => s.riskLevel === 'medium').length,
            },
            {
              value: 'low',
              label: 'Low risk',
              count: studentSummaries.filter((s) => s.riskLevel === 'low').length,
            },
          ]}
          activeTab={filterRisk}
          onTabChange={setFilterRisk}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search learners…"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        {isLoading ? (
          <ListCard>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[80px] animate-pulse bg-white/[0.02] border-b border-white/[0.04]"
              />
            ))}
          </ListCard>
        ) : filtered.length === 0 ? (
          <EmptyState
            title={
              studentSummaries.length === 0 ? 'No learners on roll yet' : 'No matches'
            }
            description={
              studentSummaries.length === 0
                ? 'Add learners to your college from the Students section to draft ILPs.'
                : 'Try a different filter or search query.'
            }
          />
        ) : (
          <ListCard>
            {filtered.map((s) => {
              const initials = (s.name || '?')
                .split(/\s+/)
                .slice(0, 2)
                .map((w) => w[0])
                .join('')
                .toUpperCase();
              const flags: Array<{ label: string; tone: Tone }> = [];
              if (s.hasNoIlp) flags.push({ label: 'No ILP', tone: 'red' });
              if (s.reviewOverdue) flags.push({ label: 'Review overdue', tone: 'amber' });
              if (s.riskLevel === 'high') flags.push({ label: 'High risk', tone: 'red' });
              else if (s.riskLevel === 'medium')
                flags.push({ label: 'Medium risk', tone: 'amber' });

              const accent: 'red' | 'amber' | 'none' = s.hasNoIlp
                ? 'red'
                : s.reviewOverdue || s.riskLevel === 'high'
                  ? 'amber'
                  : 'none';

              return (
                <PeopleListRow
                  key={s.id}
                  id={s.id}
                  accent={accent}
                  lead={
                    s.photo
                      ? { kind: 'photo', src: s.photo, alt: s.name }
                      : {
                          kind: 'initials',
                          text: initials,
                          tone: RISK_TONE[s.riskLevel] ?? 'yellow',
                        }
                  }
                  title={s.name}
                  subtitle={
                    s.attendanceRate !== null
                      ? `Attendance ${s.attendanceRate}%`
                      : 'No attendance data'
                  }
                  titleChips={
                    <div className="flex gap-1.5 flex-wrap">
                      {flags.map((f, i) => (
                        <Pill key={`${s.id}-flag-${i}`} tone={f.tone}>
                          {f.label}
                        </Pill>
                      ))}
                    </div>
                  }
                  onOpen={() => setPicked({ id: s.id, name: s.name })}
                  actions={[
                    {
                      label: 'Draft AI ILP',
                      onClick: () => setPicked({ id: s.id, name: s.name }),
                    },
                  ]}
                />
              );
            })}
          </ListCard>
        )}
      </motion.div>

      {picked && (
        <PickedSheet
          studentId={picked.id}
          studentName={picked.name}
          onClose={() => setPicked(null)}
        />
      )}
    </PageFrame>
  );
}

/* ==========================================================================
   PickedSheet — wraps IlpGenerateSheet with the per-student `useStudentIlp`
   hook so the AI draft can be saved straight to the learner's ILP record.
   Mounted only when a student is picked so we don't fire the hook for every
   learner up-front.
   ========================================================================== */

function PickedSheet({
  studentId,
  studentName,
  onClose,
}: {
  studentId: string;
  studentName: string;
  onClose: () => void;
}) {
  const ilp = useStudentIlp({ collegeStudentId: studentId });

  return (
    <IlpGenerateSheet
      open
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
      studentId={studentId}
      studentName={studentName}
      hookActions={{ upsertIlp: ilp.upsertIlp, addGoal: ilp.addGoal }}
      onSaved={onClose}
    />
  );
}
