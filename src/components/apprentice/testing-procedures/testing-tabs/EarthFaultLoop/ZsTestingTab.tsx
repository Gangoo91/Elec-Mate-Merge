const ZsTestingTab = () => {
  const items = [
    'Connect test equipment correctly between line and earth at the furthest socket outlet',
    'Perform a "no-trip" test if RCDs/RCBOs are installed',
    'Compare measured Zs value with maximum Zs value in BS7671 Table 41.3',
    "Ensure value doesn't exceed maximum for the specific protective device",
    'Consider temperature factors when comparing to tabulated maximum values',
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <div className="space-y-1">
          <h2 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
            Earth fault loop impedance (Zs) testing
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed">
            Measures the impedance of the earth fault loop path to ensure protective devices will
            operate in fault conditions.
          </p>
        </div>

        <ul className="space-y-1.5">
          {items.map((item, i) => (
            <li
              key={i}
              className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <img
            loading="lazy"
            src="/placeholder.svg"
            alt="Zs Testing Setup"
            className="mx-auto max-h-64"
          />
          <p className="text-[12px] text-center mt-2 text-white/55">
            Earth fault loop impedance test connection diagram
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZsTestingTab;
