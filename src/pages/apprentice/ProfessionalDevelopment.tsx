
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, TrendingUp, Users, BookOpen, Award, Target } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import CareerPathwaysTab from "@/components/apprentice/professional-development/CareerPathwaysTab";
import CertificationsTab from "@/components/apprentice/professional-development/CertificationsTab";
import ContinuingEducationTab from "@/components/apprentice/professional-development/ContinuingEducationTab";
import IndustryNetworkingTab from "@/components/apprentice/professional-development/IndustryNetworkingTab";

const ProfessionalDevelopment = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Professional Development</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Plan your career progression, develop new skills, and build your professional network in the electrical industry
        </p>
        <BackButton customUrl="/apprentice" label="Back to Apprentice Hub" />
      </div>

      <Tabs defaultValue="pathways" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pathways" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Career Paths
          </TabsTrigger>
          <TabsTrigger value="certifications" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Certifications
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Education
          </TabsTrigger>
          <TabsTrigger value="networking" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Networking
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

        <TabsContent value="networking">
          <IndustryNetworkingTab />
        </TabsContent>
      </Tabs>

      <Card className="border-elec-yellow/50 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-5 w-5" />
            Your Development Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Professional development is a continuous process. Whether you're planning your next career move, 
            seeking additional qualifications, or building industry connections, take it one step at a time. 
            Your apprenticeship is just the beginning of a rewarding career in the electrical industry.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalDevelopment;
