/**
 * Renewable Design Suite — shared UI primitives.
 *
 * One visual language for all four designers (solar, battery, EV, heat pump):
 * the editorial masthead + step rail + check cards mirror the renewable
 * calculators so the suite reads as one product, not four pages.
 */

import { type ReactNode, useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, ChevronDown, ChevronRight, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { DesignCheck } from '@/utils/renewables/designEngine';

export const inputCn =
  'h-12 text-base touch-manipulation bg-white/[0.05] border-white/[0.12] text-white rounded-lg focus:border-elec-yellow/60 focus:ring-elec-yellow/20';

// ── shell ───────────────────────────────────────────────────────────────────

interface DesignShellProps {
  eyebrow: string;
  title: string;
  standard: string;
  description: string;
  steps: string[];
  activeStep: number;
  maxReachedStep: number;
  onStepChange: (i: number) => void;
  aiNotes?: string[];
  /** Live design status — sticky right column on desktop. */
  aside?: ReactNode;
  /** Live design status — compact strip under the step rail on mobile. */
  pulse?: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}

export function DesignShell({
  eyebrow,
  title,
  standard,
  description,
  steps,
  activeStep,
  maxReachedStep,
  onStepChange,
  aiNotes,
  aside,
  pulse,
  children,
  footer,
}: DesignShellProps) {
  const navigate = useNavigate();
  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-32">
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-white/[0.08]">
        <div className="px-4 sm:px-6 lg:px-10 w-full">
          <button
            type="button"
            onClick={() => navigate('/electrician/renewables/design')}
            className="group flex items-center gap-2 h-12 -ml-1 pr-3 text-white hover:text-elec-yellow transition-colors touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em]">
              Design Suite
            </span>
          </button>
        </div>
      </div>

      <main className="px-4 sm:px-6 lg:px-10 w-full">
        <header className="pt-5 sm:pt-7 pb-5 border-b border-white/[0.1]">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-elec-yellow" aria-hidden />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-white">
              {eyebrow}
            </span>
          </div>
          <div className="mt-3 flex items-start justify-between gap-4">
            <h1 className="text-[27px] sm:text-[36px] font-bold tracking-[-0.02em] leading-[1.04] text-white max-w-[20ch]">
              {title}
            </h1>
            <span className="hidden sm:inline-flex shrink-0 items-center text-[10px] font-bold uppercase tracking-[0.14em] text-white border border-white/25 rounded-md px-2.5 py-1 mt-1.5">
              {standard}
            </span>
          </div>
          <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-white/85 max-w-[72ch]">
            {description}
          </p>
        </header>

        {/* step rail */}
        <nav className="mt-5 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto" aria-label="Design steps">
          <ol className="flex items-center gap-2 min-w-max">
            {steps.map((s, i) => {
              const done = i < activeStep;
              const reachable = i <= maxReachedStep;
              return (
                <li key={s} className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={!reachable}
                    aria-current={i === activeStep ? 'step' : undefined}
                    onClick={() => reachable && onStepChange(i)}
                    className={cn(
                      'flex items-center gap-2 h-11 rounded-full pl-2.5 pr-3.5 border transition-colors touch-manipulation',
                      i === activeStep
                        ? 'bg-elec-yellow text-black border-elec-yellow font-bold'
                        : done
                          ? 'bg-elec-yellow/[0.1] text-white border-elec-yellow/35'
                          : reachable
                            ? 'bg-white/[0.04] text-white/85 border-white/[0.12]'
                            : 'bg-white/[0.02] text-white/40 border-white/[0.07]'
                    )}
                  >
                    <span
                      className={cn(
                        'h-5 w-5 rounded-full grid place-items-center text-[10.5px] font-bold tabular-nums',
                        i === activeStep
                          ? 'bg-black/15 text-black'
                          : done
                            ? 'bg-elec-yellow/25 text-elec-yellow'
                            : 'bg-white/[0.08] text-white/70'
                      )}
                    >
                      {done ? <Check className="h-3 w-3" /> : i + 1}
                    </span>
                    <span className="text-[12.5px] whitespace-nowrap">{s}</span>
                  </button>
                  {i < steps.length - 1 && <span className="h-px w-3 bg-white/[0.15]" />}
                </li>
              );
            })}
          </ol>
        </nav>

        {aiNotes && aiNotes.length > 0 && (
          <div className="mt-5 rounded-2xl border border-elec-yellow/25 bg-elec-yellow/[0.05] px-4 py-3.5">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-elec-yellow">
              Proposed from your description — check the assumptions
            </p>
            <ul className="mt-2 space-y-1">
              {aiNotes.map((n, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[12.5px] leading-relaxed text-white/85"
                >
                  <span className="mt-[7px] h-1 w-1 rounded-full bg-elec-yellow/80 shrink-0" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {pulse && <div className="lg:hidden mt-4">{pulse}</div>}

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10 lg:items-start">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-6 min-w-0"
          >
            {children}
          </motion.div>
          {aside && (
            <aside className="hidden lg:block lg:sticky lg:top-[4.5rem] mt-6">{aside}</aside>
          )}
        </div>
      </main>

      {/* sticky footer actions — pad for the iOS home indicator */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-white/[0.1] pb-[env(safe-area-inset-bottom)]">
        <div className="px-4 sm:px-6 lg:px-10 py-3 flex items-center gap-2.5 max-w-screen-lg">
          {footer}
        </div>
      </div>
    </div>
  );
}

// ── form bits ───────────────────────────────────────────────────────────────

export function NumField({
  label,
  unit,
  value,
  onChange,
  step,
  hint,
  min = 0,
}: {
  label: string;
  unit?: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
  hint?: string;
  /** Values are clamped to this floor — design quantities are never negative. */
  min?: number;
}) {
  const [text, setText] = useState<string | null>(null);
  const id = useId();
  return (
    <div>
      <Label
        htmlFor={id}
        className="text-white text-[11.5px] font-medium mb-1.5 block tracking-wide"
      >
        {label}
        {unit ? <span className="text-white/60 font-normal"> · {unit}</span> : null}
      </Label>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        step={step}
        min={min}
        value={text ?? String(value)}
        onChange={(e) => {
          setText(e.target.value);
          const n = parseFloat(e.target.value);
          if (Number.isFinite(n)) onChange(Math.max(min, n));
        }}
        onBlur={() => setText(null)}
        className={inputCn}
      />
      {hint && <p className="mt-1 text-[10.5px] text-white/55 leading-snug">{hint}</p>}
    </div>
  );
}

export function Segmented<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string; sub?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <Label className="text-white text-[11.5px] font-medium mb-1.5 block tracking-wide">
        {label}
      </Label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((o) => (
          <button
            key={String(o.value)}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              'min-h-[44px] rounded-xl border px-3 py-2.5 text-left transition-colors touch-manipulation',
              value === o.value
                ? 'bg-elec-yellow/[0.12] border-elec-yellow/50'
                : 'bg-white/[0.03] border-white/[0.1] hover:border-white/[0.2]'
            )}
          >
            <span
              className={cn(
                'block text-[13px] font-semibold',
                value === o.value ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {o.label}
            </span>
            {o.sub && <span className="block text-[10.5px] text-white/60 mt-0.5">{o.sub}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.1] pb-1.5">
      <h2 className="text-[11px] font-bold text-white uppercase tracking-[0.18em]">{children}</h2>
    </div>
  );
}

// ── results ─────────────────────────────────────────────────────────────────

export function FigureGrid({
  figures,
}: {
  figures: { label: string; value: string; sub?: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {figures.map((o, i) => (
        <div key={i} className="rounded-xl bg-black/40 border border-white/[0.1] p-3">
          <p className="text-[10px] uppercase tracking-[0.12em] text-white/70 font-medium">
            {o.label}
          </p>
          <p className="text-[17px] font-semibold text-white mt-0.5 tabular-nums leading-tight">
            {o.value}
          </p>
          {o.sub && <p className="text-[10.5px] text-white/65 mt-0.5">{o.sub}</p>}
        </div>
      ))}
    </div>
  );
}

export function CheckCard({ check }: { check: DesignCheck }) {
  const [open, setOpen] = useState(false);
  const r = check.result;
  return (
    <div
      className={cn(
        'rounded-2xl border overflow-hidden',
        r.ok ? 'border-white/[0.1] bg-white/[0.025]' : 'border-red-500/35 bg-red-500/[0.05]'
      )}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/70">
              {check.title} · {check.standard}
            </p>
            <p
              className={cn(
                'mt-1 font-bold leading-tight tracking-tight',
                r.ok ? 'text-[19px] text-elec-yellow' : 'text-[17px] text-red-400'
              )}
            >
              {r.headline}
            </p>
          </div>
          <span
            className={cn(
              'shrink-0 mt-0.5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] rounded-md px-2 py-1 border',
              r.ok
                ? 'text-emerald-300 border-emerald-400/30 bg-emerald-500/[0.08]'
                : 'text-red-300 border-red-400/30 bg-red-500/[0.08]'
            )}
          >
            {r.ok ? 'Pass' : 'Check'}
          </span>
        </div>
        {r.takeaway && (
          <p className="mt-2 text-[13px] leading-relaxed text-white/90">{r.takeaway}</p>
        )}
        {r.outputs.length > 0 && (
          <div className="mt-3">
            <FigureGrid figures={r.outputs} />
          </div>
        )}
        {r.warnings.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {r.warnings.map((w, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-[12px] leading-relaxed text-amber-100"
              >
                <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-amber-300" />
                <span>{w}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 sm:px-5 h-11 border-t border-white/[0.08] text-white/75 hover:text-white touch-manipulation"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
          How we worked it out
        </span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="px-4 sm:px-5 pb-4 space-y-3">
          <ol className="space-y-2">
            {r.working.map((w, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-0.5 h-5 w-5 shrink-0 rounded-md bg-elec-yellow/15 border border-elec-yellow/30 grid place-items-center text-[10.5px] font-bold text-elec-yellow tabular-nums">
                  {i + 1}
                </span>
                <span className="text-[12.5px] leading-relaxed text-white">{w}</span>
              </li>
            ))}
          </ol>
          {r.basis && (
            <div className="flex items-start gap-2 pt-1 border-t border-white/[0.07]">
              <ChevronRight className="h-3.5 w-3.5 mt-1 text-elec-yellow shrink-0" />
              <p className="text-[12px] leading-relaxed text-white/80 pt-0.5">{r.basis}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Live design status — the always-visible answer to "is this design OK and
 * what does it add up to". Desktop: sticky card with hero figures, every
 * check as a live verdict line, and room for the SLD. Mobile: one horizontal
 * strip of chips under the step rail.
 */
export function DesignStatus({
  figures,
  checks,
  compact,
  emptyHint,
  children,
}: {
  figures: { label: string; value: string }[];
  checks: DesignCheck[];
  compact?: boolean;
  /** Shown before there's anything to report (no kit chosen yet). */
  emptyHint?: string;
  children?: ReactNode;
}) {
  const passing = checks.filter((c) => c.result.ok).length;
  const allOk = checks.length > 0 && passing === checks.length;
  const hasContent = figures.length > 0 || checks.length > 0;

  if (compact) {
    if (!hasContent) return null;
    return (
      <div
        className="flex gap-2 overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 pb-0.5"
        aria-label="Design status"
      >
        {figures.map((f, i) => (
          <span
            key={i}
            className="shrink-0 inline-flex items-baseline gap-1.5 rounded-full bg-white/[0.05] border border-white/[0.12] px-3 py-1.5"
          >
            <span className="text-[13px] font-bold text-white tabular-nums">{f.value}</span>
            <span className="text-[10px] uppercase tracking-[0.1em] text-white/60">{f.label}</span>
          </span>
        ))}
        {checks.length > 0 && (
          <span
            className={cn(
              'shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 border',
              allOk
                ? 'bg-emerald-500/[0.08] border-emerald-400/30 text-emerald-300'
                : 'bg-amber-500/[0.08] border-amber-400/30 text-amber-200'
            )}
          >
            <span
              className={cn('h-1.5 w-1.5 rounded-full', allOk ? 'bg-emerald-400' : 'bg-amber-400')}
            />
            <span className="text-[11.5px] font-bold tabular-nums">
              {passing}/{checks.length} checks
            </span>
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.12] bg-white/[0.02] overflow-hidden">
      <div className="px-5 pt-4 pb-3 flex items-center justify-between gap-3 border-b border-white/[0.08]">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/80">
          Design status
        </p>
        {checks.length > 0 && (
          <span
            className={cn(
              'inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] rounded-md px-2 py-1 border',
              allOk
                ? 'text-emerald-300 border-emerald-400/30 bg-emerald-500/[0.08]'
                : 'text-amber-200 border-amber-400/30 bg-amber-500/[0.08]'
            )}
          >
            {passing}/{checks.length} pass
          </span>
        )}
      </div>
      <div className="p-5 space-y-4">
        {!hasContent && emptyHint && (
          <p className="text-[12.5px] leading-relaxed text-white/60">{emptyHint}</p>
        )}
        {figures.length > 0 && <FigureGrid figures={figures} />}
        {checks.length > 0 && (
          <ul className="space-y-1.5">
            {checks.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 min-w-0">
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full shrink-0',
                      c.result.ok ? 'bg-emerald-400' : 'bg-amber-400'
                    )}
                  />
                  <span className="text-[12px] text-white/85 truncate">{c.title}</span>
                </span>
                <span
                  className={cn(
                    'text-[11.5px] font-semibold tabular-nums shrink-0 max-w-[45%] truncate',
                    c.result.ok ? 'text-white/70' : 'text-amber-200'
                  )}
                >
                  {c.result.headline}
                </span>
              </li>
            ))}
          </ul>
        )}
        {children}
      </div>
    </div>
  );
}

export function FooterNav({
  onBack,
  onNext,
  nextLabel = 'Continue',
  nextDisabled,
  backLabel = 'Back',
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  backLabel?: string;
}) {
  return (
    <>
      {onBack && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="h-12 px-4 rounded-xl text-white hover:text-white hover:bg-white/[0.08] touch-manipulation"
        >
          {backLabel}
        </Button>
      )}
      <Button
        onClick={onNext}
        disabled={nextDisabled}
        className="flex-1 h-12 rounded-xl bg-elec-yellow text-black font-bold text-[15px] hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation disabled:opacity-40"
      >
        {nextLabel}
      </Button>
    </>
  );
}
