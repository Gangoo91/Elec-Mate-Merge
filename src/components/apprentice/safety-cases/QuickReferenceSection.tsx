import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertTriangle,
  Shield,
  Zap,
  ChevronDown,
  Phone,
} from "lucide-react";

const QuickReferenceSection = () => {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-white flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
        Quick Reference
      </h2>

      {/* Emergency Numbers */}
      <Collapsible>
        <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/30 touch-manipulation h-auto min-h-[44px]">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-red-400" />
            <span className="text-red-300 font-semibold text-sm">
              Emergency Numbers
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-red-400 transition-transform [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 pt-2 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white">Emergency Services:</span>
              <span className="font-mono font-bold text-red-400">999</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">HSE Incident Line:</span>
              <span className="font-mono text-white">0345 300 9923</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Gas Emergency:</span>
              <span className="font-mono text-white">0800 111 999</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Electricity DNO:</span>
              <span className="font-mono text-white">105</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Poison Control:</span>
              <span className="font-mono text-white">0344 892 0111</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Safe Isolation Steps */}
      <Collapsible>
        <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-xl bg-green-500/10 border border-green-500/30 touch-manipulation h-auto min-h-[44px]">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-400" />
            <span className="text-green-300 font-semibold text-sm">
              Safe Isolation (7 Steps)
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-green-400 transition-transform [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 pt-2 space-y-2 text-sm">
            {[
              "Identify the circuit",
              "Switch off the supply",
              "Isolate at the point of isolation",
              "Secure the isolation (lock off)",
              "Prove the voltage indicator on a known live source",
              "Test for dead at the point of work",
              "Re-prove the voltage indicator on the known live source",
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="bg-green-500/30 text-white px-2 py-0.5 rounded text-xs font-bold min-w-[24px] text-center">
                  {idx + 1}
                </span>
                <span className="text-white">{step}</span>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Voltage Classifications */}
      <Collapsible>
        <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 touch-manipulation h-auto min-h-[44px]">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300 font-semibold text-sm">
              Voltage Classifications
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-amber-400 transition-transform [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 pt-2 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white">Extra Low Voltage:</span>
              <span className="text-white">{"\u2264"}50V AC / {"\u2264"}120V DC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Low Voltage:</span>
              <span className="text-white">50V - 1000V AC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">High Voltage:</span>
              <span className="text-white">&gt;1000V AC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">UK Mains:</span>
              <span className="text-white">230V {"\u00B1"}10%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Three Phase:</span>
              <span className="text-white">400V between phases</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Electric Shock Effects */}
      <Collapsible>
        <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 touch-manipulation h-auto min-h-[44px]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            <span className="text-orange-300 font-semibold text-sm">
              Electric Shock Effects
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-orange-400 transition-transform [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 pt-2 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white">1mA:</span>
              <span className="text-white">Perception threshold</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">5mA:</span>
              <span className="text-white">Pain threshold</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">10-30mA:</span>
              <span className="text-white">Muscle contraction</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">30-75mA:</span>
              <span className="text-white">Respiratory arrest</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">&gt;75mA:</span>
              <span className="text-white">Ventricular fibrillation</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default QuickReferenceSection;
