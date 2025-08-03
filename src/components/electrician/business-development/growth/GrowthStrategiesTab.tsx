import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Users, MapPin, Building, TrendingUp, Clock } from "lucide-react";

export const GrowthStrategiesTab = () => {
  const strategies = [
    {
      title: "Market Expansion",
      description: "Expand into new geographical areas or market segments",
      icon: <MapPin className="h-5 w-5" />,
      tactics: ["Research new local markets", "Target commercial vs domestic", "Consider rural vs urban areas", "Partner with local businesses"]
    },
    {
      title: "Team Building",
      description: "Scale your workforce strategically",
      icon: <Users className="h-5 w-5" />,
      tactics: ["Hire qualified electricians", "Train apprentices", "Subcontractor partnerships", "Specialist team members"]
    },
    {
      title: "Business Structure",
      description: "Optimise your business model for growth",
      icon: <Building className="h-5 w-5" />,
      tactics: ["Consider incorporation", "Establish multiple revenue streams", "Develop standard procedures", "Implement quality systems"]
    },
    {
      title: "Strategic Planning",
      description: "Long-term planning for sustainable growth",
      icon: <Target className="h-5 w-5" />,
      tactics: ["Set clear growth targets", "Develop 3-5 year plans", "Regular strategy reviews", "Competitive analysis"]
    }
  ];

  const growthPhases = [
    { phase: "Start-up", timeframe: "0-2 years", focus: "Establishing foundation, first customers, basic systems" },
    { phase: "Growth", timeframe: "2-5 years", focus: "Expanding team, increasing market share, refining processes" },
    { phase: "Maturity", timeframe: "5+ years", focus: "Market leadership, diversification, systematic operations" }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Business Growth Framework
          </CardTitle>
          <CardDescription>
            Strategic approaches to scaling your electrical contracting business in the UK market
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {strategies.map((strategy, index) => (
              <Card key={index} className="bg-elec-gray/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {strategy.icon}
                    {strategy.title}
                  </CardTitle>
                  <CardDescription>{strategy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {strategy.tactics.map((tactic, i) => (
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
            <Clock className="h-5 w-5 text-elec-yellow" />
            Growth Phases Timeline
          </CardTitle>
          <CardDescription>
            Understanding the typical progression of electrical business growth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {growthPhases.map((phase, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-elec-gray/20 rounded-lg">
                <Badge variant="outline" className="shrink-0">{phase.timeframe}</Badge>
                <div>
                  <h4 className="font-semibold">{phase.phase} Phase</h4>
                  <p className="text-sm text-muted-foreground">{phase.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray/30">
        <CardHeader>
          <CardTitle className="text-lg">Key Success Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Financial Management</h4>
              <p className="text-sm text-muted-foreground">Maintain healthy cash flow and reinvest profits strategically</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Quality Standards</h4>
              <p className="text-sm text-muted-foreground">Consistent high-quality work builds reputation and referrals</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Customer Relationships</h4>
              <p className="text-sm text-muted-foreground">Strong relationships drive repeat business and recommendations</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Market Awareness</h4>
              <p className="text-sm text-muted-foreground">Stay informed about industry trends and opportunities</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};