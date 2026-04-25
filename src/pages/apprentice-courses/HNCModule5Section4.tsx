import { Award, ClipboardCheck, Package, Hammer, TestTube, Bug } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.1',
    title: 'Quality management systems',
    description:
      'ISO 9001 requirements, quality procedures, documentation control and continuous improvement for building services',
    icon: Award,
    href: '../h-n-c-module5-section4-1',
  },
  {
    number: '4.2',
    title: 'Inspection and test plans',
    description:
      'ITP development, hold points, witness points, notification procedures and inspection scheduling for MEP works',
    icon: ClipboardCheck,
    href: '../h-n-c-module5-section4-2',
  },
  {
    number: '4.3',
    title: 'Material and equipment approval',
    description:
      'Submittal processes, sample approval, mock-up requirements, material specifications and equipment selection',
    icon: Package,
    href: '../h-n-c-module5-section4-3',
  },
  {
    number: '4.4',
    title: 'Installation quality',
    description:
      'Workmanship standards, supervision requirements, quality audits and installation verification procedures',
    icon: Hammer,
    href: '../h-n-c-module5-section4-4',
  },
  {
    number: '4.5',
    title: 'Testing and verification',
    description:
      'Test procedures, acceptance criteria, performance verification and compliance testing for building services systems',
    icon: TestTube,
    href: '../h-n-c-module5-section4-5',
  },
  {
    number: '4.6',
    title: 'Defects and snagging',
    description:
      'Defect identification, snagging procedures, tracking systems, rectification management and close-out documentation',
    icon: Bug,
    href: '../h-n-c-module5-section4-6',
  },
];

const HNCModule5Section4 = () => {
  useSEO(
    'Quality management - HNC Module 5 Section 4 | Building Services',
    'Master quality management: ISO 9001 systems, inspection and test plans, material approval, installation quality, testing and defects management for building services.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={4}
      title="Quality management"
      description="Implement quality management systems and processes for building services installations."
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

export default HNCModule5Section4;
