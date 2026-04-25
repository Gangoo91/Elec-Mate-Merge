import { Cable, Shield, BarChart, Plug, Zap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Twisted pair basics and categories',
    icon: Cable,
    description: 'Understanding twisted pair cable construction and category ratings.',
  },
  {
    id: 2,
    title: 'UTP, FTP and STP explained',
    icon: Shield,
    description: 'Different cable shielding types and where each is best applied.',
  },
  {
    id: 3,
    title: 'Performance ratings and bandwidth limits',
    icon: BarChart,
    description: 'Cable performance specifications and frequency limitations.',
  },
  {
    id: 4,
    title: 'Connectors and patch panel configuration',
    icon: Plug,
    description: 'RJ45 termination, keystones and patch panel layouts.',
  },
  {
    id: 5,
    title: 'PoE (Power over Ethernet) use and limitations',
    icon: Zap,
    description: 'Power over Ethernet capabilities, classes and constraints.',
  },
];

export default function DataCablingModule2() {
  useSEO({
    title: 'Module 2: Copper Cabling Standards | Data Cabling | Elec-Mate',
    description:
      'Twisted pair categories, shielding types, performance ratings, connectors and Power over Ethernet.',
  });

  return (
    <ModuleShell
      backTo="../data-cabling-course"
      backLabel="Data and communications cabling"
      moduleNumber={2}
      title="Copper cabling standards (Cat5e, Cat6, etc.)"
      description="Copper cable types, standards and performance characteristics."
      tone="cyan"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../data-cabling-module-1"
      prevModuleLabel="Introduction to structured cabling systems"
      nextModuleHref="../data-cabling-module-3"
      nextModuleLabel="Fibre optics: types, termination and testing"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../data-cabling-module-2-section-${section.id}`}
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
