import { ArrowLeft, ArrowRight, Ruler, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    question: "A warehouse has a flat ceiling at 8 m height with structural beams creating 4 m wide bays, each beam projecting 800 mm below ceiling. How should detectors be positioned?",
    answer: "With 800 mm deep beams (over 600 mm threshold), each bay should be treated as a separate detection area. Since bays are 4 m wide (less than 7 m), a single row of detectors centred in each bay may suffice, but spacing between detectors should meet standard requirements."
  },
  {
    question: "A sports hall has a ceiling height of 14 m. Why might point smoke detectors be problematic, and what alternative should be considered?",
    answer: "At 14 m, smoke may stratify below ceiling level before reaching point detectors. Beam detectors mounted at an appropriate level (potentially multiple levels for stratification) or aspirating detection should be considered. Point detector maintenance access is also challenging at this height."
  },
  {
    question: "What is the maximum distance from a wall to the nearest detector according to BS 5839-1?",
    answer: "Detectors should be positioned no more than half the spacing distance from walls to ensure coverage to room edges. This prevents dead zones where smoke could accumulate without triggering detection."
  }
];

const quizQuestions = [
  {
    question: "What is the typical maximum spacing for point smoke detectors in rooms with flat ceilings up to 10.5 m?",
    options: ["5.3 m radius coverage", "7.5 m between detectors", "10 m between detectors", "15 m between detectors"],
    correctAnswer: 0,
    explanation: "BS 5839-1 typically specifies 5.3 m radius coverage for point smoke detectors in standard conditions, giving about 10.6 m between detectors."
  },
  {
    question: "How does ceiling height affect detector spacing?",
    options: ["No effect", "Higher ceilings may require closer spacing due to smoke stratification", "Higher ceilings always need wider spacing", "Only heat detectors are affected"],
    correctAnswer: 1,
    explanation: "Higher ceilings can cause smoke stratification and cooling, potentially requiring closer detector spacing or alternative detection methods."
  },
  {
    question: "What is the maximum distance from a wall to the nearest detector?",
    options: ["2.5 m", "Half the spacing distance", "Full spacing distance", "10 m"],
    correctAnswer: 1,
    explanation: "Detectors should be positioned no more than half the spacing distance from walls to ensure coverage to room edges."
  },
  {
    question: "When might beam detectors be more appropriate than point detectors?",
    options: ["In small offices", "In high-ceiling or large open-span areas", "In sleeping accommodation", "Only outdoors"],
    correctAnswer: 1,
    explanation: "Beam detectors are well-suited to high ceilings and large open spaces where point detectors would be difficult to access for maintenance."
  },
  {
    question: "How do downstand beams affect detector placement?",
    options: ["No effect", "Beams over 600 mm may require additional detectors in bays", "All beams require separate detection", "Beams always reduce coverage"],
    correctAnswer: 1,
    explanation: "Significant downstand beams (typically over 600 mm) can trap smoke and may require separate detection within the created bays."
  },
  {
    question: "What factor must be considered when positioning heat detectors compared to smoke detectors?",
    options: ["Heat detectors can be placed anywhere", "Heat detectors typically require closer spacing than smoke detectors", "Heat detectors need more distance from walls", "Heat and smoke detectors have identical spacing"],
    correctAnswer: 1,
    explanation: "Heat detectors typically have smaller coverage areas than smoke detectors due to how heat dissipates, often requiring closer spacing."
  },
  {
    question: "What is the purpose of considering airflow patterns when positioning detectors?",
    options: ["Aesthetics only", "Ensure smoke reaches detectors and is not dispersed before detection", "Reduce cable lengths", "Meet architectural requirements"],
    correctAnswer: 1,
    explanation: "Airflow from HVAC systems can affect smoke travel; detectors should be positioned to ensure smoke reaches them rather than being dispersed."
  },
  {
    question: "At what minimum distance should point detectors be kept from air supply diffusers?",
    options: ["No minimum distance", "At least 0.5 m from the edge of the diffuser", "At least 5 m", "1 metre exactly"],
    correctAnswer: 1,
    explanation: "BS 5839-1 recommends keeping point detectors at least 0.5 m from air supply diffusers to prevent dilution of smoke before detection."
  },
  {
    question: "How should sloped ceilings affect detector positioning?",
    options: ["Place detectors at lowest point only", "Position within 600 mm of apex and consider horizontal coverage", "Slope has no effect on placement", "Only use heat detectors on slopes"],
    correctAnswer: 1,
    explanation: "On sloped ceilings, smoke rises to the apex; detectors should be positioned within 600 mm horizontally of the apex while maintaining required coverage."
  },
  {
    question: "What documentation should support detector layout design?",
    options: ["No documentation needed", "Calculations showing spacing compliance and drawings marking positions", "Only verbal agreements", "Manufacturer preference letters"],
    correctAnswer: 1,
    explanation: "Detector layouts should be supported by spacing calculations demonstrating BS 5839-1 compliance and clear drawings showing positions relative to room features."
  }
];

