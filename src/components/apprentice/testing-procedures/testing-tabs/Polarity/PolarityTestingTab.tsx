const PolarityTestingTab = () => {
  const items = [
    'Verify that single pole devices (switches, fuses) are connected in the line conductor only',
    'Check that bayonet/Edison screw lampholders have line conductor connected to the centre contact',
    'Confirm that all socket outlets have line/neutral/earth connected to the correct terminals',
    'Use a continuity tester to check correct polarity throughout the installation',
    'Pay special attention to two-way and intermediate switching arrangements',
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <div className="space-y-1">
          <h2 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
            Polarity testing
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed">
            Verifies that all connections are correctly wired and switches/fuses are in the line
            conductor.
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
            alt="Polarity Testing Method"
            className="mx-auto max-h-64"
          />
          <p className="text-[12px] text-center mt-2 text-white/55">
            Socket outlet and switch polarity testing diagram
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Safety warning
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Incorrect polarity is a serious safety issue that can result in electric shock hazards and
          incorrectly isolated circuits. Always double-check polarity tests and immediately rectify
          any issues found.
        </p>
      </div>
    </div>
  );
};

export default PolarityTestingTab;
