import { TestTube, Eye, Wrench, Zap, Shield, FileText, Award } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Purpose of inspection and testing',
    icon: TestTube,
    description: 'Why inspection and testing are essential for electrical safety.',
    href: 'section1',
  },
  {
    id: 2,
    title: 'Visual inspection of electrical installations',
    icon: Eye,
    description: 'Systematic visual inspection techniques for electrical systems.',
    href: 'section2',
  },
  {
    id: 3,
    title: 'Basic testing procedures and instruments',
    icon: Wrench,
    description: 'Introduction to electrical testing equipment and procedures.',
    href: 'section3',
  },
  {
    id: 4,
    title: 'Continuity and polarity checks',
    icon: Zap,
    description: 'Testing for electrical continuity and correct polarity.',
    href: 'section4',
  },
  {
    id: 5,
    title: 'Insulation resistance testing (introduction)',
    icon: Shield,
    description: 'Basic introduction to insulation resistance testing principles.',
    href: 'section5',
  },
  {
    id: 6,
    title: 'Recording test results and defect identification',
    icon: FileText,
    description: 'Documenting test results and identifying electrical defects.',
    href: 'section6',
  },
  {
    id: 7,
    title: 'Introduction to certification and documentation',
    icon: Award,
    description: 'Understanding electrical certification and compliance documentation.',
    href: 'section7',
  },
];

export default function Module6() {
  useSEO({
    title: 'Module 6: Inspection, Testing and Certification | Level 2 Electrical | Elec-Mate',
    description:
      'Visual inspection, testing instruments, continuity, polarity, insulation resistance and electrical certification.',
  });

  return (
    <ModuleShell
      backTo=".."
      backLabel="Level 2 electrical installation"
      moduleNumber={6}
      title="Inspection, testing and certification"
      description="Visual inspection, testing instruments, continuity, polarity, insulation resistance and certification."
      tone="emerald"
      sectionsCount={sections.length}
      prevModuleHref="../module5"
      prevModuleLabel="Design, planning and communication"
      nextModuleHref="../module7"
      nextModuleLabel="Electrical fault finding and diagnosis"
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
