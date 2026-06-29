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
    id: 'patm4-s1-test-current',
    question:
      'You are testing a desktop PC chassis (Class I) that contains a switch-mode PSU and an SSD. Which earth-continuity test current should you select?',
    options: [
      'The low-current 100 mA "soft" / "no-trip" test',
      'The high-current 25 A "hard" test for a definitive earth path',
      'Whichever test current is faster on the tester being used',
      'A mains-frequency leakage test in place of earth continuity',
    ],
    correctIndex: 0,
    explanation:
      'IET Code of Practice 5th Edition Chapter 15 lists three earth-continuity options: low-current 100 mA (soft), high-current 25 A, and 1.5× appliance current. The soft test is preferred for IT and electronic kit because the high 25 A test current can pass through internal components — capacitors, EMC parts, signal grounds — and stress or damage them. The hard test stays for robust Class I equipment.',
  },
  {
    id: 'patm4-s1-acceptance',
    question:
      'A Class I extension reel has a 12 m supply lead. Calculated acceptance from the IET CoP rule (≤0.1 Ω + 0.1 × R per metre beyond 5 m) is what?',
    options: [
      '0.1 Ω flat, regardless of the 12 m lead length',
      '1.0 Ω flat — the universal PAT limit for every lead',
      '0.1 Ω plus the actual resistance of the 12 m supply cable',
      '0.6 Ω, from 0.1 + (5 × 0.1) for the first five metres',
    ],
    correctIndex: 2,
    explanation:
      'IET CoP Chapter 15 sets the acceptance as 0.1 Ω plus the resistance contribution of the supply cable, calculated from its actual resistance per metre. The "0.1 Ω per metre beyond 5 m" rule of thumb is shorthand and is conservative — the underlying rule is 0.1 Ω + R(cable). Long leads (over 5 m) require the cable resistance to be added explicitly, not a flat limit.',
  },
  {
    id: 'patm4-s1-null',
    question:
      'You forgot to null the test leads on your PAT tester. Lead resistance is 0.06 Ω. The display reads 0.14 Ω on a 2 m kettle lead. What is the actual earth-continuity resistance?',
    options: [
      '0.14 Ω — that is what the meter displays, so record it',
      '0.06 Ω — the lead resistance is the conductor reading',
      '0.20 Ω — add the lead resistance to the display (0.14 + 0.06)',
      '0.08 Ω — subtract the lead resistance from the display (0.14 − 0.06)',
    ],
    correctIndex: 3,
    explanation:
      'Lead resistance is in series with the earth path. BS EN 61557-4 (low-resistance ohmmeter) instruments must include lead-resistance compensation, and IET CoP requires it to be nulled or measured-and-subtracted before recording. 0.14 − 0.06 = 0.08 Ω.',
  },
  {
    id: 'patm4-s1-class-ii',
    question:
      'You connect a Class II hairdryer to the PAT tester and run earth continuity. The meter shows open circuit (∞). What does this mean?',
    options: [
      'Pass — Class II equipment has no earth conductor by design, so the test is N/A',
      'Fail — the earth conductor inside the appliance has gone open-circuit',
      'Re-test on a different range, as the reading is out of the meter span',
      'Fail — every appliance must show a closed earth path to pass',
    ],
    correctIndex: 0,
    explanation:
      'IET CoP is clear: earth continuity is only required for Class I equipment. Class II appliances rely on double / reinforced insulation (per the construction symbol) and have no protective conductor — so an open-circuit reading is the expected and correct result, not a fault. Skip the test, document "Class II — earth continuity N/A", and proceed to insulation resistance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'IET Code of Practice 5th Edition (2020) Chapter 15 lists three earth-continuity test current options. What are they?',
    options: [
      '10 mA, 100 mA, and 1 A',
      'Low-current ≥100 mA (soft test), high-current 25 A, and a current of 1.5 × the appliance rated current',
      '10 A only — there is one method',
      'AC 230 V applied directly',
    ],
    correctAnswer: 1,
    explanation:
      'IET CoP Chapter 15 names three options: a low-current test of at least 100 mA (the "soft" test), a high-current 25 A test, and a test at 1.5 × the rated current of the appliance. The choice depends on the appliance — soft for IT and electronics, hard for robust Class I.',
  },
  {
    id: 2,
    question:
      'Why does IET CoP recommend the low-current (100 mA "soft") test in preference to 25 A for IT and electronic equipment?',
    options: [
      'It is faster, so more appliances can be tested per session',
      'There is no real difference; either current gives the same outcome',
      'The 25 A test tends to give false fails on sound earth paths',
      'A 25 A current can pass through and damage internal components',
    ],
    correctAnswer: 3,
    explanation:
      'Modern IT, audio and laboratory kit often has earth bonded internally to PCB ground planes, EMC components, or sensitive boards. A 25 A test can flow through those parts and damage them. The 100 mA soft test confirms continuity without that risk — IET CoP is explicit about this for sensitive equipment.',
  },
  {
    id: 3,
    question:
      'IET CoP earth-continuity acceptance is "≤ 0.1 Ω + the resistance of the supply cable". What does that mean for a typical 1.5 m kettle lead?',
    options: [
      '0.1 Ω flat, regardless of the lead length or cross-section',
      '1.0 Ω, because that is the universal PAT standard limit',
      'About 0.13 Ω — 0.1 Ω plus the small resistance of the 1.5 m flex',
      '0.6 Ω, because the cable is under 5 m and gets the short-lead allowance',
    ],
    correctAnswer: 2,
    explanation:
      "The acceptance value scales with lead length and cross-section. A short 1.5 m kettle lead adds only a few tens of milliohms; a 12 m extension reel adds significantly more. The IET CoP method is to take 0.1 Ω as the joint / termination allowance and add the cable's actual resistance.",
  },
  {
    id: 4,
    question:
      'What standard governs the design and accuracy of a low-resistance ohmmeter used for PAT earth-continuity testing?',
    options: [
      'BS EN 61557-4 — the part covering low-resistance ohmmeters specifically',
      'BS EN 61557-1 — the general requirements part, on its own',
      'BS EN 61010 — the test-equipment safety standard',
      'BS 7671 — the Wiring Regulations for the fixed installation',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 61557-4 specifies performance requirements for low-resistance ohmmeters (the instrument used for the soft earth-continuity test). BS EN 61557-1 sets general requirements for the whole series. BS EN 61010 covers test-equipment safety more broadly.',
  },
  {
    id: 5,
    question:
      'A Class I floor-standing photocopier reads 0.34 Ω earth continuity at the body, against an acceptance of about 0.20 Ω for its lead and joint allowance. What is the most likely cause and correct next step?',
    options: [
      'Pass — anything under 1 Ω is fine for a floor-standing machine',
      'It is normal for large equipment with a long internal earth path',
      'Repeat with the high-current test and accept whichever reads lower',
      'Investigate — the reading is above acceptance for that lead length',
    ],
    correctAnswer: 3,
    explanation:
      'A reading above the calculated acceptance is a fault to investigate, not to average away. Likely causes are a loose earth pin connection in the plug, a corroded internal earth bond, or paint trapped under an earth screw onto the chassis. The procedure is: open the plug, identify the cause, remediate, re-test, then record.',
  },
  {
    id: 6,
    question:
      "Why does IET CoP allow the option of a test current at 1.5 × the appliance's rated current?",
    options: [
      'It is the cheapest of the three test options to run',
      'It proves the earth path at a current realistic for that appliance',
      'It tests insulation resistance at the same time as continuity',
      'It is a mandatory test that must be run on every appliance',
    ],
    correctAnswer: 1,
    explanation:
      'The 1.5× rated current option sits between the 100 mA soft test (electronics) and the 25 A hard test (robust kit). It applies enough current to stress the joint without subjecting sensitive components to the full 25 A. IET CoP names it as one of the three valid methods.',
  },
  {
    id: 7,
    question:
      'You are about to PAT a fixed/built-in extractor fan that is supplied via a fused connection unit (FCU). What does IET CoP say?',
    options: [
      'Disconnect it from the FCU and PAT-test it on the bench',
      'Refuse to test it and leave it off the inspection record',
      'Treat it as part of the fixed installation, verified by R1+R2 / Zs',
      'Use the high-current 25 A test only, applied at the FCU',
    ],
    correctAnswer: 2,
    explanation:
      "IET CoP draws the boundary clearly: PAT covers equipment connected by flex and plug, not the fixed installation. An FCU-supplied extractor fan's earth path is verified by R1+R2 and Zs at periodic inspection of the installation, not by PAT.",
  },
  {
    id: 8,
    question:
      'BS 7671:2018+A4:2026 Reg 643.2.1 is referenced for protective-conductor continuity. Why is it relevant to PAT testing?',
    options: [
      'It is the parent principle — continuity verified by resistance measurement',
      'It directly governs PAT, setting the PAT earth-continuity acceptance value',
      'It exempts PAT-tested equipment from any continuity testing at all',
      'It applies only to ring final circuits, not to protective conductors',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 643.2.1 is the BS 7671 duty for the fixed installation. PAT picks up where the fixed installation stops — at the socket-outlet — and tests the equipment side, but with the same principle: continuity verified by resistance measurement, not by buzzer or visual.',
  },
  {
    id: 9,
    question:
      'On an extension reel you measure earth continuity end-to-end as 0.42 Ω. The cable is 25 m. What does the IET CoP "soft / robust" rule say?',
    options: [
      'Fail — anything over a flat 0.1 Ω limit fails the test',
      'Pass — the calculated limit works out at about 2.1 Ω for a 25 m reel',
      'Pass automatically — extension reels are exempt from this rule',
      'Fail — extension reels over 10 m always fail earth continuity',
    ],
    correctAnswer: 1,
    explanation:
      'The IET CoP shorthand "0.1 Ω + 0.1 × (length beyond 5 m)" gives 2.1 Ω for a 25 m reel. The measured 0.42 Ω is comfortably within that. The rule of thumb exists because long leads inevitably contribute more resistance than short ones — a flat 0.1 Ω limit would fail compliant reels.',
  },
  {
    id: 10,
    question:
      'GS38 (HSE Guidance Note GS38) is sometimes cited alongside PAT testing. What does it actually require?',
    options: [
      'It sets the PAT testing intervals for different environments',
      'It is the British Standard for plug-top wiring and fusing',
      'It governs the insulation resistance pass / fail values',
      'It sets the safety requirements for test probes, leads and clips',
    ],
    correctAnswer: 3,
    explanation:
      "GS38 is HSE's guidance on safe test leads and probes. It applies to any instrument-lead set used in electrical testing — including the live test leads of a PAT tester used for substitute leakage / touch-current tests. Finger-barriers and limited probe-tip exposure are the headline requirements.",
  },
];

const PATTestingModule4Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Earth continuity testing (Class I) | PAT M4.1 | Elec-Mate',
    description:
      'IET Code of Practice 5th Ed Ch 15 + BS EN 61557-4: the three earth-continuity test currents (100 mA soft / 25 A hard / 1.5 × rated), acceptance of 0.1 Ω + cable resistance, lead-nulling, and when each method is the right choice.',
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
            eyebrow="Module 4 · Section 1"
            title="Earth continuity testing (Class I)"
            description="The first electrical test in the PAT sequence. Three methods, one acceptance rule, and the lead-resistance step that catches half the false fails."
            tone="yellow"
          />

          <TLDR
            points={[
              'Earth continuity applies only to Class I equipment — appliances that rely on a protective conductor for fault protection. Class II (double / reinforced insulated) appliances have no earth and the test does not apply.',
              'IET Code of Practice 5th Ed Ch 15 names three test-current options: low-current ≥100 mA (the "soft" test), high-current 25 A, and a current of 1.5 × the appliance rated current. The soft test is preferred for IT, audio, lab and any electronic kit; the hard tests are for robust appliances.',
              'Acceptance is 0.1 Ω + the resistance of the supply cable. The "0.1 Ω + 0.1 Ω per metre beyond 5 m" wording in IET CoP is the working shorthand. Long leads need the cable resistance added; short leads come close to a flat 0.1 Ω.',
              'Null the test leads first. Lead resistance is in series with the earth path and is on the same order as a real reading on a short flex. BS EN 61557-4 instruments include a zero function specifically for this.',
              'Connect the test probe to a clean, unpainted metal part of the equipment that is meant to be earthed (chassis, casing earth screw). Avoid heating-element terminals or live connections. The instrument injects current down the protective conductor and measures the resistance from plug earth pin to the test point.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the IET CoP earth-continuity acceptance rule and apply it to leads of any length and cross-section',
              'Choose between the 100 mA soft test, 25 A high-current test, and 1.5 × appliance current test based on the equipment construction',
              'Identify Class I vs Class II equipment by construction symbol and apply earth-continuity testing only where it is required',
              'Null the test leads correctly and record results that are not inflated by lead resistance',
              'Reference the correct standards (IET CoP, BS EN 61557-4, BS EN 61010, BS 7671 Reg 643.2.1) for the relevant aspect of the test',
              'Diagnose a high-resistance reading and remediate the most common causes (loose plug terminal, corroded bond, painted earth screw)',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What earth continuity actually verifies</ContentEyebrow>

          <ConceptBlock
            title="Earth continuity = the appliance side of the protective conductor"
            plainEnglish="The fixed installation provides a protective conductor as far as the socket-outlet earth pin. Earth continuity testing on a portable appliance verifies the conductor and bonding inside the appliance — from the plug earth pin, down the flex, into the appliance, and onto every exposed metal part that should be earthed."
            onSite="Picture the fault: a loose live wire inside the kettle touches the metal body. The body is now at 230 V. The protective conductor must take the fault current to earth and pull it down low enough that the upstream protective device (MCB, fuse, RCD) operates within the disconnection time. If the protective conductor in the appliance has a high-resistance joint, that whole sequence fails — the body stays live and the user gets the shock."
          >
            <p>
              IET Code of Practice 5th Edition (2020) Chapter 15 sets the requirement: every Class I
              appliance shall have its protective conductor continuity verified by measurement of
              resistance using a low-resistance ohmmeter or PAT tester complying with BS EN 61557-4.
              The instrument injects a known current down the earth path and measures the voltage
              drop, displaying the result in ohms.
            </p>
            <p>
              The duty parallels BS&nbsp;7671:2018+A4:2026 Reg&nbsp;643.2.1, which governs the fixed
              installation: continuity of every protective conductor by measurement of resistance.
              PAT picks up the same principle on the appliance side. Different acceptance value,
              same principle, same instrument category.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020) — Chapter 15"
            clause={
              <>
                For Class I equipment, the resistance of the protective conductor shall be measured
                between the earth pin of the plug (or other supply connection) and any accessible
                conductive part of the equipment that is required to be connected to earth. The
                resistance shall not exceed 0.1 Ω plus the resistance of the supply cable.
              </>
            }
            meaning="Two halves: 0.1 Ω covers joints, terminations and the appliance internal earth bond. The supply-cable contribution is added on top because a longer / smaller-csa cable inevitably contributes more resistance. A flat limit would fail compliant long leads and pass marginal short ones."
          />

          <ConceptBlock
            title="Class I vs Class II — and why the test only applies to one"
            plainEnglish="Class I appliances rely on a protective conductor for fault protection. Class II appliances rely on double or reinforced insulation — they have no protective conductor by design. Earth continuity testing is meaningful only for Class I."
          >
            <p>
              The construction-class symbol on the rating plate is the test-routing decision. The
              square-within-a-square symbol (▢) marks Class II; if you see it, do not connect an
              earth continuity test — the equipment is built to dispense with the protective
              conductor and an open-circuit reading is the correct outcome. Document &ldquo;Class II
              — earth continuity not applicable&rdquo; and move to insulation resistance / live-side
              leakage tests as appropriate.
            </p>
            <p>
              Class I equipment is the typical workshop, kitchen and office Class I cohort: kettles,
              toasters, desktop PCs, photocopiers, vacuum cleaners, power tools with a metal body,
              fan heaters with a metal casing. The plug has three pins, the flex has a green/yellow,
              and somewhere inside the appliance the green/yellow is bonded to every accessible
              metal part. The earth continuity test verifies that bond is intact end-to-end.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The three test currents — and when to use each</ContentEyebrow>

          <ConceptBlock
            title={'Method A — the low-current (≥100 mA) "soft" test'}
            plainEnglish="The instrument applies a small DC test current — typically 100 mA, sometimes 200 mA — and measures the resistance of the earth path. It is fast, gentle, and will not stress sensitive components. IET CoP names it as the preferred method for IT and electronic equipment."
            onSite="Most modern PAT testers default to the soft test. On the menu it is called &lsquo;low-current&rsquo;, &lsquo;no-trip&rsquo;, &lsquo;soft test&rsquo; or simply &lsquo;100 mA earth&rsquo;. Use it for: desktop PCs, monitors, printers, photocopiers, lab kit, audio equipment, anything with a switch-mode PSU."
          >
            <p>
              The soft test is the right tool when the equipment under test has internal components
              that could be damaged or stressed by a 25 A current flowing down the earth path.
              Modern IT equipment frequently bonds the chassis earth to PCB ground planes via EMC
              capacitors and filtering networks; a 25 A pulse can punch through those parts. The
              soft test avoids that risk while still confirming a real low-resistance earth
              connection.
            </p>
            <p>
              Acceptance is unchanged: ≤ 0.1 Ω + the resistance of the supply cable. The soft test
              produces the same numeric result as the hard test on a healthy appliance — what
              differs is the diagnostic confidence. A loose joint that carries 100 mA without arcing
              may still arc at 25 A, which is why the soft test is sometimes paired with a visual
              inspection or a load test for very critical kit. For ordinary office and IT use, the
              soft test alone is the IET CoP recommendation.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Method B — the high-current 25 A test"
            plainEnglish="The instrument applies a heavy 25 A AC current (or equivalent) for a short pulse. A loose joint that carries 100 mA without complaint will arc, weld momentarily, or show a sharply rising resistance under 25 A. The test is more revealing on robust equipment."
            onSite="Use for: industrial Class I tools, kettles, fan heaters, vacuum cleaners — appliances built around motors, heating elements, and metal chassis that can tolerate the test without damage. Do NOT use on IT, audio, lab or any electronics."
          >
            <p>
              The 25 A test is the historical PAT method and remains the IET CoP option for robust
              Class I equipment. It catches a class of fault that the soft test can miss: a partial
              connection that has enough surface area to carry 100 mA but breaks down under
              fault-level current. On a kettle, a loose earth ring terminal under the element clamp
              can read 0.08 Ω at 100 mA and fail catastrophically at 25 A — the high-current test
              flags the second case where the soft test passes the first.
            </p>
            <p>
              The 25 A is applied for a short period (typically 1–5 seconds depending on the tester)
              to limit thermal stress on the conductor under test. BS EN 61557-4 governs the
              instrument; testers that offer 25 A also typically offer the soft test as a menu
              option, so the right test is a button choice, not a separate instrument.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Method C — 1.5 × appliance rated current"
            plainEnglish="A middle option: instead of fixing on 100 mA or 25 A, the instrument applies a current scaled to 1.5 × the appliance's rated current. For a 10 A kettle that is 15 A. For a 2.5 A floor lamp that is 3.75 A. The current is realistic for the equipment and stresses the joint at a level it would actually see in service."
            onSite="A pragmatic option for medium-power Class I appliances where 25 A would be excessive but 100 mA may under-test. Used by some PAT tester models as a configurable test mode; less common as a default."
          >
            <p>
              IET CoP names this as the third valid current option. The argument is that an earth
              path which can carry 1.5× the appliance's rated current proves it can handle a
              realistic short-circuit fault while still being a measured, controlled test. It avoids
              both the under-testing risk of 100 mA on a heavy appliance and the over-stress risk of
              25 A on smaller equipment.
            </p>
            <p>
              In practice most testers default to either the soft test or 25 A and the 1.5× option
              is configured manually where appropriate. The acceptance criterion does not change —
              the same 0.1 Ω + cable-resistance rule applies regardless of which test current is
              used. The choice is about diagnostic confidence, not about the threshold.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice 5th Edition · Chapter 15 (test current options)"
            clause={
              <>
                The protective conductor continuity test shall be performed at one of the following
                test currents: a low-current of at least 100 mA; a current of 1.5 times the rated
                current of the equipment, up to a maximum of 25 A; or a high-current of 25 A. The
                choice of test current shall take account of the construction of the equipment and
                the risk of damage to internal components.
              </>
            }
            meaning="Three options, one acceptance rule. The choice is engineering judgement, not lottery — IT and electronics get the soft test; robust kit gets the harder tests. Most testers offer all three as menu selections."
          />

          {/* Earth continuity test setup diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Earth continuity test setup — PAT tester to Class I appliance
            </h4>
            <svg
              viewBox="0 0 820 400"
              className="w-full h-auto"
              role="img"
              aria-label="Earth continuity test setup. The PAT tester injects current down the earth pin of the plug, through the green/yellow flex conductor, into the appliance internal earth bond, and out via a probe clipped to a metal part of the chassis. The display reads resistance in ohms."
            >
              {/* PAT tester */}
              <rect
                x="40"
                y="60"
                width="220"
                height="190"
                rx="10"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="150"
                y="84"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                PAT TESTER
              </text>
              <text x="150" y="100" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                BS EN 61557-4 (low-Ω)
              </text>
              <rect
                x="70"
                y="118"
                width="160"
                height="50"
                rx="6"
                fill="rgba(0,0,0,0.4)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text
                x="150"
                y="140"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="14"
                fontWeight="bold"
              >
                0.08 Ω
              </text>
              <text x="150" y="158" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Earth continuity · 100 mA
              </text>
              {/* Tester sockets */}
              <rect
                x="68"
                y="190"
                width="80"
                height="40"
                rx="4"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <text
                x="108"
                y="206"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                MAINS OUT
              </text>
              <text x="108" y="220" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                (BS 1363)
              </text>
              <rect
                x="156"
                y="190"
                width="76"
                height="40"
                rx="4"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <text
                x="194"
                y="206"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                E PROBE
              </text>
              <text x="194" y="220" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                socket
              </text>

              {/* BS 1363 plug */}
              <rect
                x="310"
                y="178"
                width="86"
                height="68"
                rx="4"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1.5"
              />
              <text
                x="353"
                y="172"
                textAnchor="middle"
                fill="rgba(255,255,255,0.75)"
                fontSize="9.5"
                fontWeight="bold"
              >
                BS 1363 plug
              </text>
              <rect x="324" y="206" width="6" height="14" rx="1" fill="#EF4444" />
              <rect x="346" y="206" width="6" height="14" rx="1" fill="#3B82F6" />
              <rect x="368" y="200" width="6" height="22" rx="1" fill="#22C55E" />
              <text
                x="327"
                y="238"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                L
              </text>
              <text
                x="349"
                y="238"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="9"
                fontWeight="bold"
              >
                N
              </text>
              <text
                x="371"
                y="238"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                E
              </text>

              {/* Plug to MAINS OUT socket — clean horizontal route */}
              <line
                x1="148"
                y1="210"
                x2="310"
                y2="210"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.2"
                strokeDasharray="4,3"
              />

              {/* Flex with green/yellow earth highlighted */}
              <line x1="396" y1="200" x2="540" y2="160" stroke="#22C55E" strokeWidth="2.6" />
              <line
                x1="396"
                y1="210"
                x2="540"
                y2="172"
                stroke="rgba(255,255,255,0.30)"
                strokeWidth="1.2"
              />
              <line
                x1="396"
                y1="220"
                x2="540"
                y2="184"
                stroke="rgba(255,255,255,0.30)"
                strokeWidth="1.2"
              />
              <text
                x="468"
                y="195"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9.5"
                fontWeight="bold"
              >
                Green/yellow CPC inside flex
              </text>

              {/* Appliance */}
              <rect
                x="540"
                y="60"
                width="240"
                height="190"
                rx="10"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.6"
              />
              <text
                x="660"
                y="84"
                textAnchor="middle"
                fill="rgba(255,255,255,0.8)"
                fontSize="12"
                fontWeight="bold"
              >
                CLASS I APPLIANCE
              </text>
              <text x="660" y="100" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9.5">
                (metal chassis)
              </text>
              {/* Internal earth bond label well above the bond line */}
              <text
                x="610"
                y="135"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9.5"
                fontWeight="bold"
              >
                Internal earth bond
              </text>
              {/* Earth bond inside */}
              <line x1="540" y1="160" x2="600" y2="160" stroke="#22C55E" strokeWidth="2.6" />
              <circle cx="610" cy="160" r="5" fill="#22C55E" />
              <line x1="610" y1="160" x2="710" y2="200" stroke="#22C55E" strokeWidth="2" />

              {/* Probe clip on chassis */}
              <circle cx="710" cy="200" r="6.5" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1.2" />
              <text
                x="722"
                y="196"
                textAnchor="start"
                fill="#FBBF24"
                fontSize="9.5"
                fontWeight="bold"
              >
                Probe clip on
              </text>
              <text
                x="722"
                y="208"
                textAnchor="start"
                fill="#FBBF24"
                fontSize="9.5"
                fontWeight="bold"
              >
                clean metal
              </text>

              {/* Probe lead back to tester — routed through clear corridor below appliance/flex (y=270) */}
              <path
                d="M710,206 Q710,275 400,275 Q200,275 194,232"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2"
                strokeDasharray="6,3"
              />
              <text
                x="430"
                y="268"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                Probe return lead → E PROBE socket
              </text>

              {/* Caption — clear of all geometry */}
              <rect
                x="40"
                y="320"
                width="740"
                height="62"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.25)"
                strokeWidth="1"
              />
              <text x="410" y="340" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="10">
                Test current (100 mA · 1.5× rated · or 25 A) flows: earth pin → flex CPC → internal
              </text>
              <text x="410" y="354" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="10">
                bond → chassis → probe → tester.
              </text>
              <text
                x="410"
                y="372"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Acceptance: ≤ 0.1 Ω + R(supply cable). Null the leads first.
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

          <CommonMistake
            title="Treating the lead-resistance null as optional"
            whatHappens="Lead resistance is typically 30–80 mΩ. On a 1.5 m kettle lead with an acceptance of about 0.13 Ω, that level of un-nulled lead resistance turns a healthy 0.07 Ω earth bond into a 0.13 Ω reading that is right at the limit. On a borderline appliance it converts a pass into a fail (or vice versa)."
            doInstead="Null the test leads against a known short before every PAT session and after any lead is replaced. BS EN 61557-4 instruments include a zero / null function — use it. If the tester does not auto-null, measure lead resistance once at the start of the day and configure it as a subtraction value in the tester settings."
          />

          <SectionRule />

          <ContentEyebrow>
            The acceptance rule — what 0.1 Ω + R(cable) actually looks like
          </ContentEyebrow>

          <ConceptBlock
            title="Reading the rule properly — joint allowance + cable contribution"
            plainEnglish="IET CoP gives 0.1 Ω as the allowance for the joint and termination contribution: the earth pin in the plug, the cordgrip / strain relief, the appliance internal earth bond, and the chassis bonding screw. On top of that, you add the actual resistance of the supply flex, which depends on its length and cross-section."
          >
            <p>
              The 0.1 Ω part is fixed. The cable contribution scales with the flex. For a typical
              1.0 mm² flex at room temperature, conductor resistance is approximately 18 mΩ/m. A 1.5
              m kettle lead therefore adds about 27 mΩ; the total acceptance is around 0.13 Ω. For a
              1.25 mm² flex (≈14.5 mΩ/m) on a 3 m vacuum cleaner the cable contributes around 43 mΩ,
              giving acceptance around 0.14 Ω. For a 25 m extension reel on 1.5 mm² flex the cable
              alone contributes about 0.30 Ω, giving total acceptance around 0.40 Ω.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Lead (typical)</th>
                    <th className="text-center text-white/80 py-2">csa (mm²)</th>
                    <th className="text-center text-white/80 py-2">Length (m)</th>
                    <th className="text-center text-white/80 py-2">Cable R (Ω)</th>
                    <th className="text-center text-elec-yellow py-2">Acceptance (Ω)</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Kettle lead</td>
                    <td className="text-center">1.0</td>
                    <td className="text-center">1.5</td>
                    <td className="text-center">≈ 0.03</td>
                    <td className="text-center text-elec-yellow">≈ 0.13</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Office PC IEC C13</td>
                    <td className="text-center">0.75</td>
                    <td className="text-center">2.0</td>
                    <td className="text-center">≈ 0.05</td>
                    <td className="text-center text-elec-yellow">≈ 0.15</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Vacuum cleaner flex</td>
                    <td className="text-center">1.0</td>
                    <td className="text-center">5.0</td>
                    <td className="text-center">≈ 0.09</td>
                    <td className="text-center text-elec-yellow">≈ 0.19</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Extension reel</td>
                    <td className="text-center">1.5</td>
                    <td className="text-center">25</td>
                    <td className="text-center">≈ 0.30</td>
                    <td className="text-center text-elec-yellow">≈ 0.40</td>
                  </tr>
                  <tr>
                    <td className="py-2">Heavy industrial lead</td>
                    <td className="text-center">2.5</td>
                    <td className="text-center">15</td>
                    <td className="text-center">≈ 0.11</td>
                    <td className="text-center text-elec-yellow">≈ 0.21</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Modern PAT testers handle the calculation automatically once the flex csa and length
              are entered as part of the appliance record. The tester applies the rule, displays
              pass / fail against the calculated limit, and stores the result. The role of the
              tester is to enforce a per-appliance acceptance value, not a flat 1.0 Ω limit — that
              flat limit dates from older equipment and is not what IET CoP says.
            </p>
          </ConceptBlock>

          <Scenario
            title="A 25 m extension reel reads 0.42 Ω"
            situation="You are PAT testing a contractor extension reel at the start of a job. Cable: 25 m of 1.5 mm² flex. Reading at 100 mA: 0.42 Ω. The tester is calibrated and the leads are nulled."
            whatToDo={
              <>
                <span className="block">
                  Calculate acceptance: 0.1 Ω + (25 × 13 mΩ/m) ≈ 0.1 + 0.32 = 0.42 Ω.
                </span>
                <span className="block">
                  Reading sits right on the calculated limit. Investigate before recording. Inspect
                  the plug terminals (earth pin and the cordgrip earth tail), the reel's slip ring
                  or terminal block, and the socket-end earth contacts.
                </span>
                <span className="block">
                  If a single termination is loose or a contact is corroded, tightening / cleaning
                  may drop the reading by 0.05–0.10 Ω. Re-test and record. If everything is sound
                  and the reading is still on the limit, the reel is at its end-of-life threshold
                  and should be flagged for replacement.
                </span>
              </>
            }
            whyItMatters="Extension reels are the highest-resistance leads in any PAT cohort. Recording 0.42 Ω as a pass without investigation is technically within the rule but masks degradation that will cross the limit on the next test cycle. The CoP acceptance value is a diagnostic threshold, not a target."
          />

          <RegsCallout
            source="BS EN 61557-4:2007 — Electrical safety in low voltage distribution systems · Part 4: Equipment for testing protective conductor and bonding resistance"
            clause={
              <>
                The instrument shall be capable of measuring resistances in the range relevant to
                protective conductor continuity, with a test current of at least 200 mA at no-load
                voltage between 4 V and 24 V, and shall include provision for compensating the
                resistance of the test leads.
              </>
            }
            meaning="BS EN 61557-4 fixes the instrument category. Note the 200 mA reference — an instrument that can deliver 100 mA continuously and pulse 200 mA meets the part. The lead-compensation provision is a hard requirement, not a feature: it is why the null function exists."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Procedure on the bench</ContentEyebrow>

          <ConceptBlock
            title="The seven-step earth continuity test"
            plainEnglish="Same procedure for every Class I appliance. The test current option (soft / 1.5× / 25 A) changes; the workflow does not."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Visual / preliminary inspection first (covered in M3.1). A failure on visual stops
                the test sequence. Damaged flex, cracked plug, missing earth pin — fail and remove
                from service before any electrical test.
              </li>
              <li>
                Confirm appliance is Class I (rating plate, no Class II symbol). Class II → skip
                earth continuity; record &ldquo;N/A — Class II&rdquo;.
              </li>
              <li>
                Null the test leads. Short the test probes to each other (or to the supplied null
                lead) and press the zero button. Record the lead resistance value if your tester
                does not auto-null.
              </li>
              <li>
                Plug the appliance into the PAT tester's mains socket. Switch the appliance to its
                highest setting (where applicable) — for thermostatic kit (kettles, heaters) this
                ensures the test path includes the full internal circuit.
              </li>
              <li>
                Connect the earth probe / clip to a clean, unpainted, accessible metal part of the
                appliance that is required to be earthed: chassis screw, metal handle, body fixings.
                Avoid: heating element terminals, signal connectors, painted surfaces.
              </li>
              <li>
                Select the test current (soft 100 mA / 1.5× rated / 25 A) appropriate to the
                appliance. Run the test. Observe the reading; the tester compares it against the
                calculated acceptance (0.1 Ω + cable R) and shows pass / fail.
              </li>
              <li>
                Record the numeric result against the appliance ID. If fail or borderline,
                investigate the cause before retesting (loose terminal, corroded bond, painted earth
                screw); do not simply retest hoping for a different number.
              </li>
            </ol>
          </ConceptBlock>

          <CommonMistake
            title="Probing onto a painted or plated surface"
            whatHappens="Many appliance chassis have a painted or powder-coated outer surface, with the protective conductor bonded to a clean metal point underneath. A probe clipped onto the painted surface reads open-circuit (or wildly high) because the paint is an insulator. The appliance is fine; the test point is wrong."
            doInstead="Identify a designated earth-bonding point: typically a screw with a star washer biting through any coating, a clean metal bracket, a metal foot, an exposed mains-cord earth tag, or a port shielding plate. Where the chassis is painted, scrape a small area at the test point with a sharp tool to reach bare metal — only if the manufacturer permits and the cosmetic damage is acceptable. If neither, work backwards along the earth path to a designated test point."
          />

          <CommonMistake
            title="Using the high-current 25 A test on IT or audio equipment"
            whatHappens="EMC components in the appliance — small bypass capacitors between live conductors and earth, ferrite chokes, surge arresters — can punch through under 25 A. The earth path may then read low (because the punctured component is conducting permanently) but the equipment is damaged. Subsequent IR or leakage tests show abnormal results. The damage is invisible until the appliance is plugged in and the user gets a shock or the upstream RCD trips."
            doInstead="For any appliance with a switch-mode PSU, microelectronics, or sensitive signal grounding (PCs, monitors, copiers, lab kit, audio mixers, specialist medical equipment), use the soft 100 mA test as standard. The IET CoP recommendation is explicit. Reserve the 25 A test for robust Class I — kettles, heaters, motors, vacuums, hand tools."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where the test fits in the wider sequence</ContentEyebrow>

          <ConceptBlock
            title="Earth continuity → insulation resistance → leakage → functional check"
            plainEnglish="IET CoP Chapter 15 sets the test order for a reason. Earth continuity confirms the protective path is intact before any test that puts voltage on the appliance — IR tests or live leakage tests. If the protective conductor is broken, an IR test can leave the chassis at test voltage with no path to earth, which is unsafe."
            onSite="Most automatic PAT testers run the sequence in the right order automatically: earth continuity → IR → polarity → leakage → functional. The tester stops on the first fail and shows the failed test, so the operator knows where the problem sits."
          >
            <p>
              The dependency runs one way: earth continuity first, then everything else. A pass on
              earth continuity is the prerequisite for safely doing the IR test (M4.2) and the
              leakage / touch-current tests (M4.4). If earth continuity fails, the appliance is
              removed from service — there is no point running further tests on a defective
              protective path.
            </p>
            <p>
              The reading itself feeds nothing downstream — unlike R1+R2 in the fixed installation
              (which feeds Zs verification), the earth continuity reading on a portable appliance
              has no further downstream calculation. It is recorded against the appliance ID with a
              pass/fail annotation and a numeric value to two decimal places in ohms. Trend analysis
              over multiple test cycles is the secondary value: an appliance whose reading rises
              from 0.08 Ω to 0.11 Ω over three cycles is degrading, even if all three readings pass
              the calculated acceptance.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.2.1 (parent principle for the fixed installation)"
            clause={
              <>
                The continuity of every protective conductor of every circuit, and in the case of
                ring final circuits, every live conductor, shall be verified by a measurement of
                resistance.
              </>
            }
            meaning="The fixed-installation duty stops at the socket-outlet earth pin. PAT testing carries the same principle past the socket — but with acceptance values, test currents and instruments tuned to portable appliances rather than to circuit conductors. Both halves are needed for end-to-end protective-conductor integrity."
          />

          <SectionRule />

          <ContentEyebrow>Recording the result</ContentEyebrow>

          <ConceptBlock
            title="What goes on the appliance record"
            plainEnglish="A PAT pass for earth continuity carries three pieces of data: the test current used, the numeric reading in ohms (two decimal places), and the calculated acceptance value the reading was judged against. Most modern testers store all three automatically against the appliance ID."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Numeric result:</strong> e.g. &ldquo;0.08 Ω at 100 mA&rdquo;. Two decimal
                places, ohms. Not just &ldquo;Pass&rdquo;.
              </li>
              <li>
                <strong>Acceptance value:</strong> the calculated limit derived from cable length
                and csa (e.g. &ldquo;limit 0.13 Ω for 1.5 m × 1.0 mm² flex&rdquo;). The appliance
                record needs both the reading and what it was compared against.
              </li>
              <li>
                <strong>Test current option:</strong> 100 mA / 1.5× rated / 25 A. Same appliance
                tested at different currents on different cycles can give slightly different
                readings — recording the test option keeps the trend honest.
              </li>
              <li>
                <strong>Class I marker:</strong> implicit, but worth noting on the record. Class II
                appliances should have an explicit &ldquo;earth continuity N/A&rdquo; entry, not a
                blank field.
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
              'Earth continuity applies only to Class I — Class II appliances have no protective conductor by design and the test does not apply.',
              'Three test currents per IET CoP Chapter 15: 100 mA soft (preferred for IT and electronics), 25 A hard (robust appliances), 1.5 × rated current (configurable middle option).',
              'Acceptance is 0.1 Ω + the resistance of the supply cable — joint allowance plus cable contribution. The "0.1 Ω + 0.1 × metres beyond 5 m" wording is shorthand; the underlying rule scales with cable length and csa.',
              'Null the test leads first. Lead resistance (30–80 mΩ) is on the same order as a real reading on a short flex.',
              'BS EN 61557-4 governs the instrument; BS EN 61010 governs general test-equipment safety; HSG107 sets workplace testing principles; GS38 governs the test leads themselves.',
              'Connect the probe to a clean, unpainted, accessible metal part — a designated earth-bonding point. Painted or plated surfaces give false open-circuit readings.',
              'Earth continuity is the gate to the rest of the test sequence. A fail removes the appliance from service before IR or leakage tests are attempted.',
              'Record the reading numerically (two decimals), with the test current used and the calculated acceptance. Trend analysis catches slow degradation that pass/fail alone misses.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Why does the IET CoP not just set a flat 1.0 Ω limit for all PAT earth continuity?',
                answer:
                  'Because cable length and cross-section change the conductor contribution. A 25 m extension reel will always have more resistance than a 1.5 m kettle lead, so a flat limit either fails compliant long leads or passes marginal short ones. The 0.1 Ω + R(cable) rule scales the threshold with the actual hardware. The 1.0 Ω flat limit appears in older training material and very simple PAT testers — the IET CoP 5th Edition rule is the correct one.',
              },
              {
                question:
                  'My PAT tester only offers 100 mA — can I still test a kettle properly with it?',
                answer:
                  'Yes, with one caveat. The 100 mA soft test will confirm the earth path is electrically continuous and meets the acceptance threshold. For a robust appliance like a kettle, IET CoP allows the 25 A hard test as the more revealing option, but does not mandate it. A 100 mA pass on a kettle with a sound visual inspection and a pass on insulation resistance is acceptable. Where you have the option, 25 A on robust kit catches a class of fault the soft test can miss.',
              },
              {
                question:
                  'How often should I null my PAT tester leads — every appliance, every session?',
                answer:
                  'Every PAT session at minimum, and after any lead is replaced or moved. BS EN 61557-4 instruments typically retain the null value, so you do not need to re-null between every appliance — but a lead nudged or a probe swapped invalidates the stored value. A fresh null at the start of a day, after lunch, and after any lead change is good practice.',
              },
              {
                question: 'What does the IET CoP say about portable RCDs (PRCDs) for this test?',
                answer:
                  "A PRCD is itself a Class I or Class II piece of equipment depending on its construction, and is PAT-tested as such. In addition to the earth continuity, IR and leakage tests, IET CoP Ch 15 sets a separate functional test for the PRCD's tripping current and time. The earth continuity test on a Class I PRCD follows the same 0.1 Ω + R(cable) rule, applied to the lead from plug to the PRCD's outgoing socket.",
              },
              {
                question:
                  'My reading on a 5 m office printer flex is 0.07 Ω against an acceptance of 0.19 Ω. Is that suspiciously low?',
                answer:
                  'No — it is exactly what you expect on a healthy appliance. The 0.1 Ω + R(cable) acceptance is a maximum, not a target. A lower reading means the joints, terminations and internal bond have low resistance, which is the desired outcome. Suspicious low readings happen when there is a parallel earth path (rare on a portable appliance, but possible if the equipment chassis touches a bonded metal surface or another appliance during the test). Make sure the appliance is on an insulating surface during the test so the only earth path is via the flex.',
              },
              {
                question:
                  'How does BS EN 61010 differ from BS EN 61557 — and which one matters for PAT?',
                answer:
                  'BS EN 61010 is the safety standard for the test equipment itself (overvoltage category, insulation, mechanical safety). BS EN 61557 is the performance / accuracy standard for instruments used to test the protective measures of low-voltage installations and equipment. A compliant PAT tester meets both: 61010 for its own safety, and the appropriate part(s) of 61557 (Part 4 for low-Ω, Part 2 for insulation resistance) for the measurements it makes. When IET CoP says "an instrument complying with BS EN 61557-4", that is the reference for the measurement; 61010 is implicit because no compliant manufacturer ships a tester that fails 61010.',
              },
              {
                question: 'What does HSG107 say specifically about earth continuity testing?',
                answer:
                  "HSG107 (HSE's 'Maintaining portable electric equipment in low-risk environments') sets the framework: a combination of user checks, formal visual inspections, and combined inspection-and-testing, where the testing element follows IET CoP. HSG107 itself does not prescribe specific test currents or acceptance values — it points to the IET Code of Practice for the technical detail. The role of HSG107 is to set the broader risk-based approach to equipment maintenance under the Electricity at Work Regulations 1989; the IET CoP gives the test methods.",
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Earth continuity testing — PAT M4.1" questions={quizQuestions} />

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
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-4-section-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.2 Insulation resistance testing
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

export default PATTestingModule4Section1;
