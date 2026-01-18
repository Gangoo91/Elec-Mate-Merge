import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m6s2-check1",
    question: "Who holds the legal duty for emergency lighting maintenance under the Fire Safety Order?",
    options: ["The electrician", "The Responsible Person", "The fire authority", "Building insurance company"],
    correctIndex: 1,
    explanation: "The Responsible Person (employer, building owner, landlord, or facilities manager) holds legal duty under the Regulatory Reform (Fire Safety) Order 2005. They cannot fully delegate this accountability."
  },
  {
    id: "emergencylighting-m6s2-check2",
    question: "Why must emergency lighting operate independently of fire alarm systems?",
    options: ["To reduce costs", "Power failure may occur without fire", "For aesthetic reasons", "It is not required"],
    correctIndex: 1,
    explanation: "Emergency lighting must activate on mains failure regardless of alarm status. Power failures can occur without fire, and fires may not trigger alarms immediately. Systems need separate, independent supplies."
  },
  {
    id: "emergencylighting-m6s2-check3",
    question: "What document determines specific emergency lighting requirements for a building?",
    options: ["Architect's drawings", "Fire risk assessment (FRA)", "Electrical contractor's estimate", "Insurance policy"],
    correctIndex: 1,
    explanation: "The fire risk assessment (FRA), required under Article 9 of the RRO, determines requirements based on building type, occupancy, and evacuation strategy. BS 5266-1 then defines how to achieve them."
  }
];

const faqs = [
  {
    question: "Does the Fire Safety Order specify lighting levels?",
    answer: "No - the RRO requires 'suitable' emergency lighting but does not specify technical criteria. BS 5266-1 and EN 1838 provide the measurable standards to prove suitability. Compliance with these standards satisfies the RRO."
  },
  {
    question: "Can emergency lighting and fire alarms share circuits?",
    answer: "No. Emergency lighting must be independently supplied and operate on mains failure regardless of fire alarm status. Sharing circuits creates dangerous single points of failure."
  },
  {
    question: "How often must fire safety integration be reviewed?",
    answer: "The FRA must be reviewed annually minimum, and after any significant changes to premises, use, or occupancy levels. Emergency lighting should be reviewed whenever building layout changes."
  },
  {
    question: "Am I liable as the electrician for integration failures?",
    answer: "Potentially yes. Designers and contractors can face negligence claims if non-compliant design or installation contributes to harm. Always consult the FRA and document all concerns raised."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A building's emergency lighting passes commissioning tests but documentation is not included in the Fire Safety Strategy. What is the compliance status?",
    options: [
      "Fully compliant - system works correctly",
      "Non-compliant - integration cannot be demonstrated",
      "Partially compliant - documentation is optional",
      "Compliant if client accepts verbal confirmation"
    ],
    correctAnswer: 1,
    explanation: "Fire authorities treat documentation of integration as essential evidence of compliance. Without documented integration with the fire strategy, the system is classified as non-compliant even if it functions correctly."
  }
];

const EmergencyLightingModule6Section2 = () => {
  useSEO({
    title: "Integration with Fire Safety Regulations | Emergency Lighting Module 6.2",
    description: "Understand how emergency lighting integrates with UK fire safety legislation, the Fire Safety Order 2005, fire risk assessments, and evacuation strategies."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Integration with Fire Safety Regulations
          </h1>
          <p className="text-white/80">
            How emergency lighting fits within UK fire safety legislation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>RRO 2005:</strong> Primary UK fire legislation</li>
              <li><strong>Responsible Person:</strong> Legal duty holder</li>
              <li><strong>FRA:</strong> Defines requirements</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Integration Points</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Fire alarms:</strong> Independent but coordinated</li>
              <li><strong>Evacuation:</strong> Support strategy</li>
              <li><strong>Documentation:</strong> Fire strategy folder</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the Fire Safety Order 2005",
              "Identify the Responsible Person",
              "Coordinate with fire alarm systems",
              "Integrate with evacuation strategies",
              "Work with fire risk assessments",
              "Prepare for fire authority audits"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Fire Safety Order 2005
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Regulatory Reform (Fire Safety) Order 2005 (RRO) is the primary fire
              safety legislation in England and Wales. It places legal duties on the
              Responsible Person to ensure occupants can safely evacuate.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Responsible Person Is</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Employer (for workplaces)</li>
                  <li>Building owner or landlord</li>
                  <li>Managing agent</li>
                  <li>Delegated facilities manager</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Obligations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Illuminate escape routes</li>
                  <li>Test at specified intervals</li>
                  <li>Maintain documentation</li>
                  <li>Ensure system operates on mains failure</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Unlimited</p>
                <p className="text-white/90 text-xs">Fines possible</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">2 Years</p>
                <p className="text-white/90 text-xs">Imprisonment</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Prohibition</p>
                <p className="text-white/90 text-xs">Notices possible</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Coordination with Fire Alarm Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting must work with fire detection and alarm systems but
              must also function independently. This balance between integration and
              independence is critical for robust fire safety.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Critical Integration Points:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fire alarm panels:</strong> Minimum 5 lux at panel face</li>
                <li><strong>Manual call points:</strong> Clearly visible and identifiable</li>
                <li><strong>Staged evacuation:</strong> Zoned lighting matches alarm zones</li>
                <li><strong>BMS integration:</strong> Centralized monitoring possible</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Independent Operation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Activates on mains failure</li>
                  <li>Separate power supplies</li>
                  <li>Works without alarm trigger</li>
                  <li>Protects all scenarios</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integrated Benefits</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Full-building activation on alarm</li>
                  <li>Zone coordination</li>
                  <li>Voice alarm coordination</li>
                  <li>Central fault reporting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Fire Risk Assessment Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The fire risk assessment (FRA) determines emergency lighting requirements.
              Never design or quote without consulting the current FRA - it defines
              what provision is suitable for the specific premises.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">FRA Determines</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Duration (1 or 3 hours)</li>
                  <li>Coverage areas</li>
                  <li>Enhanced provision needs</li>
                  <li>Maintenance frequency</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electricians Should</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Request FRA before design</li>
                  <li>Liaise with fire risk assessor</li>
                  <li>Flag any FRA deficiencies</li>
                  <li>Recommend review after changes</li>
                </ul>
              </div>
            </div>

            <p>
              The fire strategy must include illuminated escape routes, fire-fighting
              equipment locations, provisions for disabled evacuation, and safe
              assembly point illumination.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Integration Documentation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Reference emergency lighting in Fire Safety Strategy</li>
                <li>Show lighting on unified escape route drawings</li>
                <li>Explain how lighting supports evacuation strategy</li>
                <li>Document interface arrangements with fire alarms</li>
                <li>Provide handover explaining maintenance obligations</li>
                <li>Keep copies in building fire safety records</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Integration Failures</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Shared circuits:</strong> — Never wire through alarm isolation switches</li>
                <li><strong>No FRA consultation:</strong> — Request before quoting</li>
                <li><strong>Missing documentation:</strong> — Fire authorities treat as non-compliance</li>
                <li><strong>No panel illumination:</strong> — 5 lux required at alarm panels</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Fire Safety Order</p>
              <ul className="space-y-0.5">
                <li>RRO 2005: England/Wales</li>
                <li>Fire Scotland Act 2005</li>
                <li>Responsible Person liable</li>
                <li>Unlimited fines possible</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Integration Requirements</p>
              <ul className="space-y-0.5">
                <li>Independent power supply</li>
                <li>5 lux at fire panels</li>
                <li>Document in fire strategy</li>
                <li>Coordinate with FRA</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-6-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-6-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule6Section2;
