import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { RiskPill, riskTone } from './RiskBar';
import type { EnhancedRiskConsequence } from '@/data/hazards';
import { useToast } from '@/hooks/use-toast';
import { copyToClipboard as copyText } from '@/utils/clipboard';

import {
  SheetShell,
  Eyebrow,
  ListCard,
  PrimaryButton,
  SecondaryButton,
  toneAccent,
} from '@/components/college/primitives';

interface HazardDetailSheetProps {
  hazard: EnhancedRiskConsequence | null;
  open: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

// Control hierarchy — ordered most-to-least effective (HSG65 / ERIC-PD).
const controlHierarchy: { key: keyof EnhancedRiskConsequence['controlMeasures']; label: string }[] =
  [
    { key: 'elimination', label: 'Elimination' },
    { key: 'substitution', label: 'Substitution' },
    { key: 'engineering', label: 'Engineering controls' },
    { key: 'administrative', label: 'Administrative controls' },
    { key: 'ppe', label: 'PPE' },
  ];

// Collapsible section — hairline card, monochrome chevron.
function CollapsibleSection({
  title,
  count,
  children,
  defaultOpen = false,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors"
      >
        <span className="text-[14px] font-medium text-white flex-1">{title}</span>
        {typeof count === 'number' && (
          <span className="text-[11px] text-white/45 tabular-nums">{count}</span>
        )}
        <span
          aria-hidden
          className={cn(
            'text-white/40 text-[13px] transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        >
          ⌄
        </span>
      </button>
      {isOpen && <div className="px-5 pb-4 pt-1">{children}</div>}
    </div>
  );
}

export const HazardDetailSheet = ({
  hazard,
  open,
  onClose,
  isBookmarked,
  onToggleBookmark,
}: HazardDetailSheetProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!hazard) return null;

  const tone = riskTone(hazard.riskRating);
  const categoryLabel = hazard.category.charAt(0).toUpperCase() + hazard.category.slice(1);

  const handleCopy = async () => {
    const text = `
HAZARD: ${hazard.hazard}

CONSEQUENCE: ${hazard.consequence}

RISK RATING: ${hazard.riskRating}/25

CONTROL MEASURES:
${Object.entries(hazard.controlMeasures)
  .filter(([, measures]) => measures && measures.length > 0)
  .map(
    ([type, measures]) => `\n${type.toUpperCase()}:\n${measures?.map((m) => `- ${m}`).join('\n')}`
  )
  .join('\n')}

${hazard.bs7671References?.length ? `\nBS7671 REFERENCES: ${hazard.bs7671References.join(', ')}` : ''}
    `.trim();

    try {
      await copyText(text);
      setCopied(true);
      toast({ title: 'Copied to clipboard', description: 'Hazard information copied successfully' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Unable to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="bottom"
        className="h-[90vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]"
      >
        <SheetShell
          eyebrow={categoryLabel}
          title={hazard.hazard}
          description={
            <span className="inline-flex items-center gap-2">
              <RiskPill riskRating={hazard.riskRating} />
              <span className="text-[12px] text-white/55 tabular-nums">
                Risk rating {hazard.riskRating}/25
              </span>
            </span>
          }
          footer={
            <>
              <SecondaryButton onClick={handleCopy}>{copied ? 'Copied' : 'Copy'}</SecondaryButton>
              <SecondaryButton onClick={onToggleBookmark}>
                {isBookmarked ? 'Saved ✓' : 'Save'}
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={() =>
                  toast({
                    title: 'Added to RAMS',
                    description: 'Hazard added to your current RAMS document',
                  })
                }
              >
                Add to RAMS
              </PrimaryButton>
            </>
          }
        >
          {/* Risk accent line — bleeds to the sheet edges */}
          <div className={cn('-mx-5 -mt-5 mb-1 h-0.5 bg-gradient-to-r', toneAccent[tone])} />

          {/* Consequence */}
          <p className="text-[13px] text-white/85 leading-relaxed">{hazard.consequence}</p>

          {/* Control hierarchy */}
          <div>
            <Eyebrow className="mb-2">Hierarchy of control</Eyebrow>
            <div className="space-y-2">
              {controlHierarchy.map((step, index) => {
                const measures = hazard.controlMeasures[step.key];
                const hasControls = measures && measures.length > 0;
                return (
                  <div
                    key={step.key}
                    className={cn(
                      'rounded-xl border px-4 py-3',
                      hasControls
                        ? 'bg-[hsl(0_0%_12%)] border-white/[0.08]'
                        : 'bg-[hsl(0_0%_10%)] border-white/[0.05] opacity-50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 text-[11px] font-medium tabular-nums text-elec-yellow/80 shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[13px] font-medium text-white flex-1">{step.label}</span>
                      {hasControls && (
                        <span className="text-[11px] text-white/45 tabular-nums">
                          {measures.length}
                        </span>
                      )}
                    </div>
                    {hasControls && (
                      <ul className="space-y-1.5 mt-2 pl-8">
                        {measures.map((measure, i) => (
                          <li
                            key={i}
                            className="text-[12.5px] text-white/75 leading-relaxed flex gap-2"
                          >
                            <span aria-hidden className="text-elec-yellow/70 mt-0.5">
                              •
                            </span>
                            <span>{measure}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* BS 7671 references */}
          {hazard.bs7671References && hazard.bs7671References.length > 0 && (
            <div>
              <Eyebrow className="mb-2">BS 7671 references</Eyebrow>
              <div className="flex flex-wrap gap-1.5">
                {hazard.bs7671References.map((ref, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11.5px] text-white/80 bg-white/[0.05] border border-white/10"
                  >
                    {ref}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Guidance notes */}
          {hazard.guidanceNotes && hazard.guidanceNotes.length > 0 && (
            <CollapsibleSection
              title="Guidance notes"
              count={hazard.guidanceNotes.length}
              defaultOpen
            >
              <ListCard>
                {hazard.guidanceNotes.map((note, i) => (
                  <div
                    key={i}
                    className="px-5 py-3 text-[12.5px] text-white/85 leading-relaxed flex gap-2.5"
                  >
                    <span aria-hidden className="text-elec-yellow/70 mt-0.5">
                      •
                    </span>
                    <span>{note}</span>
                  </div>
                ))}
              </ListCard>
            </CollapsibleSection>
          )}

          {/* Emergency procedures */}
          {hazard.emergencyProcedures && hazard.emergencyProcedures.length > 0 && (
            <CollapsibleSection
              title="Emergency procedures"
              count={hazard.emergencyProcedures.length}
            >
              <div className="divide-y divide-white/[0.05]">
                {hazard.emergencyProcedures.map((proc, i) => (
                  <div key={i} className="flex items-start gap-3 py-2.5">
                    <span className="w-5 text-[11px] font-medium tabular-nums text-red-400 shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[12.5px] text-white/85 leading-relaxed">{proc}</span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Training required */}
          {hazard.trainingRequired && hazard.trainingRequired.length > 0 && (
            <CollapsibleSection title="Training required" count={hazard.trainingRequired.length}>
              <ListCard>
                {hazard.trainingRequired.map((training, i) => (
                  <div
                    key={i}
                    className="px-5 py-3 text-[12.5px] text-white/85 leading-relaxed flex gap-2.5"
                  >
                    <span aria-hidden className="text-emerald-400 mt-0.5">
                      ✓
                    </span>
                    <span>{training}</span>
                  </div>
                ))}
              </ListCard>
            </CollapsibleSection>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
};

export default HazardDetailSheet;
