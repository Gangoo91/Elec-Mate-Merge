import { Shield, Settings, Box, Target, Package } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '3.1',
    title: 'MCBs, fuses and RCBOs — selection and coordination',
    description: 'Selecting and coordinating MCBs, fuses and RCBOs for effective protection',
    icon: Shield,
    href: '../level3-module6-section3-1',
  },
  {
    number: '3.2',
    title: 'Characteristics of protective devices (Icn, Ics, In, curve types)',
    description: 'Understanding protective device characteristics and their application in design',
    icon: Settings,
    href: '../level3-module6-section3-2',
  },
  {
    number: '3.3',
    title: 'Consumer units and distribution boards',
    description: 'Selecting appropriate consumer units and distribution boards for installations',
    icon: Box,
    href: '../level3-module6-section3-3',
  },
  {
    number: '3.4',
    title: 'Earthing and bonding arrangements (TN-S, TN-C-S, TT)',
    description:
      'Designing appropriate earthing and bonding arrangements for different supply systems',
    icon: Target,
    href: '../level3-module6-section3-4',
  },
  {
    number: '3.5',
    title: 'Selection of accessories, enclosures and equipment for environment',
    description: 'Choosing appropriate accessories and equipment based on environmental conditions',
    icon: Package,
    href: '../level3-module6-section3-5',
  },
];

const Level3Module6Section3 = () => {
  useSEO(
    'Section 3: Selection of Protective Devices and Equipment - Level 3 Module 6',
    'Choosing appropriate protective devices, equipment and accessories for electrical installations'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={3}
      title="Selection of protective devices and equipment"
      description="Choosing appropriate protective devices, equipment and accessories for electrical installations."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module6-section2"
      prevSectionLabel="Circuit design calculations"
      nextSectionHref="../level3-module6-section4"
      nextSectionLabel="Designing for special installations and locations"
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

export default Level3Module6Section3;
