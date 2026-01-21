import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, AlertCircle, ClipboardCheck, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';

interface OverallAssessmentCardProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  defaultOpen?: boolean;
}

const OverallAssessmentCard = ({ formData, onUpdate, defaultOpen = true }: OverallAssessmentCardProps) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const handleAssessmentChange = (value: string) => {
    haptics.tap();
    onUpdate('overallAssessment', value);
    if (value === 'unsatisfactory') {
      haptics.warning();
    } else {
      haptics.success();
    }
  };

  const handleContinuedUseChange = (value: string) => {
    haptics.tap();
    onUpdate('satisfactoryForContinuedUse', value);
  };

  // Determine status for header display
  const assessmentStatus = formData.overallAssessment;
  const isComplete = assessmentStatus === 'satisfactory' || assessmentStatus === 'unsatisfactory';

  return (
    <div className={cn(isMobile && "-mx-4")}>
      <Collapsible open={isOpen} onOpenChange={(open) => { haptics.tap(); setIsOpen(open); }}>
        {/* Header */}
        <CollapsibleTrigger className="w-full" asChild>
          <button className={cn(
            "w-full flex items-center gap-3 p-4 text-left touch-manipulation transition-colors",
            "bg-card/50 border-y border-border/30",
            isOpen && "bg-card/80",
            "active:bg-card/90"
          )}>
            {/* Icon Badge */}
            <div className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0",
              assessmentStatus === 'satisfactory' ? "bg-green-500/20" :
              assessmentStatus === 'unsatisfactory' ? "bg-red-500/20" :
              "bg-elec-yellow/20"
            )}>
              {assessmentStatus === 'satisfactory' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : assessmentStatus === 'unsatisfactory' ? (
                <XCircle className="h-5 w-5 text-red-500" />
              ) : (
                <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
              )}
            </div>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-semibold",
                assessmentStatus === 'satisfactory' ? "text-green-400" :
                assessmentStatus === 'unsatisfactory' ? "text-red-400" :
                "text-foreground"
              )}>
                Overall Assessment
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {assessmentStatus === 'satisfactory' ? 'Installation is satisfactory' :
                 assessmentStatus === 'unsatisfactory' ? 'Installation is unsatisfactory' :
                 'Set the overall assessment'}
              </p>
            </div>

            {/* Status Badge */}
            {isComplete && (
              <div className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                assessmentStatus === 'satisfactory' ? "bg-green-500/20 text-green-400" :
                "bg-red-500/20 text-red-400"
              )}>
                {assessmentStatus === 'satisfactory' ? 'PASS' : 'FAIL'}
              </div>
            )}

            {/* Chevron */}
            <ChevronDown className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )} />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className={cn(
            "space-y-5 bg-card/30",
            isMobile ? "p-4" : "p-5"
          )}>
            {/* Overall Assessment - Large Buttons */}
            <div className="space-y-3">
              <Label className="text-sm text-foreground/80">Overall assessment of the installation</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleAssessmentChange('satisfactory')}
                  className={cn(
                    "h-14 rounded-xl font-semibold transition-all touch-manipulation",
                    "flex flex-col items-center justify-center gap-1",
                    "active:scale-95",
                    formData.overallAssessment === 'satisfactory'
                      ? "bg-green-500 text-white ring-2 ring-green-500/50 ring-offset-2 ring-offset-background"
                      : "bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20"
                  )}
                >
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm">Satisfactory</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAssessmentChange('unsatisfactory')}
                  className={cn(
                    "h-14 rounded-xl font-semibold transition-all touch-manipulation",
                    "flex flex-col items-center justify-center gap-1",
                    "active:scale-95",
                    formData.overallAssessment === 'unsatisfactory'
                      ? "bg-red-500 text-white ring-2 ring-red-500/50 ring-offset-2 ring-offset-background"
                      : "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20"
                  )}
                >
                  <XCircle className="h-5 w-5" />
                  <span className="text-sm">Unsatisfactory</span>
                </button>
              </div>
            </div>

            {/* Continued Use Assessment */}
            <div className="space-y-3">
              <Label className="text-sm text-foreground/80">Installation is satisfactory for continued use</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'yes', label: 'Yes', icon: CheckCircle, color: 'green' },
                  { value: 'no', label: 'No', icon: XCircle, color: 'red' },
                  { value: 'yes-with-observations', label: 'Yes*', icon: AlertCircle, color: 'yellow' },
                ].map((option) => {
                  const isSelected = formData.satisfactoryForContinuedUse === option.value;
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleContinuedUseChange(option.value)}
                      className={cn(
                        "h-12 rounded-xl font-medium transition-all touch-manipulation text-sm",
                        "flex items-center justify-center gap-1.5",
                        "active:scale-95",
                        isSelected ? (
                          option.color === 'green' ? "bg-green-500 text-white" :
                          option.color === 'red' ? "bg-red-500 text-white" :
                          "bg-yellow-500 text-black"
                        ) : (
                          option.color === 'green' ? "bg-green-500/10 text-green-400 border border-green-500/30" :
                          option.color === 'red' ? "bg-red-500/10 text-red-400 border border-red-500/30" :
                          "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                        )
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {option.label}
                    </button>
                  );
                })}
              </div>
              {formData.satisfactoryForContinuedUse === 'yes-with-observations' && (
                <p className="text-xs text-yellow-400/80 px-1">
                  * Subject to observations being addressed
                </p>
              )}
            </div>

            {/* Additional Comments */}
            <div className="space-y-2">
              <Label className="text-sm text-foreground/80">Additional Comments</Label>
              <Textarea
                placeholder="Any additional comments or recommendations..."
                value={formData.additionalComments || ''}
                onChange={(e) => onUpdate('additionalComments', e.target.value)}
                rows={3}
                style={{ fontSize: '16px' }}
                className="text-base bg-white/5 border-white/10 focus:border-elec-yellow/50
                           placeholder:text-white/30 resize-none min-h-[80px] touch-manipulation"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default OverallAssessmentCard;
