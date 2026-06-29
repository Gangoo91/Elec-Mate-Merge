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
    id: 'patm2-s2-arch',
    question:
      'A Class I appliance has basic insulation that has degraded — a live conductor is now in contact with the metal casing. The CPC is intact and the supply has a 16 A B-curve MCB. What happens?',
    options: [
      'Nothing happens — the casing remains at a safe potential and the appliance keeps working.',
      'Fault current flows through the CPC to earth, the MCB trips magnetically, supply is cut in milliseconds.',
      'The user receives a sustained 230 V shock for as long as they remain in contact with the casing.',
      'The MCB does not operate, because a fault inside the equipment is outside its detection range.',
    ],
    correctIndex: 1,
    explanation:
      'This is the Class I architecture working as designed: basic insulation fails, the CPC carries a high fault current (typically hundreds of amps), the MCB trips instantaneously, and the supply disconnects within tens of milliseconds. Any touch voltage during the fault is limited by the CPC impedance, typically below the 50 V ac safe-touch threshold. The PE-continuity test exists to verify that CPC path is intact and low-resistance — without it, the architecture silently fails.',
  },
  {
    id: 'patm2-s2-cpcfail',
    question:
      'The same Class I appliance, but the CPC has become open-circuit at the plug terminal (loose strands not engaged). Same insulation failure occurs. What happens?',
    options: [
      'The MCB still operates normally and disconnects the supply as it would with an intact CPC.',
      'No fault current flows; the casing rises to 230 V and stays live until a user becomes the path.',
      'The RCD always saves the user, regardless of whether the CPC is intact or broken.',
      'The basic insulation provides adequate protection on its own once the CPC is broken.',
    ],
    correctIndex: 1,
    explanation:
      'With the CPC open-circuit no fault current can flow, so the casing rises to live potential (230 V ac) and stays there; the first user to touch it while also in contact with an earthed object becomes the fault path. CPC discontinuity is the silent killer of Class I protection — the equipment keeps working (no fuse blows, no light goes out) with no warning. Only a sensitive supply-side RCD would interrupt the shock, and the PE-continuity test is the first line of defence against exactly this failure mode.',
  },
  {
    id: 'patm2-s2-acceptance',
    question:
      'IET CoP §15.4 acceptance for Class I PE continuity is 0.1 Ω + 1 mΩ/m of flex. For a 5 m flex, what is the maximum acceptable reading?',
    options: ['0.105 Ω (0.1 + 5 × 0.001).', '0.1 Ω.', '0.5 Ω.', '1.0 Ω.'],
    correctIndex: 0,
    explanation:
      'The acceptance is 0.1 Ω contact / connection allowance + 1 mΩ/m × cable length. For 5 m: 0.1 + 5 × 0.001 = 0.105 Ω. Most practical PAT instruments display readings to 0.01 Ω resolution, and a fail at this level is a real defect — typically a loose terminal at the plug or at the equipment internal earth point.',
  },
  {
    id: 'patm2-s2-currentchoice',
    question:
      'Most modern multifunction PAT testers offer "high current" (typically 25 A) and "low current" (typically 200 mA or less) options for the PE-continuity test. When is high-current testing needed, and when is it inappropriate?',
    options: [
      'Always use high-current testing, since it is the more rigorous test in every situation.',
      'High-current verifies general Class I CPCs; low-current suits sensitive electronics in the earth path.',
      'Always use low-current testing, as it is gentler and avoids any risk of equipment damage.',
      'Test current makes no difference to the continuity reading, so either mode is interchangeable.',
    ],
    correctIndex: 1,
    explanation:
      'High-current (≥ 1.5 × the equipment rating, or 25 A typical) verifies the CPC under realistic fault conditions and reveals high-resistance joints that conduct at 200 mA but heat and open at 25 A. Low-current (200 mA typical) suits items with sensitive electronics in the CPC path (some IT and medical equipment) where 25 A could damage internal components. IET CoP §15.4 and the instrument manual are the reference for which to use.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the protective architecture of a Class I appliance per BS EN 61140?',
    options: [
      'Basic insulation plus CPC bonding, with fault protection by automatic disconnection.',
      'Double or reinforced insulation throughout, with no protective earth to the appliance.',
      'A separated extra-low voltage (SELV) supply from a safety isolating transformer.',
      'Internal battery operation, isolating the user from the mains supply entirely.',
    ],
    correctAnswer: 0,
    explanation:
      'Class I uses basic insulation + CPC bonding + automatic disconnection. The three elements are interdependent: basic insulation is the first line; CPC + protective device is the second; remove either second-line element and Class I has effectively reverted to Class 0 in fault response.',
  },
  {
    id: 2,
    question: 'The PE-continuity test on a Class I appliance verifies what, specifically?',
    options: [
      'That the basic insulation between live conductors and accessible parts is intact.',
      'That the protective device feeding the appliance will operate within its rated time.',
      'That the protective conductor path to every accessible part is continuous and low-resistance.',
      'That supply polarity at the appliance is correct and the neutral is not floating.',
    ],
    correctAnswer: 2,
    explanation:
      'The PE-continuity test verifies the whole CPC path — earth pin, flex CPC, internal earth termination, through to every accessible conductive part; the reading is the resistance of that path. A reading above the acceptance value means a high-resistance link exists — disconnection time may exceed Reg 411.3.2 limits, defeating the protection.',
  },
  {
    id: 3,
    question:
      'Why does the IET CoP §15.4 acceptance value for Class I PE continuity scale with cable length?',
    options: [
      'Because the insulation resistance limit scales with length in the same way.',
      'Because the flex conductor has a non-zero resistance per metre and is part of the protective path, so longer cables contribute more resistance.',
      'Because manufacturers prefer a per-metre figure for record-keeping.',
      'Because longer cables are more likely to suffer mechanical damage in service.',
    ],
    correctAnswer: 1,
    explanation:
      'The acceptance adds ~1 mΩ/m for the cable on top of the 0.1 Ω contact allowance, so a 1 m flex passes at ≤ 0.101 Ω and a 10 m flex at ≤ 0.110 Ω. Modern PAT instruments compute this from the entered cable length.',
  },
  {
    id: 4,
    question:
      'A Class I appliance has its CPC opened (broken) at the equipment internal earth point. The IR test passes, the appliance functions normally. What is the actual safety state?',
    options: [
      'Safe — the passing IR test confirms the insulation will contain any fault.',
      'Safe — basic insulation alone is sufficient for this portable equipment.',
      'Safe — a supply-side RCD will always disconnect before the user is harmed.',
      'Unsafe — with the CPC broken it has effectively reverted to Class 0.',
    ],
    correctAnswer: 3,
    explanation:
      'Class I depends on a working CPC. Without it, basic insulation is the only protection — the Class 0 architecture, not accepted in UK practice. The PE-continuity test is the only PAT test that detects this specific defect; IR cannot.',
  },
  {
    id: 5,
    question:
      'A modern multifunction PAT tester typically offers high-current (~ 25 A) and low-current (~ 200 mA) PE-continuity test modes. Why offer both?',
    options: [
      'High current reveals high-resistance joints; low current is gentler on earth-path electronics.',
      'High current is for three-phase appliances and low current is for single-phase appliances.',
      'The two modes correspond to 50 Hz and 60 Hz mains supplies respectively.',
      'High current is used for flexible flexes and low current for fixed cables.',
    ],
    correctAnswer: 0,
    explanation:
      'High current is the more rigorous test of CPC integrity — it reveals partial connections that conduct at low current but fail at high current. Low current (the "gentle test") avoids damaging EMC filters or surge suppressors that may sit in the bonding path.',
  },
  {
    id: 6,
    question:
      'For Class I IR testing, the test probe is applied to the EARTH PIN of the plug. Why?',
    options: [
      'Because the earth pin is the most convenient pin to reach on a BS 1363 plug.',
      'Because it is the conventional Class II IR test point, applied to Class I as well.',
      'Because every accessible part is bonded to the CPC, so the earth pin tests them all.',
      'Because the earth pin is the only pin not energised during the IR test.',
    ],
    correctAnswer: 2,
    explanation:
      'The earth pin is a single accessible test point for the entire bonded network. The CPC bonding holds every accessible conductive part at the same potential, so testing one tests all.',
  },
  {
    id: 7,
    question:
      'A 110 V CTE site transformer is itself a Class I device. The primary side is 230 V; the secondary is 110 V centre-tapped. How is its PE-continuity tested?',
    options: [
      'PE-continuity is measured from the earth pin of the 230 V supply plug (or supply-side earth terminal) to the metal casing of the transformer.',
      'PE-continuity is measured across the primary and secondary windings together in a single test.',
      'PE-continuity is taken from the centre-tap of the 110 V secondary to the casing.',
      'PE-continuity testing is omitted on transformers as they are double-wound.',
    ],
    correctAnswer: 0,
    explanation:
      'A 110 V CTE transformer is Class I on the supply side, so its CPC verification is on the primary side — earth pin to metal casing. The secondary centre-tap earthing is a separate function verified when 110 V tools plugged into it are tested.',
  },
  {
    id: 8,
    question:
      "A Class I kettle's flex has been replaced — it had a 0.75 mm² 3-core flex, now a 1.0 mm² 3-core flex of the same length. What does this change about the PE-continuity acceptance value?",
    options: [
      'The acceptance value doubles to reflect the heavier conductor cross-section.',
      'The kettle is reclassified as Class II once the heavier flex is fitted.',
      'The acceptance allowance is unchanged; the heavier flex simply gives a lower reading.',
      'Nothing at all changes, because flex size has no effect on conductor resistance.',
    ],
    correctAnswer: 2,
    explanation:
      'Conductor csa affects resistance per metre, but the simplified acceptance allowance covers the practical range of flex sizes. The heavier flex is an improvement; the inspector verifies correct termination (cord grip, cores engaged, correct fuse) and tests the resulting CPC path.',
  },
  {
    id: 9,
    question:
      'The IET CoP §15.4 acceptance value applies to "any accessible conductive part of the equipment". What if the equipment has multiple accessible conductive parts (e.g. a Class I tool with metal casing AND metal handle AND metal trim)?',
    options: [
      'Test only the main casing, as the other parts are bonded to it by design.',
      'Average the readings taken from each accessible conductive part together.',
      'Test only the single most accessible part, to keep the record simple.',
      'Check each accessible part and record the worst reading.',
    ],
    correctAnswer: 3,
    explanation:
      'Multiple accessible conductive parts means multiple test points. A casing reading of 0.05 Ω with a handle reading of 1.2 Ω shows the handle has lost its bond — even though the casing alone would pass.',
  },
  {
    id: 10,
    question:
      'Why does the IET CoP framework consider PE-continuity the SINGLE most important PAT test for Class I equipment?',
    options: [
      'Because a CPC failure is invisible — only an instrument test of CPC integrity detects it.',
      'Because it is the quickest test to perform on a modern multifunction instrument.',
      'Because it draws the most test current and therefore stresses the appliance most.',
      'Because it is the test most clearly documented in the appliance manufacturer manual.',
    ],
    correctAnswer: 0,
    explanation:
      'The CPC is the silent backbone of Class I protection. IR and functional tests pass regardless of CPC state; only the PE-continuity test catches a degraded CPC before it fails to disconnect a fault. It is the load-bearing test in the Class I regime.',
  },
];

