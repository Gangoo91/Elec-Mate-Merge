import { Wind, Droplets, BarChart3, Thermometer, Snowflake, Fan } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '3.1',
    title: 'Air composition and properties',
    description: 'Dry air, water vapour, gas laws, density',
    icon: Wind,
    href: '../h-n-c-module2-section3-1',
  },
  {
    number: '3.2',
    title: 'Humidity and moisture content',
    description: 'Relative humidity, specific humidity, dew point',
    icon: Droplets,
    href: '../h-n-c-module2-section3-2',
  },
  {
    number: '3.3',
    title: 'Psychrometric charts',
    description: 'Chart construction, property relationships, reading charts',
    icon: BarChart3,
    href: '../h-n-c-module2-section3-3',
  },
  {
    number: '3.4',
    title: 'Air conditioning processes',
    description: 'Heating, cooling, humidification, dehumidification',
    icon: Thermometer,
    href: '../h-n-c-module2-section3-4',
  },
  {
    number: '3.5',
    title: 'Cooling and heating coils',
    description: 'Sensible and latent loads, coil selection, ADP',
    icon: Snowflake,
    href: '../h-n-c-module2-section3-5',
  },
  {
    number: '3.6',
    title: 'HVAC system applications',
    description: 'AHU processes, mixed air, economiser cycles',
    icon: Fan,
    href: '../h-n-c-module2-section3-6',
  },
];

const HNCModule2Section3 = () => {
  useSEO(
    'Psychrometrics and air properties - HNC Module 2 Section 3 | Building Services Engineering',
    'Master psychrometrics: air composition, humidity, psychrometric charts, air conditioning processes and HVAC system applications for building services.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={3}
      title="Psychrometrics and air properties"
      description="Understand the properties of moist air and apply psychrometric analysis to HVAC system design."
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

export default HNCModule2Section3;
