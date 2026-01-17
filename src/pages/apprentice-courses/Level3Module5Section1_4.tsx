import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safety Precautions and Risk Assessment Before Testing - Level 3 Module 5 Section 1.4";
const DESCRIPTION = "Essential safety procedures and risk assessments required before electrical testing begins, including GS38 compliance and safe isolation.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary purpose of safe isolation before testing?",
    options: [
      "To save electricity",
      "To prevent electric shock to the tester and others",
      "To speed up the testing process",
      "To protect the test instruments"
    ],
    correctIndex: 1,
    explanation: "Safe isolation prevents electric shock by ensuring the circuit is completely dead before work begins. This protects the tester, other workers, and anyone else who might come into contact with the installation during testing."
  },
  {
    id: "check-2",
    question: "According to GS38, what is the maximum exposed metal length for test probes?",
    options: [
      "1mm",
      "2mm",
      "4mm",
      "10mm"
    ],
    correctIndex: 2,
    explanation: "GS38 specifies that test probes should have a maximum of 4mm exposed metal. This reduces the risk of accidental contact with adjacent conductors and limits the area that could cause a short circuit or flash."
  },
  {
    id: "check-3",
    question: "When should a risk assessment be carried out for testing work?",
    options: [
      "Only for high-voltage installations",
      "Before any testing work begins",
      "After testing is completed",
      "Only if the client requests it"
    ],
    correctIndex: 1,
    explanation: "A risk assessment must be carried out before any testing work begins. This identifies hazards, evaluates risks, and determines the control measures needed to carry out the work safely."
  },
  {
    id: "check-4",
    question: "What is the correct procedure for proving dead after isolation?",
    options: [
      "Visual inspection only",
      "Use an approved voltage indicator, prove it works, test circuit, prove indicator still works",
      "Use any available multimeter",
      "Ask someone else to confirm"
    ],
    correctIndex: 1,
    explanation: "The correct procedure is: use an approved voltage indicator, prove it works on a known live source, test the circuit to confirm dead, then prove the indicator still works. This three-point test ensures your readings are reliable."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What document provides guidance on electrical test equipment safety?",
    options: [
      "BS 7671",
      "GS38",
      "Building Regulations Part P",
      "Health and Safety at Work Act"
    ],
    correctAnswer: 1,
    explanation: "GS38 (Electrical Test Equipment for Use on Low Voltage Electrical Systems) provides specific guidance on the safety requirements for test equipment, leads, and probes used on electrical installations."
  },
  {
    id: 2,
    question: "Test leads complying with GS38 should have:",
    options: [
      "Metal shrouds for durability",
      "Finger guards and fused probes",
      "Maximum length of 1 metre",
      "Only one colour for simplicity"
    ],
    correctAnswer: 1,
    explanation: "GS38 compliant leads should have finger guards to prevent accidental contact, fused probes (typically 500mA) to limit fault current, and insulated probe tips with minimal exposed metal."
  },
  {
    id: 3,
    question: "Before starting any electrical testing, you must ensure:",
    options: [
      "The client is present",
      "Safe isolation has been achieved and proved",
      "All paperwork is completed",
      "The weather is suitable"
    ],
    correctAnswer: 1,
    explanation: "Safe isolation must be achieved and proved dead before testing begins. This is the fundamental safety requirement that protects you and others from electric shock during dead testing procedures."
  },
  {
    id: 4,
    question: "A lock-off device is used during isolation to:",
    options: [
      "Improve the appearance of the installation",
      "Prevent unauthorised re-energisation",
      "Identify the circuit for testing",
      "Satisfy building regulations"
    ],
    correctAnswer: 1,
    explanation: "Lock-off devices prevent anyone else from re-energising the circuit while you are working on it. Combined with warning notices, this ensures the circuit remains isolated throughout the testing process."
  },
  {
    id: 5,
    question: "When testing live circuits (Zs, RCD testing), what PPE is typically required?",
    options: [
      "Full body insulating suit",
      "Appropriate insulated gloves, eye protection, and non-conductive footwear",
      "No PPE is required for low voltage",
      "Only safety boots"
    ],
    correctAnswer: 1,
    explanation: "For live testing on low voltage circuits, appropriate PPE includes insulated gloves rated for the voltage, safety glasses or face shield, and non-conductive footwear. The specific PPE depends on the risk assessment."
  },
  {
    id: 6,
    question: "A voltage indicator used for proving dead should be:",
    options: [
      "Any meter capable of reading voltage",
      "Approved to GS38 and independently powered",
      "The same instrument used for testing",
      "Borrowed from another trade"
    ],
    correctAnswer: 1,
    explanation: "Voltage indicators for proving dead must be approved to GS38, independently powered (not relying on the circuit being tested), and properly maintained with regular proving on known live sources."
  },
  {
    id: 7,
    question: "What should be included in a risk assessment for testing work?",
    options: [
      "Only the cost of the work",
      "Hazards, persons at risk, existing controls, and additional measures needed",
      "A list of test instruments",
      "The client's contact details only"
    ],
    correctAnswer: 1,
    explanation: "A proper risk assessment identifies hazards (shock, burns, arc flash), who might be harmed, existing control measures, and any additional measures needed. It must be suitable for the specific work and location."
  },
  {
    id: 8,
    question: "If you discover an unexpected live conductor during supposedly dead testing:",
    options: [
      "Continue with caution",
      "Stop immediately, re-isolate, and prove dead again",
      "Note it in your report and continue",
      "Ask the client what to do"
    ],
    correctAnswer: 1,
    explanation: "Finding unexpected voltage means the isolation has failed or the wrong circuit was isolated. Stop immediately, make safe, re-investigate the isolation, and do not continue until the circuit is confirmed dead."
  },
  {
    id: 9,
    question: "Warning notices during isolation should state:",
    options: [
      "The electrician's name only",
      "Danger - work in progress, do not switch on",
      "Testing in progress - please wait",
      "Circuit under test - proceed with caution"
    ],
    correctAnswer: 1,
    explanation: "Warning notices should clearly state the danger and the prohibition: 'Danger - Work in Progress - Do Not Switch On' or similar wording. They should be prominently displayed at all points where the circuit could be re-energised."
  },
  {
    id: 10,
    question: "The hierarchy of risk control measures places what at the top?",
    options: [
      "Personal protective equipment",
      "Elimination of the hazard",
      "Warning signs",
      "Safe systems of work"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy places elimination first (can we avoid the hazard entirely?), then substitution, engineering controls, administrative controls, and finally PPE as the last resort. For electrical testing, safe isolation is the primary control."
  }
];

