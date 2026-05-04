import ToolListSection from './ToolListSection';
import { handToolSections } from '@/data/professional-tools/handToolsData';

const HandToolsPanel = () => {
  return (
    <div className="space-y-3 animate-fade-in">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Hand tools
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          The foundation of every electrician's toolkit. Invest in quality VDE-rated tools — they
          protect your life and last years longer than cheap alternatives.
        </p>
      </div>

      {handToolSections.map((section, i) => (
        <ToolListSection
          key={section.id}
          id={section.id}
          title={section.title}
          tools={section.tools}
          defaultOpen={i === 0}
          accentColour="cyan"
        />
      ))}
    </div>
  );
};

export default HandToolsPanel;
