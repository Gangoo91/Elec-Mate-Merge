import { Wrench, CheckCircle, FileText, TestTube, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '5.1',
    title: 'Selecting correct repair methods',
    description:
      'Choosing appropriate repair techniques: replacement, re-termination, re-insulation',
    icon: Wrench,
    href: '../level3-module4-section5-1',
  },
  {
    number: '5.2',
    title: 'Ensuring compliance with BS 7671 after repair',
    description: 'Maintaining regulatory compliance during and after rectification work',
    icon: CheckCircle,
    href: '../level3-module4-section5-2',
  },
  {
    number: '5.3',
    title: 'Recording remedial works',
    description: 'Proper documentation and recording of all remedial work undertaken',
    icon: FileText,
    href: '../level3-module4-section5-3',
  },
  {
    number: '5.4',
    title: 'Re-testing and certification',
    description: 'Post-repair testing procedures and certification requirements',
    icon: TestTube,
    href: '../level3-module4-section5-4',
  },
  {
    number: '5.5',
    title: 'Preventative maintenance strategies',
    description: 'Implementing maintenance strategies to prevent future faults',
    icon: Shield,
    href: '../level3-module4-section5-5',
  },
];

const Level3Module4Section5 = () => {
  useSEO(
    'Section 5: Rectification and Verification - Level 3 Module 4',
    'Repair methods, BS 7671 compliance, recording works and preventative maintenance'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={5}
      title="Rectification and verification"
      description="Repair methods, BS 7671 compliance, recording works and preventative maintenance."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module4-section4"
      prevSectionLabel="Systematic fault-finding techniques"
      nextSectionHref="../level3-module4-section6"
      nextSectionLabel="Professional practice in fault work"
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

export default Level3Module4Section5;
