import {
  ClipboardList,
  FileText,
  PoundSterling,
  CheckSquare,
  PlayCircle,
  HardHat,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Project planning and programming',
    icon: ClipboardList,
    description:
      'Work breakdown structures, Gantt charts, critical path, resource planning and MEP coordination.',
  },
  {
    id: 2,
    title: 'Procurement and contracts',
    icon: FileText,
    description:
      'Procurement routes, JCT and NEC contracts, subcontract management, tendering and supply chain.',
  },
  {
    id: 3,
    title: 'Cost management',
    icon: PoundSterling,
    description:
      'Estimating, budgets, cost control, variations, claims, final accounts and value engineering.',
  },
  {
    id: 4,
    title: 'Quality management',
    icon: CheckSquare,
    description:
      'Quality systems, ITPs, material approval, installation quality, testing and defects management.',
  },
  {
    id: 5,
    title: 'Commissioning and handover',
    icon: PlayCircle,
    description:
      'CIBSE commissioning codes, electrical and mechanical commissioning, BMS testing and O&M handover.',
  },
  {
    id: 6,
    title: 'Site management and CDM',
    icon: HardHat,
    description:
      'Site organisation, progress monitoring, CDM compliance, environmental management and completion.',
  },
];

export default function HNCModule5() {
  useSEO({
    title: 'Module 5: Project Management | HNC | Elec-Mate',
    description:
      'Planning, procurement, cost control, quality, commissioning and CDM for building services projects.',
  });

  return (
    <ModuleShell
      backTo="../hnc"
      backLabel="HNC electrical engineering"
      moduleNumber={5}
      title="Project management"
      description="Plan, procure, cost-control and commission building services projects under CDM."
      tone="purple"
      sectionsCount={sections.length}
      duration="2h"
      prevModuleHref="../h-n-c-module4"
      prevModuleLabel="Design principles for building services"
      nextModuleHref="../h-n-c-module6"
      nextModuleLabel="Sustainability and environmental engineering"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../h-n-c-module5-section${section.id}`}
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
