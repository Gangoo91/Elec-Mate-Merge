/**
 * Module 4 · Section 1 — Landing
 * City & Guilds 2365-03 / Unit 303 — Fault Diagnosis
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 1 — Principles of fault diagnosis | Level 3 Module 4.1 | Elec-Mate';
const DESCRIPTION =
  'Types of faults, symptoms, diagnostic sequence, safety considerations and documentation.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Dangers of electricity in fault diagnosis',
    description: 'Why fault diagnosis is the most electrically dangerous task an electrician does — partial isolation, induced voltage, capacitive charge, hidden parallel paths, unverified circuits — and how the BS 7671 / EAWR / HSG85…',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module4-section1-1',
  },
  {
    number: 'Subsection 2',
    title: 'H&S framework, risk assessment and permits',
    description: 'The full documented H&S framework around fault diagnosis — risk assessment, method statement, permit-to-work, JIB safe isolation, PPE matrix, lone-working controls, hazardous-area precautions and ESD discipline for…',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module4-section1-2',
  },
  {
    number: 'Subsection 3',
    title: 'Safe isolation in fault diagnosis',
    description: 'Applying the JIB six-step safe isolation procedure to fault-diagnosis work — circuit, sub-main and full installation isolation, multi-source disconnection (PV / EV / generator) and weighing the customer-impact of…',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module4-section1-3',
  },
  {
    number: 'Subsection 4',
    title: 'Safe working procedures for fault diagnosis',
    description: 'The precaution rulebook for live and dead fault work — barriers and signage, work area control, witnessing for live work, energy-source verification, the everyday precaution checklist that becomes muscle memory.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module4-section1-4',
  },
  {
    number: 'Subsection 5',
    title: 'Implications of isolation for self, others, customers and building systems',
    description: 'Isolation has consequences — for you, for other operatives, for the customer',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module4-section1-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={1}
      title="Principles of fault diagnosis"
      description="Types of faults, symptoms, diagnostic sequence, safety considerations and documentation."
      tone="emerald"
      subsectionsCount={subsections.length}
      nextSectionHref="/study-centre/apprentice/level3-module4-section2"
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
