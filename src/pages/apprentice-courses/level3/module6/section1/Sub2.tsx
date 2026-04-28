/**
 * Module 6 · Section 1 · Subsection 2 — BS 7671 Parts 1, 2 and 3
 * Maps to C&G 2365-03 / Unit 305 / LO1 / AC 1.2, 1.3
 *
 * Layered depth: 2366-03 Unit 304 / AC 1.2; 5393-03 Unit 104 / AC 1.2
 *
 * The three Parts of BS 7671 you read first on every new design and
 * revisit every time something unusual lands. Scope, definitions and
 * the assessment of general characteristics — Reg 311 to 314.
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

const TITLE = 'BS 7671 Parts 1, 2 and 3 (1.2) | Level 3 Module 6.1.2 | Elec-Mate';
const DESCRIPTION =
  'The three Parts you read first on every new design. Scope, definitions and the assessment of general characteristics — Reg 311 to 314 — that frame every later decision.';

const checks = [
  {
    id: 'parts-purpose',
    question:
      'Your client asks why the design pack quotes Reg 311.1 instead of just listing the cable sizes. What is the most professional response?',
    options: [
      'It is the rule, no further explanation needed.',
      'Reg 311.1 forces you to assess maximum demand BEFORE you size anything. The cable schedule is the output of the calc, not the calc itself — Part 3 is the audit trail that proves the calc was done.',
      'Because Building Control demand to see it.',
      'Quoting regs makes the document look professional.',
    ],
    correctIndex: 1,
    explanation:
      "Reg 311 (Maximum demand and diversity) is the first numerical assessment in any design. Without it, every cable size is a guess. The design pack quotes Part 3 because that is the regulatory anchor for every downstream calculation — supply characteristics, demand, division of installation, compatibility and external influences. The cable schedule shows what you picked; Part 3 shows you were entitled to pick it.",
  },
  {
    id: 'scope-exclusions',
    question:
      'A client wants you to design the LV side of a 11 kV/400 V transformer-fed installation in a small data centre. Which Part of BS 7671 tells you this is in scope, and what does it specifically exclude?',
    options: [
      'Part 1 — it covers everything.',
      'Part 1 (Reg 110) covers the LV installation up to and including the main switchgear; the HV side and the supply transformer are excluded because they are the property and responsibility of the DNO or private network operator.',
      'Part 2 — definitions only.',
      'Part 3 only — Part 1 does not deal with scope.',
    ],
    correctIndex: 1,
    explanation:
      "Reg 110.1 sets the scope: BS 7671 covers the design, erection and verification of electrical installations operating at LV (up to 1000 V AC). It explicitly excludes systems for the distribution of energy to the public, generation transmission and distribution by the supply industry, and railway / aircraft / marine traction equipment. On a private 11 kV/400 V installation the LV side from the secondary terminals down is in scope; the HV switchgear and transformer primary side are not — those need a separate competent person operating to ENA or similar standards.",
  },
  {
    id: 'definitions-precision',
    question:
      'You read in a manufacturer datasheet: "suitable for use as a circuit-breaker in accordance with BS EN 60898." A junior asks if this means the same thing as RCBO. The correct answer references which Part?',
    options: [
      'Part 1 — scope.',
      'Part 2 — Definitions. A circuit-breaker (BS EN 60898) provides overcurrent protection only; an RCBO (BS EN 61009) combines overcurrent with residual-current protection. The two terms are not interchangeable and the wrong device gives the wrong protection.',
      'Part 3 — assessment.',
      'Part 4 — protection.',
    ],
    correctIndex: 1,
    explanation:
      "Part 2 of BS 7671 is the definitions register. Circuit-breaker, RCBO, RCD, AFDD, SPD — each has a precise definition tied to a specific product standard. Mis-using terms in a design specification can lead the installer to fit the wrong device. Always quote the product standard alongside the device type in your specification: B32 RCBO to BS EN 61009-1, 30 mA Type A is unambiguous; a 32 A breaker with RCD is not.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 7671 is divided into seven Parts. Which three sit above all the design work in this module?',
    options: [
      'Parts 4, 5 and 6.',
      'Parts 1 (Scope, object and fundamental principles), 2 (Definitions), and 3 (Assessment of general characteristics).',
      'Parts 5, 6 and 7.',
      'Just Part 4 — protection.',
    ],
    correctAnswer: 1,
    explanation:
      "Parts 1 to 3 frame every design. Part 1 sets the scope and the fundamental safety principles (Chapters 11 to 14); Part 2 defines every term used elsewhere in the standard; Part 3 (Reg 311 to 314) is the assessment of general characteristics that the designer must complete before sizing anything.",
  },
  {
    id: 2,
    question: 'Reg 311 (Maximum demand and diversity) requires you to do what at the design stage?',
    options: [
      'Total up the connected load and use that as the design current.',
      'Determine the maximum demand of the installation, having due regard to diversity, before selecting cables and protective devices.',
      'Wait for the EICR to tell you the actual demand.',
      'Assume the same demand as the previous installation.',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 311.1 specifically calls for assessment of maximum demand WITH diversity. Connected load (sum of nameplate ratings) is almost always larger than realistic peak demand because not every appliance runs at full load simultaneously. Diversity factors (IET On-Site Guide Table A1, IET GN1) reduce connected load to a defensible peak.",
  },
  {
    id: 3,
    question: 'Reg 312 covers division of the installation. Why does the designer care about this at design stage?',
    options: [
      'To make wiring easier.',
      'To limit the consequences of a fault, simplify safe inspection and testing, take account of danger, and avoid hazards arising from a single fault — by deciding how circuits are grouped, how DBs are arranged and how isolation works.',
      'To save money on cable.',
      'It is purely an aesthetic decision.',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 312 (Division of installation) names the structural decisions: how many DBs, how circuits are grouped, what gets dedicated supplies (e.g. fire alarm, IT critical loads, life-safety systems), how isolation is achieved, and how the installation can be partially shut down for maintenance without losing critical functions.",
  },
  {
    id: 4,
    question: 'Reg 313 covers supply characteristics. The designer must know all of the following EXCEPT:',
    options: [
      'Nominal voltage and tolerance.',
      'Number and type of live conductors.',
      'Earthing arrangement (TN-S, TN-C-S, TT, IT) and external earth fault loop impedance Ze.',
      'The colour of the meter cover.',
    ],
    correctAnswer: 3,
    explanation:
      "Reg 313 lists the supply characteristics that drive every protection and earthing decision: voltage, current, frequency, PSCC, Ze, earthing arrangement, conductor configuration. The aesthetic of the meter cover is not a regulatory matter. Get this list from the DNO declaration before you start designing.",
  },
  {
    id: 5,
    question: 'Reg 314 covers external influences. Which BS 7671 Appendix gives you the full classification matrix?',
    options: [
      'Appendix 4.',
      'Appendix 5 — the AA / AB / AC and BD classification of environment, utilisation and building construction.',
      'Appendix 14.',
      'Appendix 17.',
    ],
    correctAnswer: 1,
    explanation:
      "Appendix 5 is the IEC 60364-5-51 classification scheme: AA (ambient temperature), AB (humidity), AD (water), AE (foreign bodies), AF (corrosive substances), AG (mechanical stresses), AK (flora), AL (fauna), AN (solar), AP (seismic), BA (capability of persons), BB (electrical resistance of body), BC (contact with earth), BD (evacuation conditions), BE (fire risk). The designer must classify the location and select equipment with matching IP / IK / temperature ratings.",
  },
  {
    id: 6,
    question: 'Why does the L3 designer care about Reg 132 (in Part 1) AND Reg 311 to 314 (in Part 3)?',
    options: [
      'Part 1 says what must be done; Part 3 says how to assess the inputs to those decisions. Both apply.',
      'They duplicate each other.',
      'Part 3 is for installers only.',
      'Part 1 is optional for residential work.',
    ],
    correctAnswer: 0,
    explanation:
      "Part 1 names the design responsibility (Reg 132) and lists fourteen specific design considerations. Part 3 (Reg 311 to 314) is the structured assessment that produces the inputs for those design considerations. The designer reads both: Part 1 to understand what they must produce; Part 3 to understand how to evidence the inputs.",
  },
  {
    id: 7,
    question: 'On a small commercial fit-out the DNO declares Ze = 0.35 ohm, PSCC = 16 kA, three-phase 400/230 V TN-C-S, 100 A per phase. Which Reg is this information collected against?',
    options: [
      'Reg 311.',
      'Reg 313 — supply characteristics. The figures must be on the design pack and on the EIC, and they cap every protective device decision downstream.',
      'Reg 421.',
      'Reg 525.',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 313 collects supply characteristics. The PSCC of 16 kA caps the breaking capacity of every device on the installation: every MCB, RCBO, switch-disconnector, BS 88 fuse must be rated for at least 16 kA, or be backed up by an upstream device that limits PSCC at the next level (cascade or energy let-through). Without the supply data on file you cannot prove device adequacy at design stage.",
  },
  {
    id: 8,
    question: 'You discover during the survey that the existing building is classified BE2 (fire propagation risk) under Appendix 5. Which design decisions follow from that?',
    options: [
      'No change — BE2 only affects testing.',
      'Wiring systems must be selected to limit propagation of fire (Reg 527.1.2), penetrations must be fire-stopped (Reg 527.2), specific cable types may be required (LSF/LSZH or fire-resistant), and segregation from escape routes must be reviewed (Section 422).',
      'The whole building must be rewired in MICC.',
      'Switch off all ring finals.',
    ],
    correctAnswer: 1,
    explanation:
      "BE2 classification (locations with fire propagation risk) triggers the requirements of Section 422 of BS 7671 — restricted use of certain wiring system materials, fire-stopping of penetrations, and reviewed cable selection (typically LSF/LSZH for escape routes; fire-resistant for life-safety circuits). The assessment in Part 3 directly drives selection decisions in Part 5.",
  },
];

const faqs = [
  {
    question: 'I keep hearing "the regs". Is BS 7671 a law?',
    answer:
      "BS 7671 is not statutory in itself. It is a British Standard, written by the IET and BSI, that codifies what the industry considers safe practice for LV electrical installations. However, the Electricity at Work Regulations 1989 (statutory under the Health and Safety at Work Act 1974) require electrical systems to be safe, and HSE guidance treats compliance with BS 7671 as the practical means of demonstrating that. So while breaching BS 7671 is not directly a criminal offence, it is the recognised yardstick by which a court will judge whether you met your statutory duty. In practice, designers and installers treat BS 7671 as binding.",
  },
  {
    question: 'Do I need to know the whole 600-page book?',
    answer:
      "Working knowledge of Parts 1, 2, 3 and 6 (and the day-to-day chapters of Parts 4 and 5 you use most — 411 ADS, 433 overload, 521 to 525 wiring systems) is the realistic floor. Beyond that, you need to know what is in the book so you can find it. Part 7 (special locations: bathrooms 701, swimming pools 702, agriculture 705, EV 722, PV 712, etc.) you read when the project type lands on your desk. Appendix 4 (cable CCC), Appendix 14 (now Appendix 3, voltage drop and EFLI worked examples), and Appendix 15 (ring final data) you use every day. Memorising the book is impossible and pointless; knowing where to look is the skill.",
  },
  {
    question: 'How often does BS 7671 change?',
    answer:
      "Major editions every 7-10 years; amendments (Corrigenda or Amendment 1, 2, 3, 4) at intervals of 18 months to 4 years. The current edition is BS 7671:2018 with Amendment 4 (A4:2026), which brought in stricter AFDD recommending wording (Reg 421.1.7), TN-C-S earthing nuances, the new Cmin 0.95 voltage factor moved to Appendix 3, schedule of test results column changes, and various Section 7 updates (notably 712 PV, 722 EV, 753 underfloor heating). The amendment effective date for new designs and full re-design is hard, but installation in progress can usually complete to the previous edition with documented justification — check the BSI / IET transition wording on every amendment.",
  },
  {
    question: 'Which IET Guidance Notes pair with which Parts?',
    answer:
      "GN1 Selection and Erection — pairs with Part 5 and is the most-used. GN3 Inspection and Testing — Part 6. GN5 Protection Against Electric Shock — Chapter 41. GN6 Protection Against Overcurrent — Chapter 43. GN7 Special Locations — Part 7. GN8 Earthing and Bonding — Chapter 54. The On-Site Guide is the day-to-day domestic and small-commercial pocket book that condenses all of them. For design work you typically have the OSG plus GN1 plus GN3 within arm reach; the deeper GNs come out for unusual jobs.",
  },
  {
    question: 'What is the difference between Part 3 and Part 5 in practice?',
    answer:
      "Part 3 (Reg 311 to 314) tells you what to ASSESS — the inputs to the design. Part 5 tells you what to SELECT — the wiring systems, switchgear, accessories and equipment that satisfy the assessment. So Part 3 says the location is BE2 fire risk; Part 5 (Section 422 and 527) tells you what cable type, fire-stopping and segregation to specify. The order matters: assess in Part 3 first, then look up the matching selection requirements in Part 5.",
  },
  {
    question: 'How do I evidence the Part 3 assessment in my design pack?',
    answer:
      "A one- or two-page Assessment Sheet listing each of the four Reg 311-314 headings with your numerical answer or classification: maximum demand (kVA, A per phase, after diversity); division of installation (DB layout summary, dedicated supplies); supply characteristics (DNO Form 1 or equivalent — voltage, Ze, PSCC, conductor configuration, earthing arrangement); external influences (Appendix 5 codes for the specific location). On a small domestic job this can be embedded in the cover sheet of the design pack; on a commercial fit-out it is its own appendix. The point is that an inspector or future designer can see the inputs to your calc, not just the outputs.",
  },
];

export default function Sub2() {
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
            eyebrow="Module 6 · Section 1 · Subsection 2"
            title="BS 7671 Parts 1, 2 and 3 — the design ground"
            description="Scope, definitions and the assessment of general characteristics. The three Parts you read first on every new design and revisit every time something unusual lands."
            tone="amber"
          />

          <TLDR
            points={[
              "Part 1 sets the scope (Reg 110 — what BS 7671 covers and what it does not) and the fundamental safety principles. Part 2 is the definitions register that locks every technical term to a precise meaning. Part 3 (Reg 311 to 314) is the assessment of general characteristics — the structured inputs to every later design decision.",
              "The four Reg 311 to 314 headings are: maximum demand and diversity (311), division of the installation (312), supply characteristics (313) and external influences (314). Every L3 design pack must show evidence against each.",
              "Appendix 5 is the IEC 60364 classification matrix for external influences (AA, AB, BA, BD, BE codes). Without classifying the location, you cannot select equipment with the right IP / IK / temperature / fire ratings.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the seven Parts of BS 7671 and explain the distinct role of Parts 1, 2 and 3 in the L3 design workflow.',
              'Apply Reg 110 (Scope) to determine which work is and is not covered by BS 7671 — and where the regulatory boundary with the DNO and HV side sits.',
              'Use Part 2 definitions to specify equipment unambiguously by type and product standard (BS EN 60898, BS EN 61009, BS EN 62606, etc.).',
              'Carry out the Reg 311 to 314 general assessment and document the result in a one- or two-page Assessment Sheet for the design pack.',
              'Classify any installation location against Appendix 5 codes and use the classification to select cables, accessories and switchgear with matching environmental ratings.',
              'Connect the Part 3 assessment outputs to the Part 4 protection and Part 5 selection chapters that depend on them.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="The seven Parts of BS 7671 — and why three matter most up front"
            plainEnglish="The book is split into seven big chunks. Three of them — Parts 1, 2 and 3 — are the ones you read before you pick anything up. The rest tell you what to pick and how to test it."
            onSite="Most installers live in Parts 4, 5 and 6 and rarely open Parts 1 to 3. Designers do the opposite. The structural decisions that drive the install live up the front."
          >
            <p>
              BS 7671:2018+A4:2026 is structured as seven Parts plus a series of Appendices:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Part 1</strong> — Scope, object and fundamental principles (Chapters 11 to 14, Reg 110 to 134).</li>
              <li><strong>Part 2</strong> — Definitions.</li>
              <li><strong>Part 3</strong> — Assessment of general characteristics (Reg 311 to 314).</li>
              <li><strong>Part 4</strong> — Protection for safety (Chapters 41 to 46 — shock, thermal effects, overcurrent, voltage disturbances, isolation).</li>
              <li><strong>Part 5</strong> — Selection and erection of equipment (Chapters 51 to 56 — common rules, wiring systems, accessories, earthing, other equipment, safety services).</li>
              <li><strong>Part 6</strong> — Inspection, testing and certification.</li>
              <li><strong>Part 7</strong> — Special installations or locations (701 bathrooms, 702 pools, 703 saunas, 704 sites, 705 agriculture, 706 conducting locations, 708 caravan parks, 709 marinas, 710 medical, 711 exhibitions, 712 PV, 715 ELV lighting, 717 mobile units, 721 caravans, 722 EV, 729 corridors, 730 shore connections, 740 fairgrounds, 753 floor and ceiling heating).</li>
            </ul>
            <p>
              For the L3 designer, Parts 1 to 3 do the structural work. Without the assessment in Part 3 you have no inputs for Part 4 protection, no basis for Part 5 selection and nothing to verify in Part 6.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 110.1 (Scope)"
            clause="The Regulations apply to the design, erection and verification of electrical installations such as those of: residential premises; commercial premises; public premises; industrial premises; agricultural and horticultural premises; prefabricated buildings; caravans, caravan parks and similar sites; construction sites, exhibitions, fairs and other installations for temporary purposes; marinas; external lighting and similar installations; medical locations; mobile or transportable units; photovoltaic systems; and low-voltage generating sets."
            meaning={
              <>
                Reg 110 names what BS 7671 covers — essentially every fixed LV installation in a building, on a site, on a vehicle or in a temporary structure that connects to a public or private LV supply. The exclusions (110.2) are equally important: HV systems above 1000 V AC, supply industry distribution networks, railway / aircraft / marine traction, and lightning protection systems (which sit under BS EN 62305). When a project crosses one of those boundaries you have to pull in the matching standard.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 11, Regulation 110.1 and 110.2."
          />

          <SectionRule />

          <ContentEyebrow>Part 2 — definitions are not optional vocabulary</ContentEyebrow>

          <ConceptBlock
            title="Part 2 — the definitions register"
            plainEnglish="Every term in BS 7671 has a precise definition. When you write a spec, use the term exactly as Part 2 defines it."
          >
            <p>
              Part 2 is alphabetical and runs to dozens of pages. It defines every concept used elsewhere in the standard — competent person, exposed-conductive-part, extraneous-conductive-part, RCD, RCBO, AFDD, SPD, MET, simultaneous accessibility, basic protection, fault protection, additional protection, and many more.
            </p>
            <p>
              The discipline matters because the same English word can mean different things. The word "earth" in casual speech might mean MET, CPC, earth electrode, building structural steel or even just the ground. In a BS 7671 design specification each of those is a separate term with a separate definition and a separate regulatory consequence. Sloppy vocabulary in a design pack invites the installer to make assumptions you did not intend.
            </p>
            <p>
              When in doubt, write the term and the product standard together: B32 RCBO to BS EN 61009-1, 30 mA Type A leaves no room for substitution; 32 A trip with built-in RCD invites the cheapest device the wholesaler has on the shelf.
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

          <ContentEyebrow>Part 3 — the four assessments</ContentEyebrow>

          <ConceptBlock
            title="Reg 311 — Maximum demand and diversity"
            plainEnglish="Add up what is connected, then knock it down by realistic diversity. The result is your design current Ib for the supply and for each sub-main."
            onSite="Diversity is where designers and installers most often disagree. The installer wants headroom; the designer wants the number that matches reality. Document your diversity assumptions every time."
          >
            <p>
              Reg 311.1 requires the designer to determine the maximum demand of the installation, having due regard to diversity. The output is the design current at the origin and at every sub-main and final circuit.
            </p>
            <p>
              Diversity recognises that not every appliance runs at full nameplate load simultaneously. A three-bed dwelling with 30 kW of nameplate connected load (cooker, immersion, shower, ring finals, lighting, EV, heat pump) typically draws 60-80 A peak — not the 130 A the nameplate sum implies. The diversity factors come from the IET On-Site Guide Table A1, IET Guidance Note 1, and manufacturer-specific data for special loads.
            </p>
            <p>
              Section 2 of this module digs into diversity in detail. For now, the Part 3 message is: maximum demand is an assessment, not a calculation; you document your assumptions; and the result feeds every cable and device size downstream.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 312 — Division of installation"
            plainEnglish="How many DBs, how circuits are grouped, what gets a dedicated supply, how the installation can be partially shut down without losing critical functions."
          >
            <p>
              Reg 312 covers the structural decisions about how the installation is broken into circuits, sub-mains and DBs. The driver is fault containment and operational continuity:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fault on one circuit must not deprive the whole installation of supply (Reg 314.1).</li>
              <li>Critical functions (fire alarm, emergency lighting, security, IT life-support) need dedicated supplies that are not affected by routine maintenance shut-downs (Reg 312 plus Section 56 for safety services).</li>
              <li>Each part of the installation must be capable of being isolated for inspection and testing without shutting the whole installation down (Reg 314.2).</li>
              <li>The number and type of live conductors and the type of system earthing influence how circuits are grouped and how protection is set.</li>
            </ul>
            <p>
              On a domestic CU upgrade Reg 312 is mostly about RCD grouping (which circuits share a 30 mA RCD bank, where RCBOs make sense to avoid nuisance loss-of-supply). On a commercial fit-out it is about how many DBs, where they sit, what feeds the fire-alarm panel, how the lift power is segregated.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 312.1 (Arrangements of current-carrying conductors)"
            clause="BS 7671 takes into account the following arrangements of current-carrying conductors under normal operating conditions. Regulation 312.1 establishes that conductor arrangement variants are a normative consideration in the standard and must be used in design and assessment."
            meaning={
              <>
                Reg 312.1 is the explicit hook for single-phase or three-phase and L-N or L-L-L-N or L-L. The choice cascades into device selection (single pole MCB versus three-pole MCCB), cable arrangement, isolation requirements, and how Zs is calculated. On many commercial projects the design starts with a single-phase service and grows to three-phase as the load assessment grows; Reg 312 is the regulatory anchor for that escalation. Reg 312.1.1 covers AC arrangements (figures for single-phase 2/3-wire, two-phase 3-wire, three-phase 3/4-wire) and Reg 312.1.2 covers DC arrangements.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 312.1 — verbatim from published facets."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <ConceptBlock
            title="Reg 313 — Supply characteristics"
            plainEnglish="What the DNO is giving you. Voltage, current, frequency, PSCC, Ze, earthing arrangement, conductor configuration. You write to the DNO before you start the design."
            onSite="Get the supply data in writing. A DNO Form 1 or equivalent is the source-of-truth document. Verbal estimates from the meter operator are not enough to design from."
          >
            <p>
              Reg 313 lists the supply characteristics the designer must determine:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Nature of current</strong> — AC or DC (almost always AC at LV in the UK).</li>
              <li><strong>Nominal voltage</strong> — 230 V single-phase, 400/230 V three-phase plus neutral, harmonised tolerances of plus 10 percent and minus 6 percent.</li>
              <li><strong>Frequency</strong> — 50 Hz nominal, narrow tolerance.</li>
              <li><strong>Number and type of live conductors</strong> — L+N, L+L, L+L+L+N (3-phase 4-wire).</li>
              <li><strong>Type of system earthing</strong> — TN-S, TN-C-S (PNB or PME), TT, IT.</li>
              <li><strong>External earth fault loop impedance</strong> — Ze, declared by the DNO.</li>
              <li><strong>Prospective short-circuit current</strong> — PSCC, declared by the DNO at the origin.</li>
              <li><strong>Suitability for use</strong> — phases balanced, harmonics, unwanted DC content (relevant for EV chargers and inverter-fed loads).</li>
              <li><strong>Maximum demand permitted</strong> — service capacity, often the gating factor on whether the DNO will allow a heat pump or EV charger without an upgrade.</li>
            </ul>
            <p>
              Note the A4:2026 update: the TN-C-S arrangement now distinguishes between PME (Protective Multiple Earthing — DNO carries out multiple earthings of the combined N+PE conductor along the network) and PNB (Protective Neutral Bonding — single earthing point at the consumer side, often used on private substations). The two have slightly different design implications, particularly around O-PEN protection on EV chargers and around lost-neutral risk on rural overhead lines.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.2(c)(i)–(v), (d) and (e) (Supply characteristics documentation)"
            clause="The documentation shall include values and tolerances: nominal voltage and voltage tolerances; nominal frequency and frequency tolerances; maximum current allowable; prospective fault current; external earth fault loop impedance. The documentation shall include protective measures inherent in the supply, for example, earthed neutral or midpoint conductor, and particular requirements of the distributor."
            meaning={
              <>
                Reg 132.2(c)(i)–(v) is the modern home for the supply characteristics record. The Ze figure, prospective fault current and earthing arrangement cap every protective device decision; the maximum allowable current set by the DNO caps every load assessment; the inherent protective measures and any distributor-specific requirements feed device selection and installation method. The figures must come from the DNO in writing — verbal numbers are not auditable, and getting them wrong invalidates the whole design.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.2(c)(i)–(v), (d) and (e) — verbatim from published facets."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="Reg 314 — External influences"
            plainEnglish="The environment the installation lives in. Hot, cold, wet, dusty, exposed, public, industrial, fire-risk. Each combination drives equipment ratings."
          >
            <p>
              Reg 314 requires the designer to assess the external influences acting on the installation at every location. Appendix 5 gives the full classification matrix from IEC 60364-5-51:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>AA</strong> — ambient temperature (AA1 to AA8, from below minus 60 deg C to above plus 60 deg C).</li>
              <li><strong>AB</strong> — atmospheric humidity.</li>
              <li><strong>AD</strong> — presence of water (AD1 negligible to AD8 submersion).</li>
              <li><strong>AE</strong> — presence of foreign solid bodies, paired with IP digit.</li>
              <li><strong>AF</strong> — presence of corrosive or polluting substances.</li>
              <li><strong>AG</strong> — mechanical stresses (AG1 low to AG3 high, paired with IK rating).</li>
              <li><strong>BA</strong> — capability of persons (BA1 ordinary persons, BA4 instructed, BA5 skilled).</li>
              <li><strong>BD</strong> — conditions of evacuation in emergency (BD1 normal to BD4 difficult or high density).</li>
              <li><strong>BE</strong> — nature of processed or stored materials (BE1 no significant risk, BE2 fire risk, BE3 explosion risk).</li>
            </ul>
            <p>
              The classification feeds equipment selection in Part 5. A switchgear cabinet in an outdoor enclosure that experiences AA5 (minus 25 deg C to plus 40 deg C) and AD4 (splashing water) needs a minimum IP44 rating and a temperature derating on devices. A consumer unit in a domestic kitchen that experiences AA4 and AD2 (occasional moisture) is fine at IP2X with the standard temperature spec. Get this wrong and your installation either trips on cold mornings or fills with water.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 132 fully unpacked — the fourteen design considerations"
            plainEnglish="Part 1 names the designer. It also lists fourteen specific things the designer must consider. Every later sub of this module corresponds to one or more of them."
            onSite="A useful design-pack appendix is a single page mapping each Reg 132.x heading to the calculation, drawing or schedule that satisfies it. An auditor can then verify the whole design in five minutes."
          >
            <p>
              Reg 132.2 to 132.16 enumerates the design considerations the designer must take into
              account. The headings line up with the structure of every later Part of BS 7671:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>132.2</strong> — Characteristics of available supply (Reg 313 evidence).</li>
              <li><strong>132.3</strong> — Nature of demand (loads, diversity, demand profile — Reg 311).</li>
              <li><strong>132.4</strong> — Local conditions affecting installation (Reg 314 external influences).</li>
              <li><strong>132.5</strong> — Cross-sectional area of conductors (Reg 523, Appendix 4 CCC).</li>
              <li><strong>132.6</strong> — Type of wiring and methods of installation (Reg 521, Reference Methods).</li>
              <li><strong>132.7</strong> — Protective equipment (Chapter 41 ADS, Chapter 43 overcurrent, Chapter 44 voltage disturbance).</li>
              <li><strong>132.8</strong> — Emergency control (Chapter 46 isolation and switching, Reg 537).</li>
              <li><strong>132.9</strong> — Disconnecting devices (Chapter 46 again, with discrimination).</li>
              <li><strong>132.10</strong> — Prevention of mutual detrimental influence (segregation, EMC — Section 528, Section 444).</li>
              <li><strong>132.11</strong> — Accessibility (Regulation 132.13 ergonomics, Reg 513 access for inspection).</li>
              <li><strong>132.13</strong> — Identification and notices (Reg 514 labelling).</li>
              <li><strong>132.13</strong> — Documentation (drawings, calcs, schedules — covered in Sub 1.1).</li>
              <li><strong>132.14</strong> — Mutual detrimental influences (combined safety services — Section 56).</li>
              <li><strong>132.15</strong> — Power supplies for safety services (Section 56 again, BS 5266 emergency lighting, BS 5839 fire alarm).</li>
              <li><strong>132.16</strong> — Additions and alterations (Reg 132.16, EICR consideration before extension).</li>
            </ul>
            <p>
              The design pack appendix that maps each 132.x to the deliverable that satisfies it is
              the most powerful audit-defence document you can produce. It also forces you to check
              each consideration at design stage rather than discover the gap on the EIC.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="A4:2026 — what changed in Parts 1 to 3"
            plainEnglish="Amendment 4 did not redraw Parts 1 to 3, but it tightened the wording in several places that the L3 designer must know. AFDD is now recommending. TN-C-S splits into PME and PNB. Cmin moved into Appendix 3."
            onSite="When you cite a Part 3 reg in the design pack, always note the amendment level: 'BS 7671:2018+A4:2026 Reg 313.1' is unambiguous; bare 'Reg 313' is not."
          >
            <p>
              The headline A4:2026 changes that touch Parts 1 to 3 directly:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 132.13 wording on documentation</strong> — clarified to expect documentation
                sufficient for the installation to be operated, maintained, altered, extended,
                inspected and tested by another competent person. The list of "operate, maintain,
                alter, extend, inspect, test" is explicit rather than implicit.
              </li>
              <li>
                <strong>TN-C-S sub-types</strong> in Reg 312/313 — the standard now distinguishes between
                PME (Protective Multiple Earthing — DNO public network) and PNB (Protective Neutral
                Bonding — single earth at the consumer side, often on private substations). The
                two have different design implications, particularly around O-PEN protection on
                EV chargers and around the lost-neutral risk profile.
              </li>
              <li>
                <strong>AFDD wording in Reg 421.1.7</strong> — moved from "may be installed" toward
                "recommending" for residential final circuits. Not yet a hard requirement for
                general use; harder for HRRB, social housing and HMOs. The L3 designer should treat
                AFDDs as the default for new dwellings unless cost or coordination justifies leaving
                them out — and document the justification.
              </li>
              <li>
                <strong>Cmin 0.95 voltage factor</strong> — moved from Appendix 14 into the body of
                Appendix 3 worked examples. Same number, more authoritative location. Apply when
                calculating design-stage Zs and the implied minimum disconnection-time fault current.
              </li>
              <li>
                <strong>Schedule of Test Results columns</strong> — extended in Appendix 6 to cover
                AFDD presence, EV charger O-PEN protection, RCD type per circuit. The L3 designer
                must specify these per circuit so the inspector can populate the schedule honestly.
              </li>
            </ul>
            <p>
              When designing transitional projects (start under A3, sign off under A4), document the
              amendment in force at each gateway. The transition wording in BS 7671 lets installs in
              progress complete to the previous edition with documented justification, but new
              designs from the amendment effective date must follow A4.
            </p>
          </ConceptBlock>

          <Scenario
            title="Small commercial fit-out — Part 3 assessment in practice"
            situation={
              <>
                You have been engaged to design the electrical fit-out of a 220 m² ground-floor cafe in a refurbished Victorian building. The supply is to be upgraded from the existing 60 A single-phase to a new 100 A three-phase service. Loads include lighting, refrigeration, electric cooking equipment, three induction hobs, EPOS and IT, an EV-charge-ready outlet on the side wall and an external sign.
              </>
            }
            whatToDo={
              <>
                Run the Reg 311-314 assessment as a discrete document. Reg 311: connected load 78 kVA, applied diversity from IET GN1 yields 42 kVA peak demand, 60 A per phase — fits within the new 100 A per phase service. Reg 312: one main DB at the back of the kitchen, sub-main to a small DB at the front for shop and signs, dedicated supply to fire alarm and emergency lighting (Section 56). Reg 313: DNO Form 1 confirms TN-C-S (PME), Ze = 0.35 ohm, PSCC = 16 kA, 100 A BS 88-3 service fuse at origin. Reg 314: AA4 (minus 5 to plus 40 inside, hob area AA5 transient hot), AD3 spray near sink and dishwasher, AE2 small foreign bodies, AG2 medium mechanical stress in kitchen, BA1 customers, BA2 staff, BA5 cleaners and contractors, BD2 (low evacuation density), BE2 (commercial kitchen fire risk).
              </>
            }
            whyItMatters={
              <>
                The Part 3 assessment now drives every later decision. The PSCC of 16 kA forces 16 kA-rated devices throughout. The PME earthing forces O-PEN protection at the EV-ready outlet. The BE2 fire risk forces LSF cables on escape routes and fire-stopped penetrations. The AD3 spray rating pushes the sockets near the sink to IP44 and the cooker switch to a remote position. Without the structured Part 3 assessment, every one of those decisions is a guess.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Quoting the wrong Part of BS 7671 in the spec"
            whatHappens={
              <>
                A junior designer writes a cable specification and cites Reg 525 (voltage drop) but never references the supply characteristics in Reg 313. The installer queries the cable size; the designer cannot defend it because the input data was never documented. The whole calc has to be redone from scratch with proper Part 3 evidence.
              </>
            }
            doInstead={
              <>
                Every design decision should cite the Part 3 input it depends on AND the Part 4 or Part 5 reg it satisfies. A cable spec might read: 6 mm² T+E, Reference Method C, derated 0.94 for ambient 35 deg C (Reg 313 location AA4 + Reg 523), satisfying Reg 525.202 voltage drop at design current 32 A. That single line ties Part 3 to Part 5 and to the calc — the installer or inspector can audit it without asking you.
              </>
            }
          />

          <CommonMistake
            title="Treating definitions as interchangeable"
            whatHappens={
              <>
                The drawing says "earth conductor 6 mm²"; the installer fits a 6 mm² CPC and assumes the main protective bonding conductor is also 6 mm². Building Control inspects and finds the bonding undersized for a TN-C-S supply (where 10 mm² is typical). The installer asks for the calc; the designer realises the spec was ambiguous.
              </>
            }
            doInstead={
              <>
                Use Part 2 vocabulary precisely. Specify circuit protective conductor (CPC) 6 mm² and main protective bonding conductor 10 mm² as separate entries. Better still, list every earthing and bonding conductor in a small schedule with its CSA, function and BS 7671 cross-reference (Reg 543 for CPC, Reg 544 for main protective bonding, Reg 415.2 for supplementary bonding). Ambiguous vocabulary creates ambiguous installations.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Parts 1, 2 and 3 of BS 7671 frame every design. Part 1 sets scope and fundamental principles; Part 2 defines every term; Part 3 (Reg 311 to 314) is the structured assessment that produces the inputs to Part 4 protection and Part 5 selection.",
              "Reg 110 (Scope) tells you what BS 7671 covers — essentially every fixed LV installation in a building, on a site, on a vehicle or in a temporary structure — and what it excludes (HV above 1000 V, supply network distribution, traction, lightning protection).",
              "Part 2 vocabulary is not casual English. RCBO, AFDD, SPD, CPC, MET, basic protection, fault protection — each has a precise definition tied to a product standard. Use the term and the standard together in the spec.",
              "Reg 311 (Maximum demand) requires you to assess connected load with diversity before sizing. Reg 312 (Division of installation) drives the DB layout and dedicated-supply decisions. Reg 313 (Supply characteristics) collects the DNO data that caps every downstream decision. Reg 314 (External influences) classifies the location against Appendix 5.",
              "A4:2026 split TN-C-S into PME and PNB sub-types. The two have different design implications, particularly around O-PEN protection on EV chargers and around lost-neutral risk on rural overhead lines.",
              "Appendix 5 (external influences) is the single biggest hidden driver of equipment selection. AA temperature, AD water, AG mechanical, BA persons, BD evacuation, BE fire — every code maps to an IP / IK / temperature rating in Part 5.",
              "Document the Part 3 assessment as a discrete one- or two-page Assessment Sheet in the design pack. Without it, every later calc has no audit trail.",
              "Every design decision in your spec should cite the Part 3 input it depends on AND the Part 4 or Part 5 reg it satisfies. Single-line traceability is the difference between a defensible design and a guess.",
            ]}
          />

          <Quiz title="BS 7671 Parts 1, 2 and 3 — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.1 What an L3 designer actually does
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.3 Statutory context — Part P, Part L, BSA 2022
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
