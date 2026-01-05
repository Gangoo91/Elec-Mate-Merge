import { ArrowLeft, ArrowRight, Zap, CheckCircle, AlertTriangle, Target } from 'lucide-react';
import { VoltageDropContent } from '@/components/upskilling/bs7671-module3/VoltageDropContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module3Section4 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the max voltage drop allowed for lighting?",
      options: [
        "5%",
        "3%",
        "2%",
        "7%"
      ],
      correct: 1,
      explanation: "BS 7671 allows maximum 3% voltage drop for lighting circuits to ensure adequate performance and energy efficiency."
    },
    {
      id: 2,
      question: "Which factor has the greatest effect on voltage drop?",
      options: [
        "Cable colour",
        "Installation method",
        "Cable length and cross-sectional area",
        "Ambient temperature"
      ],
      correct: 2,
      explanation: "Cable length and cross-sectional area have the greatest effect on voltage drop - longer runs and smaller cables increase voltage drop significantly."
    },
    {
      id: 3,
      question: "How can you reduce voltage drop in a long cable run?",
      options: [
        "Use smaller cables",
        "Increase conductor size or reduce cable length",
        "Change cable colour",
        "Add more circuits"
      ],
      correct: 1,
      explanation: "Increasing conductor cross-sectional area reduces resistance, thereby reducing voltage drop. Reducing cable length also helps."
    },
    {
      id: 4,
      question: "What is the basic voltage drop formula?",
      options: [
        "Vd = V × I × R",
        "Vd = mV/A/m × Current × Length",
        "Vd = Power / Voltage",
        "Vd = I² × R"
      ],
      correct: 1,
      explanation: "The basic voltage drop formula is Vd = mV/A/m × Current × Length (×2 for single phase to account for both conductors)."
    },
    {
      id: 5,
      question: "What is the consequence of high voltage drop?",
      options: [
        "Improved efficiency",
        "Better performance",
        "Reduced equipment performance and energy waste",
        "No significant effect"
      ],
      correct: 2,
      explanation: "High voltage drop reduces equipment performance, wastes energy, can cause equipment malfunction, and may lead to non-compliance."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <Link to="../bs7671-module-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Zap className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  Voltage Drop and System Design Limits
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-white">
                  Calculating and managing voltage drop within BS 7671 limits
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3.4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                15 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                Voltage drop is a critical design parameter that directly impacts equipment performance, energy efficiency, and regulatory compliance. When voltage drops below acceptable levels, motors run inefficiently, lights dim noticeably, and electronic equipment may malfunction or fail prematurely.
              </p>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                BS 7671 sets strict voltage drop limits to ensure installations perform optimally while maintaining safety standards. Understanding voltage drop calculations is essential for proper cable sizing, circuit design, and preventing costly installation failures.
              </p>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                This section provides comprehensive guidance on voltage drop theory, calculation methods, and practical solutions for ensuring your installations meet BS 7671 requirements while delivering reliable performance.
              </p>
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-sm sm:text-base text-white mb-4">
                By the end of this section, you will be able to:
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Analyse</strong> voltage drop effects on different types of electrical equipment and system performance</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Calculate</strong> voltage drop using BS 7671 methods for single-phase and three-phase circuits</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Evaluate</strong> cable sizing requirements to maintain voltage drop within regulatory limits (3% lighting, 5% power)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Apply</strong> correction factors for installation method, temperature, and grouping in voltage drop calculations</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Design</strong> circuit layouts and cable routes to minimise voltage drop in long cable runs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Recommend</strong> practical solutions for voltage drop issues in existing installations</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Content */}
          <VoltageDropContent />

          {/* Real World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">EV Charger Installation Problem</h4>
                <p className="text-sm mb-3">
                  An EV charger is installed 40 metres from the main panel using undersized cable. Voltage drop exceeds 6%, causing erratic charger behaviour.
                </p>
                <div className="bg-card p-3 rounded">
                  <p className="text-xs text-white">
                    <strong>Solution:</strong> Recalculation showed 10mm² cable was needed instead of 6mm². The contractor had to rewire the entire run, significantly increasing costs and disruption.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Always consider voltage drop during planning. It's more cost-effective to design right than to rewire later.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Points</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Voltage drop limits are mandatory: 3% for lighting, 5% for other circuits</li>
                  <li>• Cable length and cross-sectional area are the main factors</li>
                  <li>• Early calculation prevents costly rewiring later</li>
                  <li>• High voltage drop affects performance and wastes energy</li>
                  <li>• Use proper cable sizing tables and calculation methods</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <BS7671EmbeddedQuiz 
            questions={quizQuestions}
            title="Knowledge Check Quiz"
            description="Test your understanding of voltage drop calculations and requirements."
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-3-section-3">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-3-section-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section: Earthing & Protection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module3Section4;