import { BookOpen, Wrench, Shield, TestTube } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.1',
    title: 'Practical assessment guide',
    description: 'Comprehensive guide to practical assessment requirements and expectations',
    icon: BookOpen,
    href: '../level3-module8-section2-1',
  },
  {
    number: '2.2',
    title: 'Wiring techniques review',
    description: 'Review of essential wiring techniques required for practical assessments',
    icon: Wrench,
    href: '../level3-module8-section2-2',
  },
  {
    number: '2.3',
    title: 'Safe isolation practice',
    description: 'Step-by-step safe isolation procedures for practical exam scenarios',
    icon: Shield,
    href: '../level3-module8-section2-3',
  },
  {
    number: '2.4',
    title: 'Testing procedures guide',
    description: 'Complete guide to testing procedures and sequence for practical assessments',
    icon: TestTube,
    href: '../level3-module8-section2-4',
  },
];

const Level3Module8Section2 = () => {
  useSEO(
    'Section 2: Practical Help - Level 3 Module 8',
    'Essential guidance and review materials for practical assessment preparation'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module8"
      backLabel="Module 8"
      moduleNumber={8}
      sectionNumber={2}
      title="Practical help"
      description="Practical assessment guides and techniques for hands-on assessments."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module8-section1"
      prevSectionLabel="Mock exams"
      nextSectionHref="../level3-module8-section3"
      nextSectionLabel="Exam tips"
    >
      {subsections.map((s, i) => (
        <ModuleCard
          key={i}
          number={s.number}
          title={s.title}
          description={s.description}
          icon={s.icon}
          href={s.href}
        />
      ))}
    </SectionShell>
  );
};

export default Level3Module8Section2;
