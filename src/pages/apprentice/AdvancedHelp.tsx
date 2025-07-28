
import React from 'react';
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Lightbulb, Heart } from "lucide-react";
import DailyAITipsTab from "@/components/apprentice/ojt/enhanced/DailyAITipsTab";
import HelpBotTab from "@/components/apprentice/ojt/enhanced/HelpBotTab";

const AdvancedHelp = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 animate-fade-in">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Advanced Help</h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl px-4">
          AI-powered assistance and cutting-edge training tools to accelerate your learning
        </p>
        <BackButton customUrl="/apprentice" label="Back to Apprentice Hub" />
      </div>

      <Tabs defaultValue="helpbot" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-auto">
          <TabsTrigger value="helpbot" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 px-2">
            <Bot className="h-4 w-4" />
            <span className="text-xs sm:text-sm">AI Help Bot</span>
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 px-2">
            <Lightbulb className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Daily Tips</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="helpbot" className="mt-6">
          <HelpBotTab />
        </TabsContent>

        <TabsContent value="tips" className="mt-6">
          <DailyAITipsTab />
        </TabsContent>
      </Tabs>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-green-300 flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5" />
            Remember
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed">
            These AI tools are designed to complement your learning, not replace traditional study methods. 
            Use them regularly to build knowledge, clarify concepts, and stay motivated throughout your apprenticeship journey.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedHelp;
