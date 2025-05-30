import { useState } from "react";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Wrench, 
  Zap, 
  Cable, 
  ShoppingCart, 
  Scale, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Play,
  Eye,
  BadgePoundSterling,
  Clock,
  Star,
  DollarSign,
  Users,
  Award,
  BookOpen,
  Target,
  Settings,
  Plug
} from "lucide-react";

const BasicToolsMaterialsGuide = () => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const expandedCableQuiz = [
    {
      question: "What cable would you use for a standard ring main circuit in a domestic property?",
      options: ["1.5mm² T&E", "2.5mm² T&E", "4mm² T&E", "6mm² T&E"],
      correct: "2.5mm² T&E",
      explanation: "2.5mm² Twin & Earth is standard for ring main circuits (32A) in domestic installations as per BS 7671."
    },
    {
      question: "Which cable is suitable for external underground installation?",
      options: ["Standard T&E", "SWA Cable", "Flex Cable", "FP200"],
      correct: "SWA Cable",
      explanation: "Steel Wire Armoured (SWA) cable provides mechanical protection for underground installations and complies with BS 5467."
    },
    {
      question: "What cable would you use for a cooker circuit rated at 32A?",
      options: ["2.5mm² T&E", "4mm² T&E", "6mm² T&E", "10mm² T&E"],
      correct: "6mm² T&E",
      explanation: "6mm² T&E is typically used for 32A cooker circuits, though cable sizing depends on installation method and protection device."
    },
    {
      question: "Which cable maintains circuit integrity in fire conditions?",
      options: ["Standard T&E", "SWA", "FP200", "SY Cable"],
      correct: "FP200",
      explanation: "FP200 is a fire performance cable that maintains circuit integrity for 2 hours at 950°C, essential for fire alarm systems."
    },
    {
      question: "What size cable is typically used for lighting circuits in domestic installations?",
      options: ["1.0mm² T&E", "1.5mm² T&E", "2.5mm² T&E", "4mm² T&E"],
      correct: "1.5mm² T&E",
      explanation: "1.5mm² T&E is standard for domestic lighting circuits protected by a 6A MCB or 5A fuse."
    },
    {
      question: "Which cable type would you use for a shower circuit rated at 40A?",
      options: ["6mm² T&E", "10mm² T&E", "16mm² T&E", "25mm² T&E"],
      correct: "10mm² T&E",
      explanation: "10mm² T&E is typically suitable for electric shower circuits up to 40A, depending on installation method and route length."
    },
    {
      question: "What does the 'T&E' in cable specification stand for?",
      options: ["Tough & Earthed", "Twin & Earth", "Tested & Evaluated", "Thermal & Electric"],
      correct: "Twin & Earth",
      explanation: "T&E stands for Twin & Earth - referring to the two insulated conductors (live and neutral) plus the bare earth conductor."
    },
    {
      question: "Which cable would be most appropriate for a garden shed supply?",
      options: ["Standard T&E", "SWA Cable", "Flex Cable", "MICC Cable"],
      correct: "SWA Cable",
      explanation: "SWA (Steel Wire Armoured) cable provides the necessary mechanical protection for outdoor/underground installation to outbuildings."
    }
  ];

  const essentialToolsData = [
    {
      category: "Testing Equipment",
      priority: "Critical",
      tools: [
        { 
          name: "Multifunction Tester", 
          cost: "£300-800", 
          description: "Essential for all electrical testing - insulation resistance, continuity, RCD testing",
          brands: ["Megger", "Fluke", "Kewtech"]
        },
        { 
          name: "Voltage Tester", 
          cost: "£15-50", 
          description: "Two-pole voltage tester for proving dead before work",
          safety: "Must be GS38 compliant"
        },
        { 
          name: "Proving Unit", 
          cost: "£20-40", 
          description: "Tests your voltage tester is working properly",
          safety: "Essential part of safe isolation procedure"
        }
      ]
    },
    {
      category: "Hand Tools",
      priority: "Essential",
      tools: [
        { 
          name: "Insulated Screwdrivers", 
          cost: "£30-80 (set)", 
          description: "VDE approved screwdrivers for work near live parts",
          safety: "Must be individually tested to 10,000V"
        },
        { 
          name: "Side Cutters", 
          cost: "£20-60", 
          description: "For cutting cables and conductors",
          brands: ["Knipex", "Bahco", "CK Tools"]
        },
        { 
          name: "Wire Strippers", 
          cost: "£15-40", 
          description: "Self-adjusting strippers save time and prevent damage",
          tip: "Look for ones that adjust automatically"
        }
      ]
    },
    {
      category: "Power Tools",
      priority: "Important",
      tools: [
        { 
          name: "Cordless Drill/Driver", 
          cost: "£80-200", 
          description: "Essential for fixing and drilling. 18V systems most popular",
          brands: ["Makita", "DeWalt", "Milwaukee"]
        },
        { 
          name: "SDS Drill", 
          cost: "£100-300", 
          description: "For drilling masonry and concrete",
          safety: "Always use appropriate PPE and dust extraction"
        }
      ]
    }
  ];

  const ukMaterialGuide = [
    {
      type: "Twin & Earth (T&E)",
      sizes: ["1.0mm²", "1.5mm²", "2.5mm²", "4mm²", "6mm²", "10mm²", "16mm²"],
      applications: [
        "1.0mm² - Alarm circuits, door entry systems",
        "1.5mm² - Domestic lighting circuits (6A MCB)",
        "2.5mm² - Ring main circuits (32A MCB/RCBO)",
        "4mm² - Radial circuits, small cookers (20A)",
        "6mm² - Cooker circuits, large radials (32A)",
        "10mm² - Electric shower circuits (40A-45A)",
        "16mm² - Large appliances, sub-mains (63A)"
      ],
      standards: "BS 6004",
      colours: "Brown (L), Blue (N), Green/Yellow (E)",
      typical_uses: "Internal domestic and commercial wiring where mechanical protection not required"
    },
    {
      type: "Steel Wire Armoured (SWA)",
      sizes: ["1.5mm²", "2.5mm²", "4mm²", "6mm²", "10mm²", "16mm²", "25mm²", "35mm²", "50mm²", "70mm²", "95mm²"],
      applications: [
        "1.5mm² - Small outdoor lighting, garden circuits",
        "2.5mm² - Outdoor sockets, small outbuilding supplies",
        "4mm² - Medium outbuilding supplies, external equipment",
        "6mm² - Large outbuilding supplies, workshop feeds",
        "10mm² - Sub-main feeds to garages, workshops",
        "16mm² - Small industrial equipment, larger sub-mains",
        "25mm² - Industrial machinery, large sub-main feeds",
        "35mm²+ - High-current industrial applications, main distribution"
      ],
      standards: "BS 5467",
      colours: "Various core configurations available (2-core, 3-core, 4-core)",
      typical_uses: "Underground installations, external supplies, industrial environments requiring mechanical protection"
    },
    {
      type: "Fire Performance (FP200)",
      sizes: ["1.0mm²", "1.5mm²", "2.5mm²"],
      applications: [
        "Fire alarm systems and control panels",
        "Emergency lighting circuits",
        "Smoke extraction fan controls",
        "Fire suppression system wiring",
        "Emergency voice communication systems"
      ],
      standards: "BS EN 50200",
      colours: "Red sheath (fire circuits), other colours available",
      typical_uses: "Life safety systems that must continue operating during fire conditions"
    }
  ];

  const cableFittingsGuide = [
    {
      category: "SWA Cable Glands",
      description: "Essential for terminating Steel Wire Armoured cables safely and maintaining IP ratings",
      fittings: [
        {
          name: "20mm SWA Gland (CW20S)",
          cable_sizes: "6-12mm cable diameter",
          typical_cables: "1.5mm² to 4mm² SWA",
          thread: "M20 x 1.5",
          termination_steps: [
            "Strip outer sheath 50mm from cable end",
            "Fold back steel wire armour evenly",
            "Fit gland body through enclosure entry",
            "Slide compression ring over cable",
            "Tighten gland nut to compress armour wires",
            "Ensure armour makes good earth connection",
            "Tighten compression seal on inner sheath"
          ]
        },
        {
          name: "25mm SWA Gland (CW25S)",
          cable_sizes: "13-18mm cable diameter",
          typical_cables: "6mm² to 10mm² SWA",
          thread: "M25 x 1.5",
          termination_steps: [
            "Strip outer sheath 60mm from cable end",
            "Fold back steel wire armour evenly",
            "Fit gland body through panel cutout",
            "Position compression ring correctly",
            "Hand tighten gland nut initially",
            "Check armour wire positioning",
            "Final tighten to manufacturer's torque spec"
          ]
        },
        {
          name: "32mm SWA Gland (CW32S)",
          cable_sizes: "18-25mm cable diameter",
          typical_cables: "16mm² to 25mm² SWA",
          thread: "M32 x 1.5",
          termination_steps: [
            "Strip outer sheath 70mm from cable end",
            "Carefully fold back all armour wires",
            "Apply thread sealant to gland threads",
            "Insert through enclosure wall",
            "Position compression components correctly",
            "Ensure even compression of armour",
            "Test earth continuity through armour"
          ]
        }
      ]
    },
    {
      category: "T&E Cable Accessories",
      description: "Standard fittings for Twin & Earth cable installations",
      fittings: [
        {
          name: "Plastic Cable Grommet",
          cable_sizes: "6-10mm cable diameter",
          typical_cables: "1.5mm² to 2.5mm² T&E",
          thread: "Various sizes 16mm-25mm",
          termination_steps: [
            "Drill appropriate hole in enclosure",
            "Fit grommet into drilled hole",
            "Thread cable through grommet",
            "Ensure cable sheath protection",
            "No mechanical strain on conductors",
            "Maintain IP rating if required"
          ]
        },
        {
          name: "Stuffing Gland",
          cable_sizes: "Multiple cables 4-20mm total",
          typical_cables: "Multiple T&E cables",
          thread: "M20, M25 threads available",
          termination_steps: [
            "Insert cables through gland body",
            "Pack stuffing material around cables",
            "Ensure even distribution of packing",
            "Compress packing with gland nut",
            "Test seal integrity",
            "Verify strain relief on cables"
          ]
        }
      ]
    },
    {
      category: "Flexible Cable Glands",
      description: "For flexible and multicore cables in moving applications",
      fittings: [
        {
          name: "Nickel Plated Brass Gland",
          cable_sizes: "3-40mm diameter range",
          typical_cables: "SY cable, multicore flex",
          thread: "Metric and PG threads",
          termination_steps: [
            "Select correct size for cable diameter",
            "Strip outer sheath to required length",
            "Fit gland components in correct order",
            "Ensure strain relief on cable",
            "Tighten to achieve IP rating",
            "Test pull-out resistance"
          ]
        }
      ]
    }
  ];

  const toolSelection = [
    {
      task: "SWA Gland Installation",
      required_tools: [
        "SWA stripping knife or specialist stripper",
        "Sharp utility knife",
        "Cable cutters/hacksaw",
        "Spanners (correct size for gland)",
        "Torque wrench (for larger glands)",
        "Earth continuity tester"
      ],
      safety_considerations: [
        "Ensure supply is isolated and proved dead",
        "Wear cut-resistant gloves when stripping",
        "Use proper lifting techniques for heavy cables",
        "Check gland IP rating matches application"
      ]
    },
    {
      task: "T&E Cable Termination",
      required_tools: [
        "Cable strippers (automatic preferred)",
        "Sharp knife for sheath removal",
        "Terminal screwdrivers (various sizes)",
        "Wire nuts or connector blocks",
        "Insulation tape",
        "Cable identification labels"
      ],
      safety_considerations: [
        "Prove dead before starting work",
        "Ensure adequate strain relief",
        "Check terminal tightness",
        "Apply appropriate IP protection"
      ]
    }
  ];

  const apprenticeProgression = [
    {
      year: "Year 1",
      focus: "Basic Tools & Safety",
      budget: "£200-400",
      essentials: ["Basic hand tools", "PPE kit", "Simple multimeter", "Tool bag"],
      skills: "Learn safe handling and basic electrical principles"
    },
    {
      year: "Year 2", 
      focus: "Testing Equipment",
      budget: "£400-800",
      essentials: ["Multifunction tester", "Advanced hand tools", "Power tools"],
      skills: "Testing procedures, fault finding, installation methods"
    },
    {
      year: "Year 3",
      focus: "Specialisation",
      budget: "£300-600", 
      essentials: ["Specialist tools", "Additional test equipment", "Professional tool storage"],
      skills: "Design, inspection, certification, project management"
    }
  ];

  const ukSuppliersGuide = [
    {
      name: "Electrical Wholesalers",
      suppliers: ["CEF (City Electrical Factors)", "Rexel", "Edmundson Electrical", "TLC Electrical"],
      benefits: "Trade prices, technical support, local branches",
      apprenticeDiscount: "Many offer apprentice rates - ask for student card"
    },
    {
      name: "Tool Retailers", 
      suppliers: ["Screwfix", "Toolstation", "Machine Mart", "Travis Perkins"],
      benefits: "Competitive prices, online ordering, click & collect",
      apprenticeDiscount: "Some offer trade accounts with discounts"
    },
    {
      name: "Specialist Electrical",
      suppliers: ["RS Components", "Farnell", "CPC", "Rapid Electronics"],
      benefits: "Technical specification, next-day delivery, wide range",
      apprenticeDiscount: "Educational discounts available"
    }
  ];

  const handleQuizAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === expandedCableQuiz[currentQuiz].correct) {
      setQuizScore(quizScore + 1);
    }
    
    setTimeout(() => {
      if (currentQuiz < expandedCableQuiz.length - 1) {
        setCurrentQuiz(currentQuiz + 1);
        setSelectedAnswer(null);
      } else {
        setShowQuizResult(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setQuizScore(0);
    setShowQuizResult(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-elec-yellow">Basic Tools & Materials Guide</h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-6">
          Complete guide to electrical tools, materials, and equipment for UK apprentices. 
          Learn what you need, when you need it, and where to get the best deals.
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      {/* Interactive Cable Quiz - Enhanced */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-gray via-elec-dark/80 to-elec-gray">
        <CardHeader className="bg-elec-yellow/10 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cable className="h-7 w-7 text-elec-yellow" />
              <div>
                <CardTitle className="text-elec-yellow text-xl">Cable Selection Master Quiz</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Test your knowledge of UK cable types and applications</p>
              </div>
            </div>
            <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
              {expandedCableQuiz.length} Questions
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {!showQuizResult ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuiz + 1} of {expandedCableQuiz.length}
                  </span>
                  <div className="bg-elec-dark rounded-full h-2 w-32">
                    <div 
                      className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuiz + 1) / expandedCableQuiz.length) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  Score: {quizScore}/{currentQuiz + (selectedAnswer ? 1 : 0)}
                </span>
              </div>
              
              <div className="bg-elec-dark/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-6">
                  {expandedCableQuiz[currentQuiz].question}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {expandedCableQuiz[currentQuiz].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`p-4 h-auto text-left justify-start text-wrap ${
                        selectedAnswer === option
                          ? option === expandedCableQuiz[currentQuiz].correct
                            ? 'bg-green-500/20 border-green-500 text-green-300'
                            : 'bg-red-500/20 border-red-500 text-red-300'
                          : 'border-elec-yellow/30 hover:border-elec-yellow/60 hover:bg-elec-yellow/10'
                      }`}
                      onClick={() => handleQuizAnswer(option)}
                      disabled={selectedAnswer !== null}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{option}</span>
                        {selectedAnswer === option && (
                          <div className="ml-2">
                            {option === expandedCableQuiz[currentQuiz].correct ? (
                              <CheckCircle className="h-5 w-5 text-green-400" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-red-400" />
                            )}
                          </div>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
                
                {selectedAnswer && (
                  <div className="mt-6 p-4 bg-elec-yellow/10 rounded-lg border border-elec-yellow/20">
                    <div className="flex items-start gap-2">
                      <BookOpen className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-elec-yellow mb-1">Explanation</h4>
                        <p className="text-sm text-muted-foreground">
                          {expandedCableQuiz[currentQuiz].explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="bg-elec-dark/50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">Quiz Complete!</h3>
                <div className={`text-5xl font-bold mb-4 ${
                  quizScore >= expandedCableQuiz.length * 0.8 ? 'text-green-400' : 
                  quizScore >= expandedCableQuiz.length * 0.6 ? 'text-elec-yellow' : 'text-orange-400'
                }`}>
                  {Math.round((quizScore / expandedCableQuiz.length) * 100)}%
                </div>
                <p className="text-lg mb-6">
                  You scored <span className="font-bold text-elec-yellow">{quizScore}</span> out of{" "}
                  <span className="font-bold">{expandedCableQuiz.length}</span> questions correctly
                </p>
                
                <div className={`p-4 rounded-lg border ${
                  quizScore >= expandedCableQuiz.length * 0.8 
                    ? 'bg-green-500/20 border-green-500 text-green-300'
                    : quizScore >= expandedCableQuiz.length * 0.6
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-orange-500/20 border-orange-500 text-orange-300'
                }`}>
                  {quizScore >= expandedCableQuiz.length * 0.8 && (
                    <p className="font-medium">Excellent! You have a strong understanding of UK cable types and applications.</p>
                  )}
                  {quizScore >= expandedCableQuiz.length * 0.6 && quizScore < expandedCableQuiz.length * 0.8 && (
                    <p className="font-medium">Good work! Review BS 7671 cable selection requirements to improve further.</p>
                  )}
                  {quizScore < expandedCableQuiz.length * 0.6 && (
                    <p className="font-medium">Keep studying! Cable selection is crucial for safety and compliance. Review the materials section below.</p>
                  )}
                </div>
              </div>
              
              <Button onClick={resetQuiz} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                Take Quiz Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Essential Tools by Category - Enhanced */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Essential Tools for UK Electricians</CardTitle>
          </div>
          <p className="text-muted-foreground">Comprehensive guide to professional electrical tools and equipment</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {essentialToolsData.map((category, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{category.category}</h3>
                  <Badge variant="outline" className={`
                    ${category.priority === 'Critical' ? 'border-red-500 text-red-400' : 
                      category.priority === 'Essential' ? 'border-elec-yellow text-elec-yellow' : 
                      'border-blue-500 text-blue-400'}
                  `}>
                    {category.priority}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {category.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="bg-elec-dark/30 p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-white">{tool.name}</h4>
                        <span className="text-sm text-green-300 flex items-center gap-1">
                          <BadgePoundSterling className="h-4 w-4" />
                          {tool.cost}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                      
                      {tool.brands && (
                        <div className="mb-2">
                          <span className="text-xs font-medium text-elec-yellow">Recommended brands: </span>
                          <span className="text-xs text-muted-foreground">{tool.brands.join(', ')}</span>
                        </div>
                      )}
                      
                      {tool.safety && (
                        <div className="bg-orange-500/10 p-2 rounded border border-orange-500/30">
                          <p className="text-xs text-orange-300">
                            <Shield className="h-3 w-3 inline mr-1" />
                            {tool.safety}
                          </p>
                        </div>
                      )}
                      
                      {tool.tip && (
                        <div className="bg-blue-500/10 p-2 rounded border border-blue-500/30">
                          <p className="text-xs text-blue-300">
                            <Target className="h-3 w-3 inline mr-1" />
                            {tool.tip}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced UK Materials Guide - Enhanced */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cable className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">UK Electrical Materials Guide</CardTitle>
          </div>
          <p className="text-muted-foreground">Understanding British Standards, cable specifications, and applications</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {ukMaterialGuide.map((material, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2 text-xl">
                  <span className="text-2xl">⚡</span>
                  {material.type}
                </h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-elec-yellow mb-2">Available Sizes</h5>
                      <div className="flex flex-wrap gap-1">
                        {material.sizes.map((size, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-elec-yellow/40 text-elec-yellow">
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-elec-dark/50 p-3 rounded">
                      <p className="text-xs text-muted-foreground mb-1">
                        <strong className="text-elec-yellow">Standard:</strong> {material.standards}
                      </p>
                      <p className="text-xs text-muted-foreground mb-1">
                        <strong className="text-elec-yellow">Colours:</strong> {material.colours}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-elec-yellow">Typical Uses:</strong> {material.typical_uses}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-elec-yellow mb-2">Applications by Size</h5>
                    <ul className="text-xs text-muted-foreground space-y-1 max-h-32 overflow-y-auto">
                      {material.applications.map((app, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-400 mt-0.5">•</span>
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cable Fittings and Glands Guide */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Plug className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Cable Fittings & Glands Guide</CardTitle>
          </div>
          <p className="text-muted-foreground">Complete guide to cable termination, gland selection, and installation procedures</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {cableFittingsGuide.map((category, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{category.category}</h3>
                <p className="text-sm text-muted-foreground mb-6">{category.description}</p>
                
                <div className="space-y-6">
                  {category.fittings.map((fitting, fittingIndex) => (
                    <div key={fittingIndex} className="bg-elec-dark/30 p-5 rounded-lg">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-white mb-2">{fitting.name}</h4>
                          <p className="text-sm text-muted-foreground mb-1">
                            <strong className="text-elec-yellow">Cable Size:</strong> {fitting.cable_sizes}
                          </p>
                          <p className="text-sm text-muted-foreground mb-1">
                            <strong className="text-elec-yellow">Typical Cables:</strong> {fitting.typical_cables}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong className="text-elec-yellow">Thread:</strong> {fitting.thread}
                          </p>
                        </div>
                        
                        <div className="lg:col-span-2">
                          <h5 className="font-medium text-elec-yellow mb-3">Installation Steps</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {fitting.termination_steps.map((step, stepIndex) => (
                              <div key={stepIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="bg-elec-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                  {stepIndex + 1}
                                </span>
                                {step}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tool Selection for Cable Work */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Tools for Cable Termination Work</CardTitle>
          </div>
          <p className="text-muted-foreground">Essential tools and safety considerations for different cable work</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {toolSelection.map((task, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-5">
                <h4 className="font-semibold text-white mb-4">{task.task}</h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-elec-yellow mb-2">Required Tools</h5>
                    <ul className="space-y-1">
                      {task.required_tools.map((tool, toolIndex) => (
                        <li key={toolIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-orange-400 mb-2">Safety Considerations</h5>
                    <ul className="space-y-1">
                      {task.safety_considerations.map((safety, safetyIndex) => (
                        <li key={safetyIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-orange-400 mt-0.5 flex-shrink-0" />
                          {safety}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Apprentice Progression Guide */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">3-Year Apprentice Tool Progression</CardTitle>
          </div>
          <p className="text-muted-foreground">Strategic approach to building your professional toolkit</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {apprenticeProgression.map((year, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{year.year}</h3>
                      <p className="text-sm text-elec-yellow">{year.focus}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    {year.budget}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Essential Purchases</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {year.essentials.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white mb-2">Skills Development</h4>
                    <p className="text-sm text-muted-foreground">{year.skills}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* UK Suppliers Guide */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Where to Buy - UK Supplier Guide</CardTitle>
          </div>
          <p className="text-muted-foreground">Best places to purchase electrical tools and materials in the UK</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {ukSuppliersGuide.map((category, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-5">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-elec-yellow" />
                  {category.name}
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-elec-yellow mb-2">Suppliers</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {category.suppliers.map((supplier, idx) => (
                        <li key={idx}>• {supplier}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-elec-yellow mb-2">Benefits</h4>
                    <p className="text-sm text-muted-foreground">{category.benefits}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-elec-yellow mb-2">Apprentice Discounts</h4>
                    <p className="text-sm text-green-300">{category.apprenticeDiscount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Professional Tips */}
      <Card className="border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Professional Tips for Success</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Quality Investment Strategy</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Buy quality test equipment first - your safety depends on it
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Invest in tools you'll use daily, save on occasional-use items
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Consider tool insurance for expensive equipment
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Join tool manufacturer loyalty schemes for discounts
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Career Development</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  Build relationships with suppliers - they're valuable resources
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  Attend trade shows and manufacturer training events
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  Network with other electricians - share knowledge and opportunities
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  Stay updated with new technologies and regulations
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicToolsMaterialsGuide;
