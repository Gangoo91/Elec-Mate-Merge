import { RefreshCw, Atom, ShieldCheck, ClipboardList } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What is resilience?',
    icon: RefreshCw,
    description:
      'APA definition, resilience as a learnable skill, bouncing back vs bouncing forward, and common myths.',
  },
  {
    id: 2,
    title: 'The science of resilience',
    icon: Atom,
    description:
      'Neuroplasticity, growth mindset, post-traumatic growth, learned optimism and the 3 Ps.',
  },
  {
    id: 3,
    title: 'Resilience factors & protective resources',
    icon: ShieldCheck,
    description:
      'The 7 resilience abilities, protective factors, risk factors and the resilience bucket metaphor.',
  },
  {
    id: 4,
    title: 'Self-assessment & knowing your triggers',
    icon: ClipboardList,
    description:
      'Identifying personal triggers, stress diaries, body awareness, energy audits and resilience baselines.',
  },
];

export default function RSMModule2() {
  useSEO({
    title: 'Module 2: Understanding Resilience | Resilience & Stress Management | Elec-Mate',
    description:
      'What resilience is, the science behind it, protective factors and knowing your triggers.',
  });

  return (
    <ModuleShell
      backTo="../resilience-stress-management"
      backLabel="Resilience & stress management"
      moduleNumber={2}
      title="Understanding resilience"
      description="What resilience really means, the science behind it and how to build a personal resilience baseline."
      tone="purple"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../rsm-module-1"
      prevModuleLabel="Understanding stress"
      nextModuleHref="../rsm-module-3"
      nextModuleLabel="Coping strategies & mindfulness"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../rsm-module-2-section-${section.id}`}
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
