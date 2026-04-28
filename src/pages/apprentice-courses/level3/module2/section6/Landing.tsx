/**
 * Module 2 · Section 6 — Landing
 * City & Guilds 2365-03 / Unit 301 — Environmental Technology
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 6 — Sustainable working practices | Level 3 Module 2.6 | Elec-Mate';
const DESCRIPTION =
  'Environmentally responsible working methods and waste management practices.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'F-Gas Regulations and the electrician trade boundary',
    description: 'F-Gas Regulation EU 517/2014 (retained as UK law post-Brexit) — refrigerant scope, GWP banding, certification requirements, and the firm trade boundary between F-Gas-certified refrigerant work and the electrician…',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module2-section6-1',
  },
  {
    number: 'Subsection 2',
    title: 'WEEE Regs 2013, lithium-ion battery fire risk, safe storage',
    description: 'Waste Electrical and Electronic Equipment Regulations 2013 — categories of WEEE, producer responsibility, the role of approved authorised treatment facilities, and the specific fire risk posed by lithium-ion…',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module2-section6-2',
  },
  {
    number: 'Subsection 3',
    title: 'Hazardous Waste Regs 2005, EPR 2016 and the waste hierarchy',
    description: 'Hazardous Waste (England and Wales) Regulations 2005, the Environmental Permitting Regulations 2016, and the statutory waste hierarchy.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module2-section6-3',
  },
  {
    number: 'Subsection 4',
    title: 'Environmental Product Declarations, cable mfr disclosures, recycled content',
    description: 'Environmental Product Declarations under EN 15804, BS EN 50625 cable recycling standards, and how cable manufacturer environmental disclosures inform specification on BREEAM and net-zero projects.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module2-section6-4',
  },
  {
    number: 'Subsection 5',
    title: 'Scope 1 / 2 / 3 emissions for an electrical contractor and carbon literacy',
    description: 'The Greenhouse Gas Protocol scope 1 (direct), scope 2 (purchased energy) and scope 3 (value chain) framework applied to a UK electrical contracting business.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module2-section6-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={6}
      title="Sustainable working practices"
      description="Environmentally responsible working methods and waste management practices."
      tone="cyan"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module2-section5"
      prevSectionLabel="Section 5"
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
