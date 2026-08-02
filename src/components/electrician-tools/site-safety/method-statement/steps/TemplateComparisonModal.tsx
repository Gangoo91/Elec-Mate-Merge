import React from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Clock, Shield, X, GitCompare, CheckCircle2, Settings, Users, Star } from 'lucide-react';
import { MethodTemplate } from '@/types/method-statement';

interface TemplateComparisonModalProps {
  templates: MethodTemplate[];
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: MethodTemplate) => void;
}

const TemplateComparisonModal: React.FC<TemplateComparisonModalProps> = ({
  templates,
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  if (templates.length === 0) return null;

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'basic':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'intermediate':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-elec-gray/20 text-elec-gray border-elec-gray/30';
    }
  };

  const compareFeature = (
    feature: string,
    template1?: string[],
    template2?: string[],
    template3?: string[]
  ) => {
    const allFeatures = new Set([...(template1 || []), ...(template2 || []), ...(template3 || [])]);

    return Array.from(allFeatures);
  };

  return (
    /* Bottom sheet rather than a centred 6xl dialog. The comparison grid already
       collapses to a single column below `lg`, so on a phone it stacks — which
       is the only way three templates were ever going to be readable there. */
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="flex h-[85vh] flex-col gap-0 rounded-t-2xl border-white/[0.08] p-0"
      >
        <div className="flex-shrink-0 border-b border-white/[0.1] p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="text-[19px] font-semibold tracking-tight text-white">
                Compare templates
              </h2>
              <p className="mt-1 text-[13px] text-white">
                Up to {templates.length} side by side, to pick the best fit for the job.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="-mr-1 h-11 shrink-0 touch-manipulation text-[15px] font-medium text-white"
            >
              Close
            </button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {templates.slice(0, 3).map((template, index) => (
              <div key={template.id} className="space-y-4">
                {/* Template Header */}
                <Card className="border-elec-yellow/20 bg-elec-card/50">
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-base text-elec-yellow break-words leading-tight">
                        {template.name}
                      </CardTitle>
                      {template.isPopular && (
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Star className="h-3 w-3 fill-blue-400 text-blue-400" />
                          <span className="text-xs text-blue-400">Popular</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-white leading-relaxed">{template.description}</p>
                  </CardHeader>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <Card className="border-elec-yellow/10 bg-elec-card/30">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                        <div>
                          <div className="text-xs font-medium text-elec-yellow">Duration</div>
                          <div className="text-xs text-white">{template.estimatedDuration}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-elec-yellow/10 bg-elec-card/30">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                        <div>
                          <div className="text-xs font-medium text-elec-yellow">Steps</div>
                          <div className="text-xs text-white">
                            {template.steps.length} procedures
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Difficulty */}
                <Card className="border-elec-yellow/10 bg-elec-card/30">
                  <CardContent className="p-3">
                    <div className="text-xs font-medium text-elec-yellow mb-2">
                      Difficulty Level
                    </div>
                    <Badge className={`${getDifficultyColor(template.difficultyLevel)} text-xs`}>
                      {template.difficultyLevel}
                    </Badge>
                  </CardContent>
                </Card>

                {/* Qualifications */}
                <Card className="border-elec-yellow/10 bg-elec-card/30">
                  <CardContent className="p-3">
                    <div className="text-xs font-medium text-elec-yellow mb-2 flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Required Qualifications
                    </div>
                    <div className="space-y-1">
                      {template.requiredQualifications.map((qual, qualIndex) => (
                        <div key={qualIndex} className="flex items-start gap-1">
                          <CheckCircle2 className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-white break-words">{qual}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Key Steps Preview */}
                <Card className="border-elec-yellow/10 bg-elec-card/30">
                  <CardContent className="p-3">
                    <div className="text-xs font-medium text-elec-yellow mb-2 flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Key Steps ({template.steps.length})
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {template.steps.slice(0, 4).map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-medium">
                            {stepIndex + 1}
                          </div>
                          <span className="text-xs text-white break-words line-clamp-1">
                            {step.title}
                          </span>
                        </div>
                      ))}
                      {template.steps.length > 4 && (
                        <div className="text-xs text-white pl-6 italic">
                          +{template.steps.length - 4} more steps
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Button */}
                <Button
                  onClick={() => onSelectTemplate(template)}
                  className="w-full bg-green-600 hover:bg-green-700 text-foreground h-10"
                >
                  Use This Template
                </Button>
              </div>
            ))}
          </div>

          {/* Comparison Summary */}
          {templates.length > 1 && (
            <Card className="mt-6 border-blue-500/20 bg-blue-500/5">
              <CardHeader className="p-4">
                <CardTitle className="text-base text-blue-300">Quick Comparison</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="font-medium text-blue-300 mb-2">Duration Range</div>
                    <div className="text-white">
                      {Math.min(
                        ...templates.map((t) => parseInt(t.estimatedDuration.split('-')[0]))
                      )}{' '}
                      -{' '}
                      {Math.max(
                        ...templates.map((t) =>
                          parseInt(
                            t.estimatedDuration.split('-')[1] || t.estimatedDuration.split('-')[0]
                          )
                        )
                      )}{' '}
                      hours
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-300 mb-2">Steps Range</div>
                    <div className="text-white">
                      {Math.min(...templates.map((t) => t.steps.length))} -{' '}
                      {Math.max(...templates.map((t) => t.steps.length))} procedures
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-300 mb-2">Difficulty Spread</div>
                    <div className="flex flex-wrap gap-1">
                      {Array.from(new Set(templates.map((t) => t.difficultyLevel))).map((level) => (
                        <Badge key={level} className={`${getDifficultyColor(level)} text-xs`}>
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </ScrollArea>

        <Separator className="bg-elec-yellow/20" />

        <div className="p-6 pt-4 flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-white">
              Select the template that best matches your project requirements
            </div>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-elec-yellow/20 hover:border-elec-yellow/40"
            >
              Back to Templates
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TemplateComparisonModal;
