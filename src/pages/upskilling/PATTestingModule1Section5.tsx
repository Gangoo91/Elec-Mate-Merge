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
    id: 'patm1-s5-pillars',
    question:
      'HSG107 sets out a hierarchy of inspection activities for portable equipment. Which is the correct ordering, by frequency?',
    options: [
      'Combined inspection-and-test most frequent, then formal visual, then user check least frequent.',
      'User check, then formal visual inspection, then combined inspection-and-test.',
      'Formal visual inspection, then user check, then combined inspection-and-test.',
      'All three activities run at the same frequency on every item.',
    ],
    correctIndex: 1,
    explanation:
      'User checks are the highest-frequency, lowest-cost activity, carried out by the user every use. Formal visual inspection is periodic, by a competent person, with no dismantling. Combined inspection-and-test is the least frequent but most thorough, adding electrical instrument readings. HSG107 §27-44 and IET CoP §10-14 set this economic hierarchy as the logic of the whole regime.',
  },
  {
    id: 'patm1-s5-userscope',
    question:
      'A user checks a kettle before plugging it in. Which of the following is OUTSIDE the scope of a user check?',
    options: [
      'Looking at the flex for visible damage along its length.',
      'Looking at the plug top for cracks, discolouration, signs of overheating.',
      'Removing the bottom plate of the kettle to inspect internal terminations.',
      'Smelling for burnt insulation around the plug.',
    ],
    correctIndex: 2,
    explanation:
      'User checks are external and tactile. Removing covers escalates to formal-visual or combined inspection-and-test territory and requires competence. IET CoP §10 frames user checks as "look at it before you plug it in" — visible, smellable, no tools.',
  },
  {
    id: 'patm1-s5-recordable',
    question: 'How is the user-check pillar typically recorded for compliance purposes?',
    options: [
      'Every user check is signed off against every item, every time it is used.',
      'The supporting system is recorded — training, fault-reporting routes, out-of-service tags — not the checks themselves.',
      'No records of any kind support the user-check pillar in an audit.',
      'Only checks that result in a failure or defect are logged.',
    ],
    correctIndex: 1,
    explanation:
      'HSG107 §27-30 and IET CoP §10 frame user-check evidence as the system, not the daily transactional records. What is recorded: training delivery, fault-reporting routes, defective-item tags and withdrawals, defects reported and acted on. What is not recorded: the visual moment of every user with every item — logging that would convert continuous awareness into a checkbox.',
  },
  {
    id: 'patm1-s5-flow',
    question:
      'During a formal visual, the inspector finds a hairline crack in the plug body. The kettle still works and the user has been using it. Which next step is correct?',
    options: [
      'Apply a pass-label and note the crack in comments for the next cycle.',
      'Withdraw, tag out-of-service, log the defect, then replace the plug top and re-test (or replace the kettle).',
      'Apply tape over the crack and return the kettle to service.',
      'Test the kettle electrically and base the decision on the readings.',
    ],
    correctIndex: 1,
    explanation:
      'Cracked plug bodies are a Reg 4(2) defect — they expose live conductors and are not "monitor and review". IET CoP §14 and HSG107 §40 are explicit: visible plug damage is an immediate withdrawal-from-service criterion. The electrical test does not redeem a visible safety defect, and the defect-and-action log is the documentary trail.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary purpose of the user-check pillar of an HSG107 PAT regime?',
    options: [
      'To replace formal inspection altogether.',
      'To document the combined inspection-and-test results.',
      'To catch visible defects at the highest frequency before equipment is energised.',
      'To let the user perform electrical instrument testing.',
    ],
    correctAnswer: 2,
    explanation:
      'The user-check pillar exists because no formal inspection regime, however frequent, can match the cadence of every-use observation by the user. HSG107 §27-30 and IET CoP §10 build on this: user checks catch the bulk of preventable defects between formal cycles.',
  },
  {
    id: 2,
    question:
      'What does a competent person, performing a formal visual inspection per IET CoP §14, look at that a user typically does not?',
    options: [
      'Nothing different from the user check.',
      'A systematic check of flex, fuse rating, cord grip, casing and markings.',
      'Internal components reached by removing the covers.',
      'Only the equipment rating-plate markings.',
    ],
    correctAnswer: 1,
    explanation:
      'The formal visual is the systematic version of what the user does intuitively. IET CoP §14 expressly does NOT include dismantling — that escalates to combined inspection-and-test. The depth difference is rigour and coverage, not invasiveness.',
  },
  {
    id: 3,
    question: 'A combined inspection-and-test adds what to the formal visual?',
    options: [
      'A different visual checklist only.',
      'Only an additional functional load test.',
      'Electrical instrument testing — continuity, insulation resistance, polarity and function.',
      'Removal of the covers for internal inspection.',
    ],
    correctAnswer: 2,
    explanation:
      'The combined inspection-and-test is "formal visual + instrument tests + records of numerical readings". It catches defects the visual cannot — open or high-resistance CPCs, insulation degradation, leakage above acceptable limits — and produces the numerical evidence that backs the EAWR / PUWER record.',
  },
  {
    id: 4,
    question:
      'A user receives no training on what to check before plugging in equipment, and there is no system for reporting defects. Which legal duties have failed?',
    options: [
      'None — user checks are purely advisory guidance with no statutory force.',
      'Only the HSG107 guidance has been departed from; no statutory duty is engaged.',
      'Only EAWR Reg 4(2) is breached, as the equipment was not maintained.',
      'HSWA s.2(2)(c) and s.2(2)(a), EAWR Reg 4(2) and PUWER Reg 8 all fail together.',
    ],
    correctAnswer: 3,
    explanation:
      'The user-check pillar is the cheapest, most frequent line of defence — and the one that depends entirely on the employer providing training and a defect-reporting route. Skipping it does not just fail the IET CoP framework; it fails several statutory duties simultaneously.',
  },
  {
    id: 5,
    question:
      'Why does HSG107 advise that the user is the "first line of defence" against electrical danger?',
    options: [
      'Because the user has the highest-frequency contact with the equipment.',
      'To shift legal responsibility from the employer to the user.',
      'Because users are required by law to be electrically competent.',
      'Because formal inspections are simply too expensive to run.',
    ],
    correctAnswer: 0,
    explanation:
      'It is a cadence argument, not a responsibility-shifting one. HSWA s.7 imposes a user duty to take reasonable care, but the employer retains the s.2 duty to set the system up. The "first line of defence" framing is about temporal proximity to defects — only the user sees the equipment every time.',
  },
  {
    id: 6,
    question:
      'IET CoP §14 states the formal visual inspection should NOT require dismantling. Why is that constraint important?',
    options: [
      'Purely to save inspection time.',
      'Because dismantling equipment is illegal.',
      'To keep the inspection non-invasive and achievable by trained, non-instrument staff.',
      'To make it identical to the user check.',
    ],
    correctAnswer: 2,
    explanation:
      'The rule keeps the formal visual a discrete inspection step, not a maintenance activity. Items that need dismantling enter combined inspection-and-test or planned maintenance, with the appropriate competence threshold (EAWR Reg 16) and record requirement.',
  },
  {
    id: 7,
    question:
      'A user reports a fault-tingling sensation when touching a metal-cased Class I appliance. What is the correct sequence?',
    options: [
      'Continue to use it and report at the next formal inspection.',
      'Test it electrically only when it is convenient to do so.',
      'Tighten the plug terminals and keep the appliance in use.',
      'Withdraw it immediately, tag out, and test both equipment and supply.',
    ],
    correctAnswer: 3,
    explanation:
      'A user-reported tingle on a Class I item is a near-miss. Both equipment-side and supply-side investigation are warranted (PUWER Reg 6 trigger and EAWR Reg 4(2)). Asking the user to continue is itself an HSWA s.2 breach.',
  },
  {
    id: 8,
    question: 'What records support the user-check pillar in an HSG107 audit?',
    options: [
      'A daily user-check log completed against every item.',
      'The supporting system: training records, the fault-reporting route and tagging procedure.',
      'No records are needed for the user-check pillar.',
      'A signed weekly register of every appliance.',
    ],
    correctAnswer: 1,
    explanation:
      'HSG107 frames user-check evidence as the SYSTEM that enables and enforces it, not the per-event log. Trying to log every user check is impractical and reduces the user check from a continuous awareness activity to a transactional checkbox.',
  },
  {
    id: 9,
    question:
      'A formal visual finds the equipment fully compliant; a combined inspection-and-test the same day shows IR of 0.4 MΩ on a Class I item with a 2 kW heating element. What is the correct interpretation?',
    options: [
      'The visual passed, so the item is safe to keep in service.',
      'Average the two results and make a judgement call.',
      '0.4 MΩ is below the 1 MΩ Class I acceptance — a fail, so withdraw the item.',
      'The IR test is optional once the visual inspection has passed.',
    ],
    correctAnswer: 2,
    explanation:
      'For Class I equipment with a heating element below 3 kW the IET Code of Practice insulation-resistance acceptance is 1 MΩ (heaters of 3 kW and above relax to 0.3 MΩ). At 0.4 MΩ the 2 kW item fails; the visual cannot redeem an IR fault because insulation breakdown is not visible.',
  },
  {
    id: 10,
    question:
      'A duty-holder argues they do not need a formal user-check programme because their workforce is "experienced and sensible". What is the legal weakness?',
    options: [
      'No weakness — experienced, sensible staff are sufficient protection on their own.',
      'It is a complete defence under the legislation, so no system is required.',
      'Competence is automatically presumed for experienced staff under EAWR Reg 16.',
      'HSWA s.2(2)(c) requires information, instruction, training and supervision regardless.',
    ],
    correctAnswer: 3,
    explanation:
      'The "they know what to do" framing fails s.2(2)(c) and is a common HSE finding in incident investigations. A workforce that is in fact experienced and sensible needs a system to record the fact and evidence it. The system is the artefact; the experience is the input.',
  },
];

