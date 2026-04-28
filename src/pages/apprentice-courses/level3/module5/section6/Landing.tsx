/**
 * Module 5 · Section 6 — Landing
 * City & Guilds 2365-03 / Unit 304 — Inspection, Testing & Commissioning
 */

import { AlertTriangle, ClipboardCheck, FileText, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 6 — Faults found during testing | Level 3 Module 5.6 | Elec-Mate';
const DESCRIPTION =
  'Procedures for dealing with faults discovered during testing and inspection.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'EIC issue + certificate types: EIC vs MWC vs EICR',
    description: 'Section 644 certification framework — when to issue an EIC, when an MEIWC suffices, when an EICR applies.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module5-section6-1',
  },
  {
    number: 'Subsection 2',
    title: 'Customer handover pack and scheme upload',
    description: 'The handover pack composition for a domestic CU swap — EIC trio, Building Control Compliance Certificate, operational instructions, as-built records, manuals — plus the Competent Person Scheme upload routes (NICEIC,…',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module5-section6-2',
  },
  {
    number: 'Subsection 3',
    title: 'Commissioning paperwork chain',
    description: 'The commissioning documentation chain — designer to installer to tester to certifier to customer.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module5-section6-3',
  },
  {
    number: 'Subsection 4',
    title: 'EAWR, Building Regs reportable work, LABC vs CPS routes',
    description: 'The legal framework underneath the EIC — EAWR 1989 workplace electrical safety duty, Building Regulations Part P notifiable work scope (England), and the choice between CPS self-certification (NICEIC, NAPIT, ELECSA)…',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module5-section6-4',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={6}
      title="Faults found during testing"
      description="Procedures for dealing with faults discovered during testing and inspection."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module5-section5"
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
