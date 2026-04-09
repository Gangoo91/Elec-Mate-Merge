import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const scenarios = [
  {
    title: 'Multiple Supply Sources',
    scenario:
      'A domestic property has solar PV, battery storage, and mains. You isolate the consumer unit but the PV inverter continues to back-feed.',
    lesson:
      'Identify ALL supply sources before starting work. Isolate PV at DC and AC isolators. Check for battery storage. Regulation 514.15.1 requires warning notices at the origin, meter position, consumer unit and all isolation points where additional supplies are present.',
  },
  {
    title: 'Shared Neutral Back-Feeding',
    scenario:
      'You isolate a lighting circuit MCB, but read 110V between N-E at the ceiling rose. The neutral is shared with a live ring final circuit.',
    lesson:
      'Test ALL conductors, not just line. A shared neutral can carry current from another circuit. Consider isolating at the main switch.',
  },
  {
    title: 'Capacitive Charge Retention',
    scenario:
      'After isolating a motor starter circuit, you receive a shock. The PFC capacitors retained a dangerous charge.',
    lesson:
      'Regulation 416.2 requires measures to prevent danger from equipment that may retain a dangerous charge after disconnection. Allow discharge time and verify with a voltage indicator before touching conductors.',
  },
  {
    title: 'Adjacent Live Circuits',
    scenario:
      'You correctly isolated your circuit, but while working inside the DB your hand contacts a live busbar from another circuit.',
    lesson:
      'Use insulated barriers to cover adjacent live parts. Wear insulated gloves. Consider isolating the entire board if practical.',
  },
];

const ReferenceTab = ({ onBack }: { onBack: () => void }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Back button header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06] -mx-4 px-4 mb-5">
        <div className="py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={onBack}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-base font-semibold text-white">Regulations & Reference</h1>
              <p className="text-[10px] text-white">BS 7671 · EAW 1989 · GS38</p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal framework */}
      <div className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Legal Framework</h2>
        {[
          {
            title: 'Health and Safety at Work Act 1974',
            detail: 'General duty of care on employers and employees to ensure safety',
            accent: 'bg-blue-500/50',
          },
          {
            title: 'Electricity at Work Regulations 1989',
            detail: 'Reg 12: Isolation. Reg 13: Dead working. Reg 14: Live work',
            accent: 'bg-purple-500/50',
          },
          {
            title: 'HSE Guidance Note GS38',
            detail: 'Requirements for electrical test equipment — probes, leads, fuses, insulation',
            accent: 'bg-amber-500/50',
          },
          {
            title: 'BS 7671 Key Regulations',
            detail:
              'Reg 131.2 (protection against electric shock), 132.10 (disconnecting devices for safe isolation), 463.3 (selection of isolators per Chapter 53), 537.2 (isolation and switching devices)',
            accent: 'bg-green-500/50',
          },
        ].map((entry) => (
          <div key={entry.title} className="relative rounded-2xl bg-white/[0.07] border border-white/[0.08] p-4 overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${entry.accent} rounded-l-2xl`} />
            <span className="text-sm font-medium text-white block">{entry.title}</span>
            <p className="text-xs text-white mt-0.5">{entry.detail}</p>
          </div>
        ))}
      </div>

      {/* Acceptable vs NOT acceptable */}
      <div className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Acceptable Isolation Devices</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative rounded-2xl bg-white/[0.07] border border-green-500/30 p-3 sm:p-4 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500/50 rounded-l-2xl" />
            <span className="font-semibold text-green-400 text-xs sm:text-sm block mb-2">Acceptable</span>
            <ul className="space-y-1.5 text-xs sm:text-sm text-white">
              <li>Switch-disconnectors</li>
              <li>Circuit breakers</li>
              <li>Isolators (visible break)</li>
              <li>Plug withdrawal</li>
            </ul>
          </div>
          <div className="relative rounded-2xl bg-white/[0.07] border border-red-500/30 p-3 sm:p-4 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/50 rounded-l-2xl" />
            <span className="font-semibold text-red-400 text-xs sm:text-sm block mb-2">NOT Acceptable</span>
            <ul className="space-y-1.5 text-xs sm:text-sm text-white">
              <li>Semiconductor switches</li>
              <li>Emergency stops</li>
              <li>Contactors</li>
              <li>Remote switches</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Scenario cards — expandable */}
      <div className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Scenarios</h2>
        {scenarios.map((entry, i) => {
          const isOpen = expanded === i;
          return (
            <div key={i} className="relative rounded-2xl bg-white/[0.07] border border-white/[0.08] p-4 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500/50 rounded-l-2xl" />
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full text-left touch-manipulation"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-white flex-1">
                    {i + 1}. {entry.title}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-white flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 mt-3 border-t border-white/[0.06]">
                      <p className="text-xs text-white mb-2">{entry.scenario}</p>
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2.5">
                        <p className="text-xs text-white">
                          <strong className="text-yellow-400">Key lesson:</strong> {entry.lesson}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReferenceTab;
