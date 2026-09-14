import React from 'react';

/**
 * 🔴 Flat. Emergency numbers and the safe isolation steps were both behind
 * accordions, closed by default — the same fault as the site-assessment
 * quick reference. A reference you have to open is not quick, and the
 * moment you need emergency numbers is the moment you cannot be opening a
 * disclosure one-handed.
 */
const QuickReferenceSection = () => {
  const sectionTriggerClass =
    'w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.06] border border-white/[0.10] touch-manipulation h-auto min-h-[44px]';
  const eyebrowClass = 'text-[10px] font-medium uppercase tracking-[0.18em] text-white';

  return (
    <div className="space-y-3">
      <span className={eyebrowClass}>Quick reference</span>

      {/* Emergency Numbers */}
      <section className="rounded-xl border border-red-500/40 bg-red-500/[0.05] p-4 space-y-2.5">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Emergency numbers
        </span>
        <div className="px-4 pb-4 pt-2 space-y-2 text-[14px] text-white">
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
      </section>

      {/* Safe Isolation Steps */}
      <section className="rounded-xl border border-white/[0.10] bg-white/[0.04] p-4 space-y-2.5">
        <span className={eyebrowClass}>Safe isolation (7 steps)</span>
        <div className="px-4 pb-4 pt-2 space-y-2 text-[14px] text-white">
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
              <span className="text-[12px] text-white px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.07] font-mono min-w-[28px] text-center">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Voltage Classifications */}
      <section className="rounded-xl border border-white/[0.10] bg-white/[0.04] p-4 space-y-2.5">
        <span className={eyebrowClass}>Voltage classifications</span>
        <div className="px-4 pb-4 pt-2 space-y-2 text-[14px] text-white">
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
      </section>

      {/* Electric Shock Effects */}
      <section className="rounded-xl border border-white/[0.10] bg-white/[0.04] p-4 space-y-2.5">
        <span className={eyebrowClass}>Electric shock effects</span>
        <div className="px-4 pb-4 pt-2 space-y-2 text-[14px] text-white">
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
      </section>
    </div>
  );
};

export default QuickReferenceSection;
