const R1R2Step3 = () => {
  const items = [
    'All readings should be low ohms (typically less than 1Ω)',
    'For long cable runs, calculate the expected resistance based on cable length',
    'Document all results on the appropriate certificate',
    'Investigate any unexpectedly high readings',
  ];
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Step 3
        </span>
        <h3 className="text-[18px] font-semibold text-white leading-tight">Evaluate results</h3>
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
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Maximum permissible values
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          For radial circuits: R₁+R₂ should be less than the value that would cause excessive volt
          drop.
          <br />
          For ring circuits: Compare with values calculated from (R₁+R₂)/4.
        </p>
      </div>
    </div>
  );
};

export default R1R2Step3;
