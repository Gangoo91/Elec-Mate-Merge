import { Target, BookOpen, Users, Shield, Leaf } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '1.1',
    title: 'Purpose of electrical system design',
    description: 'Understanding the fundamental purpose and objectives of electrical system design',
    icon: Target,
    href: '../level3-module6-section1-1',
  },
  {
    number: '1.2',
    title: 'Compliance with BS 7671 and Building Regulations',
    description:
      'Ensuring designs comply with BS 7671 wiring regulations and relevant building regulations',
    icon: BookOpen,
    href: '../level3-module6-section1-2',
  },
  {
    number: '1.3',
    title: 'Client requirements and design specifications',
    description:
      'Understanding and interpreting client requirements to create appropriate design specifications',
    icon: Users,
    href: '../level3-module6-section1-3',
  },
  {
    number: '1.4',
    title: 'Designing for safety, reliability and usability',
    description:
      'Incorporating safety, reliability and usability principles into electrical system design',
    icon: Shield,
    href: '../level3-module6-section1-4',
  },
  {
    number: '1.5',
    title: 'Designing for energy efficiency and sustainability',
    description: 'Creating energy-efficient and sustainable electrical system designs',
    icon: Leaf,
    href: '../level3-module6-section1-5',
  },
];

const Level3Module6Section1 = () => {
  useSEO(
    'Section 1: Design Principles and Requirements - Level 3 Module 6',
    'Understanding fundamental design principles, compliance requirements and client specifications'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={1}
      title="Design principles and requirements"
      description="Fundamental design principles, compliance requirements and client specifications."
      tone="blue"
      subsectionsCount={subsections.length}
      nextSectionHref="../level3-module6-section2"
      nextSectionLabel="Circuit design calculations"
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

export default Level3Module6Section1;
