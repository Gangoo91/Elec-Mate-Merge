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
    id: 'patm4-s2-voltage',
    question:
      'You are about to insulation-resistance test a Class I office printer. What test voltage does IET CoP specify for in-service equipment, and where is it applied?',
    options: [
      '250 V DC, applied L to N',
      '500 V DC, applied between the live conductors (L+N joined) and the protective conductor / accessible metal — IET CoP Chapter 15. The test stresses the insulation at well above operating voltage and reveals weakness before it becomes a fault',
      '1000 V AC, applied L to E',
      '230 V AC at mains frequency',
    ],
    correctIndex: 1,
    explanation:
      'IET CoP 5th Ed Chapter 15 sets the IR test at 500 V DC. The L and N conductors are linked at the appliance plug (most testers do this automatically) and the test voltage applied between that combined live and the protective conductor / casing. 250 V is used for SELV / 110 V kit; 1000 V is for higher-voltage industrial equipment.',
  },
  {
    id: 'patm4-s2-minimum',
    question:
      'A Class I appliance reads 0.7 MΩ on the IR test. The IET CoP minimum for general appliances is 1 MΩ. What is the correct response?',
    options: [
      'Pass — under 1 MΩ is fine',
      'Fail. Investigate before re-testing. Common causes: damp insulation (run the appliance, allow it to warm and dry, retest), surface contamination at terminations, capacitive coupling from a switch-mode PSU (use substitute leakage instead), or genuine insulation breakdown',
      'Pass with comment',
      'Average with the next reading',
    ],
    correctIndex: 1,
    explanation:
      'A reading below the IET CoP minimum (1 MΩ for general appliances) is a fail and triggers investigation. Damp, contamination and capacitance are recoverable causes; genuine insulation breakdown is not. Use substitute leakage (M4.4) where capacitance is the suspected cause on electronic kit.',
  },
  {
    id: 'patm4-s2-class-ii',
    question: 'You are testing a Class II hairdryer. Where do you connect the IR test probes?',
    options: [
      'L+N to earth pin — same as Class I',
      'L+N (joined at the plug) to any accessible conductive part of the casing or to a probe held against / wrapped in metal foil around the body. There is no protective conductor on a Class II appliance, so the second test point is the user-touchable metal directly',
      'L to N only',
      'Skip the test entirely — Class II does not need IR',
    ],
    correctIndex: 1,
    explanation:
      'Class II equipment has no earth pin, but the insulation between live parts and any conductive surface the user can touch must still be tested. IET CoP Ch 15 directs the test between live (L+N linked) and accessible metal — typically by wrapping a metal foil around plastic enclosures and probing the foil, or by using a designated metal grip / handle as the test point.',
  },
  {
    id: 'patm4-s2-disconnect',
    question:
      'A laptop power supply (Class I, switch-mode) repeatedly fails IR with a reading of 0.3 MΩ. Visual is fine and the unit works normally. What does IET CoP allow?',
    options: [
      'Fail and discard the unit',
      'Substitute leakage testing in lieu of the IR test, where IR cannot be performed reliably because of EMC components or capacitive coupling internal to the equipment. The substitute leakage test applies a low voltage and measures the leakage current at operating-equivalent voltage; an acceptance of ≤ 0.5 mA per IET CoP for Class I appliances confirms the equipment is safe',
      'Re-test at 250 V instead',
      'Test with the appliance unplugged',
    ],
    correctIndex: 1,
    explanation:
      'IET CoP recognises that some equipment — switch-mode PSUs, EMC-filtered IT, surge-protected kit — has internal components (Y-capacitors between L/N and earth) that legitimately fail the 500 V DC IR test even though the equipment is electrically safe. The CoP allows substitute leakage testing as the alternative for those cases. Acceptance is ≤ 0.5 mA per IET CoP Ch 15.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What test voltage does IET Code of Practice 5th Edition specify for routine in-service insulation resistance testing of 230 V appliances?',
    options: ['100 V DC', '250 V DC', '500 V DC', '1000 V AC'],
    correctAnswer: 2,
    explanation:
      'IET CoP Chapter 15 sets 500 V DC for general 230 V mains-voltage equipment. 250 V is used for SELV and 110 V kit; 1000 V is for higher-voltage industrial three-phase equipment.',
  },
  {
    id: 2,
    question:
      'The IET CoP minimum insulation resistance for a general 230 V Class I appliance is what?',
    options: ['0.5 MΩ', '1 MΩ', '2 MΩ', '5 MΩ'],
    correctAnswer: 1,
    explanation:
      'IET CoP Chapter 15 sets the minimum at 1 MΩ for general appliances. The minimum rises to 2 MΩ for surgical / medical IT equipment (where the consequences of insulation failure are more severe). Class II tests are also held to the 1 MΩ minimum.',
  },
  {
    id: 3,
    question: 'For Class I equipment, between which two points is the IR test voltage applied?',
    options: [
      'L to N',
      'L to E only',
      'L+N (linked at the plug) to the protective conductor (earth pin)',
      'L to E and N to E separately',
    ],
    correctAnswer: 2,
    explanation:
      'IET CoP Ch 15 directs that L and N are linked at the plug (PAT testers do this automatically) and the test voltage applied between that combined live and the protective conductor / earth pin. This stresses the L–E and N–E insulation simultaneously.',
  },
  {
    id: 4,
    question: 'For Class II equipment (no protective conductor), how is the IR test applied?',
    options: [
      'It is not — Class II is exempt',
      'L+N (linked) to a probe held against accessible conductive parts of the casing — typically a metal foil wrapped around the plastic enclosure, or a designated metal grip / handle',
      'Earth pin to chassis only',
      'L to N at 250 V',
    ],
    correctAnswer: 1,
    explanation:
      'Class II equipment has no earth pin, but the insulation between live parts and any accessible conductive surface still has to be tested. IET CoP directs the use of a contact probe — often via a metal foil wrap on plastic enclosures — to perform the test. The 1 MΩ minimum applies the same way.',
  },
  {
    id: 5,
    question: 'BS EN 61557-2 governs which type of test instrument?',
    options: [
      'Low-resistance ohmmeters for earth continuity',
      'Insulation resistance test instruments — the part of the BS EN 61557 series specifying performance requirements for IR testers used on low-voltage installations and equipment',
      'Mains frequency test instruments',
      'Earth-loop impedance testers',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 61557-2 specifies performance requirements for insulation resistance test equipment. BS EN 61557-4 covers low-resistance ohmmeters (earth continuity); each part of the series covers a different test instrument category.',
  },
  {
    id: 6,
    question:
      'A Class I PC tests at 0.4 MΩ on the 500 V IR test. Visual is sound and the PC functions correctly. The IT department confirm the unit is in daily use. What is the correct course of action per IET CoP?',
    options: [
      'Fail and discard',
      'Recognise that Y-capacitors and EMC components in the switch-mode PSU can produce a low-but-safe IR reading. Switch to substitute leakage testing per IET CoP — measure leakage at operating voltage and judge against the ≤ 0.5 mA acceptance value (Class I) or ≤ 0.25 mA (Class II)',
      'Re-test at 250 V',
      'Fail — IR is the only valid test',
    ],
    correctAnswer: 1,
    explanation:
      'IET CoP Chapter 15 explicitly permits substitute leakage as an alternative to IR where internal EMC capacitance produces a misleading IR result. The substitute test applies a low test voltage, measures the leakage current at the equivalent of operating voltage, and judges against ≤ 0.5 mA (Class I) or ≤ 0.25 mA (Class II). A pass on substitute leakage is a valid pass.',
  },
  {
    id: 7,
    question:
      'What does the IET CoP set as the minimum insulation resistance for surgical / medical IT equipment, distinct from general appliances?',
    options: ['1 MΩ', '2 MΩ', '5 MΩ', '10 MΩ'],
    correctAnswer: 1,
    explanation:
      'IET CoP raises the minimum to 2 MΩ for surgical IT equipment, recognising the higher consequence of insulation failure on patient-connected devices. Lab and dental kit may have their own equipment-specific limits; the 2 MΩ is the CoP baseline for medical IT.',
  },
  {
    id: 8,
    question:
      'BS 7671:2018+A4:2026 Reg 643.3 governs insulation resistance testing of the fixed installation. Why is it relevant to PAT?',
    options: [
      'It directly governs PAT — Reg 643.3 sets PAT acceptance values',
      "It governs the fixed installation, not PAT — but it is the parent principle: insulation resistance verified by application of a test voltage and measurement, with the live conductors disconnected from the supply. PAT applies the same principle to the appliance side, with acceptance set by IET CoP rather than BS 7671's 1 MΩ-per-circuit minimum",
      'It exempts PAT from IR testing',
      'It only applies to motors',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.3 sets the IR duty for the fixed installation — typically 1 MΩ minimum for the relevant circuits. PAT carries the same principle to the appliance side, but with an acceptance value tuned to portable equipment. Same principle, different acceptance, same instrument category (BS EN 61557-2).',
  },
  {
    id: 9,
    question:
      'You are testing an industrial vacuum cleaner (Class I, single-phase, 230 V). The IR reading is 14 MΩ. Pass or fail?',
    options: [
      'Fail — too high, must be a fault',
      'Pass — comfortably above the 1 MΩ minimum and consistent with sound, dry insulation. A high reading is the expected outcome on a healthy appliance with good insulation; the minimum is a floor, not a target',
      'Investigate — anything over 10 MΩ is suspicious',
      'Re-test',
    ],
    correctAnswer: 1,
    explanation:
      'A high IR reading is a healthy reading. The 1 MΩ minimum is the acceptance threshold; readings of tens or hundreds of MΩ on a sound appliance are typical and expected. Suspicion only arises with low readings (close to or below 1 MΩ).',
  },
  {
    id: 10,
    question:
      'Why is the IR test always performed AFTER earth continuity in the IET CoP test sequence?',
    options: [
      'Tradition only',
      'Because the IR test applies 500 V DC to the appliance. If the protective conductor is broken (unknown until earth continuity has been confirmed), the test voltage can leave the chassis at 500 V with no fault path. Confirming earth continuity first means the IR test is performed on an appliance with a known-good protective path — safer for the operator and gives a meaningful result',
      'Because IR is more accurate',
      'Because it tests the same insulation',
    ],
    correctAnswer: 1,
    explanation:
      'IET CoP Ch 15 sets the order deliberately: earth continuity → IR → polarity → leakage → functional. A failed earth continuity removes the appliance before IR is attempted because the test voltage on a chassis without a fault path is a safety risk. The order is procedural safety, not preference.',
  },
];

const PATTestingModule4Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Insulation resistance testing | PAT M4.2 | Elec-Mate',
    description:
      'IET Code of Practice 5th Ed Ch 15 + BS EN 61557-2: 500 V DC IR test on Class I (L+N to E) and Class II (L+N to accessible metal), the 1 MΩ general / 2 MΩ medical minimums, and the substitute-leakage alternative for switch-mode and EMC-filtered equipment.',
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
            eyebrow="Module 4 · Section 2"
            title="Insulation resistance testing"
            description="500 V DC stress-tests the insulation between live parts and earth. The 1 MΩ acceptance, the Class I vs Class II routing, and the substitute-leakage rule that saves switch-mode equipment from a false fail."
            tone="yellow"
          />

          <TLDR
            points={[
              'IET CoP 5th Ed Ch 15 sets the IR test at 500 V DC for general 230 V appliances. The voltage is applied between L+N (linked at the plug) and the protective conductor (Class I) or accessible conductive parts (Class II).',
              'Acceptance: ≥ 1 MΩ for general appliances; ≥ 2 MΩ for surgical / medical IT equipment. Class I and Class II are held to the 1 MΩ minimum (the test geometry differs, the threshold does not).',
              'BS EN 61557-2 governs the IR instrument; readings on a healthy appliance typically run from a few MΩ to hundreds of MΩ. The 1 MΩ figure is a floor, not a target.',
              'Switch-mode PSUs and EMC-filtered equipment can produce a legitimately low IR reading because of internal Y-capacitors between live and earth. IET CoP allows substitute leakage testing in lieu of IR for those cases — covered in M4.4.',
              'IR is performed AFTER earth continuity in the test sequence. A 500 V DC test on an appliance whose protective conductor is broken can leave the chassis at test voltage with no fault path — earth continuity first is a safety prerequisite, not a preference.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the IET CoP test voltage (500 V DC general / 250 V SELV / 1000 V industrial) and the construction-class-specific test connection',
              'Identify the correct minimum acceptance value for general appliances (1 MΩ) and surgical IT equipment (2 MΩ)',
              'Distinguish between a genuine IR failure and a capacitive coupling reading that warrants substitute leakage testing',
              'Reference BS EN 61557-2 as the instrument standard and recognise BS 7671 Reg 643.3 as the fixed-installation parent principle',
              'Apply the test sequence rule (earth continuity first, then IR) and explain why the order matters',
              'Record IR readings correctly with the test voltage, value in MΩ, and class-specific acceptance',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What insulation resistance verifies</ContentEyebrow>

          <ConceptBlock
            title="The barrier between live parts and the user"
            plainEnglish="An appliance has live conductors (line and neutral) that must stay isolated from anything the user can touch. The barrier is insulation: PVC sleeving on the conductors, plastic mouldings, varnish on motor windings, the air gap inside an enclosure. Insulation resistance testing applies a high DC voltage across that barrier and measures how much current leaks through. A high resistance means a sound barrier; a low resistance means the barrier has degraded."
            onSite="The IR test catches problems that visual inspection cannot see: damp insulation, internal moisture, contamination across a terminal block, a pinhole in PVC sleeving, breakdown of motor winding varnish from age or overheating. It does not catch problems that need other tests — broken earth conductor (earth continuity), reversed polarity in a cord (polarity test), excessive leakage from EMC components (leakage test)."
          >
            <p>
              IET Code of Practice 5th Edition (2020) Chapter 15 describes the IR test as the
              measurement of insulation between live conductors and accessible conductive parts (or
              the protective conductor where one is provided). The test voltage is selected to
              stress the insulation at well above its operating voltage but without damaging it on a
              healthy appliance. 500 V DC is the standard for 230 V mains equipment — twice nominal
              line-to-earth voltage, applied as DC because AC at the same RMS would also drive
              capacitive currents that confuse the reading.
            </p>
            <p>
              The duty parallels BS&nbsp;7671:2018+A4:2026 Reg&nbsp;643.3, which governs the fixed
              installation: insulation resistance between live conductors, and between live
              conductors and earth, verified at the same 500 V DC and judged against the 1 MΩ
              minimum per circuit. PAT extends that principle to the appliance side. Different
              acceptance per appliance class, same principle, same instrument category.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020) — Chapter 15"
            clause={
              <>
                The insulation resistance shall be measured by applying a DC test voltage between
                the line and neutral conductors connected together and the earth pin (Class I) or an
                accessible conductive part of the body (Class II). The test voltage shall be 500 V
                DC for equipment rated up to 500 V AC. The insulation resistance shall not be less
                than 1 MΩ.
              </>
            }
            meaning="Three pieces in one clause: the connection (L+N to E or accessible metal), the voltage (500 V DC for 230 V kit), and the minimum (1 MΩ general). The 2 MΩ figure for surgical IT appears later in Ch 15 as a stricter acceptance value for the higher-consequence application."
          />

          <ConceptBlock
            title="Class I vs Class II — same minimum, different test geometry"
            plainEnglish="Class I appliances have a protective conductor; the IR test is L+N to the earth pin. Class II appliances have no protective conductor; the test is L+N to a probe held against (or wrapped around) the accessible conductive parts of the body. The 1 MΩ minimum is the same for both."
          >
            <p>
              For Class I, the test is geometrically simple: L and N are linked inside the PAT
              tester (most testers do this automatically when IR is selected), and the test voltage
              is applied between that combined live and the earth pin of the plug. The instrument
              measures the resistance from the appliance&apos;s internal live wiring through any
              insulation barrier to the protective conductor and out to the earth pin.
            </p>
            <p>
              For Class II, the test is the same in principle but the second point changes. There is
              no protective conductor, so the second point is any accessible conductive part of the
              appliance. For a hairdryer with a metal grille, that is the grille. For a
              fully-enclosed plastic appliance with no exposed metal, the IET CoP method is to wrap
              a metal foil around a representative part of the casing and probe the foil with the IR
              test lead. The point is to apply the test voltage across the insulation barrier
              between live parts and any surface a user could touch.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The IET CoP minimums — and why surgical IT is stricter</ContentEyebrow>

          <ConceptBlock
            title="The two acceptance thresholds you actually use"
            plainEnglish="IET CoP Chapter 15 sets two minimums: 1 MΩ for general 230 V appliances, and 2 MΩ for surgical / medical IT equipment. Both Class I and Class II appliances in their respective categories are held to those values."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Equipment category</th>
                    <th className="text-center text-white/80 py-2">Test voltage</th>
                    <th className="text-center text-elec-yellow py-2">Minimum IR</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">SELV / 110 V site equipment</td>
                    <td className="text-center">250 V DC</td>
                    <td className="text-center text-elec-yellow">≥ 1 MΩ</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">General 230 V appliances (Class I and Class II)</td>
                    <td className="text-center">500 V DC</td>
                    <td className="text-center text-elec-yellow">≥ 1 MΩ</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Surgical / medical IT equipment</td>
                    <td className="text-center">500 V DC</td>
                    <td className="text-center text-elec-yellow">≥ 2 MΩ</td>
                  </tr>
                  <tr>
                    <td className="py-2">Equipment rated &gt; 500 V AC (industrial)</td>
                    <td className="text-center">1000 V DC</td>
                    <td className="text-center text-elec-yellow">≥ 1 MΩ</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The 2 MΩ threshold for surgical IT is consequence-driven. Medical equipment that
              connects to a patient (an ECG, a defibrillator, a dialysis machine) cannot tolerate
              the same level of leakage as a desk lamp; a single insulation defect can put fault
              voltage onto a patient-connected lead. The CoP raises the floor because the
              consequence floor is also raised.
            </p>
            <p>
              The 1 MΩ figure for everything else is the same number BS 7671 Reg 643.3 sets for the
              fixed installation. It is a floor, not a target — readings on healthy equipment
              routinely run into tens or hundreds of MΩ. A reading of &ldquo;&gt; 999 MΩ&rdquo; (the
              tester saturates) is a sound, dry, well-insulated appliance. A reading of 1.2 MΩ on a
              dry day is a marginal pass that should be flagged for closer inspection at the next
              cycle.
            </p>
          </ConceptBlock>

          {/* IR test schematic diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              500 V DC IR test — L+N (linked) to E on Class I; L+N to accessible metal on Class II
            </h4>
            <svg
              viewBox="0 0 800 360"
              className="w-full h-auto"
              role="img"
              aria-label="Insulation resistance test schematic. L and N are linked at the plug. 500 V DC is applied between the linked live and the earth pin (Class I) or to a probe on accessible metal (Class II). The test instrument displays the resistance in megohms."
            >
              {/* PAT tester */}
              <rect
                x="40"
                y="60"
                width="220"
                height="200"
                rx="10"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="150"
                y="85"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="12"
                fontWeight="bold"
              >
                PAT TESTER
              </text>
              <text x="150" y="102" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                BS EN 61557-2 (IR)
              </text>
              <rect
                x="70"
                y="120"
                width="160"
                height="50"
                rx="6"
                fill="rgba(0,0,0,0.4)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text
                x="150"
                y="142"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="14"
                fontWeight="bold"
              >
                42.6 MΩ
              </text>
              <text x="150" y="160" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                IR · 500 V DC
              </text>
              {/* L+N link icon */}
              <text x="150" y="200" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Internal: L &amp; N linked
              </text>
              <line
                x1="100"
                y1="215"
                x2="200"
                y2="215"
                stroke="#FBBF24"
                strokeWidth="2"
                strokeDasharray="4,3"
              />
              <circle cx="100" cy="215" r="3" fill="#EF4444" />
              <text x="92" y="232" textAnchor="middle" fill="#EF4444" fontSize="9">
                L
              </text>
              <circle cx="200" cy="215" r="3" fill="#3B82F6" />
              <text x="208" y="232" textAnchor="middle" fill="#3B82F6" fontSize="9">
                N
              </text>
              {/* Tester earth terminal */}
              <circle cx="150" cy="245" r="4" fill="#22C55E" />
              <text
                x="150"
                y="259"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                E terminal (Class I)
              </text>

              {/* Wires from tester to plug */}
              <line x1="260" y1="215" x2="320" y2="220" stroke="#FBBF24" strokeWidth="2" />
              <line x1="260" y1="245" x2="320" y2="225" stroke="#22C55E" strokeWidth="2" />

              {/* BS 1363 plug */}
              <rect
                x="320"
                y="195"
                width="80"
                height="60"
                rx="4"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <text x="360" y="213" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                BS 1363 plug
              </text>
              <rect x="335" y="223" width="6" height="14" rx="1" fill="#EF4444" />
              <rect x="350" y="223" width="6" height="14" rx="1" fill="#3B82F6" />
              <rect x="365" y="219" width="6" height="22" rx="1" fill="#22C55E" />

              {/* Class I appliance */}
              <rect
                x="430"
                y="60"
                width="320"
                height="120"
                rx="10"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.6"
              />
              <text
                x="590"
                y="82"
                textAnchor="middle"
                fill="rgba(255,255,255,0.8)"
                fontSize="11"
                fontWeight="bold"
              >
                CLASS I — L+N tied → E pin
              </text>
              {/* Insulation barrier representation */}
              <rect
                x="460"
                y="100"
                width="260"
                height="60"
                rx="4"
                fill="rgba(34,197,94,0.05)"
                stroke="#22C55E"
                strokeDasharray="4,3"
                strokeWidth="1.2"
              />
              <text x="590" y="120" textAnchor="middle" fill="#22C55E" fontSize="9">
                Insulation barrier
              </text>
              <text x="590" y="138" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                R ≥ 1 MΩ (≥ 2 MΩ medical IT)
              </text>
              <text x="590" y="155" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                live conductors ↔ chassis / earth
              </text>

              {/* Class II appliance */}
              <rect
                x="430"
                y="200"
                width="320"
                height="120"
                rx="10"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.6"
              />
              <text
                x="590"
                y="222"
                textAnchor="middle"
                fill="rgba(255,255,255,0.8)"
                fontSize="11"
                fontWeight="bold"
              >
                CLASS II — L+N tied → probe on metal foil
              </text>
              <rect
                x="460"
                y="240"
                width="260"
                height="60"
                rx="4"
                fill="rgba(251,191,36,0.05)"
                stroke="#FBBF24"
                strokeDasharray="4,3"
                strokeWidth="1.2"
              />
              <text x="590" y="260" textAnchor="middle" fill="#FBBF24" fontSize="9">
                Double / reinforced insulation
              </text>
              <text x="590" y="278" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                R ≥ 1 MΩ (live ↔ accessible metal)
              </text>
              <text x="590" y="295" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Probe / foil-wrap on plastic body
              </text>

              {/* Caption */}
              <rect
                x="40"
                y="330"
                width="720"
                height="22"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text
                x="400"
                y="346"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Both tests: 500 V DC, IET CoP Ch 15. Reading rises far above 1 MΩ on a healthy
                appliance.
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
            title="The IR test workflow"
            plainEnglish="Same procedure for every Class I and Class II appliance. Test voltage and acceptance shift with category; the steps do not."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Confirm earth continuity has passed first. IR is the second test in the sequence —
                if earth continuity has failed, do not run IR.
              </li>
              <li>
                Identify the construction class from the rating plate. Class I: routes to L+N → E
                pin. Class II: routes to L+N → probe on accessible metal.
              </li>
              <li>
                Confirm the appliance is switched on / in the correct operating state. For most
                appliances this means switched on at the appliance switch (so that all internal
                wiring is in the test path); for thermostatic kit, switched to the highest setting.
              </li>
              <li>
                Plug the appliance into the PAT tester&apos;s mains-out socket. The tester
                automatically links L and N internally for the IR test.
              </li>
              <li>
                Class I: no probe needed — the tester applies 500 V DC between the linked L+N and
                the earth pin and reads the resistance. Class II: connect the IR probe / foil to an
                accessible metal part of the body.
              </li>
              <li>
                Run the test. The tester ramps the voltage to 500 V DC, holds for the test duration
                (typically 1–5 seconds), reads the resistance, and shows pass/fail against the 1 MΩ
                (or 2 MΩ for medical IT) minimum.
              </li>
              <li>
                Record the numeric reading in MΩ. A pass with 14 MΩ is recorded as such; a pass at
                999 MΩ (saturation) is also valid. Fails go to investigation, not retest.
              </li>
            </ol>
          </ConceptBlock>

          <Scenario
            title="A Class I floor-standing photocopier"
            situation="The copier is Class I, 230 V, single-phase, with a switch-mode PSU and an EMC filter network at the mains input. Earth continuity passed at 0.16 Ω. You run the 500 V IR test and the meter reads 0.6 MΩ. Visual inspection is sound; the copier is in daily use."
            whatToDo={
              <>
                <span className="block">
                  0.6 MΩ is below the 1 MΩ IET CoP minimum and would conventionally be a fail.
                </span>
                <span className="block">
                  However, EMC filter networks in mains-input stages typically include Y-capacitors
                  between L/N and earth — these provide a deliberate AC path to earth for high-
                  frequency noise, but they also draw a small current at 500 V DC that reads as low
                  insulation.
                </span>
                <span className="block">
                  Per IET CoP Ch 15, switch to substitute leakage testing in lieu of IR. The
                  substitute test applies a low test voltage across L+N to E and measures the
                  leakage current at the operating-equivalent voltage. Acceptance is ≤ 0.5 mA for
                  Class I appliances.
                </span>
                <span className="block">
                  Document both: &ldquo;IR 0.6 MΩ at 500 V DC (capacitive coupling from EMC filter);
                  substitute leakage 0.18 mA → pass per IET CoP Ch 15&rdquo;. The substitute leakage
                  pass is a valid pass for the appliance.
                </span>
              </>
            }
            whyItMatters="A category of safe, working equipment fails the conventional IR test for legitimate engineering reasons. IET CoP recognises this and gives substitute leakage as the alternative. Without that route, every photocopier, modern PC, networking switch and EMC-filtered industrial controller would fail PAT — even though the equipment is electrically safe."
          />

          <CommonMistake
            title="Running the IR test before earth continuity has been confirmed"
            whatHappens="500 V DC is applied between L+N and earth. If the protective conductor inside the appliance is broken (a fault that earth continuity would have caught), the test voltage has nowhere to flow except through any insulation breakdown — and any internal capacitance can hold the chassis at a stored voltage. The operator can then receive a shock when handling the appliance after the test ends."
            doInstead="Always run earth continuity first. IET CoP sequences the tests deliberately. Most automatic PAT testers enforce the order — earth continuity → IR → polarity → leakage — and stop on the first fail. Use that. Do not override the sequence on the assumption it is faster."
          />

          <CommonMistake
            title="Testing a damp appliance and recording the failure as final"
            whatHappens="A vacuum cleaner that lived in a damp store room reads 0.4 MΩ. The fail is recorded and the appliance discarded. Two days later, the same appliance dried out in normal storage would have read 25 MΩ. Genuine moisture-related IR drops are recoverable; the fail decision was premature."
            doInstead="Where the IR reading is borderline or low and damp is a plausible cause (storage conditions, recent transit), allow the appliance to operate (warming dries internal insulation) or store in dry conditions for 24 hours, then re-test. If the reading recovers above 1 MΩ on the dry test, the appliance passes — record both readings with the explanation. If it remains low after drying, the failure is genuine and the appliance is removed from service."
          />

          <RegsCallout
            source="BS EN 61557-2:2007 — Electrical safety in low voltage distribution systems · Part 2: Insulation resistance"
            clause={
              <>
                The instrument shall be capable of measuring insulation resistance with a no-load
                test voltage of 500 V DC, and shall apply the test voltage with a measurement
                current capability of at least 1 mA. The instrument shall include automatic
                discharge of the equipment under test on completion of the measurement.
              </>
            }
            meaning="BS EN 61557-2 fixes the IR instrument category. The 1 mA measurement current is enough to overcome small leakage and produce a stable reading. The automatic discharge requirement matters: after a 500 V DC test, internal capacitance can hold a stored voltage; the instrument must short the test points safely before the operator handles the appliance."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The substitute-leakage alternative</ContentEyebrow>

          <ConceptBlock
            title="When the IR test cannot give a meaningful reading"
            plainEnglish="Some equipment is built in a way that legitimately fails the 500 V DC IR test even though the equipment is safe. The cause is internal Y-capacitors and EMC filtering: small capacitors deliberately fitted between L/N and earth to suppress high-frequency interference. These capacitors draw a small current at 500 V DC that the IR test reads as low insulation resistance. IET CoP Ch 15 allows substitute leakage testing as the alternative."
            onSite="Substitute leakage is fully covered in M4.4. In short: the test applies a low voltage (typically 30–40 V), measures the leakage current that flows under that voltage, and scales the result to the equivalent at operating voltage (230 V). Acceptance is ≤ 0.5 mA (Class I) / ≤ 0.25 mA (Class II) per IET CoP."
          >
            <p>
              The substitute test is electrically safer for the equipment than 500 V DC because it
              does not stress the insulation at high voltage. It is electrically safer for the
              operator because the test voltage is low. And it gives a meaningful result on
              equipment whose IR reading is misleading — the leakage current at operating voltage is
              what actually matters for user safety, not the resistance at an artificial 500 V DC.
            </p>
            <p>
              Substitute leakage is not a universal substitute for IR. For ordinary kettles, fan
              heaters, vacuum cleaners, hand tools and most non-electronic kit, the 500 V IR test is
              the right choice and gives a clear pass / fail. Substitute leakage is the fall-back
              where IR is misleading because of construction. The two tests are complementary, not
              competing.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice 5th Edition · Chapter 15 (substitute leakage option)"
            clause={
              <>
                Where the equipment under test contains components which would result in a
                misleading insulation resistance measurement (for example, switch-mode power
                supplies, EMC filter networks, surge protective devices), substitute leakage testing
                may be performed in lieu of insulation resistance testing. The acceptable substitute
                leakage current shall not exceed 0.5 mA for Class I equipment and 0.25 mA for Class
                II equipment.
              </>
            }
            meaning="Two acceptance levels: 0.5 mA Class I (relies on protective conductor; some leakage is normal), 0.25 mA Class II (no protective conductor; tighter leakage limit because there is no fault path). The substitute is recognised as a valid pass per IET CoP — not a workaround."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reading the result — interpretation</ContentEyebrow>

          <ConceptBlock
            title="What the IR number actually tells you"
            plainEnglish="A measured IR reading is one of four diagnostic categories, each with a different next step."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-emerald-300">Saturation (e.g. &gt; 999 MΩ).</strong>{' '}
                Healthy, dry, well-insulated appliance. Pass. Record the reading or &ldquo;&gt;999
                MΩ&rdquo; per the tester display.
              </li>
              <li>
                <strong className="text-emerald-300">Tens to hundreds of MΩ.</strong> Typical
                healthy reading. Comfortably above the 1 MΩ minimum. Pass. Record the numeric value.
              </li>
              <li>
                <strong className="text-amber-300">Low single-digit MΩ (1–5 MΩ).</strong> Pass but
                marginal. Possible causes: minor surface contamination at terminations, slight damp
                in the insulation, ageing of motor windings. Flag for closer inspection at the next
                test cycle. Re-test in dry conditions to confirm.
              </li>
              <li>
                <strong className="text-red-300">Below 1 MΩ.</strong> Fail. Investigate before
                recording. Possible causes: genuine insulation breakdown, damp/wet appliance, EMC
                capacitance (run substitute leakage instead), contamination across a terminal block,
                partial winding short. Diagnose, remediate where possible, re-test. If the cause is
                genuine insulation breakdown, fail and remove from service.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Recording the result</ContentEyebrow>

          <ConceptBlock
            title="What goes on the appliance record"
            plainEnglish="An IR pass record carries three pieces of data: the test voltage used, the numeric reading in MΩ, and the test type (IR or substitute leakage in lieu)."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Numeric result:</strong> e.g. &ldquo;42.6 MΩ at 500 V DC&rdquo;. Record the
                actual reading, not just &ldquo;Pass&rdquo;. Trend analysis over multiple cycles
                catches slow degradation.
              </li>
              <li>
                <strong>Test voltage:</strong> 250 V (SELV / 110 V), 500 V (general 230 V) or 1000 V
                (industrial &gt; 500 V AC). The voltage used is part of the result.
              </li>
              <li>
                <strong>Substitute leakage flag:</strong> where IR was bypassed in favour of
                substitute leakage (per IET CoP Ch 15), the appliance record shows the substitute
                reading and a note that IR was unsuitable because of internal capacitance / EMC
                filtering.
              </li>
              <li>
                <strong>Class marker:</strong> Class I and Class II are tested in different
                geometries. Recording the construction class makes the test method auditable.
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
              'IET CoP Ch 15 sets 500 V DC for general 230 V appliances; 250 V for SELV / 110 V; 1000 V for industrial > 500 V AC equipment.',
              'Minimum IR: 1 MΩ for general appliances (Class I and Class II); 2 MΩ for surgical / medical IT equipment. The minimum is a floor, not a target.',
              'Class I geometry: L+N (linked) → earth pin. Class II geometry: L+N (linked) → probe on accessible metal (or metal foil wrap on plastic enclosures).',
              'Switch-mode and EMC-filtered equipment can fail the 500 V IR test legitimately because of Y-capacitors. IET CoP allows substitute leakage testing in lieu — covered in M4.4.',
              'BS EN 61557-2 governs the IR instrument; BS EN 61557 series Part 1 sets general / safety requirements for the whole series.',
              'IR is the second test in the sequence — earth continuity must pass first. The order is procedural safety, not preference.',
              'A high reading (tens of MΩ +) is healthy. A low reading (≈ 1 MΩ) is marginal. Below 1 MΩ is a fail and triggers investigation.',
              'Damp appliances can recover. Wet IR fail → dry → re-test. Genuine breakdown does not recover; the fail is final.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Why is IR done at DC, not AC?',
                answer:
                  'DC isolates the resistive component of insulation. AC at the same voltage would also drive capacitive currents (every cable has capacitance between conductors), which would mask the resistive insulation reading. The IR test is specifically interested in the resistance, so DC is the right tool. Capacitive effects appear in IR tests on switch-mode equipment despite using DC, because of internal Y-capacitors that are part of the equipment design — that is the case where substitute leakage replaces IR.',
              },
              {
                question:
                  'My PAT tester shows ">999 MΩ" on a healthy appliance — should I record that or the actual number?',
                answer:
                  'Record what the tester shows. ">999 MΩ" is a saturation indication: the resistance is above the instrument\'s measurement range. It is a perfectly valid pass and stating it as ">999 MΩ" or "OL" (overload, in some testers) on the record is correct. Trend analysis works the same way — a unit that consistently shows >999 MΩ and then drops to 14 MΩ is degrading even though both are passes.',
              },
              {
                question:
                  'Does IET CoP allow IR testing at 250 V DC instead of 500 V if the appliance might be damaged?',
                answer:
                  'For 230 V mains equipment, no — 500 V DC is the specified test voltage. 250 V is reserved for SELV (≤ 50 V AC / 120 V DC) and 110 V site equipment. If a 230 V appliance is at risk of damage from 500 V DC, the IET CoP route is to use substitute leakage testing in lieu of IR, not to drop the IR voltage. The substitute test applies a low voltage and measures leakage at operating voltage equivalent — that is the safe alternative for sensitive equipment.',
              },
              {
                question: 'What does Class III equipment require on PAT?',
                answer:
                  "Class III equipment is supplied at SELV (typically ≤ 50 V AC). The IR test, where required, is performed at 250 V DC against the 1 MΩ minimum. In practice, low-voltage SELV appliances are often outside the routine PAT scope (they pose a much lower shock risk by design) and the duty-holder's risk assessment per HSG107 will determine whether they are tested at all and at what frequency. Where they are tested, 250 V DC IR is the route.",
              },
              {
                question: 'How does temperature affect IR readings? Should I correct for it?',
                answer:
                  'Insulation resistance falls with rising temperature — roughly halving for every 10 °C rise on most insulation materials. IET CoP does not require formal temperature correction for in-service PAT testing, but the implication is that an appliance tested cold will give a higher reading than the same appliance tested hot. For trend analysis, log the test conditions; for borderline readings, consider whether the appliance was tested immediately after operation (warm) or cold. The 1 MΩ minimum applies as-measured; you do not de-rate the reading for ambient conditions in routine testing.',
              },
              {
                question: 'Some testers offer "Rinsulation" and "Riso" — same test?',
                answer:
                  'Yes. "Riso", "R.iso", "RISO" and "Rinsulation" all refer to the insulation resistance test. The naming follows the IEC convention. The test method, voltage and acceptance are identical regardless of the label. Some testers also display "MΩ" directly without a test-name label.',
              },
              {
                question: 'A surgical IT appliance reads 1.6 MΩ. Is that a pass or fail?',
                answer:
                  "Fail. The IET CoP minimum for surgical / medical IT is 2 MΩ, not 1 MΩ. A reading of 1.6 MΩ would pass on a general appliance but fails the medical category. Investigate (damp, contamination, EMC capacitance from medical-grade isolation transformers) and either remediate, switch to substitute leakage testing, or remove from service per the duty-holder's procedure for medical equipment.",
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Insulation resistance testing — PAT M4.2" questions={quizQuestions} />

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
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-4-section-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.3 Polarity testing of cords and leads
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

export default PATTestingModule4Section2;
