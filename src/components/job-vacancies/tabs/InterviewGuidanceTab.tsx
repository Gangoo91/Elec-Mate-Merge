
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
  // Define icon colors to maintain visual distinction without background colors
  const iconColors = {
    preparation: "text-blue-400",
    technical: "text-elec-yellow",
    process: "text-green-400",
    questions: "text-purple-400",
    tips: "text-amber-400"
  };

  const difficultyColors = {
    Essential: "border-green-500/30 text-green-400 bg-green-500/10",
    Intermediate: "border-yellow-500/30 text-yellow-400 bg-yellow-500/10",
    Advanced: "border-red-500/30 text-red-400 bg-red-500/10"
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
        <CardContent className="px-4">
          <MobileAccordion type="single" collapsible className="space-y-2">
            {interviewGuides.map((guide, index) => {
              const Icon = guide.icon;
              const iconColor = iconColors[guide.category as keyof typeof iconColors];
              
              return (
                <MobileAccordionItem key={index} value={`guide-${index}`}>
                  <MobileAccordionTrigger 
                    icon={
                      <div className="flex justify-center">
                        <Icon className={`h-6 w-6 ${iconColor}`} />
                      </div>
                    }
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-sm">{guide.title}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs mt-1 ${difficultyColors[guide.difficulty as keyof typeof difficultyColors]}`}
                      >
                        {guide.difficulty}
                      </Badge>
                    </div>
                  </MobileAccordionTrigger>
                  <MobileAccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-primary mb-2 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          Implementation Steps:
                        </h4>
                        <ol className="space-y-1">
                          {guide.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                {stepIndex + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                      
                      <div className="border-t border-border pt-3">
                        <h4 className="font-semibold text-sm text-primary mb-2">Key Points to Remember:</h4>
                        <ul className="space-y-1">
                          {guide.keyPoints.map((point, pointIndex) => (
                            <li key={pointIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {point}
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
