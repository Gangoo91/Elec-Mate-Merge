import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const QuickReferenceSection = () => {
  const sectionTriggerClass =
    'w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] touch-manipulation h-auto min-h-[44px]';
  const eyebrowClass =
    'text-[10px] font-medium uppercase tracking-[0.18em] text-white/55';

  return (
    <div className="space-y-3">
      <span className={eyebrowClass}>Quick reference</span>

      {/* Emergency Numbers */}
      <Collapsible>
        <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-xl bg-red-500/[0.04] border border-red-500/30 touch-manipulation h-auto min-h-[44px]">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
            Emergency numbers
          </span>
          <ChevronDown className="h-4 w-4 text-white/55 transition-transform [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 pt-2 space-y-2 text-[14px] text-white/85">
            <div className="flex justify-between">
              <span>Emergency Services</span>
              <span className="font-mono text-white">999</span>
            </div>
            <div className="flex justify-between">
              <span>HSE Incident Line</span>
              <span className="font-mono text-white">0345 300 9923</span>
            </div>
            <div className="flex justify-between">
              <span>Gas Emergency</span>
              <span className="font-mono text-white">0800 111 999</span>
            </div>
            <div className="flex justify-between">
              <span>Electricity DNO</span>
              <span className="font-mono text-white">105</span>
            </div>
            <div className="flex justify-between">
              <span>Poison Control</span>
              <span className="font-mono text-white">0344 892 0111</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Safe Isolation Steps */}
      <Collapsible>
        <CollapsibleTrigger className={sectionTriggerClass}>
          <span className={eyebrowClass}>Safe isolation (7 steps)</span>
          <ChevronDown className="h-4 w-4 text-white/55 transition-transform [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 pt-2 space-y-2 text-[14px] text-white/85">
            {[
              'Identify the circuit',
              'Switch off the supply',
              'Isolate at the point of isolation',
              'Secure the isolation (lock off)',
              'Prove the voltage indicator on a known live source',
              'Test for dead at the point of work',
              'Re-prove the voltage indicator on the known live source',
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-[12px] text-white/55 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono min-w-[28px] text-center">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Voltage Classifications */}
      <Collapsible>
        <CollapsibleTrigger className={sectionTriggerClass}>
          <span className={eyebrowClass}>Voltage classifications</span>
          <ChevronDown className="h-4 w-4 text-white/55 transition-transform [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 pt-2 space-y-2 text-[14px] text-white/85">
            <div className="flex justify-between">
              <span>Extra Low Voltage</span>
              <span className="font-mono text-white">
                {'\u2264'}50V AC / {'\u2264'}120V DC
              </span>
            </div>
            <div className="flex justify-between">
              <span>Low Voltage</span>
              <span className="font-mono text-white">50V – 1000V AC</span>
            </div>
            <div className="flex justify-between">
              <span>High Voltage</span>
              <span className="font-mono text-white">&gt;1000V AC</span>
            </div>
            <div className="flex justify-between">
              <span>UK Mains</span>
              <span className="font-mono text-white">230V {'\u00B1'}10%</span>
            </div>
            <div className="flex justify-between">
              <span>Three Phase</span>
              <span className="font-mono text-white">400V between phases</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Electric Shock Effects */}
      <Collapsible>
        <CollapsibleTrigger className={sectionTriggerClass}>
          <span className={eyebrowClass}>Electric shock effects</span>
          <ChevronDown className="h-4 w-4 text-white/55 transition-transform [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 pt-2 space-y-2 text-[14px] text-white/85">
            <div className="flex justify-between">
              <span>1mA</span>
              <span className="text-white">Perception threshold</span>
            </div>
            <div className="flex justify-between">
              <span>5mA</span>
              <span className="text-white">Pain threshold</span>
            </div>
            <div className="flex justify-between">
              <span>10–30mA</span>
              <span className="text-white">Muscle contraction</span>
            </div>
            <div className="flex justify-between">
              <span>30–75mA</span>
              <span className="text-white">Respiratory arrest</span>
            </div>
            <div className="flex justify-between">
              <span>&gt;75mA</span>
              <span className="text-white">Ventricular fibrillation</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default QuickReferenceSection;
