const CareerAdvancementTips = () => {
  const tips = [
    'Continuously update your skills through courses and certifications',
    'Join professional organisations like the IET, ECA, or NICEIC to network with others in the field',
    'Consider specialising in growth areas like renewable energy, electric vehicles, or smart building systems',
    'Document your work and build a portfolio showcasing your most impressive projects',
    'Pursue additional qualifications like BS 7671 Wiring Regulations or inspection and testing certification',
    'Consider gaining experience in different sectors (domestic, commercial, industrial) to broaden your expertise',
    'Build relationships with suppliers, manufacturers and specialists to stay informed about industry developments',
  ];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3 animate-fade-in">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Career advancement tips
      </span>
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
          >
            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CareerAdvancementTips;
