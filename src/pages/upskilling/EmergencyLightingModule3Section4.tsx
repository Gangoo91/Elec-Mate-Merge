import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m3s4-check1",
    question: "Which building type typically requires maintained emergency lighting?",
    options: ["Offices during daytime", "Factories", "Cinemas and theatres", "Car parks"],
    correctIndex: 2,
    explanation: "Cinemas, theatres, and entertainment venues typically require maintained emergency lighting because normal lighting is often dimmed or off during performances. Maintained luminaires ensure continuous illumination."
  },
  {
    id: "emergencylighting-m3s4-check2",
    question: "What factor should increase illumination levels beyond minimum requirements?",
    options: ["Building age", "Vulnerable occupants", "Number of exits", "Time of day"],
    correctIndex: 1,
    explanation: "Vulnerable occupants (elderly, disabled, unfamiliar visitors) may require enhanced illumination levels to compensate for reduced visual acuity or slower evacuation speeds. This is determined by risk assessment."
  },
  {
    id: "emergencylighting-m3s4-check3",
    question: "What determines whether 1-hour or 3-hour duration is appropriate?",
    options: ["Building size", "Risk assessment", "Budget", "Luminaire type"],
    correctIndex: 1,
    explanation: "Risk assessment determines duration requirements. 3 hours is standard; 1 hour is only appropriate where immediate evacuation with no reoccupation is documented in the fire risk assessment."
  }
];

const faqs = [
  {
    question: "How do I assess risk for emergency lighting design?",
    answer: "Review the fire risk assessment, consider occupant characteristics (vulnerable, unfamiliar), building complexity, activities conducted, and sleeping risk. Consult with the responsible person and fire safety professionals."
  },
  {
    question: "When should I exceed minimum illumination levels?",
    answer: "When occupants have visual impairments, are unfamiliar with the building, include vulnerable groups (children, elderly), or when hazards are present along escape routes. Document justification in design documentation."
  },
  {
    question: "How does building use affect emergency lighting design?",
    answer: "Building use determines occupant familiarity, lighting conditions (dark venues need maintained), sleeping risk (care homes need enhanced), and evacuation complexity. Each factor may require design adjustments."
  },
  {
    question: "What special considerations apply to sleeping accommodation?",
    answer: "Sleeping accommodation (hotels, care homes, hospitals) typically requires maintained emergency lighting, enhanced response times, and may need audio warnings linked to the fire alarm system."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A nightclub has minimal normal lighting during operation. What type of emergency lighting operation is required?",
  options: [
    "Non-maintained (only during power failure)",
    "Maintained (continuously lit)",
    "Sustained (lit but at reduced output)",
    "Auto-test only"
  ],
  correctAnswer: 1,
  explanation: "Maintained operation is required because normal lighting is minimal during normal operation. Emergency luminaires must be continuously lit so they don't suddenly appear during a failure, potentially causing confusion."
  }
];

const EmergencyLightingModule3Section4 = () => {
  useSEO({
    title: "Risk-Based Design Adjustments | Emergency Lighting Module 3.4",
    description: "Adapt emergency lighting design for specific risks, occupant types, building uses, and hazards using risk assessment principles."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Risk-Based Design Adjustments
          </h1>
          <p className="text-white/80">
            Adapting emergency lighting for specific risks and occupant needs
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Risk assessment:</strong> Drives design decisions</li>
              <li><strong>Vulnerable:</strong> Enhanced illumination</li>
              <li><strong>Dark venues:</strong> Maintained operation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Adjustments</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Lux levels:</strong> Above minimum where needed</li>
              <li><strong>Duration:</strong> Based on evacuation time</li>
              <li><strong>Mode:</strong> Maintained vs non-maintained</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply risk assessment to design",
              "Adjust for vulnerable occupants",
              "Select appropriate operating modes",
              "Modify duration requirements",
              "Account for building use",
              "Document design decisions"
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
            Building Use Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different building uses create different risks and requirements. Emergency
              lighting design must account for how the building is used and who occupies it.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintained Required</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cinemas and theatres</li>
                  <li>Nightclubs and bars</li>
                  <li>Places of worship</li>
                  <li>Any dimmed lighting venue</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Enhanced Design</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Care homes and hospitals</li>
                  <li>Schools (young children)</li>
                  <li>Hotels (unfamiliar occupants)</li>
                  <li>Complex buildings</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Occupant Characteristics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The people who use a building significantly affect emergency lighting
              requirements. Vulnerable or unfamiliar occupants may need enhanced provision.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Occupant Factors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Visual impairment:</strong> Higher lux levels may be needed</li>
                <li><strong>Mobility impairment:</strong> Longer evacuation times, extended duration</li>
                <li><strong>Unfamiliarity:</strong> Clearer signage, more frequent luminaires</li>
                <li><strong>Children:</strong> Lower mounting heights for visibility</li>
                <li><strong>Sleeping occupants:</strong> Maintained with audio warning</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Elderly</p>
                <p className="text-white/90 text-xs">Enhanced lux</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Children</p>
                <p className="text-white/90 text-xs">Lower signs</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Visitors</p>
                <p className="text-white/90 text-xs">Clear wayfinding</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Duration Adjustments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While 3 hours is standard, the risk assessment may justify shorter or
              longer durations based on specific circumstances.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">3-Hour Standard</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Default for all premises</li>
                  <li>Complex evacuation scenarios</li>
                  <li>Fire service operations</li>
                  <li>Sleeping accommodation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">1-Hour Justification</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Simple, single-storey buildings</li>
                  <li>Immediate evacuation possible</li>
                  <li>No reoccupation planned</li>
                  <li>Documented in FRA</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Risk Assessment Process</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Review fire risk assessment for the premises</li>
                <li>Identify occupant characteristics and vulnerabilities</li>
                <li>Consider building complexity and escape routes</li>
                <li>Assess normal lighting conditions</li>
                <li>Document justification for design decisions</li>
                <li>Review with responsible person</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Risk Assessment Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Generic design:</strong> — Each building needs specific assessment</li>
                <li><strong>Ignoring occupants:</strong> — Vulnerable users need consideration</li>
                <li><strong>Minimum only:</strong> — Standards are minimum, not optimum</li>
                <li><strong>No documentation:</strong> — Decisions must be recorded</li>
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
              <p className="font-medium text-white mb-1">Risk Factors</p>
              <ul className="space-y-0.5">
                <li>Occupant vulnerability</li>
                <li>Building complexity</li>
                <li>Normal lighting level</li>
                <li>Evacuation time</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Design Adjustments</p>
              <ul className="space-y-0.5">
                <li>Lux levels above minimum</li>
                <li>Maintained operation</li>
                <li>Duration selection</li>
                <li>Sign positioning</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-3-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-3-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule3Section4;