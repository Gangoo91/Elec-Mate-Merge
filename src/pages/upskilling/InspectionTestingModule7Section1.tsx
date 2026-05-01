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
    id: 'mod7-s1-three-duties',
    question:
      'Reg 643.6 places how many distinct verification duties on the polarity test, and which test stage catches the supplier-side reversal?',
    options: [
      'One duty (wiring throughout) — caught by the dead Method 1 test',
      'Four duties (supply at origin, single-pole devices on line, lampholder centre contacts, wiring throughout) — and only the live two-pole indicator at the origin catches a supplier-side reversal',
      'Two duties (continuity and IR) — caught by the multifunction tester',
      'Three duties — all caught by a plug-in socket tester',
    ],
    correctIndex: 1,
    explanation:
      'Reg 643.6 has an opening sentence (supply at origin) plus three lettered sub-clauses (single-pole on line, lampholder centre contacts, wiring throughout). The dead test cannot see past the meter — only a live two-pole indicator at the consumer unit confirms the supplier presented L on the line terminal.',
  },
  {
    id: 'mod7-s1-osg-method1',
    question:
      'OSG Reg 10.3.4 ties the pre-energisation polarity test to which other test, and what is the practical consequence?',
    options: [
      'To the RCD ramp test — you run the ramp first, then read polarity from the trip current',
      'To Test Method 1 of continuity — line linked to CPC at the origin, ohmmeter at each accessory. Done in the right sequence, the polarity reading falls out of the Method 1 setup for free',
      'To insulation resistance — polarity is a side-effect of a clean IR reading',
      'To the Zs measurement at the furthest point',
    ],
    correctIndex: 1,
    explanation:
      'OSG Reg 10.3.4 is explicit: prior to connecting the supply, the method of test for polarity shall be the same as Test Method 1 used for continuity of protective conductors. Sequence the tests so polarity is a re-read of the same probe path, with lamps removed and IR clean.',
  },
  {
    id: 'mod7-s1-lamps-out',
    question:
      'Why does OSG insist that lamps are removed before the pre-energisation polarity test on a lighting circuit?',
    options: [
      'To stop the lamps drawing test current and damaging the meter',
      'A lamp filament is a low-resistance path between line and neutral at the holder. With it in place, a swapped switch wire elsewhere on the circuit can read continuous via the lamp and mask the polarity fault. Empty holders force the test current down the actual circuit conductors',
      'It is purely a cosmetic step — the test works either way',
      'To prevent the lamp from glowing at low test voltage',
    ],
    correctIndex: 1,
    explanation:
      'A lamp filament across the holder shorts the line and neutral terminals through a known resistance. With it in place, a circuit with a swapped switch wire can read continuous L-to-E at the holder via the lamp and the next connected accessory — the polarity fault hides. Lamps out is non-negotiable.',
  },
  {
    id: 'mod7-s1-live-fail',
    question:
      'Every dead test passed. You energise. The two-pole indicator at the consumer unit reads 230 V N-to-E and 0 V L-to-E. What has happened, and what do you do?',
    options: [
      "Swap the consumer unit's incoming tails to compensate, then re-energise",
      "The supplier's tails are reversed at the cut-out. Isolate immediately, do NOT touch the cut-out (only the DNO may), call the DNO to remediate. Issue no certificate until the cut-out is corrected and the live test passes",
      'Ignore — the dead test is the definitive one',
      'Treat as a code C3 observation and continue',
    ],
    correctIndex: 1,
    explanation:
      'A clean dead test confirms the installation is internally consistent — but if the supplier presented L on the neutral terminal at the cut-out, the whole installation is consistent with that reversal. The DNO is the only party permitted to work at the cut-out. Issue no certificate until corrected.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 643.6 sets out three things that must be verified during the polarity test on a single-phase installation. Which of the following is NOT one of them?',
    options: [
      'Every fuse and single-pole control / protective device is connected in the line conductor only',
      'Centre contact bayonet and Edison screw lampholders (other than E14/E27 to BS EN 60238) have their outer / screwed contact connected to neutral on earthed-neutral systems',
      'Wiring has been correctly connected throughout the installation',
      'The Zs at every final circuit is below the Reg 411.4 limit',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 643.6 lists three duties under the polarity heading: single-pole devices in the line only (a), lampholder centre-contact handling (b), and wiring correctly connected throughout (c). Zs verification is a separate test under Reg 643.7.3 — it is not what the polarity test is for.',
  },
  {
    id: 2,
    question: 'A pre-energisation polarity test before connecting the supply uses what method?',
    options: [
      'A live two-pole voltage indicator at every accessory',
      'The same setup as Test Method 1 of continuity — line linked to CPC at the origin, then a low-resistance ohmmeter check from line to earth at each point',
      'An RCD ramp test with the supply on',
      'A 500 V insulation resistance test L-to-N',
    ],
    correctAnswer: 1,
    explanation:
      'OSG Reg 10.3.4 is explicit: prior to connecting the supply, the method of test for polarity shall be the same as Test Method 1 used for continuity of protective conductors. You get the polarity check for free if you have already done Method 1 properly — the L-to-CPC link at the board is doing both jobs.',
  },
  {
    id: 3,
    question:
      'Why is a single-pole device prohibited in the neutral conductor on an earthed-neutral system (Reg 132.14.1 / 132.14.2)?',
    options: [
      'To save copper on the neutral conductor',
      'Because a single-pole switch in the neutral leaves the line conductor connected when the switch is open — accessory contacts and downstream wiring stay live, defeating isolation and creating a shock hazard',
      'Because RCDs cannot detect neutral faults',
      'Because the neutral is bigger than the line',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 132.14.1 mandates that a single-pole fuse, switch or circuit-breaker shall be inserted in the line conductor only. Reg 132.14.2 prohibits an unlinked single-pole device in an earthed neutral. The polarity test (Reg 643.6(a)) is the practical verification that this design rule has been followed at every accessory.',
  },
  {
    id: 4,
    question:
      'On an earthed-neutral system, where should the centre (live) contact of a centre-contact bayonet or Edison screw lampholder be connected?',
    options: [
      'To neutral, in every case',
      'To line, except for E14 and E27 lampholders to BS EN 60238 — which are excepted by Reg 643.6(b)',
      'It does not matter on a domestic circuit',
      'To the protective conductor',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.6(b) requires that on earthed-neutral circuits, centre-contact BC and ES lampholders have their outer / screwed contact on neutral — i.e. the centre live contact is on line. The carve-out is for E14 / E27 lampholders to BS EN 60238, which are double-insulated at the shell and are excepted from this duty.',
  },
  {
    id: 5,
    question:
      'What is the correct sequence for the pre-energisation polarity test on a new lighting circuit, per OSG Ch 10?',
    options: [
      'Energise → walk round with a two-pole tester → record',
      'Continuity of protective conductors (Test Method 1) → remove all lamps → insulation resistance → continuity / polarity using the same Method-1 setup → visual confirmation at terminations',
      'Insulation resistance only — polarity is purely visual',
      'Use a phase-rotation tester at every switch',
    ],
    correctAnswer: 1,
    explanation:
      'The OSG sequence is deliberate: protective-conductor continuity first (you need a confirmed CPC reference), lamps out (so they cannot mask reverse polarity by providing a parallel L–N path), insulation resistance (so you are not testing into a fault), then the polarity / continuity check using the Method 1 setup — and finally a visual check on terminations the test cannot reach.',
  },
  {
    id: 6,
    question:
      'Why must lamps be removed from a lighting circuit before pre-energisation polarity testing?',
    options: [
      'To stop the lamps drawing test current',
      'A lamp filament provides a low-resistance path between line and neutral. With a lamp in place, an incorrectly wired lampholder can read as continuous L-to-E via the lamp and the next holder — masking the reverse polarity',
      'To protect the test instrument from inrush',
      'It is not strictly required — only recommended',
    ],
    correctAnswer: 1,
    explanation:
      'OSG guidance is firm: remove all lamps before polarity testing on lighting circuits. A lamp is a series resistor between L and N at the holder; with it in place, a swapped switch wire elsewhere on the circuit can show acceptable readings because the test current is finding a way through the lamp. Empty holders force the test current down the actual circuit conductors.',
  },
  {
    id: 7,
    question:
      'After the installation is energised, the polarity test does not stop. What is the live polarity step actually checking?',
    options: [
      'That the RCD trips at 30 mA',
      'That the indication on the device — the neon, the digital indicator, the LED, the socket-tester pattern — confirms line is on the line terminal and neutral is on the neutral terminal as the energised supply is presented',
      'That the Zs reading falls below the Table 41.3 limit',
      'That the cable temperature stays below 70°C',
    ],
    correctAnswer: 1,
    explanation:
      'A pre-energisation Method-1 polarity check confirms the wiring is consistent — but it cannot tell you whether the incoming supply itself was presented L on line. The post-energisation step is where a two-pole indicator / approved socket tester reads the live supply at the origin and at representative points and confirms what each terminal actually is.',
  },
  {
    id: 8,
    question:
      'You have completed Method 1 continuity on a radial. The L–CPC link is still in at the board. The reading at every accessory in turn comes back continuous L-to-E. What is the polarity status of the circuit?',
    options: [
      'Confirmed — the readings are all continuous',
      'Cannot be confirmed yet — Method 1 with L–CPC linked at the origin tells you line and CPC are continuous to each point, but it does not by itself tell you whether the conductor presented as line at the accessory is the same conductor that is line at the board. You also need a second check (continuity L-to-N with N–E linked, or visual at terminations) to close the polarity question',
      'Failed — the link should not be in',
      'Confirmed only on radials, never on rings',
    ],
    correctAnswer: 1,
    explanation:
      'This is the trap. Method 1 with L–CPC linked confirms that whatever-is-line-at-the-board is continuous to whatever-is-line-at-the-accessory — but if the line and switch wire have been swapped at a junction, the test point can read continuous L-to-E with the switch in OFF and you would never know. The polarity check needs the line-to-line correspondence verified, plus the switch-action test in §2.',
  },
  {
    id: 9,
    question:
      'BS 1363 socket-outlets and BS EN 60309 industrial sockets are required to be non-reversible. How does that requirement interact with the Reg 643.6(c) duty to verify wiring is correctly connected throughout the installation?',
    options: [
      'It removes the need for a polarity check at sockets',
      'The non-reversible plug / socket geometry guarantees the appliance side cannot be presented in reverse polarity at the pins — but the cable feeding the socket-back can still be wired wrong. The polarity check at the socket-back terminals is what catches the wiring fault that the pin geometry cannot',
      'It only applies to industrial sockets',
      'It overrides Reg 643.6 entirely',
    ],
    correctAnswer: 1,
    explanation:
      'Non-reversible plug / socket geometry (Reg 553.1.5) protects the appliance interface — once the cable terminates correctly at the socket, the plug enforces orientation. But the requirement does nothing for the wiring upstream of the terminals. Polarity verification at the socket-back is non-redundant: it is the test that proves the line conductor lands on the correct terminal in the first place.',
  },
  {
    id: 10,
    question:
      'On the A4:2026 Schedule of Test Results, where does the polarity result for a single-phase final circuit go, and what is the correct entry for a circuit that passes?',
    options: [
      'There is no polarity column — record in comments only',
      'A dedicated polarity column on the Generic Schedule of Test Results (Appendix 6 / GN3 schedule). A passing circuit is entered as a tick / pass mark — not a numeric value, because polarity is a yes/no verification, not a measurement',
      'Record the line-to-earth resistance in the polarity column',
      'Polarity is recorded only on the Schedule of Inspections, not the Schedule of Test Results',
    ],
    correctAnswer: 1,
    explanation:
      'The Generic Schedule of Test Results carries a polarity column for each circuit. Polarity is a binary verification — pass / fail / N/A — so the entry is a tick, not an ohms reading. A failure entered in this column is a code C2 / non-compliance, not a deviation, because it identifies a wired-wrong installation that is unsafe to leave energised.',
  },
];

const InspectionTestingModule7Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Polarity testing methods | I&T Module 7.1 | Elec-Mate',
    description:
      'Reg 643.6 polarity verification: why polarity matters, OSG Test Method 1 cross-reference, pre-energisation vs post-energisation polarity checks, and how the Method 1 continuity setup doubles as the polarity probe path.',
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
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 1"
            title="Polarity testing methods"
            description="Reg 643.6 in detail. Why polarity is a safety duty, the OSG cross-reference that hands you the test for free, and the difference between the dead and the live polarity check."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 643.6 is three duties in one regulation: single-pole devices in the line only; lampholder centre-contact handling on earthed-neutral systems; and wiring correctly connected throughout the installation.',
              'Polarity matters because every protective principle downstream depends on it. A single-pole switch in the neutral leaves the accessory live with the switch off; a fuse in the neutral fails to disconnect the line on a fault; a reversed socket presents 230 V on the appliance shell.',
              'OSG Reg 10.3.4: prior to connecting the supply, the method of test for polarity shall be the same as Test Method 1 of continuity — line linked to CPC at the board, low-resistance ohmmeter L-to-E at each point. You get polarity verification for free if you sequence Method 1 correctly.',
              'Polarity is a two-stage test: dead, before the supply is connected (Method-1 setup, lamps removed, ohmmeter at each accessory); and live, once energised (two-pole indicator / approved socket tester confirming the energised supply lands as line and neutral on the right terminals).',
              'Polarity is a binary verification — pass / fail / N/A — recorded as a tick on the Schedule of Test Results polarity column. A failure is not a deviation; it is a wired-wrong installation that the certificate cannot be issued for until corrected.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the three duties Reg 643.6 places on the polarity test and why each one is a safety verification, not a paperwork tick',
              'Explain how the OSG Test Method 1 cross-reference makes the polarity test the same physical setup as the protective-conductor continuity test',
              'Distinguish the pre-energisation (dead) polarity test from the post-energisation (live) polarity test, and know why both are required',
              'Identify the four classic ways polarity goes wrong on a single-phase circuit — switch wire swap, neutral fuse, reversed socket-back, lampholder centre on neutral — and the test method that catches each',
              'Apply Reg 132.14.1 / 132.14.2 (single-pole device in line only) to spot non-compliance during the polarity check',
              'Record a polarity result correctly on the A4:2026 Schedule of Test Results polarity column without ambiguity',
            ]}
          />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.6 — three duties under one heading"
            plainEnglish="Before the installation is energised, verify that the supply at the origin has correct polarity. Then, during the polarity test, verify three things: every fuse and single-pole device is in the line conductor only; lampholder centre contacts are handled per the BS EN 60238 carve-out; and wiring throughout the installation is correctly connected."
            onSite="Read 643.6 as four sentences and walk each one to its physical evidence. Sentence 1 — supply polarity at the origin. Sentence 2(a) — single-pole devices on line. Sentence 2(b) — lampholders. Sentence 2(c) — the catch-all wiring duty. If any of the four cannot be evidenced, the polarity test is not complete."
          >
            <p>
              Reg 643.6 sits between insulation resistance (643.3) and the
              protection-by-automatic-disconnection tests (643.7) in the test sequence. It is short,
              but every clause is load-bearing. The opening sentence requires that the polarity of
              the supply at the origin be verified before the installation is energised — a duty
              that lands on the supplier&rsquo;s side of the cut-out as much as the
              installer&rsquo;s. The second clause requires that all single-pole switching devices
              are in the line conductor only, where single-pole switching of the neutral is
              prohibited (Reg 132.14.2).
            </p>
            <p>
              The three lettered sub-clauses then tighten the verification: every fuse and
              single-pole control and protective device is in the line conductor only; lampholder
              outer / screwed contacts are on neutral on earthed-neutral systems (with the BS EN
              60238 E14 / E27 exception); and wiring throughout the installation is correctly
              connected. The third sub-clause is the catch-all that makes polarity a
              whole-installation check, not a per-accessory check.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.6"
            clause={
              <>
                Where relevant, the polarity of the supply at the origin of the installation shall
                be verified before the installation is energized. Where single-pole switching
                devices are not permitted in the neutral conductor, a test shall be made to verify
                that all such devices are connected in the line conductor(s) only. During the
                polarity test, it shall be verified that: (a) every fuse and single-pole control and
                protective device is connected in the line conductor only; and (b) except for E14
                and E27 lampholders to BS EN 60238, in circuits having an earthed neutral conductor,
                centre contact bayonet and Edison screw lampholders have the outer or screwed
                contacts connected to the neutral conductor; and (c) wiring has been correctly
                connected throughout the installation.
              </>
            }
            meaning="Polarity is not one test — it is a verification of four distinct wiring properties. (1) Supply polarity at origin. (2) Single-pole devices on line. (3) Lampholder centre-contact handling on earthed-neutral systems. (4) Wiring correctly connected end-to-end. The certificate cannot be issued until all four are evidenced."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 132.14.1"
            clause={
              <>
                A single-pole fuse, switch or circuit-breaker shall be inserted in the line
                conductor only.
              </>
            }
            meaning="The design rule the polarity test exists to verify. Reg 643.6(a) is the physical evidence step for this design duty. Anything single-pole in the neutral is a wired-wrong installation, regardless of whether it appears to function."
          />

          <ConceptBlock
            title="Why polarity matters — the four failures it prevents"
            plainEnglish="Polarity is the gate every other protective measure passes through. If polarity is wrong, single-pole switching does not isolate, fuses do not disconnect, accessory shutters are pointing the wrong way, and the appliance pin gets the live conductor. Every other test in Part 6 assumes correct polarity has already been established."
            onSite="When you find a polarity fault on site, treat it as a code C2 — potentially dangerous. The reason: every downstream protective principle is now compromised, and the user has no way to know."
          >
            <p>
              Polarity is the foundation, not a finishing touch. Four canonical failures all reduce
              to a polarity fault:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Single-pole switch in the neutral.</strong> User flicks the switch off to
                change a lamp. Switch breaks the neutral. Lampholder centre contact is still
                energised. User contacts the centre contact and earth. Severe shock — which the user
                genuinely believed was impossible because they had switched the light off.
              </li>
              <li>
                <strong>Fuse in the neutral.</strong> Fault-to-earth on the line conductor. Fuse in
                the neutral cannot see the fault current (the fault is going line-to-earth, not
                line-to-neutral). The fuse does not blow. The line conductor stays live, dropping
                fault current into the protective conductor for an indefinite period. Disconnection
                time is not met. Touch voltage on every bonded part rises.
              </li>
              <li>
                <strong>Reversed socket-back wiring.</strong> BS 1363 socket pins are non-reversible
                at the plug, but if the socket is wired with line on the left terminal and neutral
                on the right, every appliance plugged in presents 230 V on what its internal design
                treats as the neutral side. Class II (double-insulated) tools usually survive this.
                Class I tools with their switch in the neutral side become permanently energised on
                their accessible metalwork.
              </li>
              <li>
                <strong>Lampholder centre contact on neutral.</strong> The shell of an Edison screw
                lampholder is exposed when the lamp is loosely fitted or being changed. If the
                centre contact is on neutral, the shell is on line — and the shell is what the
                user&rsquo;s fingers touch as they screw the lamp in.
              </li>
            </ol>
            <p>
              Reg 643.6 is the regulation that catches all four. Each sub-clause maps to one of the
              failures above — and each is a separate verification, not a single test result.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The OSG cross-reference — Method 1 does double duty</ContentEyebrow>

          <ConceptBlock
            title="OSG Reg 10.3.4 — polarity uses the same setup as continuity Test Method 1"
            plainEnglish="Before connecting the supply, the method of test for polarity is the same as Test Method 1 used for continuity of protective conductors. You short line to CPC at the origin, take a low-resistance ohmmeter to each accessory, and the same setup that gave you R1+R2 also tells you whether what is presented as line at the accessory is electrically the same conductor as line at the board."
            onSite="If you have done Method 1 properly for continuity, polarity is a re-read of the same readings against a different acceptance question. Sequence the tests so polarity falls out of continuity — do not run the same circuit twice with different test heads."
          >
            <p>
              The OSG ties the polarity test to Test Method 1 of continuity. The mechanic is
              straightforward: with the line conductor and the CPC linked at the origin, an ohmmeter
              probe placed on the line terminal at any accessory should read the link resistance
              plus R1+R2 to that point — i.e. continuous. A reading of open circuit at a point where
              the circuit is supposed to terminate is a polarity flag (the line conductor is not
              arriving at this terminal as expected).
            </p>
            <p>The OSG sequence for a new lighting circuit is canonical and worth memorising:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Continuity of protective conductors using Test Method 1 — completed first, because
                every subsequent step assumes a confirmed CPC reference.
              </li>
              <li>
                Remove all lamps from the lighting circuit. A lamp is a low-resistance path between
                line and neutral at the holder; with one in place, a swapped switch wire elsewhere
                on the circuit can read as electrically continuous via the lamp and mask the
                polarity fault.
              </li>
              <li>
                Insulation resistance test. This catches conductor-to-conductor faults that would
                otherwise give misleading readings during the polarity step.
              </li>
              <li>
                Polarity verification using the Method 1 setup — line linked to CPC at the board,
                ohmmeter from line terminal at each accessory to the CPC at that accessory.
                Continuity at every expected line terminal is the pass.
              </li>
              <li>
                Visual confirmation at any termination the test cannot reach (back-of-rose, behind
                ceiling FCU mounting plates, joints inside ceiling voids).
              </li>
            </ol>
            <p>
              The reason this sequence matters: every step rules out a different class of fault, and
              the polarity step is the last one because it depends on every previous step being
              clean. Run them out of order and you get readings you cannot interpret.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="On-Site Guide · Reg 10.3.4"
            clause={
              <>
                Prior to connecting the supply, the method of test for polarity shall be the same as
                test method 1 for checking the continuity of protective conductors (as referenced in
                10.3.1). Polarity is confirmed when the results of the continuity tests and
                insulation resistance measurements are checked for acceptability.
              </>
            }
            meaning="Two operational consequences. First: polarity is not a separate test in the field — it is a reading taken from the Method 1 setup, with the lamps out and IR clean. Second: polarity is confirmed only when all three readings (continuity, IR, the polarity probe) are acceptable together. A passing polarity reading on a circuit with a failed IR is not a pass."
          />

          {/* Polarity test sequencing schematic — Method 1 doing double duty */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              How the Method 1 L–CPC link doubles as the polarity probe path
            </h4>
            <svg
              viewBox="0 0 800 360"
              className="w-full h-auto"
              role="img"
              aria-label="Polarity test sequencing diagram showing line linked to CPC at the distribution board, with the same ohmmeter probe at each accessory measuring continuity and verifying polarity simultaneously."
            >
              {/* DB block */}
              <rect
                x="40"
                y="40"
                width="180"
                height="200"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="130"
                y="62"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="11"
                fontWeight="bold"
              >
                DISTRIBUTION BOARD
              </text>
              <text x="130" y="78" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (Isolated, locked off)
              </text>

              <rect
                x="70"
                y="100"
                width="40"
                height="25"
                rx="4"
                fill="rgba(239,68,68,0.1)"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <text
                x="90"
                y="117"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                L
              </text>
              <rect
                x="70"
                y="145"
                width="40"
                height="25"
                rx="4"
                fill="rgba(59,130,246,0.1)"
                stroke="#3B82F6"
                strokeWidth="1.5"
              />
              <text
                x="90"
                y="162"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="10"
                fontWeight="bold"
              >
                N
              </text>
              <rect
                x="70"
                y="190"
                width="40"
                height="25"
                rx="4"
                fill="rgba(34,197,94,0.1)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="90"
                y="207"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                E
              </text>

              {/* L–CPC flying lead link (Method 1 link) */}
              <path
                d="M110,112 L160,112 L160,202 L110,202"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2.5"
                strokeDasharray="6,3"
              />
              <rect
                x="140"
                y="148"
                width="55"
                height="22"
                rx="4"
                fill="rgba(251,191,36,0.15)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text
                x="167"
                y="163"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                L–CPC LINK
              </text>

              {/* Run out to switch */}
              <line x1="220" y1="112" x2="380" y2="112" stroke="#EF4444" strokeWidth="2" />
              <line x1="220" y1="202" x2="380" y2="202" stroke="#22C55E" strokeWidth="2" />
              <text x="300" y="105" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                R1 line
              </text>
              <text x="300" y="218" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                R2 CPC
              </text>

              {/* Switch */}
              <rect
                x="380"
                y="80"
                width="100"
                height="160"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="430"
                y="100"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="10"
                fontWeight="bold"
              >
                SWITCH
              </text>
              <text x="430" y="115" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (single-pole)
              </text>
              {/* Line in / switch wire out */}
              <circle cx="395" cy="135" r="3" fill="#EF4444" />
              <text x="395" y="150" textAnchor="middle" fill="#EF4444" fontSize="9">
                Line
              </text>
              <circle cx="465" cy="135" r="3" fill="#FBBF24" />
              <text x="465" y="150" textAnchor="middle" fill="#FBBF24" fontSize="9">
                Sw L
              </text>
              <circle cx="430" cy="220" r="3" fill="#22C55E" />
              <text x="430" y="232" textAnchor="middle" fill="#22C55E" fontSize="9">
                CPC
              </text>

              {/* Run out to ceiling rose */}
              <line x1="465" y1="135" x2="600" y2="135" stroke="#FBBF24" strokeWidth="2" />
              <line x1="430" y1="220" x2="600" y2="220" stroke="#22C55E" strokeWidth="2" />

              {/* Ceiling rose */}
              <rect
                x="600"
                y="80"
                width="150"
                height="160"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="675"
                y="100"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="10"
                fontWeight="bold"
              >
                CEILING ROSE
              </text>
              <text x="675" y="115" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (lamp removed)
              </text>
              <circle cx="620" cy="135" r="3" fill="#FBBF24" />
              <text x="620" y="148" textAnchor="middle" fill="#FBBF24" fontSize="9">
                Sw L
              </text>
              <circle cx="675" cy="135" r="3" fill="#3B82F6" />
              <text x="675" y="148" textAnchor="middle" fill="#3B82F6" fontSize="9">
                N
              </text>
              <circle cx="730" cy="135" r="3" fill="#EF4444" />
              <text x="730" y="148" textAnchor="middle" fill="#EF4444" fontSize="9">
                Perm L
              </text>
              <circle cx="675" cy="220" r="3" fill="#22C55E" />
              <text x="675" y="232" textAnchor="middle" fill="#22C55E" fontSize="9">
                CPC
              </text>

              {/* Probe arrow into rose */}
              <line
                x1="730"
                y1="155"
                x2="730"
                y2="280"
                stroke="#FBBF24"
                strokeWidth="2"
                strokeDasharray="4,3"
              />
              <text
                x="745"
                y="270"
                textAnchor="start"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Probe at
              </text>
              <text
                x="745"
                y="282"
                textAnchor="start"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                permanent
              </text>
              <text
                x="745"
                y="294"
                textAnchor="start"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                line
              </text>

              {/* Footer interpretation */}
              <rect
                x="40"
                y="290"
                width="710"
                height="60"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="395" y="310" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                With L–CPC linked at the board: ohmmeter from L terminal at each accessory to CPC →
                continuous = polarity correct at that point.
              </text>
              <text
                x="395"
                y="328"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                The same setup as Method 1 of continuity. One probe pass, two regulations satisfied
                (Reg 643.2.1 + Reg 643.6).
              </text>
              <text x="395" y="344" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Open circuit at an expected line terminal = polarity flag. Investigate before
                energising.
              </text>
            </svg>
          </div>

          <CommonMistake
            title="Treating polarity as &lsquo;done&rsquo; after Method 1 alone"
            whatHappens="Method 1 with L–CPC linked tells you that whatever is presented as line at the accessory is electrically continuous to whatever is line at the board. It does not tell you whether the line and switch wire have been swapped at a junction box mid-circuit. The lamp test passes (the holder gets continuity to CPC). The certificate goes out. The user changes a lamp. The switch is off. The lampholder centre contact is still live."
            doInstead="Polarity is two readings minimum at every accessory: (1) continuity from line terminal to CPC with L–CPC linked at the board (the Method 1 reading), and (2) continuity from line terminal to neutral terminal with N–E linked at the board, OR a visual confirmation at the accessory terminations. Either second check catches the swap that Method 1 alone cannot."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The two stages — dead first, then live</ContentEyebrow>

          <ConceptBlock
            title="Pre-energisation polarity test (dead) — what it can and cannot prove"
            plainEnglish="The dead polarity test, done before the supply is connected, uses the Method 1 setup and the ohmmeter. It proves the wiring inside the installation is consistent and that single-pole devices are in the line conductor. It does not — and cannot — tell you whether the supplier has presented line on the line terminal at the cut-out."
            onSite="The dead test is the test you have full control over. Do it thoroughly, on every circuit, at every accessory. The live test that follows it is faster but depends on the supplier — and on you having tested every circuit dead first."
          >
            <p>
              The pre-energisation polarity test is the core of the verification. You have
              isolation, lock-off, and a confirmed dead state at the point of work. The test
              workflow is:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Isolate the circuit, prove dead at the point of work, lock off at the source.
                Confirm the protective-conductor continuity test (Method 1) is already complete and
                the L–CPC link is in place at the board.
              </li>
              <li>
                Remove all lamps from any lighting circuit on the test path. This is non-negotiable
                on lighting circuits — a lamp filament reads as continuous L-to-N and can mask a
                swapped switch wire.
              </li>
              <li>
                Confirm insulation resistance is acceptable. Polarity readings taken on a circuit
                with a live-to-earth IR fault are not interpretable.
              </li>
              <li>
                With the L–CPC link in place, ohmmeter from the line terminal at each accessory to
                the CPC at that accessory. Continuous = line conductor lands here as expected. Open
                = polarity flag.
              </li>
              <li>
                Verify single-pole device positions. At every switch, FCU and isolator on the
                circuit, the line conductor must enter the device and the switched line must leave
                it — never the neutral being broken.
              </li>
              <li>
                Visual check at any termination the ohmmeter cannot reach. Back-of-rose, behind FCU
                plates, joints inside ceiling voids — confirm the conductor colour codes correspond
                to the design terminals.
              </li>
              <li>
                Remove the L–CPC link before any breaker on the board is closed. Then proceed to the
                live stage.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Post-energisation polarity test (live) — what only the live test can catch"
            plainEnglish="Once the supply is energised, a second polarity check is required at the origin and at representative points. This stage uses an approved two-pole voltage indicator (or socket tester) to read the energised supply and confirm that what is presented as line is actually the line conductor. It catches errors at the supplier&rsquo;s side that the dead test physically cannot."
            onSite="The live test is short — supply origin, every distribution board, a representative socket on each circuit type. But it has to be done. The cut-out wiring is not under your control until you energise."
          >
            <p>
              The live polarity check is targeted, not exhaustive. The classic failure modes the
              live test catches:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Supplier&rsquo;s tails reversed at the cut-out.</strong> The dead test
                proves the installation is internally consistent. If line and neutral are swapped at
                the cut-out, the whole installation is internally consistent but every line
                conductor is actually neutral. Only a live two-pole indicator at the origin catches
                this.
              </li>
              <li>
                <strong>Reversed at a meter.</strong> Sometimes the meter terminations swap the
                conductors between the supplier&rsquo;s side and the consumer&rsquo;s side. The dead
                test cannot see past the meter; the live test reads the energised supply on the
                consumer&rsquo;s side and confirms what is what.
              </li>
              <li>
                <strong>Reversed at a sub-board.</strong> A sub-board fed by SWA from the main board
                can have its tails swapped at one end. The dead test on circuits downstream of the
                sub-board reads as consistent (because the swap is upstream of the test point). The
                live test at the sub-board origin is the catch.
              </li>
              <li>
                <strong>Phase swap at a meter on a three-phase supply.</strong> Out of scope here,
                but the same logic applies: the dead test cannot tell you which phase the supplier
                presented; only a live phase-rotation tester can.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.6 (opening sentence)"
            clause={
              <>
                Where relevant, the polarity of the supply at the origin of the installation shall
                be verified before the installation is energized.
              </>
            }
            meaning="The opening sentence anticipates the live test. &lsquo;Verified before the installation is energized&rsquo; means the verification process is in place — but the supply-side check itself happens at the moment of energising, with a two-pole indicator confirming what the meter is presenting. It is the only sentence in 643.6 that crosses the dead / live boundary."
          />

          <Scenario
            title="A new consumer unit on a TN-C-S supply, dead test passes, live test fails"
            situation="You have completed continuity, IR and polarity dead tests on every circuit. All readings clean. You energise from the meter. Two-pole indicator at the consumer unit reads 230 V between what should be neutral and earth — and 0 V between what should be line and earth."
            whatToDo="Stop. The supplier&rsquo;s tails are reversed at the cut-out. Isolate immediately. Do not attempt to swap the consumer unit&rsquo;s incoming tails to compensate — the supply has been presented wrong, and the supplier is the only party permitted to remediate at the cut-out. Contact the DNO. The fact every dead test passed is irrelevant: the installation is internally consistent but line and neutral are swapped at the supply, so every accessory is now wired against the supplier&rsquo;s presentation. Issue no certificate until the cut-out is corrected and the live test passes."
            whyItMatters="This is the canonical failure that the live polarity test exists to catch. A perfectly executed dead test on a perfectly wired installation can still leave you with reversed polarity at every socket if the supplier has presented L and N the wrong way at the cut-out. The dead test cannot see this; only the live test can. Skipping the live test on the assumption the supplier &lsquo;does it right&rsquo; is the failure mode that gets people killed."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            The four canonical polarity faults — and the test that catches each
          </ContentEyebrow>

          <ConceptBlock
            title="Mapping each Reg 643.6 sub-clause to the test method that proves it"
            plainEnglish="Reg 643.6 has three sub-clauses. The opening sentence covers a fourth duty (supply at origin). Each maps to a specific test step. Knowing which test step proves which clause is what stops you walking past a fault."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Reg 643.6 clause</th>
                    <th className="text-left text-white/80 py-2">Failure mode</th>
                    <th className="text-left text-elec-yellow py-2">Test that catches it</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06] align-top">
                    <td className="py-2">Opening sentence — supply at origin</td>
                    <td className="py-2">Supplier&rsquo;s tails reversed at the cut-out</td>
                    <td className="py-2 text-elec-yellow">
                      Live two-pole indicator at origin once energised
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06] align-top">
                    <td className="py-2">(a) Single-pole device on line</td>
                    <td className="py-2">Switch / fuse / FCU in the neutral conductor</td>
                    <td className="py-2 text-elec-yellow">
                      Dead test: continuity from line terminal at switch input to L–CPC link at
                      board, plus visual at the switch
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06] align-top">
                    <td className="py-2">(b) Lampholder centre contact</td>
                    <td className="py-2">
                      BC / ES centre contact on neutral on an earthed-neutral system
                    </td>
                    <td className="py-2 text-elec-yellow">
                      Dead test at the rose with lamp removed: continuity from centre contact
                      terminal to L–CPC link at board
                    </td>
                  </tr>
                  <tr className="align-top">
                    <td className="py-2">(c) Wiring correctly connected throughout</td>
                    <td className="py-2">
                      Switch wire / line swap at a junction; reversed socket-back; reversed
                      sub-board tails
                    </td>
                    <td className="py-2 text-elec-yellow">
                      Dead test at every accessory + visual at every termination + live test at
                      origin and sub-boards
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Sub-clause (c) is the one that requires the most legwork. Every accessory, every
              junction, every sub-board — until you have evidenced that the conductor presented as
              line at every test point is actually the line conductor that left the board. There is
              no shortcut.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Skipping the live polarity check &lsquo;because the dead test passed&rsquo;"
            whatHappens="Every dead reading was clean. You energise. You move to RCD ramp tests and Zs. You never put a two-pole indicator on the incoming tails. Six months later, the customer&rsquo;s washing machine throws a fault to its drum. The drum is now at 230 V because the supplier presented L on the neutral terminal at the cut-out and your installation is internally consistent with that reversal. The disconnection time relies on a fault path that does not exist as designed."
            doInstead="Make the live polarity check at the consumer unit a printed line on your test record sheet, before any RCD ramp or Zs measurement. Approved two-pole indicator only — not a neon screwdriver, not a multimeter on AC volts. Read L–E and N–E at the incoming side of the main switch. L–E ≈ 230 V; N–E ≈ 0–10 V. Anything else, isolate and call the DNO."
          />

          <CommonMistake
            title="Using a socket tester as the only polarity verification"
            whatHappens="Plug-in socket testers are useful — but they are a final-circuit cross-check, not a verification. They cannot confirm that single-pole devices are on line. They cannot confirm a lampholder centre-contact terminal. They cannot test a non-socket circuit (cooker, shower, FCU spur). And on a TN-C-S supply, they cannot reliably distinguish neutral-earth swaps from a healthy supply because N and CPC are bonded at the cut-out anyway."
            doInstead="Socket testers are a confirmation, not a substitute. The verification is the Reg 643.6 sequence — dead test using Method 1 setup at every accessory, plus live two-pole indicator at the origin. The socket tester comes last, as a sanity check at sockets only, and never carries the weight of the certificate."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Recording on the A4:2026 Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="Polarity is a binary tick — never a numeric value"
            plainEnglish="Polarity gets its own column on the Generic Schedule of Test Results. The entry is a tick (pass), a cross (fail) or N/A. It is never a resistance value or a voltage — those go in the continuity, IR and Zs columns respectively."
            onSite="If you find yourself writing a number in the polarity column, you are filling in the wrong column. A polarity failure is binary; the diagnostic detail goes in comments."
          >
            <p>
              The A4:2026 Generic Schedule of Test Results retains the polarity column from earlier
              editions and treats it as a yes / no verification. Three operational rules:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Pass entry:</strong> a tick. The implication is that all four duties
                (origin, single-pole line, lampholder, wiring throughout) have been evidenced for
                that circuit.
              </li>
              <li>
                <strong>Fail entry:</strong> a cross. A polarity failure is a code C2 on an EICR —
                potentially dangerous — and on initial verification it blocks issue of the
                certificate. The fault must be rectified and the test repeated.
              </li>
              <li>
                <strong>N/A entry:</strong> rare. Reserved for circuits where polarity does not
                apply (a true single-conductor SELV circuit with no return polarity, for example).
                On any standard single-phase final circuit, N/A is the wrong entry — polarity always
                applies.
              </li>
            </ul>
            <p>
              The comments column is where the diagnostic detail lives. &lsquo;Polarity reversed at
              S/O 4 ground floor — corrected and re-tested OK&rsquo; is acceptable when issued
              alongside an updated certificate. A failed circuit cannot be left on the certificate
              as &lsquo;passed&rsquo; with a comment explaining the failure — the column is binary,
              not advisory.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 643.6 is four duties: supply at origin, single-pole devices on line, lampholder centre-contact handling, and wiring correctly connected throughout. Each is a separate verification, not a single test.',
              'OSG Reg 10.3.4: pre-energisation polarity uses the same Method 1 setup as protective-conductor continuity. Sequence the tests so polarity falls out of continuity for free.',
              'Lamps removed before polarity testing on lighting circuits — non-negotiable. A lamp filament is a low-resistance L–N path that can mask a swapped switch wire.',
              'Method 1 alone proves wiring is consistent — it does not prove L and switch wire have not been swapped at a junction. A second check (continuity L-to-N with N–E linked, or visual at terminations) is required.',
              'Live polarity test at the origin is non-negotiable. The dead test cannot see past the meter. A two-pole indicator at the consumer unit is the only catch for reversed supplier&rsquo;s tails.',
              'Reg 132.14.1: a single-pole fuse, switch or circuit-breaker shall be inserted in the line conductor only. Reg 643.6(a) is the practical verification of this design rule.',
              'Polarity on the Schedule of Test Results is a tick / cross / N/A — never a number. A polarity failure is a code C2 on EICR and blocks the initial verification certificate.',
              'Socket testers are a final cross-check, not a verification. They cannot test single-pole device positions, lampholder centre contacts or non-socket circuits.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Does the polarity test apply to RCD-protected circuits, or does the RCD make it redundant?',
                answer:
                  'It applies. Reg 643.6 makes no exception for RCD-protected circuits. An RCD detects residual current — it does not detect, and is not designed to detect, line / neutral swaps or single-pole devices in the wrong conductor. A reversed-polarity socket on an RCD-protected circuit is just as dangerous as one on an unprotected circuit; the RCD trips on a fault, but the everyday switching action of the appliance is still defeated by the polarity error.',
              },
              {
                question:
                  'Why is the lampholder centre-contact rule different for E14 / E27 lampholders to BS EN 60238?',
                answer:
                  'BS EN 60238 E14 and E27 lampholders are constructed with the screw shell sleeved or recessed so that the shell is not accessible during normal lamp insertion. Reg 643.6(b) excepts them because the safety risk that drives the centre-contact-on-line rule (user touching the live shell) does not apply. Older non-BS-EN-60238 ES lampholders, and BC lampholders generally, do not have the recessed-shell construction — so the rule still bites for those.',
              },
              {
                question:
                  'On a circuit where Method 1 has already been done and the L–CPC link is still at the board, do I need to do anything else for polarity?',
                answer:
                  'Yes. The Method 1 reading taken at the far end gave you R1+R2 — that confirms the line conductor is electrically continuous to the CPC at that point. It does not by itself confirm the switch wire and line have not been swapped at an intermediate junction, and it does not cover the single-pole device check (Reg 643.6(a)) or the lampholder check (Reg 643.6(b)). Polarity is a separate verification step that uses the Method 1 setup but tests for different things — switch action, lampholder terminal mapping, and line continuity to every line terminal at every accessory.',
              },
              {
                question:
                  'A neon-bulb screwdriver lights up when I touch it to the live terminal. Is that a valid polarity test?',
                answer:
                  'No. A neon screwdriver is not approved as a voltage indicator under GS 38, gives no indication of voltage magnitude or stability, and provides no proof-test capability. The polarity test on the live side requires an approved two-pole voltage indicator that meets GS 38 (or the equivalent referenced in the test instrument standards). A neon screwdriver flashing is consistent with anything from 50 V leakage to 230 V supply — it does not distinguish a healthy supply from a phantom voltage on a stray capacitive coupling.',
              },
              {
                question:
                  'On a TN-C-S supply, the live test at the origin reads about 0–5 V between the neutral terminal and the earth terminal. Is that a polarity problem?',
                answer:
                  'Probably not. On TN-C-S the neutral and the protective conductor are bonded at the cut-out (PEN), so a small N–E voltage at the consumer unit is normal — it is the N–E load voltage drop along the supplier&rsquo;s neutral. A few volts is benign; tens of volts indicates the PEN bond is high-impedance or the loading is severe. A 230 V N–E reading is the polarity failure mode (line and neutral reversed at the cut-out). The diagnostic step is to read L–E: ≈ 230 V means the line is correctly presented, the small N–E reading is supplier neutral drop, and polarity is fine.',
              },
              {
                question:
                  'A polarity failure is found during periodic inspection (EICR). What code applies, and can the installation be left energised?',
                answer:
                  'Polarity reversal at any final circuit accessory is normally coded C2 — potentially dangerous. The energising risk is real (single-pole switching does not isolate, accessory shutters point the wrong way, appliance live parts present where the design assumes neutral). The standard advice is: isolate the affected circuit, schedule the correction promptly, and re-test polarity before re-energisation. Leaving a known polarity fault energised, even on a circuit the customer says they are not using, is hard to defend in writing.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Polarity testing methods — Module 7.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-7/section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.2 Single-phase polarity verification
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

export default InspectionTestingModule7Section1;
