import { Calculator, Percent, Activity, Waves, TrendingUp, Building2 } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '1.1',
    title: 'Maximum demand calculations',
    description:
      'Assessment methods, load profiles, measurement techniques and demand estimation for building services installations',
    icon: Calculator,
    href: '../h-n-c-module4-section1-1',
  },
  {
    number: '1.2',
    title: 'Diversity factors',
    description:
      'Application of diversity, typical values for different loads, BS 7671 guidance and industry practice',
    icon: Percent,
    href: '../h-n-c-module4-section1-2',
  },
  {
    number: '1.3',
    title: 'Power factor considerations',
    description:
      'Impact on system design, reactive power, correction requirements and capacitor bank sizing',
    icon: Activity,
    href: '../h-n-c-module4-section1-3',
  },
  {
    number: '1.4',
    title: 'Harmonic assessment',
    description:
      'Total harmonic distortion (THD), effects on equipment, neutral currents and filter requirements',
    icon: Waves,
    href: '../h-n-c-module4-section1-4',
  },
  {
    number: '1.5',
    title: 'Future load allowances',
    description:
      'Capacity planning, expansion provision, spare ways and infrastructure for future growth',
    icon: TrendingUp,
    href: '../h-n-c-module4-section1-5',
  },
  {
    number: '1.6',
    title: 'Building services load profiles',
    description:
      'HVAC loading patterns, lighting loads, small power demands and time-based load variations',
    icon: Building2,
    href: '../h-n-c-module4-section1-6',
  },
];

const HNCModule4Section1 = () => {
  useSEO(
    'Electrical load assessment - HNC Module 4 Section 1 | Building Services Design',
    'Master electrical load assessment: maximum demand calculations, diversity factors, power factor, harmonics, future load allowances and building services load profiles.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={1}
      title="Electrical load assessment"
      description="Accurately assess electrical loads to ensure building services installations are correctly sized and future-proofed."
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

export default HNCModule4Section1;
