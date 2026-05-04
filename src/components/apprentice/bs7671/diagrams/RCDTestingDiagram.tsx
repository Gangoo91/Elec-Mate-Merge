interface RCDTestingDiagramProps {
  systemType?: string;
}

const RCDTestingDiagram = ({ systemType }: RCDTestingDiagramProps) => {
  void systemType;

  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
      {children}
    </span>
  );

  return (
    <div className="space-y-4">
      <p className="text-[14px] text-white/85 leading-relaxed">
        RCD testing procedure and requirements.
      </p>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Initial functional test
        </span>
        <ol className="space-y-1.5">
          {[
            'Press RCD test button — should trip immediately',
            'Reset RCD by switching back on',
            'If test button fails, RCD requires replacement',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-[12px] font-mono text-white/55 flex-shrink-0 w-5 mt-0.5">
                {i + 1}.
              </span>
              <span className="text-[14px] text-white/85 leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Electrical test sequence
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Step 1 — ½×In test
            </span>
            <ul className="space-y-1">
              {['50% of rated current', 'Should NOT trip', 'Tests for nuisance tripping'].map(
                (item, i) => (
                  <li
                    key={i}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Step 2 — 1×In test
            </span>
            <ul className="space-y-1">
              {['100% of rated current', 'Should trip', 'Record trip time'].map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Step 3 — 5×In test
            </span>
            <ul className="space-y-1">
              {['500% of rated current', 'Fast disconnection', 'Record trip time'].map(
                (item, i) => (
                  <li
                    key={i}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Maximum disconnection times
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              General purpose RCDs
            </span>
            <div className="space-y-1">
              <div className="flex justify-between text-[13px] text-white/85">
                <span>1×In (30mA)</span>
                <span className="font-mono text-white">≤300ms</span>
              </div>
              <div className="flex justify-between text-[13px] text-white/85">
                <span>5×In (30mA)</span>
                <span className="font-mono text-white">≤40ms</span>
              </div>
              <div className="flex justify-between text-[13px] text-white/85">
                <span>1×In (100mA)</span>
                <span className="font-mono text-white">≤300ms</span>
              </div>
              <div className="flex justify-between text-[13px] text-white/85">
                <span>5×In (100mA)</span>
                <span className="font-mono text-white">≤40ms</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Time delayed RCDs
            </span>
            <div className="space-y-1">
              <div className="flex justify-between text-[13px] text-white/85">
                <span>1×In (S-Type)</span>
                <span className="font-mono text-white">130-500ms</span>
              </div>
              <div className="flex justify-between text-[13px] text-white/85">
                <span>5×In (S-Type)</span>
                <span className="font-mono text-white">≤150ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
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
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {rcd.type}
              </span>
              <ul className="space-y-1.5">
                {rcd.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
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

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Test connection points
        </span>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[14px] text-white/85 leading-relaxed">Line test lead</span>
            <Pill>Downstream of RCD</Pill>
          </div>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[14px] text-white/85 leading-relaxed">Neutral test lead</span>
            <Pill>Downstream of RCD</Pill>
          </div>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[14px] text-white/85 leading-relaxed">Earth reference</span>
            <Pill>Installation earth</Pill>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RCDTestingDiagram;
