import { Link2, Shield, RotateCcw, Target, TestTube, Power } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '3.1',
    title: 'Continuity of protective conductors and ring circuits',
    description:
      'Testing procedures for protective conductor continuity and ring circuit integrity',
    icon: Link2,
    href: '../level3-module5-section3-1',
  },
  {
    number: '3.2',
    title: 'Insulation resistance testing',
    description: 'Comprehensive insulation resistance testing procedures and acceptance criteria',
    icon: Shield,
    href: '../level3-module5-section3-2',
  },
  {
    number: '3.3',
    title: 'Polarity testing',
    description: 'Verification of correct polarity in electrical circuits and installations',
    icon: RotateCcw,
    href: '../level3-module5-section3-3',
  },
  {
    number: '3.4',
    title: 'Earth fault loop impedance testing',
    description: 'Testing earth fault loop impedance to verify protective device effectiveness',
    icon: Target,
    href: '../level3-module5-section3-4',
  },
  {
    number: '3.5',
    title: 'RCD and RCBO testing',
    description: 'Testing procedures for residual current devices and RCBOs',
    icon: TestTube,
    href: '../level3-module5-section3-5',
  },
  {
    number: '3.6',
    title: 'Prospective fault current and verification of protective devices',
    description: 'Testing prospective fault current and verifying protective device coordination',
    icon: Power,
    href: '../level3-module5-section3-6',
  },
];

const Level3Module5Section3 = () => {
  useSEO(
    'Section 3: Testing Procedures - Level 3 Module 5',
    'Comprehensive testing procedures for electrical installations including continuity, insulation and RCD testing'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={3}
      title="Testing procedures"
      description="Continuity, insulation resistance, polarity, earth fault loop and RCD testing procedures."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module5-section2"
      prevSectionLabel="Inspection procedures"
      nextSectionHref="../level3-module5-section4"
      nextSectionLabel="Commissioning of installations"
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

export default Level3Module5Section3;
