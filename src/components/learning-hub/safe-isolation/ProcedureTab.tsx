import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const steps = [
  { number: 1, title: 'Seek Permission', subtitle: 'Obtain authority from the client to turn off power', phase: 'Preparation' as const, detail: 'Seek permission from the client to turn off the power. Confirm who will be affected by the isolation and agree the timing. Record client approval in the method statement.', warning: null },
  { number: 2, title: 'Identify the Circuit', subtitle: 'Identify the correct device for isolation', phase: 'Preparation' as const, detail: 'Identify the correct circuit and the correct device for isolation at the distribution board or consumer unit. Check the circuit chart and labelling, but never rely solely on labels. Verify the circuit identity by switching the load on and off and observing the result at the point of work.', warning: null },
  { number: 3, title: 'Consider Implications', subtitle: 'Assess the effects of turning off supply', phase: 'Preparation' as const, detail: 'Consider the implications of isolation, such as loss of power to other services or systems. Check for fire alarms, emergency lighting, security systems, IT equipment, or medical devices that may be affected. Plan contingencies if required.', warning: null },
  { number: 4, title: 'Gather and Check Equipment', subtitle: 'GS38 indicator, proving unit, lock-off kit, PPE', phase: 'Preparation' as const, detail: 'Gather together the required equipment: a voltage indicator manufactured and maintained in accordance with HSE Guidance Note GS38, a proving unit compatible with the voltage indicator, a lock and/or multi-lock system, warning notices identifying the work being carried out, and relevant personal protective equipment (PPE) that adheres to all site PPE rules. Ensure all equipment and devices are compatible, such as lock-off kits fitting the devices you need to lock.', warning: null },
  { number: 5, title: 'Isolate the Supply', subtitle: 'Operate the correct isolation device', phase: 'Execution' as const, detail: 'Isolate the circuit at the appropriate device identified in step 2. Use an appropriate means of isolation \u2014 an approved isolating device that physically disconnects all live conductors.', warning: null },
  { number: 6, title: 'Secure the Isolation', subtitle: 'Lock off, apply warning notices', phase: 'Execution' as const, detail: 'Apply a lock-off device and your personal padlock to ensure the supply cannot inadvertently be reinstated while the work is in progress. Attach caution/warning notices at the point(s) of isolation: "Danger \u2014 Do Not Switch On" with your name, date, and contact details. If multiple people are working, each person must apply their own padlock using a multi-lock hasp. Keep the key on your person at all times.', warning: null },
  { number: 7, title: 'Prove the Tester', subtitle: 'First prove \u2014 on a known live source', phase: 'Execution' as const, detail: 'Prove the voltage indicator on a known live source \u2014 either a dedicated proving unit or another circuit you know is energised. The indicator must give a clear, positive indication that voltage is present. If it does not respond, the instrument is faulty \u2014 do not use it.', warning: null },
  { number: 8, title: 'Prove Dead at Point of Work', subtitle: 'Test all conductors \u2014 earth connections first', phase: 'Execution' as const, detail: 'Prove conductors dead at the point of work before they are touched. For single-phase, test L\u2013E, N\u2013E, then L\u2013N. All tests must show zero volts. For three-phase, test all phase combinations plus each phase to neutral and earth (10 tests total). If any test shows voltage, the circuit is not properly isolated \u2014 stop immediately and investigate.', warning: 'Test at the POINT OF WORK, not at the distribution board. A circuit can read dead at the board but remain live at the work location due to back-feeds or shared neutrals.' },
  { number: 9, title: 'Reprove the Tester', subtitle: 'Second prove \u2014 confirms the tester did not fail', phase: 'Execution' as const, detail: 'Immediately after confirming the circuit is dead, re-prove the voltage indicator on the same known live source. It must give the same clear indication of voltage as in step 7. If the indicator fails this second prove, the dead test at step 8 cannot be trusted \u2014 stop work, obtain a replacement instrument, and repeat the entire three-step test.', warning: null },
  { number: 10, title: 'Safe Working', subtitle: 'Erect barriers, maintain isolation until complete', phase: 'Execution' as const, detail: 'Erect safety barriers as appropriate when working in an area that is open to other people. Maintain the lock-off and warning notices until all work is completed and tested. Only the person who applied the lock may remove it. Before re-energising, confirm that all personnel are clear, all tools and test equipment have been removed, and all covers are replaced.', warning: null },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

const ProcedureTab = ({ onBack }: { onBack: () => void }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (num: number) => setExpanded((prev) => (prev === num ? null : num));

  const preparationSteps = steps.filter((s) => s.phase === 'Preparation');
  const executionSteps = steps.filter((s) => s.phase === 'Execution');

  const renderSteps = (group: typeof steps, accentColour: string, numberColour: string) =>
    group.map((step) => {
      const isOpen = expanded === step.number;
      return (
        <motion.div key={step.number} variants={itemVariants}>
          <button
            type="button"
            onClick={() => toggle(step.number)}
            className="w-full text-left touch-manipulation active:scale-[0.99] transition-transform"
          >
            <div className={`relative rounded-2xl bg-white/[0.07] border ${isOpen ? 'border-white/[0.15]' : 'border-white/[0.08]'} overflow-hidden transition-colors`}>
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentColour} rounded-l-2xl`} />

              {/* Header */}
              <div className="p-4 flex items-start gap-3">
                <span className={`text-2xl font-bold ${numberColour} shrink-0 w-8 text-center`}>{step.number}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-white">{step.title}</p>
                  <p className="text-[12px] text-white mt-0.5 leading-relaxed">{step.subtitle}</p>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="h-4 w-4 text-white shrink-0 mt-1" />
                </motion.div>
              </div>

              {/* Expandable detail */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3">
                      <div className="h-px bg-white/[0.06]" />
                      <p className="text-[13px] text-white leading-relaxed">{step.detail}</p>
                      {step.warning && (
                        <div className="relative rounded-xl bg-red-500/10 border border-red-500/20 p-3 overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/60 rounded-l-xl" />
                          <div className="flex items-start gap-2 pl-1">
                            <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                            <p className="text-[12px] text-white font-medium leading-relaxed">{step.warning}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
        </motion.div>
      );
    });

  return (
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
              <h1 className="text-base font-semibold text-white">Safe Isolation Procedure</h1>
              <p className="text-[10px] text-white">Regs 131.2 · 132.8 · 132.10 · 463.3</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        {/* Preparation */}
        <section className="space-y-3">
          <div className="px-0.5">
            <h2 className="text-xs font-medium text-amber-400 uppercase tracking-wider">Preparation</h2>
            <p className="text-[11px] text-white mt-0.5">Before you touch any isolation device</p>
          </div>
          {renderSteps(preparationSteps, 'bg-amber-500/50', 'text-amber-400')}
        </section>

        {/* Execution */}
        <section className="space-y-3">
          <div className="px-0.5">
            <h2 className="text-xs font-medium text-red-400 uppercase tracking-wider">Execution</h2>
            <p className="text-[11px] text-white mt-0.5">Three-step test: prove — test — reprove</p>
          </div>
          {renderSteps(executionSteps, 'bg-red-500/50', 'text-red-400')}
        </section>

        {/* Critical Warnings */}
        <section className="space-y-3">
          <h2 className="text-xs font-medium text-red-400 uppercase tracking-wider px-0.5">Critical Warnings</h2>
          {[
            'NEVER work without using a proving unit \u2014 a meter alone is not sufficient to confirm dead.',
            'NEVER test with a meter that has not been proved on a known live source before and after testing.',
            'NEVER assume a circuit is dead \u2014 always prove it with a tested voltage indicator at the point of work.',
            'NEVER isolate without seeking permission from the client and considering the implications for other services.',
          ].map((warning, i) => (
            <motion.div key={i} variants={itemVariants}>
              <div className="relative rounded-2xl bg-red-500/[0.06] border border-red-500/20 p-4 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/60 rounded-l-2xl" />
                <p className="text-[13px] text-white font-semibold leading-relaxed">{warning}</p>
              </div>
            </motion.div>
          ))}
        </section>
      </motion.div>
    </div>
  );
};

export default ProcedureTab;
