import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Star, Users, Globe, Phone, MessageSquare } from "lucide-react";

export const MarketingTab = () => {
  const marketingChannels = [
    {
      channel: "Word of Mouth",
      description: "Referrals from satisfied customers",
      icon: <Users className="h-5 w-5" />,
      cost: "Free",
      effectiveness: "Very High",
      tactics: ["Excellent customer service", "Follow-up after jobs", "Ask for referrals", "Incentive programmes"]
    },
    {
      channel: "Online Presence",
      description: "Website, Google My Business, social media",
      icon: <Globe className="h-5 w-5" />,
      cost: "£50-500/month",
      effectiveness: "High",
      tactics: ["Professional website", "Google My Business optimisation", "Online reviews management", "Social media presence"]
    },
    {
      channel: "Local Advertising",
      description: "Local newspapers, community boards, directories",
      icon: <MessageSquare className="h-5 w-5" />,
      cost: "£100-1000/month",
      effectiveness: "Medium",
      tactics: ["Local newspaper ads", "Community sponsorship", "Business networking", "Trade directories"]
    },
    {
      channel: "Direct Marketing",
      description: "Flyers, door-to-door, targeted campaigns",
      icon: <Phone className="h-5 w-5" />,
      cost: "£200-800/month",
      effectiveness: "Medium",
      tactics: ["Leaflet drops", "Targeted postcards", "Cold calling", "Email campaigns"]
    }
  ];

  const digitalStrategies = [
    {
      strategy: "Google My Business",
      importance: "Critical",
      actions: ["Complete profile setup", "Regular photo updates", "Respond to reviews", "Post updates"]
    },
    {
      strategy: "Website SEO",
      importance: "High",
      actions: ["Local keyword optimisation", "Service page creation", "Customer testimonials", "Contact information"]
    },
    {
      strategy: "Social Media",
      importance: "Medium",
      actions: ["Before/after photos", "Educational content", "Customer stories", "Behind-the-scenes"]
    },
    {
      strategy: "Online Reviews",
      importance: "Critical",
      actions: ["Monitor review sites", "Encourage reviews", "Respond professionally", "Address concerns"]
    }
  ];

  const salesTips = [
    "Always provide written quotes within 24 hours",
    "Explain the value of quality work and materials",
    "Offer multiple options (good, better, best)",
    "Follow up on quotes within a week",
    "Build trust through certifications and insurance",
    "Use customer testimonials and case studies"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-elec-yellow" />
            Marketing Channels for Electricians
          </CardTitle>
          <CardDescription>
            Effective marketing strategies to attract customers and grow your electrical business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {marketingChannels.map((channel, index) => (
              <Card key={index} className="bg-elec-gray/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {channel.icon}
                      {channel.channel}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline">{channel.cost}</Badge>
                      <Badge variant={channel.effectiveness === "Very High" ? "default" : channel.effectiveness === "High" ? "secondary" : "outline"}>
                        {channel.effectiveness}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 md:grid-cols-2">
                    {channel.tactics.map((tactic, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full" />
                        <span className="text-sm">{tactic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-elec-yellow" />
            Digital Marketing Strategy
          </CardTitle>
          <CardDescription>
            Essential online marketing tactics for electrical contractors in 2025
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {digitalStrategies.map((strategy, index) => (
              <Card key={index} className="bg-elec-gray/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{strategy.strategy}</CardTitle>
                    <Badge variant={strategy.importance === "Critical" ? "destructive" : "secondary"}>
                      {strategy.importance}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {strategy.actions.map((action, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full" />
                        <span className="text-sm">{action}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-elec-yellow" />
            Customer Acquisition Costs (UK 2025)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 bg-elec-gray/20 rounded-lg text-center">
              <h4 className="font-medium">Referrals</h4>
              <p className="text-2xl font-bold text-green-400">£0-20</p>
              <p className="text-xs text-muted-foreground">per customer</p>
            </div>
            <div className="p-4 bg-elec-gray/20 rounded-lg text-center">
              <h4 className="font-medium">Online Marketing</h4>
              <p className="text-2xl font-bold text-elec-yellow">£30-80</p>
              <p className="text-xs text-muted-foreground">per customer</p>
            </div>
            <div className="p-4 bg-elec-gray/20 rounded-lg text-center">
              <h4 className="font-medium">Local Advertising</h4>
              <p className="text-2xl font-bold text-orange-400">£50-150</p>
              <p className="text-xs text-muted-foreground">per customer</p>
            </div>
            <div className="p-4 bg-elec-gray/20 rounded-lg text-center">
              <h4 className="font-medium">Direct Mail</h4>
              <p className="text-2xl font-bold text-red-400">£100-300</p>
              <p className="text-xs text-muted-foreground">per customer</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray/30">
        <CardHeader>
          <CardTitle className="text-lg">Sales Conversion Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {salesTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <Star className="h-4 w-4 text-elec-yellow mt-0.5 shrink-0" />
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};