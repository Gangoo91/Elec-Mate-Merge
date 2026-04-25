import { Wrench, CheckCircle, Wifi, Shield, Users, FileText } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Device wiring, power supplies and containment', icon: Wrench, description: 'Proper installation practices and electrical requirements.' },
  { id: 2, title: 'Commissioning and device pairing', icon: CheckCircle, description: 'System commissioning procedures and device setup.' },
  { id: 3, title: 'Wi-Fi and RF signal verification', icon: Wifi, description: 'Testing and optimising wireless communication.' },
  { id: 4, title: 'Electrical safety and isolation (BS 7671 alignment)', icon: Shield, description: 'Safety procedures aligned with UK electrical regulations.' },
  { id: 5, title: 'Customer handover and app training', icon: Users, description: 'Training customers on system operation and mobile apps.' },
  { id: 6, title: 'Documentation, warranty and aftercare', icon: FileText, description: 'Completing installation records and ongoing support.' },
];

export default function SmartHomeModule7() {
  useSEO({
    title: 'Module 7: Installation, Testing and Safety | Smart Home | Elec-Mate',
    description: 'Device wiring, commissioning, RF verification, BS 7671 alignment, customer handover and documentation.',
  });

  return (
    <ModuleShell
      backTo="../smart-home-course"
      backLabel="Smart home technology"
      moduleNumber={7}
      title="Installation, testing and safety requirements"
      description="Install, commission and hand over a smart home system safely and to BS 7671."
      tone="cyan"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../smart-home-module-6"
      prevModuleLabel="Smart hubs, voice assistants and interoperability"
      nextModuleHref="../smart-home-module-8"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../smart-home-module-7-section-${section.id}`}
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
