
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, FileText, Users, Shield, BookOpen, Settings } from "lucide-react";

const OnboardingTab = () => {
  const onboardingTimeline = [
    {
      phase: "Week 1",
      title: "Documentation & Setup",
      tasks: [
        "Complete employment contracts and right to work checks",
        "Set up payroll, pension, and insurance details", 
        "Issue company ID, uniform, and basic equipment",
        "Complete health and safety induction",
        "Introduce to team and assign buddy/mentor"
      ]
    },
    {
      phase: "Week 2-4", 
      title: "Skills Assessment & Training",
      tasks: [
        "Conduct practical skills assessment",
        "Review existing qualifications and identify gaps",
        "Begin company-specific training programs",
        "Shadow experienced electricians on various job types",
        "Learn company procedures and quality standards"
      ]
    },
    {
      phase: "Month 2-3",
      title: "Independent Work Development", 
      tasks: [
        "Begin working independently on suitable tasks",
        "Regular progress reviews and feedback sessions",
        "Complete any required additional training",
        "Build relationships with regular customers",
        "Develop specialisation in company focus areas"
      ]
    },
    {
      phase: "Month 4-6",
      title: "Full Integration",
      tasks: [
        "Take on more complex and varied work",
        "Participate in company development initiatives",
        "Mentor newer team members",
        "Contribute to process improvements",
        "Complete probationary period review"
      ]
    }
  ];

  const essentialDocuments = [
    "Employment contract with clear terms and conditions",
    "Health and safety policies and procedures manual",
    "Company quality standards and procedures",
    "Customer service standards and communication guidelines",
    "Emergency contact procedures and escalation processes",
    "Equipment care and maintenance guidelines"
  ];

  const trainingAreas = [
    {
      category: "Company Systems",
      items: ["Job management software", "Invoicing and quoting systems", "Quality control processes"]
    },
    {
      category: "Customer Service",
      items: ["Communication standards", "Complaint handling", "Professional presentation"]
    },
    {
      category: "Technical Skills",
      items: ["Company installation methods", "Preferred suppliers and materials", "Diagnostic procedures"]
    },
    {
      category: "Health & Safety",
      items: ["Site-specific risk assessments", "Emergency procedures", "Equipment maintenance"]
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-green-500/50 bg-green-500/10">
        <BookOpen className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          A structured onboarding process increases employee retention by 82% and productivity by over 70%.
        </AlertDescription>
      </Alert>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            6-Month Onboarding Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {onboardingTimeline.map((phase, index) => (
              <div key={index} className="border-l-2 border-elec-yellow/30 pl-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-elec-yellow border-elec-yellow/50">
                    {phase.phase}
                  </Badge>
                  <h4 className="font-medium text-white">{phase.title}</h4>
                </div>
                <ul className="space-y-1 ml-4">
                  {phase.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <Badge variant="outline" className="mt-1 h-1.5 w-1.5 rounded-full p-0 border-elec-yellow/50 bg-elec-yellow/20" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-blue-500/50 bg-blue-500/10">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Essential Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {essentialDocuments.map((doc, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-blue-400/50 bg-blue-400/20" />
                  <span className="text-blue-100">{doc}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-purple-500/10">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Training Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainingAreas.map((area, index) => (
                <div key={index} className="space-y-2">
                  <h5 className="font-medium text-purple-200">{area.category}</h5>
                  <div className="flex flex-wrap gap-1">
                    {area.items.map((item, itemIndex) => (
                      <Badge key={itemIndex} variant="secondary" className="text-xs text-purple-100">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            First Day Essentials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-orange-200 mb-2">Before They Arrive</h5>
              <ul className="space-y-1 text-sm text-orange-100">
                <li>• Prepare workspace and equipment</li>
                <li>• Notify team of start date</li>
                <li>• Prepare welcome pack and documentation</li>
                <li>• Plan first week schedule</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-orange-200 mb-2">First Day Activities</h5>
              <ul className="space-y-1 text-sm text-orange-100">
                <li>• Welcome and office/workshop tour</li>
                <li>• Complete mandatory paperwork</li>
                <li>• Health and safety briefing</li>
                <li>• Meet the team and assign buddy</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Onboarding Success Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">90%</div>
              <div className="text-sm text-muted-foreground">Employee satisfaction after 90 days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">6 weeks</div>
              <div className="text-sm text-muted-foreground">Time to full productivity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">95%</div>
              <div className="text-sm text-muted-foreground">Retention after 12 months</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingTab;
