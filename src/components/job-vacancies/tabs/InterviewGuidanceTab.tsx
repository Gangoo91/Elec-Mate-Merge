
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent,
} from "@/components/ui/mobile-accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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

  const categoryStyle: Record<string, { iconBg: string; icon: string; badgeBg: string; badgeText: string }> = {
    indigo: { iconBg: "bg-indigo-500/10", icon: "text-indigo-400", badgeBg: "bg-indigo-500/10", badgeText: "text-indigo-300" },
    purple: { iconBg: "bg-purple-500/10", icon: "text-purple-400", badgeBg: "bg-purple-500/10", badgeText: "text-purple-300" },
    blue: { iconBg: "bg-blue-500/10", icon: "text-blue-400", badgeBg: "bg-blue-500/10", badgeText: "text-blue-300" },
    cyan: { iconBg: "bg-cyan-500/10", icon: "text-cyan-400", badgeBg: "bg-cyan-500/10", badgeText: "text-cyan-300" },
    teal: { iconBg: "bg-teal-500/10", icon: "text-teal-400", badgeBg: "bg-teal-500/10", badgeText: "text-teal-300" },
  };

  const difficultyColors = {
    Essential: "green",
    Intermediate: "yellow",
    Advanced: "red"
  };

  const difficultyStyle: Record<string, { bg: string; text: string; border: string }> = {
    green: { bg: "bg-green-500/10", text: "text-green-300", border: "border-green-500/20" },
    yellow: { bg: "bg-yellow-500/10", text: "text-yellow-300", border: "border-yellow-500/20" },
    red: { bg: "bg-red-500/10", text: "text-red-300", border: "border-red-500/20" },
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
    <Card className="bg-elec-dark border-none shadow-none">
      <CardHeader className="text-center space-y-2 pt-2 max-w-[680px] mx-auto">
        <div className="mx-auto w-10 h-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center">
          <MessageCircle className="h-5 w-5 text-elec-yellow" />
        </div>
        <CardTitle className="text-xl">Interview Guidance</CardTitle>
        <p className="text-muted-foreground max-w-prose mx-auto">Professional step-by-step guides for electrical job interviews</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Metric tiles like Business Development */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: 'Preparation Success', sub: 'Candidates ready in 3–5 days', icon: <CheckCircle className="h-4 w-4 text-green-400" /> },
            { title: 'Time to Offer', sub: '7–14 days typical', icon: <Clock className="h-4 w-4 text-elec-yellow" /> },
            { title: 'Technical Pass Rate', sub: '↑ with focused revision', icon: <Lightbulb className="h-4 w-4 text-blue-400" /> },
            { title: 'Interview ROI', sub: 'Higher offer & salary outcomes', icon: <Target className="h-4 w-4 text-purple-400" /> },
          ].map((m, i) => (
            <Card key={i} className="border-elec-yellow/20 bg-elec-gray p-2.5">
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center">{m.icon}</div>
                <div className="text-xs font-medium text-elec-light">{m.title}</div>
                <div className="text-[11px] text-muted-foreground">{m.sub}</div>
              </div>
            </Card>
          ))}
        </div>

        <MobileAccordion type="single" collapsible className="w-full">
          {interviewGuides.map((guide, index) => {
            const Icon = guide.icon;
            const categoryColor = categoryColors[guide.category as keyof typeof categoryColors];
            const difficultyColor = difficultyColors[guide.difficulty as keyof typeof difficultyColors];
            const cat = categoryStyle[categoryColor] || categoryStyle.indigo;
            const diff = difficultyStyle[difficultyColor] || difficultyStyle.green;
            
            return (
              <MobileAccordionItem key={index} value={`guide-${index}`} className="rounded-lg mb-3">
                <MobileAccordionTrigger
                  className="px-4 py-2 bg-transparent border-0"
                  icon={
                    <div className={cn("p-2 rounded-lg", cat.iconBg)}>
                      <Icon className={cn("h-5 w-5", cat.icon)} />
                    </div>
                  }
                >
                  <div className="text-sm sm:text-base font-semibold text-elec-light">{guide.title}</div>
                </MobileAccordionTrigger>
                <MobileAccordionContent className="px-4 pb-4">
                  <div className="rounded-lg border border-elec-yellow/20 bg-elec-card/60 p-3 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Implementation Steps
                      </h4>
                      <ol className="space-y-2">
                        {guide.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-3 text-sm">
                            <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                              {stepIndex + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="border-t pt-3">
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

                    <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-2.5">
                      <div className="text-sm font-medium text-green-300 mb-1">Impact</div>
                      <p className="text-xs text-muted-foreground">
                        Following this guidance typically improves interview performance and offer rates while demonstrating BS 7671 awareness.
                      </p>
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
