
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileText, Users, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ApplicationGuides = () => {
  const applicationTimelines = [
    {
      funding: "Advanced Learner Loan",
      deadline: "No deadline - apply anytime",
      processingTime: "2-4 weeks",
      startDate: "Course start date",
      priority: "high"
    },
    {
      funding: "Student Finance (Degree)",
      deadline: "May (for September start)",
      processingTime: "6-8 weeks",
      startDate: "September/January",
      priority: "high"
    },
    {
      funding: "Employer Funding",
      deadline: "Varies by employer",
      processingTime: "2-6 weeks",
      startDate: "Flexible",
      priority: "medium"
    },
    {
      funding: "IET Grants",
      deadline: "March/September",
      processingTime: "4-6 weeks",
      startDate: "Course dependent",
      priority: "medium"
    }
  ];

  const documentChecklist = [
    { category: "Identity", items: ["Valid passport or driving licence", "Birth certificate", "Proof of National Insurance number"] },
    { category: "Residency", items: ["Utility bills (last 3 months)", "Council tax statement", "Bank statements"] },
    { category: "Academic", items: ["Qualification certificates", "Academic transcripts", "UCAS tariff points"] },
    { category: "Employment", items: ["Employment contract", "Recent payslips", "P60 or tax return", "Employer letter of support"] },
    { category: "Financial", items: ["Bank statements (3-6 months)", "Household income details", "Benefit statements if applicable"] }
  ];

  const stepByStepGuides = {
    "student-finance": [
      { step: 1, title: "Create Student Finance Account", description: "Visit gov.uk/student-finance and create your online account", timeNeeded: "15 minutes" },
      { step: 2, title: "Gather Required Documents", description: "Collect all necessary identity, residency, and income documents", timeNeeded: "30 minutes" },
      { step: 3, title: "Complete Application", description: "Fill in personal details, course information, and financial circumstances", timeNeeded: "45 minutes" },
      { step: 4, title: "Submit Supporting Evidence", description: "Upload or post required documents for verification", timeNeeded: "20 minutes" },
      { step: 5, title: "Track Application Progress", description: "Monitor status and respond to any requests for additional information", timeNeeded: "Ongoing" },
      { step: 6, title: "Receive Confirmation", description: "Get your Student Finance Entitlement letter", timeNeeded: "4-8 weeks" }
    ],
    "employer-funding": [
      { step: 1, title: "Research Company Policy", description: "Check your employee handbook or intranet for training support policies", timeNeeded: "15 minutes" },
      { step: 2, title: "Prepare Business Case", description: "Document how the training will benefit your role and the company", timeNeeded: "1 hour" },
      { step: 3, title: "Schedule Meeting", description: "Book time with your line manager or HR representative", timeNeeded: "5 minutes" },
      { step: 4, title: "Present Proposal", description: "Discuss the course, costs, time commitment, and benefits", timeNeeded: "30 minutes" },
      { step: 5, title: "Submit Formal Request", description: "Complete any required forms or training request documents", timeNeeded: "20 minutes" },
      { step: 6, title: "Follow Up", description: "Check progress and provide additional information if needed", timeNeeded: "Ongoing" }
    ],
    "professional-grants": [
      { step: 1, title: "Check Membership Status", description: "Ensure you're a current member of relevant professional bodies", timeNeeded: "5 minutes" },
      { step: 2, title: "Review Grant Criteria", description: "Read eligibility requirements and application guidelines carefully", timeNeeded: "20 minutes" },
      { step: 3, title: "Prepare Application Essay", description: "Write a compelling statement about your career goals and how the course helps", timeNeeded: "2 hours" },
      { step: 4, title: "Obtain References", description: "Get professional references from supervisors or mentors", timeNeeded: "1 week" },
      { step: 5, title: "Complete Application Form", description: "Fill in all required fields with accurate information", timeNeeded: "30 minutes" },
      { step: 6, title: "Submit Before Deadline", description: "Ensure application is received before the closing date", timeNeeded: "5 minutes" }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Step-by-Step Application Guides</h3>
        <p className="text-muted-foreground">
          Comprehensive guides to help you successfully apply for education funding
        </p>
      </div>

      {/* Application Timelines */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            Important Deadlines & Timelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applicationTimelines.map((timeline, idx) => (
              <div key={idx} className="bg-elec-dark/50 p-4 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{timeline.funding}</h4>
                  <Badge variant={timeline.priority === 'high' ? 'destructive' : 'secondary'}>
                    {timeline.priority === 'high' ? 'Urgent' : 'Normal'}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div><span className="text-elec-yellow">Deadline:</span> {timeline.deadline}</div>
                  <div><span className="text-elec-yellow">Processing:</span> {timeline.processingTime}</div>
                  <div><span className="text-elec-yellow">Start:</span> {timeline.startDate}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Checklist */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Required Documents Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentChecklist.map((category, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-elec-yellow mb-3">{category.category}</h4>
                <div className="space-y-2">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Guides */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-elec-yellow" />
            Detailed Application Processes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student-finance" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="student-finance">Student Finance</TabsTrigger>
              <TabsTrigger value="employer-funding">Employer Funding</TabsTrigger>
              <TabsTrigger value="professional-grants">Professional Grants</TabsTrigger>
            </TabsList>

            {Object.entries(stepByStepGuides).map(([key, steps]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-elec-dark/50 rounded-md">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {step.timeNeeded}
                      </Badge>
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Tips for Success */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Application Success Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-elec-yellow">Do's</h4>
              <div className="space-y-2">
                {[
                  "Apply as early as possible",
                  "Double-check all information before submitting",
                  "Keep copies of all documents",
                  "Follow up if you don't hear back within expected timeframes",
                  "Be honest about your financial circumstances",
                  "Seek help from course providers or advisors if needed"
                ].map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-red-400">Don'ts</h4>
              <div className="space-y-2">
                {[
                  "Leave applications until the last minute",
                  "Provide false or misleading information",
                  "Ignore requests for additional documentation",
                  "Apply for funding you're not eligible for",
                  "Forget to notify providers of changes in circumstances",
                  "Give up if your first application is unsuccessful"
                ].map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-blue-500/20 bg-blue-500/10">
        <FileText className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-200">
          <strong>Need Help?</strong> Most colleges and training providers offer free advice sessions to help with funding applications. 
          Don't hesitate to contact them directly or use the National Careers Service for additional guidance.
        </AlertDescription>
      </Alert>

      <div className="text-center">
        <Button className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
          Download Application Checklist PDF
        </Button>
      </div>
    </div>
  );
};

export default ApplicationGuides;
