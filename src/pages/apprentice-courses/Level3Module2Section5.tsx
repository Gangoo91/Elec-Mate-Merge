import { Plug, ArrowUpCircle, Shield, Scale, TestTube } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '5.1',
    title: 'Connection to consumer units and distribution boards',
    description:
      'Integrating environmental technologies with existing electrical distribution systems',
    icon: Plug,
    href: '../level3-module2-section5-1',
  },
  {
    number: '5.2',
    title: 'Exporting energy back to the grid',
    description: 'Grid export requirements, feed-in tariffs and bi-directional energy flow',
    icon: ArrowUpCircle,
    href: '../level3-module2-section5-2',
  },
  {
    number: '5.3',
    title: 'Impact of renewables on earthing and protection systems',
    description:
      'Effects of renewable energy systems on electrical protection and earthing arrangements',
    icon: Shield,
    href: '../level3-module2-section5-3',
  },
  {
    number: '5.4',
    title: 'Load balancing and harmonics considerations',
    description: 'Managing electrical loads and harmonic distortion in integrated systems',
    icon: Scale,
    href: '../level3-module2-section5-4',
  },
  {
    number: '5.5',
    title: 'Inspection, testing and certification of integrated systems',
    description:
      'Testing procedures and certification requirements for integrated renewable systems',
    icon: TestTube,
    href: '../level3-module2-section5-5',
  },
];

const Level3Module2Section5 = () => {
  useSEO(
    'Section 5: Integration with Electrical Installations - Level 3 Module 2',
    'Incorporating environmental technologies into conventional electrical systems'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={5}
      title="Integration with electrical installations"
      description="Incorporating environmental technologies into conventional electrical systems."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module2-section4"
      prevSectionLabel="Low carbon technologies"
      nextSectionHref="../level3-module2-section6"
      nextSectionLabel="Sustainable working practices"
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

export default Level3Module2Section5;
