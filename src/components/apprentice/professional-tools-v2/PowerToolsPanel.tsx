import ToolListSection from './ToolListSection';
import { powerToolSections } from '@/data/professional-tools/powerToolsData';

const PowerToolsPanel = () => {
  return (
    <div className="space-y-3 animate-fade-in">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Power tools
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Pick one battery platform (DeWalt, Milwaukee, or Makita) and stick with it. All your
          cordless tools share the same batteries, saving you hundreds over time.
        </p>
      </div>

      {powerToolSections.map((section, i) => (
        <ToolListSection
          key={section.id}
          id={section.id}
          title={section.title}
          tools={section.tools}
          defaultOpen={i === 0}
          accentColour="blue"
        />
      ))}
    </div>
  );
};

export default PowerToolsPanel;
