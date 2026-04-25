import { Waves, Clock, RotateCcw, TrendingUp, Radio, Zap, Triangle } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '3.1',
    title: 'AC waveform characteristics (RMS, average, peak values)',
    description:
      'Understanding different AC measurement values and their mathematical relationships',
    icon: Waves,
    href: '../h-n-c-module3-section3-1',
  },
  {
    number: '3.2',
    title: 'Frequency, period and amplitude relationships',
    description: 'Time-domain characteristics of AC waveforms and their frequency components',
    icon: Clock,
    href: '../h-n-c-module3-section3-2',
  },
  {
    number: '3.3',
    title: 'Phase difference and vector representation',
    description: 'Vector methods for analysing phase relationships in AC circuits',
    icon: RotateCcw,
    href: '../h-n-c-module3-section3-3',
  },
  {
    number: '3.4',
    title: 'Sinusoidal, non-sinusoidal and distorted waveforms',
    description:
      'Analysis of different waveform types and distortion effects in electrical systems',
    icon: TrendingUp,
    href: '../h-n-c-module3-section3-4',
  },
  {
    number: '3.5',
    title: 'Harmonics – sources, effects and mitigation',
    description: 'Understanding harmonic distortion, sources and methods for harmonic control',
    icon: Radio,
    href: '../h-n-c-module3-section3-5',
  },
  {
    number: '3.6',
    title: 'True, reactive and apparent power in AC systems',
    description: 'Power relationships in AC circuits and their measurement techniques',
    icon: Zap,
    href: '../h-n-c-module3-section3-6',
  },
  {
    number: '3.7',
    title: 'Power triangle and efficiency',
    description:
      'Graphical representation of power relationships and system efficiency calculations',
    icon: Triangle,
    href: '../h-n-c-module3-section3-7',
  },
];

const HNCModule3Section3 = () => {
  useSEO(
    'Alternating current theory and waveforms - HNC Module 3 Section 3',
    'Understanding AC waveform characteristics, harmonics, power relationships and efficiency in alternating current systems'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={3}
      title="Alternating current theory and waveforms"
      description="Master AC waveform analysis, power relationships and harmonic theory for electrical systems."
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

export default HNCModule3Section3;
