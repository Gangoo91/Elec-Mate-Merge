import React from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Clock,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Zap,
  BookOpen,
  Settings,
} from 'lucide-react';
import { MethodTemplate } from '@/types/method-statement';
import { RequiredFieldTooltip } from '@/components/ui/required-field-tooltip';

interface TemplatePreviewModalProps {
  template: MethodTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onUseTemplate: (template: MethodTemplate) => void;
}

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onUseTemplate,
}) => {
  if (!template) return null;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-400 bg-green-500/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'high':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-elec-gray bg-elec-gray/20';
    }
  };

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

  const totalEstimatedTime = template.steps.reduce((total, step) => {
    const stepTime = parseInt(step.estimatedDuration.split(' ')[0]) || 0;
    return total + stepTime;
  }, 0);

  return (
    /* Bottom sheet, not a centred 4xl dialog. A method statement gets written on
       site, on a phone, and a centred modal cannot be reached one-handed. The
       heading is type rather than a yellow eye icon, and "Popular" is a word
       rather than a blue badge — the only accent here should be elec-yellow. */
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="flex h-[85vh] flex-col gap-0 rounded-t-2xl border-white/[0.08] p-0"
      >
        <div className="flex-shrink-0 border-b border-white/[0.1] p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="break-words text-[19px] font-semibold tracking-tight text-white">
                {template.name}
              </h2>
              <p className="mt-1 text-[13px] leading-relaxed text-white">
                {template.description}
                {template.isPopular && ' · Popular'}
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
          <div className="space-y-6">
            {/* Template Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-elec-yellow/20 bg-elec-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-elec-yellow">Duration</div>
                      <div className="text-xs text-white">{template.estimatedDuration}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-elec-yellow">Difficulty</div>
                      <Badge
                        className={`${getDifficultyColor(template.difficultyLevel)} text-xs mt-1`}
                      >
                        {template.difficultyLevel}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-elec-yellow">Steps</div>
                      <div className="text-xs text-white">{template.steps.length} procedures</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Required Qualifications */}
            <Card className="border-elec-yellow/20 bg-elec-card/50">
              <CardHeader className="p-4 pb-3">
                <CardTitle className="text-base text-elec-yellow flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Required Qualifications
                  <RequiredFieldTooltip content="All team members must hold these qualifications before starting work" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap gap-2">
                  {template.requiredQualifications.map((qual, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-elec-yellow/30 text-elec-yellow/90 border border-elec-yellow/35"
                    >
                      {qual}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Method Steps Detail */}
            <Card className="border-elec-yellow/20 bg-elec-card/50">
              <CardHeader className="p-4 pb-3">
                <CardTitle className="text-base text-elec-yellow flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Method Steps ({template.steps.length})
                  </div>
                  <div className="text-sm text-white">Est. {totalEstimatedTime} min total</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                {template.steps.map((step, index) => (
                  <div
                    key={index}
                    className="border border-elec-yellow/10 rounded-lg p-4 bg-elec-card/30"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-elec-yellow text-black flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="font-medium text-elec-yellow break-words">{step.title}</h4>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge className={`${getRiskColor(step.riskLevel)} text-xs`}>
                              {step.riskLevel} risk
                            </Badge>
                            <div className="text-xs text-white">{step.estimatedDuration}</div>
                          </div>
                        </div>

                        <p className="text-sm text-white leading-relaxed">{step.description}</p>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
                          <div>
                            <div className="font-medium text-elec-yellow mb-2 flex items-center gap-1">
                              <Shield className="h-3 w-3" />
                              Safety Requirements
                            </div>
                            <ul className="space-y-1 text-white">
                              {step.safetyRequirements.map((req, reqIndex) => (
                                <li key={reqIndex} className="flex items-start gap-1">
                                  <CheckCircle2 className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                                  <span className="break-words">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="font-medium text-elec-yellow mb-2 flex items-center gap-1">
                              <Settings className="h-3 w-3" />
                              Equipment Needed
                            </div>
                            <ul className="space-y-1 text-white">
                              {step.equipmentNeeded.map((equipment, eqIndex) => (
                                <li key={eqIndex} className="flex items-start gap-1">
                                  <div className="w-1 h-1 bg-elec-yellow rounded-full flex-shrink-0 mt-2"></div>
                                  <span className="break-words">{equipment}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="font-medium text-elec-yellow mb-2 flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              Qualifications
                            </div>
                            <ul className="space-y-1 text-white">
                              {step.qualifications.map((qual, qualIndex) => (
                                <li key={qualIndex} className="flex items-start gap-1">
                                  <div className="w-1 h-1 bg-elec-yellow rounded-full flex-shrink-0 mt-2"></div>
                                  <span className="break-words">{qual}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Safety Notice */}
            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-orange-400 mb-1">
                      Safety & Compliance Notice
                    </div>
                    <p className="text-sm text-white leading-relaxed">
                      This template is designed to meet BS7671:2018+A3:2024 requirements and CDM
                      regulations. Always conduct site-specific risk assessments and adapt
                      procedures as needed for your specific installation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <Separator className="border border-elec-yellow/35" />

        <div className="p-6 pt-4 flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-white">
              Ready to use this template for your method statement?
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-elec-yellow/20 hover:border-elec-yellow/40"
              >
                Back to Templates
              </Button>
              <Button
                onClick={() => onUseTemplate(template)}
                className="bg-green-600 hover:bg-green-700 text-foreground"
              >
                Use This Template
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TemplatePreviewModal;
