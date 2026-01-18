import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m6s1-check1",
    question: "What is the minimum illuminance required for escape routes under EN 1838?",
    options: ["0.5 lux", "1 lux", "5 lux", "15 lux"],
    correctIndex: 1,
    explanation: "EN 1838 requires a minimum of 1 lux along the centre line of escape routes. This ensures occupants can safely navigate to exits during power failures."
  },
  {
    id: "emergencylighting-m6s1-check2",
    question: "What standard covers emergency lighting system design and installation?",
    options: ["EN 1838 only", "BS 5266-1", "BS 7671 only", "Building Regulations only"],
    correctIndex: 1,
    explanation: "BS 5266-1 is the code of practice for emergency lighting design, installation, and maintenance. EN 1838 defines performance criteria. Both are needed together."
  },
  {
    id: "emergencylighting-m6s1-check3",
    question: "Which clause of BS 5266-1 deals with inspection and testing?",
    options: ["Clause 4", "Clause 6", "Clause 8", "Clause 10"],
    correctIndex: 3,
    explanation: "Clause 10 covers inspection, testing, and maintenance regime with reference to BS 5266-8 (EN 50172). This defines testing intervals and procedures."
  }
];

const faqs = [
  {
    question: "What is the difference between BS 5266-1 and EN 1838?",
    answer: "BS 5266-1 covers system design, installation, and maintenance - the 'how-to'. EN 1838 defines photometric performance criteria (lux levels, duration, uniformity) - the 'what must be achieved'. You need both for compliance."
  },
  {
    question: "Is compliance with BS 5266 mandatory by law?",
    answer: "BS 5266 is not legislation itself, but is the accepted standard under the Fire Safety Order 2005. Failure to follow these standards can result in prosecution and liability for injury or death."
  },
  {
    question: "Can I use LED emergency lighting?",
    answer: "Yes, LED is fully compliant. EN 1838 is technology-neutral - it specifies performance, not technology. Ensure LED luminaires provide adequate colour rendering (Ra ≥ 40) and consistent output throughout rated duration."
  },
  {
    question: "What documentation must accompany a completed system?",
    answer: "Design calculations, as-built drawings, photometric reports, test certificates, maintenance instructions, and signed certificates from designer, installer, and verifier. Without these, the system is non-compliant."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A system achieves adequate illumination but lacks documentation referencing EN 1838 lux levels. What is the compliance status?",
    options: [
      "Compliant - the system works correctly",
      "Non-compliant - documentation is mandatory",
      "Partially compliant - minor issue",
      "Compliant if client accepts it"
    ],
    correctAnswer: 1,
    explanation: "Without proper documentation and standards referencing, even a functioning system is deemed non-compliant. Documentation proves due diligence and is essential for audits, insurance, and legal proceedings."
  }
];

