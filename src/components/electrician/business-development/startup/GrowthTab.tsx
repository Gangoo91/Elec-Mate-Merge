
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Target, Zap, Globe, MessageSquare, Award, CheckCircle, Download, Star } from "lucide-react";

const GrowthTab = () => {
  const growthStrategies = [
    {
      phase: "Foundation (0-6 months)",
      focus: "Establish reputation and local presence",
      strategies: [
        "Complete first 50 jobs with excellence",
        "Build Google My Business profile",
        "Collect customer testimonials",
        "Join local Facebook groups",
        "Network with local tradespeople"
      ],
      targets: ["5-star Google rating", "20+ reviews", "Repeat customers"]
    },
    {
      phase: "Growth (6-18 months)",
      focus: "Scale operations and expand services",
      strategies: [
        "Develop specialisation areas",
        "Implement referral program",
        "Create professional website",
        "Start social media marketing",
        "Consider apprentice or subcontractor"
      ],
      targets: ["50+ jobs/month", "£8K+ monthly revenue", "Service diversification"]
    },
    {
      phase: "Expansion (18+ months)",
      focus: "Team building and market leadership",
      strategies: [
        "Hire qualified electricians",
        "Expand service territory",
        "Commercial contract bidding",
        "Advanced certifications",
        "Consider franchising opportunities"
      ],
      targets: ["Team of 3-5", "£15K+ monthly revenue", "Market recognition"]
    }
  ];

  const marketingChannels = [
    {
      channel: "Google My Business",
      cost: "Free",
      effectiveness: 95,
      timeframe: "Immediate",
      description: "Essential for local visibility and credibility"
    },
    {
      channel: "Word of Mouth/Referrals",
      cost: "Free-Low",
      effectiveness: 90,
      timeframe: "3-6 months",
      description: "Most trusted and cost-effective marketing"
    },
    {
      channel: "Facebook Local Groups",
      cost: "Free",
      effectiveness: 75,
      timeframe: "1-3 months",
      description: "Great for community engagement"
    },
    {
      channel: "Checkatrade/Rated People",
      cost: "£30-100/month",
      effectiveness: 70,
      timeframe: "1-2 months",
      description: "Lead generation platforms"
    },
    {
      channel: "Local Newspaper Ads",
      cost: "£50-200/month",
      effectiveness: 45,
      timeframe: "2-4 months",
      description: "Traditional but declining effectiveness"
    }
  ];

  const specialisationAreas = [
    {
      area: "Smart Home Technology",
      growth_potential: "High",
      investment: "Medium",
      skills_needed: [
        "Home automation systems",
        "Smart lighting controls",
        "Security system integration",
        "Network installation"
      ],
      market_demand: "Growing rapidly",
      premium: "30-50% higher rates"
    },
    {
      area: "Electric Vehicle Charging",
      growth_potential: "Very High",
      investment: "High",
      skills_needed: [
        "EV charger installation",
        "Government grant schemes",
        "Load balancing systems",
        "Commercial charging points"
      ],
      market_demand: "Explosive growth",
      premium: "40-60% higher rates"
    },
    {
      area: "Solar PV & Battery Storage",
      growth_potential: "High",
      investment: "High",
      skills_needed: [
        "Solar panel installation",
        "Battery storage systems",
        "Grid tie systems",
        "Energy monitoring"
      ],
      market_demand: "Strong and growing",
      premium: "35-55% higher rates"
    }
  ];

  const teamBuilding = [
    {
      role: "Apprentice Electrician",
      timing: "6-12 months",
      cost: "£12-18K/year",
      benefits: ["Reduces workload", "Future skilled worker", "Government incentives"],
      requirements: ["Training time investment", "Mentoring skills", "Patience"]
    },
    {
      role: "Qualified Electrician",
      timing: "12-18 months",
      cost: "£25-35K/year",
      benefits: ["Immediate productivity", "Handle complex work", "Cover more ground"],
      requirements: ["Higher wages", "Insurance costs", "Management skills"]
    },
    {
      role: "Administrative Assistant",
      timing: "18-24 months",
      cost: "£15-25K/year",
      benefits: ["Handle bookings", "Manage paperwork", "Customer service"],
      requirements: ["Office space", "Equipment", "Training time"]
    }
  ];

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 80) return "bg-green-500";
    if (effectiveness >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  const getGrowthColor = (potential: string) => {
    switch (potential) {
      case 'Very High': return 'bg-green-500/20 text-green-400';
      case 'High': return 'bg-blue-500/20 text-blue-400';
      case 'Medium': return 'bg-amber-500/20 text-amber-400';
      default: return 'bg-elec-yellow/20 text-elec-yellow';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Business Growth Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">Year 1</div>
              <div className="text-sm text-muted-foreground">£50K Revenue</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">Year 2</div>
              <div className="text-sm text-muted-foreground">£100K Revenue</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">Year 3</div>
              <div className="text-sm text-muted-foreground">£200K Revenue</div>
            </div>
            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
              <div className="text-2xl font-bold text-amber-400">5-10</div>
              <div className="text-sm text-muted-foreground">Team Members</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Growth Phase Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {growthStrategies.map((phase, index) => (
            <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-elec-yellow">{phase.phase}</h4>
                <Badge className="bg-blue-500/20 text-blue-400">{phase.focus}</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-white mb-2">Key Strategies:</h5>
                  <ul className="space-y-1">
                    {phase.strategies.map((strategy, strategyIndex) => (
                      <li key={strategyIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-white mb-2">Success Targets:</h5>
                  <ul className="space-y-1">
                    {phase.targets.map((target, targetIndex) => (
                      <li key={targetIndex} className="flex items-start gap-2 text-sm">
                        <Star className="h-3 w-3 text-amber-400 mt-1 flex-shrink-0" />
                        {target}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-elec-yellow" />
              Marketing Channels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {marketingChannels.map((channel, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{channel.channel}</h4>
                  <Badge className="bg-green-500/20 text-green-400">{channel.cost}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{channel.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Effectiveness</span>
                    <span className="text-xs font-medium">{channel.effectiveness}%</span>
                  </div>
                  <Progress 
                    value={channel.effectiveness} 
                    className="h-2"
                  />
                  <div className="text-xs text-blue-400">Time to see results: {channel.timeframe}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-elec-yellow" />
              Specialisation Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {specialisationAreas.map((area, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{area.area}</h4>
                  <Badge className={getGrowthColor(area.growth_potential)}>
                    {area.growth_potential}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <span className="text-muted-foreground">Investment: </span>
                    <span className="text-amber-400">{area.investment}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Premium: </span>
                    <span className="text-green-400">{area.premium}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs text-blue-400">Market: {area.market_demand}</div>
                  <div>
                    <span className="text-xs font-medium text-white">Key Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {area.skills_needed.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-elec-yellow" />
            Team Building Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teamBuilding.map((member, index) => (
              <div key={index} className="bg-elec-dark p-4 rounded-lg border border-elec-yellow/10">
                <h4 className="font-semibold text-elec-yellow mb-2">{member.role}</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Timing</div>
                    <div className="text-sm text-blue-400">{member.timing}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Annual Cost</div>
                    <div className="text-sm text-green-400">{member.cost}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs font-medium text-white mb-1">Benefits:</div>
                    <ul className="space-y-1">
                      {member.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-1 text-xs">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="text-xs font-medium text-white mb-1">Requirements:</div>
                    <ul className="space-y-1">
                      {member.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start gap-1 text-xs">
                          <Star className="h-3 w-3 text-amber-400 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Scaling Success Factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-300 mb-3">Financial Management</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Reinvest 20-30% of profits into growth
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Maintain strong cash flow management
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Track key performance indicators (KPIs)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Regular financial reviews and planning
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-green-300 mb-3">Leadership Development</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Develop delegation and management skills
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Create standard operating procedures
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Build a strong company culture
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Invest in continuous learning
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-green-500/20">
            <Button className="bg-green-500 text-green-900 hover:bg-green-400">
              <Download className="h-4 w-4 mr-2" />
              Download Growth Strategy Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthTab;
