
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Settings, BarChart3, MessageSquare, Star, Target } from "lucide-react";

const ManagementTab = () => {
  const managementPrinciples = [
    {
      principle: "Clear Communication",
      description: "Regular team meetings, transparent goal setting, and open feedback channels",
      practices: [
        "Weekly team briefings on upcoming work",
        "Monthly one-to-one performance discussions",
        "Quarterly team building and development sessions",
        "Annual performance reviews with goal setting"
      ]
    },
    {
      principle: "Performance Management",
      description: "Setting expectations, monitoring progress, and providing constructive feedback",
      practices: [
        "SMART goals aligned with business objectives",
        "Regular skills assessments and development planning",
        "Customer feedback integration into performance reviews",
        "Recognition of achievements and milestone celebrations"
      ]
    },
    {
      principle: "Team Development",
      description: "Investing in skills growth and creating advancement opportunities",
      practices: [
        "Individual development plans for each team member",
        "Cross-training opportunities across different specialisms",
        "Mentoring programs pairing senior and junior staff",
        "Support for external training and qualifications"
      ]
    }
  ];

  const performanceMetrics = [
    { metric: "Customer Satisfaction Score", target: "95%+", frequency: "Monthly" },
    { metric: "First-Time Fix Rate", target: "85%+", frequency: "Weekly" },
    { metric: "Safety Incident Rate", target: "0", frequency: "Monthly" },
    { metric: "Training Hours Completed", target: "40 hrs/year", frequency: "Quarterly" },
    { metric: "Revenue per Electrician", target: "£120k+", frequency: "Monthly" },
    { metric: "Overtime Hours", target: "<10%", frequency: "Weekly" }
  ];

  const teamMeetingAgenda = [
    "Safety updates and any incidents to review",
    "Upcoming jobs and resource allocation",
    "Customer feedback and service improvements", 
    "Training opportunities and skills development",
    "Equipment and tool requirements",
    "Team achievements and recognition"
  ];

  const disciplinaryProcess = [
    {
      stage: "Informal Discussion",
      description: "Address minor issues through conversation and guidance",
      documentation: "Brief notes on discussion and agreed actions"
    },
    {
      stage: "Verbal Warning",
      description: "Formal discussion with clear expectations and improvement timeline",
      documentation: "Written record of warning and improvement plan"
    },
    {
      stage: "Written Warning",
      description: "Serious concerns requiring formal documentation and monitoring",
      documentation: "Official written warning with specific improvement requirements"
    },
    {
      stage: "Final Warning",
      description: "Last opportunity to improve before considering dismissal",
      documentation: "Final warning letter with clear consequences outlined"
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Users className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Effective management increases team productivity by 30% and reduces turnover by up to 50%.
        </AlertDescription>
      </Alert>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Core Management Principles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {managementPrinciples.map((item, index) => (
              <div key={index} className="border border-elec-yellow/10 rounded-lg p-4 space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-1">{item.principle}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ul className="space-y-1 ml-4">
                  {item.practices.map((practice, practiceIndex) => (
                    <li key={practiceIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <Badge variant="outline" className="mt-1 h-1.5 w-1.5 rounded-full p-0 border-elec-yellow/50 bg-elec-yellow/20" />
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-green-500/50 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Key Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-green-100">{metric.metric}</span>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-green-300 border-green-400/30">
                      {metric.target}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {metric.frequency}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-purple-500/10">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Team Meeting Agenda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {teamMeetingAgenda.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-purple-400/50 bg-purple-400/20" />
                  <span className="text-purple-100">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Progressive Disciplinary Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {disciplinaryProcess.map((stage, index) => (
              <div key={index} className="border-l-2 border-orange-400/30 pl-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-orange-300 border-orange-400/30">
                    Stage {index + 1}
                  </Badge>
                  <h5 className="font-medium text-orange-200">{stage.stage}</h5>
                </div>
                <p className="text-sm text-orange-100">{stage.description}</p>
                <p className="text-xs text-orange-200 italic">{stage.documentation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Star className="h-5 w-5" />
            Management Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-white mb-3">Daily Management</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Start each day with a brief team check-in</li>
                <li>• Monitor work progress and offer support</li>
                <li>• Address issues promptly before they escalate</li>
                <li>• Recognise good work and effort publicly</li>
                <li>• End with a brief review of the day's achievements</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-white mb-3">Weekly Focus Areas</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Review performance metrics and targets</li>
                <li>• Plan upcoming work and resource allocation</li>
                <li>• Address any team concerns or suggestions</li>
                <li>• Identify training or development needs</li>
                <li>• Celebrate successes and learn from challenges</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagementTab;
