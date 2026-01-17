import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Isolation Equipment and PPE - Inspection & Testing Module 2 Section 2";
const DESCRIPTION = "Master the selection and use of isolation equipment and personal protective equipment for safe electrical work. Learn about approved voltage indicators, proving units, and PPE requirements.";

const quickCheckQuestions = [
  {
    id: "proving-sequence",
    question: "Why must the proving sequence include testing the voltage indicator AFTER testing the circuit?",
    options: [
      "To save time on the next test",
      "To confirm the voltage indicator was functioning correctly throughout the testing process",
      "To drain the battery evenly",
      "It's only required for three-phase circuits"
    ],
    correctIndex: 1,
    explanation: "The second prove is crucial because an instrument fault could have developed during testing. Without this confirmation, a 'dead' reading might be due to instrument failure rather than the circuit actually being isolated."
  },
  {
    id: "gs38-tip-length",
    question: "What is the maximum recommended exposed probe tip length according to GS38 for general electrical testing?",
    options: [
      "2mm",
      "4mm",
      "6mm",
      "10mm"
    ],
    correctIndex: 1,
    explanation: "GS38 specifies 4mm maximum exposed tip to limit penetration depth into terminals, reducing the risk of short circuits or contact with adjacent conductors. 2mm is preferred for socket testing due to the close spacing of contacts."
  },
  {
    id: "insulating-gloves-test",
    question: "Why should insulating gloves be air-tested before each use?",
    options: [
      "To check they fit properly",
      "To warm them up for flexibility",
      "To check for holes, punctures or tears that would allow current to pass through",
      "To remove any dust inside"
    ],
    correctIndex: 2,
    explanation: "The air test is a quick field check that reveals holes too small to see visually. Any air leak indicates the glove is damaged and must not be used, as it could allow electric shock."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to GS38, what is the maximum recommended exposed probe tip length for general use?",
    options: ["2mm", "4mm", "6mm", "10mm"],
    correctAnswer: 1,
    explanation: "GS38 recommends a maximum of 4mm exposed probe tip for general use, with 2mm preferred for probing socket outlets. This limits penetration depth and reduces the risk of short circuits or contact with adjacent live conductors."
  },
  {
    id: 2,
    question: "What is the primary purpose of a proving unit?",
    options: ["To provide a power source for the voltage indicator", "To verify the voltage indicator is working correctly before and after testing", "To increase the range of the voltage indicator", "To provide earth reference for single-pole detectors"],
    correctAnswer: 1,
    explanation: "A proving unit generates a known voltage to verify that the voltage indicator is functioning correctly. This must be done immediately before AND after testing to confirm the instrument was working throughout the proving dead procedure."
  },
  {
    id: 3,
    question: "Which CAT rating is required for testing at a distribution board fed from the main supply?",
    options: ["CAT I", "CAT II", "CAT III", "CAT IV"],
    correctAnswer: 2,
    explanation: "CAT III is required for distribution-level testing including distribution boards, submains, and fixed wiring. CAT IV is for the origin (utility connection), CAT II for local level (socket outlets), and CAT I for protected electronics only."
  },
  {
    id: 4,
    question: "What is the minimum fuse rating typically required in GS38-compliant test leads?",
    options: ["100mA", "500mA", "1A", "3A"],
    correctAnswer: 1,
    explanation: "GS38 recommends fused test leads with a rating of 500mA or less to limit energy in the event of accidental short circuit or arc. This fuse blows quickly if the probes accidentally bridge live conductors, protecting against arc flash."
  },
  {
    id: 5,
    question: "Why should non-contact voltage detectors NOT be used as the sole method for proving dead?",
    options: ["They are too expensive", "They can give false negatives due to shielded cables or low voltage", "They are not accurate enough", "They require special training"],
    correctAnswer: 1,
    explanation: "Non-contact detectors can give false negatives due to: shielded/armoured cables, low voltage levels, poor earth reference, or instrument failure. They detect electric fields, not actual voltage, so metallic enclosures can block detection. Two-pole testing is required for proving dead."
  },
  {
    id: 6,
    question: "What does IP2X rating mean for a voltage indicator?",
    options: ["It can withstand 2 bar water pressure", "It is protected against finger contact with live parts", "It has 2-year warranty", "It operates on 2 batteries"],
    correctAnswer: 1,
    explanation: "IP2X indicates protection against solid objects larger than 12.5mm (finger-safe). For voltage indicators, this means the enclosure and probe design prevent finger contact with live parts during use. The X indicates no specific water protection rating is claimed."
  },
  {
    id: 7,
    question: "How should insulating gloves be tested before use?",
    options: ["By visual inspection only", "By electrical testing with a megger", "By air inflation and visual inspection for holes/damage", "By immersion in water"],
    correctAnswer: 2,
    explanation: "Before each use, insulating gloves should be air-tested by rolling from the cuff to trap air, then inspecting for air leaks, holes, tears, or signs of deterioration. Visual inspection should check for cuts, cracks, UV damage, chemical contamination, or swelling. Electrical testing is done periodically at approved test facilities."
  },
  {
    id: 8,
    question: "What colour coding indicates Class 00 insulating gloves rated for maximum 500V AC?",
    options: ["Red", "Black", "Yellow", "Beige/Natural"],
    correctAnswer: 3,
    explanation: "Insulating gloves use colour coding: Beige/Natural = Class 00 (500V AC max), Red = Class 0 (1000V AC max), White = Class 1 (7500V AC max), Yellow = Class 2 (17000V AC max). Most LV work uses Class 0 (red) or Class 00 (beige) gloves. Always check the voltage rating label."
  },
  {
    id: 9,
    question: "When selecting an MCB lock-off device, what must you verify?",
    options: ["It matches the colour of the distribution board", "It completely prevents the MCB from being switched ON", "It has a key rather than a combination", "It is made of metal for durability"],
    correctAnswer: 1,
    explanation: "The lock-off device must completely prevent the MCB from being operated (switched ON) when applied. Different MCB types (DIN rail, BS types, different manufacturers) need specific lockout devices. Always verify the lock physically prevents operation - test it after applying."
  },
  {
    id: 10,
    question: "According to best practice, when should a voltage indicator be proved with a proving unit?",
    options: ["Only before testing", "Only after testing", "Before AND after testing", "Once per day at the start of work"],
    correctAnswer: 2,
    explanation: "The proving sequence is: Prove the indicator works (proving unit), test the circuit (indicator), prove the indicator still works (proving unit). This confirms the instrument was working throughout the test. Testing only before doesn't prove it worked during the critical proving dead test."
  }
];

