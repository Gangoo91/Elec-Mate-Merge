
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MapPin, Users, PoundSterling, BarChart3, Target, AlertTriangle } from "lucide-react";

const MarketIntelligenceTab = () => {
  const marketTrends = [
    {
      trend: "Smart Home Integration",
      growth: "+34%",
      impact: "High",
      description: "Increasing demand for smart electrical installations"
    },
    {
      trend: "EV Charging Points",
      growth: "+128%",
      impact: "Very High",
      description: "Rapid growth in electric vehicle charging infrastructure"
    },
    {
      trend: "Solar Panel Installations",
      growth: "+67%",
      impact: "High",
      description: "Rising interest in renewable energy solutions"
    },
    {
      trend: "Energy Efficiency Upgrades",
      growth: "+45%",
      impact: "Medium",
      description: "Focus on reducing energy consumption"
    }
  ];

  const regionalData = [
    {
      region: "London & South East",
      avgHourlyRate: "£45-65",
      competition: "Very High",
      demand: "Very High",
      specialties: ["Commercial", "Smart homes", "High-end residential"]
    },
    {
      region: "Birmingham & Midlands",
      avgHourlyRate: "£35-50",
      competition: "High",
      demand: "High", 
      specialties: ["Industrial", "Manufacturing", "Domestic"]
    },
    {
      region: "Manchester & North West",
      avgHourlyRate: "£32-48",
      competition: "Medium",
      demand: "High",
      specialties: ["Renewable energy", "Industrial", "Domestic"]
    },
    {
      region: "Scotland",
      avgHourlyRate: "£30-45",
      competition: "Medium",
      demand: "Medium",
      specialties: ["Wind energy", "Offshore", "Rural installations"]
    }
  ];

  const competitorAnalysis = [
    {
      type: "Large National Companies",
      marketShare: "35%",
      strengths: ["Brand recognition", "Resources", "Contracts"],
      weaknesses: ["Higher costs", "Less personal service", "Slower response"],
      opportunity: "Compete on personal service and flexibility"
    },
    {
      type: "Regional Contractors",
      marketShare: "40%",
      strengths: ["Local knowledge", "Established relationships", "Experience"],
      weaknesses: ["Limited specialisation", "Traditional methods"],
      opportunity: "Offer modern solutions and technology"
    },
    {
      type: "Sole Traders",
      marketShare: "25%",
      strengths: ["Low costs", "Flexibility", "Personal relationships"],
      weaknesses: ["Limited capacity", "Basic services", "Availability"],
      opportunity: "Provide comprehensive services and reliability"
    }
  ];

  const nichesOpportunities = [
    {
      niche: "Electric Vehicle Charging",
      potential: "Very High",
      barrier: "Medium",
      investment: "£5k-15k",
      description: "Government targets driving massive growth"
    },
    {
      niche: "Smart Home Automation",
      potential: "High", 
      barrier: "Medium",
      investment: "£2k-8k",
      description: "Tech-savvy customers willing to pay premium"
    },
    {
      niche: "Commercial Solar",
      potential: "High",
      barrier: "High",
      investment: "£10k-25k",
      description: "Businesses seeking energy cost reduction"
    },
    {
      niche: "Data Centre Infrastructure",
      potential: "Very High",
      barrier: "High",
      investment: "£15k-30k",
      description: "Growing demand with cloud computing"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Current Market Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {marketTrends.map((trend, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-green-500/5 rounded-lg border border-green-500/20">
              <div className="flex-1">
                <h4 className="font-medium text-white">{trend.trend}</h4>
                <p className="text-sm text-muted-foreground">{trend.description}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge 
                  className={`${
                    trend.impact === 'Very High' ? 'bg-red-500/20 text-red-300' :
                    trend.impact === 'High' ? 'bg-orange-500/20 text-orange-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}
                >
                  {trend.impact}
                </Badge>
                <span className="text-green-300 font-medium">{trend.growth}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Regional Market Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {regionalData.map((region, index) => (
            <div key={index} className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-white">{region.region}</h4>
                <div className="text-right">
                  <div className="text-blue-300 font-medium">{region.avgHourlyRate}</div>
                  <div className="text-xs text-muted-foreground">per hour</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-xs text-muted-foreground">Competition: </span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      region.competition === 'Very High' ? 'text-red-300 border-red-400/30' :
                      region.competition === 'High' ? 'text-orange-300 border-orange-400/30' :
                      'text-yellow-300 border-yellow-400/30'
                    }`}
                  >
                    {region.competition}
                  </Badge>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Demand: </span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      region.demand === 'Very High' ? 'text-green-300 border-green-400/30' :
                      region.demand === 'High' ? 'text-blue-300 border-blue-400/30' :
                      'text-yellow-300 border-yellow-400/30'
                    }`}
                  >
                    {region.demand}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Key Specialties: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {region.specialties.map((specialty, specialtyIndex) => (
                    <Badge key={specialtyIndex} variant="outline" className="text-xs text-blue-200 border-blue-400/30">
                      {specialty}
                    </Badge>
                  ))}
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
            Competitor Landscape
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {competitorAnalysis.map((competitor, index) => (
            <div key={index} className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-white">{competitor.type}</h4>
                <Badge className="bg-purple-500/20 text-purple-300">{competitor.marketShare}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-green-300 mb-2">Strengths</h5>
                  <ul className="space-y-1">
                    {competitor.strengths.map((strength, strengthIndex) => (
                      <li key={strengthIndex} className="text-muted-foreground text-xs">• {strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-red-300 mb-2">Weaknesses</h5>
                  <ul className="space-y-1">
                    {competitor.weaknesses.map((weakness, weaknessIndex) => (
                      <li key={weaknessIndex} className="text-muted-foreground text-xs">• {weakness}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-elec-yellow mb-2">Your Opportunity</h5>
                  <p className="text-muted-foreground text-xs">{competitor.opportunity}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-5 w-5" />
            Niche Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {nichesOpportunities.map((niche, index) => (
            <div key={index} className="p-4 bg-elec-dark/30 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-white">{niche.niche}</h4>
                <div className="text-right">
                  <div className="text-elec-yellow font-medium">{niche.investment}</div>
                  <div className="text-xs text-muted-foreground">initial investment</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{niche.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-muted-foreground">Potential: </span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      niche.potential === 'Very High' ? 'text-green-300 border-green-400/30' :
                      'text-blue-300 border-blue-400/30'
                    }`}
                  >
                    {niche.potential}
                  </Badge>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Entry Barrier: </span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      niche.barrier === 'High' ? 'text-red-300 border-red-400/30' :
                      'text-yellow-300 border-yellow-400/30'
                    }`}
                  >
                    {niche.barrier}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketIntelligenceTab;
