import { CheckCircle, Settings, Calculator, Users, FileCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '6.1',
    title: 'Checking compliance with BS 7671 design requirements',
    description: 'Verifying design compliance with BS 7671 wiring regulations',
    icon: CheckCircle,
    href: '../level3-module6-section6-1',
  },
  {
    number: '6.2',
    title: 'Coordination of protective devices',
    description: 'Ensuring proper coordination and selectivity of protective devices',
    icon: Settings,
    href: '../level3-module6-section6-2',
  },
  {
    number: '6.3',
    title: 'Assessing volt drop, fault levels and disconnection times',
    description: 'Verifying voltage drop, fault current levels and protection disconnection times',
    icon: Calculator,
    href: '../level3-module6-section6-3',
  },
  {
    number: '6.4',
    title: 'Peer review of design work',
    description: 'Conducting and participating in peer review processes for design verification',
    icon: Users,
    href: '../level3-module6-section6-4',
  },
  {
    number: '6.5',
    title: 'Pre-installation design approval and sign-off',
    description: 'Obtaining necessary approvals and sign-offs before installation commences',
    icon: FileCheck,
    href: '../level3-module6-section6-5',
  },
];

const Level3Module6Section6 = () => {
  useSEO(
    'Section 6: Verification of Design - Level 3 Module 6',
    'Checking and verifying electrical system designs for compliance and performance'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={6}
      title="Verification of design"
      description="Checking and verifying electrical system designs for compliance and performance."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module6-section5"
      prevSectionLabel="System documentation and drawings"
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

export default Level3Module6Section6;
