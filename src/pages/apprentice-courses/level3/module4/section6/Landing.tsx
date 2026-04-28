/**
 * Module 4 · Section 6 — Landing
 * City & Guilds 2365-03 / Unit 303 — Fault Diagnosis
 */

import { AlertTriangle, ClipboardCheck, FileText, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 6 — Professional practice in fault work | Level 3 Module 4.6 | Elec-Mate';
const DESCRIPTION =
  'Client communication, working under pressure, costing and professional standards.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Preparation for fault correction',
    description: 'How the L3 apprentice reads the as-built drawings, the EICR / Schedule of Test Results, the manufacturer data sheet, the IET Code of Practice 5th edition and IET Guidance Note 3 BEFORE the van is loaded — so the…',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module4-section6-1',
  },
  {
    number: 'Subsection 2',
    title: 'Apply correction techniques to common faults',
    description: 'L3 fault correction techniques on the four most common domestic / small-commercial circuits — ring final (broken ring, HRJ, R1+R2 anomaly), lighting (failed driver, two-way wiring fault), immersion / shower…',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module4-section6-2',
  },
  {
    number: 'Subsection 3',
    title: 'Apply techniques to specialised systems',
    description: 'L3 apprentice scope on specialised systems — three-phase distribution boards (Hager Sollysta, Schneider Resi9 3P), single-phase motor controls (DOL starters, contactors), EV charging (BS 7671 722, A4:2026 PNB / Open…',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module4-section6-3',
  },
  {
    number: 'Subsection 4',
    title: 'Capstone case + reflective practice',
    description: 'Multi-fault case study walking the full Unit 303 framework — H&S, instruments, fault types, logical diagnosis, rectification, documentation — followed by the reflective-practice discipline (Kolb cycle / After Action…',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module4-section6-4',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={6}
      title="Professional practice in fault work"
      description="Client communication, working under pressure, costing and professional standards."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module4-section5"
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
