import { Scale, BookOpen, FileText, Award } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Work at Height Regulations 2005',
    icon: Scale,
    description:
      'Hierarchy of control, duty to plan and supervise, Schedule 5 scaffolding requirements.',
  },
  {
    id: 2,
    title: 'HSWA 1974 & CDM 2015',
    icon: BookOpen,
    description:
      'General duties, CDM duty holders and how CDM applies to mobile tower scaffold work.',
  },
  {
    id: 3,
    title: 'BS EN 1004-1:2020 & related standards',
    icon: FileText,
    description:
      'Load classes, max heights, marking requirements, design loads and safety factors.',
  },
  {
    id: 4,
    title: 'PASMA & competence requirements',
    icon: Award,
    description:
      'Towers for Users course, competence vs qualification, card types and renewal cycles.',
  },
];

export default function IpafModule1() {
  useSEO({
    title: 'Module 1: Legislation & Responsibilities | IPAF | Elec-Mate',
    description:
      'Work at Height Regulations 2005, HSWA 1974, CDM 2015, BS EN 1004 and PASMA competence requirements.',
  });

  return (
    <ModuleShell
      backTo="../ipaf-course"
      backLabel="IPAF mobile scaffold training"
      moduleNumber={1}
      title="Legislation & responsibilities"
      description="Legal duties, key regulations, standards and competence requirements for mobile access tower work."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      nextModuleHref="../ipaf-module-2"
      nextModuleLabel="Tower types & components"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ipaf-module-1-section-${section.id}`}
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
