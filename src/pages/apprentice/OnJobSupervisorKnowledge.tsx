import { useState, useMemo } from 'react';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
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
  CheckCircle,
  ExternalLink,
  X,
} from 'lucide-react';
import { useSupervisorProgress } from '@/components/apprentice/supervisor-knowledge/useSupervisorProgress';
import SectionDetailView from '@/components/apprentice/supervisor-knowledge/SectionDetailView';
import QuickConfidenceQuiz from '@/components/apprentice/supervisor-knowledge/QuickConfidenceQuiz';
import {
  sections,
  questions,
  allContacts,
} from '@/components/apprentice/supervisor-knowledge/supervisorKnowledgeData';

// ── Icon mapping (string → component) ──────────────────
const iconMap: Record<string, React.ElementType> = {
  AlertTriangle,
  HardHat,
  ShieldAlert,
  Users,
  Scale,
  TrendingUp,
};

// ── Colour mapping ──────────────────────────────────────
const colourMap: Record<
  string,
  { bg: string; border: string; text: string; iconBg: string; progressBg: string }
> = {
  red: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    iconBg: 'bg-red-500/20',
    progressBg: 'bg-red-500',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    iconBg: 'bg-blue-500/20',
    progressBg: 'bg-blue-500',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    iconBg: 'bg-amber-500/20',
    progressBg: 'bg-amber-500',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    iconBg: 'bg-purple-500/20',
    progressBg: 'bg-purple-500',
  },
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
    iconBg: 'bg-green-500/20',
    progressBg: 'bg-green-500',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    iconBg: 'bg-cyan-500/20',
    progressBg: 'bg-cyan-500',
  },
};

// ── Daily featured question ─────────────────────────────
function getDailyQuestion() {
  const dayIndex = Math.floor(Date.now() / 86400000) % questions.length;
  return questions[dayIndex];
}

