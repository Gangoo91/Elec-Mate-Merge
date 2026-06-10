import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Scale,
  BookOpen,
  Shield,
  AlertTriangle,
  FileCheck2,
  GraduationCap,
  ClipboardCheck,
  ShieldCheck,
  Brain,
  Zap,
  UserCheck,
  Briefcase,
  Lock,
  Camera,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Electricity at Work', href: '/guides/electricity-at-work-regulations' },
];

const tocItems = [
  { id: 'what-are-eawr', label: 'What Are the Regulations?' },
  { id: 'who-they-apply-to', label: 'Who They Apply To' },
  { id: 'regulation-4', label: 'Regulation 4: Systems' },
  { id: 'regulation-12', label: 'Regulation 12: Working on Equipment' },
  { id: 'regulation-14', label: 'Regulation 14: Working Near Live Conductors' },
  { id: 'regulation-16', label: 'Regulation 16: Competence' },
  { id: 'enforcement-penalties', label: 'Enforcement and Penalties' },
  { id: 'how-elec-mate-helps', label: 'How Elec-Mate Helps' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electricity at Work Regulations 1989 (EAWR) are the primary UK legislation governing electrical safety in the workplace, enforced by the Health and Safety Executive (HSE).',
  'Regulation 4 requires all electrical systems to be constructed, maintained, and used so as to prevent danger — this underpins the requirement for periodic inspection and testing (EICR).',
  'Regulation 12 requires adequate precautions when working on equipment made dead — the legal basis for safe isolation procedures.',
  'Regulation 14 prohibits working on or near live conductors unless it is unreasonable for it to be dead, it is reasonable to work live, and suitable precautions are taken.',
  'Regulation 16 requires that persons carrying out electrical work must be competent — or supervised by a competent person — to prevent danger and injury.',
  'BS 7671:2018+A4:2026 (A4) tightened the construction requirements that underpin Regulation 4: AFDDs are mandatory for socket-outlet final circuits rated up to 32 A in HRRBs, HMOs, purpose-built student accommodation and care homes (recommended elsewhere) under Reg 421.1.7, and 30 mA RCD protection is required for AC final circuits supplying luminaires in domestic premises under Reg 411.3.4.',
];

const faqs = [
  {
    question: 'What is the difference between the Electricity at Work Regulations and BS 7671?',
    answer:
      'The Electricity at Work Regulations 1989 (EAWR) are law — they are made under the Health and Safety at Work Act 1974 and are legally binding. Breach of the EAWR is a criminal offence that can result in prosecution, fines, and imprisonment. BS 7671 (the IET Wiring Regulations) is a British Standard — it is a technical standard that describes how electrical installations should be designed, installed, and tested. BS 7671 is not itself law, but it is recognised as the standard of good practice. If an installation complies with BS 7671, it is generally accepted as meeting the requirements of the EAWR. However, the EAWR are broader in scope — they cover all electrical work activities (not just installation work) and apply to all workplaces. An electrician who installs wiring in accordance with BS 7671 but uses unsafe working practices (for example, working live without justification) could still be prosecuted under the EAWR.',
  },
  {
    question: 'Can I be personally prosecuted under the Electricity at Work Regulations?',
    answer:
      'Yes. The EAWR impose duties not only on employers but also on employees and self-employed persons. Regulation 3 states that duties are imposed on every employer, every self-employed person, and every employee. As an electrician — whether employed or self-employed — you have a personal legal duty to comply with the regulations. If you carry out work that breaches the regulations and causes or could cause danger, you can be personally prosecuted by the HSE. In practice, prosecutions usually follow serious incidents — electrical accidents, fires, or fatalities. The HSE will investigate whether the work was carried out by a competent person, whether safe isolation was followed, whether the equipment was suitable, and whether the risk assessment was adequate. An electrician who takes shortcuts (such as working live without justification) is personally liable.',
  },
  {
    question: 'Does Regulation 14 ever allow live working?',
    answer:
      'Yes, but only in very limited circumstances. Regulation 14 establishes a three-part test: (1) it must be unreasonable in all the circumstances for the conductor to be dead, (2) it must be reasonable in all the circumstances for the work to be carried out on or near a live conductor, and (3) suitable precautions must be taken to prevent injury. All three conditions must be met simultaneously. The classic example of justified live working is fault finding on a control panel where the fault can only be identified by observing the circuit in operation. Even then, the electrician must carry out a risk assessment, use appropriate test equipment and PPE, have barriers in place, and have a second competent person present. Live working to save time is never justified — "it would take too long to isolate" is not a valid reason under the regulations.',
  },
  {
    question: 'How does Regulation 16 define competence?',
    answer:
      'Regulation 16 requires that no person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or injury, unless they possess such knowledge or experience, or are under such degree of supervision as may be appropriate having regard to the nature of the work. The regulation does not define specific qualifications — it uses the broader concept of "technical knowledge or experience." In practice, competence for electrical work is demonstrated by a combination of relevant qualifications (C&G 2382, C&G 2391, NVQ Level 3 Electrical Installation), practical experience, and registration with a competent person scheme (NICEIC, NAPIT, ELECSA). An apprentice is not independently competent but can carry out electrical work under the direct supervision of a competent person. The level of supervision must be proportionate to the risk — high-risk work requires closer supervision.',
  },
  {
    question: 'Do the Electricity at Work Regulations apply to domestic properties?',
    answer:
      'The EAWR apply to "workplaces," which is defined broadly. Any premises where a person is at work — including a private dwelling where electrical work is being carried out — is a workplace for the purpose of the regulations. This means that when you (as an electrician) are working in a domestic property, the EAWR apply to your work activities. You must follow safe isolation procedures (Regulation 12), you must not work live unless justified (Regulation 14), and you must be competent (Regulation 16). The EAWR do not apply to the homeowner in their own home for their own domestic activities — a homeowner changing a light bulb is not "at work." But any electrical work carried out by a professional electrician in a domestic property is covered by the regulations because the electrician is at work.',
  },
  {
    question:
      'What records must be kept to demonstrate compliance with the Electricity at Work Regulations?',
    answer:
      'The EAWR do not specify a particular set of records that must be kept, but the HSE strongly recommends maintaining documentation that demonstrates the electrical systems are safe and maintained as required by Regulation 4. For workplaces, this means keeping records of periodic inspection and testing (EICRs), maintenance records for fixed electrical equipment, records of portable appliance testing (PAT), risk assessments for electrical work, any permits to work issued, and training and competence records for personnel carrying out electrical work. For electricians, the EIC or MEIWC issued at the completion of installation work is the primary documentary evidence that the installation was constructed and tested in accordance with BS 7671. Retaining copies of these certificates is important for demonstrating EAWR compliance in the event of an incident or HSE inspection.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step guide to safe isolation under Regulation 12, including GS38 test equipment requirements and lock-off procedures.',
    icon: Lock,
    category: 'Guide',
  },
  {
    href: '/guides/risk-assessment-electrical-work',
    title: 'Risk Assessment for Electrical Work',
    description:
      'How to carry out a risk assessment for electrical work, including live working justification under Regulation 14.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/cdm-2015-electricians',
    title: 'CDM 2015 for Electricians',
    description:
      'Construction (Design and Management) Regulations 2015 duties for electrical contractors working on construction sites.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Landlord EICR requirements under the Electrical Safety Standards 2020 — the regulations that sit alongside the EAWR.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/permit-to-work-electrician',
    title: 'Permit to Work (Electrical)',
    description:
      'How to implement a permit-to-work system for electrical work, as required for high-risk activities under the EAWR.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/training/health-and-safety',
    title: 'Health and Safety Course',
    description:
      'Study the EAWR, CDM 2015, and health and safety requirements with structured training modules on Elec-Mate.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-are-eawr',
    heading: 'The Electricity at Work Regulations 1989: What They Are',
    content: (
      <>
        <p>
          The Electricity at Work Regulations 1989 (EAWR) are a set of statutory regulations made
          under the Health and Safety at Work Act 1974. They are the primary legislation governing
          electrical safety in the workplace in England, Scotland, and Wales. The regulations are
          enforced by the Health and Safety Executive (HSE) and local authority environmental health
          departments.
        </p>
        <p>
          The EAWR contain 33 regulations covering all aspects of electrical safety at work, from
          the construction and maintenance of electrical systems to the conduct of work activities
          on or near electrical equipment. They apply to all workplaces, all employers, all
          employees, and all self-employed persons.
        </p>
        <p>
          For electricians, the EAWR are the legal foundation of everything you do. When you follow{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">
            safe isolation procedures
          </SEOInternalLink>
          , you are complying with Regulation 12. When you carry out an{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">EICR</SEOInternalLink>, you are helping
          the employer or landlord comply with Regulation 4. When you refuse to work live without
          justification, you are complying with Regulation 14. Understanding these regulations is
          not optional — it is a legal duty.
        </p>
        <p>
          The HSE publishes Memorandum of Guidance on the Electricity at Work Regulations 1989
          (HSR25), which provides detailed interpretation and practical guidance on each regulation.
          This memorandum is essential reading for any electrician who wants to understand the legal
          basis of their work.
        </p>
      </>
    ),
  },
  {
    id: 'who-they-apply-to',
    heading: 'Who the Regulations Apply To',
    content: (
      <>
        <p>The EAWR have broad application. Regulation 3 defines the duty holders:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employers</strong> — must ensure that their employees are not exposed to
                danger from electrical systems or equipment. This includes providing safe systems of
                work, maintaining electrical installations, and ensuring employees are competent or
                supervised.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employed persons</strong> — have the same duties as employers in
                relation to their own safety and the safety of others who may be affected by their
                work. A self-employed electrician is personally responsible for complying with the
                EAWR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employees</strong> — must cooperate with their employer to comply with the
                regulations. An employee who deliberately breaches safe working practices (for
                example, bypassing a lock-off to re-energise a circuit) can be personally
                prosecuted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duty holders for premises</strong> — building owners, landlords, and
                managing agents have a duty under Regulation 4 to ensure that the fixed electrical
                installation in their premises is maintained in a safe condition.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulations apply to all workplaces — offices, factories, shops, construction sites,
          schools, hospitals, and any other premises where people are at work. They also apply to
          work carried out in domestic properties by professional tradespeople (because the
          tradesperson is "at work"). The regulations apply regardless of the voltage — from
          extra-low voltage control circuits to high-voltage distribution systems.
        </p>
      </>
    ),
  },
  {
    id: 'regulation-4',
    heading: 'Regulation 4: All Systems Must Prevent Danger',
    content: (
      <>
        <p>Regulation 4 is the cornerstone of the EAWR. It states:</p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <p className="text-white italic leading-relaxed">
            "All systems shall at all times be of such construction as to prevent, so far as is
            reasonably practicable, danger."
          </p>
          <p className="text-white mt-3 leading-relaxed">
            And: "As may be necessary to prevent danger, all systems shall be maintained so as to
            prevent, so far as is reasonably practicable, such danger."
          </p>
        </div>
        <p>
          This regulation has two parts. The first requires that electrical systems must be properly
          constructed — designed and installed to a standard that prevents danger. Compliance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> is
          the accepted way of demonstrating this.
        </p>
        <p>
          The second part requires ongoing maintenance to prevent danger. This is the legal basis
          for periodic inspection and testing — the{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">EICR</SEOInternalLink>. An installation
          that was safe when first installed can deteriorate over time due to wear, damage,
          environmental factors, and modifications. Periodic inspection identifies defects before
          they cause danger.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Construction</strong> — the installation must be designed and installed in
                accordance with a recognised standard (BS 7671). Cables must be correctly sized,
                protective devices must be correctly rated, earthing and bonding must be adequate,
                and RCDs must be installed where required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintenance</strong> — the installation must be periodically inspected and
                tested by a competent person. Defects must be rectified promptly, and records of
                inspections and tests must be kept. BS 7671 Regulation 652.1 requires that the
                frequency of periodic inspection and testing be determined having regard to the type
                of installation, its use and operation, the frequency and quality of maintenance,
                and the external influences to which it may be subjected — along with the results
                and recommendations of previous reports. The inspector&apos;s assessed interval
                always takes precedence over the indicative defaults below.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use</strong> — the installation must be used safely. Overloading circuits,
                using damaged equipment, and bypassing protective devices are all breaches of
                Regulation 4.
              </span>
            </li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10 my-4">
          <div className="bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-wide text-white/70">
            Indicative maximum periodic inspection intervals (assessed under Reg 652.1)
          </div>
          <table className="w-full text-left text-sm text-white">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-white/60">
              <tr>
                <th className="px-3 py-2 font-semibold">Installation type</th>
                <th className="px-3 py-2 font-semibold">Typical interval</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className="px-3 py-2">Domestic / owner-occupied dwelling</td>
                <td className="px-3 py-2">Up to 10 years (or change of occupancy)</td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className="px-3 py-2">Rented domestic accommodation</td>
                <td className="px-3 py-2">5 years (or change of occupancy)</td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className="px-3 py-2">Commercial premises</td>
                <td className="px-3 py-2">5 years (or change of occupancy)</td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className="px-3 py-2">Industrial premises</td>
                <td className="px-3 py-2">3 years</td>
              </tr>
            </tbody>
          </table>
          <p className="px-3 py-2 text-xs text-white/60 bg-white/[0.02] border-t border-white/10">
            Indicative guidance only — the inspector sets the actual interval under Reg 652.1.
            See the{' '}
            <SEOInternalLink href="/guides/eicr-for-landlords">EICR for landlords</SEOInternalLink>{' '}
            guide for the rented-sector statutory five-year requirement.
          </p>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/30 p-6 my-4">
          <p className="text-yellow-300 font-semibold mb-2">
            A4:2026 Update — New construction requirements
          </p>
          <p className="text-white text-sm leading-relaxed mb-2">
            BS 7671:2018+A4:2026 introduced two new requirements that directly affect Regulation 4
            compliance for new installations and EICRs:
          </p>
          <ul className="space-y-2 text-white text-sm">
            <li>
              <strong>Reg 421.1.7 — Arc Fault Detection Devices (AFDDs):</strong> AFDDs conforming
              to BS EN 62606 are now <em>mandatory</em> for single-phase AC final circuits supplying
              socket-outlets rated not exceeding 32 A in the four building types in the table below.
              For all other premises AFDDs are <em>recommended</em> for the same circuits. Where
              used, an AFDD must be placed at the origin of the circuit it protects.
            </li>
            <li>
              <strong>Reg 411.3.4 — RCD protection for luminaire circuits:</strong> Within domestic
              (household) premises, additional protection by an RCD with a rated residual operating
              current not exceeding 30 mA must now be provided for AC final circuits supplying
              luminaires. An RCBO rated at or below 30 mA satisfies this requirement.
            </li>
          </ul>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-left text-sm text-white">
              <thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-white/70">
                <tr>
                  <th className="px-3 py-2 font-semibold">Premises type (Reg 421.1.7)</th>
                  <th className="px-3 py-2 font-semibold">AFDD on socket circuits &le;32 A</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10 bg-red-900/20">
                  <td className="px-3 py-2">High rise residential buildings (HRRBs) — over 18 m or more than six storeys</td>
                  <td className="px-3 py-2 font-semibold text-red-300">Mandatory</td>
                </tr>
                <tr className="border-t border-white/10 bg-red-900/20">
                  <td className="px-3 py-2">Houses in Multiple Occupation (HMOs)</td>
                  <td className="px-3 py-2 font-semibold text-red-300">Mandatory</td>
                </tr>
                <tr className="border-t border-white/10 bg-red-900/20">
                  <td className="px-3 py-2">Purpose-built student accommodation</td>
                  <td className="px-3 py-2 font-semibold text-red-300">Mandatory</td>
                </tr>
                <tr className="border-t border-white/10 bg-red-900/20">
                  <td className="px-3 py-2">Care homes</td>
                  <td className="px-3 py-2 font-semibold text-red-300">Mandatory</td>
                </tr>
                <tr className="border-t border-white/10 bg-white/[0.02]">
                  <td className="px-3 py-2">All other premises (including standard dwellings)</td>
                  <td className="px-3 py-2 font-semibold text-yellow-300">Recommended</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white/70 text-xs mt-3">
            Source: BS 7671:2018+A4:2026 Regs 421.1.7 and 411.3.4
          </p>
        </div>
        <p>
          The phrase "so far as is reasonably practicable" means the duty is not absolute — but the
          burden is on the duty holder to show that it was not reasonably practicable to prevent the
          danger. In practice, this is a high bar. If a defect could have been identified by a
          periodic inspection that was not carried out, the duty holder will struggle to argue that
          they took all reasonably practicable steps.
        </p>
        <p>
          For landlords and building owners, Regulation 4 is further reinforced by statutory
          obligations requiring that electrical installations in rented premises are maintained in a
          safe condition. Periodic inspection and testing is the recognised means of satisfying that
          duty — as GN3 Chapter 3 (Reg 3.10) states, it is the established method for ensuring that
          electrical installations remain safe during use and under the duty holder&apos;s
          responsibility. See the{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">EICR for landlords</SEOInternalLink>{' '}
          guide for the specific statutory requirements that apply to the private rented sector.
        </p>
      </>
    ),
  },
  {
    id: 'regulation-12',
    heading: 'Regulation 12: Working on Equipment Made Dead',
    content: (
      <>
        <p>
          Regulation 12 requires that adequate precautions are taken to prevent electrical equipment
          from becoming live while work is being carried out on it. This is the legal foundation of
          the{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">
            safe isolation procedure
          </SEOInternalLink>{' '}
          that every electrician must follow.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolate</strong> — switch off and disconnect the circuit or equipment from
                all sources of electrical energy. This may require switching off the MCB, RCBO, or
                main switch, and confirming that no other source of supply can energise the circuit
                (for example, a generator or solar PV inverter).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Secure the isolation</strong> — lock off the isolating device with a
                personal padlock (lock-off kit) so that nobody else can re-energise the circuit.
                Apply a warning notice: "Danger — Do not switch on." Only the person who applied the
                lock should remove it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prove dead</strong> — use an approved voltage indicator (complying with GS38
                requirements) to test between all conductors (line-line, line-neutral, line-earth,
                neutral-earth) to confirm the circuit is dead. Test the voltage indicator on a known
                live source before and after proving dead to confirm the tester is working
                correctly. This is the "test — prove dead — test" procedure.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The safe isolation procedure is non-negotiable. Every electrical fatality investigation by
          the HSE examines whether safe isolation was followed. Electricians who skip steps — not
          locking off, not proving dead, using a non-compliant voltage tester — are personally
          liable if an accident occurs. The procedure takes only a few minutes but it could save
          your life.
        </p>
        <SEOAppBridge
          title="Safe isolation training and procedures"
          description="Elec-Mate's training courses include detailed safe isolation procedure modules covering GS38 test equipment, lock-off requirements…"
          icon={Lock}
        />
      </>
    ),
  },
  {
    id: 'regulation-14',
    heading: 'Regulation 14: Working Near Live Conductors',
    content: (
      <>
        <p>
          Regulation 14 is one of the most important — and most frequently misunderstood —
          regulations. It states that no person shall work on or near a live conductor (other than
          one suitably covered with insulating material) unless:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condition 1:</strong> It is unreasonable in all the circumstances for the
                conductor to be dead. For example, if de-energising the circuit would cause a
                greater danger than working live (such as shutting down life-support equipment in a
                hospital).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condition 2:</strong> It is reasonable in all the circumstances for the work
                to be carried out on or near the live conductor. The work must be of a nature that
                justifies live working — typically fault finding, testing, or commissioning that
                requires the circuit to be energised.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condition 3:</strong> Suitable precautions (including, where necessary, the
                provision of suitable protective equipment) have been taken to prevent injury. This
                includes{' '}
                <SEOInternalLink href="/guides/risk-assessment-electrical-work">
                  risk assessments
                </SEOInternalLink>
                , GS38-compliant test equipment, insulated tools, barriers, PPE, and a competent
                second person present.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All three conditions must be satisfied simultaneously. The crucial point is that "saving
          time" or "convenience" is never a valid justification for live working. The HSE's guidance
          is clear: if the circuit can be made dead, it must be made dead. Live working is a last
          resort, not a shortcut.
        </p>
        <p>
          In practice, the most common justified live working for electricians is fault finding and
          testing on control circuits where the fault can only be identified with the circuit
          energised. Even then, the electrician must document the justification in a risk
          assessment, use GS38-compliant test equipment, wear appropriate PPE, use insulated tools,
          and have a second competent person present.
        </p>
      </>
    ),
  },
  {
    id: 'regulation-16',
    heading: 'Regulation 16: Competence',
    content: (
      <>
        <p>
          Regulation 16 states that no person shall be engaged in any work activity where technical
          knowledge or experience is necessary to prevent danger or, where appropriate, injury,
          unless they possess such technical knowledge or experience, or are under such degree of
          supervision as may be appropriate having regard to the nature of the work.
        </p>
        <p>
          This regulation establishes the legal principle of competence. It does not prescribe
          specific qualifications — instead, it focuses on whether the person has the knowledge and
          experience to carry out the work safely. However, in practice, competence for electrical
          installation work is demonstrated by:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — C&G 2382 (18th Edition IET Wiring Regulations),
                C&G 2391 (Inspection and Testing), NVQ Level 3 in Electrical Installation, and
                relevant specialist qualifications (solar PV, EV charging, fire alarm).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experience</strong> — practical experience of carrying out the type of work
                in question. A newly qualified electrician with limited experience may be competent
                for routine domestic work but not for complex industrial installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Registration</strong> — registration with a competent person scheme (NICEIC,
                NAPIT, ELECSA) demonstrates that the electrician's competence has been independently
                assessed and is regularly reviewed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CPD</strong> — continuing professional development ensures that competence
                is maintained as standards, technology, and regulations evolve. Elec-Mate provides
                46+ training courses covering{' '}
                <SEOInternalLink href="/guides/cpd-for-electricians">
                  CPD requirements
                </SEOInternalLink>{' '}
                for electricians.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For apprentices, Regulation 16 allows them to carry out electrical work under supervision.
          The level of supervision must be proportionate to the risk of the work and the experience
          of the apprentice. High-risk work (live working, work in hazardous areas) requires direct,
          close supervision. Lower-risk work (chasing walls, pulling cables) may require only
          general supervision with periodic checks.
        </p>
      </>
    ),
  },
  {
    id: 'enforcement-penalties',
    heading: 'Enforcement and Penalties',
    content: (
      <>
        <p>
          The EAWR are enforced by the Health and Safety Executive (HSE) and, in some premises, by
          local authority environmental health officers. Enforcement action can range from informal
          advice to criminal prosecution:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Improvement notices</strong> — require the duty holder to remedy a
                contravention within a specified period. For example, an employer who has not
                arranged periodic inspection and testing of the electrical installation may be
                served with an improvement notice requiring them to do so.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prohibition notices</strong> — require the duty holder to immediately stop a
                dangerous activity. For example, if an HSE inspector finds an electrician working
                live without justification, they can issue a prohibition notice requiring the work
                to stop immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prosecution</strong> — serious breaches can result in criminal prosecution.
                Following the Legal Aid, Sentencing and Punishment of Offenders Act 2012 (effective
                2015), fines are unlimited in both the magistrates&apos; court and the Crown Court.
                The magistrates&apos; court can also impose imprisonment of up to 12 months; the
                Crown Court up to 2 years. Both employers and individual employees can be
                prosecuted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Corporate manslaughter</strong> — where a gross breach of health and safety
                duties results in a death, the organisation can be charged with corporate
                manslaughter under the Corporate Manslaughter and Corporate Homicide Act 2007.
                Individuals can be charged with gross negligence manslaughter.
              </span>
            </li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10 my-4">
          <table className="w-full text-left text-sm text-white">
            <thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-white/70">
              <tr>
                <th className="px-3 py-2 font-semibold">Enforcement route</th>
                <th className="px-3 py-2 font-semibold">Maximum fine</th>
                <th className="px-3 py-2 font-semibold">Maximum imprisonment</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className="px-3 py-2">Magistrates&apos; court (summary)</td>
                <td className="px-3 py-2">Unlimited</td>
                <td className="px-3 py-2">Up to 12 months</td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className="px-3 py-2">Crown Court (on indictment)</td>
                <td className="px-3 py-2">Unlimited</td>
                <td className="px-3 py-2">Up to 2 years</td>
              </tr>
            </tbody>
          </table>
          <p className="px-3 py-2 text-xs text-white/60 bg-white/[0.02] border-t border-white/10">
            Fines became unlimited following the Legal Aid, Sentencing and Punishment of Offenders
            Act 2012 (in force 2015). Both the organisation and named individuals can be prosecuted.
          </p>
        </div>
        <p>
          The HSE publishes annual statistics on electrical accidents and fatalities. Electrical
          contact is consistently one of the leading causes of workplace fatalities in the
          construction sector. Every fatality triggers an HSE investigation, and prosecution follows
          in the majority of cases where a breach of the EAWR contributed to the death.
        </p>
      </>
    ),
  },
  {
    id: 'how-elec-mate-helps',
    heading: 'How Elec-Mate Supports EAWR Compliance',
    content: (
      <>
        <p>
          Complying with the Electricity at Work Regulations requires a combination of competence,
          proper procedures, and documentation. Elec-Mate provides tools that support all three:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Health and Safety Agent</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe the job and the AI generates a risk assessment and method statement
                  (RAMS) covering EAWR requirements, safe isolation procedures, live working
                  justification (where applicable), and PPE requirements. Professional documents in
                  minutes, not hours.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  EICR Certificates — Regulation 4 Compliance
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete EICR certificates on your phone with the AI board scanner, voice test
                  entry, and defect code AI. Help employers and landlords comply with Regulation 4
                  by providing thorough periodic inspection reports with professional PDF output.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EAWR Training Course</h4>
                <p className="text-white text-sm leading-relaxed">
                  Study the EAWR with structured training modules covering every regulation, safe
                  isolation procedures, live working justification, and competence requirements.
                  Flashcards, mock exams, and EPA/AM2 simulators for apprentices preparing for
                  end-point assessment.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Briefcase className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Business Tools for Compliance Records</h4>
                <p className="text-white text-sm leading-relaxed">
                  Quoting, invoicing, expenses, and cash flow management — plus certificate storage
                  and delivery. Keep all your compliance documentation in one place. Send
                  certificates, RAMS, and reports to clients instantly from the app.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Compliance made simple"
          description="Elec-Mate's AI agents generate risk assessments and method statements. Digital certificates document Regulation 4 compliance."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricityAtWorkRegsPage() {
  return (
    <GuideTemplate
      title="Electricity at Work Regulations 1989: Electrician's Guide | Elec-Mate"
      description="Complete guide to the Electricity at Work Regulations 1989 for electricians and employers. Regulation 4 (systems &amp; EICR), Regulation 12 (safe isolation), Regulation 14 (live working), Regulation 16 (competence)."
      datePublished="2025-04-15"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations"
      badgeIcon={Scale}
      answerBox={{
        question: 'What are the Electricity at Work Regulations 1989?',
        answer:
          'The Electricity at Work Regulations 1989 (EAWR) are UK law made under the Health and Safety at Work Act 1974 and enforced by the HSE. They impose legal duties on employers, the self-employed and employees to prevent danger from electrical systems at work. The four regulations electricians rely on most are Reg 4 (safe systems), Reg 12 (working dead), Reg 14 (live working) and Reg 16 (competence).',
        detail:
          'Breach is a criminal offence. Following BS 7671 is the accepted way of showing an installation meets Reg 4, but the EAWR are broader and cover every electrical work activity, not just installation.',
      }}
      heroTitle={
        <>
          Electricity at Work Regulations 1989:{' '}
          <span className="text-yellow-400">What Every Electrician Must Know</span>
        </>
      }
      heroSubtitle="The Electricity at Work Regulations 1989 are the primary UK legislation governing electrical safety in the workplace. They impose legal duties on employers, employees, and self-employed persons. This guide explains the key regulations — Regulation 4, 12, 14, and 16 — and what they mean for your daily work."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the Electricity at Work Regulations"
      relatedPages={relatedPages}
      ctaHeading="Stay Compliant with the EAWR"
      ctaSubheading="AI risk assessments, digital EICR certificates, safe isolation training, and 46+ CPD courses. Elec-Mate helps you comply with every regulation. 7-day free trial, cancel anytime."
    />
  );
}
