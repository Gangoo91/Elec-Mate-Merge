
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Award, FileText, ClipboardCheck, MessageSquare, Clock, CheckCircle, AlertTriangle, Star, Target, BookOpen, Lightbulb, AlertCircle, Zap, Heart, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";

const EndPointAssessment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "components";
  const setActiveTab = (tab: string) => setSearchParams({ tab }, { replace: false });
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const quickStats = [
    { label: "Components", value: "3", icon: ClipboardCheck, color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/30" },
    { label: "Assessment", value: "3 Months", icon: Clock, color: "text-green-400", bg: "from-green-500/10 to-green-500/5", border: "border-green-500/30" },
    { label: "Grade Levels", value: "3", icon: Award, color: "text-elec-yellow", bg: "from-elec-yellow/10 to-elec-yellow/5", border: "border-elec-yellow/30" },
    { label: "Success Rate", value: "High", icon: Star, color: "text-purple-400", bg: "from-purple-500/10 to-purple-500/5", border: "border-purple-500/30" }
  ];

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

  const renderMobileContent = () => (
    <MobileAccordion type="single" collapsible defaultValue="components" className="w-full">
      <MobileAccordionItem value="components">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            EPA Components
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-4">
            {epaComponents.map((component, index) => (
              <Card key={index} className="bg-white/5 border border-white/10">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="flex items-center gap-2 text-white text-base">
                      <component.icon className="h-5 w-5 text-elec-yellow" />
                      {component.title}
                    </CardTitle>
                    <Badge variant="outline" className="text-elec-yellow border-elec-yellow/40">
                      {component.weighting}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-white text-sm">{component.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="text-white">{component.duration}</Badge>
                    <Badge variant="outline" className="text-white">{component.format}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="grades">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Grading
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-4">
            {gradeDescriptors.map((grade, index) => (
              <Card key={index} className="bg-white/5 border border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={`bg-${grade.color}-500 text-white px-3`}>
                      {grade.grade}
                    </Badge>
                    <span className="text-white text-sm">{grade.description}</span>
                  </div>
                  <ul className="space-y-2">
                    {grade.requirements.map((req, rIndex) => (
                      <li key={rIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="preparation">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Preparation
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-4">
            {preparationTips.map((area, index) => (
              <Card key={index} className="bg-white/5 border border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-elec-yellow text-base">
                    <Lightbulb className="h-5 w-5" />
                    {area.area}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {area.tips.map((tip, tIndex) => (
                      <li key={tIndex} className="flex items-start gap-2 p-2 bg-white/5 rounded-lg">
                        <span className="bg-elec-yellow text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                          {tIndex + 1}
                        </span>
                        <span className="text-sm text-white">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="mistakes">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Common Mistakes
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="space-y-3">
            {commonMistakes.map((item, index) => (
              <Card key={index} className="bg-white/5 border border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-red-400 font-medium text-sm">{item.mistake}</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-green-500/10 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">{item.solution}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>
    </MobileAccordion>
  );

  const renderComponentsContent = () => (
    <div className="space-y-4">
      {epaComponents.map((component, index) => (
        <Card key={index} className="bg-white/5 border border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="flex items-center gap-2 text-white">
                <component.icon className="h-5 w-5 text-elec-yellow" />
                {component.title}
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-white">{component.duration}</Badge>
                <Badge className="bg-elec-yellow/20 text-elec-yellow">
                  {component.weighting} of final grade
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white">{component.description}</p>
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-3">Topics Covered:</h4>
              <div className="grid gap-2 md:grid-cols-2">
                {component.topics.map((topic, tIndex) => (
                  <div key={tIndex} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-white">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderGradesContent = () => (
    <div className="space-y-4">
      <Card className="bg-white/5 border border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Star className="h-5 w-5" />
            Understanding EPA Grades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white mb-6">
            Your overall EPA grade is determined by your performance across all three assessment
            components. Each component must be passed individually, and your overall grade reflects
            your combined performance.
          </p>
          <div className="space-y-4">
            {gradeDescriptors.map((grade, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Badge className={`bg-${grade.color}-500 text-white text-lg px-4 py-1`}>
                    {grade.grade}
                  </Badge>
                  <span className="text-white">{grade.description}</span>
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  {grade.requirements.map((req, rIndex) => (
                    <div key={rIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-orange-500/5">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            If You Don't Pass
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-white">
            Don't panic if you don't pass an EPA component. Here's what happens:
          </p>
          <ul className="space-y-2 text-sm">
            {[
              "You can re-sit individual components you didn't pass",
              "Your employer and training provider will support additional learning",
              "Re-sit must be within 3 months of the original assessment",
              "Maximum grade on re-sit is typically Pass (check with your EPAO)"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  const renderPreparationContent = () => (
    <div className="space-y-4">
      {preparationTips.map((area, index) => (
        <Card key={index} className="bg-white/5 border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-elec-yellow">
              <Lightbulb className="h-5 w-5" />
              {area.area}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {area.tips.map((tip, tIndex) => (
                <li key={tIndex} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/8 transition-all">
                  <span className="bg-elec-yellow text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                    {tIndex + 1}
                  </span>
                  <span className="text-sm text-white">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}

      <Card className="border-green-500/20 bg-gradient-to-br from-green-500/10 to-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Gateway Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-white">
            Before entering EPA, you must pass the "gateway" - confirmation you're ready for assessment:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Required Evidence</h4>
              <ul className="space-y-1 text-sm text-white">
                <li>- Completed learning programme</li>
                <li>- Level 2 English and Maths (minimum)</li>
                <li>- AM2 practical assessment passed</li>
                <li>- Portfolio of evidence</li>
                <li>- Employer confirmation of readiness</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Gateway Meeting</h4>
              <ul className="space-y-1 text-sm text-white">
                <li>- Meeting with employer and training provider</li>
                <li>- Review of all evidence and qualifications</li>
                <li>- Confirmation you meet all requirements</li>
                <li>- Agree EPA start date with EPAO</li>
                <li>- Sign gateway declaration form</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMistakesContent = () => (
    <div className="space-y-4">
      <Card className="bg-white/5 border border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <AlertCircle className="h-5 w-5" />
            Common Mistakes to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white mb-6">
            Learn from others' experiences. These are the most common mistakes apprentices make during EPA
            and how to avoid them:
          </p>
          <div className="space-y-3">
            {commonMistakes.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-red-400 font-medium">{item.mistake}</span>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-green-400 text-sm">Solution: </span>
                      <span className="text-white text-sm">{item.solution}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Star className="h-5 w-5" />
            Top Tips from Successful Apprentices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { quote: "Start your portfolio from day one. It's so much easier to collect evidence as you go than trying to remember everything at the end.", grade: "Distinction Grade Apprentice" },
              { quote: "In the professional discussion, don't just describe what you did - explain why you made those decisions and what you would do differently next time.", grade: "Merit Grade Apprentice" },
              { quote: "The practical assessment isn't about speed. Take your time, work safely, and check everything twice. Quality beats rushing every time.", grade: "Distinction Grade Apprentice" }
            ].map((tip, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm text-white italic mb-2">"{tip.quote}"</p>
                <span className="text-xs text-blue-400">- {tip.grade}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-elec-yellow/20 rounded-2xl mb-4">
          <Award className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          End Point Assessment Guide
        </h1>
        <p className="text-white max-w-2xl mb-4 text-sm sm:text-base">
          Everything you need to know about EPA - the final stage of your apprenticeship. Prepare effectively and achieve your best grade.
        </p>
        <SmartBackButton />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className={`${stat.border} bg-gradient-to-br ${stat.bg}`}>
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-white">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* EPA Simulator CTA */}
      <Card
        className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-500/5 cursor-pointer active:scale-[0.98] transition-transform touch-manipulation"
        onClick={() => navigate('/apprentice/epa-simulator')}
      >
        <CardContent className="p-5 flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-purple-500/20 flex items-center justify-center shrink-0">
            <Zap className="h-7 w-7 text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-purple-300">
              EPA Readiness Simulator
            </h3>
            <p className="text-sm text-white mt-0.5">
              AI-powered mock discussions, knowledge tests, and a readiness dashboard
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-purple-400 shrink-0" />
        </CardContent>
      </Card>

      {/* Introduction Card */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Zap className="h-5 w-5" />
            What is End Point Assessment?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white">
            End Point Assessment (EPA) is the final stage of your apprenticeship. It's an independent assessment
            conducted by an End Point Assessment Organisation (EPAO) to confirm you've achieved the
            Knowledge, Skills, and Behaviours (KSBs) required by the apprenticeship standard.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center hover:border-elec-yellow/30 transition-all">
              <Clock className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
              <h4 className="font-semibold text-white">Gateway</h4>
              <p className="text-sm text-white">Must pass gateway requirements before EPA</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center hover:border-blue-500/30 transition-all">
              <Target className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white">Assessment Window</h4>
              <p className="text-sm text-white">Usually 3 months to complete all components</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center hover:border-yellow-500/30 transition-all">
              <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white">Graded</h4>
              <p className="text-sm text-white">Pass, Merit, or Distinction</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Tabs / Mobile Accordion */}
      {isMobile ? (
        renderMobileContent()
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-white/5 border border-white/10">
            <TabsTrigger value="components" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <ClipboardCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Components</span>
            </TabsTrigger>
            <TabsTrigger value="grades" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Grading</span>
            </TabsTrigger>
            <TabsTrigger value="preparation" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Preparation</span>
            </TabsTrigger>
            <TabsTrigger value="mistakes" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <AlertCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Mistakes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="mt-6">
            {renderComponentsContent()}
          </TabsContent>

          <TabsContent value="grades" className="mt-6">
            {renderGradesContent()}
          </TabsContent>

          <TabsContent value="preparation" className="mt-6">
            {renderPreparationContent()}
          </TabsContent>

          <TabsContent value="mistakes" className="mt-6">
            {renderMistakesContent()}
          </TabsContent>
        </Tabs>
      )}

      {/* Journey Card */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Your EPA Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white leading-relaxed">
            EPA is the culmination of your apprenticeship journey. It's your opportunity to demonstrate everything you've learned
            and showcase your skills as a competent electrical professional. With proper preparation and the right mindset,
            you can achieve your best possible grade.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { text: "Prepare thoroughly", icon: BookOpen },
              { text: "Stay confident", icon: Star },
              { text: "Trust your training", icon: Award }
            ].map((tip, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                <tip.icon className="h-4 w-4 text-green-400" />
                <span className="text-white text-sm">{tip.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EndPointAssessment;
