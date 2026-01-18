import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Temporary Isolation or Making Safe - Level 2 Module 7 Section 6.3";
const DESCRIPTION = "Safe temporary isolation procedures and emergency measures when faults cannot be immediately repaired";

const quizQuestions = [
  {
    id: 1,
    question: "What is the purpose of temporary isolation?",
    options: [
      "To save time during repairs",
      "To prevent dangerous circuits from being energised until repairs are made",
      "To reduce electricity bills",
      "To test circuit performance"
    ],
    correctAnswer: 1,
    explanation: "Temporary isolation ensures dangerous circuits cannot be energised until proper repairs are completed, preventing accidents and protecting people."
  },
  {
    id: 2,
    question: "Why must faulty circuits never remain live?",
    options: [
      "It wastes electricity",
      "It's against company policy",
      "Because faults can escalate into serious safety hazards, fires, or electrocution risks",
      "It makes testing more difficult"
    ],
    correctAnswer: 2,
    explanation: "Faulty circuits pose escalating safety risks that can lead to fires, electrocution, or other serious accidents if left energised."
  },
  {
    id: 3,
    question: "Give two methods of isolating a circuit.",
    options: [
      "Switching off breakers and removing fuses",
      "Turning off lights and unplugging equipment",
      "Covering sockets and switching off the main switch",
      "Using different test equipment"
    ],
    correctAnswer: 0,
    explanation: "Circuit isolation is achieved through switching off protective devices (breakers), removing fuses, or using lockout kits."
  },
  {
    id: 4,
    question: "What should be attached to a circuit breaker after isolation?",
    options: [
      "A new fuse",
      "Clear warning notices such as 'Do Not Use – Faulty Circuit'",
      "Test equipment",
      "A replacement breaker"
    ],
    correctAnswer: 1,
    explanation: "Clear warning labels must be attached to prevent accidental re-energisation and inform others of the fault status."
  },
  {
    id: 5,
    question: "Why are warning labels important during fault management?",
    options: [
      "They look professional",
      "They're required by law",
      "To ensure no one accidentally restores supply to a faulty circuit",
      "They help with record keeping"
    ],
    correctAnswer: 2,
    explanation: "Warning labels prevent accidental re-energisation of faulty circuits, which could create immediate danger to people and property."
  },
  {
    id: 6,
    question: "Give one example of a temporary safety measure other than isolation.",
    options: [
      "Replacing the entire circuit",
      "Physically removing or covering damaged accessories to prevent use",
      "Installing new equipment",
      "Increasing the fuse rating"
    ],
    correctAnswer: 1,
    explanation: "Physical removal or covering of damaged accessories prevents anyone from attempting to use faulty equipment."
  },
  {
    id: 7,
    question: "Who is responsible for permanent fault rectification?",
    options: [
      "Any apprentice",
      "The building owner",
      "A competent person or supervisor with appropriate qualifications",
      "The person who found the fault"
    ],
    correctAnswer: 2,
    explanation: "Only competent persons with appropriate qualifications and authority can certify permanent fault rectification."
  },
  {
    id: 8,
    question: "True or False: Apprentices can certify isolated circuits as safe for re-energisation.",
    options: [
      "True - after proper training",
      "False - apprentices must hand over responsibility to competent persons",
      "True - if supervised",
      "True - for minor faults only"
    ],
    correctAnswer: 1,
    explanation: "Apprentices cannot certify circuits as safe for re-energisation; this responsibility must be handed over to competent persons."
  },
  {
    id: 9,
    question: "In the housing estate example, what measures made the socket safe until repair?",
    options: [
      "Just switching off the circuit",
      "Circuit isolation, removing the faulty faceplate, and clear labelling",
      "Only removing the socket",
      "Covering the socket with tape"
    ],
    correctAnswer: 1,
    explanation: "Multiple safety measures were used: isolation at the consumer unit, physical removal of the faulty faceplate, and clear warning labelling."
  },
  {
    id: 10,
    question: "What went wrong in the commercial building example when a lighting circuit was left energised?",
    options: [
      "The lights didn't work properly",
      "No isolation or warning was applied, leading to a fire from overheating",
      "The circuit tripped too often",
      "The repair was too expensive"
    ],
    correctAnswer: 1,
    explanation: "The faulty circuit was left energised without isolation or warnings, allowing continued overheating that eventually caused a fire."
  }
];

