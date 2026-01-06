import { ArrowLeft, ArrowRight, Zap, Target, CheckCircle, AlertTriangle, FileText, Users, Wrench, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Tripping MCBs or RCDs - Module 7.3.1 | Level 2 Electrical Course";
const DESCRIPTION = "Understanding the causes and professional response to tripping MCBs and RCDs in electrical installations according to BS 7671.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What does an MCB protect against?",
    options: ["Earth leakage", "Overcurrent conditions", "Voltage drop", "Power factor"],
    correctIndex: 1,
    explanation: "MCBs protect against overcurrent, which may result from overload or short circuit conditions, protecting conductors and equipment from overheating."
  },
  {
    id: 2,
    question: "What does an RCD protect against?",
    options: ["Overload conditions", "Earth leakage and electric shock", "Short circuits", "Voltage fluctuations"],
    correctIndex: 1,
    explanation: "RCDs protect against earth leakage and electric shock by monitoring current balance between line and neutral conductors."
  },
  {
    id: 3,
    question: "How quickly does an RCD typically trip at 30mA leakage?",
    options: ["Within 5 seconds", "Within 40 milliseconds", "Within 1 minute", "Within 10 seconds"],
    correctIndex: 1,
    explanation: "RCDs trip almost instantly, usually within 40 milliseconds at 30mA leakage current to prevent electric shock."
  }
];

