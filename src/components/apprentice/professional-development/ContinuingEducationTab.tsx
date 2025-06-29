
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Calculator, 
  Clock, 
  Users, 
  Lightbulb,
  Award,
  TrendingUp,
  ExternalLink
} from "lucide-react";
import AdvancedFundingCalculator from "./AdvancedFundingCalculator";

const ContinuingEducationTab = () => {
  const educationOptions = [
    {
      title: "HNC/HND in Electrical Engineering",
      provider: "Colleges & Universities",
      duration: "2-3 years part-time",
      level: "Level 4-5",
      icon: BookOpen,
      description: "Higher level qualification for career advancement",
      averageCost: "£3,000 - £6,000",
      fundingAvailable: true
    },
    {
      title: "Renewable Energy Courses",
      provider: "Various providers",
      duration: "1-5 days",
      level: "Specialist",
      icon: Lightbulb,
      description: "Solar PV, heat pumps, and green energy systems",
      averageCost: "£500 - £2,000",
      fundingAvailable: true
    },
    {
      title: "Smart Home Technology",
      provider: "Industry providers",
      duration: "2-3 days",
      level: "Emerging",
      icon: Users,
      description: "Home automation and IoT electrical systems",
      averageCost: "£800 - £1,500",
      fundingAvailable: false
    },
    {
      title: "Electric Vehicle Charging",
      provider: "NICEIC, NAPIT",
      duration: "1-2 days",
      level: "Growing Market",
      icon: Clock,
      description: "EV charging point installation and maintenance",
      averageCost: "£600 - £1,200",
      fundingAvailable: true
    }
  ];

  const benefits = [
    {
      title: "Stay Current",
      description: "Technology and regulations are constantly evolving. Continuing education keeps you relevant.",
      icon: TrendingUp
    },
    {
      title: "Higher Earnings",
      description: "Specialist skills command premium rates and open doors to better opportunities.",
      icon: Award
    },
    {
      title: "Future-Proof Career",
      description: "Green energy and smart technology are the future of electrical work.",
      icon: Lightbulb
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Continuing Education & Training</h2>
        <p className="text-muted-foreground">
          Advance your career with further education and specialist training courses
        </p>
      </div>

      {/* Advanced Funding Calculator */}
      <AdvancedFundingCalculator />

      {/* Education Options */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Popular Education Pathways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationOptions.map((option, index) => (
              <div key={index} className="border border-elec-yellow/10 rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-elec-yellow/10">
                      <option.icon className="h-6 w-6 text-elec-yellow" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{option.title}</h3>
                      <p className="text-sm text-muted-foreground">{option.provider}</p>
                    </div>
                  </div>
                  <Badge variant={option.fundingAvailable ? "default" : "secondary"}>
                    {option.level}
                  </Badge>
                </div>

                <p className="text-sm text-elec-light/80">{option.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{option.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Average Cost:</span>
                    <span className="font-semibold">{option.averageCost}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Funding Available:</span>
                    <Badge variant={option.fundingAvailable ? "default" : "secondary"} className="text-xs">
                      {option.fundingAvailable ? "Yes" : "Limited"}
                    </Badge>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Find Courses
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Why Continue Learning?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-elec-yellow/10 rounded-lg flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-elec-yellow" />
                </div>
                <h3 className="font-semibold text-elec-yellow">{benefit.title}</h3>
                <p className="text-sm text-elec-light/80">{benefit.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Calculator className="h-5 w-5" />
            Funding Tips & Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2 text-blue-400">Before You Apply</h4>
              <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                <li>Use our advanced calculator above to explore all funding options</li>
                <li>Check with your employer about training budgets</li>
                <li>Research regional and industry-specific grants</li>
                <li>Compare course providers and costs</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-blue-400">Useful Resources</h4>
              <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                <li>Student Finance England for Advanced Learner Loans</li>
                <li>Local authority skills funding programmes</li>
                <li>Industry training boards and levy funds</li>
                <li>Charity and foundation educational grants</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuingEducationTab;
