/**
 * Module 6 · Section 3 — Landing
 * City & Guilds 2365-03 / Unit 305 — Electrical Systems Design
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 3 — Selection of protective devices and equipment | Level 3 Module 6.3 | Elec-Mate';
const DESCRIPTION =
  'Choosing appropriate protective devices, equipment and accessories for electrical installations.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Design current Ib',
    description: 'Calculating the design current Ib for any final circuit.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module6-section3-1',
  },
  {
    number: 'Subsection 2',
    title: 'Protective device selection',
    description: 'Selecting the right protective device for a circuit.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module6-section3-2',
  },
  {
    number: 'Subsection 3',
    title: 'AFDD design considerations',
    description: 'Arc Fault Detection Device design — what AFDDs do, where Reg 421.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module6-section3-3',
  },
  {
    number: 'Subsection 4',
    title: 'SPD selection (Type 1 / 2 / 3)',
    description: 'Surge protective device design — BS EN 61643 product standard, Section 443 risk-based selection, Section 534 installation rules.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module6-section3-4',
  },
  {
    number: 'Subsection 5',
    title: 'Synthesis worked example',
    description: 'Synthesis worked example — domestic CU upgrade with EV charger, solar PV and 8 kW air-source heat pump.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module6-section3-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={3}
      title="Selection of protective devices and equipment"
      description="Choosing appropriate protective devices, equipment and accessories for electrical installations."
      tone="amber"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module6-section2"
      prevSectionLabel="Section 2"
      nextSectionHref="/study-centre/apprentice/level3-module6-section4"
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
