
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Star, Shield, AlertTriangle, TrendingUp } from "lucide-react";
import ToolComparisonChart from "@/components/apprentice/tools-guide/ToolComparisonChart";

const ToolSelectionTab = () => {
  const qualityIndicators = [
    {
      category: "Build Quality",
      factors: [
        "Solid construction with minimal flex",
        "Quality materials (avoid cheap plastic)",
        "Smooth operation of moving parts",
        "Even paint/coating application",
        "Proper tool balance and ergonomics"
      ],
      redFlags: [
        "Excessive plastic construction",
        "Rough edges or poor finishing",
        "Wobbly joints or loose parts",
        "Unclear or missing markings"
      ]
    },
    {
      category: "Safety Compliance",
      factors: [
        "CE marking for European compliance",
        "VDE certification for electrical tools",
        "GS38 compliance for test equipment",
        "Valid calibration certificates",
        "Clear safety instructions included"
      ],
      redFlags: [
        "Missing safety certifications",
        "Unclear voltage ratings",
        "Poor insulation quality",
        "No proving unit with voltage indicators"
      ]
    },
    {
      category: "Value Assessment",
      factors: [
        "Warranty period (minimum 1 year)",
        "Local service availability",
        "Spare parts accessibility",
        "Brand reputation in UK market",
        "Total cost of ownership"
      ],
      redFlags: [
        "No warranty or very short period",
        "Unknown brand with no UK presence",
        "Unrealistic pricing (too cheap)",
        "No local service support"
      ]
    }
  ];

  const multimeterComparison = [
    {
      brand: "Fluke",
      model: "87V Industrial",
      price: "£300-400",
      rating: 5,
      warranty: "3 years",
      features: ["True RMS", "Temperature", "Frequency", "Min/Max recording"],
      pros: ["Industry standard reliability", "Excellent build quality", "Comprehensive functions"],
      cons: ["Higher price point", "Complex for beginners"],
      bestFor: "Professional electricians requiring maximum accuracy and reliability"
    },
    {
      brand: "Megger",
      model: "AVO410",
      price: "£120-180",
      rating: 4,
      warranty: "2 years",
      features: ["Auto-ranging", "Data hold", "Backlight", "Safety rated CAT III"],
      pros: ["Good UK brand", "Reliable performance", "Competitive pricing"],
      cons: ["Limited advanced features", "Basic display"],
      bestFor: "Apprentices and general electrical work"
    },
    {
      brand: "Martindale",
      model: "MM39",
      price: "£80-120",
      rating: 4,
      warranty: "1 year",
      features: ["Basic functions", "LED continuity", "Auto power-off"],
      pros: ["Budget-friendly", "Simple operation", "UK electrical focus"],
      cons: ["Limited functionality", "Basic build quality"],
      bestFor: "Basic electrical testing and apprentice training"
    }
  ];

  const purchasingGuidelines = [
    {
      stage: "Research Phase",
      duration: "1-2 weeks",
      activities: [
        "Read professional reviews and forums",
        "Check manufacturer specifications",
        "Compare prices from multiple suppliers",
        "Verify UK compliance and certifications",
        "Ask experienced colleagues for recommendations"
      ]
    },
    {
      stage: "Evaluation Phase",
      duration: "3-5 days",
      activities: [
        "Handle tools in person when possible",
        "Test basic functionality if allowed",
        "Check warranty terms and conditions",
        "Confirm local service availability",
        "Calculate total cost including accessories"
      ]
    },
    {
      stage: "Purchase Decision",
      duration: "1-2 days",
      activities: [
        "Choose reputable supplier with good return policy",
        "Verify delivery times and costs",
        "Check payment options and protection",
        "Register for warranty immediately",
        "Plan for proper storage and maintenance"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-green-500/50 bg-green-500/10">
        <CheckCircle className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          Quality tool selection is crucial for your professional development. This guide helps you make informed decisions and avoid costly mistakes.
        </AlertDescription>
      </Alert>

      {/* Quality Assessment Guide */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Star className="h-5 w-5" />
            Quality Assessment Guide
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Learn to identify quality tools and avoid poor purchases
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {qualityIndicators.map((indicator, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-medium text-white">{indicator.category}</h3>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-green-300">Look For:</h4>
                  <ul className="space-y-1">
                    {indicator.factors.map((factor, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-red-300">Red Flags:</h4>
                  <ul className="space-y-1">
                    {indicator.redFlags.map((flag, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Brand Comparison Example */}
      <ToolComparisonChart 
        title="Digital Multimeter Comparison"
        tools={multimeterComparison}
        category="test equipment"
      />

      {/* Smart Purchasing Process */}
      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Smart Purchasing Process
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Follow this structured approach to make better tool purchases
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {purchasingGuidelines.map((stage, index) => (
              <div key={index} className="border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-blue-200">{stage.stage}</h3>
                  <Badge variant="outline" className="border-blue-500/40 text-blue-400">
                    {stage.duration}
                  </Badge>
                </div>
                <ul className="space-y-1">
                  {stage.activities.map((activity, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert className="border-orange-500/50 bg-orange-500/10">
        <Shield className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200">
          <strong>Investment Tip:</strong> Buy quality tools once rather than cheap tools multiple times. A good tool will last your entire career and maintain its resale value.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ToolSelectionTab;
