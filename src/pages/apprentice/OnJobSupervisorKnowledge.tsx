/**
 * OnJobSupervisorKnowledge — editorial "ask a supervisor" knowledge bank.
 *
 * Sections grid, daily question, bookmarks, confidence quiz, and an
 * emergency contacts FAB. Drops the red/blue/amber/purple/green/cyan
 * colourMap and gradient chrome for the editorial pattern.
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  ArrowLeft,
  HelpCircle,
  Search,
  AlertTriangle,
  HardHat,
  ShieldAlert,
  Users,
  Scale,
  TrendingUp,
  Phone,
  Zap,
  ChevronDown,
  BookmarkCheck,
  Bookmark,
  ExternalLink,
  Siren,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import { useSupervisorProgress } from '@/components/apprentice/supervisor-knowledge/useSupervisorProgress';
import SectionDetailView from '@/components/apprentice/supervisor-knowledge/SectionDetailView';
import QuickConfidenceQuiz from '@/components/apprentice/supervisor-knowledge/QuickConfidenceQuiz';
import {
  sections,
  questions,
  allContacts,
} from '@/components/apprentice/supervisor-knowledge/supervisorKnowledgeData';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  HardHat,
  ShieldAlert,
  Users,
  Scale,
  TrendingUp,
};

function getDailyQuestion() {
  const dayIndex = Math.floor(Date.now() / 86400000) % questions.length;
  return questions[dayIndex];
}

const OnJobSupervisorKnowledge = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmergencySheet, setShowEmergencySheet] = useState(false);
  const [expandedSearchId, setExpandedSearchId] = useState<string | null>(null);
  const progress = useSupervisorProgress();

  const dailyQuestion = useMemo(() => getDailyQuestion(), []);
  const [dailyExpanded, setDailyExpanded] = useState(false);

  const overall = progress.getOverallProgress(questions.length);

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const lower = searchQuery.toLowerCase();
    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(lower) ||
        q.answer.toLowerCase().includes(lower) ||
        q.tags.some((t) => t.toLowerCase().includes(lower))
    );
  }, [searchQuery]);

  const emergencyContacts = useMemo(
    () => allContacts.filter((c) => c.category === 'emergency'),
    []
  );

  if (activeSection) {
    const section = sections.find((s) => s.id === activeSection);
    if (section) {
      return (
        <SectionDetailView
          section={section}
          progress={progress}
          onBack={() => setActiveSection(null)}
        />
      );
    }
  }

  if (showQuiz) {
    return <QuickConfidenceQuiz progress={progress} onClose={() => setShowQuiz(false)} />;
  }

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/on-job-tools')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Ask a supervisor"
          title="Expert guidance for site"
          description="The questions you'd ask a senior sparky if they had time. Searchable knowledge bank covering safety, technical, and the awkward 'how do I…' moments."
          tone="yellow"
        />
      </motion.div>

      {/* ── Search bar ────────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            placeholder="Search questions, topics, advice…"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setExpandedSearchId(null);
            }}
            className="h-11 pl-10 pr-10 text-[13px] touch-manipulation bg-[hsl(0_0%_10%)] border border-white/[0.08] focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 placeholder:text-white/40"
          />
          {searchQuery.length > 0 && (
            <button
              onClick={() => {
                setSearchQuery('');
                setExpandedSearchId(null);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full active:bg-white/[0.06] touch-manipulation"
            >
              <X className="h-4 w-4 text-white/55" />
            </button>
          )}
        </div>
      </motion.div>

      {searchQuery.length >= 2 ? (
        /* ── Search results ─────────────────────────────────────── */
        <motion.div variants={itemVariants} className="space-y-3">
          <Eyebrow>
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
          </Eyebrow>
          {searchResults.length === 0 ? (
            <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-6 text-center space-y-2">
              <Search className="h-5 w-5 text-white/40 mx-auto" />
              <p className="text-[13px] text-white/55">
                No matches. Try different keywords.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {searchResults.map((q) => {
                const isExpanded = expandedSearchId === q.id;
                const sectionLabel =
                  sections.find((s) => s.id === q.section)?.title || '';
                const isBookmarked = progress.isBookmarked(q.id);
                return (
                  <li
                    key={q.id}
                    className={cn(
                      'rounded-xl border overflow-hidden transition-colors',
                      isExpanded
                        ? 'border-elec-yellow/25 bg-elec-yellow/[0.04]'
                        : 'border-white/[0.06] bg-[hsl(0_0%_10%)]'
                    )}
                  >
                    <button
                      onClick={() => {
                        setExpandedSearchId(isExpanded ? null : q.id);
                        if (!isExpanded) progress.markRead(q.id);
                      }}
                      className="w-full text-left p-4 touch-manipulation"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0 space-y-1">
                          <Eyebrow className={isExpanded ? 'text-elec-yellow/85' : undefined}>
                            {sectionLabel}
                          </Eyebrow>
                          <p className="text-[13.5px] font-medium text-white leading-snug">
                            {q.question}
                          </p>
                        </div>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 text-white/40 flex-shrink-0 transition-transform mt-0.5',
                            isExpanded && 'rotate-180'
                          )}
                        />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 space-y-3 animate-fade-in border-t border-white/[0.04] pt-3">
                        <p className="text-[13px] text-white/85 leading-relaxed">
                          {q.answer}
                        </p>
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex flex-wrap gap-1">
                            {q.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center h-6 px-2 rounded-md border border-white/[0.08] bg-white/[0.02] text-[10.5px] text-white/85"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              progress.toggleBookmark(q.id);
                            }}
                            className="h-9 w-9 flex items-center justify-center rounded-md active:bg-white/[0.06] touch-manipulation"
                            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="h-4 w-4 text-elec-yellow" />
                            ) : (
                              <Bookmark className="h-4 w-4 text-white/55" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </motion.div>
      ) : (
        <>
          {/* ── Progress strip ─────────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2.5">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <Eyebrow>Coverage</Eyebrow>
                <span className="text-[12px] font-mono tabular-nums text-white">
                  {overall.read} / {overall.total}
                  <span className="text-white/55 ml-1.5">· {overall.percentage}%</span>
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${overall.percentage}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="h-full bg-elec-yellow rounded-full"
                />
              </div>
              <p className="text-[11.5px] text-white/55 leading-snug">
                {overall.percentage === 100
                  ? 'All questions explored — brilliant.'
                  : 'Tap a topic below to dig in.'}
                {progress.quizResult && (
                  <>
                    {' '}· last quiz{' '}
                    <span className="font-mono tabular-nums text-elec-yellow">
                      {progress.quizResult.score}/{progress.quizResult.total}
                    </span>
                  </>
                )}
              </p>
            </div>
          </motion.div>

          {/* ── Daily featured question ────────────────────────── */}
          <motion.div variants={itemVariants}>
            <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] overflow-hidden">
              <button
                onClick={() => {
                  setDailyExpanded(!dailyExpanded);
                  if (!dailyExpanded) progress.markRead(dailyQuestion.id);
                }}
                className="w-full text-left p-4 sm:p-5 touch-manipulation"
              >
                <div className="flex items-start gap-3">
                  <Zap className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0 space-y-1">
                    <Eyebrow className="text-elec-yellow/85">Question of the day</Eyebrow>
                    <p className="text-[13.5px] font-medium text-white leading-snug">
                      {dailyQuestion.question}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-white/55 flex-shrink-0 transition-transform mt-0.5',
                      dailyExpanded && 'rotate-180'
                    )}
                  />
                </div>
              </button>
              {dailyExpanded && (
                <div className="px-4 sm:px-5 pb-4 border-t border-elec-yellow/15 pt-3 animate-fade-in">
                  <p className="text-[13px] text-white/85 leading-relaxed pl-7">
                    {dailyQuestion.answer}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Bookmarks ──────────────────────────────────────── */}
          {progress.bookmarks.length > 0 && (
            <motion.section variants={itemVariants} className="space-y-3">
              <SectionHeader
                eyebrow="My quick reference"
                title={`${progress.bookmarks.length} bookmark${progress.bookmarks.length === 1 ? '' : 's'}`}
                meta="Tap to jump back to the topic"
              />
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {progress.bookmarks.slice(0, 5).map((bId) => {
                  const q = questions.find((q) => q.id === bId);
                  if (!q) return null;
                  return (
                    <button
                      key={bId}
                      onClick={() => setActiveSection(q.section)}
                      className="flex-shrink-0 px-3 py-2.5 rounded-md text-[12px] font-medium text-left max-w-[220px] border border-elec-yellow/25 bg-elec-yellow/[0.06] text-white hover:bg-elec-yellow/[0.10] active:scale-[0.98] transition-all touch-manipulation"
                    >
                      <span className="line-clamp-2 leading-snug">{q.question}</span>
                    </button>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* ── Sections grid ──────────────────────────────────── */}
          <motion.section variants={itemVariants} className="space-y-3">
            <SectionHeader
              eyebrow="Topics"
              title="Choose a topic"
              meta={`${sections.length} sections, ${questions.length} questions`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {sections.map((section) => {
                const Icon = iconMap[section.icon] || HelpCircle;
                const sectionQIds = questions
                  .filter((q) => q.section === section.id)
                  .map((q) => q.id);
                const sProgress = progress.getSectionProgress(sectionQIds);
                const pct =
                  sProgress.total > 0
                    ? Math.round((sProgress.read / sProgress.total) * 100)
                    : 0;
                const complete = sProgress.read === sProgress.total && sProgress.total > 0;

                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className="p-4 sm:p-5 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] active:bg-white/[0.04] active:scale-[0.99] transition-all touch-manipulation text-left space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <Icon
                        className={cn(
                          'h-4 w-4 flex-shrink-0',
                          complete ? 'text-elec-yellow' : 'text-white/55'
                        )}
                      />
                      <span className="text-[10.5px] font-mono tabular-nums text-white/55 flex-shrink-0">
                        {sProgress.read}/{sProgress.total}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[14px] font-semibold text-white leading-snug">
                        {section.title}
                      </p>
                      <p className="text-[12px] text-white/55 leading-snug line-clamp-2">
                        {section.subtitle}
                      </p>
                    </div>
                    <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          complete ? 'bg-elec-yellow' : 'bg-white/55'
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.section>

          {/* ── Quiz CTA ───────────────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 flex items-center gap-3 active:bg-elec-yellow/[0.08] active:scale-[0.99] transition-all touch-manipulation text-left"
            >
              <Zap className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              <div className="flex-1 min-w-0 space-y-0.5">
                <Eyebrow className="text-elec-yellow/85">Quick confidence quiz</Eyebrow>
                <p className="text-[13px] text-white leading-snug">
                  Test your knowledge with 10 random questions
                </p>
              </div>
              {progress.quizResult && (
                <div className="text-right flex-shrink-0">
                  <p className="text-[13px] font-mono font-semibold tabular-nums text-elec-yellow">
                    {progress.quizResult.score}/{progress.quizResult.total}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-white/55">
                    Best
                  </p>
                </div>
              )}
            </button>
          </motion.div>

          {/* ── Footnote tip ───────────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
              <div className="flex items-start gap-2.5">
                <HelpCircle className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <p className="text-[13px] text-white/85 leading-relaxed">
                  Asking questions is a sign of professionalism, not weakness.{' '}
                  <span className="font-semibold text-elec-yellow">
                    If you're unsure about safety or regulations, always ask.
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* ── Emergency FAB (kept red — semantic) ───────────────── */}
      {!searchQuery && (
        <button
          onClick={() => setShowEmergencySheet(true)}
          className="fixed bottom-6 right-6 z-50 h-12 px-4 rounded-full bg-red-500 text-white text-[12.5px] font-semibold shadow-lg shadow-black/40 flex items-center gap-2 touch-manipulation active:scale-95 transition-transform"
          aria-label="Emergency contacts"
        >
          <Siren className="h-4 w-4" />
          Emergency
        </button>
      )}

      {/* ── Emergency contacts sheet ──────────────────────────── */}
      <Sheet open={showEmergencySheet} onOpenChange={setShowEmergencySheet}>
        <SheetContent
          side="bottom"
          className="h-[80vh] sm:h-[70vh] rounded-t-3xl p-0 overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.06]"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/15" />
            </div>
            <SheetHeader className="px-5 pb-3">
              <SheetTitle className="text-left">
                <div className="flex items-center gap-2">
                  <Siren className="h-4 w-4 text-red-300" />
                  <Eyebrow className="text-red-300">Emergency contacts</Eyebrow>
                </div>
                <h2 className="text-[20px] sm:text-[22px] font-semibold tracking-tight text-white mt-1">
                  If something goes wrong
                </h2>
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-2.5">
              {/* 999 prominent */}
              <Card className="border-red-500/40 bg-red-500/[0.06]">
                <CardContent className="p-4 sm:p-5 text-center space-y-2.5">
                  <Eyebrow className="text-red-300">Life-threatening emergency</Eyebrow>
                  <a
                    href="tel:999"
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-red-500 text-white text-[15px] font-semibold touch-manipulation active:scale-95 transition-all"
                  >
                    <Phone className="h-4 w-4" />
                    Call 999
                  </a>
                </CardContent>
              </Card>

              {emergencyContacts.map((contact) => (
                <Card
                  key={contact.id}
                  className="border-red-500/25 bg-red-500/[0.04]"
                >
                  <CardContent className="p-4 space-y-2">
                    <h3 className="text-[14px] font-semibold text-white leading-snug">
                      {contact.name}
                    </h3>
                    <p className="text-[12.5px] text-white/85 leading-relaxed">
                      {contact.description}
                    </p>
                    {contact.availability && (
                      <p className="text-[11px] text-white/55 font-mono">
                        {contact.availability}
                      </p>
                    )}
                    <div className="flex gap-2 pt-1 flex-wrap">
                      {contact.phone && (
                        <a
                          href={`tel:${contact.phone.replace(/\s/g, '')}`}
                          className="inline-flex items-center gap-1.5 h-10 px-3 rounded-md border border-red-500/30 bg-red-500/[0.06] text-[12.5px] font-medium text-red-300 touch-manipulation active:scale-95 transition-all"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          {contact.phone}
                        </a>
                      )}
                      {contact.website && (
                        <a
                          href={contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 h-10 px-3 rounded-md border border-white/[0.08] bg-white/[0.02] text-[12.5px] font-medium text-white/85 touch-manipulation active:scale-95 transition-all"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Website
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </PageFrame>
  );
};

export default OnJobSupervisorKnowledge;
