import { Zap, Activity, Cog, Shield, Wrench } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Electrical fundamentals', icon: Zap, description: "Voltage, current, resistance, power, Ohm's and Watt's laws, units and symbols." },
  { id: 2, title: 'AC/DC systems and components', icon: Activity, description: 'DC and AC principles, single- and three-phase systems, reactance and power factor.' },
  { id: 3, title: 'Electrical machines', icon: Cog, description: 'Transformers, induction motors, synchronous machines and motor starting.' },
  { id: 4, title: 'Circuit protection and earthing', icon: Shield, description: 'Fuses, breakers, RCDs, earthing systems, bonding and surge protection.' },
  { id: 5, title: 'Materials, tools and test equipment', icon: Wrench, description: 'Conductors, insulation, hand and power tools, and test instruments.' },
];

export default function MOETModule2() {
  useSEO({
    title: 'Module 2: Engineering Principles and Electrical Theory | MOET | Elec-Mate',
    description: 'Electrical fundamentals, AC/DC systems, machines, protection, earthing and the test equipment maintenance engineers use.',
  });

  return (
    <ModuleShell
      backTo="../moet"
      backLabel="MOET"
      moduleNumber={2}
      title="Engineering principles and electrical theory"
      description="The fundamental engineering principles, electrical theory and maths a maintenance engineer needs."
      tone="orange"
      sectionsCount={sections.length}
      duration="4h"
      prevModuleHref="../m-o-e-t-module1"
      prevModuleLabel="Health, safety and compliance"
      nextModuleHref="../m-o-e-t-module3"
      nextModuleLabel="Electrical plant, equipment and systems"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../m-o-e-t-module2-section${section.id}`}
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
