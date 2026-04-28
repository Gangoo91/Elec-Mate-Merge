/**
 * Module 6 · Section 6 — Landing
 * City & Guilds 2365-03 / Unit 305 — Electrical Systems Design
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 6 — Verification of design | Level 3 Module 6.6 | Elec-Mate';
const DESCRIPTION =
  'Checking and verifying electrical system designs for compliance and performance.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Single-line schematic (SLD) production',
    description: 'The SLD is the spine of the design pack.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module6-section6-1',
  },
  {
    number: 'Subsection 2',
    title: 'Schedules of accessories, cables, lighting and circuit charts',
    description: 'The four core schedules of a UK design pack — accessories, cables, luminaires and per-DB circuit charts — and how each links back to the SLD and to BS 7671 Reg 514.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module6-section6-2',
  },
  {
    number: 'Subsection 3',
    title: 'RFI workflow + designer-installer-tester chain accountability',
    description: 'The Request For Information lifecycle and the designer-installer-tester chain of accountability that keeps BS 7671 Reg 132 (design), Reg 134.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module6-section6-3',
  },
  {
    number: 'Subsection 4',
    title: 'BIM models + AutoCAD / Revit / Trimble overview for L3 designer',
    description: 'Digital tooling literacy for the L3 designer — what BIM is, how AutoCAD, Revit and Trimble Stabicad fit, BS EN ISO 19650 information management, CDE platforms and IFC exchange.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module6-section6-4',
  },
  {
    number: 'Subsection 5',
    title: 'Design package handover + as-installed updates + golden thread (BSA 2022)',
    description: 'Closeout of Section 6.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module6-section6-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={6}
      title="Verification of design"
      description="Checking and verifying electrical system designs for compliance and performance."
      tone="amber"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module6-section5"
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
