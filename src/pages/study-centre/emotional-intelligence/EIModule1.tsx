import { Smile, Microscope, HardHat, Layers } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What is emotional intelligence?',
    icon: Smile,
    description:
      "Salovey & Mayer's academic definition, Goleman's popularised framework, EI vs IQ, the four-branch model, TalentSmart research.",
  },
  {
    id: 2,
    title: 'The science behind emotions',
    icon: Microscope,
    description:
      "Neurological basis, Ekman's six universal emotions, amygdala hijack, fight-flight-freeze, emotional contagion, cognitive triangle.",
  },
  {
    id: 3,
    title: 'Why EI matters in construction',
    icon: HardHat,
    description:
      'EI and safety, CITB behavioural competencies, HSE Management Standards, cost of low EI, Mates in Mind.',
  },
  {
    id: 4,
    title: "Goleman's five domains overview",
    icon: Layers,
    description:
      'Self-awareness, self-regulation, motivation, empathy, social skills — the 25 competencies and why they build sequentially.',
  },
];

export default function EIModule1() {
  useSEO({
    title: 'Module 1: Understanding Emotional Intelligence | Elec-Mate',
    description:
      "What emotional intelligence is, the science behind emotions, why EI matters in construction, and an overview of Goleman's five domains.",
  });

  return (
    <ModuleShell
      backTo="../emotional-intelligence"
      backLabel="Emotional intelligence"
      moduleNumber={1}
      title="Understanding emotional intelligence"
      description="What EI is, the science behind emotions, why EI matters in construction, and an overview of Goleman's five domains."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      nextModuleHref="../ei-module-2"
      nextModuleLabel="Self-awareness"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ei-module-1-section-${section.id}`}
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
