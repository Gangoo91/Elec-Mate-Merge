import { Users, BookOpen, MessageSquare } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Site roles and team responsibilities',
    icon: Users,
    description:
      'LO1 — site management team, the trades reporting to them, and the visitors who turn up on site (clients, inspectors, DNO).',
    href: 'section1',
  },
  {
    id: 2,
    title: 'Information sources',
    icon: BookOpen,
    description:
      'LO2 — statutory legislation, workplace drawings and RAMS, customer-facing paperwork, and the company policies that bind it all together.',
    href: 'section2',
  },
  {
    id: 3,
    title: 'Communication methods',
    icon: MessageSquare,
    description:
      'LO3 — verbal and written methods, communicating across disabilities and languages, resolving conflict, and what poor comms costs an organisation.',
    href: 'section3',
  },
];

export default function Module5() {
  useSEO({
    title:
      'Module 5: Communicate with others within building services engineering | Level 2 Electrical | Elec-Mate',
    description:
      'Site roles, information sources and communication methods — the unit that turns a competent electrician into someone who can run a job. Aligned to City & Guilds 2365-02 Unit 210.',
  });

  return (
    <ModuleShell
      backTo=".."
      backLabel="Level 2 electrical installation"
      moduleNumber={5}
      title="Communicate with others within building services engineering"
      description="City &amp; Guilds 2365-02 Unit 210 — site roles, information sources, communication methods. The unit that turns a competent electrician into someone who can actually run a job."
      tone="emerald"
      sectionsCount={sections.length}
      prevModuleHref="../module4"
      prevModuleLabel="Installation of wiring systems and enclosures"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Module 5 is the unit nobody talks about until something goes wrong on site —
            and then it's the only thing that matters. Wiring a job correctly is half the
            battle. The other half is reading the drawings the designer sent you,
            understanding who the bloke in the high-vis with the clipboard actually is,
            and being able to tell the customer their kitchen will be without power for
            two hours without it turning into a row.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            <span className="text-white font-medium">Section 1</span> walks you through
            the people on a typical building site — site management (PM, site manager,
            foreman, supervisor), the trades reporting to them (electricians, plumbers, joiners,
            plasterers, labourers), and the visitors who turn up uninvited (clients,
            building control, the DNO, HSE).{' '}
            <span className="text-white font-medium">Section 2</span> covers the paper
            and digital information sources you'll lean on every shift — statutory
            legislation, workplace drawings and RAMS, customer-facing quotes and
            certificates, and the company policies that pull it all together.{' '}
            <span className="text-white font-medium">Section 3</span> finishes on
            communication itself — verbal methods, comms across disabilities and language
            barriers, defusing conflict, and the very real costs of getting it wrong.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end of Module 5 you should be able to walk onto an unfamiliar site,
            work out who's running it, find the documents you need, and talk to anyone on
            the job — from the labourer to the client — without it costing you the
            contract.
          </p>
        </div>
      }
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={section.href}
          sectionNumber={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
