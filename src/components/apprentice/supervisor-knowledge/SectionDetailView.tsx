import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  ChevronDown,
  AlertTriangle,
  Info,
  HelpCircle,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  MessageSquare,
  Zap,
  Phone,
  ExternalLink,
} from 'lucide-react';
import type { SupervisorProgress } from './useSupervisorProgress';
import type {
  Section,
  Question,
  Scenario,
  CommunicationScript,
  DifficultConversation,
  SiteKnowledgeTopic,
  SiteScenario,
  SiteContact,
  RelationshipActivity,
} from './supervisorKnowledgeData';
import {
  questions as allQuestions,
  scenarios as allScenarios,
  communicationScripts as allScripts,
  difficultConversations as allConversations,
  siteKnowledgeTopics as allTopics,
  siteScenarios as allSiteScenarios,
  siteContacts as allSiteContacts,
  relationshipActivities as allActivities,
  allContacts,
} from './supervisorKnowledgeData';

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

const priorityIcons: Record<string, React.ElementType> = {
  critical: AlertTriangle,
  important: Info,
  helpful: HelpCircle,
};

const priorityColours: Record<string, string> = {
  critical: 'bg-red-500/15 text-red-400',
  important: 'bg-amber-500/15 text-amber-400',
  helpful: 'bg-blue-500/15 text-blue-400',
};

// ── Props ───────────────────────────────────────────────
interface SectionDetailViewProps {
  section: Section;
  progress: SupervisorProgress;
  onBack: () => void;
}

