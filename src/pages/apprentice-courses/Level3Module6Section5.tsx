import { PenTool, List, FileText, Monitor } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '5.1',
    title: 'Preparing design drawings and schematics',
    description: 'Creating clear and accurate design drawings and electrical schematics',
    icon: PenTool,
    href: '../level3-module6-section5-1',
  },
  {
    number: '5.2',
    title: 'Preparing cable schedules and load assessments',
    description: 'Developing comprehensive cable schedules and electrical load assessments',
    icon: List,
    href: '../level3-module6-section5-2',
  },
  {
    number: '5.3',
    title: 'Writing design specifications for clients/contractors',
    description: 'Preparing detailed design specifications and requirements documents',
    icon: FileText,
    href: '../level3-module6-section5-3',
  },
  {
    number: '5.4',
    title: 'Using software tools (CAD, electrical design software)',
    description: 'Utilising CAD and electrical design software for professional documentation',
    icon: Monitor,
    href: '../level3-module6-section5-4',
  },
];

const Level3Module6Section5 = () => {
  useSEO(
    'Section 5: System Documentation and Drawings - Level 3 Module 6',
    'Creating comprehensive design documentation, drawings and specifications'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={5}
      title="System documentation and drawings"
      description="Producing comprehensive design documentation, drawings and specifications."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module6-section4"
      prevSectionLabel="Designing for special installations and locations"
      nextSectionHref="../level3-module6-section6"
      nextSectionLabel="Verification of design"
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

export default Level3Module6Section5;
