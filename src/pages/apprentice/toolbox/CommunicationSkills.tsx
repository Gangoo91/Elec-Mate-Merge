
import { useSearchParams } from "react-router-dom";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Users,
  AlertTriangle,
  Lightbulb,
  Heart,
  CheckCircle,
  Star,
  Target,
  Zap,
  Phone,
  Mail,
  Handshake,
  Shield
} from "lucide-react";
import WorkplaceCommunicationTab from "@/components/apprentice/communication-skills/WorkplaceCommunicationTab";
import ProfessionalSkillsTab from "@/components/apprentice/communication-skills/ProfessionalSkillsTab";
import DifficultSituationsTab from "@/components/apprentice/communication-skills/DifficultSituationsTab";
import InteractiveToolsTab from "@/components/apprentice/communication-skills/InteractiveToolsTab";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";

const CommunicationSkills = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "workplace";
  const setActiveTab = (tab: string) => setSearchParams({ tab }, { replace: false });
  const isMobile = useIsMobile();

  const quickStats = [
    { label: "Key Areas", value: "4", icon: Target, color: "text-blue-400" },
    { label: "Essential Skills", value: "12+", icon: Star, color: "text-elec-yellow" },
    { label: "Practice Scenarios", value: "20+", icon: Lightbulb, color: "text-purple-400" },
    { label: "Career Impact", value: "High", icon: Zap, color: "text-green-400" }
  ];

  const keyBenefits = [
    { title: "Safety First", desc: "Clear communication prevents dangerous misunderstandings", icon: Shield },
    { title: "Client Trust", desc: "Build lasting relationships through professional interaction", icon: Handshake },
    { title: "Team Efficiency", desc: "Work better with colleagues and supervisors", icon: Users },
    { title: "Career Growth", desc: "Communication skills open doors to advancement", icon: Target }
  ];

  const renderMobileContent = () => (
    <MobileAccordion type="single" collapsible defaultValue="workplace" className="w-full">
      <MobileAccordionItem value="workplace">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Workplace Communication
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <WorkplaceCommunicationTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="professional">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Professional Skills
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <ProfessionalSkillsTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="difficult">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Difficult Situations
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <DifficultSituationsTab />
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="tools">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Tools & Tips
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
        <div className="p-3 bg-blue-500/20 rounded-2xl mb-4">
          <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Communication Skills for Apprentices
        </h1>
        <p className="text-white max-w-2xl mb-4 text-sm sm:text-base">
          Master essential communication skills for the electrical trade - from site conversations to client interactions and handling difficult situations professionally
        </p>
        <SmartBackButton />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-3 sm:p-4 hover:border-blue-400/30 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color}`} />
              <span className="text-white text-xs sm:text-sm">{stat.label}</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Why Communication Matters */}
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-blue-400 flex items-center gap-2 text-lg sm:text-xl">
            <Zap className="h-5 w-5" />
            Why Communication Skills Matter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyBenefits.map((benefit, index) => (
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
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-white/5 border border-white/10">
            <TabsTrigger value="workplace" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white py-3 gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Workplace</span>
            </TabsTrigger>
            <TabsTrigger value="professional" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white py-3 gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Professional</span>
            </TabsTrigger>
            <TabsTrigger value="difficult" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white py-3 gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Difficult</span>
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white py-3 gap-2">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">Tools</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workplace" className="mt-6">
            <WorkplaceCommunicationTab />
          </TabsContent>

          <TabsContent value="professional" className="mt-6">
            <ProfessionalSkillsTab />
          </TabsContent>

          <TabsContent value="difficult" className="mt-6">
            <DifficultSituationsTab />
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
            Your Communication Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white leading-relaxed">
            Effective communication in the electrical trade isn't just about being polite - it's about safety, efficiency, and building a reputation as a professional.
            Clear communication prevents mistakes, builds trust with clients, helps you learn faster from experienced colleagues, and opens doors to career advancement.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { text: "Practice skills daily", icon: CheckCircle },
              { text: "Ask for feedback", icon: MessageCircle },
              { text: "Learn from challenges", icon: Star }
            ].map((tip, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                <tip.icon className="h-4 w-4 text-green-400" />
                <span className="text-white text-sm">{tip.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Contact Tips */}
      <Card className="border-purple-500/20 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2 text-lg">
            <Phone className="h-5 w-5" />
            Professional Contact Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4 text-purple-400" />
                <span className="font-semibold text-white">Phone Calls</span>
              </div>
              <ul className="space-y-1 text-white text-sm">
                <li>• Answer within 3 rings when possible</li>
                <li>• State your name and company clearly</li>
                <li>• Speak slowly and professionally</li>
                <li>• Always confirm details before hanging up</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4 text-purple-400" />
                <span className="font-semibold text-white">Written Messages</span>
              </div>
              <ul className="space-y-1 text-white text-sm">
                <li>• Keep messages clear and concise</li>
                <li>• Check spelling before sending</li>
                <li>• Include all relevant details</li>
                <li>• Use professional language</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunicationSkills;
