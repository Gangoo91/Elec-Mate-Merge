import React, { useState } from "react";
import { ArrowLeft, Snowflake, CheckCircle, Droplets, ThermometerSnowflake, Gauge, ChevronDown, Target, RotateCcw, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useSEO from "@/hooks/useSEO";

const TITLE = "Chilled Water Systems - HNC Module 8 Section 3.3";
const DESCRIPTION = "Master chilled water systems for building services: air-cooled and water-cooled chillers, cooling towers, primary/secondary pumping arrangements, variable primary systems, pipe sizing, system hydraulics and free cooling strategies.";

const quickCheckQuestions = [
  {
    id: "chiller-types",
    question: "What is the main advantage of water-cooled chillers over air-cooled chillers?",
    options: [
      "Lower initial cost",
      "No water consumption",
      "Higher efficiency and better COP",
      "Simpler installation"
    ],
    correctIndex: 2,
    explanation: "Water-cooled chillers achieve higher efficiency (COP typically 5-7) compared to air-cooled units (COP 2.5-4) because water is a more effective heat transfer medium than air. However, they require cooling towers and associated water treatment."
  },
  {
    id: "chw-temps",
    question: "What are the typical chilled water flow and return temperatures in UK commercial systems?",
    options: [
      "4/10°C",
      "6/12°C",
      "8/14°C",
      "10/16°C"
    ],
    correctIndex: 1,
    explanation: "Standard UK commercial chilled water systems operate at 6°C flow and 12°C return, giving a 6K temperature differential. This provides adequate cooling capacity whilst avoiding condensation issues and maintaining chiller efficiency."
  },
  {
    id: "primary-secondary",
    question: "What is the purpose of a bypass in a primary-secondary pumping system?",
    options: [
      "To increase system pressure",
      "To allow variable secondary flow whilst maintaining constant primary flow",
      "To reduce energy consumption",
      "To improve water quality"
    ],
    correctIndex: 1,
    explanation: "The bypass (decoupler) allows the primary circuit to maintain constant flow through the chillers whilst the secondary circuit varies flow to match load. When secondary flow is less than primary, excess water bypasses through the decoupler."
  },
  {
    id: "pipe-velocity",
    question: "What is the recommended maximum water velocity in chilled water distribution pipework?",
    options: [
      "0.5 m/s",
      "1.5 m/s",
      "3.0 m/s",
      "5.0 m/s"
    ],
    correctIndex: 2,
    explanation: "CIBSE recommends maximum velocities of 1.5-3.0 m/s for chilled water distribution mains to limit noise and erosion. Higher velocities increase pump energy and can cause noise issues, particularly near occupied spaces."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical COP (Coefficient of Performance) range for a modern water-cooled centrifugal chiller at full load?",
    options: [
      "2.5-3.5",
      "4.0-5.0",
      "5.5-7.0",
      "8.0-10.0"
    ],
    correctAnswer: 2,
    explanation: "Modern water-cooled centrifugal chillers achieve COPs of 5.5-7.0 at full load design conditions. This high efficiency is due to the effective heat rejection via cooling towers and optimised compressor design."
  },
  {
    id: 2,
    question: "What is the purpose of a cooling tower approach temperature?",
    options: [
      "The difference between entering and leaving water temperatures",
      "The difference between leaving water temperature and wet bulb temperature",
      "The difference between air inlet and outlet temperatures",
      "The difference between design and actual performance"
    ],
    correctAnswer: 1,
    explanation: "Approach temperature is the difference between the leaving water temperature and the ambient wet bulb temperature. A typical approach is 3-5K. Lower approach means larger, more expensive towers but better chiller performance."
  },
  {
    id: 3,
    question: "In a primary-secondary system, what happens when the secondary flow exceeds the primary flow?",
    options: [
      "The system shuts down",
      "Water flows backwards through the bypass",
      "Warm return water mixes with chilled supply",
      "Pump cavitation occurs"
    ],
    correctAnswer: 2,
    explanation: "When secondary flow exceeds primary flow, warm return water is drawn through the bypass and mixes with the chilled water supply. This raises the supply temperature and reduces cooling capacity - a condition called 'low delta T syndrome'."
  },
  {
    id: 4,
    question: "What is the main advantage of a variable primary flow (VPF) system over primary-secondary?",
    options: [
      "Lower chiller cost",
      "Elimination of secondary pumps and reduced energy consumption",
      "Simpler controls",
      "Better water quality"
    ],
    correctAnswer: 1,
    explanation: "VPF systems eliminate the secondary pumps entirely, reducing capital cost and pump energy. However, they require chillers capable of handling variable flow and more sophisticated controls to manage minimum flow requirements."
  },
  {
    id: 5,
    question: "What is the minimum flow rate typically required through a chiller to prevent laminar flow and freezing?",
    options: [
      "10-20% of design flow",
      "30-50% of design flow",
      "60-80% of design flow",
      "90-100% of design flow"
    ],
    correctAnswer: 1,
    explanation: "Most chillers require a minimum flow of 30-50% of design flow to maintain turbulent flow in the evaporator and prevent freezing. Below this, heat transfer deteriorates rapidly and freeze protection may activate."
  },
  {
    id: 6,
    question: "What pressure drop per metre run is typically used for preliminary chilled water pipe sizing?",
    options: [
      "50-100 Pa/m",
      "150-300 Pa/m",
      "400-600 Pa/m",
      "800-1000 Pa/m"
    ],
    correctAnswer: 1,
    explanation: "CIBSE recommends a pressure drop of 150-300 Pa/m for preliminary pipe sizing. This provides a balance between pipe cost (smaller pipes = higher pressure drop) and pump energy (higher pressure drop = more pump energy)."
  },
  {
    id: 7,
    question: "What is the purpose of a plate heat exchanger in a free cooling system?",
    options: [
      "To increase system pressure",
      "To separate the chilled water circuit from the condenser water circuit",
      "To improve water quality",
      "To reduce noise"
    ],
    correctAnswer: 1,
    explanation: "The plate heat exchanger separates the clean chilled water circuit from the potentially contaminated condenser water circuit whilst allowing heat transfer for free cooling. This protects the chilled water system from cooling tower water quality issues."
  },
  {
    id: 8,
    question: "At what ambient wet bulb temperature can free cooling typically begin to contribute to a chilled water system?",
    options: [
      "Below 20°C WB",
      "Below 15°C WB",
      "Below 10°C WB",
      "Below 5°C WB"
    ],
    correctAnswer: 2,
    explanation: "Free cooling can typically begin when ambient wet bulb drops below approximately 10°C, as this allows cooling tower water to approach the required chilled water temperatures. Full free cooling (chillers off) may be possible below 5°C WB."
  },
  {
    id: 9,
    question: "What is the typical range of a cooling tower?",
    options: [
      "The difference between wet and dry bulb temperatures",
      "The difference between entering and leaving water temperatures",
      "The distance water falls through the fill",
      "The temperature difference across the chiller condenser"
    ],
    correctAnswer: 1,
    explanation: "Range is the temperature difference between the water entering and leaving the cooling tower, typically 5-6K for HVAC applications. It equals the heat rejected divided by the water flow rate and specific heat capacity."
  },
  {
    id: 10,
    question: "Why is glycol sometimes added to chilled water systems?",
    options: [
      "To improve heat transfer",
      "To prevent biological growth",
      "To prevent freezing in exposed pipework or during free cooling",
      "To reduce pumping energy"
    ],
    correctAnswer: 2,
    explanation: "Glycol (typically 20-30% concentration) is added to prevent freezing in systems with exposed external pipework or where free cooling could result in very low temperatures. Note that glycol reduces heat transfer capacity and increases pumping energy."
  },
  {
    id: 11,
    question: "What is the purpose of two-port control valves in a variable flow chilled water system?",
    options: [
      "To maintain constant flow through terminal units",
      "To vary flow to terminal units based on load",
      "To balance the system",
      "To prevent reverse flow"
    ],
    correctAnswer: 1,
    explanation: "Two-port valves modulate flow to terminal units (FCUs, AHU coils) based on cooling demand. As valves close, system pressure rises and VSDs on pumps reduce speed, saving significant pump energy compared to constant flow systems."
  },
  {
    id: 12,
    question: "What is low delta T syndrome and why is it problematic?",
    options: [
      "Excessive temperature drop causing freezing",
      "Return water temperature too close to supply, reducing system capacity",
      "High pressure drop across control valves",
      "Excessive noise in pipework"
    ],
    correctAnswer: 1,
    explanation: "Low delta T syndrome occurs when the return water temperature is too close to the supply temperature (e.g., 3K instead of 6K). This reduces the cooling capacity per unit of water flow, requiring more chillers and pumps to operate and wasting energy."
  },
  {
    id: 13,
    question: "What is the purpose of a differential pressure sensor in a variable speed pumping system?",
    options: [
      "To measure flow rate",
      "To control pump speed to maintain required pressure at the index circuit",
      "To detect leaks",
      "To measure water quality"
    ],
    correctAnswer: 1,
    explanation: "The DP sensor, located at the hydraulically most remote point (index circuit), controls pump speed to maintain adequate pressure for the furthest terminals. As valves close, pressure rises and pumps slow down, saving energy."
  },
  {
    id: 14,
    question: "What is the typical fill material used in modern induced draught cooling towers?",
    options: [
      "Wooden slats",
      "Metal plates",
      "PVC or polypropylene film or splash fill",
      "Ceramic tiles"
    ],
    correctAnswer: 2,
    explanation: "Modern towers use PVC or polypropylene fill media, either film type (for clean water) or splash type (more resistant to fouling). These materials provide high surface area for heat and mass transfer whilst being lightweight and resistant to biological growth."
  }
];

const faqs = [
  {
    question: "What is the difference between air-cooled and water-cooled chillers?",
    answer: "Air-cooled chillers reject heat directly to outdoor air via finned coils and fans, making them simpler to install with no water consumption. However, they have lower efficiency (COP 2.5-4) and performance degrades significantly in hot weather. Water-cooled chillers reject heat via a separate condenser water circuit to cooling towers, achieving higher efficiency (COP 5-7) and more stable performance. They require cooling towers, condenser water pumps, water treatment and make-up water, adding complexity and operational cost but offering substantial energy savings in larger installations."
  },
  {
    question: "When should I use primary-secondary pumping versus variable primary flow?",
    answer: "Primary-secondary is the traditional approach, providing hydraulic separation between constant-flow chillers and variable-flow distribution. It's simpler to control and works with any chiller but requires additional pumps and pipework. Variable primary flow (VPF) eliminates secondary pumps, reducing capital and energy costs, but requires chillers rated for variable flow (typically minimum 30-50% flow) and sophisticated controls including bypass arrangements. VPF is increasingly preferred for new installations where chillers are suitable, whilst primary-secondary remains appropriate for retrofit or where simpler controls are required."
  },
  {
    question: "How do I size chilled water pipes?",
    answer: "Preliminary sizing uses a target pressure drop of 150-300 Pa/m run and maximum velocity of 1.5-3.0 m/s. Calculate the required flow rate from Q = cooling load / (4.2 x delta T x 1000) in litres/second. Select pipe size from tables or software to meet both pressure drop and velocity criteria. For risers and branches near occupied spaces, reduce velocity to 1.0-1.5 m/s to limit noise. Final sizing should include allowance for fittings (typically 30-50% addition to straight pipe losses) and verify pump selection against actual system resistance."
  },
  {
    question: "What causes low delta T syndrome and how can it be prevented?",
    answer: "Low delta T syndrome occurs when control valves are oversized, coils are dirty or undersized, or system balancing is poor. This results in return water temperatures closer to supply than design (e.g., 9°C instead of 12°C). Prevention includes proper valve sizing (aim for 50-70% open at design load), regular coil maintenance, correct system commissioning, and use of delta T monitoring. Some systems use return temperature control strategies where chillers modulate based on maintaining design delta T rather than just supply temperature."
  },
  {
    question: "How does free cooling work in chilled water systems?",
    answer: "Free cooling uses low ambient temperatures to pre-cool or fully cool the chilled water without running compressors. In waterside free cooling, the cooling tower water (when cold enough) passes through a heat exchanger to cool chilled water directly. This can begin when wet bulb temperature drops below approximately 10°C, with full free cooling possible below 5°C. A plate heat exchanger separates the two water circuits to protect chilled water quality. Airside economisers on AHUs provide a similar benefit by using cold outdoor air directly. Free cooling can reduce chiller energy by 30-50% in UK climates."
  },
  {
    question: "What water treatment is required for chilled water systems?",
    answer: "Chilled water systems require treatment to prevent corrosion, scale and biological growth. Typical treatment includes corrosion inhibitors (e.g., nitrite-based for closed systems), biocides to prevent Legionella and biofilm, and pH adjustment to 8.5-9.5. Closed chilled water circuits need minimal make-up and annual water testing. Condenser water circuits serving cooling towers require more intensive treatment due to evaporation concentrating minerals and the warm, aerated water encouraging Legionella growth. Cooling towers need regular cleaning, biocide dosing and monitoring under L8/HSG274 requirements."
  }
];

// QuizSection Component
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizSectionProps {
  title: string;
  questions: QuizQuestion[];
}

const QuizSection: React.FC<QuizSectionProps> = ({ title, questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowResult(false);
    }
  };

  const handleSubmitAnswer = () => {
    setShowResult(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const getScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getScorePercentage = () => {
    return Math.round((getScore() / questions.length) * 100);
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const isCorrect = selectedAnswers[currentQuestion] === currentQ?.correctAnswer;

  if (quizCompleted) {
    const score = getScore();
    const percentage = getScorePercentage();
    const passed = percentage >= 70;

    return (
      <div className="py-8">
        <div className="flex items-center gap-2 text-elec-yellow mb-6">
          <Target className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Quiz Complete!</h2>
        </div>

        <div className="text-center space-y-6">
          <div className={`text-6xl font-bold ${passed ? 'text-green-400' : 'text-red-400'}`}>
            {percentage}%
          </div>
          <div>
            <p className="text-lg text-white mb-3">
              You scored {score} out of {questions.length} questions correctly
            </p>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              passed
                ? 'bg-green-500/20 border border-green-400/30 text-green-300'
                : 'bg-red-500/20 border border-red-400/30 text-red-300'
            }`}>
              {passed ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Passed!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5" />
                  <span className="font-medium">Review Required</span>
                </>
              )}
            </div>
          </div>
          <Button
            onClick={restartQuiz}
            variant="outline"
            className="border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow hover:text-[#1a1a1a]"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 text-elec-yellow">
          <Target className="h-5 w-5 sm:h-6 sm:w-6" />
          <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-sm text-white">Question {currentQuestion + 1} of {questions.length}</span>
          <div className="flex gap-1.5 items-center">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 transition-colors ${
                  index < currentQuestion
                    ? 'bg-green-400'
                    : index === currentQuestion
                    ? 'bg-elec-yellow'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5 sm:space-y-6">
        <h3 className="text-base sm:text-lg font-medium text-white leading-relaxed">
          {currentQ?.question}
        </h3>

        <div className="space-y-3">
          {currentQ?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full min-h-[52px] p-4 text-left rounded-xl border-2 transition-all duration-200 active:scale-[0.98] touch-manipulation ${
                selectedAnswers[currentQuestion] === index
                  ? showResult
                    ? index === currentQ.correctAnswer
                      ? 'bg-green-500/20 border-green-400/50 text-green-300'
                      : 'bg-red-500/20 border-red-400/50 text-red-300'
                    : 'bg-elec-yellow/20 border-elec-yellow/50 text-elec-yellow'
                  : showResult && index === currentQ.correctAnswer
                  ? 'bg-green-500/20 border-green-400/50 text-green-300'
                  : 'border-white/10 hover:border-elec-yellow/30 active:bg-white/5 text-white'
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`w-7 h-7 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedAnswers[currentQuestion] === index
                    ? showResult
                      ? index === currentQ.correctAnswer
                        ? 'border-green-400 bg-green-400'
                        : 'border-red-400 bg-red-400'
                      : 'border-elec-yellow bg-elec-yellow'
                    : showResult && index === currentQ.correctAnswer
                    ? 'border-green-400 bg-green-400'
                    : 'border-white/40 bg-transparent'
                 }`}>
                  {selectedAnswers[currentQuestion] === index && !showResult && (
                    <div className="w-3 h-3 rounded-full bg-[#1a1a1a]"></div>
                  )}
                  {showResult && (
                    <>
                      {index === currentQ.correctAnswer ? (
                        <CheckCircle className="h-4 w-4 text-white" />
                      ) : selectedAnswers[currentQuestion] === index ? (
                        <XCircle className="h-4 w-4 text-white" />
                      ) : null}
                    </>
                  )}
                </div>
                <span className="flex-1 text-sm sm:text-base leading-snug">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showResult && currentQ?.explanation && (
          <div className={`p-4 rounded-xl border ${
            isCorrect
              ? 'bg-green-500/10 border-green-400/30 text-green-300'
              : 'bg-elec-yellow/10 border-elec-yellow/30 text-white'
          }`}>
            <p className="font-medium mb-2">
              {isCorrect ? 'Correct!' : 'Explanation:'}
            </p>
            <p className="text-sm leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-4">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-elec-yellow disabled:opacity-50 touch-manipulation"
          >
            Previous
          </Button>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {!showResult && isAnswered && (
              <Button
                onClick={handleSubmitAnswer}
                size="lg"
                className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
              >
                Submit Answer
              </Button>
            )}

            {showResult && (
              <Button
                onClick={handleNext}
                size="lg"
                className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
              >
                {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// FAQAccordion Component
interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`faq-${index}`}
          className="border border-white/10 rounded-xl px-4 bg-white/5"
        >
          <AccordionTrigger className="text-left text-white hover:text-elec-yellow hover:no-underline py-4">
            <span className="text-sm sm:text-base font-medium pr-4">{faq.question}</span>
          </AccordionTrigger>
          <AccordionContent className="text-white/80 text-sm leading-relaxed pb-4">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const HNCModule8Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Snowflake className="h-4 w-4" />
            <span>Module 8.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Chilled Water Systems
          </h1>
          <p className="text-white/80">
            Chillers, cooling towers, pumping arrangements and system hydraulics for commercial cooling
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Chillers:</strong> Air-cooled (COP 2.5-4) or water-cooled (COP 5-7)</li>
              <li className="pl-1"><strong>CHW temps:</strong> Typically 6°C flow, 12°C return (6K delta T)</li>
              <li className="pl-1"><strong>Pumping:</strong> Primary-secondary or variable primary flow</li>
              <li className="pl-1"><strong>Free cooling:</strong> Available when wet bulb &lt;10°C</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Design Parameters</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Pipe velocity:</strong> 1.5-3.0 m/s maximum</li>
              <li className="pl-1"><strong>Pressure drop:</strong> 150-300 Pa/m for sizing</li>
              <li className="pl-1"><strong>Minimum flow:</strong> 30-50% through chillers</li>
              <li className="pl-1"><strong>Cooling tower approach:</strong> 3-5K typical</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand air-cooled versus water-cooled chiller operation and selection",
              "Explain cooling tower operation including range and approach",
              "Design primary-secondary and variable primary pumping systems",
              "Size chilled water pipework using pressure drop and velocity criteria",
              "Apply system hydraulics principles for balancing and control",
              "Implement free cooling strategies to reduce energy consumption"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Chillers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Chillers - Air-Cooled and Water-Cooled
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Chillers are the heart of any chilled water system, producing cold water typically at 6°C
              for distribution to air handling units, fan coil units and other terminal equipment. The
              choice between air-cooled and water-cooled chillers significantly impacts system efficiency,
              capital cost and operational complexity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Air-Cooled Chillers</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Reject heat directly to outdoor air via finned coils and fans</li>
                <li className="pl-1">Typical COP of 2.5-4.0 depending on ambient conditions</li>
                <li className="pl-1">Performance degrades significantly above 35°C ambient</li>
                <li className="pl-1">No water consumption or cooling tower maintenance required</li>
                <li className="pl-1">Simpler installation but require adequate outdoor space for airflow</li>
                <li className="pl-1">Generally suited for loads up to approximately 500kW</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Water-Cooled Chillers</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Reject heat via condenser water circuit to cooling towers</li>
                <li className="pl-1">Higher COP of 5.0-7.0 due to lower condensing temperatures</li>
                <li className="pl-1">More stable performance regardless of ambient dry bulb temperature</li>
                <li className="pl-1">Require cooling towers, condenser pumps and water treatment</li>
                <li className="pl-1">Typical for larger installations &gt;500kW where efficiency savings justify complexity</li>
                <li className="pl-1">Compressor types include scroll, screw and centrifugal</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Chiller Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Air-Cooled</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Water-Cooled</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical COP</td>
                      <td className="border border-white/10 px-3 py-2">2.5-4.0</td>
                      <td className="border border-white/10 px-3 py-2">5.0-7.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capital cost</td>
                      <td className="border border-white/10 px-3 py-2">Lower (chiller only)</td>
                      <td className="border border-white/10 px-3 py-2">Higher (+ towers, pumps)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water consumption</td>
                      <td className="border border-white/10 px-3 py-2">None</td>
                      <td className="border border-white/10 px-3 py-2">Significant (evaporation)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Simpler</td>
                      <td className="border border-white/10 px-3 py-2">Complex (water treatment)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Space requirement</td>
                      <td className="border border-white/10 px-3 py-2">Large outdoor area</td>
                      <td className="border border-white/10 px-3 py-2">Roof/external for towers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Noise</td>
                      <td className="border border-white/10 px-3 py-2">Condenser fans</td>
                      <td className="border border-white/10 px-3 py-2">Tower fans (lower)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> For UK climates, water-cooled chillers typically offer
              20-40% energy savings over air-cooled units, often paying back the additional capital
              cost within 3-5 years for systems operating &gt;2000 hours annually.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Cooling Towers */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cooling Towers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cooling towers reject heat from the condenser water circuit to atmosphere through
              evaporative cooling. As water cascades through the tower, a portion evaporates,
              removing heat from the remaining water. This allows condenser water temperatures
              to approach the ambient wet bulb temperature rather than the higher dry bulb temperature.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Cooling Tower Terms</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-semibold text-elec-yellow mb-1">Range</p>
                  <p className="text-sm text-white/80">Temperature difference between entering and leaving water. Typically 5-6K for HVAC applications.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-semibold text-elec-yellow mb-1">Approach</p>
                  <p className="text-sm text-white/80">Difference between leaving water and ambient wet bulb. Typically 3-5K - lower approach = larger tower.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cooling tower types:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Induced draught:</strong> Fan at top draws air through fill - most common for HVAC</li>
                <li className="pl-1"><strong>Forced draught:</strong> Fan at bottom pushes air through - good where height is limited</li>
                <li className="pl-1"><strong>Crossflow:</strong> Air flows horizontally through falling water - easier maintenance access</li>
                <li className="pl-1"><strong>Counterflow:</strong> Air flows upward against falling water - more compact, higher efficiency</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Condenser Water Temperatures</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Condition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Flow (to chiller)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Return (from chiller)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Design (UK summer)</td>
                      <td className="border border-white/10 px-3 py-2">27-30°C</td>
                      <td className="border border-white/10 px-3 py-2">32-35°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Part load (spring/autumn)</td>
                      <td className="border border-white/10 px-3 py-2">20-25°C</td>
                      <td className="border border-white/10 px-3 py-2">25-30°C</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Free cooling potential</td>
                      <td className="border border-white/10 px-3 py-2">&lt;15°C</td>
                      <td className="border border-white/10 px-3 py-2">&lt;20°C</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-400/30">
              <p className="text-sm font-medium text-red-300 mb-2">Legionella Risk Management</p>
              <p className="text-sm text-white/80">
                Cooling towers create ideal conditions for Legionella growth (warm, aerated water with
                nutrients from airborne contamination). Compliance with L8 ACOP and HSG274 Part 1 is
                mandatory, requiring written risk assessments, competent water treatment, regular
                monitoring (including quarterly Legionella testing) and comprehensive records.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Cooling tower performance is limited by wet bulb temperature,
              not dry bulb. A tower cannot cool water below the wet bulb temperature. UK design wet
              bulb is typically 20°C, allowing condenser water as low as 23-25°C.
            </p>
          </div>
        </section>

        {/* Section 3: Pumping Arrangements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Primary-Secondary and Variable Primary Pumping
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pumping arrangement determines how water flows through the chiller plant and distribution
              system. The two main approaches - primary-secondary and variable primary flow - offer
              different trade-offs between complexity, capital cost and energy efficiency.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Primary-Secondary Pumping</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Primary pumps maintain constant flow through chillers (one pump per chiller)</li>
                <li className="pl-1">Secondary pumps distribute variable flow to building loads</li>
                <li className="pl-1">Bypass pipe (decoupler) connects the two circuits hydraulically</li>
                <li className="pl-1">When secondary flow &lt; primary, excess water bypasses back to return</li>
                <li className="pl-1">When secondary flow &gt; primary, warm return mixes with supply (avoid this)</li>
                <li className="pl-1">Simple, proven approach suitable for most applications</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Primary-Secondary System Rules</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Bypass pipe should be short with minimal fittings (&lt;0.5m head loss)</li>
                <li className="pl-1">Size bypass for full primary flow at &lt;1.5 m/s velocity</li>
                <li className="pl-1">Locate DP sensor at hydraulically most remote circuit</li>
                <li className="pl-1">Primary flow must always exceed or equal secondary flow</li>
                <li className="pl-1">Stage chillers based on return water temperature or load</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Variable Primary Flow (VPF)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Eliminates secondary pumps entirely - single set of variable speed pumps</li>
                <li className="pl-1">Water flows directly from chillers to loads and back</li>
                <li className="pl-1">Requires chillers rated for variable flow operation (minimum 30-50%)</li>
                <li className="pl-1">Bypass valve maintains minimum flow when load is very low</li>
                <li className="pl-1">25-35% pump energy savings compared to primary-secondary</li>
                <li className="pl-1">More sophisticated controls required for chiller staging</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Primary-Secondary</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Variable Primary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capital cost</td>
                      <td className="border border-white/10 px-3 py-2">Higher (more pumps)</td>
                      <td className="border border-white/10 px-3 py-2">Lower</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pump energy</td>
                      <td className="border border-white/10 px-3 py-2">Higher</td>
                      <td className="border border-white/10 px-3 py-2">25-35% lower</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control complexity</td>
                      <td className="border border-white/10 px-3 py-2">Simpler</td>
                      <td className="border border-white/10 px-3 py-2">More complex</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chiller requirements</td>
                      <td className="border border-white/10 px-3 py-2">Any chiller</td>
                      <td className="border border-white/10 px-3 py-2">Variable flow rated</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plant room space</td>
                      <td className="border border-white/10 px-3 py-2">Larger</td>
                      <td className="border border-white/10 px-3 py-2">Smaller</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Low delta T syndrome reduces system capacity
              regardless of pumping arrangement. Ensure control valves are correctly sized (50-70%
              open at design), coils are clean and properly selected, and system is correctly balanced.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Pipe Sizing and System Hydraulics */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Pipe Sizing and System Hydraulics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct pipe sizing balances capital cost against pump energy consumption. Undersized
              pipes increase pressure drop and pump energy; oversized pipes waste material and increase
              capital cost. CIBSE Guide C provides comprehensive guidance for pipe sizing in building services.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pipe Sizing Criteria</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pressure drop:</strong> 150-300 Pa/m for preliminary sizing</li>
                <li className="pl-1"><strong>Maximum velocity:</strong> 3.0 m/s in mains, 1.5 m/s near occupied spaces</li>
                <li className="pl-1"><strong>Minimum velocity:</strong> 0.5 m/s to avoid air accumulation</li>
                <li className="pl-1"><strong>Noise:</strong> Reduce velocity to 1.0-1.5 m/s for risers and branches</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flow Rate Calculation</p>
              <p className="font-mono text-center text-lg mb-2 text-white">Q = Cooling Load / (4.2 x ΔT x 1000)</p>
              <p className="text-xs text-white/70 text-center">Where Q is flow rate in l/s, cooling load in kW, ΔT in K (typically 6K)</p>
              <div className="mt-4 bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Example: 500kW cooling load</p>
                <p>Q = 500 / (4.2 x 6 x 1000) = 500 / 25,200 = 0.0198 m³/s</p>
                <p>Q = 19.8 l/s or 71.4 m³/h</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recommended Pipe Sizes (Steel)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Nominal Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Flow at 200 Pa/m</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Velocity at 200 Pa/m</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Approx. Capacity (kW)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DN50</td>
                      <td className="border border-white/10 px-3 py-2">2.0 l/s</td>
                      <td className="border border-white/10 px-3 py-2">1.0 m/s</td>
                      <td className="border border-white/10 px-3 py-2">50</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DN80</td>
                      <td className="border border-white/10 px-3 py-2">5.5 l/s</td>
                      <td className="border border-white/10 px-3 py-2">1.2 m/s</td>
                      <td className="border border-white/10 px-3 py-2">140</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DN100</td>
                      <td className="border border-white/10 px-3 py-2">10 l/s</td>
                      <td className="border border-white/10 px-3 py-2">1.4 m/s</td>
                      <td className="border border-white/10 px-3 py-2">250</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DN150</td>
                      <td className="border border-white/10 px-3 py-2">25 l/s</td>
                      <td className="border border-white/10 px-3 py-2">1.6 m/s</td>
                      <td className="border border-white/10 px-3 py-2">630</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DN200</td>
                      <td className="border border-white/10 px-3 py-2">50 l/s</td>
                      <td className="border border-white/10 px-3 py-2">1.8 m/s</td>
                      <td className="border border-white/10 px-3 py-2">1260</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Hydraulics</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Index circuit:</strong> The circuit with highest pressure drop - determines pump head</li>
                <li className="pl-1"><strong>Balancing:</strong> Adjust regulating valves to achieve design flow in all circuits</li>
                <li className="pl-1"><strong>Fittings allowance:</strong> Add 30-50% to straight pipe losses for fittings</li>
                <li className="pl-1"><strong>Control valve authority:</strong> Valve ΔP should be &gt;50% of circuit ΔP</li>
                <li className="pl-1"><strong>PICV:</strong> Pressure independent control valves combine balancing and control</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Free Cooling Integration</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Waterside free cooling uses plate heat exchanger between condenser and chilled water</li>
                <li className="pl-1">Available when wet bulb temperature drops below approximately 10°C</li>
                <li className="pl-1">Full free cooling (chillers off) possible when wet bulb &lt;5°C</li>
                <li className="pl-1">Partial free cooling pre-cools return water, reducing chiller load</li>
                <li className="pl-1">Can reduce annual chiller energy by 30-50% in UK climates</li>
                <li className="pl-1">Requires controls to switch between modes and manage transitions</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Commissioning note:</strong> All chilled water systems must be flushed, cleaned
              and chemically treated before commissioning. System balancing should achieve design flow
              rates ±10%. Document all commissioning results for O&amp;M manual.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Chiller Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A building has a design cooling load of 800kW. Compare the
                annual energy consumption of air-cooled (COP 3.0) vs water-cooled (COP 6.0) chillers
                operating 2500 equivalent full load hours.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Air-cooled annual energy:</p>
                <p>E = Load / COP x Hours = 800 / 3.0 x 2500 = 666,667 kWh</p>
                <p className="mt-2">Water-cooled annual energy:</p>
                <p>E = 800 / 6.0 x 2500 = 333,333 kWh</p>
                <p className="mt-2">Annual saving = 333,334 kWh</p>
                <p>At £0.15/kWh = <strong>£50,000 annual saving</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Chilled Water Flow Rate</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the chilled water flow rate for a 350kW AHU coil
                with 6/12°C chilled water.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Q = Cooling Load / (cp x ΔT x ρ)</p>
                <p>Q = 350 / (4.2 x 6 x 1000)</p>
                <p>Q = 350 / 25,200 = <strong>0.0139 m³/s = 13.9 l/s</strong></p>
                <p className="mt-2">Or: Q = 50 m³/h</p>
                <p className="mt-2 text-white/60">→ Select DN80 pipe (capacity ~14 l/s at 200 Pa/m)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Pump Head Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> The index circuit has 150m equivalent pipe length at 250 Pa/m,
                plus chiller (45 kPa), AHU coil (25 kPa) and control valve (15 kPa). Calculate pump head.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Pipe losses = 150m x 250 Pa/m = 37,500 Pa = 37.5 kPa</p>
                <p>Equipment losses = 45 + 25 + 15 = 85 kPa</p>
                <p className="mt-2">Total = 37.5 + 85 = 122.5 kPa</p>
                <p className="mt-2">Head in metres = 122.5 / 9.81 = <strong>12.5 m</strong></p>
                <p className="mt-2 text-white/60">→ Select pump for 13.9 l/s at 12.5 m head + margin</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Flow rate:</strong> Q = kW / (4.2 x ΔT x 1000) in m³/s</li>
                <li className="pl-1"><strong>COP:</strong> Cooling output / Electrical input</li>
                <li className="pl-1"><strong>Pump power:</strong> P = Q x ΔP / η (flow x pressure / efficiency)</li>
                <li className="pl-1"><strong>Cooling tower range:</strong> Entering - Leaving water temp</li>
                <li className="pl-1"><strong>Cooling tower approach:</strong> Leaving water - Wet bulb temp</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Chilled water: <strong>6/12°C</strong> (6K delta T)</li>
                <li className="pl-1">Condenser water: <strong>27/32°C</strong> typical design</li>
                <li className="pl-1">Max pipe velocity: <strong>3.0 m/s</strong> mains, <strong>1.5 m/s</strong> branches</li>
                <li className="pl-1">Pressure drop target: <strong>150-300 Pa/m</strong></li>
                <li className="pl-1">Minimum chiller flow: <strong>30-50%</strong> of design</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring glycol:</strong> If used, recalculate flow rates (lower specific heat)</li>
                <li className="pl-1"><strong>Oversizing control valves:</strong> Results in hunting and poor control</li>
                <li className="pl-1"><strong>Neglecting minimum flow:</strong> Chillers can freeze if flow too low</li>
                <li className="pl-1"><strong>Wrong DP sensor location:</strong> Must be at index circuit, not plantroom</li>
                <li className="pl-1"><strong>Ignoring water treatment:</strong> Leads to corrosion, fouling and Legionella risk</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <FAQAccordion faqs={faqs} />
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Chiller Types</p>
                <ul className="space-y-0.5">
                  <li>Air-cooled: COP 2.5-4.0, simpler</li>
                  <li>Water-cooled: COP 5.0-7.0, efficient</li>
                  <li>Scroll: up to 500kW</li>
                  <li>Screw: 200-2000kW</li>
                  <li>Centrifugal: &gt;500kW</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Design Temperatures</p>
                <ul className="space-y-0.5">
                  <li>CHW flow: 6°C</li>
                  <li>CHW return: 12°C</li>
                  <li>CDW flow: 27-30°C</li>
                  <li>CDW return: 32-35°C</li>
                  <li>Free cooling: WB &lt;10°C</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <QuizSection
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section3-4">
              Next: Terminal Units
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section3_3;
