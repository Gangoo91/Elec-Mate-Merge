import { Sun, Flame, Clock, Wind, Users, Building } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '5.1',
    title: 'Solar radiation',
    description: 'Solar geometry, irradiance, shading, solar gains',
    icon: Sun,
    href: '../h-n-c-module2-section5-1',
  },
  {
    number: '5.2',
    title: 'Heat gains and losses',
    description: 'Internal gains, external gains, steady state, dynamic',
    icon: Flame,
    href: '../h-n-c-module2-section5-2',
  },
  {
    number: '5.3',
    title: 'Thermal mass and time lag',
    description: 'Admittance, decrement factor, heavyweight vs lightweight',
    icon: Clock,
    href: '../h-n-c-module2-section5-3',
  },
  {
    number: '5.4',
    title: 'Air infiltration and ventilation',
    description: 'Air changes, air tightness, natural ventilation',
    icon: Wind,
    href: '../h-n-c-module2-section5-4',
  },
  {
    number: '5.5',
    title: 'Thermal comfort',
    description: "Fanger's PMV/PPD, CIBSE comfort criteria, adaptive comfort",
    icon: Users,
    href: '../h-n-c-module2-section5-5',
  },
  {
    number: '5.6',
    title: 'Building fabric performance',
    description: 'Condensation analysis, moisture movement, Part L',
    icon: Building,
    href: '../h-n-c-module2-section5-6',
  },
];

const HNCModule2Section5 = () => {
  useSEO(
    'Environmental physics in buildings - HNC Module 2 Section 5 | Building Services Engineering',
    'Master environmental physics: solar radiation, heat gains, thermal mass, air infiltration, thermal comfort and building fabric performance analysis.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={5}
      title="Environmental physics in buildings"
      description="Analyse the environmental factors that influence building energy performance and occupant comfort."
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

export default HNCModule2Section5;
