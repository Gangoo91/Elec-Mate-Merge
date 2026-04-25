import { Battery, Power, Flame, FileCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The importance of recovery',
    icon: Battery,
    description:
      'The performance-recovery cycle, micro/meso/macro recovery, Working Time Regulations and why recovery is not laziness.',
  },
  {
    id: 2,
    title: 'Switching off after work',
    icon: Power,
    description:
      'Transition rituals, digital detox, breaking rumination cycles and creating end-of-day routines.',
  },
  {
    id: 3,
    title: 'Recognising & managing burnout',
    icon: Flame,
    description:
      "Maslach's 3 dimensions, burnout vs stress, warning signs, recovery timelines and seeking help.",
  },
  {
    id: 4,
    title: 'Your personal resilience action plan',
    icon: FileCheck,
    description:
      'SMART action planning, non-negotiable practices, support networks, early warning systems and monthly reviews.',
  },
];

export default function RSMModule5() {
  useSEO({
    title: 'Module 5: Switching Off & Sustaining Wellbeing | Resilience & Stress Management | Elec-Mate',
    description:
      'The importance of recovery, switching off after work, recognising burnout and creating your personal resilience action plan.',
  });

  return (
    <ModuleShell
      backTo="../resilience-stress-management"
      backLabel="Resilience & stress management"
      moduleNumber={5}
      title="Switching off & sustaining wellbeing"
      description="Why recovery matters, how to switch off after work, spotting burnout before it hits and building a personal action plan that sticks."
      tone="purple"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../rsm-module-4"
      prevModuleLabel="Building daily resilience"
      nextModuleHref="../rsm-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../rsm-module-5-section-${section.id}`}
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
