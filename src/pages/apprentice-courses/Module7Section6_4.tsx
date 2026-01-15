import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Rectifying Minor Faults Within Scope - Level 2 Module 7 Section 6.4";
const DESCRIPTION = "Safe rectification of loose connections, miswiring and other minor electrical faults under supervision";

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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10 p-2 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Section 7.6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <BookOpen className="w-4 h-4" />
            <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
            <span>Section 6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Rectifying Minor Faults Within Scope
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Safe rectification of loose connections, miswiring and other minor electrical faults under supervision
          </p>
        </header>

        {/* In 30 Seconds Summary */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
          <h2 className="font-semibold text-white mb-2">In 30 Seconds</h2>
          <ul className="text-white/80 space-y-1 text-sm">
            <li>• Always isolate safely and prove dead before starting work</li>
            <li>• Work only under supervision; never sign off certifications</li>
            <li>• Re-terminate loose connections to correct torque</li>
            <li>• Always retest after repair to confirm fault is resolved</li>
          </ul>
        </div>

        {/* Section 1 — Understanding Minor Faults */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Minor Faults
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>Minor faults are those that can be corrected quickly and safely without redesigning or replacing major parts of the installation. Examples include loose terminals in sockets or switches, misconnected conductors at an accessory, or incorrectly wired polarity at a light fitting. Although these faults may seem simple, they can still cause serious risks if left unresolved — overheating, arcing, or even electric shock. Recognising them as important is the first step towards safe practice.</p>

            <p><strong>Common Minor Faults Include:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Loose terminal connections in sockets, switches, or accessories</li>
              <li>Incorrectly terminated conductors (wrong terminals, poor connections)</li>
              <li>Simple polarity errors at light fittings or socket outlets</li>
              <li>Loose connections at distribution boards or consumer units</li>
              <li>Incorrectly wired switching arrangements (2-way/intermediate switching)</li>
              <li>Poor termination of CPC (earth) conductors</li>
              <li>Damaged conductor insulation at terminals (requiring re-termination)</li>
            </ul>

            <p><strong>Why These Faults Are Dangerous:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Overheating:</strong> Loose connections create high resistance, generating heat that can ignite surrounding materials</li>
              <li><strong>Arcing:</strong> Poor connections cause electrical arcing, creating fire risk and equipment damage</li>
              <li><strong>Electric Shock:</strong> Incorrect polarity or loose earths remove vital safety protection</li>
              <li><strong>Equipment Damage:</strong> Voltage fluctuations from poor connections can damage connected equipment</li>
              <li><strong>Progressive Failure:</strong> Small faults often worsen over time if not addressed promptly</li>
            </ul>
          </div>
        </section>

        <InlineCheck
          id="loose-connections-danger"
          question="Why are loose connections, even though minor, still dangerous?"
          options={["They're not actually dangerous", "They only affect the appearance", "They can cause overheating, arcing, and electric shock due to increased resistance", "They just need regular tightening"]}
          correctIndex={2}
          explanation="Loose connections create high resistance points that generate heat, potentially leading to fire, arcing, or shock hazards."
        />

        {/* Section 2 — Safe Rectification Practices */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Safe Rectification Practices
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>Before attempting to correct any fault, the circuit must be safely isolated and proved dead using a voltage indicator and proving unit. Once safe, the faulty connection should be inspected and corrected. For example, a loose conductor should be re-terminated, ensuring the insulation is not pinched and that the conductor is secured to the correct torque where required. In cases of miswiring, conductors should be relocated to the correct terminals following wiring diagrams or supervisor guidance.</p>

            <p><strong>Safe Isolation Procedure:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Identify the correct circuit and protective device</li>
              <li>Switch off and lock off the protective device (use lockout/tagout where available)</li>
              <li>Test your voltage indicator on a known live source</li>
              <li>Test the circuit to prove it's dead</li>
              <li>Re-test your voltage indicator on the known live source</li>
              <li>Apply warning labels/signs to prevent re-energisation</li>
            </ul>

            <p><strong>Correct Termination Techniques:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Strip conductor insulation to correct length (typically 10-12mm for most terminals)</li>
              <li>Ensure no conductor strands are cut or damaged during stripping</li>
              <li>For stranded conductors, twist strands together before termination</li>
              <li>Insert conductor fully into terminal, ensuring no bare conductor is visible</li>
              <li>Tighten terminal screws to manufacturer's specified torque (typically 0.8-1.2 Nm for domestic accessories)</li>
              <li>Check conductor cannot be pulled out with gentle tugging</li>
              <li>Ensure insulation is not trapped under terminal screws</li>
            </ul>

            <p><strong>Correcting Polarity Errors:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Line conductor (brown/red) must connect to switch terminals, not lamp holders</li>
              <li>Neutral conductor (blue/black) provides the return path to the source</li>
              <li>Earth conductor (green/yellow) connects to earth terminals on all metalwork</li>
              <li>Use wiring diagrams to verify correct conductor placement</li>
              <li>Double-check connections before re-energisation</li>
            </ul>
          </div>
        </section>

        <InlineCheck
          id="safe-isolation-first"
          question="What is the first step before rectifying any electrical fault?"
          options={["Get permission from the client", "Safely isolate the circuit and prove dead", "Take photos for documentation", "Check what tools are needed"]}
          correctIndex={1}
          explanation="Safe isolation and proving dead must always be the first step to eliminate shock and fire risk."
        />

        {/* Section 3 — Retesting After Repair */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Retesting After Repair
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>Rectification does not end once the conductor is tightened or reconnected. The same test that revealed the fault must be repeated to confirm it has been corrected. For a loose CPC, continuity should be rechecked; for polarity faults, polarity testing should confirm correctness after repair. This ensures that the repair is safe, compliant, and properly documented. Apprentices should always involve supervisors in retesting, both to confirm results and to reinforce learning.</p>

            <p><strong>Essential Retest Procedures:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Continuity Testing:</strong> Verify all protective conductors and bonding are continuous</li>
              <li><strong>Polarity Testing:</strong> Confirm all single-pole devices are in the line conductor</li>
              <li><strong>Insulation Resistance:</strong> Check no damage occurred during repair work</li>
              <li><strong>Earth Fault Loop:</strong> Verify effective earthing where circuits have been disturbed</li>
              <li><strong>RCD Testing:</strong> Ensure RCD protection remains effective if applicable</li>
              <li><strong>Visual Inspection:</strong> Check workmanship meets required standards</li>
            </ul>

            <p><strong>Documentation Requirements:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Record original fault symptoms and test results</li>
              <li>Document remedial action taken</li>
              <li>Record retest results proving fault correction</li>
              <li>Note any further work required</li>
              <li>Obtain supervisor verification of work completion</li>
              <li>Update relevant certificates or test records</li>
            </ul>

            <p><strong>When to Involve Supervisors:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Always involve supervisors in verifying test results</li>
              <li>Seek guidance when unsure about correct termination methods</li>
              <li>Consult supervisors before re-energising circuits</li>
              <li>Request verification that work meets required standards</li>
              <li>Involve supervisors in any certification or documentation</li>
            </ul>
          </div>
        </section>

        <InlineCheck
          id="retest-importance"
          question="Why must the same test be repeated after carrying out a repair?"
          options={["To use up testing time", "To confirm the fault has been corrected and the circuit is safe for re-energisation", "Because it's company policy", "To practise using test equipment"]}
          correctIndex={1}
          explanation="Retesting proves the repair was successful and the circuit meets safety standards before re-energising."
        />

        {/* Section 4 — Limits of Apprentice Competence */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Limits of Apprentice Competence
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>It is important to understand that apprentices are not authorised to take full responsibility for installations. You may correct loose or miswired connections, but you must always work under supervision and never sign off test records or certification. More complex faults — such as damaged cables in walls, failed insulation resistance across circuits, or design issues — must be escalated. Knowing where your role ends is a critical part of professional practice.</p>

            <p><strong>What Apprentices CAN Do (Under Supervision):</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Re-terminate loose connections in accessible locations</li>
              <li>Correct simple miswiring at accessories</li>
              <li>Replace damaged accessories (like/for/like replacement)</li>
              <li>Assist with testing under direct supervision</li>
              <li>Record observations and test results (not certification)</li>
              <li>Apply temporary safety measures (isolation, labelling)</li>
              <li>Clean and maintain accessible equipment</li>
            </ul>

            <p><strong>What Must Be ESCALATED to Qualified Personnel:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Damaged cables within walls, floors, or inaccessible areas</li>
              <li>Failed insulation resistance indicating cable damage</li>
              <li>Design faults requiring circuit modifications</li>
              <li>Protective device coordination issues</li>
              <li>Earth fault loop impedance problems</li>
              <li>RCD or RCBO faults requiring replacement</li>
              <li>Any work requiring certification or notification</li>
              <li>Faults involving special locations (bathrooms, swimming pools)</li>
            </ul>

            <p><strong>Professional Responsibilities:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Never exceed your level of competence or authorisation</li>
              <li>Always work under appropriate supervision</li>
              <li>Maintain accurate records of all work undertaken</li>
              <li>Escalate problems promptly and professionally</li>
              <li>Continue learning and developing skills through training</li>
              <li>Follow all relevant safety procedures and regulations</li>
            </ul>
          </div>
        </section>

        <InlineCheck
          id="apprentice-limits"
          question="Why should apprentices escalate more complex faults instead of attempting them alone?"
          options={["To avoid doing difficult work", "Because they lack the authorisation, experience and legal responsibility for complex installations", "To make supervisors feel important", "Because it's faster"]}
          correctIndex={1}
          explanation="Apprentices must work within their competence level and cannot take legal responsibility for complex repairs or certifications."
        />

        {/* Step-by-Step Fault Rectification Process */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Step-by-Step Fault Rectification Process
          </h2>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <ol className="text-white/80 space-y-2 text-sm">
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
        </section>

        {/* Real-World Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Real-World Applications
          </h2>
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
              <h4 className="font-semibold text-green-400 mb-3">Example 1: Domestic Socket Circuit - Loose Earth Connection</h4>
              <p className="text-white/80 text-sm mb-3">
                <strong>Situation:</strong> During a routine inspection of a domestic installation, a socket circuit showed high earth continuity readings (2.5Ω instead of expected &lt;0.1Ω). Investigation revealed a loose CPC at one outlet where the earth conductor had worked loose over time.
              </p>
              <p className="text-white/80 text-sm mb-3">
                <strong>Action Taken:</strong> The apprentice, supervised by a qualified electrician, safely isolated the circuit, removed the socket faceplate, and found the green/yellow conductor barely held by a single thread in the terminal. The conductor was properly stripped, re-terminated to the correct torque (1.0 Nm), and the circuit retested.
              </p>
              <p className="text-white/80 text-sm mb-3">
                <strong>Result:</strong> Earth continuity reading dropped to 0.05Ω, well within acceptable limits.
              </p>
              <p className="text-white/60 text-xs"><strong>Lessons Learned:</strong> Regular testing reveals hidden faults; proper termination prevents future problems; simple repairs can prevent serious safety hazards.</p>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <h4 className="font-semibold text-red-400 mb-3">Example 2: Lighting Circuit Miswiring - Dangerous Polarity Error</h4>
              <p className="text-white/80 text-sm mb-3">
                <strong>Situation:</strong> In a rental flat, a lighting point was miswired with the switch connected in the neutral rather than the line conductor. The light functioned normally, but polarity testing revealed the dangerous error. The lamp holder remained live when switched off, creating a serious shock risk during maintenance.
              </p>
              <p className="text-white/80 text-sm mb-3">
                <strong>Action Taken:</strong> The apprentice correctly identified the fault using polarity testing, then under supervision relocated the conductors so the switch interrupted the line conductor. The circuit was retested to confirm correct polarity before re-energisation.
              </p>
              <p className="text-white/80 text-sm mb-3">
                <strong>Result:</strong> Polarity testing confirmed the switch now correctly controlled the line conductor, eliminating the shock hazard.
              </p>
              <p className="text-white/60 text-xs"><strong>Lessons Learned:</strong> Functional testing alone is insufficient; polarity testing is essential; proper wiring prevents shock hazards during maintenance.</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-white mb-2">{faq.question}</h4>
                <p className="text-sm text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-10">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h2 className="font-semibold text-white mb-3">If You Only Remember 3 Things</h2>
            <ul className="text-white/80 space-y-2 text-sm">
              <li>• <strong>Safety First:</strong> Always isolate safely and prove dead before any work</li>
              <li>• <strong>Quality Matters:</strong> Proper terminations and retesting prevent future problems</li>
              <li>• <strong>Know Your Limits:</strong> Work under supervision and escalate complex issues</li>
            </ul>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <Quiz questions={quizQuestions} title="Rectifying Minor Faults" />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10 min-h-[48px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../6-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Temporary Isolation
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../6-5">
              Next: Re-Testing and Certification
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