const PATTestingModule2Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Class I — protective earthing explained | PAT Module 2.2 | Elec-Mate',
    description:
      'BS EN 61140 Class I protective architecture: basic insulation + CPC bonding + automatic disconnection. The role of the CPC, the IET CoP §15.4 PE-continuity test, the acceptance value 0.1 Ω + 1 mΩ/m, and why the test is the load-bearing element of Class I PAT.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2"
            title="Class I — protective earthing explained"
            description="The most common construction for mains-powered equipment with metal casings. Basic insulation as the first line of defence; CPC bonding + automatic disconnection as the second. Get the CPC wrong and Class I silently reverts to Class 0."
            tone="yellow"
          />

          <TLDR
            points={[
              'Class I = basic insulation + connection of every accessible conductive part to a protective conductor (CPC) + automatic disconnection by the supply protective device when a fault current flows.',
              'The CPC path runs from the earth pin of the plug, along the green-and-yellow conductor of the flex, to the equipment internal earth point, and from there to every accessible conductive part — bonding them together.',
              'When basic insulation fails and a live conductor touches an accessible part, fault current flows through the CPC, the protective device operates within Reg 411.3.2 disconnection time, and the user is protected.',
              'CPC discontinuity is the silent failure mode. Equipment functions normally; user has no warning; the next failure of basic insulation leaves the casing live with no path to disconnect.',
              'IET CoP §15.4 PE-continuity test is the load-bearing PAT test for Class I. Acceptance: 0.1 Ω + 1 mΩ/m of flex. Modern multifunction testers compute the acceptance from cable length.',
              'High-current PE testing (~ 25 A) is more rigorous than low-current (~ 200 mA) — reveals high-resistance joints that pass at low current. Low-current is for sensitive-electronics equipment.',
              'The IR test (live to earth pin, 500 V dc, ≥ 1 MΩ) verifies basic insulation. Both tests are required — IR alone does not catch CPC failure; PE-continuity alone does not catch insulation failure.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe the Class I protective architecture: basic insulation, CPC bonding, and automatic disconnection — and explain how the three elements interact during a fault',
              'Trace the CPC path from earth pin → flex CPC conductor → equipment internal earth point → every accessible conductive part',
              'Apply the IET CoP §15.4 PE-continuity test method to Class I equipment, including acceptance value calculation (0.1 Ω + 1 mΩ/m × cable length)',
              'Distinguish high-current and low-current PE-continuity test modes, and choose appropriately for the equipment under test',
              'Explain why CPC discontinuity is the silent failure mode of Class I protection and how the PE-continuity test detects it',
              'Apply the Class I IR test (probe on earth pin, 500 V dc, ≥ 1 MΩ) and interpret readings against IET CoP §15.5',
              'Recognise that PE-continuity is the load-bearing PAT test for Class I — the test most-needed and most-easily-skipped in inadequate regimes',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>How Class I protection works</ContentEyebrow>

          <ConceptBlock
            title="Three elements, all required"
            plainEnglish="Class I protection is the combination of three elements: basic insulation between live conductors and accessible parts; bonding of every accessible conductive part to a protective conductor; and a protective device that operates when fault current flows. Remove or degrade any one element and the architecture fails. Most importantly: equipment continues to function with a degraded CPC, so the user gets no warning."
            onSite="The Class I test sequence is built around these three elements. PE-continuity test = does the CPC actually work? IR test = is the basic insulation intact? Functional test = does the equipment energise correctly? Together they verify the architecture."
          >
            <p>The Class I fault sequence:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Basic insulation fails.</strong> A live conductor inside the equipment
                touches a metal part — most commonly the casing, the heating element shroud, or a
                metal trim element. Cause: thermal stress, mechanical damage, moisture ingress, age.
              </li>
              <li>
                <strong>Fault current flows via the CPC.</strong> The accessible conductive part is
                bonded to the CPC, which carries the fault current back to the MET via the fixed
                wiring CPC. The fault current is high — in a low-impedance loop, hundreds of amps in
                tens of milliseconds.
              </li>
              <li>
                <strong>Protective device disconnects.</strong> An MCB sees the fault current and
                operates magnetically (instantaneous trip). An RCD sees the residual current and
                operates within its rated time (≤ 40 ms at I&Delta;n typically). The supply is
                removed before the user can be injured.
              </li>
              <li>
                <strong>User experiences a momentary touch voltage.</strong> During the fault, the
                casing rises to a voltage limited by the impedance of the CPC path. With a
                low-impedance CPC, this is well below the safe-touch threshold (50 V ac).
              </li>
            </ol>
            <p>
              The whole sequence completes in a fraction of a second. The user touching the casing
              during the fault is exposed to a brief, low-voltage event rather than a sustained 230
              V shock. That is Class I doing its job.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.3.2 (automatic disconnection in fault conditions)"
            clause={
              <>
                For final circuits not exceeding 32 A, the maximum disconnection time shall be in
                accordance with Table 41.1 — for a TN system, 0.4 seconds for 230 V nominal supply.
                For final circuits exceeding 32 A and for distribution circuits, the maximum
                disconnection time shall be 5 seconds.
              </>
            }
            meaning="Class I protection time-bounds the user\'s exposure to fault. The protective device must operate within these times for the protection to work — and the device can only operate fast enough if the CPC impedance is low enough for adequate fault current to flow. The PE-continuity test verifies that condition. Reg 411.3.2 sits behind every Class I PAT decision."
          />

          <ConceptBlock
            title="The CPC path — what the test actually traverses"
            plainEnglish="The PE-continuity test, when applied between the earth pin of the plug and any accessible conductive part of the equipment, traces the entire protective conductor path inside the appliance. Every link in that path must be intact and low-resistance for the test to pass."
          >
            <p>The links in a typical Class I CPC path:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Earth pin of the BS 1363 plug, where the test probe is applied.</li>
              <li>
                The earth-pin terminal inside the plug, where the green-and-yellow conductor is
                clamped.
              </li>
              <li>The green-and-yellow conductor along the full length of the flex.</li>
              <li>
                The cord grip at the equipment entry, where the flex is mechanically secured (the
                green-and-yellow conductor passes through it but should not be load-bearing).
              </li>
              <li>
                The internal terminal at the equipment, where the green-and-yellow conductor lands
                on the equipment\'s earth point.
              </li>
              <li>
                The internal bonding conductors / chassis structure that carries earth from the
                internal earth point to every accessible conductive part — sometimes a single wire,
                sometimes the metal chassis itself, sometimes a combination.
              </li>
              <li>The probe contact point on the accessible conductive part.</li>
            </ul>
            <p>
              A defect anywhere in this chain inflates the reading. Typical defect locations (in
              order of frequency): loose conductor at the plug terminal, broken / loose conductor at
              the equipment internal earth point, corroded plug pin, broken internal bonding
              conductor in the chassis, undersize earth conductor used in a flex repair.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Class I architecture diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Class I — basic insulation + CPC bonding + protective device disconnection
            </h4>
            <svg
              viewBox="0 0 820 400"
              className="w-full h-auto"
              role="img"
              aria-label="Class I appliance protective architecture. Live and Neutral conductors enter the metal-cased appliance through basic insulation. The metal casing is bonded to the CPC, which runs back through the flex and earth pin to the MET in the consumer unit. On a fault from Live to casing, fault current flows through the CPC to earth and the supply protective device disconnects. A bottom callout records the IET CoP §15.4 PE-continuity acceptance value."
            >
              {/* Supply side / consumer unit */}
              <rect
                x="40"
                y="60"
                width="160"
                height="200"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="120"
                y="82"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="11"
                fontWeight="bold"
              >
                CONSUMER UNIT
              </text>
              <rect
                x="60"
                y="100"
                width="120"
                height="40"
                rx="4"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="120"
                y="118"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                MCB / RCD
              </text>
              <text x="120" y="132" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                operates on fault
              </text>
              {/* MET */}
              <rect
                x="60"
                y="200"
                width="120"
                height="38"
                rx="4"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="120"
                y="218"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                MET (earth)
              </text>
              <text x="120" y="232" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                main earthing terminal
              </text>

              {/* L, N, CPC out of CU */}
              <line x1="200" y1="118" x2="380" y2="118" stroke="#EF4444" strokeWidth="2.5" />
              <text
                x="290"
                y="112"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                L
              </text>
              <line x1="200" y1="146" x2="380" y2="146" stroke="#3B82F6" strokeWidth="2.5" />
              <text
                x="290"
                y="140"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="10"
                fontWeight="bold"
              >
                N
              </text>
              <line x1="200" y1="218" x2="380" y2="218" stroke="#22C55E" strokeWidth="2.5" />
              <text
                x="290"
                y="212"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                CPC
              </text>

              {/* Plug */}
              <rect
                x="380"
                y="96"
                width="56"
                height="140"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="408"
                y="92"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="9"
                fontWeight="bold"
              >
                Plug
              </text>
              <circle cx="395" cy="118" r="3.5" fill="#EF4444" />
              <text
                x="395"
                y="134"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                L
              </text>
              <circle cx="421" cy="146" r="3.5" fill="#3B82F6" />
              <text
                x="421"
                y="162"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="9"
                fontWeight="bold"
              >
                N
              </text>
              <circle cx="408" cy="218" r="4.5" fill="#22C55E" />
              <text
                x="408"
                y="232"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                E pin
              </text>

              {/* Flex 3-core */}
              <line x1="436" y1="118" x2="560" y2="118" stroke="#EF4444" strokeWidth="2.2" />
              <line x1="436" y1="146" x2="560" y2="146" stroke="#3B82F6" strokeWidth="2.2" />
              <line x1="436" y1="218" x2="560" y2="218" stroke="#22C55E" strokeWidth="2.2" />
              <text x="498" y="184" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                Flex (3-core)
              </text>

              {/* Class I appliance — metal casing */}
              <rect
                x="560"
                y="76"
                width="220"
                height="200"
                rx="10"
                fill="rgba(168,85,247,0.06)"
                stroke="#A855F7"
                strokeWidth="2"
              />
              <text
                x="670"
                y="98"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="12"
                fontWeight="bold"
              >
                CLASS I APPLIANCE
              </text>
              <text
                x="670"
                y="112"
                textAnchor="middle"
                fill="rgba(255,255,255,0.55)"
                fontSize="9.5"
              >
                metal casing, bonded to CPC
              </text>

              {/* Live element with basic insulation */}
              <rect
                x="588"
                y="132"
                width="100"
                height="46"
                rx="5"
                fill="rgba(239,68,68,0.12)"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="3,2"
              />
              <text
                x="638"
                y="152"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                Live element
              </text>
              <text x="638" y="166" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                (basic insulation)
              </text>

              {/* Internal earth point */}
              <circle cx="710" cy="218" r="6" fill="#22C55E" />
              <text
                x="722"
                y="214"
                textAnchor="start"
                fill="#22C55E"
                fontSize="9.5"
                fontWeight="bold"
              >
                Internal
              </text>
              <text
                x="722"
                y="226"
                textAnchor="start"
                fill="#22C55E"
                fontSize="9.5"
                fontWeight="bold"
              >
                earth
              </text>

              {/* Bonding to casing — green dotted lines from internal earth to casing edges */}
              <line
                x1="710"
                y1="218"
                x2="575"
                y2="86"
                stroke="#22C55E"
                strokeWidth="1.4"
                strokeDasharray="3,2"
              />
              <line
                x1="710"
                y1="218"
                x2="765"
                y2="86"
                stroke="#22C55E"
                strokeWidth="1.4"
                strokeDasharray="3,2"
              />
              <line
                x1="710"
                y1="218"
                x2="765"
                y2="266"
                stroke="#22C55E"
                strokeWidth="1.4"
                strokeDasharray="3,2"
              />
              <line
                x1="710"
                y1="218"
                x2="575"
                y2="266"
                stroke="#22C55E"
                strokeWidth="1.4"
                strokeDasharray="3,2"
              />

              {/* Flex E to internal earth */}
              <line x1="560" y1="218" x2="710" y2="218" stroke="#22C55E" strokeWidth="2.2" />

              {/* Fault current arrow */}
              <path
                d="M 638 178 Q 680 200 710 218"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2.2"
                strokeDasharray="4,3"
              />
              <text
                x="660"
                y="196"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9.5"
                fontWeight="bold"
              >
                Fault current →
              </text>

              {/* Caption — separated band */}
              <rect
                x="40"
                y="296"
                width="740"
                height="84"
                rx="10"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.25)"
                strokeWidth="1.2"
              />
              <text
                x="410"
                y="318"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="10.5"
              >
                On insulation failure: Live → casing → CPC → MET → MCB / RCD operates.
              </text>
              <text x="410" y="336" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                The CPC must be intact and low-resistance for protection to work.
              </text>
              <text
                x="410"
                y="362"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10.5"
                fontWeight="bold"
              >
                IET CoP §15.4 PE-continuity test verifies the green path
              </text>
              <text
                x="410"
                y="376"
                textAnchor="middle"
                fill="rgba(255,255,255,0.75)"
                fontSize="9.5"
              >
                acceptance ≤ 0.1 Ω + 1 mΩ/m × flex length
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The PE-continuity test — IET CoP §15.4</ContentEyebrow>

          <ConceptBlock
            title="Test method"
            plainEnglish="The IET CoP §15.4 PE-continuity test is performed using the multifunction PAT instrument\'s dedicated continuity function. One probe is applied to the earth pin of the plug; the other to any accessible conductive part of the equipment. The instrument measures the resistance and compares to the acceptance value (0.1 Ω + 1 mΩ/m × cable length)."
            onSite="Modern PAT instruments take cable length as an input and compute the acceptance value automatically. Older instruments may publish a single fixed value. Always verify which acceptance the instrument is using before reading results."
          >
            <p>The test sequence:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Visual prerequisite.</strong> Confirm the equipment is Class I (markings,
                construction, presence of CPC at plug). If Class I cannot be confirmed, do not
                proceed with this test.
              </li>
              <li>
                <strong>Equipment isolation.</strong> Plug the appliance into the PAT instrument
                output. The instrument provides the test current and reads the resistance.
              </li>
              <li>
                <strong>Probe placement.</strong> One probe stays on the earth pin of the plug
                (typically built into the instrument). The other is held against an accessible
                conductive part — start with the most clearly bonded (the main casing) and then
                check additional accessible parts (handles, trims, switch plates, removable covers).
              </li>
              <li>
                <strong>Read result.</strong> The instrument displays the resistance in Ω. Compare
                to the acceptance value computed from cable length (0.1 + 0.001 × m).
              </li>
              <li>
                <strong>Multiple parts check.</strong> Walk the probe to every accessible conductive
                part. Variations between parts indicate localised bonding defects (a part has been
                replaced and lost its bond, or an internal bonding wire is broken).
              </li>
              <li>
                <strong>Record the worst reading.</strong> The reading recorded for the equipment as
                a whole is the highest reading across all tested points — that is the part with the
                weakest bond, and it is the one that determines the equipment\'s Class I integrity.
              </li>
            </ol>
            <p>
              The PE-continuity test is fast (seconds per item with modern instruments) and
              decisive. A pass means the CPC path is intact end-to-end. A fail means the path is
              broken or has high resistance — Class I protection cannot be relied on.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice (5th Ed, 2020) · §15.4"
            clause={
              <>
                The continuity of the protective conductor of Class I equipment shall be tested
                using a low-resistance ohmmeter or an instrument incorporating such a function. The
                maximum permissible resistance is 0.1 Ω plus the resistance of the flexible supply
                cable, taken as 1 mΩ per metre of cable length.
              </>
            }
            meaning="The 0.1 Ω + 1 mΩ/m formula is the practical acceptance ceiling. The 0.1 Ω is the contact / connection allowance; the 1 mΩ/m is the simplified cable contribution. Any reading materially above the formula indicates a connection defect."
          />

          <ConceptBlock
            title="High-current vs low-current PE-continuity"
            plainEnglish="Most modern multifunction PAT testers provide two PE-continuity test modes: high-current (typically 25 A) and low-current (typically 200 mA or less). The choice is not arbitrary — it has implications for what the test detects and what it can damage."
          >
            <p>High-current testing (recommended default for general Class I equipment):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Simulates fault conditions more closely. A high-resistance partial connection that
                conducts at 200 mA can heat and open at 25 A — and that is exactly the fault-current
                behaviour you want to detect.
              </li>
              <li>
                Reveals defects that low-current testing might miss, particularly cumulative strand
                damage at terminations.
              </li>
              <li>
                Per IET CoP §15.4, "soft" connection failures are best caught with a meaningful test
                current.
              </li>
            </ul>
            <p>Low-current testing (use where equipment-specific guidance dictates):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Used where high-current testing might damage sensitive electronics in the earth path
                — e.g. some IT equipment, some medical equipment, some equipment with surge / EMC
                components in series with the protective bonding.
              </li>
              <li>
                The instrument manual usually specifies "soft test" mode or "Class IT" mode for
                these cases.
              </li>
              <li>The acceptance value is the same formula; only the test current differs.</li>
            </ul>
            <p>
              The default for general portable Class I equipment (kettles, fan heaters, hand tools,
              fixed luminaires) is high-current. The exception applies to specific equipment
              categories where the manufacturer or instrument guidance directs otherwise.
            </p>
          </ConceptBlock>

          <Scenario
            title="The high-resistance plug terminal"
            situation="A 13 A IEC lead is tested. The PE-continuity reading on low-current is 0.08 Ω — passes. The same lead tested at high-current reads 0.45 Ω — fails. The lead is unaltered between tests; the inspector is using the same instrument. What is happening?"
            whatToDo="A partial connection in the earth-pin terminal of the plug. At low test current (200 mA), the resistance of the partial contact is low because the surface contact area is sufficient for the small current. At high test current (25 A), the resistance rises sharply as the partial contact heats and de-rates. The behaviour is precisely what fault current would do — and is precisely the failure mode the high-current test is designed to detect. The lead fails. Replace the plug top, or replace the lead, and re-test."
            whyItMatters="High-current testing is the more rigorous test of CPC integrity. The 'low-current passes, high-current fails' pattern is one of the most diagnostic findings — it indicates a connection that may pass routine tests but cannot carry fault current. Without high-current testing, the defect is invisible until it fails to disconnect a fault."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The IR test for Class I — IET CoP §15.5</ContentEyebrow>

          <ConceptBlock
            title="Test method"
            plainEnglish="The IR test on Class I equipment verifies the basic insulation between live conductors and the bonded earth network. Test probe is on the earth pin of the plug; the instrument applies 500 V dc between the live conductors (line + neutral commoned) and the earth pin. The reading is the insulation resistance in megohms."
          >
            <p>The test method (IET CoP §15.5):</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Plug the appliance into the PAT instrument; switch the appliance ON (so any series
                switches in the supply path are closed and the test reaches all live parts).
              </li>
              <li>
                The instrument applies 500 V dc between the line and neutral pins (commoned
                together) and the earth pin.
              </li>
              <li>
                Read the result in MΩ. The acceptance value for Class I per IET CoP §15.5 is
                typically &ge; 1 MΩ (general) or &ge; 1 MΩ for portable equipment with heating
                element ≥ 3 kW. (Specific values consult IET CoP 5th Ed Table 15.2.)
              </li>
              <li>
                For equipment with surge protection / EMC components that may bias the IR reading
                downward, the IET CoP allows alternative test methods (substitute leakage / touch
                current).
              </li>
            </ol>
            <p>
              The Class I IR test verifies the BASIC insulation is intact. Combined with the
              PE-continuity test (verifying the CPC bonds work), the two tests together verify the
              Class I architecture: insulation provides the first line; CPC + protective device
              provides the second.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice (5th Ed, 2020) · §15.5 (Insulation resistance, Class I)"
            clause={
              <>
                For Class I equipment, the insulation resistance between the live conductors and the
                protective conductor (or accessible conductive parts) shall be measured at 500 V dc.
                The minimum acceptable value for general portable equipment is 1 MΩ. For equipment
                incorporating filters, electronic devices or other circuits that make the
                measurement inappropriate, an alternative method (such as protective conductor /
                touch current) may be used.
              </>
            }
            meaning="The Class I IR test sits alongside the PE-continuity test as the second pillar of Class I verification. Both must pass: PE-continuity for the CPC, IR for the basic insulation. Either test alone leaves a class of defects undetected."
          />

          <CommonMistake
            title="Skipping PE-continuity because IR passed"
            whatHappens="An inspector tests Class I equipment. IR is 50 MΩ — comfortably passes. The inspector applies a pass label without performing the PE-continuity test. Six months later, the same equipment has a CPC that became open due to a loose terminal at the plug. Insulation fails internally — and the casing rises to 230 V with no path to disconnect. The PAT label says PASS."
            doInstead="Both tests are required for Class I. PE-continuity verifies the CPC. IR verifies the basic insulation. Each catches a different failure mode. A passing IR does not redeem a missing PE-continuity test, and vice versa. The IET CoP §15 sequence is non-negotiable for Class I equipment."
          />

          <CommonMistake
            title="Reading just the casing for PE-continuity, ignoring other accessible parts"
            whatHappens="A Class I steam iron has a metal casing (bonded), a metal sole-plate (also bonded), and a metal handle insert (decorative, but conductive). The inspector reads PE-continuity from the earth pin to the casing — passes at 0.05 Ω. They do not check the sole-plate or handle insert. In fact, a previous repair has left the handle insert unbonded — its bonding wire has come loose. Months later, an internal fault energises the casing AND the handle insert via different paths; the casing is bonded so it is briefly live and then disconnected, but the handle remains live until something else interrupts it."
            doInstead="Walk the probe to every accessible conductive part. The IET CoP §15.4 requires PE continuity from the earth pin to ANY accessible conductive part. Multiple parts means multiple test points. The recorded reading is the worst — that is the weakest part of the bonding network."
          />

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
              'Class I architecture = basic insulation + CPC bonding of every accessible conductive part + automatic disconnection by the protective device. All three elements required.',
              'CPC discontinuity is the silent failure mode. Equipment functions; user has no warning; first insulation failure leaves casing live with no disconnection path.',
              'PE-continuity test (IET CoP §15.4) is the load-bearing PAT test for Class I. Acceptance: 0.1 Ω + 1 mΩ/m × cable length.',
              'Use high-current PE testing (~ 25 A) as default. Reveals high-resistance joints that low-current testing misses. Switch to low-current only where sensitive electronics in the earth path require it.',
              'IR test (live to earth pin, 500 V dc, ≥ 1 MΩ) verifies basic insulation. Cannot detect CPC failure — that is what PE-continuity is for.',
              'Walk the PE-continuity probe to every accessible conductive part. Multiple parts = multiple test points. The recorded reading is the worst.',
              'Both PE-continuity and IR are required for Class I. Skipping either leaves a class of defects undetected.',
              'Reg 411.3.2 disconnection times (0.4 s for 230 V final circuits ≤ 32 A) sit behind Class I — protection only works if the CPC impedance is low enough for adequate fault current.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Why is the PE-continuity test so important for Class I equipment?',
                answer:
                  'Because CPC discontinuity is the silent failure mode of Class I protection. The equipment continues to function with an open CPC — no fuse blows, no light goes out, no user warning. The only detection is an instrument test of the CPC integrity. Without the PE-continuity test, a degraded CPC remains undetected until it fails to disconnect a fault — at which point the failure mode is a shock injury.',
              },
              {
                question: 'What is the IET CoP acceptance value for Class I PE continuity?',
                answer:
                  '0.1 Ω plus 1 mΩ per metre of cable length. So a 1 m flex passes at ≤ 0.101 Ω; a 5 m flex passes at ≤ 0.105 Ω; a 10 m flex passes at ≤ 0.110 Ω. The 0.1 Ω is the contact / connection allowance; the 1 mΩ/m is the simplified cable contribution allowance. Modern PAT instruments compute this from cable length.',
              },
              {
                question: 'High-current or low-current PE-continuity test — which should I use?',
                answer:
                  'High-current (typically 25 A) as default for general Class I equipment. It simulates fault conditions and reveals high-resistance joints that low-current testing misses. Low-current (typically 200 mA) is for equipment with sensitive electronics in the earth path (some IT, some medical) where high-current could damage internals. Reference the instrument manual and any equipment-specific guidance.',
              },
              {
                question:
                  'My instrument shows a "high-current PE continuity test failed because not enough mains voltage at the test outlet" warning — what is happening?',
                answer:
                  'High-current PE testing typically uses mains-derived energy to drive the 25 A test current. If the test socket-outlet does not have adequate supply impedance to source the current, the instrument cannot complete the test. Verify the supply, try a different outlet, or use the low-current mode if appropriate to the equipment. The instrument manual will specify the supply requirements.',
              },
              {
                question:
                  'Do I need both the PE-continuity test AND the IR test on Class I equipment?',
                answer:
                  'Yes. Each test catches a different failure mode. PE-continuity verifies the CPC is intact (catches CPC discontinuity). IR verifies the basic insulation is intact (catches insulation breakdown). Skipping either test leaves a whole class of defects undetected. The IET CoP §15 sequence is non-negotiable for Class I equipment.',
              },
              {
                question:
                  'I have replaced the flex on a Class I appliance. What testing do I need?',
                answer:
                  "A full re-test is required. PE-continuity from the new plug to the equipment's accessible parts (verifying the new flex CPC is properly terminated at both ends). IR test (verifying the basic insulation has not been compromised by the work). Functional test. Update the equipment's test history with the repair noted and the re-test results.",
              },
              {
                question: 'What if the PE-continuity reading is 0.0 Ω — too good to be true?',
                answer:
                  'Investigate. A reading of exactly 0.0 Ω may indicate (a) the test leads were not properly nulled (the lead resistance is being subtracted, hiding the actual CPC reading), or (b) the probe is contacting an unbonded part that happens to have the same potential as the earth pin via parallel paths. Check the null setting, verify the probe contact, and ensure the part being probed is in fact part of the equipment under test.',
              },
              {
                question:
                  'Are there situations where the PE-continuity test is inappropriate for Class I equipment?',
                answer:
                  "Rarely on the principle, but yes on the test current. Equipment with sensitive electronics or surge devices in the earth path (some medical equipment, some IT equipment, some specialist instrumentation) may require low-current PE testing per the manufacturer's guidance, to avoid damaging the internal electronics during the test. The PRINCIPLE of PE-continuity testing for Class I remains; only the implementation (test current) adapts.",
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Class I — protective earthing — Module 2.2" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-2-section-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.3 Class II — double insulation
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

export default PATTestingModule2Section2;
