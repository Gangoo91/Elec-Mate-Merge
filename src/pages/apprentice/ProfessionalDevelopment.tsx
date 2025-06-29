
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award, 
  Target,
  Lightbulb
} from "lucide-react";
import BackButton from "@/components/common/BackButton";
import CareerPathwaysTab from "@/components/apprentice/professional-development/CareerPathwaysTab";
import CertificationsTab from "@/components/apprentice/professional-development/CertificationsTab";
import ContinuingEducationTab from "@/components/apprentice/professional-development/ContinuingEducationTab";
import IndustryNetworkingTab from "@/components/apprentice/professional-development/IndustryNetworkingTab";
import ProfessionalSkillsTab from "@/components/apprentice/professional-development/ProfessionalSkillsTab";
import MobileProfessionalDevelopment from "@/components/apprentice/professional-development/MobileProfessionalDevelopment";

const ProfessionalDevelopment = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Professional Development Hub</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4 text-sm sm:text-base">
          Your comprehensive career development resource centre - explore pathways, learn about certifications, and build the skills needed for success in the electrical industry
        </p>
        <BackButton customUrl="/apprentice" label="Back to Apprentice Hub" />
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <MobileProfessionalDevelopment />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <Tabs defaultValue="pathways" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="pathways" className="flex items-center gap-2 text-xs lg:text-sm">
              <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Career Paths</span>
              <span className="lg:hidden">Paths</span>
            </TabsTrigger>
            <TabsTrigger value="certifications" className="flex items-center gap-2 text-xs lg:text-sm">
              <Award className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Certifications</span>
              <span className="lg:hidden">Certs</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2 text-xs lg:text-sm">
              <BookOpen className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Education</span>
              <span className="lg:hidden">Edu</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2 text-xs lg:text-sm">
              <Lightbulb className="h-3 w-3 lg:h-4 lg:w-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="networking" className="flex items-center gap-2 text-xs lg:text-sm">
              <Users className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden lg:inline">Networking</span>
              <span className="lg:hidden">Network</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pathways">
            <CareerPathwaysTab />
          </TabsContent>

          <TabsContent value="certifications">
            <CertificationsTab />
          </TabsContent>

          <TabsContent value="education">
            <ContinuingEducationTab />
          </TabsContent>

          <TabsContent value="skills">
            <ProfessionalSkillsTab />
          </TabsContent>

          <TabsContent value="networking">
            <IndustryNetworkingTab />
          </TabsContent>
        </Tabs>

        <Card className="border-elec-yellow/50 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 mt-8">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Target className="h-5 w-5" />
              Your Development Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Professional development is a continuous process that shapes your electrical career. Use this hub to 
              explore career pathways, understand certification requirements, discover educational opportunities, 
              develop essential skills, and build industry connections. Everything you need to support your journey 
              from apprentice to electrical professional is here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalDevelopment;
