
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Smartphone, Globe, Star, Target, MessageCircle, Calendar, DollarSign } from "lucide-react";

const MarketingStrategyTab = () => {
  const marketingChannels = [
    {
      channel: "Local Online Presence",
      cost: "£50-200/month",
      roi: "High",
      timeframe: "2-4 weeks",
      tactics: ["Google My Business optimisation", "Local SEO", "Customer reviews", "Social media profiles"],
      description: "Essential foundation for local visibility and credibility"
    },
    {
      channel: "Word of Mouth & Referrals",
      cost: "£0-100/month",
      roi: "Very High",
      timeframe: "3-6 months",
      tactics: ["Referral incentives", "Exceptional service", "Follow-up calls", "Customer testimonials"],
      description: "Most powerful marketing for trades - builds naturally with good service"
    },
    {
      channel: "Local Networking",
      cost: "£100-300/month",
      roi: "High", 
      timeframe: "1-3 months",
      tactics: ["Trade associations", "Local business groups", "Property developer relationships", "Supplier partnerships"],
      description: "Build relationships with complementary businesses and potential clients"
    },
    {
      channel: "Digital Advertising",
      cost: "£200-800/month",
      roi: "Medium",
      timeframe: "1-2 weeks",
      tactics: ["Google Ads", "Facebook advertising", "Nextdoor app", "Local directory listings"],
      description: "Quick results but requires ongoing investment and optimisation"
    }
  ];

  const brandingElements = [
    {
      element: "Business Name & Logo",
      importance: "Critical",
      tips: ["Easy to remember and pronounce", "Reflects electrical services", "Available domain name", "Trademark check"],
      cost: "£200-800"
    },
    {
      element: "Vehicle Branding",
      importance: "High",
      tips: ["Clear contact details", "Professional appearance", "Services listed", "High-quality materials"],
      cost: "£300-1200"
    },
    {
      element: "Uniforms & PPE",
      importance: "Medium",
      tips: ["Consistent colour scheme", "Company logo", "Professional appearance", "Safety compliance"],
      cost: "£150-400"
    },
    {
      element: "Business Cards & Materials",
      importance: "Medium",
      tips: ["High-quality printing", "Essential contact info", "Professional design", "QR code for website"],
      cost: "£50-200"
    }
  ];

  const customerAcquisition = [
    {
      strategy: "Local SEO Optimisation",
      description: "Rank high in local search results for electrical services",
      steps: [
        "Claim Google My Business listing",
        "Optimise website for local keywords",
        "Build local citations and directories",
        "Collect and respond to customer reviews"
      ],
      timeline: "2-6 months for results",
      cost: "£100-300/month"
    },
    {
      strategy: "Strategic Partnerships",
      description: "Partner with complementary businesses for referrals",
      steps: [
        "Identify potential partners (plumbers, builders, estate agents)",
        "Develop referral agreements",
        "Create co-marketing opportunities",
        "Maintain regular communication"
      ],
      timeline: "1-3 months to establish",
      cost: "£50-150/month"
    },
    {
      strategy: "Content Marketing",
      description: "Establish expertise through valuable content",
      steps: [
        "Create helpful electrical safety tips",
        "Share project case studies",
        "Produce how-to videos",
        "Regular social media updates"
      ],
      timeline: "3-12 months for impact",
      cost: "£100-400/month"
    }
  ];

  const retentionStrategies = [
    {
      strategy: "Maintenance Contracts",
      description: "Regular recurring revenue from ongoing maintenance",
      benefits: ["Predictable income", "Customer retention", "Upselling opportunities"],
      implementation: ["Annual electrical safety checks", "Emergency callout priority", "Discounted rates"]
    },
    {
      strategy: "Customer Communication",
      description: "Stay top-of-mind with regular, valuable communication",
      benefits: ["Increased referrals", "Repeat business", "Brand loyalty"],
      implementation: ["Seasonal safety reminders", "New service announcements", "Special offers for existing customers"]
    },
    {
      strategy: "Exceptional Service",
      description: "Exceed expectations to create loyal advocates",
      benefits: ["Word-of-mouth marketing", "Premium pricing", "Reduced marketing costs"],
      implementation: ["Follow-up calls after jobs", "Guarantee on all work", "Professional appearance and conduct"]
    }
  ];

  const marketingBudget = [
    {
      category: "Website & Online Presence",
      percentage: "30%",
      monthly: "£150-300",
      includes: ["Website hosting/maintenance", "Google Ads", "Social media management"]
    },
    {
      category: "Networking & Events",
      percentage: "25%",
      monthly: "£125-250",
      includes: ["Trade association memberships", "Networking events", "Business development"]
    },
    {
      category: "Traditional Marketing",
      percentage: "25%",
      monthly: "£125-250",
      includes: ["Vehicle maintenance/updates", "Print materials", "Local advertising"]
    },
    {
      category: "Tools & Systems",
      percentage: "20%",
      monthly: "£100-200",
      includes: ["CRM software", "Marketing tools", "Analytics platforms"]
    }
  ];

  const getRoiColor = (roi: string) => {
    switch (roi) {
      case 'Very High': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'High': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Medium': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-purple-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Marketing Strategy Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-elec-dark/50 rounded-lg">
              <div className="text-2xl font-bold text-green-400">5-8%</div>
              <div className="text-sm text-muted-foreground">Of revenue on marketing</div>
            </div>
            <div className="text-center p-4 bg-elec-dark/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">3:1</div>
              <div className="text-sm text-muted-foreground">Minimum ROI target</div>
            </div>
            <div className="text-center p-4 bg-elec-dark/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">70%</div>
              <div className="text-sm text-muted-foreground">Comes from referrals</div>
            </div>
            <div className="text-center p-4 bg-elec-dark/50 rounded-lg">
              <div className="text-2xl font-bold text-amber-400">12</div>
              <div className="text-sm text-muted-foreground">Months to mature</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Marketing Channels & ROI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketingChannels.map((channel, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-white">{channel.channel}</h4>
                    <p className="text-sm text-muted-foreground">{channel.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getRoiColor(channel.roi)} className="mb-1">
                      {channel.roi} ROI
                    </Badge>
                    <div className="text-blue-300 text-sm">{channel.cost}</div>
                    <div className="text-xs text-muted-foreground">{channel.timeframe}</div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-blue-200 font-medium mb-1">Key Tactics:</h5>
                  <div className="flex flex-wrap gap-1">
                    {channel.tactics.map((tactic, tacticIndex) => (
                      <Badge key={tacticIndex} variant="secondary" className="text-xs">
                        {tactic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Star className="h-5 w-5" />
            Brand Development
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {brandingElements.map((element, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-white">{element.element}</h4>
                  <div className="text-right">
                    <Badge className={getImportanceColor(element.importance)}>
                      {element.importance}
                    </Badge>
                    <div className="text-purple-300 text-sm mt-1">{element.cost}</div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-purple-200 font-medium mb-1">Key Considerations:</h5>
                  <ul className="space-y-1">
                    {element.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-purple-100">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-green-500/50 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Acquisition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerAcquisition.map((strategy, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-medium text-white">{strategy.strategy}</h4>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                  <div className="text-xs">
                    <div className="text-green-200 mb-1">Timeline: {strategy.timeline}</div>
                    <div className="text-green-300">Cost: {strategy.cost}</div>
                  </div>
                  <ul className="space-y-1">
                    {strategy.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-1 text-sm">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-green-100">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-500/50 bg-amber-500/10">
          <CardHeader>
            <CardTitle className="text-amber-300 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Customer Retention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {retentionStrategies.map((strategy, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-medium text-white">{strategy.strategy}</h4>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                  
                  <div>
                    <h5 className="text-amber-200 font-medium mb-1 text-sm">Benefits:</h5>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {strategy.benefits.map((benefit, benefitIndex) => (
                        <Badge key={benefitIndex} variant="outline" className="text-amber-300 border-amber-400/30 text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-amber-200 font-medium mb-1 text-sm">Implementation:</h5>
                    <ul className="space-y-1">
                      {strategy.implementation.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-1 text-sm">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-amber-100">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Marketing Budget Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {marketingBudget.map((budget, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-elec-yellow/20 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">{budget.category}</h4>
                  <p className="text-xs text-muted-foreground">{budget.includes.join(", ")}</p>
                </div>
                <div className="text-right">
                  <div className="text-elec-yellow font-medium">{budget.percentage}</div>
                  <div className="text-sm text-muted-foreground">{budget.monthly}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <h4 className="font-semibold text-green-400 mb-2">Budget Tips:</h4>
            <ul className="space-y-1 text-sm text-green-200">
              <li>• Start with 3-5% of revenue, increase as business grows</li>
              <li>• Track ROI for each channel and adjust accordingly</li>
              <li>• Focus on free/low-cost methods initially</li>
              <li>• Invest more in channels that prove successful</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingStrategyTab;
