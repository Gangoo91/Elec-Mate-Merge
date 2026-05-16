/**
 * JargonStudyPage — editorial site-jargon flashcard study.
 *
 * Filters by category and difficulty, runs a shuffled flashcard session
 * with definitions, usage examples, context, and related terms.
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Shuffle,
  GraduationCap,
  BookOpen,
  RotateCcw,
  X,
} from 'lucide-react';
import { siteJargonTerms, siteJargonCategories, JargonTerm } from '@/data/apprentice/siteJargonData';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import { cn } from '@/lib/utils';

const difficultyTone: Record<string, string> = {
  basic: 'border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow',
  intermediate: 'border-white/[0.10] bg-white/[0.03] text-white/85',
  advanced: 'border-red-500/30 bg-red-500/[0.04] text-red-300',
};

const JargonStudyPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const [isStudying, setIsStudying] = useState(false);
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studiedCount, setStudiedCount] = useState(0);
  const [shuffledTerms, setShuffledTerms] = useState<JargonTerm[]>([]);

  const filteredTerms = useMemo(() => {
    return siteJargonTerms.filter((term) => {
      if (selectedCategory !== 'all' && term.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'all' && term.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedCategory, selectedDifficulty]);

  const startFlashcards = () => {
    const shuffled = [...filteredTerms].sort(() => Math.random() - 0.5);
    setShuffledTerms(shuffled);
    setCurrentTermIndex(0);
    setShowAnswer(false);
    setStudiedCount(0);
    setIsStudying(true);
  };

  const nextCard = () => {
    setStudiedCount(studiedCount + 1);
    if (currentTermIndex < shuffledTerms.length - 1) {
      setCurrentTermIndex(currentTermIndex + 1);
      setShowAnswer(false);
    } else {
      setIsStudying(false);
    }
  };

  const reshuffleCards = () => {
    const shuffled = [...shuffledTerms].sort(() => Math.random() - 0.5);
    setShuffledTerms(shuffled);
    setCurrentTermIndex(0);
    setShowAnswer(false);
  };

  const currentTerm = shuffledTerms[currentTermIndex];
  const progress =
    shuffledTerms.length > 0
      ? ((currentTermIndex + (showAnswer ? 1 : 0)) / shuffledTerms.length) * 100
      : 0;

  /* ─── Active session ─── */
  if (isStudying && currentTerm) {
    return (
      <div className="max-w-2xl mx-auto space-y-4 animate-fade-in px-4 pb-20 pt-4">
        {/* Session header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center h-7 px-2 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[11px] font-mono tabular-nums text-elec-yellow">
              {currentTermIndex + 1} / {shuffledTerms.length}
            </span>
            {studiedCount > 0 && (
              <span className="inline-flex items-center h-7 px-2 rounded-md border border-white/[0.08] bg-white/[0.02] text-[11px] font-mono tabular-nums text-white/85">
                {studiedCount} studied
              </span>
            )}
          </div>
          <button
            onClick={() => setIsStudying(false)}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-white/[0.08] bg-white/[0.02] text-[12px] font-medium text-white/85 hover:bg-white/[0.04] touch-manipulation"
            aria-label="Exit session"
          >
            <X className="h-3.5 w-3.5" />
            Exit
          </button>
        </div>

        {/* Progress */}
        <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
          <div
            className="h-full bg-elec-yellow rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Flashcard */}
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-5 sm:p-6 space-y-5">
          <div className="text-center space-y-2">
            <h2 className="text-[22px] sm:text-[26px] font-semibold tracking-tight text-elec-yellow">
              {currentTerm.term}
            </h2>
            {currentTerm.difficulty && (
              <span
                className={cn(
                  'inline-flex items-center h-6 px-2 rounded-md border text-[10.5px] font-medium uppercase tracking-[0.14em]',
                  difficultyTone[currentTerm.difficulty] ?? difficultyTone.basic
                )}
              >
                {currentTerm.difficulty}
              </span>
            )}
          </div>

          {showAnswer ? (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-[14px] text-white text-center leading-relaxed">
                  {currentTerm.definition}
                </p>
              </div>

              {currentTerm.commonUsage && (
                <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1">
                  <Eyebrow className="text-elec-yellow/85">How it sounds on site</Eyebrow>
                  <p className="text-[13px] text-white italic">
                    "{currentTerm.commonUsage}"
                  </p>
                </div>
              )}

              {currentTerm.context && (
                <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                  <Eyebrow>Context</Eyebrow>
                  <p className="text-[13px] text-white/85">{currentTerm.context}</p>
                </div>
              )}

              {currentTerm.relatedTerms && currentTerm.relatedTerms.length > 0 && (
                <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <Eyebrow>Related terms</Eyebrow>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {currentTerm.relatedTerms.map((related, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center h-7 px-2 rounded-md border border-white/[0.08] bg-white/[0.02] text-[11px] text-white/85"
                      >
                        {related}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-[13px] text-white/55 uppercase tracking-[0.14em]">
                Tap below to reveal the answer
              </p>
            </div>
          )}

          <div className="flex gap-2 justify-center pt-2">
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="inline-flex items-center justify-center h-11 px-6 rounded-md bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation"
              >
                Show answer
              </button>
            ) : (
              <>
                <button
                  onClick={nextCard}
                  className="inline-flex items-center justify-center h-11 px-6 rounded-md bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation"
                >
                  {currentTermIndex < shuffledTerms.length - 1 ? 'Next card' : 'Finish'}
                </button>
                <button
                  onClick={reshuffleCards}
                  className="inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-md border border-white/[0.08] bg-white/[0.02] text-[13px] font-medium text-white/85 hover:bg-white/[0.04] active:scale-[0.98] transition-all touch-manipulation"
                >
                  <Shuffle className="h-3.5 w-3.5" />
                  Shuffle
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ─── Setup screen ─── */
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/site-jargon')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Flashcards"
          title="Flashcard study"
          description="Test your jargon knowledge across categories and difficulty levels. Pick a topic, hit start, work through the deck."
          tone="yellow"
        />
      </motion.div>

      {/* ── How it works ────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="How it works"
          title="Three-step flashcard loop"
          meta="Think · reveal · repeat"
        />
        <ol className="space-y-2">
          {[
            'You see a term — think about what it means',
            'Tap "Show answer" to reveal the definition, usage example, and context',
            'Work through all cards — shuffle any time to mix things up',
          ].map((step, i) => (
            <li
              key={step}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 flex items-start gap-3"
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[12px] font-mono font-semibold tabular-nums text-elec-yellow flex-shrink-0">
                {i + 1}
              </span>
              <p className="text-[13px] text-white/85 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </motion.section>

      {/* ── Filters ─────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Choose your terms"
          title="Filter by category and difficulty"
          meta={`${filteredTerms.length} terms match`}
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Eyebrow>Category</Eyebrow>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_8%)] border-white/[0.08]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {siteJargonCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Eyebrow>Difficulty</Eyebrow>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_8%)] border-white/[0.08]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All levels</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {(selectedCategory !== 'all' || selectedDifficulty !== 'all') && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="inline-flex items-center h-8 px-2.5 rounded-md text-[11px] font-medium text-white/55 hover:text-white/85 transition-colors touch-manipulation"
            >
              Clear filters
            </button>
          )}
        </div>
      </motion.section>

      {/* ── Start button ────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <button
          onClick={startFlashcards}
          disabled={filteredTerms.length === 0}
          className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-elec-yellow text-black text-[14px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation disabled:opacity-50"
        >
          <BookOpen className="h-4 w-4" />
          Start flashcards ({filteredTerms.length} terms)
        </button>
      </motion.div>

      {/* ── Session results ─────────────────────────────────────── */}
      {studiedCount > 0 && (
        <motion.div variants={itemVariants}>
          <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[13px] font-mono font-semibold tabular-nums text-elec-yellow flex-shrink-0">
                {studiedCount}
              </span>
              <div className="space-y-0.5">
                <Eyebrow className="text-elec-yellow/85">Session complete</Eyebrow>
                <p className="text-[13px] text-white/85 leading-relaxed">
                  {studiedCount} term{studiedCount !== 1 ? 's' : ''} studied. Great work — start again to keep revising.
                </p>
              </div>
            </div>
            <button
              onClick={startFlashcards}
              className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[13px] font-medium text-elec-yellow hover:bg-elec-yellow/[0.10] active:scale-[0.98] transition-all touch-manipulation"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Study again
            </button>
          </div>
        </motion.div>
      )}

      {/* ── Tip ─────────────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
          <div className="flex items-start gap-2">
            <GraduationCap className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              <span className="font-semibold text-elec-yellow">Tip:</span> Start
              with Basic if you're new. Once you can get them all right, step up
              to Intermediate and then Advanced.
            </p>
          </div>
        </div>
      </motion.div>
    </PageFrame>
  );
};

export default JargonStudyPage;
