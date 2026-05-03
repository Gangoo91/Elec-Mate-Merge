/**
 * Module 6 · Section 1 · Subsection 5 — Sources of information
 * Maps to C&G 2365-03 / Unit 305 / LO1 / AC 1.2, 1.7
 *
 * Layered depth: 2366-03 Unit 304 / AC 1.5; 5393-03 Unit 104 / AC 1.5
 *
 * Client brief, architect drawings, structural engineer notes,
 * DNO supply data, manufacturer datasheets, IET Guidance Notes,
 * On-Site Guide. Where each one fits and how to weight conflicts.
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

const TITLE = 'Sources of information that drive the design (1.5) | Level 3 Module 6.1.5 | Elec-Mate';
const DESCRIPTION =
  'Client brief, architect drawings, structural engineer notes, DNO supply data, manufacturer datasheets, IET Guidance Notes, On-Site Guide. Where each one fits and how to weight the conflicts.';

const checks = [
  {
    id: 'dno-source-precedence',
    question:
      'You receive a DNO Form 1 declaring Ze = 0.35 ohm. You also have a previous EICR for the building from 18 months ago that recorded measured Ze = 0.42 ohm. Which figure do you use for design-stage Zs calculation?',
    options: [
      'The measured 0.42 ohm — it is real data.',
      'The DNO declared 0.35 ohm — design uses the worst-case declared figure (lower Ze means higher Zs at fault, which the design must still satisfy). The measured figure is for verification, not design.',
      'Average them: 0.385 ohm.',
      'Measure again on site.',
    ],
    correctIndex: 1,
    explanation:
      "Design-stage Zs calc uses the DNO declared Ze figure because: (1) it is the contractually-binding number from the DNO, (2) the supply network can change between EICR and design (DNO upgrades, switching changes), (3) measured Ze is a snapshot. Ironically, lower declared Ze gives lower Zs which makes the disconnection times easier — but the design must still satisfy the regs at the declared figure. Measured Ze at verification should match or beat the design figure; if it does not, the design assumption was wrong.",
  },
  {
    id: 'manufacturer-vs-iet',
    question:
      'A manufacturer datasheet for a heat-pump compressor says "minimum cable 4 mm² T+E." Your IET GN1 cable selection method gives 6 mm² for the same load and route. Which do you specify?',
    options: [
      '4 mm² — the manufacturer knows their product.',
      '6 mm² — IET GN1 method is BS 7671-aligned and is what the EIC will be judged against. The manufacturer datasheet is product-specific minimum; BS 7671 cable selection is installation-specific worst-case (with all derating factors). Specify the higher of the two.',
      'Average: 5 mm² (which does not exist).',
      'Whichever is cheaper.',
    ],
    correctIndex: 1,
    explanation:
      "Manufacturer datasheets typically state the minimum cable for the appliance under reference conditions. The BS 7671 / IET GN1 method applies your specific Reference Method, ambient temperature, grouping and other derating factors. The two should agree if conditions match — they often do not because the install conditions are worse than the manufacturer reference. Always specify the higher of the two; never go below either floor. Document both in the cable schedule with the citation.",
  },
  {
    id: 'osg-vs-bs7671',
    question:
      'On a domestic CU upgrade you are unsure whether a 32 A ring final on 2.5 mm² T+E with the cable partly in 100 mm of insulation needs derating. The On-Site Guide (OSG) shows it as fine for typical domestic use. BS 7671 Table 4D5 plus the App 4 Reference Method derating gives a different answer. Which governs?',
    options: [
      'OSG — it is easier to read.',
      'BS 7671 — it is the source of truth. The OSG is a trusted simplification but is bounded by the assumptions on its inside cover. Where the install differs from those assumptions, go back to BS 7671 Appendix 4 directly. Document the BS 7671 calc in the design pack.',
      'Use the manufacturer cable rating.',
      'Whichever gives the smaller cable.',
    ],
    correctIndex: 1,
    explanation:
      "The OSG codifies BS 7671 selection for typical domestic and small commercial cases, with explicit assumptions (typical Reference Methods, no exceptional grouping, no exceptional ambient). When install conditions exceed those assumptions, go back to BS 7671 Appendix 4 Tables 4D1A through 4F4A and apply the proper Ca/Cg/Ci stack. The design pack documents the BS 7671 calc so the EIC defends correctly under audit. The OSG is a tool for everyday work; the regs are the source of truth.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which document is the source-of-truth for the supply characteristics required by Reg 313 of BS 7671?',
    options: [
      'The previous EICR.',
      'The DNO declaration (DNO Form 1 or equivalent) — written confirmation from the Distribution Network Operator of voltage, Ze, PSCC, earthing arrangement and conductor configuration.',
      'The customer’s description.',
      'The meter operator’s opinion.',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 313 supply characteristics must come from the DNO in writing. DNO Form 1 (or the equivalent on each DNO’s website) is the recognised document. Verbal estimates from the meter operator or installer assumptions from the previous EICR are not auditable and not contractually binding. Write to the DNO at the design stage; keep the response on file.",
  },
  {
    id: 2,
    question: 'IET Guidance Notes pair with which Parts of BS 7671?',
    options: [
      'GN1 with Part 5; GN3 with Part 6; GN5 with Chapter 41; GN6 with Chapter 43; GN7 with Part 7; GN8 with Chapter 54.',
      'All GNs replace BS 7671.',
      'GNs are optional decorative material.',
      'GNs only apply to commercial work.',
    ],
    correctAnswer: 0,
    explanation:
      "The IET Guidance Notes are the IET’s detailed elaboration of specific BS 7671 Parts and Chapters. They are not statutory but are widely treated as authoritative interpretation. GN1 (selection and erection), GN3 (inspection and testing), GN5 (electric shock), GN6 (overcurrent), GN7 (special locations), GN8 (earthing and bonding). Plus the On-Site Guide for typical domestic and small-commercial work.",
  },
  {
    id: 3,
    question: 'On a multi-discipline project, the architect’s drawings conflict with the M&E coordinator’s service routes. The L3 designer should:',
    options: [
      'Ignore the conflict and design what suits.',
      'Raise a Request for Information (RFI), record the conflict in the design log, propose a resolution that maintains BS 7671 and CDM safety, and only proceed once the resolution is recorded by the Principal Designer.',
      'Just follow the architect.',
      'Just follow the M&E coordinator.',
    ],
    correctAnswer: 1,
    explanation:
      "Conflict resolution on multi-discipline projects goes through the formal RFI process. Raise the conflict in writing, propose a safe resolution, and let the Principal Designer (or equivalent coordination role) record the agreed answer. Designing around an unresolved conflict puts you on the hook when the build hits the conflict and someone has to rework it.",
  },
  {
    id: 4,
    question: 'Manufacturer datasheets give which kind of information for the L3 design pack?',
    options: [
      'Product-specific minimum cable, fuse or breaker rating; protective device characteristic curves; PME compatibility statements; specific environmental ratings (IP / IK / temperature); installation method and clearances.',
      'Just the price.',
      'Marketing material only.',
      'Nothing useful for design.',
    ],
    correctAnswer: 0,
    explanation:
      "Manufacturer datasheets are essential design inputs. They give product-specific minimums (cable, fuse), trip and time-current curves, PME and earthing compatibility, IP and IK ratings, ambient temperature ranges, installation clearances and ventilation requirements. Always cite the datasheet revision in the design pack so the install matches the design intent.",
  },
  {
    id: 5,
    question: 'When the IET On-Site Guide simplification disagrees with a BS 7671 Appendix 4 detailed calc, which governs?',
    options: [
      'The On-Site Guide.',
      'BS 7671 (the source standard). The OSG is a trusted simplification bounded by stated assumptions. Where install conditions exceed the OSG assumptions, go back to BS 7671 Appendix 4 directly.',
      'Whichever the customer prefers.',
      'They never disagree.',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 is the source standard. The OSG simplifies for typical domestic and small-commercial use within explicit assumptions. When the install differs from those assumptions (ambient, grouping, Reference Method, special location), go back to BS 7671 directly. Document the calc.",
  },
  {
    id: 6,
    question: 'Which UK regulator publishes Approved Documents A through to S that interpret the Building Regulations?',
    options: [
      'The Department for Levelling Up, Housing and Communities (DLUHC, now MHCLG) — administered by Building Control bodies (local authority Building Control or Approved Inspectors).',
      'The HSE.',
      'The IET.',
      'The DNO.',
    ],
    correctAnswer: 0,
    explanation:
      "Building Regulations and Approved Documents are central government (DLUHC / MHCLG) policy. Compliance is verified by Building Control bodies — either local authority Building Control or independent Approved Inspectors. The IET publishes BS 7671 and the supporting GNs but does not have statutory enforcement powers.",
  },
  {
    id: 7,
    question: 'The client brief is a primary design input. What should it include for an L3 designer to start work?',
    options: [
      'Just a sketch and a budget.',
      'Functional requirements (what the installation must do), performance requirements (loads, future expansion, criticality of supplies), aesthetic requirements (accessory styles, colour, locations), operational requirements (maintenance access, isolation strategy, energy targets), and constraints (timescale, budget, planning conditions).',
      'A verbal description.',
      'A price for materials only.',
    ],
    correctAnswer: 1,
    explanation:
      "The client brief is the design input that drives most decisions. A complete brief covers function, performance, aesthetics, operation and constraints. Where the brief is verbal or incomplete, the L3 designer documents what they have understood and asks for sign-off in writing — this becomes part of the design pack and protects against later scope-creep complaints.",
  },
  {
    id: 8,
    question: 'How should the L3 designer record the source of every key design input?',
    options: [
      'Mental note.',
      'Citation in the design pack — DNO Form 1 reference number, manufacturer datasheet name and revision, IET Guidance Note edition and section, BS 7671 reg or table number. Each input traceable to its source on a single page.',
      'Just save the source documents in a folder.',
      'Email everything to the customer.',
    ],
    correctAnswer: 1,
    explanation:
      "Every design input should be cited in the design pack — source name, document reference, revision and date. The single-page citation makes the design auditable years later. Saving source documents in a folder is good practice but does not replace citation; the design pack is the audit trail.",
  },
];

const faqs = [
  {
    question: 'What if I cannot get a DNO Form 1?',
    answer:
      "Every UK DNO has an online form for supply data requests (UK Power Networks, National Grid Electricity Distribution, Northern Powergrid, Electricity North West, SP Energy Networks, SSEN). The standard turnaround is 5-10 working days; urgent requests can usually be expedited. If the response is delayed and the customer wants you to proceed, you can use the DNO’s default declared values for the supply type as an interim assumption (typically 0.35 ohm Ze for TN-C-S in built-up areas, 0.8 ohm for TT) — but document the assumption and re-check the design against the formal DNO response when it arrives. Never proceed to the EIC sign-off without the formal DNO data on file.",
  },
  {
    question: 'How do I read manufacturer time-current curves?',
    answer:
      "Time-current curves plot device tripping time (vertical axis, log scale, seconds) against fault current (horizontal axis, log scale, multiples of In). A B-curve MCB trips magnetically between 3 In and 5 In; C-curve between 5 In and 10 In; D-curve between 10 In and 20 In. The 0.4 s and 5 s disconnection-time bands required by BS 7671 Reg 411.3.2.2 sit on the curve at the fault current implied by the Zs you have calculated. If the calculated fault current sits in the magnetic-trip region of the curve, you achieve sub-cycle disconnection (within 100 ms typically). Use the curves to verify discrimination — the upstream device curve must sit above and to the right of the downstream curve over the full fault range.",
  },
  {
    question: 'Where do I find the IET Guidance Notes — and do I need every edition?',
    answer:
      "The current editions of GN1 to GN8 align with BS 7671:2018+A4:2026 — published by IET Standards. They are available in print, e-book and via IET membership digital subscription. You need the current edition that matches the BS 7671 amendment you are designing to. Older editions are useful historical reference but should not be cited as authority in a current design pack. Most designers keep GN1, GN3 and the OSG as physical books and access GN5/6/7/8 digitally as needed.",
  },
  {
    question: 'How do I weight conflicting information from multiple sources?',
    answer:
      "Hierarchy: (1) Statutory law (Building Regulations, Equality Act, Health and Safety at Work Act, Electricity at Work Regulations) — non-negotiable. (2) BS 7671 — the recognised standard. (3) IET Guidance Notes and the OSG — authoritative interpretation. (4) Manufacturer datasheets — product-specific minimum or specific. (5) Trade body guidance (NICEIC, NAPIT, ECA, BEAMA technical bulletins) — useful supplementary. (6) Industry custom and previous installation precedent — weakest. Where two sources within the same tier disagree (e.g. two manufacturer datasheets for similar products), pick the more conservative or seek a third source. Document the conflict and the resolution in the design log.",
  },
  {
    question: 'What does an RFI (Request for Information) look like?',
    answer:
      "A short numbered document with: project number, RFI number, date raised, who raised it, who it goes to, the question (specific and bounded — “cable route conflicts with HVAC duct shown on Drawing M-103 Rev C” not “the drawings are wrong”), the impact if not resolved (cost, time, safety), and the proposed resolution. The recipient (architect, structural engineer, M&E coordinator, Principal Designer) returns the answer in writing, dated and signed off. The RFI and response live in the project document register and protect everyone against “who decided that” arguments later. Use a project management tool (Procore, Asite, BIM 360, even shared spreadsheets) — never raise an RFI by phone alone.",
  },
  {
    question: 'How long should I keep design documentation?',
    answer:
      "BS 7671 Reg 132.13 says documentation must enable the installation to be operated, maintained, altered and extended over its life. Practical floor: keep design pack and EIC for the design life of the installation, typically 25-40 years for fixed wiring, 10-15 years for accessories. Building Regulations notification records (DESC, Building Control completion certificates) should be kept indefinitely. Professional indemnity claims can arise up to 6 years after delivery (15 years for negligence in some cases under the Limitation Act 1980), so 15+ years on file is a sensible insurance-driven floor for the design pack itself. Cloud storage with version control is now the norm; backup matters more than format.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module6-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 6 · Section 1 · Subsection 5"
            title="Sources of information that drive the design"
            description="Client brief, architect drawings, structural engineer notes, DNO supply data, manufacturer datasheets, IET Guidance Notes, On-Site Guide. Where each one fits, how to weight conflicts, and how to cite every input on the design pack so the calc is auditable years later."
            tone="amber"
          />

          <TLDR
            points={[
              "Every design input should be cited in the design pack: client brief, DNO Form 1 (or equivalent), architect and structural drawings, manufacturer datasheets (with revision), IET Guidance Notes (GN1-8) and the On-Site Guide. Single-page citation makes the calc auditable.",
              "Hierarchy when sources disagree: statutory law (Building Regs, Equality Act, EAWR), then BS 7671, then IET GNs / OSG, then manufacturer datasheets, then trade body guidance, then industry custom. Document the conflict and the resolution.",
              "On multi-discipline projects, conflict goes through the formal RFI process — written question, proposed resolution, written answer signed off by the Principal Designer. Designing around unresolved conflicts puts you on the hook later.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the primary sources of information for an L3 electrical design — client brief, DNO declaration, architect and structural drawings, manufacturer datasheets, IET GNs, OSG, BS 7671.',
              'Apply the source-hierarchy rule when multiple sources conflict and document the resolution in the design pack.',
              'Read manufacturer time-current curves and integrate the curve data with BS 7671 disconnection time and discrimination requirements.',
              'Cite each design input on a single citation page in the design pack so the calc is auditable years after handover.',
              'Raise and respond to formal Requests for Information (RFI) on multi-discipline projects to resolve conflicts before the build hits them.',
              'Maintain design documentation for the appropriate retention period (15+ years for the design pack, indefinitely for Building Regulations notification records).',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="The eight primary sources of information"
            plainEnglish="Brief, drawings, supply data, regs, GNs, OSG, datasheets, precedent. Eight inputs that produce one design pack."
            onSite="The professional habit is to write down where every input came from at the moment you use it. Two years later you cannot reconstruct the design without that habit."
          >
            <p>
              The L3 design pack is the synthesis of multiple inputs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Client brief</strong> — functional, performance, aesthetic, operational and budget requirements. Should be written and signed off, not verbal.</li>
              <li><strong>2. Architect and structural drawings</strong> — building layout, room functions, structural constraints, services voids, fire compartments, accessibility provisions.</li>
              <li><strong>3. M&E coordinator drawings</strong> — mechanical and other-services routes that the electrical design must work around or alongside.</li>
              <li><strong>4. DNO supply data</strong> — DNO Form 1 with voltage, Ze, PSCC, earthing arrangement, conductor configuration, maximum demand permitted.</li>
              <li><strong>5. BS 7671:2018+A4:2026</strong> — the core technical standard.</li>
              <li><strong>6. IET Guidance Notes (GN1-8) and On-Site Guide</strong> — authoritative interpretation and worked examples.</li>
              <li><strong>7. Manufacturer datasheets</strong> — product-specific cable, device, accessory and equipment data with installation requirements.</li>
              <li><strong>8. Industry guidance</strong> — Building Regulations Approved Documents, BS-series standards (BS 5266 emergency lighting, BS 5839 fire alarm, BS 7430 earthing, BS 7671 itself), Health and Safety Executive guidance, NICEIC and NAPIT technical bulletins.</li>
            </ul>
            <p>
              Each input has a place in the design pack and a citation reference. Where two inputs disagree, the source-hierarchy rule resolves it — statutory law over BS 7671 over IET GNs over manufacturer over precedent. Document the conflict and the resolution.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.2(c)(iv) (Prospective fault current)"
            clause="The documentation shall include prospective fault current. Designers shall determine and record the prospective (available) fault current at relevant points to select protective devices and ensure disconnection requirements are achievable."
            meaning={
              <>
                Reg 132.2(c)(iv) is the explicit hook for &quot;get the supply data from the DNO before you start&quot;. The DNO declaration (Form 1 or each DNO’s online equivalent) is the source-of-truth document — covering nominal voltage, frequency, max allowable current, prospective fault current and external earth fault loop impedance. It must be on file in the design pack and quoted on the EIC. Without it, every design decision downstream is unsupported.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.2(c)(iv)."
          />

          <SectionRule />

          <ContentEyebrow>Source 1 — the client brief</ContentEyebrow>

          <ConceptBlock
            title="The client brief — the most-skipped, most-important source"
            plainEnglish="Function, performance, aesthetics, operation, constraints. Five headings. If the customer has not given you all five, you are guessing."
          >
            <p>
              A complete client brief covers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Function</strong> — what the installation must do. Lighting type per room, socket numbers and positions, special-purpose circuits (cooker, shower, EV, PV, heat pump, AV, IT).</li>
              <li><strong>Performance</strong> — loads, anticipated peak demand, criticality (which circuits cannot tolerate downtime), expansion provision (future EV, future PV, future loft conversion).</li>
              <li><strong>Aesthetics</strong> — accessory style and finish, conspicuous-or-flush mounting, surface or recessed luminaires, customer-preferred brand or scheme membership constraints.</li>
              <li><strong>Operation</strong> — who maintains, isolation strategy, smart-home integration, energy monitoring, periodic test access.</li>
              <li><strong>Constraints</strong> — budget, timescale, planning conditions, conservation-area restrictions, listed-building consent if applicable.</li>
            </ul>
            <p>
              Where the brief is verbal or incomplete, the L3 designer writes back what they have understood and asks for written sign-off. This single email or short brief acceptance document protects against later scope-creep complaints and forms part of the design pack.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Source 2 — DNO supply data</ContentEyebrow>

          <ConceptBlock
            title="DNO Form 1 — the supply truth"
            plainEnglish="Write to the DNO, get the data in writing. Voltage, Ze, PSCC, earthing arrangement, conductor configuration, maximum demand. Without it the design is a guess."
            onSite="Allow 5-10 working days for a DNO supply data response. On urgent jobs you can use default declared values as an interim assumption but never sign the EIC without the formal DNO data on file."
          >
            <p>
              The UK DNOs (UK Power Networks, National Grid Electricity Distribution, Northern Powergrid, Electricity North West, SP Energy Networks, SSEN) each publish a supply data request form on their website. The standard turnaround is 5-10 working days; urgent and connection-application requests can be expedited.
            </p>
            <p>
              The DNO declaration covers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Service type and earthing arrangement (TN-S, TN-C-S PNB or PME, TT) — and where TN-C-S is used, sometimes the rural overhead line lost-neutral risk note.</li>
              <li>Nominal voltage and tolerance.</li>
              <li>Maximum demand permitted (often the gating factor on EV / heat pump / PV designs).</li>
              <li>External earth fault loop impedance Ze (declared maximum at the cut-out).</li>
              <li>Prospective short-circuit current (PSCC) at the origin.</li>
              <li>Type and rating of the supply protective device (typically 60 A or 100 A BS 88-3 service fuse).</li>
              <li>Network conductor configuration (single-phase, three-phase 3-wire, three-phase 4-wire).</li>
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

          <ContentEyebrow>Sources 3-5 — drawings, regs and guidance</ContentEyebrow>

          <ConceptBlock
            title="Architect, structural and M&E drawings — the coordination layer"
            plainEnglish="Layout, structure, services. Three drawing sets that must agree before you commit to cable routes and DB locations."
          >
            <p>
              On any project larger than a domestic CU upgrade, the L3 designer works alongside other disciplines:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Architect drawings</strong> — building layout, room functions, finishes, fire compartments, accessibility provisions, conservation constraints.</li>
              <li><strong>Structural engineer notes</strong> — load-bearing walls (no chasing without consent), steel positions, slab thickness (cable depth restrictions), penetration constraints.</li>
              <li><strong>M&E coordinator drawings</strong> — HVAC routes, plumbing risers, gas service positions, ducting, sprinkler layouts. Your cables must avoid or work around these.</li>
              <li><strong>Fire engineer drawings</strong> — escape routes, fire compartments, smoke-control zones, fire alarm device positions, evacuation lift requirements.</li>
              <li><strong>Acoustic engineer notes</strong> — for hospitality, education and healthcare, where transformer noise and switchgear hum can affect compliance with acoustic targets.</li>
            </ul>
            <p>
              On larger projects these sit in a Common Data Environment (CDE) — Procore, Asite, BIM 360, Autodesk Construction Cloud, etc. The L3 designer pulls the drawings, cross-references them against the electrical design, raises RFIs for conflicts and uploads the electrical drawings back into the CDE.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="BS 7671 and the IET GNs / OSG — the technical floor"
            plainEnglish="BS 7671 is the source of truth. The GNs and OSG are trusted simplifications and worked examples. Always cite the BS 7671 reg or table number on the design pack."
          >
            <p>
              The IET Guidance Notes are the IET’s detailed elaboration of specific BS 7671 Parts and Chapters:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>GN1</strong> — Selection and Erection. The most-used GN; covers Part 5 in depth.</li>
              <li><strong>GN3</strong> — Inspection and Testing. Covers Part 6 in depth.</li>
              <li><strong>GN5</strong> — Protection Against Electric Shock. Covers Chapter 41 in depth.</li>
              <li><strong>GN6</strong> — Protection Against Overcurrent. Covers Chapter 43 in depth.</li>
              <li><strong>GN7</strong> — Special Locations. Covers Part 7 in depth.</li>
              <li><strong>GN8</strong> — Earthing and Bonding. Covers Chapter 54 in depth.</li>
              <li><strong>On-Site Guide (OSG)</strong> — the day-to-day pocket book for typical domestic and small-commercial work.</li>
            </ul>
            <p>
              The OSG simplifies BS 7671 selection for typical cases under explicit assumptions (typical Reference Methods, no exceptional grouping, no exceptional ambient). Where install conditions exceed those assumptions, go back to BS 7671 directly. Document the calc.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Source 6 — manufacturer datasheets</ContentEyebrow>

          <ConceptBlock
            title="Manufacturer datasheets — product-specific design data"
            plainEnglish="What the device or cable can actually do. Time-current curves, breaking capacity, IP rating, ambient temperature range, installation clearances. Cite the revision in the design pack."
            onSite="Datasheets get superseded. Always note the revision and date on the citation. The device installed must be the device designed."
          >
            <p>
              Manufacturer datasheets typically include:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Trip and time-current curves</strong> — for circuit-breakers and RCBOs, plotting tripping time against fault current.</li>
              <li><strong>Breaking capacity (Icu, Ics)</strong> — Icu is the rated ultimate short-circuit breaking capacity; Ics is the rated service short-circuit breaking capacity (the device must remain serviceable after operation at this current).</li>
              <li><strong>IP / IK ratings</strong> — environmental and impact protection.</li>
              <li><strong>Ambient temperature range</strong> — devices typically rated for -5 deg C to +40 deg C; outdoor and high-ambient locations need rated devices or derating.</li>
              <li><strong>Installation clearances</strong> — heat dissipation, ventilation, doorset clearances, conduit entry positions.</li>
              <li><strong>Compatibility statements</strong> — RCD type compatibility (Type AC, A, F, B), TN-C-S / PME compatibility, fire compartment integrity.</li>
              <li><strong>Test data</strong> — verified per IEC test procedures, with certificate references.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Resolving conflicts — the source hierarchy</ContentEyebrow>

          <ConceptBlock
            title="The source-hierarchy rule"
            plainEnglish="When sources disagree, work down the list: statutory law, BS 7671, IET GNs, manufacturer, trade body, industry custom. Document the conflict and the resolution."
          >
            <p>
              The hierarchy applies when two sources within the design give different answers:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li><strong>Statutory law</strong> — Building Regulations, Equality Act, Electricity at Work Regulations, Health and Safety at Work Act. Non-negotiable.</li>
              <li><strong>BS 7671</strong> — the recognised technical standard.</li>
              <li><strong>IET Guidance Notes and the On-Site Guide</strong> — authoritative interpretation, but bounded by their stated assumptions.</li>
              <li><strong>Manufacturer datasheets</strong> — product-specific, but specific to that product and its tested conditions.</li>
              <li><strong>Trade body guidance</strong> — NICEIC, NAPIT, ECA, BEAMA technical bulletins. Useful supplementary, especially on fast-moving topics like AFDD, EV charger O-PEN protection, PV battery integration.</li>
              <li><strong>Industry custom and previous installation precedent</strong> — weakest source. "We always do it this way" is not a defence if the design is challenged.</li>
            </ol>
            <p>
              When two sources within the same tier disagree (two manufacturer datasheets for similar products, two trade bulletins from different bodies), pick the more conservative or seek a third source. The conflict and the resolution go in the design log.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The design pack — what goes inside, in what order"
            plainEnglish="A pack you can hand to another competent person and they can extend the installation safely. Cover sheet, citations, assessments, calcs, schedules, drawings, risk register, change log, sign-off."
            onSite="A consistent design-pack template across all your jobs makes year-on-year work easier and audits trivial. Build the template once and reuse it."
          >
            <p>
              A complete L3 design pack typically contains:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cover sheet</strong> — project name, address, client, designer name and
                qualifications, scheme membership, PI insurance reference, BS 7671 amendment level
                (e.g. BS 7671:2018+A4:2026), Building Regulations notification route, Equality Act
                anticipatory-duty statement, revision number and date.
              </li>
              <li>
                <strong>Citation page</strong> — every input source listed with reference, revision
                and date. DNO Form 1 ref, manufacturer datasheets, IET GN editions, Approved
                Documents, BS-series standards.
              </li>
              <li>
                <strong>Part 3 assessment sheet</strong> — Reg 311 (max demand with diversity),
                Reg 312 (division of installation), Reg 313 (supply characteristics), Reg 314
                (external influences with Appendix 5 codes per zone).
              </li>
              <li>
                <strong>Reg 132 mapping</strong> — one-page map of each 132.x consideration to the
                deliverable that satisfies it.
              </li>
              <li>
                <strong>Calculations</strong> — cable sizing per circuit (Reference Method, Ca, Cg,
                Ci, voltage drop), EFLI Zs at design stage (Cmin 0.95 applied — Table 41.3 floors
                e.g. B32 = 1.37 ohm at A4:2026), discrimination check, thermal adiabatic check on
                CPCs.
              </li>
              <li>
                <strong>Schedules</strong> — circuit schedule (number, function, cable, device,
                Zs design, Zs limit), accessory schedule (heights, contrast, types),
                accessibility-aid schedule, fire-alarm device schedule.
              </li>
              <li>
                <strong>Drawings</strong> — single-line schematic, layout drawings (cable routes,
                accessory positions, DB locations, fire-stop positions), schematic of safety
                services (Section 56), refuge point comms layout where applicable.
              </li>
              <li>
                <strong>Design risk register</strong> — CDM 2015 hazard log with design action
                and residual risk per item.
              </li>
              <li>
                <strong>Change log</strong> — every revision since first issue, with reason,
                affected drawings/schedules, RFI references.
              </li>
              <li>
                <strong>Sign-off</strong> — designer signature, date, professional indemnity
                policy reference, scheme membership reference, BS 7671 amendment level cited.
              </li>
            </ol>
            <p>
              Version control matters as much as content. Every page footer should carry the
              project number, revision letter, date and "uncontrolled if printed" notice. The
              master pack lives in cloud storage with version history; superseded revisions are
              retained but clearly marked. Twenty years from now the next designer should be able
              to pick up the pack, open the change log, and reconstruct every decision since first
              issue.
            </p>
          </ConceptBlock>

          <Scenario
            title="Heat pump retrofit — multiple sources resolved"
            situation={
              <>
                You are designing a 12 kW air-source heat pump retrofit on an existing 100 A TN-C-S supply in a four-bed dwelling. The customer brief specifies a Mitsubishi Ecodan; the manufacturer datasheet states "minimum cable 6 mm² T+E, RCD Type A 30 mA, dedicated radial." The IET GN1 cable selection method gives 10 mm² for the 25 m cable run with 2 m in 100 mm of insulation and grouping with two other circuits in a 16 mm conduit. The OSG simplification gives 6 mm² for typical heat pump circuits without grouping. The DNO Form 1 confirms the supply is TN-C-S (PME) with 100 A capacity, current peak demand assessed at 65 A.
              </>
            }
            whatToDo={
              <>
                Source hierarchy: BS 7671 / IET GN1 calc governs over OSG simplification because the install conditions exceed OSG assumptions (grouping in conduit, partial insulation enclosure). Specify 10 mm² T+E to GN1 method. Manufacturer datasheet 6 mm² minimum is satisfied (10 mm² is greater). RCD specification: manufacturer says Type A; check the Mitsubishi inverter spec for DC content — if the inverter generates DC fault residuals greater than 6 mA, BS 7671 Section 722 (analogous EV requirement) and the latest BEAMA bulletin push to Type B (or Type A with a DC monitoring relay). Document the cable calc per GN1 in the design pack with citations: BS 7671 Table 4D5 Reference Method 100, App 4 Ca 0.94 (ambient 35 deg C), Cg 0.79 (3 circuits in conduit), Ci 0.78 (partial insulation), Mitsubishi datasheet rev 2024-Q3, DNO Form 1 ref XXXX.
              </>
            }
            whyItMatters={
              <>
                Without the source-hierarchy discipline, the designer might cite the OSG and install 6 mm². Six months later the cable runs hot under sustained heat pump load, the insulation degrades, and the fault becomes an EICR finding (or an insurance claim). The design pack with explicit citations defends against this — the inspector can see which source was used and why, and can verify the Reference Method and derating stack for themselves. The single page of citations turns an opinion into evidence.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Citing the OSG when conditions exceed its assumptions"
            whatHappens={
              <>
                A designer specifies 2.5 mm² for a 32 A ring final based on the OSG, but the install runs 18 m of the cable through the loft above 100 mm of insulation in a two-circuit grouping. The OSG’s assumed conditions do not include this grouping or insulation enclosure. The cable fails CCC under the actual derating stack. EICR findings six months later code C2.
              </>
            }
            doInstead={
              <>
                When install conditions exceed the OSG assumed conditions, go back to BS 7671 Appendix 4 Tables and apply the Reference Method, Ca, Cg, Ci stack explicitly. Document the calc in the design pack with the source citations. The OSG is for typical cases within its own footnoted assumptions; pushing past those assumptions without going back to BS 7671 is the source of most CCC errors.
              </>
            }
          />

          <CommonMistake
            title="Using a verbal client brief"
            whatHappens={
              <>
                The customer says "the usual" and the designer assumes a typical socket density. The customer expected dedicated AV power on every wall. The disagreement at handover becomes a payment dispute. Without a written brief acceptance, both parties have a reasonable case.
              </>
            }
            doInstead={
              <>
                After the initial conversation, write back what you have understood (functional, performance, aesthetic, operational, constraints — the five headings). Ask for written sign-off. Even a one-paragraph email reply ("yes, this is what I want") is enough. The brief acceptance becomes part of the design pack and protects against scope-creep.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.2(c)(iii) (Maximum allowable current)"
            clause={
              <>
                The documentation shall include maximum current allowable. Designers shall
                calculate and record the maximum permissible current capacity for the supply
                and protective devices as part of supply characteristics.
              </>
            }
            meaning={
              <>
                Customer briefing closes one part of the design pack; supply characteristics
                close another. The designer must determine and record the maximum allowable
                current, alongside the other Reg 132.2 supply data — nature of current,
                conductor count, voltage and tolerances, frequency, prospective fault current,
                and external earth fault loop impedance. Assumed values are not acceptable —
                measurement, enquiry or calculation is required.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.2(c)(iii)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.6 (Cross-sectional area of conductors)"
            clause={
              <>
                The cross-sectional area (csa) of conductors shall be determined for both normal
                operating conditions and, where appropriate, for fault conditions according to:
                (a) the admissible maximum temperature; (b) the admissible voltage drop;
                (c) the electromechanical stresses likely to occur due to short-circuit and
                earth fault currents; (d) other mechanical stresses to which the conductors
                are likely to be exposed; (e) the maximum impedance for correct operation of
                short-circuit and earth fault protection; (f) the method of installation;
                (g) harmonics; (h) thermal insulation.
              </>
            }
            meaning={
              <>
                Once the customer brief and supply characteristics are recorded under Reg 132.2,
                conductor sizing is the next design output the pack must demonstrate. Reg 132.6
                lists the eight inputs the designer must consider — current rating, voltage
                drop, fault current stress, impedance for ADS, install method, harmonics,
                thermal insulation. Each input traces back to data the brief or DNO Form 1
                supplied. Recording the csa rationale against these eight criteria is what
                makes the design defensible at handover and at the next periodic inspection.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 132.6."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Eight primary sources: client brief, architect drawings, M&E drawings, DNO supply data, BS 7671, IET GNs and OSG, manufacturer datasheets, industry guidance. Each input has a place in the design pack and a citation reference.",
              "Client brief covers function, performance, aesthetics, operation and constraints. Where the brief is verbal or incomplete, write back what you have understood and ask for sign-off.",
              "DNO Form 1 (or equivalent) is the source-of-truth for Reg 313 supply characteristics. Allow 5-10 working days. Never sign the EIC without the formal DNO data on file.",
              "BS 7671 is the source of truth; IET GNs and OSG are authoritative interpretation bounded by their stated assumptions. Where install conditions exceed OSG assumptions, go back to BS 7671 Appendix 4 directly.",
              "Manufacturer datasheets give product-specific minimums and trip curves. Cite the revision and date in the design pack. The device installed must be the device designed.",
              "Source-hierarchy rule for resolving conflicts: statutory law, BS 7671, IET GNs, manufacturer, trade body, industry custom. Document the conflict and the resolution in the design log.",
              "RFI process for multi-discipline projects: short numbered written question, proposed resolution, written answer signed off by the Principal Designer. Designing around unresolved conflicts puts you on the hook.",
              "Retain design documentation 15+ years (PI claim window plus margin); Building Regulations notification records indefinitely. Cloud storage with version control is the norm; backup matters more than format.",
            ]}
          />

          <Quiz title="Sources of information — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.4 Equality Act + accessibility
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Section landing <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 1 — Design framework
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
