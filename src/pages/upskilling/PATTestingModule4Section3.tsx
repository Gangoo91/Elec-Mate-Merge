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
    id: 'patm4-s3-scope',
    question:
      'A user brings you a sealed Class I kettle for testing. Should polarity testing be performed on it?',
    options: [
      'Yes — polarity is tested on every appliance, regardless of construction',
      'No — a sealed moulded-plug appliance is inspected visually at the plug only',
      'Only if the kettle has a metal body that could become live',
      'Only on Class II kettles, where there is no protective conductor',
    ],
    correctIndex: 1,
    explanation:
      'IET CoP Ch 15 names the polarity test specifically for detachable mains leads, IEC cord-sets, extension leads, and any field-fitted (re-wireable) plug. Moulded-plug sealed appliances are inspected visually at the plug; the test as a measurement is for serviceable cord-sets where the conductor identification can be wrong.',
  },
  {
    id: 'patm4-s3-colours',
    question:
      'You strip back a UK BS 1363 plug fitted to a kettle lead. The conductor at the L pin is brown. The conductor at the N pin is blue. The conductor at the E pin is green/yellow. Is the colour code correct?',
    options: [
      'No — the conductors should be red, black and green for the three pins',
      'Yes — this is the modern UK harmonised code: brown L, blue N, green/yellow E',
      'It is only correct if the plug also contains a BS 1362 fuse',
      'No — neutral should be brown and line should be blue at the pins',
    ],
    correctIndex: 1,
    explanation:
      'The harmonised UK colour code (since 2004) is brown = L, blue = N, green/yellow = E. Older cords (pre-harmonisation) used red = L, black = N, green = E. Red/black/green is not a fault per se — but it indicates a cord predating the 2004 harmonisation, and at any termination where old and new colours mix the risk of mis-identification rises. Replacement is the safest option.',
  },
  {
    id: 'patm4-s3-iec',
    question:
      'A C13 IEC kettle lead tests as L–N reversed inside the lead. What is the safety implication and the correct action?',
    options: [
      'Pass — IEC C13 connectors are reversible by design, so polarity is moot',
      'Fail — the reversal leaves the element live when the switch is "off"',
      'Pass with a comment noting the internal reversal on the record',
      'Fail only if the appliance fed by the lead is Class II construction',
    ],
    correctIndex: 1,
    explanation:
      'A polarity-reversed lead defeats the single-pole switching that most appliances rely on. The user perceives the appliance as off, but the heating element / motor is still live to ground potential through the (now-switched) neutral. Functional safety hangs on polarity being correct end-to-end. The lead is failed and either discarded or remade.',
  },
  {
    id: 'patm4-s3-fcu',
    question:
      'You are PAT-testing an extension lead with a 13 A fused plug. After polarity passes, what does IET CoP recommend you check on the plug?',
    options: [
      'Nothing further — the polarity test already covered the plug',
      'Inspect the BS 1362 fuse rating and condition against the load',
      'Re-run an insulation resistance test on the lead at the plug',
      'Confirm the neutral conductor colour only at the plug terminal',
    ],
    correctIndex: 1,
    explanation:
      'IET CoP Ch 15 places fuse rating verification within the visual / preliminary stage of the PAT for re-wireable plugs. A 13 A fuse fitted to a 0.75 mm² flex on a small appliance is non-compliant and the lead fails until the correct-rated fuse is installed. Fuses are visual/inspection items that sit alongside the polarity test for cord-sets.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'IET CoP Chapter 15 directs polarity testing specifically at what subset of equipment?',
    options: [
      'Every appliance on the bench, regardless of its construction',
      'Only Class II appliances, which have no protective conductor',
      'Cords, IEC leads, extension leads and re-wireable plug-tops',
      'Only equipment drawing more than 13 A in normal service',
    ],
    correctAnswer: 2,
    explanation:
      'The polarity test as a measurement applies to leads and cord-sets where conductor identification can be wrong. Moulded-plug sealed appliances are factory-built and inspected visually at the plug.',
  },
  {
    id: 2,
    question:
      'In the modern UK harmonised colour code (since 2004) used in BS 1363 plugs, which colour identifies the line conductor?',
    options: ['Red', 'Blue', 'Green/yellow', 'Brown'],
    correctAnswer: 3,
    explanation:
      'Since the 2004 harmonisation, brown = line, blue = neutral, green/yellow = protective conductor. The pre-harmonisation code was red = line, black = neutral, green = earth.',
  },
  {
    id: 3,
    question:
      'A customer brings in a vintage table lamp with cord coloured red, black and green. The plug is wired with red to L pin, black to N pin, green to E pin. Pass or fail per modern PAT?',
    options: [
      'Pass on polarity, but flag the pre-2004 cord for replacement',
      'Fail — the red/black/green colours are wrong for any modern cord',
      'Pass without comment — conductor colours do not matter at all',
      'Fail outright — only modern harmonised colours are ever valid',
    ],
    correctAnswer: 0,
    explanation:
      'The polarity is electrically correct under either convention. The risk is at any subsequent repair where new (brown/blue/green/yellow) cord meets old (red/black/green) — a fitter joining brown to black would inadvertently swap line and neutral. IET CoP recommends flagging the lead for replacement to eliminate that future risk.',
  },
  {
    id: 4,
    question:
      'A 13 A fused plug is fitted to a hairdryer rated at 1800 W. What fuse rating is appropriate?',
    options: [
      '3 A — the lowest available fuse is always the safest choice',
      '5 A — a mid-range fuse split between the 3 A and 13 A options',
      '13 A — at about 7.8 A operating current, the correct BS 1362 rating',
      '1 A — the smallest fuse, to give the tightest protection margin',
    ],
    correctAnswer: 2,
    explanation:
      'BS 1362 fuses come in standard ratings (1, 3, 5, 7, 10, 13 A). At a steady-state current near 8 A, 13 A is the right fuse — 3 A would nuisance-trip on legitimate operation. The fuse protects the flex from short-circuit fault current; the appliance internal protection handles overload.',
  },
  {
    id: 5,
    question:
      'You polarity test a C13/C14 IEC kettle cord. The C13 socket end and the BS 1363 plug end agree on conductor identification. The cord passes polarity. What other check, per IET CoP, is needed on this cord-set before passing?',
    options: [
      'No further check is needed once the cord has passed polarity',
      'An insulation resistance test on the cord, and nothing else',
      'A colour change of the conductors to the red/black/green code',
      'Earth continuity (M4.1) plus visual inspection of both connector ends',
    ],
    correctAnswer: 3,
    explanation:
      'Polarity is necessary but not sufficient. Earth continuity is the parallel test (M4.1). Visual inspection of both ends is critical — the C13 connector is a high-failure point because it is repeatedly disconnected and the contacts arc on disconnection under load. Burn marks at the L pin are the typical end-of-life indicator.',
  },
  {
    id: 6,
    question:
      'BS 7671:2018+A4:2026 Reg 643.6 covers polarity testing of the fixed installation. How does it relate to PAT polarity?',
    options: [
      'It is the parent principle — single-pole switching must be in the line conductor',
      'It directly governs PAT polarity and sets the cord-set acceptance',
      'It exempts PAT-tested cord-sets from any polarity testing at all',
      'It applies only to ring final circuits, not to single-pole switching',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 643.6 sets the polarity duty for the fixed installation: every single-pole device must be in the line conductor so that switching, isolation and fuse protection all act on the line side. PAT extends this to the appliance side: the cord-set and re-wireable plug must agree with the installation polarity convention end-to-end.',
  },
  {
    id: 7,
    question:
      'A switched FCU on the wall powers a fixed extractor fan via a flex. The flex polarity-tests as L–N reversed. What is the safety consequence?',
    options: [
      'No consequence at all — the fan still runs and switches normally',
      'Only nuisance tripping of the upstream protective device',
      'Loss of voltage at the appliance, so the fan simply stops running',
      'The FCU switch and fuse now sit on neutral — isolation fails with line live',
    ],
    correctAnswer: 3,
    explanation:
      'A reversed flex defeats the entire single-pole switching scheme. The FCU switch, the fuse, and any internal single-pole switch in the appliance now interrupt the neutral, leaving line live to the appliance with no isolation. Reg 643.6 exists specifically to prevent this. The fault is a category that has caused fatalities.',
  },
  {
    id: 8,
    question: 'Most automatic PAT testers run polarity by which method?',
    options: [
      'Visual inspection of the plug face only, with no measurement',
      'A live voltage measurement taken across each pin in turn',
      'A pin-to-contact continuity check: L pin to L, N pin to N, E pin to E',
      'A high-current injection test down each conductor of the lead',
    ],
    correctAnswer: 2,
    explanation:
      'Automatic testers do an end-to-end continuity check between corresponding pins: pin → contact. A reversal in the cord shows as the meter detecting continuity between the L pin and the wrong end of the cord. The tester typically displays the failure type ("L–N reversed" / "L–E reversed") so the operator can find and remediate the fault.',
  },
  {
    id: 9,
    question:
      'You discover an extension lead where the L socket pin connects to the green/yellow conductor of the cord (a green/yellow at the line!). Pass or fail and what is the action?',
    options: [
      'Hard fail — green/yellow on a line pin energises every connected chassis',
      'Pass with a comment noting the conductor colour on the record',
      'Re-test the lead to confirm the reading before deciding anything',
      'Replace the BS 1362 plug fuse only and return the lead to service',
    ],
    correctAnswer: 0,
    explanation:
      'Mis-wiring the protective conductor to a line pin is one of the most dangerous PAT failures possible. The chassis of any Class I appliance plugged into the extension would be at 230 V relative to true earth; touching it would deliver fault current straight through the user. Hard fail, immediate removal, no return to service until the fault is remediated.',
  },
  {
    id: 10,
    question:
      'In the rare case where you have to verify polarity manually with a multimeter on a re-wireable plug (no automatic PAT tester), what does IET CoP and good practice direct?',
    options: [
      'Plug the cord into the mains and probe live with the multimeter',
      'Use a neon test screwdriver to confirm which pin is the line',
      'Visually inspect the conductor colours at each pin and accept that',
      'Isolate and test dead — confirm each pin to its conductor on continuity',
    ],
    correctAnswer: 3,
    explanation:
      'The safe method is dead testing: cord isolated, ohmmeter on continuity, pin-to-conductor verification at each end. Live testing of polarity at a working socket is a different procedure (using GS38-compliant test leads, RCD-protected supply, lone-worker controls) and is not the routine method. The IET CoP polarity test is designed for the dead-tested cord-set on the bench.',
  },
];

