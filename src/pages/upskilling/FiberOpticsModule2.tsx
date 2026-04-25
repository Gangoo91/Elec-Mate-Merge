import { Layers, Award, Plug, Target, Grid, Link2 } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Singlemode vs multimode fibre', icon: Layers, description: 'Understanding fibre types and core differences.' },
  { id: 2, title: 'OM and OS standards explained', icon: Award, description: 'Optical multimode and singlemode classifications.' },
  { id: 3, title: 'Connector types (LC, SC, ST, MTP)', icon: Plug, description: 'Common connector types and applications.' },
  { id: 4, title: 'Polish grades (UPC, APC)', icon: Target, description: 'Connector polish types and specifications.' },
  { id: 5, title: 'Patch panels and transceivers', icon: Grid, description: 'Network equipment and interface devices.' },
  { id: 6, title: 'Connector compatibility', icon: Link2, description: 'Ensuring proper connector matching and performance.' },
];

export default function FiberOpticsModule2() {
  useSEO({
    title: 'Module 2: Fibre Types and Connectors | Fibre Optics | Elec-Mate',
    description: 'Singlemode vs multimode fibre, OM/OS standards, connector types, polish grades and patch panel compatibility.',
  });

  return (
    <ModuleShell
      backTo="../fiber-optics-course"
      backLabel="Fibre optics technology"
      moduleNumber={2}
      title="Fibre types and connectors"
      description="Selecting the right fibre type and connector for the job, including polish grades and compatibility."
      tone="cyan"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../fiber-optics-module-1"
      prevModuleLabel="Introduction to fibre optics"
      nextModuleHref="../fiber-optics-module-3"
      nextModuleLabel="Fibre optic cables and installation"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../fiber-optics-module-2-section-${section.id}`}
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
