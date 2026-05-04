interface InsulationTestingDiagramProps {
  systemType?: string;
  installationType?: string;
}

const InsulationTestingDiagram = ({
  systemType,
  installationType,
}: InsulationTestingDiagramProps) => {
  void installationType;

  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] text-center">
      {children}
    </span>
  );

  return (
    <div className="space-y-4">
      <p className="text-[14px] text-white/85 leading-relaxed">
        Insulation resistance testing for {systemType || 'electrical'} systems.
      </p>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Test voltage selection
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              SELV / PELV
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">≤50V — use 250V test</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Low voltage
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">50V-500V — use 500V test</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              High voltage
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">&gt;500V — use 1000V test</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Required test combinations
        </span>
        {systemType === 'three-phase' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5">
            <Pill>L1-L2</Pill>
            <Pill>L1-L3</Pill>
            <Pill>L2-L3</Pill>
            <Pill>L1-N</Pill>
            <Pill>L2-N</Pill>
            <Pill>L3-N</Pill>
            <Pill>L1-E</Pill>
            <Pill>L2-E</Pill>
            <Pill>L3-E</Pill>
            <Pill>N-E</Pill>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
            <Pill>Line-Neutral</Pill>
            <Pill>Line-Earth</Pill>
            <Pill>Neutral-Earth</Pill>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Pre-test preparation
        </span>
        <ol className="space-y-1.5">
          {[
            'Disconnect or bypass all electronic equipment (LED lights, dimmer switches, etc.)',
            'Ensure all switches and circuit breakers are closed',
            'Remove all lamps from lampholders',
            'Link L and N together for L-E and N-E tests',
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
          Minimum acceptable values
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Circuit voltage
            </span>
            <div className="space-y-1">
              <div className="flex justify-between text-[13px] text-white/85">
                <span>SELV (≤50V)</span>
                <span className="font-mono text-white">≥0.5MΩ</span>
              </div>
              <div className="flex justify-between text-[13px] text-white/85">
                <span>Low voltage</span>
                <span className="font-mono text-white">≥1.0MΩ</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Typical values
            </span>
            <div className="space-y-1">
              <div className="flex justify-between text-[13px] text-white/85">
                <span>New installation</span>
                <span className="font-mono text-white">10-100MΩ</span>
              </div>
              <div className="flex justify-between text-[13px] text-white/85">
                <span>Older installation</span>
                <span className="font-mono text-white">2-10MΩ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsulationTestingDiagram;
