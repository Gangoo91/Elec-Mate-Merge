import ToolListSection from "./ToolListSection";
import { powerToolSections } from "@/data/professional-tools/powerToolsData";

const PowerToolsPanel = () => {
  return (
    <div className="space-y-3 animate-fade-in">
      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
        <p className="text-sm text-white">
          <span className="font-semibold text-blue-300">Power Tools</span> —
          Pick one battery platform (DeWalt, Milwaukee, or Makita) and stick
          with it. All your cordless tools share the same batteries, saving you
          hundreds over time.
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
