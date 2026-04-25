import { Shield, Zap, Clock, CircuitBoard, Gauge, Flame, TrendingUp } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Electric shock protection methods (SELV, PELV, ADS, etc.)',
    icon: Shield,
    description: 'Safety systems and methods for preventing electric shock.',
  },
  {
    id: 2,
    title: 'Overcurrent protection and protective device selection',
    icon: Zap,
    description: 'Choosing and applying appropriate overcurrent protective devices.',
  },
  {
    id: 3,
    title: 'Disconnection times and fault path integrity',
    icon: Clock,
    description: 'Fault clearance requirements and protective conductor integrity.',
  },
  {
    id: 4,
    title: 'Residual current devices (RCDs) — use and placement',
    icon: CircuitBoard,
    description: 'RCD application and positioning, including bidirectional requirements.',
  },
  {
    id: 5,
    title: 'Surge protection devices (SPDs) — when and why',
    icon: Gauge,
    description: 'Understanding surge protection requirements and device selection.',
  },
  {
    id: 6,
    title: 'Arc fault detection devices (AFDDs) — new requirements',
    icon: Flame,
    description: 'Latest requirements for arc fault detection in modern installations.',
  },
  {
    id: 7,
    title: 'Bidirectional protection systems (Amendment 3)',
    icon: TrendingUp,
    description: 'Bidirectional protection requirements for renewable energy systems.',
  },
];

export default function BS7671Module4() {
  useSEO({
    title: 'Module 4: Protection for Safety | BS 7671 | Elec-Mate',
    description:
      'Shock protection, overcurrent, RCDs, SPDs, AFDDs and bidirectional protection per BS 7671 Amendment 3.',
  });

  return (
    <ModuleShell
      backTo="../bs7671-course"
      backLabel="18th edition (BS 7671)"
      moduleNumber={4}
      title="Protection for safety"
      description="Comprehensive safety protection methods and protective device requirements."
      tone="yellow"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../bs7671-module-3"
      prevModuleLabel="General characteristics and selection criteria"
      nextModuleHref="../bs7671-module-5"
      nextModuleLabel="Selection and erection of equipment"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bs7671-module-4-section-${section.id}`}
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
