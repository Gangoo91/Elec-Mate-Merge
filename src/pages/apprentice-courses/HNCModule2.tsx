import { Thermometer, Droplets, Wind, Lightbulb, Building, Cog } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Heat transfer principles',
    icon: Thermometer,
    description:
      'Conduction, convection, radiation, thermal properties and comfort conditions in buildings.',
  },
  {
    id: 2,
    title: 'Fluid mechanics and hydraulics',
    icon: Droplets,
    description: 'Fluid pressure, flow, pumps, fans and pipe-sizing methods for building services.',
  },
  {
    id: 3,
    title: 'Psychrometrics and air properties',
    icon: Wind,
    description: 'Moist air properties, psychrometric charts and air-handling processes for HVAC.',
  },
  {
    id: 4,
    title: 'Lighting and acoustics fundamentals',
    icon: Lightbulb,
    description:
      'Illumination, sound transmission and building performance standards across services.',
  },
  {
    id: 5,
    title: 'Environmental physics in buildings',
    icon: Building,
    description: 'Heat gains, solar radiation, thermal mass and air infiltration in building fabric.',
  },
  {
    id: 6,
    title: 'Applied building services science',
    icon: Cog,
    description: 'Load estimation, energy analysis and modelling tools applied to real projects.',
  },
];

export default function HNCModule2() {
  useSEO({
    title: 'Module 2: Building Services Science | HNC | Elec-Mate',
    description:
      'Heat transfer, fluid mechanics, psychrometrics, lighting, acoustics and environmental physics applied to building services.',
  });

  return (
    <ModuleShell
      backTo="../hnc"
      backLabel="HNC electrical engineering"
      moduleNumber={2}
      title="Building services science"
      description="The applied physics that underpins HVAC, lighting, acoustics and the environmental performance of buildings."
      tone="purple"
      sectionsCount={sections.length}
      duration="2h"
      prevModuleHref="../h-n-c-module1"
      prevModuleLabel="Health, safety and risk management"
      nextModuleHref="../h-n-c-module3"
      nextModuleLabel="Electrical and electronic principles"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../h-n-c-module2-section${section.id}`}
          sectionNumber={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
