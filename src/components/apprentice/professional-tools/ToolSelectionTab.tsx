
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Star, Award, TrendingUp, AlertTriangle, Info, Target, Shield } from "lucide-react";
import ToolSpecificationCard from "@/components/apprentice/tools-guide/ToolSpecificationCard";
import ToolComparisonChart from "@/components/apprentice/tools-guide/ToolComparisonChart";
import BudgetPlanningCalculator from "@/components/apprentice/tools-guide/BudgetPlanningCalculator";

const ToolSelectionTab = () => {
  const qualityFactors = [
    {
      factor: "Build Quality",
      description: "Material grade, construction standards, finishing quality",
      indicators: ["Solid metal construction", "Smooth operation", "Precision tolerances", "Durable coating"],
      priority: "high"
    },
    {
      factor: "Safety Standards",
      description: "Compliance with UK/EU safety regulations and certifications",
      indicators: ["CE marking", "VDE certification", "GS38 compliance", "BS EN standards"],
      priority: "critical"
    },
    {
      factor: "Brand Reputation",
      description: "Manufacturer track record and industry standing",
      indicators: ["Industry recognition", "Professional endorsements", "Long-term reliability", "Customer reviews"],
      priority: "medium"
    },
    {
      factor: "Warranty Coverage",
      description: "Protection period and service availability",
      indicators: ["Extended warranty", "Local service centres", "Parts availability", "Quick turnaround"],
      priority: "medium"
    }
  ];

  const priceVsValueMatrix = [
    { category: "Budget Tools", priceRange: "£20-50", value: "Basic functionality", bestFor: "Occasional use, learning" },
    { category: "Mid-Range", priceRange: "£50-150", value: "Good reliability", bestFor: "Regular professional use" },
    { category: "Premium", priceRange: "£150-300", value: "Superior quality", bestFor: "Daily professional use" },
    { category: "Professional", priceRange: "£300+", value: "Maximum durability", bestFor: "Heavy-duty applications" }
  ];

  const testEquipmentSpecs = [
    {
      name: "2-Pole Voltage Indicator",
      description: "Essential safety device for proving dead circuits before work",
      specifications: {
        voltage: "12V - 690V AC/DC",
        standard: "GS38 compliant",
        certification: "CE marked",
        material: "Insulated to CAT III"
      },
      priceRange: "£25-80",
      priority: "essential" as const,
      pros: ["Compact and portable", "Audio and visual indication", "Self-testing capability", "Robust construction"],
      cons: ["Requires proving unit", "Battery dependent", "Not suitable for all voltages"],
      buyingTips: [
        "Choose GS38 compliant models only",
        "Ensure proving unit is included",
        "Check battery life and replacement cost",
        "Verify voltage range covers your work"
      ],
      maintenanceNotes: "Test daily before use with proving unit. Replace batteries regularly and check leads for damage."
    },
    {
      name: "Digital Multimeter",
      description: "Versatile instrument for measuring voltage, current, and resistance",
      specifications: {
        voltage: "Up to 1000V AC/DC",
        standard: "CAT III/IV rated",
        certification: "CE marked",
        capacity: "10A current measurement"
      },
      priceRange: "£80-300",
      priority: "essential" as const,
      pros: ["Multiple measurement functions", "High accuracy", "Data logging capability", "Auto-ranging"],
      cons: ["More complex to use", "Higher cost", "Requires training"],
      buyingTips: [
        "Choose appropriate CAT rating for your work",
        "Consider True RMS capability",
        "Check probe quality and safety rating",
        "Verify calibration certificate"
      ],
      maintenanceNotes: "Annual calibration required. Store in protective case and avoid moisture exposure."
    }
  ];

  const multimeterComparisons = [
    {
      brand: "Fluke",
      model: "117 Electrician's Multimeter",
      price: "£180-220",
      rating: 5,
      warranty: "Lifetime limited",
      features: ["True RMS", "Non-contact voltage detection", "AutoV/LoZ", "LED backlight"],
      pros: ["Industry standard reliability", "Excellent build quality", "Comprehensive warranty"],
      cons: ["Higher initial cost", "Basic current measurement"],
      bestFor: "Professional electricians requiring maximum reliability and accuracy"
    },
    {
      brand: "Megger",
      model: "AVO410 Digital Multimeter",
      price: "£120-150",
      rating: 4,
      warranty: "3 years",
      features: ["CAT IV 600V rated", "True RMS", "Data hold", "Auto power off"],
      pros: ["Good value for money", "Robust construction", "UK brand support"],
      cons: ["Limited advanced features", "Smaller display"],
      bestFor: "Apprentices and professionals seeking reliable UK-made quality at reasonable cost"
    },
    {
      brand: "Martindale",
      model: "MM39 Digital Multimeter",
      price: "£80-100",
      rating: 4,
      warranty: "2 years",
      features: ["CAT III 600V", "Basic measurements", "Continuity buzzer", "Compact design"],
      pros: ["Budget-friendly", "Simple operation", "Lightweight"],
      cons: ["Basic functionality", "No advanced features"],
      bestFor: "Budget-conscious users needing basic measurement capabilities for domestic work"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-green-500/20 text-green-400 border-green-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Info className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Quality tool selection is crucial for professional success. This guide covers assessment criteria, value analysis, and detailed specifications to help you make informed purchasing decisions.
        </AlertDescription>
      </Alert>

      {/* Detailed Tool Selection Tabs - Moved to Top */}
      <Tabs defaultValue="specifications" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="specifications">Tool Specifications</TabsTrigger>
          <TabsTrigger value="comparisons">Brand Comparisons</TabsTrigger>
          <TabsTrigger value="budget-planning">Budget Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="specifications">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-4">Detailed Tool Specifications</h3>
            {testEquipmentSpecs.map((tool, index) => (
              <ToolSpecificationCard key={index} tool={tool} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparisons">
          <ToolComparisonChart 
            title="Professional Multimeter Comparison"
            tools={multimeterComparisons}
            category="multimeter"
          />
        </TabsContent>

        <TabsContent value="budget-planning">
          <BudgetPlanningCalculator />
        </TabsContent>
      </Tabs>

      {/* Quality Assessment Factors - Now Below Detailed Tabs */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Target className="h-5 w-5" />
            Quality Assessment Factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {qualityFactors.map((factor, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{factor.factor}</h4>
                  <Badge className={getPriorityColor(factor.priority)} variant="outline">
                    {factor.priority} priority
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{factor.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {factor.indicators.map((indicator, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span className="text-muted-foreground">{indicator}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price vs Value Matrix */}
      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Price vs Value Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {priceVsValueMatrix.map((item, index) => (
              <div key={index} className="border border-green-500/30 rounded-lg p-4 text-center">
                <h4 className="font-medium text-white mb-2">{item.category}</h4>
                <div className="text-elec-yellow font-bold mb-2">{item.priceRange}</div>
                <p className="text-sm text-muted-foreground mb-2">{item.value}</p>
                <Badge variant="outline" className="border-green-500/40 text-green-400 text-xs">
                  {item.bestFor}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert className="border-orange-500/50 bg-orange-500/10">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200">
          <strong>Quality Investment Principle:</strong> Buy the best quality you can afford for tools used daily. For occasional-use tools, mid-range options often provide the best value. Never compromise on safety-critical equipment.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ToolSelectionTab;