const faqs = [
  {
    question: "Why is temporary isolation important?",
    answer: "To prevent dangerous circuits from being energised until repairs are made."
  },
  {
    question: "What methods can be used to isolate circuits?",
    answer: "Switching off breakers, removing fuses, or using lockout kits."
  },
  {
    question: "Why must labels and warnings be used?",
    answer: "To ensure no one accidentally restores supply to a faulty circuit."
  },
  {
    question: "What should apprentices do after isolating a fault?",
    answer: "Report it immediately and hand over responsibility to a competent person."
  }
];

export default function Module7Section6_3() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
            <span>Section 6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Temporary Isolation or Making Safe
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Safe temporary isolation procedures and emergency measures when faults cannot be immediately repaired
          </p>
        </header>

        {/* In 30 Seconds Summary */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
          <h2 className="font-semibold text-white mb-2">In 30 Seconds</h2>
          <ul className="text-white/80 space-y-1 text-sm">
            <li>• Isolate the faulty circuit at the distribution board immediately</li>
            <li>• Apply clear warning labels: "Do Not Use – Faulty Circuit"</li>
            <li>• Remove or cover damaged accessories to prevent use</li>
            <li>• Report immediately and hand over to competent person</li>
          </ul>
        </div>

        {/* Section 1 — The Principle of Making Safe */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Principle of Making Safe
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>The priority when a dangerous fault is found is to prevent it from endangering people or property. If a circuit shows signs of overheating, arcing, or damaged insulation, it should not remain live. Temporary isolation means disconnecting the circuit at the distribution board, locking it off if possible, and clearly labelling it so no one restores it accidentally. This ensures the circuit cannot be energised until repairs are carried out.</p>

            <p><strong>Signs of Immediate Danger:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Overheating components (hot to touch, discolouration)</li>
              <li>Arcing or sparking at connections</li>
              <li>Burning smell or scorched materials</li>
              <li>Circuit tripping under normal load</li>
              <li>Damaged insulation or cable sheathing</li>
              <li>Compromised enclosures or damaged accessories</li>
            </ul>

            <p><strong>Immediate Actions:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Isolate at the distribution board immediately</li>
              <li>Prove dead if safe isolation procedures require</li>
              <li>Apply clear, durable warning labels</li>
              <li>Communicate the hazard to relevant persons</li>
              <li>Control access to prevent inadvertent contact</li>
            </ul>

            <p><strong>Core Principles:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Prevent energisation:</strong> Ensure faulty circuits cannot be switched back on</li>
              <li><strong>Prevent contact:</strong> Remove or cover exposed live parts</li>
              <li><strong>Prevent escalation:</strong> Stop faults from developing into serious incidents</li>
            </ul>
          </div>
        </section>

        <InlineCheck
          id="why-must-not-energised"
          question="Why must a faulty circuit never be left energised while awaiting repair?"
          options={["It's not cost-effective", "Because faults can escalate into serious safety hazards including fires and electrocution", "It makes testing more difficult", "It's against company policy"]}
          correctIndex={1}
          explanation="Faulty circuits pose escalating safety risks that can lead to serious accidents if left energised."
        />

        {/* Section 2 — Methods of Isolation and Labelling */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Methods of Isolation and Labelling
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>Isolation may involve switching off a protective device, removing a fuse, or locking off a breaker using a lockout kit. Whichever method is used, it must be obvious that the circuit is out of service. Clear warning notices such as "Do Not Use – Faulty Circuit" should be attached to the board or accessory. Where only part of an installation is faulty, electricians should isolate just the affected section, ensuring the rest of the installation remains usable and safe.</p>

            <p><strong>Isolation Methods:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>MCB/RCBO OFF + lockout:</strong> Switch off and apply lockout device with personal tag</li>
              <li><strong>Fuse removal:</strong> Withdraw fuses completely, store safely, label holder</li>
              <li><strong>Main switch isolation:</strong> For total isolation when required (partial vs complete)</li>
              <li><strong>Industrial isolators:</strong> Padlock in OFF position using LOTO kit</li>
              <li><strong>Plug removal:</strong> Appropriate for portable equipment where applicable</li>
            </ul>

            <p><strong>Labelling Standards:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Wording:</strong> Clear, specific - "DO NOT USE - FAULTY CIRCUIT"</li>
              <li><strong>Placement:</strong> Visible at distribution board AND point of use</li>
              <li><strong>Durability:</strong> Weather-resistant, tear-proof materials</li>
              <li><strong>Information:</strong> Contact details, date/time, reason for isolation</li>
            </ul>

            <p><strong>Partial Isolation Considerations:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Clearly define boundaries of what remains live</li>
              <li>Prove dead beyond the point of isolation</li>
              <li>Document what circuits remain energised</li>
              <li>Ensure adequate labels at all relevant points</li>
            </ul>
          </div>
        </section>

        <InlineCheck
          id="warning-labels"
          question="What should always be attached after isolating a circuit to prevent accidental use?"
          options={["New test equipment", "Clear warning notices such as 'Do Not Use – Faulty Circuit'", "Replacement parts", "Additional protective devices"]}
          correctIndex={1}
          explanation="Warning labels are essential to prevent accidental re-energisation of faulty circuits."
        />

        {/* Section 3 — Emergency Measures Beyond Isolation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Emergency Measures Beyond Isolation
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>Sometimes, faults require additional temporary precautions. For example, if a damaged socket is overheating, the accessory should be physically removed or covered to prevent anyone using it. In industrial settings, barriers or restricted access may be needed if exposed live parts are present. These steps do not replace proper repairs but reduce immediate risk until a competent person can carry out permanent rectification.</p>

            <p><strong>Examples by Environment:</strong></p>

            <p className="font-medium mt-4">Domestic:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
              <li>Remove damaged socket faceplates completely</li>
              <li>Blank off outlets with proper blanking plates</li>
              <li>Use temporary barriers around damaged accessories</li>
              <li>Secure loose cables in temporary containment</li>
            </ul>

            <p className="font-medium mt-4">Commercial/Industrial:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
              <li>Cordon off affected areas with barrier tape</li>
              <li>Erect physical barriers around exposed equipment</li>
              <li>Apply temporary IP-rated covers to damaged enclosures</li>
              <li>Position warning signage at all access points</li>
            </ul>

            <p className="font-medium mt-4">Wet/Dusty Environments:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
              <li>Use appropriate IP-rated temporary covers</li>
              <li>Ensure no exposed conductive parts remain</li>
              <li>Consider environmental protection requirements</li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <h5 className="font-medium text-green-400 text-sm mb-2">DO:</h5>
                <ul className="list-disc list-inside space-y-1 text-xs text-white/70">
                  <li>Remove or physically cover damaged items</li>
                  <li>Restrict access to affected areas</li>
                  <li>Escalate quickly to competent persons</li>
                  <li>Document all measures taken</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <h5 className="font-medium text-red-400 text-sm mb-2">DON'T:</h5>
                <ul className="list-disc list-inside space-y-1 text-xs text-white/70">
                  <li>Up-rate protective devices as a quick fix</li>
                  <li>Bypass safety devices or interlocks</li>
                  <li>Use tape over live parts without isolation</li>
                  <li>Leave exposed live conductors accessible</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          id="temporary-measures"
          question="Give one example of a temporary measure, apart from isolation, that can make a faulty accessory safe."
          options={["Replacing the entire installation", "Physically removing or covering the damaged accessory to prevent use", "Increasing the circuit protection", "Installing additional earthing"]}
          correctIndex={1}
          explanation="Physical removal or covering prevents anyone from attempting to use damaged accessories."
        />

        {/* Section 4 — Limits of Apprentice Responsibility */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Limits of Apprentice Responsibility
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>Apprentices at Level 2 must understand their limits. You may be required to isolate a circuit under supervision and attach warning labels, but you cannot certify that a fault has been fully rectified. Making safe means preventing danger, not attempting unsupervised repairs beyond your competence. Once a fault is isolated or controlled, it must be reported and handed over to a supervisor or duty holder for permanent resolution.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <h4 className="font-medium text-green-400 mb-2">You CAN:</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-white/70">
                  <li>Isolate circuits under supervision</li>
                  <li>Apply tags and warning labels correctly</li>
                  <li>Secure and cordon off unsafe areas</li>
                  <li>Record findings and report accurately</li>
                  <li>Assist with testing under supervision</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <h4 className="font-medium text-red-400 mb-2">You MUST NOT:</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-white/70">
                  <li>Certify circuits as safe for re-energisation</li>
                  <li>Alter protective device ratings</li>
                  <li>Carry out unsupervised permanent repairs</li>
                  <li>Defeat interlocks or safety systems</li>
                  <li>Authorise work on live systems</li>
                </ul>
              </div>
            </div>

            <p className="mt-6"><strong>Handover Protocol:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Who to notify:</strong> Supervisor, duty holder, or designated competent person</li>
              <li><strong>What to record:</strong> Nature of fault, measures taken, circuits isolated, labels applied</li>
              <li><strong>What to leave in place:</strong> All isolation devices, warning labels, barriers</li>
              <li><strong>When to follow up:</strong> Confirm receipt of handover, obtain acknowledgment</li>
            </ul>
          </div>
        </section>

        <InlineCheck
          id="apprentice-limits"
          question="Why is it important for apprentices to hand over responsibility after making safe?"
          options={["To avoid doing too much work", "Because apprentices cannot certify permanent repairs or authorise re-energisation", "It's company procedure", "To share the workload"]}
          correctIndex={1}
          explanation="Apprentices must work within their competence limits and cannot certify permanent rectification."
        />

        {/* 6-Step Isolation Checklist */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            6-Step Isolation Checklist
          </h2>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80">
              <div className="space-y-2">
                <p><strong>1. Identify:</strong> Accurately identify the circuit (labels, testing)</p>
                <p><strong>2. Isolate:</strong> Switch off at correct protective device</p>
                <p><strong>3. Lockout:</strong> Apply lockout device with personal tag</p>
              </div>
              <div className="space-y-2">
                <p><strong>4. Prove Dead:</strong> Test your tester, test circuit, re-test your tester</p>
                <p><strong>5. Control:</strong> Apply barriers, covers, restrict access</p>
                <p><strong>6. Report:</strong> Document and handover to competent person</p>
              </div>
            </div>
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
              <h4 className="font-semibold text-green-400 mb-3">Housing Estate Success</h4>
              <p className="text-white/80 text-sm mb-3">
                On a housing estate, a loose connection in a kitchen socket was identified during testing. The socket showed signs of overheating, but the repair team could not attend immediately. The electrician isolated the circuit at the consumer unit, removed the faulty socket faceplate, and placed a clear label stating "Do Not Use." When the repair team returned the next day, they carried out the repair safely without risk to occupants.
              </p>
              <p className="text-white/60 text-xs"><strong>What went well:</strong> Immediate isolation prevented escalation, physical removal prevented accidental use, clear labelling informed all users, proper handover to repair team</p>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <h4 className="font-semibold text-red-400 mb-3">Commercial Building Failure</h4>
              <p className="text-white/80 text-sm mb-3">
                In a commercial building, a faulty lighting circuit was left energised despite repeated tripping. No isolation or warning was applied, and a fire later broke out due to overheating at a junction box. The incident report concluded that temporary isolation would have prevented the damage and associated costs.
              </p>
              <p className="text-white/60 text-xs"><strong>What went wrong:</strong> Circuit left live despite obvious fault, no warning labels or barriers applied, fault allowed to escalate unchecked, fire damage and business interruption costs</p>
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
              <li>• <strong>Make it safe</strong> - Isolate and secure immediately</li>
              <li>• <strong>Label and communicate</strong> - Prevent accidental re-energisation</li>
              <li>• <strong>Handover to competent person</strong> - Know your limits</li>
            </ul>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10 min-h-[48px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../6-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Reporting Faults
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../6-4">
              Next: Rectifying Minor Faults
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
