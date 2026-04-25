import { Wine, Scissors, AlertTriangle, Phone } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Substance misuse & addiction',
    icon: Wine,
    description:
      'Alcohol and drug misuse, substance use in construction, signs at work, dual diagnosis, approaching someone.',
  },
  {
    id: 2,
    title: 'Self-harm',
    icon: Scissors,
    description:
      'Understanding self-harm, types and prevalence, how to respond, first aid for injuries, long-term support pathways.',
  },
  {
    id: 3,
    title: 'Suicide awareness & prevention',
    icon: AlertTriangle,
    description:
      'UK statistics, construction industry rates, risk factors, warning signs, safe messaging, means restriction.',
  },
  {
    id: 4,
    title: 'Suicide first aid & crisis response',
    icon: Phone,
    description:
      'Asking about suicide directly, the TASC model, safety planning, calling 999, helplines, post-crisis support.',
  },
];

export default function MentalHealthModule3() {
  useSEO({
    title: 'Module 3: Substance misuse, self-harm & suicide | Mental Health First Aid | Elec-Mate',
    description:
      'Substance misuse and addiction, self-harm awareness, suicide prevention, crisis intervention and support pathways.',
  });

  return (
    <ModuleShell
      backTo="../mental-health-course"
      backLabel="Mental Health First Aid"
      moduleNumber={3}
      title="Substance misuse, self-harm & suicide"
      description="Recognising substance misuse, understanding self-harm, suicide awareness and prevention, and crisis intervention skills."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../mental-health-module-2"
      prevModuleLabel="Depression, anxiety & stress"
      nextModuleHref="../mental-health-module-4"
      nextModuleLabel="Psychosis, eating disorders & complex needs"
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
