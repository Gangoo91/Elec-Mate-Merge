import { Brain, RotateCw, Hourglass, ClipboardCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The science of habit formation',
    icon: Brain,
    description:
      "James Clear's Atomic Habits, the habit loop, the 4 Laws of Behaviour Change, identity-based habits and the 1% rule.",
  },
  {
    id: 2,
    title: 'Creating routines that work',
    icon: RotateCw,
    description:
      'Morning routines, pre-work checklists, end-of-day routines, weekly and monthly routines and building flexibility into structure.',
  },
  {
    id: 3,
    title: 'Overcoming procrastination',
    icon: Hourglass,
    description:
      'Why we procrastinate, common triggers, the just-5-minutes rule, eating the frog and administrative procrastination.',
  },
  {
    id: 4,
    title: 'Your personal productivity action plan',
    icon: ClipboardCheck,
    description:
      'Bringing it all together — time audit results, SMART action planning, non-negotiable routines, quick wins and review schedule.',
  },
];

export default function TMOModule5() {
  useSEO({
    title: 'Module 5: Building Lasting Habits | Time Management & Organisation | Elec-Mate',
    description:
      'The science of habit formation, creating routines, overcoming procrastination and your personal productivity action plan.',
  });

  return (
    <ModuleShell
      backTo="../time-management-organisation"
      backLabel="Time management & organisation"
      moduleNumber={5}
      title="Building lasting habits"
      description="The science behind habit formation, practical routines for tradespeople, beating procrastination and creating your personal productivity action plan."
      tone="indigo"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../tmo-module-4"
      prevModuleLabel="Organisation & admin"
      nextModuleHref="../tmo-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../tmo-module-5-section-${section.id}`}
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
