import { Activity, Clock, TrendingUp, Zap, Battery, Radio } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.1',
    title: 'AC waveforms',
    description: 'Alternating current and voltage waveforms, generation and characteristics',
    icon: Activity,
    href: '../level3-module3-section4-1',
  },
  {
    number: '4.2',
    title: 'Frequency, period and amplitude',
    description: 'Time-based parameters, RMS and peak values in AC systems',
    icon: Clock,
    href: '../level3-module3-section4-2',
  },
  {
    number: '4.3',
    title: 'Phasor diagrams and vectors',
    description: 'Vector representation of AC quantities and phasor diagram construction',
    icon: TrendingUp,
    href: '../level3-module3-section4-3',
  },
  {
    number: '4.4',
    title: 'Impedance and admittance',
    description: 'Complex impedance in AC circuits and admittance calculations',
    icon: Zap,
    href: '../level3-module3-section4-4',
  },
  {
    number: '4.5',
    title: 'Power in AC circuits',
    description: 'True power, reactive power, apparent power and power triangles',
    icon: Battery,
    href: '../level3-module3-section4-5',
  },
  {
    number: '4.6',
    title: 'Harmonics and waveform distortion',
    description: 'Harmonic content, THD and the effects of non-linear loads',
    icon: Radio,
    href: '../level3-module3-section4-6',
  },
];

const Level3Module3Section4 = () => {
  useSEO(
    'Section 4: AC Theory and Waveforms - Level 3 Module 3',
    'AC waveforms, phasor diagrams, impedance, power and harmonics'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={4}
      title="AC theory and waveforms"
      description="AC waveforms, phasor diagrams, impedance, power and harmonics."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module3-section3"
      prevSectionLabel="Electromagnetic principles"
      nextSectionHref="../level3-module3-section5"
      nextSectionLabel="Electrical power and energy"
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

export default Level3Module3Section4;