const faqs = [
  {
    question: "What is the difference between a voltage indicator and a multimeter?",
    answer: "A voltage indicator (or voltage detector) is specifically designed for presence/absence testing with clear LED/LCD indication and is typically more robust for site use. A multimeter provides numerical readings but requires more interpretation. GS38 recommends voltage indicators for proving dead as they're designed specifically for this safety-critical task, have fewer failure modes, and provide unambiguous indication. Multimeters have more functions that can introduce user error (wrong range selection, etc.)."
  },
  {
    question: "How often should proving units be replaced?",
    answer: "Proving units don't have a fixed replacement schedule but should be replaced when: battery is depleted (disposable types), they fail self-test, physical damage is evident, or according to manufacturer's recommendations. Rechargeable proving units should be maintained per manufacturer's instructions. Always verify the proving unit works correctly before and after each use, and never use a proving unit that shows any signs of damage or malfunction."
  },
  {
    question: "Why must test leads comply with GS38?",
    answer: "GS38-compliant test leads have specific safety features: fused leads (typically 500mA), shrouded probes with maximum 4mm exposed tip (2mm preferred for socket testing), finger guards, insulated throughout, and appropriate CAT rating. These features protect against arc flash if accidentally probing live conductors, prevent finger contact with live parts, and reduce the risk of short circuits. Non-compliant leads have caused serious injuries and fatalities."
  },
  {
    question: "What PPE is required for safe isolation procedures?",
    answer: "Minimum PPE for safe isolation typically includes: insulated gloves (tested to appropriate voltage class), safety glasses or face shield, non-conductive footwear, and flame-resistant clothing in some applications. The specific PPE depends on the voltage level, arc flash risk assessment, and company procedures. Some work may require arc flash suits with higher cal/cm² ratings. Always follow your employer's PPE policy and risk assessment."
  },
  {
    question: "Can I use any lock-off device for MCBs?",
    answer: "No - lock-off devices must be appropriate for the specific type of device being isolated. MCB lockouts differ from those for moulded case circuit breakers (MCCBs), isolators, and fuse carriers. Using incorrect lockout devices may allow the device to be operated despite the lock. Purpose-designed MCB lockouts grip the toggle securely and prevent operation. Always verify the lockout device completely prevents operation before leaving the work area."
  },
  {
    question: "How do I know if my voltage indicator needs calibration?",
    answer: "Most modern voltage indicators are self-checking and don't require regular calibration in the traditional sense. However, they should be: function-tested with a proving unit before and after use, visually inspected for damage, checked that batteries are adequate, and sent for manufacturer verification if there's any doubt about accuracy. Follow manufacturer's recommendations for service intervals. Some organisations require annual verification by a competent tester."
  },
  {
    question: "What is the CAT rating system for test equipment?",
    answer: "CAT (Category) ratings indicate where equipment can safely be used in the electrical system: CAT IV - Origin of installation (utility connection), CAT III - Distribution level (main panels, submains), CAT II - Local level (socket outlets, appliances), CAT I - Protected electronics. Higher CAT ratings mean equipment can withstand higher transient overvoltages. Using equipment below the required CAT rating risks equipment failure and user injury during voltage transients."
  },
  {
    question: "Why is two-pole testing preferred over single-pole?",
    answer: "Two-pole voltage indicators test between two points simultaneously, confirming both the voltage presence and the instrument's operation in one test. Single-pole/non-contact detectors can give false negatives due to: incorrect earth reference, induced voltages, capacitive effects, or instrument failure. GS38 recommends two-pole testing for proving dead. Non-contact detectors can supplement but should never replace two-pole testing for confirming dead."
  }
];

