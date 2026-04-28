/**
 * Module 5 · Section 1 — Landing
 * City & Guilds 2365-03 / Unit 304 — Inspection, Testing & Commissioning
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield, UserCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 1 — Principles of inspection and testing | Level 3 Module 5.1 | Elec-Mate';
const DESCRIPTION =
  'Fundamental principles, requirements and procedures for electrical inspection and testing.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'The statutory framework for inspection and testing',
    description: 'The legal chain of custody behind every inspection and test — Electricity at Work Regulations 1989 (Reg 4, Reg 14, Reg 16), HSR25, BS 7671 Part 6, and how a competent person discharges those duties on site.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module5-section1-1',
  },
  {
    number: 'Subsection 2',
    title: 'BS 7671 Part 6 in detail',
    description: 'Reg 641 (general), Reg 642 (visual inspection), Reg 643 (testing), Reg 644 (certification) — the four-regulation backbone of initial verification under BS 7671 Part 6, plus Appendix 6 forms.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module5-section1-2',
  },
  {
    number: 'Subsection 3',
    title: 'IET Guidance Note 3 — what it adds',
    description: 'Guidance Note 3 (GN3, 9th Edition + A4 update) — the IET\\',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module5-section1-3',
  },
  {
    number: 'Subsection 4',
    title: 'The scheme certification chain',
    description: 'How a signed EIC moves through the scheme provider (NICEIC, NAPIT, Stroma) to building control under Part P, and how the duty cascade transfers responsibility from installer to client.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module5-section1-4',
  },
  {
    number: 'Subsection 5',
    title: 'Safe isolation at Level 3 depth',
    description: 'Three-phase isolation, multi-supply isolation (PV, generators, UPS), permits to work, and the safety-system thinking that turns the JIB sequence into a robust safe-system-of-work for inspection and testing.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module5-section1-5',
  },
  {
    number: 'Subsection 6',
    title: 'Initial verification: purpose & information set',
    description: 'Why we verify, what initial verification covers (Reg 641-644), and the information pack required before starting — supply data, ADS arrangement, designer\\',
    icon: UserCheck,
    href: '/study-centre/apprentice/level3-module5-section1-6',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={1}
      title="Principles of inspection and testing"
      description="Fundamental principles, requirements and procedures for electrical inspection and testing."
      tone="emerald"
      subsectionsCount={subsections.length}
      nextSectionHref="/study-centre/apprentice/level3-module5-section2"
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
