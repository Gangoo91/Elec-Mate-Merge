import { ArrowLeft, ArrowRight, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safety Considerations During Troubleshooting - Instrumentation Course";
const DESCRIPTION = "Learn essential safety practices for instrumentation troubleshooting including live circuit testing, lockout/tagout procedures, arc flash hazards, and PPE requirements.";

const quickCheckQuestions = [
  {
    question: "What should you always do before testing a circuit?",
    options: [
      "Start testing immediately",
      "Verify the circuit is de-energised using proper voltage testing procedures",
      "Just check the switch position",
      "Ask someone nearby"
    ],
    correctAnswer: 1
  },
  {
    question: "What's the danger of skipping lockout/tagout procedures?",
    options: [
      "Nothing, it just takes time",
      "Circuits may be unexpectedly energised by others",
      "It improves efficiency",
      "It's only a paperwork issue"
    ],
    correctAnswer: 1
  }
];

const quizQuestions = [
  {
    id: "im8s6-q1",
    question: "What's the first step before testing a circuit?",
    options: [
      "Start testing immediately",
      "Verify the circuit is de-energised using proper voltage testing procedures",
      "Check the drawings only",
      "Ask someone if it's safe"
    ],
    correctAnswer: 1,
    explanation: "Always verify circuits are de-energised using proper voltage testing procedures (three-point check) before beginning any work, regardless of switch positions or assumptions."
  },
  {
    id: "im8s6-q2",
    question: "Why use CAT-rated tools?",
    options: [
      "They're cheaper",
      "They're designed to handle transient overvoltages and provide safety margins for electrical environments",
      "They look more professional",
      "They're required by insurance"
    ],
    correctAnswer: 1,
    explanation: "CAT-rated tools are designed to handle transient overvoltages common in electrical systems and provide appropriate safety margins for specific installation categories."
  },
  {
    id: "im8s6-q3",
    question: "What's the danger of skipping lockout/tagout?",
    options: [
      "It saves time",
      "Circuits may be unexpectedly energised by others, causing electrocution or equipment damage",
      "Nothing happens",
      "It improves efficiency"
    ],
    correctAnswer: 1,
    explanation: "Skipping lockout/tagout procedures can result in circuits being unexpectedly energised by other personnel, leading to serious injury, electrocution, or equipment damage."
  },
  {
    id: "im8s6-q4",
    question: "What kind of systems pose arc flash risk?",
    options: [
      "Only high voltage systems",
      "DC circuits, capacitive loads, high fault current systems, and any circuit with stored energy",
      "Only AC systems",
      "Only overhead lines"
    ],
    correctAnswer: 1,
    explanation: "Arc flash risk exists in DC circuits (arcs don't self-extinguish), capacitive loads (high inrush currents), high fault current systems, and any circuit with significant stored energy."
  },
  {
    id: "im8s6-q5",
    question: "Should you ever bypass safety features during testing?",
    options: [
      "Yes, it's necessary for testing",
      "Only with proper risk assessment, management approval, and immediate restoration after testing",
      "Always, they get in the way",
      "Never, under any circumstances"
    ],
    correctAnswer: 1,
    explanation: "Safety system bypasses should only occur with proper risk assessment, senior management approval, alternative protection measures, and immediate restoration after testing is complete."
  }
];

const faqs = [
  {
    question: "What is the three-point voltage test?",
    answer: "Test a known live source first to verify your tester works, then test the circuit you're working on, then test the known live source again to confirm your tester still works. This prevents false readings from faulty test equipment."
  },
  {
    question: "When is live testing acceptable?",
    answer: "Live testing should only be performed when there's no practical alternative, after a thorough risk assessment, with appropriate PPE, using properly rated equipment, and ideally with a competent observer present. Many organisations require senior authorisation."
  },
  {
    question: "What CAT rating do I need for industrial work?",
    answer: "CAT III 600V is typically required for distribution panels and fixed installation work. CAT II is suitable for portable equipment and outlets. Always check the specific requirements for your application and use equipment rated for the highest potential exposure."
  },
  {
    question: "How do I protect against arc flash?",
    answer: "Conduct arc flash risk assessments, maintain safe approach distances, wear appropriate PPE (flame-resistant clothing, face shields), use remote operating tools where possible, and ensure protective devices are properly coordinated to limit incident energy."
  }
];

const InstrumentationModule8Section6 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3">
          <Link to="/electrician/upskilling/instrumentation-module-8">
            <Button variant="ghost" size="sm" className="text-white hover:text-elec-yellow touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Module 8
            </Button>
          </Link>
        </div>
      </div>

      {/* Centred Title Header */}
      <div className="px-4 pt-6 pb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/20 mb-4">
          <Shield className="h-6 w-6 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Safety Considerations During Troubleshooting</h1>
        <p className="text-gray-400 text-sm">Section 8.6 - 25 minutes</p>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-24 max-w-3xl mx-auto">
        {/* Quick Summary Boxes - Level 2 Pattern */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li>- Always assume circuits are live</li>
              <li>- Use CAT-rated equipment</li>
              <li>- Follow lockout/tagout procedures</li>
              <li>- Watch for arc flash hazards</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li>- Three-point voltage test</li>
              <li>- Personal locks on isolators</li>
              <li>- Arc-rated PPE for high-risk work</li>
              <li>- Never bypass safety systems</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <div className="bg-card/30 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-elec-yellow text-xs font-bold">1</span>
              </div>
              <p className="text-gray-300 text-sm">Identify key hazards during diagnostics</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-elec-yellow text-xs font-bold">2</span>
              </div>
              <p className="text-gray-300 text-sm">Apply safe working procedures</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-elec-yellow text-xs font-bold">3</span>
              </div>
              <p className="text-gray-300 text-sm">Understand how to isolate and test live circuits properly</p>
            </div>
          </div>
        </div>

        {/* Section 01: Assume Circuits Are Live */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-elec-yellow font-mono text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Always Assume Circuits Are Live</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              Diagnosing faults often means working live or in high-risk areas. The cardinal
              rule is to always assume circuits are live unless you have personally verified
              otherwise using proper testing procedures.
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-medium mb-3">Verification Procedures</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-white font-medium mb-2">Testing Steps</p>
                  <ul className="text-sm space-y-1">
                    <li>- Use approved voltage detector</li>
                    <li>- Three-point check: live, test, live</li>
                    <li>- Check all conductors and earth</li>
                    <li>- Visual confirmation of isolation</li>
                    <li>- Verify against electrical drawings</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-white font-medium mb-2">Common Hazards</p>
                  <ul className="text-sm space-y-1">
                    <li>- Backfeed from multiple sources</li>
                    <li>- Stored energy in capacitors</li>
                    <li>- Induced voltages</li>
                    <li>- Control circuits may stay live</li>
                    <li>- UPS and battery backup systems</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Check 1 */}
        <div className="mb-8">
          <InlineCheck
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctAnswer={quickCheckQuestions[0].correctAnswer}
          />
        </div>

        {/* Section 02: CAT-Rated Equipment */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-elec-yellow font-mono text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">CAT-Rated Equipment and Insulated Tools</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              Using properly rated test equipment and insulated tools is essential for
              protection against electrical hazards during troubleshooting.
            </p>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-medium mb-3">CAT Rating Requirements</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-white font-medium mb-2">CAT Ratings</p>
                  <ul className="text-sm space-y-1">
                    <li>- <strong>CAT III 600V:</strong> Distribution panels</li>
                    <li>- <strong>CAT II 300V:</strong> Local loads, outlets</li>
                    <li>- Overvoltage protection required</li>
                    <li>- Adequate current rating</li>
                    <li>- Regular calibration</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-white font-medium mb-2">Insulated Tools</p>
                  <ul className="text-sm space-y-1">
                    <li>- VDE Certified (1000V rated)</li>
                    <li>- Inspect before each use</li>
                    <li>- Store properly to protect</li>
                    <li>- Complete set required</li>
                    <li>- Replace damaged immediately</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 03: Lockout/Tagout */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-elec-yellow font-mono text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Permit-to-Work and Lockout/Tagout</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              Formal isolation procedures protect you from unexpected energisation and
              ensure clear communication about the status of equipment.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-3">LOTO Essentials</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-white font-medium mb-2">Permit System</p>
                  <ul className="text-sm space-y-1">
                    <li>- Obtain proper work authorisation</li>
                    <li>- Complete hazard assessment</li>
                    <li>- Verify technician competency</li>
                    <li>- Know emergency procedures</li>
                    <li>- Communicate with operations</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-white font-medium mb-2">Lockout Procedure</p>
                  <ul className="text-sm space-y-1">
                    <li>- Each technician applies own lock</li>
                    <li>- Test circuits after lockout</li>
                    <li>- Discharge stored energy</li>
                    <li>- Try to start (verify isolation)</li>
                    <li>- Document isolation points</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Check 2 */}
        <div className="mb-8">
          <InlineCheck
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctAnswer={quickCheckQuestions[1].correctAnswer}
          />
        </div>

        {/* Section 04: Arc Flash and PPE */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-elec-yellow font-mono text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Arc Flash Hazards and PPE</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              Arc flash events release enormous energy in milliseconds. Understanding these
              hazards and wearing appropriate protection is critical.
            </p>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <h4 className="text-orange-400 font-medium mb-3">Arc Flash Considerations</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-white font-medium mb-2">High-Risk Situations</p>
                  <ul className="text-sm space-y-1">
                    <li>- DC circuits (arc won't self-extinguish)</li>
                    <li>- Capacitive loads (stored energy)</li>
                    <li>- Switching under load</li>
                    <li>- Short circuit conditions</li>
                    <li>- High altitude locations</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-white font-medium mb-2">Protection Measures</p>
                  <ul className="text-sm space-y-1">
                    <li>- Arc flash rated PPE</li>
                    <li>- Remote operation tools</li>
                    <li>- Current-limiting devices</li>
                    <li>- Safe approach distances</li>
                    <li>- Incident energy analysis</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-card/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Essential PPE</h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-elec-yellow font-medium mb-2">Basic PPE</p>
                  <ul className="text-xs space-y-1">
                    <li>- Safety glasses</li>
                    <li>- Insulated gloves</li>
                    <li>- EH-rated boots</li>
                    <li>- Hard hat (electrical type)</li>
                    <li>- Hi-vis FR clothing</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-elec-yellow font-medium mb-2">Arc Flash PPE</p>
                  <ul className="text-xs space-y-1">
                    <li>- Arc flash suit</li>
                    <li>- Arc-rated face shield</li>
                    <li>- Flash hood</li>
                    <li>- Leather over-gloves</li>
                    <li>- Leather boots</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-elec-yellow font-medium mb-2">Test Equipment</p>
                  <ul className="text-xs space-y-1">
                    <li>- Voltage detector</li>
                    <li>- CAT-rated DMM</li>
                    <li>- Insulation tester</li>
                    <li>- Current clamp</li>
                    <li>- Phase sequence tester</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real World Example */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-400 font-medium mb-3">Real World: Rushed Testing Results in Incident</h4>
            <p className="text-gray-300 text-sm mb-4">
              A rushed test on an energised loop without verifying isolation results in a
              blown fuse and mild shock - completely avoidable with proper procedure.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">1</span>
                <p className="text-sm text-gray-300">Production pressured for urgent fault resolution</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">2</span>
                <p className="text-sm text-gray-300">Technician skipped voltage verification</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">3</span>
                <p className="text-sm text-gray-300">Assumed isolation based on switch position only</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">4</span>
                <p className="text-sm text-gray-300">Test probe contacted live terminal</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs">5</span>
                <p className="text-sm text-gray-300">24V shock through damaged glove, blown test fuse</p>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded p-3 mb-3">
              <p className="text-red-400 font-medium text-sm mb-1">Contributing Factors</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>- Time pressure from production</li>
                <li>- Damaged PPE not identified during inspection</li>
                <li>- No voltage testing before contact</li>
              </ul>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
              <p className="text-green-400 font-medium text-sm mb-1">Lessons Learned</p>
              <p className="text-gray-300 text-sm">
                A simple voltage test would have revealed the live circuit. The team
                implemented mandatory pre-work safety briefings to prevent shortcuts
                under pressure.
              </p>
            </div>
          </div>
        </div>

        {/* Practical Guidance */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4">Practical Guidance</h3>
          <div className="bg-card/30 rounded-lg p-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2"></div>
              <p className="text-gray-300 text-sm">Never let production pressure compromise safety procedures - the consequences are not worth the time saved.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2"></div>
              <p className="text-gray-300 text-sm">Inspect PPE before every use - damaged insulation can result in serious injury or death.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2"></div>
              <p className="text-gray-300 text-sm">When in doubt, isolate. If you cannot safely verify a circuit is dead, treat it as live.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2"></div>
              <p className="text-gray-300 text-sm">Document any near-misses or safety concerns to help improve procedures for everyone.</p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card/30 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">{faq.question}</h4>
                <p className="text-gray-400 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-12">
          <Quiz
            title="Section 8.6 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Link to="/upskilling/instrumentation-module-8-section-5">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          </Link>
          <Link to="/upskilling/instrumentation-module-9">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/80 touch-manipulation active:scale-[0.98]">
              Complete Module 8
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule8Section6;
