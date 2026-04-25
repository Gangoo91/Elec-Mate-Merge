import { FileCheck, Clock, TrendingUp, ToggleLeft, Layers } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'RCD types and applications',
    description:
      'Understanding RCD types (AC, A, F, B) and selecting the right one for each installation.',
    icon: FileCheck,
  },
  {
    id: 2,
    title: 'Trip time testing (x1, x5, x0.5)',
    description:
      'Testing RCD trip times at multiples of rated residual current to verify operation.',
    icon: Clock,
  },
  {
    id: 3,
    title: 'Ramp testing',
    description:
      'Using ramp testing to determine actual trip current and verify RCD sensitivity.',
    icon: TrendingUp,
  },
  {
    id: 4,
    title: 'RCD test button vs instrument testing',
    description:
      'The difference between user test buttons and proper instrument testing requirements.',
    icon: ToggleLeft,
  },
  {
    id: 5,
    title: 'Discriminating and selective RCDs',
    description:
      'Time-delayed and selective RCDs for discrimination across multiple protection levels.',
    icon: Layers,
  },
];

export default function InspectionTestingModule6() {
  useSEO({
    title: 'Module 6: RCD Testing | Inspection & Testing',
    description:
      'Trip-time testing, ramp testing and discriminating RCDs for full BS 7671 compliance.',
  });

  return (
    <ModuleShell
      backTo="../inspection-testing"
      backLabel="Inspection & testing"
      moduleNumber={6}
      title="RCD testing"
      description="Comprehensive RCD testing including trip-time verification, ramp testing and selective coordination."
      tone="purple"
      sectionsCount={sections.length}
      duration="45 mins"
      prevModuleHref="../inspection-testing/module-5"
      prevModuleLabel="Earth fault loop impedance"
      nextModuleHref="../inspection-testing/module-7"
      nextModuleLabel="Polarity & functional testing"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../inspection-testing/module-6/section-${section.id}`}
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
