import { Building2, PenTool, HardHat, Users } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The client',
    icon: Building2,
    description:
      "The client's duties under CDM 2015 including making suitable arrangements, ensuring adequate time and resources, and appointing duty holders.",
  },
  {
    id: 2,
    title: 'Principal designer',
    icon: PenTool,
    description:
      "The principal designer's role in planning, managing and coordinating the pre-construction phase, ensuring designers comply with their duties, and preparing the health and safety file.",
  },
  {
    id: 3,
    title: 'Principal contractor',
    icon: HardHat,
    description:
      "The principal contractor's responsibilities for planning, managing and coordinating the construction phase, producing the construction phase plan, and organising cooperation between contractors.",
  },
  {
    id: 4,
    title: 'Designers, contractors & workers',
    icon: Users,
    description:
      'The duties of designers to eliminate and reduce risk through design, contractors to plan and manage their own work safely, and workers to cooperate and report unsafe conditions.',
  },
];

export default function CdmRegulationsModule2() {
  useSEO({
    title: 'Module 2: Duty holders & their roles | CDM regulations awareness | Elec-Mate',
    description:
      'CDM 2015 duty holders including the client, principal designer, principal contractor, designers, contractors and workers.',
  });

  return (
    <ModuleShell
      backTo="../cdm-regulations-course"
      backLabel="CDM regulations awareness"
      moduleNumber={2}
      title="Duty holders & their roles"
      description="The five key duty holder roles under CDM 2015 — who is responsible for what and how the roles work together to ensure safe construction."
      tone="blue"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../cdm-regulations-module-1"
      prevModuleLabel="Introduction to CDM 2015"
      nextModuleHref="../cdm-regulations-module-3"
      nextModuleLabel="Pre-construction & planning"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cdm-regulations-module-2-section-${section.id}`}
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
