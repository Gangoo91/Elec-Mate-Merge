import ToolListSection from "./ToolListSection";
import { handToolSections } from "@/data/professional-tools/handToolsData";

const HandToolsPanel = () => {
  return (
    <div className="space-y-3 animate-fade-in">
      <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
        <p className="text-sm text-white">
          <span className="font-semibold text-cyan-300">Hand Tools</span> — The
          foundation of every electrician's toolkit. Invest in quality VDE-rated
          tools — they protect your life and last years longer than cheap
          alternatives.
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
