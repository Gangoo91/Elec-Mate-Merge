
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Users, AlertTriangle, Lightbulb, Heart } from "lucide-react";
import WorkplaceCommunicationTab from "@/components/apprentice/communication-skills/WorkplaceCommunicationTab";
import ProfessionalSkillsTab from "@/components/apprentice/communication-skills/ProfessionalSkillsTab";
import DifficultSituationsTab from "@/components/apprentice/communication-skills/DifficultSituationsTab";
import InteractivePracticeTab from "@/components/apprentice/communication-skills/InteractivePracticeTab";

const CommunicationSkills = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Communication Skills for Apprentices</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Master essential communication skills for the electrical trade - from site conversations to client interactions
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Tabs defaultValue="workplace" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workplace" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Workplace
          </TabsTrigger>
          <TabsTrigger value="professional" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Professional
          </TabsTrigger>
          <TabsTrigger value="difficult" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Difficult Situations
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workplace">
          <WorkplaceCommunicationTab />
        </TabsContent>

        <TabsContent value="professional">
          <ProfessionalSkillsTab />
        </TabsContent>

        <TabsContent value="difficult">
          <DifficultSituationsTab />
        </TabsContent>

        <TabsContent value="practice">
          <InteractivePracticeTab />
        </TabsContent>
      </Tabs>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Remember
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Good communication in the electrical trade isn't just about being polite - it's about safety, efficiency, and building a reputation as a professional. 
            Clear communication prevents mistakes, builds trust with clients, and helps you learn faster from experienced colleagues.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunicationSkills;
