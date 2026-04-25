import { Lightbulb, Shield, Cpu, Route, TrendingUp, TestTube } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Fibre types: singlemode vs multimode',
    icon: Lightbulb,
    description: 'Different fibre optic cable types and their typical applications.',
  },
  {
    id: 2,
    title: 'Connector types and polish grades (LC, SC, ST)',
    icon: Shield,
    description: 'Fibre optic connector types, ferrules and polishing standards.',
  },
  {
    id: 3,
    title: 'Cleaving, splicing and connectorisation',
    icon: Cpu,
    description: 'Fibre preparation, fusion splicing and termination techniques.',
  },
  {
    id: 4,
    title: 'Loss budgets and OTDR basics',
    icon: Route,
    description: 'Optical loss calculations and OTDR testing fundamentals.',
  },
  {
    id: 5,
    title: 'Bending radius and fibre routing',
    icon: TrendingUp,
    description: 'Installation guidelines, bend radius limits and routing best practice.',
  },
  {
    id: 6,
    title: 'Fibre safety and cleaning',
    icon: TestTube,
    description: 'Eye safety, cleaning procedures and maintenance practices.',
  },
];

export default function DataCablingModule3() {
  useSEO({
    title: 'Module 3: Fibre Optics | Data Cabling | Elec-Mate',
    description:
      'Singlemode vs multimode, connectors, splicing, OTDR testing, bending radius and fibre safety.',
  });

  return (
    <ModuleShell
      backTo="../data-cabling-course"
      backLabel="Data and communications cabling"
      moduleNumber={3}
      title="Fibre optics: types, termination and testing"
      description="Fibre optic systems, installation and testing procedures."
      tone="cyan"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../data-cabling-module-2"
      prevModuleLabel="Copper cabling standards (Cat5e, Cat6, etc.)"
      nextModuleHref="../data-cabling-module-4"
      nextModuleLabel="Containment, labelling and installation best practice"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../data-cabling-module-3-section-${section.id}`}
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
