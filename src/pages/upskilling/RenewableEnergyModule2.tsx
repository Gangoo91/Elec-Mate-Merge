import { Zap, MapPin, Calculator, Building, Layers, FileText } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'PV panel types (monocrystalline, poly, thin film)', icon: Layers, description: 'PV panel technologies and their characteristics.' },
  { id: 2, title: 'Site assessment: orientation, shading and irradiance', icon: MapPin, description: 'Evaluating site conditions for optimal solar performance.' },
  { id: 3, title: 'String design, voltage matching and panel sizing', icon: Calculator, description: 'Designing solar panel strings and matching system voltages.' },
  { id: 4, title: 'Mounting systems and structural considerations', icon: Building, description: 'Roof and ground mounting systems with structural analysis.' },
  { id: 5, title: 'PV system layouts: DC side, AC side and isolation', icon: Zap, description: 'DC and AC layouts with isolation requirements.' },
  { id: 6, title: 'Typical single-line diagrams and component flow', icon: FileText, description: 'Creating and interpreting solar PV system diagrams.' },
];

export default function RenewableEnergyModule2() {
  useSEO({
    title: 'Module 2: Solar PV System Design | Renewable Energy | Elec-Mate',
    description: 'Solar PV design from panel selection and site assessment through to string design, mounting and single-line diagrams.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={2}
      title="Solar PV system design and operation"
      description="The design workflow for a domestic or commercial PV array — site to schematic."
      tone="cyan"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../renewable-energy-module-1"
      prevModuleLabel="Overview of renewable energy technologies"
      nextModuleHref="../renewable-energy-module-3"
      nextModuleLabel="Wind turbines and microgeneration systems"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-2-section-${section.id}`}
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
