/**
 * Module 2 · Section 1 — Landing
 * City & Guilds 2365-03 / Unit 301 — Environmental Technology
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 1 — Environmental legislation and standards | Level 3 Module 2.1 | Elec-Mate';
const DESCRIPTION =
  'Environmental laws, regulations and standards affecting electrical installations.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Principles of environmental technology systems',
    description: 'How environmental technology systems work in principle — energy harvest, energy upgrade, energy recovery and demand reduction.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module2-section1-1',
  },
  {
    number: 'Subsection 2',
    title: 'Main types, characteristics and purposes',
    description: 'A working family map of environmental technology systems an electrician will meet on UK installs — solar PV, solar thermal, ASHP, GSHP, MVHR, micro-CHP, biomass, wind, micro-hydro, EV charging and battery storage.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module2-section1-2',
  },
  {
    number: 'Subsection 3',
    title: 'Battery energy storage systems (BESS)',
    description: 'Battery energy storage systems (BESS) at recognition level for the L3 electrician — DC-coupled vs AC-coupled topology, lithium-ion chemistries (NMC vs LFP), the BMS, the inverter interface, the BS 7671 anchor, the…',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module2-section1-3',
  },
  {
    number: 'Subsection 4',
    title: 'EV charging deep dive',
    description: 'EV charging at recognition level for the L3 electrician — IEC 61851 charging Modes 1-4, the BS 7671 Section 722 anchor, OZEV Smart Charge Points Regulations 2021, load management for constrained main-fuse properties,…',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module2-section1-4',
  },
  {
    number: 'Subsection 5',
    title: 'Whole-system integration',
    description: 'How PV, battery storage, heat pumps and EV charging are integrated as one system on a modern UK domestic site — Home Energy Management Systems, the consumer unit layout, the role of the inverter and BMS comms layer,…',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module2-section1-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={1}
      title="Environmental legislation and standards"
      description="Environmental laws, regulations and standards affecting electrical installations."
      tone="cyan"
      subsectionsCount={subsections.length}
      nextSectionHref="/study-centre/apprentice/level3-module2-section2"
      nextSectionLabel="Section 2"
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
