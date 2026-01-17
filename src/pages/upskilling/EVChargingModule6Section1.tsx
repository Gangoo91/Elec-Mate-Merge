import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m6s1-check1",
    question: "What is the correct sequence when proving a circuit dead?",
    options: ["Test circuit, test tester, isolate", "Test tester, test circuit, test tester again", "Isolate, test circuit, re-energise", "Test circuit only if visible break confirmed"],
    correctIndex: 1,
    explanation: "The safe isolation procedure requires testing your voltage indicator on a known live source, then testing the circuit, then re-testing your indicator to prove it's still functioning correctly."
  },
  {
    id: "evcharging-m6s1-check2",
    question: "What is the minimum safe digging distance from electricity cables?",
    options: ["200mm", "300mm", "500mm", "750mm"],
    correctIndex: 2,
    explanation: "The minimum safe digging distance from electricity cables is 500mm. This allows sufficient clearance to prevent accidental damage during excavation work."
  },
  {
    id: "evcharging-m6s1-check3",
    question: "How often must Class 0 insulating gloves be formally tested?",
    options: ["Monthly", "Every 6 months", "Annually", "Every 2 years"],
    correctIndex: 1,
    explanation: "Class 0 insulating gloves must be formally tested every 6 months. Visual inspection before each use is also mandatory."
  }
];

const faqs = [
  {
    question: "What should I do if I cannot achieve safe isolation?",
    answer: "Stop work immediately and consult with a competent person. Live working requires special procedures, permits, and additional PPE. Consider alternative isolation methods or postponing work until safe isolation can be achieved."
  },
  {
    question: "How often should PPE be inspected and replaced?",
    answer: "Visual inspection before each use is mandatory. Formal inspections: insulating gloves every 6 months, hard hats every 12 months or after impact, safety boots when showing wear. Replace immediately if defects are found."
  },
  {
    question: "Who can authorise live working on EV charging installations?",
    answer: "Only competent persons with appropriate training and experience. Most EV charging work should be done dead. Live working requires risk assessment, permits, enhanced PPE, and often two-person working."
  },
  {
    question: "What documentation is required before starting work?",
    answer: "Risk assessment, method statement, permits to work (if required), proof of competency, insurance certificates, customer agreements, and emergency contact details."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "During a site survey, you discover a TN-C-S (PME) earthing system with no earth electrode. What is the most significant safety implication for EV charging?",
  options: [
    "The installation cannot proceed",
    "Open PEN fault could make the charger dangerous",
    "RCD protection is not required",
    "Earth fault loop impedance will be too high"
  ],
  correctAnswer: 1,
  explanation: "An open PEN fault in a PME system could cause dangerous voltages on exposed metalwork. BS 7671 requires additional protective measures for EV charging on PME systems, including earth electrodes or protective multiple earthing arrangements."
  }
];

