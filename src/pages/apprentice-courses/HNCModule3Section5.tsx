import { Magnet, Zap, RotateCcw, Cog, Radio, Battery, Play, Wrench } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '5.1',
    title: 'Principles of electromagnetic induction',
    description: 'Fundamental electromagnetic principles governing electrical machine operation',
    icon: Magnet,
    href: '../h-n-c-module3-section5-1',
  },
  {
    number: '5.2',
    title: 'Transformer theory, losses and efficiency',
    description: 'Transformer operating principles, loss mechanisms and efficiency calculations',
    icon: Zap,
    href: '../h-n-c-module3-section5-2',
  },
  {
    number: '5.3',
    title: 'Single-phase vs three-phase transformers',
    description: 'Comparison of transformer types and their applications in building services',
    icon: RotateCcw,
    href: '../h-n-c-module3-section5-3',
  },
  {
    number: '5.4',
    title: 'Induction motors (construction, operation, performance)',
    description:
      'Three-phase induction motor principles, characteristics and performance analysis',
    icon: Cog,
    href: '../h-n-c-module3-section5-4',
  },
  {
    number: '5.5',
    title: 'Synchronous machines – principles and uses',
    description: 'Synchronous motor and generator theory and applications in electrical systems',
    icon: Radio,
    href: '../h-n-c-module3-section5-5',
  },
  {
    number: '5.6',
    title: 'DC machines (types, control, applications)',
    description:
      'DC motor and generator types, control methods and building services applications',
    icon: Battery,
    href: '../h-n-c-module3-section5-6',
  },
  {
    number: '5.7',
    title: 'Starting and speed control methods for motors',
    description:
      'Motor starting techniques and variable speed drive systems for HVAC applications',
    icon: Play,
    href: '../h-n-c-module3-section5-7',
  },
  {
    number: '5.8',
    title: 'Maintenance, testing and fault diagnosis',
    description:
      'Preventive maintenance practices and diagnostic techniques for electrical machines',
    icon: Wrench,
    href: '../h-n-c-module3-section5-8',
  },
];

const HNCModule3Section5 = () => {
  useSEO(
    'Electrical machines and transformers - HNC Module 3 Section 5',
    'Understanding electrical machines, transformers, motor control systems and maintenance practices for building services'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={5}
      title="Electrical machines and transformers"
      description="Master electrical machine principles, transformer theory and motor control systems for building services applications."
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

export default HNCModule3Section5;
