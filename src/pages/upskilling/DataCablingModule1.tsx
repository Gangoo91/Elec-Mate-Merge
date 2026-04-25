import { Network, Wifi, Cpu, TrendingUp } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What is structured cabling?',
    icon: Network,
    description: 'Introduction to structured cabling systems and their building blocks.',
  },
  {
    id: 2,
    title: 'Topologies: star, bus, ring, mesh',
    icon: Wifi,
    description: 'Network topology types and where each is appropriate.',
  },
  {
    id: 3,
    title: 'Passive vs active hardware',
    icon: Cpu,
    description: 'Understanding passive cabling and active network components.',
  },
  {
    id: 4,
    title: 'Network speed, bandwidth and future-proofing',
    icon: TrendingUp,
    description: 'Performance requirements and planning for capacity growth.',
  },
];

export default function DataCablingModule1() {
  useSEO({
    title: 'Module 1: Introduction to Structured Cabling | Data Cabling | Elec-Mate',
    description:
      'Network infrastructure fundamentals — topologies, passive vs active hardware and future-proofing.',
  });

  return (
    <ModuleShell
      backTo="../data-cabling-course"
      backLabel="Data and communications cabling"
      moduleNumber={1}
      title="Introduction to structured cabling systems"
      description="The fundamentals of structured cabling and modern network infrastructure."
      tone="cyan"
      sectionsCount={sections.length}
      duration="45 mins"
      nextModuleHref="../data-cabling-module-2"
      nextModuleLabel="Copper cabling standards (Cat5e, Cat6, etc.)"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../data-cabling-module-1-section-${section.id}`}
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
