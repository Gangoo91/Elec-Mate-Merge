import { Lightbulb, Target, Layers, ShieldOff } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Fixed vs growth mindset',
    icon: Lightbulb,
    description:
      "Carol Dweck's Stanford research, neural plasticity, fixed mindset triggers in the trades and the power of \u2018yet\u2019.",
  },
  {
    id: 2,
    title: 'Why goal setting matters for tradespeople',
    icon: Target,
    description:
      "Locke & Latham Goal Setting Theory, the goal-performance link and why most tradespeople don't set formal goals.",
  },
  {
    id: 3,
    title: 'Types of goals',
    icon: Layers,
    description:
      'SMART goals (Doran 1981), outcome vs process vs identity goals, and short/medium/long-term horizons.',
  },
  {
    id: 4,
    title: 'Overcoming barriers to growth',
    icon: ShieldOff,
    description:
      "Angela Duckworth's Grit research, common barriers for tradespeople, the comfort zone model and building resilience.",
  },
];

export default function GSModule1() {
  useSEO({
    title: 'Module 1: Understanding goals & growth mindset | Goal Setting & Growth',
    description:
      'Fixed vs growth mindset, why goal setting matters for tradespeople, types of goals and overcoming barriers to growth.',
  });

  return (
    <ModuleShell
      backTo="../goal-setting-growth"
      backLabel="Goal setting & continuous growth"
      moduleNumber={1}
      title="Understanding goals & growth mindset"
      description="How your mindset shapes your potential, why goals work, what types of goals exist, and how to overcome the barriers that hold tradespeople back."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      nextModuleHref="../gs-module-2"
      nextModuleLabel="Setting effective goals"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../gs-module-1-section-${section.id}`}
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
