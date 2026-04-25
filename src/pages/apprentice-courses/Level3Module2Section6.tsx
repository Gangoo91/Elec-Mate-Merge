import { Recycle, AlertTriangle, Leaf, Footprints, Users } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '6.1',
    title: 'Waste management and recycling of materials',
    description: 'Proper disposal and recycling procedures for electrical materials and components',
    icon: Recycle,
    href: '../level3-module2-section6-1',
  },
  {
    number: '6.2',
    title: 'Safe disposal of hazardous components (batteries, lamps)',
    description: 'Handling and disposal procedures for hazardous electrical components',
    icon: AlertTriangle,
    href: '../level3-module2-section6-2',
  },
  {
    number: '6.3',
    title: 'Life-cycle thinking in material selection',
    description:
      'Considering environmental impact throughout the lifecycle of electrical materials',
    icon: Leaf,
    href: '../level3-module2-section6-3',
  },
  {
    number: '6.4',
    title: 'Reducing carbon footprint on site (transport, energy use)',
    description: 'Minimising environmental impact through efficient site operations and transport',
    icon: Footprints,
    href: '../level3-module2-section6-4',
  },
  {
    number: '6.5',
    title: 'Promoting a culture of sustainability within teams',
    description: 'Building environmental awareness and sustainable practices within work teams',
    icon: Users,
    href: '../level3-module2-section6-5',
  },
];

const Level3Module2Section6 = () => {
  useSEO(
    'Section 6: Sustainable Working Practices - Level 3 Module 2',
    'Environmentally responsible working methods and waste management practices'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={6}
      title="Sustainable working practices"
      description="Environmentally responsible working methods and waste management practices."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module2-section5"
      prevSectionLabel="Integration with electrical installations"
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

export default Level3Module2Section6;
