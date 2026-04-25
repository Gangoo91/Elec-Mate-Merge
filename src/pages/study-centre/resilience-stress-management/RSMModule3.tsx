import { Flower2, Timer, Lightbulb, Crosshair } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Mindfulness-based stress reduction',
    icon: Flower2,
    description:
      "Kabat-Zinn's MBSR programme, what mindfulness is (and is not), the evidence base and core practices.",
  },
  {
    id: 2,
    title: 'Practical mindfulness techniques',
    icon: Timer,
    description:
      '3-Minute Breathing Space, Box Breathing, 5-4-3-2-1 Grounding, Body Scan and the mindful commute.',
  },
  {
    id: 3,
    title: 'Cognitive strategies & reframing',
    icon: Lightbulb,
    description:
      "Beck's CBT, cognitive distortions, Ellis's ABC Model, reframing techniques and thought records.",
  },
  {
    id: 4,
    title: 'Problem-focused vs emotion-focused coping',
    icon: Crosshair,
    description:
      "Lazarus & Folkman's two coping strategies, when to use which, and avoiding avoidant coping.",
  },
];

export default function RSMModule3() {
  useSEO({
    title: 'Module 3: Coping Strategies & Mindfulness | Resilience & Stress Management | Elec-Mate',
    description:
      'MBSR techniques, practical mindfulness, cognitive reframing and coping strategies.',
  });

  return (
    <ModuleShell
      backTo="../resilience-stress-management"
      backLabel="Resilience & stress management"
      moduleNumber={3}
      title="Coping strategies & mindfulness"
      description="Evidence-based techniques for managing stress, from mindfulness practices to cognitive reframing and choosing the right coping strategy."
      tone="purple"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../rsm-module-2"
      prevModuleLabel="Understanding resilience"
      nextModuleHref="../rsm-module-4"
      nextModuleLabel="Building daily resilience"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../rsm-module-3-section-${section.id}`}
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
