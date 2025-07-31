
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { GraduationCap, ArrowLeft, Users, FileText, BookOpen, Phone, Calculator, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import RecruitmentTab from "@/components/electrician/business-development/apprentices/RecruitmentTab";
import LegalRequirementsTab from "@/components/electrician/business-development/apprentices/LegalRequirementsTab";
import TrainingDevelopmentTab from "@/components/electrician/business-development/apprentices/TrainingDevelopmentTab";
import SupportResourcesTab from "@/components/electrician/business-development/apprentices/SupportResourcesTab";
import AssessmentProgressTab from "@/components/electrician/business-development/apprentices/AssessmentProgressTab";
import InteractiveToolsTab from "@/components/electrician/business-development/apprentices/InteractiveToolsTab";

const BusinessApprentices = () => {
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

      <DropdownTabs
        defaultValue="recruitment"
        placeholder="Select apprentice management topic..."
        className="w-full"
        tabs={[
          {
            value: "recruitment",
            label: "Recruitment & Selection",
            icon: Users,
            content: <RecruitmentTab />
          },
          {
            value: "legal",
            label: "Legal Requirements",
            icon: FileText,
            content: <LegalRequirementsTab />
          },
          {
            value: "training",
            label: "Training & Development",
            icon: BookOpen,
            content: <TrainingDevelopmentTab />
          },
          {
            value: "support",
            label: "Support & Resources",
            icon: Phone,
            content: <SupportResourcesTab />
          },
          {
            value: "assessment",
            label: "Assessment & Progress",
            icon: GraduationCap,
            content: <AssessmentProgressTab />
          },
          {
            value: "tools",
            label: "Interactive Tools",
            icon: Calculator,
            content: <InteractiveToolsTab />
          }
        ]}
      />

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
