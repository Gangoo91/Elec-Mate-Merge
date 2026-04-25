import { Shield, ToggleRight, Zap, Layers, CircleDot, Flame } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '3.1',
    title: 'Circuit protection principles',
    description:
      'Overload protection, short-circuit protection, earth fault protection and protection coordination',
    icon: Shield,
    href: '../h-n-c-module4-section3-1',
  },
  {
    number: '3.2',
    title: 'Protective device selection',
    description: 'MCBs, MCCBs, fuses, time-current characteristics and device ratings',
    icon: ToggleRight,
    href: '../h-n-c-module4-section3-2',
  },
  {
    number: '3.3',
    title: 'Fault current calculations',
    description:
      'Prospective fault current, breaking capacity, fault level studies and network impedance',
    icon: Zap,
    href: '../h-n-c-module4-section3-3',
  },
  {
    number: '3.4',
    title: 'Discrimination and coordination',
    description: 'Time/current grading, energy let-through coordination and cascade arrangements',
    icon: Layers,
    href: '../h-n-c-module4-section3-4',
  },
  {
    number: '3.5',
    title: 'Earth fault protection',
    description:
      'RCDs, TN/TT system requirements, Zs verification and automatic disconnection times',
    icon: CircleDot,
    href: '../h-n-c-module4-section3-5',
  },
  {
    number: '3.6',
    title: 'Arc fault detection',
    description: 'AFDDs, applications, BS 7671 requirements and fire risk reduction',
    icon: Flame,
    href: '../h-n-c-module4-section3-6',
  },
];

const HNCModule4Section3 = () => {
  useSEO(
    'Protection and discrimination - HNC Module 4 Section 3 | Building Services Design',
    'Master circuit protection: protective device selection, fault current calculations, discrimination coordination and earth fault protection systems.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={3}
      title="Protection and discrimination"
      description="Design effective protection systems that ensure safety whilst maintaining continuity of supply through proper discrimination."
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

export default HNCModule4Section3;
