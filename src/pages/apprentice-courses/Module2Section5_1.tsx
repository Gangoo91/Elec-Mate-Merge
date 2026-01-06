import { ArrowLeft, Zap, CheckCircle, AlertTriangle, Shield, TestTube, Battery } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Conductors & Insulators - Level 2 Module 2 Section 5.1";
const DESCRIPTION = "Learn about conductors and insulators - definitions, examples, and practical applications in electrical installations.";

const quickCheckQuestions = [
  {
    id: "resistivity",
    question: "Which symbol represents resistivity in electrical calculations?",
    options: [
      "σ (sigma)",
      "ρ (rho)",
      "ε (epsilon)",
      "λ (lambda)"
    ],
    correctIndex: 1,
    explanation: "Resistivity is denoted by the Greek letter rho (ρ), measuring a material's resistance to current flow."
  },
  {
    id: "conductor-temp",
    question: "How does temperature affect metal conductor resistance?",
    options: [
      "Resistance decreases as temperature rises",
      "Resistance increases as temperature rises",
      "Temperature has no effect",
      "Resistance becomes zero at high temperature"
    ],
    correctIndex: 1,
    explanation: "Metal resistance generally increases with temperature - this must be considered in design calculations."
  },
  {
    id: "insulation-purpose",
    question: "The primary purpose of insulation in electrical cables is to:",
    options: [
      "Increase current capacity",
      "Prevent current leakage and provide safety",
      "Change conductor colour",
      "Reduce cable weight"
    ],
    correctIndex: 1,
    explanation: "Insulation prevents dangerous current leakage and provides essential safety protection."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is a good electrical conductor used in cables?",
    options: ["PVC", "Copper", "Rubber", "Ceramic"],
    correctAnswer: 1,
    explanation: "Copper has high conductivity, making it ideal for conductors in cables and busbars.",
  },
  {
    id: 2,
    question: "Which is commonly used as an electrical insulator in UK cables?",
    options: ["XLPE/PVC", "Aluminium", "Steel", "Graphite"],
    correctAnswer: 0,
    explanation: "XLPE and PVC are common polymer insulators in low-voltage cables.",
  },
  {
    id: 3,
    question: "What symbol is used for resistivity?",
    options: ["ρ (rho)", "σ (sigma)", "ε (epsilon)", "λ (lambda)"],
    correctAnswer: 0,
    explanation: "Resistivity is denoted by the Greek letter rho, ρ.",
  },
  {
    id: 4,
    question: "For metals like copper, how does resistance change with temperature?",
    options: ["Decreases as temperature rises", "Increases as temperature rises", "Unchanged", "Becomes zero"],
    correctAnswer: 1,
    explanation: "Metal resistance increases with temperature; design must consider operating temperature.",
  },
  {
    id: 5,
    question: "Increasing conductor cross‑sectional area will typically:",
    options: ["Increase resistance", "Decrease resistance", "Have no effect", "Reverse polarity"],
    correctAnswer: 1,
    explanation: "R = ρL/A – increasing A lowers resistance for the same material and length.",
  },
  {
    id: 6,
    question: "An example of an insulating material is:",
    options: ["Aluminium", "Silicon", "PVC", "Copper"],
    correctAnswer: 2,
    explanation: "PVC is used widely as an insulator around conductors.",
  },
  {
    id: 7,
    question: "Why is high insulation resistance important?",
    options: ["It increases load current", "It reduces leakage and shock risk", "It cools cables", "It raises voltage"],
    correctAnswer: 1,
    explanation: "High insulation resistance minimises leakage currents and the risk of shock and fire.",
  },
  {
    id: 8,
    question: "Which BS 7671 area is most relevant to choosing suitable materials?",
    options: ["Part 5 – Selection and erection", "Part 2 – Definitions", "Part 8 – Prosumer's installations only", "Part 1 – Scope only"],
    correctAnswer: 0,
    explanation: "Part 5 covers selection and erection of equipment and wiring systems.",
  },
  {
    id: 9,
    question: "The formula R = ρL/A shows that resistance:",
    options: ["Increases with cross-sectional area", "Is independent of material type", "Decreases with length", "Is proportional to resistivity and length"],
    correctAnswer: 3,
    explanation: "Resistance is directly proportional to resistivity (ρ) and length (L), and inversely proportional to cross-sectional area (A).",
  },
  {
    id: 10,
    question: "Which material property is most important for cable insulation?",
    options: ["Low resistivity", "High dielectric strength", "High conductivity", "Low melting point"],
    correctAnswer: 1,
    explanation: "High dielectric strength allows insulation to withstand voltage without breakdown, ensuring safety and reliability.",
  }
];

