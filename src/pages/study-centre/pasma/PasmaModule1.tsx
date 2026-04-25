import { Scale, BookOpen, FileText, Award } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Work at Height Regs & HSWA 1974',
    icon: Scale,
    description:
      'WAHR 2005 hierarchy of control, HSWA Sections 2/3/7/8 and Schedule 5 inspection requirements.',
  },
  {
    id: 2,
    title: 'EN 1004:2020 & BS 1139-6',
    icon: BookOpen,
    description:
      'EN 1004:2020 changes, load classes 2 & 3, max heights, BS 1139-6 scope and compliance marking.',
  },
  {
    id: 3,
    title: 'PASMA Code of Practice',
    icon: FileText,
    description:
      'What PASMA is, Code of Practice scope, course types, digital certification and card validity.',
  },
  {
    id: 4,
    title: 'CDM 2015 & duty holders',
    icon: Award,
    description:
      'The five CDM duty holders, construction phase plan, pre-construction information and practical scenarios.',
  },
];

export default function PasmaModule1() {
  useSEO({
    title: 'Module 1: Legislation & PASMA standards | PASMA towers for users | Elec-Mate',
    description:
      'Work at Height Regulations 2005, HSWA 1974, EN 1004:2020, the PASMA Code of Practice and CDM 2015 duty holders.',
  });

  return (
    <ModuleShell
      backTo="../pasma-course"
      backLabel="PASMA towers for users"
      moduleNumber={1}
      title="Legislation & PASMA standards"
      description="Key legislation, European and British standards, the PASMA Code of Practice and CDM 2015 duty holder responsibilities."
      tone="blue"
      sectionsCount={sections.length}
      duration="35 mins"
      nextModuleHref="../pasma-module-2"
      nextModuleLabel="Tower types & components"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../pasma-module-1-section-${section.id}`}
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
