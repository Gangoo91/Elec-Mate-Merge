import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { JargonTerm } from '@/data/apprentice/siteJargonData';

interface JargonTermCardProps {
  term: JargonTerm;
}

const getDifficultyStyle = (difficulty: string) => {
  switch (difficulty) {
    case 'basic':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'intermediate':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'advanced':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-white/10 text-white border-white/20';
  }
};

const getCategoryAccent = (category: string) => {
  switch (category) {
    case 'electrical-terms':
      return 'border-l-blue-400';
    case 'tools-equipment':
      return 'border-l-orange-400';
    case 'safety-terms':
      return 'border-l-red-400';
    case 'site-language':
      return 'border-l-green-400';
    case 'regulations-standards':
      return 'border-l-purple-400';
    case 'installation-methods':
      return 'border-l-cyan-400';
    case 'testing-terminology':
      return 'border-l-amber-400';
    case 'commercial-industrial':
      return 'border-l-indigo-400';
    default:
      return 'border-l-white';
  }
};

const JargonTermCard = ({ term }: JargonTermCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDetails = term.context || term.commonUsage || term.relatedTerms || term.tags;

  return (
    <Card
      className={`border-elec-yellow/20 bg-white/5 border-l-4 ${getCategoryAccent(term.category)} overflow-hidden`}
    >
      <CardContent className="p-0">
        <button
          onClick={() => hasDetails && setIsExpanded(!isExpanded)}
          className="w-full text-left p-4 touch-manipulation active:scale-[0.99] transition-transform"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <h3 className="text-base font-bold text-elec-yellow">{term.term}</h3>
                {term.difficulty && (
                  <Badge className={`text-xs ${getDifficultyStyle(term.difficulty)}`}>
                    {term.difficulty}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-white leading-relaxed">{term.definition}</p>
            </div>
            {hasDetails && (
              <div className="flex-shrink-0 mt-1">
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-white" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-white" />
                )}
              </div>
            )}
          </div>
        </button>

        {isExpanded && hasDetails && (
          <div className="px-4 pb-4 space-y-2.5 animate-fade-in">
            <div className="border-t border-white/10" />

            {term.commonUsage && (
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <p className="text-xs font-medium text-green-400 mb-1">How it sounds on site</p>
                <p className="text-sm text-white italic">"{term.commonUsage}"</p>
              </div>
            )}

            {term.context && (
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="text-xs font-medium text-blue-400 mb-1">Context</p>
                <p className="text-sm text-white">{term.context}</p>
              </div>
            )}

            {term.relatedTerms && term.relatedTerms.length > 0 && (
              <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <p className="text-xs font-medium text-purple-400 mb-1.5">Related Terms</p>
                <div className="flex flex-wrap gap-1.5">
                  {term.relatedTerms.map((related, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-xs text-white border-purple-500/30 bg-purple-500/10"
                    >
                      {related}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {term.tags && term.tags.length > 0 && (
              <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <p className="text-xs font-medium text-orange-400 mb-1.5">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {term.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      className="text-xs bg-orange-500/20 text-orange-400 border-orange-500/30"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JargonTermCard;
