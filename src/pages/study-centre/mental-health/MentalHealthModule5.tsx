import { Building2, Signpost, Sparkles, ShieldCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Implementing MHFA in the workplace',
    icon: Building2,
    description:
      'Creating an MHFA programme, visibility, management buy-in, Thriving at Work core standards, measuring impact.',
  },
  {
    id: 2,
    title: 'Signposting & support services',
    icon: Signpost,
    description:
      'NHS Talking Therapies, GP pathway, crisis services, Samaritans, CALM, Mates in Mind, Lighthouse Club, EAPs.',
  },
  {
    id: 3,
    title: 'Building a mentally healthy workplace',
    icon: Sparkles,
    description:
      'Five Ways to Wellbeing, mental health policies, toolbox talks, promoting openness, reducing presenteeism.',
  },
  {
    id: 4,
    title: 'Self-care for the Mental Health First Aider',
    icon: ShieldCheck,
    description:
      'Compassion fatigue, vicarious trauma, setting boundaries, supervision, personal resilience, reflective practice.',
  },
];

export default function MentalHealthModule5() {
  useSEO({
    title: 'Module 5: Workplace implementation & wellbeing | Mental Health First Aid | Elec-Mate',
    description:
      'Implementing MHFA programmes, signposting support services, building healthy workplaces and self-care strategies.',
  });

  return (
    <ModuleShell
      backTo="../mental-health-course"
      backLabel="Mental Health First Aid"
      moduleNumber={5}
      title="Workplace implementation & wellbeing"
      description="Putting mental health first aid into practice — workplace programmes, signposting services, building healthy cultures and looking after yourself."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../mental-health-module-4"
      prevModuleLabel="Psychosis, eating disorders & complex needs"
      nextModuleHref="../mental-health-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../mental-health-module-5-section-${section.id}`}
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
