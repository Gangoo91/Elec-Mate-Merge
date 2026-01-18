import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    question: "A three-storey office building has a server room and electrical switch room. Which category combination provides appropriate coverage?",
    answer: "L2 (escape routes plus high-risk areas) combined with P2 for the server room would typically be appropriate - life safety on escape routes plus enhanced detection in the high-value server room for property protection."
  },
  {
    question: "A care home with 24 beds is being designed. Which category and what special considerations apply?",
    answer: "L1 is typically required for care homes with sleeping accommodation. Special considerations include 75 dB(A) at bedhead, VADs for hearing-impaired residents, and coordination with staff alert systems and phased evacuation strategy."
  },
  {
    question: "An industrial unit wants to protect expensive machinery but staff work only in a small office area. What category combination is appropriate?",
    answer: "L3 or L4 for the office area (life safety for staff) combined with P1 or P2 for the machinery areas (property protection for the equipment). The specific category depends on the fire risk assessment."
  }
];

const quizQuestions = [
  {
    question: "Which best describes an L1 system?",
    options: ["Escape routes only", "Escape routes plus defined high-risk areas", "Complete building coverage", "No automatic detection"],
    correctAnswer: 2,
    explanation: "L1 provides automatic detection throughout the entire building for maximum life safety."
  },
  {
    question: "What distinguishes L2 from L3?",
    options: ["L2 has fewer detectors", "L2 includes defined high-risk rooms in addition to escape routes", "They are identical", "L2 excludes escape routes"],
    correctAnswer: 1,
    explanation: "L2 covers escape routes plus specified high-risk areas; L3 focuses on escape routes only."
  },
  {
    question: "A P1 system primarily addresses what objective?",
    options: ["Life safety only", "Property protection across the whole building", "Voice alarm only", "VAD synchronisation"],
    correctAnswer: 1,
    explanation: "P1 aims for comprehensive detection for property protection across the entire premises."
  },
  {
    question: "What is a common audibility aim for general areas?",
    options: ["55 dB(A)", "65 dB(A) or 5 dB above ambient", "75 dB(A) everywhere", "90 dB(A)"],
    correctAnswer: 1,
    explanation: "Typical aim is 65 dB(A) or 5 dB above ambient noise - whichever is greater."
  },
  {
    question: "When are visual alarm devices typically required?",
    options: ["Always", "Where noise/accessibility demands visual warning", "Never", "Only outdoors"],
    correctAnswer: 1,
    explanation: "Use VADs for noisy spaces and to support accessibility - choose the correct category and placement."
  },
  {
    question: "What type of coverage does an L4 system provide?",
    options: ["Full building detection", "Escape route circulation spaces only", "Defined high-risk areas only", "Property protection throughout"],
    correctAnswer: 1,
    explanation: "L4 systems cover escape route circulation spaces only - more limited than L3."
  },
  {
    question: "What is the primary purpose of an L5 system?",
    options: ["Complete property protection", "Full life safety throughout building", "Localised objectives for particular risks or process areas", "Escape routes plus high-risk areas"],
    correctAnswer: 2,
    explanation: "L5 is designed for specific localised objectives, such as protecting particular processes or defined risk areas."
  },
  {
    question: "What audibility level is typically required in sleeping areas?",
    options: ["55 dB(A)", "65 dB(A)", "75 dB(A) at the bedhead with doors closed", "85 dB(A) throughout"],
    correctAnswer: 2,
    explanation: "Sleeping risk areas typically require 75 dB(A) at the bedhead with bedroom doors closed to ensure occupants are awakened."
  },
  {
    question: "What is a P2 system designed for?",
    options: ["Complete building property protection", "Detection in defined high-risk areas only", "Life safety in escape routes", "Voice alarm coverage"],
    correctAnswer: 1,
    explanation: "P2 provides property protection detection only in defined high-risk areas, rather than throughout the entire building like P1."
  },
  {
    question: "Which system category would typically be specified for a residential care home?",
    options: ["L5 - localised coverage only", "L3 - escape routes only", "L1 - complete building coverage", "P2 - high-risk areas only"],
    correctAnswer: 2,
    explanation: "Care homes typically require L1 coverage due to sleeping risk and vulnerability of occupants."
  }
];

