
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, BookOpen, MessageSquare, Users, Lightbulb } from "lucide-react";
import { JargonTerm } from "@/data/apprentice/siteJargonData";

interface JargonTermCardProps {
  term: JargonTerm;
}

const JargonTermCard = ({ term }: JargonTermCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-elec-yellow mb-1">
              {term.term}
            </h3>
            <p className="text-sm text-elec-light/90 leading-relaxed">
              {term.definition}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 ml-4">
            {term.difficulty && (
              <Badge className={getDifficultyColor(term.difficulty)}>
                {term.difficulty}
              </Badge>
            )}
            {(term.context || term.commonUsage || term.relatedTerms) && (
              <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-1">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
            )}
          </div>
        </div>
      </CardHeader>

      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-3">
            {term.context && (
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-blue-400 mb-1">Context</p>
                  <p className="text-sm text-elec-light/80">{term.context}</p>
                </div>
              </div>
            )}

            {term.commonUsage && (
              <div className="flex items-start gap-2">
                <MessageSquare className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-green-400 mb-1">Common Usage</p>
                  <p className="text-sm text-elec-light/80 italic">"{term.commonUsage}"</p>
                </div>
              </div>
            )}

            {term.relatedTerms && term.relatedTerms.length > 0 && (
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-purple-400 mb-2">Related Terms</p>
                  <div className="flex flex-wrap gap-1">
                    {term.relatedTerms.map((relatedTerm, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {relatedTerm}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {term.tags && term.tags.length > 0 && (
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-orange-400 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {term.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default JargonTermCard;
