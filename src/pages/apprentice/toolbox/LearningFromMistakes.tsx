
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Brain, Users, Target, CheckCircle } from "lucide-react";
import MistakeCategoriesTab from "@/components/apprentice/learning-mistakes/MistakeCategoriesTab";
import RecoveryStrategiesTab from "@/components/apprentice/learning-mistakes/RecoveryStrategiesTab";
import ResilienceTab from "@/components/apprentice/learning-mistakes/ResilienceTab";
import CaseStudiesTab from "@/components/apprentice/learning-mistakes/CaseStudiesTab";
import PreventionTab from "@/components/apprentice/learning-mistakes/PreventionTab";
import SupportSystemsTab from "@/components/apprentice/learning-mistakes/SupportSystemsTab";

const LearningFromMistakes = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Learning From Mistakes</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Master the art of turning mistakes into learning opportunities. Build resilience, develop professional recovery skills, and transform setbacks into career advancement in the electrical trade.
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="recovery" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Recovery
          </TabsTrigger>
          <TabsTrigger value="resilience" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Resilience
          </TabsTrigger>
          <TabsTrigger value="case-studies" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Case Studies
          </TabsTrigger>
          <TabsTrigger value="prevention" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Prevention
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Support
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <MistakeCategoriesTab />
        </TabsContent>

        <TabsContent value="recovery">
          <RecoveryStrategiesTab />
        </TabsContent>

        <TabsContent value="resilience">
          <ResilienceTab />
        </TabsContent>

        <TabsContent value="case-studies">
          <CaseStudiesTab />
        </TabsContent>

        <TabsContent value="prevention">
          <PreventionTab />
        </TabsContent>

        <TabsContent value="support">
          <SupportSystemsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningFromMistakes;
