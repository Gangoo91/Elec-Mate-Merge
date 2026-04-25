import { ClipboardCheck, ClipboardList, Brain, FolderOpen } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Level 1 functional skills practice',
    icon: ClipboardCheck,
    description: 'Exam format, sample questions, time management and common mistakes.',
    href: '/study-centre/apprentice/functional-skills/module5/section1',
  },
  {
    id: 2,
    title: 'Level 2 functional skills practice',
    icon: ClipboardList,
    description: 'The step up from Level 1 — harder practice questions and exam strategies.',
    href: '/study-centre/apprentice/functional-skills/module5/section2',
  },
  {
    id: 3,
    title: 'Study techniques and exam skills',
    icon: Brain,
    description: 'Revision methods, time management, stress management and past papers.',
    href: '/study-centre/apprentice/functional-skills/module5/section3',
  },
  {
    id: 4,
    title: 'Portfolio building and evidence',
    icon: FolderOpen,
    description: 'Assessor expectations, collecting evidence and writing reflective accounts.',
    href: '/study-centre/apprentice/functional-skills/module5/section4',
  },
];

export default function FunctionalSkillsModule5() {
  useSEO({
    title: 'Module 5: Assessment Preparation | Functional Skills | Elec-Mate',
    description:
      'Prepare for Level 1 and Level 2 functional skills assessments with practice exams, study techniques and portfolio building.',
  });

  return (
    <ModuleShell
      backTo="../functional-skills"
      backLabel="Functional skills"
      moduleNumber={5}
      title="Assessment preparation"
      description="Get ready for Level 1 and Level 2 assessments with practice, technique and portfolio guidance."
      tone="yellow"
      sectionsCount={sections.length}
      duration="1h"
      prevModuleHref="/study-centre/apprentice/functional-skills/module4"
      prevModuleLabel="Practical mathematics applications"
      nextModuleHref="/study-centre/apprentice/functional-skills/module6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={section.href}
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
