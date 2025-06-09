
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, Users, Star, Phone, Globe, Calendar, ExternalLink } from "lucide-react";

const MarketingStrategyTab = () => {
  const marketingChannels = [
    {
      name: "Google My Business",
      cost: "Free",
      effort: "Low",
      roi: "Very High",
      timeframe: "Immediate",
      description: "Essential for local visibility and customer reviews",
      tactics: ["Complete profile setup", "Regular photo updates", "Respond to reviews", "Post updates"]
    },
    {
      name: "Word of Mouth & Referrals",
      cost: "Low",
      effort: "Medium",
      roi: "Very High",
      timeframe: "2-6 months",
      description: "Most powerful marketing for electrical contractors",
      tactics: ["Exceptional service delivery", "Follow-up calls", "Referral incentives", "Customer testimonials"]
    },
    {
      name: "Local Facebook Marketing",
      cost: "£5-50/week",
      effort: "Medium",
      roi: "High",
      timeframe: "1-3 months",
      description: "Target local homeowners with electrical needs",
      tactics: ["Local group participation", "Before/after photos", "Safety tips sharing", "Community engagement"]
    },
    {
      name: "Leaflet Drops",
      cost: "£200-500",
      effort: "High",
      roi: "Medium",
      timeframe: "Immediate",
      description: "Direct marketing to target neighbourhoods",
      tactics: ["Professional design", "Special offers", "Service areas focus", "Seasonal timing"]
    }
  ];

  const customerTypes = [
    {
      type: "Homeowners",
      value: "£150-800 per job",
      frequency: "Occasional",
      acquisition: "Local advertising, referrals",
      needs: ["Fault finding", "Socket/light installation", "Consumer unit upgrades", "Safety certificates"]
    },
    {
      type: "Landlords",
      value: "£100-500 per property",
      frequency: "Regular (annual)",
      acquisition: "Letting agent partnerships",
      needs: ["EICR certificates", "Emergency callouts", "Compliance work", "Maintenance contracts"]
    },
    {
      type: "Small Businesses",
      value: "£300-2000 per job",
      frequency: "Regular",
      acquisition: "Business networks, LinkedIn",
      needs: ["PAT testing", "Emergency lighting", "Commercial installations", "Maintenance contracts"]
    },
    {
      type: "Property Developers",
      value: "£1000-10000 per project",
      frequency: "Project-based",
      acquisition: "Industry networks, reputation",
      needs: ["New build wiring", "Renovation work", "Compliance certificates", "Project partnership"]
    }
  ];

  const digitalStrategy = [
    {
      platform: "Website",
      priority: "Essential",
      investment: "£500-2000",
      benefits: ["Professional credibility", "Service information", "Contact capture", "Local SEO"]
    },
    {
      platform: "Google Ads",
      priority: "High",
      investment: "£300-1000/month",
      benefits: ["Immediate visibility", "Emergency call capture", "Targeted keywords", "Measurable ROI"]
    },
    {
      platform: "Social Media",
      priority: "Medium",
      investment: "Time + £50-200/month",
      benefits: ["Community building", "Work showcasing", "Trust building", "Referral generation"]
    },
    {
      platform: "Email Marketing",
      priority: "Medium",
      investment: "£20-100/month",
      benefits: ["Customer retention", "Repeat business", "Seasonal campaigns", "Service reminders"]
    }
  ];

  const getROIColor = (roi: string) => {
    switch (roi) {
      case 'Very High': return 'bg-green-500/20 text-green-400';
      case 'High': return 'bg-blue-500/20 text-blue-400';
      case 'Medium': return 'bg-amber-500/20 text-amber-400';
      case 'Low': return 'bg-red-500/20 text-red-400';
      default: return 'bg-elec-yellow/20 text-elec-yellow';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Essential': return 'bg-red-500/20 text-red-400';
      case 'High': return 'bg-amber-500/20 text-amber-400';
      case 'Medium': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-elec-yellow/20 text-elec-yellow';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Marketing Strategy for Electrical Contractors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <Target className="h-5 w-5 text-green-400 mb-2" />
              <div className="text-sm text-muted-foreground">First Customer Target</div>
              <div className="text-xl font-bold text-green-400">4-8 weeks</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <Users className="h-5 w-5 text-blue-400 mb-2" />
              <div className="text-sm text-muted-foreground">Monthly Customer Goal</div>
              <div className="text-xl font-bold text-blue-400">15-25 jobs</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <Star className="h-5 w-5 text-purple-400 mb-2" />
              <div className="text-sm text-muted-foreground">Marketing Budget</div>
              <div className="text-xl font-bold text-purple-400">5-10% revenue</div>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-amber-400 mb-2">90-Day Marketing Launch Plan</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-white mb-2">Month 1: Foundation</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Set up Google My Business</li>
                  <li>• Create basic website</li>
                  <li>• Design business cards/leaflets</li>
                  <li>• Start social media accounts</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-white mb-2">Month 2: Outreach</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Leaflet campaign launch</li>
                  <li>• Network with local businesses</li>
                  <li>• Start Google Ads</li>
                  <li>• Request first reviews</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-white mb-2">Month 3: Optimise</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Analyse what's working</li>
                  <li>• Implement referral system</li>
                  <li>• Expand successful channels</li>
                  <li>• Build repeat customer base</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">Marketing Channels by Effectiveness</h3>
        {marketingChannels.map((channel, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white text-lg">{channel.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{channel.description}</p>
                </div>
                <Badge className={getROIColor(channel.roi)}>
                  {channel.roi} ROI
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-elec-dark/50 p-3 rounded">
                    <div className="text-xs text-muted-foreground">Cost</div>
                    <div className="font-semibold text-white">{channel.cost}</div>
                  </div>
                  <div className="bg-elec-dark/50 p-3 rounded">
                    <div className="text-xs text-muted-foreground">Effort</div>
                    <div className="font-semibold text-white">{channel.effort}</div>
                  </div>
                  <div className="bg-elec-dark/50 p-3 rounded">
                    <div className="text-xs text-muted-foreground">ROI</div>
                    <div className="font-semibold text-white">{channel.roi}</div>
                  </div>
                  <div className="bg-elec-dark/50 p-3 rounded">
                    <div className="text-xs text-muted-foreground">Timeframe</div>
                    <div className="font-semibold text-white">{channel.timeframe}</div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-white mb-2">Key Tactics:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {channel.tactics.map((tactic, tacticIndex) => (
                      <div key={tacticIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full" />
                        {tactic}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-blue-500/20 bg-blue-500/10">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Target Customer Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerTypes.map((customer, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{customer.type}</h4>
                    <div className="text-right">
                      <div className="text-sm font-medium text-blue-400">{customer.value}</div>
                      <div className="text-xs text-muted-foreground">{customer.frequency}</div>
                    </div>
                  </div>
                  <p className="text-xs text-blue-300 mb-2">{customer.acquisition}</p>
                  <div className="flex flex-wrap gap-1">
                    {customer.needs.map((need, needIndex) => (
                      <Badge key={needIndex} className="bg-blue-500/20 text-blue-400 text-xs">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Digital Marketing Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {digitalStrategy.map((strategy, index) => (
                <div key={index} className="border border-green-500/20 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{strategy.platform}</h4>
                    <Badge className={getPriorityColor(strategy.priority)}>
                      {strategy.priority}
                    </Badge>
                  </div>
                  <div className="text-sm text-green-400 mb-2">{strategy.investment}</div>
                  <div className="flex flex-wrap gap-1">
                    {strategy.benefits.map((benefit, benefitIndex) => (
                      <span key={benefitIndex} className="text-xs text-muted-foreground bg-green-500/10 px-2 py-1 rounded">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-amber-500/30 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-400">Marketing Resources & Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 border-amber-500/30">
              <Phone className="h-5 w-5 text-amber-400" />
              <span className="font-medium">Google My Business Setup</span>
              <span className="text-xs text-muted-foreground">Free local listing</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 border-blue-500/30">
              <Globe className="h-5 w-5 text-blue-400" />
              <span className="font-medium">Website Templates</span>
              <span className="text-xs text-muted-foreground">Professional designs</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2 border-green-500/30">
              <Calendar className="h-5 w-5 text-green-400" />
              <span className="font-medium">Social Media Planner</span>
              <span className="text-xs text-muted-foreground">Content calendar</span>
            </Button>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-500/20">
            <h4 className="font-semibold text-amber-300 mb-3">Quick Start Checklist</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-white mb-2">Week 1-2</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>□ Register Google My Business</li>
                  <li>□ Order business cards</li>
                  <li>□ Set up social media accounts</li>
                  <li>□ Create basic website</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-white mb-2">Week 3-4</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>□ Design and print leaflets</li>
                  <li>□ Start Google Ads campaign</li>
                  <li>□ Join local business groups</li>
                  <li>□ Ask friends for referrals</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingStrategyTab;
