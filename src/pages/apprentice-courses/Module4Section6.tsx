import { TestTube, FileText, Wrench, CheckCircle, Ruler, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Performing a visual inspection',
    description: 'Systematic visual inspection of completed installation work',
    icon: TestTube,
    href: '6-1',
  },
  {
    number: 'Subsection 2',
    title: 'Continuity and polarity checks (functional, non-certified)',
    description: 'Basic functional testing for continuity and polarity',
    icon: FileText,
    href: '6-2',
  },
  {
    number: 'Subsection 3',
    title: 'Basic insulation resistance testing (introduction only)',
    description: 'Introduction to insulation resistance testing principles',
    icon: Wrench,
    href: '6-3',
  },
  {
    number: 'Subsection 4',
    title: 'Checking fixings, cable routes and terminations',
    description: 'Verifying all fixings and connections are secure',
    icon: CheckCircle,
    href: '6-4',
  },
  {
    number: 'Subsection 5',
    title: 'Identifying and rectifying defects',
    description: 'Finding and correcting installation defects',
    icon: Ruler,
    href: '6-5',
  },
  {
    number: 'Subsection 6',
    title: 'Recording inspection and test results',
    description: 'Legal requirements and best practices for documenting test results',
    icon: Shield,
    href: '6-6',
  },
];

const Section6 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={6}
      title="Testing and inspecting the completed installation"
      description="Testing procedures and inspection of completed work."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section5"
      prevSectionLabel="Installing electrical accessories and terminations"
      nextSectionHref="../section7"
      nextSectionLabel="Safe working and tool use during installation"
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
