
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent,
} from "@/components/ui/mobile-accordion";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  Lightbulb,
  Target,
  Star
} from "lucide-react";

const InterviewGuidanceTab = () => {
  const categoryColors = {
    preparation: "indigo",
    technical: "purple", 
    process: "blue",
    questions: "cyan",
    tips: "teal"
  };

  const difficultyColors = {
    Essential: "green",
    Intermediate: "yellow",
    Advanced: "red"
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
    <Card className="border-indigo-500/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <MessageCircle className="h-6 w-6 text-indigo-500" />
          <CardTitle>Interview Guidance</CardTitle>
        </div>
        <p className="text-muted-foreground">Professional step-by-step guides for electrical job interviews</p>
      </CardHeader>
      <CardContent>
        <MobileAccordion type="single" collapsible className="w-full">
          {interviewGuides.map((guide, index) => {
            const Icon = guide.icon;
            const categoryColor = categoryColors[guide.category as keyof typeof categoryColors];
            const difficultyColor = difficultyColors[guide.difficulty as keyof typeof difficultyColors];
            
            return (
              <MobileAccordionItem key={index} value={`guide-${index}`} className="border border-border rounded-lg mb-3">
                <MobileAccordionTrigger className="px-4 py-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 rounded-lg bg-${categoryColor}-500/10`}>
                      <Icon className={`h-5 w-5 text-${categoryColor}-500`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-sm">{guide.title}</div>
                      <div className="flex gap-2 mt-1">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs bg-${categoryColor}-500/10 text-${categoryColor}-700 dark:text-${categoryColor}-300`}
                        >
                          {guide.category}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs bg-${difficultyColor}-500/10 text-${difficultyColor}-700 dark:text-${difficultyColor}-300 border-${difficultyColor}-500/20`}
                        >
                          {guide.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </MobileAccordionTrigger>
                <MobileAccordionContent className="px-4 pb-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Implementation Steps
                      </h4>
                      <ol className="space-y-3">
                        {guide.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-3 text-sm">
                            <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                              {stepIndex + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-sm mb-3">Key Points</h4>
                      <ul className="space-y-2">
                        {guide.keyPoints.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-2 text-sm">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{point}</span>
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
  );
};

export default InterviewGuidanceTab;
