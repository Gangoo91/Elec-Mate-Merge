import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Star, AlertTriangle, TrendingUp, Info, Award, Target } from "lucide-react";
import RecommendedBrands from "@/components/apprentice/tools-guide/RecommendedBrands";
import ToolComparisonChart from "@/components/apprentice/tools-guide/ToolComparisonChart";
import BudgetPlanningCalculator from "@/components/apprentice/tools-guide/BudgetPlanningCalculator";

const ToolSelectionTab = () => {
  const selectionCriteria = [
    {
      category: "Quality Standards",
      icon: <Star className="h-5 w-5" />,
      items: [
        "Look for tools with CE marking and relevant British Standards",
        "Check warranty periods - quality tools typically offer 2-5 years",
        "Read professional reviews and recommendations",
        "Consider tools used by established electricians"
      ]
    },
    {
      category: "Budget Planning",
      icon: <TrendingUp className="h-5 w-5" />,
      items: [
        "Prioritise safety-critical items (test equipment, PPE)",
        "Buy quality hand tools first - they last decades",
        "Consider second-hand power tools from reputable brands",
        "Plan purchases over 12-18 months to spread costs"
      ]
    },
    {
      category: "Common Mistakes",
      icon: <AlertTriangle className="h-5 w-5" />,
      items: [
        "Don't buy cheap test equipment - it's a safety risk",
        "Avoid complete tool sets - you'll rarely use everything",
        "Don't prioritise appearance over functionality",
        "Never compromise on PPE quality to save money"
      ]
    }
  ];

  const buyingTips = [
    { tip: "Start with apprentice tool lists from training providers", priority: "High" },
    { tip: "Join electrician forums for real-world recommendations", priority: "Medium" },
    { tip: "Visit trade shows for hands-on experience", priority: "Medium" },
    { tip: "Consider tool financing options for expensive items", priority: "Low" },
    { tip: "Build relationships with local tool suppliers", priority: "High" },
    { tip: "Keep receipts and warranty information organised", priority: "High" }
  ];

  const qualityAssessmentCriteria = [
    {
      category: "Build Quality",
      factors: [
        "Materials used (steel grade, plastic quality)",
        "Manufacturing tolerances and precision",
        "Finish quality and corrosion resistance",
        "Ergonomic design and comfort"
      ],
      weight: "30%"
    },
    {
      category: "Safety Standards",
      factors: [
        "CE marking and relevant standards compliance",
        "VDE certification for electrical tools",
        "Safety features and fail-safes",
        "Regular testing and validation"
      ],
      weight: "25%"
    },
    {
      category: "Performance",
      factors: [
        "Accuracy and reliability",
        "Speed and efficiency in operation",
        "Consistency over time",
        "Performance under various conditions"
      ],
      weight: "25%"
    },
    {
      category: "Value & Support",
      factors: [
        "Price vs. features ratio",
        "Warranty terms and coverage",
        "Availability of spares and repairs",
        "Brand reputation and support"
      ],
      weight: "20%"
    }
  ];

  const drillComparisons = [
    {
      brand: "DeWalt",
      model: "DCD791 18V XR",
      price: "£120-150",
      rating: 5,
      warranty: "3 years",
      features: ["Brushless motor", "15 torque settings", "LED worklight", "Compact design"],
      pros: ["Excellent build quality", "Long battery life", "Powerful performance"],
      cons: ["Premium price", "Heavy with battery"],
      bestFor: "Professional daily use, demanding applications"
    },
    {
      brand: "Makita",
      model: "DHP484 18V LXT",
      price: "£100-130",
      rating: 5,
      warranty: "3 years",
      features: ["Brushless motor", "21 torque settings", "Variable speed", "Belt clip"],
      pros: ["Reliable performance", "Good battery ecosystem", "Balanced weight"],
      cons: ["Basic LED light", "Limited accessories included"],
      bestFor: "Versatile applications, battery system compatibility"
    },
    {
      brand: "Bosch",
      model: "GSB 18V-55",
      price: "£80-110",
      rating: 4,
      warranty: "2 years",
      features: ["Electronic motor protection", "20 torque settings", "Keyless chuck", "Belt hook"],
      pros: ["Good value for money", "Reliable German engineering", "Wide availability"],
      cons: ["Brushed motor", "Shorter battery life"],
      bestFor: "Budget-conscious professionals, occasional use"
    }
  ];

  const multimeterComparisons = [
    {
      brand: "Fluke",
      model: "117 Electrician's Multimeter",
      price: "£180-220",
      rating: 5,
      warranty: "Lifetime",
      features: ["Non-contact voltage detection", "Low impedance measurement", "AutoV/LoZ", "CAT III 600V"],
      pros: ["Industry standard reliability", "Lifetime warranty", "Excellent accuracy"],
      cons: ["High initial cost", "Basic display"],
      bestFor: "Professional electrical testing, critical measurements"
    },
    {
      brand: "Klein Tools",
      model: "MM600 HVAC Multimeter",
      price: "£140-170",
      rating: 4,
      warranty: "2 years",
      features: ["Temperature measurement", "Differential measurement", "Large display", "CAT IV 600V"],
      pros: ["HVAC specific features", "Robust construction", "Good value"],
      cons: ["Limited to HVAC applications", "Bulky design"],
      bestFor: "HVAC and general electrical work"
    },
    {
      brand: "Uni-T",
      model: "UT139C Digital Multimeter",
      price: "£45-65",
      rating: 3,
      warranty: "1 year",
      features: ["True RMS", "Data hold", "Backlight", "CAT III 600V"],
      pros: ["Very affordable", "Basic functionality covered", "Compact size"],
      cons: ["Lower build quality", "Limited accuracy", "Short warranty"],
      bestFor: "Training, backup instrument, budget builds"
    }
  ];

  const commonMistakes = [
    {
      mistake: "Buying cheap test equipment",
      consequence: "Safety risk and unreliable measurements",
      solution: "Invest in quality test instruments - your safety depends on them",
      severity: "Critical"
    },
    {
      mistake: "Purchasing complete tool sets",
      consequence: "Waste money on tools you'll rarely use",
      solution: "Buy individual tools based on actual job requirements",
      severity: "Medium"
    },
    {
      mistake: "Ignoring brand ecosystem",
      consequence: "Incompatible batteries and accessories",
      solution: "Choose one power tool brand and stick with it",
      severity: "Medium"
    },
    {
      mistake: "Prioritising looks over function",
      consequence: "Tools that don't perform when needed",
      solution: "Focus on build quality and functionality first",
      severity: "Low"
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Info className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Smart tool selection combines quality assessment, brand comparison, and strategic budget planning to build a professional toolkit that serves you throughout your career.
        </AlertDescription>
      </Alert>

      {/* Quality Assessment Framework */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Target className="h-5 w-5" />
            Quality Assessment Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qualityAssessmentCriteria.map((criterion, index) => (
              <div key={index} className="border border-elec-yellow/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">{criterion.category}</h4>
                  <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                    {criterion.weight}
                  </Badge>
                </div>
                <ul className="space-y-1">
                  {criterion.factors.map((factor, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tool Comparisons */}
      <ToolComparisonChart
        title="Cordless Drill Comparison"
        tools={drillComparisons}
        category="cordless drill"
      />

      <ToolComparisonChart
        title="Digital Multimeter Comparison"
        tools={multimeterComparisons}
        category="digital multimeter"
      />

      {/* Budget Planning Calculator */}
      <BudgetPlanningCalculator />

      {/* Common Selection Mistakes */}
      <Card className="border-red-500/20 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Common Selection Mistakes to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commonMistakes.map((mistake, index) => (
              <div key={index} className="border border-red-500/30 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-white">{mistake.mistake}</h4>
                  <Badge 
                    variant="outline" 
                    className={`${
                      mistake.severity === 'Critical' ? 'border-red-500/40 text-red-400' :
                      mistake.severity === 'Medium' ? 'border-orange-500/40 text-orange-400' :
                      'border-yellow-500/40 text-yellow-400'
                    }`}
                  >
                    {mistake.severity}
                  </Badge>
                </div>
                <p className="text-sm text-red-200 mb-2">{mistake.consequence}</p>
                <div className="bg-red-500/20 rounded p-2">
                  <p className="text-sm text-red-100">{mistake.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <RecommendedBrands />

      <Alert className="border-orange-500/50 bg-orange-500/10">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200">
          <strong>Remember:</strong> Quality tools are a long-term investment. Use the assessment framework above to evaluate any tool purchase. When in doubt, consult experienced colleagues or your training provider.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ToolSelectionTab;
