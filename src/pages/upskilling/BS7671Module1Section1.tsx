import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bs7671-legal-status",
    question: "Is BS 7671 a statutory legal requirement in the UK?",
    options: [
      "Yes, it's written into UK law",
      "No, but it's the accepted standard for demonstrating compliance",
      "Only in domestic properties",
      "Only in commercial premises"
    ],
    correctIndex: 1,
    explanation: "BS 7671 is not law itself, but it's the accepted standard for demonstrating compliance with legal duties under the Electricity at Work Regulations 1989."
  },
  {
    id: "eawr-link",
    question: "Which regulation is most directly linked to electrical safety at work?",
    options: [
      "Building Regulations Part P",
      "Health & Safety at Work Act 1974",
      "Electricity at Work Regulations 1989",
      "Housing Standards Act"
    ],
    correctIndex: 2,
    explanation: "EAWR 1989 places specific duties on electrical safety in the workplace. BS 7671 compliance demonstrates due diligence under these regulations."
  },
  {
    id: "non-compliance-consequences",
    question: "What happens if you don't follow BS 7671?",
    options: [
      "Nothing - it's only a guideline",
      "Automatic prosecution under criminal law",
      "You may struggle to prove compliance with legal duties",
      "Only your insurance is affected"
    ],
    correctIndex: 2,
    explanation: "While BS 7671 isn't law, not following it makes it very difficult to demonstrate compliance with legal electrical safety duties. Courts use it as the benchmark for assessing competence."
  }
];

