import { Dumbbell, Users, ShieldOff, Wallet } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Physical wellbeing & recovery',
    icon: Dumbbell,
    description:
      'Sleep hygiene, nutrition on site, structured exercise, substance awareness and sustained energy.',
  },
  {
    id: 2,
    title: 'Social connection & peer support',
    icon: Users,
    description:
      'Mates in Mind, the power of talking, peer support models, professional help and key helplines.',
  },
  {
    id: 3,
    title: 'Healthy boundaries & workload management',
    icon: ShieldOff,
    description:
      'Saying no, Working Time Regulations, client expectations, digital boundaries and the overwork trap.',
  },
  {
    id: 4,
    title: 'Financial stress & practical problem-solving',
    icon: Wallet,
    description:
      'Emergency funds, CIS tax planning, debt management, insurance and financial support signposting.',
  },
];

export default function RSMModule4() {
  useSEO({
    title: 'Module 4: Building Daily Resilience | Resilience & Stress Management | Elec-Mate',
    description:
      'Physical wellbeing, social connection, healthy boundaries and managing financial stress.',
  });

  return (
    <ModuleShell
      backTo="../resilience-stress-management"
      backLabel="Resilience & stress management"
      moduleNumber={4}
      title="Building daily resilience"
      description="Practical habits for physical health, social connection, workload management and financial stability that build resilience day by day."
      tone="purple"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../rsm-module-3"
      prevModuleLabel="Coping strategies & mindfulness"
      nextModuleHref="../rsm-module-5"
      nextModuleLabel="Switching off & sustaining wellbeing"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../rsm-module-4-section-${section.id}`}
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
