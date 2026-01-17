import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bs7671-scope-covered",
    question: "Which of the following is covered under BS 7671?",
    options: [
      "Passenger aircraft electrical systems",
      "Domestic properties and buildings",
      "Railway traction systems",
      "Internal wiring of appliances"
    ],
    correctIndex: 1,
    explanation: "Domestic properties are fully covered by BS 7671. Aircraft, trains, and appliance internal wiring have their own specific standards."
  },
  {
    id: "bs7671-not-covered",
    question: "Which type of installation is NOT within the scope of BS 7671?",
    options: [
      "Commercial offices",
      "Marina shore supplies",
      "Lift control systems",
      "Agricultural buildings"
    ],
    correctIndex: 2,
    explanation: "Lift systems are governed by specific lift regulations (BS EN 81 series), not BS 7671. Marina shore supplies ARE covered under Section 709."
  },
  {
    id: "alternative-standards",
    question: "What should be used when BS 7671 doesn't apply?",
    options: [
      "Ignore all regulations",
      "Use manufacturer's instructions only",
      "Refer to appropriate alternative standards",
      "Follow local authority advice only"
    ],
    correctIndex: 2,
    explanation: "When BS 7671 doesn't apply, you must refer to the appropriate alternative standards specific to that application, such as BS EN 60204 for machinery or ATEX for explosive atmospheres."
  }
];

const faqs = [
  {
    question: "What voltage range does BS 7671 cover?",
    answer: "BS 7671 covers electrical installations operating at voltages up to and including 1000V AC or 1500V DC. Higher voltage installations require specialist high voltage standards and additional competency requirements."
  },
  {
    question: "Does BS 7671 apply to food trucks and mobile catering units?",
    answer: "No. Vehicle electrical systems, including food trucks, are not covered by BS 7671. They require automotive electrical standards and vehicle-specific requirements including vibration resistance and vehicle-rated components."
  },
  {
    question: "What about boat electrical systems at marinas?",
    answer: "Marina shore supplies (the connection point) ARE covered by BS 7671 Section 709. However, the boat's internal electrical system is NOT covered - it falls under marine electrical standards."
  },
  {
    question: "Can BS 7671 work alongside other standards?",
    answer: "Yes. In specialist areas, BS 7671 may defer to or work alongside other standards like BS EN 60204 for machinery. When both apply, the most restrictive requirement takes precedence."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "Which standard might work alongside BS 7671 for machinery installations?",
  options: [
    "BS EN 60204",
    "BS 7671 Part 7 only",
    "IET Code of Practice",
    "EAWR directly"
  ],
  correctAnswer: 0,
  explanation: "BS EN 60204 is the specific standard for electrical equipment of machines and works alongside BS 7671 for industrial machinery, production lines, and automated equipment."
}];

