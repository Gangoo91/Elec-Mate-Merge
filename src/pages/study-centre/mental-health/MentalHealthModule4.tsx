import { Eye, UtensilsCrossed, Heart, ShieldAlert } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Psychosis & schizophrenia',
    icon: Eye,
    description:
      'Hallucinations, delusions, disordered thinking, first episode psychosis, drug-induced psychosis, how to support safely.',
  },
  {
    id: 2,
    title: 'Eating disorders',
    icon: UtensilsCrossed,
    description:
      'Anorexia, bulimia, binge eating disorder, OSFED, male prevalence, physical risks, workplace recognition, BEAT helpline.',
  },
  {
    id: 3,
    title: 'Personality disorders & complex needs',
    icon: Heart,
    description:
      'BPD/EUPD, emotional dysregulation, trauma-informed approach, validation, consistency, boundaries, specialist support.',
  },
  {
    id: 4,
    title: 'Trauma, PTSD & adverse experiences',
    icon: ShieldAlert,
    description:
      'Trauma types, PTSD symptoms, complex PTSD, trauma in construction, trauma-informed approach, EMDR and trauma-focused CBT.',
  },
];

export default function MentalHealthModule4() {
  useSEO({
    title: 'Module 4: Psychosis, eating disorders & complex needs | Mental Health First Aid | Elec-Mate',
    description:
      'Understanding psychosis, eating disorders, personality disorders, trauma and PTSD in workplace settings.',
  });

  return (
    <ModuleShell
      backTo="../mental-health-course"
      backLabel="Mental Health First Aid"
      moduleNumber={4}
      title="Psychosis, eating disorders & complex needs"
      description="Understanding less common but serious mental health conditions, trauma responses and how to provide appropriate support."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../mental-health-module-3"
      prevModuleLabel="Substance misuse, self-harm & suicide"
      nextModuleHref="../mental-health-module-5"
      nextModuleLabel="Workplace implementation & wellbeing"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../mental-health-module-4-section-${section.id}`}
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
