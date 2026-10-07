/**
 * Weak spots mock (ELE-1815, item 3).
 *
 * Jack's ask: tell me what to revise, then test me on it. A 20-question paper
 * built from the learner's own revision pile:
 *   - up to 10 questions they've got wrong before, spread across their weakest
 *     topics (topic = the review's topic, or the paper when it has none);
 *   - the rest FRESH questions from the same topics in the same banks, unseen
 *     in their recent attempts where possible (served_keys), so the score says
 *     whether the topic is learned, not whether the answer is remembered.
 * Runs on StandardMockExam, so it records like any paper (review snapshot,
 * pile, history) under exam_slug 'targeted-weak-spots'.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase as typedSupabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { StandardMockExam } from '@/components/shared/StandardMockExam';
import { MH_CARD } from '@/components/study-centre/mock-history/MockBits';
import { useRevisionPile, type PileItem } from '@/hooks/study-centre/useMockHistory';
import { loadBank, type RegistryQuestion } from '@/lib/study-centre/mockBankRegistry';
import { questionKey } from '@/lib/mockExamTelemetry';
import type { MockExamConfig, StandardMockQuestion } from '@/types/standardMockExam';

const supabase = typedSupabase as unknown as SupabaseClient;

const PAPER_SIZE = 20;
const FROM_PILE = 10;

/** A question on the paper, plus the module it came from (for study links). */
type TargetedQuestion = StandardMockQuestion & { module?: string; sourceSlug?: string };

const topicOf = (it: Pick<PileItem, 't' | 'paper'>) => it.t || it.paper;

function shuffle<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Round-robin across ranked groups, so the strongest weakness leads but every
 *  weak topic gets a turn. */
function roundRobin<T>(groups: T[][], max: number): T[] {
  const out: T[] = [];
  const queues = groups.map((g) => [...g]);
  while (out.length < max && queues.some((q) => q.length)) {
    for (const q of queues) {
      const next = q.shift();
      if (next !== undefined) out.push(next);
      if (out.length >= max) break;
    }
  }
  return out;
}

