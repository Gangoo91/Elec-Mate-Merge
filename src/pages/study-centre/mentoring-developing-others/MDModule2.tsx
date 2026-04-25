import { Target, HelpCircle, MessageSquare, Handshake } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The GROW model & coaching conversations',
    icon: Target,
    description:
      'Goal, Reality, Options, Will/Way Forward — structured coaching, mentoring vs coaching vs teaching, ILM competencies.',
  },
  {
    id: 2,
    title: 'Questioning techniques & active listening',
    icon: HelpCircle,
    description:
      "Open vs closed questions, Socratic questioning, funnel technique, Covey's listening levels, RASA framework.",
  },
  {
    id: 3,
    title: 'Giving effective feedback',
    icon: MessageSquare,
    description:
      "Pendleton's Rules, SBI Model, Johari Window, feedback timing, praise in public and correct in private.",
  },
  {
    id: 4,
    title: 'Building trust & the mentoring relationship',
    icon: Handshake,
    description:
      'Relationship lifecycle, psychological safety (Edmondson), confidentiality, mentoring agreements, role modelling.',
  },
];

export default function MDModule2() {
  useSEO({
    title: "Module 2: The mentor's toolkit | Mentoring & developing others | Elec-Mate",
    description:
      'The GROW model, questioning techniques, giving effective feedback, building trust and the mentoring relationship.',
  });

  return (
    <ModuleShell
      backTo="../mentoring-developing-others"
      backLabel="Mentoring & developing others"
      moduleNumber={2}
      title="The mentor's toolkit"
      description="Practical tools and techniques for effective mentoring — coaching conversations, questioning, feedback, and building trust on site."
      tone="indigo"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../md-module-1"
      prevModuleLabel="How people learn"
      nextModuleHref="../md-module-3"
      nextModuleLabel="Supporting apprentices"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../md-module-2-section-${section.id}`}
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
