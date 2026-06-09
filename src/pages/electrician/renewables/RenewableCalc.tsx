import { useState, useCallback } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  getCalc,
  type CalcField,
  type CalcResult,
  type CalcDef,
} from '@/utils/renewables/calcEngine';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
const inputCn =
  'h-12 text-base touch-manipulation bg-white/[0.05] border-white/[0.12] text-white rounded-lg focus:border-elec-yellow/60 focus:ring-elec-yellow/20';

const GROUP_DOT: Record<CalcDef['group'], string> = {
  Solar: 'bg-yellow-500',
  Cabling: 'bg-cyan-500',
  Grid: 'bg-blue-500',
  Battery: 'bg-emerald-500',
  'Heat Pump': 'bg-orange-500',
  EV: 'bg-violet-500',
  Finance: 'bg-rose-500',
};

const toNum = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
};

export default function RenewableCalc() {
  const navigate = useNavigate();
  const { calcId } = useParams<{ calcId: string }>();
  const def = calcId ? getCalc(calcId) : undefined;

  const [vals, setVals] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    def?.fields.forEach((f) => (init[f.key] = String(f.default)));
    return init;
  });
  const [result, setResult] = useState<CalcResult | null>(null);
  const [dirty, setDirty] = useState(false);

  const compute = useCallback(() => {
    if (!def) return;
    const nums: Record<string, number> = {};
    def.fields.forEach((f) => (nums[f.key] = toNum(vals[f.key] ?? String(f.default))));
    setResult(def.compute(nums));
    setDirty(false);
  }, [def, vals]);

  const reset = useCallback(() => {
    if (!def) return;
    const init: Record<string, string> = {};
    def.fields.forEach((f) => (init[f.key] = String(f.default)));
    setVals(init);
    setResult(null);
    setDirty(false);
  }, [def]);

  if (!def) return <Navigate to="/electrician/renewables/calculators" replace />;

  // Group fields by section (default "Inputs").
  const sections: { name: string; fields: CalcField[] }[] = [];
  for (const f of def.fields) {
    const name = f.section ?? 'Inputs';
    let s = sections.find((x) => x.name === name);
    if (!s) {
      s = { name, fields: [] };
      sections.push(s);
    }
    s.fields.push(f);
  }

  const related = (def.related ?? []).map((id) => getCalc(id)).filter(Boolean) as CalcDef[];

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-28">
      {/* Slim nav — back affordance only */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-white/[0.08]">
        <div className="px-4 sm:px-6 lg:px-10 w-full">
          <button
            type="button"
            onClick={() => navigate('/electrician/renewables/calculators')}
            className="group flex items-center gap-2 h-12 -ml-1 pr-3 text-white hover:text-elec-yellow transition-colors touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em]">
              Calculators
            </span>
          </button>
        </div>
      </div>

      <motion.main
        variants={container}
        initial="hidden"
        animate="visible"
        className="px-4 sm:px-6 lg:px-10 w-full"
      >
        {/* ── Editorial masthead ── */}
        <motion.header
          variants={item}
          className="pt-5 sm:pt-7 pb-5 sm:pb-6 border-b border-white/[0.1]"
        >
          <div className="flex items-center gap-2.5">
            <span className={cn('h-2 w-2 rounded-full', GROUP_DOT[def.group])} aria-hidden />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-white">
              {def.group} · Calculator
            </span>
          </div>
          <div className="mt-3 flex items-start justify-between gap-4">
            <h1 className="text-[27px] sm:text-[36px] font-bold tracking-[-0.02em] leading-[1.04] text-white max-w-[20ch]">
              {def.title}
            </h1>
            <span className="hidden sm:inline-flex shrink-0 items-center text-[10px] font-bold uppercase tracking-[0.14em] text-white border border-white/25 rounded-md px-2.5 py-1 mt-1.5">
              {def.standard}
            </span>
          </div>
          <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-white/85 max-w-[72ch]">
            {def.description}
          </p>
        </motion.header>

        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] gap-6 lg:gap-12 items-start">
          {/* ── Inputs column ── */}
          <motion.div variants={item} className="space-y-6">
            {sections.map((s) => (
              <section key={s.name} className="space-y-3.5">
                <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.1] pb-1.5">
                  <h2 className="text-[11px] font-bold text-white uppercase tracking-[0.18em]">
                    {s.name}
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {s.fields.map((f) => (
                    <div key={f.key}>
                      <Label className="text-white text-[11.5px] font-medium mb-1.5 block tracking-wide">
                        {f.label}
                        {f.unit ? (
                          <span className="text-white/60 font-normal"> · {f.unit}</span>
                        ) : null}
                      </Label>
                      <Input
                        type="number"
                        inputMode="decimal"
                        step={f.step}
                        value={vals[f.key] ?? ''}
                        onChange={(e) => {
                          setVals((p) => ({ ...p, [f.key]: e.target.value }));
                          setDirty(true);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') compute();
                        }}
                        className={inputCn}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* Calculate / reset */}
            <div className="flex items-center gap-2.5 pt-1">
              <Button
                onClick={compute}
                className="flex-1 h-12 rounded-xl bg-elec-yellow text-black font-bold text-[15px] hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation gap-2 shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
              >
                <Sparkles className="h-4 w-4" />
                {result ? 'Recalculate' : 'Calculate'}
              </Button>
              {result && (
                <Button
                  variant="ghost"
                  onClick={reset}
                  className="h-12 px-4 rounded-xl text-white hover:text-white hover:bg-white/[0.08] touch-manipulation gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span className="hidden sm:inline text-[13px] font-medium">Reset</span>
                </Button>
              )}
            </div>

            {def.note && (
              <p className="text-[11.5px] text-white/70 leading-relaxed border-l-2 border-elec-yellow/40 pl-3">
                {def.note}
              </p>
            )}
          </motion.div>

          {/* ── Results column ── */}
          <motion.div variants={item} className="lg:sticky lg:top-[4.5rem]">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-white/[0.1] bg-white/[0.02] overflow-hidden"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-elec-yellow/[0.1] border border-elec-yellow/25 grid place-items-center">
                        <Sparkles className="h-5 w-5 text-elec-yellow" />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-white">
                          Your result will appear here
                        </p>
                        <p className="text-[12px] text-white/70">
                          Press Calculate to run the numbers
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/[0.08] divide-y divide-white/[0.07]">
                    {[
                      {
                        t: 'Result & key figures',
                        d: 'The headline answer plus the supporting numbers',
                      },
                      { t: 'How we worked it out', d: 'Every step, with your values plugged in' },
                      { t: "Why it's like this", d: 'The reasoning and the standard behind it' },
                    ].map((row, i) => (
                      <div key={i} className="flex items-start gap-3 px-5 sm:px-6 py-3.5">
                        <span className="mt-0.5 h-5 w-5 shrink-0 rounded-md bg-white/[0.06] border border-white/[0.12] grid place-items-center text-[10.5px] font-bold text-white tabular-nums">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-[13px] font-semibold text-white">{row.t}</p>
                          <p className="text-[12px] text-white/65 leading-relaxed mt-0.5">
                            {row.d}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3.5"
                >
                  {dirty && (
                    <div className="flex items-center gap-2 text-[12px] text-amber-200 bg-amber-500/[0.08] border border-amber-500/25 rounded-lg px-3 py-2">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      <span>Inputs changed — press Recalculate to update.</span>
                    </div>
                  )}

                  {/* Headline + takeaway + key figures */}
                  <div className="rounded-2xl border border-elec-yellow/30 bg-gradient-to-b from-elec-yellow/[0.09] to-elec-yellow/[0.02] p-5 sm:p-6">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/70 font-semibold">
                      Result
                    </p>
                    <p
                      className={
                        result.ok
                          ? 'text-[32px] sm:text-[38px] font-bold text-elec-yellow leading-[1.04] mt-1 tracking-tight'
                          : 'text-[24px] sm:text-[28px] font-bold text-red-400 leading-[1.1] mt-1 tracking-tight'
                      }
                    >
                      {result.headline}
                    </p>
                    {result.takeaway && (
                      <p className="mt-3 text-[13.5px] sm:text-[14px] leading-relaxed text-white">
                        {result.takeaway}
                      </p>
                    )}
                    {result.outputs.length > 0 && (
                      <div className="grid grid-cols-2 gap-2.5 mt-4">
                        {result.outputs.map((o, i) => (
                          <div
                            key={i}
                            className="rounded-xl bg-black/40 border border-white/[0.1] p-3"
                          >
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
                    )}
                  </div>

                  {/* Working — how we got there */}
                  {result.working.length > 0 && (
                    <div className="rounded-2xl border border-white/[0.1] bg-white/[0.025] p-4 sm:p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                        How we worked it out
                      </p>
                      <ol className="mt-3 space-y-2.5">
                        {result.working.map((w, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-0.5 h-5 w-5 shrink-0 rounded-md bg-elec-yellow/15 border border-elec-yellow/30 grid place-items-center text-[10.5px] font-bold text-elec-yellow tabular-nums">
                              {i + 1}
                            </span>
                            <span className="text-[12.5px] sm:text-[13px] leading-relaxed text-white">
                              {w}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Why — the reasoning / standard basis */}
                  {result.basis && (
                    <div className="rounded-2xl border border-white/[0.1] bg-white/[0.025] p-4 sm:p-5">
                      <div className="flex items-center gap-2">
                        <ChevronRight className="h-3.5 w-3.5 text-elec-yellow" />
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                          Why it's like this
                        </p>
                      </div>
                      <p className="mt-2.5 text-[12.5px] sm:text-[13px] leading-relaxed text-white/90">
                        {result.basis}
                      </p>
                    </div>
                  )}

                  {/* Warnings */}
                  {result.warnings.length > 0 && (
                    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.07] p-4 sm:p-5 space-y-2">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-200">
                        Watch out
                      </p>
                      {result.warnings.map((w, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-[12.5px] sm:text-[13px] leading-relaxed text-amber-100"
                        >
                          <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                          <span>{w}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Next steps — related calcs */}
                  {related.length > 0 && (
                    <div className="rounded-2xl border border-white/[0.1] bg-white/[0.025] p-4 sm:p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                        Next steps
                      </p>
                      <div className="mt-3 space-y-1.5">
                        {related.map((rc) => (
                          <button
                            key={rc.id}
                            type="button"
                            onClick={() => {
                              setResult(null);
                              navigate(`/electrician/renewables/calculators/${rc.id}`);
                            }}
                            className="group w-full flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] hover:bg-elec-yellow/[0.07] border border-white/[0.08] hover:border-elec-yellow/30 px-3.5 py-3 text-left transition-colors touch-manipulation"
                          >
                            <span className="flex items-center gap-2.5 min-w-0">
                              <span
                                className={cn(
                                  'h-1.5 w-1.5 rounded-full shrink-0',
                                  GROUP_DOT[rc.group]
                                )}
                                aria-hidden
                              />
                              <span className="text-[13px] font-medium text-white truncate">
                                {rc.title}
                              </span>
                            </span>
                            <ArrowRight className="h-4 w-4 text-elec-yellow shrink-0 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}
