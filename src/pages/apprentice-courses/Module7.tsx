import { AlertTriangle, Search, Stethoscope, TestTube, Shield, FileText } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Understanding electrical faults',
    icon: AlertTriangle,
    description: 'Fundamental concepts of electrical faults and their characteristics.',
    href: 'section1',
  },
  {
    id: 2,
    title: 'Common fault types in electrical installations',
    icon: Search,
    description: 'Identifying different types of electrical faults and their causes.',
    href: 'section2',
  },
  {
    id: 3,
    title: 'Signs and symptoms of fault conditions',
    icon: Stethoscope,
    description: 'Recognising indicators of electrical fault conditions.',
    href: 'section3',
  },
  {
    id: 4,
    title: 'Basic fault-finding process and logical testing',
    icon: TestTube,
    description: 'Systematic approach to electrical fault diagnosis.',
    href: 'section4',
  },
  {
    id: 5,
    title: 'Using tools and equipment safely when fault-finding',
    icon: Shield,
    description: 'Safe practices and equipment use during fault finding.',
    href: 'section5',
  },
  {
    id: 6,
    title: 'Recording, reporting and rectifying faults',
    icon: FileText,
    description: 'Documentation and remedial procedures for electrical faults.',
    href: 'section6',
  },
];

export default function Module7() {
  useSEO({
    title: 'Module 7: Electrical Fault Finding and Diagnosis | Level 2 Electrical | Elec-Mate',
    description:
      'Common fault types, signs and symptoms, logical fault-finding, safe tool use and reporting for electrical apprentices.',
  });

  return (
    <ModuleShell
      backTo=".."
      backLabel="Level 2 electrical installation"
      moduleNumber={7}
      title="Electrical fault finding and diagnosis"
      description="Identify, diagnose and safely resolve electrical faults in installations."
      tone="emerald"
      sectionsCount={sections.length}
      prevModuleHref="../module6"
      prevModuleLabel="Inspection, testing and certification"
      nextModuleHref="../module8"
      nextModuleLabel="Mock examinations and assessment"
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
