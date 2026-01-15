import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module7Section5_5 = () => {
  useSEO(
    "Avoiding Live Testing Where Possible - Level 2 Module 7 Section 5.5",
    "Safe isolation practices and minimising live working in electrical testing"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "Why is live testing considered dangerous?",
      options: ["It takes longer", "It exposes electricians to shock, burns, and arc flash", "It uses more equipment", "It requires more skill"],
      correctAnswer: 1,
      explanation: "Live testing is dangerous because it exposes electricians to electric shock, severe burns, and arc flash incidents, all of which can be fatal."
    },
    {
      id: 2,
      question: "What regulation underpins the requirement to avoid live testing?",
      options: ["Building Regulations", "Electricity at Work Regulations 1989", "Health and Safety at Work Act", "CDM Regulations"],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989 require work to be carried out safely, which includes avoiding live testing unless absolutely necessary."
    },
    {
      id: 3,
      question: "Give one example of a test that requires live conditions.",
      options: ["Continuity testing", "Insulation resistance testing", "Earth fault loop impedance testing", "Polarity testing with power off"],
      correctAnswer: 2,
      explanation: "Earth fault loop impedance testing requires the circuit to be live to measure the actual fault current path and impedance values."
    },
    {
      id: 4,
      question: "What should always be done before assuming a circuit is safe to work on?",
      options: ["Check the drawings", "Isolate, lock off, and prove dead", "Ask someone else", "Use better tools"],
      correctAnswer: 1,
      explanation: "Safe isolation procedure must always be followed: isolate the supply, lock it off where possible, and prove dead with a proving unit and voltage indicator."
    },
    {
      id: 5,
      question: "What type of PPE should be worn during live testing?",
      options: ["Any gloves and glasses", "Insulated gloves and safety glasses", "Leather gloves only", "No PPE needed"],
      correctAnswer: 1,
      explanation: "Insulated gloves provide protection against electric shock, while safety glasses protect eyes from arc flash and flying debris."
    },
    {
      id: 6,
      question: "Why must GS38-compliant leads be used for live testing?",
      options: ["They're cheaper", "They have safety features like fused leads and reduced exposed metal", "They're more accurate", "They last longer"],
      correctAnswer: 1,
      explanation: "GS38-compliant leads have safety features including fused leads, insulated probes with minimal exposed metal, and finger guards to reduce shock risk."
    },
    {
      id: 7,
      question: "True or False: Live testing should be treated as a normal part of every job.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Live testing should only be carried out when absolutely necessary and safe isolation is not possible. It should never be routine."
    },
    {
      id: 8,
      question: "What must apprentices never do during live testing?",
      options: ["Ask questions", "Work without close supervision from a competent person", "Use PPE", "Follow procedures"],
      correctAnswer: 1,
      explanation: "Apprentices must never carry out live testing without close supervision from a competent person due to the high risks involved."
    },
    {
      id: 9,
      question: "In the refurbishment project example, what went wrong when testing sockets live?",
      options: ["Wrong equipment used", "Probes slipped causing a short circuit and flashover", "No PPE available", "Poor lighting"],
      correctAnswer: 1,
      explanation: "The electrician's probes slipped while testing live, causing a short circuit that resulted in a flashover, burns, and damage to the consumer unit."
    },
    {
      id: 10,
      question: "How was RCD testing carried out safely in the second example?",
      options: ["Working alone quickly", "With supervision, PPE, GS38 leads, and controlled area", "Using different equipment", "Testing during the day only"],
      correctAnswer: 1,
      explanation: "Safe RCD testing involved supervision, proper PPE, GS38-compliant leads, keeping the area clear of non-essential people, and following strict precautions."
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
              <span className="text-white/60">Section 5.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Avoiding Live Testing Where Possible
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
              Safe isolation as the default; reduce live work to the absolute minimum
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 space-y-1 text-sm">
              <li>• Confirm isolation is possible before starting</li>
              <li>• Check lock-off/permit systems are available</li>
              <li>• Ensure proving unit and voltage indicator are ready</li>
              <li>• Consider if risk assessment justifies any live work</li>
            </ul>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <p className="text-white/80 leading-relaxed">
              Live testing is one of the most hazardous activities in electrical work. Whenever possible, circuits should be isolated and proved dead before any testing or investigation is carried out. While some specific tests do require circuits to be live — such as earth fault loop impedance or RCD testing — the guiding principle for electricians is always to avoid live work unless absolutely necessary. Apprentices must understand when live testing is unavoidable, how to minimise the risks, and why safe isolation is the default approach in every situation.
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
                <span>Explain why live testing is dangerous</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">✓</span>
                <span>Describe when live testing may be necessary</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">✓</span>
                <span>Apply safe working practices to control risk</span>
              </li>
            </ul>
          </section>

          {/* Section 1 — Safe Isolation as Default */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Safe Isolation as the Default Approach
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-4">
              <div className="space-y-4 text-sm text-white/80">
                <p><strong className="text-white">Foundation of electrical safety:</strong> Safe isolation is the foundation of electrical safety. Before investigating faults, the electrician should switch off the supply, lock it off where possible, and use a proving unit with a voltage indicator to confirm the circuit is dead. This removes the risk of shock, burns, and arc flash completely.</p>

                <p><strong className="text-white">Not routine or a shortcut:</strong> Working live should never be treated as routine or a shortcut to save time. The default position must always be to isolate first, then test. Every electrician should ask themselves: "Can this be done safely with the power off?" In the vast majority of cases, the answer is yes.</p>

                <p><strong className="text-white">Methodical and documented procedures:</strong> Safe isolation procedures must be methodical and documented. This includes identifying the correct isolator, securing it in the off position with locks where possible, placing warning notices, and using a proving unit to confirm the circuit is dead before starting work.</p>

                <p><strong className="text-white">Lock-off procedures:</strong> Lock-off procedures prevent accidental re-energisation while work is in progress. Where multiple trades are working, a multi-lock system ensures no one person can restore the supply while others are still working. Permits to work may also be required in industrial environments.</p>
              </div>
            </div>

            <InlineCheck
              id="safe-isolation-procedure"
              question="What must be done before assuming a circuit is safe to work on?"
              options={["Check the drawings", "Isolate, lock off, and prove dead", "Ask a colleague", "Use different tools"]}
              correctIndex={1}
              explanation="Safe isolation procedure must always be followed: isolate the supply, lock it off where possible, and prove dead with a proving unit and voltage indicator."
            />
          </section>

          {/* Section 2 — When Live Testing is Unavoidable */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              When Live Testing is Unavoidable
            </h2>
            <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50 mb-4">
              <div className="space-y-4 text-sm text-white/80">
                <p><strong className="text-white">Limited circumstances:</strong> There are limited circumstances where live testing is unavoidable. Examples include measuring earth fault loop impedance (Ze, Zs), verifying polarity under load, testing RCD trip times and ramp testing, measuring prospective fault current, and functional testing of equipment that must be energised.</p>

                <p><strong className="text-white">Risk reduction:</strong> Even in these cases, the risks must be reduced as far as reasonably practicable. This means wearing appropriate PPE such as safety glasses and insulated gloves, ensuring the work area is clear of distractions, and using GS38-compliant instruments with fused leads and finger guards.</p>

                <p><strong className="text-white">Environment control:</strong> The work environment must be controlled: adequate lighting, dry conditions, clear access and egress routes, and barriers to prevent interruption. All non-essential personnel should be kept away from the work area during live testing.</p>

                <p><strong className="text-white">Risk assessments:</strong> Risk assessments for live testing must consider the specific hazards: voltage level, available fault current, environmental conditions, access restrictions, and the competency of personnel. Higher voltages and fault levels require more stringent precautions.</p>
              </div>
            </div>

            <InlineCheck
              id="live-testing-example"
              question="Name a test that requires live conditions."
              options={["Continuity testing", "Insulation resistance", "Earth fault loop impedance", "Polarity (power off)"]}
              correctIndex={2}
              explanation="Earth fault loop impedance testing requires the circuit to be live to measure the actual fault current path and impedance values under normal operating conditions."
            />
          </section>

          {/* Section 3 — Apprentices and Legal Obligations */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Apprentices and Legal Obligations
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50 mb-4">
              <div className="space-y-4 text-sm text-white/80">
                <p><strong className="text-white">Close supervision required:</strong> Apprentices in particular must not carry out live testing without close supervision from a competent person. The risks are too high for someone still learning the trade to work independently on live systems. Supervision means direct oversight, not just being available nearby.</p>

                <p><strong className="text-white">Electricity at Work Regulations 1989:</strong> These regulations place clear duties on employers and employees to prevent danger. Regulation 4 requires that all electrical systems are constructed and maintained to prevent danger, while Regulation 14 specifically addresses work on or near live conductors.</p>

                <p><strong className="text-white">Competency requirements:</strong> Competency must be demonstrated before any live work is undertaken. This includes understanding the equipment, the hazards, the precautions needed, emergency procedures, and rescue techniques. Training and assessment are legal requirements, not optional extras.</p>

                <p><strong className="text-white">Employer duties:</strong> Employers have specific duties under the regulations to ensure only competent persons carry out electrical work, provide appropriate equipment and PPE, establish safe systems of work, and provide adequate training.</p>
              </div>
            </div>

            <InlineCheck
              id="apprentice-supervision"
              question="Can apprentices perform live testing alone?"
              options={["Yes, if they're experienced", "Yes, with the right tools", "No, they must be supervised by a competent person", "Only simple tests"]}
              correctIndex={2}
              explanation="Apprentices must never carry out live testing without close supervision from a competent person due to the high risks and their developing skill level."
            />
          </section>

          {/* Section 4 — Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Practical Guidance and Documentation
            </h2>
            <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50 mb-4">
              <div className="space-y-4 text-sm text-white/80">
                <p><strong className="text-white">Professional approach:</strong> The professional approach is always to ask: "Can this test be done with the power off?" If the answer is yes, isolation should take place immediately. Do not take shortcuts or assume live testing is quicker — the time saved is never worth the risk to life and safety.</p>

                <p><strong className="text-white">Careful planning:</strong> If live testing is absolutely required, plan carefully. Conduct a specific risk assessment, obtain necessary permits, wear appropriate PPE, ensure the area is controlled, and complete the task quickly and efficiently with the correct GS38-compliant equipment.</p>

                <p><strong className="text-white">Documentation:</strong> Always document the reason for working live and the precautions taken. This provides evidence of a professional approach and helps others learn from your risk assessment and control measures. Documentation also demonstrates compliance with legal duties.</p>

                <p><strong className="text-white">Emergency arrangements:</strong> Emergency arrangements must be in place before starting live work. This includes having appropriately trained personnel available for rescue, ensuring communication systems work, and having emergency contact numbers readily available.</p>
              </div>
            </div>

            <InlineCheck
              id="live-work-documentation"
              question="What should be documented when live testing is unavoidable?"
              options={["Only the test results", "The reason for working live and precautions taken", "Just the time taken", "Equipment serial numbers"]}
              correctIndex={1}
              explanation="When live testing is unavoidable, both the justification for working live and all the precautions taken must be documented to demonstrate a professional approach and legal compliance."
            />
          </section>

          {/* Real-World Applications */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real-World Applications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
                <h3 className="font-semibold text-red-400 mb-3">Case Study: Unnecessary Live Testing</h3>
                <p className="text-sm text-white/80 mb-3">
                  On a refurbishment project, an electrician attempted to carry out continuity testing on live socket circuits, believing it would save time. His probes slipped, causing a short circuit that resulted in a flashover. He suffered burns to his hand, and the consumer unit was badly damaged.
                </p>
                <p className="text-sm text-red-400 font-medium">
                  Outcome: Injury and equipment damage from completely avoidable live work.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-semibold text-elec-yellow mb-3">Case Study: Safe RCD Testing</h3>
                <p className="text-sm text-white/80 mb-3">
                  On another site, an apprentice working under supervision needed to carry out RCD trip-time testing. The supervisor ensured all non-essential people were kept clear, the apprentice wore full PPE, and GS38-compliant leads were used. The test was completed safely.
                </p>
                <p className="text-sm text-elec-yellow font-medium">
                  Outcome: Essential testing completed safely with proper precautions and supervision.
                </p>
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
              <div className="p-4 rounded-lg bg-card/30 border border-white/10">
                <p className="font-medium text-white mb-2">Why should live testing be avoided?</p>
                <p className="text-sm text-white/70">Because it exposes electricians to shock, burns, and arc flash. Safe isolation removes these risks completely.</p>
              </div>
              <div className="p-4 rounded-lg bg-card/30 border border-white/10">
                <p className="font-medium text-white mb-2">When is live testing unavoidable?</p>
                <p className="text-sm text-white/70">For tests such as earth fault loop impedance, polarity verification under load, RCD trip times, and functional testing of equipment that must be energised.</p>
              </div>
              <div className="p-4 rounded-lg bg-card/30 border border-white/10">
                <p className="font-medium text-white mb-2">What must always be done before any live test?</p>
                <p className="text-sm text-white/70">Risk assessment, appropriate PPE must be worn, GS38-compliant equipment must be used, and proper supervision arranged for apprentices.</p>
              </div>
              <div className="p-4 rounded-lg bg-card/30 border border-white/10">
                <p className="font-medium text-white mb-2">Can apprentices perform live testing alone?</p>
                <p className="text-sm text-white/70">No. They must always be supervised by a competent person due to the high risks involved.</p>
              </div>
              <div className="p-4 rounded-lg bg-card/30 border border-white/10">
                <p className="font-medium text-white mb-2">What regulation governs avoiding live testing?</p>
                <p className="text-sm text-white/70">The Electricity at Work Regulations 1989, particularly Regulation 14, which states that work should not be carried out on live conductors unless it is unreasonable for it to be dead.</p>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Key Takeaways
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✓</span>
                  <span>Isolate and prove dead by default—live work only when absolutely essential</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✓</span>
                  <span>If live testing is required: PPE, GS38 equipment, controlled environment, and supervision for apprentices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✓</span>
                  <span>Working live without justification or control breaches the Electricity at Work Regulations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">✓</span>
                  <span>Document reasons and precautions whenever live testing cannot be avoided</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} title="Test Your Knowledge: Avoiding Live Testing" />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: PPE & Environment
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Back to Section 5
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section5_5;