// ── Component ───────────────────────────────────────────
const SectionDetailView = ({ section, progress, onBack }: SectionDetailViewProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, number | null>>({});
  const [showScenarioFeedback, setShowScenarioFeedback] = useState<Record<string, boolean>>({});

  const colours = colourMap[section.colour] || colourMap.blue;

  // Filter data by section
  const sectionQuestions = useMemo(
    () => allQuestions.filter((q) => q.section === section.id),
    [section.id]
  );
  const sectionScenarios = useMemo(
    () => allScenarios.filter((s) => s.section === section.id),
    [section.id]
  );
  const sectionScripts = useMemo(
    () => allScripts.filter((s) => s.section === section.id),
    [section.id]
  );
  const sectionConversations = useMemo(
    () => allConversations.filter((c) => c.section === section.id),
    [section.id]
  );
  const sectionTopics = useMemo(
    () => allTopics.filter((t) => t.section === section.id),
    [section.id]
  );
  const sectionSiteScenarios = useMemo(
    () => allSiteScenarios.filter((s) => s.section === section.id),
    [section.id]
  );
  const sectionSiteContacts = useMemo(
    () => allSiteContacts.filter((c) => c.section === section.id),
    [section.id]
  );
  const sectionActivities = useMemo(
    () => allActivities.filter((a) => a.section === section.id),
    [section.id]
  );
  const [completedSteps, setCompletedSteps] = useState<Record<string, Set<number>>>({});

  // Show emergency/professional contacts in the emergency section
  const sectionContacts = useMemo(() => {
    if (section.id === 'emergency') return allContacts.filter((c) => c.category === 'emergency');
    if (section.id === 'your-rights') return allContacts.filter((c) => c.category === 'support');
    if (section.id === 'building-career')
      return allContacts.filter((c) => c.category === 'training' || c.category === 'professional');
    return [];
  }, [section.id]);

  // Section progress
  const sectionProgress = progress.getSectionProgress(sectionQuestions.map((q) => q.id));

  const toggleExpand = (questionId: string) => {
    const isOpening = expandedId !== questionId;
    setExpandedId(isOpening ? questionId : null);
    if (isOpening) progress.markRead(questionId);
  };

  const selectScenarioAnswer = (scenarioId: string, optionIndex: number) => {
    if (showScenarioFeedback[scenarioId]) return;
    setScenarioAnswers((prev) => ({ ...prev, [scenarioId]: optionIndex }));
  };

  const submitScenarioAnswer = (scenarioId: string) => {
    setShowScenarioFeedback((prev) => ({ ...prev, [scenarioId]: true }));
  };

  return (
    <div className="bg-gradient-to-br from-background via-background/98 to-background/95 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 animate-fade-in text-left">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className={`p-2.5 rounded-xl ${colours.iconBg} ${colours.border} border touch-manipulation active:scale-95`}
          >
            <ArrowLeft className={`h-5 w-5 ${colours.text}`} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-white truncate">{section.title}</h1>
            <p className="text-sm text-white truncate">{section.subtitle}</p>
          </div>
        </div>

        {/* Progress strip */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
          <span className="text-sm text-white font-medium">
            {sectionProgress.read}/{sectionProgress.total} explored
          </span>
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${colours.progressBg} transition-all duration-500`}
              style={{
                width: `${sectionProgress.total > 0 ? (sectionProgress.read / sectionProgress.total) * 100 : 0}%`,
              }}
            />
          </div>
          <span className="text-sm text-white font-medium">
            {sectionProgress.total > 0
              ? Math.round((sectionProgress.read / sectionProgress.total) * 100)
              : 0}
            %
          </span>
        </div>

        {/* ── FAQ Questions ──────────────────────────── */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className={`h-4 w-4 ${colours.text}`} />
            Common Questions
          </h2>

          {sectionQuestions.map((q) => {
            const isExpanded = expandedId === q.id;
            const wasRead = progress.isRead(q.id);
            const isBookmarked = progress.isBookmarked(q.id);
            const PriorityIcon = priorityIcons[q.priority] || HelpCircle;

            return (
              <Card
                key={q.id}
                className={`border transition-all overflow-hidden ${
                  isExpanded ? `${colours.border} ${colours.bg}` : 'border-white/10 bg-white/5'
                }`}
              >
                <button
                  onClick={() => toggleExpand(q.id)}
                  className="w-full text-left p-4 touch-manipulation"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-1.5 rounded-lg flex-shrink-0 mt-0.5 ${priorityColours[q.priority]}`}
                    >
                      <PriorityIcon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white leading-snug">{q.question}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {wasRead && !isExpanded && (
                        <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                      )}
                      <ChevronDown
                        className={`h-4 w-4 text-white transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3 animate-fade-in text-left">
                    <div className="ml-9 text-sm text-white leading-relaxed text-left">
                      {q.answer}
                    </div>

                    <div className="ml-9 flex items-center justify-between">
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
          })}
        </div>

        {/* ── Scenarios (MCQ) ────────────────────────── */}
        {sectionScenarios.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className={`h-4 w-4 ${colours.text}`} />
              What Would You Do?
            </h2>

            {sectionScenarios.map((scenario) => {
              const selectedIdx = scenarioAnswers[scenario.id] ?? null;
              const hasSubmitted = showScenarioFeedback[scenario.id] ?? false;

              return (
                <Card key={scenario.id} className={`border ${colours.border} overflow-hidden`}>
                  <CardContent className="p-4 space-y-3 text-left">
                    <h3 className="text-sm font-semibold text-white text-left">{scenario.title}</h3>
                    <p className="text-sm text-white leading-relaxed text-left">
                      {scenario.situation}
                    </p>

                    <div className="space-y-2">
                      {scenario.options.map((opt, idx) => {
                        const isSelected = selectedIdx === idx;
                        let optionStyle = 'bg-white/5 border-white/10 text-white';
                        if (hasSubmitted && isSelected && opt.isCorrect) {
                          optionStyle = 'bg-green-500/15 border-green-500/30 text-green-300';
                        } else if (hasSubmitted && isSelected && !opt.isCorrect) {
                          optionStyle = 'bg-red-500/15 border-red-500/30 text-red-300';
                        } else if (hasSubmitted && opt.isCorrect) {
                          optionStyle = 'bg-green-500/10 border-green-500/20 text-green-300';
                        } else if (isSelected) {
                          optionStyle = `${colours.bg} ${colours.border} ${colours.text}`;
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => selectScenarioAnswer(scenario.id, idx)}
                            disabled={hasSubmitted}
                            className={`w-full text-left p-3 rounded-lg border text-sm transition-all touch-manipulation active:scale-[0.99] ${optionStyle}`}
                          >
                            <span className="font-medium">{String.fromCharCode(65 + idx)}.</span>{' '}
                            {opt.text}
                            {hasSubmitted && isSelected && (
                              <p className="mt-1.5 text-xs leading-relaxed">{opt.feedback}</p>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {selectedIdx !== null && !hasSubmitted && (
                      <button
                        onClick={() => submitScenarioAnswer(scenario.id)}
                        className={`w-full h-11 rounded-lg font-semibold text-sm ${colours.bg} ${colours.border} border ${colours.text} touch-manipulation active:scale-[0.98] transition-all`}
                      >
                        Submit Answer
                      </button>
                    )}

                    {hasSubmitted && (
                      <div className={`p-3 rounded-lg ${colours.bg} ${colours.border} border`}>
                        <p className="text-sm text-white leading-relaxed">{scenario.explanation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* ── Communication Scripts ──────────────────── */}
        {sectionScripts.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className={`h-4 w-4 ${colours.text}`} />
              How to Say It
            </h2>

            {sectionScripts.map((script) => (
              <Card key={script.id} className="border border-white/10 overflow-hidden">
                <CardContent className="p-4 space-y-3 text-left">
                  <h3 className="text-sm font-semibold text-white text-left">{script.situation}</h3>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
                      <p className="text-xs font-medium text-red-400 mb-0.5">Avoid</p>
                      <p className="text-sm text-white italic">&ldquo;{script.poor}&rdquo;</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <p className="text-xs font-medium text-amber-400 mb-0.5">Better</p>
                      <p className="text-sm text-white italic">&ldquo;{script.better}&rdquo;</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-xs font-medium text-green-400 mb-0.5">Best</p>
                      <p className="text-sm text-white italic">&ldquo;{script.best}&rdquo;</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ── Difficult Conversations ────────────────── */}
        {sectionConversations.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className={`h-4 w-4 ${colours.text}`} />
              Difficult Conversations
            </h2>

            {sectionConversations.map((convo) => (
              <Card key={convo.id} className="border border-white/10 overflow-hidden">
                <CardContent className="p-4 space-y-3 text-left">
                  <h3 className="text-sm font-semibold text-white text-left">{convo.scenario}</h3>
                  <p className="text-xs text-white">Challenge: {convo.challenge}</p>
                  <p className="text-xs text-white">Approach: {convo.approach}</p>

                  <div className={`p-3 rounded-lg ${colours.bg} ${colours.border} border`}>
                    <p className="text-xs font-medium text-white mb-1">Example script:</p>
                    <p className="text-sm text-white italic leading-relaxed">
                      &ldquo;{convo.script}&rdquo;
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-white mb-1.5">Follow-up steps:</p>
                    <ul className="space-y-1">
                      {convo.followUp.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-white">
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ── Site Knowledge Topics ──────────────────── */}
        {sectionTopics.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Info className={`h-4 w-4 ${colours.text}`} />
              Site Knowledge
            </h2>

            {sectionTopics.map((topic) => (
              <Card key={topic.id} className="border border-white/10 overflow-hidden">
                <CardContent className="p-4 space-y-2 text-left">
                  <h3 className="text-sm font-semibold text-white text-left">{topic.title}</h3>
                  <ul className="space-y-1.5">
                    {topic.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${colours.progressBg} flex-shrink-0 mt-1.5`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ── Site Scenarios ─────────────────────────── */}
        {sectionSiteScenarios.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className={`h-4 w-4 ${colours.text}`} />
              Quick Guidance
            </h2>

            {sectionSiteScenarios.map((ss) => (
              <Card
                key={ss.id}
                className={`border overflow-hidden ${
                  ss.urgency === 'high'
                    ? 'border-red-500/30 bg-red-500/5'
                    : ss.urgency === 'medium'
                      ? 'border-amber-500/30 bg-amber-500/5'
                      : 'border-white/10 bg-white/5'
                }`}
              >
                <CardContent className="p-4 space-y-2 text-left">
                  <div className="flex items-start gap-2">
                    {ss.urgency === 'high' && (
                      <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-400">
                        URGENT
                      </span>
                    )}
                    <p className="text-sm font-medium text-white">{ss.scenario}</p>
                  </div>
                  <p className="text-sm text-white leading-relaxed">{ss.guidance}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ── Site Contacts (who to speak to) ────────── */}
        {sectionSiteContacts.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className={`h-4 w-4 ${colours.text}`} />
              Who to Speak To
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sectionSiteContacts.map((contact) => (
                <Card key={contact.id} className="border border-white/10">
                  <CardContent className="p-3 space-y-1 text-left">
                    <h3 className="text-sm font-semibold text-white text-left">{contact.role}</h3>
                    <p className="text-xs text-white">{contact.when}</p>
                    <p className={`text-xs ${colours.text} font-medium`}>{contact.approach}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ── Key Contacts ───────────────────────────── */}
        {sectionContacts.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Phone className={`h-4 w-4 ${colours.text}`} />
              Key Contacts
            </h2>

            {sectionContacts.map((contact) => (
              <Card key={contact.id} className="border border-white/10">
                <CardContent className="p-4 space-y-2 text-left">
                  <h3 className="text-sm font-semibold text-white text-left">{contact.name}</h3>
                  <p className="text-xs text-white">{contact.description}</p>
                  {contact.availability && (
                    <p className="text-xs text-white">{contact.availability}</p>
                  )}
                  <div className="flex gap-2 pt-1">
                    {contact.phone && (
                      <a
                        href={`tel:${contact.phone.replace(/\s/g, '')}`}
                        className={`flex items-center gap-1.5 px-3 h-11 rounded-lg ${colours.bg} ${colours.border} border text-sm font-medium ${colours.text} touch-manipulation active:scale-95`}
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
          </div>
        )}

        {/* ── Relationship Building Activities ────────── */}
        {sectionActivities.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className={`h-4 w-4 ${colours.text}`} />
              Practice Activities
            </h2>

            {sectionActivities.map((activity) => {
              const activitySteps = completedSteps[activity.id] || new Set<number>();
              const stepsComplete = activitySteps.size;
              const totalSteps = activity.steps.length;

              const toggleStep = (stepIdx: number) => {
                setCompletedSteps((prev) => {
                  const current = new Set(prev[activity.id] || []);
                  if (current.has(stepIdx)) {
                    current.delete(stepIdx);
                  } else {
                    current.add(stepIdx);
                  }
                  return { ...prev, [activity.id]: current };
                });
              };

              const categoryBadge =
                activity.category === 'daily'
                  ? 'bg-green-500/15 text-green-400'
                  : activity.category === 'weekly'
                    ? 'bg-blue-500/15 text-blue-400'
                    : 'bg-purple-500/15 text-purple-400';

              return (
                <Card key={activity.id} className={`border ${colours.border} overflow-hidden`}>
                  <CardContent className="p-4 space-y-3 text-left">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-white text-left">
                        {activity.title}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${categoryBadge}`}
                      >
                        {activity.category}
                      </span>
                    </div>
                    <p className="text-sm text-white text-left">{activity.description}</p>

                    <div className="flex items-center gap-3 text-xs text-white">
                      <span>{activity.timeRequired}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="capitalize">{activity.difficulty}</span>
                    </div>

                    {/* Steps with checkboxes */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-white">
                        Steps ({stepsComplete}/{totalSteps}):
                      </p>
                      {activity.steps.map((step, idx) => {
                        const done = activitySteps.has(idx);
                        return (
                          <button
                            key={idx}
                            onClick={() => toggleStep(idx)}
                            className="w-full flex items-start gap-3 text-left touch-manipulation p-2 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <div
                              className={`w-5 h-5 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                                done
                                  ? `${colours.progressBg} border-transparent`
                                  : 'border-white/30 bg-transparent'
                              }`}
                            >
                              {done && <CheckCircle className="h-3 w-3 text-white" />}
                            </div>
                            <span
                              className={`text-sm text-left ${done ? 'text-white line-through' : 'text-white'}`}
                            >
                              {step}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Benefits */}
                    <div>
                      <p className="text-xs font-medium text-white mb-1.5">Benefits:</p>
                      <ul className="space-y-1">
                        {activity.benefits.map((b, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-white text-left"
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${colours.progressBg} flex-shrink-0 mt-1`}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tips */}
                    <div>
                      <p className="text-xs font-medium text-white mb-1.5">Tips:</p>
                      <ul className="space-y-1">
                        {activity.tips.map((t, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-white text-left"
                          >
                            <Zap className="h-3 w-3 text-elec-yellow flex-shrink-0 mt-0.5" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionDetailView;
