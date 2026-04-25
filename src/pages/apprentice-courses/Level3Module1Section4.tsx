import { AlertTriangle, Mountain, Box, Flame, Dumbbell, Cloud } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.1',
    title: 'Common construction hazards (slips, trips, falls, sharps, dust, asbestos, silica)',
    description: 'Identification and management of typical construction site hazards',
    icon: AlertTriangle,
    href: '../level3-module1-section4-1',
  },
  {
    number: '4.2',
    title: 'Working at height (scaffolds, ladders, MEWPs)',
    description: 'Safe working practices for elevated work platforms and access equipment',
    icon: Mountain,
    href: '../level3-module1-section4-2',
  },
  {
    number: '4.3',
    title: 'Confined space hazards and permits',
    description: 'Recognition of confined spaces and permit-to-work requirements',
    icon: Box,
    href: '../level3-module1-section4-3',
  },
  {
    number: '4.4',
    title: 'Fire safety — prevention, extinguishers, evacuation',
    description:
      'Fire prevention measures, firefighting equipment and emergency evacuation procedures',
    icon: Flame,
    href: '../level3-module1-section4-4',
  },
  {
    number: '4.5',
    title: 'Manual handling, noise and vibration hazards',
    description: 'Physical hazards from lifting, excessive noise and vibrating equipment',
    icon: Dumbbell,
    href: '../level3-module1-section4-5',
  },
  {
    number: '4.6',
    title: 'Environmental hazards (contaminated ground, water ingress, extreme weather)',
    description: 'Environmental factors affecting workplace safety and work planning',
    icon: Cloud,
    href: '../level3-module1-section4-6',
  },
];

const Level3Module1Section4 = () => {
  useSEO(
    'Section 4: Hazard Identification and Control - Level 3 Module 1',
    'Systematic hazard identification, evaluation and implementation of control measures'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={4}
      title="Hazard identification and control"
      description="Systematic hazard identification, evaluation and implementation of control measures."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module1-section3"
      prevSectionLabel="Electrical safety in the workplace"
      nextSectionHref="../level3-module1-section5"
      nextSectionLabel="Safety management systems"
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

export default Level3Module1Section4;
