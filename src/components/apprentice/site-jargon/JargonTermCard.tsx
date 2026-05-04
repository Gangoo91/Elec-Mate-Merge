import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { JargonTerm } from '@/data/apprentice/siteJargonData';

interface JargonTermCardProps {
  term: JargonTerm;
}

const JargonTermCard = ({ term }: JargonTermCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDetails = term.context || term.commonUsage || term.relatedTerms || term.tags;

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      <button
        onClick={() => hasDetails && setIsExpanded(!isExpanded)}
        className="w-full text-left p-4 touch-manipulation active:scale-[0.99] transition-transform"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-[16px] font-semibold text-white">{term.term}</h3>
              {term.difficulty && (
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  {term.difficulty}
                </span>
              )}
            </div>
            <p className="text-[14px] text-white/85 leading-relaxed">{term.definition}</p>
          </div>
          {hasDetails && (
            <div className="flex-shrink-0 mt-1">
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-white/55" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white/55" />
              )}
            </div>
          )}
        </div>
      </button>

      {isExpanded && hasDetails && (
        <div className="px-4 pb-4 space-y-3 animate-fade-in border-t border-white/[0.06] pt-3">
          {term.commonUsage && (
            <div className="space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                How it sounds on site
              </span>
              <p className="text-[14px] text-white/85 leading-relaxed italic">
                "{term.commonUsage}"
              </p>
            </div>
          )}

          {term.context && (
            <div className="space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Context
              </span>
              <p className="text-[14px] text-white/85 leading-relaxed">{term.context}</p>
            </div>
          )}

          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Related terms
              </span>
              <div className="flex flex-wrap gap-1.5">
                {term.relatedTerms.map((related, i) => (
                  <span
                    key={i}
                    className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                  >
                    {related}
                  </span>
                ))}
              </div>
            </div>
          )}

          {term.tags && term.tags.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Tags
              </span>
              <div className="flex flex-wrap gap-1.5">
                {term.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JargonTermCard;
