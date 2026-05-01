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
    id: 'patm4-s4-substitute',
    question:
      'A switch-mode laptop PSU fails the 500 V IR test (0.4 MΩ) because of internal Y-capacitors in the EMC filter. What is the IET CoP-recognised next step?',
    options: [
      'Discard the unit',
      'Substitute leakage testing in lieu of IR. Apply a low test voltage (typically 30–40 V) across L+N to E, measure the leakage current that flows, and scale to the operating-equivalent voltage. Acceptance per IET CoP Ch 15: ≤ 0.5 mA Class I / ≤ 0.25 mA Class II',
      'Re-test at 250 V',
      'Functional test only',
    ],
    correctIndex: 1,
    explanation:
      'IET CoP Ch 15 explicitly permits substitute leakage as the alternative to IR for switch-mode and EMC-filtered equipment. The substitute test is electrically safer for the equipment (low test voltage), gives a meaningful operating-voltage equivalent leakage current, and judges against the 0.5 mA / 0.25 mA acceptance for Class I and Class II respectively.',
  },
  {
    id: 'patm4-s4-differential',
    question:
      'You are leakage-testing a Class I PC at 230 V mains. Differential leakage measures L−N current at operating voltage. The reading is 1.2 mA. Pass or fail per IET CoP?',
    options: [
      'Pass — under 3 mA is fine',
      'Fail. The IET CoP Class I acceptance for leakage current is ≤ 0.75 mA (per the touch-current / earth-leakage limits applicable at operating voltage for general Class I appliances; some categories like IT equipment may have a higher specific limit per the IEC product standard, but 0.75 mA is the general Class I value). Investigate before re-testing',
      'Pass with comment',
      'Re-test',
    ],
    correctIndex: 1,
    explanation:
      'IET CoP Ch 15 sets earth-leakage / touch-current acceptance values that depend on appliance class and equipment-specific product standards. For general Class I appliances the limit is 0.75 mA. IT equipment under BS EN 62368-1 / BS EN 60950-1 may permit up to 3.5 mA for specific equipment categories. Always check the specific product-standard limit for the equipment under test.',
  },
  {
    id: 'patm4-s4-when',
    question:
      'When is leakage testing the BETTER test choice than insulation resistance per IET CoP?',
    options: [
      'Always — leakage is more accurate',
      'When the equipment contains components (switch-mode PSUs, EMC filter networks, surge arresters) that produce a misleading IR reading because of internal Y-capacitors. Leakage testing measures real operating-voltage current and judges against safety-relevant limits',
      'For Class II only',
      'Only on appliances over 1 kW',
    ],
    correctIndex: 1,
    explanation:
      'Leakage testing is the IET CoP-recognised alternative to IR for equipment whose construction makes IR misleading. The 500 V DC IR test cannot distinguish between deliberate Y-capacitor leakage and genuine insulation breakdown; the leakage test at operating voltage measures the actual current flow that matters for user safety.',
  },
  {
    id: 'patm4-s4-touch',
    question:
      'What is "touch current" and how does it differ from "earth leakage current" in PAT testing?',
    options: [
      'They are the same thing',
      'Touch current is measured between accessible parts of the appliance and earth (the current that would flow through a person touching the appliance) — relevant primarily for Class II equipment with no protective conductor. Earth-leakage current is measured between the earth pin and ground (the current already flowing through the protective conductor under normal operation) — relevant for Class I equipment',
      'Touch current is for AC, leakage is for DC',
      'Touch current includes the protective conductor, leakage does not',
    ],
    correctIndex: 1,
    explanation:
      'IET CoP and BS EN 62353 distinguish the two. Touch current is what a user would experience: current flowing between the appliance accessible part and earth via a notional human body. Earth-leakage current is the protective-conductor current under normal operating conditions. Both are leakage measurements but they target different safety failure modes.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'IET CoP Ch 15 acceptance for substitute leakage current on a Class I appliance is what?',
    options: ['≤ 0.25 mA', '≤ 0.5 mA', '≤ 0.75 mA', '≤ 3.5 mA'],
    correctAnswer: 1,
    explanation:
      'IET CoP Chapter 15 sets the substitute leakage limit at ≤ 0.5 mA for Class I appliances and ≤ 0.25 mA for Class II appliances. The Class II limit is tighter because there is no protective conductor — any leakage current can only flow via accessible parts to ground.',
  },
  {
    id: 2,
    question:
      'The substitute leakage test applies what voltage to the appliance, and how does it derive the "operating-voltage equivalent" leakage current?',
    options: [
      '500 V DC, with no scaling',
      'A low test voltage (typically 30–40 V AC) is applied between L+N and the protective conductor / accessible metal. The measured leakage current at that voltage is then scaled by the ratio of nominal supply voltage to test voltage (e.g. ≈ 230/40 = 5.75×) to give the equivalent leakage at 230 V AC operating voltage. This avoids stressing the equipment with full mains while still producing a safety-relevant result',
      '1000 V at line frequency',
      '230 V DC for 30 seconds',
    ],
    correctAnswer: 1,
    explanation:
      'The substitute test uses a low voltage (the exact value varies by tester, typically 30–40 V) and scales mathematically. This is electrically safer for sensitive equipment than the full-voltage differential leakage test, but produces a result directly comparable to the safety-relevant operating-voltage leakage.',
  },
  {
    id: 3,
    question: 'Differential leakage testing differs from substitute leakage how?',
    options: [
      'It uses DC',
      'Differential leakage is performed at full operating voltage (230 V mains). The tester measures the difference in current between L and N conductors at the supply side — any L−N difference must be flowing to earth, which is the leakage current. The result is the actual leakage at operating voltage, not a scaled value. It is electrically more demanding for the equipment than substitute testing',
      'It only works on Class II',
      'It tests insulation directly',
    ],
    correctAnswer: 1,
    explanation:
      'Differential leakage applies real mains and measures the L−N current imbalance — by Kirchhoff, any imbalance equals current flowing somewhere outside the supply pair (i.e. to earth via the protective conductor or via leakage). It is more accurate than substitute leakage for the actual operating condition but exposes the appliance to full mains during the test.',
  },
  {
    id: 4,
    question:
      'A Class I IT appliance under BS EN 62368-1 / BS EN 60950-1 has a higher leakage allowance than a general Class I appliance. What is the typical permitted limit for equipment in this category, and why?',
    options: [
      '0.5 mA — same as everything else',
      'Up to 3.5 mA — IT equipment with EMC filter networks and switch-mode supplies legitimately leaks more current to earth as a function of construction. The product standard recognises this and permits a higher limit, on the explicit condition that the protective conductor is intact and the leakage flows safely to earth via that path. PAT testing must verify the higher product-standard limit, not the general 0.75 mA value',
      '10 mA',
      '0.25 mA',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 62368-1 (the modern audio/video and IT equipment safety standard, which replaces the older BS EN 60950-1) permits earth-leakage of up to 3.5 mA for certain Class I IT equipment categories, on the basis that the protective conductor handles the leakage safely. The EMC filter Y-capacitor rule explicitly: acceptable leakage is not a fault on intact-protective-conductor Class I IT.',
  },
  {
    id: 5,
    question: 'IET CoP Class II leakage acceptance is ≤ 0.25 mA — tighter than Class I. Why?',
    options: [
      'Smaller appliances have less leakage',
      'Class II appliances have no protective conductor, so any leakage must flow via accessible parts directly to a person or to ground. There is no "safe path" for leakage current — the only path is through the user. The tighter limit reflects that any leakage on Class II is a potential touch current',
      'Class II is older equipment',
      'Class II uses lower test voltage',
    ],
    correctAnswer: 1,
    explanation:
      'Class I has a protective conductor that takes leakage current safely to earth without exposing the user. Class II has no such path; any leakage that does flow must flow via accessible conductive parts. The tighter 0.25 mA limit recognises this: leakage on Class II becomes touch current directly.',
  },
  {
    id: 6,
    question:
      'You substitute leakage-test a Class I switch-mode photocopier and read 0.32 mA. The general Class I substitute leakage limit per IET CoP is 0.5 mA. Pass or fail?',
    options: [
      'Fail — too high',
      'Pass — within the IET CoP acceptance for general Class I substitute leakage. Record the reading, note that the test was substituted for IR per IET CoP Ch 15 because of EMC capacitance, and proceed in the test sequence',
      'Re-test',
      'Pass only if the 500 V IR also passes',
    ],
    correctAnswer: 1,
    explanation:
      'A Class I substitute leakage of 0.32 mA is comfortably within the 0.5 mA limit. The pass is valid even though the conventional 500 V IR test would have failed because of the Y-capacitor effect. Record the substitute test result and the reason for substitution.',
  },
  {
    id: 7,
    question: 'BS EN 62353 governs which type of testing?',
    options: [
      'PAT testing of general office appliances',
      'Recurrent test and test after repair of medical electrical equipment — the medical-electrical-specific equivalent of the PAT regime, with leakage tests including patient leakage current, earth leakage and touch current, all with stricter limits than general PAT',
      'Earth-loop impedance only',
      'Insulation resistance for fixed installations',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 62353 sits alongside IEC 60601-1 to govern testing of medical electrical equipment in the field. It is more stringent than IET CoP for PAT and includes patient-applied-part leakage measurements not relevant to general PAT. Where you encounter medical equipment in the wild (community care, dental, veterinary), BS EN 62353 typically applies in addition to or in place of IET CoP.',
  },
  {
    id: 8,
    question:
      'Leakage testing requires the appliance to be energised at full mains voltage (differential method). What safety equipment requirement applies to the operator and the test environment?',
    options: [
      'None — the tester is enclosed',
      'GS38-compliant test leads if any external probing is performed; an RCD-protected supply at the PAT bench (typically built into the PAT tester); awareness of the appliance under test as a live device — including isolation procedures if the appliance has to be interrupted during the test; appropriate PPE per the duty-holder assessment',
      'Insulating gloves only',
      'No specific requirements',
    ],
    correctAnswer: 1,
    explanation:
      'Differential leakage testing energises the appliance at full mains voltage. GS38 governs any test leads used externally; RCD protection on the supply protects the operator from a fault inside the appliance under test; PPE and isolation procedures follow the duty-holder risk assessment under EAW Reg 4 / 14. The tester itself is BS EN 61010 compliant, but the operator and environment need the matching controls.',
  },
  {
    id: 9,
    question:
      'A Class I appliance reads 0.45 mA on substitute leakage and 1.1 mA on differential leakage at full mains. Which result is the safety-relevant one for accepting / rejecting the appliance?',
    options: [
      'Substitute — it is more accurate',
      'Differential, applied at operating voltage — that is the actual leakage the user will be exposed to in service. Substitute leakage is a derived equivalent and is electrically safer to perform but the differential reading is closer to the real-world condition. If the differential exceeds the IET CoP / product-standard limit, the appliance fails regardless of the substitute reading',
      'Whichever is lower',
      'Average',
    ],
    correctAnswer: 1,
    explanation:
      'The differential leakage at operating voltage is the most direct measurement of the actual current flow under real conditions. Substitute leakage is a useful tool when full-voltage testing would damage sensitive equipment; where both can be performed, the differential value is the more conservative safety basis.',
  },
  {
    id: 10,
    question:
      'Why does IET CoP allow substitute leakage to REPLACE the IR test on certain equipment, rather than running both?',
    options: [
      'To save time',
      'Because the IR test cannot give a meaningful reading on equipment with Y-capacitors and EMC filter networks. The 500 V DC test reads the capacitor leakage as if it were insulation breakdown, and there is no way to separate the two with an ohmmeter alone. Substitute leakage at operating voltage tests what actually matters (current flow under operation) and is the engineering-correct alternative',
      'To save instrument battery',
      'Because IR is not required for IT equipment',
    ],
    correctAnswer: 1,
    explanation:
      'IR is replaced rather than supplemented because the IR reading on EMC-capacitive equipment is fundamentally not interpretable as insulation resistance. Substitute leakage produces a meaningful number for the same safety question (is current flow to earth within limits?). Running both adds no information beyond the substitute leakage reading.',
  },
];

const PATTestingModule4Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Touch current and leakage testing | PAT M4.4 | Elec-Mate',
    description:
      'IET Code of Practice 5th Ed Ch 15: substitute leakage (low-voltage method) vs differential leakage (full-mains method), the ≤ 0.5 mA Class I / ≤ 0.25 mA Class II acceptance, and the BS EN 62368-1 IT-equipment exception that permits up to 3.5 mA for EMC-filtered Class I.',
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
            eyebrow="Module 4 · Section 4"
            title="Touch current and leakage testing"
            description="Two methods, one safety question. Substitute leakage when IR cannot give a useful reading; differential leakage at operating voltage when the equipment can take it. The 0.5 / 0.25 mA acceptance, plus the BS EN 62368-1 IT-equipment exception."
            tone="yellow"
          />

          <TLDR
            points={[
              'Leakage testing measures the current flowing to earth (or to accessible metal) under operating-voltage conditions. Two methods: substitute leakage (low test voltage, scaled) and differential leakage (full mains, direct measurement).',
              'IET CoP Ch 15 substitute leakage acceptance: ≤ 0.5 mA for Class I appliances, ≤ 0.25 mA for Class II. Class II is tighter because there is no protective conductor — leakage flows through accessible parts directly.',
              'BS EN 62368-1 / BS EN 60950-1 (IT equipment) permits up to 3.5 mA for certain Class I categories with EMC filter networks. The protective conductor handles the leakage safely. PAT must apply the product-standard limit, not the general Class I 0.75 mA earth-leakage value.',
              'Substitute leakage replaces the 500 V DC IR test on switch-mode and EMC-filtered equipment. Y-capacitors in the EMC filter make the IR reading misleading; the leakage test at operating voltage gives the real safety-relevant answer.',
              '"Touch current" (between accessible parts and earth — Class II focus) and "earth leakage current" (in the protective conductor under operation — Class I focus) are distinct measurements per BS EN 62353. They target different failure modes; the IET CoP test workflow combines both as appropriate to the appliance class.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish substitute leakage from differential leakage and choose the appropriate test for each appliance type',
              'State the IET CoP acceptance values: ≤ 0.5 mA Class I substitute, ≤ 0.25 mA Class II substitute, with the BS EN 62368-1 IT-equipment exception of up to 3.5 mA',
              'Identify equipment where IR cannot give a reliable reading (switch-mode PSUs, EMC filters, surge arresters) and apply substitute leakage in lieu',
              'Recognise the safety implications of touch current vs earth leakage current on Class II vs Class I appliances',
              'Reference BS EN 62353 as the standard for medical electrical equipment leakage testing and recognise where it overrides general PAT',
              'Record leakage results correctly with the test method, voltage and applicable acceptance limit',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Why leakage testing exists</ContentEyebrow>

          <ConceptBlock
            title="The IR test cannot answer every safety question"
            plainEnglish="The 500 V DC IR test (M4.2) is a stress test of the insulation barrier. It works well on traditional resistive-insulation equipment — a kettle, a fan heater, a hand power tool. It does not work well on equipment with internal capacitors deliberately fitted between live and earth, because those capacitors look like a low resistance to a DC test. Modern IT, audio, lab and process-control equipment is full of such capacitors as part of EMC compliance."
            onSite="Leakage testing answers the question the IR test was originally trying to answer: at operating voltage, how much current actually flows from live parts to earth or to accessible metal? That number is what determines user safety, and it can be measured directly without the IR test resistive bias."
          >
            <p>
              IET Code of Practice 5th Edition (2020) Chapter 15 names two leakage methods:
              substitute leakage (a low-voltage test scaled to operating voltage equivalent) and
              differential leakage (a full-mains-voltage test that measures L−N current imbalance
              directly). Both produce a single number — the leakage current in mA — that is judged
              against the IET CoP acceptance limits for the appliance class.
            </p>
            <p>
              The leakage test is also a complementary measurement to IR even on traditional
              equipment. Where IR catches resistive insulation faults, leakage catches the
              real-world current flow under operation. On a healthy non-EMC-filtered appliance the
              two tests give congruent results: high IR, low leakage, both pass. On EMC-filtered
              equipment the two diverge: IR may fail (capacitive coupling), leakage passes (current
              within limits) — the appliance is electrically safe and IET CoP allows the substitute
              leakage to be the deciding test.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020) — Chapter 15"
            clause={
              <>
                Substitute leakage current testing may be performed in lieu of insulation resistance
                testing where the equipment under test contains components such that the insulation
                resistance test would not give a meaningful result. The test shall apply a low test
                voltage between the line and neutral conductors connected together and the earth pin
                or accessible conductive part. The leakage current shall be calculated at the
                equivalent of nominal supply voltage. The substitute leakage current shall not
                exceed 0.5 mA for Class I equipment or 0.25 mA for Class II equipment.
              </>
            }
            meaning="Three acceptance points in one clause: substitution-in-lieu (where IR is not meaningful), method (low voltage scaled), and limits (0.5 / 0.25 mA). The lower Class II value reflects that any leakage on a Class II appliance is a potential touch current — there is no protective conductor to take it safely to earth."
          />

          <ConceptBlock
            title="Substitute leakage vs differential leakage — when each applies"
            plainEnglish="Substitute leakage uses a low test voltage (typically 30–40 V AC) and scales the result mathematically to the equivalent at 230 V. Differential leakage uses the full mains voltage and measures the L−N current difference directly. Substitute is electrically gentler on the equipment; differential is the more accurate operating-condition measurement."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Aspect</th>
                    <th className="text-center text-white/80 py-2">Substitute leakage</th>
                    <th className="text-center text-elec-yellow py-2">Differential leakage</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Applied voltage</td>
                    <td className="text-center">30–40 V AC (low-voltage test)</td>
                    <td className="text-center text-elec-yellow">230 V (full mains)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Result scaling</td>
                    <td className="text-center">Scaled mathematically (× ratio)</td>
                    <td className="text-center text-elec-yellow">Direct measurement</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Equipment stress</td>
                    <td className="text-center">Low — gentler on sensitive kit</td>
                    <td className="text-center text-elec-yellow">Real operating stress</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Operator risk</td>
                    <td className="text-center">Low (no full mains exposure)</td>
                    <td className="text-center text-elec-yellow">Higher (mains energised)</td>
                  </tr>
                  <tr>
                    <td className="py-2">Typical use case</td>
                    <td className="text-center">In lieu of IR on EMC-filtered kit</td>
                    <td className="text-center text-elec-yellow">
                      High-confidence verification on robust kit
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Most automatic PAT testers offer both methods. Substitute leakage is the default for
              the &ldquo;in lieu of IR&rdquo; use case and is fast and safe. Differential leakage is
              available where the operator wants the more demanding real-conditions measurement, or
              where the equipment under test has unusual characteristics that make the
              substitute-method scaling inappropriate (e.g. equipment with strongly non-linear
              leakage characteristics).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Touch current vs earth leakage — what each measures</ContentEyebrow>

          <ConceptBlock
            title="Two leakage paths, two measurements"
            plainEnglish="Touch current is measured between an accessible (touchable) part of the appliance and earth. It approximates the current that would flow through a person touching the appliance — directly relevant to Class II equipment where there is no protective conductor. Earth-leakage current is measured in the protective conductor itself under normal operating conditions — directly relevant to Class I equipment where the protective conductor takes the leakage safely to earth."
          >
            <p>
              On a Class I appliance the leakage flows: live parts → insulation barrier (with
              imperfect resistance and / or deliberate Y-capacitor coupling) → accessible metalwork
              bonded to the protective conductor → out through the green/yellow → into the earth pin
              → into the protective conductor of the fixed installation → to MET. The user is not in
              the path because the protective conductor is the path of least resistance. The PAT
              test measures the current in the protective conductor: that is earth-leakage current.
            </p>
            <p>
              On a Class II appliance there is no protective conductor. Any leakage from live parts
              has to find its way out via accessible metal (a metal grille, a metal grip) — and from
              there to earth via a person, the working surface, or another bonded item. The PAT test
              for Class II measures touch current: the current that would flow through a notional
              person touching the accessible metal. The 0.25 mA Class II limit is much tighter than
              the 0.5 mA Class I limit because every milliamp of touch current is, by definition,
              exposing the user.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 62353 — Medical electrical equipment · Recurrent test and test after repair of medical electrical equipment"
            clause={
              <>
                The earth leakage current and the touch current shall be measured at the equipment
                under test. The earth leakage current is the current flowing through the protective
                earth conductor under normal operating conditions; the touch current is the current
                flowing from accessible parts to earth via a measurement device representing the
                impedance of a human body. Limits shall conform to the relevant equipment safety
                standard (typically IEC 60601-1 for medical electrical equipment).
              </>
            }
            meaning="BS EN 62353 names both currents explicitly and requires both to be measured for medical electrical equipment. For general PAT under IET CoP, the relevant current depends on construction class: earth-leakage for Class I, touch-current for Class II. BS EN 62353 governs medical kit specifically; IET CoP governs general equipment and adopts the same conceptual distinction."
          />

          <ConceptBlock
            title="The BS EN 62368-1 IT-equipment exception"
            plainEnglish="IT equipment, audio/video equipment, networking gear and similar Class I products under BS EN 62368-1 (replacing the older BS EN 60950-1) routinely include EMC filter networks with Y-capacitors that produce 1–3.5 mA of legitimate earth-leakage current. The product standard explicitly permits this because the protective conductor handles it safely. IET CoP and PAT testing must apply the product-standard limit (up to 3.5 mA for certain categories), not the general 0.75 mA earth-leakage value."
          >
            <p>
              This is the source of one of the most common PAT confusions. A Class I PC, a network
              switch, an audio amplifier or a modem may legitimately measure 1–2 mA of earth leakage
              at operating voltage. A general-Class-I-only-aware tester would fail it; the correct
              interpretation is to apply the BS EN 62368-1 limit — up to 3.5 mA for equipment
              covered by the standard.
            </p>
            <p>
              Two conditions for the higher limit to apply: the equipment must fall within the scope
              of a product standard that permits it (BS EN 62368-1, BS EN 60950-1, BS EN 60601-1 for
              medical, etc.), AND the protective conductor must be intact (which the M4.1 earth
              continuity test has already verified). With both conditions met, a leakage of 2.8 mA
              on a Class I IT appliance is a normal, compliant reading. Without the protective
              conductor, that 2.8 mA would be touch current — a categorical fail.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Why scaling works for substitute leakage"
            plainEnglish="The scaling assumes the leakage current is approximately linear with applied voltage — true for resistive insulation paths and for most capacitive paths at line frequency. Where the appliance has strongly non-linear behaviour (semiconductor leakage paths, MOV-protected supplies near their clamping voltage), the linear scaling overstates or understates the operating-voltage leakage."
          >
            <p>
              For ordinary RC-network EMC filters and ordinary insulation, the scaling is accurate
              to within a few percent — the substitute reading scaled by the voltage ratio matches
              the differential leakage reading at full mains very closely. For appliances with
              metal-oxide varistors (MOVs) at the input, the scaling can break down because the MOV
              is a non-linear device that conducts heavily near its clamping voltage and not at all
              below it. A 30 V test misses the MOV entirely and reads only the resistive /
              capacitive paths; the differential test at 230 V picks up any near-end-of-life MOV
              that has shifted its clamping voltage.
            </p>
            <p>
              In practice this is rarely a problem for PAT because MOVs typically clamp at 250 V or
              above and a healthy MOV does not conduct at any normal operating voltage. A failed MOV
              (clamping below 230 V) is a separate fault that leakage testing will catch via tripped
              RCDs or excessive differential leakage; the substitute test alone may miss it. Where
              you suspect MOV-related faults (surge-strip mains conditioners, line filters after a
              known surge event), perform differential leakage as confirmation rather than relying
              on substitute alone.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Medical electrical equipment — BS EN 62353 in summary"
            plainEnglish="Medical electrical equipment carries higher consequence on insulation failure (patient connection, low body resistance via wet skin or invasive electrodes). BS EN 62353 sets a stricter PAT regime than IET CoP, with three leakage measurements: equipment leakage, applied-part leakage and direct patient leakage."
          >
            <p>
              BS EN 62353 (recurrent test of medical electrical equipment) is the in-service test
              regime that sits alongside the design standard IEC 60601-1. In PAT terms, it does
              three things differently from IET CoP for general equipment: (1) it measures
              additional leakage paths that do not exist on general appliances (patient-connected
              electrodes); (2) it sets stricter limits than IET CoP — typical patient-applied-part
              leakage limits are in the µA range, not the mA range of general PAT; (3) it requires
              calibrated medical-grade test equipment that meets BS EN 62353 specifically.
            </p>
            <p>
              For most general electricians performing PAT in offices, schools, retail and
              industrial settings, BS EN 62353 is not the relevant standard. Where you encounter
              medical electrical equipment in the wild — community physiotherapy, dental practice,
              veterinary, occupational health rooms, first-aid AEDs — the duty-holder should have
              identified that the equipment is medical and arranged BS EN 62353 testing rather than
              general PAT. If asked to PAT-test an item that the rating plate identifies as medical
              electrical, query the duty-holder before proceeding; the IET CoP general regime may
              not satisfy the legal duty for that equipment.
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

          <ContentEyebrow>Procedure on the bench — substitute leakage</ContentEyebrow>

          <ConceptBlock
            title="The substitute leakage workflow"
            plainEnglish="Used in lieu of IR for switch-mode and EMC-filtered equipment, or as an additional verification on equipment where the operator wants the operating-voltage-equivalent leakage number."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Confirm earth continuity (M4.1) has passed first. The substitute leakage test
                applies a small voltage between L+N and the protective conductor — if the protective
                conductor is broken, the test is meaningless and the appliance is unsafe.
              </li>
              <li>
                Plug the appliance into the PAT tester. Switch the appliance ON at the appliance
                switch (so internal wiring is in the test path).
              </li>
              <li>
                Select substitute leakage on the tester. The instrument applies the low test voltage
                (typically 30–40 V AC) between the linked L+N and the earth pin (Class I) or to a
                probe on accessible metal (Class II).
              </li>
              <li>
                The tester measures the leakage current at the test voltage and scales it to the
                operating-voltage equivalent. The display shows the scaled current in mA at the
                operating voltage equivalent.
              </li>
              <li>
                Compare against the appropriate limit: 0.5 mA Class I (general), 0.25 mA Class II,
                or the relevant product-standard limit (e.g. up to 3.5 mA for BS EN 62368-1 IT
                equipment with intact protective conductor).
              </li>
              <li>
                Record the result in mA, the test method (substitute leakage), and the limit
                applied. Note &ldquo;in lieu of IR per IET CoP Ch 15&rdquo; if substitution applied.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Differential leakage — when full-mains testing is appropriate"
            plainEnglish="The differential leakage test applies full mains to the appliance and measures the difference in current between L and N at the supply side. Any difference equals current flowing somewhere outside the L–N pair, which is the leakage current. Real operating conditions, real leakage."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Confirm earth continuity has passed. Confirm IR has passed (or has been
                substituted-out per IET CoP). Confirm polarity has passed. Differential leakage is
                the fourth test in the sequence.
              </li>
              <li>
                Confirm the test bench has RCD protection (most PAT testers have this built in).
                Differential leakage applies full mains to the appliance under test; if the
                appliance has a hidden insulation defect, the RCD protects the operator.
              </li>
              <li>Plug the appliance into the PAT tester. Switch the appliance ON.</li>
              <li>
                Initiate the differential leakage test. The tester energises the appliance at full
                mains for a short measurement period (typically a few seconds), measures the L−N
                current difference using a current transformer, and displays the leakage in mA.
              </li>
              <li>
                Compare against the same limits as substitute leakage (0.5 mA Class I, 0.25 mA Class
                II, plus the product-standard exceptions). The differential reading is the more
                conservative number.
              </li>
              <li>
                Record. On equipment where both substitute and differential have been performed,
                record both values and which one was used as the acceptance basis.
              </li>
            </ol>
          </ConceptBlock>

          <Scenario
            title="A networking switch — Class I, BS EN 62368-1 IT equipment"
            situation="A 24-port managed switch in a server room. Class I, three-pin BS 1363 plug, switch-mode PSU with EMC filter. Earth continuity passes at 0.12 Ω. 500 V IR test reads 0.42 MΩ — fail against the 1 MΩ general acceptance. You switch to substitute leakage."
            whatToDo={
              <>
                <span className="block">
                  Substitute leakage at operating-voltage equivalent reads 1.8 mA.
                </span>
                <span className="block">General Class I limit (0.5 mA) would fail this.</span>
                <span className="block">
                  However: the equipment is BS EN 62368-1 IT equipment with an intact protective
                  conductor (verified at earth continuity). The product-standard limit applies, not
                  the general value. BS EN 62368-1 permits up to 3.5 mA for Class I IT equipment
                  with a permanently-connected protective conductor.
                </span>
                <span className="block">1.8 mA is comfortably within 3.5 mA. Pass.</span>
                <span className="block">
                  Record: &ldquo;Substitute leakage 1.8 mA at 230 V equiv (in lieu of IR per IET CoP
                  Ch 15; BS EN 62368-1 limit 3.5 mA applies). Pass.&rdquo; The audit trail is
                  explicit about why the higher limit was used.
                </span>
              </>
            }
            whyItMatters="Without the product-standard exception every networking switch, server PSU, managed UPS and EMC-filtered industrial controller would fail PAT — even though they are designed and certified to be safe. The exception is an engineering recognition of how EMC filters work; using it correctly requires recording both the reading and the standard the limit comes from."
          />

          <CommonMistake
            title="Applying the general Class I 0.5 mA limit to BS EN 62368-1 IT equipment"
            whatHappens="A perfectly compliant networking switch with 1.8 mA leakage is failed against the 0.5 mA limit. The site loses use of the equipment, the IT department blames the PAT operator, and the same equipment passes the next day when a more experienced tester applies the BS EN 62368-1 limit. The original fail was wrong by virtue of using the wrong acceptance value."
            doInstead="When testing IT, audio, networking, server or similar Class I equipment, identify the applicable product standard (BS EN 62368-1 / BS EN 60950-1 for IT, BS EN 62368-1 for AV, BS EN 60601-1 for medical) and apply that standard leakage limit. The general 0.5 mA value applies only where no equipment-specific product standard applies. The PAT record must show both the reading and the limit applied."
          />

          <CommonMistake
            title="Skipping leakage testing because IR passed"
            whatHappens="An older switch-mode PSU with degraded Y-capacitors gives a marginal IR reading of 1.4 MΩ — passes the IR test by a small margin. Differential leakage at full mains would have shown 4.8 mA — well above any allowable limit, indicating that one of the Y-capacitors has partially short-circuited and is now drawing fault-level current to earth. Without the leakage test, the appliance returns to service in a partially-failed state, slowly degrading until a full Y-cap failure trips the RCD or starts a fire."
            doInstead="Where the IR reading is borderline (1–5 MΩ) on equipment with EMC filter networks, perform substitute or differential leakage as a confirming test. A passing IR with a high leakage reading is a degrading-component flag that an IR-only test misses. The two tests together give a much higher diagnostic confidence than either alone."
          />

          <RegsCallout
            source="IET Code of Practice 5th Edition · Chapter 15 (acceptance values)"
            clause={
              <>
                The acceptable leakage current shall not exceed 0.5 mA for Class I equipment, or
                0.25 mA for Class II equipment. Where the equipment under test is covered by a
                relevant product safety standard which permits a higher leakage current (for
                example, BS EN 62368-1 for information technology equipment permits up to 3.5 mA for
                certain Class I categories), the higher product-standard limit shall apply.
              </>
            }
            meaning="Two limits with one exception. The general values are 0.5 / 0.25 mA. The product-standard override applies where the equipment under test is in scope of a standard that permits more — and the override is conditional on the protective conductor being intact (verified at earth continuity)."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reading the result — interpretation</ContentEyebrow>

          <ConceptBlock
            title="What the leakage number actually tells you"
            plainEnglish="A leakage reading is one of four diagnostic categories. The category drives the next action."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-emerald-300">
                  Well below the limit (e.g. &lt; 0.1 mA on a Class I appliance).
                </strong>{' '}
                Healthy. The insulation is sound and the EMC components (if any) are intact. Pass.
                Record the value.
              </li>
              <li>
                <strong className="text-emerald-300">
                  Within the limit but non-zero (typically 0.1– limit value).
                </strong>{' '}
                Normal for EMC-filtered equipment, expected on Class I IT. Pass against the
                appropriate limit. Record explicitly which limit applied.
              </li>
              <li>
                <strong className="text-amber-300">Marginal — close to the limit.</strong>{' '}
                Investigate trend. If previous test cycles show a rising leakage, the EMC components
                are degrading and the appliance is approaching end-of-life on insulation. Pass for
                now, flag for closer inspection at the next cycle.
              </li>
              <li>
                <strong className="text-red-300">Above the limit.</strong> Fail. Causes: insulation
                breakdown (unlikely if IR has been performed), Y-capacitor short, contamination
                across a terminal, water ingress to a connector, internal damage. Investigate and
                remediate, or fail the appliance. Do not retest until the cause is identified.
              </li>
            </ol>
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
            title="What goes on the appliance record"
            plainEnglish="A leakage record carries four pieces of data: the test method (substitute or differential), the numeric reading in mA, the construction class, and the acceptance limit applied (with the product standard if non-default)."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Test method:</strong> &ldquo;Substitute leakage&rdquo; or
                &ldquo;Differential leakage&rdquo;. Where substitute was applied in lieu of IR, note
                the substitution and the IET CoP Ch 15 reference.
              </li>
              <li>
                <strong>Numeric result:</strong> the reading in mA, expressed at the
                operating-voltage equivalent (the tester does this scaling for the substitute
                method).
              </li>
              <li>
                <strong>Construction class:</strong> Class I or Class II. The class determines the
                applicable limit (0.5 vs 0.25 mA) and whether the protective conductor is in the
                test path.
              </li>
              <li>
                <strong>Limit applied:</strong> the numeric limit and its source. &ldquo;0.5 mA per
                IET CoP Ch 15 (general Class I)&rdquo; or &ldquo;3.5 mA per BS EN 62368-1 (Class I
                IT equipment with intact protective conductor)&rdquo;. The audit trail includes the
                standard.
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
              'Two methods: substitute leakage (low test voltage scaled to operating equivalent) and differential leakage (full mains, direct L−N current measurement). Both produce a current in mA judged against IET CoP limits.',
              'IET CoP Ch 15 limits: 0.5 mA Class I, 0.25 mA Class II. Class II is tighter because there is no protective conductor — leakage equals touch current.',
              'BS EN 62368-1 / BS EN 60950-1 IT equipment exception: up to 3.5 mA permitted for certain Class I categories with intact protective conductor. Apply the product-standard limit, not the general value.',
              'Substitute leakage is the IET CoP-recognised replacement for IR on switch-mode and EMC-filtered equipment. Y-capacitors make IR misleading; leakage at operating voltage is the safety-relevant test.',
              '"Touch current" (Class II focus — accessible metal to earth via the user) is distinct from "earth leakage current" (Class I focus — protective conductor current under operation). BS EN 62353 names both for medical equipment.',
              'Earth continuity must pass before leakage testing. The leakage number is only meaningful if the protective conductor (Class I) or the accessible-metal test point (Class II) is intact.',
              'Differential leakage applies full mains. RCD protection on the supply, GS38-compliant test leads if external probing, and appropriate isolation procedures apply.',
              'Record both the reading and the limit applied. The PAT record without the limit is incomplete — a 2.8 mA pass under BS EN 62368-1 looks like a fail under IET CoP general limits without the standard reference.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'When should I run differential leakage instead of substitute leakage?',
                answer:
                  'Where you want the most conservative real-conditions measurement and the equipment can tolerate full-mains testing. For routine PAT in lieu of IR on switch-mode equipment, substitute is faster, gentler and produces a meaningful number — that is the IET CoP default. Differential adds value where (a) the substitute reading is borderline and you want to verify against actual operating conditions, (b) the equipment has unusual non-linear characteristics that make scaling unreliable, or (c) the duty-holder procedures specifically require differential measurement (e.g. some industrial QA regimes).',
              },
              {
                question:
                  'My PAT tester only offers substitute leakage. Is that sufficient under IET CoP?',
                answer:
                  'For routine PAT, yes. IET CoP Ch 15 names substitute leakage as the standard substitution-in-lieu-of-IR method. Differential leakage is named as an alternative, not a requirement. A tester offering only substitute leakage is fully IET CoP compliant for general PAT. Specialist applications (medical equipment under BS EN 62353, or industrial QA per the duty-holder procedures) may require differential testing and a tester that supports both.',
              },
              {
                question:
                  'A Class I appliance has 0.6 mA earth leakage. The IET CoP general limit is 0.5 mA. The appliance is a domestic kettle. Pass or fail?',
                answer:
                  "Fail. A domestic kettle is a general Class I appliance with no special product standard exception — the 0.5 mA limit applies. 0.6 mA is over the limit. Investigate before retesting: damp insulation, contamination of the heating element, partial degradation of the heating element-to-chassis insulation. The kettle is removed from service until the cause is found and remediated. Don't be tempted to apply the BS EN 62368-1 3.5 mA limit — that exception is for IT equipment only.",
              },
              {
                question:
                  'What about RCD-protected supplies — does that change PAT leakage limits?',
                answer:
                  'No. RCD protection is a downstream protective measure that interrupts the supply when leakage exceeds the RCD threshold (typically 30 mA for general additional protection). PAT leakage limits are about the appliance itself, not what the upstream protection happens to be. An appliance leaking 25 mA on a 30 mA RCD is below the trip threshold but well above any IET CoP limit — the appliance fails PAT regardless of whether the RCD has tripped on it. The RCD is supplementary; PAT compliance is primary.',
              },
              {
                question: 'Does leakage testing apply to Class III SELV equipment?',
                answer:
                  'Generally no — Class III is supplied at SELV (≤ 50 V AC), well below shock-risk threshold for healthy users. Routine PAT on Class III focuses on visual inspection and any equipment-specific tests required by the product standard. Where the duty-holder risk assessment includes Class III items (typically only for specialist applications — medical, lab, vulnerable users), the relevant product standard or BS EN 62353 applies. The general IET CoP leakage limits apply to Class I and Class II mains-voltage equipment.',
              },
              {
                question:
                  'Can a leakage failure be caused by something other than insulation breakdown?',
                answer:
                  'Yes. Common non-insulation causes: a partially-short Y-capacitor in an EMC filter, contamination across a terminal block (dust, conductive residue), water ingress to a cable gland, a degraded surge arrester, a damaged neutral-to-earth bond inside the appliance. Each has a different remediation. Diagnose the cause before deciding to fail the appliance — many leakage failures are repairable, particularly contamination and damaged components within otherwise sound equipment.',
              },
              {
                question: 'Why does Class II have a tighter limit (0.25 mA) than Class I (0.5 mA)?',
                answer:
                  'Because Class II has no protective conductor. On Class I, leakage flows safely down the green/yellow to earth — the protective conductor is the path of least resistance, and the user is not exposed unless the protective conductor itself fails. On Class II, any leakage that does flow has to flow through accessible parts (metal grilles, metal handles) to ground — the user IS the path. Every milliamp of touch current on Class II is a milliamp through a person if they are touching the appliance and a path to ground exists. The tighter limit reflects that direct-exposure relationship.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Touch current and leakage testing — PAT M4.4" questions={quizQuestions} />

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
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-4-section-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.5 Test equipment types
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

export default PATTestingModule4Section4;
