/**
 * Module 2 · Section 4 — Landing
 * City & Guilds 2365-03 / Unit 301 — Environmental Technology
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 4 — Low carbon technologies | Level 3 Module 2.4 | Elec-Mate';
const DESCRIPTION =
  'Carbon reduction technologies and their integration in building services.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Building Regulations Part L + MCS framework',
    description: 'The regulatory framework for environmental technology systems — Building Regulations Part L (Conservation of Fuel and Power), Future Homes Standard, MCS Code and Installation Standards, Boiler Upgrade Scheme, Smart…',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module2-section4-1',
  },
  {
    number: 'Subsection 2',
    title: 'BS 7671 Section 712/722/753 + ENA G98/G99',
    description: 'BS 7671:2018+A4:2026 Section 712 (PV), Section 722 (EV charging) and Section 753 (heating cables and embedded heating systems) plus ENA Engineering Recommendation G98 / G99 for parallel-connected generators.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module2-section4-2',
  },
  {
    number: 'Subsection 3',
    title: 'BS 7671 Section 712 PV deep + ENA G98/G99 + anti-islanding',
    description: 'A regulatory deep dive into solar PV — BS 7671:2018+A4:2026 Section 712 (string protection, equipment selection, IMD, SPDs, equipotential bonding), ENA Engineering Recommendation G98 (under 16 A per phase) and G99…',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module2-section4-3',
  },
  {
    number: 'Subsection 4',
    title: 'BS 7671 Section 722 EV + Open-PEN + Reg 722.411.4',
    description: 'A regulatory deep dive into electric vehicle charging — BS 7671:2018+A4:2026 Section 722, the open-PEN problem on PME (TN-C-S) supplies for outdoor charge points, the four compliance routes of Reg 722.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module2-section4-4',
  },
  {
    number: 'Subsection 5',
    title: 'BS 7671 Section 753 heating + heat pump regulatory chain + MCS MIS 3005',
    description: 'A regulatory deep dive into electrical heating systems and heat pumps — BS 7671:2018+A4:2026 Section 753 (heating cables and embedded electric heating systems), MCS MIS 3005 for heat pump installation competence, the…',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module2-section4-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={4}
      title="Low carbon technologies"
      description="Carbon reduction technologies and their integration in building services."
      tone="cyan"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module2-section3"
      prevSectionLabel="Section 3"
      nextSectionHref="/study-centre/apprentice/level3-module2-section5"
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
