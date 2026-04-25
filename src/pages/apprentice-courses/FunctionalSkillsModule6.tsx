import { GraduationCap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Functional skills mock exam',
    icon: GraduationCap,
    description:
      '20 random questions drawn from a 200-question bank covering all five modules. 30-minute timer with an 80% pass mark.',
    href: '/study-centre/apprentice/functional-skills/module6/mock-exam',
  },
];

export default function FunctionalSkillsModule6() {
  useSEO({
    title: 'Module 6: Mock Exam | Functional Skills | Elec-Mate',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark — covers all five functional skills modules.',
  });

  return (
    <ModuleShell
      backTo="../functional-skills"
      backLabel="Functional skills"
      moduleNumber={6}
      title="Mock exam"
      description="Final assessment drawn from a 200-question bank covering every content module."
      tone="yellow"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="/study-centre/apprentice/functional-skills/module5"
      prevModuleLabel="Assessment preparation"
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
