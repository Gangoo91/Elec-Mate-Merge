import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'patm3-s1-sheath',
    question:
      'You find a 1.5 m kettle lead with a 30 mm split through the outer sheath about 200 mm from the plug. The inner cores are visible but their insulation is intact. Pass, fix, or fail?',
    options: [
      'Fail — exposed inner cores breach the flex sheath; replace the lead.',
      'Pass — only the outer sheath is broken; the cores are still insulated.',
      'Wrap the split with PVC tape and re-test the lead again in three months.',
      'Cut back the damaged section and re-fit the original plug on the shorter lead.',
    ],
    correctIndex: 0,
    explanation:
      'IET CoP 5th Ed Ch 15 (formal visual inspection) treats any sheath damage that exposes the inner cores as a fail. The outer sheath is the flex’s mechanical and additional electrical protection — once it is breached at a flex-and-bend point near the plug, taping is not a remedy. Replace the flex or replace the appliance lead.',
  },
  {
    id: 'patm3-s1-pin-oxide',
    question:
      'A BS 1363 plug on a workshop drill has noticeable green-brown discolouration on the line and neutral pins, and the live pin is faintly pitted. The earth pin looks clean. The drill is used outdoors. What does this tell you?',
    options: [
      'Cosmetic only — pin discolouration and pitting do not affect function.',
      'Clean the pins bright with wire wool, then re-test and return to service.',
      'A sign of moisture/arcing — replace the plug and inspect the socket too.',
      'Only the earth pin condition matters — line and neutral are non-critical.',
    ],
    correctIndex: 2,
    explanation:
      'Pitting and discolouration on the L/N pins is the visible sign of arcing or moisture corrosion. It raises contact resistance, which heats the plug and the socket. The CoP fails the plug; the socket should be inspected as part of the wider workplace check (HSG107).',
  },
  {
    id: 'patm3-s1-cordgrip',
    question:
      'You can see the brown and blue cores inside a moulded plug because the cord grip has slipped and the outer sheath ends inside the strain-relief boot rather than past it. Test or fail?',
    options: [
      'Test it — the inner cores are still individually insulated despite the slipped cord grip.',
      'Push the cable further in and re-tighten the cord grip onto the displaced sheath.',
      'Pass it — a moulded plug cannot be opened, so the cord grip cannot be assessed.',
      'Fail at the visual stage — the cord grip must clamp the outer sheath, not the cores.',
    ],
    correctIndex: 3,
    explanation:
      'BS 1363 plug construction requires the cord grip to clamp the outer sheath. If the sheath does not extend through the cord grip, mechanical strain is transferred to the conductor terminations — IET CoP s.15.5 fails this on construction grounds. On a moulded plug it is an immediate fail and the lead is replaced.',
  },
  {
    id: 'patm3-s1-iec',
    question:
      'A C13 (kettle) connector on a desktop PC lead has a slightly bent earth pin in the equipment-end socket and the appliance inlet shows brown scorching around the L pin. The lead itself is undamaged. Action?',
    options: [
      'Fail the appliance, not just the lead, and refer it for engineering inspection.',
      'Replace the C13 lead only and return the appliance straight back to service.',
      'Cut the IEC end off the lead and fit a new C13 connector to the existing flex.',
      'Carry out the electrical tests and decide on the basis of the measured readings.',
    ],
    correctIndex: 0,
    explanation:
      'Scorching at the appliance inlet points to a fault inside the equipment — a loose internal termination or overheating PSU. BS EN 60320 C13/C14 inlets show this when there is heat at the contact, usually a high-resistance joint or damaged inlet. The CoP rule is "do not test, fail it": visible heat damage fails at the inspection stage. Quarantine and refer for engineering inspection — replacing only the lead leaves the underlying equipment fault in service.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to IET Code of Practice 5th Edition, what proportion of in-service equipment defects are typically found at the visual / formal inspection stage rather than during electrical testing?',
    options: [
      'Around 10 %',
      'Around 25 %',
      'The majority — visual inspection is the primary fault-finding step',
      'None — only electrical tests reveal real defects',
    ],
    correctAnswer: 2,
    explanation:
      'IET CoP 5th Ed Ch 15 and HSG107 both make the point that the bulk of defects in 230 V appliance leads, plugs and flexes are picked up by formal visual inspection. Electrical testing confirms a small subset that visual inspection cannot reach (insulation, earth continuity numerics).',
  },
  {
    id: 2,
    question:
      'A BS 1363 plug has an outer sheath that ends just inside the plug body, leaving the brown and blue cores visible inside before they reach the terminals. What does the IET CoP require?',
    options: [
      'Pass — the brown and blue conductors are still individually insulated',
      'Pass, provided the appliance is Class II and therefore has no earth to disturb',
      'Fail only if a subsequent load test shows the cores moving at the terminals',
      'Fail at inspection — the cord grip must clamp the outer sheath, not the inner cores',
    ],
    correctAnswer: 3,
    explanation:
      'BS 1363 requires the cord grip to clamp the outer sheath so that mechanical pull is transferred to the sheath, not the conductors. IET CoP s.15.5 fails this construction defect at visual stage, regardless of class.',
  },
  {
    id: 3,
    question:
      'During inspection of a Class I appliance flex, you find a single broken strand visible at the brown core where it enters the L terminal of a rewireable plug. What is the correct action?',
    options: [
      'Cut back and re-terminate the conductor; pass it once the remaining strands fill the terminal',
      'Pass it as it stands — a single damaged strand is purely cosmetic and changes nothing',
      'Fail outright — any damage to a current-carrying conductor at a termination is a defect',
      'Re-test electrically and accept the plug provided the continuity reading is good',
    ],
    correctAnswer: 0,
    explanation:
      'IET CoP allows re-termination as a remedial action in formal visual inspection. The flex is cut back to undamaged conductor and re-terminated; if the remaining length is too short or the conductor is repeatedly damaged, the lead is replaced. Continuity alone does not confirm long-term mechanical integrity, so an electrical test is not the deciding factor here.',
  },
  {
    id: 4,
    question:
      'BS 1363 fixes the dimensions and construction of UK 13 A plugs. Which of the following is required by the standard for a compliant plug?',
    options: [
      'Live and neutral pins must be insulated/sleeved on the half closest to the plug body',
      'The earth pin must be the same length as the line and neutral pins',
      'The fuse must be a 3 A type regardless of appliance',
      'The cord grip is optional on moulded plugs',
    ],
    correctAnswer: 0,
    explanation:
      'BS 1363 requires partial sleeving on the L and N pins so that, when the plug is partly inserted, fingers cannot bridge live metal. The earth pin is longer (first to make, last to break) — option B is reversed. Cord grip is mandatory on all plug types — moulded and rewireable.',
  },
  {
    id: 5,
    question:
      'You are inspecting a moulded BS 1363 plug. You cannot open it to inspect terminations. What does the IET CoP say you should look for instead?',
    options: [
      'Nothing — a moulded plug cannot be inspected at all and is assessed by electrical test only',
      'Cut the moulded plug open to inspect the termination quality directly, then re-fit a new plug',
      'The external signs: pin condition, body integrity, sheath into the cord grip, fuse rating visible',
      'Only the appliance rating plate, since the plug itself reveals nothing useful on inspection',
    ],
    correctAnswer: 2,
    explanation:
      'IET CoP s.15.5 lists the external checks for moulded plugs: pin integrity and pin-to-body alignment, no cracks in the body, the sheath entering the strain relief past the moulded body (not the cores), no signs of heat damage, and the correct fuse rating clearly visible. The inspection is external because the plug cannot be opened, but it is not skipped.',
  },
  {
    id: 6,
    question:
      'A 1 m IEC C13 lead is used on a benchtop power supply. The C13 connector body has a hairline crack across the L–N face. There is no visible scorching. Action?',
    options: [
      'Pass it — a hairline crack with no scorching has no effect on the connector at all',
      'Wrap PVC tape around the cracked connector body and return the lead to service',
      'Carry out an insulation-resistance test and decide on the basis of the reading alone',
      'Fail it — the cracked C13 body compromises the L–N insulation barrier, scorching or not',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 60320 specifies the construction of appliance couplers; the connector body is part of the coupler safety. A cracked C13 body is a fail because the moulded plastic provides the L–N insulation distance — any crack reduces creepage and clearance distances and is a defect regardless of whether scorching is present.',
  },
  {
    id: 7,
    question:
      'You inspect a Class I appliance flex. The cable colour is the older red/black (pre-2004 harmonisation) but the cores are intact and the sheath is undamaged. What is the correct action under the IET CoP?',
    options: [
      'Pass it, but record the older colour code and confirm the terminations match at both ends',
      'Fail it — only harmonised brown/blue flex is permitted in service, so the lead must be withdrawn',
      'Replace the lead with new harmonised-colour flex regardless of its present condition',
      'Pass it straight away, with no need to record the older colour code anywhere on the sheet',
    ],
    correctAnswer: 0,
    explanation:
      'Older colours are not a fail in themselves and are not banned in service. The CoP requires the inspector to confirm correct identification at the terminations and to record the colour code so future inspectors are aware. The risk is mis-identification — red is L in the old code but is sometimes mistaken for E by less experienced staff — and recording it on the test sheet manages that risk.',
  },
  {
    id: 8,
    question:
      'During visual inspection of a heater flex you find that the outer sheath has been cut back further than the cord grip allows, and shrink-tube has been added by a previous user to “cover” the gap. What is the IET CoP position?',
    options: [
      'Acceptable repair — heat-shrink tube is a recognised method of restoring a damaged flex',
      'Pass it, provided the heat-shrink applied is a heavy-wall adhesive-lined type of tube',
      'Fail it — the cord grip can no longer clamp the original sheath, and shrink tube is not a CoP repair',
      'Pass it once a successful insulation-resistance test confirms the inner cores are sound',
    ],
    correctAnswer: 2,
    explanation:
      'IET CoP s.15 does not recognise shrink-tube as a remediation method for sheath damage or short-stripped flex. The flex is no longer to its original construction and the cord grip cannot clamp the sheath properly. Where the sheath is damaged or short, the lead is replaced.',
  },
  {
    id: 9,
    question:
      'On a 13 A rewireable plug, you find that the bare earth conductor inside is longer than the L and N — there is visible slack on the green-and-yellow before it reaches its terminal. What is this and why is it correct?',
    options: [
      'A construction defect — all three cores inside the plug should be cut to the same length',
      'A previous repair — someone has deliberately lengthened the earth conductor by hand',
      'Acceptable but not required — the slack on the earth core makes no difference to safety',
      'Correct construction — BS 1363 makes the earth longest so it is the last to break under pull',
    ],
    correctAnswer: 3,
    explanation:
      'BS 1363 plug construction makes the earth the longest conductor inside the plug (and the earth pin the longest external pin) so that under any flex-pull failure the earth is the last connection to break — first to make, last to break.',
  },
  {
    id: 10,
    question:
      'A 5 m extension lead has a 13 A plug and a single 13 A trailing socket. Visual inspection reveals the flex is 1.0 mm² 3-core. Pass or fail?',
    options: [
      'Fail it — a 13 A fuse cannot protect 1.0 mm² flex, which is rated below that (around 10 A)',
      'Pass it — 1.0 mm² 3-core flex is rated for at least 13 A when the lead is run in free air',
      'Pass it, provided the lead is only ever used for low-power appliances drawing under 10 A',
      'Pass it once a successful continuity test confirms the earth path through the lead is sound',
    ],
    correctAnswer: 0,
    explanation:
      'The cable-and-fuse rule (IET CoP s.15.4 / Table 15.4) requires the BS 1362 fuse to be sized to protect the flex. 1.0 mm² flex is typically rated around 10 A; fitting a 13 A fuse leaves the flex un-protected on overload. The lead is non-compliant by construction and is failed at inspection.',
  },
];

