
import React from 'react';
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Lightbulb, Heart } from "lucide-react";
import DailyAITipsTab from "@/components/apprentice/ojt/enhanced/DailyAITipsTab";
import HelpBotTab from "@/components/apprentice/ojt/enhanced/HelpBotTab";

const AdvancedHelp = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Advanced Help</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          AI-powered assistance and cutting-edge training tools to accelerate your learning
        </p>
        <BackButton customUrl="/apprentice" label="Back to Apprentice Hub" />
      </div>

      <Tabs defaultValue="helpbot" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="helpbot" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI Help Bot
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Daily Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="helpbot">
          <HelpBotTab />
        </TabsContent>

        <TabsContent value="tips">
          <DailyAITipsTab />
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
            These AI tools are designed to complement your learning, not replace traditional study methods. 
            Use them regularly to build knowledge, clarify concepts, and stay motivated throughout your apprenticeship journey.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedHelp;
