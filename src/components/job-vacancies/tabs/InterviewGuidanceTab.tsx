
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent,
} from "@/components/ui/mobile-accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  Lightbulb,
  Target,
  Star,
  AlertCircle,
  Play
} from "lucide-react";

const InterviewGuidanceTab = () => {
  // Define category colors for different interview guidance areas
  const categoryColors = {
    preparation: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-400",
      badge: "bg-blue-500/20 text-blue-400 border-blue-500/30"
    },
    technical: {
      bg: "bg-elec-yellow/10",
      border: "border-elec-yellow/20",
      text: "text-elec-yellow",
      badge: "bg-elec-yellow/20 text-elec-dark border-elec-yellow/30"
    },
    process: {
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      text: "text-green-400",
      badge: "bg-green-500/20 text-green-400 border-green-500/30"
    },
    questions: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      text: "text-purple-400",
      badge: "bg-purple-500/20 text-purple-400 border-purple-500/30"
    },
    tips: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      text: "text-amber-400",
      badge: "bg-amber-500/20 text-amber-400 border-amber-500/30"
    }
  };

  const interviewGuides = [
    {
      title: "Interview Preparation",
      icon: Target,
      category: "preparation",
      difficulty: "Essential",
      steps: [
        "Research the company's recent electrical projects and values",
        "Review BS 7671 18th Edition key changes and updates",
        "Prepare 3-4 STAR method examples from your experience",
        "Plan your route and prepare all necessary documents",
        "Practice common technical and behavioural questions"
      ],
      keyPoints: [
        "Company research shows genuine interest and preparation",
        "Technical knowledge review demonstrates competency",
        "STAR method examples provide structured responses",
        "Professional presentation creates positive first impressions",
        "Preparation reduces anxiety and increases confidence"
      ]
    },
    {
      title: "Technical Interview Skills",
      icon: Lightbulb,
      category: "technical",
      difficulty: "Advanced",
      steps: [
        "Review electrical fundamentals and current regulations",
        "Prepare explanations for different earthing systems",
        "Practice calculations for fault currents and cable sizing",
        "Study RCD testing procedures and trip times",
        "Understand permit to work and isolation procedures"
      ],
      keyPoints: [
        "Be ready to explain TN-S vs TT earthing systems clearly",
        "Know minimum IR test values for different circuits",
        "Understand equipotential bonding requirements",
        "Demonstrate knowledge of current safety regulations",
        "Show awareness of industry best practices"
      ]
    },
    {
      title: "Interview Process Types",
      icon: Clock,
      category: "process",
      difficulty: "Intermediate",
      steps: [
        "Understand phone/video screening format (30-45 mins)",
        "Prepare for technical interviews (60-90 mins)",
        "Ready yourself for on-site visits (2-4 hours)",
        "Know what to expect from practical assessments",
        "Understand multiple-stage interview processes"
      ],
      keyPoints: [
        "Phone interviews focus on basic screening and availability",
        "Technical interviews test in-depth knowledge and problem-solving",
        "On-site visits assess practical skills and cultural fit",
        "Practical assessments may include hands-on electrical work",
        "Each stage has different focus areas and expectations"
      ]
    },
    {
      title: "Common Interview Questions",
      icon: MessageCircle,
      category: "questions",
      difficulty: "Essential",
      steps: [
        "Prepare answers for technical regulation questions",
        "Practice responses to safety and procedure enquiries",
        "Develop examples for behavioural questions",
        "Ready explanations of your electrical experience",
        "Prepare thoughtful questions to ask the interviewer"
      ],
      keyPoints: [
        "Technical questions test your electrical knowledge depth",
        "Safety questions assess your risk awareness",
        "Behavioural questions explore your work approach",
        "Experience questions validate your practical skills",
        "Your questions show genuine interest in the role"
      ]
    },
    {
      title: "Interview Success Tips",
      icon: Star,
      category: "tips",
      difficulty: "Essential",
      steps: [
        "Arrive 10-15 minutes early with all documents",
        "Dress professionally appropriate to the workplace",
        "Bring safety boots if visiting active construction sites",
        "Maintain eye contact and speak clearly throughout",
        "Show enthusiasm for learning and development"
      ],
      keyPoints: [
        "Punctuality demonstrates reliability and professionalism",
        "Appropriate dress shows respect for the opportunity",
        "Safety awareness is crucial in electrical work environments",
        "Good communication skills are essential for team work",
        "Willingness to learn indicates long-term potential"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interview Guidance for Electricians</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Comprehensive guidance to help you prepare for electrical job interviews. 
            From technical questions to professional presentation, we'll help you showcase your skills effectively.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Target className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Preparation</div>
              <div className="text-xs text-muted-foreground">Strategic planning</div>
            </div>
            <div className="text-center">
              <Lightbulb className="h-6 w-6 text-elec-yellow mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Technical</div>
              <div className="text-xs text-muted-foreground">Knowledge review</div>
            </div>
            <div className="text-center">
              <MessageCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Communication</div>
              <div className="text-xs text-muted-foreground">Professional skills</div>
            </div>
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Success</div>
              <div className="text-xs text-muted-foreground">Land the job</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Interview Guidance Steps</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <MobileAccordion type="single" collapsible className="space-y-0">
            {interviewGuides.map((guide, index) => {
              const colors = categoryColors[guide.category as keyof typeof categoryColors];
              const Icon = guide.icon;
              
              return (
                <MobileAccordionItem key={index} value={guide.title.toLowerCase().replace(/\s+/g, '-')}>
                  <MobileAccordionTrigger
                    icon={<Icon className={`h-6 w-6 ${colors.text}`} />}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-medium text-center">{guide.title}</span>
                      <Badge className={`text-xs ${colors.badge}`}>
                        {guide.difficulty}
                      </Badge>
                    </div>
                  </MobileAccordionTrigger>
                  <MobileAccordionContent className={`${colors.bg} ${colors.border} border-x border-b rounded-b-lg`}>
                    <div className="p-6 space-y-6">
                      <div>
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          Implementation Steps
                        </h4>
                        <ol className="space-y-3">
                          {guide.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start gap-3">
                              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${colors.badge} text-sm font-medium flex-shrink-0 mt-0.5`}>
                                {stepIndex + 1}
                              </span>
                              <span className="text-muted-foreground leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <Star className="h-5 w-5 text-amber-400" />
                          Key Points
                        </h4>
                        <ul className="space-y-2">
                          {guide.keyPoints.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${colors.bg} ${colors.border} border mt-2 flex-shrink-0`} />
                              <span className="text-muted-foreground text-sm leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </MobileAccordionContent>
                </MobileAccordionItem>
              );
            })}
          </MobileAccordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewGuidanceTab;