const faqs = [
  {
    question: "Do I need to complete a written risk assessment for every job?",
    answer: "A risk assessment is always required, but it does not always need to be written for simple, routine tasks where hazards are well-known and controlled. However, for complex installations, unfamiliar environments, or higher-risk work, a written risk assessment is essential and may be required by the principal contractor."
  },
  {
    question: "Can I use a standard multimeter for proving dead?",
    answer: "A standard multimeter can be used if it meets GS38 requirements and is properly maintained. However, dedicated voltage indicators are often preferred because they are designed specifically for this purpose, have clearer indication, and are less likely to be accidentally set to the wrong range."
  },
  {
    question: "What should I do if safe isolation cannot be achieved?",
    answer: "If safe isolation is not possible, the work must either be postponed until isolation can be achieved, or carried out using live working procedures. Live working requires specific training, authorisation, and additional precautions. It should only be undertaken when there is no alternative."
  },
  {
    question: "How often should test equipment be calibrated?",
    answer: "Test equipment should typically be calibrated annually, though more frequent calibration may be needed for heavily used instruments. Keep calibration certificates and check instruments regularly against known values. Before each use, verify the instrument is functioning correctly."
  },
  {
    question: "Who is responsible for safety during testing work?",
    answer: "Everyone has a responsibility for safety. The person carrying out the testing is responsible for their own safety and that of others affected by their work. The client or duty holder has overall responsibility for the premises. If working on a construction site, the principal contractor may have overarching safety responsibilities."
  }
];

