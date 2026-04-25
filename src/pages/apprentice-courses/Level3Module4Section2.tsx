import { Gauge, TestTube, Zap, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.1',
    title: 'Multimeters, insulation testers, continuity testers',
    description: 'Essential diagnostic instruments for electrical fault finding and testing',
    icon: Gauge,
    href: '../level3-module4-section2-1',
  },
  {
    number: '2.2',
    title: 'RCD and loop impedance testers',
    description: 'Specialist testers for protective device and earthing system verification',
    icon: TestTube,
    href: '../level3-module4-section2-2',
  },
  {
    number: '2.3',
    title: 'Clamp meters and thermal imaging',
    description: 'Advanced diagnostic tools for current measurement and thermal fault detection',
    icon: Zap,
    href: '../level3-module4-section2-3',
  },
  {
    number: '2.4',
    title: 'Safe use, calibration and limitations of instruments',
    description:
      'Proper instrument handling, calibration requirements and understanding limitations',
    icon: Shield,
    href: '../level3-module4-section2-4',
  },
];

const Level3Module4Section2 = () => {
  useSEO(
    'Section 2: Diagnostic Tools and Equipment - Level 3 Module 4',
    'Multimeters, testers, clamp meters, thermal imaging and safe instrument use'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={2}
      title="Diagnostic tools and equipment"
      description="Multimeters, testers, clamp meters, thermal imaging and safe instrument use."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module4-section1"
      prevSectionLabel="Principles of fault diagnosis"
      nextSectionHref="../level3-module4-section3"
      nextSectionLabel="Common faults in electrical systems"
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

export default Level3Module4Section2;