const Module7Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What does an MCB protect against?",
      options: [
        "Earth leakage current",
        "Overcurrent conditions",
        "Voltage drop",
        "Power factor correction"
      ],
      correctAnswer: 1,
      explanation: "MCBs protect against overcurrent, which may result from overload or short circuit conditions."
    },
    {
      id: 2,
      question: "What does an RCD protect against?",
      options: [
        "Overload conditions only",
        "Earth leakage and electric shock",
        "Short circuits only",
        "Voltage fluctuations"
      ],
      correctAnswer: 1,
      explanation: "RCDs protect against earth leakage and electric shock by monitoring current balance."
    },
    {
      id: 3,
      question: "How does an RCD detect a fault?",
      options: [
        "By measuring voltage levels",
        "By monitoring current balance between line and neutral",
        "By checking resistance values",
        "By measuring frequency changes"
      ],
      correctAnswer: 1,
      explanation: "RCDs work by constantly monitoring the balance between current flowing out through line and returning through neutral."
    },
    {
      id: 4,
      question: "Give one common cause of repeated MCB tripping.",
      options: [
        "Low voltage supply",
        "Overloaded circuit with too many appliances",
        "High resistance connections",
        "Poor power factor"
      ],
      correctAnswer: 1,
      explanation: "Overloaded circuits with too many appliances connected are a common cause of repeated MCB tripping."
    },
    {
      id: 5,
      question: "Give one common cause of repeated RCD tripping.",
      options: [
        "Too many lights on the circuit",
        "Moisture ingress or deteriorating insulation",
        "High current demand",
        "Low voltage conditions"
      ],
      correctAnswer: 1,
      explanation: "Moisture ingress, deteriorating insulation, or faulty appliances leaking current to earth commonly cause RCD tripping."
    },
    {
      id: 6,
      question: "Why must frequent tripping never be ignored?",
      options: [
        "It's inconvenient for users",
        "It indicates dangerous conditions that could lead to fire or shock",
        "It increases electricity bills",
        "It damages the protective device"
      ],
      correctAnswer: 1,
      explanation: "Frequent tripping indicates dangerous conditions; ignoring it risks fire, injury, and potentially prosecution."
    },
    {
      id: 7,
      question: "What sequence of steps should an electrician follow after a device trips?",
      options: [
        "Reset immediately and monitor",
        "Isolate, test, identify, repair, then re-energise",
        "Replace the device with a higher rating",
        "Bypass the device temporarily"
      ],
      correctAnswer: 1,
      explanation: "The professional process is: isolate the circuit, test using appropriate instruments, identify and correct the fault, then re-energise."
    },
    {
      id: 8,
      question: "What risk arises from repeatedly resetting a device without investigation?",
      options: [
        "Increased electricity costs",
        "Escalating hazard potentially leading to fires or shocks",
        "Faster wear of the device",
        "Reduced system efficiency"
      ],
      correctAnswer: 1,
      explanation: "Resetting without finding the cause risks escalating the hazard, potentially leading to fires, shocks, or equipment damage."
    },
    {
      id: 9,
      question: "Why is it dangerous to replace a tripping breaker with a higher-rated one?",
      options: [
        "It costs more money",
        "It removes the safety barrier that prevents serious accidents",
        "It reduces system efficiency",
        "It's not approved by manufacturers"
      ],
      correctAnswer: 1,
      explanation: "Uprating removes the safety barrier designed to protect against dangerous conditions, increasing risk of fire and injury."
    },
    {
      id: 10,
      question: "In the real-world example of the student flats, what fault caused the RCD to trip?",
      options: [
        "Overloaded circuit",
        "Internal insulation fault in microwave",
        "Damaged cable",
        "Poor connections"
      ],
      correctAnswer: 1,
      explanation: "The microwave had developed an internal insulation fault, causing current to leak to earth and trip the RCD repeatedly."
    }
  ];

  const faqs = [
    {
      question: "Do MCBs and RCDs protect against the same conditions?",
      answer: "No. MCBs protect against overcurrent conditions (overloads and short circuits), while RCDs protect against earth leakage and electric shock. They serve different protective functions."
    },
    {
      question: "Can an appliance cause tripping?",
      answer: "Yes, faulty or damp appliances are a common cause of RCD trips. Appliances with insulation faults or moisture ingress can leak current to earth, causing the RCD to operate."
    },
    {
      question: "Should you ever repeatedly reset a tripping device without investigating?",
      answer: "Absolutely not. The cause must be identified and corrected before restoring power. Repeated resetting without investigation risks escalating dangerous conditions."
    },
    {
      question: "What tests should be carried out after a protective device trips?",
      answer: "Appropriate tests include continuity and insulation resistance tests, earth fault loop impedance testing, and RCD trip-time testing to verify correct operation."
    },
    {
      question: "How can you identify whether the fault is in the wiring or an appliance?",
      answer: "Ask occupants about the circumstances - if tripping occurs only when a specific appliance is used, the fault likely lies with that appliance rather than the fixed wiring."
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
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div className="p-2 rounded-lg w-fit">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow w-fit">
              Section 7.3.1
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Tripping MCBs or RCDs
          </h1>
          <p className="text-white text-sm sm:text-base">
            Understanding the causes and professional response to protective device operation in electrical installations.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>MCBs and RCDs trip to prevent dangerous conditions, not as inconveniences.</li>
                <li>MCBs protect against overcurrent; RCDs protect against earth leakage and shock.</li>
                <li>Every trip must be investigated - resetting without finding the cause escalates risk.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Tripped MCBs, RCD operation, repeated tripping patterns.</li>
                <li><strong>Use:</strong> Isolation, testing, fault investigation, proper reset procedures.</li>
                <li><strong>Check:</strong> Circuit integrity, appliance condition, user circumstances.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Explain the function of MCBs and RCDs in electrical protection systems.</li>
            <li>Describe the conditions that cause protective devices to trip and their warning significance.</li>
            <li>Interpret tripping as a warning sign of underlying electrical faults requiring investigation.</li>
            <li>Outline the correct professional response sequence when protective devices operate.</li>
            <li>Apply systematic fault-finding techniques to identify and resolve tripping causes.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* Understanding Protective Device Functions */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Understanding MCB and RCD Functions</h3>
            <p className="text-base text-white mb-4">
              When a Miniature Circuit Breaker (MCB) or Residual Current Device (RCD) trips, it is never just an inconvenience. These protective devices are designed to disconnect electrical supply in dangerous situations, preventing electric shock, overheating, and fire:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">MCB Protection Functions</p>
                    <p className="text-base text-white mb-2"><strong>Overcurrent protection:</strong> MCBs protect against excessive current flow.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Protects against overload conditions when circuit current exceeds safe limits</li>
                      <li>Protects against short circuit faults with very high fault currents</li>
                      <li>Prevents conductor overheating that could cause fires</li>
                      <li>Protects accessories and equipment from thermal damage</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>RCD protection functions:</strong> RCDs protect against earth leakage and shock.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Monitors current balance between line and neutral conductors</li>
                      <li>Detects current leaking to earth through faults or human contact</li>
                      <li>Trips within 40 milliseconds at 30mA leakage for shock protection</li>
                      <li>Provides additional protection against fire caused by earth faults</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Key principle:</strong> Tripping devices are warning systems indicating dangerous conditions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="mcb-rcd-function-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Common Causes of Tripping */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Common Causes and Investigation Requirements</h3>
            <p className="text-base text-white mb-4">
              When either device trips, the underlying reason must be investigated. Understanding common causes helps direct fault-finding efforts:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">MCB Tripping Causes</p>
                    <p className="text-base text-white mb-2"><strong>Overload conditions:</strong> Too much load connected to the circuit.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Multiple high-current appliances used simultaneously</li>
                      <li>Extension leads with multiple devices plugged in</li>
                      <li>Gradual increase in load over time without circuit review</li>
                      <li>Appliances drawing more current than their rating due to faults</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Short circuit faults:</strong> Direct connection between live conductors.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Damaged cable insulation allowing conductor contact</li>
                      <li>Loose connections causing arcing and eventual short circuit</li>
                      <li>Moisture ingress causing tracking between conductors</li>
                      <li>Physical damage to cables from drilling or impact</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>RCD tripping causes:</strong> Current leakage to earth through various paths.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Moisture ingress into electrical equipment or accessories</li>
                      <li>Deteriorating insulation in cables or appliances</li>
                      <li>Faulty appliances with internal insulation breakdown</li>
                      <li>Damaged cables with conductor-to-earth contact</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Professional response:</strong> Never dismiss tripping as "nuisance" - investigate every operation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="rcd-protection-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Professional Investigation Process */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Professional Investigation Process</h3>
            <p className="text-base text-white mb-4">
              A professional electrician follows a clear, systematic process when protective devices trip:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Systematic Investigation Procedure</p>
                    <p className="text-base text-white mb-2"><strong>Initial response:</strong> Safe isolation and circuit confirmation.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Isolate the affected circuit and confirm it is safe to work on</li>
                      <li>Gather information from users about circumstances of tripping</li>
                      <li>Visually inspect for obvious damage or moisture ingress</li>
                      <li>Check for burning smells or heat damage indicators</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Testing procedures:</strong> Use appropriate instruments to identify faults.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Continuity tests to check conductor integrity and connections</li>
                      <li>Insulation resistance tests to verify conductor separation</li>
                      <li>Earth fault loop impedance to ensure protection operates correctly</li>
                      <li>RCD trip-time testing to verify device function within standards</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Fault correction:</strong> Address the root cause before re-energising.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Repair damaged cables or replace if beyond economic repair</li>
                      <li>Tighten loose connections and check joint integrity</li>
                      <li>Replace defective appliances or advise users of faults</li>
                      <li>Address load distribution if overload was the cause</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical rule:</strong> Only reset and re-energise after fault identification and correction
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="rcd-speed-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="space-y-4 text-base text-white">
            <p>
              Electricians should also consider the information provided by occupants. For example, if an RCD trips only when a certain appliance is in use, the fault may lie with that appliance rather than the fixed wiring. If an MCB trips whenever several heaters or kettles are used at once, this points to an overload condition rather than a fault in the wiring itself.
            </p>
            <p>
              Asking the right questions often reveals important clues. Above all, protective devices must never be bypassed or uprated simply to stop tripping. Doing so removes the safety barrier that prevents serious accidents.
            </p>
            <div className="bg-card border border-amber-400/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-600">Critical Safety Point</span>
              </div>
              <p className="text-sm">
                Never bypass or uprate protective devices to stop tripping. This removes essential safety protection and significantly increases the risk of fire, electric shock, and equipment damage.
              </p>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Examples</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-l-red-500 p-4 rounded-r-lg">
              <h3 className="font-semibold text-red-600 dark:text-elec-yellow mb-2">Student Flats RCD Tripping</h3>
              <p className="text-base text-white mb-2">
                In a block of student flats, residents reported that the RCD protecting their kitchen circuits tripped several times a day. Maintenance staff repeatedly reset it without investigation, telling students to "just plug things in more carefully."
              </p>
              <p className="text-base text-white mb-2">
                Eventually, one student received a shock from the metal casing of a microwave, which had developed an internal insulation fault. The RCD had been providing repeated warnings that current was leaking to earth, but these were ignored until someone was injured.
              </p>
              <p className="text-xs sm:text-sm text-white italic">
                A proper investigation at the first sign of tripping would have identified the faulty appliance and prevented harm.
              </p>
            </div>

            <div className="border-l-4 border-l-green-500 p-4 rounded-r-lg">
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Office Circuit Overload</h3>
              <p className="text-base text-white mb-2">
                An office experienced frequent tripping of a ring circuit breaker during winter. Staff had plugged multiple portable heaters into extension leads, overloading the circuit.
              </p>
              <p className="text-base text-white mb-2">
                Instead of upgrading the breaker, the investigating electrician explained the cause and arranged for additional circuits to be installed. By addressing the underlying problem, the risk of overheating and fire was eliminated.
              </p>
              <p className="text-xs sm:text-sm text-white italic">
                Proper load assessment and circuit provision resolved the issue safely without compromising protection.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-base text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <div className="space-y-3 text-base text-white">
            <p>
              Tripping MCBs and RCDs are not inconveniences; they are safety mechanisms designed to signal dangerous conditions. An MCB trips when a circuit carries too much current, protecting against overloads and short circuits. An RCD trips when current leaks to earth, protecting against electric shock.
            </p>
            <p>
              Frequent tripping is a symptom of underlying faults, such as damaged insulation, overloading, or faulty appliances. The correct professional response is to isolate, test, identify, repair, and only then re-energise.
            </p>
            <p>
              Ignoring or bypassing these devices risks fire, injury, and prosecution. Every operation of protective devices should be treated as a warning requiring immediate investigation and appropriate corrective action.
            </p>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quiz (10 Questions)</h2>
          <Quiz 
            questions={quizQuestions}
            title="Tripping MCBs or RCDs"
          />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../3-2">
              Next: Subsection 3.2
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section3_1;