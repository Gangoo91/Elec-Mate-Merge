
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
  Pound
} from "lucide-react";

const BasicToolsMaterialsGuide = () => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const cableQuiz = [
    {
      question: "What cable would you use for a standard ring main circuit in a domestic property?",
      options: ["1.5mm² T&E", "2.5mm² T&E", "4mm² T&E", "6mm² T&E"],
      correct: "2.5mm² T&E",
      explanation: "2.5mm² Twin & Earth is standard for ring main circuits (32A) in domestic installations."
    },
    {
      question: "Which cable is suitable for external underground installation?",
      options: ["Standard T&E", "SWA Cable", "Flex Cable", "FP200"],
      correct: "SWA Cable",
      explanation: "Steel Wire Armoured (SWA) cable provides mechanical protection for underground installations."
    },
    {
      question: "What cable would you use for a cooker circuit rated at 32A?",
      options: ["2.5mm² T&E", "4mm² T&E", "6mm² T&E", "10mm² T&E"],
      correct: "6mm² T&E",
      explanation: "6mm² T&E is typically used for 32A cooker circuits, though cable sizing depends on installation method and protection."
    },
    {
      question: "Which cable maintains circuit integrity in fire conditions?",
      options: ["Standard T&E", "SWA", "FP200", "SY Cable"],
      correct: "FP200",
      explanation: "FP200 is a fire performance cable that maintains circuit integrity for 2 hours at 950°C."
    }
  ];

  const handTools = [
    {
      category: "Cutting",
      tools: [
        { name: "Side Cutters", use: "Cutting cables and wires cleanly", warning: "Never use on live circuits" },
        { name: "Hacksaw", use: "Cutting conduit, trunking, and metal work", warning: "Ensure blade is tight and suitable for material" }
      ]
    },
    {
      category: "Measuring", 
      tools: [
        { name: "Tape Measure", use: "General measurement and marking", warning: "Check for damage to avoid inaccurate readings" },
        { name: "Laser Level", use: "Ensuring straight runs and level installations", warning: "Avoid looking directly into laser beam" },
        { name: "Multimeter", use: "Testing voltage, current, and resistance", warning: "Always check test leads before use" }
      ]
    },
    {
      category: "Gripping",
      tools: [
        { name: "Long Nose Pliers", use: "Gripping in confined spaces", warning: "Don't use as a hammer or lever" },
        { name: "Grips/Mole Wrenches", use: "Holding pipes and awkward shaped items", warning: "Can damage surfaces if over-tightened" }
      ]
    },
    {
      category: "Driving",
      tools: [
        { name: "Insulated Screwdrivers", use: "Working near live parts (up to 1000V)", warning: "Check insulation regularly for damage" },
        { name: "Pozi/Phillips Drivers", use: "Most modern electrical accessories", warning: "Use correct size to avoid cam-out damage" }
      ]
    }
  ];

  const powerTools = [
    {
      name: "Cordless Drill",
      safety: "Always wear safety glasses, check battery charge",
      neverDo: "Never drill into walls without checking for cables/pipes first"
    },
    {
      name: "SDS Drill", 
      safety: "Wear full PPE, secure workpiece properly",
      neverDo: "Never use without dust extraction in enclosed spaces"
    },
    {
      name: "Oscillating Multi-tool",
      safety: "Let blade stop completely before setting down",
      neverDo: "Never force the tool, let the blade do the work"
    }
  ];

  const cableTypes = [
    {
      type: "Twin & Earth (T&E)",
      function: "General domestic wiring",
      whereUsed: "Inside buildings, protected from mechanical damage",
      image: "🔌"
    },
    {
      type: "Flexible Cable (Flex)",
      function: "Connecting portable appliances",
      whereUsed: "Appliance leads, temporary connections",
      image: "🔗"
    },
    {
      type: "Steel Wire Armoured (SWA)",
      function: "Underground and external installations", 
      whereUsed: "Garden supplies, between buildings",
      image: "⚡"
    },
    {
      type: "Fire Performance (FP200)",
      function: "Maintains circuit integrity in fire",
      whereUsed: "Fire alarm systems, emergency lighting",
      image: "🔥"
    }
  ];

  const starterKit = [
    { item: "Basic hand tools set", cost: "£60-120", priority: "Month 1" },
    { item: "Cordless drill & bits", cost: "£80-150", priority: "Month 2" },
    { item: "Multimeter", cost: "£30-80", priority: "Month 1" },
    { item: "Voltage tester", cost: "£15-40", priority: "Month 1" },
    { item: "Tool bag/box", cost: "£25-60", priority: "Month 1" },
    { item: "PPE kit", cost: "£40-80", priority: "Month 1" }
  ];

  const handleQuizAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === cableQuiz[currentQuiz].correct) {
      setQuizScore(quizScore + 1);
    }
    
    setTimeout(() => {
      if (currentQuiz < cableQuiz.length - 1) {
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
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Basic Tools & Materials Guide</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Everything you need to know about electrical tools, materials, and equipment for apprentices
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      {/* Cable Selection Quiz */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cable className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Which Cable for This Job? - Interactive Quiz</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {!showQuizResult ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuiz + 1} of {cableQuiz.length}
                </span>
                <span className="text-sm text-muted-foreground">
                  Score: {quizScore}/{currentQuiz + (selectedAnswer ? 1 : 0)}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-4">
                {cableQuiz[currentQuiz].question}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cableQuiz[currentQuiz].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`p-4 h-auto text-left justify-start ${
                      selectedAnswer === option
                        ? option === cableQuiz[currentQuiz].correct
                          ? 'bg-green-500/20 border-green-500'
                          : 'bg-red-500/20 border-red-500'
                        : 'border-elec-yellow/20 hover:border-elec-yellow/40'
                    }`}
                    onClick={() => handleQuizAnswer(option)}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                    {selectedAnswer === option && (
                      <div className="ml-auto">
                        {option === cableQuiz[currentQuiz].correct ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                        )}
                      </div>
                    )}
                  </Button>
                ))}
              </div>
              
              {selectedAnswer && (
                <div className="mt-4 p-4 bg-elec-yellow/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-elec-yellow">Explanation:</strong> {cableQuiz[currentQuiz].explanation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-white">Quiz Complete!</h3>
              <p className="text-lg text-muted-foreground">
                You scored {quizScore} out of {cableQuiz.length}
              </p>
              <div className="text-sm text-muted-foreground">
                {quizScore === cableQuiz.length && "Perfect! You know your cables!"}
                {quizScore >= cableQuiz.length * 0.75 && quizScore < cableQuiz.length && "Great work! You're getting there."}
                {quizScore < cableQuiz.length * 0.75 && "Keep studying - cable selection is crucial for safety."}
              </div>
              <Button onClick={resetQuiz} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                Take Quiz Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Core Hand Tools */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Core Hand Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {handTools.map((category, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-white mb-3">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="border border-elec-yellow/20 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-2">{tool.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Use:</strong> {tool.use}
                      </p>
                      <div className="bg-orange-500/10 p-2 rounded-lg">
                        <p className="text-sm text-orange-300">
                          <AlertTriangle className="h-4 w-4 inline mr-1" />
                          {tool.warning}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="bg-elec-yellow/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-elec-yellow">Apprentice Tip:</strong> "Buy cheap, buy twice" - invest in quality tools 
                that will last your entire career. Cheap tools break when you need them most.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Power Tools */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Power Tools & Safety Basics</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {powerTools.map((tool, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-2">{tool.name}</h4>
                    <p className="text-sm text-green-300 mb-2">
                      <Shield className="h-4 w-4 inline mr-1" />
                      <strong>Safety:</strong> {tool.safety}
                    </p>
                    <p className="text-sm text-red-300">
                      <AlertTriangle className="h-4 w-4 inline mr-1" />
                      <strong>Never:</strong> {tool.neverDo}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Demo Video
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Materials Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cable className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Materials Overview</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cableTypes.map((cable, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{cable.image}</span>
                  <h4 className="font-medium text-white">{cable.type}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Function:</strong> {cable.function}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Where Used:</strong> {cable.whereUsed}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Apprentice Starter Kit */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Apprentice Starter Kit - Buying Guide</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">What every apprentice should own:</p>
            {starterKit.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-3 border border-elec-yellow/20 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-white">{item.item}</h4>
                  <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow mt-1">
                    {item.priority}
                  </Badge>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="text-sm text-green-300 flex items-center gap-1">
                    <Pound className="h-4 w-4" />
                    {item.cost}
                  </span>
                </div>
              </div>
            ))}
            <div className="bg-elec-yellow/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-elec-yellow">Where to buy:</strong> Toolstation, Screwfix, 
                CEF, Rexel. Check for apprentice discounts - many suppliers offer student rates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tool Comparison */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Cheap vs Professional Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-red-500/30 rounded-lg p-4">
              <h4 className="font-medium text-red-300 mb-3">Budget Tools (£5-15)</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Break easily under regular use</li>
                <li>• Poor accuracy and reliability</li>
                <li>• May not meet safety standards</li>
                <li>• Short warranty periods</li>
                <li>• Cost more in long run due to replacement</li>
              </ul>
            </div>
            
            <div className="border border-green-500/30 rounded-lg p-4">
              <h4 className="font-medium text-green-300 mb-3">Professional Tools (£25-60)</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Built to last entire career</li>
                <li>• Better accuracy and consistency</li>
                <li>• Meet all safety certifications</li>
                <li>• Lifetime warranties available</li>
                <li>• Retain resale value</li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="bg-elec-yellow/10 p-4 rounded-lg">
            <h4 className="font-medium text-elec-yellow mb-2">Investment Priorities</h4>
            <p className="text-sm text-muted-foreground">
              <strong>Invest in:</strong> Multimeter, insulated screwdrivers, side cutters<br/>
              <strong>Save on:</strong> Tape measures, basic hand tools until you can afford better
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Safety & Maintenance */}
      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Safety & Maintenance</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Daily Tool Checks</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Eye className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  Check power cables for damage
                </li>
                <li className="flex items-start gap-2">
                  <Eye className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  Inspect tool casings for cracks
                </li>
                <li className="flex items-start gap-2">
                  <Eye className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  Test voltage testers before use
                </li>
                <li className="flex items-start gap-2">
                  <Eye className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  Clean tools after use
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">PAT Testing Rules</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Class I tools: Annual testing required</li>
                <li>• Class II tools: 6-monthly in harsh environments</li>
                <li>• College workshops: Check local requirements</li>
                <li>• Keep records of all PAT tests</li>
                <li>• Never use tools with failed PAT tests</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicToolsMaterialsGuide;
