import { PenTool, AlertTriangle, Wrench, Handshake } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: "Designers' duties",
    icon: PenTool,
    description:
      'The general principles of prevention as applied to design, the duty to eliminate hazards and reduce risks, and how designers must provide information about residual risks.',
  },
  {
    id: 2,
    title: 'Risk assessment in design',
    icon: AlertTriangle,
    description:
      'Identifying foreseeable risks at the design stage, the hierarchy of risk control in design decisions, and practical examples of designing out hazards on construction projects.',
  },
  {
    id: 3,
    title: 'Buildability & maintainability',
    icon: Wrench,
    description:
      'Designing for safe construction, safe maintenance, safe cleaning and eventual demolition — considering the whole lifecycle of the structure from build through to end of life.',
  },
  {
    id: 4,
    title: 'Coordination & cooperation',
    icon: Handshake,
    description:
      'The duty on all duty holders to cooperate and coordinate their work, sharing information about risks and ensuring designs do not create hazards for other trades or future users.',
  },
];

export default function CdmRegulationsModule4() {
  useSEO({
    title: 'Module 4: Design & risk management | CDM regulations awareness | Elec-Mate',
    description:
      "Designers' duties, risk assessment in design, buildability and maintainability, and coordination and cooperation under CDM 2015.",
  });

  return (
    <ModuleShell
      backTo="../cdm-regulations-course"
      backLabel="CDM regulations awareness"
      moduleNumber={4}
      title="Design & risk management"
      description="How design decisions affect health and safety on construction projects — designers' legal duties, risk assessment at the design stage, designing for buildability and maintainability, and coordination."
      tone="blue"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../cdm-regulations-module-3"
      prevModuleLabel="Pre-construction & planning"
      nextModuleHref="../cdm-regulations-module-5"
      nextModuleLabel="Construction phase & compliance"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cdm-regulations-module-4-section-${section.id}`}
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
