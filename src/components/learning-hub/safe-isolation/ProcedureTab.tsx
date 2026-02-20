import React, { useState } from 'react';
import {
  AlertTriangle,
  Search,
  Lock,
  Zap,
  ShieldCheck,
  Wrench,
  ChevronRight,
  MessageSquare,
  ClipboardList,
  Package,
  Power,
  Tag,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Seek Permission',
    subtitle: 'Obtain authority from the client to turn off power',
    icon: MessageSquare,
    iconColour: 'text-purple-400',
    phase: 'Preparation' as const,
    detail:
      'Seek permission from the client to turn off the power. Confirm who will be affected by the isolation and agree the timing. Record client approval in the method statement.',
    warning: null,
  },
  {
    number: 2,
    title: 'Identify the Circuit',
    subtitle: 'Identify the correct device for isolation',
    icon: Search,
    iconColour: 'text-blue-400',
    phase: 'Preparation' as const,
    detail:
      'Identify the correct circuit and the correct device for isolation at the distribution board or consumer unit. Check the circuit chart and labelling, but never rely solely on labels. Verify the circuit identity by switching the load on and off and observing the result at the point of work.',
    warning: null,
  },
  {
    number: 3,
    title: 'Consider Implications',
    subtitle: 'Assess the effects of turning off supply',
    icon: ClipboardList,
    iconColour: 'text-orange-400',
    phase: 'Preparation' as const,
    detail:
      'Consider the implications of isolation, such as loss of power to other services or systems. Check for fire alarms, emergency lighting, security systems, IT equipment, or medical devices that may be affected. Plan contingencies if required.',
    warning: null,
  },
  {
    number: 4,
    title: 'Gather and Check Equipment',
    subtitle: 'GS38 indicator, proving unit, lock-off kit, PPE',
    icon: Package,
    iconColour: 'text-green-400',
    phase: 'Preparation' as const,
    detail:
      'Gather together the required equipment: a voltage indicator manufactured and maintained in accordance with HSE Guidance Note GS38, a proving unit compatible with the voltage indicator, a lock and/or multi-lock system, warning notices identifying the work being carried out, and relevant personal protective equipment (PPE) that adheres to all site PPE rules. Ensure all equipment and devices are compatible, such as lock-off kits fitting the devices you need to lock.',
    warning: null,
  },
  {
    number: 5,
    title: 'Isolate the Supply',
    subtitle: 'Operate the correct isolation device',
    icon: Power,
    iconColour: 'text-red-400',
    phase: 'Execution' as const,
    detail:
      'Isolate the circuit at the appropriate device identified in step 2. Use an appropriate means of isolation \u2014 an approved isolating device that physically disconnects all live conductors.',
    warning: null,
  },
  {
    number: 6,
    title: 'Secure the Isolation',
    subtitle: 'Lock off, apply warning notices',
    icon: Lock,
    iconColour: 'text-yellow-400',
    phase: 'Execution' as const,
    detail:
      'Apply a lock-off device and your personal padlock to ensure the supply cannot inadvertently be reinstated while the work is in progress. Attach caution/warning notices at the point(s) of isolation: "Danger \u2014 Do Not Switch On" with your name, date, and contact details. If multiple people are working, each person must apply their own padlock using a multi-lock hasp. Keep the key on your person at all times.',
    warning: null,
  },
  {
    number: 7,
    title: 'Prove the Tester',
    subtitle: 'First prove \u2014 on a known live source',
    icon: CheckCircle2,
    iconColour: 'text-green-400',
    phase: 'Execution' as const,
    detail:
      'Prove the voltage indicator on a known live source \u2014 either a dedicated proving unit or another circuit you know is energised. The indicator must give a clear, positive indication that voltage is present. If it does not respond, the instrument is faulty \u2014 do not use it.',
    warning: null,
  },
  {
    number: 8,
    title: 'Prove Dead at Point of Work',
    subtitle: 'Test all conductors \u2014 earth connections first',
    icon: Zap,
    iconColour: 'text-red-400',
    phase: 'Execution' as const,
    detail:
      'Prove conductors dead at the point of work before they are touched. For single-phase, test L\u2013E, N\u2013E, then L\u2013N. All tests must show zero volts. For three-phase, test all phase combinations plus each phase to neutral and earth (10 tests total). If any test shows voltage, the circuit is not properly isolated \u2014 stop immediately and investigate.',
    warning:
      'Test at the POINT OF WORK, not at the distribution board. A circuit can read dead at the board but remain live at the work location due to back-feeds or shared neutrals.',
  },
  {
    number: 9,
    title: 'Reprove the Tester',
    subtitle: 'Second prove \u2014 confirms the tester did not fail',
    icon: ShieldCheck,
    iconColour: 'text-green-400',
    phase: 'Execution' as const,
    detail:
      'Immediately after confirming the circuit is dead, re-prove the voltage indicator on the same known live source. It must give the same clear indication of voltage as in step 7. If the indicator fails this second prove, the dead test at step 8 cannot be trusted \u2014 stop work, obtain a replacement instrument, and repeat the entire three-step test.',
    warning: null,
  },
  {
    number: 10,
    title: 'Safe Working',
    subtitle: 'Erect barriers, maintain isolation until complete',
    icon: ShieldAlert,
    iconColour: 'text-orange-400',
    phase: 'Execution' as const,
    detail:
      'Erect safety barriers as appropriate when working in an area that is open to other people. Maintain the lock-off and warning notices until all work is completed and tested. Only the person who applied the lock may remove it. Before re-energising, confirm that all personnel are clear, all tools and test equipment have been removed, and all covers are replaced.',
    warning: null,
  },
];

