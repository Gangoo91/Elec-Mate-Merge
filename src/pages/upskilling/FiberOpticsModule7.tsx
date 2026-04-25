import { AlertTriangle, Droplets, Wrench, FileText, TrendingUp } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Common fibre faults and symptoms', icon: AlertTriangle, description: 'Identifying typical fibre optic issues.' },
  { id: 2, title: 'End-face contamination and cleaning', icon: Droplets, description: 'Connector cleaning and maintenance procedures.' },
  { id: 3, title: 'Troubleshooting tools and OTDR use', icon: Wrench, description: 'Diagnostic equipment and fault location techniques.' },
  { id: 4, title: 'Fibre record-keeping', icon: FileText, description: 'Documentation and maintenance records.' },
  { id: 5, title: 'Upgrade planning and network expansion', icon: TrendingUp, description: 'Future-proofing and capacity planning.' },
];

export default function FiberOpticsModule7() {
  useSEO({
    title: 'Module 7: Fault Finding, Maintenance and Upgrades | Fibre Optics | Elec-Mate',
    description: 'Common fibre faults, end-face cleaning, OTDR troubleshooting, record-keeping and planning network upgrades.',
  });

  return (
    <ModuleShell
      backTo="../fiber-optics-course"
      backLabel="Fibre optics technology"
      moduleNumber={7}
      title="Fault finding, maintenance and upgrades"
      description="Diagnose, clean, document and plan ahead — the lifecycle skills for fibre optic networks."
      tone="cyan"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../fiber-optics-module-6"
      prevModuleLabel="Standards and network design principles"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../fiber-optics-module-7-section-${section.id}`}
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
