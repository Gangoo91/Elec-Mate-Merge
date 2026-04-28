/**
 * Module 2 · Section 5 — Landing
 * City & Guilds 2365-03 / Unit 301 — Environmental Technology
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 5 — Integration with electrical installations | Level 3 Module 2.5 | Elec-Mate';
const DESCRIPTION =
  'Incorporating environmental technologies into conventional electrical systems.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Pre-installation considerations',
    description: 'Pre-installation considerations across the environmental technology family — site survey, design pack, supply capacity check, customer expectations, trade coordination, planning and grid-connection lead times.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module2-section5-1',
  },
  {
    number: 'Subsection 2',
    title: 'Commissioning and customer handover',
    description: 'Commissioning and customer handover for environmental technology systems — BS 7671 inspection and test, system functional test, performance verification, customer training, handover documentation pack.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module2-section5-2',
  },
  {
    number: 'Subsection 3',
    title: 'Maintenance requirements for environmental tech',
    description: 'Maintenance requirements for environmental technology systems — heat pump annual service, PV inspection schedule, EV charger periodic inspection, MVHR filter changes, biomass ash and flue clean.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module2-section5-3',
  },
  {
    number: 'Subsection 4',
    title: 'Commissioning paperwork chain for renewables',
    description: 'The paperwork chain a renewables install generates on handover day — ENA G98 or G99 DNO notification, MCS certificate, MCS Code 4.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module2-section5-4',
  },
  {
    number: 'Subsection 5',
    title: 'Long-term maintenance and service intervals',
    description: 'The multi-decade view across the renewables family — PV string degradation curves, lithium-ion battery end-of-life decisions, heat pump F-Gas leak-check intervals tied to refrigerant charge weight, and EV charger…',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module2-section5-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={5}
      title="Integration with electrical installations"
      description="Incorporating environmental technologies into conventional electrical systems."
      tone="cyan"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module2-section4"
      prevSectionLabel="Section 4"
      nextSectionHref="/study-centre/apprentice/level3-module2-section6"
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
