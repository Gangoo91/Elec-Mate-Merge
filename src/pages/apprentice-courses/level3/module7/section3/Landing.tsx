/**
 * Module 7 · Section 3 — Landing
 * City & Guilds 2365-03 / Unit 308 — Career Awareness
 */

import { AlertTriangle, ClipboardCheck, FileText, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 3 — Communication and teamworking | Level 3 Module 7.3 | Elec-Mate';
const DESCRIPTION =
  'Effective communication skills and collaborative working practices.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Legal forms: sole trader, Ltd, partnership',
    description: 'Sole trader, partnership, Ltd company, LLP — what each legal form means for tax (HMRC), registration (Companies House), liability, accounting and IR35.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module7-section3-1',
  },
  {
    number: 'Subsection 2',
    title: 'Insurance stack',
    description: 'Insurance for an electrical business — PL, EL (Compulsory Insurance Act 1969), PI, Tools-in-Transit, Business Vehicle, scheme-required cover.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module7-section3-2',
  },
  {
    number: 'Subsection 3',
    title: 'Pricing + invoicing',
    description: 'Labour rates by region, materials markup, prompt-payment legislation (Late Payment of Commercial Debts Act 1998), pricing models, invoice structure, retention money.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module7-section3-3',
  },
  {
    number: 'Subsection 4',
    title: 'Customer-facing',
    description: 'Consumer Rights Act 2015, complaints handling, ADR (Alternative Dispute Resolution), online reputation management, Bribery Act 2010 — the practical customer-facing side of running an electrical business.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module7-section3-4',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={3}
      title="Communication and teamworking"
      description="Effective communication skills and collaborative working practices."
      tone="purple"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module7-section2"
      prevSectionLabel="Section 2"
      nextSectionHref="/study-centre/apprentice/level3-module7-section4"
      nextSectionLabel="Section 4"
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
