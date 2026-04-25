import { Heart, Signpost, RefreshCw, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Mental health first aid in action',
    icon: Heart,
    description:
      'The MHFA action plan, immediate support techniques, and knowing your role and limits.',
  },
  {
    id: 2,
    title: 'Signposting to professional help',
    icon: Signpost,
    description: 'NHS services, GPs, EAPs, Samaritans, Mates in Mind, and the Lighthouse Club.',
  },
  {
    id: 3,
    title: 'Supporting recovery and return to work',
    icon: RefreshCw,
    description:
      'Reasonable adjustments, phased returns, ongoing check-ins, and avoiding assumptions.',
  },
  {
    id: 4,
    title: 'Looking after yourself as a supporter',
    icon: Shield,
    description:
      'Compassion fatigue, setting boundaries, recognising your own limits, and self-care.',
  },
];

export default function MentalHealthModule4() {
  useSEO({
    title: 'Module 4: Supporting others | Mental health awareness | Elec-Mate',
    description:
      'Mental health first aid, signposting to help, supporting recovery, and looking after yourself.',
  });

  return (
    <ModuleShell
      backTo="../mental-health-awareness"
      backLabel="Mental health awareness"
      moduleNumber={4}
      title="Supporting others"
      description="How to provide immediate support, signpost to professional help, support someone's recovery, and protect your own wellbeing."
      tone="purple"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../mental-health-module-3"
      prevModuleLabel="Starting conversations"
      nextModuleHref="../mental-health-module-5"
      nextModuleLabel="Creating a mentally healthy workplace"
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
