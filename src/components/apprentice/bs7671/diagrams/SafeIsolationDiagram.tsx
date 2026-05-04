interface SafeIsolationDiagramProps {
  systemType?: string;
}

const SafeIsolationDiagram = ({ systemType }: SafeIsolationDiagramProps) => {
  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] text-center">
      {children}
    </span>
  );

  const sequenceSteps = [
    {
      title: 'Identify isolation point',
      detail: 'Main isolator / MCB and circuit breaker.',
    },
    {
      title: 'Inform all parties',
      detail: 'Notify building occupants, security, and relevant personnel.',
    },
    {
      title: 'Isolate & lock off',
      detail: 'Use approved lock and tag.',
    },
    {
      title: 'Prove dead',
      detail: 'Prove before, test all conductors, prove after.',
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-[14px] text-white/85 leading-relaxed">
        Safe isolation procedure for {systemType || 'electrical'} systems.
      </p>

      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Critical safety practice
        </span>
        <p className="text-[14px] text-white font-medium leading-relaxed">
          When proving dead, ALWAYS connect test leads to EARTH FIRST.
        </p>
        <ul className="space-y-1.5">
          {[
            'Connect earth lead before any live conductors',
            'This ensures you are earthed before touching potentially live parts',
            'Disconnect earth lead LAST when removing test equipment',
            'This practice can save your life — make it a habit',
          ].map((item, i) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sequenceSteps.map((step, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-[12px] font-mono text-white/55 flex-shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {step.title}
              </span>
            </div>
            <p className="text-[14px] text-white/85 leading-relaxed">{step.detail}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Detailed proving dead procedure
        </span>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              1. Prove test equipment on known live source
            </span>
            <ul className="space-y-1.5">
              {[
                'Test your voltage indicator on a known live supply',
                'Verify audible and visual indicators are working',
                'Check test leads are in good condition',
              ].map((item, i) => (
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

          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              2. Test the isolated installation
            </span>
            <div className="rounded-lg border border-red-500/30 bg-red-500/[0.04] p-3">
              <p className="text-[14px] text-white font-medium leading-relaxed">
                Connect EARTH lead FIRST, remove LAST.
              </p>
            </div>
            <ol className="space-y-1.5">
              {[
                'Connect earth / CPC lead to earth terminal FIRST',
                'Test between each live conductor and earth',
                'Test between live conductors (if applicable)',
                'Test between neutral and earth',
                'Remove earth lead LAST',
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

          <div className="space-y-1.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              3. Re-prove test equipment
            </span>
            <ul className="space-y-1.5">
              {[
                'Test on the same known live source again',
                'Confirm equipment is still functioning correctly',
                'This ensures the equipment was not damaged during testing',
              ].map((item, i) => (
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
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Proving dead test sequence ({systemType === 'three-phase' ? '3-phase' : 'single phase'})
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Earth connection FIRST, removal LAST.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5">
          {systemType === 'three-phase' ? (
            <>
              <Pill>1. L1-E</Pill>
              <Pill>2. L2-E</Pill>
              <Pill>3. L3-E</Pill>
              <Pill>4. L1-L2</Pill>
              <Pill>5. L2-L3</Pill>
              <Pill>6. L1-L3</Pill>
              <Pill>7. L1-N</Pill>
              <Pill>8. L2-N</Pill>
              <Pill>9. L3-N</Pill>
              <Pill>10. N-E</Pill>
            </>
          ) : (
            <>
              <Pill>1. L-E</Pill>
              <Pill>2. L-N</Pill>
              <Pill>3. N-E</Pill>
            </>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          GS38 compliance requirements
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Test equipment
            </span>
            <ul className="space-y-1.5">
              {[
                'Use approved voltage indicators',
                'Fused test leads maximum 500mA',
                'Insulated to at least test voltage',
                'Current calibration certificate valid',
              ].map((item, i) => (
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
          <div className="space-y-1.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Test lead safety
            </span>
            <ul className="space-y-1.5">
              {[
                'Finger barriers or shrouded probes',
                'No more than 2mm exposed metal',
                'Robust and flexible leads',
                'Visual inspection before each use',
              ].map((item, i) => (
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
        </div>
      </div>
    </div>
  );
};

export default SafeIsolationDiagram;
