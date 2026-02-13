import React, { useState } from 'react';
import {
  Bookmark,
  Copy,
  Plus,
  Check,
  ChevronDown,
  ChevronRight,
  Ban,
  Shield,
  Wrench,
  ClipboardList,
  HardHat,
  AlertTriangle,
  BookOpen,
  Lightbulb,
  GraduationCap,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { RiskBadge } from './RiskBar';
import type { EnhancedRiskConsequence } from '@/data/hazards';
import { useToast } from '@/hooks/use-toast';

interface HazardDetailSheetProps {
  hazard: EnhancedRiskConsequence | null;
  open: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

// Control hierarchy configuration
const controlHierarchy = [
  { key: 'elimination', label: 'Elimination', icon: Ban, color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/20' },
  { key: 'substitution', label: 'Substitution', icon: Shield, color: 'text-orange-400', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/20' },
  { key: 'engineering', label: 'Engineering Controls', icon: Wrench, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/20' },
  { key: 'administrative', label: 'Administrative Controls', icon: ClipboardList, color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20' },
  { key: 'ppe', label: 'PPE', icon: HardHat, color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/20' },
];

// Collapsible section component
const CollapsibleSection = ({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-white/[0.06] rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between p-4",
          "hover:bg-white/[0.02] transition-colors"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-white" />
          <span className="font-medium text-white">{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-white" />
        ) : (
          <ChevronRight className="h-5 w-5 text-white" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-0">
          {children}
        </div>
      )}
    </div>
  );
};

export const HazardDetailSheet: React.FC<HazardDetailSheetProps> = ({
  hazard,
  open,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!hazard) return null;

  const copyToClipboard = async () => {
    const text = `
HAZARD: ${hazard.hazard}

CONSEQUENCE: ${hazard.consequence}

RISK RATING: ${hazard.riskRating}/25

CONTROL MEASURES:
${Object.entries(hazard.controlMeasures)
  .filter(([_, measures]) => measures && measures.length > 0)
  .map(([type, measures]) => `\n${type.toUpperCase()}:\n${measures?.map(m => `- ${m}`).join('\n')}`)
  .join('\n')}

${hazard.bs7671References?.length ? `\nBS7671 REFERENCES: ${hazard.bs7671References.join(', ')}` : ''}
    `.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: 'Copied to clipboard',
        description: 'Hazard information copied successfully',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      toast({
        title: 'Copy failed',
        description: 'Unable to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const categoryLabel = hazard.category.charAt(0).toUpperCase() + hazard.category.slice(1);

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="bottom"
        className="rounded-t-3xl bg-elec-dark border-white/[0.08] max-h-[90vh] overflow-hidden p-0"
      >
        {/* Drag Handle */}
        <div className="sticky top-0 z-10 bg-elec-dark pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-white/20 mx-auto" />
        </div>

        <ScrollArea className="h-[calc(90vh-40px)]">
          <div className="px-5 pb-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-2">
                  <RiskBadge riskRating={hazard.riskRating} />
                  <span className="text-xs text-white uppercase tracking-wider">
                    {categoryLabel}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-white leading-tight">
                  {hazard.hazard}
                </h2>
              </div>
              <button
                onClick={onToggleBookmark}
                className="p-2 rounded-xl hover:bg-white/[0.05] transition-colors"
              >
                <Bookmark
                  className={cn(
                    "h-6 w-6 transition-all",
                    isBookmarked
                      ? "fill-elec-yellow text-elec-yellow"
                      : "text-white"
                  )}
                />
              </button>
            </div>

            {/* Consequence */}
            <p className="text-white leading-relaxed mb-6">
              {hazard.consequence}
            </p>

            {/* Control Hierarchy */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-elec-yellow" />
                Control Hierarchy
              </h3>
              <div className="space-y-2">
                {controlHierarchy.map((step, index) => {
                  const measures = hazard.controlMeasures[step.key as keyof typeof hazard.controlMeasures];
                  const hasControls = measures && measures.length > 0;
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.key}
                      className={cn(
                        "p-3 rounded-xl border transition-all",
                        hasControls
                          ? `${step.bgColor} ${step.borderColor}`
                          : "bg-white/[0.02] border-white/[0.06] opacity-50"
                      )}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={cn(
                          "w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold",
                          hasControls ? "bg-white/20 text-white" : "bg-white/10 text-white"
                        )}>
                          {index + 1}
                        </div>
                        <Icon className={cn("h-4 w-4", hasControls ? step.color : "text-white")} />
                        <span className={cn(
                          "text-sm font-medium",
                          hasControls ? "text-white" : "text-white"
                        )}>
                          {step.label}
                        </span>
                        {hasControls && (
                          <span className="ml-auto text-xs text-white">
                            {measures.length}
                          </span>
                        )}
                      </div>
                      {hasControls && (
                        <ul className="space-y-1.5 ml-9">
                          {measures.map((measure, i) => (
                            <li key={i} className="text-sm text-white leading-relaxed">
                              {measure}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BS7671 References */}
            {hazard.bs7671References && hazard.bs7671References.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-elec-yellow" />
                  BS7671 References
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hazard.bs7671References.map((ref, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-sm text-white"
                    >
                      {ref}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Guidance Notes */}
            {hazard.guidanceNotes && hazard.guidanceNotes.length > 0 && (
              <CollapsibleSection title="Guidance Notes" icon={Lightbulb} defaultOpen>
                <ul className="space-y-2">
                  {hazard.guidanceNotes.map((note, i) => (
                    <li key={i} className="flex gap-2 text-sm text-white">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            )}

            {/* Emergency Procedures */}
            {hazard.emergencyProcedures && hazard.emergencyProcedures.length > 0 && (
              <div className="mt-4">
                <CollapsibleSection title="Emergency Procedures" icon={AlertTriangle}>
                  <ol className="space-y-2">
                    {hazard.emergencyProcedures.map((proc, i) => (
                      <li key={i} className="flex gap-3 text-sm text-white">
                        <span className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-xs text-red-400 shrink-0">
                          {i + 1}
                        </span>
                        <span>{proc}</span>
                      </li>
                    ))}
                  </ol>
                </CollapsibleSection>
              </div>
            )}

            {/* Training Required */}
            {hazard.trainingRequired && hazard.trainingRequired.length > 0 && (
              <div className="mt-4">
                <CollapsibleSection title="Training Required" icon={GraduationCap}>
                  <ul className="space-y-2">
                    {hazard.trainingRequired.map((training, i) => (
                      <li key={i} className="flex gap-2 text-sm text-white">
                        <Check className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                        <span>{training}</span>
                      </li>
                    ))}
                  </ul>
                </CollapsibleSection>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-6 mt-6 border-t border-white/[0.06]">
              <Button
                variant="outline"
                className="flex-1 h-12 border-white/[0.1] hover:bg-white/[0.05] rounded-xl"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="h-4 w-4 mr-2 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                {copied ? 'Copied' : 'Copy'}
              </Button>
              <Button
                className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 rounded-xl font-semibold"
                onClick={() => {
                  toast({
                    title: 'Added to RAMS',
                    description: 'Hazard added to your current RAMS document',
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to RAMS
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default HazardDetailSheet;
