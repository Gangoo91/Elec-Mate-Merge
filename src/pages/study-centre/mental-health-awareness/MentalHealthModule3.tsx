import { HandHeart, Ear, MessageSquare, HardHat } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'How to approach someone',
    icon: HandHeart,
    description:
      'Choosing the right moment, creating a safe space, and opening the conversation with care.',
  },
  {
    id: 2,
    title: 'Active listening and the ALGEE model',
    icon: Ear,
    description:
      'The MHFA England ALGEE action plan, non-judgemental listening, and being fully present.',
  },
  {
    id: 3,
    title: 'What to say and what not to say',
    icon: MessageSquare,
    description:
      'Helpful vs harmful language, empathy without fixing, and phrases that shut people down.',
  },
  {
    id: 4,
    title: 'Conversations on site',
    icon: HardHat,
    description:
      'Practical scenarios for the van, the canteen, and the site — making it normal to talk.',
  },
];

export default function MentalHealthModule3() {
  useSEO({
    title: 'Module 3: Starting conversations | Mental health awareness | Elec-Mate',
    description:
      'How to approach someone, active listening, the ALGEE model, and having conversations on site.',
  });

  return (
    <ModuleShell
      backTo="../mental-health-awareness"
      backLabel="Mental health awareness"
      moduleNumber={3}
      title="Starting conversations"
      description="How to approach someone you're worried about, listen without judgement, and make talking about mental health normal on site."
      tone="purple"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../mental-health-module-2"
      prevModuleLabel="Recognising the signs"
      nextModuleHref="../mental-health-module-4"
      nextModuleLabel="Supporting others"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../mental-health-module-3-section-${section.id}`}
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
