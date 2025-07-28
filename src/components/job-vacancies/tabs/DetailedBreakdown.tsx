import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Award, 
  Building, 
  FileText, 
  TrendingUp, 
  Calculator,
  PoundSterling,
  Users,
  Zap
} from "lucide-react";

interface DetailedBreakdownProps {
  experience: number;
  location: string;
  qualification: string;
  specialisms: string[];
  companySize: string;
  contractType: string;
  salaryCalculation: {
    min: number;
    max: number;
    confidence: number;
  };
}

const DetailedBreakdown = ({ 
  experience, 
  location, 
  qualification, 
  specialisms, 
  companySize, 
  contractType, 
  salaryCalculation 
}: DetailedBreakdownProps) => {
  const getLocationMultiplier = () => {
    const locationPremiums: Record<string, number> = {
      'london': 1.45,
      'cambridge': 1.35,
      'oxford': 1.30,
      'bristol': 1.25,
      'reading': 1.25,
      'manchester': 1.20,
      'birmingham': 1.15,
      'leeds': 1.15,
      'edinburgh': 1.20,
      'glasgow': 1.15,
      'cardiff': 1.10,
      'newcastle': 1.05,
      'liverpool': 1.10,
      'nottingham': 1.05,
      'sheffield': 1.00
    };

    const locationKey = location.toLowerCase();
    const foundKey = Object.keys(locationPremiums).find(key => 
      locationKey.includes(key)
    );
    return foundKey ? locationPremiums[foundKey] : 1.0;
  };

  const getQualificationMultiplier = () => {
    const qual = qualification.toLowerCase();
    if (qual.includes('degree') || qual.includes('hnd')) return 1.25;
    if (qual.includes('level 3') || qual.includes('nvq 3')) return 1.15;
    if (qual.includes('level 2') || qual.includes('nvq 2')) return 1.05;
    return 1.0;
  };

  const getCompanySizeMultiplier = () => {
    switch(companySize) {
      case 'startup': return 0.85;
      case 'small': return 0.95;
      case 'medium': return 1.05;
      case 'large': return 1.15;
      case 'enterprise': return 1.25;
      default: return 1.0;
    }
  };

  const getContractMultiplier = () => {
    switch(contractType) {
      case 'permanent': return 1.0;
      case 'contract': return 1.3;
      case 'freelance': return 1.5;
      default: return 1.0;
    }
  };

  const getSpecialismBonus = () => {
    const bonuses: Record<string, number> = {
      'renewable_energy': 8000,
      'ev_charging': 6000,
      'smart_home': 5000,
      'industrial_automation': 7000,
      'hv_switching': 12000,
      'fire_systems': 6000,
      'data_centres': 9000,
      'marine_offshore': 10000,
      'niceic_approved': 4000,
      'testing_inspection': 5000
    };
    
    return specialisms.reduce((total, spec) => total + (bonuses[spec] || 0), 0);
  };

  const breakdownComponents = [
    {
      factor: "Base Experience",
      value: experience,
      impact: `${experience} years`,
      description: "Years of hands-on electrical experience",
      multiplier: 1.0,
      icon: <Award className="h-4 w-4" />
    },
    {
      factor: "Location Premium",
      value: getLocationMultiplier(),
      impact: `${((getLocationMultiplier() - 1) * 100).toFixed(0)}%`,
      description: location || "No location specified",
      multiplier: getLocationMultiplier(),
      icon: <MapPin className="h-4 w-4" />
    },
    {
      factor: "Qualification Level",
      value: getQualificationMultiplier(),
      impact: `${((getQualificationMultiplier() - 1) * 100).toFixed(0)}%`,
      description: qualification || "No qualification specified",
      multiplier: getQualificationMultiplier(),
      icon: <FileText className="h-4 w-4" />
    },
    {
      factor: "Company Size",
      value: getCompanySizeMultiplier(),
      impact: `${((getCompanySizeMultiplier() - 1) * 100).toFixed(0)}%`,
      description: companySize || "Not specified",
      multiplier: getCompanySizeMultiplier(),
      icon: <Building className="h-4 w-4" />
    },
    {
      factor: "Contract Type",
      value: getContractMultiplier(),
      impact: `${((getContractMultiplier() - 1) * 100).toFixed(0)}%`,
      description: contractType || "Not specified",
      multiplier: getContractMultiplier(),
      icon: <Users className="h-4 w-4" />
    },
    {
      factor: "Specialisms",
      value: getSpecialismBonus(),
      impact: `+£${getSpecialismBonus().toLocaleString()}`,
      description: `${specialisms.length} specialist skills`,
      multiplier: 1.0,
      icon: <Zap className="h-4 w-4" />
    }
  ];

  return (
    <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
      <CardHeader>
        <CardTitle className="text-indigo-300 flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Detailed Salary Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calculation Formula */}
        <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
          <h4 className="font-medium text-white mb-2 flex items-center gap-2">
            <PoundSterling className="h-4 w-4" />
            Calculation Method
          </h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong className="text-white">Base Salary</strong> (experience-based)</p>
            <p><strong className="text-white">×</strong> Location multiplier</p>
            <p><strong className="text-white">×</strong> Qualification bonus</p>
            <p><strong className="text-white">×</strong> Company size factor</p>
            <p><strong className="text-white">×</strong> Contract type adjustment</p>
            <p><strong className="text-white">+</strong> Specialist skill premiums</p>
          </div>
        </div>

        {/* Breakdown Components */}
        <div className="space-y-4">
          <h4 className="font-medium text-white">Calculation Factors</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {breakdownComponents.map((component, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {component.icon}
                    <span className="text-sm font-medium text-white">{component.factor}</span>
                  </div>
                  <Badge className={`text-xs ${
                    component.multiplier > 1.0 || component.value > 0
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : component.multiplier < 1.0
                      ? 'bg-red-500/20 text-red-400 border-red-500/30'
                      : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                  }`}>
                    {component.impact}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{component.description}</p>
                {component.factor === "Base Experience" && (
                  <div className="mt-2">
                    <Progress value={(experience / 20) * 100} className="h-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final Calculation */}
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Final Calculation Result
            </h4>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              {salaryCalculation.confidence}% Confidence
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Minimum</div>
              <div className="text-xl font-bold text-green-400">
                £{salaryCalculation.min.toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Maximum</div>
              <div className="text-xl font-bold text-emerald-400">
                £{salaryCalculation.max.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p><strong className="text-white">Market Position:</strong> {
              salaryCalculation.min > 50000 ? "Senior/Specialist level" :
              salaryCalculation.min > 35000 ? "Experienced professional" :
              salaryCalculation.min > 25000 ? "Qualified electrician" :
              "Entry/apprentice level"
            }</p>
            <p><strong className="text-white">Recommendation:</strong> {
              salaryCalculation.confidence > 80 ? "High confidence - use for negotiations" :
              salaryCalculation.confidence > 60 ? "Good estimate - add more details for accuracy" :
              "Rough estimate - provide more information for better accuracy"
            }</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedBreakdown;