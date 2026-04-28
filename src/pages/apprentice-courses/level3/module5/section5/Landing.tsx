/**
 * Module 5 · Section 5 — Landing
 * City & Guilds 2365-03 / Unit 304 — Inspection, Testing & Commissioning
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 5 — Certification and reporting | Level 3 Module 5.5 | Elec-Mate';
const DESCRIPTION =
  'Certification requirements, documentation and legal responsibilities for electrical work.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Periodic inspection (EICR) purpose and framework',
    description: 'Why periodic inspection and testing exists, where the EICR sits in the legal and regulatory framework — Electricity at Work Regulations 1989, BS 7671 Part 6 (CENELEC-aligned in A4:2026), GN3, ESF/Best Practice Guide…',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module5-section5-1',
  },
  {
    number: 'Subsection 2',
    title: 'EICR coding rubric: C1, C2, C3, FI',
    description: 'The defensible coding framework for EICR observations — C1 immediate danger, C2 potentially dangerous, C3 improvement recommended, FI further investigation.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module5-section5-2',
  },
  {
    number: 'Subsection 3',
    title: 'EICR sampling and scope agreement',
    description: 'Negotiating an EICR scope with the customer, agreeing sampling percentages, recording limitations, and defending the sampling decisions on the report.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module5-section5-3',
  },
  {
    number: 'Subsection 4',
    title: 'EICR reporting, customer comms,',
    description: 'Writing the EICR for the duty holder, briefing the customer face-to-face, and sequencing remedial works into a defensible priority order.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module5-section5-4',
  },
  {
    number: 'Subsection 5',
    title: 'EICR vs Initial Verification,',
    description: 'The legal and technical contrast between Initial Verification and Periodic Inspection — frequency tables per ESF guidance, the underlying logic, and the statutory landlord duty under the Electrical Safety Standards…',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module5-section5-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={5}
      title="Certification and reporting"
      description="Certification requirements, documentation and legal responsibilities for electrical work."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module5-section4"
      prevSectionLabel="Section 4"
      nextSectionHref="/study-centre/apprentice/level3-module5-section6"
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
