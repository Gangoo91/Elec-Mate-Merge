import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { AccordionItem } from "@/components/ui/accordion";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  Target, 
  Briefcase,
  MapPin,
  AlertCircle,
  Star,
  BookOpen,
  Settings
} from "lucide-react";

export default function InterviewPrepTab() {
  const preparationAreas = [
    {
      id: "research",
      title: "Company & Role Research",
      icon: <FileText className="h-5 w-5" />,
      items: [
        "Study company website, recent projects, and values",
        "Research interviewer backgrounds on LinkedIn",
        "Understand the specific role requirements and responsibilities",
        "Review company safety policies and procedures",
        "Check recent news or industry developments about the company"
      ]
    },
    {
      id: "technical",
      title: "Technical Preparation",
      icon: <Settings className="h-5 w-5" />,
      items: [
        "Review BS 7671 18th Edition key points and recent amendments",
        "Prepare examples of complex installations you've completed",
        "Refresh knowledge on current electrical regulations",
        "Practice explaining technical concepts in simple terms",
        "Prepare for practical demonstrations or technical tests"
      ]
    },
    {
      id: "documentation",
      title: "Documentation & Portfolio",
      icon: <Briefcase className="h-5 w-5" />,
      items: [
        "Update CV with recent qualifications and experience",
        "Prepare portfolio of completed projects with photos",
        "Organize certificates and qualifications in order",
        "Create a professional reference list with contact details",
        "Prepare copies of key certifications (ECS card, qualification certificates)"
      ]
    },
    {
      id: "logistics",
      title: "Logistics & Timing",
      icon: <Clock className="h-5 w-5" />,
      items: [
        "Plan route and travel time, arriving 10-15 minutes early",
        "Prepare professional attire appropriate for the role",
        "Charge phone and prepare any digital portfolios",
        "Research parking options or public transport",
        "Have backup plans for unexpected delays"
      ]
    }
  ];

  const keyMetrics = [
    { label: "Research Time", value: "2-3 Hours", icon: <BookOpen className="h-4 w-4" /> },
    { label: "Practice Sessions", value: "3-5", icon: <Target className="h-4 w-4" /> },
    { label: "Arrival Buffer", value: "15 Minutes", icon: <Clock className="h-4 w-4" /> },
    { label: "Success Rate", value: "85%+", icon: <Star className="h-4 w-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-4">
              <div className="flex justify-center mb-2">
                {metric.icon}
              </div>
              <div className="text-2xl font-bold text-primary">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert Box */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Success Tip:</strong> Preparation is 80% of interview success. Invest time in research and practice to stand out from other candidates.
        </AlertDescription>
      </Alert>

      {/* Preparation Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Essential Preparation Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileAccordion type="single" collapsible defaultValue="research">
            {preparationAreas.map((area) => (
              <AccordionItem key={area.id} value={area.id}>
                <MobileAccordionTrigger icon={area.icon}>
                  {area.title}
                </MobileAccordionTrigger>
                <MobileAccordionContent>
                  <div className="space-y-2">
                    {area.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </MobileAccordionContent>
              </AccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      {/* Day Before Checklist */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <CheckCircle className="h-5 w-5" />
            Day Before Interview Checklist
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Evening Preparation</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Lay out interview outfit
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Prepare documents folder
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Set multiple alarms
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Get early night's sleep
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Morning Preparation</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Eat proper breakfast
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Final document check
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Leave with time buffer
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Positive mindset
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Standards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Professional Standards for UK Electricians
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Technical Standards
              </h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">BS 7671 Compliant</Badge>
                <Badge variant="outline">18th Edition</Badge>
                <Badge variant="outline">Part P Qualified</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Safety Standards
              </h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">Risk Assessment</Badge>
                <Badge variant="outline">Safe Isolation</Badge>
                <Badge variant="outline">CDM Awareness</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Regional Knowledge
              </h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">Local Building Regs</Badge>
                <Badge variant="outline">DNO Requirements</Badge>
                <Badge variant="outline">Planning Laws</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}