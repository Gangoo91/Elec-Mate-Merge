import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { 
  MessageCircle, 
  FileText, 
  Users, 
  Lightbulb, 
  HandHeart, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Target,
  Award,
  User,
  Briefcase,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Shield,
  Zap,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function InterviewGuidance() {
  const interviewGuides = [
    {
      id: "pre-interview-prep",
      title: "Pre-Interview Preparation",
      icon: <FileText className="h-6 w-6" />,
      category: "preparation",
      difficulty: "Essential",
      content: {
        overview: "Comprehensive preparation is crucial for interview success in the competitive UK electrical industry.",
        phases: [
          {
            phase: "Research Phase (1-2 weeks before)",
            steps: [
              "Research the company's history, values, and recent projects",
              "Study their electrical services and specialisations",
              "Check their health & safety record and certifications",
              "Review job description and required qualifications",
              "Research salary ranges using Glassdoor or PayScale"
            ]
          },
          {
            phase: "Technical Preparation (1 week before)",
            steps: [
              "Review BS 7671 18th Edition key regulations",
              "Prepare examples of complex installations you've completed",
              "Practice explaining electrical concepts in simple terms",
              "Review fault-finding methodologies and testing procedures",
              "Prepare questions about their equipment and systems"
            ]
          },
          {
            phase: "Final Preparation (1-2 days before)",
            steps: [
              "Plan your route and check travel times",
              "Prepare all documents (certificates, portfolio, CV)",
              "Choose appropriate professional attire",
              "Practice common interview questions with a friend",
              "Prepare thoughtful questions about the role and company"
            ]
          }
        ],
        keyPoints: [
          "Arrive 10-15 minutes early to show punctuality",
          "Bring multiple copies of your CV and certificates",
          "Research the interviewer's background if possible",
          "Prepare specific examples using the STAR method",
          "Have backup transport plans in case of delays"
        ]
      }
    },
    {
      id: "interview-types",
      title: "UK Electrical Interview Formats",
      icon: <Users className="h-6 w-6" />,
      category: "preparation",
      difficulty: "Important",
      content: {
        overview: "Understanding different interview formats helps you prepare appropriately for each scenario.",
        phases: [
          {
            phase: "Traditional Face-to-Face Interviews",
            steps: [
              "Most common format for electrical positions",
              "Usually 30-60 minutes with hiring manager",
              "May include site tour or workshop visit",
              "Expect technical and behavioural questions",
              "Dress professionally in business casual attire"
            ]
          },
          {
            phase: "Panel Interviews",
            steps: [
              "Multiple interviewers (typically 2-4 people)",
              "May include supervisor, HR, and technical lead",
              "Maintain eye contact with all panel members",
              "Address questions to the person who asked",
              "Bring extra copies of documents for each interviewer"
            ]
          },
          {
            phase: "Practical/Technical Assessments",
            steps: [
              "Testing practical electrical skills",
              "Fault-finding exercises on test rigs",
              "Cable termination or installation tasks",
              "Use of test equipment and meters",
              "Health & safety procedure demonstration"
            ]
          },
          {
            phase: "Virtual/Video Interviews",
            steps: [
              "Increasingly common for initial screenings",
              "Test technology beforehand",
              "Ensure good lighting and professional background",
              "Have backup internet connection ready",
              "Maintain professional appearance on camera"
            ]
          }
        ],
        keyPoints: [
          "Ask about interview format when scheduling",
          "Prepare differently for each interview type",
          "For practical tests, review basic electrical tasks",
          "Virtual interviews require technical preparation",
          "Some companies use multiple interview rounds"
        ]
      }
    },
    {
      id: "common-questions",
      title: "UK Electrical Interview Questions & Answers",
      icon: <MessageCircle className="h-6 w-6" />,
      category: "questions",
      difficulty: "Critical",
      content: {
        overview: "Master responses to the most common electrical interview questions with UK-specific context.",
        phases: [
          {
            phase: "Technical Knowledge Questions",
            steps: [
              "Q: Explain the main changes in BS 7671 18th Edition",
              "A: Discuss RCD protection, surge protection, and arc fault detection",
              "Q: How would you test an RCD?",
              "A: Explain test procedures, acceptable trip times, and documentation",
              "Q: What's the difference between TN-S and TN-C-S earthing?",
              "A: Detail system characteristics and typical UK applications"
            ]
          },
          {
            phase: "Safety & Compliance Questions",
            steps: [
              "Q: How do you ensure electrical safety on site?",
              "A: Discuss risk assessments, isolation procedures, and PPE",
              "Q: What's your approach to working near live equipment?",
              "A: Emphasise permit-to-work and safe isolation procedures",
              "Q: How do you handle electrical emergencies?",
              "A: Outline emergency procedures and first aid knowledge"
            ]
          },
          {
            phase: "Behavioural Questions",
            steps: [
              "Q: Describe a challenging electrical fault you solved",
              "A: Use STAR method with specific technical details",
              "Q: How do you handle difficult customers?",
              "A: Focus on communication and professional service",
              "Q: Why do you want to work for this company?",
              "A: Reference your research about their projects and values"
            ]
          }
        ],
        keyPoints: [
          "Always relate answers to UK regulations and standards",
          "Use specific examples from your experience",
          "Show continuous learning and development attitude",
          "Demonstrate safety-first mindset in all responses",
          "Ask clarifying questions if needed"
        ]
      }
    },
    {
      id: "presentation-skills",
      title: "Professional Presentation & Communication",
      icon: <Lightbulb className="h-6 w-6" />,
      category: "skills",
      difficulty: "Important",
      content: {
        overview: "Strong presentation skills set you apart in the competitive UK electrical job market.",
        phases: [
          {
            phase: "Professional Appearance",
            steps: [
              "Business casual or smart casual attire",
              "Clean, pressed clothing and polished shoes",
              "Minimal jewellery and professional grooming",
              "Bring a portfolio folder or briefcase",
              "Ensure mobile phone is on silent"
            ]
          },
          {
            phase: "Communication Excellence",
            steps: [
              "Speak clearly and at appropriate pace",
              "Use professional language, avoid excessive slang",
              "Listen actively and ask thoughtful questions",
              "Explain technical concepts in accessible terms",
              "Show enthusiasm for electrical work and learning"
            ]
          },
          {
            phase: "Body Language & Presence",
            steps: [
              "Maintain appropriate eye contact",
              "Offer firm handshake and confident posture",
              "Use open gestures and avoid crossing arms",
              "Show genuine interest through facial expressions",
              "Respect personal space and professional boundaries"
            ]
          }
        ],
        keyPoints: [
          "First impressions matter significantly",
          "Confidence without arrogance is key",
          "Show respect for everyone you meet",
          "Demonstrate your passion for electrical work",
          "Be authentic while remaining professional"
        ]
      }
    },
    {
      id: "follow-up",
      title: "Post-Interview Follow-Up & Negotiation",
      icon: <HandHeart className="h-6 w-6" />,
      category: "process",
      difficulty: "Valuable",
      content: {
        overview: "Professional follow-up can influence hiring decisions and demonstrate your continued interest.",
        phases: [
          {
            phase: "Immediate Follow-Up (Same Day)",
            steps: [
              "Send thank-you email within 24 hours",
              "Mention specific conversation points from interview",
              "Reiterate your interest in the position",
              "Clarify any points you feel you didn't explain well",
              "Attach any additional documents if requested"
            ]
          },
          {
            phase: "Ongoing Communication",
            steps: [
              "Wait for their stated timeline before following up",
              "Send polite enquiry if deadline passes",
              "Remain professional even if not selected",
              "Ask for feedback to improve future interviews",
              "Maintain contact for future opportunities"
            ]
          },
          {
            phase: "Salary Negotiation (If Offered)",
            steps: [
              "Research industry standards for your experience level",
              "Consider total package: salary, benefits, training",
              "Highlight your unique value and qualifications",
              "Be reasonable and prepared to justify requests",
              "Focus on mutual benefit rather than personal needs"
            ]
          }
        ],
        keyPoints: [
          "Express genuine gratitude for the opportunity",
          "Keep follow-up emails brief and professional",
          "Don't appear desperate with excessive contact",
          "Use feedback to improve future applications",
          "Building relationships is valuable long-term"
        ]
      }
    },
    {
      id: "troubleshooting",
      title: "Interview Challenge Solutions",
      icon: <AlertTriangle className="h-6 w-6" />,
      category: "problem-solving",
      difficulty: "Advanced",
      content: {
        overview: "Overcome common interview challenges with proven strategies and recovery techniques.",
        phases: [
          {
            phase: "Technical Question Difficulties",
            steps: [
              "Admit if you don't know something specific",
              "Explain your problem-solving approach",
              "Show willingness to learn and research",
              "Relate to similar situations you've handled",
              "Ask clarifying questions to better understand"
            ]
          },
          {
            phase: "Nervousness Management",
            steps: [
              "Practice deep breathing techniques",
              "Arrive early to settle and compose yourself",
              "Prepare thoroughly to build confidence",
              "Remember that some nerves are normal",
              "Focus on the conversation rather than the outcome"
            ]
          },
          {
            phase: "Difficult Interviewer Situations",
            steps: [
              "Stay calm and professional regardless",
              "Don't take challenging questions personally",
              "Ask for clarification if questions are unclear",
              "Maintain positive attitude throughout",
              "Thank them for their time regardless of experience"
            ]
          },
          {
            phase: "Competing Candidates",
            steps: [
              "Focus on your unique strengths and experience",
              "Highlight specific achievements and certifications",
              "Show genuine enthusiasm for the role",
              "Demonstrate cultural fit with the company",
              "Follow up professionally to stay memorable"
            ]
          }
        ],
        keyPoints: [
          "Honesty is better than bluffing technical knowledge",
          "Recovery from mistakes shows resilience",
          "Every interview is learning experience",
          "Maintain professionalism even in difficult situations",
          "Use setbacks as motivation for improvement"
        ]
      }
    }
  ];

  const categoryColors = {
    "preparation": "bg-blue-500/10 text-blue-600 border-blue-200",
    "questions": "bg-purple-500/10 text-purple-600 border-purple-200",
    "skills": "bg-green-500/10 text-green-600 border-green-200",
    "process": "bg-orange-500/10 text-orange-600 border-orange-200",
    "problem-solving": "bg-red-500/10 text-red-600 border-red-200"
  };

  const difficultyColors = {
    "Essential": "bg-red-500/10 text-red-600 border-red-200",
    "Critical": "bg-orange-500/10 text-orange-600 border-orange-200",
    "Important": "bg-yellow-500/10 text-yellow-600 border-yellow-200",
    "Valuable": "bg-green-500/10 text-green-600 border-green-200",
    "Advanced": "bg-purple-500/10 text-purple-600 border-purple-200"
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Link to="/electrician/job-vacancies">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <MessageCircle className="h-6 w-6 text-elec-yellow" />
          <h1 className="text-2xl font-bold">Interview Guidance</h1>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          Master every aspect of the electrical job interview process with comprehensive UK-focused guidance. 
          From preparation strategies to post-interview follow-up, secure the role you want in the electrical industry.
        </p>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Interview Success Formula
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Technical competence + Professional presentation + Cultural fit = Interview success
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">BS 7671 Knowledge</Badge>
            <Badge variant="secondary">Safety First Mindset</Badge>
            <Badge variant="secondary">Professional Communication</Badge>
            <Badge variant="secondary">Problem-Solving Skills</Badge>
            <Badge variant="secondary">Continuous Learning</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Interview Preparation Guides
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Step-by-step guidance for every aspect of the electrical job interview process
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <MobileAccordion type="multiple" className="w-full">
            {interviewGuides.map((guide) => (
              <MobileAccordionItem key={guide.id} value={guide.id}>
                <MobileAccordionTrigger 
                  icon={guide.icon}
                  className="hover:bg-elec-yellow/5"
                >
                  <div className="flex flex-col items-center gap-2 text-center w-full">
                    <div className="text-sm font-medium">{guide.title}</div>
                    <div className="flex gap-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-2 py-1 ${categoryColors[guide.category as keyof typeof categoryColors]}`}
                      >
                        {guide.category}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-2 py-1 ${difficultyColors[guide.difficulty as keyof typeof difficultyColors]}`}
                      >
                        {guide.difficulty}
                      </Badge>
                    </div>
                  </div>
                </MobileAccordionTrigger>
                <MobileAccordionContent>
                  <div className="p-6 bg-elec-gray/30 border-t border-elec-yellow/20">
                    <div className="space-y-6">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {guide.content.overview}
                      </p>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          <Clock className="h-4 w-4 text-elec-yellow" />
                          Implementation Phases
                        </h4>
                        {guide.content.phases.map((phase, index) => (
                          <div key={index} className="space-y-2">
                            <h5 className="text-sm font-medium text-elec-yellow">{phase.phase}</h5>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {phase.steps.map((step, stepIndex) => (
                                <li key={stepIndex} className="flex items-start gap-2">
                                  <CheckCircle2 className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          <Award className="h-4 w-4 text-elec-yellow" />
                          Key Success Points
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {guide.content.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <TrendingUp className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </MobileAccordionContent>
              </MobileAccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Remember
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Every interview is an opportunity to learn and improve, regardless of the outcome. 
            Maintain professionalism, show genuine enthusiasm for electrical work, and remember 
            that the right opportunity will come to those who are well-prepared and persistent.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}