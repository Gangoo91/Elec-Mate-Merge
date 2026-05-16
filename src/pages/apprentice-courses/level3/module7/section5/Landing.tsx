/**
 * Module 7 · Section 5 — Landing
 * City & Guilds 2365-03 / Unit 308 — Career Awareness
 *
 * Section 5: Employment and business awareness — employment skills,
 * self-employment options and business development. Six subsections cover
 * CV/interview preparation, running a business, self-employed setup,
 * pricing/estimating, legal requirements, and insurance/liability.
 */

import {
  Briefcase,
  Building2,
  FileText,
  Calculator,
  ScrollText,
  ShieldCheck,
} from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 5 — Employment and business awareness | Level 3 Module 7.5 | Elec-Mate';
const DESCRIPTION =
  'Employment skills, self-employment options and business development for electricians — CVs, interviews, running a business, pricing, legal requirements and insurance.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Writing CVs and preparing for interviews',
    description:
      'CV structure for electricians, describing experience effectively, ECS card grades on CVs, STAR technique for competency questions, interview day preparation and follow-up.',
    icon: Briefcase,
    href: '/study-centre/apprentice/level3-module7-section5-1',
  },
  {
    number: 'Subsection 2',
    title: 'Running your own electrical business',
    description:
      'Business structures (sole trader, Ltd, partnership), registration with HMRC and Companies House, financial management, cash flow, marketing and building reputation.',
    icon: Building2,
    href: '/study-centre/apprentice/level3-module7-section5-2',
  },
  {
    number: 'Subsection 3',
    title: 'Setting up as a self-employed electrician',
    description:
      'HMRC registration, UTR numbers, self-assessment deadlines, the Construction Industry Scheme (CIS), data protection (ICO) and essential insurance for the first day of trading.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module7-section5-3',
  },
  {
    number: 'Subsection 4',
    title: 'Pricing and estimating',
    description:
      'Calculating charge-out rates, materials markup, fixed-price versus daywork, site surveys, quotations, exclusions and assumptions, variations and tendering.',
    icon: Calculator,
    href: '/study-centre/apprentice/level3-module7-section5-4',
  },
  {
    number: 'Subsection 5',
    title: 'Legal requirements for electrical contractors',
    description:
      'Consumer Rights Act 2015, Consumer Contracts Regulations cooling-off period, written contracts, retention of title, CDM 2015, GDPR, ICO registration, vicarious liability.',
    icon: ScrollText,
    href: '/study-centre/apprentice/level3-module7-section5-5',
  },
  {
    number: 'Subsection 6',
    title: 'Insurance and liability',
    description:
      "Public liability, employers' liability (Compulsory Insurance Act 1969), professional indemnity, product liability, tool and contract works cover, excess, subrogation and claims handling.",
    icon: ShieldCheck,
    href: '/study-centre/apprentice/level3-module7-section5-6',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={5}
      title="Employment and business awareness"
      description="Employment skills, self-employment options and business development."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module7-section4"
      prevSectionLabel="Section 4"
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
