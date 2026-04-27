import { Wrench, ShieldCheck, Cable, Link2, Eye, Activity } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Tools used to install wiring systems',
    icon: Wrench,
    description:
      'LO1 — hand tools, power tools and the safety checks that keep them (and you) on site.',
    href: 'section1',
  },
  {
    id: 2,
    title: 'Preparing for installation',
    icon: ShieldCheck,
    description:
      'LO2 — spotting workspace hazards, picking the right PPE, choosing safe access equipment.',
    href: 'section2',
  },
  {
    id: 3,
    title: 'Installing wiring systems and enclosures',
    icon: Cable,
    description:
      'LO3 — reading drawings, marking out, fixing accessories, installing and terminating wiring, JIB safe isolation.',
    href: 'section3',
  },
  {
    id: 4,
    title: 'Bonding mains services',
    icon: Link2,
    description:
      'LO4 — sizing main bonding, terminating bonding cables, clamping to gas / water / oil / steel and proving continuity.',
    href: 'section4',
  },
  {
    id: 5,
    title: 'Inspecting a dead installation',
    icon: Eye,
    description:
      'LO5 — the visual checks you carry out before any test instrument touches the board.',
    href: 'section5',
  },
  {
    id: 6,
    title: 'Testing a dead installation',
    icon: Activity,
    description:
      'LO6 — continuity, ring final, insulation resistance, polarity, functional checks and recording results.',
    href: 'section6',
  },
];

export default function Module4() {
  useSEO({
    title: 'Module 4: Installation of wiring systems and enclosures | Level 2 Electrical | Elec-Mate',
    description:
      'Tools, preparation, install, terminate, bond, inspect and test — aligned to City & Guilds 2365-02 Unit 204.',
  });

  return (
    <ModuleShell
      backTo=".."
      backLabel="Level 2 electrical installation"
      moduleNumber={4}
      title="Installation of wiring systems and enclosures"
      description="City &amp; Guilds 2365-02 Unit 204 — tools, preparation, install, terminate, bond, inspect and test. The hands-on unit where you turn theory into a working installation."
      tone="emerald"
      sectionsCount={sections.length}
      prevModuleHref="../module3"
      prevModuleLabel="Electrical installations technology"
      nextModuleHref="../module5"
      nextModuleLabel="Communicate with others"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Module 4 is the unit where the theory finally meets a pair of pliers. Modules
            1, 2 and 3 gave you the law, the science and the technology — this one walks
            you through actually picking up the tools, preparing the workspace, fixing
            the kit, terminating it correctly, bonding the services and proving the lot
            is safe before you energise.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            <span className="text-white font-medium">Section 1</span> is the toolbox —
            hand tools, power tools and the safety checks that keep them on site.{' '}
            <span className="text-white font-medium">Section 2</span> is everything you
            do before the first cable comes off the drum — hazard spotting, PPE
            selection, access equipment.{' '}
            <span className="text-white font-medium">Section 3</span> is the install
            itself, from drawings through marking out and fixing to wiring, terminating
            and JIB safe isolation.{' '}
            <span className="text-white font-medium">Section 4</span> covers main
            bonding to the incoming services — sizes, clamps and the continuity test
            that proves it.{' '}
            <span className="text-white font-medium">Section 5</span> is the visual
            inspection of a dead installation, and{' '}
            <span className="text-white font-medium">Section 6</span> is the dead test
            sequence — continuity, ring final, IR, polarity, functionality and
            recording.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end of Module 4 you should be able to plan, install, terminate, bond,
            inspect and dead-test a small installation to a standard a competent electrician
            would happily sign off.
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
