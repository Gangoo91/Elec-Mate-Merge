import { BookOpen, Calculator, Thermometer, Wind, CheckCircle, FileText } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '1.1',
    title: 'Introduction to Part L',
    description:
      'Part L structure, 2021 amendments, conservation of fuel and power, compliance routes and building types',
    icon: BookOpen,
    href: '../h-n-c-module6-section1-1',
  },
  {
    number: '1.2',
    title: 'SBEM calculations',
    description:
      'Simplified Building Energy Model, inputs and outputs, NCM methodology and compliance demonstration',
    icon: Calculator,
    href: '../h-n-c-module6-section1-2',
  },
  {
    number: '1.3',
    title: 'Fabric performance',
    description:
      'U-value calculations, thermal bridging, limiting fabric parameters and construction specifications',
    icon: Thermometer,
    href: '../h-n-c-module6-section1-3',
  },
  {
    number: '1.4',
    title: 'Air permeability',
    description:
      'Air tightness testing, design air permeability, testing procedures and achieving targets',
    icon: Wind,
    href: '../h-n-c-module6-section1-4',
  },
  {
    number: '1.5',
    title: 'Building services compliance',
    description:
      'Minimum efficiencies, controls requirements, metering, lighting and HVAC system specifications',
    icon: CheckCircle,
    href: '../h-n-c-module6-section1-5',
  },
  {
    number: '1.6',
    title: 'Documentation and handover',
    description:
      'EPCs, commissioning certificates, building log book, as-built documentation and Part L evidence',
    icon: FileText,
    href: '../h-n-c-module6-section1-6',
  },
];

const HNCModule6Section1 = () => {
  useSEO(
    'Building Regulations Part L - HNC Module 6 Section 1 | Sustainability',
    'Master Part L compliance: SBEM calculations, notional building method, U-values, air permeability testing and commissioning requirements for building services.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={1}
      title="Building Regulations Part L"
      description="Understand Part L requirements for conservation of fuel and power in new and existing buildings."
      tone="purple"
      subsectionsCount={subsections.length}
    >
      {subsections.map((s, i) => (
        <ModuleCard
          key={i}
          number={s.number}
          title={s.title}
          description={s.description}
          icon={s.icon}
          href={s.href}
        />
      ))}
    </SectionShell>
  );
};

export default HNCModule6Section1;
