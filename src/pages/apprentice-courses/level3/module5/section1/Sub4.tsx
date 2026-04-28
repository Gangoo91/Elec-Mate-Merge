/**
 * Module 5 · Section 1 · Subsection 4 — The scheme certification chain
 * Maps to C&G 2365-03 / Unit 304 / LO7 / AC 7.3, 7.4 + LO11 / AC 11.1
 *   AC 7.3 — "describe the certification process for a completed installation"
 *   AC 7.4 — "identify the responsibilities of different relevant personnel in relation to the certification process"
 *   AC 11.1 — "clarify the commissioning procedures with relevant persons"
 *
 * Layered depth: 2357 Unit 607 ELTK06 / AC 5.3
 *
 * The cert chain — installer signs EIC, scheme uploads to portal, building
 * control gets notified, customer pack handed over, scheme retains record.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'The scheme certification chain | Level 3 Module 5.1.4 | Elec-Mate';
const DESCRIPTION =
  'How a signed EIC moves through the scheme provider (NICEIC, NAPIT, Stroma) to building control under Part P, and how the duty cascade transfers responsibility from installer to client.';

const checks = [
  {
    id: 'm5-s1-sub4-part-p',
    question: 'Under Building Regulations Part P (England), notifiable electrical work in dwellings can be certified via:',
    options: [
      'Only paper notification to building control.',
      'Either (a) a registered competent person (member of an approved scheme like NICEIC, NAPIT, Stroma) self-certifying via their scheme, or (b) prior building control notification with a third-party inspection.',
      'Only by the owner of the property.',
      'Only by the local authority.',
    ],
    correctIndex: 1,
    explanation:
      'Part P designates certain electrical work in dwellings as notifiable to building control. The compliance route most contractors use is scheme membership — registered competent persons self-certify via their scheme, which then notifies building control on their behalf via the scheme portal. Alternative: prior notification to building control and a third-party inspection regime. Both routes produce a Building Regulations compliance certificate.',
  },
  {
    id: 'm5-s1-sub4-duty-cascade',
    question: 'The certificate hand-over completes a duty cascade. Which best describes it?',
    options: [
      'All duty stays with the installer forever.',
      'All duty transfers to the client and the installer is freed of all responsibility.',
      'The client/occupier becomes the EAWR Reg 4(2) duty holder for ongoing maintenance, while the installer retains a continuing duty for any defects in their work that come to light later.',
      'No duty exists once the certificate is signed.',
    ],
    correctIndex: 2,
    explanation:
      'Signing transfers the going-forward maintenance duty to the recipient — they are now responsible for keeping the installation safe in use. The installer\'s duty for the work as installed continues — if defects in their work emerge, they have a duty to act on notification. Both duties co-exist after sign-off.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A new circuit installed in a dwelling kitchen is notifiable under Part P. The contractor is a NICEIC-registered domestic installer. The compliance route is:',
    options: [
      'Apply to building control before starting.',
      'Self-certify via the NICEIC scheme — issue an EIC, log on the NICEIC portal, NICEIC notifies building control on behalf of the contractor and a Building Regulations Compliance Certificate is issued.',
      'No notification required for kitchen work.',
      'Get the homeowner to sign a waiver.',
    ],
    correctAnswer: 1,
    explanation:
      'Standard Part P workflow for scheme members: install the work, complete the EIC, log to the scheme portal within the required timeframe (typically 30 days), scheme handles notification to building control, scheme issues the Building Regulations Compliance Certificate. Notifiable work in dwellings includes new circuits, CU changes, and work in special locations (bathrooms, swimming pools).',
  },
  {
    id: 2,
    question: 'On a new build of a 12-flat block, the design has been done by a consulting engineer, the construction by Contractor A, and the inspection and testing by Contractor B. On the EIC, the signature blocks should be:',
    options: [
      'All signed by Contractor B.',
      'Design by the consulting engineer, Construction by Contractor A, Inspection & Testing by Contractor B — three separate signatories each taking responsibility for their part.',
      'All signed by the building owner.',
      'A single combined signature.',
    ],
    correctAnswer: 1,
    explanation:
      'EIC has three signature blocks for exactly this reason. On larger projects the design, construction, and verification competences are typically held by different bodies. Each signs for their portion. This means each takes individual professional responsibility — and any defect can be traced back to the responsible party. Avoid the temptation to sign for portions of the work you did not personally undertake or supervise.',
  },
  {
    id: 3,
    question: 'A client requests an EIC be back-dated to before the installation actually started. You should:',
    options: [
      'Date it as requested — the client is paying.',
      'Refuse. Date the EIC for the actual date of completion of inspection and testing. Back-dating a certificate is fraud and could be a criminal offence under EAWR plus a scheme suspension matter.',
      'Date it for some intermediate date as a compromise.',
      'Add a note saying the dates are approximate.',
    ],
    correctAnswer: 1,
    explanation:
      'EIC dates are not negotiable. They record when the inspection and testing was actually done. Back-dating a certificate is fraud — it falsely represents that verification was done when it was not. This exposes the signatory to criminal proceedings and scheme suspension. Where a client has a contractual or legal need for an earlier certificate, that is their problem, not yours to solve by falsifying dates.',
  },
  {
    id: 4,
    question: 'Scheme audit visits typically include:',
    options: [
      'Only paperwork inspection.',
      'On-site inspection of recent installations chosen by the scheme assessor, review of certification produced by the contractor, verification of test instrument calibration, and verification that the contractor\'s competent person remains competent.',
      'Only review of insurance documents.',
      'Only checks of company branding.',
    ],
    correctAnswer: 1,
    explanation:
      'Scheme audit (NICEIC, NAPIT, Stroma) is comprehensive. The assessor picks recent jobs, visits site to inspect the work, cross-references with the certification produced, checks instrument calibration certificates, and reviews the qualifying supervisor / competent person\'s ongoing professional development. Failing audit can result in suspension. The audit regime is the main mechanism that gives Part P self-certification credibility.',
  },
  {
    id: 5,
    question: 'When you hand over the EIC pack to the client, best practice includes:',
    options: [
      'Walking out without explanation.',
      'A brief walkthrough explaining what the certificate covers, where the consumer unit is, how to test the RCDs (using the test buttons), the recommended retest date, and where to find the documentation if they sell the property.',
      'Only handing over the headline EIC, not the schedules.',
      'Reading the regulations aloud.',
    ],
    correctAnswer: 1,
    explanation:
      'The hand-over is the moment the duty cascade transfers to the client. They become responsible for ongoing safety. Brief them on the key things: what was done, what the certificate covers, where to find it again, how to use the protective devices, when to seek a re-inspection. A 5-minute hand-over conversation prevents many "what does this all mean?" calls later and discharges your professional responsibility to the client.',
  },
  {
    id: 6,
    question: 'A client moves into a property and contacts you for an EICR. They have no historical EIC for the installation. Your approach:',
    options: [
      'Refuse the work without an EIC.',
      'Carry out the EICR based on what is on site. The EICR stands on its own — measurements and inspection findings against current BS 7671 standards. Note the absence of historical documentation as an observation in the report.',
      'Make up a plausible historical EIC.',
      'Charge double because there\'s no EIC.',
    ],
    correctAnswer: 1,
    explanation:
      'EICR is independent of historical EIC. The report assesses current condition against current BS 7671 standards. Lack of historical documentation is worth noting (helps the duty holder understand what they have) but does not prevent you doing the EICR. Where you find non-compliances, code them per the C1/C2/C3/FI rubric — the absence of historical paperwork is an observation, not itself a code.',
  },
  {
    id: 7,
    question: 'Scheme membership benefits include:',
    options: [
      'Only the right to display the scheme logo.',
      'Self-certification under Part P, professional indemnity options, scheme audit/QA, technical helpline access, customer-facing trust mark, and access to scheme portals for digital certification.',
      'Free training on every BS 7671 amendment.',
      'Exemption from BS 7671 compliance.',
    ],
    correctAnswer: 1,
    explanation:
      'Scheme membership is not just a logo. It is the practical mechanism for Part P compliance, gives access to the scheme portal for cert generation and notification, opens up insurance options, provides technical support, and gives a recognisable trust signal to customers. The audit regime (which enforces standards) is what gives the trust mark its credibility.',
  },
  {
    id: 8,
    question: 'On the EIC the "next inspection recommended" date is set by:',
    options: [
      'The scheme — it is fixed at 5 years for all installations.',
      'The inspector, based on installation type, environment, intensity of use, and the GN3 frequency table — recorded as the inspector\'s "reasonable and informed decision" with the rationale documented.',
      'The customer — they choose how often.',
      'Building Control — they specify it on their notice.',
    ],
    correctAnswer: 1,
    explanation:
      'The inspector sets the next-inspection date based on the GN3 frequency table and professional judgement. The decision must be a "reasonable and informed" one — based on the installation type, its environment, how it will be used, and any specific risks identified. The reasoning must be recorded on the EIC or EICR so it can be justified if challenged. This is the inspector\'s decision, not the client\'s.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a "Domestic Installer" scheme and a "Full Scope" scheme?',
    answer:
      'Domestic Installer schemes (e.g. NICEIC Domestic Installer) cover Part P notifiable work in dwellings only — the scope is limited to BS 7671 work in domestic settings. Full Scope (e.g. NICEIC Approved Contractor) covers all electrical contracting work including commercial, industrial, agricultural, and special locations. The qualification requirements and audit regime differ. For an apprentice working towards full electrician status, Full Scope is typically the long-term goal.',
  },
  {
    question: 'Do I need to notify Building Control if I\'m only adding a socket to an existing ring?',
    answer:
      'Generally no. Adding a socket to an existing ring final in a non-special location is not notifiable under Part P. Notifiable work includes: new circuits, CU changes/replacements, work in special locations (bathrooms, swimming pools, kitchens — kitchen work is now notifiable in some contexts; check current Part P guidance). Non-notifiable work still requires an MWC and proper testing — you just don\'t go through the building control notification step.',
  },
  {
    question: 'How long does the scheme keep records of certificates I\'ve uploaded?',
    answer:
      'Scheme retention varies but typically the scheme retains certificates for many years (NICEIC retains essentially indefinitely via their portal). The Building Regulations Compliance Certificate the scheme generates is also retained by the scheme. Best practice: contractor retains their own copy of every EIC, MWC, and EICR for the life of the business. Cloud storage with off-site backup is standard now.',
  },
  {
    question: 'What happens if I do notifiable work and don\'t notify building control?',
    answer:
      'It is a criminal offence under the Building Regulations. The local authority can take enforcement action — typically requiring the work to be regularised retrospectively (which can be expensive and may require uncovering buried cables for inspection). It can also affect property sales — solicitors check for compliance certification. As a contractor it can lead to scheme suspension. Always notify when required — the scheme route makes it administratively trivial.',
  },
  {
    question: 'Can I sign the EIC if I personally completed the dead tests but my colleague did the live tests?',
    answer:
      'Generally no, unless the colleague also signs (or the test record clearly attributes which person did which tests). The "Inspection & Testing" signature is your declaration that YOU did the I&T. If two competent persons split the work, both should sign or the form should be annotated to make the split clear. Otherwise you are signing for work you didn\'t personally verify.',
  },
  {
    question: 'What\'s the difference between an EIC and a "Building Regulations Compliance Certificate"?',
    answer:
      'The EIC is the BS 7671 verification document — confirms the installation meets the wiring standard. The Building Regulations Compliance Certificate is issued by the scheme provider after notification to confirm the work has been notified and meets the Building Regulations. Both are required for notifiable Part P work. The EIC comes from you; the Compliance Certificate comes from the scheme. Hand both to the client.',
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1 · Subsection 4"
            title="The scheme certification chain"
            description="From signed EIC through scheme portal upload, building control notification, and customer pack hand-over — the chain that turns a verified installation into a properly certified one."
            tone="emerald"
          />

          <TLDR
            points={[
              'The certification chain: install → test → sign EIC → upload to scheme portal → scheme notifies building control (Part P) → Building Regulations Compliance Certificate issued → customer pack hand-over.',
              'Scheme membership (NICEIC, NAPIT, Stroma, ELECSA, Certsure) provides the self-certification route for Part P notifiable work in dwellings.',
              'Three EIC signature blocks (Design, Construction, Inspection & Testing) allow split responsibility on larger projects — sign only for the work you personally undertook or directly supervised.',
              'Hand-over completes the duty cascade: client/occupier becomes EAWR Reg 4(2) duty holder for ongoing maintenance; installer retains continuing duty for defects later attributable to their work.',
              'Inspector sets the next-inspection date as a "reasonable and informed decision" based on GN3 frequency tables and professional judgement — record the rationale.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe the end-to-end certification process from completion of inspection to customer pack hand-over.',
              'Explain how scheme membership provides the Part P self-certification route.',
              'Identify the responsibilities of designer, installer, and inspector on the EIC.',
              'Distinguish notifiable from non-notifiable work under Part P.',
              'Explain the difference between an EIC and a Building Regulations Compliance Certificate.',
              'Describe the duty cascade triggered by certificate hand-over.',
              'State who sets the next-inspection date and what factors inform the decision.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>The scheme system</ContentEyebrow>

          <ConceptBlock
            title="What scheme membership actually does"
            plainEnglish="A registered competent person scheme like NICEIC or NAPIT lets you self-certify Part P notifiable work — issue an EIC, upload to the scheme portal, the scheme handles building control notification on your behalf. Without scheme membership you have to notify building control yourself, which is slower, more expensive, and triggers third-party inspection."
            onSite="Most contractors join a scheme — it's almost essential for domestic work. Pick the scheme that matches your scope (domestic installer for Part P only; full scope for commercial)."
          >
            <p>What you get from scheme membership:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Part P self-certification.</strong> You can do notifiable work in
                dwellings and have your scheme generate the Building Regulations Compliance
                Certificate.
              </li>
              <li>
                <strong>Online certification portals.</strong> Generate EIC, MWC, EICR via the
                scheme app or portal — automatic format compliance, integrated test instrument
                upload, certificate retention.
              </li>
              <li>
                <strong>Insurance discounts.</strong> Public liability and professional indemnity
                often come at preferential rates through the scheme.
              </li>
              <li>
                <strong>Technical helpline.</strong> Most schemes provide technical support for
                regulation interpretation and tricky on-site situations.
              </li>
              <li>
                <strong>Customer-facing trust mark.</strong> The scheme logo signals competence
                and recourse if things go wrong.
              </li>
              <li>
                <strong>Audit regime.</strong> Annual or periodic scheme assessor visits —
                inspect recent jobs, verify certification quality, check instrument calibration.
                This is what makes the trust mark meaningful.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Building Regulations 2010 (England) — Part P (Electrical safety — dwellings)"
            clause="Reasonable provision shall be made in the design and installation of electrical installations in order to protect persons operating, maintaining or altering the installations from fire or injury."
            meaning={
              <>
                Part P puts a building regulations duty on top of EAWR + BS 7671 specifically for
                dwellings. Notifiable work has to be either self-certified by a registered
                competent person via their scheme, or notified to building control with
                third-party inspection. The scheme route is the practical one for most
                contractors. Wales has its own equivalent. Scotland has Section 6 of the Building
                Standards. Northern Ireland follows similar requirements.
              </>
            }
            cite="Source: Building Regulations 2010, Part P (England), regulation 4 — paraphrased extract."
          />

          <SectionRule />

          <ContentEyebrow>The certificate chain in motion</ContentEyebrow>

          <ConceptBlock
            title="From signed EIC to filed Building Regs cert"
            plainEnglish="Step-by-step: complete the test, generate the EIC + schedules in the scheme app, upload to the scheme portal within the required timeframe (typically 30 days), the scheme notifies building control on your behalf, the scheme issues a Building Regulations Compliance Certificate, you hand both to the client."
          >
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Complete inspection and testing.</strong> All Reg 642 visual items checked,
                all Reg 643 tests done in sequence, results recorded.
              </li>
              <li>
                <strong>Generate the EIC + Schedule of Inspections + Schedule of Test Results</strong>
                in the scheme app or paper template. Sign each block by the responsible competent
                person.
              </li>
              <li>
                <strong>Upload to the scheme portal.</strong> Most schemes now require digital
                logging within 30 days of completion. The portal validates the form is complete
                and consistent.
              </li>
              <li>
                <strong>Building control notification.</strong> For Part P notifiable work in
                dwellings, the scheme notifies the local authority building control department on
                your behalf. You don't need to do this separately.
              </li>
              <li>
                <strong>Building Regulations Compliance Certificate issued.</strong> The scheme
                generates this and either sends it directly to the client or makes it available to
                you to hand over.
              </li>
              <li>
                <strong>Customer pack hand-over.</strong> EIC + schedules + Building Regulations
                Compliance Certificate (where Part P) + Reg 132.13 documentation (circuit charts,
                manufacturer literature, RCD test instructions). Walk the client through it.
              </li>
              <li>
                <strong>Records retention.</strong> Contractor retains a copy. Scheme retains the
                portal record. Client retains the customer pack. Building control receives the
                notification record.
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Who signs what — the responsibility split</ContentEyebrow>

          <ConceptBlock
            title="Three signature blocks, three distinct duties"
            plainEnglish="The EIC has separate signature blocks for Design, Construction, and Inspection & Testing because three different competences are at play. On a small job one person covers all three. On larger jobs they may be split between organisations — and each signature carries its own legal responsibility."
            onSite="Sign only for what you personally did or directly supervised. Signing for someone else\'s design or someone else\'s construction without verification is professional misconduct."
          >
            <p>The three competences:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Design.</strong> Per BS 7671 Part 4 (protection) and Part 5 (selection and
                erection). Sized the cables, picked the protective devices, designed the ADS,
                specified RCDs and AFDDs where required, addressed special locations. The
                designer\'s signature confirms the design meets BS 7671.
              </li>
              <li>
                <strong>Construction.</strong> Per BS 7671 Part 5 in execution. Installed per the
                design, used compliant materials, terminated per manufacturer instructions,
                followed installation methods. The constructor\'s signature confirms what is on
                site matches the design.
              </li>
              <li>
                <strong>Inspection & Testing.</strong> Per BS 7671 Part 6. Verified the install
                via the Reg 642 visual checks and Reg 643 test sequence. The inspector\'s
                signature confirms the verification is complete and the installation is safe to
                energise.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="One competent person signing all three blocks for someone else\'s work"
            whatHappens={
              <>
                You arrive at a job to do "just the testing" for a contractor friend. The work was
                done by them and an apprentice over the past week. You\'ve seen none of it under
                construction. You complete the dead-test sequence and the live tests — readings
                all pass. Your friend asks you to sign all three blocks "to make the paperwork
                simpler" because they aren\'t scheme-registered themselves. You sign. Six months
                later a fault traces to a dodgy termination you couldn\'t have seen during testing.
                The investigation discovers you signed for design and construction without
                personal involvement. Your scheme suspends you for false certification.
              </>
            }
            doInstead={
              <>
                Sign only what you actually did. If you did only inspection and testing, sign only
                that block. Your friend signs design and construction (and is responsible for
                them). If they aren\'t scheme-registered, that\'s their problem — they need to
                join a scheme or notify building control themselves for Part P work. Helping them
                bypass certification by ghost-signing exposes you legally and professionally for
                no benefit. The EIC three-signature structure exists precisely to keep these
                responsibilities split.
              </>
            }
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="Notifiable vs non-notifiable Part P work"
            plainEnglish="Part P designates certain electrical work in dwellings as notifiable to building control. The full list has changed over the years. Currently notifiable: new circuits anywhere, CU replacements, work in special locations like bathrooms (Section 701) and swimming pools. Non-notifiable: replacements (like-for-like switches, sockets, accessories), repairs, additions to existing circuits in non-special locations."
            onSite="Don't guess. The Part P scope changed (kitchens were notifiable for a period, then dropped from the notification list). Check current government guidance before quoting. If in doubt, notify — it's administratively trivial via your scheme portal and protects you from enforcement risk."
          >
            <p>Common Part P notifiability matrix (England — current at A4:2026):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Notifiable.</strong> New circuit. CU replacement (full or split). Any work
                in a Section 701 bathroom that is not minor repair. Work in special locations
                (swimming pools, saunas). Work that adds to or modifies the earthing arrangement
                at the supply intake.
              </li>
              <li>
                <strong>Non-notifiable but still requires certification.</strong> Adding a socket
                to an existing ring final in a non-special location. Adding a light fitting on an
                existing circuit. Replacing a damaged accessory like-for-like. Repair work that
                does not extend or alter the circuit. (Issue MWC.)
              </li>
              <li>
                <strong>Out of scope of Part P entirely.</strong> Equipment connection (e.g.
                connecting a freestanding cooker via a flexible cable). Replacing batteries.
                Maintenance work that doesn't disturb fixed wiring.
              </li>
            </ul>
            <p>
              Wales has its own equivalent (Building Regulations Approved Document P-Wales).
              Scotland follows Section 6 of the Building Standards Technical Handbooks. Northern
              Ireland follows similar requirements via its own Building Regulations. Always check
              the jurisdiction-specific guidance.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Scheme audit — what assessors actually look at"
            plainEnglish="Scheme audit is the quality control mechanism that gives Part P self-certification its credibility. Assessors visit at least annually, pick recent jobs from your portal, visit site to inspect the work, cross-reference against the certificate, check instrument calibration, verify ongoing competence."
            onSite="Treat every job as if the assessor will pick it next month. Calibrated instruments, complete documentation, photographs of key items (bonding, fire stopping, special locations), proper test schedules. The audit is also a learning opportunity — assessors are generally constructive, point out where practice could improve."
          >
            <p>Typical scheme audit components:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Site visit.</strong> Assessor selects 1-3 recent jobs from your portal,
                visits site (with the customer's permission), inspects the installed work against
                what the EIC says was done.
              </li>
              <li>
                <strong>Documentation review.</strong> EIC + schedules complete, calculations
                supporting Zs values, design data on file, departures documented if applicable.
              </li>
              <li>
                <strong>Instrument calibration.</strong> Calibration certificates current (typically
                annual). Instruments used during the work were calibrated at the time.
              </li>
              <li>
                <strong>Competent person review.</strong> The qualifying supervisor / competent
                person remains current — recent CPD, awareness of A4:2026 changes, ongoing
                qualification.
              </li>
              <li>
                <strong>Insurance and registration.</strong> Public liability and professional
                indemnity in date, scheme registration current.
              </li>
              <li>
                <strong>Customer feedback.</strong> Some schemes contact customers to confirm
                hand-over experience and any issues.
              </li>
            </ul>
            <p>
              Outcomes: pass (continued registration), pass with observations (action plan with
              follow-up), fail (suspension pending remediation, or removal from scheme). The audit
              regime is what gives the scheme trust mark its meaning — without it, self-certification
              would be meaningless.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The next-inspection date — inspector's reasonable and informed decision"
            plainEnglish="The inspector sets the next-inspection date on the EIC and EICR. It's not a fixed scheme value — it's the inspector's professional judgement, informed by the GN3 frequency table, the installation type, the environment, the use intensity, and any specific concerns. The decision must be 'reasonable and informed' and the rationale documented."
            onSite="Use GN3 Table 3.2 as the starting point. Adjust for the actual installation. Heavily-used commercial bakery? Bring it in. Lightly-used office storeroom? Could extend. Document the rationale in the report — 'next inspection 5 years per GN3 commercial guidance, no risk factors elevating' or '3 years instead of 5 due to high washdown frequency in the food preparation area'."
          >
            <p>Factors informing the next-inspection date decision:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Installation type.</strong> Domestic, commercial, industrial, special
                location.
              </li>
              <li>
                <strong>Use intensity.</strong> Heavy / 24-7 / continuous vs light / intermittent.
              </li>
              <li>
                <strong>Environment.</strong> Clean / dry / temperate vs damp / dusty / corrosive
                / impact-prone / high-temperature.
              </li>
              <li>
                <strong>Age of installation.</strong> New installs have full design certainty;
                older installs may have multiple owners and undocumented alterations.
              </li>
              <li>
                <strong>Defects identified.</strong> Even if not C1/C2, multiple C3s might warrant
                a shorter cycle to monitor deterioration.
              </li>
              <li>
                <strong>Change of occupancy expected.</strong> Many GN3 entries qualify with "or
                change of occupancy, whichever sooner".
              </li>
              <li>
                <strong>Specific risks.</strong> Children present, vulnerable occupants, valuable /
                hazardous stock, life-safety equipment dependence.
              </li>
              <li>
                <strong>Statutory or contractual requirements.</strong> Private rental sector (5
                years statutory). Insurance contracts may impose specific intervals.
              </li>
            </ul>
            <p>
              Record the rationale on the EIC / EICR — short sentence is enough. "Recommended next
              inspection: 5 years per GN3 commercial premises, no factors elevating to shorter
              cycle." If challenged later, the documented rationale demonstrates the decision was
              informed.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="EICR vs EIC vs MWC — when each applies"
            plainEnglish="Three documents, three different scenarios. EIC for new installations and CU changes — full verification at first energisation. MWC for additions or alterations to existing circuits with no new circuit added. EICR for periodic inspection of an existing installation. Picking the right one is the first decision on every job."
            onSite="Don't reach for the wrong form. EICR for a CU change is wrong (use EIC). EIC for adding a socket on an existing ring is wrong (use MWC). EICR is the right form for a periodic — check the existing installation, code defects, set the next interval. Each form has a different content set and a different legal weight."
          >
            <p>Decision matrix for the right document:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>New installation (entire installation new).</strong> EIC + Schedule of
                Inspections + Schedule of Test Results. Three signature blocks: design,
                construction, inspection &amp; testing.
              </li>
              <li>
                <strong>CU replacement (consumer unit change).</strong> EIC + schedules. Every
                circuit downstream is being newly verified through the new CU. EIC is the only
                appropriate form.
              </li>
              <li>
                <strong>New circuit added to existing installation.</strong> EIC + schedules
                covering the new circuit. The rest of the installation is not re-verified — the
                EIC is for the new work specifically.
              </li>
              <li>
                <strong>Addition / alteration with NO new circuit.</strong> MWC. Records the
                affected portion, test results for the altered portion, confirms existing
                installation safety not impaired.
              </li>
              <li>
                <strong>Periodic inspection of existing installation.</strong> EICR. Sampling-based,
                visual + test, C-coded defects (C1/C2/C3/FI), recommendations for next interval.
              </li>
              <li>
                <strong>One-off investigation (e.g. fault diagnosis, condition assessment for
                insurance).</strong> Investigation report — not a BS 7671 model form, but should
                include all relevant findings, test results, and a clear conclusion. Sometimes
                referred to as an Electrical Installation Condition Report Restricted Scope or
                similar scheme-specific terminology.
              </li>
            </ul>
            <p>
              Each form has a different legal weight and a different scheme audit position. Using
              the wrong form is a verification flaw — and on Part P notifiable work, the wrong
              form can mean the work isn't notified correctly via the scheme.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Records retention — what to keep, for how long"
            plainEnglish="Certificates and supporting records are kept by multiple parties — contractor, scheme, building control, customer. Retention periods vary, but best practice for the contractor is: keep everything for the life of the business. Cloud storage with backup makes this trivial."
            onSite="Don't rely on memory or paper. Photograph every certificate before handover, save the digital scheme cert, keep the design data, save photos of key install items (bonding, fire stopping, special location work). Six years later when a customer or insurer queries the work, you'll be glad you kept it."
          >
            <p>Records retention by party:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Contractor.</strong> Best practice — life of the business. Minimum —
                period of professional indemnity coverage (typically 6-10 years) plus any
                contractual retention period. Cloud storage cheap, paper storage bulky and
                vulnerable.
              </li>
              <li>
                <strong>Scheme provider.</strong> Indefinitely on the portal (NICEIC retains
                certificates without time limit). The Building Regulations Compliance Certificate
                similarly retained.
              </li>
              <li>
                <strong>Customer / duty holder.</strong> Best practice — life of the installation.
                The certificate is the duty holder's evidence of due diligence and is needed for
                future EICRs and at any point of property sale.
              </li>
              <li>
                <strong>Building control.</strong> Notification records retained per local
                authority policy, typically several years minimum.
              </li>
              <li>
                <strong>Test instrument calibration certificates.</strong> Retain at least the
                most recent two cycles. Schemes may audit calibration.
              </li>
              <li>
                <strong>Design data and as-built records.</strong> Retain for the life of the
                business — particularly important for commercial / industrial work where future
                alterations need the design baseline.
              </li>
              <li>
                <strong>Photographs of work.</strong> Increasingly important — phone photos of
                bonding, fire stopping, special location work, before-and-after of any remediation.
                Cloud-back-up. Use these to defend any future query about what was actually
                installed.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Hand-over conversation on a CU change"
            situation={
              <>
                You\'ve just completed a consumer unit upgrade in a domestic property. EIC and
                schedules generated, all RCBOs tested and pass, AFDDs (recommended in this case)
                fitted to two bedroom circuits. Building Regulations Compliance Certificate is
                queued on the scheme portal awaiting your sign-off. Time to hand over to the
                homeowner.
              </>
            }
            whatToDo={
              <>
                Five-minute hand-over conversation. Show them the new CU, demonstrate the test
                buttons on the RCBOs and AFDDs (press, observe trip, reset). Explain the test
                buttons should be operated quarterly and after any unusual electrical event.
                Walk through the EIC pack briefly — what the headline EIC says, where the
                schedules are. Show them the recommended next inspection date (typically 10 years
                for owner-occupied dwelling). Explain the Building Regulations Compliance
                Certificate will arrive separately from the scheme. Hand over your contact details
                in case they have questions or notice anything odd. Confirm where they should
                store the documentation (often inside the CU door or with house deeds). Submit the
                portal upload. Job done.
              </>
            }
            whyItMatters={
              <>
                A 5-minute hand-over is the difference between a confused client who calls weekly
                with "what does this mean?" questions and a client who feels supported and
                understood. It\'s also the moment the duty cascade transfers — they need to
                understand they are now the duty holder for ongoing maintenance. Doing this well
                protects both you and them, and dramatically increases the likelihood of repeat
                custom and referrals.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 641.1 (initial verification)"
            clause={
              <>
                Every installation shall, during erection and on completion before being put into
                service, be inspected and tested to verify, so far as is reasonably practicable,
                that the requirements of BS 7671 have been met.
              </>
            }
            meaning={
              <>
                Initial verification is not optional and not deferrable. The duty bites at the
                point the installation is put into service — every install gets inspected and
                tested first. The EIC is the deliverable that records the verification took
                place and what it found.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 641.1 — full text from published amendment."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 642.1 (inspection precedes testing)"
            clause={
              <>
                Inspection shall precede testing and shall normally be done with that part of
                the installation under inspection disconnected from the supply.
              </>
            }
            meaning={
              <>
                Inspection first, dead tests next, live tests last — and the inspection part
                normally happens with the kit isolated. This sequence is hard-wired into the
                EIC and the schedule of inspections; an inspector who pads through the dead
                tests first risks missing visible defects that should have been picked up
                before any meter went on the kit.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 642.1 — full text from published amendment."
          />

          <InlineCheck
            id="m5-s1-sub4-init-verif-sequence"
            question="A new domestic kitchen rewire is finished. The customer pushes for the appliances to be plugged in straight away. What does Regulation 642.1 require?"
            options={[
              "Plug everything in and run the tests around it — the customer wants their kettle.",
              "Inspection precedes testing, and inspection shall normally be done with the relevant part of the installation disconnected from the supply. Visual inspection first, dead tests next, then energise and complete the live tests. Only when verification is satisfactory does the installation get put into service.",
              "Skip inspection and go straight to live tests because it&apos;s a kitchen.",
              "Testing and inspection can happen in any order.",
            ]}
            correctIndex={1}
            explanation="Regulation 642.1 specifies that inspection precedes testing, and the inspection is normally done with the part of the installation disconnected. Doing it the other way round risks missing defects (loose terminations, wrong polarity, missing barriers) that should have been caught visually first. The customer&apos;s kettle waits until verification is complete."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'The cert chain: install → test → sign EIC → upload to scheme portal → scheme notifies building control (Part P) → Building Regulations Compliance Certificate → customer pack hand-over.',
              'Scheme membership (NICEIC, NAPIT, Stroma, ELECSA, Certsure) provides the Part P self-certification route plus audit, insurance, technical support, and customer trust mark.',
              'EIC three signature blocks (Design / Construction / Inspection & Testing) carry separate professional responsibilities. Sign only for what you personally did or directly supervised.',
              'Notifiable Part P work in dwellings includes new circuits, CU changes, work in special locations. Non-notifiable work still requires proper certification (EIC or MWC) but no building control notification.',
              'The Building Regulations Compliance Certificate (issued by the scheme) is separate from the EIC (issued by you) — both are required for notifiable Part P work.',
              'Hand-over completes the duty cascade — client becomes EAWR Reg 4(2) duty holder for ongoing maintenance; installer retains continuing duty for defects later attributable to their work.',
              'Inspector sets the next-inspection recommendation as a "reasonable and informed decision" per GN3 — record the rationale on the EIC for justification if challenged.',
              'Back-dating, ghost-signing, or signing for unverified work are professional misconduct AND potential criminal offences under EAWR and Building Regulations.',
            ]}
          />

          <Quiz title="Scheme certification chain — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.3 GN3 — what it adds
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section1-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.5 Safe isolation at L3 depth
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
