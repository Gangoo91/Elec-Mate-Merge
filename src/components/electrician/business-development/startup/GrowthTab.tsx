
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Star, Target, Megaphone, Award, ExternalLink } from "lucide-react";

const GrowthTab = () => {
  const marketingChannels = [
    {
      channel: "Google My Business",
      cost: "Free",
      timeframe: "Immediate",
      roi: "High",
      effort: "Low",
      description: "Essential for local search visibility and customer reviews"
    },
    {
      channel: "Word of Mouth/Referrals",
      cost: "Free",
      timeframe: "3-6 months",
      roi: "Very High",
      effort: "Medium",
      description: "Most cost-effective long-term customer acquisition"
    },
    {
      channel: "Local Facebook Groups",
      cost: "Free",
      timeframe: "1-2 weeks",
      roi: "Medium",
      effort: "Low",
      description: "Build local community presence and credibility"
    },
    {
      channel: "Van Signage & Uniforms",
      cost: "£500-£1,500",
      timeframe: "1-2 weeks",
      roi: "Medium",
      effort: "Low",
      description: "Mobile advertising and professional appearance"
    },
    {
      channel: "Builder Partnerships",
      cost: "Time investment",
      timeframe: "2-4 months",
      roi: "High",
      effort: "High",
      description: "Consistent work flow through trade relationships"
    },
    {
      channel: "Google Ads",
      cost: "£300-£800/month",
      timeframe: "1-2 weeks",
      roi: "Medium",
      effort: "Medium",
      description: "Paid search advertising for immediate visibility"
    }
  ];

  const growthMilestones = [
    {
      milestone: "First 100 Jobs",
      timeframe: "Months 1-6",
      revenue: "£15K-£30K",
      focus: "Quality delivery, customer satisfaction, local reputation"
    },
    {
      milestone: "Consistent Monthly Income",
      timeframe: "Months 6-12",
      revenue: "£3K-£5K/month",
      focus: "Systems optimization, repeat customers, referral network"
    },
    {
      milestone: "Business Expansion",
      timeframe: "Year 2-3",
      revenue: "£50K-£80K/year",
      focus: "Subcontractors, specialization, commercial clients"
    },
    {
      milestone: "Team Building",
      timeframe: "Year 3-5",
      revenue: "£100K+/year",
      focus: "Apprentices, multiple crews, management systems"
    }
  ];

  const specializations = [
    {
      area: "Renewable Energy",
      demand: "Very High",
      investment: "£2K-£5K",
      qualifications: "Solar PV, EV charging courses",
      potential: "£40K-£80K additional revenue"
    },
    {
      area: "Commercial/Industrial",
      demand: "High",
      investment: "£3K-£10K",
      qualifications: "18th Edition, Inspection & Testing",
      potential: "£20K-£50K additional revenue"
    },
    {
      area: "Smart Home Systems",
      demand: "Growing",
      investment: "£1K-£3K",
      qualifications: "KNX, home automation training",
      potential: "£15K-£30K additional revenue"
    },
    {
      area: "Fire & Security",
      demand: "Stable",
      investment: "£2K-£6K",
      qualifications: "FIA courses, security systems",
      potential: "£25K-£45K additional revenue"
    }
  ];

  const getRoiColor = (roi: string) => {
    switch (roi) {
      case 'Very High': return 'bg-green-600/20 text-green-300 border-green-500/30';
      case 'High': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Low': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'bg-green-600/20 text-green-300';
      case 'High': return 'bg-green-500/20 text-green-400';
      case 'Growing': return 'bg-blue-500/20 text-blue-400';
      case 'Stable': return 'bg-amber-500/20 text-amber-400';
      default: return 'bg-elec-yellow/20 text-elec-yellow';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Business Growth Strategy Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">6</div>
              <div className="text-sm text-muted-foreground">Marketing Channels</div>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">4</div>
              <div className="text-sm text-muted-foreground">Growth Stages</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">4</div>
              <div className="text-sm text-muted-foreground">Specialization Areas</div>
            </div>
            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
              <div className="text-2xl font-bold text-amber-400">3-5yr</div>
              <div className="text-sm text-muted-foreground">Scale Timeline</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-elec-yellow" />
            Marketing & Customer Acquisition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {marketingChannels.map((channel, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{channel.channel}</h4>
                  <Badge className={getRoiColor(channel.roi)}>
                    {channel.roi} ROI
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{channel.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Cost:</span>
                    <div className="text-green-400">{channel.cost}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Timeline:</span>
                    <div className="text-blue-400">{channel.timeframe}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Growth Milestones & Targets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {growthMilestones.map((milestone, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{milestone.milestone}</h4>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {milestone.revenue}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm text-blue-400">📅 {milestone.timeframe}</span>
                </div>
                <p className="text-sm text-muted-foreground">{milestone.focus}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-elec-yellow" />
            Specialization Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {specializations.map((spec, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{spec.area}</h4>
                  <Badge className={getDemandColor(spec.demand)}>
                    {spec.demand}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Investment:</span>
                    <span className="text-amber-400">{spec.investment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Training:</span>
                    <span className="text-blue-400">{spec.qualifications}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Potential:</span>
                    <span className="text-green-400">{spec.potential}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Star className="h-5 w-5" />
            Scaling Success Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-blue-300">Customer Retention</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Implement customer loyalty programs</li>
                <li>• Regular maintenance contracts and annual checks</li>
                <li>• Excellent after-service support and warranties</li>
                <li>• Professional follow-up and relationship building</li>
                <li>• Collect and showcase customer testimonials</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-blue-300">Business Development</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Network with local construction companies</li>
                <li>• Join trade associations and networking groups</li>
                <li>• Develop expertise in emerging technologies</li>
                <li>• Consider franchise or partnership opportunities</li>
                <li>• Plan for apprentice training and development</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-blue-500/20 flex gap-3">
            <Button className="bg-blue-500 text-blue-900 hover:bg-blue-400">
              <Users className="h-4 w-4 mr-2" />
              Networking Resources
            </Button>
            <Button variant="outline" className="border-blue-500/30">
              <ExternalLink className="h-4 w-4 mr-2" />
              Growth Calculator
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthTab;
