import { Settings, Zap, PanelLeft, Cable, PlugZap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Industrial vs domestic electrical setup', icon: Settings, description: 'Key differences between industrial and domestic systems.' },
  { id: 2, title: 'HV/LV separation and transformer overview', icon: Zap, description: 'High voltage systems and transformer principles.' },
  { id: 3, title: 'MCC panels and switchgear intro', icon: PanelLeft, description: 'Motor control centres and switchgear basics.' },
  { id: 4, title: 'Cabling, busbar systems and riser design', icon: Cable, description: 'Power distribution methods and design.' },
  { id: 5, title: 'Earthing and bonding strategies', icon: PlugZap, description: 'Industrial earthing systems and protection.' },
];

export default function IndustrialElectricalModule1() {
  useSEO({
    title: 'Module 1: Industrial Electrical Distribution | Industrial Electrical | Elec-Mate',
    description: 'How industrial distribution differs from domestic — HV/LV separation, MCC panels, busbars and earthing strategies.',
  });

  return (
    <ModuleShell
      backTo="../industrial-electrical-course"
      backLabel="Industrial electrical systems"
      moduleNumber={1}
      title="Overview of industrial electrical distribution"
      description="The fundamentals of industrial distribution — from incomer through MCC panels to earthing."
      tone="orange"
      sectionsCount={sections.length}
      duration="50 mins"
      nextModuleHref="../industrial-electrical-module-2"
      nextModuleLabel="Motors, starters and control gear"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../industrial-electrical-module-1-section-${section.id}`}
          sectionNumber={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
