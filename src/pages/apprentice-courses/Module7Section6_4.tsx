import { ArrowLeft, ArrowRight, Wrench, Target, CheckCircle, TestTube, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Rectifying Minor Faults Within Scope - Level 2 Module 7 Section 6.4";
const DESCRIPTION = "Safe rectification of loose connections, miswiring and other minor electrical faults under supervision";

// Quiz Questions
const quizQuestions = [
  {
    id: 1,
    question: "What types of faults are considered minor?",
    options: [
      "Damaged cables in walls",
      "Loose connections, miswiring at accessories, and straightforward termination issues",
      "Failed insulation resistance across circuits",
      "Design issues requiring circuit modifications"
    ],
    correctAnswer: 1,
    explanation: "Minor faults are those that can be corrected quickly and safely without redesigning or replacing major parts of the installation."
  },
  {
    id: 2,
    question: "Why are loose connections still dangerous?",
    options: [
      "They're not dangerous at all",
      "They only affect efficiency",
      "They can cause overheating, arcing, or electric shock",
      "They're just cosmetic issues"
    ],
    correctAnswer: 2,
    explanation: "Loose connections create high resistance, leading to overheating, arcing, and potential fire or shock risks."
  },
  {
    id: 3,
    question: "What must always be done before rectifying a fault?",
    options: [
      "Check with the client first",
      "Safely isolate the circuit and prove dead using a voltage indicator and proving unit",
      "Take photographs for documentation",
      "Order replacement parts"
    ],
    correctAnswer: 1,
    explanation: "Safe isolation and proving dead is essential to eliminate shock and fire risk while working."
  },
  {
    id: 4,
    question: "What is an example of miswiring at a light fitting?",
    options: [
      "Using the wrong cable colour",
      "Switch connected in the neutral rather than the line conductor",
      "Lamp holder mounted too low",
      "Switch positioned incorrectly"
    ],
    correctAnswer: 1,
    explanation: "When the switch is in the neutral, the lamp holder remains live when switched off, creating a dangerous shock risk."
  },
  {
    id: 5,
    question: "Why must repairs always be retested?",
    options: [
      "To meet company policy",
      "To prove the fault has been resolved and the circuit is safe",
      "To use up testing time",
      "To impress supervisors"
    ],
    correctAnswer: 1,
    explanation: "Retesting confirms that the repair is effective, safe, and compliant before the circuit is re-energised."
  },
  {
    id: 6,
    question: "What test should be repeated after correcting a loose CPC?",
    options: [
      "Insulation resistance test",
      "Polarity test",
      "Continuity test",
      "RCD test"
    ],
    correctAnswer: 2,
    explanation: "Continuity testing should be repeated to confirm the CPC connection has been properly restored."
  },
  {
    id: 7,
    question: "True or False: Apprentices can sign off test records after rectifying minor faults.",
    options: [
      "True - if they're competent",
      "False - apprentices must always work under supervision and cannot sign off certifications",
      "True - for minor faults only",
      "True - if supervised"
    ],
    correctAnswer: 1,
    explanation: "Apprentices are not authorised to take full responsibility for installations and cannot sign off test records or certifications."
  },
  {
    id: 8,
    question: "Why is supervision important when apprentices correct faults?",
    options: [
      "To make the work take longer",
      "To ensure safety, proper technique, and professional development while maintaining responsibility",
      "Because it's required by law",
      "To check the apprentice's speed"
    ],
    correctAnswer: 1,
    explanation: "Supervision ensures safety, maintains proper standards, reinforces learning, and provides the necessary authorisation."
  },
  {
    id: 9,
    question: "In the socket circuit example, what fault was corrected by the apprentice?",
    options: [
      "A blown fuse",
      "A loose CPC (earth conductor) at one outlet",
      "Wrong cable size",
      "Incorrect RCD rating"
    ],
    correctAnswer: 1,
    explanation: "The high earth continuity readings were caused by a loose CPC connection that needed re-termination."
  },
  {
    id: 10,
    question: "In the lighting example, why was connecting the switch in the neutral dangerous?",
    options: [
      "It made the light dimmer",
      "It caused the lamp holder to remain live when switched off, creating a shock risk",
      "It used more electricity",
      "It made the switch harder to operate"
    ],
    correctAnswer: 1,
    explanation: "With the switch in the neutral, the line conductor remains permanently connected to the lamp holder, creating a shock hazard even when the light appears off."
  }
];

// Inline Check Questions
const quickCheckQuestions = [
  {
    id: "loose-connections-danger",
    question: "Why are loose connections, even though minor, still dangerous?",
    options: [
      "They're not actually dangerous",
      "They only affect the appearance",
      "They can cause overheating, arcing, and electric shock due to increased resistance",
      "They just need regular tightening"
    ],
    correctIndex: 2,
    explanation: "Loose connections create high resistance points that generate heat, potentially leading to fire, arcing, or shock hazards."
  },
  {
    id: "safe-isolation-first",
    question: "What is the first step before rectifying any electrical fault?",
    options: [
      "Get permission from the client",
      "Safely isolate the circuit and prove dead",
      "Take photos for documentation",
      "Check what tools are needed"
    ],
    correctIndex: 1,
    explanation: "Safe isolation and proving dead must always be the first step to eliminate shock and fire risk."
  },
  {
    id: "retest-importance",
    question: "Why must the same test be repeated after carrying out a repair?",
    options: [
      "To use up testing time",
      "To confirm the fault has been corrected and the circuit is safe for re-energisation",
      "Because it's company policy",
      "To practise using test equipment"
    ],
    correctIndex: 1,
    explanation: "Retesting proves the repair was successful and the circuit meets safety standards before re-energising."
  },
  {
    id: "apprentice-limits",
    question: "Why should apprentices escalate more complex faults instead of attempting them alone?",
    options: [
      "To avoid doing difficult work",
      "Because they lack the authorisation, experience and legal responsibility for complex installations",
      "To make supervisors feel important",
      "Because it's faster"
    ],
    correctIndex: 1,
    explanation: "Apprentices must work within their competence level and cannot take legal responsibility for complex repairs or certifications."
  }
];

// FAQs
const faqs = [
  {
    question: "What faults can apprentices correct under supervision?",
    answer: "Loose connections, miswiring at accessories, and other straightforward termination issues."
  },
  {
    question: "Why is safe isolation necessary before rectification?",
    answer: "To eliminate shock and fire risk while working."
  },
  {
    question: "Why must retesting follow every repair?",
    answer: "To prove the fault has been resolved and the circuit is safe."
  },
  {
    question: "What should apprentices do when faced with complex faults?",
    answer: "Escalate to supervisors or competent persons."
  }
];

export default function Module7Section6_4() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7.6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg bg-card">
              <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs sm:text-sm">
              Section 7.6.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 leading-tight">
            Rectifying Minor Faults Within Scope
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Safe rectification of loose connections, miswiring and other minor electrical faults under supervision
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="font-medium mb-2 sm:mb-3">In 30 seconds</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Always isolate safely and prove dead before starting work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Work only under supervision; never sign off certifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Re-terminate loose connections to correct torque</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Always retest after repair to confirm fault is resolved</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Spot:</strong> Loose terminals, overheating signs, miswired connections, incorrect polarity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Use:</strong> Safe isolation, proper termination techniques, correct test methods</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Check:</strong> Connections secure, correct polarity, retest confirms repair, supervisor approval</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-foreground mb-4">
            Not all faults require major intervention or advanced diagnostic skills. Many faults in domestic and light commercial installations are relatively minor, such as loose connections, incorrectly terminated conductors, or simple miswiring at accessories. Apprentices at Level 2, under supervision, are expected to learn how to identify, correct, and retest these types of faults safely. Developing competence in rectifying minor faults builds confidence, strengthens practical skills, and reduces the likelihood of unsafe conditions being left unresolved.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-foreground mb-4 sm:mb-6">By the end of this subsection, you should be able to:</p>
          
          <div className="bg-card border border-emerald-500/20 rounded-lg p-4 sm:p-5">
            <div className="grid gap-3 sm:gap-4">
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-emerald-500/20 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-medium text-foreground block">Explain which types of minor faults can be rectified within Level 2 scope</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">Distinguish between minor and complex faults requiring escalation</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-emerald-500/20 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-medium text-foreground block">Describe how to correct them safely</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">Master safe isolation, termination techniques, and proper procedures</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-emerald-500/20 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-medium text-foreground block">Understand the importance of retesting and supervision</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">Appreciate verification requirements and professional responsibilities</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">Content / Learning</h2>
          
          {/* Section 1 */}
          <div className="border-l-4 border-l-emerald-500 bg-card pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4 mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-3">1. Understanding Minor Faults</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground leading-relaxed mb-4">
                Minor faults are those that can be corrected quickly and safely without redesigning or replacing major parts of the installation. Examples include loose terminals in sockets or switches, misconnected conductors at an accessory, or incorrectly wired polarity at a light fitting. Although these faults may seem simple, they can still cause serious risks if left unresolved — overheating, arcing, or even electric shock. Recognising them as important is the first step towards safe practice.
              </p>
              
              <p className="text-foreground leading-relaxed mb-3">
                <strong>Common Minor Faults Include:</strong>
              </p>
              <ul className="text-foreground leading-relaxed mb-4 space-y-1">
                <li>• Loose terminal connections in sockets, switches, or accessories</li>
                <li>• Incorrectly terminated conductors (wrong terminals, poor connections)</li>
                <li>• Simple polarity errors at light fittings or socket outlets</li>
                <li>• Loose connections at distribution boards or consumer units</li>
                <li>• Incorrectly wired switching arrangements (2-way/intermediate switching)</li>
                <li>• Poor termination of CPC (earth) conductors</li>
                <li>• Damaged conductor insulation at terminals (requiring re-termination)</li>
              </ul>
              
              <p className="text-foreground leading-relaxed mb-3">
                <strong>Why These Faults Are Dangerous:</strong>
              </p>
              <ul className="text-foreground leading-relaxed mb-4 space-y-1">
                <li>• <strong>Overheating:</strong> Loose connections create high resistance, generating heat that can ignite surrounding materials</li>
                <li>• <strong>Arcing:</strong> Poor connections cause electrical arcing, creating fire risk and equipment damage</li>
                <li>• <strong>Electric Shock:</strong> Incorrect polarity or loose earths remove vital safety protection</li>
                <li>• <strong>Equipment Damage:</strong> Voltage fluctuations from poor connections can damage connected equipment</li>
                <li>• <strong>Progressive Failure:</strong> Small faults often worsen over time if not addressed promptly</li>
              </ul>
            </div>
          </div>

          {/* Inline Check 1 */}
          <div className="mt-3 sm:mt-4 mb-4 sm:mb-6">
            <InlineCheck
              id={quickCheckQuestions[0].id}
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>

          {/* Section 2 */}
          <div className="border-l-4 border-l-green-500 bg-card pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4 mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-3">2. Safe Rectification Practices</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground leading-relaxed mb-4">
                Before attempting to correct any fault, the circuit must be safely isolated and proved dead using a voltage indicator and proving unit. Once safe, the faulty connection should be inspected and corrected. For example, a loose conductor should be re-terminated, ensuring the insulation is not pinched and that the conductor is secured to the correct torque where required. In cases of miswiring, conductors should be relocated to the correct terminals following wiring diagrams or supervisor guidance.
              </p>
              
              <p className="text-foreground leading-relaxed mb-3">
                <strong>Safe Isolation Procedure:</strong>
              </p>
              <ul className="text-foreground leading-relaxed mb-4 space-y-1">
                <li>• Identify the correct circuit and protective device</li>
                <li>• Switch off and lock off the protective device (use lockout/tagout where available)</li>
                <li>• Test your voltage indicator on a known live source</li>
                <li>• Test the circuit to prove it's dead</li>
                <li>• Re-test your voltage indicator on the known live source</li>
                <li>• Apply warning labels/signs to prevent re-energisation</li>
              </ul>
              
              <p className="text-foreground leading-relaxed mb-3">
                <strong>Correct Termination Techniques:</strong>
              </p>
              <ul className="text-foreground leading-relaxed mb-4 space-y-1">
                <li>• Strip conductor insulation to correct length (typically 10-12mm for most terminals)</li>
                <li>• Ensure no conductor strands are cut or damaged during stripping</li>
                <li>• For stranded conductors, twist strands together before termination</li>
                <li>• Insert conductor fully into terminal, ensuring no bare conductor is visible</li>
                <li>• Tighten terminal screws to manufacturer's specified torque (typically 0.8-1.2 Nm for domestic accessories)</li>
                <li>• Check conductor cannot be pulled out with gentle tugging</li>
                <li>• Ensure insulation is not trapped under terminal screws</li>
              </ul>
              
              <p className="text-foreground leading-relaxed mb-3">
                <strong>Correcting Polarity Errors:</strong>
              </p>
              <ul className="text-foreground leading-relaxed mb-4 space-y-1">
                <li>• Line conductor (brown/red) must connect to switch terminals, not lamp holders</li>
                <li>• Neutral conductor (blue/black) provides the return path to the source</li>
                <li>• Earth conductor (green/yellow) connects to earth terminals on all metalwork</li>
                <li>• Use wiring diagrams to verify correct conductor placement</li>
                <li>• Double-check connections before re-energisation</li>
              </ul>
            </div>
          </div>

          {/* Inline Check 2 */}
          <div className="mt-3 sm:mt-4 mb-4 sm:mb-6">
            <InlineCheck
              id={quickCheckQuestions[1].id}
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>

          {/* Section 3 */}
          <div className="border-l-4 border-l-purple-500 bg-card pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4 mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-3">3. Retesting After Repair</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground leading-relaxed mb-4">
                Rectification does not end once the conductor is tightened or reconnected. The same test that revealed the fault must be repeated to confirm it has been corrected. For a loose CPC, continuity should be rechecked; for polarity faults, polarity testing should confirm correctness after repair. This ensures that the repair is safe, compliant, and properly documented. Apprentices should always involve supervisors in retesting, both to confirm results and to reinforce learning.
              </p>
              
              <p className="text-foreground leading-relaxed mb-3">
                <strong>Essential Retest Procedures:</strong>
              </p>
              <ul className="text-foreground leading-relaxed mb-4 space-y-1">
                <li>• <strong>Continuity Testing:</strong> Verify all protective conductors and bonding are continuous</li>
                <li>• <strong>Polarity Testing:</strong> Confirm all single-pole devices are in the line conductor</li>
                <li>• <strong>Insulation Resistance:</strong> Check no damage occurred during repair work</li>
                <li>• <strong>Earth Fault Loop:</strong> Verify effective earthing where circuits have been disturbed</li>
                <li>• <strong>RCD Testing:</strong> Ensure RCD protection remains effective if applicable</li>
                <li>• <strong>Visual Inspection:</strong> Check workmanship meets required standards</li>
              </ul>
              
              <p className="text-foreground leading-relaxed mb-3">
                <strong>Documentation Requirements:</strong>
              </p>
              <ul className="text-foreground leading-relaxed mb-4 space-y-1">
                <li>• Record original fault symptoms and test results</li>
                <li>• Document remedial action taken</li>
                <li>• Record retest results proving fault correction</li>
                <li>• Note any further work required</li>
                <li>• Obtain supervisor verification of work completion</li>
                <li>• Update relevant certificates or test records</li>
              </ul>
              
              <p className="text-foreground leading-relaxed mb-3">
                <strong>When to Involve Supervisors:</strong>
              </p>
              <ul className="text-foreground leading-relaxed mb-4 space-y-1">
                <li>• Always involve supervisors in verifying test results</li>
                <li>• Seek guidance when unsure about correct termination methods</li>
                <li>• Consult supervisors before re-energising circuits</li>
                <li>• Request verification that work meets required standards</li>
                <li>• Involve supervisors in any certification or documentation</li>
              </ul>
            </div>
          </div>

          {/* Inline Check 3 */}
          <div className="mt-3 sm:mt-4 mb-4 sm:mb-6">
            <InlineCheck
              id={quickCheckQuestions[2].id}
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>

          {/* Section 4 */}
          <div className="border-l-4 border-l-orange-500 bg-card pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4 mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-3">4. Limits of Apprentice Competence</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground leading-relaxed mb-4">
                It is important to understand that apprentices are not authorised to take full responsibility for installations. You may correct loose or miswired connections, but you must always work under supervision and never sign off test records or certification. More complex faults — such as damaged cables in walls, failed insulation resistance across circuits, or design issues — must be escalated. Knowing where your role ends is a critical part of professional practice.
              </p>
              
              <p className="text-foreground leading-relaxed mb-3">
                <strong>What Apprentices CAN Do (Under Supervision):</strong>
              </p>
              <ul className="text-foreground leading-relaxed mb-4 space-y-1">
                <li>• Re-terminate loose connections in accessible locations</li>
                <li>• Correct simple miswiring at accessories</li>
                <li>• Replace damaged accessories (like/for/like replacement)</li>
                <li>• Assist with testing under direct supervision</li>
                <li>• Record observations and test results (not certification)</li>
                <li>• Apply temporary safety measures (isolation, labelling)</li>
                <li>• Clean and maintain accessible equipment</li>
              </ul>
              
              <p className="text-foreground leading-relaxed mb-3">
                <strong>What Must Be ESCALATED to Qualified Personnel:</strong>
              </p>
              <ul className="text-foreground leading-relaxed mb-4 space-y-1">
                <li>• Damaged cables within walls, floors, or inaccessible areas</li>
                <li>• Failed insulation resistance indicating cable damage</li>
                <li>• Design faults requiring circuit modifications</li>
                <li>• Protective device coordination issues</li>
                <li>• Earth fault loop impedance problems</li>
                <li>• RCD or RCBO faults requiring replacement</li>
                <li>• Any work requiring certification or notification</li>
                <li>• Faults involving special locations (bathrooms, swimming pools)</li>
              </ul>
              
              <p className="text-foreground leading-relaxed mb-3">
                <strong>Professional Responsibilities:</strong>
              </p>
              <ul className="text-foreground leading-relaxed mb-4 space-y-1">
                <li>• Never exceed your level of competence or authorisation</li>
                <li>• Always work under appropriate supervision</li>
                <li>• Maintain accurate records of all work undertaken</li>
                <li>• Escalate problems promptly and professionally</li>
                <li>• Continue learning and developing skills through training</li>
                <li>• Follow all relevant safety procedures and regulations</li>
              </ul>
            </div>
          </div>

          {/* Inline Check 4 */}
          <div className="mt-3 sm:mt-4 mb-4 sm:mb-6">
            <InlineCheck
              id={quickCheckQuestions[3].id}
              question={quickCheckQuestions[3].question}
              options={quickCheckQuestions[3].options}
              correctIndex={quickCheckQuestions[3].correctIndex}
              explanation={quickCheckQuestions[3].explanation}
            />
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">Practical Guidance</h2>
          
          <div className="grid gap-4 sm:gap-6 mb-6">
            {/* Step-by-Step Fault Rectification */}
            <div className="bg-card border border-emerald-500/20 rounded-lg p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-emerald-400" />
                Step-by-Step Fault Rectification Process
              </h3>
              <ol className="text-foreground leading-relaxed space-y-2 text-sm sm:text-base">
                <li><strong>1. Safe Isolation:</strong> Isolate circuit, lock off, prove dead with voltage indicator</li>
                <li><strong>2. Fault Assessment:</strong> Examine the fault, take photos if permitted, note all observations</li>
                <li><strong>3. Plan Repair:</strong> Identify correct repair method, gather appropriate tools and materials</li>
                <li><strong>4. Execute Repair:</strong> Re-terminate connections to correct torque, follow wiring diagrams</li>
                <li><strong>5. Quality Check:</strong> Verify workmanship, check no damage to surrounding equipment</li>
                <li><strong>6. Retest Circuit:</strong> Repeat original test to confirm fault correction</li>
                <li><strong>7. Documentation:</strong> Record work done, test results, and supervisor verification</li>
                <li><strong>8. Re-energise:</strong> Remove locks/labels, restore power under supervisor approval</li>
              </ol>
            </div>

            {/* Tools and Equipment */}
            <div className="bg-card border border-green-500/20 rounded-lg p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <TestTube className="w-4 h-4 text-emerald-400" />
                Essential Tools and Equipment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Safety Equipment:</p>
                  <ul className="text-foreground leading-relaxed space-y-1 text-sm">
                    <li>• Voltage indicator and proving unit</li>
                    <li>• Lock-out/tag-out devices</li>
                    <li>• Warning labels and barriers</li>
                    <li>• PPE (safety glasses, gloves)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Hand Tools:</p>
                  <ul className="text-foreground leading-relaxed space-y-1 text-sm">
                    <li>• Insulated screwdrivers (slotted and Phillips)</li>
                    <li>• Wire strippers and side cutters</li>
                    <li>• Torque screwdriver (0.5-3.0 Nm range)</li>
                    <li>• Terminal testing probes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Common Pitfalls */}
            <div className="bg-card border border-red-500/20 rounded-lg p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-emerald-400" />
                Common Pitfalls and How to Avoid Them
              </h3>
              <div className="space-y-3 text-sm sm:text-base text-foreground">
                <div>
                  <p className="font-medium mb-1">❌ Over-tightening terminals</p>
                  <p className="text-muted-foreground">✅ Use torque screwdriver, follow manufacturer specifications</p>
                </div>
                <div>
                  <p className="font-medium mb-1">❌ Trapping insulation under screws</p>
                  <p className="text-muted-foreground">✅ Strip to correct length, ensure clean termination</p>
                </div>
                <div>
                  <p className="font-medium mb-1">❌ Not testing after repair</p>
                  <p className="text-muted-foreground">✅ Always retest the original fault condition</p>
                </div>
                <div>
                  <p className="font-medium mb-1">❌ Working without supervision</p>
                  <p className="text-muted-foreground">✅ Involve supervisor in planning, execution, and verification</p>
                </div>
              </div>
            </div>

            {/* Quality Standards */}
            <div className="bg-card border border-purple-500/20 rounded-lg p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Professional Quality Standards
              </h3>
              <ul className="text-foreground leading-relaxed space-y-2 text-sm sm:text-base">
                <li>• <strong>Neatness:</strong> Cables dressed properly, no unnecessary bends or stress</li>
                <li>• <strong>Security:</strong> All connections tight, no loose strands visible</li>
                <li>• <strong>Identification:</strong> Circuits properly labelled, documentation complete</li>
                <li>• <strong>Protection:</strong> All covers replaced, IP ratings maintained</li>
                <li>• <strong>Testing:</strong> All relevant tests completed and recorded</li>
                <li>• <strong>Compliance:</strong> Work meets BS 7671 and local regulations</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Applications */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">Real-World Applications</h2>
          
          <div className="grid gap-4 sm:gap-6">
            {/* Example 1 */}
            <div className="bg-card border border-green-500/20 rounded-lg p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3">Example 1: Domestic Socket Circuit - Loose Earth Connection</h3>
              <div className="space-y-3">
                <p className="text-foreground leading-relaxed">
                  <strong>Situation:</strong> During a routine inspection of a domestic installation, a socket circuit showed high earth continuity readings (2.5Ω instead of expected &lt;0.1Ω). Investigation revealed a loose CPC at one outlet where the earth conductor had worked loose over time.
                </p>
                <p className="text-foreground leading-relaxed">
                  <strong>Action Taken:</strong> The apprentice, supervised by a qualified electrician, safely isolated the circuit, removed the socket faceplate, and found the green/yellow conductor barely held by a single thread in the terminal. The conductor was properly stripped, re-terminated to the correct torque (1.0 Nm), and the circuit retested.
                </p>
                <p className="text-foreground leading-relaxed">
                  <strong>Result:</strong> Earth continuity reading dropped to 0.05Ω, well within acceptable limits.
                </p>
                <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
                  <p className="text-xs sm:text-sm text-foreground">
                    <strong>Lessons Learned:</strong> Regular testing reveals hidden faults; proper termination prevents future problems; simple repairs can prevent serious safety hazards.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-card border border-red-500/20 rounded-lg p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3">Example 2: Lighting Circuit Miswiring - Dangerous Polarity Error</h3>
              <div className="space-y-3">
                <p className="text-foreground leading-relaxed">
                  <strong>Situation:</strong> In a rental flat, a lighting point was miswired with the switch connected in the neutral rather than the line conductor. The light functioned normally, but polarity testing revealed the dangerous error. The lamp holder remained live when switched off, creating a serious shock risk during maintenance.
                </p>
                <p className="text-foreground leading-relaxed">
                  <strong>Action Taken:</strong> The apprentice correctly identified the fault using polarity testing, then under supervision relocated the conductors so the switch interrupted the line conductor. The circuit was retested to confirm correct polarity before re-energisation.
                </p>
                <p className="text-foreground leading-relaxed">
                  <strong>Result:</strong> Polarity testing confirmed the switch now correctly controlled the line conductor, eliminating the shock hazard.
                </p>
                <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
                  <p className="text-xs sm:text-sm text-foreground">
                    <strong>Lessons Learned:</strong> Functional testing alone is insufficient; polarity testing is essential; proper wiring prevents shock hazards during maintenance.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 3 */}
            <div className="bg-card border border-emerald-500/20 rounded-lg p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3">Example 3: Commercial Kitchen - Overheating Socket</h3>
              <div className="space-y-3">
                <p className="text-foreground leading-relaxed">
                  <strong>Situation:</strong> A commercial kitchen reported a socket outlet that was "getting warm" when equipment was plugged in. Investigation revealed a loose neutral connection causing voltage drop and heating under load. The socket showed signs of thermal damage around the neutral terminal.
                </p>
                <p className="text-foreground leading-relaxed">
                  <strong>Action Taken:</strong> The apprentice isolated the circuit and under supervision replaced the damaged socket outlet, re-terminated all connections with proper torque settings, and tested voltage drop under load to confirm the repair was effective.
                </p>
                <p className="text-foreground leading-relaxed">
                  <strong>Result:</strong> Voltage drop reduced from 8V to 2V under full load, eliminating the overheating problem.
                </p>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-3">
                  <p className="text-xs sm:text-sm text-foreground">
                    <strong>Lessons Learned:</strong> Load-related heating indicates poor connections; prompt action prevents fire risk; proper torque settings are critical in high-load applications.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 4 */}
            <div className="bg-card border border-purple-500/20 rounded-lg p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3">Example 4: Office Building - Intermittent Lighting Fault</h3>
              <div className="space-y-3">
                <p className="text-foreground leading-relaxed">
                  <strong>Situation:</strong> An office building reported intermittent operation of fluorescent lights in one area. Testing revealed high resistance in the switch connections due to corrosion and loose terminations in the damp environment near an air conditioning unit.
                </p>
                <p className="text-foreground leading-relaxed">
                  <strong>Action Taken:</strong> The apprentice cleaned the corroded connections, applied contact cleaner, re-terminated all connections, and recommended improved IP protection for the switch location. Environmental factors were documented for future maintenance.
                </p>
                <p className="text-foreground leading-relaxed">
                  <strong>Result:</strong> Lighting operated reliably, and preventive measures were implemented to avoid future corrosion.
                </p>
                <div className="bg-purple-600/10 border border-purple-600/20 rounded p-3">
                  <p className="text-xs sm:text-sm text-foreground">
                    <strong>Lessons Learned:</strong> Environmental factors affect connection quality; preventive maintenance reduces future faults; proper IP ratings are essential in damp locations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">FAQs</h2>
          <div className="grid gap-4 sm:gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-2 border-l-emerald-500/50 pl-4 sm:pl-6">
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">Recap</h2>
          <div className="bg-slate-500/5 border border-slate-500/20 rounded-lg p-4 sm:p-6">
            <div className="space-y-4">
              <p className="text-foreground leading-relaxed mb-4">
                Rectifying minor faults is a crucial skill for Level 2 apprentices, but it must be approached with proper knowledge, supervision, and respect for safety protocols. Here are the key takeaways:
              </p>
              
              <div className="grid gap-3">
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-lg">•</span>
                  <span className="text-foreground">Always isolate circuits safely and prove dead before starting any repair work</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-lg">•</span>
                  <span className="text-foreground">Minor faults like loose connections can cause serious hazards if left unaddressed</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-lg">•</span>
                  <span className="text-foreground">Proper termination techniques and correct torque settings prevent future failures</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-lg">•</span>
                  <span className="text-foreground">Always retest circuits after repair to confirm the fault has been corrected</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-lg">•</span>
                  <span className="text-foreground">Work under supervision and never exceed your level of competence or authorisation</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-lg">•</span>
                  <span className="text-foreground">Escalate complex faults to qualified personnel - know your limits</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-lg">•</span>
                  <span className="text-foreground">Document all work comprehensively for safety and legal compliance</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-lg">•</span>
                  <span className="text-foreground">Quality workmanship protects people and equipment while building professional reputation</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-lg">•</span>
                  <span className="text-foreground">Understanding environmental factors helps prevent recurring faults</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-lg">•</span>
                  <span className="text-foreground">Professional development requires continuous learning and skill improvement</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-400" />
                  If You Only Remember 3 Things:
                </h3>
                <ol className="text-foreground space-y-1 text-sm">
                  <li><strong>1. Safety First:</strong> Always isolate safely and prove dead before any work</li>
                  <li><strong>2. Quality Matters:</strong> Proper terminations and retesting prevent future problems</li>
                  <li><strong>3. Know Your Limits:</strong> Work under supervision and escalate complex issues</li>
                </ol>
              </div>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <Quiz questions={quizQuestions} title="Test Your Knowledge: Rectifying Minor Faults" />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
          <Button variant="outline" className="flex-1" asChild>
            <Link to="module7-section6/3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Isolation and Making Safe
            </Link>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link to="..">
              <ArrowRight className="w-4 h-4 ml-2" />
              Section Overview
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}