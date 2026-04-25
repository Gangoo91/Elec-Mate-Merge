import { Bone, Brain, FlaskConical, Users } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Fractures, dislocations & soft tissue injuries',
    icon: Bone,
    description:
      'Open vs closed fractures, recognition, immobilisation, slings, splinting, sprains and strains, and when to call 999.',
  },
  {
    id: 2,
    title: 'Head injuries, spinal injuries & eye injuries',
    icon: Brain,
    description:
      'Head injury red flags, concussion, spinal immobilisation, cervical collar use, eye foreign objects and chemical splash management.',
  },
  {
    id: 3,
    title: 'Poisoning, COSHH & hazardous substances',
    icon: FlaskConical,
    description:
      'COSHH Regulations 2002, Safety Data Sheets, ingestion/inhalation/skin contact, carbon monoxide and site-specific hazards for electricians.',
  },
  {
    id: 4,
    title: 'Mental health crises, communication & first aider wellbeing',
    icon: Users,
    description:
      'Mental health emergencies on site, communication skills, barriers to seeking help, critical incident stress, self-care and debriefing.',
  },
];

export default function FirstAidModule5() {
  useSEO({
    title: 'Module 5: Injuries, specific conditions & workplace protocol | First Aid at Work',
    description:
      'Fractures, head and spinal injuries, poisoning, COSHH, mental health crises and first aider wellbeing for workplace first aiders.',
  });

  return (
    <ModuleShell
      backTo="../first-aid-course"
      backLabel="First aid at work"
      moduleNumber={5}
      title="Injuries, specific conditions & workplace protocol"
      description="Managing musculoskeletal injuries, head and spinal trauma, hazardous substances, and supporting mental health on site."
      tone="red"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../first-aid-module-4"
      prevModuleLabel="Medical emergencies & environmental conditions"
      nextModuleHref="../first-aid-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../first-aid-module-5-section-${section.id}`}
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
