import { MessageCircle, Radio, Palette, ShieldAlert } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What is communication?',
    icon: MessageCircle,
    description:
      'Shannon-Weaver model, ILM Level 2 definition, Eric Berne transactional analysis, one-way vs two-way communication.',
  },
  {
    id: 2,
    title: 'Verbal, nonverbal & written channels',
    icon: Radio,
    description:
      'Mehrabian 7-38-55 (correctly contextualised), Egan SOLER model, paralinguistics, choosing the right channel.',
  },
  {
    id: 3,
    title: 'Communication styles',
    icon: Palette,
    description:
      'Passive to aggressive continuum, Thomas Gordon I-messages, transactional analysis, CITB behavioural competencies.',
  },
  {
    id: 4,
    title: 'Communication barriers & how to overcome them',
    icon: ShieldAlert,
    description:
      'ILM Level 2 barrier framework, Shannon-Weaver noise, HSE guidance, CDM 2015, multilingual teams.',
  },
];

export default function CCModule1() {
  useSEO({
    title: 'Module 1: Understanding communication | Communication & confidence | Elec-Mate',
    description:
      'What communication is, verbal/nonverbal/written channels, communication styles and overcoming barriers in construction.',
  });

  return (
    <ModuleShell
      backTo="../communication-confidence"
      backLabel="Communication & confidence"
      moduleNumber={1}
      title="Understanding communication"
      description="What communication is, verbal/nonverbal/written channels, communication styles and how to overcome barriers in construction."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      nextModuleHref="../cc-module-2"
      nextModuleLabel="Listening & understanding others"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cc-module-1-section-${section.id}`}
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
