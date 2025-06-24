
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardCheck, Shield, HardHat, AlertTriangle, BookOpen } from "lucide-react";
import PreJobSafetyTab from "@/components/apprentice/assessment/PreJobSafetyTab";
import SiteConditionTab from "@/components/apprentice/assessment/SiteConditionTab";
import ElectricalInstallationTab from "@/components/apprentice/assessment/ElectricalInstallationTab";
import RiskAssessmentTab from "@/components/apprentice/assessment/RiskAssessmentTab";
import EducationalResourcesTab from "@/components/apprentice/assessment/EducationalResourcesTab";

const OnJobAssessment = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Site Assessment Tools</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Comprehensive checklists, educational guides and regulations for professional site evaluations and safety assessments
        </p>
        <BackButton customUrl="/apprentice/on-job-tools" label="Back to On-Job Tools" />
      </div>

      <Tabs defaultValue="pre-job-safety" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pre-job-safety" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Pre-Job Safety
          </TabsTrigger>
          <TabsTrigger value="site-condition" className="flex items-center gap-2">
            <HardHat className="h-4 w-4" />
            Site Conditions
          </TabsTrigger>
          <TabsTrigger value="electrical" className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" />
            Electrical
          </TabsTrigger>
          <TabsTrigger value="risk-assessment" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Risk Assessment
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resources & Regulations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pre-job-safety">
          <PreJobSafetyTab />
        </TabsContent>

        <TabsContent value="site-condition">
          <SiteConditionTab />
        </TabsContent>

        <TabsContent value="electrical">
          <ElectricalInstallationTab />
        </TabsContent>

        <TabsContent value="risk-assessment">
          <RiskAssessmentTab />
        </TabsContent>

        <TabsContent value="resources">
          <EducationalResourcesTab />
        </TabsContent>
      </Tabs>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Safety First
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Always complete a thorough site assessment before beginning any electrical work. 
            When in doubt about any condition or procedure, stop work and consult with your supervisor 
            or a qualified electrician. Your safety and the safety of others is paramount.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnJobAssessment;
