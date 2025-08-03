import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { 
  PoundSterling, 
  Calculator, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  Users,
  Clock,
  FileText,
  Lightbulb,
  BarChart3,
  Zap,
  Shield,
  CheckCircle2,
  Brain,
  Calendar,
  Plus
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const PricingStrategiesTab = () => {
  const isMobile = useIsMobile();
  
  // Calculator state
  const [laborRate, setLaborRate] = useState(45);
  const [materialCost, setMaterialCost] = useState(100);
  const [travelTime, setTravelTime] = useState(0.5);
  const [jobDuration, setJobDuration] = useState(4);
  const [overheadPercentage, setOverheadPercentage] = useState(20);
  const [profitMargin, setProfitMargin] = useState(25);
  const [jobComplexity, setJobComplexity] = useState(1);
  const [emergencyPremium, setEmergencyPremium] = useState(0);
  const [discount, setDiscount] = useState(0);

  // Key metrics data for cards
  const keyMetrics = [
    {
      title: "Average Startup Cost",
      value: "£15,000-35,000",
      description: "initial investment",
      icon: PoundSterling,
      color: "text-blue-400"
    },
    {
      title: "Break-even Timeline", 
      value: "6-12 months",
      description: "with proper planning",
      icon: Clock,
      color: "text-yellow-400"
    },
    {
      title: "Market Success Rate",
      value: "85% survival",
      description: "with business plan",
      icon: Target,
      color: "text-green-400"
    },
    {
      title: "Average Monthly Revenue",
      value: "£8,000-15,000",
      description: "in Year 1",
      icon: TrendingUp,
      color: "text-purple-400"
    }
  ];

  // Calculate total quote
  const calculateQuote = () => {
    const baseLaborCost = laborRate * jobDuration;
    const travelCost = laborRate * travelTime;
    const complexityMultiplier = jobComplexity;
    const adjustedLaborCost = (baseLaborCost + travelCost) * complexityMultiplier;
    const adjustedMaterialCost = materialCost * complexityMultiplier;
    
    const subtotal = adjustedLaborCost + adjustedMaterialCost;
    const overheadCost = subtotal * (overheadPercentage / 100);
    const subtotalWithOverhead = subtotal + overheadCost;
    const profitAmount = subtotalWithOverhead * (profitMargin / 100);
    const baseTotal = subtotalWithOverhead + profitAmount;
    
    const emergencyAmount = baseTotal * (emergencyPremium / 100);
    const totalWithPremium = baseTotal + emergencyAmount;
    const discountAmount = totalWithPremium * (discount / 100);
    const finalTotal = totalWithPremium - discountAmount;
    
    return {
      laborCost: adjustedLaborCost,
      materialCost: adjustedMaterialCost,
      overheadCost,
      profitAmount,
      emergencyAmount,
      discountAmount,
      finalTotal
    };
  };

  const quote = calculateQuote();

  const accordionSections = [
    {
      id: "market-research",
      title: "Market Research & Analysis",
      icon: <BarChart3 className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <Card className="bg-elec-gray/20">
            <CardHeader>
              <CardTitle className="text-base">Local Market Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h5 className="font-medium mb-2 text-sm text-elec-yellow">Research Areas</h5>
                  <ul className="space-y-1">
                    {[
                      "Local competitor pricing structures",
                      "Average job values in your area",
                      "Customer price sensitivity analysis",
                      "Seasonal demand patterns"
                    ].map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2 text-sm text-elec-yellow">Data Sources</h5>
                  <ul className="space-y-1">
                    {[
                      "Checkatrade & MyBuilder quotes",
                      "Local trade associations",
                      "Customer surveys & feedback",
                      "Industry reports & benchmarks"
                    ].map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-elec-gray/20">
            <CardHeader>
              <CardTitle className="text-base">Competitive Analysis Framework</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { phase: "Identify Competitors", tasks: "Map 5-10 local electricians", timeline: "Week 1" },
                  { phase: "Price Research", tasks: "Gather quotes for standard jobs", timeline: "Week 2" },
                  { phase: "Service Analysis", tasks: "Compare service offerings", timeline: "Week 3" },
                  { phase: "Positioning", tasks: "Define your competitive advantage", timeline: "Week 4" }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-elec-gray/30 rounded">
                    <div>
                      <div className="font-medium text-sm">{item.phase}</div>
                      <div className="text-xs text-muted-foreground">{item.tasks}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">{item.timeline}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "financial-planning",
      title: "Financial Planning & Investment", 
      icon: <PoundSterling className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <Card className="bg-elec-gray/20">
            <CardHeader>
              <CardTitle className="text-base">Startup Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { category: "Initial Equipment", low: "£8,000", high: "£15,000", items: "Tools, van equipment, testing instruments" },
                  { category: "Vehicle Costs", low: "£3,000", high: "£8,000", items: "Van purchase/lease, insurance, signage" },
                  { category: "Certifications", low: "£2,000", high: "£4,000", items: "18th Edition, inspection training, Part P" },
                  { category: "Business Setup", low: "£1,500", high: "£3,000", items: "Insurance, registration, marketing" },
                  { category: "Working Capital", low: "£2,500", high: "£5,000", items: "Materials stock, 3-month expenses" }
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-elec-gray/30 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-sm">{item.category}</div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-elec-yellow">{item.low} - {item.high}</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{item.items}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-elec-gray/20">
            <CardHeader>
              <CardTitle className="text-base">Financial Projections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h5 className="font-medium mb-3 text-sm text-elec-yellow">Year 1 Targets</h5>
                  <div className="space-y-2">
                    {[
                      { metric: "Monthly Revenue", target: "£8,000 - £15,000" },
                      { metric: "Jobs per Month", target: "15 - 25 jobs" },
                      { metric: "Average Job Value", target: "£450 - £650" },
                      { metric: "Profit Margin", target: "25% - 35%" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.metric}:</span>
                        <span className="font-medium">{item.target}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-medium mb-3 text-sm text-elec-yellow">Growth Milestones</h5>
                  <div className="space-y-2">
                    {[
                      { milestone: "Break-even Point", timeframe: "6-8 months" },
                      { milestone: "First Employee", timeframe: "12-15 months" },
                      { milestone: "Van Replacement", timeframe: "18-24 months" },
                      { milestone: "Business Premises", timeframe: "24-30 months" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.milestone}:</span>
                        <span className="font-medium">{item.timeframe}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-elec-yellow/10 border-elec-yellow/30">
            <CardHeader>
              <CardTitle className="text-base text-elec-yellow">Financial Health Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  "Track daily cash flow",
                  "Maintain 3-month expense buffer",
                  "Invoice immediately after completion",
                  "Set aside 25% for tax obligations",
                  "Review pricing quarterly",
                  "Monitor profit margins monthly"
                ].map((action, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm">{action}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid - 2x2 layout matching screenshot */}
      <div className="grid gap-4 md:grid-cols-2">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="bg-elec-gray border border-elec-yellow/20">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{metric.title}</h3>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.description}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile Accordion / Desktop Cards */}
      {isMobile ? (
        <MobileAccordion type="single" collapsible className="space-y-2">
          {accordionSections.map((section) => (
            <MobileAccordionItem key={section.id} value={section.id}>
              <MobileAccordionTrigger icon={section.icon}>
                {section.title}
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                {section.content}
              </MobileAccordionContent>
            </MobileAccordionItem>
          ))}
        </MobileAccordion>
      ) : (
        <div className="space-y-4">
          {accordionSections.map((section) => (
            <Card key={section.id} className="bg-elec-gray border border-elec-yellow/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-center gap-2 text-center">
                  {section.icon}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {section.content}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};