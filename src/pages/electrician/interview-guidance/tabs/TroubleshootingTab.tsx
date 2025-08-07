import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { AccordionItem } from "@/components/ui/accordion";
import { 
  AlertTriangle, 
  Brain, 
  Clock, 
  MessageCircle, 
  RefreshCw,
  Shield,
  Users,
  CheckCircle,
  Star,
  Target,
  Lightbulb,
  Phone
} from "lucide-react";

export default function TroubleshootingTab() {
  const commonChallenges = [
    {
      id: "nerves",
      title: "Interview Nerves & Anxiety",
      icon: <Brain className="h-5 w-5" />,
      symptoms: [
        "Forgetting technical knowledge you know well",
        "Speaking too quickly or stumbling over words",
        "Physical symptoms (sweating, shaking, racing heart)",
        "Mind going blank during questions",
        "Overthinking and second-guessing answers"
      ],
      solutions: [
        "Practice relaxation techniques before the interview",
        "Arrive early and take time to compose yourself",
        "Prepare key talking points on note cards",
        "Practice mock interviews until responses become natural",
        "Reframe nerves as excitement and positive energy"
      ],
      preventionTips: [
        "Thorough preparation builds confidence",
        "Visualise successful interview scenarios",
        "Get proper sleep and eat well before the interview",
        "Exercise or do breathing exercises to manage stress"
      ]
    },
    {
      id: "technical-gaps",
      title: "Technical Knowledge Gaps",
      icon: <AlertTriangle className="h-5 w-5" />,
      symptoms: [
        "Unable to answer specific technical questions",
        "Outdated knowledge of current regulations",
        "Lack of experience with newer technologies",
        "Difficulty explaining complex concepts simply",
        "Uncertainty about current market practices"
      ],
      solutions: [
        "Admit knowledge gaps honestly and show willingness to learn",
        "Explain your approach to finding solutions",
        "Highlight related experience and transferable skills",
        "Ask clarifying questions to better understand the requirement",
        "Discuss your commitment to continuous professional development"
      ],
      preventionTips: [
        "Stay current with 18th Edition updates and amendments",
        "Read industry publications and attend training courses",
        "Join professional forums and discussion groups",
        "Practice explaining technical concepts to non-electricians"
      ]
    },
    {
      id: "difficult-questions",
      title: "Difficult or Unexpected Questions",
      icon: <MessageCircle className="h-5 w-5" />,
      symptoms: [
        "Questions outside your experience range",
        "Hypothetical scenarios you haven't encountered",
        "Personal questions that feel inappropriate",
        "Questions about salary expectations too early",
        "Aggressive or confrontational questioning style"
      ],
      solutions: [
        "Take a moment to think before responding",
        "Ask for clarification if the question is unclear",
        "Break complex questions into smaller parts",
        "Use frameworks like STAR method for behavioural questions",
        "Redirect inappropriate questions professionally"
      ],
      preventionTips: [
        "Prepare for common difficult questions in advance",
        "Practice thinking out loud through complex problems",
        "Research the company culture to anticipate question styles",
        "Prepare responses for salary and personal questions"
      ]
    },
    {
      id: "poor-first-impression",
      title: "Poor First Impression",
      icon: <Users className="h-5 w-5" />,
      symptoms: [
        "Arriving late or appearing flustered",
        "Inappropriate dress or unprofessional appearance",
        "Weak handshake or poor eye contact",
        "Negative comments about previous employers",
        "Appearing disinterested or unprepared"
      ],
      solutions: [
        "Acknowledge any initial mistakes and reset professionally",
        "Focus on demonstrating competence and enthusiasm",
        "Use confident body language throughout the interview",
        "Show genuine interest in the role and company",
        "End strongly with thoughtful questions and clear next steps"
      ],
      preventionTips: [
        "Plan your route and arrive 10-15 minutes early",
        "Prepare professional attire the night before",
        "Practice confident introductions and handshakes",
        "Research the company thoroughly to show genuine interest"
      ]
    }
  ];

  const recoveryStrategies = [
    {
      situation: "Made a Technical Error",
      recovery: "Acknowledge the mistake immediately, provide the correct information if you know it, and explain how you would find the right answer in practice.",
      example: "Actually, I need to correct that. The maximum Zs for a 32A Type B MCB is 1.44Ω, not 1.37Ω. In practice, I always refer to the current BS 7671 tables to verify these values."
    },
    {
      situation: "Couldn't Answer a Question",
      recovery: "Admit you don't know, explain your approach to finding the answer, and show willingness to learn.",
      example: "I haven't worked with that specific system before, but I would research the manufacturer's guidelines, consult with colleagues, and ensure I received proper training before attempting any work."
    },
    {
      situation: "Interview Running Over Time",
      recovery: "Acknowledge the time constraint and offer to prioritise the most important topics or continue the discussion later.",
      example: "I notice we're running short on time. Would you like me to focus on any particular areas, or would it be helpful to schedule a follow-up conversation?"
    },
    {
      situation: "Difficult Interviewer",
      recovery: "Stay professional, focus on your qualifications, and don't take challenging questions personally.",
      example: "I understand you want to ensure I can handle challenging situations. Let me give you a specific example of how I've dealt with [similar situation] in the past."
    }
  ];

  const redFlags = [
    {
      redFlag: "Company seems unprofessional or disorganised",
      assessment: "Multiple reschedulings, unprepared interviewers, poor communication",
      action: "Consider if this reflects their work culture and whether you'd be comfortable working there"
    },
    {
      redFlag: "Vague job description or responsibilities",
      assessment: "Can't clearly explain what you'd be doing day-to-day",
      action: "Ask specific questions about typical projects, team structure, and expectations"
    },
    {
      redFlag: "Pressure to accept immediately",
      assessment: "Won't allow time to consider the offer properly",
      action: "Professional employers understand you need time to make important career decisions"
    },
    {
      redFlag: "Inappropriate questions or behaviour",
      assessment: "Questions about personal life, discriminatory comments, unprofessional conduct",
      action: "Consider reporting serious issues and whether this is a company you want to work for"
    }
  ];

  const confidenceBuilders = [
    "Remember that they invited you to interview - they're already interested",
    "You have valuable skills and experience that they need",
    "Every interview is practice for the next opportunity",
    "Most interviewers want you to succeed and are rooting for you",
    "Focus on what you can offer rather than what you lack",
    "One interview doesn't define your worth or career prospects"
  ];

  return (
    <div className="space-y-6">
      {/* Key Insights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-4">
            <RefreshCw className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">Recovery</div>
            <div className="text-sm text-muted-foreground">Always possible</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <Brain className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">Mindset</div>
            <div className="text-sm text-muted-foreground">Makes difference</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">Practice</div>
            <div className="text-sm text-muted-foreground">Prevents issues</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">Professional</div>
            <div className="text-sm text-muted-foreground">Always maintain</div>
          </CardContent>
        </Card>
      </div>

      {/* Key Mindset Alert */}
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          <strong>Remember:</strong> Everyone makes mistakes in interviews. What matters is how you handle them. 
          Recovery and professionalism often impress more than perfect answers.
        </AlertDescription>
      </Alert>

      {/* Common Interview Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Common Interview Challenges & Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileAccordion type="single" collapsible defaultValue="nerves">
            {commonChallenges.map((challenge) => (
              <AccordionItem key={challenge.id} value={challenge.id}>
                <MobileAccordionTrigger icon={challenge.icon}>
                  {challenge.title}
                </MobileAccordionTrigger>
                <MobileAccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-sm mb-2 text-orange-600 dark:text-orange-400">
                        Symptoms & Warning Signs
                      </h5>
                      <ul className="space-y-1">
                        {challenge.symptoms.map((symptom, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-sm mb-2 text-green-600 dark:text-green-400">
                        In-the-Moment Solutions
                      </h5>
                      <ul className="space-y-1">
                        {challenge.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-sm mb-2 text-blue-600 dark:text-blue-400">
                        Prevention Tips
                      </h5>
                      <ul className="space-y-1">
                        {challenge.preventionTips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </MobileAccordionContent>
              </AccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      {/* Recovery Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            Recovery Strategies for Specific Situations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recoveryStrategies.map((strategy, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <h4 className="font-medium text-primary">{strategy.situation}</h4>
                <p className="text-sm">{strategy.recovery}</p>
                <div className="bg-muted/50 p-3 rounded border-l-4 border-green-500">
                  <p className="text-sm"><strong>Example response:</strong></p>
                  <p className="text-sm italic mt-1">"{strategy.example}"</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Red Flags to Watch For */}
      <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
            <AlertTriangle className="h-5 w-5" />
            Red Flags: When the Company Isn't Right for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {redFlags.map((flag, index) => (
              <div key={index} className="border border-red-200 rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-red-700 dark:text-red-300">{flag.redFlag}</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Assessment:</strong> {flag.assessment}
                </p>
                <p className="text-sm">
                  <strong>Action:</strong> {flag.action}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Confidence Building */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <Star className="h-5 w-5" />
            Confidence Building Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {confidenceBuilders.map((reminder, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border border-green-200 rounded-lg">
                <Star className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{reminder}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Emergency Strategies: When Everything Goes Wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">If You're Running Very Late</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Phone className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                  Call immediately to explain and ask if rescheduling is possible
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                  Be honest about the reason and apologise sincerely
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                  Give realistic arrival time, not optimistic estimate
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">If You Realise You're Unprepared</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Brain className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                  Focus on your genuine enthusiasm and willingness to learn
                </li>
                <li className="flex items-start gap-2">
                  <Users className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                  Ask thoughtful questions to show engagement
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                  Be honest about gaps and demonstrate problem-solving approach
                </li>
              </ul>
            </div>
          </div>
          
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Final Reminder:</strong> Even if an interview doesn't go perfectly, treat it as valuable experience. 
              Every interview makes you better prepared for the next opportunity.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}