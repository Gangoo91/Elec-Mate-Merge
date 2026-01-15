import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowLeft, ArrowRight, CheckCircle2, XCircle, Zap, Recycle, Leaf, Factory, Truck, Package, TreePine, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface InlineCheckProps {
  question: string;
  correctAnswer: boolean;
  explanation: string;
}

const InlineCheck = ({ question, correctAnswer, explanation }: InlineCheckProps) => {
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answer: boolean) => {
    setAnswered(answer);
    setShowExplanation(true);
  };

  const isCorrect = answered === correctAnswer;

  return (
    <div className="my-6 p-4 bg-gradient-to-br from-[#1a1a1a] to-[#252525] rounded-xl border border-[#333333]">
      <p className="text-[#f5f5f5] font-medium mb-3">{question}</p>
      {answered === null ? (
        <div className="flex gap-3">
          <button
            onClick={() => handleAnswer(true)}
            className="flex-1 min-h-[44px] bg-green-600/20 hover:bg-green-600/30 text-green-400 py-2 px-4 rounded-lg transition-all duration-200 touch-manipulation active:scale-[0.98]"
          >
            True
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 min-h-[44px] bg-red-600/20 hover:bg-red-600/30 text-red-400 py-2 px-4 rounded-lg transition-all duration-200 touch-manipulation active:scale-[0.98]"
          >
            False
          </button>
        </div>
      ) : (
        <div className={`p-3 rounded-lg ${isCorrect ? "bg-green-600/20 border border-green-500/30" : "bg-red-600/20 border border-red-500/30"}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <span className={isCorrect ? "text-green-400" : "text-red-400"}>
              {isCorrect ? "Correct!" : "Not quite right"}
            </span>
          </div>
          {showExplanation && <p className="text-[#a1a1a1] text-sm">{explanation}</p>}
        </div>
      )}
    </div>
  );
};

const Level3Module2Section6_3 = () => {
  useSEO(
    "6.3 Life-Cycle Thinking in Material Selection - Level 3 Environmental Technologies",
    "Understanding life-cycle assessment principles and sustainable material selection for electrical installations"
  );

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      question: "What does LCA stand for in sustainable material selection?",
      options: [
        "Low Carbon Assessment",
        "Life-Cycle Assessment",
        "Long-term Cost Analysis",
        "Limited Cable Application"
      ],
      correctAnswer: 1,
      explanation: "LCA stands for Life-Cycle Assessment, a methodology that evaluates environmental impacts throughout a product's entire life - from raw material extraction through manufacturing, use, and disposal."
    },
    {
      question: "Which phase of a cable's life cycle typically has the highest energy consumption?",
      options: [
        "Transportation to site",
        "Installation",
        "Operational use over lifetime",
        "End-of-life recycling"
      ],
      correctAnswer: 2,
      explanation: "The operational phase typically accounts for the highest energy consumption. Even small efficiency differences in cable resistance compound over 20-40 years of use, making operational losses far exceed manufacturing energy."
    },
    {
      question: "What is 'embodied carbon' in electrical materials?",
      options: [
        "Carbon content of insulation materials",
        "CO2 emissions during operation",
        "Total greenhouse gases from extraction, manufacturing, and transport",
        "Carbon footprint of the installation team"
      ],
      correctAnswer: 2,
      explanation: "Embodied carbon represents the total greenhouse gas emissions associated with extracting raw materials, manufacturing the product, and transporting it to site - before the product is even used."
    },
    {
      question: "Why might aluminium cables sometimes be more sustainable than copper for larger installations?",
      options: [
        "Aluminium is always cheaper",
        "Aluminium requires less energy to produce per kg and is more abundant",
        "Copper cannot be recycled",
        "Aluminium has better conductivity"
      ],
      correctAnswer: 1,
      explanation: "Aluminium requires approximately 65% less energy to produce per kg than copper, and aluminium ore (bauxite) is far more abundant. For larger cross-sections where the conductivity difference is less critical, aluminium can be more sustainable."
    },
    {
      question: "What is the typical copper recycling rate for electrical cables in the UK?",
      options: [
        "Around 40%",
        "Around 60%",
        "Around 85-90%",
        "100%"
      ],
      correctAnswer: 2,
      explanation: "Copper has excellent recyclability with rates of 85-90% in the UK electrical industry. Recycled copper requires only 10-15% of the energy needed for primary production, making end-of-life recovery highly valuable."
    },
    {
      question: "What does 'cradle-to-grave' mean in life-cycle assessment?",
      options: [
        "Assessment from raw material extraction to final disposal",
        "Assessment during manufacturing only",
        "Assessment during installation phase",
        "Assessment of burial cable installations"
      ],
      correctAnswer: 0,
      explanation: "Cradle-to-grave assessment covers the entire product lifecycle: from raw material extraction (cradle) through manufacturing, distribution, use, and final disposal or recycling (grave). It provides the most complete environmental picture."
    },
    {
      question: "Which factor should NOT be considered when selecting sustainable trunking systems?",
      options: [
        "Percentage of recycled content",
        "Expected service life",
        "The colour matching your van livery",
        "End-of-life recyclability"
      ],
      correctAnswer: 2,
      explanation: "Sustainable selection should focus on recycled content, durability/service life, recyclability, and environmental certifications - not aesthetic preferences that have no environmental impact."
    },
    {
      question: "What is an Environmental Product Declaration (EPD)?",
      options: [
        "A government fine for pollution",
        "A standardised document detailing a product's environmental impacts",
        "A manufacturer's marketing brochure",
        "A waste disposal certificate"
      ],
      correctAnswer: 1,
      explanation: "An EPD is a verified, standardised document (typically following ISO 14025) that provides transparent information about a product's environmental impacts across its life cycle. They enable objective comparison between products."
    },
    {
      question: "Why is cable sizing important from a life-cycle perspective?",
      options: [
        "Larger cables look more professional",
        "Correct sizing minimises operational losses over the cable's lifetime",
        "Smaller cables are always more sustainable",
        "Cable size only affects initial cost"
      ],
      correctAnswer: 1,
      explanation: "Correct cable sizing balances embodied carbon (more material = more embodied carbon) against operational losses (undersized cables waste energy as heat). Over 20-40 years, operational losses often outweigh the embodied carbon of slightly larger conductors."
    },
    {
      question: "What is 'circular economy' thinking in electrical installation?",
      options: [
        "Using only round cables",
        "Working in circular buildings",
        "Designing for reuse, repair, and recycling to eliminate waste",
        "Installing circular light fittings"
      ],
      correctAnswer: 2,
      explanation: "Circular economy principles aim to eliminate waste by keeping materials in use for as long as possible. In electrical work, this means selecting durable products, designing for disassembly, and ensuring materials can be recovered and recycled."
    },
    {
      question: "Which PVC alternative is often preferred for sustainable cable insulation?",
      options: [
        "Asbestos coating",
        "Lead sheathing",
        "LSZH (Low Smoke Zero Halogen) compounds",
        "Oil-based rubber"
      ],
      correctAnswer: 2,
      explanation: "LSZH compounds are increasingly preferred as they produce less toxic smoke when burned and don't release halogen gases. They're also often easier to recycle than PVC, making them more suitable for circular economy approaches."
    },
    {
      question: "What is 'material efficiency' in electrical installation?",
      options: [
        "Using the cheapest materials available",
        "Minimising waste while achieving the required performance",
        "Installing materials as quickly as possible",
        "Using materials from the nearest supplier"
      ],
      correctAnswer: 1,
      explanation: "Material efficiency means achieving the required function with minimum material use and waste. This includes accurate ordering, minimising off-cuts, using appropriate cable sizes, and returning unused materials for reuse."
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "How do I find life-cycle information for electrical products?",
      answer: "Look for Environmental Product Declarations (EPDs) on manufacturer websites or databases like the International EPD System. Many major manufacturers now publish EPDs for their products. Additionally, certifications like BREEAM, ISO 14001, and Cradle to Cradle provide lifecycle information. If EPDs aren't available, contact manufacturers directly - growing demand encourages them to develop this data."
    },
    {
      question: "Does sustainable material selection always cost more?",
      answer: "Not necessarily. While some sustainable alternatives have higher upfront costs, life-cycle thinking often reveals lower total costs. More efficient cables reduce energy bills over 20-40 years. Durable products need less frequent replacement. Recyclable materials retain value at end-of-life. The Construction Leadership Council reports that sustainable buildings often have lower lifetime costs despite slightly higher initial investment."
    },
    {
      question: "How should I balance sustainability against compliance with BS 7671?",
      answer: "Compliance with BS 7671 is non-negotiable - safety and regulation always come first. However, within compliant options, you can make sustainable choices. For example, when BS 7671 permits multiple cable sizes, choose based on lifecycle efficiency. When selecting equivalent-performing products, choose those with better environmental credentials. Sustainability should guide selection between compliant alternatives, not override safety requirements."
    },
    {
      question: "What's the difference between 'recycled content' and 'recyclability'?",
      answer: "Recycled content refers to the percentage of a product made from recycled materials (pre-consumer or post-consumer waste). Recyclability refers to whether the product can be recycled at end-of-life. Ideally, choose products with high recycled content that are also highly recyclable. Some products score well on one metric but poorly on the other - composite materials might contain recycled content but be difficult to recycle."
    },
    {
      question: "How do I explain life-cycle benefits to clients who focus only on initial cost?",
      answer: "Use concrete examples with figures. Show that a cable costing 15% more might save 20% in energy costs over its lifetime. Explain that durable products avoid replacement costs and disruption. Reference case studies from organisations like the Carbon Trust. For commercial clients, mention that sustainability credentials increasingly affect property values and tenant attraction. Frame it as investment rather than cost."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#333333]">
        <div className="flex items-center gap-2 p-3 md:p-4 text-xs md:text-sm text-[#a1a1a1]">
          <Link to="/apprentice-courses/level-3/module-2/section-6" className="hover:text-[#FFD93D] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span>/</span>
          <span>Level 3</span>
          <span>/</span>
          <span>Module 2</span>
          <span>/</span>
          <span className="text-[#FFD93D]">6.3</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden mb-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD93D]/5 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#FFD93D]/10 rounded-lg">
                <Recycle className="w-8 h-8 text-[#FFD93D]" />
              </div>
              <span className="px-3 py-1 text-xs font-medium bg-[#FFD93D]/10 text-[#FFD93D] rounded-full">
                Section 6.3
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#f5f5f5] mb-3">
              Life-Cycle Thinking in Material Selection
            </h1>
            <p className="text-[#a1a1a1]">
              Understanding how to evaluate and select electrical materials based on their complete environmental impact - from raw material extraction to end-of-life disposal.
            </p>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-[#FFD93D]" />
              <h3 className="font-semibold text-[#f5f5f5]">In 30 Seconds</h3>
            </div>
            <p className="text-sm text-[#a1a1a1]">
              Life-cycle assessment (LCA) evaluates environmental impacts from raw material extraction through manufacturing, use, and disposal. Selecting materials based on total lifecycle impact - not just purchase price - reduces environmental footprint and often lowers lifetime costs through better efficiency and durability.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-[#f5f5f5]">Spot it / Use it</h3>
            </div>
            <p className="text-sm text-[#a1a1a1]">
              Look for EPDs (Environmental Product Declarations) when specifying materials. Consider embodied carbon, operational efficiency, durability, and recyclability. A cable that costs 10% more but reduces losses by 15% over 30 years is often the more sustainable - and economical - choice.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Introduction to Life-Cycle Thinking */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <TreePine className="w-5 h-5 text-[#FFD93D]" />
              What is Life-Cycle Thinking?
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                Traditional purchasing decisions often focus solely on initial cost and immediate performance. Life-cycle thinking expands this view to consider environmental and economic impacts across a product's entire existence - from the moment raw materials are extracted from the earth until final disposal or recycling.
              </p>
              <p>
                For electrical installations, this approach reveals that decisions made during specification and purchasing have consequences for decades. A cable installed today might remain in service for 40+ years. The energy lost through resistance over that period often far exceeds the energy used to manufacture the cable in the first place.
              </p>

              <div className="mt-4 p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                <h4 className="font-semibold text-[#f5f5f5] mb-2">The Four Life-Cycle Stages</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Factory className="w-4 h-4 text-[#FFD93D] mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-[#f5f5f5] font-medium">Production:</span>
                      <span className="text-[#a1a1a1]"> Raw material extraction, processing, manufacturing, packaging</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Truck className="w-4 h-4 text-[#FFD93D] mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-[#f5f5f5] font-medium">Distribution:</span>
                      <span className="text-[#a1a1a1]"> Transport, storage, delivery to site</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-[#FFD93D] mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-[#f5f5f5] font-medium">Use Phase:</span>
                      <span className="text-[#a1a1a1]"> Energy consumption, maintenance, repairs over service life</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Recycle className="w-4 h-4 text-[#FFD93D] mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-[#f5f5f5] font-medium">End-of-Life:</span>
                      <span className="text-[#a1a1a1]"> Disposal, recycling, material recovery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            question="The operational phase of electrical equipment typically has a greater environmental impact than the manufacturing phase."
            correctAnswer={true}
            explanation="True. For most electrical equipment, the use phase dominates environmental impact. Even small inefficiencies compound over decades of operation, meaning operational losses typically far exceed the energy used in manufacturing."
          />

          {/* Embodied Carbon */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Factory className="w-5 h-5 text-[#FFD93D]" />
              Understanding Embodied Carbon
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                Embodied carbon represents the total greenhouse gas emissions associated with producing a material or product, including raw material extraction, manufacturing, and transportation to site. It's measured in kgCO2e (kilograms of carbon dioxide equivalent).
              </p>

              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                <h4 className="font-semibold text-[#f5f5f5] mb-3">Embodied Carbon in Common Materials</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-2 bg-[#252525] rounded">
                    <span>Copper (primary production)</span>
                    <span className="text-[#FFD93D] font-medium">~3.0-4.0 kgCO2e/kg</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[#252525] rounded">
                    <span>Copper (recycled)</span>
                    <span className="text-green-400 font-medium">~0.5-1.0 kgCO2e/kg</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[#252525] rounded">
                    <span>Aluminium (primary production)</span>
                    <span className="text-orange-400 font-medium">~8.0-12.0 kgCO2e/kg</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[#252525] rounded">
                    <span>Aluminium (recycled)</span>
                    <span className="text-green-400 font-medium">~0.5-1.5 kgCO2e/kg</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[#252525] rounded">
                    <span>PVC</span>
                    <span className="text-[#FFD93D] font-medium">~2.5-3.5 kgCO2e/kg</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[#252525] rounded">
                    <span>Steel (galvanised)</span>
                    <span className="text-[#FFD93D] font-medium">~2.5-3.0 kgCO2e/kg</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-[#888888]">
                  Note: Values are approximate and vary by source, manufacturing location, and energy mix.
                </p>
              </div>

              <p>
                <strong className="text-[#f5f5f5]">Key insight:</strong> Recycled metals have dramatically lower embodied carbon than primary production. Specifying materials with high recycled content significantly reduces embodied carbon. Copper and aluminium can be recycled indefinitely without quality loss, making them excellent choices when recycled feedstock is used.
              </p>
            </div>
          </section>

          {/* Copper vs Aluminium Decision */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#FFD93D]" />
              The Copper vs Aluminium Decision
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                The choice between copper and aluminium conductors illustrates life-cycle thinking in action. Neither is universally "better" - the optimal choice depends on application, installation conditions, and how you weight different environmental factors.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <h4 className="font-semibold text-orange-400 mb-2">Copper Advantages</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Higher conductivity (smaller cable for same current)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Lower resistance = lower operational losses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Excellent recyclability (85-90% recovery)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Well-established termination methods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>More compact - less containment needed</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <h4 className="font-semibold text-blue-400 mb-2">Aluminium Advantages</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Lower embodied carbon per kg</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Much lighter (important for large installations)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>More abundant raw material</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Lower initial cost for large cross-sections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Also highly recyclable</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-[#FFD93D]/10 rounded-lg border border-[#FFD93D]/30">
                <p className="text-sm text-[#f5f5f5]">
                  <strong>Practical guidance:</strong> For smaller installations and final circuits, copper's efficiency advantage typically outweighs aluminium's lower embodied carbon. For large cross-section cables (70mm+ and above), especially in submains and distribution, aluminium often makes environmental sense - the conductivity difference matters less at larger sizes, and the weight/material savings become significant.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            question="Using recycled aluminium instead of primary aluminium can reduce embodied carbon by over 90%."
            correctAnswer={true}
            explanation="True. Recycled aluminium requires only about 5-8% of the energy needed for primary aluminium production. This dramatic saving makes recycled content one of the most impactful factors in material selection."
          />

          {/* Cable Sizing and Lifecycle */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#FFD93D]" />
              Cable Sizing: The Life-Cycle Perspective
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                BS 7671 sets minimum cable sizes based on current-carrying capacity, voltage drop limits, and fault protection. However, meeting minimum requirements isn't always optimal from a life-cycle perspective.
              </p>

              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                <h4 className="font-semibold text-[#f5f5f5] mb-3">The Sizing Trade-off</h4>
                <p className="text-sm mb-3">
                  Consider a 30-metre submain carrying 63A for 25 years:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-3 gap-2 p-2 bg-[#252525] rounded font-medium text-[#f5f5f5]">
                    <span>Cable Size</span>
                    <span>Embodied Carbon</span>
                    <span>25yr Energy Loss</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-2 bg-[#252525] rounded">
                    <span>16mm (minimum)</span>
                    <span>~45 kgCO2e</span>
                    <span>~8,500 kWh</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-2 bg-[#252525] rounded">
                    <span>25mm</span>
                    <span>~65 kgCO2e</span>
                    <span>~5,400 kWh</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-2 bg-[#252525] rounded">
                    <span>35mm</span>
                    <span>~85 kgCO2e</span>
                    <span>~3,900 kWh</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-[#888888]">
                  Values are illustrative - actual figures vary with utilisation pattern and electricity carbon intensity.
                </p>
              </div>

              <p>
                The 35mm cable has nearly double the embodied carbon of the 16mm cable, but reduces energy losses by over 50%. At typical UK grid carbon intensity (~200g CO2/kWh), the operational carbon savings over 25 years far exceed the additional embodied carbon.
              </p>

              <p>
                <strong className="text-[#f5f5f5]">Key principle:</strong> For heavily loaded circuits with long service lives, upsizing cables beyond minimum requirements often reduces total lifecycle carbon. The "sweet spot" depends on loading, operating hours, and expected service life.
              </p>
            </div>
          </section>

          {/* EPDs and Product Selection */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#FFD93D]" />
              Environmental Product Declarations (EPDs)
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                Environmental Product Declarations are standardised documents that provide verified environmental data about products. They follow international standards (typically ISO 14025 and EN 15804) and enable objective comparison between similar products.
              </p>

              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                <h4 className="font-semibold text-[#f5f5f5] mb-3">What EPDs Tell You</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="p-2 bg-[#252525] rounded">
                    <span className="text-[#FFD93D]">Global Warming Potential (GWP):</span>
                    <p className="text-[#a1a1a1]">Total greenhouse gas emissions in kgCO2e</p>
                  </div>
                  <div className="p-2 bg-[#252525] rounded">
                    <span className="text-[#FFD93D]">Energy Use:</span>
                    <p className="text-[#a1a1a1]">Total primary energy demand (renewable and non-renewable)</p>
                  </div>
                  <div className="p-2 bg-[#252525] rounded">
                    <span className="text-[#FFD93D]">Water Use:</span>
                    <p className="text-[#a1a1a1]">Total water consumption during production</p>
                  </div>
                  <div className="p-2 bg-[#252525] rounded">
                    <span className="text-[#FFD93D]">Resource Depletion:</span>
                    <p className="text-[#a1a1a1]">Consumption of non-renewable resources</p>
                  </div>
                  <div className="p-2 bg-[#252525] rounded">
                    <span className="text-[#FFD93D]">Waste Generation:</span>
                    <p className="text-[#a1a1a1]">Hazardous and non-hazardous waste produced</p>
                  </div>
                  <div className="p-2 bg-[#252525] rounded">
                    <span className="text-[#FFD93D]">End-of-Life Scenarios:</span>
                    <p className="text-[#a1a1a1]">Recyclability and disposal impacts</p>
                  </div>
                </div>
              </div>

              <p>
                <strong className="text-[#f5f5f5]">Where to find EPDs:</strong> Check manufacturer websites, the International EPD System database (environdec.com), or specific industry databases. Major electrical manufacturers including Legrand, Schneider Electric, ABB, and Siemens publish EPDs for many product lines.
              </p>

              <p>
                When EPDs aren't available, look for other environmental credentials: ISO 14001 certification (environmental management), Cradle to Cradle certification, or manufacturer statements about recycled content and manufacturing practices.
              </p>
            </div>
          </section>

          <InlineCheck
            question="An Environmental Product Declaration (EPD) is a marketing document created by manufacturers to promote their products."
            correctAnswer={false}
            explanation="False. EPDs are independently verified documents following international standards (ISO 14025). They provide objective, comparable environmental data and must be verified by third parties. Unlike marketing materials, EPDs follow strict rules about what can be claimed."
          />

          {/* Circular Economy in Electrical Work */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Recycle className="w-5 h-5 text-[#FFD93D]" />
              Circular Economy Principles
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                The circular economy model aims to eliminate waste by keeping materials in use for as long as possible. Instead of the traditional "take-make-dispose" linear model, circular thinking focuses on designing out waste, keeping products and materials in use, and regenerating natural systems.
              </p>

              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                <h4 className="font-semibold text-[#f5f5f5] mb-3">Circular Economy in Practice</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-[#FFD93D] font-medium">Design for Longevity:</span>
                    <p className="mt-1">Select durable products that will last the full intended service life. A distribution board rated for 40 years beats a cheaper unit needing replacement in 15 years.</p>
                  </div>
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-[#FFD93D] font-medium">Design for Disassembly:</span>
                    <p className="mt-1">Choose products and installation methods that allow easy future modification or removal. Screw-fixed containment is more easily reused than adhesive-fixed.</p>
                  </div>
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-[#FFD93D] font-medium">Specify Recyclable Materials:</span>
                    <p className="mt-1">Prefer materials that can be recovered and recycled. Metals score highly; complex composites and mixed materials are harder to recycle.</p>
                  </div>
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-[#FFD93D] font-medium">Use Recycled Content:</span>
                    <p className="mt-1">Specify products with high recycled content to create market demand for recycled materials, closing the loop.</p>
                  </div>
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-[#FFD93D] font-medium">Minimise Waste:</span>
                    <p className="mt-1">Accurate ordering, careful cutting to minimise off-cuts, and returning unused materials to suppliers for reuse.</p>
                  </div>
                </div>
              </div>

              <p>
                <strong className="text-[#f5f5f5]">Real example:</strong> When selecting cable containment, consider: Steel trunking has high recycled content (typically 25-40%), is highly recyclable at end of life, and if properly installed can be reused when the building is refurbished. PVC trunking may cost less initially but has lower recycled content and can be harder to recycle.
              </p>
            </div>
          </section>

          {/* Practical Application */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-[#FFD93D]" />
              Making Sustainable Selections
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                Life-cycle thinking doesn't require complex calculations for every purchase. By understanding key principles, you can make better choices quickly:
              </p>

              <div className="space-y-3">
                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <h4 className="font-semibold text-[#f5f5f5] mb-2">Questions to Ask</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD93D]">1.</span>
                      <span>What's the expected service life, and is this product durable enough?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD93D]">2.</span>
                      <span>Does it contain recycled content? (Check manufacturer data)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD93D]">3.</span>
                      <span>Can it be recycled at end of life? What happens to it?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD93D]">4.</span>
                      <span>For cables: What are the operational losses over expected life?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD93D]">5.</span>
                      <span>Is there a more efficient alternative that's still compliant?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFD93D]">6.</span>
                      <span>Where is it manufactured? (Transport adds embodied carbon)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-[#FFD93D]/10 rounded-lg border border-[#FFD93D]/30">
                  <h4 className="font-semibold text-[#f5f5f5] mb-2">Specification Hierarchy</h4>
                  <p className="text-sm">
                    When specifying materials, consider (in order): <strong>1)</strong> Can we avoid using material at all? <strong>2)</strong> Can we reduce the quantity needed? <strong>3)</strong> Can we reuse existing materials? <strong>4)</strong> Can we specify recycled content? <strong>5)</strong> Can we ensure recyclability at end of life?
                  </p>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            question="Life-cycle thinking only applies to large commercial installations, not domestic work."
            correctAnswer={false}
            explanation="False. Life-cycle thinking applies at all scales. In domestic work, choosing durable accessories, efficient cables, and recyclable materials still makes a difference. The principles are the same - the scale is just smaller."
          />

          {/* Quiz Section */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#FFD93D]" />
              Knowledge Check
            </h2>

            {!quizComplete ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-[#a1a1a1]">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-sm text-[#FFD93D]">
                    Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg text-[#f5f5f5] mb-4">
                    {quizQuestions[currentQuestion].question}
                  </h3>

                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full min-h-[44px] text-left p-4 rounded-lg transition-all duration-200 touch-manipulation active:scale-[0.98] ${
                          showResult
                            ? index === quizQuestions[currentQuestion].correctAnswer
                              ? "bg-green-600/20 border-green-500 border"
                              : index === selectedAnswer
                              ? "bg-red-600/20 border-red-500 border"
                              : "bg-[#1a1a1a] border border-[#333333]"
                            : selectedAnswer === index
                            ? "bg-[#FFD93D]/20 border-[#FFD93D] border"
                            : "bg-[#1a1a1a] border border-[#333333] hover:border-[#FFD93D]/50"
                        }`}
                      >
                        <span className="text-[#f5f5f5]">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {showResult && (
                  <div className="mb-4 p-4 rounded-lg bg-[#1a1a1a] border border-[#333333]">
                    <p className="text-[#a1a1a1] text-sm">
                      {quizQuestions[currentQuestion].explanation}
                    </p>
                  </div>
                )}

                {showResult && (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full min-h-[44px] bg-[#FFD93D] text-[#1a1a1a] py-3 px-6 rounded-lg font-semibold hover:bg-[#FFD93D]/90 transition-all duration-200 touch-manipulation active:scale-[0.98]"
                  >
                    {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <div className="text-6xl font-bold text-[#FFD93D] mb-2">
                    {Math.round((score / quizQuestions.length) * 100)}%
                  </div>
                  <p className="text-[#a1a1a1]">
                    You scored {score} out of {quizQuestions.length}
                  </p>
                </div>

                <div className="mb-6 p-4 rounded-lg bg-[#1a1a1a] border border-[#333333]">
                  {score === quizQuestions.length ? (
                    <p className="text-green-400">Perfect score! Excellent understanding of life-cycle thinking.</p>
                  ) : score >= quizQuestions.length * 0.8 ? (
                    <p className="text-green-400">Great work! You have a strong grasp of sustainable material selection.</p>
                  ) : score >= quizQuestions.length * 0.6 ? (
                    <p className="text-[#FFD93D]">Good effort! Review the sections on embodied carbon and EPDs.</p>
                  ) : (
                    <p className="text-orange-400">Keep learning! Focus on understanding life-cycle stages and material selection criteria.</p>
                  )}
                </div>

                <button
                  onClick={resetQuiz}
                  className="min-h-[44px] bg-[#FFD93D] text-[#1a1a1a] py-3 px-6 rounded-lg font-semibold hover:bg-[#FFD93D]/90 transition-all duration-200 touch-manipulation active:scale-[0.98]"
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </section>

          {/* FAQs */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-6 flex items-center gap-2">
              <ChevronDown className="w-5 h-5 text-[#FFD93D]" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-[#333333] rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full min-h-[44px] flex items-center justify-between p-4 text-left bg-[#1a1a1a] hover:bg-[#252525] transition-colors touch-manipulation"
                  >
                    <span className="text-[#f5f5f5] font-medium pr-4">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#FFD93D] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#FFD93D] flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="p-4 bg-[#252525] border-t border-[#333333]">
                      <p className="text-[#a1a1a1] text-sm">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Link
            to="/apprentice-courses/level-3/module-2/section-6/6-2"
            className="flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 bg-[#252525] text-[#f5f5f5] rounded-lg border border-[#333333] hover:border-[#FFD93D]/50 transition-all duration-200 touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>6.2 Hazardous Disposal</span>
          </Link>
          <Link
            to="/apprentice-courses/level-3/module-2/section-6/6-4"
            className="flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 bg-[#FFD93D] text-[#1a1a1a] rounded-lg font-semibold hover:bg-[#FFD93D]/90 transition-all duration-200 touch-manipulation active:scale-[0.98]"
          >
            <span>6.4 Reducing Carbon Footprint</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Level3Module2Section6_3;
