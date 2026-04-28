/**
 * Module 6 · Section 4 — Landing
 * City & Guilds 2365-03 / Unit 305 — Electrical Systems Design
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield, UserCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 4 — Designing for special installations and locations | Level 3 Module 6.4 | Elec-Mate';
const DESCRIPTION =
  'Design considerations for special locations and installations with specific requirements.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Current-carrying capacity (CCC) and the Appendix 4 method',
    description: 'How BS 7671 Appendix 4 (and the IET On-Site Guide) actually work.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module6-section4-1',
  },
  {
    number: 'Subsection 2',
    title: 'Reference Methods (A\\u2013G and 100\\u2013103)',
    description: 'The BS 7671 install-method catalogue.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module6-section4-2',
  },
  {
    number: 'Subsection 3',
    title: 'Correction factors Ca, Cg, Ci deep',
    description: 'Each derate factor in detail.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module6-section4-3',
  },
  {
    number: 'Subsection 4',
    title: 'Voltage drop design (mV/A/m method)',
    description: 'The voltage-drop gate end to end.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module6-section4-4',
  },
  {
    number: 'Subsection 5',
    title: 'Thermal constraint t < kS²/I² (the adiabatic gate)',
    description: 'The adiabatic gate for the protective conductor.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module6-section4-5',
  },
  {
    number: 'Subsection 6',
    title: 'Cable selection synthesis (full design example)',
    description: 'A capstone worked example.',
    icon: UserCheck,
    href: '/study-centre/apprentice/level3-module6-section4-6',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={4}
      title="Designing for special installations and locations"
      description="Design considerations for special locations and installations with specific requirements."
      tone="amber"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module6-section3"
      prevSectionLabel="Section 3"
      nextSectionHref="/study-centre/apprentice/level3-module6-section5"
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
