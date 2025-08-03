
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Calculator, 
  Brain, 
  Calendar, 
  Shield, 
  TrendingUp,
  Target,
  PoundSterling,
  Users,
  Clock,
  Zap
} from "lucide-react";
import EnhancedCostCalculator from "./interactive/EnhancedCostCalculator";
import DigitalSkillsAnalyser from "./interactive/DigitalSkillsAnalyser";
import TrainingScheduleOptimiser from "./interactive/TrainingScheduleOptimizer";
import ComplianceChecker from "./interactive/ComplianceChecker";

const InteractiveToolsTab = () => {
  const isMobile = useIsMobile();

  // 2025 Key Metrics for Employers
  const keyMetrics = [
    {
      metric: "Cost per Qualified Electrician",
      value: "£68,000",
      change: "-12% vs. external recruitment",
      icon: <PoundSterling className="h-5 w-5 text-green-400" />,
      detail: "Total 4-year investment including all costs and incentives"
    },
    {
      metric: "Time to Competency",
      value: "18 months",
      change: "3 months faster with optimized training",
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      detail: "Average time to independent working capability"
    },
    {
      metric: "ROI After 5 Years",
      value: "287%",
      change: "+15% with 2025 wage rates",
      icon: <TrendingUp className="h-5 w-5 text-elec-yellow" />,
      detail: "Return on investment including retention and productivity gains"
    },
    {
      metric: "Success Rate Improvement",
      value: "23%",
      change: "With digital tools & structured support",
      icon: <Target className="h-5 w-5 text-purple-400" />,
      detail: "Increased completion rates through enhanced monitoring"
    }
  ];

  if (isMobile) {
    return (
      <div className="space-y-4">
        <Alert className="border-blue-500/50 bg-blue-500/10">
          <Zap className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            Advanced 2025 tools for apprentice planning, cost optimization, and compliance management. Designed for maximum ROI and business outcomes.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-2 gap-3">
          {keyMetrics.map((metric, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
              <div className="text-center space-y-2">
                {metric.icon}
                <div className="text-xs font-medium text-white">{metric.metric}</div>
                <div className="text-sm font-bold text-elec-yellow">{metric.value}</div>
                <div className="text-xs text-green-300">{metric.change}</div>
              </div>
            </Card>
          ))}
        </div>

        <MobileAccordion type="single" collapsible className="space-y-2">
          <MobileAccordionItem value="calculator">
            <MobileAccordionTrigger icon={<Calculator className="h-5 w-5 text-elec-yellow" />}>
              Advanced Cost Calculator
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4">
                <EnhancedCostCalculator />
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="skills">
            <MobileAccordionTrigger icon={<Brain className="h-5 w-5 text-blue-400" />}>
              Skills Gap Analyser
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4">
                <DigitalSkillsAnalyser />
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="schedule">
            <MobileAccordionTrigger icon={<Calendar className="h-5 w-5 text-green-400" />}>
              Training Schedule Optimiser
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4">
                <TrainingScheduleOptimiser />
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>

          <MobileAccordionItem value="compliance">
            <MobileAccordionTrigger icon={<Shield className="h-5 w-5 text-amber-400" />}>
              Compliance Checker
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4">
                <ComplianceChecker />
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        </MobileAccordion>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Zap className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Advanced 2025 digital tools for apprentice planning, cost optimization, and compliance management. 
          Designed for maximum ROI and business outcomes with BS7671:2018+A2:2022 compliance.
        </AlertDescription>
      </Alert>

      {/* Key Metrics Dashboard */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            2025 Apprenticeship Business Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  {metric.icon}
                  <div className="text-sm font-medium text-white">{metric.metric}</div>
                </div>
                <div className="text-2xl font-bold text-elec-yellow mb-1">{metric.value}</div>
                <div className="text-sm text-green-300 mb-2">{metric.change}</div>
                <div className="text-xs text-muted-foreground">{metric.detail}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h4 className="font-semibold text-blue-300 mb-2">2025 Market Context</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-white">£47k</div>
                <div className="text-blue-200">Average qualified electrician salary</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white">68%</div>
                <div className="text-blue-200">Current apprentice completion rate</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white">15,000</div>
                <div className="text-blue-200">New electricians needed annually (UK)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Tools */}
      <div className="space-y-6">
        <EnhancedCostCalculator />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DigitalSkillsAnalyser />
          <TrainingScheduleOptimiser />
        </div>
        
        <ComplianceChecker />
      </div>

      {/* Business Impact Summary */}
      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Users className="h-5 w-5" />
            2025 Business Impact Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Financial Benefits</h4>
              <ul className="space-y-2 text-sm text-green-200">
                <li>• 287% ROI over 5 years</li>
                <li>• £15,000 saved vs. external recruitment</li>
                <li>• Up to £4,000 government incentives</li>
                <li>• Reduced agency fees and hiring costs</li>
                <li>• Predictable salary progression</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Operational Advantages</h4>
              <ul className="space-y-2 text-sm text-green-200">
                <li>• Skills tailored to business needs</li>
                <li>• Higher employee retention rates</li>
                <li>• Improved company culture</li>
                <li>• Knowledge transfer opportunities</li>
                <li>• Enhanced industry reputation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Strategic Impact</h4>
              <ul className="space-y-2 text-sm text-green-200">
                <li>• Future workforce development</li>
                <li>• Competitive advantage in recruitment</li>
                <li>• Innovation through fresh perspectives</li>
                <li>• Succession planning opportunities</li>
                <li>• Industry leadership positioning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;
