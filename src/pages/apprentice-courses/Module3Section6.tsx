import { CheckCircle, FileText, Scale, Award, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Cable support distances (horizontal/vertical)',
    description: 'Requirements for supporting cables at correct intervals',
    icon: FileText,
    href: '6-1',
  },
  {
    number: 'Subsection 2',
    title: 'Routing cables in walls and floors (zones and depths)',
    description: 'Safe zones and depth requirements for concealed cables',
    icon: Scale,
    href: '6-2',
  },
  {
    number: 'Subsection 3',
    title: 'Fire stopping and sealing penetrations',
    description: 'Fire safety measures for cable penetrations',
    icon: Award,
    href: '6-3',
  },
  {
    number: 'Subsection 4',
    title: 'Safe entry to enclosures (grommets, bushes, glands)',
    description: 'Methods for safely entering electrical enclosures',
    icon: CheckCircle,
    href: '6-4',
  },
  {
    number: 'Subsection 5',
    title: 'Labelling, identification and colour codes',
    description: 'Proper identification and labelling of electrical systems',
    icon: Shield,
    href: '6-5',
  },
  {
    number: 'Subsection 6',
    title: 'Following manufacturer instructions and site specs',
    description: 'Importance of following specifications and instructions',
    icon: FileText,
    href: '6-6',
  },
];

const Section6 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={6}
      title="Installation standards and best practice"
      description="Industry standards, regulations and best-practice guidelines for electrical work."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section5"
      prevSectionLabel="Environmental considerations and external influences"
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
