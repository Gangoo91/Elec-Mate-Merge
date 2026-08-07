import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import type { CalculatorCategory } from './CalculatorConfig';
import type { CalculatorContent } from '@/components/apprentice/calculators/content/types';

interface CalculatorEditorialProps {
  /** The grounded content object for this calculator. */
  content: CalculatorContent;
  /** Kept for call-site compatibility; no longer drives colour. */
  category?: CalculatorCategory;
}

/**
 * Shared editorial layer rendered beneath a calculator's result.
 *
 * Two collapsibles — "Guidance" and "Standards & worked example" — built from
 * grounded content. Sections with no content are omitted; the whole block
 * renders nothing when there is nothing to show.
 *
 * ── What this replaces ──────────────────────────────────────────────────
 *
 * A BLUE FOCUS RING. `.calculator-collapsible-trigger` set no focus-visible
 * style, so keyboard focus fell through to the browser's default blue outline —
 * on a black-and-volt page, on the one control every calculator shows.
 *
 * SIX ICONS. A lightbulb on "Guidance", an info circle on "Why it matters", a
 * second lightbulb on "When to check", an amber triangle on "Common mistakes",
 * a calculator on "Worked example" and a book on three more. The design system
 * is explicit that section headings are typography — no icons, no coloured
 * dots. The words already say what each block is.
 *
 * THREE LEVELS OF BOX. A collapsible containing a card containing sub-cards,
 * each on `bg-white/[0.04] border-white/5` — a fill four points off the page
 * inside another fill four points off the page. Sections are separated by a
 * rule and a heading now, which is how the rest of the app does it.
 *
 * PER-CATEGORY ACCENT COLOUR. `config.gradientFrom` was piped into inline
 * styles on eight elements, so an Ohm's Law heading was a different colour from
 * a Zs heading for no reason a user could act on. Volt throughout.
 *
 * Provenance is framed as the governing standard ("BS 7671", "BS 5266"…). The
 * internal grounding metadata on the content object is never rendered.
 */
export const CalculatorEditorial = ({ content }: CalculatorEditorialProps) => {
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
    <div className="mt-4 space-y-2.5">
      {hasGuidance && (
        <Disclosure label="Guidance" open={showGuidance} onOpenChange={setShowGuidance}>
          <Block title="Why it matters">
            {content.whyItMatters.map((text, i) => (
              <p key={i} className="text-[13px] leading-relaxed text-white">
                {text}
              </p>
            ))}
          </Block>

          {(content.whenToCheck?.length ?? 0) > 0 && (
            <Block title="When to check">
              <Bullets items={content.whenToCheck!} />
            </Block>
          )}

          {(content.commonMistakes?.length ?? 0) > 0 && (
            <Block title="Common mistakes">
              <Bullets items={content.commonMistakes!} />
            </Block>
          )}
        </Disclosure>
      )}

      {hasStandardsSection && (
        <Disclosure
          label="Standards & worked example"
          open={showStandards}
          onOpenChange={setShowStandards}
        >
          {content.workedExample && (
            <Block title="Worked example">
              <p className="text-[13px] leading-relaxed text-white">
                {content.workedExample.scenario}
              </p>

              {content.workedExample.inputs.length > 0 && (
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                  {content.workedExample.inputs.map((input, i) => (
                    <div key={i}>
                      <dt className="text-[11px] leading-tight text-white">{input.label}</dt>
                      <dd className="mt-0.5 text-[13.5px] font-semibold tabular-nums leading-tight text-white">
                        {input.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {/* The working, as a monospace block — this is the bit an
                  apprentice copies into a portfolio, so it has to line up. */}
              <div className="space-y-1 rounded-xl border border-white/[0.12] bg-black/40 p-3 font-mono text-[11.5px] leading-relaxed text-white">
                {content.workedExample.steps.map((step, i) => (
                  <p key={i}>{step}</p>
                ))}
              </div>

              <p className="text-[13.5px] font-semibold text-elec-yellow">
                {content.workedExample.result}
              </p>
            </Block>
          )}

          {content.quickReference && content.quickReference.rows.length > 0 && (
            <Block title={content.quickReference.title}>
              {/* Tables scroll inside their own box — the page never scrolls
                  sideways on a phone. */}
              <div className="-mx-1 overflow-x-auto px-1">
                <table className="w-full min-w-[420px] text-[12.5px]">
                  <thead>
                    <tr className="border-b border-white/[0.14]">
                      {content.quickReference.columns.map((col, i) => (
                        <th
                          key={i}
                          scope="col"
                          className={cn(
                            'py-2 font-semibold text-white',
                            i === 0 ? 'text-left' : 'text-center'
                          )}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {content.quickReference.rows.map((row, ri) => (
                      <tr key={ri} className="border-b border-white/[0.08] last:border-0">
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={cn(
                              'py-2 tabular-nums text-white',
                              ci === 0 ? 'text-left' : 'text-center'
                            )}
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
                <p className="text-[11.5px] leading-relaxed text-white">
                  {content.quickReference.footnote}
                </p>
              )}
            </Block>
          )}

          {content.standards.map((citation, i) => (
            <Block key={i} title={citation.citation}>
              <p className="text-[13px] leading-relaxed text-white">{citation.clauseText}</p>
              {citation.tableRefs && citation.tableRefs.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {citation.tableRefs.map((ref, ti) => (
                    <span
                      key={ti}
                      className="rounded border border-elec-yellow/50 px-1.5 py-0.5 text-[10.5px] font-semibold text-elec-yellow"
                    >
                      {ref}
                    </span>
                  ))}
                </div>
              )}
            </Block>
          ))}
        </Disclosure>
      )}
    </div>
  );
};

/**
 * One collapsible row. 44px, volt focus ring, chevron rotates.
 *
 * `focus-visible:ring-elec-yellow` is the fix for the blue default — the shared
 * `.calculator-collapsible-trigger` utility styled hover but never focus.
 */
const Disclosure = ({
  label,
  open,
  onOpenChange,
  children,
}: {
  label: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  children: React.ReactNode;
}) => (
  <Collapsible open={open} onOpenChange={onOpenChange}>
    <CollapsibleTrigger
      className={cn(
        'flex h-11 w-full items-center justify-between gap-3 rounded-xl px-3 text-left',
        'text-[14px] font-semibold text-white transition-colors touch-manipulation',
        'hover:bg-white/[0.06]',
        'focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60'
      )}
    >
      <span>{label}</span>
      <ChevronDown
        className={cn(
          'h-4 w-4 shrink-0 text-white transition-transform duration-200',
          open && 'rotate-180'
        )}
        aria-hidden
      />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div className="space-y-5 px-3 pb-1 pt-3">{children}</div>
    </CollapsibleContent>
  </Collapsible>
);

/** A titled block. A rule and a heading, not a nested card. */
const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-2 border-t border-white/[0.10] pt-3.5 first:border-0 first:pt-0">
    <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
      {title}
    </h4>
    <div className="space-y-2.5">{children}</div>
  </section>
);

/** Bulleted list with a real marker rather than a "•" typed into the text. */
const Bullets = ({ items }: { items: string[] }) => (
  <ul className="space-y-1.5">
    {items.map((text, i) => (
      <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-white">
        <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-elec-yellow" />
        <span>{text}</span>
      </li>
    ))}
  </ul>
);

export default CalculatorEditorial;
