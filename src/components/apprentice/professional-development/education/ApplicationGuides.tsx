
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileText, Users, AlertTriangle, Sparkles, Download, Lightbulb } from "lucide-react";

const ApplicationGuides = () => {
  const applicationTimelines = [
    {
      funding: "Advanced Learner Loan",
      deadline: "No deadline - apply anytime",
      processingTime: "2-4 weeks",
      startDate: "Course start date",
      priority: "high",
      color: "green"
    },
    {
      funding: "Student Finance (Degree)",
      deadline: "May (for September start)",
      processingTime: "6-8 weeks",
      startDate: "September/January",
      priority: "high",
      color: "blue"
    },
    {
      funding: "Employer Funding",
      deadline: "Varies by employer",
      processingTime: "2-6 weeks",
      startDate: "Flexible",
      priority: "medium",
      color: "purple"
    },
    {
      funding: "IET Grants",
      deadline: "March/September",
      processingTime: "4-6 weeks",
      startDate: "Course dependent",
      priority: "medium",
      color: "yellow"
    }
  ];

  const documentChecklist = [
    { category: "Identity", items: ["Valid passport or driving licence", "Birth certificate", "Proof of National Insurance number"], color: "blue" },
    { category: "Residency", items: ["Utility bills (last 3 months)", "Council tax statement", "Bank statements"], color: "green" },
    { category: "Academic", items: ["Qualification certificates", "Academic transcripts", "UCAS tariff points"], color: "purple" },
    { category: "Employment", items: ["Employment contract", "Recent payslips", "P60 or tax return", "Employer letter of support"], color: "yellow" },
    { category: "Financial", items: ["Bank statements (3-6 months)", "Household income details", "Benefit statements if applicable"], color: "orange" }
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

  const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string; glow: string }> = {
    blue: {
      bg: "bg-gradient-to-br from-white/5 to-blue-950/20",
      border: "border-blue-500/30",
      icon: "text-blue-400",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      glow: "bg-blue-500/5"
    },
    green: {
      bg: "bg-gradient-to-br from-white/5 to-green-950/20",
      border: "border-green-500/30",
      icon: "text-green-400",
      badge: "bg-green-500/10 text-green-400 border-green-500/30",
      glow: "bg-green-500/5"
    },
    purple: {
      bg: "bg-gradient-to-br from-white/5 to-purple-950/20",
      border: "border-purple-500/30",
      icon: "text-purple-400",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      glow: "bg-purple-500/5"
    },
    yellow: {
      bg: "bg-gradient-to-br from-white/5 to-yellow-950/20",
      border: "border-elec-yellow/30",
      icon: "text-elec-yellow",
      badge: "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30",
      glow: "bg-elec-yellow/5"
    },
    orange: {
      bg: "bg-gradient-to-br from-white/5 to-orange-950/20",
      border: "border-orange-500/30",
      icon: "text-orange-400",
      badge: "bg-orange-500/10 text-orange-400 border-orange-500/30",
      glow: "bg-orange-500/5"
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
            <FileText className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Step-by-Step Application Guides</h3>
            <p className="text-sm text-white/70">
              Comprehensive guides to help you successfully apply for education funding
            </p>
          </div>
        </div>
      </div>

      {/* Application Timelines */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Clock className="h-5 w-5 text-elec-yellow" />
            </div>
            Important Deadlines & Timelines
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {applicationTimelines.map((timeline, idx) => {
              const colors = colorMap[timeline.color];
              return (
                <div key={idx} className={`p-4 rounded-xl ${colors.bg} ${colors.border} border`}>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-white">{timeline.funding}</h4>
                    <Badge variant="outline" className={`text-[10px] ${timeline.priority === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/30' : colors.badge}`}>
                      {timeline.priority === 'high' ? 'Urgent' : 'Normal'}
                    </Badge>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Deadline:</span>
                      <span className="text-white">{timeline.deadline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Processing:</span>
                      <span className="text-white">{timeline.processingTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Start:</span>
                      <span className={colors.icon}>{timeline.startDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Document Checklist */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-green-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
              <FileText className="h-5 w-5 text-green-400" />
            </div>
            Required Documents Checklist
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentChecklist.map((category, idx) => {
              const colors = colorMap[category.color];
              return (
                <div key={idx} className={`p-4 rounded-xl ${colors.bg} ${colors.border} border`}>
                  <h4 className={`font-semibold ${colors.icon} mb-3`}>{category.category}</h4>
                  <div className="space-y-2">
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/70">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Guides */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-purple-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
              <Users className="h-5 w-5 text-purple-400" />
            </div>
            Detailed Application Processes
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <Tabs defaultValue="student-finance" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10 mb-4">
              <TabsTrigger value="student-finance" className="text-xs sm:text-sm data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">Student Finance</TabsTrigger>
              <TabsTrigger value="employer-funding" className="text-xs sm:text-sm data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">Employer</TabsTrigger>
              <TabsTrigger value="professional-grants" className="text-xs sm:text-sm data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">Grants</TabsTrigger>
            </TabsList>

            {Object.entries(stepByStepGuides).map(([key, steps]) => (
              <TabsContent key={key} value={key} className="space-y-3 animate-fade-in">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold mb-1 text-white">{step.title}</h4>
                      <p className="text-sm text-white/70 mb-2">{step.description}</p>
                      <Badge variant="outline" className="text-[10px] bg-white/5 text-white/60 border-white/20">
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
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Sparkles className="h-5 w-5 text-elec-yellow" />
            </div>
            Application Success Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <h4 className="font-semibold mb-3 text-green-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Do's
              </h4>
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
                    <span className="text-white/70">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <h4 className="font-semibold mb-3 text-red-400 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Don'ts
              </h4>
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
                    <span className="text-white/70">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Alert */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Lightbulb className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="font-medium text-blue-400 mb-1">Need Help?</p>
            <p className="text-sm text-white/70">
              Most colleges and training providers offer free advice sessions to help with funding applications.
              Don't hesitate to contact them directly or use the National Careers Service for additional guidance.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button className="h-11 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 touch-manipulation active:scale-95 transition-all">
          <Download className="h-4 w-4 mr-2" />
          Download Application Checklist PDF
        </Button>
      </div>
    </div>
  );
};

export default ApplicationGuides;