// ── Component ───────────────────────────────────────────
const OnJobSupervisorKnowledge = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmergencySheet, setShowEmergencySheet] = useState(false);
  const [expandedSearchId, setExpandedSearchId] = useState<string | null>(null);
  const progress = useSupervisorProgress();

  const dailyQuestion = useMemo(() => getDailyQuestion(), []);
  const [dailyExpanded, setDailyExpanded] = useState(false);

  const overall = progress.getOverallProgress(questions.length);

  // Search filter
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

  // ── Section detail view ─────────────────────────────────
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

  // ── Quiz view ───────────────────────────────────────────
  if (showQuiz) {
    return <QuickConfidenceQuiz progress={progress} onClose={() => setShowQuiz(false)} />;
  }

  // ── Hub view ────────────────────────────────────────────
  return (
    <div className="bg-gradient-to-br from-background via-background/98 to-background/95 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 animate-fade-in pb-24 text-left">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 flex-shrink-0">
              <HelpCircle className="h-6 w-6 text-blue-400" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold tracking-tight text-white truncate">
                Ask a Supervisor
              </h1>
              <p className="text-sm text-white truncate">
                Expert guidance for every situation on site
              </p>
            </div>
          </div>
          <SmartBackButton className="flex-shrink-0" />
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
          <Input
            placeholder="Search questions, topics, advice..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setExpandedSearchId(null);
            }}
            className="h-11 pl-10 text-base touch-manipulation bg-white/5 border-white/10 focus:border-blue-500 focus:ring-blue-500 placeholder:text-white/50"
          />
          {searchQuery.length > 0 && (
            <button
              onClick={() => {
                setSearchQuery('');
                setExpandedSearchId(null);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded touch-manipulation"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          )}
        </div>

        {/* ── Search Results ─────────────────────────── */}
        {searchQuery.length >= 2 ? (
          <div className="space-y-3">
            <p className="text-sm text-white">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
            </p>

            {searchResults.length === 0 ? (
              <Card className="border border-white/10">
                <CardContent className="p-6 text-center">
                  <Search className="h-8 w-8 text-white mx-auto mb-2" />
                  <p className="text-sm text-white">No matches found. Try different keywords.</p>
                </CardContent>
              </Card>
            ) : (
              searchResults.map((q) => {
                const isExpanded = expandedSearchId === q.id;
                const sectionLabel = sections.find((s) => s.id === q.section)?.title || '';
                const sectionColour = sections.find((s) => s.id === q.section)?.colour || 'blue';
                const colours = colourMap[sectionColour];
                const isBookmarked = progress.isBookmarked(q.id);

                return (
                  <Card
                    key={q.id}
                    className={`border overflow-hidden transition-all ${
                      isExpanded ? `${colours.border} ${colours.bg}` : 'border-white/10 bg-white/5'
                    }`}
                  >
                    <button
                      onClick={() => {
                        setExpandedSearchId(isExpanded ? null : q.id);
                        if (!isExpanded) progress.markRead(q.id);
                      }}
                      className="w-full text-left p-4 touch-manipulation"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <span className={`text-xs font-medium ${colours.text}`}>
                            {sectionLabel}
                          </span>
                          <p className="text-sm font-medium text-white leading-snug mt-0.5">
                            {q.question}
                          </p>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 text-white flex-shrink-0 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 space-y-3 animate-fade-in">
                        <p className="text-sm text-white leading-relaxed">{q.answer}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1.5">
                            {q.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-white"
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
                            className="p-2 rounded-lg touch-manipulation active:scale-95"
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="h-4 w-4 text-elec-yellow" />
                            ) : (
                              <Bookmark className="h-4 w-4 text-white" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })
            )}
          </div>
        ) : (
          <>
            {/* ── Progress Strip ─────────────────────── */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              {/* Circular progress indicator */}
              <div className="relative w-10 h-10 flex-shrink-0">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-white/10"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${overall.percentage * 0.88} 88`}
                    strokeLinecap="round"
                    className="text-blue-400 transition-all duration-500"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                  {overall.percentage}%
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">
                  {overall.read}/{overall.total} questions explored
                </p>
                <p className="text-xs text-white">
                  {overall.percentage === 100
                    ? 'All explored — brilliant!'
                    : 'Tap a topic below to learn more'}
                </p>
              </div>
              {progress.quizResult && (
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-elec-yellow">
                    {progress.quizResult.score}/{progress.quizResult.total}
                  </p>
                  <p className="text-xs text-white">Last quiz</p>
                </div>
              )}
            </div>

            {/* ── Daily Featured Question ────────────── */}
            <Card
              className={`border overflow-hidden transition-all ${
                dailyExpanded
                  ? 'border-elec-yellow/30 bg-elec-yellow/5'
                  : 'border-elec-yellow/20 bg-gradient-to-r from-elec-yellow/10 via-elec-yellow/5 to-transparent'
              }`}
            >
              <button
                onClick={() => {
                  setDailyExpanded(!dailyExpanded);
                  if (!dailyExpanded) progress.markRead(dailyQuestion.id);
                }}
                className="w-full text-left p-4 touch-manipulation"
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-elec-yellow/20 flex-shrink-0 mt-0.5">
                    <Zap className="h-3.5 w-3.5 text-elec-yellow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-elec-yellow mb-0.5">
                      Question of the Day
                    </p>
                    <p className="text-sm font-medium text-white leading-snug">
                      {dailyQuestion.question}
                    </p>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-white flex-shrink-0 transition-transform ${
                      dailyExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {dailyExpanded && (
                <div className="px-4 pb-4 animate-fade-in">
                  <div className="ml-9 text-sm text-white leading-relaxed">
                    {dailyQuestion.answer}
                  </div>
                </div>
              )}
            </Card>

            {/* ── Bookmarks quick access ─────────────── */}
            {progress.bookmarks.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <BookmarkCheck className="h-4 w-4 text-elec-yellow" />
                  My Quick Reference ({progress.bookmarks.length})
                </h2>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                  {progress.bookmarks.slice(0, 5).map((bId) => {
                    const q = questions.find((q) => q.id === bId);
                    if (!q) return null;
                    const sColour = sections.find((s) => s.id === q.section)?.colour || 'blue';
                    return (
                      <button
                        key={bId}
                        onClick={() => {
                          setActiveSection(q.section);
                        }}
                        className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium text-left max-w-[200px] border transition-all touch-manipulation active:scale-[0.98] ${colourMap[sColour].bg} ${colourMap[sColour].border} text-white`}
                      >
                        <span className="line-clamp-2">{q.question}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Section Cards Grid ─────────────────── */}
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-white">Choose a Topic</h2>
              <div className="grid grid-cols-2 gap-3">
                {sections.map((section) => {
                  const Icon = iconMap[section.icon] || HelpCircle;
                  const colours = colourMap[section.colour] || colourMap.blue;
                  const sectionQIds = questions
                    .filter((q) => q.section === section.id)
                    .map((q) => q.id);
                  const sProgress = progress.getSectionProgress(sectionQIds);
                  const pct =
                    sProgress.total > 0 ? Math.round((sProgress.read / sProgress.total) * 100) : 0;

                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`p-4 rounded-xl border ${colours.border} ${colours.bg} transition-all touch-manipulation active:scale-[0.98] text-left`}
                    >
                      <div className={`p-2 rounded-lg ${colours.iconBg} inline-block mb-2`}>
                        <Icon className={`h-5 w-5 ${colours.text}`} />
                      </div>
                      <div className="text-sm font-semibold text-white leading-tight">
                        {section.title}
                      </div>
                      <div className="text-xs text-white mt-1 line-clamp-1">{section.subtitle}</div>

                      {/* Progress bar */}
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${colours.progressBg} transition-all duration-500`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-white">
                          {sProgress.read}/{sProgress.total}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Quick Confidence Quiz ───────────────── */}
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 border border-blue-500/20 flex items-center gap-4 touch-manipulation active:scale-[0.99] transition-all"
            >
              <div className="p-2.5 rounded-xl bg-blue-500/20">
                <Zap className="h-5 w-5 text-blue-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-white">Quick Confidence Quiz</p>
                <p className="text-xs text-white">Test your knowledge with 10 random questions</p>
              </div>
              {progress.quizResult && (
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-blue-400">
                    {progress.quizResult.score}/{progress.quizResult.total}
                  </p>
                  <p className="text-xs text-white">Best</p>
                </div>
              )}
            </button>

            {/* ── Tip banner ─────────────────────────── */}
            <Card className="border-blue-500/30 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 flex-shrink-0">
                    <HelpCircle className="h-4 w-4 text-blue-400" />
                  </div>
                  <p className="text-sm text-white">
                    Asking questions is a sign of professionalism, not weakness.{' '}
                    <span className="font-medium text-blue-300">
                      If you are unsure about safety or regulations, always ask.
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* ── Emergency FAB ──────────────────────────────── */}
      {!searchQuery && (
        <button
          onClick={() => setShowEmergencySheet(true)}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-red-500 shadow-lg shadow-red-500/25 touch-manipulation active:scale-95 transition-transform"
          aria-label="Emergency contacts"
        >
          <Phone className="h-5 w-5 text-white" />
        </button>
      )}

      {/* ── Emergency Contacts Sheet ───────────────────── */}
      <Sheet open={showEmergencySheet} onOpenChange={setShowEmergencySheet}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0 overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            <SheetHeader className="px-5 pt-5 pb-3 border-b border-white/10">
              <SheetTitle className="text-white text-lg font-bold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Emergency Contacts
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {emergencyContacts.map((contact) => (
                <Card key={contact.id} className="border border-red-500/20 bg-red-500/5">
                  <CardContent className="p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-white">{contact.name}</h3>
                    <p className="text-xs text-white">{contact.description}</p>
                    {contact.availability && (
                      <p className="text-xs text-white">{contact.availability}</p>
                    )}
                    <div className="flex gap-2 pt-1">
                      {contact.phone && (
                        <a
                          href={`tel:${contact.phone.replace(/\s/g, '')}`}
                          className="flex items-center gap-1.5 px-3 h-11 rounded-lg bg-red-500/15 border border-red-500/30 text-sm font-medium text-red-300 touch-manipulation active:scale-95"
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
                          className="flex items-center gap-1.5 px-3 h-11 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white touch-manipulation active:scale-95"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Website
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* 999 prominent */}
              <Card className="border border-red-500/40 bg-red-500/10">
                <CardContent className="p-4 text-center space-y-2">
                  <p className="text-sm font-bold text-red-400">Life-Threatening Emergency</p>
                  <a
                    href="tel:999"
                    className="inline-flex items-center gap-2 px-6 h-11 rounded-lg bg-red-500 text-white font-bold text-lg touch-manipulation active:scale-95"
                  >
                    <Phone className="h-5 w-5" />
                    Call 999
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default OnJobSupervisorKnowledge;
