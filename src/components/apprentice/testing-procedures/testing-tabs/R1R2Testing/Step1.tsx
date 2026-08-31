const R1R2Step1 = () => {
  const items = [
    'Isolate the circuit, prove dead, and secure the isolation before working on it',
    'Check the instrument against a known resistance and confirm the leads are sound',
    'Identify the circuit and its protective conductor positively — not by assumption',
    'Disconnect anything that would be damaged by the test, or would offer a parallel path and hide a break',
    'Note the cable length and both conductor sizes, and work out the resistance you expect — a reading only means something against a number you predicted',
  ];
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
          Step 1
        </span>
        <h3 className="text-[18px] font-semibold text-white leading-tight">Prepare for testing</h3>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default R1R2Step1;
