
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle, TrendingUp, Users, Award } from "lucide-react";

const CommonPitfallsTab = () => {
  const commonPitfalls = [
    {
      category: "Financial Management",
      icon: <TrendingUp className="h-5 w-5" />,
      pitfalls: [
        {
          mistake: "Underpricing jobs to win work",
          consequence: "Unsustainable business model, cash flow problems",
          solution: "Calculate true costs including overheads, aim for 30%+ profit margin",
          severity: "high"
        },
        {
          mistake: "Not tracking expenses properly",
          consequence: "Tax issues, inability to claim deductions",
          solution: "Use accounting software, keep all receipts, separate business/personal",
          severity: "high"
        },
        {
          mistake: "Poor cash flow management",
          consequence: "Unable to pay bills, business closure",
          solution: "Invoice promptly, offer payment terms, maintain 3-month emergency fund",
          severity: "high"
        }
      ]
    },
    {
      category: "Legal & Compliance",
      icon: <CheckCircle className="h-5 w-5" />,
      pitfalls: [
        {
          mistake: "Working without proper insurance",
          consequence: "Personal liability for damages, potential bankruptcy",
          solution: "Get minimum £2M public liability, professional indemnity insurance",
          severity: "critical"
        },
        {
          mistake: "Ignoring Part P regulations",
          consequence: "Legal action, fines, inability to certificate work",
          solution: "Join competent person scheme (NICEIC/NAPIT), understand regulations",
          severity: "critical"
        },
        {
          mistake: "Poor contract terms",
          consequence: "Payment disputes, scope creep, legal issues",
          solution: "Use standard contracts, clearly define scope, payment terms",
          severity: "medium"
        }
      ]
    },
    {
      category: "Marketing & Customer Relations",
      icon: <Users className="h-5 w-5" />,
      pitfalls: [
        {
          mistake: "Relying on word-of-mouth only",
          consequence: "Limited growth, feast or famine cycles",
          solution: "Diversify marketing: online presence, local advertising, networking",
          severity: "medium"
        },
        {
          mistake: "Competing solely on price",
          consequence: "Race to bottom, unsustainable margins",
          solution: "Focus on value, quality, service. Build reputation and charge appropriately",
          severity: "medium"
        },
        {
          mistake: "Poor communication with clients",
          consequence: "Misunderstandings, disputes, bad reviews",
          solution: "Set clear expectations, regular updates, written confirmations",
          severity: "medium"
        }
      ]
    }
  ];

  const successStories = [
    {
      name: "Mark's Electrical Services",
      location: "Manchester",
      achievement: "Grew from sole trader to 5-person team in 18 months",
      keyStrategy: "Focused on domestic market, excellent customer service, digital marketing",
      revenue: "£180k in year 2"
    },
    {
      name: "PowerTech Solutions",
      location: "Bristol",
      achievement: "Secured major commercial contracts within first year",
      keyStrategy: "Specialized in commercial installations, built relationships with builders",
      revenue: "£250k in year 1"
    },
    {
      name: "Elite Electrical",
      location: "Birmingham",
      achievement: "Became area's top-rated electrician on Google",
      keyStrategy: "Exceptional quality, follow-up service, encouraged reviews",
      revenue: "£120k consistently"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <Alert className="border-red-500/50 bg-red-500/10">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <AlertDescription className="text-red-200">
          Learning from others' mistakes can save you time, money, and stress. Study these common pitfalls carefully.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        {commonPitfalls.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                {category.icon}
                {category.category} Pitfalls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.pitfalls.map((pitfall, pitfallIndex) => (
                  <div key={pitfallIndex} className="border border-red-500/20 rounded-lg p-4 bg-red-500/5">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-red-300 flex-1">{pitfall.mistake}</h4>
                      <Badge className={getSeverityColor(pitfall.severity)}>
                        {pitfall.severity}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-red-400">Consequence: </span>
                        <span className="text-sm text-muted-foreground">{pitfall.consequence}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-green-400">Solution: </span>
                        <span className="text-sm text-muted-foreground">{pitfall.solution}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Success Stories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {successStories.map((story, index) => (
              <div key={index} className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-green-200">{story.name}</h4>
                    <p className="text-sm text-muted-foreground">{story.location}</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300">{story.revenue}</Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-green-300">Achievement: </span>
                    <span className="text-sm text-green-100">{story.achievement}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-green-300">Key Strategy: </span>
                    <span className="text-sm text-green-100">{story.keyStrategy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300">Quick Prevention Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-blue-200">Before Starting Work:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-blue-100">Insurance certificates current</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-blue-100">Written quote provided</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-blue-100">Payment terms agreed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-blue-100">Scope clearly defined</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-200">Monthly Reviews:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-blue-100">Profit margins reviewed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-blue-100">Cash flow projected</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-blue-100">Customer feedback collected</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-blue-100">Marketing effectiveness assessed</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommonPitfallsTab;
