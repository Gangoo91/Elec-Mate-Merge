import { Battery, Zap, Settings, Activity, BarChart3, CircuitBoard } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '2.2.1',
      title: 'Direct current principles',
      description: 'Understanding DC circuits, characteristics and applications',
      icon: Battery,
      href: '/study-centre/apprentice/m-o-e-t-module2-section2-1',
    },
    {
      number: '2.2.2',
      title: 'Alternating current principles',
      description: 'AC waveforms, RMS values and AC circuit behaviour',
      icon: Zap,
      href: '/study-centre/apprentice/m-o-e-t-module2-section2-2',
    },
    {
      number: '2.2.3',
      title: 'Single-phase vs three-phase systems',
      description: 'Comparison and applications of single and three-phase systems',
      icon: Settings,
      href: '/study-centre/apprentice/m-o-e-t-module2-section2-3',
    },
    {
      number: '2.2.4',
      title: 'Frequency and waveforms',
      description: 'Understanding frequency, period and waveform characteristics',
      icon: Activity,
      href: '/study-centre/apprentice/m-o-e-t-module2-section2-4',
    },
    {
      number: '2.2.5',
      title: 'Reactance, impedance, power factor',
      description: 'Reactive components and power factor considerations',
      icon: BarChart3,
      href: '/study-centre/apprentice/m-o-e-t-module2-section2-5',
    },
    {
      number: '2.2.6',
      title: 'Capacitors and inductors',
      description: 'Reactive components, characteristics and applications',
      icon: CircuitBoard,
      href: '/study-centre/apprentice/m-o-e-t-module2-section2-6',
    },
  ];


const MOETModule2Section2 = () => {
  useSEO(
    'AC/DC Systems and Components - MOET Module 2',
    'DC and AC principles, single/three-phase systems, reactance and power factor'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={2}
      title="AC/DC systems and components"
      description="DC and AC principles, single/three-phase systems, reactance and power factor."
      tone="orange"
      subsectionsCount={subsections.length}
    >
      {subsections.map((subsection, index) => (
        <ModuleCard
          key={index}
          number={subsection.number}
          title={subsection.title}
          description={subsection.description}
          icon={subsection.icon}
          href={subsection.href}
        />
      ))}
    </SectionShell>
  );
};

export default MOETModule2Section2;
