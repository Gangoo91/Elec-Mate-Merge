
import { useSearchParams } from "react-router-dom";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, CheckCircle, Store, Heart, Shield, Zap, Star, Target, AlertTriangle } from "lucide-react";
import EssentialToolsTab from "@/components/apprentice/professional-tools/EssentialToolsTab";
import ToolSelectionTab from "@/components/apprentice/professional-tools/ToolSelectionTab";
import SuppliersAndCostsTab from "@/components/apprentice/professional-tools/SuppliersAndCostsTab";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";

const ToolsGuide = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "essential";
  const setActiveTab = (tab: string) => setSearchParams({ tab }, { replace: false });
  const isMobile = useIsMobile();

  const toolCategories = [
    { name: "Hand Tools", count: "15-20 items", priority: "High", cost: "£200-400", color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/30" },
    { name: "Power Tools", count: "5-8 tools", priority: "Medium", cost: "£300-800", color: "text-green-400", bg: "from-green-500/10 to-green-500/5", border: "border-green-500/30" },
    { name: "Test Equipment", count: "3-5 items", priority: "Critical", cost: "£400-1200", color: "text-red-400", bg: "from-red-500/10 to-red-500/5", border: "border-red-500/30" },
    { name: "PPE & Safety", count: "Full kit", priority: "Critical", cost: "£150-300", color: "text-elec-yellow", bg: "from-elec-yellow/10 to-elec-yellow/5", border: "border-elec-yellow/30" }
  ];

  const keyBenefits = [
    { title: "Professional Image", desc: "Quality tools show clients you're serious about your work", icon: Star },
    { title: "Work Efficiency", desc: "Right tool for the job means faster, better results", icon: Zap },
    { title: "Safety First", desc: "Proper equipment protects you and others on site", icon: Shield },
    { title: "Career Investment", desc: "Quality tools last years and pay for themselves", icon: Target }
  ];

  const renderMobileContent = () => (
    <MobileAccordion type="single" collapsible defaultValue="essential" className="w-full">
      <MobileAccordionItem value="essential">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Essential Tools
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <EssentialToolsTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="selection">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Tool Selection & Quality
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <ToolSelectionTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="suppliers">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Suppliers & Costs
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <SuppliersAndCostsTab />
        </MobileAccordionContent>
      </MobileAccordionItem>
    </MobileAccordion>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-elec-yellow/20 rounded-2xl mb-4">
          <Wrench className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Professional Tool Guide
        </h1>
        <p className="text-white max-w-2xl mb-4 text-sm sm:text-base">
          Comprehensive guidance for building your professional electrician toolkit - from essential tools to smart purchasing decisions and quality assessment.
        </p>
        <SmartBackButton />
      </div>

      {/* Info Alert */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
        <CardContent className="p-4 flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-white text-sm">
            Building a professional toolkit is an investment in your career. This comprehensive guide provides everything you need for informed decision-making and strategic purchasing.
          </p>
        </CardContent>
      </Card>

      {/* Tool Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {toolCategories.map((category, index) => (
          <Card key={index} className={`${category.border} bg-gradient-to-br ${category.bg}`}>
            <CardContent className="p-4 text-center">
              <h4 className={`font-semibold ${category.color} mb-2`}>{category.name}</h4>
              <p className="text-white text-sm mb-2">{category.count}</p>
              <Badge
                variant="outline"
                className={`mb-2 ${
                  category.priority === 'Critical' ? 'border-red-500/40 text-red-400' :
                  category.priority === 'High' ? 'border-orange-500/40 text-orange-400' :
                  'border-blue-500/40 text-blue-400'
                }`}
              >
                {category.priority}
              </Badge>
              <p className="text-xs text-white">{category.cost}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Why Quality Tools Matter */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-lg sm:text-xl">
            <Zap className="h-5 w-5" />
            Why Quality Tools Matter
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
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-white/5 border border-white/10">
            <TabsTrigger value="essential" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Essential Tools</span>
            </TabsTrigger>
            <TabsTrigger value="selection" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <CheckCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Selection & Quality</span>
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">Suppliers & Costs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="essential" className="mt-6">
            <EssentialToolsTab />
          </TabsContent>

          <TabsContent value="selection" className="mt-6">
            <ToolSelectionTab />
          </TabsContent>

          <TabsContent value="suppliers" className="mt-6">
            <SuppliersAndCostsTab />
          </TabsContent>
        </Tabs>
      )}

      {/* Warning Alert */}
      <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-orange-500/5">
        <CardContent className="p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
          <p className="text-white text-sm">
            <strong className="text-orange-400">Remember:</strong> Quality tools are a long-term investment. Never compromise on safety-critical equipment like test instruments and PPE. Plan strategically and invest wisely.
          </p>
        </CardContent>
      </Card>

      {/* Journey Card */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Your Professional Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white leading-relaxed">
            Building a professional toolkit is a career-long investment in your success. Focus on quality over quantity,
            plan your purchases strategically, and maintain your tools properly. A well-chosen and maintained toolkit will serve you throughout
            your entire electrical career and contribute to your professional reputation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { text: "Buy quality, buy once", icon: Star },
              { text: "Maintain tools regularly", icon: Wrench },
              { text: "Replace when unsafe", icon: Shield }
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

export default ToolsGuide;
