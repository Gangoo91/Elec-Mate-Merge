import { Droplets, Scissors, Flame, Activity } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Severe bleeding & haemorrhage control',
    icon: Droplets,
    description:
      'Types of bleeding, direct pressure, haemostatic dressings, tourniquet use, catastrophic bleeding C-ABC and amputations.',
  },
  {
    id: 2,
    title: 'Wound management & infection prevention',
    icon: Scissors,
    description:
      'Minor wound care, embedded objects, abdominal and chest wounds, scalp wounds, dressing types and cross-contamination prevention.',
  },
  {
    id: 3,
    title: 'Burns, scalds & electrical burns',
    icon: Flame,
    description:
      'Burn depth assessment, cooling technique, chemical burns, electrical burns, Rule of Nines and what NOT to do.',
  },
  {
    id: 4,
    title: 'Shock & anaphylaxis',
    icon: Activity,
    description:
      'Shock types and recognition, treatment principles, anaphylaxis, adrenaline auto-injectors, EpiPen and Jext administration.',
  },
];

export default function FirstAidModule3() {
  useSEO({
    title: 'Module 3: Bleeding, burns & shock | First Aid at Work',
    description:
      'Haemorrhage control, wound management, burns treatment, shock recognition and anaphylaxis management for first aiders.',
  });

  return (
    <ModuleShell
      backTo="../first-aid-course"
      backLabel="First aid at work"
      moduleNumber={3}
      title="Bleeding, burns & shock"
      description="Managing severe bleeding, wound care, burn treatment, and recognising and treating shock including anaphylaxis."
      tone="red"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../first-aid-module-2"
      prevModuleLabel="Life-threatening emergencies — CPR, AED & choking"
      nextModuleHref="../first-aid-module-4"
      nextModuleLabel="Medical emergencies & environmental conditions"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../first-aid-module-3-section-${section.id}`}
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
