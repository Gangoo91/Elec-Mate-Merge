
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User, Brain, TrendingUp, Target, Award, Network, MapPin, Briefcase } from "lucide-react";

const CareerGuidanceTab = () => {
  const careerInsights = [
    {
      title: "Career Trajectory Analysis",
      insight: "Based on your learning patterns and performance, you're well-suited for technical specialisation roles",
      confidence: 89,
      recommendations: ["Consider advanced PLC programming", "Explore renewable energy systems", "Develop project management skills"]
    },
    {
      title: "Market Alignment",
      insight: "Your skills align strongly with current UK electrical industry demands, particularly in commercial sector",
      confidence: 94,
      recommendations: ["Focus on commercial installations", "Gain 18th Edition expertise", "Build testing & inspection credentials"]
    },
    {
      title: "Progression Timeline",
      insight: "You're progressing 23% faster than average, positioning you for early career advancement opportunities",
      confidence: 87,
      recommendations: ["Consider early JIB grading application", "Explore apprentice mentor roles", "Plan advanced qualifications"]
    }
  ];

  const careerPaths = [
    {
      title: "Installation Specialist",
      match: 92,
      timeframe: "6-9 months",
      earning: "£28,000 - £35,000",
      growth: "High demand",
      requirements: ["Level 3 completion", "Strong practical skills", "Safety certification"],
      aiRecommended: true
    },
    {
      title: "Testing & Inspection Engineer",
      match: 87,
      timeframe: "12-18 months",
      earning: "£32,000 - £42,000",
      growth: "Very high demand",
      requirements: ["18th Edition", "2391 qualification", "Analytical mindset"],
      aiRecommended: true
    },
    {
      title: "Project Supervisor",
      match: 78,
      timeframe: "18-24 months",
      earning: "£35,000 - £45,000",
      growth: "Moderate demand",
      requirements: ["Leadership experience", "Project management", "Team coordination"],
      aiRecommended: false
    },
    {
      title: "Renewable Energy Technician",
      match: 85,
      timeframe: "12-15 months",
      earning: "£30,000 - £38,000",
      growth: "Rapidly growing",
      requirements: ["Solar/wind specialisation", "Environmental awareness", "New technology adaptation"],
      aiRecommended: true
    }
  ];

  const networkingOpportunities = [
    {
      type: "Industry Event",
      title: "NICEIC Technical Seminar",
      date: "15th April 2024",
      location: "Birmingham",
      relevance: 95,
      description: "Latest regulations and testing procedures - perfect for your learning goals"
    },
    {
      type: "Professional Body",
      title: "IET Young Professionals",
      date: "Ongoing",
      location: "Various",
      relevance: 88,
      description: "Networking group for emerging electrical engineers and technicians"
    },
    {
      type: "Training Course",
      title: "Advanced PLC Programming",
      date: "2nd May 2024",
      location: "Manchester",
      relevance: 82,
      description: "Industrial automation skills development - high market value"
    }
  ];

  const skillGaps = [
    {
      skill: "Commercial Installation Experience",
      currentLevel: 45,
      targetLevel: 80,
      priority: "High",
      timeToClose: "6-8 weeks",
      aiSuggestion: "Seek commercial placement or shadowing opportunities"
    },
    {
      skill: "Advanced Testing Procedures",
      currentLevel: 72,
      targetLevel: 90,
      priority: "Medium",
      timeToClose: "4-6 weeks",
      aiSuggestion: "Practice with different MFT equipment and complex circuits"
    },
    {
      skill: "Project Documentation",
      currentLevel: 65,
      targetLevel: 85,
      priority: "Medium",
      timeToClose: "3-4 weeks",
      aiSuggestion: "Focus on digital documentation tools and compliance frameworks"
    }
  ];

  const getMatchBadge = (match: number) => {
    if (match >= 90) return <Badge className="bg-green-600 text-white">Excellent Match</Badge>;
    if (match >= 80) return <Badge className="bg-blue-600 text-white">Good Match</Badge>;
    return <Badge className="bg-orange-600 text-white">Fair Match</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-600 text-white">High</Badge>;
      case "Medium":
        return <Badge className="bg-orange-600 text-white">Medium</Badge>;
      default:
        return <Badge className="bg-green-600 text-white">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Career Readiness</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">84%</div>
            <p className="text-xs text-muted-foreground">
              Industry ready
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">£31k</div>
            <p className="text-xs text-muted-foreground">
              Estimated starting
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Score</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">67</div>
            <p className="text-xs text-muted-foreground">
              Professional connections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Career Paths</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-elec-yellow">4</div>
            <p className="text-xs text-muted-foreground">
              AI recommended
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Career Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {careerInsights.map((insight, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Badge variant="outline">{insight.confidence}% confident</Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{insight.insight}</p>
                  
                  <div>
                    <span className="text-xs text-muted-foreground">AI Recommendations:</span>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                      {insight.recommendations.map((rec, recIndex) => (
                        <li key={recIndex} className="flex items-start gap-1">
                          <span className="text-elec-yellow">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Personalised Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {careerPaths.map((path, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{path.title}</h4>
                    <div className="flex items-center gap-2">
                      {getMatchBadge(path.match)}
                      {path.aiRecommended && (
                        <Badge className="bg-purple-600 text-white text-xs">
                          <Brain className="h-3 w-3 mr-1" />
                          AI Pick
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-muted-foreground">Timeframe:</span>
                      <div className="font-medium">{path.timeframe}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Salary:</span>
                      <div className="font-medium text-green-500">{path.earning}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Growth:</span>
                      <div className="font-medium">{path.growth}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Match:</span>
                      <div className="font-medium text-blue-500">{path.match}%</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">Requirements:</div>
                    <div className="flex flex-wrap gap-1">
                      {path.requirements.map((req, reqIndex) => (
                        <Badge key={reqIndex} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button size="sm" className="w-full mt-3">
                    Explore Path
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Skill Gap Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillGaps.map((gap, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{gap.skill}</span>
                    {getPriorityBadge(gap.priority)}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Current: {gap.currentLevel}%</span>
                      <span>Target: {gap.targetLevel}%</span>
                    </div>
                    <Progress value={gap.currentLevel} className="h-2" />
                  </div>
                  
                  <div className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">Time to close:</span>
                      <span className="text-elec-yellow">{gap.timeToClose}</span>
                    </div>
                    <p className="text-muted-foreground italic text-xs">
                      AI Suggestion: {gap.aiSuggestion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Networking Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {networkingOpportunities.map((opportunity, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-blue-500" />
                      <h4 className="font-medium">{opportunity.title}</h4>
                    </div>
                    <Badge variant="outline">{opportunity.relevance}% relevant</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <div className="font-medium">{opportunity.type}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date:</span>
                      <div className="font-medium">{opportunity.date}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2 text-sm">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{opportunity.location}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{opportunity.description}</p>
                  
                  <Button size="sm" variant="outline" className="w-full">
                    Learn More
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerGuidanceTab;
