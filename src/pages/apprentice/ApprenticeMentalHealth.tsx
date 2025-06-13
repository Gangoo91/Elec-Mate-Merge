
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, BookOpen, Zap, Users, Shield } from "lucide-react";
import ResourcesLibraryTab from "@/components/mental-health/tabs/ResourcesLibraryTab";
import InteractiveToolsTab from "@/components/mental-health/tabs/InteractiveToolsTab";
import SupportNetworkTab from "@/components/mental-health/tabs/SupportNetworkTab";
import CrisisResourcesTab from "@/components/mental-health/tabs/CrisisResourcesTab";
import MentalHealthMate from "@/components/mental-health/MentalHealthMate";

const ApprenticeMentalHealth = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <Heart className="h-8 w-8 text-elec-yellow" />
          Mental Health Hub
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Your wellbeing matters. Find support, resources, and community here to help you thrive 
          both professionally and personally throughout your apprenticeship journey.
        </p>
        <BackButton customUrl="/apprentice/hub" label="Back to Hub" />
      </div>

      {/* Emergency Banner */}
      <Card className="border-red-500/40 bg-red-500/5 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Shield className="h-8 w-8 text-red-500 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-500">Emergency Support</h3>
              <p className="text-sm">
                If you're in crisis, call <span className="font-bold">999</span> or contact Samaritans at{" "}
                <a href="tel:116123" className="font-bold text-red-500 hover:underline">116 123</a> (free, 24/7)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mental Health Mate - Now more prominent at the top */}
      <div id="mental-health-mates">
        <MentalHealthMate />
      </div>

      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Tools
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Support
          </TabsTrigger>
          <TabsTrigger value="crisis" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Crisis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resources">
          <ResourcesLibraryTab />
        </TabsContent>

        <TabsContent value="tools">
          <InteractiveToolsTab />
        </TabsContent>

        <TabsContent value="support">
          <SupportNetworkTab />
        </TabsContent>

        <TabsContent value="crisis">
          <CrisisResourcesTab />
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
            Your mental health is just as important as your physical safety on site. Taking care of your 
            wellbeing isn't weakness - it's essential for your success as an apprentice and future electrician. 
            Don't hesitate to reach out for support when you need it.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprenticeMentalHealth;
