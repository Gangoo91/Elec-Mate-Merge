import { RotateCcw, Zap, Activity, Shield, Gauge, Settings } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.1',
    title: 'Motor fundamentals',
    description:
      'Induction motors, motor characteristics, efficiency classes, IE ratings and selection criteria',
    icon: RotateCcw,
    href: '../h-n-c-module8-section4-1',
  },
  {
    number: '4.2',
    title: 'Starting methods',
    description:
      'DOL, star-delta, autotransformer, soft starters and starting current considerations',
    icon: Zap,
    href: '../h-n-c-module8-section4-2',
  },
  {
    number: '4.3',
    title: 'Variable speed drives',
    description:
      'VSD principles, PWM technology, V/f control, energy savings and harmonic considerations',
    icon: Activity,
    href: '../h-n-c-module8-section4-3',
  },
  {
    number: '4.4',
    title: 'Motor protection',
    description:
      'Overload protection, phase failure, earth fault protection and motor protection relays',
    icon: Shield,
    href: '../h-n-c-module8-section4-4',
  },
  {
    number: '4.5',
    title: 'Energy efficiency',
    description:
      'Affinity laws, pump and fan control, energy savings calculations and payback analysis',
    icon: Gauge,
    href: '../h-n-c-module8-section4-5',
  },
  {
    number: '4.6',
    title: 'Installation and commissioning',
    description:
      'Cable requirements, EMC considerations, drive setup, commissioning and fault finding',
    icon: Settings,
    href: '../h-n-c-module8-section4-6',
  },
];

const HNCModule8Section4 = () => {
  useSEO(
    'Motor control - HNC Module 8 Section 4 | HVAC Systems',
    'Master motor control: DOL and star-delta starters, VSDs, soft starters, motor protection and energy-efficient drives for HVAC applications.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module8"
      backLabel="Module 8"
      moduleNumber={8}
      sectionNumber={4}
      title="Motor control"
      description="Design motor control systems for efficient operation of HVAC plant and equipment."
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

export default HNCModule8Section4;