const PATTestingModule4Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Polarity testing of cords and leads | PAT M4.3 | Elec-Mate',
    description:
      'IET Code of Practice 5th Ed Ch 15 + BS 7671 Reg 643.6: pin-to-conductor polarity verification on cord-sets, IEC leads, extension leads and re-wireable plugs. Modern brown/blue/green-yellow vs historical red/black/green colour code.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3"
            title="Polarity testing of cords and leads"
            description="Cord-sets, IEC leads, extension leads and re-wireable plugs. The brown/blue/green-yellow colour rule, the historical red/black/green issue, and the pin-to-conductor check that catches the reversed-lead fault."
            tone="yellow"
          />

          <TLDR
            points={[
              'Polarity testing under IET CoP Ch 15 targets cord-sets, IEC leads, extension leads and re-wireable plugs — equipment where conductor identification is exposed to error. Sealed appliances with moulded plugs are inspected visually at the plug.',
              'Modern UK BS 1363 / harmonised colour code: brown = line, blue = neutral, green/yellow = protective conductor. Pre-2004 cord uses red = line, black = neutral, green = earth — not a fault on its own but a flag for replacement.',
              'A reversed cord-set defeats single-pole switching. The appliance switch, the FCU on the wall, and the plug fuse all end up in the neutral conductor — leaving line live to the appliance even when "off". Reg 643.6 exists to prevent exactly this in the fixed installation; PAT extends the principle to the appliance side.',
              'Automatic PAT testers run polarity as a pin-to-pin continuity check: L pin → L contact, N pin → N contact, E pin → E contact. A failure shows the swapped pair (typically L–N or, dangerously, L–E).',
              'Fuse rating verification is part of the same workflow on re-wireable plugs. BS 1362 fuses come in 1, 3, 5, 7, 10, 13 A — match the rating to the appliance load. A 13 A fuse on a 0.75 mm² flex is non-compliant and fails the inspection.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State which equipment requires polarity testing per IET CoP Ch 15 and which is exempted (moulded-plug sealed appliances)',
              'Recall the modern UK BS 1363 / harmonised colour code (brown/blue/green-yellow) and recognise the pre-2004 red/black/green code as a flag for replacement',
              'Identify the safety consequence of a reversed cord-set: failed single-pole switching and live-to-neutral isolation defeat',
              'Apply the pin-to-conductor continuity verification correctly on a re-wireable plug or IEC cord-set',
              'Verify BS 1362 plug-fuse rating against appliance load and flex csa as part of the same PAT workflow',
              'Reference BS 7671 Reg 643.6 as the parent polarity duty for the fixed installation and recognise PAT polarity as the appliance-side extension',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What polarity verifies — and what it does not</ContentEyebrow>

          <ConceptBlock
            title="Why polarity matters at all"
            plainEnglish="Single-phase AC appliances are switched on the line conductor. Every single-pole switch, FCU, fuse and circuit breaker on the supply side opens the line. If the cord is reversed, those devices end up opening the neutral instead. The appliance is then off from the user perspective but still connected to line through the un-switched conductor. Touching internal parts during maintenance, or any insulation breakdown, becomes a shock hazard."
            onSite="Polarity is the difference between an appliance that becomes safe when switched off and one that only becomes safe when unplugged. The polarity test on a cord-set is what guarantees the first case."
          >
            <p>
              IET Code of Practice 5th Edition (2020) Chapter 15 directs polarity testing
              specifically at equipment where conductor identification is exposed to error:
              detachable mains cords (kettle leads, monitor leads, IEC cord-sets generally),
              extension leads, and any re-wireable BS 1363 plug-top fitted to a flex by hand.
              Moulded-plug sealed appliances — where the manufacturer has factory-fitted the plug
              and the user cannot open the connection — are inspected visually at the plug only; the
              conductor identity inside is taken as factory-correct.
            </p>
            <p>
              The duty parallels BS&nbsp;7671:2018+A4:2026 Reg&nbsp;643.6, which governs the fixed
              installation: polarity verified at every single-pole device, fuse, switch and
              socket-outlet, ensuring single-pole switching always interrupts the line conductor.
              PAT applies the same principle to the appliance side. Reg&nbsp;643.6 exists because
              every fatality from a "switched-off" appliance traces back to single-pole switching in
              the wrong conductor.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020) — Chapter 15"
            clause={
              <>
                Polarity of supply leads, including extension leads and detachable cord-sets, shall
                be verified to confirm that the line conductor connects only to the line pin of the
                plug and to the line contact of the appliance connector. Polarity testing shall be
                performed on all equipment with re-wireable plug-tops, IEC cord-sets, and extension
                leads.
              </>
            }
            meaning="The clause names the scope: leads with serviceable connections at either end, where the conductor identification can be wrong. Sealed moulded-plug appliances are not within the polarity-test scope as a measurement, but their plugs are still subject to visual inspection in the M3 inspection workflow."
          />

          <ConceptBlock
            title="Single-pole switching — and what reversed polarity actually breaks"
            plainEnglish="A single-pole appliance switch interrupts the line conductor only. With correct polarity, &lsquo;off&rsquo; means the appliance is genuinely isolated from the live source. With reversed polarity, &lsquo;off&rsquo; means the switch interrupts the neutral — the appliance internal wiring stays connected to the line conductor, and any leakage path or insulation defect can put fault current onto the chassis or onto the user."
          >
            <p>Three real-world cases where reversed polarity causes harm:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Plug fuse on the wrong side:</strong> A reversed cord-set puts the BS 1362
                fuse in the plug between the appliance and neutral. Under a fault, the fuse may
                still operate (fault current still flows back to the supply), but the appliance is
                left line-connected up to the point of fault. The protective effect is degraded
                relative to the line-side fuse design.
              </li>
              <li>
                <strong>Fixed-installation FCU isolation defeated:</strong> A wall-mounted switched
                FCU supplies an extractor fan via a flex. With the flex polarity reversed, the FCU
                switch interrupts neutral — the maintenance electrician switches the FCU off,
                believing the fan is isolated, and is shocked when working on the fan because the
                line conductor was never interrupted.
              </li>
              <li>
                <strong>Appliance internal switch:</strong> A two-pole switch on a kettle handles
                both line and neutral. A single-pole switch on a desk lamp handles line only. A
                reversed cord turns the single-pole switch into a neutral-only switch — the lamp
                "off" still has the bulb live to ground potential, and a finger inside an open lamp
                holder receives a shock the user did not expect.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>
            Colour codes — modern, historical, and the danger of mixing them
          </ContentEyebrow>

          <ConceptBlock
            title="The harmonised UK colour code (since 2004) — brown / blue / green-yellow"
            plainEnglish="The 16th Edition of BS 7671 (2004) brought UK domestic and commercial flex into line with the European harmonised colour code. Since then: brown = line, blue = neutral, green/yellow = protective conductor. The colours are written into BS 1363 (plug-top wiring), BS EN 60309 (industrial plugs), and the IET Code of Practice for PAT."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Conductor</th>
                    <th className="text-center text-white/80 py-2">Modern (post-2004)</th>
                    <th className="text-center text-white/80 py-2">Pre-2004 (UK historic)</th>
                    <th className="text-center text-elec-yellow py-2">BS 1363 plug pin</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Line</td>
                    <td className="text-center text-amber-300">Brown</td>
                    <td className="text-center text-red-400">Red</td>
                    <td className="text-center text-elec-yellow">L (right when looking at face)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Neutral</td>
                    <td className="text-center text-blue-300">Blue</td>
                    <td className="text-center">Black</td>
                    <td className="text-center text-elec-yellow">N (left)</td>
                  </tr>
                  <tr>
                    <td className="py-2">Protective conductor</td>
                    <td className="text-center text-emerald-300">Green/yellow</td>
                    <td className="text-center text-emerald-400">Green</td>
                    <td className="text-center text-elec-yellow">E (top, longer pin)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The pin layout in a UK BS 1363 plug, viewed from the face (pin side towards you):
              earth at the top (12 o&apos;clock), line on the right, neutral on the left. The earth
              pin is longer than line and neutral by design — it makes contact first on insertion
              and breaks contact last on withdrawal, so the protective conductor is always the first
              connected and last disconnected.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Pre-2004 cord — not a fault, but a flag"
            plainEnglish="A cord coloured red / black / green is electrically equivalent to brown / blue / green-yellow when wired correctly. The danger is at any joint or repair where the two codes meet."
          >
            <p>
              Where pre-harmonisation cord meets harmonised cord at a joint or repair, the colour
              correspondence is not intuitive: brown = red (both line) is fine, blue = black (both
              neutral) is fine, green/yellow = green (both earth) is fine — but the colour names do
              not match. A fitter accustomed to the modern code who reads &ldquo;black&rdquo; as
              &ldquo;not earth, must be neutral&rdquo; gets the right answer; a fitter who reads
              &ldquo;black&rdquo; as &ldquo;line by analogy with negative DC&rdquo; gets the wrong
              answer.
            </p>
            <p>
              IET CoP&apos;s practical guidance is to flag pre-2004 cord on the appliance record and
              recommend replacement at the next opportunity. The polarity test on a pre-2004
              cord-set passes / fails on the same pin-to-conductor verification — colours do not
              affect the test outcome; they affect the safety of any future intervention.
            </p>
          </ConceptBlock>

          {/* Polarity check connection diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Polarity check — pin-to-conductor verification on a BS 1363 plug + IEC C13 cord-set
            </h4>
            <svg
              viewBox="0 0 820 400"
              className="w-full h-auto"
              role="img"
              aria-label="Polarity check schematic. The PAT tester confirms continuity between the line pin of the BS 1363 plug and the line contact of the C13 connector via the brown conductor; between N pin and N contact via blue; between E pin and E contact via green/yellow. A reversed lead shows as the wrong pin connected to the wrong contact."
            >
              {/* BS 1363 plug face */}
              <rect
                x="40"
                y="60"
                width="180"
                height="200"
                rx="10"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.6"
              />
              <text
                x="130"
                y="84"
                textAnchor="middle"
                fill="rgba(255,255,255,0.8)"
                fontSize="12"
                fontWeight="bold"
              >
                BS 1363 plug
              </text>
              <text
                x="130"
                y="100"
                textAnchor="middle"
                fill="rgba(255,255,255,0.55)"
                fontSize="9.5"
              >
                (face view)
              </text>
              {/* Earth pin (top, 12 o'clock) */}
              <rect x="115" y="120" width="30" height="14" rx="2" fill="#22C55E" />
              <text
                x="130"
                y="150"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                E (12 o&apos;clock)
              </text>
              {/* Line pin (right) */}
              <rect x="170" y="190" width="14" height="30" rx="2" fill="#EF4444" />
              <text
                x="180"
                y="240"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                L (right)
              </text>
              {/* Neutral pin (left) */}
              <rect x="76" y="190" width="14" height="30" rx="2" fill="#3B82F6" />
              <text
                x="83"
                y="240"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="10"
                fontWeight="bold"
              >
                N (left)
              </text>

              {/* Cord conductors — each routed plug pin → matching C13 pin */}
              {/* Brown (Line): L pin (177, 220) → C13 L (405, 235) */}
              <path
                d="M177,220 C 240,260 320,260 405,235"
                fill="none"
                stroke="#A0522D"
                strokeWidth="2.6"
              />
              {/* Blue (Neutral): N pin (83, 220) → C13 N (475, 235) */}
              <path
                d="M83,220 C 200,300 360,300 475,235"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2.6"
              />
              {/* Green/yellow (E): E pin (130, 134) → C13 E (440, 235) */}
              <path
                d="M130,134 C 240,140 360,180 440,235"
                fill="none"
                stroke="#22C55E"
                strokeWidth="2.6"
              />

              {/* Conductor labels — placed on uncluttered curves */}
              <rect
                x="240"
                y="118"
                width="86"
                height="14"
                rx="3"
                fill="rgba(34,197,94,0.10)"
                stroke="rgba(34,197,94,0.25)"
                strokeWidth="0.8"
              />
              <text
                x="283"
                y="129"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                Green/yellow
              </text>
              <rect
                x="270"
                y="246"
                width="60"
                height="14"
                rx="3"
                fill="rgba(160,82,45,0.18)"
                stroke="rgba(160,82,45,0.4)"
                strokeWidth="0.8"
              />
              <text
                x="300"
                y="257"
                textAnchor="middle"
                fill="#C8855B"
                fontSize="9"
                fontWeight="bold"
              >
                Brown
              </text>
              <rect
                x="240"
                y="290"
                width="48"
                height="14"
                rx="3"
                fill="rgba(59,130,246,0.12)"
                stroke="rgba(59,130,246,0.3)"
                strokeWidth="0.8"
              />
              <text
                x="264"
                y="301"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="9"
                fontWeight="bold"
              >
                Blue
              </text>

              {/* IEC C13 connector */}
              <rect
                x="380"
                y="178"
                width="120"
                height="92"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1.5"
              />
              <text
                x="440"
                y="170"
                textAnchor="middle"
                fill="rgba(255,255,255,0.8)"
                fontSize="11"
                fontWeight="bold"
              >
                IEC C13
              </text>
              <text x="440" y="196" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                (kettle / monitor cord-set)
              </text>
              <circle cx="405" cy="235" r="5" fill="#EF4444" />
              <text
                x="405"
                y="258"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                L
              </text>
              <circle cx="440" cy="235" r="5" fill="#22C55E" />
              <text
                x="440"
                y="258"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                E
              </text>
              <circle cx="475" cy="235" r="5" fill="#3B82F6" />
              <text
                x="475"
                y="258"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="9"
                fontWeight="bold"
              >
                N
              </text>

              {/* PAT tester */}
              <rect
                x="560"
                y="80"
                width="240"
                height="180"
                rx="10"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="680"
                y="106"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                PAT TESTER
              </text>
              <text x="680" y="123" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                Pin-to-contact continuity
              </text>
              <rect
                x="582"
                y="138"
                width="196"
                height="108"
                rx="6"
                fill="rgba(0,0,0,0.4)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text
                x="680"
                y="162"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="12"
                fontWeight="bold"
              >
                ✓ L pin → L contact
              </text>
              <text
                x="680"
                y="184"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="12"
                fontWeight="bold"
              >
                ✓ N pin → N contact
              </text>
              <text
                x="680"
                y="206"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="12"
                fontWeight="bold"
              >
                ✓ E pin → E contact
              </text>
              <text x="680" y="232" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Detects swaps + green/yellow on L
              </text>

              {/* Tester to C13 link */}
              <line
                x1="500"
                y1="220"
                x2="560"
                y2="180"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.4"
                strokeDasharray="4,3"
              />

              {/* Caption — clear band */}
              <rect
                x="40"
                y="305"
                width="760"
                height="62"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.25)"
                strokeWidth="1"
              />
              <text x="420" y="325" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="10">
                Tester confirms each plug pin is electrically continuous with the matching C13
                contact.
              </text>
              <text
                x="420"
                y="343"
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="9.5"
              >
                A swap (brown landing on N pin) shows as L–N reversed.
              </text>
              <text
                x="420"
                y="359"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                ⚠ Green/yellow on a line pin = dangerous fail. Quarantine immediately.
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

          <ContentEyebrow>Procedure on the bench</ContentEyebrow>

          <ConceptBlock
            title="The polarity test workflow"
            plainEnglish="On most automatic PAT testers, polarity is part of the standard test sequence — the tester runs it after IR and before leakage. The operator does not perform any extra step beyond plugging in the cord. The test proceeds automatically."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Confirm earth continuity (M4.1) and IR (M4.2) have passed. Polarity is the third
                test in the sequence and assumes those have completed.
              </li>
              <li>
                For a detachable mains cord-set: plug the BS 1363 end into the PAT tester mains-out,
                and connect the IEC / appliance end into the PAT tester&apos;s appropriate accessory
                socket (most testers have a socket for IEC C13 / C19 connectors).
              </li>
              <li>
                For an extension lead: plug the BS 1363 plug into the PAT tester, and plug the
                tester&apos;s test lead with a BS 1363 plug into the extension&apos;s output socket.
              </li>
              <li>
                Initiate the polarity test. The tester runs continuity between L pin and L contact,
                N pin and N contact, E pin and E contact. Pass / fail is shown for each.
              </li>
              <li>
                Inspect the plug visually before re-fitting any cover (re-wireable plugs only):
                conductor colours match pins (brown to L, blue to N, green/yellow to E), all strands
                are inside terminals (no whiskers), cordgrip clamps the outer sheath (not the
                conductors), the BS 1362 fuse rating matches the appliance load.
              </li>
              <li>
                Record pass / fail. On a re-wireable plug, also record the BS 1362 fuse rating that
                was found.
              </li>
            </ol>
          </ConceptBlock>

          <Scenario
            title="A 25 m extension reel — polarity check"
            situation="The reel has been earth-continuity tested at 0.42 Ω (within the IET CoP rule for length) and has IR > 999 MΩ. You run polarity. The tester shows L–N reversed."
            whatToDo={
              <>
                <span className="block">
                  The fault is in the wiring at one of two points: the BS 1363 plug at the input, or
                  the socket(s) at the output. Open the plug first (it is the most common remediable
                  point).
                </span>
                <span className="block">
                  At the plug, the brown conductor must go to the L pin (right) and the blue
                  conductor to the N pin (left), looking at the plug face. If the colours are
                  swapped, swap them, re-fit the cover, and re-test.
                </span>
                <span className="block">
                  If the plug is correct, open the reel housing and check the wiring between the
                  plug-side input and the slip-ring / terminal block. If the slip-ring is hard-wired
                  and the fault is between slip-ring and output socket, check there.
                </span>
                <span className="block">
                  Re-test polarity after each remediation. Do not return to service until polarity
                  passes end-to-end. Document the fault category and the remediation.
                </span>
              </>
            }
            whyItMatters="A reversed extension reel sends every Class I appliance plugged into it into the same single-pole-switch failure mode. The fault is potentially fatal and is a categorical fail until remediated."
          />

          <CommonMistake
            title="Skipping the polarity test on extension leads because they look like simple cord"
            whatHappens="Extension leads are remade and re-plug-topped frequently — they are exactly the population of equipment most prone to polarity errors. A cord re-fitted with the brown and blue conductors swapped at the plug looks identical externally; only the polarity test catches it. Skipping the test on the assumption that &lsquo;it has been working&rsquo; misses faults that have been live for years."
            doInstead="Polarity-test every extension lead at every PAT cycle. The test takes seconds on an automatic tester and is the only positive verification of correct wiring. The categorical fail rate on extension leads is non-trivial — IET CoP statistics suggest a small but consistent percentage of in-service extension leads have polarity faults at any given time."
          />

          <CommonMistake
            title="Treating green/yellow on a line pin as a paperwork issue"
            whatHappens="A re-wireable plug is opened during a fail investigation and the green/yellow conductor is found connected to the L pin, with the brown conductor on the E pin. The fitter labels &lsquo;Polarity reversed — fix paperwork&rsquo; and rewires it. Two days later, a different appliance with the same lead develops a fault and the chassis is at 230 V because of an entirely separate problem — but the historical mis-wiring contributed to the failure mode."
            doInstead="A green/yellow on a line pin is a category of fault that demands more than a simple swap-and-retest. Investigate why the cord was wired that way: was it a recent repair? Who did the repair? What other cords / equipment may have come from the same source? Document the finding, escalate to the duty-holder under HSG107, and check related equipment. The single fault is fixed in seconds; the systemic risk takes longer to address."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.6"
            clause={
              <>
                A test of polarity shall be made and it shall be verified that every fuse,
                single-pole control device and switch is connected in the line conductor only.
                Edison-screw and similar lampholders, except E14 and E27 lampholders to BS EN 60238
                in which the outer or screwed contact connects to the neutral conductor, and that
                wiring is correctly connected to socket-outlets and similar accessories.
              </>
            }
            meaning="The fixed-installation polarity duty is line-conductor exclusive: every single-pole device interrupts line. PAT polarity on cord-sets is the same principle in shorter wiring — the cord must preserve line-on-the-line-pin from BS 1363 input to appliance / IEC output."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The fuse-rating check that sits alongside polarity</ContentEyebrow>

          <ConceptBlock
            title="BS 1362 fuses — matching the rating to the load"
            plainEnglish="A BS 1363 plug contains a BS 1362 fuse. The fuse protects the flex from short-circuit fault current. The rating must match the appliance load and the flex csa. A 13 A fuse on a 0.5 mm² flex is non-compliant; a 3 A fuse on a 1800 W appliance nuisance-trips."
          >
            <p>
              BS 1362 fuses come in standard ratings: 1, 3, 5, 7, 10 and 13 amperes. The two most
              common in practice are 3 A (for low-current appliances under approximately 700 W
              steady-state) and 13 A (for general appliances up to the BS 1363 rated 13 A maximum).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Appliance load</th>
                    <th className="text-center text-white/80 py-2">Steady current (230 V)</th>
                    <th className="text-center text-elec-yellow py-2">BS 1362 fuse</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Desk lamp / phone charger / radio</td>
                    <td className="text-center">&lt; 0.5 A</td>
                    <td className="text-center text-elec-yellow">3 A</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">TV / monitor / printer</td>
                    <td className="text-center">~ 1–3 A</td>
                    <td className="text-center text-elec-yellow">3 A or 5 A</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Hairdryer / vacuum / hand power tool</td>
                    <td className="text-center">~ 5–8 A</td>
                    <td className="text-center text-elec-yellow">13 A</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Kettle (3 kW)</td>
                    <td className="text-center">~ 13 A</td>
                    <td className="text-center text-elec-yellow">13 A</td>
                  </tr>
                  <tr>
                    <td className="py-2">Iron / fan heater (2 kW)</td>
                    <td className="text-center">~ 9 A</td>
                    <td className="text-center text-elec-yellow">13 A</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              IET CoP Ch 15 and BS 1363 require the fuse rating to be appropriate to the appliance
              and the supply flex csa. A wrong-rated fuse — especially over-rated — fails the
              inspection and removes the appliance from service until the correct fuse is fitted.
              The BS 1362 fuse is itself a serviceable component: its glass body should not be
              cracked, the fuse element should not be visibly degraded, and the fuse should not be
              loose in the carrier.
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

          <ContentEyebrow>Recording the result</ContentEyebrow>

          <ConceptBlock
            title="What goes on the cord-set / lead record"
            plainEnglish="A polarity pass record is binary at the test level (pass or fail) but carries adjacent metadata that matters for trend and audit."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Polarity result:</strong> pass / fail. On fail, the failure mode (L–N
                reversed, L–E reversed, conductor missing) recorded explicitly.
              </li>
              <li>
                <strong>BS 1362 fuse rating:</strong> the fuse rating found at inspection (3 A, 13
                A, etc). On any re-wireable plug, the fuse rating verification is part of the
                polarity / inspection workflow.
              </li>
              <li>
                <strong>Conductor colour code:</strong> modern (brown/blue/green-yellow) or pre-2004
                (red/black/green). Pre-2004 cord is flagged for replacement.
              </li>
              <li>
                <strong>Plug type:</strong> moulded (factory) or re-wireable (serviceable). Moulded
                plugs are inspected visually only; re-wireable plugs go through the full
                polarity-and-fuse check.
              </li>
            </ul>
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
            title="What to remember on the bench"
            points={[
              'Polarity testing under IET CoP Ch 15 targets cord-sets, IEC leads, extension leads, and re-wireable plugs — equipment where the conductor identification can be wrong. Sealed moulded-plug appliances are visually inspected at the plug only.',
              'Modern UK colour code (post-2004): brown = line, blue = neutral, green/yellow = protective conductor. Pre-2004 (red/black/green) is electrically equivalent but a flag for replacement.',
              'BS 1363 plug face view: earth at top (longer pin), line on the right, neutral on the left.',
              'A reversed cord-set defeats every single-pole switch on the supply side — appliance switch, FCU, plug fuse all end up in neutral. Reg 643.6 exists specifically to prevent this in the fixed installation; PAT polarity extends the principle to the appliance side.',
              'Automatic PAT testers run polarity as a pin-to-pin continuity check. A failure shows the swapped pair so the operator can find and remediate the fault.',
              'BS 1362 plug-fuse rating must match appliance load. Common fits: 3 A (under ~700 W), 13 A (general). Wrong rating fails the inspection — over-rated fuses do not protect the flex.',
              'A green/yellow conductor on a line pin is a category-of-its-own dangerous fail. Hard fail, immediate removal, investigate systemic causes.',
              'Polarity is the third test in the IET CoP sequence: earth continuity → IR → polarity → leakage → functional.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Do I have to polarity test moulded-plug sealed appliances?',
                answer:
                  'Not as a measurement — IET CoP Ch 15 directs the polarity test specifically at re-wireable plugs and cord-sets where the conductor identification is exposed to error. Moulded-plug appliances are factory-built and the conductor identity is taken as factory-correct. Visual inspection of the plug (intact moulding, no signs of damage or rework) is the relevant check. If a moulded plug shows signs of having been opened or rebuilt, treat it as a re-wireable plug for the test.',
              },
              {
                question:
                  'What if the appliance is double-pole switched? Does polarity still matter?',
                answer:
                  'Yes. Even with a double-pole appliance switch, the BS 1362 plug fuse, the fixed-installation FCU (where present), and the wider RCD / MCB chain all rely on line-side identification. A reversed cord puts the plug fuse on the neutral side, undermines fixed-installation isolation, and confuses any subsequent diagnostic work. Polarity on the cord-set must be correct regardless of the appliance internal switching configuration.',
              },
              {
                question:
                  'I find a BS 1363 plug wired with brown and blue swapped. Is that a one-off mistake or a systemic problem?',
                answer:
                  'Treat the first finding as an isolated repair error and remediate. If you find a second cord-set from the same source / department with the same fault, escalate. Multiple polarity errors from the same source point to a procedural problem (training, or a fitter who has the colour codes confused), and the duty-holder under HSG107 needs to know so corrective action can extend across the equipment cohort.',
              },
              {
                question:
                  'A C7 figure-of-eight cord (small appliance, two-pin, no earth) — does polarity still apply?',
                answer:
                  'C7 figure-of-eight connectors are non-polarised by design — they can be inserted either way. The corresponding C8 inlet at the appliance is also non-polarised. Polarity testing in the conventional sense does not apply to a C7/C8 cord because there is no defined L/N orientation. C7 is used only on Class II equipment (no protective conductor), where the appliance is designed to be polarity-independent. PAT for these cords focuses on earth continuity (N/A for Class II), IR, and visual inspection of the connector and cord.',
              },
              {
                question: 'Should I check the cord earth continuity inside the polarity test?',
                answer:
                  'Earth continuity is a separate test (M4.1) and should be performed before polarity. The polarity test confirms that the earth pin connects to the green/yellow conductor — i.e. that the earth conductor goes to the right pin — but does not measure the resistance of that earth path. The two tests are complementary: earth continuity measures resistance, polarity confirms identification.',
              },
              {
                question:
                  'What about industrial BS EN 60309 (CEE) plugs and sockets — different polarity rules?',
                answer:
                  'BS EN 60309 industrial plugs are mechanically polarised by design (different pin layouts for different voltages and phases) but the same conductor-identification principle applies inside: brown / black / grey for three-phase lines, blue for neutral, green/yellow for protective. PAT polarity for industrial cord-sets follows the same pin-to-conductor logic with the additional check that the L1/L2/L3 phase rotation matches the equipment requirement (covered at commissioning rather than at PAT level for portable equipment).',
              },
              {
                question: 'Is the polarity test the same as the "phase rotation" test?',
                answer:
                  'No. Polarity is single-phase: line, neutral, earth identification on each conductor. Phase rotation is three-phase: confirming the L1/L2/L3 sequence is correct so a three-phase motor turns the right way. Phase rotation is verified at fixed-installation commissioning and on three-phase portable equipment with a phase-rotation indicator instrument; it is not part of the routine single-phase PAT for ordinary portable appliances.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Polarity testing of cords and leads — PAT M4.3" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-4-section-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.4 Touch current and leakage testing
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

export default PATTestingModule4Section3;