const faqs = [
  {
    question: "What's the difference between conductors and insulators?",
    answer: "Conductors (like copper) have low resistivity and allow current flow easily. Insulators (like PVC) have high resistivity and resist current flow, providing safety and preventing leakage."
  },
  {
    question: "Why is copper preferred over aluminium for most installations?",
    answer: "Copper has lower resistivity than aluminium, meaning smaller cable sizes can carry the same current. It's also easier to terminate and less prone to connection problems."
  },
  {
    question: "Can I repair damaged cable insulation with tape?",
    answer: "No. Damaged insulation in fixed wiring must be properly repaired or the cable replaced. Tape is not an acceptable permanent repair for mains voltage cables."
  },
  {
    question: "How does temperature affect cable performance?",
    answer: "Higher temperatures increase conductor resistance (reducing current capacity) and can degrade insulation. Cable ratings include temperature derating factors - see BS 7671 Appendix 4."
  },
  {
    question: "What does 'dielectric strength' mean?",
    answer: "Dielectric strength is the maximum voltage an insulating material can withstand before breakdown occurs. Higher dielectric strength means better insulation performance."
  }
];

const Module2Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2.5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 2.5.1
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Conductors and Insulators
              </h1>
              <p className="text-xl text-white max-w-3xl mt-2">
                Learn the fundamental properties of electrical materials and their applications
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Conductors:</strong> Low resistivity (ρ) - copper, aluminium allow current flow</li>
                <li><strong>Insulators:</strong> High resistivity - PVC, XLPE, rubber prevent current flow</li>
                <li><strong>Resistance formula:</strong> R = ρL/A (resistivity × length ÷ area)</li>
                <li><strong>Temperature effects:</strong> Metal resistance increases with heat</li>
                <li><strong>Safety:</strong> Good insulation prevents shock and fire risk</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> T&E copper cores, PVC sheathing, SWA armour, XLPE insulation</li>
                <li><strong>Use:</strong> Check cable markings for conductor/insulation type and ratings</li>
                <li><strong>Apply:</strong> Select appropriate materials for environment and load</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Define conductors and insulators with practical examples</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Understand resistivity (ρ) and factors affecting resistance</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Relate material properties to cable selection and safety</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply BS 7671 guidance when working with different materials</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Recognise temperature effects on conductor performance</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: Definitions and Properties */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Understanding Conductors and Insulators
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Electrical materials are classified by their ability to conduct electricity. This fundamental property, 
                measured as resistivity (ρ), determines how and where materials are used in electrical installations. 
                Understanding these properties is essential for safe cable selection, current capacity calculations, and fault analysis.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-card border border-border/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Conductors - Low Resistivity Materials
                  </h4>
                  <div className="space-y-2 text-blue-200 text-sm">
                    <div>
                      <p><strong>Copper (Cu):</strong> ρ ≈ 17.2 nΩ·m at 20°C</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Excellent conductivity and ductility</li>
                        <li>Easy to terminate and solder</li>
                        <li>Standard in T&E, flex, and most domestic wiring</li>
                        <li>Stable connections with minimal maintenance</li>
                      </ul>
                    </div>
                    <div>
                      <p><strong>Aluminium (Al):</strong> ρ ≈ 28.2 nΩ·m at 20°C</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>60% lighter than copper for same conductance</li>
                        <li>Requires larger CSA (approx. 1.6× copper)</li>
                        <li>Common in overhead lines and large feeders</li>
                        <li>Susceptible to creep and oxidation</li>
                      </ul>
                    </div>
                    <div>
                      <p><strong>Steel:</strong> Much higher resistivity</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Used as SWA armour and containment</li>
                        <li>Provides mechanical protection and earthing</li>
                        <li>Not suitable for primary current-carrying conductors</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card border border-border/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Insulators - High Resistivity Materials
                  </h4>
                  <div className="space-y-2 text-purple-200 text-sm">
                    <div>
                      <p><strong>PVC (Polyvinyl Chloride):</strong></p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Temperature rating: typically 70°C</li>
                        <li>Good chemical resistance and flexibility</li>
                        <li>Standard in T&E and domestic flex</li>
                        <li>LSF variants reduce smoke emission</li>
                      </ul>
                    </div>
                    <div>
                      <p><strong>XLPE (Cross-Linked Polyethylene):</strong></p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Higher temperature rating: typically 90°C</li>
                        <li>Better thermal and chemical resistance</li>
                        <li>Common in SWA and high-performance cables</li>
                        <li>Allows higher current ratings</li>
                      </ul>
                    </div>
                    <div>
                      <p><strong>Rubber and Elastomers:</strong></p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Excellent flexibility, especially at low temperatures</li>
                        <li>Suitable for mobile equipment and harsh environments</li>
                        <li>Varieties include natural rubber, silicone, EPDM</li>
                        <li>Specific formulations for oil, chemical, UV resistance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="space-y-2">
                  <p className="text-yellow-300">
                    <strong>Fundamental Formula:</strong> R = ρL/A
                  </p>
                  <div className="grid md:grid-cols-4 gap-4 text-xs text-yellow-200">
                    <div>
                      <p className="font-semibold">R = Resistance (Ω)</p>
                      <p>Total opposition to current flow</p>
                    </div>
                    <div>
                      <p className="font-semibold">ρ = Resistivity (Ω·m)</p>
                      <p>Material property (lower = better conductor)</p>
                    </div>
                    <div>
                      <p className="font-semibold">L = Length (m)</p>
                      <p>Distance current travels</p>
                    </div>
                    <div>
                      <p className="font-semibold">A = Cross-sectional area (m²)</p>
                      <p>Conductor size (larger = lower resistance)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-400/30 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-300 mb-2">Practical Example: Resistance Calculation</h4>
                <div className="text-indigo-200 text-sm space-y-2">
                  <p><strong>Scenario:</strong> 50m run of 2.5mm² copper conductor at 20°C</p>
                  <div className="bg-indigo-600/20 p-3 rounded font-mono text-xs">
                    <p>Given: ρ(copper) = 17.2 × 10⁻⁹ Ω·m, L = 50m, A = 2.5mm² = 2.5 × 10⁻⁶ m²</p>
                    <p>R = ρL/A = (17.2 × 10⁻⁹ × 50) / (2.5 × 10⁻⁶)</p>
                    <p>R = 8.6 × 10⁻⁷ / 2.5 × 10⁻⁶ = 0.344 Ω</p>
                  </div>
                  <p><strong>Application:</strong> This resistance affects voltage drop calculations and heating effects in the conductor.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Temperature Effects */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Temperature Effects on Materials
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Temperature significantly affects both conductors and insulators. Understanding these effects is 
                crucial for safe installation design, current capacity calculations, and long-term reliability. 
                BS 7671 provides detailed guidance on temperature considerations in Appendix 4.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-elec-yellow mb-3">Conductor Temperature Effects</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
                      <h5 className="font-semibold text-elec-yellow mb-2">Resistance Changes</h5>
                      <div className="space-y-2 text-elec-yellow text-sm">
                        <p><strong>Temperature Coefficient:</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Copper: α ≈ 0.00393/°C</li>
                          <li>Aluminium: α ≈ 0.00403/°C</li>
                          <li>Resistance increases linearly with temperature</li>
                        </ul>
                        <div className="bg-elec-yellow/20 p-2 rounded text-xs font-mono">
                          <p>R₂ = R₁[1 + α(T₂ - T₁)]</p>
                          <p className="text-white">Where R₁ is resistance at T₁, R₂ at T₂</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
                      <h5 className="font-semibold text-elec-yellow mb-2">Current Capacity Impact</h5>
                      <div className="space-y-2 text-elec-yellow text-sm">
                        <p><strong>Derating Factors (Appendix 4):</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Ambient temperature above 30°C</li>
                          <li>Grouping of multiple cables</li>
                          <li>Installation method variations</li>
                          <li>Soil thermal resistivity (buried cables)</li>
                        </ul>
                        <p className="text-xs"><strong>Example:</strong> 35°C ambient = 0.94 derating factor</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-elec-yellow mb-3">Insulation Temperature Ratings</h4>
                  <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
                      <h5 className="font-semibold text-elec-yellow mb-2">PVC Systems</h5>
                      <div className="text-elec-yellow text-sm space-y-1">
                        <p><strong>70°C conductor temperature</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Standard domestic installations</li>
                          <li>Most T&E and flex applications</li>
                          <li>Good general-purpose performance</li>
                          <li>Cost-effective solution</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
                      <h5 className="font-semibold text-elec-yellow mb-2">XLPE Systems</h5>
                      <div className="text-elec-yellow text-sm space-y-1">
                        <p><strong>90°C conductor temperature</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Higher current ratings possible</li>
                          <li>Common in SWA installations</li>
                          <li>Better thermal performance</li>
                          <li>Industrial and commercial preference</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
                      <h5 className="font-semibold text-elec-yellow mb-2">Special Applications</h5>
                      <div className="text-elec-yellow text-sm space-y-1">
                        <p><strong>Up to 180°C+</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Mineral insulated (MI) cables</li>
                          <li>Silicone rubber insulation</li>
                          <li>Fire survival cables</li>
                          <li>High-temperature environments</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">Worked Example: Temperature Correction</h4>
                  <div className="text-orange-200 text-sm space-y-2">
                    <p><strong>Scenario:</strong> 2.5mm² T&E cable in 40°C ambient, grouped with 5 other circuits</p>
                    <div className="bg-orange-600/20 p-3 rounded space-y-1">
                      <p><strong>Step 1:</strong> Base rating (Reference Method C) = 27A</p>
                      <p><strong>Step 2:</strong> Temperature derating (40°C) = 0.87</p>
                      <p><strong>Step 3:</strong> Grouping factor (6 circuits) = 0.57</p>
                      <p><strong>Result:</strong> Actual rating = 27 × 0.87 × 0.57 = 13.4A</p>
                    </div>
                    <p><strong>Conclusion:</strong> Significant reduction from base rating due to environmental factors</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border/30 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div className="text-elec-yellow space-y-2">
                    <p><strong>Critical Safety Points:</strong></p>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li>Overheated insulation can fail catastrophically, causing fire or shock risk</li>
                      <li>Always apply appropriate derating factors - don't rely on base cable ratings</li>
                      <li>Consider worst-case ambient conditions over the cable's lifetime</li>
                      <li>Monitor installation temperatures, especially in plant rooms and roof spaces</li>
                      <li>Thermal runaway can occur if cables overheat and resistance increases further</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Practical Selection and Installation */}
        <div className="mb-8">
          <div className="border-l-4 border-purple-500 dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Practical Selection and Installation
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Proper material selection requires systematic analysis of electrical, environmental, and economic factors. 
                BS 7671 Part 5 provides comprehensive guidance on selection and erection of electrical equipment and wiring systems.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-elec-yellow mb-3">Systematic Selection Process</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-card border border-border/30 p-4 rounded-lg">
                      <h5 className="font-semibold text-elec-yellow mb-2">Electrical Requirements</h5>
                      <div className="space-y-2 text-purple-200 text-sm">
                        <p><strong>Load Analysis:</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Maximum demand calculations</li>
                          <li>Diversity factors and load profiles</li>
                          <li>Future expansion requirements</li>
                          <li>Harmonic content considerations</li>
                        </ul>
                        <p><strong>Circuit Protection:</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Overcurrent device coordination</li>
                          <li>Earth fault protection requirements</li>
                          <li>Short circuit withstand capability</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-card border border-border/30 p-4 rounded-lg">
                      <h5 className="font-semibold text-elec-yellow mb-2">Environmental Assessment</h5>
                      <div className="space-y-2 text-purple-200 text-sm">
                        <p><strong>External Influences (BS 7671 Appendix 5):</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Ambient temperature range</li>
                          <li>Presence of water (AD classification)</li>
                          <li>Mechanical damage risk (AG classification)</li>
                          <li>Chemical/corrosive substances (AF)</li>
                        </ul>
                        <p><strong>Installation Conditions:</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Cable grouping and spacing</li>
                          <li>Ventilation and heat dissipation</li>
                          <li>Accessibility for maintenance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-elec-yellow mb-3">Installation Best Practices</h4>
                  <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-card border border-border/30 p-4 rounded-lg">
                      <h5 className="font-semibold text-elec-yellow mb-2">Mechanical Protection</h5>
                      <div className="text-purple-200 text-sm space-y-1">
                        <p><strong>Bending Radii:</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Single-core: 20× cable diameter</li>
                          <li>Multi-core: 12× cable diameter</li>
                          <li>SWA: 6× cable diameter</li>
                        </ul>
                        <p><strong>Support and Containment:</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Maximum unsupported spans</li>
                          <li>Cable tray loading calculations</li>
                          <li>Segregation from other services</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-card border border-border/30 p-4 rounded-lg">
                      <h5 className="font-semibold text-elec-yellow mb-2">Termination Quality</h5>
                      <div className="text-purple-200 text-sm space-y-1">
                        <p><strong>Connection Integrity:</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Correct terminal selection</li>
                          <li>Proper conductor preparation</li>
                          <li>Specified torque application</li>
                          <li>Insulation coordination</li>
                        </ul>
                        <p><strong>Long-term Reliability:</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Thermal cycling considerations</li>
                          <li>Corrosion protection</li>
                          <li>Maintenance accessibility</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-card border border-border/30 p-4 rounded-lg">
                      <h5 className="font-semibold text-elec-yellow mb-2">Testing and Verification</h5>
                      <div className="text-purple-200 text-sm space-y-1">
                        <p><strong>Initial Verification Tests:</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Continuity of protective conductors</li>
                          <li>Continuity of ring final circuits</li>
                          <li>Insulation resistance</li>
                          <li>Polarity</li>
                        </ul>
                        <p><strong>Advanced Tests:</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Earth fault loop impedance</li>
                          <li>RCD operation</li>
                          <li>Phase sequence</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">Case Study: Office Building Feeder Selection</h4>
                  <div className="text-blue-200 text-sm space-y-2">
                    <p><strong>Requirements:</strong> 63A three-phase feeder, 80m run, 35°C plant room</p>
                    <div className="bg-elec-yellow/20 p-3 rounded space-y-1">
                      <p><strong>Option 1 - Copper:</strong> 16mm² SWA, higher cost but compact</p>
                      <p><strong>Option 2 - Aluminium:</strong> 25mm² SWA, lower cost but larger</p>
                      <p><strong>Voltage Drop Check:</strong></p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Copper: (2.8 × 63 × 80) ÷ 1000 = 14.1V (3.1%)</li>
                        <li>Aluminium: (4.6 × 63 × 80) ÷ 1000 = 23.2V (5.1%)</li>
                      </ul>
                      <p><strong>Decision:</strong> Copper selected due to voltage drop limits, despite higher cost</p>
                    </div>
                    <p><strong>Learning Point:</strong> Material selection must consider all technical and economic factors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance for Apprentices</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Material Identification</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border border-border/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">Cable Markings</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-blue-200">
                    <li>Check conductor material (Cu/Al) and CSA</li>
                    <li>Identify insulation type (PVC/XLPE/LSF)</li>
                    <li>Note temperature ratings and standards</li>
                    <li>Verify voltage ratings and applications</li>
                  </ul>
                </div>
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">Visual Inspection</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-elec-yellow/80">
                    <li>Look for insulation damage or nicks</li>
                    <li>Check for overheating signs (discolouration)</li>
                    <li>Assess mechanical protection adequacy</li>
                    <li>Verify segregation from other services</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Common Mistakes to Avoid</h3>
              <div className="bg-card border border-border/30 p-4 rounded-lg">
                <ul className="list-disc pl-4 space-y-2 text-sm text-red-200">
                  <li><strong>Wrong material selection:</strong> Not considering environment or application requirements</li>
                  <li><strong>Inadequate protection:</strong> Exposing cables to mechanical damage or unsuitable conditions</li>
                  <li><strong>Poor terminations:</strong> Incorrect connectors, insufficient torque, or mixed materials</li>
                  <li><strong>Ignoring temperature:</strong> Not applying derating factors or considering ambient conditions</li>
                  <li><strong>Damaged insulation:</strong> Attempting repairs with tape instead of proper replacement</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Building Your Knowledge</h3>
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <ul className="list-disc pl-4 space-y-2 text-sm text-elec-yellow/80">
                  <li><strong>Study BS 7671 Part 5:</strong> Selection and erection of electrical equipment</li>
                  <li><strong>Learn Appendix 4:</strong> Current-carrying capacity and voltage drop tables</li>
                  <li><strong>Understand testing:</strong> How material properties affect test results</li>
                  <li><strong>Practice identification:</strong> Learn to read cable markings and specifications</li>
                  <li><strong>Stay informed:</strong> New materials and standards are regularly introduced</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-0 bg-transparent border-white/20 bg-none shadow-none overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg sm:text-xl font-semibold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-border/20">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <div className="mb-8 space-y-6">
          <Card className="p-6 bg-transparent border-white/20 bg-none shadow-none">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-elec-yellow" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">Conductors & Insulators Pocket Guide</h2>
              </div>
              <p className="text-sm text-white">
                Essential material properties and selection reference
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
              <div className="space-y-4">
                <div className="bg-card border border-border/30 p-3 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Common Conductors
                  </h4>
                  <ul className="space-y-1 text-blue-200 text-xs">
                    <li>• <strong>Copper:</strong> Low ρ, easy termination, T&E/flex</li>
                    <li>• <strong>Aluminium:</strong> Light, cheap, needs larger CSA</li>
                    <li>• <strong>Steel:</strong> SWA armour, earthing, not live conductors</li>
                    <li>• <strong>R = ρL/A:</strong> Bigger CSA = lower resistance</li>
                  </ul>
                </div>
                
                <div className="bg-card border border-border/30 p-3 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Common Insulators
                  </h4>
                  <ul className="space-y-1 text-purple-200 text-xs">
                    <li>• <strong>PVC:</strong> 70°C rating, T&E sheathing</li>
                    <li>• <strong>XLPE:</strong> 90°C rating, SWA insulation</li>
                    <li>• <strong>LSF/LSZH:</strong> Low smoke, fire performance</li>
                    <li>• <strong>Rubber:</strong> Flexible, harsh environments</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-card border border-elec-yellow/30 p-3 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">Key Checks</h4>
                  <ul className="space-y-1 text-elec-yellow text-xs">
                    <li>• <strong>Temperature:</strong> Apply derating factors (App 4)</li>
                    <li>• <strong>Environment:</strong> Match material to conditions</li>
                    <li>• <strong>Terminations:</strong> Correct lugs and torque</li>
                    <li>• <strong>Protection:</strong> Avoid mechanical damage</li>
                    <li>• <strong>Testing:</strong> IR ≥1MΩ, continuity checks</li>
                  </ul>
                </div>
                
                <div className="bg-card border border-border/30 p-3 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Safety Reminders
                  </h4>
                  <ul className="space-y-1 text-red-200 text-xs">
                    <li>• <strong>Isolation:</strong> Lock-off before conductor work</li>
                    <li>• <strong>Damage:</strong> Replace, don't tape fix insulation</li>
                    <li>• <strong>Mixed materials:</strong> Use bimetallic connectors</li>
                    <li>• <strong>Overheating:</strong> Check current capacity limits</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div className="text-center">
                  <p className="font-semibold text-white">Copper ρ</p>
                  <p className="text-white">17.2 nΩ·m</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-white">Aluminium ρ</p>
                  <p className="text-white">28.2 nΩ·m</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-white">PVC Rating</p>
                  <p className="text-white">70°C</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-white">XLPE Rating</p>
                  <p className="text-white">90°C</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quiz */}
        <Quiz 
          title="Test Your Knowledge: Conductors and Insulators"
          questions={quizQuestions}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="..">
              Next
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module2Section5_1;