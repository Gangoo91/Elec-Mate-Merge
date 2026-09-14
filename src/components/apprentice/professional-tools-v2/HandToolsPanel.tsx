import ToolListSection from './ToolListSection';
import { handToolSections } from '@/data/professional-tools/handToolsData';

const HandToolsPanel = () => {
  return (
    <div className="space-y-3 animate-fade-in">
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
