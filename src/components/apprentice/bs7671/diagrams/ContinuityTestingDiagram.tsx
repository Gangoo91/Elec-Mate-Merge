interface ContinuityTestingDiagramProps {
  systemType?: string;
  installationType?: string;
}

const ContinuityTestingDiagram = ({
  systemType,
  installationType,
}: ContinuityTestingDiagramProps) => {
  void systemType;

  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
      {children}
    </span>
  );

  return (
    <div className="space-y-4">
      <p className="text-[14px] text-white/85 leading-relaxed">
        R1+R2 continuity testing setup for {installationType || 'standard'} installation.
      </p>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          MFT configuration
        </span>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-0.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Function
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">Low resistance / continuity</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Test current
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">≥200mA DC</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Lead nulling
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">
              Essential — short leads together
            </p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Range
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">0.01Ω to 200Ω</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Test lead connections
        </span>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[14px] text-white/85 leading-relaxed">Consumer unit end</span>
            <Pill>Red lead → line terminal</Pill>
          </div>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[14px] text-white/85 leading-relaxed">Circuit end</span>
            <Pill>Black lead → earth terminal</Pill>
          </div>
          <p className="text-[14px] text-white/85 leading-relaxed pt-1">
            This tests the complete L+CPC path resistance (R1+R2).
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Ring circuit testing sequence
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Step 1 — end-to-end
            </span>
            <div className="flex flex-wrap gap-1.5">
              <Pill>L-L</Pill>
              <Pill>N-N</Pill>
              <Pill>E-E</Pill>
            </div>
            <p className="text-[14px] text-white/85 leading-relaxed">Values should be similar.</p>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Step 2 — cross-connect
            </span>
            <div className="flex flex-wrap gap-1.5">
              <Pill>L1-N2</Pill>
              <Pill>L2-N1</Pill>
              <Pill>Similar for E</Pill>
            </div>
            <p className="text-[14px] text-white/85 leading-relaxed">Detects spurs and breaks.</p>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Step 3 — R1+R2 test
            </span>
            <div className="flex flex-wrap gap-1.5">
              <Pill>L-E at CU</Pill>
              <Pill>Test each outlet</Pill>
            </div>
            <p className="text-[14px] text-white/85 leading-relaxed">Record all readings.</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Typical R1+R2 values
        </span>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-0.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              2.5mm² T&E
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed font-mono">
              ~7.41mΩ/m (L) + 7.41mΩ/m (CPC)
            </p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              1.5mm² T&E
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed font-mono">
              ~12.02mΩ/m (L) + 12.02mΩ/m (CPC)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinuityTestingDiagram;
