const R1R2Step1 = () => {
  const items = [
    "Isolate the circuit and ensure it's safe to test",
    'Verify the test instrument is functioning correctly using a calibration check',
    'Ensure all protective conductors are correctly identified',
    'Remove any electronic devices that might be damaged by testing',
  ];
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Step 1
        </span>
        <h3 className="text-[18px] font-semibold text-white leading-tight">Prepare for testing</h3>
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
          alt="R1+R2 Testing Equipment Setup"
          className="mx-auto max-h-64"
        />
        <p className="text-[12px] text-center mt-2 text-white/55">
          Proper test equipment connection diagram
        </p>
      </div>
    </div>
  );
};

export default R1R2Step1;
