import { ShieldCheck, FileText, HardHat, AlertTriangle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Risk assessment & method statements',
    icon: ShieldCheck,
    description:
      'The 5-step risk assessment process, RAMS preparation, hierarchy of controls, and dynamic risk assessment on site.',
  },
  {
    id: 2,
    title: 'Personal protective equipment',
    icon: FileText,
    description:
      'PPE types, selection, fitting, maintenance, storage, and employer/employee duties under the PPE Regulations 2022.',
  },
  {
    id: 3,
    title: 'Workplace welfare & site safety',
    icon: HardHat,
    description:
      'Welfare facilities, site inductions, housekeeping, traffic management and safety signage requirements.',
  },
  {
    id: 4,
    title: 'Accident reporting & RIDDOR',
    icon: AlertTriangle,
    description:
      'Accident books, RIDDOR reporting requirements, near-miss reporting and investigation procedures.',
  },
];

export default function CscsCardModule2() {
  useSEO({
    title: 'Module 2: General Health & Safety | CSCS Card Preparation | Elec-Mate',
    description:
      'Risk assessment, PPE, workplace welfare, accident reporting and RIDDOR requirements for the CSCS HS&E test.',
  });

  return (
    <ModuleShell
      backTo="../cscs-card-course"
      backLabel="CSCS card preparation"
      moduleNumber={2}
      title="General health & safety"
      description="Risk assessment processes, personal protective equipment requirements, workplace welfare standards, and accident reporting obligations including RIDDOR."
      tone="green"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../cscs-card-module-1"
      prevModuleLabel="Introduction to CSCS & the HS&E test"
      nextModuleHref="../cscs-card-module-3"
      nextModuleLabel="Working at height & manual handling"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cscs-card-module-2-section-${section.id}`}
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
