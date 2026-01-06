
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
    <div className="space-y-6 animate-fade-in">
      {/* Hero Alert */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-green-500/20">
            <CheckCircle className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <p className="font-medium text-green-400 mb-1">Quality Tool Selection</p>
            <p className="text-sm text-white/70">
              Quality tool selection is crucial for your professional development. This guide helps you make informed decisions and avoid costly mistakes.
            </p>
          </div>
        </div>
      </div>

      {/* Quality Assessment Guide */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Star className="h-5 w-5 text-elec-yellow" />
            </div>
            Quality Assessment Guide
          </CardTitle>
          <p className="text-sm text-white/60">
            Learn to identify quality tools and avoid poor purchases
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {qualityIndicators.map((indicator, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-4">
                <h3 className="font-semibold text-white">{indicator.category}</h3>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-green-400">Look For:</h4>
                  <ul className="space-y-1.5">
                    {indicator.factors.map((factor, idx) => (
                      <li key={idx} className="text-sm text-white/60 flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-red-400">Red Flags:</h4>
                  <ul className="space-y-1.5">
                    {indicator.redFlags.map((flag, idx) => (
                      <li key={idx} className="text-sm text-white/60 flex items-start gap-2">
                        <AlertTriangle className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />
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
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <TrendingUp className="h-5 w-5 text-blue-400" />
            </div>
            Smart Purchasing Process
          </CardTitle>
          <p className="text-sm text-white/60">
            Follow this structured approach to make better tool purchases
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4">
            {purchasingGuidelines.map((stage, index) => (
              <div key={index} className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">{stage.stage}</h3>
                  <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                    {stage.duration}
                  </Badge>
                </div>
                <ul className="space-y-2">
                  {stage.activities.map((activity, idx) => (
                    <li key={idx} className="text-sm text-white/60 flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment Tip Alert */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-orange-500/20">
            <Shield className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <p className="font-medium text-orange-400 mb-1">Investment Tip</p>
            <p className="text-sm text-white/70">
              Buy quality tools once rather than cheap tools multiple times. A good tool will last your entire career and maintain its resale value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolSelectionTab;
