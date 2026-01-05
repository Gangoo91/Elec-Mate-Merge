import { ArrowLeft, ArrowRight, Volume2, Target, CheckCircle, AlertTriangle, FileText, Users, Wrench, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Buzzing, Arcing & Sparking - Module 7.3.4 | Level 2 Electrical Course";
const DESCRIPTION = "Identifying and responding to buzzing, arcing and sparking in electrical installations according to BS 7671.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the most serious immediate danger from electrical arcing?",
    options: ["Equipment damage", "Fire and explosion risk", "Voltage drop", "Power loss"],
    correctIndex: 1,
    explanation: "Electrical arcing creates extremely high temperatures that pose immediate fire and explosion risks, especially in flammable atmospheres."
  },
  {
    id: 2,
    question: "What causes buzzing sounds in electrical equipment?",
    options: ["Normal operation", "Loose connections or magnetostriction", "High voltage", "Low current"],
    correctIndex: 1,
    explanation: "Buzzing typically indicates loose connections causing arcing or magnetostriction in transformers and chokes."
  },
  {
    id: 3,
    question: "What should you do immediately when detecting electrical arcing?",
    options: ["Continue working", "Isolate the supply immediately", "Ignore if minor", "Increase ventilation"],
    correctIndex: 1,
    explanation: "Electrical arcing requires immediate isolation to prevent fire, explosion, or serious injury from high-energy discharge."
  }
];

