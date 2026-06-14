import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  Phone,
  ExternalLink,
} from 'lucide-react';
import type { SupervisorProgress } from './useSupervisorProgress';
import type { Section } from './supervisorKnowledgeData';
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

interface SectionDetailViewProps {
  section: Section;
  progress: SupervisorProgress;
  onBack: () => void;
}

const eyebrowClass = 'text-[10px] font-medium uppercase tracking-[0.18em] text-white/55';
const sectionCardClass =
  'rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2';

const SectionDetailView = ({ section, progress, onBack }: SectionDetailViewProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, number | null>>({});
  const [showScenarioFeedback, setShowScenarioFeedback] = useState<Record<string, boolean>>({});

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

  const sectionContacts = useMemo(() => {
    if (section.id === 'emergency') return allContacts.filter((c) => c.category === 'emergency');
    if (section.id === 'your-rights') return allContacts.filter((c) => c.category === 'support');
    if (section.id === 'building-career')
      return allContacts.filter((c) => c.category === 'training' || c.category === 'professional');
    return [];
  }, [section.id]);

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
    <div className="bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 animate-fade-in text-left">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] touch-manipulation active:scale-95"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>
          <div className="flex-1 min-w-0 space-y-1">
            <span className={eyebrowClass}>Section</span>
            <h1 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight truncate">
              {section.title}
            </h1>
            <p className="text-[14px] text-white/70 leading-relaxed">{section.subtitle}</p>
          </div>
        </div>

        {/* Progress strip */}
        {sectionQuestions.length > 0 && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className={eyebrowClass}>Progress</span>
              <span className="text-[12px] text-white/85 font-mono">
                {sectionProgress.read}/{sectionProgress.total} ·{' '}
                {sectionProgress.total > 0
                  ? Math.round((sectionProgress.read / sectionProgress.total) * 100)
                  : 0}
                %
              </span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-elec-yellow transition-all duration-500"
                style={{
                  width: `${sectionProgress.total > 0 ? (sectionProgress.read / sectionProgress.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* FAQ Questions */}
        {sectionQuestions.length > 0 && (
          <div className="space-y-2">
            <span className={eyebrowClass}>Common questions</span>

            {sectionQuestions.map((q) => {
              const isExpanded = expandedId === q.id;
              const wasRead = progress.isRead(q.id);
              const isBookmarked = progress.isBookmarked(q.id);

              return (
                <div
                  key={q.id}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpand(q.id)}
                    className="w-full text-left p-4 touch-manipulation"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-white leading-snug">
                          {q.question}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {wasRead && !isExpanded && (
                          <CheckCircle className="h-3.5 w-3.5 text-elec-yellow" />
                        )}
                        <ChevronDown
                          className={`h-4 w-4 text-white/55 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-3 animate-fade-in text-left">
                      <p className="text-[14px] text-white/85 leading-relaxed">{q.answer}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {q.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
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
                          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this'}
                          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg touch-manipulation active:scale-95"
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
                </div>
              );
            })}
          </div>
        )}

        {/* Scenarios (MCQ) */}
        {sectionScenarios.length > 0 && (
          <div className="space-y-3">
            <span className={eyebrowClass}>What would you do?</span>

            {sectionScenarios.map((scenario) => {
              const selectedIdx = scenarioAnswers[scenario.id] ?? null;
              const hasSubmitted = showScenarioFeedback[scenario.id] ?? false;

              return (
                <div key={scenario.id} className={sectionCardClass}>
                  <h3 className="text-[16px] font-medium text-white">{scenario.title}</h3>
                  <p className="text-[14px] text-white/85 leading-relaxed">{scenario.situation}</p>

                  <div className="space-y-2 pt-2">
                    {scenario.options.map((opt, idx) => {
                      const isSelected = selectedIdx === idx;
                      let optionStyle = 'bg-white/[0.02] border-white/[0.06] text-white/85';
                      if (hasSubmitted && isSelected && opt.isCorrect) {
                        optionStyle = 'bg-elec-yellow/[0.04] border-elec-yellow/30 text-white';
                      } else if (hasSubmitted && isSelected && !opt.isCorrect) {
                        optionStyle = 'bg-red-500/[0.04] border-red-500/30 text-white';
                      } else if (hasSubmitted && opt.isCorrect) {
                        optionStyle = 'bg-elec-yellow/[0.04] border-elec-yellow/20 text-white';
                      } else if (isSelected) {
                        optionStyle = 'bg-elec-yellow/[0.04] border-elec-yellow/40 text-white';
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => selectScenarioAnswer(scenario.id, idx)}
                          disabled={hasSubmitted}
                          className={`w-full text-left p-3 rounded-lg border text-[14px] transition-all touch-manipulation active:scale-[0.99] ${optionStyle}`}
                        >
                          <span className="font-medium">{String.fromCharCode(65 + idx)}.</span>{' '}
                          {opt.text}
                          {hasSubmitted && isSelected && (
                            <p className="mt-1.5 text-[12px] text-white/70 leading-relaxed">
                              {opt.feedback}
                            </p>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedIdx !== null && !hasSubmitted && (
                    <button
                      onClick={() => submitScenarioAnswer(scenario.id)}
                      className="w-full h-11 rounded-lg bg-elec-yellow text-black font-semibold text-[14px] touch-manipulation active:scale-[0.98] transition-all"
                    >
                      Submit answer
                    </button>
                  )}

                  {hasSubmitted && (
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                      <p className="text-[14px] text-white/85 leading-relaxed">
                        {scenario.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Communication Scripts */}
        {sectionScripts.length > 0 && (
          <div className="space-y-3">
            <span className={eyebrowClass}>How to say it</span>

            {sectionScripts.map((script) => (
              <div key={script.id} className={sectionCardClass}>
                <h3 className="text-[16px] font-medium text-white">{script.situation}</h3>
                <div className="space-y-2 pt-1">
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                    <span className={eyebrowClass}>Avoid</span>
                    <p className="text-[14px] text-white/85 italic leading-relaxed">
                      &ldquo;{script.poor}&rdquo;
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                    <span className={eyebrowClass}>Better</span>
                    <p className="text-[14px] text-white/85 italic leading-relaxed">
                      &ldquo;{script.better}&rdquo;
                    </p>
                  </div>
                  <div className="rounded-lg border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                      Best
                    </span>
                    <p className="text-[14px] text-white/85 italic leading-relaxed">
                      &ldquo;{script.best}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Difficult Conversations */}
        {sectionConversations.length > 0 && (
          <div className="space-y-3">
            <span className={eyebrowClass}>Difficult conversations</span>

            {sectionConversations.map((convo) => (
              <div key={convo.id} className={sectionCardClass}>
                <h3 className="text-[16px] font-medium text-white">{convo.scenario}</h3>
                <p className="text-[14px] text-white/85 leading-relaxed">
                  <span className="text-white/55">Challenge:</span> {convo.challenge}
                </p>
                <p className="text-[14px] text-white/85 leading-relaxed">
                  <span className="text-white/55">Approach:</span> {convo.approach}
                </p>

                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                  <span className={eyebrowClass}>Example script</span>
                  <p className="text-[14px] text-white/85 italic leading-relaxed">
                    &ldquo;{convo.script}&rdquo;
                  </p>
                </div>

                <div className="space-y-2">
                  <span className={eyebrowClass}>Follow-up steps</span>
                  <ul className="space-y-1.5">
                    {convo.followUp.map((step, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                      >
                        <CheckCircle className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0 mt-1" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Site Knowledge Topics */}
        {sectionTopics.length > 0 && (
          <div className="space-y-3">
            <span className={eyebrowClass}>Site knowledge</span>

            {sectionTopics.map((topic) => (
              <div key={topic.id} className={sectionCardClass}>
                <h3 className="text-[16px] font-medium text-white">{topic.title}</h3>
                <ul className="space-y-1.5">
                  {topic.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Site Scenarios */}
        {sectionSiteScenarios.length > 0 && (
          <div className="space-y-3">
            <span className={eyebrowClass}>Quick guidance</span>

            {sectionSiteScenarios.map((ss) => {
              const isUrgent = ss.urgency === 'high';
              const cardClass = isUrgent
                ? 'rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2'
                : sectionCardClass;
              return (
                <div key={ss.id} className={cardClass}>
                  {isUrgent && (
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
                      Urgent
                    </span>
                  )}
                  <p className="text-[14px] font-medium text-white leading-relaxed">
                    {ss.scenario}
                  </p>
                  <p className="text-[14px] text-white/85 leading-relaxed">{ss.guidance}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Site Contacts */}
        {sectionSiteContacts.length > 0 && (
          <div className="space-y-3">
            <span className={eyebrowClass}>Who to speak to</span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sectionSiteContacts.map((contact) => (
                <div key={contact.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                  <h3 className="text-[14px] font-medium text-white">{contact.role}</h3>
                  <p className="text-[12px] text-white/55">{contact.when}</p>
                  <p className="text-[12px] text-white/85">{contact.approach}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Contacts */}
        {sectionContacts.length > 0 && (
          <div className="space-y-3">
            <span className={eyebrowClass}>Key contacts</span>

            {sectionContacts.map((contact) => (
              <div key={contact.id} className={sectionCardClass}>
                <h3 className="text-[16px] font-medium text-white">{contact.name}</h3>
                <p className="text-[14px] text-white/85 leading-relaxed">{contact.description}</p>
                {contact.availability && (
                  <p className="text-[12px] text-white/55">{contact.availability}</p>
                )}
                <div className="flex gap-2 pt-1 flex-wrap">
                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 h-11 rounded-lg bg-elec-yellow/[0.04] border border-elec-yellow/20 text-[14px] font-medium text-elec-yellow touch-manipulation active:scale-95"
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
                      className="inline-flex items-center gap-1.5 px-3 h-11 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[14px] font-medium text-white touch-manipulation active:scale-95"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Relationship Building Activities */}
        {sectionActivities.length > 0 && (
          <div className="space-y-3">
            <span className={eyebrowClass}>Practice activities</span>

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

              return (
                <div key={activity.id} className={sectionCardClass}>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-[16px] font-medium text-white">{activity.title}</h3>
                    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] capitalize">
                      {activity.category}
                    </span>
                  </div>
                  <p className="text-[14px] text-white/85 leading-relaxed">{activity.description}</p>

                  <div className="flex items-center gap-3 text-[12px] text-white/55">
                    <span>{activity.timeRequired}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="capitalize">{activity.difficulty}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className={eyebrowClass}>Steps</span>
                      <span className="text-[12px] text-white/55 font-mono">
                        {stepsComplete}/{totalSteps}
                      </span>
                    </div>
                    {activity.steps.map((step, idx) => {
                      const done = activitySteps.has(idx);
                      return (
                        <button
                          key={idx}
                          onClick={() => toggleStep(idx)}
                          className="w-full flex items-start gap-3 text-left touch-manipulation p-2 rounded-lg hover:bg-white/[0.04] transition-colors"
                        >
                          <div
                            className={`w-5 h-5 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                              done
                                ? 'bg-elec-yellow border-elec-yellow'
                                : 'border-white/30 bg-transparent'
                            }`}
                          >
                            {done && <CheckCircle className="h-3 w-3 text-black" />}
                          </div>
                          <span
                            className={`text-[14px] text-left leading-relaxed ${
                              done ? 'text-white/55 line-through' : 'text-white/85'
                            }`}
                          >
                            {step}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-2">
                    <span className={eyebrowClass}>Benefits</span>
                    <ul className="space-y-1">
                      {activity.benefits.map((b, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className={eyebrowClass}>Tips</span>
                    <ul className="space-y-1">
                      {activity.tips.map((t, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                        >
                          <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionDetailView;
