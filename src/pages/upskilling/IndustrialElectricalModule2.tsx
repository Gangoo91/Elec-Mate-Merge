import { Cog, CircuitBoard, Zap, AlertTriangle, RotateCcw, TestTube } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Motor types (DOL, star-delta, soft start, VSD)', icon: Cog, description: 'Different motor starting methods and variable speed drives.' },
  { id: 2, title: 'Control circuit diagrams and contactors', icon: CircuitBoard, description: 'Control circuit design and contactor operation.' },
  { id: 3, title: 'Thermal overloads and fuses', icon: Zap, description: 'Motor protection devices and sizing.' },
  { id: 4, title: 'Emergency stop and interlock logic', icon: AlertTriangle, description: 'Safety systems and interlock circuits.' },
  { id: 5, title: 'Forward/reverse control wiring', icon: RotateCcw, description: 'Bidirectional motor control circuits.' },
  { id: 6, title: 'Motor commissioning and load testing', icon: TestTube, description: 'Testing and commissioning procedures.' },
];

export default function IndustrialElectricalModule2() {
  useSEO({
    title: 'Module 2: Motors, Starters and Control Gear | Industrial Electrical | Elec-Mate',
    description: 'Motor starting methods, control circuits, contactors, overloads, emergency stops and commissioning.',
  });

  return (
    <ModuleShell
      backTo="../industrial-electrical-course"
      backLabel="Industrial electrical systems"
      moduleNumber={2}
      title="Motors, starters and control gear"
      description="Choosing the right starter, designing the control circuit and protecting the motor."
      tone="orange"
      sectionsCount={sections.length}
      duration="65 mins"
      prevModuleHref="../industrial-electrical-module-1"
      prevModuleLabel="Overview of industrial electrical distribution"
      nextModuleHref="../industrial-electrical-module-3"
      nextModuleLabel="Industrial panel assembly and layout"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../industrial-electrical-module-2-section-${section.id}`}
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
