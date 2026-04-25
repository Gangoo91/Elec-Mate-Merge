import { Thermometer, HeartPulse, Brain, Zap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Heart attack, angina & stroke',
    icon: HeartPulse,
    description:
      'Heart attack recognition and treatment, aspirin administration, angina comparison, FAST stroke test and time-critical treatment.',
  },
  {
    id: 2,
    title: 'Seizures, diabetes & anaphylaxis',
    icon: Brain,
    description:
      'Tonic-clonic seizure management, status epilepticus, hypoglycaemia, hyperglycaemia, diabetic emergencies and severe allergic reactions.',
  },
  {
    id: 3,
    title: 'Electric shock & electrical injuries',
    icon: Zap,
    description:
      'Scene safety for electrical incidents, high vs low voltage response, HSE poster, electrical burns and cardiac monitoring.',
  },
  {
    id: 4,
    title: 'Heat exhaustion, heat stroke & hypothermia',
    icon: Thermometer,
    description:
      'Heat exhaustion treatment, heat stroke emergency response, hypothermia recognition and rewarming, frostbite and site considerations.',
  },
];

export default function FirstAidModule4() {
  useSEO({
    title: 'Module 4: Medical emergencies & environmental conditions | First Aid at Work',
    description:
      'Heart attack, stroke, seizures, diabetic emergencies, electric shock, heat illness and hypothermia management for first aiders.',
  });

  return (
    <ModuleShell
      backTo="../first-aid-course"
      backLabel="First aid at work"
      moduleNumber={4}
      title="Medical emergencies & environmental conditions"
      description="Responding to cardiac events, neurological emergencies, electrical injuries and temperature-related conditions on site."
      tone="red"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../first-aid-module-3"
      prevModuleLabel="Bleeding, burns & shock"
      nextModuleHref="../first-aid-module-5"
      nextModuleLabel="Injuries, specific conditions & workplace protocol"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../first-aid-module-4-section-${section.id}`}
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
