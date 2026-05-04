const PowerFactorInfo = () => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Power factor
      </span>
      <p className="text-[14px] text-white/85 leading-relaxed">
        Power factor is the ratio of working power to apparent power in an electrical circuit. It is
        a measure of how efficiently electrical power is converted into useful work output.
      </p>
      <ul className="space-y-1.5">
        {[
          'Ideal power factor = 1.0 (100% efficient)',
          'Low power factor increases energy costs',
          'Power factor = Active Power (W) / Apparent Power (VA)',
        ].map((point, i) => (
          <li
            key={i}
            className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
          >
            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PowerFactorInfo;
