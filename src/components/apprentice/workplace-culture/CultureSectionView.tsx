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
  Globe,
  MapPin,
  Building,
} from 'lucide-react';
import type { CultureProgress } from './useCultureProgress';
import type { Section } from './workplaceCultureData';
import {
  questions as allQuestions,
  scenarios as allScenarios,
  communicationScripts as allScripts,
  terminology as allTerminology,
  regionalInfo as allRegionalInfo,
  industryTypes as allIndustryTypes,
  professionalTips as allProfessionalTips,
} from './workplaceCultureData';

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

interface CultureSectionViewProps {
  section: Section;
  progress: CultureProgress;
  onBack: () => void;
}

const CultureSectionView = ({ section, progress, onBack }: CultureSectionViewProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const colours = colourMap[section.colour] || colourMap.blue;

  // ── Checked items for professional checklists ─────────
  const [checkedItems, setCheckedItems] = useState<Record<string, Set<number>>>(() => {
    try {
      const raw = localStorage.getItem('workplace-culture-checklists');
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      const result: Record<string, Set<number>> = {};
      for (const [key, val] of Object.entries(parsed)) {
        result[key] = new Set(val as number[]);
      }
      return result;
    } catch {
      return {};
    }
  });

  const toggleChecked = (tipId: string, index: number) => {
    setCheckedItems((prev) => {
      const next = { ...prev };
      const current = new Set(prev[tipId] || []);
      if (current.has(index)) {
        current.delete(index);
      } else {
        current.add(index);
      }
      next[tipId] = current;
      // Persist
      const serialisable: Record<string, number[]> = {};
      for (const [key, val] of Object.entries(next)) {
        serialisable[key] = [...val];
      }
      localStorage.setItem('workplace-culture-checklists', JSON.stringify(serialisable));
      return next;
    });
  };

  // ── Filter data by section ────────────────────────────
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
  const sectionTerms = useMemo(
    () => allTerminology.filter((t) => t.section === section.id),
    [section.id]
  );
  const sectionRegions = useMemo(
    () => allRegionalInfo.filter((r) => r.section === section.id),
    [section.id]
  );
  const sectionIndustries = useMemo(
    () => allIndustryTypes.filter((i) => i.section === section.id),
    [section.id]
  );
  const sectionTips = useMemo(
    () => allProfessionalTips.filter((t) => t.section === section.id),
    [section.id]
  );

  // Group terminology by category
  const termsByCategory = useMemo(() => {
    const map: Record<string, typeof sectionTerms> = {};
    sectionTerms.forEach((t) => {
      if (!map[t.category]) map[t.category] = [];
      map[t.category].push(t);
    });
    return map;
  }, [sectionTerms]);

  // Section progress
  const sectionProgress = progress.getSectionProgress(sectionQuestions.map((q) => q.id));

  const toggleExpand = (questionId: string) => {
    const isOpening = expandedId !== questionId;
    setExpandedId(isOpening ? questionId : null);
    if (isOpening) progress.markRead(questionId);
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
        {sectionQuestions.length > 0 && (
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
        )}

        {/* ── FAQ Questions ──────────────────────────── */}
        {sectionQuestions.length > 0 && (
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
        )}

        {/* ── Scenarios (right/wrong approach) ────────── */}
        {sectionScenarios.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className={`h-4 w-4 ${colours.text}`} />
              Real-World Scenarios
            </h2>

            {sectionScenarios.map((scenario) => {
              const isExpanded = expandedId === `scenario-${scenario.id}`;
              return (
                <Card
                  key={scenario.id}
                  className={`border overflow-hidden transition-all ${
                    isExpanded ? `${colours.border} ${colours.bg}` : 'border-white/10 bg-white/5'
                  }`}
                >
                  <button
                    onClick={() => {
                      const key = `scenario-${scenario.id}`;
                      setExpandedId(expandedId === key ? null : key);
                    }}
                    className="w-full text-left p-4 touch-manipulation"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white leading-snug">
                          {scenario.situation}
                        </p>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-white flex-shrink-0 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-2 animate-fade-in">
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <p className="text-xs font-medium text-green-400 mb-1">Better approach</p>
                        <p className="text-sm text-white leading-relaxed text-left">
                          {scenario.rightApproach}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <p className="text-xs font-medium text-red-400 mb-1">Avoid this</p>
                        <p className="text-sm text-white leading-relaxed text-left">
                          {scenario.wrongApproach}
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {/* ── Communication Scripts (poor/better/best) ── */}
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

        {/* ── Terminology Glossary ───────────────────── */}
        {Object.keys(termsByCategory).length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Info className={`h-4 w-4 ${colours.text}`} />
              Industry Terminology
            </h2>

            {Object.entries(termsByCategory).map(([category, terms]) => (
              <Card key={category} className="border border-white/10 overflow-hidden">
                <CardContent className="p-4 space-y-3 text-left">
                  <h3 className={`text-sm font-semibold ${colours.text}`}>{category}</h3>
                  <div className="space-y-2">
                    {terms.map((t) => (
                      <div key={t.id} className="pl-3 border-l-2 border-white/20">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-bold ${colours.bg} ${colours.text} border ${colours.border}`}
                          >
                            {t.term}
                          </span>
                          <span className="text-sm font-medium text-white">{t.meaning}</span>
                        </div>
                        <p className="text-xs text-white italic">&ldquo;{t.usage}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ── Regional Info Cards ────────────────────── */}
        {sectionRegions.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Globe className={`h-4 w-4 ${colours.text}`} />
              UK Regional Differences
            </h2>

            {sectionRegions.map((region) => (
              <Card key={region.id} className={`border ${colours.border} overflow-hidden`}>
                <CardContent className="p-4 space-y-3 text-left">
                  <div className="flex items-center gap-2">
                    <MapPin className={`h-4 w-4 ${colours.text}`} />
                    <h3 className="text-sm font-semibold text-white">{region.region}</h3>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-xs font-medium text-white mb-1.5">Characteristics</p>
                      <ul className="space-y-1">
                        {region.characteristics.map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-white">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${colours.progressBg} flex-shrink-0 mt-1`}
                            />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/20">
                      <p className="text-xs font-medium text-blue-400 mb-1.5">Common Phrases</p>
                      <div className="flex flex-wrap gap-1.5">
                        {region.commonPhrases.map((p, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-full text-xs bg-blue-500/10 text-white border border-blue-500/20"
                          >
                            &ldquo;{p}&rdquo;
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white">
                        <span className="font-medium">Hours:</span> {region.workingHours}
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white">
                        <span className="font-medium">Breaks:</span> {region.breakCulture}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-green-500/5 border border-green-500/20">
                      <p className="text-xs font-medium text-green-400 mb-1.5">Tips</p>
                      <ul className="space-y-1">
                        {region.keyTips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-white">
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ── Industry Types ─────────────────────────── */}
        {sectionIndustries.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Building className={`h-4 w-4 ${colours.text}`} />
              Industry Sectors
            </h2>

            {sectionIndustries.map((ind) => (
              <Card key={ind.id} className="border border-white/10 overflow-hidden">
                <CardContent className="p-4 space-y-2 text-left">
                  <h3 className={`text-sm font-semibold ${colours.text}`}>{ind.sector}</h3>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-xs font-medium text-white mb-0.5">Culture</p>
                      <p className="text-xs text-white">{ind.culture}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/20">
                      <p className="text-xs font-medium text-blue-400 mb-0.5">Communication</p>
                      <p className="text-xs text-white">{ind.communication}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20">
                      <p className="text-xs font-medium text-amber-400 mb-0.5">Challenges</p>
                      <p className="text-xs text-white">{ind.challenges}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ── Professional Checklists ────────────────── */}
        {sectionTips.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className={`h-4 w-4 ${colours.text}`} />
              Professional Expectations
            </h2>

            {sectionTips.map((tip) => {
              const checked = checkedItems[tip.id] || new Set<number>();
              return (
                <Card key={tip.id} className={`border ${colours.border} overflow-hidden`}>
                  <CardContent className="p-4 space-y-3 text-left">
                    <h3 className="text-sm font-semibold text-white">{tip.area}</h3>
                    <p className="text-xs text-white">{tip.description}</p>
                    <div className="space-y-2">
                      {tip.expectations.map((exp, idx) => {
                        const done = checked.has(idx);
                        return (
                          <button
                            key={idx}
                            onClick={() => toggleChecked(tip.id, idx)}
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
                              {exp}
                            </span>
                          </button>
                        );
                      })}
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

export default CultureSectionView;
