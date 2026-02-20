import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Crosshair,
  ShieldAlert,
  CircleDot,
  Zap,
  Cable,
  Ruler,
} from 'lucide-react';

const probeSpecs = [
  { label: 'Exposed tip', value: 'Max 4mm', icon: Crosshair, iconColour: 'text-red-400' },
  { label: 'Finger guard', value: 'Required', icon: ShieldAlert, iconColour: 'text-yellow-400' },
  {
    label: 'Tip type',
    value: 'Shrouded or retractable',
    icon: CircleDot,
    iconColour: 'text-blue-400',
  },
  { label: 'Insulation', value: 'Min 1000V rating', icon: Zap, iconColour: 'text-purple-400' },
  {
    label: 'Fused leads',
    value: 'HBC fuse, max 500mA',
    icon: Cable,
    iconColour: 'text-orange-400',
  },
  {
    label: 'Lead size',
    value: 'Min 0.75mm\u00B2',
    icon: Ruler,
    iconColour: 'text-green-400',
  },
];

const EquipmentTab = () => (
  <div className="space-y-4 sm:space-y-5">
    {/* Reference note */}
    <p className="text-xs text-white">
      Verified against the practical work intelligence database — all test instruments and leads
      must be GS38 compliant (except low-resistance ohmmeters)
    </p>

    {/* GS38 Probe Specs */}
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
      <div className="px-4 py-3.5">
        <h4 className="font-semibold text-white text-sm sm:text-base">GS38 Compliant Test Probe</h4>
        <p className="text-xs text-white mt-0.5">
          GS38 specifies 4mm max exposed tip — some references incorrectly state 2mm
        </p>
      </div>
      {probeSpecs.map((spec) => {
        const Icon = spec.icon;
        return (
          <div key={spec.label} className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
              <Icon className={`h-4 w-4 ${spec.iconColour}`} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-white">{spec.label}</span>
              <p className="text-xs text-white mt-0.5">{spec.value}</p>
            </div>
          </div>
        );
      })}
    </div>

    {/* GS38 Before-Use Checks */}
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
      <div className="px-4 py-3.5">
        <h4 className="font-semibold text-white text-sm sm:text-base">Before-Use Checks</h4>
        <p className="text-xs text-white mt-0.5">Required every time before testing</p>
      </div>
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
        <div key={step.num} className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-white">{step.num}</span>
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-white">{step.title}</span>
            <p className="text-xs text-white mt-0.5">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Equipment checklist */}
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
      <div className="px-4 py-3.5">
        <h4 className="font-semibold text-white text-sm sm:text-base">Equipment Checklist</h4>
      </div>
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
        <div key={entry.item} className="flex items-center gap-3 px-4 py-3">
          <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-white">{entry.item}</span>
            <p className="text-xs text-white mt-0.5">{entry.detail}</p>
          </div>
        </div>
      ))}
    </div>

    {/* CAT Ratings */}
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
      <div className="px-4 py-3.5">
        <h4 className="font-semibold text-white text-sm sm:text-base">CAT Ratings</h4>
        <p className="text-xs text-white mt-0.5">Where you work determines the rating</p>
      </div>
      {[
        {
          cat: 'CAT II',
          accent: 'text-green-400',
          dot: 'bg-green-400',
          description: 'Equipment supplied from building wiring',
          examples: 'Appliances, portable tools, plug-in equipment',
        },
        {
          cat: 'CAT III',
          accent: 'text-orange-400',
          dot: 'bg-orange-400',
          description: 'Part of building wiring',
          examples: 'Socket outlets, distribution boards, sub-mains',
        },
        {
          cat: 'CAT IV',
          accent: 'text-red-400',
          dot: 'bg-red-400',
          description: 'At or near the origin of supply',
          examples: 'Building entrance to primary DB, meter tails',
        },
      ].map((entry) => (
        <div key={entry.cat} className="flex items-center gap-3 px-4 py-3">
          <div className={`w-2 h-2 rounded-full ${entry.dot} flex-shrink-0`} />
          <div className="flex-1 min-w-0">
            <span className={`text-sm font-bold ${entry.accent}`}>{entry.cat}</span>
            <span className="text-sm text-white ml-2">{entry.description}</span>
            <p className="text-xs text-white mt-0.5">{entry.examples}</p>
          </div>
        </div>
      ))}
    </div>

    {/* CAT warning */}
    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3.5">
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
