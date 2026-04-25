import { Focus, Timer, Package, BatteryCharging } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Deep work & eliminating distractions',
    icon: Focus,
    description:
      "Cal Newport's Deep Work principles, shallow vs deep work, attention residue and creating focused conditions for tradespeople.",
  },
  {
    id: 2,
    title: 'The Pomodoro Technique & time-boxing',
    icon: Timer,
    description:
      "Francesco Cirillo's 25-minute focused sprints, time-boxing for admin, Parkinson's Law and the power of artificial deadlines.",
  },
  {
    id: 3,
    title: 'Batching & the 80/20 rule',
    icon: Package,
    description:
      "Task batching to reduce context switching, Pareto's 80/20 principle, batch processing communication and errands batching.",
  },
  {
    id: 4,
    title: 'Energy management vs time management',
    icon: BatteryCharging,
    description:
      'Circadian rhythms, matching tasks to energy, the 90-minute ultradian cycle and physical, emotional and mental energy.',
  },
];

export default function TMOModule3() {
  useSEO({
    title: 'Module 3: Focus & Productivity | Time Management & Organisation | Elec-Mate',
    description:
      'Deep work, the Pomodoro Technique, batching and the 80/20 rule, and energy management.',
  });

  return (
    <ModuleShell
      backTo="../time-management-organisation"
      backLabel="Time management & organisation"
      moduleNumber={3}
      title="Focus & productivity"
      description="How to achieve deep focus, use time-boxing techniques, batch similar tasks together and manage your energy for peak performance."
      tone="indigo"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../tmo-module-2"
      prevModuleLabel="Planning & scheduling"
      nextModuleHref="../tmo-module-4"
      nextModuleLabel="Organisation & admin"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../tmo-module-3-section-${section.id}`}
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
