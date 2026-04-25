import { CloudRain, Cloud, Flame, HeartHandshake } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Understanding depression',
    icon: CloudRain,
    description:
      'Clinical depression vs low mood, types, symptoms (emotional, physical, cognitive, behavioural), risk factors, NICE guidelines.',
  },
  {
    id: 2,
    title: 'Anxiety disorders',
    icon: Cloud,
    description:
      'GAD, panic disorder, social anxiety, phobias, OCD, PTSD, fight-flight-freeze response, physical symptoms.',
  },
  {
    id: 3,
    title: 'Stress & burnout',
    icon: Flame,
    description:
      'HSE stress definition, acute vs chronic stress, the Maslach burnout model, stress in construction, risk assessment.',
  },
  {
    id: 4,
    title: 'Supporting someone with depression or anxiety',
    icon: HeartHandshake,
    description:
      'ALGEE in practice, what to say and what not to say, encouraging professional help, GP referral, talking therapies.',
  },
];

export default function MentalHealthModule2() {
  useSEO({
    title: 'Module 2: Depression, anxiety & stress | Mental Health First Aid | Elec-Mate',
    description:
      'Recognising depression, anxiety disorders, workplace stress and burnout, and supporting colleagues effectively.',
  });

  return (
    <ModuleShell
      backTo="../mental-health-course"
      backLabel="Mental Health First Aid"
      moduleNumber={2}
      title="Depression, anxiety & stress"
      description="Recognising the most common mental health conditions in the workplace, understanding their impact and learning how to provide effective support."
      tone="purple"
      sectionsCount={sections.length}
      duration="45 mins"
      prevModuleHref="../mental-health-module-1"
      prevModuleLabel="Understanding mental health & the MHFA role"
      nextModuleHref="../mental-health-module-3"
      nextModuleLabel="Substance misuse, self-harm & suicide"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../mental-health-module-2-section-${section.id}`}
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
