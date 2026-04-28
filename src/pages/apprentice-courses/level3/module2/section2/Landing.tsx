/**
 * Module 2 · Section 2 — Landing
 * City & Guilds 2365-03 / Unit 301 — Environmental Technology
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 2 — Energy efficiency in electrical installations | Level 3 Module 2.2 | Elec-Mate';
const DESCRIPTION =
  'Techniques and technologies for improving energy efficiency in electrical systems.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'BS 7671 Section 712 (PV) deeper',
    description: 'BS 7671 Section 712 covering solar PV power supply systems at recognition level for the L3 electrician — DC isolation, string and array architecture, A4:2026 changes, the relationship with Section 826 (storage) on…',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module2-section2-1',
  },
  {
    number: 'Subsection 2',
    title: 'BS 7671 Section 722 (EV) deeper',
    description: 'BS 7671 Section 722 covering EV charging installations at recognition level for the L3 electrician — PEN-fault detection methods on TN-C-S (PNB), DC fault detection (RDC-DD), the Type B vs Type A RCD decision,…',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module2-section2-2',
  },
  {
    number: 'Subsection 3',
    title: 'BS 7671 Section 753 (heating systems) deeper',
    description: 'BS 7671 Section 753 (heating systems) and the broader regulatory map for heat-pump electrical work at recognition level for the L3 electrician — heating cables and embedded systems, the F-Gas Regulations boundary,…',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module2-section2-3',
  },
  {
    number: 'Subsection 4',
    title: 'ENA G98 / G99 grid notification deeper',
    description: 'ENA Engineering Recommendations G98 (fast-track up to 16 A per phase) and G99 (pre-application above that) at recognition level for the L3 electrician — what each document does, how the DNO timeline works,…',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module2-section2-4',
  },
  {
    number: 'Subsection 5',
    title: 'Inspection and test of environmental tech systems',
    description: 'Inspection and test framework for environmental technology systems at recognition level for the L3 electrician — BS 7671 Part 6 commissioning, IEC 62446 PV string verification, MCS commissioning certificates, EICR…',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module2-section2-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={2}
      title="Energy efficiency in electrical installations"
      description="Techniques and technologies for improving energy efficiency in electrical systems."
      tone="cyan"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module2-section1"
      prevSectionLabel="Section 1"
      nextSectionHref="/study-centre/apprentice/level3-module2-section3"
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
