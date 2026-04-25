import { Clock, Search, Brain, Heart } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '3.1',
    title: 'Time management strategies',
    description: 'Effective strategies for managing your time during exams and revision',
    icon: Clock,
    href: '../level3-module8-section3-1',
  },
  {
    number: '3.2',
    title: 'Question analysis techniques',
    description: 'How to read, understand and approach different types of exam questions',
    icon: Search,
    href: '../level3-module8-section3-2',
  },
  {
    number: '3.3',
    title: 'Memory techniques',
    description: 'Proven memory techniques and mnemonics for retaining key information',
    icon: Brain,
    href: '../level3-module8-section3-3',
  },
  {
    number: '3.4',
    title: 'Stress management',
    description: 'Techniques for managing exam stress and maintaining peak performance',
    icon: Heart,
    href: '../level3-module8-section3-4',
  },
];

const Level3Module8Section3 = () => {
  useSEO(
    'Section 3: Exam Tips - Level 3 Module 8',
    'Expert tips and techniques to maximise your exam performance'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module8"
      backLabel="Module 8"
      moduleNumber={8}
      sectionNumber={3}
      title="Exam tips"
      description="Time management, memory techniques and stress management strategies."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module8-section2"
      prevSectionLabel="Practical help"
      nextSectionHref="../level3-module8-section4"
      nextSectionLabel="Results review"
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

export default Level3Module8Section3;
