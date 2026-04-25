import { Anchor, AlertTriangle, Eye, Pickaxe, Zap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Earthing system selection: TT, TN-S, TN-C-S',
    icon: Anchor,
    description: 'Understanding and selecting appropriate earthing systems for EV charging.',
  },
  {
    id: 2,
    title: 'Open PEN fault protection methods',
    icon: AlertTriangle,
    description: 'Protecting against open PEN conductor faults on TN-C-S supplies.',
  },
  {
    id: 3,
    title: 'Use of monitoring devices and relays',
    icon: Eye,
    description: 'Installing monitoring equipment for enhanced protection.',
  },
  {
    id: 4,
    title: 'Earth rod installation and testing',
    icon: Pickaxe,
    description: 'Proper earth electrode installation and verification.',
  },
  {
    id: 5,
    title: 'Surge and lightning protection (SPD)',
    icon: Zap,
    description: 'Protecting EV charging systems from electrical surges.',
  },
];

export default function EVChargingModule4() {
  useSEO({
    title: 'Module 4: Earthing & Protection | EV Charging | Elec-Mate',
    description:
      'Earthing system selection, open PEN protection, monitoring devices, earth rods and surge protection.',
  });

  return (
    <ModuleShell
      backTo="../ev-charging-course"
      backLabel="EV charging installation"
      moduleNumber={4}
      title="Earthing and protection considerations"
      description="Essential earthing arrangements and the protection requirements unique to EV charging."
      tone="green"
      sectionsCount={sections.length}
      duration="45 mins"
      prevModuleHref="../ev-charging-module-3"
      prevModuleLabel="Electrical design and load calculation"
      nextModuleHref="../ev-charging-module-5"
      nextModuleLabel="Load management and diversity in EV systems"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ev-charging-module-4-section-${section.id}`}
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
