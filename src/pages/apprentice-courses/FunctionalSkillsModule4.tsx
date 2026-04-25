import { Zap, Cable, PoundSterling, Compass } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Electrical calculations',
    icon: Zap,
    description:
      "Ohm's law, the power triangle, voltage drop, diversity, maximum demand and Zs calculations.",
    href: '/study-centre/apprentice/functional-skills/module4/section1',
  },
  {
    id: 2,
    title: 'Cable sizing and selection',
    icon: Cable,
    description:
      'Current-carrying capacity, correction factors, voltage-drop calculations and worked examples.',
    href: '/study-centre/apprentice/functional-skills/module4/section2',
  },
  {
    id: 3,
    title: 'Costing and quoting',
    icon: PoundSterling,
    description: 'Material take-offs, labour rates, markup and margin, VAT and creating quotes.',
    href: '/study-centre/apprentice/functional-skills/module4/section3',
  },
  {
    id: 4,
    title: 'Geometry and spatial skills',
    icon: Compass,
    description: 'Conduit bending angles, trunking fill, containment layouts and trigonometry.',
    href: '/study-centre/apprentice/functional-skills/module4/section4',
  },
];

export default function FunctionalSkillsModule4() {
  useSEO({
    title: 'Module 4: Practical Mathematics Applications | Functional Skills | Elec-Mate',
    description:
      'Apply mathematical skills to real electrical work — calculations, cable sizing, costing and geometry.',
  });

  return (
    <ModuleShell
      backTo="../functional-skills"
      backLabel="Functional skills"
      moduleNumber={4}
      title="Practical mathematics applications"
      description="Put the maths to work on real installs — calcs, cable sizing, costing and on-site geometry."
      tone="yellow"
      sectionsCount={sections.length}
      duration="1h"
      prevModuleHref="/study-centre/apprentice/functional-skills/module3"
      prevModuleLabel="Digital skills for electricians"
      nextModuleHref="/study-centre/apprentice/functional-skills/module5"
      nextModuleLabel="Assessment preparation"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={section.href}
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