const EmergencyLightingModule6Section1 = () => {
  useSEO({
    title: "Key Clauses from BS 5266-1 and EN 1838 | Emergency Lighting Module 6.1",
    description: "Understand the foundation standards for emergency lighting design including BS 5266-1 clauses, EN 1838 illuminance requirements, and compliance documentation."
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
            <Link to="/study-centre/upskilling/emergency-lighting-module-6">
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
            <span>Module 6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Key Clauses from BS 5266-1 and EN 1838
          </h1>
          <p className="text-white/80">
            Foundation standards for emergency lighting design and compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>BS 5266-1:</strong> Design and installation</li>
              <li><strong>EN 1838:</strong> Performance criteria</li>
              <li><strong>Both needed:</strong> For full compliance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Requirements</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Escape:</strong> 1 lux minimum</li>
              <li><strong>Open areas:</strong> 0.5 lux minimum</li>
              <li><strong>Uniformity:</strong> 40:1 maximum ratio</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand BS 5266-1 scope and purpose",
              "Apply EN 1838 illuminance requirements",
              "Reference key clauses correctly",
              "Maintain compliance documentation",
              "Understand legal accountability",
              "Link standards to Fire Safety Order"
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
            Overview of BS 5266-1
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5266-1 is the code of practice for emergency lighting of premises. It
              defines how systems must be designed, installed, tested, and maintained
              to ensure safety during power failures.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Covers</p>
                <ul className="text-sm text-white space-y-1">
                  <li>System classification</li>
                  <li>Risk assessment integration</li>
                  <li>Design and installation</li>
                  <li>Testing and maintenance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Clauses</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Clause 4:</strong> System classification</li>
                  <li><strong>Clause 7:</strong> Power supplies</li>
                  <li><strong>Clause 10:</strong> Testing regime</li>
                  <li><strong>Clause 11:</strong> Documentation</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Design</p>
                <p className="text-white/90 text-xs">Methodology</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Install</p>
                <p className="text-white/90 text-xs">Requirements</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Maintain</p>
                <p className="text-white/90 text-xs">Procedures</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            EN 1838 Performance Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EN 1838 defines the photometric performance that emergency lighting must
              achieve. These are measurable technical criteria based on human factors
              research.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Illuminance Levels:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Escape routes:</strong> 1 lux minimum along centre line</li>
                <li><strong>Open areas:</strong> 0.5 lux minimum on floor area</li>
                <li><strong>High-risk tasks:</strong> 15 lux or 10% of normal lighting</li>
                <li><strong>Uniformity:</strong> Maximum ratio 40:1 (max/min)</li>
                <li><strong>Colour rendering:</strong> Ra ≥ 40</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Duration Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Standard:</strong> 1 hour minimum</li>
                  <li><strong>Public buildings:</strong> 3 hours</li>
                  <li><strong>Sleeping risk:</strong> 3 hours</li>
                  <li><strong>Special cases:</strong> Risk assessment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Exit Signs</p>
                <ul className="text-sm text-white space-y-1">
                  <li>ISO 7010 pictograms</li>
                  <li>Internal: 2 cd/m² minimum</li>
                  <li>External: 15 cd/m² minimum</li>
                  <li>Visible from all points</li>
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
            Documentation and Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Both standards emphasise documentation as critical for compliance. A
              system that works but lacks proper documentation is non-compliant.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Required Documentation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Design calculations</li>
                  <li>Photometric verification</li>
                  <li>As-built drawings</li>
                  <li>Maintenance instructions</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Certificates Required</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Designer certification</li>
                  <li>Installer certification</li>
                  <li>Verifier sign-off</li>
                  <li>Testing schedules</li>
                </ul>
              </div>
            </div>

            <p>
              The Fire Safety Order 2005 places legal responsibility on the Responsible
              Person. Electricians who design or install non-compliant systems may
              also face liability if their work contributes to injury or loss of life.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Standards Application</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always use current published versions</li>
                <li>Cross-check with fire risk assessment</li>
                <li>Reference specific clauses in documentation</li>
                <li>Keep photometric evidence with lux readings</li>
                <li>Train clients on BS 5266-8 testing intervals</li>
                <li>Maintain audit-ready records with clause justifications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Compliance Failures</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>No standards references:</strong> — Document clause numbers</li>
                <li><strong>Missing calculations:</strong> — Keep photometric data</li>
                <li><strong>Outdated versions:</strong> — Check BSI for amendments</li>
                <li><strong>No handover training:</strong> — Client must understand maintenance</li>
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
              <p className="font-medium text-white mb-1">BS 5266-1 Clauses</p>
              <ul className="space-y-0.5">
                <li>Clause 4: Classification</li>
                <li>Clause 7: Power supplies</li>
                <li>Clause 10: Testing</li>
                <li>Clause 11: Documentation</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">EN 1838 Levels</p>
              <ul className="space-y-0.5">
                <li>Escape: 1 lux</li>
                <li>Open: 0.5 lux</li>
                <li>High-risk: 15 lux</li>
                <li>Uniformity: 40:1</li>
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
            <Link to="/study-centre/upskilling/emergency-lighting-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/emergency-lighting-module-6-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule6Section1;
