import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { AccordionItem } from "@/components/ui/accordion";
import { 
  MessageCircle, 
  Zap, 
  Shield, 
  Users, 
  Lightbulb,
  AlertCircle,
  Star,
  BookOpen,
  Briefcase
} from "lucide-react";

export default function CommonQuestionsTab() {
  const questionCategories = [
    {
      id: "technical",
      title: "Technical & Electrical Knowledge",
      icon: <Zap className="h-5 w-5" />,
      questions: [
        {
          question: "Explain the difference between TN-S and TN-C-S earthing systems.",
          answer: "TN-S has separate neutral and earth conductors throughout, while TN-C-S combines them in the supply but separates at the installation. TN-C-S is more common in UK installations but requires RCD protection.",
          tips: "Draw a simple diagram if possible to illustrate your answer."
        },
        {
          question: "What are the key changes in the 18th Edition of BS 7671?",
          answer: "Key changes include enhanced protection against arc faults, improved surge protection requirements, updated earthing arrangements, and new requirements for electric vehicle charging installations.",
          tips: "Mention specific amendment numbers if you know them."
        },
        {
          question: "How do you perform safe isolation?",
          answer: "Follow the 6-step process: 1) Identify circuit, 2) Secure isolation, 3) Test voltage indicator, 4) Test for dead, 5) Test voltage indicator again, 6) Fit warning labels.",
          tips: "Emphasise that this is non-negotiable for safety."
        },
        {
          question: "What's the maximum Zs value for a 32A Type B MCB?",
          answer: "1.44Ω for a 32A Type B MCB. This ensures disconnection within 0.4 seconds for final circuits, meeting the requirements of BS 7671.",
          tips: "Show you understand both the value and why it matters."
        }
      ]
    },
    {
      id: "safety",
      title: "Health & Safety",
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          question: "Describe your approach to risk assessment on an electrical installation.",
          answer: "I follow the HSE 5-step process: identify hazards, determine who might be harmed, evaluate risks, record findings, and review regularly. For electrical work, I consider voltage levels, environment, access, and other trades.",
          tips: "Give specific examples from your experience."
        },
        {
          question: "What PPE do you use for different electrical tasks?",
          answer: "Basic PPE includes safety boots, hard hat, and high-vis. For live work (emergency only), I use insulated gloves, face shield, and arc-rated clothing. I always assess the specific task requirements.",
          tips: "Emphasise that live work should be avoided except in emergencies."
        },
        {
          question: "How do you ensure safety when working at height?",
          answer: "I follow the hierarchy: avoid, prevent, arrest. Use proper access equipment, 3-point contact, and fall protection. I'm trained in ladder safety and use tower scaffolds where appropriate.",
          tips: "Mention relevant training certificates if you have them."
        }
      ]
    },
    {
      id: "behavioral",
      title: "Behavioural & Situational",
      icon: <Users className="h-5 w-5" />,
      questions: [
        {
          question: "Describe a challenging project you completed. How did you overcome difficulties?",
          answer: "Structure using STAR method: Situation, Task, Action, Result. Focus on problem-solving, communication, and successful outcomes.",
          tips: "Choose examples that demonstrate multiple skills and quantify results where possible."
        },
        {
          question: "How do you handle conflicts with colleagues or other trades?",
          answer: "I believe in open communication and finding solutions that work for everyone. I listen to understand concerns, explain my perspective clearly, and focus on the project's success.",
          tips: "Show emotional intelligence and collaborative approach."
        },
        {
          question: "Tell me about a time you made a mistake. How did you handle it?",
          answer: "Acknowledge the mistake immediately, assess safety implications, correct the issue, inform relevant parties, and learn from it. Safety and honesty are paramount.",
          tips: "Choose a minor mistake with good learning outcomes."
        },
        {
          question: "Where do you see yourself in 5 years?",
          answer: "I aim to advance my technical skills, potentially move into supervisory roles, and continue professional development through additional qualifications.",
          tips: "Align your goals with potential career progression in their company."
        }
      ]
    },
    {
      id: "company-specific",
      title: "Company & Role Specific",
      icon: <Briefcase className="h-5 w-5" />,
      questions: [
        {
          question: "Why do you want to work for our company?",
          answer: "Research-based answer highlighting their reputation, projects, values, or growth opportunities that align with your career goals.",
          tips: "Be specific about what attracted you to them versus competitors."
        },
        {
          question: "What interests you about this particular role?",
          answer: "Connect the role requirements to your skills and interests. Mention specific aspects like project types, team structure, or learning opportunities.",
          tips: "Show you've read and understood the job description thoroughly."
        },
        {
          question: "What questions do you have for us?",
          answer: "Prepare 3-5 thoughtful questions about training opportunities, typical projects, team structure, company culture, or growth plans.",
          tips: "Avoid questions about salary/benefits in the first interview."
        }
      ]
    }
  ];

  const answerFrameworks = [
    {
      name: "STAR Method",
      description: "For behavioural questions",
      framework: ["Situation", "Task", "Action", "Result"]
    },
    {
      name: "Problem-Solution",
      description: "For technical challenges",
      framework: ["Problem", "Analysis", "Solution", "Outcome"]
    },
    {
      name: "Past-Present-Future",
      description: "For career progression questions",
      framework: ["Experience", "Current Role", "Future Goals"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-4">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">50+</div>
            <div className="text-sm text-muted-foreground">Common questions</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">4 Categories</div>
            <div className="text-sm text-muted-foreground">Question types</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">3 Frameworks</div>
            <div className="text-sm text-muted-foreground">Answer structures</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <Lightbulb className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">Practice</div>
            <div className="text-sm text-muted-foreground">Key to success</div>
          </CardContent>
        </Card>
      </div>

      {/* Key Strategy Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Pro Tip:</strong> Practice your answers out loud. The most technically competent electricians can struggle if they can't communicate their knowledge clearly.
        </AlertDescription>
      </Alert>

      {/* Question Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Common Interview Questions by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileAccordion type="single" collapsible defaultValue="technical">
            {questionCategories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <MobileAccordionTrigger icon={category.icon}>
                  {category.title}
                </MobileAccordionTrigger>
                <MobileAccordionContent>
                  <div className="space-y-4">
                    {category.questions.map((item, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <h4 className="font-medium text-sm text-primary">
                          Q: {item.question}
                        </h4>
                        <div className="space-y-2">
                          <p className="text-sm"><strong>Answer:</strong> {item.answer}</p>
                          <p className="text-xs text-muted-foreground">
                            <strong>Tip:</strong> {item.tips}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </MobileAccordionContent>
              </AccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      {/* Answer Frameworks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Answer Frameworks & Structures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {answerFrameworks.map((framework, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div>
                  <h4 className="font-medium">{framework.name}</h4>
                  <p className="text-sm text-muted-foreground">{framework.description}</p>
                </div>
                <div className="space-y-1">
                  {framework.framework.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {stepIndex + 1}
                      </div>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Red Flags to Avoid */}
      <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
            <AlertCircle className="h-5 w-5" />
            Common Mistakes to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">What NOT to Say</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  "I don't know" without attempting to work through the problem
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  Criticising previous employers or colleagues
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  "That's not my job" or similar rigid attitudes
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  Making up technical knowledge you don't have
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">What TO Do Instead</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  "I'd need to research that, but my approach would be..."
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  Focus on learning opportunities and positive aspects
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  Show flexibility and willingness to learn
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  Be honest about knowledge gaps and show eagerness to learn
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practice Recommendations */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <Star className="h-5 w-5" />
            Practice Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Mock Interview Sessions</h4>
              <ul className="space-y-2 text-sm">
                <li>• Practice with a colleague or mentor</li>
                <li>• Record yourself answering questions</li>
                <li>• Time your responses (2-3 minutes max)</li>
                <li>• Practice technical explanations in simple terms</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Technical Preparation</h4>
              <ul className="space-y-2 text-sm">
                <li>• Review key BS 7671 tables and values</li>
                <li>• Practice fault-finding scenarios</li>
                <li>• Prepare project examples with details</li>
                <li>• Stay current with industry developments</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}