const CableSizingInfo = () => {
  const points = [
    'Current-carrying capacity',
    'Voltage drop over distance',
    'Installation method & ambient temperature',
    'Grouping factors when multiple cables run together',
    'Short circuit protection requirements',
  ];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Cable selection factors
      </span>
      <p className="text-[14px] text-white/85 leading-relaxed">
        Cable sizing depends on multiple factors beyond current rating alone:
      </p>
      <ul className="space-y-1.5">
        {points.map((point, i) => (
          <li
            key={i}
            className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
          >
            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <p className="text-[12px] text-white/55 leading-relaxed">
        Always consult relevant electrical codes and standards for your specific application.
      </p>
    </div>
  );
};

export default CableSizingInfo;
