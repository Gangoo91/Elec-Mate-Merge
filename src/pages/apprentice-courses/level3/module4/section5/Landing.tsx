/**
 * Module 4 · Section 5 — Landing
 * City & Guilds 2365-03 / Unit 303 — Fault Diagnosis
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 5 — Rectification and verification | Level 3 Module 4.5 | Elec-Mate';
const DESCRIPTION =
  'Repair methods, BS 7671 compliance, recording works and preventative maintenance.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Repair vs replace — factors affecting fault correction',
    description: 'The practical decision framework for repair vs replace — cost, availability, compliance, schedule, customer constraints, environmental factors.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module4-section5-1',
  },
  {
    number: 'Subsection 2',
    title: 'Verification, functional testing and retesting',
    description: 'The post-rectification verification — what tests prove the fault is corrected, BS 7671 643 retest cycle, functional testing on safety systems, the customer hand-back demonstration.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module4-section5-2',
  },
  {
    number: 'Subsection 3',
    title: 'Restoring building fabric and finishes',
    description: 'When fault rectification has disturbed plaster / brick / tile / joist / ceiling / flooring — the L3 apprentice responsibility, the techniques, the customer brief and the trade boundaries with plasterer / decorator /…',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module4-section5-3',
  },
  {
    number: 'Subsection 4',
    title: 'Safe disposal of damaged equipment + leaving the area safe',
    description: 'WEEE Regulations, Hazardous Waste (England and Wales) Regulations, Duty of Care under EPA 1990 — how the L3 apprentice routes failed RCBOs, scorched MK sockets, burnt cable, mercury-bearing fluorescent tubes and…',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module4-section5-4',
  },
  {
    number: 'Subsection 5',
    title: 'Reporting + handover documentation',
    description: 'Closing the documentary trail on a rectification job — Minor Works Certificate, EIC, EICR + Schedule of Remedial Works, Building Control under Part P for notifiable work, customer warranty, BS 7671 A4:2026 currency…',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module4-section5-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={5}
      title="Rectification and verification"
      description="Repair methods, BS 7671 compliance, recording works and preventative maintenance."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module4-section4"
      prevSectionLabel="Section 4"
      nextSectionHref="/study-centre/apprentice/level3-module4-section6"
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
