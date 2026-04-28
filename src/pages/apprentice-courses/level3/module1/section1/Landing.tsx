/**
 * Module 1 · Section 1 — Landing
 * City & Guilds 2365-03 / Unit 201 — Health & Safety
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield, UserCheck, Zap } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 1 — Legislation and regulations | Level 3 Module 1.1 | Elec-Mate';
const DESCRIPTION =
  'Key legislation, regulations and standards governing electrical work and building services.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'HASAWA dutyholder responsibilities at L3',
    description: 'L3 refresher on the Health and Safety at Work etc Act 1974 — dutyholder roles, director liability under s.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module1-section1-1',
  },
  {
    number: 'Subsection 2',
    title: 'EAWR 1989: competence, Reg 16 and supervision',
    description: 'L3 refresher on the Electricity at Work Regulations 1989 — Reg 4 systems, Reg 14 live working, Reg 16 competence, and how an L3 apprentice carries supervisory weight even before formal sign-off.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module1-section1-2',
  },
  {
    number: 'Subsection 3',
    title: 'MHSWR 1999 + CDM 2015: the planning duty',
    description: 'L3 refresher on the Management of Health and Safety at Work Regulations 1999 and CDM 2015 — Reg 3 risk assessment, Reg 5 effective arrangements, dutyholder roles, and the L2-to-L3 shift from Worker to Contractor.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module1-section1-3',
  },
  {
    number: 'Subsection 4',
    title: 'RIDDOR, PUWER, COSHH, LOLER: depth refresher',
    description: 'L3 depth refresher on the four daughter regulations — RIDDOR reportable events, PUWER work equipment duties, COSHH substance assessment and LOLER lifting equipment inspection.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module1-section1-4',
  },
  {
    number: 'Subsection 5',
    title: 'Environmental legislation and waste duty of care',
    description: 'L3 refresher on environmental duties — EPA 1990 s.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module1-section1-5',
  },
  {
    number: 'Subsection 6',
    title: 'HSE, regulators, FFI and the enforcement system',
    description: 'L3 refresher on UK H&S enforcement — HSE inspectors, improvement and prohibition notices, Fee for Intervention, the Sentencing Council guideline, and prosecutions through the courts.',
    icon: UserCheck,
    href: '/study-centre/apprentice/level3-module1-section1-6',
  },
  {
    number: 'Subsection 7',
    title: 'Building Safety Act 2022: the new framework',
    description: 'L3 introduction to the Building Safety Act 2022 — Higher-Risk Building dutyholders, the Building Safety Regulator, golden thread of information, and competence requirements that affect electrical work in HRRBs.',
    icon: Zap,
    href: '/study-centre/apprentice/level3-module1-section1-7',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={1}
      title="Legislation and regulations"
      description="Key legislation, regulations and standards governing electrical work and building services."
      tone="emerald"
      subsectionsCount={subsections.length}
      nextSectionHref="/study-centre/apprentice/level3-module1-section2"
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
