import { Brain, TrendingUp, HardHat, Search } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What is stress?',
    icon: Brain,
    description:
      "Selye's General Adaptation Syndrome, eustress vs distress, Lazarus & Folkman's Transactional Model, and fight-flight-freeze.",
  },
  {
    id: 2,
    title: 'The stress-performance curve',
    icon: TrendingUp,
    description:
      'The Yerkes-Dodson Law, the inverted-U, optimal arousal and individual differences in stress response.',
  },
  {
    id: 3,
    title: 'Stress in the construction industry',
    icon: HardHat,
    description:
      'HSE statistics, common stressors, the 6 Management Standards, site culture and legal duties.',
  },
  {
    id: 4,
    title: 'Recognising the signs',
    icon: Search,
    description:
      'Physical, emotional, behavioural and cognitive symptoms of stress in yourself and others.',
  },
];

export default function RSMModule1() {
  useSEO({
    title: 'Module 1: Understanding Stress | Resilience & Stress Management | Elec-Mate',
    description:
      'What stress is, the stress-performance curve, stress in construction and recognising the signs.',
  });

  return (
    <ModuleShell
      backTo="../resilience-stress-management"
      backLabel="Resilience & stress management"
      moduleNumber={1}
      title="Understanding stress"
      description="What stress is, how it affects performance, why construction workers are particularly vulnerable and how to spot the warning signs."
      tone="purple"
      sectionsCount={sections.length}
      duration="35 mins"
      nextModuleHref="../rsm-module-2"
      nextModuleLabel="Understanding resilience"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../rsm-module-1-section-${section.id}`}
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
