import ToolListSection from './ToolListSection';
import { powerToolSections } from '@/data/professional-tools/powerToolsData';

const PowerToolsPanel = () => {
  return (
    <div className="space-y-3 animate-fade-in">
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
