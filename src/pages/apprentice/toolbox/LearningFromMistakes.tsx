
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Brain, Users, Target, CheckCircle, Heart, Phone, MessageCircle, BookOpen } from "lucide-react";
import MistakeCategoriesTab from "@/components/apprentice/learning-mistakes/MistakeCategoriesTab";
import RecoveryStrategiesTab from "@/components/apprentice/learning-mistakes/RecoveryStrategiesTab";
import ResilienceTab from "@/components/apprentice/learning-mistakes/ResilienceTab";
import CaseStudiesTab from "@/components/apprentice/learning-mistakes/CaseStudiesTab";
import PreventionTab from "@/components/apprentice/learning-mistakes/PreventionTab";
import SupportSystemsTab from "@/components/apprentice/learning-mistakes/SupportSystemsTab";

const LearningFromMistakes = () => {
  const quickActions = [
    {
      title: "Emergency Support",
      description: "Need immediate help or feeling overwhelmed?",
      action: "Get Help Now",
      icon: Phone,
      color: "bg-red-500/20 border-red-500/50 hover:bg-red-500/30",
      onClick: () => window.open('tel:116123', '_blank') // Samaritans
    },
    {
      title: "Recovery Strategies",
      description: "Learn structured approaches to handle mistakes",
      action: "View Strategies",
      icon: Target,
      color: "bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/30",
      onClick: () => {
        const recoveryTab = document.querySelector('[value="recovery"]') as HTMLElement;
        recoveryTab?.click();
      }
    },
    {
      title: "Peer Support",
      description: "Connect with other apprentices",
      action: "Join Community",
      icon: MessageCircle,
      color: "bg-green-500/20 border-green-500/50 hover:bg-green-500/30",
      onClick: () => window.open('/chat', '_blank')
    },
    {
      title: "Learn from Cases",
      description: "Study real scenarios and outcomes",
      action: "View Cases",
      icon: BookOpen,
      color: "bg-purple-500/20 border-purple-500/50 hover:bg-purple-500/30",
      onClick: () => {
        const casesTab = document.querySelector('[value="case-studies"]') as HTMLElement;
        casesTab?.click();
      }
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Learning From Mistakes</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Master the art of turning mistakes into learning opportunities. Build resilience, develop professional recovery skills, and transform setbacks into career advancement in the electrical trade.
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      {/* Quick Action Buttons */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={action.onClick}
                  className={`h-auto p-4 flex flex-col items-center gap-3 ${action.color}`}
                >
                  <IconComponent className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-semibold text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{action.description}</div>
                    <div className="text-xs font-medium mt-2">{action.action}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

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

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Remember: Growth Through Learning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Every skilled electrician has a story of mistakes that shaped their expertise. The electrical trade rewards those who learn quickly, adapt professionally, and turn setbacks into stepping stones. Your apprenticeship is the perfect time to develop these crucial skills in a supportive environment.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningFromMistakes;
