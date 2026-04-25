import { Lightbulb, Activity, Filter, Gauge, TrendingDown, Settings } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '5.1',
    title: 'LED technology',
    description:
      'LED fundamentals, driver types, thermal management, lifetime and specification considerations',
    icon: Lightbulb,
    href: '../h-n-c-module7-section5-1',
  },
  {
    number: '5.2',
    title: 'Power factor correction',
    description:
      'Reactive power, capacitor banks, automatic PFC, harmonic filters and installation requirements',
    icon: Activity,
    href: '../h-n-c-module7-section5-2',
  },
  {
    number: '5.3',
    title: 'Harmonic mitigation',
    description:
      'Harmonic sources, effects, measurement, passive and active filters and design considerations',
    icon: Filter,
    href: '../h-n-c-module7-section5-3',
  },
  {
    number: '5.4',
    title: 'Energy metering',
    description:
      'Meter types, accuracy classes, CT connections, data communications and sub-metering strategies',
    icon: Gauge,
    href: '../h-n-c-module7-section5-4',
  },
  {
    number: '5.5',
    title: 'Demand management',
    description:
      'Load shedding, peak shaving, demand response, tariff optimisation and smart grid integration',
    icon: TrendingDown,
    href: '../h-n-c-module7-section5-5',
  },
  {
    number: '5.6',
    title: 'Efficiency retrofits',
    description:
      'Assessment methodology, business case development, implementation and verification of savings',
    icon: Settings,
    href: '../h-n-c-module7-section5-6',
  },
];

const HNCModule7Section5 = () => {
  useSEO(
    'Energy efficient solutions - HNC Module 7 Section 5 | Power Systems',
    'Master energy efficiency: LED technology, power factor correction, harmonic mitigation, energy metering and demand management for commercial buildings.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={5}
      title="Energy efficient solutions"
      description="Implement energy-efficient power and lighting solutions for reduced operating costs."
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

export default HNCModule7Section5;
