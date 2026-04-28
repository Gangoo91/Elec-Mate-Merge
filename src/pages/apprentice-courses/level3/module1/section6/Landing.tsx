/**
 * Module 1 · Section 6 — Landing
 * City & Guilds 2365-03 / Unit 201 — Health & Safety
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield, UserCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 6 — Professional responsibilities | Level 3 Module 1.6 | Elec-Mate';
const DESCRIPTION =
  'Ethical obligations, professional standards and duty of care in electrical work.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Building Safety Act 2022 - HRRBs and dutyholders',
    description: 'L3 deeper on BSA 2022 - HRRB definition, in-occupation duty holders (PAP / AP / RP), Building Safety Regulator gateways, and the operational impact on electrical contractors.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module1-section6-1',
  },
  {
    number: 'Subsection 2',
    title: 'HRRB dutyholder responsibilities and the safety case',
    description: 'L3 deeper on PAP duties, the safety case, golden thread requirements and the L3 contractor representative role on HRRB sites.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module1-section6-2',
  },
  {
    number: 'Subsection 3',
    title: 'Approved Documents B / L / P interactions',
    description: 'L3 Approved Documents B (fire), L (energy efficiency), P (electrical safety) interactions with electrical work in dwellings.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module1-section6-3',
  },
  {
    number: 'Subsection 4',
    title: 'Asbestos CAR 2012: supervisor escalation in detail',
    description: 'L3 deeper on CAR 2012 - the licensed-vs-non-licensed boundary in detail, refurbishment surveys, supervisor escalation chain, NNLW notification requirements.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module1-section6-4',
  },
  {
    number: 'Subsection 5',
    title: 'Confined Spaces 1997: supervisor view',
    description: 'L3 supervisor view of Confined Spaces Regulations 1997 - permit regime, atmosphere monitoring, rescue planning and the supervisor judgement.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module1-section6-5',
  },
  {
    number: 'Subsection 6',
    title: 'Equality Act 2010 + near-miss culture',
    description: 'L3 closing topics - Equality Act 2010 reasonable adjustments, PEEPs, and the L3 supervisor role in building near-miss culture.',
    icon: UserCheck,
    href: '/study-centre/apprentice/level3-module1-section6-6',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={6}
      title="Professional responsibilities"
      description="Ethical obligations, professional standards and duty of care in electrical work."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module1-section5"
      prevSectionLabel="Section 5"
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
