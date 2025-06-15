
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp, PoundSterling, Heart, Trophy, Users, Gift, Clock, Star } from "lucide-react";

const RetentionTab = () => {
  const retentionStrategies = [
    {
      category: "Compensation & Benefits",
      icon: <PoundSterling className="h-5 w-5" />,
      impact: "High",
      strategies: [
        "Competitive salary reviews and performance bonuses",
        "Company vehicle or travel allowance provision",
        "Comprehensive pension scheme contributions",
        "Private healthcare and insurance benefits",
        "Tool allowance and equipment provision"
      ]
    },
    {
      category: "Career Development",
      icon: <TrendingUp className="h-5 w-5" />,
      impact: "High",
      strategies: [
        "Clear progression pathways and promotion criteria",
        "Funded training and certification opportunities",
        "Mentorship programmes and skill development",
        "Cross-training in different electrical specialisations",
        "Leadership development for senior positions"
      ]
    },
    {
      category: "Work Environment",
      icon: <Heart className="h-5 w-5" />,
      impact: "Medium",
      strategies: [
        "Flexible working arrangements where possible",
        "Modern tools and safety equipment provision",
        "Regular team-building activities and social events",
        "Open communication and feedback culture",
        "Recognition and appreciation programmes"
      ]
    },
    {
      category: "Job Satisfaction",
      icon: <Trophy className="h-5 w-5" />,
      impact: "High",
      strategies: [
        "Variety in work assignments and project types",
        "Autonomy in decision-making and problem-solving",
        "Regular feedback and performance discussions",
        "Employee of the month recognition schemes",
        "Involvement in company decision-making processes"
      ]
    }
  ];

  const exitInterviewTopics = [
    "Primary reasons for leaving the company",
    "Satisfaction with compensation and benefits",
    "Quality of management and supervision",
    "Opportunities for career advancement",
    "Work-life balance and job satisfaction",
    "Training and development opportunities",
    "Company culture and team dynamics",
    "Suggestions for improvement"
  ];

  const warningSignsData = [
    {
      category: "Performance Changes",
      signs: ["Declining work quality", "Increased errors or mistakes", "Reduced productivity", "Missing deadlines"]
    },
    {
      category: "Behavioural Changes",
      signs: ["Increased absenteeism", "Less participation in meetings", "Reduced communication", "Appearing disengaged"]
    },
    {
      category: "Attitude Changes",
      signs: ["Negative comments about work", "Complaints about management", "Expressing job dissatisfaction", "Talking about other opportunities"]
    }
  ];

  const retentionMetrics = [
    {
      metric: "Annual Turnover Rate",
      target: "< 15%",
      industry: "18-25%",
      description: "Percentage of electricians who leave annually"
    },
    {
      metric: "Average Tenure",
      target: "> 3 years",
      industry: "2.5 years",
      description: "Average length of employment for electricians"
    },
    {
      metric: "Internal Promotion Rate",
      target: "> 30%",
      industry: "25%",
      description: "Percentage of senior positions filled internally"
    },
    {
      metric: "Employee Satisfaction",
      target: "> 4/5",
      industry: "3.5/5",
      description: "Average satisfaction score from surveys"
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <TrendingUp className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Retaining skilled electricians is 5x more cost-effective than recruiting new ones. Focus on proactive retention strategies.
        </AlertDescription>
      </Alert>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Users className="h-5 w-5" />
            Retention Strategies by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {retentionStrategies.map((category, index) => (
              <div key={index} className="border border-elec-yellow/10 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <h4 className="font-medium text-white">{category.category}</h4>
                  </div>
                  <Badge variant="outline" className={`${
                    category.impact === 'High' ? 'text-green-300 border-green-400/30' :
                    'text-yellow-300 border-yellow-400/30'
                  }`}>
                    {category.impact} Impact
                  </Badge>
                </div>
                <ul className="space-y-1 ml-6">
                  {category.strategies.map((strategy, strategyIndex) => (
                    <li key={strategyIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-elec-yellow/50 bg-elec-yellow/20" />
                      {strategy}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-orange-500/50 bg-orange-500/10">
          <CardHeader>
            <CardTitle className="text-orange-300 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Early Warning Signs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {warningSignsData.map((category, index) => (
                <div key={index} className="space-y-2">
                  <h5 className="font-medium text-orange-200">{category.category}</h5>
                  <ul className="space-y-1">
                    {category.signs.map((sign, signIndex) => (
                      <li key={signIndex} className="text-sm text-orange-100 flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5 h-1.5 w-1.5 rounded-full p-0 border-orange-400/50 bg-orange-400/20" />
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-purple-500/10">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <Star className="h-5 w-5" />
              Exit Interview Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {exitInterviewTopics.map((topic, index) => (
                <li key={index} className="text-sm text-purple-100 flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-purple-400/50 bg-purple-400/20" />
                  {topic}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Key Retention Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {retentionMetrics.map((metric, index) => (
              <div key={index} className="border border-green-500/20 rounded-lg p-4 space-y-2">
                <h5 className="font-medium text-green-200">{metric.metric}</h5>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-green-100">Target: <span className="font-medium">{metric.target}</span></div>
                    <div className="text-sm text-green-100">Industry: <span className="font-medium">{metric.industry}</span></div>
                  </div>
                </div>
                <p className="text-xs text-green-100">{metric.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Quick Win Retention Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-white mb-3">Immediate Actions (0-30 days)</h5>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Conduct stay interviews with key team members</li>
                <li>• Review and benchmark current compensation packages</li>
                <li>• Implement weekly one-to-one meetings</li>
                <li>• Start employee recognition programme</li>
                <li>• Address any immediate workplace concerns</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-white mb-3">Medium-term Actions (1-6 months)</h5>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Develop clear career progression pathways</li>
                <li>• Introduce flexible working arrangements</li>
                <li>• Launch training and development programmes</li>
                <li>• Improve workplace facilities and equipment</li>
                <li>• Create team-building and social initiatives</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetentionTab;
