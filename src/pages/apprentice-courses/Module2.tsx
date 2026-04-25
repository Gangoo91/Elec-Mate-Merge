import { Calculator, Zap, GitBranch, Power, Wrench, TrendingUp } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Electrical quantities and units',
    icon: Calculator,
    description: 'Voltage, current, resistance and the units used to measure them.',
    href: 'section1',
  },
  {
    id: 2,
    title: "Ohm's law and electrical calculations",
    icon: Zap,
    description: "Applying Ohm's law to calculate voltage, current and resistance relationships.",
    href: 'section2',
  },
  {
    id: 3,
    title: 'Series and parallel circuits',
    icon: GitBranch,
    description: 'Analysing electrical parameters in series and parallel circuit configurations.',
    href: 'section3',
  },
  {
    id: 4,
    title: 'AC and DC supply',
    icon: Power,
    description: 'Alternating and direct current characteristics, waveforms and applications.',
    href: 'section4',
  },
  {
    id: 5,
    title: 'Electrical materials and resistance',
    icon: Wrench,
    description: 'Conductors, insulators and the factors that affect resistance.',
    href: 'section5',
  },
  {
    id: 6,
    title: 'Power, energy and efficiency',
    icon: TrendingUp,
    description: 'Calculating electrical power consumption, energy usage and system efficiency.',
    href: 'section6',
  },
];

export default function Module2() {
  useSEO({
    title: 'Module 2: Principles of Electrical Science | Level 2 Electrical | Elec-Mate',
    description:
      "Electrical quantities, Ohm's law, series and parallel circuits, AC/DC supply, materials and power calculations.",
  });

  return (
    <ModuleShell
      backTo=".."
      backLabel="Level 2 electrical installation"
      moduleNumber={2}
      title="Principles of electrical science"
      description="Fundamental electrical theory — quantities, Ohm's law, circuits, AC/DC supply, materials and power."
      tone="emerald"
      sectionsCount={sections.length}
      prevModuleHref="../module1"
      prevModuleLabel="Health and safety in installation"
      nextModuleHref="../module3"
      nextModuleLabel="Installation methods and technology"
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
