import { Calculator, Zap, BarChart3, Cog, Battery, Gauge } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'DC and AC circuit theory',
    icon: Calculator,
    description:
      "Ohm's law, Kirchhoff's laws, circuit analysis, Thevenin and Norton, superposition and transients.",
  },
  {
    id: 2,
    title: 'Inductance, capacitance and power factor',
    icon: Zap,
    description:
      'Reactive components, impedance, phase relationships, power factor correction and resonance.',
  },
  {
    id: 3,
    title: 'Alternating current theory and waveforms',
    icon: BarChart3,
    description: 'AC characteristics, waveforms, harmonics, power relationships and AC efficiency.',
  },
  {
    id: 4,
    title: 'Three-phase systems and distribution',
    icon: Cog,
    description:
      'Star and delta configurations, balanced loads, three-phase power calculations and distribution.',
  },
  {
    id: 5,
    title: 'Electrical machines and transformers',
    icon: Battery,
    description:
      'Electromagnetic induction, transformer theory, motor types, control systems and maintenance.',
  },
  {
    id: 6,
    title: 'Energy efficiency in electrical systems',
    icon: Gauge,
    description: 'Losses, efficiency calculations, load management, smart controls and renewables.',
  },
];

export default function HNCModule3() {
  useSEO({
    title: 'Module 3: Electrical and Electronic Principles | HNC | Elec-Mate',
    description:
      'Circuit theory, AC and DC analysis, three-phase systems, machines, transformers and energy efficiency for building services.',
  });

  return (
    <ModuleShell
      backTo="../hnc"
      backLabel="HNC electrical engineering"
      moduleNumber={3}
      title="Electrical and electronic principles"
      description="Circuit analysis, AC and DC theory, three-phase systems and electrical machines underpinning building services."
      tone="purple"
      sectionsCount={sections.length}
      duration="2h"
      prevModuleHref="../h-n-c-module2"
      prevModuleLabel="Building services science"
      nextModuleHref="../h-n-c-module4"
      nextModuleLabel="Design principles for building services"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../h-n-c-module3-section${section.id}`}
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