const PATTestingModule1Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'User checks vs formal inspection and testing | PAT Module 1.5 | Elec-Mate',
    description:
      'The three-tier hierarchy of HSG107: user checks every use, formal visual at periodic intervals, combined inspection-and-test at the longer cycle. The cadence economics of the regime, what each tier catches, and what records it produces.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 5"
            title="User checks vs formal inspection and testing"
            description="The three-tier hierarchy of HSG107. User checks every use; formal visual at periodic intervals; combined inspection-and-test at the longer cycle. Each tier catches different defects, runs at a different cadence, and produces different records."
            tone="yellow"
          />

          <TLDR
            points={[
              'HSG107 sets a three-tier hierarchy: user checks (every use, by the user), formal visual inspection (periodic, by competent person, no dismantling), combined inspection-and-test (less frequent, with instrument readings).',
              'User checks catch the bulk of high-prevalence visible defects — flex damage, plug damage, signs of overheating, signs of misuse — before equipment is energised. They run at the highest cadence, by the only person who is there every time.',
              'Formal visual is the rigorous, structured external inspection. IET CoP §14 lists what is checked; the rule is no dismantling. Catches what users miss in the rush of daily use.',
              'Combined inspection-and-test adds electrical instrument testing — PE-continuity, IR / leakage, polarity, functional — with numerical readings against IET CoP Chapter 14 acceptance criteria. Catches the invisible defects.',
              'Each tier produces different records. User-check evidence = the SYSTEM (training, reporting routes, withdrawal procedure). Formal visual = checklist results. Combined inspection-and-test = numerical readings + pass/fail.',
              'All three tiers are required. Skipping any tier creates a class of defect the regime no longer catches.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe the three-tier hierarchy of HSG107: user check, formal visual, combined inspection-and-test, with cadence and competence requirements for each',
              'List what a user check covers and what it explicitly does NOT cover (no dismantling, no instrument)',
              'Apply the IET CoP §14 formal-visual checklist to any equipment item (flex, plug, casing, controls, environment, markings)',
              'Explain how the combined inspection-and-test extends the formal visual with PE-continuity, IR, polarity, and functional readings',
              'Identify the records each tier produces — system records for user checks, structured findings for formal visual, numerical readings for combined inspection-and-test',
              'Defend a programme against the "we do PAT, we don\'t need user checks" framing by reference to HSWA s.2(2)(c), HSG107 §27-30, and the cadence economics',
              'Recognise the defects each tier catches that the others cannot — and the danger of skipping any tier',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The three-tier hierarchy</ContentEyebrow>

          <ConceptBlock
            title="Why three tiers — the cadence economics"
            plainEnglish="No single inspection activity, however thorough, runs at the cadence needed to catch defects on equipment in daily use. The three-tier hierarchy is an economic answer: cheap, fast, frequent at the front (user checks) and rare, deep, expensive at the back (combined inspection-and-test). Each tier is calibrated to the defects it can catch."
            onSite="When designing a PAT programme, think of the three tiers as filters in series. The user catches the obvious. The formal visual catches what the user missed. The combined test catches what the eye cannot see. A defect missed by all three tiers is rare; a defect missed by any one tier is common."
          >
            <p>The cadence economics:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Tier</th>
                    <th className="text-left text-white/80 py-2">Cadence</th>
                    <th className="text-left text-white/80 py-2">Performed by</th>
                    <th className="text-left text-white/80 py-2">Cost per event</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>User check</strong>
                    </td>
                    <td>Every use (≥ daily for daily-use items)</td>
                    <td>The user</td>
                    <td>Negligible</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>Formal visual</strong>
                    </td>
                    <td>Periodic (months to years per Table 7.1)</td>
                    <td>Trained competent person</td>
                    <td>Minutes per item</td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <strong>Combined inspection-and-test</strong>
                    </td>
                    <td>Periodic, longer than formal visual</td>
                    <td>Competent person with instrument</td>
                    <td>Several minutes per item with paperwork</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The economics work because the cheapest, most frequent activity catches the
              highest-prevalence defects. If user checks did not exist, the formal-visual cycle
              would have to be daily for every item — an impossible expense. If the combined
              inspection-and-test did not exist, hidden defects in CPC continuity and insulation
              would be invisible.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE HSG107 (4th Edition) · paragraph 27"
            clause={
              <>
                A simple user check is the first line of defence in maintaining the safety of
                portable electrical equipment. It is intended to identify obvious damage or
                deterioration, and is carried out by the user before each use of the equipment.
              </>
            }
            meaning="HSG107 names the user check the 'first line of defence' — a deliberate framing. It is the cheapest, fastest, most frequent layer, and the only one that runs every time. Skipping it does not just leave a gap; it cedes the cadence economics that make the rest of the regime affordable."
          />

          <ConceptBlock
            title="Tier 1 — the user check"
            plainEnglish="The user looks at the equipment before plugging it in. Visible flex damage, cracked or burnt plug, signs of overheating, equipment that has tripped a protective device, equipment used in a way that does not match its intended use — all are reasons to take it out of service and report. The check takes seconds; the cumulative protection is enormous."
          >
            <p>What the user is trained to look for (IET CoP §10, HSG107 §27-30):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Damage to the cable sheath — cuts, abrasion, exposed inner cores, kinks at the
                strain relief.
              </li>
              <li>Cracked, broken, burned or discoloured plug body.</li>
              <li>
                Loose plug pins; pins that show heat marks; the plug is hot to the touch in use.
              </li>
              <li>
                Signs of overheating on the equipment casing or on the cable near the equipment
                entry.
              </li>
              <li>Distinctive smell of burnt insulation or hot plastic.</li>
              <li>Cord-grip not engaged — visible inner cores at the cord entry of the plug.</li>
              <li>Equipment that has tripped a circuit and been reset without diagnosis.</li>
              <li>
                Equipment used outside its intended environment — outdoor equipment used indoors
                against the rating, equipment used in wet conditions when not rated for it.
              </li>
              <li>
                Visible or audible signs of misuse — broken switch, missing screws, cracked casing.
              </li>
            </ul>
            <p>
              The user check is not a formal procedure with a clipboard. It is the
              trained-into-habit of looking at the equipment before plugging it in, and the
              trained-into-habit of taking it out of service if something is wrong. The system
              around it — training, reporting, tagging, withdrawal — is what the duty-holder
              records.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Tier 2 — the formal visual inspection"
            plainEnglish="A trained competent person systematically inspects the equipment. Externally only — no covers off — but rigorous and structured. Catches the defects the user did not notice in the rush of use. IET CoP §14 lists what is checked; the result is a recorded pass / fail / conditional with any defects logged."
          >
            <p>The IET CoP §14 formal-visual checklist:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Flex / cable along its full length</strong> — including the entry to the
                equipment and to the plug. Run the cable through your hand if necessary to feel for
                hidden damage.
              </li>
              <li>
                <strong>Plug</strong> — pins (corrosion, wear, heat damage); fuse rating against
                equipment rating; secure cord grip with no exposed cores at the cord entry; secure
                terminations under the cover.
              </li>
              <li>
                <strong>In-line connectors, switches, FCUs, transformers</strong> — any device in
                the supply path between the plug and the equipment. Each is its own check point.
              </li>
              <li>
                <strong>Equipment casing</strong> — including back, underside, and any access panel.
                Cracks, melted areas, evidence of impact damage.
              </li>
              <li>
                <strong>Switches, indicators, controls</strong> — operate as intended, securely
                fixed, no broken parts.
              </li>
              <li>
                <strong>Environmental signs of misuse</strong> — dust ingress on a non-IP-rated
                unit, water ingress on a non-IP-rated unit, equipment sited where its rating is
                exceeded.
              </li>
              <li>
                <strong>Equipment markings</strong> — class symbol present and legible, voltage,
                current, IP rating, manufacturer. Missing markings are a defect; type-tested status
                cannot be verified without them.
              </li>
            </ol>
            <p>
              The IET CoP §14 constraint that the inspection does not require dismantling is the
              boundary that distinguishes formal visual from combined inspection-and-test or
              maintenance. The formal visual is rigorous external; cracking covers takes you to a
              different competence threshold and a different record requirement.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice (5th Ed, 2020) · §14"
            clause={
              <>
                A formal visual inspection should be carried out at intervals which are appropriate
                to the type of equipment and the environment in which it is used. The formal visual
                inspection should be carried out by a person who is competent to do so. The
                inspection should not require the dismantling of the equipment.
              </>
            }
            meaning="The formal visual is appropriate-interval, competent-person, no-dismantling. The three constraints together define the activity. Anything outside them — daily check, untrained inspector, dismantling — is a different tier of activity with a different competence requirement and a different record."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <ConceptBlock
            title="Tier 3 — combined inspection and test"
            plainEnglish="The competent person performs the formal visual AND connects an instrument to verify protective-conductor continuity, insulation resistance (or substitute leakage), polarity (where relevant), and a functional / load test. Numerical readings are recorded against IET CoP Chapter 14 acceptance criteria. This is what most clients picture when they hear PAT."
          >
            <p>The instrument-test sequence (full detail in Module 3 / 4):</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>PE continuity (Class I only).</strong> Measured between the earth pin of the
                plug and any accessible conductive part. Acceptance values per IET CoP §15.4 / Table
                15.1 — depend on flex length and conductor csa. Typically &le; 0.1 Ω + 1 mΩ/m of
                flex.
              </li>
              <li>
                <strong>Insulation resistance.</strong> 500 V dc test between live conductors (line
                + neutral together) and earth (Class I) or any accessible conductive part (Class
                II). Acceptance &ge; 1 MΩ for most equipment; tighter for high-power heating
                elements per IET CoP §15.5.
              </li>
              <li>
                <strong>Touch current / substitute leakage / PE leakage.</strong> Alternative or
                supplementary tests depending on equipment type and instrument capability.
              </li>
              <li>
                <strong>Polarity.</strong> For IEC leads and any lead with its own connector body,
                verify that line is on the line pin and neutral on the neutral pin.
              </li>
              <li>
                <strong>Functional / load test.</strong> Verify the equipment energises, operates as
                intended, and does not draw anomalous current.
              </li>
            </ol>
            <p>
              The combined inspection-and-test catches defects that are invisible: degraded CPCs
              that pass a buzzer but fail under load, insulation that has absorbed moisture and
              fails at 500 V, polarity-reversed leads that defeat fuse protection on equipment whose
              fuse is in the line conductor. None of these is detectable by the user or by the
              formal visual.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What records each tier produces</ContentEyebrow>

          <ConceptBlock
            title="Tier 1 records — the system, not the event"
            plainEnglish="User-check evidence is the system that enables and supports user checks: training delivered, reporting routes available, defective-item tagging procedure, withdrawal log. The individual user-check moment is not transactionally recorded — that would convert continuous awareness into a checkbox and reduce its effectiveness."
          >
            <p>The user-check system records:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Induction content</strong> covering equipment users are expected to check,
                what to check for, and what to do if a defect is found.
              </li>
              <li>
                <strong>Toolbox-talk attendance</strong> with topic, date, signed attendance.
              </li>
              <li>
                <strong>Refresher training cadence</strong> (e.g. annual, after incident, on
                equipment changes) — recorded.
              </li>
              <li>
                <strong>Defect-reporting route</strong> — sticker with phone number, internal email
                address, in-app fault report, supervisor contact. Whichever the duty-holder chooses,
                it is documented and accessible.
              </li>
              <li>
                <strong>Defect / fault report log</strong> — what was reported, by whom, when, what
                was done about it, when the equipment came back into service (if at all).
              </li>
              <li>
                <strong>Out-of-service tagging procedure</strong> — high-visibility tags, lockout
                where appropriate, equipment movement to a "do not use" zone.
              </li>
            </ul>
            <p>
              Together these records are the evidence the user-check pillar exists and runs. After
              an incident, the question "did you have a system that supports user checks?" is
              answered by these records — not by individual transactional logs.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Tier 2 records — formal visual outcomes"
            plainEnglish="A formal visual produces a structured record per item: equipment ID, date, inspector, the items in the §14 checklist that were verified, any defects found, action taken, and the result (pass / fail / conditional). This is per-item per-cycle data."
          >
            <p>The formal visual record:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Equipment ID and description (linked to register).</li>
              <li>Date of inspection.</li>
              <li>Inspector identity (name + competence reference).</li>
              <li>Each §14 checklist item — pass / not applicable / fail with detail.</li>
              <li>Any defects found, photographed where useful, described.</li>
              <li>Action taken — pass into service, withdraw, repair, replace.</li>
              <li>Re-test result if action was repair.</li>
              <li>Overall result of the cycle for the item.</li>
            </ul>
            <p>
              The formal visual record satisfies PUWER Reg 6(3) for the visual side of the
              inspection. Trended over time, it is the data that drives frequency review under IET
              CoP §7.4.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Tier 3 records — numerical readings"
            plainEnglish="The combined inspection-and-test record is the formal visual record + the instrument readings. PE-continuity in ohms, IR in megohms, leakage in milliamps, RCD trip times in milliseconds (for portable RCDs). Each reading recorded against the acceptance value from IET CoP Chapter 14."
          >
            <p>The combined inspection-and-test record:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>All formal visual items as above.</li>
              <li>Instrument used + calibration reference / date.</li>
              <li>PE-continuity reading (Ω) vs acceptance value.</li>
              <li>IR reading (MΩ) vs acceptance value.</li>
              <li>Leakage / touch current reading where applicable, vs acceptance.</li>
              <li>Polarity result for IEC leads / cordsets.</li>
              <li>Functional test result.</li>
              <li>Trip-time result for portable RCDs.</li>
              <li>Pass / fail / conditional + any conditions noted.</li>
            </ul>
            <p>
              The numerical readings ARE the EAWR Reg 4(2) evidence. A combined-test record without
              numerical readings is not a record — it is a claim. A modern multifunction PAT
              instrument prints / exports the readings directly, which is why instruments with
              stored data are the practical default.
            </p>
          </ConceptBlock>

          <Scenario
            title="The PAT-only, no-user-checks facility"
            situation="A facility runs an annual PAT testing programme covering all portable equipment. Defects are found at each annual visit. There is no user-check programme — no training, no reporting route, no out-of-service procedure. Between cycles, equipment is in continuous use without any defect-detection mechanism. After a shock incident from a flex damaged 4 months into a cycle, the duty-holder argues their PAT regime was complete."
            whatToDo="The PAT regime as described is not complete. HSG107 §27-30 makes user checks the first line of defence. HSWA s.2(2)(c) requires information / instruction / training. PUWER Reg 8 requires information about safety. Without a user-check pillar, defects between annual cycles have no detection mechanism. Build the user-check pillar: induction content, toolbox talks, defect-reporting route, withdrawal procedure. Backdate where possible (training records, system implementation date). The annual PAT remains; the user-check pillar fills the cadence gap."
            whyItMatters="HSE incident investigations frequently identify 'PAT was up to date but no user-check system' as a contributory failure. The annual PAT looks like compliance; the missing user-check pillar is the structural gap that lets defects develop between cycles undetected. Both pillars are needed."
          />

          <CommonMistake
            title="Treating user checks as optional once formal PAT is running"
            whatHappens="A duty-holder commissions a thorough annual PAT regime and considers user training redundant. Six months into the cycle, a kettle\'s flex is damaged when it falls off a shelf. No formal mechanism exists for the user to take it out of service or report. They use it. A trip to the line conductor at the damaged section causes a shock injury. The PAT records show the kettle was tested and passed at the start of the cycle."
            doInstead="The annual PAT was correct; the absence of a user-check pillar was the structural defect. Restoration: implement the user-check programme — written guidance on what users are expected to check, communication route to report defects, tagging and withdrawal procedure. The user-check pillar is not optional, even (especially) where formal PAT is rigorous."
          />

          <CommonMistake
            title="Using 'experienced staff' as a substitute for training"
            whatHappens="The duty-holder argues training is not needed because the staff are experienced. Instead of inducting new starters or refreshing existing staff on what to check, no formal user-check guidance exists. After an incident involving a long-serving employee using equipment with visible flex damage, the HSE finds (a) no training records, (b) no defect-reporting procedure, (c) no documented user-check expectation. The 'experienced staff' argument fails HSWA s.2(2)(c) and the prosecution proceeds."
            doInstead="HSWA s.2(2)(c) requires INFORMATION, INSTRUCTION, TRAINING and SUPERVISION — not assumption of competence. Document an induction. Document refresher cadence. Document the defect-reporting route. Document the out-of-service procedure. The system is the artefact; experience of the staff is an input that strengthens it, not replaces it."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What each tier catches that the others cannot</ContentEyebrow>

          <ConceptBlock
            title="The defect-detection map"
            plainEnglish="Each tier catches defects the others cannot — that is the design of the regime. Knowing which tier catches what is the basis for understanding why all three are needed and why skipping any one creates a class of unfindable defects."
          >
            <p>Defect detection across tiers:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Defect</th>
                    <th className="text-center text-white/80 py-2">User check</th>
                    <th className="text-center text-white/80 py-2">Formal visual</th>
                    <th className="text-center text-white/80 py-2">Combined I&amp;T</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Cut / abraded flex (visible)</td>
                    <td className="text-center text-emerald-300">Yes</td>
                    <td className="text-center text-emerald-300">Yes</td>
                    <td className="text-center text-emerald-300">Yes</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Cracked plug body</td>
                    <td className="text-center text-emerald-300">Yes</td>
                    <td className="text-center text-emerald-300">Yes</td>
                    <td className="text-center text-emerald-300">Yes</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Wrong fuse rating</td>
                    <td className="text-center text-amber-300">Maybe</td>
                    <td className="text-center text-emerald-300">Yes</td>
                    <td className="text-center text-emerald-300">Yes</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Loose CPC at plug terminal</td>
                    <td className="text-center text-red-300">No</td>
                    <td className="text-center text-amber-300">Sometimes</td>
                    <td className="text-center text-emerald-300">Yes (PE-continuity reading)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">IR breakdown (moisture absorption)</td>
                    <td className="text-center text-red-300">No</td>
                    <td className="text-center text-red-300">No</td>
                    <td className="text-center text-emerald-300">Yes (IR test)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Polarity-reversed IEC lead</td>
                    <td className="text-center text-red-300">No</td>
                    <td className="text-center text-red-300">No</td>
                    <td className="text-center text-emerald-300">Yes (polarity test)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Equipment in environment outside its rating</td>
                    <td className="text-center text-amber-300">Maybe</td>
                    <td className="text-center text-emerald-300">Yes</td>
                    <td className="text-center text-emerald-300">Yes</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Burned plug pin (overheating)</td>
                    <td className="text-center text-emerald-300">Yes</td>
                    <td className="text-center text-emerald-300">Yes</td>
                    <td className="text-center text-emerald-300">Yes</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Equipment recently dropped</td>
                    <td className="text-center text-emerald-300">Yes (if user knows)</td>
                    <td className="text-center text-amber-300">Maybe (visible damage)</td>
                    <td className="text-center text-amber-300">Maybe (functional anomaly)</td>
                  </tr>
                  <tr>
                    <td className="py-2">Failed portable RCD trip mechanism</td>
                    <td className="text-center text-red-300">No</td>
                    <td className="text-center text-red-300">No</td>
                    <td className="text-center text-emerald-300">Yes (RCD trip-time test)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Two patterns emerge. Visible defects are caught at multiple tiers — redundancy is
              good. Invisible defects (CPC integrity, IR breakdown, polarity, RCD function) are
              caught only by the combined inspection-and-test — there is no redundancy. The user
              check and formal visual are the cadence layer; the combined inspection-and-test is the
              depth layer.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The defect found — what happens next</ContentEyebrow>

          <ConceptBlock
            title="The withdrawal-and-action workflow"
            plainEnglish="A defect found at any tier triggers the same workflow: withdraw immediately, tag, log, decide repair / replace / dispose, action it, re-test where repair is the chosen path, document. The decision tree is the same regardless of which tier found the defect — though the urgency varies with severity."
          >
            <p>The standard workflow:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Withdraw immediately.</strong> Equipment is unplugged, isolated, and
                physically removed from service.
              </li>
              <li>
                <strong>Tag visibly.</strong> "Do not use — defect" tag, dated, with reporter ID.
                Tagging prevents another user picking it up.
              </li>
              <li>
                <strong>Log the defect.</strong> Equipment ID, date, defect description, who found
                it (user / inspector), tier (user check / formal visual / combined I&amp;T).
              </li>
              <li>
                <strong>Triage.</strong> Severity assessment. Some defects are immediate fail
                (broken plug, cut flex). Some allow controlled use under supervision (rare; case by
                case).
              </li>
              <li>
                <strong>Decide.</strong> Repair (and re-test); replace; dispose / scrap (with
                evidence of disposal). The decision is recorded.
              </li>
              <li>
                <strong>Action.</strong> The chosen path is followed. Repair-then-re-test: the
                re-test is a full combined inspection-and-test of the affected components, with
                numerical readings. Replacement: new item enters the register with formal visual at
                entry to service.
              </li>
              <li>
                <strong>Document.</strong> All of the above as part of the equipment\'s test
                history. The defect — repair — re-test sequence is one of the most important
                evidence streams in any subsequent investigation.
              </li>
            </ol>
            <p>
              The workflow is the same regardless of which tier found the defect. The user-check
              tier is connected to the formal-visual / combined-test tier by the defect-reporting
              system; that connection is what makes the regime function.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Three tiers in series: user check (every use), formal visual (periodic), combined inspection-and-test (less frequent, with instrument readings). All three are required.',
              'User checks are the first line of defence (HSG107 §27). They run at the only cadence that catches defects between formal cycles. Skipping the user-check pillar is a structural gap.',
              'Formal visual = rigorous external inspection by a competent person, no dismantling, against the IET CoP §14 checklist. Catches what users miss in daily use.',
              'Combined inspection-and-test adds PE-continuity, IR, polarity, functional / RCD readings — numerical evidence against IET CoP Chapter 14 acceptance values. Catches the invisible defects.',
              'Records differ by tier. User-check evidence = the SYSTEM (training, reporting, withdrawal). Formal visual = structured findings. Combined I&T = numerical readings.',
              'Each tier catches defects the others cannot. Visible defects are redundantly caught (good). Invisible defects (CPC, IR, polarity, RCD function) are caught only by the combined test (no redundancy).',
              '"Experienced staff" is not a substitute for HSWA s.2(2)(c) information / instruction / training. The system is the artefact; experience is an input.',
              'Defect found = withdraw, tag, log, decide, action, re-test, document. Same workflow at every tier. The connection between tiers (defect reporting) is what makes the regime function.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Are user checks legally required, or just guidance?',
                answer:
                  'They are the practical means of discharging several statutory duties. HSWA s.2(2)(c) requires information / instruction / training. HSWA s.7 requires the user to take reasonable care and co-operate. PUWER Reg 8 requires information about safety. EAWR Reg 4(2) requires maintenance to prevent danger — and HSG107 §27-30 names the user check as the first line of defence in discharging that duty. Skipping user checks fails multiple statutory duties simultaneously.',
              },
              {
                question: 'Should I record every user check?',
                answer:
                  'No. Recording the system that enables user checks is what the duty-holder evidences: training delivery, defect-reporting route, defect log, withdrawal procedure. Recording each user check per item per use would convert continuous awareness into a transactional checkbox and reduce its effectiveness. HSG107 frames user-check evidence as the system, not the per-event log.',
              },
              {
                question: 'What is the difference between a formal visual and a user check?',
                answer:
                  'Cadence and rigour. The user check happens before every use, by the user, looking at the obvious — flex, plug, casing, smell. The formal visual happens periodically, by a trained competent person, working through the IET CoP §14 structured checklist — flex along its full length, fuse rating, cord grip engagement, in-line connectors, casing, controls, environment, markings. Both are external (no dismantling); the formal visual is systematic where the user check is intuitive.',
              },
              {
                question: 'Does the combined inspection-and-test replace the formal visual?',
                answer:
                  'No, it includes it. The combined inspection-and-test is the formal visual + electrical instrument tests + numerical readings. The visual side of the combined test is the same checklist as a stand-alone formal visual. The reason both exist as separate tiers is cadence: the formal visual happens more frequently than the combined test, because it is faster and cheaper.',
              },
              {
                question: 'Who is competent to perform a formal visual inspection?',
                answer:
                  'Per EAWR Reg 16 and IET CoP §13, a person with knowledge, training and experience to undertake the work safely. There is no fixed qualification; in practice, basic competence is achieved by trained internal staff (with documented induction and supervised practice) for low-risk environments, escalating to qualified inspectors (e.g. C&G 2377-22 plus relevant experience) for harsh / industrial environments.',
              },
              {
                question:
                  'My contractor only does the combined inspection-and-test — do I need to set up the user-check programme separately?',
                answer:
                  'Yes. The contractor performs the formal visual + combined test at the cycle. The user-check programme is a duty-holder responsibility — induction content, toolbox talks, defect-reporting route, withdrawal procedure. The contractor cannot run the user-check pillar; it depends on the daily-life of your staff with their equipment.',
              },
              {
                question: 'A user reports a defect — what is the right way to handle it?',
                answer:
                  'Withdraw immediately, tag visibly, log the defect, decide repair / replace / dispose, action it, re-test where repair, document. The defect-and-action trail is one of the most important evidence streams. HSG107 §22-25 names this as a key part of the defendable record.',
              },
              {
                question: 'What if a user is using equipment with a visible defect?',
                answer:
                  'The duty-holder asks (a) why was the user not aware of the user-check expectation (training failure under HSWA s.2(2)(c))? (b) why was there no clear out-of-service tagging available to them? (c) is the defect-reporting route inaccessible? Address the systemic cause. Where the user knew and continued anyway, address as HSWA s.7 — typically a competence / disciplinary matter, with appropriate documentation. Both routes are part of programme integrity.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="User checks vs formal inspection — Module 1.5" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 2 — Appliance classes
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

export default PATTestingModule1Section5;
