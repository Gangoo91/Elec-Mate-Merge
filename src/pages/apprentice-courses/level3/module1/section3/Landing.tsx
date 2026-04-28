/**
 * Module 1 · Section 3 — Landing
 * City & Guilds 2365-03 / Unit 201 — Health & Safety
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield, UserCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 3 — Electrical safety in the workplace | Level 3 Module 1.3 | Elec-Mate';
const DESCRIPTION =
  'Workplace electrical safety protocols, procedures and emergency response.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Risk assessment as a supervisor',
    description: 'L3 risk assessment depth — moving from L2 RAMS-following to L3 RAMS-reviewing, dynamic-assessment sign-off and the supervisor judgement on when the static RAMS no longer fits.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module1-section3-1',
  },
  {
    number: 'Subsection 2',
    title: 'PPE hierarchy of control',
    description: 'L3 PPE hierarchy depth — eliminate / substitute / engineer / administer / PPE.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module1-section3-2',
  },
  {
    number: 'Subsection 3',
    title: 'PPE selection and verification',
    description: 'L3 PPE selection — matching kit to hazard, EN standards, fit, expiry, replacement schedules and the supervisor verification routine.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module1-section3-3',
  },
  {
    number: 'Subsection 4',
    title: 'First-aid facilities and supervision',
    description: 'L3 first-aid provision — what\\',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module1-section3-4',
  },
  {
    number: 'Subsection 5',
    title: 'Safe practices and procedures: supervision',
    description: 'L3 supervision of safe practices — toolbox talks, RAMS sign-off, observation, intervention, near-miss culture and the supervisor running the safety system.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module1-section3-5',
  },
  {
    number: 'Subsection 6',
    title: 'Safe isolation supervision and EAWR Reg 13',
    description: 'L3 supervision of safe isolation — auditing the L2 procedure, EAWR Reg 13 implications, and what happens (legally and practically) when isolation goes wrong.',
    icon: UserCheck,
    href: '/study-centre/apprentice/level3-module1-section3-6',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={3}
      title="Electrical safety in the workplace"
      description="Workplace electrical safety protocols, procedures and emergency response."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module1-section2"
      prevSectionLabel="Section 2"
      nextSectionHref="/study-centre/apprentice/level3-module1-section4"
      nextSectionLabel="Section 4"
    >
      {subsections.map((s, idx) => (
        <ModuleCard
          key={idx}
          number={s.number}
          title={s.title}
          description={s.description}
          icon={s.icon}
          href={s.href}
        />
      ))}
    </SectionShell>
  );
}
