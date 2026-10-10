import { FileText, Code, MapPin, Upload, CheckCircle, ClipboardCheck, Search } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Design documents',
    icon: FileText,
    description:
      'The points schedule, the drawings and the description of operation: what each one says, how you install and test from it, and how to keep it true once the job changes.',
  },
  {
    id: 2,
    title: 'Control logic',
    icon: Code,
    description:
      'How to read the logic inside a BMS controller, so you can tell what a pump or fan will do before you walk to the plant room.',
  },
  {
    id: 3,
    title: 'Addressing and point mapping',
    icon: MapPin,
    description:
      'How each device gets a unique address, how a wire on a terminal becomes a named point, and how to keep drawings, software and labels in step.',
  },
  {
    id: 4,
    title: 'Controller set-up and software',
    icon: Upload,
    description:
      'What goes into a BMS controller, how it gets there, how the site keeps a true copy, and where the electrician’s part stops.',
  },
  {
    id: 5,
    title: 'Commissioning',
    icon: CheckCircle,
    description:
      'The order a BMS is proved in, what each stage catches, where the electrician fits in, and how the results turn into records the owner keeps.',
  },
  {
    id: 6,
    title: 'Handover',
    icon: ClipboardCheck,
    description:
      'What the client needs on the day the system becomes theirs, how acceptance is recorded, and what you hand over for your own part of the work.',
  },
  {
    id: 7,
    title: 'Fault finding on a BMS',
    icon: Search,
    description:
      'A method for any BMS fault: start with the person, read what the system already knows, then follow the point out to the field and halve the problem.',
  },
];

export default function BMSModule7() {
  useSEO({
    title: 'Module 7: Design, installation, commissioning and handover | BMS course | Elec-Mate',
    description:
      'Points schedules, control logic, addressing, software, commissioning, handover and fault finding.',
  });

  return (
    <ModuleShell
      backTo="../bms-course"
      backLabel="Building management systems"
      moduleNumber={7}
      title="Design, installation, commissioning and handover"
      description="From the points schedule to handover: control logic, addressing, software, commissioning, documentation and fault finding."
      tone="yellow"
      sectionsCount={sections.length}
      duration="3 hrs 30 mins"
      prevModuleHref="../bms-module-6"
      prevModuleLabel="Alarms, data and monitoring"
      nextModuleHref="../bms-mock-exam"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bms-module-7-section-${section.id}`}
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
