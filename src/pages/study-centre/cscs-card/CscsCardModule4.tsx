import { FlaskConical, AlertTriangle, Volume2, Leaf } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'COSHH essentials',
    icon: FlaskConical,
    description:
      'COSHH Regulations 2002, safety data sheets, COSHH assessment, exposure controls and health surveillance.',
  },
  {
    id: 2,
    title: 'Asbestos awareness',
    icon: AlertTriangle,
    description:
      'Asbestos types, where found, health effects, duty to manage, and what to do if you discover suspected asbestos.',
  },
  {
    id: 3,
    title: 'Noise & vibration',
    icon: Volume2,
    description:
      'Noise exposure limits, hearing protection, audiometry, hand-arm vibration syndrome, and exposure action values.',
  },
  {
    id: 4,
    title: 'Environmental protection',
    icon: Leaf,
    description:
      'Waste management, water pollution prevention, dust and emission controls, and sustainable site practices.',
  },
];

export default function CscsCardModule4() {
  useSEO({
    title: 'Module 4: Hazardous Substances & Environmental | CSCS Card Preparation | Elec-Mate',
    description:
      'COSHH, asbestos awareness, noise and vibration exposure, and environmental protection for the CSCS HS&E test.',
  });

  return (
    <ModuleShell
      backTo="../cscs-card-course"
      backLabel="CSCS card preparation"
      moduleNumber={4}
      title="Hazardous substances & environmental"
      description="COSHH essentials, asbestos awareness duties, noise and vibration exposure limits, and environmental protection responsibilities on construction sites."
      tone="green"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../cscs-card-module-3"
      prevModuleLabel="Working at height & manual handling"
      nextModuleHref="../cscs-card-module-5"
      nextModuleLabel="Specialist knowledge & site safety"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cscs-card-module-4-section-${section.id}`}
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
