interface EarthFaultLoopDiagramProps {
  systemType?: string;
}

const EarthFaultLoopDiagram = ({ systemType }: EarthFaultLoopDiagramProps) => {
  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
      {children}
    </span>
  );

  return (
    <div className="space-y-4">
      <p className="text-[14px] text-white/85 leading-relaxed">
        Earth fault loop impedance (Zs) testing for {systemType || 'standard'} electrical systems.
      </p>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Earth fault loop path
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed font-mono">
          Zs = Ze + (R1 + R2)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Ze
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">External earth loop impedance</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              R1
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">Line conductor resistance</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              R2
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">Earth conductor resistance</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Key test points
        </span>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[14px] text-white/85 leading-relaxed">Origin (consumer unit)</span>
            <Pill>Measure Ze</Pill>
          </div>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[14px] text-white/85 leading-relaxed">Each socket outlet</span>
            <Pill>Measure Zs</Pill>
          </div>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[14px] text-white/85 leading-relaxed">Fixed equipment</span>
            <Pill>Measure Zs</Pill>
          </div>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[14px] text-white/85 leading-relaxed">Distribution boards</span>
            <Pill>Measure Zs</Pill>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Maximum Zs values (common protective devices)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              MCBs (Type B)
            </span>
            <div className="space-y-1">
              <div className="flex justify-between text-[13px] text-white/85">
                <span>6A</span>
                <span className="font-mono text-white">7.28Ω</span>
              </div>
              <div className="flex justify-between text-[13px] text-white/85">
                <span>16A</span>
                <span className="font-mono text-white">2.73Ω</span>
              </div>
              <div className="flex justify-between text-[13px] text-white/85">
                <span>32A</span>
                <span className="font-mono text-white">1.37Ω</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              MCBs (Type C)
            </span>
            <div className="space-y-1">
              <div className="flex justify-between text-[13px] text-white/85">
                <span>6A</span>
                <span className="font-mono text-white">3.64Ω</span>
              </div>
              <div className="flex justify-between text-[13px] text-white/85">
                <span>16A</span>
                <span className="font-mono text-white">1.37Ω</span>
              </div>
              <div className="flex justify-between text-[13px] text-white/85">
                <span>32A</span>
                <span className="font-mono text-white">0.68Ω</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Test method considerations
        </span>
        <ul className="space-y-1.5">
          {[
            'Test current typically 15-25A for accurate results',
            'RCDs may trip during testing — use no-trip facility if available',
            'High current may affect sensitive electronic equipment',
            'Temperature coefficient: readings increase with conductor temperature',
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

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Earth fault current
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed font-mono">If = 0.8 × Uo / Zs</p>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Where If = fault current, Uo = nominal voltage to earth (230V), Zs = measured loop
          impedance.
        </p>
      </div>
    </div>
  );
};

export default EarthFaultLoopDiagram;
