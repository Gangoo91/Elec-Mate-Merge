/**
 * Level 3 Module 5 Section 6.1 - Dealing with Unexpected Results
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Dealing with Unexpected Results - Level 3 Module 5 Section 6.1";
const DESCRIPTION = "Learn systematic procedures for handling unexpected test results, identifying causes, and determining appropriate next steps when readings don't match expectations.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "When you get an unexpected test result, what should be your first action?",
    options: [
      "Record it and move on",
      "Repeat the test to verify it's not a measurement error",
      "Assume the instrument is faulty",
      "Ignore it if close to the limit"
    ],
    correctIndex: 1,
    explanation: "Before assuming there's a fault, repeat the test to confirm the reading. Many unexpected results are due to poor connections, incorrect test lead placement, or instrument settings. Verifying eliminates measurement errors first."
  },
  {
    id: "check-2",
    question: "An insulation resistance reading is 0.8 megohms on a 230V circuit. What does this indicate?",
    options: [
      "Acceptable - close enough to 1 megohm",
      "The circuit fails the minimum requirement of 1.0 megohms and requires investigation",
      "Normal for old wiring",
      "Only a problem if below 0.5 megohms"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Table 6.1 requires minimum 1.0 megohms for circuits up to 500V. A reading of 0.8 megohms fails this requirement. The cause must be identified and rectified before the circuit can be certified as compliant."
  },
  {
    id: "check-3",
    question: "Zs on a socket circuit is higher than expected from calculations. What might cause this?",
    options: [
      "The circuit is perfect",
      "Loose connections, damaged cable, or longer cable run than design specified",
      "The RCD is faulty",
      "The meter is broken"
    ],
    correctIndex: 1,
    explanation: "Higher than expected Zs indicates additional resistance in the fault path. Common causes include loose connections (adding resistance), damaged conductors, cable runs longer than specified, or incorrect cable size installed."
  },
  {
    id: "check-4",
    question: "What should you do if you can't explain an unexpected result after investigation?",
    options: [
      "Just record it and certify anyway",
      "Seek assistance from a more experienced person or the equipment manufacturer",
      "Assume the circuit is fine",
      "Leave it for the client to sort out"
    ],
    correctIndex: 1,
    explanation: "If you can't identify the cause after systematic investigation, seek help. This might be from a senior electrician, the equipment manufacturer, or technical helplines. Never certify work you don't understand or can't verify as safe."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A continuity test shows 0 ohms. What does this most likely indicate?",
    options: [
      "Perfect continuity",
      "A short circuit or the leads are touching",
      "The circuit is open",
      "Normal for CPC testing"
    ],
    correctAnswer: 1,
    explanation: "A reading of exactly 0 ohms usually indicates a short circuit or that the test leads are touching each other. Even excellent connections have some resistance. Check lead null, test setup, and look for actual short circuits."
  },
  {
    id: 2,
    question: "During insulation resistance testing, the reading slowly rises. What causes this?",
    options: [
      "Faulty insulation",
      "Dielectric absorption (capacitive effect) - normal for some cable types",
      "The battery is low",
      "Incorrect test voltage"
    ],
    correctAnswer: 1,
    explanation: "Slowly rising readings are often due to dielectric absorption, where the insulation acts like a capacitor. This is normal, especially for longer cable runs. Wait for the reading to stabilize before recording, or note the value at a set time (e.g., 1 minute)."
  },
  {
    id: 3,
    question: "An RCD trips immediately when attempting loop impedance testing. What should you do?",
    options: [
      "Bypass the RCD",
      "Use a low-current or no-trip loop tester",
      "Assume the RCD is faulty",
      "Record that testing wasn't possible"
    ],
    correctAnswer: 1,
    explanation: "Standard loop testers inject current that can trip 30mA RCDs. Use a no-trip or low-current loop tester designed for RCD-protected circuits. Alternatively, calculate Zs from Ze + R1+R2 measurements taken with the circuit isolated."
  },
  {
    id: 4,
    question: "The measured Ze is significantly higher than the DNO declared value. What might this indicate?",
    options: [
      "The DNO value is wrong",
      "A problem with the supply, meter tails, or main earth connection",
      "Normal variation",
      "Your instrument needs calibration"
    ],
    correctAnswer: 1,
    explanation: "While some variation is normal, significantly higher Ze suggests issues: loose connections at the cutout, damaged meter tails, corroded main earth connection, or supply issues. Investigate before assuming the higher value for calculations."
  },
  {
    id: 5,
    question: "Polarity tests show reversed polarity at a socket outlet. What's the most likely cause?",
    options: [
      "Supply polarity is reversed",
      "Wiring error at the socket or junction box",
      "The tester is faulty",
      "Normal for some socket types"
    ],
    correctAnswer: 1,
    explanation: "Reversed polarity at one outlet while others are correct indicates a local wiring error. Check the socket connections and any junction boxes or spurs feeding it. The line and neutral have been swapped somewhere in the circuit."
  },
  {
    id: 6,
    question: "Ring circuit continuity test shows r1 and rn are equal, but r2 is twice the expected value. What does this suggest?",
    options: [
      "The ring is complete and correct",
      "A possible break in the CPC ring while L and N are intact",
      "Normal for ring circuits",
      "The cable is oversized"
    ],
    correctAnswer: 1,
    explanation: "If r1 and rn match expected values but r2 is double, the CPC may be broken somewhere, causing the reading to represent a radial run rather than half a ring. Investigate CPC connections throughout the ring."
  },
  {
    id: 7,
    question: "Insulation resistance is low on one circuit but acceptable on all others. Where should you focus investigation?",
    options: [
      "The consumer unit",
      "The specific circuit showing the low reading - disconnect sections to locate",
      "The main earthing",
      "All circuits equally"
    ],
    correctAnswer: 1,
    explanation: "When one circuit shows low IR while others are fine, the problem is specific to that circuit. Systematically disconnect accessories and cable sections to locate where the insulation breakdown occurs - it may be a single faulty accessory."
  },
  {
    id: 8,
    question: "A circuit breaker trips immediately upon energisation but all dead tests passed. What should you check?",
    options: [
      "The circuit breaker is faulty",
      "Connected load for faults, or for issues not apparent in dead testing",
      "Dead tests were done incorrectly",
      "The supply voltage"
    ],
    correctAnswer: 1,
    explanation: "If dead tests passed but the circuit trips on energisation, look at the connected load. A faulty appliance, lamp, or equipment might be causing an overload or fault. Also check for any issue that only manifests under load, like an intermittent fault."
  },
  {
    id: 9,
    question: "Test results vary significantly when repeated. What does this typically indicate?",
    options: [
      "Normal measurement variation",
      "Loose connections or intermittent fault in the circuit",
      "The test instrument is broken",
      "Environmental conditions"
    ],
    correctAnswer: 1,
    explanation: "Consistent variation in readings suggests an intermittent connection or fault. Loose terminals, damaged cable, or corroded joints can make and break contact, causing variable readings. Investigate connections in the varying circuit."
  },
  {
    id: 10,
    question: "The prospective fault current (Ipf) is higher than the MCB's breaking capacity. What must happen?",
    options: [
      "It's fine if only slightly higher",
      "The protective device must be upgraded or the fault level reduced",
      "Ignore it for domestic installations",
      "Document it and proceed"
    ],
    correctAnswer: 1,
    explanation: "If Ipf exceeds the device's rated breaking capacity (Icn or Ics), the device may not safely interrupt a fault. Either upgrade to a device with adequate breaking capacity, or introduce additional impedance (though this affects protection times)."
  },
  {
    id: 11,
    question: "An unexpected result shows Zs within limits but functional testing shows the MCB doesn't trip. What does this suggest?",
    options: [
      "Zs test is wrong",
      "The MCB mechanism may be faulty despite Zs being acceptable",
      "No action needed if Zs is OK",
      "Normal for older MCBs"
    ],
    correctAnswer: 1,
    explanation: "Zs being within limits means fault current should be sufficient, but if the MCB doesn't trip during functional testing, the mechanism may be faulty. The MCB should be replaced - it cannot be relied upon for protection."
  },
  {
    id: 12,
    question: "How should unexpected results be recorded on certification?",
    options: [
      "Only record passing values",
      "Record actual values found, note the issue, and document rectification",
      "Round to nearest acceptable value",
      "Use 'LIM' for all problem values"
    ],
    correctAnswer: 1,
    explanation: "Record actual measured values honestly. If values failed initially, note this. Document any rectification performed and the retest results. This provides a complete audit trail and demonstrates thorough investigation."
  }
];

const faqs = [
  {
    question: "How much variation is normal in repeated test readings?",
    answer: "Small variations (few percent) are normal due to instrument tolerance and connection resistance. Larger variations or constantly changing readings suggest intermittent connections or faults. If in doubt, investigate rather than average the results."
  },
  {
    question: "Should I stop testing when I find an unexpected result?",
    answer: "Not necessarily. Record the unexpected result, note the circuit, and continue testing other circuits. After completing the systematic testing, return to investigate unexpected results. This is efficient and helps identify whether issues are isolated or widespread."
  },
  {
    question: "What if the client pressures me to certify despite unexplained results?",
    answer: "Never certify work you cannot verify as safe and compliant. Explain the issue to the client, document your findings, and refuse to sign until resolved. Your signature carries legal responsibility - no amount of client pressure justifies fraudulent certification."
  },
  {
    question: "Can environmental conditions affect test results?",
    answer: "Yes. Temperature affects resistance (higher temperature = higher resistance). Humidity can affect insulation resistance readings. Very cold conditions can affect battery performance. Note unusual conditions and their potential effect on results."
  },
  {
    question: "What if my test instrument might be at fault?",
    answer: "If you suspect instrument issues, prove the instrument on a known reference before and after testing. Most quality instruments include self-check functions. If in doubt, use an alternative calibrated instrument to verify readings."
  },
  {
    question: "How do I handle unexpected results on existing installations during periodic inspection?",
    answer: "Record the actual values found. If they indicate deterioration from previous results or non-compliance, code appropriately (C2/C3). Recommend appropriate action. You're reporting condition, not certifying new work - honest reporting is essential."
  }
];

const Level3Module5Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>First:</strong> Repeat the test to confirm</li>
              <li><strong>Check:</strong> Connections, leads, instrument settings</li>
              <li><strong>Investigate:</strong> Systematically isolate the cause</li>
              <li><strong>Document:</strong> Record findings and actions taken</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Values outside expected range</li>
              <li><strong>Use:</strong> Systematic elimination process</li>
              <li><strong>Apply:</strong> Don't certify until resolved</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: Initial Response */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Initial Response to Unexpected Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When a test result doesn't match expectations, resist the temptation to assume the worst immediately. Many unexpected readings have simple explanations related to the test setup rather than actual faults in the installation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">First steps when you get an unexpected result:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Stay calm:</strong> Unexpected results are common - they're diagnostic opportunities</li>
                <li><strong>Repeat the test:</strong> Verify it wasn't a momentary error or poor contact</li>
                <li><strong>Check connections:</strong> Test leads properly connected, clean contact points</li>
                <li><strong>Verify settings:</strong> Correct test function, range, and instrument settings</li>
                <li><strong>Consider the context:</strong> What else might affect this reading?</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Repeat</p>
                <p className="text-white/90 text-xs">Confirm the result</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Verify</p>
                <p className="text-white/90 text-xs">Check test setup</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Investigate</p>
                <p className="text-white/90 text-xs">If result persists</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A repeated unexpected result is information - it tells you something about the circuit that needs investigation. Never ignore or work around it.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Common Unexpected Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Common Unexpected Results and Causes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding common causes of unexpected results helps you quickly identify likely explanations and focus your investigation appropriately.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Low Insulation Resistance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Moisture in accessories or cable</li>
                  <li>Damaged cable insulation</li>
                  <li>Connected equipment (heaters with elements)</li>
                  <li>Contamination or dirt in enclosures</li>
                  <li>Aged/deteriorated wiring</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">High Loop Impedance (Zs)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Loose connections anywhere in circuit</li>
                  <li>Damaged or corroded conductors</li>
                  <li>Undersized cable installed</li>
                  <li>Longer cable run than designed</li>
                  <li>Multiple connections in series</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Other common unexpected results:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Zero continuity reading:</strong> Short circuit or leads touching</li>
                <li><strong>Very high/infinite continuity:</strong> Open circuit, broken conductor</li>
                <li><strong>RCD not tripping:</strong> Faulty RCD, incorrect test, wrong circuit</li>
                <li><strong>Reversed polarity:</strong> Wiring error at accessory or junction</li>
                <li><strong>Variable readings:</strong> Intermittent connection or loose terminal</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Tip:</strong> If one circuit shows unexpected results while similar circuits test normally, the problem is likely specific to that circuit - focus investigation there.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Systematic Investigation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Systematic Investigation Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When initial checks don't explain the unexpected result, systematic investigation isolates the cause. The key principle is elimination - progressively narrowing down where the issue lies.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Investigation approach:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Confirm the result:</strong> Repeat test, check instrument on known reference</li>
                <li><strong>2. Isolate sections:</strong> Disconnect parts of circuit, retest each</li>
                <li><strong>3. Check connections:</strong> Inspect all accessible terminations</li>
                <li><strong>4. Consider external factors:</strong> Connected equipment, environmental conditions</li>
                <li><strong>5. Compare similar circuits:</strong> Is this circuit different from others?</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">For Low Insulation Resistance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Disconnect all accessories</li>
                  <li>Test cable alone</li>
                  <li>Reconnect one at a time</li>
                  <li>Identify which causes drop</li>
                  <li>Inspect/replace faulty item</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">For High Loop Impedance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Measure at distribution board</li>
                  <li>Compare Ze + R1+R2 calculation</li>
                  <li>Check all terminations</li>
                  <li>Look for cable damage</li>
                  <li>Verify cable size matches design</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Document each step of your investigation. This creates an audit trail and helps if you need to explain your process or hand over to another electrician.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Knowing When to Seek Help */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Knowing When to Seek Help
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              There's no shame in seeking assistance when you can't explain a result. Complex installations, unusual equipment, and challenging faults sometimes require additional expertise. Recognizing when to ask for help is a sign of professionalism.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When to seek assistance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Systematic investigation hasn't identified the cause</li>
                <li>The result involves equipment you're unfamiliar with</li>
                <li>Safety concerns exist about further investigation</li>
                <li>Multiple unusual results suggest a complex issue</li>
                <li>You suspect instrument or supply problems</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Sources of Help</p>
                <p className="text-white/90 text-xs">Senior electricians, scheme helplines, manufacturers</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Never</p>
                <p className="text-white/90 text-xs">Certify what you don't understand</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Resources available:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Competent person scheme:</strong> Technical helplines for members</li>
                <li><strong>Equipment manufacturers:</strong> Technical support for their instruments</li>
                <li><strong>IET forums:</strong> Peer discussion and advice</li>
                <li><strong>Senior colleagues:</strong> Experienced practitioners</li>
                <li><strong>Specialist contractors:</strong> For unusual systems</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> When seeking help, provide full details: what you've measured, what you've tried, what you expected, what you found. The more information you provide, the better assistance you'll receive.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Investigation Mindset</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Treat unexpected results as information, not obstacles</li>
                <li>Be systematic - avoid random troubleshooting</li>
                <li>Document as you go - you may need to backtrack</li>
                <li>Consider the simple explanations first</li>
                <li>Don't assume - verify each step</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Prevention</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Prove test equipment before and after use</li>
                <li>Use quality leads with good connections</li>
                <li>Ensure circuit is properly isolated for testing</li>
                <li>Allow stabilisation time for insulation resistance</li>
                <li>Know expected values before testing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Critical Don'ts</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Don't ignore:</strong> Unexplained results must be resolved</li>
                <li><strong>Don't fabricate:</strong> Never record values you didn't measure</li>
                <li><strong>Don't certify:</strong> Unresolved issues cannot be signed off</li>
                <li><strong>Don't pressure:</strong> Take the time needed to investigate properly</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Investigation Steps</p>
                <ul className="space-y-0.5">
                  <li>1. Repeat and confirm result</li>
                  <li>2. Check test setup and connections</li>
                  <li>3. Isolate and section test</li>
                  <li>4. Inspect physically</li>
                  <li>5. Seek help if needed</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Limits to Remember</p>
                <ul className="space-y-0.5">
                  <li>Insulation resistance: 1.0 megohms min</li>
                  <li>Zs: Per Table 41.2-41.4</li>
                  <li>RCD 30mA: 300ms at 1x, 40ms at 5x</li>
                  <li>Ze typical: 0.35-0.8 ohms (TN-C-S)</li>
                </ul>
              </div>
            </div>
          </div>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section6-6-2">
              Next: Fault Investigation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section6_1;
