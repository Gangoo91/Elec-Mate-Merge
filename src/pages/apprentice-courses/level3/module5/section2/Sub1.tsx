/**
 * Module 5 · Section 2 · Subsection 1 — Visual inspection: scope, sequence and the Schedule of Inspections
 * Maps to C&G 2365-03 / Unit 304 / LO3 / AC 3.1, 3.2
 *   AC 3.1 — "state the items to be checked during the visual inspection of an electrical installation"
 *   AC 3.2 — "describe the procedure for the visual inspection of an electrical installation"
 *
 * Layered depth: 2357 Unit 607 ELTK06 / AC 3.1; 2366-03 Unit 302 / AC 3.1
 *
 * Visual inspection is the first stage of initial verification per Reg 642.
 * It is a structured, methodical walk of the installation — not a glance —
 * and the outputs feed straight onto the Schedule of Inspections (Appendix 6).
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

const TITLE = 'Visual inspection — scope, sequence and the Schedule of Inspections | Level 3 Module 5.2.1 | Elec-Mate';
const DESCRIPTION =
  "Reg 642.3 visual inspection items, the Schedule of Inspections (Appendix 6), and the methodical sequence that turns a walk-around into documented verification.";

const checks = [
  {
    id: 'm5-s2-sub1-when-visual',
    question: 'When does visual inspection take place in the initial verification sequence?',
    options: [
      'After all live tests are complete.',
      'Before any testing — Reg 642 places visual inspection ahead of Reg 643 testing in Part 6 sequence.',
      'Only if the customer asks for it.',
      "It doesn't matter when, as long as it happens at some point.",
    ],
    correctIndex: 1,
    explanation:
      'Reg 642 (visual inspection) sits before Reg 643 (testing). The order is deliberate — many test failures and safety risks are caught visually before instruments come out. A loose CPC, an unlabelled circuit, or a missing seal on Zone 1 enclosure will show up to the eye long before any meter detects a downstream consequence.',
  },
  {
    id: 'm5-s2-sub1-non-exhaustive',
    question: 'The Reg 642.3 visual inspection list is described as:',
    options: [
      'Exhaustive — only check items on the list.',
      'Non-exhaustive — items listed are the minimum; add location-specific items from Part 7 (special locations) and any other safety-relevant items the inspector identifies.',
      'Optional — only check items the customer specifies.',
      'For new installs only — never used on additions or alterations.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 642.3 lists items that "shall include, where relevant" — the language is non-exhaustive. The list is your floor, not your ceiling. A bathroom installation needs Section 701 zoning checks added. A swimming pool needs Section 702. Documenting only the listed items and missing location-specific issues is a coding error on the EICR and a verification failure on initial.',
  },
  {
    id: 'm5-s2-sub1-schedule-format',
    question: 'On the Schedule of Inspections, the standard recording symbols are:',
    options: [
      'Tick = pass, cross = fail, blank = not done.',
      'Tick (acceptable), cross (not acceptable), N/A (not applicable), LIM (limitation), with comments mandatory wherever a cross or LIM is recorded.',
      'Just yes / no for each item.',
      'Stars from 1 to 5.',
    ],
    correctIndex: 1,
    explanation:
      'The Appendix 6 Schedule of Inspections uses tick / cross / N/A / LIM. A cross or LIM without a comment is incomplete and unauditable. N/A means the item cannot apply (e.g. SPD section on an installation with no SPD). A blank entry means the item was not assessed — which is itself a problem on a verification document.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'During visual inspection of a new domestic CU change you find the main earthing conductor sized at 10 mm² but the supply tails are 25 mm² PME. Per Table 54.7, this is:',
    options: [
      'Compliant — 10 mm² is always enough.',
      'Non-compliant — for 25 mm² PME tails the minimum main earthing conductor is 16 mm² (Table 54.7), so this is a visible verification failure to record on the schedule and remedy before energising.',
      'A live test issue, not visual.',
      'Acceptable as long as RCD protection is in place.',
    ],
    correctAnswer: 1,
    explanation:
      'Table 54.7 sets minimum CSA for main earthing conductors based on the supply tail size and earthing arrangement. For 25 mm² PME tails the main earthing conductor must be at least 16 mm² (10 mm² Cu equivalent for distributed PEN considerations). Visual inspection catches this — the tape measure or callipers tell you immediately. Record on schedule, get it remedied before any live work.',
  },
  {
    id: 2,
    question: 'Reg 514.13.1 covers labelling of bonding connections. The verbatim requirement is:',
    options: [
      'No specific labelling required.',
      'A durable label complying with BS 951 stating "Safety Electrical Connection — Do Not Remove" shall be permanently fixed in a visible position at or near the point of connection of every earthing conductor to an earth electrode, every bonding conductor to extraneous-conductive-parts, and at the main earthing terminal where separated from the main switchgear.',
      'A handwritten note on masking tape.',
      'Coloured tape only.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 514.13.1 (verbatim) — durable BS 951 label "Safety Electrical Connection — Do Not Remove" at every earth electrode connection, every main bonding connection to extraneous-conductive-parts, and at the MET where it sits separately from the main switchgear. Visual inspection checks that every required label is present, durable, legible, and correctly positioned.',
  },
  {
    id: 3,
    question: 'A consumer unit is installed in a domestic property less than 0.5 m above floor level in a hallway. The visual inspection should record:',
    options: [
      'No issue — height is the customer\'s preference.',
      'Acceptable but note as a C3 on EICR.',
      'A potential issue — Regulation 132.13 (mounting / accessibility) and the IET CoP for accessibility recommend mounting heights that allow safe operation; check against design and Part 7 if a special location applies. Document and refer to designer.',
      'Acceptable for new installations, not for periodic.',
    ],
    correctAnswer: 2,
    explanation:
      'Mounting height of switchgear is governed by accessibility requirements and any special location requirements (e.g. Section 701 for bathrooms — outside Zone 2 unless suitably IP rated; Section 711 for exhibition stands). 0.5 m above floor in a hallway raises operability concerns (BS 7671 Reg 513.1 — operating means accessible). The inspector documents the observation, refers to designer, and may code it on the EICR if existing.',
  },
  {
    id: 4,
    question: "The Schedule of Inspections section header 'Methods of protection against electric shock' would include items such as:",
    options: [
      'Cable colour only.',
      'SELV / PELV barriers, basic protection (insulation, barriers, enclosures, obstacles, placing out of reach), fault protection (ADS via overcurrent device or RCD, double or reinforced insulation, electrical separation, earth-free local equipotential bonding), additional protection (RCD ≤ 30 mA, supplementary equipotential bonding).',
      'Only RCD presence.',
      "Just whether the consumer unit is metal-clad.",
    ],
    correctAnswer: 1,
    explanation:
      'The Schedule of Inspections groups items under headings that mirror BS 7671 Chapter 41. Methods of protection against electric shock covers basic protection, fault protection (ADS being the dominant method), and additional protection. Each must be assessed visually — barrier integrity, conduit continuity, RCD presence and type, supplementary bonding to extraneous-conductive-parts in special locations.',
  },
  {
    id: 5,
    question: 'You arrive on site for an EICR. The original drawings are missing and the previous EIC is not available. Your visual inspection must:',
    options: [
      'Refuse to proceed — no documentation, no inspection.',
      'Carry out a more extensive visual survey to establish the installation arrangement (reverse engineering from observation), document the limitation on the report front sheet under Section D, agree the scope of inspection with the duty holder, and note "no documentation available" as a limitation against affected items on the schedule.',
      'Just guess what was originally installed.',
      'Skip visual and go straight to testing.',
    ],
    correctAnswer: 1,
    explanation:
      "Missing documentation is a Reg 651 / GN3 limitation, not a stop-work. The inspector documents the scope and limitation on the EICR front sheet (Section D 'Extent and limitations'), agrees with the duty holder, and proceeds with a more thorough visual survey to reconstruct the arrangement. Note 'no documentation' against any item where documentation was needed for full verification (e.g. cable routes hidden in fabric).",
  },
  {
    id: 6,
    question: 'A4:2026 changes affecting visual inspection include:',
    options: [
      'No changes affecting visual inspection.',
      'Updated Schedule of Inspections columns to reflect new requirements, AFDD presence to be checked where Reg 421.1.7 recommends them (HRRBs require under Building Safety Act 2022), and SPD presence/type checked per Section 443.',
      'Only colour changes to the form.',
      'Visual inspection no longer required.',
    ],
    correctAnswer: 1,
    explanation:
      "A4:2026 added rows / columns to the Schedule of Inspections for AFDDs (Reg 421.1.7 recommendation; HRRB requirement via Building Safety Act 2022) and reaffirmed SPD checks per Section 443. The visual inspector now confirms AFDD presence/type/setting and SPD presence/type alongside the historic items. Schemes have updated their branded forms accordingly.",
  },
  {
    id: 7,
    question: 'Identification of conductors per Reg 514.3 includes which colour for L1 of a three-phase TN-S supply?',
    options: [
      'Red.',
      'Brown.',
      'Black.',
      'Grey.',
    ],
    correctAnswer: 1,
    explanation:
      'Post-harmonisation (BS 7671 from 2004 onwards), three-phase L1 = brown, L2 = black, L3 = grey. Single-phase line = brown. Neutral = blue. Protective conductor = green/yellow. Visual inspection on existing installations may find legacy red/yellow/blue with a "WARNING — Mixed Colours" notice — that is acceptable provided the notice is in place and the install is otherwise compliant.',
  },
  {
    id: 8,
    question: 'During visual inspection of a TT installation, the earth electrode is buried with no inspection pit and no test link at the MET. The correct response is:',
    options: [
      'Ignore — TT installs do not need test links.',
      'Record as a non-compliance — Reg 542.4 requires the means to disconnect the earthing conductor for testing (test link), and accessibility for inspection of the earth electrode is required for periodic verification of Ra. Recommend installation of a test link and an inspection pit/marker.',
      'Test the electrode by disconnecting the main earth conductor live.',
      "Add an RCD and call it done.",
    ],
    correctAnswer: 1,
    explanation:
      'Reg 542.4.2 requires that the earthing conductor connection at the means of earthing shall be electrically and mechanically sound, accessible for inspection and testing (except for buried electrodes), and labelled per Reg 514.13. The test link is the practical means of disconnection for periodic Ra testing. No test link = cannot retest the electrode without breaking the bonding to the entire installation. Document and recommend remediation.',
  },
];

const faqs = [
  {
    question: 'Is visual inspection just walking round and looking?',
    answer:
      "No — visual inspection is a structured assessment against the Reg 642.3 list (extended for special locations and any other safety-relevant items). The Schedule of Inspections is the audit trail. Each item gets a tick / cross / N/A / LIM with comments where needed. A walk-round with no schedule and no method is not visual inspection — it's sightseeing.",
  },
  {
    question: 'How long should visual inspection take?',
    answer:
      'Depends on installation scale. A domestic CU change might be 30-60 minutes of visual before any testing starts. A small commercial unit could be a half-day. The bigger and more complex the install, the longer visual takes — and the more it pays back in catching issues before instruments are connected. Time pressure is the most common reason visual is rushed and defects are missed.',
  },
  {
    question: 'What if I find something during testing that should have been picked up visually?',
    answer:
      "Stop, document the finding, and update the visual inspection record. The schedule should reflect everything you actually verified, not just what you noticed first time. If a missed item indicates a wider gap in your visual method, debrief and adjust — visual is the cheapest stage to catch defects, so missing them there has knock-on cost.",
  },
  {
    question: 'Can the visual inspection and testing be done by different people?',
    answer:
      'Yes — and on larger jobs that is often how teams work. The EIC has separate signature blocks for design, construction, and inspection & testing. The inspector signing the inspection block takes responsibility for the visual AND the testing record. They can delegate the tasks but they own the sign-off. Make sure delegated work is supervised and verified.',
  },
  {
    question: 'How does the visual inspection differ between initial verification and EICR?',
    answer:
      'Initial verification visual is against the Reg 642.3 list — check the new install matches design and complies with BS 7671. EICR visual is broader — looking for deterioration, damage, defects against current BS 7671, and any safety risks regardless of whether they comply with the standard at install. EICR codes (C1/C2/C3/FI) attach to defects found. Initial verification just records pass/fail/limitation against the current install.',
  },
  {
    question: 'What documentation should I have to hand for visual inspection?',
    answer:
      "Per Reg 642.1 / 651.2: design drawings, circuit charts, schematic for distribution, the previous EIC if existing, manufacturer instructions for installed equipment, scheme rules (e.g. NICEIC site plan), and a printed or digital copy of the Schedule of Inspections you'll fill in. Going on site without this is starting blind. The information set is part of the duty.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2 · Subsection 1"
            title="Visual inspection — scope, sequence and the Schedule of Inspections"
            description="The structured first stage of initial verification — Reg 642.3 items, the Appendix 6 Schedule, and the methodical sequence that catches the easy issues before instruments come out."
            tone="emerald"
          />

          <TLDR
            points={[
              'Visual inspection (Reg 642) is the first stage of initial verification — before any testing — because most defects are visible to a structured eye.',
              'The Reg 642.3 list is non-exhaustive. Add location-specific items from Part 7 and any safety-relevant items the inspector identifies.',
              'The Schedule of Inspections (Appendix 6) is the audit trail. Use tick / cross / N/A / LIM with comments wherever a cross or LIM is recorded.',
              'A4:2026 added AFDD and SPD checks to the schedule, reflecting Reg 421.1.7 (AFDD) and Section 443 (SPD).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'List the categories of items checked during visual inspection per Reg 642.3.',
              'Explain why visual inspection sits before testing in the Reg 642 / 643 sequence.',
              'Use the Schedule of Inspections (Appendix 6) correctly — tick / cross / N/A / LIM with comments.',
              'Identify when location-specific items from Part 7 must be added to the visual inspection.',
              'Recognise the visual evidence of common defects — undersized earthing conductor, missing labels, inaccessible isolation, incorrect zoning.',
              'Document limitations on the verification record where information or access is restricted.',
              "Apply the A4:2026 additions — AFDD and SPD presence checks — to the schedule.",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Why visual comes first</ContentEyebrow>

          <ConceptBlock
            title="Sequence is not arbitrary — it is risk management"
            plainEnglish="Reg 642 (visual) sits ahead of Reg 643 (testing) for a reason. Many installation defects are visible — you can see the loose CPC, the missing label, the wrong cable colour, the inaccessible isolator. Visual catches them with no instrument risk. If you skip ahead to instrumented testing, you may energise an installation with a visible defect — which is dangerous and unnecessary."
            onSite="When you arrive on site, walk the install before you open the instrument case. Schedule of Inspections in hand. The instruments come out only after the visual pass."
          >
            <p>
              The Part 6 sequence is structured around defence in depth. Each stage filters the
              installation through a different lens:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual (Reg 642).</strong> Catches defects visible to the eye and to
                tactile checks — connections, labels, mounting, zoning, identification. No
                instruments needed.
              </li>
              <li>
                <strong>Dead testing (Reg 643).</strong> Continuity, IR, polarity, electrode
                resistance — all conducted with the supply isolated. Catches defects in the
                conductor paths and insulation.
              </li>
              <li>
                <strong>Live testing (Reg 643).</strong> Zs, EFLI, RCD trip, AFDD, PFC, functional
                — catches defects in the protective device chain and ADS performance.
              </li>
              <li>
                <strong>Documentation (Reg 644).</strong> EIC + schedules issued, customer pack
                handed over.
              </li>
            </ul>
            <p>
              Skipping the visual stage means you may energise an installation with a defect that
              testing alone could miss (e.g. the missing main bonding label is not an electrical
              defect but it is a Reg 514 non-compliance — testing finds nothing wrong, visual
              catches it).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 642.1 (Information required)"
            clause="Information described in Regulation 132.13 together with that required by Regulation 514.9 shall be made available to the person or persons carrying out the inspection and testing of the installation."
            meaning={
              <>
                Before visual inspection starts, the inspector must have the design information
                (Reg 132.13 — operating, maintenance, inspection and testing data) and the diagrams,
                charts and tables required by Reg 514.9 (circuit identification, distribution
                schematic, switchgear identification). No information set means the inspector
                cannot apply the correct acceptance criteria. Document this as a limitation if
                information is missing on an EICR; refuse to start initial verification until it
                is supplied.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 642.1."
          />

          <SectionRule />

          <ContentEyebrow>The Reg 642.3 inspection items</ContentEyebrow>

          <ConceptBlock
            title="What the regulation actually lists"
            plainEnglish="Reg 642.3 gives a long but non-exhaustive list of items to inspect. The Schedule of Inspections (Appendix 6) is structured around the same headings. Working through the schedule top to bottom is the practical method — it forces you to consider every category, not just the ones you remembered."
          >
            <p>The Reg 642.3 categories, with examples of what to look for under each:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Connection of conductors.</strong> Tightness (torque-checked where
                manufacturer specifies), correct termination type, no damage to conductor strands,
                correct colour identification.
              </li>
              <li>
                <strong>Identification of conductors.</strong> Reg 514.3 — brown / black / grey
                for L1/L2/L3, blue for N, green/yellow for CPC. Mixed-colour warning notice on
                pre-harmonised installations (Reg 514.14).
              </li>
              <li>
                <strong>Routing of cables in safe zones.</strong> Reg 522.6 — within 50 mm of
                surface in permitted zones (horizontal/vertical from accessory, or within 150 mm of
                ceiling), or RCD protection, or earthed mechanical protection.
              </li>
              <li>
                <strong>Selection of conductors for current-carrying capacity and voltage drop.</strong>
                Reg 524 — visual confirmation that installed CSA matches design.
              </li>
              <li>
                <strong>Connection of single-pole devices in line conductors only.</strong>
                Reg 132.14 — switches and overcurrent devices in line, not neutral, on TN systems.
              </li>
              <li>
                <strong>Methods of protection against electric shock.</strong> Basic, fault, and
                additional protection per Chapter 41. Includes ADS arrangement, RCD presence and
                type, supplementary bonding in special locations.
              </li>
              <li>
                <strong>Presence of fire barriers and protection against thermal effects.</strong>
                Chapter 42 — sealing of cable penetrations, suitable enclosure rating, cable
                management for heat dissipation.
              </li>
              <li>
                <strong>Methods of protection against overcurrent.</strong> Correct device type
                (BS EN 60898 / BS EN 61009 / BS 88), rating, breaking capacity coordination with
                PFC.
              </li>
              <li>
                <strong>Earthing and bonding arrangements.</strong> Main earthing conductor sized
                per Table 54.7, main bonding to extraneous-conductive-parts per Reg 411.3.1.2,
                supplementary bonding in special locations per Section 701/702/703 etc.
              </li>
              <li>
                <strong>Labelling and notices.</strong> BS 951 bonding labels (Reg 514.13.1),
                circuit identification (Reg 514.9), RCD test notice (Reg 514.12), inspection date
                notice (Reg 514.12.1), main switch identification.
              </li>
              <li>
                <strong>Selection of equipment appropriate to external influences.</strong>
                IP rating, IK rating, suitability for ambient temperature and presence of water /
                dust / corrosive substances.
              </li>
              <li>
                <strong>Adequate access for operation, identification and maintenance.</strong>
                Reg 513.1 — switchgear and components must be accessible for safe operation and
                replacement.
              </li>
              <li>
                <strong>Presence of diagrams, instructions and similar information.</strong>
                Reg 514.9 — circuit chart, distribution schematic at MET / DBs.
              </li>
              <li>
                <strong>Erection methods.</strong> Adequate fixing of equipment, support of cables,
                support spans within manufacturer guidance.
              </li>
            </ul>
            <p>
              Add to this list any items required by the special locations in Part 7 that apply to
              the installation. Bathrooms (701) — zoning. Pools (702). Construction sites (704).
              Marinas (709). Solar PV (712). EV charging (722). The Part 7 items for the locations
              present must be included on the schedule.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.13.1 (Verbatim)"
            clause="A durable label complying with BS 951 stating 'Safety Electrical Connection — Do Not Remove' shall be permanently fixed in a visible position at or near the point of connection of every earthing conductor to an earth electrode, every bonding conductor to extraneous-conductive-parts, and at the main earthing terminal where separated from the main switchgear."
            meaning={
              <>
                Visual inspection checks for the BS 951 label at every required location.
                Handwritten labels, missing labels, faded labels, or labels not BS 951 compliant
                are non-compliances to record on the schedule. The label is not cosmetic — it
                prevents future trades from removing what they assume is a redundant green/yellow
                conductor.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 51, Regulation 514.13.1."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Working the Schedule of Inspections</ContentEyebrow>

          <ConceptBlock
            title="Tick, cross, N/A, LIM — and always a comment"
            plainEnglish="The schedule is your audit trail. Each item gets a tick (acceptable), cross (not acceptable), N/A (not applicable), or LIM (limitation — not assessed for a stated reason). Every cross or LIM needs a comment explaining what was found and why. A blank entry means the item was not assessed at all — which on a verification document is itself a finding."
            onSite="Fill the schedule as you go, on site. Don't leave it for the office. Memory fades. Photos help — take them as you record items, especially anything you mark as a cross or LIM."
          >
            <p>The four marking conventions:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tick (acceptable).</strong> Item assessed, complies with the standard. No
                comment required (though a brief positive note can help future inspectors —
                e.g. "all CPCs torque-checked, calibrated wrench").
              </li>
              <li>
                <strong>Cross (not acceptable).</strong> Item assessed, does not comply.
                Comment mandatory — what is wrong, what action is required. On EICR this triggers
                C-coding (C1/C2/C3/FI). On initial verification this means the install must be
                remedied before energising.
              </li>
              <li>
                <strong>N/A (not applicable).</strong> Item does not apply to this installation
                (e.g. SPD section on an installation without an SPD, or a special location item
                where the location does not exist). Brief comment helps the next reader confirm
                the N/A is correctly applied.
              </li>
              <li>
                <strong>LIM (limitation).</strong> Item could not be assessed within the agreed
                scope — comment explains why. Common limitations: cable routes hidden in fabric,
                client refused furniture move, energised distribution board where DDA not safe to
                de-energise. The limitation reduces the value of the verification — document
                clearly and inform the duty holder.
              </li>
            </ul>
            <p>
              On the EICR specifically, limitations and extents go on the front sheet (Section D).
              The Schedule of Inspections has space for individual item LIM markings to flag where
              specific items were affected.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating the schedule as a tick-everything formality"
            whatHappens={
              <>
                The inspector ticks every item without genuine assessment, signs the EIC, and the
                certificate gets issued. Six months later a fault reveals an undersized main
                earthing conductor — visible on day one. The schedule says it was checked. Now the
                inspector has not just missed a defect, they have created a false record of having
                checked it. That is a much worse legal position than missing the item entirely.
              </>
            }
            doInstead={
              <>
                Treat each tick as a declaration. If you have not actually verified the item
                against the standard, do not tick it. Either verify, or mark LIM with the reason.
                A schedule with a few honest LIMs is a far better legal record than a fully ticked
                schedule that does not reflect what you actually did.
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

          <SectionRule />

          <ContentEyebrow>A4:2026 additions to the schedule</ContentEyebrow>

          <ConceptBlock
            title="AFDD and SPD now on the schedule"
            plainEnglish="A4:2026 added rows for AFDD and confirmed SPD checks on the Schedule of Inspections. AFDDs are recommended by Reg 421.1.7 (and required for higher-risk residential buildings via the Building Safety Act 2022). SPDs are checked per Section 443. The schedule reflects the install — if AFDDs / SPDs are present, confirm type and setting; if absent, document the design decision."
          >
            <p>The A4:2026 schedule additions:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>AFDD presence (per Reg 421.1.7).</strong> The regulation uses
                "recommending" — not mandating in general use. For higher-risk residential
                buildings (HRRBs) the Building Safety Act 2022 brings them into mandatory scope.
                Visual inspection confirms AFDDs are present on the circuits where the design has
                fitted them, the type is correct (typically combined RCBO + AFDD in modern
                consumer units), and the test button has been operated as part of commissioning.
              </li>
              <li>
                <strong>SPD presence (per Section 443).</strong> Required where consequences of
                overvoltage affect safety services, public services, commercial / industrial
                activity, or many people. Type 1, Type 2, Type 1+2 combinations. Visual inspection
                confirms SPD presence at origin, status indicator showing healthy, and that the
                downstream protection (often a fuse or MCB upstream of the SPD) is correctly
                rated.
              </li>
              <li>
                <strong>Updated layout for ADS arrangements.</strong> Schedule sections clarified
                for TN-S, TN-C-S (PME / PNB), TT, IT — including the PNB designation that A4:2026
                formalised for the protective neutral bonding arrangement.
              </li>
            </ul>
            <p>
              Scheme providers (NICEIC, NAPIT, Stroma) have re-issued their branded Schedules of
              Inspections to reflect A4:2026. Make sure the version you are using matches the
              edition you are certifying against.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (AFDD recommendation)"
            clause="Regulation 421.1.7 has been introduced recommending the installation of arc fault detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a fixed installation due to the effects of arc fault currents."
            meaning={
              <>
                The wording is "recommended" — not mandated in general installations. But for
                higher-risk residential buildings (HRRBs as defined in the Building Safety Act
                2022 — typically buildings ≥ 18 m or ≥ 7 storeys with at least two residential
                units), AFDDs become mandatory through the Building Safety Act framework. Visual
                inspection confirms AFDD presence on circuits where the design specifies them,
                checks the type is BS EN 62606 compliant, and confirms the device shows healthy
                indication.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 42, Regulation 421.1.7."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="Reg 642.3 verbatim — the inspection items list structure"
            plainEnglish="The Reg 642.3 list is the formal source of inspection items. The Schedule of Inspections in Appendix 6 mirrors the list structure with tickable rows. Working through the schedule top to bottom is the practical method — every category gets considered, not just the ones you remembered."
            onSite="Print the schedule before site. Walk the install with it in hand. Tick / cross / N/A / LIM as you go. Don't try to assemble it from memory back at the office — too many gaps."
          >
            <p>Reg 642.3 categories (verbatim references) and what visual inspection covers under each:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 642.3(a) — Equipment correctly selected and erected per manufacturer.</strong>
                Protective devices used per published characteristics, accessories in correct
                orientation, cable types appropriate for installation environment.
              </li>
              <li>
                <strong>Reg 642.3(b) — Equipment compliant with applicable BS / EN.</strong>
                Standards markings on devices, certification labels, manufacturer plate
                information.
              </li>
              <li>
                <strong>Reg 642.3(c) — Connections of cables and conductors correctly made.</strong>
                Termination type appropriate, no damaged strands, conductor identification correct,
                tightness (torque-checked where manufacturer specifies).
              </li>
              <li>
                <strong>Reg 642.3(d) — Identification of conductors per Reg 514.</strong>
                Post-harmonisation colours, mixed-colour notice where present, BS 951 labels at
                bonding connections.
              </li>
              <li>
                <strong>Reg 642.3(e) — Routing of cables in safe zones (Reg 522.6).</strong>
                Within zones / RCD protected / mechanical protection per Reg 522.6.201.
              </li>
              <li>
                <strong>Reg 642.3(f) — Selection of conductors for current-carrying capacity and
                voltage drop.</strong> Installed CSA matches design, installation method
                accounts for grouping / insulation / ambient temperature.
              </li>
              <li>
                <strong>Reg 642.3(g) — Single-pole devices in line conductors only.</strong>
                Switches and overcurrent in line, not neutral, on TN systems.
              </li>
              <li>
                <strong>Reg 642.3(h) — Methods of protection against electric shock per Section 41.</strong>
                Basic protection, fault protection, additional protection layers.
              </li>
              <li>
                <strong>Reg 642.3(i) — Protection against thermal effects per Section 42.</strong>
                Fire-rated enclosures, AFDDs per Reg 421.1.7, heat dissipation, cable management
                in insulation.
              </li>
              <li>
                <strong>Reg 642.3(j) — Methods of protection against overcurrent.</strong> Correct
                device type / rating / breaking capacity.
              </li>
              <li>
                <strong>Reg 642.3(k) — Earthing arrangements.</strong> Main earthing conductor
                sized per Table 54.7, MET present, BS 951 labelled.
              </li>
              <li>
                <strong>Reg 642.3(l) — Main protective bonding.</strong> All extraneous-conductive-parts
                bonded per Reg 411.3.1.2, sized per Table 54.8.
              </li>
              <li>
                <strong>Reg 642.3(m) — Supplementary bonding where required.</strong> Section 701
                / 702 / 705 etc per Part 7.
              </li>
              <li>
                <strong>Reg 642.3(n) — Devices for isolation and switching per Section 537.</strong>
                Main switch, isolators, functional switches, emergency switching identified and
                accessible.
              </li>
              <li>
                <strong>Reg 642.3(o) — Items in special installations or locations per Part 7.</strong>
                Location-specific additions to the schedule.
              </li>
              <li>
                <strong>Reg 642.3(p) — Erection methods.</strong> Equipment fixing, cable supports,
                manufacturer recommended installation methods followed.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Visual inspection on EICR — different lens than initial verification"
            plainEnglish="On initial verification, visual asks 'does this comply with the design?'. On EICR, visual asks 'is this still safe for continued use?' — looking for deterioration, damage, defects since the last inspection, and any non-compliance with current standards. Different question, different output (C-codes vs cross/tick), but the same Reg 642.3 framework underneath."
            onSite="When you arrive at an EICR, your eye is tuned for deterioration. Loose connections from vibration. Corrosion at outdoor terminations. Burnt insulation around overloaded sockets. Damage from previous trades. Modifications since the last EICR. The visual is broader than initial verification because it covers everything that has happened to the installation since installation."
          >
            <p>EICR-specific visual inspection items (in addition to Reg 642.3):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Damage from use / age.</strong> Cracked accessories, damaged insulation,
                broken switches, burnt sockets from arc faults, damaged cable outer sheath.
              </li>
              <li>
                <strong>Deterioration over time.</strong> Corrosion at terminations, conductor
                discolouration from heat, cable insulation softening or hardening, hardware
                rusting.
              </li>
              <li>
                <strong>Modifications since installation.</strong> Additions not on the original
                EIC, alterations by other trades (kitchen / bathroom refurbishment that broke
                bonding), DIY interventions.
              </li>
              <li>
                <strong>Non-compliance with current standards.</strong> Plastic CU pre-Reg 421.1.201,
                Type AC RCDs on circuits with electronic loads, no SPD where Section 443 risk
                assessment now triggers requirement, no AFDD on circuits where Reg 421.1.7
                recommends them.
              </li>
              <li>
                <strong>Lost documentation.</strong> Circuit chart faded / removed, inspection
                notice missing or out of date, no design data for the installation.
              </li>
              <li>
                <strong>Environmental changes.</strong> Loft now insulated where cables were
                designed for free-air, dampness developed in basement, equipment relocated.
              </li>
              <li>
                <strong>Coding for each defect.</strong> C1 (immediate danger), C2 (potentially
                dangerous), C3 (improvement recommended), FI (further investigation needed). Not
                every defect needs a code; some are observations only.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EICR coding — C1, C2, C3, FI in detail"
            plainEnglish="The C-coding rubric is the heart of the EICR. C1 = immediate danger present. C2 = potentially dangerous (no immediate danger but conditions could lead to it). C3 = improvement recommended (compliant when installed but doesn't meet current standards). FI = further investigation required to determine if a code is needed. Coding is the inspector's professional judgement applied to each defect."
            onSite="Don't over-code or under-code. C1 is rare and means the install must be made safe before you leave the site (or the supply isolated). C2 is the bulk of significant findings — danger is present in fault conditions or with foreseeable misuse. C3 is the upgrade-recommended category. FI is for genuine 'I need to know more' items, not as a way to avoid coding."
          >
            <p>The C-coding rubric in detail:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>C1 — Danger present, immediate risk of injury.</strong> Examples: exposed
                live conductors in a public area, broken Class I appliance with live chassis,
                missing CPC on a metal-bodied accessory in regular contact. Action: make safe
                immediately (isolate, barrier, attend in person), notify duty holder in writing
                same day, EICR overall result is unsatisfactory.
              </li>
              <li>
                <strong>C2 — Potentially dangerous.</strong> Examples: undersized main bonding,
                inadequate disconnection time (Zs over Table 41.3), Type AC RCD on circuit
                feeding electronic loads with potential DC fault, no RCD additional protection on
                socket circuit. Action: priority remediation recommended, EICR overall result is
                unsatisfactory.
              </li>
              <li>
                <strong>C3 — Improvement recommended.</strong> Examples: installation complies
                with the standard at the time of installation but does not meet current standards
                (e.g. plastic CU pre-2016, no SPD on a domestic install, BS 3036 rewireable fuses
                still in service). Improvement adds resilience but lack of it is not a danger.
                EICR overall result can still be satisfactory if no C1 / C2 present.
              </li>
              <li>
                <strong>FI — Further investigation required.</strong> Examples: anomalous Zs
                reading at one circuit but no obvious defect on visual; suspected internal damage
                to an accessory needing dismantling to confirm; behaviour of an RCD on test
                inconsistent with its marking. Action: schedule follow-up investigation, report
                interim findings, hold final coding until investigation complete.
              </li>
              <li>
                <strong>No code (observation).</strong> Items that are noteworthy but do not
                trigger a code — e.g. lost original EIC documentation (worth noting but not itself
                a danger), bonding that meets current standard but has surface corrosion that
                doesn't yet compromise function. Document as an observation in the report.
              </li>
            </ul>
            <p>
              EICR overall result: SATISFACTORY (no C1 / C2) or UNSATISFACTORY (one or more C1 /
              C2 present). C3 alone does not make the report unsatisfactory but should be acted
              on for ongoing improvement.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Photograph everything — the visual evidence trail"
            plainEnglish="Photos turn a visual inspection record into auditable evidence. Phone cameras are good enough for site documentation. Photograph the consumer unit overview, every cross or LIM item, special location work, bonding connections, fire stopping at penetrations. Cloud-back-up immediately."
            onSite="Take more photos than you think you need. Wide overview shots for context, close-ups for specific findings. Annotate with date / location. The cost of a few hundred photos per job is essentially zero; the cost of having no evidence when challenged is high."
          >
            <p>What to photograph as part of the visual inspection record:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Consumer unit overview.</strong> Open and closed views. Circuit chart.
                Manufacturer plate. Inspection date notice.
              </li>
              <li>
                <strong>Supply intake.</strong> DNO equipment, meter, customer side, MET, main
                bonding connections.
              </li>
              <li>
                <strong>Every bonding connection.</strong> Gas, water, oil, central heating,
                structural metal, lightning. Show the BS 951 label and the conductor.
              </li>
              <li>
                <strong>Earth electrode (TT).</strong> Inspection pit, electrode, test link at
                MET.
              </li>
              <li>
                <strong>Special location work.</strong> Bathroom equipment by zone, swimming pool
                bonding, EVSE installation, PV DC isolator, agricultural equipotential plane.
              </li>
              <li>
                <strong>Fire stopping at penetrations.</strong> Each fire-rated wall / floor
                penetration, with seal product visible.
              </li>
              <li>
                <strong>Every cross or LIM item.</strong> Visual evidence of the defect or the
                limitation. Photo is worth a thousand explanatory words.
              </li>
              <li>
                <strong>Test instrument readings.</strong> Some inspectors photograph the
                instrument display showing the reading for key tests (Ze, Zs at far ends).
              </li>
              <li>
                <strong>Hand-over documentation.</strong> The completed EIC pack, the customer
                receiving it, the location where it will be retained.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="The hidden bonding defect found by visual"
            situation={
              <>
                You arrive at a domestic CU change. The previous installer terminated the meter
                tails into the new CU and signed the EIC. You are doing the periodic visual on
                handover. You find the main bonding to the gas meter is connected — but the
                conductor is 6 mm² where Table 54.8 requires 10 mm² for a 25 mm² PME supply tail.
                The label is in place, the connection is tight, the conductor is correctly
                identified. The fault is sizing.
              </>
            }
            whatToDo={
              <>
                Record on the Schedule of Inspections — main bonding (Reg 411.3.1.2): cross,
                comment "main bonding to gas meter installed at 6 mm² CSA — Table 54.8 requires
                minimum 10 mm² for 25 mm² PME tail. Remediation required before energising / sign
                off." Photograph the existing conductor, the meter tail size, and the connection.
                Notify the contractor or duty holder. Replace with 10 mm² before issuing your
                clean schedule. If existing on EICR, code C2 (potentially dangerous — fault
                protection compromised, voltage rise on extraneous-conductive-parts during fault
                exceeds the design assumption).
              </>
            }
            whyItMatters={
              <>
                Undersized main bonding is a common defect — the conductor is "there", which fools
                a casual look. Visual inspection by a competent person catches it because it
                checks against the actual table, not against general impression. Table 54.8 is
                short — print it and carry it. The cost of replacing a bonding conductor at the
                visual stage is trivial; the cost of energising an installation with undersized
                bonding and having someone shocked from a faulted gas pipe is not.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 642 visual inspection sits before Reg 643 testing in the Part 6 sequence — visual catches defects with no instrument risk.',
              'The Reg 642.3 list is non-exhaustive. Add Part 7 special location items and any other safety-relevant items the inspector identifies.',
              'The Schedule of Inspections (Appendix 6) is the audit trail — tick / cross / N/A / LIM with comments mandatory wherever a cross or LIM is recorded.',
              'Reg 642.1 requires the design information set (Reg 132.13 + 514.9) before starting. No information = limitation on EICR or refuse to start initial.',
              "Common visual defects include undersized main earthing conductor (Table 54.7), undersized main bonding (Table 54.8), missing BS 951 labels (Reg 514.13.1), wrong conductor colours without the mixed-colour notice.",
              'A4:2026 added AFDD checks (Reg 421.1.7 recommendation; HRRB requirement via Building Safety Act 2022) and SPD checks (Section 443) to the schedule.',
              'Schemes (NICEIC, NAPIT, Stroma) publish branded Schedules — confirm yours matches the BS 7671 edition you are certifying against.',
              'Treating the schedule as a tick-everything formality is worse than missing items — you create a false record. Honest LIM beats dishonest tick every time.',
            ]}
          />

          <Quiz title="Visual inspection — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section1-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.6 Initial verification — info set
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.2 Earthing and bonding inspection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
