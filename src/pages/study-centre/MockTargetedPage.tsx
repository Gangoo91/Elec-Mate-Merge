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
 *
 * ?topic= (10 Oct 2026, "Your week" practise goals): one topic only, a
 * 10-question paper. Its banks also come from earlier mocks that asked that
 * topic, so it still works once every wrong answer there has been cleared.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase as typedSupabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { StandardMockExam } from '@/components/shared/StandardMockExam';
import { MH_CARD } from '@/components/study-centre/mock-history/MockBits';
import { Hairline, SC_LIST } from '@/components/study-centre/ui/StudyKit';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY } from '@/components/college/ui/CollegeUi';
import { ArrowRight } from 'lucide-react';
import { useRevisionPile, useTopicStats, type PileItem } from '@/hooks/study-centre/useMockHistory';
import { loadBank, type RegistryQuestion } from '@/lib/study-centre/mockBankRegistry';
import { questionKey } from '@/lib/mockExamTelemetry';
import { openedFrom } from '@/lib/navHistory';
import { labelForPath } from '@/hooks/useExamExit';
import type { MockExamConfig, StandardMockQuestion } from '@/types/standardMockExam';

const supabase = typedSupabase as unknown as SupabaseClient;

const PAPER_SIZE = 20;
const FROM_PILE = 10;
// One topic (?topic=): a shorter paper, fresh questions first.
const TOPIC_PAPER_SIZE = 10;
const TOPIC_FROM_PILE = 4;
/** A topic under this on mocks (3+ answers) is a weak spot, pile or no pile. */
const WEAK_BELOW = 70;

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
  const [params] = useSearchParams();
  const focus = params.get('topic') || null;
  const paperSize = focus ? TOPIC_PAPER_SIZE : PAPER_SIZE;
  const pile = useRevisionPile();
  // Accuracy per topic across every mock: the weak spots even once the
  // revision pile is clear (a topic at 20% is weak whether or not its misses
  // are still due).
  const topicStats = useTopicStats();
  const [deck, setDeck] = useState<TargetedQuestion[] | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [fromPileCount, setFromPileCount] = useState(0);
  const [freshCount, setFreshCount] = useState(0);

  // The papers each topic has been asked on, from mock history.
  const topicSlugs = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const t of topicStats.stats) {
      if (!t.examSlug || t.examSlug === 'targeted-weak-spots') continue;
      m.set(t.topic, (m.get(t.topic) ?? new Set()).add(t.examSlug));
    }
    return m;
  }, [topicStats.stats]);

  // Weakest topics first: those with misses on the pile (most first), then
  // topics under 70% on mocks with nothing left on the pile (lowest first).
  const ranked = useMemo(() => {
    const by = new Map<string, PileItem[]>();
    for (const it of pile.items) by.set(topicOf(it), [...(by.get(topicOf(it)) ?? []), it]);
    // One topic: just that one, even with nothing left in the pile for it.
    if (focus) return [[focus, by.get(focus) ?? []] as [string, PileItem[]]];
    const fromPile = [...by.entries()].sort((a, b) => b[1].length - a[1].length);
    const weak = new Map<string, number>();
    for (const t of topicStats.stats) {
      if (t.answered < 3 || t.pct >= WEAK_BELOW || by.has(t.topic) || !topicSlugs.has(t.topic))
        continue;
      weak.set(t.topic, Math.min(weak.get(t.topic) ?? 100, t.pct));
    }
    const fromStats = [...weak.entries()]
      .sort((a, b) => a[1] - b[1])
      .map(([t]) => [t, [] as PileItem[]] as [string, PileItem[]]);
    return [...fromPile, ...fromStats];
  }, [pile.items, focus, topicStats.stats, topicSlugs]);

  useEffect(() => {
    if (deck || pile.loading || topicStats.loading || !uid) return;
    if (!focus && ranked.length === 0) {
      setDeck([]);
      return;
    }
    let cancelled = false;
    void (async () => {
      // 1 · Questions they've got wrong before, spread across the weak topics.
      const pileQs = roundRobin(
        ranked.map(([, items]) => items),
        focus ? TOPIC_FROM_PILE : FROM_PILE
      );
      const used = new Set(pileQs.map((it) => it.k));

      // What they've been served recently — fresh means unseen where possible.
      const { data: recent } = await supabase
        .from('seo_mock_attempts')
        .select('served_keys, exam_slug, topic_stats')
        .eq('user_id', uid)
        .order('created_at', { ascending: false })
        .limit(40);
      type Recent = {
        served_keys: string[] | null;
        exam_slug: string | null;
        topic_stats: Record<string, { x?: string }> | null;
      };
      const recentRows = (recent ?? []) as Recent[];
      const seen = new Set<string>(recentRows.flatMap((r) => r.served_keys ?? []));
      // One topic: the papers that have asked it before have its questions.
      const focusSlugs = focus
        ? recentRows
            .filter((r) => r.topic_stats && typeof r.topic_stats[focus] === 'object')
            .map((r) => r.topic_stats![focus].x ?? r.exam_slug)
            .filter((x): x is string => !!x && x !== 'targeted-weak-spots')
        : [];

      // 2 · Fresh questions from the same topics, in the banks they came from.
      const freshGroups: { q: RegistryQuestion; key: string; examSlug: string; topic: string }[][] =
        [];
      for (const [topic, items] of ranked) {
        // A miss from an earlier weak-spots mock belongs to its real paper (x);
        // the mixed paper itself has no bank, so fresh questions came out empty.
        const slugs = [
          ...new Set([
            ...items.map((it) => it.x ?? it.examSlug),
            ...focusSlugs,
            ...(topicSlugs.get(topic) ?? []),
          ]),
        ];
        const group: { q: RegistryQuestion; key: string; examSlug: string; topic: string }[] = [];
        for (const slug of slugs) {
          const bank = await loadBank(slug);
          // A topic named after a paper (no topic on the questions) takes any
          // question from that paper's bank; otherwise match the topic.
          // (Only when there ARE pile items: a weak topic from mock history with
          // none would otherwise pull in the whole paper.)
          const paperLevel = !focus && items.length > 0 && items.every((it) => !it.t);
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
      for (const g of roundRobin(freshGroups, paperSize * 2)) {
        if (fresh.length >= paperSize - pileQs.length) break;
        if (used.has(g.key)) continue;
        used.add(g.key);
        fresh.push(g);
      }

      // Short on fresh questions (tiny banks): top up from the rest of the pile.
      const topUp =
        pileQs.length + fresh.length < paperSize
          ? pile.items
              .filter((it) => !used.has(it.k) && (!focus || topicOf(it) === focus))
              .slice(0, paperSize - pileQs.length - fresh.length)
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
  }, [
    deck,
    pile.loading,
    pile.items,
    topicStats.loading,
    topicSlugs,
    ranked,
    uid,
    focus,
    paperSize,
  ]);

  // Back returns to wherever the paper was opened from (the week plan, the
  // front page, your mocks), not always to mock history.
  const location = useLocation();
  const cameFrom = openedFrom(location.key);

  const config: MockExamConfig | null = useMemo(() => {
    if (!deck || deck.length === 0) return null;
    return {
      examId: 'targeted-weak-spots',
      examTitle: focus ? `Practise: ${focus}` : 'Weak spots mock',
      totalQuestions: deck.length,
      timeLimit: Math.max(10, Math.round(deck.length * 1.5)) * 60,
      passThreshold: 60,
      exitPath: cameFrom ?? '/study-centre/mock-exams/history',
      exitLabel: cameFrom ? labelForPath(cameFrom) : 'your mocks',
      categories: topics,
      subtitle: focus
        ? 'One of your weakest topics'
        : `Built from your ${topics.length === 1 ? 'weakest topic' : `${topics.length} weakest topics`}`,
      note:
        focus && fromPileCount === 0
          ? 'All fresh questions on this topic, so your score shows what you know now.'
          : freshCount > 0
            ? `${fromPileCount} ${fromPileCount === 1 ? 'is a question' : 'are questions'} you’ve got wrong before; the other ${freshCount} are fresh ones from the same topics, so your score says whether you’ve learned it — not whether you remember the answer.`
            : `These are all questions you’ve got wrong before — there weren’t new ones left in those topics. Sit more mocks to widen the pool.`,
    };
  }, [deck, topics, fromPileCount, freshCount, focus, cameFrom]);

  const getRandomQuestions = useCallback(() => shuffle(deck ?? []), [deck]);

  if (deck === null || pile.loading) {
    return (
      <HubPage>
        <HubMasthead
          section="Study Centre"
          title={focus ? `Practise: ${focus}` : 'Weak spots mock'}
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
    // Three different situations, three different pages.
    const answered = topicStats.stats.filter((t) => t.answered >= 3);
    const neverSat = !focus && topicStats.stats.length === 0;
    const lowest = [...answered].sort((a, b) => a.pct - b.pct).slice(0, 3);
    const title = focus
      ? `No questions on ${focus} to hand`
      : neverSat
        ? 'Sit a mock first'
        : 'No weak spots right now';
    const body = focus
      ? 'None of the papers you’ve sat have questions on it to hand. Sit a full mock that covers it: its answers count towards this week’s goal too.'
      : neverSat
        ? 'This paper is built from your mock results: the questions you got wrong, and fresh ones on the topics you find hardest. Sit any mock and it will be ready.'
        : `Nothing on your revision pile, and every topic you’ve answered on a mock is at ${WEAK_BELOW}% or better. Sit a full paper to keep it that way.`;
    return (
      <HubPage ground="landing">
        <HubMasthead
          section="Study Centre"
          title={focus ? `Practise: ${focus}` : 'Weak spots mock'}
          backTo="/study-centre/mock-exams"
        />
        <HubBody>
          <section className="relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-6 sm:mx-0 sm:rounded-3xl sm:px-8 sm:py-8">
            <Hairline />
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
              {focus ? 'Topic practice' : 'Weak spots mock'}
            </p>
            <h1 className="mt-1.5 text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[36px]">
              {title}
            </h1>
            <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-white">{body}</p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate('/study-centre/mock-exams')}
                className={cn(COLLEGE_BTN_PRIMARY, 'h-12 px-5 text-[14.5px]')}
              >
                {neverSat ? 'Choose your first mock' : 'Choose a full paper'}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              {!neverSat && (
                <button
                  type="button"
                  onClick={() => navigate('/study-centre/mock-exams/history?tab=topics')}
                  className={cn(COLLEGE_BTN, 'h-12 px-5')}
                >
                  Every topic you’ve sat
                </button>
              )}
            </div>
          </section>

          {!focus && !neverSat && lowest.length > 0 && (
            <section aria-labelledby="wt-lowest" className="space-y-3">
              <h2 id="wt-lowest" className="text-[18px] font-bold tracking-tight text-white">
                Closest to slipping
              </h2>
              <div className={SC_LIST}>
                {lowest.map((t) => (
                  <div key={`${t.examSlug}-${t.topic}`} className="px-5 py-3.5 sm:px-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[14.5px] font-semibold leading-snug text-white">
                        {t.topic}
                      </span>
                      <span className="shrink-0 text-[14px] font-bold tabular-nums text-emerald-400">
                        {t.pct}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.12]">
                      <div
                        className="h-full rounded-full bg-emerald-400"
                        style={{ width: `${t.pct}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-[12.5px] text-white">
                      {t.right} of {t.answered} right on your mocks
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="wt-how" className="space-y-3">
            <h2 id="wt-how" className="text-[18px] font-bold tracking-tight text-white">
              How this paper works
            </h2>
            <ol className={SC_LIST}>
              {[
                [
                  'Built from your mocks',
                  'Up to half the paper is questions you’ve got wrong before.',
                ],
                [
                  'Fresh questions on the same topics',
                  `The rest are new questions on your weakest topics, including any under ${WEAK_BELOW}% on your mocks.`,
                ],
                [
                  'Marked like any mock',
                  'It counts towards your history, your XP and this week’s goals.',
                ],
              ].map(([h, b], i) => (
                <li key={h} className="flex gap-3 px-5 py-3.5 sm:px-6">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-elec-yellow text-[13px] font-bold text-elec-yellow">
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14.5px] font-semibold text-white">{h}</span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-white">{b}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
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
