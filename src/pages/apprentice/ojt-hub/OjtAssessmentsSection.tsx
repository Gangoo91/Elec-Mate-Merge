/**
 * OjtAssessmentsSection — apprentice assessment deadlines, rebuilt for the
 * OJT hub. Replaces the legacy /apprentice/ojt "Assessments" tab. Reads the
 * same ojt_assessments table via useOJTAssessments, rendered in the hub's
 * editorial dark style.
 */

import { useState } from 'react';
import { Plus, Loader2, ClipboardCheck, Trash2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useOJTAssessments,
  type OJTAssessment,
} from '@/hooks/time-tracking/useOJTAssessments';
import AddAssessmentDialog from '@/components/apprentice/ojt/AddAssessmentDialog';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const STATUS_TONE: Record<OJTAssessment['status'], string> = {
  completed: 'border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow',
  scheduled: 'border-white/[0.10] bg-white/[0.04] text-white/85',
  pending: 'border-white/[0.10] bg-white/[0.04] text-white/70',
  failed: 'border-red-500/30 bg-red-500/[0.04] text-red-300',
  deferred: 'border-white/[0.08] bg-white/[0.02] text-white/45',
};

const STATUS_LABEL: Record<OJTAssessment['status'], string> = {
  completed: 'Completed',
  scheduled: 'Scheduled',
  pending: 'Pending',
  failed: 'Referred',
  deferred: 'Deferred',
};

// AddAssessmentDialog emits capitalised types ("Written", "Practical",
// "Portfolio"…); the ojt_assessments enum is lowercase. Normalise.
const TYPE_ENUM: Record<string, OJTAssessment['type']> = {
  practical: 'practical',
  written: 'written',
  observation: 'observation',
  portfolio: 'portfolio',
};
const toTypeEnum = (raw: string): OJTAssessment['type'] =>
  TYPE_ENUM[(raw || '').trim().toLowerCase()] ?? 'other';

const fmtDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  } catch {
    return '';
  }
};

const dueLabel = (iso: string, status: OJTAssessment['status']) => {
  if (status === 'completed' || status === 'failed') return fmtDate(iso);
  const due = new Date(iso);
  const days = Math.ceil((due.getTime() - Date.now()) / 86_400_000);
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  if (days <= 14) return `In ${days} days`;
  return `Due ${fmtDate(iso)}`;
};

interface AssessmentPayload {
  title: string;
  type: string;
  dueDate: string;
}

export function OjtAssessmentsSection() {
  const { assessments, isLoading, addAssessment, completeAssessment, deleteAssessment } =
    useOJTAssessments();
  const [showAdd, setShowAdd] = useState(false);

  const completed = assessments.filter((a) => a.status === 'completed').length;

  const handleAdd = (payload: AssessmentPayload) => {
    void addAssessment({
      title: payload.title,
      type: toTypeEnum(payload.type),
      due_date: payload.dueDate,
    });
    setShowAdd(false);
  };

  return (
    <section className="space-y-3">
      <SectionHeader
        eyebrow="Assessments"
        title="Assessment deadlines"
        meta={
          assessments.length > 0
            ? `${completed}/${assessments.length} done · keep track of what's coming up`
            : 'Track practical, written and portfolio assessment dates'
        }
        action={
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-elec-yellow text-black text-[12px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.97] transition-all touch-manipulation"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            Add
          </button>
        }
      />

      {isLoading ? (
        <div className="flex items-center gap-3 py-6">
          <Loader2 className="h-4 w-4 animate-spin text-white/55" />
          <Eyebrow>Loading…</Eyebrow>
        </div>
      ) : assessments.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-6 text-center space-y-2">
          <ClipboardCheck className="h-7 w-7 text-white/25 mx-auto" />
          <p className="text-[13px] text-white/85 leading-relaxed">
            No assessments tracked yet. Add upcoming practical, written or portfolio
            assessments so nothing sneaks up on you.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {assessments.map((a) => {
            const overdue =
              (a.status === 'pending' || a.status === 'scheduled') &&
              new Date(a.due_date).getTime() < Date.now();
            const done = a.status === 'completed';
            return (
              <li
                key={a.id}
                className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-3.5 py-3 sm:px-5 sm:py-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={cn(
                          'text-[9.5px] font-medium uppercase tracking-[0.14em] px-1.5 py-[1px] rounded-md border whitespace-nowrap',
                          STATUS_TONE[a.status]
                        )}
                      >
                        {STATUS_LABEL[a.status]}
                      </span>
                      <span className="text-[9.5px] uppercase tracking-[0.14em] text-white/55 capitalize">
                        {a.type}
                      </span>
                      <span
                        className={cn(
                          'text-[10px] whitespace-nowrap',
                          overdue ? 'text-red-300' : 'text-white/45'
                        )}
                      >
                        {dueLabel(a.due_date, a.status)}
                      </span>
                    </div>
                    <p className="text-[13px] font-medium text-white leading-snug break-words">
                      {a.title}
                    </p>
                    {done && a.grade && (
                      <p className="text-[11.5px] text-elec-yellow/85">
                        Grade: {a.grade}
                      </p>
                    )}
                    {a.feedback && (
                      <p className="text-[11.5px] text-white/55 italic leading-snug">
                        {a.feedback}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!done && (
                      <button
                        type="button"
                        onClick={() => void completeAssessment(a.id)}
                        aria-label="Mark complete"
                        className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow hover:bg-elec-yellow/[0.12] transition-colors touch-manipulation"
                        title="Mark complete"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => void deleteAssessment(a.id)}
                      aria-label="Delete assessment"
                      className="h-8 w-8 inline-flex items-center justify-center rounded-md text-white/30 hover:text-red-300 hover:bg-red-500/[0.06] transition-colors touch-manipulation"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <AddAssessmentDialog
        open={showAdd}
        onOpenChange={setShowAdd}
        onAddAssessment={handleAdd}
      />
    </section>
  );
}

export default OjtAssessmentsSection;