const ProcedureTab = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (num: number) => {
    setExpanded((prev) => (prev === num ? null : num));
  };

  const preparationSteps = steps.filter((s) => s.phase === 'Preparation');
  const executionSteps = steps.filter((s) => s.phase === 'Execution');

  const renderSteps = (group: typeof steps) =>
    group.map((step) => {
      const Icon = step.icon;
      const isOpen = expanded === step.number;

      return (
        <div key={step.number}>
          <button
            type="button"
            onClick={() => toggle(step.number)}
            className="w-full flex items-center gap-3 px-4 py-3.5 min-h-[56px] touch-manipulation text-left active:bg-white/[0.04] transition-colors"
            aria-expanded={isOpen}
          >
            <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
              <Icon className={`h-4 w-4 ${step.iconColour}`} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-white block text-left">
                {step.number}. {step.title}
              </span>
              <p className="text-xs text-white mt-0.5 text-left">{step.subtitle}</p>
            </div>
            <ChevronRight
              className={`h-4 w-4 text-white flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
            />
          </button>

          {isOpen && (
            <div className="px-4 pb-3.5 pt-0 pl-[60px]">
              <p className="text-sm text-white leading-relaxed text-left">{step.detail}</p>
              {step.warning && (
                <div className="mt-2.5 flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                  <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white font-medium text-left">{step.warning}</p>
                </div>
              )}
            </div>
          )}
        </div>
      );
    });

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Reference note */}
      <p className="text-xs text-white">
        Verified against the practical work intelligence database, Regulations 131.2, 132.8, 132.10,
        463.3, and the three-step test approach for single-phase systems
      </p>

      {/* Preparation phase */}
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
        <div className="px-4 py-3.5">
          <h4 className="font-semibold text-white text-sm sm:text-base">Preparation</h4>
          <p className="text-xs text-white mt-0.5">Before you touch any isolation device</p>
        </div>
        {renderSteps(preparationSteps)}
      </div>

      {/* Execution phase */}
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
        <div className="px-4 py-3.5">
          <h4 className="font-semibold text-white text-sm sm:text-base">Execution</h4>
          <p className="text-xs text-white mt-0.5">
            Three-step test: prove &mdash; test &mdash; reprove
          </p>
        </div>
        {renderSteps(executionSteps)}
      </div>

      {/* Critical warnings — from RAG common_mistakes */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 sm:p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <h4 className="font-semibold text-red-400 text-sm">Critical Warnings</h4>
        </div>
        <ul className="space-y-1.5 text-sm text-white text-left">
          <li>
            <strong>NEVER</strong> work without using a proving unit &mdash; a meter alone is not
            sufficient to confirm dead.
          </li>
          <li>
            <strong>NEVER</strong> test with a meter that has not been proved on a known live source
            before and after testing.
          </li>
          <li>
            <strong>NEVER</strong> assume a circuit is dead &mdash; always prove it with a tested
            voltage indicator at the point of work.
          </li>
          <li>
            <strong>NEVER</strong> isolate without seeking permission from the client and
            considering the implications for other services.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProcedureTab;
