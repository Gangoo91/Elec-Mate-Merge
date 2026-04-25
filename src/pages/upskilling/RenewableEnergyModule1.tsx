import { Lightbulb, Layers, Battery, Globe } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Introduction to renewables: the need, benefits and grid impact', icon: Lightbulb, description: 'Why renewable energy matters and its impact on the grid.' },
  { id: 2, title: 'Overview of key systems: solar PV, wind, hydro, biomass', icon: Layers, description: 'A tour of the main renewable energy technologies.' },
  { id: 3, title: 'Renewable generation vs energy storage', icon: Battery, description: 'How generation and storage systems work together.' },
  { id: 4, title: 'Global and UK regulatory landscape (Net Zero, SEG)', icon: Globe, description: 'Regulations, net zero targets and the Smart Export Guarantee.' },
];

export default function RenewableEnergyModule1() {
  useSEO({
    title: 'Module 1: Overview of Renewable Energy Technologies | Elec-Mate',
    description: 'The need for renewables, key technologies, generation vs storage and the UK regulatory landscape.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={1}
      title="Overview of renewable energy technologies"
      description="The big picture of renewables — why they matter, what is available and how they fit into UK regulation."
      tone="cyan"
      sectionsCount={sections.length}
      duration="45 mins"
      nextModuleHref="../renewable-energy-module-2"
      nextModuleLabel="Solar PV system design and operation"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-1-section-${section.id}`}
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
