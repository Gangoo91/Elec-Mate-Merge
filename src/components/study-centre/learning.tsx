/**
 * Learning content primitives — editorial flow first, cards only where they
 * earn their keep.
 *
 * Pedagogy choices:
 *   - The page reads like an article, not a Trello board. Most blocks are
 *     typographic with hairline rules, not full cards.
 *   - Cards are reserved for elements that genuinely need to interrupt the
 *     flow: TLDR (the upfront promise), RegsCallout (an actual quote you
 *     should remember), CommonMistake (a warning), Quiz/InlineCheck
 *     (interactive). Everything else is prose.
 *   - Existing Quiz/InlineCheck preserved; they wire into stats + streaks.
 */

import { type ReactNode, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Quote,
  ScrollText,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ── TLDR — the upfront promise. Card. ─────────────────────────────── */

interface TLDRProps {
  points: string[];
  className?: string;
}

export function TLDR({ points, className }: TLDRProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-elec-yellow/20 p-5 sm:p-6',
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-amber-400/70 to-orange-400/70 opacity-80" />
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-3.5 w-3.5 text-elec-yellow" />
        <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
          In 30 seconds
        </span>
      </div>
      <ul className="space-y-2">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[14px] text-white leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-elec-yellow shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── ConceptBlock — typographic. NOT a card. Just an editorial section. ── */

interface ConceptBlockProps {
  title: string;
  children: ReactNode;
  /**
   * Optional inline asides — render as italicised paragraphs with a thin
   * left rule rather than separate sub-cards.
   */
  onSite?: ReactNode;
  plainEnglish?: ReactNode;
  className?: string;
}

export function ConceptBlock({
  title,
  children,
  onSite,
  plainEnglish,
  className,
}: ConceptBlockProps) {
  return (
    <section className={cn('space-y-3', className)}>
      <h3 className="text-[18px] sm:text-[20px] font-semibold text-white tracking-tight leading-snug">
        {title}
      </h3>
      <div className="text-[14.5px] text-white/90 leading-relaxed space-y-3">{children}</div>

      {plainEnglish && (
        <p className="text-[13.5px] text-white/85 leading-relaxed border-l-2 border-blue-400/40 pl-4 italic">
          <span className="not-italic font-semibold text-blue-300 mr-1.5">In plain English:</span>
          {plainEnglish}
        </p>
      )}
      {onSite && (
        <p className="text-[13.5px] text-white/85 leading-relaxed border-l-2 border-elec-yellow/50 pl-4 italic">
          <span className="not-italic font-semibold text-elec-yellow mr-1.5">On site:</span>
          {onSite}
        </p>
      )}
    </section>
  );
}

/* ── RegsCallout — verbatim quote of a regulation. Card. ──────────── */

interface RegsCalloutProps {
  source: string;
  clause: ReactNode;
  meaning?: ReactNode;
  cite?: string;
  className?: string;
}

export function RegsCallout({ source, clause, meaning, cite, className }: RegsCalloutProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-[hsl(0_0%_10%)] border border-purple-500/25 overflow-hidden',
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-purple-500/70 via-violet-400/70 to-indigo-400/70 opacity-70" />
      <div className="px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-2 mb-3">
          <ScrollText className="h-3.5 w-3.5 text-purple-300" />
          <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-purple-300">
            What the regs say
          </span>
          <span className="ml-auto text-[10.5px] font-semibold text-purple-200/90">{source}</span>
        </div>

        <div className="flex items-start gap-3">
          <Quote className="h-4 w-4 text-purple-300/70 shrink-0 mt-1" />
          <blockquote className="text-[13.5px] text-white italic leading-relaxed flex-1 min-w-0">
            {clause}
          </blockquote>
        </div>

        {meaning && (
          <div className="mt-4 pt-4 border-t border-white/[0.06]">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-blue-300 mb-1.5">
              What this means for you
            </div>
            <div className="text-[13.5px] text-white leading-relaxed">{meaning}</div>
          </div>
        )}

        {cite && <div className="mt-3 text-[11px] text-white/55">{cite}</div>}
      </div>
    </div>
  );
}

/* ── CommonMistake — warning. Card (this one needs to interrupt). ── */

interface CommonMistakeProps {
  title: string;
  whatHappens: ReactNode;
  doInstead: ReactNode;
  className?: string;
}

export function CommonMistake({ title, whatHappens, doInstead, className }: CommonMistakeProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-orange-500/[0.06] border border-orange-500/25 p-5 overflow-hidden',
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-orange-500/70 via-amber-400/70 to-yellow-400/70 opacity-80" />
      <div className="flex items-start gap-3">
        <div className="shrink-0 h-8 w-8 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
          <AlertTriangle className="h-4 w-4 text-orange-300" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-orange-300">
            Common mistake
          </div>
          <h4 className="mt-1 text-[15px] font-semibold text-white tracking-tight">{title}</h4>
          <div className="mt-3 space-y-2.5 text-[13.5px] leading-relaxed">
            <p className="text-white/95">
              <span className="font-semibold text-orange-200">What goes wrong: </span>
              {whatHappens}
            </p>
            <p className="text-white/95">
              <span className="font-semibold text-emerald-300">Do this instead: </span>
              {doInstead}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Scenario — typographic. NOT a card. Editorial inset. ─────────── */

interface ScenarioProps {
  title: string;
  situation: ReactNode;
  whatToDo: ReactNode;
  whyItMatters?: ReactNode;
  className?: string;
}

export function Scenario({
  title,
  situation,
  whatToDo,
  whyItMatters,
  className,
}: ScenarioProps) {
  return (
    <section className={cn('space-y-3 border-l-2 border-cyan-400/40 pl-4 sm:pl-5', className)}>
      <div className="flex items-center gap-2">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-cyan-300">
          Scenario
        </span>
      </div>
      <h4 className="text-[16px] sm:text-[17px] font-semibold text-white tracking-tight leading-snug">
        {title}
      </h4>
      <div className="text-[14px] text-white/90 leading-relaxed space-y-2.5">
        <p>
          <span className="font-semibold text-white/80">The situation: </span>
          {situation}
        </p>
        <p>
          <span className="font-semibold text-emerald-300">What to do: </span>
          {whatToDo}
        </p>
        {whyItMatters && (
          <p className="text-[13px] text-white/75 italic">
            <span className="not-italic font-semibold text-white/70">Why it matters: </span>
            {whyItMatters}
          </p>
        )}
      </div>
    </section>
  );
}

/* ── KeyTakeaways — typographic list, not a card ──────────────────── */

interface KeyTakeawaysProps {
  points: string[];
  title?: string;
  className?: string;
}

export function KeyTakeaways({
  points,
  title = 'Worth remembering',
  className,
}: KeyTakeawaysProps) {
  return (
    <section className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-emerald-300">
          {title}
        </span>
      </div>
      <ul className="space-y-2.5">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-[14px] text-white/95 leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── FAQ — accordion, hairline-only ───────────────────────────────── */

interface FAQItem {
  question: string;
  answer: ReactNode;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  className?: string;
}

export function FAQ({ items, title = 'Common questions', className }: FAQProps) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-blue-300">
          {title}
        </span>
      </div>
      <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {items.map((item, i) => {
          const isOpen = open.has(i);
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-3 text-left py-3.5 hover:bg-white/[0.02] transition-colors touch-manipulation"
              >
                <span className="flex-1 text-[14.5px] text-white font-medium leading-snug">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 text-white/60 shrink-0 transition-transform',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>
              {isOpen && (
                <div className="pb-4 pr-7 text-[13.5px] text-white/90 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ── ContentEyebrow — small section break. Just a label, no card. ── */

export function ContentEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85 pt-2">
      {children}
    </div>
  );
}

/* ── SectionRule — subtle horizontal break between major shifts ──── */

export function SectionRule() {
  return <hr className="border-0 h-px bg-white/[0.06] my-2" />;
}

/* ── Re-export the existing AM2LearningOutcomes (already editorial) ─ */

export { AM2LearningOutcomes as LearningOutcomes } from '@/components/apprentice-courses/AM2LearningOutcomes';
