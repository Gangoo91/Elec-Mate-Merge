import { Award, Building, Calculator, MapPin } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'TIA/EIA and ISO/IEC standards', icon: Award, description: 'International standards and specifications.' },
  { id: 2, title: 'Structured cabling design rules', icon: Building, description: 'Design principles and layout requirements.' },
  { id: 3, title: 'Loss budgets and length limits', icon: Calculator, description: 'Performance calculations and distance limitations.' },
  { id: 4, title: 'Design scenarios: campus, data centre, industrial', icon: MapPin, description: 'Application-specific design considerations.' },
];

export default function FiberOpticsModule6() {
  useSEO({
    title: 'Module 6: Standards and Network Design | Fibre Optics | Elec-Mate',
    description: 'TIA/EIA and ISO/IEC standards, structured cabling design rules, loss budgets and real-world design scenarios.',
  });

  return (
    <ModuleShell
      backTo="../fiber-optics-course"
      backLabel="Fibre optics technology"
      moduleNumber={6}
      title="Standards and network design principles"
      description="The standards and calculations behind a compliant structured cabling design."
      tone="cyan"
      sectionsCount={sections.length}
      duration="45 mins"
      prevModuleHref="../fiber-optics-module-5"
      prevModuleLabel="Fibre testing and certification"
      nextModuleHref="../fiber-optics-module-7"
      nextModuleLabel="Fault finding, maintenance and upgrades"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../fiber-optics-module-6-section-${section.id}`}
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
