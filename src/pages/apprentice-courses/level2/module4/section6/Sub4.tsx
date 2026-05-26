/**
 * Module 4 · Section 6 · Sub 4 — Test polarity
 * Maps to City & Guilds 2365-02 / Unit 204 / LO6 / AC 6.4
 *   AC 6.4 — "Test polarity"
 *
 * Frame: polarity verification per BS 7671 Reg 643.6 — every fuse and
 * single-pole protective/control device shall be in the line conductor only,
 * Edison-screw / centre-contact bayonet lampholders shall have outer/screwed
 * contact on neutral, and wiring is correctly connected throughout. The dead
 * polarity test uses a continuity instrument working point-by-point from the
 * incoming line at the consumer unit out to every accessory on every circuit.
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

const TITLE = 'Test polarity | Level 2 Module 4.6.4 | Elec-Mate';
const DESCRIPTION =
  'Polarity verification per BS 7671 A4:2026 Reg 643.6 — fuses and single-pole devices in the line, line on the correct terminal at every accessory, and the continuity-based dead test that proves it.';

const checks = [
  {
    id: 'm4-s6-sub4-where-is-line',
    question:
      'On a UK 13 A BS 1363 socket-outlet (face on, looking at the front), which terminal is the line?',
    options: [
      'To increase penalties and make more offences triable either way',
      'Right-hand pin / terminal as you face the socket.',
      'Some faults only appear under load conditions',
      'Yes, if protective devices are fitted',
    ],
    correctIndex: 1,
    explanation:
      'BS 1363 convention: looking at the face of a single 13 A socket with the earth pin at the top, the right-hand pin (and terminal at the back) is line, the left-hand pin is neutral, the top centre pin is earth. Mnemonic: "right is right" — line on the right, where the right-hand person on a building site finds it. Polarity test confirms the line connection on the back of the socket actually goes to that right-hand pin.',
  },
  {
    id: 'm4-s6-sub4-socket-tester-trap',
    question: 'A plug-in socket tester (the three-LED kind) shows "OK" at every socket on a circuit. Polarity proven?',
    options: [
      'Toolbox talks are short pre-shift safety briefings on a single topic — the RAMS for the day, a recent near-miss, a seasonal hazard. They keep the formal RAMS active in the day-to-day work. Recorded with attendance. Together with the RAMS sign-on they form the daily safety briefing chain.',
      'Activate the last-30-minutes triage protocol: count the remaining items, sort into \\\\\\\\\\\\\\\'quick win\\\\\\\\\\\\\\\' (90s each), \\\\\\\\\\\\\\\'medium\\\\\\\\\\\\\\\' (2-3 min each), \\\\\\\\\\\\\\\'pure guess\\\\\\\\\\\\\\\' (10s each). Clear the quick wins first to bank marks, then medium, then guess-sweep the pure-guess items in the final 2-3 minutes. Confirm no blanks at the bell.',
      'The gateway is formally opened with the EPAO, who will then schedule the EPA components within the timeframe specified in the assessment plan — there is typically a period between gateway and EPA for final preparation',
      'No — a socket tester is a verification tool only and CAN show "OK" with reversed polarity if there is a fault that masks it (e.g. a borrowed neutral that completes the circuit through another path). Confirm with a continuity test from the consumer unit before signing off.',
    ],
    correctIndex: 3,
    explanation:
      'IET GN3 and the manufacturers of socket testers are explicit: socket testers are an indication tool, not a verification instrument. They can give a misleading "OK" if the wiring has a particular fault pattern that completes the indicator circuit via an unexpected path. Use them as a quick first-pass sanity check, but the dead polarity test (continuity from the CU outwards) is the one that proves compliance with Reg 643.6.',
  },
  {
    id: 'm4-s6-sub4-two-way-switching',
    question:
      'Testing polarity on a 2-way hall light: switch S1 has terminals COM, L1, L2; switch S2 has matching terminals. The strap conductors run between L1-L1 and L2-L2. The line feeds in at COM of S1; the switched line feeds out from COM of S2. With both switches set so the lamp is OFF, which dead continuity reading should you expect at S2 between COM and L1?',
    options: [
      'Acknowledge the client\\\'s concern, explain clearly what was agreed and delivered, maintain professional boundaries, and document the conversation — reviews based on genuine experience are fair, but threats to extort free work should not be rewarded',
      'Check the light curtain alignment, clean the lenses, inspect for environmental contaminants (dust, coolant mist), verify the safety relay status, check wiring connections, review the maintenance history for recurring issues, and ensure the safety distance calculation is still valid',
      'Recognise the combination of hazards as significant, evaluate the risk as substantial, and recommend the board be de-energised for inspection and remedial work before maintenance proceeds',
      'Open (OL) when S2 toggle is in the L2 position; closed when toggled to L1. Test both positions and confirm the meter responds correctly to switch action — that proves the switching mechanism is wired to the line rather than the neutral.',
    ],
    correctIndex: 3,
    explanation:
      'For a properly wired 2-way switch, the COM is the common pole and the meter reads open or closed to L1 / L2 depending on toggle position. Testing both positions verifies the switch is in the line, not the neutral (a common fault where someone wired switching into the neutral conductor). The same goes for the lamp itself — switched line goes to the centre contact of the lampholder; neutral goes to the outer screw thread (Reg 643.6(b)).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 7671 A4:2026 Reg 643.6 lists three things that must be verified during the polarity test. Which set?',
    options: [
      '32 A continuous duty — with no diversity reduction applied, since EV charging is a continuous load that draws rated current for extended periods (several hours), the cable must be sized for 100% of the rated current using the appropriate correction factors from BS 7671 Appendix 4',
      '(a) Every fuse and single-pole control / protective device is in the line conductor only; (b) for circuits with an earthed neutral, ES and BC lampholders have the outer or screwed contacts connected to neutral (except E14/E27 to BS EN 60238); (c) wiring is correctly connected throughout.',
      'In stages — during erection (first-fix verification of buried items before cover-up), at second-fix completion, and final at energisation. Reg 641.1 explicitly covers "during erection and on completion".',
      'Consistently testing installations to standard even when unsupervised, documenting results accurately, and proactively addressing any issues found — because your internal standards drive your behaviour, not external monitoring',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.6 verbatim sets out three checks: line-side single-pole device placement, lampholder outer-contact polarity, and overall correctness of wiring connections. The polarity test must address all three — it is not just about whether the line goes to the right terminal of a socket.',
  },
  {
    id: 2,
    question: 'A single-pole switch in the neutral conductor would be:',
    options: [
      'Simulate the control conditions (setpoints, alarm triggers, timer events) and verify that the system responds with the correct output actions in the correct sequence and within the specified time parameters',
      'To plan, manage and monitor the construction phase and co-ordinate matters relating to it to ensure that, so far as is reasonably practicable, construction work is carried out without risks to health or safety. The PC produces the Construction Phase Plan and updates it as the project evolves.',
      'A non-compliance with BS 7671 because when the switch is open the line conductor remains live to the load — anyone working on the load thinks it is dead but the line is still energised. Reg 643.6(a) requires single-pole switches in the line.',
      'Complete and sign the documentation for their own scope of responsibility, clearly note the outstanding sign-off, and arrange for the responsible person to review and sign at the earliest opportunity',
    ],
    correctAnswer: 2,
    explanation:
      'The principle: a single-pole switching device must isolate the live (dangerous) conductor when open. On a 230 V single-phase TN system the neutral is at or near earth potential when nominally healthy, but the line is at 230 V to earth. Switching the neutral leaves the line connected to the load — anyone touching it believes the load is off and gets a shock. Reg 643.6(a) and Reg 537.2.2 both reinforce this requirement.',
  },
  {
    id: 3,
    question: 'You are testing polarity at a 13 A unswitched FCU feeding an immersion heater. With the FCU isolated and the cable disconnected from the consumer unit at the line, what continuity reading would prove correct line polarity into the FCU?',
    options: [
      '100 percent of the largest ring final + 40 percent of the next + 30 percent of any remaining rings (or similar — the exact wording depends on the OSG edition).',
      'All foreseeable hazards including atmospheric, physical, biological, and those introduced by the work activity, along with the control measures required',
      'A detector that uses a light source and photosensor to detect smoke particles by light scattering; most effective at detecting slow-smouldering fires that produce large visible smoke particles',
      'Low-resistance continuity between the line of the incoming cable and the L (line) terminal of the FCU; OL between the line of the incoming cable and the N terminal of the FCU.',
    ],
    correctAnswer: 3,
    explanation:
      'Polarity by continuity: with the supply end of the cable disconnected at the CU, you inject a test signal into the line conductor and verify it appears only at the L terminal of the accessory, never at the N terminal. Continuity L-to-L reads low; continuity L-to-N reads OL. If you get continuity L-to-N you have the line and neutral swapped somewhere in the cable run — track it down before energising.',
  },
  {
    id: 4,
    question: 'After a successful dead polarity test, polarity must also be confirmed live as part of the live test sequence. Why both?',
    options: [
      'The dead test proves the wiring is correct between conductor identification at the CU and conductor identification at the accessory. The live test (using an approved voltage indicator at the accessory after first energising) confirms that the assumed L conductor at the CU actually carries the supply line — the dead test cannot detect a labelling error or a reversed connection at the meter tails.',
      'Sign in, get a brief visitor induction, wear correct PPE, and be escorted by the Site Manager or a senior member of the contractor\\\'s team. For a client representative the escort is usually the Project Manager or Site Manager because they\\\'ll want to talk through progress, snags and any commercial issues.',
      'Because the terminal is engineered to clamp at a specific force range — too little, the conductor isn\\\'t held firmly and the joint runs hot; too much, the parts deform and crack. The published value is the engineering specification. BS 7671 134.1.1 says installations must comply with manufacturers\\\' instructions; ignoring the published torque value breaches 134.1.1 directly. NICEIC / NAPIT scheme assessments check this at audit.',
      'Combination pliers — heavy-duty grip, twisting solid conductors, pulling cable through tight runs, light cutting of soft material. Side cutters (sometimes called diagonal cutters or \\\'snips\\\') — flush cutting of insulated and bare conductor, trimming cable ends. Long-nose pliers — forming loops, reaching into recessed terminals, holding small components while you tighten. One job each, no overlap if you can help it.',
    ],
    correctAnswer: 0,
    explanation:
      'The dead test verifies the wiring of the installation — line in CU goes to L at every accessory. The live test verifies that what you called "line" at the CU is in fact the supply line and not the neutral (which can happen if meter tails were swapped at installation, or in rare cases of incorrect DNO supply). Both tests are needed for complete polarity verification. The live test uses an approved voltage indicator and is part of the live-test sequence after first energisation.',
  },
  {
    id: 5,
    question: 'A bayonet (BC) lampholder per BS 7671 Reg 643.6(b) — which contact must be connected to the neutral?',
    options: [
      'A heat loss calculation to BS EN 12831 (or equivalent) for the property, sized to meet the design heat load at the design external temperature, with emitter sizing for low flow temperatures',
      'The outer or screwed contact (the metal cup that the bulb base contacts when twisted in). Centre contact = switched line. This is so that even with the bulb removed, no live metalwork is exposed to a person fitting the next bulb.',
      'A progressive deterioration that requires investigation — possibly bearing wear, insulation degradation, ventilation blockage, or increasing load — before the motor fails catastrophically',
      'Specified in the assessment plan — usually 2-4 weeks, allowing time for the EPAO to assign an assessor, for the assessor to review your portfolio, and for final preparation',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.6(b) — for circuits having an earthed neutral conductor, centre-contact bayonet (BC) and Edison-screw (ES) lampholders have the outer or screwed contacts connected to the neutral. Mnemonic: "outer = neutral, centre = switched live". A reversed BC fitting leaves the threaded outer cup at line voltage — touching it while changing a bulb gives a 230 V shock. E14 and E27 lampholders to BS EN 60238 are exempted because their construction provides the necessary protection; standard ES and BC are not exempted.',
  },
  {
    id: 6,
    question: 'You discover during polarity testing that a junction box in the loft has the line and neutral swapped on one outgoing tail. The CU end is correct. What\'s the safe approach?',
    options: [
      'Generally inferred from cable size, length, and design data; physical measurement only required if compliance is in doubt — limits are 3% (lighting) and 5% (other) of nominal',
      'Offensive, intimidating, malicious, or insulting behaviour, or an abuse of power, that undermines, humiliates, or causes physical or emotional harm to someone',
      'Re-make the junction box terminations correctly so line continues as line and neutral as neutral throughout. Document the corrected fault. Re-test polarity to confirm. Never compensate for one error by introducing another.',
      'Low-resistance continuity between the line of the incoming cable and the L (line) terminal of the FCU; OL between the line of the incoming cable and the N terminal of the FCU.',
    ],
    correctAnswer: 2,
    explanation:
      'The fix is always to correct the wiring back to compliance — line is line, neutral is neutral, throughout the installation. Compensating by deliberately reversing at the CU would create a downstream installation that passed continuity polarity tests but failed live polarity (because the supply line would arrive at terminals labelled neutral). It would also create chaos for anyone working on the installation in future. Re-make the junction box, retest, document, move on.',
  },
  {
    id: 7,
    question: 'Polarity testing on a circuit with both a 2-way switching arrangement and an intermediate switch in the middle. How do you test the polarity of the strap conductors?',
    options: [
      'First-issue ECS card typically £36-40 (varies by grade and route). Three-yearly renewal similar cost. ECS H&S Assessment fee around £20-30 at most testing centres. Specialist endorsements have separate course costs (CompEx 5-day course around £1,000-1,500; AM2S around £400-600 plus prep). Employers often pay the card and H&S fees for employed staff; self-employed cover their own.',
      'Production stop-times. Industrial sites typically run continuous or shift-based production, and electrical work that requires isolation has to fit within scheduled outages or planned shutdowns. The prep includes coordinating with plant operations, integrating with the site lockout/tagout system, observing any ATEX zones in process plants, and often working out-of-hours so the production line isn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t affected.',
      'The arrangements for ensuring there are suitable welfare facilities, the site rules (if any), and any specific measures concerning work falling within Schedule 3 (high-risk work such as work near or over water, involving diving, in a caisson, involving explosives, etc.)',
      'Set the switches to a known closed position, then continuity-test from line at the CU through to the switched-line terminal of the lamp. Toggle each switch in turn and verify the meter responds correctly at every step. The intermediate switch should swap the strap connections when toggled — the meter should show this in the continuity readings.',
    ],
    correctAnswer: 3,
    explanation:
      'Multi-way switching has multiple strap conductors and an intermediate switch that crosses the straps over when toggled. Polarity test: set all switches to a position that closes the circuit, continuity test from CU L to lamp switched-line. Then toggle each switch in sequence and confirm the meter responds appropriately. The intermediate switch toggling should reverse the strap connections — confirmed by continuity changes between the strap terminals at the intermediate switch when toggled.',
  },
  {
    id: 8,
    question: 'Where on the schedule of test results does the polarity result go?',
    options: [
      'A dedicated polarity column on the per-circuit row of the STR, usually a tick or a P/F. The Schedule of Inspections also records polarity verification at a higher level. If polarity fails at sign-off the EIC cannot be issued — Reg 644.1.1 requires defects to be corrected before certification.',
      'Understand why different assets have different maintenance strategies, contribute to criticality assessments using their operational knowledge, prioritise their own work based on asset criticality, and explain to colleagues why maintenance effort varies between assets',
      'Recognise that direct eye contact norms vary significantly across cultures — in many cultures, avoiding direct eye contact is a sign of respect, not evasion. Adjust your communication style to accommodate cultural differences rather than interpreting through your own cultural lens',
      'A loose terminal was not gas-tight, oxidisation built up at the contact face over weeks, contact resistance climbed, the joint heated under any current draw, the heat softened the terminal screw and conductor, and the connection failed mechanically. Reg 526.1 (durable electrical continuity and adequate mechanical strength) failure.',
    ],
    correctAnswer: 0,
    explanation:
      'The IET model STR has a dedicated polarity column per circuit (typically a tick box or a Pass/Fail). The Schedule of Inspections also confirms polarity at the installation level. Reg 644.1.1: "For a new installation, any defect or omission revealed during the inspection and testing shall be corrected before the Certificate is issued." Polarity defects are show-stoppers — fix and retest before the EIC is issued.',
  },
];

const faqs = [
  {
    question: 'Why is polarity even a thing on a 230 V single-phase circuit — both ends of the load are connected, surely it doesn\'t matter which way the current flows?',
    answer:
      'For the LOAD operation, polarity does not matter on AC — current alternates 50 times a second. For SAFETY, polarity matters enormously because of single-pole switching and protective device placement. On a properly polarised circuit, opening the switch breaks the line conductor and the load goes dead. On a reverse-polarised circuit, opening the same switch breaks the neutral but leaves the load connected to line — anyone working on the load thinks it is dead and gets a shock. The single-pole device convention only protects you if the line is on the correct side.',
  },
  {
    question: 'What\'s the difference between dead polarity testing and live polarity testing?',
    answer:
      'Dead polarity test (this Sub) uses a low-resistance continuity instrument while the circuit is isolated. It verifies the wiring inside the installation — line at the CU goes to the L terminal at every accessory. Live polarity test happens after first energisation as part of the live test sequence. It uses an approved voltage indicator (or a multifunction tester\'s voltage range) at every accessory to confirm that what was called "line" at the CU is in fact the supply line carrying 230 V to earth — i.e. that the supply itself was not reversed at the meter tails. Both are required for full polarity verification.',
  },
  {
    question: 'Do I need to test polarity at every single accessory, or can I sample?',
    answer:
      'Initial verification (new install or major alteration): test every accessory. The polarity test is fast — a single continuity reading per terminal — and the consequences of missing a reversed accessory are serious. Periodic inspection (EICR): sample-based, with the inspector\'s judgement guided by IET Guidance Note 3 and the type of installation. Higher-risk installations (special locations, commercial kitchens, anywhere amateur DIY may have happened between inspections) get tested more thoroughly.',
  },
  {
    question: 'What if the customer has fitted their own light fitting after the test and reversed the polarity?',
    answer:
      'Document on the EIC and STR what polarity was tested at sign-off. After handover, the customer\'s alterations are their responsibility, and a future EICR will pick up any reversed-polarity fittings as a coded defect. If the customer reports a dangerous incident shortly after a test you carried out, your records of polarity at sign-off are your defence. Some installers fit tamper-evident covers on key switches and accessories to detect post-handover changes.',
  },
  {
    question: 'Polarity at a 3-phase installation — what does the test cover?',
    answer:
      'Three-phase needs both polarity (each line conductor going to its labelled terminal at every accessory) AND phase sequence (L1-L2-L3 in correct rotational order, important for motors and three-phase loads). Polarity test as for single-phase but for each line conductor in turn. Phase sequence is verified separately using a phase-rotation instrument — Reg 643.9 covers this. On a single-phase install you do not need to worry about phase sequence; on three-phase commercial and industrial it is mandatory.',
  },
  {
    question: 'My continuity meter shows a reading on what should be an "OL" path during polarity testing — what could cause that?',
    answer:
      'A few possibilities. (1) An accidental cross-connection at a back-box where line and neutral conductors have been twisted together by mistake or for testing convenience. (2) A borrowed neutral from another circuit completing a path through the load. (3) A transformer or capacitor in the load path providing a low-resistance DC path. (4) Operator error — the meter is reading the wrong terminals. Investigate methodically: re-check the test setup, work back from the reading point towards the CU, isolate sections to localise. Most "phantom" continuity readings turn out to be one of these four causes.',
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 4 · Section 6 · Subsection 4"
            title="Test polarity"
            description="Verify line is on the correct terminal at every accessory, that single-pole switches and fuses are in the line conductor, and that lampholder centre contacts are line, outer contacts are neutral. Dead test by continuity from CU outwards."
            tone="emerald"
          />

          <TLDR
            points={[
              'BS 7671 A4:2026 Reg 643.6 requires three things: every single-pole fuse / control device is in the line conductor only; ES and BC lampholders have outer/screwed contacts on neutral (except E14/E27 to BS EN 60238); and wiring is correctly connected throughout.',
              'The dead polarity test uses a continuity instrument from the line conductor at the CU out to every accessory on the circuit. Confirms the line connection terminates on the correct (L) terminal at each accessory.',
              'Plug-in socket testers are an indication tool only — they CAN show "OK" with reversed polarity in certain fault configurations. Use the dead continuity test, not the socket tester, for verification per Reg 643.6.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the line, neutral and earth terminals of common UK accessories — 13 A socket, FCU, ceiling rose, BC lampholder, ES lampholder.',
              'Carry out a dead polarity test by continuity from the consumer unit out to every accessory on a circuit.',
              'Test 2-way and intermediate switching arrangements — confirming the switch mechanism is in the line conductor.',
              'Cite Reg 643.6 (the three polarity verification requirements) and Reg 537.2.2 (semiconductor devices not isolating).',
              'Differentiate dead polarity testing from live polarity testing and explain why both are required for full verification.',
              'Recognise and correct common polarity defects: reversed L/N at a junction box; line in the neutral conductor at a switch; reversed BC lampholder.',
              'Record polarity results on the Schedule of Test Results and confirm sign-off readiness.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Why polarity matters</ContentEyebrow>

          <ConceptBlock
            title="Single-pole devices in the line — the safety logic"
            plainEnglish="A single-pole switch breaks one conductor when open. On UK 230 V the line is dangerous (230 V to earth) and the neutral is normally near earth potential. The switch must break the line so when off the load is genuinely dead."
            onSite="Reverse polarity = switch in the neutral. Open the switch and the load looks dead at the controls but the line is still connected. Touch the live terminal of a light bulb expecting it to be off → 230 V shock."
          >
            <p>
              The single-pole switching convention is the foundation of UK domestic and small
              commercial electrical safety. Single-pole switches and fuses are placed in the line
              conductor (not the neutral) so that when they open, the load is properly isolated
              from the supply.
            </p>
            <p>
              On a TN system at 230 V single-phase:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Line conductor</strong> — at 230 V to earth in normal operation. This is
                the dangerous one.
              </li>
              <li>
                <strong>Neutral conductor</strong> — bonded to earth at the supply transformer.
                Nominally at or very close to earth potential under normal conditions.
              </li>
              <li>
                <strong>CPC</strong> — at earth potential, providing the fault clearance path.
              </li>
            </ul>
            <p>
              Single-pole switching of the line is what makes the off position safe: the line is
              broken, no current can flow, the load (and any exposed metalwork on the load side)
              sits at neutral / earth potential. Reverse the polarity and that safety guarantee
              vanishes — the off switch is now in the neutral, the line is still connected, and
              touching what looks like a dead terminal completes a circuit through your body to
              earth.
            </p>
            <p>
              The polarity test is the dead test that proves the switching device is in the
              correct conductor. It is also the test that proves line, neutral and CPC are
              correctly identified at every accessory throughout the installation.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.6 (Polarity) — verbatim, edited for length"
            clause="Where relevant, the polarity of the supply at the origin of the installation shall be verified before the installation is energized. Where single-pole switching devices are not permitted in the neutral conductor, a test shall be made to verify that all such devices are connected in the line conductor(s) only. During the polarity test, it shall be verified that: (a) every fuse and single-pole control and protective device is connected in the line conductor only; and (b) except for E14 and E27 lampholders to BS EN 60238, in circuits having an earthed neutral conductor, centre contact bayonet and Edison screw lampholders have the outer or screwed contacts connected to the neutral conductor; and (c) wiring has been correctly connected throughout the installation."
            meaning={
              <>
                Three explicit verifications: (a) all single-pole devices in the line; (b) BC and
                ES lampholders correctly orientated (outer = neutral, centre = line); (c) overall
                correctness of conductor identification through the installation. The polarity
                test must address all three. The opening sentence — verify supply polarity before
                energising — is also notable: a swapped supply at the meter tails would corrupt
                every downstream test, so supply polarity comes before installation polarity.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.6."
          />

          <SectionRule />

          <ContentEyebrow>Where the line goes — accessory-by-accessory map</ContentEyebrow>

          <ConceptBlock
            title="The line connection at every common UK accessory"
            plainEnglish="At a 13 A socket: line on the right (looking at the face). At a single-pole switch: line on COM. At a BC lampholder: line on the centre contact."
            onSite="Polarity test verifies the line connects to these specific terminals — anywhere else and it\'s a fail."
          >
            <p>The standard line connection points by accessory type:</p>

            <div className="hidden sm:block bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[13px]">
              <div className="grid grid-cols-2 gap-3 text-white/90">
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Accessory</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Line terminal</div>

                <div>BS 1363 13 A socket-outlet (face on)</div>
                <div>Right-hand pin / terminal (L)</div>

                <div>13 A switched FCU</div>
                <div>L (line) terminal — usually marked. Switch breaks the line.</div>

                <div>13 A unswitched FCU (loop terminals)</div>
                <div>L of incoming = L of outgoing; switch (none) does not break</div>

                <div>1-way single-pole light switch</div>
                <div>L incoming → COM. Switched line → terminal marked L1 (or just out)</div>

                <div>2-way light switch</div>
                <div>L incoming → COM. Strap conductors → L1 and L2</div>

                <div>Intermediate switch (4-terminal)</div>
                <div>Two pairs of strap terminals; line never appears at intermediate switch</div>

                <div>BC bayonet lampholder</div>
                <div>Centre contact = switched line; outer cup = neutral</div>

                <div>ES Edison-screw lampholder</div>
                <div>Centre contact = switched line; screw thread = neutral (per Reg 643.6(b))</div>

                <div>Ceiling rose (loop-in)</div>
                <div>L loop-in terminal block; switched L from switch via SL terminal</div>

                <div>13 A plug-top (BS 1363)</div>
                <div>Brown core to right-hand pin (L); blue to left (N); G/Y to top (E)</div>
              </div>
            </div>

            <div className="sm:hidden space-y-2">
              {[
                { acc: 'BS 1363 13 A socket-outlet (face on)', line: 'Right-hand pin / terminal (L)' },
                { acc: '13 A switched FCU', line: 'L (line) terminal — switch breaks the line.' },
                { acc: '13 A unswitched FCU (loop)', line: 'L of incoming = L of outgoing' },
                { acc: '1-way single-pole switch', line: 'L incoming → COM. Switched line → L1 / out' },
                { acc: '2-way switch', line: 'L incoming → COM. Strap conductors → L1 and L2' },
                { acc: 'Intermediate switch', line: 'Two pairs of strap terminals; line never appears here' },
                { acc: 'BC bayonet lampholder', line: 'Centre contact = switched L; outer cup = N' },
                { acc: 'ES Edison-screw lampholder', line: 'Centre contact = switched L; screw thread = N' },
                { acc: 'Ceiling rose (loop-in)', line: 'L loop-in block; switched L from switch via SL' },
                { acc: '13 A plug-top', line: 'Brown → R pin (L); blue → L pin (N); G/Y → top (E)' },
              ].map((row, i) => (
                <div key={i} className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-3 text-[13px]">
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold">Accessory</div>
                  <div className="text-white/90 mt-0.5">{row.acc}</div>
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">Line terminal</div>
                  <div className="text-white/80 mt-0.5">{row.line}</div>
                </div>
              ))}
            </div>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The dead polarity test — method</ContentEyebrow>

          <ConceptBlock
            title="Polarity by continuity, point by point"
            plainEnglish="Disconnect the line of the circuit at the CU. Inject a continuity test signal into the line conductor. At each accessory, confirm continuity to the L terminal only — and OL between the test signal and the N terminal."
            onSite="The same instrument and same lead nulling as the continuity test (Sub 1). Polarity test is fast — a couple of seconds per terminal — but skipping it is a categorical fail at sign-off."
          >
            <p>The standard dead polarity test sequence on a domestic circuit:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Verify safe isolation.</strong> Per JIB sequence.
              </li>
              <li>
                <strong>At the CU:</strong> disconnect the line of the circuit from the protective
                device. Leave the neutral and CPC connected (they\'re your reference paths to the
                meter via the bus bars). Connect one MFT continuity lead to the disconnected line
                conductor at the circuit cable.
              </li>
              <li>
                <strong>At the first accessory:</strong> connect the second MFT lead to the L
                terminal of the accessory. Press TEST. Reading should be a low resistance
                (essentially R1 of that section of cable) — proves continuity from the CU line to
                the accessory\'s L terminal.
              </li>
              <li>
                <strong>Same accessory:</strong> move the second lead to the N terminal of the
                accessory. Press TEST. Reading should be OL — confirms the line is NOT cross-wired
                to the neutral at this accessory.
              </li>
              <li>
                <strong>Repeat for every accessory on the circuit.</strong> Tick off each
                accessory as both readings (low to L, OL to N) confirm correct polarity.
              </li>
              <li>
                <strong>For switches:</strong> test with the switch in both positions. Switch open
                = OL between line and switched-line terminal; switch closed = low resistance.
                Confirms the switch is in the line, not the neutral.
              </li>
              <li>
                <strong>For lampholders (BC and ES):</strong> test continuity from line of CU to
                centre contact (low) and to outer / screw contact (OL). The outer contact must be
                on neutral.
              </li>
              <li>
                <strong>Reconnect the line at the CU.</strong> Document on the STR — single
                pass/fail entry per circuit (or tick column).
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="Why a socket tester isn't enough for polarity verification"
            plainEnglish="Plug-in socket testers (the three-LED kind) are an indication tool — useful for a quick live check. But they are NOT a verification instrument and cannot satisfy the Reg 643.6 polarity requirement on their own. They can be fooled by particular fault patterns into showing 'OK' on a reverse-polarised circuit."
            onSite="Use the socket tester for a fast live check after first energisation. Do NOT use it as the verification instrument for sign-off. The dead continuity test is what goes on the certificate."
          >
            <p>
              The three-LED socket tester (Martindale, Megger 1100, Kewtech LoopCheck-style)
              indicates wiring conditions by which combination of LEDs lights when the tester is
              plugged into a live socket. It's a useful quick check — but the manufacturers
              themselves and IET GN3 are explicit: it is not a safe-isolation proof and not a
              verification instrument.
            </p>
            <p>What the socket tester can miss:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reversed polarity at the supply (meter tails swapped).</strong> The
                tester sees the L pin at 230 V to earth and shows OK — even though that 230 V
                is actually coming from the supply neutral. Live polarity at the CU is the cure.
              </li>
              <li>
                <strong>Borrowed neutral.</strong> A circuit with a borrowed neutral from another
                circuit can present the correct potentials at sockets even when its own L-N
                wiring is reversed. Tester shows OK; protective device opening would not isolate
                the load.
              </li>
              <li>
                <strong>Multiple compounding defects.</strong> Particular combinations can
                produce LED patterns that look like "OK" or that don't match documented fault
                codes. The tester logic can't always distinguish.
              </li>
              <li>
                <strong>It cannot prove safe isolation.</strong> Even if the tester says "no
                voltage" — it could be that the tester is faulty, the test contacts haven't made
                proper contact, or there's a momentary glitch. Always use an approved voltage
                indicator and a proving unit for safe isolation, never a socket tester.
              </li>
            </ul>
            <p>
              The dead continuity polarity test (continuity from CU line out to L of every
              accessory) exercises the actual wiring — line conductor from the CU to the L
              terminal of every accessory, OL to the N terminal — and cannot be fooled by the
              cross-wiring patterns that confuse a socket tester. It's the test that satisfies
              Reg 643.6 and the test that goes in the polarity column of the STR.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Three-phase polarity — sequence vs rotation testing"
            plainEnglish="Three-phase installations need both polarity (each line conductor going to its labelled terminal at every accessory) AND phase sequence/rotation (L1-L2-L3 in correct rotational order). Phase rotation matters for motors, three-phase loads, and parallel operation of generators."
            onSite="Polarity test as for single-phase but for each line conductor in turn. Phase sequence is verified separately with a phase-rotation instrument. Reg 643.9 covers phase sequence."
          >
            <p>The three-phase polarity test process:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Polarity per phase.</strong> Test each line conductor (L1, L2, L3) and
                the neutral as for single-phase — continuity from CU line conductor out to the
                correctly labelled terminal at every accessory. Each line conductor gets its own
                dead polarity test pass.
              </li>
              <li>
                <strong>Phase sequence (rotation).</strong> Live test using a phase-rotation
                instrument — typically a small handheld device with three probes or a clip-on
                indicator. Connect to the three line conductors at the supply or at a
                three-phase outlet. The instrument indicates "correct" (L1-L2-L3 clockwise) or
                "reverse" (L1-L3-L2 counter-clockwise). Most modern MFTs include phase rotation
                as a built-in function.
              </li>
              <li>
                <strong>Why rotation matters.</strong> Three-phase induction motors run in the
                direction set by the phase rotation. A reversed rotation will run the motor
                backwards — fine for a centrifugal pump if you spotted it before commissioning,
                catastrophic for a saw blade or conveyor. Always confirm rotation BEFORE
                connecting the load.
              </li>
              <li>
                <strong>PSC (prospective short-circuit current) indicators.</strong> On
                three-phase, the PSC measurement also confirms balanced phase impedances —
                large discrepancies between phases suggest a broken phase or a poor neutral.
              </li>
            </ul>
            <p>
              Single-phase installs don't need phase sequence — you only have one line. Move to
              three-phase commercial or industrial work and rotation testing becomes a
              fundamental part of every commissioning. Document phase sequence on the STR and
              EIC for any three-phase installation.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Switching circuits — verifying the LIVE wire on the switch side"
            plainEnglish="Two-way and intermediate switching needs careful polarity testing because the switching mechanism crosses conductors. The COM (common) terminal carries the line in one position and is open in the other; the strap conductors swap roles depending on which way the intermediate switch is toggled."
            onSite="Test in every toggle position. The meter should respond predictably to switch action — that's the proof the switching is in the line conductor."
          >
            <p>The polarity test sequence for multi-way switching:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify the wiring scheme.</strong> 2-way is two switches with three
                conductors between them (COM line in, two straps out, COM line out). Intermediate
                adds a 4-terminal switch in the middle that crosses the straps when toggled.
              </li>
              <li>
                <strong>At the first switch (typically the one fed by the line):</strong>
                continuity from CU line to COM should read low resistance (line arrives at COM).
                COM to L1 and COM to L2 vary depending on toggle position — test in BOTH
                positions and verify the reading swaps between L1 and L2 as you toggle. This
                proves the switch mechanism is in the line side, not the neutral.
              </li>
              <li>
                <strong>At the intermediate switch (if fitted):</strong> the four terminals
                form two pairs of strap connections. Test continuity between strap pairs in
                both toggle positions of the intermediate switch — readings should swap
                predictably as you toggle. Line never appears at the COM of an intermediate
                switch (intermediate switches don't have a COM in the same way).
              </li>
              <li>
                <strong>At the last switch (the one feeding the lamp):</strong> continuity from
                CU line through the whole switching chain to COM of the last switch should
                respond to toggle action of every switch in the chain. With all switches in a
                position that closes the circuit, COM of the last switch should read low
                resistance from CU line.
              </li>
              <li>
                <strong>At the lamp itself:</strong> continuity from CU line through the closed
                switching chain to the lamp's switched-line terminal (centre contact for BC/ES)
                should read low. The other terminal (outer/screw for BC/ES) should be on
                neutral — OL from CU line, low from CU neutral.
              </li>
            </ol>
            <p>
              <strong>Common error:</strong> someone wires the strap conductors so the COM at one
              switch is on the L1 strap and the COM at the other is on the L2 strap of the
              opposite switch. The lights still work in 2-way mode (because the loop closes one
              way or the other) but the switching is in the neutral, not the line — a Reg 643.6
              fail. Polarity test in every position catches it.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Polarity at LED drivers, Class II appliances, and electronic loads"
            plainEnglish="Modern equipment classes vary in how much they care about polarity. Class II (double-insulated, no CPC) doesn't need a CPC. LED drivers with internal switched-mode supplies don't care which way mains is connected. But the wiring you DO have must still be correctly polarised — Reg 643.6 applies regardless."
            onSite="Test polarity to every accessory's L and N terminals as standard, even if the load fitted there is Class II or electronically agnostic. The wiring needs to be correct so a future Class I appliance fitted in its place is safe."
          >
            <p>How polarity matters across modern equipment classes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Class I appliances and accessories.</strong> Have an exposed-conductive
                metal enclosure connected to the CPC. Polarity matters absolutely — single-pole
                switching in the line keeps the enclosure safe when the device is off; reverse
                the polarity and the enclosure is at line potential when the switch is open.
              </li>
              <li>
                <strong>Class II (double-insulated) appliances.</strong> No exposed metalwork
                connected to earth — the protection is the double layer of insulation. Polarity
                matters less for the appliance's own safety but the wiring polarity to the
                socket still matters because the appliance can be replaced with a Class I device.
                Test polarity to every socket regardless.
              </li>
              <li>
                <strong>SELV/PELV equipment (12 V LEDs etc.).</strong> The SELV side is below
                the touch-safe threshold (50 V AC); polarity on the SELV conductors doesn't
                affect safety. But the LV primary side of the transformer/driver needs correct
                polarity tested to standard.
              </li>
              <li>
                <strong>LED drivers and switched-mode supplies.</strong> Internally rectify the
                AC input, so the load doesn't care about input polarity. But the wiring to the
                driver still needs correct polarity tested — single-pole switching of the input
                must be in the line conductor.
              </li>
              <li>
                <strong>Electronic dimmers and smart switches.</strong> Often three-wire
                connections (L in, switched L out, N) with internal electronics. Polarity tests
                must verify L in, L out and N are all on the correct terminals per the
                manufacturer's wiring diagram. Manufacturers publish specific wiring diagrams
                because the internal electronics depend on a specific polarity for sensing.
              </li>
            </ul>
            <p>
              The principle: polarity test EVERY accessory's L and N terminal with a continuity
              test from CU line. Whether the current load installed cares about polarity or not
              is irrelevant — the wiring must be correct so any future device installed there is
              safe.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Plug-in socket testers — what they do (and don\'t do)</ContentEyebrow>

          <ConceptBlock
            title="Why a plug-in socket tester is not a substitute for the continuity polarity test"
            plainEnglish="A socket tester lights three LEDs based on which terminals are at what potential when plugged in live. It\'s a useful quick check — but it can be fooled by particular fault patterns and is not a verification instrument."
            onSite="Use the socket tester for a fast first-pass after live testing. Use the dead continuity test for the certificate sign-off. Both have their place — they serve different purposes."
          >
            <p>
              The classic three-LED socket tester (Martindale, Megger 1100, Kewtech Loopcheck-style)
              indicates wiring conditions by which combination of LEDs lights when plugged into a
              live socket. The standard pattern: all three lit = OK; specific outage patterns
              indicate reversed polarity, missing earth, missing neutral, etc.
            </p>
            <p>
              Why it can be fooled:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Borrowed neutral.</strong> A circuit where the neutral is borrowed from
                another circuit can present the correct potentials at the socket terminals even
                when the wiring of THIS circuit is reversed — the indicator pattern says "OK" but
                the protective device on this circuit, when opened, will not actually isolate the
                load.
              </li>
              <li>
                <strong>Reversed polarity at the supply.</strong> If the meter tails are swapped at
                installation, the whole installation runs reversed. A socket tester shows "OK"
                because the L pin is at 230 V to earth — it just happens to be the supply neutral
                that\'s at 230 V because of the reversed tails. Live polarity test at the CU is the
                cure.
              </li>
              <li>
                <strong>Some test patterns are ambiguous.</strong> Particular combinations of
                multiple defects can produce LED patterns that look like "OK" or that don\'t
                match any of the documented fault codes.
              </li>
            </ul>
            <p>
              Use it as a quick sanity check after first energisation. Do not use it as the
              verification instrument for Reg 643.6 — the dead continuity polarity test is the
              one that goes on the certificate.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 537.2.2 (Semiconductor devices) — verbatim"
            clause="Semiconductor devices shall not be used as isolating devices."
            meaning={
              <>
                Cross-references the polarity discussion: a semiconductor switching device
                (electronic switch, SSR, dimmer triac) cannot be relied on as the isolation
                device. Even if it is fitted in the line conductor, it cannot guarantee complete
                isolation when in the off state because semiconductors leak. Mechanical
                single-pole switches in the line are required for isolation. The polarity test
                applies to those mechanical isolators, not to electronic switches that may also
                be present.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 53, Regulation 537.2.2."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="Trusting the socket tester and skipping the continuity polarity test"
            whatHappens={
              <>
                You complete the live tests on a domestic install, plug a Martindale socket tester
                into each socket — all three LEDs light at every socket. You sign off the EIC with
                "polarity verified by socket tester". A few weeks later the customer gets a shock
                from a switched FCU — investigation reveals the FCU has the line and neutral
                reversed (a back-box terminal swap during installation), but the socket tester
                showed OK at the downstream sockets because the cumulative wiring presented the
                correct potentials at those points. You are looking at a defect-correction visit
                and a worried customer.
              </>
            }
            doInstead={
              <>
                Always run the dead continuity polarity test at sign-off, on every accessory of
                every circuit. The continuity test exercises the actual wiring — line conductor
                from the CU to the L terminal of the accessory, OL to the N terminal — and cannot
                be fooled by the cross-wiring patterns that confuse a socket tester. The socket
                tester is a useful live confirmation tool but is not a substitute for the dead
                continuity test required by Reg 643.6.
              </>
            }
          />

          <Scenario
            title="Polarity testing a 2-way hall light arrangement"
            situation={
              <>
                You have just installed a hallway light controlled by a pair of 2-way switches,
                one at the front door and one at the foot of the stairs. The lamp itself is a
                pendant on a BC lampholder. Cabling: line and neutral from the consumer unit run
                up to the rose; switched-line is dropped down to the front-door switch as a
                3-core cable (line, strap, strap); 3-core strap conductors run from front-door
                switch to the stairs switch. Lamp is in OFF position at both switches. You need
                to prove polarity before sign-off.
              </>
            }
            whatToDo={
              <>
                Verify isolation. At the CU, disconnect the line of this circuit. Connect MFT
                continuity probe 1 to the disconnected line conductor.
                <br />
                <br />
                <strong>At the rose:</strong> probe 2 to the loop-in line block (low resistance —
                pass). Probe 2 to the loop-in N block (OL — pass). Probe 2 to the centre contact
                of the BC lampholder lead from the rose (depends on switch positions — see
                below). Probe 2 to the outer / screw contact of the BC lampholder lead (OL — pass,
                proving outer is on neutral).
                <br />
                <br />
                <strong>At front-door switch:</strong> probe 2 to COM terminal (low resistance —
                pass; line arrives at COM via the dropper from the rose). Probe 2 to L1 and L2
                terminals — toggle the switch and verify continuity changes between L1 and L2
                positions. Probe 2 to the back-box CPC (OL — pass, line not bridging to earth).
                <br />
                <br />
                <strong>At stairs switch:</strong> probe 2 to COM (depends on front-door switch
                position — toggle front-door switch and verify the COM at the stairs switch
                changes from L1 to L2 strap connection). Probe 2 to back-box CPC (OL — pass).
                <br />
                <br />
                <strong>Lamp polarity:</strong> with both switches set so the lamp is "on"
                (closed), probe 2 to the centre contact of the BC lampholder. Reading should be
                low resistance through the switching — proves switched line lands on the centre
                contact. Probe 2 to the outer / screw contact — OL — proves the outer is on
                neutral.
                <br />
                <br />
                Reconnect the line at the CU. Tick polarity column on the STR for this circuit.
              </>
            }
            whyItMatters={
              <>
                Multi-way switching is one of the easiest places to introduce a polarity error —
                someone wires "L1" and "L2" the wrong way round, or uses the brown sleeve as the
                strap and the blue as the line, or fits an intermediate switch the wrong way up.
                A live socket tester would not catch any of these errors because there is no
                socket. Continuity polarity testing of every COM, every strap and every lampholder
                terminal is the only way to prove the wiring is correct before energising.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 A4:2026 Reg 643.6 sets out three polarity verifications: (a) all single-pole devices in line; (b) BC/ES outer contacts on neutral; (c) wiring correctly connected throughout.',
              'Single-pole devices in the neutral leave the load connected to line when the switch is open — anyone working on the load gets a 230 V shock thinking the load is dead. Reg 537.2.2 also rules out semiconductors as isolating devices.',
              'Standard line terminal locations: 13 A socket = right-hand pin (face on); single-pole switch = COM; BC/ES lampholder = centre contact (outer = neutral).',
              'Dead polarity test: disconnect line at CU, continuity-test from CU line to each accessory\'s L terminal (low resistance) and to N terminal (OL). Repeat at every accessory.',
              'For 2-way and intermediate switches, test in every toggle position to confirm the switching mechanism is in the line, not the neutral.',
              'Plug-in socket testers are an indication tool only — they CAN show "OK" with reversed polarity in certain configurations. Use the dead continuity test for verification.',
              'Live polarity test (after first energisation, with an approved voltage indicator) confirms the SUPPLY polarity is correct — i.e. that what you called "line" at the CU is actually the supply line and not a swapped meter tail.',
              'Polarity defects are show-stoppers under Reg 644.1.1 — must be corrected before the EIC is issued. Document polarity result per circuit on the STR (typically a tick or P/F column).',
            ]}
          />

          <Quiz title="Polarity testing — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6/6-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.3 Insulation resistance
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6/6-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.5 Test functionality
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
