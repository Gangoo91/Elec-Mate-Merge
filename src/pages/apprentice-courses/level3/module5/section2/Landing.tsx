/**
 * Module 5 · Section 2 — Landing
 * City & Guilds 2365-03 / Unit 304 — Inspection, Testing & Commissioning
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 2 — Inspection procedures | Level 3 Module 5.2 | Elec-Mate';
const DESCRIPTION =
  'Detailed visual inspection procedures for electrical installations and systems.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Visual inspection: scope, sequence and the Schedule of Inspections',
    description: 'Reg 642.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module5-section2-1',
  },
  {
    number: 'Subsection 2',
    title: 'Earthing and bonding inspection',
    description: 'Visual inspection of the earthing and bonding arrangement — Table 54.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module5-section2-2',
  },
  {
    number: 'Subsection 3',
    title: 'Protective device inspection',
    description: 'Visual inspection of overcurrent devices, RCDs, AFDDs and SPDs — device type vs duty, breaking capacity vs PFC, RCD types AC/A/F/B, A4:2026 AFDD recommendation under Reg 421.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module5-section2-3',
  },
  {
    number: 'Subsection 4',
    title: 'Cable installation inspection',
    description: 'Visual inspection of cables — selection, sizing, routing in safe zones (Reg 522.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module5-section2-4',
  },
  {
    number: 'Subsection 5',
    title: 'Special locations visual checks',
    description: 'Visual inspection additions for Part 7 special locations — bathrooms (701), pools (702), saunas (703), construction sites (704), agricultural (705), exhibitions (711), solar PV (712), EV charging (722).',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module5-section2-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={2}
      title="Inspection procedures"
      description="Detailed visual inspection procedures for electrical installations and systems."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module5-section1"
      prevSectionLabel="Section 1"
      nextSectionHref="/study-centre/apprentice/level3-module5-section3"
      nextSectionLabel="Section 3"
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
