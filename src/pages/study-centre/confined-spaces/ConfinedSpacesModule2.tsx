import { Scale, ClipboardCheck, FileText, ShieldCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Confined Spaces Regulations 1997',
    icon: Scale,
    description:
      'Regulations 1 to 5, the Approved Code of Practice L101, links to the Health and Safety at Work Act 1974, and the Management of Health and Safety at Work Regulations 1999.',
  },
  {
    id: 2,
    title: 'Risk assessment for confined spaces',
    icon: ClipboardCheck,
    description:
      'Identifying confined spaces on site, assessing the hazards present, and applying the hierarchy: avoid entry, implement a safe system of work, arrange emergency procedures.',
  },
  {
    id: 3,
    title: 'Safe systems of work',
    icon: FileText,
    description:
      'Planning the work, supervision arrangements, competence requirements, communication protocols, equipment selection and isolation procedures.',
  },
  {
    id: 4,
    title: 'Permit-to-work systems',
    icon: ShieldCheck,
    description:
      'When a permit to work is required, permit content and format, defined roles and responsibilities, permit lifecycle management, and hot work permits.',
  },
];

export default function ConfinedSpacesModule2() {
  useSEO({
    title: 'Module 2: Legislation & risk assessment | Confined spaces awareness | Elec-Mate',
    description:
      'The Confined Spaces Regulations 1997, risk assessment processes, safe systems of work and permit-to-work systems for confined space entry.',
  });

  return (
    <ModuleShell
      backTo="../confined-spaces-course"
      backLabel="Confined spaces awareness"
      moduleNumber={2}
      title="Legislation & risk assessment"
      description="The legal framework governing confined space work in the UK — how to carry out a thorough risk assessment, implement safe systems of work, and manage permit-to-work procedures."
      tone="cyan"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../confined-spaces-module-1"
      prevModuleLabel="Understanding confined spaces"
      nextModuleHref="../confined-spaces-module-3"
      nextModuleLabel="Hazards & atmospheric monitoring"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../confined-spaces-module-2-section-${section.id}`}
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
