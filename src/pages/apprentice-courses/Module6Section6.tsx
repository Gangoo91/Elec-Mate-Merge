import { FileText, TestTube, Eye, Wrench, Zap } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'What to record and why it matters',
    description: 'Understanding the importance of accurate test documentation',
    icon: FileText,
    href: '6-1',
  },
  {
    number: 'Subsection 2',
    title: 'Interpreting test readings (pass/fail awareness)',
    description: 'Basic interpretation of electrical test results',
    icon: TestTube,
    href: '6-2',
  },
  {
    number: 'Subsection 3',
    title: 'Identifying common installation defects',
    description: 'Recognising typical electrical installation problems',
    icon: Eye,
    href: '6-3',
  },
  {
    number: 'Subsection 4',
    title: 'Corrective action and retesting',
    description: 'Understanding remedial work and verification procedures',
    icon: Wrench,
    href: '6-4',
  },
  {
    number: 'Subsection 5',
    title: 'Test sheets and site documentation (intro level)',
    description: 'Introduction to electrical test documentation and forms',
    icon: Zap,
    href: '6-5',
  },
];

const Section6 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={6}
      title="Recording test results and defect identification"
      description="Documenting test results and identifying electrical defects."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section5"
      prevSectionLabel="Insulation resistance testing (introduction)"
      nextSectionHref="../section7"
      nextSectionLabel="Introduction to certification and documentation"
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

export default Section6;
