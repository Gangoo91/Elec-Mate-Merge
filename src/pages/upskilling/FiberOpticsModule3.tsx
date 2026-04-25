import { Cable, RotateCcw, Route, Package, Flame, Zap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Fibre cable types: indoor, outdoor, armoured', icon: Cable, description: 'Cable construction types and environmental considerations.' },
  { id: 2, title: 'Bend radius and handling precautions', icon: RotateCcw, description: 'Proper handling techniques and bend radius limits.' },
  { id: 3, title: 'Routing and containment (tray, conduit, basket)', icon: Route, description: 'Cable routing methods and containment systems.' },
  { id: 4, title: 'Splice enclosure mounting', icon: Package, description: 'Splice closure installation and mounting techniques.' },
  { id: 5, title: 'Firestop and penetration rules', icon: Flame, description: 'Fire safety requirements and building penetrations.' },
  { id: 6, title: 'Earthing and segregation', icon: Zap, description: 'Earthing requirements and cable segregation.' },
];

export default function FiberOpticsModule3() {
  useSEO({
    title: 'Module 3: Fibre Optic Cables and Installation | Fibre Optics | Elec-Mate',
    description: 'Cable types, bend radius, routing and containment, splice enclosures, firestop and earthing for fibre installations.',
  });

  return (
    <ModuleShell
      backTo="../fiber-optics-course"
      backLabel="Fibre optics technology"
      moduleNumber={3}
      title="Fibre optic cables and installation"
      description="Selecting cables, routing, mounting splice enclosures and meeting fire and earthing requirements."
      tone="cyan"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../fiber-optics-module-2"
      prevModuleLabel="Fibre types and connectors"
      nextModuleHref="../fiber-optics-module-4"
      nextModuleLabel="Termination and splicing techniques"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../fiber-optics-module-3-section-${section.id}`}
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
