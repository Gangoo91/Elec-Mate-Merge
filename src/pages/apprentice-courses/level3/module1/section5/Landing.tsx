/**
 * Module 1 · Section 5 — Landing
 * City & Guilds 2365-03 / Unit 201 — Health & Safety
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield, UserCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 5 — Safety management systems | Level 3 Module 1.5 | Elec-Mate';
const DESCRIPTION =
  'Development and implementation of comprehensive safety management systems.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Dutyholder responsibilities — the L3 view',
    description: 'L3 dutyholder depth — multiple parallel duties stacked on different parties, who carries what, escalation when the chain fails.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module1-section5-1',
  },
  {
    number: 'Subsection 2',
    title: 'CDM 2015: apprentice transition Worker → Contractor',
    description: 'L3 transition under CDM 2015 — from Reg 15 worker (L2) to Reg 9 contractor representative (L3).',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module1-section5-2',
  },
  {
    number: 'Subsection 3',
    title: 'HSE Sentencing Council Definitive Guideline',
    description: 'L3 depth on the 2016 Sentencing Council guideline — culpability x harm x turnover matrix; corporate fines and personal sentences.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module1-section5-3',
  },
  {
    number: 'Subsection 4',
    title: 'RIDDOR specified injuries: depth',
    description: 'L3 deep-dive on RIDDOR Schedule 1 specified injuries — fractures, amputations, sight loss, crush, burns, scalping, unconsciousness, enclosed-space.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module1-section5-4',
  },
  {
    number: 'Subsection 5',
    title: 'Risk assessment AS A SUPERVISOR',
    description: 'L3 supervisor RA judgement — beyond compliance, the suitable-and-sufficient test, dynamic-vs-static, escalation when RAMS no longer fits, contributing to firm RAMS process.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module1-section5-5',
  },
  {
    number: 'Subsection 6',
    title: 'Legal vs commercial implications',
    description: 'L3 supervisor judgement on the priority when legal duty conflicts with commercial pressure.',
    icon: UserCheck,
    href: '/study-centre/apprentice/level3-module1-section5-6',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={5}
      title="Safety management systems"
      description="Development and implementation of comprehensive safety management systems."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module1-section4"
      prevSectionLabel="Section 4"
      nextSectionHref="/study-centre/apprentice/level3-module1-section6"
      nextSectionLabel="Section 6"
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
