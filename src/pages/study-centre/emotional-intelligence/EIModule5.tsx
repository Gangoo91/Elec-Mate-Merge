import { MessageCircle, Swords, Crown, ClipboardList } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Communication & influence',
    icon: MessageCircle,
    description:
      "Assertive communication, DESC model, EI in written communication, influence without authority, Cialdini's principles.",
  },
  {
    id: 2,
    title: 'Conflict management & teamwork',
    icon: Swords,
    description:
      "Thomas-Kilmann model, Lencioni's fear of conflict, de-escalation, psychological safety, ACAS principles.",
  },
  {
    id: 3,
    title: 'Leadership through EI',
    icon: Crown,
    description:
      "Goleman's six leadership styles, resonant vs dissonant leadership, servant leadership through EI lens.",
  },
  {
    id: 4,
    title: 'Your EI development plan',
    icon: ClipboardList,
    description:
      'Intentional Change Theory, SMART goals for each domain, accountability structures, 90-day plan template.',
  },
];

export default function EIModule5() {
  useSEO({
    title: 'Module 5: Social Skills & Applying EI | Emotional Intelligence | Elec-Mate',
    description:
      'Communication and influence, conflict management, leadership through emotional intelligence, and building your personal EI development plan.',
  });

  return (
    <ModuleShell
      backTo="../emotional-intelligence"
      backLabel="Emotional intelligence"
      moduleNumber={5}
      title="Social skills & applying EI"
      description="Communication and influence, conflict management, leadership through emotional intelligence, and building your personal EI development plan."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../ei-module-4"
      prevModuleLabel="Motivation & empathy"
      nextModuleHref="../ei-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ei-module-5-section-${section.id}`}
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
