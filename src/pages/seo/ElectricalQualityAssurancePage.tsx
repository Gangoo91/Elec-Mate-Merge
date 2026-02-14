import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Award,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  BookOpen,
  Shield,
  Building,
  Brain,
  Eye,
  Target,
  AlertTriangle,
  DollarSign,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Electrical Quality Assurance | QA on Site Guide';
const PAGE_DESCRIPTION =
  'Complete guide to electrical quality assurance on construction sites. Inspection and test plans (ITPs), snagging, quality documentation, client acceptance, witness and hold points, NCRs, and how to build a QA system that delivers right-first-time installations.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Quality Assurance', href: '/guides/electrical-quality-assurance' },
];

const tocItems = [
  { id: 'what-is-qa', label: 'What Is Quality Assurance?' },
  { id: 'inspection-test-plans', label: 'Inspection and Test Plans (ITPs)' },
  { id: 'hold-and-witness-points', label: 'Hold and Witness Points' },
  { id: 'snagging', label: 'Snagging Process' },
  { id: 'quality-documentation', label: 'Quality Documentation' },
  { id: 'non-conformance', label: 'Non-Conformance Reports (NCRs)' },
  { id: 'client-acceptance', label: 'Client Acceptance' },
  { id: 'building-qa-culture', label: 'Building a QA Culture' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Quality assurance (QA) is a systematic process for ensuring electrical installations are completed correctly the first time — it is proactive prevention, not reactive inspection. QA catches problems during installation, before they become expensive defects at handover.',
  'Inspection and Test Plans (ITPs) define the quality checks at every stage of the electrical installation, specifying what is checked, when, by whom, and to what standard. Every commercial electrical project should have an ITP.',
  'Hold points and witness points are critical QA mechanisms — hold points stop work until the inspection is passed, while witness points offer the client the opportunity to inspect but do not stop work if the client does not attend.',
  'Effective snagging requires a systematic walk-through of every area, checking every aspect of the installation against the specification, drawings, and BS 7671. A thorough internal snag before the client inspection dramatically reduces defect lists.',
  'Elec-Mate supports quality assurance with professional testing and certification tools, digital documentation that provides evidence of compliance, and AI-powered features that generate the supporting documentation QA systems require.',
];

const faqs = [
  {
    question: 'What is the difference between quality assurance and quality control?',
    answer:
      'Quality assurance (QA) and quality control (QC) are complementary but distinct concepts. Quality assurance is the systematic process of preventing defects — it is about building quality into the work through planning, training, procedures, and proactive checks during installation. QA asks: "Are we following the right process to ensure the result will be correct?" Quality control (QC) is the inspection and testing of the completed work to verify that it meets the required standard — it is about detecting defects after they have occurred. QC asks: "Does the finished product meet the specification?" A good quality management system uses both: QA prevents most defects from occurring in the first place, and QC catches any that slip through. On electrical installations, QA includes activities such as reviewing designs before installation, checking materials before use, monitoring installation methods, and conducting progressive inspections. QC includes testing circuits, verifying readings against required values, and visual inspection of completed work. A project that relies only on QC (testing at the end) will always have more rework than one that also implements QA (checking throughout).',
  },
  {
    question: 'What is an Inspection and Test Plan for electrical work?',
    answer:
      'An Inspection and Test Plan (ITP) is a document that defines the quality checks to be carried out at each stage of the electrical installation. It lists every activity (containment installation, cable pulling, termination, testing, commissioning), the quality check associated with each activity, the acceptance criteria, who carries out the check, the frequency of checking, whether the check is a hold point or witness point, and the documentation required to evidence compliance. For example, the ITP for cable installation might specify: visual inspection of containment before cables are pulled (check route matches drawings, fixings are adequate, fire barriers are in place); inspection of cables before pulling (correct type and size per the cable schedule); inspection during pulling (correct bending radii, adequate support, no damage to sheath); and inspection after pulling (cables dressed, labelled, excess cut back). Each check has a pass/fail criterion and requires documented sign-off. The ITP is agreed with the client or principal contractor before work begins and provides a shared framework for quality expectations throughout the project.',
  },
  {
    question: 'What is a hold point in construction QA?',
    answer:
      'A hold point is a mandatory pause in the work where construction must stop until the relevant quality inspection has been carried out and the result has been formally accepted. Work cannot proceed past a hold point without documented approval from the specified authority (which may be the site manager, the client, or a third-party inspector). Hold points are set at critical stages where proceeding with defective work would be extremely expensive or impossible to rectify — for example, a hold point on containment before ceiling panels are installed ensures the containment is correct before it becomes inaccessible. A hold point on a main switchboard before it is energised ensures all connections are correct before the supply is applied. Hold points require advance notification (typically 24-48 hours) to allow the approving party to attend. If a hold point inspection fails, the defect must be rectified and the inspection repeated before work can proceed. Hold points are recorded in the ITP and the inspection results are documented as quality records.',
  },
  {
    question: 'How do you conduct an electrical snag walk?',
    answer:
      'An electrical snag walk is a systematic inspection of the completed installation to identify defects, incomplete work, and non-compliances before the client inspects. The process should be methodical: work through the installation room by room, board by board, checking every item against the specification, drawings, and BS 7671. Use a snag list template or app to record each item with its location, description, and priority. Typical snag items include: damaged or dirty accessories, incorrect faceplates, misaligned switch plates, missing labels or circuit charts, loose connections, cable ties left on visible containment, incomplete fire stopping, missing blanking plates on distribution boards, and luminaires with incorrect lamps. The internal snag should be conducted by someone other than the installer — fresh eyes catch more defects. Allow adequate time for rectification between the internal snag and the client inspection. A well-conducted internal snag that is properly closed out before the client arrives demonstrates professionalism and significantly reduces the formal defect list.',
  },
  {
    question: 'What documentation is needed for electrical quality assurance?',
    answer:
      'Electrical QA documentation forms the evidence trail that demonstrates the installation has been completed to the required standard. Key documents include: the Inspection and Test Plan (ITP) with completed check sheets showing inspections carried out and results; material delivery records confirming correct products received; progressive inspection records (containment sign-off, cable installation sign-off); test certificates (EIC, EICR) with schedule of test results for every circuit; commissioning records for lighting control, fire alarm, emergency lighting, BMS, and other systems; photographs of critical installations (concealed containment, fire barriers, main bonding connections); non-conformance reports (NCRs) and their close-out records; snag lists with evidence of rectification; and as-built drawings. These documents are compiled into the project quality file which forms part of the O&M documentation and health and safety file at handover. Many clients and principal contractors specify the exact documentation format and submission schedule in the contract.',
  },
  {
    question: 'How does Elec-Mate support quality assurance?',
    answer:
      'Elec-Mate supports the QA process through several integrated features. The testing and certification tools (EIC, EICR, minor works certificates) produce BS 7671-compliant documentation that forms the core of the QA evidence package. The schedule of test results is generated automatically with clear, professional formatting that meets client expectations. The AI RAMS Generator creates method statements that include quality requirements for each work activity, supporting the ITP. The digital certificate management system tracks team qualifications, ensuring only competent persons carry out critical work. The professional PDF export feature produces documentation suitable for client review and project quality files. Cloud storage ensures all documentation is securely stored and accessible from any device, which is essential when working across multiple sites. For electrical contractors, having consistent, professional QA documentation differentiates you from competitors and builds client confidence.',
  },
];

const sections = [
  {
    id: 'what-is-qa',
    heading: 'What Is Quality Assurance in Electrical Work?',
    content: (
      <>
        <p>
          Quality assurance in electrical work is a systematic approach to ensuring that
          installations are completed correctly, safely, and in compliance with the specification
          and <SEOInternalLink href="/guides/bs7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
          from the outset. It is fundamentally about prevention — building quality into the process
          rather than trying to inspect quality into the finished product.
        </p>
        <p>
          On commercial and industrial projects, quality assurance is not optional. Clients,
          principal contractors, and consulting engineers expect electrical contractors to operate a
          documented quality management system that includes inspection and test plans, hold points,
          progressive inspections, and comprehensive documentation. The cost of rework on a large
          project — ripping out and reinstalling defective work — can consume the entire profit
          margin and more. QA prevents this by catching problems early when they are cheap and
          simple to fix.
        </p>
        <p>
          For smaller electrical businesses working on domestic and light commercial projects, QA
          may seem like overkill. But the principles still apply: check your work as you go, use the
          right materials, follow the specification, test thoroughly, and document everything. The
          electricians who produce the best work are those who have internalised QA thinking, even
          if they do not use the formal terminology.
        </p>
        <p>
          This guide covers the formal QA processes used on commercial projects, but the underlying
          principles — plan, check, document, improve — apply to electrical work at every scale.
        </p>
      </>
    ),
  },
  {
    id: 'inspection-test-plans',
    heading: 'Inspection and Test Plans (ITPs)',
    content: (
      <>
        <p>
          An Inspection and Test Plan (ITP) is the backbone of the quality assurance system on a
          construction project. It defines what quality checks will be carried out, at what stage of
          the installation, by whom, to what standard, and how the results will be documented. Every
          commercial electrical project should have an ITP, and on most managed projects the client
          or principal contractor will require one.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical ITP Activities for Electrical Work
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Material receipt inspection</strong> — Verify
                delivered materials match the order and specification. Check for damage. Record
                batch numbers for critical items (cables, switchgear).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Containment installation</strong> — Check routes
                match drawings, fixing centres are correct, joints and bends are properly formed,
                fire barriers are installed, and supports are adequate. This is often a hold point
                before ceiling panels are installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Cable installation</strong> — Correct cable type
                and size per the schedule, correct bending radii maintained, cables labelled at both
                ends, no visible damage to sheath, segregation of power and data cables maintained.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Distribution board installation</strong> — Board
                level and plumb, cables dressed neatly, connections torqued correctly, circuit chart
                completed and accurate, earth and neutral bars correctly connected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Termination and connection</strong> — Correct
                termination technique, conductor stripped to correct length, no exposed copper
                outside the terminal, connections tight and secure. Often a hold point before
                energisation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">
                  <SEOInternalLink href="/guides/testing-sequence">Testing</SEOInternalLink>
                </strong>{' '}
                — Full BS 7671 testing sequence: continuity, insulation resistance, polarity, earth
                fault loop impedance, PFC, and RCD operation. Results recorded on schedule of test
                results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Commissioning</strong> — System-level
                verification that everything works as intended. Lighting control, fire alarm
                interface, emergency lighting, BMS integration.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The ITP is a living document that is updated as the project progresses. Check sheets are
          completed and signed off at each stage, creating an evidence trail that demonstrates the
          installation was built correctly. This evidence is invaluable in the event of a dispute or
          defect claim.
        </p>
      </>
    ),
  },
  {
    id: 'hold-and-witness-points',
    heading: 'Hold Points and Witness Points',
    content: (
      <>
        <p>
          Hold points and witness points are quality control mechanisms built into the ITP that
          provide formal checkpoints during the installation process. They ensure that critical work
          is inspected and approved before being covered up or built upon.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mt-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Hold Points</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              A hold point is a mandatory stop in the work. Construction cannot proceed past this
              point until the inspection has been carried out and formally approved. Hold points are
              set at critical stages where proceeding with a defect would be very expensive to
              rectify — for example, containment above a ceiling before the ceiling panels are
              installed, or connections in a distribution board before energisation. The contractor
              must give notice (typically 24-48 hours) before a hold point is reached, and the
              approving party must attend and sign off before work continues.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Witness Points</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              A witness point is an opportunity for the client or their representative to observe
              the inspection, but it does not stop work if they do not attend. The contractor gives
              notice that the inspection will take place, and the client may attend if they wish. If
              the client does not attend, the contractor carries out the inspection, records the
              results, and proceeds. Witness points are used for less critical activities where the
              client wants visibility but where a mandatory stop would unreasonably delay the
              programme.
            </p>
          </div>
        </div>
        <p className="mt-6">
          Typical hold points for electrical work include: containment complete before concealment
          (ceiling panels, plasterboard), distribution board connections complete before
          energisation, fire stopping complete before ceiling closure, and testing complete before
          commissioning. Witness points might include cable pulling, accessory installation, and
          luminaire installation. The specific hold and witness points are defined in the ITP and
          agreed with the client before work begins.
        </p>
      </>
    ),
  },
  {
    id: 'snagging',
    heading: 'The Snagging Process',
    content: (
      <>
        <p>
          Snagging is the process of identifying and rectifying defects in the completed
          installation before formal handover. A thorough, disciplined snagging process is the final
          quality gate that ensures the installation is presented to the client in the best possible
          condition.
        </p>
        <p>
          The most effective approach is to conduct an internal snag before the client or their
          representative inspects. The internal snag should be carried out by someone other than the
          person who installed the work — fresh eyes catch more defects. Work through the
          installation systematically: area by area, room by room, board by board.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Common Electrical Snag Items</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Damaged or dirty faceplates (scratches, paint splashes, plaster marks)</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Misaligned switch plates and socket outlets (not level, not square)</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Missing or incorrect labels on distribution boards and accessories</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Visible cable ties on exposed containment (should be trimmed or removed)</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Incomplete fire stopping around cable penetrations</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Missing blanking plates on unused ways in distribution boards</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Luminaires with incorrect lamp type or colour temperature</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOInternalLink href="/guides/emergency-lighting-certificate">
                  Emergency lighting
                </SEOInternalLink>{' '}
                legends missing or incorrectly positioned
              </span>
            </li>
          </ul>
        </div>
        <p>
          Each snag item should be recorded with its exact location, a clear description, and a
          photograph if the defect is not immediately obvious. Assign each item to a specific person
          for rectification and set a completion date. Track close-out to ensure every item is
          resolved before the client inspection.
        </p>
      </>
    ),
  },
  {
    id: 'quality-documentation',
    heading: 'Quality Documentation',
    content: (
      <>
        <p>
          Quality documentation is the evidence trail that proves the installation was built
          correctly. Without documentation, quality assurance is just a verbal claim. With proper
          documentation, it is a demonstrable fact that protects you professionally and
          contractually.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Test Certificates</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              The{' '}
              <SEOInternalLink href="/guides/eic-certificate">
                Electrical Installation Certificate (EIC)
              </SEOInternalLink>{' '}
              and schedule of test results form the core QA documentation for any new installation.
              Every circuit must be tested in accordance with BS 7671 Chapter 64, with results
              recorded on the schedule of test results. The test results provide objective evidence
              that the installation meets the required standard. For additions and alterations, a{' '}
              <SEOInternalLink href="/guides/minor-works-certificate">
                minor works certificate
              </SEOInternalLink>{' '}
              serves the same purpose.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">ITP Check Sheets</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Completed ITP check sheets, signed and dated by the person who carried out the
              inspection, provide evidence that progressive quality checks were carried out
              throughout the installation. These demonstrate that the QA system was actively
              implemented, not just documented on paper. Hold point sign-off sheets with client or
              engineer counter-signatures are particularly important evidence.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">As-Built Records</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              As-built drawings showing the final installed arrangement (cable routes, equipment
              locations, distribution board schedules) are essential quality documents. They record
              what was actually built, which may differ from the design drawings due to site
              changes, variations, and coordination adjustments. As-built drawings should be updated
              continuously throughout the project, not compiled at the end from memory.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Photographic Records</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Photographs of critical installations before they are concealed — containment above
              ceilings, cables in walls before plastering, fire stopping, main bonding connections —
              provide evidence that cannot be obtained after the event. Date-stamped photographs are
              powerful evidence in the event of a defect claim or dispute. Many quality management
              systems now require photographic evidence at specified stages.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Professional quality documentation with Elec-Mate"
          description="Elec-Mate produces BS 7671-compliant test certificates and schedules of test results that form the core of your quality documentation package. Professional PDF export, cloud storage, and accessible from any device on site."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'non-conformance',
    heading: 'Non-Conformance Reports (NCRs)',
    content: (
      <>
        <p>
          A non-conformance report (NCR) is a formal document raised when work does not meet the
          specified standard. NCRs are not punishment — they are a quality management tool that
          ensures defects are formally recorded, investigated, rectified, and closed out in a
          controlled manner.
        </p>
        <p>
          When a non-conformance is identified (by the contractor's own QA process, by the client,
          or by a third-party inspector), an NCR is raised describing the defect, its location, the
          standard it fails to meet, and the proposed corrective action. The corrective action is
          implemented, verified, and the NCR is formally closed out with documented evidence that
          the defect has been rectified.
        </p>
        <p>
          NCRs also serve a preventive purpose. By analysing NCR trends (what types of defects keep
          recurring, which teams produce them, which activities generate the most issues), you can
          identify the root causes and implement systemic improvements to prevent recurrence. A
          contractor who raises, tracks, and learns from NCRs demonstrates a mature quality culture
          that clients value.
        </p>
        <p>
          On commercial projects, the principal contractor and the client will raise NCRs against
          subcontractors (including the electrical contractor) for defective work. The electrical
          contractor must respond promptly, rectify the defect, and close out the NCR within the
          agreed timescale. Failure to close out NCRs can result in contract penalties, withholding
          of payment, and reputational damage. Having your own internal QA process that catches
          defects before the client does significantly reduces the number of external NCRs raised
          against you.
        </p>
      </>
    ),
  },
  {
    id: 'client-acceptance',
    heading: 'Client Acceptance',
    content: (
      <>
        <p>
          Client acceptance is the formal process by which the client (or their representative)
          inspects the completed installation, reviews the documentation, and confirms that the work
          meets the contractual requirements. This is the moment of truth — the point where the
          quality of your work is judged.
        </p>
        <p>
          A well-managed client acceptance process starts with a thorough internal snag and
          rectification (as described above), followed by compilation of all quality documentation
          into a complete package. The client acceptance inspection should be preceded by an offer
          to the client's representative to review the documentation in advance, so they can focus
          the physical inspection on areas of concern rather than conducting a blind walk-through.
        </p>
        <p>
          During the acceptance inspection, the client or their engineer will walk the installation,
          checking against the specification and drawings. They will review the test certificates
          and schedules of test results. They will note any defects on a snag list, which becomes
          the basis for the defect rectification period. The goal is to present the installation in
          a condition where the snag list is minimal — a short snag list reflects well on the
          contractor and builds confidence for future projects.
        </p>
        <p>
          After rectification of the snag items, the client signs off the acceptance, and the
          defects liability period begins (typically 12 months). During this period, the contractor
          is responsible for rectifying any latent defects that emerge. The quality of the
          installation during the defects period is the ultimate measure of the effectiveness of the
          QA system.
        </p>
        <SEOAppBridge
          title="Documentation that impresses clients"
          description="Elec-Mate produces professional, BS 7671-compliant certification and test documentation that demonstrates quality. Present your work with confidence. Digital storage means you can retrieve any certificate instantly when clients ask."
          icon={Award}
        />
      </>
    ),
  },
  {
    id: 'building-qa-culture',
    heading: 'Building a Quality Assurance Culture',
    content: (
      <>
        <p>
          A QA system is only as effective as the people who implement it. The best ITPs,
          procedures, and documentation templates are worthless if the team does not believe in
          quality and does not follow the processes. Building a quality culture requires leadership,
          training, and consistent reinforcement.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Lead by Example</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Site managers and foremen set the standard. If management cuts corners, the team will
              too. If management insists on quality, inspects work regularly, and takes pride in a
              well-built installation, the team follows suit. Quality culture starts at the top and
              must be demonstrated daily, not just spoken about in toolbox talks.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Train Your Team</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Every electrician should understand what "good" looks like and why quality matters.
              Briefings at the start of each activity — showing the specification requirements, the
              expected standard, and examples of acceptable and unacceptable work — set clear
              expectations. New starters and apprentices need particular attention, as they are
              forming habits that will last their entire career. Investment in{' '}
              <SEOInternalLink href="/guides/cpd-for-electricians">
                training and CPD
              </SEOInternalLink>{' '}
              pays dividends in quality.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Right First Time</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              The "right first time" mentality is the foundation of quality culture. Every activity
              should be done correctly the first time, eliminating the need for rework. Rework is
              not just expensive — it demoralises the team and consumes programme time. Encouraging
              electricians to take pride in their work and to view quality as a personal standard,
              not an imposed requirement, is the goal. Recognise and praise good workmanship
              publicly.
            </p>
          </div>
        </div>
        <p className="mt-6">
          A strong quality culture is a competitive advantage. Electrical contractors with a
          reputation for right-first-time installation, professional documentation, and minimal snag
          lists win more work, command better prices, and build lasting client relationships.
          Quality is not a cost — it is an investment that pays for itself many times over.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/eic-certificate',
    title: 'EIC Certificate Guide',
    description: 'How to complete an Electrical Installation Certificate correctly.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence',
    title: 'Testing Sequence Guide',
    description: 'The correct BS 7671 testing sequence from continuity to RCD testing.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-site-manager',
    title: 'Electrical Site Manager Guide',
    description: 'Role, responsibilities, and career path for electrical site managers.',
    icon: Building,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-project-planning',
    title: 'Electrical Project Planning',
    description: 'From tender to completion — planning and managing electrical projects.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/bs7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to the current UK wiring regulations and amendments.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/tools/rams-generator',
    title: 'AI RAMS Generator',
    description: 'Generate method statements with quality requirements built in.',
    icon: Brain,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalQualityAssurancePage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-08-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Guide"
      badgeIcon={Award}
      heroTitle={
        <>
          Electrical Quality Assurance: <span className="text-yellow-400">QA on Site Guide</span>
        </>
      }
      heroSubtitle="The complete guide to quality assurance for electrical installations on construction sites. Inspection and test plans, hold and witness points, snagging, quality documentation, non-conformance management, client acceptance, and building a QA culture that delivers right-first-time installations."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Professional quality documentation tools"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for BS 7671-compliant certification, professional test documentation, and digital record-keeping. Build your reputation for quality. 7-day free trial, cancel anytime."
    />
  );
}
