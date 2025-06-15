
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp, Heart, DollarSign, Award, Users, Target } from "lucide-react";

const RetentionTab = () => {
  const retentionStrategies = [
    {
      category: "Career Development",
      icon: <TrendingUp className="h-5 w-5" />,
      strategies: [
        "Clear progression pathways and role advancement opportunities",
        "Support for additional qualifications and training courses",
        "Cross-training in different electrical specialisms", 
        "Leadership development for senior roles",
        "Regular skills assessments and development planning"
      ],
      impact: "High"
    },
    {
      category: "Work-Life Balance",
      icon: <Heart className="h-5 w-5" />,
      strategies: [
        "Flexible working hours where operationally possible",
        "Generous holiday allowance and time-off policies",
        "Support for personal commitments and family time",
        "Mental health and wellbeing support programs",
        "Reasonable overtime expectations and compensation"
      ],
      impact: "High"
    },
    {
      category: "Compensation & Benefits",
      icon: <DollarSign className="h-5 w-5" />,
      strategies: [
        "Competitive salary reviews and performance bonuses",
        "Company vehicle or travel allowance provision",
        "Comprehensive pension scheme contributions",
        "Private healthcare and insurance benefits",
        "Tool allowance and equipment provision"
      ],
      impact: "Medium"
    },
    {
      category: "Recognition & Rewards",
      icon: <Award className="h-5 w-5" />,
      strategies: [
        "Employee of the month and achievement recognition",
        "Customer feedback sharing and praise acknowledgment",
        "Long service awards and loyalty recognition",
        "Skills-based bonuses and certification rewards",
        "Team social events and company celebrations"
      ],
      impact: "Medium"
    }
  ];

  const warningSignsOfDissatisfaction = [
    "Decreased enthusiasm for work or new challenges",
    "Increased sick days or time off requests",
    "Reduced quality of work or customer complaints",
    "Withdrawal from team activities or communication",
    "Expressions of frustration with processes or management",
    "Increased interest in external job opportunities"
  ];

  const exitInterviewTopics = [
    "What attracted you to the role initially?",
    "What did you enjoy most about working here?",
    "What would have made you stay longer?",
    "How could we improve our training and development?",
    "What advice would you give to your replacement?",
    "Would you recommend us as an employer?"
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Target className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Replacing an electrician costs 50-200% of their annual salary. Retention is always more cost-effective than recruitment.
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
          <div className="space-y-6">
            {retentionStrategies.map((category, index) => (
              <div key={index} className="border border-elec-yellow/10 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-elec-yellow">{category.icon}</div>
                    <h4 className="font-medium text-white">{category.category}</h4>
                  </div>
                  <Badge variant="outline" className={`${
                    category.impact === 'High' ? 'text-green-300 border-green-400/30' :
                    'text-yellow-300 border-yellow-400/30'
                  }`}>
                    {category.impact} Impact
                  </Badge>
                </div>
                <ul className="space-y-1 ml-7">
                  {category.strategies.map((strategy, strategyIndex) => (
                    <li key={strategyIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <Badge variant="outline" className="mt-1 h-1.5 w-1.5 rounded-full p-0 border-elec-yellow/50 bg-elec-yellow/20" />
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
        <Card className="border-red-500/50 bg-red-500/10">
          <CardHeader>
            <CardTitle className="text-red-300 flex items-center gap-2">
              <Alert className="h-5 w-5" />
              Warning Signs to Watch For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {warningSignsOfDissatisfaction.map((sign, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-red-400/50 bg-red-400/20" />
                  <span className="text-red-100">{sign}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-purple-500/10">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Exit Interview Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {exitInterviewTopics.map((question, index) => (
                <li key={index} className="text-sm text-purple-100">
                  <strong>{index + 1}.</strong> {question}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300">Retention Statistics & Benchmarks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">85%</div>
              <div className="text-sm text-green-100">Industry average retention rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">2 years</div>
              <div className="text-sm text-green-100">Average tenure for electricians</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">£15k</div>
              <div className="text-sm text-green-100">Average replacement cost</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">6 months</div>
              <div className="text-sm text-green-100">Time to replace & train</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Monthly Retention Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">One-to-one meetings with each team member</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Review workload and stress levels</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Discuss career development opportunities</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Acknowledge achievements and successes</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Address any concerns or issues raised</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Review compensation and benefits satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Plan training or development activities</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Gather feedback on company processes</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetentionTab;
