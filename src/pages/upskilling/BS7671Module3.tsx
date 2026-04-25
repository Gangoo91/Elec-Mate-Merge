import { Grid, Calculator, Thermometer, Zap, Shield, TrendingUp } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Supply systems — TN-S, TN-C-S, TT, IT',
    icon: Grid,
    description: 'Earthing arrangements and their safety implications for installation design.',
  },
  {
    id: 2,
    title: 'Maximum demand, diversity and load profiles',
    icon: Calculator,
    description: 'Load calculations, diversity factors and system design principles.',
  },
  {
    id: 3,
    title: 'External influences and installation conditions',
    icon: Thermometer,
    description: 'Environmental conditions affecting material selection and installation methods.',
  },
  {
    id: 4,
    title: 'Voltage drop and system design limits',
    icon: Zap,
    description: 'Calculating and managing voltage drop within BS 7671 limits.',
  },
  {
    id: 5,
    title: 'Earthing arrangements and protective measures selection',
    icon: Shield,
    description: 'Matching earthing systems with appropriate protection strategies.',
  },
  {
    id: 6,
    title: 'Amendment 3 current requirements',
    icon: TrendingUp,
    description: 'Latest bidirectional protection and renewable energy integration requirements.',
  },
];

export default function BS7671Module3() {
  useSEO({
    title: 'Module 3: General Characteristics & Selection | BS 7671 | Elec-Mate',
    description:
      'Supply systems, diversity, voltage drop, external influences and earthing arrangements per BS 7671.',
  });

  return (
    <ModuleShell
      backTo="../bs7671-course"
      backLabel="18th edition (BS 7671)"
      moduleNumber={3}
      title="General characteristics and selection criteria"
      description="System design fundamentals — earthing arrangements, diversity and voltage drop."
      tone="yellow"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../bs7671-module-2"
      prevModuleLabel="Definitions and key terminology"
      nextModuleHref="../bs7671-module-4"
      nextModuleLabel="Protection for safety"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bs7671-module-3-section-${section.id}`}
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