const faqs = [
  {
    question: "Can I combine L and P categories in the same building?",
    answer: "Yes - it is common to specify L3 for life safety on escape routes plus P2 for property protection in high-value areas like server rooms."
  },
  {
    question: "Is L5 a lesser option than L4?",
    answer: "No - L5 is a bespoke category for specific objectives, not a reduced coverage option. Coverage is determined by the fire strategy requirement."
  },
  {
    question: "Who decides which category is required?",
    answer: "The fire risk assessment and fire strategy determine requirements. The designer specifies the category to meet those requirements."
  },
  {
    question: "Can the category be changed after installation?",
    answer: "Yes, but this requires a formal variation and update to certificates. Changes should be justified by updated risk assessment."
  },
  {
    question: "What detects better for sleeping risk - smoke or heat?",
    answer: "Smoke detectors generally provide earlier warning for smouldering fires, which is critical for sleeping risk. Heat detectors are only used where smoke detection is inappropriate."
  },
  {
    question: "How do I specify VAD requirements?",
    answer: "Specify EN 54-23 compliant VADs with appropriate category (W/C/O) and coverage volume. Ensure line-of-sight to occupied areas and synchronisation where multiple devices are visible."
  }
];

const FireAlarmModule3Section2 = () => {
  useSEO({
    title: "Detection Zones & Categories | Fire Alarm Systems",
    description: "Learn BS 5839-1 L and P category systems including L1-L5 life safety categories, P1-P2 property protection, coverage requirements, and system selection."
  });

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link to="..">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            Module 3 - Section 2 of 6
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">
            Detection Zones & Categories
          </h1>
          <p className="text-white text-lg">
            Understanding BS 5839-1 L and P category systems for life safety and property protection
          </p>
        </div>

        {/* Quick Summary */}
        <div className="grid gap-3 sm:grid-cols-3 mb-8">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="font-semibold text-white text-sm">L Categories (L1-L5)</p>
            <p className="text-white text-sm mt-1">Life safety - early warning for evacuation</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="font-semibold text-white text-sm">P Categories (P1-P2)</p>
            <p className="text-white text-sm mt-1">Property protection - minimise damage</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="font-semibold text-white text-sm">Selection Basis</p>
            <p className="text-white text-sm mt-1">Fire risk assessment drives choice</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8 p-4 rounded-lg bg-slate-900/50 border border-white/10">
          <h2 className="font-semibold text-white mb-3">What You Will Learn</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-white">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              The difference between L1-L5 life safety categories
            </li>
            <li className="flex items-start gap-2 text-white">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              P1-P2 property protection aims and coverage
            </li>
            <li className="flex items-start gap-2 text-white">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              Audibility and visibility requirements for occupant warning
            </li>
            <li className="flex items-start gap-2 text-white">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              How to select appropriate categories based on risk assessment
            </li>
          </ul>
        </div>

        {/* Section 01 - Life Safety Categories (L1-L5) */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">01</span>
            Life Safety Categories (L1-L5)
          </h2>

          <div className="space-y-4 text-white">
            <p>
              L categories under BS 5839-1 are designed to protect life safety by providing early warning for evacuation. The level of coverage increases from L5 to L1.
            </p>

            <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
              <p className="font-semibold text-white mb-2">Category Definitions</p>
              <ul className="space-y-2 text-white">
                <li>
                  <span className="font-semibold text-elec-yellow">L1:</span> Detection throughout all areas of the building
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">L2:</span> Escape routes plus defined high-risk areas (kitchens, plant rooms)
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">L3:</span> Escape routes plus all rooms opening directly onto them
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">L4:</span> Escape route circulation spaces only
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">L5:</span> Localised objectives for particular risks or process areas
                </li>
              </ul>
            </div>

            <p>
              The choice of category depends on the fire risk assessment, occupant characteristics, and building use. Higher-risk premises typically require more comprehensive coverage.
            </p>
          </div>
        </section>

        {/* Section 02 - Property Protection Categories (P1-P2) */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">02</span>
            Property Protection Categories (P1-P2)
          </h2>

          <div className="space-y-4 text-white">
            <p>
              P categories focus on property protection through early detection to minimise fire damage and business interruption. They can be combined with L categories.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="font-semibold text-white mb-2">P Category Definitions</p>
              <ul className="space-y-2 text-white">
                <li>
                  <span className="font-semibold text-elec-yellow">P1:</span> Detection throughout for early intervention and loss minimisation
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">P2:</span> Detection in defined high-risk areas only (server rooms, stores)
                </li>
              </ul>
            </div>

            <p>
              P categories can be combined with L categories. For example, L3 plus P2 provides escape route protection and property protection in high-value areas.
            </p>
          </div>
        </section>

        {/* Section 03 - Typical Building Applications */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">03</span>
            Typical Building Applications
          </h2>

          <div className="space-y-4 text-white">
            <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
              <p className="font-semibold text-white mb-2">Category Selection Examples</p>
              <ul className="space-y-2 text-white">
                <li>
                  <span className="font-semibold text-elec-yellow">L1:</span> Care homes, hospitals, HMOs, hotels (sleeping risk, vulnerable occupants)
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">L2:</span> Offices, schools, retail with back-of-house risks
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">L3:</span> Medium-risk premises with standard escape routes
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">L4:</span> Low-risk premises with simple layouts
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">P1/P2:</span> Warehouses, data centres, heritage buildings
                </li>
              </ul>
            </div>

            <p>
              The fire risk assessment should justify the category selection. Insurance requirements may also influence the choice, particularly for property protection.
            </p>
          </div>
        </section>

        {/* InlineCheck 1 */}
        <div className="mb-8">
          <InlineCheck
            question={quickCheckQuestions[0].question}
            answer={quickCheckQuestions[0].answer}
          />
        </div>

        {/* Section 04 - Audibility Requirements */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">04</span>
            Audibility Requirements
          </h2>

          <div className="space-y-4 text-white">
            <p>
              Sounders must provide adequate warning to all occupants regardless of location or activity. BS 5839-1 specifies minimum sound levels.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="font-semibold text-white mb-2">BS 5839-1 Audibility Targets</p>
              <ul className="space-y-1 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>General areas:</strong> 65 dB(A) or 5 dB above ambient (whichever greater)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Sleeping areas:</strong> 75 dB(A) at the bedhead with doors closed</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Voice alarm:</strong> Prioritise intelligibility over loudness (STI)</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="font-semibold text-white mb-2">Important</p>
              <p className="text-white">
                Sleeping risk premises must achieve 75 dB(A) at the bedhead - this often requires sounders within or adjacent to bedrooms. This is a critical requirement that is often underestimated.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05 - Visual Alarm Devices (VADs) */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">05</span>
            Visual Alarm Devices (VADs)
          </h2>

          <div className="space-y-4 text-white">
            <p>
              VADs (beacons) provide visual warning where audibility alone may be insufficient. They support accessibility and supplement audible warning in noisy environments.
            </p>

            <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
              <p className="font-semibold text-white mb-2">EN 54-23 VAD Categories</p>
              <ul className="space-y-2 text-white">
                <li>
                  <span className="font-semibold text-elec-yellow">Category W:</span> Wall-mounted devices - coverage specified in height x width
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">Category C:</span> Ceiling-mounted devices - circular coverage pattern
                </li>
                <li>
                  <span className="font-semibold text-elec-yellow">Category O:</span> Open area devices - large space coverage
                </li>
              </ul>
            </div>

            <p>
              Synchronise multiple VADs to reduce photosensitive risk and provide a clearer, unified signal. VADs should be selected to provide coverage throughout occupied areas.
            </p>
          </div>
        </section>

        {/* InlineCheck 2 */}
        <div className="mb-8">
          <InlineCheck
            question={quickCheckQuestions[1].question}
            answer={quickCheckQuestions[1].answer}
          />
        </div>

        {/* Section 06 - Category Selection Process */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">06</span>
            Category Selection Process
          </h2>

          <div className="space-y-4 text-white">
            <p>
              Category selection should be driven by the fire risk assessment and fire strategy. Cost should not be the primary driver.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="font-semibold text-white mb-2">Selection Factors</p>
              <ul className="space-y-1 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Building use and occupancy type (sleeping risk?)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Occupant vulnerability and mobility
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Fire risk assessment findings
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Evacuation strategy (simultaneous, phased, defend-in-place)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Insurance and regulatory requirements
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* InlineCheck 3 */}
        <div className="mb-8">
          <InlineCheck
            question={quickCheckQuestions[2].question}
            answer={quickCheckQuestions[2].answer}
          />
        </div>

        {/* Practical Guidance */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Practical Guidance</h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
              <p className="font-semibold text-elec-yellow mb-2">Pro Tips</p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Always start with the fire risk assessment - let risk drive category selection, not cost
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  For sleeping risk, default to L1 unless the fire strategy specifically justifies L2
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Document the rationale for category selection in design documentation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Consider combining L and P categories where both life safety and property protection are important
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
              <p className="font-semibold text-amber-400 mb-2">Common Mistakes</p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 flex-shrink-0">!</span>
                  Specifying L3 where L2 or L1 is needed for the risk profile
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 flex-shrink-0">!</span>
                  Forgetting sleeping risk audibility requirements (75 dB(A) at bedhead)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 flex-shrink-0">!</span>
                  Omitting VADs in noisy or accessibility-critical environments
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 flex-shrink-0">!</span>
                  Letting cost rather than risk drive category selection
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-slate-900/50 border border-white/10">
                <p className="font-semibold text-white mb-2">{faq.question}</p>
                <p className="text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-8">
          <Quiz
            title="Section 2 Knowledge Check"
            questions={quizQuestions}
            passingScore={70}
          />
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../fire-alarm-module-3-section-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button asChild className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Link to="../fire-alarm-module-3-section-3">
              Next Section
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default FireAlarmModule3Section2;
