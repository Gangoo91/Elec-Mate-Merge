import { ArrowLeft, ArrowRight, Shield, Target, CheckCircle, AlertTriangle, FileText, Users, Gavel, Briefcase, Settings, TestTube, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Basic Measuring Instruments - Module 1.1.4 | Level 2 Electrical Course";
const DESCRIPTION = "Master essential electrical measuring instruments for safe testing and fault finding. Learn voltage indicators, multimeters, continuity testers and safety procedures.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is a proving unit used for?",
    options: [
      "To measure voltage accurately",
      "To check that your voltage indicator is working",
      "To test continuity of cables",
      "To measure current flow"
    ],
    correctIndex: 1,
    explanation: "A proving unit provides a known voltage source to check that your voltage indicator is working correctly before and after testing."
  },
  {
    id: 2,
    question: "Why shouldn't you use a multimeter to prove dead?",
    options: [
      "It's too expensive",
      "It doesn't work properly",
      "It's not safe for isolation work",
      "It's too complicated to use"
    ],
    correctIndex: 2,
    explanation: "Multimeters are not designed for proving dead - they're not safe for isolation work. Use GS38-compliant voltage indicators instead."
  },
  {
    id: 3,
    question: "What is a good continuity reading typically close to?",
    options: [
      "1000 ohms",
      "500 ohms", 
      "100 ohms",
      "0 ohms"
    ],
    correctIndex: 3,
    explanation: "A good continuity reading should be close to 0 ohms, indicating low resistance and good electrical connection."
  }
];

const Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is a proving unit used for?",
      options: [
        "To measure voltage accurately",
        "To check that your voltage indicator is working",
        "To test continuity of cables",
        "To measure current flow"
      ],
      correctAnswer: 1,
      explanation: "A proving unit provides a known voltage source to check that your voltage indicator is working correctly before and after testing."
    },
    {
      id: 2,
      question: "Name two quantities a multimeter can measure.",
      options: [
        "Temperature and pressure",
        "Voltage and resistance",
        "Weight and length",
        "Speed and frequency"
      ],
      correctAnswer: 1,
      explanation: "Multimeters can measure voltage (AC/DC), resistance (Ω), and current (A) in some models, making them versatile for electrical testing."
    },
    {
      id: 3,
      question: "Why shouldn't you use a multimeter to prove dead?",
      options: [
        "It's too expensive",
        "It doesn't work properly",
        "It's not safe for isolation work",
        "It's too complicated to use"
      ],
      correctAnswer: 2,
      explanation: "Multimeters are not designed for proving dead - they're not safe for isolation work. Use GS38-compliant voltage indicators instead."
    },
    {
      id: 4,
      question: "What is a good continuity reading typically close to?",
      options: [
        "1000 ohms",
        "500 ohms",
        "100 ohms",
        "0 ohms"
      ],
      correctAnswer: 3,
      explanation: "A good continuity reading should be close to 0 ohms, indicating low resistance and good electrical connection."
    },
    {
      id: 5,
      question: "True or False: You should always check your tester on a known source before and after testing.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "True. Always check your tester with a proving unit before and after testing to ensure it's working correctly - this is a critical safety procedure."
    },
    {
      id: 6,
      question: "Which instrument is specifically designed for proving dead?",
      options: [
        "Multimeter",
        "Two-pole voltage indicator",
        "Continuity tester",
        "Clamp meter"
      ],
      correctAnswer: 1,
      explanation: "Two-pole voltage indicators that comply with GS38 are specifically designed for safely proving circuits dead during isolation procedures."
    },
    {
      id: 7,
      question: "What does CPC continuity testing verify?",
      options: [
        "Circuit protective conductor connection integrity",
        "Current flow in the circuit",
        "Voltage levels are correct",
        "Insulation resistance values"
      ],
      correctAnswer: 0,
      explanation: "CPC (Circuit Protective Conductor) continuity testing verifies that the earth/protective conductor has a continuous, low-resistance path."
    },
    {
      id: 8,
      question: "Which safety standard applies to electrical test probes?",
      options: [
        "BS 7671",
        "GS38",
        "BS EN 60204",
        "IEC 61439"
      ],
      correctAnswer: 1,
      explanation: "GS38 specifies safety requirements for electrical test equipment, including finger guards, fused leads, and insulated probes."
    }
  ];

  const faqs = [
    {
      question: "What's the difference between a voltage indicator and a multimeter?",
      answer: "Voltage indicators are designed specifically for safety (proving dead) with GS38 compliance. Multimeters are measurement tools for fault finding and testing but should never be used for isolation verification."
    },
    {
      question: "Why do I need a proving unit?",
      answer: "A proving unit provides a known voltage source to verify your voltage indicator is working before and after testing. This ensures your safety equipment is functioning correctly when you rely on it to prove circuits dead."
    },
    {
      question: "Can I use any multimeter for electrical work?",
      answer: "Use only quality multimeters with proper safety ratings (CAT ratings) appropriate for the voltage levels you're working with. Check leads and probes for damage before each use."
    },
    {
      question: "What happens if my continuity reading is high?",
      answer: "High resistance readings (far from 0 ohms) may indicate poor connections, damaged conductors, or incomplete circuits. Investigate and rectify before energising the circuit."
    },
    {
      question: "How often should test equipment be calibrated?",
      answer: "Follow manufacturer recommendations and company procedures. Typically annually for precision instruments, but check before each use for damage and basic function with proving units."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Shield className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 1.1.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Basic Measuring Instruments
          </h1>
          <p className="text-muted-foreground">
            Master essential electrical measuring instruments for safe testing and fault finding. Learn proper use and safety procedures.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Measuring instruments are essential for safe electrical work and testing.</li>
                <li>Different tools for different purposes: proving dead, fault finding, testing.</li>
                <li>Safety procedures and GS38 compliance are critical for protection.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Voltage indicators, proving units, multimeters, continuity testers.</li>
                <li><strong>Use:</strong> Safe isolation verification, fault finding, circuit testing.</li>
                <li><strong>Check:</strong> Equipment condition, calibration dates, probe safety.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Identify common measuring instruments used in electrical work.</li>
            <li>Understand the specific purpose and application of each instrument type.</li>
            <li>Apply safe handling and setup procedures for test equipment.</li>
            <li>Recognize GS38 safety requirements for electrical test equipment.</li>
            <li>Follow proper procedures for proving dead and continuity testing.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Voltage Indicators and Proving Units */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Voltage Indicators and Proving Units</h3>
            <p className="text-base text-foreground mb-4">
              Voltage indicators and proving units are fundamental safety equipment for electrical isolation procedures:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Voltage Indicators - Essential Safety Equipment</p>
                    <p className="text-base text-foreground mb-2"><strong>Purpose and design:</strong> Specifically designed for proving circuits dead safely.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Two-pole voltage indicators detect presence or absence of voltage</li>
                      <li>Must comply with GS38 safety standard requirements</li>
                      <li>Include safety features: finger guards, fused leads, insulated probes</li>
                      <li>Designed for use during safe isolation procedures</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Proving units:</strong> Essential companion equipment for safety verification.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Provide known voltage source to test voltage indicator function</li>
                      <li>Must be used before and after proving dead</li>
                      <li>Verify that safety equipment is working correctly</li>
                      <li>Battery-powered portable units for site use</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Safety procedures:</strong> Critical for electrical worker protection.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Test voltage indicator on proving unit before use</li>
                      <li>Prove dead at point of work using two-pole testing</li>
                      <li>Re-test voltage indicator on proving unit after use</li>
                      <li>Never use multimeters for proving dead - safety risk</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Critical safety rule:</strong> Always use GS38-compliant voltage indicators with proving units for isolation verification
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="voltage-indicator-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <Separator className="my-6" />

          {/* Continuity and Resistance Testing */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Continuity and Resistance Testing</h3>
            <p className="text-base text-foreground mb-4">
              Continuity testers verify electrical connections and conductor integrity for safe circuit operation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Continuity Testing - Verifying Circuit Integrity</p>
                    <p className="text-base text-foreground mb-2"><strong>Purpose and function:</strong> Measure resistance to verify electrical connections.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Low-voltage test current (typically 200mA) for safety</li>
                      <li>Measures resistance in ohms (Ω) between test points</li>
                      <li>Good continuity readings typically close to 0 ohms</li>
                      <li>High readings indicate poor connections or breaks</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Common applications:</strong> Essential verification tests for electrical safety.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>CPC (Circuit Protective Conductor) continuity verification</li>
                      <li>Ring final circuit testing (ring continuity)</li>
                      <li>Verifying conductor connections and joints</li>
                      <li>Fault finding for open circuits and high resistance</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Testing procedures:</strong> Systematic approach for accurate results.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Ensure circuit is isolated and disconnected from supply</li>
                      <li>Test instrument leads (null reading) before use</li>
                      <li>Connect test leads to appropriate test points</li>
                      <li>Record readings and compare with expected values</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Good practice:</strong> Always isolate circuits completely before continuity testing and verify instrument calibration
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="continuity-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <Separator className="my-6" />

          {/* Multimeters */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Multimeters - Versatile Measurement Tools</h3>
            <p className="text-base text-foreground mb-4">
              Multimeters are versatile instruments for general electrical measurements and fault finding:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Multimeter Capabilities and Safe Use</p>
                    <p className="text-base text-foreground mb-2"><strong>Measurement capabilities:</strong> Multiple electrical quantities in one instrument.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Voltage measurement: AC and DC voltage ranges</li>
                      <li>Resistance measurement: from milliohms to megohms</li>
                      <li>Current measurement: AC and DC current (some models)</li>
                      <li>Additional functions: diode testing, frequency, capacitance</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Safety requirements:</strong> Critical for safe operation and accurate results.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Select correct range and function before connecting</li>
                      <li>Use appropriate CAT rating for working environment</li>
                      <li>Check test leads and probes for damage before use</li>
                      <li>Never use for proving dead - not designed for isolation work</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Applications and limitations:</strong> Understanding proper use and restrictions.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Fault finding and diagnostic measurements</li>
                      <li>General voltage and resistance checks</li>
                      <li>Not suitable for proving dead or isolation verification</li>
                      <li>Requires trained, competent users for safety</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Important limitation:</strong> Never use multimeters for safety-critical isolation verification - use dedicated voltage indicators
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="multimeter-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </Card>

        {/* FAQ Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-emerald-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/20 pb-4 last:border-b-0">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-base text-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quiz */}
        <Quiz title="Basic Measuring Instruments Quiz" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between mt-10">
          <Button variant="outline" asChild>
            <Link to="../subsection3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../subsection5">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Section1_4;