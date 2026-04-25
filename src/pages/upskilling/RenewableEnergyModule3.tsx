import { Wind, RotateCw, MapPin, Settings, Waves } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Wind generation principles and power curves', icon: Wind, description: 'Converting wind energy to electrical power and reading power curves.' },
  { id: 2, title: 'Horizontal vs vertical axis turbines', icon: RotateCw, description: 'HAWT vs VAWT designs, efficiency trade-offs and applications.' },
  { id: 3, title: 'Wind resource assessment', icon: MapPin, description: 'Site evaluation, wind measurement and resource characterisation.' },
  { id: 4, title: 'Wind farm layout and wake effects', icon: Settings, description: 'Optimising turbine spacing and managing wake interactions.' },
  { id: 5, title: 'Offshore wind technology', icon: Waves, description: 'Offshore wind, floating platforms and marine considerations.' },
];

export default function RenewableEnergyModule3() {
  useSEO({
    title: 'Module 3: Wind Turbines and Microgeneration | Renewable Energy | Elec-Mate',
    description: 'Wind generation principles, HAWT vs VAWT, resource assessment, wind farm layout and offshore wind technology.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={3}
      title="Wind turbines and microgeneration systems"
      description="From the basics of wind generation through to offshore floating platforms."
      tone="cyan"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../renewable-energy-module-2"
      prevModuleLabel="Solar PV system design and operation"
      nextModuleHref="../renewable-energy-module-4"
      nextModuleLabel="Battery storage and energy management"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-3-section-${section.id}`}
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
