
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
    preparation: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    technical: "bg-purple-500/10 text-purple-400 border-purple-500/20", 
    process: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    questions: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    tips: "bg-teal-500/10 text-teal-400 border-teal-500/20"
  };

  const difficultyColors = {
    Essential: "bg-green-500/10 text-green-400 border-green-500/20",
    Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Advanced: "bg-red-500/10 text-red-400 border-red-500/20"
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
    <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <MessageCircle className="h-6 w-6 text-indigo-500" />
          </div>
          <div>
            <CardTitle className="text-indigo-900 dark:text-indigo-100">Interview Guidance</CardTitle>
            <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
              Professional guidance for electrical job interviews
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6">
        <MobileAccordion type="single" collapsible className="space-y-3">
          {interviewGuides.map((guide, index) => {
            const Icon = guide.icon;
            const categoryColor = categoryColors[guide.category as keyof typeof categoryColors];
            const difficultyColor = difficultyColors[guide.difficulty as keyof typeof difficultyColors];
            
            return (
              <MobileAccordionItem key={index} value={`guide-${index}`}>
                <MobileAccordionTrigger 
                  icon={
                    <div className="flex justify-center">
                      <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  }
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-sm text-indigo-900 dark:text-indigo-100">{guide.title}</span>
                      <div className="flex gap-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={`text-xs px-2 py-0.5 ${categoryColor}`}
                        >
                          {guide.category}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs px-2 py-0.5 ${difficultyColor}`}
                        >
                          {guide.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </MobileAccordionTrigger>
                <MobileAccordionContent>
                  <div className="space-y-4 pt-2">
                    <div>
                      <h4 className="font-semibold text-sm text-indigo-900 dark:text-indigo-100 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-indigo-500" />
                        Implementation Steps:
                      </h4>
                      <ol className="space-y-2">
                        {guide.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="text-sm text-indigo-700 dark:text-indigo-300 flex items-start gap-3">
                            <span className="bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {stepIndex + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="border-t border-indigo-200 dark:border-indigo-800 pt-3">
                      <h4 className="font-semibold text-sm text-indigo-900 dark:text-indigo-100 mb-2">Key Points to Remember:</h4>
                      <ul className="space-y-1">
                        {guide.keyPoints.map((point, pointIndex) => (
                          <li key={pointIndex} className="text-sm text-indigo-700 dark:text-indigo-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
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
  );
};

export default InterviewGuidanceTab;
