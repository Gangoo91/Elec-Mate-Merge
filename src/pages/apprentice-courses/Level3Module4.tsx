import { Search, Wrench, AlertTriangle, Target, CheckCircle, Users } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Principles of fault diagnosis',
    description: 'Types of faults, symptoms, diagnostic sequence, safety considerations and documentation.',
    icon: Search,
  },
  {
    id: 2,
    title: 'Diagnostic tools and equipment',
    description: 'Multimeters, testers, clamp meters, thermal imaging and safe instrument use.',
    icon: Wrench,
  },
  {
    id: 3,
    title: 'Common faults in electrical systems',
    description: 'Ring and radial circuits, lighting, protective devices, earthing and equipment faults.',
    icon: AlertTriangle,
  },
  {
    id: 4,
    title: 'Systematic fault-finding techniques',
    description: 'Visual inspection, testing procedures, polarity checks and functional testing.',
    icon: Target,
  },
  {
    id: 5,
    title: 'Rectification and verification',
    description: 'Repair methods, BS 7671 compliance, recording works and preventative maintenance.',
    icon: CheckCircle,
  },
  {
    id: 6,
    title: 'Professional practice in fault work',
    description: 'Client communication, working under pressure, costing and professional standards.',
    icon: Users,
  },
];

export default function Level3Module4() {
  useSEO({
    title: 'Module 4: Fault Diagnosis and Rectification | Level 3 Electrical Installation | Elec-Mate',
    description:
      'Systematic fault diagnosis, diagnostic tools, common electrical faults, fault-finding techniques, rectification and professional practice.',
  });

  return (
    <ModuleShell
      backTo="../level3"
      backLabel="Level 3 electrical installation"
      moduleNumber={4}
      title="Fault diagnosis and rectification"
      description="Systematic fault-finding, diagnostic equipment, common electrical faults, rectification and BS 7671 compliance verification."
      tone="blue"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../level3-module3"
      prevModuleLabel="Electrical science principles"
      nextModuleHref="../level3-module5"
      nextModuleLabel="Inspection, testing and commissioning"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../level3-module4-section${section.id}`}
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
