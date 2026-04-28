/**
 * Module 1 · Section 4 — Landing
 * City & Guilds 2365-03 / Unit 201 — Health & Safety
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield, UserCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 4 — Hazard identification and control | Level 3 Module 1.4 | Elec-Mate';
const DESCRIPTION =
  'Systematic hazard identification, evaluation and implementation of control measures.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'CLP pictograms: hazardous substance labels',
    description: 'L3 CLP pictograms — nine GHS / CLP hazard pictograms, what each means, and reading the SDS for the full picture beyond the label.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module1-section4-1',
  },
  {
    number: 'Subsection 2',
    title: 'Hazard: the L3 definition',
    description: 'L3 hazard definition — distinguishing hazard from risk, exposure routes, the supervisor judgement on consequence and likelihood.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module1-section4-2',
  },
  {
    number: 'Subsection 3',
    title: 'Specific electrical hazards',
    description: 'L3 specific electrical hazards — shock, burn, arc-flash, fire, secondary injury — mapped to regulation and control.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module1-section4-3',
  },
  {
    number: 'Subsection 4',
    title: 'Workplace hazard situations',
    description: 'L3 workplace hazards — slips/trips, manual handling, working at height, confined spaces, weather.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module1-section4-4',
  },
  {
    number: 'Subsection 5',
    title: 'Fire extinguishers: selection and limits',
    description: 'L3 fire extinguisher selection — five classes plus electrical, when to fight vs evacuate, BS EN 3 colour codes.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module1-section4-5',
  },
  {
    number: 'Subsection 6',
    title: 'Asbestos: CAR 2012 in detail',
    description: 'L3 asbestos depth — CAR 2012, asbestos register, refurbishment surveys, licensed vs non-licensed work, and the supervisor escalation chain.',
    icon: UserCheck,
    href: '/study-centre/apprentice/level3-module1-section4-6',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={4}
      title="Hazard identification and control"
      description="Systematic hazard identification, evaluation and implementation of control measures."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module1-section3"
      prevSectionLabel="Section 3"
      nextSectionHref="/study-centre/apprentice/level3-module1-section5"
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
