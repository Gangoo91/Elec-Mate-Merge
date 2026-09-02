interface RCDTestingDiagramProps {
  systemType?: string;
}

const RCDTestingDiagram = ({ systemType }: RCDTestingDiagramProps) => {
  void systemType;

  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[12px] text-white px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.07]">
      {children}
    </span>
  );

  return (
    <div className="space-y-4">
      <p className="text-[14px] text-white leading-relaxed">
        RCD testing procedure and requirements.
      </p>

      <div className="rounded-xl border border-white/[0.10] bg-white/[0.06] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Initial functional test
        </span>
        <ol className="space-y-1.5">
          {[
            'Press RCD test button — should trip immediately',
            'Reset RCD by switching back on',
            'If test button fails, RCD requires replacement',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-[12px] font-mono text-white flex-shrink-0 w-5 mt-0.5">
                {i + 1}.
              </span>
              <span className="text-[14px] text-white leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-xl border border-white/[0.10] bg-white/[0.06] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Electrical test sequence
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-white/[0.10] bg-white/[0.06] p-3 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              Step 1 — prove the instrument
            </span>
            <ul className="space-y-1">
              {[
                'Connect at the load side of the RCD',
                'Confirm supply present and instrument set to IΔn',
                'Warn anyone the trip will affect',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] text-white leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-white/[0.10] bg-white/[0.06] p-3 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              Step 2 — 1×IΔn AC test (the A4:2026 test)
            </span>
            <ul className="space-y-1">
              {[
                'Rated residual current, 0° and 180°',
                'Must trip',
                'Record the slower of the two times',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] text-white leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-white/[0.10] bg-white/[0.06] p-3 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              Step 3 — test button
            </span>
            <ul className="space-y-1">
              {[
                'Press the integral test button',
                'Functional check only',
                'The 5×IΔn test was deleted at A4:2026 (Table 3A withdrawn)',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] text-white leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.10] bg-white/[0.06] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Maximum trip times at 1×IΔn (product standard BS EN 61008 / 61009)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              General purpose RCDs
            </span>
            <div className="space-y-1">
              <div className="flex justify-between text-[13px] text-white">
                <span>1×In (30mA)</span>
                <span className="font-mono text-white">≤300ms</span>
              </div>
              <div className="flex justify-between text-[13px] text-white">
                <span>1×In (100mA)</span>
                <span className="font-mono text-white">≤300ms</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              Time delayed RCDs
            </span>
            <div className="space-y-1">
              <div className="flex justify-between text-[13px] text-white">
                <span>1×In (S-Type)</span>
                <span className="font-mono text-white">130-500ms</span>
              </div>
              <div className="flex justify-between text-[13px] text-white">
                <span>5×In test</span>
                <span className="font-mono text-white">deleted (A4:2026)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.10] bg-white/[0.06] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          RCD types and applications
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              type: 'Type AC',
              items: [
                'Detects AC residual currents',
                'General purpose applications',
                'Most common type',
              ],
            },
            {
              type: 'Type A',
              items: [
                'Detects AC and pulsating DC',
                'Required for IT equipment',
                'Electronic loads',
              ],
            },
            {
              type: 'Type B',
              items: [
                'Detects all residual currents',
                'Required for variable speed drives',
                'Solar inverters',
              ],
            },
            {
              type: 'Type S (selective)',
              items: [
                'Time delayed operation',
                'Discrimination with downstream RCDs',
                'Main switch applications',
              ],
            },
          ].map((rcd, i) => (
            <div key={i} className="space-y-1.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                {rcd.type}
              </span>
              <ul className="space-y-1.5">
                {rcd.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-[14px] text-white leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.10] bg-white/[0.06] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Test connection points
        </span>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[14px] text-white leading-relaxed">Line test lead</span>
            <Pill>Downstream of RCD</Pill>
          </div>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[14px] text-white leading-relaxed">Neutral test lead</span>
            <Pill>Downstream of RCD</Pill>
          </div>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[14px] text-white leading-relaxed">Earth reference</span>
            <Pill>Installation earth</Pill>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RCDTestingDiagram;
