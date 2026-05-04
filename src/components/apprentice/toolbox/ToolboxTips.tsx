import { useIsMobile } from '@/hooks/use-mobile';

const ToolboxTips = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 mt-6 space-y-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Essential guidance for apprentices
      </span>
      <ul className="space-y-1.5">
        {[
          'Use the chat feature to get instant help with electrical questions and problems',
          'Refer to the safety fundamentals regularly — safety should always be your top priority',
          'Explore career progression options early to plan your professional development',
          'Take advantage of the calculators to understand practical applications of electrical theory',
        ].map((item, i) => (
          <li
            key={i}
            className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
          >
            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolboxTips;
