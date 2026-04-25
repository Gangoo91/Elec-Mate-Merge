import { Plug, Zap, RotateCw, Settings, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Polarity testing methods',
    description:
      'Polarity testing techniques and equipment for verifying correct conductor connections.',
    icon: Plug,
  },
  {
    id: 2,
    title: 'Single-phase polarity verification',
    description:
      'Verifying correct polarity of line, neutral and earth conductors in single-phase installations.',
    icon: Zap,
  },
  {
    id: 3,
    title: 'Three-phase rotation testing',
    description: 'Testing phase sequence and rotation direction in three-phase systems.',
    icon: RotateCw,
  },
  {
    id: 4,
    title: 'Functional testing of switchgear',
    description:
      'Verifying switchgear operation including isolators, contactors and control circuits.',
    icon: Settings,
  },
  {
    id: 5,
    title: 'Protective device operation verification',
    description:
      'Testing and verifying correct operation of MCBs, RCDs and fuses.',
    icon: Shield,
  },
];

export default function InspectionTestingModule7() {
  useSEO({
    title: 'Module 7: Polarity & Functional Testing | Inspection & Testing',
    description:
      'Polarity methods, single- and three-phase verification, switchgear functional testing and protective device verification.',
  });

  return (
    <ModuleShell
      backTo="../inspection-testing"
      backLabel="Inspection & testing"
      moduleNumber={7}
      title="Polarity & functional testing"
      description="Polarity verification and functional testing to make sure every device operates safely and correctly."
      tone="purple"
      sectionsCount={sections.length}
      duration="45 mins"
      prevModuleHref="../inspection-testing/module-6"
      prevModuleLabel="RCD testing"
      nextModuleHref="../inspection-testing/module-8"
      nextModuleLabel="Visual inspection & documentation"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../inspection-testing/module-7/section-${section.id}`}
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