const faqs = [
  {
    question: "Who publishes BS 7671?",
    answer: "BS 7671 is published jointly by the Institution of Engineering and Technology (IET) and the British Standards Institution (BSI). The current 18th Edition came into effect on 1st January 2019, with Amendment 2 published in March 2022."
  },
  {
    question: "Can I be prosecuted for not following BS 7671?",
    answer: "You cannot be prosecuted purely for BS 7671 non-compliance, as it's not statutory law. However, non-compliance is used as evidence in prosecutions under EAWR to prove you failed to meet required safety standards."
  },
  {
    question: "How does Building Regulations Part P relate to BS 7671?",
    answer: "Part P makes BS 7671 compliance mandatory for notifiable electrical work in domestic dwellings. This includes new builds, extensions, consumer unit replacements, and work in special locations like bathrooms."
  },
  {
    question: "What about insurance if I don't follow BS 7671?",
    answer: "Professional indemnity policies expect BS 7671 compliance. Non-compliance may void insurance coverage, result in rejected warranty claims, and lead to higher premiums or difficulty obtaining cover."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When must electrical work comply with BS 7671?",
    options: [
      "Only in commercial premises",
      "Only for new installations",
      "For all electrical installations covered by EAWR",
      "Only when specifically requested by the client"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 applies to electrical installations within its scope, both new and existing, to ensure compliance with the Electricity at Work Regulations."
  }
];

const BS7671Module1Section1 = () => {
  useSEO({
    title: "Purpose and Legal Status of BS 7671 | BS7671 Module 1.1",
    description: "Understand the regulatory framework and legal standing of BS 7671, its relationship to UK law, and the role of EAWR in electrical safety."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Purpose and Legal Status of BS 7671
          </h1>
          <p className="text-white/80">
            Understanding the regulatory framework and legal standing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>BS 7671:</strong> Not law itself, but the accepted industry standard</li>
              <li><strong>EAWR:</strong> Primary legislation for workplace electrical safety</li>
              <li><strong>Compliance:</strong> Demonstrates meeting legal safety duties</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Courts, insurers, and HSE all use BS 7671 as benchmark</li>
              <li><strong>Use:</strong> Follow BS 7671 to prove legal compliance and protect yourself</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand what BS 7671 is and who issues it",
              "Explain its relationship to UK law and regulations",
              "Identify situations where compliance becomes legally mandatory",
              "Understand the role of Electricity at Work Regulations (EAWR)"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: What is BS 7671? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is BS 7671?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671, more commonly referred to as the IET Wiring Regulations, is the national standard
              for electrical installation design, erection, and verification in the United Kingdom. It's
              issued jointly by the Institution of Engineering and Technology (IET) and the British
              Standards Institution (BSI).
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm text-white italic">
                <strong className="text-elec-yellow">Full Title:</strong> "Requirements for Electrical
                Installations - IET Wiring Regulations - Eighteenth Edition"
              </p>
              <p className="text-sm text-white/80 mt-2">
                The 18th Edition came into effect on 1st January 2019, with Amendment 2 published in March 2022.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Characteristics</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>National standard for electrical installations</li>
                  <li>Covers design, erection, and verification</li>
                  <li>Based on IEC international standards</li>
                  <li>Regularly updated to reflect technological advances</li>
                  <li>Harmonised with European standards (CENELEC)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Publishing Bodies</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li><strong>IET:</strong> Institution of Engineering and Technology</li>
                  <li><strong>BSI:</strong> British Standards Institution</li>
                  <li>Joint publication ensuring technical excellence</li>
                  <li>Supported by industry experts and committees</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Legal Status */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Legal Status of BS 7671
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm text-white">
                <strong className="text-orange-400">Key Point:</strong> BS 7671 is NOT law in itself,
                but it's the accepted standard for demonstrating compliance with legal requirements.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Non-Statutory Status</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>BS 7671 is not written into statute law</li>
                  <li>It's a voluntary standard technically</li>
                  <li>No direct legal enforcement of BS 7671 itself</li>
                  <li>Cannot be prosecuted purely for non-compliance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Legal Reality</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Universally accepted industry standard</li>
                  <li>Used by courts to assess competence</li>
                  <li>Referenced in insurance policies</li>
                  <li>Expected by regulatory bodies</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-2">The Legal Paradox</p>
              <p className="text-sm text-white">
                While BS 7671 isn't law, deviation from it in professional electrical work is almost
                impossible to justify legally. Courts, insurers, and regulatory bodies consistently
                use it as the benchmark for assessing whether electrical work meets required safety standards.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Link to UK Law */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Link to UK Law
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Under the Electricity at Work Regulations 1989 (EAWR), you have a legal duty to ensure
              electrical systems are safe and properly maintained. BS 7671 is the benchmark used by
              courts, HSE, and insurance companies to assess whether you've met that legal duty.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Primary Statutory Regulations:</p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-2">Electricity at Work Regulations 1989</p>
                  <p className="text-sm text-white/80 mb-2">
                    The primary legislation governing electrical safety at work. Regulation 4 requires
                    systems to be constructed and maintained to prevent danger.
                  </p>
                  <ul className="text-xs text-white/70 space-y-1 ml-3">
                    <li>Absolute duty - no "so far as reasonably practicable" defence</li>
                    <li>Applies to all electrical work in workplaces</li>
                    <li>BS 7671 compliance demonstrates due diligence</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-2">Building Regulations Part P</p>
                  <p className="text-sm text-white/80 mb-2">
                    Specifically covers electrical safety in dwellings. Makes BS 7671 compliance
                    mandatory for domestic electrical work.
                  </p>
                  <ul className="text-xs text-white/70 space-y-1 ml-3">
                    <li>Statutory requirement for domestic installations</li>
                    <li>Notifiable work must comply with BS 7671</li>
                    <li>Building Control approval required</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-2">Health & Safety at Work Act 1974</p>
                  <p className="text-sm text-white/80 mb-2">
                    General duty of care for health and safety. Section 2 requires employers to
                    ensure safe systems of work.
                  </p>
                  <ul className="text-xs text-white/70 space-y-1 ml-3">
                    <li>Duty to employees and others affected by work</li>
                    <li>"So far as reasonably practicable" defence available</li>
                    <li>BS 7671 compliance shows reasonable precautions taken</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: How Courts Use BS 7671 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            How Courts Use BS 7671
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400 mb-2">If You Don't Follow BS 7671</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Burden of proof shifts to you</li>
                  <li>Must justify why departure was acceptable</li>
                  <li>Higher standard of care expected</li>
                  <li>Insurance may not cover claims</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-400 mb-2">If You Follow BS 7671</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Strong defence against prosecution</li>
                  <li>Demonstrates professional competence</li>
                  <li>Insurance coverage more likely</li>
                  <li>Meets industry expectations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Real World Scenario
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-400 mb-3">Case Study: Consumer Unit Upgrade Gone Wrong</p>

              <div className="space-y-3">
                <p className="text-sm text-white/90">
                  <strong>Situation:</strong> An electrical contractor completes a consumer unit upgrade
                  in a domestic property but doesn't install RCDs as required by BS 7671 for socket
                  outlets. Six months later, a faulty appliance causes a shock incident when a resident
                  touches a metal washing machine case.
                </p>

                <p className="text-sm text-white/90">
                  <strong>Investigation:</strong> HSE finds no RCD protection despite BS 7671 requirements,
                  incorrectly issued EIC, and non-compliance with Building Regulations Part P.
                </p>

                <p className="text-sm text-white/90">
                  <strong>Outcome:</strong> Contractor prosecuted under EAWR. Non-compliance with BS 7671
                  used as evidence of failing to meet required standards. Result: Criminal conviction,
                  £15,000 fine, and £8,000 costs.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-white">
                <strong className="text-red-400">Key Lesson:</strong> The contractor wasn't prosecuted
                for "breaking BS 7671" but for failing their legal duty under EAWR. BS 7671 non-compliance
                was the evidence used to prove they hadn't met required safety standards.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Professional Implications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Professional Implications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insurance and Liability</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Professional indemnity policies expect BS 7671 compliance</li>
                  <li>Non-compliance may void insurance coverage</li>
                  <li>Higher premiums for poor compliance history</li>
                  <li>Warranty claims may be rejected</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scheme Provider Requirements</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>NICEIC, NAPIT, etc. require BS 7671 compliance</li>
                  <li>Regular assessments check compliance</li>
                  <li>Non-compliance can lead to suspension</li>
                  <li>Competent Person Scheme membership depends on it</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Business Impact</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Loss of professional reputation</li>
                <li>Difficulty obtaining public liability insurance</li>
                <li>Clients may specify BS 7671 compliance in contracts</li>
                <li>Competitive disadvantage against compliant contractors</li>
                <li>Potential criminal liability for directors/business owners</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 7: When BS 7671 Becomes Mandatory */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            When BS 7671 Becomes Mandatory
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While BS 7671 isn't statutory law, there are specific situations where compliance
              becomes a legal requirement:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Domestic Installations</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Building Regulations Part P</li>
                  <li>Notifiable work in dwellings</li>
                  <li>New builds and extensions</li>
                  <li>Consumer unit replacements</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Commercial/Industrial</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Contract specifications</li>
                  <li>Local authority requirements</li>
                  <li>Planning conditions</li>
                  <li>Licensing requirements</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Special Locations</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Swimming pools</li>
                  <li>Medical locations</li>
                  <li>Marinas and boats</li>
                  <li>Agricultural premises</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Professional Practice</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Competent Person Schemes</li>
                  <li>Professional certification</li>
                  <li>Insurance requirements</li>
                  <li>Industry best practice</li>
                </ul>
              </div>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Key Legislation</p>
              <ul className="space-y-0.5 text-white/80">
                <li>Electricity at Work Regulations 1989</li>
                <li>Building Regulations Part P</li>
                <li>Health & Safety at Work Act 1974</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Takeaways</p>
              <ul className="space-y-0.5 text-white/80">
                <li>BS 7671 = industry standard (not law)</li>
                <li>EAWR = statutory requirement</li>
                <li>Compliance = legal defence</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-10">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-1-section-2">
              Next: Scope and Application
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module1Section1;