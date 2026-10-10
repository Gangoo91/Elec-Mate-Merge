import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { QBTN } from '@/components/college/quality/QualityHubKit';
import { NATION_TERMS, type NationTerms } from '@/data/ukNationFrameworks';

/* ==========================================================================
   InspectorRecordAnswer (ELE-1910): one of the six questions inspectors ask
   in an electrical department, answered from the record.

   The answer comes from college_inspection_answers(), which builds every
   sentence from counts over the college's own rows: the progress review
   records, the hours function (_otj_summary_core), functional skills, the
   criteria coverage and decision log, IQA samples and the gateway state
   function. No model is involved, so there is no "uses AI" marker here.
   Each line opens the review, decision, IQA sample or learner area it rests
   on.
   ========================================================================== */

export const INSPECTOR_QUESTIONS = [
  { key: 'employer_coplanning', label: 'How do you plan and review training with employers?' },
  { key: 'otj_quantified', label: 'How much off-the-job training are apprentices getting?' },
  {
    key: 'safeguarding_under18',
    label: 'How do you keep under-18s safe in workshops and at work?',
  },
  { key: 'english_maths', label: 'Where is each apprentice with English and maths?' },
  { key: 'progress_standard', label: 'What progress are apprentices making against the standard?' },
  { key: 'epa_readiness', label: 'Who is ready for end-point assessment, and what is in the way?' },
] as const;

export type InspectorQuestionKey = (typeof INSPECTOR_QUESTIONS)[number]['key'];

/** The six questions in the college's own nation's words (ELE-1976). */
export function inspectorQuestions(terms: NationTerms = NATION_TERMS.england) {
  return INSPECTOR_QUESTIONS.map((q) => {
    if (q.key === 'otj_quantified')
      return { ...q, label: `How much ${terms.offJob} are apprentices getting?` };
    if (q.key === 'epa_readiness')
      return {
        ...q,
        label:
          terms.endAssessment === 'end-point assessment'
            ? q.label
            : `Who is ready for ${terms.endAssessment}, and what is in the way?`,
      };
    return { ...q };
  });
}

interface AnswerLine {
  learner_id: string | null;
  learner_name: string;
  state: 'ok' | 'attention' | 'info';
  text: string;
  record: 'review' | 'decision' | 'iqa_sample' | 'learner' | 'page';
  record_id: string | null;
  href: string;
  at: string | null;
}

interface Answer {
  question: string;
  title: string;
  headline: string;
  counts: Record<string, unknown>;
  lines: AnswerLine[];
  sources: string[];
  safeguarding_detail: boolean | null;
  taken_at: string;
}

const RECORD_LABEL: Record<AnswerLine['record'], string> = {
  review: 'Review',
  decision: 'Decision',
  iqa_sample: 'IQA sample',
  learner: 'Learner',
  page: 'Fix',
};

const STATE_CHIP: Record<AnswerLine['state'], string> = {
  ok: 'border-emerald-400/60 text-emerald-300',
  attention: 'border-orange-400/60 text-orange-300',
  info: 'border-white/[0.18] text-white',
};

const STATE_WORD: Record<AnswerLine['state'], string> = {
  ok: 'In order',
  attention: 'Needs action',
  info: 'Note',
};

export function InspectorRecordAnswer({
  collegeId,
  question,
  onClear,
  terms,
}: {
  collegeId: string;
  question: InspectorQuestionKey;
  onClear: () => void;
  terms?: NationTerms;
}) {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [all, setAll] = useState(false);

  useEffect(() => {
    let live = true;
    setAnswer(null);
    setError(null);
    setAll(false);
    void supabase
      .rpc(
        'college_inspection_answers' as never,
        { p_college: collegeId, p_question: question } as never
      )
      .then(({ data, error: e }) => {
        if (!live) return;
        if (e) setError(e.message);
        else setAnswer(data as unknown as Answer);
      });
    return () => {
      live = false;
    };
  }, [collegeId, question]);

  if (error) {
    return <div className="px-4 py-4 text-[13px] text-orange-300 sm:px-5">{error}</div>;
  }
  if (!answer) {
    return (
      <div
        className="px-4 py-6 text-center text-[13px] text-white sm:px-5"
        data-testid="record-answer-loading"
      >
        Reading your records…
      </div>
    );
  }

  const attention = answer.lines.filter((l) => l.state === 'attention').length;
  const lines = all ? answer.lines : answer.lines.slice(0, 8);

  return (
    <div data-testid="record-answer">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.06] px-4 py-4 sm:px-5">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-elec-yellow">From your records</p>
          <h3 className="mt-1 text-[16px] font-semibold leading-snug text-white">
            {inspectorQuestions(terms).find((q) => q.key === question)?.label ?? answer.title}
          </h3>
          <p
            className="mt-2 max-w-3xl text-[14px] leading-relaxed text-white"
            data-testid="record-answer-headline"
          >
            {answer.headline}
          </p>
          <p className="mt-2 text-[12px] leading-snug text-white">
            Counted from {answer.sources.join(', ')} at{' '}
            {new Date(answer.taken_at).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            })}
            .
            {attention > 0
              ? ` ${attention} ${attention === 1 ? 'line needs' : 'lines need'} action, shown first.`
              : ''}
            {answer.safeguarding_detail === false
              ? ' Safeguarding records are counted only for your safeguarding leads.'
              : ''}
          </p>
        </div>
        <button type="button" onClick={onClear} className={QBTN}>
          Clear
        </button>
      </div>

      {answer.lines.length === 0 ? (
        <p className="px-4 py-8 text-center text-[13px] text-white sm:px-5">
          Nothing on record for this question yet.
        </p>
      ) : (
        <ul className="divide-y divide-white/[0.05]">
          {lines.map((l, i) => (
            <li key={`${l.record}-${l.record_id ?? i}-${i}`}>
              <button
                type="button"
                onClick={() => navigate(l.href)}
                className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-5"
                data-testid="record-answer-line"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[14px] font-semibold text-white">{l.learner_name}</span>
                    <span
                      className={cn(
                        'inline-flex h-6 items-center rounded-full border px-2.5 text-[12px] font-semibold',
                        STATE_CHIP[l.state]
                      )}
                    >
                      {STATE_WORD[l.state]}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-snug text-white">{l.text}</p>
                </div>
                <span className="mt-0.5 flex shrink-0 items-center gap-1 text-[12px] font-semibold text-elec-yellow">
                  {RECORD_LABEL[l.record]}
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {answer.lines.length > 8 && (
        <div className="border-t border-white/[0.06] px-4 py-3 sm:px-5">
          <button type="button" className={QBTN} onClick={() => setAll((v) => !v)}>
            {all ? 'Show fewer' : `Show all ${answer.lines.length}`}
          </button>
        </div>
      )}
    </div>
  );
}
