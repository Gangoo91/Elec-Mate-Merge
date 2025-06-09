
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Target, Smartphone, Globe, MapPin } from "lucide-react";

const MarketingStrategyTab = () => {
  const marketingChannels = [
    {
      channel: "Local SEO & Google My Business",
      cost: "Free-£200/month",
      timeToResults: "2-3 months",
      effectiveness: "High",
      difficulty: "Medium",
      description: "Optimise for 'electrician near me' searches",
      actions: ["Claim Google My Business", "Get customer reviews", "Local keyword optimization", "Post regular updates"]
    },
    {
      channel: "Door-to-Door Leaflets",
      cost: "£100-300/month",
      timeToResults: "Immediate",
      effectiveness: "Medium",
      difficulty: "Easy",
      description: "Target specific postcodes and demographics",
      actions: ["Design professional leaflets", "Target new housing estates", "Include special offers", "Track response rates"]
    },
    {
      channel: "Facebook & Instagram Ads",
      cost: "£200-500/month",
      timeToResults: "1-2 weeks",
      effectiveness: "High",
      difficulty: "Medium",
      description: "Targeted local advertising with visual content",
      actions: ["Create business pages", "Share work photos", "Target homeowners 25-65", "Run local awareness campaigns"]
    },
    {
      channel: "Word of Mouth & Referrals",
      cost: "Free-£50/referral",
      timeToResults: "3-6 months",
      effectiveness: "Very High",
      difficulty: "Easy",
      description: "Build reputation through excellent service",
      actions: ["Referral incentive scheme", "Follow up after jobs", "Join local community groups", "Network with trades"]
    }
  ];

  const brandingEssentials = [
    {
      item: "Business Name & Logo",
      cost: "£100-500",
      description: "Professional, memorable brand identity"
    },
    {
      item: "Vehicle Signage",
      cost: "£300-800",
      description: "Mobile advertising and professional image"
    },
    {
      item: "Uniform & Branded Clothing",
      cost: "£150-300",
      description: "Professional appearance and brand recognition"
    },
    {
      item: "Business Cards & Flyers",
      cost: "£50-150",
      description: "Leave-behind materials for networking"
    }
  ];

  const getEffectivenessColor = (effectiveness: string) => {
    switch (effectiveness.toLowerCase()) {
      case 'very high': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'high': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'low': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-purple-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Marketing Strategy for New Electricians
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">£500</div>
              <div className="text-sm text-muted-foreground">Monthly Budget</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">5-10</div>
              <div className="text-sm text-muted-foreground">Leads/Month Goal</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">3 Months</div>
              <div className="text-sm text-muted-foreground">To Steady Flow</div>
            </div>
            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
              <div className="text-2xl font-bold text-amber-400">5-Mile</div>
              <div className="text-sm text-muted-foreground">Target Radius</div>
            </div>
          </div>
          
          <p className="text-muted-foreground">
            Start with local, cost-effective marketing that builds trust and reputation. Focus on quality over quantity 
            to establish yourself as the go-to electrician in your area.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Marketing Channels</h3>
          {marketingChannels.map((channel, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">{channel.channel}</CardTitle>
                  <Badge className={getEffectivenessColor(channel.effectiveness)}>
                    {channel.effectiveness}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{channel.description}</p>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-green-400 font-medium">Cost:</span>
                    <p className="text-white">{channel.cost}</p>
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium">Results:</span>
                    <p className="text-white">{channel.timeToResults}</p>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">Difficulty:</span>
                    <p className="text-white">{channel.difficulty}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-elec-yellow mb-2">Action Steps:</p>
                  <ul className="text-xs space-y-1">
                    {channel.actions.map((action, i) => (
                      <li key={i} className="text-muted-foreground">• {action}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="border-purple-500/30 bg-purple-500/10">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Branding Essentials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {brandingEssentials.map((item, index) => (
                <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-purple-200">{item.item}</h4>
                    <span className="text-purple-400 font-bold">{item.cost}</span>
                  </div>
                  <p className="text-sm text-purple-100">{item.description}</p>
                </div>
              ))}
              
              <div className="bg-purple-600/20 rounded-lg p-3">
                <p className="text-xs text-purple-200 mb-2">Pro Tip:</p>
                <p className="text-xs text-purple-100">
                  Invest in vehicle signage first - it's working 24/7 advertising that pays for itself quickly.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-500/10">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Digital Marketing Priorities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <p className="text-blue-200 font-medium">Google My Business</p>
                    <p className="text-xs text-blue-100">Claim and optimise your listing</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <p className="text-blue-200 font-medium">Simple Website</p>
                    <p className="text-xs text-blue-100">Contact details and service areas</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <p className="text-blue-200 font-medium">Social Media</p>
                    <p className="text-xs text-blue-100">Facebook page with regular updates</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <p className="text-blue-200 font-medium">Online Reviews</p>
                    <p className="text-xs text-blue-100">Ask satisfied customers for reviews</p>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-blue-500 text-blue-900 hover:bg-blue-400">
                <Globe className="h-4 w-4 mr-2" />
                Marketing Checklist
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-500/10">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Local Area Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <div>
                  <span className="text-green-300 font-medium">Target Demographics:</span>
                  <p className="text-green-100 text-xs">Homeowners, small businesses, property managers</p>
                </div>
                
                <div>
                  <span className="text-green-300 font-medium">Service Area:</span>
                  <p className="text-green-100 text-xs">Start with 5-mile radius, expand gradually</p>
                </div>
                
                <div>
                  <span className="text-green-300 font-medium">Peak Times:</span>
                  <p className="text-green-100 text-xs">Winter evenings, weekends, emergency callouts</p>
                </div>
                
                <div>
                  <span className="text-green-300 font-medium">Competition:</span>
                  <p className="text-green-100 text-xs">Differentiate with reliability, pricing, specialisation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketingStrategyTab;
