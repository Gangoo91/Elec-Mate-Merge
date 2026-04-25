import { Construction, Layers, Building2, Users } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What is scaffolding?',
    icon: Construction,
    description:
      'Temporary structures providing access and working platforms for construction, maintenance and repair at height.',
  },
  {
    id: 2,
    title: 'Types of scaffolding',
    icon: Layers,
    description:
      'Independent, putlog, system, mobile towers, cantilever, suspended and birdcage scaffolds — and when each is used.',
  },
  {
    id: 3,
    title: 'Scaffold terminology',
    icon: Building2,
    description:
      'Standards, ledgers, transoms, braces, putlogs, guard rails, toe boards, sole boards, base plates and couplers.',
  },
  {
    id: 4,
    title: 'Who does what?',
    icon: Users,
    description:
      'Scaffolders (CISRS), scaffold inspectors, users, designers and the competent person role.',
  },
];

export default function ScaffoldingAwarenessModule1() {
  useSEO({
    title: 'Module 1: Introduction to Scaffolding | Scaffolding Awareness | Elec-Mate',
    description:
      'Scaffolding types, terminology, components and the roles of scaffolders, inspectors and competent persons.',
  });

  return (
    <ModuleShell
      backTo="../scaffolding-awareness-course"
      backLabel="Scaffolding awareness"
      moduleNumber={1}
      title="Introduction to scaffolding"
      description="Understand what scaffolding is and why it is essential, the different types used on site, the key terminology and the roles and responsibilities of everyone involved."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      nextModuleHref="../scaffolding-awareness-module-2"
      nextModuleLabel="Scaffold regulations & standards"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../scaffolding-awareness-module-1-section-${section.id}`}
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
