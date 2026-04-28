/**
 * Module 5 · Section 4 — Landing
 * City & Guilds 2365-03 / Unit 304 — Inspection, Testing & Commissioning
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 4 — Commissioning of installations | Level 3 Module 5.4 | Elec-Mate';
const DESCRIPTION =
  'Safe energisation, functional testing and commissioning procedures for electrical installations.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Zs measurement (3-lead and 2-lead)',
    description: 'Zs measurement per BS 7671 Reg 643.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module5-section4-1',
  },
  {
    number: 'Subsection 2',
    title: 'Earth Fault Loop Impedance (Zs) — methods and techniques',
    description: 'Zs measurement deep dive — no-trip / low-current technique vs full trip-current technique, the GN3 touch-voltage safety guidance during EFLI tests, instrument range and resolution per BS EN 61557-3, fused test leads,…',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module5-section4-2',
  },
  {
    number: 'Subsection 3',
    title: 'RCD trip-time testing per A4:2026',
    description: 'A4:2026 Reg 643.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module5-section4-3',
  },
  {
    number: 'Subsection 4',
    title: 'AFDD test sequence + manufacturer test button protocol',
    description: 'AFDD verification — Reg 421.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module5-section4-4',
  },
  {
    number: 'Subsection 5',
    title: 'Prospective Fault Current (PFC) + PSCC + voltage drop',
    description: 'Prospective Fault Current (PFC) measurement at the supply origin — PEFC from L-E loop and PSCC from L-N loop, the higher reported as Ipf for protective device breaking-capacity check.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module5-section4-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={4}
      title="Commissioning of installations"
      description="Safe energisation, functional testing and commissioning procedures for electrical installations."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module5-section3"
      prevSectionLabel="Section 3"
      nextSectionHref="/study-centre/apprentice/level3-module5-section5"
      nextSectionLabel="Section 5"
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
