
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Users, Target, Calendar, FileText, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";

const ManagementTab = () => {
  const managementAreas = [
    {
      area: "Performance Management",
      icon: <Target className="h-5 w-5" />,
      practices: [
        "Set clear, measurable objectives and KPIs",
        "Conduct regular performance reviews (quarterly/bi-annually)",
        "Provide ongoing feedback and coaching",
        "Document performance issues and improvements",
        "Link performance to career development opportunities"
      ]
    },
    {
      area: "Team Communication",
      icon: <Users className="h-5 w-5" />,
      practices: [
        "Hold regular team meetings and toolbox talks",
        "Maintain open-door policy for concerns",
        "Use digital communication tools effectively",
        "Encourage feedback and suggestions",
        "Share company updates and business progress"
      ]
    },
    {
      area: "Health & Safety Leadership",
      icon: <Shield className="h-5 w-5" />,
      practices: [
        "Lead by example in safety behaviours",
        "Conduct regular safety inspections and audits",
        "Investigate incidents thoroughly and transparently",
        "Provide ongoing safety training and updates",
        "Recognise and reward safe working practices"
      ]
    },
    {
      area: "Work Allocation & Planning",
      icon: <Calendar className="h-5 w-5" />,
      practices: [
        "Match electricians' skills to appropriate tasks",
        "Plan workloads to avoid burnout or underutilisation",
        "Consider travel time and job complexity",
        "Provide adequate resources and support",
        "Monitor progress and adjust plans as needed"
      ]
    }
  ];

  const disciplinaryProcess = [
    {
      stage: "Informal Discussion",
      description: "Address minor issues through conversation and coaching",
      actions: ["Document the discussion", "Set clear expectations", "Offer support and training"],
      timeframe: "Immediate"
    },
    {
      stage: "Verbal Warning",
      description: "Formal verbal warning for continued or more serious issues",
      actions: ["Formal meeting with notes", "Clear improvement timeline", "Follow-up review date"],
      timeframe: "1-2 weeks"
    },
    {
      stage: "Written Warning",
      description: "Formal written warning if issues persist",
      actions: ["Written documentation", "Performance improvement plan", "Regular monitoring"],
      timeframe: "2-4 weeks"
    },
    {
      stage: "Final Written Warning",
      description: "Last formal warning before potential dismissal",
      actions: ["Final warning letter", "Clear consequences stated", "Close monitoring period"],
      timeframe: "4-12 weeks"
    },
    {
      stage: "Dismissal",
      description: "Termination of employment as last resort",
      actions: ["Dismissal meeting", "Notice period or pay in lieu", "Final documentation"],
      timeframe: "As per contract"
    }
  ];

  const kpiMetrics = [
    {
      category: "Quality & Safety",
      metrics: ["Safety incident rate", "Quality of work scores", "Customer satisfaction ratings", "Compliance with procedures"]
    },
    {
      category: "Productivity",
      metrics: ["Jobs completed per week", "Time to complete standard tasks", "Efficiency ratings", "Material waste reduction"]
    },
    {
      category: "Professional Development",
      metrics: ["Training hours completed", "Certifications achieved", "Skill assessments passed", "Knowledge sharing participation"]
    },
    {
      category: "Team Contribution",
      metrics: ["Attendance and punctuality", "Teamwork ratings", "Mentoring activities", "Process improvement suggestions"]
    }
  ];

  const managementChallenges = [
    {
      challenge: "Remote Site Management",
      solutions: [
        "Use project management apps for real-time updates",
        "Schedule regular check-ins via phone or video call",
        "Implement GPS tracking for work vehicles (with consent)",
        "Create clear reporting procedures for site issues",
        "Provide emergency contact protocols"
      ]
    },
    {
      challenge: "Skills Gap Management",
      solutions: [
        "Conduct regular skills assessments",
        "Create individual development plans",
        "Pair experienced electricians with newer team members",
        "Invest in targeted training programmes",
        "Consider outsourcing specialised work when needed"
      ]
    },
    {
      challenge: "Workload Balancing",
      solutions: [
        "Use scheduling software to optimise job allocation",
        "Monitor individual workloads and stress levels",
        "Maintain a pool of trusted subcontractors",
        "Cross-train team members for flexibility",
        "Plan for seasonal variations in demand"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Shield className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Effective management of electricians requires balancing technical oversight, safety leadership, and people management skills.
        </AlertDescription>
      </Alert>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Core Management Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {managementAreas.map((area, index) => (
              <div key={index} className="border border-elec-yellow/10 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  {area.icon}
                  <h4 className="font-medium text-white">{area.area}</h4>
                </div>
                <ul className="space-y-1 ml-6">
                  {area.practices.map((practice, practiceIndex) => (
                    <li key={practiceIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-elec-yellow/50 bg-elec-yellow/20" />
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Disciplinary Process Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {disciplinaryProcess.map((stage, index) => (
              <div key={index} className="border border-red-500/20 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-red-200">{stage.stage}</h5>
                  <Badge variant="outline" className="text-red-300 border-red-400/30">
                    {stage.timeframe}
                  </Badge>
                </div>
                <p className="text-sm text-red-100">{stage.description}</p>
                <div className="flex flex-wrap gap-1">
                  {stage.actions.map((action, actionIndex) => (
                    <Badge key={actionIndex} variant="secondary" className="text-xs text-red-100">
                      {action}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Key Performance Indicators (KPIs)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {kpiMetrics.map((category, index) => (
              <div key={index} className="space-y-2">
                <h5 className="font-medium text-green-200">{category.category}</h5>
                <ul className="space-y-1">
                  {category.metrics.map((metric, metricIndex) => (
                    <li key={metricIndex} className="text-sm text-green-100 flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5 h-1.5 w-1.5 rounded-full p-0 border-green-400/50 bg-green-400/20" />
                      {metric}
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
            <CheckCircle className="h-5 w-5" />
            Common Management Challenges & Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {managementChallenges.map((item, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-4 space-y-3">
                <h5 className="font-medium text-purple-200">{item.challenge}</h5>
                <ul className="space-y-1">
                  {item.solutions.map((solution, solutionIndex) => (
                    <li key={solutionIndex} className="text-sm text-purple-100 flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-purple-400/50 bg-purple-400/20" />
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Essential Management Documentation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-orange-200 mb-3">Personnel Records</h5>
              <ul className="space-y-1 text-sm text-orange-100">
                <li>• Employment contracts and job descriptions</li>
                <li>• Performance review records</li>
                <li>• Training certificates and qualifications</li>
                <li>• Disciplinary actions and outcomes</li>
                <li>• Absence and holiday records</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-orange-200 mb-3">Operational Records</h5>
              <ul className="space-y-1 text-sm text-orange-100">
                <li>• Work allocation and scheduling logs</li>
                <li>• Quality control checklists</li>
                <li>• Safety incident reports</li>
                <li>• Customer feedback records</li>
                <li>• Equipment and tool inventories</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagementTab;
