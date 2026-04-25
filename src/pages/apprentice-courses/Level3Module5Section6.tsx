import { AlertTriangle, Search, Wrench, RefreshCw } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '6.1',
    title: 'Dealing with unexpected results',
    description: 'Procedures for handling unexpected test results and anomalies',
    icon: AlertTriangle,
    href: '../level3-module5-section6-1',
  },
  {
    number: '6.2',
    title: 'Investigating faults identified during testing',
    description: 'Methods for investigating and diagnosing faults discovered during testing',
    icon: Search,
    href: '../level3-module5-section6-2',
  },
  {
    number: '6.3',
    title: 'Rectification procedures',
    description: 'Procedures for rectifying faults and defects found during inspection and testing',
    icon: Wrench,
    href: '../level3-module5-section6-3',
  },
  {
    number: '6.4',
    title: 'Re-testing and updating records',
    description: 'Re-testing procedures after rectification and updating documentation',
    icon: RefreshCw,
    href: '../level3-module5-section6-4',
  },
];

const Level3Module5Section6 = () => {
  useSEO(
    'Section 6: Faults Found During Testing - Level 3 Module 5',
    'Procedures for dealing with faults discovered during testing and inspection'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={6}
      title="Faults found during testing"
      description="Procedures for dealing with faults discovered during testing and inspection."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module5-section5"
      prevSectionLabel="Certification and reporting"
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

export default Level3Module5Section6;
