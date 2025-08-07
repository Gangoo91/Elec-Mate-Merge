import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, Users, FileText, Zap, HardHat, Star, MessageSquare, Target } from "lucide-react";

const InterviewGuidance = () => {
  const interviewGuides = [
    {
      id: "preparation",
      title: "Pre-Interview Preparation",
      icon: <FileText className="h-5 w-5" />,
      difficulty: "Essential",
      content: {
        overview: "Proper preparation is crucial for interview success. Research the company, understand the role, and prepare your responses.",
        keyPoints: [
          "Research the company's recent projects and values",
          "Review the job description thoroughly",
          "Prepare specific examples from your experience",
          "Plan your journey and arrive 10-15 minutes early",
          "Bring multiple copies of your CV and certificates"
        ],
        practicalTips: [
          "Check the company website for recent news or projects",
          "Look up the interviewer on LinkedIn if possible",
          "Prepare questions about the role and company culture",
          "Practice your introduction and key selling points",
          "Ensure your portfolio is up to date and relevant"
        ]
      }
    },
    {
      id: "technical",
      title: "Technical Questions & Scenarios",
      icon: <Zap className="h-5 w-5" />,
      difficulty: "Advanced",
      content: {
        overview: "Electrical interviews often include technical questions to assess your knowledge and problem-solving abilities.",
        keyPoints: [
          "Be prepared for BS 7671 regulation questions",
          "Understand fault finding procedures",
          "Know testing and inspection processes",
          "Explain cable calculations and selection",
          "Discuss safety procedures and risk assessments"
        ],
        commonQuestions: [
          "How would you test for earth continuity?",
          "What's the maximum Zs value for a 32A Type B MCB?",
          "Explain the difference between TN-S and TN-C-S systems",
          "How do you calculate volt drop?",
          "What PPE would you use for live working?"
        ],
        practicalTips: [
          "Draw diagrams when explaining complex concepts",
          "Always mention safety considerations first",
          "Use real examples from your experience",
          "If unsure, explain your thought process",
          "Reference current regulations and standards"
        ]
      }
    },
    {
      id: "behavioural",
      title: "Behavioural Questions",
      icon: <Users className="h-5 w-5" />,
      difficulty: "Moderate",
      content: {
        overview: "Behavioural questions assess how you handle situations, work with others, and approach challenges.",
        keyPoints: [
          "Use the STAR method (Situation, Task, Action, Result)",
          "Provide specific examples from your experience",
          "Show learning and development from challenges",
          "Demonstrate teamwork and communication skills",
          "Highlight problem-solving abilities"
        ],
        commonQuestions: [
          "Tell me about a time you faced a difficult electrical problem",
          "How do you handle working under pressure?",
          "Describe a situation where you had to work as part of a team",
          "Give an example of when you had to learn something new quickly",
          "How do you ensure quality in your work?"
        ],
        practicalTips: [
          "Prepare 5-6 different scenarios in advance",
          "Focus on positive outcomes and lessons learned",
          "Be honest about challenges and how you overcame them",
          "Show enthusiasm for continuous learning",
          "Demonstrate safety-conscious thinking"
        ]
      }
    },
    {
      id: "safety",
      title: "Health & Safety Focus",
      icon: <HardHat className="h-5 w-5" />,
      difficulty: "Critical",
      content: {
        overview: "Safety is paramount in electrical work. Demonstrate your commitment to safe working practices.",
        keyPoints: [
          "Know current CDM regulations",
          "Understand permit to work systems",
          "Explain isolation procedures",
          "Discuss risk assessment processes",
          "Show awareness of environmental hazards"
        ],
        safetyTopics: [
          "Live working procedures and limitations",
          "Working at height regulations",
          "Confined space entry requirements",
          "Emergency procedures and first aid",
          "Environmental and sustainability considerations"
        ],
        practicalTips: [
          "Always prioritise safety in your answers",
          "Mention relevant training and certifications",
          "Give examples of safety improvements you've implemented",
          "Show understanding of legal responsibilities",
          "Demonstrate risk awareness and mitigation"
        ]
      }
    },
    {
      id: "communication",
      title: "Communication & Professionalism",
      icon: <MessageSquare className="h-5 w-5" />,
      difficulty: "Important",
      content: {
        overview: "Strong communication skills are essential for explaining work to clients and colleagues.",
        keyPoints: [
          "Explain technical concepts in simple terms",
          "Show active listening skills",
          "Demonstrate customer service awareness",
          "Display professional appearance and manner",
          "Show respect for diversity and inclusion"
        ],
        scenarios: [
          "Explaining electrical faults to non-technical clients",
          "Dealing with difficult or stressed customers",
          "Coordinating with other trades on site",
          "Reporting safety concerns to supervisors",
          "Mentoring apprentices or junior colleagues"
        ],
        practicalTips: [
          "Use clear, jargon-free language",
          "Show empathy and understanding",
          "Demonstrate patience and professionalism",
          "Ask clarifying questions when needed",
          "Follow up on commitments and promises"
        ]
      }
    },
    {
      id: "career",
      title: "Career Goals & Development",
      icon: <Target className="h-5 w-5" />,
      difficulty: "Strategic",
      content: {
        overview: "Show your commitment to professional development and career progression.",
        keyPoints: [
          "Discuss your long-term career aspirations",
          "Show commitment to continuous learning",
          "Highlight relevant training and qualifications",
          "Demonstrate industry awareness",
          "Express interest in company growth"
        ],
        developmentAreas: [
          "Additional qualifications (e.g., 18th Edition updates)",
          "Specialisation areas (renewable energy, automation)",
          "Management and leadership skills",
          "Digital skills and technology adoption",
          "Business and commercial awareness"
        ],
        practicalTips: [
          "Research industry trends and future developments",
          "Show genuine interest in the company's future",
          "Mention specific training courses or certifications",
          "Demonstrate ambition balanced with realism",
          "Ask about development opportunities available"
        ]
      }
    },
    {
      id: "questions",
      title: "Questions to Ask the Interviewer",
      icon: <Star className="h-5 w-5" />,
      difficulty: "Essential",
      content: {
        overview: "Asking thoughtful questions shows your interest and helps you evaluate if the role is right for you.",
        keyPoints: [
          "Ask about day-to-day responsibilities",
          "Inquire about training and development",
          "Understand the company culture",
          "Learn about progression opportunities",
          "Discuss challenges and expectations"
        ],
        goodQuestions: [
          "What does a typical day look like in this role?",
          "What training opportunities are available?",
          "How does the company support professional development?",
          "What are the main challenges facing the team?",
          "How do you measure success in this position?"
        ],
        questionsToAvoid: [
          "Asking about salary/benefits too early",
          "Questions easily answered by their website",
          "Negative questions about previous experiences",
          "Questions showing lack of basic research",
          "Overly personal questions about the interviewer"
        ]
      }
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "essential":
      case "critical":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "important":
      case "advanced":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "moderate":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "strategic":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray/30">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-elec-yellow" />
            Interview Guidance for Electricians
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Comprehensive guidance to help you excel in electrical industry interviews. From technical questions 
            to behavioural scenarios, this guide covers everything you need to make a strong impression and 
            secure your ideal electrical role.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              30-60 min prep time
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Interview-ready checklist
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Common pitfalls to avoid
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Interview Guide Sections */}
      <Card className="border-elec-yellow/20 bg-elec-gray/30">
        <CardHeader>
          <CardTitle className="text-lg">Interview Preparation Guide</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <MobileAccordion type="single" collapsible className="w-full">
            {interviewGuides.map((guide) => (
              <MobileAccordionItem key={guide.id} value={guide.id}>
                <MobileAccordionTrigger
                  icon={guide.icon}
                  className="text-left px-6 py-4"
                >
                  <div className="flex items-center justify-between w-full pr-8">
                    <span className="font-medium">{guide.title}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getDifficultyColor(guide.difficulty)}`}
                    >
                      {guide.difficulty}
                    </Badge>
                  </div>
                </MobileAccordionTrigger>
                <MobileAccordionContent className="px-6 py-4 bg-elec-gray/20 border-t border-elec-yellow/10">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {guide.content.overview}
                    </p>

                    {guide.content.keyPoints && (
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-elec-yellow">Key Points:</h4>
                        <ul className="space-y-1">
                          {guide.content.keyPoints.map((point, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {guide.content.commonQuestions && (
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-elec-yellow">Common Questions:</h4>
                        <ul className="space-y-1">
                          {guide.content.commonQuestions.map((question, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <MessageSquare className="h-3 w-3 text-blue-400 mt-0.5 flex-shrink-0" />
                              <span className="italic">"{question}"</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {guide.content.scenarios && (
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-elec-yellow">Example Scenarios:</h4>
                        <ul className="space-y-1">
                          {guide.content.scenarios.map((scenario, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <Users className="h-3 w-3 text-purple-400 mt-0.5 flex-shrink-0" />
                              <span>{scenario}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {guide.content.safetyTopics && (
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-elec-yellow">Safety Topics:</h4>
                        <ul className="space-y-1">
                          {guide.content.safetyTopics.map((topic, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <HardHat className="h-3 w-3 text-orange-400 mt-0.5 flex-shrink-0" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {guide.content.developmentAreas && (
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-elec-yellow">Development Areas:</h4>
                        <ul className="space-y-1">
                          {guide.content.developmentAreas.map((area, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <Target className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {guide.content.goodQuestions && (
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-green-400">Good Questions to Ask:</h4>
                        <ul className="space-y-1">
                          {guide.content.goodQuestions.map((question, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="italic">"{question}"</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {guide.content.questionsToAvoid && (
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-red-400">Questions to Avoid:</h4>
                        <ul className="space-y-1">
                          {guide.content.questionsToAvoid.map((question, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                              <span>{question}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {guide.content.practicalTips && (
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-elec-yellow">Practical Tips:</h4>
                        <ul className="space-y-1">
                          {guide.content.practicalTips.map((tip, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <Star className="h-3 w-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </MobileAccordionContent>
              </MobileAccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      {/* Success Tips Card */}
      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Final Success Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Remember: Confidence comes from preparation. Practice your responses, but keep them natural and conversational.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Be authentic and honest in your responses</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Show enthusiasm for the role and electrical work</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Follow up with a thank you email within 24 hours</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewGuidance;