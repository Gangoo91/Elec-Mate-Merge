/**
 * Module 7 · Section 2 — Landing
 * City & Guilds 2365-03 / Unit 308 — Career Awareness
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 2 — Professional standards and responsibilities | Level 3 Module 7.2 | Elec-Mate';
const DESCRIPTION =
  'Professional ethics, standards and responsibilities in electrical work.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Post-AM2 progression: Inspection & Testing',
    description: 'The post-AM2 inspection and testing qualification ladder — 2391-52, 2394, 2395, 2396 — what each unlocks, costs, study time, and why I&T qualifications are the highest-leverage CPD spend after AM2.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module7-section2-1',
  },
  {
    number: 'Subsection 2',
    title: 'MCS standalone certifications',
    description: 'Microgeneration Certification Scheme (MCS) — PV, Heat Pump, Solar Thermal, Battery Storage, EV — qualifications, MCS registration process, and the economic case for adding renewables to your portfolio.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module7-section2-2',
  },
  {
    number: 'Subsection 3',
    title: 'Design route: 2382, DipBSE, EngTech / IEng / CEng',
    description: 'The design and engineering pathway — C&G 2382 BS 7671, IET DipBSE, HNC/HND/BEng, and Engineering Council registration (EngTech, IEng, CEng).',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module7-section2-3',
  },
  {
    number: 'Subsection 4',
    title: 'Specialised routes',
    description: 'Specialist routes within UK electrical contracting — control & instrumentation, marine & offshore, rail PTS, fire alarm BAFE, CCTV/security NSI/SSAIB, data cabling.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module7-section2-4',
  },
  {
    number: 'Subsection 5',
    title: 'Teaching / assessing route',
    description: 'TAQA L3, IQA L4, FE teaching qualifications, college lecturer / assessor / IQA roles, EPAO assessor work — how a senior electrician moves into teaching and assessing apprentices.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module7-section2-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={2}
      title="Professional standards and responsibilities"
      description="Professional ethics, standards and responsibilities in electrical work."
      tone="purple"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module7-section1"
      prevSectionLabel="Section 1"
      nextSectionHref="/study-centre/apprentice/level3-module7-section3"
      nextSectionLabel="Section 3"
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
