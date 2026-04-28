/**
 * Module 4 · Section 4 — Landing
 * City & Guilds 2365-03 / Unit 303 — Fault Diagnosis
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 4 — Systematic fault-finding techniques | Level 3 Module 4.4 | Elec-Mate';
const DESCRIPTION =
  'Visual inspection, testing procedures, polarity checks and functional testing.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Logical stages of fault diagnosis',
    description: 'The seven-stage fault diagnostic procedure — collect symptoms, formulate hypothesis, plan tests, execute, analyse, formulate fix, execute fix.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module4-section4-1',
  },
  {
    number: 'Subsection 2',
    title: 'Identifying supply voltages + procedure for tests',
    description: 'Identifying supply arrangement (TN-S, TN-C-S, TT, IT) for fault diagnosis context, and the BS 7671 643 test procedure adapted for fault investigation rather than commissioning.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module4-section4-2',
  },
  {
    number: 'Subsection 3',
    title: 'Analysing test results — acceptable vs not',
    description: 'Turning raw readings into diagnostic conclusions — BS 7671 Appendix 3 / Table 41.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module4-section4-3',
  },
  {
    number: 'Subsection 4',
    title: '5-Whys root cause + engineering decision',
    description: 'The 5-Whys discipline applied to electrical faults — finding the ROOT cause (design / installation / maintenance failure) rather than just the visible symptom.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module4-section4-4',
  },
  {
    number: 'Subsection 5',
    title: 'Rectification reporting, variation orders, repair certs + customer comms',
    description: 'Closing out a fault diagnosis job — write up the rectification, raise a variation order if scope has changed, issue the right certificate (Minor Works or amended EIC), and brief the customer in language they can act on.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module4-section4-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={4}
      title="Systematic fault-finding techniques"
      description="Visual inspection, testing procedures, polarity checks and functional testing."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module4-section3"
      prevSectionLabel="Section 3"
      nextSectionHref="/study-centre/apprentice/level3-module4-section5"
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
