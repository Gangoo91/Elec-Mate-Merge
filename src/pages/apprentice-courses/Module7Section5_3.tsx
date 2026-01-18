import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module7Section5_3 = () => {
  useSEO(
    "GS38-Compliant Testing Practices - Level 2 Module 7 Section 5.3",
    "Master GS38 safety standards for electrical test equipment, including fused leads, shrouded probes, and compliance requirements for safe electrical testing practices."
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What does GS38 cover?",
      options: [
        "Installation methods for electrical circuits",
        "Safety requirements for electrical test equipment",
        "Certification procedures for electricians",
        "Maintenance schedules for electrical systems"
      ],
      correctAnswer: 1,
      explanation: "GS38 is a Health and Safety Executive guidance note that sets minimum safety requirements for electrical test equipment in the UK."
    },
    {
      id: 2,
      question: "Why must test leads be fused?",
      options: [
        "To improve measurement accuracy",
        "To protect the user from high fault currents if a short circuit occurs",
        "To extend the life of the test equipment",
        "To comply with insurance requirements"
      ],
      correctAnswer: 1,
      explanation: "Fused leads with high-breaking capacity (HBC) fuses protect the user from dangerous fault currents during short circuit conditions."
    },
    {
      id: 3,
      question: "How much exposed metal is permitted at a probe tip under GS38?",
      options: [
        "No more than 1 mm",
        "No more than 2 mm",
        "No more than 4 mm",
        "No more than 6 mm"
      ],
      correctAnswer: 1,
      explanation: "GS38 requires that only 2 mm of exposed metal should be visible at the probe tip to reduce risk of accidental contact with live parts."
    },
    {
      id: 4,
      question: "What is the purpose of finger guards on probes?",
      options: [
        "To improve grip on the probe",
        "To prevent fingers from slipping forward onto live conductors",
        "To protect the probe from damage",
        "To identify different probe types"
      ],
      correctAnswer: 1,
      explanation: "Finger guards prevent the user's fingers from accidentally sliding forward and making contact with live conductors during testing."
    },
    {
      id: 5,
      question: "Why is double insulation required on leads?",
      options: [
        "To reduce electrical noise in measurements",
        "To provide protection against cuts, abrasion, and heat",
        "To improve flexibility of the leads",
        "To meet colour coding requirements"
      ],
      correctAnswer: 1,
      explanation: "Double insulation provides robust protection against physical damage and ensures safety even if the outer insulation is compromised."
    },
    {
      id: 6,
      question: "What do CAT II, CAT III, and CAT IV ratings indicate?",
      options: [
        "The accuracy class of the instrument",
        "The type of electrical system the equipment is rated for",
        "The manufacturer's quality grade",
        "The calibration frequency required"
      ],
      correctAnswer: 1,
      explanation: "Category ratings (CAT II, III, IV) indicate the type and severity of electrical environment the test equipment is designed to safely operate in."
    },
    {
      id: 7,
      question: "True or False: Homemade or modified test leads are acceptable if they work.",
      options: [
        "True - if they function correctly",
        "False - homemade or modified test equipment must never be used",
        "True - if approved by a supervisor",
        "False - only for apprentices, qualified electricians can use them"
      ],
      correctAnswer: 1,
      explanation: "GS38 explicitly prohibits the use of homemade or modified test equipment as they cannot guarantee compliance with safety standards."
    },
    {
      id: 8,
      question: "What regulation underpins the need for GS38 compliance?",
      options: [
        "BS 7671 Wiring Regulations",
        "Building Regulations Part P",
        "Electricity at Work Regulations 1989",
        "Health and Safety at Work Act 1974"
      ],
      correctAnswer: 2,
      explanation: "The Electricity at Work Regulations 1989 provide the legal framework that makes GS38 compliance a legal expectation for safe working."
    },
    {
      id: 9,
      question: "In the real-world example, what fault occurred due to non-compliant probes?",
      options: [
        "Electric shock to the electrician",
        "Incorrect readings leading to misdiagnosis",
        "Short circuit causing flashover and burns",
        "Damage to the test instrument"
      ],
      correctAnswer: 2,
      explanation: "The long, exposed metal tips on non-compliant probes slipped and created a short circuit, causing a flashover that resulted in burns and equipment damage."
    },
    {
      id: 10,
      question: "How did the apprentice in the second example apply GS38 correctly?",
      options: [
        "Used the damaged probes carefully",
        "Repaired the insulation damage himself",
        "Reported the damaged probes and got compliant replacements",
        "Borrowed probes from another electrician"
      ],
      correctAnswer: 2,
      explanation: "The apprentice correctly identified the insulation damage, reported it to his supervisor, and was provided with GS38-compliant replacement equipment."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
              <span className="text-white/60">Section 5.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              GS38-Compliant Testing Practices
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
              Master GS38 safety standards for electrical test equipment, including fused leads, shrouded probes, and compliance requirements
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 space-y-1 text-sm">
              <li>• Check test leads have fuses fitted</li>
              <li>• Verify probe tips show maximum 2mm exposed metal</li>
              <li>• Confirm finger guards are present on probes</li>
              <li>• Check leads are double-insulated and undamaged</li>
            </ul>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <p className="text-white/80 leading-relaxed">
              When using test equipment, safety depends not only on the electrician but also on the design and condition of the instruments themselves. The Health and Safety Executive's GS38 guidance note sets out the minimum safety requirements for electrical test equipment in the UK. Compliance with GS38 protects electricians from shock, burns, and arc flash injuries during testing. Apprentices must become familiar with these requirements and treat them as standard practice in every situation, not just during formal inspections.
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
                <span>Explain what GS38 requires for electrical test equipment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">✓</span>
                <span>Describe the design features of GS38-compliant equipment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">✓</span>
                <span>Apply these principles in everyday testing to maintain personal safety</span>
              </li>
            </ul>
          </section>

          {/* Section 1: GS38 Safety Requirements */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              GS38 Safety Requirements
            </h2>
            <p className="text-white/80 mb-4">
              GS38 focuses on the safe design of test leads, probes, and instruments used for electrical testing. The key requirements are designed to protect electricians from electrical shock, arc flash, and related injuries during routine testing work.
            </p>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-4">
              <h3 className="font-semibold text-elec-yellow mb-3">Essential GS38 Features:</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li><strong className="text-white">Fused leads:</strong> Test leads must contain high-breaking capacity (HBC) fuses to protect the user if a short circuit occurs during testing</li>
                <li><strong className="text-white">Shrouded probes:</strong> Only 2 mm of exposed metal should be visible at the probe tip to reduce accidental contact risk</li>
                <li><strong className="text-white">Finger guards:</strong> Probes must have guards to prevent fingers from slipping forward onto live conductors</li>
                <li><strong className="text-white">Double insulation:</strong> Leads should be flexible, robust, and resistant to cuts, abrasion, and heat</li>
                <li><strong className="text-white">Category ratings:</strong> Equipment must be rated (CAT II, III, or IV) for the electrical system being tested</li>
              </ul>
            </div>

            <InlineCheck
              id="gs38-requirements"
              question="Which of these is NOT a GS38 requirement for test equipment?"
              options={[
                "Fused leads with HBC fuses",
                "Shrouded probes with 2mm maximum exposure",
                "Digital display with backlight",
                "Finger guards on probes"
              ]}
              correctIndex={2}
              explanation="Digital displays with backlights are convenience features, not GS38 safety requirements. GS38 focuses on physical safety features like fused leads, shrouded probes, and finger guards."
            />
          </section>

          {/* Section 2: Prohibited Equipment */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Prohibited Equipment and Practices
            </h2>
            <p className="text-white/80 mb-4">
              GS38 explicitly prohibits the use of certain types of equipment and modifications that compromise safety standards. Understanding what cannot be used is as important as knowing what should be used.
            </p>
            <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50 mb-4">
              <h3 className="font-semibold text-green-400 mb-3">Never Use:</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li><strong className="text-white">Homemade test equipment:</strong> Cannot guarantee compliance with safety standards</li>
                <li><strong className="text-white">Modified equipment:</strong> Alterations may compromise safety features</li>
                <li><strong className="text-white">Damaged leads:</strong> Cracked insulation or exposed conductors are dangerous</li>
                <li><strong className="text-white">Incorrect fuses:</strong> Wrong ratings won't provide adequate protection</li>
                <li><strong className="text-white">Excessive probe tips:</strong> More than 2mm exposure increases contact risk</li>
              </ul>
            </div>

            <InlineCheck
              id="prohibited-equipment"
              question="Why does GS38 prohibit homemade or modified test equipment?"
              options={[
                "They are too expensive to maintain",
                "They cannot guarantee compliance with safety standards",
                "They are not accurate enough for testing",
                "They void manufacturer warranties"
              ]}
              correctIndex={1}
              explanation="Homemade or modified equipment cannot guarantee compliance with safety standards, making them potentially dangerous to use in electrical testing situations."
            />
          </section>

          {/* Section 3: Legal Compliance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Legal Framework and Compliance
            </h2>
            <p className="text-white/80 mb-4">
              GS38 compliance is not optional—it is underpinned by legal requirements that make adherence to these standards a duty for all electrical workers. Understanding the legal context helps emphasise why these standards matter.
            </p>
            <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50 mb-4">
              <h3 className="font-semibold text-amber-400 mb-3">Legal Requirements:</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li><strong className="text-white">Electricity at Work Regulations 1989:</strong> Provides the legal framework requiring safe electrical work practices</li>
                <li><strong className="text-white">Daily inspection duty:</strong> Electricians must visually inspect test equipment before each use</li>
                <li><strong className="text-white">Employer responsibilities:</strong> Must provide GS38-compliant equipment and training</li>
                <li><strong className="text-white">Individual accountability:</strong> Each electrician is personally responsible for refusing non-compliant equipment</li>
                <li><strong className="text-white">Reporting requirements:</strong> Non-compliant equipment must be reported and removed from service</li>
              </ul>
            </div>

            <InlineCheck
              id="legal-compliance"
              question="What regulation makes GS38 compliance a legal requirement?"
              options={[
                "BS 7671 Wiring Regulations",
                "Building Regulations Part P",
                "Electricity at Work Regulations 1989",
                "Health and Safety at Work Act 1974"
              ]}
              correctIndex={2}
              explanation="The Electricity at Work Regulations 1989 provide the legal framework that makes GS38 compliance a legal expectation for safe electrical work."
            />
          </section>

          {/* Section 4: Professional Practice */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Professional Practice and Implementation
            </h2>
            <p className="text-white/80 mb-4">
              Developing professional habits around GS38 compliance ensures that safety becomes automatic rather than an afterthought. This section covers how to integrate these standards into daily electrical work.
            </p>
            <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50 mb-4">
              <h3 className="font-semibold text-purple-400 mb-3">Daily Practice Routine:</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li><strong className="text-white">Pre-use inspection:</strong> Check every piece of test equipment before starting work</li>
                <li><strong className="text-white">Equipment selection:</strong> Choose appropriate category-rated instruments for the system being tested</li>
                <li><strong className="text-white">Damage reporting:</strong> Immediately report and remove any non-compliant equipment from service</li>
                <li><strong className="text-white">Refusal protocols:</strong> Know how to professionally refuse unsafe equipment and escalate concerns</li>
                <li><strong className="text-white">Continuous learning:</strong> Stay updated on GS38 requirements and best practices</li>
              </ul>
            </div>

            <InlineCheck
              id="professional-practice"
              question="What should an apprentice do if asked to use non-compliant test equipment?"
              options={[
                "Use it carefully with extra precautions",
                "Refuse to use it and escalate the issue",
                "Use it only for low-voltage testing",
                "Modify it to make it safer"
              ]}
              correctIndex={1}
              explanation="The correct professional response is to refuse to use non-compliant equipment and escalate the issue to ensure proper GS38-compliant equipment is provided."
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
                <h3 className="font-semibold text-red-400 mb-3">Case Study 1: Non-Compliant Probes</h3>
                <p className="text-sm text-white/80 mb-2">
                  An electrician using old test probes with 8mm exposed tips was testing a distribution board. The long metal tips slipped and created a short circuit between phases, causing a flashover that resulted in burns and equipment damage.
                </p>
                <p className="text-xs text-amber-400 font-medium">
                  GS38-compliant probes with 2mm tips and finger guards would have prevented this accident.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <h3 className="font-semibold text-green-400 mb-3">Case Study 2: Proper Equipment Management</h3>
                <p className="text-sm text-white/80 mb-2">
                  An apprentice noticed damaged insulation on test leads and immediately reported it to his supervisor. He was provided with GS38-compliant replacement equipment and commended for following safety protocols.
                </p>
                <p className="text-xs text-green-400 font-medium">
                  Professional approach to equipment safety protects everyone on site.
                </p>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Key Takeaways
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>GS38 sets mandatory safety standards for electrical test equipment in the UK</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Key features include fused leads, shrouded probes, finger guards, and proper category ratings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Non-compliant equipment must never be used, regardless of convenience or pressure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Legal compliance is backed by the Electricity at Work Regulations 1989</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Daily inspection and professional equipment management are essential practices</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} title="GS38-Compliant Testing Practices Quiz" />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Instrument Checks
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-4">
                Next: PPE & Environment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section5_3;
