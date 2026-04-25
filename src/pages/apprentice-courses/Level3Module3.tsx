import { Calculator, Zap, Magnet, Activity, Battery, Cable } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Electrical units and measurements',
    description: "Ohm's law, electrical quantities, measurement instruments, accuracy and SI units.",
    icon: Calculator,
  },
  {
    id: 2,
    title: 'Resistive, inductive and capacitive circuits',
    description: 'Pure circuits, combinations, phase angle, power factor and resonance.',
    icon: Zap,
  },
  {
    id: 3,
    title: 'Electromagnetic principles',
    description: 'Magnetic fields, electromagnetic induction, transformers and rotating machines.',
    icon: Magnet,
  },
  {
    id: 4,
    title: 'AC theory and waveforms',
    description: 'AC waveforms, phasor diagrams, impedance, power and harmonics.',
    icon: Activity,
  },
  {
    id: 5,
    title: 'Electrical power and energy',
    description: 'Power equations, efficiency and energy consumption in installations.',
    icon: Battery,
  },
  {
    id: 6,
    title: 'Cables and conductors',
    description: 'Conductor materials, resistance, current-carrying capacity and thermal effects.',
    icon: Cable,
  },
];

export default function Level3Module3() {
  useSEO({
    title: 'Module 3: Electrical Science Principles | Level 3 Electrical Installation | Elec-Mate',
    description:
      "Ohm's law, AC and DC circuit analysis, electromagnetic principles, AC theory, power, energy and cable selection for the Level 3 qualification.",
  });

  return (
    <ModuleShell
      backTo="../level3"
      backLabel="Level 3 electrical installation"
      moduleNumber={3}
      title="Electrical science principles"
      description="Advanced electrical theory, AC and DC circuit analysis, electromagnetism, power calculations and cable behaviour."
      tone="blue"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../level3-module2"
      prevModuleLabel="Environmental technology systems"
      nextModuleHref="../level3-module4"
      nextModuleLabel="Fault diagnosis and rectification"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../level3-module3-section${section.id}`}
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
