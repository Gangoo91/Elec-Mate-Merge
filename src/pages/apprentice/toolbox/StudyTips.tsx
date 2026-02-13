
import { useSearchParams } from "react-router-dom";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Target, Brain, Clock, Heart, Lightbulb, CheckCircle, Star, Zap } from "lucide-react";
import ExamStrategiesTab from "@/components/apprentice/study-tips/ExamStrategiesTab";
import RevisionTechniquesTab from "@/components/apprentice/study-tips/RevisionTechniquesTab";
import TimeManagementTab from "@/components/apprentice/study-tips/TimeManagementTab";
import ResourcesTab from "@/components/apprentice/study-tips/ResourcesTab";
import StudyFundamentalsTab from "@/components/apprentice/study-tips/StudyFundamentalsTab";
import StudyPsychologyTab from "@/components/apprentice/study-tips/StudyPsychologyTab";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";

const StudyTips = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "fundamentals";
  const setActiveTab = (tab: string) => setSearchParams({ tab }, { replace: false });
  const isMobile = useIsMobile();

  const quickStats = [
    { label: "Study Methods", value: "8", icon: BookOpen, color: "text-blue-400", bg: "from-blue-500/10 to-cyan-500/10", border: "border-blue-500/30" },
    { label: "Success Rate", value: "95%", icon: Target, color: "text-green-400", bg: "from-green-500/10 to-emerald-500/10", border: "border-green-500/30" },
    { label: "Techniques", value: "15+", icon: Brain, color: "text-elec-yellow", bg: "from-elec-yellow/10 to-orange-500/10", border: "border-elec-yellow/30" },
    { label: "Daily Study", value: "30min", icon: Clock, color: "text-purple-400", bg: "from-purple-500/10 to-pink-500/10", border: "border-purple-500/30" }
  ];

  const renderMobileContent = () => (
    <MobileAccordion type="single" collapsible defaultValue="fundamentals" className="w-full">
      <MobileAccordionItem value="fundamentals">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Study Fundamentals
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <StudyFundamentalsTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="exam-strategies">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Exam Strategies
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <ExamStrategiesTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="revision-techniques">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Learning & Revision
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <RevisionTechniquesTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="time-management">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time Management
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <TimeManagementTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="resources">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Resources
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <ResourcesTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="psychology">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Study Psychology
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <StudyPsychologyTab />
        </MobileAccordionContent>
      </MobileAccordionItem>
    </MobileAccordion>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-elec-yellow/20 rounded-2xl mb-4">
          <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Study Hub
        </h1>
        <p className="text-white max-w-2xl mb-4 text-sm sm:text-base">
          Your complete study companion for electrical training success. Master 18th Edition, Level 3, and all electrical qualifications with comprehensive learning resources and proven study strategies.
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

      {/* Why Good Study Habits Matter */}
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-blue-400 flex items-center gap-2 text-lg sm:text-xl">
            <Zap className="h-5 w-5" />
            Why Study Habits Matter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Exam Success", desc: "Master content for 18th Edition, AM2, and all assessments", icon: Target },
              { title: "Career Progress", desc: "Knowledge is the foundation of professional growth", icon: Star },
              { title: "Confidence", desc: "Understanding builds confidence on site", icon: CheckCircle }
            ].map((benefit, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-lg hover:border-blue-400/30 transition-all">
                <div className="p-2 bg-blue-500/20 rounded-lg w-fit mb-3">
                  <benefit.icon className="h-5 w-5 text-blue-400" />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{benefit.title}</h4>
                <p className="text-white text-xs">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Desktop Tabs / Mobile Accordion */}
      {isMobile ? (
        renderMobileContent()
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 h-auto p-1 bg-white/5 border border-white/10">
            <TabsTrigger value="fundamentals" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-1 text-xs">
              <Lightbulb className="h-3 w-3" />
              <span className="hidden sm:inline">Fundamentals</span>
            </TabsTrigger>
            <TabsTrigger value="exam-strategies" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-1 text-xs">
              <Target className="h-3 w-3" />
              <span className="hidden sm:inline">Exams</span>
            </TabsTrigger>
            <TabsTrigger value="revision-techniques" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-1 text-xs">
              <Brain className="h-3 w-3" />
              <span className="hidden sm:inline">Learning</span>
            </TabsTrigger>
            <TabsTrigger value="time-management" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-1 text-xs">
              <Clock className="h-3 w-3" />
              <span className="hidden sm:inline">Time</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-1 text-xs">
              <BookOpen className="h-3 w-3" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="psychology" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-1 text-xs">
              <Heart className="h-3 w-3" />
              <span className="hidden sm:inline">Psychology</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fundamentals" className="mt-6">
            <StudyFundamentalsTab />
          </TabsContent>

          <TabsContent value="exam-strategies" className="mt-6">
            <ExamStrategiesTab />
          </TabsContent>

          <TabsContent value="revision-techniques" className="mt-6">
            <RevisionTechniquesTab />
          </TabsContent>

          <TabsContent value="time-management" className="mt-6">
            <TimeManagementTab />
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <ResourcesTab />
          </TabsContent>

          <TabsContent value="psychology" className="mt-6">
            <StudyPsychologyTab />
          </TabsContent>
        </Tabs>
      )}

      {/* Journey Card */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Your Study Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white leading-relaxed">
            Success in electrical training comes from consistent, focused study habits.
            Our integrated study tools, practice resources, and psychological techniques help you build a solid foundation and achieve exam success.
            Consistent daily engagement - even just 30 minutes - is more effective than cramming sessions.
            The electrical trade rewards methodical, steady progress.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { text: "30 minutes daily beats 3-hour cram", icon: Clock },
              { text: "Active recall beats passive reading", icon: Brain },
              { text: "Practice questions are essential", icon: Target }
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

export default StudyTips;
