import { FolderOpen, Table, Smartphone, ShieldCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Computer basics and file management',
    icon: FolderOpen,
    description: 'OS navigation, file types, cloud storage, naming conventions and backups.',
    href: '/study-centre/apprentice/functional-skills/module3/section1',
  },
  {
    id: 2,
    title: 'Spreadsheets and calculations',
    icon: Table,
    description:
      'Excel and Sheets for cable calculations, material lists, job costing and formulae.',
    href: '/study-centre/apprentice/functional-skills/module3/section2',
  },
  {
    id: 3,
    title: 'Digital documentation and apps',
    icon: Smartphone,
    description: 'Certification software, PDF annotation, photo evidence and digital tools.',
    href: '/study-centre/apprentice/functional-skills/module3/section3',
  },
  {
    id: 4,
    title: 'Online safety and communication',
    icon: ShieldCheck,
    description: 'Email etiquette, phishing awareness, passwords, GDPR and social media.',
    href: '/study-centre/apprentice/functional-skills/module3/section4',
  },
];

export default function FunctionalSkillsModule3() {
  useSEO({
    title: 'Module 3: Digital Skills for Electricians | Functional Skills | Elec-Mate',
    description:
      'Computer basics, spreadsheets, digital documentation, apps and online safety for the electrical trade.',
  });

  return (
    <ModuleShell
      backTo="../functional-skills"
      backLabel="Functional skills"
      moduleNumber={3}
      title="Digital skills for electricians"
      description="Use computers, spreadsheets and apps confidently — and stay safe online while you do it."
      tone="yellow"
      sectionsCount={sections.length}
      duration="1h"
      prevModuleHref="/study-centre/apprentice/functional-skills/module2"
      prevModuleLabel="English for electricians"
      nextModuleHref="/study-centre/apprentice/functional-skills/module4"
      nextModuleLabel="Practical mathematics applications"
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
