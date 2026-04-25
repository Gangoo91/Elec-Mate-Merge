import { FileCheck, Smartphone, Wrench, Receipt } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Paperwork, certificates & compliance',
    icon: FileCheck,
    description:
      'EICRs, EICs, MWCs, Part P notifications, filing systems, templates and the do-it-at-the-job principle.',
  },
  {
    id: 2,
    title: 'Digital tools & systems',
    icon: Smartphone,
    description:
      'Calendar mastery, invoicing, job tracking, cloud storage, automation and avoiding the one-tool trap.',
  },
  {
    id: 3,
    title: 'Van, tool & material organisation',
    icon: Wrench,
    description:
      'Systematic tool storage, stock management, material pre-ordering, van maintenance and the 5S methodology.',
  },
  {
    id: 4,
    title: 'Financial admin & CIS',
    icon: Receipt,
    description:
      'CIS deductions, invoicing promptly, payment chasing systems, tax record keeping and bookkeeping routines.',
  },
];

export default function TMOModule4() {
  useSEO({
    title: 'Module 4: Organisation & Admin | Time Management & Organisation | Elec-Mate',
    description:
      'Paperwork and certificates, digital tools, van organisation and financial admin including CIS.',
  });

  return (
    <ModuleShell
      backTo="../time-management-organisation"
      backLabel="Time management & organisation"
      moduleNumber={4}
      title="Organisation & admin"
      description="Systems for paperwork, digital tools that actually save time, van organisation that eliminates wasted minutes and financial admin that keeps you solvent."
      tone="indigo"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../tmo-module-3"
      prevModuleLabel="Focus & productivity"
      nextModuleHref="../tmo-module-5"
      nextModuleLabel="Building lasting habits"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../tmo-module-4-section-${section.id}`}
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
