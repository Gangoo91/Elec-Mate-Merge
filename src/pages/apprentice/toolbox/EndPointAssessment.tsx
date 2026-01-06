
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, FileText, ClipboardCheck, MessageSquare, Clock, CheckCircle, AlertTriangle, Star, Target, BookOpen, Lightbulb, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";

const EndPointAssessment = () => {
  const epaComponents = [
    {
      title: "Knowledge Test",
      icon: FileText,
      duration: "2 hours",
      format: "Multiple choice & short answer",
      description: "Tests your understanding of electrical theory, regulations, and safety principles",
      weighting: "25%",
      color: "blue",
      topics: [
        "Electrical science and principles",
        "BS 7671 Wiring Regulations",
        "Health and safety requirements",
        "Installation methods and materials",
        "Testing and inspection procedures",
        "Fault diagnosis theory"
      ]
    },
    {
      title: "Practical Observation",
      icon: ClipboardCheck,
      duration: "6-8 hours",
      format: "Observed practical assessment",
      description: "Demonstrates your ability to complete electrical installation work to industry standards",
      weighting: "50%",
      color: "green",
      topics: [
        "Safe isolation procedures",
        "Installation of electrical systems",
        "Testing and verification",
        "Use of appropriate tools and equipment",
        "Compliance with BS 7671",
        "Quality of workmanship"
      ]
    },
    {
      title: "Professional Discussion",
      icon: MessageSquare,
      duration: "60 minutes",
      format: "Portfolio-based discussion",
      description: "In-depth discussion about your portfolio evidence and professional development",
      weighting: "25%",
      color: "purple",
      topics: [
        "Portfolio evidence review",
        "Problem-solving approaches",
        "Professional behaviours",
        "Health and safety practices",
        "Customer service skills",
        "Career development plans"
      ]
    }
  ];

  const gradeDescriptors = [
    {
      grade: "Pass",
      description: "Meets all the requirements of the standard",
      requirements: [
        "Demonstrates competence in all required areas",
        "Shows understanding of regulations and procedures",
        "Completes practical tasks to acceptable standard",
        "Communicates effectively in professional discussion"
      ],
      color: "green"
    },
    {
      grade: "Merit",
      description: "Exceeds requirements in several areas",
      requirements: [
        "Shows deeper understanding of electrical principles",
        "Demonstrates efficient work practices",
        "Provides detailed portfolio evidence",
        "Shows initiative and problem-solving skills"
      ],
      color: "blue"
    },
    {
      grade: "Distinction",
      description: "Exceeds requirements in all areas",
      requirements: [
        "Exceptional understanding and application",
        "Outstanding practical skills and efficiency",
        "Comprehensive portfolio with exemplary evidence",
        "Demonstrates leadership qualities and professionalism"
      ],
      color: "yellow"
    }
  ];

  const preparationTips = [
    {
      area: "Knowledge Test Preparation",
      tips: [
        "Review BS 7671 regulations thoroughly, especially Part 4 (Protection for Safety)",
        "Practice calculation questions for cable sizing, voltage drop, and fault currents",
        "Create flashcards for key definitions and regulations",
        "Complete past papers and practice questions under timed conditions",
        "Study the Guidance Notes and On-Site Guide for additional context",
        "Review any areas your assessor has identified as needing improvement"
      ]
    },
    {
      area: "Practical Assessment Preparation",
      tips: [
        "Practice safe isolation procedures until they're second nature",
        "Review your testing sequences and ensure you can explain each step",
        "Familiarise yourself with the assessment criteria and marking scheme",
        "Practice working methodically and checking your work",
        "Ensure you're comfortable with all common test instruments",
        "Time yourself on practical tasks to build confidence"
      ]
    },
    {
      area: "Professional Discussion Preparation",
      tips: [
        "Organise your portfolio with clear sections and evidence mapping",
        "Prepare examples that demonstrate each competency area",
        "Practice explaining your decision-making processes",
        "Be ready to discuss challenges you've overcome and what you learned",
        "Review the apprenticeship standard and prepare examples for each KSB",
        "Practice speaking about your work confidently and professionally"
      ]
    }
  ];

  const commonMistakes = [
    {
      mistake: "Rushing the knowledge test",
      solution: "Read each question carefully. You have 2 hours - use the time to check your answers."
    },
    {
      mistake: "Poor portfolio organisation",
      solution: "Index your portfolio clearly and map evidence to specific standards. Make it easy for assessors."
    },
    {
      mistake: "Forgetting safe isolation steps",
      solution: "Practice the 5-step procedure daily. Verbalise each step as you do it."
    },
    {
      mistake: "Not explaining your reasoning",
      solution: "Assessors want to understand your thought process. Always explain why you're doing something."
    },
    {
      mistake: "Leaving gaps in portfolio evidence",
      solution: "Cross-reference your portfolio against ALL KSBs before the assessment. Fill gaps early."
    },
    {
      mistake: "Underestimating the professional discussion",
      solution: "This isn't a casual chat - prepare structured responses and specific examples."
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">End Point Assessment Guide</h1>
        <SmartBackButton />
      </div>

      {/* Introduction */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-elec-yellow" />
            What is End Point Assessment?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-elec-light">
            End Point Assessment (EPA) is the final stage of your apprenticeship. It's an independent assessment
            conducted by an End Point Assessment Organisation (EPAO) to confirm you've achieved the
            Knowledge, Skills, and Behaviours (KSBs) required by the apprenticeship standard.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-elec-dark p-4 rounded-lg text-center">
              <Clock className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
              <h4 className="font-semibold text-white">Gateway</h4>
              <p className="text-sm text-muted-foreground">Must pass gateway requirements before EPA</p>
            </div>
            <div className="bg-elec-dark p-4 rounded-lg text-center">
              <Target className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white">Assessment Window</h4>
              <p className="text-sm text-muted-foreground">Usually 3 months to complete all components</p>
            </div>
            <div className="bg-elec-dark p-4 rounded-lg text-center">
              <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white">Graded</h4>
              <p className="text-sm text-muted-foreground">Pass, Merit, or Distinction</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="components" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="components">EPA Components</TabsTrigger>
          <TabsTrigger value="grades">Grading</TabsTrigger>
          <TabsTrigger value="preparation">Preparation</TabsTrigger>
          <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
        </TabsList>

        <TabsContent value="components" className="mt-6">
          <div className="space-y-6">
            {epaComponents.map((component, index) => (
              <Card key={index} className={`border-${component.color}-500/20 bg-elec-gray`}>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <CardTitle className={`flex items-center gap-2 text-${component.color}-400`}>
                      <component.icon className="h-5 w-5" />
                      {component.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline">{component.duration}</Badge>
                      <Badge className={`bg-${component.color}-500/20 text-${component.color}-400`}>
                        {component.weighting} of final grade
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-elec-light">{component.description}</p>
                  <div className="bg-elec-dark p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Topics Covered:</h4>
                    <div className="grid gap-2 md:grid-cols-2">
                      {component.topics.map((topic, tIndex) => (
                        <div key={tIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span className="text-muted-foreground">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grades" className="mt-6">
          <div className="space-y-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-elec-yellow" />
                  Understanding EPA Grades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-elec-light mb-6">
                  Your overall EPA grade is determined by your performance across all three assessment
                  components. Each component must be passed individually, and your overall grade reflects
                  your combined performance.
                </p>
                <div className="space-y-4">
                  {gradeDescriptors.map((grade, index) => (
                    <div
                      key={index}
                      className={`border border-${grade.color}-500/30 bg-${grade.color}-500/5 rounded-lg p-4`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={`bg-${grade.color}-500 text-white text-lg px-4 py-1`}>
                          {grade.grade}
                        </Badge>
                        <span className="text-elec-light">{grade.description}</span>
                      </div>
                      <div className="grid gap-2 md:grid-cols-2">
                        {grade.requirements.map((req, rIndex) => (
                          <div key={rIndex} className="flex items-start gap-2 text-sm">
                            <CheckCircle className={`h-4 w-4 text-${grade.color}-400 mt-0.5 flex-shrink-0`} />
                            <span className="text-muted-foreground">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  If You Don't Pass
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-elec-light">
                  Don't panic if you don't pass an EPA component. Here's what happens:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      You can re-sit individual components you didn't pass
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Your employer and training provider will support additional learning
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Re-sit must be within 3 months of the original assessment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Maximum grade on re-sit is typically Pass (check with your EPAO)
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preparation" className="mt-6">
          <div className="space-y-6">
            {preparationTips.map((area, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-elec-yellow" />
                    {area.area}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {area.tips.map((tip, tIndex) => (
                      <li key={tIndex} className="flex items-start gap-3 p-3 bg-elec-dark rounded-lg">
                        <span className="bg-elec-yellow text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                          {tIndex + 1}
                        </span>
                        <span className="text-sm text-elec-light">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Gateway Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-elec-light">
                  Before entering EPA, you must pass the "gateway" - confirmation you're ready for assessment:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-elec-dark p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Required Evidence</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Completed learning programme</li>
                      <li>• Level 2 English and Maths (minimum)</li>
                      <li>• AM2 practical assessment passed</li>
                      <li>• Portfolio of evidence</li>
                      <li>• Employer confirmation of readiness</li>
                    </ul>
                  </div>
                  <div className="bg-elec-dark p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Gateway Meeting</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Meeting with employer and training provider</li>
                      <li>• Review of all evidence and qualifications</li>
                      <li>• Confirmation you meet all requirements</li>
                      <li>• Agree EPA start date with EPAO</li>
                      <li>• Sign gateway declaration form</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mistakes" className="mt-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-elec-yellow" />
                Common Mistakes to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-elec-light mb-6">
                Learn from others' experiences. These are the most common mistakes apprentices make during EPA
                and how to avoid them:
              </p>
              <MobileAccordion type="single" collapsible className="w-full">
                {commonMistakes.map((item, index) => (
                  <MobileAccordionItem key={index} value={`mistake-${index}`}>
                    <MobileAccordionTrigger className="text-left text-red-400">
                      <span className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                        {item.mistake}
                      </span>
                    </MobileAccordionTrigger>
                    <MobileAccordionContent>
                      <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-green-400 mb-1">Solution</h4>
                            <p className="text-sm text-elec-light">{item.solution}</p>
                          </div>
                        </div>
                      </div>
                    </MobileAccordionContent>
                  </MobileAccordionItem>
                ))}
              </MobileAccordion>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-blue-500/5 mt-6">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Star className="h-5 w-5" />
                Top Tips from Successful Apprentices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-elec-dark p-4 rounded-lg">
                  <p className="text-sm text-elec-light italic mb-2">
                    "Start your portfolio from day one. It's so much easier to collect evidence as you go
                    than trying to remember everything at the end."
                  </p>
                  <span className="text-xs text-muted-foreground">- Distinction Grade Apprentice</span>
                </div>
                <div className="bg-elec-dark p-4 rounded-lg">
                  <p className="text-sm text-elec-light italic mb-2">
                    "In the professional discussion, don't just describe what you did - explain why you made
                    those decisions and what you would do differently next time."
                  </p>
                  <span className="text-xs text-muted-foreground">- Merit Grade Apprentice</span>
                </div>
                <div className="bg-elec-dark p-4 rounded-lg">
                  <p className="text-sm text-elec-light italic mb-2">
                    "The practical assessment isn't about speed. Take your time, work safely, and check
                    everything twice. Quality beats rushing every time."
                  </p>
                  <span className="text-xs text-muted-foreground">- Distinction Grade Apprentice</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EndPointAssessment;