const InspectionTestingModule2Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Isolation Equipment and PPE
          </h1>
          <p className="text-white/80">
            Master the selection, inspection, and use of approved test equipment and personal protective equipment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Voltage indicators:</strong> Two-pole, GS38-compliant, proved before AND after testing</li>
              <li><strong>Test leads:</strong> 500mA fuses, shrouded probes (4mm max tip), correct CAT rating</li>
              <li><strong>PPE selection:</strong> Based on voltage level and arc flash risk</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Requirements</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>GS38:</strong> HSE guidance on test equipment</li>
              <li><strong>CAT III:</strong> Required for distribution board work</li>
              <li><strong>Prove-Test-Prove:</strong> Essential proving sequence</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select and verify appropriate voltage indicating devices",
              "Understand proving unit functionality and correct usage",
              "Identify and use appropriate PPE for electrical isolation",
              "Interpret GS38 requirements for test probes and leads",
              "Maintain and inspect test equipment to required standards",
              "Select appropriate lock-off devices for different scenarios"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Voltage Indicating Devices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Voltage Indicating Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Voltage indicating devices (VIDs) are the primary instruments used to confirm the presence or absence of hazardous voltages. For safe isolation work, <strong>two-pole testers</strong> are essential because they simultaneously verify instrument operation while testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Two-Pole Voltage Indicator Features</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Clear indication:</strong> LED and/or LCD display with voltage range shown</li>
                <li><strong>Self-test function:</strong> Automatic or push-button self-check on power-up</li>
                <li><strong>Phase rotation:</strong> Many indicate L1-L2-L3 sequence for 3-phase systems</li>
                <li><strong>Continuity test:</strong> Some models include audible continuity for CPC verification</li>
                <li><strong>Voltage ranges:</strong> Typically 12V to 690V AC/DC for LV applications</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-white font-semibold text-sm">GS38 Requirement</p>
              <p className="text-white/80 mt-1 text-sm">
                Always use a <strong>proving unit</strong> to verify your voltage indicator works correctly BEFORE and AFTER testing. A voltage indicator that shows "dead" could have a flat battery, damaged leads, or internal fault.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Types NOT Suitable for Proving Dead</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Non-contact detectors:</strong> Can miss shielded cables, low voltages, or through enclosures</li>
                <li><strong>Neon screwdrivers:</strong> Unreliable, no proving capability, not GS38 compliant</li>
                <li><strong>Test lamps:</strong> Risk of bulb failure, no fused leads, can mask low voltage</li>
                <li><strong>Single-pole indicators:</strong> Require earth reference, can give false readings</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Proving Units */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Proving Units
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A <strong>proving unit</strong> generates a known voltage output (typically 50V, 100V, and 230V AC or DC) that allows you to verify your voltage indicator is functioning correctly. This verification must be performed immediately before AND after testing a circuit.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Proving Sequence</p>
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold flex-shrink-0">1</span>
                  <div>
                    <p className="text-white font-semibold text-sm">PROVE</p>
                    <p className="text-white/70 text-xs">Test voltage indicator on proving unit (confirms it works)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold flex-shrink-0">2</span>
                  <div>
                    <p className="text-white font-semibold text-sm">TEST</p>
                    <p className="text-white/70 text-xs">Test the isolated circuit (should show dead)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold flex-shrink-0">3</span>
                  <div>
                    <p className="text-white font-semibold text-sm">PROVE</p>
                    <p className="text-white/70 text-xs">Test voltage indicator on proving unit again (confirms it still works)</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Why Both Proves?</strong> The second prove confirms the instrument was working correctly during the circuit test. If your indicator fails the second prove, you cannot trust the "dead" reading - a fault may have developed during testing.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">Battery Powered</p>
                <p className="text-white/70 text-xs">Self-contained, disposable when depleted. Compact for site use.</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">Rechargeable</p>
                <p className="text-white/70 text-xs">USB/mains charging. More economical long-term.</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">Built-In Self Test</p>
                <p className="text-white/70 text-xs">Some indicators have integrated proving. Useful backup.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: GS38 Test Lead Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            GS38 Test Lead Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              HSE Guidance Note GS38 specifies essential safety requirements for electrical test equipment. Non-compliant test leads have contributed to serious injuries and fatalities. All test probes and leads must meet these criteria:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">GS38 Probe Requirements</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Shrouded probes:</strong> Probes must have insulated barriers preventing finger contact</li>
                <li><strong>Exposed tip:</strong> Maximum 4mm for general use, 2mm recommended for socket testing</li>
                <li><strong>Finger guards:</strong> Physical barrier preventing fingers sliding onto probe tip</li>
                <li><strong>Fused leads:</strong> Maximum 500mA fuse rating to limit arc energy</li>
                <li><strong>CAT rated:</strong> Appropriate category for the installation type being tested</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CAT Rating Categories</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded bg-red-500/10">
                  <span className="w-12 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">IV</span>
                  <div>
                    <p className="text-white/90 text-sm font-medium">Origin of Installation</p>
                    <p className="text-white/60 text-xs">Utility connection, main incoming, service heads</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-orange-500/10">
                  <span className="w-12 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">III</span>
                  <div>
                    <p className="text-white/90 text-sm font-medium">Distribution Level</p>
                    <p className="text-white/60 text-xs">Main panels, submains, distribution boards, fixed wiring</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-yellow-500/10">
                  <span className="w-12 h-6 bg-yellow-500 rounded flex items-center justify-center text-black text-xs font-bold">II</span>
                  <div>
                    <p className="text-white/90 text-sm font-medium">Local Level</p>
                    <p className="text-white/60 text-xs">Socket outlets, portable equipment, appliances</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-green-500/10">
                  <span className="w-12 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">I</span>
                  <div>
                    <p className="text-white/90 text-sm font-medium">Protected Level</p>
                    <p className="text-white/60 text-xs">Signal level electronics, protected circuits only</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-white font-semibold text-sm">CAT Rating Safety</p>
              <p className="text-white/80 mt-1 text-sm">
                Using equipment rated below the required CAT level can result in equipment failure during transient overvoltages, potentially causing arc flash injury. <strong>Always use CAT III or CAT IV for distribution board work.</strong>
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Personal Protective Equipment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Personal Protective Equipment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PPE for electrical work provides a last line of defence against arc flash, electric shock, and other hazards. The specific PPE required depends on the voltage level, prospective fault current, and arc flash risk assessment for the task.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insulating Gloves</p>
              <p className="text-sm text-white/80 mb-3">
                Rubber insulating gloves are classified by maximum working voltage. For LV work (up to 1000V AC), Class 0 or Class 00 gloves are typically used.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded bg-[#e8d4b8]/20 text-center">
                  <div className="w-8 h-8 rounded-full bg-[#e8d4b8] mx-auto mb-1"></div>
                  <p className="text-white/90 text-xs font-medium">Class 00 - Beige</p>
                  <p className="text-white/60 text-xs">500V AC max</p>
                </div>
                <div className="p-3 rounded bg-red-500/20 text-center">
                  <div className="w-8 h-8 rounded-full bg-red-500 mx-auto mb-1"></div>
                  <p className="text-white/90 text-xs font-medium">Class 0 - Red</p>
                  <p className="text-white/60 text-xs">1000V AC max</p>
                </div>
              </div>
              <div className="mt-3 p-3 rounded bg-white/5">
                <p className="text-white/90 font-medium text-sm mb-2">Before Each Use:</p>
                <ul className="space-y-1 text-white/70 text-xs">
                  <li>Air test - roll from cuff to trap air, check for leaks</li>
                  <li>Visual inspection - cuts, cracks, UV damage, contamination</li>
                  <li>Check test date - must be within test validity period</li>
                  <li>Verify voltage rating is appropriate for task</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Eye and Face Protection</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Safety glasses:</strong> Minimum requirement - protect against debris and minor arc</li>
                <li><strong>Safety goggles:</strong> Better seal, protect against molten metal splash</li>
                <li><strong>Face shield:</strong> Required for higher arc flash risk, protects full face</li>
                <li><strong>Arc-rated balaclava:</strong> For highest risk work, protects neck and ears</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Other Essential PPE</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Non-conductive footwear:</strong> Insulated soles rated for electrical work</li>
                <li><strong>Flame-resistant clothing:</strong> FR coveralls or shirt/trousers for arc flash protection</li>
                <li><strong>Safety helmet:</strong> Class E rated for electrical work when head protection needed</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Lock-Off Devices */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Lock-Off Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lock-off devices physically prevent isolated equipment from being re-energised. Different types of equipment require specific lockout devices to ensure they cannot be operated when applied.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Lock-Off Devices</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow font-medium mb-1">MCB Lockouts</p>
                  <p className="text-white/70 text-sm">Clip onto miniature circuit breakers to prevent toggle operation. Must match MCB type (DIN rail, BS 3871, etc.).</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow font-medium mb-1">MCCB/ACB Lockouts</p>
                  <p className="text-white/70 text-sm">Larger devices for moulded case and air circuit breakers. Often fit around the operating handle.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow font-medium mb-1">Isolator Lockouts</p>
                  <p className="text-white/70 text-sm">For rotary isolators and switch-disconnectors. Trap the handle in the OFF position.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow font-medium mb-1">Fuse Carrier Blanks</p>
                  <p className="text-white/70 text-sm">Replace removed fuse carriers in fuse boards. Prevent incorrect fuse reinsertion.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow font-medium mb-1">Plug Lockouts</p>
                  <p className="text-white/70 text-sm">Enclose plug ends preventing reinsertion into sockets. Useful for portable equipment isolation.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lock-Off Requirements</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Physical prevention:</strong> Must completely prevent operation when applied</li>
                <li><strong>Unique padlock:</strong> Each worker applies their personal padlock</li>
                <li><strong>Multi-hasp:</strong> Allows multiple padlocks when multiple people working</li>
                <li><strong>Verification:</strong> Always test the lockout prevents operation after applying</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Always Verify:</strong> After applying any lock-off device, attempt to operate the switch/breaker to confirm it is truly locked off. Some lockout devices can appear to be fitted but not actually prevent operation.
            </p>
          </div>
        </section>

        {/* Section 6: Equipment Inspection and Maintenance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Equipment Inspection and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regular inspection and maintenance of test equipment and PPE is essential for safety. Faulty equipment has contributed to many electrical accidents.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Before Each Use (Daily Check)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Visual inspection of test leads for damage, cuts, exposed conductors</li>
                <li>Check probe tips are secure and not damaged</li>
                <li>Verify fuses are present in fused leads (visual indicator)</li>
                <li>Battery check on voltage indicators</li>
                <li>Air test insulating gloves</li>
                <li>Proving unit function test</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Periodic Maintenance</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded bg-white/5">
                  <span className="w-10 h-6 bg-elec-yellow/20 rounded flex items-center justify-center text-elec-yellow text-xs font-bold">6M</span>
                  <div>
                    <p className="text-white/90 text-sm font-medium">Insulating Gloves</p>
                    <p className="text-white/60 text-xs">Dielectric test every 6 months at approved facility</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-white/5">
                  <span className="w-10 h-6 bg-elec-yellow/20 rounded flex items-center justify-center text-elec-yellow text-xs font-bold">12M</span>
                  <div>
                    <p className="text-white/90 text-sm font-medium">Voltage Indicators</p>
                    <p className="text-white/60 text-xs">Manufacturer verification/calibration annually (where recommended)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-white/5">
                  <span className="w-10 h-6 bg-elec-yellow/20 rounded flex items-center justify-center text-elec-yellow text-xs font-bold">RPL</span>
                  <div>
                    <p className="text-white/90 text-sm font-medium">Test Leads</p>
                    <p className="text-white/60 text-xs">Replace when damaged or showing wear - no repair</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-white font-semibold text-sm">Remove from Service</p>
              <p className="text-white/80 mt-1 text-sm">
                Any equipment showing damage, failing tests, or of uncertain history must be removed from service immediately. Do not attempt repairs on safety-critical equipment - replace leads, return instruments to manufacturer.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Top Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Keep a complete isolation kit together - indicator, proving unit, lock-off devices, padlock, warning labels</li>
                <li>Write your name on your padlock and keep the only key</li>
                <li>Store insulating gloves in their bag away from UV light and sharp objects</li>
                <li>Replace test leads as a set - mixing old and new leads can cause issues</li>
                <li>Record proving unit battery replacement dates</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using non-contact detectors alone</strong> - always use two-pole tester</li>
                <li><strong>Skipping the second prove</strong> - critical for confirming instrument worked during test</li>
                <li><strong>Using damaged equipment "just this once"</strong> - never compromise on safety</li>
                <li><strong>Borrowing someone else's padlock</strong> - defeats the purpose of LOTO</li>
                <li><strong>Using lockout devices that don't properly fit</strong> - verify they prevent operation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Regulations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>GS38:</strong> Electrical test equipment for use on low voltage systems</li>
                <li><strong>HSG85:</strong> Electricity at Work - Safe working practices</li>
                <li><strong>EAW Reg 4(4):</strong> Equipment must be suitable for intended use</li>
                <li><strong>BS EN 61243-3:</strong> Voltage detectors specification</li>
                <li><strong>BS EN 60903:</strong> Specification for insulating gloves</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard
            title="Isolation Equipment Quick Reference"
            items={[
              { label: "Voltage Indicator", value: "Two-pole, GS38 compliant, proved before AND after" },
              { label: "Proving Unit", value: "50V/100V/230V output to verify indicator function" },
              { label: "Test Lead Fuse", value: "500mA max to limit arc flash energy" },
              { label: "Probe Tip Length", value: "4mm max general, 2mm for sockets" },
              { label: "CAT III", value: "Required rating for distribution board work" },
              { label: "Class 0 Gloves", value: "1000V AC maximum, red colour, 6-month test" },
              { label: "Lock-Off Device", value: "Must physically prevent operation, unique padlock" },
            ]}
          />
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-2/section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-2/section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule2Section2;
