/**
 * Module 6 · Section 1 · Subsection 1 — What an L3 designer actually does
 * Maps to C&G 2365-03 / Unit 305 / LO1 / AC 1.1, 1.2
 *   AC 1.1 — "Describe how to plan and implement work allocations, duties of operatives, and coordination with other services and personnel"
 *   AC 1.2 — "Identify relevant sources of information which will inform electrical work"
 *
 * Layered depth: 2366-03 Unit 304 / AC 1.1; 5393-03 Unit 104 / AC 1.1
 *
 * Frames the whole module. The shift in mindset, scope, liability and
 * documentation when an apprentice moves from "install per spec" to
 * "create the spec".
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

const TITLE = 'What an L3 designer actually does (1.1) | Level 3 Module 6.1.1 | Elec-Mate';
const DESCRIPTION =
  'The shift from L2 installer to L3 designer. New scope, new liability, new documentation. What changes when you start carrying the design pen.';

const checks = [
  {
    id: 'designer-vs-installer',
    question:
      'On a small commercial fit-out you have produced the cable schedule and single-line drawing. The contractor installs to your spec but uses 4 mm² where you specified 6 mm². Who carries the design liability for any subsequent voltage-drop complaint?',
    options: [
      'The contractor — they made the change.',
      'You — your name is on the drawing, regardless of what was installed.',
      'Both jointly, and you must verify the as-installed cable matches your design before signing the EIC. If the installer deviated, you either re-design to suit or insist the cable is changed.',
      'Whoever signs the EIC at the end.',
    ],
    correctIndex: 2,
    explanation:
      'Design and installation are separable responsibilities under BS 7671. The designer signs the design portion of the EIC; the installer signs the construction portion. If the installer deviates from the design, the design is no longer compliant — you must either accept the deviation in writing (re-issuing the calc), or insist the install is corrected before you sign anything. Silence is not neutrality; it is acceptance.',
  },
  {
    id: 'liability-floor',
    question:
      'Your client wants a 10 kW shower on a 6 mm² T&E run because "the previous one worked fine on that". You have run the calc and the new shower needs 10 mm². The right action is:',
    options: [
      'Install as the client wants — they are the customer.',
      'Refuse and walk away.',
      'Document the conflict in writing, explain the BS 7671 / thermal / Vd reason for 10 mm², offer the compliant design as your only option, and decline to certify the non-compliant install if the client overrides you.',
      'Install the 6 mm² but tell the client they did it on their own head.',
    ],
    correctIndex: 2,
    explanation:
      'The designer cannot be overridden into non-compliance. Reg 132.16 makes you responsible for the design; Reg 134.1.1 makes the installer responsible for executing it safely. If the client wants something that breaks BS 7671, you decline politely and document the conversation in writing. You do not certify what you know to be unsafe. Walking away is sometimes the right move; "I told them" is not a defence.',
  },
  {
    id: 'documentation-floor',
    question:
      'Reg 132.13 of BS 7671 A4:2026 says the designer must produce documentation that includes which of the following at design stage?',
    options: [
      'Just the cable schedule.',
      'Drawings, cable and circuit details, calculations of cable size, voltage drop and earth fault loop impedance, and any specifications for protective devices.',
      'Just the cable schedule and a single-line diagram.',
      'A site survey and the EIC at the end.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 132.13 (formerly 132.13 in pre-A4 editions) lists the design documentation requirement: drawings, diagrams, charts and tables showing the type, size, position and arrangement of conductors and equipment; calculations for cable size, voltage drop, earth fault loop impedance and disconnection times; and protective-device specifications. This is the paperwork an inspector or future designer needs to verify your work or extend the installation safely.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the structural difference between an L2 installer and an L3 designer?',
    options: [
      'L3 earns more.',
      'The L2 installs to a specification that someone else has produced; the L3 produces the specification, and carries the design responsibility under Reg 132 of BS 7671.',
      'L3 designers do not need to test installations.',
      'There is no real difference, just job title.',
    ],
    correctAnswer: 1,
    explanation:
      'The structural shift is responsibility. An L2 follows a design and is liable for workmanship. An L3 produces the design and is liable for the calculations, the regulatory compliance of the specification, and the documentation that backs it up. The two competences sometimes sit in the same person on a small job, but the legal split is real and matters when something fails.',
  },
  {
    id: 2,
    question: 'BS 7671 splits responsibility into three roles. Which?',
    options: [
      'Engineer, manager, apprentice.',
      'Designer (Reg 132), constructor (Reg 134.1.1), and inspector/tester (Part 6).',
      'Architect, electrician, inspector.',
      'Site supervisor, tester, signatory.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 names three responsibilities: design, construction (installation), and inspection and testing. On a small job the same person can be all three; on a larger job they will be different people. The EIC has a separate signature box for each.',
  },
  {
    id: 3,
    question: 'Which of the following is NOT typically the designer\'s job?',
    options: [
      'Selecting cable CSAs.',
      'Calculating earth fault loop impedance at the design stage.',
      'Signing the EIC construction declaration.',
      'Specifying protective device types and ratings.',
    ],
    correctAnswer: 2,
    explanation:
      'The construction declaration is signed by the installer who built the work — it certifies workmanship and that the installation matches the design. The designer signs the design declaration, which certifies that the design itself complies with BS 7671. The two are deliberately separated.',
  },
  {
    id: 4,
    question: 'Coordination with other services means:',
    options: [
      'Telling the plumber where to put the boiler.',
      'Working out routing, clearances, fire-stopping, sequencing and access with mechanical, structural and architectural disciplines so that nobody\'s install conflicts with anyone else\'s.',
      'Refusing to start until everyone else has finished.',
      'Holding daily site meetings.',
    ],
    correctAnswer: 1,
    explanation:
      'Coordination is one of the L3 designer\'s real-world headaches. You sit between the M&E coordinator, the structural engineer, the architect and the various sub-contractors. Your cable trays must not foul the ductwork; your fire-stopping must satisfy the fire engineer; your DBs must be accessible after the plasterers are done. This is design that does not show up in the calc.',
  },
  {
    id: 5,
    question: 'The L3 designer\'s first design action on any new project is to:',
    options: [
      'Pick a consumer unit.',
      'Establish the supply characteristics — TN-S vs TN-C-S vs TT, declared Ze, available PSCC, three-phase or single-phase, demand limits.',
      'Order materials.',
      'Sketch a single-line diagram.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 311 requires assessment of supply characteristics. Without TN type, Ze and PSCC you cannot set the protective device, you cannot pick the right earthing arrangement, and you cannot calculate Zs at design stage. Every design decision downstream of "what supply have we got" is unsafe until that question is answered.',
  },
  {
    id: 6,
    question:
      'Why is the design-stage Zs calculation always slightly different from the measured Zs at verification?',
    options: [
      'Because instruments are inaccurate.',
      'Because the design uses a worst-case Cmin factor (0.95 in BS 7671 A4:2026 Appendix 14, since moved to Appendix 3) to allow for declared rather than measured Ze, expected temperature rise of conductors, and manufacturing tolerance — the install is then verified at ambient with the actual cable.',
      'Because the supply changes between design and install.',
      'Because Zs is not really designed; it is only ever measured.',
    ],
    correctAnswer: 1,
    explanation:
      'Design-stage Zs is calculated using declared Ze and an R1+R2 figure for the chosen cable at its operating temperature (multiplier ~1.20 for 70 °C thermoplastic). The Cmin factor (0.95) is applied to the supply voltage to allow for under-voltage at the time of fault. The measured Zs at handover is at ambient temperature with the cable cold and a real Ze, so it should always be lower than your design figure. If your design Zs comes out OK, your measured Zs almost always does too.',
  },
  {
    id: 7,
    question: 'BS 7671 Reg 132.13 requires the designer to leave behind:',
    options: [
      'Just the EIC.',
      'Documentation: drawings, calculations, protective-device specs and any operating notes — sufficient that another competent person can extend, modify or maintain the installation safely.',
      'A handwritten note for the customer.',
      'Nothing — verbal handover is enough.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 132.13 is the long-term safety regulation. The next person who works on the install — possibly twenty years later — needs to know what was designed, why, and to what calculation. Without that documentation, every modification is a guess and every periodic inspection is incomplete. Designers who skimp on this gate fail the installation\'s future, not its present.',
  },
  {
    id: 8,
    question:
      'You have completed the design for a new domestic CU upgrade with EV charger, solar PV and battery. The customer asks you to email "just the bits I need". The professional answer is:',
    options: [
      'Send the cable schedule and ignore the rest.',
      'Send everything — drawings, calcs, schedules, device specs — and explain that BS 7671 Reg 132.13 requires complete documentation and you keep the master copy on file for at least the design life of the installation.',
      'Send nothing until paid in full.',
      'Send a one-page summary and bin the calcs.',
    ],
    correctAnswer: 1,
    explanation:
      'Documentation is part of the design product. Sending an incomplete pack creates a future liability problem for you (no record of decisions) and for the customer (no record for next contractor). Always issue the complete pack, keep the master, and make sure your engagement contract makes clear that the design documentation belongs to the project, not to whichever email the client happens to be reading.',
  },
];

const faqs = [
  {
    question: 'Do I have to be a registered electrical engineer to call myself a designer?',
    answer:
      'No — there is no legal "registered designer" status for general LV electrical work in the UK. What you must be is competent, in the BS 7671 sense: trained, experienced, and able to demonstrate that you understand the regulations and can apply them. For most small commercial and domestic design work, a Level 3 plus solid experience is enough. For higher-risk residential buildings under the Building Safety Act 2022, or for HV / public-supply / specialist sectors, you will be expected to hold higher qualifications — HNC/HND minimum, often a degree, and frequently membership of the IET. The competence question is asked by inspectors, by insurers, and by Building Control if anything goes wrong.',
  },
  {
    question: 'Can I design something I have never installed?',
    answer:
      'You can — BS 7671 does not require the designer to have personally installed the system type. But you should be honest with yourself: if you are designing your first EV charger install, your first heat pump, or your first three-phase fit-out, lean heavily on manufacturer datasheets, IET Guidance Notes, and a peer review by someone who has done it before. Designing in unfamiliar territory without those guard-rails is how mistakes get into walls. The scariest line in any near-miss report is "I assumed it would work the same as ...".',
  },
  {
    question: 'Is the design pen really worth the extra responsibility?',
    answer:
      'For most electricians who progress, yes — the design role is the gateway to higher-margin work, contracts that need a competent person on the design declaration, and a much wider scope of project types. It is also where the interesting problems live. The cost is documentation discipline, professional indemnity insurance (essential), and the headspace to stop installing while you finish thinking. People who cannot stop installing while they think do not make good designers.',
  },
  {
    question: 'What insurance do I need to design?',
    answer:
      'Professional indemnity (PI) insurance, separate from public liability. PI covers claims arising from your design advice and documentation — for example, a Vd calculation error that leads to nuisance failures and the customer claims for replacement equipment. Cover should be at least £1m for small works, £2m for commercial and £5m+ for any HRRB or major projects. Your insurer will want to see your competence evidence. NICEIC, NAPIT and ECA scheme membership often comes with a baseline of PI.',
  },
  {
    question: 'How does the L3 design role interact with Building Control?',
    answer:
      'For dwellings in England, work that is "notifiable" under Building Regulations Part P (consumer-unit replacement, new circuits, special-location installs) must either be self-certified by a registered competent-person scheme member (NICEIC, NAPIT, ELECSA, etc.) or formally notified to Building Control before commencement. The L3 designer\'s name often goes on the self-certification or the Building Notice. For commercial work, Building Control concerns itself more with Part B (fire safety), Part L (energy efficiency) and Part M (accessibility) — the electrical design touches all three.',
  },
  {
    question: 'What does the Building Safety Act 2022 change for me?',
    answer:
      'For higher-risk residential buildings (HRRBs — broadly, residential buildings 18 m or seven storeys and above), the Act introduces the Building Safety Regulator and a much stricter design / construction approval gateway. Designers on these buildings must demonstrate competence, hold up-to-date qualifications, and produce a "golden thread" of design documentation that survives the building\'s lifetime. AFDD recommendations (Reg 421.1.7) are likely to harden into requirements for HRRB final circuits well ahead of general use. If you intend to design on HRRBs, you will need higher qualifications and structured CPD; the Act treats that work as a different category from your normal commercial fit-out.',
  },
];

export default function Sub1() {
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
            eyebrow="Module 6 · Section 1 · Subsection 1"
            title="What an L3 designer actually does"
            description="The structural shift from L2 installer to L3 designer — new scope, new liability, new documentation. The design pen, the duties under BS 7671 Reg 132, and the everyday reality of what changes when you start being the person who decides what gets built."
            tone="amber"
          />

          <TLDR
            points={[
              'L2 installs to a specification someone else has written. L3 writes the specification — and carries the design responsibility under BS 7671 Reg 132. The two roles sometimes sit in the same person on a small job, but the legal split is real.',
              'The L3 designer signs the design declaration on the EIC; the installer signs the construction declaration; the inspector signs the inspection and test declaration. Three signatures, three responsibilities, three different competence floors.',
              'Reg 132.13 makes documentation part of the design product — drawings, calculations, protective-device specs and operating notes that any future competent person can pick up and extend safely. Design without documentation is not finished.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Articulate the structural difference between L2 installer and L3 designer competence — scope, liability and documentation.',
              'Identify the three responsibilities BS 7671 splits any installation into (design, construction, inspection and testing) and explain why they are deliberately separable.',
              'Recognise the regulatory floor that makes the L3 designer the appropriate signatory for the EIC design declaration on the work types in scope of 2365-03.',
              'List the documentation Reg 132.13 requires the designer to produce and hand over, and why each item exists.',
              'Explain the role of professional indemnity insurance in supporting the design role and why competence evidence is needed before insurers will quote.',
              'Describe the L3 designer\'s coordination duties with other trades and disciplines, and the consequences of skipping that coordination on a multi-discipline project.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="The structural shift — install vs design"
            plainEnglish="As an L2 you take a drawing and make it real on a wall. As an L3 you make the drawing — and the calculations behind it — and you put your name on the design declaration. Same trade, different responsibility."
            onSite="Most electricians do both jobs every day on small work. The split only becomes visible when something goes wrong — and then everyone wants to know exactly which signature corresponds to which decision."
          >
            <p>
              Level 2 trains you to install electrical work to a specification — wire, terminate, test,
              certify the workmanship. The specification (which cable, what device, where the DB sits,
              what the disconnection time should be) is taken as a given. Your job is to execute it
              correctly.
            </p>
            <p>
              Level 3 trains you to produce that specification. You assess the supply, calculate the
              demand, pick the cables and devices, draw the schematic, write the schedule, prove the
              EFLI, and sign the design declaration on the EIC that says "this design complies with
              BS 7671". The cable on the wall is then someone else's job — possibly yours, often
              not. But the design is yours.
            </p>
            <p>
              The two competences are deliberately separable. On a small domestic CU upgrade the
              same electrician designs, installs and certifies — three signatures, one person. On
              a hospital wing fit-out the designer is in an office, the installer is on site, the
              inspector is a third specialist, and the three never speak directly. BS 7671 carries
              both extremes within the same regulatory framework because the responsibilities are
              fundamentally separable.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132 (Design)"
            clause="The electrical equipment and installations shall be so designed as to ensure: (i) the protection of persons, livestock and property in accordance with Part 4; (ii) the proper functioning of the installation for its intended use. The information indicated in Regulations 132.2 to 132.16 shall be taken into account when designing an electrical installation."
            meaning={
              <>
                Regulation 132 is the umbrella under which the whole design module sits. It names
                the designer as a distinct role, sets out fourteen specific design considerations
                (supply characteristics, nature of demand, conductors, wiring systems, protective
                measures, isolation and switching, accessibility, documentation and so on), and
                makes the designer the responsible party. Every later Sub in this module corresponds
                to one or more of those fourteen considerations.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Section 132 (Regulations 132.1–132.16)."
          />

          <SectionRule />

          <ContentEyebrow>The three signatures on the EIC</ContentEyebrow>

          <ConceptBlock
            title="Design, construction, inspection and testing — three signatures"
            plainEnglish="The Electrical Installation Certificate has three signature boxes. Each one corresponds to a separate responsibility. The same person can fill all three on a small job, but each box certifies a different thing."
          >
            <p>
              Open any standard EIC — IET model form or scheme-approved equivalent — and you will see
              three declaration boxes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Design declaration</strong> — "I being the person responsible for the design
                of the installation, particulars of which are described above, having exercised
                reasonable skill and care when carrying out the design hereby CERTIFY that the design
                work for which I have been responsible is to the best of my knowledge and belief in
                accordance with BS 7671..."
              </li>
              <li>
                <strong>Construction declaration</strong> — "I being the person responsible for the
                construction of the installation... CERTIFY that the construction work for which I
                have been responsible is to the best of my knowledge and belief in accordance with
                BS 7671..."
              </li>
              <li>
                <strong>Inspection and testing declaration</strong> — "I being the person responsible
                for the inspection and testing of the installation... CERTIFY that the inspection
                and testing for which I have been responsible..."
              </li>
            </ul>
            <p>
              Each declaration is signed, dated, and accompanied by the competent person\'s name,
              position and qualifications. On a small CU swap the three signatures are all yours.
              On a multi-discipline commercial fit-out the three are different people, possibly
              from different organisations. The EIC asks you to be honest about which work you
              personally take responsibility for.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <ConceptBlock
            title="What the L3 designer is responsible for"
            plainEnglish="Pretty much every decision that has a number behind it. Cables, devices, EFLI, voltage drop, diversity, segregation, protection coordination. If it required a calculation, the designer is on the hook for it."
          >
            <p>
              At the L3 design level, your specific responsibilities include:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Assessing supply characteristics (Reg 311) — TN-S, TN-C-S, TT; declared Ze; PSCC;
                supply voltage; phase configuration; maximum demand permitted by the DNO.
              </li>
              <li>
                Calculating the maximum demand of the installation after the application of
                diversity (Reg 311.1, AC 8.3 and AC 8.1).
              </li>
              <li>
                Selecting protective devices (Reg 433.1.1, AC 8.5) — type (B, C, D, BS 88, RCBO),
                rating (In ≥ Ib), breaking capacity (≥ PSCC at the device), discrimination with
                upstream devices.
              </li>
              <li>
                Selecting cables (Reg 523, AC 8.6 and AC 8.8) — Reference Method, derate stack
                (Ca, Cg, Ci), required tabulated It, voltage drop verification (Reg 525.202).
              </li>
              <li>
                Verifying earth fault loop impedance Zs at design stage (Reg 411.4, AC 8.10) — using
                declared Ze plus calculated R1+R2 with Cmin and temperature multipliers.
              </li>
              <li>
                Specifying earthing and bonding (Reg 411 and 543, AC 5.7) — correct CSA of MET
                conductor, main protective bonding conductors, supplementary bonding where required.
              </li>
              <li>
                Producing the design documentation required by Reg 132.13 — drawings, schedules,
                calculations and operating notes.
              </li>
              <li>
                Coordinating with other services and personnel (AC 1.1) — clearances, fire-stopping,
                access for inspection and maintenance.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="What the L3 designer is NOT responsible for"
            plainEnglish={`The actual workmanship. The brand of cable on the van. The day-to-day choice of clip spacing if the design says "to BS 7671". And the inspection and testing — unless you also wear that hat.`}
          >
            <p>
              The boundary is important to maintain. The designer specifies; the installer chooses
              equivalent products and applies workmanship; the inspector verifies. If you specify
              "70 °C thermoplastic T&E to BS 6004, 6 mm² with 2.5 mm² CPC" and the installer fits
              compliant cable from a different manufacturer, that is not a deviation — that is the
              normal operation of the design. If they fit 4 mm² instead, that is a deviation, and
              the design no longer applies.
            </p>
            <p>
              If you also wear the installer or inspector hat on the same job, you do not somehow
              merge the roles into one. You sign three boxes for three responsibilities, and you
              are honest about which you can stand behind. Do not sign a box for work you did not
              personally see done correctly.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Documentation as a design product</ContentEyebrow>

          <ConceptBlock
            title="Reg 132.13 — the documentation gate"
            plainEnglish="The design is not finished when the calc is done. It is finished when the documentation is in a form that another competent person, twenty years from now, can pick up and extend safely."
            onSite="Documentation discipline is what separates a designer from someone who happens to do designs. The competent person you most need to leave good documentation for is your future self in five years."
          >
            <p>
              BS 7671 Reg 132.13 spells out what the designer must leave behind. The list is
              specific:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Drawings, diagrams, charts and tables</strong> — single-line schematic of the
                distribution arrangement, layout drawings showing cable routes and accessory
                positions, schedules of accessories and circuits.
              </li>
              <li>
                <strong>Calculations</strong> — cable sizing (CCC and Vd), prospective fault current,
                earth fault loop impedance, disconnection times, thermal constraints (adiabatic
                check on protective conductors).
              </li>
              <li>
                <strong>Protective device specifications</strong> — type, rating, breaking capacity,
                trip characteristic, discrimination scheme.
              </li>
              <li>
                <strong>Operating and maintenance information</strong> — how to isolate each circuit,
                what RCDs are present, what regular tests are needed.
              </li>
            </ul>
            <p>
              The deliverable is sometimes called the "Operations and Maintenance manual" or the
              "design pack" — the same idea by different names. On a small job it might be three
              A4 sheets; on a large fit-out it might be a fifty-page document with appendices. The
              completeness floor is the same.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.1 (Design documentation framework, Regs 132.2–132.5)"
            clause="The information required as a basis for design is stated in Regulations 132.2 to 132.5. The requirements to which the design shall conform are stated in Regulations 132.6 to 132.16. Designers shall therefore determine and record the information listed in 132.2–132.5 to demonstrate conformity with subsequent design requirements."
            meaning={
              <>
                The Reg 132.1 framework is the long-term safety regulation. The next person who
                works on the installation needs to know what was designed, why, and to what
                calculation — and the framework requires the designer to determine and record
                the supply and installation information at Regs 132.2–132.5. Without that
                documentation every modification is a guess and every periodic inspection is
                incomplete. The minimum documentation floor is the EIC plus the schedule of test
                results plus the schedule of inspections; the design pack adds the calculations,
                device specs, and operating notes that make the EIC properly traceable.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.1 framework — verbatim from published facets."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Coordination with other services</ContentEyebrow>

          <ConceptBlock
            title="Coordination with other services and personnel — AC 1.1"
            plainEnglish={`On any job bigger than "add a circuit" you will share routes, voids, fixings and access with mechanical, structural and architectural disciplines. Coordination is the design work that does not show up in the calc.`}
          >
            <p>
              On a multi-discipline project the L3 designer sits in a coordination conversation that
              runs alongside the technical calc. Typical coordination items:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Routing clearances</strong> — cable trays must not foul ductwork; chases must
                respect structural beam limits; risers must be shared with plumbing without
                segregation conflicts.
              </li>
              <li>
                <strong>Fire-stopping</strong> — every penetration through a fire compartment must be
                fire-stopped to the wall\'s rating. Reg 527.2 requires this and the documentation
                must record where penetrations are and what fire-stop product is used.
              </li>
              <li>
                <strong>Access</strong> — DBs, isolators and inspection chambers must remain
                accessible after the architect\'s finishes are in. A DB behind a fixed wardrobe is a
                Regulation 132.13 (accessibility) failure.
              </li>
              <li>
                <strong>Sequencing</strong> — first-fix cables must go in before plasterboard;
                second-fix accessories after decoration; commissioning after mechanical commissioning
                (heat pumps, ventilation interlocks).
              </li>
              <li>
                <strong>Personnel competence</strong> — work allocations to operatives must match
                their skill-card and qualifications. CSCS gold for skilled trades, gas-safe for boiler
                interface, asbestos awareness for older buildings.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Domestic CU upgrade with EV charger, solar PV, battery and heat pump"
            situation={
              <>
                A homeowner wants the works: a 100 A TN-C-S supply, existing 60 A board with no
                spare ways, a planned 7 kW EV charger on the driveway, a 4 kWp solar PV array on
                the south roof, a 5 kWh AC-coupled battery in the loft, and an 8 kW air-source
                heat pump replacing the gas boiler in eighteen months. They want it all wired in
                "now or in stages — whichever is cheaper".
              </>
            }
            whatToDo={
              <>
                Design the end state, install in stages. Specify a 14-way RCBO board (10 used now,
                4 spare for future loads). Confirm DNO maximum demand allowance is sufficient — if
                not, apply for a load-management connection or a supply upgrade now while the
                drive is open. Specify an EV charger with O-PEN protection and a Type B (or
                Type A + DC monitor) RCD, future-proof the PV inverter location and string-cable
                route to the loft, allow battery cabling capacity, and reserve a way for the heat
                pump\'s 16 A or 20 A radial. Document everything, including the staging plan, in the
                design pack so the next contractor knows what was anticipated.
              </>
            }
            whyItMatters={
              <>
                Designing the end-state up front turns three separate disruptive jobs into one
                installation plus three small commissioning visits. It saves the customer money
                across the project, prevents the second-fit electrician from having to rip out the
                first-fit\'s consumer unit, and produces documentation that scales as the load
                grows. This is exactly the kind of design thinking the L3 role is built for —
                and exactly what an L2 install-only mindset does not produce.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Things that catch people out</ContentEyebrow>

          <CommonMistake
            title="Signing the design declaration on a pre-existing design you did not produce"
            whatHappens={
              <>
                You arrive on site to install someone else\'s design — drawings handed over, cable
                schedule done. You install it competently, sign the construction declaration, and
                the customer asks you to \"sign the lot\" because the original designer is unreachable.
                You sign the design box too. Six months later a Vd complaint becomes a claim. You are
                now defending a design you never produced and never verified.
              </>
            }
            doInstead={
              <>
                Never sign the design declaration on someone else\'s design unless you have re-checked
                the calculations and accepted the design as your own. If the original designer is
                unreachable, you have two honest options: re-do the design from scratch and sign
                your version, or refuse to sign the design box and explain the gap to the customer.
                A blank design signature is preferable to a fraudulent one.
              </>
            }
          />

          <ConceptBlock
            title="The design risk register — CDM 2015 in everyday practice"
            plainEnglish="A short live document that lists every foreseeable hazard your design creates, what you have done about it, and what residual risk the next person needs to know about. It is the proof the CDM duty was discharged."
            onSite="Most small jobs do not have a Principal Designer, but the CDM duty on you as designer applies regardless. A two-page risk register on every job is the proportionate answer."
          >
            <p>
              CDM 2015 (Construction (Design and Management) Regulations) makes the designer a
              named dutyholder. Reg 9 of CDM requires designers to eliminate, reduce or control
              foreseeable risks that arise during construction, maintenance, cleaning, alteration,
              demolition or use of the structure. The output is a design risk register — a live
              document that travels with the design pack:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hazard</strong> — e.g. high-level luminaire change in a stairwell void,
                live-working at the meter cupboard during phased changeovers, asbestos disturbance
                from chasing into 1970s plasterwork.
              </li>
              <li>
                <strong>Eliminated by design?</strong> — first question. Drop the luminaire to a
                reachable height, stage the work as a single dead changeover, route surface rather
                than chase. If yes, record and move on.
              </li>
              <li>
                <strong>Reduced by design?</strong> — if not eliminated, what design choice cuts the
                exposure (mechanical hoist provision, two-way isolation at the consumer end, P3
                respirator schedule).
              </li>
              <li>
                <strong>Residual risk</strong> — what the constructor and the future maintainer
                still need to manage. Documented in the design pack and in the Health and Safety
                File at handover.
              </li>
            </ul>
            <p>
              On a HRRB the risk register is part of the golden thread. On a typical commercial
              fit-out it sits in the pre-construction information. On a small domestic CU upgrade
              it can be a half-page note — the form scales, but the duty does not.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Professional indemnity insurance — the unspoken design infrastructure"
            plainEnglish="The thing nobody mentions on the qualification page. PI cover is what makes the design role survivable when something does go wrong."
            onSite="Insurers will ask for proof of competence (qualifications, CPD records, relevant scheme membership) before they quote. Get the insurance in place before you start designing as a paid service."
          >
            <p>
              Professional indemnity (PI) insurance covers claims arising from your design advice and
              documentation — distinct from public liability, which covers physical injury or
              property damage during the work. Examples of PI claims:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                A Vd calculation error means LED drivers cut out at the far end of a long radial.
                The customer claims for replacement equipment plus loss of trading.
              </li>
              <li>
                A discrimination scheme failure means a downstream B16 trips along with a 100 A
                BS 88 main on a fault. The customer claims for the cost of restoring the main supply
                including out-of-hours call-out.
              </li>
              <li>
                An EFLI calculation that did not allow for cable temperature rise gives a measured
                Zs that exceeds Table 41.3 maxima — the periodic inspection codes the install C2,
                and the customer claims for the rework.
              </li>
            </ul>
            <p>
              Cover floors: £1m PI for small-works (single dwellings, small commercial fit-outs);
              £2m for typical commercial work; £5m+ for any HRRB, hospital, school or industrial
              project. Keep your policy aligned with the work type — under-insurance can void cover
              entirely.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.1 (design objectives)"
            clause={
              <>
                The electrical installation shall be designed by one or more skilled persons to
                provide for: (a) the protection of persons, livestock and property in
                accordance with Section 131; and (b) the proper functioning of the electrical
                installation for the intended use.
              </>
            }
            meaning={
              <>
                Design has two converging objectives — safety first, function second. The
                competent designer is named as &quot;skilled persons&quot; in the regulation
                wording. As an L3 apprentice you support the designer; the design judgement
                calls remain with the named competent person on the certificate.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.1 — verbatim from published facets."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'The L3 designer carries the design responsibility under BS 7671 Reg 132 — a structurally separate role from the L2 installer, even when the same person performs both on a small job.',
              'BS 7671 splits installation responsibility into three: design (Reg 132), construction (Reg 134.1.1), and inspection and testing (Part 6). The EIC has three signature boxes for three signatures.',
              'The L3 designer signs the design declaration; the installer signs the construction declaration; the inspector signs the inspection and testing declaration. Be honest about which boxes you fill.',
              'Reg 132.13 makes documentation part of the design product — drawings, calculations, protective-device specs and operating notes that any future competent person can pick up and extend safely.',
              'Coordination with other services and personnel (AC 1.1) is design work that does not show up in the calc — routing, fire-stopping, access, sequencing and matching tasks to operative competence.',
              'Professional indemnity insurance is essential infrastructure for paid design work. £1m floor for small jobs, scaling to £5m+ for HRRB and major projects. Insurers want competence evidence before quoting.',
              'Higher-risk residential buildings under the Building Safety Act 2022 have a stricter design competence floor and require a "golden thread" of design documentation to survive the building\'s lifetime.',
              'Never sign a design declaration on a design you did not produce or have not personally re-checked and accepted as your own. A blank design signature is always preferable to a fraudulent one.',
            ]}
          />

          <Quiz title="L3 designer role — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module6-section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section landing
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 1 — Design framework
              </div>
            </button>
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level3-module6-section1-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.2 BS 7671 Parts 1, 2 and 3
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
