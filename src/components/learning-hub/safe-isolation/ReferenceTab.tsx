import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

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
      'Regulation 416.2.5 requires a warning label adjacent to enclosures containing equipment that may retain a dangerous charge after disconnection. Allow discharge time and verify with a voltage indicator before touching conductors.',
  },
  {
    title: 'Adjacent Live Circuits',
    scenario:
      'You correctly isolated your circuit, but while working inside the DB your hand contacts a live busbar from another circuit.',
    lesson:
      'Use insulated barriers to cover adjacent live parts. Wear insulated gloves. Consider isolating the entire board if practical.',
  },
];

const ReferenceTab = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Reference note */}
      <p className="text-xs text-white">
        Verified against the regulations intelligence and practical work intelligence databases
      </p>

      {/* Legal framework */}
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
        <div className="px-4 py-3.5">
          <h4 className="font-semibold text-white text-sm sm:text-base">Legal Framework</h4>
        </div>
        {[
          {
            title: 'Health and Safety at Work Act 1974',
            detail: 'General duty of care on employers and employees to ensure safety',
          },
          {
            title: 'Electricity at Work Regulations 1989',
            detail: 'Reg 12: Isolation. Reg 13: Dead working. Reg 14: Live work',
          },
          {
            title: 'HSE Guidance Note GS38',
            detail: 'Requirements for electrical test equipment — probes, leads, fuses, insulation',
          },
          {
            title: 'BS 7671 Key Regulations',
            detail:
              'Reg 131.2 (safe isolation procedures), 132.8 (three-step prove-dead), 132.10 (disconnecting devices and lock-off), 463.3 (formal safe-isolation), 537.2 (isolation and switching)',
          },
        ].map((entry) => (
          <div key={entry.title} className="px-4 py-3">
            <span className="text-sm font-medium text-white">{entry.title}</span>
            <p className="text-xs text-white mt-0.5">{entry.detail}</p>
          </div>
        ))}
      </div>

      {/* Acceptable vs NOT acceptable */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 sm:p-4">
          <div className="flex items-center gap-1.5 mb-2.5">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <span className="font-semibold text-green-400 text-xs sm:text-sm">Acceptable</span>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-white">
            <li>Switch-disconnectors</li>
            <li>Circuit breakers</li>
            <li>Isolators (visible break)</li>
            <li>Plug withdrawal</li>
          </ul>
        </div>
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 sm:p-4">
          <div className="flex items-center gap-1.5 mb-2.5">
            <XCircle className="h-4 w-4 text-red-400" />
            <span className="font-semibold text-red-400 text-xs sm:text-sm">NOT Acceptable</span>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-white">
            <li>Semiconductor switches</li>
            <li>Emergency stops</li>
            <li>Contactors</li>
            <li>Remote switches</li>
          </ul>
        </div>
      </div>

      {/* Scenario cards — expandable */}
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
        <div className="px-4 py-3.5">
          <h4 className="font-semibold text-white text-sm sm:text-base">Scenarios</h4>
          <p className="text-xs text-white mt-0.5">Tap to expand</p>
        </div>
        {scenarios.map((entry, i) => {
          const isOpen = expanded === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full flex items-center gap-3 px-4 py-3.5 min-h-[48px] touch-manipulation text-left active:bg-white/[0.04] transition-colors"
                aria-expanded={isOpen}
              >
                <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <span className="text-sm font-medium text-white flex-1">
                  {i + 1}. {entry.title}
                </span>
                <ChevronRight
                  className={`h-4 w-4 text-white flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-3.5 ml-7">
                  <p className="text-xs text-white mb-2">{entry.scenario}</p>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2.5">
                    <p className="text-xs text-white">
                      <strong className="text-yellow-400">Key lesson:</strong> {entry.lesson}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReferenceTab;
