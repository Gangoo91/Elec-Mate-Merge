import { PenTool, Calculator, Settings, MapPin, FileText, CheckCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Design principles and requirements',
    description: 'Fundamental design principles, compliance requirements and client specifications.',
    icon: PenTool,
  },
  {
    id: 2,
    title: 'Circuit design calculations',
    description: 'Current ratings, cable sizing, voltage drop and protection calculations.',
    icon: Calculator,
  },
  {
    id: 3,
    title: 'Selection of protective devices and equipment',
    description: 'Choosing appropriate protective devices, equipment and accessories for electrical installations.',
    icon: Settings,
  },
  {
    id: 4,
    title: 'Designing for special installations and locations',
    description: 'Design considerations for special locations and installations with specific requirements.',
    icon: MapPin,
  },
  {
    id: 5,
    title: 'System documentation and drawings',
    description: 'Producing comprehensive design documentation, drawings and specifications.',
    icon: FileText,
  },
  {
    id: 6,
    title: 'Verification of design',
    description: 'Checking and verifying electrical system designs for compliance and performance.',
    icon: CheckCircle,
  },
];

export default function Level3Module6() {
  useSEO({
    title: 'Module 6: Electrical Systems Design | Level 3 Electrical Installation | Elec-Mate',
    description:
      'Design principles, circuit calculations, protective device selection, special installations, documentation and design verification to BS 7671.',
  });

  return (
    <ModuleShell
      backTo="../level3"
      backLabel="Level 3 electrical installation"
      moduleNumber={6}
      title="Electrical systems design"
      description="Design principles, circuit calculations, protective device selection, special locations, documentation and verification."
      tone="blue"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../level3-module5"
      prevModuleLabel="Inspection, testing and commissioning"
      nextModuleHref="../level3-module7"
      nextModuleLabel="Career awareness and professional development"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../level3-module6-section${section.id}`}
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
