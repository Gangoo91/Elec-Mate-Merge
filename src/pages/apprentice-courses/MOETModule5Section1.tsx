import { Gauge, BarChart, Thermometer, Waves, Settings } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '5.1.1',
      title: 'Principles of sensing (analogue vs digital)',
      description: 'Understanding analogue and digital sensing principles and signal types',
      icon: Gauge,
      href: '/study-centre/apprentice/m-o-e-t-module5-section1-1',
    },
    {
      number: '5.1.2',
      title: 'Proximity and position sensors',
      description: 'Inductive, capacitive, optical and ultrasonic proximity sensors',
      icon: BarChart,
      href: '/study-centre/apprentice/m-o-e-t-module5-section1-2',
    },
    {
      number: '5.1.3',
      title: 'Temperature and pressure sensors',
      description: 'Thermocouples, RTDs, thermistors and pressure measurement devices',
      icon: Thermometer,
      href: '/study-centre/apprentice/m-o-e-t-module5-section1-3',
    },
    {
      number: '5.1.4',
      title: 'Flow and level measurement',
      description: 'Flow meters, level sensors and measurement techniques',
      icon: Waves,
      href: '/study-centre/apprentice/m-o-e-t-module5-section1-4',
    },
    {
      number: '5.1.5',
      title: 'Signal conditioning',
      description: 'Amplification, filtering, linearisation and signal conversion',
      icon: Settings,
      href: '/study-centre/apprentice/m-o-e-t-module5-section1-5',
    },
  ];


const MOETModule5Section1 = () => {
  useSEO(
    'Section 5.1: Sensors and Transducers - MOET Module 5',
    'Sensing principles, proximity sensors, temperature/pressure measurement and signal conditioning'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={1}
      title="Sensors and transducers"
      description="Sensing principles, proximity sensors, temperature/pressure measurement and signal conditioning."
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

export default MOETModule5Section1;
