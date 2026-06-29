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
    id: 'mod1-s4-eawr-14-three-limb',
    question:
      'A client asks you to take a Method 1 R1+R2 reading "live, just to save time on isolation". You suspect this would breach EAWR Reg 14. Which limb of the three-limb test fails first?',
    options: [
      'Limb (a) — that it is unreasonable in all the circumstances for it to be dead',
      'Limb (b) — that it is reasonable to be at work on or near it while live',
      'Limb (c) — that suitable precautions are taken to prevent injury',
      'None — EAWR Reg 14 does not apply to a continuity test of any kind',
    ],
    correctIndex: 0,
    explanation:
      'EAWR Reg 14 needs all three limbs satisfied for live work to be permissible: (a) unreasonable for it to be dead, (b) reasonable to work near live, (c) suitable precautions. Method 1 continuity is a dead test by its nature; it CAN be done dead, so working live can never pass limb (a) — it fails first and immediately. The legitimate live tests in BS 7671 are tightly defined (Ze, live polarity at origin, Zs, RCD) precisely because each one needs the supply present to drive the measurement.',
  },
  {
    id: 'mod1-s4-prove-test-prove',
    question:
      'You isolate a circuit, place your voltage indicator on the conductors at the point of work, and read no voltage. You proceed to open the JB. Is this a defensible safe-isolation procedure?',
    options: [
      'Yes — the voltage indicator confirmed the conductors were dead at the point of work',
      'Yes — provided the circuit MCB was switched off before the JB was opened',
      'No — the "prove – test – prove" pattern is missing both of its proving steps',
      'No — you should also have tested line-to-line at this single-phase point of work',
    ],
    correctIndex: 2,
    explanation:
      'The six-step safe isolation requires: prove indicator on a known live source → test for absence of voltage at the point of work → re-prove indicator on the same known live source. Without proving BEFORE testing, a faulty indicator that beeps on its self-test but cannot detect 230 V gives the same "dead" reading; without re-proving afterwards you cannot tell if the indicator died mid-test. Faulty / damaged indicators are the failure mode the proving steps catch — and the failure mode that has historically killed people who skipped them. (Line-to-line is not relevant on a single-phase circuit.)',
  },
  {
    id: 'mod1-s4-all-sources',
    question:
      'You open the main switch on a domestic consumer unit. The property has a battery storage system with an inverter feeding back into the same CU. What does Reg 537 / 462 plus the BS 7671 definition of isolation require?',
    options: [
      'Nothing further — the consumer-unit main switch covers all sources in the installation',
      'Disconnect the inverter only if its rating exceeds 3.68 kW, below which back-feed is negligible',
      'Trip every downstream MCB at the consumer unit, which is enough to make the busbar dead',
      'Open the main switch AND isolate the battery / inverter at its own DC and AC isolators, then prove dead',
    ],
    correctIndex: 3,
    explanation:
      'The CU main switch isolates the supplier (DNO) side. Anything on the load side that can produce a voltage — battery storage, PV, V2H EV charger, generator, UPS — is a separate source that can back-feed the bus when the main switch is open. The BS 7671 isolation duty requires all sources to be disconnected, and dead-state proven at the actual conductor under work, not at the consumer unit.',
  },
  {
    id: 'mod1-s4-supervisor-duty',
    question:
      'You are supervising a second-year apprentice during an EICR. You step out of the room briefly to take a phone call. The apprentice is mid-way through a Zs test at a socket. What does EAWR Reg 16 require?',
    options: [
      'Nothing further — the apprentice has already been told the live-test procedure',
      'Supervision has lapsed — the apprentice must put the tools down until you return',
      'It is acceptable, provided the apprentice has switched to a dead test before you leave',
      'Nothing — EAWR Reg 16 places no supervision duty on you for a registered apprentice',
    ],
    correctIndex: 1,
    explanation:
      'EAWR Reg 16 requires competence OR supervision, and holds the supervisor accountable for the supervised person\'s work. The apprentice is not yet competent for the live Zs test, so supervision must be present — within sight and intervention range, hands able to take over before harm. Phone calls, tea breaks and room exits during live work by an instructed person are gaps in supervision and Reg 16 breaches. The fix is muscle memory: tools down, step out together, resume together.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 641.4 places a single overarching safety duty on the person carrying out inspection and testing. What is it?',
    options: [
      'Personal protective equipment shall be worn throughout the inspection and testing',
      'A second competent person shall always be present during the inspection and testing',
      'The supply shall be isolated for the entire duration of the inspection and testing',
      'Precautions shall be taken to avoid danger to persons and livestock and damage to property',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 641.4 is the catch-all duty for safety during inspection and testing. The wording is deliberately broad: precautions to avoid danger to persons, livestock, property and equipment. Everything that follows in this section — safe isolation, supervision, PPE, RA — discharges that duty.',
  },
  {
    id: 2,
    question: 'Reg 641.6 specifies who may carry out the verification. What does it require?',
    options: [
      'Verification shall be made by one or more skilled persons competent in such work',
      'Verification shall be carried out by the designer of the installation',
      'Verification may be carried out by an instructed person working alone',
      'Verification shall be carried out by a registered electrician of a competent-person scheme',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 641.6: "The verification shall be made by one or more skilled persons competent in such work." Skilled person under BS 7671 Part 2 means electrically skilled — adequate education, training and practical skill to perceive risks and avoid hazards. An instructed person works under supervision; the verification cannot rest on them alone.',
  },
  {
    id: 3,
    question:
      'GN3 Ch 4 references EAWR Regulation 16. What duty does Reg 16 of the Electricity at Work Regulations 1989 impose on persons carrying out live diagnostic work in proximity to live conductors?',
    options: [
      'Persons carrying out the work shall hold a current first-aid certificate',
      'Persons shall complete a formal permit-to-work before any live diagnostic work',
      'Persons shall be suitably competent with regard to the type and nature of the work being performed',
      'Persons shall hold a current 18th Edition wiring regulations qualification',
    ],
    correctAnswer: 2,
    explanation:
      'EAWR Reg 16 is the legal hook for competence: "no person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate." GN3 Ch 4 Reg 4.9 specifically anchors live diagnostic work in this duty.',
  },
  {
    id: 4,
    question:
      'You are about to start a dead-test session at a domestic consumer unit. The tenant tells you they have an inverter-supplied UPS feeding a home office. What safe-isolation step changes?',
    options: [
      'Nothing — isolating the consumer unit covers the whole installation including the UPS',
      'You can ignore it, since UPS systems automatically disconnect when the mains is isolated',
      'You should test the circuit live to avoid the inconvenience of disconnecting the UPS at all',
      'You must also isolate the UPS / inverter so it cannot back-feed, then prove dead at each point',
    ],
    correctAnswer: 3,
    explanation:
      'A UPS / inverter is an additional source. Opening the consumer unit main switch isolates the supplier side, not the load-side source. The UPS will continue to energise the very circuits you think are dead. Per Reg 537 / 462 (isolation of all sources) and the BS 7671 definition of isolation, you must disconnect every source feeding the section under test, then prove dead at the actual test point — not at the consumer unit.',
  },
  {
    id: 5,
    question:
      'Which of the following tests on an installation is BS 7671 designed to allow you to perform live, rather than requiring isolation?',
    options: [
      'Continuity of protective conductors (R1+R2)',
      'Earth-fault loop impedance (Ze and Zs) and RCD operating-time',
      'Insulation resistance between live conductors and earth',
      'Dead-state polarity verification at every accessory',
    ],
    correctAnswer: 1,
    explanation:
      'Continuity, IR and dead-state polarity are dead tests by definition — the circuit must be isolated. Ze, Zs and RCD trip-time tests require the supply to be present so that the meter can drive a fault current and time the disconnection. They are the small set of legitimate live tests in the Reg 643.2 sequence — not a licence for casual live work.',
  },
  {
    id: 6,
    question: 'A safe-isolation procedure has six steps. Which is the correct order?',
    options: [
      'Lock-off → identify circuit → switch off → prove voltage indicator → test for absence of voltage → re-prove voltage indicator',
      'Switch off → test for absence of voltage → lock-off → prove voltage indicator → identify circuit → re-prove indicator',
      'Identify circuit → switch off → lock-off → prove indicator on a known live source → test for absence of voltage → re-prove indicator on the same source',
      'Identify circuit → lock-off → switch off → test for absence of voltage → prove indicator → leave warning notice',
    ],
    correctAnswer: 2,
    explanation:
      'The standard six-step safe isolation: identify the correct circuit; switch off at the appropriate isolator; lock-off and post a warning notice; prove the voltage indicator on a known live source; test for absence of voltage at the point of work (line-line, line-neutral, line-earth, neutral-earth); re-prove the voltage indicator on the same known live source. The "prove – test – prove" pattern is what catches a faulty indicator that beeps on its own internal test but cannot detect 230 V.',
  },
  {
    id: 7,
    question:
      'Why is the "neutral-to-earth" voltage test part of safe isolation, and not just line-to-everything?',
    options: [
      'It is not part of safe isolation — only line-to-everything tests are actually required',
      'It is included as a way of checking that the circuit RCD operates correctly under test',
      'It is included to confirm the voltage indicator battery is healthy before the line tests',
      'A damaged or borrowed neutral can leave the conductor live even after the line is isolated',
    ],
    correctAnswer: 3,
    explanation:
      'Neutrals are not always at earth potential. A broken neutral upstream, a borrowed neutral from an adjacent circuit, or a wiring error can leave the conductor at line potential after the line is isolated — and the N-E test is the step that catches it. Reg 643.1.x and the BS 7671 definition of isolation cover the duty: prove dead on every conductor, not just the line.',
  },
  {
    id: 8,
    question:
      'You are about to perform an Ze test at the origin of a TN-S supply. What is the minimum acceptable PPE / arrangement?',
    options: [
      'Insulating mat, arc-rated layer, eye protection, insulated gloves, with a second person aware',
      'Standard safety boots and a high-visibility vest, with no insulating mat or arc-rated layer',
      'GS38-compliant test leads alone, with no further PPE since the leads protect the operator',
      'A full arc-flash suit to IEC arc-protection level 4, regardless of the prospective fault current',
    ],
    correctAnswer: 0,
    explanation:
      'Origin Ze is a CAT IV live test. The risk is a network-side transient or a probe-tip slip causing a phase-to-earth arc with kiloamps of fault current. Standing on an insulating platform, wearing arc-rated PPE and eye protection, insulated gloves rated to the working voltage, no conductive jewellery, with a competent second person aware and able to call for help, is the standard expected by HSE guidance and most insurers. A full arc-flash suit is overkill for domestic; the bare minimum on a 25 kA PSCC supply is mat, gloves, arc-rated layer and eye protection. Boots and a hi-vis vest alone, or test leads with no other PPE, are nowhere near adequate.',
  },
  {
    id: 9,
    question:
      'A lone worker is partway through an EICR in a tenanted flat when the tenant becomes verbally aggressive about the time being taken. The worker still has the live tests (Ze, Zs, RCD) outstanding. What is the correct call?',
    options: [
      'Continue regardless, because the certificate needs the live tests completed on the same day',
      'Stop the live tests, document the situation, leave and reschedule with a second person present',
      'Ask the tenant to leave their own flat so the live tests can be finished in peace and quiet',
      'Continue, but record the live test values inferred from calculation rather than measured',
    ],
    correctAnswer: 1,
    explanation:
      'Live testing requires concentration. A hostile occupant compromises the safety boundary — distraction, blocked egress, the possibility of physical confrontation while the operator has live probes in hand. Reg 641.4 (precautions) and EAWR Reg 16 make safety the gating decision, not throughput. The defensible call is: stop, finish any remaining dead testing safely, document, withdraw. The certificate can be marked outstanding and re-attended; a fatality cannot be undone. Lone-working policies usually require a check-in / check-out and an escalation route exactly for this reason.',
  },
  {
    id: 10,
    question:
      'You are testing a circuit at the consumer unit. You have isolated the circuit MCB but not the main switch. While testing, an apprentice you are training touches the live busbar in the consumer unit and is shocked. Forensically, where did the safe-isolation procedure fail?',
    options: [
      'The apprentice should have known better — there was no procedural failure on the supervisor side',
      'The circuit MCB had failed and should have been replaced before any work began inside the unit',
      'The voltage indicator was at fault and gave a misleading dead reading on the live busbar',
      'Several: the supply was not isolated, the apprentice was unsupervised near live parts, the RA was insufficient',
    ],
    correctAnswer: 3,
    explanation:
      'Multiple failures stack: (1) testing inside an enclosure with live busbars exposed, when the testing did not require live busbars, is a Reg 641.4 RA failure — the supply could and should have been isolated; (2) an instructed person under EAWR Reg 16 must be supervised in proximity to danger, "supervised" meaning within sight and intervention range, not just "told to be careful"; (3) the supervisor competent person carries the duty of care for the trainee. This is the kind of case HSE and coroners look at routinely.',
  },
];

const InspectionTestingModule1Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Safety during testing | I&T Module 1.4 | Elec-Mate',
    description:
      'Reg 641.4 + Reg 641.6 + EAWR Reg 16: safe isolation in the testing context, the small set of legitimate live tests, supervision and competence, lone-working considerations, PPE for test work, and the procedural discipline that keeps a test session defensible.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 4"
            title="Safety during testing"
            description="The duty under Reg 641.4 to take precautions during inspection and testing — and how that duty plays out in safe isolation, the narrow scope of legitimate live tests, supervision under EAWR Reg 16, lone-working and the PPE that keeps you alive when something slips."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 641.4 is the catch-all: precautions shall be taken to avoid danger to persons, livestock, property and installed equipment during inspection and testing. Every other safety rule discharges this duty.',
              'Reg 641.6: verification shall be made by one or more skilled persons competent in such work. EAWR Reg 16 is the legal backbone — competence, or supervision proportionate to the work.',
              'Most BS 7671 tests are dead tests. Continuity, insulation resistance and dead-state polarity require isolation. The legitimate live tests are Ze (origin), Zs (final-circuit) and RCD trip timing — and live polarity at the origin.',
              'Safe isolation is a six-step procedure (identify → switch off → lock-off → prove indicator → test absence of voltage → re-prove indicator). The "prove – test – prove" pattern catches a faulty voltage indicator before it kills you.',
              'All sources isolated, not just the supplier side. UPS, inverters, embedded generation (PV, battery) and parallel supplies must each be disconnected. Prove dead at the test point, not at the consumer unit.',
              'PPE for live testing scales with PSCC and CAT level: insulating mat, arc-rated layer, eye protection, insulated gloves rated to the working voltage, no conductive jewellery. Origin tests on commercial supplies push toward formal arc-flash assessment.',
              'Lone-working has procedural costs: check-in / check-out, escalation route, no live tests if conditions are compromised (hostile occupant, lighting, access). Reg 641.4 is the gating duty — if you cannot test safely, you do not test.',
              'GS38 (covered in Section 1.3) is the equipment side. This section is the procedural side. Both have to hold for a defensible test session.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the duties under Reg 641.4 (precautions during testing) and Reg 641.6 (skilled persons competent in such work) and apply them to a real test session',
              'Connect the BS 7671 verification duty to the EAWR 1989 (Reg 16 competence, Reg 4 maintenance, Reg 14 work on or near live conductors) — and know which legal regime catches what',
              'Execute the six-step safe-isolation procedure including the "prove – test – prove" check, and identify when additional sources (UPS, PV, generation) must be isolated separately',
              'Identify the small set of tests that are legitimately performed live, and the safety controls each one needs',
              'Specify PPE proportionate to the test point: domestic origin Ze versus commercial 100 kA PSCC versus a final-circuit Zs at a socket',
              'Apply lone-working judgement: when to proceed, when to stop, when to escalate — and how to document the decision so the certificate is defensible',
              'Supervise an instructed person (apprentice) safely in a test environment, including the EAWR Reg 16 supervision standard and where the supervisor duty of care begins and ends',
            ]}
          />

          <ContentEyebrow>The duty: Reg 641.4 and what it actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 641.4 — the precautions duty during inspection and testing"
            plainEnglish="Whenever inspection and testing is carried out, precautions shall be taken to avoid danger to persons and livestock, and to avoid damage to property and installed equipment. The wording is broad on purpose — every safety practice that follows is one way of discharging it."
            onSite="Read Reg 641.4 like a contract with HSE. The verb is 'shall' — mandatory. The scope is broad: persons, livestock, property and equipment. The time window is 'during inspection and testing' — from the moment you open the consumer unit cover to the moment the cover is back on and the supply is restored."
          >
            <p>
              Reg 641.4 sits at the head of Chapter 64 alongside Reg 641.1 (verification scope), Reg
              641.2 (information), Reg 641.3 (comparison with criteria) and Reg 641.6 (competence).
              It is the safety umbrella over the whole inspection-and-testing activity. Everything
              in Reg 643 — every test method, every acceptance criterion — is carried out under the
              precautions duty.
            </p>
            <p>
              The duty is also referenced in BS 7671 Part 2 definitions. &ldquo;Inspection&rdquo;
              and &ldquo;Testing&rdquo; are activities that involve direct interaction with
              electrical equipment, often live or partially live, often in places where the public
              or other workers are present. The precautions duty is the legal hinge that connects
              the technical requirements of the verification to the broader duty of care under the
              Health and Safety at Work etc. Act 1974 and the EAWR 1989.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 641.4"
            clause={
              <>
                Precautions shall be taken to avoid danger to persons and livestock, and to avoid
                damage to property and installed equipment, during inspection and testing.
              </>
            }
            meaning="Mandatory ('shall'), broad ('persons, livestock, property, equipment'), and explicit on the timing ('during inspection and testing'). Every safe-isolation, every PPE choice, every supervision decision, every lone-working risk assessment is the practical discharge of this single duty."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 641.6"
            clause={
              <>
                The verification shall be made by one or more skilled persons competent in such
                work.
              </>
            }
            meaning="The person doing the verification has to be skilled (electrically — possessing adequate education, training and practical skills) and competent for that specific work. An instructed person — supervised, but not yet skilled — cannot sign off the verification. They can do parts of it under supervision."
          />

          <SectionRule />

          <ContentEyebrow>The legal backbone — EAWR 1989 and the competence chain</ContentEyebrow>

          <ConceptBlock
            title="Where BS 7671 ends and the EAWR begins"
            plainEnglish="BS 7671 is a standard, given legal force by being referenced in the Building Regulations and recognised by the EAWR as the way to discharge certain duties. The EAWR 1989 is criminal law. Breach Reg 641.4 in BS 7671 and you have a defective certificate. Breach the EAWR and you face HSE prosecution. They overlap, but they are not the same thing."
            onSite="When you sign an EICR or initial verification certificate, you are simultaneously acting under BS 7671 (the technical standard) and discharging duties under the EAWR (the law). Most prosecutions after a fatal incident go to the EAWR — Reg 16 (competence), Reg 14 (work on or near live conductors), Reg 4(2) (systems shall be maintained), Reg 13 (precautions for work on equipment made dead)."
          >
            <p>The EAWR regulations most relevant to an inspection-and-testing session:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>EAWR Reg 4(1) and (2):</strong> systems shall be of such construction as to
                prevent danger and shall be maintained so as to prevent danger. Periodic inspection
                and testing is the duty-holder primary mechanism for evidencing this.
              </li>
              <li>
                <strong>EAWR Reg 13:</strong> precautions for work on equipment made dead. Adequate
                precautions shall be taken to prevent equipment which has been made dead in order to
                prevent danger from becoming electrically charged during any work activity if danger
                may thereby arise. This is the legal hook for safe isolation including lock-off.
              </li>
              <li>
                <strong>EAWR Reg 14:</strong> work on or near live conductors. No person shall be
                engaged in any work activity on or so near any live conductor that danger may arise
                unless: (a) it is unreasonable in all the circumstances for it to be dead; (b) it is
                reasonable in all the circumstances for him to be at work on or near it while it is
                live; and (c) suitable precautions are taken to prevent injury. The three-limb test
                for any live work, including legitimate live tests.
              </li>
              <li>
                <strong>EAWR Reg 16:</strong> persons to be competent to prevent danger and injury.
                No person shall be engaged in any work activity where technical knowledge or
                experience is necessary unless they have it, or are under appropriate supervision.
                The legal definition of &ldquo;skilled person&rdquo; in BS 7671 Part 2 is the
                practical discharge of this duty.
              </li>
            </ul>
            <p>
              GN3 explicitly cross-references EAWR Reg 16 in Ch 4 Reg 4.9 (live diagnostic work).
              The HSE publication HSR25 is the authoritative guidance on EAWR — it is
              cross-referenced from BS 7671 Part 2 person definitions and from GN3 record-keeping
              guidance.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="GN3 9th Ed:2022 (A4) · Chapter 4 · Reg 4.9"
            clause={
              <>
                Live work in close proximity to conductors may only be performed by persons who are
                suitably competent with regard to the type and nature of the work activity being
                performed, as required by Regulation 16 of the Electricity at Work Regulations 1989
                (EAWR). Fitness and competence for the specific live diagnostic task are mandatory.
              </>
            }
            meaning="Live work — including the legitimate live tests in the Reg 643 sequence — is competence-gated. Suitably competent for the specific task. A general 18th Edition qualification is the floor, not the ceiling. The competence has to match the task: a domestic Ze test, a 100 kA commercial supply test, and a thermographic survey on energised LV switchgear are different competence questions."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Safe isolation — the testing-context six steps</ContentEyebrow>

          <ConceptBlock
            title="Safe isolation in detail — the six-step procedure that has to hold every time"
            plainEnglish="Safe isolation is the practical discharge of Reg 641.4 plus EAWR Reg 13. It is the same procedure you learned at Level 3 — but applied here in the test-and-verify context, where a circuit you have just isolated for an IR test is the same circuit you may need to re-energise minutes later for a Zs and RCD."
            onSite="Six steps. Memorised in order. Done in the same order every time. The discipline is what stops a small lapse turning into a fatality."
          >
            <ol className="list-decimal pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Identify the circuit.</strong> Confirm with the circuit chart, with a
                circuit-checker if available, with the occupant where appropriate. The circuit you
                are about to isolate is the circuit you intend to be working on. A wrong-circuit
                isolation leaves you working on something that is still live.
              </li>
              <li>
                <strong>Switch off at the appropriate isolator.</strong> For a final circuit, the
                MCB / RCBO at the consumer unit. For the whole installation or work inside the
                consumer unit itself, the main switch. For DC sources (PV) — the dedicated DC
                isolator. Open all sources, not just one.
              </li>
              <li>
                <strong>Lock-off and post a warning notice.</strong> Reg 462.3 requires devices for
                isolation to be designed or installed so as to prevent unintentional or inadvertent
                closure. In a test session that means a padlock or lockout device on the isolator,
                with the key in your pocket, plus a &ldquo;DO NOT SWITCH ON&rdquo; notice visible. A
                handwritten note is not a lock-off.
              </li>
              <li>
                <strong>Prove the voltage indicator on a known live source.</strong> Use a
                proprietary voltage indicator (BS EN 61243-3 / GS38-compliant). Test it on a known
                live socket-outlet or a dedicated proving unit. Confirm L-N, L-E and N-E reads on
                the indicator. If the indicator does not light or display, do not proceed — replace
                or recheck.
              </li>
              <li>
                <strong>Test for absence of voltage at the point of work.</strong> Test L-N, L-E,
                N-E (and L-L on three-phase) at the actual conductor you will be touching. The point
                of work is not the consumer unit it is the socket / FCU / luminaire / JB you are
                about to open. Reg 643.1 / general isolation duty: prove dead on every conductor.
              </li>
              <li>
                <strong>Re-prove the voltage indicator on the same known live source.</strong> The
                step that catches a voltage indicator that died between step 4 and step 5. If the
                indicator now fails to light on the known live source, your &ldquo;dead&rdquo;
                reading at step 5 was meaningless — the indicator was already broken. Stop, replace,
                start again.
              </li>
            </ol>
            <p>
              The &ldquo;prove – test – prove&rdquo; pattern (steps 4, 5, 6) is the part most
              commonly skipped under time pressure. It is also the part that has saved most lives.
              Make it muscle memory.
            </p>
          </ConceptBlock>

          <Scenario
            title="Embedded generation and the all-sources duty"
            situation="You are about to test a tenanted flat for an EICR. The flat has a battery storage system installed last year, with an inverter feeding back into the main consumer unit. The main switch will isolate the supplier side, but the inverter is on a non-AFCI circuit and may continue to feed the bus."
            whatToDo="Open the main switch AND isolate the battery / inverter at its dedicated DC isolator and AC isolator. Check the manufacturer instructions for the time the inverter requires to fully de-energise (some hold capacitor charge for several minutes). Then prove dead at the point of work, on every conductor including the inverter outgoing tail. Treat the inverter outputs as a separate source until proved otherwise."
            whyItMatters="A consumer unit main switch isolates the DNO side. It does not isolate any source on the load side. PV, battery storage, EV chargers with V2H, generators, and UPS systems are all examples of additional sources that can back-feed the bus when the main switch is open. The fatality cases that have driven A4:2026 SPD and AFDD changes have similar back-feed roots — the load side was not as 'isolated' as the worker thought."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <CommonMistake
            title="Skipping the &lsquo;prove indicator before&rsquo; step under time pressure"
            whatHappens="The electrician opens the MCB, takes the voltage indicator from the bag, places it on the conductors at the point of work, sees nothing, and concludes the circuit is dead. The indicator is in fact faulty (battery flat, fuse blown, internal damage from a previous drop). The conductors are still live. The next action — opening the JB, changing an accessory, applying a Method 1 link — completes the path to earth through the operator."
            doInstead="The proving step before the test step is non-negotiable. Test the indicator on a known live source (a proving unit or a known live socket nearby) BEFORE applying it to the conductor you intend to verify dead. Indicator passes: proceed. Indicator fails: replace and start again. The proving unit lives in the test bag and gets used at every isolation, not just &lsquo;sometimes&rsquo;."
          />

          <CommonMistake
            title="Treating &lsquo;circuit MCB off&rsquo; as the same as &lsquo;safe to work in the consumer unit&rsquo;"
            whatHappens="You isolate the circuit MCB on a faulty circuit, intending to investigate. You open the consumer unit cover. The bus inside the consumer unit is still energised — it has to be, the rest of the installation is running on it. A slip with a screwdriver, a probe, or even a ring brushing a bus bridges the bus to the case or to your hand. 230 V into kiloamps is loose-clothing-and-eyebrows territory at best; a fatality at worst."
            doInstead="Decide: are you working on a final circuit at the accessory end (then circuit MCB off + lock-off + prove dead is enough), or are you working inside the consumer unit (then main switch off + lock-off + prove dead is required, OR the work is done with full live-work controls per EAWR Reg 14)? &lsquo;Just popping the cover&rsquo; with the main switch on is the procedural failure that the EAWR Reg 14 three-limb test was written to prevent."
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
            The legitimate live tests — and how each one is controlled
          </ContentEyebrow>

          <ConceptBlock
            title="Which tests are live, why they have to be live, and what controls each one needs"
            plainEnglish="Most BS 7671 tests are dead. The small set of tests that have to be live are tightly defined and tightly controlled. Live testing is not a default — it is an exception governed by EAWR Reg 14 (live work) and discharged through EAWR Reg 16 (competence)."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Test</th>
                    <th className="text-left text-white/80 py-2">Why live</th>
                    <th className="text-left text-elec-yellow py-2">Key controls</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 align-top">Ze at the origin (Reg 643.7.2)</td>
                    <td className="py-2 align-top">
                      The supplier earth-fault loop has to be present and the meter has to drive a
                      fault current.
                    </td>
                    <td className="py-2 align-top text-emerald-300">
                      CAT IV instrument and leads. Insulated mat. Arc-rated layer + eye protection.
                      No-trip mode if upstream RCD. Lock-off downstream MCBs to prevent loads.
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 align-top">Live polarity at the origin (Reg 643.7)</td>
                    <td className="py-2 align-top">
                      Verifies that a single-pole device opens the line conductor, not the neutral,
                      after the supply is connected.
                    </td>
                    <td className="py-2 align-top text-emerald-300">
                      CAT IV PPE and instrument. Two-pole voltage indicator at the cut-out, then at
                      the consumer unit. Done concurrently with Ze.
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 align-top">Zs at final-circuit point (Reg 643.7.3)</td>
                    <td className="py-2 align-top">
                      Direct measurement of the loop impedance at the load end — confirms
                      disconnection time will be met.
                    </td>
                    <td className="py-2 align-top text-emerald-300">
                      CAT III instrument and leads. No-trip mode for RCD-protected circuits. Test at
                      the accessory with the cover replaceable, never inside the live consumer unit.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 align-top">RCD operating-time (Reg 643.8)</td>
                    <td className="py-2 align-top">
                      The meter has to inject a calibrated residual current and time the
                      disconnection.
                    </td>
                    <td className="py-2 align-top text-emerald-300">
                      CAT III. Notify the occupant before tripping (computers, freezers, medical
                      equipment). Re-energise circuits in a controlled order after the test.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Tests outside this list — continuity (R1+R2), insulation resistance, dead polarity at
              every accessory, ring-final r1/r2/rn — are dead tests. Performing them live is not
              just a Reg 641.4 breach, it is an EAWR Reg 14 breach: the test could reasonably be
              done dead, so the live work cannot pass the three-limb test.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>PPE and the test environment</ContentEyebrow>

          <ConceptBlock
            title="PPE proportionate to PSCC and CAT level"
            plainEnglish="PPE for testing is not a uniform — it scales with the prospective fault current at the test point and the overvoltage category of the work. A domestic Ze test on a 16 kA supply is a different proposition to a commercial Ze test on a 100 kA supply."
            onSite="Three categories of PPE for test work: baseline (every test session), live-test (whenever a legitimate live test is performed), and high-fault (commercial supplies, large submains, anywhere PSCC pushes toward 25–100 kA)."
          >
            <ol className="list-decimal pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Baseline (every test session).</strong> Steel toecap or equivalent safety
                footwear, eye protection (clear EN 166), no rings, watches, neck chains or other
                conductive jewellery, sleeves rolled down, hair tied back. Long enough to break a
                fall onto a charged bus, secure enough that nothing dangles.
              </li>
              <li>
                <strong>Live-test layer.</strong> Insulated rubber mat or platform under the
                operator, especially at consumer units and origin tests. Insulated gloves rated to
                the working voltage of the test point (Class 0 for up to 1000 V — typical domestic /
                light commercial). Arc-rated long-sleeve layer (FR cotton or equivalent — the layer
                that does not melt onto skin in an arc event). Arc-rated face shield or arc-rated
                eye protection at the origin.
              </li>
              <li>
                <strong>High-fault layer.</strong> Where the PSCC is high (commercial origin, large
                industrial submains), formal arc-flash assessment is the route, not judgement.
                Calculated incident energy in cal/cm² leads to a PPE category. The HSE guidance and
                the IEEE 1584 / NFPA 70E framework are routinely referenced. This is outside the
                scope of routine domestic and light commercial work but inside the scope of any
                commercial origin Ze on a CT-metered supply.
              </li>
            </ol>
            <p>
              The principle behind every PPE choice is the same: the failure mode is the slip of the
              probe or the network-side transient that the CAT rating is designed to absorb. PPE is
              the last line — the line that holds when GS38 leads, the meter rating, and the
              safe-isolation procedure have all not been enough.
            </p>
          </ConceptBlock>

          <Scenario
            title="A 100 kA commercial PSCC and the PPE question"
            situation="You are doing an EICR on a commercial unit. The supplier earth-fault loop and PSCC at the origin are stated as 0.05 Ω and 100 kA respectively. The cut-out and meter feed a 400 A TPN main switch, then to a TPN distribution board. You have brought your domestic test kit."
            whatToDo="Stop. The PPE you carry for domestic work — basic safety boots, eye protection, GS38 leads — is the baseline only. At 100 kA PSCC, an arcing fault at the origin during your Ze test would deliver an incident energy that requires arc-rated PPE in the cal/cm² range. Either bring the right PPE (arc-flash hood, arc-rated suit, properly rated insulated gloves), or bring competent help, or restrict the test scope to downstream points and document why the origin Ze was not measured at this visit."
            whyItMatters="The HSE expectation, the insurer expectation and the certification scheme expectation are all aligned: PPE proportionate to the work. &lsquo;I always wear the same PPE&rsquo; is not a defensible position when the PSCC is double or triple what your domestic kit was designed for. This is the case where 'I will just be quick' becomes 'I will just be in hospital'."
          />

          <SectionRule />

          <ContentEyebrow>Lone working — and when not to test</ContentEyebrow>

          <ConceptBlock
            title="Lone-working risk assessment for testing"
            plainEnglish="Most domestic EICR work is lone working. That is not in itself a problem — it becomes a problem when the work is live testing without supervision, or when site conditions degrade, or when the lone worker has no escalation route if something goes wrong."
            onSite="Three lone-working questions before any live test: Can I summon help if I need it? Is the environment under control (lighting, occupants, access)? Am I in the right physical and mental state for live work today? If the answer to any is no, the test does not happen."
          >
            <p>
              The HSE expects employers (and self-employed sole traders) to assess lone-working
              risks. For testing, the key controls are:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Check-in / check-out:</strong> a colleague or family member knows you are on
                site, has the address, has an expected end time, and an escalation procedure if you
                do not check out. Phone-based safety apps (lone-worker GPS check-in) are widely
                used.
              </li>
              <li>
                <strong>Site walkround before live work:</strong> egress route clear, occupant
                briefed (or not present), pets controlled, lighting adequate, no slip hazards.
              </li>
              <li>
                <strong>Stop conditions:</strong> hostile occupant, suspected drug or alcohol use in
                the property, blocked egress, lighting failure, or any reason the worker would not
                feel comfortable doing the test if asked. The defensible call is to stop, document,
                and reschedule.
              </li>
              <li>
                <strong>Self-state check:</strong> tired, unwell, distracted, time-pressured. Live
                work demands concentration. If the operator is at the end of a 12-hour day and three
                more origin Zes await, that is the wrong time.
              </li>
            </ul>
            <p>
              The procedural cost of stopping is small — a rescheduled visit, an outstanding
              certificate marked clearly. The procedural cost of pressing on through a degraded
              safety boundary is a fatality and a HSE prosecution. Reg 641.4 is the regulatory hook;
              it is also a survival heuristic.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Supervision — instructed persons, apprentices, mates</ContentEyebrow>

          <ConceptBlock
            title="When you are the supervisor for an apprentice or an instructed person"
            plainEnglish="EAWR Reg 16 says competence OR supervision. If the person doing the work is not yet competent for the task, supervision has to bridge the gap. The supervisor takes on the duty of care for what the supervised person is allowed to do — and is accountable for failures."
            onSite="Supervision is not 'told them to be careful'. Supervision is 'within sight and intervention range, hands able to take over before harm, knows the procedure as well as the person doing it'. If the supervisor cannot stop the trainee from doing something dangerous in time, it is not supervision — it is exposure."
          >
            <p>Practical rules when supervising in a test environment:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Live work exclusion.</strong> An instructed person may handle the dead
                tests, the proving steps and the recording, with the supervisor checking. The live
                tests (Ze, Zs, RCD) are done by the skilled person — full stop — until competence
                has been signed off in formal training records.
              </li>
              <li>
                <strong>Proximity to live parts.</strong> Open consumer units, exposed busbars, live
                distribution boards: the trainee is at one arm length away or further, and only if
                their presence is necessary for the work. They are not in the line of spatter from a
                slip.
              </li>
              <li>
                <strong>Tools and posture.</strong> Trainee hands one tool at a time. No reaching
                across live parts. The supervisor places themselves between the trainee and the exit
                if the trainee needs to back out fast.
              </li>
              <li>
                <strong>Stop authority.</strong> The supervisor can stop the test at any point — and
                the trainee knows that &ldquo;stop&rdquo; means hands away, step back, no argument.
                This authority is established at the start of the day, not negotiated in the moment.
              </li>
            </ul>
            <p>
              If the supervisor goes to make a tea, takes a phone call, or steps out of sight —
              supervision has lapsed and EAWR Reg 16 is no longer being discharged. The trainee
              should put the tools down for that period. Documentation of supervision and training
              progression is also a registration scheme requirement (NICEIC, NAPIT, ELECSA).
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 641.4 is the umbrella safety duty during inspection and testing. Reg 641.6 sets who can do it (skilled persons competent in such work).',
              'EAWR Reg 16 (competence) and Reg 14 (live work three-limb test) are the criminal-law backbone. BS 7671 is the technical standard; EAWR is what HSE prosecutes under.',
              'Six-step safe isolation: identify → switch off → lock-off → prove indicator → test absence of voltage → re-prove indicator. Prove – test – prove every time.',
              'Isolate ALL sources, not just the supplier side: UPS, inverters, PV, battery storage, generation, V2H. Prove dead at the test point, not at the consumer unit.',
              'Legitimate live tests: Ze, live polarity at origin, Zs and RCD. Everything else is a dead test — performing it live breaches EAWR Reg 14.',
              'PPE scales with PSCC and CAT. Domestic baseline (insulating mat, gloves, arc-rated layer, eye protection) is the floor. Commercial origin needs formal arc-flash assessment.',
              'Lone working: check-in / check-out, stop conditions, self-state check. If the safety boundary is degraded, the test does not happen.',
              'Supervising an apprentice / instructed person: within sight and intervention range, dead tests only, stop authority established at the start, supervision lapses = tools down.',
              'GS38 (Section 1.3) is the equipment side; this section is the procedural side. Both have to hold for a defensible test session.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Reg 641.4 says "precautions shall be taken". What does HSE expect that to look like in practice?',
                answer:
                  'A documented risk assessment for the testing activity, evidence that safe-isolation procedures were followed (site notes, photos of lock-off, the &lsquo;prove – test – prove&rsquo; pattern recorded), evidence that PPE was proportionate, evidence that lone-working controls were in place, and evidence that supervision was provided where instructed persons were involved. After a serious incident HSE will ask to see all of these. &lsquo;We always do safe isolation&rsquo; is not evidence; the lock-off log and the photo of the locked-off device are.',
              },
              {
                question:
                  'Is a generic 18th Edition qualification enough to make me a "skilled person competent" for verification under Reg 641.6?',
                answer:
                  'It is the floor, not the ceiling. Reg 641.6 says competent in such work — i.e. competent for verification specifically. Most certification schemes (NAPIT, NICEIC, ELECSA, Stroma) require additional verification training (2391-50 / 2391-52, or equivalent), and they audit it. The 18th Edition shows you have the knowledge of the regulations; the verification qualification shows you have the inspection and testing competence. EAWR Reg 16 holds you to "appropriate" competence for the task — not "any electrical training will do".',
              },
              {
                question:
                  'I am asked to do an EICR on a property where the occupant refuses to allow me to isolate the supply for the dead tests. What is the right call?',
                answer:
                  'You cannot perform an EICR without isolation for the dead tests. Reg 643.2 (continuity) and Reg 643.3 (insulation) are dead tests by their nature — performed live they are dangerous and the readings are meaningless. Document the situation, explain to the occupant (and to the duty-holder commissioning the EICR — landlord, employer) that you cannot complete the EICR without isolation, and decline to issue a certificate that would falsely state the testing was done. A part-EICR with the dead tests omitted and the limitation prominently noted is sometimes acceptable; an EICR with fabricated dead-test readings is fraud and a clear EAWR breach.',
              },
              {
                question:
                  'A circuit I am about to test is RCD-protected. The Ze meter will trip the RCD. Is no-trip mode safe to use?',
                answer:
                  'Yes — no-trip / low-current modes are designed for this. They inject a current well below the RCD trip threshold (typically 6–15 mA) over many cycles to compute loop impedance. The trade-off is reduced accuracy on very low impedances; for most BS 7671 acceptance values that does not matter. The procedural rule is to know your meter — read its no-trip-mode accuracy spec, check its limits (some no-trip modes do not work at very high impedances), and confirm the result is within the BS 7671 Table 41 limit including the meter uncertainty.',
              },
              {
                question:
                  'What records do I have to keep about safety during the test session, beyond the certificate itself?',
                answer:
                  'GN3 Reg 2.5 cross-references HSE HSR25 — records of all maintenance, including test results, kept throughout the working life of the installation. In practice that means: the certificate, the schedule of test results, the schedule of inspections, calibration certificates for every instrument used, lock-off logs (where used), site notes including any deviations or limitations. For a contested case years later — landlord prosecution, insurance claim, coroner referral — these are your evidence. Cloud-based EICR systems should retain everything; paper-based should be filed against the property address for the recommended retention period (typically the life of the installation plus 6 years for limitation purposes).',
              },
              {
                question:
                  'What is the difference between an &lsquo;instructed person&rsquo; and a &lsquo;skilled person&rsquo; under BS 7671 and EAWR — and why does it matter on a test site?',
                answer:
                  'BS 7671 Part 2 defines them. A skilled person is one who possesses adequate education, training and practical skills and is able to perceive risks and avoid hazards created by electricity. An instructed person is one adequately advised or supervised by a skilled person to enable that person to perceive risks and avoid hazards. The verification under Reg 641.6 has to be done by a skilled person; an instructed person can assist under supervision. EAWR Reg 16 maps to this — competence or supervision proportionate. On a test site this means: the apprentice does not sign the certificate. The apprentice does not do the live tests. The apprentice does not work unsupervised at the consumer unit. The skilled person carries the duty of care for both the work and the supervised trainee.',
              },
              {
                question:
                  'Is &lsquo;live polarity&rsquo; testing at the origin still required by BS 7671? And if so, how do I do it safely?',
                answer:
                  'Yes — Reg 643.7 requires polarity verification including a check that single-pole devices on the line conductor open the line, not the neutral. At the origin, this is done as part of the live polarity / Ze step: with the supply on, a CAT IV two-pole voltage indicator confirms L-N at line voltage, L-E at line voltage, N-E at near-zero, and the same on each phase for three-phase. The safe procedure: GS38 leads, CAT IV indicator, insulating mat, arc-rated layer + eye protection, no other person inside the consumer unit envelope, hands clear of the bus, indicator placed on the conductors with the body weight back. Done in 60 seconds; not done casually.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Safety during testing — Module 1.4" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-1')}
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
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-1/section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.5 Test sequence and documentation
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

export default InspectionTestingModule1Section4;
