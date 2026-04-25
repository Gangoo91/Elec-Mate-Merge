import { Droplets, Cloud, Factory, Car, HardHat, Flame } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.1',
    title: 'Bathrooms and locations containing a bath/shower',
    description: 'Special design considerations for bathrooms and wet locations',
    icon: Droplets,
    href: '../level3-module6-section4-1',
  },
  {
    number: '4.2',
    title: 'Outdoor installations and external influences (IP ratings, UV, weatherproofing)',
    description: 'Designing for outdoor installations considering environmental factors',
    icon: Cloud,
    href: '../level3-module6-section4-2',
  },
  {
    number: '4.3',
    title: 'Agricultural and industrial installations',
    description: 'Special requirements for agricultural and industrial electrical installations',
    icon: Factory,
    href: '../level3-module6-section4-3',
  },
  {
    number: '4.4',
    title: 'EV charging points (OZEV guidance, Section 722)',
    description: 'Design requirements for electric vehicle charging installations',
    icon: Car,
    href: '../level3-module6-section4-4',
  },
  {
    number: '4.5',
    title: 'Temporary installations (construction sites, exhibitions)',
    description: 'Design considerations for temporary electrical installations',
    icon: HardHat,
    href: '../level3-module6-section4-5',
  },
  {
    number: '4.6',
    title: 'Fire alarm, emergency lighting and data/communications integration',
    description: 'Integrating safety systems and communications into electrical designs',
    icon: Flame,
    href: '../level3-module6-section4-6',
  },
];

const Level3Module6Section4 = () => {
  useSEO(
    'Section 4: Designing for Special Installations and Locations - Level 3 Module 6',
    'Design considerations for special locations and installations with specific requirements'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={4}
      title="Designing for special installations and locations"
      description="Design considerations for special locations and installations with specific requirements."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module6-section3"
      prevSectionLabel="Selection of protective devices and equipment"
      nextSectionHref="../level3-module6-section5"
      nextSectionLabel="System documentation and drawings"
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

export default Level3Module6Section4;
