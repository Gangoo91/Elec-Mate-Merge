
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Users, Globe, TrendingUp, Phone, Mail, MessageSquare, Star } from "lucide-react";

const MarketingStrategyTab = () => {
  const digitalStrategies = [
    {
      platform: "Google My Business",
      importance: "Critical",
      setup_time: "2-3 hours",
      monthly_cost: "Free",
      benefits: ["Local search visibility", "Customer reviews", "Business information display", "Direct customer contact"],
      actionSteps: ["Claim and verify listing", "Add photos and services", "Encourage customer reviews", "Post regular updates"]
    },
    {
      platform: "Facebook Business Page",
      importance: "High",
      setup_time: "1-2 hours",
      monthly_cost: "Free - £50",
      benefits: ["Community engagement", "Showcase work photos", "Customer testimonials", "Local advertising"],
      actionSteps: ["Create professional page", "Post work examples", "Join local groups", "Run targeted ads"]
    },
    {
      platform: "Simple Website",
      importance: "Essential",
      setup_time: "1-2 days",
      monthly_cost: "£10 - £50",
      benefits: ["Professional credibility", "Service descriptions", "Contact information", "Online quotations"],
      actionSteps: ["Choose website builder", "Add service pages", "Include contact forms", "Optimise for mobile"]
    }
  ];

  const traditionalMarketing = [
    {
      method: "Local Advertising",
      channels: ["Local newspapers", "Parish magazines", "Community boards", "Radio sponsorship"],
      cost_range: "£50 - £500/month",
      effectiveness: "Medium-High for local areas",
      best_for: "Established communities, older demographics"
    },
    {
      method: "Direct Mail",
      channels: ["Leaflet drops", "Targeted postcards", "Service area mapping", "Seasonal campaigns"],
      cost_range: "£100 - £300/month",
      effectiveness: "Medium for residential",
      best_for: "New housing estates, seasonal services"
    },
    {
      method: "Vehicle Branding",
      channels: ["Van wraps", "Magnetic signs", "Professional livery", "Contact details"],
      cost_range: "£200 - £2000 one-time",
      effectiveness: "High ongoing visibility",
      best_for: "Mobile advertising, brand recognition"
    }
  ];

  const networkingOpportunities = [
    {
      type: "Trade Associations",
      examples: ["NICEIC local events", "ECA regional meetings", "SELECT gatherings"],
      frequency: "Monthly/Quarterly",
      benefits: ["Industry connections", "Referral opportunities", "Technical updates", "Business advice"]
    },
    {
      type: "Business Networks",
      examples: ["BNI chapters", "Chamber of Commerce", "4Networking", "Local business groups"],
      frequency: "Weekly/Monthly",
      benefits: ["Cross-referrals", "Business partnerships", "Local market knowledge", "Skill sharing"]
    },
    {
      type: "Online Communities",
      examples: ["LinkedIn groups", "Facebook groups", "Reddit communities", "Industry forums"],
      frequency: "Daily engagement",
      benefits: ["Knowledge sharing", "Problem solving", "Brand building", "Lead generation"]
    }
  ];

  const pricingStrategies = [
    {
      strategy: "Competitive Analysis",
      description: "Research local competitors' pricing and service offerings",
      tools: ["Checkatrade reviews", "Local Facebook groups", "Direct quotes", "Industry surveys"],
      implementation: "Monthly price reviews and market comparison"
    },
    {
      strategy: "Value-Based Pricing",
      description: "Price based on value delivered rather than just cost-plus",
      tools: ["Service differentiation", "Quality certifications", "Customer testimonials", "Guarantee offers"],
      implementation: "Highlight expertise, speed, and reliability in pricing"
    },
    {
      strategy: "Package Deals",
      description: "Create service bundles that provide value and increase average job size",
      tools: ["Safety inspection + repairs", "Installation + maintenance", "Multi-room packages"],
      implementation: "Offer 10-15% discount for combined services"
    }
  ];

  const customerRetention = [
    {
      tactic: "Follow-Up Services",
      timeline: "1 week, 1 month, 6 months",
      purpose: "Ensure satisfaction and identify additional needs",
      method: "Phone call, text message, or email check-in"
    },
    {
      tactic: "Maintenance Reminders",
      timeline: "Annual",
      purpose: "Proactive safety and compliance services",
      method: "Automated reminder system for safety checks"
    },
    {
      tactic: "Loyalty Programmes",
      timeline: "Ongoing",
      purpose: "Reward repeat customers and referrals",
      method: "Discount cards, referral bonuses, priority booking"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Digital Marketing Foundations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {digitalStrategies.map((strategy, index) => (
            <div key={index} className="p-4 bg-elec-dark/50 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">{strategy.platform}</h4>
                <div className="flex items-center gap-2">
                  <Badge className={strategy.importance === "Critical" ? "bg-red-500/20 text-red-300" : 
                                   strategy.importance === "Essential" ? "bg-orange-500/20 text-orange-300" :
                                   "bg-blue-500/20 text-blue-300"}>
                    {strategy.importance}
                  </Badge>
                  <Badge variant="outline" className="border-blue-400/30 text-blue-300">
                    {strategy.monthly_cost}
                  </Badge>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Setup time: {strategy.setup_time}
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-blue-300">Key Benefits:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {strategy.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-blue-300">Action Steps:</h5>
                <div className="space-y-1">
                  {strategy.actionSteps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center gap-2 text-sm">
                      <span className="w-5 h-5 bg-blue-500/20 text-blue-300 rounded-full flex items-center justify-center text-xs">
                        {stepIndex + 1}
                      </span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Traditional Marketing Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {traditionalMarketing.map((method, index) => (
            <div key={index} className="p-4 bg-elec-dark/50 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">{method.method}</h4>
                <Badge className="bg-green-500/20 text-green-300">
                  {method.cost_range}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-green-300 font-medium">Channels: </span>
                  <span className="text-muted-foreground">{method.channels.join(", ")}</span>
                </div>
                <div className="text-sm">
                  <span className="text-green-300 font-medium">Effectiveness: </span>
                  <span className="text-muted-foreground">{method.effectiveness}</span>
                </div>
                <div className="text-sm">
                  <span className="text-green-300 font-medium">Best for: </span>
                  <span className="text-muted-foreground">{method.best_for}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Networking & Partnerships
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {networkingOpportunities.map((opportunity, index) => (
            <div key={index} className="p-4 bg-elec-dark/50 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">{opportunity.type}</h4>
                <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                  {opportunity.frequency}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                <strong>Examples:</strong> {opportunity.examples.join(", ")}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {opportunity.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/50 bg-elec-yellow/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Pricing & Competition Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pricingStrategies.map((strategy, index) => (
            <div key={index} className="p-4 bg-elec-dark/50 rounded-lg space-y-3">
              <h4 className="font-semibold text-white">{strategy.strategy}</h4>
              <p className="text-muted-foreground">{strategy.description}</p>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-elec-yellow font-medium">Tools: </span>
                  <span className="text-muted-foreground">{strategy.tools.join(", ")}</span>
                </div>
                <div className="text-sm">
                  <span className="text-elec-yellow font-medium">Implementation: </span>
                  <span className="text-muted-foreground">{strategy.implementation}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-amber-500/50 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-300 flex items-center gap-2">
            <Star className="h-5 w-5" />
            Customer Retention & Growth
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {customerRetention.map((retention, index) => (
            <div key={index} className="p-4 bg-elec-dark/50 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">{retention.tactic}</h4>
                <Badge variant="outline" className="border-amber-400/30 text-amber-300">
                  {retention.timeline}
                </Badge>
              </div>
              <p className="text-muted-foreground">{retention.purpose}</p>
              <div className="text-sm">
                <span className="text-amber-300 font-medium">Method: </span>
                <span className="text-muted-foreground">{retention.method}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Marketing Budget Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-elec-dark/30 rounded-md text-center">
                <h4 className="font-medium text-white mb-1">Year 1</h4>
                <p className="text-2xl font-bold text-elec-yellow">5-8%</p>
                <p className="text-xs text-muted-foreground">of projected revenue</p>
              </div>
              <div className="p-3 bg-elec-dark/30 rounded-md text-center">
                <h4 className="font-medium text-white mb-1">Year 2-3</h4>
                <p className="text-2xl font-bold text-elec-yellow">3-5%</p>
                <p className="text-xs text-muted-foreground">of actual revenue</p>
              </div>
              <div className="p-3 bg-elec-dark/30 rounded-md text-center">
                <h4 className="font-medium text-white mb-1">Established</h4>
                <p className="text-2xl font-bold text-elec-yellow">2-3%</p>
                <p className="text-xs text-muted-foreground">maintenance level</p>
              </div>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
              <p className="text-sm text-blue-200">
                <strong>Pro Tip:</strong> Start with digital-first approach as it's more cost-effective and measurable. 
                Track which channels bring the best quality leads and adjust budget allocation accordingly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingStrategyTab;
