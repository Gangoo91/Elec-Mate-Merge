import { AlertTriangle, Zap, Search, TestTube, Eye } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'What is a fault?',
    description: 'Basic definition and understanding of electrical faults',
    icon: AlertTriangle,
    href: '1-1',
  },
  {
    number: 'Subsection 2',
    title: 'Why faults occur in electrical installations',
    description: 'Understanding the root causes of electrical faults',
    icon: Zap,
    href: '1-2',
  },
  {
    number: 'Subsection 3',
    title: 'Risks and consequences of electrical faults',
    description: 'Impact and potential dangers of electrical fault conditions',
    icon: Search,
    href: '1-3',
  },
  {
    number: 'Subsection 4',
    title: 'Overview of fault categories (design, installation, deterioration, external damage)',
    description: 'Classifying electrical faults by their origin and cause',
    icon: TestTube,
    href: '1-4',
  },
  {
    number: 'Subsection 5',
    title: 'Legal and safety responsibilities when dealing with faults',
    description: 'Understanding obligations and responsibilities in fault situations',
    icon: Eye,
    href: '1-5',
  },
];

const Section1 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={1}
      title="Understanding electrical faults"
      description="Fundamental concepts of electrical faults and their characteristics."
      tone="emerald"
      subsectionsCount={subsections.length}
      nextSectionHref="../section2"
      nextSectionLabel="Common fault types in electrical installations"
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

export default Section1;