const Level3Module5Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safety Precautions and Risk Assessment
          </h1>
          <p className="text-white/80">
            Essential safety procedures required before testing begins
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Risk assess:</strong> Before any testing work begins</li>
              <li><strong>Safe isolation:</strong> Isolate, lock off, prove dead</li>
              <li><strong>GS38:</strong> Test equipment safety requirements</li>
              <li><strong>PPE:</strong> Appropriate protection for the task</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Hazards before starting work</li>
              <li><strong>Use:</strong> GS38 compliant test equipment</li>
              <li><strong>Apply:</strong> Three-point proving procedure</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "How to carry out effective risk assessments",
              "Safe isolation procedures and proving dead",
              "GS38 requirements for test equipment",
              "Personal protective equipment selection",
              "Lock-off and warning notice requirements",
              "Emergency procedures and first aid awareness"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Risk Assessment for Testing Work
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every testing task carries risk. Before picking up a test instrument, you must assess what could go wrong and how to prevent it. This is not bureaucracy - it is the process that keeps you alive.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key hazards during electrical testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Electric shock:</strong> Contact with live conductors during testing</li>
                <li><strong>Arc flash:</strong> High energy release during fault conditions</li>
                <li><strong>Burns:</strong> From electrical contact or fire</li>
                <li><strong>Falls:</strong> Working at height to access equipment</li>
                <li><strong>Other hazards:</strong> Confined spaces, asbestos, contamination</li>
              </ul>
            </div>

            <p>
              The risk assessment process requires you to identify hazards, evaluate who might be harmed and how, decide on control measures, record your findings (where required), and review them if circumstances change.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A risk assessment is not just a form to fill in. It is a thinking process that helps you identify dangers before they become incidents. Do it properly every time.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Safe Isolation Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safe isolation is the most critical safety procedure for electrical testing. It ensures the circuit you are working on cannot unexpectedly become live. A properly isolated circuit poses no shock risk - an improperly isolated one can kill.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Safe Isolation Procedure</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Identify the circuit to be worked on</li>
                  <li>2. Isolate using suitable means (switch, fuse, MCB)</li>
                  <li>3. Secure the isolation (lock-off device)</li>
                  <li>4. Post warning notices</li>
                  <li>5. Prove dead using approved voltage indicator</li>
                  <li>6. Prove the indicator before and after testing</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Point Test</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Test indicator on known live source</li>
                  <li>2. Test the isolated circuit (all conductors)</li>
                  <li>3. Test indicator on known live source again</li>
                  <li>This proves the indicator worked before and after</li>
                  <li>If step 3 fails, your step 2 result is unreliable</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> You need to test a socket circuit. Identify the correct MCB, switch it off, apply a lock-off device with your personal lock, and attach a warning notice. Use your voltage indicator on a known live socket, then test all conductors at the first socket on the circuit. Return to the known live source and confirm the indicator still works. Only then can you begin dead testing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            GS38 Test Equipment Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              GS38 (Electrical test equipment for use on low voltage electrical systems) sets out the safety requirements for test instruments, leads, and probes. Following GS38 significantly reduces the risk of electric shock and arc flash during testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">GS38 key requirements for test leads and probes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Finger guards:</strong> Prevent fingers sliding onto exposed metal</li>
                <li><strong>Fused probes:</strong> Typically 500mA HRC fuse to limit fault energy</li>
                <li><strong>Shrouded connectors:</strong> No exposed metal at instrument connections</li>
                <li><strong>Maximum 4mm exposed tip:</strong> Limits contact area and short circuit risk</li>
                <li><strong>Robust insulation:</strong> Rated for the voltages being tested</li>
                <li><strong>Clear condition:</strong> No damage, cuts, or exposed conductors</li>
              </ul>
            </div>

            <p>
              Test instruments themselves must be suitable for the voltages and conditions where they will be used. They should be properly maintained, calibrated, and inspected before each use for damage or wear.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Cheap or damaged test leads can fail catastrophically under fault conditions. The energy released during an arc flash can cause severe burns and blast injuries. GS38 compliance is not optional.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Personal Protective Equipment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PPE is the last line of defence - it protects you when other controls fail. For electrical testing, PPE must be appropriate to the hazards identified in your risk assessment. The wrong PPE is as dangerous as no PPE.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Eye Protection</p>
                <p className="text-white/90 text-xs">Safety glasses or face shield for arc flash protection</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Hand Protection</p>
                <p className="text-white/90 text-xs">Insulated gloves rated for voltage being worked on</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Footwear</p>
                <p className="text-white/90 text-xs">Non-conductive safety boots or shoes</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Additional considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Remove metal jewellery (rings, watches, chains) that could cause shorts or burns</li>
                <li>Wear non-flammable clothing - avoid synthetics that can melt onto skin</li>
                <li>Ensure gloves are appropriate for the voltage and tested before use</li>
                <li>Check PPE condition regularly - damaged PPE offers reduced protection</li>
                <li>Know where first aid equipment and emergency procedures are located</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> For routine testing on a domestic installation, you might wear safety glasses and non-conductive footwear. For testing at a main switchboard with high fault levels, you would add arc-rated face shield, insulated gloves, and potentially arc flash clothing rated for the prospective incident energy.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Every Testing Session</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete risk assessment for the specific work and location</li>
                <li>Check test instruments are calibrated and in good condition</li>
                <li>Inspect test leads for damage - replace if any doubt</li>
                <li>Verify you have correct PPE for the work</li>
                <li>Confirm you know the emergency procedures for the location</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Testing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Maintain safe isolation throughout dead testing</li>
                <li>Re-prove dead if you leave and return to the work area</li>
                <li>Keep work area clear of trip hazards and obstructions</li>
                <li>Be aware of others who might be affected by your work</li>
                <li>Stop immediately if anything unexpected occurs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming circuit is dead</strong> - Always prove dead, never assume</li>
                <li><strong>Using damaged leads</strong> - Inspect before every use</li>
                <li><strong>Skipping the three-point test</strong> - All three steps are essential</li>
                <li><strong>Removing lock-off too early</strong> - Keep in place until work is complete</li>
              </ul>
            </div>
          </div>
        </section>

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

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Safe Isolation Steps</p>
                <ul className="space-y-0.5">
                  <li>1. Identify correct circuit</li>
                  <li>2. Isolate using suitable means</li>
                  <li>3. Lock off and post warnings</li>
                  <li>4. Prove dead (three-point test)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">GS38 Essentials</p>
                <ul className="space-y-0.5">
                  <li>Maximum 4mm exposed probe tip</li>
                  <li>Finger guards on probes</li>
                  <li>Fused probes (500mA HRC)</li>
                  <li>Shrouded connectors</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Test Sequence
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section1-5">
              Next: Documentation Requirements
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module5Section1_4;
