import { BookOpen, Building, TrendingUp, MapPin, FileCheck, HardHat } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What a building management system is',
    icon: BookOpen,
    description:
      'How a BMS is put together, from field devices to the head end, and the words controls engineers use for each part.',
  },
  {
    id: 2,
    title: 'What a BMS controls and connects to',
    icon: Building,
    description:
      'Which building services a BMS runs, which it only watches, and why the line sits where it does.',
  },
  {
    id: 3,
    title: 'Why buildings have one',
    icon: TrendingUp,
    description:
      'Comfort, energy, maintenance and compliance, and the class system now used to describe how good the controls are.',
  },
  {
    id: 4,
    title: 'Where you will meet a BMS',
    icon: MapPin,
    description:
      'Offices, schools, hospitals, data centres and shops: what changes is how much rides on the system and when you can touch it.',
  },
  {
    id: 5,
    title: 'Standards and regulations',
    icon: FileCheck,
    description:
      'When Approved Document L expects a BMS, what it should do, BS EN ISO 52120-1 classes and the paperwork around it.',
  },
  {
    id: 6,
    title: "The electrician's role and working safely",
    icon: HardHat,
    description:
      'Where your work hands over to the controls engineer, and how to make a panel with more than one supply safe.',
  },
];

export default function BMSModule1() {
  useSEO({
    title: 'Module 1: What a BMS is, and the rules around it | BMS course | Elec-Mate',
    description:
      'How a building management system is built, what it controls, why buildings have one and the rules that expect it.',
  });

  return (
    <ModuleShell
      backTo="../bms-course"
      backLabel="Building management systems"
      moduleNumber={1}
      title="What a BMS is, and the rules around it"
      description="How a building management system is built, what it controls, why buildings have one, the rules that expect it, and where the electrician fits."
      tone="yellow"
      sectionsCount={sections.length}
      duration="2 hrs 45 mins"
      nextModuleHref="../bms-module-2"
      nextModuleLabel="Field devices and signals"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bms-module-1-section-${section.id}`}
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