const BS7671Module1Section2 = () => {
  useSEO({
    title: "Scope and Application of BS 7671 | BS7671 Module 1.2",
    description: "Learn where BS 7671 applies, its limitations, and when to use alternative electrical standards for specialist installations."
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
            <span>Module 1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Scope and Application
          </h1>
          <p className="text-white/80">
            Understanding where BS 7671 applies and its limitations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Covered:</strong> Buildings up to 1000V AC / 1500V DC</li>
              <li><strong>Not covered:</strong> Vehicles, aircraft, lifts, appliance internals</li>
              <li><strong>Special locations:</strong> Part 7 has additional requirements</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Check installation type before starting work</li>
              <li><strong>Use:</strong> Identify correct standards for the application</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify where BS 7671 applies and where it doesn't",
              "Understand the voltage limitations of its scope",
              "Recognise types of installations and environments it covers",
              "Explain exceptions and identify appropriate alternative standards"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Where BS 7671 Applies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Where BS 7671 Applies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 covers electrical installations operating at voltages up to and including
              1000V AC (1500V DC) in most conventional building and infrastructure environments.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="font-medium text-green-400 mb-2">Domestic Installations</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Houses, flats, and apartments</li>
                  <li>Garages and outbuildings</li>
                  <li>Gardens and outdoor areas</li>
                  <li>Home workshops and studios</li>
                  <li>Shared services in blocks of flats</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <p className="font-medium text-elec-yellow mb-2">Commercial & Industrial</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Offices, shops, and retail spaces</li>
                  <li>Factories and manufacturing facilities</li>
                  <li>Schools, colleges, and universities</li>
                  <li>Hospitals and healthcare facilities</li>
                  <li>Hotels and hospitality venues</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <p className="font-medium text-elec-yellow mb-2">Specialised Buildings</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Churches and places of worship</li>
                  <li>Sports facilities and gymnasiums</li>
                  <li>Theatres and entertainment venues</li>
                  <li>Museums and galleries</li>
                  <li>Car parks and parking structures</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="font-medium text-orange-400 mb-2">Special Locations (Part 7)</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Swimming pools and fountains</li>
                  <li>Agricultural and horticultural premises</li>
                  <li>Caravan and camping sites</li>
                  <li>Marinas (shore supply)</li>
                  <li>Construction sites</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-2">Temporary Installations</p>
              <p className="text-sm text-white">
                BS 7671 also applies to temporary electrical installations including construction
                sites, fairgrounds, markets, temporary events, and emergency power systems.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: What's Outside Scope */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            What's Outside BS 7671 Scope
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-white">
                <strong className="text-red-400">Important:</strong> Using BS 7671 for installations
                outside its scope can lead to inappropriate design and potential safety issues.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Distribution Networks</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>National Grid transmission systems</li>
                  <li>DNO equipment and substations</li>
                  <li>High voltage transmission lines</li>
                  <li>Street lighting (DNO owned)</li>
                </ul>
                <p className="text-xs text-white/60 mt-2 italic">
                  Use: Electricity Supply Regulations
                </p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Transport Applications</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Aircraft electrical systems</li>
                  <li>Ships and boats (hull wiring)</li>
                  <li>Road vehicles and HGVs</li>
                  <li>Railway traction systems</li>
                </ul>
                <p className="text-xs text-white/60 mt-2 italic">
                  Use: Vehicle/marine/aviation standards
                </p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Specialist Systems</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Lift installations and control systems</li>
                  <li>Mine and quarry electrical systems</li>
                  <li>Explosive atmosphere installations</li>
                  <li>Radio and telecommunications equipment</li>
                </ul>
                <p className="text-xs text-white/60 mt-2 italic">
                  Use: BS EN 81, Mining Regs, ATEX
                </p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Appliances & Equipment</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Internal wiring of appliances</li>
                  <li>Manufactured equipment internals</li>
                  <li>Electronic equipment circuits</li>
                  <li>Audio/visual equipment internals</li>
                </ul>
                <p className="text-xs text-white/60 mt-2 italic">
                  Use: Product-specific safety standards
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Voltage Limits</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>AC installations: up to 1000V</li>
                  <li>DC installations: up to 1500V</li>
                  <li>Most building electrical systems</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Higher Voltages Require</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>High voltage regulations</li>
                  <li>Specialist HV standards</li>
                  <li>Additional competency requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Overlap with Other Standards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Overlap with Other Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In specialist areas, BS 7671 may defer to or work alongside other standards.
              Understanding these relationships is crucial for complex installations.
            </p>

            <div className="space-y-3 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">BS 7430 - Protective Earthing</p>
                <p className="text-sm text-white/80">
                  Detailed guidance on earthing systems, earth electrode design, and soil resistivity.
                  Used for complex earthing systems and TT installations.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">BS EN 60204 - Machinery Safety</p>
                <p className="text-sm text-white/80">
                  Covers electrical equipment of machines including control circuits and motor control.
                  Used for industrial machinery, production lines, and automated equipment.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">ATEX Directive - Explosive Atmospheres</p>
                <p className="text-sm text-white/80">
                  Governs electrical equipment in potentially explosive atmospheres.
                  Used for chemical plants, grain stores, paint shops, and fuel storage.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                <p className="text-sm font-medium text-elec-yellow mb-2">Working Together</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>BS 7671 provides the base requirements</li>
                  <li>Specialist standards add specific requirements</li>
                  <li>Most restrictive requirement takes precedence</li>
                  <li>Both may need to be satisfied</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-400 mb-2">Professional Approach</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Identify all applicable standards</li>
                  <li>Understand hierarchy and precedence</li>
                  <li>Document standards used in design</li>
                  <li>Seek specialist advice when needed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Real World Scenarios */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Real World Scenarios
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-400 mb-3">Scenario: Food Truck Wiring Mistake</p>
              <div className="space-y-2 text-sm text-white/90">
                <p>
                  <strong>Situation:</strong> An electrician wires a food truck using BS 7671 methods
                  including standard socket outlets and consumer unit installation.
                </p>
                <p>
                  <strong>Problem:</strong> During safety inspection, the installation fails.
                  Mobile vehicles are NOT covered by BS 7671.
                </p>
                <p>
                  <strong>Correct Approach:</strong> Should have used automotive electrical standards
                  with vibration-resistant, vehicle-rated components.
                </p>
                <p>
                  <strong>Outcome:</strong> Complete rewire required, delayed opening, lost customer confidence.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-3">Scenario: Marina Connection Confusion</p>
              <div className="space-y-2 text-sm text-white/90">
                <p>
                  <strong>Situation:</strong> A contractor installs standard 16A socket outlets
                  at a marina using domestic wiring methods.
                </p>
                <p>
                  <strong>Issue:</strong> While marinas ARE covered by BS 7671 (Section 709),
                  boat electrical systems are NOT. The interface requires understanding both standards.
                </p>
                <p>
                  <strong>Lesson:</strong> Understanding scope boundaries prevents inappropriate
                  application of standards and ensures proper safety considerations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Decision Framework */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Decision Framework
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-3">Does BS 7671 Apply? Step-by-Step</p>
              <ol className="text-sm text-white/90 space-y-2 ml-4 list-decimal">
                <li><strong>Check voltage:</strong> Is it within 1000V AC / 1500V DC?</li>
                <li><strong>Identify type:</strong> Building, vehicle, appliance, or network?</li>
                <li><strong>Consider location:</strong> Fixed building or mobile application?</li>
                <li><strong>Review ownership:</strong> Who owns and controls the installation?</li>
                <li><strong>Check for special regs:</strong> Are there sector-specific requirements?</li>
                <li><strong>Identify standards:</strong> What other standards might apply?</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-400 mb-2">BS 7671 Applies When</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Fixed building installations</li>
                  <li>Within voltage limits</li>
                  <li>No specific sector standards</li>
                  <li>Standard occupancy types</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400 mb-2">Look Elsewhere When</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Mobile/vehicle applications</li>
                  <li>Specialist environments</li>
                  <li>Sector-specific regulations exist</li>
                  <li>Equipment internal wiring</li>
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
              <p className="font-medium text-white mb-1">Covered by BS 7671</p>
              <ul className="space-y-0.5 text-white/80">
                <li>Buildings (domestic/commercial/industrial)</li>
                <li>Special locations (Part 7)</li>
                <li>Temporary installations</li>
                <li>Up to 1000V AC / 1500V DC</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">NOT Covered</p>
              <ul className="space-y-0.5 text-white/80">
                <li>Vehicles, aircraft, ships</li>
                <li>Lifts, mines, explosives</li>
                <li>Appliance internals</li>
                <li>DNO equipment</li>
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
            <Link to="/study-centre/upskilling/bs7671-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-1-section-3">
              Next: Structure of BS 7671
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module1Section2;