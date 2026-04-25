import { Building, Target, FileCheck, Award, MapPin } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '1.1',
    title: 'Building Regulations Part L (conservation of fuel and power)',
    description:
      'Legal requirements for energy conservation and fuel efficiency in building design',
    icon: Building,
    href: '../level3-module2-section1-1',
  },
  {
    number: '1.2',
    title: 'UK net zero targets and impact on electrical work',
    description:
      'Government net zero commitments and their implications for electrical installations',
    icon: Target,
    href: '../level3-module2-section1-2',
  },
  {
    number: '1.3',
    title: 'BS 7671 sustainability considerations',
    description: 'IET wiring regulations requirements for sustainable electrical installations',
    icon: FileCheck,
    href: '../level3-module2-section1-3',
  },
  {
    number: '1.4',
    title: 'Energy performance certificates (EPCs) and compliance',
    description: 'Understanding EPCs and their role in building energy efficiency compliance',
    icon: Award,
    href: '../level3-module2-section1-4',
  },
  {
    number: '1.5',
    title: 'Role of local authorities and planning permissions',
    description:
      'Local authority requirements and planning considerations for electrical installations',
    icon: MapPin,
    href: '../level3-module2-section1-5',
  },
];

const Level3Module2Section1 = () => {
  useSEO(
    'Section 1: Environmental Legislation and Standards - Level 3 Module 2',
    'Environmental laws, regulations and standards affecting electrical installations'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={1}
      title="Environmental legislation and standards"
      description="Environmental laws, regulations and standards affecting electrical installations."
      tone="blue"
      subsectionsCount={subsections.length}
      nextSectionHref="../level3-module2-section2"
      nextSectionLabel="Energy efficiency in electrical installations"
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

export default Level3Module2Section1;
