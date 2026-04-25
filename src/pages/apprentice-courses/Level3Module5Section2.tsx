import { Eye, CheckCircle, AlertCircle, ClipboardList } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.1',
    title: 'Visual inspection of installations',
    description: 'Comprehensive visual inspection of fabric, wiring systems and protective devices',
    icon: Eye,
    href: '../level3-module5-section2-1',
  },
  {
    number: '2.2',
    title: 'Checking for compliance with design and regs',
    description: 'Verifying installation compliance with design specifications and regulations',
    icon: CheckCircle,
    href: '../level3-module5-section2-2',
  },
  {
    number: '2.3',
    title: 'Identification of non-compliances and defects',
    description:
      'Identifying and categorising non-compliances and defects in electrical installations',
    icon: AlertCircle,
    href: '../level3-module5-section2-3',
  },
  {
    number: '2.4',
    title: 'Recording inspection observations (C1, C2, C3 codes)',
    description: 'Proper recording of inspection findings using C1, C2 and C3 classification codes',
    icon: ClipboardList,
    href: '../level3-module5-section2-4',
  },
];

const Level3Module5Section2 = () => {
  useSEO(
    'Section 2: Inspection Procedures - Level 3 Module 5',
    'Detailed visual inspection procedures for electrical installations and systems'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={2}
      title="Inspection procedures"
      description="Detailed visual inspection procedures for electrical installations and systems."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module5-section1"
      prevSectionLabel="Principles of inspection and testing"
      nextSectionHref="../level3-module5-section3"
      nextSectionLabel="Testing procedures"
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

export default Level3Module5Section2;
