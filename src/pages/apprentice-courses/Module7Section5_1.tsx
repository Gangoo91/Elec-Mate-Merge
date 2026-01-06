import { ArrowLeft, Target, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module7Section5_1 = () => {
  useSEO(
    "Selection of Test Equipment for Basic Fault-Finding - Level 2 Module 7 Section 5.1",
    "Learn to select the correct test equipment for electrical fault-finding"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "Why is selecting the correct test equipment important?",
      options: ["It looks professional", "It prevents inaccurate results, wasted time, and safety risks", "It's required by law", "It saves money"],
      correctAnswer: 1,
      explanation: "Using the wrong instrument can give misleading results, waste time, and create safety hazards for the user."
    },
    {
      id: 2,
      question: "What does a continuity tester confirm?",
      options: ["Voltage levels", "Whether conductors are continuous and properly connected", "Insulation quality", "Earth fault impedance"],
      correctAnswer: 1,
      explanation: "Continuity testers check whether conductors are unbroken and properly connected, particularly important for ring final circuits."
    },
    {
      id: 3,
      question: "What type of tester measures insulation quality?",
      options: ["Continuity tester", "Insulation resistance tester", "Socket tester", "Voltage indicator"],
      correctAnswer: 1,
      explanation: "Insulation resistance testers measure the quality of insulation between conductors and earth, identifying potential breakdowns."
    },
    {
      id: 4,
      question: "What advantage does a multifunction tester offer?",
      options: ["It's cheaper", "It combines several essential tests in one instrument", "It's smaller", "It's more accurate"],
      correctAnswer: 1,
      explanation: "Multifunction testers (MFTs) combine several tests including insulation resistance, continuity, loop impedance, and RCD testing in one unit."
    },
    {
      id: 5,
      question: "Why can't socket testers replace proper calibrated testing?",
      options: ["They're too expensive", "They can only provide basic fault indication, not detailed measurements", "They're illegal to use", "They're too slow"],
      correctAnswer: 1,
      explanation: "Socket testers are useful for quick checks but cannot provide the detailed measurements required for proper fault diagnosis."
    },
    {
      id: 6,
      question: "What must always be checked before using a test instrument?",
      options: ["The colour", "The manufacturer's instructions and suitability for the job", "The price", "The weight"],
      correctAnswer: 1,
      explanation: "Always check manufacturer's instructions and confirm the instrument is suitable for the voltage and category of circuit under test."
    },
    {
      id: 7,
      question: "Which standard applies to installation test equipment?",
      options: ["BS 7671", "BS EN 61557", "BS 5839", "BS 6423"],
      correctAnswer: 1,
      explanation: "BS EN 61557 is the standard that applies to electrical safety in low voltage distribution systems - equipment for testing, measuring or monitoring."
    },
    {
      id: 8,
      question: "True or False: Using the wrong category-rated meter can create safety risks.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "True. Using a meter not designed for the voltage or category of circuit under test is a serious safety risk that could result in injury or death."
    },
    {
      id: 9,
      question: "In the real-world example, why did the plug-in tester fail to identify the lighting fault?",
      options: ["It was broken", "It could not detect a broken neutral conductor", "It was the wrong brand", "The batteries were flat"],
      correctAnswer: 1,
      explanation: "Plug-in testers have limited diagnostic capability and cannot detect all faults, such as broken neutral conductors in lighting circuits."
    },
    {
      id: 10,
      question: "What fault was identified once the correct RCD testing instrument was used in the second example?",
      options: ["Faulty RCD", "Insulation breakdown in a damp junction box", "Overloaded circuit", "Wrong cable type"],
      correctAnswer: 1,
      explanation: "Using the correct MFT with RCD testing capability revealed insulation breakdown in a damp junction box, something the old multimeter couldn't detect."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white p-0 text-sm sm:text-base" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7.5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg ">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 7.5.1
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Selection of Test Equipment for Basic Fault-Finding
          </h1>
          <p className="text-white text-sm sm:text-base">
            Learn to select the correct test equipment for electrical fault-finding
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 sm:mb-3">In 30 seconds</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Correct equipment prevents inaccurate results and safety risks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Continuity testers confirm conductor integrity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Insulation resistance testers assess insulation quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Socket testers are quick checks only — not a substitute</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> Suspected fault type and environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> Instrument rated for circuit category; complies with BS EN 61557</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> Results meet expected values; record outcomes</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-white mb-4">
            Effective fault finding begins with choosing the right tools. Electrical testing is not guesswork; it relies on instruments designed to provide reliable and safe measurements. Selecting the wrong piece of equipment can lead to inaccurate results, wasted time, and even danger for the user. For apprentices at Level 2, understanding the types of test equipment available and their correct use is essential to developing professional competence in diagnosing faults.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-white mb-3 sm:mb-4">By the end of this subsection, you should be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Explain why the correct selection of test equipment is essential</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Identify the main types of instruments used in basic fault finding</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Match each instrument to its role in the diagnostic process</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Content / Learning</h2>

          {/* Section 1 — Selecting the Right Instrument */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-elec-yellow ">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-elec-yellow text-elec-yellow mb-4 text-base">Selecting the Right Instrument</h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-white">
                    <p><strong>Match the instrument to the fault hypothesis:</strong> Different faults require different tests. Use continuity testers for suspected broken connections, insulation resistance testers for earth leakage or damp problems, loop impedance testers for protective device verification, and voltage indicators for proving dead or live.</p>
                    
                    <p><strong>Confirm compliance and safety:</strong> Equipment must comply with BS EN 61557 for installation testers. Check the measurement category (CAT II for outlets, CAT III for distribution boards, CAT IV for service entries) and voltage rating match your work environment. Inspect test leads for intact finger guards, probe shrouds, and internal fuses where applicable.</p>
                    
                    <p><strong>Calibration and confidence:</strong> Check the calibration label and date — expired calibration invalidates results. Perform a prove-test-prove sequence for voltage indicators or short-lead zero check for continuity testers before and after use. Ensure batteries are healthy for accurate readings.</p>
                    
                    <p><strong>Environment considerations:</strong> In damp, wet, or explosive atmospheres, choose instruments with appropriate IP ratings. Use non-trip loop testing modes for RCD-protected circuits to avoid nuisance tripping. Consider harmonics and electrical noise — use filtering modes if available on the instrument.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="select-right-instrument-check"
            question="Which standard applies to electrical installation test equipment?"
            options={["BS 7671", "BS EN 61557", "BS 5839", "IEC 60364"]}
            correctIndex={1}
            explanation="BS EN 61557 specifies the performance requirements for testing and measuring equipment used in low voltage electrical installations."
          />

          {/* Section 2 — Continuity and Polarity in Practice */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-green-500 ">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-4 text-base">Continuity and Polarity in Practice</h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-white">
                    <p><strong>Understanding low-ohm continuity measurement:</strong> Modern MFTs provide null/lead compensation to remove test lead resistance from readings. Always verify near-zero resistance (typically &lt;0.01Ω) on a direct short circuit before testing. This ensures accurate measurement of circuit resistance only. The test current is usually around 200mA, sufficient to detect poor connections but safe for most circuits.</p>
                    
                    <p><strong>Protective conductor continuity (r2) methodology:</strong> Test from the consumer unit earth terminal to each point requiring earthing protection. Record the highest reading as this represents the worst-case scenario for fault current flow. For socket circuits, measure to the furthest socket. For lighting circuits, test to each switch position and luminaire location.</p>
                    
                    <p><strong>Ring final circuit testing procedure:</strong> Use the figure-of-eight method to test r1, rn, and r2 values. First, measure end-to-end resistance of each conductor separately. Then cross-connect at the consumer unit and measure from each socket. The readings should be approximately equal, confirming both legs of the ring are intact and properly connected without shortcuts or interconnections.</p>
                    
                    <p><strong>Polarity verification requirements:</strong> Confirm live conductors terminate correctly at switch contacts and fuse/MCB terminals. In two-way switching, verify the permanent live feeds the common terminal. Check that Edison screw lampholders have the live connected to the centre contact. Use a two-pole voltage tester to prove circuits are de-energised before commencing continuity testing.</p>
                    
                    <p><strong>Common pitfalls and troubleshooting:</strong> Failing to null test leads gives false readings that can hide dangerous faults. Testing on live circuits damages instruments and creates safety risks. Poor connections due to paint, corrosion, or loose terminals at earth points can give misleading high resistance readings. Always clean connection points and use proper pressure when making test connections.</p>
                    
                    <p><strong>Interpreting results and next steps:</strong> Continuity readings should typically be less than 1.67Ω for most domestic circuits (longer runs may be higher). High readings indicate poor connections, damaged conductors, or incorrect wiring. Open circuits suggest complete breaks requiring visual inspection and cable replacement or repair.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="continuity-null-check"
            question="Before measuring low-ohm continuity, what should you do?"
            options={["Set test to 1000 V DC", "Null/zero the test leads", "Short probes during the test to get a value", "Switch to loop mode"]}
            correctIndex={1}
            explanation="Nulling or zeroing the test leads removes their resistance from the measurement, ensuring readings reflect only the circuit under test."
          />

          {/* Section 3 — Insulation Resistance for Diagnosis */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-amber-500 ">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-600 dark:text-amber-400 mb-4 text-base">Insulation Resistance for Diagnosis</h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-white">
                    <p><strong>Understanding test voltage selection:</strong> Use 500 V DC for most low voltage circuits as specified in BS 7671. Apply 250 V DC where sensitive electronics are present (SELV/PELV systems, electronic ballasts, smart switches, or equipment at risk of damage). Use 1000 V DC for certain higher-rated equipment as per manufacturer guidance, typically motors and industrial equipment.</p>
                    
                    <p><strong>Comprehensive preparation requirements:</strong> Disconnect sensitive devices including electronic ballasts, LED drivers, dimmers, SPDs, and surge protection devices per manufacturer instructions. Remove fluorescent and LED lamps which can give false readings. Isolate neutrals from earth if testing individual subcircuits to avoid parallel paths affecting results.</p>
                    
                    <p><strong>Test sequence and methodology:</strong> Always test between live and earth, neutral and earth, and live and neutral. For three-phase systems, test all combinations. Start with the lowest test voltage and increase if needed. Apply the test voltage for the full duration (typically 60 seconds) to allow readings to stabilise, particularly in damp conditions.</p>
                    
                    <p><strong>Reading and interpreting results:</strong> Stable high readings (typically &gt;2MΩ for most circuits, &gt;1MΩ minimum for circuits not exceeding 500V) indicate good insulation. Trending lower values or readings that continue to fall suggest moisture ingress, contamination, trapped screws penetrating cables, or cable damage. Very low readings (&lt;0.5MΩ) indicate serious insulation failure requiring immediate attention.</p>
                    
                    <p><strong>Diagnostic techniques for fault location:</strong> If overall circuit readings are low, systematically isolate sections by disconnecting at distribution boards, junction boxes, or individual outlets. This helps pinpoint the location of insulation breakdown. Repeat testing after drying periods or component isolation to confirm problem sources and monitor improvement.</p>
                    
                    <p><strong>Safety requirements and discharge procedures:</strong> Never perform insulation resistance testing on live circuits — this can damage equipment, invalidate warranties, and create serious safety hazards. Always discharge capacitive circuits after each test using the instrument's discharge facility or appropriate discharge leads. Large capacitive loads can store dangerous charges for extended periods.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ir-250v-check"
            question="When is 250 V DC insulation testing appropriate?"
            options={["On RCD testing", "On circuits with sensitive electronics or SELV/PELV", "On earth fault loop testing", "When batteries are low"]}
            correctIndex={1}
            explanation="250 V DC testing reduces the risk of damaging sensitive electronic equipment or SELV/PELV circuits while still providing useful insulation resistance measurements."
          />

          {/* Section 4 — Earth Fault Loop and RCD Verification */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-purple-500 ">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-600 text-elec-yellow mb-4 text-base">Earth Fault Loop and RCD Verification</h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-white">
                    <p><strong>Understanding loop impedance (Zs) verification:</strong> This test confirms protective devices can achieve required disconnection times under earth fault conditions. The measurement combines the resistance of the supply (Ze), line conductor (R1), and protective conductor (R2). Compare measured Zs values to tabulated maximum values for the specific protective device type, rating, and required disconnection time (0.4s for socket circuits, 5s for fixed equipment).</p>
                    
                    <p><strong>Test methodology and accuracy:</strong> Ensure good probe contact at the test point — poor connections give falsely high readings. Allow readings to stabilise, particularly on long circuits or where supply impedance varies. Temperature affects conductor resistance, so consider ambient conditions when interpreting results. Some instruments provide temperature compensation features.</p>
                    
                    <p><strong>Non-trip testing on RCD circuits:</strong> Use no-trip or non-trip loop impedance modes on RCD-protected circuits to prevent nuisance tripping during testing. These modes typically use lower test currents or modified waveforms. Always verify the instrument is suitable for the specific RCD type being protected. Measure PSC (Prospective Short Circuit Current) or PEFC (Prospective Earth Fault Current) as required for protective device discrimination studies.</p>
                    
                    <p><strong>Comprehensive RCD testing with MFT:</strong> Select correct RCD type classification (Type AC for sine wave, Type A for pulsating DC, Type F for higher frequencies, Type B for smooth DC). Verify the rated residual current (IΔn) setting. Perform functional test using the test button, x1 trip test (should trip at rated current), x5 trip test (must trip within required time), and ramp test if available to determine actual trip current threshold.</p>
                    
                    <p><strong>Interpreting RCD test results:</strong> Trip times should be within BS EN 61008/61009 requirements: x1 test may not trip (acceptable), x5 test must trip within 300ms for general-purpose RCDs, 40ms for instantaneous types. Ramp tests should show trip currents between 50% and 100% of rated IΔn. Consistent results across multiple tests indicate healthy RCD operation.</p>
                    
                    <p><strong>Recording and limitations awareness:</strong> Document all results with instrument model, serial number, calibration status, and test conditions. Note test limitations such as parallel earth paths (which can give falsely low readings), high ambient temperatures affecting resistance values, supply voltage fluctuations during testing, or other factors that could affect measurements or protective device operation under real fault conditions.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="loop-nontrip-check"
            question="Which loop test mode should you use on RCD-protected circuits to avoid nuisance tripping?"
            options={["High-current mode", "No-trip/non-trip mode", "Insulation mode", "Continuity mode"]}
            correctIndex={1}
            explanation="No-trip or non-trip mode is specifically designed to measure earth fault loop impedance without generating enough current to trip the RCD."
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Practical Guidance</h2>
          
          <div className="space-y-6">
            {/* Before You Test */}
            <div className="rounded-lg p-4 bg-transparent border border-elec-yellow/20">
              <h3 className="font-semibold text-elec-yellow text-elec-yellow mb-3 text-sm sm:text-base">Before You Test</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">•</span>
                  <span>Apply LOTO (Lock Out Tag Out) procedures and identify the specific circuit to be tested</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">•</span>
                  <span>Select instruments with correct measurement category (CAT II/III/IV) and voltage rating</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">•</span>
                  <span>Check calibration certificates are current and within validity period</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">•</span>
                  <span>Visually inspect test leads, probes, and accessories for damage, worn insulation, or missing safety features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold">•</span>
                  <span>Verify instrument batteries are healthy and fuses (if fitted) are intact</span>
                </li>
              </ul>
            </div>

            {/* During Testing */}
            <div className="rounded-lg p-4 bg-transparent border border-green-500/20">
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3 text-sm sm:text-base">During Testing</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Perform prove-test-prove sequence for voltage indicators; null test leads for continuity measurements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Use correct measurement ranges and allow readings to stabilise before recording</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Maintain stable, secure probe contact — poor connections give false readings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Note environmental conditions: temperature, humidity, and electrical noise levels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Use non-trip loop modes on RCD-protected circuits where required</span>
                </li>
              </ul>
            </div>

            {/* After Testing */}
            <div className="rounded-lg p-4 bg-transparent border border-amber-500/20">
              <h3 className="font-semibold text-amber-600 dark:text-amber-400 mb-3 text-sm sm:text-base">After Testing</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Discharge any capacitive circuits using instrument discharge facility or appropriate leads</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Restore all connections, barriers, and protective devices to original condition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Remove lockout devices as per established safety procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Record results with instrument model, serial number, and test conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Document any limitations or special conditions affecting the measurements</span>
                </li>
              </ul>
            </div>

            {/* Do/Don't Quick Reference */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg p-3 bg-elec-yellow/5 border border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow text-elec-yellow mb-2 text-sm">✓ DO</h4>
                <ul className="space-y-1 text-xs text-white">
                  <li>• Check calibration before use</li>
                  <li>• Match instrument to circuit category</li>
                  <li>• Null continuity test leads</li>
                  <li>• Use prove-test-prove sequence</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 border border-red-500/20">
                <h4 className="font-semibold text-red-600 text-elec-yellow mb-2 text-sm">✗ DON'T</h4>
                <ul className="space-y-1 text-xs text-white">
                  <li>• Test live circuits with IR testers</li>
                  <li>• Use damaged test leads</li>
                  <li>• Ignore environmental conditions</li>
                  <li>• Skip discharge procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Real-World Examples</h2>
          
          <div className="space-y-6">
            {/* Lighting Circuit Fault - Expanded */}
            <div className="rounded-lg p-4 bg-transparent border border-elec-yellow/30">
              <h3 className="font-semibold text-elec-yellow text-elec-yellow mb-3 text-base">Case 1: Lighting Circuit Fault</h3>
              
              <div className="space-y-3 text-xs sm:text-sm text-white">
                <div>
                  <p className="font-medium text-elec-yellow text-elec-yellow mb-1">Situation:</p>
                  <p>Multiple lighting fittings on a ground floor circuit became inoperative after recent decorating work. The customer reported that "some lights work, others don't" and suspected damaged cables.</p>
                </div>
                
                <div>
                  <p className="font-medium text-red-600 text-elec-yellow mb-1">Wrong Approach:</p>
                  <p>An apprentice used a basic plug-in socket tester borrowed from a colleague. The device indicated "OK" when plugged into nearby sockets, leading to the incorrect assumption that the circuit wiring was sound. The lighting fault remained unresolved.</p>
                </div>
                
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400 mb-1">Correct Method:</p>
                  <p>A qualified electrician implemented safe isolation procedures and used an MFT for continuity testing. The rN (neutral) reading showed open-circuit between certain light fittings. Physical inspection revealed a loose neutral connection at a ceiling rose where decorators had disturbed the wiring.</p>
                </div>
                
                <div>
                  <p className="font-medium text-elec-yellow text-elec-yellow mb-1">Result:</p>
                  <p>The neutral connection was restored and secured. Follow-up testing verified polarity, insulation resistance, and earth fault loop impedance were all within acceptable limits. All lighting fittings were restored to operation and properly documented.</p>
                </div>
                
                <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded border border-yellow-300 dark:border-yellow-700">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Lesson Learned:</p>
                  <p className="text-yellow-700 dark:text-yellow-300">Socket testers cannot detect broken neutral conductors on lighting circuits. Proper continuity testing with an MFT is essential for diagnosing lighting circuit faults.</p>
                </div>
              </div>
            </div>

            {/* RCD Tripping Issue - Expanded */}
            <div className="rounded-lg p-4 bg-transparent border border-red-500/20">
              <h3 className="font-semibold text-red-600 text-elec-yellow mb-3 text-base">Case 2: RCD Tripping Issue</h3>
              
              <div className="space-y-3 text-xs sm:text-sm text-white">
                <div>
                  <p className="font-medium text-red-600 text-elec-yellow mb-1">Situation:</p>
                  <p>A domestic RCD protecting garden circuits tripped intermittently during damp weather conditions. The customer reported that the trips occurred mainly after rain and seemed to affect exterior lighting and a pond pump circuit.</p>
                </div>
                
                <div>
                  <p className="font-medium text-red-600 text-elec-yellow mb-1">Wrong Approach:</p>
                  <p>A contractor initially used an old digital multimeter to check voltages and resistances. The basic measurements appeared normal, and without RCD testing capability, the results were inconclusive. The RCD continued to trip randomly, leaving the customer frustrated.</p>
                </div>
                
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400 mb-1">Correct Method:</p>
                  <p>Using an MFT with RCD testing capability, the electrician performed x1 and x5 trip tests — both within specification. However, insulation resistance testing revealed low IR readings (0.8MΩ) between neutral and earth when the garden lighting spur was connected. Physical inspection located a damp junction box with a compromised cable grommet allowing water ingress.</p>
                </div>
                
                <div>
                  <p className="font-medium text-elec-yellow text-elec-yellow mb-1">Result:</p>
                  <p>The junction box was replaced with a higher IP-rated enclosure and proper cable glands fitted. Insulation resistance values returned to &gt;999MΩ, and no further RCD trips occurred during subsequent wet weather testing.</p>
                </div>
                
                <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded border border-red-300 dark:border-red-700">
                  <p className="font-medium text-red-800 dark:text-red-200 mb-1">Lesson Learned:</p>
                  <p className="text-red-700 text-elec-yellow">Use the correct instrument mode for each diagnostic requirement. Isolating subcircuits during testing helps pinpoint moisture-related insulation breakdown that standard multimeters cannot detect.</p>
                </div>
              </div>
            </div>

            {/* Loop Impedance Misread - Removed to keep only 2 cases */}
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="rounded-lg p-3 sm:p-4 bg-muted/50 border border-border/30">
              <p className="font-medium text-white mb-1 sm:mb-2 text-sm sm:text-base">Why is correct test equipment selection important?</p>
              <p className="text-xs sm:text-sm text-white">Because using the wrong instrument can give misleading results and create safety risks.</p>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-muted/50 border border-border/30">
              <p className="font-medium text-white mb-1 sm:mb-2 text-sm sm:text-base">What does a continuity tester measure?</p>
              <p className="text-xs sm:text-sm text-white">Whether conductors are continuous and properly connected.</p>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-muted/50 border border-border/30">
              <p className="font-medium text-white mb-1 sm:mb-2 text-sm sm:text-base">Why are multifunction testers widely used?</p>
              <p className="text-xs sm:text-sm text-white">They combine several essential tests into one instrument.</p>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-muted/50 border border-border/30">
              <p className="font-medium text-white mb-1 sm:mb-2 text-sm sm:text-base">Are plug-in socket testers reliable on their own?</p>
              <p className="text-xs sm:text-sm text-white">No. They are useful for quick checks but cannot replace proper calibrated testing.</p>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Recap</h2>
          <p className="text-sm sm:text-base text-white">
            The selection of test equipment is the foundation of safe and accurate fault diagnosis. Different instruments serve different purposes: continuity testers confirm conductor integrity, insulation testers measure insulation quality, loop impedance testers verify disconnection times, and multifunction testers combine these capabilities. Choosing the wrong equipment can waste time, delay repairs, or mask serious faults. Professional electricians always match the tool to the task and confirm it is safe and appropriate for use.
          </p>
        </Card>

        {/* Knowledge Check - Quiz */}
        <div className="mb-6 sm:mb-8">
          <Quiz questions={quizQuestions} title="Knowledge Check: Test Equipment Selection" />
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-muted/30 rounded-lg border border-white/10">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7.5
            </Link>
          </Button>
          
          <span className="text-xs sm:text-sm text-white text-center">
            Module 7 - Section 5.1
          </span>
          
          <Button variant="outline" disabled className="w-full sm:w-auto opacity-50">
            Next: Section 5.2
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section5_1;