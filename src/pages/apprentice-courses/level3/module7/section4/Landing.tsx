/**
 * Module 7 · Section 4 — Landing
 * City & Guilds 2365-03 / Unit 308 — Career Awareness
 */

import { AlertTriangle, ClipboardCheck, FileText, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 4 — Continuing professional development | Level 3 Module 7.4 | Elec-Mate';
const DESCRIPTION =
  'Lifelong learning, skills development and staying current with industry changes.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'BS 7671 amendment cycle',
    description: 'BS 7671 amendments — A1, A2, A3, A4 — what each typically changes, why they happen, the CPD obligation that follows, and how to stay current with the regs over a long career.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module7-section4-1',
  },
  {
    number: 'Subsection 2',
    title: 'IET membership routes',
    description: 'IET membership tiers (Affiliate, Associate, MIET, FIET) and linked Engineering Council registrations (EngTech, IEng, CEng).',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module7-section4-2',
  },
  {
    number: 'Subsection 3',
    title: 'Online learning + scheme CPD',
    description: 'Elec-Mate, NICEIC Connect, NAPIT One-Day Updates, IET Academy, JTL, NET, manufacturer training — planning a structured annual CPD calendar that meets CPS scheme requirements.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module7-section4-3',
  },
  {
    number: 'Subsection 4',
    title: 'Beyond the toolbox: industry charities + welfare',
    description: 'Electrical Industries Charity, Lighthouse Construction Industry Charity, Mates in Mind, Mind, Samaritans — UK industry welfare and mental health charities, what they offer and how to access support.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module7-section4-4',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={4}
      title="Continuing professional development"
      description="Lifelong learning, skills development and staying current with industry changes."
      tone="purple"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module7-section3"
      prevSectionLabel="Section 3"
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
