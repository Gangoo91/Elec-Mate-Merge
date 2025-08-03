
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserCheck, ArrowLeft, Users, TrendingUp, Shield, Heart, ChevronDown, Award, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import RecruitmentTab from "@/components/electrician/business-development/electricians/RecruitmentTab";
import OnboardingTab from "@/components/electrician/business-development/electricians/OnboardingTab";
import RetentionTab from "@/components/electrician/business-development/electricians/RetentionTab";
import ManagementTab from "@/components/electrician/business-development/electricians/ManagementTab";

const BusinessElectricians = () => {
  const [activeTab, setActiveTab] = useState("recruitment");
  const isMobile = useIsMobile();

  // Function to get tab display name
  const getTabDisplayName = (tabValue: string) => {
    switch (tabValue) {
      case "recruitment": return "Recruitment & Selection";
      case "onboarding": return "Onboarding & Integration";
      case "retention": return "Retention & Development";
      case "management": return "Performance Management";
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
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Electrician Onboarding & Management</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          Complete guide to recruiting, onboarding, and retaining qualified electricians in your electrical contracting business
        </p>
      </div>

      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-blue-500/10 mb-6">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <UserCheck className="h-6 w-6" />
            Why Skilled Electricians Matter for Your Business
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 bg-elec-dark/50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-green-400 mb-2">£15,000</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Average recruitment investment per skilled electrician</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-elec-dark/50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-2">6 Weeks</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Time to reach full productivity with proper onboarding</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-elec-dark/50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-purple-400 mb-2">85%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Retention rate with structured management approach</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-elec-dark/50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-orange-400 mb-2">30%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Productivity increase with effective team management</div>
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
                <DropdownMenuItem onClick={() => setActiveTab("onboarding")} className="justify-center">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Onboarding & Integration
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("retention")} className="justify-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Retention & Development
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("management")} className="justify-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Performance Management
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <TabsList className="mb-4 bg-elec-dark w-full grid grid-cols-4">
            <TabsTrigger value="recruitment" className="flex items-center gap-1 text-xs lg:text-sm">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Recruitment</span>
            </TabsTrigger>
            <TabsTrigger value="onboarding" className="flex items-center gap-1 text-xs lg:text-sm">
              <UserCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Onboarding</span>
            </TabsTrigger>
            <TabsTrigger value="retention" className="flex items-center gap-1 text-xs lg:text-sm">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Retention</span>
            </TabsTrigger>
            <TabsTrigger value="management" className="flex items-center gap-1 text-xs lg:text-sm">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Management</span>
            </TabsTrigger>
          </TabsList>
        )}
        
        <TabsContent value="recruitment">
          <RecruitmentTab />
        </TabsContent>
        
        <TabsContent value="onboarding">
          <OnboardingTab />
        </TabsContent>
        
        <TabsContent value="retention">
          <RetentionTab />
        </TabsContent>
        
        <TabsContent value="management">
          <ManagementTab />
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
            Managing qualified electricians successfully requires ongoing support and guidance. Don't hesitate to reach out 
            for help with recruitment challenges, onboarding strategies, or employment law compliance questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button variant="outline" size="sm" className="border-elec-yellow/30 w-full sm:w-auto">
              HR Support Services
            </Button>
            <Button variant="outline" size="sm" className="border-blue-500/30 w-full sm:w-auto">
              Employment Law Guidance
            </Button>
            <Button variant="outline" size="sm" className="border-green-500/30 w-full sm:w-auto">
              Industry Best Practices
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessElectricians;
