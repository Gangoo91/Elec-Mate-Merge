
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GraduationCap, ArrowLeft, Users, FileText, BookOpen, Phone, Calculator, Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import RecruitmentTab from "@/components/electrician/business-development/apprentices/RecruitmentTab";
import LegalRequirementsTab from "@/components/electrician/business-development/apprentices/LegalRequirementsTab";
import TrainingDevelopmentTab from "@/components/electrician/business-development/apprentices/TrainingDevelopmentTab";
import SupportResourcesTab from "@/components/electrician/business-development/apprentices/SupportResourcesTab";
import AssessmentProgressTab from "@/components/electrician/business-development/apprentices/AssessmentProgressTab";
import InteractiveToolsTab from "@/components/electrician/business-development/apprentices/InteractiveToolsTab";

const BusinessApprentices = () => {
  const [activeTab, setActiveTab] = useState("recruitment");
  const isMobile = useIsMobile();

  // Function to get tab display name
  const getTabDisplayName = (tabValue: string) => {
    switch (tabValue) {
      case "recruitment": return "Recruitment & Selection";
      case "legal": return "Legal Requirements";
      case "training": return "Training & Development";
      case "support": return "Support & Resources";
      case "assessment": return "Assessment & Progress";
      case "tools": return "Interactive Tools";
      default: return tabValue;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <Link to="/electrician/business-development">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Business Development</span>
          </Button>
        </Link>
      </div>

      <div className="text-center space-y-4 px-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Apprentice Onboarding & Management</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          Complete guide to recruiting, training, and supporting apprentices in your electrical contracting business
        </p>
      </div>

      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-blue-500/10 mb-6">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            Why Apprentices Matter for Your Business
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 bg-elec-dark/50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-2">£3,000</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Annual government incentive per apprentice</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-elec-dark/50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-green-400 mb-2">85%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Retention rate for well-managed apprentices</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-elec-dark/50 rounded-lg sm:col-span-2 lg:col-span-1">
              <div className="text-xl sm:text-2xl font-bold text-purple-400 mb-2">4 Years</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Time to develop a fully qualified electrician</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        {isMobile ? (
          <div className="mb-4 bg-elec-dark rounded-md p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-between bg-transparent text-white">
                  {getTabDisplayName(activeTab)}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-full min-w-[300px] bg-elec-dark border-elec-gray/40 z-50 shadow-lg">
                <DropdownMenuItem onClick={() => setActiveTab("recruitment")} className="justify-center">
                  <Users className="h-4 w-4 mr-2" />
                  Recruitment & Selection
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("legal")} className="justify-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Legal Requirements
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("training")} className="justify-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Training & Development
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("support")} className="justify-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Support & Resources
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("assessment")} className="justify-center">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Assessment & Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("tools")} className="justify-center">
                  <Calculator className="h-4 w-4 mr-2" />
                  Interactive Tools
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <TabsList className="mb-4 bg-elec-dark w-full grid grid-cols-6">
            <TabsTrigger value="recruitment" className="flex items-center gap-1 text-xs lg:text-sm">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Recruitment</span>
            </TabsTrigger>
            <TabsTrigger value="legal" className="flex items-center gap-1 text-xs lg:text-sm">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Legal</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-1 text-xs lg:text-sm">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Training</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-1 text-xs lg:text-sm">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
            <TabsTrigger value="assessment" className="flex items-center gap-1 text-xs lg:text-sm">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Assessment</span>
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-1 text-xs lg:text-sm">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Tools</span>
            </TabsTrigger>
          </TabsList>
        )}
        
        <TabsContent value="recruitment">
          <RecruitmentTab />
        </TabsContent>
        
        <TabsContent value="legal">
          <LegalRequirementsTab />
        </TabsContent>
        
        <TabsContent value="training">
          <TrainingDevelopmentTab />
        </TabsContent>
        
        <TabsContent value="support">
          <SupportResourcesTab />
        </TabsContent>
        
        <TabsContent value="assessment">
          <AssessmentProgressTab />
        </TabsContent>
        
        <TabsContent value="tools">
          <InteractiveToolsTab />
        </TabsContent>
      </Tabs>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Need Additional Support?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Managing apprentices successfully requires ongoing support and guidance. Don't hesitate to reach out 
            for help with recruitment challenges, training issues, or legal compliance questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button variant="outline" size="sm" className="border-elec-yellow/30 w-full sm:w-auto">
              CITB Support
            </Button>
            <Button variant="outline" size="sm" className="border-blue-500/30 w-full sm:w-auto">
              Local Training Providers
            </Button>
            <Button variant="outline" size="sm" className="border-green-500/30 w-full sm:w-auto">
              Government Resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessApprentices;
