
import { useSearchParams } from "react-router-dom";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Heart, Target, Wrench, CheckSquare, Zap, Star, Brain, AlertCircle } from "lucide-react";
import TimeManagementFundamentalsTab from "@/components/apprentice/time-management/TimeManagementFundamentalsTab";
import SchedulePlanningTab from "@/components/apprentice/time-management/SchedulePlanningTab";
import StressManagementTab from "@/components/apprentice/time-management/StressManagementTab";
import WorkLifeBalanceTab from "@/components/apprentice/time-management/WorkLifeBalanceTab";
import ProductivityToolsTab from "@/components/apprentice/time-management/ProductivityToolsTab";
import InteractiveToolsTab from "@/components/apprentice/time-management/InteractiveToolsTab";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";

const TimeManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "fundamentals";
  const setActiveTab = (tab: string) => setSearchParams({ tab }, { replace: false });
  const isMobile = useIsMobile();

  const quickStats = [
    { label: "OJT Requirement", value: "20%", icon: Clock, color: "text-elec-yellow", bg: "from-elec-yellow/10 to-orange-500/10", border: "border-elec-yellow/30" },
    { label: "Apprenticeship", value: "4 Yrs", icon: Target, color: "text-blue-400", bg: "from-blue-500/10 to-cyan-500/10", border: "border-blue-500/30" },
    { label: "Weekly Hours", value: "40+", icon: Calendar, color: "text-green-400", bg: "from-green-500/10 to-emerald-500/10", border: "border-green-500/30" },
    { label: "Key Skills", value: "6", icon: Brain, color: "text-purple-400", bg: "from-purple-500/10 to-pink-500/10", border: "border-purple-500/30" }
  ];

  const keyBenefits = [
    { title: "More Free Time", desc: "Work smarter, not harder - reclaim your evenings and weekends", icon: Clock },
    { title: "Less Stress", desc: "Reduce anxiety through planning and prioritisation", icon: Heart },
    { title: "Better Results", desc: "Improved focus leads to better exam and assessment outcomes", icon: Star },
    { title: "Career Success", desc: "Time management skills valued by employers", icon: Target }
  ];

  const renderMobileContent = () => (
    <MobileAccordion type="single" collapsible defaultValue="fundamentals" className="w-full">
      <MobileAccordionItem value="fundamentals">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time Fundamentals
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <TimeManagementFundamentalsTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="scheduling">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Schedule Planning
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <SchedulePlanningTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="stress">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Stress & Wellbeing
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <StressManagementTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="balance">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Work-Life Balance
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <WorkLifeBalanceTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="productivity">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Productivity Tools
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <ProductivityToolsTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="tools">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Interactive Tools
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <InteractiveToolsTab />
        </MobileAccordionContent>
      </MobileAccordionItem>
    </MobileAccordion>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-elec-yellow/20 rounded-2xl mb-4">
          <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Time Management & Work-Life Balance
        </h1>
        <p className="text-white/80 max-w-2xl mb-4 text-sm sm:text-base">
          Master the art of balancing your apprenticeship demands with personal wellbeing. Learn effective time management strategies, stress reduction techniques, and maintain a healthy work-life balance.
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

      {/* Why Time Management Matters */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-lg sm:text-xl">
            <Zap className="h-5 w-5" />
            Why Time Management Matters for Apprentices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyBenefits.map((benefit, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-lg hover:border-elec-yellow/30 transition-all">
                <div className="p-2 bg-elec-yellow/20 rounded-lg w-fit mb-3">
                  <benefit.icon className="h-5 w-5 text-elec-yellow" />
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
            <TabsTrigger value="fundamentals" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-1 text-xs">
              <Clock className="h-3 w-3" />
              <span className="hidden sm:inline">Fundamentals</span>
            </TabsTrigger>
            <TabsTrigger value="scheduling" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-1 text-xs">
              <Calendar className="h-3 w-3" />
              <span className="hidden sm:inline">Scheduling</span>
            </TabsTrigger>
            <TabsTrigger value="stress" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-1 text-xs">
              <Heart className="h-3 w-3" />
              <span className="hidden sm:inline">Stress</span>
            </TabsTrigger>
            <TabsTrigger value="balance" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-1 text-xs">
              <Target className="h-3 w-3" />
              <span className="hidden sm:inline">Balance</span>
            </TabsTrigger>
            <TabsTrigger value="productivity" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-1 text-xs">
              <Wrench className="h-3 w-3" />
              <span className="hidden sm:inline">Productivity</span>
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-1 text-xs">
              <CheckSquare className="h-3 w-3" />
              <span className="hidden sm:inline">Interactive</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fundamentals" className="mt-6">
            <TimeManagementFundamentalsTab />
          </TabsContent>

          <TabsContent value="scheduling" className="mt-6">
            <SchedulePlanningTab />
          </TabsContent>

          <TabsContent value="stress" className="mt-6">
            <StressManagementTab />
          </TabsContent>

          <TabsContent value="balance" className="mt-6">
            <WorkLifeBalanceTab />
          </TabsContent>

          <TabsContent value="productivity" className="mt-6">
            <ProductivityToolsTab />
          </TabsContent>

          <TabsContent value="tools" className="mt-6">
            <InteractiveToolsTab />
          </TabsContent>
        </Tabs>
      )}

      {/* Journey Card */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Your Time Management Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/80 leading-relaxed">
            Effective time management isn't about cramming more into your day - it's about making space for what matters.
            As an electrical apprentice, you're juggling work, study, travel, and personal life. The skills you develop now will serve you throughout your career and beyond.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { text: "Plan weekly, review daily", icon: Calendar },
              { text: "Protect your rest time", icon: Heart },
              { text: "Celebrate small wins", icon: Star }
            ].map((tip, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                <tip.icon className="h-4 w-4 text-green-400" />
                <span className="text-white/90 text-sm">{tip.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support Card */}
      <Card className="border-purple-500/20 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2 text-lg">
            <AlertCircle className="h-5 w-5" />
            Need Additional Support?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Apprentice Support</h4>
              <p className="text-white/70 text-sm mb-2">
                Speak to your training provider or college about workload concerns
              </p>
              <p className="text-white/60 text-xs">
                They can help adjust study plans and provide additional resources
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Mental Health Resources</h4>
              <p className="text-white/70 text-sm mb-2">
                Visit our Mental Health section for professional support options
              </p>
              <p className="text-white/60 text-xs">
                Remember: Asking for help is a sign of strength, not weakness
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeManagement;
