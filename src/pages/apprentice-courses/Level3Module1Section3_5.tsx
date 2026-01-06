/**
 * Level 3 Module 1 Section 3.5 - Electrical Test Equipment Safety (GS38)
 *
 * Covers: GS38 requirements, CAT ratings, probe specifications, test equipment maintenance
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "GS38 Test Equipment Safety - Level 3 Module 1 Section 3.5";
const DESCRIPTION = "Understand HSE GS38 guidance on electrical test equipment safety, including probe requirements, CAT ratings, fused leads, and proper equipment selection.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the maximum recommended exposed probe tip length according to GS38?",
    options: [
      "2mm",
      "4mm",
      "6mm",
      "10mm"
    ],
    correctIndex: 1,
    explanation: "GS38 recommends a maximum 4mm exposed probe tip to minimise the risk of short circuits between adjacent conductors or contact with earthed metalwork. Longer tips increase arc flash risk. Shrouded probes with spring-loaded tips achieve this safely."
  },
  {
    id: "check-2",
    question: "What does CAT III rating mean on test equipment?",
    options: [
      "It can only be used 3 times",
      "It's suitable for testing at distribution level (sub-boards, fixed wiring)",
      "It has 3 ranges",
      "It costs 3 times more than basic equipment"
    ],
    correctIndex: 1,
    explanation: "CAT III (Category III) indicates the equipment is designed for distribution level - testing at sub-distribution boards, fixed wiring, and industrial equipment. CAT ratings relate to transient overvoltage withstand capability, not just steady-state voltage."
  },
  {
    id: "check-3",
    question: "Why should test leads be fused?",
    options: [
      "To improve accuracy",
      "To limit current and reduce arc flash/burn injury if a short circuit occurs",
      "To make them lighter",
      "Fused leads aren't actually required"
    ],
    correctIndex: 1,
    explanation: "Fused leads (typically 500mA or 1A) limit the current that can flow if the probes accidentally short circuit. Without fuses, a short at a high-capacity source could cause severe arc flash, burns, and injury. The fuse blows before damage occurs."
  },
  {
    id: "check-4",
    question: "Before using a voltage indicator, what check must you perform?",
    options: [
      "Check the battery level only",
      "Prove it's working on a known live source or proving unit",
      "Just switch it on",
      "Nothing, if it's recently calibrated"
    ],
    correctIndex: 1,
    explanation: "You must prove your voltage indicator works on a known live source or proving unit BEFORE testing the circuit, and AGAIN AFTER. This confirms it was functioning correctly throughout. A faulty tester showing '0V' on a live circuit could cost you your life."
  }
];

// ============================================
// QUIZ QUESTIONS (12 questions)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What does GS38 stand for?",
    options: [
      "General Standard 38",
      "Guidance Sheet 38 - Electrical test equipment for use by electricians",
      "Grade Specification 38",
      "Government Standard 38"
    ],
    correctAnswer: 1,
    explanation: "GS38 is 'Guidance Sheet 38' published by the Health and Safety Executive (HSE). It provides guidance on the selection and use of electrical test equipment to prevent injury. It's not law but represents accepted good practice."
  },
  {
    id: 2,
    question: "What CAT rating is required for testing at the origin of an installation (meter position)?",
    options: [
      "CAT I",
      "CAT II",
      "CAT III",
      "CAT IV"
    ],
    correctAnswer: 3,
    explanation: "CAT IV is required for testing at the origin/service entrance where connection to the utility supply occurs. This location has the highest transient overvoltage exposure. CAT IV equipment provides the greatest protection against voltage transients."
  },
  {
    id: 3,
    question: "What safety feature should test probes have to protect fingers?",
    options: [
      "Rubber coating",
      "Finger barriers/guards that prevent fingers sliding onto the probe tip",
      "Long handles",
      "Velcro straps"
    ],
    correctAnswer: 1,
    explanation: "Finger barriers or guards prevent fingers from accidentally sliding down onto the probe tip during use. When applying pressure to make contact, fingers can slip - barriers ensure they stop before reaching live metal. This is a key GS38 requirement."
  },
  {
    id: 4,
    question: "A multimeter's display shows 'OL' when testing a known live circuit. What does this indicate?",
    options: [
      "The circuit is definitely safe",
      "Overload - the value exceeds the selected range or there's a problem",
      "The battery is low",
      "The circuit is isolated"
    ],
    correctAnswer: 1,
    explanation: "OL (Over Limit/Overload) means the measurement exceeds the selected range. This could be a genuinely high voltage, or it could indicate a problem (wrong range, faulty meter). NEVER assume OL means safe - it requires investigation. This is why two-pole testers are preferred."
  },
  {
    id: 5,
    question: "Why are two-pole voltage indicators preferred over multimeters for proving dead?",
    options: [
      "They are cheaper",
      "They can't be set to the wrong range and provide unambiguous indication",
      "They are more accurate",
      "They work without batteries"
    ],
    correctAnswer: 1,
    explanation: "Two-pole voltage indicators have only one function - detecting voltage. They can't be accidentally set to resistance or current mode. They provide clear, unambiguous indication (lights/display/sounder) and are designed to fail safe. Multimeters are versatile but require careful range selection."
  },
  {
    id: 6,
    question: "What is the purpose of a proving unit?",
    options: [
      "To charge the voltage indicator",
      "To generate a known safe voltage to verify your tester is working",
      "To increase the range of the tester",
      "To calibrate the tester"
    ],
    correctAnswer: 1,
    explanation: "A proving unit generates a known voltage (typically 230V or 400V at very low current) to verify your voltage indicator is working correctly. You prove before testing, then again after. This confirms the tester was functional throughout - essential for trusting a 'dead' reading."
  },
  {
    id: 7,
    question: "Test leads are rated for 1000V but the fuses have blown. What should you do?",
    options: [
      "Use them anyway for lower voltages",
      "Replace the fuses with higher-rated ones",
      "Do not use - replace fuses with correct type or replace leads entirely",
      "Wrap the probes in tape"
    ],
    correctAnswer: 2,
    explanation: "Test leads with blown fuses must not be used. The fuses provide essential short-circuit protection. Replace with the correct fuse type and rating as specified by the manufacturer. Never substitute higher-rated fuses or bypass them."
  },
  {
    id: 8,
    question: "Which location would require CAT II rated equipment?",
    options: [
      "Testing at the main distribution board",
      "Testing appliances and socket outlets",
      "Testing at the meter position",
      "Testing 11kV switchgear"
    ],
    correctAnswer: 1,
    explanation: "CAT II is for appliance level testing - socket outlets, portable equipment, and receptacle points. It's the lowest industrial category. Higher categories (CAT III for distribution, CAT IV for origin) are required closer to the supply source."
  },
  {
    id: 9,
    question: "How often should test equipment be formally calibrated?",
    options: [
      "Never",
      "Every day before use",
      "Annually, or as recommended by the manufacturer",
      "Only when it gives wrong readings"
    ],
    correctAnswer: 2,
    explanation: "Test equipment should be formally calibrated annually or as per manufacturer's recommendations. This ensures accuracy is maintained. Between calibrations, daily visual checks and proving tests verify operational condition. Equipment that's been dropped or damaged needs immediate recalibration."
  },
  {
    id: 10,
    question: "What should you check during a visual inspection of test leads?",
    options: [
      "Just the colour",
      "Insulation integrity, probe tip condition, lead flexibility, plug condition, and strain relief",
      "Only whether they fit the meter",
      "The price sticker"
    ],
    correctAnswer: 1,
    explanation: "Visual inspection should check: insulation for cuts/damage/deterioration, probe tips for damage/corrosion, lead flexibility (stiff leads may have internal breaks), plug condition, and strain relief at connections. Damaged equipment must be replaced, not repaired."
  },
  {
    id: 11,
    question: "A 'volt stick' (non-contact voltage detector) indicates no voltage on a cable. Can you safely cut it?",
    options: [
      "Yes, volt sticks are completely reliable",
      "No - volt sticks are for indication only, not proving dead. Use a two-pole tester",
      "Yes, if you check twice",
      "Yes, if the cable is insulated"
    ],
    correctAnswer: 1,
    explanation: "Non-contact voltage detectors (volt sticks) are useful for initial indication but can be affected by shielded cables, low batteries, and other factors. They cannot prove dead. Always follow up with a contact-type voltage indicator to confirm before working."
  },
  {
    id: 12,
    question: "What minimum IP rating is generally recommended for test equipment used in industrial environments?",
    options: [
      "IP20",
      "IP54 or higher",
      "IP00",
      "IP rating doesn't matter"
    ],
    correctAnswer: 1,
    explanation: "IP54 or higher provides protection against dust ingress and water splashing from any direction. Industrial and construction environments expose equipment to dust, moisture, and rough handling. Inadequate IP rating risks equipment failure when you need it most."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I use my own test equipment or must it be company-provided?",
    answer: "Either is acceptable provided the equipment meets GS38 requirements and is properly maintained. If using personal equipment, you're responsible for ensuring it's suitable, maintained, and calibrated. Many companies require only company-provided equipment for liability reasons. Check your employer's policy."
  },
  {
    question: "How do I know if my probes meet GS38?",
    answer: "Check for: maximum 4mm exposed tip (or spring-loaded shrouded design), finger barriers, fused leads, appropriate CAT rating for your work, and robust construction. If the probes came with certified test equipment from a reputable manufacturer, they likely comply. When in doubt, purchase GS38-compliant replacement leads."
  },
  {
    question: "My voltage indicator sometimes gives erratic readings. What should I do?",
    answer: "Stop using it immediately. Erratic readings indicate a fault - internal damage, low battery, or probe problems. Replace batteries and re-test. If problems persist, the unit needs repair or replacement. Never use equipment that behaves unpredictably - your life may depend on its accuracy."
  },
  {
    question: "What's the difference between CAT III 600V and CAT III 1000V?",
    answer: "Both are CAT III (distribution level), but the voltage rating indicates the maximum working voltage. CAT III 600V is for systems up to 600V. CAT III 1000V provides additional margin and is suitable for 230/400V systems with better transient protection. For UK work on 230/400V systems, CAT III 600V or higher is typically adequate."
  },
  {
    question: "Do I need separate equipment for testing and measurement?",
    answer: "Not necessarily. A quality multifunction tester can perform both roles if properly rated. However, for proving dead, dedicated two-pole voltage indicators are preferred because they can't be set to the wrong mode. Many electricians carry both - a voltage indicator for safe isolation and a multifunction tester for formal tests."
  },
  {
    question: "Can damaged insulation on test leads be repaired with tape?",
    answer: "No. Damaged test leads should be replaced, not repaired. Tape can hide ongoing deterioration, may not restore full insulation integrity, and creates an unreliable repair. Test leads are safety-critical equipment - the cost of replacement is trivial compared to the risk of using compromised leads."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* ========================================
          STICKY HEADER
          ======================================== */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module1-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* ========================================
          MAIN ARTICLE CONTENT
          ======================================== */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* ----------------------------------------
            HEADER
            ---------------------------------------- */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            GS38 Test Equipment Safety
          </h1>
          <p className="text-white/80">
            Selecting and using electrical test equipment safely
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Probes:</strong> Max 4mm exposed tip, finger barriers, shrouded design</li>
              <li><strong>Leads:</strong> Fused (500mA typical), robust insulation, CAT rated</li>
              <li><strong>CAT ratings:</strong> II=appliances, III=distribution, IV=origin</li>
              <li><strong>Proving:</strong> Before AND after testing the circuit</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Check:</strong> CAT rating matches location, fuses intact, tips undamaged</li>
              <li><strong>Prove:</strong> Tester works before and after testing</li>
              <li><strong>Inspect:</strong> Daily visual checks, annual calibration</li>
              <li><strong>Replace:</strong> Damaged leads - never repair</li>
            </ul>
          </div>
        </div>

        {/* ----------------------------------------
            LEARNING OUTCOMES
            ---------------------------------------- */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand GS38 guidance and its requirements",
              "Select correct CAT-rated equipment for different locations",
              "Identify compliant probe and lead specifications",
              "Perform pre-use checks and proving procedures",
              "Maintain test equipment appropriately",
              "Recognise when equipment needs replacement"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ----------------------------------------
            CONTENT SECTION 01
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is GS38?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              GS38 is a Guidance Sheet published by the Health and Safety Executive (HSE). Its full title is "Electrical test equipment for use by electricians." While not legally binding, it represents industry best practice and failure to follow it could be considered evidence of negligence if an accident occurs.
            </p>
            <p>
              The guidance exists because inadequate test equipment has contributed to electrical accidents, including fatalities. A multimeter set to the wrong range, test leads with damaged insulation, or probes that slip and short-circuit have all caused serious injuries. GS38 addresses these risks.
            </p>

            <div className="my-6 p-4 rounded bg-white/5 border-l-2 border-elec-yellow">
              <p className="text-sm font-medium text-elec-yellow mb-2">GS38 Key Points</p>
              <ul className="text-sm text-white/90 space-y-1">
                <li>Test equipment must be suitable for the voltage and environment</li>
                <li>Test probes should have limited exposed metal (max 4mm recommended)</li>
                <li>Finger barriers must prevent accidental contact with probe tips</li>
                <li>Test leads should be fused and robustly insulated</li>
                <li>Equipment should be properly maintained and regularly inspected</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Legal Position:</strong> GS38 is guidance, not law. However, the Electricity at Work Regulations require suitable precautions for live work. Using equipment that doesn't meet GS38 could constitute failure to take suitable precautions.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ----------------------------------------
            CONTENT SECTION 02
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            CAT Ratings Explained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Category (CAT) ratings indicate where test equipment can safely be used in an electrical installation. They relate to transient overvoltage withstand capability - not just the steady-state voltage. Closer to the supply source, transient overvoltages are more severe, requiring higher CAT ratings.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">CAT IV - Origin</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Service entrance, meters</li>
                  <li>Primary overcurrent protection</li>
                  <li>Outside and service entrance lines</li>
                  <li>Highest transient exposure</li>
                </ul>
              </div>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">CAT III - Distribution</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Sub-distribution boards</li>
                  <li>Fixed wiring and junction boxes</li>
                  <li>Industrial equipment connections</li>
                  <li>Bus bars and feeders</li>
                </ul>
              </div>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">CAT II - Appliance Level</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Socket outlets</li>
                  <li>Portable equipment</li>
                  <li>Appliance testing</li>
                  <li>Receptacle outlets</li>
                </ul>
              </div>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">CAT I - Electronics</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Protected electronic equipment</li>
                  <li>Low-energy circuits</li>
                  <li>Signal level electronics</li>
                  <li>Not for mains electrical work</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Wrong CAT = Risk:</p>
              <p className="text-sm text-white/90">
                Using CAT II equipment at a distribution board (CAT III location) means the equipment may fail if a transient occurs. This could result in arc flash, equipment explosion, or electric shock. Always match or exceed the required CAT rating for the location.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Trade Tip:</strong> For general electrical work, CAT III 600V or CAT III 1000V equipment covers most situations. If you work at service entrances or with supplies from transformers, CAT IV may be required. When in doubt, use the higher category.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ----------------------------------------
            CONTENT SECTION 03
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Probe and Lead Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Test probes and leads are your physical interface with potentially lethal voltages. Their design features aren't aesthetic - each specification exists because inadequate equipment has caused injuries.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Probe Tips</p>
                <p className="text-sm text-white/90">
                  Maximum 4mm exposed metal recommended. Longer tips can accidentally bridge between terminals or contact adjacent earthed metalwork, causing short circuits and arc flash. Spring-loaded shrouded tips meet this requirement while still allowing firm contact.
                </p>
              </div>

              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Finger Barriers</p>
                <p className="text-sm text-white/90">
                  Physical barriers on probes prevent fingers from sliding onto the metal tip when applying pressure. When probing into tight spaces, you naturally grip closer to the tip - barriers ensure your fingers can't reach live metal even if they slip.
                </p>
              </div>

              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Fused Leads</p>
                <p className="text-sm text-white/90">
                  Leads should contain fuses (typically 500mA, maximum 1A high-rupturing capacity type) to limit fault current. If probes accidentally short-circuit across a high-capacity source, the fuse blows before severe arcing or burns occur. Check fuses are intact before use.
                </p>
              </div>

              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Lead Construction</p>
                <p className="text-sm text-white/90">
                  Leads should be robustly insulated, flexible, and have adequate current rating. Strain relief at plugs and probes prevents internal wire breakage. Outer insulation should be cut-resistant. Inspect regularly for damage - replace, don't repair.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Probes and leads wear out. Budget for replacement leads when purchasing equipment. Damaged leads are more dangerous than no leads at all because they give false confidence.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ----------------------------------------
            CONTENT SECTION 04
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Proving and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Test equipment is safety-critical. Regular proving, inspection, and maintenance ensure it's ready when you need it. A voltage indicator that fails during use could lead you to believe a live circuit is dead - with potentially fatal consequences.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Before Each Use</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Visual check of leads and probes</li>
                  <li>Check fuses are present and intact</li>
                  <li>Verify battery condition (if applicable)</li>
                  <li>Prove on known live source or proving unit</li>
                  <li>Check display/indicators are clear</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">After Testing Circuit</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Re-prove on known live source</li>
                  <li>This confirms tester was working throughout</li>
                  <li>If re-prove fails, do NOT trust earlier readings</li>
                  <li>Return to start of safe isolation sequence</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded bg-white/5 border-l-2 border-elec-yellow">
              <p className="text-sm font-medium text-elec-yellow mb-2">Calibration and Service</p>
              <p className="text-sm text-white/90">
                Test equipment should be calibrated annually or as recommended by the manufacturer. Calibration verifies accuracy against known standards. Between calibrations, the proving procedure verifies operational function - but proving doesn't guarantee accuracy. Keep calibration records.
              </p>
            </div>

            <div className="my-6 p-4 rounded bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Replace Immediately If:</p>
              <ul className="text-sm text-white/90 space-y-1">
                <li>Equipment is dropped or physically damaged</li>
                <li>Insulation is cut, cracked, or deteriorated</li>
                <li>Probe tips are damaged or corroded</li>
                <li>Leads are stiff (may have internal breaks)</li>
                <li>Display is unclear or erratic</li>
                <li>It fails proving checks</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Investment:</strong> Quality test equipment costs money but protects your life. Budget for annual calibration, replacement leads, and eventual replacement of the equipment itself. The cheapest test equipment often has the shortest safe lifespan.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* ----------------------------------------
            PRACTICAL GUIDANCE
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Your Test Equipment Kit Should Include</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Two-pole voltage indicator (GS38 compliant)</li>
                <li>Proving unit or access to known live source</li>
                <li>Spare leads (fused, GS38 compliant)</li>
                <li>Multifunction tester for formal testing (CAT III/IV rated)</li>
                <li>Non-contact voltage detector (for indication only)</li>
                <li>Spare batteries</li>
                <li>Spare fuses for test leads</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Daily Checks Routine</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Visual inspection of all equipment</li>
                <li>2. Check leads for damage, probes for wear</li>
                <li>3. Verify fuses present (leads and instrument)</li>
                <li>4. Check battery level if applicable</li>
                <li>5. Prove voltage indicator on proving unit</li>
                <li>6. Record any issues for resolution</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Not proving before and after</strong> - Tester may have failed</li>
                <li><strong>Using wrong CAT equipment</strong> - Inadequate transient protection</li>
                <li><strong>Ignoring damaged insulation</strong> - "It still works" isn't safe</li>
                <li><strong>Bypassing blown fuses</strong> - Removes essential protection</li>
                <li><strong>Using multimeter on wrong range</strong> - Could show 0V when live</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            FAQs
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* ----------------------------------------
            QUICK REFERENCE
            ---------------------------------------- */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - GS38</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">CAT Ratings</p>
                <ul className="space-y-0.5">
                  <li>CAT IV = Origin/meter</li>
                  <li>CAT III = Distribution boards</li>
                  <li>CAT II = Socket outlets/appliances</li>
                  <li>Always match or exceed location</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Probe Requirements</p>
                <ul className="space-y-0.5">
                  <li>Max 4mm exposed tip</li>
                  <li>Finger barriers</li>
                  <li>Fused leads (500mA typical)</li>
                  <li>Prove before AND after</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            QUIZ
            ---------------------------------------- */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* ----------------------------------------
            NAVIGATION
            ---------------------------------------- */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module1-section3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Earthing and Bonding
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module1-section3-6">
              Next: RCDs and Protection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section3_5;
