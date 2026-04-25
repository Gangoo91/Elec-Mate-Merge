import { Lightbulb, Route, Ruler, AlertTriangle, FileText, Calculator } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Minimum illumination levels and durations',
    icon: Lightbulb,
    description: 'Required lux levels and operating times under emergency conditions.',
  },
  {
    id: 2,
    title: 'Escape route and coverage rules',
    icon: Route,
    description: 'Path lighting, points of emphasis and coverage requirements.',
  },
  {
    id: 3,
    title: 'Mounting heights and photometric considerations',
    icon: Ruler,
    description: 'Installation heights and light distribution patterns.',
  },
  {
    id: 4,
    title: 'Risk-based design adjustments',
    icon: AlertTriangle,
    description: 'Adapting the design based on a risk assessment of the premises.',
  },
  {
    id: 5,
    title: 'Emergency lighting layout drawings',
    icon: FileText,
    description: 'Producing technical drawings and supporting documentation.',
  },
  {
    id: 6,
    title: 'Software and calculation tools',
    icon: Calculator,
    description: 'Design software and calculation methods for compliance.',
  },
];

export default function EmergencyLightingModule3() {
  useSEO({
    title: 'Module 3: Design Requirements & Placement | Emergency Lighting | Elec-Mate',
    description:
      'Illumination levels, escape routes, mounting heights, risk-based design and layout drawings.',
  });

  return (
    <ModuleShell
      backTo="../emergency-lighting-course"
      backLabel="Emergency lighting systems"
      moduleNumber={3}
      title="Design requirements and placement"
      description="Technical design criteria and the rules that govern luminaire positioning."
      tone="yellow"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../emergency-lighting-module-2"
      prevModuleLabel="System categories and lighting types"
      nextModuleHref="../emergency-lighting-module-4"
      nextModuleLabel="Cabling, battery backup and circuiting"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../emergency-lighting-module-3-section-${section.id}`}
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
