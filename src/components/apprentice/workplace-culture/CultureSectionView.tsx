import { useState, useMemo } from 'react';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import {
  ArrowLeft,
  ChevronDown,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
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

interface CultureSectionViewProps {
  section: Section;
  progress: CultureProgress;
  onBack: () => void;
}

const eyebrowClass = 'text-[10px] font-medium uppercase tracking-[0.18em] text-white/55';
const sectionCardClass =
  'rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2';

const CultureSectionView = ({ section, progress, onBack }: CultureSectionViewProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [checkedItems, setCheckedItems] = useState<Record<string, Set<number>>>(() => {
    const parsed = storageGetJSONSync<Record<string, number[]>>('workplace-culture-checklists', {});
    const result: Record<string, Set<number>> = {};
    for (const [key, val] of Object.entries(parsed)) {
      result[key] = new Set(val);
    }
    return result;
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
      const serialisable: Record<string, number[]> = {};
      for (const [key, val] of Object.entries(next)) {
        serialisable[key] = [...val];
      }
      storageSetJSONSync('workplace-culture-checklists', serialisable);
      return next;
    });
  };

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

  const termsByCategory = useMemo(() => {
    const map: Record<string, typeof sectionTerms> = {};
    sectionTerms.forEach((t) => {
      if (!map[t.category]) map[t.category] = [];
      map[t.category].push(t);
    });
    return map;
  }, [sectionTerms]);

  const sectionProgress = progress.getSectionProgress(sectionQuestions.map((q) => q.id));

  const toggleExpand = (questionId: string) => {
    const isOpening = expandedId !== questionId;
    setExpandedId(isOpening ? questionId : null);
    if (isOpening) progress.markRead(questionId);
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
                          className="p-2 rounded-lg touch-manipulation active:scale-95"
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

        {/* Scenarios */}
        {sectionScenarios.length > 0 && (
          <div className="space-y-3">
            <span className={eyebrowClass}>Real-world scenarios</span>

            {sectionScenarios.map((scenario) => {
              const isExpanded = expandedId === `scenario-${scenario.id}`;
              return (
                <div
                  key={scenario.id}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
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
                        <p className="text-[14px] font-medium text-white leading-snug">
                          {scenario.situation}
                        </p>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-white/55 flex-shrink-0 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-2 animate-fade-in">
                      <div className="rounded-lg border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1">
                        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                          Better approach
                        </span>
                        <p className="text-[14px] text-white/85 leading-relaxed">
                          {scenario.rightApproach}
                        </p>
                      </div>
                      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                        <span className={eyebrowClass}>Avoid this</span>
                        <p className="text-[14px] text-white/85 leading-relaxed">
                          {scenario.wrongApproach}
                        </p>
                      </div>
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

        {/* Terminology */}
        {Object.keys(termsByCategory).length > 0 && (
          <div className="space-y-3">
            <span className={eyebrowClass}>Industry terminology</span>

            {Object.entries(termsByCategory).map(([category, terms]) => (
              <div key={category} className={sectionCardClass}>
                <h3 className="text-[14px] font-medium text-white">{category}</h3>
                <div className="space-y-2">
                  {terms.map((t) => (
                    <div key={t.id} className="pl-3 border-l border-white/15 space-y-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-medium">
                          {t.term}
                        </span>
                        <span className="text-[14px] text-white/85">{t.meaning}</span>
                      </div>
                      <p className="text-[12px] text-white/55 italic">&ldquo;{t.usage}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Regional Info */}
        {sectionRegions.length > 0 && (
          <div className="space-y-3">
            <span className={eyebrowClass}>UK regional differences</span>

            {sectionRegions.map((region) => (
              <div key={region.id} className={sectionCardClass}>
                <h3 className="text-[16px] font-medium text-white">{region.region}</h3>

                <div className="space-y-2">
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                    <span className={eyebrowClass}>Characteristics</span>
                    <ul className="space-y-1">
                      {region.characteristics.map((c, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                    <span className={eyebrowClass}>Common phrases</span>
                    <div className="flex flex-wrap gap-1.5">
                      {region.commonPhrases.map((p, i) => (
                        <span
                          key={i}
                          className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                        >
                          &ldquo;{p}&rdquo;
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                      <span className={eyebrowClass}>Hours</span>
                      <p className="text-[14px] text-white/85">{region.workingHours}</p>
                    </div>
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                      <span className={eyebrowClass}>Breaks</span>
                      <p className="text-[14px] text-white/85">{region.breakCulture}</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                      Tips
                    </span>
                    <ul className="space-y-1">
                      {region.keyTips.map((tip, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                        >
                          <CheckCircle className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0 mt-1" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Industry Types */}
        {sectionIndustries.length > 0 && (
          <div className="space-y-3">
            <span className={eyebrowClass}>Industry sectors</span>

            {sectionIndustries.map((ind) => (
              <div key={ind.id} className={sectionCardClass}>
                <h3 className="text-[14px] font-medium text-white">{ind.sector}</h3>
                <div className="space-y-2">
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                    <span className={eyebrowClass}>Culture</span>
                    <p className="text-[14px] text-white/85 leading-relaxed">{ind.culture}</p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                    <span className={eyebrowClass}>Communication</span>
                    <p className="text-[14px] text-white/85 leading-relaxed">{ind.communication}</p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                    <span className={eyebrowClass}>Challenges</span>
                    <p className="text-[14px] text-white/85 leading-relaxed">{ind.challenges}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Professional Checklists */}
        {sectionTips.length > 0 && (
          <div className="space-y-3">
            <span className={eyebrowClass}>Professional expectations</span>

            {sectionTips.map((tip) => {
              const checked = checkedItems[tip.id] || new Set<number>();
              return (
                <div key={tip.id} className={sectionCardClass}>
                  <h3 className="text-[16px] font-medium text-white">{tip.area}</h3>
                  <p className="text-[14px] text-white/85 leading-relaxed">{tip.description}</p>
                  <div className="space-y-1 pt-1">
                    {tip.expectations.map((exp, idx) => {
                      const done = checked.has(idx);
                      return (
                        <button
                          key={idx}
                          onClick={() => toggleChecked(tip.id, idx)}
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
                            {exp}
                          </span>
                        </button>
                      );
                    })}
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

export default CultureSectionView;
