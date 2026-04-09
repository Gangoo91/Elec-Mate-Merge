import React from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const probeSpecs = [
  { label: 'Exposed tip', value: 'Max 4mm', accent: 'bg-red-500/50' },
  { label: 'Finger guard', value: 'Required', accent: 'bg-yellow-500/50' },
  { label: 'Tip type', value: 'Shrouded or retractable', accent: 'bg-blue-500/50' },
  { label: 'Insulation', value: 'Min 1000V rating', accent: 'bg-purple-500/50' },
  { label: 'Fused leads', value: 'HBC fuse, max 500mA', accent: 'bg-orange-500/50' },
  { label: 'Lead size', value: 'Min 0.75mm\u00B2', accent: 'bg-green-500/50' },
];

const EquipmentTab = ({ onBack }: { onBack: () => void }) => (
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
            <h1 className="text-base font-semibold text-white">Equipment &amp; GS38</h1>
          </div>
        </div>
      </div>
    </div>

    {/* Reference note */}
    <p className="text-xs text-white">
      Verified against the practical work intelligence database — all test instruments and leads
      must be GS38 compliant (except low-resistance ohmmeters)
    </p>

    {/* GS38 Probe Specs */}
    <div className="space-y-3">
      <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">GS38 Compliant Test Probe</h2>
      <p className="text-xs text-white px-0.5">
        GS38 specifies 4mm max exposed tip — some references incorrectly state 2mm
      </p>
      <div className="grid grid-cols-2 gap-2">
        {probeSpecs.map((spec) => (
          <div key={spec.label} className="relative rounded-2xl bg-white/[0.07] border border-white/[0.08] p-4 overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${spec.accent} rounded-l-2xl`} />
            <span className="text-sm font-medium text-white block">{spec.label}</span>
            <p className="text-xs text-white mt-0.5">{spec.value}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Before-Use Checks */}
    <div className="space-y-3">
      <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Before-Use Checks</h2>
      <p className="text-xs text-white px-0.5">Required every time before testing</p>
      {[
        {
          num: '1',
          title: 'Visual inspection',
          desc: 'Inspect instruments and leads for damage, cracks, or exposed conductors before use',
        },
        {
          num: '2',
          title: 'Calibration check',
          desc: 'Verify instruments are within calibration date and markings confirm GS38 compliance',
        },
        {
          num: '3',
          title: 'Prove before and after',
          desc: 'Prove the proving unit or voltage indicator on a known live source before and after every dead test',
        },
      ].map((step) => (
        <div key={step.num} className="relative rounded-2xl bg-white/[0.07] border border-white/[0.08] p-4 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/50 rounded-l-2xl" />
          <span className="text-sm font-semibold text-white block">{step.num}. {step.title}</span>
          <p className="text-xs text-white mt-0.5">{step.desc}</p>
        </div>
      ))}
    </div>

    {/* Equipment checklist */}
    <div className="space-y-3">
      <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Equipment Checklist</h2>
      {[
        {
          item: 'Proving unit / voltage indicator',
          detail:
            'Two-pole voltage indicator preferred over a multimeter — less likely to give false readings from ghost voltages',
        },
        {
          item: 'Proving unit',
          detail:
            'Known voltage source to prove the indicator works before and after every dead test',
        },
        {
          item: 'Lockout/tagout kit',
          detail:
            'MCB lock, fuse carrier lock, plug lock-offs, padlocks, warning tags — each worker needs their own',
        },
        {
          item: 'Insulated screwdriver set',
          detail: 'VDE rated insulated screwdrivers for working on or near electrical equipment',
        },
        {
          item: 'Multimeter',
          detail: 'CAT III or CAT IV rated as appropriate for the work location',
        },
        {
          item: 'PPE',
          detail: 'Insulated gloves and safety glasses — check for damage before each use',
        },
      ].map((entry) => (
        <div key={entry.item} className="relative rounded-2xl bg-white/[0.07] border border-white/[0.08] p-4 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500/50 rounded-l-2xl" />
          <span className="text-sm font-medium text-white block">{entry.item}</span>
          <p className="text-xs text-white mt-0.5">{entry.detail}</p>
        </div>
      ))}
    </div>

    {/* CAT Ratings */}
    <div className="space-y-3">
      <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">CAT Ratings</h2>
      <p className="text-xs text-white px-0.5">Where you work determines the rating</p>
      {[
        {
          cat: 'CAT II',
          accent: 'bg-green-500/50',
          titleColour: 'text-green-400',
          description: 'Equipment supplied from building wiring',
          examples: 'Appliances, portable tools, plug-in equipment',
        },
        {
          cat: 'CAT III',
          accent: 'bg-orange-500/50',
          titleColour: 'text-orange-400',
          description: 'Part of building wiring',
          examples: 'Socket outlets, distribution boards, sub-mains',
        },
        {
          cat: 'CAT IV',
          accent: 'bg-red-500/50',
          titleColour: 'text-red-400',
          description: 'At or near the origin of supply',
          examples: 'Building entrance to primary DB, meter tails',
        },
      ].map((entry) => (
        <div key={entry.cat} className="relative rounded-2xl bg-white/[0.07] border border-white/[0.08] p-4 overflow-hidden">
          <div className={`absolute left-0 top-0 bottom-0 w-1 ${entry.accent} rounded-l-2xl`} />
          <span className={`text-sm font-bold ${entry.titleColour} block`}>{entry.cat}</span>
          <span className="text-sm text-white">{entry.description}</span>
          <p className="text-xs text-white mt-0.5">{entry.examples}</p>
        </div>
      ))}
    </div>

    {/* CAT warning */}
    <div className="relative rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-4 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500/50 rounded-l-2xl" />
      <div className="flex items-start gap-2">
        <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-white">
          Always use test equipment rated for the <strong>highest</strong> CAT category you will
          encounter. A CAT III rated instrument must not be used for CAT IV work.
        </p>
      </div>
    </div>
  </div>
);

export default EquipmentTab;
