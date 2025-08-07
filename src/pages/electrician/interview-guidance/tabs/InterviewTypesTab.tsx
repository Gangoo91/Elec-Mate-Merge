import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { AccordionItem } from "@/components/ui/accordion";
import { 
  Users, 
  Video, 
  Phone, 
  Wrench, 
  Building, 
  Clock,
  AlertCircle,
  CheckCircle,
  Target,
  Camera
} from "lucide-react";

export default function InterviewTypesTab() {
  const interviewTypes = [
    {
      id: "phone-screening",
      title: "Phone/Video Screening",
      icon: <Phone className="h-5 w-5" />,
      duration: "20-30 minutes",
      description: "Initial screening to assess basic qualifications and interest",
      preparation: [
        "Test technology beforehand (video calls)",
        "Prepare elevator pitch about your experience",
        "Have CV and job description handy",
        "Choose quiet location with good connection",
        "Prepare 2-3 key questions about the role"
      ],
      whatToExpect: [
        "Basic qualification verification",
        "Availability and location preferences",
        "Salary expectations discussion",
        "Overview of role and company",
        "Next steps explanation"
      ]
    },
    {
      id: "face-to-face",
      title: "Face-to-Face Interview",
      icon: <Users className="h-5 w-5" />,
      duration: "45-90 minutes",
      description: "Traditional in-person interview focusing on technical and behavioural assessment",
      preparation: [
        "Plan route and arrive 10-15 minutes early",
        "Dress professionally but appropriately for site visit",
        "Bring physical portfolio and certificates",
        "Prepare detailed project examples",
        "Research company culture and values"
      ],
      whatToExpected: [
        "Detailed technical questioning",
        "Behavioural interview questions",
        "Company and role deep-dive",
        "Meet potential colleagues/managers",
        "Office or site tour possibility"
      ]
    },
    {
      id: "practical-assessment",
      title: "Practical Assessment",
      icon: <Wrench className="h-5 w-5" />,
      duration: "1-3 hours",
      description: "Hands-on technical evaluation of electrical skills and safety practices",
      preparation: [
        "Bring own basic tools if specified",
        "Wear appropriate PPE and work clothing",
        "Review basic electrical principles",
        "Practice explaining work processes",
        "Ensure safety-first mindset"
      ],
      whatToExpect: [
        "Safe isolation procedures demonstration",
        "Basic electrical installation tasks",
        "Fault finding exercises",
        "Use of test equipment",
        "Safety procedure adherence assessment"
      ]
    },
    {
      id: "panel-interview",
      title: "Panel Interview",
      icon: <Building className="h-5 w-5" />,
      duration: "60-90 minutes",
      description: "Interview with multiple stakeholders from different departments",
      preparation: [
        "Research all panel members if names provided",
        "Prepare answers for different perspectives",
        "Practice maintaining eye contact with all members",
        "Prepare questions for different roles",
        "Plan to address technical and soft skills"
      ],
      whatToExpect: [
        "Questions from various departments",
        "Multiple perspectives on same topics",
        "Assessment of team fit",
        "Cross-functional collaboration discussion",
        "Varied questioning styles"
      ]
    }
  ];

  const formatTips = [
    {
      format: "Virtual Interviews",
      icon: <Video className="h-4 w-4" />,
      tips: [
        "Test technology 30 minutes before",
        "Ensure good lighting on your face",
        "Professional background or blur",
        "Have water nearby but out of shot",
        "Maintain eye contact with camera"
      ]
    },
    {
      format: "Site Visits",
      icon: <Building className="h-4 w-4" />,
      tips: [
        "Wear safety boots and appropriate clothing",
        "Bring hard hat if you have one",
        "Ask about site-specific safety requirements",
        "Show interest in ongoing projects",
        "Demonstrate safety awareness throughout"
      ]
    },
    {
      format: "Group Assessments",
      icon: <Users className="h-4 w-4" />,
      tips: [
        "Collaborate rather than compete",
        "Listen actively to other candidates",
        "Share knowledge and experience",
        "Take leadership when appropriate",
        "Show respect for others' ideas"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-4">
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">4 Main Types</div>
            <div className="text-sm text-muted-foreground">Interview formats</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">90% Success</div>
            <div className="text-sm text-muted-foreground">With proper prep</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">Adaptable</div>
            <div className="text-sm text-muted-foreground">Strategy per type</div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insight Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Industry Insight:</strong> 65% of UK electrical employers now use practical assessments. 
          Always be prepared to demonstrate both technical skills and safety knowledge.
        </AlertDescription>
      </Alert>

      {/* Interview Types Detail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Interview Types & Preparation Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileAccordion type="single" collapsible defaultValue="phone-screening">
            {interviewTypes.map((type) => (
              <AccordionItem key={type.id} value={type.id}>
                <MobileAccordionTrigger icon={type.icon}>
                  <div className="flex items-center justify-between w-full mr-4">
                    <span>{type.title}</span>
                    <Badge variant="outline">{type.duration}</Badge>
                  </div>
                </MobileAccordionTrigger>
                <MobileAccordionContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Preparation Steps</h4>
                        <ul className="space-y-1">
                          {type.preparation.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">What to Expect</h4>
                        <ul className="space-y-1">
                          {type.whatToExpect.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </MobileAccordionContent>
              </AccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      {/* Format-Specific Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Format-Specific Success Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {formatTips.map((format, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  {format.icon}
                  {format.format}
                </h4>
                <ul className="space-y-2">
                  {format.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Criteria */}
      <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Target className="h-5 w-5" />
            What Employers Assess Across All Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Technical Skills</h4>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">Electrical Knowledge</Badge>
                <Badge variant="outline" className="text-xs">Safety Practices</Badge>
                <Badge variant="outline" className="text-xs">Problem Solving</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Soft Skills</h4>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">Communication</Badge>
                <Badge variant="outline" className="text-xs">Teamwork</Badge>
                <Badge variant="outline" className="text-xs">Adaptability</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Experience</h4>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">Relevant Projects</Badge>
                <Badge variant="outline" className="text-xs">Industry Knowledge</Badge>
                <Badge variant="outline" className="text-xs">Continuous Learning</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Cultural Fit</h4>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">Company Values</Badge>
                <Badge variant="outline" className="text-xs">Work Ethic</Badge>
                <Badge variant="outline" className="text-xs">Professional Attitude</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}