import { FileText, ClipboardList, FolderOpen, Send } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Pre-construction information',
    icon: FileText,
    description:
      'What pre-construction information is, who must provide it, what it should contain, and how it informs the design and planning of the construction phase.',
  },
  {
    id: 2,
    title: 'Construction phase plan',
    icon: ClipboardList,
    description:
      'Construction phase plan requirements, who produces it, when it must be in place, and the essential content including site rules, emergency procedures and risk management arrangements.',
  },
  {
    id: 3,
    title: 'Health & safety file',
    icon: FolderOpen,
    description:
      'The purpose of the health and safety file, what information it should contain, who is responsible for preparing and maintaining it, and how it is used during the life of the structure.',
  },
  {
    id: 4,
    title: 'Notification to HSE (F10)',
    icon: Send,
    description:
      'When a project must be notified to the Health and Safety Executive, the F10 notification process, required information, and the thresholds that trigger notification.',
  },
];

export default function CdmRegulationsModule3() {
  useSEO({
    title: 'Module 3: Pre-construction & planning | CDM regulations awareness | Elec-Mate',
    description:
      'Pre-construction information, construction phase plans, health and safety files and HSE notification requirements under CDM 2015.',
  });

  return (
    <ModuleShell
      backTo="../cdm-regulations-course"
      backLabel="CDM regulations awareness"
      moduleNumber={3}
      title="Pre-construction & planning"
      description="The key documentation and planning requirements under CDM 2015 — pre-construction information, the construction phase plan, the health and safety file, and notifying the HSE using F10."
      tone="blue"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../cdm-regulations-module-2"
      prevModuleLabel="Duty holders & their roles"
      nextModuleHref="../cdm-regulations-module-4"
      nextModuleLabel="Design & risk management"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cdm-regulations-module-3-section-${section.id}`}
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
