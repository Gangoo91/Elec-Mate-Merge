import {
  FileText,
  Lightbulb,
  MapPin,
  Package,
  Users,
  MessageSquare,
  Clipboard,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Understanding installation specifications and drawings',
    icon: FileText,
    description: 'Reading and interpreting technical drawings and specifications.',
    href: 'section1',
  },
  {
    id: 2,
    title: 'Basic electrical design principles',
    icon: Lightbulb,
    description: 'Fundamental principles of electrical system design.',
    href: 'section2',
  },
  {
    id: 3,
    title: 'Planning installation work on site',
    icon: MapPin,
    description: 'Planning and organising electrical installation projects.',
    href: 'section3',
  },
  {
    id: 4,
    title: 'Materials, tools and resource planning',
    icon: Package,
    description: 'Planning and managing resources for electrical installations.',
    href: 'section4',
  },
  {
    id: 5,
    title: 'Working with other trades and site personnel',
    icon: Users,
    description: 'Collaboration and coordination with other construction trades.',
    href: 'section5',
  },
  {
    id: 6,
    title: 'Communicating information effectively',
    icon: MessageSquare,
    description: 'Professional communication skills for electrical work.',
    href: 'section6',
  },
  {
    id: 7,
    title: 'Documentation, labelling and record keeping',
    icon: Clipboard,
    description: 'Maintaining accurate records and documentation.',
    href: 'section7',
  },
];

export default function Module5() {
  useSEO({
    title: 'Module 5: Design, Planning and Communication | Level 2 Electrical | Elec-Mate',
    description:
      'Reading drawings, design principles, site planning, resources, working with other trades and documentation.',
  });

  return (
    <ModuleShell
      backTo=".."
      backLabel="Level 2 electrical installation"
      moduleNumber={5}
      title="Design, planning and communication"
      description="Project planning, technical documentation and effective team communication."
      tone="emerald"
      sectionsCount={sections.length}
      prevModuleHref="../module4"
      prevModuleLabel="Installing wiring systems and enclosures"
      nextModuleHref="../module6"
      nextModuleLabel="Inspection, testing and certification"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={section.href}
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
