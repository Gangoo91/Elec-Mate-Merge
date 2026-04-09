import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

const conductors = ['L1', 'L2', 'L3', 'N', 'E'] as const;
const requiredTests: [number, number][] = [
  [1, 0], [2, 0], [2, 1], [3, 0], [3, 1], [3, 2], [4, 0], [4, 1], [4, 2], [4, 3],
];
const isRequired = (row: number, col: number) => requiredTests.some(([r, c]) => r === row && c === col);

const ProveDeadTab = ({ onBack }: { onBack: () => void }) => (
  <div>
    {/* Header */}
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
      <div className="py-2">
        <div className="flex items-center gap-3 h-11">
          <Button variant="ghost" size="icon" onClick={onBack}
            className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-base font-semibold text-white">Prove Dead Method</h1>
            <p className="text-[10px] text-white">GS38 · Reg 714.537 · EAW Reg 14</p>
          </div>
        </div>
      </div>
    </div>

    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Prove-Test-Prove */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-emerald-400 uppercase tracking-wider px-0.5">Prove-Test-Prove Method</h2>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { num: '1', title: 'PROVE', desc: 'Prove tester on a known live source', accent: 'bg-green-500/50', titleCol: 'text-green-400', borderCol: 'border-green-500/20' },
            { num: '2', title: 'TEST', desc: 'Test circuit dead at the point of work', accent: 'bg-red-500/50', titleCol: 'text-red-400', borderCol: 'border-red-500/20' },
            { num: '3', title: 'REPROVE', desc: 'Reprove tester on the same live source', accent: 'bg-green-500/50', titleCol: 'text-green-400', borderCol: 'border-green-500/20' },
          ].map((step) => (
            <div key={step.num} className={`relative rounded-2xl bg-white/[0.07] border ${step.borderCol} p-3.5 overflow-hidden`}>
              <div className={`absolute inset-x-0 top-0 h-[2px] ${step.accent}`} />
              <p className={`text-lg font-bold ${step.titleCol}`}>{step.num}</p>
              <p className={`text-[12px] font-bold ${step.titleCol} mt-1`}>{step.title}</p>
              <p className="text-[11px] text-white mt-1.5 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="relative rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 p-3.5 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/50 rounded-l-2xl" />
          <p className="text-[12px] text-white leading-relaxed">
            If the tester fails to indicate voltage at step 3, the dead test at step 2 cannot be trusted. <span className="font-bold text-amber-400">Stop work</span>, obtain a replacement tester, and repeat the entire sequence.
          </p>
        </div>
      </motion.section>

      {/* Single-phase */}
      <motion.section variants={itemVariants} className="space-y-3">
        <div className="px-0.5">
          <h2 className="text-xs font-medium text-blue-400 uppercase tracking-wider">Single-Phase Testing Order</h2>
          <p className="text-[11px] text-white mt-0.5">Always test earth connections first</p>
        </div>
        <div className="space-y-2">
          {[
            { test: 'L – E', label: 'Line to Earth', accent: 'bg-purple-500/50', border: 'border-purple-500/15', numCol: 'text-purple-400' },
            { test: 'N – E', label: 'Neutral to Earth', accent: 'bg-blue-500/50', border: 'border-blue-500/15', numCol: 'text-blue-400' },
            { test: 'L – N', label: 'Line to Neutral', accent: 'bg-orange-500/50', border: 'border-orange-500/15', numCol: 'text-orange-400' },
          ].map((item, i) => (
            <div key={i} className={`relative rounded-2xl bg-white/[0.07] border ${item.border} p-4 overflow-hidden`}>
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.accent} rounded-l-2xl`} />
              <div className="flex items-center gap-4">
                <span className={`text-xl font-bold ${item.numCol} w-8 text-center shrink-0`}>{i + 1}</span>
                <div className="flex-1">
                  <span className="font-mono font-bold text-white text-[15px]">{item.test}</span>
                  <p className="text-[12px] text-white mt-0.5">{item.label}</p>
                </div>
                <span className="text-[11px] text-white font-medium shrink-0">= 0V</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3-Phase Matrix */}
      <motion.section variants={itemVariants} className="space-y-3">
        <div className="px-0.5">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider">3-Phase Test Matrix</h2>
          <p className="text-[11px] text-white mt-0.5">10 tests required between all conductors</p>
        </div>
        <div className="relative rounded-2xl bg-white/[0.07] border border-white/[0.08] p-4 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 opacity-40" />
          <div className="overflow-x-auto" role="table" aria-label="3-phase test matrix">
            <table className="w-full text-[13px] border-collapse min-w-[280px]">
              <thead>
                <tr>
                  <th className="p-2 text-white font-medium text-left" />
                  {conductors.map((c) => (
                    <th key={c} className="p-2 text-white font-bold text-center">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {conductors.map((rowLabel, rowIdx) => (
                  <tr key={rowLabel}>
                    <td className="p-2 text-white font-bold">{rowLabel}</td>
                    {conductors.map((colLabel, colIdx) => {
                      if (colIdx === rowIdx) return <td key={colLabel} className="p-2 text-center text-white/30">&mdash;</td>;
                      if (colIdx > rowIdx) return <td key={colLabel} className="p-2" />;
                      if (isRequired(rowIdx, colIdx)) return (
                        <td key={colLabel} className="p-2 text-center">
                          <div className="w-5 h-5 rounded-md bg-green-500/20 flex items-center justify-center mx-auto">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                          </div>
                        </td>
                      );
                      return <td key={colLabel} className="p-2" />;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* Voltage Thresholds */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Voltage Danger Thresholds</h2>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="relative rounded-2xl bg-white/[0.07] border border-orange-500/15 p-4 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500/50 rounded-l-2xl" />
            <p className="text-[13px] font-bold text-orange-400">Dry Conditions</p>
            <div className="mt-2 space-y-1 text-[12px] text-white">
              <div className="flex justify-between"><span>AC</span><span className="font-semibold">&gt;50V</span></div>
              <div className="flex justify-between"><span>DC</span><span className="font-semibold">&gt;120V</span></div>
            </div>
          </div>
          <div className="relative rounded-2xl bg-white/[0.07] border border-blue-500/15 p-4 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/50 rounded-l-2xl" />
            <p className="text-[13px] font-bold text-blue-400">Wet / Damp</p>
            <div className="mt-2 space-y-1 text-[12px] text-white">
              <div className="flex justify-between"><span>AC</span><span className="font-semibold">&gt;25V</span></div>
              <div className="flex justify-between"><span>DC</span><span className="font-semibold">&gt;60V</span></div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Common Errors */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-red-400 uppercase tracking-wider px-0.5">Common Prove-Dead Errors</h2>
        {[
          { title: 'Back-fed supplies', detail: 'Solar PV, battery storage, or generators can feed circuits that appear isolated from the mains. Check Reg 514.15.', reg: '514.15' },
          { title: 'Shared neutrals', detail: 'A shared neutral from another circuit can create a parallel path, keeping conductors live even after isolation.' },
          { title: 'Induced voltage', detail: 'Long cable runs adjacent to live circuits can carry induced voltage sufficient to cause harm.' },
          { title: 'Capacitive charge', detail: 'Capacitors can hold a dangerous charge long after isolation. Allow discharge time and verify with a voltage indicator.', reg: '416.2' },
        ].map((item, i) => (
          <div key={i} className="relative rounded-2xl bg-red-500/[0.06] border border-red-500/20 p-4 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/60 rounded-l-2xl" />
            <p className="text-[13px] font-bold text-red-400">{item.title}</p>
            <p className="text-[12px] text-white mt-1 leading-relaxed">{item.detail}</p>
            {item.reg && <p className="text-[10px] text-white mt-1.5 font-medium">Reg {item.reg}</p>}
          </div>
        ))}
      </motion.section>
    </motion.div>
  </div>
);

export default ProveDeadTab;
