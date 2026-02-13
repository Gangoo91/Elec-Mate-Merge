
import React from 'react';
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Lightbulb,
  Sparkles,
  GraduationCap
} from "lucide-react";
import DailyAITipsTab from "@/components/apprentice/ojt/enhanced/DailyAITipsTab";
import HelpBotTab from "@/components/apprentice/ojt/enhanced/HelpBotTab";

const AdvancedHelp = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col min-h-0 flex-1 h-[calc(100dvh-var(--header-height,56px))] animate-fade-in">
      {/* Compact Header - Hidden on mobile, visible on desktop */}
      <div className="hidden sm:block relative overflow-hidden rounded-xl border border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 via-white/5 to-elec-yellow/5 p-6 mb-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <SmartBackButton />
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-elec-yellow/20">
                  <Sparkles className="h-5 w-5 text-elec-yellow" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">AI Study Centre</h1>
              </div>
            </div>
            <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow text-xs px-2 py-0.5 shrink-0">
              <Bot className="h-3 w-3 mr-1" />
              AI Enhanced
            </Badge>
          </div>

          <p className="text-white text-sm mt-3 max-w-xl">
            AI-powered learning tools built specifically for UK electrical apprentices.
            Get expert guidance from Dave, your 20-year veteran electrical mentor.
          </p>
        </div>
      </div>

      {/* Mobile-only minimal header with back button */}
      <div className="sm:hidden flex items-center gap-2 px-1 py-1.5 shrink-0">
        <SmartBackButton />
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-elec-yellow" />
          <span className="text-sm font-semibold">AI Study Centre</span>
        </div>
      </div>



      {/* Main Tabs Section */}
      <Tabs defaultValue="helpbot" className="w-full flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 h-9 sm:h-11 bg-white/5 border border-white/10 rounded-xl">
          <TabsTrigger
            value="helpbot"
            className="flex items-center gap-1.5 sm:gap-2 data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow h-7 sm:h-9 rounded-lg touch-manipulation"
          >
            <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Ask Dave</span>
          </TabsTrigger>
          <TabsTrigger
            value="tips"
            className="flex items-center gap-1.5 sm:gap-2 data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow h-7 sm:h-9 rounded-lg touch-manipulation"
          >
            <Lightbulb className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Daily Tips</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="helpbot" className="mt-1 sm:mt-4 flex-1 min-h-0">
          <div className="h-full sm:border sm:border-border/30 sm:rounded-xl sm:overflow-hidden">
            <HelpBotTab />
          </div>
        </TabsContent>

        <TabsContent value="tips" className="mt-1 sm:mt-4">
          <DailyAITipsTab />
        </TabsContent>
      </Tabs>

      {/* Footer Note - Hidden on Mobile for Space */}
      <Card className="hidden sm:block border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-elec-yellow/10 shrink-0">
              <GraduationCap className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <h3 className="font-medium text-sm text-elec-yellow mb-1">Learning Support, Not Replacement</h3>
              <p className="text-xs text-white">
                These AI tools are designed to complement your apprenticeship training, not replace it.
                Always verify critical information with your supervisor or official documentation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedHelp;
