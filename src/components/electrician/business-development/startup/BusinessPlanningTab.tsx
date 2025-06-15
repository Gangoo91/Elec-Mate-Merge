
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, TrendingUp, BarChart3, Target, PoundSterling } from "lucide-react";

const BusinessPlanningTab = () => {
  const planningSteps = [
    {
      title: "Market Research",
      description: "Analyse your local market and competition",
      points: [
        "Identify target customer segments",
        "Research competitor pricing and services",
        "Assess market demand and opportunities",
        "Understand local regulations and requirements"
      ]
    },
    {
      title: "Business Model",
      description: "Define your service offerings and pricing",
      points: [
        "Domestic, commercial, or industrial focus",
        "Emergency callouts and maintenance",
        "Installation and testing services",
        "Renewable energy solutions"
      ]
    },
    {
      title: "Financial Planning",
      description: "Calculate startup costs and projected income",
      points: [
        "Initial equipment and tool costs",
        "Vehicle and transport expenses",
        "Insurance and certification fees",
        "Working capital requirements"
      ]
    }
  ];

  const startupCosts = [
    { item: "Professional Tools & Equipment", cost: "£2,000 - £5,000" },
    { item: "Van & Vehicle Setup", cost: "£8,000 - £15,000" },
    { item: "Insurance (Annual)", cost: "£800 - £2,500" },
    { item: "Certifications & Registrations", cost: "£500 - £1,200" },
    { item: "Marketing & Branding", cost: "£500 - £2,000" },
    { item: "Working Capital", cost: "£5,000 - £10,000" }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Calculator className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Proper planning is essential for business success. Use these guides to create a solid foundation.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {planningSteps.map((step, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-elec-yellow">
                <TrendingUp className="h-5 w-5" />
                {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{step.description}</p>
              <ul className="space-y-2">
                {step.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start gap-2 text-muted-foreground">
                    <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-elec-yellow/50 bg-elec-yellow/20" />
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <PoundSterling className="h-5 w-5" />
            Estimated Startup Costs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {startupCosts.map((cost, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-green-500/5 rounded-lg">
                <span className="text-green-200">{cost.item}</span>
                <Badge className="bg-green-500/20 text-green-300">{cost.cost}</Badge>
              </div>
            ))}
            <div className="border-t border-green-500/20 pt-3 mt-4">
              <div className="flex justify-between items-center font-semibold">
                <span className="text-green-200">Total Estimated Range:</span>
                <Badge className="bg-green-500/30 text-green-200">£16,800 - £35,700</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessPlanningTab;
