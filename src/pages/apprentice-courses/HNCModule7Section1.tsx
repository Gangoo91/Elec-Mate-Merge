import { Box, Cable, Calculator, Activity, Shield, Zap } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '1.1',
    title: 'Switchgear selection',
    description:
      'LV switchboards, MCCB vs ACB, rated currents, short-circuit ratings and type-tested assemblies',
    icon: Box,
    href: '../h-n-c-module7-section1-1',
  },
  {
    number: '1.2',
    title: 'Busbar systems',
    description:
      'Busbar trunking, rising mains, tap-off units, ratings and installation requirements',
    icon: Cable,
    href: '../h-n-c-module7-section1-2',
  },
  {
    number: '1.3',
    title: 'Cable sizing calculations',
    description:
      'Current-carrying capacity, voltage drop, grouping factors, thermal constraints and BS 7671 methods',
    icon: Calculator,
    href: '../h-n-c-module7-section1-3',
  },
  {
    number: '1.4',
    title: 'Discrimination studies',
    description:
      'Time-current curves, discrimination margins, cascading, backup protection and coordination software',
    icon: Activity,
    href: '../h-n-c-module7-section1-4',
  },
  {
    number: '1.5',
    title: 'Power quality',
    description: 'Harmonics, voltage dip/swell, flicker, power factor and mitigation measures',
    icon: Shield,
    href: '../h-n-c-module7-section1-5',
  },
  {
    number: '1.6',
    title: 'Load assessment',
    description:
      'Maximum demand, diversity factors, future expansion, load growth and supply capacity',
    icon: Zap,
    href: '../h-n-c-module7-section1-6',
  },
];

const HNCModule7Section1 = () => {
  useSEO(
    'LV distribution design - HNC Module 7 Section 1 | Power Systems',
    'Master LV distribution: switchgear selection, busbar systems, cable sizing, discrimination studies and power quality for commercial electrical installations.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={1}
      title="LV distribution design"
      description="Design low voltage distribution systems for commercial and industrial installations."
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

export default HNCModule7Section1;
