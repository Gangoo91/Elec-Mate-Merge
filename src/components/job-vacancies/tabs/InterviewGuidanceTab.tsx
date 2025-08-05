
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  const preparationSteps = [
    {
      title: "Research the Company",
      description: "Understand their projects, values, and recent work",
      icon: <FileText className="h-5 w-5 text-blue-400" />,
      tips: [
        "Check their website and recent electrical projects",
        "Look up company values and safety policies",
        "Research the interviewer on LinkedIn if possible"
      ]
    },
    {
      title: "Technical Knowledge Review",
      description: "Refresh key electrical concepts and regulations",
      icon: <Lightbulb className="h-5 w-5 text-elec-yellow" />,
      tips: [
        "Review BS 7671 18th Edition key changes",
        "Prepare examples of installations you've worked on",
        "Be ready to discuss testing procedures and safety"
      ]
    },
    {
      title: "Prepare Your Examples",
      description: "Use STAR method for behavioural questions",
      icon: <Star className="h-5 w-5 text-purple-400" />,
      tips: [
        "Situation, Task, Action, Result format",
        "Prepare 3-4 strong examples from your experience",
        "Include problem-solving and teamwork examples"
      ]
    },
    {
      title: "Questions to Ask",
      description: "Show genuine interest in the role and company",
      icon: <MessageCircle className="h-5 w-5 text-green-400" />,
      tips: [
        "Ask about typical projects and team structure",
        "Enquire about training and development opportunities",
        "Discuss health and safety practices"
      ]
    }
  ];

  const commonQuestions = [
    {
      category: "Technical Questions",
      questions: [
        "What's the difference between TN-S and TT earthing systems?",
        "How would you test RCD trip times?",
        "Explain the purpose of equipotential bonding",
        "What are the minimum IR test values for different circuits?"
      ]
    },
    {
      category: "Safety & Regulations",
      questions: [
        "How do you ensure safe isolation before work?",
        "What PPE would you use for different electrical tasks?",
        "Describe the permit to work process",
        "How has BS 7671 18th Edition changed your work?"
      ]
    },
    {
      category: "Behavioural Questions",
      questions: [
        "Tell me about a challenging electrical problem you solved",
        "How do you handle working under pressure?",
        "Describe a time you had to work as part of a team",
        "How do you stay up to date with electrical regulations?"
      ]
    }
  ];

  const interviewTypes = [
    {
      type: "Phone/Video Interview",
      duration: "30-45 minutes",
      focus: "Initial screening, basic technical knowledge",
      tips: [
        "Test your technology beforehand",
        "Have your CV and examples ready",
        "Ensure good lighting and minimal background noise"
      ]
    },
    {
      type: "Technical Interview",
      duration: "60-90 minutes",
      focus: "In-depth technical questions, problem-solving",
      tips: [
        "Bring relevant certificates and qualifications",
        "Be prepared for scenario-based questions",
        "Don't be afraid to ask for clarification"
      ]
    },
    {
      type: "On-site Visit",
      duration: "2-4 hours",
      focus: "Practical assessment, team fit, workplace tour",
      tips: [
        "Arrive 10-15 minutes early",
        "Dress appropriately for the workplace",
        "Bring safety boots if visiting active sites"
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

      {/* Interview Guidance Accordion */}
      <Accordion type="single" collapsible className="space-y-4" defaultValue="preparation">
        {/* Preparation Steps */}
        <AccordionItem value="preparation" className="border-elec-yellow/20 bg-elec-gray rounded-md">
          <AccordionTrigger className="text-white hover:text-elec-yellow px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-blue-400" />
              <span className="font-medium">Interview Preparation Steps</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-4">
              {preparationSteps.map((step, index) => (
                <div key={index} className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">{step.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white mb-2">{step.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                      <ul className="space-y-2">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Interview Types */}
        <AccordionItem value="interview-types" className="border-elec-yellow/20 bg-elec-gray rounded-md">
          <AccordionTrigger className="text-white hover:text-elec-yellow px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-green-400" />
              <span className="font-medium">Types of Electrical Interviews</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-4">
              {interviewTypes.map((interview, index) => (
                <div key={index} className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-white">{interview.type}</h4>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {interview.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{interview.focus}</p>
                  <ul className="space-y-2">
                    {interview.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Common Questions */}
        <AccordionItem value="common-questions" className="border-elec-yellow/20 bg-elec-gray rounded-md">
          <AccordionTrigger className="text-white hover:text-elec-yellow px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-purple-400" />
              <span className="font-medium">Common Electrical Interview Questions</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {commonQuestions.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-medium text-white">{category.category}</h4>
                  <div className="space-y-3">
                    {category.questions.map((question, qIndex) => (
                      <div key={qIndex} className="p-3 bg-purple-500/10 rounded border border-purple-500/20">
                        <p className="text-sm text-muted-foreground">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Final Tips */}
        <AccordionItem value="final-tips" className="border-elec-yellow/20 bg-elec-gray rounded-md">
          <AccordionTrigger className="text-white hover:text-elec-yellow px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-amber-400" />
              <span className="font-medium">Final Interview Tips</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-white">Before the Interview</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Print multiple copies of your CV and certificates
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Plan your route and arrive 10-15 minutes early
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Prepare a portfolio of your best electrical work
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Research current electrical regulations and standards
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-white">During the Interview</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Speak clearly and make eye contact
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Use specific examples from your experience
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Ask about safety procedures and company culture
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Show enthusiasm for learning and development
                  </li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default InterviewGuidanceTab;
