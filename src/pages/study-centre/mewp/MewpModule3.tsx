import { ClipboardCheck, Wrench, Anchor, HardHat } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Familiarisation & the pre-use inspection',
    icon: ClipboardCheck,
    description:
      'Familiarisation vs training, full pre-use checklist, wheels, hydraulics, controls, safety systems and defect reporting.',
  },
  {
    id: 2,
    title: 'Thorough examination & maintenance',
    icon: Wrench,
    description:
      'LOLER 6-monthly examination, competent person, examination scope, PUWER routine maintenance and post-event inspections.',
  },
  {
    id: 3,
    title: 'Outriggers, stabilisers & ground preparation',
    icon: Anchor,
    description:
      'Full deployment rules, spreader plates, pad sizing, hydraulic holding valves, ground preparation and interlocks.',
  },
  {
    id: 4,
    title: 'Fall protection, harnesses & PPE',
    icon: HardHat,
    description:
      'Work restraint vs fall arrest, harness requirements by machine type, inspection, fitting, anchor points and other PPE.',
  },
];

export default function MewpModule3() {
  useSEO({
    title:
      'Module 3: Pre-use inspections, setup & fall protection | MEWP operator training | Elec-Mate',
    description:
      'MEWP pre-use inspections, thorough examination, outrigger setup, fall protection harnesses and PPE requirements.',
  });

  return (
    <ModuleShell
      backTo="../mewp-course"
      backLabel="MEWP operator training"
      moduleNumber={3}
      title="Pre-use inspections, setup & fall protection"
      description="How to inspect a MEWP before use, set up outriggers and stabilisers safely, and select the correct fall protection."
      tone="emerald"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../mewp-module-2"
      prevModuleLabel="Risk assessment, planning & selection"
      nextModuleHref="../mewp-module-4"
      nextModuleLabel="Safe operating procedures"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../mewp-module-3-section-${section.id}`}
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
