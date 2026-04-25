import { HeartPulse, Zap, RotateCcw, AlertTriangle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Cardiac arrest & CPR',
    icon: HeartPulse,
    description:
      'Chain of survival, recognising cardiac arrest, adult CPR 30:2 ratio, compression rate and depth, compression-only CPR and agonal breathing.',
  },
  {
    id: 2,
    title: 'Using an automated external defibrillator (AED)',
    icon: Zap,
    description:
      'How AEDs work, pad placement, shockable vs non-shockable rhythms, special circumstances and public access defibrillators.',
  },
  {
    id: 3,
    title: 'Unconsciousness & the recovery position',
    icon: RotateCcw,
    description:
      'Causes of unconsciousness, AVPU scale, recovery position technique, monitoring, fainting and vasovagal syncope.',
  },
  {
    id: 4,
    title: 'Choking management',
    icon: AlertTriangle,
    description:
      'Recognising choking, mild vs severe obstruction, back blows, abdominal thrusts, unconscious choking and post-choking review.',
  },
];

export default function FirstAidModule2() {
  useSEO({
    title: 'Module 2: Life-threatening emergencies — CPR, AED & choking | First Aid at Work',
    description:
      'CPR technique, AED usage, recovery position and choking management for first aiders in the workplace.',
  });

  return (
    <ModuleShell
      backTo="../first-aid-course"
      backLabel="First aid at work"
      moduleNumber={2}
      title="Life-threatening emergencies — CPR, AED & choking"
      description="The skills to manage the most critical emergencies: cardiac arrest, unconsciousness and airway obstruction."
      tone="red"
      sectionsCount={sections.length}
      duration="45 mins"
      prevModuleHref="../first-aid-module-1"
      prevModuleLabel="The first aider's role, legislation & assessment"
      nextModuleHref="../first-aid-module-3"
      nextModuleLabel="Bleeding, burns & shock"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../first-aid-module-2-section-${section.id}`}
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
