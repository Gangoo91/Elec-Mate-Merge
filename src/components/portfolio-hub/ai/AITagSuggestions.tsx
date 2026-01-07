import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  Sparkles,
  CheckCircle2,
  PlusCircle,
  X,
  ChevronDown,
  ChevronUp,
  Brain,
  Target,
  Lightbulb,
  Star,
  AlertCircle,
} from 'lucide-react';
import {
  AIAnalysisResult,
  KSBSuggestion,
  TagSuggestion,
  getKSBCategoryColor,
  getConfidenceBadgeClass,
} from '@/hooks/portfolio/useAIEvidenceTagger';

interface AITagSuggestionsProps {
  result: AIAnalysisResult;
  onAcceptKSB?: (ksb: KSBSuggestion) => void;
  onRejectKSB?: (ksb: KSBSuggestion) => void;
  onAcceptTag?: (tag: TagSuggestion) => void;
  onRejectTag?: (tag: TagSuggestion) => void;
  onAcceptAll?: () => void;
  selectedKSBs?: string[];
  selectedTags?: string[];
  compact?: boolean;
}

export function AITagSuggestions({
  result,
  onAcceptKSB,
  onRejectKSB,
  onAcceptTag,
  onRejectTag,
  onAcceptAll,
  selectedKSBs = [],
  selectedTags = [],
  compact = false,
}: AITagSuggestionsProps) {
  const [expandedSections, setExpandedSections] = useState({
    ksb: true,
    tags: true,
    quality: !compact,
    content: !compact,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const hasAnySuggestions =
    result.ksb_suggestions.length > 0 ||
    result.tag_suggestions.length > 0;

  if (!hasAnySuggestions && compact) {
    return null;
  }

  return (
    <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/5 to-transparent">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-elec-yellow" />
            AI Suggestions
            <Badge className="bg-elec-yellow/20 text-elec-yellow text-[10px]">
              {result.ksb_suggestions.length + result.tag_suggestions.length} found
            </Badge>
          </CardTitle>
          {onAcceptAll && hasAnySuggestions && (
            <Button
              size="sm"
              variant="outline"
              onClick={onAcceptAll}
              className="h-7 text-xs border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Accept All
            </Button>
          )}
        </div>
        {!compact && (
          <CardDescription className="text-xs">
            {result.summary}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* KSB Suggestions */}
        {result.ksb_suggestions.length > 0 && (
          <div className="space-y-2">
            <button
              onClick={() => toggleSection('ksb')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">KSB Mappings</span>
                <Badge variant="secondary" className="text-xs">
                  {result.ksb_suggestions.length}
                </Badge>
              </div>
              {expandedSections.ksb ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {expandedSections.ksb && (
              <div className="space-y-2 pl-6">
                {result.ksb_suggestions.map((ksb) => {
                  const isSelected = selectedKSBs.includes(ksb.code);
                  return (
                    <div
                      key={ksb.code}
                      className={cn(
                        "p-3 rounded-lg border transition-all",
                        isSelected
                          ? "border-elec-yellow bg-elec-yellow/10"
                          : "border-border bg-background hover:border-elec-yellow/50"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <Badge variant="outline" className="font-mono text-xs">
                              {ksb.code}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={cn("text-xs capitalize", getKSBCategoryColor(ksb.category))}
                            >
                              {ksb.category}
                            </Badge>
                            <Badge className={cn("text-xs", getConfidenceBadgeClass(ksb.confidence))}>
                              {ksb.confidence}%
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground">{ksb.description}</p>
                          {!compact && (
                            <p className="text-xs text-muted-foreground mt-1">{ksb.reason}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {isSelected ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onRejectKSB?.(ksb)}
                              className="h-7 w-7 p-0 text-red-500 hover:bg-red-500/10"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onAcceptKSB?.(ksb)}
                              className="h-7 w-7 p-0 text-green-500 hover:bg-green-500/10"
                            >
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <Progress
                        value={ksb.confidence}
                        className="h-1 mt-2"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tag Suggestions */}
        {result.tag_suggestions.length > 0 && (
          <div className="space-y-2">
            <button
              onClick={() => toggleSection('tags')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Suggested Tags</span>
                <Badge variant="secondary" className="text-xs">
                  {result.tag_suggestions.length}
                </Badge>
              </div>
              {expandedSections.tags ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {expandedSections.tags && (
              <div className="flex flex-wrap gap-2 pl-6">
                {result.tag_suggestions.map((tag) => {
                  const isSelected = selectedTags.includes(tag.tag);
                  return (
                    <Badge
                      key={tag.tag}
                      variant="outline"
                      className={cn(
                        "cursor-pointer transition-all",
                        isSelected
                          ? "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30"
                          : "hover:border-elec-yellow/50"
                      )}
                      onClick={() => isSelected ? onRejectTag?.(tag) : onAcceptTag?.(tag)}
                    >
                      {tag.tag}
                      <span className="ml-1 text-[10px] opacity-70">{tag.confidence}%</span>
                      {isSelected ? (
                        <X className="h-3 w-3 ml-1" />
                      ) : (
                        <PlusCircle className="h-3 w-3 ml-1" />
                      )}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Quality Assessment */}
        {!compact && result.quality_assessment && (
          <div className="space-y-2">
            <button
              onClick={() => toggleSection('quality')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Quality Assessment</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    result.quality_assessment.score >= 80
                      ? "bg-green-500/20 text-green-500 border-green-500/30"
                      : result.quality_assessment.score >= 60
                      ? "bg-amber-500/20 text-amber-500 border-amber-500/30"
                      : "bg-red-500/20 text-red-500 border-red-500/30"
                  )}
                >
                  {result.quality_assessment.score}/100
                </Badge>
              </div>
              {expandedSections.quality ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {expandedSections.quality && (
              <div className="pl-6 space-y-2">
                <p className="text-sm text-muted-foreground">
                  {result.quality_assessment.feedback}
                </p>
                {result.quality_assessment.improvements.length > 0 && (
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-amber-500 mb-1">
                          Suggestions to improve:
                        </p>
                        <ul className="text-xs text-amber-600 space-y-0.5">
                          {result.quality_assessment.improvements.map((imp, i) => (
                            <li key={i}>• {imp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Detected Content */}
        {!compact && result.detected_content && (
          <div className="space-y-2">
            <button
              onClick={() => toggleSection('content')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Detected Content</span>
              </div>
              {expandedSections.content ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {expandedSections.content && (
              <div className="pl-6 space-y-2">
                <p className="text-sm text-muted-foreground">
                  {result.detected_content.description}
                </p>
                {result.detected_content.electrical_elements.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {result.detected_content.electrical_elements.map((element, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {element}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>Type: {result.detected_content.work_type}</span>
                  <span>•</span>
                  <span>Location: {result.detected_content.location_type}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!hasAnySuggestions && (
          <div className="text-center py-6">
            <AlertCircle className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No confident suggestions found
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Try adding more detail to the description
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AITagSuggestions;
