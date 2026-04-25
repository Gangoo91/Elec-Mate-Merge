import { Container, Tag, Zap, Route, FileCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Containment systems: basket, conduit, trunking',
    icon: Container,
    description: 'Cable containment systems and selection for data installations.',
  },
  {
    id: 2,
    title: 'Cable separation and bend radius',
    icon: Route,
    description: 'Installation guidelines and physical constraints for performance.',
  },
  {
    id: 3,
    title: 'Fire-stopping and penetration sealing',
    icon: Zap,
    description: 'Fire protection at building penetrations and compartment seals.',
  },
  {
    id: 4,
    title: 'ID labelling standards and colour codes',
    icon: Tag,
    description: 'Cable identification, marking systems and colour coding.',
  },
  {
    id: 5,
    title: 'Rack and patch panel organisation',
    icon: FileCheck,
    description: 'Equipment room layout, cable management and labelling.',
  },
];

export default function DataCablingModule4() {
  useSEO({
    title: 'Module 4: Containment, Labelling & Installation | Data Cabling | Elec-Mate',
    description:
      'Cable containment, separation, fire-stopping, labelling standards and rack organisation best practice.',
  });

  return (
    <ModuleShell
      backTo="../data-cabling-course"
      backLabel="Data and communications cabling"
      moduleNumber={4}
      title="Containment, labelling and installation best practice"
      description="Cable containment, identification and installation standards."
      tone="cyan"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../data-cabling-module-3"
      prevModuleLabel="Fibre optics: types, termination and testing"
      nextModuleHref="../data-cabling-module-5"
      nextModuleLabel="Termination and certification procedures"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../data-cabling-module-4-section-${section.id}`}
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
