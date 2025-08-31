
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PoundSterling, TrendingUp, Calculator, Info, AlertTriangle } from "lucide-react";

const WageInformationTab = () => {
  const currentRates = {
    apprenticeMinimum: 7.55,
    nationalMinimumWage: 10.00,
    nationalLivingWage: 12.21,
    lastUpdated: "April 2025"
  };

  const ageBasedRates = [
    { age: "Under 18", rate: 7.55, description: "Same as apprentice minimum wage" },
    { age: "18-20", rate: 10.00, description: "Development rate for young workers" },
    { age: "21-22", rate: 12.21, description: "National Living Wage rate" },
    { age: "23+", rate: 12.21, description: "Full National Living Wage" }
  ];

  const regionalVariations = [
    { region: "London", averageWage: "£20,000 - £25,000", description: "Higher cost of living adjustments common" },
    { region: "South East", averageWage: "£18,000 - £22,000", description: "Competitive market with good opportunities" },
    { region: "Scotland", averageWage: "£17,000 - £20,000", description: "Strong electrical sector, especially renewables" },
    { region: "North West", averageWage: "£16,000 - £19,000", description: "Industrial heritage with modern opportunities" },
    { region: "Yorkshire", averageWage: "£16,000 - £19,000", description: "Growing manufacturing and construction sectors" },
    { region: "Other regions", averageWage: "£15,000 - £18,000", description: "Varies by local economic conditions" }
  ];

  const progressionPath = [
    { stage: "Year 1 Apprentice", wage: "£7.55/hour minimum", annual: "~£15,100", description: "Learning fundamentals" },
    { stage: "Year 2-4 Apprentice", wage: "£12.21/hour minimum", annual: "~£24,400", description: "Developing skills" },
    { stage: "Newly Qualified", wage: "£14-17/hour", annual: "£28,000-34,000", description: "Basic competency achieved" },
    { stage: "Experienced (2-5 years)", wage: "£17-23/hour", annual: "£34,000-46,000", description: "Proven track record" },
    { stage: "Senior/Specialist", wage: "£23-35/hour", annual: "£46,000-70,000+", description: "Leadership or specialisation" }
  ];

  const payFactors = [
    {
      factor: "Company Size",
      impact: "Large contractors typically pay 10-20% more than small firms",
      examples: "Major M&E contractors vs local electrical companies"
    },
    {
      factor: "Sector Type",
      impact: "Industrial and commercial work often pays more than domestic",
      examples: "Power generation, data centres, hospitals vs house wiring"
    },
    {
      factor: "Location",
      impact: "London weighting can add £2,000-5,000 annually",
      examples: "Central London vs rural areas significant difference"
    },
    {
      factor: "Qualifications",
      impact: "Additional certifications can increase pay by 15-25%",
      examples: "18th Edition, Testing & Inspection, COMPEX, etc."
    },
    {
      factor: "Overtime/Call-out",
      impact: "Can add 20-40% to base salary in some roles",
      examples: "Emergency response, weekend work, night shifts"
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-green-500/50 bg-green-500/10">
        <PoundSterling className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          <strong>Current Minimum Wage Rates:</strong> These are legal minimums - many employers pay above these rates.
        </AlertDescription>
      </Alert>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Calculator className="h-5 w-5" />
            UK Minimum Wage Rates for Apprentices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 bg-elec-dark/50 rounded-lg border border-elec-yellow/30">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Apprentice Minimum Wage</span>
                  <Badge className="bg-elec-yellow/20 text-elec-yellow">£{currentRates.apprenticeMinimum}/hour</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  First year of apprenticeship or if under 19
                </p>
              </div>
              
              <div className="p-3 bg-elec-dark/50 rounded-lg border border-green-500/30">
                <div className="flex justify-between items-center">
                  <span className="font-medium">After First Year (19+)</span>
                  <Badge className="bg-green-500/20 text-green-400">£{currentRates.nationalLivingWage}/hour</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  National Living Wage applies
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-white">Age-Based Minimum Rates:</h4>
              {ageBasedRates.map((rate, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span>{rate.age}</span>
                  <span className="text-elec-yellow">£{rate.rate}/hour</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <TrendingUp className="h-5 w-5" />
            Career Progression & Expected Wages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progressionPath.map((stage, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                <div className="flex-1">
                  <h4 className="font-medium text-blue-300">{stage.stage}</h4>
                  <p className="text-xs text-blue-200 mt-1">{stage.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-300">{stage.wage}</div>
                  <div className="text-xs text-blue-200">{stage.annual}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/20 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Info className="h-5 w-5" />
            Regional Wage Variations (Annual Apprentice Salaries)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {regionalVariations.map((region, index) => (
              <div key={index} className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/20">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-purple-300">{region.region}</h4>
                  <Badge className="bg-purple-500/20 text-purple-300 text-xs">{region.averageWage}</Badge>
                </div>
                <p className="text-xs text-purple-200">{region.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/20 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <AlertTriangle className="h-5 w-5" />
            Factors Affecting Your Pay
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payFactors.map((factor, index) => (
              <div key={index} className="border border-orange-500/20 rounded-lg p-4">
                <h4 className="font-medium text-orange-300 mb-2">{factor.factor}</h4>
                <p className="text-sm text-orange-200 mb-1">{factor.impact}</p>
                <p className="text-xs text-orange-100">{factor.examples}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert className="border-yellow-500/50 bg-yellow-500/10">
        <Info className="h-4 w-4 text-yellow-400" />
        <AlertDescription className="text-yellow-200">
          <strong>Important:</strong> Many electrical apprentices earn above minimum wage. Research typical rates in your area and don't be afraid to negotiate, especially if you have prior experience or additional qualifications.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default WageInformationTab;
