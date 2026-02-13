
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  CheckCircle,
  FileText,
  Building,
  Star,
  Target,
  Zap,
  Heart,
  FolderOpen
} from "lucide-react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import PortfolioIntroduction from "@/components/apprentice/portfolio/guide/PortfolioIntroduction";
import PortfolioStepByStepGuide from "@/components/apprentice/portfolio/guide/PortfolioStepByStepGuide";
import EvidenceCollectionGuide from "@/components/apprentice/portfolio/guide/EvidenceCollectionGuide";
import IndustrySpecificGuidance from "@/components/apprentice/portfolio/guide/IndustrySpecificGuidance";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";

const PortfolioBuilding = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "introduction";
  const setActiveTab = (tab: string) => setSearchParams({ tab }, { replace: false });
  const isMobile = useIsMobile();

  const quickStats = [
    { label: "Guide Sections", value: "4", icon: BookOpen, color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/30" },
    { label: "Evidence Types", value: "10+", icon: FileText, color: "text-green-400", bg: "from-green-500/10 to-green-500/5", border: "border-green-500/30" },
    { label: "Industry Areas", value: "5", icon: Building, color: "text-elec-yellow", bg: "from-elec-yellow/10 to-elec-yellow/5", border: "border-elec-yellow/30" },
    { label: "Success Rate", value: "95%", icon: Star, color: "text-purple-400", bg: "from-purple-500/10 to-purple-500/5", border: "border-purple-500/30" }
  ];

  const keyBenefits = [
    { title: "EPA Success", desc: "Strong portfolio is key to End Point Assessment success", icon: Target },
    { title: "Career Evidence", desc: "Document skills that demonstrate your competence", icon: CheckCircle },
    { title: "Professional Image", desc: "Show employers and clients your quality of work", icon: Star },
    { title: "Personal Record", desc: "Track your growth and achievements over time", icon: FolderOpen }
  ];

  const renderMobileContent = () => (
    <MobileAccordion type="single" collapsible defaultValue="introduction" className="w-full">
      <MobileAccordionItem value="introduction">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Introduction
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <PortfolioIntroduction />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="step-by-step">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Step-by-Step Guide
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <PortfolioStepByStepGuide />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="evidence">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Evidence Collection
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <EvidenceCollectionGuide />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="industry">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Industry Guidance
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <IndustrySpecificGuidance />
        </MobileAccordionContent>
      </MobileAccordionItem>
    </MobileAccordion>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-elec-yellow/20 rounded-2xl mb-4">
          <FolderOpen className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Portfolio Building Guide
        </h1>
        <p className="text-white max-w-2xl mb-4 text-sm sm:text-base">
          A comprehensive guide to building an exceptional electrical apprenticeship portfolio.
          Document your journey, demonstrate your competence, and prepare for EPA success.
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

      {/* Why Portfolio Matters */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-lg sm:text-xl">
            <Zap className="h-5 w-5" />
            Why Your Portfolio Matters
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
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-white/5 border border-white/10">
            <TabsTrigger value="introduction" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Introduction</span>
            </TabsTrigger>
            <TabsTrigger value="step-by-step" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <CheckCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Step-by-Step</span>
            </TabsTrigger>
            <TabsTrigger value="evidence" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Evidence</span>
            </TabsTrigger>
            <TabsTrigger value="industry" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Industry</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="introduction" className="mt-6">
            <PortfolioIntroduction />
          </TabsContent>

          <TabsContent value="step-by-step" className="mt-6">
            <PortfolioStepByStepGuide />
          </TabsContent>

          <TabsContent value="evidence" className="mt-6">
            <EvidenceCollectionGuide />
          </TabsContent>

          <TabsContent value="industry" className="mt-6">
            <IndustrySpecificGuidance />
          </TabsContent>
        </Tabs>
      )}

      {/* Journey Card */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Your Portfolio Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white leading-relaxed">
            Your portfolio is more than just evidence for assessments - it's a record of your growth as an electrical professional.
            Take pride in documenting your work, and you'll have a valuable resource that showcases your skills throughout your career.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { text: "Document everything", icon: FileText },
              { text: "Quality over quantity", icon: Star },
              { text: "Update regularly", icon: CheckCircle }
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

export default PortfolioBuilding;
