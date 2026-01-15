import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module7Section5_1 = () => {
  useSEO(
    "Selection of Test Equipment for Basic Fault-Finding - Level 2 Module 7 Section 5.1",
    "Learn to select the correct test equipment for electrical fault-finding"
  );

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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 5</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <Search className="w-4 h-4" />
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Selection of Test Equipment for Basic Fault-Finding
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
              Learn to select the correct test equipment for electrical fault-finding
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 space-y-1 text-sm">
              <li>• Correct equipment prevents inaccurate results and safety risks</li>
              <li>• Continuity testers confirm conductor integrity</li>
              <li>• Insulation resistance testers assess insulation quality</li>
              <li>• Socket testers are quick checks only — not a substitute for proper testing</li>
            </ul>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <p className="text-white/80 leading-relaxed">
              Effective fault finding begins with choosing the right tools. Electrical testing is not guesswork; it relies on instruments designed to provide reliable and safe measurements. Selecting the wrong piece of equipment can lead to inaccurate results, wasted time, and even danger for the user. For apprentices at Level 2, understanding the types of test equipment available and their correct use is essential to developing professional competence in diagnosing faults.
            </p>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <p className="text-white/80 mb-4">By the end of this subsection, you should be able to:</p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">✓</span>
                <span>Explain why the correct selection of test equipment is essential</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">✓</span>
                <span>Identify the main types of instruments used in basic fault finding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">✓</span>
                <span>Match each instrument to its role in the diagnostic process</span>
              </li>
            </ul>
          </section>

          {/* Section 1 — Selecting the Right Instrument */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Selecting the Right Instrument
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-4">
              <div className="space-y-4 text-sm text-white/80">
                <p><strong className="text-white">Match the instrument to the fault hypothesis:</strong> Different faults require different tests. Use continuity testers for suspected broken connections, insulation resistance testers for earth leakage or damp problems, loop impedance testers for protective device verification, and voltage indicators for proving dead or live.</p>

                <p><strong className="text-white">Confirm compliance and safety:</strong> Equipment must comply with BS EN 61557 for installation testers. Check the measurement category (CAT II for outlets, CAT III for distribution boards, CAT IV for service entries) and voltage rating match your work environment. Inspect test leads for intact finger guards, probe shrouds, and internal fuses where applicable.</p>

                <p><strong className="text-white">Calibration and confidence:</strong> Check the calibration label and date — expired calibration invalidates results. Perform a prove-test-prove sequence for voltage indicators or short-lead zero check for continuity testers before and after use. Ensure batteries are healthy for accurate readings.</p>

                <p><strong className="text-white">Environment considerations:</strong> In damp, wet, or explosive atmospheres, choose instruments with appropriate IP ratings. Use non-trip loop testing modes for RCD-protected circuits to avoid nuisance tripping. Consider harmonics and electrical noise — use filtering modes if available on the instrument.</p>
              </div>
            </div>

            <InlineCheck
              id="select-right-instrument-check"
              question="Which standard applies to electrical installation test equipment?"
              options={["BS 7671", "BS EN 61557", "BS 5839", "IEC 60364"]}
              correctIndex={1}
              explanation="BS EN 61557 specifies the performance requirements for testing and measuring equipment used in low voltage electrical installations."
            />
          </section>

          {/* Section 2 — Continuity and Polarity in Practice */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Continuity and Polarity in Practice
            </h2>
            <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50 mb-4">
              <div className="space-y-4 text-sm text-white/80">
                <p><strong className="text-white">Understanding low-ohm continuity measurement:</strong> Modern MFTs provide null/lead compensation to remove test lead resistance from readings. Always verify near-zero resistance (typically &lt;0.01Ω) on a direct short circuit before testing. This ensures accurate measurement of circuit resistance only. The test current is usually around 200mA, sufficient to detect poor connections but safe for most circuits.</p>

                <p><strong className="text-white">Protective conductor continuity (r2) methodology:</strong> Test from the consumer unit earth terminal to each point requiring earthing protection. Record the highest reading as this represents the worst-case scenario for fault current flow. For socket circuits, measure to the furthest socket. For lighting circuits, test to each switch position and luminaire location.</p>

                <p><strong className="text-white">Ring final circuit testing procedure:</strong> Use the figure-of-eight method to test r1, rn, and r2 values. First, measure end-to-end resistance of each conductor separately. Then cross-connect at the consumer unit and measure from each socket. The readings should be approximately equal, confirming both legs of the ring are intact and properly connected without shortcuts or interconnections.</p>

                <p><strong className="text-white">Polarity verification requirements:</strong> Confirm live conductors terminate correctly at switch contacts and fuse/MCB terminals. In two-way switching, verify the permanent live feeds the common terminal. Check that Edison screw lampholders have the live connected to the centre contact. Use a two-pole voltage tester to prove circuits are de-energised before commencing continuity testing.</p>

                <p><strong className="text-white">Common pitfalls and troubleshooting:</strong> Failing to null test leads gives false readings that can hide dangerous faults. Testing on live circuits damages instruments and creates safety risks. Poor connections due to paint, corrosion, or loose terminals at earth points can give misleading high resistance readings. Always clean connection points and use proper pressure when making test connections.</p>

                <p><strong className="text-white">Interpreting results and next steps:</strong> Continuity readings should typically be less than 1.67Ω for most domestic circuits (longer runs may be higher). High readings indicate poor connections, damaged conductors, or incorrect wiring. Open circuits suggest complete breaks requiring visual inspection and cable replacement or repair.</p>
              </div>
            </div>

            <InlineCheck
              id="continuity-null-check"
              question="Before measuring low-ohm continuity, what should you do?"
              options={["Set test to 1000 V DC", "Null/zero the test leads", "Short probes during the test to get a value", "Switch to loop mode"]}
              correctIndex={1}
              explanation="Nulling or zeroing the test leads removes their resistance from the measurement, ensuring readings reflect only the circuit under test."
            />
          </section>

          {/* Section 3 — Insulation Resistance for Diagnosis */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Insulation Resistance for Diagnosis
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50 mb-4">
              <div className="space-y-4 text-sm text-white/80">
                <p><strong className="text-white">Understanding test voltage selection:</strong> Use 500 V DC for most low voltage circuits as specified in BS 7671. Apply 250 V DC where sensitive electronics are present (SELV/PELV systems, electronic ballasts, smart switches, or equipment at risk of damage). Use 1000 V DC for certain higher-rated equipment as per manufacturer guidance, typically motors and industrial equipment.</p>

                <p><strong className="text-white">Comprehensive preparation requirements:</strong> Disconnect sensitive devices including electronic ballasts, LED drivers, dimmers, SPDs, and surge protection devices per manufacturer instructions. Remove fluorescent and LED lamps which can give false readings. Isolate neutrals from earth if testing individual subcircuits to avoid parallel paths affecting results.</p>

                <p><strong className="text-white">Test sequence and methodology:</strong> Always test between live and earth, neutral and earth, and live and neutral. For three-phase systems, test all combinations. Start with the lowest test voltage and increase if needed. Apply the test voltage for the full duration (typically 60 seconds) to allow readings to stabilise, particularly in damp conditions.</p>

                <p><strong className="text-white">Reading and interpreting results:</strong> Stable high readings (typically &gt;2MΩ for most circuits, &gt;1MΩ minimum for circuits not exceeding 500V) indicate good insulation. Trending lower values or readings that continue to fall suggest moisture ingress, contamination, trapped screws penetrating cables, or cable damage. Very low readings (&lt;0.5MΩ) indicate serious insulation failure requiring immediate attention.</p>

                <p><strong className="text-white">Diagnostic techniques for fault location:</strong> If overall circuit readings are low, systematically isolate sections by disconnecting at distribution boards, junction boxes, or individual outlets. This helps pinpoint the location of insulation breakdown. Repeat testing after drying periods or component isolation to confirm problem sources and monitor improvement.</p>

                <p><strong className="text-white">Safety requirements and discharge procedures:</strong> Never perform insulation resistance testing on live circuits — this can damage equipment, invalidate warranties, and create serious safety hazards. Always discharge capacitive circuits after each test using the instrument's discharge facility or appropriate discharge leads. Large capacitive loads can store dangerous charges for extended periods.</p>
              </div>
            </div>

            <InlineCheck
              id="ir-250v-check"
              question="When is 250 V DC insulation testing appropriate?"
              options={["On RCD testing", "On circuits with sensitive electronics or SELV/PELV", "On earth fault loop testing", "When batteries are low"]}
              correctIndex={1}
              explanation="250 V DC testing reduces the risk of damaging sensitive electronic equipment or SELV/PELV circuits while still providing useful insulation resistance measurements."
            />
          </section>

          {/* Section 4 — Earth Fault Loop and RCD Verification */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Earth Fault Loop and RCD Verification
            </h2>
            <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50 mb-4">
              <div className="space-y-4 text-sm text-white/80">
                <p><strong className="text-white">Understanding loop impedance (Zs) verification:</strong> This test confirms protective devices can achieve required disconnection times under earth fault conditions. The measurement combines the resistance of the supply (Ze), line conductor (R1), and protective conductor (R2). Compare measured Zs values to tabulated maximum values for the specific protective device type, rating, and required disconnection time (0.4s for socket circuits, 5s for fixed equipment).</p>

                <p><strong className="text-white">Test methodology and accuracy:</strong> Ensure good probe contact at the test point — poor connections give falsely high readings. Allow readings to stabilise, particularly on long circuits or where supply impedance varies. Temperature affects conductor resistance, so consider ambient conditions when interpreting results. Some instruments provide temperature compensation features.</p>

                <p><strong className="text-white">Non-trip testing on RCD circuits:</strong> Use no-trip or non-trip loop impedance modes on RCD-protected circuits to prevent nuisance tripping during testing. These modes typically use lower test currents or modified waveforms. Always verify the instrument is suitable for the specific RCD type being protected. Measure PSC (Prospective Short Circuit Current) or PEFC (Prospective Earth Fault Current) as required for protective device discrimination studies.</p>

                <p><strong className="text-white">Comprehensive RCD testing with MFT:</strong> Select correct RCD type classification (Type AC for sine wave, Type A for pulsating DC, Type F for higher frequencies, Type B for smooth DC). Verify the rated residual current (IΔn) setting. Perform functional test using the test button, x1 trip test (should trip at rated current), x5 trip test (must trip within required time), and ramp test if available to determine actual trip current threshold.</p>

                <p><strong className="text-white">Interpreting RCD test results:</strong> Trip times should be within BS EN 61008/61009 requirements: x1 test may not trip (acceptable), x5 test must trip within 300ms for general-purpose RCDs, 40ms for instantaneous types. Ramp tests should show trip currents between 50% and 100% of rated IΔn. Consistent results across multiple tests indicate healthy RCD operation.</p>

                <p><strong className="text-white">Recording and limitations awareness:</strong> Document all results with instrument model, serial number, calibration status, and test conditions. Note test limitations such as parallel earth paths (which can give falsely low readings), high ambient temperatures affecting resistance values, supply voltage fluctuations during testing, or other factors that could affect measurements or protective device operation under real fault conditions.</p>
              </div>
            </div>

            <InlineCheck
              id="loop-nontrip-check"
              question="Which loop test mode should you use on RCD-protected circuits to avoid nuisance tripping?"
              options={["High-current mode", "No-trip/non-trip mode", "Insulation mode", "Continuity mode"]}
              correctIndex={1}
              explanation="No-trip or non-trip mode is specifically designed to measure earth fault loop impedance without generating enough current to trip the RCD."
            />
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Practical Guidance
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-semibold text-elec-yellow mb-3">Before You Test</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Apply LOTO (Lock Out Tag Out) procedures and identify the specific circuit to be tested</li>
                  <li>• Select instruments with correct measurement category (CAT II/III/IV) and voltage rating</li>
                  <li>• Check calibration certificates are current and within validity period</li>
                  <li>• Visually inspect test leads, probes, and accessories for damage</li>
                  <li>• Verify instrument batteries are healthy and fuses (if fitted) are intact</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <h3 className="font-semibold text-green-400 mb-3">During Testing</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Perform prove-test-prove sequence for voltage indicators; null test leads for continuity</li>
                  <li>• Use correct measurement ranges and allow readings to stabilise before recording</li>
                  <li>• Maintain stable, secure probe contact — poor connections give false readings</li>
                  <li>• Note environmental conditions: temperature, humidity, and electrical noise levels</li>
                  <li>• Use non-trip loop modes on RCD-protected circuits where required</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
                <h3 className="font-semibold text-amber-400 mb-3">After Testing</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Discharge any capacitive circuits using instrument discharge facility</li>
                  <li>• Restore all connections, barriers, and protective devices to original condition</li>
                  <li>• Remove lockout devices as per established safety procedures</li>
                  <li>• Record results with instrument model, serial number, and test conditions</li>
                  <li>• Document any limitations or special conditions affecting the measurements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Real-World Examples
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-semibold text-elec-yellow mb-3">Case 1: Lighting Circuit Fault</h3>
                <div className="space-y-3 text-sm text-white/80">
                  <p><strong className="text-white">Situation:</strong> Multiple lighting fittings on a ground floor circuit became inoperative after recent decorating work. The customer reported that "some lights work, others don't".</p>
                  <p><strong className="text-red-400">Wrong Approach:</strong> An apprentice used a basic plug-in socket tester. The device indicated "OK" when plugged into nearby sockets, but this couldn't detect the lighting fault.</p>
                  <p><strong className="text-green-400">Correct Method:</strong> A qualified electrician implemented safe isolation and used an MFT for continuity testing. The rN reading showed open-circuit between certain light fittings. Physical inspection revealed a loose neutral connection at a ceiling rose.</p>
                  <p><strong className="text-elec-yellow">Lesson:</strong> Socket testers cannot detect broken neutral conductors on lighting circuits. Proper continuity testing with an MFT is essential.</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
                <h3 className="font-semibold text-red-400 mb-3">Case 2: RCD Tripping Issue</h3>
                <div className="space-y-3 text-sm text-white/80">
                  <p><strong className="text-white">Situation:</strong> A domestic RCD protecting garden circuits tripped intermittently during damp weather conditions.</p>
                  <p><strong className="text-red-400">Wrong Approach:</strong> A contractor used an old digital multimeter to check voltages. Without RCD testing capability, the results were inconclusive.</p>
                  <p><strong className="text-green-400">Correct Method:</strong> Using an MFT with RCD testing capability, insulation resistance testing revealed low IR readings when the garden lighting spur was connected. A damp junction box with compromised cable grommet was located.</p>
                  <p><strong className="text-elec-yellow">Lesson:</strong> Use the correct instrument mode for each diagnostic requirement. Isolating subcircuits helps pinpoint moisture-related insulation breakdown.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-card/30 border border-white/10">
                <p className="font-medium text-white mb-2">Why is correct test equipment selection important?</p>
                <p className="text-sm text-white/70">Because using the wrong instrument can give misleading results and create safety risks.</p>
              </div>
              <div className="p-4 rounded-lg bg-card/30 border border-white/10">
                <p className="font-medium text-white mb-2">What does a continuity tester measure?</p>
                <p className="text-sm text-white/70">Whether conductors are continuous and properly connected.</p>
              </div>
              <div className="p-4 rounded-lg bg-card/30 border border-white/10">
                <p className="font-medium text-white mb-2">Why are multifunction testers widely used?</p>
                <p className="text-sm text-white/70">They combine several essential tests into one instrument.</p>
              </div>
              <div className="p-4 rounded-lg bg-card/30 border border-white/10">
                <p className="font-medium text-white mb-2">Are plug-in socket testers reliable on their own?</p>
                <p className="text-sm text-white/70">No. They are useful for quick checks but cannot replace proper calibrated testing.</p>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/80 leading-relaxed">
                The selection of test equipment is the foundation of safe and accurate fault diagnosis. Different instruments serve different purposes: continuity testers confirm conductor integrity, insulation testers measure insulation quality, loop impedance testers verify disconnection times, and multifunction testers combine these capabilities. Choosing the wrong equipment can waste time, delay repairs, or mask serious faults. Professional electricians always match the tool to the task and confirm it is safe and appropriate for use.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} title="Knowledge Check: Test Equipment Selection" />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section 5
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-2">
                Next: Checking Instruments
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section5_1;
