/**
 * Module 4 · Section 3 — Landing
 * City & Guilds 2365-03 / Unit 303 — Fault Diagnosis
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield, UserCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 3 — Common faults in electrical systems | Level 3 Module 4.3 | Elec-Mate';
const DESCRIPTION =
  'Ring and radial circuits, lighting, protective devices, earthing and equipment faults.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Types, causes and consequences of faults',
    description: 'The seven canonical electrical fault types — open circuit, short circuit, earth fault, high-resistance joint, insulation failure, transient voltage, excess current — what causes each, what each looks like on the…',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module4-section3-1',
  },
  {
    number: 'Subsection 2',
    title: 'Common symptoms of electrical faults',
    description: 'Customer-language symptoms — flicker, trip, smell of burning, warm to touch, intermittent — translated into engineering categories and likely fault hypotheses.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module4-section3-2',
  },
  {
    number: 'Subsection 3',
    title: 'Likely fault locations in wiring systems',
    description: 'Where faults appear, by category — terminations (BS 7671 526.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module4-section3-3',
  },
  {
    number: 'Subsection 4',
    title: 'RCD and AFDD nuisance trips',
    description: 'The practical diagnosis of RCD nuisance trips (cumulative leakage, weather, appliance failure) and AFDD nuisance trips (electronics false trigger, switching transients) — clamp meter method, differential isolation,…',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module4-section3-4',
  },
  {
    number: 'Subsection 5',
    title: 'Special precautions on specialised systems',
    description: 'Special-environment and specialised-equipment precautions an L3 apprentice meets — fibre-optic, IT shutdown, fluorescent ballast capacitors, RF / induction equipment, fire alarm isolation, emergency lighting test…',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module4-section3-5',
  },
  {
    number: 'Subsection 6',
    title: 'Equipment-side faults: appliances, motors, EV chargers, PV inverters',
    description: 'Faults that live INSIDE customer equipment — appliance motors, immersion heaters, LED drivers, EV chargers, PV inverters — and the L–N–E signature each leaves on the meter.',
    icon: UserCheck,
    href: '/study-centre/apprentice/level3-module4-section3-6',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={3}
      title="Common faults in electrical systems"
      description="Ring and radial circuits, lighting, protective devices, earthing and equipment faults."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module4-section2"
      prevSectionLabel="Section 2"
      nextSectionHref="/study-centre/apprentice/level3-module4-section4"
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
