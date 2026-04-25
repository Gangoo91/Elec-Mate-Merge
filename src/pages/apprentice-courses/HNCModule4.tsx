import { Calculator, Cable, Shield, Lightbulb, Zap, FileText } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Electrical load assessment',
    icon: Calculator,
    description:
      'Maximum demand, diversity factors, power factor, harmonics and building services load profiles.',
  },
  {
    id: 2,
    title: 'Cable selection and sizing',
    icon: Cable,
    description:
      'Current-carrying capacity, voltage drop, thermal constraints, short-circuit withstand and installation methods.',
  },
  {
    id: 3,
    title: 'Protection and discrimination',
    icon: Shield,
    description:
      'Protection principles, device selection, fault current calculations, discrimination and earth-fault protection.',
  },
  {
    id: 4,
    title: 'Lighting design',
    icon: Lightbulb,
    description:
      'Design criteria, interior calculations, emergency lighting, controls and external lighting.',
  },
  {
    id: 5,
    title: 'Power distribution design',
    icon: Zap,
    description:
      'LV switchgear, distribution boards, busbar systems, UPS and standby power, power quality and metering.',
  },
  {
    id: 6,
    title: 'Specification and documentation',
    icon: FileText,
    description:
      'NBS specifications, electrical drawings, schedules, design calculations, CDM registers and BIM delivery.',
  },
];

export default function HNCModule4() {
  useSEO({
    title: 'Module 4: Design Principles for Building Services | HNC | Elec-Mate',
    description:
      'Load assessment, cable sizing, protection, lighting design, power distribution and specification for building services.',
  });

  return (
    <ModuleShell
      backTo="../hnc"
      backLabel="HNC electrical engineering"
      moduleNumber={4}
      title="Design principles for building services"
      description="From load assessment through cable sizing, protection and lighting to specification and documentation."
      tone="purple"
      sectionsCount={sections.length}
      duration="2h"
      prevModuleHref="../h-n-c-module3"
      prevModuleLabel="Electrical and electronic principles"
      nextModuleHref="../h-n-c-module5"
      nextModuleLabel="Project management"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../h-n-c-module4-section${section.id}`}
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
