import { Scale, FileCheck, Shield, UserCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Legislation and standards',
    icon: Scale,
    description:
      'HASAWA, EAWR, COSHH, PUWER, LOLER, CDM regulations, RIDDOR, environmental law and HSE enforcement.',
  },
  {
    id: 2,
    title: 'Risk assessment and method statements',
    icon: FileCheck,
    description:
      'Hazard identification, the five steps to risk assessment, writing RAMS and the hierarchy of control.',
  },
  {
    id: 3,
    title: 'Safety management systems',
    icon: Shield,
    description:
      'Safety policy and culture, accident reporting, permit-to-work systems, audits and emergency procedures.',
  },
  {
    id: 4,
    title: 'Professional responsibilities',
    icon: UserCheck,
    description:
      'Engineering ethics, duty of care, accountability, safety representatives and CPD in health and safety.',
  },
];

export default function HNCModule1() {
  useSEO({
    title: 'Module 1: Health, Safety and Risk Management | HNC | Elec-Mate',
    description:
      'Health and safety legislation, risk assessment, RAMS, safety management systems and professional responsibilities for engineering environments.',
  });

  return (
    <ModuleShell
      backTo="../hnc"
      backLabel="HNC electrical engineering"
      moduleNumber={1}
      title="Health, safety and risk management"
      description="Legislation, risk assessment, safety management and professional responsibilities for engineering environments."
      tone="purple"
      sectionsCount={sections.length}
      duration="2h"
      nextModuleHref="../h-n-c-module2"
      nextModuleLabel="Building services science"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../h-n-c-module1-section${section.id}`}
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
