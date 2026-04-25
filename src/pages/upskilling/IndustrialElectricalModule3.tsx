import { PanelLeft, Layout, Tag, Thermometer, TestTube } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Layout planning for MCC and control panels', icon: Layout, description: 'Motor control centre and panel layout design principles.' },
  { id: 2, title: 'Component mounting and DIN rail organisation', icon: PanelLeft, description: 'Component arrangement and DIN rail systems.' },
  { id: 3, title: 'Cable termination and ferrule ID', icon: Tag, description: 'Cable termination techniques and identification methods.' },
  { id: 4, title: 'Panel cooling and IP ratings', icon: Thermometer, description: 'Thermal management and ingress protection.' },
  { id: 5, title: 'Functional testing and documentation', icon: TestTube, description: 'Testing procedures and documentation requirements.' },
];

export default function IndustrialElectricalModule3() {
  useSEO({
    title: 'Module 3: Industrial Panel Assembly | Industrial Electrical | Elec-Mate',
    description: 'MCC and control panel layout, DIN rail organisation, ferrule ID, IP ratings and functional testing.',
  });

  return (
    <ModuleShell
      backTo="../industrial-electrical-course"
      backLabel="Industrial electrical systems"
      moduleNumber={3}
      title="Industrial panel assembly and layout"
      description="Plan, build and prove an industrial control panel — from layout drawings to functional test."
      tone="orange"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../industrial-electrical-module-2"
      prevModuleLabel="Motors, starters and control gear"
      nextModuleHref="../industrial-electrical-module-4"
      nextModuleLabel="PLC basics and system integration"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../industrial-electrical-module-3-section-${section.id}`}
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
