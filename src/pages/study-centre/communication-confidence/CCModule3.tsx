import { Brain, HeartPulse, HardHat, Presentation } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Understanding confidence',
    icon: Brain,
    description:
      "Bandura's self-efficacy, Clance & Imes imposter syndrome, Carol Dweck growth mindset, the confidence-competence loop.",
  },
  {
    id: 2,
    title: 'Overcoming speaking anxiety',
    icon: HeartPulse,
    description:
      'Glossophobia statistics, CBT cognitive restructuring, exposure ladder, Toastmasters gradual exposure, breathing techniques.',
  },
  {
    id: 3,
    title: 'Delivering effective toolbox talks',
    icon: HardHat,
    description:
      'HSE toolbox talk guidance, CDM 2015 Regulation 13, talk structure, documentation and complete templates.',
  },
  {
    id: 4,
    title: 'Presentations & client conversations',
    icon: Presentation,
    description:
      'Toastmasters speech structure, storytelling for impact, reading the room and handling questions.',
  },
];

export default function CCModule3() {
  useSEO({
    title: 'Module 3: Speaking with confidence | Communication & confidence | Elec-Mate',
    description:
      'Understanding confidence, overcoming speaking anxiety, delivering toolbox talks, presentations and client conversations.',
  });

  return (
    <ModuleShell
      backTo="../communication-confidence"
      backLabel="Communication & confidence"
      moduleNumber={3}
      title="Speaking with confidence"
      description="Understanding confidence, overcoming speaking anxiety, delivering effective toolbox talks and presenting to clients."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../cc-module-2"
      prevModuleLabel="Listening & understanding others"
      nextModuleHref="../cc-module-4"
      nextModuleLabel="Professional writing & digital communication"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cc-module-3-section-${section.id}`}
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