const PATTestingModule3Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Cable and plug damage checks | PAT Testing Module 3.1 | Elec-Mate',
    description:
      'IET CoP Ch 15 + BS 1363 + BS EN 60320: outer-sheath integrity, cord grip, plug-pin condition, IEC connector inspection, and the formal visual inspection checks that catch the majority of in-service defects before any electrical test.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="PAT M3 · Section 1"
            title="Cable and plug damage checks"
            description="The formal visual inspection — sheath integrity, cord grip, pin condition and IEC connector checks. The single highest-yield step in any PAT regime."
            tone="yellow"
          />

          <TLDR
            points={[
              'IET CoP 5th Ed Ch 15 puts formal visual inspection ahead of electrical testing — it catches the majority of in-service defects on flexes, plugs and connectors.',
              'BS 1363 fixes the construction of UK 13 A plugs: insulated L/N pin sleeves, longer earth pin (first to make, last to break), longer earth conductor inside the plug, mandatory cord grip on the outer sheath.',
              'The cord grip clamps the outer sheath, never the inner cores. Sheath ending inside the strain-relief boot is a fail at inspection — pull on the flex transfers straight to the terminals.',
              'Pin discolouration, pitting and oxide are signs of arcing or moisture ingress. The plug fails; the socket should also be checked because the contact resistance has been dissipating heat at both ends.',
              'BS EN 60320 (IEC) appliance couplers are inspected the same way: body cracks, scorching at the inlet, bent earth pins. Heat damage at the inlet means the appliance fails — not just the lead.',
              'IET CoP “do not test, fail it” — visible damage that compromises safety is failed at the visual stage. Electrical testing is for verifying a passable item, not rescuing a failed one.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Carry out a formal visual inspection of a Class I or Class II appliance flex, plug and connector to IET CoP 5th Ed Ch 15',
              'Identify outer-sheath damage, exposed inner cores, broken strands, and incorrect cord-grip seating, and decide pass / re-terminate / fail for each',
              'Inspect a BS 1363 plug — pin condition, sleeving, fuse rating visible, cord grip on sheath, plug body intact — and apply the same rigour to moulded and rewireable plugs',
              'Inspect a BS EN 60320 appliance coupler (C13/C14, C5/C6, C7/C8) for body integrity, pin condition, scorching and inlet damage',
              'Apply the IET CoP “do not test, fail it” rule and explain when a defect at the visual stage stops the test sequence',
              'Record the defects found on a PAT register so the next inspector and the duty-holder can act on them',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Why visual inspection comes first</ContentEyebrow>

          <ConceptBlock
            title="The IET CoP order of operations — visual before electrical"
            plainEnglish="The Code of Practice puts the formal visual inspection ahead of any electrical test. The reason is practical: most of the defects that make an appliance unsafe in service are visible — and many of them would damage the test instrument or trip a protective device if you tested first."
            onSite="Walk the lead end-to-end before you ever clip the test leads on. The hand running along the flex, the eye on the plug body, the second look at the appliance inlet — those three minutes do more than the next 30 seconds of electrical testing."
          >
            <p>
              IET Code of Practice for In-service Inspection and Testing of Electrical Equipment,
              5th Edition (2020), Chapter 15 lists the formal visual inspection items. HSG107 (HSE)
              endorses the same approach — the formal visual inspection is the principal
              fault-finding stage of an in-service inspection regime. Electrical testing exists to
              verify what cannot be seen (insulation resistance, earth continuity numerics, leakage
              under load).
            </p>
            <p>
              The CoP names the items to check on every inspection: damage to the flex, damage to
              the plug, damage to the appliance, signs of overheating, evidence of unauthorised
              modification, suitability for the environment, and the user-side condition of the
              equipment (cleanliness, missing covers, missing fixings). This section concentrates on
              the flex, plug and connector. Section 3 in this module covers overheating and
              modification; sections 4 and 5 cover environment and the risk-based approach to
              frequency.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020), Chapter 15"
            clause={
              <>
                A formal visual inspection is the most important part of any in-service inspection
                regime. Many faults can be detected by visual inspection alone, without recourse to
                electrical testing. The inspector should check the flexible cable, the plug, the
                appliance and any associated extension leads or connectors for damage, signs of
                overheating, evidence of unauthorised modification, and suitability for the
                environment in which the equipment is used.
              </>
            }
            meaning="The CoP frames visual inspection as primary, not preparatory. ‘Most important’ is the operative phrase — electrical testing supplements it, but does not replace it."
          />

          <SectionRule />

          <ContentEyebrow>The flex — what to look for, end to end</ContentEyebrow>

          <ConceptBlock
            title="Outer sheath integrity — the mechanical and electrical barrier"
            plainEnglish="The outer sheath of a flex is both mechanical protection (against abrasion, crushing, twisting) and additional insulation. Once it is breached, the flex is no longer to its original construction. Tape is not a CoP-recognised repair."
            onSite="Run the flex through your hand from plug to appliance, looking and feeling for cuts, splits, crushing, melting, bulges, and discolouration. Flex damage clusters at the two ends — within 200 mm of the plug and within 200 mm of the appliance inlet — because that is where bending stress concentrates."
          >
            <p>
              IET CoP Ch 15 lists outer-sheath damage as a fail item. The criterion is simple: any
              damage that exposes the inner cores or their insulation is a fail. A surface scuff
              that has not penetrated the sheath is recorded as wear and may be acceptable in a
              low-risk environment, but a cut, split, or crush mark that exposes the cores is failed
              at the visual stage.
            </p>
            <p>Common patterns and what they mean:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cuts at 150–200 mm from the plug</strong> — repeated bending. The flex has
                been folded over or trodden on. Replace.
              </li>
              <li>
                <strong>Crush marks across the sheath</strong> — chair leg, trolley wheel, door
                being closed on the flex. The conductors may be damaged inside even if the sheath
                looks intact. Inspect carefully.
              </li>
              <li>
                <strong>Melted or hardened sheath</strong> — heat exposure. Investigate the
                environment (Section 4) — the lead may be wrong for the location, or the appliance
                may be over-heating.
              </li>
              <li>
                <strong>Bulges or kinks</strong> — internal conductor damage from twisting or pull.
                Common on appliance leads that get coiled tightly when stored. Replace.
              </li>
              <li>
                <strong>Sheath stretched at the cord grip</strong> — the flex has been pulled and
                the cord grip is no longer on undamaged sheath. Replace, do not re-clamp.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Strand-level inspection at terminations"
            plainEnglish="Where the flex enters a rewireable plug, the conductor strands are visible. They must be intact, fully under the terminal, and not nicked. Single broken strands can be re-terminated; repeated damage at the same termination is a defect that needs the flex shortened or replaced."
          >
            <p>On a rewireable plug, IET CoP s.15.5 expects:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>All strands of each core captured under the terminal screw or pillar.</li>
              <li>No nicked, broken, or splayed strands outside the terminal.</li>
              <li>
                Insulation taken back the correct distance — short enough that bare conductor does
                not protrude beyond the terminal, long enough that the insulation is not crushed
                under the screw.
              </li>
              <li>
                Cores not crossed inside the plug — line on the right with the plug face down (BS
                1363 fused side), neutral on the left, earth at the top.
              </li>
              <li>
                Earth conductor longest inside the plug, so that if the cord grip ever lets go, L
                and N pull out before earth.
              </li>
            </ul>
            <p>
              On a moulded plug (the CoP&rsquo;s default for new equipment) you cannot inspect
              terminations directly — you inspect the externals: the sheath entering the strain
              relief, the body integrity, the pin alignment, and any visible scorching or
              discolouration at the body around each pin.
            </p>
          </ConceptBlock>

          {/* Plug anatomy diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              BS 1363 plug — what to inspect, where damage shows up
            </h4>
            <svg
              viewBox="0 0 820 460"
              className="w-full h-auto"
              role="img"
              aria-label="Annotated cross-section of a BS 1363 13A plug. The plug body sits centred. Pins are labelled: earth pin top (longest), Neutral pin lower-left (half-sleeved), Line pin lower-right (half-sleeved). A BS 1362 fuse sits beside the Line pin. The cord grip clamps the outer sheath at the base. Below it the strain-relief boot routes the flex out. Leader lines connect each labelled feature on the left- and right-hand label columns to the part it describes. A bottom band marks the high-stress zone — the first 200 mm of flex where damage typically starts."
            >
              {/* Plug body outline */}
              <rect
                x="320"
                y="60"
                width="200"
                height="320"
                rx="14"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <text
                x="420"
                y="50"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="12"
                fontWeight="bold"
              >
                BS 1363 plug body
              </text>

              {/* Earth pin (top, longer) */}
              <rect
                x="405"
                y="90"
                width="30"
                height="64"
                rx="3"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="2"
              />
              <text
                x="420"
                y="128"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="12"
                fontWeight="bold"
              >
                E
              </text>

              {/* Earth-pin label (right column) with leader */}
              <line
                x1="435"
                y1="108"
                x2="560"
                y2="100"
                stroke="rgba(34,197,94,0.6)"
                strokeWidth="1"
              />
              <text x="568" y="98" fill="#22C55E" fontSize="10.5" fontWeight="bold">
                Earth pin — longest
              </text>
              <text x="568" y="112" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                first to make, last to break
              </text>
              <text x="568" y="126" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                check: bent, oxidised, missing
              </text>

              {/* N pin (left, half-sleeved) */}
              <rect
                x="358"
                y="174"
                width="22"
                height="84"
                rx="3"
                fill="rgba(59,130,246,0.18)"
                stroke="#3B82F6"
                strokeWidth="2"
              />
              <rect
                x="358"
                y="174"
                width="22"
                height="42"
                rx="3"
                fill="rgba(0,0,0,0.45)"
                stroke="#3B82F6"
                strokeWidth="1"
              />
              <text
                x="369"
                y="226"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="11"
                fontWeight="bold"
              >
                N
              </text>

              {/* L pin (right, half-sleeved) */}
              <rect
                x="460"
                y="174"
                width="22"
                height="84"
                rx="3"
                fill="rgba(239,68,68,0.18)"
                stroke="#EF4444"
                strokeWidth="2"
              />
              <rect
                x="460"
                y="174"
                width="22"
                height="42"
                rx="3"
                fill="rgba(0,0,0,0.45)"
                stroke="#EF4444"
                strokeWidth="1"
              />
              <text
                x="471"
                y="226"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                L
              </text>

              {/* L pin label (right column) with leader */}
              <line
                x1="482"
                y1="200"
                x2="560"
                y2="180"
                stroke="rgba(239,68,68,0.6)"
                strokeWidth="1"
              />
              <text x="568" y="178" fill="#EF4444" fontSize="10.5" fontWeight="bold">
                Line pin (L)
              </text>
              <text x="568" y="192" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                half-sleeved per BS 1363
              </text>
              <text x="568" y="206" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                check: pitting, oxide, scorch
              </text>

              {/* N pin label (left column) with leader */}
              <line
                x1="358"
                y1="200"
                x2="280"
                y2="180"
                stroke="rgba(59,130,246,0.6)"
                strokeWidth="1"
              />
              <text
                x="272"
                y="178"
                textAnchor="end"
                fill="#3B82F6"
                fontSize="10.5"
                fontWeight="bold"
              >
                Neutral pin (N)
              </text>
              <text x="272" y="192" textAnchor="end" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                half-sleeved per BS 1363
              </text>
              <text x="272" y="206" textAnchor="end" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                check: pitting, oxide, scorch
              </text>

              {/* BS 1362 fuse — beside the L pin (inside body) */}
              <rect
                x="396"
                y="270"
                width="50"
                height="16"
                rx="3"
                fill="rgba(251,191,36,0.22)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text
                x="421"
                y="282"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                BS 1362
              </text>

              {/* Fuse label (left column) with leader */}
              <line
                x1="396"
                y1="278"
                x2="280"
                y2="262"
                stroke="rgba(251,191,36,0.6)"
                strokeWidth="1"
              />
              <text
                x="272"
                y="260"
                textAnchor="end"
                fill="#FBBF24"
                fontSize="10.5"
                fontWeight="bold"
              >
                BS 1362 fuse
              </text>
              <text x="272" y="274" textAnchor="end" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                3 A / 5 A / 13 A — sized to flex
              </text>
              <text x="272" y="288" textAnchor="end" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                check: rating visible &amp; correct
              </text>

              {/* Cord grip area (inside body, near base) */}
              <rect
                x="358"
                y="306"
                width="124"
                height="34"
                rx="6"
                fill="rgba(251,191,36,0.12)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="420"
                y="328"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                CORD GRIP
              </text>

              {/* Cord grip label (right column) with leader */}
              <line
                x1="482"
                y1="322"
                x2="560"
                y2="316"
                stroke="rgba(251,191,36,0.6)"
                strokeWidth="1"
              />
              <text x="568" y="314" fill="#FBBF24" fontSize="10.5" fontWeight="bold">
                Cord grip
              </text>
              <text x="568" y="328" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                clamps the OUTER SHEATH
              </text>
              <text x="568" y="342" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                never the inner cores
              </text>

              {/* Strain-relief boot / sheath entry (just outside body, below) */}
              <rect
                x="395"
                y="380"
                width="50"
                height="36"
                rx="6"
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1.4"
              />
              <text
                x="420"
                y="402"
                textAnchor="middle"
                fill="rgba(255,255,255,0.75)"
                fontSize="9.5"
              >
                strain relief
              </text>

              {/* Sheath entry label (left column) with leader */}
              <line
                x1="395"
                y1="398"
                x2="280"
                y2="398"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
              />
              <text
                x="272"
                y="396"
                textAnchor="end"
                fill="#FBBF24"
                fontSize="10.5"
                fontWeight="bold"
              >
                Sheath entry
              </text>
              <text x="272" y="410" textAnchor="end" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                outer sheath through to here
              </text>
              <text x="272" y="424" textAnchor="end" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                cores must NOT be visible
              </text>

              {/* Flex below */}
              <rect
                x="405"
                y="416"
                width="30"
                height="36"
                rx="14"
                fill="rgba(0,0,0,0.4)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.6"
              />

              {/* High-stress zone callout (right column) */}
              <line
                x1="435"
                y1="434"
                x2="560"
                y2="434"
                stroke="rgba(251,191,36,0.7)"
                strokeWidth="1.2"
                strokeDasharray="3,3"
              />
              <text x="568" y="430" fill="#FBBF24" fontSize="10.5" fontWeight="bold">
                High-stress zone
              </text>
              <text x="568" y="444" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                first 200 mm — damage
              </text>
              <text x="568" y="456" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                typically starts here
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The plug — BS 1363 construction and inspection points</ContentEyebrow>

          <ConceptBlock
            title="BS 1363 — what the standard fixes"
            plainEnglish="BS 1363 is the UK 13 A plug-and-socket standard. It fixes the dimensions, the pin layout, the partial sleeving on L and N, the longer earth pin and earth conductor, and the requirement for a cord grip on the outer sheath of the flex."
            onSite="A plug that does not meet BS 1363 — a counterfeit, a non-UK pattern fitted with an adaptor, a moulded plug with a damaged sleeve — fails at inspection. The standard is not negotiable."
          >
            <p>The construction features the inspector verifies on every BS 1363 plug:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Earth pin longer than L/N pins.</strong> First to make contact when
                inserted, last to break when withdrawn. A bent or short earth pin is a fail.
              </li>
              <li>
                <strong>L and N pins half-sleeved.</strong> The half closest to the plug body is
                insulated so that finger contact during partial insertion cannot bridge live metal.
                A worn or missing sleeve is a fail.
              </li>
              <li>
                <strong>BS 1362 fuse fitted, rating clearly visible.</strong> 3 A or 13 A are the
                two domestic ratings; 5 A is also permitted for certain appliances. The rating must
                match the flex (next section).
              </li>
              <li>
                <strong>Cord grip on the outer sheath.</strong> The grip clamps the sheath, not the
                inner cores. The sheath must extend through the grip into the body of the plug.
              </li>
              <li>
                <strong>Earth conductor longest inside the plug.</strong> So that if the cord grip
                fails, L and N disconnect first.
              </li>
              <li>
                <strong>Plug body intact.</strong> No cracks, no missing chunks of moulded plastic,
                no exposure of internal metalwork through the body.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 1363-1:2016+A1:2018 — 13 A plugs, socket-outlets, adaptors and connection units"
            clause={
              <>
                The line and neutral pins of a 13 A plug shall be partially insulated such that,
                when the plug is partially withdrawn, accidental contact with a live conductor by a
                finger is prevented. The earth pin shall be of greater length than the line and
                neutral pins. The plug shall be fitted with a means of cable retention (cord
                anchorage) that grips the outer sheath of the flexible cord, and the cable anchorage
                shall not depend on the conductors for its action.
              </>
            }
            meaning="BS 1363 codifies what the formal visual inspection looks for: sleeved L/N pins, longer earth pin, cord grip on the sheath that does not rely on the conductors. Each is a fail at inspection if it is missing or damaged."
          />

          <Scenario
            title="A workshop drill plug, four months in service"
            situation="A 13 A moulded plug on a 110 V transformer feed has visible green-brown discolouration on both L and N pins and a hairline crack across the body between the L pin and the cord grip. The earth pin is clean. The drill is used outdoors in damp conditions on a construction site."
            whatToDo="Fail at inspection. Two separate defects each justify the fail: pin discolouration (moisture/arcing) and the body crack (loss of insulation barrier between L and the cord grip area). Replace the lead. Inspect the matching site transformer outlet for matching pin marks; if found, the outlet is also failed."
            whyItMatters="Each defect alone is a fail. Together they are a clue: the lead has been used outside its environmental envelope. HSG107 Table 1 puts construction sites in the higher-frequency / more-damage category. The fix is not just a new lead — it is a conversation with the duty-holder about whether the right kit is on site (Section 4)."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Pin condition — what oxidation, pitting and arcing tell you
          </ContentEyebrow>

          <ConceptBlock
            title="Reading plug pin damage"
            plainEnglish="Plug pins are the contact points where current flows from the supply into the appliance. Damage to the pin surface is a sign that the contact has been resistive — heating, arcing, or corroding. The plug fails on pin condition alone, but the symptom is also useful diagnostically."
            onSite="Look at all three pins under good light. Compare them to a known-good plug. The patterns are recognisable once you have seen a few — and they always tell you something about what the appliance has been doing."
          >
            <p>The four common patterns:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Bright clean pins.</strong> Normal. Brass, lightly polished by use.
              </li>
              <li>
                <strong>Mild oxide / dull tarnish.</strong> Cosmetic in dry indoor environments;
                usually acceptable. In damp environments it is a flag — the pin is at the start of
                the corrosion sequence.
              </li>
              <li>
                <strong>Green-brown discolouration.</strong> Moisture corrosion. Contact resistance
                is rising. The plug fails on this. Inspect the matching socket — the same corrosion
                is likely on the socket contacts.
              </li>
              <li>
                <strong>Pitting / black spots / scorched plug body around the pin.</strong> Arcing.
                The plug has been making and breaking under load with poor contact, or the socket
                has been worn. Fail the plug; flag the socket for fixed-wiring inspection.
              </li>
            </ul>
            <p>
              Pin alignment matters too. A pin that is bent, splayed or twisted out of true is a
              fail — the BS 1363 dimensional tolerance is tight, and a misaligned pin will not seat
              cleanly in a compliant socket. The result is the same: rising contact resistance,
              heat, eventual failure.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Cleaning corroded pins with wire wool and re-using the plug"
            whatHappens="The pins look bright again. The contact resistance is briefly improved. But the underlying mechanism — moisture corrosion — has not gone anywhere, and the plug is now thinner at the pin where the wire wool removed brass. Within weeks the corrosion returns, and the dimensional tolerance to BS 1363 is now out."
            doInstead="Replace the plug (or the lead, on moulded plugs). Investigate why moisture got in — wrong environment, broken seal at the appliance inlet, leak above the socket — and address that. The CoP does not list pin polishing as a remedial action."
          />

          <CommonMistake
            title="Ignoring scorching at the plug body around a pin"
            whatHappens="The brown ring of melted plastic around the L pin gets dismissed as a stain. The next time the appliance is plugged in under load, the contact resistance at that pin produces enough heat to soften the body further. Eventually the pin loses its retention in the body and either pulls back into the plug under load or causes a flashover."
            doInstead="Scorching at the plug body is heat damage. IET CoP s.15.6 fails the plug. Replace and investigate the matching socket — both ends of the contact have been heated."
          />

          <SectionRule />

          <ContentEyebrow>BS EN 60320 appliance couplers (IEC connectors)</ContentEyebrow>

          <ConceptBlock
            title="The IEC family — C13/C14, C5/C6, C7/C8 and the rest"
            plainEnglish="BS EN 60320 (the harmonised version of IEC 60320) defines the appliance-coupler types you see on detachable mains leads — kettle leads, PC leads, the figure-of-eight on small electronics, the cloverleaf on laptop bricks. Each type has a current and temperature rating, and each is inspected against the same defect catalogue: body integrity, pin condition, scorching."
            onSite="The defect set is similar to the BS 1363 plug — different geometry, same principles. Cracks in the body, scorching at the contacts, bent or pitted pins, and damaged latches all fail the lead. Heat damage at the appliance inlet means the appliance fails too."
          >
            <p>The common types and their inspection points:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>C13 / C14 (10 A, 70 °C).</strong> The PC / monitor / printer lead. Inspect:
                body cracks, pin pitting (especially L), scorching at the appliance inlet, latch
                clip on the lead end intact (where fitted), no missing pins.
              </li>
              <li>
                <strong>C15 / C16 (10 A, 120 °C).</strong> Higher temperature variant — the kettle
                lead with the notch. Same checks; additionally, no melting or distortion of the
                connector body.
              </li>
              <li>
                <strong>C5 / C6 (2.5 A, 70 °C) — the cloverleaf.</strong> Common on laptop power
                bricks. Inspect: all three pins present (some counterfeit cables omit the earth),
                body intact, no scorching.
              </li>
              <li>
                <strong>C7 / C8 (2.5 A, 70 °C) — the figure-of-eight.</strong> Two-pin only — used
                on Class II equipment. Body integrity, pin pitting, no scorching.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 60320-1:2021 — Appliance couplers for household and similar general purposes"
            clause={
              <>
                Appliance couplers shall be so constructed and protected that, in normal use, their
                live parts cannot be touched. The connector and appliance inlet shall withstand
                without damage the mechanical and thermal stresses likely to occur in normal
                service. After the test of resistance to abnormal heat and to fire, the sample shall
                show no damage that impairs further safe use.
              </>
            }
            meaning="The standard requires the connector and inlet to remain safe under normal use stresses. Visible heat damage means that envelope has been exceeded — the part is failed at inspection, not retested."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Cord grip and strain relief — the most ignored CoP item</ContentEyebrow>

          <ConceptBlock
            title="Why the cord grip exists, and what fails when it does not work"
            plainEnglish="The cord grip clamps the outer sheath of the flex. Its job is to take any mechanical pull on the lead — being yanked, tripped over, dragged — and stop it reaching the conductor terminations. If the grip clamps the inner cores instead, or if the sheath does not extend through the grip, the design intent has been defeated and the lead is failed at inspection."
          >
            <p>Common cord-grip failures and what they mean:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>
                  Sheath ends inside the strain-relief boot, cores visible inside the plug.
                </strong>{' '}
                The grip is gripping nothing useful. Pull on the flex transfers to the terminals.
                Fail.
              </li>
              <li>
                <strong>Cord grip not seated — screws loose or moulded grip cracked.</strong> Same
                outcome. Fail.
              </li>
              <li>
                <strong>Wrong-size flex for the grip.</strong> A cord grip designed for round 6 mm
                flex clamping flat 2-core lighting flex is not making proper contact. Fail.
              </li>
              <li>
                <strong>Sheath stretched and stripped at the grip from previous pulls.</strong> The
                grip is now on damaged sheath. Replace the lead — re-clamping is not a CoP repair.
              </li>
              <li>
                <strong>Strain-relief boot split or torn on a moulded plug.</strong> The boot is the
                first line of bend protection. A split boot leaves the cable bending sharply at the
                plug body. Fail the plug — replace the lead.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="An office vacuum cleaner with a re-used plug"
            situation="A 13 A rewireable plug on an office vacuum has been opened and re-terminated. Inside, the green-and-yellow earth core is the shortest conductor, the brown is longest, and the blue is mid-length. The cord grip clamps the cores rather than the outer sheath, which has been cut back about 10 mm too short."
            whatToDo="Fail at inspection on three counts. (1) Earth conductor must be longest — first to make, last to break — not shortest. (2) Cord grip must clamp outer sheath, not cores. (3) Outer sheath must extend into the cord grip. The original assembler reversed BS 1363 construction. Strip and re-terminate the plug correctly, or replace it."
            whyItMatters="A reversed-length earth means that under any pull the earth disconnects first, leaving L and N still in circuit. That is the opposite of fail-safe. The CoP does not soften this point — it is one of the tightest construction rules in the standard."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The “do not test, fail it” rule</ContentEyebrow>

          <ConceptBlock
            title="When a defect at the visual stage stops the test sequence"
            plainEnglish="The IET CoP is explicit that visible damage which compromises safety is failed at the visual stage. Electrical testing is for verifying a passable item, not rescuing a failed one. Connecting a failed lead to a tester wastes time, may damage the tester, and risks the inspector if the fault is internal."
            onSite="If the lead would not be safe to plug into a socket and use, it is not safe to plug into a tester and use. Quarantine and label."
          >
            <p>The defects that stop the test sequence — “do not test, fail it” — are:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Outer sheath damage exposing inner cores.</li>
              <li>
                Cracked or broken plug body, broken / missing pins, scorched body around pins.
              </li>
              <li>Cord grip not on outer sheath, or sheath not entering the cord grip.</li>
              <li>Visible signs of overheating at the plug, connector, or appliance inlet.</li>
              <li>
                Evidence of unauthorised modification (incorrect cable joints, non-CoP repairs,
                home-made adaptors).
              </li>
              <li>Wrong fuse rating fitted (covered in Section 2).</li>
              <li>Equipment unsuitable for the environment in which it is being used.</li>
            </ul>
            <p>
              The PA tester does not get clipped on. The lead or appliance is labelled “failed — do
              not use” and removed from service. The defect is recorded on the PAT register so the
              duty-holder can act.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSG107 — Maintaining portable electrical equipment (HSE, 4th Edition 2013, reissued)"
            clause={
              <>
                A formal visual inspection by a competent person will identify most types of damage
                and many faults. It is the most important part of any inspection regime. Equipment
                that fails the visual inspection should be removed from service immediately and
                should not be subject to combined inspection and testing until it has been repaired
                and the visual inspection passed.
              </>
            }
            meaning="HSG107 confirms the CoP rule from the HSE perspective. Failed equipment leaves service first, gets repaired second, and only then re-enters the test sequence — never the other way round."
          />

          <SectionRule />

          <ContentEyebrow>PUWER 1998 — the wider duty</ContentEyebrow>

          <ConceptBlock
            title="Where the visual inspection sits in the legal framework"
            plainEnglish="The Provision and Use of Work Equipment Regulations 1998 (PUWER) Reg 5 puts a duty on employers to maintain work equipment in efficient working order and good repair. Reg 6 requires that work equipment exposed to deteriorating conditions is inspected at suitable intervals. The PAT inspection regime is one of the ways those duties are discharged for portable electrical equipment."
          >
            <p>
              PUWER does not specify how often to inspect or what to look for. It points back to
              competent guidance — IET CoP and HSG107 — for the practical detail. The legal
              consequence is that the duty-holder cannot claim ignorance: if a piece of equipment
              fails in service in a way that visible damage would have caught, the inspection regime
              is in scope of an HSE investigation.
            </p>
            <p>
              The inspector&rsquo;s record matters here. A PAT register that shows the formal visual
              inspection was carried out on a date by a named competent person is the evidence the
              duty-holder relies on. A register that just shows pass/fail electrical results without
              the visual stage is not enough.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Provision and Use of Work Equipment Regulations 1998, Regulation 5 (Maintenance)"
            clause={
              <>
                Every employer shall ensure that work equipment is maintained in an efficient state,
                in efficient working order and in good repair. Where any machinery has a maintenance
                log, the log shall be kept up to date.
              </>
            }
            meaning="‘Maintained in good repair’ is the legal hook. The visual inspection — and the record of it — is how the employer demonstrates the duty has been met for portable electrical equipment."
          />

          <SectionRule />

          <ContentEyebrow>Recording the inspection — what goes on the PAT register</ContentEyebrow>

          <ConceptBlock
            title="The minimum data set for a formal visual inspection record"
            plainEnglish="Each inspected item gets a record that lets a future inspector and the duty-holder reconstruct what was seen. Pass/fail alone is not enough — the defects found and the action taken are part of the record."
          >
            <p>The IET CoP recommends at least:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Equipment identifier (asset tag / serial / location).</li>
              <li>Class (I, II, III) and connection type (BS 1363, IEC, hard-wired).</li>
              <li>Date of inspection and inspector name / ID.</li>
              <li>Visual inspection result and any defects found (described, not just coded).</li>
              <li>
                Action taken (passed, repaired and re-inspected, replaced, failed and removed).
              </li>
              <li>
                Where applicable, the matching electrical-test results (covered in M4) — but only if
                the visual inspection passed.
              </li>
              <li>Next inspection due date based on the risk assessment (Section 5).</li>
            </ul>
            <p>
              Modern PAT testers store these as fields in their internal database, but the
              duty-holder is the owner of the register — the data should be exported and held in the
              workplace records, not only in the tester memory.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Visual inspection comes first and finds the majority of defects. It is the most important step in a PAT regime — IET CoP Ch 15 and HSG107 are explicit on this.',
              'BS 1363 fixes plug construction: longer earth pin, half-sleeved L/N pins, BS 1362 fuse, cord grip on outer sheath, longest earth conductor inside the plug.',
              'The cord grip clamps the outer sheath. Sheath ending inside the strain-relief boot, or cores visible inside the plug, is a fail at inspection.',
              'Pin condition reads like a chart: clean, mild oxide, green-brown corrosion, pitting/scorch. The last two fail; check the matching socket too.',
              'BS EN 60320 (IEC) couplers are inspected the same way: body integrity, pin condition, scorching, latch intact. Heat at the appliance inlet fails the appliance, not just the lead.',
              '“Do not test, fail it” — visible damage that compromises safety stops the test sequence. The lead leaves service before any electrical test is attempted.',
              'PUWER Reg 5 makes maintenance a legal duty; the formal visual inspection is how that duty is discharged for portable electrical equipment, and the PAT register is the evidence.',
              'Tape, shrink tube and wire-wool polishing are not CoP-recognised repairs. Replace the plug or the lead.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Can I PVC-tape a small split in the outer sheath instead of replacing the lead?',
                answer:
                  'No. IET CoP Ch 15 does not list tape as a permitted remediation for sheath damage. The outer sheath provides mechanical and additional electrical protection — once breached, the lead is failed at inspection. Replace the flex (on a rewireable plug) or the lead (on a moulded plug). Tape is a temporary fix on something already failed and out of service, not a way back into service.',
              },
              {
                question: 'Are the older red/black/green flex colours still permitted in service?',
                answer:
                  'In service, yes — the older colours were used legally before the 2004/2006 harmonisation (which introduced brown / blue / green-and-yellow on flexible cables). Existing equipment is not failed for colour alone, but the inspector must verify the terminations match the colour used and record the code on the test sheet. The risk being managed is mis-identification by a future inspector or repairer.',
              },
              {
                question:
                  'A moulded plug has a hairline crack across the body. Test it electrically and decide?',
                answer:
                  'No. IET CoP “do not test, fail it” applies. A cracked plug body is a fail at the visual stage — the body provides the L/N/E insulation and the structural support for the pins. Replacing the lead is the action; electrical testing of a known-cracked plug is wasted effort and risks the tester and the inspector.',
              },
              {
                question: 'How do I inspect terminations inside a moulded plug?',
                answer:
                  'You cannot, and you do not have to. The CoP recognises that moulded plugs cannot be opened — the inspection is external. You verify pin condition, body integrity, the sheath entering the strain-relief boot (not the cores visible), the fuse rating window, and any scorching or discolouration around the pins. If the externals pass, the moulded internal terminations are deemed acceptable for the inspection cycle.',
              },
              {
                question:
                  'A C13 lead has visible scorching on the L pin and at the appliance inlet. Replace the lead?',
                answer:
                  'Replace the lead, but also fail the appliance. Scorching at the appliance inlet means there has been heat at the L contact inside the equipment — typically a high-resistance internal joint or a damaged inlet. Replacing only the lead leaves the underlying equipment fault in service. The CoP rule is to fail visibly heat-damaged equipment at the visual stage and refer for engineering inspection.',
              },
              {
                question:
                  'What is the difference between a “fail” and a “damaged but repairable” outcome?',
                answer:
                  'Both involve removing the item from service. “Damaged but repairable” means a competent person can re-terminate, replace the plug, or replace the flex, and the item is then re-inspected and returned to service. “Fail” without repair means the equipment leaves service permanently, or until it has been overhauled and re-presented. The PAT register should record which path was taken so the next inspector can see whether the item is the same one with the same history.',
              },
              {
                question: 'Does the CoP set a numerical inspection interval for visual inspection?',
                answer:
                  'No fixed numerical interval. HSG107 introduced and the CoP endorses a risk-based approach — the interval depends on the environment, the equipment type, the frequency of use, and user awareness. IET CoP Table 7.1 gives indicative starting frequencies, but the principle is that the interval is set by the duty-holder’s risk assessment, not by a national fixed schedule. Section 5 of this module covers this in detail.',
              },
              {
                question:
                  'A 13 A plug has been opened and re-terminated by a previous user. The earth conductor is the shortest of the three. What do I do?',
                answer:
                  'Fail at inspection. BS 1363 requires the earth conductor to be the longest inside the plug so that, if the cord grip ever fails, L and N disconnect first and the earth is the last to break. A reversed-length earth defeats this fail-safe. The remediation is to strip and re-terminate the plug correctly, or replace it with a moulded plug, then re-inspect.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Cable and plug damage checks — PAT M3.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-3-section-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.2 Rewiring &amp; correct fuse ratings
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default PATTestingModule3Section1;
