import { Ear, Headphones, HelpCircle, AlertTriangle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The art of listening',
    icon: Ear,
    description:
      "Stephen Covey's 5 levels of listening, Habit 5, listening statistics and construction examples.",
  },
  {
    id: 2,
    title: 'Active listening techniques',
    icon: Headphones,
    description:
      'Egan SOLER model, Julian Treasure RASA model, reflective listening, paraphrasing and summarising.',
  },
  {
    id: 3,
    title: 'Asking effective questions',
    icon: HelpCircle,
    description:
      'Question types, funnel technique, Socratic questioning, fault diagnosis and client requirements.',
  },
  {
    id: 4,
    title: 'Listening in high-stakes situations',
    icon: AlertTriangle,
    description:
      'Empathetic listening under pressure, conscious listening, managing emotional conversations and language barriers.',
  },
];

export default function CCModule2() {
  useSEO({
    title: 'Module 2: Listening & understanding others | Communication & confidence | Elec-Mate',
    description:
      'The art of listening, active listening techniques, asking effective questions and listening in high-stakes construction situations.',
  });

  return (
    <ModuleShell
      backTo="../communication-confidence"
      backLabel="Communication & confidence"
      moduleNumber={2}
      title="Listening & understanding others"
      description="The art of listening, active listening techniques, asking effective questions and listening in high-stakes construction situations."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../cc-module-1"
      prevModuleLabel="Understanding communication"
      nextModuleHref="../cc-module-3"
      nextModuleLabel="Speaking with confidence"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cc-module-2-section-${section.id}`}
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
