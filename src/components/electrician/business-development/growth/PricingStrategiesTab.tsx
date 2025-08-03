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

  // Key metrics data
  const keyMetrics = [
    {
      title: "Average UK Hourly Rate",
      value: "£48",
      change: "+5.2%",
      description: "Domestic electrical work",
      icon: PoundSterling,
      trend: "up"
    },
    {
      title: "Emergency Premium",
      value: "65%",
      change: "+8%",
      description: "Above standard rates",
      icon: Zap,
      trend: "up"
    },
    {
      title: "Material Markup",
      value: "35%",
      change: "+2%",
      description: "Industry standard",
      icon: BarChart3,
      trend: "up"
    },
    {
      title: "Profit Margin Target",
      value: "25%",
      change: "0%",
      description: "Sustainable growth",
      icon: Target,
      trend: "stable"
    },
    {
      title: "London Premium",
      value: "+28%",
      change: "+3%",
      description: "Above national average",
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "Commercial Rate",
      value: "£58",
      change: "+4.1%",
      description: "Per hour average",
      icon: Users,
      trend: "up"
    },
    {
      title: "Call-out Fee",
      value: "£85",
      change: "+7%",
      description: "Minimum charge",
      icon: Clock,
      trend: "up"
    },
    {
      title: "Quote Win Rate",
      value: "72%",
      change: "+5%",
      description: "Competitive pricing",
      icon: CheckCircle2,
      trend: "up"
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
      id: "strategies",
      title: "Pricing Strategy Models",
      icon: <Target className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="grid gap-4">
            {[
              {
                name: "Cost-Plus Pricing",
                description: "Add fixed percentage to total costs",
                pros: ["Simple calculation", "Covers all costs", "Predictable margins"],
                cons: ["Doesn't reflect value", "May not be competitive", "Penalises efficiency"],
                ukRate: "Cost + 20-35% markup"
              },
              {
                name: "Value-Based Pricing",
                description: "Price based on customer value received",
                pros: ["Higher profit potential", "Rewards expertise", "Customer-focused"],
                cons: ["Harder to justify", "Requires sales skills", "Market education needed"],
                ukRate: "20-50% premium above cost"
              },
              {
                name: "Competitive Pricing",
                description: "Match or undercut competitor rates",
                pros: ["Market alignment", "Easy to research", "Quick market entry"],
                cons: ["Race to bottom", "Ignores value", "Margin pressure"],
                ukRate: "Market rate ±10%"
              },
              {
                name: "Dynamic Pricing",
                description: "Adjust rates based on demand and timing",
                pros: ["Maximises revenue", "Balances workload", "Seasonal optimisation"],
                cons: ["Complex to manage", "Customer confusion", "Requires data"],
                ukRate: "Base rate +50% peak times"
              }
            ].map((strategy, index) => (
              <Card key={index} className="bg-elec-gray/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{strategy.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">{strategy.ukRate}</Badge>
                  </div>
                  <CardDescription className="text-sm">{strategy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <h5 className="font-medium text-green-400 mb-2 text-sm">Advantages</h5>
                      <ul className="space-y-1">
                        {strategy.pros.map((pro, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-green-400" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-400 mb-2 text-sm">Considerations</h5>
                      <ul className="space-y-1">
                        {strategy.cons.map((con, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3 text-orange-400" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "benchmarks",
      title: "UK Industry Benchmarks 2025",
      icon: <BarChart3 className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="grid gap-4">
            <Card className="bg-elec-gray/20">
              <CardHeader>
                <CardTitle className="text-base">Regional Rate Variations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    { region: "London", rate: "£55-75", premium: "+28%" },
                    { region: "South East", rate: "£45-60", premium: "+15%" },
                    { region: "Scotland", rate: "£40-55", premium: "+2%" },
                    { region: "North West", rate: "£38-52", premium: "-5%" },
                    { region: "Wales", rate: "£35-48", premium: "-12%" },
                    { region: "North East", rate: "£32-45", premium: "-18%" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-elec-gray/30 rounded">
                      <span className="text-sm font-medium">{item.region}</span>
                      <div className="text-right">
                        <div className="text-sm font-bold text-elec-yellow">{item.rate}</div>
                        <div className="text-xs text-muted-foreground">{item.premium}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-elec-gray/20">
              <CardHeader>
                <CardTitle className="text-base">Service Type Premiums</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { service: "Emergency Call-outs", premium: "+65-120%", rate: "£75-120/hr" },
                    { service: "Weekend Work", premium: "+25-50%", rate: "£60-85/hr" },
                    { service: "Evening Work", premium: "+15-30%", rate: "£55-75/hr" },
                    { service: "Complex Installations", premium: "+20-40%", rate: "£58-80/hr" },
                    { service: "Fault Finding", premium: "+10-25%", rate: "£52-70/hr" },
                    { service: "Basic Maintenance", premium: "Standard", rate: "£35-50/hr" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-elec-gray/30 rounded">
                      <span className="text-sm">{item.service}</span>
                      <div className="text-right">
                        <div className="text-sm font-bold text-elec-yellow">{item.rate}</div>
                        <div className="text-xs text-muted-foreground">{item.premium}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: "calculator",
      title: "Advanced Pricing Calculator",
      icon: <Calculator className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <Card className="bg-elec-gray/20">
            <CardHeader>
              <CardTitle className="text-base">Job Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="laborRate" className="text-sm">Hourly Labour Rate (£)</Label>
                  <Input
                    id="laborRate"
                    type="number"
                    value={laborRate}
                    onChange={(e) => setLaborRate(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="jobDuration" className="text-sm">Job Duration (hours)</Label>
                  <Input
                    id="jobDuration"
                    type="number"
                    step="0.5"
                    value={jobDuration}
                    onChange={(e) => setJobDuration(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="materialCost" className="text-sm">Material Cost (£)</Label>
                  <Input
                    id="materialCost"
                    type="number"
                    value={materialCost}
                    onChange={(e) => setMaterialCost(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="travelTime" className="text-sm">Travel Time (hours)</Label>
                  <Input
                    id="travelTime"
                    type="number"
                    step="0.25"
                    value={travelTime}
                    onChange={(e) => setTravelTime(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="jobComplexity" className="text-sm">Job Complexity Multiplier</Label>
                  <select 
                    id="jobComplexity"
                    value={jobComplexity}
                    onChange={(e) => setJobComplexity(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value={0.8}>Simple (0.8x) - Basic socket/switch</option>
                    <option value={1}>Standard (1x) - Typical installation</option>
                    <option value={1.3}>Complex (1.3x) - Multi-circuit work</option>
                    <option value={1.6}>Very Complex (1.6x) - Consumer unit</option>
                    <option value={2}>Specialist (2x) - Industrial/commercial</option>
                  </select>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="overheadPercentage" className="text-sm">Overhead %</Label>
                    <Input
                      id="overheadPercentage"
                      type="number"
                      value={overheadPercentage}
                      onChange={(e) => setOverheadPercentage(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="profitMargin" className="text-sm">Profit Margin %</Label>
                    <Input
                      id="profitMargin"
                      type="number"
                      value={profitMargin}
                      onChange={(e) => setProfitMargin(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPremium" className="text-sm">Emergency Premium %</Label>
                    <Input
                      id="emergencyPremium"
                      type="number"
                      value={emergencyPremium}
                      onChange={(e) => setEmergencyPremium(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="discount" className="text-sm">Discount % (if applicable)</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-elec-yellow/10 border-elec-yellow/30">
            <CardHeader>
              <CardTitle className="text-base text-elec-yellow">Quote Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Labour Cost:</span>
                  <span className="font-medium">£{quote.laborCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Materials:</span>
                  <span className="font-medium">£{quote.materialCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Overheads ({overheadPercentage}%):</span>
                  <span className="font-medium">£{quote.overheadCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Profit ({profitMargin}%):</span>
                  <span className="font-medium">£{quote.profitAmount.toFixed(2)}</span>
                </div>
                {emergencyPremium > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Emergency Premium ({emergencyPremium}%):</span>
                    <span className="font-medium">£{quote.emergencyAmount.toFixed(2)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-400">
                    <span>Discount ({discount}%):</span>
                    <span className="font-medium">-£{quote.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Quote:</span>
                    <span className="text-elec-yellow">£{quote.finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4">
                Generate Professional Quote
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "psychology",
      title: "Pricing Psychology & Tactics",
      icon: <Brain className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="grid gap-4">
            {[
              {
                title: "Anchoring Technique",
                description: "Present highest price option first",
                tactics: ["Show premium service first", "Include 'deluxe' options", "Use decoy pricing"],
                example: "£800 premium, £600 standard, £450 basic"
              },
              {
                title: "Bundle Pricing",
                description: "Group services for perceived value",
                tactics: ["Package complementary services", "Create 'complete solutions'", "Offer maintenance deals"],
                example: "Full rewire + testing + certification = 15% discount"
              },
              {
                title: "Time-Sensitive Offers",
                description: "Create urgency for decisions",
                tactics: ["Limited-time discounts", "Seasonal promotions", "Book-now incentives"],
                example: "'Book this week for £50 off your rewire'"
              },
              {
                title: "Value Communication",
                description: "Justify pricing with benefits",
                tactics: ["Emphasise safety benefits", "Highlight qualifications", "Show cost of NOT doing work"],
                example: "'This prevents potential £1000s in fire damage'"
              }
            ].map((item, index) => (
              <Card key={index} className="bg-elec-gray/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription className="text-sm">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium mb-2 text-sm">Key Tactics:</h5>
                      <ul className="space-y-1">
                        {item.tactics.map((tactic, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1 h-1 bg-elec-yellow rounded-full" />
                            {tactic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-elec-gray/30 p-3 rounded">
                      <h6 className="font-medium text-sm mb-1">Example:</h6>
                      <p className="text-sm text-muted-foreground italic">"{item.example}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "action-plan",
      title: "30-Day Pricing Action Plan",
      icon: <Calendar className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="grid gap-4">
            {[
              {
                week: "Week 1: Analysis & Research",
                tasks: [
                  "Audit current pricing structure",
                  "Research 5 local competitor rates",
                  "Calculate true hourly costs",
                  "Review last 6 months of quotes"
                ],
                deliverable: "Complete cost analysis spreadsheet"
              },
              {
                week: "Week 2: Strategy Development",
                tasks: [
                  "Choose primary pricing model",
                  "Set target profit margins",
                  "Develop service packages",
                  "Create pricing calculator template"
                ],
                deliverable: "New pricing strategy document"
              },
              {
                week: "Week 3: Implementation",
                tasks: [
                  "Update quote templates",
                  "Train team on new pricing",
                  "Test pricing with 5 quotes",
                  "Gather initial customer feedback"
                ],
                deliverable: "Updated quoting system"
              },
              {
                week: "Week 4: Optimisation",
                tasks: [
                  "Analyse quote success rates",
                  "Adjust pricing if needed",
                  "Document lessons learned",
                  "Plan quarterly pricing reviews"
                ],
                deliverable: "Pricing optimisation report"
              }
            ].map((week, index) => (
              <Card key={index} className="bg-elec-gray/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{week.week}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium mb-2 text-sm">Key Tasks:</h5>
                      <ul className="space-y-1">
                        {week.tasks.map((task, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 text-elec-yellow" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-elec-yellow/10 p-3 rounded border border-elec-yellow/30">
                      <h6 className="font-medium text-sm mb-1 text-elec-yellow">Week Deliverable:</h6>
                      <p className="text-sm">{week.deliverable}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      <Alert className="border-elec-yellow/30 bg-elec-yellow/10">
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          <strong>2025 UK Pricing Update:</strong> Average electrical rates have increased 5.2% this year. 
          Brexit-related material costs and new safety regulations are driving demand for certified electricians. 
          Review your pricing monthly to stay competitive.
        </AlertDescription>
      </Alert>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="bg-elec-gray/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <metric.icon className="h-5 w-5 text-elec-yellow" />
                <Badge 
                  variant={metric.trend === 'up' ? 'default' : 'secondary'} 
                  className={metric.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20'}
                >
                  {metric.change}
                </Badge>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-elec-yellow">{metric.value}</div>
                <div className="text-xs font-medium">{metric.title}</div>
                <div className="text-xs text-muted-foreground">{metric.description}</div>
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
        <div className="space-y-6">
          {accordionSections.map((section) => (
            <Card key={section.id} className="border-elec-yellow/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
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

      {/* Quick Actions Card */}
      <Card className="border-elec-yellow/20 bg-elec-gray/30">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
            Quick Pricing Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "Review competitor rates monthly",
              "Track material cost fluctuations",
              "Calculate true hourly costs quarterly",
              "Test different pricing strategies",
              "Monitor quote-to-job conversion rates",
              "Adjust for seasonal demand patterns"
            ].map((action, index) => (
              <div key={index} className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm">{action}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};