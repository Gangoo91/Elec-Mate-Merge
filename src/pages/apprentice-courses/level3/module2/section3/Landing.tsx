/**
 * Module 2 · Section 3 — Landing
 * City & Guilds 2365-03 / Unit 301 — Environmental Technology
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 3 — Renewable energy systems | Level 3 Module 2.3 | Elec-Mate';
const DESCRIPTION =
  'Solar, wind and other renewable energy technologies and their applications.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Solar PV overview for the L3 electrician',
    description: 'Solar PV system overview for the Level 3 electrician — DC array side, inverter, AC interface, BS 7671 Section 712 (extensively revised in A4:2026), MCS MIS 3002, ENA G98/G99 grid connection.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module2-section3-1',
  },
  {
    number: 'Subsection 2',
    title: 'Heat pumps overview (ASHP / GSHP)',
    description: 'Heat pumps for the Level 3 electrician — vapour-compression cycle, ASHP vs GSHP, COP / SCOP, electrical interface (32-40 A radial, Type C MCB, RCD, local outdoor isolator), F-Gas boundary, MCS MIS 3005.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module2-section3-2',
  },
  {
    number: 'Subsection 3',
    title: 'MVHR, wind, micro-CHP, biomass overview',
    description: 'Recognition-level overview of MVHR, micro-wind, micro-hydro, micro-CHP and biomass for the L3 electrician — operating principle, electrical interface, regulatory home and current UK market relevance.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module2-section3-3',
  },
  {
    number: 'Subsection 4',
    title: 'Heat pump system technology deeper',
    description: 'Heat pump system technology at deeper recognition level for the L3 electrician — vapour-compression cycle in plain English, COP / SCOP at apprentice level, emitter sizing trade-offs, ASHP / GSHP / WSHP comparison,…',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module2-section3-4',
  },
  {
    number: 'Subsection 5',
    title: 'Wind, hydro, CHP, biomass deeper',
    description: 'Micro-wind, micro-hydro, micro-CHP and biomass at deeper recognition level for the L3 electrician — grid-connection framework, planning and noise / emissions regulation, capacity factors, MCS qualifications and the…',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module2-section3-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={3}
      title="Renewable energy systems"
      description="Solar, wind and other renewable energy technologies and their applications."
      tone="cyan"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module2-section2"
      prevSectionLabel="Section 2"
      nextSectionHref="/study-centre/apprentice/level3-module2-section4"
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
