
import { useState } from "react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Brain, Users, Target, CheckCircle, Zap, Star, Heart, Shield, Lightbulb } from "lucide-react";
import MistakeCategoriesTab from "@/components/apprentice/learning-mistakes/MistakeCategoriesTab";
import RecoveryStrategiesTab from "@/components/apprentice/learning-mistakes/RecoveryStrategiesTab";
import ResilienceTab from "@/components/apprentice/learning-mistakes/ResilienceTab";
import CaseStudiesTab from "@/components/apprentice/learning-mistakes/CaseStudiesTab";
import PreventionTab from "@/components/apprentice/learning-mistakes/PreventionTab";
import SupportSystemsTab from "@/components/apprentice/learning-mistakes/SupportSystemsTab";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";

const LearningFromMistakes = () => {
  const [activeTab, setActiveTab] = useState("categories");
  const isMobile = useIsMobile();

  const quickStats = [
    { label: "Key Areas", value: "6", icon: Brain, color: "text-purple-400", bg: "from-purple-500/10 to-purple-500/5", border: "border-purple-500/30" },
    { label: "Case Studies", value: "10+", icon: CheckCircle, color: "text-green-400", bg: "from-green-500/10 to-green-500/5", border: "border-green-500/30" },
    { label: "Recovery Tips", value: "20+", icon: Target, color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/30" },
    { label: "Growth Focus", value: "100%", icon: Star, color: "text-elec-yellow", bg: "from-elec-yellow/10 to-elec-yellow/5", border: "border-elec-yellow/30" }
  ];

  const keyBenefits = [
    { title: "Build Resilience", desc: "Develop mental strength to bounce back from setbacks", icon: Shield },
    { title: "Accelerate Learning", desc: "Mistakes are powerful teachers when approached correctly", icon: Lightbulb },
    { title: "Professional Growth", desc: "How you handle mistakes defines your career trajectory", icon: Target },
    { title: "Gain Confidence", desc: "Understanding failure removes the fear of it", icon: Star }
  ];

  const renderMobileContent = () => (
    <MobileAccordion type="single" collapsible defaultValue="categories" className="w-full">
      <MobileAccordionItem value="categories">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Mistake Categories
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <MistakeCategoriesTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="recovery">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Recovery Strategies
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <RecoveryStrategiesTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="resilience">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Building Resilience
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <ResilienceTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="case-studies">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Case Studies
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <CaseStudiesTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="prevention">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Prevention
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <PreventionTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="support">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Support Systems
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <SupportSystemsTab />
        </MobileAccordionContent>
      </MobileAccordionItem>
    </MobileAccordion>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-purple-500/20 rounded-2xl mb-4">
          <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Learning From Mistakes
        </h1>
        <p className="text-white/80 max-w-2xl mb-4 text-sm sm:text-base">
          Master the art of turning mistakes into learning opportunities. Build resilience, develop professional recovery skills, and transform setbacks into career advancement in the electrical trade.
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
              <p className="text-xs text-white/70">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Why Learning from Mistakes Matters */}
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-purple-500/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-purple-400 flex items-center gap-2 text-lg sm:text-xl">
            <Zap className="h-5 w-5" />
            Why Mistakes Are Valuable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyBenefits.map((benefit, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-lg hover:border-purple-500/30 transition-all">
                <div className="p-2 bg-purple-500/20 rounded-lg w-fit mb-3">
                  <benefit.icon className="h-5 w-5 text-purple-400" />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{benefit.title}</h4>
                <p className="text-white/70 text-xs">{benefit.desc}</p>
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
            <TabsTrigger value="categories" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white py-3 gap-1 text-xs">
              <AlertTriangle className="h-3 w-3" />
              <span className="hidden sm:inline">Categories</span>
            </TabsTrigger>
            <TabsTrigger value="recovery" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white py-3 gap-1 text-xs">
              <Target className="h-3 w-3" />
              <span className="hidden sm:inline">Recovery</span>
            </TabsTrigger>
            <TabsTrigger value="resilience" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white py-3 gap-1 text-xs">
              <Brain className="h-3 w-3" />
              <span className="hidden sm:inline">Resilience</span>
            </TabsTrigger>
            <TabsTrigger value="case-studies" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white py-3 gap-1 text-xs">
              <CheckCircle className="h-3 w-3" />
              <span className="hidden sm:inline">Case Studies</span>
            </TabsTrigger>
            <TabsTrigger value="prevention" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white py-3 gap-1 text-xs">
              <Shield className="h-3 w-3" />
              <span className="hidden sm:inline">Prevention</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white py-3 gap-1 text-xs">
              <Users className="h-3 w-3" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="mt-6">
            <MistakeCategoriesTab />
          </TabsContent>

          <TabsContent value="recovery" className="mt-6">
            <RecoveryStrategiesTab />
          </TabsContent>

          <TabsContent value="resilience" className="mt-6">
            <ResilienceTab />
          </TabsContent>

          <TabsContent value="case-studies" className="mt-6">
            <CaseStudiesTab />
          </TabsContent>

          <TabsContent value="prevention" className="mt-6">
            <PreventionTab />
          </TabsContent>

          <TabsContent value="support" className="mt-6">
            <SupportSystemsTab />
          </TabsContent>
        </Tabs>
      )}

      {/* Journey Card */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Your Growth Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/80 leading-relaxed">
            Every successful electrician has made mistakes - it's how you respond that defines your career.
            The most experienced professionals will tell you that their biggest growth came from their biggest challenges.
            Embrace mistakes as stepping stones, not stumbling blocks.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { text: "Own your mistakes", icon: Shield },
              { text: "Learn and adapt", icon: Brain },
              { text: "Help others avoid them", icon: Users }
            ].map((tip, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                <tip.icon className="h-4 w-4 text-green-400" />
                <span className="text-white/90 text-sm">{tip.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningFromMistakes;
