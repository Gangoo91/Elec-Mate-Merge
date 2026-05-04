const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 flex items-center justify-between">
    <span className="text-[12px] text-white/70">{label}</span>
    <span className="text-[12px] text-white/85 font-mono">{value}</span>
  </div>
);

const Block = ({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
      {eyebrow}
    </span>
    <div className="space-y-2">{children}</div>
  </div>
);

const AccreditationAnalytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <Block eyebrow="Most popular">
        <Stat label="IET Professional" value="95%" />
        <Stat label="NICEIC Approved" value="92%" />
        <Stat label="ECA Membership" value="88%" />
      </Block>

      <Block eyebrow="Career impact">
        <Stat label="Salary uplift" value="Varies" />
        <Stat label="Career advancement" value="Common" />
      </Block>

      <Block eyebrow="Quick start">
        <Stat label="Entry level" value="4 options" />
        <Stat label="Under £300" value="6 available" />
        <Stat label="Online / hybrid" value="8 courses" />
      </Block>

      <Block eyebrow="Investment">
        <Stat label="Typical cost" value="£200-£1,500" />
        <Stat label="ROI timeframe" value="4-18 months" />
      </Block>
    </div>
  );
};

export default AccreditationAnalytics;