export default function MockTargetedPage() {
  useSEO('Weak spots mock | Study Centre', 'A mock built from the topics you keep getting wrong.');
  const navigate = useNavigate();
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const pile = useRevisionPile();
  const [deck, setDeck] = useState<TargetedQuestion[] | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [fromPileCount, setFromPileCount] = useState(0);
  const [freshCount, setFreshCount] = useState(0);

  // Weakest topics first, with their pile items.
  const ranked = useMemo(() => {
    const by = new Map<string, PileItem[]>();
    for (const it of pile.items) by.set(topicOf(it), [...(by.get(topicOf(it)) ?? []), it]);
    return [...by.entries()].sort((a, b) => b[1].length - a[1].length);
  }, [pile.items]);

  useEffect(() => {
    if (deck || pile.loading || !uid) return;
    if (ranked.length === 0) {
      setDeck([]);
      return;
    }
    let cancelled = false;
    void (async () => {
      // 1 · Questions they've got wrong before, spread across the weak topics.
      const pileQs = roundRobin(
        ranked.map(([, items]) => items),
        FROM_PILE
      );
      const used = new Set(pileQs.map((it) => it.k));

      // What they've been served recently — fresh means unseen where possible.
      const { data: recent } = await supabase
        .from('seo_mock_attempts')
        .select('served_keys')
        .eq('user_id', uid)
        .not('served_keys', 'is', null)
        .order('created_at', { ascending: false })
        .limit(40);
      const seen = new Set<string>(
        ((recent ?? []) as { served_keys: string[] | null }[]).flatMap((r) => r.served_keys ?? [])
      );

      // 2 · Fresh questions from the same topics, in the banks they came from.
      const freshGroups: { q: RegistryQuestion; key: string; examSlug: string; topic: string }[][] =
        [];
      for (const [topic, items] of ranked) {
        // A miss from an earlier weak-spots mock belongs to its real paper (x);
        // the mixed paper itself has no bank, so fresh questions came out empty.
        const slugs = [...new Set(items.map((it) => it.x ?? it.examSlug))];
        const group: { q: RegistryQuestion; key: string; examSlug: string; topic: string }[] = [];
        for (const slug of slugs) {
          const bank = await loadBank(slug);
          // A topic named after a paper (no topic on the questions) takes any
          // question from that paper's bank; otherwise match the topic.
          const paperLevel = items.every((it) => !it.t);
          for (const q of bank) {
            if (!paperLevel && (q.topic || '') !== topic) continue;
            const key = questionKey(q.question);
            if (used.has(key)) continue;
            group.push({ q, key, examSlug: slug, topic });
          }
        }
        // Unseen first, then ones they've seen (and since got right).
        const unseen = shuffle(group.filter((g) => !seen.has(g.key)));
        const seenBefore = shuffle(group.filter((g) => seen.has(g.key)));
        freshGroups.push([...unseen, ...seenBefore]);
      }
      const fresh: (typeof freshGroups)[number] = [];
      for (const g of roundRobin(freshGroups, PAPER_SIZE * 2)) {
        if (fresh.length >= PAPER_SIZE - pileQs.length) break;
        if (used.has(g.key)) continue;
        used.add(g.key);
        fresh.push(g);
      }

      // Short on fresh questions (tiny banks): top up from the rest of the pile.
      const topUp =
        pileQs.length + fresh.length < PAPER_SIZE
          ? pile.items
              .filter((it) => !used.has(it.k))
              .slice(0, PAPER_SIZE - pileQs.length - fresh.length)
          : [];

      const asQuestion = (
        base: Omit<TargetedQuestion, 'id' | 'difficulty'>
      ): Omit<TargetedQuestion, 'id'> => ({ ...base, difficulty: 'intermediate' });

      const built: Omit<TargetedQuestion, 'id'>[] = [
        ...[...pileQs, ...topUp].map((it) =>
          asQuestion({
            question: it.q,
            options: it.o,
            correctAnswer: it.c,
            explanation: it.e ?? '',
            section: it.s ?? '',
            topic: it.t ?? '',
            category: topicOf(it),
            module: it.m,
            reference: it.r,
            // Where it really came from — its review links and topic stats
            // resolve against that paper, not 'targeted-weak-spots'.
            sourceSlug: it.x ?? it.examSlug,
          })
        ),
        ...fresh.map(({ q, topic, examSlug }) =>
          asQuestion({
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            section: q.section ?? '',
            topic: q.topic ?? '',
            category: topic,
            module: q.module,
            reference: q.reference,
            sourceSlug: examSlug,
          })
        ),
      ];
      if (cancelled) return;
      setFromPileCount(pileQs.length + topUp.length);
      setFreshCount(fresh.length);
      setTopics(ranked.slice(0, 6).map(([t]) => t));
      setDeck(shuffle(built).map((q, i) => ({ ...q, id: i + 1 })));
    })();
    return () => {
      cancelled = true;
    };
  }, [deck, pile.loading, pile.items, ranked, uid]);

  const config: MockExamConfig | null = useMemo(() => {
    if (!deck || deck.length === 0) return null;
    return {
      examId: 'targeted-weak-spots',
      examTitle: 'Weak spots mock',
      totalQuestions: deck.length,
      timeLimit: Math.max(10, Math.round(deck.length * 1.5)) * 60,
      passThreshold: 60,
      exitPath: '/study-centre/mock-exams/history',
      exitLabel: 'history',
      categories: topics,
      subtitle: `Built from your ${topics.length === 1 ? 'weakest topic' : `${topics.length} weakest topics`}`,
      note:
        freshCount > 0
          ? `${fromPileCount} ${fromPileCount === 1 ? 'is a question' : 'are questions'} you’ve got wrong before; the other ${freshCount} are fresh ones from the same topics, so your score says whether you’ve learned it — not whether you remember the answer.`
          : `These are all questions you’ve got wrong before — there weren’t new ones left in those topics. Sit more mocks to widen the pool.`,
    };
  }, [deck, topics, fromPileCount, freshCount]);

  const getRandomQuestions = useCallback(() => shuffle(deck ?? []), [deck]);

  if (deck === null || pile.loading) {
    return (
      <HubPage>
        <HubMasthead
          section="Study Centre"
          title="Weak spots mock"
          backTo="/study-centre/mock-exams/history"
        />
        <HubBody>
          <div className="flex flex-col items-center gap-3 py-16" aria-live="polite">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
            <p className="text-[13.5px] text-white">Building a paper from your weak spots…</p>
          </div>
        </HubBody>
      </HubPage>
    );
  }

  if (!config) {
    return (
      <HubPage>
        <HubMasthead
          section="Study Centre"
          title="Weak spots mock"
          backTo="/study-centre/mock-exams/history"
        />
        <HubBody>
          <div className={cn(MH_CARD, 'p-5')}>
            <p className="text-[15px] font-semibold text-white">No weak spots to target yet.</p>
            <p className="mt-1 text-[14px] leading-relaxed text-white">
              This paper is built from the questions you’ve got wrong in your mocks. Sit a mock
              first — or if you’ve cleared everything, well done.
            </p>
            <button
              type="button"
              onClick={() => navigate('/study-centre/mock-exams')}
              className="mt-3 h-11 rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black touch-manipulation"
            >
              Choose a mock exam
            </button>
          </div>
        </HubBody>
      </HubPage>
    );
  }

  return (
    <StandardMockExam
      key={deck.length}
      config={config}
      questionBank={deck}
      getRandomQuestions={getRandomQuestions}
    />
  );
}
