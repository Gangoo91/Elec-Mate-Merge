
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

      {/* Preparation Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Interview Preparation Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {preparationSteps.map((step, index) => (
              <div key={index} className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">{step.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-sm mb-1">{step.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                    <ul className="space-y-1">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-xs text-muted-foreground flex items-start gap-1">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Interview Types */}
        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Types of Electrical Interviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {interviewTypes.map((interview, index) => (
              <div key={index} className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white text-sm">{interview.type}</h4>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    {interview.duration}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{interview.focus}</p>
                <ul className="space-y-1">
                  {interview.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-xs text-muted-foreground flex items-start gap-1">
                      <AlertCircle className="h-3 w-3 text-amber-400 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Common Questions */}
      <Card className="border-purple-500/20 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Common Electrical Interview Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commonQuestions.map((category, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-medium text-white">{category.category}</h4>
                <div className="space-y-2">
                  {category.questions.map((question, qIndex) => (
                    <div key={qIndex} className="p-2 bg-purple-500/10 rounded border border-purple-500/20">
                      <p className="text-xs text-muted-foreground">{question}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardHeader>
          <CardTitle className="text-amber-300 flex items-center gap-2">
            <Star className="h-5 w-5" />
            Final Interview Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-white text-sm">Before the Interview</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                  Print multiple copies of your CV and certificates
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                  Plan your route and arrive 10-15 minutes early
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                  Prepare a portfolio of your best electrical work
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                  Research current electrical regulations and standards
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-white text-sm">During the Interview</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                  Speak clearly and make eye contact
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                  Use specific examples from your experience
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                  Ask about safety procedures and company culture
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                  Show enthusiasm for learning and development
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewGuidanceTab;
