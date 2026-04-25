import { HardHat, GraduationCap, ShieldCheck, Scale } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Managing the construction phase',
    icon: HardHat,
    description:
      'How the principal contractor plans, manages, monitors and coordinates the construction phase, including implementing the construction phase plan and managing subcontractors.',
  },
  {
    id: 2,
    title: 'Site inductions & competence',
    icon: GraduationCap,
    description:
      'Site-specific induction requirements, ensuring workers have the skills, knowledge, training and experience to carry out their tasks safely, and the role of CSCS cards.',
  },
  {
    id: 3,
    title: 'Welfare facilities',
    icon: ShieldCheck,
    description:
      'The minimum welfare facility requirements under Schedule 2 of CDM 2015 — sanitary conveniences, washing facilities, drinking water, rest facilities and changing rooms.',
  },
  {
    id: 4,
    title: 'Monitoring, review & enforcement',
    icon: Scale,
    description:
      'How the HSE enforces CDM 2015, the powers of inspectors, improvement and prohibition notices, penalties for non-compliance, and ongoing monitoring and review.',
  },
];

export default function CdmRegulationsModule5() {
  useSEO({
    title: 'Module 5: Construction phase & compliance | CDM regulations awareness | Elec-Mate',
    description:
      'Managing the construction phase, site inductions and competence, welfare facilities, and monitoring, review and enforcement under CDM 2015.',
  });

  return (
    <ModuleShell
      backTo="../cdm-regulations-course"
      backLabel="CDM regulations awareness"
      moduleNumber={5}
      title="Construction phase & compliance"
      description="How to manage the construction phase safely — site induction and worker competence, minimum welfare facility standards, and how the HSE monitors, reviews and enforces CDM 2015."
      tone="blue"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../cdm-regulations-module-4"
      prevModuleLabel="Design & risk management"
      nextModuleHref="../cdm-regulations-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cdm-regulations-module-5-section-${section.id}`}
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
