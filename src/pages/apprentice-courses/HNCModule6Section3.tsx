import { Award, Droplets, Zap, Leaf, Users, FileCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '3.1',
    title: 'BREEAM overview',
    description:
      'BREEAM schemes, rating levels, weightings, assessment process and the role of the assessor',
    icon: Award,
    href: '../h-n-c-module6-section3-1',
  },
  {
    number: '3.2',
    title: 'Water category',
    description:
      'Water consumption targets, efficient fittings, metering, leak detection and water recycling systems',
    icon: Droplets,
    href: '../h-n-c-module6-section3-2',
  },
  {
    number: '3.3',
    title: 'Energy category',
    description:
      'Energy performance, sub-metering, external lighting, low carbon technologies and energy modelling',
    icon: Zap,
    href: '../h-n-c-module6-section3-3',
  },
  {
    number: '3.4',
    title: 'Materials and waste',
    description:
      'Responsible sourcing, life cycle impacts, construction waste, operational waste and circular economy',
    icon: Leaf,
    href: '../h-n-c-module6-section3-4',
  },
  {
    number: '3.5',
    title: 'Health and wellbeing',
    description:
      'Daylighting, artificial lighting quality, indoor air quality, thermal comfort and acoustic performance',
    icon: Users,
    href: '../h-n-c-module6-section3-5',
  },
  {
    number: '3.6',
    title: 'Evidence and certification',
    description:
      'Documentation requirements, credit evidence, design stage vs post-construction and achieving certification',
    icon: FileCheck,
    href: '../h-n-c-module6-section3-6',
  },
];

const HNCModule6Section3 = () => {
  useSEO(
    'BREEAM assessment - HNC Module 6 Section 3 | Sustainability',
    'Master BREEAM methodology: assessment categories, credit achievement, evidence requirements, pre-assessment and certification for sustainable buildings.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={3}
      title="BREEAM assessment"
      description="Understand BREEAM assessment methodology and how building services contribute to certification."
      tone="purple"
      subsectionsCount={subsections.length}
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

export default HNCModule6Section3;
