import { Flame, Shield, FileText, ClipboardCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Fire extinguisher types',
    icon: Flame,
    description:
      'Water, foam, CO\u2082, dry powder and wet chemical — colour codes, suitable fire classes, operation and placement requirements.',
  },
  {
    id: 2,
    title: 'Fire blankets & hose reels',
    icon: Shield,
    description:
      'When to use fire blankets, BS EN 1869, fixed hose reels, maintenance requirements and limitations.',
  },
  {
    id: 3,
    title: 'Incident reporting & investigation',
    icon: FileText,
    description:
      'RIDDOR requirements for fires, incident investigation, root cause analysis, lessons learned and record keeping.',
  },
  {
    id: 4,
    title: 'Post-incident procedures',
    icon: ClipboardCheck,
    description:
      'Scene preservation, liaising with fire service and insurers, reinstatement, review of fire risk assessment and updating emergency plans.',
  },
];

export default function FireSafetyModule5() {
  useSEO({
    title: 'Module 5: Firefighting Equipment & Incident Response | Fire Safety & Fire Marshal | Elec-Mate',
    description:
      'Fire extinguisher types and colour codes, fire blankets and hose reels, incident reporting under RIDDOR and post-incident procedures.',
  });

  return (
    <ModuleShell
      backTo="../fire-safety-course"
      backLabel="Fire safety & fire marshal"
      moduleNumber={5}
      title="Firefighting equipment & incident response"
      description="The different types of fire extinguishers and their colour codes, when to use fire blankets and hose reels, and incident reporting, investigation and post-incident procedures."
      tone="amber"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../fire-safety-module-4"
      prevModuleLabel="Fire marshal duties & evacuation"
      nextModuleHref="../fire-safety-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../fire-safety-module-5-section-${section.id}`}
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
