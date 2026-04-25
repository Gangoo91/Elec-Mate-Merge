import { Thermometer, MapPin, Gauge, Calendar, Building, Network } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Smart thermostats and room zoning', icon: Thermometer, description: 'Installing and configuring smart heating controls.' },
  { id: 2, title: 'Radiator valves, boilers and heat pumps', icon: MapPin, description: 'Integrating with different heating system types.' },
  { id: 3, title: 'Environmental sensors (humidity, CO2, air quality)', icon: Gauge, description: 'Monitoring and responding to environmental conditions.' },
  { id: 4, title: 'Schedule vs AI learning control', icon: Calendar, description: 'Different approaches to heating automation.' },
  { id: 5, title: 'HVAC integration and interlocks', icon: Building, description: 'Connecting heating systems with other building services.' },
  { id: 6, title: 'BMS-light integration for larger sites', icon: Network, description: 'Scaling up to building management system integration.' },
];

export default function SmartHomeModule4() {
  useSEO({
    title: 'Module 4: Heating, HVAC and Environmental Control | Smart Home | Elec-Mate',
    description: 'Smart thermostats, heat pumps, environmental sensors, AI vs schedule control and HVAC/BMS integration.',
  });

  return (
    <ModuleShell
      backTo="../smart-home-course"
      backLabel="Smart home technology"
      moduleNumber={4}
      title="Heating, HVAC and environmental control"
      description="Bring heating, ventilation and environmental sensing together in a smart home."
      tone="cyan"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../smart-home-module-3"
      prevModuleLabel="Smart lighting and scene programming"
      nextModuleHref="../smart-home-module-5"
      nextModuleLabel="Access control, CCTV and security integration"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../smart-home-module-4-section-${section.id}`}
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
