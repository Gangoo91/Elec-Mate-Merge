/**
 * Module 7 · Section 4 · Subsection 5 — Industry qualifications for electricians
 * Maps to C&G 2365-03 / Unit 308 / LO2 / AC 2.x
 *   AC — "Identify the qualifications required and available to electricians".
 *
 * The UK electrical qualification landscape — ECS cards and JIB grades, Part P
 * notifiable work and CPS schemes (NICEIC, NAPIT, ELECSA), core qualifications
 * (Level 3 Diploma, AM2, C&G 2382, C&G 2391), specialist tickets (C&G 2919 EV,
 * C&G 2399 PV), MCS / OZEV approvals, and the route to professional recognition
 * (IET membership, EngTech / IEng / CEng).
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

const TITLE = 'Industry qualifications for electricians | Level 3 Module 7.4.5 | Elec-Mate';
const DESCRIPTION =
  'The UK electrical qualifications landscape — ECS cards, JIB grades, Part P and CPS schemes, core qualifications, specialist tickets, MCS / OZEV and professional registration.';

const checks = [
  {
    id: 'mod7-s4-sub5-am2',
    question: 'What is the AM2 / AM2S assessment?',
    options: [
      'A written multiple-choice exam covering BS 7671.',
      'The end-point practical assessment of installation, inspection-testing and fault-finding competence in the C&G 2365-03 / Level 3 apprenticeship. AM2S is the current variant (incorporates safe-isolation and updated assessment criteria). Pass is required for Gold ECS card and qualified-status JIB grading.',
      'An online portfolio submission.',
      'A first-aid certificate.',
    ],
    correctIndex: 1,
    explanation:
      "The AM2 / AM2S is the practical end-point assessment — a multi-day practical including installation, inspection and testing, fault-finding and safe-isolation. It's run by NET (National Electrotechnical Training). Passing is the gate to Gold ECS card status and to JIB qualified-Electrician grading. Most apprentices sit AM2S at the end of the apprenticeship after completing the Level 3 Diploma and required portfolio.",
  },
  {
    id: 'mod7-s4-sub5-part-p',
    question: "What is the main purpose of Part P of the Building Regulations?",
    options: [
      'To set rates of pay for electricians.',
      'To ensure that fixed electrical work in dwellings is designed, installed, inspected and tested so that it is reasonably safe — and to require notification of certain work via building control or a registered competent person.',
      'To regulate commercial installations only.',
      'To provide insurance for domestic electrical work.',
    ],
    correctIndex: 1,
    explanation:
      "Part P (England) and the equivalent Welsh and Scottish provisions cover safety of fixed electrical installations in dwellings. They define which work is notifiable (typically new circuits, consumer unit replacement, work in special locations like bathrooms or outdoors) — and require notification either via building control on a job-by-job basis or via membership of a competent person scheme that allows self-certification.",
  },
  {
    id: 'mod7-s4-sub5-cps-schemes',
    question: 'What is a competent person scheme?',
    options: [
      'A government grant scheme for training.',
      "A government-authorised scheme (NICEIC, NAPIT, ELECSA, STROMA, NICEIC Domestic Installer, Certsure) whose registered firms can self-certify their Part P notifiable work in dwellings without involving building control for each job. Registration requires qualifications, equipment, insurance and ongoing assessment.",
      'A union membership requirement.',
      "A homeowner's insurance scheme.",
    ],
    correctIndex: 1,
    explanation:
      "CPS schemes are designated under Part P. The big four are NICEIC, NAPIT, ELECSA and STROMA. Registration typically requires: appropriate electrical qualifications for the QS-named individual, calibrated test equipment, public liability insurance, an initial competence assessment by the scheme assessor, ongoing annual assessment, and evidence of CPD. The benefit: the firm can certify its own notifiable domestic work; the customer gets the certificate and the scheme's six-year workmanship guarantee.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does ECS stand for and who administers it?',
    options: [
      'Electrical Compliance Scheme — administered by the HSE.',
      "Electrotechnical Certification Scheme — administered by the JIB (Joint Industry Board). The card evidences qualifications, competence grade, health-and-safety currency and CPD; required for access to most construction sites.",
      'Engineering Competence Standard — administered by the IET.',
      'Electrical Contractor Services — administered by ECA.',
    ],
    correctAnswer: 1,
    explanation:
      "ECS is the industry ID card scheme administered by JIB. The card colour and band indicate qualification level: Gold for fully-qualified Installation / Approved Electrician; Blue for apprentice; White for provisional / trainee; Green for labourer. Card renewal every 3-5 years requires evidence of CPD plus a current health-and-safety qualification (CSCS-equivalent test, often the IET ECS Health, Safety and Environmental Assessment).",
  },
  {
    id: 2,
    question: 'Which of the following is NOT a competent person scheme for Part P notifiable electrical work?',
    options: ['NICEIC.', 'NAPIT.', 'HSE.', 'ELECSA.'],
    correctAnswer: 2,
    explanation:
      "The HSE (Health and Safety Executive) is the statutory regulator under HASAWA / EWR — not a competent person scheme. NICEIC, NAPIT, ELECSA, STROMA and similar designated bodies are the actual Part P schemes. Don't confuse the regulator with the certification schemes; they're different roles in the system.",
  },
  {
    id: 3,
    question: 'What is the C&G 2382 qualification?',
    options: [
      'A practical installation qualification.',
      'The City & Guilds BS 7671 Requirements for Electrical Installations qualification — open-book exam testing knowledge of the current edition / amendment. 2382-22 covers the 18th Edition with A2:2022; 2382-26 will cover A4:2026.',
      'A first-aid certificate.',
      'A management qualification.',
    ],
    correctAnswer: 1,
    explanation:
      "C&G 2382 is the regs knowledge qualification — the standard CPD evidence for currency with BS 7671. Each major amendment triggers a new 2382 variant (2382-15 for 17th, 2382-18 for 17th+A3, 2382-22 for 18th, 2382-26 will be 18th+A4). It's open-book, 60 multiple-choice, typically £150-250 to sit. CPS schemes generally expect QS-named individuals to hold the current 2382.",
  },
  {
    id: 4,
    question: 'What work is notifiable under Part P in dwellings (England)?',
    options: [
      'All electrical work without exception.',
      'Only work in commercial premises.',
      'New circuits, consumer unit replacement, and work in special locations (bathrooms, kitchens with a new circuit, outdoor installations and swimming pool zones).',
      'Only work done by unqualified persons.',
    ],
    correctAnswer: 2,
    explanation:
      "Part P notifiable work (England, since 2013 simplification) covers: new circuits; replacement of a consumer unit; and work in special locations (room containing a bath or shower, sauna, swimming pool, hot air sauna, outdoors). Minor work — adding a socket to an existing ring, replacing a light switch, like-for-like — is non-notifiable but must still meet BS 7671. Always check the current Part P guidance as scope of notifiable work has changed over time.",
  },
  {
    id: 5,
    question: 'What qualification is the C&G 2919 (or current equivalent EV qualification)?',
    options: [
      'Solar PV installation.',
      'Electric Vehicle (EV) charging equipment installation — covers the BS 7671 Section 722 requirements, OZEV grant scheme eligibility, manufacturer-specific training pathways and Open-PEN protection considerations for TN-C-S supplies.',
      'Fire alarm systems.',
      'Emergency lighting.',
    ],
    correctAnswer: 1,
    explanation:
      "C&G 2919 (and equivalent EAL, LCL Awards qualifications) covers EV charging equipment installation — the specialist requirements added by BS 7671 Section 722 plus the practical install considerations. OZEV approval for grant work requires both this qualification (or equivalent) and registration with an OZEV-approved installer route. Most EV-charger manufacturers also require their own product-specific training.",
  },
  {
    id: 6,
    question: 'Which card colour indicates an Installation Electrician on the ECS scheme?',
    options: ['Blue.', 'Gold.', 'Red.', 'Green.'],
    correctAnswer: 1,
    explanation:
      "Gold ECS card = fully-qualified Installation Electrician (passed Level 3 Diploma + AM2 / AM2S). The Gold band also covers Approved Electrician (Installation Electrician + 2391 inspection-testing) and higher technician grades. Blue = apprentice; White = provisional / trainee; Green = labourer. The card is the day-one ID for site access — keep it current and visible.",
  },
  {
    id: 7,
    question: 'What is required to keep an ECS card valid?',
    options: [
      'Nothing once issued.',
      'Renewal every 3-5 years (varies by card band) with evidence of CPD and a current health-and-safety qualification (typically the ECS Health, Safety and Environmental Assessment or CSCS-equivalent).',
      'Annual exams.',
      'Monthly fee payments only.',
    ],
    correctAnswer: 1,
    explanation:
      "ECS cards renew on a 3-5 year cycle depending on band. Renewal requires: evidence of CPD (typically 30+ hours per year for QS-named individuals; less for Installation Electricians); a current health-and-safety qualification (the ECS HSEA test, valid 3 years); and the JIB renewal fee. CSCS-equivalent health-and-safety tests are sometimes accepted as an alternative.",
  },
  {
    id: 8,
    question: 'What does MCS certification relate to?',
    options: [
      'Motor control systems.',
      'Microgeneration Certification Scheme — the consumer-protection scheme covering low-carbon installations (solar PV, heat pumps, battery storage, biomass) that customers can use to access government feed-in tariffs, the Smart Export Guarantee or Boiler Upgrade Scheme grants.',
      'Mechanical control services.',
      'Master craftsman status.',
    ],
    correctAnswer: 1,
    explanation:
      "MCS is the consumer-facing certification scheme for low-carbon installations. To access government incentives (SEG, Boiler Upgrade Scheme, etc.) the install must be MCS-certified. To MCS-certify a job the firm must be MCS-registered (which requires the relevant install qualifications — e.g. C&G 2399 for PV — plus an initial assessment). MCS is separate from Part P; an installer may be Part P registered without being MCS, and vice versa.",
  },
];

const faqs = [
  {
    question: 'Do I need to be registered with a competent person scheme?',
    answer:
      "If you do Part P notifiable work in dwellings you either (a) register with a CPS scheme and self-certify, or (b) notify building control for each notifiable job and pay their fees. For any regular volume of domestic work, scheme membership is dramatically cheaper and faster than per-job building control. Scheme fees are typically £400-800/year depending on scheme and firm size. Building control fees per notifiable job typically £150-400.",
  },
  {
    question: 'Which competent person scheme should I join?',
    answer:
      "The big four (NICEIC, NAPIT, ELECSA, STROMA) all provide the same legal Part P self-certification authority. Practical differences: cost (similar but worth comparing); assessment style; brand recognition with customers (NICEIC is widely-known to homeowners); additional services (training, certificate software, marketing). Many firms pick based on which scheme their network already uses. Switching is possible but disruptive.",
  },
  {
    question: 'Can I do commercial work without scheme membership?',
    answer:
      "Yes. Part P and the CPS schemes specifically cover dwellings. Commercial, industrial, public-sector and rented-out-of-scope work doesn't require scheme membership for compliance — though many commercial clients prefer or require it on tender. For purely commercial work you still need BS 7671 competence, EWR competence, public liability insurance and (typically) JIB / ECS card status.",
  },
  {
    question: "What's the difference between C&G 2391 and C&G 2394 / 2395?",
    answer:
      "They're functionally equivalent inspection-and-testing qualifications. 2391 is the combined initial-verification-plus-periodic qualification. 2394 covers initial verification only; 2395 covers periodic inspection only — taken separately or together. Most employers and CPS schemes accept either route. 2391 in a single sitting is the more common path for working electricians.",
  },
  {
    question: 'How do I get my ECS card?',
    answer:
      "Apply via the JIB website (ecscard.org.uk) with evidence: qualifications, AM2 pass for Gold band, current health-and-safety qualification (ECS HSEA or CSCS-equivalent), and the JIB application fee (around £45 for new cards, less for renewals). The application is online with PDF uploads of certificates. Processing typically takes 5-10 working days. Some employers handle the application for new starters.",
  },
  {
    question: 'What qualifications do I need for solar PV installation?',
    answer:
      "Core electrical qualifications (Level 3 Diploma + AM2) plus a specialist PV qualification (C&G 2399, EAL equivalent or LCL Awards). For MCS-certified installs (required for SEG access) the firm must be MCS-registered for solar PV, which requires the qualification plus an initial assessment by an MCS-accredited certification body (NICEIC and NAPIT both offer MCS). For battery storage paired with PV, additional product-specific training is typically required by the manufacturer.",
  },
  {
    question: 'What is the IET and why might I join?',
    answer:
      "The IET (Institution of Engineering and Technology) is the UK professional body for electrical engineers and technicians. Membership grades: AMIET (Associate), MIET (Member), FIET (Fellow). It's the pathway to professional registration with the Engineering Council (EngTech, IEng, CEng). Practical benefits: access to standards (BS 7671 online), technical guidance notes, CPD events, mentoring, professional recognition that helps with commercial / specialist work. Annual subscription typically £150-250 depending on grade.",
  },
  {
    question: "What's EngTech / IEng / CEng and is it relevant for an installer?",
    answer:
      "These are Engineering Council professional registrations. EngTech (Engineering Technician) is the most directly relevant for installers — recognises competence at the technician level; typical evidence: Level 3 qualification, AM2, 3+ years' experience, CPD record. IEng (Incorporated Engineer) and CEng (Chartered Engineer) are higher grades aimed at design / engineering roles, with degree-equivalent academic requirements. EngTech is achievable for working electricians; the others require an engineering degree route.",
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 7 · Section 4 · Subsection 5"
            title="Industry qualifications for electricians"
            description="ECS cards and JIB grades, Part P and CPS schemes, core and specialist qualifications, MCS / OZEV, and the route to professional registration."
            tone="blue"
          />

          <TLDR
            points={[
              "ECS card (administered by JIB) is the day-one industry ID — Gold for qualified, Blue for apprentice, White for provisional, Green for labourer.",
              "Part P (England) requires notification of certain dwelling electrical work; CPS scheme membership lets you self-certify rather than notify per-job.",
              "Core qualifications: Level 3 Diploma in Electrical Installation + AM2 / AM2S + C&G 2382 (regs) + C&G 2391 (inspection-testing) for Approved Electrician.",
              "Specialist tickets: C&G 2919 (EV), C&G 2399 (PV), FIA (fire alarms), BS 5266 (emergency lighting), HV authorisation.",
              "MCS certification needed for low-carbon installs accessing government schemes (SEG, Boiler Upgrade); OZEV approval needed for EV grant work.",
              "Professional registration via IET (AMIET / MIET / FIET) and Engineering Council (EngTech / IEng / CEng) — EngTech is most directly relevant for installers.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO2 — identify the qualifications required and available to electricians.",
              "Describe the ECS card scheme — bands, what each represents, renewal requirements.",
              "Explain Part P notifiable work and how CPS schemes enable self-certification.",
              "List the core electrical qualifications needed for Installation Electrician and Approved Electrician status.",
              "Identify the specialist qualifications for EV, solar PV, fire alarms, emergency lighting and high-voltage work.",
              "State the role of MCS and OZEV approvals for accessing government incentive schemes.",
              "Describe the routes to professional body membership and Engineering Council registration.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>ECS cards and JIB grades</ContentEyebrow>

          <ConceptBlock
            title="The ECS card scheme — what each band represents"
            plainEnglish="The Electrotechnical Certification Scheme (ECS) is the JIB-administered industry ID. The card colour and band indicate your qualification grade. Gold band = fully-qualified Installation Electrician (Level 3 + AM2 / AM2S) or above; Blue = apprentice on a recognised programme; White = provisional / trainee / qualifying period; Green = labourer / unskilled support. The card carries a photo, the holder's name, the band and grade, the JIB registration number, and the expiry date. Most construction sites won't let you on without a current ECS card."
            onSite="Get the right card grade applied for as soon as you're entitled to it. Apprentices: keep the Blue card current through the apprenticeship; switch to Gold the moment AM2 / AM2S is passed and certificates are in hand. Don't work on a lapsed card — many sites scan ECS cards on entry and a lapse blocks the gate. The ECS HSEA health-and-safety test is a normal part of renewal; book it ahead of card expiry."
          >
            <p>
              ECS card bands at a glance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Gold &mdash; Installation Electrician</strong>: Level 3 Diploma + AM2 / AM2S, fully qualified.
              </li>
              <li>
                <strong>Gold &mdash; Approved Electrician</strong>: Installation Electrician + C&amp;G 2391 inspection-testing.
              </li>
              <li>
                <strong>Gold &mdash; Technician / Senior grades</strong>: additional qualifications / experience evidenced.
              </li>
              <li>
                <strong>Blue &mdash; Apprentice</strong>: on a recognised electrical apprenticeship programme.
              </li>
              <li>
                <strong>White &mdash; Provisional / Trainee</strong>: working towards full qualification.
              </li>
              <li>
                <strong>Green &mdash; Labourer / Operative</strong>: unskilled support; not electrical work in own right.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="JIB grades — the same picture from a different angle"
            plainEnglish="The JIB (Joint Industry Board) is the bipartite negotiating body that sets industry pay rates and grading. JIB grades map closely to ECS card bands. From bottom to top: Labourer, Apprentice, Trainee, Electrician (Installation Electrician), Approved Electrician, Technician. Each grade has a defined competence statement and a JIB pay rate band. Working on a JIB-grade-rated job (most commercial / industrial) means the JIB rate applies — so getting upgraded to Approved Electrician makes a measurable difference to take-home pay."
            onSite="If you're qualifying for an upgrade (Installation Electrician to Approved Electrician via 2391), apply for the grade change as soon as you have the certificate — JIB rates apply from the upgrade date, not from when the new work starts. Most employers handle the JIB grade upgrade administratively, but check that it's been done."
          >
            <p>
              JIB grade ladder:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Labourer.</li>
              <li>Apprentice (Stages 1-4 of training).</li>
              <li>Trainee.</li>
              <li>Electrician (Installation Electrician).</li>
              <li>Approved Electrician (Installation + 2391).</li>
              <li>Technician / Senior Authorised Person grades.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Part P and competent person schemes</ContentEyebrow>

          <ConceptBlock
            title="What Part P is and which work is notifiable"
            plainEnglish="Part P of the Building Regulations (England) is the safety provision covering fixed electrical installations in dwellings. The functional requirement: 'Reasonable provision shall be made in the design and installation of electrical installations in order to protect persons operating, maintaining or altering the installations from fire or injury.' Practical effect: certain work is notifiable — must be either notified to building control before the work or self-certified by a competent person scheme member after the work. Notifiable categories: new circuits, consumer unit replacement, and work in special locations (rooms with bath/shower, swimming pool, sauna, outdoors). Minor work (adding to existing circuits, like-for-like replacements) is non-notifiable but must still meet BS 7671."
            onSite="Notifiable work without notification or self-certification is a Part P offence — the homeowner can be served an enforcement notice requiring proof of compliance, and unregistered electrical work can devalue the property at sale. CPS scheme membership is the practical answer for any volume of domestic work."
          >
            <p>
              Notifiable work in dwellings (England) typically includes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>New circuits.</li>
              <li>Consumer unit replacement.</li>
              <li>Work in a room containing a bath or shower.</li>
              <li>Outdoor installations &mdash; lighting, sockets, EV chargers.</li>
              <li>Swimming pool / hot tub installations.</li>
              <li>Sauna installations.</li>
            </ul>
            <p className="mt-3">
              Non-notifiable but still requiring BS 7671 compliance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Adding a socket to an existing ring or radial.</li>
              <li>Adding a light to an existing lighting circuit.</li>
              <li>Like-for-like replacements (switch, socket, fitting).</li>
              <li>Repair work to existing installations.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The CPS schemes — NICEIC, NAPIT, ELECSA, STROMA"
            plainEnglish="A competent person scheme is a government-designated body whose registered firms can self-certify Part P notifiable work in dwellings. The big four for electrical work: NICEIC (largest, longest-established, broad recognition); NAPIT (large, broad scope, popular with smaller contractors); ELECSA (long-standing, smaller-scale); STROMA (multi-discipline, includes electrical alongside other trades). All four provide the same Part P self-certification authority — practical differences are cost, assessment style, customer-side brand recognition, and bundled services. Registration typically requires: qualifications (Level 3 + 2391 for the QS-named individual), calibrated test equipment, public liability insurance (typically £2m+), initial competence assessment, ongoing annual assessment, CPD evidence."
            onSite="Pick a scheme based on practical factors: typical customer base (NICEIC very recognised by homeowners), local assessor team, scheme-bundled services (certificate software, training, marketing), and cost. Most apprentices won't deal with CPS registration directly — it's a firm-level decision — but you'll work to scheme-defined certification practices day-to-day. The QS in the firm is your route to all scheme questions."
          >
            <p>
              CPS scheme registration requirements (typical):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Appropriate electrical qualifications for the QS-named individual.</li>
              <li>Calibrated test equipment (MFT / LIM with current calibration certificate).</li>
              <li>Public liability insurance (typically &pound;2m minimum).</li>
              <li>Initial competence assessment by scheme assessor.</li>
              <li>Annual surveillance assessment.</li>
              <li>Evidence of ongoing CPD (typically 30+ hours/year for QS-named).</li>
              <li>Scheme annual fee (typically &pound;400&ndash;800).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="Building Regulations 2010 — Part P (Electrical Safety — Dwellings)"
            clause={
              <>
                <p className="mb-2">Part P sets out one functional requirement:</p>
                <p className="italic">
                  &quot;P1. Reasonable provision shall be made in the design and installation of
                  electrical installations in order to protect persons operating, maintaining or
                  altering the installations from fire or injury.&quot;
                </p>
                <p className="mt-2">
                  Approved Document P (the practical guidance) defines notifiable work, sets out
                  the certification routes (CPS scheme self-certification or building control
                  notification) and requires the use of recognised standards (typically BS 7671)
                  to demonstrate compliance.
                </p>
              </>
            }
            meaning={
              <>
                Part P is a short statutory provision with a wide reach. The functional requirement
                is broad; the practical detail is in Approved Document P and BS 7671. Notifiable
                work that proceeds without notification or self-certification can attract
                enforcement action and creates problems at property sale (conveyancing solicitors
                routinely ask for electrical certificates). CPS scheme self-certification is the
                routine way most electricians meet Part P.
              </>
            }
            cite="Source: Building Regulations 2010 (SI 2010/2214), Part P; Approved Document P (current edition)."
          />

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 16 (competence)"
            clause={
              <>
                &quot;No person shall be engaged in any work activity where technical knowledge or
                experience is necessary to prevent danger or, where appropriate, injury, unless he
                possesses such knowledge or experience, or is under such degree of supervision as
                may be appropriate having regard to the nature of the work.&quot;
              </>
            }
            meaning={
              <>
                EWR Reg 16 is the statutory backbone of the qualifications system. The
                qualifications (Level 3, AM2, 2382, 2391, specialist tickets) are how
                &quot;technical knowledge or experience&quot; is evidenced. Apprentice and trainee
                grades exist precisely because Reg 16 also accepts supervision as an alternative
                to direct competence &mdash; an apprentice is competent for the supervised work
                they&apos;re trained on, not for unsupervised independent work.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), reg. 16."
          />

          <SectionRule />

          <ContentEyebrow>Core qualifications</ContentEyebrow>

          <ConceptBlock
            title="Level 3 Diploma + AM2 — the core route to Installation Electrician"
            plainEnglish="The standard route to Installation Electrician (Gold ECS, JIB Electrician grade) is: complete a Level 3 Diploma in Electrical Installation (C&G 2365-02 / 2365-03 or equivalent EAL / LCL Awards), pass the AM2 / AM2S end-point practical assessment, and complete a portfolio of evidence. Apprentices follow the same route via the C&G 5357 (or current) Electrical Installation apprenticeship standard, which bundles the Level 2 and Level 3 Diplomas with the AM2S end-point assessment over typically 3-4 years. Mature entrants can do the qualifications standalone if they have suitable workplace experience to evidence."
            onSite="The portfolio matters as much as the exams. Keep a structured record of jobs worked, types of installations, tests carried out, fault-finding events, and CPD activity. The AM2S assessor will sample the portfolio alongside the practical assessment. Apprentices: get into the habit of one-line journal entries at the end of each working week — what you installed, tested, learned, struggled with. Builds the portfolio painlessly."
          >
            <p>
              The Installation Electrician qualification stack:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Level 2 Diploma</strong> &mdash; foundations (C&amp;G 2365-02 or equivalent).
              </li>
              <li>
                <strong>Level 3 Diploma</strong> &mdash; advanced installation (C&amp;G 2365-03 or equivalent).
              </li>
              <li>
                <strong>C&amp;G 2382</strong> &mdash; BS 7671 Wiring Regulations (currently 2382-22).
              </li>
              <li>
                <strong>AM2 / AM2S</strong> &mdash; end-point practical assessment.
              </li>
              <li>
                <strong>Portfolio of evidence</strong> &mdash; workplace experience documented.
              </li>
              <li>
                <strong>ECS HSEA / CSCS-equivalent</strong> &mdash; health-and-safety test.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="C&G 2391 / 2394 / 2395 — inspection and testing, the route to Approved Electrician"
            plainEnglish="To inspect and test existing installations (EICR work) and to issue certificates as the QS-named individual on commercial / domestic work you need an inspection-and-testing qualification. The current standard is C&G 2391 (combined initial verification and periodic inspection). The alternative split route is C&G 2394 (initial verification only) and C&G 2395 (periodic inspection only) — taken separately or together. Holding 2391 (or 2394+2395) plus the Installation Electrician qualification = Approved Electrician on the JIB grade ladder, which is a measurable pay-rate uplift and the route to QS-named status on CPS schemes."
            onSite="Sit 2391 (or 2394+2395) within 1-3 years of completing the Level 3 / AM2 — the practical experience from those first few years feeds into the inspection-and-testing assessment. The exam is open-book (BS 7671 on the desk) and tests practical application — calculation of test results, certificate completion, recognition of common installation defects. Typical cost £400-700 to sit including training; major CPS schemes and training providers offer the course."
          >
            <p>
              Inspection and testing qualification options:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>C&amp;G 2391-52</strong> &mdash; combined initial verification + periodic inspection.
              </li>
              <li>
                <strong>C&amp;G 2394</strong> &mdash; initial verification only (new installations).
              </li>
              <li>
                <strong>C&amp;G 2395</strong> &mdash; periodic inspection only (EICR work).
              </li>
              <li>
                <strong>EAL / LCL Awards equivalents</strong> &mdash; functionally similar, accepted by CPS schemes.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Specialist tickets and approvals</ContentEyebrow>

          <ConceptBlock
            title="EV, PV, fire alarms, emergency lighting — the common specialist tickets"
            plainEnglish="As the industry diversifies, specialist tickets matter increasingly. The common specialist qualifications: C&G 2919 (EV charging installation) and the OZEV-approved installer route for EV grant work; C&G 2399 (solar PV installation) plus MCS registration for grant access; FIA / BAFE qualifications for fire alarm design and install; BS 5266 training for emergency lighting; HV authorisation pathways for utility / data-centre / industrial work. Most schemes also require manufacturer-specific training for proprietary products (e.g. Tesla Powerwall, Wallbox, specific PV inverter brands)."
            onSite="Specialist tickets unlock specialist work and specialist rates. Plan one specialist qualification per 18-24 months alongside the core regs CPD — typical pattern after Installation Electrician + 2391 is to add EV or PV within 2 years, then a second specialist 2-3 years later. Manufacturer training is often free if you commit to install volume; specialist training providers (LCL, EAL, NET, NICEIC Training, NAPIT Training, Elec-Mate) run the formal C&G qualifications."
          >
            <p>
              Common specialist qualifications:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>C&amp;G 2919 / equivalent</strong> &mdash; EV charging installation.
              </li>
              <li>
                <strong>C&amp;G 2399 / equivalent</strong> &mdash; solar PV installation.
              </li>
              <li>
                <strong>FIA / BAFE</strong> &mdash; fire alarm design / install / commissioning.
              </li>
              <li>
                <strong>BS 5266</strong> &mdash; emergency lighting design / install.
              </li>
              <li>
                <strong>HV authorisation</strong> &mdash; utility / data-centre / industrial.
              </li>
              <li>
                <strong>Hazardous areas / ATEX</strong> &mdash; petrochemical / industrial process.
              </li>
              <li>
                <strong>Battery storage</strong> &mdash; manufacturer-specific (Tesla, Powerwall, etc.).
              </li>
              <li>
                <strong>Heat pumps</strong> &mdash; manufacturer + MCS for GSHP / ASHP.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="MCS and OZEV — consumer-facing approvals for grant-funded work"
            plainEnglish="MCS (Microgeneration Certification Scheme) is the consumer-facing certification scheme for low-carbon installations (solar PV, heat pumps, battery storage, biomass). Customers need MCS-certified installs to access government incentives — Smart Export Guarantee (SEG) for solar, Boiler Upgrade Scheme (BUS) for heat pumps. To MCS-certify work the firm must be MCS-registered — which requires the relevant install qualifications, public liability insurance, and an initial assessment by an MCS-accredited certification body (NICEIC, NAPIT both offer this). OZEV (Office for Zero Emission Vehicles) approval is the equivalent for EV charging grant work — required for installs funded through OZEV grants."
            onSite="MCS and OZEV are firm-level registrations, not individual qualifications. You can be qualified for PV installation (C&G 2399) without the firm being MCS-registered — but then the customer can't access SEG. Most firms doing PV at any scale carry MCS; most doing EV at scale carry OZEV. The cost of MCS / OZEV registration is modest (£500-1,500 setup; ongoing annual fees) relative to the work it unlocks."
          >
            <p>
              MCS and OZEV approval scopes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MCS PV</strong> &mdash; solar PV systems for grant / SEG access.
              </li>
              <li>
                <strong>MCS Heat Pump</strong> &mdash; ASHP / GSHP for Boiler Upgrade Scheme.
              </li>
              <li>
                <strong>MCS Battery Storage</strong> &mdash; battery systems alongside PV.
              </li>
              <li>
                <strong>MCS Biomass</strong> &mdash; biomass boilers (less common).
              </li>
              <li>
                <strong>OZEV approved installer</strong> &mdash; EV charging grant work.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Professional registration</ContentEyebrow>

          <ConceptBlock
            title="The IET — Institution of Engineering and Technology"
            plainEnglish="The IET is the UK professional body for electrical engineers and technicians. Membership grades: AMIET (Associate, for technicians), MIET (Member, full professional grade), FIET (Fellow, senior grade). Joining provides: access to BS 7671 online and other IET standards (significant value vs the paid retail price); IET Wiring Matters magazine; CPD events and learning content via the IET Academy; mentoring and professional networking; the route to Engineering Council professional registration (EngTech, IEng, CEng). Annual subscription typically £150-250 depending on grade and stage of career."
            onSite="For working electricians AMIET is the typical entry grade — straightforward application based on Level 3 qualification, AM2 and some workplace experience. MIET typically requires more years of practice or a degree. Joining isn't compulsory; the practical question is whether the BS 7671 online access and CPD content justify the annual sub. For QS-named individuals doing commercial / specialist work, IET membership signals professional commitment that some clients explicitly require."
          >
            <p>
              IET membership grades:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Student / Affiliate</strong> &mdash; for those starting out, very low cost.
              </li>
              <li>
                <strong>AMIET (Associate)</strong> &mdash; entry grade for qualified technicians.
              </li>
              <li>
                <strong>MIET (Member)</strong> &mdash; full professional grade; typically requires extended experience or degree route.
              </li>
              <li>
                <strong>FIET (Fellow)</strong> &mdash; senior grade for established practitioners.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Engineering Council registration — EngTech, IEng, CEng"
            plainEnglish="The Engineering Council is the UK regulator for engineering professionals. It awards three professional registrations: EngTech (Engineering Technician), IEng (Incorporated Engineer), CEng (Chartered Engineer). EngTech is the most directly relevant for working electricians — recognises technician-level competence; typical evidence: Level 3 qualification + AM2 + 3+ years of relevant experience + CPD record + professional review interview. IEng and CEng aim at higher-level engineering / design / management roles with degree-equivalent academic requirements — typically not the path for a primarily-installer career, though some specialists progress that way."
            onSite="EngTech is achievable for any competent qualified electrician. Process: apply via the IET (or another licensed body like the IIE, BCS, etc.); submit evidence; sit a professional review interview; pay the fee. Adds 'EngTech MIET' (or similar) to your professional credentials. Practical value: signals professional commitment, sometimes required for senior commercial / specialist roles, occasionally a pay-band differentiator. Not essential for most installer work but worth considering once you have 3+ years post-AM2 experience."
          >
            <p>
              Engineering Council grades:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EngTech</strong> &mdash; Engineering Technician; achievable for working electricians with 3+ years post-AM2.
              </li>
              <li>
                <strong>IEng</strong> &mdash; Incorporated Engineer; degree-equivalent academic + significant engineering experience.
              </li>
              <li>
                <strong>CEng</strong> &mdash; Chartered Engineer; full degree route + chartered-level engineering practice.
              </li>
              <li>
                <strong>ICTTech</strong> &mdash; ICT Technician variant, for data / comms specialists.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Letting the ECS card lapse and being turned away at the gate"
            whatHappens={
              <>
                Electrician&apos;s ECS card expired 3 months ago; they&apos;ve been meaning to
                renew. Turn up Monday morning at a commercial site; gate scanner reports the card
                as lapsed; site safety officer refuses entry. Day&apos;s work lost; firm chases for
                an explanation; client may invoice for the lost day. Renewal then takes 5-10 working
                days even when actioned immediately, so it&apos;s typically 1-2 weeks before the
                electrician can return to that site.
              </>
            }
            doInstead={
              <>
                Set a calendar reminder 90 days before card expiry. Book the ECS HSEA test 60
                days before expiry. Submit the renewal application 30 days before expiry with the
                health-and-safety certificate in hand. Carry the receipt / interim confirmation
                from JIB if there&apos;s any gap. Most firms reimburse the renewal fee but won&apos;t
                cover lost days from lapse &mdash; that&apos;s on the individual.
              </>
            }
          />

          <CommonMistake
            title="Doing Part P notifiable work without CPS membership or building control notification"
            whatHappens={
              <>
                Sole-trader electrician does a consumer unit upgrade for a domestic customer.
                Not CPS-registered, doesn&apos;t notify building control. Three years later customer
                sells the property; conveyancing solicitor asks for the electrical certificate for
                the work; nothing is on file. Customer comes back to the electrician asking for the
                certificate &mdash; which can&apos;t be issued retrospectively without an EICR /
                inspection by a CPS-registered firm, which costs the customer hundreds to commission.
                Customer is angry, leaves a one-star review, possible small-claims action.
              </>
            }
            doInstead={
              <>
                Either join a CPS scheme before doing any Part P notifiable work, or notify
                building control on a per-job basis for any notifiable work done. CPS scheme
                membership cost (~&pound;500/year) is dramatically lower than per-job building
                control fees (~&pound;200-400 per job) for any volume of work. For occasional
                domestic notifiable work without CPS, factor the building control fee into the
                quote; tell the customer; arrange the notification properly.
              </>
            }
          />

          <Scenario
            title="Your apprenticeship is ending — how do you plan the qualifications stack?"
            situation={
              <>
                You&apos;re completing the C&amp;G 2365-03 Level 3 Diploma in March 2026. AM2S is
                booked for May 2026. You&apos;ll be 22 by completion. Your employer is a NICEIC
                Approved Contractor doing 70% commercial, 30% domestic, with a growing EV /
                PV side. How do you plan the next 5 years of qualifications?
              </>
            }
            whatToDo={
              <>
                <strong>Year 1 (2026) &mdash; lock down Installation Electrician status</strong>.
                Pass AM2S, secure Gold ECS card, take C&amp;G 2382-26 (the A4:2026 variant) to
                update your regs currency, sit the ECS HSEA test for site access. Build the
                portfolio &mdash; jobs worked, tests carried out, fault-finding events.
                <br /><br />
                <strong>Year 2 (2027) &mdash; add inspection and testing</strong>. Sit C&amp;G
                2391-52 to become Approved Electrician. Adds JIB grade uplift (~10-15% pay
                differential), unlocks EICR work and certificate-issuing on the firm&apos;s
                CPS scheme. Cost &pound;500-700 to sit; many employers fund or part-fund this.
                <br /><br />
                <strong>Year 3 (2028) &mdash; first specialist ticket</strong>. Given the firm&apos;s
                EV / PV side, pick one &mdash; C&amp;G 2919 for EV is probably the more
                immediately commercial. Cost &pound;300-600 plus the OZEV-approved installer
                pathway if the firm wants to do grant-funded work.
                <br /><br />
                <strong>Year 4 (2029) &mdash; second specialist + IET / EngTech</strong>. Add
                C&amp;G 2399 PV (cost &pound;400-700); position the firm for MCS PV registration.
                Apply for AMIET (IET Associate Member) at this point with 3+ years post-AM2
                experience; consider EngTech registration too.
                <br /><br />
                <strong>Year 5 (2030) &mdash; depth or breadth?</strong>. Either deepen
                specialist work (e.g. add FIA fire alarms, or battery storage manufacturer
                training, or move toward design / management) or pursue MIET upgrade. Plan for
                A5 BS 7671 amendment cycle CPD in this year too (estimated mid-decade timing).
                <br /><br />
                <strong>Budget across 5 years</strong>: roughly &pound;2,500-4,000 in qualification
                / scheme fees; mostly amortised across pay rises and JIB grade uplifts. Many
                employers fund the regs CPD (2382) entirely and part-fund specialist tickets.
              </>
            }
            whyItMatters={
              <>
                A planned qualifications stack compounds &mdash; each addition increases earning
                potential and opens new work categories. Without a plan most electricians stall
                at Installation Electrician for years; with a 5-year plan most reach Approved
                Electrician + two specialist tickets + AMIET / EngTech inside half a decade. The
                difference in lifetime earnings is substantial. Apprentices: write the plan during
                your final apprenticeship year; revise it annually.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "ECS card (JIB-administered) is the day-one industry ID — Gold for qualified Installation Electrician, Blue for apprentice, with band-specific renewal cycles.",
              "Part P (England) notifiable work in dwellings: new circuits, consumer unit replacement, special locations. Must be notified to building control OR self-certified via CPS scheme membership.",
              "Four main CPS schemes: NICEIC, NAPIT, ELECSA, STROMA. All provide the same Part P authority; differences are cost, brand recognition and bundled services.",
              "Core qualifications stack: Level 3 Diploma + AM2 / AM2S + C&G 2382 (regs, currently 2382-22) + C&G 2391 (inspection-testing) = Approved Electrician.",
              "Specialist tickets unlock specialist work and pay: C&G 2919 (EV), C&G 2399 (PV), FIA (fire), BS 5266 (emergency lighting), HV / ATEX for industrial.",
              "MCS certification (firm-level) needed for low-carbon installs accessing grants (SEG, Boiler Upgrade); OZEV approval for EV grant work.",
              "Professional registration: IET membership (AMIET / MIET / FIET) + Engineering Council (EngTech achievable for working electricians; IEng / CEng degree route).",
              "EWR 1989 Reg 16 is the statutory anchor — qualifications evidence 'technical knowledge or experience'; apprentice grades exist because Reg 16 also accepts supervision.",
            ]}
          />

          <Quiz title="Industry qualifications — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section4-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.4 Specialist CPD
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 5 — Employment and business
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
