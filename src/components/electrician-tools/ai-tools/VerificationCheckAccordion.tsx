/**
 * VerificationCheckAccordion — editorial verification check list.
 *
 * Drops green/red/amber flood backgrounds and the icon avatar boxes for
 * editorial gradient surfaces with semantic text-only status accents.
 * Each check is numbered, expandable to "What this means / Why it matters /
 * Assessment / Refs / Confidence" — all type-led.
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { BS7671ReferenceTooltip } from './BS7671ReferenceTooltip';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface VerificationCheck {
  check_name: string;
  status: 'pass' | 'fail' | 'requires_testing';
  details: string;
  bs7671_references: string[];
  confidence: number;
}

interface VerificationCheckAccordionProps {
  checks: VerificationCheck[];
}

const statusTone = (status: string) => {
  switch (status) {
    case 'pass':
      return { tone: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/[0.08]', label: 'Pass' };
    case 'fail':
      return { tone: 'text-red-300 border-red-500/40 bg-red-500/[0.08]', label: 'Fail' };
    default:
      return {
        tone: 'text-amber-300 border-amber-500/40 bg-amber-500/[0.08]',
        label: 'Test required',
      };
  }
};

const getExplanation = (checkName: string): { what: string; why: string } => {
  const explanations: Record<string, { what: string; why: string }> = {
    'Protective Device Verification': {
      what: 'Verifies that circuit breakers, RCDs, or fuses are correctly rated and properly installed.',
      why: 'Incorrect protective devices can fail to disconnect during faults — fire and shock risk.',
    },
    'Earth Continuity': {
      what: 'Checks that protective conductors are continuous and properly connected throughout.',
      why: "A broken earth path means equipment isn't safely earthed — lethal shock risk on a fault.",
    },
    'Cable Sizing': {
      what: 'Confirms cables are adequately sized for the load they carry and the install method.',
      why: 'Undersized cables overheat under load — fire risk, cable failure.',
    },
    'Segregation of Circuits': {
      what: 'Ensures different voltage/safety levels (SELV, mains) are properly separated.',
      why: 'Mixing incompatible circuits can put dangerous voltages on low-voltage systems.',
    },
    'Circuit Protection Coordination': {
      what: 'Verifies protective devices coordinate so the correct device operates during a fault.',
      why: 'Poor coordination = unaffected circuits lose supply, or dangerous faults left uncleared.',
    },
  };

  return (
    explanations[checkName] || {
      what: 'This check verifies compliance with BS 7671 wiring regulations.',
      why: 'Non-compliance creates safety hazards and may invalidate insurance or certification.',
    }
  );
};

export const VerificationCheckAccordion = ({ checks }: VerificationCheckAccordionProps) => {
  return (
    <Accordion type="multiple" className="space-y-2">
      {checks.map((check, index) => {
        const config = statusTone(check.status);
        const explanation = getExplanation(check.check_name);
        const confidencePercent = Math.round((check.confidence || 0.7) * 100);
        const confidenceTone =
          confidencePercent >= 90
            ? 'text-emerald-300'
            : confidencePercent >= 70
              ? 'text-elec-yellow'
              : 'text-amber-300';

        return (
          <AccordionItem
            key={index}
            value={`check-${index}`}
            className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] overflow-hidden"
          >
            <AccordionTrigger className="px-5 py-4 hover:bg-white/[0.02] [&[data-state=open]]:bg-white/[0.03] transition-colors hover:no-underline">
              <div className="flex items-baseline gap-3 flex-1 text-left min-w-0">
                <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] font-semibold tracking-tight text-white leading-tight">
                    {check.check_name}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1.5 flex-wrap">
                    <span
                      className={cn(
                        'inline-flex items-center text-[10px] uppercase tracking-[0.14em] font-semibold border rounded-md px-1.5 py-0.5',
                        config.tone
                      )}
                    >
                      {config.label}
                    </span>
                    <span
                      className={cn(
                        'text-[10.5px] uppercase tracking-[0.14em] font-semibold tabular-nums',
                        confidenceTone
                      )}
                    >
                      {confidencePercent}% confidence
                    </span>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5 space-y-5 border-t border-white/[0.06] pt-4">
              {/* What this means */}
              <div className="space-y-2">
                <Eyebrow>WHAT THIS MEANS</Eyebrow>
                <p className="text-[12.5px] leading-relaxed text-white">{explanation.what}</p>
              </div>

              {/* Why it matters */}
              <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                <Eyebrow>WHY IT MATTERS</Eyebrow>
                <p className="text-[12.5px] leading-relaxed text-white">{explanation.why}</p>
              </div>

              {/* Details */}
              <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                <Eyebrow>ASSESSMENT</Eyebrow>
                <p className="text-[12.5px] leading-relaxed text-white">{check.details}</p>
              </div>

              {/* References */}
              {check.bs7671_references && check.bs7671_references.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                  <Eyebrow>BS 7671 REFS</Eyebrow>
                  <div className="flex flex-wrap gap-1.5">
                    {check.bs7671_references.map((ref, idx) => (
                      <BS7671ReferenceTooltip key={idx} reference={ref} />
                    ))}
                  </div>
                </div>
              )}

              {/* Confidence */}
              <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                <div className="flex items-baseline justify-between gap-2">
                  <Eyebrow>AI CONFIDENCE</Eyebrow>
                  <span className={cn('text-[11.5px] font-semibold tabular-nums', confidenceTone)}>
                    {confidencePercent}%
                  </span>
                </div>
                <Progress value={confidencePercent} className="h-1.5" />
                <p className="text-[11px] text-white/65">
                  {confidencePercent >= 90
                    ? 'High — assessment is reliable.'
                    : confidencePercent >= 70
                      ? 'Good — likely accurate; on-site testing recommended.'
                      : 'Moderate — professional verification recommended.'}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