const faqs = [
  {
    question: "Can I exceed standard spacing with risk assessment justification?",
    answer: "BS 5839-1 allows engineered solutions with appropriate justification, but spacing deviations should be documented and agreed with the responsible person and AHJ if applicable."
  },
  {
    question: "How do I handle suspended ceilings with voids?",
    answer: "Voids may need separate detection depending on contents (cables, combustibles) and construction. Treat void detection as a separate zone where installed."
  },
  {
    question: "What spacing applies to multi-sensor detectors?",
    answer: "Multi-sensor detectors should generally be spaced according to the most restrictive element (typically heat) unless manufacturer guidance indicates otherwise."
  },
  {
    question: "Do aspirating systems have different spacing rules?",
    answer: "Yes - aspirating detection has its own design criteria based on sampling pipe layout and hole spacing. Follow manufacturer guidance and EN 54-20 requirements."
  },
  {
    question: "How close to walls can detectors be mounted?",
    answer: "Detectors should not be closer than 0.5 m from walls to avoid dead air spaces, but should be within half the standard spacing distance for coverage."
  },
  {
    question: "What if the room is smaller than standard spacing allows?",
    answer: "Small rooms still need at least one detector regardless of spacing calculations. A single detector in a small room is acceptable."
  }
];

const FireAlarmModule3Section4 = () => {
  useSEO({
    title: "Detector Spacing & Coverage - Fire Alarm Course",
    description: "BS 5839-1 detector spacing requirements: ceiling heights, room shapes, obstructions, beam detectors, and coverage calculations for fire detection."
  });

  return (
    <div className="bg-background text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between max-w-3xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="gap-2 text-white hover:text-elec-yellow">
            <Link to="/electrician/upskilling/fire-alarm-module-3">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Module</span>
            </Link>
          </Button>
          <span className="text-sm text-white">Section 4 of 6</span>
        </div>
      </header>

      <main className="px-4 py-8 max-w-3xl mx-auto">
        {/* Title */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 mb-4">
            <Ruler className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Detector Spacing & Coverage</h1>
          <p className="text-white">BS 5839-1 spacing requirements for smoke and heat detectors, beam detectors, and coverage calculations</p>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
          <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
          <ul className="space-y-2 text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Apply BS 5839-1 spacing requirements for smoke and heat detectors</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Calculate detector positions for various room shapes and sizes</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Account for ceiling height and stratification effects</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Position detectors relative to beams, vents, and obstructions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Select appropriate detection for high-ceiling and open-plan spaces</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span>Document detector layouts with compliant spacing calculations</span>
            </li>
          </ul>
        </div>

        {/* Section 01: Point Detector Spacing Basics */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">01</span>
            Point Detector Spacing Basics
          </h2>
          <div className="space-y-4 text-white">
            <p>
              BS 5839-1 provides spacing guidance based on detector type and ceiling height. The standard assumes a flat ceiling and normal room conditions.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Standard Spacing (Flat Ceilings up to 10.5 m)</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Smoke detectors:</strong> 5.3 m radius coverage (7.5 m between if square layout)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Heat detectors:</strong> typically 5.3 m radius for Grade A1 (varies by grade)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Wall distance:</strong> maximum half spacing from walls</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Ceiling distance:</strong> 25-600 mm below ceiling (typically 25-150 mm)</span>
                </li>
              </ul>
            </div>

            <p>
              These are the baseline requirements. Actual spacing may need to be reduced based on specific conditions such as ceiling height, obstructions, or environmental factors.
            </p>
          </div>
        </section>

        {/* Section 02: Ceiling Height Considerations */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">02</span>
            Ceiling Height Considerations
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Ceiling height affects smoke behaviour and detector performance. Higher ceilings can cause smoke stratification where smoke cools and stops rising before reaching ceiling level.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Height Effects</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Up to 10.5 m:</strong> standard spacing typically applies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>10.5-12 m:</strong> reduced spacing may be needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Above 12 m:</strong> consider beam detectors or specialist solutions</span>
                </li>
              </ul>
            </div>

            <p>
              Stratification occurs when hot smoke cools as it rises and reaches equilibrium with surrounding air before hitting the ceiling. This is more pronounced in tall spaces with temperature gradients.
            </p>
          </div>
        </section>

        {/* Section 03: Beams and Obstructions */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">03</span>
            Beams and Obstructions
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Downstand beams and obstructions affect smoke flow and can create pockets where smoke accumulates without reaching detectors.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Beam Guidance</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Beams less than 10% ceiling height:</strong> generally ignore for spacing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Beams over 600 mm depth:</strong> may create bays requiring separate detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Bay width:</strong> if less than 7 m, single bay may be acceptable</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Position:</strong> centre detectors within bays, not directly under beams</span>
                </li>
              </ul>
            </div>

            <p>
              Deep beams effectively create smoke reservoirs. Smoke rises and fills the space between beams before potentially spilling to adjacent areas.
            </p>
          </div>
        </section>

        <InlineCheck
          question={quickCheckQuestions[0].question}
          answer={quickCheckQuestions[0].answer}
        />

        {/* Section 04: HVAC and Airflow Effects */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">04</span>
            HVAC and Airflow Effects
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Airflow from ventilation systems can dilute smoke or push it away from detectors, significantly affecting detection reliability.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">HVAC Considerations</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Diffusers:</strong> keep detectors at least 0.5 m from air supply diffusers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>High airflow:</strong> may dilute smoke - consider closer spacing or duct detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Return air:</strong> duct detectors can provide early warning in recirculating systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Air changes:</strong> very high air change rates may warrant specialist advice</span>
                </li>
              </ul>
            </div>

            <p>
              Consider the airflow pattern when the HVAC is operating. Smoke from a fire may follow air currents rather than rising directly to ceiling-mounted detectors.
            </p>
          </div>
        </section>

        {/* Section 05: Beam Detectors */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">05</span>
            Beam Detectors
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Optical beam detectors are well-suited to large, high spaces where point detectors would be difficult to install and maintain.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Beam Detector Applications</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>High ceilings:</strong> effective up to 25 m or more depending on type</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Large spans:</strong> paths up to 100 m possible with some models</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Mounting height:</strong> position within 600 mm of ceiling, or at stratification level</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Coverage width:</strong> typically 7.5 m either side of beam path</span>
                </li>
              </ul>
            </div>

            <p>
              Beam detectors offer easier maintenance access as they can be aligned and tested from floor level. Ensure stable mounting to prevent false alarms from beam drift.
            </p>
          </div>
        </section>

        <InlineCheck
          question={quickCheckQuestions[1].question}
          answer={quickCheckQuestions[1].answer}
        />

        {/* Section 06: Sloped and Irregular Ceilings */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">06</span>
            Sloped and Irregular Ceilings
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Non-flat ceilings require special consideration for detector positioning as smoke behaviour changes with ceiling shape.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h3 className="font-semibold text-white mb-2">Sloped Ceiling Rules</h3>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Apex position:</strong> detector within 600 mm horizontally of highest point</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Coverage:</strong> maintain horizontal spacing requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Steep slopes:</strong> may need detectors on sloped surface plus apex</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span><strong>Valleys:</strong> treat like beams - smoke may collect in troughs</span>
                </li>
              </ul>
            </div>

            <p>
              Smoke naturally rises to the highest point. Ensure detectors are positioned to intercept smoke at its likely accumulation points.
            </p>
          </div>
        </section>

        <InlineCheck
          question={quickCheckQuestions[2].question}
          answer={quickCheckQuestions[2].answer}
        />

        {/* Pro Tips */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">07</span>
            Pro Tips
          </h2>
          <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
            <ul className="space-y-2 text-white">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Draw detector positions on scaled drawings and verify spacing with measurements</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Visit site to assess ceiling obstructions not shown on drawings</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Consider maintenance access when positioning high-level detectors</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">08</span>
            Common Mistakes
          </h2>
          <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
            <ul className="space-y-2 text-white">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">X</span>
                <span>Exceeding maximum spacing without documented justification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">X</span>
                <span>Ignoring deep beams that create separate smoke reservoirs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">X</span>
                <span>Positioning detectors directly in HVAC airflow paths</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">09</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-8">
          <Quiz
            title="Detector Spacing & Coverage Knowledge Check"
            questions={quizQuestions}
            moduleTitle="Detector Spacing & Coverage"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row gap-4 justify-between pt-8 border-t border-white/10">
          <Button variant="outline" asChild className="gap-2">
            <Link to="/study-centre/upskilling/fire-alarm-module-3-section-3">
              <ArrowLeft className="h-4 w-4" />
              Previous: Sounder Zones
            </Link>
          </Button>
          <Button asChild className="gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Link to="/study-centre/upskilling/fire-alarm-module-3-section-5">
              Next: Special Applications
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default FireAlarmModule3Section4;
