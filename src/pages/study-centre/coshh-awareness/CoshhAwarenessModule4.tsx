import { Layers, Settings, Shield, Package } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Hierarchy of control',
    icon: Layers,
    description:
      'Elimination, substitution, engineering controls, administrative controls, and PPE as the last line of defence.',
  },
  {
    id: 2,
    title: 'Engineering controls',
    icon: Settings,
    description:
      'Local exhaust ventilation systems, general ventilation, enclosure, segregation and automated processes.',
  },
  {
    id: 3,
    title: 'RPE & PPE selection',
    icon: Shield,
    description:
      'RPE types, assigned protection factors, face-fit testing, chemical-resistant gloves, goggles and overalls.',
  },
  {
    id: 4,
    title: 'Storage, handling & disposal',
    icon: Package,
    description:
      'DSEAR requirements, chemical storage best practice, segregation rules, spill kits and hazardous waste disposal.',
  },
];

export default function CoshhAwarenessModule4() {
  useSEO({
    title: 'Module 4: Control Measures & PPE | COSHH Awareness | Elec-Mate',
    description:
      'The hierarchy of control for hazardous substances, engineering controls, RPE and PPE selection, and safe storage, handling and disposal procedures.',
  });

  return (
    <ModuleShell
      backTo="../coshh-awareness-course"
      backLabel="COSHH awareness"
      moduleNumber={4}
      title="Control measures & PPE"
      description="How to control exposure to hazardous substances using the hierarchy of control — from elimination through to RPE and PPE, plus safe storage and disposal."
      tone="purple"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../coshh-awareness-module-3"
      prevModuleLabel="Hazardous substances on site"
      nextModuleHref="../coshh-awareness-module-5"
      nextModuleLabel="Monitoring, surveillance & emergencies"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../coshh-awareness-module-4-section-${section.id}`}
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
