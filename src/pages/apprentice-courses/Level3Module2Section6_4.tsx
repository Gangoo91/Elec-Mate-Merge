import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowLeft, ArrowRight, CheckCircle2, XCircle, Zap, Car, Leaf, Lightbulb, Fuel, Package, TreePine, Factory, Truck, Wrench } from "lucide-react";
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

const Level3Module2Section6_4 = () => {
  useSEO(
    "6.4 Reducing Carbon Footprint on Site - Level 3 Environmental Technologies",
    "Understanding practical strategies for reducing carbon footprint during electrical installation work"
  );

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      question: "What is typically the largest contributor to an electrical contractor's carbon footprint?",
      options: [
        "Office electricity use",
        "Vehicle fuel consumption",
        "Waste disposal",
        "Tool charging"
      ],
      correctAnswer: 1,
      explanation: "Vehicle fuel consumption typically accounts for 60-80% of an electrical contractor's operational carbon footprint. Travel between sites, material collection, and daily commuting all contribute. This is why fleet management and route optimisation have such a significant impact."
    },
    {
      question: "What does 'Scope 3 emissions' include for an electrical contractor?",
      options: [
        "Direct fuel use in company vehicles",
        "Electricity used in the office",
        "Emissions from materials purchased, waste disposal, and subcontractors",
        "Generator fuel on site"
      ],
      correctAnswer: 2,
      explanation: "Scope 3 covers indirect emissions in the value chain - materials purchased, waste disposal, subcontractor activities, employee commuting, and end-of-life of products installed. These often exceed direct (Scope 1 & 2) emissions but are harder to measure and control."
    },
    {
      question: "Which strategy would most effectively reduce transport-related carbon emissions?",
      options: [
        "Buying a bigger van",
        "Planning routes to combine site visits and material collection",
        "Driving faster between sites",
        "Using premium fuel"
      ],
      correctAnswer: 1,
      explanation: "Route optimisation - combining multiple stops and minimising unnecessary journeys - is one of the most effective strategies. Studies show contractors can reduce travel emissions by 15-25% through better planning, without any capital investment."
    },
    {
      question: "How does reducing material waste help lower carbon footprint?",
      options: [
        "It doesn't - waste is a separate issue",
        "Less waste means fewer disposal trips",
        "Every kg of waste represents embodied carbon that's been lost, plus transport and processing emissions",
        "Waste recycling is carbon negative"
      ],
      correctAnswer: 2,
      explanation: "Material waste represents wasted embodied carbon - all the emissions from extraction, manufacturing, and transport are lost when material goes to waste. Additionally, waste requires transport to disposal/recycling facilities, adding more emissions. Reducing waste addresses both impacts."
    },
    {
      question: "What is 'Eco-driving' in the context of reducing site carbon footprint?",
      options: [
        "Only driving electric vehicles",
        "Driving techniques that reduce fuel consumption such as smooth acceleration and maintaining tyre pressure",
        "Driving only on eco-friendly roads",
        "Using biofuel exclusively"
      ],
      correctAnswer: 1,
      explanation: "Eco-driving refers to driving techniques that reduce fuel consumption: smooth acceleration and braking, maintaining proper tyre pressure, removing unnecessary weight, avoiding idling, and using cruise control where appropriate. These can reduce fuel use by 10-15%."
    },
    {
      question: "Why should temporary site lighting preferably use LED fixtures?",
      options: [
        "They look more professional",
        "Building regulations require it",
        "LEDs use 75-80% less energy than halogen, reducing generator fuel consumption",
        "Halogen lights are illegal"
      ],
      correctAnswer: 2,
      explanation: "LED temporary lighting uses significantly less energy - typically 75-80% less than halogen. On sites using generators, this directly reduces diesel consumption. For grid-connected sites, it reduces electricity demand. The rapid payback makes LEDs the clear choice."
    },
    {
      question: "What is 'first-time fix' and why does it matter for carbon footprint?",
      options: [
        "Installing the cheapest available materials",
        "Completing work correctly on the first visit, avoiding return trips",
        "Using quick-setting compounds",
        "Starting work at first light"
      ],
      correctAnswer: 1,
      explanation: "First-time fix means completing work correctly on the initial visit, avoiding callbacks and return trips. Each return visit doubles the transport emissions for that job. Proper planning, carrying appropriate stock, and skilled workmanship all contribute to first-time fix rates."
    },
    {
      question: "How can site waste segregation reduce carbon footprint?",
      options: [
        "It doesn't affect carbon",
        "Segregated waste can be recycled more efficiently, avoiding virgin material production",
        "It makes the site look tidier",
        "It reduces skip collection frequency"
      ],
      correctAnswer: 1,
      explanation: "Proper segregation enables effective recycling. Recycling metals, for example, uses only 5-10% of the energy needed for virgin production. Mixed waste often ends up in landfill or energy-from-waste, losing the opportunity for material recovery and its associated carbon savings."
    },
    {
      question: "What is the carbon benefit of using battery-powered tools over petrol generators for charging?",
      options: [
        "There is no benefit",
        "Batteries charge faster",
        "Grid electricity is typically lower carbon than diesel generation, and batteries avoid continuous generator running",
        "Battery tools are always more powerful"
      ],
      correctAnswer: 2,
      explanation: "UK grid electricity is increasingly low-carbon (under 200g CO2/kWh) compared to diesel generation (~800-1000g CO2/kWh). Modern battery tools also avoid the waste from generators running at low load between tool uses. Where grid power is available, it's the lower-carbon choice."
    },
    {
      question: "Why is prefabrication considered beneficial for reducing site carbon footprint?",
      options: [
        "It's always cheaper",
        "Reduces on-site waste, transport trips, and generator running time",
        "It requires less skill",
        "Prefabricated items are always higher quality"
      ],
      correctAnswer: 1,
      explanation: "Prefabrication in controlled workshop conditions reduces on-site waste (better material utilisation), reduces the number of delivery trips (assembled units vs components), and reduces time on site (less generator running). It can reduce overall carbon footprint by 20-30% for suitable work."
    },
    {
      question: "What is 'carbon intensity' of electricity and why does it matter for site energy use?",
      options: [
        "How much the electricity costs",
        "The grams of CO2 emitted per kWh, which varies by time of day and season",
        "The voltage level",
        "The colour of the electricity meter"
      ],
      correctAnswer: 1,
      explanation: "Carbon intensity measures CO2 emissions per unit of electricity (g/kWh). It varies significantly - UK grid can be under 100g/kWh when wind is strong, or over 300g/kWh during evening peaks. Timing high-energy tasks during low-carbon periods can reduce emissions, though this is more relevant for sustained activities."
    },
    {
      question: "How does maintaining vehicles properly contribute to reducing carbon footprint?",
      options: [
        "It doesn't affect carbon emissions",
        "Well-maintained vehicles use less fuel - correct tyre pressure alone can improve efficiency by 3%",
        "It only affects vehicle reliability",
        "Maintenance is purely a cost issue"
      ],
      correctAnswer: 1,
      explanation: "Vehicle maintenance directly affects fuel efficiency. Under-inflated tyres increase rolling resistance (3% fuel penalty per 10psi under-inflation). Dirty air filters reduce efficiency. Engine tuning affects combustion efficiency. A well-maintained van can use 5-10% less fuel than a neglected one."
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "How do I calculate my site's carbon footprint?",
      answer: "Start with the main sources: fuel use (litres x emission factor ~2.68 kg CO2/litre diesel), electricity (kWh x grid intensity ~0.2 kg/kWh), and estimate waste. Many contractors use simple spreadsheets tracking fuel receipts and electricity meter readings. More comprehensive approaches include material embodied carbon and subcontractor emissions. The Carbon Trust offers free resources for SME carbon accounting."
    },
    {
      question: "Is switching to electric vans practical for electrical contractors?",
      answer: "Increasingly yes, but it depends on your work patterns. Electric vans now offer 150-200 mile ranges - sufficient for most urban/suburban work. Key considerations: home or depot charging capability, typical daily mileage, and payload requirements (batteries add weight). Many contractors find EVs work well for local work, keeping a diesel van for longer journeys during the transition. Government grants can offset higher purchase costs."
    },
    {
      question: "Does reducing carbon footprint actually save money?",
      answer: "Usually yes - carbon and cost often correlate. Fuel savings from eco-driving and route optimisation directly reduce costs. Material waste reduction saves purchasing costs. Energy-efficient site lighting reduces generator fuel bills. Some investments (like LED task lighting or van insulation) have payback periods under 2 years. The main exception is low-carbon materials which may have price premiums, though life-cycle costs often favour them."
    },
    {
      question: "How do I demonstrate carbon reduction to clients?",
      answer: "Keep records of your improvement journey - baseline measurements and progress over time are more convincing than absolute claims. Document specific actions taken (fleet efficiency, waste reduction programmes, material selection). Some contractors obtain ISO 14001 certification or join industry schemes like Constructionline. For larger contracts, clients may require carbon reporting as part of tender submissions - being prepared gives competitive advantage."
    },
    {
      question: "What's the quickest win for reducing carbon footprint?",
      answer: "For most electrical contractors, fuel efficiency improvements offer the quickest wins: route optimisation (free, immediate impact), eco-driving training (low cost, 10-15% fuel savings), and vehicle maintenance (tyres, filters). On the materials side, reducing waste through accurate ordering and returning unused stock provides immediate benefits. These require minimal investment but consistent attention to sustain improvements."
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
          <span className="text-[#FFD93D]">6.4</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden mb-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD93D]/5 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#FFD93D]/10 rounded-lg">
                <Leaf className="w-8 h-8 text-[#FFD93D]" />
              </div>
              <span className="px-3 py-1 text-xs font-medium bg-[#FFD93D]/10 text-[#FFD93D] rounded-full">
                Section 6.4
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#f5f5f5] mb-3">
              Reducing Carbon Footprint on Site
            </h1>
            <p className="text-[#a1a1a1]">
              Understanding practical strategies for minimising greenhouse gas emissions during electrical installation work - from transport and energy use to material efficiency and waste reduction.
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
              Site carbon footprint comes mainly from transport (60-80%), energy use, and material waste. Key reduction strategies: optimise routes, improve fuel efficiency through eco-driving and maintenance, reduce waste through accurate ordering, and choose efficient equipment. Small consistent changes add up to significant reductions.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <div className="flex items-center gap-2 mb-2">
              <TreePine className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-[#f5f5f5]">Spot it / Use it</h3>
            </div>
            <p className="text-sm text-[#a1a1a1]">
              Track fuel use weekly - just awareness often improves behaviour. Plan site visits to minimise trips. Carry sufficient stock to avoid return visits. Turn off generators when not actively needed. Segregate waste for recycling. These habits cost nothing but reduce both carbon and costs.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Understanding Site Carbon Footprint */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Factory className="w-5 h-5 text-[#FFD93D]" />
              Understanding Your Carbon Footprint
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                Every electrical installation project generates greenhouse gas emissions - from the fuel burned travelling to site, to the energy used by tools, to the embodied carbon in materials. Understanding where emissions come from is the first step to reducing them.
              </p>

              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                <h4 className="font-semibold text-[#f5f5f5] mb-3">The Three Scopes of Emissions</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-[#252525] rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="text-[#f5f5f5] font-medium">Scope 1 - Direct Emissions</span>
                    </div>
                    <p>Fuel burned in company vehicles, generators, heating. You have direct control.</p>
                  </div>
                  <div className="p-3 bg-[#252525] rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-elec-yellow" />
                      <span className="text-[#f5f5f5] font-medium">Scope 2 - Indirect Energy</span>
                    </div>
                    <p>Electricity purchased (office, workshop, site). Grid emissions from power generation.</p>
                  </div>
                  <div className="p-3 bg-[#252525] rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-blue-400" />
                      <span className="text-[#f5f5f5] font-medium">Scope 3 - Value Chain</span>
                    </div>
                    <p>Materials purchased, waste disposal, subcontractors, employee commuting. Hardest to control but often largest.</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-[#FFD93D]/10 rounded-lg border border-[#FFD93D]/30">
                <p className="text-sm text-[#f5f5f5]">
                  <strong>Typical breakdown for an electrical contractor:</strong> Transport (65%), materials embodied carbon (20%), site energy (10%), waste and other (5%). Your specific mix depends on work type - domestic installers have proportionally more transport; industrial installers may have more material impact.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            question="An electrical contractor's carbon footprint is mainly determined by the electricity they install, not their operational activities."
            correctAnswer={false}
            explanation="False. An electrical contractor's carbon footprint during installation is dominated by their operational activities - particularly vehicle fuel use (60-80%), followed by material waste and site energy use. The installed system's operational emissions belong to the building/client, not the contractor."
          />

          {/* Transport and Travel */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Car className="w-5 h-5 text-[#FFD93D]" />
              Transport: The Biggest Impact
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                For most electrical contractors, vehicle fuel consumption is the single largest source of carbon emissions. A typical diesel van produces approximately 2.68 kg of CO2 per litre of fuel burned. A contractor using 60 litres per week generates around 8 tonnes of CO2 annually from fuel alone.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <h4 className="font-semibold text-[#FFD93D] mb-3 flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Route Optimisation
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Plan daily routes to minimise total distance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Combine wholesaler visits with nearby site work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Use delivery services for bulky materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Cluster jobs by geographic area</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <h4 className="font-semibold text-[#FFD93D] mb-3 flex items-center gap-2">
                    <Fuel className="w-4 h-4" />
                    Eco-Driving Techniques
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Accelerate gently and anticipate stops</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Maintain steady speeds, use cruise control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Check tyre pressures weekly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Reduce idling - turn off when stationary</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                <h4 className="font-semibold text-[#f5f5f5] mb-2">Vehicle Maintenance Impact</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-[#252525] rounded">
                    <span>Under-inflated tyres (10 psi low)</span>
                    <span className="text-red-400">+3% fuel use</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[#252525] rounded">
                    <span>Dirty air filter</span>
                    <span className="text-red-400">+2-3% fuel use</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[#252525] rounded">
                    <span>Excess weight (100kg unnecessary)</span>
                    <span className="text-red-400">+1-2% fuel use</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[#252525] rounded">
                    <span>Poor wheel alignment</span>
                    <span className="text-red-400">+3% fuel use</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-[#888888]">
                  Combined effect of poor maintenance can exceed 10% additional fuel consumption.
                </p>
              </div>

              <p>
                <strong className="text-[#f5f5f5]">First-time fix:</strong> One of the most impactful strategies is completing work correctly on the first visit. Every callback doubles the transport emissions for that job. Proper planning, adequate stock, and careful workmanship all contribute to first-time fix rates.
              </p>
            </div>
          </section>

          {/* Site Energy Use */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#FFD93D]" />
              Site Energy Efficiency
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                Energy use on site comes from lighting, power tools, heating, and site facilities. The carbon intensity depends on whether you're using grid electricity or diesel generators - generators typically produce 4-5 times more CO2 per kWh than grid electricity.
              </p>

              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                <h4 className="font-semibold text-[#f5f5f5] mb-3">Energy Efficiency Measures</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-[#FFD93D] font-medium">LED Task Lighting:</span>
                    <p className="mt-1">Use LED work lights instead of halogen - 75-80% less energy for same light output. Modern LED tower lights can replace traditional generators for area lighting.</p>
                  </div>
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-[#FFD93D] font-medium">Battery Tools:</span>
                    <p className="mt-1">Modern cordless tools charged from grid power are more efficient than petrol generators running for intermittent use. Avoid running generators just to charge tools.</p>
                  </div>
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-[#FFD93D] font-medium">Generator Management:</span>
                    <p className="mt-1">Size generators appropriately - oversized generators running at low load are inefficient. Turn off when not needed rather than leaving idling. Consider solar-battery systems for small power needs.</p>
                  </div>
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-[#FFD93D] font-medium">Heating:</span>
                    <p className="mt-1">Where temporary heating is needed, electric heaters from grid power are lower carbon than diesel or propane. Focus heating on work areas rather than entire spaces.</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-[#FFD93D]/10 rounded-lg border border-[#FFD93D]/30">
                <p className="text-sm text-[#f5f5f5]">
                  <strong>Grid vs Generator:</strong> UK grid electricity emits approximately 200g CO2/kWh (and falling). Diesel generators emit approximately 800-1000g CO2/kWh. Where grid connection is available, always prefer it over generators for both carbon and cost reasons.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            question="Running a generator continuously is more fuel-efficient than repeatedly stopping and starting it."
            correctAnswer={false}
            explanation="False. While generators do use fuel during startup, the consumption during idle running far exceeds startup costs for typical intermittent use patterns. Turn generators off when not actively needed - the fuel savings and emission reductions are significant."
          />

          {/* Material Efficiency and Waste */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#FFD93D]" />
              Material Efficiency and Waste Reduction
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                Every piece of waste represents embodied carbon that's been lost - all the emissions from extraction, manufacturing, and transport are wasted when material goes to skip. Waste also generates additional emissions through transport to disposal facilities and processing.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <h4 className="font-semibold text-[#f5f5f5] mb-2">Reducing Material Waste</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Measure accurately before ordering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Plan cable runs to minimise off-cuts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Return unused materials to suppliers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Store materials properly to prevent damage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Keep useful off-cuts for smaller jobs</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <h4 className="font-semibold text-[#f5f5f5] mb-2">Effective Waste Segregation</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Separate metals - copper, steel, aluminium</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Keep cable off-cuts for scrap value</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Separate cardboard and clean plastics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Isolate hazardous items (lamps, batteries)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Avoid contaminating recyclables with food/liquids</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                <strong className="text-[#f5f5f5]">The carbon impact:</strong> Recycling copper uses only 10-15% of the energy needed for primary production. Recycling steel saves ~75% of primary production energy. Recycling aluminium saves ~95%. Every tonne recycled rather than landfilled saves significant carbon - but only if materials are properly segregated.
              </p>
            </div>
          </section>

          {/* Prefabrication Benefits */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#FFD93D]" />
              Off-Site Prefabrication
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                Prefabricating assemblies in controlled workshop conditions offers multiple carbon benefits compared to traditional on-site construction.
              </p>

              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                <h4 className="font-semibold text-[#f5f5f5] mb-3">Prefabrication Carbon Benefits</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-[#252525] rounded">
                    <div className="w-8 h-8 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 font-bold">1</span>
                    </div>
                    <div>
                      <span className="text-[#f5f5f5] font-medium">Reduced Waste:</span>
                      <p className="text-[#a1a1a1]">Workshop conditions allow better material utilisation - typical waste reductions of 20-30% compared to site work.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#252525] rounded">
                    <div className="w-8 h-8 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 font-bold">2</span>
                    </div>
                    <div>
                      <span className="text-[#f5f5f5] font-medium">Fewer Deliveries:</span>
                      <p className="text-[#a1a1a1]">Complete assemblies require fewer delivery trips than multiple component deliveries.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#252525] rounded">
                    <div className="w-8 h-8 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 font-bold">3</span>
                    </div>
                    <div>
                      <span className="text-[#f5f5f5] font-medium">Reduced Site Time:</span>
                      <p className="text-[#a1a1a1]">Less time on site means less generator running, less temporary heating/lighting, and reduced travel for extended works.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#252525] rounded">
                    <div className="w-8 h-8 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 font-bold">4</span>
                    </div>
                    <div>
                      <span className="text-[#f5f5f5] font-medium">Better Quality:</span>
                      <p className="text-[#a1a1a1]">Controlled conditions often mean higher quality work, reducing defects and callbacks.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                <strong className="text-[#f5f5f5]">Suitable applications:</strong> Pre-wired distribution boards, cable tray/basket assemblies, modular wiring systems, pre-formed containment runs, and pre-assembled lighting arrays all benefit from prefabrication. The approach works best for repetitive elements and projects with firm specifications.
              </p>
            </div>
          </section>

          <InlineCheck
            question="Prefabrication always reduces carbon footprint regardless of the project type."
            correctAnswer={false}
            explanation="False. Prefabrication benefits depend on the project. For repetitive, well-defined work, prefab offers significant carbon savings. For bespoke work with uncertain final requirements, site adaptation may be unavoidable. Projects with very short transport distances to site may see less benefit from consolidating deliveries."
          />

          {/* Measuring and Improving */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <TreePine className="w-5 h-5 text-[#FFD93D]" />
              Measuring and Improving
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                "You can't manage what you don't measure" - tracking key metrics helps identify opportunities and demonstrate improvement over time.
              </p>

              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                <h4 className="font-semibold text-[#f5f5f5] mb-3">Key Metrics to Track</h4>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2 p-2 bg-[#252525] rounded">
                    <span className="text-[#f5f5f5]">Fuel consumption</span>
                    <span>Litres per week/month</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-2 bg-[#252525] rounded">
                    <span className="text-[#f5f5f5]">Miles per litre</span>
                    <span>Track for each vehicle</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-2 bg-[#252525] rounded">
                    <span className="text-[#f5f5f5]">First-time fix rate</span>
                    <span>Jobs completed without callback</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-2 bg-[#252525] rounded">
                    <span className="text-[#f5f5f5]">Waste per job</span>
                    <span>Skip fills or kg per project value</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-2 bg-[#252525] rounded">
                    <span className="text-[#f5f5f5]">Recycling rate</span>
                    <span>% of waste recycled vs landfill</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#FFD93D]/10 rounded-lg border border-[#FFD93D]/30">
                <h4 className="font-semibold text-[#f5f5f5] mb-2">Simple Carbon Calculation</h4>
                <p className="text-sm mb-3">
                  For a quick estimate of your monthly carbon footprint:
                </p>
                <div className="space-y-1 text-sm font-mono bg-[#1a1a1a] p-3 rounded">
                  <p>Diesel litres x 2.68 = kg CO2 (vehicles)</p>
                  <p>Petrol litres x 2.31 = kg CO2 (vehicles)</p>
                  <p>Electricity kWh x 0.20 = kg CO2 (grid power)</p>
                  <p>Generator diesel litres x 2.68 = kg CO2 (site power)</p>
                </div>
                <p className="mt-3 text-xs text-[#888888]">
                  UK grid electricity factor is approximately 0.20 kg/kWh and decreasing. Check current figures at carbonintensity.org.uk for accuracy.
                </p>
              </div>

              <p>
                <strong className="text-[#f5f5f5]">Setting targets:</strong> Start with achievable goals - a 5% fuel reduction in year one, 10% waste reduction. As you identify opportunities and implement changes, targets can become more ambitious. Document actions taken so you can demonstrate what's driving improvement.
              </p>
            </div>
          </section>

          <InlineCheck
            question="Tracking fuel consumption weekly is enough to reduce carbon footprint, even without making any changes."
            correctAnswer={true}
            explanation="True, to an extent. The 'Hawthorne effect' means that simply measuring and paying attention to something often improves it. Awareness of fuel consumption naturally encourages more efficient behaviour. However, sustained improvement requires systematic changes beyond just monitoring."
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
                    <p className="text-green-400">Perfect score! Excellent understanding of carbon reduction strategies.</p>
                  ) : score >= quizQuestions.length * 0.8 ? (
                    <p className="text-green-400">Great work! You have a strong grasp of site carbon footprint reduction.</p>
                  ) : score >= quizQuestions.length * 0.6 ? (
                    <p className="text-[#FFD93D]">Good effort! Review the sections on transport and waste management.</p>
                  ) : (
                    <p className="text-orange-400">Keep learning! Focus on understanding the main sources of site emissions.</p>
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
            to="/apprentice-courses/level-3/module-2/section-6/6-3"
            className="flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 bg-[#252525] text-[#f5f5f5] rounded-lg border border-[#333333] hover:border-[#FFD93D]/50 transition-all duration-200 touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>6.3 Life-Cycle Thinking</span>
          </Link>
          <Link
            to="/apprentice-courses/level-3/module-2/section-6/6-5"
            className="flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 bg-[#FFD93D] text-[#1a1a1a] rounded-lg font-semibold hover:bg-[#FFD93D]/90 transition-all duration-200 touch-manipulation active:scale-[0.98]"
          >
            <span>6.5 Sustainability Culture</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Level3Module2Section6_4;
