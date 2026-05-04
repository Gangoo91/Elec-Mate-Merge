const R1R2Step2 = () => {
  const items = [
    'Set test meter to continuity/resistance mode',
    'Null the test leads to remove their resistance from the measurement',
    'Connect one lead to the main earth terminal',
    'Connect the other lead to each point being tested',
    'Record all readings in a systematic manner',
  ];
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Step 2
        </span>
        <h3 className="text-[18px] font-semibold text-white leading-tight">Perform the test</h3>
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
          alt="R1+R2 Testing Process"
          className="mx-auto max-h-64"
        />
        <p className="text-[12px] text-center mt-2 text-white/55">
          Testing process diagram showing proper testing technique
        </p>
      </div>
    </div>
  );
};

export default R1R2Step2;
