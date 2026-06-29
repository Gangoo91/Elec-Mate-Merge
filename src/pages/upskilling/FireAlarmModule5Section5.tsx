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
    id: 'fam5-s5-sequence',
    question:
      'What is the correct order for the commissioning sequence on a new fire alarm system?',
    options: [
      'Power up the panel first, then test the devices once everything is energised.',
      'Visual and continuity, then IR, polarity / address, power-up, cause-and-effect, functional, surveys.',
      'Just press the test button on every device in turn and watch for the panel response.',
      'Whatever order is convenient on the day, since the steps are independent of each other.',
    ],
    correctIndex: 1,
    explanation:
      'The commissioning sequence is logical: passive checks (visual, continuity, IR) before any voltage; pre-energisation polarity / address verification; first power-up under controlled conditions; cause-and-effect verification proves the design intent is wired; per-device functional tests prove every device communicates and operates; sound level survey proves audibility; battery autonomy proves resilience; ARC / interface tests prove external signalling; handover briefs the user. Each step builds on the previous.',
  },
  {
    id: 'fam5-s5-cause-effect',
    question:
      'Under BS 5839-1:2025, what does the commissioning engineer have to verify about the cause-and-effect matrix?',
    options: [
      'Just that the panel sounds the alarm when any one MCP is pressed and held.',
      'That every cause in the design matrix produces its documented effect, in the right zones.',
      'Only the panel-internal cause and effect, ignoring any external interface outputs.',
      'Only on the bigger systems where many interfaces and outputs are involved.',
    ],
    correctIndex: 1,
    explanation:
      'Cause-and-effect is the design intent expressed as "if A happens, B happens". Every cause is tested at commissioning. The 2025 revision elevates the cause-and-effect matrix (or text description for simple systems) to mandatory documentation that must be handed over. Commissioning verifies that the wired system implements the designed matrix.',
  },
  {
    id: 'fam5-s5-soundlevel',
    question:
      'What sound levels does BS 5839-1:2025 require for fire alarm sounders at all accessible points and at bed-head positions?',
    options: [
      '50 dB(A) at accessible points and 60 dB(A) at the bed-head in sleeping rooms.',
      '65 dB(A) at accessible points, 75 dB(A) at the bed-head, and 5 dB above background.',
      '90 dB(A) everywhere in the building, including unoccupied plant rooms and risers.',
      'Whatever the chosen sounders produce, with no separate bed-head requirement set.',
    ],
    correctIndex: 1,
    explanation:
      'The 65 / 75 / +5 dB figures are the audibility targets that drive sounder selection and positioning. At commissioning, the engineer walks the building with a calibrated sound level meter and records the level at every accessible point. Levels below the target trigger sounder repositioning, additional sounders, or higher-output devices.',
  },
  {
    id: 'fam5-s5-arc-timing',
    question:
      'Under BS 5839-1:2025 clauses 14.17 and 14.18, what are the maximum allowed alarm transmission times to the ARC for Category L and Category P systems?',
    options: [
      '30 s alarm transmission for both Category L and Category P systems alike.',
      'Category L: 90 s alarm / 3 min catastrophic. Category P: 120 s alarm / 31 min catastrophic.',
      '5 min alarm transmission for both Category L and Category P systems alike.',
      'No transmission-time limit is set for either Category L or Category P systems.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5839-1:2025 introduces explicit transmission timings that were absent in 2017. L = 90 s alarm / 3 min catastrophic; P = 120 s alarm / 31 min catastrophic. The verification at commissioning involves triggering an alarm signal and confirming the ARC received it within the timing, and simulating a catastrophic failure (e.g. all paths down) and confirming both ARC and CIE indication within the catastrophic-failure timing.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS 5839-1:2025 introduced explicit alarm-transmission timings to the ARC. What are the figures for a Category L system?',
    options: [
      'Alarm received at the ARC within 90 s; catastrophic failure indicated within 3 min.',
      '30 s alarm to the ARC / 30 min catastrophic-failure indication at ARC and CIE.',
      '120 s alarm to the ARC / 31 min catastrophic-failure indication at ARC and CIE.',
      'No transmission-time limit at all for a Category L life-safety system.',
    ],
    correctAnswer: 0,
    explanation:
      'Category L (Life): 90 s alarm to ARC, 3 min catastrophic-failure indication at ARC and CIE per clause 14.17 (NEW for 2025; the 2017 revision recognised I&HAS transmission equipment but did not set explicit timings). The 90 s figure recognises that life-safety systems need rapid signalling; the 3 min catastrophic-failure indication ensures users know quickly when the transmission path is compromised.',
  },
  {
    id: 2,
    question:
      'BS 5839-1:2025 introduced explicit alarm-transmission timings to the ARC. What are the figures for a Category P system?',
    options: [
      '60 s alarm to the ARC / 5 min catastrophic-failure indication at ARC and CIE.',
      '90 s alarm to the ARC / 3 min catastrophic-failure indication at ARC and CIE.',
      'Alarm received at the ARC within 120 s; catastrophic failure indicated within 31 min.',
      'No transmission-time limit at all for a Category P property-protection system.',
    ],
    correctAnswer: 2,
    explanation:
      'Category P (Property): 120 s alarm to ARC, 31 min catastrophic-failure indication at ARC and CIE per clause 14.18 (NEW for 2025). The longer catastrophic-failure window (31 min vs 3 min for L) recognises that property-only protection has more time to tolerate a transmission compromise without endangering life.',
  },
  {
    id: 3,
    question: 'What sound levels does BS 5839-1:2025 require for fire alarm sounders?',
    options: [
      '50 dB(A) anywhere in the building, with no separate sleeping-room requirement.',
      'A flat 120 dB(A) everywhere on the basis that louder is always better for evacuation.',
      'Whatever the chosen sounders happen to produce, with no measured target at handover.',
      '65 dB(A) at accessible points, 75 dB(A) at the bed-head, and 5 dB above background.',
    ],
    correctAnswer: 3,
    explanation:
      'The 65 / 75 / +5 dB figures are the audibility benchmarks: 65 at all accessible points is the floor; 75 at the bed-head is louder for sleeping occupants; +5 above any background lasting 30 seconds or more ensures sounders are heard over equivalent-noise environments. Verified at commissioning with a calibrated sound level meter at every accessible point; failure triggers re-positioning, additional or higher-output devices.',
  },
  {
    id: 4,
    question: 'What does BS EN 54-23 govern, and when does it apply at commissioning?',
    options: [
      'Visual alarm devices (VADs); it applies where a VAD is the primary evacuation signal.',
      'Point smoke detector testing; it applies during the per-device functional test stage.',
      'Standby battery autonomy; it applies during the mains-fail simulation at commissioning.',
      'Fire alarm cable colour identification; it applies at the wiring and termination stage.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 54-23 is the product / coverage standard for VADs — it specifies coverage volume (a cubic shape based on light intensity) and luminous flux, with categories like C-3-15 (ceiling, 3 m, 15 cd). Where a VAD is the primary evacuation signal (e.g. for hearing-impaired occupants or noise-exempt areas), verification at commissioning is mandatory, by manufacturer table or calculation. Where the VAD supplements an audible signal, audible verification is the primary check.',
  },
  {
    id: 5,
    question:
      'During commissioning, the cause-and-effect matrix is verified. Which best describes that verification process?',
    options: [
      'Test only the panel buttons and confirm the internal indicators respond correctly.',
      'Just verify the alarm sounds somewhere when a single detector or MCP is triggered.',
      'Trigger every cause in the matrix and verify all designed effects, in the right zones.',
      'Cause-and-effect verification is optional and can be deferred to the first service visit.',
    ],
    correctAnswer: 2,
    explanation:
      'Cause-and-effect verification is the load-bearing design-intent check. For every cause in the design matrix (every detector, MCP, interface input, test condition) the engineer triggers it and verifies all designed effects (alarm sound, sounder operation, ARC signal, plant shutdown, lift recall, door release, smoke vent) in the correct timing and zones. Failures are documented and rectified before sign-off. Under BS 5839-1:2025 the matrix or text description is mandatory handover documentation.',
  },
  {
    id: 6,
    question:
      'What is the purpose of the battery autonomy / mains-fail simulation test at commissioning?',
    options: [
      'Just to check the standby batteries are connected and reading the correct voltage.',
      'It is an optional test that may be omitted where the battery is new from the supplier.',
      'It applies only on big systems with many sounders and a long quiescent load profile.',
      'To prove the batteries support quiescent autonomy then an end-of-autonomy alarm period.',
    ],
    correctAnswer: 3,
    explanation:
      'The battery autonomy test proves the system survives a mains failure: the standby batteries support the quiescent load for the full design period (typically 24 h or 72 h) followed by a defined alarm period (typically 30 min) at full output. Isolate the mains, run on batteries, then trigger the alarm at the end of the period. At commissioning it is often abbreviated by calculation plus load test; the full-duration test repeats annually.',
  },
  {
    id: 7,
    question:
      'BS 5839-1:2025 clause 29.6 introduces a new requirement for the commissioning organisation. What is it?',
    options: [
      'Advise the user to investigate and, if appropriate, act on every false alarm that occurs.',
      'No new requirement is placed on the commissioning organisation by clause 29.6.',
      'Investigate only false alarms that occur in residential and sleeping-risk property.',
      'Investigate a false alarm only on the occasions when the ARC specifically requests it.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5839-1:2025 clause 29.6 is a new responsibility on the commissioning / handover organisation — to advise the user to arrange suitable investigation and, if appropriate, action on every false alarm. It reflects that false alarms are a chronic problem, that the FRS now operate call-challenge policies, and that user-side investigation (managerial change, system modification, or engaged investigation) is the primary mitigation. The procedure is briefed at handover and documented in the O&M manual.',
  },
  {
    id: 8,
    question:
      'During commissioning of an addressable Class A loop, the cause-and-effect verification reports that one detector triggers an alarm at the panel — but the recorded ZONE is wrong: detector "Floor 3 — Office 12" triggers as if it were in "Floor 2 — Office 12". What is the most likely cause?',
    options: [
      'A detector hardware fault that produces the alarm but corrupts the reported location.',
      'A wiring open-circuit that has shifted the detector onto the adjacent zone’s loop.',
      'An address mismatch — the device works, but the address-to-text mapping is wrong.',
      'Detector contamination that triggers the alarm and falsifies the reported zone.',
    ],
    correctAnswer: 2,
    explanation:
      'The classic addressable misconfiguration: the device is correctly wired and communicating, but the address-to-text mapping is wrong — either the detector is set to the wrong address (DIP switch or auto-address error) or the panel programming maps the address to the wrong text descriptor. Resolve by verifying the device address and the panel text against the design schedule and correcting whichever does not match, then re-testing cause-and-effect. Common on large systems; caught by cause-and-effect verification.',
  },
  {
    id: 9,
    question:
      'A sound level survey at commissioning reveals 60 dB(A) at one accessible point on a corridor where a 65 dB(A) target applies. What is the appropriate response?',
    options: [
      'Sign the system off and move on, since 60 dB(A) is close enough to the 65 dB(A) target.',
      'Adjust the sound level meter calibration so the reading meets the 65 dB(A) target.',
      'Lower the documented design target for that corridor to 60 dB(A) to match the reading.',
      'Investigate and rectify — reposition, add or upsize the sounder, then re-survey.',
    ],
    correctAnswer: 3,
    explanation:
      'Sound level deficiencies are rectified, not waved through. Reposition the nearest sounder, add a supplementary sounder, or fit a higher-output device, then re-survey to confirm the 65 dB(A) target is met with margin. The deficient point is recorded before rectification and the rectified result after. The system cannot be signed off as compliant with 60 dB(A) at an accessible point.',
  },
  {
    id: 10,
    question:
      'At first power-up of a newly wired addressable system, the panel reports "loop fault — earth fault detected". What is the engineer\'s first response?',
    options: [
      'Diagnose before continuing — check screen terminations, then section and IR-test the loop.',
      'Ignore the indication, since new addressable systems routinely report nuisance faults.',
      'Reset the panel repeatedly until the earth-fault indication clears and stays clear.',
      'Disconnect the loop screen entirely so the earth-fault indication can no longer appear.',
    ],
    correctAnswer: 0,
    explanation:
      'Earth fault on a new addressable loop is a real fault, not a panel quirk — typically a screen incorrectly terminated to PE rather than FE, a damaged conductor leaking to earth, or moisture ingress at a recent JB or penetration. Check the screen termination at the panel (FE, not PE) and at the far end (cut back, not earthed), section the loop using isolators, IR-test the localised section with devices disconnected, then rectify and re-test. Reset merely silences the indication until the next monitoring cycle.',
  },
];

const FireAlarmModule5Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Commissioning procedures | Fire Alarm Module 5.5 | Elec-Mate',
    description:
      'BS 5839-1:2025 commissioning sequence: visual, continuity, IR (devices removed), polarity / address, first power-up, cause-and-effect (mandatory documentation 2025), per-device functional tests, sound level survey (65 / 75 / +5 dB), battery autonomy, ARC alarm transmission timings (clauses 14.17 / 14.18 — NEW 2025: L ≤90 s / P ≤120 s), false-alarm-investigation procedure handover (clause 29.6 NEW 2025).',
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
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5"
            title="Commissioning procedures"
            description="The full commissioning sequence for a BS 5839-1:2025 fire alarm system: visual to handover. Cause-and-effect verification, sound level survey, battery autonomy, ARC alarm-transmission timings (NEW 2025: L ≤90 s / P ≤120 s under clauses 14.17 / 14.18), and the new commissioning-organisation duty to brief the user on false-alarm investigation (clause 29.6, NEW 2025)."
            tone="yellow"
          />

          <TLDR
            points={[
              'Commissioning sequence: visual → continuity → IR (devices off) → polarity / address → first power-up → cause-and-effect → device-by-device functional → sound level → battery autonomy → ARC / interface → false-alarm-investigation procedure handover.',
              'Cause-and-effect matrix or text description: NEW 2025 mandatory documentation, verified at commissioning, handed over with the system.',
              'Sound level survey: 65 dB(A) at all accessible points / 75 dB(A) at bed-head / ≥5 dB above 30s+ sustained background. Walked with calibrated meter, recorded.',
              'VAD coverage where VAD is primary signal: BS EN 54-23 — defined coverage volume and luminous flux. Verified by manufacturer table or calculation.',
              'Battery autonomy: design quiescent period (typically 24 h or 72 h) + alarm period at end. Tested by calculation + load test at commissioning, full-duration repeated annually.',
              'ARC alarm transmission (NEW 2025 clauses 14.17 / 14.18): Category L ≤90 s alarm + ≤3 min catastrophic; Category P ≤120 s alarm + ≤31 min catastrophic.',
              'False alarm investigation procedure handover: NEW 2025 clause 29.6 — commissioning organisation advises user on investigation arrangement.',
              'Acceptance test = the documented record of all commissioning verifications. Issued by the commissioning engineer; received by the user. Annex G certificate format.',
              'Fault simulation: deliberate fault injection during commissioning verifies fault-monitoring (open-circuit, short-circuit, earth-fault) reports correctly to the panel.',
              'Sprinkler-as-heat-detector zoning: where used, sprinkler indication zone must NOT overlap with more than one fire detection zone (NEW 2025 clarification, §14 of FIA Guide).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Carry out the BS 5839-1:2025 commissioning sequence in the correct order: visual, continuity, IR (devices removed), polarity / address verification, first power-up, cause-and-effect, per-device functional, sound level, battery autonomy, ARC / interface, handover',
              'Verify the cause-and-effect matrix or text description as mandatory 2025 documentation, with every cause triggering the documented effect',
              'Conduct a sound level survey to BS 5839-1:2025: 65 dB(A) at all accessible points / 75 dB(A) at bed-head / ≥5 dB above sustained background',
              'Verify VAD coverage where VAD is the primary evacuation signal per BS EN 54-23 by manufacturer table or calculation',
              'Carry out a battery autonomy / mains-fail simulation: quiescent design period + alarm period at end, by load test + calculation at commissioning',
              'Confirm the alarm transmission timings to the ARC under BS 5839-1:2025 clauses 14.17 (L: ≤90 s alarm / ≤3 min catastrophic) and 14.18 (P: ≤120 s alarm / ≤31 min catastrophic) — NEW for 2025',
              'Brief the user on the false-alarm-investigation procedure at handover per the NEW 2025 clause 29.6',
              'Issue an acceptance certificate per Annex G with the supporting commissioning record',
              'Carry out fault simulation (open-circuit, short-circuit, earth-fault) and verify correct CIE indication',
              'Verify sprinkler-zone indication does NOT overlap with more than one fire detection zone where sprinklers are used as heat detectors (NEW 2025 §14 clarification)',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The commissioning sequence — order matters</ContentEyebrow>

          <ConceptBlock
            title="Why the order is fixed"
            plainEnglish="Commissioning is a sequence of verifications that build on each other. Each step assumes the previous step has passed; each step's tools and methods are different. Skipping or re-ordering produces gaps in the safety case — a step that depends on an earlier step having passed is signed off without the underlying basis. Doing the steps in order, with each step's results recorded before moving to the next, gives an end-to-end verification record that is contractually and legally robust."
            onSite="Resist the urge to start with the headline tests (alarm sound, ARC signal). Those depend on everything before them. Start with the passive checks (visual, continuity), move through the pre-energisation tests (IR, polarity, address), then power up under controlled conditions and work through cause-and-effect, per-device functional, sound level, battery, ARC, handover. The sequence is the safety case."
          >
            <p>The full sequence:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Visual inspection.</strong> Walk the building. Verify cable identification,
                support, fixings, JB / penetration condition, detector head fitment, MCP fitment,
                sounder / VAD fitment, panel mounting, battery installation, mains feed, mains
                isolator. Check against the as-installed drawing. Record findings on the visual
                inspection record. Defects raised before any test.
              </li>
              <li>
                <strong>Continuity tests.</strong> Loop continuity end-to-end (panel SLC OUT to
                panel SLC RETURN); sounder zone continuity; mains feed continuity; FE continuity.
                Verifies physical wiring is continuous before any voltage applied.
              </li>
              <li>
                <strong>Insulation resistance — devices removed.</strong> 500 V dc, ≥1 MΩ acceptance
                per BS 7671 §643.3. Loop devices DISCONNECTED before the test (covered in §4 of this
                module). Cable conductor-to-earth, conductor-to-conductor, screen-to-earth.
              </li>
              <li>
                <strong>Polarity / address verification.</strong> At every base, every MCP, every
                sounder: polarity (+/−) maintained. At every addressable device: address matches the
                design schedule. Walk-through pre-energisation finds the back-to-front device and
                the swapped address.
              </li>
              <li>
                <strong>First power-up.</strong> Loop devices re-fitted, panel energised under
                controlled conditions. Initial loop diagnostic from panel — device count, loop
                length, isolator status, fault status. Address any reported faults before
                proceeding.
              </li>
              <li>
                <strong>Cause-and-effect verification.</strong> Every cause in the design matrix
                triggered; every effect observed and recorded. Mandatory 2025 documentation.
              </li>
              <li>
                <strong>Per-device functional tests.</strong> Every detector, every MCP, every
                sounder, every interface, every input / output. Cause activated; correct device
                indication on the panel; correct zone identified; correct cause-and-effect
                triggered.
              </li>
              <li>
                <strong>Sound level survey.</strong> Walked with calibrated sound level meter. Every
                accessible point recorded. 65 / 75 / +5 dB targets verified.
              </li>
              <li>
                <strong>VAD coverage verification.</strong> If VAD is primary signal, BS EN 54-23
                verification by manufacturer table or calculation.
              </li>
              <li>
                <strong>Battery autonomy / mains-fail simulation.</strong> Calculation + load test
                at commissioning; full-duration test annually thereafter.
              </li>
              <li>
                <strong>ARC interface tests.</strong> Alarm transmission within timings (L ≤90 s / P
                ≤120 s); fault transmission; catastrophic-failure simulation within timings (L ≤3
                min / P ≤31 min).
              </li>
              <li>
                <strong>Fault simulation.</strong> Deliberate open-circuit, short-circuit,
                earth-fault, mains-fail, battery-fail injected; correct CIE indication and
                cause-and-effect verified.
              </li>
              <li>
                <strong>Acceptance test and certificate.</strong> All commissioning records
                consolidated; Annex G acceptance certificate issued; user signs.
              </li>
              <li>
                <strong>False-alarm-investigation procedure handover.</strong> NEW 2025 clause 29.6:
                commissioning organisation advises user on investigation arrangement, briefing
                recorded in O&M manual.
              </li>
              <li>
                <strong>Documentation handover.</strong> Operating manual, O&M manual, as-installed
                drawings, cause-and-effect matrix or text description, logbook (Annex H 2025),
                certificates. Detail covered in §6.
              </li>
            </ol>
          </ConceptBlock>

          {/* Commissioning sequence flow diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Commissioning sequence — flow from visual to handover
            </h4>
            <svg
              viewBox="0 0 820 580"
              className="w-full h-auto"
              role="img"
              aria-label="Commissioning sequence flow: visual inspection, continuity tests, IR (devices removed), polarity and address verification, first power-up, cause-and-effect verification, per-device functional tests, sound level survey, VAD verification, battery autonomy, ARC interface tests, fault simulation, acceptance certificate, false-alarm-investigation procedure handover, documentation handover."
            >
              <text x="20" y="30" fill="#FBBF24" fontSize="13" fontWeight="bold">
                Commissioning sequence — order matters
              </text>

              {/* Phase 1: Pre-energisation */}
              <rect
                x="20"
                y="50"
                width="780"
                height="120"
                rx="8"
                fill="rgba(34,211,238,0.06)"
                stroke="rgba(34,211,238,0.5)"
                strokeWidth="1.5"
              />
              <text x="40" y="74" fill="#22D3EE" fontSize="11" fontWeight="bold">
                PRE-ENERGISATION (passive checks, no voltage)
              </text>

              <rect
                x="40"
                y="90"
                width="160"
                height="60"
                rx="6"
                fill="rgba(34,211,238,0.12)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text
                x="120"
                y="114"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                1 · Visual
              </text>
              <text x="120" y="130" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                cable, supports, fitment
              </text>
              <text x="120" y="142" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                vs as-installed dwg
              </text>

              <rect
                x="220"
                y="90"
                width="160"
                height="60"
                rx="6"
                fill="rgba(34,211,238,0.12)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text
                x="300"
                y="114"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                2 · Continuity
              </text>
              <text x="300" y="130" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                loop end-to-end
              </text>
              <text x="300" y="142" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                sounder, mains, FE
              </text>

              <rect
                x="400"
                y="90"
                width="160"
                height="60"
                rx="6"
                fill="rgba(34,211,238,0.12)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text
                x="480"
                y="114"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                3 · IR · 500 V dc
              </text>
              <text x="480" y="130" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                devices REMOVED
              </text>
              <text x="480" y="142" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                ≥1 MΩ BS 7671 §643.3
              </text>

              <rect
                x="580"
                y="90"
                width="200"
                height="60"
                rx="6"
                fill="rgba(34,211,238,0.12)"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
              <text
                x="680"
                y="114"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                4 · Polarity / address
              </text>
              <text x="680" y="130" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                walk loop, every base
              </text>
              <text x="680" y="142" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                device address vs schedule
              </text>

              {/* Arrow to phase 2 */}
              <line x1="410" y1="170" x2="410" y2="195" stroke="#FBBF24" strokeWidth="2" />
              <polygon points="410,200 405,193 415,193" fill="#FBBF24" />

              {/* Phase 2: Power-up + verification */}
              <rect
                x="20"
                y="200"
                width="780"
                height="180"
                rx="8"
                fill="rgba(168,85,247,0.06)"
                stroke="rgba(168,85,247,0.5)"
                strokeWidth="1.5"
              />
              <text x="40" y="224" fill="#A855F7" fontSize="11" fontWeight="bold">
                POWER-UP and VERIFICATION
              </text>

              <rect
                x="40"
                y="240"
                width="160"
                height="60"
                rx="6"
                fill="rgba(168,85,247,0.12)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text
                x="120"
                y="262"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                5 · First power-up
              </text>
              <text x="120" y="278" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                controlled conditions
              </text>
              <text x="120" y="290" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                panel diagnostic
              </text>

              <rect
                x="220"
                y="240"
                width="160"
                height="60"
                rx="6"
                fill="rgba(168,85,247,0.12)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text
                x="300"
                y="262"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                6 · Cause-and-effect
              </text>
              <text x="300" y="278" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                every cause → effect
              </text>
              <text
                x="300"
                y="290"
                textAnchor="middle"
                fill="rgba(236,72,153,0.85)"
                fontSize="9"
                fontWeight="bold"
              >
                NEW 2025 mandatory doc
              </text>

              <rect
                x="400"
                y="240"
                width="160"
                height="60"
                rx="6"
                fill="rgba(168,85,247,0.12)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text
                x="480"
                y="262"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                7 · Per-device functional
              </text>
              <text x="480" y="278" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                every detector / MCP / sounder
              </text>
              <text x="480" y="290" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                interface I/O verified
              </text>

              <rect
                x="580"
                y="240"
                width="200"
                height="60"
                rx="6"
                fill="rgba(168,85,247,0.12)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text
                x="680"
                y="262"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                8 · Sound level survey
              </text>
              <text x="680" y="278" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                65 / 75 / +5 dB(A)
              </text>
              <text x="680" y="290" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                calibrated SLM
              </text>

              <rect
                x="40"
                y="310"
                width="160"
                height="60"
                rx="6"
                fill="rgba(168,85,247,0.12)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text
                x="120"
                y="332"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                9 · VAD per BS EN 54-23
              </text>
              <text x="120" y="348" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                if VAD primary signal
              </text>
              <text x="120" y="360" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                manuf. table / calc
              </text>

              <rect
                x="220"
                y="310"
                width="160"
                height="60"
                rx="6"
                fill="rgba(168,85,247,0.12)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text
                x="300"
                y="332"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                10 · Battery autonomy
              </text>
              <text x="300" y="348" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                quiescent + alarm @ end
              </text>
              <text x="300" y="360" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                load test + calc
              </text>

              <rect
                x="400"
                y="310"
                width="160"
                height="60"
                rx="6"
                fill="rgba(168,85,247,0.12)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text
                x="480"
                y="328"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                11 · ARC interface
              </text>
              <text
                x="480"
                y="343"
                textAnchor="middle"
                fill="rgba(236,72,153,0.85)"
                fontSize="9"
                fontWeight="bold"
              >
                L ≤90s · P ≤120s alarm
              </text>
              <text
                x="480"
                y="356"
                textAnchor="middle"
                fill="rgba(236,72,153,0.85)"
                fontSize="9"
                fontWeight="bold"
              >
                L ≤3min · P ≤31min cat-fail
              </text>
              <text x="480" y="368" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">
                14.17 / 14.18 NEW 2025
              </text>

              <rect
                x="580"
                y="310"
                width="200"
                height="60"
                rx="6"
                fill="rgba(168,85,247,0.12)"
                stroke="#A855F7"
                strokeWidth="1.5"
              />
              <text
                x="680"
                y="332"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                12 · Fault simulation
              </text>
              <text x="680" y="348" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                o/c · s/c · e/f · mains
              </text>
              <text x="680" y="360" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                CIE indication verified
              </text>

              {/* Arrow to phase 3 */}
              <line x1="410" y1="380" x2="410" y2="405" stroke="#FBBF24" strokeWidth="2" />
              <polygon points="410,410 405,403 415,403" fill="#FBBF24" />

              {/* Phase 3: Acceptance + handover */}
              <rect
                x="20"
                y="410"
                width="780"
                height="156"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.5)"
                strokeWidth="1.5"
              />
              <text x="40" y="434" fill="#FBBF24" fontSize="11" fontWeight="bold">
                ACCEPTANCE and HANDOVER
              </text>

              <rect
                x="40"
                y="450"
                width="220"
                height="60"
                rx="6"
                fill="rgba(251,191,36,0.12)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="150"
                y="474"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                13 · Acceptance certificate
              </text>
              <text x="150" y="490" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                Annex G · all records
              </text>
              <text x="150" y="502" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                signed by user
              </text>

              <rect
                x="280"
                y="450"
                width="240"
                height="60"
                rx="6"
                fill="rgba(251,191,36,0.12)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="472"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                14 · False-alarm proc
              </text>
              <text
                x="400"
                y="488"
                textAnchor="middle"
                fill="rgba(236,72,153,0.85)"
                fontSize="9"
                fontWeight="bold"
              >
                NEW 2025 clause 29.6
              </text>
              <text x="400" y="500" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                advise user on investigation
              </text>

              <rect
                x="540"
                y="450"
                width="240"
                height="60"
                rx="6"
                fill="rgba(251,191,36,0.12)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="660"
                y="472"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                15 · Documentation
              </text>
              <text x="660" y="488" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                O&amp;M, drawings, C&amp;E matrix
              </text>
              <text x="660" y="500" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                logbook · §6 of this module
              </text>

              <text x="410" y="540" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="10">
                Each step recorded before moving to next · gaps in record = gaps in safety case
              </text>
              <text
                x="410"
                y="556"
                textAnchor="middle"
                fill="rgba(236,72,153,0.85)"
                fontSize="9"
                fontWeight="bold"
              >
                Cause-and-effect verification + clause 29.6 false-alarm advice are NEW 2025
                mandatory items
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

          <ContentEyebrow>Cause-and-effect — the design intent verified</ContentEyebrow>

          <ConceptBlock
            title="Why cause-and-effect is the load-bearing commissioning check"
            plainEnglish="The cause-and-effect matrix expresses the design intent of the fire alarm system as a table: every CAUSE that the system can sense (detector activation, MCP operation, interface input from another system, fault condition) maps to one or more EFFECTS (alarm sound throughout zone X, sounders / VADs activated, ARC signal sent, plant shutdown initiated, lift recall to ground, smoke vent opened, magnetically held door released, etc.). The cause-and-effect verification at commissioning triggers each cause and verifies that ALL designed effects occur, in the correct timing, in the correct zones. It is the single check that proves the wired system implements the designed system."
            onSite="Print the cause-and-effect matrix on a clipboard. Walk the building with a colleague at the panel. Trigger each cause; the colleague observes the panel and notes the resulting effects; you observe the field response (sounder operation, smoke vent operation, door release). Tick each effect as observed. The matrix walk-through is methodical and slow but is the load-bearing safety verification. Skip it and the system is signed off without verifying the design intent — a serious omission with court-aware exposure."
          >
            <p>The verification process:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>The matrix.</strong> The design cause-and-effect matrix is provided by the
                system designer. Mandatory documentation under BS 5839-1:2025. May be a formal
                matrix table for complex systems, or a text description for simple systems
                (&quot;this system operates as a simultaneous evacuation&quot;).
              </li>
              <li>
                <strong>The verification team.</strong> Two engineers — one at the panel, one
                walking the building — communicating by radio or phone. Single engineer verification
                is acceptable for very small systems but is slow.
              </li>
              <li>
                <strong>Trigger each cause.</strong> Every detector activated by test smoke / test
                heat / magnetic test wand per the device manufacturer instruction. Every MCP
                operated by the test key (not the break-glass — preserve the device for service).
                Every interface input simulated.
              </li>
              <li>
                <strong>Observe each effect.</strong> Field engineer notes sounder operation, VAD
                operation, smoke vent open, door release, plant shutdown. Panel engineer notes panel
                indication, zone identified, ARC signal status, log entry.
              </li>
              <li>
                <strong>Tick the matrix.</strong> Each cell of the matrix is a cause-and-effect
                pair; verified means the effect occurs when the cause is triggered. Failures are
                noted, investigated, rectified, re-tested.
              </li>
              <li>
                <strong>Reset between causes.</strong> Each cause-and-effect verification ends with
                system reset and zone-clear before the next cause is triggered.
              </li>
              <li>
                <strong>Record.</strong> The fully ticked matrix is the commissioning record for
                cause-and-effect. It is part of the handover documentation.
              </li>
            </ol>
            <p>
              Mandatory under BS 5839-1:2025 — both the matrix existence (in the design and handover
              documentation) and the verification at commissioning. The 2017 revision recommended
              cause-and-effect verification; the 2025 revision elevates the matrix / text
              description to mandatory documentation.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Documentation clause / §21 of FIA Guide (Cause-and-effect — NEW for 2025)"
            clause={
              <>
                A cause-and-effect matrix or text description of how the cause and effect operates
                should be included with the documentation provided to the purchaser or user of the
                system. This could be as simple as &quot;this system operates as a simultaneous
                evacuation&quot; or a cause-and-effect matrix document might be required for more
                complex strategies. The standard does not dictate the manner of the cause-and-effect
                matrix only that it needs to be produced.
              </>
            }
            meaning="NEW for 2025. Cause-and-effect — matrix or text description — is MANDATORY documentation handed over with the system. Format flexible (matrix for complex, text for simple); requirement firm. Verified at commissioning; handed over with the O&M manual."
          />

          <CommonMistake
            title="Cause-and-effect tested by representative sample only — not every cause"
            whatHappens="200-device addressable system. Engineer tests one detector per zone (10 detectors out of 200), confirms zone identification on the panel, ticks 'cause-and-effect verified'. Five months later, an MCP on a corridor activates and the zone-correct sounder zone fires — but the corridor MCP was wired with a swapped address, mapped to a different zone in the panel. Activation correctly indicates fire; identifies the wrong zone. Evacuation is delayed by occupants going to the wrong area to investigate. Court-aware liability falls on the commissioning engineer who did not verify the MCP."
            doInstead="Verify every cause. Every detector, every MCP, every interface input. Yes, it is slow on a 200-device system — typically a 3-day commissioning event with two engineers. Yes, the commercial pressure pushes back. The cause-and-effect verification is the load-bearing commissioning check — the engineer who short-cuts it is signing off without verification, and is exposed if a cause-effect mismatch produces a real-world consequence."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Sound level survey and VAD verification</ContentEyebrow>

          <ConceptBlock
            title="The 65 / 75 / +5 dB(A) targets"
            plainEnglish="The fire alarm sounders must be loud enough to alert occupants throughout the protected area. BS 5839-1:2025 sets three audibility benchmarks: 65 dB(A) at all accessible points (the floor — anywhere a person might be); 75 dB(A) at bed-head positions (sleeping occupants need higher levels to be roused); at least 5 dB above any sustained background noise of 30 seconds or more (sounders must be heard over equivalent-noise environments — kitchens, plant rooms, factory floors). The targets are verified at commissioning by walking with a calibrated sound level meter and recording the level at every accessible point."
            onSite="Calibrated sound level meter (Class 2 minimum, Class 1 preferred for high-spec work). Walk the building with the matrix of accessible points marked on the floor plan. At each point, take a 1-2 second average reading with sounders activated. Record the value. Targets met = move to next point. Target NOT met = note the deficiency, investigate, rectify (reposition / add / upsize sounders), re-survey. The acceptance is at every point, not on average — a 70 dB(A) average with one 60 dB(A) deficiency is non-compliant."
          >
            <p>The targets in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>65 dB(A) at all accessible points.</strong> The general floor level. Any
                position a person can reach during normal occupancy — corridors, rooms, plant rooms,
                stair landings, plant cupboards, roof-access positions. Measured 1.4 m AGL.
              </li>
              <li>
                <strong>75 dB(A) at bed-head positions.</strong> In rooms where people sleep
                (residential dwellings, hotels, dormitories, residential care). Measured at the head
                end of the bed, 1.4 m above floor. Reflects the higher level needed to wake a
                sleeping occupant.
              </li>
              <li>
                <strong>≥5 dB above 30s+ sustained background.</strong> In areas where ambient noise
                is sustained at 30 seconds or more (kitchens during prep, plant rooms, factory
                floors, machine workshops), sounders must be at least 5 dB above the sustained
                background. Measured ambient first, then sounder + ambient, derive differential.
              </li>
              <li>
                <strong>Calibrated meter.</strong> Class 2 minimum (general purpose), Class 1
                preferred (precision). Calibration certificate within 2 years of test date. Pre-test
                calibrator check and post-test calibrator check; both recorded.
              </li>
              <li>
                <strong>Recorded.</strong> Floor-plan annotated with measurement points and results.
                Deficiencies, rectification, re-survey results all recorded. Commissioning sign-off
                only when every point meets the target.
              </li>
            </ul>
            <p>
              The 65 / 75 / +5 figures are the floor — sounders should be designed to give margin
              over them. A 65 dB(A) reading at the deepest point of the system, with all sounders
              operational, leaves no margin for sounder degradation, occupant noise, or door
              closure. Design for 70-75 dB(A) deepest at commissioning to allow for service-life
              degradation.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="VAD coverage per BS EN 54-23 — when VAD is the primary signal"
            plainEnglish="Visual Alarm Devices (VADs) supplement audible sounders for hearing-impaired occupants and where audible alarms are not the primary evacuation signal (e.g. some industrial environments where ambient noise exceeds the +5 dB target, some operating theatres, some hearing-loop environments). Where VAD is the PRIMARY evacuation signal, BS EN 54-23 applies — the product / coverage standard for VADs. BS EN 54-23 specifies the device's category (e.g. C-3-15 = ceiling-mounted, 3 m room, 15 cd light intensity), the defined coverage volume, and the luminous flux requirements."
            onSite="If the design specifies VAD as the primary signal, BS EN 54-23 verification at commissioning is mandatory. Procedure: confirm device is BS EN 54-23 certified (CE / UKCA mark, product classification on label); confirm device category matches the design (C-3-15 for typical 3 m ceiling); confirm VAD spacing covers the design volume per the manufacturer table OR by calculation; record the verification on the commissioning record. Where VAD supplements audible (not primary), audible verification is the primary check; VAD verification is supplementary."
          >
            <p>BS EN 54-23 in summary:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>VAD product certification.</strong> CE / UKCA marked to BS EN 54-23 with a
                defined category. Category encoding: e.g. C-3-15 = Ceiling-mounted, 3 m room height,
                15 cd luminous intensity (covers a 7.5 m diameter cylinder at 1 m above floor).
                Wall-mounted VADs use W-x-y categories.
              </li>
              <li>
                <strong>Coverage volume.</strong> Each category has a defined coverage volume —
                typically a cylinder for ceiling-mounted, a square prism for wall-mounted. The
                volume specifies where the VAD is guaranteed to deliver the rated luminous flux.
              </li>
              <li>
                <strong>Spacing.</strong> Multiple VADs are spaced to cover the protected volume
                without dark zones. Manufacturer tables typical; calculation acceptable for
                non-standard layouts.
              </li>
              <li>
                <strong>Verification at commissioning.</strong> Device certification confirmed
                (label / data sheet); spacing matches design; activation observed at the VADs during
                cause-and-effect; recorded on the commissioning record.
              </li>
              <li>
                <strong>Photometric measurement.</strong> Where the design relies on photometric
                performance under specific conditions (large open spaces, atria), commissioning may
                include a photometric measurement; rare on standard Cat L installations.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Sound level survey done with all interior doors open"
            whatHappens="Engineer surveys sound levels with all interior doors propped open. Readings throughout the building meet 65 dB(A). System signed off. Three months later, the building is in normal occupancy with doors closed, and the rear bedrooms register 50 dB(A) at bed-head — well below the 75 dB(A) target. Doors closed in service produce a sound pressure level very different from doors open at commissioning. The system is functionally non-compliant in service even though it passed at commissioning."
            doInstead="Survey under representative service conditions. Doors closed (or in their normal occupancy state). Plant noise running where it normally runs. Building furniture in place where it normally sits. The survey result is the level the occupant experiences in service. Note the survey conditions on the record (e.g. 'doors closed in residential rooms; plant rooms with running plant; HVAC at normal demand'). A survey done under unrealistic conditions is not a survey of the system as installed."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Battery autonomy and ARC interface — NEW 2025 timings</ContentEyebrow>

          <ConceptBlock
            title="Battery autonomy / mains-fail simulation"
            plainEnglish="Standby batteries provide power during mains failure. Capacity is sized to support quiescent operation for a design autonomy period (typically 24 h or 72 h depending on the system class) plus a defined alarm period at the end (typically 30 min). At commissioning, the battery autonomy is verified — usually by a combination of calculation and load test rather than full-duration. The full-duration test is repeated at the annual service. The verification proves the system survives a typical mains failure and still delivers full-output alarm at the end."
            onSite="At commissioning: (a) verify battery is fully charged (panel reports float voltage); (b) carry out a battery impedance test (specific to the panel manufacturer's tool); (c) calculate projected runtime from impedance + load + capacity; (d) load-test for a defined period (often 30 min - 1 h) to confirm calculation; (e) at end of test, simulate alarm and verify sounders run at full output; (f) restore mains and verify charging resumes; (g) record. Annual service repeats with a longer-duration test (often full-duration, e.g. 24 h)."
          >
            <p>The autonomy test elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Charge state verification.</strong> Battery float voltage as panel reports;
                visible charge indicator if fitted. Battery temperature within rating.
              </li>
              <li>
                <strong>Impedance test.</strong> Panel-specific battery diagnostic measures internal
                impedance; impedance vs new-battery baseline indicates capacity degradation. Common
                acceptance: impedance ≤25-30% above new-battery baseline.
              </li>
              <li>
                <strong>Capacity calculation.</strong> Quiescent load (mA) × autonomy (hours) +
                alarm load (mA) × alarm duration (hours) = required Ah. Installed battery Ah must
                exceed required Ah by a margin (typically ≥25%).
              </li>
              <li>
                <strong>Load test (commissioning, abbreviated).</strong> Mains isolated, panel runs
                on batteries for typically 30-60 min. Battery voltage and current monitored. At end
                of period, alarm triggered to verify alarm-load capability.
              </li>
              <li>
                <strong>Full-duration test (annual).</strong> Mains isolated for full design
                autonomy (24 h or 72 h) followed by alarm period. Full battery runtime verified.
              </li>
              <li>
                <strong>Restoration and recharge.</strong> Mains restored, charge cycle observed,
                panel reports normal float within design recharge time (typically 24 h to fully
                recharge from fully discharged).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="ARC alarm transmission timings — NEW 2025 clauses 14.17 and 14.18"
            plainEnglish="The 2017 revision of BS 5839-1 recognised the use of intruder and hold-up alarm system (I&HAS) transmission equipment for fire signalling, but did not provide explicit timings for alarm or fault transmission. The 2025 revision introduces explicit timings under clauses 14.17 (Category L) and 14.18 (Category P): for Category L systems, the alarm signal must be received at the ARC within a maximum of 90 s, and a catastrophic transmission failure (no signals possible) must be indicated at both ARC and CIE within 3 minutes. For Category P systems, the alarm timing relaxes to 120 s and the catastrophic-failure timing relaxes to 31 minutes. The verification at commissioning involves triggering an alarm and confirming receipt at the ARC within the timing, and simulating a catastrophic failure (e.g. all paths down) and confirming both ARC and CIE indication within the catastrophic-failure timing."
            onSite="At commissioning, coordinate with the ARC. Trigger an alarm at the panel with a stopwatch start. ARC operator records receipt time and reports back. Verify ≤90 s (L) or ≤120 s (P). Then simulate path failure: pull the primary path (typically IP), wait, observe the panel and confirm catastrophic-failure indication within 3 min (L) or 31 min (P). Restore. Repeat for path failure of secondary path. Record results on commissioning record."
          >
            <p>The timings detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Category L · clause 14.17.</strong> Alarm to ARC ≤90 s. Catastrophic failure
                indication at ARC and CIE ≤3 min. Faster timings reflect that life safety has higher
                immediacy.
              </li>
              <li>
                <strong>Category P · clause 14.18.</strong> Alarm to ARC ≤120 s. Catastrophic
                failure indication at ARC and CIE ≤31 min. Longer catastrophic timing reflects lower
                immediacy of property protection vs life.
              </li>
              <li>
                <strong>Why introduced 2025.</strong> The PSTN switch-off in 2027 and the move to
                all-IP networks created uncertainty about transmission reliability. Explicit timings
                give a benchmark; alarm transmission equipment must meet these and is tested at
                commissioning and at annual service.
              </li>
              <li>
                <strong>Power supply for transmission equipment.</strong> Where a separate PSU
                powers the alarm transmission equipment, it should conform to BS EN 54-4 or BS EN
                50131-6 Grade 4. The 2025 revision cross-references these.
              </li>
              <li>
                <strong>False alarm notice label.</strong> NEW figure in the 2025 revision (FIA
                Guide §13) showing a recommended &quot;False alarm notice — this fire alarm has an
                active connection to the fire and rescue service&quot; label, fixed on or adjacent
                to the CIE to remind premises management before any test.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 14.17 (Category L alarm transmission) · Clause 14.18 (Category P alarm transmission) — NEW for 2025"
            clause={
              <>
                14.17 — For Category L systems, in the event of a fire alarm signal, an indication
                should be received at the ARC within a maximum of 90 s; a catastrophic failure of
                the transmission system (whereby no alarm signals can be transmitted) should be
                indicated at the ARC and the CIE within 3 min.
                <br />
                <br />
                14.18 — For Category P systems, in the event of a fire alarm signal, an indication
                should be received at the ARC within a maximum of 120 s; a catastrophic failure of
                the transmission system (whereby no alarm signals can be transmitted) should be
                indicated at the ARC and the CIE within 31 min.
              </>
            }
            meaning="NEW explicit timings in the 2025 revision. L = 90 s alarm + 3 min catastrophic. P = 120 s alarm + 31 min catastrophic. Verified at commissioning by stopwatch test of alarm transmission, and simulated path-failure test of catastrophic-failure indication. Recorded on commissioning record."
          />

          <Scenario
            title="Commissioning a Cat L2 system in a residential care home"
            situation="A 60-bed residential care home has a new Cat L2 system with sleeping-room smoke detection (no heat detectors per 2025 §14), MCPs, sounders, VADs in deaf-suitable rooms, and ARC connection (mandatory under 2025 §6 — variation absent ARC = unacceptable). System wired, devices fitted, panel awaiting power-up."
            whatToDo="Run the full sequence in order. Visual: confirm dust caps off, heads fitted, MCPs in place. Continuity: loop end-to-end, sounder zones, mains, FE. IR: 500 V dc, devices removed, ≥1 MΩ. Polarity / address: walk every base. First power-up: panel reports normal, addresses match schedule, isolators online. Cause-and-effect: every smoke detector, every MCP, every interface input, observed effects (sounder zones, VADs in deaf-suitable rooms, plant interface, ARC signal). Sound level: 65 / 75 / +5 dB walked in service conditions (doors closed, ambient running). VAD: BS EN 54-23 verification in deaf-suitable rooms. Battery: impedance + load + 30 min runtime + alarm at end. ARC: 120 s alarm to ARC verified (Cat L = 90 s — but 14.17 is L; this is L2 so L applies 90 s); catastrophic failure ≤3 min via primary-path simulated failure. Acceptance certificate signed. False-alarm-investigation procedure briefed (clause 29.6) — manager understands what false alarm investigation means and what the home is responsible for."
            whyItMatters="Residential care is the area most affected by 2025 changes. Heat detectors banned in sleeping rooms (§14); ARC connection mandatory (§6 — absence is unacceptable variation); zone plan mandatory (§6 — absence is unacceptable variation); false-alarm-investigation briefing mandatory (clause 29.6). Commissioning a Cat L2 in residential care must address all of these, not just the legacy commissioning checks. Court-aware: failures of these new requirements are recorded breaches of BS 5839-1:2025 specifically called out in the standard."
          />

          <SectionRule />

          <ContentEyebrow>False-alarm investigation handover and acceptance</ContentEyebrow>

          <ConceptBlock
            title="The NEW 2025 clause 29.6 commissioning organisation duty"
            plainEnglish="False alarms are a chronic industry problem. Fire and Rescue Services now operate call-challenging policies (FRS may not attend automatic alarms unless the user can confirm a fire is present); ARCs charge for alarm forwarding; building managers face escalating costs and disruption from repeat false alarms. The 2025 revision introduces clause 29.6 placing a NEW duty on the commissioning organisation: advise the user to arrange for suitable investigation, and (if appropriate) action, on every occasion that a false alarm occurs. The advice covers: how to investigate (managerial change, system modification, engaged separate investigator), when to investigate (every occasion), what to record (cause, action, outcome). Briefed at handover; documented in the O&M manual."
            onSite="Brief the responsible person at handover. Explain what a false alarm is (categories of false alarm now in commentary to clause 30); explain why investigation matters (FRS attendance, ARC charges, Regulatory Reform Order liability); explain the investigation procedure (preliminary investigation when rate exceeds 4 per 100 detectors per annum; in-depth investigation when rate exceeds 5 per 100 detectors per annum on systems >40 detectors). Hand over a written false-alarm-investigation procedure that the home / business can follow when the next false alarm occurs. The procedure goes in the O&M manual."
          >
            <p>The clause 29.6 elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Advise the user.</strong> The commissioning organisation has a duty to BRIEF
                the user — not just hand over a manual. The briefing is recorded; user acknowledges
                by signature.
              </li>
              <li>
                <strong>Suitable investigation.</strong> Each false alarm is investigated. The
                investigation is recorded — what triggered the false alarm, what action was taken,
                what was learned.
              </li>
              <li>
                <strong>Action where appropriate.</strong> Investigation may produce action —
                managerial change (e.g. revised cooking practices in a kitchen), system modification
                (e.g. detector relocation, multi-sensor in place of point smoke), or engaged
                separate investigator (e.g. for systemic problems beyond user capability).
              </li>
              <li>
                <strong>Categories of false alarm.</strong> Now in commentary to clause 30 (moved
                from the terms and definitions in 2025). Categories include unwanted-fire-alarm,
                equipment-fault false alarm, malicious false alarm. The commissioning organisation
                explains the categories so the user can correctly categorise each occurrence.
              </li>
              <li>
                <strong>Trigger points for formal investigation.</strong> Preliminary investigation
                when false alarm rate exceeds 4 per 100 detectors per annum; in-depth investigation
                when rate exceeds 5 per 100 detectors per annum (systems with &gt;40 detectors).
                Trigger points unchanged from 2017.
              </li>
              <li>
                <strong>Multi-sensor where higher false alarm risk.</strong> The 2025 revision gives
                greater emphasis to multi-sensor selection where point smoke detectors present
                higher false alarm risk; Annex D (was Annex E) gives the selection guidance.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 29.6 (Commissioning organisation duty — NEW for 2025)"
            clause={
              <>
                The commissioning / handover organisation should advise the user to arrange for
                suitable investigation and, if appropriate, action to be taken on every occasion
                that a false alarm occurs. NOTE — This could, for example, comprise managerial
                changes within the building, modifications to the fire detection and fire alarm
                system or further separate investigation by the organisation that maintains the
                system.
              </>
            }
            meaning="NEW for 2025. The commissioning organisation has an explicit duty to brief the user on false-alarm investigation. Recommended the briefing happens at handover and is recorded in the O&M manual. The 2017 revision did not include this duty. The new clause reflects the industry-wide concern about false alarms and the FRS call-challenging environment."
          />

          <ConceptBlock
            title="Acceptance test and certificate"
            plainEnglish="The commissioning sequence ends with the issue of an acceptance certificate. The certificate confirms that the system has been commissioned per BS 5839-1:2025, that all designed cause-and-effect has been verified, that the documented commissioning records support the certificate, and that the system is accepted into service. Format per BS 5839-1:2025 Annex G. Issued by the commissioning engineer; signed by the user (or user's representative). Becomes part of the system documentation handed over and retained by the user."
            onSite="The acceptance certificate is the contractual sign-off. It records the system parameters (category, number of zones, number of devices, design autonomy, ARC arrangement) and the commissioning verifications (visual, IR, cause-and-effect, sound level, battery, ARC). Issued by the engineer who carried out commissioning; signed by the user. After signature, the system is in service and the responsibility for ongoing maintenance falls to the user (typically by service contract with a competent organisation)."
          >
            <p>The acceptance certificate:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>System parameters.</strong> Category (L1, L2, L3, L4, L5, M, P1, P2, hybrid
                combinations), number of zones, number of automatic detectors, number of manual call
                points, number of sounders / VADs, design autonomy.
              </li>
              <li>
                <strong>Commissioning records.</strong> All commissioning verifications referenced —
                visual inspection record, continuity test record, IR test record, cause-and-effect
                verification record, sound level survey record, battery autonomy record, ARC
                interface record. The certificate references these; the records are appended.
              </li>
              <li>
                <strong>Variations.</strong> All variations from BS 5839-1:2025 recorded (NEW 2025 —
                was &quot;major variations&quot; only in 2017). Each variation justified.
              </li>
              <li>
                <strong>Issuer signature.</strong> Commissioning engineer signs and dates. Name,
                qualification, organisation, third-party scheme membership (if applicable — FIA /
                BAFE / NSI / SSAIB).
              </li>
              <li>
                <strong>User signature.</strong> User (or user's representative — typically building
                manager or responsible person under the Regulatory Reform Order) signs acknowledging
                acceptance and receipt of the documentation.
              </li>
              <li>
                <strong>Format.</strong> Annex G of BS 5839-1:2025 gives a model form. Project may
                use an organisation-specific form provided it captures all the Annex G elements.
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
            title="What to remember on site"
            points={[
              'Commissioning sequence: visual → continuity → IR (devices off) → polarity / address → first power-up → cause-and-effect → device functional → sound level → battery → ARC → fault sim → acceptance → false-alarm advice → docs.',
              'Cause-and-effect verification: every cause triggered, every effect observed. NEW 2025 mandatory documentation — matrix or text description handed over with system.',
              'Sound level: 65 dB(A) at all accessible points / 75 dB(A) at bed-head / ≥5 dB above 30s+ background. Calibrated meter, walked in service conditions, recorded.',
              'VAD per BS EN 54-23 where VAD is primary signal: device category, coverage volume, luminous flux. Manuf. table or calc.',
              'Battery autonomy: design quiescent + alarm at end. Commissioning by load test + calculation; full-duration repeated annually.',
              'NEW 2025 clause 14.17 (Cat L): alarm to ARC ≤90 s; catastrophic failure ≤3 min at ARC and CIE.',
              'NEW 2025 clause 14.18 (Cat P): alarm to ARC ≤120 s; catastrophic failure ≤31 min at ARC and CIE.',
              'NEW 2025 clause 29.6: commissioning organisation must advise user on false-alarm investigation. Briefed at handover, recorded in O&M.',
              'False alarm trigger points: preliminary investigation if rate >4 per 100 detectors p.a.; in-depth if rate >5 per 100 detectors p.a. (systems >40 detectors).',
              'Sprinkler-as-heat-detector (NEW 2025 §14 clarification): sprinkler indication zone must NOT overlap with more than one fire detection zone.',
              'Fault simulation: o/c, s/c, e/f, mains-fail, battery-fail injected at commissioning; CIE indication verified.',
              'Acceptance certificate per Annex G; issued by engineer, signed by user; commissioning records appended.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'BS 5839-1:2025 says cause-and-effect matrix is mandatory documentation. What if the design is so simple that a matrix is overkill?',
                answer:
                  'A text description is acceptable for simple designs. The standard explicitly says the cause-and-effect can be "as simple as ‘this system operates as a simultaneous evacuation’" or a formal matrix for complex strategies. The requirement is that the cause-and-effect is documented and handed over — format is flexible. Verified at commissioning regardless of format.',
              },
              {
                question:
                  'The new 2025 clause 14.17 specifies 90 s alarm transmission to ARC for Cat L. How is this verified at commissioning?',
                answer:
                  'Coordinate with the ARC. Trigger an alarm at the panel with a stopwatch start. The ARC operator records receipt time and reports back. Verify the time elapsed is ≤90 s. Repeat for the catastrophic-failure timing: simulate path failure (e.g. pull primary IP path), wait, observe panel and ARC indication of catastrophic failure, verify ≤3 min. Both results recorded on commissioning record. The ARC will typically have a procedure for this commissioning test — coordinate in advance.',
              },
              {
                question:
                  'Sound level 65 dB(A) at all accessible points — what counts as "accessible"?',
                answer:
                  'Anywhere a person can reach during normal occupancy: corridors, rooms, plant rooms, stair landings, plant cupboards, roof-access positions if those are part of normal use. Excludes locked or non-traversed spaces (e.g. the inside of a sealed riser shaft). The judgement is "could a person be in this position when an alarm sounds?" — if yes, accessible point; if no, not.',
              },
              {
                question:
                  'VAD verification — when is BS EN 54-23 mandatory at commissioning vs supplementary?',
                answer:
                  'Mandatory when VAD is the PRIMARY evacuation signal (e.g. for hearing-impaired occupants or in noise-exempt areas). Supplementary when VAD complements an audible signal (most common case). Where supplementary, audible verification is the primary commissioning check; VAD activation observed during cause-and-effect is sufficient. Where primary, BS EN 54-23 device certification + coverage verification (manuf. table or calc) is mandatory.',
              },
              {
                question:
                  'Battery autonomy at commissioning — full-duration test, or load test + calculation?',
                answer:
                  'Industry practice: load test + calculation at commissioning (e.g. 30-60 min runtime + impedance + capacity calc); full-duration test (24 h or 72 h) repeated at annual service. The commissioning approach proves the battery is fit for purpose without holding up the project for a full duration. The annual service repeats with full duration as part of the service-life verification.',
              },
              {
                question:
                  'Clause 29.6 says I must advise the user on false-alarm investigation. What format should the advice take?',
                answer:
                  'Format flexible. Typical: a written false-alarm-investigation procedure in the O&M manual, briefed verbally to the responsible person at handover, briefing acknowledged by signature on the acceptance certificate or a dedicated record. Content: categories of false alarm, trigger points for preliminary / in-depth investigation, recommended actions (managerial, system mod, engaged investigator), record-keeping requirements. Recommended in writing because the 2025 revision specifically introduces this duty.',
              },
              {
                question:
                  'Cause-and-effect verification on a 200-device system — do I really test EVERY cause?',
                answer:
                  'Yes. Every detector, every MCP, every interface input. The 2025 revision elevates cause-and-effect to mandatory documentation; verifying a representative sample is not verifying the design intent. Typical commissioning event for a 200-device addressable system is 2-3 days with two engineers. Plan accordingly. The commercial pressure to short-cut is real; the court-aware liability for short-cutting is also real.',
              },
              {
                question:
                  'Fault simulation — open-circuit, short-circuit, earth-fault — how is this done in practice?',
                answer:
                  'At a representative point on each loop: (a) open-circuit by disconnecting one conductor at a base — verify CIE reports loop fault, isolators latch, devices on either side of break still online; (b) short-circuit by bridging the two loop conductors at a base — verify CIE reports loop fault and isolators latch; (c) earth-fault by bonding one conductor to the FE — verify CIE reports earth fault. Restore after each. Test mains-fail by isolating mains breaker; battery-fail by disconnecting one battery. Each fault produces a specific indication on the CIE — record the indications observed.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Commissioning procedures — Module 5.5" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-5/section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.6 Handover and documentation
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

export default FireAlarmModule5Section5;
