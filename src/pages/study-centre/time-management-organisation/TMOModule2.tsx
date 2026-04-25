import { Inbox, CalendarRange, Calculator, Layers } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The GTD method for tradespeople',
    icon: Inbox,
    description:
      "David Allen's Getting Things Done — capture, clarify, organise, reflect, engage — adapted for sole traders and electricians.",
  },
  {
    id: 2,
    title: 'Weekly planning & job scheduling',
    icon: CalendarRange,
    description:
      'The weekly plan as the cornerstone of time management, buffer time, blocking admin time and visual scheduling.',
  },
  {
    id: 3,
    title: 'Quoting, estimating & time allocation',
    icon: Calculator,
    description:
      'Accurate time estimation, reference times, quoting frameworks, scope creep and tracking actuals vs estimates.',
  },
  {
    id: 4,
    title: 'Managing multiple jobs',
    icon: Layers,
    description:
      'Job pipeline stages, tracking systems, managing client expectations, work-in-progress limits and handling cancellations.',
  },
];

export default function TMOModule2() {
  useSEO({
    title: 'Module 2: Planning & Scheduling | Time Management & Organisation | Elec-Mate',
    description:
      'The GTD method, weekly planning, quoting and estimating, and managing multiple jobs.',
  });

  return (
    <ModuleShell
      backTo="../time-management-organisation"
      backLabel="Time management & organisation"
      moduleNumber={2}
      title="Planning & scheduling"
      description="From capturing every commitment to scheduling your week, quoting accurately and keeping multiple jobs on track without dropping anything."
      tone="indigo"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../tmo-module-1"
      prevModuleLabel="Understanding time management"
      nextModuleHref="../tmo-module-3"
      nextModuleLabel="Focus & productivity"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../tmo-module-2-section-${section.id}`}
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