const Module7Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What does persistent buzzing in electrical equipment typically indicate?",
      options: [
        "Normal operation",
        "Loose connections or core lamination problems",
        "Low voltage conditions",
        "High efficiency operation"
      ],
      correctAnswer: 1,
      explanation: "Persistent buzzing indicates loose connections causing intermittent arcing or loose core laminations in transformers."
    },
    {
      id: 2,
      question: "Why is electrical arcing particularly dangerous?",
      options: [
        "It reduces efficiency only",
        "Creates extreme temperatures and fire/explosion risk",
        "Causes minor equipment wear",
        "Only affects sensitive electronics"
      ],
      correctAnswer: 1,
      explanation: "Electrical arcs generate temperatures exceeding 3000°C, creating serious fire and explosion risks, especially near flammable materials."
    },
    {
      id: 3,
      question: "What causes sparking at switch contacts?",
      options: [
        "Normal switching operation",
        "Worn contacts or high inductive loads",
        "Low ambient temperature",
        "High voltage supply"
      ],
      correctAnswer: 1,
      explanation: "Sparking indicates worn switch contacts or high inductive loads that create back-EMF during switching operations."
    },
    {
      id: 4,
      question: "What visual signs indicate dangerous arcing?",
      options: [
        "Bright white light only",
        "Carbon tracking, pitting, and scorch marks",
        "No visible effects",
        "Improved surface finish"
      ],
      correctAnswer: 1,
      explanation: "Dangerous arcing leaves carbon tracks, contact pitting, scorch marks, and metal vapour deposits on surrounding surfaces."
    },
    {
      id: 5,
      question: "What immediate action is required when electrical arcing is detected?",
      options: [
        "Continue normal operation",
        "Isolate supply and secure the area",
        "Reset protective devices only",
        "Adjust load levels"
      ],
      correctAnswer: 1,
      explanation: "Electrical arcing requires immediate isolation and area security to prevent escalation to fire or explosion."
    },
    {
      id: 6,
      question: "What tools help detect arcing and buzzing faults?",
      options: [
        "Only visual inspection",
        "Acoustic detectors and thermal imaging",
        "Only basic multimeters",
        "Only insulation testers"
      ],
      correctAnswer: 1,
      explanation: "Ultrasonic detectors identify high-frequency sounds from arcing, while thermal imaging shows hotspots from poor connections."
    },
    {
      id: 7,
      question: "Why should buzzing sounds never be ignored in electrical installations?",
      options: [
        "They're only noise issues",
        "They indicate developing faults that can escalate",
        "They only affect comfort",
        "They're covered by warranties"
      ],
      correctAnswer: 1,
      explanation: "Buzzing indicates developing electrical faults that can rapidly escalate to dangerous arcing, fires, or equipment failure."
    },
    {
      id: 8,
      question: "What environmental factors increase arcing risks?",
      options: [
        "Low humidity only",
        "Moisture, contamination, and corrosive atmospheres",
        "High temperature only",
        "Good ventilation"
      ],
      correctAnswer: 1,
      explanation: "Moisture reduces insulation resistance, contamination creates tracking paths, and corrosive atmospheres degrade connections."
    },
    {
      id: 9,
      question: "What documentation is required after finding arcing faults?",
      options: [
        "No documentation needed",
        "Detailed fault report with hazard assessment",
        "Only verbal communication",
        "Basic maintenance log entry"
      ],
      correctAnswer: 1,
      explanation: "Arcing faults require comprehensive documentation including hazard assessment, immediate actions, and remedial work completed."
    },
    {
      id: 10,
      question: "In the factory example, what indicated the developing contactor fault?",
      options: [
        "Reduced efficiency only",
        "Increasing buzzing and visible sparking at contacts",
        "Higher power consumption",
        "Improved switching speed"
      ],
      correctAnswer: 1,
      explanation: "Progressive buzzing and visible sparking indicated contact deterioration leading to dangerous arcing and potential fire risk."
    }
  ];

  const faqs = [
    {
      question: "How can you distinguish between normal switching sparks and dangerous arcing?",
      answer: "Normal switching may produce brief, small sparks that extinguish immediately. Dangerous arcing is sustained, bright, produces carbon deposits, and may be accompanied by buzzing or crackling sounds."
    },
    {
      question: "Can electrical arcing cause fires in non-flammable environments?",
      answer: "Yes, electrical arcs generate extreme temperatures that can ignite dust, vapours, or any combustible materials present. Even 'non-flammable' environments often contain packaging, cleaning materials, or other ignition sources."
    },
    {
      question: "What should maintenance personnel know about arcing hazards?",
      answer: "Train staff to recognise buzzing, crackling sounds, and unusual light flashes. Emphasise that these signs require immediate reporting and that work should stop until qualified electricians investigate."
    },
    {
      question: "How often should equipment prone to arcing be inspected?",
      answer: "High-use switching equipment, contactors, and motor controls should be inspected quarterly. Critical systems may need monthly checks, while domestic installations typically require annual visual inspections."
    },
    {
      question: "What makes some electrical equipment more prone to arcing?",
      answer: "Equipment with mechanical contacts (switches, contactors), high-current circuits, inductive loads, and equipment in harsh environments are most susceptible to arcing faults."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-0 text-sm sm:text-base" asChild>
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
            <div className="p-2 rounded-lg bg-card w-fit">
              <Volume2 className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 w-fit">
              Section 7.3.4
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Buzzing, Arcing and Sparking
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Identifying and responding to audible and visual signs of electrical faults including buzzing, arcing and sparking.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Buzzing, arcing and sparking indicate serious electrical faults requiring immediate action.</li>
                <li>These signs often precede dangerous failures, fires, or explosions.</li>
                <li>Early detection and proper response are critical for safety and preventing escalation.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/30">
              <p className="font-medium mb-2">Spot it / Use it / Check</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Audible buzzing at switches/boards, visible sparking, scorch marks.</li>
                <li><strong>Use:</strong> Immediate isolation, acoustic detection, thermal imaging.</li>
                <li><strong>Check:</strong> Contact condition, connection tightness, load levels.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Recognise audible warning signs including buzzing, crackling, and arcing sounds in electrical equipment.</li>
            <li>Identify visual indicators of sparking and arcing including carbon tracking and contact deterioration.</li>
            <li>Understand the causes and progression of electrical arcing faults and their extreme fire risks.</li>
            <li>Apply systematic investigation procedures for buzzing and sparking electrical equipment.</li>
            <li>Implement immediate safety measures and remedial actions for arcing and sparking faults.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* Identifying Audible Warning Signs */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Identifying Audible and Visual Warning Signs</h3>
            <p className="text-base text-foreground mb-4">
              Buzzing, arcing and sparking are critical warning signs of developing electrical faults that can rapidly escalate to dangerous conditions. These phenomena indicate high-energy electrical disturbances requiring immediate investigation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Buzzing and Humming Sounds</p>
                    <p className="text-base text-foreground mb-2"><strong>Transformer and choke buzzing:</strong> Magnetostriction causing core lamination vibration.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>50Hz or 100Hz humming from fluorescent ballasts and transformers</li>
                      <li>Increasing buzz indicating loose core laminations or overloading</li>
                      <li>High-pitched whining from switch-mode power supplies under stress</li>
                      <li>Irregular buzzing from contactors with worn or misaligned contacts</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Connection buzzing:</strong> Arcing at loose or corroded electrical connections.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Intermittent buzzing from loose terminal connections</li>
                      <li>Crackling sounds indicating micro-arcing between conductors</li>
                      <li>Sizzling or frying sounds from moisture ingress causing tracking</li>
                      <li>Rhythmic buzzing synchronized with load switching cycles</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Emergency response:</strong> Isolate supply immediately - buzzing often precedes dangerous arcing and fire
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="buzzing-arcing-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Arcing and Sparking Phenomena */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Understanding Arcing and Sparking Mechanisms</h3>
            <p className="text-base text-foreground mb-4">
              Electrical arcing represents one of the most dangerous fault conditions in electrical systems, capable of generating extreme temperatures and causing immediate fire or explosion risks:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Electrical Arcing Characteristics</p>
                    <p className="text-base text-foreground mb-2"><strong>Arc formation:</strong> Electrical discharge through ionized air gap between conductors.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Arc temperatures exceeding 3000°C - hotter than steel melting point</li>
                      <li>Intense ultraviolet radiation capable of causing eye damage</li>
                      <li>Metal vapour production creating conductive particles</li>
                      <li>Explosive expansion of air creating pressure waves and noise</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Sparking at contacts:</strong> Normal and abnormal sparking during switching operations.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Brief sparking during normal switch operation with resistive loads</li>
                      <li>Excessive sparking with inductive loads due to back-EMF</li>
                      <li>Sustained arcing indicating worn or damaged switch contacts</li>
                      <li>Carbon tracking following repeated arcing events</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Visual indicators:</strong> Physical evidence of arcing activity.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Black carbon deposits and tracking marks on insulation surfaces</li>
                      <li>Pitted and eroded contact surfaces with metal transfer</li>
                      <li>Scorch marks and heat damage to surrounding components</li>
                      <li>Metal vapour deposits creating conductive films</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="arcing-mechanisms-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Investigation and Response */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Investigation and Emergency Response Procedures</h3>
            <p className="text-base text-foreground mb-4">
              Buzzing, arcing and sparking require immediate and systematic response due to their potential for rapid escalation to dangerous conditions:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Immediate Response Protocol</p>
                    <p className="text-base text-foreground mb-2"><strong>Emergency isolation:</strong> Safe disconnection of electrical supply.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Isolate at the main switch if specific isolation unknown</li>
                      <li>Secure isolation with locks and warning notices</li>
                      <li>Clear area of personnel and remove ignition sources</li>
                      <li>Ensure fire extinguishing equipment is readily available</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Investigation techniques:</strong> Safe methods for fault location.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Visual inspection for scorch marks, carbon tracking, and damage</li>
                      <li>Thermal imaging to identify hotspots and poor connections</li>
                      <li>Ultrasonic detection for high-frequency arcing sounds</li>
                      <li>Connection resistance testing to identify high-resistance joints</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Remedial actions:</strong> Correcting faults and preventing recurrence.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Replace damaged contacts, switches, and accessories</li>
                      <li>Re-terminate connections with proper torque specifications</li>
                      <li>Clean carbon deposits and check insulation resistance</li>
                      <li>Review load levels and upgrade equipment if necessary</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="response-procedures-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="font-medium text-foreground mb-3">Detection Techniques</h3>
              <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
                <li>Use ultrasonic detectors to identify high-frequency arcing sounds not audible to human ears</li>
                <li>Thermal imaging reveals hotspots indicating poor connections before visible damage occurs</li>
                <li>Low-resistance ohmmeters can identify high-resistance connections prone to arcing</li>
                <li>Visual inspection under UV light may reveal carbon tracking not visible in normal light</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-3">Safety Precautions</h3>
              <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
                <li>Never attempt to investigate energised equipment showing signs of arcing</li>
                <li>Maintain safe distances - electrical arcs can extend several metres</li>
                <li>Use appropriate PPE including arc-rated clothing for high-energy systems</li>
                <li>Ensure adequate fire suppression equipment is immediately available</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Examples</h2>
          
          <div className="space-y-6">
            <div className="rounded-lg p-4 border border-border/20 bg-card">
              <h3 className="font-medium text-foreground mb-2">Case Study: Factory Motor Control Panel</h3>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Situation:</strong> Maintenance staff reported increasing buzzing from a 3-phase motor contactor during startup.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Investigation:</strong> Initial visual inspection showed no obvious damage, but thermal imaging revealed one contact running 15°C hotter than others.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Findings:</strong> Contact inspection revealed pitting and metal transfer indicating arcing. The buzzing intensified as contact deterioration progressed.
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Resolution:</strong> Contactor replacement prevented potential fire risk and costly production downtime from complete failure.
              </p>
            </div>

            <div className="rounded-lg p-4 border border-border/20 bg-card">
              <h3 className="font-medium text-foreground mb-2">Case Study: Office Building Distribution Board</h3>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Situation:</strong> Facilities manager reported intermittent crackling sounds from main distribution board during peak load periods.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Investigation:</strong> Ultrasonic detection identified specific MCB positions generating high-frequency noise indicating micro-arcing.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                <strong>Findings:</strong> Main busbar connections had loosened due to thermal cycling, creating high resistance and intermittent arcing.
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Resolution:</strong> Emergency re-termination of all busbar connections with proper torque settings eliminated the arcing risk.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/20 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Recap</h2>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
              <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
              <p className="font-medium text-sm mb-1">Key Warning Signs</p>
              <p className="text-xs text-muted-foreground">Buzzing, crackling, visible sparking, and carbon tracking indicate dangerous electrical faults requiring immediate isolation.</p>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
              <AlertTriangle className="w-5 h-5 text-emerald-400 mb-2" />
              <p className="font-medium text-sm mb-1">Extreme Dangers</p>
              <p className="text-xs text-muted-foreground">Electrical arcing generates temperatures over 3000°C, creating immediate fire and explosion risks requiring emergency response.</p>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
              <Target className="w-5 h-5 text-emerald-400 mb-2" />
              <p className="font-medium text-sm mb-1">Prevention Focus</p>
              <p className="text-xs text-muted-foreground">Proper installation, regular thermal monitoring, and immediate response to early warning signs prevent escalation to dangerous conditions.</p>
            </div>
          </div>
        </Card>

        {/* Knowledge Check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Knowledge Check</h2>
          <Quiz questions={quizQuestions} title="Buzzing, Arcing and Sparking Quiz" />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Button variant="outline" className="flex-1 sm:flex-none" asChild>
            <Link to="../module7-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Smells and Odours
            </Link>
          </Button>
          <Button className="flex-1 sm:flex-none" asChild>
            <Link to="../module7-section3-5">
              Next: User Complaints
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section3_4;