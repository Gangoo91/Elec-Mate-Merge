import { Wrench, Scissors, Settings, Link as LinkIcon, Eye } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Mechanical vs fusion splicing', icon: Wrench, description: 'Comparing splicing methods and applications.' },
  { id: 2, title: 'Cleaving and fibre prep', icon: Scissors, description: 'Fibre preparation and cleaving techniques.' },
  { id: 3, title: 'Splicing equipment overview', icon: Settings, description: 'Tools and equipment for splicing operations.' },
  { id: 4, title: 'Connectorisation techniques', icon: LinkIcon, description: 'Field and factory connector installation methods.' },
  { id: 5, title: 'Inspection microscopes and cleaning tools', icon: Eye, description: 'Quality control and maintenance equipment.' },
];

export default function FiberOpticsModule4() {
  useSEO({
    title: 'Module 4: Termination and Splicing | Fibre Optics | Elec-Mate',
    description: 'Mechanical vs fusion splicing, cleaving, connectorisation methods and inspection microscope use.',
  });

  return (
    <ModuleShell
      backTo="../fiber-optics-course"
      backLabel="Fibre optics technology"
      moduleNumber={4}
      title="Termination and splicing techniques"
      description="Splicing methods, fibre preparation, connectorisation and the inspection tools that prove a clean joint."
      tone="cyan"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../fiber-optics-module-3"
      prevModuleLabel="Fibre optic cables and installation"
      nextModuleHref="../fiber-optics-module-5"
      nextModuleLabel="Fibre testing and certification"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../fiber-optics-module-4-section-${section.id}`}
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
