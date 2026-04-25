import { Siren, ClipboardList, Users, CalendarDays } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Emergency procedures & rescue',
    icon: Siren,
    description:
      'Suspension trauma, immediate rescue priority, first aid for falls, spinal protocol and post-rescue positioning.',
  },
  {
    id: 2,
    title: 'Incident reporting & investigation',
    icon: ClipboardList,
    description:
      'RIDDOR requirements, the investigation process, root cause analysis and near-miss reporting culture.',
  },
  {
    id: 3,
    title: 'Roles, responsibilities & competence',
    icon: Users,
    description:
      'Employer, employee, contractor and client duties under CDM 2015, the competent person definition and training.',
  },
  {
    id: 4,
    title: 'Inspection regimes & record keeping',
    icon: CalendarDays,
    description:
      'Pre-use checks, 7-day scaffold inspections, LOLER 6-monthly, record keeping and legal retention periods.',
  },
];

export default function WorkingAtHeightModule5() {
  useSEO({
    title: 'Module 5: Incident Response & Responsibilities | Working at Height | Elec-Mate',
    description:
      'Emergency procedures, incident reporting, roles and responsibilities, and inspection regimes for working at height.',
  });

  return (
    <ModuleShell
      backTo="../working-at-height-course"
      backLabel="Working at height"
      moduleNumber={5}
      title="Incident response & responsibilities"
      description="Emergency procedures, incident reporting, roles and responsibilities, and inspection regimes for working at height."
      tone="amber"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../working-at-height-module-4"
      prevModuleLabel="Safe systems of work"
      nextModuleHref="../working-at-height-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../working-at-height-module-5-section-${section.id}`}
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
