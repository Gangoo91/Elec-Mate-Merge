import { Wrench, TestTube, Zap, Shield, Gauge } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Essential hand tools (strippers, cutters, drivers)',
    description: 'Basic hand tools required for electrical installation work',
    icon: Wrench,
    href: '3-1',
  },
  {
    number: 'Subsection 2',
    title: 'Common power tools (drills, SDS, jigsaws)',
    description: 'Power tools used in electrical installation work',
    icon: TestTube,
    href: '3-2',
  },
  {
    number: 'Subsection 3',
    title: 'Test equipment for installation work (overview only)',
    description: 'Basic testing equipment used during installation',
    icon: Gauge,
    href: '3-3',
  },
  {
    number: 'Subsection 4',
    title: 'Tool inspection and maintenance',
    description: 'Maintaining tools in safe working condition',
    icon: Shield,
    href: '3-4',
  },
  {
    number: 'Subsection 5',
    title: 'Safe use, transport and storage of tools',
    description: 'Safe handling and storage practices for tools',
    icon: Zap,
    href: '3-5',
  },
  {
    number: 'Subsection 6',
    title: 'PPE associated with tool use',
    description: 'Personal protective equipment for tool operation',
    icon: Shield,
    href: '3-6',
  },
];

const Section3 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={3}
      title="Electrical tools and equipment"
      description="Essential tools, equipment and testing instruments for electrical installation work."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section2"
      prevSectionLabel="Cable containment systems"
      nextSectionHref="../section4"
      nextSectionLabel="Installation methods and techniques"
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

export default Section3;
