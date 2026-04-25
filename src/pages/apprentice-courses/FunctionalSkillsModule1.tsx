import { Hash, Ruler, FunctionSquare, BarChart3 } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Number systems and arithmetic',
    icon: Hash,
    description:
      'Whole numbers, decimals, fractions, percentages, BIDMAS, negative numbers and rounding.',
    href: '/study-centre/apprentice/functional-skills/module1/section1',
  },
  {
    id: 2,
    title: 'Units and measurement',
    icon: Ruler,
    description:
      'SI units, imperial conversion, area, volume, perimeter, scale drawings and tolerances.',
    href: '/study-centre/apprentice/functional-skills/module1/section2',
  },
  {
    id: 3,
    title: 'Algebra and formulae',
    icon: FunctionSquare,
    description:
      "Ohm's law, the power formula, transposition, simultaneous equations and cable-sizing calculations.",
    href: '/study-centre/apprentice/functional-skills/module1/section3',
  },
  {
    id: 4,
    title: 'Data and statistics',
    icon: BarChart3,
    description:
      'Reading charts and graphs, mean, median and mode, interpreting test results and energy data.',
    href: '/study-centre/apprentice/functional-skills/module1/section4',
  },
];

export default function FunctionalSkillsModule1() {
  useSEO({
    title: 'Module 1: Mathematics for Electricians | Functional Skills | Elec-Mate',
    description:
      'Number systems, units, algebra, data handling and practical calculations for electrical work.',
  });

  return (
    <ModuleShell
      backTo="../functional-skills"
      backLabel="Functional skills"
      moduleNumber={1}
      title="Mathematics for electricians"
      description="The maths foundations every apprentice needs — numbers, units, algebra and data."
      tone="yellow"
      sectionsCount={sections.length}
      duration="1h"
      nextModuleHref="/study-centre/apprentice/functional-skills/module2"
      nextModuleLabel="English for electricians"
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
