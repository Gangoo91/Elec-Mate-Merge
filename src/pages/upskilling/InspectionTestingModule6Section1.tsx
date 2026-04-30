import { ArrowLeft, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
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
    id: 'mod6-s1-type-ac-window',
    question:
      'You are designing a new lighting circuit using LED drivers. The site spark wants to fit Type AC RCBOs because they are cheaper and in stock. Is that compliant under A4:2026?',
    options: [
      'Yes — lighting is a fixed load, so Type AC is fine.',
      'No. LED drivers contain switch-mode supplies that produce DC components. Reg 531.3.3 fails the "no DC components" test — Type A is the minimum.',
      'Yes, provided each driver is below 25 W.',
      'Only if the lighting is on a separate distribution board.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 531.3.3 limits Type AC to fixed equipment where the load is known to contain no DC components. Electronic LED drivers fail that condition. Type A is the new floor for general-purpose work.',
  },
  {
    id: 'mod6-s1-ev-charger',
    question:
      'A 7 kW domestic EV charge point\'s installation manual says "Type B RCD upstream OR Type A where the unit incorporates an integrated RDC-DD". The charger has no RDC-DD. The board has a 30 mA Type A RCBO upstream. EICR code?',
    options: [
      'C3 — improvement recommended only.',
      'No code — Type A is always acceptable for sockets.',
      'C2 — potentially dangerous. The Type A cannot detect smooth DC residual current from the on-board charger; without an RDC-DD this fails Section 722.',
      'C1 — danger present.',
    ],
    correctIndex: 2,
    explanation:
      'Type A is blinded by smooth DC above ~6 mA. With no RDC-DD to BS IEC 62955 in the unit, the upstream RCD must be Type B. C2 is the appropriate code — the protection cited on the certificate does not match the residual-current spectrum the load can produce.',
  },
  {
    id: 'mod6-s1-selectivity',
    question:
      'On a TT origin you have a 100 mA non-delayed Type A RCD upstream of 30 mA non-delayed Type A RCBOs. Does this give selectivity?',
    options: [
      'Yes — the 100 mA is more than triple the 30 mA, so the upstream device will hold.',
      'No. The current ratio alone is not enough — the upstream device must be time-delayed (Type S). A 100 mA non-delayed RCD can race the 30 mA downstream device on the same residual current and both can trip.',
      'Yes, provided the upstream device is on a separate phase.',
      'Only if the downstream device is Type B.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 536.4.1.4 requires both ingredients: a current ratio AND a time delay. Type S devices to BS EN 61008-1 / 61009-1 are time-delayed in their product standard. A non-delayed 100 mA over a non-delayed 30 mA gives no real selectivity.',
  },
  {
    id: 'mod6-s1-standard-column',
    question:
      'You are filling in the Schedule of Test Results "device standard" column for a 30 mA Type A RCBO. Which BS EN reference goes in the cell?',
    options: [
      'BS EN 60898 — that is the RCBO standard.',
      'BS EN 61009 — RCBOs are built to the 61009 series.',
      'BS EN 61008 — that is the RCBO standard.',
      'BS EN 62423 — all Type A devices use this.',
    ],
    correctIndex: 1,
    explanation:
      'RCBOs are built to BS EN 61009. RCCBs (no integral overcurrent) are 61008. BS EN 60898 is the MCB-only standard. Type F / Type B household devices are 62423. Recording 60898 against an RCBO is the canonical transcription error called out in Reg 531.3.4.1.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 531.3.3 (A4:2026) restricts the use of Type AC RCDs. What is the precise condition under which a Type AC RCD may still be used?',
    options: [
      'On any final circuit, provided it is upstream of a 30 mA RCBO',
      'Only to serve fixed equipment, where it is known that the load current contains no DC components',
      'Only on lighting circuits in domestic premises',
      'Only on circuits rated above 32 A',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 531.3.3 in BS 7671:2018+A4:2026 limits Type AC to fixed equipment where it is known the load current contains no DC components. Socket-outlet circuits and any circuit feeding equipment that may contain power electronics fail this test, which is why Type AC has effectively been ruled out of new general-purpose work.',
  },
  {
    id: 2,
    question:
      'A new build domestic socket circuit has been wired to a Type AC RCBO. A subsequent inspection by another contractor flags this. Why?',
    options: [
      'Type AC is fine on socket circuits, the inspector is wrong',
      'Socket-outlets may serve portable equipment containing rectifiers, switch-mode supplies or VFD-style loads. Reg 531.3.3 forbids Type AC where the load current may contain DC components — Type A is the minimum for socket circuits',
      'Type AC is only forbidden in commercial premises',
      'Only Type B is permitted on socket circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Socket-outlets are general-purpose connection points; portable equipment (laptop chargers, LED drivers, induction-hob plug appliances) routinely produces residual currents with DC components that can blind a Type AC RCD. The product-standard route via BS 7288 even excludes Type AC SRCDs on socket-outlets for that reason. Type A is now the practical minimum.',
  },
  {
    id: 3,
    question:
      'The definition of Type B in BS 7671 (with reference to BS EN 62423) covers which residual-current waveforms?',
    options: [
      'Only sinusoidal AC up to 50 Hz',
      'AC and pulsating DC only',
      'Type F capabilities plus residual sinusoidal AC up to 1 kHz, AC superimposed on smooth DC, pulsating DC superimposed on smooth DC, rectified DC from two or more phases, and smooth DC independent of polarity',
      'Smooth DC only',
    ],
    correctAnswer: 2,
    explanation:
      'Type B is the highest-detection class. Per BS EN 62423, it must respond to all the waveforms Type F handles plus residual sinusoidal AC up to 1 kHz, AC on smooth DC, pulsating DC on smooth DC, rectified DC from multi-phase rectifiers, and smooth DC suddenly applied or slowly increased — independent of polarity.',
  },
  {
    id: 4,
    question:
      'Why does an EV charging point (mode 3, AC) typically need either a Type B RCD or a Type A RCD with an RDC-DD?',
    options: [
      'Because the cable run is long',
      'Because the in-vehicle rectifier produces smooth DC fault currents that a Type A would not detect; BS 7671 cross-references BS IEC 62955 for the RDC-DD as an alternative to a Type B',
      'Because EV chargers run at high voltage',
      'Because the car is portable equipment',
    ],
    correctAnswer: 1,
    explanation:
      'On-board EV rectifiers can present smooth DC residual currents during a fault. Type A is blinded by DC above ~6 mA. BS 7671 (Section 722) requires either a Type B RCD or, where a Type A is used, a residual DC detection device (RDC-DD) to BS IEC 62955 to handle the DC component. A bare Type A with no RDC-DD is non-compliant.',
  },
  {
    id: 5,
    question:
      'Reg 531.3.4.1 lists the product standards an RCD intended to be operated by an ordinary person must comply with. Which option is NOT listed?',
    options: [
      'BS EN 61008 series for Type AC and Type A RCCBs',
      'BS EN 61009 series for Type AC and Type A RCBOs',
      'BS EN 62423 for Type F and Type B RCCBs and RCBOs',
      'BS EN 60898 for Type B miniature circuit-breakers',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 60898 is the MCB standard, not an RCD product standard. Reg 531.3.4.1 lists BS EN 61008 (RCCBs Type AC/A), BS EN 61009 (RCBOs Type AC/A), BS EN 62423 (Type F/B RCCBs and RCBOs) and BS 7288 (Type AC/A SRCDs and FCURCDs). Mixing the two standards on a certificate is a recurring documentation error.',
  },
  {
    id: 6,
    question:
      'A 3-phase VFD-fed motor circuit. Why is selecting a Type B RCD important and what would Type A miss?',
    options: [
      'Type A is fine — VFDs only generate AC',
      'A VFD produces residual currents that include rectified DC from multiple phases and high-frequency components beyond 50/60 Hz. Type A is not specified for those waveforms — it can be desensitised or fail to detect a fault. Type B is specified for residual rectified DC from two or more phases and AC up to 1 kHz',
      'Only Type F is needed for VFDs',
      'Type B is only needed on inverter-fed lifts',
    ],
    correctAnswer: 1,
    explanation:
      'A 3-phase VFD on the load side produces residual currents with smooth DC and rectified DC from multiple phases, plus higher-frequency components. The BS EN 62423 Type B definition explicitly covers these. Type A only covers sinusoidal AC and pulsating DC — neither matches the VFD residual-current spectrum.',
  },
  {
    id: 7,
    question:
      'On the consumer-unit design for a new-build flat, an RCBO per final circuit is being proposed instead of a single 30 mA RCD covering the whole board. Which BS 7671 regulation explicitly supports this approach?',
    options: [
      'Reg 411.3.4',
      'Reg 531.3.2 indent (b) — RCBOs for individual final circuits in residential premises to minimise unwanted tripping',
      'Reg 421.1.7',
      'Reg 643.8',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 531.3.2(b) calls out the use of RCBOs on individual final circuits in residential premises specifically to minimise unwanted tripping — the per-circuit approach also localises faults rather than dropping a whole side of the board on a single residual-current event.',
  },
  {
    id: 8,
    question:
      'Reg 531.3.4.201 is the A4 requirement that an RCD operable by an ordinary person shall not be modifiable without a deliberate act using a key or tool, with visible indication. What is the practical effect on field selection?',
    options: [
      'It rules out devices where the residual-current setting or time delay can be adjusted with a finger or screwdriver in normal use',
      'It only applies to time-delayed RCDs',
      'It applies only to industrial settings',
      'It is a labelling requirement only',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 531.3.4.201 is a tamper-resistance requirement. A consumer-unit RCD whose IΔn or time delay can be casually nudged by an end-user is non-compliant. Adjustable industrial RCDs need a key/tool action and visible setting indication to remain compliant where ordinary persons are within reach.',
  },
  {
    id: 9,
    question:
      'A retrofit on a TT origin: 30 mA RCBO per circuit downstream of a 100 mA time-delayed Type S RCD at the origin. Why this arrangement?',
    options: [
      'For aesthetic reasons',
      'To provide selectivity (discrimination) — the 30 mA per-circuit RCBOs clear final-circuit faults; the 100 mA time-delayed Type S at the origin only operates for upstream / supply-side faults the per-circuit devices cannot see, and lets downstream devices clear first. Reg 536.4.1.4 covers selectivity',
      'Because TT systems forbid 30 mA RCBOs',
      'Because Type S is required on every TT circuit',
    ],
    correctAnswer: 1,
    explanation:
      'A TT origin needs RCD fault-protection for the supply-side conductors. A 100 mA time-delayed Type S device at the origin gives that, while letting the 30 mA per-circuit RCBOs clear final-circuit faults first. Reg 536.4.1.4 (and the RCD selectivity rules) make this the standard pattern.',
  },
  {
    id: 10,
    question:
      'Which of these is a defensible justification on an EICR comments column for keeping an existing Type AC RCBO in service on an unaltered pre-existing circuit?',
    options: [
      'Type AC is always fine if it was compliant when installed',
      'A documented assessment that the connected fixed load contains no DC components, that no socket-outlets are served by the circuit, and the circuit has not been altered — recorded against Reg 531.3.3 and the relevant amendment of BS 7671',
      'The customer prefers it',
      'Type AC is exempt from inspection',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 amendments are not retrospective, but Reg 531.3.3 sets the conditions under which Type AC is acceptable: fixed equipment, no DC components in the load. An EICR comment that records the load assessment, the absence of socket-outlets and the unaltered status is the defensible position. Anything less is a code C3 at best.',
  },
];

const InspectionTestingModule6Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'RCD types and applications | I&T Module 6.1 | Elec-Mate',
    description:
      'BS 7671 A4:2026 Reg 531.3.3 / 531.3.4.1 / 531.3.4.201: RCD types AC, A, F, B and B+, why Type AC is now general-prohibited, why Type A is the new socket-circuit default, EV charging Type B and RDC-DD, RCBOs per circuit, time-delayed Type S for selectivity.',
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
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 1"
            title="RCD types and applications"
            description="Type AC, A, F and B explained against the residual-current waveforms each one actually detects — and what A4:2026 changed about which type belongs on which circuit."
            tone="yellow"
          />

          <TLDR
            points={[
              'Four RCD types are recognised by BS 7671 — AC, A, F and B — defined by which residual-current waveforms they will detect. Pick the wrong type and the device is silent during a real fault.',
              'Reg 531.3.3 (A4:2026) restricts Type AC to fixed equipment where the load current is known to contain no DC components. In practice that rules Type AC out of socket circuits, EV charging, lighting with electronic drivers, and almost any modern domestic load.',
              'Type A is the new minimum for general-purpose work — sinusoidal AC plus pulsating DC. Reg 531.3.4.1 lists BS EN 61008 / 61009 as the product standards for Type AC and Type A devices intended for ordinary persons.',
              'Type B is required where smooth DC residual currents can occur: 3-phase VFDs, EV charging (or use Type A + RDC-DD per BS IEC 62955), some PV / battery storage circuits, and medical group 1/2 areas.',
              'Reg 531.3.2(b) supports RCBOs per individual final circuit in residential premises to minimise unwanted tripping. Reg 531.3.4.201 (A4) requires that ordinary-person RCDs cannot be re-set or recalibrated without a key or tool and a visible indication.',
              'Time-delayed Type S devices at the origin (typically 100 mA, BS EN 61008-1 / 61009-1) give selectivity over downstream 30 mA non-delayed devices — Reg 536.4.1.4.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the residual-current waveforms each RCD type (AC, A, F, B) is specified to detect, and the product standard each type is built to',
              'Apply Reg 531.3.3 / 531.3.4.1 / 531.3.4.201 (A4:2026) to a real circuit and decide whether Type AC is permitted, prohibited or simply unwise',
              'Identify load types that mandate Type B (or Type A + RDC-DD) — EV charging, VFDs, multi-phase rectifiers, battery storage',
              'Choose between an upfront RCD and per-circuit RCBOs, and justify the choice from Reg 531.3.2(b)',
              'Specify time-delayed Type S devices for selectivity at the origin of a TT or split-bus arrangement, against Reg 536.4.1.4',
              'Record RCD type, product standard and rated residual operating current correctly on the Schedule of Test Results',
            ]}
          />

          <ContentEyebrow>The four RCD types — what each one actually sees</ContentEyebrow>

          <ConceptBlock
            title="Type AC, A, F and B — defined by waveform, not by appearance"
            plainEnglish="An RCD type is defined by the residual-current waveforms it is required to detect and trip on. Two RCDs that look identical can sit in different classes — the marking on the device is the only reliable way to tell."
            onSite="The classification matters because real loads do not produce a polite 50 Hz sinusoidal residual current. Modern equipment produces residual currents with DC components, high-frequency content and waveforms that can blind a lower-class RCD entirely."
          >
            <p>
              BS 7671 recognises four RCD types — AC, A, F and B — each tied to a product standard
              and each defined by the residual-current waveforms it must operate on. The hierarchy
              is cumulative: each higher class detects everything the class below does, plus extra
              waveforms.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-white">Type AC</strong> — sinusoidal residual AC current
                only. Built to BS EN 61008 / 61009. Will not reliably detect pulsating DC, smooth DC
                or AC superimposed on DC. The waveform restriction is exactly why Reg 531.3.3 limits
                its use.
              </li>
              <li>
                <strong className="text-white">Type A</strong> — sinusoidal AC plus pulsating DC
                residual currents (suddenly applied or smoothly rising). Built to BS EN 61008 /
                61009. The new general-purpose minimum across BS 7671 work.
              </li>
              <li>
                <strong className="text-white">Type F</strong> — Type A capability plus composite
                residual currents (suddenly applied or slowly rising), and pulsating DC superimposed
                on a smooth DC component up to 10 mA. Designed for circuits supplied between line
                and neutral or line and earthed middle conductor — in practice, circuits feeding
                single-phase frequency-controlled loads such as variable-speed pumps and washing
                machines.
              </li>
              <li>
                <strong className="text-white">Type B</strong> — Type F capability plus residual
                sinusoidal AC up to 1 kHz; AC superimposed on smooth DC; pulsating DC on smooth DC;
                rectified DC from two or more phases; and residual smooth DC, suddenly applied or
                slowly increased, independent of polarity. Built to BS EN 62423 (or BS EN 60947-2
                for industrial CBRs / MRCDs).
              </li>
            </ul>
            <p>
              The shorthand rule: AC sees only AC. Type A adds pulsating DC. Type F adds composite
              waveforms and small smooth-DC tolerance. Type B adds true smooth DC and up-to-1 kHz
              AC, regardless of polarity.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 531.3.3"
            clause={
              <>
                Regulation 531.3.3 now states that RCD Type AC shall only be used to serve fixed
                equipment, where it is known that the load current contains no DC components.
              </>
            }
            meaning="This is the regulation that quietly removed Type AC from almost all real-world circuits. Two conditions, both required: fixed equipment AND positive knowledge that the load current has no DC component. Socket-outlets fail the first; modern lighting, EV charging, and any rectifier-fed equipment fail the second. The default for new general-purpose work has shifted to Type A as a result."
          />

          <ConceptBlock
            title="The Type AC retreat — why it matters for inspection and design"
            plainEnglish="Type AC RCDs were the workhorse of pre-A2:2022 installations. The amendment process tightened the rule because the field changed: rectifier-fed equipment is now ubiquitous, and a Type AC that cannot see DC residual current is essentially blind to faults from those loads."
          >
            <p>
              The Reg 531.3.3 wording is precise. Type AC may be used <strong>only</strong> to serve{' '}
              <strong>fixed</strong> equipment, <strong>where it is known</strong> that the load
              current contains no DC components. Three failure modes follow from that:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                A Type AC SRCD (a socket-outlet incorporating an RCD to BS 7288) on a
                general-purpose socket cannot meet the fixed-equipment condition. The socket may
                serve any portable load. Reg 531.3.4.1(d) restricts BS 7288 SRCDs to Type AC and
                Type A — Type AC SRCDs on general socket-outlets are now ruled out.
              </li>
              <li>
                A Type AC RCBO on a final circuit feeding lighting with electronic drivers, modern
                appliances containing switch-mode supplies, or any rectifier-fed equipment fails the
                "no DC components" test the moment that load is connected. The DC component does not
                have to be large to desensitise the device.
              </li>
              <li>
                On an EICR, a Type AC device on a circuit that may contain DC components is
                typically a code C3 (improvement recommended) at minimum, and a code C2 (potentially
                dangerous) where the load demonstrably produces DC residual currents that the device
                will not detect — for example a Type AC RCD upstream of an EV charge point with no
                RDC-DD.
              </li>
            </ul>
            <p>
              For new work, Type A is the practical floor. Type AC is reserved for circuits where
              the designer can write down — and defend on inspection — that the connected load is
              fixed and produces no DC component.
            </p>
          </ConceptBlock>

          <Scenario
            title="A2:2022 install with Type AC RCBO on a kitchen socket circuit — found at periodic"
            situation="A 32 A B-curve RCBO on a kitchen ring is marked Type AC. The schedule of test results from the original install records 22 ms at IΔn, well within limit. Two years on, the kitchen has an induction hob plug-appliance, a coffee machine with an electronic motor controller, and three USB-PD chargers in routine use."
            whatToDo="Code C3 on the EICR, with a clear comment: 'Type AC RCBO on socket circuit serving loads likely to contain DC components — non-compliant with Reg 531.3.3. Recommend replacement with Type A RCBO at next maintenance window.' If the load is documented as producing measurable smooth DC residual current, escalate to C2 — the device will be slow or silent on a real fault."
            whyItMatters="The trip-time reading from the install is meaningless against a load the RCD cannot see. The Schedule of Test Results captures only the AC test response. A Type AC against a smooth-DC residual is the canonical 'looks compliant on the cert, dangerous on the wall' failure."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Type A — the new general-purpose floor</ContentEyebrow>

          <ConceptBlock
            title="Why Type A is now the default for socket-outlet circuits"
            plainEnglish="Type A handles sinusoidal AC and pulsating DC residual currents. That is the residual-current footprint of nearly every domestic and light-commercial load that contains a half-wave or full-wave rectifier — laptop chargers, LED drivers, single-phase variable-speed motors, induction hobs, washing machines."
            onSite="If you are specifying an RCBO for a domestic or small-commercial socket circuit and you are not asked to use Type B for a specific reason (EV, three-phase VFD, medical area), Type A is the answer. The cost premium over Type AC has narrowed to the point where Type AC's only remaining advantage is legacy stock."
          >
            <p>
              The Type A definition (per BS EN 61008 / 61009) is residual sinusoidal alternating
              current plus residual pulsating direct current, suddenly applied or smoothly
              increasing. Pulsating DC is the residual-current waveform produced when a half-wave
              rectifier earth-fault occurs — exactly the kind of fault a switch-mode power supply
              can produce, and exactly what Type AC misses.
            </p>
            <p>
              Type A is now the practical floor across nearly all BS 7671 work. The few situations
              where Type AC remains permitted are specific fixed-equipment loads where the designer
              has documented that no DC residual-current component is possible — a dedicated heating
              element circuit with no electronic control, for example. The moment any electronic
              switching is added, Type AC drops out of compliance.
            </p>
            <p>
              The default for socket-outlet circuits is Type A as a minimum. Reg 531.3.4.1 sets the
              product standards (BS EN 61008 series for RCCBs, BS EN 61009 series for RCBOs); if the
              device does not bear those marks for Type A or higher, do not install it.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 531.3.4.1"
            clause={
              <>
                In AC installations having RCDs that are intended to be operated by ordinary
                persons, the RCDs shall comply with: (a) BS EN 61008 series for Type AC and Type A
                RCCBs; or (b) BS EN 61009 series for Type AC and Type A RCBOs; or (c) BS EN 62423
                for Type F and Type B RCCBs and RCBOs; or (d) BS 7288 for Type AC and Type A SRCDs
                and FCURCDs.
              </>
            }
            meaning="Four product-standard routes for ordinary-person RCDs. The schedule of test results 'standard' column should record one of these — recording 'BS EN 60898' against an RCBO is a common transcription error (60898 is the MCB standard). For Type B RCCBs / RCBOs the route is specifically BS EN 62423. Anything outside these four references either belongs to instructed/skilled-person territory (Reg 531.3.4.2 — adds BS EN 60947-2) or is non-compliant."
          />

          <SectionRule />

          <ContentEyebrow>Type F — the missing middle for single-phase VFD loads</ContentEyebrow>

          <ConceptBlock
            title="What Type F adds over Type A — and why it shows up in modern domestic kit"
            plainEnglish="Type F was introduced for circuits feeding single-phase frequency-converter loads — washing machines and dishwashers with inverter-driven motors, variable-speed pumps, some heat-pump compressors. The residual-current waveform from those loads is a composite of AC, pulsating DC and small smooth-DC components that Type A is not specified to detect reliably."
          >
            <p>
              The BS EN 62423 Type F definition extends Type A by adding tripping for composite
              residual currents (suddenly applied or slowly rising), and pulsating DC superimposed
              on a smooth DC current of up to 10 mA. The use case is the kind of single-phase
              inverter-fed appliance that is now ordinary in domestic kitchens and utility rooms.
            </p>
            <p>In practice Type F is most commonly chosen where:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                A washing machine, dishwasher or heat-pump tumble-drier circuit serves an inverter
                appliance and the appliance manufacturer's installation instructions specify Type F
                or higher.
              </li>
              <li>
                A variable-speed pump or fan circuit on a single-phase supply produces composite
                residual currents that the design assessment flagged as out of scope for Type A.
              </li>
              <li>
                A low-current single-phase frequency converter feeds a small motor where Type B
                would be specified-overkill but Type A would be specified-shy.
              </li>
            </ul>
            <p>
              Type F is the right answer when the load is single-phase frequency-controlled and the
              residual-current spectrum exceeds Type A but does not reach the smooth-DC, multi-phase
              territory that demands Type B. Where in doubt — and where the cost difference is small
              — go up to Type B rather than down to Type A.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Type B — where smooth DC residual currents are possible</ContentEyebrow>

          <ConceptBlock
            title="Type B is mandatory where the load can produce smooth DC residual current"
            plainEnglish="Type B is the only RCD class specified to operate for smooth DC residual currents, independent of polarity. That is the residual-current waveform a 3-phase rectifier or an EV on-board charger produces during a fault — and the one a Type A simply cannot see above ~6 mA."
            onSite="The decision pivot is the load. If the load contains a 3-phase bridge rectifier, an EV on-board charger, a battery-charging circuit at any meaningful current, or any equipment where the manufacturer's instructions specify Type B — fit Type B. Or, where the standard permits it, Type A with an RDC-DD."
          >
            <p>
              The BS EN 62423 Type B definition is exhaustive: tripping for everything Type F
              covers, plus residual sinusoidal AC up to 1 kHz, AC superimposed on smooth DC,
              pulsating DC on smooth DC, residual rectified DC from two or more phases, and residual
              smooth DC (suddenly applied or slowly increased){' '}
              <strong>independent of polarity</strong>. The polarity-independence requirement is
              critical: the device must operate whether the DC residual flows L-to-E or E-to-L.
            </p>
            <p>The standard application classes are:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>EV charging</strong> — Section 722 requires either a Type B RCD, or a Type A
                RCD plus an RDC-DD to BS IEC 62955 that handles the smooth-DC residual current. Type
                AC is ruled out, Type A alone is ruled out without the RDC-DD.
              </li>
              <li>
                <strong>3-phase variable-speed drives (VFDs)</strong> — the input rectifier produces
                rectified DC from multiple phases on a fault. Type B covers this explicitly; Type A
                does not.
              </li>
              <li>
                <strong>Solar PV with battery storage / hybrid inverters</strong> — Section 712 and
                the equipment manufacturer's instructions typically require Type B unless the
                inverter design provides at least simple separation between the AC and DC sides
                (which removes the smooth-DC residual-current path).
              </li>
              <li>
                <strong>Medical group 1 and group 2 locations</strong> — Reg 710.531.3.3.101
                prohibits Type AC and tightens the RCD selection regime; Type B is commonly
                specified for circuits feeding medical electrical equipment.
              </li>
              <li>
                <strong>Three-phase commercial rectifier loads</strong> — UPS supplies, rectifier
                front ends on industrial machinery, plating-line DC supplies, EV depot charging.
              </li>
            </ul>
            <p>
              "Type B+" is a manufacturer designation (not a BS 7671 category) that adds tripping up
              to higher AC frequencies (typically 20 kHz) and is sometimes specified for specialist
              medical / pharma / IT installations. Where it appears in a manufacturer's
              instructions, install to spec; where it does not, BS EN 62423 Type B remains the
              regulatory anchor.
            </p>
          </ConceptBlock>

          <Scenario
            title="A 7 kW domestic EV charger — the RCD type is non-negotiable"
            situation="A 32 A single-phase EV charge point is being installed at a domestic premises. The unit's installation instructions cite Section 722 of BS 7671 and require either a Type B RCD upstream, or a Type A RCD where the unit incorporates an integrated RDC-DD to BS IEC 62955."
            whatToDo="Confirm from the unit nameplate / instructions whether an RDC-DD is integrated. If yes — Type A RCBO upstream is permitted, recorded with a note referencing the RDC-DD. If no — Type B RCBO upstream is mandatory. Type AC is ruled out by Reg 531.3.3 (DC components). Type A alone is ruled out by the lack of smooth-DC detection. Type F is not specified for EV charging."
            whyItMatters="A Type A upstream of a charge point that lacks an integrated RDC-DD is a code C2 on the EICR — the device cannot see the smooth-DC residual current the on-board charger produces during a fault. Insurance position is hostile: the design failed to follow Section 722."
          />

          {/* DIAGRAM — RCD type decision tree */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              RCD type decision tree — load type → required type, with the regulation that drives it
            </h4>
            <svg
              viewBox="0 0 880 540"
              className="w-full h-auto"
              role="img"
              aria-label="RCD type decision tree. Start with the load. If the load is fixed equipment with no DC components, Type AC is permitted by Reg 531.3.3 — but rare. If the load is a socket-outlet, lighting circuit or general purpose, Type A is the floor. If the load is a single-phase inverter appliance, Type F. If the load is EV charging, three-phase VFD, PV/battery or medical group 1/2, Type B (or Type A plus RDC-DD for EV)."
            >
              <rect
                x="340"
                y="20"
                width="200"
                height="48"
                rx="8"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="440"
                y="42"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                START
              </text>
              <text x="440" y="58" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                What does the circuit feed?
              </text>

              <rect
                x="40"
                y="100"
                width="240"
                height="60"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.4"
              />
              <text
                x="160"
                y="124"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="10"
                fontWeight="bold"
              >
                Fixed equipment AND
              </text>
              <text
                x="160"
                y="140"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="10"
                fontWeight="bold"
              >
                load known to have
              </text>
              <text
                x="160"
                y="154"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="10"
                fontWeight="bold"
              >
                no DC components?
              </text>

              <line
                x1="160"
                y1="160"
                x2="160"
                y2="200"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.4"
                strokeDasharray="4,3"
              />
              <text x="170" y="178" fill="rgba(255,255,255,0.6)" fontSize="9">
                YES (rare)
              </text>
              <rect
                x="40"
                y="200"
                width="240"
                height="60"
                rx="8"
                fill="rgba(34,197,94,0.08)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="160"
                y="224"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                Type AC permitted
              </text>
              <text x="160" y="240" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                BS EN 61008 / 61009
              </text>
              <text x="160" y="254" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Reg 531.3.3 narrow window
              </text>

              <rect
                x="320"
                y="100"
                width="240"
                height="60"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.4"
              />
              <text
                x="440"
                y="124"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="10"
                fontWeight="bold"
              >
                Socket-outlet, lighting,
              </text>
              <text
                x="440"
                y="140"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="10"
                fontWeight="bold"
              >
                general appliance — DC
              </text>
              <text
                x="440"
                y="154"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="10"
                fontWeight="bold"
              >
                components possible?
              </text>

              <line
                x1="440"
                y1="160"
                x2="440"
                y2="200"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.4"
                strokeDasharray="4,3"
              />
              <text x="450" y="178" fill="rgba(255,255,255,0.6)" fontSize="9">
                YES — default
              </text>
              <rect
                x="320"
                y="200"
                width="240"
                height="60"
                rx="8"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="440"
                y="224"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                Type A required (minimum)
              </text>
              <text x="440" y="240" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                BS EN 61008 / 61009
              </text>
              <text x="440" y="254" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Reg 531.3.3 forbids Type AC
              </text>

              <rect
                x="600"
                y="100"
                width="240"
                height="60"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.4"
              />
              <text
                x="720"
                y="124"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="10"
                fontWeight="bold"
              >
                Single-phase inverter
              </text>
              <text
                x="720"
                y="140"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="10"
                fontWeight="bold"
              >
                appliance / variable-speed
              </text>
              <text
                x="720"
                y="154"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="10"
                fontWeight="bold"
              >
                pump / heat-pump?
              </text>

              <line
                x1="720"
                y1="160"
                x2="720"
                y2="200"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.4"
                strokeDasharray="4,3"
              />
              <text x="730" y="178" fill="rgba(255,255,255,0.6)" fontSize="9">
                YES
              </text>
              <rect
                x="600"
                y="200"
                width="240"
                height="60"
                rx="8"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text
                x="720"
                y="224"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Type F
              </text>
              <text x="720" y="240" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                BS EN 62423
              </text>
              <text x="720" y="254" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                composite waveform + small DC
              </text>

              <rect
                x="40"
                y="320"
                width="800"
                height="80"
                rx="8"
                fill="rgba(239,68,68,0.08)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />
              <text
                x="440"
                y="346"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="12"
                fontWeight="bold"
              >
                Type B required (or Type A + RDC-DD for EV)
              </text>
              <text x="440" y="364" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10">
                Smooth DC residual current is possible — Type A and Type F cannot detect it.
              </text>
              <text x="440" y="382" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                EV charging (Section 722) · 3-phase VFDs · solar PV / battery storage · medical
                group 1/2 · multi-phase rectifier loads
              </text>

              <text
                x="440"
                y="420"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="9.5"
                fontWeight="bold"
              >
                Triggers — load contains:
              </text>
              <text
                x="160"
                y="446"
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="9.5"
              >
                3-phase bridge rectifier
              </text>
              <text
                x="440"
                y="446"
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="9.5"
              >
                EV on-board charger
              </text>
              <text
                x="720"
                y="446"
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="9.5"
              >
                battery-charging / DC bus
              </text>
              <text
                x="160"
                y="466"
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="9.5"
              >
                PV inverter (no separation)
              </text>
              <text
                x="440"
                y="466"
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="9.5"
              >
                manufacturer specifies Type B
              </text>
              <text
                x="720"
                y="466"
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="9.5"
              >
                medical electrical equipment
              </text>

              <rect
                x="40"
                y="490"
                width="800"
                height="40"
                rx="8"
                fill="rgba(168,85,247,0.06)"
                stroke="rgba(168,85,247,0.3)"
                strokeWidth="1"
              />
              <text x="440" y="510" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Reg 531.3.3 + Reg 531.3.4.1 + Section 722 + manufacturer instructions drive the
                decision.
              </text>
              <text
                x="440"
                y="524"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="9.5"
                fontWeight="bold"
              >
                Default for new general-purpose work: Type A. Default for EV / VFD / PV: Type B.
              </text>
            </svg>
          </div>

          <CommonMistake
            title="Specifying 'Type AC RCBO 30 mA' on a new-build socket circuit because that is what was on the previous job"
            whatHappens="The circuit may pass an AC RCD trip-time test on day one and look compliant on the schedule of test results. The first time a load with a half-wave or full-wave rectifier earth-faults — a laptop charger, an LED driver, a phone charger — the device's response is degraded or absent. The RCD is silent on the very fault families it was supposed to clear."
            doInstead="Default to Type A on every socket and lighting final circuit unless the design has a specific written reason to do otherwise. Reg 531.3.3 read with Reg 531.3.4.1 makes Type A the new floor for general-purpose work. Document the type on the schedule of test results to avoid the next inspector having to chase the device markings."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>RCD vs RCBO — and where Reg 531.3.2 points</ContentEyebrow>

          <ConceptBlock
            title="RCBOs per circuit vs single upfront RCD — the BS 7671 view"
            plainEnglish="An RCD on its own provides residual-current protection but no overcurrent protection. An RCBO is an RCD with an integral MCB — residual-current AND overcurrent protection in one device. Reg 531.3.2(b) calls out RCBOs on individual final circuits in residential premises specifically to minimise unwanted tripping."
          >
            <p>The two design patterns dominate UK domestic and small-commercial work:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Single 30 mA RCD upstream, MCBs per circuit downstream</strong> — cheaper at
                install, but a residual-current event on any single circuit drops every circuit on
                that side of the board. Reg 314.1 (division of installation into circuits) limits
                how many circuits one RCD may cover precisely so that a single trip does not
                disconnect, for example, all the lighting in a dwelling.
              </li>
              <li>
                <strong>RCBO per individual final circuit</strong> — one device per circuit. A
                residual-current event clears only the affected circuit; the rest of the board stays
                live. Reg 531.3.2(b) supports this pattern explicitly for residential premises,
                citing the reduction of unwanted tripping. Now the dominant design for new domestic
                consumer units.
              </li>
            </ul>
            <p>
              The schedule of test results "device" column should record the BS EN reference and the
              type (Type A, Type AC, Type B, etc.) for every protective device. Mixing RCD-and-MCB
              with RCBO records on the same schedule is normal — one column captures the device
              standard (61008 / 61009 / 62423 / 60898 / 60947-2), one captures the type, and the R&D
              / IΔn / trip-time columns capture the test result.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 531.3.2"
            clause={
              <>
                531.3.2 indent (b) highlights the use of RCBOs for individual final circuits in
                residential premises to minimise unwanted tripping.
              </>
            }
            meaning="The regulation pulls the per-circuit RCBO pattern into the rule-book for residential premises. Single-RCD-multiple-circuits boards still comply, but they do so against the grain of the regulation. For new domestic consumer-unit specification, RCBO-per-circuit is now the obvious answer to the 'minimise unwanted tripping' obligation."
          />

          <SectionRule />

          <ContentEyebrow>Time-delayed (Type S) RCDs and selectivity</ContentEyebrow>

          <ConceptBlock
            title="Why a 100 mA Type S at the origin — and where Reg 536.4.1.4 fits"
            plainEnglish="Time-delayed Type S RCDs deliberately wait before tripping. That delay lets a downstream non-delayed 30 mA device clear the fault first. The Type S device only operates when the downstream device fails to do its job — providing selectivity (discrimination) across protection levels."
            onSite="Standard pattern on a TT origin or a split-bus arrangement: 100 mA (or 300 mA on larger commercial origins) Type S device upstream, 30 mA non-delayed RCBOs downstream. Reg 536.4.1.4 anchors the selectivity requirement; BS EN 61008-1 / 61009-1 define the Type S characteristic."
          >
            <p>
              The selectivity question is "if a fault occurs on a final circuit, will the upstream
              device hold long enough to let the per-circuit device clear it?" Two ingredients are
              needed:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                A <strong>current ratio</strong> — the upstream device must have a higher rated
                residual operating current than the downstream device. A 100 mA upstream over a 30
                mA downstream achieves this. A 30 mA upstream over a 30 mA downstream does not —
                both can trip simultaneously on the same residual current.
              </li>
              <li>
                A <strong>time delay</strong> — the upstream device must be designed not to operate
                instantly. Type S devices to BS EN 61008-1 / 61009-1 are time-delayed in their
                product standard. Industrial CBRs / MRCDs to BS EN 60947-2 can be field-set with a
                time delay; Reg 531.3.4.201 (A4:2026) requires that any such adjustment by an
                ordinary person needs a key/tool action and visible indication of the setting.
              </li>
            </ul>
            <p>
              Where selectivity is needed, both ingredients are required. A 100 mA non-delayed RCD
              over a 30 mA non-delayed RCBO does not give selectivity: a fault near the trip
              threshold can fire both devices. Type S is the correct upstream class.
            </p>
            <p>
              Section 711 (temporary structures) and Section 740 (events / amusements) are common
              real-world places to see 100 mA / 300 mA time-delayed RCDs at the origin with 30 mA
              non-delayed RCDs on socket-outlet final circuits. The principle is the same on any
              installation that needs cascaded RCD protection.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating a 100 mA RCD upstream of a 30 mA RCD as automatic selectivity"
            whatHappens="The upstream device is 100 mA but is non-delayed. A residual current of 100 mA flows on a downstream final circuit. The downstream 30 mA device starts opening; the upstream 100 mA device also starts opening. Both trip — the entire board loses supply, not just the affected circuit. Selectivity has not been achieved despite the current ratio."
            doInstead="Specify a Type S (time-delayed) device upstream — BS EN 61008-1 / 61009-1 mark a Type S device 'S' on its label and define its time-delay characteristic. Verify on commissioning that a residual-current event downstream clears only the downstream device. Reg 536.4.1.4 is the regulatory anchor for selectivity."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The A4:2026 tamper-resistance rule for adjustable RCDs</ContentEyebrow>

          <ConceptBlock
            title="Reg 531.3.4.201 — what 'visible indication and key/tool action' actually requires"
            plainEnglish="A new requirement in A4:2026 closes a gap on adjustable RCDs intended for use by ordinary persons. If the IΔn or time delay can be changed, the change must require a deliberate act with a key or tool, and the new setting must be visible from the device."
            onSite="The rule rules out adjustable industrial-style devices being installed in consumer-accessible positions where a user could nudge the residual-current setting or time delay with a finger or screwdriver. It also rules out a setting that is hidden behind a cover with no visible indication — the inspector and the next person to work on the board need to be able to read off the live setting."
          >
            <p>
              The reasoning is risk-based. A residual-current device whose setting can be casually
              changed is a residual-current device whose protection cannot be verified from the
              schedule of test results — an end-user could move it after install. Reg 531.3.4.201
              forces three things, all of which must be present:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                The setting (IΔn or time delay) cannot be changed without a deliberate act involving
                a <strong>key or tool</strong>.
              </li>
              <li>
                The change must result in a <strong>visible indication</strong> of the setting or
                calibration — a window, dial position, or display showing the live setting.
              </li>
              <li>
                Both apply where the device may be operated by an <strong>ordinary person</strong> —
                defined by BS 7671 as a person who is not instructed or skilled.
              </li>
            </ul>
            <p>
              Industrial RCDs and MRCDs to BS EN 60947-2 can comply — but the installation needs to
              respect the rule on access. A locked panel, a tool-required cover, or a labelled
              warning that movement of the setting requires authorisation are all part of the
              compliance position.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 531.3.4.201"
            clause={
              <>
                Where an RCD may be operated by an ordinary person, it shall be designed or
                installed so that it is not possible to modify or adjust the setting or the
                calibration of its rated residual operating current (IΔn) or time delay mechanism
                without a deliberate act involving the use of either a key or a tool and resulting
                in a visible indication of its setting or calibration.
              </>
            }
            meaning="A new safeguard against residual-current devices being silently desensitised. The compliance position has three legs — key/tool required, visible setting, and the rule applies wherever an ordinary person is the operator. The schedule of test results should record the device IΔn and the position of any adjustable setting."
          />

          <Scenario
            title="A 3-phase commercial sub-board — the design specifies a 100 mA Type B MRCD at the origin"
            situation="The MRCD (modular residual current device) is a BS EN 60947-2 device, field-adjustable for IΔn (30 / 100 / 300 mA) and time delay (instant / 100 ms / 300 ms). It sits in a panel accessible to non-instructed staff who use the panel for switching."
            whatToDo="The settings are field-adjustable. Reg 531.3.4.201 demands the device be installed so the IΔn and time delay cannot be changed without a key or tool, and so the live setting is visibly indicated. Compliance options: (a) install behind a tool-required cover or in a locked compartment, with a visible label giving the IΔn / delay setting; (b) specify a sealed-setting variant of the device. Record the device IΔn, the time delay, and the means of compliance with Reg 531.3.4.201 on the schedule."
            whyItMatters="Without the safeguard, a maintenance operative could move the MRCD from 30 mA to 300 mA to 'stop the nuisance trips' and the protection cited on the schedule of test results no longer matches the protection installed. The A4 regulation pre-empts that drift."
          />

          <SectionRule />

          <ContentEyebrow>Recording RCD details on the Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="What the device columns on the A4:2026 schedule actually want"
            plainEnglish="The schedule of test results captures the device standard (e.g. 61008, 61009, 62423, 60898, 60947-2), the device type (AC, A, F, B), the rated residual operating current IΔn, and the trip-time results from the section 6.2 testing."
          >
            <p>
              Three columns matter for RCD selection — and the most common transcription errors all
              live here:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Standard column</strong> — record the BS EN reference for the protective
                device. RCBOs are 61009; RCCBs are 61008; Type F / Type B household devices are
                62423; SRCDs and FCURCDs to BS 7288 record 7288. Recording 60898 against an RCBO is
                wrong — 60898 is the MCB-only standard.
              </li>
              <li>
                <strong>Type column</strong> — record AC, A, F or B exactly as marked on the device.
                Where the device is a Type A with an RDC-DD function on an EV charging circuit,
                record the RCD type (A) and add a comment referencing the RDC-DD and BS IEC 62955.
              </li>
              <li>
                <strong>IΔn column</strong> — record the rated residual operating current as marked
                on the device. The trip-time columns are populated from the section 6.2 trip-time
                tests at IΔn × 1, IΔn × 5 and IΔn × 0.5.
              </li>
            </ul>
            <p>
              Comments column carries any explanation that does not fit the structured fields: "Type
              B selected per manufacturer instructions for VFD load", "Type S 100 mA at origin for
              selectivity per Reg 536.4.1.4", "Adjustable MRCD set to 30 mA / 0 ms instantaneous,
              sealed setting per Reg 531.3.4.201".
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Recording 'BS EN 60898' against an RCBO on the schedule of test results"
            whatHappens="60898 is the standard for miniature circuit-breakers (MCBs) without integral residual-current protection. An RCBO is built to BS EN 61009. The transcription error suggests the device is an MCB only, not an RCBO — which is not what is installed. On a periodic, the next inspector spots it and either has to verify the device markings personally, or has to flag the certificate as misleading."
            doInstead="Read the BS EN reference straight off the device. RCBOs are 61009; RCCBs are 61008; Type F / Type B household RCDs are 62423; industrial CBRs / MRCDs are 60947-2; SRCDs and FCURCDs are BS 7288. Take a phone photo of the device label if helpful for the records — the photo gives the next person a verifiable provenance."
          />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Type AC = AC only. Type A = AC + pulsating DC. Type F = Type A + composite + small smooth DC. Type B = Type F + smooth DC + AC up to 1 kHz, polarity-independent.',
              'Reg 531.3.3 (A4:2026): Type AC only on fixed equipment with no DC components in the load. Socket-outlets and modern lighting fail this — Type A is the new floor.',
              'EV charging (Section 722): Type B, OR Type A with an RDC-DD to BS IEC 62955. A bare Type A is non-compliant.',
              '3-phase VFDs, PV / battery storage, medical group 1/2: Type B (BS EN 62423 or BS EN 60947-2 industrial).',
              'Reg 531.3.2(b): RCBOs per individual final circuit in residential premises minimise unwanted tripping — the dominant design for new domestic consumer units.',
              'Reg 536.4.1.4 (selectivity): time-delayed Type S device at the origin with non-delayed 30 mA devices downstream. Both current ratio AND time delay required.',
              'Reg 531.3.4.201 (A4): adjustable RCDs operable by ordinary persons need key/tool action AND visible setting indication.',
              'Schedule of test results: record BS EN reference (61008 / 61009 / 62423 / 7288 / 60947-2), type (AC / A / F / B), IΔn. Recording 60898 against an RCBO is the canonical transcription error.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Is a Type AC RCBO ever still acceptable on a new install under A4:2026?',
                answer:
                  'Only in a narrow window — Reg 531.3.3 permits Type AC on fixed equipment where it is known the load current contains no DC components. A dedicated heating element circuit with no electronic control might qualify. A socket-outlet circuit, a lighting circuit with electronic drivers, an EV charge point, anything containing a switch-mode supply or rectifier — all fail the test. For modern new work, Type A is the practical floor.',
              },
              {
                question:
                  'Can I use a Type A RCBO on an EV charging circuit if the unit has its own internal residual-current protection?',
                answer:
                  'Section 722 and the unit manufacturer instructions are the test. If the unit incorporates an RDC-DD to BS IEC 62955 (residual DC detecting device), Type A upstream is permitted. If not, Type B upstream is mandatory. Read the unit installation manual carefully — the wording typically reads "Type B RCD upstream OR a Type A RCD where the unit incorporates an integrated RDC-DD". Record the route taken on the certificate.',
              },
              {
                question: "What is the difference between Type B and 'Type B+' RCDs in BS 7671?",
                answer:
                  'BS 7671 only references Type B. "Type B+" is a manufacturer designation that extends Type B detection up to higher AC frequencies (typically 20 kHz) and is sometimes specified for medical, pharma or sensitive IT installations. Where the equipment manufacturer specifies B+, install to spec and record it on the schedule with a comment. Where they do not, BS EN 62423 Type B is the regulatory anchor.',
              },
              {
                question:
                  'Why did A4:2026 add the tamper-resistance rule (Reg 531.3.4.201) when industrial RCDs have always been adjustable?',
                answer:
                  'The risk closed by A4 is that a residual-current device whose IΔn or time delay can be silently changed by an end-user is a device whose schedule-of-test-results record no longer matches the device installed. The rule does not prohibit adjustable devices — it requires that any adjustment by an ordinary person needs a deliberate key/tool action and that the live setting is visibly indicated. Sealed-setting MRCDs and locked-cover installations both comply.',
              },
              {
                question:
                  'On a TT origin, do I need a 30 mA RCD at the origin AND 30 mA RCBOs downstream?',
                answer:
                  'No, and you should not specify it that way. A 30 mA at the origin AND 30 mA downstream gives no selectivity — a fault on a final circuit can trip both devices simultaneously, dropping the whole installation. The standard pattern is a time-delayed Type S device at the origin (typically 100 mA on a domestic TT, 300 mA on larger commercial origins) with 30 mA non-delayed RCBOs downstream. Reg 536.4.1.4 anchors the selectivity rule.',
              },
              {
                question:
                  'I have an existing pre-A2:2022 board with Type AC RCBOs throughout. Does the EICR have to code-C2 every circuit?',
                answer:
                  'No — BS 7671 amendments are not retrospective, and Reg 531.3.3 sets a conditional rather than absolute prohibition. The EICR position depends on what the circuits feed. A Type AC on a circuit serving fixed equipment with no DC components is acceptable, code C3 with a comment that an upgrade to Type A would bring it in line with the current edition. A Type AC upstream of an EV charge point with no RDC-DD is a code C2 — the device cannot see the smooth-DC residual the on-board charger produces. Document each circuit individually.',
              },
              {
                question:
                  'Does the schedule of test results need to record the standard the RCD is built to (BS EN 61008 / 61009 / 62423 / 7288 / 60947-2)?',
                answer:
                  'Yes. The "device standard" column on the schedule of test results is part of the structured record — recording 61009 (RCBO) where 61008 (RCCB) is installed, or 60898 (MCB only) where an RCBO is installed, are the two most common transcription errors. Read the BS EN number straight off the device label; if the device is recessed and unreadable, take a phone photo before re-fitting the cover.',
              },
              {
                question:
                  'For a single-phase washing-machine circuit, which RCD type is correct — A or F?',
                answer:
                  'It depends on the appliance. A modern inverter-drive washing machine produces composite residual currents that the manufacturer instructions may specify Type F for. A traditional resistive-element-only appliance is comfortably within Type A. Where the appliance manufacturer specifies a type, follow the instruction and record it. Where they do not — Type A is the safe minimum, Type F is acceptable, and Type B is overkill but harmless. The risk is fitting Type AC (now non-compliant) or fitting Type A on a manufacturer-specified Type F load.',
              },
            ]}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="RCD types and applications — Module 6.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-6/section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.2 Trip time testing (×1, ×5, ×0.5)
              </div>
            </button>
          </div>

          <div className="hidden">
            <ShieldCheck />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule6Section1;
