import { Scale, BookOpen, Shield, CableCar } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Work at Height legislation & the hierarchy of control',
    icon: Scale,
    description:
      'HSWA 1974, WAHR 2005, the three-step hierarchy, employer and employee duties, enforcement and penalties.',
  },
  {
    id: 2,
    title: 'LOLER 1998, PUWER 1998 & employer duties',
    icon: BookOpen,
    description:
      'Thorough examination requirements, maintenance duties, CDM 2015 and Management of H&S at Work Regs 1999.',
  },
  {
    id: 3,
    title: 'MEWP types, groups & IPAF categories',
    icon: CableCar,
    description:
      'Group A vs Group B, categories 1A, 1B, 3A, 3B, PAV, scissor lifts, boom lifts, spider lifts and vehicle-mounted platforms.',
  },
  {
    id: 4,
    title: 'Power sources, competence & the PAL card',
    icon: Shield,
    description:
      'Electric, diesel, hybrid power, IPAF training structure, PAL card, PAL+, familiarisation and operator fitness.',
  },
];

export default function MewpModule1() {
  useSEO({
    title: 'Module 1: Introduction, legislation & MEWP types | MEWP operator training | Elec-Mate',
    description:
      'UK work at height legislation, LOLER, PUWER, MEWP types and IPAF categories with operator competence requirements.',
  });

  return (
    <ModuleShell
      backTo="../mewp-course"
      backLabel="MEWP operator training"
      moduleNumber={1}
      title="Introduction, legislation & MEWP types"
      description="UK legislation governing work at height, the MEWP regulatory framework, machine types and operator competence."
      tone="emerald"
      sectionsCount={sections.length}
      duration="35 mins"
      nextModuleHref="../mewp-module-2"
      nextModuleLabel="Risk assessment, planning & selection"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../mewp-module-1-section-${section.id}`}
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
