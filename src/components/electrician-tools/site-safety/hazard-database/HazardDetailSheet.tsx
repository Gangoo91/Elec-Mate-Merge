import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { RiskPill, riskTone } from './RiskBar';
import { categoryLabel, normaliseCategory } from './CategoryPill';
import type { EnhancedRiskConsequence } from '@/data/hazards';
import { useToast } from '@/hooks/use-toast';
import { useRAMS } from '../rams/RAMSContext';
import { copyToClipboard as copyText } from '@/utils/clipboard';

import {
  SheetShell,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  toneAccent,
} from '@/components/college/primitives';
import { SafetyListCard, SafetyListRow } from '../common/SafetyList';

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
    <div className={cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}>
      {/* h-auto but min 56px so the header clears the 44px touch target even
          with a one-line title, and the whole row is the hit area — a chevron
          alone is a 13px target on a phone. */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors touch-manipulation [-webkit-tap-highlight-color:transparent] hover:bg-white/[0.05] active:bg-white/[0.08]"
      >
        <span className="flex-1 text-[14px] font-medium text-white">{title}</span>
        {typeof count === 'number' && (
          <span className="text-[11px] tabular-nums text-white">{count}</span>
        )}
        {/* Was the character "⌄", which renders at a different weight and
            baseline on iOS than it does on Chrome. A rotated chevron is the
            same shape everywhere. */}
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={cn(
            'h-3.5 w-3.5 shrink-0 text-white transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        >
          <path
            d="M3 6l5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
  const { addRiskFromHazard } = useRAMS();
  const [copied, setCopied] = useState(false);

  if (!hazard) return null;

  const tone = riskTone(hazard.riskRating);
  // Was `charAt(0).toUpperCase() + slice(1)` on the raw value, which printed
  // the stored id verbatim — "Testing-inspection", "Specialised-equipment",
  // "Design-calculations". Normalise then use the shared label map so the
  // sheet header reads the same as the chip the user tapped to get here.
  const headerCategory = categoryLabel(normaliseCategory(hazard.category));

  /**
   * Add this hazard to the RAMS being built, flattening the control hierarchy
   * into the single controls field that a RAMS risk row carries. Order is
   * preserved most-to-least effective (ERIC-PD), so the resulting document
   * still reads as a hierarchy rather than a bag of measures.
   */
  const handleAddToRAMS = () => {
    const controls = controlHierarchy
      .flatMap(({ key }) => hazard.controlMeasures[key] ?? [])
      .join('\n• ');

    addRiskFromHazard({
      name: hazard.hazard,
      description: hazard.consequence,
      likelihood: hazard.likelihood,
      severity: hazard.severity,
      commonControls: controls ? [controls] : [],
    });

    toast({
      title: 'Added to RAMS',
      description: `"${hazard.hazard}" added with its controls. Open the RAMS generator to finish.`,
    });
  };

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
      toast({
        title: 'Copied to clipboard',
        description: 'Hazard information copied successfully',
      });
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
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]"
      >
        <SheetShell
          eyebrow={headerCategory}
          title={hazard.hazard}
          description={
            <span className="inline-flex items-center gap-2">
              <RiskPill riskRating={hazard.riskRating} />
              <span className="text-[12px] text-white tabular-nums">
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
              {/* This button used to fire the toast and nothing else — it told
                  the user "Hazard added to your current RAMS document" while
                  adding nothing anywhere. It now calls the RAMS context that
                  was already in scope (the whole hub renders inside
                  RAMSProvider), passing the hazard's real likelihood and
                  severity plus its full control hierarchy. */}
              <PrimaryButton fullWidth onClick={handleAddToRAMS}>
                Add to RAMS
              </PrimaryButton>
            </>
          }
        >
          {/* Risk accent line — bleeds to the sheet edges */}
          <div className={cn('-mx-5 -mt-5 mb-1 h-0.5 bg-gradient-to-r', toneAccent[tone])} />

          {/* Consequence */}
          <p className="text-[13px] text-white leading-relaxed">{hazard.consequence}</p>

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
                        ? cn('border-elec-yellow/35', CARD_SURFACE)
                        : // A tier with nothing in it is still meaningful — it
                          // says elimination wasn't achievable here. Dimmed to
                          // 60% rather than 50%: at 50% the label fell below a
                          // readable contrast on a phone in daylight.
                          'border-white/[0.08] bg-white/[0.02] opacity-60'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 shrink-0 text-[11px] font-medium tabular-nums text-elec-yellow">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[13px] font-medium text-white flex-1">
                        {step.label}
                      </span>
                      {hasControls && (
                        <span className="text-[11px] text-white tabular-nums">
                          {measures.length}
                        </span>
                      )}
                    </div>
                    {hasControls && (
                      <ul className="space-y-1.5 mt-2 pl-8">
                        {measures.map((measure, i) => (
                          <li
                            key={i}
                            className="text-[12.5px] text-white leading-relaxed flex gap-2"
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
                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11.5px] text-white bg-white/[0.05] border border-white/10"
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
              <SafetyListCard>
                {hazard.guidanceNotes.map((note, i) => (
                  <div
                    key={i}
                    className="px-5 py-3 text-[12.5px] text-white leading-relaxed flex gap-2.5"
                  >
                    <span aria-hidden className="text-elec-yellow/70 mt-0.5">
                      •
                    </span>
                    <span>{note}</span>
                  </div>
                ))}
              </SafetyListCard>
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
                    <span className="text-[12.5px] text-white leading-relaxed">{proc}</span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Training required */}
          {hazard.trainingRequired && hazard.trainingRequired.length > 0 && (
            <CollapsibleSection title="Training required" count={hazard.trainingRequired.length}>
              <SafetyListCard>
                {hazard.trainingRequired.map((training, i) => (
                  <div
                    key={i}
                    className="px-5 py-3 text-[12.5px] text-white leading-relaxed flex gap-2.5"
                  >
                    <span aria-hidden className="text-emerald-400 mt-0.5">
                      ✓
                    </span>
                    <span>{training}</span>
                  </div>
                ))}
              </SafetyListCard>
            </CollapsibleSection>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
};

export default HazardDetailSheet;
