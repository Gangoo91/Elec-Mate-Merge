import { CircleDot, Route, Home, Table, Calculator, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Earth fault path principles',
    description:
      'The earth fault current path and why it matters for protective device operation.',
    icon: Route,
  },
  {
    id: 2,
    title: 'Zs testing methods',
    description: 'Techniques for measuring earth fault loop impedance at circuit endpoints.',
    icon: CircleDot,
  },
  {
    id: 3,
    title: 'Ze testing at origin',
    description: 'Measuring external earth fault loop impedance at the supply origin.',
    icon: Home,
  },
  {
    id: 4,
    title: 'Maximum Zs values (BS 7671 tables)',
    description: 'Applying maximum permitted Zs values from the BS 7671 reference tables.',
    icon: Table,
  },
  {
    id: 5,
    title: 'Prospective fault current calculation',
    description: 'Calculating IPFC from earth fault loop impedance measurements.',
    icon: Calculator,
  },
  {
    id: 6,
    title: 'EFLI testing of RCD-protected circuits',
    description:
      'Special considerations when testing earth fault loop impedance on RCD-protected circuits.',
    icon: Shield,
  },
];

export default function InspectionTestingModule5() {
  useSEO({
    title: 'Module 5: Earth Fault Loop Impedance | Inspection & Testing',
    description:
      'Zs and Ze measurements, maximum values from BS 7671 and special procedures for RCD-protected circuits.',
  });

  return (
    <ModuleShell
      backTo="../inspection-testing"
      backLabel="Inspection & testing"
      moduleNumber={5}
      title="Earth fault loop impedance"
      description="Measure and verify earth fault loop impedance to confirm automatic disconnection within required times."
      tone="purple"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../inspection-testing/module-4"
      prevModuleLabel="Insulation resistance testing"
      nextModuleHref="../inspection-testing/module-6"
      nextModuleLabel="RCD testing"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../inspection-testing/module-5/section-${section.id}`}
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
