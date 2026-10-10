/**
 * Practise a criterion (ELE-1904): a short paper on the Study Centre section
 * that teaches it.
 *
 * Opened from "Practise (10 questions)" on a criterion. The questions are the
 * module bank's own, picked by the same question → page table the mock exams
 * use to say "study this" (studyLinkFor over mockTopicLessons.ts), so a
 * question lands here only if that table already sends it to this section.
 * Section level, not criterion level, and the start screen says so. Runs on
 * StandardMockExam, so it records like any paper and wrong answers join the
 * learner's revision pile with their bank (sourceSlug) for the weak-spots mock.
 *
 * URL: /study-centre/practise?bank=level3-module8-mock5&section=<section route>&ac=304 AC 1.1
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { StandardMockExam } from '@/components/shared/StandardMockExam';
import { loadBank } from '@/lib/study-centre/mockBankRegistry';
import { studyLinkFor } from '@/lib/study-centre/mockStudyLinks';
import { PRACTISE_PAPER } from '@/hooks/college/useStudyLinks';
import type { MockExamConfig, StandardMockQuestion } from '@/types/standardMockExam';

type PractiseQuestion = StandardMockQuestion & { module?: string; sourceSlug?: string };

const BANK = /^level[23]-module8-mock[1-7]$/;
const SECTION = /^\/study-centre\/apprentice\/[a-z0-9/-]+$/;

function shuffle<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const CARD =
  '-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5 sm:mx-0 sm:rounded-2xl sm:border-x';

export default function PractiseSectionPage() {
  useSEO('Practise | Study Centre', 'A short paper on the lesson that teaches a criterion.');
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const bank = params.get('bank') ?? '';
  const section = params.get('section') ?? '';
  const ac = (params.get('ac') ?? '').slice(0, 40);
  const valid = BANK.test(bank) && SECTION.test(section);

  const [pool, setPool] = useState<PractiseQuestion[] | null>(null);
  const [label, setLabel] = useState<string>('');

  useEffect(() => {
    if (!valid) {
      setPool([]);
      return;
    }
    let cancelled = false;
    void loadBank(bank).then((qs) => {
      if (cancelled) return;
      let sectionLabel = '';
      const hits = qs.filter((q) => {
        const link = studyLinkFor(bank, q.section, q.module, q.topic ?? q.category);
        if (link?.to !== section) return false;
        sectionLabel ||= link.label;
        return true;
      });
      setLabel(sectionLabel);
      setPool(
        hits.map((q, i) => ({
          id: i + 1,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          section: q.section ?? '',
          topic: q.topic ?? '',
          category: q.topic ?? sectionLabel,
          difficulty: 'intermediate',
          module: q.module,
          reference: q.reference,
          sourceSlug: bank,
        }))
      );
    });
    return () => {
      cancelled = true;
    };
  }, [bank, section, valid]);

  const paper = useMemo(
    () => (pool ? shuffle(pool).slice(0, PRACTISE_PAPER) : null),
    // A fresh draw each time the pool loads.
    [pool]
  );

  const config: MockExamConfig | null = useMemo(() => {
    if (!paper || paper.length === 0) return null;
    const lesson = label.replace(/^Level [23] · /, '').replace(/\s*\(Module.*$/, '');
    return {
      examId: 'practise-criterion',
      examTitle: ac ? `Practise ${ac}` : 'Practise',
      totalQuestions: paper.length,
      timeLimit: Math.max(5, Math.round(paper.length * 1.5)) * 60,
      passThreshold: 60,
      exitPath: section,
      exitLabel: 'lesson',
      categories: [lesson || 'This section'],
      subtitle: lesson ? `Questions on ${lesson}` : undefined,
      note: `${paper.length} questions from the lesson section that teaches this criterion, drawn from ${pool?.length ?? paper.length} in the question bank. They test the section as a whole, not only this criterion.`,
    };
  }, [paper, pool, label, ac, section]);

  const getRandomQuestions = useCallback(
    () =>
      shuffle(pool ?? [])
        .slice(0, PRACTISE_PAPER)
        .map((q, i) => ({ ...q, id: i + 1 })),
    [pool]
  );

  if (pool === null) {
    return (
      <HubPage ground="landing">
        <HubMasthead section="Study Centre" title="Practise" backTo="/study-centre" />
        <HubBody>
          <div className="flex flex-col items-center gap-3 py-16" aria-live="polite">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
            <p className="text-[13.5px] text-white">Picking questions…</p>
          </div>
        </HubBody>
      </HubPage>
    );
  }

  if (!config) {
    return (
      <HubPage ground="landing">
        <HubMasthead section="Study Centre" title="Practise" backTo="/study-centre" />
        <HubBody>
          <div className={cn(CARD)}>
            <p className="text-[15px] font-semibold text-white">No practice questions here yet.</p>
            <p className="mt-1 text-[14px] leading-relaxed text-white">
              {valid
                ? 'The question bank has nothing matched to this lesson section. The lesson itself is still there to study.'
                : 'This practice link is incomplete.'}
            </p>
            {valid && (
              <button
                type="button"
                onClick={() => navigate(section)}
                className="mt-3 h-11 rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black touch-manipulation"
              >
                Open the lesson
              </button>
            )}
          </div>
        </HubBody>
      </HubPage>
    );
  }

  return (
    <StandardMockExam
      key={`${bank}|${section}`}
      config={config}
      questionBank={paper ?? []}
      getRandomQuestions={getRandomQuestions}
    />
  );
}
