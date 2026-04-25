import { BarChart, Target, Calendar, TrendingUp } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.1',
    title: 'Score analysis',
    description: 'Detailed analysis of your mock exam scores and performance metrics',
    icon: BarChart,
    href: '../level3-module8-section4-1',
  },
  {
    number: '4.2',
    title: 'Weak areas identification',
    description: 'Identify and understand your weak areas for targeted improvement',
    icon: Target,
    href: '../level3-module8-section4-2',
  },
  {
    number: '4.3',
    title: 'Targeted revision plans',
    description: 'Customised revision plans based on your performance data',
    icon: Calendar,
    href: '../level3-module8-section4-3',
  },
  {
    number: '4.4',
    title: 'Progress tracking',
    description: 'Track your improvement over time and measure exam readiness',
    icon: TrendingUp,
    href: '../level3-module8-section4-4',
  },
];

const Level3Module8Section4 = () => {
  useSEO(
    'Section 4: Results Review - Level 3 Module 8',
    'Analyse your results and create targeted revision strategies for improvement'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module8"
      backLabel="Module 8"
      moduleNumber={8}
      sectionNumber={4}
      title="Results review"
      description="Score analysis and progress tracking to identify areas for improvement."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module8-section3"
      prevSectionLabel="Exam tips"
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

export default Level3Module8Section4;
