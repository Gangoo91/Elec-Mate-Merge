import { Route, FileCheck, FileSignature, Users2, Search, Link2 } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.1',
    title: 'Procurement routes',
    description:
      'Traditional, design and build, management contracting, construction management and two-stage tendering approaches',
    icon: Route,
    href: '../h-n-c-module5-section2-1',
  },
  {
    number: '2.2',
    title: 'JCT contracts',
    description:
      'Standard building contracts, intermediate forms, amendments, extensions of time and practical completion provisions',
    icon: FileCheck,
    href: '../h-n-c-module5-section2-2',
  },
  {
    number: '2.3',
    title: 'NEC contracts',
    description:
      'ECC main options A-F, early warning procedures, compensation events and programme management under NEC4',
    icon: FileSignature,
    href: '../h-n-c-module5-section2-3',
  },
  {
    number: '2.4',
    title: 'Subcontract management',
    description:
      'DOM/1, DOM/2 subcontracts, back-to-back provisions, flow-down clauses and subcontractor coordination',
    icon: Users2,
    href: '../h-n-c-module5-section2-4',
  },
  {
    number: '2.5',
    title: 'Tendering process',
    description:
      'Invitation to tender, bid preparation, tender evaluation, negotiation strategies and contract award procedures',
    icon: Search,
    href: '../h-n-c-module5-section2-5',
  },
  {
    number: '2.6',
    title: 'Supply chain management',
    description:
      'Approved supplier lists, lead time management, logistics coordination, material scheduling and vendor relationships',
    icon: Link2,
    href: '../h-n-c-module5-section2-6',
  },
];

const HNCModule5Section2 = () => {
  useSEO(
    'Procurement and contracts - HNC Module 5 Section 2 | Building Services',
    'Master procurement routes, JCT and NEC contracts, subcontract management, tendering processes and supply chain management for building services.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={2}
      title="Procurement and contracts"
      description="Understand procurement strategies and contractual frameworks for building services projects."
      tone="purple"
      subsectionsCount={subsections.length}
    >
      {subsections.map((s, i) => (
        <ModuleCard
          key={i}
          number={s.number}
          title={s.title}
          description={s.description}
          icon={s.icon}
          href={s.href}
        />
      ))}
    </SectionShell>
  );
};

export default HNCModule5Section2;
