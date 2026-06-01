import { useState } from 'react';
import { Lightbulb, AlertTriangle, BookOpen, Calculator, ChevronDown, Info } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { CalculatorDivider } from './CalculatorCard';
import { CALCULATOR_CONFIG, type CalculatorCategory } from './CalculatorConfig';
import type { CalculatorContent } from '@/components/apprentice/calculators/content/types';

interface CalculatorEditorialProps {
  /** The grounded content object for this calculator. */
  content: CalculatorContent;
  /** Category, used for accent colour (matches the calculator's CalculatorCard). */
  category: CalculatorCategory;
}

/**
 * Shared editorial layer rendered beneath a calculator's result.
 *
 * Renders up to two collapsibles — "Guidance" (why it matters / when to check /
 * common mistakes) and "Standards & Worked Example" — from grounded content.
 * Sections with no content are omitted; the whole block renders nothing when
 * there is nothing to show.
 *
 * Provenance is framed as the governing standard ("BS 7671", "BS 5266"…). The
 * internal grounding metadata on the content object is never rendered.
 */
export const CalculatorEditorial = ({ content, category }: CalculatorEditorialProps) => {
  const config = CALCULATOR_CONFIG[category];
  const [showGuidance, setShowGuidance] = useState(false);
  const [showStandards, setShowStandards] = useState(false);

  const hasGuidance =
    content.whyItMatters.length > 0 ||
    (content.whenToCheck?.length ?? 0) > 0 ||
    (content.commonMistakes?.length ?? 0) > 0;

  const hasStandardsSection =
    content.standards.length > 0 ||
    !!content.workedExample ||
    (content.quickReference?.rows.length ?? 0) > 0;

  if (!hasGuidance && !hasStandardsSection) return null;

  return (
    <>
      {/* Guidance */}
      {hasGuidance && (
        <>
          <CalculatorDivider category={category} />
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-4 w-4" style={{ color: config.gradientFrom }} />
                <span className="text-sm sm:text-base font-medium text-white">Guidance</span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showGuidance && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <div className="space-y-4">
                {/* Why it matters */}
                {content.whyItMatters.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <Info className="h-4 w-4" style={{ color: config.gradientFrom }} />
                      <span className="font-medium text-white">Why it matters</span>
                    </div>
                    <div className="space-y-2">
                      {content.whyItMatters.map((text, i) => (
                        <div
                          key={i}
                          className="border-l-2 pl-3"
                          style={{ borderColor: `${config.gradientFrom}40` }}
                        >
                          <p className="text-sm text-white">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* When to check */}
                {(content.whenToCheck?.length ?? 0) > 0 && (
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-4 w-4" style={{ color: config.gradientFrom }} />
                      <span className="font-medium text-white">When to check</span>
                    </div>
                    <ul className="space-y-1 text-sm text-white">
                      {content.whenToCheck!.map((text, i) => (
                        <li key={i}>• {text}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Common mistakes */}
                {(content.commonMistakes?.length ?? 0) > 0 && (
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      <span className="font-medium text-white">Common mistakes</span>
                    </div>
                    <ul className="space-y-1 text-sm text-white">
                      {content.commonMistakes!.map((text, i) => (
                        <li key={i}>• {text}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </>
      )}

      {/* Standards & Worked Example */}
      {hasStandardsSection && (
        <>
          <CalculatorDivider category={category} />
          <Collapsible open={showStandards} onOpenChange={setShowStandards}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4" style={{ color: config.gradientFrom }} />
                <span className="text-sm sm:text-base font-medium text-white">
                  Standards &amp; Worked Example
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showStandards && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <div className="space-y-4">
                {/* Worked example */}
                {content.workedExample && (
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <Calculator className="h-4 w-4" style={{ color: config.gradientFrom }} />
                      <span className="font-medium text-white">Worked example</span>
                    </div>
                    <p className="text-sm text-white mb-3">{content.workedExample.scenario}</p>
                    {content.workedExample.inputs.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {content.workedExample.inputs.map((input, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-lg bg-white/[0.04] border border-white/5"
                          >
                            <p className="text-xs text-white/60">{input.label}</p>
                            <p className="text-sm text-white font-medium">{input.value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="p-3 rounded-lg bg-black/30 font-mono text-xs space-y-1">
                      {content.workedExample.steps.map((step, i) => (
                        <p key={i} className="text-white">
                          {step}
                        </p>
                      ))}
                    </div>
                    <p
                      className="text-sm font-semibold mt-3"
                      style={{ color: config.gradientFrom }}
                    >
                      {content.workedExample.result}
                    </p>
                  </div>
                )}

                {/* Quick reference table */}
                {content.quickReference && content.quickReference.rows.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="h-4 w-4" style={{ color: config.gradientFrom }} />
                      <span className="font-medium text-white">{content.quickReference.title}</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            {content.quickReference.columns.map((col, i) => (
                              <th
                                key={i}
                                className={cn(
                                  'py-2 text-white',
                                  i === 0 ? 'text-left' : 'text-center'
                                )}
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="text-white text-xs">
                          {content.quickReference.rows.map((row, ri) => (
                            <tr key={ri} className="border-b border-white/5 last:border-0">
                              {row.map((cell, ci) => (
                                <td
                                  key={ci}
                                  className={cn('py-1.5', ci === 0 ? 'text-left' : 'text-center')}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {content.quickReference.footnote && (
                      <p className="text-xs text-white/60 mt-2">{content.quickReference.footnote}</p>
                    )}
                  </div>
                )}

                {/* Standards references */}
                {content.standards.map((citation, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.04] border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4" style={{ color: config.gradientFrom }} />
                      <span className="font-medium text-white">{citation.citation}</span>
                    </div>
                    <p className="text-sm text-white">{citation.clauseText}</p>
                    {citation.tableRefs && citation.tableRefs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {citation.tableRefs.map((ref, ti) => (
                          <span
                            key={ti}
                            className="px-2 py-0.5 rounded-md text-xs text-white"
                            style={{
                              background: `${config.gradientFrom}15`,
                              border: `1px solid ${config.gradientFrom}30`,
                            }}
                          >
                            {ref}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </>
      )}
    </>
  );
};

export default CalculatorEditorial;