const EVChargingModule6Section1 = () => {
  useSEO({
    title: "Safe Installation: Isolation and Site Prep | EV Charging Module 6.1",
    description: "Master safe installation practices for EV charging systems including isolation procedures, site preparation, and safety protocols according to BS 7671."
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
            <Link to="/study-centre/upskilling/ev-charging-module-6">
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
            Safe Installation: Isolation and Site Prep
          </h1>
          <p className="text-white/80">
            Safety procedures for professional EV charging installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Isolation:</strong> Test-isolate-lock-test-test sequence</li>
              <li><strong>PPE:</strong> Class 0 gloves, safety boots, eye protection</li>
              <li><strong>Site prep:</strong> CAT scan, risk assess, barriers</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Isolation points, underground services</li>
              <li><strong>Use:</strong> GS38 testers, lock-off devices, PPE</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Conduct comprehensive site risk assessments",
              "Implement safe electrical isolation procedures",
              "Select appropriate personal protective equipment",
              "Identify and mitigate installation hazards",
              "Apply emergency procedures and protocols",
              "Comply with BS 7671 and HSE requirements"
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
            Safe Isolation Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safe isolation is the foundation of all electrical work. The BS 7671 procedure
              must be followed without exception to protect against electric shock.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Six-Step Safe Isolation Sequence:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Identify:</strong> Confirm correct circuit using schedules and testing</li>
                <li><strong>2. Isolate:</strong> Switch off using device with visible break contact</li>
                <li><strong>3. Secure:</strong> Lock off and tag the isolation point</li>
                <li><strong>4. Test tester:</strong> Verify voltage indicator on known live source</li>
                <li><strong>5. Test dead:</strong> Test all conductors against earth and each other</li>
                <li><strong>6. Re-test tester:</strong> Verify voltage indicator still functions</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Approved Test Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>GS38 compliant voltage indicators</li>
                  <li>Two-pole testers preferred</li>
                  <li>CAT III rated minimum</li>
                  <li>Calibrated and in-date</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lock-Off Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Unique keyed padlocks</li>
                  <li>Danger tags with details</li>
                  <li>Record in permit/logbook</li>
                  <li>Communicate with all personnel</li>
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
            Site Risk Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Comprehensive risk assessment before work begins identifies hazards and
              determines appropriate control measures for safe installation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Assessment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Existing installation condition</li>
                  <li>Consumer unit type and capacity</li>
                  <li>Earthing arrangement (TN-S/TN-C-S/TT)</li>
                  <li>Available fault current</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Physical Environment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Underground services location</li>
                  <li>Ground conditions and drainage</li>
                  <li>Vehicle access and clearances</li>
                  <li>Weather exposure</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Underground Services Detection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Obtain utility records before excavation</li>
                <li><strong>Step 2:</strong> CAT scan to detect live cables</li>
                <li><strong>Step 3:</strong> Mark detected services with paint</li>
                <li><strong>Step 4:</strong> Hand dig trial holes to confirm positions</li>
                <li><strong>Step 5:</strong> Maintain safe working distances</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Gas: 500mm</p>
                <p className="text-white/90 text-xs">Minimum clearance</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Electric: 500mm</p>
                <p className="text-white/90 text-xs">Minimum clearance</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Water: 300mm</p>
                <p className="text-white/90 text-xs">Minimum clearance</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Personal Protective Equipment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Appropriate PPE selection and maintenance is essential for protection
              against electrical and physical hazards during installation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mandatory PPE</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Head:</strong> Hard hat to EN 397</li>
                  <li><strong>Eyes:</strong> Safety glasses EN 166</li>
                  <li><strong>Hands:</strong> Class 0 insulating gloves (1kV)</li>
                  <li><strong>Feet:</strong> Class 0 electrical safety boots</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Schedule</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Daily:</strong> Visual inspection before use</li>
                  <li><strong>6-monthly:</strong> Formal glove testing</li>
                  <li><strong>Annual:</strong> Hard hat replacement review</li>
                  <li><strong>As needed:</strong> Replace if damaged</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Arc Flash Protection Categories:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Category 1 (4 cal/cm²):</strong> Cotton clothing - basic protection</li>
                <li><strong>Category 2 (8 cal/cm²):</strong> Arc-rated clothing required</li>
                <li><strong>Category 3 (25 cal/cm²):</strong> Full arc flash suits</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Work Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Risk assessment signed off and on site</li>
                <li>Method statement approved and communicated</li>
                <li>PPE inspected and correctly worn</li>
                <li>Isolation completed and verified</li>
                <li>Emergency procedures briefed to all</li>
                <li>Work area secured with barriers and signs</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Critical Safety Rules</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Never assume dead:</strong> — always test before touching</li>
                <li><strong>Never bypass isolation:</strong> — complete procedure every time</li>
                <li><strong>Never work alone:</strong> — buddy system for high-risk tasks</li>
                <li><strong>Stop if unsure:</strong> — authority to halt work exists</li>
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
              <p className="font-medium text-white mb-1">Safe Isolation Steps</p>
              <ul className="space-y-0.5">
                <li>Identify → Isolate → Secure</li>
                <li>Test tester → Test dead</li>
                <li>Re-test tester → Work safely</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Distances</p>
              <ul className="space-y-0.5">
                <li>Electric/Gas: 500mm minimum</li>
                <li>Water: 300mm minimum</li>
                <li>Telecoms: 200mm minimum</li>
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
            <Link to="/study-centre/upskilling/ev-charging-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-6-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule6Section1;