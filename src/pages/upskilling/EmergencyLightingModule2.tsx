import { Shield, Eye, Target, Settings, MapPin, ClipboardCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Emergency escape lighting',
    icon: Shield,
    description: 'Exit route and escape path lighting requirements.',
  },
  {
    id: 2,
    title: 'Open area (anti-panic) lighting',
    icon: Eye,
    description: 'General area lighting designed to prevent panic.',
  },
  {
    id: 3,
    title: 'High-risk task area lighting',
    icon: Target,
    description: 'Specialist lighting for safe shutdown of critical operations.',
  },
  {
    id: 4,
    title: 'Maintained vs non-maintained systems',
    icon: Settings,
    description: 'System operation modes and configuration choices.',
  },
  {
    id: 5,
    title: 'Signage and wayfinding lighting',
    icon: MapPin,
    description: 'Directional, exit and wayfinding lighting systems.',
  },
  {
    id: 6,
    title: 'System testing and record keeping',
    icon: ClipboardCheck,
    description: 'Testing schedules, maintenance and compliance documentation.',
  },
];

export default function EmergencyLightingModule2() {
  useSEO({
    title: 'Module 2: System Categories & Lighting Types | Emergency Lighting | Elec-Mate',
    description:
      'Escape, anti-panic and high-risk task lighting plus maintained vs non-maintained system configurations.',
  });

  return (
    <ModuleShell
      backTo="../emergency-lighting-course"
      backLabel="Emergency lighting systems"
      moduleNumber={2}
      title="System categories and lighting types"
      description="Understanding the different emergency lighting categories and applications."
      tone="yellow"
      sectionsCount={sections.length}
      duration="45 mins"
      prevModuleHref="../emergency-lighting-module-1"
      prevModuleLabel="Introduction to emergency lighting"
      nextModuleHref="../emergency-lighting-module-3"
      nextModuleLabel="Design requirements and placement"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../emergency-lighting-module-2-section-${section.id}`}
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
