const IRTestingTab = () => {
  const items = [
    'Ensure all circuit protection devices are ON and electronic devices are disconnected',
    'Select appropriate test voltage (typically 500V for most installations)',
    'Test between: Line-Neutral, Line-Earth, and Neutral-Earth',
    'Minimum acceptable values for new installations: 1MΩ for ≤ 500V installations',
    'Record all readings and note any unusually low values for investigation',
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <div className="space-y-1">
          <h2 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
            Insulation resistance (IR) testing
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed">
            Tests the insulation resistance between live conductors and between live conductors and
            earth.
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
            alt="IR Testing Connections"
            className="mx-auto max-h-64"
          />
          <p className="text-[12px] text-center mt-2 text-white/55">
            IR test connection points diagram
          </p>
        </div>
      </div>
    </div>
  );
};

export default IRTestingTab;
