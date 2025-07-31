
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <MobileAccordion type="single" collapsible className="w-full">
          <MobileAccordionItem value="recruitment">
            <MobileAccordionTrigger icon={<Users className="h-5 w-5" />}>
              Recruitment & Selection
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-b-lg p-4">
                <RecruitmentTab />
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        </MobileAccordion>

        <MobileAccordion type="single" collapsible className="w-full">
          <MobileAccordionItem value="legal">
            <MobileAccordionTrigger icon={<FileText className="h-5 w-5" />}>
              Legal Requirements
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-b-lg p-4">
                <LegalRequirementsTab />
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        </MobileAccordion>

        <MobileAccordion type="single" collapsible className="w-full">
          <MobileAccordionItem value="training">
            <MobileAccordionTrigger icon={<BookOpen className="h-5 w-5" />}>
              Training & Development
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-b-lg p-4">
                <TrainingDevelopmentTab />
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        </MobileAccordion>

        <MobileAccordion type="single" collapsible className="w-full">
          <MobileAccordionItem value="support">
            <MobileAccordionTrigger icon={<Phone className="h-5 w-5" />}>
              Support & Resources
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-b-lg p-4">
                <SupportResourcesTab />
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        </MobileAccordion>

        <MobileAccordion type="single" collapsible className="w-full">
          <MobileAccordionItem value="assessment">
            <MobileAccordionTrigger icon={<GraduationCap className="h-5 w-5" />}>
              Assessment & Progress
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-b-lg p-4">
                <AssessmentProgressTab />
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        </MobileAccordion>

        <MobileAccordion type="single" collapsible className="w-full">
          <MobileAccordionItem value="tools">
            <MobileAccordionTrigger icon={<Calculator className="h-5 w-5" />}>
              Interactive Tools
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-b-lg p-4">
                <InteractiveToolsTab />
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        </MobileAccordion>
      </div>

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
              Contact CITB for Support
            </Button>
            <Button variant="outline" size="sm" className="border-blue-500/30 w-full sm:w-auto">
              Find Local Training Providers
            </Button>
            <Button variant="outline" size="sm" className="border-green-500/30 w-full sm:w-auto">
              Access Government Resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessApprentices;
