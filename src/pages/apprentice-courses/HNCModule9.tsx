import { GraduationCap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'HNC mock exam',
    icon: GraduationCap,
    description:
      '30 random questions drawn from a 500-question bank covering all eight modules. 45-minute timer.',
    href: '../h-n-c-module9-mock-exam',
  },
];

export default function HNCModule9() {
  useSEO({
    title: 'Module 9: Mock Exam | HNC | Elec-Mate',
    description:
      'Test your HNC electrical engineering knowledge with 30 random questions from all eight modules. 45-minute timed exam with instant results.',
  });

  return (
    <ModuleShell
      backTo="../hnc"
      backLabel="HNC electrical engineering"
      moduleNumber={9}
      title="Mock exam"
      description="Final assessment drawn from a 500-question bank covering every content module."
      tone="purple"
      sectionsCount={sections.length}
      duration="45 mins"
      prevModuleHref="../h-n-c-module8"
      prevModuleLabel="HVAC systems"
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
