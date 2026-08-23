import { AlertTriangle, Zap, Eye, ListChecks, Wrench, FileText } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Understanding electrical faults',
    icon: AlertTriangle,
    description: 'What faults are, why they occur and their impact on installations.',
    href: 'section1',
  },
  {
    id: 2,
    title: 'Common fault types in electrical installations',
    icon: Zap,
    description: 'Open circuits, short circuits, earth faults and high-resistance connections.',
    href: 'section2',
  },
  {
    id: 3,
    title: 'Signs and symptoms of fault conditions',
    icon: Eye,
    description: 'Tripping protective devices, overheating, and recognising fault indicators.',
    href: 'section3',
  },
  {
    id: 4,
    title: 'Basic fault-finding process and logical testing',
    icon: ListChecks,
    description: 'A systematic approach to diagnosing faults using logical test sequences.',
    href: 'section4',
  },
  {
    id: 5,
    title: 'Using tools and equipment safely when fault-finding',
    icon: Wrench,
    description: 'Selecting and checking test instruments for safe fault diagnosis.',
    href: 'section5',
  },
  {
    id: 6,
    title: 'Recording, reporting and rectifying faults',
    icon: FileText,
    description: 'Documenting findings and reporting faults to supervisors or duty holders.',
    href: 'section6',
  },
];

export default function Module7() {
  useSEO({
    title: 'Module 7: Electrical Fault Finding and Diagnosis | Level 2 Electrical | Elec-Mate',
    description:
      'Fault types, signs and symptoms, logical fault-finding processes, safe use of test equipment and fault reporting.',
  });

  return (
    <ModuleShell
      backTo=".."
      backLabel="Level 2 electrical installation"
      moduleNumber={7}
      title="Electrical fault finding and diagnosis"
      description="Fault types, signs and symptoms, logical diagnosis processes, safe use of test equipment and fault reporting."
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
